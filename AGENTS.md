# AGENTS.md — Toolchain Modernization Guide

This file instructs AI agents how to modernize the build and test toolchain for
`@mitchallen/*` npm packages that use the old grunt + browserify + mocha stack.

Copy this file into any such repo and ask your agent: **"Follow AGENTS.md to
modernize the toolchain."**

---

## Goal

Replace a legacy grunt/browserify/babel/mocha stack with:

| Old | New |
|-----|-----|
| `grunt` + `grunt-*` plugins | `build.js` script using `esbuild` |
| `browserify` + `babelify` + `browserify-derequire` | `esbuild` (bundles + transpiles natively) |
| `grunt-contrib-jshint` | `eslint` + `eslint.config.js` |
| `mocha` + `should` + `supertest` | Node.js built-in `node:test` + `node:assert` |

Expected outcome: `npm audit` reports **0 vulnerabilities**.

---

## Step 1 — Audit the current state

Run `npm audit` and note the vulnerability count. Then read:

- `package.json` — identify all grunt/babel/browserify/mocha devDependencies
- `Gruntfile.js` — note the browserify `standalone` name (e.g. `MitchAllen.Grid`),
  the entry point (e.g. `./src/index.js`), and output files (`dist/grid.js`,
  `dist/grid.min.js`)

---

## Step 2 — Create `build.js`

Replace `Gruntfile.js` with a small esbuild script. Use the `standalone` name
from the old Gruntfile as `globalName`, and keep the same entry/output paths.

```js
"use strict";

const esbuild = require('esbuild');
const watching = process.argv.includes('--watch');

const base = {
  entryPoints: ['./src/index.js'],   // adjust if entry differs
  bundle: true,
  platform: 'browser',
  globalName: 'MitchAllen.Grid',     // from Gruntfile standalone option
  format: 'iife',
  target: ['es2017'],                // es5 is NOT supported by esbuild for all ES6 syntax
};

async function main() {
  if (watching) {
    const ctx = await esbuild.context({ ...base, outfile: './dist/grid.js' });
    await ctx.watch();
    console.log('Watching for changes...');
  } else {
    await Promise.all([
      esbuild.build({ ...base, outfile: './dist/grid.js' }),
      esbuild.build({ ...base, minify: true, outfile: './dist/grid.min.js' }),
    ]);
    console.log('Build complete.');
  }
}

main().catch(e => { console.error(e); process.exit(1); });
```

> **Do not use `target: ['es5']`** — esbuild cannot transform default parameters,
> destructuring, or `let` to ES5. Use `es2017` or later.

---

## Step 3 — Create `eslint.config.js`

```js
"use strict";

const globals = require('globals');

module.exports = [
  {
    files: ["src/**/*.js"],
    languageOptions: {
      ecmaVersion: 2017,
      sourceType: "commonjs",
      globals: {
        ...globals.node,
      },
    },
    rules: {
      "no-unused-vars": "warn",
    },
  },
];
```

---

## Step 4 — Update `package.json`

### Remove these devDependencies

```
@babel/preset-env
babelify
browserify-derequire
grunt
grunt-browserify
grunt-bump
grunt-contrib-jshint
grunt-contrib-uglify
grunt-contrib-watch
grunt-shell
mocha
should
supertest
```

(Some may be absent — skip any that aren't present.)

### Add these devDependencies

```
esbuild        ^0.25.0
eslint         ^9.0.0
globals        ^16.0.0
```

### Update `main` and add `browser`

```json
"main": "src/index.js",
"browser": "dist/grid.min.js",
```

### Replace scripts

```json
"scripts": {
  "start": "node src/index.js",
  "build": "node build.js",
  "lint": "eslint src/",
  "test": "node build.js && node --test $(find test -name '*-test.js' | sort)",
  "watch": "node build.js --watch",
  "test-square":   "node --test $(find test/square   -name '*-test.js')",
  "test-circle":   "node --test $(find test/circle   -name '*-test.js')",
  "test-hexagon":  "node --test $(find test/hexagon  -name '*-test.js')",
  "test-triangle": "node --test $(find test/triangle -name '*-test.js')",
  "test-create":   "node --test $(find test/create   -name '*-test.js')",
  "test-debug":    "node --test $(find test -name '*-test.js' | sort)",
  "pubinit":       "node build.js && npm publish --access public",
  "publish-pkg":   "node build.js && npm version patch && git push --follow-tags && npm publish"
}
```

Adjust the `test-*` scripts to match the actual subdirectory names in `test/`.

---

## Step 5 — Migrate test files

All test files need three changes:

### 5a. Replace the require header

Find this pattern (or a variation):

```js
var request = require('supertest'),
    should = require('should'),
    // modulePath = "../../modules/index";
    modulePath = "../../dist/grid";
```

Replace with:

```js
const { describe, it, before, after, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert');
const modulePath = "../../src/index";
```

Also remove any `/*jshint ... */` directive comments.

### 5b. Remove `done` callbacks

Lifecycle hooks and `it` blocks were written with mocha's `done` callback.
Since all tests are synchronous (they call `done()` immediately), make them
synchronous:

```js
// Before
before(function(done) {
    delete require.cache[require.resolve(modulePath)];
    _module = require(modulePath);
    done();
});

// After
before(function() {
    delete require.cache[require.resolve(modulePath)];
    _module = require(modulePath);
});
```

Remove `function(done)` → `function()` and delete all bare `done();` lines.

### 5c. Replace assertions

| `should` | `node:assert` |
|----------|---------------|
| `should.exist(x)` | `assert.ok(x != null)` |
| `should.not.exist(x)` | `assert.ok(x == null)` |
| `x.should.eql(y)` | `assert.deepStrictEqual(x, y)` |

**Common pitfall:** `should.not.exist(obj.get(x,y))` — `[^)]+` regex stops at
the first `)` inside the argument, producing the wrong result
`assert.ok(obj.get(x,y == null))`. Always verify the generated output for any
assertion whose argument contains parentheses, and fix manually if needed.

---

## Step 6 — Delete obsolete files

```
Gruntfile.js
.babelrc
```

---

## Step 7 — Install and verify

```sh
npm install
npm audit fix        # fix any non-breaking issues
npm test             # must pass 100%
npm audit            # target: 0 vulnerabilities
```

If `npm audit` still reports issues, check whether they are in devDependencies
only (test tooling). Issues in production `dependencies` must be resolved.
Issues in devDependencies that have no available fix can be left with a note.

---

## Step 8 — Commit and push

```sh
git add -u
git add build.js eslint.config.js
# dist/ may be gitignored but tracked — force-add if needed:
git add -f dist/grid.js dist/grid.min.js
git commit -m "build: replace grunt/browserify/mocha with esbuild and node:test"
git push
```

---

## Notes for specific edge cases

- **`dist/` is in `.gitignore` but was previously committed** — use `git add -f`
  to stage the updated dist files. They are tracked, so this is safe.
- **Remote has new commits** — if `git push` is rejected, run
  `git pull --rebase`, resolve any `package-lock.json` conflict by keeping your
  version (`git checkout --ours package-lock.json`), then continue.
- **Node.js v26 + old mocha** — mocha v10 fails on Node.js v26 due to a yargs
  ESM conflict. This is another reason to drop mocha entirely.
- **`supertest` is often imported but never used** — safe to remove without
  checking every test.
