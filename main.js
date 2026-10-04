"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/.pnpm/jszip@3.10.2/node_modules/jszip/dist/jszip.min.js
var require_jszip_min = __commonJS({
  "node_modules/.pnpm/jszip@3.10.2/node_modules/jszip/dist/jszip.min.js"(exports, module2) {
    !(function(e) {
      if ("object" == typeof exports && "undefined" != typeof module2) module2.exports = e();
      else if ("function" == typeof define && define.amd) define([], e);
      else {
        ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).JSZip = e();
      }
    })(function() {
      return (function s(a, o, h) {
        function u(r, e2) {
          if (!o[r]) {
            if (!a[r]) {
              var t = "function" == typeof require && require;
              if (!e2 && t) return t(r, true);
              if (l) return l(r, true);
              var n = new Error("Cannot find module '" + r + "'");
              throw n.code = "MODULE_NOT_FOUND", n;
            }
            var i = o[r] = { exports: {} };
            a[r][0].call(i.exports, function(e3) {
              var t2 = a[r][1][e3];
              return u(t2 || e3);
            }, i, i.exports, s, a, o, h);
          }
          return o[r].exports;
        }
        for (var l = "function" == typeof require && require, e = 0; e < h.length; e++) u(h[e]);
        return u;
      })({ 1: [function(e, t, r) {
        "use strict";
        var d = e("./utils"), c = e("./support"), p = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        r.encode = function(e2) {
          for (var t2, r2, n, i, s, a, o, h = [], u = 0, l = e2.length, f = l, c2 = "string" !== d.getTypeOf(e2); u < e2.length; ) f = l - u, n = c2 ? (t2 = e2[u++], r2 = u < l ? e2[u++] : 0, u < l ? e2[u++] : 0) : (t2 = e2.charCodeAt(u++), r2 = u < l ? e2.charCodeAt(u++) : 0, u < l ? e2.charCodeAt(u++) : 0), i = t2 >> 2, s = (3 & t2) << 4 | r2 >> 4, a = 1 < f ? (15 & r2) << 2 | n >> 6 : 64, o = 2 < f ? 63 & n : 64, h.push(p.charAt(i) + p.charAt(s) + p.charAt(a) + p.charAt(o));
          return h.join("");
        }, r.decode = function(e2) {
          var t2, r2, n, i, s, a, o = 0, h = 0, u = "data:";
          if (e2.substr(0, u.length) === u) throw new Error("Invalid base64 input, it looks like a data url.");
          var l, f = 3 * (e2 = e2.replace(/[^A-Za-z0-9+/=]/g, "")).length / 4;
          if (e2.charAt(e2.length - 1) === p.charAt(64) && f--, e2.charAt(e2.length - 2) === p.charAt(64) && f--, f % 1 != 0) throw new Error("Invalid base64 input, bad content length.");
          for (l = c.uint8array ? new Uint8Array(0 | f) : new Array(0 | f); o < e2.length; ) t2 = p.indexOf(e2.charAt(o++)) << 2 | (i = p.indexOf(e2.charAt(o++))) >> 4, r2 = (15 & i) << 4 | (s = p.indexOf(e2.charAt(o++))) >> 2, n = (3 & s) << 6 | (a = p.indexOf(e2.charAt(o++))), l[h++] = t2, 64 !== s && (l[h++] = r2), 64 !== a && (l[h++] = n);
          return l;
        };
      }, { "./support": 30, "./utils": 32 }], 2: [function(e, t, r) {
        "use strict";
        var n = e("./external"), i = e("./stream/DataWorker"), s = e("./stream/Crc32Probe"), a = e("./stream/DataLengthProbe");
        function o(e2, t2, r2, n2, i2) {
          this.compressedSize = e2, this.uncompressedSize = t2, this.crc32 = r2, this.compression = n2, this.compressedContent = i2;
        }
        o.prototype = { getContentWorker: function() {
          var e2 = new i(n.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new a("data_length")), t2 = this;
          return e2.on("end", function() {
            if (this.streamInfo.data_length !== t2.uncompressedSize) throw new Error("Bug : uncompressed data size mismatch");
          }), e2;
        }, getCompressedWorker: function() {
          return new i(n.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression);
        } }, o.createWorkerFrom = function(e2, t2, r2) {
          return e2.pipe(new s()).pipe(new a("uncompressedSize")).pipe(t2.compressWorker(r2)).pipe(new a("compressedSize")).withStreamInfo("compression", t2);
        }, t.exports = o;
      }, { "./external": 6, "./stream/Crc32Probe": 25, "./stream/DataLengthProbe": 26, "./stream/DataWorker": 27 }], 3: [function(e, t, r) {
        "use strict";
        var n = e("./stream/GenericWorker");
        r.STORE = { magic: "\0\0", compressWorker: function() {
          return new n("STORE compression");
        }, uncompressWorker: function() {
          return new n("STORE decompression");
        } }, r.DEFLATE = e("./flate");
      }, { "./flate": 7, "./stream/GenericWorker": 28 }], 4: [function(e, t, r) {
        "use strict";
        var n = e("./utils");
        var o = (function() {
          for (var e2, t2 = [], r2 = 0; r2 < 256; r2++) {
            e2 = r2;
            for (var n2 = 0; n2 < 8; n2++) e2 = 1 & e2 ? 3988292384 ^ e2 >>> 1 : e2 >>> 1;
            t2[r2] = e2;
          }
          return t2;
        })();
        t.exports = function(e2, t2) {
          return void 0 !== e2 && e2.length ? "string" !== n.getTypeOf(e2) ? (function(e3, t3, r2, n2) {
            var i = o, s = n2 + r2;
            e3 ^= -1;
            for (var a = n2; a < s; a++) e3 = e3 >>> 8 ^ i[255 & (e3 ^ t3[a])];
            return -1 ^ e3;
          })(0 | t2, e2, e2.length, 0) : (function(e3, t3, r2, n2) {
            var i = o, s = n2 + r2;
            e3 ^= -1;
            for (var a = n2; a < s; a++) e3 = e3 >>> 8 ^ i[255 & (e3 ^ t3.charCodeAt(a))];
            return -1 ^ e3;
          })(0 | t2, e2, e2.length, 0) : 0;
        };
      }, { "./utils": 32 }], 5: [function(e, t, r) {
        "use strict";
        r.base64 = false, r.binary = false, r.dir = false, r.createFolders = true, r.date = null, r.compression = null, r.compressionOptions = null, r.comment = null, r.unixPermissions = null, r.dosPermissions = null;
      }, {}], 6: [function(e, t, r) {
        "use strict";
        var n = null;
        n = "undefined" != typeof Promise ? Promise : e("lie"), t.exports = { Promise: n };
      }, { lie: 37 }], 7: [function(e, t, r) {
        "use strict";
        var n = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Uint32Array, i = e("pako"), s = e("./utils"), a = e("./stream/GenericWorker"), o = n ? "uint8array" : "array";
        function h(e2, t2) {
          a.call(this, "FlateWorker/" + e2), this._pako = null, this._pakoAction = e2, this._pakoOptions = t2, this.meta = {};
        }
        r.magic = "\b\0", s.inherits(h, a), h.prototype.processChunk = function(e2) {
          this.meta = e2.meta, null === this._pako && this._createPako(), this._pako.push(s.transformTo(o, e2.data), false);
        }, h.prototype.flush = function() {
          a.prototype.flush.call(this), null === this._pako && this._createPako(), this._pako.push([], true);
        }, h.prototype.cleanUp = function() {
          a.prototype.cleanUp.call(this), this._pako = null;
        }, h.prototype._createPako = function() {
          this._pako = new i[this._pakoAction]({ raw: true, level: this._pakoOptions.level || -1 });
          var t2 = this;
          this._pako.onData = function(e2) {
            t2.push({ data: e2, meta: t2.meta });
          };
        }, r.compressWorker = function(e2) {
          return new h("Deflate", e2);
        }, r.uncompressWorker = function() {
          return new h("Inflate", {});
        };
      }, { "./stream/GenericWorker": 28, "./utils": 32, pako: 38 }], 8: [function(e, t, r) {
        "use strict";
        function A(e2, t2) {
          var r2, n2 = "";
          for (r2 = 0; r2 < t2; r2++) n2 += String.fromCharCode(255 & e2), e2 >>>= 8;
          return n2;
        }
        function n(e2, t2, r2, n2, i2, s2) {
          var a, o, h = e2.file, u = e2.compression, l = s2 !== O.utf8encode, f = I.transformTo("string", s2(h.name)), c = I.transformTo("string", O.utf8encode(h.name)), d = h.comment, p = I.transformTo("string", s2(d)), m = I.transformTo("string", O.utf8encode(d)), _ = c.length !== h.name.length, g = m.length !== d.length, b = "", v = "", y = "", w = h.dir, k = h.date, x = { crc32: 0, compressedSize: 0, uncompressedSize: 0 };
          t2 && !r2 || (x.crc32 = e2.crc32, x.compressedSize = e2.compressedSize, x.uncompressedSize = e2.uncompressedSize);
          var S = 0;
          t2 && (S |= 8), l || !_ && !g || (S |= 2048);
          var z = 0, C = 0;
          w && (z |= 16), "UNIX" === i2 ? (C = 798, z |= (function(e3, t3) {
            var r3 = e3;
            return e3 || (r3 = t3 ? 16893 : 33204), (65535 & r3) << 16;
          })(h.unixPermissions, w)) : (C = 20, z |= (function(e3) {
            return 63 & (e3 || 0);
          })(h.dosPermissions)), a = k.getUTCHours(), a <<= 6, a |= k.getUTCMinutes(), a <<= 5, a |= k.getUTCSeconds() / 2, o = k.getUTCFullYear() - 1980, o <<= 4, o |= k.getUTCMonth() + 1, o <<= 5, o |= k.getUTCDate(), _ && (v = A(1, 1) + A(B(f), 4) + c, b += "up" + A(v.length, 2) + v), g && (y = A(1, 1) + A(B(p), 4) + m, b += "uc" + A(y.length, 2) + y);
          var E = "";
          return E += "\n\0", E += A(S, 2), E += u.magic, E += A(a, 2), E += A(o, 2), E += A(x.crc32, 4), E += A(x.compressedSize, 4), E += A(x.uncompressedSize, 4), E += A(f.length, 2), E += A(b.length, 2), { fileRecord: R.LOCAL_FILE_HEADER + E + f + b, dirRecord: R.CENTRAL_FILE_HEADER + A(C, 2) + E + A(p.length, 2) + "\0\0\0\0" + A(z, 4) + A(n2, 4) + f + b + p };
        }
        var I = e("../utils"), i = e("../stream/GenericWorker"), O = e("../utf8"), B = e("../crc32"), R = e("../signature");
        function s(e2, t2, r2, n2) {
          i.call(this, "ZipFileWorker"), this.bytesWritten = 0, this.zipComment = t2, this.zipPlatform = r2, this.encodeFileName = n2, this.streamFiles = e2, this.accumulate = false, this.contentBuffer = [], this.dirRecords = [], this.currentSourceOffset = 0, this.entriesCount = 0, this.currentFile = null, this._sources = [];
        }
        I.inherits(s, i), s.prototype.push = function(e2) {
          var t2 = e2.meta.percent || 0, r2 = this.entriesCount, n2 = this._sources.length;
          this.accumulate ? this.contentBuffer.push(e2) : (this.bytesWritten += e2.data.length, i.prototype.push.call(this, { data: e2.data, meta: { currentFile: this.currentFile, percent: r2 ? (t2 + 100 * (r2 - n2 - 1)) / r2 : 100 } }));
        }, s.prototype.openedSource = function(e2) {
          this.currentSourceOffset = this.bytesWritten, this.currentFile = e2.file.name;
          var t2 = this.streamFiles && !e2.file.dir;
          if (t2) {
            var r2 = n(e2, t2, false, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
            this.push({ data: r2.fileRecord, meta: { percent: 0 } });
          } else this.accumulate = true;
        }, s.prototype.closedSource = function(e2) {
          this.accumulate = false;
          var t2 = this.streamFiles && !e2.file.dir, r2 = n(e2, t2, true, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
          if (this.dirRecords.push(r2.dirRecord), t2) this.push({ data: (function(e3) {
            return R.DATA_DESCRIPTOR + A(e3.crc32, 4) + A(e3.compressedSize, 4) + A(e3.uncompressedSize, 4);
          })(e2), meta: { percent: 100 } });
          else for (this.push({ data: r2.fileRecord, meta: { percent: 0 } }); this.contentBuffer.length; ) this.push(this.contentBuffer.shift());
          this.currentFile = null;
        }, s.prototype.flush = function() {
          for (var e2 = this.bytesWritten, t2 = 0; t2 < this.dirRecords.length; t2++) this.push({ data: this.dirRecords[t2], meta: { percent: 100 } });
          var r2 = this.bytesWritten - e2, n2 = (function(e3, t3, r3, n3, i2) {
            var s2 = I.transformTo("string", i2(n3));
            return R.CENTRAL_DIRECTORY_END + "\0\0\0\0" + A(e3, 2) + A(e3, 2) + A(t3, 4) + A(r3, 4) + A(s2.length, 2) + s2;
          })(this.dirRecords.length, r2, e2, this.zipComment, this.encodeFileName);
          this.push({ data: n2, meta: { percent: 100 } });
        }, s.prototype.prepareNextSource = function() {
          this.previous = this._sources.shift(), this.openedSource(this.previous.streamInfo), this.isPaused ? this.previous.pause() : this.previous.resume();
        }, s.prototype.registerPrevious = function(e2) {
          this._sources.push(e2);
          var t2 = this;
          return e2.on("data", function(e3) {
            t2.processChunk(e3);
          }), e2.on("end", function() {
            t2.closedSource(t2.previous.streamInfo), t2._sources.length ? t2.prepareNextSource() : t2.end();
          }), e2.on("error", function(e3) {
            t2.error(e3);
          }), this;
        }, s.prototype.resume = function() {
          return !!i.prototype.resume.call(this) && (!this.previous && this._sources.length ? (this.prepareNextSource(), true) : this.previous || this._sources.length || this.generatedError ? void 0 : (this.end(), true));
        }, s.prototype.error = function(e2) {
          var t2 = this._sources;
          if (!i.prototype.error.call(this, e2)) return false;
          for (var r2 = 0; r2 < t2.length; r2++) try {
            t2[r2].error(e2);
          } catch (e3) {
          }
          return true;
        }, s.prototype.lock = function() {
          i.prototype.lock.call(this);
          for (var e2 = this._sources, t2 = 0; t2 < e2.length; t2++) e2[t2].lock();
        }, t.exports = s;
      }, { "../crc32": 4, "../signature": 23, "../stream/GenericWorker": 28, "../utf8": 31, "../utils": 32 }], 9: [function(e, t, r) {
        "use strict";
        var u = e("../compressions"), n = e("./ZipFileWorker");
        r.generateWorker = function(e2, a, t2) {
          var o = new n(a.streamFiles, t2, a.platform, a.encodeFileName), h = 0;
          try {
            e2.forEach(function(e3, t3) {
              h++;
              var r2 = (function(e4, t4) {
                var r3 = e4 || t4, n3 = u[r3];
                if (!n3) throw new Error(r3 + " is not a valid compression method !");
                return n3;
              })(t3.options.compression, a.compression), n2 = t3.options.compressionOptions || a.compressionOptions || {}, i = t3.dir, s = t3.date;
              t3._compressWorker(r2, n2).withStreamInfo("file", { name: e3, dir: i, date: s, comment: t3.comment || "", unixPermissions: t3.unixPermissions, dosPermissions: t3.dosPermissions }).pipe(o);
            }), o.entriesCount = h;
          } catch (e3) {
            o.error(e3);
          }
          return o;
        };
      }, { "../compressions": 3, "./ZipFileWorker": 8 }], 10: [function(e, t, r) {
        "use strict";
        function n() {
          if (!(this instanceof n)) return new n();
          if (arguments.length) throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
          this.files = /* @__PURE__ */ Object.create(null), this.comment = null, this.root = "", this.clone = function() {
            var e2 = new n();
            for (var t2 in this) "function" != typeof this[t2] && (e2[t2] = this[t2]);
            return e2;
          };
        }
        (n.prototype = e("./object")).loadAsync = e("./load"), n.support = e("./support"), n.defaults = e("./defaults"), n.version = "3.10.2", n.loadAsync = function(e2, t2) {
          return new n().loadAsync(e2, t2);
        }, n.external = e("./external"), t.exports = n;
      }, { "./defaults": 5, "./external": 6, "./load": 11, "./object": 15, "./support": 30 }], 11: [function(e, t, r) {
        "use strict";
        var u = e("./utils"), i = e("./external"), n = e("./utf8"), s = e("./zipEntries"), a = e("./stream/Crc32Probe"), l = e("./nodejsUtils");
        function f(n2) {
          return new i.Promise(function(e2, t2) {
            var r2 = n2.decompressed.getContentWorker().pipe(new a());
            r2.on("error", function(e3) {
              t2(e3);
            }).on("end", function() {
              r2.streamInfo.crc32 !== n2.decompressed.crc32 ? t2(new Error("Corrupted zip : CRC32 mismatch")) : e2();
            }).resume();
          });
        }
        t.exports = function(e2, o) {
          var h = this;
          return o = u.extend(o || {}, { base64: false, checkCRC32: false, optimizedBinaryString: false, createFolders: false, decodeFileName: n.utf8decode }), l.isNode && l.isStream(e2) ? i.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")) : u.prepareContent("the loaded zip file", e2, true, o.optimizedBinaryString, o.base64).then(function(e3) {
            var t2 = new s(o);
            return t2.load(e3), t2;
          }).then(function(e3) {
            var t2 = [i.Promise.resolve(e3)], r2 = e3.files;
            if (o.checkCRC32) for (var n2 = 0; n2 < r2.length; n2++) t2.push(f(r2[n2]));
            return i.Promise.all(t2);
          }).then(function(e3) {
            for (var t2 = e3.shift(), r2 = t2.files, n2 = 0; n2 < r2.length; n2++) {
              var i2 = r2[n2], s2 = i2.fileNameStr, a2 = u.resolve(i2.fileNameStr);
              h.file(a2, i2.decompressed, { binary: true, optimizedBinaryString: true, date: i2.date, dir: i2.dir, comment: i2.fileCommentStr.length ? i2.fileCommentStr : null, unixPermissions: i2.unixPermissions, dosPermissions: i2.dosPermissions, createFolders: o.createFolders }), i2.dir || (h.file(a2).unsafeOriginalName = s2);
            }
            return t2.zipComment.length && (h.comment = t2.zipComment), h;
          });
        };
      }, { "./external": 6, "./nodejsUtils": 14, "./stream/Crc32Probe": 25, "./utf8": 31, "./utils": 32, "./zipEntries": 33 }], 12: [function(e, t, r) {
        "use strict";
        var n = e("../utils"), i = e("../stream/GenericWorker");
        function s(e2, t2) {
          i.call(this, "Nodejs stream input adapter for " + e2), this._upstreamEnded = false, this._bindStream(t2);
        }
        n.inherits(s, i), s.prototype._bindStream = function(e2) {
          var t2 = this;
          (this._stream = e2).pause(), e2.on("data", function(e3) {
            t2.push({ data: e3, meta: { percent: 0 } });
          }).on("error", function(e3) {
            t2.isPaused ? this.generatedError = e3 : t2.error(e3);
          }).on("end", function() {
            t2.isPaused ? t2._upstreamEnded = true : t2.end();
          });
        }, s.prototype.pause = function() {
          return !!i.prototype.pause.call(this) && (this._stream.pause(), true);
        }, s.prototype.resume = function() {
          return !!i.prototype.resume.call(this) && (this._upstreamEnded ? this.end() : this._stream.resume(), true);
        }, t.exports = s;
      }, { "../stream/GenericWorker": 28, "../utils": 32 }], 13: [function(e, t, r) {
        "use strict";
        var i = e("readable-stream").Readable;
        function n(e2, t2, r2) {
          i.call(this, t2), this._helper = e2;
          var n2 = this;
          e2.on("data", function(e3, t3) {
            n2.push(e3) || n2._helper.pause(), r2 && r2(t3);
          }).on("error", function(e3) {
            n2.emit("error", e3);
          }).on("end", function() {
            n2.push(null);
          });
        }
        e("../utils").inherits(n, i), n.prototype._read = function() {
          this._helper.resume();
        }, t.exports = n;
      }, { "../utils": 32, "readable-stream": 16 }], 14: [function(e, t, r) {
        "use strict";
        t.exports = { isNode: "undefined" != typeof Buffer, newBufferFrom: function(e2, t2) {
          if (Buffer.from && Buffer.from !== Uint8Array.from) return Buffer.from(e2, t2);
          if ("number" == typeof e2) throw new Error('The "data" argument must not be a number');
          return new Buffer(e2, t2);
        }, allocBuffer: function(e2) {
          if (Buffer.alloc) return Buffer.alloc(e2);
          var t2 = new Buffer(e2);
          return t2.fill(0), t2;
        }, isBuffer: function(e2) {
          return Buffer.isBuffer(e2);
        }, isStream: function(e2) {
          return e2 && "function" == typeof e2.on && "function" == typeof e2.pause && "function" == typeof e2.resume;
        } };
      }, {}], 15: [function(e, t, r) {
        "use strict";
        function s(e2, t2, r2) {
          var n2, i2 = u.getTypeOf(t2), s2 = u.extend(r2 || {}, f);
          s2.date = s2.date || /* @__PURE__ */ new Date(), null !== s2.compression && (s2.compression = s2.compression.toUpperCase()), "string" == typeof s2.unixPermissions && (s2.unixPermissions = parseInt(s2.unixPermissions, 8)), s2.unixPermissions && 16384 & s2.unixPermissions && (s2.dir = true), s2.dosPermissions && 16 & s2.dosPermissions && (s2.dir = true), s2.dir && (e2 = g(e2)), s2.createFolders && (n2 = _(e2)) && b.call(this, n2, true);
          var a2 = "string" === i2 && false === s2.binary && false === s2.base64;
          r2 && void 0 !== r2.binary || (s2.binary = !a2), (t2 instanceof c && 0 === t2.uncompressedSize || s2.dir || !t2 || 0 === t2.length) && (s2.base64 = false, s2.binary = true, t2 = "", s2.compression = "STORE", i2 = "string");
          var o2 = null;
          o2 = t2 instanceof c || t2 instanceof l ? t2 : p.isNode && p.isStream(t2) ? new m(e2, t2) : u.prepareContent(e2, t2, s2.binary, s2.optimizedBinaryString, s2.base64);
          var h2 = new d(e2, o2, s2);
          this.files[e2] = h2;
        }
        var i = e("./utf8"), u = e("./utils"), l = e("./stream/GenericWorker"), a = e("./stream/StreamHelper"), f = e("./defaults"), c = e("./compressedObject"), d = e("./zipObject"), o = e("./generate"), p = e("./nodejsUtils"), m = e("./nodejs/NodejsStreamInputAdapter"), _ = function(e2) {
          "/" === e2.slice(-1) && (e2 = e2.substring(0, e2.length - 1));
          var t2 = e2.lastIndexOf("/");
          return 0 < t2 ? e2.substring(0, t2) : "";
        }, g = function(e2) {
          return "/" !== e2.slice(-1) && (e2 += "/"), e2;
        }, b = function(e2, t2) {
          return t2 = void 0 !== t2 ? t2 : f.createFolders, e2 = g(e2), this.files[e2] || s.call(this, e2, null, { dir: true, createFolders: t2 }), this.files[e2];
        };
        function h(e2) {
          return "[object RegExp]" === Object.prototype.toString.call(e2);
        }
        var n = { load: function() {
          throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
        }, forEach: function(e2) {
          var t2, r2, n2;
          for (t2 in this.files) n2 = this.files[t2], (r2 = t2.slice(this.root.length, t2.length)) && t2.slice(0, this.root.length) === this.root && e2(r2, n2);
        }, filter: function(r2) {
          var n2 = [];
          return this.forEach(function(e2, t2) {
            r2(e2, t2) && n2.push(t2);
          }), n2;
        }, file: function(e2, t2, r2) {
          if (1 !== arguments.length) return e2 = this.root + e2, s.call(this, e2, t2, r2), this;
          if (h(e2)) {
            var n2 = e2;
            return this.filter(function(e3, t3) {
              return !t3.dir && n2.test(e3);
            });
          }
          var i2 = this.files[this.root + e2];
          return i2 && !i2.dir ? i2 : null;
        }, folder: function(r2) {
          if (!r2) return this;
          if (h(r2)) return this.filter(function(e3, t3) {
            return t3.dir && r2.test(e3);
          });
          var e2 = this.root + r2, t2 = b.call(this, e2), n2 = this.clone();
          return n2.root = t2.name, n2;
        }, remove: function(r2) {
          r2 = this.root + r2;
          var e2 = this.files[r2];
          if (e2 || ("/" !== r2.slice(-1) && (r2 += "/"), e2 = this.files[r2]), e2 && !e2.dir) delete this.files[r2];
          else for (var t2 = this.filter(function(e3, t3) {
            return t3.name.slice(0, r2.length) === r2;
          }), n2 = 0; n2 < t2.length; n2++) delete this.files[t2[n2].name];
          return this;
        }, generate: function() {
          throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
        }, generateInternalStream: function(e2) {
          var t2, r2 = {};
          try {
            if ((r2 = u.extend(e2 || {}, { streamFiles: false, compression: "STORE", compressionOptions: null, type: "", platform: "DOS", comment: null, mimeType: "application/zip", encodeFileName: i.utf8encode })).type = r2.type.toLowerCase(), r2.compression = r2.compression.toUpperCase(), "binarystring" === r2.type && (r2.type = "string"), !r2.type) throw new Error("No output type specified.");
            u.checkSupport(r2.type), "darwin" !== r2.platform && "freebsd" !== r2.platform && "linux" !== r2.platform && "sunos" !== r2.platform || (r2.platform = "UNIX"), "win32" === r2.platform && (r2.platform = "DOS");
            var n2 = r2.comment || this.comment || "";
            t2 = o.generateWorker(this, r2, n2);
          } catch (e3) {
            (t2 = new l("error")).error(e3);
          }
          return new a(t2, r2.type || "string", r2.mimeType);
        }, generateAsync: function(e2, t2) {
          return this.generateInternalStream(e2).accumulate(t2);
        }, generateNodeStream: function(e2, t2) {
          return (e2 = e2 || {}).type || (e2.type = "nodebuffer"), this.generateInternalStream(e2).toNodejsStream(t2);
        } };
        t.exports = n;
      }, { "./compressedObject": 2, "./defaults": 5, "./generate": 9, "./nodejs/NodejsStreamInputAdapter": 12, "./nodejsUtils": 14, "./stream/GenericWorker": 28, "./stream/StreamHelper": 29, "./utf8": 31, "./utils": 32, "./zipObject": 35 }], 16: [function(e, t, r) {
        "use strict";
        t.exports = e("stream");
      }, { stream: void 0 }], 17: [function(e, t, r) {
        "use strict";
        var n = e("./DataReader");
        function i(e2) {
          n.call(this, e2);
          for (var t2 = 0; t2 < this.data.length; t2++) e2[t2] = 255 & e2[t2];
        }
        e("../utils").inherits(i, n), i.prototype.byteAt = function(e2) {
          return this.data[this.zero + e2];
        }, i.prototype.lastIndexOfSignature = function(e2) {
          for (var t2 = e2.charCodeAt(0), r2 = e2.charCodeAt(1), n2 = e2.charCodeAt(2), i2 = e2.charCodeAt(3), s = this.length - 4; 0 <= s; --s) if (this.data[s] === t2 && this.data[s + 1] === r2 && this.data[s + 2] === n2 && this.data[s + 3] === i2) return s - this.zero;
          return -1;
        }, i.prototype.readAndCheckSignature = function(e2) {
          var t2 = e2.charCodeAt(0), r2 = e2.charCodeAt(1), n2 = e2.charCodeAt(2), i2 = e2.charCodeAt(3), s = this.readData(4);
          return t2 === s[0] && r2 === s[1] && n2 === s[2] && i2 === s[3];
        }, i.prototype.readData = function(e2) {
          if (this.checkOffset(e2), 0 === e2) return [];
          var t2 = this.data.slice(this.zero + this.index, this.zero + this.index + e2);
          return this.index += e2, t2;
        }, t.exports = i;
      }, { "../utils": 32, "./DataReader": 18 }], 18: [function(e, t, r) {
        "use strict";
        var n = e("../utils");
        function i(e2) {
          this.data = e2, this.length = e2.length, this.index = 0, this.zero = 0;
        }
        i.prototype = { checkOffset: function(e2) {
          this.checkIndex(this.index + e2);
        }, checkIndex: function(e2) {
          if (this.length < this.zero + e2 || e2 < 0) throw new Error("End of data reached (data length = " + this.length + ", asked index = " + e2 + "). Corrupted zip ?");
        }, setIndex: function(e2) {
          this.checkIndex(e2), this.index = e2;
        }, skip: function(e2) {
          this.setIndex(this.index + e2);
        }, byteAt: function() {
        }, readInt: function(e2) {
          var t2, r2 = 0;
          for (this.checkOffset(e2), t2 = this.index + e2 - 1; t2 >= this.index; t2--) r2 = (r2 << 8) + this.byteAt(t2);
          return this.index += e2, r2;
        }, readString: function(e2) {
          return n.transformTo("string", this.readData(e2));
        }, readData: function() {
        }, lastIndexOfSignature: function() {
        }, readAndCheckSignature: function() {
        }, readDate: function() {
          var e2 = this.readInt(4);
          return new Date(Date.UTC(1980 + (e2 >> 25 & 127), (e2 >> 21 & 15) - 1, e2 >> 16 & 31, e2 >> 11 & 31, e2 >> 5 & 63, (31 & e2) << 1));
        } }, t.exports = i;
      }, { "../utils": 32 }], 19: [function(e, t, r) {
        "use strict";
        var n = e("./Uint8ArrayReader");
        function i(e2) {
          n.call(this, e2);
        }
        e("../utils").inherits(i, n), i.prototype.readData = function(e2) {
          this.checkOffset(e2);
          var t2 = this.data.slice(this.zero + this.index, this.zero + this.index + e2);
          return this.index += e2, t2;
        }, t.exports = i;
      }, { "../utils": 32, "./Uint8ArrayReader": 21 }], 20: [function(e, t, r) {
        "use strict";
        var n = e("./DataReader");
        function i(e2) {
          n.call(this, e2);
        }
        e("../utils").inherits(i, n), i.prototype.byteAt = function(e2) {
          return this.data.charCodeAt(this.zero + e2);
        }, i.prototype.lastIndexOfSignature = function(e2) {
          return this.data.lastIndexOf(e2) - this.zero;
        }, i.prototype.readAndCheckSignature = function(e2) {
          return e2 === this.readData(4);
        }, i.prototype.readData = function(e2) {
          this.checkOffset(e2);
          var t2 = this.data.slice(this.zero + this.index, this.zero + this.index + e2);
          return this.index += e2, t2;
        }, t.exports = i;
      }, { "../utils": 32, "./DataReader": 18 }], 21: [function(e, t, r) {
        "use strict";
        var n = e("./ArrayReader");
        function i(e2) {
          n.call(this, e2);
        }
        e("../utils").inherits(i, n), i.prototype.readData = function(e2) {
          if (this.checkOffset(e2), 0 === e2) return new Uint8Array(0);
          var t2 = this.data.subarray(this.zero + this.index, this.zero + this.index + e2);
          return this.index += e2, t2;
        }, t.exports = i;
      }, { "../utils": 32, "./ArrayReader": 17 }], 22: [function(e, t, r) {
        "use strict";
        var n = e("../utils"), i = e("../support"), s = e("./ArrayReader"), a = e("./StringReader"), o = e("./NodeBufferReader"), h = e("./Uint8ArrayReader");
        t.exports = function(e2) {
          var t2 = n.getTypeOf(e2);
          return n.checkSupport(t2), "string" !== t2 || i.uint8array ? "nodebuffer" === t2 ? new o(e2) : i.uint8array ? new h(n.transformTo("uint8array", e2)) : new s(n.transformTo("array", e2)) : new a(e2);
        };
      }, { "../support": 30, "../utils": 32, "./ArrayReader": 17, "./NodeBufferReader": 19, "./StringReader": 20, "./Uint8ArrayReader": 21 }], 23: [function(e, t, r) {
        "use strict";
        r.LOCAL_FILE_HEADER = "PK", r.CENTRAL_FILE_HEADER = "PK", r.CENTRAL_DIRECTORY_END = "PK", r.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x07", r.ZIP64_CENTRAL_DIRECTORY_END = "PK", r.DATA_DESCRIPTOR = "PK\x07\b";
      }, {}], 24: [function(e, t, r) {
        "use strict";
        var n = e("./GenericWorker"), i = e("../utils");
        function s(e2) {
          n.call(this, "ConvertWorker to " + e2), this.destType = e2;
        }
        i.inherits(s, n), s.prototype.processChunk = function(e2) {
          this.push({ data: i.transformTo(this.destType, e2.data), meta: e2.meta });
        }, t.exports = s;
      }, { "../utils": 32, "./GenericWorker": 28 }], 25: [function(e, t, r) {
        "use strict";
        var n = e("./GenericWorker"), i = e("../crc32");
        function s() {
          n.call(this, "Crc32Probe"), this.withStreamInfo("crc32", 0);
        }
        e("../utils").inherits(s, n), s.prototype.processChunk = function(e2) {
          this.streamInfo.crc32 = i(e2.data, this.streamInfo.crc32 || 0), this.push(e2);
        }, t.exports = s;
      }, { "../crc32": 4, "../utils": 32, "./GenericWorker": 28 }], 26: [function(e, t, r) {
        "use strict";
        var n = e("../utils"), i = e("./GenericWorker");
        function s(e2) {
          i.call(this, "DataLengthProbe for " + e2), this.propName = e2, this.withStreamInfo(e2, 0);
        }
        n.inherits(s, i), s.prototype.processChunk = function(e2) {
          if (e2) {
            var t2 = this.streamInfo[this.propName] || 0;
            this.streamInfo[this.propName] = t2 + e2.data.length;
          }
          i.prototype.processChunk.call(this, e2);
        }, t.exports = s;
      }, { "../utils": 32, "./GenericWorker": 28 }], 27: [function(e, t, r) {
        "use strict";
        var n = e("../utils"), i = e("./GenericWorker");
        function s(e2) {
          i.call(this, "DataWorker");
          var t2 = this;
          this.dataIsReady = false, this.index = 0, this.max = 0, this.data = null, this.type = "", this._tickScheduled = false, e2.then(function(e3) {
            t2.dataIsReady = true, t2.data = e3, t2.max = e3 && e3.length || 0, t2.type = n.getTypeOf(e3), t2.isPaused || t2._tickAndRepeat();
          }, function(e3) {
            t2.error(e3);
          });
        }
        n.inherits(s, i), s.prototype.cleanUp = function() {
          i.prototype.cleanUp.call(this), this.data = null;
        }, s.prototype.resume = function() {
          return !!i.prototype.resume.call(this) && (!this._tickScheduled && this.dataIsReady && (this._tickScheduled = true, n.delay(this._tickAndRepeat, [], this)), true);
        }, s.prototype._tickAndRepeat = function() {
          this._tickScheduled = false, this.isPaused || this.isFinished || (this._tick(), this.isFinished || (n.delay(this._tickAndRepeat, [], this), this._tickScheduled = true));
        }, s.prototype._tick = function() {
          if (this.isPaused || this.isFinished) return false;
          var e2 = null, t2 = Math.min(this.max, this.index + 16384);
          if (this.index >= this.max) return this.end();
          switch (this.type) {
            case "string":
              e2 = this.data.substring(this.index, t2);
              break;
            case "uint8array":
              e2 = this.data.subarray(this.index, t2);
              break;
            case "array":
            case "nodebuffer":
              e2 = this.data.slice(this.index, t2);
          }
          return this.index = t2, this.push({ data: e2, meta: { percent: this.max ? this.index / this.max * 100 : 0 } });
        }, t.exports = s;
      }, { "../utils": 32, "./GenericWorker": 28 }], 28: [function(e, t, r) {
        "use strict";
        function n(e2) {
          this.name = e2 || "default", this.streamInfo = {}, this.generatedError = null, this.extraStreamInfo = {}, this.isPaused = true, this.isFinished = false, this.isLocked = false, this._listeners = { data: [], end: [], error: [] }, this.previous = null;
        }
        n.prototype = { push: function(e2) {
          this.emit("data", e2);
        }, end: function() {
          if (this.isFinished) return false;
          this.flush();
          try {
            this.emit("end"), this.cleanUp(), this.isFinished = true;
          } catch (e2) {
            this.emit("error", e2);
          }
          return true;
        }, error: function(e2) {
          return !this.isFinished && (this.isPaused ? this.generatedError = e2 : (this.isFinished = true, this.emit("error", e2), this.previous && this.previous.error(e2), this.cleanUp()), true);
        }, on: function(e2, t2) {
          return this._listeners[e2].push(t2), this;
        }, cleanUp: function() {
          this.streamInfo = this.generatedError = this.extraStreamInfo = null, this._listeners = [];
        }, emit: function(e2, t2) {
          if (this._listeners[e2]) for (var r2 = 0; r2 < this._listeners[e2].length; r2++) this._listeners[e2][r2].call(this, t2);
        }, pipe: function(e2) {
          return e2.registerPrevious(this);
        }, registerPrevious: function(e2) {
          if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
          this.streamInfo = e2.streamInfo, this.mergeStreamInfo(), this.previous = e2;
          var t2 = this;
          return e2.on("data", function(e3) {
            t2.processChunk(e3);
          }), e2.on("end", function() {
            t2.end();
          }), e2.on("error", function(e3) {
            t2.error(e3);
          }), this;
        }, pause: function() {
          return !this.isPaused && !this.isFinished && (this.isPaused = true, this.previous && this.previous.pause(), true);
        }, resume: function() {
          if (!this.isPaused || this.isFinished) return false;
          var e2 = this.isPaused = false;
          return this.generatedError && (this.error(this.generatedError), e2 = true), this.previous && this.previous.resume(), !e2;
        }, flush: function() {
        }, processChunk: function(e2) {
          this.push(e2);
        }, withStreamInfo: function(e2, t2) {
          return this.extraStreamInfo[e2] = t2, this.mergeStreamInfo(), this;
        }, mergeStreamInfo: function() {
          for (var e2 in this.extraStreamInfo) Object.prototype.hasOwnProperty.call(this.extraStreamInfo, e2) && (this.streamInfo[e2] = this.extraStreamInfo[e2]);
        }, lock: function() {
          if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
          this.isLocked = true, this.previous && this.previous.lock();
        }, toString: function() {
          var e2 = "Worker " + this.name;
          return this.previous ? this.previous + " -> " + e2 : e2;
        } }, t.exports = n;
      }, {}], 29: [function(e, t, r) {
        "use strict";
        var h = e("../utils"), i = e("./ConvertWorker"), s = e("./GenericWorker"), u = e("../base64"), n = e("../support"), a = e("../external"), o = null;
        if (n.nodestream) try {
          o = e("../nodejs/NodejsStreamOutputAdapter");
        } catch (e2) {
        }
        function l(e2, o2) {
          return new a.Promise(function(t2, r2) {
            var n2 = [], i2 = e2._internalType, s2 = e2._outputType, a2 = e2._mimeType;
            e2.on("data", function(e3, t3) {
              n2.push(e3), o2 && o2(t3);
            }).on("error", function(e3) {
              n2 = [], r2(e3);
            }).on("end", function() {
              try {
                var e3 = (function(e4, t3, r3) {
                  switch (e4) {
                    case "blob":
                      return h.newBlob(h.transformTo("arraybuffer", t3), r3);
                    case "base64":
                      return u.encode(t3);
                    default:
                      return h.transformTo(e4, t3);
                  }
                })(s2, (function(e4, t3) {
                  var r3, n3 = 0, i3 = null, s3 = 0;
                  for (r3 = 0; r3 < t3.length; r3++) s3 += t3[r3].length;
                  switch (e4) {
                    case "string":
                      return t3.join("");
                    case "array":
                      return Array.prototype.concat.apply([], t3);
                    case "uint8array":
                      for (i3 = new Uint8Array(s3), r3 = 0; r3 < t3.length; r3++) i3.set(t3[r3], n3), n3 += t3[r3].length;
                      return i3;
                    case "nodebuffer":
                      return Buffer.concat(t3);
                    default:
                      throw new Error("concat : unsupported type '" + e4 + "'");
                  }
                })(i2, n2), a2);
                t2(e3);
              } catch (e4) {
                r2(e4);
              }
              n2 = [];
            }).resume();
          });
        }
        function f(e2, t2, r2) {
          var n2 = t2;
          switch (t2) {
            case "blob":
            case "arraybuffer":
              n2 = "uint8array";
              break;
            case "base64":
              n2 = "string";
          }
          try {
            this._internalType = n2, this._outputType = t2, this._mimeType = r2, h.checkSupport(n2), this._worker = e2.pipe(new i(n2)), e2.lock();
          } catch (e3) {
            this._worker = new s("error"), this._worker.error(e3);
          }
        }
        f.prototype = { accumulate: function(e2) {
          return l(this, e2);
        }, on: function(e2, t2) {
          var r2 = this;
          return "data" === e2 ? this._worker.on(e2, function(e3) {
            t2.call(r2, e3.data, e3.meta);
          }) : this._worker.on(e2, function() {
            h.delay(t2, arguments, r2);
          }), this;
        }, resume: function() {
          return h.delay(this._worker.resume, [], this._worker), this;
        }, pause: function() {
          return this._worker.pause(), this;
        }, toNodejsStream: function(e2) {
          if (h.checkSupport("nodestream"), "nodebuffer" !== this._outputType) throw new Error(this._outputType + " is not supported by this method");
          return new o(this, { objectMode: "nodebuffer" !== this._outputType }, e2);
        } }, t.exports = f;
      }, { "../base64": 1, "../external": 6, "../nodejs/NodejsStreamOutputAdapter": 13, "../support": 30, "../utils": 32, "./ConvertWorker": 24, "./GenericWorker": 28 }], 30: [function(e, t, r) {
        "use strict";
        if (r.base64 = true, r.array = true, r.string = true, r.arraybuffer = "undefined" != typeof ArrayBuffer && "undefined" != typeof Uint8Array, r.nodebuffer = "undefined" != typeof Buffer, r.uint8array = "undefined" != typeof Uint8Array, "undefined" == typeof ArrayBuffer) r.blob = false;
        else {
          var n = new ArrayBuffer(0);
          try {
            r.blob = 0 === new Blob([n], { type: "application/zip" }).size;
          } catch (e2) {
            try {
              var i = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
              i.append(n), r.blob = 0 === i.getBlob("application/zip").size;
            } catch (e3) {
              r.blob = false;
            }
          }
        }
        try {
          r.nodestream = !!e("readable-stream").Readable;
        } catch (e2) {
          r.nodestream = false;
        }
      }, { "readable-stream": 16 }], 31: [function(e, t, s) {
        "use strict";
        for (var o = e("./utils"), h = e("./support"), r = e("./nodejsUtils"), n = e("./stream/GenericWorker"), u = new Array(256), i = 0; i < 256; i++) u[i] = 252 <= i ? 6 : 248 <= i ? 5 : 240 <= i ? 4 : 224 <= i ? 3 : 192 <= i ? 2 : 1;
        u[254] = u[254] = 1;
        function a() {
          n.call(this, "utf-8 decode"), this.leftOver = null;
        }
        function l() {
          n.call(this, "utf-8 encode");
        }
        s.utf8encode = function(e2) {
          return h.nodebuffer ? r.newBufferFrom(e2, "utf-8") : (function(e3) {
            var t2, r2, n2, i2, s2, a2 = e3.length, o2 = 0;
            for (i2 = 0; i2 < a2; i2++) 55296 == (64512 & (r2 = e3.charCodeAt(i2))) && i2 + 1 < a2 && 56320 == (64512 & (n2 = e3.charCodeAt(i2 + 1))) && (r2 = 65536 + (r2 - 55296 << 10) + (n2 - 56320), i2++), o2 += r2 < 128 ? 1 : r2 < 2048 ? 2 : r2 < 65536 ? 3 : 4;
            for (t2 = h.uint8array ? new Uint8Array(o2) : new Array(o2), i2 = s2 = 0; s2 < o2; i2++) 55296 == (64512 & (r2 = e3.charCodeAt(i2))) && i2 + 1 < a2 && 56320 == (64512 & (n2 = e3.charCodeAt(i2 + 1))) && (r2 = 65536 + (r2 - 55296 << 10) + (n2 - 56320), i2++), r2 < 128 ? t2[s2++] = r2 : (r2 < 2048 ? t2[s2++] = 192 | r2 >>> 6 : (r2 < 65536 ? t2[s2++] = 224 | r2 >>> 12 : (t2[s2++] = 240 | r2 >>> 18, t2[s2++] = 128 | r2 >>> 12 & 63), t2[s2++] = 128 | r2 >>> 6 & 63), t2[s2++] = 128 | 63 & r2);
            return t2;
          })(e2);
        }, s.utf8decode = function(e2) {
          return h.nodebuffer ? o.transformTo("nodebuffer", e2).toString("utf-8") : (function(e3) {
            var t2, r2, n2, i2, s2 = e3.length, a2 = new Array(2 * s2);
            for (t2 = r2 = 0; t2 < s2; ) if ((n2 = e3[t2++]) < 128) a2[r2++] = n2;
            else if (4 < (i2 = u[n2])) a2[r2++] = 65533, t2 += i2 - 1;
            else {
              for (n2 &= 2 === i2 ? 31 : 3 === i2 ? 15 : 7; 1 < i2 && t2 < s2; ) n2 = n2 << 6 | 63 & e3[t2++], i2--;
              1 < i2 ? a2[r2++] = 65533 : n2 < 65536 ? a2[r2++] = n2 : (n2 -= 65536, a2[r2++] = 55296 | n2 >> 10 & 1023, a2[r2++] = 56320 | 1023 & n2);
            }
            return a2.length !== r2 && (a2.subarray ? a2 = a2.subarray(0, r2) : a2.length = r2), o.applyFromCharCode(a2);
          })(e2 = o.transformTo(h.uint8array ? "uint8array" : "array", e2));
        }, o.inherits(a, n), a.prototype.processChunk = function(e2) {
          var t2 = o.transformTo(h.uint8array ? "uint8array" : "array", e2.data);
          if (this.leftOver && this.leftOver.length) {
            if (h.uint8array) {
              var r2 = t2;
              (t2 = new Uint8Array(r2.length + this.leftOver.length)).set(this.leftOver, 0), t2.set(r2, this.leftOver.length);
            } else t2 = this.leftOver.concat(t2);
            this.leftOver = null;
          }
          var n2 = (function(e3, t3) {
            var r3;
            for ((t3 = t3 || e3.length) > e3.length && (t3 = e3.length), r3 = t3 - 1; 0 <= r3 && 128 == (192 & e3[r3]); ) r3--;
            return r3 < 0 ? t3 : 0 === r3 ? t3 : r3 + u[e3[r3]] > t3 ? r3 : t3;
          })(t2), i2 = t2;
          n2 !== t2.length && (h.uint8array ? (i2 = t2.subarray(0, n2), this.leftOver = t2.subarray(n2, t2.length)) : (i2 = t2.slice(0, n2), this.leftOver = t2.slice(n2, t2.length))), this.push({ data: s.utf8decode(i2), meta: e2.meta });
        }, a.prototype.flush = function() {
          this.leftOver && this.leftOver.length && (this.push({ data: s.utf8decode(this.leftOver), meta: {} }), this.leftOver = null);
        }, s.Utf8DecodeWorker = a, o.inherits(l, n), l.prototype.processChunk = function(e2) {
          this.push({ data: s.utf8encode(e2.data), meta: e2.meta });
        }, s.Utf8EncodeWorker = l;
      }, { "./nodejsUtils": 14, "./stream/GenericWorker": 28, "./support": 30, "./utils": 32 }], 32: [function(e, t, a) {
        "use strict";
        var o = e("./support"), h = e("./base64"), r = e("./nodejsUtils"), u = e("./external");
        function n(e2) {
          return e2;
        }
        function l(e2, t2) {
          for (var r2 = 0; r2 < e2.length; ++r2) t2[r2] = 255 & e2.charCodeAt(r2);
          return t2;
        }
        e("setimmediate"), a.newBlob = function(t2, r2) {
          a.checkSupport("blob");
          try {
            return new Blob([t2], { type: r2 });
          } catch (e2) {
            try {
              var n2 = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
              return n2.append(t2), n2.getBlob(r2);
            } catch (e3) {
              throw new Error("Bug : can't construct the Blob.");
            }
          }
        };
        var i = { stringifyByChunk: function(e2, t2, r2) {
          var n2 = [], i2 = 0, s2 = e2.length;
          if (s2 <= r2) return String.fromCharCode.apply(null, e2);
          for (; i2 < s2; ) "array" === t2 || "nodebuffer" === t2 ? n2.push(String.fromCharCode.apply(null, e2.slice(i2, Math.min(i2 + r2, s2)))) : n2.push(String.fromCharCode.apply(null, e2.subarray(i2, Math.min(i2 + r2, s2)))), i2 += r2;
          return n2.join("");
        }, stringifyByChar: function(e2) {
          for (var t2 = "", r2 = 0; r2 < e2.length; r2++) t2 += String.fromCharCode(e2[r2]);
          return t2;
        }, applyCanBeUsed: { uint8array: (function() {
          try {
            return o.uint8array && 1 === String.fromCharCode.apply(null, new Uint8Array(1)).length;
          } catch (e2) {
            return false;
          }
        })(), nodebuffer: (function() {
          try {
            return o.nodebuffer && 1 === String.fromCharCode.apply(null, r.allocBuffer(1)).length;
          } catch (e2) {
            return false;
          }
        })() } };
        function s(e2) {
          var t2 = 65536, r2 = a.getTypeOf(e2), n2 = true;
          if ("uint8array" === r2 ? n2 = i.applyCanBeUsed.uint8array : "nodebuffer" === r2 && (n2 = i.applyCanBeUsed.nodebuffer), n2) for (; 1 < t2; ) try {
            return i.stringifyByChunk(e2, r2, t2);
          } catch (e3) {
            t2 = Math.floor(t2 / 2);
          }
          return i.stringifyByChar(e2);
        }
        function f(e2, t2) {
          for (var r2 = 0; r2 < e2.length; r2++) t2[r2] = e2[r2];
          return t2;
        }
        a.applyFromCharCode = s;
        var c = {};
        c.string = { string: n, array: function(e2) {
          return l(e2, new Array(e2.length));
        }, arraybuffer: function(e2) {
          return c.string.uint8array(e2).buffer;
        }, uint8array: function(e2) {
          return l(e2, new Uint8Array(e2.length));
        }, nodebuffer: function(e2) {
          return l(e2, r.allocBuffer(e2.length));
        } }, c.array = { string: s, array: n, arraybuffer: function(e2) {
          return new Uint8Array(e2).buffer;
        }, uint8array: function(e2) {
          return new Uint8Array(e2);
        }, nodebuffer: function(e2) {
          return r.newBufferFrom(e2);
        } }, c.arraybuffer = { string: function(e2) {
          return s(new Uint8Array(e2));
        }, array: function(e2) {
          return f(new Uint8Array(e2), new Array(e2.byteLength));
        }, arraybuffer: n, uint8array: function(e2) {
          return new Uint8Array(e2);
        }, nodebuffer: function(e2) {
          return r.newBufferFrom(new Uint8Array(e2));
        } }, c.uint8array = { string: s, array: function(e2) {
          return f(e2, new Array(e2.length));
        }, arraybuffer: function(e2) {
          return e2.buffer;
        }, uint8array: n, nodebuffer: function(e2) {
          return r.newBufferFrom(e2);
        } }, c.nodebuffer = { string: s, array: function(e2) {
          return f(e2, new Array(e2.length));
        }, arraybuffer: function(e2) {
          return c.nodebuffer.uint8array(e2).buffer;
        }, uint8array: function(e2) {
          return f(e2, new Uint8Array(e2.length));
        }, nodebuffer: n }, a.transformTo = function(e2, t2) {
          if (t2 = t2 || "", !e2) return t2;
          a.checkSupport(e2);
          var r2 = a.getTypeOf(t2);
          return c[r2][e2](t2);
        }, a.resolve = function(e2) {
          for (var t2 = e2.split("/"), r2 = [], n2 = 0; n2 < t2.length; n2++) {
            var i2 = t2[n2];
            "." === i2 || "" === i2 && 0 !== n2 && n2 !== t2.length - 1 || (".." === i2 ? r2.pop() : r2.push(i2));
          }
          return r2.join("/");
        }, a.getTypeOf = function(e2) {
          if ("string" == typeof e2) return "string";
          var t2 = Object.prototype.toString.call(e2);
          return "[object Array]" === t2 ? "array" : o.nodebuffer && r.isBuffer(e2) ? "nodebuffer" : o.uint8array && "[object Uint8Array]" === t2 ? "uint8array" : o.arraybuffer && "[object ArrayBuffer]" === t2 ? "arraybuffer" : void 0;
        }, a.checkSupport = function(e2) {
          if (!o[e2.toLowerCase()]) throw new Error(e2 + " is not supported by this platform");
        }, a.MAX_VALUE_16BITS = 65535, a.MAX_VALUE_32BITS = -1, a.pretty = function(e2) {
          var t2, r2, n2 = "";
          for (r2 = 0; r2 < (e2 || "").length; r2++) n2 += "\\x" + ((t2 = e2.charCodeAt(r2)) < 16 ? "0" : "") + t2.toString(16).toUpperCase();
          return n2;
        }, a.delay = function(e2, t2, r2) {
          setImmediate(function() {
            e2.apply(r2 || null, t2 || []);
          });
        }, a.inherits = function(e2, t2) {
          function r2() {
          }
          r2.prototype = t2.prototype, e2.prototype = new r2();
        }, a.extend = function() {
          var e2, t2, r2 = {};
          for (e2 = 0; e2 < arguments.length; e2++) for (t2 in arguments[e2]) Object.prototype.hasOwnProperty.call(arguments[e2], t2) && void 0 === r2[t2] && (r2[t2] = arguments[e2][t2]);
          return r2;
        }, a.prepareContent = function(r2, e2, n2, i2, s2) {
          return u.Promise.resolve(e2).then(function(n3) {
            return o.blob && (n3 instanceof Blob || -1 !== ["[object File]", "[object Blob]"].indexOf(Object.prototype.toString.call(n3))) ? void 0 !== Blob.prototype.arrayBuffer ? n3.arrayBuffer() : "undefined" != typeof FileReader ? new u.Promise(function(t2, r3) {
              var e3 = new FileReader();
              e3.onload = function(e4) {
                t2(e4.target.result);
              }, e3.onerror = function(e4) {
                r3(e4.target.error);
              }, e3.readAsArrayBuffer(n3);
            }) : u.Promise.reject(new Error(r2 + " is a Blob, but we have no way of reading it.")) : n3;
          }).then(function(e3) {
            var t2 = a.getTypeOf(e3);
            return t2 ? ("arraybuffer" === t2 ? e3 = a.transformTo("uint8array", e3) : "string" === t2 && (s2 ? e3 = h.decode(e3) : n2 && true !== i2 && (e3 = (function(e4) {
              return l(e4, o.uint8array ? new Uint8Array(e4.length) : new Array(e4.length));
            })(e3))), e3) : u.Promise.reject(new Error("Can't read the data of '" + r2 + "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"));
          });
        };
      }, { "./base64": 1, "./external": 6, "./nodejsUtils": 14, "./support": 30, setimmediate: 54 }], 33: [function(e, t, r) {
        "use strict";
        var n = e("./reader/readerFor"), i = e("./utils"), s = e("./signature"), a = e("./zipEntry"), o = e("./support");
        function h(e2) {
          this.files = [], this.loadOptions = e2;
        }
        h.prototype = { checkSignature: function(e2) {
          if (!this.reader.readAndCheckSignature(e2)) {
            this.reader.index -= 4;
            var t2 = this.reader.readString(4);
            throw new Error("Corrupted zip or bug: unexpected signature (" + i.pretty(t2) + ", expected " + i.pretty(e2) + ")");
          }
        }, isSignature: function(e2, t2) {
          var r2 = this.reader.index;
          this.reader.setIndex(e2);
          var n2 = this.reader.readString(4) === t2;
          return this.reader.setIndex(r2), n2;
        }, readBlockEndOfCentral: function() {
          this.diskNumber = this.reader.readInt(2), this.diskWithCentralDirStart = this.reader.readInt(2), this.centralDirRecordsOnThisDisk = this.reader.readInt(2), this.centralDirRecords = this.reader.readInt(2), this.centralDirSize = this.reader.readInt(4), this.centralDirOffset = this.reader.readInt(4), this.zipCommentLength = this.reader.readInt(2);
          var e2 = this.reader.readData(this.zipCommentLength), t2 = o.uint8array ? "uint8array" : "array", r2 = i.transformTo(t2, e2);
          this.zipComment = this.loadOptions.decodeFileName(r2);
        }, readBlockZip64EndOfCentral: function() {
          this.zip64EndOfCentralSize = this.reader.readInt(8), this.reader.skip(4), this.diskNumber = this.reader.readInt(4), this.diskWithCentralDirStart = this.reader.readInt(4), this.centralDirRecordsOnThisDisk = this.reader.readInt(8), this.centralDirRecords = this.reader.readInt(8), this.centralDirSize = this.reader.readInt(8), this.centralDirOffset = this.reader.readInt(8), this.zip64ExtensibleData = {};
          for (var e2, t2, r2, n2 = this.zip64EndOfCentralSize - 44; 0 < n2; ) e2 = this.reader.readInt(2), t2 = this.reader.readInt(4), r2 = this.reader.readData(t2), this.zip64ExtensibleData[e2] = { id: e2, length: t2, value: r2 };
        }, readBlockZip64EndOfCentralLocator: function() {
          if (this.diskWithZip64CentralDirStart = this.reader.readInt(4), this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8), this.disksCount = this.reader.readInt(4), 1 < this.disksCount) throw new Error("Multi-volumes zip are not supported");
        }, readLocalFiles: function() {
          var e2, t2;
          for (e2 = 0; e2 < this.files.length; e2++) t2 = this.files[e2], this.reader.setIndex(t2.localHeaderOffset), this.checkSignature(s.LOCAL_FILE_HEADER), t2.readLocalPart(this.reader), t2.handleUTF8(), t2.processAttributes();
        }, readCentralDir: function() {
          var e2;
          for (this.reader.setIndex(this.centralDirOffset); this.reader.readAndCheckSignature(s.CENTRAL_FILE_HEADER); ) (e2 = new a({ zip64: this.zip64 }, this.loadOptions)).readCentralPart(this.reader), this.files.push(e2);
          if (this.centralDirRecords !== this.files.length && 0 !== this.centralDirRecords && 0 === this.files.length) throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
        }, readEndOfCentral: function() {
          var e2 = this.reader.lastIndexOfSignature(s.CENTRAL_DIRECTORY_END);
          if (e2 < 0) throw !this.isSignature(0, s.LOCAL_FILE_HEADER) ? new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html") : new Error("Corrupted zip: can't find end of central directory");
          this.reader.setIndex(e2);
          var t2 = e2;
          if (this.checkSignature(s.CENTRAL_DIRECTORY_END), this.readBlockEndOfCentral(), this.diskNumber === i.MAX_VALUE_16BITS || this.diskWithCentralDirStart === i.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === i.MAX_VALUE_16BITS || this.centralDirRecords === i.MAX_VALUE_16BITS || this.centralDirSize === i.MAX_VALUE_32BITS || this.centralDirOffset === i.MAX_VALUE_32BITS) {
            if (this.zip64 = true, (e2 = this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR)) < 0) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
            if (this.reader.setIndex(e2), this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR), this.readBlockZip64EndOfCentralLocator(), !this.isSignature(this.relativeOffsetEndOfZip64CentralDir, s.ZIP64_CENTRAL_DIRECTORY_END) && (this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_END), this.relativeOffsetEndOfZip64CentralDir < 0)) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
            this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir), this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_END), this.readBlockZip64EndOfCentral();
          }
          var r2 = this.centralDirOffset + this.centralDirSize;
          this.zip64 && (r2 += 20, r2 += 12 + this.zip64EndOfCentralSize);
          var n2 = t2 - r2;
          if (0 < n2) this.isSignature(t2, s.CENTRAL_FILE_HEADER) || (this.reader.zero = n2);
          else if (n2 < 0) throw new Error("Corrupted zip: missing " + Math.abs(n2) + " bytes.");
        }, prepareReader: function(e2) {
          this.reader = n(e2);
        }, load: function(e2) {
          this.prepareReader(e2), this.readEndOfCentral(), this.readCentralDir(), this.readLocalFiles();
        } }, t.exports = h;
      }, { "./reader/readerFor": 22, "./signature": 23, "./support": 30, "./utils": 32, "./zipEntry": 34 }], 34: [function(e, t, r) {
        "use strict";
        var n = e("./reader/readerFor"), s = e("./utils"), i = e("./compressedObject"), a = e("./crc32"), o = e("./utf8"), h = e("./compressions"), u = e("./support");
        function l(e2, t2) {
          this.options = e2, this.loadOptions = t2;
        }
        l.prototype = { isEncrypted: function() {
          return 1 == (1 & this.bitFlag);
        }, useUTF8: function() {
          return 2048 == (2048 & this.bitFlag);
        }, readLocalPart: function(e2) {
          var t2, r2;
          if (e2.skip(22), this.fileNameLength = e2.readInt(2), r2 = e2.readInt(2), this.fileName = e2.readData(this.fileNameLength), e2.skip(r2), -1 === this.compressedSize || -1 === this.uncompressedSize) throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");
          if (null === (t2 = (function(e3) {
            for (var t3 in h) if (Object.prototype.hasOwnProperty.call(h, t3) && h[t3].magic === e3) return h[t3];
            return null;
          })(this.compressionMethod))) throw new Error("Corrupted zip : compression " + s.pretty(this.compressionMethod) + " unknown (inner file : " + s.transformTo("string", this.fileName) + ")");
          this.decompressed = new i(this.compressedSize, this.uncompressedSize, this.crc32, t2, e2.readData(this.compressedSize));
        }, readCentralPart: function(e2) {
          this.versionMadeBy = e2.readInt(2), e2.skip(2), this.bitFlag = e2.readInt(2), this.compressionMethod = e2.readString(2), this.date = e2.readDate(), this.crc32 = e2.readInt(4), this.compressedSize = e2.readInt(4), this.uncompressedSize = e2.readInt(4);
          var t2 = e2.readInt(2);
          if (this.extraFieldsLength = e2.readInt(2), this.fileCommentLength = e2.readInt(2), this.diskNumberStart = e2.readInt(2), this.internalFileAttributes = e2.readInt(2), this.externalFileAttributes = e2.readInt(4), this.localHeaderOffset = e2.readInt(4), this.isEncrypted()) throw new Error("Encrypted zip are not supported");
          e2.skip(t2), this.readExtraFields(e2), this.parseZIP64ExtraField(e2), this.fileComment = e2.readData(this.fileCommentLength);
        }, processAttributes: function() {
          this.unixPermissions = null, this.dosPermissions = null;
          var e2 = this.versionMadeBy >> 8;
          this.dir = !!(16 & this.externalFileAttributes), 0 == e2 && (this.dosPermissions = 63 & this.externalFileAttributes), 3 == e2 && (this.unixPermissions = this.externalFileAttributes >> 16 & 65535), this.dir || "/" !== this.fileNameStr.slice(-1) || (this.dir = true);
        }, parseZIP64ExtraField: function() {
          if (this.extraFields[1]) {
            var e2 = n(this.extraFields[1].value);
            this.uncompressedSize === s.MAX_VALUE_32BITS && (this.uncompressedSize = e2.readInt(8)), this.compressedSize === s.MAX_VALUE_32BITS && (this.compressedSize = e2.readInt(8)), this.localHeaderOffset === s.MAX_VALUE_32BITS && (this.localHeaderOffset = e2.readInt(8)), this.diskNumberStart === s.MAX_VALUE_32BITS && (this.diskNumberStart = e2.readInt(4));
          }
        }, readExtraFields: function(e2) {
          var t2, r2, n2, i2 = e2.index + this.extraFieldsLength;
          for (this.extraFields || (this.extraFields = {}); e2.index + 4 < i2; ) t2 = e2.readInt(2), r2 = e2.readInt(2), n2 = e2.readData(r2), this.extraFields[t2] = { id: t2, length: r2, value: n2 };
          e2.setIndex(i2);
        }, handleUTF8: function() {
          var e2 = u.uint8array ? "uint8array" : "array";
          if (this.useUTF8()) this.fileNameStr = o.utf8decode(this.fileName), this.fileCommentStr = o.utf8decode(this.fileComment);
          else {
            var t2 = this.findExtraFieldUnicodePath();
            if (null !== t2) this.fileNameStr = t2;
            else {
              var r2 = s.transformTo(e2, this.fileName);
              this.fileNameStr = this.loadOptions.decodeFileName(r2);
            }
            var n2 = this.findExtraFieldUnicodeComment();
            if (null !== n2) this.fileCommentStr = n2;
            else {
              var i2 = s.transformTo(e2, this.fileComment);
              this.fileCommentStr = this.loadOptions.decodeFileName(i2);
            }
          }
        }, findExtraFieldUnicodePath: function() {
          var e2 = this.extraFields[28789];
          if (e2) {
            var t2 = n(e2.value);
            return 1 !== t2.readInt(1) ? null : a(this.fileName) !== t2.readInt(4) ? null : o.utf8decode(t2.readData(e2.length - 5));
          }
          return null;
        }, findExtraFieldUnicodeComment: function() {
          var e2 = this.extraFields[25461];
          if (e2) {
            var t2 = n(e2.value);
            return 1 !== t2.readInt(1) ? null : a(this.fileComment) !== t2.readInt(4) ? null : o.utf8decode(t2.readData(e2.length - 5));
          }
          return null;
        } }, t.exports = l;
      }, { "./compressedObject": 2, "./compressions": 3, "./crc32": 4, "./reader/readerFor": 22, "./support": 30, "./utf8": 31, "./utils": 32 }], 35: [function(e, t, r) {
        "use strict";
        function n(e2, t2, r2) {
          this.name = e2, this.dir = r2.dir, this.date = r2.date, this.comment = r2.comment, this.unixPermissions = r2.unixPermissions, this.dosPermissions = r2.dosPermissions, this._data = t2, this._dataBinary = r2.binary, this.options = { compression: r2.compression, compressionOptions: r2.compressionOptions };
        }
        var s = e("./stream/StreamHelper"), i = e("./stream/DataWorker"), a = e("./utf8"), o = e("./compressedObject"), h = e("./stream/GenericWorker");
        n.prototype = { internalStream: function(e2) {
          var t2 = null, r2 = "string";
          try {
            if (!e2) throw new Error("No output type specified.");
            var n2 = "string" === (r2 = e2.toLowerCase()) || "text" === r2;
            "binarystring" !== r2 && "text" !== r2 || (r2 = "string"), t2 = this._decompressWorker();
            var i2 = !this._dataBinary;
            i2 && !n2 && (t2 = t2.pipe(new a.Utf8EncodeWorker())), !i2 && n2 && (t2 = t2.pipe(new a.Utf8DecodeWorker()));
          } catch (e3) {
            (t2 = new h("error")).error(e3);
          }
          return new s(t2, r2, "");
        }, async: function(e2, t2) {
          return this.internalStream(e2).accumulate(t2);
        }, nodeStream: function(e2, t2) {
          return this.internalStream(e2 || "nodebuffer").toNodejsStream(t2);
        }, _compressWorker: function(e2, t2) {
          if (this._data instanceof o && this._data.compression.magic === e2.magic) return this._data.getCompressedWorker();
          var r2 = this._decompressWorker();
          return this._dataBinary || (r2 = r2.pipe(new a.Utf8EncodeWorker())), o.createWorkerFrom(r2, e2, t2);
        }, _decompressWorker: function() {
          return this._data instanceof o ? this._data.getContentWorker() : this._data instanceof h ? this._data : new i(this._data);
        } };
        for (var u = ["asText", "asBinary", "asNodeBuffer", "asUint8Array", "asArrayBuffer"], l = function() {
          throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
        }, f = 0; f < u.length; f++) n.prototype[u[f]] = l;
        t.exports = n;
      }, { "./compressedObject": 2, "./stream/DataWorker": 27, "./stream/GenericWorker": 28, "./stream/StreamHelper": 29, "./utf8": 31 }], 36: [function(e, l, t) {
        (function(t2) {
          "use strict";
          var r, n, e2 = t2.MutationObserver || t2.WebKitMutationObserver;
          if (e2) {
            var i = 0, s = new e2(u), a = t2.document.createTextNode("");
            s.observe(a, { characterData: true }), r = function() {
              a.data = i = ++i % 2;
            };
          } else if (t2.setImmediate || void 0 === t2.MessageChannel) r = "document" in t2 && "onreadystatechange" in t2.document.createElement("script") ? function() {
            var e3 = t2.document.createElement("script");
            e3.onreadystatechange = function() {
              u(), e3.onreadystatechange = null, e3.parentNode.removeChild(e3), e3 = null;
            }, t2.document.documentElement.appendChild(e3);
          } : function() {
            setTimeout(u, 0);
          };
          else {
            var o = new t2.MessageChannel();
            o.port1.onmessage = u, r = function() {
              o.port2.postMessage(0);
            };
          }
          var h = [];
          function u() {
            var e3, t3;
            n = true;
            for (var r2 = h.length; r2; ) {
              for (t3 = h, h = [], e3 = -1; ++e3 < r2; ) t3[e3]();
              r2 = h.length;
            }
            n = false;
          }
          l.exports = function(e3) {
            1 !== h.push(e3) || n || r();
          };
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
      }, {}], 37: [function(e, t, r) {
        "use strict";
        var i = e("immediate");
        function u() {
        }
        var l = {}, s = ["REJECTED"], a = ["FULFILLED"], n = ["PENDING"];
        function o(e2) {
          if ("function" != typeof e2) throw new TypeError("resolver must be a function");
          this.state = n, this.queue = [], this.outcome = void 0, e2 !== u && d(this, e2);
        }
        function h(e2, t2, r2) {
          this.promise = e2, "function" == typeof t2 && (this.onFulfilled = t2, this.callFulfilled = this.otherCallFulfilled), "function" == typeof r2 && (this.onRejected = r2, this.callRejected = this.otherCallRejected);
        }
        function f(t2, r2, n2) {
          i(function() {
            var e2;
            try {
              e2 = r2(n2);
            } catch (e3) {
              return l.reject(t2, e3);
            }
            e2 === t2 ? l.reject(t2, new TypeError("Cannot resolve promise with itself")) : l.resolve(t2, e2);
          });
        }
        function c(e2) {
          var t2 = e2 && e2.then;
          if (e2 && ("object" == typeof e2 || "function" == typeof e2) && "function" == typeof t2) return function() {
            t2.apply(e2, arguments);
          };
        }
        function d(t2, e2) {
          var r2 = false;
          function n2(e3) {
            r2 || (r2 = true, l.reject(t2, e3));
          }
          function i2(e3) {
            r2 || (r2 = true, l.resolve(t2, e3));
          }
          var s2 = p(function() {
            e2(i2, n2);
          });
          "error" === s2.status && n2(s2.value);
        }
        function p(e2, t2) {
          var r2 = {};
          try {
            r2.value = e2(t2), r2.status = "success";
          } catch (e3) {
            r2.status = "error", r2.value = e3;
          }
          return r2;
        }
        (t.exports = o).prototype.finally = function(t2) {
          if ("function" != typeof t2) return this;
          var r2 = this.constructor;
          return this.then(function(e2) {
            return r2.resolve(t2()).then(function() {
              return e2;
            });
          }, function(e2) {
            return r2.resolve(t2()).then(function() {
              throw e2;
            });
          });
        }, o.prototype.catch = function(e2) {
          return this.then(null, e2);
        }, o.prototype.then = function(e2, t2) {
          if ("function" != typeof e2 && this.state === a || "function" != typeof t2 && this.state === s) return this;
          var r2 = new this.constructor(u);
          this.state !== n ? f(r2, this.state === a ? e2 : t2, this.outcome) : this.queue.push(new h(r2, e2, t2));
          return r2;
        }, h.prototype.callFulfilled = function(e2) {
          l.resolve(this.promise, e2);
        }, h.prototype.otherCallFulfilled = function(e2) {
          f(this.promise, this.onFulfilled, e2);
        }, h.prototype.callRejected = function(e2) {
          l.reject(this.promise, e2);
        }, h.prototype.otherCallRejected = function(e2) {
          f(this.promise, this.onRejected, e2);
        }, l.resolve = function(e2, t2) {
          var r2 = p(c, t2);
          if ("error" === r2.status) return l.reject(e2, r2.value);
          var n2 = r2.value;
          if (n2) d(e2, n2);
          else {
            e2.state = a, e2.outcome = t2;
            for (var i2 = -1, s2 = e2.queue.length; ++i2 < s2; ) e2.queue[i2].callFulfilled(t2);
          }
          return e2;
        }, l.reject = function(e2, t2) {
          e2.state = s, e2.outcome = t2;
          for (var r2 = -1, n2 = e2.queue.length; ++r2 < n2; ) e2.queue[r2].callRejected(t2);
          return e2;
        }, o.resolve = function(e2) {
          if (e2 instanceof this) return e2;
          return l.resolve(new this(u), e2);
        }, o.reject = function(e2) {
          var t2 = new this(u);
          return l.reject(t2, e2);
        }, o.all = function(e2) {
          var r2 = this;
          if ("[object Array]" !== Object.prototype.toString.call(e2)) return this.reject(new TypeError("must be an array"));
          var n2 = e2.length, i2 = false;
          if (!n2) return this.resolve([]);
          var s2 = new Array(n2), a2 = 0, t2 = -1, o2 = new this(u);
          for (; ++t2 < n2; ) h2(e2[t2], t2);
          return o2;
          function h2(e3, t3) {
            r2.resolve(e3).then(function(e4) {
              s2[t3] = e4, ++a2 !== n2 || i2 || (i2 = true, l.resolve(o2, s2));
            }, function(e4) {
              i2 || (i2 = true, l.reject(o2, e4));
            });
          }
        }, o.race = function(e2) {
          var t2 = this;
          if ("[object Array]" !== Object.prototype.toString.call(e2)) return this.reject(new TypeError("must be an array"));
          var r2 = e2.length, n2 = false;
          if (!r2) return this.resolve([]);
          var i2 = -1, s2 = new this(u);
          for (; ++i2 < r2; ) a2 = e2[i2], t2.resolve(a2).then(function(e3) {
            n2 || (n2 = true, l.resolve(s2, e3));
          }, function(e3) {
            n2 || (n2 = true, l.reject(s2, e3));
          });
          var a2;
          return s2;
        };
      }, { immediate: 36 }], 38: [function(e, t, r) {
        "use strict";
        var n = {};
        (0, e("./lib/utils/common").assign)(n, e("./lib/deflate"), e("./lib/inflate"), e("./lib/zlib/constants")), t.exports = n;
      }, { "./lib/deflate": 39, "./lib/inflate": 40, "./lib/utils/common": 41, "./lib/zlib/constants": 44 }], 39: [function(e, t, r) {
        "use strict";
        var a = e("./zlib/deflate"), o = e("./utils/common"), h = e("./utils/strings"), i = e("./zlib/messages"), s = e("./zlib/zstream"), u = Object.prototype.toString, l = 0, f = -1, c = 0, d = 8;
        function p(e2) {
          if (!(this instanceof p)) return new p(e2);
          this.options = o.assign({ level: f, method: d, chunkSize: 16384, windowBits: 15, memLevel: 8, strategy: c, to: "" }, e2 || {});
          var t2 = this.options;
          t2.raw && 0 < t2.windowBits ? t2.windowBits = -t2.windowBits : t2.gzip && 0 < t2.windowBits && t2.windowBits < 16 && (t2.windowBits += 16), this.err = 0, this.msg = "", this.ended = false, this.chunks = [], this.strm = new s(), this.strm.avail_out = 0;
          var r2 = a.deflateInit2(this.strm, t2.level, t2.method, t2.windowBits, t2.memLevel, t2.strategy);
          if (r2 !== l) throw new Error(i[r2]);
          if (t2.header && a.deflateSetHeader(this.strm, t2.header), t2.dictionary) {
            var n2;
            if (n2 = "string" == typeof t2.dictionary ? h.string2buf(t2.dictionary) : "[object ArrayBuffer]" === u.call(t2.dictionary) ? new Uint8Array(t2.dictionary) : t2.dictionary, (r2 = a.deflateSetDictionary(this.strm, n2)) !== l) throw new Error(i[r2]);
            this._dict_set = true;
          }
        }
        function n(e2, t2) {
          var r2 = new p(t2);
          if (r2.push(e2, true), r2.err) throw r2.msg || i[r2.err];
          return r2.result;
        }
        p.prototype.push = function(e2, t2) {
          var r2, n2, i2 = this.strm, s2 = this.options.chunkSize;
          if (this.ended) return false;
          n2 = t2 === ~~t2 ? t2 : true === t2 ? 4 : 0, "string" == typeof e2 ? i2.input = h.string2buf(e2) : "[object ArrayBuffer]" === u.call(e2) ? i2.input = new Uint8Array(e2) : i2.input = e2, i2.next_in = 0, i2.avail_in = i2.input.length;
          do {
            if (0 === i2.avail_out && (i2.output = new o.Buf8(s2), i2.next_out = 0, i2.avail_out = s2), 1 !== (r2 = a.deflate(i2, n2)) && r2 !== l) return this.onEnd(r2), !(this.ended = true);
            0 !== i2.avail_out && (0 !== i2.avail_in || 4 !== n2 && 2 !== n2) || ("string" === this.options.to ? this.onData(h.buf2binstring(o.shrinkBuf(i2.output, i2.next_out))) : this.onData(o.shrinkBuf(i2.output, i2.next_out)));
          } while ((0 < i2.avail_in || 0 === i2.avail_out) && 1 !== r2);
          return 4 === n2 ? (r2 = a.deflateEnd(this.strm), this.onEnd(r2), this.ended = true, r2 === l) : 2 !== n2 || (this.onEnd(l), !(i2.avail_out = 0));
        }, p.prototype.onData = function(e2) {
          this.chunks.push(e2);
        }, p.prototype.onEnd = function(e2) {
          e2 === l && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = o.flattenChunks(this.chunks)), this.chunks = [], this.err = e2, this.msg = this.strm.msg;
        }, r.Deflate = p, r.deflate = n, r.deflateRaw = function(e2, t2) {
          return (t2 = t2 || {}).raw = true, n(e2, t2);
        }, r.gzip = function(e2, t2) {
          return (t2 = t2 || {}).gzip = true, n(e2, t2);
        };
      }, { "./utils/common": 41, "./utils/strings": 42, "./zlib/deflate": 46, "./zlib/messages": 51, "./zlib/zstream": 53 }], 40: [function(e, t, r) {
        "use strict";
        var c = e("./zlib/inflate"), d = e("./utils/common"), p = e("./utils/strings"), m = e("./zlib/constants"), n = e("./zlib/messages"), i = e("./zlib/zstream"), s = e("./zlib/gzheader"), _ = Object.prototype.toString;
        function a(e2) {
          if (!(this instanceof a)) return new a(e2);
          this.options = d.assign({ chunkSize: 16384, windowBits: 0, to: "" }, e2 || {});
          var t2 = this.options;
          t2.raw && 0 <= t2.windowBits && t2.windowBits < 16 && (t2.windowBits = -t2.windowBits, 0 === t2.windowBits && (t2.windowBits = -15)), !(0 <= t2.windowBits && t2.windowBits < 16) || e2 && e2.windowBits || (t2.windowBits += 32), 15 < t2.windowBits && t2.windowBits < 48 && 0 == (15 & t2.windowBits) && (t2.windowBits |= 15), this.err = 0, this.msg = "", this.ended = false, this.chunks = [], this.strm = new i(), this.strm.avail_out = 0;
          var r2 = c.inflateInit2(this.strm, t2.windowBits);
          if (r2 !== m.Z_OK) throw new Error(n[r2]);
          this.header = new s(), c.inflateGetHeader(this.strm, this.header);
        }
        function o(e2, t2) {
          var r2 = new a(t2);
          if (r2.push(e2, true), r2.err) throw r2.msg || n[r2.err];
          return r2.result;
        }
        a.prototype.push = function(e2, t2) {
          var r2, n2, i2, s2, a2, o2, h = this.strm, u = this.options.chunkSize, l = this.options.dictionary, f = false;
          if (this.ended) return false;
          n2 = t2 === ~~t2 ? t2 : true === t2 ? m.Z_FINISH : m.Z_NO_FLUSH, "string" == typeof e2 ? h.input = p.binstring2buf(e2) : "[object ArrayBuffer]" === _.call(e2) ? h.input = new Uint8Array(e2) : h.input = e2, h.next_in = 0, h.avail_in = h.input.length;
          do {
            if (0 === h.avail_out && (h.output = new d.Buf8(u), h.next_out = 0, h.avail_out = u), (r2 = c.inflate(h, m.Z_NO_FLUSH)) === m.Z_NEED_DICT && l && (o2 = "string" == typeof l ? p.string2buf(l) : "[object ArrayBuffer]" === _.call(l) ? new Uint8Array(l) : l, r2 = c.inflateSetDictionary(this.strm, o2)), r2 === m.Z_BUF_ERROR && true === f && (r2 = m.Z_OK, f = false), r2 !== m.Z_STREAM_END && r2 !== m.Z_OK) return this.onEnd(r2), !(this.ended = true);
            h.next_out && (0 !== h.avail_out && r2 !== m.Z_STREAM_END && (0 !== h.avail_in || n2 !== m.Z_FINISH && n2 !== m.Z_SYNC_FLUSH) || ("string" === this.options.to ? (i2 = p.utf8border(h.output, h.next_out), s2 = h.next_out - i2, a2 = p.buf2string(h.output, i2), h.next_out = s2, h.avail_out = u - s2, s2 && d.arraySet(h.output, h.output, i2, s2, 0), this.onData(a2)) : this.onData(d.shrinkBuf(h.output, h.next_out)))), 0 === h.avail_in && 0 === h.avail_out && (f = true);
          } while ((0 < h.avail_in || 0 === h.avail_out) && r2 !== m.Z_STREAM_END);
          return r2 === m.Z_STREAM_END && (n2 = m.Z_FINISH), n2 === m.Z_FINISH ? (r2 = c.inflateEnd(this.strm), this.onEnd(r2), this.ended = true, r2 === m.Z_OK) : n2 !== m.Z_SYNC_FLUSH || (this.onEnd(m.Z_OK), !(h.avail_out = 0));
        }, a.prototype.onData = function(e2) {
          this.chunks.push(e2);
        }, a.prototype.onEnd = function(e2) {
          e2 === m.Z_OK && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = d.flattenChunks(this.chunks)), this.chunks = [], this.err = e2, this.msg = this.strm.msg;
        }, r.Inflate = a, r.inflate = o, r.inflateRaw = function(e2, t2) {
          return (t2 = t2 || {}).raw = true, o(e2, t2);
        }, r.ungzip = o;
      }, { "./utils/common": 41, "./utils/strings": 42, "./zlib/constants": 44, "./zlib/gzheader": 47, "./zlib/inflate": 49, "./zlib/messages": 51, "./zlib/zstream": 53 }], 41: [function(e, t, r) {
        "use strict";
        var n = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Int32Array;
        r.assign = function(e2) {
          for (var t2 = Array.prototype.slice.call(arguments, 1); t2.length; ) {
            var r2 = t2.shift();
            if (r2) {
              if ("object" != typeof r2) throw new TypeError(r2 + "must be non-object");
              for (var n2 in r2) r2.hasOwnProperty(n2) && (e2[n2] = r2[n2]);
            }
          }
          return e2;
        }, r.shrinkBuf = function(e2, t2) {
          return e2.length === t2 ? e2 : e2.subarray ? e2.subarray(0, t2) : (e2.length = t2, e2);
        };
        var i = { arraySet: function(e2, t2, r2, n2, i2) {
          if (t2.subarray && e2.subarray) e2.set(t2.subarray(r2, r2 + n2), i2);
          else for (var s2 = 0; s2 < n2; s2++) e2[i2 + s2] = t2[r2 + s2];
        }, flattenChunks: function(e2) {
          var t2, r2, n2, i2, s2, a;
          for (t2 = n2 = 0, r2 = e2.length; t2 < r2; t2++) n2 += e2[t2].length;
          for (a = new Uint8Array(n2), t2 = i2 = 0, r2 = e2.length; t2 < r2; t2++) s2 = e2[t2], a.set(s2, i2), i2 += s2.length;
          return a;
        } }, s = { arraySet: function(e2, t2, r2, n2, i2) {
          for (var s2 = 0; s2 < n2; s2++) e2[i2 + s2] = t2[r2 + s2];
        }, flattenChunks: function(e2) {
          return [].concat.apply([], e2);
        } };
        r.setTyped = function(e2) {
          e2 ? (r.Buf8 = Uint8Array, r.Buf16 = Uint16Array, r.Buf32 = Int32Array, r.assign(r, i)) : (r.Buf8 = Array, r.Buf16 = Array, r.Buf32 = Array, r.assign(r, s));
        }, r.setTyped(n);
      }, {}], 42: [function(e, t, r) {
        "use strict";
        var h = e("./common"), i = true, s = true;
        try {
          String.fromCharCode.apply(null, [0]);
        } catch (e2) {
          i = false;
        }
        try {
          String.fromCharCode.apply(null, new Uint8Array(1));
        } catch (e2) {
          s = false;
        }
        for (var u = new h.Buf8(256), n = 0; n < 256; n++) u[n] = 252 <= n ? 6 : 248 <= n ? 5 : 240 <= n ? 4 : 224 <= n ? 3 : 192 <= n ? 2 : 1;
        function l(e2, t2) {
          if (t2 < 65537 && (e2.subarray && s || !e2.subarray && i)) return String.fromCharCode.apply(null, h.shrinkBuf(e2, t2));
          for (var r2 = "", n2 = 0; n2 < t2; n2++) r2 += String.fromCharCode(e2[n2]);
          return r2;
        }
        u[254] = u[254] = 1, r.string2buf = function(e2) {
          var t2, r2, n2, i2, s2, a = e2.length, o = 0;
          for (i2 = 0; i2 < a; i2++) 55296 == (64512 & (r2 = e2.charCodeAt(i2))) && i2 + 1 < a && 56320 == (64512 & (n2 = e2.charCodeAt(i2 + 1))) && (r2 = 65536 + (r2 - 55296 << 10) + (n2 - 56320), i2++), o += r2 < 128 ? 1 : r2 < 2048 ? 2 : r2 < 65536 ? 3 : 4;
          for (t2 = new h.Buf8(o), i2 = s2 = 0; s2 < o; i2++) 55296 == (64512 & (r2 = e2.charCodeAt(i2))) && i2 + 1 < a && 56320 == (64512 & (n2 = e2.charCodeAt(i2 + 1))) && (r2 = 65536 + (r2 - 55296 << 10) + (n2 - 56320), i2++), r2 < 128 ? t2[s2++] = r2 : (r2 < 2048 ? t2[s2++] = 192 | r2 >>> 6 : (r2 < 65536 ? t2[s2++] = 224 | r2 >>> 12 : (t2[s2++] = 240 | r2 >>> 18, t2[s2++] = 128 | r2 >>> 12 & 63), t2[s2++] = 128 | r2 >>> 6 & 63), t2[s2++] = 128 | 63 & r2);
          return t2;
        }, r.buf2binstring = function(e2) {
          return l(e2, e2.length);
        }, r.binstring2buf = function(e2) {
          for (var t2 = new h.Buf8(e2.length), r2 = 0, n2 = t2.length; r2 < n2; r2++) t2[r2] = e2.charCodeAt(r2);
          return t2;
        }, r.buf2string = function(e2, t2) {
          var r2, n2, i2, s2, a = t2 || e2.length, o = new Array(2 * a);
          for (r2 = n2 = 0; r2 < a; ) if ((i2 = e2[r2++]) < 128) o[n2++] = i2;
          else if (4 < (s2 = u[i2])) o[n2++] = 65533, r2 += s2 - 1;
          else {
            for (i2 &= 2 === s2 ? 31 : 3 === s2 ? 15 : 7; 1 < s2 && r2 < a; ) i2 = i2 << 6 | 63 & e2[r2++], s2--;
            1 < s2 ? o[n2++] = 65533 : i2 < 65536 ? o[n2++] = i2 : (i2 -= 65536, o[n2++] = 55296 | i2 >> 10 & 1023, o[n2++] = 56320 | 1023 & i2);
          }
          return l(o, n2);
        }, r.utf8border = function(e2, t2) {
          var r2;
          for ((t2 = t2 || e2.length) > e2.length && (t2 = e2.length), r2 = t2 - 1; 0 <= r2 && 128 == (192 & e2[r2]); ) r2--;
          return r2 < 0 ? t2 : 0 === r2 ? t2 : r2 + u[e2[r2]] > t2 ? r2 : t2;
        };
      }, { "./common": 41 }], 43: [function(e, t, r) {
        "use strict";
        t.exports = function(e2, t2, r2, n) {
          for (var i = 65535 & e2 | 0, s = e2 >>> 16 & 65535 | 0, a = 0; 0 !== r2; ) {
            for (r2 -= a = 2e3 < r2 ? 2e3 : r2; s = s + (i = i + t2[n++] | 0) | 0, --a; ) ;
            i %= 65521, s %= 65521;
          }
          return i | s << 16 | 0;
        };
      }, {}], 44: [function(e, t, r) {
        "use strict";
        t.exports = { Z_NO_FLUSH: 0, Z_PARTIAL_FLUSH: 1, Z_SYNC_FLUSH: 2, Z_FULL_FLUSH: 3, Z_FINISH: 4, Z_BLOCK: 5, Z_TREES: 6, Z_OK: 0, Z_STREAM_END: 1, Z_NEED_DICT: 2, Z_ERRNO: -1, Z_STREAM_ERROR: -2, Z_DATA_ERROR: -3, Z_BUF_ERROR: -5, Z_NO_COMPRESSION: 0, Z_BEST_SPEED: 1, Z_BEST_COMPRESSION: 9, Z_DEFAULT_COMPRESSION: -1, Z_FILTERED: 1, Z_HUFFMAN_ONLY: 2, Z_RLE: 3, Z_FIXED: 4, Z_DEFAULT_STRATEGY: 0, Z_BINARY: 0, Z_TEXT: 1, Z_UNKNOWN: 2, Z_DEFLATED: 8 };
      }, {}], 45: [function(e, t, r) {
        "use strict";
        var o = (function() {
          for (var e2, t2 = [], r2 = 0; r2 < 256; r2++) {
            e2 = r2;
            for (var n = 0; n < 8; n++) e2 = 1 & e2 ? 3988292384 ^ e2 >>> 1 : e2 >>> 1;
            t2[r2] = e2;
          }
          return t2;
        })();
        t.exports = function(e2, t2, r2, n) {
          var i = o, s = n + r2;
          e2 ^= -1;
          for (var a = n; a < s; a++) e2 = e2 >>> 8 ^ i[255 & (e2 ^ t2[a])];
          return -1 ^ e2;
        };
      }, {}], 46: [function(e, t, r) {
        "use strict";
        var h, c = e("../utils/common"), u = e("./trees"), d = e("./adler32"), p = e("./crc32"), n = e("./messages"), l = 0, f = 4, m = 0, _ = -2, g = -1, b = 4, i = 2, v = 8, y = 9, s = 286, a = 30, o = 19, w = 2 * s + 1, k = 15, x = 3, S = 258, z = S + x + 1, C = 42, E = 113, A = 1, I = 2, O = 3, B = 4;
        function R(e2, t2) {
          return e2.msg = n[t2], t2;
        }
        function T(e2) {
          return (e2 << 1) - (4 < e2 ? 9 : 0);
        }
        function D(e2) {
          for (var t2 = e2.length; 0 <= --t2; ) e2[t2] = 0;
        }
        function F(e2) {
          var t2 = e2.state, r2 = t2.pending;
          r2 > e2.avail_out && (r2 = e2.avail_out), 0 !== r2 && (c.arraySet(e2.output, t2.pending_buf, t2.pending_out, r2, e2.next_out), e2.next_out += r2, t2.pending_out += r2, e2.total_out += r2, e2.avail_out -= r2, t2.pending -= r2, 0 === t2.pending && (t2.pending_out = 0));
        }
        function N(e2, t2) {
          u._tr_flush_block(e2, 0 <= e2.block_start ? e2.block_start : -1, e2.strstart - e2.block_start, t2), e2.block_start = e2.strstart, F(e2.strm);
        }
        function U(e2, t2) {
          e2.pending_buf[e2.pending++] = t2;
        }
        function P(e2, t2) {
          e2.pending_buf[e2.pending++] = t2 >>> 8 & 255, e2.pending_buf[e2.pending++] = 255 & t2;
        }
        function L(e2, t2) {
          var r2, n2, i2 = e2.max_chain_length, s2 = e2.strstart, a2 = e2.prev_length, o2 = e2.nice_match, h2 = e2.strstart > e2.w_size - z ? e2.strstart - (e2.w_size - z) : 0, u2 = e2.window, l2 = e2.w_mask, f2 = e2.prev, c2 = e2.strstart + S, d2 = u2[s2 + a2 - 1], p2 = u2[s2 + a2];
          e2.prev_length >= e2.good_match && (i2 >>= 2), o2 > e2.lookahead && (o2 = e2.lookahead);
          do {
            if (u2[(r2 = t2) + a2] === p2 && u2[r2 + a2 - 1] === d2 && u2[r2] === u2[s2] && u2[++r2] === u2[s2 + 1]) {
              s2 += 2, r2++;
              do {
              } while (u2[++s2] === u2[++r2] && u2[++s2] === u2[++r2] && u2[++s2] === u2[++r2] && u2[++s2] === u2[++r2] && u2[++s2] === u2[++r2] && u2[++s2] === u2[++r2] && u2[++s2] === u2[++r2] && u2[++s2] === u2[++r2] && s2 < c2);
              if (n2 = S - (c2 - s2), s2 = c2 - S, a2 < n2) {
                if (e2.match_start = t2, o2 <= (a2 = n2)) break;
                d2 = u2[s2 + a2 - 1], p2 = u2[s2 + a2];
              }
            }
          } while ((t2 = f2[t2 & l2]) > h2 && 0 != --i2);
          return a2 <= e2.lookahead ? a2 : e2.lookahead;
        }
        function j(e2) {
          var t2, r2, n2, i2, s2, a2, o2, h2, u2, l2, f2 = e2.w_size;
          do {
            if (i2 = e2.window_size - e2.lookahead - e2.strstart, e2.strstart >= f2 + (f2 - z)) {
              for (c.arraySet(e2.window, e2.window, f2, f2, 0), e2.match_start -= f2, e2.strstart -= f2, e2.block_start -= f2, t2 = r2 = e2.hash_size; n2 = e2.head[--t2], e2.head[t2] = f2 <= n2 ? n2 - f2 : 0, --r2; ) ;
              for (t2 = r2 = f2; n2 = e2.prev[--t2], e2.prev[t2] = f2 <= n2 ? n2 - f2 : 0, --r2; ) ;
              i2 += f2;
            }
            if (0 === e2.strm.avail_in) break;
            if (a2 = e2.strm, o2 = e2.window, h2 = e2.strstart + e2.lookahead, u2 = i2, l2 = void 0, l2 = a2.avail_in, u2 < l2 && (l2 = u2), r2 = 0 === l2 ? 0 : (a2.avail_in -= l2, c.arraySet(o2, a2.input, a2.next_in, l2, h2), 1 === a2.state.wrap ? a2.adler = d(a2.adler, o2, l2, h2) : 2 === a2.state.wrap && (a2.adler = p(a2.adler, o2, l2, h2)), a2.next_in += l2, a2.total_in += l2, l2), e2.lookahead += r2, e2.lookahead + e2.insert >= x) for (s2 = e2.strstart - e2.insert, e2.ins_h = e2.window[s2], e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[s2 + 1]) & e2.hash_mask; e2.insert && (e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[s2 + x - 1]) & e2.hash_mask, e2.prev[s2 & e2.w_mask] = e2.head[e2.ins_h], e2.head[e2.ins_h] = s2, s2++, e2.insert--, !(e2.lookahead + e2.insert < x)); ) ;
          } while (e2.lookahead < z && 0 !== e2.strm.avail_in);
        }
        function Z(e2, t2) {
          for (var r2, n2; ; ) {
            if (e2.lookahead < z) {
              if (j(e2), e2.lookahead < z && t2 === l) return A;
              if (0 === e2.lookahead) break;
            }
            if (r2 = 0, e2.lookahead >= x && (e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[e2.strstart + x - 1]) & e2.hash_mask, r2 = e2.prev[e2.strstart & e2.w_mask] = e2.head[e2.ins_h], e2.head[e2.ins_h] = e2.strstart), 0 !== r2 && e2.strstart - r2 <= e2.w_size - z && (e2.match_length = L(e2, r2)), e2.match_length >= x) if (n2 = u._tr_tally(e2, e2.strstart - e2.match_start, e2.match_length - x), e2.lookahead -= e2.match_length, e2.match_length <= e2.max_lazy_match && e2.lookahead >= x) {
              for (e2.match_length--; e2.strstart++, e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[e2.strstart + x - 1]) & e2.hash_mask, r2 = e2.prev[e2.strstart & e2.w_mask] = e2.head[e2.ins_h], e2.head[e2.ins_h] = e2.strstart, 0 != --e2.match_length; ) ;
              e2.strstart++;
            } else e2.strstart += e2.match_length, e2.match_length = 0, e2.ins_h = e2.window[e2.strstart], e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[e2.strstart + 1]) & e2.hash_mask;
            else n2 = u._tr_tally(e2, 0, e2.window[e2.strstart]), e2.lookahead--, e2.strstart++;
            if (n2 && (N(e2, false), 0 === e2.strm.avail_out)) return A;
          }
          return e2.insert = e2.strstart < x - 1 ? e2.strstart : x - 1, t2 === f ? (N(e2, true), 0 === e2.strm.avail_out ? O : B) : e2.last_lit && (N(e2, false), 0 === e2.strm.avail_out) ? A : I;
        }
        function W(e2, t2) {
          for (var r2, n2, i2; ; ) {
            if (e2.lookahead < z) {
              if (j(e2), e2.lookahead < z && t2 === l) return A;
              if (0 === e2.lookahead) break;
            }
            if (r2 = 0, e2.lookahead >= x && (e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[e2.strstart + x - 1]) & e2.hash_mask, r2 = e2.prev[e2.strstart & e2.w_mask] = e2.head[e2.ins_h], e2.head[e2.ins_h] = e2.strstart), e2.prev_length = e2.match_length, e2.prev_match = e2.match_start, e2.match_length = x - 1, 0 !== r2 && e2.prev_length < e2.max_lazy_match && e2.strstart - r2 <= e2.w_size - z && (e2.match_length = L(e2, r2), e2.match_length <= 5 && (1 === e2.strategy || e2.match_length === x && 4096 < e2.strstart - e2.match_start) && (e2.match_length = x - 1)), e2.prev_length >= x && e2.match_length <= e2.prev_length) {
              for (i2 = e2.strstart + e2.lookahead - x, n2 = u._tr_tally(e2, e2.strstart - 1 - e2.prev_match, e2.prev_length - x), e2.lookahead -= e2.prev_length - 1, e2.prev_length -= 2; ++e2.strstart <= i2 && (e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[e2.strstart + x - 1]) & e2.hash_mask, r2 = e2.prev[e2.strstart & e2.w_mask] = e2.head[e2.ins_h], e2.head[e2.ins_h] = e2.strstart), 0 != --e2.prev_length; ) ;
              if (e2.match_available = 0, e2.match_length = x - 1, e2.strstart++, n2 && (N(e2, false), 0 === e2.strm.avail_out)) return A;
            } else if (e2.match_available) {
              if ((n2 = u._tr_tally(e2, 0, e2.window[e2.strstart - 1])) && N(e2, false), e2.strstart++, e2.lookahead--, 0 === e2.strm.avail_out) return A;
            } else e2.match_available = 1, e2.strstart++, e2.lookahead--;
          }
          return e2.match_available && (n2 = u._tr_tally(e2, 0, e2.window[e2.strstart - 1]), e2.match_available = 0), e2.insert = e2.strstart < x - 1 ? e2.strstart : x - 1, t2 === f ? (N(e2, true), 0 === e2.strm.avail_out ? O : B) : e2.last_lit && (N(e2, false), 0 === e2.strm.avail_out) ? A : I;
        }
        function M(e2, t2, r2, n2, i2) {
          this.good_length = e2, this.max_lazy = t2, this.nice_length = r2, this.max_chain = n2, this.func = i2;
        }
        function H() {
          this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = v, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new c.Buf16(2 * w), this.dyn_dtree = new c.Buf16(2 * (2 * a + 1)), this.bl_tree = new c.Buf16(2 * (2 * o + 1)), D(this.dyn_ltree), D(this.dyn_dtree), D(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new c.Buf16(k + 1), this.heap = new c.Buf16(2 * s + 1), D(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new c.Buf16(2 * s + 1), D(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
        }
        function G(e2) {
          var t2;
          return e2 && e2.state ? (e2.total_in = e2.total_out = 0, e2.data_type = i, (t2 = e2.state).pending = 0, t2.pending_out = 0, t2.wrap < 0 && (t2.wrap = -t2.wrap), t2.status = t2.wrap ? C : E, e2.adler = 2 === t2.wrap ? 0 : 1, t2.last_flush = l, u._tr_init(t2), m) : R(e2, _);
        }
        function K(e2) {
          var t2 = G(e2);
          return t2 === m && (function(e3) {
            e3.window_size = 2 * e3.w_size, D(e3.head), e3.max_lazy_match = h[e3.level].max_lazy, e3.good_match = h[e3.level].good_length, e3.nice_match = h[e3.level].nice_length, e3.max_chain_length = h[e3.level].max_chain, e3.strstart = 0, e3.block_start = 0, e3.lookahead = 0, e3.insert = 0, e3.match_length = e3.prev_length = x - 1, e3.match_available = 0, e3.ins_h = 0;
          })(e2.state), t2;
        }
        function Y(e2, t2, r2, n2, i2, s2) {
          if (!e2) return _;
          var a2 = 1;
          if (t2 === g && (t2 = 6), n2 < 0 ? (a2 = 0, n2 = -n2) : 15 < n2 && (a2 = 2, n2 -= 16), i2 < 1 || y < i2 || r2 !== v || n2 < 8 || 15 < n2 || t2 < 0 || 9 < t2 || s2 < 0 || b < s2) return R(e2, _);
          8 === n2 && (n2 = 9);
          var o2 = new H();
          return (e2.state = o2).strm = e2, o2.wrap = a2, o2.gzhead = null, o2.w_bits = n2, o2.w_size = 1 << o2.w_bits, o2.w_mask = o2.w_size - 1, o2.hash_bits = i2 + 7, o2.hash_size = 1 << o2.hash_bits, o2.hash_mask = o2.hash_size - 1, o2.hash_shift = ~~((o2.hash_bits + x - 1) / x), o2.window = new c.Buf8(2 * o2.w_size), o2.head = new c.Buf16(o2.hash_size), o2.prev = new c.Buf16(o2.w_size), o2.lit_bufsize = 1 << i2 + 6, o2.pending_buf_size = 4 * o2.lit_bufsize, o2.pending_buf = new c.Buf8(o2.pending_buf_size), o2.d_buf = 1 * o2.lit_bufsize, o2.l_buf = 3 * o2.lit_bufsize, o2.level = t2, o2.strategy = s2, o2.method = r2, K(e2);
        }
        h = [new M(0, 0, 0, 0, function(e2, t2) {
          var r2 = 65535;
          for (r2 > e2.pending_buf_size - 5 && (r2 = e2.pending_buf_size - 5); ; ) {
            if (e2.lookahead <= 1) {
              if (j(e2), 0 === e2.lookahead && t2 === l) return A;
              if (0 === e2.lookahead) break;
            }
            e2.strstart += e2.lookahead, e2.lookahead = 0;
            var n2 = e2.block_start + r2;
            if ((0 === e2.strstart || e2.strstart >= n2) && (e2.lookahead = e2.strstart - n2, e2.strstart = n2, N(e2, false), 0 === e2.strm.avail_out)) return A;
            if (e2.strstart - e2.block_start >= e2.w_size - z && (N(e2, false), 0 === e2.strm.avail_out)) return A;
          }
          return e2.insert = 0, t2 === f ? (N(e2, true), 0 === e2.strm.avail_out ? O : B) : (e2.strstart > e2.block_start && (N(e2, false), e2.strm.avail_out), A);
        }), new M(4, 4, 8, 4, Z), new M(4, 5, 16, 8, Z), new M(4, 6, 32, 32, Z), new M(4, 4, 16, 16, W), new M(8, 16, 32, 32, W), new M(8, 16, 128, 128, W), new M(8, 32, 128, 256, W), new M(32, 128, 258, 1024, W), new M(32, 258, 258, 4096, W)], r.deflateInit = function(e2, t2) {
          return Y(e2, t2, v, 15, 8, 0);
        }, r.deflateInit2 = Y, r.deflateReset = K, r.deflateResetKeep = G, r.deflateSetHeader = function(e2, t2) {
          return e2 && e2.state ? 2 !== e2.state.wrap ? _ : (e2.state.gzhead = t2, m) : _;
        }, r.deflate = function(e2, t2) {
          var r2, n2, i2, s2;
          if (!e2 || !e2.state || 5 < t2 || t2 < 0) return e2 ? R(e2, _) : _;
          if (n2 = e2.state, !e2.output || !e2.input && 0 !== e2.avail_in || 666 === n2.status && t2 !== f) return R(e2, 0 === e2.avail_out ? -5 : _);
          if (n2.strm = e2, r2 = n2.last_flush, n2.last_flush = t2, n2.status === C) if (2 === n2.wrap) e2.adler = 0, U(n2, 31), U(n2, 139), U(n2, 8), n2.gzhead ? (U(n2, (n2.gzhead.text ? 1 : 0) + (n2.gzhead.hcrc ? 2 : 0) + (n2.gzhead.extra ? 4 : 0) + (n2.gzhead.name ? 8 : 0) + (n2.gzhead.comment ? 16 : 0)), U(n2, 255 & n2.gzhead.time), U(n2, n2.gzhead.time >> 8 & 255), U(n2, n2.gzhead.time >> 16 & 255), U(n2, n2.gzhead.time >> 24 & 255), U(n2, 9 === n2.level ? 2 : 2 <= n2.strategy || n2.level < 2 ? 4 : 0), U(n2, 255 & n2.gzhead.os), n2.gzhead.extra && n2.gzhead.extra.length && (U(n2, 255 & n2.gzhead.extra.length), U(n2, n2.gzhead.extra.length >> 8 & 255)), n2.gzhead.hcrc && (e2.adler = p(e2.adler, n2.pending_buf, n2.pending, 0)), n2.gzindex = 0, n2.status = 69) : (U(n2, 0), U(n2, 0), U(n2, 0), U(n2, 0), U(n2, 0), U(n2, 9 === n2.level ? 2 : 2 <= n2.strategy || n2.level < 2 ? 4 : 0), U(n2, 3), n2.status = E);
          else {
            var a2 = v + (n2.w_bits - 8 << 4) << 8;
            a2 |= (2 <= n2.strategy || n2.level < 2 ? 0 : n2.level < 6 ? 1 : 6 === n2.level ? 2 : 3) << 6, 0 !== n2.strstart && (a2 |= 32), a2 += 31 - a2 % 31, n2.status = E, P(n2, a2), 0 !== n2.strstart && (P(n2, e2.adler >>> 16), P(n2, 65535 & e2.adler)), e2.adler = 1;
          }
          if (69 === n2.status) if (n2.gzhead.extra) {
            for (i2 = n2.pending; n2.gzindex < (65535 & n2.gzhead.extra.length) && (n2.pending !== n2.pending_buf_size || (n2.gzhead.hcrc && n2.pending > i2 && (e2.adler = p(e2.adler, n2.pending_buf, n2.pending - i2, i2)), F(e2), i2 = n2.pending, n2.pending !== n2.pending_buf_size)); ) U(n2, 255 & n2.gzhead.extra[n2.gzindex]), n2.gzindex++;
            n2.gzhead.hcrc && n2.pending > i2 && (e2.adler = p(e2.adler, n2.pending_buf, n2.pending - i2, i2)), n2.gzindex === n2.gzhead.extra.length && (n2.gzindex = 0, n2.status = 73);
          } else n2.status = 73;
          if (73 === n2.status) if (n2.gzhead.name) {
            i2 = n2.pending;
            do {
              if (n2.pending === n2.pending_buf_size && (n2.gzhead.hcrc && n2.pending > i2 && (e2.adler = p(e2.adler, n2.pending_buf, n2.pending - i2, i2)), F(e2), i2 = n2.pending, n2.pending === n2.pending_buf_size)) {
                s2 = 1;
                break;
              }
              s2 = n2.gzindex < n2.gzhead.name.length ? 255 & n2.gzhead.name.charCodeAt(n2.gzindex++) : 0, U(n2, s2);
            } while (0 !== s2);
            n2.gzhead.hcrc && n2.pending > i2 && (e2.adler = p(e2.adler, n2.pending_buf, n2.pending - i2, i2)), 0 === s2 && (n2.gzindex = 0, n2.status = 91);
          } else n2.status = 91;
          if (91 === n2.status) if (n2.gzhead.comment) {
            i2 = n2.pending;
            do {
              if (n2.pending === n2.pending_buf_size && (n2.gzhead.hcrc && n2.pending > i2 && (e2.adler = p(e2.adler, n2.pending_buf, n2.pending - i2, i2)), F(e2), i2 = n2.pending, n2.pending === n2.pending_buf_size)) {
                s2 = 1;
                break;
              }
              s2 = n2.gzindex < n2.gzhead.comment.length ? 255 & n2.gzhead.comment.charCodeAt(n2.gzindex++) : 0, U(n2, s2);
            } while (0 !== s2);
            n2.gzhead.hcrc && n2.pending > i2 && (e2.adler = p(e2.adler, n2.pending_buf, n2.pending - i2, i2)), 0 === s2 && (n2.status = 103);
          } else n2.status = 103;
          if (103 === n2.status && (n2.gzhead.hcrc ? (n2.pending + 2 > n2.pending_buf_size && F(e2), n2.pending + 2 <= n2.pending_buf_size && (U(n2, 255 & e2.adler), U(n2, e2.adler >> 8 & 255), e2.adler = 0, n2.status = E)) : n2.status = E), 0 !== n2.pending) {
            if (F(e2), 0 === e2.avail_out) return n2.last_flush = -1, m;
          } else if (0 === e2.avail_in && T(t2) <= T(r2) && t2 !== f) return R(e2, -5);
          if (666 === n2.status && 0 !== e2.avail_in) return R(e2, -5);
          if (0 !== e2.avail_in || 0 !== n2.lookahead || t2 !== l && 666 !== n2.status) {
            var o2 = 2 === n2.strategy ? (function(e3, t3) {
              for (var r3; ; ) {
                if (0 === e3.lookahead && (j(e3), 0 === e3.lookahead)) {
                  if (t3 === l) return A;
                  break;
                }
                if (e3.match_length = 0, r3 = u._tr_tally(e3, 0, e3.window[e3.strstart]), e3.lookahead--, e3.strstart++, r3 && (N(e3, false), 0 === e3.strm.avail_out)) return A;
              }
              return e3.insert = 0, t3 === f ? (N(e3, true), 0 === e3.strm.avail_out ? O : B) : e3.last_lit && (N(e3, false), 0 === e3.strm.avail_out) ? A : I;
            })(n2, t2) : 3 === n2.strategy ? (function(e3, t3) {
              for (var r3, n3, i3, s3, a3 = e3.window; ; ) {
                if (e3.lookahead <= S) {
                  if (j(e3), e3.lookahead <= S && t3 === l) return A;
                  if (0 === e3.lookahead) break;
                }
                if (e3.match_length = 0, e3.lookahead >= x && 0 < e3.strstart && (n3 = a3[i3 = e3.strstart - 1]) === a3[++i3] && n3 === a3[++i3] && n3 === a3[++i3]) {
                  s3 = e3.strstart + S;
                  do {
                  } while (n3 === a3[++i3] && n3 === a3[++i3] && n3 === a3[++i3] && n3 === a3[++i3] && n3 === a3[++i3] && n3 === a3[++i3] && n3 === a3[++i3] && n3 === a3[++i3] && i3 < s3);
                  e3.match_length = S - (s3 - i3), e3.match_length > e3.lookahead && (e3.match_length = e3.lookahead);
                }
                if (e3.match_length >= x ? (r3 = u._tr_tally(e3, 1, e3.match_length - x), e3.lookahead -= e3.match_length, e3.strstart += e3.match_length, e3.match_length = 0) : (r3 = u._tr_tally(e3, 0, e3.window[e3.strstart]), e3.lookahead--, e3.strstart++), r3 && (N(e3, false), 0 === e3.strm.avail_out)) return A;
              }
              return e3.insert = 0, t3 === f ? (N(e3, true), 0 === e3.strm.avail_out ? O : B) : e3.last_lit && (N(e3, false), 0 === e3.strm.avail_out) ? A : I;
            })(n2, t2) : h[n2.level].func(n2, t2);
            if (o2 !== O && o2 !== B || (n2.status = 666), o2 === A || o2 === O) return 0 === e2.avail_out && (n2.last_flush = -1), m;
            if (o2 === I && (1 === t2 ? u._tr_align(n2) : 5 !== t2 && (u._tr_stored_block(n2, 0, 0, false), 3 === t2 && (D(n2.head), 0 === n2.lookahead && (n2.strstart = 0, n2.block_start = 0, n2.insert = 0))), F(e2), 0 === e2.avail_out)) return n2.last_flush = -1, m;
          }
          return t2 !== f ? m : n2.wrap <= 0 ? 1 : (2 === n2.wrap ? (U(n2, 255 & e2.adler), U(n2, e2.adler >> 8 & 255), U(n2, e2.adler >> 16 & 255), U(n2, e2.adler >> 24 & 255), U(n2, 255 & e2.total_in), U(n2, e2.total_in >> 8 & 255), U(n2, e2.total_in >> 16 & 255), U(n2, e2.total_in >> 24 & 255)) : (P(n2, e2.adler >>> 16), P(n2, 65535 & e2.adler)), F(e2), 0 < n2.wrap && (n2.wrap = -n2.wrap), 0 !== n2.pending ? m : 1);
        }, r.deflateEnd = function(e2) {
          var t2;
          return e2 && e2.state ? (t2 = e2.state.status) !== C && 69 !== t2 && 73 !== t2 && 91 !== t2 && 103 !== t2 && t2 !== E && 666 !== t2 ? R(e2, _) : (e2.state = null, t2 === E ? R(e2, -3) : m) : _;
        }, r.deflateSetDictionary = function(e2, t2) {
          var r2, n2, i2, s2, a2, o2, h2, u2, l2 = t2.length;
          if (!e2 || !e2.state) return _;
          if (2 === (s2 = (r2 = e2.state).wrap) || 1 === s2 && r2.status !== C || r2.lookahead) return _;
          for (1 === s2 && (e2.adler = d(e2.adler, t2, l2, 0)), r2.wrap = 0, l2 >= r2.w_size && (0 === s2 && (D(r2.head), r2.strstart = 0, r2.block_start = 0, r2.insert = 0), u2 = new c.Buf8(r2.w_size), c.arraySet(u2, t2, l2 - r2.w_size, r2.w_size, 0), t2 = u2, l2 = r2.w_size), a2 = e2.avail_in, o2 = e2.next_in, h2 = e2.input, e2.avail_in = l2, e2.next_in = 0, e2.input = t2, j(r2); r2.lookahead >= x; ) {
            for (n2 = r2.strstart, i2 = r2.lookahead - (x - 1); r2.ins_h = (r2.ins_h << r2.hash_shift ^ r2.window[n2 + x - 1]) & r2.hash_mask, r2.prev[n2 & r2.w_mask] = r2.head[r2.ins_h], r2.head[r2.ins_h] = n2, n2++, --i2; ) ;
            r2.strstart = n2, r2.lookahead = x - 1, j(r2);
          }
          return r2.strstart += r2.lookahead, r2.block_start = r2.strstart, r2.insert = r2.lookahead, r2.lookahead = 0, r2.match_length = r2.prev_length = x - 1, r2.match_available = 0, e2.next_in = o2, e2.input = h2, e2.avail_in = a2, r2.wrap = s2, m;
        }, r.deflateInfo = "pako deflate (from Nodeca project)";
      }, { "../utils/common": 41, "./adler32": 43, "./crc32": 45, "./messages": 51, "./trees": 52 }], 47: [function(e, t, r) {
        "use strict";
        t.exports = function() {
          this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = false;
        };
      }, {}], 48: [function(e, t, r) {
        "use strict";
        t.exports = function(e2, t2) {
          var r2, n, i, s, a, o, h, u, l, f, c, d, p, m, _, g, b, v, y, w, k, x, S, z, C;
          r2 = e2.state, n = e2.next_in, z = e2.input, i = n + (e2.avail_in - 5), s = e2.next_out, C = e2.output, a = s - (t2 - e2.avail_out), o = s + (e2.avail_out - 257), h = r2.dmax, u = r2.wsize, l = r2.whave, f = r2.wnext, c = r2.window, d = r2.hold, p = r2.bits, m = r2.lencode, _ = r2.distcode, g = (1 << r2.lenbits) - 1, b = (1 << r2.distbits) - 1;
          e: do {
            p < 15 && (d += z[n++] << p, p += 8, d += z[n++] << p, p += 8), v = m[d & g];
            t: for (; ; ) {
              if (d >>>= y = v >>> 24, p -= y, 0 === (y = v >>> 16 & 255)) C[s++] = 65535 & v;
              else {
                if (!(16 & y)) {
                  if (0 == (64 & y)) {
                    v = m[(65535 & v) + (d & (1 << y) - 1)];
                    continue t;
                  }
                  if (32 & y) {
                    r2.mode = 12;
                    break e;
                  }
                  e2.msg = "invalid literal/length code", r2.mode = 30;
                  break e;
                }
                w = 65535 & v, (y &= 15) && (p < y && (d += z[n++] << p, p += 8), w += d & (1 << y) - 1, d >>>= y, p -= y), p < 15 && (d += z[n++] << p, p += 8, d += z[n++] << p, p += 8), v = _[d & b];
                r: for (; ; ) {
                  if (d >>>= y = v >>> 24, p -= y, !(16 & (y = v >>> 16 & 255))) {
                    if (0 == (64 & y)) {
                      v = _[(65535 & v) + (d & (1 << y) - 1)];
                      continue r;
                    }
                    e2.msg = "invalid distance code", r2.mode = 30;
                    break e;
                  }
                  if (k = 65535 & v, p < (y &= 15) && (d += z[n++] << p, (p += 8) < y && (d += z[n++] << p, p += 8)), h < (k += d & (1 << y) - 1)) {
                    e2.msg = "invalid distance too far back", r2.mode = 30;
                    break e;
                  }
                  if (d >>>= y, p -= y, (y = s - a) < k) {
                    if (l < (y = k - y) && r2.sane) {
                      e2.msg = "invalid distance too far back", r2.mode = 30;
                      break e;
                    }
                    if (S = c, (x = 0) === f) {
                      if (x += u - y, y < w) {
                        for (w -= y; C[s++] = c[x++], --y; ) ;
                        x = s - k, S = C;
                      }
                    } else if (f < y) {
                      if (x += u + f - y, (y -= f) < w) {
                        for (w -= y; C[s++] = c[x++], --y; ) ;
                        if (x = 0, f < w) {
                          for (w -= y = f; C[s++] = c[x++], --y; ) ;
                          x = s - k, S = C;
                        }
                      }
                    } else if (x += f - y, y < w) {
                      for (w -= y; C[s++] = c[x++], --y; ) ;
                      x = s - k, S = C;
                    }
                    for (; 2 < w; ) C[s++] = S[x++], C[s++] = S[x++], C[s++] = S[x++], w -= 3;
                    w && (C[s++] = S[x++], 1 < w && (C[s++] = S[x++]));
                  } else {
                    for (x = s - k; C[s++] = C[x++], C[s++] = C[x++], C[s++] = C[x++], 2 < (w -= 3); ) ;
                    w && (C[s++] = C[x++], 1 < w && (C[s++] = C[x++]));
                  }
                  break;
                }
              }
              break;
            }
          } while (n < i && s < o);
          n -= w = p >> 3, d &= (1 << (p -= w << 3)) - 1, e2.next_in = n, e2.next_out = s, e2.avail_in = n < i ? i - n + 5 : 5 - (n - i), e2.avail_out = s < o ? o - s + 257 : 257 - (s - o), r2.hold = d, r2.bits = p;
        };
      }, {}], 49: [function(e, t, r) {
        "use strict";
        var I = e("../utils/common"), O = e("./adler32"), B = e("./crc32"), R = e("./inffast"), T = e("./inftrees"), D = 1, F = 2, N = 0, U = -2, P = 1, n = 852, i = 592;
        function L(e2) {
          return (e2 >>> 24 & 255) + (e2 >>> 8 & 65280) + ((65280 & e2) << 8) + ((255 & e2) << 24);
        }
        function s() {
          this.mode = 0, this.last = false, this.wrap = 0, this.havedict = false, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new I.Buf16(320), this.work = new I.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
        }
        function a(e2) {
          var t2;
          return e2 && e2.state ? (t2 = e2.state, e2.total_in = e2.total_out = t2.total = 0, e2.msg = "", t2.wrap && (e2.adler = 1 & t2.wrap), t2.mode = P, t2.last = 0, t2.havedict = 0, t2.dmax = 32768, t2.head = null, t2.hold = 0, t2.bits = 0, t2.lencode = t2.lendyn = new I.Buf32(n), t2.distcode = t2.distdyn = new I.Buf32(i), t2.sane = 1, t2.back = -1, N) : U;
        }
        function o(e2) {
          var t2;
          return e2 && e2.state ? ((t2 = e2.state).wsize = 0, t2.whave = 0, t2.wnext = 0, a(e2)) : U;
        }
        function h(e2, t2) {
          var r2, n2;
          return e2 && e2.state ? (n2 = e2.state, t2 < 0 ? (r2 = 0, t2 = -t2) : (r2 = 1 + (t2 >> 4), t2 < 48 && (t2 &= 15)), t2 && (t2 < 8 || 15 < t2) ? U : (null !== n2.window && n2.wbits !== t2 && (n2.window = null), n2.wrap = r2, n2.wbits = t2, o(e2))) : U;
        }
        function u(e2, t2) {
          var r2, n2;
          return e2 ? (n2 = new s(), (e2.state = n2).window = null, (r2 = h(e2, t2)) !== N && (e2.state = null), r2) : U;
        }
        var l, f, c = true;
        function j(e2) {
          if (c) {
            var t2;
            for (l = new I.Buf32(512), f = new I.Buf32(32), t2 = 0; t2 < 144; ) e2.lens[t2++] = 8;
            for (; t2 < 256; ) e2.lens[t2++] = 9;
            for (; t2 < 280; ) e2.lens[t2++] = 7;
            for (; t2 < 288; ) e2.lens[t2++] = 8;
            for (T(D, e2.lens, 0, 288, l, 0, e2.work, { bits: 9 }), t2 = 0; t2 < 32; ) e2.lens[t2++] = 5;
            T(F, e2.lens, 0, 32, f, 0, e2.work, { bits: 5 }), c = false;
          }
          e2.lencode = l, e2.lenbits = 9, e2.distcode = f, e2.distbits = 5;
        }
        function Z(e2, t2, r2, n2) {
          var i2, s2 = e2.state;
          return null === s2.window && (s2.wsize = 1 << s2.wbits, s2.wnext = 0, s2.whave = 0, s2.window = new I.Buf8(s2.wsize)), n2 >= s2.wsize ? (I.arraySet(s2.window, t2, r2 - s2.wsize, s2.wsize, 0), s2.wnext = 0, s2.whave = s2.wsize) : (n2 < (i2 = s2.wsize - s2.wnext) && (i2 = n2), I.arraySet(s2.window, t2, r2 - n2, i2, s2.wnext), (n2 -= i2) ? (I.arraySet(s2.window, t2, r2 - n2, n2, 0), s2.wnext = n2, s2.whave = s2.wsize) : (s2.wnext += i2, s2.wnext === s2.wsize && (s2.wnext = 0), s2.whave < s2.wsize && (s2.whave += i2))), 0;
        }
        r.inflateReset = o, r.inflateReset2 = h, r.inflateResetKeep = a, r.inflateInit = function(e2) {
          return u(e2, 15);
        }, r.inflateInit2 = u, r.inflate = function(e2, t2) {
          var r2, n2, i2, s2, a2, o2, h2, u2, l2, f2, c2, d, p, m, _, g, b, v, y, w, k, x, S, z, C = 0, E = new I.Buf8(4), A = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
          if (!e2 || !e2.state || !e2.output || !e2.input && 0 !== e2.avail_in) return U;
          12 === (r2 = e2.state).mode && (r2.mode = 13), a2 = e2.next_out, i2 = e2.output, h2 = e2.avail_out, s2 = e2.next_in, n2 = e2.input, o2 = e2.avail_in, u2 = r2.hold, l2 = r2.bits, f2 = o2, c2 = h2, x = N;
          e: for (; ; ) switch (r2.mode) {
            case P:
              if (0 === r2.wrap) {
                r2.mode = 13;
                break;
              }
              for (; l2 < 16; ) {
                if (0 === o2) break e;
                o2--, u2 += n2[s2++] << l2, l2 += 8;
              }
              if (2 & r2.wrap && 35615 === u2) {
                E[r2.check = 0] = 255 & u2, E[1] = u2 >>> 8 & 255, r2.check = B(r2.check, E, 2, 0), l2 = u2 = 0, r2.mode = 2;
                break;
              }
              if (r2.flags = 0, r2.head && (r2.head.done = false), !(1 & r2.wrap) || (((255 & u2) << 8) + (u2 >> 8)) % 31) {
                e2.msg = "incorrect header check", r2.mode = 30;
                break;
              }
              if (8 != (15 & u2)) {
                e2.msg = "unknown compression method", r2.mode = 30;
                break;
              }
              if (l2 -= 4, k = 8 + (15 & (u2 >>>= 4)), 0 === r2.wbits) r2.wbits = k;
              else if (k > r2.wbits) {
                e2.msg = "invalid window size", r2.mode = 30;
                break;
              }
              r2.dmax = 1 << k, e2.adler = r2.check = 1, r2.mode = 512 & u2 ? 10 : 12, l2 = u2 = 0;
              break;
            case 2:
              for (; l2 < 16; ) {
                if (0 === o2) break e;
                o2--, u2 += n2[s2++] << l2, l2 += 8;
              }
              if (r2.flags = u2, 8 != (255 & r2.flags)) {
                e2.msg = "unknown compression method", r2.mode = 30;
                break;
              }
              if (57344 & r2.flags) {
                e2.msg = "unknown header flags set", r2.mode = 30;
                break;
              }
              r2.head && (r2.head.text = u2 >> 8 & 1), 512 & r2.flags && (E[0] = 255 & u2, E[1] = u2 >>> 8 & 255, r2.check = B(r2.check, E, 2, 0)), l2 = u2 = 0, r2.mode = 3;
            case 3:
              for (; l2 < 32; ) {
                if (0 === o2) break e;
                o2--, u2 += n2[s2++] << l2, l2 += 8;
              }
              r2.head && (r2.head.time = u2), 512 & r2.flags && (E[0] = 255 & u2, E[1] = u2 >>> 8 & 255, E[2] = u2 >>> 16 & 255, E[3] = u2 >>> 24 & 255, r2.check = B(r2.check, E, 4, 0)), l2 = u2 = 0, r2.mode = 4;
            case 4:
              for (; l2 < 16; ) {
                if (0 === o2) break e;
                o2--, u2 += n2[s2++] << l2, l2 += 8;
              }
              r2.head && (r2.head.xflags = 255 & u2, r2.head.os = u2 >> 8), 512 & r2.flags && (E[0] = 255 & u2, E[1] = u2 >>> 8 & 255, r2.check = B(r2.check, E, 2, 0)), l2 = u2 = 0, r2.mode = 5;
            case 5:
              if (1024 & r2.flags) {
                for (; l2 < 16; ) {
                  if (0 === o2) break e;
                  o2--, u2 += n2[s2++] << l2, l2 += 8;
                }
                r2.length = u2, r2.head && (r2.head.extra_len = u2), 512 & r2.flags && (E[0] = 255 & u2, E[1] = u2 >>> 8 & 255, r2.check = B(r2.check, E, 2, 0)), l2 = u2 = 0;
              } else r2.head && (r2.head.extra = null);
              r2.mode = 6;
            case 6:
              if (1024 & r2.flags && (o2 < (d = r2.length) && (d = o2), d && (r2.head && (k = r2.head.extra_len - r2.length, r2.head.extra || (r2.head.extra = new Array(r2.head.extra_len)), I.arraySet(r2.head.extra, n2, s2, d, k)), 512 & r2.flags && (r2.check = B(r2.check, n2, d, s2)), o2 -= d, s2 += d, r2.length -= d), r2.length)) break e;
              r2.length = 0, r2.mode = 7;
            case 7:
              if (2048 & r2.flags) {
                if (0 === o2) break e;
                for (d = 0; k = n2[s2 + d++], r2.head && k && r2.length < 65536 && (r2.head.name += String.fromCharCode(k)), k && d < o2; ) ;
                if (512 & r2.flags && (r2.check = B(r2.check, n2, d, s2)), o2 -= d, s2 += d, k) break e;
              } else r2.head && (r2.head.name = null);
              r2.length = 0, r2.mode = 8;
            case 8:
              if (4096 & r2.flags) {
                if (0 === o2) break e;
                for (d = 0; k = n2[s2 + d++], r2.head && k && r2.length < 65536 && (r2.head.comment += String.fromCharCode(k)), k && d < o2; ) ;
                if (512 & r2.flags && (r2.check = B(r2.check, n2, d, s2)), o2 -= d, s2 += d, k) break e;
              } else r2.head && (r2.head.comment = null);
              r2.mode = 9;
            case 9:
              if (512 & r2.flags) {
                for (; l2 < 16; ) {
                  if (0 === o2) break e;
                  o2--, u2 += n2[s2++] << l2, l2 += 8;
                }
                if (u2 !== (65535 & r2.check)) {
                  e2.msg = "header crc mismatch", r2.mode = 30;
                  break;
                }
                l2 = u2 = 0;
              }
              r2.head && (r2.head.hcrc = r2.flags >> 9 & 1, r2.head.done = true), e2.adler = r2.check = 0, r2.mode = 12;
              break;
            case 10:
              for (; l2 < 32; ) {
                if (0 === o2) break e;
                o2--, u2 += n2[s2++] << l2, l2 += 8;
              }
              e2.adler = r2.check = L(u2), l2 = u2 = 0, r2.mode = 11;
            case 11:
              if (0 === r2.havedict) return e2.next_out = a2, e2.avail_out = h2, e2.next_in = s2, e2.avail_in = o2, r2.hold = u2, r2.bits = l2, 2;
              e2.adler = r2.check = 1, r2.mode = 12;
            case 12:
              if (5 === t2 || 6 === t2) break e;
            case 13:
              if (r2.last) {
                u2 >>>= 7 & l2, l2 -= 7 & l2, r2.mode = 27;
                break;
              }
              for (; l2 < 3; ) {
                if (0 === o2) break e;
                o2--, u2 += n2[s2++] << l2, l2 += 8;
              }
              switch (r2.last = 1 & u2, l2 -= 1, 3 & (u2 >>>= 1)) {
                case 0:
                  r2.mode = 14;
                  break;
                case 1:
                  if (j(r2), r2.mode = 20, 6 !== t2) break;
                  u2 >>>= 2, l2 -= 2;
                  break e;
                case 2:
                  r2.mode = 17;
                  break;
                case 3:
                  e2.msg = "invalid block type", r2.mode = 30;
              }
              u2 >>>= 2, l2 -= 2;
              break;
            case 14:
              for (u2 >>>= 7 & l2, l2 -= 7 & l2; l2 < 32; ) {
                if (0 === o2) break e;
                o2--, u2 += n2[s2++] << l2, l2 += 8;
              }
              if ((65535 & u2) != (u2 >>> 16 ^ 65535)) {
                e2.msg = "invalid stored block lengths", r2.mode = 30;
                break;
              }
              if (r2.length = 65535 & u2, l2 = u2 = 0, r2.mode = 15, 6 === t2) break e;
            case 15:
              r2.mode = 16;
            case 16:
              if (d = r2.length) {
                if (o2 < d && (d = o2), h2 < d && (d = h2), 0 === d) break e;
                I.arraySet(i2, n2, s2, d, a2), o2 -= d, s2 += d, h2 -= d, a2 += d, r2.length -= d;
                break;
              }
              r2.mode = 12;
              break;
            case 17:
              for (; l2 < 14; ) {
                if (0 === o2) break e;
                o2--, u2 += n2[s2++] << l2, l2 += 8;
              }
              if (r2.nlen = 257 + (31 & u2), u2 >>>= 5, l2 -= 5, r2.ndist = 1 + (31 & u2), u2 >>>= 5, l2 -= 5, r2.ncode = 4 + (15 & u2), u2 >>>= 4, l2 -= 4, 286 < r2.nlen || 30 < r2.ndist) {
                e2.msg = "too many length or distance symbols", r2.mode = 30;
                break;
              }
              r2.have = 0, r2.mode = 18;
            case 18:
              for (; r2.have < r2.ncode; ) {
                for (; l2 < 3; ) {
                  if (0 === o2) break e;
                  o2--, u2 += n2[s2++] << l2, l2 += 8;
                }
                r2.lens[A[r2.have++]] = 7 & u2, u2 >>>= 3, l2 -= 3;
              }
              for (; r2.have < 19; ) r2.lens[A[r2.have++]] = 0;
              if (r2.lencode = r2.lendyn, r2.lenbits = 7, S = { bits: r2.lenbits }, x = T(0, r2.lens, 0, 19, r2.lencode, 0, r2.work, S), r2.lenbits = S.bits, x) {
                e2.msg = "invalid code lengths set", r2.mode = 30;
                break;
              }
              r2.have = 0, r2.mode = 19;
            case 19:
              for (; r2.have < r2.nlen + r2.ndist; ) {
                for (; g = (C = r2.lencode[u2 & (1 << r2.lenbits) - 1]) >>> 16 & 255, b = 65535 & C, !((_ = C >>> 24) <= l2); ) {
                  if (0 === o2) break e;
                  o2--, u2 += n2[s2++] << l2, l2 += 8;
                }
                if (b < 16) u2 >>>= _, l2 -= _, r2.lens[r2.have++] = b;
                else {
                  if (16 === b) {
                    for (z = _ + 2; l2 < z; ) {
                      if (0 === o2) break e;
                      o2--, u2 += n2[s2++] << l2, l2 += 8;
                    }
                    if (u2 >>>= _, l2 -= _, 0 === r2.have) {
                      e2.msg = "invalid bit length repeat", r2.mode = 30;
                      break;
                    }
                    k = r2.lens[r2.have - 1], d = 3 + (3 & u2), u2 >>>= 2, l2 -= 2;
                  } else if (17 === b) {
                    for (z = _ + 3; l2 < z; ) {
                      if (0 === o2) break e;
                      o2--, u2 += n2[s2++] << l2, l2 += 8;
                    }
                    l2 -= _, k = 0, d = 3 + (7 & (u2 >>>= _)), u2 >>>= 3, l2 -= 3;
                  } else {
                    for (z = _ + 7; l2 < z; ) {
                      if (0 === o2) break e;
                      o2--, u2 += n2[s2++] << l2, l2 += 8;
                    }
                    l2 -= _, k = 0, d = 11 + (127 & (u2 >>>= _)), u2 >>>= 7, l2 -= 7;
                  }
                  if (r2.have + d > r2.nlen + r2.ndist) {
                    e2.msg = "invalid bit length repeat", r2.mode = 30;
                    break;
                  }
                  for (; d--; ) r2.lens[r2.have++] = k;
                }
              }
              if (30 === r2.mode) break;
              if (0 === r2.lens[256]) {
                e2.msg = "invalid code -- missing end-of-block", r2.mode = 30;
                break;
              }
              if (r2.lenbits = 9, S = { bits: r2.lenbits }, x = T(D, r2.lens, 0, r2.nlen, r2.lencode, 0, r2.work, S), r2.lenbits = S.bits, x) {
                e2.msg = "invalid literal/lengths set", r2.mode = 30;
                break;
              }
              if (r2.distbits = 6, r2.distcode = r2.distdyn, S = { bits: r2.distbits }, x = T(F, r2.lens, r2.nlen, r2.ndist, r2.distcode, 0, r2.work, S), r2.distbits = S.bits, x) {
                e2.msg = "invalid distances set", r2.mode = 30;
                break;
              }
              if (r2.mode = 20, 6 === t2) break e;
            case 20:
              r2.mode = 21;
            case 21:
              if (6 <= o2 && 258 <= h2) {
                e2.next_out = a2, e2.avail_out = h2, e2.next_in = s2, e2.avail_in = o2, r2.hold = u2, r2.bits = l2, R(e2, c2), a2 = e2.next_out, i2 = e2.output, h2 = e2.avail_out, s2 = e2.next_in, n2 = e2.input, o2 = e2.avail_in, u2 = r2.hold, l2 = r2.bits, 12 === r2.mode && (r2.back = -1);
                break;
              }
              for (r2.back = 0; g = (C = r2.lencode[u2 & (1 << r2.lenbits) - 1]) >>> 16 & 255, b = 65535 & C, !((_ = C >>> 24) <= l2); ) {
                if (0 === o2) break e;
                o2--, u2 += n2[s2++] << l2, l2 += 8;
              }
              if (g && 0 == (240 & g)) {
                for (v = _, y = g, w = b; g = (C = r2.lencode[w + ((u2 & (1 << v + y) - 1) >> v)]) >>> 16 & 255, b = 65535 & C, !(v + (_ = C >>> 24) <= l2); ) {
                  if (0 === o2) break e;
                  o2--, u2 += n2[s2++] << l2, l2 += 8;
                }
                u2 >>>= v, l2 -= v, r2.back += v;
              }
              if (u2 >>>= _, l2 -= _, r2.back += _, r2.length = b, 0 === g) {
                r2.mode = 26;
                break;
              }
              if (32 & g) {
                r2.back = -1, r2.mode = 12;
                break;
              }
              if (64 & g) {
                e2.msg = "invalid literal/length code", r2.mode = 30;
                break;
              }
              r2.extra = 15 & g, r2.mode = 22;
            case 22:
              if (r2.extra) {
                for (z = r2.extra; l2 < z; ) {
                  if (0 === o2) break e;
                  o2--, u2 += n2[s2++] << l2, l2 += 8;
                }
                r2.length += u2 & (1 << r2.extra) - 1, u2 >>>= r2.extra, l2 -= r2.extra, r2.back += r2.extra;
              }
              r2.was = r2.length, r2.mode = 23;
            case 23:
              for (; g = (C = r2.distcode[u2 & (1 << r2.distbits) - 1]) >>> 16 & 255, b = 65535 & C, !((_ = C >>> 24) <= l2); ) {
                if (0 === o2) break e;
                o2--, u2 += n2[s2++] << l2, l2 += 8;
              }
              if (0 == (240 & g)) {
                for (v = _, y = g, w = b; g = (C = r2.distcode[w + ((u2 & (1 << v + y) - 1) >> v)]) >>> 16 & 255, b = 65535 & C, !(v + (_ = C >>> 24) <= l2); ) {
                  if (0 === o2) break e;
                  o2--, u2 += n2[s2++] << l2, l2 += 8;
                }
                u2 >>>= v, l2 -= v, r2.back += v;
              }
              if (u2 >>>= _, l2 -= _, r2.back += _, 64 & g) {
                e2.msg = "invalid distance code", r2.mode = 30;
                break;
              }
              r2.offset = b, r2.extra = 15 & g, r2.mode = 24;
            case 24:
              if (r2.extra) {
                for (z = r2.extra; l2 < z; ) {
                  if (0 === o2) break e;
                  o2--, u2 += n2[s2++] << l2, l2 += 8;
                }
                r2.offset += u2 & (1 << r2.extra) - 1, u2 >>>= r2.extra, l2 -= r2.extra, r2.back += r2.extra;
              }
              if (r2.offset > r2.dmax) {
                e2.msg = "invalid distance too far back", r2.mode = 30;
                break;
              }
              r2.mode = 25;
            case 25:
              if (0 === h2) break e;
              if (d = c2 - h2, r2.offset > d) {
                if ((d = r2.offset - d) > r2.whave && r2.sane) {
                  e2.msg = "invalid distance too far back", r2.mode = 30;
                  break;
                }
                p = d > r2.wnext ? (d -= r2.wnext, r2.wsize - d) : r2.wnext - d, d > r2.length && (d = r2.length), m = r2.window;
              } else m = i2, p = a2 - r2.offset, d = r2.length;
              for (h2 < d && (d = h2), h2 -= d, r2.length -= d; i2[a2++] = m[p++], --d; ) ;
              0 === r2.length && (r2.mode = 21);
              break;
            case 26:
              if (0 === h2) break e;
              i2[a2++] = r2.length, h2--, r2.mode = 21;
              break;
            case 27:
              if (r2.wrap) {
                for (; l2 < 32; ) {
                  if (0 === o2) break e;
                  o2--, u2 |= n2[s2++] << l2, l2 += 8;
                }
                if (c2 -= h2, e2.total_out += c2, r2.total += c2, c2 && (e2.adler = r2.check = r2.flags ? B(r2.check, i2, c2, a2 - c2) : O(r2.check, i2, c2, a2 - c2)), c2 = h2, (r2.flags ? u2 : L(u2)) !== r2.check) {
                  e2.msg = "incorrect data check", r2.mode = 30;
                  break;
                }
                l2 = u2 = 0;
              }
              r2.mode = 28;
            case 28:
              if (r2.wrap && r2.flags) {
                for (; l2 < 32; ) {
                  if (0 === o2) break e;
                  o2--, u2 += n2[s2++] << l2, l2 += 8;
                }
                if (u2 !== (4294967295 & r2.total)) {
                  e2.msg = "incorrect length check", r2.mode = 30;
                  break;
                }
                l2 = u2 = 0;
              }
              r2.mode = 29;
            case 29:
              x = 1;
              break e;
            case 30:
              x = -3;
              break e;
            case 31:
              return -4;
            case 32:
            default:
              return U;
          }
          return e2.next_out = a2, e2.avail_out = h2, e2.next_in = s2, e2.avail_in = o2, r2.hold = u2, r2.bits = l2, (r2.wsize || c2 !== e2.avail_out && r2.mode < 30 && (r2.mode < 27 || 4 !== t2)) && Z(e2, e2.output, e2.next_out, c2 - e2.avail_out) ? (r2.mode = 31, -4) : (f2 -= e2.avail_in, c2 -= e2.avail_out, e2.total_in += f2, e2.total_out += c2, r2.total += c2, r2.wrap && c2 && (e2.adler = r2.check = r2.flags ? B(r2.check, i2, c2, e2.next_out - c2) : O(r2.check, i2, c2, e2.next_out - c2)), e2.data_type = r2.bits + (r2.last ? 64 : 0) + (12 === r2.mode ? 128 : 0) + (20 === r2.mode || 15 === r2.mode ? 256 : 0), (0 == f2 && 0 === c2 || 4 === t2) && x === N && (x = -5), x);
        }, r.inflateEnd = function(e2) {
          if (!e2 || !e2.state) return U;
          var t2 = e2.state;
          return t2.window && (t2.window = null), e2.state = null, N;
        }, r.inflateGetHeader = function(e2, t2) {
          var r2;
          return e2 && e2.state ? 0 == (2 & (r2 = e2.state).wrap) ? U : ((r2.head = t2).done = false, N) : U;
        }, r.inflateSetDictionary = function(e2, t2) {
          var r2, n2 = t2.length;
          return e2 && e2.state ? 0 !== (r2 = e2.state).wrap && 11 !== r2.mode ? U : 11 === r2.mode && O(1, t2, n2, 0) !== r2.check ? -3 : Z(e2, t2, n2, n2) ? (r2.mode = 31, -4) : (r2.havedict = 1, N) : U;
        }, r.inflateInfo = "pako inflate (from Nodeca project)";
      }, { "../utils/common": 41, "./adler32": 43, "./crc32": 45, "./inffast": 48, "./inftrees": 50 }], 50: [function(e, t, r) {
        "use strict";
        var D = e("../utils/common"), F = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0], N = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78], U = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0], P = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
        t.exports = function(e2, t2, r2, n, i, s, a, o) {
          var h, u, l, f, c, d, p, m, _, g = o.bits, b = 0, v = 0, y = 0, w = 0, k = 0, x = 0, S = 0, z = 0, C = 0, E = 0, A = null, I = 0, O = new D.Buf16(16), B = new D.Buf16(16), R = null, T = 0;
          for (b = 0; b <= 15; b++) O[b] = 0;
          for (v = 0; v < n; v++) O[t2[r2 + v]]++;
          for (k = g, w = 15; 1 <= w && 0 === O[w]; w--) ;
          if (w < k && (k = w), 0 === w) return i[s++] = 20971520, i[s++] = 20971520, o.bits = 1, 0;
          for (y = 1; y < w && 0 === O[y]; y++) ;
          for (k < y && (k = y), b = z = 1; b <= 15; b++) if (z <<= 1, (z -= O[b]) < 0) return -1;
          if (0 < z && (0 === e2 || 1 !== w)) return -1;
          for (B[1] = 0, b = 1; b < 15; b++) B[b + 1] = B[b] + O[b];
          for (v = 0; v < n; v++) 0 !== t2[r2 + v] && (a[B[t2[r2 + v]]++] = v);
          if (d = 0 === e2 ? (A = R = a, 19) : 1 === e2 ? (A = F, I -= 257, R = N, T -= 257, 256) : (A = U, R = P, -1), b = y, c = s, S = v = E = 0, l = -1, f = (C = 1 << (x = k)) - 1, 1 === e2 && 852 < C || 2 === e2 && 592 < C) return 1;
          for (; ; ) {
            for (p = b - S, _ = a[v] < d ? (m = 0, a[v]) : a[v] > d ? (m = R[T + a[v]], A[I + a[v]]) : (m = 96, 0), h = 1 << b - S, y = u = 1 << x; i[c + (E >> S) + (u -= h)] = p << 24 | m << 16 | _ | 0, 0 !== u; ) ;
            for (h = 1 << b - 1; E & h; ) h >>= 1;
            if (0 !== h ? (E &= h - 1, E += h) : E = 0, v++, 0 == --O[b]) {
              if (b === w) break;
              b = t2[r2 + a[v]];
            }
            if (k < b && (E & f) !== l) {
              for (0 === S && (S = k), c += y, z = 1 << (x = b - S); x + S < w && !((z -= O[x + S]) <= 0); ) x++, z <<= 1;
              if (C += 1 << x, 1 === e2 && 852 < C || 2 === e2 && 592 < C) return 1;
              i[l = E & f] = k << 24 | x << 16 | c - s | 0;
            }
          }
          return 0 !== E && (i[c + E] = b - S << 24 | 64 << 16 | 0), o.bits = k, 0;
        };
      }, { "../utils/common": 41 }], 51: [function(e, t, r) {
        "use strict";
        t.exports = { 2: "need dictionary", 1: "stream end", 0: "", "-1": "file error", "-2": "stream error", "-3": "data error", "-4": "insufficient memory", "-5": "buffer error", "-6": "incompatible version" };
      }, {}], 52: [function(e, t, r) {
        "use strict";
        var i = e("../utils/common"), o = 0, h = 1;
        function n(e2) {
          for (var t2 = e2.length; 0 <= --t2; ) e2[t2] = 0;
        }
        var s = 0, a = 29, u = 256, l = u + 1 + a, f = 30, c = 19, _ = 2 * l + 1, g = 15, d = 16, p = 7, m = 256, b = 16, v = 17, y = 18, w = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0], k = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13], x = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7], S = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], z = new Array(2 * (l + 2));
        n(z);
        var C = new Array(2 * f);
        n(C);
        var E = new Array(512);
        n(E);
        var A = new Array(256);
        n(A);
        var I = new Array(a);
        n(I);
        var O, B, R, T = new Array(f);
        function D(e2, t2, r2, n2, i2) {
          this.static_tree = e2, this.extra_bits = t2, this.extra_base = r2, this.elems = n2, this.max_length = i2, this.has_stree = e2 && e2.length;
        }
        function F(e2, t2) {
          this.dyn_tree = e2, this.max_code = 0, this.stat_desc = t2;
        }
        function N(e2) {
          return e2 < 256 ? E[e2] : E[256 + (e2 >>> 7)];
        }
        function U(e2, t2) {
          e2.pending_buf[e2.pending++] = 255 & t2, e2.pending_buf[e2.pending++] = t2 >>> 8 & 255;
        }
        function P(e2, t2, r2) {
          e2.bi_valid > d - r2 ? (e2.bi_buf |= t2 << e2.bi_valid & 65535, U(e2, e2.bi_buf), e2.bi_buf = t2 >> d - e2.bi_valid, e2.bi_valid += r2 - d) : (e2.bi_buf |= t2 << e2.bi_valid & 65535, e2.bi_valid += r2);
        }
        function L(e2, t2, r2) {
          P(e2, r2[2 * t2], r2[2 * t2 + 1]);
        }
        function j(e2, t2) {
          for (var r2 = 0; r2 |= 1 & e2, e2 >>>= 1, r2 <<= 1, 0 < --t2; ) ;
          return r2 >>> 1;
        }
        function Z(e2, t2, r2) {
          var n2, i2, s2 = new Array(g + 1), a2 = 0;
          for (n2 = 1; n2 <= g; n2++) s2[n2] = a2 = a2 + r2[n2 - 1] << 1;
          for (i2 = 0; i2 <= t2; i2++) {
            var o2 = e2[2 * i2 + 1];
            0 !== o2 && (e2[2 * i2] = j(s2[o2]++, o2));
          }
        }
        function W(e2) {
          var t2;
          for (t2 = 0; t2 < l; t2++) e2.dyn_ltree[2 * t2] = 0;
          for (t2 = 0; t2 < f; t2++) e2.dyn_dtree[2 * t2] = 0;
          for (t2 = 0; t2 < c; t2++) e2.bl_tree[2 * t2] = 0;
          e2.dyn_ltree[2 * m] = 1, e2.opt_len = e2.static_len = 0, e2.last_lit = e2.matches = 0;
        }
        function M(e2) {
          8 < e2.bi_valid ? U(e2, e2.bi_buf) : 0 < e2.bi_valid && (e2.pending_buf[e2.pending++] = e2.bi_buf), e2.bi_buf = 0, e2.bi_valid = 0;
        }
        function H(e2, t2, r2, n2) {
          var i2 = 2 * t2, s2 = 2 * r2;
          return e2[i2] < e2[s2] || e2[i2] === e2[s2] && n2[t2] <= n2[r2];
        }
        function G(e2, t2, r2) {
          for (var n2 = e2.heap[r2], i2 = r2 << 1; i2 <= e2.heap_len && (i2 < e2.heap_len && H(t2, e2.heap[i2 + 1], e2.heap[i2], e2.depth) && i2++, !H(t2, n2, e2.heap[i2], e2.depth)); ) e2.heap[r2] = e2.heap[i2], r2 = i2, i2 <<= 1;
          e2.heap[r2] = n2;
        }
        function K(e2, t2, r2) {
          var n2, i2, s2, a2, o2 = 0;
          if (0 !== e2.last_lit) for (; n2 = e2.pending_buf[e2.d_buf + 2 * o2] << 8 | e2.pending_buf[e2.d_buf + 2 * o2 + 1], i2 = e2.pending_buf[e2.l_buf + o2], o2++, 0 === n2 ? L(e2, i2, t2) : (L(e2, (s2 = A[i2]) + u + 1, t2), 0 !== (a2 = w[s2]) && P(e2, i2 -= I[s2], a2), L(e2, s2 = N(--n2), r2), 0 !== (a2 = k[s2]) && P(e2, n2 -= T[s2], a2)), o2 < e2.last_lit; ) ;
          L(e2, m, t2);
        }
        function Y(e2, t2) {
          var r2, n2, i2, s2 = t2.dyn_tree, a2 = t2.stat_desc.static_tree, o2 = t2.stat_desc.has_stree, h2 = t2.stat_desc.elems, u2 = -1;
          for (e2.heap_len = 0, e2.heap_max = _, r2 = 0; r2 < h2; r2++) 0 !== s2[2 * r2] ? (e2.heap[++e2.heap_len] = u2 = r2, e2.depth[r2] = 0) : s2[2 * r2 + 1] = 0;
          for (; e2.heap_len < 2; ) s2[2 * (i2 = e2.heap[++e2.heap_len] = u2 < 2 ? ++u2 : 0)] = 1, e2.depth[i2] = 0, e2.opt_len--, o2 && (e2.static_len -= a2[2 * i2 + 1]);
          for (t2.max_code = u2, r2 = e2.heap_len >> 1; 1 <= r2; r2--) G(e2, s2, r2);
          for (i2 = h2; r2 = e2.heap[1], e2.heap[1] = e2.heap[e2.heap_len--], G(e2, s2, 1), n2 = e2.heap[1], e2.heap[--e2.heap_max] = r2, e2.heap[--e2.heap_max] = n2, s2[2 * i2] = s2[2 * r2] + s2[2 * n2], e2.depth[i2] = (e2.depth[r2] >= e2.depth[n2] ? e2.depth[r2] : e2.depth[n2]) + 1, s2[2 * r2 + 1] = s2[2 * n2 + 1] = i2, e2.heap[1] = i2++, G(e2, s2, 1), 2 <= e2.heap_len; ) ;
          e2.heap[--e2.heap_max] = e2.heap[1], (function(e3, t3) {
            var r3, n3, i3, s3, a3, o3, h3 = t3.dyn_tree, u3 = t3.max_code, l2 = t3.stat_desc.static_tree, f2 = t3.stat_desc.has_stree, c2 = t3.stat_desc.extra_bits, d2 = t3.stat_desc.extra_base, p2 = t3.stat_desc.max_length, m2 = 0;
            for (s3 = 0; s3 <= g; s3++) e3.bl_count[s3] = 0;
            for (h3[2 * e3.heap[e3.heap_max] + 1] = 0, r3 = e3.heap_max + 1; r3 < _; r3++) p2 < (s3 = h3[2 * h3[2 * (n3 = e3.heap[r3]) + 1] + 1] + 1) && (s3 = p2, m2++), h3[2 * n3 + 1] = s3, u3 < n3 || (e3.bl_count[s3]++, a3 = 0, d2 <= n3 && (a3 = c2[n3 - d2]), o3 = h3[2 * n3], e3.opt_len += o3 * (s3 + a3), f2 && (e3.static_len += o3 * (l2[2 * n3 + 1] + a3)));
            if (0 !== m2) {
              do {
                for (s3 = p2 - 1; 0 === e3.bl_count[s3]; ) s3--;
                e3.bl_count[s3]--, e3.bl_count[s3 + 1] += 2, e3.bl_count[p2]--, m2 -= 2;
              } while (0 < m2);
              for (s3 = p2; 0 !== s3; s3--) for (n3 = e3.bl_count[s3]; 0 !== n3; ) u3 < (i3 = e3.heap[--r3]) || (h3[2 * i3 + 1] !== s3 && (e3.opt_len += (s3 - h3[2 * i3 + 1]) * h3[2 * i3], h3[2 * i3 + 1] = s3), n3--);
            }
          })(e2, t2), Z(s2, u2, e2.bl_count);
        }
        function X(e2, t2, r2) {
          var n2, i2, s2 = -1, a2 = t2[1], o2 = 0, h2 = 7, u2 = 4;
          for (0 === a2 && (h2 = 138, u2 = 3), t2[2 * (r2 + 1) + 1] = 65535, n2 = 0; n2 <= r2; n2++) i2 = a2, a2 = t2[2 * (n2 + 1) + 1], ++o2 < h2 && i2 === a2 || (o2 < u2 ? e2.bl_tree[2 * i2] += o2 : 0 !== i2 ? (i2 !== s2 && e2.bl_tree[2 * i2]++, e2.bl_tree[2 * b]++) : o2 <= 10 ? e2.bl_tree[2 * v]++ : e2.bl_tree[2 * y]++, s2 = i2, u2 = (o2 = 0) === a2 ? (h2 = 138, 3) : i2 === a2 ? (h2 = 6, 3) : (h2 = 7, 4));
        }
        function V(e2, t2, r2) {
          var n2, i2, s2 = -1, a2 = t2[1], o2 = 0, h2 = 7, u2 = 4;
          for (0 === a2 && (h2 = 138, u2 = 3), n2 = 0; n2 <= r2; n2++) if (i2 = a2, a2 = t2[2 * (n2 + 1) + 1], !(++o2 < h2 && i2 === a2)) {
            if (o2 < u2) for (; L(e2, i2, e2.bl_tree), 0 != --o2; ) ;
            else 0 !== i2 ? (i2 !== s2 && (L(e2, i2, e2.bl_tree), o2--), L(e2, b, e2.bl_tree), P(e2, o2 - 3, 2)) : o2 <= 10 ? (L(e2, v, e2.bl_tree), P(e2, o2 - 3, 3)) : (L(e2, y, e2.bl_tree), P(e2, o2 - 11, 7));
            s2 = i2, u2 = (o2 = 0) === a2 ? (h2 = 138, 3) : i2 === a2 ? (h2 = 6, 3) : (h2 = 7, 4);
          }
        }
        n(T);
        var q = false;
        function J(e2, t2, r2, n2) {
          P(e2, (s << 1) + (n2 ? 1 : 0), 3), (function(e3, t3, r3, n3) {
            M(e3), n3 && (U(e3, r3), U(e3, ~r3)), i.arraySet(e3.pending_buf, e3.window, t3, r3, e3.pending), e3.pending += r3;
          })(e2, t2, r2, true);
        }
        r._tr_init = function(e2) {
          q || ((function() {
            var e3, t2, r2, n2, i2, s2 = new Array(g + 1);
            for (n2 = r2 = 0; n2 < a - 1; n2++) for (I[n2] = r2, e3 = 0; e3 < 1 << w[n2]; e3++) A[r2++] = n2;
            for (A[r2 - 1] = n2, n2 = i2 = 0; n2 < 16; n2++) for (T[n2] = i2, e3 = 0; e3 < 1 << k[n2]; e3++) E[i2++] = n2;
            for (i2 >>= 7; n2 < f; n2++) for (T[n2] = i2 << 7, e3 = 0; e3 < 1 << k[n2] - 7; e3++) E[256 + i2++] = n2;
            for (t2 = 0; t2 <= g; t2++) s2[t2] = 0;
            for (e3 = 0; e3 <= 143; ) z[2 * e3 + 1] = 8, e3++, s2[8]++;
            for (; e3 <= 255; ) z[2 * e3 + 1] = 9, e3++, s2[9]++;
            for (; e3 <= 279; ) z[2 * e3 + 1] = 7, e3++, s2[7]++;
            for (; e3 <= 287; ) z[2 * e3 + 1] = 8, e3++, s2[8]++;
            for (Z(z, l + 1, s2), e3 = 0; e3 < f; e3++) C[2 * e3 + 1] = 5, C[2 * e3] = j(e3, 5);
            O = new D(z, w, u + 1, l, g), B = new D(C, k, 0, f, g), R = new D(new Array(0), x, 0, c, p);
          })(), q = true), e2.l_desc = new F(e2.dyn_ltree, O), e2.d_desc = new F(e2.dyn_dtree, B), e2.bl_desc = new F(e2.bl_tree, R), e2.bi_buf = 0, e2.bi_valid = 0, W(e2);
        }, r._tr_stored_block = J, r._tr_flush_block = function(e2, t2, r2, n2) {
          var i2, s2, a2 = 0;
          0 < e2.level ? (2 === e2.strm.data_type && (e2.strm.data_type = (function(e3) {
            var t3, r3 = 4093624447;
            for (t3 = 0; t3 <= 31; t3++, r3 >>>= 1) if (1 & r3 && 0 !== e3.dyn_ltree[2 * t3]) return o;
            if (0 !== e3.dyn_ltree[18] || 0 !== e3.dyn_ltree[20] || 0 !== e3.dyn_ltree[26]) return h;
            for (t3 = 32; t3 < u; t3++) if (0 !== e3.dyn_ltree[2 * t3]) return h;
            return o;
          })(e2)), Y(e2, e2.l_desc), Y(e2, e2.d_desc), a2 = (function(e3) {
            var t3;
            for (X(e3, e3.dyn_ltree, e3.l_desc.max_code), X(e3, e3.dyn_dtree, e3.d_desc.max_code), Y(e3, e3.bl_desc), t3 = c - 1; 3 <= t3 && 0 === e3.bl_tree[2 * S[t3] + 1]; t3--) ;
            return e3.opt_len += 3 * (t3 + 1) + 5 + 5 + 4, t3;
          })(e2), i2 = e2.opt_len + 3 + 7 >>> 3, (s2 = e2.static_len + 3 + 7 >>> 3) <= i2 && (i2 = s2)) : i2 = s2 = r2 + 5, r2 + 4 <= i2 && -1 !== t2 ? J(e2, t2, r2, n2) : 4 === e2.strategy || s2 === i2 ? (P(e2, 2 + (n2 ? 1 : 0), 3), K(e2, z, C)) : (P(e2, 4 + (n2 ? 1 : 0), 3), (function(e3, t3, r3, n3) {
            var i3;
            for (P(e3, t3 - 257, 5), P(e3, r3 - 1, 5), P(e3, n3 - 4, 4), i3 = 0; i3 < n3; i3++) P(e3, e3.bl_tree[2 * S[i3] + 1], 3);
            V(e3, e3.dyn_ltree, t3 - 1), V(e3, e3.dyn_dtree, r3 - 1);
          })(e2, e2.l_desc.max_code + 1, e2.d_desc.max_code + 1, a2 + 1), K(e2, e2.dyn_ltree, e2.dyn_dtree)), W(e2), n2 && M(e2);
        }, r._tr_tally = function(e2, t2, r2) {
          return e2.pending_buf[e2.d_buf + 2 * e2.last_lit] = t2 >>> 8 & 255, e2.pending_buf[e2.d_buf + 2 * e2.last_lit + 1] = 255 & t2, e2.pending_buf[e2.l_buf + e2.last_lit] = 255 & r2, e2.last_lit++, 0 === t2 ? e2.dyn_ltree[2 * r2]++ : (e2.matches++, t2--, e2.dyn_ltree[2 * (A[r2] + u + 1)]++, e2.dyn_dtree[2 * N(t2)]++), e2.last_lit === e2.lit_bufsize - 1;
        }, r._tr_align = function(e2) {
          P(e2, 2, 3), L(e2, m, z), (function(e3) {
            16 === e3.bi_valid ? (U(e3, e3.bi_buf), e3.bi_buf = 0, e3.bi_valid = 0) : 8 <= e3.bi_valid && (e3.pending_buf[e3.pending++] = 255 & e3.bi_buf, e3.bi_buf >>= 8, e3.bi_valid -= 8);
          })(e2);
        };
      }, { "../utils/common": 41 }], 53: [function(e, t, r) {
        "use strict";
        t.exports = function() {
          this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
        };
      }, {}], 54: [function(e, t, r) {
        (function(e2) {
          !(function(r2, n) {
            "use strict";
            if (!r2.setImmediate) {
              var i, s, t2, a, o = 1, h = {}, u = false, l = r2.document, e3 = Object.getPrototypeOf && Object.getPrototypeOf(r2);
              e3 = e3 && e3.setTimeout ? e3 : r2, i = "[object process]" === {}.toString.call(r2.process) ? function(e4) {
                process.nextTick(function() {
                  c(e4);
                });
              } : (function() {
                if (r2.postMessage && !r2.importScripts) {
                  var e4 = true, t3 = r2.onmessage;
                  return r2.onmessage = function() {
                    e4 = false;
                  }, r2.postMessage("", "*"), r2.onmessage = t3, e4;
                }
              })() ? (a = "setImmediate$" + Math.random() + "$", r2.addEventListener ? r2.addEventListener("message", d, false) : r2.attachEvent("onmessage", d), function(e4) {
                r2.postMessage(a + e4, "*");
              }) : r2.MessageChannel ? ((t2 = new MessageChannel()).port1.onmessage = function(e4) {
                c(e4.data);
              }, function(e4) {
                t2.port2.postMessage(e4);
              }) : l && "onreadystatechange" in l.createElement("script") ? (s = l.documentElement, function(e4) {
                var t3 = l.createElement("script");
                t3.onreadystatechange = function() {
                  c(e4), t3.onreadystatechange = null, s.removeChild(t3), t3 = null;
                }, s.appendChild(t3);
              }) : function(e4) {
                setTimeout(c, 0, e4);
              }, e3.setImmediate = function(e4) {
                "function" != typeof e4 && (e4 = new Function("" + e4));
                for (var t3 = new Array(arguments.length - 1), r3 = 0; r3 < t3.length; r3++) t3[r3] = arguments[r3 + 1];
                var n2 = { callback: e4, args: t3 };
                return h[o] = n2, i(o), o++;
              }, e3.clearImmediate = f;
            }
            function f(e4) {
              delete h[e4];
            }
            function c(e4) {
              if (u) setTimeout(c, 0, e4);
              else {
                var t3 = h[e4];
                if (t3) {
                  u = true;
                  try {
                    !(function(e5) {
                      var t4 = e5.callback, r3 = e5.args;
                      switch (r3.length) {
                        case 0:
                          t4();
                          break;
                        case 1:
                          t4(r3[0]);
                          break;
                        case 2:
                          t4(r3[0], r3[1]);
                          break;
                        case 3:
                          t4(r3[0], r3[1], r3[2]);
                          break;
                        default:
                          t4.apply(n, r3);
                      }
                    })(t3);
                  } finally {
                    f(e4), u = false;
                  }
                }
              }
            }
            function d(e4) {
              e4.source === r2 && "string" == typeof e4.data && 0 === e4.data.indexOf(a) && c(+e4.data.slice(a.length));
            }
          })("undefined" == typeof self ? void 0 === e2 ? this : e2 : self);
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
      }, {}] }, {}, [10])(10);
    });
  }
});

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => TbpediaUpdatePlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian2 = require("obsidian");

// src/update-service.ts
var import_jszip = __toESM(require_jszip_min());
var import_obsidian = require("obsidian");

// src/types.ts
var MANIFEST_BASE_URL = "https://raw.githubusercontent.com/tbspedia/tbpedia-update/main/manifests";
var WORKER_URL = "https://cfupdate.tbpedia.org";
var SUPPORTED_LANGUAGES = ["en", "ja", "fr", "es", "de", "nl", "sv", "ko", "zh-TW", "zh-CN", "vi", "id", "th", "bo"];
var MANAGED_ROOTS = [
  "00 \u8AAA\u660E",
  "01 \u6587\u96C6\u90E8",
  "02 \u958B\u793A\u90E8",
  "03 \u7D93\u85CF\u90E8",
  "04 \u980C\u8207\u6212\u5F8B",
  "05 \u50B3\u6CD5\u90E8",
  "06 \u5BC6\u6CD5\u5100\u8ECC",
  "07 \u4F5B\u8A9E\u5178\u85CF",
  "08 \u5176\u4ED6\u985E\u5225",
  "09 \u84EE\u9999\u4E0A\u5E2B",
  "10 \u771F\u4F5B\u5B97",
  "20 \u5C08\u984C",
  "50 \u5217\u8868",
  "60 \u5C0E\u8B80",
  "70 \u80CC\u666F\u8CC7\u6599",
  "90 \u5E6B\u52A9",
  "98 \u4E0B\u8F09\u8CC7\u6599",
  "99 Setting"
];

// src/path-policy.ts
var RESERVED = /^(con|prn|aux|nul|com[1-9]|lpt[1-9])(\..*)?$/i;
var OBSIDIAN_FILES = /* @__PURE__ */ new Set([
  ".obsidian/app.json",
  ".obsidian/appearance.json",
  ".obsidian/community-plugins.json",
  ".obsidian/hotkeys.json",
  ".obsidian/workspace.json",
  ".obsidian/workspace-mobile.json"
]);
function normalizePath(value) {
  return value.normalize("NFC").replace(/\\/g, "/").replace(/\/+/g, "/").replace(/^\.\//, "");
}
function assertManagedPath(value, installRoot) {
  const path = normalizePath(value);
  if (!path || path.includes("\0") || path.startsWith("/") || /^[A-Za-z]:/.test(path)) throw new Error(`Unsafe path: ${value}`);
  const segments = path.split("/");
  if (segments.some((segment) => !segment || segment === "." || segment === ".." || /[<>:"|?*]/.test(segment) || RESERVED.test(segment))) {
    throw new Error(`Unsafe path: ${value}`);
  }
  if (path.startsWith(`${installRoot}/`)) {
    const child = path.slice(installRoot.length + 1).split("/")[0];
    if (!MANAGED_ROOTS.includes(child)) throw new Error(`Path is outside managed roots: ${value}`);
    return path;
  }
  if (OBSIDIAN_FILES.has(path) || !path.includes("/") && !path.startsWith(".")) return path;
  throw new Error(`Path is outside the managed boundary: ${value}`);
}
function ensureNoPathConflicts(paths) {
  const sorted = [...paths].sort();
  for (let i = 1; i < sorted.length; i += 1) {
    if (sorted[i].startsWith(`${sorted[i - 1]}/`)) throw new Error(`File/directory path conflict: ${sorted[i - 1]}`);
  }
}

// src/manifest.ts
var REQUIRED_STRING_FIELDS = ["title", "minimumPluginVersion", "minimumObsidianVersion"];
function parseAndValidateManifest(input) {
  if (!isRecord(input)) throw new Error("Release manifest must be a JSON object.");
  for (const forbidden of ["signature", "payload", "collectionKey", "sha256", "size", "downloadUrl", "url"]) {
    if (forbidden in input) throw new Error(`Manifest contains unsupported field: ${forbidden}.`);
  }
  if (input.schemaVersion !== 2 || input.product !== "Tbpedia-Distribute" || input.plugin !== "tbpedia-update") throw new Error("This is not a supported incremental Tbpedia release manifest.");
  if (input.channel !== "stable") throw new Error("Only the stable release channel is supported.");
  for (const field of REQUIRED_STRING_FIELDS) if (typeof input[field] !== "string" || !input[field].trim()) throw new Error(`Manifest field ${field} is invalid.`);
  if (!isRecord(input.collection) || !isCollectionPart(input.collection.language, "code") || !isCollectionPart(input.collection.series, "id") || !isCollectionPart(input.collection.edition, "id") || typeof input.collection.installRoot !== "string") throw new Error("Collection identity is invalid.");
  const collection = input.collection;
  const expectedRoot = [collection.language.folder, collection.series.folder, collection.edition.folder].join("/");
  if (normalizePath(collection.installRoot) !== normalizePath(expectedRoot)) throw new Error("installRoot does not match collection folders.");
  if (!Array.isArray(input.managedRoots) || !sameSet(input.managedRoots, [...MANAGED_ROOTS])) throw new Error("managedRoots does not match the approved boundary.");
  if (!Array.isArray(input.releases) || input.releases.length === 0) throw new Error("releases must be a non-empty array.");
  const releases = input.releases.map((entry) => parseRelease(entry, normalizePath(collection.installRoot)));
  const ids = /* @__PURE__ */ new Set();
  for (let index = 0; index < releases.length; index += 1) {
    const release = releases[index];
    if (ids.has(release.releaseId)) throw new Error(`Duplicate releaseId: ${release.releaseId}.`);
    ids.add(release.releaseId);
    if (index > 0 && compareRelease(releases[index - 1], release) >= 0) throw new Error("releases must be in strictly increasing version and publication order.");
  }
  return { ...input, releases };
}
function parseRelease(input, installRoot) {
  if (!isRecord(input)) throw new Error("Each release must be an object.");
  for (const field of ["releaseVersion", "releaseId", "publishedAt", "filename"]) if (typeof input[field] !== "string" || !input[field].trim()) throw new Error(`Release field ${field} is invalid.`);
  const versionDate = parseVersionDate(input.releaseVersion);
  if (!versionDate) throw new Error("releaseVersion must be a date-based version.");
  const releaseId = parseReleaseId(input.releaseId);
  if (!releaseId) throw new Error("releaseId must have the format YYYY-M-D.sequence, for example 2026-10-1.1.");
  if (releaseId.year !== versionDate.year || releaseId.month !== versionDate.month || releaseId.day !== versionDate.day) throw new Error("releaseId date must match releaseVersion.");
  if (Number.isNaN(Date.parse(input.publishedAt))) throw new Error("publishedAt must be ISO-8601.");
  if (!Array.isArray(input.files) || !Array.isArray(input.deletions)) throw new Error("files and deletions must be arrays.");
  const files = input.files.map((entry) => {
    if (!isRecord(entry) || typeof entry.path !== "string") throw new Error("Each file entry needs a path.");
    return { path: assertManagedPath(entry.path, installRoot) };
  });
  const deletions = input.deletions.map((path) => {
    if (typeof path !== "string") throw new Error("Each deletion must be a path.");
    return assertManagedPath(path, installRoot);
  });
  const allPaths = [...files.map((file) => file.path), ...deletions];
  if (new Set(allPaths).size !== allPaths.length) throw new Error(`Release ${input.releaseId} contains duplicate or conflicting paths.`);
  if (!isRecord(input.releaseNotes) || typeof input.releaseNotes.summary !== "string" || !["added", "updated", "removed"].every((key) => typeof input.releaseNotes[key] === "number" && input.releaseNotes[key] >= 0)) throw new Error("releaseNotes is invalid.");
  return { releaseVersion: input.releaseVersion, releaseId: input.releaseId, publishedAt: input.publishedAt, filename: input.filename, files, deletions, releaseNotes: input.releaseNotes };
}
function compareVersions(a, b) {
  const parse = (value) => value.replace(/^v/, "").split(/[.+-]/).slice(0, 3).map((part) => Number.parseInt(part, 10) || 0);
  const left = parse(a);
  const right = parse(b);
  for (let index = 0; index < 3; index += 1) if (left[index] !== right[index]) return left[index] - right[index];
  return 0;
}
function compareRelease(a, b) {
  const version = compareVersions(a.releaseVersion, b.releaseVersion);
  if (version) return version;
  const sequence = parseReleaseId(a.releaseId).sequence - parseReleaseId(b.releaseId).sequence;
  return sequence || Date.parse(a.publishedAt) - Date.parse(b.publishedAt);
}
function parseVersionDate(value) {
  const match = /^(\d{4})\.(\d{1,2})\.(\d{1,2})(?:[-+][0-9A-Za-z.-]+)?$/.exec(value);
  return match && validDate(Number(match[1]), Number(match[2]), Number(match[3])) ? { year: Number(match[1]), month: Number(match[2]), day: Number(match[3]) } : void 0;
}
function parseReleaseId(value) {
  const match = /^(\d{4})-(\d{1,2})-(\d{1,2})\.(\d+)$/.exec(value);
  if (!match) return void 0;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const sequence = Number(match[4]);
  return validDate(year, month, day) && Number.isSafeInteger(sequence) && sequence >= 1 ? { year, month, day, sequence } : void 0;
}
function validDate(year, month, day) {
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}
function isCollectionPart(value, identity) {
  return isRecord(value) && typeof value[identity] === "string" && typeof value.name === "string" && typeof value.folder === "string";
}
function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function sameSet(values, expected) {
  return values.length === expected.length && new Set(values).size === values.length && values.every((value) => typeof value === "string" && expected.includes(value));
}

// src/update-service.ts
var STAGING_DIR = ".obsidian/plugins/tbpedia-update/.staging";
var MAX_ARCHIVE_BYTES = 1024 * 1024 * 1024;
var MAX_FILES = 3e4;
var MAX_UNCOMPRESSED_BYTES = 4 * 1024 * 1024 * 1024;
var UpdateService = class {
  constructor(app, pluginVersion, getData, saveData) {
    this.app = app;
    this.pluginVersion = pluginVersion;
    this.getData = getData;
    this.saveData = saveData;
  }
  async check() {
    const language = this.getData().languageCode;
    if (!language) throw new Error("Choose this vault\u2019s Tbpedia language in the plugin settings first.");
    const manifest = await this.fetchManifest(language);
    if (manifest.collection.language.code !== language) throw new Error("The selected language does not match this release manifest.");
    this.assertCompatible(manifest);
    const releases = this.missingReleases(manifest);
    return releases.length ? { manifest, releases } : null;
  }
  async install(batch, progress) {
    this.assertCompatible(batch.manifest);
    for (let index = 0; index < batch.releases.length; index += 1) {
      const release = batch.releases[index];
      progress(`Release ${index + 1} of ${batch.releases.length}: ${release.releaseVersion}`);
      await this.installRelease(batch.manifest, release, progress);
    }
    new import_obsidian.Notice(`Tbpedia updated through ${batch.releases.at(-1).releaseVersion}.`);
  }
  async installRelease(manifest, release, progress) {
    let transaction;
    let committed = false;
    try {
      progress("Creating update transaction\u2026");
      transaction = await this.createTransaction(manifest, release);
      progress("Discovering update sources\u2026");
      const sources = await this.getSources(manifest, release, transaction);
      if (!sources.length) throw new Error("No enabled update source is available.");
      const ranked = await this.rankSources(sources, transaction, progress);
      if (!ranked.length) throw new Error("All update sources failed their health check.");
      let archive;
      let lastError;
      for (const source of ranked) {
        try {
          progress(`Downloading from ${source.name}\u2026`);
          archive = await this.downloadPackage(source, transaction, release.filename);
          break;
        } catch (error) {
          lastError = error;
        }
      }
      if (!archive) throw lastError instanceof Error ? lastError : new Error("All update sources failed.");
      progress("Validating release archive\u2026");
      const stagingPath = `${STAGING_DIR}/${transaction.id}/package.zip`;
      await writeBinary(this.app.vault.adapter, stagingPath, archive);
      archive = await this.app.vault.adapter.readBinary(stagingPath);
      const plan = await this.validateArchive(archive, manifest, release);
      progress("Applying managed files\u2026");
      await this.apply(plan, archive, progress);
      committed = true;
      try {
        await this.report(transaction, "success");
      } catch {
        new import_obsidian.Notice("Tbpedia was updated, but the service could not record the success audit.");
      }
    } catch (error) {
      if (transaction && !committed) await this.report(transaction, "failed").catch(() => void 0);
      throw error;
    } finally {
      if (transaction) await removeTree(this.app.vault.adapter, `${STAGING_DIR}/${transaction.id}`).catch(() => void 0);
    }
  }
  missingReleases(manifest) {
    const installed = this.getData().installed;
    const installedIndex = installed.releaseId ? manifest.releases.findIndex((release) => release.releaseId === installed.releaseId) : -1;
    if (installedIndex >= 0) return manifest.releases.slice(installedIndex + 1);
    if (!installed.releaseVersion) return manifest.releases;
    return manifest.releases.filter((release) => compareVersions(release.releaseVersion, installed.releaseVersion) > 0);
  }
  async fetchManifest(language) {
    const response = await (0, import_obsidian.requestUrl)({ url: `${MANIFEST_BASE_URL}/${language.toLowerCase()}/latest.json`, method: "GET", throw: false });
    if (response.status !== 200) throw new Error(`Could not retrieve release metadata (HTTP ${response.status}).`);
    let json;
    try {
      json = response.json;
    } catch {
      throw new Error("Release metadata is not valid JSON.");
    }
    return parseAndValidateManifest(json);
  }
  assertCompatible(manifest) {
    if (compareVersions(this.pluginVersion, manifest.minimumPluginVersion) < 0) throw new Error(`This release requires plugin ${manifest.minimumPluginVersion} or newer.`);
    const appVersion = this.appVersion();
    if (appVersion && compareVersions(appVersion, manifest.minimumObsidianVersion) < 0) throw new Error(`This release requires Obsidian ${manifest.minimumObsidianVersion} or newer.`);
  }
  async createTransaction(manifest, release) {
    const response = await this.api("/updates/transactions", "POST", {
      title: manifest.title,
      version: release.releaseVersion,
      filename: release.filename,
      language: manifest.collection.language.code,
      series: manifest.collection.series.id,
      edition: manifest.collection.edition.id,
      device_type: import_obsidian.Platform.isMobile ? "mobile" : "desktop",
      os: navigator.platform,
      client_version: `${this.appVersion() ?? "unknown"}; plugin/${this.pluginVersion}`,
      user_agent: navigator.userAgent
    });
    if (typeof response.id !== "string" || typeof response.token !== "string") throw new Error("Update service returned an invalid transaction.");
    return { id: response.id, token: response.token };
  }
  async getSources(manifest, release, transaction) {
    const query = new URLSearchParams({ language: manifest.collection.language.code, series: manifest.collection.series.id, edition: manifest.collection.edition.id, title: manifest.title, version: release.releaseVersion, filename: release.filename });
    const response = await this.api(`/updates/sources?${query}`, "GET", void 0, transaction);
    if (!Array.isArray(response.sources)) throw new Error("Update service returned an invalid source list.");
    return response.sources.filter(isSource);
  }
  async rankSources(sources, transaction, progress) {
    progress("Testing update sources\u2026");
    const probes = await Promise.all(sources.slice(0, 8).map(async (source) => ({ source, result: await this.probe(source, transaction) })));
    return probes.filter((item) => item.result.healthy && typeof item.result.latencyMs === "number").sort((a, b) => score(a.source, a.result) - score(b.source, b.result)).map((item) => item.source);
  }
  async probe(source, transaction) {
    try {
      const response = await this.api(`/updates/sources/${encodeURIComponent(source.sourceId)}/probe`, "POST", {}, transaction);
      return { sourceId: source.sourceId, healthy: response.healthy === true, latencyMs: asNumber(response.latencyMs), bytes: asNumber(response.bytes), error: asString(response.error) };
    } catch {
      return { sourceId: source.sourceId, healthy: false };
    }
  }
  async downloadPackage(source, transaction, filename) {
    const response = await fetch(`${WORKER_URL}/updates/package`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeaders(transaction) },
      body: JSON.stringify({ sourceId: source.sourceId, filename })
    });
    if (!response.ok || !response.body) throw new Error(`Download failed from ${source.name} (HTTP ${response.status}).`);
    const reader = response.body.getReader();
    const chunks = [];
    let total = 0;
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > MAX_ARCHIVE_BYTES) {
        await reader.cancel();
        throw new Error("Release archive exceeds the configured size limit.");
      }
      chunks.push(value);
    }
    const archive = new Uint8Array(total);
    let offset = 0;
    for (const chunk of chunks) {
      archive.set(chunk, offset);
      offset += chunk.byteLength;
    }
    return archive.buffer;
  }
  async validateArchive(archive, manifest, release) {
    const zip = await import_jszip.default.loadAsync(archive, { createFolders: false, checkCRC32: false });
    const expected = new Set(release.files.map((file) => file.path));
    const actual = [];
    let totalUncompressed = 0;
    for (const entry of Object.values(zip.files)) {
      const entryName = entry.dir ? entry.name.replace(/\/$/, "") : entry.name;
      if (entryName) assertManagedPath(entryName, normalizePath(manifest.collection.installRoot));
      if (entry.dir) continue;
      if (++actual.length > MAX_FILES) throw new Error("Release archive has too many files.");
      const path = assertManagedPath(entry.name, normalizePath(manifest.collection.installRoot));
      actual.push(path);
      const size = zipEntrySize(entry);
      if (size === void 0) throw new Error("Release archive has an entry with no size metadata.");
      totalUncompressed += size;
      if (totalUncompressed > MAX_UNCOMPRESSED_BYTES) throw new Error("Release archive exceeds the configured extracted-size limit.");
    }
    if (new Set(actual).size !== actual.length) throw new Error("Release archive contains colliding paths.");
    ensureNoPathConflicts(actual);
    if (actual.length !== expected.size || actual.some((path) => !expected.has(path))) throw new Error("Release archive does not exactly match the manifest inventory.");
    return { manifest, release, writes: actual, deletions: release.deletions };
  }
  async apply(plan, archive, progress) {
    const adapter = this.app.vault.adapter;
    const previous = this.getData().installed;
    const owned = new Set(previous.ownedFiles);
    const deletions = [...new Set(plan.deletions)];
    for (const path of plan.writes) {
      await assertNoReparsePoints(this.app, path);
      if (await adapter.exists(path)) {
        if ((await adapter.stat(path))?.type === "folder") throw new Error(`Refusing to replace a local folder: ${path}`);
        if (!owned.has(path)) throw new Error(`Refusing to overwrite unmanaged local file: ${path}`);
      }
    }
    for (const path of deletions) {
      await assertNoReparsePoints(this.app, path);
      if (!owned.has(path)) throw new Error(`Refusing to delete a file not owned by the prior release: ${path}`);
    }
    const transactionDir = `${STAGING_DIR}/${crypto.randomUUID()}`;
    const backupDir = `${transactionDir}/backup`;
    const journalPath = `${transactionDir}/transaction.json`;
    await mkdirp(adapter, backupDir);
    const targets = [.../* @__PURE__ */ new Set([...plan.writes, ...deletions])];
    const originals = [];
    for (const path of targets) {
      const existed = await adapter.exists(path);
      originals.push({ path, existed });
      if (existed) await writeBinary(adapter, `${backupDir}/${encodeURIComponent(path)}`, await adapter.readBinary(path));
    }
    await adapter.write(journalPath, JSON.stringify({ originals }));
    try {
      const zip = await import_jszip.default.loadAsync(archive, { createFolders: false, checkCRC32: false });
      for (const path of deletions) if (await adapter.exists(path)) await adapter.remove(path);
      for (const path of plan.writes) {
        progress(`Writing ${path}\u2026`);
        await mkdirp(adapter, parent(path));
        const entry = zip.file(path);
        if (!entry) throw new Error(`Archive entry disappeared: ${path}`);
        await writeBinary(adapter, path, await entry.async("uint8array"));
      }
      const nextOwned = new Set(previous.ownedFiles);
      for (const path of deletions) nextOwned.delete(path);
      for (const path of plan.writes) nextOwned.add(path);
      await this.saveData({ installed: {
        releaseVersion: plan.release.releaseVersion,
        releaseId: plan.release.releaseId,
        appliedReleaseIds: [.../* @__PURE__ */ new Set([...previous.appliedReleaseIds ?? [], plan.release.releaseId])],
        ownedFiles: [...nextOwned].sort()
      } });
      await removeTree(adapter, transactionDir);
    } catch (error) {
      await this.rollback(adapter, originals, backupDir);
      throw error;
    }
  }
  async rollback(adapter, originals, backupDir) {
    for (const original of originals.reverse()) {
      if (original.existed) await writeBinary(adapter, original.path, await adapter.readBinary(`${backupDir}/${encodeURIComponent(original.path)}`));
      else if (await adapter.exists(original.path)) await adapter.remove(original.path);
    }
  }
  async report(transaction, status) {
    await this.api(`/updates/transactions/${encodeURIComponent(transaction.id)}/result`, "POST", { status }, transaction);
  }
  async api(path, method, body, transaction) {
    const response = await fetch(`${WORKER_URL}${path}`, { method, headers: { ...body ? { "Content-Type": "application/json" } : {}, ...transaction ? authHeaders(transaction) : {} }, body: body ? JSON.stringify(body) : void 0 });
    const json = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(typeof json.error === "string" ? json.error : `Update service request failed (HTTP ${response.status}).`);
    return json;
  }
  appVersion() {
    const app = this.app;
    const globalApp = globalThis.app;
    const candidates = [app.version, app.appVersion, globalApp?.version, globalApp?.appVersion, app.vault.getConfig?.("appVersion")];
    return candidates.find((value) => typeof value === "string" && /^\d+\.\d+\.\d+/.test(value));
  }
};
function authHeaders(transaction) {
  return { "X-Update-Transaction": transaction.id, "Authorization": `Bearer ${transaction.token}` };
}
function isSource(value) {
  return typeof value === "object" && value !== null && typeof value.sourceId === "string" && typeof value.name === "string" && typeof value.priority === "number" && typeof value.supportsRange === "boolean";
}
function score(source, probe) {
  return (probe.latencyMs ?? 6e4) + source.priority * 25 - (probe.bytes ?? 0) / 4096;
}
function asNumber(value) {
  return typeof value === "number" && Number.isFinite(value) ? value : void 0;
}
function asString(value) {
  return typeof value === "string" ? value : void 0;
}
function zipEntrySize(entry) {
  const size = entry._data?.uncompressedSize;
  return typeof size === "number" && Number.isSafeInteger(size) && size >= 0 ? size : void 0;
}
function parent(path) {
  const index = path.lastIndexOf("/");
  return index === -1 ? "" : path.slice(0, index);
}
async function mkdirp(adapter, path) {
  if (!path) return;
  let current = "";
  for (const segment of path.split("/")) {
    current = current ? `${current}/${segment}` : segment;
    if (!await adapter.exists(current)) await adapter.mkdir(current);
  }
}
async function writeBinary(adapter, path, data) {
  const copy = new Uint8Array(data instanceof Uint8Array ? data : new Uint8Array(data));
  await mkdirp(adapter, parent(path));
  await adapter.writeBinary(path, copy.buffer);
}
async function removeTree(adapter, path) {
  if (await adapter.exists(path)) await adapter.rmdir(path, true);
}
async function assertNoReparsePoints(app, vaultPath) {
  const basePath = app.vault.adapter.getBasePath?.();
  const requireFn = globalThis.require;
  if (!basePath || !requireFn) return;
  const fs = requireFn("fs/promises");
  let current = basePath;
  for (const segment of vaultPath.split("/")) {
    current = `${current}/${segment}`;
    try {
      if ((await fs.lstat(current)).isSymbolicLink()) throw new Error(`Refusing to traverse a link or reparse point: ${vaultPath}`);
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
  }
}

// src/main.ts
var DEFAULT_DATA = { installed: { ownedFiles: [], appliedReleaseIds: [] } };
var TbpediaUpdatePlugin = class extends import_obsidian2.Plugin {
  data = DEFAULT_DATA;
  updater;
  async onload() {
    const saved = await this.loadData() ?? {};
    this.data = { ...DEFAULT_DATA, ...saved, installed: { ownedFiles: [], appliedReleaseIds: [], ...saved.installed } };
    this.updater = new UpdateService(this.app, this.manifest.version, () => this.data, async (data) => {
      this.data = data;
      await this.saveData(data);
    });
    this.addSettingTab(new TbpediaUpdateSettingsTab(this.app, this));
    this.addRibbonIcon("download", "Check Tbpedia updates", () => void this.checkForUpdate());
    this.addCommand({ id: "check-for-content-update", name: "Check for content update", callback: () => void this.checkForUpdate() });
  }
  async checkForUpdate() {
    try {
      const manifest = await this.updater.check();
      if (!manifest) {
        new import_obsidian2.Notice("Your Tbpedia content is up to date.");
        return;
      }
      new UpdateModal(this.app, manifest, (progress) => this.updater.install(manifest, progress)).open();
    } catch (error) {
      new import_obsidian2.Notice(`Could not check for Tbpedia updates: ${message(error)}`);
    }
  }
  async setLanguageCode(languageCode) {
    this.data = { ...this.data, languageCode };
    await this.saveData(this.data);
  }
  get languageCode() {
    return this.data.languageCode;
  }
};
var TbpediaUpdateSettingsTab = class extends import_obsidian2.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: "Tbpedia Update" });
    new import_obsidian2.Setting(containerEl).setName("Vault language").setDesc("Select the language of this installed Tbpedia collection. It determines which release history is used.").addDropdown((dropdown) => {
      dropdown.addOption("", "Choose language\u2026");
      for (const code of SUPPORTED_LANGUAGES) dropdown.addOption(code, code);
      dropdown.setValue(this.plugin.languageCode ?? "");
      dropdown.onChange(async (value) => {
        await this.plugin.setLanguageCode(value);
      });
    });
  }
};
var UpdateModal = class extends import_obsidian2.Modal {
  constructor(app, batch, install) {
    super(app);
    this.batch = batch;
    this.install = install;
  }
  onOpen() {
    const { contentEl } = this;
    const first = this.batch.releases[0];
    const last = this.batch.releases.at(-1);
    contentEl.createEl("h2", { text: `Install ${this.batch.releases.length} Tbpedia release${this.batch.releases.length === 1 ? "" : "s"}` });
    contentEl.createEl("p", { text: `${first.releaseVersion} \u2192 ${last.releaseVersion}` });
    const list = contentEl.createEl("ul");
    for (const release of this.batch.releases) list.createEl("li", { text: `${release.releaseVersion} \u2014 ${release.releaseNotes.summary}` });
    const status = contentEl.createEl("p");
    new import_obsidian2.Setting(contentEl).addButton((button) => button.setButtonText("Cancel").onClick(() => this.close())).addButton((button) => button.setCta().setButtonText("Update now").onClick(async () => {
      button.setDisabled(true);
      status.setText("Starting update\u2026");
      try {
        await this.install((text) => status.setText(text));
        this.close();
      } catch (error) {
        status.setText(`Update failed: ${message(error)}`);
        button.setDisabled(false);
      }
    }));
  }
  onClose() {
    this.contentEl.empty();
  }
};
function message(error) {
  return error instanceof Error ? error.message : "Unknown error";
}
/*! Bundled license information:

jszip/dist/jszip.min.js:
  (*!
  
  JSZip v3.10.2 - A JavaScript class for generating and reading zip files
  <http://stuartk.com/jszip>
  
  (c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
  Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/main/LICENSE.markdown.
  
  JSZip uses the library pako released under the MIT license :
  https://github.com/nodeca/pako/blob/main/LICENSE
  *)
*/
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibm9kZV9tb2R1bGVzLy5wbnBtL2pzemlwQDMuMTAuMi9ub2RlX21vZHVsZXMvanN6aXAvZGlzdC9qc3ppcC5taW4uanMiLCAic3JjL21haW4udHMiLCAic3JjL3VwZGF0ZS1zZXJ2aWNlLnRzIiwgInNyYy90eXBlcy50cyIsICJzcmMvcGF0aC1wb2xpY3kudHMiLCAic3JjL21hbmlmZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvKiFcblxuSlNaaXAgdjMuMTAuMiAtIEEgSmF2YVNjcmlwdCBjbGFzcyBmb3IgZ2VuZXJhdGluZyBhbmQgcmVhZGluZyB6aXAgZmlsZXNcbjxodHRwOi8vc3R1YXJ0ay5jb20vanN6aXA+XG5cbihjKSAyMDA5LTIwMTYgU3R1YXJ0IEtuaWdodGxleSA8c3R1YXJ0IFthdF0gc3R1YXJ0ay5jb20+XG5EdWFsIGxpY2VuY2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBvciBHUEx2My4gU2VlIGh0dHBzOi8vcmF3LmdpdGh1Yi5jb20vU3R1ay9qc3ppcC9tYWluL0xJQ0VOU0UubWFya2Rvd24uXG5cbkpTWmlwIHVzZXMgdGhlIGxpYnJhcnkgcGFrbyByZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgOlxuaHR0cHM6Ly9naXRodWIuY29tL25vZGVjYS9wYWtvL2Jsb2IvbWFpbi9MSUNFTlNFXG4qL1xuXG4hZnVuY3Rpb24oZSl7aWYoXCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBtb2R1bGUpbW9kdWxlLmV4cG9ydHM9ZSgpO2Vsc2UgaWYoXCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kKWRlZmluZShbXSxlKTtlbHNleyhcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P3dpbmRvdzpcInVuZGVmaW5lZFwiIT10eXBlb2YgZ2xvYmFsP2dsb2JhbDpcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZj9zZWxmOnRoaXMpLkpTWmlwPWUoKX19KGZ1bmN0aW9uKCl7cmV0dXJuIGZ1bmN0aW9uIHMoYSxvLGgpe2Z1bmN0aW9uIHUocixlKXtpZighb1tyXSl7aWYoIWFbcl0pe3ZhciB0PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWUmJnQpcmV0dXJuIHQociwhMCk7aWYobClyZXR1cm4gbChyLCEwKTt2YXIgbj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK3IrXCInXCIpO3Rocm93IG4uY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixufXZhciBpPW9bcl09e2V4cG9ydHM6e319O2Fbcl1bMF0uY2FsbChpLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIHQ9YVtyXVsxXVtlXTtyZXR1cm4gdSh0fHxlKX0saSxpLmV4cG9ydHMscyxhLG8saCl9cmV0dXJuIG9bcl0uZXhwb3J0c31mb3IodmFyIGw9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxlPTA7ZTxoLmxlbmd0aDtlKyspdShoW2VdKTtyZXR1cm4gdX0oezE6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt2YXIgZD1lKFwiLi91dGlsc1wiKSxjPWUoXCIuL3N1cHBvcnRcIikscD1cIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky89XCI7ci5lbmNvZGU9ZnVuY3Rpb24oZSl7Zm9yKHZhciB0LHIsbixpLHMsYSxvLGg9W10sdT0wLGw9ZS5sZW5ndGgsZj1sLGM9XCJzdHJpbmdcIiE9PWQuZ2V0VHlwZU9mKGUpO3U8ZS5sZW5ndGg7KWY9bC11LG49Yz8odD1lW3UrK10scj11PGw/ZVt1KytdOjAsdTxsP2VbdSsrXTowKToodD1lLmNoYXJDb2RlQXQodSsrKSxyPXU8bD9lLmNoYXJDb2RlQXQodSsrKTowLHU8bD9lLmNoYXJDb2RlQXQodSsrKTowKSxpPXQ+PjIscz0oMyZ0KTw8NHxyPj40LGE9MTxmPygxNSZyKTw8MnxuPj42OjY0LG89MjxmPzYzJm46NjQsaC5wdXNoKHAuY2hhckF0KGkpK3AuY2hhckF0KHMpK3AuY2hhckF0KGEpK3AuY2hhckF0KG8pKTtyZXR1cm4gaC5qb2luKFwiXCIpfSxyLmRlY29kZT1mdW5jdGlvbihlKXt2YXIgdCxyLG4saSxzLGEsbz0wLGg9MCx1PVwiZGF0YTpcIjtpZihlLnN1YnN0cigwLHUubGVuZ3RoKT09PXUpdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBiYXNlNjQgaW5wdXQsIGl0IGxvb2tzIGxpa2UgYSBkYXRhIHVybC5cIik7dmFyIGwsZj0zKihlPWUucmVwbGFjZSgvW15BLVphLXowLTkrLz1dL2csXCJcIikpLmxlbmd0aC80O2lmKGUuY2hhckF0KGUubGVuZ3RoLTEpPT09cC5jaGFyQXQoNjQpJiZmLS0sZS5jaGFyQXQoZS5sZW5ndGgtMik9PT1wLmNoYXJBdCg2NCkmJmYtLSxmJTEhPTApdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBiYXNlNjQgaW5wdXQsIGJhZCBjb250ZW50IGxlbmd0aC5cIik7Zm9yKGw9Yy51aW50OGFycmF5P25ldyBVaW50OEFycmF5KDB8Zik6bmV3IEFycmF5KDB8Zik7bzxlLmxlbmd0aDspdD1wLmluZGV4T2YoZS5jaGFyQXQobysrKSk8PDJ8KGk9cC5pbmRleE9mKGUuY2hhckF0KG8rKykpKT4+NCxyPSgxNSZpKTw8NHwocz1wLmluZGV4T2YoZS5jaGFyQXQobysrKSkpPj4yLG49KDMmcyk8PDZ8KGE9cC5pbmRleE9mKGUuY2hhckF0KG8rKykpKSxsW2grK109dCw2NCE9PXMmJihsW2grK109ciksNjQhPT1hJiYobFtoKytdPW4pO3JldHVybiBsfX0se1wiLi9zdXBwb3J0XCI6MzAsXCIuL3V0aWxzXCI6MzJ9XSwyOltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7dmFyIG49ZShcIi4vZXh0ZXJuYWxcIiksaT1lKFwiLi9zdHJlYW0vRGF0YVdvcmtlclwiKSxzPWUoXCIuL3N0cmVhbS9DcmMzMlByb2JlXCIpLGE9ZShcIi4vc3RyZWFtL0RhdGFMZW5ndGhQcm9iZVwiKTtmdW5jdGlvbiBvKGUsdCxyLG4saSl7dGhpcy5jb21wcmVzc2VkU2l6ZT1lLHRoaXMudW5jb21wcmVzc2VkU2l6ZT10LHRoaXMuY3JjMzI9cix0aGlzLmNvbXByZXNzaW9uPW4sdGhpcy5jb21wcmVzc2VkQ29udGVudD1pfW8ucHJvdG90eXBlPXtnZXRDb250ZW50V29ya2VyOmZ1bmN0aW9uKCl7dmFyIGU9bmV3IGkobi5Qcm9taXNlLnJlc29sdmUodGhpcy5jb21wcmVzc2VkQ29udGVudCkpLnBpcGUodGhpcy5jb21wcmVzc2lvbi51bmNvbXByZXNzV29ya2VyKCkpLnBpcGUobmV3IGEoXCJkYXRhX2xlbmd0aFwiKSksdD10aGlzO3JldHVybiBlLm9uKFwiZW5kXCIsZnVuY3Rpb24oKXtpZih0aGlzLnN0cmVhbUluZm8uZGF0YV9sZW5ndGghPT10LnVuY29tcHJlc3NlZFNpemUpdGhyb3cgbmV3IEVycm9yKFwiQnVnIDogdW5jb21wcmVzc2VkIGRhdGEgc2l6ZSBtaXNtYXRjaFwiKX0pLGV9LGdldENvbXByZXNzZWRXb3JrZXI6ZnVuY3Rpb24oKXtyZXR1cm4gbmV3IGkobi5Qcm9taXNlLnJlc29sdmUodGhpcy5jb21wcmVzc2VkQ29udGVudCkpLndpdGhTdHJlYW1JbmZvKFwiY29tcHJlc3NlZFNpemVcIix0aGlzLmNvbXByZXNzZWRTaXplKS53aXRoU3RyZWFtSW5mbyhcInVuY29tcHJlc3NlZFNpemVcIix0aGlzLnVuY29tcHJlc3NlZFNpemUpLndpdGhTdHJlYW1JbmZvKFwiY3JjMzJcIix0aGlzLmNyYzMyKS53aXRoU3RyZWFtSW5mbyhcImNvbXByZXNzaW9uXCIsdGhpcy5jb21wcmVzc2lvbil9fSxvLmNyZWF0ZVdvcmtlckZyb209ZnVuY3Rpb24oZSx0LHIpe3JldHVybiBlLnBpcGUobmV3IHMpLnBpcGUobmV3IGEoXCJ1bmNvbXByZXNzZWRTaXplXCIpKS5waXBlKHQuY29tcHJlc3NXb3JrZXIocikpLnBpcGUobmV3IGEoXCJjb21wcmVzc2VkU2l6ZVwiKSkud2l0aFN0cmVhbUluZm8oXCJjb21wcmVzc2lvblwiLHQpfSx0LmV4cG9ydHM9b30se1wiLi9leHRlcm5hbFwiOjYsXCIuL3N0cmVhbS9DcmMzMlByb2JlXCI6MjUsXCIuL3N0cmVhbS9EYXRhTGVuZ3RoUHJvYmVcIjoyNixcIi4vc3RyZWFtL0RhdGFXb3JrZXJcIjoyN31dLDM6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt2YXIgbj1lKFwiLi9zdHJlYW0vR2VuZXJpY1dvcmtlclwiKTtyLlNUT1JFPXttYWdpYzpcIlxcMFxcMFwiLGNvbXByZXNzV29ya2VyOmZ1bmN0aW9uKCl7cmV0dXJuIG5ldyBuKFwiU1RPUkUgY29tcHJlc3Npb25cIil9LHVuY29tcHJlc3NXb3JrZXI6ZnVuY3Rpb24oKXtyZXR1cm4gbmV3IG4oXCJTVE9SRSBkZWNvbXByZXNzaW9uXCIpfX0sci5ERUZMQVRFPWUoXCIuL2ZsYXRlXCIpfSx7XCIuL2ZsYXRlXCI6NyxcIi4vc3RyZWFtL0dlbmVyaWNXb3JrZXJcIjoyOH1dLDQ6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt2YXIgbj1lKFwiLi91dGlsc1wiKTt2YXIgbz1mdW5jdGlvbigpe2Zvcih2YXIgZSx0PVtdLHI9MDtyPDI1NjtyKyspe2U9cjtmb3IodmFyIG49MDtuPDg7bisrKWU9MSZlPzM5ODgyOTIzODReZT4+PjE6ZT4+PjE7dFtyXT1lfXJldHVybiB0fSgpO3QuZXhwb3J0cz1mdW5jdGlvbihlLHQpe3JldHVybiB2b2lkIDAhPT1lJiZlLmxlbmd0aD9cInN0cmluZ1wiIT09bi5nZXRUeXBlT2YoZSk/ZnVuY3Rpb24oZSx0LHIsbil7dmFyIGk9byxzPW4rcjtlXj0tMTtmb3IodmFyIGE9bjthPHM7YSsrKWU9ZT4+PjheaVsyNTUmKGVedFthXSldO3JldHVybi0xXmV9KDB8dCxlLGUubGVuZ3RoLDApOmZ1bmN0aW9uKGUsdCxyLG4pe3ZhciBpPW8scz1uK3I7ZV49LTE7Zm9yKHZhciBhPW47YTxzO2ErKyllPWU+Pj44XmlbMjU1JihlXnQuY2hhckNvZGVBdChhKSldO3JldHVybi0xXmV9KDB8dCxlLGUubGVuZ3RoLDApOjB9fSx7XCIuL3V0aWxzXCI6MzJ9XSw1OltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7ci5iYXNlNjQ9ITEsci5iaW5hcnk9ITEsci5kaXI9ITEsci5jcmVhdGVGb2xkZXJzPSEwLHIuZGF0ZT1udWxsLHIuY29tcHJlc3Npb249bnVsbCxyLmNvbXByZXNzaW9uT3B0aW9ucz1udWxsLHIuY29tbWVudD1udWxsLHIudW5peFBlcm1pc3Npb25zPW51bGwsci5kb3NQZXJtaXNzaW9ucz1udWxsfSx7fV0sNjpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3ZhciBuPW51bGw7bj1cInVuZGVmaW5lZFwiIT10eXBlb2YgUHJvbWlzZT9Qcm9taXNlOmUoXCJsaWVcIiksdC5leHBvcnRzPXtQcm9taXNlOm59fSx7bGllOjM3fV0sNzpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3ZhciBuPVwidW5kZWZpbmVkXCIhPXR5cGVvZiBVaW50OEFycmF5JiZcInVuZGVmaW5lZFwiIT10eXBlb2YgVWludDE2QXJyYXkmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBVaW50MzJBcnJheSxpPWUoXCJwYWtvXCIpLHM9ZShcIi4vdXRpbHNcIiksYT1lKFwiLi9zdHJlYW0vR2VuZXJpY1dvcmtlclwiKSxvPW4/XCJ1aW50OGFycmF5XCI6XCJhcnJheVwiO2Z1bmN0aW9uIGgoZSx0KXthLmNhbGwodGhpcyxcIkZsYXRlV29ya2VyL1wiK2UpLHRoaXMuX3Bha289bnVsbCx0aGlzLl9wYWtvQWN0aW9uPWUsdGhpcy5fcGFrb09wdGlvbnM9dCx0aGlzLm1ldGE9e319ci5tYWdpYz1cIlxcYlxcMFwiLHMuaW5oZXJpdHMoaCxhKSxoLnByb3RvdHlwZS5wcm9jZXNzQ2h1bms9ZnVuY3Rpb24oZSl7dGhpcy5tZXRhPWUubWV0YSxudWxsPT09dGhpcy5fcGFrbyYmdGhpcy5fY3JlYXRlUGFrbygpLHRoaXMuX3Bha28ucHVzaChzLnRyYW5zZm9ybVRvKG8sZS5kYXRhKSwhMSl9LGgucHJvdG90eXBlLmZsdXNoPWZ1bmN0aW9uKCl7YS5wcm90b3R5cGUuZmx1c2guY2FsbCh0aGlzKSxudWxsPT09dGhpcy5fcGFrbyYmdGhpcy5fY3JlYXRlUGFrbygpLHRoaXMuX3Bha28ucHVzaChbXSwhMCl9LGgucHJvdG90eXBlLmNsZWFuVXA9ZnVuY3Rpb24oKXthLnByb3RvdHlwZS5jbGVhblVwLmNhbGwodGhpcyksdGhpcy5fcGFrbz1udWxsfSxoLnByb3RvdHlwZS5fY3JlYXRlUGFrbz1mdW5jdGlvbigpe3RoaXMuX3Bha289bmV3IGlbdGhpcy5fcGFrb0FjdGlvbl0oe3JhdzohMCxsZXZlbDp0aGlzLl9wYWtvT3B0aW9ucy5sZXZlbHx8LTF9KTt2YXIgdD10aGlzO3RoaXMuX3Bha28ub25EYXRhPWZ1bmN0aW9uKGUpe3QucHVzaCh7ZGF0YTplLG1ldGE6dC5tZXRhfSl9fSxyLmNvbXByZXNzV29ya2VyPWZ1bmN0aW9uKGUpe3JldHVybiBuZXcgaChcIkRlZmxhdGVcIixlKX0sci51bmNvbXByZXNzV29ya2VyPWZ1bmN0aW9uKCl7cmV0dXJuIG5ldyBoKFwiSW5mbGF0ZVwiLHt9KX19LHtcIi4vc3RyZWFtL0dlbmVyaWNXb3JrZXJcIjoyOCxcIi4vdXRpbHNcIjozMixwYWtvOjM4fV0sODpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIEEoZSx0KXt2YXIgcixuPVwiXCI7Zm9yKHI9MDtyPHQ7cisrKW4rPVN0cmluZy5mcm9tQ2hhckNvZGUoMjU1JmUpLGU+Pj49ODtyZXR1cm4gbn1mdW5jdGlvbiBuKGUsdCxyLG4saSxzKXt2YXIgYSxvLGg9ZS5maWxlLHU9ZS5jb21wcmVzc2lvbixsPXMhPT1PLnV0ZjhlbmNvZGUsZj1JLnRyYW5zZm9ybVRvKFwic3RyaW5nXCIscyhoLm5hbWUpKSxjPUkudHJhbnNmb3JtVG8oXCJzdHJpbmdcIixPLnV0ZjhlbmNvZGUoaC5uYW1lKSksZD1oLmNvbW1lbnQscD1JLnRyYW5zZm9ybVRvKFwic3RyaW5nXCIscyhkKSksbT1JLnRyYW5zZm9ybVRvKFwic3RyaW5nXCIsTy51dGY4ZW5jb2RlKGQpKSxfPWMubGVuZ3RoIT09aC5uYW1lLmxlbmd0aCxnPW0ubGVuZ3RoIT09ZC5sZW5ndGgsYj1cIlwiLHY9XCJcIix5PVwiXCIsdz1oLmRpcixrPWguZGF0ZSx4PXtjcmMzMjowLGNvbXByZXNzZWRTaXplOjAsdW5jb21wcmVzc2VkU2l6ZTowfTt0JiYhcnx8KHguY3JjMzI9ZS5jcmMzMix4LmNvbXByZXNzZWRTaXplPWUuY29tcHJlc3NlZFNpemUseC51bmNvbXByZXNzZWRTaXplPWUudW5jb21wcmVzc2VkU2l6ZSk7dmFyIFM9MDt0JiYoU3w9OCksbHx8IV8mJiFnfHwoU3w9MjA0OCk7dmFyIHo9MCxDPTA7dyYmKHp8PTE2KSxcIlVOSVhcIj09PWk/KEM9Nzk4LHp8PWZ1bmN0aW9uKGUsdCl7dmFyIHI9ZTtyZXR1cm4gZXx8KHI9dD8xNjg5MzozMzIwNCksKDY1NTM1JnIpPDwxNn0oaC51bml4UGVybWlzc2lvbnMsdykpOihDPTIwLHp8PWZ1bmN0aW9uKGUpe3JldHVybiA2MyYoZXx8MCl9KGguZG9zUGVybWlzc2lvbnMpKSxhPWsuZ2V0VVRDSG91cnMoKSxhPDw9NixhfD1rLmdldFVUQ01pbnV0ZXMoKSxhPDw9NSxhfD1rLmdldFVUQ1NlY29uZHMoKS8yLG89ay5nZXRVVENGdWxsWWVhcigpLTE5ODAsbzw8PTQsb3w9ay5nZXRVVENNb250aCgpKzEsbzw8PTUsb3w9ay5nZXRVVENEYXRlKCksXyYmKHY9QSgxLDEpK0EoQihmKSw0KStjLGIrPVwidXBcIitBKHYubGVuZ3RoLDIpK3YpLGcmJih5PUEoMSwxKStBKEIocCksNCkrbSxiKz1cInVjXCIrQSh5Lmxlbmd0aCwyKSt5KTt2YXIgRT1cIlwiO3JldHVybiBFKz1cIlxcblxcMFwiLEUrPUEoUywyKSxFKz11Lm1hZ2ljLEUrPUEoYSwyKSxFKz1BKG8sMiksRSs9QSh4LmNyYzMyLDQpLEUrPUEoeC5jb21wcmVzc2VkU2l6ZSw0KSxFKz1BKHgudW5jb21wcmVzc2VkU2l6ZSw0KSxFKz1BKGYubGVuZ3RoLDIpLEUrPUEoYi5sZW5ndGgsMikse2ZpbGVSZWNvcmQ6Ui5MT0NBTF9GSUxFX0hFQURFUitFK2YrYixkaXJSZWNvcmQ6Ui5DRU5UUkFMX0ZJTEVfSEVBREVSK0EoQywyKStFK0EocC5sZW5ndGgsMikrXCJcXDBcXDBcXDBcXDBcIitBKHosNCkrQShuLDQpK2YrYitwfX12YXIgST1lKFwiLi4vdXRpbHNcIiksaT1lKFwiLi4vc3RyZWFtL0dlbmVyaWNXb3JrZXJcIiksTz1lKFwiLi4vdXRmOFwiKSxCPWUoXCIuLi9jcmMzMlwiKSxSPWUoXCIuLi9zaWduYXR1cmVcIik7ZnVuY3Rpb24gcyhlLHQscixuKXtpLmNhbGwodGhpcyxcIlppcEZpbGVXb3JrZXJcIiksdGhpcy5ieXRlc1dyaXR0ZW49MCx0aGlzLnppcENvbW1lbnQ9dCx0aGlzLnppcFBsYXRmb3JtPXIsdGhpcy5lbmNvZGVGaWxlTmFtZT1uLHRoaXMuc3RyZWFtRmlsZXM9ZSx0aGlzLmFjY3VtdWxhdGU9ITEsdGhpcy5jb250ZW50QnVmZmVyPVtdLHRoaXMuZGlyUmVjb3Jkcz1bXSx0aGlzLmN1cnJlbnRTb3VyY2VPZmZzZXQ9MCx0aGlzLmVudHJpZXNDb3VudD0wLHRoaXMuY3VycmVudEZpbGU9bnVsbCx0aGlzLl9zb3VyY2VzPVtdfUkuaW5oZXJpdHMocyxpKSxzLnByb3RvdHlwZS5wdXNoPWZ1bmN0aW9uKGUpe3ZhciB0PWUubWV0YS5wZXJjZW50fHwwLHI9dGhpcy5lbnRyaWVzQ291bnQsbj10aGlzLl9zb3VyY2VzLmxlbmd0aDt0aGlzLmFjY3VtdWxhdGU/dGhpcy5jb250ZW50QnVmZmVyLnB1c2goZSk6KHRoaXMuYnl0ZXNXcml0dGVuKz1lLmRhdGEubGVuZ3RoLGkucHJvdG90eXBlLnB1c2guY2FsbCh0aGlzLHtkYXRhOmUuZGF0YSxtZXRhOntjdXJyZW50RmlsZTp0aGlzLmN1cnJlbnRGaWxlLHBlcmNlbnQ6cj8odCsxMDAqKHItbi0xKSkvcjoxMDB9fSkpfSxzLnByb3RvdHlwZS5vcGVuZWRTb3VyY2U9ZnVuY3Rpb24oZSl7dGhpcy5jdXJyZW50U291cmNlT2Zmc2V0PXRoaXMuYnl0ZXNXcml0dGVuLHRoaXMuY3VycmVudEZpbGU9ZS5maWxlLm5hbWU7dmFyIHQ9dGhpcy5zdHJlYW1GaWxlcyYmIWUuZmlsZS5kaXI7aWYodCl7dmFyIHI9bihlLHQsITEsdGhpcy5jdXJyZW50U291cmNlT2Zmc2V0LHRoaXMuemlwUGxhdGZvcm0sdGhpcy5lbmNvZGVGaWxlTmFtZSk7dGhpcy5wdXNoKHtkYXRhOnIuZmlsZVJlY29yZCxtZXRhOntwZXJjZW50OjB9fSl9ZWxzZSB0aGlzLmFjY3VtdWxhdGU9ITB9LHMucHJvdG90eXBlLmNsb3NlZFNvdXJjZT1mdW5jdGlvbihlKXt0aGlzLmFjY3VtdWxhdGU9ITE7dmFyIHQ9dGhpcy5zdHJlYW1GaWxlcyYmIWUuZmlsZS5kaXIscj1uKGUsdCwhMCx0aGlzLmN1cnJlbnRTb3VyY2VPZmZzZXQsdGhpcy56aXBQbGF0Zm9ybSx0aGlzLmVuY29kZUZpbGVOYW1lKTtpZih0aGlzLmRpclJlY29yZHMucHVzaChyLmRpclJlY29yZCksdCl0aGlzLnB1c2goe2RhdGE6ZnVuY3Rpb24oZSl7cmV0dXJuIFIuREFUQV9ERVNDUklQVE9SK0EoZS5jcmMzMiw0KStBKGUuY29tcHJlc3NlZFNpemUsNCkrQShlLnVuY29tcHJlc3NlZFNpemUsNCl9KGUpLG1ldGE6e3BlcmNlbnQ6MTAwfX0pO2Vsc2UgZm9yKHRoaXMucHVzaCh7ZGF0YTpyLmZpbGVSZWNvcmQsbWV0YTp7cGVyY2VudDowfX0pO3RoaXMuY29udGVudEJ1ZmZlci5sZW5ndGg7KXRoaXMucHVzaCh0aGlzLmNvbnRlbnRCdWZmZXIuc2hpZnQoKSk7dGhpcy5jdXJyZW50RmlsZT1udWxsfSxzLnByb3RvdHlwZS5mbHVzaD1mdW5jdGlvbigpe2Zvcih2YXIgZT10aGlzLmJ5dGVzV3JpdHRlbix0PTA7dDx0aGlzLmRpclJlY29yZHMubGVuZ3RoO3QrKyl0aGlzLnB1c2goe2RhdGE6dGhpcy5kaXJSZWNvcmRzW3RdLG1ldGE6e3BlcmNlbnQ6MTAwfX0pO3ZhciByPXRoaXMuYnl0ZXNXcml0dGVuLWUsbj1mdW5jdGlvbihlLHQscixuLGkpe3ZhciBzPUkudHJhbnNmb3JtVG8oXCJzdHJpbmdcIixpKG4pKTtyZXR1cm4gUi5DRU5UUkFMX0RJUkVDVE9SWV9FTkQrXCJcXDBcXDBcXDBcXDBcIitBKGUsMikrQShlLDIpK0EodCw0KStBKHIsNCkrQShzLmxlbmd0aCwyKStzfSh0aGlzLmRpclJlY29yZHMubGVuZ3RoLHIsZSx0aGlzLnppcENvbW1lbnQsdGhpcy5lbmNvZGVGaWxlTmFtZSk7dGhpcy5wdXNoKHtkYXRhOm4sbWV0YTp7cGVyY2VudDoxMDB9fSl9LHMucHJvdG90eXBlLnByZXBhcmVOZXh0U291cmNlPWZ1bmN0aW9uKCl7dGhpcy5wcmV2aW91cz10aGlzLl9zb3VyY2VzLnNoaWZ0KCksdGhpcy5vcGVuZWRTb3VyY2UodGhpcy5wcmV2aW91cy5zdHJlYW1JbmZvKSx0aGlzLmlzUGF1c2VkP3RoaXMucHJldmlvdXMucGF1c2UoKTp0aGlzLnByZXZpb3VzLnJlc3VtZSgpfSxzLnByb3RvdHlwZS5yZWdpc3RlclByZXZpb3VzPWZ1bmN0aW9uKGUpe3RoaXMuX3NvdXJjZXMucHVzaChlKTt2YXIgdD10aGlzO3JldHVybiBlLm9uKFwiZGF0YVwiLGZ1bmN0aW9uKGUpe3QucHJvY2Vzc0NodW5rKGUpfSksZS5vbihcImVuZFwiLGZ1bmN0aW9uKCl7dC5jbG9zZWRTb3VyY2UodC5wcmV2aW91cy5zdHJlYW1JbmZvKSx0Ll9zb3VyY2VzLmxlbmd0aD90LnByZXBhcmVOZXh0U291cmNlKCk6dC5lbmQoKX0pLGUub24oXCJlcnJvclwiLGZ1bmN0aW9uKGUpe3QuZXJyb3IoZSl9KSx0aGlzfSxzLnByb3RvdHlwZS5yZXN1bWU9ZnVuY3Rpb24oKXtyZXR1cm4hIWkucHJvdG90eXBlLnJlc3VtZS5jYWxsKHRoaXMpJiYoIXRoaXMucHJldmlvdXMmJnRoaXMuX3NvdXJjZXMubGVuZ3RoPyh0aGlzLnByZXBhcmVOZXh0U291cmNlKCksITApOnRoaXMucHJldmlvdXN8fHRoaXMuX3NvdXJjZXMubGVuZ3RofHx0aGlzLmdlbmVyYXRlZEVycm9yP3ZvaWQgMDoodGhpcy5lbmQoKSwhMCkpfSxzLnByb3RvdHlwZS5lcnJvcj1mdW5jdGlvbihlKXt2YXIgdD10aGlzLl9zb3VyY2VzO2lmKCFpLnByb3RvdHlwZS5lcnJvci5jYWxsKHRoaXMsZSkpcmV0dXJuITE7Zm9yKHZhciByPTA7cjx0Lmxlbmd0aDtyKyspdHJ5e3Rbcl0uZXJyb3IoZSl9Y2F0Y2goZSl7fXJldHVybiEwfSxzLnByb3RvdHlwZS5sb2NrPWZ1bmN0aW9uKCl7aS5wcm90b3R5cGUubG9jay5jYWxsKHRoaXMpO2Zvcih2YXIgZT10aGlzLl9zb3VyY2VzLHQ9MDt0PGUubGVuZ3RoO3QrKyllW3RdLmxvY2soKX0sdC5leHBvcnRzPXN9LHtcIi4uL2NyYzMyXCI6NCxcIi4uL3NpZ25hdHVyZVwiOjIzLFwiLi4vc3RyZWFtL0dlbmVyaWNXb3JrZXJcIjoyOCxcIi4uL3V0ZjhcIjozMSxcIi4uL3V0aWxzXCI6MzJ9XSw5OltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7dmFyIHU9ZShcIi4uL2NvbXByZXNzaW9uc1wiKSxuPWUoXCIuL1ppcEZpbGVXb3JrZXJcIik7ci5nZW5lcmF0ZVdvcmtlcj1mdW5jdGlvbihlLGEsdCl7dmFyIG89bmV3IG4oYS5zdHJlYW1GaWxlcyx0LGEucGxhdGZvcm0sYS5lbmNvZGVGaWxlTmFtZSksaD0wO3RyeXtlLmZvckVhY2goZnVuY3Rpb24oZSx0KXtoKys7dmFyIHI9ZnVuY3Rpb24oZSx0KXt2YXIgcj1lfHx0LG49dVtyXTtpZighbil0aHJvdyBuZXcgRXJyb3IocitcIiBpcyBub3QgYSB2YWxpZCBjb21wcmVzc2lvbiBtZXRob2QgIVwiKTtyZXR1cm4gbn0odC5vcHRpb25zLmNvbXByZXNzaW9uLGEuY29tcHJlc3Npb24pLG49dC5vcHRpb25zLmNvbXByZXNzaW9uT3B0aW9uc3x8YS5jb21wcmVzc2lvbk9wdGlvbnN8fHt9LGk9dC5kaXIscz10LmRhdGU7dC5fY29tcHJlc3NXb3JrZXIocixuKS53aXRoU3RyZWFtSW5mbyhcImZpbGVcIix7bmFtZTplLGRpcjppLGRhdGU6cyxjb21tZW50OnQuY29tbWVudHx8XCJcIix1bml4UGVybWlzc2lvbnM6dC51bml4UGVybWlzc2lvbnMsZG9zUGVybWlzc2lvbnM6dC5kb3NQZXJtaXNzaW9uc30pLnBpcGUobyl9KSxvLmVudHJpZXNDb3VudD1ofWNhdGNoKGUpe28uZXJyb3IoZSl9cmV0dXJuIG99fSx7XCIuLi9jb21wcmVzc2lvbnNcIjozLFwiLi9aaXBGaWxlV29ya2VyXCI6OH1dLDEwOltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gbigpe2lmKCEodGhpcyBpbnN0YW5jZW9mIG4pKXJldHVybiBuZXcgbjtpZihhcmd1bWVudHMubGVuZ3RoKXRocm93IG5ldyBFcnJvcihcIlRoZSBjb25zdHJ1Y3RvciB3aXRoIHBhcmFtZXRlcnMgaGFzIGJlZW4gcmVtb3ZlZCBpbiBKU1ppcCAzLjAsIHBsZWFzZSBjaGVjayB0aGUgdXBncmFkZSBndWlkZS5cIik7dGhpcy5maWxlcz1PYmplY3QuY3JlYXRlKG51bGwpLHRoaXMuY29tbWVudD1udWxsLHRoaXMucm9vdD1cIlwiLHRoaXMuY2xvbmU9ZnVuY3Rpb24oKXt2YXIgZT1uZXcgbjtmb3IodmFyIHQgaW4gdGhpcylcImZ1bmN0aW9uXCIhPXR5cGVvZiB0aGlzW3RdJiYoZVt0XT10aGlzW3RdKTtyZXR1cm4gZX19KG4ucHJvdG90eXBlPWUoXCIuL29iamVjdFwiKSkubG9hZEFzeW5jPWUoXCIuL2xvYWRcIiksbi5zdXBwb3J0PWUoXCIuL3N1cHBvcnRcIiksbi5kZWZhdWx0cz1lKFwiLi9kZWZhdWx0c1wiKSxuLnZlcnNpb249XCIzLjEwLjJcIixuLmxvYWRBc3luYz1mdW5jdGlvbihlLHQpe3JldHVybihuZXcgbikubG9hZEFzeW5jKGUsdCl9LG4uZXh0ZXJuYWw9ZShcIi4vZXh0ZXJuYWxcIiksdC5leHBvcnRzPW59LHtcIi4vZGVmYXVsdHNcIjo1LFwiLi9leHRlcm5hbFwiOjYsXCIuL2xvYWRcIjoxMSxcIi4vb2JqZWN0XCI6MTUsXCIuL3N1cHBvcnRcIjozMH1dLDExOltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7dmFyIHU9ZShcIi4vdXRpbHNcIiksaT1lKFwiLi9leHRlcm5hbFwiKSxuPWUoXCIuL3V0ZjhcIikscz1lKFwiLi96aXBFbnRyaWVzXCIpLGE9ZShcIi4vc3RyZWFtL0NyYzMyUHJvYmVcIiksbD1lKFwiLi9ub2RlanNVdGlsc1wiKTtmdW5jdGlvbiBmKG4pe3JldHVybiBuZXcgaS5Qcm9taXNlKGZ1bmN0aW9uKGUsdCl7dmFyIHI9bi5kZWNvbXByZXNzZWQuZ2V0Q29udGVudFdvcmtlcigpLnBpcGUobmV3IGEpO3Iub24oXCJlcnJvclwiLGZ1bmN0aW9uKGUpe3QoZSl9KS5vbihcImVuZFwiLGZ1bmN0aW9uKCl7ci5zdHJlYW1JbmZvLmNyYzMyIT09bi5kZWNvbXByZXNzZWQuY3JjMzI/dChuZXcgRXJyb3IoXCJDb3JydXB0ZWQgemlwIDogQ1JDMzIgbWlzbWF0Y2hcIikpOmUoKX0pLnJlc3VtZSgpfSl9dC5leHBvcnRzPWZ1bmN0aW9uKGUsbyl7dmFyIGg9dGhpcztyZXR1cm4gbz11LmV4dGVuZChvfHx7fSx7YmFzZTY0OiExLGNoZWNrQ1JDMzI6ITEsb3B0aW1pemVkQmluYXJ5U3RyaW5nOiExLGNyZWF0ZUZvbGRlcnM6ITEsZGVjb2RlRmlsZU5hbWU6bi51dGY4ZGVjb2RlfSksbC5pc05vZGUmJmwuaXNTdHJlYW0oZSk/aS5Qcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJKU1ppcCBjYW4ndCBhY2NlcHQgYSBzdHJlYW0gd2hlbiBsb2FkaW5nIGEgemlwIGZpbGUuXCIpKTp1LnByZXBhcmVDb250ZW50KFwidGhlIGxvYWRlZCB6aXAgZmlsZVwiLGUsITAsby5vcHRpbWl6ZWRCaW5hcnlTdHJpbmcsby5iYXNlNjQpLnRoZW4oZnVuY3Rpb24oZSl7dmFyIHQ9bmV3IHMobyk7cmV0dXJuIHQubG9hZChlKSx0fSkudGhlbihmdW5jdGlvbihlKXt2YXIgdD1baS5Qcm9taXNlLnJlc29sdmUoZSldLHI9ZS5maWxlcztpZihvLmNoZWNrQ1JDMzIpZm9yKHZhciBuPTA7bjxyLmxlbmd0aDtuKyspdC5wdXNoKGYocltuXSkpO3JldHVybiBpLlByb21pc2UuYWxsKHQpfSkudGhlbihmdW5jdGlvbihlKXtmb3IodmFyIHQ9ZS5zaGlmdCgpLHI9dC5maWxlcyxuPTA7bjxyLmxlbmd0aDtuKyspe3ZhciBpPXJbbl0scz1pLmZpbGVOYW1lU3RyLGE9dS5yZXNvbHZlKGkuZmlsZU5hbWVTdHIpO2guZmlsZShhLGkuZGVjb21wcmVzc2VkLHtiaW5hcnk6ITAsb3B0aW1pemVkQmluYXJ5U3RyaW5nOiEwLGRhdGU6aS5kYXRlLGRpcjppLmRpcixjb21tZW50OmkuZmlsZUNvbW1lbnRTdHIubGVuZ3RoP2kuZmlsZUNvbW1lbnRTdHI6bnVsbCx1bml4UGVybWlzc2lvbnM6aS51bml4UGVybWlzc2lvbnMsZG9zUGVybWlzc2lvbnM6aS5kb3NQZXJtaXNzaW9ucyxjcmVhdGVGb2xkZXJzOm8uY3JlYXRlRm9sZGVyc30pLGkuZGlyfHwoaC5maWxlKGEpLnVuc2FmZU9yaWdpbmFsTmFtZT1zKX1yZXR1cm4gdC56aXBDb21tZW50Lmxlbmd0aCYmKGguY29tbWVudD10LnppcENvbW1lbnQpLGh9KX19LHtcIi4vZXh0ZXJuYWxcIjo2LFwiLi9ub2RlanNVdGlsc1wiOjE0LFwiLi9zdHJlYW0vQ3JjMzJQcm9iZVwiOjI1LFwiLi91dGY4XCI6MzEsXCIuL3V0aWxzXCI6MzIsXCIuL3ppcEVudHJpZXNcIjozM31dLDEyOltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7dmFyIG49ZShcIi4uL3V0aWxzXCIpLGk9ZShcIi4uL3N0cmVhbS9HZW5lcmljV29ya2VyXCIpO2Z1bmN0aW9uIHMoZSx0KXtpLmNhbGwodGhpcyxcIk5vZGVqcyBzdHJlYW0gaW5wdXQgYWRhcHRlciBmb3IgXCIrZSksdGhpcy5fdXBzdHJlYW1FbmRlZD0hMSx0aGlzLl9iaW5kU3RyZWFtKHQpfW4uaW5oZXJpdHMocyxpKSxzLnByb3RvdHlwZS5fYmluZFN0cmVhbT1mdW5jdGlvbihlKXt2YXIgdD10aGlzOyh0aGlzLl9zdHJlYW09ZSkucGF1c2UoKSxlLm9uKFwiZGF0YVwiLGZ1bmN0aW9uKGUpe3QucHVzaCh7ZGF0YTplLG1ldGE6e3BlcmNlbnQ6MH19KX0pLm9uKFwiZXJyb3JcIixmdW5jdGlvbihlKXt0LmlzUGF1c2VkP3RoaXMuZ2VuZXJhdGVkRXJyb3I9ZTp0LmVycm9yKGUpfSkub24oXCJlbmRcIixmdW5jdGlvbigpe3QuaXNQYXVzZWQ/dC5fdXBzdHJlYW1FbmRlZD0hMDp0LmVuZCgpfSl9LHMucHJvdG90eXBlLnBhdXNlPWZ1bmN0aW9uKCl7cmV0dXJuISFpLnByb3RvdHlwZS5wYXVzZS5jYWxsKHRoaXMpJiYodGhpcy5fc3RyZWFtLnBhdXNlKCksITApfSxzLnByb3RvdHlwZS5yZXN1bWU9ZnVuY3Rpb24oKXtyZXR1cm4hIWkucHJvdG90eXBlLnJlc3VtZS5jYWxsKHRoaXMpJiYodGhpcy5fdXBzdHJlYW1FbmRlZD90aGlzLmVuZCgpOnRoaXMuX3N0cmVhbS5yZXN1bWUoKSwhMCl9LHQuZXhwb3J0cz1zfSx7XCIuLi9zdHJlYW0vR2VuZXJpY1dvcmtlclwiOjI4LFwiLi4vdXRpbHNcIjozMn1dLDEzOltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7dmFyIGk9ZShcInJlYWRhYmxlLXN0cmVhbVwiKS5SZWFkYWJsZTtmdW5jdGlvbiBuKGUsdCxyKXtpLmNhbGwodGhpcyx0KSx0aGlzLl9oZWxwZXI9ZTt2YXIgbj10aGlzO2Uub24oXCJkYXRhXCIsZnVuY3Rpb24oZSx0KXtuLnB1c2goZSl8fG4uX2hlbHBlci5wYXVzZSgpLHImJnIodCl9KS5vbihcImVycm9yXCIsZnVuY3Rpb24oZSl7bi5lbWl0KFwiZXJyb3JcIixlKX0pLm9uKFwiZW5kXCIsZnVuY3Rpb24oKXtuLnB1c2gobnVsbCl9KX1lKFwiLi4vdXRpbHNcIikuaW5oZXJpdHMobixpKSxuLnByb3RvdHlwZS5fcmVhZD1mdW5jdGlvbigpe3RoaXMuX2hlbHBlci5yZXN1bWUoKX0sdC5leHBvcnRzPW59LHtcIi4uL3V0aWxzXCI6MzIsXCJyZWFkYWJsZS1zdHJlYW1cIjoxNn1dLDE0OltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7dC5leHBvcnRzPXtpc05vZGU6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIEJ1ZmZlcixuZXdCdWZmZXJGcm9tOmZ1bmN0aW9uKGUsdCl7aWYoQnVmZmVyLmZyb20mJkJ1ZmZlci5mcm9tIT09VWludDhBcnJheS5mcm9tKXJldHVybiBCdWZmZXIuZnJvbShlLHQpO2lmKFwibnVtYmVyXCI9PXR5cGVvZiBlKXRocm93IG5ldyBFcnJvcignVGhlIFwiZGF0YVwiIGFyZ3VtZW50IG11c3Qgbm90IGJlIGEgbnVtYmVyJyk7cmV0dXJuIG5ldyBCdWZmZXIoZSx0KX0sYWxsb2NCdWZmZXI6ZnVuY3Rpb24oZSl7aWYoQnVmZmVyLmFsbG9jKXJldHVybiBCdWZmZXIuYWxsb2MoZSk7dmFyIHQ9bmV3IEJ1ZmZlcihlKTtyZXR1cm4gdC5maWxsKDApLHR9LGlzQnVmZmVyOmZ1bmN0aW9uKGUpe3JldHVybiBCdWZmZXIuaXNCdWZmZXIoZSl9LGlzU3RyZWFtOmZ1bmN0aW9uKGUpe3JldHVybiBlJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBlLm9uJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBlLnBhdXNlJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBlLnJlc3VtZX19fSx7fV0sMTU6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBzKGUsdCxyKXt2YXIgbixpPXUuZ2V0VHlwZU9mKHQpLHM9dS5leHRlbmQocnx8e30sZik7cy5kYXRlPXMuZGF0ZXx8bmV3IERhdGUsbnVsbCE9PXMuY29tcHJlc3Npb24mJihzLmNvbXByZXNzaW9uPXMuY29tcHJlc3Npb24udG9VcHBlckNhc2UoKSksXCJzdHJpbmdcIj09dHlwZW9mIHMudW5peFBlcm1pc3Npb25zJiYocy51bml4UGVybWlzc2lvbnM9cGFyc2VJbnQocy51bml4UGVybWlzc2lvbnMsOCkpLHMudW5peFBlcm1pc3Npb25zJiYxNjM4NCZzLnVuaXhQZXJtaXNzaW9ucyYmKHMuZGlyPSEwKSxzLmRvc1Blcm1pc3Npb25zJiYxNiZzLmRvc1Blcm1pc3Npb25zJiYocy5kaXI9ITApLHMuZGlyJiYoZT1nKGUpKSxzLmNyZWF0ZUZvbGRlcnMmJihuPV8oZSkpJiZiLmNhbGwodGhpcyxuLCEwKTt2YXIgYT1cInN0cmluZ1wiPT09aSYmITE9PT1zLmJpbmFyeSYmITE9PT1zLmJhc2U2NDtyJiZ2b2lkIDAhPT1yLmJpbmFyeXx8KHMuYmluYXJ5PSFhKSwodCBpbnN0YW5jZW9mIGMmJjA9PT10LnVuY29tcHJlc3NlZFNpemV8fHMuZGlyfHwhdHx8MD09PXQubGVuZ3RoKSYmKHMuYmFzZTY0PSExLHMuYmluYXJ5PSEwLHQ9XCJcIixzLmNvbXByZXNzaW9uPVwiU1RPUkVcIixpPVwic3RyaW5nXCIpO3ZhciBvPW51bGw7bz10IGluc3RhbmNlb2YgY3x8dCBpbnN0YW5jZW9mIGw/dDpwLmlzTm9kZSYmcC5pc1N0cmVhbSh0KT9uZXcgbShlLHQpOnUucHJlcGFyZUNvbnRlbnQoZSx0LHMuYmluYXJ5LHMub3B0aW1pemVkQmluYXJ5U3RyaW5nLHMuYmFzZTY0KTt2YXIgaD1uZXcgZChlLG8scyk7dGhpcy5maWxlc1tlXT1ofXZhciBpPWUoXCIuL3V0ZjhcIiksdT1lKFwiLi91dGlsc1wiKSxsPWUoXCIuL3N0cmVhbS9HZW5lcmljV29ya2VyXCIpLGE9ZShcIi4vc3RyZWFtL1N0cmVhbUhlbHBlclwiKSxmPWUoXCIuL2RlZmF1bHRzXCIpLGM9ZShcIi4vY29tcHJlc3NlZE9iamVjdFwiKSxkPWUoXCIuL3ppcE9iamVjdFwiKSxvPWUoXCIuL2dlbmVyYXRlXCIpLHA9ZShcIi4vbm9kZWpzVXRpbHNcIiksbT1lKFwiLi9ub2RlanMvTm9kZWpzU3RyZWFtSW5wdXRBZGFwdGVyXCIpLF89ZnVuY3Rpb24oZSl7XCIvXCI9PT1lLnNsaWNlKC0xKSYmKGU9ZS5zdWJzdHJpbmcoMCxlLmxlbmd0aC0xKSk7dmFyIHQ9ZS5sYXN0SW5kZXhPZihcIi9cIik7cmV0dXJuIDA8dD9lLnN1YnN0cmluZygwLHQpOlwiXCJ9LGc9ZnVuY3Rpb24oZSl7cmV0dXJuXCIvXCIhPT1lLnNsaWNlKC0xKSYmKGUrPVwiL1wiKSxlfSxiPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIHQ9dm9pZCAwIT09dD90OmYuY3JlYXRlRm9sZGVycyxlPWcoZSksdGhpcy5maWxlc1tlXXx8cy5jYWxsKHRoaXMsZSxudWxsLHtkaXI6ITAsY3JlYXRlRm9sZGVyczp0fSksdGhpcy5maWxlc1tlXX07ZnVuY3Rpb24gaChlKXtyZXR1cm5cIltvYmplY3QgUmVnRXhwXVwiPT09T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGUpfXZhciBuPXtsb2FkOmZ1bmN0aW9uKCl7dGhyb3cgbmV3IEVycm9yKFwiVGhpcyBtZXRob2QgaGFzIGJlZW4gcmVtb3ZlZCBpbiBKU1ppcCAzLjAsIHBsZWFzZSBjaGVjayB0aGUgdXBncmFkZSBndWlkZS5cIil9LGZvckVhY2g6ZnVuY3Rpb24oZSl7dmFyIHQscixuO2Zvcih0IGluIHRoaXMuZmlsZXMpbj10aGlzLmZpbGVzW3RdLChyPXQuc2xpY2UodGhpcy5yb290Lmxlbmd0aCx0Lmxlbmd0aCkpJiZ0LnNsaWNlKDAsdGhpcy5yb290Lmxlbmd0aCk9PT10aGlzLnJvb3QmJmUocixuKX0sZmlsdGVyOmZ1bmN0aW9uKHIpe3ZhciBuPVtdO3JldHVybiB0aGlzLmZvckVhY2goZnVuY3Rpb24oZSx0KXtyKGUsdCkmJm4ucHVzaCh0KX0pLG59LGZpbGU6ZnVuY3Rpb24oZSx0LHIpe2lmKDEhPT1hcmd1bWVudHMubGVuZ3RoKXJldHVybiBlPXRoaXMucm9vdCtlLHMuY2FsbCh0aGlzLGUsdCxyKSx0aGlzO2lmKGgoZSkpe3ZhciBuPWU7cmV0dXJuIHRoaXMuZmlsdGVyKGZ1bmN0aW9uKGUsdCl7cmV0dXJuIXQuZGlyJiZuLnRlc3QoZSl9KX12YXIgaT10aGlzLmZpbGVzW3RoaXMucm9vdCtlXTtyZXR1cm4gaSYmIWkuZGlyP2k6bnVsbH0sZm9sZGVyOmZ1bmN0aW9uKHIpe2lmKCFyKXJldHVybiB0aGlzO2lmKGgocikpcmV0dXJuIHRoaXMuZmlsdGVyKGZ1bmN0aW9uKGUsdCl7cmV0dXJuIHQuZGlyJiZyLnRlc3QoZSl9KTt2YXIgZT10aGlzLnJvb3Qrcix0PWIuY2FsbCh0aGlzLGUpLG49dGhpcy5jbG9uZSgpO3JldHVybiBuLnJvb3Q9dC5uYW1lLG59LHJlbW92ZTpmdW5jdGlvbihyKXtyPXRoaXMucm9vdCtyO3ZhciBlPXRoaXMuZmlsZXNbcl07aWYoZXx8KFwiL1wiIT09ci5zbGljZSgtMSkmJihyKz1cIi9cIiksZT10aGlzLmZpbGVzW3JdKSxlJiYhZS5kaXIpZGVsZXRlIHRoaXMuZmlsZXNbcl07ZWxzZSBmb3IodmFyIHQ9dGhpcy5maWx0ZXIoZnVuY3Rpb24oZSx0KXtyZXR1cm4gdC5uYW1lLnNsaWNlKDAsci5sZW5ndGgpPT09cn0pLG49MDtuPHQubGVuZ3RoO24rKylkZWxldGUgdGhpcy5maWxlc1t0W25dLm5hbWVdO3JldHVybiB0aGlzfSxnZW5lcmF0ZTpmdW5jdGlvbigpe3Rocm93IG5ldyBFcnJvcihcIlRoaXMgbWV0aG9kIGhhcyBiZWVuIHJlbW92ZWQgaW4gSlNaaXAgMy4wLCBwbGVhc2UgY2hlY2sgdGhlIHVwZ3JhZGUgZ3VpZGUuXCIpfSxnZW5lcmF0ZUludGVybmFsU3RyZWFtOmZ1bmN0aW9uKGUpe3ZhciB0LHI9e307dHJ5e2lmKChyPXUuZXh0ZW5kKGV8fHt9LHtzdHJlYW1GaWxlczohMSxjb21wcmVzc2lvbjpcIlNUT1JFXCIsY29tcHJlc3Npb25PcHRpb25zOm51bGwsdHlwZTpcIlwiLHBsYXRmb3JtOlwiRE9TXCIsY29tbWVudDpudWxsLG1pbWVUeXBlOlwiYXBwbGljYXRpb24vemlwXCIsZW5jb2RlRmlsZU5hbWU6aS51dGY4ZW5jb2RlfSkpLnR5cGU9ci50eXBlLnRvTG93ZXJDYXNlKCksci5jb21wcmVzc2lvbj1yLmNvbXByZXNzaW9uLnRvVXBwZXJDYXNlKCksXCJiaW5hcnlzdHJpbmdcIj09PXIudHlwZSYmKHIudHlwZT1cInN0cmluZ1wiKSwhci50eXBlKXRocm93IG5ldyBFcnJvcihcIk5vIG91dHB1dCB0eXBlIHNwZWNpZmllZC5cIik7dS5jaGVja1N1cHBvcnQoci50eXBlKSxcImRhcndpblwiIT09ci5wbGF0Zm9ybSYmXCJmcmVlYnNkXCIhPT1yLnBsYXRmb3JtJiZcImxpbnV4XCIhPT1yLnBsYXRmb3JtJiZcInN1bm9zXCIhPT1yLnBsYXRmb3JtfHwoci5wbGF0Zm9ybT1cIlVOSVhcIiksXCJ3aW4zMlwiPT09ci5wbGF0Zm9ybSYmKHIucGxhdGZvcm09XCJET1NcIik7dmFyIG49ci5jb21tZW50fHx0aGlzLmNvbW1lbnR8fFwiXCI7dD1vLmdlbmVyYXRlV29ya2VyKHRoaXMscixuKX1jYXRjaChlKXsodD1uZXcgbChcImVycm9yXCIpKS5lcnJvcihlKX1yZXR1cm4gbmV3IGEodCxyLnR5cGV8fFwic3RyaW5nXCIsci5taW1lVHlwZSl9LGdlbmVyYXRlQXN5bmM6ZnVuY3Rpb24oZSx0KXtyZXR1cm4gdGhpcy5nZW5lcmF0ZUludGVybmFsU3RyZWFtKGUpLmFjY3VtdWxhdGUodCl9LGdlbmVyYXRlTm9kZVN0cmVhbTpmdW5jdGlvbihlLHQpe3JldHVybihlPWV8fHt9KS50eXBlfHwoZS50eXBlPVwibm9kZWJ1ZmZlclwiKSx0aGlzLmdlbmVyYXRlSW50ZXJuYWxTdHJlYW0oZSkudG9Ob2RlanNTdHJlYW0odCl9fTt0LmV4cG9ydHM9bn0se1wiLi9jb21wcmVzc2VkT2JqZWN0XCI6MixcIi4vZGVmYXVsdHNcIjo1LFwiLi9nZW5lcmF0ZVwiOjksXCIuL25vZGVqcy9Ob2RlanNTdHJlYW1JbnB1dEFkYXB0ZXJcIjoxMixcIi4vbm9kZWpzVXRpbHNcIjoxNCxcIi4vc3RyZWFtL0dlbmVyaWNXb3JrZXJcIjoyOCxcIi4vc3RyZWFtL1N0cmVhbUhlbHBlclwiOjI5LFwiLi91dGY4XCI6MzEsXCIuL3V0aWxzXCI6MzIsXCIuL3ppcE9iamVjdFwiOjM1fV0sMTY6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt0LmV4cG9ydHM9ZShcInN0cmVhbVwiKX0se3N0cmVhbTp2b2lkIDB9XSwxNzpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3ZhciBuPWUoXCIuL0RhdGFSZWFkZXJcIik7ZnVuY3Rpb24gaShlKXtuLmNhbGwodGhpcyxlKTtmb3IodmFyIHQ9MDt0PHRoaXMuZGF0YS5sZW5ndGg7dCsrKWVbdF09MjU1JmVbdF19ZShcIi4uL3V0aWxzXCIpLmluaGVyaXRzKGksbiksaS5wcm90b3R5cGUuYnl0ZUF0PWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLmRhdGFbdGhpcy56ZXJvK2VdfSxpLnByb3RvdHlwZS5sYXN0SW5kZXhPZlNpZ25hdHVyZT1mdW5jdGlvbihlKXtmb3IodmFyIHQ9ZS5jaGFyQ29kZUF0KDApLHI9ZS5jaGFyQ29kZUF0KDEpLG49ZS5jaGFyQ29kZUF0KDIpLGk9ZS5jaGFyQ29kZUF0KDMpLHM9dGhpcy5sZW5ndGgtNDswPD1zOy0tcylpZih0aGlzLmRhdGFbc109PT10JiZ0aGlzLmRhdGFbcysxXT09PXImJnRoaXMuZGF0YVtzKzJdPT09biYmdGhpcy5kYXRhW3MrM109PT1pKXJldHVybiBzLXRoaXMuemVybztyZXR1cm4tMX0saS5wcm90b3R5cGUucmVhZEFuZENoZWNrU2lnbmF0dXJlPWZ1bmN0aW9uKGUpe3ZhciB0PWUuY2hhckNvZGVBdCgwKSxyPWUuY2hhckNvZGVBdCgxKSxuPWUuY2hhckNvZGVBdCgyKSxpPWUuY2hhckNvZGVBdCgzKSxzPXRoaXMucmVhZERhdGEoNCk7cmV0dXJuIHQ9PT1zWzBdJiZyPT09c1sxXSYmbj09PXNbMl0mJmk9PT1zWzNdfSxpLnByb3RvdHlwZS5yZWFkRGF0YT1mdW5jdGlvbihlKXtpZih0aGlzLmNoZWNrT2Zmc2V0KGUpLDA9PT1lKXJldHVybltdO3ZhciB0PXRoaXMuZGF0YS5zbGljZSh0aGlzLnplcm8rdGhpcy5pbmRleCx0aGlzLnplcm8rdGhpcy5pbmRleCtlKTtyZXR1cm4gdGhpcy5pbmRleCs9ZSx0fSx0LmV4cG9ydHM9aX0se1wiLi4vdXRpbHNcIjozMixcIi4vRGF0YVJlYWRlclwiOjE4fV0sMTg6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt2YXIgbj1lKFwiLi4vdXRpbHNcIik7ZnVuY3Rpb24gaShlKXt0aGlzLmRhdGE9ZSx0aGlzLmxlbmd0aD1lLmxlbmd0aCx0aGlzLmluZGV4PTAsdGhpcy56ZXJvPTB9aS5wcm90b3R5cGU9e2NoZWNrT2Zmc2V0OmZ1bmN0aW9uKGUpe3RoaXMuY2hlY2tJbmRleCh0aGlzLmluZGV4K2UpfSxjaGVja0luZGV4OmZ1bmN0aW9uKGUpe2lmKHRoaXMubGVuZ3RoPHRoaXMuemVybytlfHxlPDApdGhyb3cgbmV3IEVycm9yKFwiRW5kIG9mIGRhdGEgcmVhY2hlZCAoZGF0YSBsZW5ndGggPSBcIit0aGlzLmxlbmd0aCtcIiwgYXNrZWQgaW5kZXggPSBcIitlK1wiKS4gQ29ycnVwdGVkIHppcCA/XCIpfSxzZXRJbmRleDpmdW5jdGlvbihlKXt0aGlzLmNoZWNrSW5kZXgoZSksdGhpcy5pbmRleD1lfSxza2lwOmZ1bmN0aW9uKGUpe3RoaXMuc2V0SW5kZXgodGhpcy5pbmRleCtlKX0sYnl0ZUF0OmZ1bmN0aW9uKCl7fSxyZWFkSW50OmZ1bmN0aW9uKGUpe3ZhciB0LHI9MDtmb3IodGhpcy5jaGVja09mZnNldChlKSx0PXRoaXMuaW5kZXgrZS0xO3Q+PXRoaXMuaW5kZXg7dC0tKXI9KHI8PDgpK3RoaXMuYnl0ZUF0KHQpO3JldHVybiB0aGlzLmluZGV4Kz1lLHJ9LHJlYWRTdHJpbmc6ZnVuY3Rpb24oZSl7cmV0dXJuIG4udHJhbnNmb3JtVG8oXCJzdHJpbmdcIix0aGlzLnJlYWREYXRhKGUpKX0scmVhZERhdGE6ZnVuY3Rpb24oKXt9LGxhc3RJbmRleE9mU2lnbmF0dXJlOmZ1bmN0aW9uKCl7fSxyZWFkQW5kQ2hlY2tTaWduYXR1cmU6ZnVuY3Rpb24oKXt9LHJlYWREYXRlOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcy5yZWFkSW50KDQpO3JldHVybiBuZXcgRGF0ZShEYXRlLlVUQygxOTgwKyhlPj4yNSYxMjcpLChlPj4yMSYxNSktMSxlPj4xNiYzMSxlPj4xMSYzMSxlPj41JjYzLCgzMSZlKTw8MSkpfX0sdC5leHBvcnRzPWl9LHtcIi4uL3V0aWxzXCI6MzJ9XSwxOTpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3ZhciBuPWUoXCIuL1VpbnQ4QXJyYXlSZWFkZXJcIik7ZnVuY3Rpb24gaShlKXtuLmNhbGwodGhpcyxlKX1lKFwiLi4vdXRpbHNcIikuaW5oZXJpdHMoaSxuKSxpLnByb3RvdHlwZS5yZWFkRGF0YT1mdW5jdGlvbihlKXt0aGlzLmNoZWNrT2Zmc2V0KGUpO3ZhciB0PXRoaXMuZGF0YS5zbGljZSh0aGlzLnplcm8rdGhpcy5pbmRleCx0aGlzLnplcm8rdGhpcy5pbmRleCtlKTtyZXR1cm4gdGhpcy5pbmRleCs9ZSx0fSx0LmV4cG9ydHM9aX0se1wiLi4vdXRpbHNcIjozMixcIi4vVWludDhBcnJheVJlYWRlclwiOjIxfV0sMjA6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt2YXIgbj1lKFwiLi9EYXRhUmVhZGVyXCIpO2Z1bmN0aW9uIGkoZSl7bi5jYWxsKHRoaXMsZSl9ZShcIi4uL3V0aWxzXCIpLmluaGVyaXRzKGksbiksaS5wcm90b3R5cGUuYnl0ZUF0PWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLmRhdGEuY2hhckNvZGVBdCh0aGlzLnplcm8rZSl9LGkucHJvdG90eXBlLmxhc3RJbmRleE9mU2lnbmF0dXJlPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLmRhdGEubGFzdEluZGV4T2YoZSktdGhpcy56ZXJvfSxpLnByb3RvdHlwZS5yZWFkQW5kQ2hlY2tTaWduYXR1cmU9ZnVuY3Rpb24oZSl7cmV0dXJuIGU9PT10aGlzLnJlYWREYXRhKDQpfSxpLnByb3RvdHlwZS5yZWFkRGF0YT1mdW5jdGlvbihlKXt0aGlzLmNoZWNrT2Zmc2V0KGUpO3ZhciB0PXRoaXMuZGF0YS5zbGljZSh0aGlzLnplcm8rdGhpcy5pbmRleCx0aGlzLnplcm8rdGhpcy5pbmRleCtlKTtyZXR1cm4gdGhpcy5pbmRleCs9ZSx0fSx0LmV4cG9ydHM9aX0se1wiLi4vdXRpbHNcIjozMixcIi4vRGF0YVJlYWRlclwiOjE4fV0sMjE6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt2YXIgbj1lKFwiLi9BcnJheVJlYWRlclwiKTtmdW5jdGlvbiBpKGUpe24uY2FsbCh0aGlzLGUpfWUoXCIuLi91dGlsc1wiKS5pbmhlcml0cyhpLG4pLGkucHJvdG90eXBlLnJlYWREYXRhPWZ1bmN0aW9uKGUpe2lmKHRoaXMuY2hlY2tPZmZzZXQoZSksMD09PWUpcmV0dXJuIG5ldyBVaW50OEFycmF5KDApO3ZhciB0PXRoaXMuZGF0YS5zdWJhcnJheSh0aGlzLnplcm8rdGhpcy5pbmRleCx0aGlzLnplcm8rdGhpcy5pbmRleCtlKTtyZXR1cm4gdGhpcy5pbmRleCs9ZSx0fSx0LmV4cG9ydHM9aX0se1wiLi4vdXRpbHNcIjozMixcIi4vQXJyYXlSZWFkZXJcIjoxN31dLDIyOltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7dmFyIG49ZShcIi4uL3V0aWxzXCIpLGk9ZShcIi4uL3N1cHBvcnRcIikscz1lKFwiLi9BcnJheVJlYWRlclwiKSxhPWUoXCIuL1N0cmluZ1JlYWRlclwiKSxvPWUoXCIuL05vZGVCdWZmZXJSZWFkZXJcIiksaD1lKFwiLi9VaW50OEFycmF5UmVhZGVyXCIpO3QuZXhwb3J0cz1mdW5jdGlvbihlKXt2YXIgdD1uLmdldFR5cGVPZihlKTtyZXR1cm4gbi5jaGVja1N1cHBvcnQodCksXCJzdHJpbmdcIiE9PXR8fGkudWludDhhcnJheT9cIm5vZGVidWZmZXJcIj09PXQ/bmV3IG8oZSk6aS51aW50OGFycmF5P25ldyBoKG4udHJhbnNmb3JtVG8oXCJ1aW50OGFycmF5XCIsZSkpOm5ldyBzKG4udHJhbnNmb3JtVG8oXCJhcnJheVwiLGUpKTpuZXcgYShlKX19LHtcIi4uL3N1cHBvcnRcIjozMCxcIi4uL3V0aWxzXCI6MzIsXCIuL0FycmF5UmVhZGVyXCI6MTcsXCIuL05vZGVCdWZmZXJSZWFkZXJcIjoxOSxcIi4vU3RyaW5nUmVhZGVyXCI6MjAsXCIuL1VpbnQ4QXJyYXlSZWFkZXJcIjoyMX1dLDIzOltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7ci5MT0NBTF9GSUxFX0hFQURFUj1cIlBLXHUwMDAzXHUwMDA0XCIsci5DRU5UUkFMX0ZJTEVfSEVBREVSPVwiUEtcdTAwMDFcdTAwMDJcIixyLkNFTlRSQUxfRElSRUNUT1JZX0VORD1cIlBLXHUwMDA1XHUwMDA2XCIsci5aSVA2NF9DRU5UUkFMX0RJUkVDVE9SWV9MT0NBVE9SPVwiUEtcdTAwMDZcdTAwMDdcIixyLlpJUDY0X0NFTlRSQUxfRElSRUNUT1JZX0VORD1cIlBLXHUwMDA2XHUwMDA2XCIsci5EQVRBX0RFU0NSSVBUT1I9XCJQS1x1MDAwN1xcYlwifSx7fV0sMjQ6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt2YXIgbj1lKFwiLi9HZW5lcmljV29ya2VyXCIpLGk9ZShcIi4uL3V0aWxzXCIpO2Z1bmN0aW9uIHMoZSl7bi5jYWxsKHRoaXMsXCJDb252ZXJ0V29ya2VyIHRvIFwiK2UpLHRoaXMuZGVzdFR5cGU9ZX1pLmluaGVyaXRzKHMsbikscy5wcm90b3R5cGUucHJvY2Vzc0NodW5rPWZ1bmN0aW9uKGUpe3RoaXMucHVzaCh7ZGF0YTppLnRyYW5zZm9ybVRvKHRoaXMuZGVzdFR5cGUsZS5kYXRhKSxtZXRhOmUubWV0YX0pfSx0LmV4cG9ydHM9c30se1wiLi4vdXRpbHNcIjozMixcIi4vR2VuZXJpY1dvcmtlclwiOjI4fV0sMjU6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt2YXIgbj1lKFwiLi9HZW5lcmljV29ya2VyXCIpLGk9ZShcIi4uL2NyYzMyXCIpO2Z1bmN0aW9uIHMoKXtuLmNhbGwodGhpcyxcIkNyYzMyUHJvYmVcIiksdGhpcy53aXRoU3RyZWFtSW5mbyhcImNyYzMyXCIsMCl9ZShcIi4uL3V0aWxzXCIpLmluaGVyaXRzKHMsbikscy5wcm90b3R5cGUucHJvY2Vzc0NodW5rPWZ1bmN0aW9uKGUpe3RoaXMuc3RyZWFtSW5mby5jcmMzMj1pKGUuZGF0YSx0aGlzLnN0cmVhbUluZm8uY3JjMzJ8fDApLHRoaXMucHVzaChlKX0sdC5leHBvcnRzPXN9LHtcIi4uL2NyYzMyXCI6NCxcIi4uL3V0aWxzXCI6MzIsXCIuL0dlbmVyaWNXb3JrZXJcIjoyOH1dLDI2OltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7dmFyIG49ZShcIi4uL3V0aWxzXCIpLGk9ZShcIi4vR2VuZXJpY1dvcmtlclwiKTtmdW5jdGlvbiBzKGUpe2kuY2FsbCh0aGlzLFwiRGF0YUxlbmd0aFByb2JlIGZvciBcIitlKSx0aGlzLnByb3BOYW1lPWUsdGhpcy53aXRoU3RyZWFtSW5mbyhlLDApfW4uaW5oZXJpdHMocyxpKSxzLnByb3RvdHlwZS5wcm9jZXNzQ2h1bms9ZnVuY3Rpb24oZSl7aWYoZSl7dmFyIHQ9dGhpcy5zdHJlYW1JbmZvW3RoaXMucHJvcE5hbWVdfHwwO3RoaXMuc3RyZWFtSW5mb1t0aGlzLnByb3BOYW1lXT10K2UuZGF0YS5sZW5ndGh9aS5wcm90b3R5cGUucHJvY2Vzc0NodW5rLmNhbGwodGhpcyxlKX0sdC5leHBvcnRzPXN9LHtcIi4uL3V0aWxzXCI6MzIsXCIuL0dlbmVyaWNXb3JrZXJcIjoyOH1dLDI3OltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7dmFyIG49ZShcIi4uL3V0aWxzXCIpLGk9ZShcIi4vR2VuZXJpY1dvcmtlclwiKTtmdW5jdGlvbiBzKGUpe2kuY2FsbCh0aGlzLFwiRGF0YVdvcmtlclwiKTt2YXIgdD10aGlzO3RoaXMuZGF0YUlzUmVhZHk9ITEsdGhpcy5pbmRleD0wLHRoaXMubWF4PTAsdGhpcy5kYXRhPW51bGwsdGhpcy50eXBlPVwiXCIsdGhpcy5fdGlja1NjaGVkdWxlZD0hMSxlLnRoZW4oZnVuY3Rpb24oZSl7dC5kYXRhSXNSZWFkeT0hMCx0LmRhdGE9ZSx0Lm1heD1lJiZlLmxlbmd0aHx8MCx0LnR5cGU9bi5nZXRUeXBlT2YoZSksdC5pc1BhdXNlZHx8dC5fdGlja0FuZFJlcGVhdCgpfSxmdW5jdGlvbihlKXt0LmVycm9yKGUpfSl9bi5pbmhlcml0cyhzLGkpLHMucHJvdG90eXBlLmNsZWFuVXA9ZnVuY3Rpb24oKXtpLnByb3RvdHlwZS5jbGVhblVwLmNhbGwodGhpcyksdGhpcy5kYXRhPW51bGx9LHMucHJvdG90eXBlLnJlc3VtZT1mdW5jdGlvbigpe3JldHVybiEhaS5wcm90b3R5cGUucmVzdW1lLmNhbGwodGhpcykmJighdGhpcy5fdGlja1NjaGVkdWxlZCYmdGhpcy5kYXRhSXNSZWFkeSYmKHRoaXMuX3RpY2tTY2hlZHVsZWQ9ITAsbi5kZWxheSh0aGlzLl90aWNrQW5kUmVwZWF0LFtdLHRoaXMpKSwhMCl9LHMucHJvdG90eXBlLl90aWNrQW5kUmVwZWF0PWZ1bmN0aW9uKCl7dGhpcy5fdGlja1NjaGVkdWxlZD0hMSx0aGlzLmlzUGF1c2VkfHx0aGlzLmlzRmluaXNoZWR8fCh0aGlzLl90aWNrKCksdGhpcy5pc0ZpbmlzaGVkfHwobi5kZWxheSh0aGlzLl90aWNrQW5kUmVwZWF0LFtdLHRoaXMpLHRoaXMuX3RpY2tTY2hlZHVsZWQ9ITApKX0scy5wcm90b3R5cGUuX3RpY2s9ZnVuY3Rpb24oKXtpZih0aGlzLmlzUGF1c2VkfHx0aGlzLmlzRmluaXNoZWQpcmV0dXJuITE7dmFyIGU9bnVsbCx0PU1hdGgubWluKHRoaXMubWF4LHRoaXMuaW5kZXgrMTYzODQpO2lmKHRoaXMuaW5kZXg+PXRoaXMubWF4KXJldHVybiB0aGlzLmVuZCgpO3N3aXRjaCh0aGlzLnR5cGUpe2Nhc2VcInN0cmluZ1wiOmU9dGhpcy5kYXRhLnN1YnN0cmluZyh0aGlzLmluZGV4LHQpO2JyZWFrO2Nhc2VcInVpbnQ4YXJyYXlcIjplPXRoaXMuZGF0YS5zdWJhcnJheSh0aGlzLmluZGV4LHQpO2JyZWFrO2Nhc2VcImFycmF5XCI6Y2FzZVwibm9kZWJ1ZmZlclwiOmU9dGhpcy5kYXRhLnNsaWNlKHRoaXMuaW5kZXgsdCl9cmV0dXJuIHRoaXMuaW5kZXg9dCx0aGlzLnB1c2goe2RhdGE6ZSxtZXRhOntwZXJjZW50OnRoaXMubWF4P3RoaXMuaW5kZXgvdGhpcy5tYXgqMTAwOjB9fSl9LHQuZXhwb3J0cz1zfSx7XCIuLi91dGlsc1wiOjMyLFwiLi9HZW5lcmljV29ya2VyXCI6Mjh9XSwyODpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIG4oZSl7dGhpcy5uYW1lPWV8fFwiZGVmYXVsdFwiLHRoaXMuc3RyZWFtSW5mbz17fSx0aGlzLmdlbmVyYXRlZEVycm9yPW51bGwsdGhpcy5leHRyYVN0cmVhbUluZm89e30sdGhpcy5pc1BhdXNlZD0hMCx0aGlzLmlzRmluaXNoZWQ9ITEsdGhpcy5pc0xvY2tlZD0hMSx0aGlzLl9saXN0ZW5lcnM9e2RhdGE6W10sZW5kOltdLGVycm9yOltdfSx0aGlzLnByZXZpb3VzPW51bGx9bi5wcm90b3R5cGU9e3B1c2g6ZnVuY3Rpb24oZSl7dGhpcy5lbWl0KFwiZGF0YVwiLGUpfSxlbmQ6ZnVuY3Rpb24oKXtpZih0aGlzLmlzRmluaXNoZWQpcmV0dXJuITE7dGhpcy5mbHVzaCgpO3RyeXt0aGlzLmVtaXQoXCJlbmRcIiksdGhpcy5jbGVhblVwKCksdGhpcy5pc0ZpbmlzaGVkPSEwfWNhdGNoKGUpe3RoaXMuZW1pdChcImVycm9yXCIsZSl9cmV0dXJuITB9LGVycm9yOmZ1bmN0aW9uKGUpe3JldHVybiF0aGlzLmlzRmluaXNoZWQmJih0aGlzLmlzUGF1c2VkP3RoaXMuZ2VuZXJhdGVkRXJyb3I9ZToodGhpcy5pc0ZpbmlzaGVkPSEwLHRoaXMuZW1pdChcImVycm9yXCIsZSksdGhpcy5wcmV2aW91cyYmdGhpcy5wcmV2aW91cy5lcnJvcihlKSx0aGlzLmNsZWFuVXAoKSksITApfSxvbjpmdW5jdGlvbihlLHQpe3JldHVybiB0aGlzLl9saXN0ZW5lcnNbZV0ucHVzaCh0KSx0aGlzfSxjbGVhblVwOmZ1bmN0aW9uKCl7dGhpcy5zdHJlYW1JbmZvPXRoaXMuZ2VuZXJhdGVkRXJyb3I9dGhpcy5leHRyYVN0cmVhbUluZm89bnVsbCx0aGlzLl9saXN0ZW5lcnM9W119LGVtaXQ6ZnVuY3Rpb24oZSx0KXtpZih0aGlzLl9saXN0ZW5lcnNbZV0pZm9yKHZhciByPTA7cjx0aGlzLl9saXN0ZW5lcnNbZV0ubGVuZ3RoO3IrKyl0aGlzLl9saXN0ZW5lcnNbZV1bcl0uY2FsbCh0aGlzLHQpfSxwaXBlOmZ1bmN0aW9uKGUpe3JldHVybiBlLnJlZ2lzdGVyUHJldmlvdXModGhpcyl9LHJlZ2lzdGVyUHJldmlvdXM6ZnVuY3Rpb24oZSl7aWYodGhpcy5pc0xvY2tlZCl0aHJvdyBuZXcgRXJyb3IoXCJUaGUgc3RyZWFtICdcIit0aGlzK1wiJyBoYXMgYWxyZWFkeSBiZWVuIHVzZWQuXCIpO3RoaXMuc3RyZWFtSW5mbz1lLnN0cmVhbUluZm8sdGhpcy5tZXJnZVN0cmVhbUluZm8oKSx0aGlzLnByZXZpb3VzPWU7dmFyIHQ9dGhpcztyZXR1cm4gZS5vbihcImRhdGFcIixmdW5jdGlvbihlKXt0LnByb2Nlc3NDaHVuayhlKX0pLGUub24oXCJlbmRcIixmdW5jdGlvbigpe3QuZW5kKCl9KSxlLm9uKFwiZXJyb3JcIixmdW5jdGlvbihlKXt0LmVycm9yKGUpfSksdGhpc30scGF1c2U6ZnVuY3Rpb24oKXtyZXR1cm4hdGhpcy5pc1BhdXNlZCYmIXRoaXMuaXNGaW5pc2hlZCYmKHRoaXMuaXNQYXVzZWQ9ITAsdGhpcy5wcmV2aW91cyYmdGhpcy5wcmV2aW91cy5wYXVzZSgpLCEwKX0scmVzdW1lOmZ1bmN0aW9uKCl7aWYoIXRoaXMuaXNQYXVzZWR8fHRoaXMuaXNGaW5pc2hlZClyZXR1cm4hMTt2YXIgZT10aGlzLmlzUGF1c2VkPSExO3JldHVybiB0aGlzLmdlbmVyYXRlZEVycm9yJiYodGhpcy5lcnJvcih0aGlzLmdlbmVyYXRlZEVycm9yKSxlPSEwKSx0aGlzLnByZXZpb3VzJiZ0aGlzLnByZXZpb3VzLnJlc3VtZSgpLCFlfSxmbHVzaDpmdW5jdGlvbigpe30scHJvY2Vzc0NodW5rOmZ1bmN0aW9uKGUpe3RoaXMucHVzaChlKX0sd2l0aFN0cmVhbUluZm86ZnVuY3Rpb24oZSx0KXtyZXR1cm4gdGhpcy5leHRyYVN0cmVhbUluZm9bZV09dCx0aGlzLm1lcmdlU3RyZWFtSW5mbygpLHRoaXN9LG1lcmdlU3RyZWFtSW5mbzpmdW5jdGlvbigpe2Zvcih2YXIgZSBpbiB0aGlzLmV4dHJhU3RyZWFtSW5mbylPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodGhpcy5leHRyYVN0cmVhbUluZm8sZSkmJih0aGlzLnN0cmVhbUluZm9bZV09dGhpcy5leHRyYVN0cmVhbUluZm9bZV0pfSxsb2NrOmZ1bmN0aW9uKCl7aWYodGhpcy5pc0xvY2tlZCl0aHJvdyBuZXcgRXJyb3IoXCJUaGUgc3RyZWFtICdcIit0aGlzK1wiJyBoYXMgYWxyZWFkeSBiZWVuIHVzZWQuXCIpO3RoaXMuaXNMb2NrZWQ9ITAsdGhpcy5wcmV2aW91cyYmdGhpcy5wcmV2aW91cy5sb2NrKCl9LHRvU3RyaW5nOmZ1bmN0aW9uKCl7dmFyIGU9XCJXb3JrZXIgXCIrdGhpcy5uYW1lO3JldHVybiB0aGlzLnByZXZpb3VzP3RoaXMucHJldmlvdXMrXCIgLT4gXCIrZTplfX0sdC5leHBvcnRzPW59LHt9XSwyOTpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3ZhciBoPWUoXCIuLi91dGlsc1wiKSxpPWUoXCIuL0NvbnZlcnRXb3JrZXJcIikscz1lKFwiLi9HZW5lcmljV29ya2VyXCIpLHU9ZShcIi4uL2Jhc2U2NFwiKSxuPWUoXCIuLi9zdXBwb3J0XCIpLGE9ZShcIi4uL2V4dGVybmFsXCIpLG89bnVsbDtpZihuLm5vZGVzdHJlYW0pdHJ5e289ZShcIi4uL25vZGVqcy9Ob2RlanNTdHJlYW1PdXRwdXRBZGFwdGVyXCIpfWNhdGNoKGUpe31mdW5jdGlvbiBsKGUsbyl7cmV0dXJuIG5ldyBhLlByb21pc2UoZnVuY3Rpb24odCxyKXt2YXIgbj1bXSxpPWUuX2ludGVybmFsVHlwZSxzPWUuX291dHB1dFR5cGUsYT1lLl9taW1lVHlwZTtlLm9uKFwiZGF0YVwiLGZ1bmN0aW9uKGUsdCl7bi5wdXNoKGUpLG8mJm8odCl9KS5vbihcImVycm9yXCIsZnVuY3Rpb24oZSl7bj1bXSxyKGUpfSkub24oXCJlbmRcIixmdW5jdGlvbigpe3RyeXt2YXIgZT1mdW5jdGlvbihlLHQscil7c3dpdGNoKGUpe2Nhc2VcImJsb2JcIjpyZXR1cm4gaC5uZXdCbG9iKGgudHJhbnNmb3JtVG8oXCJhcnJheWJ1ZmZlclwiLHQpLHIpO2Nhc2VcImJhc2U2NFwiOnJldHVybiB1LmVuY29kZSh0KTtkZWZhdWx0OnJldHVybiBoLnRyYW5zZm9ybVRvKGUsdCl9fShzLGZ1bmN0aW9uKGUsdCl7dmFyIHIsbj0wLGk9bnVsbCxzPTA7Zm9yKHI9MDtyPHQubGVuZ3RoO3IrKylzKz10W3JdLmxlbmd0aDtzd2l0Y2goZSl7Y2FzZVwic3RyaW5nXCI6cmV0dXJuIHQuam9pbihcIlwiKTtjYXNlXCJhcnJheVwiOnJldHVybiBBcnJheS5wcm90b3R5cGUuY29uY2F0LmFwcGx5KFtdLHQpO2Nhc2VcInVpbnQ4YXJyYXlcIjpmb3IoaT1uZXcgVWludDhBcnJheShzKSxyPTA7cjx0Lmxlbmd0aDtyKyspaS5zZXQodFtyXSxuKSxuKz10W3JdLmxlbmd0aDtyZXR1cm4gaTtjYXNlXCJub2RlYnVmZmVyXCI6cmV0dXJuIEJ1ZmZlci5jb25jYXQodCk7ZGVmYXVsdDp0aHJvdyBuZXcgRXJyb3IoXCJjb25jYXQgOiB1bnN1cHBvcnRlZCB0eXBlICdcIitlK1wiJ1wiKX19KGksbiksYSk7dChlKX1jYXRjaChlKXtyKGUpfW49W119KS5yZXN1bWUoKX0pfWZ1bmN0aW9uIGYoZSx0LHIpe3ZhciBuPXQ7c3dpdGNoKHQpe2Nhc2VcImJsb2JcIjpjYXNlXCJhcnJheWJ1ZmZlclwiOm49XCJ1aW50OGFycmF5XCI7YnJlYWs7Y2FzZVwiYmFzZTY0XCI6bj1cInN0cmluZ1wifXRyeXt0aGlzLl9pbnRlcm5hbFR5cGU9bix0aGlzLl9vdXRwdXRUeXBlPXQsdGhpcy5fbWltZVR5cGU9cixoLmNoZWNrU3VwcG9ydChuKSx0aGlzLl93b3JrZXI9ZS5waXBlKG5ldyBpKG4pKSxlLmxvY2soKX1jYXRjaChlKXt0aGlzLl93b3JrZXI9bmV3IHMoXCJlcnJvclwiKSx0aGlzLl93b3JrZXIuZXJyb3IoZSl9fWYucHJvdG90eXBlPXthY2N1bXVsYXRlOmZ1bmN0aW9uKGUpe3JldHVybiBsKHRoaXMsZSl9LG9uOmZ1bmN0aW9uKGUsdCl7dmFyIHI9dGhpcztyZXR1cm5cImRhdGFcIj09PWU/dGhpcy5fd29ya2VyLm9uKGUsZnVuY3Rpb24oZSl7dC5jYWxsKHIsZS5kYXRhLGUubWV0YSl9KTp0aGlzLl93b3JrZXIub24oZSxmdW5jdGlvbigpe2guZGVsYXkodCxhcmd1bWVudHMscil9KSx0aGlzfSxyZXN1bWU6ZnVuY3Rpb24oKXtyZXR1cm4gaC5kZWxheSh0aGlzLl93b3JrZXIucmVzdW1lLFtdLHRoaXMuX3dvcmtlciksdGhpc30scGF1c2U6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5fd29ya2VyLnBhdXNlKCksdGhpc30sdG9Ob2RlanNTdHJlYW06ZnVuY3Rpb24oZSl7aWYoaC5jaGVja1N1cHBvcnQoXCJub2Rlc3RyZWFtXCIpLFwibm9kZWJ1ZmZlclwiIT09dGhpcy5fb3V0cHV0VHlwZSl0aHJvdyBuZXcgRXJyb3IodGhpcy5fb3V0cHV0VHlwZStcIiBpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoaXMgbWV0aG9kXCIpO3JldHVybiBuZXcgbyh0aGlzLHtvYmplY3RNb2RlOlwibm9kZWJ1ZmZlclwiIT09dGhpcy5fb3V0cHV0VHlwZX0sZSl9fSx0LmV4cG9ydHM9Zn0se1wiLi4vYmFzZTY0XCI6MSxcIi4uL2V4dGVybmFsXCI6NixcIi4uL25vZGVqcy9Ob2RlanNTdHJlYW1PdXRwdXRBZGFwdGVyXCI6MTMsXCIuLi9zdXBwb3J0XCI6MzAsXCIuLi91dGlsc1wiOjMyLFwiLi9Db252ZXJ0V29ya2VyXCI6MjQsXCIuL0dlbmVyaWNXb3JrZXJcIjoyOH1dLDMwOltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7aWYoci5iYXNlNjQ9ITAsci5hcnJheT0hMCxyLnN0cmluZz0hMCxyLmFycmF5YnVmZmVyPVwidW5kZWZpbmVkXCIhPXR5cGVvZiBBcnJheUJ1ZmZlciYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIFVpbnQ4QXJyYXksci5ub2RlYnVmZmVyPVwidW5kZWZpbmVkXCIhPXR5cGVvZiBCdWZmZXIsci51aW50OGFycmF5PVwidW5kZWZpbmVkXCIhPXR5cGVvZiBVaW50OEFycmF5LFwidW5kZWZpbmVkXCI9PXR5cGVvZiBBcnJheUJ1ZmZlcilyLmJsb2I9ITE7ZWxzZXt2YXIgbj1uZXcgQXJyYXlCdWZmZXIoMCk7dHJ5e3IuYmxvYj0wPT09bmV3IEJsb2IoW25dLHt0eXBlOlwiYXBwbGljYXRpb24vemlwXCJ9KS5zaXplfWNhdGNoKGUpe3RyeXt2YXIgaT1uZXcoc2VsZi5CbG9iQnVpbGRlcnx8c2VsZi5XZWJLaXRCbG9iQnVpbGRlcnx8c2VsZi5Nb3pCbG9iQnVpbGRlcnx8c2VsZi5NU0Jsb2JCdWlsZGVyKTtpLmFwcGVuZChuKSxyLmJsb2I9MD09PWkuZ2V0QmxvYihcImFwcGxpY2F0aW9uL3ppcFwiKS5zaXplfWNhdGNoKGUpe3IuYmxvYj0hMX19fXRyeXtyLm5vZGVzdHJlYW09ISFlKFwicmVhZGFibGUtc3RyZWFtXCIpLlJlYWRhYmxlfWNhdGNoKGUpe3Iubm9kZXN0cmVhbT0hMX19LHtcInJlYWRhYmxlLXN0cmVhbVwiOjE2fV0sMzE6W2Z1bmN0aW9uKGUsdCxzKXtcInVzZSBzdHJpY3RcIjtmb3IodmFyIG89ZShcIi4vdXRpbHNcIiksaD1lKFwiLi9zdXBwb3J0XCIpLHI9ZShcIi4vbm9kZWpzVXRpbHNcIiksbj1lKFwiLi9zdHJlYW0vR2VuZXJpY1dvcmtlclwiKSx1PW5ldyBBcnJheSgyNTYpLGk9MDtpPDI1NjtpKyspdVtpXT0yNTI8PWk/NjoyNDg8PWk/NToyNDA8PWk/NDoyMjQ8PWk/MzoxOTI8PWk/MjoxO3VbMjU0XT11WzI1NF09MTtmdW5jdGlvbiBhKCl7bi5jYWxsKHRoaXMsXCJ1dGYtOCBkZWNvZGVcIiksdGhpcy5sZWZ0T3Zlcj1udWxsfWZ1bmN0aW9uIGwoKXtuLmNhbGwodGhpcyxcInV0Zi04IGVuY29kZVwiKX1zLnV0ZjhlbmNvZGU9ZnVuY3Rpb24oZSl7cmV0dXJuIGgubm9kZWJ1ZmZlcj9yLm5ld0J1ZmZlckZyb20oZSxcInV0Zi04XCIpOmZ1bmN0aW9uKGUpe3ZhciB0LHIsbixpLHMsYT1lLmxlbmd0aCxvPTA7Zm9yKGk9MDtpPGE7aSsrKTU1Mjk2PT0oNjQ1MTImKHI9ZS5jaGFyQ29kZUF0KGkpKSkmJmkrMTxhJiY1NjMyMD09KDY0NTEyJihuPWUuY2hhckNvZGVBdChpKzEpKSkmJihyPTY1NTM2KyhyLTU1Mjk2PDwxMCkrKG4tNTYzMjApLGkrKyksbys9cjwxMjg/MTpyPDIwNDg/MjpyPDY1NTM2PzM6NDtmb3IodD1oLnVpbnQ4YXJyYXk/bmV3IFVpbnQ4QXJyYXkobyk6bmV3IEFycmF5KG8pLGk9cz0wO3M8bztpKyspNTUyOTY9PSg2NDUxMiYocj1lLmNoYXJDb2RlQXQoaSkpKSYmaSsxPGEmJjU2MzIwPT0oNjQ1MTImKG49ZS5jaGFyQ29kZUF0KGkrMSkpKSYmKHI9NjU1MzYrKHItNTUyOTY8PDEwKSsobi01NjMyMCksaSsrKSxyPDEyOD90W3MrK109cjoocjwyMDQ4P3RbcysrXT0xOTJ8cj4+PjY6KHI8NjU1MzY/dFtzKytdPTIyNHxyPj4+MTI6KHRbcysrXT0yNDB8cj4+PjE4LHRbcysrXT0xMjh8cj4+PjEyJjYzKSx0W3MrK109MTI4fHI+Pj42JjYzKSx0W3MrK109MTI4fDYzJnIpO3JldHVybiB0fShlKX0scy51dGY4ZGVjb2RlPWZ1bmN0aW9uKGUpe3JldHVybiBoLm5vZGVidWZmZXI/by50cmFuc2Zvcm1UbyhcIm5vZGVidWZmZXJcIixlKS50b1N0cmluZyhcInV0Zi04XCIpOmZ1bmN0aW9uKGUpe3ZhciB0LHIsbixpLHM9ZS5sZW5ndGgsYT1uZXcgQXJyYXkoMipzKTtmb3IodD1yPTA7dDxzOylpZigobj1lW3QrK10pPDEyOClhW3IrK109bjtlbHNlIGlmKDQ8KGk9dVtuXSkpYVtyKytdPTY1NTMzLHQrPWktMTtlbHNle2ZvcihuJj0yPT09aT8zMTozPT09aT8xNTo3OzE8aSYmdDxzOyluPW48PDZ8NjMmZVt0KytdLGktLTsxPGk/YVtyKytdPTY1NTMzOm48NjU1MzY/YVtyKytdPW46KG4tPTY1NTM2LGFbcisrXT01NTI5NnxuPj4xMCYxMDIzLGFbcisrXT01NjMyMHwxMDIzJm4pfXJldHVybiBhLmxlbmd0aCE9PXImJihhLnN1YmFycmF5P2E9YS5zdWJhcnJheSgwLHIpOmEubGVuZ3RoPXIpLG8uYXBwbHlGcm9tQ2hhckNvZGUoYSl9KGU9by50cmFuc2Zvcm1UbyhoLnVpbnQ4YXJyYXk/XCJ1aW50OGFycmF5XCI6XCJhcnJheVwiLGUpKX0sby5pbmhlcml0cyhhLG4pLGEucHJvdG90eXBlLnByb2Nlc3NDaHVuaz1mdW5jdGlvbihlKXt2YXIgdD1vLnRyYW5zZm9ybVRvKGgudWludDhhcnJheT9cInVpbnQ4YXJyYXlcIjpcImFycmF5XCIsZS5kYXRhKTtpZih0aGlzLmxlZnRPdmVyJiZ0aGlzLmxlZnRPdmVyLmxlbmd0aCl7aWYoaC51aW50OGFycmF5KXt2YXIgcj10Oyh0PW5ldyBVaW50OEFycmF5KHIubGVuZ3RoK3RoaXMubGVmdE92ZXIubGVuZ3RoKSkuc2V0KHRoaXMubGVmdE92ZXIsMCksdC5zZXQocix0aGlzLmxlZnRPdmVyLmxlbmd0aCl9ZWxzZSB0PXRoaXMubGVmdE92ZXIuY29uY2F0KHQpO3RoaXMubGVmdE92ZXI9bnVsbH12YXIgbj1mdW5jdGlvbihlLHQpe3ZhciByO2ZvcigodD10fHxlLmxlbmd0aCk+ZS5sZW5ndGgmJih0PWUubGVuZ3RoKSxyPXQtMTswPD1yJiYxMjg9PSgxOTImZVtyXSk7KXItLTtyZXR1cm4gcjwwP3Q6MD09PXI/dDpyK3VbZVtyXV0+dD9yOnR9KHQpLGk9dDtuIT09dC5sZW5ndGgmJihoLnVpbnQ4YXJyYXk/KGk9dC5zdWJhcnJheSgwLG4pLHRoaXMubGVmdE92ZXI9dC5zdWJhcnJheShuLHQubGVuZ3RoKSk6KGk9dC5zbGljZSgwLG4pLHRoaXMubGVmdE92ZXI9dC5zbGljZShuLHQubGVuZ3RoKSkpLHRoaXMucHVzaCh7ZGF0YTpzLnV0ZjhkZWNvZGUoaSksbWV0YTplLm1ldGF9KX0sYS5wcm90b3R5cGUuZmx1c2g9ZnVuY3Rpb24oKXt0aGlzLmxlZnRPdmVyJiZ0aGlzLmxlZnRPdmVyLmxlbmd0aCYmKHRoaXMucHVzaCh7ZGF0YTpzLnV0ZjhkZWNvZGUodGhpcy5sZWZ0T3ZlciksbWV0YTp7fX0pLHRoaXMubGVmdE92ZXI9bnVsbCl9LHMuVXRmOERlY29kZVdvcmtlcj1hLG8uaW5oZXJpdHMobCxuKSxsLnByb3RvdHlwZS5wcm9jZXNzQ2h1bms9ZnVuY3Rpb24oZSl7dGhpcy5wdXNoKHtkYXRhOnMudXRmOGVuY29kZShlLmRhdGEpLG1ldGE6ZS5tZXRhfSl9LHMuVXRmOEVuY29kZVdvcmtlcj1sfSx7XCIuL25vZGVqc1V0aWxzXCI6MTQsXCIuL3N0cmVhbS9HZW5lcmljV29ya2VyXCI6MjgsXCIuL3N1cHBvcnRcIjozMCxcIi4vdXRpbHNcIjozMn1dLDMyOltmdW5jdGlvbihlLHQsYSl7XCJ1c2Ugc3RyaWN0XCI7dmFyIG89ZShcIi4vc3VwcG9ydFwiKSxoPWUoXCIuL2Jhc2U2NFwiKSxyPWUoXCIuL25vZGVqc1V0aWxzXCIpLHU9ZShcIi4vZXh0ZXJuYWxcIik7ZnVuY3Rpb24gbihlKXtyZXR1cm4gZX1mdW5jdGlvbiBsKGUsdCl7Zm9yKHZhciByPTA7cjxlLmxlbmd0aDsrK3IpdFtyXT0yNTUmZS5jaGFyQ29kZUF0KHIpO3JldHVybiB0fWUoXCJzZXRpbW1lZGlhdGVcIiksYS5uZXdCbG9iPWZ1bmN0aW9uKHQscil7YS5jaGVja1N1cHBvcnQoXCJibG9iXCIpO3RyeXtyZXR1cm4gbmV3IEJsb2IoW3RdLHt0eXBlOnJ9KX1jYXRjaChlKXt0cnl7dmFyIG49bmV3KHNlbGYuQmxvYkJ1aWxkZXJ8fHNlbGYuV2ViS2l0QmxvYkJ1aWxkZXJ8fHNlbGYuTW96QmxvYkJ1aWxkZXJ8fHNlbGYuTVNCbG9iQnVpbGRlcik7cmV0dXJuIG4uYXBwZW5kKHQpLG4uZ2V0QmxvYihyKX1jYXRjaChlKXt0aHJvdyBuZXcgRXJyb3IoXCJCdWcgOiBjYW4ndCBjb25zdHJ1Y3QgdGhlIEJsb2IuXCIpfX19O3ZhciBpPXtzdHJpbmdpZnlCeUNodW5rOmZ1bmN0aW9uKGUsdCxyKXt2YXIgbj1bXSxpPTAscz1lLmxlbmd0aDtpZihzPD1yKXJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsZSk7Zm9yKDtpPHM7KVwiYXJyYXlcIj09PXR8fFwibm9kZWJ1ZmZlclwiPT09dD9uLnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLGUuc2xpY2UoaSxNYXRoLm1pbihpK3IscykpKSk6bi5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCxlLnN1YmFycmF5KGksTWF0aC5taW4oaStyLHMpKSkpLGkrPXI7cmV0dXJuIG4uam9pbihcIlwiKX0sc3RyaW5naWZ5QnlDaGFyOmZ1bmN0aW9uKGUpe2Zvcih2YXIgdD1cIlwiLHI9MDtyPGUubGVuZ3RoO3IrKyl0Kz1TdHJpbmcuZnJvbUNoYXJDb2RlKGVbcl0pO3JldHVybiB0fSxhcHBseUNhbkJlVXNlZDp7dWludDhhcnJheTpmdW5jdGlvbigpe3RyeXtyZXR1cm4gby51aW50OGFycmF5JiYxPT09U3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLG5ldyBVaW50OEFycmF5KDEpKS5sZW5ndGh9Y2F0Y2goZSl7cmV0dXJuITF9fSgpLG5vZGVidWZmZXI6ZnVuY3Rpb24oKXt0cnl7cmV0dXJuIG8ubm9kZWJ1ZmZlciYmMT09PVN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCxyLmFsbG9jQnVmZmVyKDEpKS5sZW5ndGh9Y2F0Y2goZSl7cmV0dXJuITF9fSgpfX07ZnVuY3Rpb24gcyhlKXt2YXIgdD02NTUzNixyPWEuZ2V0VHlwZU9mKGUpLG49ITA7aWYoXCJ1aW50OGFycmF5XCI9PT1yP249aS5hcHBseUNhbkJlVXNlZC51aW50OGFycmF5Olwibm9kZWJ1ZmZlclwiPT09ciYmKG49aS5hcHBseUNhbkJlVXNlZC5ub2RlYnVmZmVyKSxuKWZvcig7MTx0Oyl0cnl7cmV0dXJuIGkuc3RyaW5naWZ5QnlDaHVuayhlLHIsdCl9Y2F0Y2goZSl7dD1NYXRoLmZsb29yKHQvMil9cmV0dXJuIGkuc3RyaW5naWZ5QnlDaGFyKGUpfWZ1bmN0aW9uIGYoZSx0KXtmb3IodmFyIHI9MDtyPGUubGVuZ3RoO3IrKyl0W3JdPWVbcl07cmV0dXJuIHR9YS5hcHBseUZyb21DaGFyQ29kZT1zO3ZhciBjPXt9O2Muc3RyaW5nPXtzdHJpbmc6bixhcnJheTpmdW5jdGlvbihlKXtyZXR1cm4gbChlLG5ldyBBcnJheShlLmxlbmd0aCkpfSxhcnJheWJ1ZmZlcjpmdW5jdGlvbihlKXtyZXR1cm4gYy5zdHJpbmcudWludDhhcnJheShlKS5idWZmZXJ9LHVpbnQ4YXJyYXk6ZnVuY3Rpb24oZSl7cmV0dXJuIGwoZSxuZXcgVWludDhBcnJheShlLmxlbmd0aCkpfSxub2RlYnVmZmVyOmZ1bmN0aW9uKGUpe3JldHVybiBsKGUsci5hbGxvY0J1ZmZlcihlLmxlbmd0aCkpfX0sYy5hcnJheT17c3RyaW5nOnMsYXJyYXk6bixhcnJheWJ1ZmZlcjpmdW5jdGlvbihlKXtyZXR1cm4gbmV3IFVpbnQ4QXJyYXkoZSkuYnVmZmVyfSx1aW50OGFycmF5OmZ1bmN0aW9uKGUpe3JldHVybiBuZXcgVWludDhBcnJheShlKX0sbm9kZWJ1ZmZlcjpmdW5jdGlvbihlKXtyZXR1cm4gci5uZXdCdWZmZXJGcm9tKGUpfX0sYy5hcnJheWJ1ZmZlcj17c3RyaW5nOmZ1bmN0aW9uKGUpe3JldHVybiBzKG5ldyBVaW50OEFycmF5KGUpKX0sYXJyYXk6ZnVuY3Rpb24oZSl7cmV0dXJuIGYobmV3IFVpbnQ4QXJyYXkoZSksbmV3IEFycmF5KGUuYnl0ZUxlbmd0aCkpfSxhcnJheWJ1ZmZlcjpuLHVpbnQ4YXJyYXk6ZnVuY3Rpb24oZSl7cmV0dXJuIG5ldyBVaW50OEFycmF5KGUpfSxub2RlYnVmZmVyOmZ1bmN0aW9uKGUpe3JldHVybiByLm5ld0J1ZmZlckZyb20obmV3IFVpbnQ4QXJyYXkoZSkpfX0sYy51aW50OGFycmF5PXtzdHJpbmc6cyxhcnJheTpmdW5jdGlvbihlKXtyZXR1cm4gZihlLG5ldyBBcnJheShlLmxlbmd0aCkpfSxhcnJheWJ1ZmZlcjpmdW5jdGlvbihlKXtyZXR1cm4gZS5idWZmZXJ9LHVpbnQ4YXJyYXk6bixub2RlYnVmZmVyOmZ1bmN0aW9uKGUpe3JldHVybiByLm5ld0J1ZmZlckZyb20oZSl9fSxjLm5vZGVidWZmZXI9e3N0cmluZzpzLGFycmF5OmZ1bmN0aW9uKGUpe3JldHVybiBmKGUsbmV3IEFycmF5KGUubGVuZ3RoKSl9LGFycmF5YnVmZmVyOmZ1bmN0aW9uKGUpe3JldHVybiBjLm5vZGVidWZmZXIudWludDhhcnJheShlKS5idWZmZXJ9LHVpbnQ4YXJyYXk6ZnVuY3Rpb24oZSl7cmV0dXJuIGYoZSxuZXcgVWludDhBcnJheShlLmxlbmd0aCkpfSxub2RlYnVmZmVyOm59LGEudHJhbnNmb3JtVG89ZnVuY3Rpb24oZSx0KXtpZih0PXR8fFwiXCIsIWUpcmV0dXJuIHQ7YS5jaGVja1N1cHBvcnQoZSk7dmFyIHI9YS5nZXRUeXBlT2YodCk7cmV0dXJuIGNbcl1bZV0odCl9LGEucmVzb2x2ZT1mdW5jdGlvbihlKXtmb3IodmFyIHQ9ZS5zcGxpdChcIi9cIikscj1bXSxuPTA7bjx0Lmxlbmd0aDtuKyspe3ZhciBpPXRbbl07XCIuXCI9PT1pfHxcIlwiPT09aSYmMCE9PW4mJm4hPT10Lmxlbmd0aC0xfHwoXCIuLlwiPT09aT9yLnBvcCgpOnIucHVzaChpKSl9cmV0dXJuIHIuam9pbihcIi9cIil9LGEuZ2V0VHlwZU9mPWZ1bmN0aW9uKGUpe2lmKFwic3RyaW5nXCI9PXR5cGVvZiBlKXJldHVyblwic3RyaW5nXCI7dmFyIHQ9T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGUpO3JldHVyblwiW29iamVjdCBBcnJheV1cIj09PXQ/XCJhcnJheVwiOm8ubm9kZWJ1ZmZlciYmci5pc0J1ZmZlcihlKT9cIm5vZGVidWZmZXJcIjpvLnVpbnQ4YXJyYXkmJlwiW29iamVjdCBVaW50OEFycmF5XVwiPT09dD9cInVpbnQ4YXJyYXlcIjpvLmFycmF5YnVmZmVyJiZcIltvYmplY3QgQXJyYXlCdWZmZXJdXCI9PT10P1wiYXJyYXlidWZmZXJcIjp2b2lkIDB9LGEuY2hlY2tTdXBwb3J0PWZ1bmN0aW9uKGUpe2lmKCFvW2UudG9Mb3dlckNhc2UoKV0pdGhyb3cgbmV3IEVycm9yKGUrXCIgaXMgbm90IHN1cHBvcnRlZCBieSB0aGlzIHBsYXRmb3JtXCIpfSxhLk1BWF9WQUxVRV8xNkJJVFM9NjU1MzUsYS5NQVhfVkFMVUVfMzJCSVRTPS0xLGEucHJldHR5PWZ1bmN0aW9uKGUpe3ZhciB0LHIsbj1cIlwiO2ZvcihyPTA7cjwoZXx8XCJcIikubGVuZ3RoO3IrKyluKz1cIlxcXFx4XCIrKCh0PWUuY2hhckNvZGVBdChyKSk8MTY/XCIwXCI6XCJcIikrdC50b1N0cmluZygxNikudG9VcHBlckNhc2UoKTtyZXR1cm4gbn0sYS5kZWxheT1mdW5jdGlvbihlLHQscil7c2V0SW1tZWRpYXRlKGZ1bmN0aW9uKCl7ZS5hcHBseShyfHxudWxsLHR8fFtdKX0pfSxhLmluaGVyaXRzPWZ1bmN0aW9uKGUsdCl7ZnVuY3Rpb24gcigpe31yLnByb3RvdHlwZT10LnByb3RvdHlwZSxlLnByb3RvdHlwZT1uZXcgcn0sYS5leHRlbmQ9ZnVuY3Rpb24oKXt2YXIgZSx0LHI9e307Zm9yKGU9MDtlPGFyZ3VtZW50cy5sZW5ndGg7ZSsrKWZvcih0IGluIGFyZ3VtZW50c1tlXSlPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYXJndW1lbnRzW2VdLHQpJiZ2b2lkIDA9PT1yW3RdJiYoclt0XT1hcmd1bWVudHNbZV1bdF0pO3JldHVybiByfSxhLnByZXBhcmVDb250ZW50PWZ1bmN0aW9uKHIsZSxuLGkscyl7cmV0dXJuIHUuUHJvbWlzZS5yZXNvbHZlKGUpLnRoZW4oZnVuY3Rpb24obil7cmV0dXJuIG8uYmxvYiYmKG4gaW5zdGFuY2VvZiBCbG9ifHwtMSE9PVtcIltvYmplY3QgRmlsZV1cIixcIltvYmplY3QgQmxvYl1cIl0uaW5kZXhPZihPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobikpKT92b2lkIDAhPT1CbG9iLnByb3RvdHlwZS5hcnJheUJ1ZmZlcj9uLmFycmF5QnVmZmVyKCk6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIEZpbGVSZWFkZXI/bmV3IHUuUHJvbWlzZShmdW5jdGlvbih0LHIpe3ZhciBlPW5ldyBGaWxlUmVhZGVyO2Uub25sb2FkPWZ1bmN0aW9uKGUpe3QoZS50YXJnZXQucmVzdWx0KX0sZS5vbmVycm9yPWZ1bmN0aW9uKGUpe3IoZS50YXJnZXQuZXJyb3IpfSxlLnJlYWRBc0FycmF5QnVmZmVyKG4pfSk6dS5Qcm9taXNlLnJlamVjdChuZXcgRXJyb3IocitcIiBpcyBhIEJsb2IsIGJ1dCB3ZSBoYXZlIG5vIHdheSBvZiByZWFkaW5nIGl0LlwiKSk6bn0pLnRoZW4oZnVuY3Rpb24oZSl7dmFyIHQ9YS5nZXRUeXBlT2YoZSk7cmV0dXJuIHQ/KFwiYXJyYXlidWZmZXJcIj09PXQ/ZT1hLnRyYW5zZm9ybVRvKFwidWludDhhcnJheVwiLGUpOlwic3RyaW5nXCI9PT10JiYocz9lPWguZGVjb2RlKGUpOm4mJiEwIT09aSYmKGU9ZnVuY3Rpb24oZSl7cmV0dXJuIGwoZSxvLnVpbnQ4YXJyYXk/bmV3IFVpbnQ4QXJyYXkoZS5sZW5ndGgpOm5ldyBBcnJheShlLmxlbmd0aCkpfShlKSkpLGUpOnUuUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiQ2FuJ3QgcmVhZCB0aGUgZGF0YSBvZiAnXCIrcitcIicuIElzIGl0IGluIGEgc3VwcG9ydGVkIEphdmFTY3JpcHQgdHlwZSAoU3RyaW5nLCBCbG9iLCBBcnJheUJ1ZmZlciwgZXRjKSA/XCIpKX0pfX0se1wiLi9iYXNlNjRcIjoxLFwiLi9leHRlcm5hbFwiOjYsXCIuL25vZGVqc1V0aWxzXCI6MTQsXCIuL3N1cHBvcnRcIjozMCxzZXRpbW1lZGlhdGU6NTR9XSwzMzpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3ZhciBuPWUoXCIuL3JlYWRlci9yZWFkZXJGb3JcIiksaT1lKFwiLi91dGlsc1wiKSxzPWUoXCIuL3NpZ25hdHVyZVwiKSxhPWUoXCIuL3ppcEVudHJ5XCIpLG89ZShcIi4vc3VwcG9ydFwiKTtmdW5jdGlvbiBoKGUpe3RoaXMuZmlsZXM9W10sdGhpcy5sb2FkT3B0aW9ucz1lfWgucHJvdG90eXBlPXtjaGVja1NpZ25hdHVyZTpmdW5jdGlvbihlKXtpZighdGhpcy5yZWFkZXIucmVhZEFuZENoZWNrU2lnbmF0dXJlKGUpKXt0aGlzLnJlYWRlci5pbmRleC09NDt2YXIgdD10aGlzLnJlYWRlci5yZWFkU3RyaW5nKDQpO3Rocm93IG5ldyBFcnJvcihcIkNvcnJ1cHRlZCB6aXAgb3IgYnVnOiB1bmV4cGVjdGVkIHNpZ25hdHVyZSAoXCIraS5wcmV0dHkodCkrXCIsIGV4cGVjdGVkIFwiK2kucHJldHR5KGUpK1wiKVwiKX19LGlzU2lnbmF0dXJlOmZ1bmN0aW9uKGUsdCl7dmFyIHI9dGhpcy5yZWFkZXIuaW5kZXg7dGhpcy5yZWFkZXIuc2V0SW5kZXgoZSk7dmFyIG49dGhpcy5yZWFkZXIucmVhZFN0cmluZyg0KT09PXQ7cmV0dXJuIHRoaXMucmVhZGVyLnNldEluZGV4KHIpLG59LHJlYWRCbG9ja0VuZE9mQ2VudHJhbDpmdW5jdGlvbigpe3RoaXMuZGlza051bWJlcj10aGlzLnJlYWRlci5yZWFkSW50KDIpLHRoaXMuZGlza1dpdGhDZW50cmFsRGlyU3RhcnQ9dGhpcy5yZWFkZXIucmVhZEludCgyKSx0aGlzLmNlbnRyYWxEaXJSZWNvcmRzT25UaGlzRGlzaz10aGlzLnJlYWRlci5yZWFkSW50KDIpLHRoaXMuY2VudHJhbERpclJlY29yZHM9dGhpcy5yZWFkZXIucmVhZEludCgyKSx0aGlzLmNlbnRyYWxEaXJTaXplPXRoaXMucmVhZGVyLnJlYWRJbnQoNCksdGhpcy5jZW50cmFsRGlyT2Zmc2V0PXRoaXMucmVhZGVyLnJlYWRJbnQoNCksdGhpcy56aXBDb21tZW50TGVuZ3RoPXRoaXMucmVhZGVyLnJlYWRJbnQoMik7dmFyIGU9dGhpcy5yZWFkZXIucmVhZERhdGEodGhpcy56aXBDb21tZW50TGVuZ3RoKSx0PW8udWludDhhcnJheT9cInVpbnQ4YXJyYXlcIjpcImFycmF5XCIscj1pLnRyYW5zZm9ybVRvKHQsZSk7dGhpcy56aXBDb21tZW50PXRoaXMubG9hZE9wdGlvbnMuZGVjb2RlRmlsZU5hbWUocil9LHJlYWRCbG9ja1ppcDY0RW5kT2ZDZW50cmFsOmZ1bmN0aW9uKCl7dGhpcy56aXA2NEVuZE9mQ2VudHJhbFNpemU9dGhpcy5yZWFkZXIucmVhZEludCg4KSx0aGlzLnJlYWRlci5za2lwKDQpLHRoaXMuZGlza051bWJlcj10aGlzLnJlYWRlci5yZWFkSW50KDQpLHRoaXMuZGlza1dpdGhDZW50cmFsRGlyU3RhcnQ9dGhpcy5yZWFkZXIucmVhZEludCg0KSx0aGlzLmNlbnRyYWxEaXJSZWNvcmRzT25UaGlzRGlzaz10aGlzLnJlYWRlci5yZWFkSW50KDgpLHRoaXMuY2VudHJhbERpclJlY29yZHM9dGhpcy5yZWFkZXIucmVhZEludCg4KSx0aGlzLmNlbnRyYWxEaXJTaXplPXRoaXMucmVhZGVyLnJlYWRJbnQoOCksdGhpcy5jZW50cmFsRGlyT2Zmc2V0PXRoaXMucmVhZGVyLnJlYWRJbnQoOCksdGhpcy56aXA2NEV4dGVuc2libGVEYXRhPXt9O2Zvcih2YXIgZSx0LHIsbj10aGlzLnppcDY0RW5kT2ZDZW50cmFsU2l6ZS00NDswPG47KWU9dGhpcy5yZWFkZXIucmVhZEludCgyKSx0PXRoaXMucmVhZGVyLnJlYWRJbnQoNCkscj10aGlzLnJlYWRlci5yZWFkRGF0YSh0KSx0aGlzLnppcDY0RXh0ZW5zaWJsZURhdGFbZV09e2lkOmUsbGVuZ3RoOnQsdmFsdWU6cn19LHJlYWRCbG9ja1ppcDY0RW5kT2ZDZW50cmFsTG9jYXRvcjpmdW5jdGlvbigpe2lmKHRoaXMuZGlza1dpdGhaaXA2NENlbnRyYWxEaXJTdGFydD10aGlzLnJlYWRlci5yZWFkSW50KDQpLHRoaXMucmVsYXRpdmVPZmZzZXRFbmRPZlppcDY0Q2VudHJhbERpcj10aGlzLnJlYWRlci5yZWFkSW50KDgpLHRoaXMuZGlza3NDb3VudD10aGlzLnJlYWRlci5yZWFkSW50KDQpLDE8dGhpcy5kaXNrc0NvdW50KXRocm93IG5ldyBFcnJvcihcIk11bHRpLXZvbHVtZXMgemlwIGFyZSBub3Qgc3VwcG9ydGVkXCIpfSxyZWFkTG9jYWxGaWxlczpmdW5jdGlvbigpe3ZhciBlLHQ7Zm9yKGU9MDtlPHRoaXMuZmlsZXMubGVuZ3RoO2UrKyl0PXRoaXMuZmlsZXNbZV0sdGhpcy5yZWFkZXIuc2V0SW5kZXgodC5sb2NhbEhlYWRlck9mZnNldCksdGhpcy5jaGVja1NpZ25hdHVyZShzLkxPQ0FMX0ZJTEVfSEVBREVSKSx0LnJlYWRMb2NhbFBhcnQodGhpcy5yZWFkZXIpLHQuaGFuZGxlVVRGOCgpLHQucHJvY2Vzc0F0dHJpYnV0ZXMoKX0scmVhZENlbnRyYWxEaXI6ZnVuY3Rpb24oKXt2YXIgZTtmb3IodGhpcy5yZWFkZXIuc2V0SW5kZXgodGhpcy5jZW50cmFsRGlyT2Zmc2V0KTt0aGlzLnJlYWRlci5yZWFkQW5kQ2hlY2tTaWduYXR1cmUocy5DRU5UUkFMX0ZJTEVfSEVBREVSKTspKGU9bmV3IGEoe3ppcDY0OnRoaXMuemlwNjR9LHRoaXMubG9hZE9wdGlvbnMpKS5yZWFkQ2VudHJhbFBhcnQodGhpcy5yZWFkZXIpLHRoaXMuZmlsZXMucHVzaChlKTtpZih0aGlzLmNlbnRyYWxEaXJSZWNvcmRzIT09dGhpcy5maWxlcy5sZW5ndGgmJjAhPT10aGlzLmNlbnRyYWxEaXJSZWNvcmRzJiYwPT09dGhpcy5maWxlcy5sZW5ndGgpdGhyb3cgbmV3IEVycm9yKFwiQ29ycnVwdGVkIHppcCBvciBidWc6IGV4cGVjdGVkIFwiK3RoaXMuY2VudHJhbERpclJlY29yZHMrXCIgcmVjb3JkcyBpbiBjZW50cmFsIGRpciwgZ290IFwiK3RoaXMuZmlsZXMubGVuZ3RoKX0scmVhZEVuZE9mQ2VudHJhbDpmdW5jdGlvbigpe3ZhciBlPXRoaXMucmVhZGVyLmxhc3RJbmRleE9mU2lnbmF0dXJlKHMuQ0VOVFJBTF9ESVJFQ1RPUllfRU5EKTtpZihlPDApdGhyb3chdGhpcy5pc1NpZ25hdHVyZSgwLHMuTE9DQUxfRklMRV9IRUFERVIpP25ldyBFcnJvcihcIkNhbid0IGZpbmQgZW5kIG9mIGNlbnRyYWwgZGlyZWN0b3J5IDogaXMgdGhpcyBhIHppcCBmaWxlID8gSWYgaXQgaXMsIHNlZSBodHRwczovL3N0dWsuZ2l0aHViLmlvL2pzemlwL2RvY3VtZW50YXRpb24vaG93dG8vcmVhZF96aXAuaHRtbFwiKTpuZXcgRXJyb3IoXCJDb3JydXB0ZWQgemlwOiBjYW4ndCBmaW5kIGVuZCBvZiBjZW50cmFsIGRpcmVjdG9yeVwiKTt0aGlzLnJlYWRlci5zZXRJbmRleChlKTt2YXIgdD1lO2lmKHRoaXMuY2hlY2tTaWduYXR1cmUocy5DRU5UUkFMX0RJUkVDVE9SWV9FTkQpLHRoaXMucmVhZEJsb2NrRW5kT2ZDZW50cmFsKCksdGhpcy5kaXNrTnVtYmVyPT09aS5NQVhfVkFMVUVfMTZCSVRTfHx0aGlzLmRpc2tXaXRoQ2VudHJhbERpclN0YXJ0PT09aS5NQVhfVkFMVUVfMTZCSVRTfHx0aGlzLmNlbnRyYWxEaXJSZWNvcmRzT25UaGlzRGlzaz09PWkuTUFYX1ZBTFVFXzE2QklUU3x8dGhpcy5jZW50cmFsRGlyUmVjb3Jkcz09PWkuTUFYX1ZBTFVFXzE2QklUU3x8dGhpcy5jZW50cmFsRGlyU2l6ZT09PWkuTUFYX1ZBTFVFXzMyQklUU3x8dGhpcy5jZW50cmFsRGlyT2Zmc2V0PT09aS5NQVhfVkFMVUVfMzJCSVRTKXtpZih0aGlzLnppcDY0PSEwLChlPXRoaXMucmVhZGVyLmxhc3RJbmRleE9mU2lnbmF0dXJlKHMuWklQNjRfQ0VOVFJBTF9ESVJFQ1RPUllfTE9DQVRPUikpPDApdGhyb3cgbmV3IEVycm9yKFwiQ29ycnVwdGVkIHppcDogY2FuJ3QgZmluZCB0aGUgWklQNjQgZW5kIG9mIGNlbnRyYWwgZGlyZWN0b3J5IGxvY2F0b3JcIik7aWYodGhpcy5yZWFkZXIuc2V0SW5kZXgoZSksdGhpcy5jaGVja1NpZ25hdHVyZShzLlpJUDY0X0NFTlRSQUxfRElSRUNUT1JZX0xPQ0FUT1IpLHRoaXMucmVhZEJsb2NrWmlwNjRFbmRPZkNlbnRyYWxMb2NhdG9yKCksIXRoaXMuaXNTaWduYXR1cmUodGhpcy5yZWxhdGl2ZU9mZnNldEVuZE9mWmlwNjRDZW50cmFsRGlyLHMuWklQNjRfQ0VOVFJBTF9ESVJFQ1RPUllfRU5EKSYmKHRoaXMucmVsYXRpdmVPZmZzZXRFbmRPZlppcDY0Q2VudHJhbERpcj10aGlzLnJlYWRlci5sYXN0SW5kZXhPZlNpZ25hdHVyZShzLlpJUDY0X0NFTlRSQUxfRElSRUNUT1JZX0VORCksdGhpcy5yZWxhdGl2ZU9mZnNldEVuZE9mWmlwNjRDZW50cmFsRGlyPDApKXRocm93IG5ldyBFcnJvcihcIkNvcnJ1cHRlZCB6aXA6IGNhbid0IGZpbmQgdGhlIFpJUDY0IGVuZCBvZiBjZW50cmFsIGRpcmVjdG9yeVwiKTt0aGlzLnJlYWRlci5zZXRJbmRleCh0aGlzLnJlbGF0aXZlT2Zmc2V0RW5kT2ZaaXA2NENlbnRyYWxEaXIpLHRoaXMuY2hlY2tTaWduYXR1cmUocy5aSVA2NF9DRU5UUkFMX0RJUkVDVE9SWV9FTkQpLHRoaXMucmVhZEJsb2NrWmlwNjRFbmRPZkNlbnRyYWwoKX12YXIgcj10aGlzLmNlbnRyYWxEaXJPZmZzZXQrdGhpcy5jZW50cmFsRGlyU2l6ZTt0aGlzLnppcDY0JiYocis9MjAscis9MTIrdGhpcy56aXA2NEVuZE9mQ2VudHJhbFNpemUpO3ZhciBuPXQtcjtpZigwPG4pdGhpcy5pc1NpZ25hdHVyZSh0LHMuQ0VOVFJBTF9GSUxFX0hFQURFUil8fCh0aGlzLnJlYWRlci56ZXJvPW4pO2Vsc2UgaWYobjwwKXRocm93IG5ldyBFcnJvcihcIkNvcnJ1cHRlZCB6aXA6IG1pc3NpbmcgXCIrTWF0aC5hYnMobikrXCIgYnl0ZXMuXCIpfSxwcmVwYXJlUmVhZGVyOmZ1bmN0aW9uKGUpe3RoaXMucmVhZGVyPW4oZSl9LGxvYWQ6ZnVuY3Rpb24oZSl7dGhpcy5wcmVwYXJlUmVhZGVyKGUpLHRoaXMucmVhZEVuZE9mQ2VudHJhbCgpLHRoaXMucmVhZENlbnRyYWxEaXIoKSx0aGlzLnJlYWRMb2NhbEZpbGVzKCl9fSx0LmV4cG9ydHM9aH0se1wiLi9yZWFkZXIvcmVhZGVyRm9yXCI6MjIsXCIuL3NpZ25hdHVyZVwiOjIzLFwiLi9zdXBwb3J0XCI6MzAsXCIuL3V0aWxzXCI6MzIsXCIuL3ppcEVudHJ5XCI6MzR9XSwzNDpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3ZhciBuPWUoXCIuL3JlYWRlci9yZWFkZXJGb3JcIikscz1lKFwiLi91dGlsc1wiKSxpPWUoXCIuL2NvbXByZXNzZWRPYmplY3RcIiksYT1lKFwiLi9jcmMzMlwiKSxvPWUoXCIuL3V0ZjhcIiksaD1lKFwiLi9jb21wcmVzc2lvbnNcIiksdT1lKFwiLi9zdXBwb3J0XCIpO2Z1bmN0aW9uIGwoZSx0KXt0aGlzLm9wdGlvbnM9ZSx0aGlzLmxvYWRPcHRpb25zPXR9bC5wcm90b3R5cGU9e2lzRW5jcnlwdGVkOmZ1bmN0aW9uKCl7cmV0dXJuIDE9PSgxJnRoaXMuYml0RmxhZyl9LHVzZVVURjg6ZnVuY3Rpb24oKXtyZXR1cm4gMjA0OD09KDIwNDgmdGhpcy5iaXRGbGFnKX0scmVhZExvY2FsUGFydDpmdW5jdGlvbihlKXt2YXIgdCxyO2lmKGUuc2tpcCgyMiksdGhpcy5maWxlTmFtZUxlbmd0aD1lLnJlYWRJbnQoMikscj1lLnJlYWRJbnQoMiksdGhpcy5maWxlTmFtZT1lLnJlYWREYXRhKHRoaXMuZmlsZU5hbWVMZW5ndGgpLGUuc2tpcChyKSwtMT09PXRoaXMuY29tcHJlc3NlZFNpemV8fC0xPT09dGhpcy51bmNvbXByZXNzZWRTaXplKXRocm93IG5ldyBFcnJvcihcIkJ1ZyBvciBjb3JydXB0ZWQgemlwIDogZGlkbid0IGdldCBlbm91Z2ggaW5mb3JtYXRpb24gZnJvbSB0aGUgY2VudHJhbCBkaXJlY3RvcnkgKGNvbXByZXNzZWRTaXplID09PSAtMSB8fCB1bmNvbXByZXNzZWRTaXplID09PSAtMSlcIik7aWYobnVsbD09PSh0PWZ1bmN0aW9uKGUpe2Zvcih2YXIgdCBpbiBoKWlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChoLHQpJiZoW3RdLm1hZ2ljPT09ZSlyZXR1cm4gaFt0XTtyZXR1cm4gbnVsbH0odGhpcy5jb21wcmVzc2lvbk1ldGhvZCkpKXRocm93IG5ldyBFcnJvcihcIkNvcnJ1cHRlZCB6aXAgOiBjb21wcmVzc2lvbiBcIitzLnByZXR0eSh0aGlzLmNvbXByZXNzaW9uTWV0aG9kKStcIiB1bmtub3duIChpbm5lciBmaWxlIDogXCIrcy50cmFuc2Zvcm1UbyhcInN0cmluZ1wiLHRoaXMuZmlsZU5hbWUpK1wiKVwiKTt0aGlzLmRlY29tcHJlc3NlZD1uZXcgaSh0aGlzLmNvbXByZXNzZWRTaXplLHRoaXMudW5jb21wcmVzc2VkU2l6ZSx0aGlzLmNyYzMyLHQsZS5yZWFkRGF0YSh0aGlzLmNvbXByZXNzZWRTaXplKSl9LHJlYWRDZW50cmFsUGFydDpmdW5jdGlvbihlKXt0aGlzLnZlcnNpb25NYWRlQnk9ZS5yZWFkSW50KDIpLGUuc2tpcCgyKSx0aGlzLmJpdEZsYWc9ZS5yZWFkSW50KDIpLHRoaXMuY29tcHJlc3Npb25NZXRob2Q9ZS5yZWFkU3RyaW5nKDIpLHRoaXMuZGF0ZT1lLnJlYWREYXRlKCksdGhpcy5jcmMzMj1lLnJlYWRJbnQoNCksdGhpcy5jb21wcmVzc2VkU2l6ZT1lLnJlYWRJbnQoNCksdGhpcy51bmNvbXByZXNzZWRTaXplPWUucmVhZEludCg0KTt2YXIgdD1lLnJlYWRJbnQoMik7aWYodGhpcy5leHRyYUZpZWxkc0xlbmd0aD1lLnJlYWRJbnQoMiksdGhpcy5maWxlQ29tbWVudExlbmd0aD1lLnJlYWRJbnQoMiksdGhpcy5kaXNrTnVtYmVyU3RhcnQ9ZS5yZWFkSW50KDIpLHRoaXMuaW50ZXJuYWxGaWxlQXR0cmlidXRlcz1lLnJlYWRJbnQoMiksdGhpcy5leHRlcm5hbEZpbGVBdHRyaWJ1dGVzPWUucmVhZEludCg0KSx0aGlzLmxvY2FsSGVhZGVyT2Zmc2V0PWUucmVhZEludCg0KSx0aGlzLmlzRW5jcnlwdGVkKCkpdGhyb3cgbmV3IEVycm9yKFwiRW5jcnlwdGVkIHppcCBhcmUgbm90IHN1cHBvcnRlZFwiKTtlLnNraXAodCksdGhpcy5yZWFkRXh0cmFGaWVsZHMoZSksdGhpcy5wYXJzZVpJUDY0RXh0cmFGaWVsZChlKSx0aGlzLmZpbGVDb21tZW50PWUucmVhZERhdGEodGhpcy5maWxlQ29tbWVudExlbmd0aCl9LHByb2Nlc3NBdHRyaWJ1dGVzOmZ1bmN0aW9uKCl7dGhpcy51bml4UGVybWlzc2lvbnM9bnVsbCx0aGlzLmRvc1Blcm1pc3Npb25zPW51bGw7dmFyIGU9dGhpcy52ZXJzaW9uTWFkZUJ5Pj44O3RoaXMuZGlyPSEhKDE2JnRoaXMuZXh0ZXJuYWxGaWxlQXR0cmlidXRlcyksMD09ZSYmKHRoaXMuZG9zUGVybWlzc2lvbnM9NjMmdGhpcy5leHRlcm5hbEZpbGVBdHRyaWJ1dGVzKSwzPT1lJiYodGhpcy51bml4UGVybWlzc2lvbnM9dGhpcy5leHRlcm5hbEZpbGVBdHRyaWJ1dGVzPj4xNiY2NTUzNSksdGhpcy5kaXJ8fFwiL1wiIT09dGhpcy5maWxlTmFtZVN0ci5zbGljZSgtMSl8fCh0aGlzLmRpcj0hMCl9LHBhcnNlWklQNjRFeHRyYUZpZWxkOmZ1bmN0aW9uKCl7aWYodGhpcy5leHRyYUZpZWxkc1sxXSl7dmFyIGU9bih0aGlzLmV4dHJhRmllbGRzWzFdLnZhbHVlKTt0aGlzLnVuY29tcHJlc3NlZFNpemU9PT1zLk1BWF9WQUxVRV8zMkJJVFMmJih0aGlzLnVuY29tcHJlc3NlZFNpemU9ZS5yZWFkSW50KDgpKSx0aGlzLmNvbXByZXNzZWRTaXplPT09cy5NQVhfVkFMVUVfMzJCSVRTJiYodGhpcy5jb21wcmVzc2VkU2l6ZT1lLnJlYWRJbnQoOCkpLHRoaXMubG9jYWxIZWFkZXJPZmZzZXQ9PT1zLk1BWF9WQUxVRV8zMkJJVFMmJih0aGlzLmxvY2FsSGVhZGVyT2Zmc2V0PWUucmVhZEludCg4KSksdGhpcy5kaXNrTnVtYmVyU3RhcnQ9PT1zLk1BWF9WQUxVRV8zMkJJVFMmJih0aGlzLmRpc2tOdW1iZXJTdGFydD1lLnJlYWRJbnQoNCkpfX0scmVhZEV4dHJhRmllbGRzOmZ1bmN0aW9uKGUpe3ZhciB0LHIsbixpPWUuaW5kZXgrdGhpcy5leHRyYUZpZWxkc0xlbmd0aDtmb3IodGhpcy5leHRyYUZpZWxkc3x8KHRoaXMuZXh0cmFGaWVsZHM9e30pO2UuaW5kZXgrNDxpOyl0PWUucmVhZEludCgyKSxyPWUucmVhZEludCgyKSxuPWUucmVhZERhdGEociksdGhpcy5leHRyYUZpZWxkc1t0XT17aWQ6dCxsZW5ndGg6cix2YWx1ZTpufTtlLnNldEluZGV4KGkpfSxoYW5kbGVVVEY4OmZ1bmN0aW9uKCl7dmFyIGU9dS51aW50OGFycmF5P1widWludDhhcnJheVwiOlwiYXJyYXlcIjtpZih0aGlzLnVzZVVURjgoKSl0aGlzLmZpbGVOYW1lU3RyPW8udXRmOGRlY29kZSh0aGlzLmZpbGVOYW1lKSx0aGlzLmZpbGVDb21tZW50U3RyPW8udXRmOGRlY29kZSh0aGlzLmZpbGVDb21tZW50KTtlbHNle3ZhciB0PXRoaXMuZmluZEV4dHJhRmllbGRVbmljb2RlUGF0aCgpO2lmKG51bGwhPT10KXRoaXMuZmlsZU5hbWVTdHI9dDtlbHNle3ZhciByPXMudHJhbnNmb3JtVG8oZSx0aGlzLmZpbGVOYW1lKTt0aGlzLmZpbGVOYW1lU3RyPXRoaXMubG9hZE9wdGlvbnMuZGVjb2RlRmlsZU5hbWUocil9dmFyIG49dGhpcy5maW5kRXh0cmFGaWVsZFVuaWNvZGVDb21tZW50KCk7aWYobnVsbCE9PW4pdGhpcy5maWxlQ29tbWVudFN0cj1uO2Vsc2V7dmFyIGk9cy50cmFuc2Zvcm1UbyhlLHRoaXMuZmlsZUNvbW1lbnQpO3RoaXMuZmlsZUNvbW1lbnRTdHI9dGhpcy5sb2FkT3B0aW9ucy5kZWNvZGVGaWxlTmFtZShpKX19fSxmaW5kRXh0cmFGaWVsZFVuaWNvZGVQYXRoOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcy5leHRyYUZpZWxkc1syODc4OV07aWYoZSl7dmFyIHQ9bihlLnZhbHVlKTtyZXR1cm4gMSE9PXQucmVhZEludCgxKT9udWxsOmEodGhpcy5maWxlTmFtZSkhPT10LnJlYWRJbnQoNCk/bnVsbDpvLnV0ZjhkZWNvZGUodC5yZWFkRGF0YShlLmxlbmd0aC01KSl9cmV0dXJuIG51bGx9LGZpbmRFeHRyYUZpZWxkVW5pY29kZUNvbW1lbnQ6ZnVuY3Rpb24oKXt2YXIgZT10aGlzLmV4dHJhRmllbGRzWzI1NDYxXTtpZihlKXt2YXIgdD1uKGUudmFsdWUpO3JldHVybiAxIT09dC5yZWFkSW50KDEpP251bGw6YSh0aGlzLmZpbGVDb21tZW50KSE9PXQucmVhZEludCg0KT9udWxsOm8udXRmOGRlY29kZSh0LnJlYWREYXRhKGUubGVuZ3RoLTUpKX1yZXR1cm4gbnVsbH19LHQuZXhwb3J0cz1sfSx7XCIuL2NvbXByZXNzZWRPYmplY3RcIjoyLFwiLi9jb21wcmVzc2lvbnNcIjozLFwiLi9jcmMzMlwiOjQsXCIuL3JlYWRlci9yZWFkZXJGb3JcIjoyMixcIi4vc3VwcG9ydFwiOjMwLFwiLi91dGY4XCI6MzEsXCIuL3V0aWxzXCI6MzJ9XSwzNTpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIG4oZSx0LHIpe3RoaXMubmFtZT1lLHRoaXMuZGlyPXIuZGlyLHRoaXMuZGF0ZT1yLmRhdGUsdGhpcy5jb21tZW50PXIuY29tbWVudCx0aGlzLnVuaXhQZXJtaXNzaW9ucz1yLnVuaXhQZXJtaXNzaW9ucyx0aGlzLmRvc1Blcm1pc3Npb25zPXIuZG9zUGVybWlzc2lvbnMsdGhpcy5fZGF0YT10LHRoaXMuX2RhdGFCaW5hcnk9ci5iaW5hcnksdGhpcy5vcHRpb25zPXtjb21wcmVzc2lvbjpyLmNvbXByZXNzaW9uLGNvbXByZXNzaW9uT3B0aW9uczpyLmNvbXByZXNzaW9uT3B0aW9uc319dmFyIHM9ZShcIi4vc3RyZWFtL1N0cmVhbUhlbHBlclwiKSxpPWUoXCIuL3N0cmVhbS9EYXRhV29ya2VyXCIpLGE9ZShcIi4vdXRmOFwiKSxvPWUoXCIuL2NvbXByZXNzZWRPYmplY3RcIiksaD1lKFwiLi9zdHJlYW0vR2VuZXJpY1dvcmtlclwiKTtuLnByb3RvdHlwZT17aW50ZXJuYWxTdHJlYW06ZnVuY3Rpb24oZSl7dmFyIHQ9bnVsbCxyPVwic3RyaW5nXCI7dHJ5e2lmKCFlKXRocm93IG5ldyBFcnJvcihcIk5vIG91dHB1dCB0eXBlIHNwZWNpZmllZC5cIik7dmFyIG49XCJzdHJpbmdcIj09PShyPWUudG9Mb3dlckNhc2UoKSl8fFwidGV4dFwiPT09cjtcImJpbmFyeXN0cmluZ1wiIT09ciYmXCJ0ZXh0XCIhPT1yfHwocj1cInN0cmluZ1wiKSx0PXRoaXMuX2RlY29tcHJlc3NXb3JrZXIoKTt2YXIgaT0hdGhpcy5fZGF0YUJpbmFyeTtpJiYhbiYmKHQ9dC5waXBlKG5ldyBhLlV0ZjhFbmNvZGVXb3JrZXIpKSwhaSYmbiYmKHQ9dC5waXBlKG5ldyBhLlV0ZjhEZWNvZGVXb3JrZXIpKX1jYXRjaChlKXsodD1uZXcgaChcImVycm9yXCIpKS5lcnJvcihlKX1yZXR1cm4gbmV3IHModCxyLFwiXCIpfSxhc3luYzpmdW5jdGlvbihlLHQpe3JldHVybiB0aGlzLmludGVybmFsU3RyZWFtKGUpLmFjY3VtdWxhdGUodCl9LG5vZGVTdHJlYW06ZnVuY3Rpb24oZSx0KXtyZXR1cm4gdGhpcy5pbnRlcm5hbFN0cmVhbShlfHxcIm5vZGVidWZmZXJcIikudG9Ob2RlanNTdHJlYW0odCl9LF9jb21wcmVzc1dvcmtlcjpmdW5jdGlvbihlLHQpe2lmKHRoaXMuX2RhdGEgaW5zdGFuY2VvZiBvJiZ0aGlzLl9kYXRhLmNvbXByZXNzaW9uLm1hZ2ljPT09ZS5tYWdpYylyZXR1cm4gdGhpcy5fZGF0YS5nZXRDb21wcmVzc2VkV29ya2VyKCk7dmFyIHI9dGhpcy5fZGVjb21wcmVzc1dvcmtlcigpO3JldHVybiB0aGlzLl9kYXRhQmluYXJ5fHwocj1yLnBpcGUobmV3IGEuVXRmOEVuY29kZVdvcmtlcikpLG8uY3JlYXRlV29ya2VyRnJvbShyLGUsdCl9LF9kZWNvbXByZXNzV29ya2VyOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuX2RhdGEgaW5zdGFuY2VvZiBvP3RoaXMuX2RhdGEuZ2V0Q29udGVudFdvcmtlcigpOnRoaXMuX2RhdGEgaW5zdGFuY2VvZiBoP3RoaXMuX2RhdGE6bmV3IGkodGhpcy5fZGF0YSl9fTtmb3IodmFyIHU9W1wiYXNUZXh0XCIsXCJhc0JpbmFyeVwiLFwiYXNOb2RlQnVmZmVyXCIsXCJhc1VpbnQ4QXJyYXlcIixcImFzQXJyYXlCdWZmZXJcIl0sbD1mdW5jdGlvbigpe3Rocm93IG5ldyBFcnJvcihcIlRoaXMgbWV0aG9kIGhhcyBiZWVuIHJlbW92ZWQgaW4gSlNaaXAgMy4wLCBwbGVhc2UgY2hlY2sgdGhlIHVwZ3JhZGUgZ3VpZGUuXCIpfSxmPTA7Zjx1Lmxlbmd0aDtmKyspbi5wcm90b3R5cGVbdVtmXV09bDt0LmV4cG9ydHM9bn0se1wiLi9jb21wcmVzc2VkT2JqZWN0XCI6MixcIi4vc3RyZWFtL0RhdGFXb3JrZXJcIjoyNyxcIi4vc3RyZWFtL0dlbmVyaWNXb3JrZXJcIjoyOCxcIi4vc3RyZWFtL1N0cmVhbUhlbHBlclwiOjI5LFwiLi91dGY4XCI6MzF9XSwzNjpbZnVuY3Rpb24oZSxsLHQpeyhmdW5jdGlvbih0KXtcInVzZSBzdHJpY3RcIjt2YXIgcixuLGU9dC5NdXRhdGlvbk9ic2VydmVyfHx0LldlYktpdE11dGF0aW9uT2JzZXJ2ZXI7aWYoZSl7dmFyIGk9MCxzPW5ldyBlKHUpLGE9dC5kb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIlwiKTtzLm9ic2VydmUoYSx7Y2hhcmFjdGVyRGF0YTohMH0pLHI9ZnVuY3Rpb24oKXthLmRhdGE9aT0rK2klMn19ZWxzZSBpZih0LnNldEltbWVkaWF0ZXx8dm9pZCAwPT09dC5NZXNzYWdlQ2hhbm5lbClyPVwiZG9jdW1lbnRcImluIHQmJlwib25yZWFkeXN0YXRlY2hhbmdlXCJpbiB0LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik/ZnVuY3Rpb24oKXt2YXIgZT10LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7ZS5vbnJlYWR5c3RhdGVjaGFuZ2U9ZnVuY3Rpb24oKXt1KCksZS5vbnJlYWR5c3RhdGVjaGFuZ2U9bnVsbCxlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZSksZT1udWxsfSx0LmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hcHBlbmRDaGlsZChlKX06ZnVuY3Rpb24oKXtzZXRUaW1lb3V0KHUsMCl9O2Vsc2V7dmFyIG89bmV3IHQuTWVzc2FnZUNoYW5uZWw7by5wb3J0MS5vbm1lc3NhZ2U9dSxyPWZ1bmN0aW9uKCl7by5wb3J0Mi5wb3N0TWVzc2FnZSgwKX19dmFyIGg9W107ZnVuY3Rpb24gdSgpe3ZhciBlLHQ7bj0hMDtmb3IodmFyIHI9aC5sZW5ndGg7cjspe2Zvcih0PWgsaD1bXSxlPS0xOysrZTxyOyl0W2VdKCk7cj1oLmxlbmd0aH1uPSExfWwuZXhwb3J0cz1mdW5jdGlvbihlKXsxIT09aC5wdXNoKGUpfHxufHxyKCl9fSkuY2FsbCh0aGlzLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBnbG9iYWw/Z2xvYmFsOlwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmP3NlbGY6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdz93aW5kb3c6e30pfSx7fV0sMzc6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt2YXIgaT1lKFwiaW1tZWRpYXRlXCIpO2Z1bmN0aW9uIHUoKXt9dmFyIGw9e30scz1bXCJSRUpFQ1RFRFwiXSxhPVtcIkZVTEZJTExFRFwiXSxuPVtcIlBFTkRJTkdcIl07ZnVuY3Rpb24gbyhlKXtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiBlKXRocm93IG5ldyBUeXBlRXJyb3IoXCJyZXNvbHZlciBtdXN0IGJlIGEgZnVuY3Rpb25cIik7dGhpcy5zdGF0ZT1uLHRoaXMucXVldWU9W10sdGhpcy5vdXRjb21lPXZvaWQgMCxlIT09dSYmZCh0aGlzLGUpfWZ1bmN0aW9uIGgoZSx0LHIpe3RoaXMucHJvbWlzZT1lLFwiZnVuY3Rpb25cIj09dHlwZW9mIHQmJih0aGlzLm9uRnVsZmlsbGVkPXQsdGhpcy5jYWxsRnVsZmlsbGVkPXRoaXMub3RoZXJDYWxsRnVsZmlsbGVkKSxcImZ1bmN0aW9uXCI9PXR5cGVvZiByJiYodGhpcy5vblJlamVjdGVkPXIsdGhpcy5jYWxsUmVqZWN0ZWQ9dGhpcy5vdGhlckNhbGxSZWplY3RlZCl9ZnVuY3Rpb24gZih0LHIsbil7aShmdW5jdGlvbigpe3ZhciBlO3RyeXtlPXIobil9Y2F0Y2goZSl7cmV0dXJuIGwucmVqZWN0KHQsZSl9ZT09PXQ/bC5yZWplY3QodCxuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHJlc29sdmUgcHJvbWlzZSB3aXRoIGl0c2VsZlwiKSk6bC5yZXNvbHZlKHQsZSl9KX1mdW5jdGlvbiBjKGUpe3ZhciB0PWUmJmUudGhlbjtpZihlJiYoXCJvYmplY3RcIj09dHlwZW9mIGV8fFwiZnVuY3Rpb25cIj09dHlwZW9mIGUpJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiB0KXJldHVybiBmdW5jdGlvbigpe3QuYXBwbHkoZSxhcmd1bWVudHMpfX1mdW5jdGlvbiBkKHQsZSl7dmFyIHI9ITE7ZnVuY3Rpb24gbihlKXtyfHwocj0hMCxsLnJlamVjdCh0LGUpKX1mdW5jdGlvbiBpKGUpe3J8fChyPSEwLGwucmVzb2x2ZSh0LGUpKX12YXIgcz1wKGZ1bmN0aW9uKCl7ZShpLG4pfSk7XCJlcnJvclwiPT09cy5zdGF0dXMmJm4ocy52YWx1ZSl9ZnVuY3Rpb24gcChlLHQpe3ZhciByPXt9O3RyeXtyLnZhbHVlPWUodCksci5zdGF0dXM9XCJzdWNjZXNzXCJ9Y2F0Y2goZSl7ci5zdGF0dXM9XCJlcnJvclwiLHIudmFsdWU9ZX1yZXR1cm4gcn0odC5leHBvcnRzPW8pLnByb3RvdHlwZS5maW5hbGx5PWZ1bmN0aW9uKHQpe2lmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIHQpcmV0dXJuIHRoaXM7dmFyIHI9dGhpcy5jb25zdHJ1Y3RvcjtyZXR1cm4gdGhpcy50aGVuKGZ1bmN0aW9uKGUpe3JldHVybiByLnJlc29sdmUodCgpKS50aGVuKGZ1bmN0aW9uKCl7cmV0dXJuIGV9KX0sZnVuY3Rpb24oZSl7cmV0dXJuIHIucmVzb2x2ZSh0KCkpLnRoZW4oZnVuY3Rpb24oKXt0aHJvdyBlfSl9KX0sby5wcm90b3R5cGUuY2F0Y2g9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMudGhlbihudWxsLGUpfSxvLnByb3RvdHlwZS50aGVuPWZ1bmN0aW9uKGUsdCl7aWYoXCJmdW5jdGlvblwiIT10eXBlb2YgZSYmdGhpcy5zdGF0ZT09PWF8fFwiZnVuY3Rpb25cIiE9dHlwZW9mIHQmJnRoaXMuc3RhdGU9PT1zKXJldHVybiB0aGlzO3ZhciByPW5ldyB0aGlzLmNvbnN0cnVjdG9yKHUpO3RoaXMuc3RhdGUhPT1uP2Yocix0aGlzLnN0YXRlPT09YT9lOnQsdGhpcy5vdXRjb21lKTp0aGlzLnF1ZXVlLnB1c2gobmV3IGgocixlLHQpKTtyZXR1cm4gcn0saC5wcm90b3R5cGUuY2FsbEZ1bGZpbGxlZD1mdW5jdGlvbihlKXtsLnJlc29sdmUodGhpcy5wcm9taXNlLGUpfSxoLnByb3RvdHlwZS5vdGhlckNhbGxGdWxmaWxsZWQ9ZnVuY3Rpb24oZSl7Zih0aGlzLnByb21pc2UsdGhpcy5vbkZ1bGZpbGxlZCxlKX0saC5wcm90b3R5cGUuY2FsbFJlamVjdGVkPWZ1bmN0aW9uKGUpe2wucmVqZWN0KHRoaXMucHJvbWlzZSxlKX0saC5wcm90b3R5cGUub3RoZXJDYWxsUmVqZWN0ZWQ9ZnVuY3Rpb24oZSl7Zih0aGlzLnByb21pc2UsdGhpcy5vblJlamVjdGVkLGUpfSxsLnJlc29sdmU9ZnVuY3Rpb24oZSx0KXt2YXIgcj1wKGMsdCk7aWYoXCJlcnJvclwiPT09ci5zdGF0dXMpcmV0dXJuIGwucmVqZWN0KGUsci52YWx1ZSk7dmFyIG49ci52YWx1ZTtpZihuKWQoZSxuKTtlbHNle2Uuc3RhdGU9YSxlLm91dGNvbWU9dDtmb3IodmFyIGk9LTEscz1lLnF1ZXVlLmxlbmd0aDsrK2k8czspZS5xdWV1ZVtpXS5jYWxsRnVsZmlsbGVkKHQpfXJldHVybiBlfSxsLnJlamVjdD1mdW5jdGlvbihlLHQpe2Uuc3RhdGU9cyxlLm91dGNvbWU9dDtmb3IodmFyIHI9LTEsbj1lLnF1ZXVlLmxlbmd0aDsrK3I8bjspZS5xdWV1ZVtyXS5jYWxsUmVqZWN0ZWQodCk7cmV0dXJuIGV9LG8ucmVzb2x2ZT1mdW5jdGlvbihlKXtpZihlIGluc3RhbmNlb2YgdGhpcylyZXR1cm4gZTtyZXR1cm4gbC5yZXNvbHZlKG5ldyB0aGlzKHUpLGUpfSxvLnJlamVjdD1mdW5jdGlvbihlKXt2YXIgdD1uZXcgdGhpcyh1KTtyZXR1cm4gbC5yZWplY3QodCxlKX0sby5hbGw9ZnVuY3Rpb24oZSl7dmFyIHI9dGhpcztpZihcIltvYmplY3QgQXJyYXldXCIhPT1PYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZSkpcmV0dXJuIHRoaXMucmVqZWN0KG5ldyBUeXBlRXJyb3IoXCJtdXN0IGJlIGFuIGFycmF5XCIpKTt2YXIgbj1lLmxlbmd0aCxpPSExO2lmKCFuKXJldHVybiB0aGlzLnJlc29sdmUoW10pO3ZhciBzPW5ldyBBcnJheShuKSxhPTAsdD0tMSxvPW5ldyB0aGlzKHUpO2Zvcig7Kyt0PG47KWgoZVt0XSx0KTtyZXR1cm4gbztmdW5jdGlvbiBoKGUsdCl7ci5yZXNvbHZlKGUpLnRoZW4oZnVuY3Rpb24oZSl7c1t0XT1lLCsrYSE9PW58fGl8fChpPSEwLGwucmVzb2x2ZShvLHMpKX0sZnVuY3Rpb24oZSl7aXx8KGk9ITAsbC5yZWplY3QobyxlKSl9KX19LG8ucmFjZT1mdW5jdGlvbihlKXt2YXIgdD10aGlzO2lmKFwiW29iamVjdCBBcnJheV1cIiE9PU9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChlKSlyZXR1cm4gdGhpcy5yZWplY3QobmV3IFR5cGVFcnJvcihcIm11c3QgYmUgYW4gYXJyYXlcIikpO3ZhciByPWUubGVuZ3RoLG49ITE7aWYoIXIpcmV0dXJuIHRoaXMucmVzb2x2ZShbXSk7dmFyIGk9LTEscz1uZXcgdGhpcyh1KTtmb3IoOysraTxyOylhPWVbaV0sdC5yZXNvbHZlKGEpLnRoZW4oZnVuY3Rpb24oZSl7bnx8KG49ITAsbC5yZXNvbHZlKHMsZSkpfSxmdW5jdGlvbihlKXtufHwobj0hMCxsLnJlamVjdChzLGUpKX0pO3ZhciBhO3JldHVybiBzfX0se2ltbWVkaWF0ZTozNn1dLDM4OltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7dmFyIG49e307KDAsZShcIi4vbGliL3V0aWxzL2NvbW1vblwiKS5hc3NpZ24pKG4sZShcIi4vbGliL2RlZmxhdGVcIiksZShcIi4vbGliL2luZmxhdGVcIiksZShcIi4vbGliL3psaWIvY29uc3RhbnRzXCIpKSx0LmV4cG9ydHM9bn0se1wiLi9saWIvZGVmbGF0ZVwiOjM5LFwiLi9saWIvaW5mbGF0ZVwiOjQwLFwiLi9saWIvdXRpbHMvY29tbW9uXCI6NDEsXCIuL2xpYi96bGliL2NvbnN0YW50c1wiOjQ0fV0sMzk6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt2YXIgYT1lKFwiLi96bGliL2RlZmxhdGVcIiksbz1lKFwiLi91dGlscy9jb21tb25cIiksaD1lKFwiLi91dGlscy9zdHJpbmdzXCIpLGk9ZShcIi4vemxpYi9tZXNzYWdlc1wiKSxzPWUoXCIuL3psaWIvenN0cmVhbVwiKSx1PU9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcsbD0wLGY9LTEsYz0wLGQ9ODtmdW5jdGlvbiBwKGUpe2lmKCEodGhpcyBpbnN0YW5jZW9mIHApKXJldHVybiBuZXcgcChlKTt0aGlzLm9wdGlvbnM9by5hc3NpZ24oe2xldmVsOmYsbWV0aG9kOmQsY2h1bmtTaXplOjE2Mzg0LHdpbmRvd0JpdHM6MTUsbWVtTGV2ZWw6OCxzdHJhdGVneTpjLHRvOlwiXCJ9LGV8fHt9KTt2YXIgdD10aGlzLm9wdGlvbnM7dC5yYXcmJjA8dC53aW5kb3dCaXRzP3Qud2luZG93Qml0cz0tdC53aW5kb3dCaXRzOnQuZ3ppcCYmMDx0LndpbmRvd0JpdHMmJnQud2luZG93Qml0czwxNiYmKHQud2luZG93Qml0cys9MTYpLHRoaXMuZXJyPTAsdGhpcy5tc2c9XCJcIix0aGlzLmVuZGVkPSExLHRoaXMuY2h1bmtzPVtdLHRoaXMuc3RybT1uZXcgcyx0aGlzLnN0cm0uYXZhaWxfb3V0PTA7dmFyIHI9YS5kZWZsYXRlSW5pdDIodGhpcy5zdHJtLHQubGV2ZWwsdC5tZXRob2QsdC53aW5kb3dCaXRzLHQubWVtTGV2ZWwsdC5zdHJhdGVneSk7aWYociE9PWwpdGhyb3cgbmV3IEVycm9yKGlbcl0pO2lmKHQuaGVhZGVyJiZhLmRlZmxhdGVTZXRIZWFkZXIodGhpcy5zdHJtLHQuaGVhZGVyKSx0LmRpY3Rpb25hcnkpe3ZhciBuO2lmKG49XCJzdHJpbmdcIj09dHlwZW9mIHQuZGljdGlvbmFyeT9oLnN0cmluZzJidWYodC5kaWN0aW9uYXJ5KTpcIltvYmplY3QgQXJyYXlCdWZmZXJdXCI9PT11LmNhbGwodC5kaWN0aW9uYXJ5KT9uZXcgVWludDhBcnJheSh0LmRpY3Rpb25hcnkpOnQuZGljdGlvbmFyeSwocj1hLmRlZmxhdGVTZXREaWN0aW9uYXJ5KHRoaXMuc3RybSxuKSkhPT1sKXRocm93IG5ldyBFcnJvcihpW3JdKTt0aGlzLl9kaWN0X3NldD0hMH19ZnVuY3Rpb24gbihlLHQpe3ZhciByPW5ldyBwKHQpO2lmKHIucHVzaChlLCEwKSxyLmVycil0aHJvdyByLm1zZ3x8aVtyLmVycl07cmV0dXJuIHIucmVzdWx0fXAucHJvdG90eXBlLnB1c2g9ZnVuY3Rpb24oZSx0KXt2YXIgcixuLGk9dGhpcy5zdHJtLHM9dGhpcy5vcHRpb25zLmNodW5rU2l6ZTtpZih0aGlzLmVuZGVkKXJldHVybiExO249dD09PX5+dD90OiEwPT09dD80OjAsXCJzdHJpbmdcIj09dHlwZW9mIGU/aS5pbnB1dD1oLnN0cmluZzJidWYoZSk6XCJbb2JqZWN0IEFycmF5QnVmZmVyXVwiPT09dS5jYWxsKGUpP2kuaW5wdXQ9bmV3IFVpbnQ4QXJyYXkoZSk6aS5pbnB1dD1lLGkubmV4dF9pbj0wLGkuYXZhaWxfaW49aS5pbnB1dC5sZW5ndGg7ZG97aWYoMD09PWkuYXZhaWxfb3V0JiYoaS5vdXRwdXQ9bmV3IG8uQnVmOChzKSxpLm5leHRfb3V0PTAsaS5hdmFpbF9vdXQ9cyksMSE9PShyPWEuZGVmbGF0ZShpLG4pKSYmciE9PWwpcmV0dXJuIHRoaXMub25FbmQociksISh0aGlzLmVuZGVkPSEwKTswIT09aS5hdmFpbF9vdXQmJigwIT09aS5hdmFpbF9pbnx8NCE9PW4mJjIhPT1uKXx8KFwic3RyaW5nXCI9PT10aGlzLm9wdGlvbnMudG8/dGhpcy5vbkRhdGEoaC5idWYyYmluc3RyaW5nKG8uc2hyaW5rQnVmKGkub3V0cHV0LGkubmV4dF9vdXQpKSk6dGhpcy5vbkRhdGEoby5zaHJpbmtCdWYoaS5vdXRwdXQsaS5uZXh0X291dCkpKX13aGlsZSgoMDxpLmF2YWlsX2lufHwwPT09aS5hdmFpbF9vdXQpJiYxIT09cik7cmV0dXJuIDQ9PT1uPyhyPWEuZGVmbGF0ZUVuZCh0aGlzLnN0cm0pLHRoaXMub25FbmQociksdGhpcy5lbmRlZD0hMCxyPT09bCk6MiE9PW58fCh0aGlzLm9uRW5kKGwpLCEoaS5hdmFpbF9vdXQ9MCkpfSxwLnByb3RvdHlwZS5vbkRhdGE9ZnVuY3Rpb24oZSl7dGhpcy5jaHVua3MucHVzaChlKX0scC5wcm90b3R5cGUub25FbmQ9ZnVuY3Rpb24oZSl7ZT09PWwmJihcInN0cmluZ1wiPT09dGhpcy5vcHRpb25zLnRvP3RoaXMucmVzdWx0PXRoaXMuY2h1bmtzLmpvaW4oXCJcIik6dGhpcy5yZXN1bHQ9by5mbGF0dGVuQ2h1bmtzKHRoaXMuY2h1bmtzKSksdGhpcy5jaHVua3M9W10sdGhpcy5lcnI9ZSx0aGlzLm1zZz10aGlzLnN0cm0ubXNnfSxyLkRlZmxhdGU9cCxyLmRlZmxhdGU9bixyLmRlZmxhdGVSYXc9ZnVuY3Rpb24oZSx0KXtyZXR1cm4odD10fHx7fSkucmF3PSEwLG4oZSx0KX0sci5nemlwPWZ1bmN0aW9uKGUsdCl7cmV0dXJuKHQ9dHx8e30pLmd6aXA9ITAsbihlLHQpfX0se1wiLi91dGlscy9jb21tb25cIjo0MSxcIi4vdXRpbHMvc3RyaW5nc1wiOjQyLFwiLi96bGliL2RlZmxhdGVcIjo0NixcIi4vemxpYi9tZXNzYWdlc1wiOjUxLFwiLi96bGliL3pzdHJlYW1cIjo1M31dLDQwOltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7dmFyIGM9ZShcIi4vemxpYi9pbmZsYXRlXCIpLGQ9ZShcIi4vdXRpbHMvY29tbW9uXCIpLHA9ZShcIi4vdXRpbHMvc3RyaW5nc1wiKSxtPWUoXCIuL3psaWIvY29uc3RhbnRzXCIpLG49ZShcIi4vemxpYi9tZXNzYWdlc1wiKSxpPWUoXCIuL3psaWIvenN0cmVhbVwiKSxzPWUoXCIuL3psaWIvZ3poZWFkZXJcIiksXz1PYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO2Z1bmN0aW9uIGEoZSl7aWYoISh0aGlzIGluc3RhbmNlb2YgYSkpcmV0dXJuIG5ldyBhKGUpO3RoaXMub3B0aW9ucz1kLmFzc2lnbih7Y2h1bmtTaXplOjE2Mzg0LHdpbmRvd0JpdHM6MCx0bzpcIlwifSxlfHx7fSk7dmFyIHQ9dGhpcy5vcHRpb25zO3QucmF3JiYwPD10LndpbmRvd0JpdHMmJnQud2luZG93Qml0czwxNiYmKHQud2luZG93Qml0cz0tdC53aW5kb3dCaXRzLDA9PT10LndpbmRvd0JpdHMmJih0LndpbmRvd0JpdHM9LTE1KSksISgwPD10LndpbmRvd0JpdHMmJnQud2luZG93Qml0czwxNil8fGUmJmUud2luZG93Qml0c3x8KHQud2luZG93Qml0cys9MzIpLDE1PHQud2luZG93Qml0cyYmdC53aW5kb3dCaXRzPDQ4JiYwPT0oMTUmdC53aW5kb3dCaXRzKSYmKHQud2luZG93Qml0c3w9MTUpLHRoaXMuZXJyPTAsdGhpcy5tc2c9XCJcIix0aGlzLmVuZGVkPSExLHRoaXMuY2h1bmtzPVtdLHRoaXMuc3RybT1uZXcgaSx0aGlzLnN0cm0uYXZhaWxfb3V0PTA7dmFyIHI9Yy5pbmZsYXRlSW5pdDIodGhpcy5zdHJtLHQud2luZG93Qml0cyk7aWYociE9PW0uWl9PSyl0aHJvdyBuZXcgRXJyb3IobltyXSk7dGhpcy5oZWFkZXI9bmV3IHMsYy5pbmZsYXRlR2V0SGVhZGVyKHRoaXMuc3RybSx0aGlzLmhlYWRlcil9ZnVuY3Rpb24gbyhlLHQpe3ZhciByPW5ldyBhKHQpO2lmKHIucHVzaChlLCEwKSxyLmVycil0aHJvdyByLm1zZ3x8bltyLmVycl07cmV0dXJuIHIucmVzdWx0fWEucHJvdG90eXBlLnB1c2g9ZnVuY3Rpb24oZSx0KXt2YXIgcixuLGkscyxhLG8saD10aGlzLnN0cm0sdT10aGlzLm9wdGlvbnMuY2h1bmtTaXplLGw9dGhpcy5vcHRpb25zLmRpY3Rpb25hcnksZj0hMTtpZih0aGlzLmVuZGVkKXJldHVybiExO249dD09PX5+dD90OiEwPT09dD9tLlpfRklOSVNIOm0uWl9OT19GTFVTSCxcInN0cmluZ1wiPT10eXBlb2YgZT9oLmlucHV0PXAuYmluc3RyaW5nMmJ1ZihlKTpcIltvYmplY3QgQXJyYXlCdWZmZXJdXCI9PT1fLmNhbGwoZSk/aC5pbnB1dD1uZXcgVWludDhBcnJheShlKTpoLmlucHV0PWUsaC5uZXh0X2luPTAsaC5hdmFpbF9pbj1oLmlucHV0Lmxlbmd0aDtkb3tpZigwPT09aC5hdmFpbF9vdXQmJihoLm91dHB1dD1uZXcgZC5CdWY4KHUpLGgubmV4dF9vdXQ9MCxoLmF2YWlsX291dD11KSwocj1jLmluZmxhdGUoaCxtLlpfTk9fRkxVU0gpKT09PW0uWl9ORUVEX0RJQ1QmJmwmJihvPVwic3RyaW5nXCI9PXR5cGVvZiBsP3Auc3RyaW5nMmJ1ZihsKTpcIltvYmplY3QgQXJyYXlCdWZmZXJdXCI9PT1fLmNhbGwobCk/bmV3IFVpbnQ4QXJyYXkobCk6bCxyPWMuaW5mbGF0ZVNldERpY3Rpb25hcnkodGhpcy5zdHJtLG8pKSxyPT09bS5aX0JVRl9FUlJPUiYmITA9PT1mJiYocj1tLlpfT0ssZj0hMSksciE9PW0uWl9TVFJFQU1fRU5EJiZyIT09bS5aX09LKXJldHVybiB0aGlzLm9uRW5kKHIpLCEodGhpcy5lbmRlZD0hMCk7aC5uZXh0X291dCYmKDAhPT1oLmF2YWlsX291dCYmciE9PW0uWl9TVFJFQU1fRU5EJiYoMCE9PWguYXZhaWxfaW58fG4hPT1tLlpfRklOSVNIJiZuIT09bS5aX1NZTkNfRkxVU0gpfHwoXCJzdHJpbmdcIj09PXRoaXMub3B0aW9ucy50bz8oaT1wLnV0Zjhib3JkZXIoaC5vdXRwdXQsaC5uZXh0X291dCkscz1oLm5leHRfb3V0LWksYT1wLmJ1ZjJzdHJpbmcoaC5vdXRwdXQsaSksaC5uZXh0X291dD1zLGguYXZhaWxfb3V0PXUtcyxzJiZkLmFycmF5U2V0KGgub3V0cHV0LGgub3V0cHV0LGkscywwKSx0aGlzLm9uRGF0YShhKSk6dGhpcy5vbkRhdGEoZC5zaHJpbmtCdWYoaC5vdXRwdXQsaC5uZXh0X291dCkpKSksMD09PWguYXZhaWxfaW4mJjA9PT1oLmF2YWlsX291dCYmKGY9ITApfXdoaWxlKCgwPGguYXZhaWxfaW58fDA9PT1oLmF2YWlsX291dCkmJnIhPT1tLlpfU1RSRUFNX0VORCk7cmV0dXJuIHI9PT1tLlpfU1RSRUFNX0VORCYmKG49bS5aX0ZJTklTSCksbj09PW0uWl9GSU5JU0g/KHI9Yy5pbmZsYXRlRW5kKHRoaXMuc3RybSksdGhpcy5vbkVuZChyKSx0aGlzLmVuZGVkPSEwLHI9PT1tLlpfT0spOm4hPT1tLlpfU1lOQ19GTFVTSHx8KHRoaXMub25FbmQobS5aX09LKSwhKGguYXZhaWxfb3V0PTApKX0sYS5wcm90b3R5cGUub25EYXRhPWZ1bmN0aW9uKGUpe3RoaXMuY2h1bmtzLnB1c2goZSl9LGEucHJvdG90eXBlLm9uRW5kPWZ1bmN0aW9uKGUpe2U9PT1tLlpfT0smJihcInN0cmluZ1wiPT09dGhpcy5vcHRpb25zLnRvP3RoaXMucmVzdWx0PXRoaXMuY2h1bmtzLmpvaW4oXCJcIik6dGhpcy5yZXN1bHQ9ZC5mbGF0dGVuQ2h1bmtzKHRoaXMuY2h1bmtzKSksdGhpcy5jaHVua3M9W10sdGhpcy5lcnI9ZSx0aGlzLm1zZz10aGlzLnN0cm0ubXNnfSxyLkluZmxhdGU9YSxyLmluZmxhdGU9byxyLmluZmxhdGVSYXc9ZnVuY3Rpb24oZSx0KXtyZXR1cm4odD10fHx7fSkucmF3PSEwLG8oZSx0KX0sci51bmd6aXA9b30se1wiLi91dGlscy9jb21tb25cIjo0MSxcIi4vdXRpbHMvc3RyaW5nc1wiOjQyLFwiLi96bGliL2NvbnN0YW50c1wiOjQ0LFwiLi96bGliL2d6aGVhZGVyXCI6NDcsXCIuL3psaWIvaW5mbGF0ZVwiOjQ5LFwiLi96bGliL21lc3NhZ2VzXCI6NTEsXCIuL3psaWIvenN0cmVhbVwiOjUzfV0sNDE6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt2YXIgbj1cInVuZGVmaW5lZFwiIT10eXBlb2YgVWludDhBcnJheSYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIFVpbnQxNkFycmF5JiZcInVuZGVmaW5lZFwiIT10eXBlb2YgSW50MzJBcnJheTtyLmFzc2lnbj1mdW5jdGlvbihlKXtmb3IodmFyIHQ9QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLDEpO3QubGVuZ3RoOyl7dmFyIHI9dC5zaGlmdCgpO2lmKHIpe2lmKFwib2JqZWN0XCIhPXR5cGVvZiByKXRocm93IG5ldyBUeXBlRXJyb3IocitcIm11c3QgYmUgbm9uLW9iamVjdFwiKTtmb3IodmFyIG4gaW4gcilyLmhhc093blByb3BlcnR5KG4pJiYoZVtuXT1yW25dKX19cmV0dXJuIGV9LHIuc2hyaW5rQnVmPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIGUubGVuZ3RoPT09dD9lOmUuc3ViYXJyYXk/ZS5zdWJhcnJheSgwLHQpOihlLmxlbmd0aD10LGUpfTt2YXIgaT17YXJyYXlTZXQ6ZnVuY3Rpb24oZSx0LHIsbixpKXtpZih0LnN1YmFycmF5JiZlLnN1YmFycmF5KWUuc2V0KHQuc3ViYXJyYXkocixyK24pLGkpO2Vsc2UgZm9yKHZhciBzPTA7czxuO3MrKyllW2krc109dFtyK3NdfSxmbGF0dGVuQ2h1bmtzOmZ1bmN0aW9uKGUpe3ZhciB0LHIsbixpLHMsYTtmb3IodD1uPTAscj1lLmxlbmd0aDt0PHI7dCsrKW4rPWVbdF0ubGVuZ3RoO2ZvcihhPW5ldyBVaW50OEFycmF5KG4pLHQ9aT0wLHI9ZS5sZW5ndGg7dDxyO3QrKylzPWVbdF0sYS5zZXQocyxpKSxpKz1zLmxlbmd0aDtyZXR1cm4gYX19LHM9e2FycmF5U2V0OmZ1bmN0aW9uKGUsdCxyLG4saSl7Zm9yKHZhciBzPTA7czxuO3MrKyllW2krc109dFtyK3NdfSxmbGF0dGVuQ2h1bmtzOmZ1bmN0aW9uKGUpe3JldHVybltdLmNvbmNhdC5hcHBseShbXSxlKX19O3Iuc2V0VHlwZWQ9ZnVuY3Rpb24oZSl7ZT8oci5CdWY4PVVpbnQ4QXJyYXksci5CdWYxNj1VaW50MTZBcnJheSxyLkJ1ZjMyPUludDMyQXJyYXksci5hc3NpZ24ocixpKSk6KHIuQnVmOD1BcnJheSxyLkJ1ZjE2PUFycmF5LHIuQnVmMzI9QXJyYXksci5hc3NpZ24ocixzKSl9LHIuc2V0VHlwZWQobil9LHt9XSw0MjpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3ZhciBoPWUoXCIuL2NvbW1vblwiKSxpPSEwLHM9ITA7dHJ5e1N0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCxbMF0pfWNhdGNoKGUpe2k9ITF9dHJ5e1N0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCxuZXcgVWludDhBcnJheSgxKSl9Y2F0Y2goZSl7cz0hMX1mb3IodmFyIHU9bmV3IGguQnVmOCgyNTYpLG49MDtuPDI1NjtuKyspdVtuXT0yNTI8PW4/NjoyNDg8PW4/NToyNDA8PW4/NDoyMjQ8PW4/MzoxOTI8PW4/MjoxO2Z1bmN0aW9uIGwoZSx0KXtpZih0PDY1NTM3JiYoZS5zdWJhcnJheSYmc3x8IWUuc3ViYXJyYXkmJmkpKXJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsaC5zaHJpbmtCdWYoZSx0KSk7Zm9yKHZhciByPVwiXCIsbj0wO248dDtuKyspcis9U3RyaW5nLmZyb21DaGFyQ29kZShlW25dKTtyZXR1cm4gcn11WzI1NF09dVsyNTRdPTEsci5zdHJpbmcyYnVmPWZ1bmN0aW9uKGUpe3ZhciB0LHIsbixpLHMsYT1lLmxlbmd0aCxvPTA7Zm9yKGk9MDtpPGE7aSsrKTU1Mjk2PT0oNjQ1MTImKHI9ZS5jaGFyQ29kZUF0KGkpKSkmJmkrMTxhJiY1NjMyMD09KDY0NTEyJihuPWUuY2hhckNvZGVBdChpKzEpKSkmJihyPTY1NTM2KyhyLTU1Mjk2PDwxMCkrKG4tNTYzMjApLGkrKyksbys9cjwxMjg/MTpyPDIwNDg/MjpyPDY1NTM2PzM6NDtmb3IodD1uZXcgaC5CdWY4KG8pLGk9cz0wO3M8bztpKyspNTUyOTY9PSg2NDUxMiYocj1lLmNoYXJDb2RlQXQoaSkpKSYmaSsxPGEmJjU2MzIwPT0oNjQ1MTImKG49ZS5jaGFyQ29kZUF0KGkrMSkpKSYmKHI9NjU1MzYrKHItNTUyOTY8PDEwKSsobi01NjMyMCksaSsrKSxyPDEyOD90W3MrK109cjoocjwyMDQ4P3RbcysrXT0xOTJ8cj4+PjY6KHI8NjU1MzY/dFtzKytdPTIyNHxyPj4+MTI6KHRbcysrXT0yNDB8cj4+PjE4LHRbcysrXT0xMjh8cj4+PjEyJjYzKSx0W3MrK109MTI4fHI+Pj42JjYzKSx0W3MrK109MTI4fDYzJnIpO3JldHVybiB0fSxyLmJ1ZjJiaW5zdHJpbmc9ZnVuY3Rpb24oZSl7cmV0dXJuIGwoZSxlLmxlbmd0aCl9LHIuYmluc3RyaW5nMmJ1Zj1mdW5jdGlvbihlKXtmb3IodmFyIHQ9bmV3IGguQnVmOChlLmxlbmd0aCkscj0wLG49dC5sZW5ndGg7cjxuO3IrKyl0W3JdPWUuY2hhckNvZGVBdChyKTtyZXR1cm4gdH0sci5idWYyc3RyaW5nPWZ1bmN0aW9uKGUsdCl7dmFyIHIsbixpLHMsYT10fHxlLmxlbmd0aCxvPW5ldyBBcnJheSgyKmEpO2ZvcihyPW49MDtyPGE7KWlmKChpPWVbcisrXSk8MTI4KW9bbisrXT1pO2Vsc2UgaWYoNDwocz11W2ldKSlvW24rK109NjU1MzMscis9cy0xO2Vsc2V7Zm9yKGkmPTI9PT1zPzMxOjM9PT1zPzE1Ojc7MTxzJiZyPGE7KWk9aTw8Nnw2MyZlW3IrK10scy0tOzE8cz9vW24rK109NjU1MzM6aTw2NTUzNj9vW24rK109aTooaS09NjU1MzYsb1tuKytdPTU1Mjk2fGk+PjEwJjEwMjMsb1tuKytdPTU2MzIwfDEwMjMmaSl9cmV0dXJuIGwobyxuKX0sci51dGY4Ym9yZGVyPWZ1bmN0aW9uKGUsdCl7dmFyIHI7Zm9yKCh0PXR8fGUubGVuZ3RoKT5lLmxlbmd0aCYmKHQ9ZS5sZW5ndGgpLHI9dC0xOzA8PXImJjEyOD09KDE5MiZlW3JdKTspci0tO3JldHVybiByPDA/dDowPT09cj90OnIrdVtlW3JdXT50P3I6dH19LHtcIi4vY29tbW9uXCI6NDF9XSw0MzpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3QuZXhwb3J0cz1mdW5jdGlvbihlLHQscixuKXtmb3IodmFyIGk9NjU1MzUmZXwwLHM9ZT4+PjE2JjY1NTM1fDAsYT0wOzAhPT1yOyl7Zm9yKHItPWE9MmUzPHI/MmUzOnI7cz1zKyhpPWkrdFtuKytdfDApfDAsLS1hOyk7aSU9NjU1MjEscyU9NjU1MjF9cmV0dXJuIGl8czw8MTZ8MH19LHt9XSw0NDpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3QuZXhwb3J0cz17Wl9OT19GTFVTSDowLFpfUEFSVElBTF9GTFVTSDoxLFpfU1lOQ19GTFVTSDoyLFpfRlVMTF9GTFVTSDozLFpfRklOSVNIOjQsWl9CTE9DSzo1LFpfVFJFRVM6NixaX09LOjAsWl9TVFJFQU1fRU5EOjEsWl9ORUVEX0RJQ1Q6MixaX0VSUk5POi0xLFpfU1RSRUFNX0VSUk9SOi0yLFpfREFUQV9FUlJPUjotMyxaX0JVRl9FUlJPUjotNSxaX05PX0NPTVBSRVNTSU9OOjAsWl9CRVNUX1NQRUVEOjEsWl9CRVNUX0NPTVBSRVNTSU9OOjksWl9ERUZBVUxUX0NPTVBSRVNTSU9OOi0xLFpfRklMVEVSRUQ6MSxaX0hVRkZNQU5fT05MWToyLFpfUkxFOjMsWl9GSVhFRDo0LFpfREVGQVVMVF9TVFJBVEVHWTowLFpfQklOQVJZOjAsWl9URVhUOjEsWl9VTktOT1dOOjIsWl9ERUZMQVRFRDo4fX0se31dLDQ1OltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7dmFyIG89ZnVuY3Rpb24oKXtmb3IodmFyIGUsdD1bXSxyPTA7cjwyNTY7cisrKXtlPXI7Zm9yKHZhciBuPTA7bjw4O24rKyllPTEmZT8zOTg4MjkyMzg0XmU+Pj4xOmU+Pj4xO3Rbcl09ZX1yZXR1cm4gdH0oKTt0LmV4cG9ydHM9ZnVuY3Rpb24oZSx0LHIsbil7dmFyIGk9byxzPW4rcjtlXj0tMTtmb3IodmFyIGE9bjthPHM7YSsrKWU9ZT4+PjheaVsyNTUmKGVedFthXSldO3JldHVybi0xXmV9fSx7fV0sNDY6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt2YXIgaCxjPWUoXCIuLi91dGlscy9jb21tb25cIiksdT1lKFwiLi90cmVlc1wiKSxkPWUoXCIuL2FkbGVyMzJcIikscD1lKFwiLi9jcmMzMlwiKSxuPWUoXCIuL21lc3NhZ2VzXCIpLGw9MCxmPTQsbT0wLF89LTIsZz0tMSxiPTQsaT0yLHY9OCx5PTkscz0yODYsYT0zMCxvPTE5LHc9MipzKzEsaz0xNSx4PTMsUz0yNTgsej1TK3grMSxDPTQyLEU9MTEzLEE9MSxJPTIsTz0zLEI9NDtmdW5jdGlvbiBSKGUsdCl7cmV0dXJuIGUubXNnPW5bdF0sdH1mdW5jdGlvbiBUKGUpe3JldHVybihlPDwxKS0oNDxlPzk6MCl9ZnVuY3Rpb24gRChlKXtmb3IodmFyIHQ9ZS5sZW5ndGg7MDw9LS10OyllW3RdPTB9ZnVuY3Rpb24gRihlKXt2YXIgdD1lLnN0YXRlLHI9dC5wZW5kaW5nO3I+ZS5hdmFpbF9vdXQmJihyPWUuYXZhaWxfb3V0KSwwIT09ciYmKGMuYXJyYXlTZXQoZS5vdXRwdXQsdC5wZW5kaW5nX2J1Zix0LnBlbmRpbmdfb3V0LHIsZS5uZXh0X291dCksZS5uZXh0X291dCs9cix0LnBlbmRpbmdfb3V0Kz1yLGUudG90YWxfb3V0Kz1yLGUuYXZhaWxfb3V0LT1yLHQucGVuZGluZy09ciwwPT09dC5wZW5kaW5nJiYodC5wZW5kaW5nX291dD0wKSl9ZnVuY3Rpb24gTihlLHQpe3UuX3RyX2ZsdXNoX2Jsb2NrKGUsMDw9ZS5ibG9ja19zdGFydD9lLmJsb2NrX3N0YXJ0Oi0xLGUuc3Ryc3RhcnQtZS5ibG9ja19zdGFydCx0KSxlLmJsb2NrX3N0YXJ0PWUuc3Ryc3RhcnQsRihlLnN0cm0pfWZ1bmN0aW9uIFUoZSx0KXtlLnBlbmRpbmdfYnVmW2UucGVuZGluZysrXT10fWZ1bmN0aW9uIFAoZSx0KXtlLnBlbmRpbmdfYnVmW2UucGVuZGluZysrXT10Pj4+OCYyNTUsZS5wZW5kaW5nX2J1ZltlLnBlbmRpbmcrK109MjU1JnR9ZnVuY3Rpb24gTChlLHQpe3ZhciByLG4saT1lLm1heF9jaGFpbl9sZW5ndGgscz1lLnN0cnN0YXJ0LGE9ZS5wcmV2X2xlbmd0aCxvPWUubmljZV9tYXRjaCxoPWUuc3Ryc3RhcnQ+ZS53X3NpemUtej9lLnN0cnN0YXJ0LShlLndfc2l6ZS16KTowLHU9ZS53aW5kb3csbD1lLndfbWFzayxmPWUucHJldixjPWUuc3Ryc3RhcnQrUyxkPXVbcythLTFdLHA9dVtzK2FdO2UucHJldl9sZW5ndGg+PWUuZ29vZF9tYXRjaCYmKGk+Pj0yKSxvPmUubG9va2FoZWFkJiYobz1lLmxvb2thaGVhZCk7ZG97aWYodVsocj10KSthXT09PXAmJnVbcithLTFdPT09ZCYmdVtyXT09PXVbc10mJnVbKytyXT09PXVbcysxXSl7cys9MixyKys7ZG97fXdoaWxlKHVbKytzXT09PXVbKytyXSYmdVsrK3NdPT09dVsrK3JdJiZ1Wysrc109PT11Wysrcl0mJnVbKytzXT09PXVbKytyXSYmdVsrK3NdPT09dVsrK3JdJiZ1Wysrc109PT11Wysrcl0mJnVbKytzXT09PXVbKytyXSYmdVsrK3NdPT09dVsrK3JdJiZzPGMpO2lmKG49Uy0oYy1zKSxzPWMtUyxhPG4pe2lmKGUubWF0Y2hfc3RhcnQ9dCxvPD0oYT1uKSlicmVhaztkPXVbcythLTFdLHA9dVtzK2FdfX19d2hpbGUoKHQ9Zlt0JmxdKT5oJiYwIT0tLWkpO3JldHVybiBhPD1lLmxvb2thaGVhZD9hOmUubG9va2FoZWFkfWZ1bmN0aW9uIGooZSl7dmFyIHQscixuLGkscyxhLG8saCx1LGwsZj1lLndfc2l6ZTtkb3tpZihpPWUud2luZG93X3NpemUtZS5sb29rYWhlYWQtZS5zdHJzdGFydCxlLnN0cnN0YXJ0Pj1mKyhmLXopKXtmb3IoYy5hcnJheVNldChlLndpbmRvdyxlLndpbmRvdyxmLGYsMCksZS5tYXRjaF9zdGFydC09ZixlLnN0cnN0YXJ0LT1mLGUuYmxvY2tfc3RhcnQtPWYsdD1yPWUuaGFzaF9zaXplO249ZS5oZWFkWy0tdF0sZS5oZWFkW3RdPWY8PW4/bi1mOjAsLS1yOyk7Zm9yKHQ9cj1mO249ZS5wcmV2Wy0tdF0sZS5wcmV2W3RdPWY8PW4/bi1mOjAsLS1yOyk7aSs9Zn1pZigwPT09ZS5zdHJtLmF2YWlsX2luKWJyZWFrO2lmKGE9ZS5zdHJtLG89ZS53aW5kb3csaD1lLnN0cnN0YXJ0K2UubG9va2FoZWFkLHU9aSxsPXZvaWQgMCxsPWEuYXZhaWxfaW4sdTxsJiYobD11KSxyPTA9PT1sPzA6KGEuYXZhaWxfaW4tPWwsYy5hcnJheVNldChvLGEuaW5wdXQsYS5uZXh0X2luLGwsaCksMT09PWEuc3RhdGUud3JhcD9hLmFkbGVyPWQoYS5hZGxlcixvLGwsaCk6Mj09PWEuc3RhdGUud3JhcCYmKGEuYWRsZXI9cChhLmFkbGVyLG8sbCxoKSksYS5uZXh0X2luKz1sLGEudG90YWxfaW4rPWwsbCksZS5sb29rYWhlYWQrPXIsZS5sb29rYWhlYWQrZS5pbnNlcnQ+PXgpZm9yKHM9ZS5zdHJzdGFydC1lLmluc2VydCxlLmluc19oPWUud2luZG93W3NdLGUuaW5zX2g9KGUuaW5zX2g8PGUuaGFzaF9zaGlmdF5lLndpbmRvd1tzKzFdKSZlLmhhc2hfbWFzaztlLmluc2VydCYmKGUuaW5zX2g9KGUuaW5zX2g8PGUuaGFzaF9zaGlmdF5lLndpbmRvd1tzK3gtMV0pJmUuaGFzaF9tYXNrLGUucHJldltzJmUud19tYXNrXT1lLmhlYWRbZS5pbnNfaF0sZS5oZWFkW2UuaW5zX2hdPXMscysrLGUuaW5zZXJ0LS0sIShlLmxvb2thaGVhZCtlLmluc2VydDx4KSk7KTt9d2hpbGUoZS5sb29rYWhlYWQ8eiYmMCE9PWUuc3RybS5hdmFpbF9pbil9ZnVuY3Rpb24gWihlLHQpe2Zvcih2YXIgcixuOzspe2lmKGUubG9va2FoZWFkPHope2lmKGooZSksZS5sb29rYWhlYWQ8eiYmdD09PWwpcmV0dXJuIEE7aWYoMD09PWUubG9va2FoZWFkKWJyZWFrfWlmKHI9MCxlLmxvb2thaGVhZD49eCYmKGUuaW5zX2g9KGUuaW5zX2g8PGUuaGFzaF9zaGlmdF5lLndpbmRvd1tlLnN0cnN0YXJ0K3gtMV0pJmUuaGFzaF9tYXNrLHI9ZS5wcmV2W2Uuc3Ryc3RhcnQmZS53X21hc2tdPWUuaGVhZFtlLmluc19oXSxlLmhlYWRbZS5pbnNfaF09ZS5zdHJzdGFydCksMCE9PXImJmUuc3Ryc3RhcnQtcjw9ZS53X3NpemUteiYmKGUubWF0Y2hfbGVuZ3RoPUwoZSxyKSksZS5tYXRjaF9sZW5ndGg+PXgpaWYobj11Ll90cl90YWxseShlLGUuc3Ryc3RhcnQtZS5tYXRjaF9zdGFydCxlLm1hdGNoX2xlbmd0aC14KSxlLmxvb2thaGVhZC09ZS5tYXRjaF9sZW5ndGgsZS5tYXRjaF9sZW5ndGg8PWUubWF4X2xhenlfbWF0Y2gmJmUubG9va2FoZWFkPj14KXtmb3IoZS5tYXRjaF9sZW5ndGgtLTtlLnN0cnN0YXJ0KyssZS5pbnNfaD0oZS5pbnNfaDw8ZS5oYXNoX3NoaWZ0XmUud2luZG93W2Uuc3Ryc3RhcnQreC0xXSkmZS5oYXNoX21hc2sscj1lLnByZXZbZS5zdHJzdGFydCZlLndfbWFza109ZS5oZWFkW2UuaW5zX2hdLGUuaGVhZFtlLmluc19oXT1lLnN0cnN0YXJ0LDAhPS0tZS5tYXRjaF9sZW5ndGg7KTtlLnN0cnN0YXJ0Kyt9ZWxzZSBlLnN0cnN0YXJ0Kz1lLm1hdGNoX2xlbmd0aCxlLm1hdGNoX2xlbmd0aD0wLGUuaW5zX2g9ZS53aW5kb3dbZS5zdHJzdGFydF0sZS5pbnNfaD0oZS5pbnNfaDw8ZS5oYXNoX3NoaWZ0XmUud2luZG93W2Uuc3Ryc3RhcnQrMV0pJmUuaGFzaF9tYXNrO2Vsc2Ugbj11Ll90cl90YWxseShlLDAsZS53aW5kb3dbZS5zdHJzdGFydF0pLGUubG9va2FoZWFkLS0sZS5zdHJzdGFydCsrO2lmKG4mJihOKGUsITEpLDA9PT1lLnN0cm0uYXZhaWxfb3V0KSlyZXR1cm4gQX1yZXR1cm4gZS5pbnNlcnQ9ZS5zdHJzdGFydDx4LTE/ZS5zdHJzdGFydDp4LTEsdD09PWY/KE4oZSwhMCksMD09PWUuc3RybS5hdmFpbF9vdXQ/TzpCKTplLmxhc3RfbGl0JiYoTihlLCExKSwwPT09ZS5zdHJtLmF2YWlsX291dCk/QTpJfWZ1bmN0aW9uIFcoZSx0KXtmb3IodmFyIHIsbixpOzspe2lmKGUubG9va2FoZWFkPHope2lmKGooZSksZS5sb29rYWhlYWQ8eiYmdD09PWwpcmV0dXJuIEE7aWYoMD09PWUubG9va2FoZWFkKWJyZWFrfWlmKHI9MCxlLmxvb2thaGVhZD49eCYmKGUuaW5zX2g9KGUuaW5zX2g8PGUuaGFzaF9zaGlmdF5lLndpbmRvd1tlLnN0cnN0YXJ0K3gtMV0pJmUuaGFzaF9tYXNrLHI9ZS5wcmV2W2Uuc3Ryc3RhcnQmZS53X21hc2tdPWUuaGVhZFtlLmluc19oXSxlLmhlYWRbZS5pbnNfaF09ZS5zdHJzdGFydCksZS5wcmV2X2xlbmd0aD1lLm1hdGNoX2xlbmd0aCxlLnByZXZfbWF0Y2g9ZS5tYXRjaF9zdGFydCxlLm1hdGNoX2xlbmd0aD14LTEsMCE9PXImJmUucHJldl9sZW5ndGg8ZS5tYXhfbGF6eV9tYXRjaCYmZS5zdHJzdGFydC1yPD1lLndfc2l6ZS16JiYoZS5tYXRjaF9sZW5ndGg9TChlLHIpLGUubWF0Y2hfbGVuZ3RoPD01JiYoMT09PWUuc3RyYXRlZ3l8fGUubWF0Y2hfbGVuZ3RoPT09eCYmNDA5NjxlLnN0cnN0YXJ0LWUubWF0Y2hfc3RhcnQpJiYoZS5tYXRjaF9sZW5ndGg9eC0xKSksZS5wcmV2X2xlbmd0aD49eCYmZS5tYXRjaF9sZW5ndGg8PWUucHJldl9sZW5ndGgpe2ZvcihpPWUuc3Ryc3RhcnQrZS5sb29rYWhlYWQteCxuPXUuX3RyX3RhbGx5KGUsZS5zdHJzdGFydC0xLWUucHJldl9tYXRjaCxlLnByZXZfbGVuZ3RoLXgpLGUubG9va2FoZWFkLT1lLnByZXZfbGVuZ3RoLTEsZS5wcmV2X2xlbmd0aC09MjsrK2Uuc3Ryc3RhcnQ8PWkmJihlLmluc19oPShlLmluc19oPDxlLmhhc2hfc2hpZnReZS53aW5kb3dbZS5zdHJzdGFydCt4LTFdKSZlLmhhc2hfbWFzayxyPWUucHJldltlLnN0cnN0YXJ0JmUud19tYXNrXT1lLmhlYWRbZS5pbnNfaF0sZS5oZWFkW2UuaW5zX2hdPWUuc3Ryc3RhcnQpLDAhPS0tZS5wcmV2X2xlbmd0aDspO2lmKGUubWF0Y2hfYXZhaWxhYmxlPTAsZS5tYXRjaF9sZW5ndGg9eC0xLGUuc3Ryc3RhcnQrKyxuJiYoTihlLCExKSwwPT09ZS5zdHJtLmF2YWlsX291dCkpcmV0dXJuIEF9ZWxzZSBpZihlLm1hdGNoX2F2YWlsYWJsZSl7aWYoKG49dS5fdHJfdGFsbHkoZSwwLGUud2luZG93W2Uuc3Ryc3RhcnQtMV0pKSYmTihlLCExKSxlLnN0cnN0YXJ0KyssZS5sb29rYWhlYWQtLSwwPT09ZS5zdHJtLmF2YWlsX291dClyZXR1cm4gQX1lbHNlIGUubWF0Y2hfYXZhaWxhYmxlPTEsZS5zdHJzdGFydCsrLGUubG9va2FoZWFkLS19cmV0dXJuIGUubWF0Y2hfYXZhaWxhYmxlJiYobj11Ll90cl90YWxseShlLDAsZS53aW5kb3dbZS5zdHJzdGFydC0xXSksZS5tYXRjaF9hdmFpbGFibGU9MCksZS5pbnNlcnQ9ZS5zdHJzdGFydDx4LTE/ZS5zdHJzdGFydDp4LTEsdD09PWY/KE4oZSwhMCksMD09PWUuc3RybS5hdmFpbF9vdXQ/TzpCKTplLmxhc3RfbGl0JiYoTihlLCExKSwwPT09ZS5zdHJtLmF2YWlsX291dCk/QTpJfWZ1bmN0aW9uIE0oZSx0LHIsbixpKXt0aGlzLmdvb2RfbGVuZ3RoPWUsdGhpcy5tYXhfbGF6eT10LHRoaXMubmljZV9sZW5ndGg9cix0aGlzLm1heF9jaGFpbj1uLHRoaXMuZnVuYz1pfWZ1bmN0aW9uIEgoKXt0aGlzLnN0cm09bnVsbCx0aGlzLnN0YXR1cz0wLHRoaXMucGVuZGluZ19idWY9bnVsbCx0aGlzLnBlbmRpbmdfYnVmX3NpemU9MCx0aGlzLnBlbmRpbmdfb3V0PTAsdGhpcy5wZW5kaW5nPTAsdGhpcy53cmFwPTAsdGhpcy5nemhlYWQ9bnVsbCx0aGlzLmd6aW5kZXg9MCx0aGlzLm1ldGhvZD12LHRoaXMubGFzdF9mbHVzaD0tMSx0aGlzLndfc2l6ZT0wLHRoaXMud19iaXRzPTAsdGhpcy53X21hc2s9MCx0aGlzLndpbmRvdz1udWxsLHRoaXMud2luZG93X3NpemU9MCx0aGlzLnByZXY9bnVsbCx0aGlzLmhlYWQ9bnVsbCx0aGlzLmluc19oPTAsdGhpcy5oYXNoX3NpemU9MCx0aGlzLmhhc2hfYml0cz0wLHRoaXMuaGFzaF9tYXNrPTAsdGhpcy5oYXNoX3NoaWZ0PTAsdGhpcy5ibG9ja19zdGFydD0wLHRoaXMubWF0Y2hfbGVuZ3RoPTAsdGhpcy5wcmV2X21hdGNoPTAsdGhpcy5tYXRjaF9hdmFpbGFibGU9MCx0aGlzLnN0cnN0YXJ0PTAsdGhpcy5tYXRjaF9zdGFydD0wLHRoaXMubG9va2FoZWFkPTAsdGhpcy5wcmV2X2xlbmd0aD0wLHRoaXMubWF4X2NoYWluX2xlbmd0aD0wLHRoaXMubWF4X2xhenlfbWF0Y2g9MCx0aGlzLmxldmVsPTAsdGhpcy5zdHJhdGVneT0wLHRoaXMuZ29vZF9tYXRjaD0wLHRoaXMubmljZV9tYXRjaD0wLHRoaXMuZHluX2x0cmVlPW5ldyBjLkJ1ZjE2KDIqdyksdGhpcy5keW5fZHRyZWU9bmV3IGMuQnVmMTYoMiooMiphKzEpKSx0aGlzLmJsX3RyZWU9bmV3IGMuQnVmMTYoMiooMipvKzEpKSxEKHRoaXMuZHluX2x0cmVlKSxEKHRoaXMuZHluX2R0cmVlKSxEKHRoaXMuYmxfdHJlZSksdGhpcy5sX2Rlc2M9bnVsbCx0aGlzLmRfZGVzYz1udWxsLHRoaXMuYmxfZGVzYz1udWxsLHRoaXMuYmxfY291bnQ9bmV3IGMuQnVmMTYoaysxKSx0aGlzLmhlYXA9bmV3IGMuQnVmMTYoMipzKzEpLEQodGhpcy5oZWFwKSx0aGlzLmhlYXBfbGVuPTAsdGhpcy5oZWFwX21heD0wLHRoaXMuZGVwdGg9bmV3IGMuQnVmMTYoMipzKzEpLEQodGhpcy5kZXB0aCksdGhpcy5sX2J1Zj0wLHRoaXMubGl0X2J1ZnNpemU9MCx0aGlzLmxhc3RfbGl0PTAsdGhpcy5kX2J1Zj0wLHRoaXMub3B0X2xlbj0wLHRoaXMuc3RhdGljX2xlbj0wLHRoaXMubWF0Y2hlcz0wLHRoaXMuaW5zZXJ0PTAsdGhpcy5iaV9idWY9MCx0aGlzLmJpX3ZhbGlkPTB9ZnVuY3Rpb24gRyhlKXt2YXIgdDtyZXR1cm4gZSYmZS5zdGF0ZT8oZS50b3RhbF9pbj1lLnRvdGFsX291dD0wLGUuZGF0YV90eXBlPWksKHQ9ZS5zdGF0ZSkucGVuZGluZz0wLHQucGVuZGluZ19vdXQ9MCx0LndyYXA8MCYmKHQud3JhcD0tdC53cmFwKSx0LnN0YXR1cz10LndyYXA/QzpFLGUuYWRsZXI9Mj09PXQud3JhcD8wOjEsdC5sYXN0X2ZsdXNoPWwsdS5fdHJfaW5pdCh0KSxtKTpSKGUsXyl9ZnVuY3Rpb24gSyhlKXt2YXIgdD1HKGUpO3JldHVybiB0PT09bSYmZnVuY3Rpb24oZSl7ZS53aW5kb3dfc2l6ZT0yKmUud19zaXplLEQoZS5oZWFkKSxlLm1heF9sYXp5X21hdGNoPWhbZS5sZXZlbF0ubWF4X2xhenksZS5nb29kX21hdGNoPWhbZS5sZXZlbF0uZ29vZF9sZW5ndGgsZS5uaWNlX21hdGNoPWhbZS5sZXZlbF0ubmljZV9sZW5ndGgsZS5tYXhfY2hhaW5fbGVuZ3RoPWhbZS5sZXZlbF0ubWF4X2NoYWluLGUuc3Ryc3RhcnQ9MCxlLmJsb2NrX3N0YXJ0PTAsZS5sb29rYWhlYWQ9MCxlLmluc2VydD0wLGUubWF0Y2hfbGVuZ3RoPWUucHJldl9sZW5ndGg9eC0xLGUubWF0Y2hfYXZhaWxhYmxlPTAsZS5pbnNfaD0wfShlLnN0YXRlKSx0fWZ1bmN0aW9uIFkoZSx0LHIsbixpLHMpe2lmKCFlKXJldHVybiBfO3ZhciBhPTE7aWYodD09PWcmJih0PTYpLG48MD8oYT0wLG49LW4pOjE1PG4mJihhPTIsbi09MTYpLGk8MXx8eTxpfHxyIT09dnx8bjw4fHwxNTxufHx0PDB8fDk8dHx8czwwfHxiPHMpcmV0dXJuIFIoZSxfKTs4PT09biYmKG49OSk7dmFyIG89bmV3IEg7cmV0dXJuKGUuc3RhdGU9bykuc3RybT1lLG8ud3JhcD1hLG8uZ3poZWFkPW51bGwsby53X2JpdHM9bixvLndfc2l6ZT0xPDxvLndfYml0cyxvLndfbWFzaz1vLndfc2l6ZS0xLG8uaGFzaF9iaXRzPWkrNyxvLmhhc2hfc2l6ZT0xPDxvLmhhc2hfYml0cyxvLmhhc2hfbWFzaz1vLmhhc2hfc2l6ZS0xLG8uaGFzaF9zaGlmdD1+figoby5oYXNoX2JpdHMreC0xKS94KSxvLndpbmRvdz1uZXcgYy5CdWY4KDIqby53X3NpemUpLG8uaGVhZD1uZXcgYy5CdWYxNihvLmhhc2hfc2l6ZSksby5wcmV2PW5ldyBjLkJ1ZjE2KG8ud19zaXplKSxvLmxpdF9idWZzaXplPTE8PGkrNixvLnBlbmRpbmdfYnVmX3NpemU9NCpvLmxpdF9idWZzaXplLG8ucGVuZGluZ19idWY9bmV3IGMuQnVmOChvLnBlbmRpbmdfYnVmX3NpemUpLG8uZF9idWY9MSpvLmxpdF9idWZzaXplLG8ubF9idWY9MypvLmxpdF9idWZzaXplLG8ubGV2ZWw9dCxvLnN0cmF0ZWd5PXMsby5tZXRob2Q9cixLKGUpfWg9W25ldyBNKDAsMCwwLDAsZnVuY3Rpb24oZSx0KXt2YXIgcj02NTUzNTtmb3Iocj5lLnBlbmRpbmdfYnVmX3NpemUtNSYmKHI9ZS5wZW5kaW5nX2J1Zl9zaXplLTUpOzspe2lmKGUubG9va2FoZWFkPD0xKXtpZihqKGUpLDA9PT1lLmxvb2thaGVhZCYmdD09PWwpcmV0dXJuIEE7aWYoMD09PWUubG9va2FoZWFkKWJyZWFrfWUuc3Ryc3RhcnQrPWUubG9va2FoZWFkLGUubG9va2FoZWFkPTA7dmFyIG49ZS5ibG9ja19zdGFydCtyO2lmKCgwPT09ZS5zdHJzdGFydHx8ZS5zdHJzdGFydD49bikmJihlLmxvb2thaGVhZD1lLnN0cnN0YXJ0LW4sZS5zdHJzdGFydD1uLE4oZSwhMSksMD09PWUuc3RybS5hdmFpbF9vdXQpKXJldHVybiBBO2lmKGUuc3Ryc3RhcnQtZS5ibG9ja19zdGFydD49ZS53X3NpemUteiYmKE4oZSwhMSksMD09PWUuc3RybS5hdmFpbF9vdXQpKXJldHVybiBBfXJldHVybiBlLmluc2VydD0wLHQ9PT1mPyhOKGUsITApLDA9PT1lLnN0cm0uYXZhaWxfb3V0P086Qik6KGUuc3Ryc3RhcnQ+ZS5ibG9ja19zdGFydCYmKE4oZSwhMSksZS5zdHJtLmF2YWlsX291dCksQSl9KSxuZXcgTSg0LDQsOCw0LFopLG5ldyBNKDQsNSwxNiw4LFopLG5ldyBNKDQsNiwzMiwzMixaKSxuZXcgTSg0LDQsMTYsMTYsVyksbmV3IE0oOCwxNiwzMiwzMixXKSxuZXcgTSg4LDE2LDEyOCwxMjgsVyksbmV3IE0oOCwzMiwxMjgsMjU2LFcpLG5ldyBNKDMyLDEyOCwyNTgsMTAyNCxXKSxuZXcgTSgzMiwyNTgsMjU4LDQwOTYsVyldLHIuZGVmbGF0ZUluaXQ9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gWShlLHQsdiwxNSw4LDApfSxyLmRlZmxhdGVJbml0Mj1ZLHIuZGVmbGF0ZVJlc2V0PUssci5kZWZsYXRlUmVzZXRLZWVwPUcsci5kZWZsYXRlU2V0SGVhZGVyPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIGUmJmUuc3RhdGU/MiE9PWUuc3RhdGUud3JhcD9fOihlLnN0YXRlLmd6aGVhZD10LG0pOl99LHIuZGVmbGF0ZT1mdW5jdGlvbihlLHQpe3ZhciByLG4saSxzO2lmKCFlfHwhZS5zdGF0ZXx8NTx0fHx0PDApcmV0dXJuIGU/UihlLF8pOl87aWYobj1lLnN0YXRlLCFlLm91dHB1dHx8IWUuaW5wdXQmJjAhPT1lLmF2YWlsX2lufHw2NjY9PT1uLnN0YXR1cyYmdCE9PWYpcmV0dXJuIFIoZSwwPT09ZS5hdmFpbF9vdXQ/LTU6Xyk7aWYobi5zdHJtPWUscj1uLmxhc3RfZmx1c2gsbi5sYXN0X2ZsdXNoPXQsbi5zdGF0dXM9PT1DKWlmKDI9PT1uLndyYXApZS5hZGxlcj0wLFUobiwzMSksVShuLDEzOSksVShuLDgpLG4uZ3poZWFkPyhVKG4sKG4uZ3poZWFkLnRleHQ/MTowKSsobi5nemhlYWQuaGNyYz8yOjApKyhuLmd6aGVhZC5leHRyYT80OjApKyhuLmd6aGVhZC5uYW1lPzg6MCkrKG4uZ3poZWFkLmNvbW1lbnQ/MTY6MCkpLFUobiwyNTUmbi5nemhlYWQudGltZSksVShuLG4uZ3poZWFkLnRpbWU+PjgmMjU1KSxVKG4sbi5nemhlYWQudGltZT4+MTYmMjU1KSxVKG4sbi5nemhlYWQudGltZT4+MjQmMjU1KSxVKG4sOT09PW4ubGV2ZWw/MjoyPD1uLnN0cmF0ZWd5fHxuLmxldmVsPDI/NDowKSxVKG4sMjU1Jm4uZ3poZWFkLm9zKSxuLmd6aGVhZC5leHRyYSYmbi5nemhlYWQuZXh0cmEubGVuZ3RoJiYoVShuLDI1NSZuLmd6aGVhZC5leHRyYS5sZW5ndGgpLFUobixuLmd6aGVhZC5leHRyYS5sZW5ndGg+PjgmMjU1KSksbi5nemhlYWQuaGNyYyYmKGUuYWRsZXI9cChlLmFkbGVyLG4ucGVuZGluZ19idWYsbi5wZW5kaW5nLDApKSxuLmd6aW5kZXg9MCxuLnN0YXR1cz02OSk6KFUobiwwKSxVKG4sMCksVShuLDApLFUobiwwKSxVKG4sMCksVShuLDk9PT1uLmxldmVsPzI6Mjw9bi5zdHJhdGVneXx8bi5sZXZlbDwyPzQ6MCksVShuLDMpLG4uc3RhdHVzPUUpO2Vsc2V7dmFyIGE9disobi53X2JpdHMtODw8NCk8PDg7YXw9KDI8PW4uc3RyYXRlZ3l8fG4ubGV2ZWw8Mj8wOm4ubGV2ZWw8Nj8xOjY9PT1uLmxldmVsPzI6Myk8PDYsMCE9PW4uc3Ryc3RhcnQmJihhfD0zMiksYSs9MzEtYSUzMSxuLnN0YXR1cz1FLFAobixhKSwwIT09bi5zdHJzdGFydCYmKFAobixlLmFkbGVyPj4+MTYpLFAobiw2NTUzNSZlLmFkbGVyKSksZS5hZGxlcj0xfWlmKDY5PT09bi5zdGF0dXMpaWYobi5nemhlYWQuZXh0cmEpe2ZvcihpPW4ucGVuZGluZztuLmd6aW5kZXg8KDY1NTM1Jm4uZ3poZWFkLmV4dHJhLmxlbmd0aCkmJihuLnBlbmRpbmchPT1uLnBlbmRpbmdfYnVmX3NpemV8fChuLmd6aGVhZC5oY3JjJiZuLnBlbmRpbmc+aSYmKGUuYWRsZXI9cChlLmFkbGVyLG4ucGVuZGluZ19idWYsbi5wZW5kaW5nLWksaSkpLEYoZSksaT1uLnBlbmRpbmcsbi5wZW5kaW5nIT09bi5wZW5kaW5nX2J1Zl9zaXplKSk7KVUobiwyNTUmbi5nemhlYWQuZXh0cmFbbi5nemluZGV4XSksbi5nemluZGV4Kys7bi5nemhlYWQuaGNyYyYmbi5wZW5kaW5nPmkmJihlLmFkbGVyPXAoZS5hZGxlcixuLnBlbmRpbmdfYnVmLG4ucGVuZGluZy1pLGkpKSxuLmd6aW5kZXg9PT1uLmd6aGVhZC5leHRyYS5sZW5ndGgmJihuLmd6aW5kZXg9MCxuLnN0YXR1cz03Myl9ZWxzZSBuLnN0YXR1cz03MztpZig3Mz09PW4uc3RhdHVzKWlmKG4uZ3poZWFkLm5hbWUpe2k9bi5wZW5kaW5nO2Rve2lmKG4ucGVuZGluZz09PW4ucGVuZGluZ19idWZfc2l6ZSYmKG4uZ3poZWFkLmhjcmMmJm4ucGVuZGluZz5pJiYoZS5hZGxlcj1wKGUuYWRsZXIsbi5wZW5kaW5nX2J1ZixuLnBlbmRpbmctaSxpKSksRihlKSxpPW4ucGVuZGluZyxuLnBlbmRpbmc9PT1uLnBlbmRpbmdfYnVmX3NpemUpKXtzPTE7YnJlYWt9cz1uLmd6aW5kZXg8bi5nemhlYWQubmFtZS5sZW5ndGg/MjU1Jm4uZ3poZWFkLm5hbWUuY2hhckNvZGVBdChuLmd6aW5kZXgrKyk6MCxVKG4scyl9d2hpbGUoMCE9PXMpO24uZ3poZWFkLmhjcmMmJm4ucGVuZGluZz5pJiYoZS5hZGxlcj1wKGUuYWRsZXIsbi5wZW5kaW5nX2J1ZixuLnBlbmRpbmctaSxpKSksMD09PXMmJihuLmd6aW5kZXg9MCxuLnN0YXR1cz05MSl9ZWxzZSBuLnN0YXR1cz05MTtpZig5MT09PW4uc3RhdHVzKWlmKG4uZ3poZWFkLmNvbW1lbnQpe2k9bi5wZW5kaW5nO2Rve2lmKG4ucGVuZGluZz09PW4ucGVuZGluZ19idWZfc2l6ZSYmKG4uZ3poZWFkLmhjcmMmJm4ucGVuZGluZz5pJiYoZS5hZGxlcj1wKGUuYWRsZXIsbi5wZW5kaW5nX2J1ZixuLnBlbmRpbmctaSxpKSksRihlKSxpPW4ucGVuZGluZyxuLnBlbmRpbmc9PT1uLnBlbmRpbmdfYnVmX3NpemUpKXtzPTE7YnJlYWt9cz1uLmd6aW5kZXg8bi5nemhlYWQuY29tbWVudC5sZW5ndGg/MjU1Jm4uZ3poZWFkLmNvbW1lbnQuY2hhckNvZGVBdChuLmd6aW5kZXgrKyk6MCxVKG4scyl9d2hpbGUoMCE9PXMpO24uZ3poZWFkLmhjcmMmJm4ucGVuZGluZz5pJiYoZS5hZGxlcj1wKGUuYWRsZXIsbi5wZW5kaW5nX2J1ZixuLnBlbmRpbmctaSxpKSksMD09PXMmJihuLnN0YXR1cz0xMDMpfWVsc2Ugbi5zdGF0dXM9MTAzO2lmKDEwMz09PW4uc3RhdHVzJiYobi5nemhlYWQuaGNyYz8obi5wZW5kaW5nKzI+bi5wZW5kaW5nX2J1Zl9zaXplJiZGKGUpLG4ucGVuZGluZysyPD1uLnBlbmRpbmdfYnVmX3NpemUmJihVKG4sMjU1JmUuYWRsZXIpLFUobixlLmFkbGVyPj44JjI1NSksZS5hZGxlcj0wLG4uc3RhdHVzPUUpKTpuLnN0YXR1cz1FKSwwIT09bi5wZW5kaW5nKXtpZihGKGUpLDA9PT1lLmF2YWlsX291dClyZXR1cm4gbi5sYXN0X2ZsdXNoPS0xLG19ZWxzZSBpZigwPT09ZS5hdmFpbF9pbiYmVCh0KTw9VChyKSYmdCE9PWYpcmV0dXJuIFIoZSwtNSk7aWYoNjY2PT09bi5zdGF0dXMmJjAhPT1lLmF2YWlsX2luKXJldHVybiBSKGUsLTUpO2lmKDAhPT1lLmF2YWlsX2lufHwwIT09bi5sb29rYWhlYWR8fHQhPT1sJiY2NjYhPT1uLnN0YXR1cyl7dmFyIG89Mj09PW4uc3RyYXRlZ3k/ZnVuY3Rpb24oZSx0KXtmb3IodmFyIHI7Oyl7aWYoMD09PWUubG9va2FoZWFkJiYoaihlKSwwPT09ZS5sb29rYWhlYWQpKXtpZih0PT09bClyZXR1cm4gQTticmVha31pZihlLm1hdGNoX2xlbmd0aD0wLHI9dS5fdHJfdGFsbHkoZSwwLGUud2luZG93W2Uuc3Ryc3RhcnRdKSxlLmxvb2thaGVhZC0tLGUuc3Ryc3RhcnQrKyxyJiYoTihlLCExKSwwPT09ZS5zdHJtLmF2YWlsX291dCkpcmV0dXJuIEF9cmV0dXJuIGUuaW5zZXJ0PTAsdD09PWY/KE4oZSwhMCksMD09PWUuc3RybS5hdmFpbF9vdXQ/TzpCKTplLmxhc3RfbGl0JiYoTihlLCExKSwwPT09ZS5zdHJtLmF2YWlsX291dCk/QTpJfShuLHQpOjM9PT1uLnN0cmF0ZWd5P2Z1bmN0aW9uKGUsdCl7Zm9yKHZhciByLG4saSxzLGE9ZS53aW5kb3c7Oyl7aWYoZS5sb29rYWhlYWQ8PVMpe2lmKGooZSksZS5sb29rYWhlYWQ8PVMmJnQ9PT1sKXJldHVybiBBO2lmKDA9PT1lLmxvb2thaGVhZClicmVha31pZihlLm1hdGNoX2xlbmd0aD0wLGUubG9va2FoZWFkPj14JiYwPGUuc3Ryc3RhcnQmJihuPWFbaT1lLnN0cnN0YXJ0LTFdKT09PWFbKytpXSYmbj09PWFbKytpXSYmbj09PWFbKytpXSl7cz1lLnN0cnN0YXJ0K1M7ZG97fXdoaWxlKG49PT1hWysraV0mJm49PT1hWysraV0mJm49PT1hWysraV0mJm49PT1hWysraV0mJm49PT1hWysraV0mJm49PT1hWysraV0mJm49PT1hWysraV0mJm49PT1hWysraV0mJmk8cyk7ZS5tYXRjaF9sZW5ndGg9Uy0ocy1pKSxlLm1hdGNoX2xlbmd0aD5lLmxvb2thaGVhZCYmKGUubWF0Y2hfbGVuZ3RoPWUubG9va2FoZWFkKX1pZihlLm1hdGNoX2xlbmd0aD49eD8ocj11Ll90cl90YWxseShlLDEsZS5tYXRjaF9sZW5ndGgteCksZS5sb29rYWhlYWQtPWUubWF0Y2hfbGVuZ3RoLGUuc3Ryc3RhcnQrPWUubWF0Y2hfbGVuZ3RoLGUubWF0Y2hfbGVuZ3RoPTApOihyPXUuX3RyX3RhbGx5KGUsMCxlLndpbmRvd1tlLnN0cnN0YXJ0XSksZS5sb29rYWhlYWQtLSxlLnN0cnN0YXJ0KyspLHImJihOKGUsITEpLDA9PT1lLnN0cm0uYXZhaWxfb3V0KSlyZXR1cm4gQX1yZXR1cm4gZS5pbnNlcnQ9MCx0PT09Zj8oTihlLCEwKSwwPT09ZS5zdHJtLmF2YWlsX291dD9POkIpOmUubGFzdF9saXQmJihOKGUsITEpLDA9PT1lLnN0cm0uYXZhaWxfb3V0KT9BOkl9KG4sdCk6aFtuLmxldmVsXS5mdW5jKG4sdCk7aWYobyE9PU8mJm8hPT1CfHwobi5zdGF0dXM9NjY2KSxvPT09QXx8bz09PU8pcmV0dXJuIDA9PT1lLmF2YWlsX291dCYmKG4ubGFzdF9mbHVzaD0tMSksbTtpZihvPT09SSYmKDE9PT10P3UuX3RyX2FsaWduKG4pOjUhPT10JiYodS5fdHJfc3RvcmVkX2Jsb2NrKG4sMCwwLCExKSwzPT09dCYmKEQobi5oZWFkKSwwPT09bi5sb29rYWhlYWQmJihuLnN0cnN0YXJ0PTAsbi5ibG9ja19zdGFydD0wLG4uaW5zZXJ0PTApKSksRihlKSwwPT09ZS5hdmFpbF9vdXQpKXJldHVybiBuLmxhc3RfZmx1c2g9LTEsbX1yZXR1cm4gdCE9PWY/bTpuLndyYXA8PTA/MTooMj09PW4ud3JhcD8oVShuLDI1NSZlLmFkbGVyKSxVKG4sZS5hZGxlcj4+OCYyNTUpLFUobixlLmFkbGVyPj4xNiYyNTUpLFUobixlLmFkbGVyPj4yNCYyNTUpLFUobiwyNTUmZS50b3RhbF9pbiksVShuLGUudG90YWxfaW4+PjgmMjU1KSxVKG4sZS50b3RhbF9pbj4+MTYmMjU1KSxVKG4sZS50b3RhbF9pbj4+MjQmMjU1KSk6KFAobixlLmFkbGVyPj4+MTYpLFAobiw2NTUzNSZlLmFkbGVyKSksRihlKSwwPG4ud3JhcCYmKG4ud3JhcD0tbi53cmFwKSwwIT09bi5wZW5kaW5nP206MSl9LHIuZGVmbGF0ZUVuZD1mdW5jdGlvbihlKXt2YXIgdDtyZXR1cm4gZSYmZS5zdGF0ZT8odD1lLnN0YXRlLnN0YXR1cykhPT1DJiY2OSE9PXQmJjczIT09dCYmOTEhPT10JiYxMDMhPT10JiZ0IT09RSYmNjY2IT09dD9SKGUsXyk6KGUuc3RhdGU9bnVsbCx0PT09RT9SKGUsLTMpOm0pOl99LHIuZGVmbGF0ZVNldERpY3Rpb25hcnk9ZnVuY3Rpb24oZSx0KXt2YXIgcixuLGkscyxhLG8saCx1LGw9dC5sZW5ndGg7aWYoIWV8fCFlLnN0YXRlKXJldHVybiBfO2lmKDI9PT0ocz0ocj1lLnN0YXRlKS53cmFwKXx8MT09PXMmJnIuc3RhdHVzIT09Q3x8ci5sb29rYWhlYWQpcmV0dXJuIF87Zm9yKDE9PT1zJiYoZS5hZGxlcj1kKGUuYWRsZXIsdCxsLDApKSxyLndyYXA9MCxsPj1yLndfc2l6ZSYmKDA9PT1zJiYoRChyLmhlYWQpLHIuc3Ryc3RhcnQ9MCxyLmJsb2NrX3N0YXJ0PTAsci5pbnNlcnQ9MCksdT1uZXcgYy5CdWY4KHIud19zaXplKSxjLmFycmF5U2V0KHUsdCxsLXIud19zaXplLHIud19zaXplLDApLHQ9dSxsPXIud19zaXplKSxhPWUuYXZhaWxfaW4sbz1lLm5leHRfaW4saD1lLmlucHV0LGUuYXZhaWxfaW49bCxlLm5leHRfaW49MCxlLmlucHV0PXQsaihyKTtyLmxvb2thaGVhZD49eDspe2ZvcihuPXIuc3Ryc3RhcnQsaT1yLmxvb2thaGVhZC0oeC0xKTtyLmluc19oPShyLmluc19oPDxyLmhhc2hfc2hpZnReci53aW5kb3dbbit4LTFdKSZyLmhhc2hfbWFzayxyLnByZXZbbiZyLndfbWFza109ci5oZWFkW3IuaW5zX2hdLHIuaGVhZFtyLmluc19oXT1uLG4rKywtLWk7KTtyLnN0cnN0YXJ0PW4sci5sb29rYWhlYWQ9eC0xLGoocil9cmV0dXJuIHIuc3Ryc3RhcnQrPXIubG9va2FoZWFkLHIuYmxvY2tfc3RhcnQ9ci5zdHJzdGFydCxyLmluc2VydD1yLmxvb2thaGVhZCxyLmxvb2thaGVhZD0wLHIubWF0Y2hfbGVuZ3RoPXIucHJldl9sZW5ndGg9eC0xLHIubWF0Y2hfYXZhaWxhYmxlPTAsZS5uZXh0X2luPW8sZS5pbnB1dD1oLGUuYXZhaWxfaW49YSxyLndyYXA9cyxtfSxyLmRlZmxhdGVJbmZvPVwicGFrbyBkZWZsYXRlIChmcm9tIE5vZGVjYSBwcm9qZWN0KVwifSx7XCIuLi91dGlscy9jb21tb25cIjo0MSxcIi4vYWRsZXIzMlwiOjQzLFwiLi9jcmMzMlwiOjQ1LFwiLi9tZXNzYWdlc1wiOjUxLFwiLi90cmVlc1wiOjUyfV0sNDc6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt0LmV4cG9ydHM9ZnVuY3Rpb24oKXt0aGlzLnRleHQ9MCx0aGlzLnRpbWU9MCx0aGlzLnhmbGFncz0wLHRoaXMub3M9MCx0aGlzLmV4dHJhPW51bGwsdGhpcy5leHRyYV9sZW49MCx0aGlzLm5hbWU9XCJcIix0aGlzLmNvbW1lbnQ9XCJcIix0aGlzLmhjcmM9MCx0aGlzLmRvbmU9ITF9fSx7fV0sNDg6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt0LmV4cG9ydHM9ZnVuY3Rpb24oZSx0KXt2YXIgcixuLGkscyxhLG8saCx1LGwsZixjLGQscCxtLF8sZyxiLHYseSx3LGsseCxTLHosQztyPWUuc3RhdGUsbj1lLm5leHRfaW4sej1lLmlucHV0LGk9bisoZS5hdmFpbF9pbi01KSxzPWUubmV4dF9vdXQsQz1lLm91dHB1dCxhPXMtKHQtZS5hdmFpbF9vdXQpLG89cysoZS5hdmFpbF9vdXQtMjU3KSxoPXIuZG1heCx1PXIud3NpemUsbD1yLndoYXZlLGY9ci53bmV4dCxjPXIud2luZG93LGQ9ci5ob2xkLHA9ci5iaXRzLG09ci5sZW5jb2RlLF89ci5kaXN0Y29kZSxnPSgxPDxyLmxlbmJpdHMpLTEsYj0oMTw8ci5kaXN0Yml0cyktMTtlOmRve3A8MTUmJihkKz16W24rK108PHAscCs9OCxkKz16W24rK108PHAscCs9OCksdj1tW2QmZ107dDpmb3IoOzspe2lmKGQ+Pj49eT12Pj4+MjQscC09eSwwPT09KHk9dj4+PjE2JjI1NSkpQ1tzKytdPTY1NTM1JnY7ZWxzZXtpZighKDE2JnkpKXtpZigwPT0oNjQmeSkpe3Y9bVsoNjU1MzUmdikrKGQmKDE8PHkpLTEpXTtjb250aW51ZSB0fWlmKDMyJnkpe3IubW9kZT0xMjticmVhayBlfWUubXNnPVwiaW52YWxpZCBsaXRlcmFsL2xlbmd0aCBjb2RlXCIsci5tb2RlPTMwO2JyZWFrIGV9dz02NTUzNSZ2LCh5Jj0xNSkmJihwPHkmJihkKz16W24rK108PHAscCs9OCksdys9ZCYoMTw8eSktMSxkPj4+PXkscC09eSkscDwxNSYmKGQrPXpbbisrXTw8cCxwKz04LGQrPXpbbisrXTw8cCxwKz04KSx2PV9bZCZiXTtyOmZvcig7Oyl7aWYoZD4+Pj15PXY+Pj4yNCxwLT15LCEoMTYmKHk9dj4+PjE2JjI1NSkpKXtpZigwPT0oNjQmeSkpe3Y9X1soNjU1MzUmdikrKGQmKDE8PHkpLTEpXTtjb250aW51ZSByfWUubXNnPVwiaW52YWxpZCBkaXN0YW5jZSBjb2RlXCIsci5tb2RlPTMwO2JyZWFrIGV9aWYoaz02NTUzNSZ2LHA8KHkmPTE1KSYmKGQrPXpbbisrXTw8cCwocCs9OCk8eSYmKGQrPXpbbisrXTw8cCxwKz04KSksaDwoays9ZCYoMTw8eSktMSkpe2UubXNnPVwiaW52YWxpZCBkaXN0YW5jZSB0b28gZmFyIGJhY2tcIixyLm1vZGU9MzA7YnJlYWsgZX1pZihkPj4+PXkscC09eSwoeT1zLWEpPGspe2lmKGw8KHk9ay15KSYmci5zYW5lKXtlLm1zZz1cImludmFsaWQgZGlzdGFuY2UgdG9vIGZhciBiYWNrXCIsci5tb2RlPTMwO2JyZWFrIGV9aWYoUz1jLCh4PTApPT09Zil7aWYoeCs9dS15LHk8dyl7Zm9yKHctPXk7Q1tzKytdPWNbeCsrXSwtLXk7KTt4PXMtayxTPUN9fWVsc2UgaWYoZjx5KXtpZih4Kz11K2YteSwoeS09Zik8dyl7Zm9yKHctPXk7Q1tzKytdPWNbeCsrXSwtLXk7KTtpZih4PTAsZjx3KXtmb3Iody09eT1mO0NbcysrXT1jW3grK10sLS15Oyk7eD1zLWssUz1DfX19ZWxzZSBpZih4Kz1mLXkseTx3KXtmb3Iody09eTtDW3MrK109Y1t4KytdLC0teTspO3g9cy1rLFM9Q31mb3IoOzI8dzspQ1tzKytdPVNbeCsrXSxDW3MrK109U1t4KytdLENbcysrXT1TW3grK10sdy09Mzt3JiYoQ1tzKytdPVNbeCsrXSwxPHcmJihDW3MrK109U1t4KytdKSl9ZWxzZXtmb3IoeD1zLWs7Q1tzKytdPUNbeCsrXSxDW3MrK109Q1t4KytdLENbcysrXT1DW3grK10sMjwody09Myk7KTt3JiYoQ1tzKytdPUNbeCsrXSwxPHcmJihDW3MrK109Q1t4KytdKSl9YnJlYWt9fWJyZWFrfX13aGlsZShuPGkmJnM8byk7bi09dz1wPj4zLGQmPSgxPDwocC09dzw8MykpLTEsZS5uZXh0X2luPW4sZS5uZXh0X291dD1zLGUuYXZhaWxfaW49bjxpP2ktbis1OjUtKG4taSksZS5hdmFpbF9vdXQ9czxvP28tcysyNTc6MjU3LShzLW8pLHIuaG9sZD1kLHIuYml0cz1wfX0se31dLDQ5OltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7dmFyIEk9ZShcIi4uL3V0aWxzL2NvbW1vblwiKSxPPWUoXCIuL2FkbGVyMzJcIiksQj1lKFwiLi9jcmMzMlwiKSxSPWUoXCIuL2luZmZhc3RcIiksVD1lKFwiLi9pbmZ0cmVlc1wiKSxEPTEsRj0yLE49MCxVPS0yLFA9MSxuPTg1MixpPTU5MjtmdW5jdGlvbiBMKGUpe3JldHVybihlPj4+MjQmMjU1KSsoZT4+PjgmNjUyODApKygoNjUyODAmZSk8PDgpKygoMjU1JmUpPDwyNCl9ZnVuY3Rpb24gcygpe3RoaXMubW9kZT0wLHRoaXMubGFzdD0hMSx0aGlzLndyYXA9MCx0aGlzLmhhdmVkaWN0PSExLHRoaXMuZmxhZ3M9MCx0aGlzLmRtYXg9MCx0aGlzLmNoZWNrPTAsdGhpcy50b3RhbD0wLHRoaXMuaGVhZD1udWxsLHRoaXMud2JpdHM9MCx0aGlzLndzaXplPTAsdGhpcy53aGF2ZT0wLHRoaXMud25leHQ9MCx0aGlzLndpbmRvdz1udWxsLHRoaXMuaG9sZD0wLHRoaXMuYml0cz0wLHRoaXMubGVuZ3RoPTAsdGhpcy5vZmZzZXQ9MCx0aGlzLmV4dHJhPTAsdGhpcy5sZW5jb2RlPW51bGwsdGhpcy5kaXN0Y29kZT1udWxsLHRoaXMubGVuYml0cz0wLHRoaXMuZGlzdGJpdHM9MCx0aGlzLm5jb2RlPTAsdGhpcy5ubGVuPTAsdGhpcy5uZGlzdD0wLHRoaXMuaGF2ZT0wLHRoaXMubmV4dD1udWxsLHRoaXMubGVucz1uZXcgSS5CdWYxNigzMjApLHRoaXMud29yaz1uZXcgSS5CdWYxNigyODgpLHRoaXMubGVuZHluPW51bGwsdGhpcy5kaXN0ZHluPW51bGwsdGhpcy5zYW5lPTAsdGhpcy5iYWNrPTAsdGhpcy53YXM9MH1mdW5jdGlvbiBhKGUpe3ZhciB0O3JldHVybiBlJiZlLnN0YXRlPyh0PWUuc3RhdGUsZS50b3RhbF9pbj1lLnRvdGFsX291dD10LnRvdGFsPTAsZS5tc2c9XCJcIix0LndyYXAmJihlLmFkbGVyPTEmdC53cmFwKSx0Lm1vZGU9UCx0Lmxhc3Q9MCx0LmhhdmVkaWN0PTAsdC5kbWF4PTMyNzY4LHQuaGVhZD1udWxsLHQuaG9sZD0wLHQuYml0cz0wLHQubGVuY29kZT10LmxlbmR5bj1uZXcgSS5CdWYzMihuKSx0LmRpc3Rjb2RlPXQuZGlzdGR5bj1uZXcgSS5CdWYzMihpKSx0LnNhbmU9MSx0LmJhY2s9LTEsTik6VX1mdW5jdGlvbiBvKGUpe3ZhciB0O3JldHVybiBlJiZlLnN0YXRlPygodD1lLnN0YXRlKS53c2l6ZT0wLHQud2hhdmU9MCx0LnduZXh0PTAsYShlKSk6VX1mdW5jdGlvbiBoKGUsdCl7dmFyIHIsbjtyZXR1cm4gZSYmZS5zdGF0ZT8obj1lLnN0YXRlLHQ8MD8ocj0wLHQ9LXQpOihyPTErKHQ+PjQpLHQ8NDgmJih0Jj0xNSkpLHQmJih0PDh8fDE1PHQpP1U6KG51bGwhPT1uLndpbmRvdyYmbi53Yml0cyE9PXQmJihuLndpbmRvdz1udWxsKSxuLndyYXA9cixuLndiaXRzPXQsbyhlKSkpOlV9ZnVuY3Rpb24gdShlLHQpe3ZhciByLG47cmV0dXJuIGU/KG49bmV3IHMsKGUuc3RhdGU9bikud2luZG93PW51bGwsKHI9aChlLHQpKSE9PU4mJihlLnN0YXRlPW51bGwpLHIpOlV9dmFyIGwsZixjPSEwO2Z1bmN0aW9uIGooZSl7aWYoYyl7dmFyIHQ7Zm9yKGw9bmV3IEkuQnVmMzIoNTEyKSxmPW5ldyBJLkJ1ZjMyKDMyKSx0PTA7dDwxNDQ7KWUubGVuc1t0KytdPTg7Zm9yKDt0PDI1NjspZS5sZW5zW3QrK109OTtmb3IoO3Q8MjgwOyllLmxlbnNbdCsrXT03O2Zvcig7dDwyODg7KWUubGVuc1t0KytdPTg7Zm9yKFQoRCxlLmxlbnMsMCwyODgsbCwwLGUud29yayx7Yml0czo5fSksdD0wO3Q8MzI7KWUubGVuc1t0KytdPTU7VChGLGUubGVucywwLDMyLGYsMCxlLndvcmsse2JpdHM6NX0pLGM9ITF9ZS5sZW5jb2RlPWwsZS5sZW5iaXRzPTksZS5kaXN0Y29kZT1mLGUuZGlzdGJpdHM9NX1mdW5jdGlvbiBaKGUsdCxyLG4pe3ZhciBpLHM9ZS5zdGF0ZTtyZXR1cm4gbnVsbD09PXMud2luZG93JiYocy53c2l6ZT0xPDxzLndiaXRzLHMud25leHQ9MCxzLndoYXZlPTAscy53aW5kb3c9bmV3IEkuQnVmOChzLndzaXplKSksbj49cy53c2l6ZT8oSS5hcnJheVNldChzLndpbmRvdyx0LHItcy53c2l6ZSxzLndzaXplLDApLHMud25leHQ9MCxzLndoYXZlPXMud3NpemUpOihuPChpPXMud3NpemUtcy53bmV4dCkmJihpPW4pLEkuYXJyYXlTZXQocy53aW5kb3csdCxyLW4saSxzLnduZXh0KSwobi09aSk/KEkuYXJyYXlTZXQocy53aW5kb3csdCxyLW4sbiwwKSxzLnduZXh0PW4scy53aGF2ZT1zLndzaXplKToocy53bmV4dCs9aSxzLnduZXh0PT09cy53c2l6ZSYmKHMud25leHQ9MCkscy53aGF2ZTxzLndzaXplJiYocy53aGF2ZSs9aSkpKSwwfXIuaW5mbGF0ZVJlc2V0PW8sci5pbmZsYXRlUmVzZXQyPWgsci5pbmZsYXRlUmVzZXRLZWVwPWEsci5pbmZsYXRlSW5pdD1mdW5jdGlvbihlKXtyZXR1cm4gdShlLDE1KX0sci5pbmZsYXRlSW5pdDI9dSxyLmluZmxhdGU9ZnVuY3Rpb24oZSx0KXt2YXIgcixuLGkscyxhLG8saCx1LGwsZixjLGQscCxtLF8sZyxiLHYseSx3LGsseCxTLHosQz0wLEU9bmV3IEkuQnVmOCg0KSxBPVsxNiwxNywxOCwwLDgsNyw5LDYsMTAsNSwxMSw0LDEyLDMsMTMsMiwxNCwxLDE1XTtpZighZXx8IWUuc3RhdGV8fCFlLm91dHB1dHx8IWUuaW5wdXQmJjAhPT1lLmF2YWlsX2luKXJldHVybiBVOzEyPT09KHI9ZS5zdGF0ZSkubW9kZSYmKHIubW9kZT0xMyksYT1lLm5leHRfb3V0LGk9ZS5vdXRwdXQsaD1lLmF2YWlsX291dCxzPWUubmV4dF9pbixuPWUuaW5wdXQsbz1lLmF2YWlsX2luLHU9ci5ob2xkLGw9ci5iaXRzLGY9byxjPWgseD1OO2U6Zm9yKDs7KXN3aXRjaChyLm1vZGUpe2Nhc2UgUDppZigwPT09ci53cmFwKXtyLm1vZGU9MTM7YnJlYWt9Zm9yKDtsPDE2Oyl7aWYoMD09PW8pYnJlYWsgZTtvLS0sdSs9bltzKytdPDxsLGwrPTh9aWYoMiZyLndyYXAmJjM1NjE1PT09dSl7RVtyLmNoZWNrPTBdPTI1NSZ1LEVbMV09dT4+PjgmMjU1LHIuY2hlY2s9QihyLmNoZWNrLEUsMiwwKSxsPXU9MCxyLm1vZGU9MjticmVha31pZihyLmZsYWdzPTAsci5oZWFkJiYoci5oZWFkLmRvbmU9ITEpLCEoMSZyLndyYXApfHwoKCgyNTUmdSk8PDgpKyh1Pj44KSklMzEpe2UubXNnPVwiaW5jb3JyZWN0IGhlYWRlciBjaGVja1wiLHIubW9kZT0zMDticmVha31pZig4IT0oMTUmdSkpe2UubXNnPVwidW5rbm93biBjb21wcmVzc2lvbiBtZXRob2RcIixyLm1vZGU9MzA7YnJlYWt9aWYobC09NCxrPTgrKDE1Jih1Pj4+PTQpKSwwPT09ci53Yml0cylyLndiaXRzPWs7ZWxzZSBpZihrPnIud2JpdHMpe2UubXNnPVwiaW52YWxpZCB3aW5kb3cgc2l6ZVwiLHIubW9kZT0zMDticmVha31yLmRtYXg9MTw8ayxlLmFkbGVyPXIuY2hlY2s9MSxyLm1vZGU9NTEyJnU/MTA6MTIsbD11PTA7YnJlYWs7Y2FzZSAyOmZvcig7bDwxNjspe2lmKDA9PT1vKWJyZWFrIGU7by0tLHUrPW5bcysrXTw8bCxsKz04fWlmKHIuZmxhZ3M9dSw4IT0oMjU1JnIuZmxhZ3MpKXtlLm1zZz1cInVua25vd24gY29tcHJlc3Npb24gbWV0aG9kXCIsci5tb2RlPTMwO2JyZWFrfWlmKDU3MzQ0JnIuZmxhZ3Mpe2UubXNnPVwidW5rbm93biBoZWFkZXIgZmxhZ3Mgc2V0XCIsci5tb2RlPTMwO2JyZWFrfXIuaGVhZCYmKHIuaGVhZC50ZXh0PXU+PjgmMSksNTEyJnIuZmxhZ3MmJihFWzBdPTI1NSZ1LEVbMV09dT4+PjgmMjU1LHIuY2hlY2s9QihyLmNoZWNrLEUsMiwwKSksbD11PTAsci5tb2RlPTM7Y2FzZSAzOmZvcig7bDwzMjspe2lmKDA9PT1vKWJyZWFrIGU7by0tLHUrPW5bcysrXTw8bCxsKz04fXIuaGVhZCYmKHIuaGVhZC50aW1lPXUpLDUxMiZyLmZsYWdzJiYoRVswXT0yNTUmdSxFWzFdPXU+Pj44JjI1NSxFWzJdPXU+Pj4xNiYyNTUsRVszXT11Pj4+MjQmMjU1LHIuY2hlY2s9QihyLmNoZWNrLEUsNCwwKSksbD11PTAsci5tb2RlPTQ7Y2FzZSA0OmZvcig7bDwxNjspe2lmKDA9PT1vKWJyZWFrIGU7by0tLHUrPW5bcysrXTw8bCxsKz04fXIuaGVhZCYmKHIuaGVhZC54ZmxhZ3M9MjU1JnUsci5oZWFkLm9zPXU+PjgpLDUxMiZyLmZsYWdzJiYoRVswXT0yNTUmdSxFWzFdPXU+Pj44JjI1NSxyLmNoZWNrPUIoci5jaGVjayxFLDIsMCkpLGw9dT0wLHIubW9kZT01O2Nhc2UgNTppZigxMDI0JnIuZmxhZ3Mpe2Zvcig7bDwxNjspe2lmKDA9PT1vKWJyZWFrIGU7by0tLHUrPW5bcysrXTw8bCxsKz04fXIubGVuZ3RoPXUsci5oZWFkJiYoci5oZWFkLmV4dHJhX2xlbj11KSw1MTImci5mbGFncyYmKEVbMF09MjU1JnUsRVsxXT11Pj4+OCYyNTUsci5jaGVjaz1CKHIuY2hlY2ssRSwyLDApKSxsPXU9MH1lbHNlIHIuaGVhZCYmKHIuaGVhZC5leHRyYT1udWxsKTtyLm1vZGU9NjtjYXNlIDY6aWYoMTAyNCZyLmZsYWdzJiYobzwoZD1yLmxlbmd0aCkmJihkPW8pLGQmJihyLmhlYWQmJihrPXIuaGVhZC5leHRyYV9sZW4tci5sZW5ndGgsci5oZWFkLmV4dHJhfHwoci5oZWFkLmV4dHJhPW5ldyBBcnJheShyLmhlYWQuZXh0cmFfbGVuKSksSS5hcnJheVNldChyLmhlYWQuZXh0cmEsbixzLGQsaykpLDUxMiZyLmZsYWdzJiYoci5jaGVjaz1CKHIuY2hlY2ssbixkLHMpKSxvLT1kLHMrPWQsci5sZW5ndGgtPWQpLHIubGVuZ3RoKSlicmVhayBlO3IubGVuZ3RoPTAsci5tb2RlPTc7Y2FzZSA3OmlmKDIwNDgmci5mbGFncyl7aWYoMD09PW8pYnJlYWsgZTtmb3IoZD0wO2s9bltzK2QrK10sci5oZWFkJiZrJiZyLmxlbmd0aDw2NTUzNiYmKHIuaGVhZC5uYW1lKz1TdHJpbmcuZnJvbUNoYXJDb2RlKGspKSxrJiZkPG87KTtpZig1MTImci5mbGFncyYmKHIuY2hlY2s9QihyLmNoZWNrLG4sZCxzKSksby09ZCxzKz1kLGspYnJlYWsgZX1lbHNlIHIuaGVhZCYmKHIuaGVhZC5uYW1lPW51bGwpO3IubGVuZ3RoPTAsci5tb2RlPTg7Y2FzZSA4OmlmKDQwOTYmci5mbGFncyl7aWYoMD09PW8pYnJlYWsgZTtmb3IoZD0wO2s9bltzK2QrK10sci5oZWFkJiZrJiZyLmxlbmd0aDw2NTUzNiYmKHIuaGVhZC5jb21tZW50Kz1TdHJpbmcuZnJvbUNoYXJDb2RlKGspKSxrJiZkPG87KTtpZig1MTImci5mbGFncyYmKHIuY2hlY2s9QihyLmNoZWNrLG4sZCxzKSksby09ZCxzKz1kLGspYnJlYWsgZX1lbHNlIHIuaGVhZCYmKHIuaGVhZC5jb21tZW50PW51bGwpO3IubW9kZT05O2Nhc2UgOTppZig1MTImci5mbGFncyl7Zm9yKDtsPDE2Oyl7aWYoMD09PW8pYnJlYWsgZTtvLS0sdSs9bltzKytdPDxsLGwrPTh9aWYodSE9PSg2NTUzNSZyLmNoZWNrKSl7ZS5tc2c9XCJoZWFkZXIgY3JjIG1pc21hdGNoXCIsci5tb2RlPTMwO2JyZWFrfWw9dT0wfXIuaGVhZCYmKHIuaGVhZC5oY3JjPXIuZmxhZ3M+PjkmMSxyLmhlYWQuZG9uZT0hMCksZS5hZGxlcj1yLmNoZWNrPTAsci5tb2RlPTEyO2JyZWFrO2Nhc2UgMTA6Zm9yKDtsPDMyOyl7aWYoMD09PW8pYnJlYWsgZTtvLS0sdSs9bltzKytdPDxsLGwrPTh9ZS5hZGxlcj1yLmNoZWNrPUwodSksbD11PTAsci5tb2RlPTExO2Nhc2UgMTE6aWYoMD09PXIuaGF2ZWRpY3QpcmV0dXJuIGUubmV4dF9vdXQ9YSxlLmF2YWlsX291dD1oLGUubmV4dF9pbj1zLGUuYXZhaWxfaW49byxyLmhvbGQ9dSxyLmJpdHM9bCwyO2UuYWRsZXI9ci5jaGVjaz0xLHIubW9kZT0xMjtjYXNlIDEyOmlmKDU9PT10fHw2PT09dClicmVhayBlO2Nhc2UgMTM6aWYoci5sYXN0KXt1Pj4+PTcmbCxsLT03Jmwsci5tb2RlPTI3O2JyZWFrfWZvcig7bDwzOyl7aWYoMD09PW8pYnJlYWsgZTtvLS0sdSs9bltzKytdPDxsLGwrPTh9c3dpdGNoKHIubGFzdD0xJnUsbC09MSwzJih1Pj4+PTEpKXtjYXNlIDA6ci5tb2RlPTE0O2JyZWFrO2Nhc2UgMTppZihqKHIpLHIubW9kZT0yMCw2IT09dClicmVhazt1Pj4+PTIsbC09MjticmVhayBlO2Nhc2UgMjpyLm1vZGU9MTc7YnJlYWs7Y2FzZSAzOmUubXNnPVwiaW52YWxpZCBibG9jayB0eXBlXCIsci5tb2RlPTMwfXU+Pj49MixsLT0yO2JyZWFrO2Nhc2UgMTQ6Zm9yKHU+Pj49NyZsLGwtPTcmbDtsPDMyOyl7aWYoMD09PW8pYnJlYWsgZTtvLS0sdSs9bltzKytdPDxsLGwrPTh9aWYoKDY1NTM1JnUpIT0odT4+PjE2XjY1NTM1KSl7ZS5tc2c9XCJpbnZhbGlkIHN0b3JlZCBibG9jayBsZW5ndGhzXCIsci5tb2RlPTMwO2JyZWFrfWlmKHIubGVuZ3RoPTY1NTM1JnUsbD11PTAsci5tb2RlPTE1LDY9PT10KWJyZWFrIGU7Y2FzZSAxNTpyLm1vZGU9MTY7Y2FzZSAxNjppZihkPXIubGVuZ3RoKXtpZihvPGQmJihkPW8pLGg8ZCYmKGQ9aCksMD09PWQpYnJlYWsgZTtJLmFycmF5U2V0KGksbixzLGQsYSksby09ZCxzKz1kLGgtPWQsYSs9ZCxyLmxlbmd0aC09ZDticmVha31yLm1vZGU9MTI7YnJlYWs7Y2FzZSAxNzpmb3IoO2w8MTQ7KXtpZigwPT09bylicmVhayBlO28tLSx1Kz1uW3MrK108PGwsbCs9OH1pZihyLm5sZW49MjU3KygzMSZ1KSx1Pj4+PTUsbC09NSxyLm5kaXN0PTErKDMxJnUpLHU+Pj49NSxsLT01LHIubmNvZGU9NCsoMTUmdSksdT4+Pj00LGwtPTQsMjg2PHIubmxlbnx8MzA8ci5uZGlzdCl7ZS5tc2c9XCJ0b28gbWFueSBsZW5ndGggb3IgZGlzdGFuY2Ugc3ltYm9sc1wiLHIubW9kZT0zMDticmVha31yLmhhdmU9MCxyLm1vZGU9MTg7Y2FzZSAxODpmb3IoO3IuaGF2ZTxyLm5jb2RlOyl7Zm9yKDtsPDM7KXtpZigwPT09bylicmVhayBlO28tLSx1Kz1uW3MrK108PGwsbCs9OH1yLmxlbnNbQVtyLmhhdmUrK11dPTcmdSx1Pj4+PTMsbC09M31mb3IoO3IuaGF2ZTwxOTspci5sZW5zW0Fbci5oYXZlKytdXT0wO2lmKHIubGVuY29kZT1yLmxlbmR5bixyLmxlbmJpdHM9NyxTPXtiaXRzOnIubGVuYml0c30seD1UKDAsci5sZW5zLDAsMTksci5sZW5jb2RlLDAsci53b3JrLFMpLHIubGVuYml0cz1TLmJpdHMseCl7ZS5tc2c9XCJpbnZhbGlkIGNvZGUgbGVuZ3RocyBzZXRcIixyLm1vZGU9MzA7YnJlYWt9ci5oYXZlPTAsci5tb2RlPTE5O2Nhc2UgMTk6Zm9yKDtyLmhhdmU8ci5ubGVuK3IubmRpc3Q7KXtmb3IoO2c9KEM9ci5sZW5jb2RlW3UmKDE8PHIubGVuYml0cyktMV0pPj4+MTYmMjU1LGI9NjU1MzUmQywhKChfPUM+Pj4yNCk8PWwpOyl7aWYoMD09PW8pYnJlYWsgZTtvLS0sdSs9bltzKytdPDxsLGwrPTh9aWYoYjwxNil1Pj4+PV8sbC09XyxyLmxlbnNbci5oYXZlKytdPWI7ZWxzZXtpZigxNj09PWIpe2Zvcih6PV8rMjtsPHo7KXtpZigwPT09bylicmVhayBlO28tLSx1Kz1uW3MrK108PGwsbCs9OH1pZih1Pj4+PV8sbC09XywwPT09ci5oYXZlKXtlLm1zZz1cImludmFsaWQgYml0IGxlbmd0aCByZXBlYXRcIixyLm1vZGU9MzA7YnJlYWt9az1yLmxlbnNbci5oYXZlLTFdLGQ9MysoMyZ1KSx1Pj4+PTIsbC09Mn1lbHNlIGlmKDE3PT09Yil7Zm9yKHo9XyszO2w8ejspe2lmKDA9PT1vKWJyZWFrIGU7by0tLHUrPW5bcysrXTw8bCxsKz04fWwtPV8saz0wLGQ9MysoNyYodT4+Pj1fKSksdT4+Pj0zLGwtPTN9ZWxzZXtmb3Ioej1fKzc7bDx6Oyl7aWYoMD09PW8pYnJlYWsgZTtvLS0sdSs9bltzKytdPDxsLGwrPTh9bC09XyxrPTAsZD0xMSsoMTI3Jih1Pj4+PV8pKSx1Pj4+PTcsbC09N31pZihyLmhhdmUrZD5yLm5sZW4rci5uZGlzdCl7ZS5tc2c9XCJpbnZhbGlkIGJpdCBsZW5ndGggcmVwZWF0XCIsci5tb2RlPTMwO2JyZWFrfWZvcig7ZC0tOylyLmxlbnNbci5oYXZlKytdPWt9fWlmKDMwPT09ci5tb2RlKWJyZWFrO2lmKDA9PT1yLmxlbnNbMjU2XSl7ZS5tc2c9XCJpbnZhbGlkIGNvZGUgLS0gbWlzc2luZyBlbmQtb2YtYmxvY2tcIixyLm1vZGU9MzA7YnJlYWt9aWYoci5sZW5iaXRzPTksUz17Yml0czpyLmxlbmJpdHN9LHg9VChELHIubGVucywwLHIubmxlbixyLmxlbmNvZGUsMCxyLndvcmssUyksci5sZW5iaXRzPVMuYml0cyx4KXtlLm1zZz1cImludmFsaWQgbGl0ZXJhbC9sZW5ndGhzIHNldFwiLHIubW9kZT0zMDticmVha31pZihyLmRpc3RiaXRzPTYsci5kaXN0Y29kZT1yLmRpc3RkeW4sUz17Yml0czpyLmRpc3RiaXRzfSx4PVQoRixyLmxlbnMsci5ubGVuLHIubmRpc3Qsci5kaXN0Y29kZSwwLHIud29yayxTKSxyLmRpc3RiaXRzPVMuYml0cyx4KXtlLm1zZz1cImludmFsaWQgZGlzdGFuY2VzIHNldFwiLHIubW9kZT0zMDticmVha31pZihyLm1vZGU9MjAsNj09PXQpYnJlYWsgZTtjYXNlIDIwOnIubW9kZT0yMTtjYXNlIDIxOmlmKDY8PW8mJjI1ODw9aCl7ZS5uZXh0X291dD1hLGUuYXZhaWxfb3V0PWgsZS5uZXh0X2luPXMsZS5hdmFpbF9pbj1vLHIuaG9sZD11LHIuYml0cz1sLFIoZSxjKSxhPWUubmV4dF9vdXQsaT1lLm91dHB1dCxoPWUuYXZhaWxfb3V0LHM9ZS5uZXh0X2luLG49ZS5pbnB1dCxvPWUuYXZhaWxfaW4sdT1yLmhvbGQsbD1yLmJpdHMsMTI9PT1yLm1vZGUmJihyLmJhY2s9LTEpO2JyZWFrfWZvcihyLmJhY2s9MDtnPShDPXIubGVuY29kZVt1JigxPDxyLmxlbmJpdHMpLTFdKT4+PjE2JjI1NSxiPTY1NTM1JkMsISgoXz1DPj4+MjQpPD1sKTspe2lmKDA9PT1vKWJyZWFrIGU7by0tLHUrPW5bcysrXTw8bCxsKz04fWlmKGcmJjA9PSgyNDAmZykpe2Zvcih2PV8seT1nLHc9YjtnPShDPXIubGVuY29kZVt3KygodSYoMTw8dit5KS0xKT4+dildKT4+PjE2JjI1NSxiPTY1NTM1JkMsISh2KyhfPUM+Pj4yNCk8PWwpOyl7aWYoMD09PW8pYnJlYWsgZTtvLS0sdSs9bltzKytdPDxsLGwrPTh9dT4+Pj12LGwtPXYsci5iYWNrKz12fWlmKHU+Pj49XyxsLT1fLHIuYmFjays9XyxyLmxlbmd0aD1iLDA9PT1nKXtyLm1vZGU9MjY7YnJlYWt9aWYoMzImZyl7ci5iYWNrPS0xLHIubW9kZT0xMjticmVha31pZig2NCZnKXtlLm1zZz1cImludmFsaWQgbGl0ZXJhbC9sZW5ndGggY29kZVwiLHIubW9kZT0zMDticmVha31yLmV4dHJhPTE1Jmcsci5tb2RlPTIyO2Nhc2UgMjI6aWYoci5leHRyYSl7Zm9yKHo9ci5leHRyYTtsPHo7KXtpZigwPT09bylicmVhayBlO28tLSx1Kz1uW3MrK108PGwsbCs9OH1yLmxlbmd0aCs9dSYoMTw8ci5leHRyYSktMSx1Pj4+PXIuZXh0cmEsbC09ci5leHRyYSxyLmJhY2srPXIuZXh0cmF9ci53YXM9ci5sZW5ndGgsci5tb2RlPTIzO2Nhc2UgMjM6Zm9yKDtnPShDPXIuZGlzdGNvZGVbdSYoMTw8ci5kaXN0Yml0cyktMV0pPj4+MTYmMjU1LGI9NjU1MzUmQywhKChfPUM+Pj4yNCk8PWwpOyl7aWYoMD09PW8pYnJlYWsgZTtvLS0sdSs9bltzKytdPDxsLGwrPTh9aWYoMD09KDI0MCZnKSl7Zm9yKHY9Xyx5PWcsdz1iO2c9KEM9ci5kaXN0Y29kZVt3KygodSYoMTw8dit5KS0xKT4+dildKT4+PjE2JjI1NSxiPTY1NTM1JkMsISh2KyhfPUM+Pj4yNCk8PWwpOyl7aWYoMD09PW8pYnJlYWsgZTtvLS0sdSs9bltzKytdPDxsLGwrPTh9dT4+Pj12LGwtPXYsci5iYWNrKz12fWlmKHU+Pj49XyxsLT1fLHIuYmFjays9Xyw2NCZnKXtlLm1zZz1cImludmFsaWQgZGlzdGFuY2UgY29kZVwiLHIubW9kZT0zMDticmVha31yLm9mZnNldD1iLHIuZXh0cmE9MTUmZyxyLm1vZGU9MjQ7Y2FzZSAyNDppZihyLmV4dHJhKXtmb3Ioej1yLmV4dHJhO2w8ejspe2lmKDA9PT1vKWJyZWFrIGU7by0tLHUrPW5bcysrXTw8bCxsKz04fXIub2Zmc2V0Kz11JigxPDxyLmV4dHJhKS0xLHU+Pj49ci5leHRyYSxsLT1yLmV4dHJhLHIuYmFjays9ci5leHRyYX1pZihyLm9mZnNldD5yLmRtYXgpe2UubXNnPVwiaW52YWxpZCBkaXN0YW5jZSB0b28gZmFyIGJhY2tcIixyLm1vZGU9MzA7YnJlYWt9ci5tb2RlPTI1O2Nhc2UgMjU6aWYoMD09PWgpYnJlYWsgZTtpZihkPWMtaCxyLm9mZnNldD5kKXtpZigoZD1yLm9mZnNldC1kKT5yLndoYXZlJiZyLnNhbmUpe2UubXNnPVwiaW52YWxpZCBkaXN0YW5jZSB0b28gZmFyIGJhY2tcIixyLm1vZGU9MzA7YnJlYWt9cD1kPnIud25leHQ/KGQtPXIud25leHQsci53c2l6ZS1kKTpyLnduZXh0LWQsZD5yLmxlbmd0aCYmKGQ9ci5sZW5ndGgpLG09ci53aW5kb3d9ZWxzZSBtPWkscD1hLXIub2Zmc2V0LGQ9ci5sZW5ndGg7Zm9yKGg8ZCYmKGQ9aCksaC09ZCxyLmxlbmd0aC09ZDtpW2ErK109bVtwKytdLC0tZDspOzA9PT1yLmxlbmd0aCYmKHIubW9kZT0yMSk7YnJlYWs7Y2FzZSAyNjppZigwPT09aClicmVhayBlO2lbYSsrXT1yLmxlbmd0aCxoLS0sci5tb2RlPTIxO2JyZWFrO2Nhc2UgMjc6aWYoci53cmFwKXtmb3IoO2w8MzI7KXtpZigwPT09bylicmVhayBlO28tLSx1fD1uW3MrK108PGwsbCs9OH1pZihjLT1oLGUudG90YWxfb3V0Kz1jLHIudG90YWwrPWMsYyYmKGUuYWRsZXI9ci5jaGVjaz1yLmZsYWdzP0Ioci5jaGVjayxpLGMsYS1jKTpPKHIuY2hlY2ssaSxjLGEtYykpLGM9aCwoci5mbGFncz91OkwodSkpIT09ci5jaGVjayl7ZS5tc2c9XCJpbmNvcnJlY3QgZGF0YSBjaGVja1wiLHIubW9kZT0zMDticmVha31sPXU9MH1yLm1vZGU9Mjg7Y2FzZSAyODppZihyLndyYXAmJnIuZmxhZ3Mpe2Zvcig7bDwzMjspe2lmKDA9PT1vKWJyZWFrIGU7by0tLHUrPW5bcysrXTw8bCxsKz04fWlmKHUhPT0oNDI5NDk2NzI5NSZyLnRvdGFsKSl7ZS5tc2c9XCJpbmNvcnJlY3QgbGVuZ3RoIGNoZWNrXCIsci5tb2RlPTMwO2JyZWFrfWw9dT0wfXIubW9kZT0yOTtjYXNlIDI5Ong9MTticmVhayBlO2Nhc2UgMzA6eD0tMzticmVhayBlO2Nhc2UgMzE6cmV0dXJuLTQ7Y2FzZSAzMjpkZWZhdWx0OnJldHVybiBVfXJldHVybiBlLm5leHRfb3V0PWEsZS5hdmFpbF9vdXQ9aCxlLm5leHRfaW49cyxlLmF2YWlsX2luPW8sci5ob2xkPXUsci5iaXRzPWwsKHIud3NpemV8fGMhPT1lLmF2YWlsX291dCYmci5tb2RlPDMwJiYoci5tb2RlPDI3fHw0IT09dCkpJiZaKGUsZS5vdXRwdXQsZS5uZXh0X291dCxjLWUuYXZhaWxfb3V0KT8oci5tb2RlPTMxLC00KTooZi09ZS5hdmFpbF9pbixjLT1lLmF2YWlsX291dCxlLnRvdGFsX2luKz1mLGUudG90YWxfb3V0Kz1jLHIudG90YWwrPWMsci53cmFwJiZjJiYoZS5hZGxlcj1yLmNoZWNrPXIuZmxhZ3M/QihyLmNoZWNrLGksYyxlLm5leHRfb3V0LWMpOk8oci5jaGVjayxpLGMsZS5uZXh0X291dC1jKSksZS5kYXRhX3R5cGU9ci5iaXRzKyhyLmxhc3Q/NjQ6MCkrKDEyPT09ci5tb2RlPzEyODowKSsoMjA9PT1yLm1vZGV8fDE1PT09ci5tb2RlPzI1NjowKSwoMD09ZiYmMD09PWN8fDQ9PT10KSYmeD09PU4mJih4PS01KSx4KX0sci5pbmZsYXRlRW5kPWZ1bmN0aW9uKGUpe2lmKCFlfHwhZS5zdGF0ZSlyZXR1cm4gVTt2YXIgdD1lLnN0YXRlO3JldHVybiB0LndpbmRvdyYmKHQud2luZG93PW51bGwpLGUuc3RhdGU9bnVsbCxOfSxyLmluZmxhdGVHZXRIZWFkZXI9ZnVuY3Rpb24oZSx0KXt2YXIgcjtyZXR1cm4gZSYmZS5zdGF0ZT8wPT0oMiYocj1lLnN0YXRlKS53cmFwKT9VOigoci5oZWFkPXQpLmRvbmU9ITEsTik6VX0sci5pbmZsYXRlU2V0RGljdGlvbmFyeT1mdW5jdGlvbihlLHQpe3ZhciByLG49dC5sZW5ndGg7cmV0dXJuIGUmJmUuc3RhdGU/MCE9PShyPWUuc3RhdGUpLndyYXAmJjExIT09ci5tb2RlP1U6MTE9PT1yLm1vZGUmJk8oMSx0LG4sMCkhPT1yLmNoZWNrPy0zOlooZSx0LG4sbik/KHIubW9kZT0zMSwtNCk6KHIuaGF2ZWRpY3Q9MSxOKTpVfSxyLmluZmxhdGVJbmZvPVwicGFrbyBpbmZsYXRlIChmcm9tIE5vZGVjYSBwcm9qZWN0KVwifSx7XCIuLi91dGlscy9jb21tb25cIjo0MSxcIi4vYWRsZXIzMlwiOjQzLFwiLi9jcmMzMlwiOjQ1LFwiLi9pbmZmYXN0XCI6NDgsXCIuL2luZnRyZWVzXCI6NTB9XSw1MDpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3ZhciBEPWUoXCIuLi91dGlscy9jb21tb25cIiksRj1bMyw0LDUsNiw3LDgsOSwxMCwxMSwxMywxNSwxNywxOSwyMywyNywzMSwzNSw0Myw1MSw1OSw2Nyw4Myw5OSwxMTUsMTMxLDE2MywxOTUsMjI3LDI1OCwwLDBdLE49WzE2LDE2LDE2LDE2LDE2LDE2LDE2LDE2LDE3LDE3LDE3LDE3LDE4LDE4LDE4LDE4LDE5LDE5LDE5LDE5LDIwLDIwLDIwLDIwLDIxLDIxLDIxLDIxLDE2LDcyLDc4XSxVPVsxLDIsMyw0LDUsNyw5LDEzLDE3LDI1LDMzLDQ5LDY1LDk3LDEyOSwxOTMsMjU3LDM4NSw1MTMsNzY5LDEwMjUsMTUzNywyMDQ5LDMwNzMsNDA5Nyw2MTQ1LDgxOTMsMTIyODksMTYzODUsMjQ1NzcsMCwwXSxQPVsxNiwxNiwxNiwxNiwxNywxNywxOCwxOCwxOSwxOSwyMCwyMCwyMSwyMSwyMiwyMiwyMywyMywyNCwyNCwyNSwyNSwyNiwyNiwyNywyNywyOCwyOCwyOSwyOSw2NCw2NF07dC5leHBvcnRzPWZ1bmN0aW9uKGUsdCxyLG4saSxzLGEsbyl7dmFyIGgsdSxsLGYsYyxkLHAsbSxfLGc9by5iaXRzLGI9MCx2PTAseT0wLHc9MCxrPTAseD0wLFM9MCx6PTAsQz0wLEU9MCxBPW51bGwsST0wLE89bmV3IEQuQnVmMTYoMTYpLEI9bmV3IEQuQnVmMTYoMTYpLFI9bnVsbCxUPTA7Zm9yKGI9MDtiPD0xNTtiKyspT1tiXT0wO2Zvcih2PTA7djxuO3YrKylPW3Rbcit2XV0rKztmb3Ioaz1nLHc9MTU7MTw9dyYmMD09PU9bd107dy0tKTtpZih3PGsmJihrPXcpLDA9PT13KXJldHVybiBpW3MrK109MjA5NzE1MjAsaVtzKytdPTIwOTcxNTIwLG8uYml0cz0xLDA7Zm9yKHk9MTt5PHcmJjA9PT1PW3ldO3krKyk7Zm9yKGs8eSYmKGs9eSksYj16PTE7Yjw9MTU7YisrKWlmKHo8PD0xLCh6LT1PW2JdKTwwKXJldHVybi0xO2lmKDA8eiYmKDA9PT1lfHwxIT09dykpcmV0dXJuLTE7Zm9yKEJbMV09MCxiPTE7YjwxNTtiKyspQltiKzFdPUJbYl0rT1tiXTtmb3Iodj0wO3Y8bjt2KyspMCE9PXRbcit2XSYmKGFbQlt0W3Irdl1dKytdPXYpO2lmKGQ9MD09PWU/KEE9Uj1hLDE5KToxPT09ZT8oQT1GLEktPTI1NyxSPU4sVC09MjU3LDI1Nik6KEE9VSxSPVAsLTEpLGI9eSxjPXMsUz12PUU9MCxsPS0xLGY9KEM9MTw8KHg9aykpLTEsMT09PWUmJjg1MjxDfHwyPT09ZSYmNTkyPEMpcmV0dXJuIDE7Zm9yKDs7KXtmb3IocD1iLVMsXz1hW3ZdPGQ/KG09MCxhW3ZdKTphW3ZdPmQ/KG09UltUK2Fbdl1dLEFbSSthW3ZdXSk6KG09OTYsMCksaD0xPDxiLVMseT11PTE8PHg7aVtjKyhFPj5TKSsodS09aCldPXA8PDI0fG08PDE2fF98MCwwIT09dTspO2ZvcihoPTE8PGItMTtFJmg7KWg+Pj0xO2lmKDAhPT1oPyhFJj1oLTEsRSs9aCk6RT0wLHYrKywwPT0tLU9bYl0pe2lmKGI9PT13KWJyZWFrO2I9dFtyK2Fbdl1dfWlmKGs8YiYmKEUmZikhPT1sKXtmb3IoMD09PVMmJihTPWspLGMrPXksej0xPDwoeD1iLVMpO3grUzx3JiYhKCh6LT1PW3grU10pPD0wKTspeCsrLHo8PD0xO2lmKEMrPTE8PHgsMT09PWUmJjg1MjxDfHwyPT09ZSYmNTkyPEMpcmV0dXJuIDE7aVtsPUUmZl09azw8MjR8eDw8MTZ8Yy1zfDB9fXJldHVybiAwIT09RSYmKGlbYytFXT1iLVM8PDI0fDY0PDwxNnwwKSxvLmJpdHM9aywwfX0se1wiLi4vdXRpbHMvY29tbW9uXCI6NDF9XSw1MTpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3QuZXhwb3J0cz17MjpcIm5lZWQgZGljdGlvbmFyeVwiLDE6XCJzdHJlYW0gZW5kXCIsMDpcIlwiLFwiLTFcIjpcImZpbGUgZXJyb3JcIixcIi0yXCI6XCJzdHJlYW0gZXJyb3JcIixcIi0zXCI6XCJkYXRhIGVycm9yXCIsXCItNFwiOlwiaW5zdWZmaWNpZW50IG1lbW9yeVwiLFwiLTVcIjpcImJ1ZmZlciBlcnJvclwiLFwiLTZcIjpcImluY29tcGF0aWJsZSB2ZXJzaW9uXCJ9fSx7fV0sNTI6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt2YXIgaT1lKFwiLi4vdXRpbHMvY29tbW9uXCIpLG89MCxoPTE7ZnVuY3Rpb24gbihlKXtmb3IodmFyIHQ9ZS5sZW5ndGg7MDw9LS10OyllW3RdPTB9dmFyIHM9MCxhPTI5LHU9MjU2LGw9dSsxK2EsZj0zMCxjPTE5LF89MipsKzEsZz0xNSxkPTE2LHA9NyxtPTI1NixiPTE2LHY9MTcseT0xOCx3PVswLDAsMCwwLDAsMCwwLDAsMSwxLDEsMSwyLDIsMiwyLDMsMywzLDMsNCw0LDQsNCw1LDUsNSw1LDBdLGs9WzAsMCwwLDAsMSwxLDIsMiwzLDMsNCw0LDUsNSw2LDYsNyw3LDgsOCw5LDksMTAsMTAsMTEsMTEsMTIsMTIsMTMsMTNdLHg9WzAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMiwzLDddLFM9WzE2LDE3LDE4LDAsOCw3LDksNiwxMCw1LDExLDQsMTIsMywxMywyLDE0LDEsMTVdLHo9bmV3IEFycmF5KDIqKGwrMikpO24oeik7dmFyIEM9bmV3IEFycmF5KDIqZik7bihDKTt2YXIgRT1uZXcgQXJyYXkoNTEyKTtuKEUpO3ZhciBBPW5ldyBBcnJheSgyNTYpO24oQSk7dmFyIEk9bmV3IEFycmF5KGEpO24oSSk7dmFyIE8sQixSLFQ9bmV3IEFycmF5KGYpO2Z1bmN0aW9uIEQoZSx0LHIsbixpKXt0aGlzLnN0YXRpY190cmVlPWUsdGhpcy5leHRyYV9iaXRzPXQsdGhpcy5leHRyYV9iYXNlPXIsdGhpcy5lbGVtcz1uLHRoaXMubWF4X2xlbmd0aD1pLHRoaXMuaGFzX3N0cmVlPWUmJmUubGVuZ3RofWZ1bmN0aW9uIEYoZSx0KXt0aGlzLmR5bl90cmVlPWUsdGhpcy5tYXhfY29kZT0wLHRoaXMuc3RhdF9kZXNjPXR9ZnVuY3Rpb24gTihlKXtyZXR1cm4gZTwyNTY/RVtlXTpFWzI1NisoZT4+PjcpXX1mdW5jdGlvbiBVKGUsdCl7ZS5wZW5kaW5nX2J1ZltlLnBlbmRpbmcrK109MjU1JnQsZS5wZW5kaW5nX2J1ZltlLnBlbmRpbmcrK109dD4+PjgmMjU1fWZ1bmN0aW9uIFAoZSx0LHIpe2UuYmlfdmFsaWQ+ZC1yPyhlLmJpX2J1Znw9dDw8ZS5iaV92YWxpZCY2NTUzNSxVKGUsZS5iaV9idWYpLGUuYmlfYnVmPXQ+PmQtZS5iaV92YWxpZCxlLmJpX3ZhbGlkKz1yLWQpOihlLmJpX2J1Znw9dDw8ZS5iaV92YWxpZCY2NTUzNSxlLmJpX3ZhbGlkKz1yKX1mdW5jdGlvbiBMKGUsdCxyKXtQKGUsclsyKnRdLHJbMip0KzFdKX1mdW5jdGlvbiBqKGUsdCl7Zm9yKHZhciByPTA7cnw9MSZlLGU+Pj49MSxyPDw9MSwwPC0tdDspO3JldHVybiByPj4+MX1mdW5jdGlvbiBaKGUsdCxyKXt2YXIgbixpLHM9bmV3IEFycmF5KGcrMSksYT0wO2ZvcihuPTE7bjw9ZztuKyspc1tuXT1hPWErcltuLTFdPDwxO2ZvcihpPTA7aTw9dDtpKyspe3ZhciBvPWVbMippKzFdOzAhPT1vJiYoZVsyKmldPWooc1tvXSsrLG8pKX19ZnVuY3Rpb24gVyhlKXt2YXIgdDtmb3IodD0wO3Q8bDt0KyspZS5keW5fbHRyZWVbMip0XT0wO2Zvcih0PTA7dDxmO3QrKyllLmR5bl9kdHJlZVsyKnRdPTA7Zm9yKHQ9MDt0PGM7dCsrKWUuYmxfdHJlZVsyKnRdPTA7ZS5keW5fbHRyZWVbMiptXT0xLGUub3B0X2xlbj1lLnN0YXRpY19sZW49MCxlLmxhc3RfbGl0PWUubWF0Y2hlcz0wfWZ1bmN0aW9uIE0oZSl7ODxlLmJpX3ZhbGlkP1UoZSxlLmJpX2J1Zik6MDxlLmJpX3ZhbGlkJiYoZS5wZW5kaW5nX2J1ZltlLnBlbmRpbmcrK109ZS5iaV9idWYpLGUuYmlfYnVmPTAsZS5iaV92YWxpZD0wfWZ1bmN0aW9uIEgoZSx0LHIsbil7dmFyIGk9Mip0LHM9MipyO3JldHVybiBlW2ldPGVbc118fGVbaV09PT1lW3NdJiZuW3RdPD1uW3JdfWZ1bmN0aW9uIEcoZSx0LHIpe2Zvcih2YXIgbj1lLmhlYXBbcl0saT1yPDwxO2k8PWUuaGVhcF9sZW4mJihpPGUuaGVhcF9sZW4mJkgodCxlLmhlYXBbaSsxXSxlLmhlYXBbaV0sZS5kZXB0aCkmJmkrKywhSCh0LG4sZS5oZWFwW2ldLGUuZGVwdGgpKTspZS5oZWFwW3JdPWUuaGVhcFtpXSxyPWksaTw8PTE7ZS5oZWFwW3JdPW59ZnVuY3Rpb24gSyhlLHQscil7dmFyIG4saSxzLGEsbz0wO2lmKDAhPT1lLmxhc3RfbGl0KWZvcig7bj1lLnBlbmRpbmdfYnVmW2UuZF9idWYrMipvXTw8OHxlLnBlbmRpbmdfYnVmW2UuZF9idWYrMipvKzFdLGk9ZS5wZW5kaW5nX2J1ZltlLmxfYnVmK29dLG8rKywwPT09bj9MKGUsaSx0KTooTChlLChzPUFbaV0pK3UrMSx0KSwwIT09KGE9d1tzXSkmJlAoZSxpLT1JW3NdLGEpLEwoZSxzPU4oLS1uKSxyKSwwIT09KGE9a1tzXSkmJlAoZSxuLT1UW3NdLGEpKSxvPGUubGFzdF9saXQ7KTtMKGUsbSx0KX1mdW5jdGlvbiBZKGUsdCl7dmFyIHIsbixpLHM9dC5keW5fdHJlZSxhPXQuc3RhdF9kZXNjLnN0YXRpY190cmVlLG89dC5zdGF0X2Rlc2MuaGFzX3N0cmVlLGg9dC5zdGF0X2Rlc2MuZWxlbXMsdT0tMTtmb3IoZS5oZWFwX2xlbj0wLGUuaGVhcF9tYXg9XyxyPTA7cjxoO3IrKykwIT09c1syKnJdPyhlLmhlYXBbKytlLmhlYXBfbGVuXT11PXIsZS5kZXB0aFtyXT0wKTpzWzIqcisxXT0wO2Zvcig7ZS5oZWFwX2xlbjwyOylzWzIqKGk9ZS5oZWFwWysrZS5oZWFwX2xlbl09dTwyPysrdTowKV09MSxlLmRlcHRoW2ldPTAsZS5vcHRfbGVuLS0sbyYmKGUuc3RhdGljX2xlbi09YVsyKmkrMV0pO2Zvcih0Lm1heF9jb2RlPXUscj1lLmhlYXBfbGVuPj4xOzE8PXI7ci0tKUcoZSxzLHIpO2ZvcihpPWg7cj1lLmhlYXBbMV0sZS5oZWFwWzFdPWUuaGVhcFtlLmhlYXBfbGVuLS1dLEcoZSxzLDEpLG49ZS5oZWFwWzFdLGUuaGVhcFstLWUuaGVhcF9tYXhdPXIsZS5oZWFwWy0tZS5oZWFwX21heF09bixzWzIqaV09c1syKnJdK3NbMipuXSxlLmRlcHRoW2ldPShlLmRlcHRoW3JdPj1lLmRlcHRoW25dP2UuZGVwdGhbcl06ZS5kZXB0aFtuXSkrMSxzWzIqcisxXT1zWzIqbisxXT1pLGUuaGVhcFsxXT1pKyssRyhlLHMsMSksMjw9ZS5oZWFwX2xlbjspO2UuaGVhcFstLWUuaGVhcF9tYXhdPWUuaGVhcFsxXSxmdW5jdGlvbihlLHQpe3ZhciByLG4saSxzLGEsbyxoPXQuZHluX3RyZWUsdT10Lm1heF9jb2RlLGw9dC5zdGF0X2Rlc2Muc3RhdGljX3RyZWUsZj10LnN0YXRfZGVzYy5oYXNfc3RyZWUsYz10LnN0YXRfZGVzYy5leHRyYV9iaXRzLGQ9dC5zdGF0X2Rlc2MuZXh0cmFfYmFzZSxwPXQuc3RhdF9kZXNjLm1heF9sZW5ndGgsbT0wO2ZvcihzPTA7czw9ZztzKyspZS5ibF9jb3VudFtzXT0wO2ZvcihoWzIqZS5oZWFwW2UuaGVhcF9tYXhdKzFdPTAscj1lLmhlYXBfbWF4KzE7cjxfO3IrKylwPChzPWhbMipoWzIqKG49ZS5oZWFwW3JdKSsxXSsxXSsxKSYmKHM9cCxtKyspLGhbMipuKzFdPXMsdTxufHwoZS5ibF9jb3VudFtzXSsrLGE9MCxkPD1uJiYoYT1jW24tZF0pLG89aFsyKm5dLGUub3B0X2xlbis9byoocythKSxmJiYoZS5zdGF0aWNfbGVuKz1vKihsWzIqbisxXSthKSkpO2lmKDAhPT1tKXtkb3tmb3Iocz1wLTE7MD09PWUuYmxfY291bnRbc107KXMtLTtlLmJsX2NvdW50W3NdLS0sZS5ibF9jb3VudFtzKzFdKz0yLGUuYmxfY291bnRbcF0tLSxtLT0yfXdoaWxlKDA8bSk7Zm9yKHM9cDswIT09cztzLS0pZm9yKG49ZS5ibF9jb3VudFtzXTswIT09bjspdTwoaT1lLmhlYXBbLS1yXSl8fChoWzIqaSsxXSE9PXMmJihlLm9wdF9sZW4rPShzLWhbMippKzFdKSpoWzIqaV0saFsyKmkrMV09cyksbi0tKX19KGUsdCksWihzLHUsZS5ibF9jb3VudCl9ZnVuY3Rpb24gWChlLHQscil7dmFyIG4saSxzPS0xLGE9dFsxXSxvPTAsaD03LHU9NDtmb3IoMD09PWEmJihoPTEzOCx1PTMpLHRbMioocisxKSsxXT02NTUzNSxuPTA7bjw9cjtuKyspaT1hLGE9dFsyKihuKzEpKzFdLCsrbzxoJiZpPT09YXx8KG88dT9lLmJsX3RyZWVbMippXSs9bzowIT09aT8oaSE9PXMmJmUuYmxfdHJlZVsyKmldKyssZS5ibF90cmVlWzIqYl0rKyk6bzw9MTA/ZS5ibF90cmVlWzIqdl0rKzplLmJsX3RyZWVbMip5XSsrLHM9aSx1PShvPTApPT09YT8oaD0xMzgsMyk6aT09PWE/KGg9NiwzKTooaD03LDQpKX1mdW5jdGlvbiBWKGUsdCxyKXt2YXIgbixpLHM9LTEsYT10WzFdLG89MCxoPTcsdT00O2ZvcigwPT09YSYmKGg9MTM4LHU9Myksbj0wO248PXI7bisrKWlmKGk9YSxhPXRbMioobisxKSsxXSwhKCsrbzxoJiZpPT09YSkpe2lmKG88dSlmb3IoO0woZSxpLGUuYmxfdHJlZSksMCE9LS1vOyk7ZWxzZSAwIT09aT8oaSE9PXMmJihMKGUsaSxlLmJsX3RyZWUpLG8tLSksTChlLGIsZS5ibF90cmVlKSxQKGUsby0zLDIpKTpvPD0xMD8oTChlLHYsZS5ibF90cmVlKSxQKGUsby0zLDMpKTooTChlLHksZS5ibF90cmVlKSxQKGUsby0xMSw3KSk7cz1pLHU9KG89MCk9PT1hPyhoPTEzOCwzKTppPT09YT8oaD02LDMpOihoPTcsNCl9fW4oVCk7dmFyIHE9ITE7ZnVuY3Rpb24gSihlLHQscixuKXtQKGUsKHM8PDEpKyhuPzE6MCksMyksZnVuY3Rpb24oZSx0LHIsbil7TShlKSxuJiYoVShlLHIpLFUoZSx+cikpLGkuYXJyYXlTZXQoZS5wZW5kaW5nX2J1ZixlLndpbmRvdyx0LHIsZS5wZW5kaW5nKSxlLnBlbmRpbmcrPXJ9KGUsdCxyLCEwKX1yLl90cl9pbml0PWZ1bmN0aW9uKGUpe3F8fChmdW5jdGlvbigpe3ZhciBlLHQscixuLGkscz1uZXcgQXJyYXkoZysxKTtmb3Iobj1yPTA7bjxhLTE7bisrKWZvcihJW25dPXIsZT0wO2U8MTw8d1tuXTtlKyspQVtyKytdPW47Zm9yKEFbci0xXT1uLG49aT0wO248MTY7bisrKWZvcihUW25dPWksZT0wO2U8MTw8a1tuXTtlKyspRVtpKytdPW47Zm9yKGk+Pj03O248ZjtuKyspZm9yKFRbbl09aTw8NyxlPTA7ZTwxPDxrW25dLTc7ZSsrKUVbMjU2K2krK109bjtmb3IodD0wO3Q8PWc7dCsrKXNbdF09MDtmb3IoZT0wO2U8PTE0MzspelsyKmUrMV09OCxlKyssc1s4XSsrO2Zvcig7ZTw9MjU1Oyl6WzIqZSsxXT05LGUrKyxzWzldKys7Zm9yKDtlPD0yNzk7KXpbMiplKzFdPTcsZSsrLHNbN10rKztmb3IoO2U8PTI4NzspelsyKmUrMV09OCxlKyssc1s4XSsrO2ZvcihaKHosbCsxLHMpLGU9MDtlPGY7ZSsrKUNbMiplKzFdPTUsQ1syKmVdPWooZSw1KTtPPW5ldyBEKHosdyx1KzEsbCxnKSxCPW5ldyBEKEMsaywwLGYsZyksUj1uZXcgRChuZXcgQXJyYXkoMCkseCwwLGMscCl9KCkscT0hMCksZS5sX2Rlc2M9bmV3IEYoZS5keW5fbHRyZWUsTyksZS5kX2Rlc2M9bmV3IEYoZS5keW5fZHRyZWUsQiksZS5ibF9kZXNjPW5ldyBGKGUuYmxfdHJlZSxSKSxlLmJpX2J1Zj0wLGUuYmlfdmFsaWQ9MCxXKGUpfSxyLl90cl9zdG9yZWRfYmxvY2s9SixyLl90cl9mbHVzaF9ibG9jaz1mdW5jdGlvbihlLHQscixuKXt2YXIgaSxzLGE9MDswPGUubGV2ZWw/KDI9PT1lLnN0cm0uZGF0YV90eXBlJiYoZS5zdHJtLmRhdGFfdHlwZT1mdW5jdGlvbihlKXt2YXIgdCxyPTQwOTM2MjQ0NDc7Zm9yKHQ9MDt0PD0zMTt0Kysscj4+Pj0xKWlmKDEmciYmMCE9PWUuZHluX2x0cmVlWzIqdF0pcmV0dXJuIG87aWYoMCE9PWUuZHluX2x0cmVlWzE4XXx8MCE9PWUuZHluX2x0cmVlWzIwXXx8MCE9PWUuZHluX2x0cmVlWzI2XSlyZXR1cm4gaDtmb3IodD0zMjt0PHU7dCsrKWlmKDAhPT1lLmR5bl9sdHJlZVsyKnRdKXJldHVybiBoO3JldHVybiBvfShlKSksWShlLGUubF9kZXNjKSxZKGUsZS5kX2Rlc2MpLGE9ZnVuY3Rpb24oZSl7dmFyIHQ7Zm9yKFgoZSxlLmR5bl9sdHJlZSxlLmxfZGVzYy5tYXhfY29kZSksWChlLGUuZHluX2R0cmVlLGUuZF9kZXNjLm1heF9jb2RlKSxZKGUsZS5ibF9kZXNjKSx0PWMtMTszPD10JiYwPT09ZS5ibF90cmVlWzIqU1t0XSsxXTt0LS0pO3JldHVybiBlLm9wdF9sZW4rPTMqKHQrMSkrNSs1KzQsdH0oZSksaT1lLm9wdF9sZW4rMys3Pj4+Mywocz1lLnN0YXRpY19sZW4rMys3Pj4+Myk8PWkmJihpPXMpKTppPXM9cis1LHIrNDw9aSYmLTEhPT10P0ooZSx0LHIsbik6ND09PWUuc3RyYXRlZ3l8fHM9PT1pPyhQKGUsMisobj8xOjApLDMpLEsoZSx6LEMpKTooUChlLDQrKG4/MTowKSwzKSxmdW5jdGlvbihlLHQscixuKXt2YXIgaTtmb3IoUChlLHQtMjU3LDUpLFAoZSxyLTEsNSksUChlLG4tNCw0KSxpPTA7aTxuO2krKylQKGUsZS5ibF90cmVlWzIqU1tpXSsxXSwzKTtWKGUsZS5keW5fbHRyZWUsdC0xKSxWKGUsZS5keW5fZHRyZWUsci0xKX0oZSxlLmxfZGVzYy5tYXhfY29kZSsxLGUuZF9kZXNjLm1heF9jb2RlKzEsYSsxKSxLKGUsZS5keW5fbHRyZWUsZS5keW5fZHRyZWUpKSxXKGUpLG4mJk0oZSl9LHIuX3RyX3RhbGx5PWZ1bmN0aW9uKGUsdCxyKXtyZXR1cm4gZS5wZW5kaW5nX2J1ZltlLmRfYnVmKzIqZS5sYXN0X2xpdF09dD4+PjgmMjU1LGUucGVuZGluZ19idWZbZS5kX2J1ZisyKmUubGFzdF9saXQrMV09MjU1JnQsZS5wZW5kaW5nX2J1ZltlLmxfYnVmK2UubGFzdF9saXRdPTI1NSZyLGUubGFzdF9saXQrKywwPT09dD9lLmR5bl9sdHJlZVsyKnJdKys6KGUubWF0Y2hlcysrLHQtLSxlLmR5bl9sdHJlZVsyKihBW3JdK3UrMSldKyssZS5keW5fZHRyZWVbMipOKHQpXSsrKSxlLmxhc3RfbGl0PT09ZS5saXRfYnVmc2l6ZS0xfSxyLl90cl9hbGlnbj1mdW5jdGlvbihlKXtQKGUsMiwzKSxMKGUsbSx6KSxmdW5jdGlvbihlKXsxNj09PWUuYmlfdmFsaWQ/KFUoZSxlLmJpX2J1ZiksZS5iaV9idWY9MCxlLmJpX3ZhbGlkPTApOjg8PWUuYmlfdmFsaWQmJihlLnBlbmRpbmdfYnVmW2UucGVuZGluZysrXT0yNTUmZS5iaV9idWYsZS5iaV9idWY+Pj04LGUuYmlfdmFsaWQtPTgpfShlKX19LHtcIi4uL3V0aWxzL2NvbW1vblwiOjQxfV0sNTM6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt0LmV4cG9ydHM9ZnVuY3Rpb24oKXt0aGlzLmlucHV0PW51bGwsdGhpcy5uZXh0X2luPTAsdGhpcy5hdmFpbF9pbj0wLHRoaXMudG90YWxfaW49MCx0aGlzLm91dHB1dD1udWxsLHRoaXMubmV4dF9vdXQ9MCx0aGlzLmF2YWlsX291dD0wLHRoaXMudG90YWxfb3V0PTAsdGhpcy5tc2c9XCJcIix0aGlzLnN0YXRlPW51bGwsdGhpcy5kYXRhX3R5cGU9Mix0aGlzLmFkbGVyPTB9fSx7fV0sNTQ6W2Z1bmN0aW9uKGUsdCxyKXsoZnVuY3Rpb24oZSl7IWZ1bmN0aW9uKHIsbil7XCJ1c2Ugc3RyaWN0XCI7aWYoIXIuc2V0SW1tZWRpYXRlKXt2YXIgaSxzLHQsYSxvPTEsaD17fSx1PSExLGw9ci5kb2N1bWVudCxlPU9iamVjdC5nZXRQcm90b3R5cGVPZiYmT2JqZWN0LmdldFByb3RvdHlwZU9mKHIpO2U9ZSYmZS5zZXRUaW1lb3V0P2U6cixpPVwiW29iamVjdCBwcm9jZXNzXVwiPT09e30udG9TdHJpbmcuY2FsbChyLnByb2Nlc3MpP2Z1bmN0aW9uKGUpe3Byb2Nlc3MubmV4dFRpY2soZnVuY3Rpb24oKXtjKGUpfSl9OmZ1bmN0aW9uKCl7aWYoci5wb3N0TWVzc2FnZSYmIXIuaW1wb3J0U2NyaXB0cyl7dmFyIGU9ITAsdD1yLm9ubWVzc2FnZTtyZXR1cm4gci5vbm1lc3NhZ2U9ZnVuY3Rpb24oKXtlPSExfSxyLnBvc3RNZXNzYWdlKFwiXCIsXCIqXCIpLHIub25tZXNzYWdlPXQsZX19KCk/KGE9XCJzZXRJbW1lZGlhdGUkXCIrTWF0aC5yYW5kb20oKStcIiRcIixyLmFkZEV2ZW50TGlzdGVuZXI/ci5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLGQsITEpOnIuYXR0YWNoRXZlbnQoXCJvbm1lc3NhZ2VcIixkKSxmdW5jdGlvbihlKXtyLnBvc3RNZXNzYWdlKGErZSxcIipcIil9KTpyLk1lc3NhZ2VDaGFubmVsPygodD1uZXcgTWVzc2FnZUNoYW5uZWwpLnBvcnQxLm9ubWVzc2FnZT1mdW5jdGlvbihlKXtjKGUuZGF0YSl9LGZ1bmN0aW9uKGUpe3QucG9ydDIucG9zdE1lc3NhZ2UoZSl9KTpsJiZcIm9ucmVhZHlzdGF0ZWNoYW5nZVwiaW4gbC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpPyhzPWwuZG9jdW1lbnRFbGVtZW50LGZ1bmN0aW9uKGUpe3ZhciB0PWwuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTt0Lm9ucmVhZHlzdGF0ZWNoYW5nZT1mdW5jdGlvbigpe2MoZSksdC5vbnJlYWR5c3RhdGVjaGFuZ2U9bnVsbCxzLnJlbW92ZUNoaWxkKHQpLHQ9bnVsbH0scy5hcHBlbmRDaGlsZCh0KX0pOmZ1bmN0aW9uKGUpe3NldFRpbWVvdXQoYywwLGUpfSxlLnNldEltbWVkaWF0ZT1mdW5jdGlvbihlKXtcImZ1bmN0aW9uXCIhPXR5cGVvZiBlJiYoZT1uZXcgRnVuY3Rpb24oXCJcIitlKSk7Zm9yKHZhciB0PW5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoLTEpLHI9MDtyPHQubGVuZ3RoO3IrKyl0W3JdPWFyZ3VtZW50c1tyKzFdO3ZhciBuPXtjYWxsYmFjazplLGFyZ3M6dH07cmV0dXJuIGhbb109bixpKG8pLG8rK30sZS5jbGVhckltbWVkaWF0ZT1mfWZ1bmN0aW9uIGYoZSl7ZGVsZXRlIGhbZV19ZnVuY3Rpb24gYyhlKXtpZih1KXNldFRpbWVvdXQoYywwLGUpO2Vsc2V7dmFyIHQ9aFtlXTtpZih0KXt1PSEwO3RyeXshZnVuY3Rpb24oZSl7dmFyIHQ9ZS5jYWxsYmFjayxyPWUuYXJncztzd2l0Y2goci5sZW5ndGgpe2Nhc2UgMDp0KCk7YnJlYWs7Y2FzZSAxOnQoclswXSk7YnJlYWs7Y2FzZSAyOnQoclswXSxyWzFdKTticmVhaztjYXNlIDM6dChyWzBdLHJbMV0sclsyXSk7YnJlYWs7ZGVmYXVsdDp0LmFwcGx5KG4scil9fSh0KX1maW5hbGx5e2YoZSksdT0hMX19fX1mdW5jdGlvbiBkKGUpe2Uuc291cmNlPT09ciYmXCJzdHJpbmdcIj09dHlwZW9mIGUuZGF0YSYmMD09PWUuZGF0YS5pbmRleE9mKGEpJiZjKCtlLmRhdGEuc2xpY2UoYS5sZW5ndGgpKX19KFwidW5kZWZpbmVkXCI9PXR5cGVvZiBzZWxmP3ZvaWQgMD09PWU/dGhpczplOnNlbGYpfSkuY2FsbCh0aGlzLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBnbG9iYWw/Z2xvYmFsOlwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmP3NlbGY6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdz93aW5kb3c6e30pfSx7fV19LHt9LFsxMF0pKDEwKX0pOyIsICJpbXBvcnQgeyBBcHAsIE1vZGFsLCBOb3RpY2UsIFBsdWdpbiwgUGx1Z2luU2V0dGluZ1RhYiwgU2V0dGluZyB9IGZyb20gXCJvYnNpZGlhblwiO1xuaW1wb3J0IHsgVXBkYXRlU2VydmljZSB9IGZyb20gXCIuL3VwZGF0ZS1zZXJ2aWNlXCI7XG5pbXBvcnQgeyBQbHVnaW5EYXRhLCBTVVBQT1JURURfTEFOR1VBR0VTLCBVcGRhdGVCYXRjaCB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbmNvbnN0IERFRkFVTFRfREFUQTogUGx1Z2luRGF0YSA9IHsgaW5zdGFsbGVkOiB7IG93bmVkRmlsZXM6IFtdLCBhcHBsaWVkUmVsZWFzZUlkczogW10gfSB9O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUYnBlZGlhVXBkYXRlUGx1Z2luIGV4dGVuZHMgUGx1Z2luIHtcbiAgcHJpdmF0ZSBkYXRhOiBQbHVnaW5EYXRhID0gREVGQVVMVF9EQVRBO1xuICBwcml2YXRlIHVwZGF0ZXIhOiBVcGRhdGVTZXJ2aWNlO1xuXG4gIGFzeW5jIG9ubG9hZCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBzYXZlZCA9IGF3YWl0IHRoaXMubG9hZERhdGEoKSA/PyB7fTtcbiAgICB0aGlzLmRhdGEgPSB7IC4uLkRFRkFVTFRfREFUQSwgLi4uc2F2ZWQsIGluc3RhbGxlZDogeyBvd25lZEZpbGVzOiBbXSwgYXBwbGllZFJlbGVhc2VJZHM6IFtdLCAuLi5zYXZlZC5pbnN0YWxsZWQgfSB9O1xuICAgIHRoaXMudXBkYXRlciA9IG5ldyBVcGRhdGVTZXJ2aWNlKHRoaXMuYXBwLCB0aGlzLm1hbmlmZXN0LnZlcnNpb24sICgpID0+IHRoaXMuZGF0YSwgYXN5bmMgKGRhdGEpID0+IHsgdGhpcy5kYXRhID0gZGF0YTsgYXdhaXQgdGhpcy5zYXZlRGF0YShkYXRhKTsgfSk7XG4gICAgdGhpcy5hZGRTZXR0aW5nVGFiKG5ldyBUYnBlZGlhVXBkYXRlU2V0dGluZ3NUYWIodGhpcy5hcHAsIHRoaXMpKTtcbiAgICB0aGlzLmFkZFJpYmJvbkljb24oXCJkb3dubG9hZFwiLCBcIkNoZWNrIFRicGVkaWEgdXBkYXRlc1wiLCAoKSA9PiB2b2lkIHRoaXMuY2hlY2tGb3JVcGRhdGUoKSk7XG4gICAgdGhpcy5hZGRDb21tYW5kKHsgaWQ6IFwiY2hlY2stZm9yLWNvbnRlbnQtdXBkYXRlXCIsIG5hbWU6IFwiQ2hlY2sgZm9yIGNvbnRlbnQgdXBkYXRlXCIsIGNhbGxiYWNrOiAoKSA9PiB2b2lkIHRoaXMuY2hlY2tGb3JVcGRhdGUoKSB9KTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgY2hlY2tGb3JVcGRhdGUoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IG1hbmlmZXN0ID0gYXdhaXQgdGhpcy51cGRhdGVyLmNoZWNrKCk7XG4gICAgICBpZiAoIW1hbmlmZXN0KSB7IG5ldyBOb3RpY2UoXCJZb3VyIFRicGVkaWEgY29udGVudCBpcyB1cCB0byBkYXRlLlwiKTsgcmV0dXJuOyB9XG4gICAgICBuZXcgVXBkYXRlTW9kYWwodGhpcy5hcHAsIG1hbmlmZXN0LCAocHJvZ3Jlc3MpID0+IHRoaXMudXBkYXRlci5pbnN0YWxsKG1hbmlmZXN0LCBwcm9ncmVzcykpLm9wZW4oKTtcbiAgICB9IGNhdGNoIChlcnJvcikgeyBuZXcgTm90aWNlKGBDb3VsZCBub3QgY2hlY2sgZm9yIFRicGVkaWEgdXBkYXRlczogJHttZXNzYWdlKGVycm9yKX1gKTsgfVxuICB9XG5cbiAgYXN5bmMgc2V0TGFuZ3VhZ2VDb2RlKGxhbmd1YWdlQ29kZTogUGx1Z2luRGF0YVtcImxhbmd1YWdlQ29kZVwiXSk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRoaXMuZGF0YSA9IHsgLi4udGhpcy5kYXRhLCBsYW5ndWFnZUNvZGUgfTtcbiAgICBhd2FpdCB0aGlzLnNhdmVEYXRhKHRoaXMuZGF0YSk7XG4gIH1cblxuICBnZXQgbGFuZ3VhZ2VDb2RlKCk6IFBsdWdpbkRhdGFbXCJsYW5ndWFnZUNvZGVcIl0geyByZXR1cm4gdGhpcy5kYXRhLmxhbmd1YWdlQ29kZTsgfVxufVxuXG5jbGFzcyBUYnBlZGlhVXBkYXRlU2V0dGluZ3NUYWIgZXh0ZW5kcyBQbHVnaW5TZXR0aW5nVGFiIHtcbiAgY29uc3RydWN0b3IoYXBwOiBBcHAsIHByaXZhdGUgcmVhZG9ubHkgcGx1Z2luOiBUYnBlZGlhVXBkYXRlUGx1Z2luKSB7IHN1cGVyKGFwcCwgcGx1Z2luKTsgfVxuICBkaXNwbGF5KCk6IHZvaWQge1xuICAgIGNvbnN0IHsgY29udGFpbmVyRWwgfSA9IHRoaXM7XG4gICAgY29udGFpbmVyRWwuZW1wdHkoKTtcbiAgICBjb250YWluZXJFbC5jcmVhdGVFbChcImgyXCIsIHsgdGV4dDogXCJUYnBlZGlhIFVwZGF0ZVwiIH0pO1xuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUoXCJWYXVsdCBsYW5ndWFnZVwiKVxuICAgICAgLnNldERlc2MoXCJTZWxlY3QgdGhlIGxhbmd1YWdlIG9mIHRoaXMgaW5zdGFsbGVkIFRicGVkaWEgY29sbGVjdGlvbi4gSXQgZGV0ZXJtaW5lcyB3aGljaCByZWxlYXNlIGhpc3RvcnkgaXMgdXNlZC5cIilcbiAgICAgIC5hZGREcm9wZG93bigoZHJvcGRvd24pID0+IHtcbiAgICAgICAgZHJvcGRvd24uYWRkT3B0aW9uKFwiXCIsIFwiQ2hvb3NlIGxhbmd1YWdlXHUyMDI2XCIpO1xuICAgICAgICBmb3IgKGNvbnN0IGNvZGUgb2YgU1VQUE9SVEVEX0xBTkdVQUdFUykgZHJvcGRvd24uYWRkT3B0aW9uKGNvZGUsIGNvZGUpO1xuICAgICAgICBkcm9wZG93bi5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5sYW5ndWFnZUNvZGUgPz8gXCJcIik7XG4gICAgICAgIGRyb3Bkb3duLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4geyBhd2FpdCB0aGlzLnBsdWdpbi5zZXRMYW5ndWFnZUNvZGUodmFsdWUgYXMgUGx1Z2luRGF0YVtcImxhbmd1YWdlQ29kZVwiXSk7IH0pO1xuICAgICAgfSk7XG4gIH1cbn1cblxuY2xhc3MgVXBkYXRlTW9kYWwgZXh0ZW5kcyBNb2RhbCB7XG4gIGNvbnN0cnVjdG9yKGFwcDogQXBwLCBwcml2YXRlIHJlYWRvbmx5IGJhdGNoOiBVcGRhdGVCYXRjaCwgcHJpdmF0ZSByZWFkb25seSBpbnN0YWxsOiAocHJvZ3Jlc3M6IChtZXNzYWdlOiBzdHJpbmcpID0+IHZvaWQpID0+IFByb21pc2U8dm9pZD4pIHsgc3VwZXIoYXBwKTsgfVxuICBvbk9wZW4oKTogdm9pZCB7XG4gICAgY29uc3QgeyBjb250ZW50RWwgfSA9IHRoaXM7XG4gICAgY29uc3QgZmlyc3QgPSB0aGlzLmJhdGNoLnJlbGVhc2VzWzBdOyBjb25zdCBsYXN0ID0gdGhpcy5iYXRjaC5yZWxlYXNlcy5hdCgtMSkhO1xuICAgIGNvbnRlbnRFbC5jcmVhdGVFbChcImgyXCIsIHsgdGV4dDogYEluc3RhbGwgJHt0aGlzLmJhdGNoLnJlbGVhc2VzLmxlbmd0aH0gVGJwZWRpYSByZWxlYXNlJHt0aGlzLmJhdGNoLnJlbGVhc2VzLmxlbmd0aCA9PT0gMSA/IFwiXCIgOiBcInNcIn1gIH0pO1xuICAgIGNvbnRlbnRFbC5jcmVhdGVFbChcInBcIiwgeyB0ZXh0OiBgJHtmaXJzdC5yZWxlYXNlVmVyc2lvbn0gXHUyMTkyICR7bGFzdC5yZWxlYXNlVmVyc2lvbn1gIH0pO1xuICAgIGNvbnN0IGxpc3QgPSBjb250ZW50RWwuY3JlYXRlRWwoXCJ1bFwiKTtcbiAgICBmb3IgKGNvbnN0IHJlbGVhc2Ugb2YgdGhpcy5iYXRjaC5yZWxlYXNlcykgbGlzdC5jcmVhdGVFbChcImxpXCIsIHsgdGV4dDogYCR7cmVsZWFzZS5yZWxlYXNlVmVyc2lvbn0gXHUyMDE0ICR7cmVsZWFzZS5yZWxlYXNlTm90ZXMuc3VtbWFyeX1gIH0pO1xuICAgIGNvbnN0IHN0YXR1cyA9IGNvbnRlbnRFbC5jcmVhdGVFbChcInBcIik7XG4gICAgbmV3IFNldHRpbmcoY29udGVudEVsKVxuICAgICAgLmFkZEJ1dHRvbigoYnV0dG9uKSA9PiBidXR0b24uc2V0QnV0dG9uVGV4dChcIkNhbmNlbFwiKS5vbkNsaWNrKCgpID0+IHRoaXMuY2xvc2UoKSkpXG4gICAgICAuYWRkQnV0dG9uKChidXR0b24pID0+IGJ1dHRvbi5zZXRDdGEoKS5zZXRCdXR0b25UZXh0KFwiVXBkYXRlIG5vd1wiKS5vbkNsaWNrKGFzeW5jICgpID0+IHtcbiAgICAgICAgYnV0dG9uLnNldERpc2FibGVkKHRydWUpOyBzdGF0dXMuc2V0VGV4dChcIlN0YXJ0aW5nIHVwZGF0ZVx1MjAyNlwiKTtcbiAgICAgICAgdHJ5IHsgYXdhaXQgdGhpcy5pbnN0YWxsKCh0ZXh0KSA9PiBzdGF0dXMuc2V0VGV4dCh0ZXh0KSk7IHRoaXMuY2xvc2UoKTsgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHsgc3RhdHVzLnNldFRleHQoYFVwZGF0ZSBmYWlsZWQ6ICR7bWVzc2FnZShlcnJvcil9YCk7IGJ1dHRvbi5zZXREaXNhYmxlZChmYWxzZSk7IH1cbiAgICAgIH0pKTtcbiAgfVxuICBvbkNsb3NlKCk6IHZvaWQgeyB0aGlzLmNvbnRlbnRFbC5lbXB0eSgpOyB9XG59XG5mdW5jdGlvbiBtZXNzYWdlKGVycm9yOiB1bmtub3duKTogc3RyaW5nIHsgcmV0dXJuIGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogXCJVbmtub3duIGVycm9yXCI7IH1cbiIsICJpbXBvcnQgSlNaaXAgZnJvbSBcImpzemlwXCI7XG5pbXBvcnQgeyBBcHAsIERhdGFBZGFwdGVyLCBOb3RpY2UsIFBsYXRmb3JtLCByZXF1ZXN0VXJsIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5pbXBvcnQgeyBjb21wYXJlVmVyc2lvbnMsIHBhcnNlQW5kVmFsaWRhdGVNYW5pZmVzdCB9IGZyb20gXCIuL21hbmlmZXN0XCI7XG5pbXBvcnQgeyBhc3NlcnRNYW5hZ2VkUGF0aCwgZW5zdXJlTm9QYXRoQ29uZmxpY3RzLCBub3JtYWxpemVQYXRoIH0gZnJvbSBcIi4vcGF0aC1wb2xpY3lcIjtcbmltcG9ydCB7IE1BTklGRVNUX0JBU0VfVVJMLCBQbHVnaW5EYXRhLCBQcm9iZVJlc3VsdCwgUmVsZWFzZUVudHJ5LCBSZWxlYXNlTWFuaWZlc3QsIFNvdXJjZSwgU3VwcG9ydGVkTGFuZ3VhZ2UsIFVwZGF0ZUJhdGNoLCBVcGRhdGVQbGFuLCBVcGRhdGVUcmFuc2FjdGlvbiwgV09SS0VSX1VSTCB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbmNvbnN0IFNUQUdJTkdfRElSID0gXCIub2JzaWRpYW4vcGx1Z2lucy90YnBlZGlhLXVwZGF0ZS8uc3RhZ2luZ1wiO1xuY29uc3QgTUFYX0FSQ0hJVkVfQllURVMgPSAxMDI0ICogMTAyNCAqIDEwMjQ7XG5jb25zdCBNQVhfRklMRVMgPSAzMF8wMDA7XG5jb25zdCBNQVhfVU5DT01QUkVTU0VEX0JZVEVTID0gNCAqIDEwMjQgKiAxMDI0ICogMTAyNDtcblxuZXhwb3J0IGNsYXNzIFVwZGF0ZVNlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJlYWRvbmx5IGFwcDogQXBwLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgcGx1Z2luVmVyc2lvbjogc3RyaW5nLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgZ2V0RGF0YTogKCkgPT4gUGx1Z2luRGF0YSxcbiAgICBwcml2YXRlIHJlYWRvbmx5IHNhdmVEYXRhOiAoZGF0YTogUGx1Z2luRGF0YSkgPT4gUHJvbWlzZTx2b2lkPixcbiAgKSB7fVxuXG4gIGFzeW5jIGNoZWNrKCk6IFByb21pc2U8VXBkYXRlQmF0Y2ggfCBudWxsPiB7XG4gICAgY29uc3QgbGFuZ3VhZ2UgPSB0aGlzLmdldERhdGEoKS5sYW5ndWFnZUNvZGU7XG4gICAgaWYgKCFsYW5ndWFnZSkgdGhyb3cgbmV3IEVycm9yKFwiQ2hvb3NlIHRoaXMgdmF1bHRcdTIwMTlzIFRicGVkaWEgbGFuZ3VhZ2UgaW4gdGhlIHBsdWdpbiBzZXR0aW5ncyBmaXJzdC5cIik7XG4gICAgY29uc3QgbWFuaWZlc3QgPSBhd2FpdCB0aGlzLmZldGNoTWFuaWZlc3QobGFuZ3VhZ2UpO1xuICAgIGlmIChtYW5pZmVzdC5jb2xsZWN0aW9uLmxhbmd1YWdlLmNvZGUgIT09IGxhbmd1YWdlKSB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgc2VsZWN0ZWQgbGFuZ3VhZ2UgZG9lcyBub3QgbWF0Y2ggdGhpcyByZWxlYXNlIG1hbmlmZXN0LlwiKTtcbiAgICB0aGlzLmFzc2VydENvbXBhdGlibGUobWFuaWZlc3QpO1xuICAgIGNvbnN0IHJlbGVhc2VzID0gdGhpcy5taXNzaW5nUmVsZWFzZXMobWFuaWZlc3QpO1xuICAgIHJldHVybiByZWxlYXNlcy5sZW5ndGggPyB7IG1hbmlmZXN0LCByZWxlYXNlcyB9IDogbnVsbDtcbiAgfVxuXG4gIGFzeW5jIGluc3RhbGwoYmF0Y2g6IFVwZGF0ZUJhdGNoLCBwcm9ncmVzczogKG1lc3NhZ2U6IHN0cmluZykgPT4gdm9pZCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRoaXMuYXNzZXJ0Q29tcGF0aWJsZShiYXRjaC5tYW5pZmVzdCk7XG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGJhdGNoLnJlbGVhc2VzLmxlbmd0aDsgaW5kZXggKz0gMSkge1xuICAgICAgY29uc3QgcmVsZWFzZSA9IGJhdGNoLnJlbGVhc2VzW2luZGV4XTtcbiAgICAgIHByb2dyZXNzKGBSZWxlYXNlICR7aW5kZXggKyAxfSBvZiAke2JhdGNoLnJlbGVhc2VzLmxlbmd0aH06ICR7cmVsZWFzZS5yZWxlYXNlVmVyc2lvbn1gKTtcbiAgICAgIGF3YWl0IHRoaXMuaW5zdGFsbFJlbGVhc2UoYmF0Y2gubWFuaWZlc3QsIHJlbGVhc2UsIHByb2dyZXNzKTtcbiAgICB9XG4gICAgbmV3IE5vdGljZShgVGJwZWRpYSB1cGRhdGVkIHRocm91Z2ggJHtiYXRjaC5yZWxlYXNlcy5hdCgtMSkhLnJlbGVhc2VWZXJzaW9ufS5gKTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgaW5zdGFsbFJlbGVhc2UobWFuaWZlc3Q6IFJlbGVhc2VNYW5pZmVzdCwgcmVsZWFzZTogUmVsZWFzZUVudHJ5LCBwcm9ncmVzczogKG1lc3NhZ2U6IHN0cmluZykgPT4gdm9pZCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGxldCB0cmFuc2FjdGlvbjogVXBkYXRlVHJhbnNhY3Rpb24gfCB1bmRlZmluZWQ7XG4gICAgbGV0IGNvbW1pdHRlZCA9IGZhbHNlO1xuICAgIHRyeSB7XG4gICAgICBwcm9ncmVzcyhcIkNyZWF0aW5nIHVwZGF0ZSB0cmFuc2FjdGlvblx1MjAyNlwiKTtcbiAgICAgIHRyYW5zYWN0aW9uID0gYXdhaXQgdGhpcy5jcmVhdGVUcmFuc2FjdGlvbihtYW5pZmVzdCwgcmVsZWFzZSk7XG4gICAgICBwcm9ncmVzcyhcIkRpc2NvdmVyaW5nIHVwZGF0ZSBzb3VyY2VzXHUyMDI2XCIpO1xuICAgICAgY29uc3Qgc291cmNlcyA9IGF3YWl0IHRoaXMuZ2V0U291cmNlcyhtYW5pZmVzdCwgcmVsZWFzZSwgdHJhbnNhY3Rpb24pO1xuICAgICAgaWYgKCFzb3VyY2VzLmxlbmd0aCkgdGhyb3cgbmV3IEVycm9yKFwiTm8gZW5hYmxlZCB1cGRhdGUgc291cmNlIGlzIGF2YWlsYWJsZS5cIik7XG4gICAgICBjb25zdCByYW5rZWQgPSBhd2FpdCB0aGlzLnJhbmtTb3VyY2VzKHNvdXJjZXMsIHRyYW5zYWN0aW9uLCBwcm9ncmVzcyk7XG4gICAgICBpZiAoIXJhbmtlZC5sZW5ndGgpIHRocm93IG5ldyBFcnJvcihcIkFsbCB1cGRhdGUgc291cmNlcyBmYWlsZWQgdGhlaXIgaGVhbHRoIGNoZWNrLlwiKTtcblxuICAgICAgbGV0IGFyY2hpdmU6IEFycmF5QnVmZmVyIHwgdW5kZWZpbmVkO1xuICAgICAgbGV0IGxhc3RFcnJvcjogdW5rbm93bjtcbiAgICAgIGZvciAoY29uc3Qgc291cmNlIG9mIHJhbmtlZCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHByb2dyZXNzKGBEb3dubG9hZGluZyBmcm9tICR7c291cmNlLm5hbWV9XHUyMDI2YCk7XG4gICAgICAgICAgYXJjaGl2ZSA9IGF3YWl0IHRoaXMuZG93bmxvYWRQYWNrYWdlKHNvdXJjZSwgdHJhbnNhY3Rpb24sIHJlbGVhc2UuZmlsZW5hbWUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikgeyBsYXN0RXJyb3IgPSBlcnJvcjsgfVxuICAgICAgfVxuICAgICAgaWYgKCFhcmNoaXZlKSB0aHJvdyBsYXN0RXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGxhc3RFcnJvciA6IG5ldyBFcnJvcihcIkFsbCB1cGRhdGUgc291cmNlcyBmYWlsZWQuXCIpO1xuXG4gICAgICBwcm9ncmVzcyhcIlZhbGlkYXRpbmcgcmVsZWFzZSBhcmNoaXZlXHUyMDI2XCIpO1xuICAgICAgY29uc3Qgc3RhZ2luZ1BhdGggPSBgJHtTVEFHSU5HX0RJUn0vJHt0cmFuc2FjdGlvbi5pZH0vcGFja2FnZS56aXBgO1xuICAgICAgYXdhaXQgd3JpdGVCaW5hcnkodGhpcy5hcHAudmF1bHQuYWRhcHRlciwgc3RhZ2luZ1BhdGgsIGFyY2hpdmUpO1xuICAgICAgYXJjaGl2ZSA9IGF3YWl0IHRoaXMuYXBwLnZhdWx0LmFkYXB0ZXIucmVhZEJpbmFyeShzdGFnaW5nUGF0aCk7XG4gICAgICBjb25zdCBwbGFuID0gYXdhaXQgdGhpcy52YWxpZGF0ZUFyY2hpdmUoYXJjaGl2ZSwgbWFuaWZlc3QsIHJlbGVhc2UpO1xuICAgICAgcHJvZ3Jlc3MoXCJBcHBseWluZyBtYW5hZ2VkIGZpbGVzXHUyMDI2XCIpO1xuICAgICAgYXdhaXQgdGhpcy5hcHBseShwbGFuLCBhcmNoaXZlLCBwcm9ncmVzcyk7XG4gICAgICBjb21taXR0ZWQgPSB0cnVlO1xuICAgICAgdHJ5IHsgYXdhaXQgdGhpcy5yZXBvcnQodHJhbnNhY3Rpb24sIFwic3VjY2Vzc1wiKTsgfVxuICAgICAgY2F0Y2ggeyBuZXcgTm90aWNlKFwiVGJwZWRpYSB3YXMgdXBkYXRlZCwgYnV0IHRoZSBzZXJ2aWNlIGNvdWxkIG5vdCByZWNvcmQgdGhlIHN1Y2Nlc3MgYXVkaXQuXCIpOyB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGlmICh0cmFuc2FjdGlvbiAmJiAhY29tbWl0dGVkKSBhd2FpdCB0aGlzLnJlcG9ydCh0cmFuc2FjdGlvbiwgXCJmYWlsZWRcIikuY2F0Y2goKCkgPT4gdW5kZWZpbmVkKTtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBpZiAodHJhbnNhY3Rpb24pIGF3YWl0IHJlbW92ZVRyZWUodGhpcy5hcHAudmF1bHQuYWRhcHRlciwgYCR7U1RBR0lOR19ESVJ9LyR7dHJhbnNhY3Rpb24uaWR9YCkuY2F0Y2goKCkgPT4gdW5kZWZpbmVkKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG1pc3NpbmdSZWxlYXNlcyhtYW5pZmVzdDogUmVsZWFzZU1hbmlmZXN0KTogUmVsZWFzZUVudHJ5W10ge1xuICAgIGNvbnN0IGluc3RhbGxlZCA9IHRoaXMuZ2V0RGF0YSgpLmluc3RhbGxlZDtcbiAgICBjb25zdCBpbnN0YWxsZWRJbmRleCA9IGluc3RhbGxlZC5yZWxlYXNlSWQgPyBtYW5pZmVzdC5yZWxlYXNlcy5maW5kSW5kZXgoKHJlbGVhc2UpID0+IHJlbGVhc2UucmVsZWFzZUlkID09PSBpbnN0YWxsZWQucmVsZWFzZUlkKSA6IC0xO1xuICAgIGlmIChpbnN0YWxsZWRJbmRleCA+PSAwKSByZXR1cm4gbWFuaWZlc3QucmVsZWFzZXMuc2xpY2UoaW5zdGFsbGVkSW5kZXggKyAxKTtcbiAgICBpZiAoIWluc3RhbGxlZC5yZWxlYXNlVmVyc2lvbikgcmV0dXJuIG1hbmlmZXN0LnJlbGVhc2VzO1xuICAgIHJldHVybiBtYW5pZmVzdC5yZWxlYXNlcy5maWx0ZXIoKHJlbGVhc2UpID0+IGNvbXBhcmVWZXJzaW9ucyhyZWxlYXNlLnJlbGVhc2VWZXJzaW9uLCBpbnN0YWxsZWQucmVsZWFzZVZlcnNpb24hKSA+IDApO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBmZXRjaE1hbmlmZXN0KGxhbmd1YWdlOiBTdXBwb3J0ZWRMYW5ndWFnZSk6IFByb21pc2U8UmVsZWFzZU1hbmlmZXN0PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCByZXF1ZXN0VXJsKHsgdXJsOiBgJHtNQU5JRkVTVF9CQVNFX1VSTH0vJHtsYW5ndWFnZS50b0xvd2VyQ2FzZSgpfS9sYXRlc3QuanNvbmAsIG1ldGhvZDogXCJHRVRcIiwgdGhyb3c6IGZhbHNlIH0pO1xuICAgIGlmIChyZXNwb25zZS5zdGF0dXMgIT09IDIwMCkgdGhyb3cgbmV3IEVycm9yKGBDb3VsZCBub3QgcmV0cmlldmUgcmVsZWFzZSBtZXRhZGF0YSAoSFRUUCAke3Jlc3BvbnNlLnN0YXR1c30pLmApO1xuICAgIGxldCBqc29uOiB1bmtub3duO1xuICAgIHRyeSB7IGpzb24gPSByZXNwb25zZS5qc29uOyB9IGNhdGNoIHsgdGhyb3cgbmV3IEVycm9yKFwiUmVsZWFzZSBtZXRhZGF0YSBpcyBub3QgdmFsaWQgSlNPTi5cIik7IH1cbiAgICByZXR1cm4gcGFyc2VBbmRWYWxpZGF0ZU1hbmlmZXN0KGpzb24pO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3NlcnRDb21wYXRpYmxlKG1hbmlmZXN0OiBSZWxlYXNlTWFuaWZlc3QpOiB2b2lkIHtcbiAgICBpZiAoY29tcGFyZVZlcnNpb25zKHRoaXMucGx1Z2luVmVyc2lvbiwgbWFuaWZlc3QubWluaW11bVBsdWdpblZlcnNpb24pIDwgMCkgdGhyb3cgbmV3IEVycm9yKGBUaGlzIHJlbGVhc2UgcmVxdWlyZXMgcGx1Z2luICR7bWFuaWZlc3QubWluaW11bVBsdWdpblZlcnNpb259IG9yIG5ld2VyLmApO1xuICAgIGNvbnN0IGFwcFZlcnNpb24gPSB0aGlzLmFwcFZlcnNpb24oKTtcbiAgICAvLyBPYnNpZGlhbiBkb2VzIG5vdCBleHBvc2UgYSBzdGFibGUsIHR5cGVkIHZlcnNpb24gcHJvcGVydHkgdG8gZXZlcnkgcGx1Z2luXG4gICAgLy8gcnVudGltZS4gQSBtaXNzaW5nIHZhbHVlIG11c3Qgbm90IGJlIGludGVycHJldGVkIGFzIHZlcnNpb24gMC4wLjAuXG4gICAgaWYgKGFwcFZlcnNpb24gJiYgY29tcGFyZVZlcnNpb25zKGFwcFZlcnNpb24sIG1hbmlmZXN0Lm1pbmltdW1PYnNpZGlhblZlcnNpb24pIDwgMCkgdGhyb3cgbmV3IEVycm9yKGBUaGlzIHJlbGVhc2UgcmVxdWlyZXMgT2JzaWRpYW4gJHttYW5pZmVzdC5taW5pbXVtT2JzaWRpYW5WZXJzaW9ufSBvciBuZXdlci5gKTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgY3JlYXRlVHJhbnNhY3Rpb24obWFuaWZlc3Q6IFJlbGVhc2VNYW5pZmVzdCwgcmVsZWFzZTogUmVsZWFzZUVudHJ5KTogUHJvbWlzZTxVcGRhdGVUcmFuc2FjdGlvbj4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5hcGkoXCIvdXBkYXRlcy90cmFuc2FjdGlvbnNcIiwgXCJQT1NUXCIsIHtcbiAgICAgIHRpdGxlOiBtYW5pZmVzdC50aXRsZSwgdmVyc2lvbjogcmVsZWFzZS5yZWxlYXNlVmVyc2lvbiwgZmlsZW5hbWU6IHJlbGVhc2UuZmlsZW5hbWUsIGxhbmd1YWdlOiBtYW5pZmVzdC5jb2xsZWN0aW9uLmxhbmd1YWdlLmNvZGUsXG4gICAgICBzZXJpZXM6IG1hbmlmZXN0LmNvbGxlY3Rpb24uc2VyaWVzLmlkLCBlZGl0aW9uOiBtYW5pZmVzdC5jb2xsZWN0aW9uLmVkaXRpb24uaWQsXG4gICAgICBkZXZpY2VfdHlwZTogUGxhdGZvcm0uaXNNb2JpbGUgPyBcIm1vYmlsZVwiIDogXCJkZXNrdG9wXCIsIG9zOiBuYXZpZ2F0b3IucGxhdGZvcm0sXG4gICAgICBjbGllbnRfdmVyc2lvbjogYCR7dGhpcy5hcHBWZXJzaW9uKCkgPz8gXCJ1bmtub3duXCJ9OyBwbHVnaW4vJHt0aGlzLnBsdWdpblZlcnNpb259YCwgdXNlcl9hZ2VudDogbmF2aWdhdG9yLnVzZXJBZ2VudCxcbiAgICB9KTtcbiAgICBpZiAodHlwZW9mIHJlc3BvbnNlLmlkICE9PSBcInN0cmluZ1wiIHx8IHR5cGVvZiByZXNwb25zZS50b2tlbiAhPT0gXCJzdHJpbmdcIikgdGhyb3cgbmV3IEVycm9yKFwiVXBkYXRlIHNlcnZpY2UgcmV0dXJuZWQgYW4gaW52YWxpZCB0cmFuc2FjdGlvbi5cIik7XG4gICAgcmV0dXJuIHsgaWQ6IHJlc3BvbnNlLmlkLCB0b2tlbjogcmVzcG9uc2UudG9rZW4gfTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgZ2V0U291cmNlcyhtYW5pZmVzdDogUmVsZWFzZU1hbmlmZXN0LCByZWxlYXNlOiBSZWxlYXNlRW50cnksIHRyYW5zYWN0aW9uOiBVcGRhdGVUcmFuc2FjdGlvbik6IFByb21pc2U8U291cmNlW10+IHtcbiAgICBjb25zdCBxdWVyeSA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoeyBsYW5ndWFnZTogbWFuaWZlc3QuY29sbGVjdGlvbi5sYW5ndWFnZS5jb2RlLCBzZXJpZXM6IG1hbmlmZXN0LmNvbGxlY3Rpb24uc2VyaWVzLmlkLCBlZGl0aW9uOiBtYW5pZmVzdC5jb2xsZWN0aW9uLmVkaXRpb24uaWQsIHRpdGxlOiBtYW5pZmVzdC50aXRsZSwgdmVyc2lvbjogcmVsZWFzZS5yZWxlYXNlVmVyc2lvbiwgZmlsZW5hbWU6IHJlbGVhc2UuZmlsZW5hbWUgfSk7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmFwaShgL3VwZGF0ZXMvc291cmNlcz8ke3F1ZXJ5fWAsIFwiR0VUXCIsIHVuZGVmaW5lZCwgdHJhbnNhY3Rpb24pO1xuICAgIGlmICghQXJyYXkuaXNBcnJheShyZXNwb25zZS5zb3VyY2VzKSkgdGhyb3cgbmV3IEVycm9yKFwiVXBkYXRlIHNlcnZpY2UgcmV0dXJuZWQgYW4gaW52YWxpZCBzb3VyY2UgbGlzdC5cIik7XG4gICAgcmV0dXJuIHJlc3BvbnNlLnNvdXJjZXMuZmlsdGVyKGlzU291cmNlKTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgcmFua1NvdXJjZXMoc291cmNlczogU291cmNlW10sIHRyYW5zYWN0aW9uOiBVcGRhdGVUcmFuc2FjdGlvbiwgcHJvZ3Jlc3M6IChtZXNzYWdlOiBzdHJpbmcpID0+IHZvaWQpOiBQcm9taXNlPFNvdXJjZVtdPiB7XG4gICAgcHJvZ3Jlc3MoXCJUZXN0aW5nIHVwZGF0ZSBzb3VyY2VzXHUyMDI2XCIpO1xuICAgIGNvbnN0IHByb2JlcyA9IGF3YWl0IFByb21pc2UuYWxsKHNvdXJjZXMuc2xpY2UoMCwgOCkubWFwKGFzeW5jIChzb3VyY2UpID0+ICh7IHNvdXJjZSwgcmVzdWx0OiBhd2FpdCB0aGlzLnByb2JlKHNvdXJjZSwgdHJhbnNhY3Rpb24pIH0pKSk7XG4gICAgcmV0dXJuIHByb2Jlc1xuICAgICAgLmZpbHRlcigoaXRlbSk6IGl0ZW0gaXMgeyBzb3VyY2U6IFNvdXJjZTsgcmVzdWx0OiBQcm9iZVJlc3VsdCB9ID0+IGl0ZW0ucmVzdWx0LmhlYWx0aHkgJiYgdHlwZW9mIGl0ZW0ucmVzdWx0LmxhdGVuY3lNcyA9PT0gXCJudW1iZXJcIilcbiAgICAgIC5zb3J0KChhLCBiKSA9PiBzY29yZShhLnNvdXJjZSwgYS5yZXN1bHQpIC0gc2NvcmUoYi5zb3VyY2UsIGIucmVzdWx0KSlcbiAgICAgIC5tYXAoKGl0ZW0pID0+IGl0ZW0uc291cmNlKTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgcHJvYmUoc291cmNlOiBTb3VyY2UsIHRyYW5zYWN0aW9uOiBVcGRhdGVUcmFuc2FjdGlvbik6IFByb21pc2U8UHJvYmVSZXN1bHQ+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmFwaShgL3VwZGF0ZXMvc291cmNlcy8ke2VuY29kZVVSSUNvbXBvbmVudChzb3VyY2Uuc291cmNlSWQpfS9wcm9iZWAsIFwiUE9TVFwiLCB7fSwgdHJhbnNhY3Rpb24pO1xuICAgICAgcmV0dXJuIHsgc291cmNlSWQ6IHNvdXJjZS5zb3VyY2VJZCwgaGVhbHRoeTogcmVzcG9uc2UuaGVhbHRoeSA9PT0gdHJ1ZSwgbGF0ZW5jeU1zOiBhc051bWJlcihyZXNwb25zZS5sYXRlbmN5TXMpLCBieXRlczogYXNOdW1iZXIocmVzcG9uc2UuYnl0ZXMpLCBlcnJvcjogYXNTdHJpbmcocmVzcG9uc2UuZXJyb3IpIH07XG4gICAgfSBjYXRjaCB7IHJldHVybiB7IHNvdXJjZUlkOiBzb3VyY2Uuc291cmNlSWQsIGhlYWx0aHk6IGZhbHNlIH07IH1cbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgZG93bmxvYWRQYWNrYWdlKHNvdXJjZTogU291cmNlLCB0cmFuc2FjdGlvbjogVXBkYXRlVHJhbnNhY3Rpb24sIGZpbGVuYW1lOiBzdHJpbmcpOiBQcm9taXNlPEFycmF5QnVmZmVyPiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgJHtXT1JLRVJfVVJMfS91cGRhdGVzL3BhY2thZ2VgLCB7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLCBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLCAuLi5hdXRoSGVhZGVycyh0cmFuc2FjdGlvbikgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgc291cmNlSWQ6IHNvdXJjZS5zb3VyY2VJZCwgZmlsZW5hbWUgfSksXG4gICAgfSk7XG4gICAgaWYgKCFyZXNwb25zZS5vayB8fCAhcmVzcG9uc2UuYm9keSkgdGhyb3cgbmV3IEVycm9yKGBEb3dubG9hZCBmYWlsZWQgZnJvbSAke3NvdXJjZS5uYW1lfSAoSFRUUCAke3Jlc3BvbnNlLnN0YXR1c30pLmApO1xuICAgIGNvbnN0IHJlYWRlciA9IHJlc3BvbnNlLmJvZHkuZ2V0UmVhZGVyKCk7IGNvbnN0IGNodW5rczogVWludDhBcnJheVtdID0gW107IGxldCB0b3RhbCA9IDA7XG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIGNvbnN0IHsgdmFsdWUsIGRvbmUgfSA9IGF3YWl0IHJlYWRlci5yZWFkKCk7XG4gICAgICBpZiAoZG9uZSkgYnJlYWs7XG4gICAgICB0b3RhbCArPSB2YWx1ZS5ieXRlTGVuZ3RoO1xuICAgICAgaWYgKHRvdGFsID4gTUFYX0FSQ0hJVkVfQllURVMpIHsgYXdhaXQgcmVhZGVyLmNhbmNlbCgpOyB0aHJvdyBuZXcgRXJyb3IoXCJSZWxlYXNlIGFyY2hpdmUgZXhjZWVkcyB0aGUgY29uZmlndXJlZCBzaXplIGxpbWl0LlwiKTsgfVxuICAgICAgY2h1bmtzLnB1c2godmFsdWUpO1xuICAgIH1cbiAgICBjb25zdCBhcmNoaXZlID0gbmV3IFVpbnQ4QXJyYXkodG90YWwpOyBsZXQgb2Zmc2V0ID0gMDtcbiAgICBmb3IgKGNvbnN0IGNodW5rIG9mIGNodW5rcykgeyBhcmNoaXZlLnNldChjaHVuaywgb2Zmc2V0KTsgb2Zmc2V0ICs9IGNodW5rLmJ5dGVMZW5ndGg7IH1cbiAgICByZXR1cm4gYXJjaGl2ZS5idWZmZXI7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIHZhbGlkYXRlQXJjaGl2ZShhcmNoaXZlOiBBcnJheUJ1ZmZlciwgbWFuaWZlc3Q6IFJlbGVhc2VNYW5pZmVzdCwgcmVsZWFzZTogUmVsZWFzZUVudHJ5KTogUHJvbWlzZTxVcGRhdGVQbGFuPiB7XG4gICAgY29uc3QgemlwID0gYXdhaXQgSlNaaXAubG9hZEFzeW5jKGFyY2hpdmUsIHsgY3JlYXRlRm9sZGVyczogZmFsc2UsIGNoZWNrQ1JDMzI6IGZhbHNlIH0pO1xuICAgIGNvbnN0IGV4cGVjdGVkID0gbmV3IFNldChyZWxlYXNlLmZpbGVzLm1hcCgoZmlsZSkgPT4gZmlsZS5wYXRoKSk7XG4gICAgY29uc3QgYWN0dWFsOiBzdHJpbmdbXSA9IFtdOyBsZXQgdG90YWxVbmNvbXByZXNzZWQgPSAwO1xuICAgIGZvciAoY29uc3QgZW50cnkgb2YgT2JqZWN0LnZhbHVlcyh6aXAuZmlsZXMpKSB7XG4gICAgICBjb25zdCBlbnRyeU5hbWUgPSBlbnRyeS5kaXIgPyBlbnRyeS5uYW1lLnJlcGxhY2UoL1xcLyQvLCBcIlwiKSA6IGVudHJ5Lm5hbWU7XG4gICAgICBpZiAoZW50cnlOYW1lKSBhc3NlcnRNYW5hZ2VkUGF0aChlbnRyeU5hbWUsIG5vcm1hbGl6ZVBhdGgobWFuaWZlc3QuY29sbGVjdGlvbi5pbnN0YWxsUm9vdCkpO1xuICAgICAgaWYgKGVudHJ5LmRpcikgY29udGludWU7XG4gICAgICBpZiAoKythY3R1YWwubGVuZ3RoID4gTUFYX0ZJTEVTKSB0aHJvdyBuZXcgRXJyb3IoXCJSZWxlYXNlIGFyY2hpdmUgaGFzIHRvbyBtYW55IGZpbGVzLlwiKTtcbiAgICAgIGNvbnN0IHBhdGggPSBhc3NlcnRNYW5hZ2VkUGF0aChlbnRyeS5uYW1lLCBub3JtYWxpemVQYXRoKG1hbmlmZXN0LmNvbGxlY3Rpb24uaW5zdGFsbFJvb3QpKTtcbiAgICAgIGFjdHVhbC5wdXNoKHBhdGgpO1xuICAgICAgY29uc3Qgc2l6ZSA9IHppcEVudHJ5U2l6ZShlbnRyeSk7XG4gICAgICBpZiAoc2l6ZSA9PT0gdW5kZWZpbmVkKSB0aHJvdyBuZXcgRXJyb3IoXCJSZWxlYXNlIGFyY2hpdmUgaGFzIGFuIGVudHJ5IHdpdGggbm8gc2l6ZSBtZXRhZGF0YS5cIik7XG4gICAgICB0b3RhbFVuY29tcHJlc3NlZCArPSBzaXplO1xuICAgICAgaWYgKHRvdGFsVW5jb21wcmVzc2VkID4gTUFYX1VOQ09NUFJFU1NFRF9CWVRFUykgdGhyb3cgbmV3IEVycm9yKFwiUmVsZWFzZSBhcmNoaXZlIGV4Y2VlZHMgdGhlIGNvbmZpZ3VyZWQgZXh0cmFjdGVkLXNpemUgbGltaXQuXCIpO1xuICAgIH1cbiAgICBpZiAobmV3IFNldChhY3R1YWwpLnNpemUgIT09IGFjdHVhbC5sZW5ndGgpIHRocm93IG5ldyBFcnJvcihcIlJlbGVhc2UgYXJjaGl2ZSBjb250YWlucyBjb2xsaWRpbmcgcGF0aHMuXCIpO1xuICAgIGVuc3VyZU5vUGF0aENvbmZsaWN0cyhhY3R1YWwpO1xuICAgIGlmIChhY3R1YWwubGVuZ3RoICE9PSBleHBlY3RlZC5zaXplIHx8IGFjdHVhbC5zb21lKChwYXRoKSA9PiAhZXhwZWN0ZWQuaGFzKHBhdGgpKSkgdGhyb3cgbmV3IEVycm9yKFwiUmVsZWFzZSBhcmNoaXZlIGRvZXMgbm90IGV4YWN0bHkgbWF0Y2ggdGhlIG1hbmlmZXN0IGludmVudG9yeS5cIik7XG4gICAgcmV0dXJuIHsgbWFuaWZlc3QsIHJlbGVhc2UsIHdyaXRlczogYWN0dWFsLCBkZWxldGlvbnM6IHJlbGVhc2UuZGVsZXRpb25zIH07XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGFwcGx5KHBsYW46IFVwZGF0ZVBsYW4sIGFyY2hpdmU6IEFycmF5QnVmZmVyLCBwcm9ncmVzczogKG1lc3NhZ2U6IHN0cmluZykgPT4gdm9pZCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGFkYXB0ZXIgPSB0aGlzLmFwcC52YXVsdC5hZGFwdGVyO1xuICAgIGNvbnN0IHByZXZpb3VzID0gdGhpcy5nZXREYXRhKCkuaW5zdGFsbGVkO1xuICAgIGNvbnN0IG93bmVkID0gbmV3IFNldChwcmV2aW91cy5vd25lZEZpbGVzKTtcbiAgICAvLyBFYWNoIHJlbGVhc2UgaXMgaW5jcmVtZW50YWw6IG9ubHkgZXhwbGljaXQgZGVsZXRpb25zIGFyZSByZW1vdmVkLiBFYXJsaWVyXG4gICAgLy8gcmVsZWFzZXMgcmVtYWluIGluc3RhbGxlZCBhZnRlciB0aGVpciBaSVAgaGFzIGNvbW1pdHRlZCBzdWNjZXNzZnVsbHkuXG4gICAgY29uc3QgZGVsZXRpb25zID0gWy4uLm5ldyBTZXQocGxhbi5kZWxldGlvbnMpXTtcbiAgICBmb3IgKGNvbnN0IHBhdGggb2YgcGxhbi53cml0ZXMpIHtcbiAgICAgIGF3YWl0IGFzc2VydE5vUmVwYXJzZVBvaW50cyh0aGlzLmFwcCwgcGF0aCk7XG4gICAgICBpZiAoYXdhaXQgYWRhcHRlci5leGlzdHMocGF0aCkpIHtcbiAgICAgICAgaWYgKChhd2FpdCBhZGFwdGVyLnN0YXQocGF0aCkpPy50eXBlID09PSBcImZvbGRlclwiKSB0aHJvdyBuZXcgRXJyb3IoYFJlZnVzaW5nIHRvIHJlcGxhY2UgYSBsb2NhbCBmb2xkZXI6ICR7cGF0aH1gKTtcbiAgICAgICAgaWYgKCFvd25lZC5oYXMocGF0aCkpIHRocm93IG5ldyBFcnJvcihgUmVmdXNpbmcgdG8gb3ZlcndyaXRlIHVubWFuYWdlZCBsb2NhbCBmaWxlOiAke3BhdGh9YCk7XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAoY29uc3QgcGF0aCBvZiBkZWxldGlvbnMpIHtcbiAgICAgIGF3YWl0IGFzc2VydE5vUmVwYXJzZVBvaW50cyh0aGlzLmFwcCwgcGF0aCk7XG4gICAgICBpZiAoIW93bmVkLmhhcyhwYXRoKSkgdGhyb3cgbmV3IEVycm9yKGBSZWZ1c2luZyB0byBkZWxldGUgYSBmaWxlIG5vdCBvd25lZCBieSB0aGUgcHJpb3IgcmVsZWFzZTogJHtwYXRofWApO1xuICAgIH1cblxuICAgIGNvbnN0IHRyYW5zYWN0aW9uRGlyID0gYCR7U1RBR0lOR19ESVJ9LyR7Y3J5cHRvLnJhbmRvbVVVSUQoKX1gO1xuICAgIGNvbnN0IGJhY2t1cERpciA9IGAke3RyYW5zYWN0aW9uRGlyfS9iYWNrdXBgO1xuICAgIGNvbnN0IGpvdXJuYWxQYXRoID0gYCR7dHJhbnNhY3Rpb25EaXJ9L3RyYW5zYWN0aW9uLmpzb25gO1xuICAgIGF3YWl0IG1rZGlycChhZGFwdGVyLCBiYWNrdXBEaXIpO1xuICAgIGNvbnN0IHRhcmdldHMgPSBbLi4ubmV3IFNldChbLi4ucGxhbi53cml0ZXMsIC4uLmRlbGV0aW9uc10pXTtcbiAgICBjb25zdCBvcmlnaW5hbHM6IEFycmF5PHsgcGF0aDogc3RyaW5nOyBleGlzdGVkOiBib29sZWFuIH0+ID0gW107XG4gICAgZm9yIChjb25zdCBwYXRoIG9mIHRhcmdldHMpIHtcbiAgICAgIGNvbnN0IGV4aXN0ZWQgPSBhd2FpdCBhZGFwdGVyLmV4aXN0cyhwYXRoKTsgb3JpZ2luYWxzLnB1c2goeyBwYXRoLCBleGlzdGVkIH0pO1xuICAgICAgaWYgKGV4aXN0ZWQpIGF3YWl0IHdyaXRlQmluYXJ5KGFkYXB0ZXIsIGAke2JhY2t1cERpcn0vJHtlbmNvZGVVUklDb21wb25lbnQocGF0aCl9YCwgYXdhaXQgYWRhcHRlci5yZWFkQmluYXJ5KHBhdGgpKTtcbiAgICB9XG4gICAgYXdhaXQgYWRhcHRlci53cml0ZShqb3VybmFsUGF0aCwgSlNPTi5zdHJpbmdpZnkoeyBvcmlnaW5hbHMgfSkpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHppcCA9IGF3YWl0IEpTWmlwLmxvYWRBc3luYyhhcmNoaXZlLCB7IGNyZWF0ZUZvbGRlcnM6IGZhbHNlLCBjaGVja0NSQzMyOiBmYWxzZSB9KTtcbiAgICAgIGZvciAoY29uc3QgcGF0aCBvZiBkZWxldGlvbnMpIGlmIChhd2FpdCBhZGFwdGVyLmV4aXN0cyhwYXRoKSkgYXdhaXQgYWRhcHRlci5yZW1vdmUocGF0aCk7XG4gICAgICBmb3IgKGNvbnN0IHBhdGggb2YgcGxhbi53cml0ZXMpIHtcbiAgICAgICAgcHJvZ3Jlc3MoYFdyaXRpbmcgJHtwYXRofVx1MjAyNmApO1xuICAgICAgICBhd2FpdCBta2RpcnAoYWRhcHRlciwgcGFyZW50KHBhdGgpKTtcbiAgICAgICAgY29uc3QgZW50cnkgPSB6aXAuZmlsZShwYXRoKTtcbiAgICAgICAgaWYgKCFlbnRyeSkgdGhyb3cgbmV3IEVycm9yKGBBcmNoaXZlIGVudHJ5IGRpc2FwcGVhcmVkOiAke3BhdGh9YCk7XG4gICAgICAgIGF3YWl0IHdyaXRlQmluYXJ5KGFkYXB0ZXIsIHBhdGgsIGF3YWl0IGVudHJ5LmFzeW5jKFwidWludDhhcnJheVwiKSk7XG4gICAgICB9XG4gICAgICBjb25zdCBuZXh0T3duZWQgPSBuZXcgU2V0KHByZXZpb3VzLm93bmVkRmlsZXMpO1xuICAgICAgZm9yIChjb25zdCBwYXRoIG9mIGRlbGV0aW9ucykgbmV4dE93bmVkLmRlbGV0ZShwYXRoKTtcbiAgICAgIGZvciAoY29uc3QgcGF0aCBvZiBwbGFuLndyaXRlcykgbmV4dE93bmVkLmFkZChwYXRoKTtcbiAgICAgIGF3YWl0IHRoaXMuc2F2ZURhdGEoeyBpbnN0YWxsZWQ6IHtcbiAgICAgICAgcmVsZWFzZVZlcnNpb246IHBsYW4ucmVsZWFzZS5yZWxlYXNlVmVyc2lvbixcbiAgICAgICAgcmVsZWFzZUlkOiBwbGFuLnJlbGVhc2UucmVsZWFzZUlkLFxuICAgICAgICBhcHBsaWVkUmVsZWFzZUlkczogWy4uLm5ldyBTZXQoWy4uLihwcmV2aW91cy5hcHBsaWVkUmVsZWFzZUlkcyA/PyBbXSksIHBsYW4ucmVsZWFzZS5yZWxlYXNlSWRdKV0sXG4gICAgICAgIG93bmVkRmlsZXM6IFsuLi5uZXh0T3duZWRdLnNvcnQoKSxcbiAgICAgIH0gfSk7XG4gICAgICBhd2FpdCByZW1vdmVUcmVlKGFkYXB0ZXIsIHRyYW5zYWN0aW9uRGlyKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgYXdhaXQgdGhpcy5yb2xsYmFjayhhZGFwdGVyLCBvcmlnaW5hbHMsIGJhY2t1cERpcik7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIHJvbGxiYWNrKGFkYXB0ZXI6IERhdGFBZGFwdGVyLCBvcmlnaW5hbHM6IEFycmF5PHsgcGF0aDogc3RyaW5nOyBleGlzdGVkOiBib29sZWFuIH0+LCBiYWNrdXBEaXI6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGZvciAoY29uc3Qgb3JpZ2luYWwgb2Ygb3JpZ2luYWxzLnJldmVyc2UoKSkge1xuICAgICAgaWYgKG9yaWdpbmFsLmV4aXN0ZWQpIGF3YWl0IHdyaXRlQmluYXJ5KGFkYXB0ZXIsIG9yaWdpbmFsLnBhdGgsIGF3YWl0IGFkYXB0ZXIucmVhZEJpbmFyeShgJHtiYWNrdXBEaXJ9LyR7ZW5jb2RlVVJJQ29tcG9uZW50KG9yaWdpbmFsLnBhdGgpfWApKTtcbiAgICAgIGVsc2UgaWYgKGF3YWl0IGFkYXB0ZXIuZXhpc3RzKG9yaWdpbmFsLnBhdGgpKSBhd2FpdCBhZGFwdGVyLnJlbW92ZShvcmlnaW5hbC5wYXRoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIHJlcG9ydCh0cmFuc2FjdGlvbjogVXBkYXRlVHJhbnNhY3Rpb24sIHN0YXR1czogXCJzdWNjZXNzXCIgfCBcImZhaWxlZFwiKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgdGhpcy5hcGkoYC91cGRhdGVzL3RyYW5zYWN0aW9ucy8ke2VuY29kZVVSSUNvbXBvbmVudCh0cmFuc2FjdGlvbi5pZCl9L3Jlc3VsdGAsIFwiUE9TVFwiLCB7IHN0YXR1cyB9LCB0cmFuc2FjdGlvbik7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGFwaShwYXRoOiBzdHJpbmcsIG1ldGhvZDogXCJHRVRcIiB8IFwiUE9TVFwiLCBib2R5Pzogb2JqZWN0LCB0cmFuc2FjdGlvbj86IFVwZGF0ZVRyYW5zYWN0aW9uKTogUHJvbWlzZTxSZWNvcmQ8c3RyaW5nLCB1bmtub3duPj4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYCR7V09SS0VSX1VSTH0ke3BhdGh9YCwgeyBtZXRob2QsIGhlYWRlcnM6IHsgLi4uKGJvZHkgPyB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0gOiB7fSksIC4uLih0cmFuc2FjdGlvbiA/IGF1dGhIZWFkZXJzKHRyYW5zYWN0aW9uKSA6IHt9KSB9LCBib2R5OiBib2R5ID8gSlNPTi5zdHJpbmdpZnkoYm9keSkgOiB1bmRlZmluZWQgfSk7XG4gICAgY29uc3QganNvbiA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKS5jYXRjaCgoKSA9PiAoe30pKTtcbiAgICBpZiAoIXJlc3BvbnNlLm9rKSB0aHJvdyBuZXcgRXJyb3IodHlwZW9mIGpzb24uZXJyb3IgPT09IFwic3RyaW5nXCIgPyBqc29uLmVycm9yIDogYFVwZGF0ZSBzZXJ2aWNlIHJlcXVlc3QgZmFpbGVkIChIVFRQICR7cmVzcG9uc2Uuc3RhdHVzfSkuYCk7XG4gICAgcmV0dXJuIGpzb24gYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj47XG4gIH1cblxuICBwcml2YXRlIGFwcFZlcnNpb24oKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICBjb25zdCBhcHAgPSB0aGlzLmFwcCBhcyB1bmtub3duIGFzIHsgdmVyc2lvbj86IHVua25vd247IGFwcFZlcnNpb24/OiB1bmtub3duOyB2YXVsdDogeyBnZXRDb25maWc/OiAoa2V5OiBzdHJpbmcpID0+IHVua25vd24gfSB9O1xuICAgIGNvbnN0IGdsb2JhbEFwcCA9IChnbG9iYWxUaGlzIGFzIHVua25vd24gYXMgeyBhcHA/OiB7IHZlcnNpb24/OiB1bmtub3duOyBhcHBWZXJzaW9uPzogdW5rbm93biB9IH0pLmFwcDtcbiAgICBjb25zdCBjYW5kaWRhdGVzID0gW2FwcC52ZXJzaW9uLCBhcHAuYXBwVmVyc2lvbiwgZ2xvYmFsQXBwPy52ZXJzaW9uLCBnbG9iYWxBcHA/LmFwcFZlcnNpb24sIGFwcC52YXVsdC5nZXRDb25maWc/LihcImFwcFZlcnNpb25cIildO1xuICAgIHJldHVybiBjYW5kaWRhdGVzLmZpbmQoKHZhbHVlKTogdmFsdWUgaXMgc3RyaW5nID0+IHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiAmJiAvXlxcZCtcXC5cXGQrXFwuXFxkKy8udGVzdCh2YWx1ZSkpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGF1dGhIZWFkZXJzKHRyYW5zYWN0aW9uOiBVcGRhdGVUcmFuc2FjdGlvbik6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4geyByZXR1cm4geyBcIlgtVXBkYXRlLVRyYW5zYWN0aW9uXCI6IHRyYW5zYWN0aW9uLmlkLCBcIkF1dGhvcml6YXRpb25cIjogYEJlYXJlciAke3RyYW5zYWN0aW9uLnRva2VufWAgfTsgfVxuZnVuY3Rpb24gaXNTb3VyY2UodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBTb3VyY2UgeyByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiAodmFsdWUgYXMgU291cmNlKS5zb3VyY2VJZCA9PT0gXCJzdHJpbmdcIiAmJiB0eXBlb2YgKHZhbHVlIGFzIFNvdXJjZSkubmFtZSA9PT0gXCJzdHJpbmdcIiAmJiB0eXBlb2YgKHZhbHVlIGFzIFNvdXJjZSkucHJpb3JpdHkgPT09IFwibnVtYmVyXCIgJiYgdHlwZW9mICh2YWx1ZSBhcyBTb3VyY2UpLnN1cHBvcnRzUmFuZ2UgPT09IFwiYm9vbGVhblwiOyB9XG5mdW5jdGlvbiBzY29yZShzb3VyY2U6IFNvdXJjZSwgcHJvYmU6IFByb2JlUmVzdWx0KTogbnVtYmVyIHsgcmV0dXJuIChwcm9iZS5sYXRlbmN5TXMgPz8gNjBfMDAwKSArIHNvdXJjZS5wcmlvcml0eSAqIDI1IC0gKHByb2JlLmJ5dGVzID8/IDApIC8gNDA5NjsgfVxuZnVuY3Rpb24gYXNOdW1iZXIodmFsdWU6IHVua25vd24pOiBudW1iZXIgfCB1bmRlZmluZWQgeyByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiICYmIE51bWJlci5pc0Zpbml0ZSh2YWx1ZSkgPyB2YWx1ZSA6IHVuZGVmaW5lZDsgfVxuZnVuY3Rpb24gYXNTdHJpbmcodmFsdWU6IHVua25vd24pOiBzdHJpbmcgfCB1bmRlZmluZWQgeyByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiID8gdmFsdWUgOiB1bmRlZmluZWQ7IH1cbmZ1bmN0aW9uIHppcEVudHJ5U2l6ZShlbnRyeTogSlNaaXAuSlNaaXBPYmplY3QpOiBudW1iZXIgfCB1bmRlZmluZWQge1xuICBjb25zdCBzaXplID0gKGVudHJ5IGFzIHVua25vd24gYXMgeyBfZGF0YT86IHsgdW5jb21wcmVzc2VkU2l6ZT86IHVua25vd24gfSB9KS5fZGF0YT8udW5jb21wcmVzc2VkU2l6ZTtcbiAgcmV0dXJuIHR5cGVvZiBzaXplID09PSBcIm51bWJlclwiICYmIE51bWJlci5pc1NhZmVJbnRlZ2VyKHNpemUpICYmIHNpemUgPj0gMCA/IHNpemUgOiB1bmRlZmluZWQ7XG59XG5mdW5jdGlvbiBwYXJlbnQocGF0aDogc3RyaW5nKTogc3RyaW5nIHsgY29uc3QgaW5kZXggPSBwYXRoLmxhc3RJbmRleE9mKFwiL1wiKTsgcmV0dXJuIGluZGV4ID09PSAtMSA/IFwiXCIgOiBwYXRoLnNsaWNlKDAsIGluZGV4KTsgfVxuYXN5bmMgZnVuY3Rpb24gbWtkaXJwKGFkYXB0ZXI6IERhdGFBZGFwdGVyLCBwYXRoOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgaWYgKCFwYXRoKSByZXR1cm47XG4gIGxldCBjdXJyZW50ID0gXCJcIjtcbiAgZm9yIChjb25zdCBzZWdtZW50IG9mIHBhdGguc3BsaXQoXCIvXCIpKSB7XG4gICAgY3VycmVudCA9IGN1cnJlbnQgPyBgJHtjdXJyZW50fS8ke3NlZ21lbnR9YCA6IHNlZ21lbnQ7XG4gICAgaWYgKCEoYXdhaXQgYWRhcHRlci5leGlzdHMoY3VycmVudCkpKSBhd2FpdCBhZGFwdGVyLm1rZGlyKGN1cnJlbnQpO1xuICB9XG59XG5hc3luYyBmdW5jdGlvbiB3cml0ZUJpbmFyeShhZGFwdGVyOiBEYXRhQWRhcHRlciwgcGF0aDogc3RyaW5nLCBkYXRhOiBBcnJheUJ1ZmZlciB8IFVpbnQ4QXJyYXkpOiBQcm9taXNlPHZvaWQ+IHsgY29uc3QgY29weSA9IG5ldyBVaW50OEFycmF5KGRhdGEgaW5zdGFuY2VvZiBVaW50OEFycmF5ID8gZGF0YSA6IG5ldyBVaW50OEFycmF5KGRhdGEpKTsgYXdhaXQgbWtkaXJwKGFkYXB0ZXIsIHBhcmVudChwYXRoKSk7IGF3YWl0IGFkYXB0ZXIud3JpdGVCaW5hcnkocGF0aCwgY29weS5idWZmZXIpOyB9XG5hc3luYyBmdW5jdGlvbiByZW1vdmVUcmVlKGFkYXB0ZXI6IERhdGFBZGFwdGVyLCBwYXRoOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHsgaWYgKGF3YWl0IGFkYXB0ZXIuZXhpc3RzKHBhdGgpKSBhd2FpdCBhZGFwdGVyLnJtZGlyKHBhdGgsIHRydWUpOyB9XG5hc3luYyBmdW5jdGlvbiBhc3NlcnROb1JlcGFyc2VQb2ludHMoYXBwOiBBcHAsIHZhdWx0UGF0aDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IGJhc2VQYXRoID0gKGFwcC52YXVsdC5hZGFwdGVyIGFzIHVua25vd24gYXMgeyBnZXRCYXNlUGF0aD86ICgpID0+IHN0cmluZyB9KS5nZXRCYXNlUGF0aD8uKCk7XG4gIGNvbnN0IHJlcXVpcmVGbiA9IChnbG9iYWxUaGlzIGFzIHVua25vd24gYXMgeyByZXF1aXJlPzogKG5hbWU6IHN0cmluZykgPT4geyBsc3RhdDogKHBhdGg6IHN0cmluZykgPT4gUHJvbWlzZTx7IGlzU3ltYm9saWNMaW5rOiAoKSA9PiBib29sZWFuIH0+IH0gfSkucmVxdWlyZTtcbiAgaWYgKCFiYXNlUGF0aCB8fCAhcmVxdWlyZUZuKSByZXR1cm47XG4gIGNvbnN0IGZzID0gcmVxdWlyZUZuKFwiZnMvcHJvbWlzZXNcIik7XG4gIGxldCBjdXJyZW50ID0gYmFzZVBhdGg7XG4gIGZvciAoY29uc3Qgc2VnbWVudCBvZiB2YXVsdFBhdGguc3BsaXQoXCIvXCIpKSB7XG4gICAgY3VycmVudCA9IGAke2N1cnJlbnR9LyR7c2VnbWVudH1gO1xuICAgIHRyeSB7XG4gICAgICBpZiAoKGF3YWl0IGZzLmxzdGF0KGN1cnJlbnQpKS5pc1N5bWJvbGljTGluaygpKSB0aHJvdyBuZXcgRXJyb3IoYFJlZnVzaW5nIHRvIHRyYXZlcnNlIGEgbGluayBvciByZXBhcnNlIHBvaW50OiAke3ZhdWx0UGF0aH1gKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgaWYgKChlcnJvciBhcyB7IGNvZGU/OiBzdHJpbmcgfSkuY29kZSAhPT0gXCJFTk9FTlRcIikgdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9XG59XG4iLCAiZXhwb3J0IGNvbnN0IE1BTklGRVNUX0JBU0VfVVJMID0gXCJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vdGJzcGVkaWEvdGJwZWRpYS11cGRhdGUvbWFpbi9tYW5pZmVzdHNcIjtcbmV4cG9ydCBjb25zdCBXT1JLRVJfVVJMID0gXCJodHRwczovL2NmdXBkYXRlLnRicGVkaWEub3JnXCI7XG5cbmV4cG9ydCBjb25zdCBTVVBQT1JURURfTEFOR1VBR0VTID0gW1wiZW5cIiwgXCJqYVwiLCBcImZyXCIsIFwiZXNcIiwgXCJkZVwiLCBcIm5sXCIsIFwic3ZcIiwgXCJrb1wiLCBcInpoLVRXXCIsIFwiemgtQ05cIiwgXCJ2aVwiLCBcImlkXCIsIFwidGhcIiwgXCJib1wiXSBhcyBjb25zdDtcbmV4cG9ydCB0eXBlIFN1cHBvcnRlZExhbmd1YWdlID0gdHlwZW9mIFNVUFBPUlRFRF9MQU5HVUFHRVNbbnVtYmVyXTtcblxuZXhwb3J0IGNvbnN0IE1BTkFHRURfUk9PVFMgPSBbXG4gIFwiMDAgXHU4QUFBXHU2NjBFXCIsIFwiMDEgXHU2NTg3XHU5NkM2XHU5MEU4XCIsIFwiMDIgXHU5NThCXHU3OTNBXHU5MEU4XCIsIFwiMDMgXHU3RDkzXHU4NUNGXHU5MEU4XCIsIFwiMDQgXHU5ODBDXHU4MjA3XHU2MjEyXHU1RjhCXCIsXG4gIFwiMDUgXHU1MEIzXHU2Q0Q1XHU5MEU4XCIsIFwiMDYgXHU1QkM2XHU2Q0Q1XHU1MTAwXHU4RUNDXCIsIFwiMDcgXHU0RjVCXHU4QTlFXHU1MTc4XHU4NUNGXCIsIFwiMDggXHU1MTc2XHU0RUQ2XHU5ODVFXHU1MjI1XCIsIFwiMDkgXHU4NEVFXHU5OTk5XHU0RTBBXHU1RTJCXCIsXG4gIFwiMTAgXHU3NzFGXHU0RjVCXHU1Qjk3XCIsIFwiMjAgXHU1QzA4XHU5ODRDXCIsIFwiNTAgXHU1MjE3XHU4ODY4XCIsIFwiNjAgXHU1QzBFXHU4QjgwXCIsIFwiNzAgXHU4MENDXHU2NjZGXHU4Q0M3XHU2NTk5XCIsIFwiOTAgXHU1RTZCXHU1MkE5XCIsXG4gIFwiOTggXHU0RTBCXHU4RjA5XHU4Q0M3XHU2NTk5XCIsIFwiOTkgU2V0dGluZ1wiXG5dIGFzIGNvbnN0O1xuXG5leHBvcnQgaW50ZXJmYWNlIFJlbGVhc2VFbnRyeSB7XG4gIHJlbGVhc2VWZXJzaW9uOiBzdHJpbmc7XG4gIHJlbGVhc2VJZDogc3RyaW5nO1xuICBwdWJsaXNoZWRBdDogc3RyaW5nO1xuICBmaWxlbmFtZTogc3RyaW5nO1xuICBmaWxlczogQXJyYXk8eyBwYXRoOiBzdHJpbmcgfT47XG4gIGRlbGV0aW9uczogc3RyaW5nW107XG4gIHJlbGVhc2VOb3RlczogeyBzdW1tYXJ5OiBzdHJpbmc7IGFkZGVkOiBudW1iZXI7IHVwZGF0ZWQ6IG51bWJlcjsgcmVtb3ZlZDogbnVtYmVyIH07XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVsZWFzZU1hbmlmZXN0IHtcbiAgc2NoZW1hVmVyc2lvbjogMjtcbiAgcHJvZHVjdDogXCJUYnBlZGlhLURpc3RyaWJ1dGVcIjtcbiAgcGx1Z2luOiBcInRicGVkaWEtdXBkYXRlXCI7XG4gIGNoYW5uZWw6IFwic3RhYmxlXCI7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIGNvbGxlY3Rpb246IHtcbiAgICBsYW5ndWFnZTogeyBjb2RlOiBzdHJpbmc7IG5hbWU6IHN0cmluZzsgZm9sZGVyOiBzdHJpbmcgfTtcbiAgICBzZXJpZXM6IHsgaWQ6IHN0cmluZzsgbmFtZTogc3RyaW5nOyBmb2xkZXI6IHN0cmluZyB9O1xuICAgIGVkaXRpb246IHsgaWQ6IHN0cmluZzsgbmFtZTogc3RyaW5nOyBmb2xkZXI6IHN0cmluZyB9O1xuICAgIGluc3RhbGxSb290OiBzdHJpbmc7XG4gIH07XG4gIG1pbmltdW1QbHVnaW5WZXJzaW9uOiBzdHJpbmc7XG4gIG1pbmltdW1PYnNpZGlhblZlcnNpb246IHN0cmluZztcbiAgbWFuYWdlZFJvb3RzOiBzdHJpbmdbXTtcbiAgcmVsZWFzZXM6IFJlbGVhc2VFbnRyeVtdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEluc3RhbGxlZFN0YXRlIHtcbiAgcmVsZWFzZVZlcnNpb24/OiBzdHJpbmc7XG4gIHJlbGVhc2VJZD86IHN0cmluZztcbiAgYXBwbGllZFJlbGVhc2VJZHM6IHN0cmluZ1tdO1xuICBvd25lZEZpbGVzOiBzdHJpbmdbXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQbHVnaW5EYXRhIHtcbiAgbGFuZ3VhZ2VDb2RlPzogU3VwcG9ydGVkTGFuZ3VhZ2U7XG4gIGluc3RhbGxlZDogSW5zdGFsbGVkU3RhdGU7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU291cmNlIHtcbiAgc291cmNlSWQ6IHN0cmluZztcbiAgbmFtZTogc3RyaW5nO1xuICByZWdpb24/OiBzdHJpbmc7XG4gIHByaW9yaXR5OiBudW1iZXI7XG4gIHN1cHBvcnRzUmFuZ2U6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVXBkYXRlVHJhbnNhY3Rpb24ge1xuICBpZDogc3RyaW5nO1xuICB0b2tlbjogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFByb2JlUmVzdWx0IHtcbiAgc291cmNlSWQ6IHN0cmluZztcbiAgaGVhbHRoeTogYm9vbGVhbjtcbiAgbGF0ZW5jeU1zPzogbnVtYmVyO1xuICBieXRlcz86IG51bWJlcjtcbiAgZXJyb3I/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVXBkYXRlUGxhbiB7XG4gIG1hbmlmZXN0OiBSZWxlYXNlTWFuaWZlc3Q7XG4gIHJlbGVhc2U6IFJlbGVhc2VFbnRyeTtcbiAgd3JpdGVzOiBzdHJpbmdbXTtcbiAgZGVsZXRpb25zOiBzdHJpbmdbXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBVcGRhdGVCYXRjaCB7XG4gIG1hbmlmZXN0OiBSZWxlYXNlTWFuaWZlc3Q7XG4gIHJlbGVhc2VzOiBSZWxlYXNlRW50cnlbXTtcbn1cbiIsICJpbXBvcnQgeyBNQU5BR0VEX1JPT1RTIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuY29uc3QgUkVTRVJWRUQgPSAvXihjb258cHJufGF1eHxudWx8Y29tWzEtOV18bHB0WzEtOV0pKFxcLi4qKT8kL2k7XG5jb25zdCBPQlNJRElBTl9GSUxFUyA9IG5ldyBTZXQoW1xuICBcIi5vYnNpZGlhbi9hcHAuanNvblwiLCBcIi5vYnNpZGlhbi9hcHBlYXJhbmNlLmpzb25cIiwgXCIub2JzaWRpYW4vY29tbXVuaXR5LXBsdWdpbnMuanNvblwiLFxuICBcIi5vYnNpZGlhbi9ob3RrZXlzLmpzb25cIiwgXCIub2JzaWRpYW4vd29ya3NwYWNlLmpzb25cIiwgXCIub2JzaWRpYW4vd29ya3NwYWNlLW1vYmlsZS5qc29uXCJcbl0pO1xuXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplUGF0aCh2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHZhbHVlLm5vcm1hbGl6ZShcIk5GQ1wiKS5yZXBsYWNlKC9cXFxcL2csIFwiL1wiKS5yZXBsYWNlKC9cXC8rL2csIFwiL1wiKS5yZXBsYWNlKC9eXFwuXFwvLywgXCJcIik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3NlcnRNYW5hZ2VkUGF0aCh2YWx1ZTogc3RyaW5nLCBpbnN0YWxsUm9vdDogc3RyaW5nKTogc3RyaW5nIHtcbiAgY29uc3QgcGF0aCA9IG5vcm1hbGl6ZVBhdGgodmFsdWUpO1xuICBpZiAoIXBhdGggfHwgcGF0aC5pbmNsdWRlcyhcIlxcMFwiKSB8fCBwYXRoLnN0YXJ0c1dpdGgoXCIvXCIpIHx8IC9eW0EtWmEtel06Ly50ZXN0KHBhdGgpKSB0aHJvdyBuZXcgRXJyb3IoYFVuc2FmZSBwYXRoOiAke3ZhbHVlfWApO1xuICBjb25zdCBzZWdtZW50cyA9IHBhdGguc3BsaXQoXCIvXCIpO1xuICBpZiAoc2VnbWVudHMuc29tZSgoc2VnbWVudCkgPT4gIXNlZ21lbnQgfHwgc2VnbWVudCA9PT0gXCIuXCIgfHwgc2VnbWVudCA9PT0gXCIuLlwiIHx8IC9bPD46XCJ8PypdLy50ZXN0KHNlZ21lbnQpIHx8IFJFU0VSVkVELnRlc3Qoc2VnbWVudCkpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBVbnNhZmUgcGF0aDogJHt2YWx1ZX1gKTtcbiAgfVxuICBpZiAocGF0aC5zdGFydHNXaXRoKGAke2luc3RhbGxSb290fS9gKSkge1xuICAgIGNvbnN0IGNoaWxkID0gcGF0aC5zbGljZShpbnN0YWxsUm9vdC5sZW5ndGggKyAxKS5zcGxpdChcIi9cIilbMF07XG4gICAgaWYgKCEoTUFOQUdFRF9ST09UUyBhcyByZWFkb25seSBzdHJpbmdbXSkuaW5jbHVkZXMoY2hpbGQpKSB0aHJvdyBuZXcgRXJyb3IoYFBhdGggaXMgb3V0c2lkZSBtYW5hZ2VkIHJvb3RzOiAke3ZhbHVlfWApO1xuICAgIHJldHVybiBwYXRoO1xuICB9XG4gIGlmIChPQlNJRElBTl9GSUxFUy5oYXMocGF0aCkgfHwgKCFwYXRoLmluY2x1ZGVzKFwiL1wiKSAmJiAhcGF0aC5zdGFydHNXaXRoKFwiLlwiKSkpIHJldHVybiBwYXRoO1xuICB0aHJvdyBuZXcgRXJyb3IoYFBhdGggaXMgb3V0c2lkZSB0aGUgbWFuYWdlZCBib3VuZGFyeTogJHt2YWx1ZX1gKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVuc3VyZU5vUGF0aENvbmZsaWN0cyhwYXRoczogc3RyaW5nW10pOiB2b2lkIHtcbiAgY29uc3Qgc29ydGVkID0gWy4uLnBhdGhzXS5zb3J0KCk7XG4gIGZvciAobGV0IGkgPSAxOyBpIDwgc29ydGVkLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgaWYgKHNvcnRlZFtpXS5zdGFydHNXaXRoKGAke3NvcnRlZFtpIC0gMV19L2ApKSB0aHJvdyBuZXcgRXJyb3IoYEZpbGUvZGlyZWN0b3J5IHBhdGggY29uZmxpY3Q6ICR7c29ydGVkW2kgLSAxXX1gKTtcbiAgfVxufVxuIiwgImltcG9ydCB7IE1BTkFHRURfUk9PVFMsIFJlbGVhc2VFbnRyeSwgUmVsZWFzZU1hbmlmZXN0IH0gZnJvbSBcIi4vdHlwZXNcIjtcbmltcG9ydCB7IGFzc2VydE1hbmFnZWRQYXRoLCBub3JtYWxpemVQYXRoIH0gZnJvbSBcIi4vcGF0aC1wb2xpY3lcIjtcblxuY29uc3QgUkVRVUlSRURfU1RSSU5HX0ZJRUxEUyA9IFtcInRpdGxlXCIsIFwibWluaW11bVBsdWdpblZlcnNpb25cIiwgXCJtaW5pbXVtT2JzaWRpYW5WZXJzaW9uXCJdIGFzIGNvbnN0O1xuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VBbmRWYWxpZGF0ZU1hbmlmZXN0KGlucHV0OiB1bmtub3duKTogUmVsZWFzZU1hbmlmZXN0IHtcbiAgaWYgKCFpc1JlY29yZChpbnB1dCkpIHRocm93IG5ldyBFcnJvcihcIlJlbGVhc2UgbWFuaWZlc3QgbXVzdCBiZSBhIEpTT04gb2JqZWN0LlwiKTtcbiAgZm9yIChjb25zdCBmb3JiaWRkZW4gb2YgW1wic2lnbmF0dXJlXCIsIFwicGF5bG9hZFwiLCBcImNvbGxlY3Rpb25LZXlcIiwgXCJzaGEyNTZcIiwgXCJzaXplXCIsIFwiZG93bmxvYWRVcmxcIiwgXCJ1cmxcIl0pIHtcbiAgICBpZiAoZm9yYmlkZGVuIGluIGlucHV0KSB0aHJvdyBuZXcgRXJyb3IoYE1hbmlmZXN0IGNvbnRhaW5zIHVuc3VwcG9ydGVkIGZpZWxkOiAke2ZvcmJpZGRlbn0uYCk7XG4gIH1cbiAgaWYgKGlucHV0LnNjaGVtYVZlcnNpb24gIT09IDIgfHwgaW5wdXQucHJvZHVjdCAhPT0gXCJUYnBlZGlhLURpc3RyaWJ1dGVcIiB8fCBpbnB1dC5wbHVnaW4gIT09IFwidGJwZWRpYS11cGRhdGVcIikgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBpcyBub3QgYSBzdXBwb3J0ZWQgaW5jcmVtZW50YWwgVGJwZWRpYSByZWxlYXNlIG1hbmlmZXN0LlwiKTtcbiAgaWYgKGlucHV0LmNoYW5uZWwgIT09IFwic3RhYmxlXCIpIHRocm93IG5ldyBFcnJvcihcIk9ubHkgdGhlIHN0YWJsZSByZWxlYXNlIGNoYW5uZWwgaXMgc3VwcG9ydGVkLlwiKTtcbiAgZm9yIChjb25zdCBmaWVsZCBvZiBSRVFVSVJFRF9TVFJJTkdfRklFTERTKSBpZiAodHlwZW9mIGlucHV0W2ZpZWxkXSAhPT0gXCJzdHJpbmdcIiB8fCAhaW5wdXRbZmllbGRdLnRyaW0oKSkgdGhyb3cgbmV3IEVycm9yKGBNYW5pZmVzdCBmaWVsZCAke2ZpZWxkfSBpcyBpbnZhbGlkLmApO1xuICBpZiAoIWlzUmVjb3JkKGlucHV0LmNvbGxlY3Rpb24pIHx8ICFpc0NvbGxlY3Rpb25QYXJ0KGlucHV0LmNvbGxlY3Rpb24ubGFuZ3VhZ2UsIFwiY29kZVwiKSB8fCAhaXNDb2xsZWN0aW9uUGFydChpbnB1dC5jb2xsZWN0aW9uLnNlcmllcywgXCJpZFwiKSB8fCAhaXNDb2xsZWN0aW9uUGFydChpbnB1dC5jb2xsZWN0aW9uLmVkaXRpb24sIFwiaWRcIikgfHwgdHlwZW9mIGlucHV0LmNvbGxlY3Rpb24uaW5zdGFsbFJvb3QgIT09IFwic3RyaW5nXCIpIHRocm93IG5ldyBFcnJvcihcIkNvbGxlY3Rpb24gaWRlbnRpdHkgaXMgaW52YWxpZC5cIik7XG5cbiAgY29uc3QgY29sbGVjdGlvbiA9IGlucHV0LmNvbGxlY3Rpb24gYXMgUmVsZWFzZU1hbmlmZXN0W1wiY29sbGVjdGlvblwiXTtcbiAgY29uc3QgZXhwZWN0ZWRSb290ID0gW2NvbGxlY3Rpb24ubGFuZ3VhZ2UuZm9sZGVyLCBjb2xsZWN0aW9uLnNlcmllcy5mb2xkZXIsIGNvbGxlY3Rpb24uZWRpdGlvbi5mb2xkZXJdLmpvaW4oXCIvXCIpO1xuICBpZiAobm9ybWFsaXplUGF0aChjb2xsZWN0aW9uLmluc3RhbGxSb290KSAhPT0gbm9ybWFsaXplUGF0aChleHBlY3RlZFJvb3QpKSB0aHJvdyBuZXcgRXJyb3IoXCJpbnN0YWxsUm9vdCBkb2VzIG5vdCBtYXRjaCBjb2xsZWN0aW9uIGZvbGRlcnMuXCIpO1xuICBpZiAoIUFycmF5LmlzQXJyYXkoaW5wdXQubWFuYWdlZFJvb3RzKSB8fCAhc2FtZVNldChpbnB1dC5tYW5hZ2VkUm9vdHMsIFsuLi5NQU5BR0VEX1JPT1RTXSkpIHRocm93IG5ldyBFcnJvcihcIm1hbmFnZWRSb290cyBkb2VzIG5vdCBtYXRjaCB0aGUgYXBwcm92ZWQgYm91bmRhcnkuXCIpO1xuICBpZiAoIUFycmF5LmlzQXJyYXkoaW5wdXQucmVsZWFzZXMpIHx8IGlucHV0LnJlbGVhc2VzLmxlbmd0aCA9PT0gMCkgdGhyb3cgbmV3IEVycm9yKFwicmVsZWFzZXMgbXVzdCBiZSBhIG5vbi1lbXB0eSBhcnJheS5cIik7XG5cbiAgY29uc3QgcmVsZWFzZXMgPSBpbnB1dC5yZWxlYXNlcy5tYXAoKGVudHJ5KSA9PiBwYXJzZVJlbGVhc2UoZW50cnksIG5vcm1hbGl6ZVBhdGgoY29sbGVjdGlvbi5pbnN0YWxsUm9vdCkpKTtcbiAgY29uc3QgaWRzID0gbmV3IFNldDxzdHJpbmc+KCk7XG4gIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCByZWxlYXNlcy5sZW5ndGg7IGluZGV4ICs9IDEpIHtcbiAgICBjb25zdCByZWxlYXNlID0gcmVsZWFzZXNbaW5kZXhdO1xuICAgIGlmIChpZHMuaGFzKHJlbGVhc2UucmVsZWFzZUlkKSkgdGhyb3cgbmV3IEVycm9yKGBEdXBsaWNhdGUgcmVsZWFzZUlkOiAke3JlbGVhc2UucmVsZWFzZUlkfS5gKTtcbiAgICBpZHMuYWRkKHJlbGVhc2UucmVsZWFzZUlkKTtcbiAgICBpZiAoaW5kZXggPiAwICYmIGNvbXBhcmVSZWxlYXNlKHJlbGVhc2VzW2luZGV4IC0gMV0sIHJlbGVhc2UpID49IDApIHRocm93IG5ldyBFcnJvcihcInJlbGVhc2VzIG11c3QgYmUgaW4gc3RyaWN0bHkgaW5jcmVhc2luZyB2ZXJzaW9uIGFuZCBwdWJsaWNhdGlvbiBvcmRlci5cIik7XG4gIH1cbiAgcmV0dXJuIHsgLi4uaW5wdXQsIHJlbGVhc2VzIH0gYXMgUmVsZWFzZU1hbmlmZXN0O1xufVxuXG5mdW5jdGlvbiBwYXJzZVJlbGVhc2UoaW5wdXQ6IHVua25vd24sIGluc3RhbGxSb290OiBzdHJpbmcpOiBSZWxlYXNlRW50cnkge1xuICBpZiAoIWlzUmVjb3JkKGlucHV0KSkgdGhyb3cgbmV3IEVycm9yKFwiRWFjaCByZWxlYXNlIG11c3QgYmUgYW4gb2JqZWN0LlwiKTtcbiAgZm9yIChjb25zdCBmaWVsZCBvZiBbXCJyZWxlYXNlVmVyc2lvblwiLCBcInJlbGVhc2VJZFwiLCBcInB1Ymxpc2hlZEF0XCIsIFwiZmlsZW5hbWVcIl0gYXMgY29uc3QpIGlmICh0eXBlb2YgaW5wdXRbZmllbGRdICE9PSBcInN0cmluZ1wiIHx8ICFpbnB1dFtmaWVsZF0udHJpbSgpKSB0aHJvdyBuZXcgRXJyb3IoYFJlbGVhc2UgZmllbGQgJHtmaWVsZH0gaXMgaW52YWxpZC5gKTtcbiAgY29uc3QgdmVyc2lvbkRhdGUgPSBwYXJzZVZlcnNpb25EYXRlKGlucHV0LnJlbGVhc2VWZXJzaW9uKTtcbiAgaWYgKCF2ZXJzaW9uRGF0ZSkgdGhyb3cgbmV3IEVycm9yKFwicmVsZWFzZVZlcnNpb24gbXVzdCBiZSBhIGRhdGUtYmFzZWQgdmVyc2lvbi5cIik7XG4gIGNvbnN0IHJlbGVhc2VJZCA9IHBhcnNlUmVsZWFzZUlkKGlucHV0LnJlbGVhc2VJZCk7XG4gIGlmICghcmVsZWFzZUlkKSB0aHJvdyBuZXcgRXJyb3IoXCJyZWxlYXNlSWQgbXVzdCBoYXZlIHRoZSBmb3JtYXQgWVlZWS1NLUQuc2VxdWVuY2UsIGZvciBleGFtcGxlIDIwMjYtMTAtMS4xLlwiKTtcbiAgaWYgKHJlbGVhc2VJZC55ZWFyICE9PSB2ZXJzaW9uRGF0ZS55ZWFyIHx8IHJlbGVhc2VJZC5tb250aCAhPT0gdmVyc2lvbkRhdGUubW9udGggfHwgcmVsZWFzZUlkLmRheSAhPT0gdmVyc2lvbkRhdGUuZGF5KSB0aHJvdyBuZXcgRXJyb3IoXCJyZWxlYXNlSWQgZGF0ZSBtdXN0IG1hdGNoIHJlbGVhc2VWZXJzaW9uLlwiKTtcbiAgaWYgKE51bWJlci5pc05hTihEYXRlLnBhcnNlKGlucHV0LnB1Ymxpc2hlZEF0KSkpIHRocm93IG5ldyBFcnJvcihcInB1Ymxpc2hlZEF0IG11c3QgYmUgSVNPLTg2MDEuXCIpO1xuICBpZiAoIUFycmF5LmlzQXJyYXkoaW5wdXQuZmlsZXMpIHx8ICFBcnJheS5pc0FycmF5KGlucHV0LmRlbGV0aW9ucykpIHRocm93IG5ldyBFcnJvcihcImZpbGVzIGFuZCBkZWxldGlvbnMgbXVzdCBiZSBhcnJheXMuXCIpO1xuICBjb25zdCBmaWxlcyA9IGlucHV0LmZpbGVzLm1hcCgoZW50cnkpID0+IHtcbiAgICBpZiAoIWlzUmVjb3JkKGVudHJ5KSB8fCB0eXBlb2YgZW50cnkucGF0aCAhPT0gXCJzdHJpbmdcIikgdGhyb3cgbmV3IEVycm9yKFwiRWFjaCBmaWxlIGVudHJ5IG5lZWRzIGEgcGF0aC5cIik7XG4gICAgcmV0dXJuIHsgcGF0aDogYXNzZXJ0TWFuYWdlZFBhdGgoZW50cnkucGF0aCwgaW5zdGFsbFJvb3QpIH07XG4gIH0pO1xuICBjb25zdCBkZWxldGlvbnMgPSBpbnB1dC5kZWxldGlvbnMubWFwKChwYXRoKSA9PiB7XG4gICAgaWYgKHR5cGVvZiBwYXRoICE9PSBcInN0cmluZ1wiKSB0aHJvdyBuZXcgRXJyb3IoXCJFYWNoIGRlbGV0aW9uIG11c3QgYmUgYSBwYXRoLlwiKTtcbiAgICByZXR1cm4gYXNzZXJ0TWFuYWdlZFBhdGgocGF0aCwgaW5zdGFsbFJvb3QpO1xuICB9KTtcbiAgY29uc3QgYWxsUGF0aHMgPSBbLi4uZmlsZXMubWFwKChmaWxlKSA9PiBmaWxlLnBhdGgpLCAuLi5kZWxldGlvbnNdO1xuICBpZiAobmV3IFNldChhbGxQYXRocykuc2l6ZSAhPT0gYWxsUGF0aHMubGVuZ3RoKSB0aHJvdyBuZXcgRXJyb3IoYFJlbGVhc2UgJHtpbnB1dC5yZWxlYXNlSWR9IGNvbnRhaW5zIGR1cGxpY2F0ZSBvciBjb25mbGljdGluZyBwYXRocy5gKTtcbiAgaWYgKCFpc1JlY29yZChpbnB1dC5yZWxlYXNlTm90ZXMpIHx8IHR5cGVvZiBpbnB1dC5yZWxlYXNlTm90ZXMuc3VtbWFyeSAhPT0gXCJzdHJpbmdcIiB8fCAhW1wiYWRkZWRcIiwgXCJ1cGRhdGVkXCIsIFwicmVtb3ZlZFwiXS5ldmVyeSgoa2V5KSA9PiB0eXBlb2YgaW5wdXQucmVsZWFzZU5vdGVzW2tleV0gPT09IFwibnVtYmVyXCIgJiYgaW5wdXQucmVsZWFzZU5vdGVzW2tleV0gPj0gMCkpIHRocm93IG5ldyBFcnJvcihcInJlbGVhc2VOb3RlcyBpcyBpbnZhbGlkLlwiKTtcbiAgcmV0dXJuIHsgcmVsZWFzZVZlcnNpb246IGlucHV0LnJlbGVhc2VWZXJzaW9uLCByZWxlYXNlSWQ6IGlucHV0LnJlbGVhc2VJZCwgcHVibGlzaGVkQXQ6IGlucHV0LnB1Ymxpc2hlZEF0LCBmaWxlbmFtZTogaW5wdXQuZmlsZW5hbWUsIGZpbGVzLCBkZWxldGlvbnMsIHJlbGVhc2VOb3RlczogaW5wdXQucmVsZWFzZU5vdGVzIGFzIFJlbGVhc2VFbnRyeVtcInJlbGVhc2VOb3Rlc1wiXSB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29tcGFyZVZlcnNpb25zKGE6IHN0cmluZywgYjogc3RyaW5nKTogbnVtYmVyIHtcbiAgY29uc3QgcGFyc2UgPSAodmFsdWU6IHN0cmluZykgPT4gdmFsdWUucmVwbGFjZSgvXnYvLCBcIlwiKS5zcGxpdCgvWy4rLV0vKS5zbGljZSgwLCAzKS5tYXAoKHBhcnQpID0+IE51bWJlci5wYXJzZUludChwYXJ0LCAxMCkgfHwgMCk7XG4gIGNvbnN0IGxlZnQgPSBwYXJzZShhKTsgY29uc3QgcmlnaHQgPSBwYXJzZShiKTtcbiAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IDM7IGluZGV4ICs9IDEpIGlmIChsZWZ0W2luZGV4XSAhPT0gcmlnaHRbaW5kZXhdKSByZXR1cm4gbGVmdFtpbmRleF0gLSByaWdodFtpbmRleF07XG4gIHJldHVybiAwO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNvbXBhcmVSZWxlYXNlKGE6IFJlbGVhc2VFbnRyeSwgYjogUmVsZWFzZUVudHJ5KTogbnVtYmVyIHtcbiAgY29uc3QgdmVyc2lvbiA9IGNvbXBhcmVWZXJzaW9ucyhhLnJlbGVhc2VWZXJzaW9uLCBiLnJlbGVhc2VWZXJzaW9uKTtcbiAgaWYgKHZlcnNpb24pIHJldHVybiB2ZXJzaW9uO1xuICBjb25zdCBzZXF1ZW5jZSA9IHBhcnNlUmVsZWFzZUlkKGEucmVsZWFzZUlkKSEuc2VxdWVuY2UgLSBwYXJzZVJlbGVhc2VJZChiLnJlbGVhc2VJZCkhLnNlcXVlbmNlO1xuICByZXR1cm4gc2VxdWVuY2UgfHwgRGF0ZS5wYXJzZShhLnB1Ymxpc2hlZEF0KSAtIERhdGUucGFyc2UoYi5wdWJsaXNoZWRBdCk7XG59XG5mdW5jdGlvbiBwYXJzZVZlcnNpb25EYXRlKHZhbHVlOiBzdHJpbmcpOiB7IHllYXI6IG51bWJlcjsgbW9udGg6IG51bWJlcjsgZGF5OiBudW1iZXIgfSB8IHVuZGVmaW5lZCB7XG4gIGNvbnN0IG1hdGNoID0gL14oXFxkezR9KVxcLihcXGR7MSwyfSlcXC4oXFxkezEsMn0pKD86Wy0rXVswLTlBLVphLXouLV0rKT8kLy5leGVjKHZhbHVlKTtcbiAgcmV0dXJuIG1hdGNoICYmIHZhbGlkRGF0ZShOdW1iZXIobWF0Y2hbMV0pLCBOdW1iZXIobWF0Y2hbMl0pLCBOdW1iZXIobWF0Y2hbM10pKSA/IHsgeWVhcjogTnVtYmVyKG1hdGNoWzFdKSwgbW9udGg6IE51bWJlcihtYXRjaFsyXSksIGRheTogTnVtYmVyKG1hdGNoWzNdKSB9IDogdW5kZWZpbmVkO1xufVxuZnVuY3Rpb24gcGFyc2VSZWxlYXNlSWQodmFsdWU6IHN0cmluZyk6IHsgeWVhcjogbnVtYmVyOyBtb250aDogbnVtYmVyOyBkYXk6IG51bWJlcjsgc2VxdWVuY2U6IG51bWJlciB9IHwgdW5kZWZpbmVkIHtcbiAgY29uc3QgbWF0Y2ggPSAvXihcXGR7NH0pLShcXGR7MSwyfSktKFxcZHsxLDJ9KVxcLihcXGQrKSQvLmV4ZWModmFsdWUpO1xuICBpZiAoIW1hdGNoKSByZXR1cm4gdW5kZWZpbmVkO1xuICBjb25zdCB5ZWFyID0gTnVtYmVyKG1hdGNoWzFdKTsgY29uc3QgbW9udGggPSBOdW1iZXIobWF0Y2hbMl0pOyBjb25zdCBkYXkgPSBOdW1iZXIobWF0Y2hbM10pOyBjb25zdCBzZXF1ZW5jZSA9IE51bWJlcihtYXRjaFs0XSk7XG4gIHJldHVybiB2YWxpZERhdGUoeWVhciwgbW9udGgsIGRheSkgJiYgTnVtYmVyLmlzU2FmZUludGVnZXIoc2VxdWVuY2UpICYmIHNlcXVlbmNlID49IDEgPyB7IHllYXIsIG1vbnRoLCBkYXksIHNlcXVlbmNlIH0gOiB1bmRlZmluZWQ7XG59XG5mdW5jdGlvbiB2YWxpZERhdGUoeWVhcjogbnVtYmVyLCBtb250aDogbnVtYmVyLCBkYXk6IG51bWJlcik6IGJvb2xlYW4geyBjb25zdCBkYXRlID0gbmV3IERhdGUoRGF0ZS5VVEMoeWVhciwgbW9udGggLSAxLCBkYXkpKTsgcmV0dXJuIGRhdGUuZ2V0VVRDRnVsbFllYXIoKSA9PT0geWVhciAmJiBkYXRlLmdldFVUQ01vbnRoKCkgPT09IG1vbnRoIC0gMSAmJiBkYXRlLmdldFVUQ0RhdGUoKSA9PT0gZGF5OyB9XG5mdW5jdGlvbiBpc0NvbGxlY3Rpb25QYXJ0KHZhbHVlOiB1bmtub3duLCBpZGVudGl0eTogXCJjb2RlXCIgfCBcImlkXCIpOiB2YWx1ZSBpcyBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+IHsgcmV0dXJuIGlzUmVjb3JkKHZhbHVlKSAmJiB0eXBlb2YgdmFsdWVbaWRlbnRpdHldID09PSBcInN0cmluZ1wiICYmIHR5cGVvZiB2YWx1ZS5uYW1lID09PSBcInN0cmluZ1wiICYmIHR5cGVvZiB2YWx1ZS5mb2xkZXIgPT09IFwic3RyaW5nXCI7IH1cbmZ1bmN0aW9uIGlzUmVjb3JkKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgUmVjb3JkPHN0cmluZywgYW55PiB7IHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiYgdmFsdWUgIT09IG51bGwgJiYgIUFycmF5LmlzQXJyYXkodmFsdWUpOyB9XG5mdW5jdGlvbiBzYW1lU2V0KHZhbHVlczogdW5rbm93bltdLCBleHBlY3RlZDogc3RyaW5nW10pOiBib29sZWFuIHsgcmV0dXJuIHZhbHVlcy5sZW5ndGggPT09IGV4cGVjdGVkLmxlbmd0aCAmJiBuZXcgU2V0KHZhbHVlcykuc2l6ZSA9PT0gdmFsdWVzLmxlbmd0aCAmJiB2YWx1ZXMuZXZlcnkoKHZhbHVlKSA9PiB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgJiYgZXhwZWN0ZWQuaW5jbHVkZXModmFsdWUpKTsgfVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQSxrRkFBQUEsU0FBQTtBQVlBLE1BQUMsU0FBUyxHQUFFO0FBQUMsVUFBRyxZQUFVLE9BQU8sV0FBUyxlQUFhLE9BQU9BLFFBQU8sQ0FBQUEsUUFBTyxVQUFRLEVBQUU7QUFBQSxlQUFVLGNBQVksT0FBTyxVQUFRLE9BQU8sSUFBSSxRQUFPLENBQUMsR0FBRSxDQUFDO0FBQUEsV0FBTTtBQUFDLFNBQUMsZUFBYSxPQUFPLFNBQU8sU0FBTyxlQUFhLE9BQU8sU0FBTyxTQUFPLGVBQWEsT0FBTyxPQUFLLE9BQUssTUFBTSxRQUFNLEVBQUU7QUFBQSxNQUFDO0FBQUEsSUFBQyxHQUFFLFdBQVU7QUFBQyxjQUFPLFNBQVMsRUFBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGlCQUFTLEVBQUUsR0FBRUMsSUFBRTtBQUFDLGNBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRTtBQUFDLGdCQUFHLENBQUMsRUFBRSxDQUFDLEdBQUU7QUFBQyxrQkFBSSxJQUFFLGNBQVksT0FBTyxXQUFTO0FBQVEsa0JBQUcsQ0FBQ0EsTUFBRyxFQUFFLFFBQU8sRUFBRSxHQUFFLElBQUU7QUFBRSxrQkFBRyxFQUFFLFFBQU8sRUFBRSxHQUFFLElBQUU7QUFBRSxrQkFBSSxJQUFFLElBQUksTUFBTSx5QkFBdUIsSUFBRSxHQUFHO0FBQUUsb0JBQU0sRUFBRSxPQUFLLG9CQUFtQjtBQUFBLFlBQUM7QUFBQyxnQkFBSSxJQUFFLEVBQUUsQ0FBQyxJQUFFLEVBQUMsU0FBUSxDQUFDLEVBQUM7QUFBRSxjQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLFNBQVEsU0FBU0EsSUFBRTtBQUFDLGtCQUFJQyxLQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRUQsRUFBQztBQUFFLHFCQUFPLEVBQUVDLE1BQUdELEVBQUM7QUFBQSxZQUFDLEdBQUUsR0FBRSxFQUFFLFNBQVEsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFVBQUM7QUFBQyxpQkFBTyxFQUFFLENBQUMsRUFBRTtBQUFBLFFBQU87QUFBQyxpQkFBUSxJQUFFLGNBQVksT0FBTyxXQUFTLFNBQVEsSUFBRSxHQUFFLElBQUUsRUFBRSxRQUFPLElBQUksR0FBRSxFQUFFLENBQUMsQ0FBQztBQUFFLGVBQU87QUFBQSxNQUFDLEdBQUUsRUFBQyxHQUFFLENBQUMsU0FBUyxHQUFFLEdBQUUsR0FBRTtBQUFDO0FBQWEsWUFBSSxJQUFFLEVBQUUsU0FBUyxHQUFFLElBQUUsRUFBRSxXQUFXLEdBQUUsSUFBRTtBQUFvRSxVQUFFLFNBQU8sU0FBU0EsSUFBRTtBQUFDLG1CQUFRQyxJQUFFQyxJQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxJQUFFLENBQUMsR0FBRSxJQUFFLEdBQUUsSUFBRUYsR0FBRSxRQUFPLElBQUUsR0FBRUcsS0FBRSxhQUFXLEVBQUUsVUFBVUgsRUFBQyxHQUFFLElBQUVBLEdBQUUsU0FBUSxLQUFFLElBQUUsR0FBRSxJQUFFRyxNQUFHRixLQUFFRCxHQUFFLEdBQUcsR0FBRUUsS0FBRSxJQUFFLElBQUVGLEdBQUUsR0FBRyxJQUFFLEdBQUUsSUFBRSxJQUFFQSxHQUFFLEdBQUcsSUFBRSxNQUFJQyxLQUFFRCxHQUFFLFdBQVcsR0FBRyxHQUFFRSxLQUFFLElBQUUsSUFBRUYsR0FBRSxXQUFXLEdBQUcsSUFBRSxHQUFFLElBQUUsSUFBRUEsR0FBRSxXQUFXLEdBQUcsSUFBRSxJQUFHLElBQUVDLE1BQUcsR0FBRSxLQUFHLElBQUVBLE9BQUksSUFBRUMsTUFBRyxHQUFFLElBQUUsSUFBRSxLQUFHLEtBQUdBLE9BQUksSUFBRSxLQUFHLElBQUUsSUFBRyxJQUFFLElBQUUsSUFBRSxLQUFHLElBQUUsSUFBRyxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsSUFBRSxFQUFFLE9BQU8sQ0FBQyxJQUFFLEVBQUUsT0FBTyxDQUFDLElBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUFFLGlCQUFPLEVBQUUsS0FBSyxFQUFFO0FBQUEsUUFBQyxHQUFFLEVBQUUsU0FBTyxTQUFTRixJQUFFO0FBQUMsY0FBSUMsSUFBRUMsSUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRTtBQUFRLGNBQUdGLEdBQUUsT0FBTyxHQUFFLEVBQUUsTUFBTSxNQUFJLEVBQUUsT0FBTSxJQUFJLE1BQU0saURBQWlEO0FBQUUsY0FBSSxHQUFFLElBQUUsS0FBR0EsS0FBRUEsR0FBRSxRQUFRLG9CQUFtQixFQUFFLEdBQUcsU0FBTztBQUFFLGNBQUdBLEdBQUUsT0FBT0EsR0FBRSxTQUFPLENBQUMsTUFBSSxFQUFFLE9BQU8sRUFBRSxLQUFHLEtBQUlBLEdBQUUsT0FBT0EsR0FBRSxTQUFPLENBQUMsTUFBSSxFQUFFLE9BQU8sRUFBRSxLQUFHLEtBQUksSUFBRSxLQUFHLEVBQUUsT0FBTSxJQUFJLE1BQU0sMkNBQTJDO0FBQUUsZUFBSSxJQUFFLEVBQUUsYUFBVyxJQUFJLFdBQVcsSUFBRSxDQUFDLElBQUUsSUFBSSxNQUFNLElBQUUsQ0FBQyxHQUFFLElBQUVBLEdBQUUsU0FBUSxDQUFBQyxLQUFFLEVBQUUsUUFBUUQsR0FBRSxPQUFPLEdBQUcsQ0FBQyxLQUFHLEtBQUcsSUFBRSxFQUFFLFFBQVFBLEdBQUUsT0FBTyxHQUFHLENBQUMsTUFBSSxHQUFFRSxNQUFHLEtBQUcsTUFBSSxLQUFHLElBQUUsRUFBRSxRQUFRRixHQUFFLE9BQU8sR0FBRyxDQUFDLE1BQUksR0FBRSxLQUFHLElBQUUsTUFBSSxLQUFHLElBQUUsRUFBRSxRQUFRQSxHQUFFLE9BQU8sR0FBRyxDQUFDLElBQUcsRUFBRSxHQUFHLElBQUVDLElBQUUsT0FBSyxNQUFJLEVBQUUsR0FBRyxJ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QUUsTUFBSUEsR0FBRSxPQUFPLElBQUksR0FBRSxFQUFFQSxJQUFFQSxHQUFFLE9BQU8sUUFBTSxJQUFFLEdBQUcsR0FBRSxFQUFFQSxJQUFFQSxHQUFFLE9BQU8sUUFBTSxLQUFHLEdBQUcsR0FBRSxFQUFFQSxJQUFFQSxHQUFFLE9BQU8sUUFBTSxLQUFHLEdBQUcsR0FBRSxFQUFFQSxJQUFFLE1BQUlBLEdBQUUsUUFBTSxJQUFFLEtBQUdBLEdBQUUsWUFBVUEsR0FBRSxRQUFNLElBQUUsSUFBRSxDQUFDLEdBQUUsRUFBRUEsSUFBRSxNQUFJQSxHQUFFLE9BQU8sRUFBRSxHQUFFQSxHQUFFLE9BQU8sU0FBT0EsR0FBRSxPQUFPLE1BQU0sV0FBUyxFQUFFQSxJQUFFLE1BQUlBLEdBQUUsT0FBTyxNQUFNLE1BQU0sR0FBRSxFQUFFQSxJQUFFQSxHQUFFLE9BQU8sTUFBTSxVQUFRLElBQUUsR0FBRyxJQUFHQSxHQUFFLE9BQU8sU0FBT0osR0FBRSxRQUFNLEVBQUVBLEdBQUUsT0FBTUksR0FBRSxhQUFZQSxHQUFFLFNBQVEsQ0FBQyxJQUFHQSxHQUFFLFVBQVEsR0FBRUEsR0FBRSxTQUFPLE9BQUssRUFBRUEsSUFBRSxDQUFDLEdBQUUsRUFBRUEsSUFBRSxDQUFDLEdBQUUsRUFBRUEsSUFBRSxDQUFDLEdBQUUsRUFBRUEsSUFBRSxDQUFDLEdBQUUsRUFBRUEsSUFBRSxDQUFDLEdBQUUsRUFBRUEsSUFBRSxNQUFJQSxHQUFFLFFBQU0sSUFBRSxLQUFHQSxHQUFFLFlBQVVBLEdBQUUsUUFBTSxJQUFFLElBQUUsQ0FBQyxHQUFFLEVBQUVBLElBQUUsQ0FBQyxHQUFFQSxHQUFFLFNBQU87QUFBQSxlQUFPO0FBQUMsZ0JBQUlHLEtBQUUsS0FBR0gsR0FBRSxTQUFPLEtBQUcsTUFBSTtBQUFFLFlBQUFHLE9BQUksS0FBR0gsR0FBRSxZQUFVQSxHQUFFLFFBQU0sSUFBRSxJQUFFQSxHQUFFLFFBQU0sSUFBRSxJQUFFLE1BQUlBLEdBQUUsUUFBTSxJQUFFLE1BQUksR0FBRSxNQUFJQSxHQUFFLGFBQVdHLE1BQUcs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LEtBQUcsS0FBRyxHQUFFO0FBQUMsNkJBQUksS0FBRyxHQUFFLEVBQUUsR0FBRyxJQUFFLEVBQUUsR0FBRyxHQUFFLEVBQUUsSUFBRztBQUFDLDRCQUFHLElBQUUsR0FBRSxJQUFFLEdBQUU7QUFBQywrQkFBSSxLQUFHLElBQUUsR0FBRSxFQUFFLEdBQUcsSUFBRSxFQUFFLEdBQUcsR0FBRSxFQUFFLElBQUc7QUFBQyw4QkFBRSxJQUFFLEdBQUUsSUFBRTtBQUFBLHdCQUFDO0FBQUEsc0JBQUM7QUFBQSxvQkFBQyxXQUFTLEtBQUcsSUFBRSxHQUFFLElBQUUsR0FBRTtBQUFDLDJCQUFJLEtBQUcsR0FBRSxFQUFFLEdBQUcsSUFBRSxFQUFFLEdBQUcsR0FBRSxFQUFFLElBQUc7QUFBQywwQkFBRSxJQUFFLEdBQUUsSUFBRTtBQUFBLG9CQUFDO0FBQUMsMkJBQUssSUFBRSxJQUFHLEdBQUUsR0FBRyxJQUFFLEVBQUUsR0FBRyxHQUFFLEVBQUUsR0FBRyxJQUFFLEVBQUUsR0FBRyxHQUFFLEVBQUUsR0FBRyxJQUFFLEVBQUUsR0FBRyxHQUFFLEtBQUc7QUFBRSwwQkFBSSxFQUFFLEdBQUcsSUFBRSxFQUFFLEdBQUcsR0FBRSxJQUFFLE1BQUksRUFBRSxHQUFHLElBQUUsRUFBRSxHQUFHO0FBQUEsa0JBQUcsT0FBSztBQUFDLHlCQUFJLElBQUUsSUFBRSxHQUFFLEVBQUUsR0FBRyxJQUFFLEVBQUUsR0FBRyxHQUFFLEVBQUUsR0FBRyxJQUFFLEVBQUUsR0FBRyxHQUFFLEVBQUUsR0FBRyxJQUFFLEVBQUUsR0FBRyxHQUFFLEtBQUcsS0FBRyxLQUFJO0FBQUMsMEJBQUksRUFBRSxHQUFHLElBQUUsRUFBRSxHQUFHLEdBQUUsSUFBRSxNQUFJLEVBQUUsR0FBRyxJQUFFLEVBQUUsR0FBRztBQUFBLGtCQUFHO0FBQUM7QUFBQSxnQkFBSztBQUFBLGNBQUM7QUFBQztBQUFBLFlBQUs7QUFBQSxVQUFDLFNBQU8sSUFBRSxLQUFHLElBQUU7QUFBRyxlQUFHLElBQUUsS0FBRyxHQUFFLE1BQUksTUFBSSxLQUFHLEtBQUcsTUFBSSxHQUFFRixHQUFFLFVBQVEsR0FBRUEsR0FBRSxXQUFTLEdBQUVBLEdBQUUsV0FBUyxJQUFFLElBQUUsSUFBRSxJQUFFLElBQUUsS0FBRyxJQUFFLElBQUdBLEdBQUUsWUFBVSxJQUFFLElBQUUsSUFBRSxJQUFFLE1BQUksT0FBSyxJQUFFLElBQUdFLEdBQUUsT0FBSyxHQUFFQSxHQUFFLE9BQUs7QUFBQSxRQUFDO0FBQUEsTUFBQyxHQUFFLENBQUMsQ0FBQyxHQUFFLElBQUcsQ0FBQyxTQUFTLEdBQUUsR0FBRSxHQUFFO0FBQUM7QUFBYSxZQUFJLElBQUUsRUFBRSxpQkFBaUIsR0FBRSxJQUFFLEVBQUUsV0FBVyxHQUFFLElBQUUsRUFBRSxTQUFTLEdBQUUsSUFBRSxFQUFFLFdBQVcsR0FBRSxJQUFFLEVBQUUsWUFBWSxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsSUFBRyxJQUFFLEdBQUUsSUFBRSxLQUFJLElBQUU7QUFBSSxpQkFBUyxFQUFFRixJQUFFO0FBQUMsa0JBQU9BLE9BQUksS0FBRyxRQUFNQSxPQUFJLElBQUUsV0FBUyxRQUFNQSxPQUFJLE9BQUssTUFBSUEsT0FBSTtBQUFBLFFBQUc7QUFBQyxpQkFBUyxJQUFHO0FBQUMsZUFBSyxPQUFLLEdBQUUsS0FBSyxPQUFLLE9BQUcsS0FBSyxPQUFLLEdBQUUsS0FBSyxXQUFTLE9BQUcsS0FBSyxRQUFNLEdBQUUsS0FBSyxPQUFLLEdBQUUsS0FBSyxRQUFNLEdBQUUsS0FBSyxRQUFNLEdBQUUsS0FBSyxPQUFLLE1BQUssS0FBSyxRQUFNLEdBQUUsS0FBSyxRQUFNLEdBQUUsS0FBSyxRQUFNLEdBQUUsS0FBSyxRQUFNLEdBQUUsS0FBSyxTQUFPLE1BQUssS0FBSyxPQUFLLEdBQUUsS0FBSyxPQUFLLEdBQUUsS0FBSyxTQUFPLEdBQUUsS0FBSyxTQUFPLEdBQUUsS0FBSyxRQUFNLEdBQUUsS0FBSyxVQUFRLE1BQUssS0FBSyxXQUFTLE1BQUssS0FBSyxVQUFRLEdBQUUsS0FBSyxXQUFTLEdBQUUsS0FBSyxR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LElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxFQUFFLEdBQUUsSUFBRSxDQUFDLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxLQUFJLEtBQUksS0FBSSxLQUFJLEtBQUksS0FBSSxNQUFLLE1BQUssTUFBSyxNQUFLLE1BQUssTUFBSyxNQUFLLE9BQU0sT0FBTSxPQUFNLEdBQUUsQ0FBQyxHQUFFLElBQUUsQ0FBQyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLEVBQUU7QUFBRSxVQUFFLFVBQVEsU0FBU0YsSUFBRUMsSUFBRUMsSUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxjQUFJLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLElBQUUsRUFBRSxNQUFLLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLE1BQUssSUFBRSxHQUFFLElBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxHQUFFLElBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxHQUFFLElBQUUsTUFBSyxJQUFFO0FBQUUsZUFBSSxJQUFFLEdBQUUsS0FBRyxJQUFHLElBQUksR0FBRSxDQUFDLElBQUU7QUFBRSxlQUFJLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBSSxHQUFFRCxHQUFFQyxLQUFFLENBQUMsQ0FBQztBQUFJLGVBQUksSUFBRSxHQUFFLElBQUUsSUFBRyxLQUFHLEtBQUcsTUFBSSxFQUFFLENBQUMsR0FBRSxJQUFJO0FBQUMsY0FBRyxJQUFFLE1BQUksSUFBRSxJQUFHLE1BQUksRUFBRSxRQUFPLEVBQUUsR0FBRyxJQUFFLFVBQVMsRUFBRSxHQUFHLElBQUUsVUFBUyxFQUFFLE9BQUssR0FBRTtBQUFFLGVBQUksSUFBRSxHQUFFLElBQUUsS0FBRyxNQUFJLEVBQUUsQ0FBQyxHQUFFLElBQUk7QUFBQyxlQUFJLElBQUUsTUFBSSxJQUFFLElBQUcsSUFBRSxJQUFFLEdBQUUsS0FBRyxJQUFHLElBQUksS0FBRyxNQUFJLElBQUcsS0FBRyxFQUFFLENBQUMsS0FBRyxFQUFFLFFBQU07QUFBRyxjQUFHLElBQUUsTUFBSSxNQUFJRixNQUFHLE1BQUksR0FBRyxRQUFNO0FBQUcsZUFBSSxFQUFFLENBQUMsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLElBQUcsSUFBSSxHQUFFLElBQUUsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxJQUFFLEVBQUUsQ0FBQztBQUFFLGVBQUksSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFJLE9BQUlDLEdBQUVDLEtBQUUsQ0FBQyxNQUFJLEVBQUUsRUFBRUQsR0FBRUMsS0FBRSxDQUFDLENBQUMsR0FBRyxJQUFFO0FBQUcsY0FBRyxJQUFFLE1BQUlGLE1BQUcsSUFBRSxJQUFFLEdBQUUsTUFBSSxNQUFJQSxNQUFHLElBQUUsR0FBRSxLQUFHLEtBQUksSUFBRSxHQUFFLEtBQUcsS0FBSSxRQUFNLElBQUUsR0FBRSxJQUFFLEdBQUUsS0FBSSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsSUFBRSxJQUFFLEdBQUUsSUFBRSxJQUFHLEtBQUcsSUFBRSxNQUFJLElBQUUsTUFBSSxHQUFFLE1BQUlBLE1BQUcsTUFBSSxLQUFHLE1BQUlBLE1BQUcsTUFBSSxFQUFFLFFBQU87QUFBRSxxQkFBTztBQUFDLGlCQUFJLElBQUUsSUFBRSxHQUFFLElBQUUsRUFBRSxDQUFDLElBQUUsS0FBRyxJQUFFLEdBQUUsRUFBRSxDQUFDLEtBQUcsRUFBRSxDQUFDLElBQUUsS0FBRyxJQUFFLEVBQUUsSUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFFLEVBQUUsSUFBRSxFQUFFLENBQUMsQ0FBQyxNQUFJLElBQUUsSUFBRyxJQUFHLElBQUUsS0FBRyxJQUFFLEdBQUUsSUFBRSxJQUFFLEtBQUcsR0FBRSxFQUFFLEtBQUcsS0FBRyxNQUFJLEtBQUcsRUFBRSxJQUFFLEtBQUcsS0FBRyxLQUFHLEtBQUcsSUFBRSxHQUFFLE1BQUksSUFBRztBQUFDLGlCQUFJLElBQUUsS0FBRyxJQUFFLEdBQUUsSUFBRSxJQUFHLE9BQUk7QUFBRSxnQkFBRyxNQUFJLEtBQUcsS0FBRyxJQUFFLEdBQUUsS0FBRyxLQUFHLElBQUUsR0FBRSxLQUFJLEtBQUcsRUFBRSxFQUFFLENBQUMsR0FBRTtBQUFDLGtCQUFHLE1BQUksRUFBRTtBQUFNLGtCQUFFQyxHQUFFQyxLQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQUEsWUFBQztBQUFDLGdCQUFHLElBQUUsTUFBSSxJQUFFLE9BQUssR0FBRTtBQUFDLG1CQUFJLE1BQUksTUFBSSxJQUFFLElBQUcsS0FBRyxHQUFFLElBQUUsTUFBSSxJQUFFLElBQUUsSUFBRyxJQUFFLElBQUUsS0FBRyxHQUFHLEtBQUcsRUFBRSxJQUFFLENBQUMsTUFBSSxLQUFJLE1BQUksTUFBSTtBQUFFLGtCQUFHLEtBQUcsS0FBRyxHQUFFLE1BQUlGLE1BQUcsTUFBSSxLQUFHLE1BQUlBLE1BQUcsTUFBSSxFQUFFLFFBQU87QUFBRSxnQkFBRSxJQUFFLElBQUUsQ0FBQyxJQUFFLEtBQUcsS0FBRyxLQUFHLEtBQUcsSUFBRSxJQUFFO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxpQkFBTyxNQUFJLE1BQUksRUFBRSxJQUFFLENBQUMsSUFBRSxJQUFFLEtBQUcsS0FBRyxNQUFJLEtBQUcsSUFBRyxFQUFFLE9BQUssR0FBRTtBQUFBLFFBQUM7QUFBQSxNQUFDLEdBQUUsRUFBQyxtQkFBa0IsR0FBRSxDQUFDLEdBQUUsSUFBRyxDQUFDLFNBQVMsR0FBRSxHQUFFLEdBQUU7QUFBQztBQUFhLFVBQUUsVUFBUSxFQUFDLEdBQUUsbUJBQWtCLEdBQUUsY0FBYSxHQUFFLElBQUcsTUFBSyxjQUFhLE1BQUssZ0JBQWUsTUFBSyxjQUFhLE1BQUssdUJBQXNCLE1BQUssZ0JBQWUsTUFBSyx1QkFBc0I7QUFBQSxNQUFDLEdBQUUsQ0FBQyxDQUFDLEdBQUUsSUFBRyxDQUFDLFNBQVMsR0FBRSxHQUFFLEdBQUU7QUFBQztBQUFhLFlBQUksSUFBRSxFQUFFLGlCQUFpQixHQUFFLElBQUUsR0FBRSxJQUFFO0FBQUUsaUJBQVMsRUFBRUEsSUFBRTtBQUFDLG1CQUFRQyxLQUFFRCxHQUFFLFFBQU8sS0FBRyxFQUFFQyxLQUFHLENBQUFELEdBQUVDLEVBQUMsSUFBRTtBQUFBLFFBQUM7QUFBQyxZQUFJLElBQUUsR0FBRSxJQUFFLElBQUcsSUFBRSxLQUFJLElBQUUsSUFBRSxJQUFFLEdBQUUsSUFBRSxJQUFHLElBQUUsSUFBRyxJQUFFLElBQUUsSUFBRSxHQUFFLElBQUUsSUFBRyxJQUFFLElBQUcsSUFBRSxHQUFFLElBQUUsS0FBSSxJQUFFLElBQUcsSUFBRSxJQUFHLElBQUUsSUFBRyxJQUFFLENBQUMsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDLEdBQUUsSUFBRSxDQUFDLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxFQUFFLEdBQUUsSUFBRSxDQUFDLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUMsR0FBRSxJQUFFLENBQUMsSUFBRyxJQUFHLElBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLElBQUcsR0FBRSxJQUFHLEdBQUUsSUFBRyxHQUFFLElBQUcsR0FBRSxJQUFHLEdBQUUsRUFBRSxHQUFFLElBQUUsSUFBSSxNQUFNLEtBQUcsSUFBRSxFQUFFO0FBQUUsVUFBRSxDQUFDO0FBQUUsWUFBSSxJQUFFLElBQUksTUFBTSxJQUFFLENBQUM7QUFBRSxVQUFFLENBQUM7QUFBRSxZQUFJLElBQUUsSUFBSSxNQUFNLEdBQUc7QUFBRSxVQUFFLENBQUM7QUFBRSxZQUFJLElBQUUsSUFBSSxNQUFNLEdBQUc7QUFBRSxVQUFFLENBQUM7QUFBRSxZQUFJLElBQUUsSUFBSSxNQUFNLENBQUM7QUFBRSxVQUFFLENBQUM7QUFBRSxZQUFJLEdBQUUsR0FBRSxHQUFFLElBQUUsSUFBSSxNQUFNLENBQUM7QUFBRSxpQkFBUyxFQUFFRCxJQUFFQyxJQUFFQyxJQUFFRSxJQUFFQyxJQUFFO0FBQUMsZUFBSyxjQUFZTCxJQUFFLEtBQUssYUFBV0MsSUFBRSxLQUFLLGFBQVdDLElBQUUsS0FBSyxRQUFNRSxJQUFFLEtBQUssYUFBV0MsSUFBRSxLQUFLLFlBQVVMLE1BQUdBLEdBQUU7QUFBQSxRQUFNO0FBQUMsaUJBQVMsRUFBRUEsSUFBRUMsSUFBRTtBQUFDLGVBQUssV0FBU0QsSUFBRSxLQUFLLFdBQVMsR0FBRSxLQUFLLFlBQVVDO0FBQUEsUUFBQztBQUFDLGlCQUFTLEVBQUVELElBQUU7QUFBQyxpQkFBT0EsS0FBRSxNQUFJLEVBQUVBLEVBQUMsSUFBRSxFQUFFLE9BQUtBLE9BQUksRUFBRTtBQUFBLFFBQUM7QUFBQyxpQkFBUyxFQUFFQSxJQUFFQyxJQUFFO0FBQUMsVUFBQUQsR0FBRSxZQUFZQSxHQUFFLFNBQVMsSUFBRSxNQUFJQyxJQUFFRCxHQUFFLFlBQVlBLEdBQUUsU0FBUyxJQUFFQyxPQUFJLElBQUU7QUFBQSxRQUFHO0FBQUMsaUJBQVMsRUFBRUQsSUFBRUMsSUFBRUMsSUFBRTtBQUFDLFVBQUFGLEdB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QUFFLFFBQVEsSUFBRVUsS0FBRVIsSUFBRUYsR0FBRSxNQUFNRSxFQUFDLElBQUUsS0FBR0ksR0FBRSxJQUFFSixLQUFFLENBQUMsSUFBRTtBQUFFLGlCQUFLRixHQUFFLFdBQVMsSUFBRyxDQUFBTSxHQUFFLEtBQUdELEtBQUVMLEdBQUUsS0FBSyxFQUFFQSxHQUFFLFFBQVEsSUFBRVUsS0FBRSxJQUFFLEVBQUVBLEtBQUUsRUFBRSxJQUFFLEdBQUVWLEdBQUUsTUFBTUssRUFBQyxJQUFFLEdBQUVMLEdBQUUsV0FBVVEsT0FBSVIsR0FBRSxjQUFZTyxHQUFFLElBQUVGLEtBQUUsQ0FBQztBQUFHLGVBQUlKLEdBQUUsV0FBU1MsSUFBRVIsS0FBRUYsR0FBRSxZQUFVLEdBQUUsS0FBR0UsSUFBRUEsS0FBSSxHQUFFRixJQUFFTSxJQUFFSixFQUFDO0FBQUUsZUFBSUcsS0FBRUksSUFBRVAsS0FBRUYsR0FBRSxLQUFLLENBQUMsR0FBRUEsR0FBRSxLQUFLLENBQUMsSUFBRUEsR0FBRSxLQUFLQSxHQUFFLFVBQVUsR0FBRSxFQUFFQSxJQUFFTSxJQUFFLENBQUMsR0FBRUYsS0FBRUosR0FBRSxLQUFLLENBQUMsR0FBRUEsR0FBRSxLQUFLLEVBQUVBLEdBQUUsUUFBUSxJQUFFRSxJQUFFRixHQUFFLEtBQUssRUFBRUEsR0FBRSxRQUFRLElBQUVJLElBQUVFLEdBQUUsSUFBRUQsRUFBQyxJQUFFQyxHQUFFLElBQUVKLEVBQUMsSUFBRUksR0FBRSxJQUFFRixFQUFDLEdBQUVKLEdBQUUsTUFBTUssRUFBQyxLQUFHTCxHQUFFLE1BQU1FLEVBQUMsS0FBR0YsR0FBRSxNQUFNSSxFQUFDLElBQUVKLEdBQUUsTUFBTUUsRUFBQyxJQUFFRixHQUFFLE1BQU1JLEVBQUMsS0FBRyxHQUFFRSxHQUFFLElBQUVKLEtBQUUsQ0FBQyxJQUFFSSxHQUFFLElBQUVGLEtBQUUsQ0FBQyxJQUFFQyxJQUFFTCxHQUFFLEtBQUssQ0FBQyxJQUFFSyxNQUFJLEVBQUVMLElBQUVNLElBQUUsQ0FBQyxHQUFFLEtBQUdOLEdBQUUsV0FBVTtBQUFDLFVBQUFBLEdBQUUsS0FBSyxFQUFFQSxHQUFFLFFBQVEsSUFBRUEsR0FBRSxLQUFLLENBQUMsSUFBRSxTQUFTQSxJQUFFQyxJQUFFO0FBQUMsZ0JBQUlDLElBQUVFLElBQUVDLElBQUVDLElBQUVDLElBQUVDLElBQUVDLEtBQUVSLEdBQUUsVUFBU1MsS0FBRVQsR0FBRSxVQUFTVSxLQUFFVixHQUFFLFVBQVUsYUFBWVcsS0FBRVgsR0FBRSxVQUFVLFdBQVVFLEtBQUVGLEdBQUUsVUFBVSxZQUFXWSxLQUFFWixHQUFFLFVBQVUsWUFBV2EsS0FBRWIsR0FBRSxVQUFVLFlBQVdjLEtBQUU7QUFBRSxpQkFBSVQsS0FBRSxHQUFFQSxNQUFHLEdBQUVBLEtBQUksQ0FBQU4sR0FBRSxTQUFTTSxFQUFDLElBQUU7QUFBRSxpQkFBSUcsR0FBRSxJQUFFVCxHQUFFLEtBQUtBLEdBQUUsUUFBUSxJQUFFLENBQUMsSUFBRSxHQUFFRSxLQUFFRixHQUFFLFdBQVMsR0FBRUUsS0FBRSxHQUFFQSxLQUFJLENBQUFZLE1BQUdSLEtBQUVHLEdBQUUsSUFBRUEsR0FBRSxLQUFHTCxLQUFFSixHQUFFLEtBQUtFLEVBQUMsS0FBRyxDQUFDLElBQUUsQ0FBQyxJQUFFLE9BQUtJLEtBQUVRLElBQUVDLE9BQUtOLEdBQUUsSUFBRUwsS0FBRSxDQUFDLElBQUVFLElBQUVJLEtBQUVOLE9BQUlKLEdBQUUsU0FBU00sRUFBQyxLQUFJQyxLQUFFLEdBQUVNLE1BQUdULE9BQUlHLEtBQUVKLEdBQUVDLEtBQUVTLEVBQUMsSUFBR0wsS0FBRUMsR0FBRSxJQUFFTCxFQUFDLEdBQUVKLEdBQUUsV0FBU1EsTUFBR0YsS0FBRUMsS0FBR0ssT0FBSVosR0FBRSxjQUFZUSxNQUFHRyxHQUFFLElBQUVQLEtBQUUsQ0FBQyxJQUFFRztBQUFLLGdCQUFHLE1BQUlRLElBQUU7QUFBQyxpQkFBRTtBQUFDLHFCQUFJVCxLQUFFUSxLQUFFLEdBQUUsTUFBSWQsR0FBRSxTQUFTTSxFQUFDLElBQUcsQ0FBQUE7QUFBSSxnQkFBQU4sR0FBRSxTQUFTTSxFQUFDLEtBQUlOLEdBQUUsU0FBU00sS0FBRSxDQUFDLEtBQUcsR0FBRU4sR0FBRSxTQUFTYyxFQUFDLEtBQUlDLE1BQUc7QUFBQSxjQUFDLFNBQU8sSUFBRUE7QUFBRyxtQkFBSVQsS0FBRVEsSUFBRSxNQUFJUixJQUFFQSxLQUFJLE1BQUlGLEtBQUVKLEdBQUUsU0FBU00sRUFBQyxHQUFFLE1BQUlGLEtBQUcsQ0FBQU0sTUFBR0wsS0FBRUwsR0FBRSxLQUFLLEVBQUVFLEVBQUMsT0FBS08sR0FBRSxJQUFFSixLQUFFLENBQUMsTUFBSUMsT0FBSU4sR0FBRSxZQUFVTSxLQUFFRyxHQUFFLElBQUVKLEtBQUUsQ0FBQyxLQUFHSSxHQUFFLElBQUVKLEVBQUMsR0FBRUksR0FBRSxJQUFFSixLQUFFLENBQUMsSUFBRUMsS0FBR0Y7QUFBQSxZQUFJO0FBQUEsVUFBQyxHQUFFSixJQUFFQyxFQUFDLEdBQUUsRUFBRUssSUFBRUksSUFBRVYsR0FBRSxRQUFRO0FBQUEsUUFBQztBQUFDLGlCQUFTLEVBQUVBLElBQUVDLElBQUVDLElBQUU7QUFBQyxjQUFJRSxJQUFFQyxJQUFFQyxLQUFFLElBQUdDLEtBQUVOLEdBQUUsQ0FBQyxHQUFFTyxLQUFFLEdBQUVDLEtBQUUsR0FBRUMsS0FBRTtBQUFFLGVBQUksTUFBSUgsT0FBSUUsS0FBRSxLQUFJQyxLQUFFLElBQUdULEdBQUUsS0FBR0MsS0FBRSxLQUFHLENBQUMsSUFBRSxPQUFNRSxLQUFFLEdBQUVBLE1BQUdGLElBQUVFLEtBQUksQ0FBQUMsS0FBRUUsSUFBRUEsS0FBRU4sR0FBRSxLQUFHRyxLQUFFLEtBQUcsQ0FBQyxHQUFFLEVBQUVJLEtBQUVDLE1BQUdKLE9BQUlFLE9BQUlDLEtBQUVFLEtBQUVWLEdBQUUsUUFBUSxJQUFFSyxFQUFDLEtBQUdHLEtBQUUsTUFBSUgsTUFBR0EsT0FBSUMsTUFBR04sR0FBRSxRQUFRLElBQUVLLEVBQUMsS0FBSUwsR0FBRSxRQUFRLElBQUUsQ0FBQyxPQUFLUSxNQUFHLEtBQUdSLEdBQUUsUUFBUSxJQUFFLENBQUMsTUFBSUEsR0FBRSxRQUFRLElBQUUsQ0FBQyxLQUFJTSxLQUFFRCxJQUFFSyxNQUFHRixLQUFFLE9BQUtELE1BQUdFLEtBQUUsS0FBSSxLQUFHSixPQUFJRSxNQUFHRSxLQUFFLEdBQUUsTUFBSUEsS0FBRSxHQUFFO0FBQUEsUUFBRztBQUFDLGlCQUFTLEVBQUVULElBQUVDLElBQUVDLElBQUU7QUFBQyxjQUFJRSxJQUFFQyxJQUFFQyxLQUFFLElBQUdDLEtBQUVOLEdBQUUsQ0FBQyxHQUFFTyxLQUFFLEdBQUVDLEtBQUUsR0FBRUMsS0FBRTtBQUFFLGVBQUksTUFBSUgsT0FBSUUsS0FBRSxLQUFJQyxLQUFFLElBQUdOLEtBQUUsR0FBRUEsTUFBR0YsSUFBRUUsS0FBSSxLQUFHQyxLQUFFRSxJQUFFQSxLQUFFTixHQUFFLEtBQUdHLEtBQUUsS0FBRyxDQUFDLEdBQUUsRUFBRSxFQUFFSSxLQUFFQyxNQUFHSixPQUFJRSxLQUFHO0FBQUMsZ0JBQUdDLEtBQUVFLEdBQUUsUUFBSyxFQUFFVixJQUFFSyxJQUFFTCxHQUFFLE9BQU8sR0FBRSxLQUFHLEVBQUVRLEtBQUc7QUFBQSxnQkFBTSxPQUFJSCxNQUFHQSxPQUFJQyxPQUFJLEVBQUVOLElBQUVLLElBQUVMLEdBQUUsT0FBTyxHQUFFUSxPQUFLLEVBQUVSLElBQUUsR0FBRUEsR0FBRSxPQUFPLEdBQUUsRUFBRUEsSUFBRVEsS0FBRSxHQUFFLENBQUMsS0FBR0EsTUFBRyxNQUFJLEVBQUVSLElBQUUsR0FBRUEsR0FBRSxPQUFPLEdBQUUsRUFBRUEsSUFBRVEsS0FBRSxHQUFFLENBQUMsTUFBSSxFQUFFUixJQUFFLEdBQUVBLEdBQUUsT0FBTyxHQUFFLEVBQUVBLElBQUVRLEtBQUUsSUFBRyxDQUFDO0FBQUcsWUFBQUYsS0FBRUQsSUFBRUssTUFBR0YsS0FBRSxPQUFLRCxNQUFHRSxLQUFFLEtBQUksS0FBR0osT0FBSUUsTUFBR0UsS0FBRSxHQUFFLE1BQUlBLEtBQUUsR0FBRTtBQUFBLFVBQUU7QUFBQSxRQUFDO0FBQUMsVUFBRSxDQUFDO0FBQUUsWUFBSSxJQUFFO0FBQUcsaUJBQVMsRUFBRVQsSUFBRUMsSUFBRUMsSUFBRUUsSUFBRTtBQUFDLFlBQUVKLEtBQUcsS0FBRyxNQUFJSSxLQUFFLElBQUUsSUFBRyxDQUFDLElBQUUsU0FBU0osSUFBRUMsSUFBRUMsSUFBRUUsSUFBRTtBQUFDLGNBQUVKLEVBQUMsR0FBRUksT0FBSSxFQUFFSixJQUFFRSxFQUFDLEdBQUUsRUFBRUYsSUFBRSxDQUFDRSxFQUFDLElBQUcsRUFBRSxTQUFTRixHQUFFLGFBQVlBLEdBQUUsUUFBT0MsSUFBRUMsSUFBRUYsR0FBRSxPQUFPLEdBQUVBLEdBQUUsV0FBU0U7QUFBQSxVQUFDLEdBQUVGLElBQUVDLElBQUVDLElBQUUsSUFBRTtBQUFBLFFBQUM7QUFBQyxVQUFFLFdBQVMsU0FBU0YsSUFBRTtBQUFDLGlCQUFJLFdBQVU7QUFBQyxnQkFBSUEsSUFBRUMsSUFBRUMsSUFBRUUsSUFBRUMsSUFBRUMsS0FBRSxJQUFJLE1BQU0sSUFBRSxDQUFDO0FBQUUsaUJBQUlGLEtBQUVGLEtBQUUsR0FBRUUsS0FBRSxJQUFFLEdBQUVBLEtBQUksTUFBSSxFQUFFQSxFQUFDLElBQUVGLElBQUVGLEtBQUUsR0FBRUEsS0FBRSxLQUFHLEVBQUVJLEVBQUMsR0FBRUosS0FBSSxHQUFFRSxJQUFHLElBQUVFO0FBQUUsaUJBQUksRUFBRUYsS0FBRSxDQUFDLElBQUVFLElBQUVBLEtBQUVDLEtBQUUsR0FBRUQsS0FBRSxJQUFHQSxLQUFJLE1BQUksRUFBRUEsRUFBQyxJQUFFQyxJQUFFTCxLQUFFLEdBQUVBLEtBQUUsS0FBRyxFQUFFSSxFQUFDLEdBQUVKLEtBQUksR0FBRUssSUFBRyxJQUFFRDtBQUFFLGlCQUFJQyxPQUFJLEdBQUVELEtBQUUsR0FBRUEsS0FBSSxNQUFJLEVBQUVBLEVBQUMsSUFBRUMsTUFBRyxHQUFFTCxLQUFFLEdBQUVBLEtBQUUsS0FBRyxFQUFFSSxFQUFDLElBQUUsR0FBRUosS0FBSSxHQUFFLE1BQUlLLElBQUcsSUFBRUQ7QUFBRSxpQkFBSUgsS0FBRSxHQUFFQSxNQUFHLEdBQUVBLEtBQUksQ0FBQUssR0FBRUwsRUFBQyxJQUFFO0FBQUUsaUJBQUlELEtBQUUsR0FBRUEsTUFBRyxNQUFLLEdBQUUsSUFBRUEsS0FBRSxDQUFDLElBQUUsR0FBRUEsTUFBSU0sR0FBRSxDQUFDO0FBQUksbUJBQUtOLE1BQUcsTUFBSyxHQUFFLElBQUVBLEtBQUUsQ0FBQyxJQUFFLEdBQUVBLE1BQUlNLEdBQUUsQ0FBQztBQUFJLG1CQUFLTixNQUFHLE1BQUssR0FBRSxJQUFFQSxLQUFFLENBQUMsSUFBRSxHQUFFQSxNQUFJTSxHQUFFLENBQUM7QUFBSSxtQkFBS04sTUFBRyxNQUFLLEdBQUUsSUFBRUEsS0FBRSxDQUFDLElBQUUsR0FBRUEsTUFBSU0sR0FBRSxDQUFDO0FBQUksaUJBQUksRUFBRSxHQUFFLElBQUUsR0FBRUEsRUFBQyxHQUFFTixLQUFFLEdBQUVBLEtBQUUsR0FBRUEsS0FBSSxHQUFFLElBQUVBLEtBQUUsQ0FBQyxJQUFFLEdBQUUsRUFBRSxJQUFFQSxFQUFDLElBQUUsRUFBRUEsSUFBRSxDQUFDO0FBQUUsZ0JBQUUsSUFBSSxFQUFFLEdBQUUsR0FBRSxJQUFFLEdBQUUsR0FBRSxDQUFDLEdBQUUsSUFBRSxJQUFJLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDLEdBQUUsSUFBRSxJQUFJLEVBQUUsSUFBSSxNQUFNLENBQUMsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsVUFBQyxHQUFFLEdBQUUsSUFBRSxPQUFJQSxHQUFFLFNBQU8sSUFBSSxFQUFFQSxHQUFFLFdBQVUsQ0FBQyxHQUFFQSxHQUFFLFNBQU8sSUFBSSxFQUFFQSxHQUFFLFdBQVUsQ0FBQyxHQUFFQSxHQUFFLFVBQVEsSUFBSSxFQUFFQSxHQUFFLFNBQVEsQ0FBQyxHQUFFQSxHQUFFLFNBQU8sR0FBRUEsR0FBRSxXQUFTLEdBQUUsRUFBRUEsRUFBQztBQUFBLFFBQUMsR0FBRSxFQUFFLG1CQUFpQixHQUFFLEVBQUUsa0JBQWdCLFNBQVNBLElBQUVDLElBQUVDLElBQUVFLElBQUU7QUFBQyxjQUFJQyxJQUFFQyxJQUFFQyxLQUFFO0FBQUUsY0FBRVAsR0FBRSxTQUFPLE1BQUlBLEdBQUUsS0FBSyxjQUFZQSxHQUFFLEtBQUssYUFBVSxTQUFTQSxJQUFFO0FBQUMsZ0JBQUlDLElBQUVDLEtBQUU7QUFBVyxpQkFBSUQsS0FBRSxHQUFFQSxNQUFHLElBQUdBLE1BQUlDLFFBQUssRUFBRSxLQUFHLElBQUVBLE1BQUcsTUFBSUYsR0FBRSxVQUFVLElBQUVDLEVBQUMsRUFBRSxRQUFPO0FBQUUsZ0JBQUcsTUFBSUQsR0FBRSxVQUFVLEVBQUUsS0FBRyxNQUFJQSxHQUFFLFVBQVUsRUFBRSxLQUFHLE1BQUlBLEdBQUUsVUFBVSxFQUFFLEVBQUUsUUFBTztBQUFFLGlCQUFJQyxLQUFFLElBQUdBLEtBQUUsR0FBRUEsS0FBSSxLQUFHLE1BQUlELEdBQUUsVUFBVSxJQUFFQyxFQUFDLEVBQUUsUUFBTztBQUFFLG1CQUFPO0FBQUEsVUFBQyxHQUFFRCxFQUFDLElBQUcsRUFBRUEsSUFBRUEsR0FBRSxNQUFNLEdBQUUsRUFBRUEsSUFBRUEsR0FBRSxNQUFNLEdBQUVPLE1BQUUsU0FBU1AsSUFBRTtBQUFDLGdCQUFJQztBQUFFLGlCQUFJLEVBQUVELElBQUVBLEdBQUUsV0FBVUEsR0FBRSxPQUFPLFFBQVEsR0FBRSxFQUFFQSxJQUFFQSxHQUFFLFdBQVVBLEdBQUUsT0FBTyxRQUFRLEdBQUUsRUFBRUEsSUFBRUEsR0FBRSxPQUFPLEdBQUVDLEtBQUUsSUFBRSxHQUFFLEtBQUdBLE1BQUcsTUFBSUQsR0FBRSxRQUFRLElBQUUsRUFBRUMsRUFBQyxJQUFFLENBQUMsR0FBRUEsS0FBSTtBQUFDLG1CQUFPRCxHQUFFLFdBQVMsS0FBR0MsS0FBRSxLQUFHLElBQUUsSUFBRSxHQUFFQTtBQUFBLFVBQUMsR0FBRUQsRUFBQyxHQUFFSyxLQUFFTCxHQUFFLFVBQVEsSUFBRSxNQUFJLElBQUdNLEtBQUVOLEdBQUUsYUFBVyxJQUFFLE1BQUksTUFBSUssT0FBSUEsS0FBRUMsT0FBSUQsS0FBRUMsS0FBRUosS0FBRSxHQUFFQSxLQUFF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QU0sY0FBTixjQUEwQix1QkFBTTtBQUFBLEVBQzlCLFlBQVksS0FBMkIsT0FBcUMsU0FBaUU7QUFBRSxVQUFNLEdBQUc7QUFBakg7QUFBcUM7QUFBQSxFQUErRTtBQUFBLEVBQzNKLFNBQWU7QUFDYixVQUFNLEVBQUUsVUFBVSxJQUFJO0FBQ3RCLFVBQU0sUUFBUSxLQUFLLE1BQU0sU0FBUyxDQUFDO0FBQUcsVUFBTSxPQUFPLEtBQUssTUFBTSxTQUFTLEdBQUcsRUFBRTtBQUM1RSxjQUFVLFNBQVMsTUFBTSxFQUFFLE1BQU0sV0FBVyxLQUFLLE1BQU0sU0FBUyxNQUFNLG1CQUFtQixLQUFLLE1BQU0sU0FBUyxXQUFXLElBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQztBQUN4SSxjQUFVLFNBQVMsS0FBSyxFQUFFLE1BQU0sR0FBRyxNQUFNLGNBQWMsV0FBTSxLQUFLLGNBQWMsR0FBRyxDQUFDO0FBQ3BGLFVBQU0sT0FBTyxVQUFVLFNBQVMsSUFBSTtBQUNwQyxlQUFXLFdBQVcsS0FBSyxNQUFNLFNBQVUsTUFBSyxTQUFTLE1BQU0sRUFBRSxNQUFNLEdBQUcsUUFBUSxjQUFjLFdBQU0sUUFBUSxhQUFhLE9BQU8sR0FBRyxDQUFDO0FBQ3RJLFVBQU0sU0FBUyxVQUFVLFNBQVMsR0FBRztBQUNyQyxRQUFJLHlCQUFRLFNBQVMsRUFDbEIsVUFBVSxDQUFDLFdBQVcsT0FBTyxjQUFjLFFBQVEsRUFBRSxRQUFRLE1BQU0sS0FBSyxNQUFNLENBQUMsQ0FBQyxFQUNoRixVQUFVLENBQUMsV0FBVyxPQUFPLE9BQU8sRUFBRSxjQUFjLFlBQVksRUFBRSxRQUFRLFlBQVk7QUFDckYsYUFBTyxZQUFZLElBQUk7QUFBRyxhQUFPLFFBQVEsdUJBQWtCO0FBQzNELFVBQUk7QUFBRSxjQUFNLEtBQUssUUFBUSxDQUFDLFNBQVMsT0FBTyxRQUFRLElBQUksQ0FBQztBQUFHLGFBQUssTUFBTTtBQUFBLE1BQUcsU0FDakUsT0FBTztBQUFFLGVBQU8sUUFBUSxrQkFBa0IsUUFBUSxLQUFLLENBQUMsRUFBRTtBQUFHLGVBQU8sWUFBWSxLQUFLO0FBQUEsTUFBRztBQUFBLElBQ2pHLENBQUMsQ0FBQztBQUFBLEVBQ047QUFBQSxFQUNBLFVBQWdCO0FBQUUsU0FBSyxVQUFVLE1BQU07QUFBQSxFQUFHO0FBQzVDO0FBQ0EsU0FBUyxRQUFRLE9BQXdCO0FBQUUsU0FBTyxpQkFBaUIsUUFBUSxNQUFNLFVBQVU7QUFBaUI7IiwKICAibmFtZXMiOiBbIm1vZHVsZSIsICJlIiwgInQiLCAiciIsICJjIiwgIm4iLCAiaSIsICJzIiwgImEiLCAibyIsICJoIiwgInUiLCAibCIsICJmIiwgImQiLCAicCIsICJtIiwgImltcG9ydF9vYnNpZGlhbiIsICJKU1ppcCJdCn0K
