"use strict";
var MitchAllen = MitchAllen || {};
MitchAllen.Grid = (() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };

  // node_modules/@mitchallen/grid-square/dist/grid-square.js
  var require_grid_square = __commonJS({
    "node_modules/@mitchallen/grid-square/dist/grid-square.js"(exports, module) {
      "use strict";
      var __getOwnPropNames2 = Object.getOwnPropertyNames;
      var __commonJS2 = (cb, mod) => function __require() {
        try {
          return mod || (0, cb[__getOwnPropNames2(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
        } catch (e) {
          throw mod = 0, e;
        }
      };
      var require_grid_core_cjs2 = __commonJS2({
        "node_modules/@mitchallen/grid-core/dist/grid-core.cjs.js"(exports2, module2) {
          "use strict";
          module2.exports.create = (u = {}) => {
            let { rows: t = 0 } = u;
            t = Math.max(t, 0);
            for (var i = []; i.push([]) < t; ) ;
            var a = Object.create({}, { rows: { writeable: false, value: t, enumerable: true } });
            return Object.assign(a, { log: function() {
              console.log("size: %d: ", t), console.log(i);
            }, rowSize: function(e) {
              return e < 0 || e >= t ? 0 : i[e].length;
            }, isCell: function(e, r) {
              var l = this.rowSize(e);
              return e >= 0 && e < t && r >= 0 && r < l;
            }, set: function(e, r, l) {
              return e < 0 || r < 0 ? false : (i[e][r] = l, true);
            }, get: function(e, r) {
              return this.isCell(e, r) ? i[e][r] : null;
            }, fill: function(e) {
              for (var r = 0; r < t; r++) for (var l = this.rowSize(r), n = 0; n < l; n++) i[r][n] = e;
            }, cloneArray: function() {
              for (var e = []; e.push([]) < t; ) ;
              for (var r = 0; r < t; r++) for (var l = this.rowSize(r), n = 0; n < l; n++) e[r][n] = i[r][n];
              return e;
            } });
          };
        }
      });
      var coreGrid = require_grid_core_cjs2();
      module.exports.create = (spec = {}) => {
        let {
          x: _x = 0,
          y: _y = 0
        } = spec;
        _x = Math.max(_x, 0);
        _y = Math.max(_y, 0);
        var obj = coreGrid.create({ rows: _x });
        for (var row = 0; row < _x; row++) {
          for (var col = 0; col < _y; col++) {
            obj.set(row, col, 0);
          }
        }
        Object.defineProperties(obj, {
          "xSize": {
            writeable: false,
            value: _x,
            enumerable: true
          },
          "ySize": {
            writeable: false,
            value: _y,
            enumerable: true
          }
        });
        return obj;
      };
    }
  });

  // node_modules/@mitchallen/grid-core/dist/grid-core.cjs.js
  var require_grid_core_cjs = __commonJS({
    "node_modules/@mitchallen/grid-core/dist/grid-core.cjs.js"(exports, module) {
      "use strict";
      module.exports.create = (u = {}) => {
        let { rows: t = 0 } = u;
        t = Math.max(t, 0);
        for (var i = []; i.push([]) < t; ) ;
        var a = Object.create({}, { rows: { writeable: false, value: t, enumerable: true } });
        return Object.assign(a, { log: function() {
          console.log("size: %d: ", t), console.log(i);
        }, rowSize: function(e) {
          return e < 0 || e >= t ? 0 : i[e].length;
        }, isCell: function(e, r) {
          var l = this.rowSize(e);
          return e >= 0 && e < t && r >= 0 && r < l;
        }, set: function(e, r, l) {
          return e < 0 || r < 0 ? false : (i[e][r] = l, true);
        }, get: function(e, r) {
          return this.isCell(e, r) ? i[e][r] : null;
        }, fill: function(e) {
          for (var r = 0; r < t; r++) for (var l = this.rowSize(r), n = 0; n < l; n++) i[r][n] = e;
        }, cloneArray: function() {
          for (var e = []; e.push([]) < t; ) ;
          for (var r = 0; r < t; r++) for (var l = this.rowSize(r), n = 0; n < l; n++) e[r][n] = i[r][n];
          return e;
        } });
      };
    }
  });

  // src/circle.js
  var require_circle = __commonJS({
    "src/circle.js"(exports, module) {
      "use strict";
      var coreGrid = require_grid_core_cjs();
      module.exports = (spec = {}) => {
        let {
          rings: _rings = 0
        } = spec;
        _rings = Math.max(_rings, 0);
        var obj = coreGrid.create({ rows: _rings });
        obj.set(0, 0, 0);
        var rowHeight = 1 / _rings;
        for (var i = 1; i < _rings; i++) {
          var radius = i / _rings;
          var circumference = 2 * Math.PI * radius;
          var previousCount = obj.rowSize(i - 1);
          var estimatedCellWidth = circumference / previousCount;
          var ratio = Math.round(estimatedCellWidth / rowHeight);
          var cells = previousCount * ratio;
          for (var j = 0; j < cells; j++) {
            obj.set(i, j, 0);
          }
        }
        Object.defineProperties(obj, {
          "rings": {
            writeable: false,
            value: _rings,
            enumerable: true
          }
        });
        return Object.assign(obj, {
          ringSize: function(ring) {
            return this.rowSize(ring);
          }
        });
      };
    }
  });

  // src/index.js
  var require_index = __commonJS({
    "src/index.js"(exports, module) {
      var squareGrid = require_grid_square().create;
      var circleGrid = require_circle();
      var createGrid = (spec) => {
        console.warn("@mitchallen/grid: .create is deprecated. Use .Square instead.");
        return squareGrid(spec);
      };
      module.exports = {
        create: createGrid,
        Square: squareGrid,
        Circle: circleGrid,
        // For future expansion (mapped to square for now)
        Hexagon: squareGrid,
        Triangle: squareGrid
      };
    }
  });
  return require_index();
})();
