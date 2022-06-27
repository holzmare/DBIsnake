"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _SnakeUtility = _interopRequireDefault(require("./SnakeUtility.js"));

var _Coord = _interopRequireDefault(require("./Coord.js"));

var _Field = _interopRequireDefault(require("./Field.js"));

var _Snake = _interopRequireDefault(require("./Snake.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * implements the game snake
 */
var SnakeGame = /*#__PURE__*/function () {
  /**
   * 
   * @param {HTMLElement} parent Game will be initialized as first child of this element
   * @param {Object} config possible Values: int initLength, int gridSize, int initSpeed, float speedUp, 
   *      int speedLimit, Object color {String bgColor, String bodyColor, String headColor}
   */
  function SnakeGame(parent, config) {
    var _this = this;

    _classCallCheck(this, SnakeGame);

    _defineProperty(this, "snake", void 0);

    _defineProperty(this, "food", void 0);

    _defineProperty(this, "key", []);

    this.loadConfiguration(parent, config);
    this.field = new _Field["default"](parent, this.GRIDSIZE, this.BGCOLOR, function () {
      _this.field.endScreen.hide();

      _this.running = true;

      _this.start();
    }, function () {
      _this.destroy();
    });
    this.keyDownHandlerBound = this.keyDownHandler.bind(this);
    document.addEventListener("keydown", this.keyDownHandlerBound, false);
    this.running = true;
  }

  _createClass(SnakeGame, [{
    key: "loadConfiguration",
    value: function loadConfiguration(parent, config) {
      var _config$gridSize, _config$bgColor, _config$initSpeed, _config$speedUp, _config$speedLimit, _config$headColor, _config$bodyColor, _config$initLength;

      this.parent = parent;
      this.DBIRED = "#EE2E31";
      this.DBIBLUE = "#1E345A";
      this.DBIWHITE = "#FFFFFF"; //TODO checken ob es wirklich FFFFFF ist

      this.GRIDSIZE = (_config$gridSize = config.gridSize) !== null && _config$gridSize !== void 0 ? _config$gridSize : 15;
      this.BGCOLOR = (_config$bgColor = config.bgColor) !== null && _config$bgColor !== void 0 ? _config$bgColor : this.DBIBLUE;
      this.INITSPEED = (_config$initSpeed = config.initSpeed) !== null && _config$initSpeed !== void 0 ? _config$initSpeed : 500;
      this.tickrate = this.INITSPEED;
      this.SPEEDUP = (_config$speedUp = config.speedUp) !== null && _config$speedUp !== void 0 ? _config$speedUp : 1.05;
      this.SPEEDLIMIT = (_config$speedLimit = config.speedLimit) !== null && _config$speedLimit !== void 0 ? _config$speedLimit : 50;
      this.HEADCOLOR = (_config$headColor = config.headColor) !== null && _config$headColor !== void 0 ? _config$headColor : "grey";
      this.BODYCOLOR = (_config$bodyColor = config.bodyColor) !== null && _config$bodyColor !== void 0 ? _config$bodyColor : this.DBIWHITE;
      this.INITLENGTH = (_config$initLength = config.initLength) !== null && _config$initLength !== void 0 ? _config$initLength : 3;
    }
    /**
     * starts the game
     */

  }, {
    key: "start",
    value: function () {
      var _start = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.field.clear();
                this.snake = new _Snake["default"](this.INITLENGTH, this.GRIDSIZE, this.BODYCOLOR, this.HEADCOLOR); // TODO: move this into start() function, so snake can't automatically crash when restarting

                this.renderBody();
                this.placeFood();
                this.key = [];
                this.field.score.set(0);
                this.field.score.update();

              case 7:
                if (!this.running) {
                  _context.next = 20;
                  break;
                }

                // console.log(this.key);
                this.snake.move(this.key.shift());

                if (!this.checkBodyCollision()) {
                  _context.next = 14;
                  break;
                }

                this.gameOver();
                return _context.abrupt("return");

              case 14:
                if (this.checkFoodCollision()) {
                  this.field.score.set(this.snake.body.length - this.snake.initLength); //Speedup

                  if (Math.floor(this.tickrate / this.SPEEDUP) > this.SPEEDLIMIT) {
                    this.tickrate = Math.floor(this.tickrate / this.SPEEDUP);
                  }

                  this.placeFood();
                } else {
                  this.field.renderSegment(this.snake.body.pop(), this.BGCOLOR); //Canvas hinter snake mit Hintergrundfarbe überschreiben
                }

              case 15:
                this.renderBody(this.snake.color, this.snake.headColor);
                _context.next = 18;
                return _SnakeUtility["default"].sleep(this.tickrate);

              case 18:
                _context.next = 7;
                break;

              case 20:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function start() {
        return _start.apply(this, arguments);
      }

      return start;
    }()
    /**
     * renders snake on Canvas
     * @param {*} color Farbe für Schwanz
     * @param {*} headcolor Farbe für Kopf
     */

  }, {
    key: "renderBody",
    value: function renderBody() {
      var _this2 = this;

      var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.DBIWHITE;
      var headcolor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "green";
      var head = this.snake.body[0];
      var tail = this.snake.body.slice(1);
      tail.forEach(function (segment) {
        _this2.field.renderSegment(segment, color);
      });
      this.field.renderSegment(head, headcolor);
    }
    /**
     * checks if head has collided with part of the snakes body
     */

  }, {
    key: "checkBodyCollision",
    value: function checkBodyCollision() {
      var _this3 = this;

      // checks collision with snake itself
      if (this.snake.body.slice(1, -1).some(function (coord) {
        return _Coord["default"].collides(coord, _this3.snake.body[0]);
      })) {
        return true;
      } else {
        return false;
      }
    }
    /**
     * checks if the head collides with food
     */

  }, {
    key: "checkFoodCollision",
    value: function checkFoodCollision() {
      if (_Coord["default"].collides(this.food, this.snake.body[0])) {
        return true;
      } else {
        return false;
      }
    }
    /**
     * places Food on an empty field
     */

  }, {
    key: "placeFood",
    value: function placeFood() {
      var free = this.notBody(); // console.log(free);

      this.food = free[Math.floor(Math.random() * free.length)];
      this.field.renderSegment(this.food, this.DBIRED);
    }
    /**
     * handles what happens at the end of a game
     */

  }, {
    key: "gameOver",
    value: function gameOver() {
      this.running = false;
      this.field.score.set(this.snake.body.length - (this.snake.initLength + 1));
      this.field.endScreen.setText(parseInt(this.field.score.score), parseInt(this.field.score.highscore));
      this.field.endScreen.show();

      if (parseInt(this.field.score.score) > parseInt(this.field.score.highscore)) {
        this.field.score.setHighscore(this.field.score.score);
      }

      this.tickrate = this.INITSPEED;
    }
    /**
     * generates an array with every field the snake is NOT on
     * @returns {Coord[]}
     */

  }, {
    key: "notBody",
    value: function notBody() {
      //generate all available fields
      var free = [];
      var c;

      for (var i = 0; i < this.GRIDSIZE; i++) {
        for (var j = 0; j < this.GRIDSIZE; j++) {
          c = new _Coord["default"](i, j);

          if (!this.snake.body.some(function (field) {
            return _Coord["default"].collides(field, c);
          })) {
            free.push(c);
          }
        }
      }
      /*
      console.log(free);
      free.forEach(segment => {
          field.renderSegment(segment,"red")
      });
      */


      return free;
    }
    /**
     * handles what happens on keyboard Events (left and right arrow)
     * @param {keyDownEvent} e
     */

  }, {
    key: "keyDownHandler",
    value: function keyDownHandler(e) {
      //console.log(this.key)
      if (this.key.length <= 2) {
        if (e.key === "Right" || e.key === "ArrowRight") {
          this.key.push("r");
        } else if (e.key === "Left" || e.key === "ArrowLeft") {
          this.key.push("l");
        }
      } //console.log(this.key);

    }
    /**
     * cleans up handlers
     */

  }, {
    key: "destroy",
    value: function destroy() {
      document.removeEventListener("keydown", this.keyDownHandlerBound, false);
      this.field.destroy();
    }
  }]);

  return SnakeGame;
}();

exports["default"] = SnakeGame;