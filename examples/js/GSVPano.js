(function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = typeof require == "function" && require;
        if (!u && a) return a(o, !0);
        if (i) return i(o, !0);
        var f = new Error("Cannot find module '" + o + "'");
        throw ((f.code = "MODULE_NOT_FOUND"), f);
      }
      var l = (n[o] = { exports: {} });
      t[o][0].call(
        l.exports,
        function(e) {
          var n = t[o][1][e];
          return s(n ? n : e);
        },
        l,
        l.exports,
        e,
        t,
        n,
        r
      );
    }
    return n[o].exports;
  }
  var i = typeof require == "function" && require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
})(
  {
    1: [
      function(require, module, exports) {
        "use strict";

        var isValue = require("type/value/is"),
          isPlainFunction = require("type/plain-function/is"),
          assign = require("es5-ext/object/assign"),
          normalizeOpts = require("es5-ext/object/normalize-options"),
          contains = require("es5-ext/string/#/contains");

        var d = (module.exports = function(dscr, value /*, options*/) {
          var c, e, w, options, desc;
          if (arguments.length < 2 || typeof dscr !== "string") {
            options = value;
            value = dscr;
            dscr = null;
          } else {
            options = arguments[2];
          }
          if (isValue(dscr)) {
            c = contains.call(dscr, "c");
            e = contains.call(dscr, "e");
            w = contains.call(dscr, "w");
          } else {
            c = w = true;
            e = false;
          }

          desc = { value: value, configurable: c, enumerable: e, writable: w };
          return !options ? desc : assign(normalizeOpts(options), desc);
        });

        d.gs = function(dscr, get, set /*, options*/) {
          var c, e, options, desc;
          if (typeof dscr !== "string") {
            options = set;
            set = get;
            get = dscr;
            dscr = null;
          } else {
            options = arguments[3];
          }
          if (!isValue(get)) {
            get = undefined;
          } else if (!isPlainFunction(get)) {
            options = get;
            get = set = undefined;
          } else if (!isValue(set)) {
            set = undefined;
          } else if (!isPlainFunction(set)) {
            options = set;
            set = undefined;
          }
          if (isValue(dscr)) {
            c = contains.call(dscr, "c");
            e = contains.call(dscr, "e");
          } else {
            c = true;
            e = false;
          }

          desc = { get: get, set: set, configurable: c, enumerable: e };
          return !options ? desc : assign(normalizeOpts(options), desc);
        };
      },
      {
        "es5-ext/object/assign": 3,
        "es5-ext/object/normalize-options": 11,
        "es5-ext/string/#/contains": 15,
        "type/plain-function/is": 22,
        "type/value/is": 24
      }
    ],
    2: [
      function(require, module, exports) {
        "use strict";

        // eslint-disable-next-line no-empty-function
        module.exports = function() {};
      },
      {}
    ],
    3: [
      function(require, module, exports) {
        "use strict";

        module.exports = require("./is-implemented")()
          ? Object.assign
          : require("./shim");
      },
      { "./is-implemented": 4, "./shim": 5 }
    ],
    4: [
      function(require, module, exports) {
        "use strict";

        module.exports = function() {
          var assign = Object.assign,
            obj;
          if (typeof assign !== "function") return false;
          obj = { foo: "raz" };
          assign(obj, { bar: "dwa" }, { trzy: "trzy" });
          return obj.foo + obj.bar + obj.trzy === "razdwatrzy";
        };
      },
      {}
    ],
    5: [
      function(require, module, exports) {
        "use strict";

        var keys = require("../keys"),
          value = require("../valid-value"),
          max = Math.max;

        module.exports = function(dest, src /*, …srcn*/) {
          var error,
            i,
            length = max(arguments.length, 2),
            assign;
          dest = Object(value(dest));
          assign = function(key) {
            try {
              dest[key] = src[key];
            } catch (e) {
              if (!error) error = e;
            }
          };
          for (i = 1; i < length; ++i) {
            src = arguments[i];
            keys(src).forEach(assign);
          }
          if (error !== undefined) throw error;
          return dest;
        };
      },
      { "../keys": 8, "../valid-value": 14 }
    ],
    6: [
      function(require, module, exports) {
        "use strict";

        var isValue = require("./is-value");

        var map = { function: true, object: true };

        module.exports = function(value) {
          return (isValue(value) && map[typeof value]) || false;
        };
      },
      { "./is-value": 7 }
    ],
    7: [
      function(require, module, exports) {
        "use strict";

        var _undefined = require("../function/noop")(); // Support ES3 engines

        module.exports = function(val) {
          return val !== _undefined && val !== null;
        };
      },
      { "../function/noop": 2 }
    ],
    8: [
      function(require, module, exports) {
        "use strict";

        module.exports = require("./is-implemented")()
          ? Object.keys
          : require("./shim");
      },
      { "./is-implemented": 9, "./shim": 10 }
    ],
    9: [
      function(require, module, exports) {
        "use strict";

        module.exports = function() {
          try {
            Object.keys("primitive");
            return true;
          } catch (e) {
            return false;
          }
        };
      },
      {}
    ],
    10: [
      function(require, module, exports) {
        "use strict";

        var isValue = require("../is-value");

        var keys = Object.keys;

        module.exports = function(object) {
          return keys(isValue(object) ? Object(object) : object);
        };
      },
      { "../is-value": 7 }
    ],
    11: [
      function(require, module, exports) {
        "use strict";

        var isValue = require("./is-value");

        var forEach = Array.prototype.forEach,
          create = Object.create;

        var process = function(src, obj) {
          var key;
          for (key in src) obj[key] = src[key];
        };

        // eslint-disable-next-line no-unused-vars
        module.exports = function(opts1 /*, …options*/) {
          var result = create(null);
          forEach.call(arguments, function(options) {
            if (!isValue(options)) return;
            process(Object(options), result);
          });
          return result;
        };
      },
      { "./is-value": 7 }
    ],
    12: [
      function(require, module, exports) {
        "use strict";

        module.exports = function(fn) {
          if (typeof fn !== "function")
            throw new TypeError(fn + " is not a function");
          return fn;
        };
      },
      {}
    ],
    13: [
      function(require, module, exports) {
        "use strict";

        var isObject = require("./is-object");

        module.exports = function(value) {
          if (!isObject(value))
            throw new TypeError(value + " is not an Object");
          return value;
        };
      },
      { "./is-object": 6 }
    ],
    14: [
      function(require, module, exports) {
        "use strict";

        var isValue = require("./is-value");

        module.exports = function(value) {
          if (!isValue(value))
            throw new TypeError("Cannot use null or undefined");
          return value;
        };
      },
      { "./is-value": 7 }
    ],
    15: [
      function(require, module, exports) {
        "use strict";

        module.exports = require("./is-implemented")()
          ? String.prototype.contains
          : require("./shim");
      },
      { "./is-implemented": 16, "./shim": 17 }
    ],
    16: [
      function(require, module, exports) {
        "use strict";

        var str = "razdwatrzy";

        module.exports = function() {
          if (typeof str.contains !== "function") return false;
          return str.contains("dwa") === true && str.contains("foo") === false;
        };
      },
      {}
    ],
    17: [
      function(require, module, exports) {
        "use strict";

        var indexOf = String.prototype.indexOf;

        module.exports = function(searchString /*, position*/) {
          return indexOf.call(this, searchString, arguments[1]) > -1;
        };
      },
      {}
    ],
    18: [
      function(require, module, exports) {
        "use strict";

        var value = require("es5-ext/object/valid-object"),
          hasOwnProperty = Object.prototype.hasOwnProperty;

        module.exports = function(emitter /*, type*/) {
          var type = arguments[1],
            data;

          value(emitter);

          if (type !== undefined) {
            data = hasOwnProperty.call(emitter, "__ee__") && emitter.__ee__;
            if (!data) return;
            if (data[type]) delete data[type];
            return;
          }
          if (hasOwnProperty.call(emitter, "__ee__")) delete emitter.__ee__;
        };
      },
      { "es5-ext/object/valid-object": 13 }
    ],
    19: [
      function(require, module, exports) {
        "use strict";

        var d = require("d"),
          callable = require("es5-ext/object/valid-callable"),
          apply = Function.prototype.apply,
          call = Function.prototype.call,
          create = Object.create,
          defineProperty = Object.defineProperty,
          defineProperties = Object.defineProperties,
          hasOwnProperty = Object.prototype.hasOwnProperty,
          descriptor = {
            configurable: true,
            enumerable: false,
            writable: true
          },
          on,
          once,
          off,
          emit,
          methods,
          descriptors,
          base;

        on = function(type, listener) {
          var data;

          callable(listener);

          if (!hasOwnProperty.call(this, "__ee__")) {
            data = descriptor.value = create(null);
            defineProperty(this, "__ee__", descriptor);
            descriptor.value = null;
          } else {
            data = this.__ee__;
          }
          if (!data[type]) data[type] = listener;
          else if (typeof data[type] === "object") data[type].push(listener);
          else data[type] = [data[type], listener];

          return this;
        };

        once = function(type, listener) {
          var once, self;

          callable(listener);
          self = this;
          on.call(
            this,
            type,
            (once = function() {
              off.call(self, type, once);
              apply.call(listener, this, arguments);
            })
          );

          once.__eeOnceListener__ = listener;
          return this;
        };

        off = function(type, listener) {
          var data, listeners, candidate, i;

          callable(listener);

          if (!hasOwnProperty.call(this, "__ee__")) return this;
          data = this.__ee__;
          if (!data[type]) return this;
          listeners = data[type];

          if (typeof listeners === "object") {
            for (i = 0; (candidate = listeners[i]); ++i) {
              if (
                candidate === listener ||
                candidate.__eeOnceListener__ === listener
              ) {
                if (listeners.length === 2) data[type] = listeners[i ? 0 : 1];
                else listeners.splice(i, 1);
              }
            }
          } else {
            if (
              listeners === listener ||
              listeners.__eeOnceListener__ === listener
            ) {
              delete data[type];
            }
          }

          return this;
        };

        emit = function(type) {
          var i, l, listener, listeners, args;

          if (!hasOwnProperty.call(this, "__ee__")) return;
          listeners = this.__ee__[type];
          if (!listeners) return;

          if (typeof listeners === "object") {
            l = arguments.length;
            args = new Array(l - 1);
            for (i = 1; i < l; ++i) args[i - 1] = arguments[i];

            listeners = listeners.slice();
            for (i = 0; (listener = listeners[i]); ++i) {
              apply.call(listener, this, args);
            }
          } else {
            switch (arguments.length) {
              case 1:
                call.call(listeners, this);
                break;
              case 2:
                call.call(listeners, this, arguments[1]);
                break;
              case 3:
                call.call(listeners, this, arguments[1], arguments[2]);
                break;
              default:
                l = arguments.length;
                args = new Array(l - 1);
                for (i = 1; i < l; ++i) {
                  args[i - 1] = arguments[i];
                }
                apply.call(listeners, this, args);
            }
          }
        };

        methods = {
          on: on,
          once: once,
          off: off,
          emit: emit
        };

        descriptors = {
          on: d(on),
          once: d(once),
          off: d(off),
          emit: d(emit)
        };

        base = defineProperties({}, descriptors);

        module.exports = exports = function(o) {
          return o == null
            ? create(base)
            : defineProperties(Object(o), descriptors);
        };
        exports.methods = methods;
      },
      { d: 1, "es5-ext/object/valid-callable": 12 }
    ],
    20: [
      function(require, module, exports) {
        "use strict";

        var isPrototype = require("../prototype/is");

        module.exports = function(value) {
          if (typeof value !== "function") return false;

          if (!hasOwnProperty.call(value, "length")) return false;

          try {
            if (typeof value.length !== "number") return false;
            if (typeof value.call !== "function") return false;
            if (typeof value.apply !== "function") return false;
          } catch (error) {
            return false;
          }

          return !isPrototype(value);
        };
      },
      { "../prototype/is": 23 }
    ],
    21: [
      function(require, module, exports) {
        "use strict";

        var isValue = require("../value/is");

        // prettier-ignore
        var possibleTypes = { "object": true, "function": true, "undefined": true /* document.all */ };

        module.exports = function(value) {
          if (!isValue(value)) return false;
          return hasOwnProperty.call(possibleTypes, typeof value);
        };
      },
      { "../value/is": 24 }
    ],
    22: [
      function(require, module, exports) {
        "use strict";

        var isFunction = require("../function/is");

        var classRe = /^\s*class[\s{/}]/,
          functionToString = Function.prototype.toString;

        module.exports = function(value) {
          if (!isFunction(value)) return false;
          if (classRe.test(functionToString.call(value))) return false;
          return true;
        };
      },
      { "../function/is": 20 }
    ],
    23: [
      function(require, module, exports) {
        "use strict";

        var isObject = require("../object/is");

        module.exports = function(value) {
          if (!isObject(value)) return false;
          try {
            if (!value.constructor) return false;
            return value.constructor.prototype === value;
          } catch (error) {
            return false;
          }
        };
      },
      { "../object/is": 21 }
    ],
    24: [
      function(require, module, exports) {
        "use strict";

        // ES3 safe
        var _undefined = void 0;

        module.exports = function(value) {
          return value !== _undefined && value !== null;
        };
      },
      {}
    ],
    25: [
      function(require, module, exports) {
        (function(global) {
          // GSVPano.js
          // Copyright (c) 2014 Heganoo
          // https://github.com/heganoo/GSVPano

          var eventEmitter = require("event-emitter");

          /**
           * @module GSVPANO
           * @author Hegano
           * @author juampi92
           */
          var GSVPANO = GSVPANO || {};

          /**
           * Fetch URL. Use this parameter in case the URL stops working. At
           * the end of this string, the parameters &panoid, &x, &y, &zoom
           * and the current timestamp are appended.
           * @property GSVPANO._url
           * @type {String}
           * @default 'http://maps.google.com/cbk?output=tile'
           */
          // 'https://geo0.ggpht.com/cbk?cb_client=maps_sv.tactile&authuser=0&hl=en&output=tile&nbt&fover=2'
          // 'https://cbks2.google.com/cbk?cb_client=maps_sv.tactile&authuser=0&hl=en&output=tile'

          GSVPANO._url = "http://maps.google.com/cbk?output=tile";

          /**
           * Data Fetch URL. Use this parameter in case the URL stops working.
           * At the end of this string, the parameter &ll is appended.
           * @property GSVPANO._data_url
           * @type {String}
           * @default 'https://cbks0.google.com/cbk?cb_client=maps_sv.tactile&authuser=0&hl=en&output=polygon&it=1%3A1&rank=closest&radius=350'
           */
          GSVPANO._data_url =
            "https://cbks0.google.com/cbk?cb_client=maps_sv.tactile&authuser=0&hl=en&output=polygon&it=1%3A1&rank=closest&radius=350";

          GSVPANO.Pano = require("./Pano");

          /**
           * @class PanoLoader
           * @extends {EventEmitter}
           * @constructor
           * @param {Object} parameters
           * @param {Number} parameters.zoom Zoom (default 1)
           * @param {Number} parameters.autocompose Compose automatically (default true)
           * @example
           *       var loader = new GSVPANO.PanoLoader({ zoom: 3, autocompose: false });
           */
          GSVPANO.PanoLoader = function(parameters) {
            "use strict";

            eventEmitter(this);

            var _params = parameters || {};

            this._panoClient = new google.maps.StreetViewService();

            /**
             * @attribute zoom
             * @type {Number}
             * @default 1
             * @private
             */
            this.setZoom(_params.zoom || 1);
            /**
             * Decides that when a Pano is added, it starts composing right away
             * @attribute autocompose
             * @type {Boolean}
             * @default true
             */
            this.autocompose =
              _params.autocompose === undefined ? true : _params.autocompose;
          };

          /**
           * @event panorama.data
           * @param {Pano} pano
           * @example
           *     loader.on('panorama.data', function(pano){
           *       console.log('Pano ' + pano.id + ' added');
           *     });
           */

          /**
           * @event panorama.nodata
           * @param {Google.Maps.LatLng} location
           * @param {Google.Maps.StreetViewStatus} status
           */

          /**
           * @event panorama.progress
           * @param {Number} p
           * @param {Pano} pano
           * @example
           *         loader.on('progress', function(p, pano) {
           *           console.log('Pano progress: ' + p + '%');
           *         });
           */
          GSVPANO.PanoLoader.prototype._setProgress = function(pano, p) {
            this.emit("panorama.progress", p, pano);
          };
          /**
           * @event panorama.load
           * @param {Pano} pano
           * @example
           *     loader.on('panorama.load', function(pano){
           *       $container.append(pano.canvas);
           *     });
           */

          /**
           * @event error
           * @param {String} message
           * @example
           *     loader.on('error', function(message){
           *       console.log(message)
           *     });
           */
          GSVPANO.PanoLoader.prototype._hrowError = function(message) {
            this.emit("error", message);
          };

          /**
           * Middle function for working with IDs.
           * @method loadData
           * @param {Google.Maps.Location} location
           * @deprecated Disabled right now
           */
          /*this.loadData = function(location) {
  var self = this;
  var url;

  //url = 'https://maps.google.com/cbk?output=json&hl=x-local&ll=' + location.lat() + ',' + location.lng() + '&cb_client=maps_sv&v=3';
  url = GSVPANO._data_url + '&ll=' + location.lat() + ',' + location.lng();

  var http_request = new XMLHttpRequest();
  http_request.open("GET", url, true);
  http_request.onreadystatechange = function() {
    if (http_request.readyState == 4 && http_request.status == 200) {
      var data = JSON.parse(http_request.responseText);
      // self.loadPano(location, data.result[0].id);
    }
  };
  http_request.send(null);
};*/

          /**
           * Fires panorama.data, panorama.nodata
           * @method load
           * @param {Google.Maps.Location} location
           * @param {Function} callback
           * @example
           *         // Let the panorama.load event handle it's load
           *         loader.load(new google.maps.LatLng(lat, lng));
           * @example
           *         // Also handle the load individually
           *         loader.load(new google.maps.LatLng(lat, lng), function(pano){
           *           // This individual load has been completed
           *           container.append(pano.canvas);
           *         });
           */
          GSVPANO.PanoLoader.prototype.load = function(location, callback) {
            var self = this;

            this._panoClient.getPanoramaByLocation(location, 50, function(
              result,
              status
            ) {
              if (status === google.maps.StreetViewStatus.OK) {
                var pano = new GSVPANO.Pano({
                  id: result.location.pano,
                  rotation: result.tiles.centerHeading,
                  pitch: result.tiles.originPitch,
                  copyright: result.copyright,
                  imageDate: result.imageDate,
                  location: result.location,
                  zoom: self.zoom
                })
                  .on("complete", self.emit.bind(self, "panorama.load"))
                  .on("progress", self._setProgress.bind(self, pano));

                if (self.autocompose) {
                  pano.compose();
                }
                self.emit("panorama.data", pano);

                if (callback) {
                  callback(pano);
                }
              } else {
                self.emit("panorama.nodata", location, status);
                self._throwError(
                  "Could not retrieve panorama for the following reason: " +
                    status
                );
              }
            });
          };

          /**
           * @method setZoom
           * @param {Number} z
           */
          GSVPANO.PanoLoader.prototype.setZoom = function(z) {
            this.zoom = z;
          };

          global.GSVPANO = module.exports = GSVPANO;
        }.call(
          this,
          typeof global !== "undefined"
            ? global
            : typeof self !== "undefined"
            ? self
            : typeof window !== "undefined"
            ? window
            : {}
        ));
      },
      { "./Pano": 26, "event-emitter": 19 }
    ],
    26: [
      function(require, module, exports) {
        /**
         * @module GSVPANO
         */

        var eventEmitter = require("event-emitter");
        eventEmitter.alloff = require("event-emitter/all-off");

        /**
         * One single Panoramic item
         * @class Pano
         * @author juampi92
         * @extends {EventEmitter}
         * @constructor
         * @param  {Object} params
         * @param {Hash} params.id
         * @param {Number} params.rotation (on degrees)
         * @param {Number} params.pitch
         * @param {Google.Maps.LatLng} params.location
         * @param {String} params.copyright
         * @param {Date} params.imageDate
         * @param {Number} params.zoom
         * @example
         *         var pano = new GSVPANO.Pano({
         *           id: panoId,
         *           rotation: rotation,
         *           pitch: pitch,
         *           location: location,
         *           imageDate: imageDate,
         *           copyright: copyright,
         *           zoom: zoom
         *         });
         */
        var Pano = function(params) {
          eventEmitter(this);

          var _params = params || {};

          /**
           * @attribute id
           * @type {Hash}
           */
          this.id = params.id;
          /**
           * @attribute rotation
           * @type {Number}
           */
          this.setRotation(params.rotation || 0);
          /**
           * @attribute pitch
           * @type {Number}
           */
          this.pitch = params.pitch;
          /**
           * @attribute location
           * @type {Google.Maps.LatLng}
           */
          this.location = params.location;
          /**
           * @attribute imageDate
           * @type {Date}
           */
          this.imageDate = params.imageDate;
          /**
           * @attribute copyright
           * @type {String}
           */
          this.copyright = params.copyright;
          /**
           * @attribute zoom
           * @type {Number}
           */
          this.zoom = parseInt(params.zoom);
          /**
           * @attribute canvas
           * @type {Canvas Element}
           * @default null
           */
          this.canvas = null;
          /**
           * @attribute _ctx
           * @type {Canvas 2d Context}
           * @default null
           */
          this._ctx = null;
          /**
           * @attribute _loaded
           * @type {Boolean}
           */
          this._loaded = false;
        };

        /**
         * Saves rotation. Input in degrees
         * @method setRotation
         * @param  {Number} deg
         * @chainable
         */
        Pano.prototype.setRotation = function(deg) {
          this.rotation = (deg * Math.PI) / 180.0;
          return this;
        };

        /**
         * @method initCanvas
         * @private
         */
        Pano.prototype.initCanvas = function() {
          this.canvas = document.createElement("canvas");
          this._ctx = this.canvas.getContext("2d");

          var w = 416 * Math.pow(2, this.zoom),
            h = 416 * Math.pow(2, this.zoom - 1);
          this.canvas.width = w;
          this.canvas.height = h;
        };

        /**
         * Progress notification
         * @event progress
         * @param  {Number} p
         * @chainable
         * @example
         *         pano.on('progress', function(p) {
         *           console.log('Pano download progress: ' + p + '%');
         *         });
         */
        /**
         * Complete notification
         * @event complete
         * @param  {Pano} pano
         * @chainable
         * @example
         *         pano.on('complete', function(p) {
         *           console.log('Pano completed progress: ' + p + '%');
         *         });
         */
        /**
         * Will fire 'callback' when completed
         * @method compose
         * @param {Hash} panoId
         * @chainable
         * @example
         *         var pano = new Pano(...);
         *         pano.compose();
         */
        Pano.prototype.compose = function() {
          this.initCanvas();

          var w,
            h = Math.pow(2, this.zoom - 1),
            url,
            x,
            y;

          switch (this.zoom) {
            case 5:
              w = 26;
              h = 13;
              break;
            case 4:
              w = 13;
              h = 7;
              break;
            case 3:
              w = 7;
              break;
            default:
              w = Math.pow(2, this.zoom);
          }

          this._count = 0;
          this._total = w * h;

          // Get the tiles
          for (y = 0; y < h; y++) {
            for (x = 0; x < w; x++) {
              this.createImage(x, y);
            }
          }
          return this;
        };

        /**
         * Creates an Image with the appropiate load callback
         * @method createImage
         * @param  {Number} x
         * @param  {Number} y
         * @private
         */
        Pano.prototype.createImage = function(x, y) {
          var url =
            GSVPANO._url +
            "&panoid=" +
            this.id +
            "&zoom=" +
            this.zoom +
            "&x=" +
            x +
            "&y=" +
            y;
          // y +
          // "&" +
          // Date.now(),
          img = new Image();

          img.addEventListener(
            "load",
            this.composeFromTile.bind(this, x, y, img)
          );
          img.crossOrigin = "";
          img.src = url;
        };

        /**
         * @method composeFromTile
         * @param {Number} x
         * @param {Number} y
         * @param {Image} texture
         * @private
         */
        Pano.prototype.composeFromTile = function(x, y, texture) {
          // Complete this section of the frame
          this._ctx.drawImage(texture, x * 512, y * 512);
          this._count++;

          var p = Math.round((this._count * 100) / this._total);
          this.emit("progress", p);

          // If finished
          if (this._count === this._total) {
            // Done loading
            this._loaded = true;
            // Trigger complete event
            this.emit("complete", this);
            // Remove all events
            eventEmitter.alloff(this);
          }
        };

        module.exports = Pano;
      },
      { "event-emitter": 19, "event-emitter/all-off": 18 }
    ]
  },
  {},
  [25]
);
