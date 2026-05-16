"use strict";
var MitchAllen = MitchAllen || {};
MitchAllen.Grid = (() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __commonJS = (cb, mod) => function __require2() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // node_modules/@mitchallen/grid-square/dist/grid-square.js
  var require_grid_square = __commonJS({
    "node_modules/@mitchallen/grid-square/dist/grid-square.js"(exports, module) {
      (function(f) {
        if (typeof exports === "object" && typeof module !== "undefined") {
          module.exports = f();
        } else if (typeof define === "function" && define.amd) {
          define([], f);
        } else {
          var g;
          if (typeof window !== "undefined") {
            g = window;
          } else if (typeof global !== "undefined") {
            g = global;
          } else if (typeof self !== "undefined") {
            g = self;
          } else {
            g = this;
          }
          (g.MitchAllen || (g.MitchAllen = {})).GridSquare = f();
        }
      })(function() {
        var define2, module2, exports2;
        return (/* @__PURE__ */ (function() {
          function r(e, n, t) {
            function o(i2, f) {
              if (!n[i2]) {
                if (!e[i2]) {
                  var c = "function" == typeof __require && __require;
                  if (!f && c) return c(i2, true);
                  if (u) return u(i2, true);
                  var a = new Error("Cannot find module '" + i2 + "'");
                  throw a.code = "MODULE_NOT_FOUND", a;
                }
                var p = n[i2] = { exports: {} };
                e[i2][0].call(p.exports, function(r2) {
                  var n2 = e[i2][1][r2];
                  return o(n2 || r2);
                }, p, p.exports, r, e, n, t);
              }
              return n[i2].exports;
            }
            for (var u = "function" == typeof __require && __require, i = 0; i < t.length; i++) o(t[i]);
            return o;
          }
          return r;
        })())({ 1: [function(_dereq_, module3, exports3) {
          (function(global2) {
            (function() {
              (function(f) {
                if (typeof exports3 === "object" && typeof module3 !== "undefined") {
                  module3.exports = f();
                } else if (typeof define2 === "function" && define2.amd) {
                  define2([], f);
                } else {
                  var g;
                  if (typeof window !== "undefined") {
                    g = window;
                  } else if (typeof global2 !== "undefined") {
                    g = global2;
                  } else if (typeof self !== "undefined") {
                    g = self;
                  } else {
                    g = this;
                  }
                  (g.MitchAllen || (g.MitchAllen = {})).GridCore = f();
                }
              })(function() {
                var define3, module4, exports4;
                return (/* @__PURE__ */ (function() {
                  function r(e, n, t) {
                    function o(i2, f) {
                      if (!n[i2]) {
                        if (!e[i2]) {
                          var c = "function" == typeof _dereq_ && _dereq_;
                          if (!f && c) return c(i2, true);
                          if (u) return u(i2, true);
                          var a = new Error("Cannot find module '" + i2 + "'");
                          throw a.code = "MODULE_NOT_FOUND", a;
                        }
                        var p = n[i2] = { exports: {} };
                        e[i2][0].call(p.exports, function(r2) {
                          var n2 = e[i2][1][r2];
                          return o(n2 || r2);
                        }, p, p.exports, r, e, n, t);
                      }
                      return n[i2].exports;
                    }
                    for (var u = "function" == typeof _dereq_ && _dereq_, i = 0; i < t.length; i++) o(t[i]);
                    return o;
                  }
                  return r;
                })())({ 1: [function(_dereq_2, module5, exports5) {
                  "use strict";
                  module5.exports.create = function() {
                    var spec = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                    var _spec$rows = spec.rows, _rows = _spec$rows === void 0 ? 0 : _spec$rows;
                    _rows = Math.max(_rows, 0);
                    var _array = [];
                    while (_array.push([]) < _rows) {
                    }
                    var obj = Object.create({}, {
                      "rows": {
                        writeable: false,
                        value: _rows,
                        enumerable: true
                      }
                    });
                    return Object.assign(obj, {
                      log: function log() {
                        console.log("size: %d: ", _rows);
                        console.log(_array);
                      },
                      rowSize: function rowSize(row) {
                        if (row < 0 || row >= _rows) {
                          return 0;
                        }
                        return _array[row].length;
                      },
                      isCell: function isCell(a, b) {
                        var rs = this.rowSize(a);
                        return a >= 0 && a < _rows && b >= 0 && b < rs;
                      },
                      set: function set(a, b, value) {
                        if (a < 0 || b < 0) return false;
                        _array[a][b] = value;
                        return true;
                      },
                      get: function get(a, b) {
                        if (!this.isCell(a, b)) {
                          return null;
                        }
                        return _array[a][b];
                      },
                      fill: function fill(value) {
                        for (var row = 0; row < _rows; row++) {
                          var rs = this.rowSize(row);
                          for (var pos = 0; pos < rs; pos++) {
                            _array[row][pos] = value;
                          }
                        }
                      },
                      cloneArray: function cloneArray() {
                        var _clone = [];
                        while (_clone.push([]) < _rows) {
                        }
                        for (var row = 0; row < _rows; row++) {
                          var rs = this.rowSize(row);
                          for (var pos = 0; pos < rs; pos++) {
                            _clone[row][pos] = _array[row][pos];
                          }
                        }
                        return _clone;
                      }
                    });
                  };
                }, {}] }, {}, [1])(1);
              });
            }).call(this);
          }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
        }, {}], 2: [function(_dereq_, module3, exports3) {
          "use strict";
          var coreGrid = _dereq_("@mitchallen/grid-core");
          module3.exports.create = function() {
            var spec = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
            var _spec$x = spec.x, _x = _spec$x === void 0 ? 0 : _spec$x, _spec$y = spec.y, _y = _spec$y === void 0 ? 0 : _spec$y;
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
        }, { "@mitchallen/grid-core": 1 }] }, {}, [2])(2);
      });
    }
  });

  // node_modules/@mitchallen/grid-core/dist/grid-core.js
  var require_grid_core = __commonJS({
    "node_modules/@mitchallen/grid-core/dist/grid-core.js"(exports, module) {
      (function(f) {
        if (typeof exports === "object" && typeof module !== "undefined") {
          module.exports = f();
        } else if (typeof define === "function" && define.amd) {
          define([], f);
        } else {
          var g;
          if (typeof window !== "undefined") {
            g = window;
          } else if (typeof global !== "undefined") {
            g = global;
          } else if (typeof self !== "undefined") {
            g = self;
          } else {
            g = this;
          }
          (g.MitchAllen || (g.MitchAllen = {})).GridCore = f();
        }
      })(function() {
        var define2, module2, exports2;
        return (/* @__PURE__ */ (function() {
          function r(e, n, t) {
            function o(i2, f) {
              if (!n[i2]) {
                if (!e[i2]) {
                  var c = "function" == typeof __require && __require;
                  if (!f && c) return c(i2, true);
                  if (u) return u(i2, true);
                  var a = new Error("Cannot find module '" + i2 + "'");
                  throw a.code = "MODULE_NOT_FOUND", a;
                }
                var p = n[i2] = { exports: {} };
                e[i2][0].call(p.exports, function(r2) {
                  var n2 = e[i2][1][r2];
                  return o(n2 || r2);
                }, p, p.exports, r, e, n, t);
              }
              return n[i2].exports;
            }
            for (var u = "function" == typeof __require && __require, i = 0; i < t.length; i++) o(t[i]);
            return o;
          }
          return r;
        })())({ 1: [function(_dereq_, module3, exports3) {
          "use strict";
          module3.exports.create = function() {
            var spec = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
            var _spec$rows = spec.rows, _rows = _spec$rows === void 0 ? 0 : _spec$rows;
            _rows = Math.max(_rows, 0);
            var _array = [];
            while (_array.push([]) < _rows) {
            }
            var obj = Object.create({}, {
              "rows": {
                writeable: false,
                value: _rows,
                enumerable: true
              }
            });
            return Object.assign(obj, {
              log: function log() {
                console.log("size: %d: ", _rows);
                console.log(_array);
              },
              rowSize: function rowSize(row) {
                if (row < 0 || row >= _rows) {
                  return 0;
                }
                return _array[row].length;
              },
              isCell: function isCell(a, b) {
                var rs = this.rowSize(a);
                return a >= 0 && a < _rows && b >= 0 && b < rs;
              },
              set: function set(a, b, value) {
                if (a < 0 || b < 0) return false;
                _array[a][b] = value;
                return true;
              },
              get: function get(a, b) {
                if (!this.isCell(a, b)) {
                  return null;
                }
                return _array[a][b];
              },
              fill: function fill(value) {
                for (var row = 0; row < _rows; row++) {
                  var rs = this.rowSize(row);
                  for (var pos = 0; pos < rs; pos++) {
                    _array[row][pos] = value;
                  }
                }
              },
              cloneArray: function cloneArray() {
                var _clone = [];
                while (_clone.push([]) < _rows) {
                }
                for (var row = 0; row < _rows; row++) {
                  var rs = this.rowSize(row);
                  for (var pos = 0; pos < rs; pos++) {
                    _clone[row][pos] = _array[row][pos];
                  }
                }
                return _clone;
              }
            });
          };
        }, {}] }, {}, [1])(1);
      });
    }
  });

  // src/circle.js
  var require_circle = __commonJS({
    "src/circle.js"(exports, module) {
      "use strict";
      var coreGrid = require_grid_core();
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
