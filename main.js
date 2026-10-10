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
function normalizePath(value) {
  return value.normalize("NFC").replace(/\\/g, "/").replace(/\/+/g, "/").replace(/^\.\//, "");
}
function assertManagedPath(value) {
  const path = normalizePath(value);
  if (!path || path.includes("\0") || path.startsWith("/") || /^[A-Za-z]:/.test(path)) throw new Error(`Unsafe path: ${value}`);
  const segments = path.split("/");
  if (segments.some((segment) => !segment || segment === "." || segment === ".." || /[<>:"|?*]/.test(segment) || RESERVED.test(segment))) {
    throw new Error(`Unsafe path: ${value}`);
  }
  const topLevel = segments[0];
  if (MANAGED_ROOTS.includes(topLevel)) {
    return path;
  }
  if (topLevel === ".obsidian" && segments.length > 1 || !path.includes("/") && !path.startsWith(".")) return path;
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
  if ("collection" in input) throw new Error("The lowercase collection field was renamed to tbpedia. Keep uppercase Collection for the version.");
  for (const forbidden of ["signature", "payload", "collectionKey", "sha256", "size", "downloadUrl", "url"]) {
    if (forbidden in input) throw new Error(`Manifest contains unsupported field: ${forbidden}.`);
  }
  if (input.schemaVersion !== 2 || input.product !== "Tbpedia-Distribute" || input.plugin !== "tbpedia-update") throw new Error("This is not a supported incremental Tbpedia release manifest.");
  if (input.channel !== "stable") throw new Error("Only the stable release channel is supported.");
  if (typeof input.Collection !== "string" || !/^V[1-9]\d*$/.test(input.Collection)) throw new Error("Collection must be a version such as V1.");
  for (const field of REQUIRED_STRING_FIELDS) if (typeof input[field] !== "string" || !input[field].trim()) throw new Error(`Manifest field ${field} is invalid.`);
  if (!isRecord(input.tbpedia) || !isTbpediaPart(input.tbpedia.language, "code") || !isTbpediaPart(input.tbpedia.series, "id") || !isTbpediaPart(input.tbpedia.edition, "id")) throw new Error("tbpedia identity is invalid.");
  const tbpedia = input.tbpedia;
  const releaseKey = [tbpedia.language.code, tbpedia.series.id, tbpedia.edition.id].join("-").toLowerCase();
  if (!Array.isArray(input.managedRoots) || !sameSet(input.managedRoots, [...MANAGED_ROOTS])) throw new Error("managedRoots does not match the approved boundary.");
  if (!Array.isArray(input.releases) || input.releases.length === 0) throw new Error("releases must be a non-empty array.");
  const existingPaths = /* @__PURE__ */ new Set();
  const releases = input.releases.map((entry) => {
    const release = parseRelease(entry, releaseKey, existingPaths);
    for (const file of release.files) {
      if (file.change === "-") existingPaths.delete(file.path);
      else existingPaths.add(file.path);
    }
    return release;
  });
  const ids = /* @__PURE__ */ new Set();
  for (let index = 0; index < releases.length; index += 1) {
    const release = releases[index];
    if (ids.has(release.releaseId)) throw new Error(`Duplicate releaseId: ${release.releaseId}.`);
    for (const dependency of release.dependsOn ?? []) {
      if (!ids.has(dependency)) throw new Error(`Release ${release.releaseId} depends on ${dependency}, which must be an earlier release in this manifest.`);
    }
    ids.add(release.releaseId);
    if (index > 0 && compareRelease(releases[index - 1], release) >= 0) throw new Error("releases must be in strictly increasing version and publication order.");
  }
  if (releases.some((release) => release.dependsOn !== void 0) && compareVersions(input.minimumPluginVersion, "1.2.0") < 0) {
    throw new Error("Manifests using dependsOn must require minimumPluginVersion 1.2.0 or newer.");
  }
  return { ...input, releases };
}
function parseRelease(input, expectedKey, existingPaths) {
  if (!isRecord(input)) throw new Error("Each release must be an object.");
  for (const field of ["releaseVersion", "releaseId", "publishedAt", "filename"]) if (typeof input[field] !== "string" || !input[field].trim()) throw new Error(`Release field ${field} is invalid.`);
  const version = parseReleaseVersion(input.releaseVersion);
  if (!version || version.key !== expectedKey) throw new Error(`releaseVersion must have the format ${expectedKey}-YYYY.M.D.`);
  const releaseId = parseReleaseId(input.releaseId);
  if (!releaseId || releaseId.key !== expectedKey) throw new Error(`releaseId must have the format ${expectedKey}-YYYY-M-D.sequence, for example ${expectedKey}-2026-10-1.1.`);
  if (releaseId.year !== version.year || releaseId.month !== version.month || releaseId.day !== version.day) throw new Error("releaseId date must match releaseVersion.");
  if (Number.isNaN(Date.parse(input.publishedAt))) throw new Error("publishedAt must be ISO-8601.");
  if (!Array.isArray(input.files) || !Array.isArray(input.deletions)) throw new Error("files and deletions must be arrays.");
  if (input.dependsOn !== void 0 && (!Array.isArray(input.dependsOn) || input.dependsOn.some((id) => typeof id !== "string" || !id.trim()) || new Set(input.dependsOn).size !== input.dependsOn.length)) {
    throw new Error(`Release ${input.releaseId} dependsOn must be an array of unique release IDs.`);
  }
  const files = input.files.map((entry) => {
    if (!isRecord(entry) || typeof entry.path !== "string") throw new Error("Each file entry needs a path.");
    const path = assertManagedPath(entry.path);
    const change = entry.change ?? (existingPaths.has(path) ? "~" : "+");
    if (change !== "+" && change !== "-" && change !== "~") throw new Error("File change must be +, -, or ~.");
    return { path, change };
  });
  const deletions = input.deletions.map((path) => {
    if (typeof path !== "string") throw new Error("Each deletion must be a path.");
    return assertManagedPath(path);
  });
  for (const path of deletions) {
    const file = files.find((entry) => entry.path === path);
    if (file && file.change !== "-") throw new Error("A deletion conflicts with a file write.");
    if (!file) files.push({ path, change: "-" });
  }
  const allPaths = files.map((file) => file.path);
  if (new Set(allPaths).size !== allPaths.length) throw new Error(`Release ${input.releaseId} contains duplicate or conflicting paths.`);
  if (!isRecord(input.releaseNotes) || typeof input.releaseNotes.summary !== "string" || !["added", "updated", "removed"].every((key) => typeof input.releaseNotes[key] === "number" && input.releaseNotes[key] >= 0)) throw new Error("releaseNotes is invalid.");
  return { releaseVersion: input.releaseVersion, releaseId: input.releaseId, publishedAt: input.publishedAt, filename: input.filename, ...input.dependsOn !== void 0 ? { dependsOn: input.dependsOn } : {}, files, deletions: files.filter((file) => file.change === "-").map((file) => file.path), releaseNotes: input.releaseNotes };
}
function compareVersions(a, b) {
  const parse = (value) => value.replace(/^v/, "").split(/[.+-]/).slice(0, 3).map((part) => Number.parseInt(part, 10) || 0);
  const left = parse(a);
  const right = parse(b);
  for (let index = 0; index < 3; index += 1) if (left[index] !== right[index]) return left[index] - right[index];
  return 0;
}
function compareReleaseVersions(a, b) {
  const left = parseReleaseVersion(a);
  const right = parseReleaseVersion(b);
  if (!left || !right) return compareVersions(a, b);
  return compareDates(left, right);
}
function compareRelease(a, b) {
  const version = compareReleaseVersions(a.releaseVersion, b.releaseVersion);
  if (version) return version;
  const sequence = parseReleaseId(a.releaseId).sequence - parseReleaseId(b.releaseId).sequence;
  return sequence || Date.parse(a.publishedAt) - Date.parse(b.publishedAt);
}
function parseReleaseVersion(value) {
  const match = /^(?:([a-z0-9]+(?:-[a-z0-9]+)*)-)?(\d{4})\.(\d{1,2})\.(\d{1,2})$/.exec(value);
  return match && validDate(Number(match[2]), Number(match[3]), Number(match[4])) ? { key: match[1], year: Number(match[2]), month: Number(match[3]), day: Number(match[4]) } : void 0;
}
function parseReleaseId(value) {
  const match = /^(?:([a-z0-9]+(?:-[a-z0-9]+)*)-)?(\d{4})-(\d{1,2})-(\d{1,2})\.(\d+)$/.exec(value);
  if (!match) return void 0;
  const year = Number(match[2]);
  const month = Number(match[3]);
  const day = Number(match[4]);
  const sequence = Number(match[5]);
  return validDate(year, month, day) && Number.isSafeInteger(sequence) && sequence >= 1 ? { key: match[1], year, month, day, sequence } : void 0;
}
function compareDates(a, b) {
  return a.year - b.year || a.month - b.month || a.day - b.day;
}
function validDate(year, month, day) {
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}
function isTbpediaPart(value, identity) {
  return isRecord(value) && typeof value[identity] === "string" && value[identity].trim().length > 0;
}
function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function sameSet(values, expected) {
  return values.length === expected.length && new Set(values).size === values.length && values.every((value) => typeof value === "string" && expected.includes(value));
}

// src/ownership.ts
function migrateOwnedFiles(value, installed, manifest) {
  const source = Array.isArray(value) ? { legacy: value } : value;
  const groups = {};
  for (const [id, entries] of Object.entries(source)) {
    groups[id] = entries.map((entry) => typeof entry === "string" ? { path: entry, change: "+" } : { ...entry });
  }
  if (manifest) {
    for (const release of manifest.releases) {
      if (!installed.appliedReleaseIds.includes(release.releaseId) && installed.releaseId !== release.releaseId) continue;
      const known = new Set(release.files.map((file) => file.path));
      groups[release.releaseId] = [...release.files.map((file) => ({ ...file })), ...(groups[release.releaseId] ?? []).filter((file) => !known.has(file.path))];
      if (groups.legacy) groups.legacy = groups.legacy.filter((file) => !known.has(file.path));
    }
    if (groups.legacy?.length === 0) delete groups.legacy;
  }
  return groups;
}
function currentOwnedPaths(installed) {
  const owned = /* @__PURE__ */ new Set();
  const order = [.../* @__PURE__ */ new Set([...Object.keys(installed.ownedFiles).filter((id) => !installed.appliedReleaseIds.includes(id)), ...installed.appliedReleaseIds])];
  for (const id of order) {
    for (const file of installed.ownedFiles[id] ?? []) {
      if (file.change === "-") owned.delete(file.path);
      else owned.add(file.path);
    }
  }
  return owned;
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
  manifestCache;
  manifestRequest;
  async check() {
    const manifest = await this.getReleaseManifest(true);
    this.assertCompatible(manifest);
    const data = this.getData();
    await this.saveData({
      ...data,
      seriesId: manifest.tbpedia.series.id,
      editionId: manifest.tbpedia.edition.id,
      installed: { ...data.installed, ownedFiles: migrateOwnedFiles(data.installed.ownedFiles, data.installed, manifest) }
    });
    const releases = this.missingReleases(manifest);
    return releases.length ? { manifest, releases } : null;
  }
  async getReleaseManifest(forceRefresh = false) {
    const language = this.getData().languageCode;
    if (!language) throw new Error("This vault\u2019s Tbpedia collection language is missing. Configure languageCode in the plugin\u2019s data.json first.");
    const edition = this.getData().editionId;
    const data = this.getData();
    const key = JSON.stringify([language, data.seriesId, edition, data.tbpedia]);
    if (this.manifestRequest?.key === key) return this.manifestRequest.promise;
    if (!forceRefresh && this.manifestCache?.key === key && Date.now() - this.manifestCache.fetchedAt < 6e4) {
      return this.manifestCache.value;
    }
    const promise = this.fetchManifest(language, data.seriesId, edition, data.tbpedia).then((manifest2) => {
      this.assertSelectedCollection(manifest2);
      this.manifestCache = { key, value: manifest2, fetchedAt: Date.now() };
      return manifest2;
    });
    this.manifestRequest = { key, promise };
    let manifest;
    try {
      manifest = await promise;
    } finally {
      if (this.manifestRequest?.promise === promise) this.manifestRequest = void 0;
    }
    this.assertSelectedCollection(manifest);
    return manifest;
  }
  isReleaseInstalled(release, manifest) {
    return this.installedReleaseIds(manifest).has(release.releaseId);
  }
  getSelectedBatch(manifest, selectedIds) {
    const installed = this.installedReleaseIds(manifest);
    const included = /* @__PURE__ */ new Set();
    const visit = (id) => {
      if (installed.has(id) || included.has(id)) return;
      const index = manifest.releases.findIndex((release2) => release2.releaseId === id);
      if (index < 0) throw new Error(`Unknown release dependency: ${id}.`);
      const release = manifest.releases[index];
      included.add(id);
      for (const dependency of release.dependsOn ?? manifest.releases.slice(0, index).map((entry) => entry.releaseId)) visit(dependency);
    };
    for (const id of selectedIds) visit(id);
    const releases = manifest.releases.filter((release) => included.has(release.releaseId));
    if (!releases.length) throw new Error("Select at least one pending release.");
    return { manifest, releases };
  }
  async install(batch, progress, confirmOverwrite) {
    this.assertSelectedCollection(batch.manifest);
    this.assertCompatible(batch.manifest);
    batch = this.getSelectedBatch(batch.manifest, new Set(batch.releases.map((release) => release.releaseId)));
    let overwriteAll = false;
    const approveOverwrite = async (path) => {
      if (overwriteAll) return "overwrite";
      const decision = await confirmOverwrite?.(path) ?? "cancel";
      if (decision === "overwrite-all") overwriteAll = true;
      return decision;
    };
    for (let index = 0; index < batch.releases.length; index += 1) {
      this.assertSelectedCollection(batch.manifest);
      const release = batch.releases[index];
      progress(`Release ${index + 1} of ${batch.releases.length}: ${release.releaseVersion}`);
      await this.installRelease(batch.manifest, release, progress, approveOverwrite);
    }
    new import_obsidian.Notice(`Installed ${batch.releases.length} Tbpedia release(s).`);
  }
  async installRelease(manifest, release, progress, confirmOverwrite) {
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
          await this.validateArchive(archive, manifest, release);
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
      await this.apply(plan, archive, progress, confirmOverwrite);
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
    const installed = this.installedReleaseIds(manifest);
    return manifest.releases.filter((release) => !installed.has(release.releaseId));
  }
  installedReleaseIds(manifest) {
    const installed = this.getData().installed;
    const ids = new Set(installed.appliedReleaseIds);
    if (installed.releaseId) ids.add(installed.releaseId);
    if (installed.trackingVersion === 2) return ids;
    const installedIndex = installed.releaseId ? manifest.releases.findIndex((release) => release.releaseId === installed.releaseId) : -1;
    if (installedIndex >= 0) {
      for (const release of manifest.releases.slice(0, installedIndex + 1)) ids.add(release.releaseId);
      return ids;
    }
    if (!installed.releaseVersion) return ids;
    const key = [manifest.tbpedia.language.code, manifest.tbpedia.series.id, manifest.tbpedia.edition.id].join("-").toLowerCase();
    if (!installed.releaseVersion.startsWith(`${key}-`) && !/^\d{4}\./.test(installed.releaseVersion)) {
      return ids;
    }
    for (const release of manifest.releases) if (compareReleaseVersions(release.releaseVersion, installed.releaseVersion) <= 0) ids.add(release.releaseId);
    return ids;
  }
  async fetchManifest(language, series, edition, collection) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(series)) throw new Error("The configured Tbpedia series ID is invalid.");
    if (edition !== "standard" && edition !== "advanced") throw new Error("Choose a supported Tbpedia edition in the plugin settings.");
    if (!/^V[1-9]\d*$/.test(collection)) throw new Error("The configured tbpedia version must be a version such as V1.");
    const url = `${MANIFEST_BASE_URL}/${language.toLowerCase()}/${series}/${edition}/${collection}/latest.json?check=${crypto.randomUUID()}`;
    const nativeRequest = () => withManifestTimeout(Promise.resolve((0, import_obsidian.requestUrl)({ url, method: "GET", headers: { "Cache-Control": "no-cache" }, throw: false })));
    let response;
    if (import_obsidian.Platform?.isMobile) {
      const controller = new AbortController();
      try {
        response = await withManifestTimeout((async () => {
          const result = await fetch(url, { signal: controller.signal });
          return { status: result.status, json: result.status === 200 ? await result.json() : null };
        })());
      } catch {
        controller.abort();
        response = await nativeRequest();
      } finally {
        controller.abort();
      }
    } else response = await nativeRequest();
    if (response.status !== 200) throw new Error(`Could not retrieve release metadata (HTTP ${response.status}).`);
    let json;
    try {
      json = response.json;
    } catch {
      throw new Error("Release metadata is not valid JSON.");
    }
    return parseAndValidateManifest(json);
  }
  assertSelectedCollection(manifest) {
    const data = this.getData();
    if (manifest.tbpedia.language.code !== data.languageCode || manifest.tbpedia.series.id !== data.seriesId || manifest.tbpedia.edition.id !== data.editionId || manifest.Collection !== data.tbpedia) {
      throw new Error("The release manifest does not match the selected language, series, edition, and Collection. Check for updates again after changing settings.");
    }
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
      language: manifest.tbpedia.language.code,
      series: manifest.tbpedia.series.id,
      edition: manifest.tbpedia.edition.id,
      device_type: import_obsidian.Platform.isMobile ? "mobile" : "desktop",
      os: navigator.platform,
      client_version: `${this.appVersion() ?? "unknown"}; plugin/${this.pluginVersion}`,
      user_agent: navigator.userAgent
    });
    if (typeof response.id !== "string" || typeof response.token !== "string") throw new Error("Update service returned an invalid transaction.");
    return { id: response.id, token: response.token };
  }
  async getSources(manifest, release, transaction) {
    const query = new URLSearchParams({ language: manifest.tbpedia.language.code, series: manifest.tbpedia.series.id, edition: manifest.tbpedia.edition.id, title: manifest.title, version: release.releaseVersion, filename: release.filename });
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
    if (import_obsidian.Platform?.isMobile) {
      const response2 = await (0, import_obsidian.requestUrl)({
        url: `${WORKER_URL}/updates/package`,
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeaders(transaction) },
        body: JSON.stringify({ sourceId: source.sourceId, filename }),
        throw: false
      });
      if (response2.status !== 200) throw new Error(`Download failed from ${source.name} (HTTP ${response2.status}).`);
      const archive2 = response2.arrayBuffer;
      if (archive2.byteLength > MAX_ARCHIVE_BYTES) throw new Error("Release archive exceeds the configured size limit.");
      const declaredLength2 = Number(response2.headers["content-length"] ?? response2.headers["Content-Length"] ?? 0);
      if (declaredLength2 > 0 && archive2.byteLength !== declaredLength2) throw new Error(`Incomplete ZIP from ${source.name}: received ${archive2.byteLength} of ${declaredLength2} bytes.`);
      return archive2;
    }
    const response = await fetch(`${WORKER_URL}/updates/package`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeaders(transaction) },
      body: JSON.stringify({ sourceId: source.sourceId, filename })
    });
    if (!response.ok || !response.body) throw new Error(`Download failed from ${source.name} (HTTP ${response.status}).`);
    const declaredLength = Number(response.headers.get("Content-Length") ?? 0);
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
    if (declaredLength > 0 && total !== declaredLength) throw new Error(`Incomplete ZIP from ${source.name}: received ${total} of ${declaredLength} bytes.`);
    return archive.buffer;
  }
  async validateArchive(archive, manifest, release) {
    let zip;
    try {
      zip = await import_jszip.default.loadAsync(archive, { createFolders: false, checkCRC32: false });
    } catch {
      throw new Error(`Release ZIP is incomplete or corrupt (${archive.byteLength} bytes received). Retry the download or check the configured source.`);
    }
    const expected = new Set(release.files.filter((file) => file.change !== "-").map((file) => file.path));
    const actual = [];
    let totalUncompressed = 0;
    for (const entry of Object.values(zip.files)) {
      const entryName = entry.dir ? entry.name.replace(/\/$/, "") : entry.name;
      if (entryName && !(entry.dir && entryName === ".obsidian")) assertManagedPath(entryName);
      if (entry.dir) continue;
      if (actual.length >= MAX_FILES) throw new Error("Release archive has too many files.");
      const path = assertManagedPath(entry.name);
      actual.push(path);
      const size = zipEntrySize(entry);
      if (size === void 0) throw new Error("Release archive has an entry with no size metadata.");
      totalUncompressed += size;
      if (totalUncompressed > MAX_UNCOMPRESSED_BYTES) throw new Error("Release archive exceeds the configured extracted-size limit.");
    }
    if (new Set(actual).size !== actual.length) throw new Error("Release archive contains colliding paths.");
    ensureNoPathConflicts(actual);
    const actualPaths = new Set(actual);
    const missing = [...expected].filter((path) => !actualPaths.has(path));
    const unexpected = actual.filter((path) => !expected.has(path));
    if (missing.length || unexpected.length) {
      const describe = (paths) => `${paths.slice(0, 5).join(", ")}${paths.length > 5 ? ` (and ${paths.length - 5} more)` : ""}`;
      const details = [missing.length ? `Missing files: ${describe(missing)}.` : "", unexpected.length ? `Unexpected files: ${describe(unexpected)}.` : ""].filter(Boolean).join(" ");
      throw new Error(`Release archive does not exactly match the manifest inventory for ${release.releaseId} (${release.filename}). ${details}`);
    }
    return { manifest, release, writes: actual, deletions: release.deletions };
  }
  async apply(plan, archive, progress, confirmOverwrite) {
    const adapter = this.app.vault.adapter;
    const previous = { ...this.getData().installed, appliedReleaseIds: [...this.installedReleaseIds(plan.manifest)] };
    const owned = currentOwnedPaths(previous);
    const preserved = /* @__PURE__ */ new Set();
    for (const path of [...plan.writes, ...plan.deletions]) {
      if (path.split("/").at(-1)?.toLowerCase() === "data.json" && await adapter.exists(path)) {
        preserved.add(path);
        progress(`Preserving existing ${path}`);
      }
    }
    const writes = plan.writes.filter((path) => !preserved.has(path));
    const deletionCandidates = [...new Set(plan.deletions)].filter((path) => !preserved.has(path));
    const deletions = [];
    for (const path of writes) {
      await assertNoReparsePoints(this.app, path);
      if (await adapter.exists(path)) {
        if ((await adapter.stat(path))?.type === "folder") throw new Error(`Refusing to replace a local folder: ${path}`);
        if (!owned.has(path)) {
          progress(`Waiting for overwrite approval: ${path}`);
          if (await confirmOverwrite(path) === "cancel") throw new Error("Update cancelled. No files in this release were changed; earlier completed releases remain installed.");
        }
      }
    }
    for (const path of deletionCandidates) {
      await assertNoReparsePoints(this.app, path);
      const managedPath = assertManagedPath(path);
      const exists = await adapter.exists(managedPath);
      if (!exists) {
        progress(`Information: skipping deletion; file is already absent: ${managedPath}`);
        continue;
      }
      if ((await adapter.stat(managedPath))?.type === "folder") {
        throw new Error(`Refusing to delete a local folder: ${managedPath}`);
      }
      const isUntrackedCollectionNote = exists && managedPath.toLowerCase().endsWith(".md") && MANAGED_ROOTS.includes(managedPath.split("/")[0]);
      if (!owned.has(path) && !isUntrackedCollectionNote) {
        throw new Error(`Refusing to delete a file not owned by the prior release: ${path}`);
      }
      deletions.push(managedPath);
    }
    const transactionDir = `${STAGING_DIR}/${crypto.randomUUID()}`;
    const backupDir = `${transactionDir}/backup`;
    const journalPath = `${transactionDir}/transaction.json`;
    await mkdirp(adapter, backupDir);
    const targets = [.../* @__PURE__ */ new Set([...writes, ...deletions])];
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
      for (const path of writes) {
        progress(`Writing ${path}\u2026`);
        await mkdirp(adapter, parent(path));
        const entry = zip.file(path);
        if (!entry) throw new Error(`Archive entry disappeared: ${path}`);
        await writeBinary(adapter, path, await entry.async("uint8array"));
      }
      const nextOwned = { ...previous.ownedFiles, [plan.release.releaseId]: plan.release.files.filter((file) => !preserved.has(file.path)).map((file) => ({ ...file })) };
      await this.saveData({ ...this.getData(), installed: {
        trackingVersion: 2,
        releaseVersion: plan.release.releaseVersion,
        releaseId: plan.release.releaseId,
        appliedReleaseIds: [.../* @__PURE__ */ new Set([...previous.appliedReleaseIds ?? [], plan.release.releaseId])],
        ownedFiles: nextOwned
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
    if (import_obsidian.Platform?.isMobile) {
      const response2 = await withManifestTimeout(Promise.resolve((0, import_obsidian.requestUrl)({
        url: `${WORKER_URL}${path}`,
        method,
        headers: { ...body ? { "Content-Type": "application/json" } : {}, ...transaction ? authHeaders(transaction) : {} },
        body: body ? JSON.stringify(body) : void 0,
        throw: false
      })));
      let json2;
      try {
        json2 = response2.json;
      } catch {
        throw new Error(`Update service returned invalid JSON for ${path}.`);
      }
      if (response2.status < 200 || response2.status >= 300) throw new Error(typeof json2.error === "string" ? json2.error : `Update service request failed (HTTP ${response2.status}).`);
      return json2;
    }
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
async function withManifestTimeout(request) {
  let timer;
  try {
    return await Promise.race([request, new Promise((_, reject) => {
      timer = setTimeout(() => reject(new Error("GitHub release request timed out. Check your connection and tap Refresh to retry.")), 12e3);
    })]);
  } finally {
    if (timer !== void 0) clearTimeout(timer);
  }
}

// src/base-release.ts
function initializeBaseRelease(data) {
  if (data.baseRelease) return data.baseRelease;
  const legacy = data.installed.appliedReleaseIds.map((id) => ({ id, match: /^(\d{4})-(\d{1,2})-(\d{1,2})\.(\d+)$/.exec(id) })).filter((entry) => entry.match !== null).sort((a, b) => {
    for (let i = 1; i <= 4; i++) {
      const difference = Number(a.match[i]) - Number(b.match[i]);
      if (difference) return difference;
    }
    return 0;
  })[0];
  if (legacy) return { releaseVersion: `${legacy.match[1]}.${Number(legacy.match[2])}.${Number(legacy.match[3])}`, releaseId: legacy.id };
  if (data.installed.trackingVersion !== 2 && Object.keys(data.installed.ownedFiles).length === 0) {
    return { releaseVersion: data.installed.releaseVersion, releaseId: data.installed.releaseId };
  }
  return {};
}

// src/plugin-data.ts
function initializePluginData(saved) {
  const { Collection: legacyVersion, ...existing } = saved ?? {};
  const data = {
    languageCode: "",
    seriesId: "",
    editionId: "",
    tbpedia: "V1",
    checkForUpdatesOnStartup: true,
    ...existing,
    installed: { ownedFiles: {}, appliedReleaseIds: [], ...existing.installed }
  };
  data.tbpedia = existing.tbpedia ?? legacyVersion ?? "V1";
  data.installed.ownedFiles = migrateOwnedFiles(data.installed.ownedFiles, data.installed);
  data.baseRelease = saved == null || Object.keys(saved).length === 0 ? { releaseVersion: "2026.9.30", releaseId: "2026-9-30.1" } : initializeBaseRelease(data);
  const { languageCode, seriesId, editionId, tbpedia, baseRelease, checkForUpdatesOnStartup, installed, ...rest } = data;
  return {
    languageCode: languageCode ?? "",
    seriesId,
    editionId,
    tbpedia,
    baseRelease,
    checkForUpdatesOnStartup: checkForUpdatesOnStartup ?? true,
    installed,
    ...rest
  };
}

// src/main.ts
var TbpediaUpdatePlugin = class extends import_obsidian2.Plugin {
  data = initializePluginData();
  updater;
  settingsTab;
  checking = false;
  installing = false;
  async onload() {
    this.data = initializePluginData(await this.loadData());
    await this.persistData(this.data);
    this.updater = new UpdateService(this.app, this.manifest.version, () => this.data, (data) => this.persistData(data));
    this.settingsTab = new TbpediaUpdateSettingsTab(this.app, this);
    this.addSettingTab(this.settingsTab);
    this.addRibbonIcon("download", "Check Tbpedia updates", () => void this.checkForUpdate());
    this.addCommand({ id: "check-for-content-update", name: "Check for content update", callback: () => void this.checkForUpdate() });
    this.app.workspace.onLayoutReady(() => {
      if (this.data.checkForUpdatesOnStartup && this.data.languageCode && this.data.seriesId && this.data.editionId) void this.checkForUpdate(true);
    });
  }
  async checkForUpdate(silentWhenCurrent = false) {
    if (this.checking) return;
    this.checking = true;
    try {
      const batch = await this.updater.check();
      if (!batch) {
        if (!silentWhenCurrent) new import_obsidian2.Notice("Your Tbpedia content is up to date.");
        return;
      }
      const latest = batch.releases.at(-1);
      const key = `${batch.manifest.tbpedia.language.code}/${batch.manifest.tbpedia.series.id}/${batch.manifest.tbpedia.edition.id}/${batch.manifest.Collection}/${latest.releaseId}`;
      if (silentWhenCurrent && this.data.notifiedReleaseIds?.includes(key)) return;
      if (!this.data.notifiedReleaseIds?.includes(key)) await this.persistData({ ...this.data, notifiedReleaseIds: [...this.data.notifiedReleaseIds ?? [], key] });
      new ReleaseNoticeModal(this.app, batch.manifest, latest, () => this.openReleaseInformation()).open();
    } catch (error) {
      new import_obsidian2.Notice(`Could not check for Tbpedia updates: ${message(error)}`);
    } finally {
      this.checking = false;
    }
  }
  openReleaseInformation() {
    const settings = this.app.setting;
    this.settingsTab.selectReleases();
    if (settings) {
      settings.open();
      settings.openTabById(this.manifest.id);
    } else new import_obsidian2.Notice("Open Settings \u2192 Tbpedia Update \u2192 Release information to select releases.");
  }
  getSelectedBatch(manifest, selectedIds) {
    return this.updater.getSelectedBatch(manifest, selectedIds);
  }
  async installSelected(batch, progress) {
    if (this.installing) throw new Error("A Tbpedia update is already in progress.");
    this.installing = true;
    try {
      const current = await this.updater.getReleaseManifest(true);
      if (JSON.stringify(current) !== JSON.stringify(batch.manifest)) throw new Error("Release information has changed. Refresh and select releases again.");
      const selected = this.updater.getSelectedBatch(current, new Set(batch.releases.map((release) => release.releaseId)));
      await this.updater.install(
        selected,
        progress,
        (path) => new Promise((resolve) => new OverwriteModal(this.app, path, resolve).open())
      );
      this.settingsTab.display();
    } finally {
      this.installing = false;
    }
  }
  async setInterfaceLanguage(interfaceLanguage) {
    await this.persistData({ ...this.data, interfaceLanguage });
  }
  async setCheckForUpdatesOnStartup(checkForUpdatesOnStartup) {
    await this.persistData({ ...this.data, checkForUpdatesOnStartup });
  }
  getReleaseManifest(forceRefresh = false) {
    return this.updater.getReleaseManifest(forceRefresh);
  }
  isReleaseInstalled(release, manifest) {
    return this.updater.isReleaseInstalled(release, manifest);
  }
  async persistData(data) {
    const { languageCode, seriesId, editionId, tbpedia, baseRelease, ...rest } = data;
    this.data = { languageCode, seriesId, editionId, tbpedia, baseRelease, ...rest };
    await this.saveData(this.data);
  }
  get downloadData() {
    return this.data;
  }
  get interfaceLanguage() {
    return this.data.interfaceLanguage ?? (this.data.languageCode || void 0);
  }
  get checkForUpdatesOnStartup() {
    return this.data.checkForUpdatesOnStartup;
  }
  get baseRelease() {
    return this.data.baseRelease ?? {};
  }
};
var TbpediaUpdateSettingsTab = class extends import_obsidian2.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  activeTab = "settings";
  renderId = 0;
  selectReleases() {
    this.activeTab = "releases";
  }
  display(forceRefresh = false) {
    const { containerEl } = this;
    containerEl.empty();
    const renderId = ++this.renderId;
    containerEl.createEl("h2", { text: "Tbpedia Update" });
    const tabs = containerEl.createDiv();
    tabs.setAttribute("role", "tablist");
    tabs.style.display = "flex";
    tabs.style.gap = "8px";
    tabs.style.marginBottom = "16px";
    for (const [id, label] of [["settings", "Settings"], ["releases", "Release information"], ["downloads", "My Download"]]) {
      const button = tabs.createEl("button", { text: label });
      button.setAttribute("role", "tab");
      button.setAttribute("aria-selected", String(this.activeTab === id));
      button.id = `tbpedia-tab-${id}`;
      button.setAttribute("aria-controls", "tbpedia-settings-panel");
      if (this.activeTab === id) button.addClass("mod-cta");
      button.addEventListener("click", () => {
        this.activeTab = id;
        this.display();
      });
    }
    const panel = containerEl.createDiv();
    panel.id = "tbpedia-settings-panel";
    panel.setAttribute("role", "tabpanel");
    panel.setAttribute("aria-labelledby", `tbpedia-tab-${this.activeTab}`);
    if (this.activeTab === "releases") {
      void this.displayReleases(panel, renderId, forceRefresh);
      return;
    }
    if (this.activeTab === "downloads") {
      this.displayDownloads(panel);
      return;
    }
    new import_obsidian2.Setting(panel).setName("Interface language").setDesc("Select your preferred interface language. Content updates use the collection language configured in data.json.").addDropdown((dropdown) => {
      dropdown.addOption("", "Choose language\u2026");
      for (const code of SUPPORTED_LANGUAGES) dropdown.addOption(code, code);
      dropdown.setValue(this.plugin.interfaceLanguage ?? "");
      dropdown.onChange(async (value) => {
        await this.plugin.setInterfaceLanguage(value ? value : void 0);
      });
    });
    new import_obsidian2.Setting(panel).setName("Check for content updates on startup").setDesc("Check for Tbpedia content updates when Obsidian starts. Enabled by default.").addToggle((toggle) => {
      toggle.setValue(this.plugin.checkForUpdatesOnStartup);
      toggle.onChange(async (value) => {
        await this.plugin.setCheckForUpdatesOnStartup(value);
      });
    });
  }
  displayDownloads(panel) {
    panel.createEl("h3", { text: "My Download" });
    panel.createEl("p", { text: "Your locally recorded releases and file changes from the plugin\u2019s data.json. Removed files are changes, not downloads. File lists reflect recorded changes, not the current contents of your vault." });
    const data = this.plugin.downloadData;
    const metadata = panel.createEl("dl");
    metadata.style.display = "grid";
    metadata.style.gridTemplateColumns = "max-content 1fr";
    metadata.style.gap = "8px 16px";
    for (const [label, value] of [
      ["Title", data.title || "Not configured"],
      ["Language", data.languageCode || "Not configured"],
      ["Series", data.seriesId || "Not configured"],
      ["Edition", data.editionId || "Not configured"],
      ["Collection", data.tbpedia],
      ["Base release", data.baseRelease?.releaseVersion ?? data.baseRelease?.releaseId ?? "Not recorded"],
      ["Latest installed release", data.installed.releaseVersion ?? data.installed.releaseId ?? "Not recorded"]
    ]) {
      metadata.createEl("dt", { text: label });
      metadata.createEl("dd", { text: value }).style.margin = "0";
    }
    const installed = data.installed;
    const ids = [.../* @__PURE__ */ new Set([
      ...Object.keys(installed.ownedFiles),
      ...installed.appliedReleaseIds,
      ...installed.releaseId ? [installed.releaseId] : []
    ])].reverse();
    if (!ids.length) {
      panel.createEl("p", { text: "No downloaded releases recorded yet. Open Release information to download your first update. The base collection may have been installed separately." });
      return;
    }
    const makeTable = (parent2, caption, headers) => {
      const wrapper = parent2.createDiv();
      wrapper.style.overflowX = "auto";
      wrapper.style.maxWidth = "100%";
      wrapper.tabIndex = 0;
      wrapper.setAttribute("role", "region");
      wrapper.setAttribute("aria-label", caption + " \u2014 scroll horizontally to view all columns");
      const table = wrapper.createEl("table");
      table.style.width = "max-content";
      table.style.tableLayout = "auto";
      table.style.whiteSpace = "nowrap";
      table.style.borderCollapse = "collapse";
      table.createEl("caption", { text: caption });
      const head = table.createEl("thead").createEl("tr");
      for (const label of headers) head.createEl("th", { text: label }).setAttribute("scope", "col");
      return table.createEl("tbody");
    };
    const body = makeTable(panel, "Recorded releases (most recently applied first)", ["Release ID", "Status", "File details", "Downloaded files", "Added", "Updated", "Removed"]);
    for (const id of ids) {
      const files = installed.ownedFiles[id] ?? [];
      const recorded = Object.prototype.hasOwnProperty.call(installed.ownedFiles, id);
      const completed = installed.appliedReleaseIds.includes(id) || installed.releaseId === id;
      const added = files.filter((file) => file.change === "+").length;
      const updated = files.filter((file) => file.change === "~").length;
      const removed = files.filter((file) => file.change === "-").length;
      const row = body.createEl("tr");
      for (const value of [
        id,
        completed ? "Installed" : "File records only",
        recorded ? String(added + updated) : "Not recorded",
        recorded ? String(added) : "\u2014",
        recorded ? String(updated) : "\u2014",
        recorded ? String(removed) : "\u2014"
      ]) row.createEl("td", { text: value });
      const cell = row.createEl("td");
      row.insertBefore(cell, row.children[2]);
      if (!files.length) {
        cell.setText(recorded ? "No file changes recorded" : "File details were not saved for this release");
        continue;
      }
      const details = cell.createEl("details");
      details.createEl("summary", { text: "View " + files.length + " file changes" });
      details.addEventListener("toggle", () => {
        if (!details.open || details.querySelector("table")) return;
        const fileBody = makeTable(details, "Files for " + id, ["File name", "Folder", "Change"]);
        for (const file of files) {
          const fileRow = fileBody.createEl("tr");
          const split = file.path.lastIndexOf("/");
          const name = fileRow.createEl("td", { text: file.path.slice(split + 1) });
          name.title = file.path;
          fileRow.createEl("td", { text: split < 0 ? "Vault root" : file.path.slice(0, split) }).style.overflowWrap = "anywhere";
          fileRow.createEl("td", { text: file.change === "+" ? "Added" : file.change === "~" ? "Updated" : "Removed" });
        }
        styleCells(details);
      });
    }
    function styleCells(root) {
      for (const cell of Array.from(root.querySelectorAll("th, td"))) {
        cell.style.padding = "10px";
        cell.style.textAlign = "left";
        cell.style.verticalAlign = "top";
        cell.style.borderBottom = "1px solid var(--background-modifier-border)";
        cell.style.overflowWrap = "anywhere";
      }
    }
    styleCells(panel);
  }
  hide() {
    this.renderId++;
  }
  async displayReleases(panel, renderId, forceRefresh) {
    new import_obsidian2.Setting(panel).setName("Release information").setDesc("Releases for this vault\u2019s configured collection. Downloaded status indicates a completed installation recorded by the plugin.").addButton((button) => button.setButtonText("Refresh").onClick(() => this.display(true)));
    const content = panel.createDiv();
    content.setAttribute("aria-live", "polite");
    content.createEl("p", { text: "Loading release information\u2026" });
    try {
      const manifest = await this.plugin.getReleaseManifest(forceRefresh);
      if (renderId !== this.renderId) return;
      content.empty();
      content.createEl("h3", { text: manifest.title });
      const metadata = content.createEl("dl");
      metadata.style.display = "grid";
      metadata.style.gridTemplateColumns = "max-content 1fr";
      metadata.style.columnGap = "16px";
      for (const [label, value] of [
        ["Language Code", manifest.tbpedia.language.code],
        ["Series", manifest.tbpedia.series.id],
        ["Edition", manifest.tbpedia.edition.id],
        ["Collection", manifest.Collection],
        ["Base Release", this.plugin.baseRelease.releaseVersion ?? this.plugin.baseRelease.releaseId ?? "Not configured"],
        ["Base Release ID", this.plugin.baseRelease.releaseId ?? "Not configured"]
      ]) {
        metadata.createEl("dt", { text: label });
        const detail = metadata.createEl("dd", { text: value });
        detail.style.margin = "0";
      }
      const wrapper = content.createDiv();
      wrapper.style.overflowX = "auto";
      const table = wrapper.createEl("table");
      table.style.width = "100%";
      table.style.borderCollapse = "collapse";
      table.createEl("caption", { text: "Available releases (newest first)" });
      const header = table.createEl("thead").createEl("tr");
      for (const label of ["Select", "ReleaseVersion", "Published date", "Downloaded", "ReleaseNote: Summary", "Added", "Updated", "Removed", "Dependencies"]) {
        const cell = header.createEl("th", { text: label });
        cell.setAttribute("scope", "col");
      }
      const body = table.createEl("tbody");
      const selectedIds = /* @__PURE__ */ new Set();
      const checkboxes = /* @__PURE__ */ new Map();
      const selectionStatus = content.createEl("p", { text: "Select releases to download. Required dependencies are included automatically; independent releases can be selected on their own." });
      const download = content.createEl("button", { text: "Download selected releases" });
      download.addClass("mod-cta");
      download.disabled = true;
      const updateSelection = () => {
        download.disabled = selectedIds.size === 0;
        if (!selectedIds.size) {
          selectionStatus.setText("Select releases to download. Required dependencies are included automatically; independent releases can be selected on their own.");
          return;
        }
        const batch = this.plugin.getSelectedBatch(manifest, selectedIds);
        const included = new Set(batch.releases.map((release) => release.releaseId));
        for (const [id, checkbox] of checkboxes) checkbox.checked = included.has(id);
        selectionStatus.setText(`${batch.releases.length} release(s) will be downloaded and installed in order, including required dependencies.`);
      };
      download.addEventListener("click", () => {
        if (!selectedIds.size) return;
        const batch = this.plugin.getSelectedBatch(manifest, selectedIds);
        new UpdateModal(this.app, batch, (progress) => this.plugin.installSelected(batch, progress)).open();
      });
      for (const release of [...manifest.releases].reverse()) {
        const row = body.createEl("tr");
        const installed = this.plugin.isReleaseInstalled(release, manifest);
        const checkbox = row.createEl("td").createEl("input", { type: "checkbox" });
        checkbox.disabled = installed;
        checkbox.setAttribute("aria-label", `Select ${release.releaseVersion}`);
        if (!installed) checkboxes.set(release.releaseId, checkbox);
        checkbox.addEventListener("change", () => {
          if (checkbox.checked) selectedIds.add(release.releaseId);
          else {
            for (const id of [...selectedIds]) {
              if (this.plugin.getSelectedBatch(manifest, /* @__PURE__ */ new Set([id])).releases.some((entry) => entry.releaseId === release.releaseId)) selectedIds.delete(id);
            }
          }
          for (const item of checkboxes.values()) item.checked = false;
          updateSelection();
        });
        const date = new Date(release.publishedAt);
        const values = [
          release.releaseVersion,
          date.toLocaleDateString(void 0, { year: "numeric", month: "short", day: "numeric" }),
          installed ? "Yes (installed)" : "No",
          release.releaseNotes.summary,
          String(release.releaseNotes.added),
          String(release.releaseNotes.updated),
          String(release.releaseNotes.removed),
          release.dependsOn === void 0 ? "All earlier releases" : release.dependsOn.length ? release.dependsOn.join(", ") : "None (independent)"
        ];
        for (const [index, value] of values.entries()) {
          const cell = row.createEl("td", { text: value });
          if (index === 1) cell.title = release.publishedAt;
        }
      }
      for (const cell of Array.from(table.querySelectorAll("th, td"))) {
        const element = cell;
        element.style.padding = "8px";
        element.style.textAlign = "left";
        element.style.verticalAlign = "top";
        element.style.borderBottom = "1px solid var(--background-modifier-border)";
      }
    } catch (error) {
      if (renderId !== this.renderId) return;
      content.empty();
      content.createEl("p", { text: `Could not load release information: ${message(error)}` });
    }
  }
};
var ReleaseNoticeModal = class extends import_obsidian2.Modal {
  constructor(app, manifest, release, goToDownload) {
    super(app);
    this.manifest = manifest;
    this.release = release;
    this.goToDownload = goToDownload;
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.createEl("h2", { text: "New Tbpedia release available" });
    contentEl.createEl("h3", { text: this.manifest.title });
    contentEl.createEl("p", { text: this.release.releaseVersion });
    contentEl.createEl("p", { text: `Published: ${new Date(this.release.publishedAt).toLocaleString()}` });
    contentEl.createEl("p", { text: this.release.releaseNotes.summary });
    contentEl.createEl("p", { text: `Added: ${this.release.releaseNotes.added} \xB7 Updated: ${this.release.releaseNotes.updated} \xB7 Removed: ${this.release.releaseNotes.removed}` });
    contentEl.createEl("p", { text: "Go to Settings \u2192 Release information to select releases for download. This announcement will appear again when a new release is available." });
    new import_obsidian2.Setting(contentEl).addButton((button) => button.setButtonText("Acknowledge").onClick(() => this.close())).addButton((button) => button.setButtonText("Go to download").setCta().onClick(() => {
      this.close();
      this.goToDownload();
    }));
  }
  onClose() {
    this.contentEl.empty();
  }
};
var OverwriteModal = class extends import_obsidian2.Modal {
  constructor(app, path, resolve) {
    super(app);
    this.path = path;
    this.resolve = resolve;
  }
  decision = "cancel";
  onOpen() {
    this.contentEl.createEl("h2", { text: "Overwrite existing file?" });
    this.contentEl.createEl("p", { text: "This local file was not installed by Tbpedia Update. Overwriting replaces its contents with the release version." });
    this.contentEl.createEl("p", { text: this.path });
    this.contentEl.createEl("p", { text: "Overwrite all applies to all remaining conflicting files in this update, including subsequent releases. Cancel stops the current release; earlier completed releases remain installed." });
    new import_obsidian2.Setting(this.contentEl).addButton((button) => button.setButtonText("Cancel update").onClick(() => this.close())).addButton((button) => button.setButtonText("Overwrite this file").onClick(() => this.choose("overwrite"))).addButton((button) => button.setButtonText("Overwrite all").setCta().onClick(() => this.choose("overwrite-all")));
  }
  choose(decision) {
    this.decision = decision;
    this.close();
  }
  onClose() {
    this.contentEl.empty();
    this.resolve(this.decision);
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
    contentEl.createEl("p", { text: "The list below includes selected releases and their required dependencies." });
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
        console.error("Tbpedia update installation failed", error);
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibm9kZV9tb2R1bGVzLy5wbnBtL2pzemlwQDMuMTAuMi9ub2RlX21vZHVsZXMvanN6aXAvZGlzdC9qc3ppcC5taW4uanMiLCAic3JjL21haW4udHMiLCAic3JjL3VwZGF0ZS1zZXJ2aWNlLnRzIiwgInNyYy90eXBlcy50cyIsICJzcmMvcGF0aC1wb2xpY3kudHMiLCAic3JjL21hbmlmZXN0LnRzIiwgInNyYy9vd25lcnNoaXAudHMiLCAic3JjL2Jhc2UtcmVsZWFzZS50cyIsICJzcmMvcGx1Z2luLWRhdGEudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8qIVxuXG5KU1ppcCB2My4xMC4yIC0gQSBKYXZhU2NyaXB0IGNsYXNzIGZvciBnZW5lcmF0aW5nIGFuZCByZWFkaW5nIHppcCBmaWxlc1xuPGh0dHA6Ly9zdHVhcnRrLmNvbS9qc3ppcD5cblxuKGMpIDIwMDktMjAxNiBTdHVhcnQgS25pZ2h0bGV5IDxzdHVhcnQgW2F0XSBzdHVhcnRrLmNvbT5cbkR1YWwgbGljZW5jZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIG9yIEdQTHYzLiBTZWUgaHR0cHM6Ly9yYXcuZ2l0aHViLmNvbS9TdHVrL2pzemlwL21haW4vTElDRU5TRS5tYXJrZG93bi5cblxuSlNaaXAgdXNlcyB0aGUgbGlicmFyeSBwYWtvIHJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSA6XG5odHRwczovL2dpdGh1Yi5jb20vbm9kZWNhL3Bha28vYmxvYi9tYWluL0xJQ0VOU0VcbiovXG5cbiFmdW5jdGlvbihlKXtpZihcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIG1vZHVsZSltb2R1bGUuZXhwb3J0cz1lKCk7ZWxzZSBpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQpZGVmaW5lKFtdLGUpO2Vsc2V7KFwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/d2luZG93OlwidW5kZWZpbmVkXCIhPXR5cGVvZiBnbG9iYWw/Z2xvYmFsOlwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmP3NlbGY6dGhpcykuSlNaaXA9ZSgpfX0oZnVuY3Rpb24oKXtyZXR1cm4gZnVuY3Rpb24gcyhhLG8saCl7ZnVuY3Rpb24gdShyLGUpe2lmKCFvW3JdKXtpZighYVtyXSl7dmFyIHQ9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZSYmdClyZXR1cm4gdChyLCEwKTtpZihsKXJldHVybiBsKHIsITApO3ZhciBuPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrcitcIidcIik7dGhyb3cgbi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLG59dmFyIGk9b1tyXT17ZXhwb3J0czp7fX07YVtyXVswXS5jYWxsKGkuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgdD1hW3JdWzFdW2VdO3JldHVybiB1KHR8fGUpfSxpLGkuZXhwb3J0cyxzLGEsbyxoKX1yZXR1cm4gb1tyXS5leHBvcnRzfWZvcih2YXIgbD1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGU9MDtlPGgubGVuZ3RoO2UrKyl1KGhbZV0pO3JldHVybiB1fSh7MTpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3ZhciBkPWUoXCIuL3V0aWxzXCIpLGM9ZShcIi4vc3VwcG9ydFwiKSxwPVwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLz1cIjtyLmVuY29kZT1mdW5jdGlvbihlKXtmb3IodmFyIHQscixuLGkscyxhLG8saD1bXSx1PTAsbD1lLmxlbmd0aCxmPWwsYz1cInN0cmluZ1wiIT09ZC5nZXRUeXBlT2YoZSk7dTxlLmxlbmd0aDspZj1sLXUsbj1jPyh0PWVbdSsrXSxyPXU8bD9lW3UrK106MCx1PGw/ZVt1KytdOjApOih0PWUuY2hhckNvZGVBdCh1KyspLHI9dTxsP2UuY2hhckNvZGVBdCh1KyspOjAsdTxsP2UuY2hhckNvZGVBdCh1KyspOjApLGk9dD4+MixzPSgzJnQpPDw0fHI+PjQsYT0xPGY/KDE1JnIpPDwyfG4+PjY6NjQsbz0yPGY/NjMmbjo2NCxoLnB1c2gocC5jaGFyQXQoaSkrcC5jaGFyQXQocykrcC5jaGFyQXQoYSkrcC5jaGFyQXQobykpO3JldHVybiBoLmpvaW4oXCJcIil9LHIuZGVjb2RlPWZ1bmN0aW9uKGUpe3ZhciB0LHIsbixpLHMsYSxvPTAsaD0wLHU9XCJkYXRhOlwiO2lmKGUuc3Vic3RyKDAsdS5sZW5ndGgpPT09dSl0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGJhc2U2NCBpbnB1dCwgaXQgbG9va3MgbGlrZSBhIGRhdGEgdXJsLlwiKTt2YXIgbCxmPTMqKGU9ZS5yZXBsYWNlKC9bXkEtWmEtejAtOSsvPV0vZyxcIlwiKSkubGVuZ3RoLzQ7aWYoZS5jaGFyQXQoZS5sZW5ndGgtMSk9PT1wLmNoYXJBdCg2NCkmJmYtLSxlLmNoYXJBdChlLmxlbmd0aC0yKT09PXAuY2hhckF0KDY0KSYmZi0tLGYlMSE9MCl0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGJhc2U2NCBpbnB1dCwgYmFkIGNvbnRlbnQgbGVuZ3RoLlwiKTtmb3IobD1jLnVpbnQ4YXJyYXk/bmV3IFVpbnQ4QXJyYXkoMHxmKTpuZXcgQXJyYXkoMHxmKTtvPGUubGVuZ3RoOyl0PXAuaW5kZXhPZihlLmNoYXJBdChvKyspKTw8MnwoaT1wLmluZGV4T2YoZS5jaGFyQXQobysrKSkpPj40LHI9KDE1JmkpPDw0fChzPXAuaW5kZXhPZihlLmNoYXJBdChvKyspKSk+PjIsbj0oMyZzKTw8NnwoYT1wLmluZGV4T2YoZS5jaGFyQXQobysrKSkpLGxbaCsrXT10LDY0IT09cyYmKGxbaCsrXT1yKSw2NCE9PWEmJihsW2grK109bik7cmV0dXJuIGx9fSx7XCIuL3N1cHBvcnRcIjozMCxcIi4vdXRpbHNcIjozMn1dLDI6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt2YXIgbj1lKFwiLi9leHRlcm5hbFwiKSxpPWUoXCIuL3N0cmVhbS9EYXRhV29ya2VyXCIpLHM9ZShcIi4vc3RyZWFtL0NyYzMyUHJvYmVcIiksYT1lKFwiLi9zdHJlYW0vRGF0YUxlbmd0aFByb2JlXCIpO2Z1bmN0aW9uIG8oZSx0LHIsbixpKXt0aGlzLmNvbXByZXNzZWRTaXplPWUsdGhpcy51bmNvbXByZXNzZWRTaXplPXQsdGhpcy5jcmMzMj1yLHRoaXMuY29tcHJlc3Npb249bix0aGlzLmNvbXByZXNzZWRDb250ZW50PWl9by5wcm90b3R5cGU9e2dldENvbnRlbnRXb3JrZXI6ZnVuY3Rpb24oKXt2YXIgZT1uZXcgaShuLlByb21pc2UucmVzb2x2ZSh0aGlzLmNvbXByZXNzZWRDb250ZW50KSkucGlwZSh0aGlzLmNvbXByZXNzaW9uLnVuY29tcHJlc3NXb3JrZXIoKSkucGlwZShuZXcgYShcImRhdGFfbGVuZ3RoXCIpKSx0PXRoaXM7cmV0dXJuIGUub24oXCJlbmRcIixmdW5jdGlvbigpe2lmKHRoaXMuc3RyZWFtSW5mby5kYXRhX2xlbmd0aCE9PXQudW5jb21wcmVzc2VkU2l6ZSl0aHJvdyBuZXcgRXJyb3IoXCJCdWcgOiB1bmNvbXByZXNzZWQgZGF0YSBzaXplIG1pc21hdGNoXCIpfSksZX0sZ2V0Q29tcHJlc3NlZFdvcmtlcjpmdW5jdGlvbigpe3JldHVybiBuZXcgaShuLlByb21pc2UucmVzb2x2ZSh0aGlzLmNvbXByZXNzZWRDb250ZW50KSkud2l0aFN0cmVhbUluZm8oXCJjb21wcmVzc2VkU2l6ZVwiLHRoaXMuY29tcHJlc3NlZFNpemUpLndpdGhTdHJlYW1JbmZvKFwidW5jb21wcmVzc2VkU2l6ZVwiLHRoaXMudW5jb21wcmVzc2VkU2l6ZSkud2l0aFN0cmVhbUluZm8oXCJjcmMzMlwiLHRoaXMuY3JjMzIpLndpdGhTdHJlYW1JbmZvKFwiY29tcHJlc3Npb25cIix0aGlzLmNvbXByZXNzaW9uKX19LG8uY3JlYXRlV29ya2VyRnJvbT1mdW5jdGlvbihlLHQscil7cmV0dXJuIGUucGlwZShuZXcgcykucGlwZShuZXcgYShcInVuY29tcHJlc3NlZFNpemVcIikpLnBpcGUodC5jb21wcmVzc1dvcmtlcihyKSkucGlwZShuZXcgYShcImNvbXByZXNzZWRTaXplXCIpKS53aXRoU3RyZWFtSW5mbyhcImNvbXByZXNzaW9uXCIsdCl9LHQuZXhwb3J0cz1vfSx7XCIuL2V4dGVybmFsXCI6NixcIi4vc3RyZWFtL0NyYzMyUHJvYmVcIjoyNSxcIi4vc3RyZWFtL0RhdGFMZW5ndGhQcm9iZVwiOjI2LFwiLi9zdHJlYW0vRGF0YVdvcmtlclwiOjI3fV0sMzpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3ZhciBuPWUoXCIuL3N0cmVhbS9HZW5lcmljV29ya2VyXCIpO3IuU1RPUkU9e21hZ2ljOlwiXFwwXFwwXCIsY29tcHJlc3NXb3JrZXI6ZnVuY3Rpb24oKXtyZXR1cm4gbmV3IG4oXCJTVE9SRSBjb21wcmVzc2lvblwiKX0sdW5jb21wcmVzc1dvcmtlcjpmdW5jdGlvbigpe3JldHVybiBuZXcgbihcIlNUT1JFIGRlY29tcHJlc3Npb25cIil9fSxyLkRFRkxBVEU9ZShcIi4vZmxhdGVcIil9LHtcIi4vZmxhdGVcIjo3LFwiLi9zdHJlYW0vR2VuZXJpY1dvcmtlclwiOjI4fV0sNDpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3ZhciBuPWUoXCIuL3V0aWxzXCIpO3ZhciBvPWZ1bmN0aW9uKCl7Zm9yKHZhciBlLHQ9W10scj0wO3I8MjU2O3IrKyl7ZT1yO2Zvcih2YXIgbj0wO248ODtuKyspZT0xJmU/Mzk4ODI5MjM4NF5lPj4+MTplPj4+MTt0W3JdPWV9cmV0dXJuIHR9KCk7dC5leHBvcnRzPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIHZvaWQgMCE9PWUmJmUubGVuZ3RoP1wic3RyaW5nXCIhPT1uLmdldFR5cGVPZihlKT9mdW5jdGlvbihlLHQscixuKXt2YXIgaT1vLHM9bityO2VePS0xO2Zvcih2YXIgYT1uO2E8czthKyspZT1lPj4+OF5pWzI1NSYoZV50W2FdKV07cmV0dXJuLTFeZX0oMHx0LGUsZS5sZW5ndGgsMCk6ZnVuY3Rpb24oZSx0LHIsbil7dmFyIGk9byxzPW4rcjtlXj0tMTtmb3IodmFyIGE9bjthPHM7YSsrKWU9ZT4+PjheaVsyNTUmKGVedC5jaGFyQ29kZUF0KGEpKV07cmV0dXJuLTFeZX0oMHx0LGUsZS5sZW5ndGgsMCk6MH19LHtcIi4vdXRpbHNcIjozMn1dLDU6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjtyLmJhc2U2ND0hMSxyLmJpbmFyeT0hMSxyLmRpcj0hMSxyLmNyZWF0ZUZvbGRlcnM9ITAsci5kYXRlPW51bGwsci5jb21wcmVzc2lvbj1udWxsLHIuY29tcHJlc3Npb25PcHRpb25zPW51bGwsci5jb21tZW50PW51bGwsci51bml4UGVybWlzc2lvbnM9bnVsbCxyLmRvc1Blcm1pc3Npb25zPW51bGx9LHt9XSw2OltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7dmFyIG49bnVsbDtuPVwidW5kZWZpbmVkXCIhPXR5cGVvZiBQcm9taXNlP1Byb21pc2U6ZShcImxpZVwiKSx0LmV4cG9ydHM9e1Byb21pc2U6bn19LHtsaWU6Mzd9XSw3OltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7dmFyIG49XCJ1bmRlZmluZWRcIiE9dHlwZW9mIFVpbnQ4QXJyYXkmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBVaW50MTZBcnJheSYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIFVpbnQzMkFycmF5LGk9ZShcInBha29cIikscz1lKFwiLi91dGlsc1wiKSxhPWUoXCIuL3N0cmVhbS9HZW5lcmljV29ya2VyXCIpLG89bj9cInVpbnQ4YXJyYXlcIjpcImFycmF5XCI7ZnVuY3Rpb24gaChlLHQpe2EuY2FsbCh0aGlzLFwiRmxhdGVXb3JrZXIvXCIrZSksdGhpcy5fcGFrbz1udWxsLHRoaXMuX3Bha29BY3Rpb249ZSx0aGlzLl9wYWtvT3B0aW9ucz10LHRoaXMubWV0YT17fX1yLm1hZ2ljPVwiXFxiXFwwXCIscy5pbmhlcml0cyhoLGEpLGgucHJvdG90eXBlLnByb2Nlc3NDaHVuaz1mdW5jdGlvbihlKXt0aGlzLm1ldGE9ZS5tZXRhLG51bGw9PT10aGlzLl9wYWtvJiZ0aGlzLl9jcmVhdGVQYWtvKCksdGhpcy5fcGFrby5wdXNoKHMudHJhbnNmb3JtVG8obyxlLmRhdGEpLCExKX0saC5wcm90b3R5cGUuZmx1c2g9ZnVuY3Rpb24oKXthLnByb3RvdHlwZS5mbHVzaC5jYWxsKHRoaXMpLG51bGw9PT10aGlzLl9wYWtvJiZ0aGlzLl9jcmVhdGVQYWtvKCksdGhpcy5fcGFrby5wdXNoKFtdLCEwKX0saC5wcm90b3R5cGUuY2xlYW5VcD1mdW5jdGlvbigpe2EucHJvdG90eXBlLmNsZWFuVXAuY2FsbCh0aGlzKSx0aGlzLl9wYWtvPW51bGx9LGgucHJvdG90eXBlLl9jcmVhdGVQYWtvPWZ1bmN0aW9uKCl7dGhpcy5fcGFrbz1uZXcgaVt0aGlzLl9wYWtvQWN0aW9uXSh7cmF3OiEwLGxldmVsOnRoaXMuX3Bha29PcHRpb25zLmxldmVsfHwtMX0pO3ZhciB0PXRoaXM7dGhpcy5fcGFrby5vbkRhdGE9ZnVuY3Rpb24oZSl7dC5wdXNoKHtkYXRhOmUsbWV0YTp0Lm1ldGF9KX19LHIuY29tcHJlc3NXb3JrZXI9ZnVuY3Rpb24oZSl7cmV0dXJuIG5ldyBoKFwiRGVmbGF0ZVwiLGUpfSxyLnVuY29tcHJlc3NXb3JrZXI9ZnVuY3Rpb24oKXtyZXR1cm4gbmV3IGgoXCJJbmZsYXRlXCIse30pfX0se1wiLi9zdHJlYW0vR2VuZXJpY1dvcmtlclwiOjI4LFwiLi91dGlsc1wiOjMyLHBha286Mzh9XSw4OltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gQShlLHQpe3ZhciByLG49XCJcIjtmb3Iocj0wO3I8dDtyKyspbis9U3RyaW5nLmZyb21DaGFyQ29kZSgyNTUmZSksZT4+Pj04O3JldHVybiBufWZ1bmN0aW9uIG4oZSx0LHIsbixpLHMpe3ZhciBhLG8saD1lLmZpbGUsdT1lLmNvbXByZXNzaW9uLGw9cyE9PU8udXRmOGVuY29kZSxmPUkudHJhbnNmb3JtVG8oXCJzdHJpbmdcIixzKGgubmFtZSkpLGM9SS50cmFuc2Zvcm1UbyhcInN0cmluZ1wiLE8udXRmOGVuY29kZShoLm5hbWUpKSxkPWguY29tbWVudCxwPUkudHJhbnNmb3JtVG8oXCJzdHJpbmdcIixzKGQpKSxtPUkudHJhbnNmb3JtVG8oXCJzdHJpbmdcIixPLnV0ZjhlbmNvZGUoZCkpLF89Yy5sZW5ndGghPT1oLm5hbWUubGVuZ3RoLGc9bS5sZW5ndGghPT1kLmxlbmd0aCxiPVwiXCIsdj1cIlwiLHk9XCJcIix3PWguZGlyLGs9aC5kYXRlLHg9e2NyYzMyOjAsY29tcHJlc3NlZFNpemU6MCx1bmNvbXByZXNzZWRTaXplOjB9O3QmJiFyfHwoeC5jcmMzMj1lLmNyYzMyLHguY29tcHJlc3NlZFNpemU9ZS5jb21wcmVzc2VkU2l6ZSx4LnVuY29tcHJlc3NlZFNpemU9ZS51bmNvbXByZXNzZWRTaXplKTt2YXIgUz0wO3QmJihTfD04KSxsfHwhXyYmIWd8fChTfD0yMDQ4KTt2YXIgej0wLEM9MDt3JiYoenw9MTYpLFwiVU5JWFwiPT09aT8oQz03OTgsenw9ZnVuY3Rpb24oZSx0KXt2YXIgcj1lO3JldHVybiBlfHwocj10PzE2ODkzOjMzMjA0KSwoNjU1MzUmcik8PDE2fShoLnVuaXhQZXJtaXNzaW9ucyx3KSk6KEM9MjAsenw9ZnVuY3Rpb24oZSl7cmV0dXJuIDYzJihlfHwwKX0oaC5kb3NQZXJtaXNzaW9ucykpLGE9ay5nZXRVVENIb3VycygpLGE8PD02LGF8PWsuZ2V0VVRDTWludXRlcygpLGE8PD01LGF8PWsuZ2V0VVRDU2Vjb25kcygpLzIsbz1rLmdldFVUQ0Z1bGxZZWFyKCktMTk4MCxvPDw9NCxvfD1rLmdldFVUQ01vbnRoKCkrMSxvPDw9NSxvfD1rLmdldFVUQ0RhdGUoKSxfJiYodj1BKDEsMSkrQShCKGYpLDQpK2MsYis9XCJ1cFwiK0Eodi5sZW5ndGgsMikrdiksZyYmKHk9QSgxLDEpK0EoQihwKSw0KSttLGIrPVwidWNcIitBKHkubGVuZ3RoLDIpK3kpO3ZhciBFPVwiXCI7cmV0dXJuIEUrPVwiXFxuXFwwXCIsRSs9QShTLDIpLEUrPXUubWFnaWMsRSs9QShhLDIpLEUrPUEobywyKSxFKz1BKHguY3JjMzIsNCksRSs9QSh4LmNvbXByZXNzZWRTaXplLDQpLEUrPUEoeC51bmNvbXByZXNzZWRTaXplLDQpLEUrPUEoZi5sZW5ndGgsMiksRSs9QShiLmxlbmd0aCwyKSx7ZmlsZVJlY29yZDpSLkxPQ0FMX0ZJTEVfSEVBREVSK0UrZitiLGRpclJlY29yZDpSLkNFTlRSQUxfRklMRV9IRUFERVIrQShDLDIpK0UrQShwLmxlbmd0aCwyKStcIlxcMFxcMFxcMFxcMFwiK0Eoeiw0KStBKG4sNCkrZitiK3B9fXZhciBJPWUoXCIuLi91dGlsc1wiKSxpPWUoXCIuLi9zdHJlYW0vR2VuZXJpY1dvcmtlclwiKSxPPWUoXCIuLi91dGY4XCIpLEI9ZShcIi4uL2NyYzMyXCIpLFI9ZShcIi4uL3NpZ25hdHVyZVwiKTtmdW5jdGlvbiBzKGUsdCxyLG4pe2kuY2FsbCh0aGlzLFwiWmlwRmlsZVdvcmtlclwiKSx0aGlzLmJ5dGVzV3JpdHRlbj0wLHRoaXMuemlwQ29tbWVudD10LHRoaXMuemlwUGxhdGZvcm09cix0aGlzLmVuY29kZUZpbGVOYW1lPW4sdGhpcy5zdHJlYW1GaWxlcz1lLHRoaXMuYWNjdW11bGF0ZT0hMSx0aGlzLmNvbnRlbnRCdWZmZXI9W10sdGhpcy5kaXJSZWNvcmRzPVtdLHRoaXMuY3VycmVudFNvdXJjZU9mZnNldD0wLHRoaXMuZW50cmllc0NvdW50PTAsdGhpcy5jdXJyZW50RmlsZT1udWxsLHRoaXMuX3NvdXJjZXM9W119SS5pbmhlcml0cyhzLGkpLHMucHJvdG90eXBlLnB1c2g9ZnVuY3Rpb24oZSl7dmFyIHQ9ZS5tZXRhLnBlcmNlbnR8fDAscj10aGlzLmVudHJpZXNDb3VudCxuPXRoaXMuX3NvdXJjZXMubGVuZ3RoO3RoaXMuYWNjdW11bGF0ZT90aGlzLmNvbnRlbnRCdWZmZXIucHVzaChlKToodGhpcy5ieXRlc1dyaXR0ZW4rPWUuZGF0YS5sZW5ndGgsaS5wcm90b3R5cGUucHVzaC5jYWxsKHRoaXMse2RhdGE6ZS5kYXRhLG1ldGE6e2N1cnJlbnRGaWxlOnRoaXMuY3VycmVudEZpbGUscGVyY2VudDpyPyh0KzEwMCooci1uLTEpKS9yOjEwMH19KSl9LHMucHJvdG90eXBlLm9wZW5lZFNvdXJjZT1mdW5jdGlvbihlKXt0aGlzLmN1cnJlbnRTb3VyY2VPZmZzZXQ9dGhpcy5ieXRlc1dyaXR0ZW4sdGhpcy5jdXJyZW50RmlsZT1lLmZpbGUubmFtZTt2YXIgdD10aGlzLnN0cmVhbUZpbGVzJiYhZS5maWxlLmRpcjtpZih0KXt2YXIgcj1uKGUsdCwhMSx0aGlzLmN1cnJlbnRTb3VyY2VPZmZzZXQsdGhpcy56aXBQbGF0Zm9ybSx0aGlzLmVuY29kZUZpbGVOYW1lKTt0aGlzLnB1c2goe2RhdGE6ci5maWxlUmVjb3JkLG1ldGE6e3BlcmNlbnQ6MH19KX1lbHNlIHRoaXMuYWNjdW11bGF0ZT0hMH0scy5wcm90b3R5cGUuY2xvc2VkU291cmNlPWZ1bmN0aW9uKGUpe3RoaXMuYWNjdW11bGF0ZT0hMTt2YXIgdD10aGlzLnN0cmVhbUZpbGVzJiYhZS5maWxlLmRpcixyPW4oZSx0LCEwLHRoaXMuY3VycmVudFNvdXJjZU9mZnNldCx0aGlzLnppcFBsYXRmb3JtLHRoaXMuZW5jb2RlRmlsZU5hbWUpO2lmKHRoaXMuZGlyUmVjb3Jkcy5wdXNoKHIuZGlyUmVjb3JkKSx0KXRoaXMucHVzaCh7ZGF0YTpmdW5jdGlvbihlKXtyZXR1cm4gUi5EQVRBX0RFU0NSSVBUT1IrQShlLmNyYzMyLDQpK0EoZS5jb21wcmVzc2VkU2l6ZSw0KStBKGUudW5jb21wcmVzc2VkU2l6ZSw0KX0oZSksbWV0YTp7cGVyY2VudDoxMDB9fSk7ZWxzZSBmb3IodGhpcy5wdXNoKHtkYXRhOnIuZmlsZVJlY29yZCxtZXRhOntwZXJjZW50OjB9fSk7dGhpcy5jb250ZW50QnVmZmVyLmxlbmd0aDspdGhpcy5wdXNoKHRoaXMuY29udGVudEJ1ZmZlci5zaGlmdCgpKTt0aGlzLmN1cnJlbnRGaWxlPW51bGx9LHMucHJvdG90eXBlLmZsdXNoPWZ1bmN0aW9uKCl7Zm9yKHZhciBlPXRoaXMuYnl0ZXNXcml0dGVuLHQ9MDt0PHRoaXMuZGlyUmVjb3Jkcy5sZW5ndGg7dCsrKXRoaXMucHVzaCh7ZGF0YTp0aGlzLmRpclJlY29yZHNbdF0sbWV0YTp7cGVyY2VudDoxMDB9fSk7dmFyIHI9dGhpcy5ieXRlc1dyaXR0ZW4tZSxuPWZ1bmN0aW9uKGUsdCxyLG4saSl7dmFyIHM9SS50cmFuc2Zvcm1UbyhcInN0cmluZ1wiLGkobikpO3JldHVybiBSLkNFTlRSQUxfRElSRUNUT1JZX0VORCtcIlxcMFxcMFxcMFxcMFwiK0EoZSwyKStBKGUsMikrQSh0LDQpK0Eociw0KStBKHMubGVuZ3RoLDIpK3N9KHRoaXMuZGlyUmVjb3Jkcy5sZW5ndGgscixlLHRoaXMuemlwQ29tbWVudCx0aGlzLmVuY29kZUZpbGVOYW1lKTt0aGlzLnB1c2goe2RhdGE6bixtZXRhOntwZXJjZW50OjEwMH19KX0scy5wcm90b3R5cGUucHJlcGFyZU5leHRTb3VyY2U9ZnVuY3Rpb24oKXt0aGlzLnByZXZpb3VzPXRoaXMuX3NvdXJjZXMuc2hpZnQoKSx0aGlzLm9wZW5lZFNvdXJjZSh0aGlzLnByZXZpb3VzLnN0cmVhbUluZm8pLHRoaXMuaXNQYXVzZWQ/dGhpcy5wcmV2aW91cy5wYXVzZSgpOnRoaXMucHJldmlvdXMucmVzdW1lKCl9LHMucHJvdG90eXBlLnJlZ2lzdGVyUHJldmlvdXM9ZnVuY3Rpb24oZSl7dGhpcy5fc291cmNlcy5wdXNoKGUpO3ZhciB0PXRoaXM7cmV0dXJuIGUub24oXCJkYXRhXCIsZnVuY3Rpb24oZSl7dC5wcm9jZXNzQ2h1bmsoZSl9KSxlLm9uKFwiZW5kXCIsZnVuY3Rpb24oKXt0LmNsb3NlZFNvdXJjZSh0LnByZXZpb3VzLnN0cmVhbUluZm8pLHQuX3NvdXJjZXMubGVuZ3RoP3QucHJlcGFyZU5leHRTb3VyY2UoKTp0LmVuZCgpfSksZS5vbihcImVycm9yXCIsZnVuY3Rpb24oZSl7dC5lcnJvcihlKX0pLHRoaXN9LHMucHJvdG90eXBlLnJlc3VtZT1mdW5jdGlvbigpe3JldHVybiEhaS5wcm90b3R5cGUucmVzdW1lLmNhbGwodGhpcykmJighdGhpcy5wcmV2aW91cyYmdGhpcy5fc291cmNlcy5sZW5ndGg/KHRoaXMucHJlcGFyZU5leHRTb3VyY2UoKSwhMCk6dGhpcy5wcmV2aW91c3x8dGhpcy5fc291cmNlcy5sZW5ndGh8fHRoaXMuZ2VuZXJhdGVkRXJyb3I/dm9pZCAwOih0aGlzLmVuZCgpLCEwKSl9LHMucHJvdG90eXBlLmVycm9yPWZ1bmN0aW9uKGUpe3ZhciB0PXRoaXMuX3NvdXJjZXM7aWYoIWkucHJvdG90eXBlLmVycm9yLmNhbGwodGhpcyxlKSlyZXR1cm4hMTtmb3IodmFyIHI9MDtyPHQubGVuZ3RoO3IrKyl0cnl7dFtyXS5lcnJvcihlKX1jYXRjaChlKXt9cmV0dXJuITB9LHMucHJvdG90eXBlLmxvY2s9ZnVuY3Rpb24oKXtpLnByb3RvdHlwZS5sb2NrLmNhbGwodGhpcyk7Zm9yKHZhciBlPXRoaXMuX3NvdXJjZXMsdD0wO3Q8ZS5sZW5ndGg7dCsrKWVbdF0ubG9jaygpfSx0LmV4cG9ydHM9c30se1wiLi4vY3JjMzJcIjo0LFwiLi4vc2lnbmF0dXJlXCI6MjMsXCIuLi9zdHJlYW0vR2VuZXJpY1dvcmtlclwiOjI4LFwiLi4vdXRmOFwiOjMxLFwiLi4vdXRpbHNcIjozMn1dLDk6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt2YXIgdT1lKFwiLi4vY29tcHJlc3Npb25zXCIpLG49ZShcIi4vWmlwRmlsZVdvcmtlclwiKTtyLmdlbmVyYXRlV29ya2VyPWZ1bmN0aW9uKGUsYSx0KXt2YXIgbz1uZXcgbihhLnN0cmVhbUZpbGVzLHQsYS5wbGF0Zm9ybSxhLmVuY29kZUZpbGVOYW1lKSxoPTA7dHJ5e2UuZm9yRWFjaChmdW5jdGlvbihlLHQpe2grKzt2YXIgcj1mdW5jdGlvbihlLHQpe3ZhciByPWV8fHQsbj11W3JdO2lmKCFuKXRocm93IG5ldyBFcnJvcihyK1wiIGlzIG5vdCBhIHZhbGlkIGNvbXByZXNzaW9uIG1ldGhvZCAhXCIpO3JldHVybiBufSh0Lm9wdGlvbnMuY29tcHJlc3Npb24sYS5jb21wcmVzc2lvbiksbj10Lm9wdGlvbnMuY29tcHJlc3Npb25PcHRpb25zfHxhLmNvbXByZXNzaW9uT3B0aW9uc3x8e30saT10LmRpcixzPXQuZGF0ZTt0Ll9jb21wcmVzc1dvcmtlcihyLG4pLndpdGhTdHJlYW1JbmZvKFwiZmlsZVwiLHtuYW1lOmUsZGlyOmksZGF0ZTpzLGNvbW1lbnQ6dC5jb21tZW50fHxcIlwiLHVuaXhQZXJtaXNzaW9uczp0LnVuaXhQZXJtaXNzaW9ucyxkb3NQZXJtaXNzaW9uczp0LmRvc1Blcm1pc3Npb25zfSkucGlwZShvKX0pLG8uZW50cmllc0NvdW50PWh9Y2F0Y2goZSl7by5lcnJvcihlKX1yZXR1cm4gb319LHtcIi4uL2NvbXByZXNzaW9uc1wiOjMsXCIuL1ppcEZpbGVXb3JrZXJcIjo4fV0sMTA6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBuKCl7aWYoISh0aGlzIGluc3RhbmNlb2YgbikpcmV0dXJuIG5ldyBuO2lmKGFyZ3VtZW50cy5sZW5ndGgpdGhyb3cgbmV3IEVycm9yKFwiVGhlIGNvbnN0cnVjdG9yIHdpdGggcGFyYW1ldGVycyBoYXMgYmVlbiByZW1vdmVkIGluIEpTWmlwIDMuMCwgcGxlYXNlIGNoZWNrIHRoZSB1cGdyYWRlIGd1aWRlLlwiKTt0aGlzLmZpbGVzPU9iamVjdC5jcmVhdGUobnVsbCksdGhpcy5jb21tZW50PW51bGwsdGhpcy5yb290PVwiXCIsdGhpcy5jbG9uZT1mdW5jdGlvbigpe3ZhciBlPW5ldyBuO2Zvcih2YXIgdCBpbiB0aGlzKVwiZnVuY3Rpb25cIiE9dHlwZW9mIHRoaXNbdF0mJihlW3RdPXRoaXNbdF0pO3JldHVybiBlfX0obi5wcm90b3R5cGU9ZShcIi4vb2JqZWN0XCIpKS5sb2FkQXN5bmM9ZShcIi4vbG9hZFwiKSxuLnN1cHBvcnQ9ZShcIi4vc3VwcG9ydFwiKSxuLmRlZmF1bHRzPWUoXCIuL2RlZmF1bHRzXCIpLG4udmVyc2lvbj1cIjMuMTAuMlwiLG4ubG9hZEFzeW5jPWZ1bmN0aW9uKGUsdCl7cmV0dXJuKG5ldyBuKS5sb2FkQXN5bmMoZSx0KX0sbi5leHRlcm5hbD1lKFwiLi9leHRlcm5hbFwiKSx0LmV4cG9ydHM9bn0se1wiLi9kZWZhdWx0c1wiOjUsXCIuL2V4dGVybmFsXCI6NixcIi4vbG9hZFwiOjExLFwiLi9vYmplY3RcIjoxNSxcIi4vc3VwcG9ydFwiOjMwfV0sMTE6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt2YXIgdT1lKFwiLi91dGlsc1wiKSxpPWUoXCIuL2V4dGVybmFsXCIpLG49ZShcIi4vdXRmOFwiKSxzPWUoXCIuL3ppcEVudHJpZXNcIiksYT1lKFwiLi9zdHJlYW0vQ3JjMzJQcm9iZVwiKSxsPWUoXCIuL25vZGVqc1V0aWxzXCIpO2Z1bmN0aW9uIGYobil7cmV0dXJuIG5ldyBpLlByb21pc2UoZnVuY3Rpb24oZSx0KXt2YXIgcj1uLmRlY29tcHJlc3NlZC5nZXRDb250ZW50V29ya2VyKCkucGlwZShuZXcgYSk7ci5vbihcImVycm9yXCIsZnVuY3Rpb24oZSl7dChlKX0pLm9uKFwiZW5kXCIsZnVuY3Rpb24oKXtyLnN0cmVhbUluZm8uY3JjMzIhPT1uLmRlY29tcHJlc3NlZC5jcmMzMj90KG5ldyBFcnJvcihcIkNvcnJ1cHRlZCB6aXAgOiBDUkMzMiBtaXNtYXRjaFwiKSk6ZSgpfSkucmVzdW1lKCl9KX10LmV4cG9ydHM9ZnVuY3Rpb24oZSxvKXt2YXIgaD10aGlzO3JldHVybiBvPXUuZXh0ZW5kKG98fHt9LHtiYXNlNjQ6ITEsY2hlY2tDUkMzMjohMSxvcHRpbWl6ZWRCaW5hcnlTdHJpbmc6ITEsY3JlYXRlRm9sZGVyczohMSxkZWNvZGVGaWxlTmFtZTpuLnV0ZjhkZWNvZGV9KSxsLmlzTm9kZSYmbC5pc1N0cmVhbShlKT9pLlByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIkpTWmlwIGNhbid0IGFjY2VwdCBhIHN0cmVhbSB3aGVuIGxvYWRpbmcgYSB6aXAgZmlsZS5cIikpOnUucHJlcGFyZUNvbnRlbnQoXCJ0aGUgbG9hZGVkIHppcCBmaWxlXCIsZSwhMCxvLm9wdGltaXplZEJpbmFyeVN0cmluZyxvLmJhc2U2NCkudGhlbihmdW5jdGlvbihlKXt2YXIgdD1uZXcgcyhvKTtyZXR1cm4gdC5sb2FkKGUpLHR9KS50aGVuKGZ1bmN0aW9uKGUpe3ZhciB0PVtpLlByb21pc2UucmVzb2x2ZShlKV0scj1lLmZpbGVzO2lmKG8uY2hlY2tDUkMzMilmb3IodmFyIG49MDtuPHIubGVuZ3RoO24rKyl0LnB1c2goZihyW25dKSk7cmV0dXJuIGkuUHJvbWlzZS5hbGwodCl9KS50aGVuKGZ1bmN0aW9uKGUpe2Zvcih2YXIgdD1lLnNoaWZ0KCkscj10LmZpbGVzLG49MDtuPHIubGVuZ3RoO24rKyl7dmFyIGk9cltuXSxzPWkuZmlsZU5hbWVTdHIsYT11LnJlc29sdmUoaS5maWxlTmFtZVN0cik7aC5maWxlKGEsaS5kZWNvbXByZXNzZWQse2JpbmFyeTohMCxvcHRpbWl6ZWRCaW5hcnlTdHJpbmc6ITAsZGF0ZTppLmRhdGUsZGlyOmkuZGlyLGNvbW1lbnQ6aS5maWxlQ29tbWVudFN0ci5sZW5ndGg/aS5maWxlQ29tbWVudFN0cjpudWxsLHVuaXhQZXJtaXNzaW9uczppLnVuaXhQZXJtaXNzaW9ucyxkb3NQZXJtaXNzaW9uczppLmRvc1Blcm1pc3Npb25zLGNyZWF0ZUZvbGRlcnM6by5jcmVhdGVGb2xkZXJzfSksaS5kaXJ8fChoLmZpbGUoYSkudW5zYWZlT3JpZ2luYWxOYW1lPXMpfXJldHVybiB0LnppcENvbW1lbnQubGVuZ3RoJiYoaC5jb21tZW50PXQuemlwQ29tbWVudCksaH0pfX0se1wiLi9leHRlcm5hbFwiOjYsXCIuL25vZGVqc1V0aWxzXCI6MTQsXCIuL3N0cmVhbS9DcmMzMlByb2JlXCI6MjUsXCIuL3V0ZjhcIjozMSxcIi4vdXRpbHNcIjozMixcIi4vemlwRW50cmllc1wiOjMzfV0sMTI6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt2YXIgbj1lKFwiLi4vdXRpbHNcIiksaT1lKFwiLi4vc3RyZWFtL0dlbmVyaWNXb3JrZXJcIik7ZnVuY3Rpb24gcyhlLHQpe2kuY2FsbCh0aGlzLFwiTm9kZWpzIHN0cmVhbSBpbnB1dCBhZGFwdGVyIGZvciBcIitlKSx0aGlzLl91cHN0cmVhbUVuZGVkPSExLHRoaXMuX2JpbmRTdHJlYW0odCl9bi5pbmhlcml0cyhzLGkpLHMucHJvdG90eXBlLl9iaW5kU3RyZWFtPWZ1bmN0aW9uKGUpe3ZhciB0PXRoaXM7KHRoaXMuX3N0cmVhbT1lKS5wYXVzZSgpLGUub24oXCJkYXRhXCIsZnVuY3Rpb24oZSl7dC5wdXNoKHtkYXRhOmUsbWV0YTp7cGVyY2VudDowfX0pfSkub24oXCJlcnJvclwiLGZ1bmN0aW9uKGUpe3QuaXNQYXVzZWQ/dGhpcy5nZW5lcmF0ZWRFcnJvcj1lOnQuZXJyb3IoZSl9KS5vbihcImVuZFwiLGZ1bmN0aW9uKCl7dC5pc1BhdXNlZD90Ll91cHN0cmVhbUVuZGVkPSEwOnQuZW5kKCl9KX0scy5wcm90b3R5cGUucGF1c2U9ZnVuY3Rpb24oKXtyZXR1cm4hIWkucHJvdG90eXBlLnBhdXNlLmNhbGwodGhpcykmJih0aGlzLl9zdHJlYW0ucGF1c2UoKSwhMCl9LHMucHJvdG90eXBlLnJlc3VtZT1mdW5jdGlvbigpe3JldHVybiEhaS5wcm90b3R5cGUucmVzdW1lLmNhbGwodGhpcykmJih0aGlzLl91cHN0cmVhbUVuZGVkP3RoaXMuZW5kKCk6dGhpcy5fc3RyZWFtLnJlc3VtZSgpLCEwKX0sdC5leHBvcnRzPXN9LHtcIi4uL3N0cmVhbS9HZW5lcmljV29ya2VyXCI6MjgsXCIuLi91dGlsc1wiOjMyfV0sMTM6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt2YXIgaT1lKFwicmVhZGFibGUtc3RyZWFtXCIpLlJlYWRhYmxlO2Z1bmN0aW9uIG4oZSx0LHIpe2kuY2FsbCh0aGlzLHQpLHRoaXMuX2hlbHBlcj1lO3ZhciBuPXRoaXM7ZS5vbihcImRhdGFcIixmdW5jdGlvbihlLHQpe24ucHVzaChlKXx8bi5faGVscGVyLnBhdXNlKCksciYmcih0KX0pLm9uKFwiZXJyb3JcIixmdW5jdGlvbihlKXtuLmVtaXQoXCJlcnJvclwiLGUpfSkub24oXCJlbmRcIixmdW5jdGlvbigpe24ucHVzaChudWxsKX0pfWUoXCIuLi91dGlsc1wiKS5pbmhlcml0cyhuLGkpLG4ucHJvdG90eXBlLl9yZWFkPWZ1bmN0aW9uKCl7dGhpcy5faGVscGVyLnJlc3VtZSgpfSx0LmV4cG9ydHM9bn0se1wiLi4vdXRpbHNcIjozMixcInJlYWRhYmxlLXN0cmVhbVwiOjE2fV0sMTQ6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt0LmV4cG9ydHM9e2lzTm9kZTpcInVuZGVmaW5lZFwiIT10eXBlb2YgQnVmZmVyLG5ld0J1ZmZlckZyb206ZnVuY3Rpb24oZSx0KXtpZihCdWZmZXIuZnJvbSYmQnVmZmVyLmZyb20hPT1VaW50OEFycmF5LmZyb20pcmV0dXJuIEJ1ZmZlci5mcm9tKGUsdCk7aWYoXCJudW1iZXJcIj09dHlwZW9mIGUpdGhyb3cgbmV3IEVycm9yKCdUaGUgXCJkYXRhXCIgYXJndW1lbnQgbXVzdCBub3QgYmUgYSBudW1iZXInKTtyZXR1cm4gbmV3IEJ1ZmZlcihlLHQpfSxhbGxvY0J1ZmZlcjpmdW5jdGlvbihlKXtpZihCdWZmZXIuYWxsb2MpcmV0dXJuIEJ1ZmZlci5hbGxvYyhlKTt2YXIgdD1uZXcgQnVmZmVyKGUpO3JldHVybiB0LmZpbGwoMCksdH0saXNCdWZmZXI6ZnVuY3Rpb24oZSl7cmV0dXJuIEJ1ZmZlci5pc0J1ZmZlcihlKX0saXNTdHJlYW06ZnVuY3Rpb24oZSl7cmV0dXJuIGUmJlwiZnVuY3Rpb25cIj09dHlwZW9mIGUub24mJlwiZnVuY3Rpb25cIj09dHlwZW9mIGUucGF1c2UmJlwiZnVuY3Rpb25cIj09dHlwZW9mIGUucmVzdW1lfX19LHt9XSwxNTpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHMoZSx0LHIpe3ZhciBuLGk9dS5nZXRUeXBlT2YodCkscz11LmV4dGVuZChyfHx7fSxmKTtzLmRhdGU9cy5kYXRlfHxuZXcgRGF0ZSxudWxsIT09cy5jb21wcmVzc2lvbiYmKHMuY29tcHJlc3Npb249cy5jb21wcmVzc2lvbi50b1VwcGVyQ2FzZSgpKSxcInN0cmluZ1wiPT10eXBlb2Ygcy51bml4UGVybWlzc2lvbnMmJihzLnVuaXhQZXJtaXNzaW9ucz1wYXJzZUludChzLnVuaXhQZXJtaXNzaW9ucyw4KSkscy51bml4UGVybWlzc2lvbnMmJjE2Mzg0JnMudW5peFBlcm1pc3Npb25zJiYocy5kaXI9ITApLHMuZG9zUGVybWlzc2lvbnMmJjE2JnMuZG9zUGVybWlzc2lvbnMmJihzLmRpcj0hMCkscy5kaXImJihlPWcoZSkpLHMuY3JlYXRlRm9sZGVycyYmKG49XyhlKSkmJmIuY2FsbCh0aGlzLG4sITApO3ZhciBhPVwic3RyaW5nXCI9PT1pJiYhMT09PXMuYmluYXJ5JiYhMT09PXMuYmFzZTY0O3ImJnZvaWQgMCE9PXIuYmluYXJ5fHwocy5iaW5hcnk9IWEpLCh0IGluc3RhbmNlb2YgYyYmMD09PXQudW5jb21wcmVzc2VkU2l6ZXx8cy5kaXJ8fCF0fHwwPT09dC5sZW5ndGgpJiYocy5iYXNlNjQ9ITEscy5iaW5hcnk9ITAsdD1cIlwiLHMuY29tcHJlc3Npb249XCJTVE9SRVwiLGk9XCJzdHJpbmdcIik7dmFyIG89bnVsbDtvPXQgaW5zdGFuY2VvZiBjfHx0IGluc3RhbmNlb2YgbD90OnAuaXNOb2RlJiZwLmlzU3RyZWFtKHQpP25ldyBtKGUsdCk6dS5wcmVwYXJlQ29udGVudChlLHQscy5iaW5hcnkscy5vcHRpbWl6ZWRCaW5hcnlTdHJpbmcscy5iYXNlNjQpO3ZhciBoPW5ldyBkKGUsbyxzKTt0aGlzLmZpbGVzW2VdPWh9dmFyIGk9ZShcIi4vdXRmOFwiKSx1PWUoXCIuL3V0aWxzXCIpLGw9ZShcIi4vc3RyZWFtL0dlbmVyaWNXb3JrZXJcIiksYT1lKFwiLi9zdHJlYW0vU3RyZWFtSGVscGVyXCIpLGY9ZShcIi4vZGVmYXVsdHNcIiksYz1lKFwiLi9jb21wcmVzc2VkT2JqZWN0XCIpLGQ9ZShcIi4vemlwT2JqZWN0XCIpLG89ZShcIi4vZ2VuZXJhdGVcIikscD1lKFwiLi9ub2RlanNVdGlsc1wiKSxtPWUoXCIuL25vZGVqcy9Ob2RlanNTdHJlYW1JbnB1dEFkYXB0ZXJcIiksXz1mdW5jdGlvbihlKXtcIi9cIj09PWUuc2xpY2UoLTEpJiYoZT1lLnN1YnN0cmluZygwLGUubGVuZ3RoLTEpKTt2YXIgdD1lLmxhc3RJbmRleE9mKFwiL1wiKTtyZXR1cm4gMDx0P2Uuc3Vic3RyaW5nKDAsdCk6XCJcIn0sZz1mdW5jdGlvbihlKXtyZXR1cm5cIi9cIiE9PWUuc2xpY2UoLTEpJiYoZSs9XCIvXCIpLGV9LGI9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gdD12b2lkIDAhPT10P3Q6Zi5jcmVhdGVGb2xkZXJzLGU9ZyhlKSx0aGlzLmZpbGVzW2VdfHxzLmNhbGwodGhpcyxlLG51bGwse2RpcjohMCxjcmVhdGVGb2xkZXJzOnR9KSx0aGlzLmZpbGVzW2VdfTtmdW5jdGlvbiBoKGUpe3JldHVyblwiW29iamVjdCBSZWdFeHBdXCI9PT1PYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZSl9dmFyIG49e2xvYWQ6ZnVuY3Rpb24oKXt0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIG1ldGhvZCBoYXMgYmVlbiByZW1vdmVkIGluIEpTWmlwIDMuMCwgcGxlYXNlIGNoZWNrIHRoZSB1cGdyYWRlIGd1aWRlLlwiKX0sZm9yRWFjaDpmdW5jdGlvbihlKXt2YXIgdCxyLG47Zm9yKHQgaW4gdGhpcy5maWxlcyluPXRoaXMuZmlsZXNbdF0sKHI9dC5zbGljZSh0aGlzLnJvb3QubGVuZ3RoLHQubGVuZ3RoKSkmJnQuc2xpY2UoMCx0aGlzLnJvb3QubGVuZ3RoKT09PXRoaXMucm9vdCYmZShyLG4pfSxmaWx0ZXI6ZnVuY3Rpb24ocil7dmFyIG49W107cmV0dXJuIHRoaXMuZm9yRWFjaChmdW5jdGlvbihlLHQpe3IoZSx0KSYmbi5wdXNoKHQpfSksbn0sZmlsZTpmdW5jdGlvbihlLHQscil7aWYoMSE9PWFyZ3VtZW50cy5sZW5ndGgpcmV0dXJuIGU9dGhpcy5yb290K2Uscy5jYWxsKHRoaXMsZSx0LHIpLHRoaXM7aWYoaChlKSl7dmFyIG49ZTtyZXR1cm4gdGhpcy5maWx0ZXIoZnVuY3Rpb24oZSx0KXtyZXR1cm4hdC5kaXImJm4udGVzdChlKX0pfXZhciBpPXRoaXMuZmlsZXNbdGhpcy5yb290K2VdO3JldHVybiBpJiYhaS5kaXI/aTpudWxsfSxmb2xkZXI6ZnVuY3Rpb24ocil7aWYoIXIpcmV0dXJuIHRoaXM7aWYoaChyKSlyZXR1cm4gdGhpcy5maWx0ZXIoZnVuY3Rpb24oZSx0KXtyZXR1cm4gdC5kaXImJnIudGVzdChlKX0pO3ZhciBlPXRoaXMucm9vdCtyLHQ9Yi5jYWxsKHRoaXMsZSksbj10aGlzLmNsb25lKCk7cmV0dXJuIG4ucm9vdD10Lm5hbWUsbn0scmVtb3ZlOmZ1bmN0aW9uKHIpe3I9dGhpcy5yb290K3I7dmFyIGU9dGhpcy5maWxlc1tyXTtpZihlfHwoXCIvXCIhPT1yLnNsaWNlKC0xKSYmKHIrPVwiL1wiKSxlPXRoaXMuZmlsZXNbcl0pLGUmJiFlLmRpcilkZWxldGUgdGhpcy5maWxlc1tyXTtlbHNlIGZvcih2YXIgdD10aGlzLmZpbHRlcihmdW5jdGlvbihlLHQpe3JldHVybiB0Lm5hbWUuc2xpY2UoMCxyLmxlbmd0aCk9PT1yfSksbj0wO248dC5sZW5ndGg7bisrKWRlbGV0ZSB0aGlzLmZpbGVzW3Rbbl0ubmFtZV07cmV0dXJuIHRoaXN9LGdlbmVyYXRlOmZ1bmN0aW9uKCl7dGhyb3cgbmV3IEVycm9yKFwiVGhpcyBtZXRob2QgaGFzIGJlZW4gcmVtb3ZlZCBpbiBKU1ppcCAzLjAsIHBsZWFzZSBjaGVjayB0aGUgdXBncmFkZSBndWlkZS5cIil9LGdlbmVyYXRlSW50ZXJuYWxTdHJlYW06ZnVuY3Rpb24oZSl7dmFyIHQscj17fTt0cnl7aWYoKHI9dS5leHRlbmQoZXx8e30se3N0cmVhbUZpbGVzOiExLGNvbXByZXNzaW9uOlwiU1RPUkVcIixjb21wcmVzc2lvbk9wdGlvbnM6bnVsbCx0eXBlOlwiXCIscGxhdGZvcm06XCJET1NcIixjb21tZW50Om51bGwsbWltZVR5cGU6XCJhcHBsaWNhdGlvbi96aXBcIixlbmNvZGVGaWxlTmFtZTppLnV0ZjhlbmNvZGV9KSkudHlwZT1yLnR5cGUudG9Mb3dlckNhc2UoKSxyLmNvbXByZXNzaW9uPXIuY29tcHJlc3Npb24udG9VcHBlckNhc2UoKSxcImJpbmFyeXN0cmluZ1wiPT09ci50eXBlJiYoci50eXBlPVwic3RyaW5nXCIpLCFyLnR5cGUpdGhyb3cgbmV3IEVycm9yKFwiTm8gb3V0cHV0IHR5cGUgc3BlY2lmaWVkLlwiKTt1LmNoZWNrU3VwcG9ydChyLnR5cGUpLFwiZGFyd2luXCIhPT1yLnBsYXRmb3JtJiZcImZyZWVic2RcIiE9PXIucGxhdGZvcm0mJlwibGludXhcIiE9PXIucGxhdGZvcm0mJlwic3Vub3NcIiE9PXIucGxhdGZvcm18fChyLnBsYXRmb3JtPVwiVU5JWFwiKSxcIndpbjMyXCI9PT1yLnBsYXRmb3JtJiYoci5wbGF0Zm9ybT1cIkRPU1wiKTt2YXIgbj1yLmNvbW1lbnR8fHRoaXMuY29tbWVudHx8XCJcIjt0PW8uZ2VuZXJhdGVXb3JrZXIodGhpcyxyLG4pfWNhdGNoKGUpeyh0PW5ldyBsKFwiZXJyb3JcIikpLmVycm9yKGUpfXJldHVybiBuZXcgYSh0LHIudHlwZXx8XCJzdHJpbmdcIixyLm1pbWVUeXBlKX0sZ2VuZXJhdGVBc3luYzpmdW5jdGlvbihlLHQpe3JldHVybiB0aGlzLmdlbmVyYXRlSW50ZXJuYWxTdHJlYW0oZSkuYWNjdW11bGF0ZSh0KX0sZ2VuZXJhdGVOb2RlU3RyZWFtOmZ1bmN0aW9uKGUsdCl7cmV0dXJuKGU9ZXx8e30pLnR5cGV8fChlLnR5cGU9XCJub2RlYnVmZmVyXCIpLHRoaXMuZ2VuZXJhdGVJbnRlcm5hbFN0cmVhbShlKS50b05vZGVqc1N0cmVhbSh0KX19O3QuZXhwb3J0cz1ufSx7XCIuL2NvbXByZXNzZWRPYmplY3RcIjoyLFwiLi9kZWZhdWx0c1wiOjUsXCIuL2dlbmVyYXRlXCI6OSxcIi4vbm9kZWpzL05vZGVqc1N0cmVhbUlucHV0QWRhcHRlclwiOjEyLFwiLi9ub2RlanNVdGlsc1wiOjE0LFwiLi9zdHJlYW0vR2VuZXJpY1dvcmtlclwiOjI4LFwiLi9zdHJlYW0vU3RyZWFtSGVscGVyXCI6MjksXCIuL3V0ZjhcIjozMSxcIi4vdXRpbHNcIjozMixcIi4vemlwT2JqZWN0XCI6MzV9XSwxNjpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3QuZXhwb3J0cz1lKFwic3RyZWFtXCIpfSx7c3RyZWFtOnZvaWQgMH1dLDE3OltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7dmFyIG49ZShcIi4vRGF0YVJlYWRlclwiKTtmdW5jdGlvbiBpKGUpe24uY2FsbCh0aGlzLGUpO2Zvcih2YXIgdD0wO3Q8dGhpcy5kYXRhLmxlbmd0aDt0KyspZVt0XT0yNTUmZVt0XX1lKFwiLi4vdXRpbHNcIikuaW5oZXJpdHMoaSxuKSxpLnByb3RvdHlwZS5ieXRlQXQ9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMuZGF0YVt0aGlzLnplcm8rZV19LGkucHJvdG90eXBlLmxhc3RJbmRleE9mU2lnbmF0dXJlPWZ1bmN0aW9uKGUpe2Zvcih2YXIgdD1lLmNoYXJDb2RlQXQoMCkscj1lLmNoYXJDb2RlQXQoMSksbj1lLmNoYXJDb2RlQXQoMiksaT1lLmNoYXJDb2RlQXQoMykscz10aGlzLmxlbmd0aC00OzA8PXM7LS1zKWlmKHRoaXMuZGF0YVtzXT09PXQmJnRoaXMuZGF0YVtzKzFdPT09ciYmdGhpcy5kYXRhW3MrMl09PT1uJiZ0aGlzLmRhdGFbcyszXT09PWkpcmV0dXJuIHMtdGhpcy56ZXJvO3JldHVybi0xfSxpLnByb3RvdHlwZS5yZWFkQW5kQ2hlY2tTaWduYXR1cmU9ZnVuY3Rpb24oZSl7dmFyIHQ9ZS5jaGFyQ29kZUF0KDApLHI9ZS5jaGFyQ29kZUF0KDEpLG49ZS5jaGFyQ29kZUF0KDIpLGk9ZS5jaGFyQ29kZUF0KDMpLHM9dGhpcy5yZWFkRGF0YSg0KTtyZXR1cm4gdD09PXNbMF0mJnI9PT1zWzFdJiZuPT09c1syXSYmaT09PXNbM119LGkucHJvdG90eXBlLnJlYWREYXRhPWZ1bmN0aW9uKGUpe2lmKHRoaXMuY2hlY2tPZmZzZXQoZSksMD09PWUpcmV0dXJuW107dmFyIHQ9dGhpcy5kYXRhLnNsaWNlKHRoaXMuemVybyt0aGlzLmluZGV4LHRoaXMuemVybyt0aGlzLmluZGV4K2UpO3JldHVybiB0aGlzLmluZGV4Kz1lLHR9LHQuZXhwb3J0cz1pfSx7XCIuLi91dGlsc1wiOjMyLFwiLi9EYXRhUmVhZGVyXCI6MTh9XSwxODpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3ZhciBuPWUoXCIuLi91dGlsc1wiKTtmdW5jdGlvbiBpKGUpe3RoaXMuZGF0YT1lLHRoaXMubGVuZ3RoPWUubGVuZ3RoLHRoaXMuaW5kZXg9MCx0aGlzLnplcm89MH1pLnByb3RvdHlwZT17Y2hlY2tPZmZzZXQ6ZnVuY3Rpb24oZSl7dGhpcy5jaGVja0luZGV4KHRoaXMuaW5kZXgrZSl9LGNoZWNrSW5kZXg6ZnVuY3Rpb24oZSl7aWYodGhpcy5sZW5ndGg8dGhpcy56ZXJvK2V8fGU8MCl0aHJvdyBuZXcgRXJyb3IoXCJFbmQgb2YgZGF0YSByZWFjaGVkIChkYXRhIGxlbmd0aCA9IFwiK3RoaXMubGVuZ3RoK1wiLCBhc2tlZCBpbmRleCA9IFwiK2UrXCIpLiBDb3JydXB0ZWQgemlwID9cIil9LHNldEluZGV4OmZ1bmN0aW9uKGUpe3RoaXMuY2hlY2tJbmRleChlKSx0aGlzLmluZGV4PWV9LHNraXA6ZnVuY3Rpb24oZSl7dGhpcy5zZXRJbmRleCh0aGlzLmluZGV4K2UpfSxieXRlQXQ6ZnVuY3Rpb24oKXt9LHJlYWRJbnQ6ZnVuY3Rpb24oZSl7dmFyIHQscj0wO2Zvcih0aGlzLmNoZWNrT2Zmc2V0KGUpLHQ9dGhpcy5pbmRleCtlLTE7dD49dGhpcy5pbmRleDt0LS0pcj0ocjw8OCkrdGhpcy5ieXRlQXQodCk7cmV0dXJuIHRoaXMuaW5kZXgrPWUscn0scmVhZFN0cmluZzpmdW5jdGlvbihlKXtyZXR1cm4gbi50cmFuc2Zvcm1UbyhcInN0cmluZ1wiLHRoaXMucmVhZERhdGEoZSkpfSxyZWFkRGF0YTpmdW5jdGlvbigpe30sbGFzdEluZGV4T2ZTaWduYXR1cmU6ZnVuY3Rpb24oKXt9LHJlYWRBbmRDaGVja1NpZ25hdHVyZTpmdW5jdGlvbigpe30scmVhZERhdGU6ZnVuY3Rpb24oKXt2YXIgZT10aGlzLnJlYWRJbnQoNCk7cmV0dXJuIG5ldyBEYXRlKERhdGUuVVRDKDE5ODArKGU+PjI1JjEyNyksKGU+PjIxJjE1KS0xLGU+PjE2JjMxLGU+PjExJjMxLGU+PjUmNjMsKDMxJmUpPDwxKSl9fSx0LmV4cG9ydHM9aX0se1wiLi4vdXRpbHNcIjozMn1dLDE5OltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7dmFyIG49ZShcIi4vVWludDhBcnJheVJlYWRlclwiKTtmdW5jdGlvbiBpKGUpe24uY2FsbCh0aGlzLGUpfWUoXCIuLi91dGlsc1wiKS5pbmhlcml0cyhpLG4pLGkucHJvdG90eXBlLnJlYWREYXRhPWZ1bmN0aW9uKGUpe3RoaXMuY2hlY2tPZmZzZXQoZSk7dmFyIHQ9dGhpcy5kYXRhLnNsaWNlKHRoaXMuemVybyt0aGlzLmluZGV4LHRoaXMuemVybyt0aGlzLmluZGV4K2UpO3JldHVybiB0aGlzLmluZGV4Kz1lLHR9LHQuZXhwb3J0cz1pfSx7XCIuLi91dGlsc1wiOjMyLFwiLi9VaW50OEFycmF5UmVhZGVyXCI6MjF9XSwyMDpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3ZhciBuPWUoXCIuL0RhdGFSZWFkZXJcIik7ZnVuY3Rpb24gaShlKXtuLmNhbGwodGhpcyxlKX1lKFwiLi4vdXRpbHNcIikuaW5oZXJpdHMoaSxuKSxpLnByb3RvdHlwZS5ieXRlQXQ9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMuZGF0YS5jaGFyQ29kZUF0KHRoaXMuemVybytlKX0saS5wcm90b3R5cGUubGFzdEluZGV4T2ZTaWduYXR1cmU9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMuZGF0YS5sYXN0SW5kZXhPZihlKS10aGlzLnplcm99LGkucHJvdG90eXBlLnJlYWRBbmRDaGVja1NpZ25hdHVyZT1mdW5jdGlvbihlKXtyZXR1cm4gZT09PXRoaXMucmVhZERhdGEoNCl9LGkucHJvdG90eXBlLnJlYWREYXRhPWZ1bmN0aW9uKGUpe3RoaXMuY2hlY2tPZmZzZXQoZSk7dmFyIHQ9dGhpcy5kYXRhLnNsaWNlKHRoaXMuemVybyt0aGlzLmluZGV4LHRoaXMuemVybyt0aGlzLmluZGV4K2UpO3JldHVybiB0aGlzLmluZGV4Kz1lLHR9LHQuZXhwb3J0cz1pfSx7XCIuLi91dGlsc1wiOjMyLFwiLi9EYXRhUmVhZGVyXCI6MTh9XSwyMTpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3ZhciBuPWUoXCIuL0FycmF5UmVhZGVyXCIpO2Z1bmN0aW9uIGkoZSl7bi5jYWxsKHRoaXMsZSl9ZShcIi4uL3V0aWxzXCIpLmluaGVyaXRzKGksbiksaS5wcm90b3R5cGUucmVhZERhdGE9ZnVuY3Rpb24oZSl7aWYodGhpcy5jaGVja09mZnNldChlKSwwPT09ZSlyZXR1cm4gbmV3IFVpbnQ4QXJyYXkoMCk7dmFyIHQ9dGhpcy5kYXRhLnN1YmFycmF5KHRoaXMuemVybyt0aGlzLmluZGV4LHRoaXMuemVybyt0aGlzLmluZGV4K2UpO3JldHVybiB0aGlzLmluZGV4Kz1lLHR9LHQuZXhwb3J0cz1pfSx7XCIuLi91dGlsc1wiOjMyLFwiLi9BcnJheVJlYWRlclwiOjE3fV0sMjI6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt2YXIgbj1lKFwiLi4vdXRpbHNcIiksaT1lKFwiLi4vc3VwcG9ydFwiKSxzPWUoXCIuL0FycmF5UmVhZGVyXCIpLGE9ZShcIi4vU3RyaW5nUmVhZGVyXCIpLG89ZShcIi4vTm9kZUJ1ZmZlclJlYWRlclwiKSxoPWUoXCIuL1VpbnQ4QXJyYXlSZWFkZXJcIik7dC5leHBvcnRzPWZ1bmN0aW9uKGUpe3ZhciB0PW4uZ2V0VHlwZU9mKGUpO3JldHVybiBuLmNoZWNrU3VwcG9ydCh0KSxcInN0cmluZ1wiIT09dHx8aS51aW50OGFycmF5P1wibm9kZWJ1ZmZlclwiPT09dD9uZXcgbyhlKTppLnVpbnQ4YXJyYXk/bmV3IGgobi50cmFuc2Zvcm1UbyhcInVpbnQ4YXJyYXlcIixlKSk6bmV3IHMobi50cmFuc2Zvcm1UbyhcImFycmF5XCIsZSkpOm5ldyBhKGUpfX0se1wiLi4vc3VwcG9ydFwiOjMwLFwiLi4vdXRpbHNcIjozMixcIi4vQXJyYXlSZWFkZXJcIjoxNyxcIi4vTm9kZUJ1ZmZlclJlYWRlclwiOjE5LFwiLi9TdHJpbmdSZWFkZXJcIjoyMCxcIi4vVWludDhBcnJheVJlYWRlclwiOjIxfV0sMjM6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjtyLkxPQ0FMX0ZJTEVfSEVBREVSPVwiUEtcdTAwMDNcdTAwMDRcIixyLkNFTlRSQUxfRklMRV9IRUFERVI9XCJQS1x1MDAwMVx1MDAwMlwiLHIuQ0VOVFJBTF9ESVJFQ1RPUllfRU5EPVwiUEtcdTAwMDVcdTAwMDZcIixyLlpJUDY0X0NFTlRSQUxfRElSRUNUT1JZX0xPQ0FUT1I9XCJQS1x1MDAwNlx1MDAwN1wiLHIuWklQNjRfQ0VOVFJBTF9ESVJFQ1RPUllfRU5EPVwiUEtcdTAwMDZcdTAwMDZcIixyLkRBVEFfREVTQ1JJUFRPUj1cIlBLXHUwMDA3XFxiXCJ9LHt9XSwyNDpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3ZhciBuPWUoXCIuL0dlbmVyaWNXb3JrZXJcIiksaT1lKFwiLi4vdXRpbHNcIik7ZnVuY3Rpb24gcyhlKXtuLmNhbGwodGhpcyxcIkNvbnZlcnRXb3JrZXIgdG8gXCIrZSksdGhpcy5kZXN0VHlwZT1lfWkuaW5oZXJpdHMocyxuKSxzLnByb3RvdHlwZS5wcm9jZXNzQ2h1bms9ZnVuY3Rpb24oZSl7dGhpcy5wdXNoKHtkYXRhOmkudHJhbnNmb3JtVG8odGhpcy5kZXN0VHlwZSxlLmRhdGEpLG1ldGE6ZS5tZXRhfSl9LHQuZXhwb3J0cz1zfSx7XCIuLi91dGlsc1wiOjMyLFwiLi9HZW5lcmljV29ya2VyXCI6Mjh9XSwyNTpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3ZhciBuPWUoXCIuL0dlbmVyaWNXb3JrZXJcIiksaT1lKFwiLi4vY3JjMzJcIik7ZnVuY3Rpb24gcygpe24uY2FsbCh0aGlzLFwiQ3JjMzJQcm9iZVwiKSx0aGlzLndpdGhTdHJlYW1JbmZvKFwiY3JjMzJcIiwwKX1lKFwiLi4vdXRpbHNcIikuaW5oZXJpdHMocyxuKSxzLnByb3RvdHlwZS5wcm9jZXNzQ2h1bms9ZnVuY3Rpb24oZSl7dGhpcy5zdHJlYW1JbmZvLmNyYzMyPWkoZS5kYXRhLHRoaXMuc3RyZWFtSW5mby5jcmMzMnx8MCksdGhpcy5wdXNoKGUpfSx0LmV4cG9ydHM9c30se1wiLi4vY3JjMzJcIjo0LFwiLi4vdXRpbHNcIjozMixcIi4vR2VuZXJpY1dvcmtlclwiOjI4fV0sMjY6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt2YXIgbj1lKFwiLi4vdXRpbHNcIiksaT1lKFwiLi9HZW5lcmljV29ya2VyXCIpO2Z1bmN0aW9uIHMoZSl7aS5jYWxsKHRoaXMsXCJEYXRhTGVuZ3RoUHJvYmUgZm9yIFwiK2UpLHRoaXMucHJvcE5hbWU9ZSx0aGlzLndpdGhTdHJlYW1JbmZvKGUsMCl9bi5pbmhlcml0cyhzLGkpLHMucHJvdG90eXBlLnByb2Nlc3NDaHVuaz1mdW5jdGlvbihlKXtpZihlKXt2YXIgdD10aGlzLnN0cmVhbUluZm9bdGhpcy5wcm9wTmFtZV18fDA7dGhpcy5zdHJlYW1JbmZvW3RoaXMucHJvcE5hbWVdPXQrZS5kYXRhLmxlbmd0aH1pLnByb3RvdHlwZS5wcm9jZXNzQ2h1bmsuY2FsbCh0aGlzLGUpfSx0LmV4cG9ydHM9c30se1wiLi4vdXRpbHNcIjozMixcIi4vR2VuZXJpY1dvcmtlclwiOjI4fV0sMjc6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt2YXIgbj1lKFwiLi4vdXRpbHNcIiksaT1lKFwiLi9HZW5lcmljV29ya2VyXCIpO2Z1bmN0aW9uIHMoZSl7aS5jYWxsKHRoaXMsXCJEYXRhV29ya2VyXCIpO3ZhciB0PXRoaXM7dGhpcy5kYXRhSXNSZWFkeT0hMSx0aGlzLmluZGV4PTAsdGhpcy5tYXg9MCx0aGlzLmRhdGE9bnVsbCx0aGlzLnR5cGU9XCJcIix0aGlzLl90aWNrU2NoZWR1bGVkPSExLGUudGhlbihmdW5jdGlvbihlKXt0LmRhdGFJc1JlYWR5PSEwLHQuZGF0YT1lLHQubWF4PWUmJmUubGVuZ3RofHwwLHQudHlwZT1uLmdldFR5cGVPZihlKSx0LmlzUGF1c2VkfHx0Ll90aWNrQW5kUmVwZWF0KCl9LGZ1bmN0aW9uKGUpe3QuZXJyb3IoZSl9KX1uLmluaGVyaXRzKHMsaSkscy5wcm90b3R5cGUuY2xlYW5VcD1mdW5jdGlvbigpe2kucHJvdG90eXBlLmNsZWFuVXAuY2FsbCh0aGlzKSx0aGlzLmRhdGE9bnVsbH0scy5wcm90b3R5cGUucmVzdW1lPWZ1bmN0aW9uKCl7cmV0dXJuISFpLnByb3RvdHlwZS5yZXN1bWUuY2FsbCh0aGlzKSYmKCF0aGlzLl90aWNrU2NoZWR1bGVkJiZ0aGlzLmRhdGFJc1JlYWR5JiYodGhpcy5fdGlja1NjaGVkdWxlZD0hMCxuLmRlbGF5KHRoaXMuX3RpY2tBbmRSZXBlYXQsW10sdGhpcykpLCEwKX0scy5wcm90b3R5cGUuX3RpY2tBbmRSZXBlYXQ9ZnVuY3Rpb24oKXt0aGlzLl90aWNrU2NoZWR1bGVkPSExLHRoaXMuaXNQYXVzZWR8fHRoaXMuaXNGaW5pc2hlZHx8KHRoaXMuX3RpY2soKSx0aGlzLmlzRmluaXNoZWR8fChuLmRlbGF5KHRoaXMuX3RpY2tBbmRSZXBlYXQsW10sdGhpcyksdGhpcy5fdGlja1NjaGVkdWxlZD0hMCkpfSxzLnByb3RvdHlwZS5fdGljaz1mdW5jdGlvbigpe2lmKHRoaXMuaXNQYXVzZWR8fHRoaXMuaXNGaW5pc2hlZClyZXR1cm4hMTt2YXIgZT1udWxsLHQ9TWF0aC5taW4odGhpcy5tYXgsdGhpcy5pbmRleCsxNjM4NCk7aWYodGhpcy5pbmRleD49dGhpcy5tYXgpcmV0dXJuIHRoaXMuZW5kKCk7c3dpdGNoKHRoaXMudHlwZSl7Y2FzZVwic3RyaW5nXCI6ZT10aGlzLmRhdGEuc3Vic3RyaW5nKHRoaXMuaW5kZXgsdCk7YnJlYWs7Y2FzZVwidWludDhhcnJheVwiOmU9dGhpcy5kYXRhLnN1YmFycmF5KHRoaXMuaW5kZXgsdCk7YnJlYWs7Y2FzZVwiYXJyYXlcIjpjYXNlXCJub2RlYnVmZmVyXCI6ZT10aGlzLmRhdGEuc2xpY2UodGhpcy5pbmRleCx0KX1yZXR1cm4gdGhpcy5pbmRleD10LHRoaXMucHVzaCh7ZGF0YTplLG1ldGE6e3BlcmNlbnQ6dGhpcy5tYXg/dGhpcy5pbmRleC90aGlzLm1heCoxMDA6MH19KX0sdC5leHBvcnRzPXN9LHtcIi4uL3V0aWxzXCI6MzIsXCIuL0dlbmVyaWNXb3JrZXJcIjoyOH1dLDI4OltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gbihlKXt0aGlzLm5hbWU9ZXx8XCJkZWZhdWx0XCIsdGhpcy5zdHJlYW1JbmZvPXt9LHRoaXMuZ2VuZXJhdGVkRXJyb3I9bnVsbCx0aGlzLmV4dHJhU3RyZWFtSW5mbz17fSx0aGlzLmlzUGF1c2VkPSEwLHRoaXMuaXNGaW5pc2hlZD0hMSx0aGlzLmlzTG9ja2VkPSExLHRoaXMuX2xpc3RlbmVycz17ZGF0YTpbXSxlbmQ6W10sZXJyb3I6W119LHRoaXMucHJldmlvdXM9bnVsbH1uLnByb3RvdHlwZT17cHVzaDpmdW5jdGlvbihlKXt0aGlzLmVtaXQoXCJkYXRhXCIsZSl9LGVuZDpmdW5jdGlvbigpe2lmKHRoaXMuaXNGaW5pc2hlZClyZXR1cm4hMTt0aGlzLmZsdXNoKCk7dHJ5e3RoaXMuZW1pdChcImVuZFwiKSx0aGlzLmNsZWFuVXAoKSx0aGlzLmlzRmluaXNoZWQ9ITB9Y2F0Y2goZSl7dGhpcy5lbWl0KFwiZXJyb3JcIixlKX1yZXR1cm4hMH0sZXJyb3I6ZnVuY3Rpb24oZSl7cmV0dXJuIXRoaXMuaXNGaW5pc2hlZCYmKHRoaXMuaXNQYXVzZWQ/dGhpcy5nZW5lcmF0ZWRFcnJvcj1lOih0aGlzLmlzRmluaXNoZWQ9ITAsdGhpcy5lbWl0KFwiZXJyb3JcIixlKSx0aGlzLnByZXZpb3VzJiZ0aGlzLnByZXZpb3VzLmVycm9yKGUpLHRoaXMuY2xlYW5VcCgpKSwhMCl9LG9uOmZ1bmN0aW9uKGUsdCl7cmV0dXJuIHRoaXMuX2xpc3RlbmVyc1tlXS5wdXNoKHQpLHRoaXN9LGNsZWFuVXA6ZnVuY3Rpb24oKXt0aGlzLnN0cmVhbUluZm89dGhpcy5nZW5lcmF0ZWRFcnJvcj10aGlzLmV4dHJhU3RyZWFtSW5mbz1udWxsLHRoaXMuX2xpc3RlbmVycz1bXX0sZW1pdDpmdW5jdGlvbihlLHQpe2lmKHRoaXMuX2xpc3RlbmVyc1tlXSlmb3IodmFyIHI9MDtyPHRoaXMuX2xpc3RlbmVyc1tlXS5sZW5ndGg7cisrKXRoaXMuX2xpc3RlbmVyc1tlXVtyXS5jYWxsKHRoaXMsdCl9LHBpcGU6ZnVuY3Rpb24oZSl7cmV0dXJuIGUucmVnaXN0ZXJQcmV2aW91cyh0aGlzKX0scmVnaXN0ZXJQcmV2aW91czpmdW5jdGlvbihlKXtpZih0aGlzLmlzTG9ja2VkKXRocm93IG5ldyBFcnJvcihcIlRoZSBzdHJlYW0gJ1wiK3RoaXMrXCInIGhhcyBhbHJlYWR5IGJlZW4gdXNlZC5cIik7dGhpcy5zdHJlYW1JbmZvPWUuc3RyZWFtSW5mbyx0aGlzLm1lcmdlU3RyZWFtSW5mbygpLHRoaXMucHJldmlvdXM9ZTt2YXIgdD10aGlzO3JldHVybiBlLm9uKFwiZGF0YVwiLGZ1bmN0aW9uKGUpe3QucHJvY2Vzc0NodW5rKGUpfSksZS5vbihcImVuZFwiLGZ1bmN0aW9uKCl7dC5lbmQoKX0pLGUub24oXCJlcnJvclwiLGZ1bmN0aW9uKGUpe3QuZXJyb3IoZSl9KSx0aGlzfSxwYXVzZTpmdW5jdGlvbigpe3JldHVybiF0aGlzLmlzUGF1c2VkJiYhdGhpcy5pc0ZpbmlzaGVkJiYodGhpcy5pc1BhdXNlZD0hMCx0aGlzLnByZXZpb3VzJiZ0aGlzLnByZXZpb3VzLnBhdXNlKCksITApfSxyZXN1bWU6ZnVuY3Rpb24oKXtpZighdGhpcy5pc1BhdXNlZHx8dGhpcy5pc0ZpbmlzaGVkKXJldHVybiExO3ZhciBlPXRoaXMuaXNQYXVzZWQ9ITE7cmV0dXJuIHRoaXMuZ2VuZXJhdGVkRXJyb3ImJih0aGlzLmVycm9yKHRoaXMuZ2VuZXJhdGVkRXJyb3IpLGU9ITApLHRoaXMucHJldmlvdXMmJnRoaXMucHJldmlvdXMucmVzdW1lKCksIWV9LGZsdXNoOmZ1bmN0aW9uKCl7fSxwcm9jZXNzQ2h1bms6ZnVuY3Rpb24oZSl7dGhpcy5wdXNoKGUpfSx3aXRoU3RyZWFtSW5mbzpmdW5jdGlvbihlLHQpe3JldHVybiB0aGlzLmV4dHJhU3RyZWFtSW5mb1tlXT10LHRoaXMubWVyZ2VTdHJlYW1JbmZvKCksdGhpc30sbWVyZ2VTdHJlYW1JbmZvOmZ1bmN0aW9uKCl7Zm9yKHZhciBlIGluIHRoaXMuZXh0cmFTdHJlYW1JbmZvKU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0aGlzLmV4dHJhU3RyZWFtSW5mbyxlKSYmKHRoaXMuc3RyZWFtSW5mb1tlXT10aGlzLmV4dHJhU3RyZWFtSW5mb1tlXSl9LGxvY2s6ZnVuY3Rpb24oKXtpZih0aGlzLmlzTG9ja2VkKXRocm93IG5ldyBFcnJvcihcIlRoZSBzdHJlYW0gJ1wiK3RoaXMrXCInIGhhcyBhbHJlYWR5IGJlZW4gdXNlZC5cIik7dGhpcy5pc0xvY2tlZD0hMCx0aGlzLnByZXZpb3VzJiZ0aGlzLnByZXZpb3VzLmxvY2soKX0sdG9TdHJpbmc6ZnVuY3Rpb24oKXt2YXIgZT1cIldvcmtlciBcIit0aGlzLm5hbWU7cmV0dXJuIHRoaXMucHJldmlvdXM/dGhpcy5wcmV2aW91cytcIiAtPiBcIitlOmV9fSx0LmV4cG9ydHM9bn0se31dLDI5OltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7dmFyIGg9ZShcIi4uL3V0aWxzXCIpLGk9ZShcIi4vQ29udmVydFdvcmtlclwiKSxzPWUoXCIuL0dlbmVyaWNXb3JrZXJcIiksdT1lKFwiLi4vYmFzZTY0XCIpLG49ZShcIi4uL3N1cHBvcnRcIiksYT1lKFwiLi4vZXh0ZXJuYWxcIiksbz1udWxsO2lmKG4ubm9kZXN0cmVhbSl0cnl7bz1lKFwiLi4vbm9kZWpzL05vZGVqc1N0cmVhbU91dHB1dEFkYXB0ZXJcIil9Y2F0Y2goZSl7fWZ1bmN0aW9uIGwoZSxvKXtyZXR1cm4gbmV3IGEuUHJvbWlzZShmdW5jdGlvbih0LHIpe3ZhciBuPVtdLGk9ZS5faW50ZXJuYWxUeXBlLHM9ZS5fb3V0cHV0VHlwZSxhPWUuX21pbWVUeXBlO2Uub24oXCJkYXRhXCIsZnVuY3Rpb24oZSx0KXtuLnB1c2goZSksbyYmbyh0KX0pLm9uKFwiZXJyb3JcIixmdW5jdGlvbihlKXtuPVtdLHIoZSl9KS5vbihcImVuZFwiLGZ1bmN0aW9uKCl7dHJ5e3ZhciBlPWZ1bmN0aW9uKGUsdCxyKXtzd2l0Y2goZSl7Y2FzZVwiYmxvYlwiOnJldHVybiBoLm5ld0Jsb2IoaC50cmFuc2Zvcm1UbyhcImFycmF5YnVmZmVyXCIsdCkscik7Y2FzZVwiYmFzZTY0XCI6cmV0dXJuIHUuZW5jb2RlKHQpO2RlZmF1bHQ6cmV0dXJuIGgudHJhbnNmb3JtVG8oZSx0KX19KHMsZnVuY3Rpb24oZSx0KXt2YXIgcixuPTAsaT1udWxsLHM9MDtmb3Iocj0wO3I8dC5sZW5ndGg7cisrKXMrPXRbcl0ubGVuZ3RoO3N3aXRjaChlKXtjYXNlXCJzdHJpbmdcIjpyZXR1cm4gdC5qb2luKFwiXCIpO2Nhc2VcImFycmF5XCI6cmV0dXJuIEFycmF5LnByb3RvdHlwZS5jb25jYXQuYXBwbHkoW10sdCk7Y2FzZVwidWludDhhcnJheVwiOmZvcihpPW5ldyBVaW50OEFycmF5KHMpLHI9MDtyPHQubGVuZ3RoO3IrKylpLnNldCh0W3JdLG4pLG4rPXRbcl0ubGVuZ3RoO3JldHVybiBpO2Nhc2VcIm5vZGVidWZmZXJcIjpyZXR1cm4gQnVmZmVyLmNvbmNhdCh0KTtkZWZhdWx0OnRocm93IG5ldyBFcnJvcihcImNvbmNhdCA6IHVuc3VwcG9ydGVkIHR5cGUgJ1wiK2UrXCInXCIpfX0oaSxuKSxhKTt0KGUpfWNhdGNoKGUpe3IoZSl9bj1bXX0pLnJlc3VtZSgpfSl9ZnVuY3Rpb24gZihlLHQscil7dmFyIG49dDtzd2l0Y2godCl7Y2FzZVwiYmxvYlwiOmNhc2VcImFycmF5YnVmZmVyXCI6bj1cInVpbnQ4YXJyYXlcIjticmVhaztjYXNlXCJiYXNlNjRcIjpuPVwic3RyaW5nXCJ9dHJ5e3RoaXMuX2ludGVybmFsVHlwZT1uLHRoaXMuX291dHB1dFR5cGU9dCx0aGlzLl9taW1lVHlwZT1yLGguY2hlY2tTdXBwb3J0KG4pLHRoaXMuX3dvcmtlcj1lLnBpcGUobmV3IGkobikpLGUubG9jaygpfWNhdGNoKGUpe3RoaXMuX3dvcmtlcj1uZXcgcyhcImVycm9yXCIpLHRoaXMuX3dvcmtlci5lcnJvcihlKX19Zi5wcm90b3R5cGU9e2FjY3VtdWxhdGU6ZnVuY3Rpb24oZSl7cmV0dXJuIGwodGhpcyxlKX0sb246ZnVuY3Rpb24oZSx0KXt2YXIgcj10aGlzO3JldHVyblwiZGF0YVwiPT09ZT90aGlzLl93b3JrZXIub24oZSxmdW5jdGlvbihlKXt0LmNhbGwocixlLmRhdGEsZS5tZXRhKX0pOnRoaXMuX3dvcmtlci5vbihlLGZ1bmN0aW9uKCl7aC5kZWxheSh0LGFyZ3VtZW50cyxyKX0pLHRoaXN9LHJlc3VtZTpmdW5jdGlvbigpe3JldHVybiBoLmRlbGF5KHRoaXMuX3dvcmtlci5yZXN1bWUsW10sdGhpcy5fd29ya2VyKSx0aGlzfSxwYXVzZTpmdW5jdGlvbigpe3JldHVybiB0aGlzLl93b3JrZXIucGF1c2UoKSx0aGlzfSx0b05vZGVqc1N0cmVhbTpmdW5jdGlvbihlKXtpZihoLmNoZWNrU3VwcG9ydChcIm5vZGVzdHJlYW1cIiksXCJub2RlYnVmZmVyXCIhPT10aGlzLl9vdXRwdXRUeXBlKXRocm93IG5ldyBFcnJvcih0aGlzLl9vdXRwdXRUeXBlK1wiIGlzIG5vdCBzdXBwb3J0ZWQgYnkgdGhpcyBtZXRob2RcIik7cmV0dXJuIG5ldyBvKHRoaXMse29iamVjdE1vZGU6XCJub2RlYnVmZmVyXCIhPT10aGlzLl9vdXRwdXRUeXBlfSxlKX19LHQuZXhwb3J0cz1mfSx7XCIuLi9iYXNlNjRcIjoxLFwiLi4vZXh0ZXJuYWxcIjo2LFwiLi4vbm9kZWpzL05vZGVqc1N0cmVhbU91dHB1dEFkYXB0ZXJcIjoxMyxcIi4uL3N1cHBvcnRcIjozMCxcIi4uL3V0aWxzXCI6MzIsXCIuL0NvbnZlcnRXb3JrZXJcIjoyNCxcIi4vR2VuZXJpY1dvcmtlclwiOjI4fV0sMzA6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjtpZihyLmJhc2U2ND0hMCxyLmFycmF5PSEwLHIuc3RyaW5nPSEwLHIuYXJyYXlidWZmZXI9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIEFycmF5QnVmZmVyJiZcInVuZGVmaW5lZFwiIT10eXBlb2YgVWludDhBcnJheSxyLm5vZGVidWZmZXI9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIEJ1ZmZlcixyLnVpbnQ4YXJyYXk9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIFVpbnQ4QXJyYXksXCJ1bmRlZmluZWRcIj09dHlwZW9mIEFycmF5QnVmZmVyKXIuYmxvYj0hMTtlbHNle3ZhciBuPW5ldyBBcnJheUJ1ZmZlcigwKTt0cnl7ci5ibG9iPTA9PT1uZXcgQmxvYihbbl0se3R5cGU6XCJhcHBsaWNhdGlvbi96aXBcIn0pLnNpemV9Y2F0Y2goZSl7dHJ5e3ZhciBpPW5ldyhzZWxmLkJsb2JCdWlsZGVyfHxzZWxmLldlYktpdEJsb2JCdWlsZGVyfHxzZWxmLk1vekJsb2JCdWlsZGVyfHxzZWxmLk1TQmxvYkJ1aWxkZXIpO2kuYXBwZW5kKG4pLHIuYmxvYj0wPT09aS5nZXRCbG9iKFwiYXBwbGljYXRpb24vemlwXCIpLnNpemV9Y2F0Y2goZSl7ci5ibG9iPSExfX19dHJ5e3Iubm9kZXN0cmVhbT0hIWUoXCJyZWFkYWJsZS1zdHJlYW1cIikuUmVhZGFibGV9Y2F0Y2goZSl7ci5ub2Rlc3RyZWFtPSExfX0se1wicmVhZGFibGUtc3RyZWFtXCI6MTZ9XSwzMTpbZnVuY3Rpb24oZSx0LHMpe1widXNlIHN0cmljdFwiO2Zvcih2YXIgbz1lKFwiLi91dGlsc1wiKSxoPWUoXCIuL3N1cHBvcnRcIikscj1lKFwiLi9ub2RlanNVdGlsc1wiKSxuPWUoXCIuL3N0cmVhbS9HZW5lcmljV29ya2VyXCIpLHU9bmV3IEFycmF5KDI1NiksaT0wO2k8MjU2O2krKyl1W2ldPTI1Mjw9aT82OjI0ODw9aT81OjI0MDw9aT80OjIyNDw9aT8zOjE5Mjw9aT8yOjE7dVsyNTRdPXVbMjU0XT0xO2Z1bmN0aW9uIGEoKXtuLmNhbGwodGhpcyxcInV0Zi04IGRlY29kZVwiKSx0aGlzLmxlZnRPdmVyPW51bGx9ZnVuY3Rpb24gbCgpe24uY2FsbCh0aGlzLFwidXRmLTggZW5jb2RlXCIpfXMudXRmOGVuY29kZT1mdW5jdGlvbihlKXtyZXR1cm4gaC5ub2RlYnVmZmVyP3IubmV3QnVmZmVyRnJvbShlLFwidXRmLThcIik6ZnVuY3Rpb24oZSl7dmFyIHQscixuLGkscyxhPWUubGVuZ3RoLG89MDtmb3IoaT0wO2k8YTtpKyspNTUyOTY9PSg2NDUxMiYocj1lLmNoYXJDb2RlQXQoaSkpKSYmaSsxPGEmJjU2MzIwPT0oNjQ1MTImKG49ZS5jaGFyQ29kZUF0KGkrMSkpKSYmKHI9NjU1MzYrKHItNTUyOTY8PDEwKSsobi01NjMyMCksaSsrKSxvKz1yPDEyOD8xOnI8MjA0OD8yOnI8NjU1MzY/Mzo0O2Zvcih0PWgudWludDhhcnJheT9uZXcgVWludDhBcnJheShvKTpuZXcgQXJyYXkobyksaT1zPTA7czxvO2krKyk1NTI5Nj09KDY0NTEyJihyPWUuY2hhckNvZGVBdChpKSkpJiZpKzE8YSYmNTYzMjA9PSg2NDUxMiYobj1lLmNoYXJDb2RlQXQoaSsxKSkpJiYocj02NTUzNisoci01NTI5Njw8MTApKyhuLTU2MzIwKSxpKyspLHI8MTI4P3RbcysrXT1yOihyPDIwNDg/dFtzKytdPTE5MnxyPj4+Njoocjw2NTUzNj90W3MrK109MjI0fHI+Pj4xMjoodFtzKytdPTI0MHxyPj4+MTgsdFtzKytdPTEyOHxyPj4+MTImNjMpLHRbcysrXT0xMjh8cj4+PjYmNjMpLHRbcysrXT0xMjh8NjMmcik7cmV0dXJuIHR9KGUpfSxzLnV0ZjhkZWNvZGU9ZnVuY3Rpb24oZSl7cmV0dXJuIGgubm9kZWJ1ZmZlcj9vLnRyYW5zZm9ybVRvKFwibm9kZWJ1ZmZlclwiLGUpLnRvU3RyaW5nKFwidXRmLThcIik6ZnVuY3Rpb24oZSl7dmFyIHQscixuLGkscz1lLmxlbmd0aCxhPW5ldyBBcnJheSgyKnMpO2Zvcih0PXI9MDt0PHM7KWlmKChuPWVbdCsrXSk8MTI4KWFbcisrXT1uO2Vsc2UgaWYoNDwoaT11W25dKSlhW3IrK109NjU1MzMsdCs9aS0xO2Vsc2V7Zm9yKG4mPTI9PT1pPzMxOjM9PT1pPzE1Ojc7MTxpJiZ0PHM7KW49bjw8Nnw2MyZlW3QrK10saS0tOzE8aT9hW3IrK109NjU1MzM6bjw2NTUzNj9hW3IrK109bjoobi09NjU1MzYsYVtyKytdPTU1Mjk2fG4+PjEwJjEwMjMsYVtyKytdPTU2MzIwfDEwMjMmbil9cmV0dXJuIGEubGVuZ3RoIT09ciYmKGEuc3ViYXJyYXk/YT1hLnN1YmFycmF5KDAscik6YS5sZW5ndGg9ciksby5hcHBseUZyb21DaGFyQ29kZShhKX0oZT1vLnRyYW5zZm9ybVRvKGgudWludDhhcnJheT9cInVpbnQ4YXJyYXlcIjpcImFycmF5XCIsZSkpfSxvLmluaGVyaXRzKGEsbiksYS5wcm90b3R5cGUucHJvY2Vzc0NodW5rPWZ1bmN0aW9uKGUpe3ZhciB0PW8udHJhbnNmb3JtVG8oaC51aW50OGFycmF5P1widWludDhhcnJheVwiOlwiYXJyYXlcIixlLmRhdGEpO2lmKHRoaXMubGVmdE92ZXImJnRoaXMubGVmdE92ZXIubGVuZ3RoKXtpZihoLnVpbnQ4YXJyYXkpe3ZhciByPXQ7KHQ9bmV3IFVpbnQ4QXJyYXkoci5sZW5ndGgrdGhpcy5sZWZ0T3Zlci5sZW5ndGgpKS5zZXQodGhpcy5sZWZ0T3ZlciwwKSx0LnNldChyLHRoaXMubGVmdE92ZXIubGVuZ3RoKX1lbHNlIHQ9dGhpcy5sZWZ0T3Zlci5jb25jYXQodCk7dGhpcy5sZWZ0T3Zlcj1udWxsfXZhciBuPWZ1bmN0aW9uKGUsdCl7dmFyIHI7Zm9yKCh0PXR8fGUubGVuZ3RoKT5lLmxlbmd0aCYmKHQ9ZS5sZW5ndGgpLHI9dC0xOzA8PXImJjEyOD09KDE5MiZlW3JdKTspci0tO3JldHVybiByPDA/dDowPT09cj90OnIrdVtlW3JdXT50P3I6dH0odCksaT10O24hPT10Lmxlbmd0aCYmKGgudWludDhhcnJheT8oaT10LnN1YmFycmF5KDAsbiksdGhpcy5sZWZ0T3Zlcj10LnN1YmFycmF5KG4sdC5sZW5ndGgpKTooaT10LnNsaWNlKDAsbiksdGhpcy5sZWZ0T3Zlcj10LnNsaWNlKG4sdC5sZW5ndGgpKSksdGhpcy5wdXNoKHtkYXRhOnMudXRmOGRlY29kZShpKSxtZXRhOmUubWV0YX0pfSxhLnByb3RvdHlwZS5mbHVzaD1mdW5jdGlvbigpe3RoaXMubGVmdE92ZXImJnRoaXMubGVmdE92ZXIubGVuZ3RoJiYodGhpcy5wdXNoKHtkYXRhOnMudXRmOGRlY29kZSh0aGlzLmxlZnRPdmVyKSxtZXRhOnt9fSksdGhpcy5sZWZ0T3Zlcj1udWxsKX0scy5VdGY4RGVjb2RlV29ya2VyPWEsby5pbmhlcml0cyhsLG4pLGwucHJvdG90eXBlLnByb2Nlc3NDaHVuaz1mdW5jdGlvbihlKXt0aGlzLnB1c2goe2RhdGE6cy51dGY4ZW5jb2RlKGUuZGF0YSksbWV0YTplLm1ldGF9KX0scy5VdGY4RW5jb2RlV29ya2VyPWx9LHtcIi4vbm9kZWpzVXRpbHNcIjoxNCxcIi4vc3RyZWFtL0dlbmVyaWNXb3JrZXJcIjoyOCxcIi4vc3VwcG9ydFwiOjMwLFwiLi91dGlsc1wiOjMyfV0sMzI6W2Z1bmN0aW9uKGUsdCxhKXtcInVzZSBzdHJpY3RcIjt2YXIgbz1lKFwiLi9zdXBwb3J0XCIpLGg9ZShcIi4vYmFzZTY0XCIpLHI9ZShcIi4vbm9kZWpzVXRpbHNcIiksdT1lKFwiLi9leHRlcm5hbFwiKTtmdW5jdGlvbiBuKGUpe3JldHVybiBlfWZ1bmN0aW9uIGwoZSx0KXtmb3IodmFyIHI9MDtyPGUubGVuZ3RoOysrcil0W3JdPTI1NSZlLmNoYXJDb2RlQXQocik7cmV0dXJuIHR9ZShcInNldGltbWVkaWF0ZVwiKSxhLm5ld0Jsb2I9ZnVuY3Rpb24odCxyKXthLmNoZWNrU3VwcG9ydChcImJsb2JcIik7dHJ5e3JldHVybiBuZXcgQmxvYihbdF0se3R5cGU6cn0pfWNhdGNoKGUpe3RyeXt2YXIgbj1uZXcoc2VsZi5CbG9iQnVpbGRlcnx8c2VsZi5XZWJLaXRCbG9iQnVpbGRlcnx8c2VsZi5Nb3pCbG9iQnVpbGRlcnx8c2VsZi5NU0Jsb2JCdWlsZGVyKTtyZXR1cm4gbi5hcHBlbmQodCksbi5nZXRCbG9iKHIpfWNhdGNoKGUpe3Rocm93IG5ldyBFcnJvcihcIkJ1ZyA6IGNhbid0IGNvbnN0cnVjdCB0aGUgQmxvYi5cIil9fX07dmFyIGk9e3N0cmluZ2lmeUJ5Q2h1bms6ZnVuY3Rpb24oZSx0LHIpe3ZhciBuPVtdLGk9MCxzPWUubGVuZ3RoO2lmKHM8PXIpcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCxlKTtmb3IoO2k8czspXCJhcnJheVwiPT09dHx8XCJub2RlYnVmZmVyXCI9PT10P24ucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsZS5zbGljZShpLE1hdGgubWluKGkrcixzKSkpKTpuLnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLGUuc3ViYXJyYXkoaSxNYXRoLm1pbihpK3IscykpKSksaSs9cjtyZXR1cm4gbi5qb2luKFwiXCIpfSxzdHJpbmdpZnlCeUNoYXI6ZnVuY3Rpb24oZSl7Zm9yKHZhciB0PVwiXCIscj0wO3I8ZS5sZW5ndGg7cisrKXQrPVN0cmluZy5mcm9tQ2hhckNvZGUoZVtyXSk7cmV0dXJuIHR9LGFwcGx5Q2FuQmVVc2VkOnt1aW50OGFycmF5OmZ1bmN0aW9uKCl7dHJ5e3JldHVybiBvLnVpbnQ4YXJyYXkmJjE9PT1TdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsbmV3IFVpbnQ4QXJyYXkoMSkpLmxlbmd0aH1jYXRjaChlKXtyZXR1cm4hMX19KCksbm9kZWJ1ZmZlcjpmdW5jdGlvbigpe3RyeXtyZXR1cm4gby5ub2RlYnVmZmVyJiYxPT09U3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLHIuYWxsb2NCdWZmZXIoMSkpLmxlbmd0aH1jYXRjaChlKXtyZXR1cm4hMX19KCl9fTtmdW5jdGlvbiBzKGUpe3ZhciB0PTY1NTM2LHI9YS5nZXRUeXBlT2YoZSksbj0hMDtpZihcInVpbnQ4YXJyYXlcIj09PXI/bj1pLmFwcGx5Q2FuQmVVc2VkLnVpbnQ4YXJyYXk6XCJub2RlYnVmZmVyXCI9PT1yJiYobj1pLmFwcGx5Q2FuQmVVc2VkLm5vZGVidWZmZXIpLG4pZm9yKDsxPHQ7KXRyeXtyZXR1cm4gaS5zdHJpbmdpZnlCeUNodW5rKGUscix0KX1jYXRjaChlKXt0PU1hdGguZmxvb3IodC8yKX1yZXR1cm4gaS5zdHJpbmdpZnlCeUNoYXIoZSl9ZnVuY3Rpb24gZihlLHQpe2Zvcih2YXIgcj0wO3I8ZS5sZW5ndGg7cisrKXRbcl09ZVtyXTtyZXR1cm4gdH1hLmFwcGx5RnJvbUNoYXJDb2RlPXM7dmFyIGM9e307Yy5zdHJpbmc9e3N0cmluZzpuLGFycmF5OmZ1bmN0aW9uKGUpe3JldHVybiBsKGUsbmV3IEFycmF5KGUubGVuZ3RoKSl9LGFycmF5YnVmZmVyOmZ1bmN0aW9uKGUpe3JldHVybiBjLnN0cmluZy51aW50OGFycmF5KGUpLmJ1ZmZlcn0sdWludDhhcnJheTpmdW5jdGlvbihlKXtyZXR1cm4gbChlLG5ldyBVaW50OEFycmF5KGUubGVuZ3RoKSl9LG5vZGVidWZmZXI6ZnVuY3Rpb24oZSl7cmV0dXJuIGwoZSxyLmFsbG9jQnVmZmVyKGUubGVuZ3RoKSl9fSxjLmFycmF5PXtzdHJpbmc6cyxhcnJheTpuLGFycmF5YnVmZmVyOmZ1bmN0aW9uKGUpe3JldHVybiBuZXcgVWludDhBcnJheShlKS5idWZmZXJ9LHVpbnQ4YXJyYXk6ZnVuY3Rpb24oZSl7cmV0dXJuIG5ldyBVaW50OEFycmF5KGUpfSxub2RlYnVmZmVyOmZ1bmN0aW9uKGUpe3JldHVybiByLm5ld0J1ZmZlckZyb20oZSl9fSxjLmFycmF5YnVmZmVyPXtzdHJpbmc6ZnVuY3Rpb24oZSl7cmV0dXJuIHMobmV3IFVpbnQ4QXJyYXkoZSkpfSxhcnJheTpmdW5jdGlvbihlKXtyZXR1cm4gZihuZXcgVWludDhBcnJheShlKSxuZXcgQXJyYXkoZS5ieXRlTGVuZ3RoKSl9LGFycmF5YnVmZmVyOm4sdWludDhhcnJheTpmdW5jdGlvbihlKXtyZXR1cm4gbmV3IFVpbnQ4QXJyYXkoZSl9LG5vZGVidWZmZXI6ZnVuY3Rpb24oZSl7cmV0dXJuIHIubmV3QnVmZmVyRnJvbShuZXcgVWludDhBcnJheShlKSl9fSxjLnVpbnQ4YXJyYXk9e3N0cmluZzpzLGFycmF5OmZ1bmN0aW9uKGUpe3JldHVybiBmKGUsbmV3IEFycmF5KGUubGVuZ3RoKSl9LGFycmF5YnVmZmVyOmZ1bmN0aW9uKGUpe3JldHVybiBlLmJ1ZmZlcn0sdWludDhhcnJheTpuLG5vZGVidWZmZXI6ZnVuY3Rpb24oZSl7cmV0dXJuIHIubmV3QnVmZmVyRnJvbShlKX19LGMubm9kZWJ1ZmZlcj17c3RyaW5nOnMsYXJyYXk6ZnVuY3Rpb24oZSl7cmV0dXJuIGYoZSxuZXcgQXJyYXkoZS5sZW5ndGgpKX0sYXJyYXlidWZmZXI6ZnVuY3Rpb24oZSl7cmV0dXJuIGMubm9kZWJ1ZmZlci51aW50OGFycmF5KGUpLmJ1ZmZlcn0sdWludDhhcnJheTpmdW5jdGlvbihlKXtyZXR1cm4gZihlLG5ldyBVaW50OEFycmF5KGUubGVuZ3RoKSl9LG5vZGVidWZmZXI6bn0sYS50cmFuc2Zvcm1Ubz1mdW5jdGlvbihlLHQpe2lmKHQ9dHx8XCJcIiwhZSlyZXR1cm4gdDthLmNoZWNrU3VwcG9ydChlKTt2YXIgcj1hLmdldFR5cGVPZih0KTtyZXR1cm4gY1tyXVtlXSh0KX0sYS5yZXNvbHZlPWZ1bmN0aW9uKGUpe2Zvcih2YXIgdD1lLnNwbGl0KFwiL1wiKSxyPVtdLG49MDtuPHQubGVuZ3RoO24rKyl7dmFyIGk9dFtuXTtcIi5cIj09PWl8fFwiXCI9PT1pJiYwIT09biYmbiE9PXQubGVuZ3RoLTF8fChcIi4uXCI9PT1pP3IucG9wKCk6ci5wdXNoKGkpKX1yZXR1cm4gci5qb2luKFwiL1wiKX0sYS5nZXRUeXBlT2Y9ZnVuY3Rpb24oZSl7aWYoXCJzdHJpbmdcIj09dHlwZW9mIGUpcmV0dXJuXCJzdHJpbmdcIjt2YXIgdD1PYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZSk7cmV0dXJuXCJbb2JqZWN0IEFycmF5XVwiPT09dD9cImFycmF5XCI6by5ub2RlYnVmZmVyJiZyLmlzQnVmZmVyKGUpP1wibm9kZWJ1ZmZlclwiOm8udWludDhhcnJheSYmXCJbb2JqZWN0IFVpbnQ4QXJyYXldXCI9PT10P1widWludDhhcnJheVwiOm8uYXJyYXlidWZmZXImJlwiW29iamVjdCBBcnJheUJ1ZmZlcl1cIj09PXQ/XCJhcnJheWJ1ZmZlclwiOnZvaWQgMH0sYS5jaGVja1N1cHBvcnQ9ZnVuY3Rpb24oZSl7aWYoIW9bZS50b0xvd2VyQ2FzZSgpXSl0aHJvdyBuZXcgRXJyb3IoZStcIiBpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoaXMgcGxhdGZvcm1cIil9LGEuTUFYX1ZBTFVFXzE2QklUUz02NTUzNSxhLk1BWF9WQUxVRV8zMkJJVFM9LTEsYS5wcmV0dHk9ZnVuY3Rpb24oZSl7dmFyIHQscixuPVwiXCI7Zm9yKHI9MDtyPChlfHxcIlwiKS5sZW5ndGg7cisrKW4rPVwiXFxcXHhcIisoKHQ9ZS5jaGFyQ29kZUF0KHIpKTwxNj9cIjBcIjpcIlwiKSt0LnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpO3JldHVybiBufSxhLmRlbGF5PWZ1bmN0aW9uKGUsdCxyKXtzZXRJbW1lZGlhdGUoZnVuY3Rpb24oKXtlLmFwcGx5KHJ8fG51bGwsdHx8W10pfSl9LGEuaW5oZXJpdHM9ZnVuY3Rpb24oZSx0KXtmdW5jdGlvbiByKCl7fXIucHJvdG90eXBlPXQucHJvdG90eXBlLGUucHJvdG90eXBlPW5ldyByfSxhLmV4dGVuZD1mdW5jdGlvbigpe3ZhciBlLHQscj17fTtmb3IoZT0wO2U8YXJndW1lbnRzLmxlbmd0aDtlKyspZm9yKHQgaW4gYXJndW1lbnRzW2VdKU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhcmd1bWVudHNbZV0sdCkmJnZvaWQgMD09PXJbdF0mJihyW3RdPWFyZ3VtZW50c1tlXVt0XSk7cmV0dXJuIHJ9LGEucHJlcGFyZUNvbnRlbnQ9ZnVuY3Rpb24ocixlLG4saSxzKXtyZXR1cm4gdS5Qcm9taXNlLnJlc29sdmUoZSkudGhlbihmdW5jdGlvbihuKXtyZXR1cm4gby5ibG9iJiYobiBpbnN0YW5jZW9mIEJsb2J8fC0xIT09W1wiW29iamVjdCBGaWxlXVwiLFwiW29iamVjdCBCbG9iXVwiXS5pbmRleE9mKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChuKSkpP3ZvaWQgMCE9PUJsb2IucHJvdG90eXBlLmFycmF5QnVmZmVyP24uYXJyYXlCdWZmZXIoKTpcInVuZGVmaW5lZFwiIT10eXBlb2YgRmlsZVJlYWRlcj9uZXcgdS5Qcm9taXNlKGZ1bmN0aW9uKHQscil7dmFyIGU9bmV3IEZpbGVSZWFkZXI7ZS5vbmxvYWQ9ZnVuY3Rpb24oZSl7dChlLnRhcmdldC5yZXN1bHQpfSxlLm9uZXJyb3I9ZnVuY3Rpb24oZSl7cihlLnRhcmdldC5lcnJvcil9LGUucmVhZEFzQXJyYXlCdWZmZXIobil9KTp1LlByb21pc2UucmVqZWN0KG5ldyBFcnJvcihyK1wiIGlzIGEgQmxvYiwgYnV0IHdlIGhhdmUgbm8gd2F5IG9mIHJlYWRpbmcgaXQuXCIpKTpufSkudGhlbihmdW5jdGlvbihlKXt2YXIgdD1hLmdldFR5cGVPZihlKTtyZXR1cm4gdD8oXCJhcnJheWJ1ZmZlclwiPT09dD9lPWEudHJhbnNmb3JtVG8oXCJ1aW50OGFycmF5XCIsZSk6XCJzdHJpbmdcIj09PXQmJihzP2U9aC5kZWNvZGUoZSk6biYmITAhPT1pJiYoZT1mdW5jdGlvbihlKXtyZXR1cm4gbChlLG8udWludDhhcnJheT9uZXcgVWludDhBcnJheShlLmxlbmd0aCk6bmV3IEFycmF5KGUubGVuZ3RoKSl9KGUpKSksZSk6dS5Qcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJDYW4ndCByZWFkIHRoZSBkYXRhIG9mICdcIityK1wiJy4gSXMgaXQgaW4gYSBzdXBwb3J0ZWQgSmF2YVNjcmlwdCB0eXBlIChTdHJpbmcsIEJsb2IsIEFycmF5QnVmZmVyLCBldGMpID9cIikpfSl9fSx7XCIuL2Jhc2U2NFwiOjEsXCIuL2V4dGVybmFsXCI6NixcIi4vbm9kZWpzVXRpbHNcIjoxNCxcIi4vc3VwcG9ydFwiOjMwLHNldGltbWVkaWF0ZTo1NH1dLDMzOltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7dmFyIG49ZShcIi4vcmVhZGVyL3JlYWRlckZvclwiKSxpPWUoXCIuL3V0aWxzXCIpLHM9ZShcIi4vc2lnbmF0dXJlXCIpLGE9ZShcIi4vemlwRW50cnlcIiksbz1lKFwiLi9zdXBwb3J0XCIpO2Z1bmN0aW9uIGgoZSl7dGhpcy5maWxlcz1bXSx0aGlzLmxvYWRPcHRpb25zPWV9aC5wcm90b3R5cGU9e2NoZWNrU2lnbmF0dXJlOmZ1bmN0aW9uKGUpe2lmKCF0aGlzLnJlYWRlci5yZWFkQW5kQ2hlY2tTaWduYXR1cmUoZSkpe3RoaXMucmVhZGVyLmluZGV4LT00O3ZhciB0PXRoaXMucmVhZGVyLnJlYWRTdHJpbmcoNCk7dGhyb3cgbmV3IEVycm9yKFwiQ29ycnVwdGVkIHppcCBvciBidWc6IHVuZXhwZWN0ZWQgc2lnbmF0dXJlIChcIitpLnByZXR0eSh0KStcIiwgZXhwZWN0ZWQgXCIraS5wcmV0dHkoZSkrXCIpXCIpfX0saXNTaWduYXR1cmU6ZnVuY3Rpb24oZSx0KXt2YXIgcj10aGlzLnJlYWRlci5pbmRleDt0aGlzLnJlYWRlci5zZXRJbmRleChlKTt2YXIgbj10aGlzLnJlYWRlci5yZWFkU3RyaW5nKDQpPT09dDtyZXR1cm4gdGhpcy5yZWFkZXIuc2V0SW5kZXgociksbn0scmVhZEJsb2NrRW5kT2ZDZW50cmFsOmZ1bmN0aW9uKCl7dGhpcy5kaXNrTnVtYmVyPXRoaXMucmVhZGVyLnJlYWRJbnQoMiksdGhpcy5kaXNrV2l0aENlbnRyYWxEaXJTdGFydD10aGlzLnJlYWRlci5yZWFkSW50KDIpLHRoaXMuY2VudHJhbERpclJlY29yZHNPblRoaXNEaXNrPXRoaXMucmVhZGVyLnJlYWRJbnQoMiksdGhpcy5jZW50cmFsRGlyUmVjb3Jkcz10aGlzLnJlYWRlci5yZWFkSW50KDIpLHRoaXMuY2VudHJhbERpclNpemU9dGhpcy5yZWFkZXIucmVhZEludCg0KSx0aGlzLmNlbnRyYWxEaXJPZmZzZXQ9dGhpcy5yZWFkZXIucmVhZEludCg0KSx0aGlzLnppcENvbW1lbnRMZW5ndGg9dGhpcy5yZWFkZXIucmVhZEludCgyKTt2YXIgZT10aGlzLnJlYWRlci5yZWFkRGF0YSh0aGlzLnppcENvbW1lbnRMZW5ndGgpLHQ9by51aW50OGFycmF5P1widWludDhhcnJheVwiOlwiYXJyYXlcIixyPWkudHJhbnNmb3JtVG8odCxlKTt0aGlzLnppcENvbW1lbnQ9dGhpcy5sb2FkT3B0aW9ucy5kZWNvZGVGaWxlTmFtZShyKX0scmVhZEJsb2NrWmlwNjRFbmRPZkNlbnRyYWw6ZnVuY3Rpb24oKXt0aGlzLnppcDY0RW5kT2ZDZW50cmFsU2l6ZT10aGlzLnJlYWRlci5yZWFkSW50KDgpLHRoaXMucmVhZGVyLnNraXAoNCksdGhpcy5kaXNrTnVtYmVyPXRoaXMucmVhZGVyLnJlYWRJbnQoNCksdGhpcy5kaXNrV2l0aENlbnRyYWxEaXJTdGFydD10aGlzLnJlYWRlci5yZWFkSW50KDQpLHRoaXMuY2VudHJhbERpclJlY29yZHNPblRoaXNEaXNrPXRoaXMucmVhZGVyLnJlYWRJbnQoOCksdGhpcy5jZW50cmFsRGlyUmVjb3Jkcz10aGlzLnJlYWRlci5yZWFkSW50KDgpLHRoaXMuY2VudHJhbERpclNpemU9dGhpcy5yZWFkZXIucmVhZEludCg4KSx0aGlzLmNlbnRyYWxEaXJPZmZzZXQ9dGhpcy5yZWFkZXIucmVhZEludCg4KSx0aGlzLnppcDY0RXh0ZW5zaWJsZURhdGE9e307Zm9yKHZhciBlLHQscixuPXRoaXMuemlwNjRFbmRPZkNlbnRyYWxTaXplLTQ0OzA8bjspZT10aGlzLnJlYWRlci5yZWFkSW50KDIpLHQ9dGhpcy5yZWFkZXIucmVhZEludCg0KSxyPXRoaXMucmVhZGVyLnJlYWREYXRhKHQpLHRoaXMuemlwNjRFeHRlbnNpYmxlRGF0YVtlXT17aWQ6ZSxsZW5ndGg6dCx2YWx1ZTpyfX0scmVhZEJsb2NrWmlwNjRFbmRPZkNlbnRyYWxMb2NhdG9yOmZ1bmN0aW9uKCl7aWYodGhpcy5kaXNrV2l0aFppcDY0Q2VudHJhbERpclN0YXJ0PXRoaXMucmVhZGVyLnJlYWRJbnQoNCksdGhpcy5yZWxhdGl2ZU9mZnNldEVuZE9mWmlwNjRDZW50cmFsRGlyPXRoaXMucmVhZGVyLnJlYWRJbnQoOCksdGhpcy5kaXNrc0NvdW50PXRoaXMucmVhZGVyLnJlYWRJbnQoNCksMTx0aGlzLmRpc2tzQ291bnQpdGhyb3cgbmV3IEVycm9yKFwiTXVsdGktdm9sdW1lcyB6aXAgYXJlIG5vdCBzdXBwb3J0ZWRcIil9LHJlYWRMb2NhbEZpbGVzOmZ1bmN0aW9uKCl7dmFyIGUsdDtmb3IoZT0wO2U8dGhpcy5maWxlcy5sZW5ndGg7ZSsrKXQ9dGhpcy5maWxlc1tlXSx0aGlzLnJlYWRlci5zZXRJbmRleCh0LmxvY2FsSGVhZGVyT2Zmc2V0KSx0aGlzLmNoZWNrU2lnbmF0dXJlKHMuTE9DQUxfRklMRV9IRUFERVIpLHQucmVhZExvY2FsUGFydCh0aGlzLnJlYWRlciksdC5oYW5kbGVVVEY4KCksdC5wcm9jZXNzQXR0cmlidXRlcygpfSxyZWFkQ2VudHJhbERpcjpmdW5jdGlvbigpe3ZhciBlO2Zvcih0aGlzLnJlYWRlci5zZXRJbmRleCh0aGlzLmNlbnRyYWxEaXJPZmZzZXQpO3RoaXMucmVhZGVyLnJlYWRBbmRDaGVja1NpZ25hdHVyZShzLkNFTlRSQUxfRklMRV9IRUFERVIpOykoZT1uZXcgYSh7emlwNjQ6dGhpcy56aXA2NH0sdGhpcy5sb2FkT3B0aW9ucykpLnJlYWRDZW50cmFsUGFydCh0aGlzLnJlYWRlciksdGhpcy5maWxlcy5wdXNoKGUpO2lmKHRoaXMuY2VudHJhbERpclJlY29yZHMhPT10aGlzLmZpbGVzLmxlbmd0aCYmMCE9PXRoaXMuY2VudHJhbERpclJlY29yZHMmJjA9PT10aGlzLmZpbGVzLmxlbmd0aCl0aHJvdyBuZXcgRXJyb3IoXCJDb3JydXB0ZWQgemlwIG9yIGJ1ZzogZXhwZWN0ZWQgXCIrdGhpcy5jZW50cmFsRGlyUmVjb3JkcytcIiByZWNvcmRzIGluIGNlbnRyYWwgZGlyLCBnb3QgXCIrdGhpcy5maWxlcy5sZW5ndGgpfSxyZWFkRW5kT2ZDZW50cmFsOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcy5yZWFkZXIubGFzdEluZGV4T2ZTaWduYXR1cmUocy5DRU5UUkFMX0RJUkVDVE9SWV9FTkQpO2lmKGU8MCl0aHJvdyF0aGlzLmlzU2lnbmF0dXJlKDAscy5MT0NBTF9GSUxFX0hFQURFUik/bmV3IEVycm9yKFwiQ2FuJ3QgZmluZCBlbmQgb2YgY2VudHJhbCBkaXJlY3RvcnkgOiBpcyB0aGlzIGEgemlwIGZpbGUgPyBJZiBpdCBpcywgc2VlIGh0dHBzOi8vc3R1ay5naXRodWIuaW8vanN6aXAvZG9jdW1lbnRhdGlvbi9ob3d0by9yZWFkX3ppcC5odG1sXCIpOm5ldyBFcnJvcihcIkNvcnJ1cHRlZCB6aXA6IGNhbid0IGZpbmQgZW5kIG9mIGNlbnRyYWwgZGlyZWN0b3J5XCIpO3RoaXMucmVhZGVyLnNldEluZGV4KGUpO3ZhciB0PWU7aWYodGhpcy5jaGVja1NpZ25hdHVyZShzLkNFTlRSQUxfRElSRUNUT1JZX0VORCksdGhpcy5yZWFkQmxvY2tFbmRPZkNlbnRyYWwoKSx0aGlzLmRpc2tOdW1iZXI9PT1pLk1BWF9WQUxVRV8xNkJJVFN8fHRoaXMuZGlza1dpdGhDZW50cmFsRGlyU3RhcnQ9PT1pLk1BWF9WQUxVRV8xNkJJVFN8fHRoaXMuY2VudHJhbERpclJlY29yZHNPblRoaXNEaXNrPT09aS5NQVhfVkFMVUVfMTZCSVRTfHx0aGlzLmNlbnRyYWxEaXJSZWNvcmRzPT09aS5NQVhfVkFMVUVfMTZCSVRTfHx0aGlzLmNlbnRyYWxEaXJTaXplPT09aS5NQVhfVkFMVUVfMzJCSVRTfHx0aGlzLmNlbnRyYWxEaXJPZmZzZXQ9PT1pLk1BWF9WQUxVRV8zMkJJVFMpe2lmKHRoaXMuemlwNjQ9ITAsKGU9dGhpcy5yZWFkZXIubGFzdEluZGV4T2ZTaWduYXR1cmUocy5aSVA2NF9DRU5UUkFMX0RJUkVDVE9SWV9MT0NBVE9SKSk8MCl0aHJvdyBuZXcgRXJyb3IoXCJDb3JydXB0ZWQgemlwOiBjYW4ndCBmaW5kIHRoZSBaSVA2NCBlbmQgb2YgY2VudHJhbCBkaXJlY3RvcnkgbG9jYXRvclwiKTtpZih0aGlzLnJlYWRlci5zZXRJbmRleChlKSx0aGlzLmNoZWNrU2lnbmF0dXJlKHMuWklQNjRfQ0VOVFJBTF9ESVJFQ1RPUllfTE9DQVRPUiksdGhpcy5yZWFkQmxvY2taaXA2NEVuZE9mQ2VudHJhbExvY2F0b3IoKSwhdGhpcy5pc1NpZ25hdHVyZSh0aGlzLnJlbGF0aXZlT2Zmc2V0RW5kT2ZaaXA2NENlbnRyYWxEaXIscy5aSVA2NF9DRU5UUkFMX0RJUkVDVE9SWV9FTkQpJiYodGhpcy5yZWxhdGl2ZU9mZnNldEVuZE9mWmlwNjRDZW50cmFsRGlyPXRoaXMucmVhZGVyLmxhc3RJbmRleE9mU2lnbmF0dXJlKHMuWklQNjRfQ0VOVFJBTF9ESVJFQ1RPUllfRU5EKSx0aGlzLnJlbGF0aXZlT2Zmc2V0RW5kT2ZaaXA2NENlbnRyYWxEaXI8MCkpdGhyb3cgbmV3IEVycm9yKFwiQ29ycnVwdGVkIHppcDogY2FuJ3QgZmluZCB0aGUgWklQNjQgZW5kIG9mIGNlbnRyYWwgZGlyZWN0b3J5XCIpO3RoaXMucmVhZGVyLnNldEluZGV4KHRoaXMucmVsYXRpdmVPZmZzZXRFbmRPZlppcDY0Q2VudHJhbERpciksdGhpcy5jaGVja1NpZ25hdHVyZShzLlpJUDY0X0NFTlRSQUxfRElSRUNUT1JZX0VORCksdGhpcy5yZWFkQmxvY2taaXA2NEVuZE9mQ2VudHJhbCgpfXZhciByPXRoaXMuY2VudHJhbERpck9mZnNldCt0aGlzLmNlbnRyYWxEaXJTaXplO3RoaXMuemlwNjQmJihyKz0yMCxyKz0xMit0aGlzLnppcDY0RW5kT2ZDZW50cmFsU2l6ZSk7dmFyIG49dC1yO2lmKDA8bil0aGlzLmlzU2lnbmF0dXJlKHQscy5DRU5UUkFMX0ZJTEVfSEVBREVSKXx8KHRoaXMucmVhZGVyLnplcm89bik7ZWxzZSBpZihuPDApdGhyb3cgbmV3IEVycm9yKFwiQ29ycnVwdGVkIHppcDogbWlzc2luZyBcIitNYXRoLmFicyhuKStcIiBieXRlcy5cIil9LHByZXBhcmVSZWFkZXI6ZnVuY3Rpb24oZSl7dGhpcy5yZWFkZXI9bihlKX0sbG9hZDpmdW5jdGlvbihlKXt0aGlzLnByZXBhcmVSZWFkZXIoZSksdGhpcy5yZWFkRW5kT2ZDZW50cmFsKCksdGhpcy5yZWFkQ2VudHJhbERpcigpLHRoaXMucmVhZExvY2FsRmlsZXMoKX19LHQuZXhwb3J0cz1ofSx7XCIuL3JlYWRlci9yZWFkZXJGb3JcIjoyMixcIi4vc2lnbmF0dXJlXCI6MjMsXCIuL3N1cHBvcnRcIjozMCxcIi4vdXRpbHNcIjozMixcIi4vemlwRW50cnlcIjozNH1dLDM0OltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7dmFyIG49ZShcIi4vcmVhZGVyL3JlYWRlckZvclwiKSxzPWUoXCIuL3V0aWxzXCIpLGk9ZShcIi4vY29tcHJlc3NlZE9iamVjdFwiKSxhPWUoXCIuL2NyYzMyXCIpLG89ZShcIi4vdXRmOFwiKSxoPWUoXCIuL2NvbXByZXNzaW9uc1wiKSx1PWUoXCIuL3N1cHBvcnRcIik7ZnVuY3Rpb24gbChlLHQpe3RoaXMub3B0aW9ucz1lLHRoaXMubG9hZE9wdGlvbnM9dH1sLnByb3RvdHlwZT17aXNFbmNyeXB0ZWQ6ZnVuY3Rpb24oKXtyZXR1cm4gMT09KDEmdGhpcy5iaXRGbGFnKX0sdXNlVVRGODpmdW5jdGlvbigpe3JldHVybiAyMDQ4PT0oMjA0OCZ0aGlzLmJpdEZsYWcpfSxyZWFkTG9jYWxQYXJ0OmZ1bmN0aW9uKGUpe3ZhciB0LHI7aWYoZS5za2lwKDIyKSx0aGlzLmZpbGVOYW1lTGVuZ3RoPWUucmVhZEludCgyKSxyPWUucmVhZEludCgyKSx0aGlzLmZpbGVOYW1lPWUucmVhZERhdGEodGhpcy5maWxlTmFtZUxlbmd0aCksZS5za2lwKHIpLC0xPT09dGhpcy5jb21wcmVzc2VkU2l6ZXx8LTE9PT10aGlzLnVuY29tcHJlc3NlZFNpemUpdGhyb3cgbmV3IEVycm9yKFwiQnVnIG9yIGNvcnJ1cHRlZCB6aXAgOiBkaWRuJ3QgZ2V0IGVub3VnaCBpbmZvcm1hdGlvbiBmcm9tIHRoZSBjZW50cmFsIGRpcmVjdG9yeSAoY29tcHJlc3NlZFNpemUgPT09IC0xIHx8IHVuY29tcHJlc3NlZFNpemUgPT09IC0xKVwiKTtpZihudWxsPT09KHQ9ZnVuY3Rpb24oZSl7Zm9yKHZhciB0IGluIGgpaWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGgsdCkmJmhbdF0ubWFnaWM9PT1lKXJldHVybiBoW3RdO3JldHVybiBudWxsfSh0aGlzLmNvbXByZXNzaW9uTWV0aG9kKSkpdGhyb3cgbmV3IEVycm9yKFwiQ29ycnVwdGVkIHppcCA6IGNvbXByZXNzaW9uIFwiK3MucHJldHR5KHRoaXMuY29tcHJlc3Npb25NZXRob2QpK1wiIHVua25vd24gKGlubmVyIGZpbGUgOiBcIitzLnRyYW5zZm9ybVRvKFwic3RyaW5nXCIsdGhpcy5maWxlTmFtZSkrXCIpXCIpO3RoaXMuZGVjb21wcmVzc2VkPW5ldyBpKHRoaXMuY29tcHJlc3NlZFNpemUsdGhpcy51bmNvbXByZXNzZWRTaXplLHRoaXMuY3JjMzIsdCxlLnJlYWREYXRhKHRoaXMuY29tcHJlc3NlZFNpemUpKX0scmVhZENlbnRyYWxQYXJ0OmZ1bmN0aW9uKGUpe3RoaXMudmVyc2lvbk1hZGVCeT1lLnJlYWRJbnQoMiksZS5za2lwKDIpLHRoaXMuYml0RmxhZz1lLnJlYWRJbnQoMiksdGhpcy5jb21wcmVzc2lvbk1ldGhvZD1lLnJlYWRTdHJpbmcoMiksdGhpcy5kYXRlPWUucmVhZERhdGUoKSx0aGlzLmNyYzMyPWUucmVhZEludCg0KSx0aGlzLmNvbXByZXNzZWRTaXplPWUucmVhZEludCg0KSx0aGlzLnVuY29tcHJlc3NlZFNpemU9ZS5yZWFkSW50KDQpO3ZhciB0PWUucmVhZEludCgyKTtpZih0aGlzLmV4dHJhRmllbGRzTGVuZ3RoPWUucmVhZEludCgyKSx0aGlzLmZpbGVDb21tZW50TGVuZ3RoPWUucmVhZEludCgyKSx0aGlzLmRpc2tOdW1iZXJTdGFydD1lLnJlYWRJbnQoMiksdGhpcy5pbnRlcm5hbEZpbGVBdHRyaWJ1dGVzPWUucmVhZEludCgyKSx0aGlzLmV4dGVybmFsRmlsZUF0dHJpYnV0ZXM9ZS5yZWFkSW50KDQpLHRoaXMubG9jYWxIZWFkZXJPZmZzZXQ9ZS5yZWFkSW50KDQpLHRoaXMuaXNFbmNyeXB0ZWQoKSl0aHJvdyBuZXcgRXJyb3IoXCJFbmNyeXB0ZWQgemlwIGFyZSBub3Qgc3VwcG9ydGVkXCIpO2Uuc2tpcCh0KSx0aGlzLnJlYWRFeHRyYUZpZWxkcyhlKSx0aGlzLnBhcnNlWklQNjRFeHRyYUZpZWxkKGUpLHRoaXMuZmlsZUNvbW1lbnQ9ZS5yZWFkRGF0YSh0aGlzLmZpbGVDb21tZW50TGVuZ3RoKX0scHJvY2Vzc0F0dHJpYnV0ZXM6ZnVuY3Rpb24oKXt0aGlzLnVuaXhQZXJtaXNzaW9ucz1udWxsLHRoaXMuZG9zUGVybWlzc2lvbnM9bnVsbDt2YXIgZT10aGlzLnZlcnNpb25NYWRlQnk+Pjg7dGhpcy5kaXI9ISEoMTYmdGhpcy5leHRlcm5hbEZpbGVBdHRyaWJ1dGVzKSwwPT1lJiYodGhpcy5kb3NQZXJtaXNzaW9ucz02MyZ0aGlzLmV4dGVybmFsRmlsZUF0dHJpYnV0ZXMpLDM9PWUmJih0aGlzLnVuaXhQZXJtaXNzaW9ucz10aGlzLmV4dGVybmFsRmlsZUF0dHJpYnV0ZXM+PjE2JjY1NTM1KSx0aGlzLmRpcnx8XCIvXCIhPT10aGlzLmZpbGVOYW1lU3RyLnNsaWNlKC0xKXx8KHRoaXMuZGlyPSEwKX0scGFyc2VaSVA2NEV4dHJhRmllbGQ6ZnVuY3Rpb24oKXtpZih0aGlzLmV4dHJhRmllbGRzWzFdKXt2YXIgZT1uKHRoaXMuZXh0cmFGaWVsZHNbMV0udmFsdWUpO3RoaXMudW5jb21wcmVzc2VkU2l6ZT09PXMuTUFYX1ZBTFVFXzMyQklUUyYmKHRoaXMudW5jb21wcmVzc2VkU2l6ZT1lLnJlYWRJbnQoOCkpLHRoaXMuY29tcHJlc3NlZFNpemU9PT1zLk1BWF9WQUxVRV8zMkJJVFMmJih0aGlzLmNvbXByZXNzZWRTaXplPWUucmVhZEludCg4KSksdGhpcy5sb2NhbEhlYWRlck9mZnNldD09PXMuTUFYX1ZBTFVFXzMyQklUUyYmKHRoaXMubG9jYWxIZWFkZXJPZmZzZXQ9ZS5yZWFkSW50KDgpKSx0aGlzLmRpc2tOdW1iZXJTdGFydD09PXMuTUFYX1ZBTFVFXzMyQklUUyYmKHRoaXMuZGlza051bWJlclN0YXJ0PWUucmVhZEludCg0KSl9fSxyZWFkRXh0cmFGaWVsZHM6ZnVuY3Rpb24oZSl7dmFyIHQscixuLGk9ZS5pbmRleCt0aGlzLmV4dHJhRmllbGRzTGVuZ3RoO2Zvcih0aGlzLmV4dHJhRmllbGRzfHwodGhpcy5leHRyYUZpZWxkcz17fSk7ZS5pbmRleCs0PGk7KXQ9ZS5yZWFkSW50KDIpLHI9ZS5yZWFkSW50KDIpLG49ZS5yZWFkRGF0YShyKSx0aGlzLmV4dHJhRmllbGRzW3RdPXtpZDp0LGxlbmd0aDpyLHZhbHVlOm59O2Uuc2V0SW5kZXgoaSl9LGhhbmRsZVVURjg6ZnVuY3Rpb24oKXt2YXIgZT11LnVpbnQ4YXJyYXk/XCJ1aW50OGFycmF5XCI6XCJhcnJheVwiO2lmKHRoaXMudXNlVVRGOCgpKXRoaXMuZmlsZU5hbWVTdHI9by51dGY4ZGVjb2RlKHRoaXMuZmlsZU5hbWUpLHRoaXMuZmlsZUNvbW1lbnRTdHI9by51dGY4ZGVjb2RlKHRoaXMuZmlsZUNvbW1lbnQpO2Vsc2V7dmFyIHQ9dGhpcy5maW5kRXh0cmFGaWVsZFVuaWNvZGVQYXRoKCk7aWYobnVsbCE9PXQpdGhpcy5maWxlTmFtZVN0cj10O2Vsc2V7dmFyIHI9cy50cmFuc2Zvcm1UbyhlLHRoaXMuZmlsZU5hbWUpO3RoaXMuZmlsZU5hbWVTdHI9dGhpcy5sb2FkT3B0aW9ucy5kZWNvZGVGaWxlTmFtZShyKX12YXIgbj10aGlzLmZpbmRFeHRyYUZpZWxkVW5pY29kZUNvbW1lbnQoKTtpZihudWxsIT09bil0aGlzLmZpbGVDb21tZW50U3RyPW47ZWxzZXt2YXIgaT1zLnRyYW5zZm9ybVRvKGUsdGhpcy5maWxlQ29tbWVudCk7dGhpcy5maWxlQ29tbWVudFN0cj10aGlzLmxvYWRPcHRpb25zLmRlY29kZUZpbGVOYW1lKGkpfX19LGZpbmRFeHRyYUZpZWxkVW5pY29kZVBhdGg6ZnVuY3Rpb24oKXt2YXIgZT10aGlzLmV4dHJhRmllbGRzWzI4Nzg5XTtpZihlKXt2YXIgdD1uKGUudmFsdWUpO3JldHVybiAxIT09dC5yZWFkSW50KDEpP251bGw6YSh0aGlzLmZpbGVOYW1lKSE9PXQucmVhZEludCg0KT9udWxsOm8udXRmOGRlY29kZSh0LnJlYWREYXRhKGUubGVuZ3RoLTUpKX1yZXR1cm4gbnVsbH0sZmluZEV4dHJhRmllbGRVbmljb2RlQ29tbWVudDpmdW5jdGlvbigpe3ZhciBlPXRoaXMuZXh0cmFGaWVsZHNbMjU0NjFdO2lmKGUpe3ZhciB0PW4oZS52YWx1ZSk7cmV0dXJuIDEhPT10LnJlYWRJbnQoMSk/bnVsbDphKHRoaXMuZmlsZUNvbW1lbnQpIT09dC5yZWFkSW50KDQpP251bGw6by51dGY4ZGVjb2RlKHQucmVhZERhdGEoZS5sZW5ndGgtNSkpfXJldHVybiBudWxsfX0sdC5leHBvcnRzPWx9LHtcIi4vY29tcHJlc3NlZE9iamVjdFwiOjIsXCIuL2NvbXByZXNzaW9uc1wiOjMsXCIuL2NyYzMyXCI6NCxcIi4vcmVhZGVyL3JlYWRlckZvclwiOjIyLFwiLi9zdXBwb3J0XCI6MzAsXCIuL3V0ZjhcIjozMSxcIi4vdXRpbHNcIjozMn1dLDM1OltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gbihlLHQscil7dGhpcy5uYW1lPWUsdGhpcy5kaXI9ci5kaXIsdGhpcy5kYXRlPXIuZGF0ZSx0aGlzLmNvbW1lbnQ9ci5jb21tZW50LHRoaXMudW5peFBlcm1pc3Npb25zPXIudW5peFBlcm1pc3Npb25zLHRoaXMuZG9zUGVybWlzc2lvbnM9ci5kb3NQZXJtaXNzaW9ucyx0aGlzLl9kYXRhPXQsdGhpcy5fZGF0YUJpbmFyeT1yLmJpbmFyeSx0aGlzLm9wdGlvbnM9e2NvbXByZXNzaW9uOnIuY29tcHJlc3Npb24sY29tcHJlc3Npb25PcHRpb25zOnIuY29tcHJlc3Npb25PcHRpb25zfX12YXIgcz1lKFwiLi9zdHJlYW0vU3RyZWFtSGVscGVyXCIpLGk9ZShcIi4vc3RyZWFtL0RhdGFXb3JrZXJcIiksYT1lKFwiLi91dGY4XCIpLG89ZShcIi4vY29tcHJlc3NlZE9iamVjdFwiKSxoPWUoXCIuL3N0cmVhbS9HZW5lcmljV29ya2VyXCIpO24ucHJvdG90eXBlPXtpbnRlcm5hbFN0cmVhbTpmdW5jdGlvbihlKXt2YXIgdD1udWxsLHI9XCJzdHJpbmdcIjt0cnl7aWYoIWUpdGhyb3cgbmV3IEVycm9yKFwiTm8gb3V0cHV0IHR5cGUgc3BlY2lmaWVkLlwiKTt2YXIgbj1cInN0cmluZ1wiPT09KHI9ZS50b0xvd2VyQ2FzZSgpKXx8XCJ0ZXh0XCI9PT1yO1wiYmluYXJ5c3RyaW5nXCIhPT1yJiZcInRleHRcIiE9PXJ8fChyPVwic3RyaW5nXCIpLHQ9dGhpcy5fZGVjb21wcmVzc1dvcmtlcigpO3ZhciBpPSF0aGlzLl9kYXRhQmluYXJ5O2kmJiFuJiYodD10LnBpcGUobmV3IGEuVXRmOEVuY29kZVdvcmtlcikpLCFpJiZuJiYodD10LnBpcGUobmV3IGEuVXRmOERlY29kZVdvcmtlcikpfWNhdGNoKGUpeyh0PW5ldyBoKFwiZXJyb3JcIikpLmVycm9yKGUpfXJldHVybiBuZXcgcyh0LHIsXCJcIil9LGFzeW5jOmZ1bmN0aW9uKGUsdCl7cmV0dXJuIHRoaXMuaW50ZXJuYWxTdHJlYW0oZSkuYWNjdW11bGF0ZSh0KX0sbm9kZVN0cmVhbTpmdW5jdGlvbihlLHQpe3JldHVybiB0aGlzLmludGVybmFsU3RyZWFtKGV8fFwibm9kZWJ1ZmZlclwiKS50b05vZGVqc1N0cmVhbSh0KX0sX2NvbXByZXNzV29ya2VyOmZ1bmN0aW9uKGUsdCl7aWYodGhpcy5fZGF0YSBpbnN0YW5jZW9mIG8mJnRoaXMuX2RhdGEuY29tcHJlc3Npb24ubWFnaWM9PT1lLm1hZ2ljKXJldHVybiB0aGlzLl9kYXRhLmdldENvbXByZXNzZWRXb3JrZXIoKTt2YXIgcj10aGlzLl9kZWNvbXByZXNzV29ya2VyKCk7cmV0dXJuIHRoaXMuX2RhdGFCaW5hcnl8fChyPXIucGlwZShuZXcgYS5VdGY4RW5jb2RlV29ya2VyKSksby5jcmVhdGVXb3JrZXJGcm9tKHIsZSx0KX0sX2RlY29tcHJlc3NXb3JrZXI6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5fZGF0YSBpbnN0YW5jZW9mIG8/dGhpcy5fZGF0YS5nZXRDb250ZW50V29ya2VyKCk6dGhpcy5fZGF0YSBpbnN0YW5jZW9mIGg/dGhpcy5fZGF0YTpuZXcgaSh0aGlzLl9kYXRhKX19O2Zvcih2YXIgdT1bXCJhc1RleHRcIixcImFzQmluYXJ5XCIsXCJhc05vZGVCdWZmZXJcIixcImFzVWludDhBcnJheVwiLFwiYXNBcnJheUJ1ZmZlclwiXSxsPWZ1bmN0aW9uKCl7dGhyb3cgbmV3IEVycm9yKFwiVGhpcyBtZXRob2QgaGFzIGJlZW4gcmVtb3ZlZCBpbiBKU1ppcCAzLjAsIHBsZWFzZSBjaGVjayB0aGUgdXBncmFkZSBndWlkZS5cIil9LGY9MDtmPHUubGVuZ3RoO2YrKyluLnByb3RvdHlwZVt1W2ZdXT1sO3QuZXhwb3J0cz1ufSx7XCIuL2NvbXByZXNzZWRPYmplY3RcIjoyLFwiLi9zdHJlYW0vRGF0YVdvcmtlclwiOjI3LFwiLi9zdHJlYW0vR2VuZXJpY1dvcmtlclwiOjI4LFwiLi9zdHJlYW0vU3RyZWFtSGVscGVyXCI6MjksXCIuL3V0ZjhcIjozMX1dLDM2OltmdW5jdGlvbihlLGwsdCl7KGZ1bmN0aW9uKHQpe1widXNlIHN0cmljdFwiO3ZhciByLG4sZT10Lk11dGF0aW9uT2JzZXJ2ZXJ8fHQuV2ViS2l0TXV0YXRpb25PYnNlcnZlcjtpZihlKXt2YXIgaT0wLHM9bmV3IGUodSksYT10LmRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiXCIpO3Mub2JzZXJ2ZShhLHtjaGFyYWN0ZXJEYXRhOiEwfSkscj1mdW5jdGlvbigpe2EuZGF0YT1pPSsraSUyfX1lbHNlIGlmKHQuc2V0SW1tZWRpYXRlfHx2b2lkIDA9PT10Lk1lc3NhZ2VDaGFubmVsKXI9XCJkb2N1bWVudFwiaW4gdCYmXCJvbnJlYWR5c3RhdGVjaGFuZ2VcImluIHQuZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKT9mdW5jdGlvbigpe3ZhciBlPXQuZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtlLm9ucmVhZHlzdGF0ZWNoYW5nZT1mdW5jdGlvbigpe3UoKSxlLm9ucmVhZHlzdGF0ZWNoYW5nZT1udWxsLGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlKSxlPW51bGx9LHQuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmFwcGVuZENoaWxkKGUpfTpmdW5jdGlvbigpe3NldFRpbWVvdXQodSwwKX07ZWxzZXt2YXIgbz1uZXcgdC5NZXNzYWdlQ2hhbm5lbDtvLnBvcnQxLm9ubWVzc2FnZT11LHI9ZnVuY3Rpb24oKXtvLnBvcnQyLnBvc3RNZXNzYWdlKDApfX12YXIgaD1bXTtmdW5jdGlvbiB1KCl7dmFyIGUsdDtuPSEwO2Zvcih2YXIgcj1oLmxlbmd0aDtyOyl7Zm9yKHQ9aCxoPVtdLGU9LTE7KytlPHI7KXRbZV0oKTtyPWgubGVuZ3RofW49ITF9bC5leHBvcnRzPWZ1bmN0aW9uKGUpezEhPT1oLnB1c2goZSl8fG58fHIoKX19KS5jYWxsKHRoaXMsXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGdsb2JhbD9nbG9iYWw6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGY/c2VsZjpcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P3dpbmRvdzp7fSl9LHt9XSwzNzpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3ZhciBpPWUoXCJpbW1lZGlhdGVcIik7ZnVuY3Rpb24gdSgpe312YXIgbD17fSxzPVtcIlJFSkVDVEVEXCJdLGE9W1wiRlVMRklMTEVEXCJdLG49W1wiUEVORElOR1wiXTtmdW5jdGlvbiBvKGUpe2lmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIGUpdGhyb3cgbmV3IFR5cGVFcnJvcihcInJlc29sdmVyIG11c3QgYmUgYSBmdW5jdGlvblwiKTt0aGlzLnN0YXRlPW4sdGhpcy5xdWV1ZT1bXSx0aGlzLm91dGNvbWU9dm9pZCAwLGUhPT11JiZkKHRoaXMsZSl9ZnVuY3Rpb24gaChlLHQscil7dGhpcy5wcm9taXNlPWUsXCJmdW5jdGlvblwiPT10eXBlb2YgdCYmKHRoaXMub25GdWxmaWxsZWQ9dCx0aGlzLmNhbGxGdWxmaWxsZWQ9dGhpcy5vdGhlckNhbGxGdWxmaWxsZWQpLFwiZnVuY3Rpb25cIj09dHlwZW9mIHImJih0aGlzLm9uUmVqZWN0ZWQ9cix0aGlzLmNhbGxSZWplY3RlZD10aGlzLm90aGVyQ2FsbFJlamVjdGVkKX1mdW5jdGlvbiBmKHQscixuKXtpKGZ1bmN0aW9uKCl7dmFyIGU7dHJ5e2U9cihuKX1jYXRjaChlKXtyZXR1cm4gbC5yZWplY3QodCxlKX1lPT09dD9sLnJlamVjdCh0LG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgcmVzb2x2ZSBwcm9taXNlIHdpdGggaXRzZWxmXCIpKTpsLnJlc29sdmUodCxlKX0pfWZ1bmN0aW9uIGMoZSl7dmFyIHQ9ZSYmZS50aGVuO2lmKGUmJihcIm9iamVjdFwiPT10eXBlb2YgZXx8XCJmdW5jdGlvblwiPT10eXBlb2YgZSkmJlwiZnVuY3Rpb25cIj09dHlwZW9mIHQpcmV0dXJuIGZ1bmN0aW9uKCl7dC5hcHBseShlLGFyZ3VtZW50cyl9fWZ1bmN0aW9uIGQodCxlKXt2YXIgcj0hMTtmdW5jdGlvbiBuKGUpe3J8fChyPSEwLGwucmVqZWN0KHQsZSkpfWZ1bmN0aW9uIGkoZSl7cnx8KHI9ITAsbC5yZXNvbHZlKHQsZSkpfXZhciBzPXAoZnVuY3Rpb24oKXtlKGksbil9KTtcImVycm9yXCI9PT1zLnN0YXR1cyYmbihzLnZhbHVlKX1mdW5jdGlvbiBwKGUsdCl7dmFyIHI9e307dHJ5e3IudmFsdWU9ZSh0KSxyLnN0YXR1cz1cInN1Y2Nlc3NcIn1jYXRjaChlKXtyLnN0YXR1cz1cImVycm9yXCIsci52YWx1ZT1lfXJldHVybiByfSh0LmV4cG9ydHM9bykucHJvdG90eXBlLmZpbmFsbHk9ZnVuY3Rpb24odCl7aWYoXCJmdW5jdGlvblwiIT10eXBlb2YgdClyZXR1cm4gdGhpczt2YXIgcj10aGlzLmNvbnN0cnVjdG9yO3JldHVybiB0aGlzLnRoZW4oZnVuY3Rpb24oZSl7cmV0dXJuIHIucmVzb2x2ZSh0KCkpLnRoZW4oZnVuY3Rpb24oKXtyZXR1cm4gZX0pfSxmdW5jdGlvbihlKXtyZXR1cm4gci5yZXNvbHZlKHQoKSkudGhlbihmdW5jdGlvbigpe3Rocm93IGV9KX0pfSxvLnByb3RvdHlwZS5jYXRjaD1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy50aGVuKG51bGwsZSl9LG8ucHJvdG90eXBlLnRoZW49ZnVuY3Rpb24oZSx0KXtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiBlJiZ0aGlzLnN0YXRlPT09YXx8XCJmdW5jdGlvblwiIT10eXBlb2YgdCYmdGhpcy5zdGF0ZT09PXMpcmV0dXJuIHRoaXM7dmFyIHI9bmV3IHRoaXMuY29uc3RydWN0b3IodSk7dGhpcy5zdGF0ZSE9PW4/ZihyLHRoaXMuc3RhdGU9PT1hP2U6dCx0aGlzLm91dGNvbWUpOnRoaXMucXVldWUucHVzaChuZXcgaChyLGUsdCkpO3JldHVybiByfSxoLnByb3RvdHlwZS5jYWxsRnVsZmlsbGVkPWZ1bmN0aW9uKGUpe2wucmVzb2x2ZSh0aGlzLnByb21pc2UsZSl9LGgucHJvdG90eXBlLm90aGVyQ2FsbEZ1bGZpbGxlZD1mdW5jdGlvbihlKXtmKHRoaXMucHJvbWlzZSx0aGlzLm9uRnVsZmlsbGVkLGUpfSxoLnByb3RvdHlwZS5jYWxsUmVqZWN0ZWQ9ZnVuY3Rpb24oZSl7bC5yZWplY3QodGhpcy5wcm9taXNlLGUpfSxoLnByb3RvdHlwZS5vdGhlckNhbGxSZWplY3RlZD1mdW5jdGlvbihlKXtmKHRoaXMucHJvbWlzZSx0aGlzLm9uUmVqZWN0ZWQsZSl9LGwucmVzb2x2ZT1mdW5jdGlvbihlLHQpe3ZhciByPXAoYyx0KTtpZihcImVycm9yXCI9PT1yLnN0YXR1cylyZXR1cm4gbC5yZWplY3QoZSxyLnZhbHVlKTt2YXIgbj1yLnZhbHVlO2lmKG4pZChlLG4pO2Vsc2V7ZS5zdGF0ZT1hLGUub3V0Y29tZT10O2Zvcih2YXIgaT0tMSxzPWUucXVldWUubGVuZ3RoOysraTxzOyllLnF1ZXVlW2ldLmNhbGxGdWxmaWxsZWQodCl9cmV0dXJuIGV9LGwucmVqZWN0PWZ1bmN0aW9uKGUsdCl7ZS5zdGF0ZT1zLGUub3V0Y29tZT10O2Zvcih2YXIgcj0tMSxuPWUucXVldWUubGVuZ3RoOysrcjxuOyllLnF1ZXVlW3JdLmNhbGxSZWplY3RlZCh0KTtyZXR1cm4gZX0sby5yZXNvbHZlPWZ1bmN0aW9uKGUpe2lmKGUgaW5zdGFuY2VvZiB0aGlzKXJldHVybiBlO3JldHVybiBsLnJlc29sdmUobmV3IHRoaXModSksZSl9LG8ucmVqZWN0PWZ1bmN0aW9uKGUpe3ZhciB0PW5ldyB0aGlzKHUpO3JldHVybiBsLnJlamVjdCh0LGUpfSxvLmFsbD1mdW5jdGlvbihlKXt2YXIgcj10aGlzO2lmKFwiW29iamVjdCBBcnJheV1cIiE9PU9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChlKSlyZXR1cm4gdGhpcy5yZWplY3QobmV3IFR5cGVFcnJvcihcIm11c3QgYmUgYW4gYXJyYXlcIikpO3ZhciBuPWUubGVuZ3RoLGk9ITE7aWYoIW4pcmV0dXJuIHRoaXMucmVzb2x2ZShbXSk7dmFyIHM9bmV3IEFycmF5KG4pLGE9MCx0PS0xLG89bmV3IHRoaXModSk7Zm9yKDsrK3Q8bjspaChlW3RdLHQpO3JldHVybiBvO2Z1bmN0aW9uIGgoZSx0KXtyLnJlc29sdmUoZSkudGhlbihmdW5jdGlvbihlKXtzW3RdPWUsKythIT09bnx8aXx8KGk9ITAsbC5yZXNvbHZlKG8scykpfSxmdW5jdGlvbihlKXtpfHwoaT0hMCxsLnJlamVjdChvLGUpKX0pfX0sby5yYWNlPWZ1bmN0aW9uKGUpe3ZhciB0PXRoaXM7aWYoXCJbb2JqZWN0IEFycmF5XVwiIT09T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGUpKXJldHVybiB0aGlzLnJlamVjdChuZXcgVHlwZUVycm9yKFwibXVzdCBiZSBhbiBhcnJheVwiKSk7dmFyIHI9ZS5sZW5ndGgsbj0hMTtpZighcilyZXR1cm4gdGhpcy5yZXNvbHZlKFtdKTt2YXIgaT0tMSxzPW5ldyB0aGlzKHUpO2Zvcig7KytpPHI7KWE9ZVtpXSx0LnJlc29sdmUoYSkudGhlbihmdW5jdGlvbihlKXtufHwobj0hMCxsLnJlc29sdmUocyxlKSl9LGZ1bmN0aW9uKGUpe258fChuPSEwLGwucmVqZWN0KHMsZSkpfSk7dmFyIGE7cmV0dXJuIHN9fSx7aW1tZWRpYXRlOjM2fV0sMzg6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt2YXIgbj17fTsoMCxlKFwiLi9saWIvdXRpbHMvY29tbW9uXCIpLmFzc2lnbikobixlKFwiLi9saWIvZGVmbGF0ZVwiKSxlKFwiLi9saWIvaW5mbGF0ZVwiKSxlKFwiLi9saWIvemxpYi9jb25zdGFudHNcIikpLHQuZXhwb3J0cz1ufSx7XCIuL2xpYi9kZWZsYXRlXCI6MzksXCIuL2xpYi9pbmZsYXRlXCI6NDAsXCIuL2xpYi91dGlscy9jb21tb25cIjo0MSxcIi4vbGliL3psaWIvY29uc3RhbnRzXCI6NDR9XSwzOTpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3ZhciBhPWUoXCIuL3psaWIvZGVmbGF0ZVwiKSxvPWUoXCIuL3V0aWxzL2NvbW1vblwiKSxoPWUoXCIuL3V0aWxzL3N0cmluZ3NcIiksaT1lKFwiLi96bGliL21lc3NhZ2VzXCIpLHM9ZShcIi4vemxpYi96c3RyZWFtXCIpLHU9T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZyxsPTAsZj0tMSxjPTAsZD04O2Z1bmN0aW9uIHAoZSl7aWYoISh0aGlzIGluc3RhbmNlb2YgcCkpcmV0dXJuIG5ldyBwKGUpO3RoaXMub3B0aW9ucz1vLmFzc2lnbih7bGV2ZWw6ZixtZXRob2Q6ZCxjaHVua1NpemU6MTYzODQsd2luZG93Qml0czoxNSxtZW1MZXZlbDo4LHN0cmF0ZWd5OmMsdG86XCJcIn0sZXx8e30pO3ZhciB0PXRoaXMub3B0aW9uczt0LnJhdyYmMDx0LndpbmRvd0JpdHM/dC53aW5kb3dCaXRzPS10LndpbmRvd0JpdHM6dC5nemlwJiYwPHQud2luZG93Qml0cyYmdC53aW5kb3dCaXRzPDE2JiYodC53aW5kb3dCaXRzKz0xNiksdGhpcy5lcnI9MCx0aGlzLm1zZz1cIlwiLHRoaXMuZW5kZWQ9ITEsdGhpcy5jaHVua3M9W10sdGhpcy5zdHJtPW5ldyBzLHRoaXMuc3RybS5hdmFpbF9vdXQ9MDt2YXIgcj1hLmRlZmxhdGVJbml0Mih0aGlzLnN0cm0sdC5sZXZlbCx0Lm1ldGhvZCx0LndpbmRvd0JpdHMsdC5tZW1MZXZlbCx0LnN0cmF0ZWd5KTtpZihyIT09bCl0aHJvdyBuZXcgRXJyb3IoaVtyXSk7aWYodC5oZWFkZXImJmEuZGVmbGF0ZVNldEhlYWRlcih0aGlzLnN0cm0sdC5oZWFkZXIpLHQuZGljdGlvbmFyeSl7dmFyIG47aWYobj1cInN0cmluZ1wiPT10eXBlb2YgdC5kaWN0aW9uYXJ5P2guc3RyaW5nMmJ1Zih0LmRpY3Rpb25hcnkpOlwiW29iamVjdCBBcnJheUJ1ZmZlcl1cIj09PXUuY2FsbCh0LmRpY3Rpb25hcnkpP25ldyBVaW50OEFycmF5KHQuZGljdGlvbmFyeSk6dC5kaWN0aW9uYXJ5LChyPWEuZGVmbGF0ZVNldERpY3Rpb25hcnkodGhpcy5zdHJtLG4pKSE9PWwpdGhyb3cgbmV3IEVycm9yKGlbcl0pO3RoaXMuX2RpY3Rfc2V0PSEwfX1mdW5jdGlvbiBuKGUsdCl7dmFyIHI9bmV3IHAodCk7aWYoci5wdXNoKGUsITApLHIuZXJyKXRocm93IHIubXNnfHxpW3IuZXJyXTtyZXR1cm4gci5yZXN1bHR9cC5wcm90b3R5cGUucHVzaD1mdW5jdGlvbihlLHQpe3ZhciByLG4saT10aGlzLnN0cm0scz10aGlzLm9wdGlvbnMuY2h1bmtTaXplO2lmKHRoaXMuZW5kZWQpcmV0dXJuITE7bj10PT09fn50P3Q6ITA9PT10PzQ6MCxcInN0cmluZ1wiPT10eXBlb2YgZT9pLmlucHV0PWguc3RyaW5nMmJ1ZihlKTpcIltvYmplY3QgQXJyYXlCdWZmZXJdXCI9PT11LmNhbGwoZSk/aS5pbnB1dD1uZXcgVWludDhBcnJheShlKTppLmlucHV0PWUsaS5uZXh0X2luPTAsaS5hdmFpbF9pbj1pLmlucHV0Lmxlbmd0aDtkb3tpZigwPT09aS5hdmFpbF9vdXQmJihpLm91dHB1dD1uZXcgby5CdWY4KHMpLGkubmV4dF9vdXQ9MCxpLmF2YWlsX291dD1zKSwxIT09KHI9YS5kZWZsYXRlKGksbikpJiZyIT09bClyZXR1cm4gdGhpcy5vbkVuZChyKSwhKHRoaXMuZW5kZWQ9ITApOzAhPT1pLmF2YWlsX291dCYmKDAhPT1pLmF2YWlsX2lufHw0IT09biYmMiE9PW4pfHwoXCJzdHJpbmdcIj09PXRoaXMub3B0aW9ucy50bz90aGlzLm9uRGF0YShoLmJ1ZjJiaW5zdHJpbmcoby5zaHJpbmtCdWYoaS5vdXRwdXQsaS5uZXh0X291dCkpKTp0aGlzLm9uRGF0YShvLnNocmlua0J1ZihpLm91dHB1dCxpLm5leHRfb3V0KSkpfXdoaWxlKCgwPGkuYXZhaWxfaW58fDA9PT1pLmF2YWlsX291dCkmJjEhPT1yKTtyZXR1cm4gND09PW4/KHI9YS5kZWZsYXRlRW5kKHRoaXMuc3RybSksdGhpcy5vbkVuZChyKSx0aGlzLmVuZGVkPSEwLHI9PT1sKToyIT09bnx8KHRoaXMub25FbmQobCksIShpLmF2YWlsX291dD0wKSl9LHAucHJvdG90eXBlLm9uRGF0YT1mdW5jdGlvbihlKXt0aGlzLmNodW5rcy5wdXNoKGUpfSxwLnByb3RvdHlwZS5vbkVuZD1mdW5jdGlvbihlKXtlPT09bCYmKFwic3RyaW5nXCI9PT10aGlzLm9wdGlvbnMudG8/dGhpcy5yZXN1bHQ9dGhpcy5jaHVua3Muam9pbihcIlwiKTp0aGlzLnJlc3VsdD1vLmZsYXR0ZW5DaHVua3ModGhpcy5jaHVua3MpKSx0aGlzLmNodW5rcz1bXSx0aGlzLmVycj1lLHRoaXMubXNnPXRoaXMuc3RybS5tc2d9LHIuRGVmbGF0ZT1wLHIuZGVmbGF0ZT1uLHIuZGVmbGF0ZVJhdz1mdW5jdGlvbihlLHQpe3JldHVybih0PXR8fHt9KS5yYXc9ITAsbihlLHQpfSxyLmd6aXA9ZnVuY3Rpb24oZSx0KXtyZXR1cm4odD10fHx7fSkuZ3ppcD0hMCxuKGUsdCl9fSx7XCIuL3V0aWxzL2NvbW1vblwiOjQxLFwiLi91dGlscy9zdHJpbmdzXCI6NDIsXCIuL3psaWIvZGVmbGF0ZVwiOjQ2LFwiLi96bGliL21lc3NhZ2VzXCI6NTEsXCIuL3psaWIvenN0cmVhbVwiOjUzfV0sNDA6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt2YXIgYz1lKFwiLi96bGliL2luZmxhdGVcIiksZD1lKFwiLi91dGlscy9jb21tb25cIikscD1lKFwiLi91dGlscy9zdHJpbmdzXCIpLG09ZShcIi4vemxpYi9jb25zdGFudHNcIiksbj1lKFwiLi96bGliL21lc3NhZ2VzXCIpLGk9ZShcIi4vemxpYi96c3RyZWFtXCIpLHM9ZShcIi4vemxpYi9nemhlYWRlclwiKSxfPU9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7ZnVuY3Rpb24gYShlKXtpZighKHRoaXMgaW5zdGFuY2VvZiBhKSlyZXR1cm4gbmV3IGEoZSk7dGhpcy5vcHRpb25zPWQuYXNzaWduKHtjaHVua1NpemU6MTYzODQsd2luZG93Qml0czowLHRvOlwiXCJ9LGV8fHt9KTt2YXIgdD10aGlzLm9wdGlvbnM7dC5yYXcmJjA8PXQud2luZG93Qml0cyYmdC53aW5kb3dCaXRzPDE2JiYodC53aW5kb3dCaXRzPS10LndpbmRvd0JpdHMsMD09PXQud2luZG93Qml0cyYmKHQud2luZG93Qml0cz0tMTUpKSwhKDA8PXQud2luZG93Qml0cyYmdC53aW5kb3dCaXRzPDE2KXx8ZSYmZS53aW5kb3dCaXRzfHwodC53aW5kb3dCaXRzKz0zMiksMTU8dC53aW5kb3dCaXRzJiZ0LndpbmRvd0JpdHM8NDgmJjA9PSgxNSZ0LndpbmRvd0JpdHMpJiYodC53aW5kb3dCaXRzfD0xNSksdGhpcy5lcnI9MCx0aGlzLm1zZz1cIlwiLHRoaXMuZW5kZWQ9ITEsdGhpcy5jaHVua3M9W10sdGhpcy5zdHJtPW5ldyBpLHRoaXMuc3RybS5hdmFpbF9vdXQ9MDt2YXIgcj1jLmluZmxhdGVJbml0Mih0aGlzLnN0cm0sdC53aW5kb3dCaXRzKTtpZihyIT09bS5aX09LKXRocm93IG5ldyBFcnJvcihuW3JdKTt0aGlzLmhlYWRlcj1uZXcgcyxjLmluZmxhdGVHZXRIZWFkZXIodGhpcy5zdHJtLHRoaXMuaGVhZGVyKX1mdW5jdGlvbiBvKGUsdCl7dmFyIHI9bmV3IGEodCk7aWYoci5wdXNoKGUsITApLHIuZXJyKXRocm93IHIubXNnfHxuW3IuZXJyXTtyZXR1cm4gci5yZXN1bHR9YS5wcm90b3R5cGUucHVzaD1mdW5jdGlvbihlLHQpe3ZhciByLG4saSxzLGEsbyxoPXRoaXMuc3RybSx1PXRoaXMub3B0aW9ucy5jaHVua1NpemUsbD10aGlzLm9wdGlvbnMuZGljdGlvbmFyeSxmPSExO2lmKHRoaXMuZW5kZWQpcmV0dXJuITE7bj10PT09fn50P3Q6ITA9PT10P20uWl9GSU5JU0g6bS5aX05PX0ZMVVNILFwic3RyaW5nXCI9PXR5cGVvZiBlP2guaW5wdXQ9cC5iaW5zdHJpbmcyYnVmKGUpOlwiW29iamVjdCBBcnJheUJ1ZmZlcl1cIj09PV8uY2FsbChlKT9oLmlucHV0PW5ldyBVaW50OEFycmF5KGUpOmguaW5wdXQ9ZSxoLm5leHRfaW49MCxoLmF2YWlsX2luPWguaW5wdXQubGVuZ3RoO2Rve2lmKDA9PT1oLmF2YWlsX291dCYmKGgub3V0cHV0PW5ldyBkLkJ1ZjgodSksaC5uZXh0X291dD0wLGguYXZhaWxfb3V0PXUpLChyPWMuaW5mbGF0ZShoLG0uWl9OT19GTFVTSCkpPT09bS5aX05FRURfRElDVCYmbCYmKG89XCJzdHJpbmdcIj09dHlwZW9mIGw/cC5zdHJpbmcyYnVmKGwpOlwiW29iamVjdCBBcnJheUJ1ZmZlcl1cIj09PV8uY2FsbChsKT9uZXcgVWludDhBcnJheShsKTpsLHI9Yy5pbmZsYXRlU2V0RGljdGlvbmFyeSh0aGlzLnN0cm0sbykpLHI9PT1tLlpfQlVGX0VSUk9SJiYhMD09PWYmJihyPW0uWl9PSyxmPSExKSxyIT09bS5aX1NUUkVBTV9FTkQmJnIhPT1tLlpfT0spcmV0dXJuIHRoaXMub25FbmQociksISh0aGlzLmVuZGVkPSEwKTtoLm5leHRfb3V0JiYoMCE9PWguYXZhaWxfb3V0JiZyIT09bS5aX1NUUkVBTV9FTkQmJigwIT09aC5hdmFpbF9pbnx8biE9PW0uWl9GSU5JU0gmJm4hPT1tLlpfU1lOQ19GTFVTSCl8fChcInN0cmluZ1wiPT09dGhpcy5vcHRpb25zLnRvPyhpPXAudXRmOGJvcmRlcihoLm91dHB1dCxoLm5leHRfb3V0KSxzPWgubmV4dF9vdXQtaSxhPXAuYnVmMnN0cmluZyhoLm91dHB1dCxpKSxoLm5leHRfb3V0PXMsaC5hdmFpbF9vdXQ9dS1zLHMmJmQuYXJyYXlTZXQoaC5vdXRwdXQsaC5vdXRwdXQsaSxzLDApLHRoaXMub25EYXRhKGEpKTp0aGlzLm9uRGF0YShkLnNocmlua0J1ZihoLm91dHB1dCxoLm5leHRfb3V0KSkpKSwwPT09aC5hdmFpbF9pbiYmMD09PWguYXZhaWxfb3V0JiYoZj0hMCl9d2hpbGUoKDA8aC5hdmFpbF9pbnx8MD09PWguYXZhaWxfb3V0KSYmciE9PW0uWl9TVFJFQU1fRU5EKTtyZXR1cm4gcj09PW0uWl9TVFJFQU1fRU5EJiYobj1tLlpfRklOSVNIKSxuPT09bS5aX0ZJTklTSD8ocj1jLmluZmxhdGVFbmQodGhpcy5zdHJtKSx0aGlzLm9uRW5kKHIpLHRoaXMuZW5kZWQ9ITAscj09PW0uWl9PSyk6biE9PW0uWl9TWU5DX0ZMVVNIfHwodGhpcy5vbkVuZChtLlpfT0spLCEoaC5hdmFpbF9vdXQ9MCkpfSxhLnByb3RvdHlwZS5vbkRhdGE9ZnVuY3Rpb24oZSl7dGhpcy5jaHVua3MucHVzaChlKX0sYS5wcm90b3R5cGUub25FbmQ9ZnVuY3Rpb24oZSl7ZT09PW0uWl9PSyYmKFwic3RyaW5nXCI9PT10aGlzLm9wdGlvbnMudG8/dGhpcy5yZXN1bHQ9dGhpcy5jaHVua3Muam9pbihcIlwiKTp0aGlzLnJlc3VsdD1kLmZsYXR0ZW5DaHVua3ModGhpcy5jaHVua3MpKSx0aGlzLmNodW5rcz1bXSx0aGlzLmVycj1lLHRoaXMubXNnPXRoaXMuc3RybS5tc2d9LHIuSW5mbGF0ZT1hLHIuaW5mbGF0ZT1vLHIuaW5mbGF0ZVJhdz1mdW5jdGlvbihlLHQpe3JldHVybih0PXR8fHt9KS5yYXc9ITAsbyhlLHQpfSxyLnVuZ3ppcD1vfSx7XCIuL3V0aWxzL2NvbW1vblwiOjQxLFwiLi91dGlscy9zdHJpbmdzXCI6NDIsXCIuL3psaWIvY29uc3RhbnRzXCI6NDQsXCIuL3psaWIvZ3poZWFkZXJcIjo0NyxcIi4vemxpYi9pbmZsYXRlXCI6NDksXCIuL3psaWIvbWVzc2FnZXNcIjo1MSxcIi4vemxpYi96c3RyZWFtXCI6NTN9XSw0MTpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3ZhciBuPVwidW5kZWZpbmVkXCIhPXR5cGVvZiBVaW50OEFycmF5JiZcInVuZGVmaW5lZFwiIT10eXBlb2YgVWludDE2QXJyYXkmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBJbnQzMkFycmF5O3IuYXNzaWduPWZ1bmN0aW9uKGUpe2Zvcih2YXIgdD1BcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsMSk7dC5sZW5ndGg7KXt2YXIgcj10LnNoaWZ0KCk7aWYocil7aWYoXCJvYmplY3RcIiE9dHlwZW9mIHIpdGhyb3cgbmV3IFR5cGVFcnJvcihyK1wibXVzdCBiZSBub24tb2JqZWN0XCIpO2Zvcih2YXIgbiBpbiByKXIuaGFzT3duUHJvcGVydHkobikmJihlW25dPXJbbl0pfX1yZXR1cm4gZX0sci5zaHJpbmtCdWY9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gZS5sZW5ndGg9PT10P2U6ZS5zdWJhcnJheT9lLnN1YmFycmF5KDAsdCk6KGUubGVuZ3RoPXQsZSl9O3ZhciBpPXthcnJheVNldDpmdW5jdGlvbihlLHQscixuLGkpe2lmKHQuc3ViYXJyYXkmJmUuc3ViYXJyYXkpZS5zZXQodC5zdWJhcnJheShyLHIrbiksaSk7ZWxzZSBmb3IodmFyIHM9MDtzPG47cysrKWVbaStzXT10W3Irc119LGZsYXR0ZW5DaHVua3M6ZnVuY3Rpb24oZSl7dmFyIHQscixuLGkscyxhO2Zvcih0PW49MCxyPWUubGVuZ3RoO3Q8cjt0Kyspbis9ZVt0XS5sZW5ndGg7Zm9yKGE9bmV3IFVpbnQ4QXJyYXkobiksdD1pPTAscj1lLmxlbmd0aDt0PHI7dCsrKXM9ZVt0XSxhLnNldChzLGkpLGkrPXMubGVuZ3RoO3JldHVybiBhfX0scz17YXJyYXlTZXQ6ZnVuY3Rpb24oZSx0LHIsbixpKXtmb3IodmFyIHM9MDtzPG47cysrKWVbaStzXT10W3Irc119LGZsYXR0ZW5DaHVua3M6ZnVuY3Rpb24oZSl7cmV0dXJuW10uY29uY2F0LmFwcGx5KFtdLGUpfX07ci5zZXRUeXBlZD1mdW5jdGlvbihlKXtlPyhyLkJ1Zjg9VWludDhBcnJheSxyLkJ1ZjE2PVVpbnQxNkFycmF5LHIuQnVmMzI9SW50MzJBcnJheSxyLmFzc2lnbihyLGkpKTooci5CdWY4PUFycmF5LHIuQnVmMTY9QXJyYXksci5CdWYzMj1BcnJheSxyLmFzc2lnbihyLHMpKX0sci5zZXRUeXBlZChuKX0se31dLDQyOltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7dmFyIGg9ZShcIi4vY29tbW9uXCIpLGk9ITAscz0hMDt0cnl7U3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLFswXSl9Y2F0Y2goZSl7aT0hMX10cnl7U3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLG5ldyBVaW50OEFycmF5KDEpKX1jYXRjaChlKXtzPSExfWZvcih2YXIgdT1uZXcgaC5CdWY4KDI1Niksbj0wO248MjU2O24rKyl1W25dPTI1Mjw9bj82OjI0ODw9bj81OjI0MDw9bj80OjIyNDw9bj8zOjE5Mjw9bj8yOjE7ZnVuY3Rpb24gbChlLHQpe2lmKHQ8NjU1MzcmJihlLnN1YmFycmF5JiZzfHwhZS5zdWJhcnJheSYmaSkpcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCxoLnNocmlua0J1ZihlLHQpKTtmb3IodmFyIHI9XCJcIixuPTA7bjx0O24rKylyKz1TdHJpbmcuZnJvbUNoYXJDb2RlKGVbbl0pO3JldHVybiByfXVbMjU0XT11WzI1NF09MSxyLnN0cmluZzJidWY9ZnVuY3Rpb24oZSl7dmFyIHQscixuLGkscyxhPWUubGVuZ3RoLG89MDtmb3IoaT0wO2k8YTtpKyspNTUyOTY9PSg2NDUxMiYocj1lLmNoYXJDb2RlQXQoaSkpKSYmaSsxPGEmJjU2MzIwPT0oNjQ1MTImKG49ZS5jaGFyQ29kZUF0KGkrMSkpKSYmKHI9NjU1MzYrKHItNTUyOTY8PDEwKSsobi01NjMyMCksaSsrKSxvKz1yPDEyOD8xOnI8MjA0OD8yOnI8NjU1MzY/Mzo0O2Zvcih0PW5ldyBoLkJ1ZjgobyksaT1zPTA7czxvO2krKyk1NTI5Nj09KDY0NTEyJihyPWUuY2hhckNvZGVBdChpKSkpJiZpKzE8YSYmNTYzMjA9PSg2NDUxMiYobj1lLmNoYXJDb2RlQXQoaSsxKSkpJiYocj02NTUzNisoci01NTI5Njw8MTApKyhuLTU2MzIwKSxpKyspLHI8MTI4P3RbcysrXT1yOihyPDIwNDg/dFtzKytdPTE5MnxyPj4+Njoocjw2NTUzNj90W3MrK109MjI0fHI+Pj4xMjoodFtzKytdPTI0MHxyPj4+MTgsdFtzKytdPTEyOHxyPj4+MTImNjMpLHRbcysrXT0xMjh8cj4+PjYmNjMpLHRbcysrXT0xMjh8NjMmcik7cmV0dXJuIHR9LHIuYnVmMmJpbnN0cmluZz1mdW5jdGlvbihlKXtyZXR1cm4gbChlLGUubGVuZ3RoKX0sci5iaW5zdHJpbmcyYnVmPWZ1bmN0aW9uKGUpe2Zvcih2YXIgdD1uZXcgaC5CdWY4KGUubGVuZ3RoKSxyPTAsbj10Lmxlbmd0aDtyPG47cisrKXRbcl09ZS5jaGFyQ29kZUF0KHIpO3JldHVybiB0fSxyLmJ1ZjJzdHJpbmc9ZnVuY3Rpb24oZSx0KXt2YXIgcixuLGkscyxhPXR8fGUubGVuZ3RoLG89bmV3IEFycmF5KDIqYSk7Zm9yKHI9bj0wO3I8YTspaWYoKGk9ZVtyKytdKTwxMjgpb1tuKytdPWk7ZWxzZSBpZig0PChzPXVbaV0pKW9bbisrXT02NTUzMyxyKz1zLTE7ZWxzZXtmb3IoaSY9Mj09PXM/MzE6Mz09PXM/MTU6NzsxPHMmJnI8YTspaT1pPDw2fDYzJmVbcisrXSxzLS07MTxzP29bbisrXT02NTUzMzppPDY1NTM2P29bbisrXT1pOihpLT02NTUzNixvW24rK109NTUyOTZ8aT4+MTAmMTAyMyxvW24rK109NTYzMjB8MTAyMyZpKX1yZXR1cm4gbChvLG4pfSxyLnV0Zjhib3JkZXI9ZnVuY3Rpb24oZSx0KXt2YXIgcjtmb3IoKHQ9dHx8ZS5sZW5ndGgpPmUubGVuZ3RoJiYodD1lLmxlbmd0aCkscj10LTE7MDw9ciYmMTI4PT0oMTkyJmVbcl0pOylyLS07cmV0dXJuIHI8MD90OjA9PT1yP3Q6cit1W2Vbcl1dPnQ/cjp0fX0se1wiLi9jb21tb25cIjo0MX1dLDQzOltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7dC5leHBvcnRzPWZ1bmN0aW9uKGUsdCxyLG4pe2Zvcih2YXIgaT02NTUzNSZlfDAscz1lPj4+MTYmNjU1MzV8MCxhPTA7MCE9PXI7KXtmb3Ioci09YT0yZTM8cj8yZTM6cjtzPXMrKGk9aSt0W24rK118MCl8MCwtLWE7KTtpJT02NTUyMSxzJT02NTUyMX1yZXR1cm4gaXxzPDwxNnwwfX0se31dLDQ0OltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7dC5leHBvcnRzPXtaX05PX0ZMVVNIOjAsWl9QQVJUSUFMX0ZMVVNIOjEsWl9TWU5DX0ZMVVNIOjIsWl9GVUxMX0ZMVVNIOjMsWl9GSU5JU0g6NCxaX0JMT0NLOjUsWl9UUkVFUzo2LFpfT0s6MCxaX1NUUkVBTV9FTkQ6MSxaX05FRURfRElDVDoyLFpfRVJSTk86LTEsWl9TVFJFQU1fRVJST1I6LTIsWl9EQVRBX0VSUk9SOi0zLFpfQlVGX0VSUk9SOi01LFpfTk9fQ09NUFJFU1NJT046MCxaX0JFU1RfU1BFRUQ6MSxaX0JFU1RfQ09NUFJFU1NJT046OSxaX0RFRkFVTFRfQ09NUFJFU1NJT046LTEsWl9GSUxURVJFRDoxLFpfSFVGRk1BTl9PTkxZOjIsWl9STEU6MyxaX0ZJWEVEOjQsWl9ERUZBVUxUX1NUUkFURUdZOjAsWl9CSU5BUlk6MCxaX1RFWFQ6MSxaX1VOS05PV046MixaX0RFRkxBVEVEOjh9fSx7fV0sNDU6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt2YXIgbz1mdW5jdGlvbigpe2Zvcih2YXIgZSx0PVtdLHI9MDtyPDI1NjtyKyspe2U9cjtmb3IodmFyIG49MDtuPDg7bisrKWU9MSZlPzM5ODgyOTIzODReZT4+PjE6ZT4+PjE7dFtyXT1lfXJldHVybiB0fSgpO3QuZXhwb3J0cz1mdW5jdGlvbihlLHQscixuKXt2YXIgaT1vLHM9bityO2VePS0xO2Zvcih2YXIgYT1uO2E8czthKyspZT1lPj4+OF5pWzI1NSYoZV50W2FdKV07cmV0dXJuLTFeZX19LHt9XSw0NjpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3ZhciBoLGM9ZShcIi4uL3V0aWxzL2NvbW1vblwiKSx1PWUoXCIuL3RyZWVzXCIpLGQ9ZShcIi4vYWRsZXIzMlwiKSxwPWUoXCIuL2NyYzMyXCIpLG49ZShcIi4vbWVzc2FnZXNcIiksbD0wLGY9NCxtPTAsXz0tMixnPS0xLGI9NCxpPTIsdj04LHk9OSxzPTI4NixhPTMwLG89MTksdz0yKnMrMSxrPTE1LHg9MyxTPTI1OCx6PVMreCsxLEM9NDIsRT0xMTMsQT0xLEk9MixPPTMsQj00O2Z1bmN0aW9uIFIoZSx0KXtyZXR1cm4gZS5tc2c9blt0XSx0fWZ1bmN0aW9uIFQoZSl7cmV0dXJuKGU8PDEpLSg0PGU/OTowKX1mdW5jdGlvbiBEKGUpe2Zvcih2YXIgdD1lLmxlbmd0aDswPD0tLXQ7KWVbdF09MH1mdW5jdGlvbiBGKGUpe3ZhciB0PWUuc3RhdGUscj10LnBlbmRpbmc7cj5lLmF2YWlsX291dCYmKHI9ZS5hdmFpbF9vdXQpLDAhPT1yJiYoYy5hcnJheVNldChlLm91dHB1dCx0LnBlbmRpbmdfYnVmLHQucGVuZGluZ19vdXQscixlLm5leHRfb3V0KSxlLm5leHRfb3V0Kz1yLHQucGVuZGluZ19vdXQrPXIsZS50b3RhbF9vdXQrPXIsZS5hdmFpbF9vdXQtPXIsdC5wZW5kaW5nLT1yLDA9PT10LnBlbmRpbmcmJih0LnBlbmRpbmdfb3V0PTApKX1mdW5jdGlvbiBOKGUsdCl7dS5fdHJfZmx1c2hfYmxvY2soZSwwPD1lLmJsb2NrX3N0YXJ0P2UuYmxvY2tfc3RhcnQ6LTEsZS5zdHJzdGFydC1lLmJsb2NrX3N0YXJ0LHQpLGUuYmxvY2tfc3RhcnQ9ZS5zdHJzdGFydCxGKGUuc3RybSl9ZnVuY3Rpb24gVShlLHQpe2UucGVuZGluZ19idWZbZS5wZW5kaW5nKytdPXR9ZnVuY3Rpb24gUChlLHQpe2UucGVuZGluZ19idWZbZS5wZW5kaW5nKytdPXQ+Pj44JjI1NSxlLnBlbmRpbmdfYnVmW2UucGVuZGluZysrXT0yNTUmdH1mdW5jdGlvbiBMKGUsdCl7dmFyIHIsbixpPWUubWF4X2NoYWluX2xlbmd0aCxzPWUuc3Ryc3RhcnQsYT1lLnByZXZfbGVuZ3RoLG89ZS5uaWNlX21hdGNoLGg9ZS5zdHJzdGFydD5lLndfc2l6ZS16P2Uuc3Ryc3RhcnQtKGUud19zaXplLXopOjAsdT1lLndpbmRvdyxsPWUud19tYXNrLGY9ZS5wcmV2LGM9ZS5zdHJzdGFydCtTLGQ9dVtzK2EtMV0scD11W3MrYV07ZS5wcmV2X2xlbmd0aD49ZS5nb29kX21hdGNoJiYoaT4+PTIpLG8+ZS5sb29rYWhlYWQmJihvPWUubG9va2FoZWFkKTtkb3tpZih1WyhyPXQpK2FdPT09cCYmdVtyK2EtMV09PT1kJiZ1W3JdPT09dVtzXSYmdVsrK3JdPT09dVtzKzFdKXtzKz0yLHIrKztkb3t9d2hpbGUodVsrK3NdPT09dVsrK3JdJiZ1Wysrc109PT11Wysrcl0mJnVbKytzXT09PXVbKytyXSYmdVsrK3NdPT09dVsrK3JdJiZ1Wysrc109PT11Wysrcl0mJnVbKytzXT09PXVbKytyXSYmdVsrK3NdPT09dVsrK3JdJiZ1Wysrc109PT11Wysrcl0mJnM8Yyk7aWYobj1TLShjLXMpLHM9Yy1TLGE8bil7aWYoZS5tYXRjaF9zdGFydD10LG88PShhPW4pKWJyZWFrO2Q9dVtzK2EtMV0scD11W3MrYV19fX13aGlsZSgodD1mW3QmbF0pPmgmJjAhPS0taSk7cmV0dXJuIGE8PWUubG9va2FoZWFkP2E6ZS5sb29rYWhlYWR9ZnVuY3Rpb24gaihlKXt2YXIgdCxyLG4saSxzLGEsbyxoLHUsbCxmPWUud19zaXplO2Rve2lmKGk9ZS53aW5kb3dfc2l6ZS1lLmxvb2thaGVhZC1lLnN0cnN0YXJ0LGUuc3Ryc3RhcnQ+PWYrKGYteikpe2ZvcihjLmFycmF5U2V0KGUud2luZG93LGUud2luZG93LGYsZiwwKSxlLm1hdGNoX3N0YXJ0LT1mLGUuc3Ryc3RhcnQtPWYsZS5ibG9ja19zdGFydC09Zix0PXI9ZS5oYXNoX3NpemU7bj1lLmhlYWRbLS10XSxlLmhlYWRbdF09Zjw9bj9uLWY6MCwtLXI7KTtmb3IodD1yPWY7bj1lLnByZXZbLS10XSxlLnByZXZbdF09Zjw9bj9uLWY6MCwtLXI7KTtpKz1mfWlmKDA9PT1lLnN0cm0uYXZhaWxfaW4pYnJlYWs7aWYoYT1lLnN0cm0sbz1lLndpbmRvdyxoPWUuc3Ryc3RhcnQrZS5sb29rYWhlYWQsdT1pLGw9dm9pZCAwLGw9YS5hdmFpbF9pbix1PGwmJihsPXUpLHI9MD09PWw/MDooYS5hdmFpbF9pbi09bCxjLmFycmF5U2V0KG8sYS5pbnB1dCxhLm5leHRfaW4sbCxoKSwxPT09YS5zdGF0ZS53cmFwP2EuYWRsZXI9ZChhLmFkbGVyLG8sbCxoKToyPT09YS5zdGF0ZS53cmFwJiYoYS5hZGxlcj1wKGEuYWRsZXIsbyxsLGgpKSxhLm5leHRfaW4rPWwsYS50b3RhbF9pbis9bCxsKSxlLmxvb2thaGVhZCs9cixlLmxvb2thaGVhZCtlLmluc2VydD49eClmb3Iocz1lLnN0cnN0YXJ0LWUuaW5zZXJ0LGUuaW5zX2g9ZS53aW5kb3dbc10sZS5pbnNfaD0oZS5pbnNfaDw8ZS5oYXNoX3NoaWZ0XmUud2luZG93W3MrMV0pJmUuaGFzaF9tYXNrO2UuaW5zZXJ0JiYoZS5pbnNfaD0oZS5pbnNfaDw8ZS5oYXNoX3NoaWZ0XmUud2luZG93W3MreC0xXSkmZS5oYXNoX21hc2ssZS5wcmV2W3MmZS53X21hc2tdPWUuaGVhZFtlLmluc19oXSxlLmhlYWRbZS5pbnNfaF09cyxzKyssZS5pbnNlcnQtLSwhKGUubG9va2FoZWFkK2UuaW5zZXJ0PHgpKTspO313aGlsZShlLmxvb2thaGVhZDx6JiYwIT09ZS5zdHJtLmF2YWlsX2luKX1mdW5jdGlvbiBaKGUsdCl7Zm9yKHZhciByLG47Oyl7aWYoZS5sb29rYWhlYWQ8eil7aWYoaihlKSxlLmxvb2thaGVhZDx6JiZ0PT09bClyZXR1cm4gQTtpZigwPT09ZS5sb29rYWhlYWQpYnJlYWt9aWYocj0wLGUubG9va2FoZWFkPj14JiYoZS5pbnNfaD0oZS5pbnNfaDw8ZS5oYXNoX3NoaWZ0XmUud2luZG93W2Uuc3Ryc3RhcnQreC0xXSkmZS5oYXNoX21hc2sscj1lLnByZXZbZS5zdHJzdGFydCZlLndfbWFza109ZS5oZWFkW2UuaW5zX2hdLGUuaGVhZFtlLmluc19oXT1lLnN0cnN0YXJ0KSwwIT09ciYmZS5zdHJzdGFydC1yPD1lLndfc2l6ZS16JiYoZS5tYXRjaF9sZW5ndGg9TChlLHIpKSxlLm1hdGNoX2xlbmd0aD49eClpZihuPXUuX3RyX3RhbGx5KGUsZS5zdHJzdGFydC1lLm1hdGNoX3N0YXJ0LGUubWF0Y2hfbGVuZ3RoLXgpLGUubG9va2FoZWFkLT1lLm1hdGNoX2xlbmd0aCxlLm1hdGNoX2xlbmd0aDw9ZS5tYXhfbGF6eV9tYXRjaCYmZS5sb29rYWhlYWQ+PXgpe2ZvcihlLm1hdGNoX2xlbmd0aC0tO2Uuc3Ryc3RhcnQrKyxlLmluc19oPShlLmluc19oPDxlLmhhc2hfc2hpZnReZS53aW5kb3dbZS5zdHJzdGFydCt4LTFdKSZlLmhhc2hfbWFzayxyPWUucHJldltlLnN0cnN0YXJ0JmUud19tYXNrXT1lLmhlYWRbZS5pbnNfaF0sZS5oZWFkW2UuaW5zX2hdPWUuc3Ryc3RhcnQsMCE9LS1lLm1hdGNoX2xlbmd0aDspO2Uuc3Ryc3RhcnQrK31lbHNlIGUuc3Ryc3RhcnQrPWUubWF0Y2hfbGVuZ3RoLGUubWF0Y2hfbGVuZ3RoPTAsZS5pbnNfaD1lLndpbmRvd1tlLnN0cnN0YXJ0XSxlLmluc19oPShlLmluc19oPDxlLmhhc2hfc2hpZnReZS53aW5kb3dbZS5zdHJzdGFydCsxXSkmZS5oYXNoX21hc2s7ZWxzZSBuPXUuX3RyX3RhbGx5KGUsMCxlLndpbmRvd1tlLnN0cnN0YXJ0XSksZS5sb29rYWhlYWQtLSxlLnN0cnN0YXJ0Kys7aWYobiYmKE4oZSwhMSksMD09PWUuc3RybS5hdmFpbF9vdXQpKXJldHVybiBBfXJldHVybiBlLmluc2VydD1lLnN0cnN0YXJ0PHgtMT9lLnN0cnN0YXJ0OngtMSx0PT09Zj8oTihlLCEwKSwwPT09ZS5zdHJtLmF2YWlsX291dD9POkIpOmUubGFzdF9saXQmJihOKGUsITEpLDA9PT1lLnN0cm0uYXZhaWxfb3V0KT9BOkl9ZnVuY3Rpb24gVyhlLHQpe2Zvcih2YXIgcixuLGk7Oyl7aWYoZS5sb29rYWhlYWQ8eil7aWYoaihlKSxlLmxvb2thaGVhZDx6JiZ0PT09bClyZXR1cm4gQTtpZigwPT09ZS5sb29rYWhlYWQpYnJlYWt9aWYocj0wLGUubG9va2FoZWFkPj14JiYoZS5pbnNfaD0oZS5pbnNfaDw8ZS5oYXNoX3NoaWZ0XmUud2luZG93W2Uuc3Ryc3RhcnQreC0xXSkmZS5oYXNoX21hc2sscj1lLnByZXZbZS5zdHJzdGFydCZlLndfbWFza109ZS5oZWFkW2UuaW5zX2hdLGUuaGVhZFtlLmluc19oXT1lLnN0cnN0YXJ0KSxlLnByZXZfbGVuZ3RoPWUubWF0Y2hfbGVuZ3RoLGUucHJldl9tYXRjaD1lLm1hdGNoX3N0YXJ0LGUubWF0Y2hfbGVuZ3RoPXgtMSwwIT09ciYmZS5wcmV2X2xlbmd0aDxlLm1heF9sYXp5X21hdGNoJiZlLnN0cnN0YXJ0LXI8PWUud19zaXplLXomJihlLm1hdGNoX2xlbmd0aD1MKGUsciksZS5tYXRjaF9sZW5ndGg8PTUmJigxPT09ZS5zdHJhdGVneXx8ZS5tYXRjaF9sZW5ndGg9PT14JiY0MDk2PGUuc3Ryc3RhcnQtZS5tYXRjaF9zdGFydCkmJihlLm1hdGNoX2xlbmd0aD14LTEpKSxlLnByZXZfbGVuZ3RoPj14JiZlLm1hdGNoX2xlbmd0aDw9ZS5wcmV2X2xlbmd0aCl7Zm9yKGk9ZS5zdHJzdGFydCtlLmxvb2thaGVhZC14LG49dS5fdHJfdGFsbHkoZSxlLnN0cnN0YXJ0LTEtZS5wcmV2X21hdGNoLGUucHJldl9sZW5ndGgteCksZS5sb29rYWhlYWQtPWUucHJldl9sZW5ndGgtMSxlLnByZXZfbGVuZ3RoLT0yOysrZS5zdHJzdGFydDw9aSYmKGUuaW5zX2g9KGUuaW5zX2g8PGUuaGFzaF9zaGlmdF5lLndpbmRvd1tlLnN0cnN0YXJ0K3gtMV0pJmUuaGFzaF9tYXNrLHI9ZS5wcmV2W2Uuc3Ryc3RhcnQmZS53X21hc2tdPWUuaGVhZFtlLmluc19oXSxlLmhlYWRbZS5pbnNfaF09ZS5zdHJzdGFydCksMCE9LS1lLnByZXZfbGVuZ3RoOyk7aWYoZS5tYXRjaF9hdmFpbGFibGU9MCxlLm1hdGNoX2xlbmd0aD14LTEsZS5zdHJzdGFydCsrLG4mJihOKGUsITEpLDA9PT1lLnN0cm0uYXZhaWxfb3V0KSlyZXR1cm4gQX1lbHNlIGlmKGUubWF0Y2hfYXZhaWxhYmxlKXtpZigobj11Ll90cl90YWxseShlLDAsZS53aW5kb3dbZS5zdHJzdGFydC0xXSkpJiZOKGUsITEpLGUuc3Ryc3RhcnQrKyxlLmxvb2thaGVhZC0tLDA9PT1lLnN0cm0uYXZhaWxfb3V0KXJldHVybiBBfWVsc2UgZS5tYXRjaF9hdmFpbGFibGU9MSxlLnN0cnN0YXJ0KyssZS5sb29rYWhlYWQtLX1yZXR1cm4gZS5tYXRjaF9hdmFpbGFibGUmJihuPXUuX3RyX3RhbGx5KGUsMCxlLndpbmRvd1tlLnN0cnN0YXJ0LTFdKSxlLm1hdGNoX2F2YWlsYWJsZT0wKSxlLmluc2VydD1lLnN0cnN0YXJ0PHgtMT9lLnN0cnN0YXJ0OngtMSx0PT09Zj8oTihlLCEwKSwwPT09ZS5zdHJtLmF2YWlsX291dD9POkIpOmUubGFzdF9saXQmJihOKGUsITEpLDA9PT1lLnN0cm0uYXZhaWxfb3V0KT9BOkl9ZnVuY3Rpb24gTShlLHQscixuLGkpe3RoaXMuZ29vZF9sZW5ndGg9ZSx0aGlzLm1heF9sYXp5PXQsdGhpcy5uaWNlX2xlbmd0aD1yLHRoaXMubWF4X2NoYWluPW4sdGhpcy5mdW5jPWl9ZnVuY3Rpb24gSCgpe3RoaXMuc3RybT1udWxsLHRoaXMuc3RhdHVzPTAsdGhpcy5wZW5kaW5nX2J1Zj1udWxsLHRoaXMucGVuZGluZ19idWZfc2l6ZT0wLHRoaXMucGVuZGluZ19vdXQ9MCx0aGlzLnBlbmRpbmc9MCx0aGlzLndyYXA9MCx0aGlzLmd6aGVhZD1udWxsLHRoaXMuZ3ppbmRleD0wLHRoaXMubWV0aG9kPXYsdGhpcy5sYXN0X2ZsdXNoPS0xLHRoaXMud19zaXplPTAsdGhpcy53X2JpdHM9MCx0aGlzLndfbWFzaz0wLHRoaXMud2luZG93PW51bGwsdGhpcy53aW5kb3dfc2l6ZT0wLHRoaXMucHJldj1udWxsLHRoaXMuaGVhZD1udWxsLHRoaXMuaW5zX2g9MCx0aGlzLmhhc2hfc2l6ZT0wLHRoaXMuaGFzaF9iaXRzPTAsdGhpcy5oYXNoX21hc2s9MCx0aGlzLmhhc2hfc2hpZnQ9MCx0aGlzLmJsb2NrX3N0YXJ0PTAsdGhpcy5tYXRjaF9sZW5ndGg9MCx0aGlzLnByZXZfbWF0Y2g9MCx0aGlzLm1hdGNoX2F2YWlsYWJsZT0wLHRoaXMuc3Ryc3RhcnQ9MCx0aGlzLm1hdGNoX3N0YXJ0PTAsdGhpcy5sb29rYWhlYWQ9MCx0aGlzLnByZXZfbGVuZ3RoPTAsdGhpcy5tYXhfY2hhaW5fbGVuZ3RoPTAsdGhpcy5tYXhfbGF6eV9tYXRjaD0wLHRoaXMubGV2ZWw9MCx0aGlzLnN0cmF0ZWd5PTAsdGhpcy5nb29kX21hdGNoPTAsdGhpcy5uaWNlX21hdGNoPTAsdGhpcy5keW5fbHRyZWU9bmV3IGMuQnVmMTYoMip3KSx0aGlzLmR5bl9kdHJlZT1uZXcgYy5CdWYxNigyKigyKmErMSkpLHRoaXMuYmxfdHJlZT1uZXcgYy5CdWYxNigyKigyKm8rMSkpLEQodGhpcy5keW5fbHRyZWUpLEQodGhpcy5keW5fZHRyZWUpLEQodGhpcy5ibF90cmVlKSx0aGlzLmxfZGVzYz1udWxsLHRoaXMuZF9kZXNjPW51bGwsdGhpcy5ibF9kZXNjPW51bGwsdGhpcy5ibF9jb3VudD1uZXcgYy5CdWYxNihrKzEpLHRoaXMuaGVhcD1uZXcgYy5CdWYxNigyKnMrMSksRCh0aGlzLmhlYXApLHRoaXMuaGVhcF9sZW49MCx0aGlzLmhlYXBfbWF4PTAsdGhpcy5kZXB0aD1uZXcgYy5CdWYxNigyKnMrMSksRCh0aGlzLmRlcHRoKSx0aGlzLmxfYnVmPTAsdGhpcy5saXRfYnVmc2l6ZT0wLHRoaXMubGFzdF9saXQ9MCx0aGlzLmRfYnVmPTAsdGhpcy5vcHRfbGVuPTAsdGhpcy5zdGF0aWNfbGVuPTAsdGhpcy5tYXRjaGVzPTAsdGhpcy5pbnNlcnQ9MCx0aGlzLmJpX2J1Zj0wLHRoaXMuYmlfdmFsaWQ9MH1mdW5jdGlvbiBHKGUpe3ZhciB0O3JldHVybiBlJiZlLnN0YXRlPyhlLnRvdGFsX2luPWUudG90YWxfb3V0PTAsZS5kYXRhX3R5cGU9aSwodD1lLnN0YXRlKS5wZW5kaW5nPTAsdC5wZW5kaW5nX291dD0wLHQud3JhcDwwJiYodC53cmFwPS10LndyYXApLHQuc3RhdHVzPXQud3JhcD9DOkUsZS5hZGxlcj0yPT09dC53cmFwPzA6MSx0Lmxhc3RfZmx1c2g9bCx1Ll90cl9pbml0KHQpLG0pOlIoZSxfKX1mdW5jdGlvbiBLKGUpe3ZhciB0PUcoZSk7cmV0dXJuIHQ9PT1tJiZmdW5jdGlvbihlKXtlLndpbmRvd19zaXplPTIqZS53X3NpemUsRChlLmhlYWQpLGUubWF4X2xhenlfbWF0Y2g9aFtlLmxldmVsXS5tYXhfbGF6eSxlLmdvb2RfbWF0Y2g9aFtlLmxldmVsXS5nb29kX2xlbmd0aCxlLm5pY2VfbWF0Y2g9aFtlLmxldmVsXS5uaWNlX2xlbmd0aCxlLm1heF9jaGFpbl9sZW5ndGg9aFtlLmxldmVsXS5tYXhfY2hhaW4sZS5zdHJzdGFydD0wLGUuYmxvY2tfc3RhcnQ9MCxlLmxvb2thaGVhZD0wLGUuaW5zZXJ0PTAsZS5tYXRjaF9sZW5ndGg9ZS5wcmV2X2xlbmd0aD14LTEsZS5tYXRjaF9hdmFpbGFibGU9MCxlLmluc19oPTB9KGUuc3RhdGUpLHR9ZnVuY3Rpb24gWShlLHQscixuLGkscyl7aWYoIWUpcmV0dXJuIF87dmFyIGE9MTtpZih0PT09ZyYmKHQ9NiksbjwwPyhhPTAsbj0tbik6MTU8biYmKGE9MixuLT0xNiksaTwxfHx5PGl8fHIhPT12fHxuPDh8fDE1PG58fHQ8MHx8OTx0fHxzPDB8fGI8cylyZXR1cm4gUihlLF8pOzg9PT1uJiYobj05KTt2YXIgbz1uZXcgSDtyZXR1cm4oZS5zdGF0ZT1vKS5zdHJtPWUsby53cmFwPWEsby5nemhlYWQ9bnVsbCxvLndfYml0cz1uLG8ud19zaXplPTE8PG8ud19iaXRzLG8ud19tYXNrPW8ud19zaXplLTEsby5oYXNoX2JpdHM9aSs3LG8uaGFzaF9zaXplPTE8PG8uaGFzaF9iaXRzLG8uaGFzaF9tYXNrPW8uaGFzaF9zaXplLTEsby5oYXNoX3NoaWZ0PX5+KChvLmhhc2hfYml0cyt4LTEpL3gpLG8ud2luZG93PW5ldyBjLkJ1ZjgoMipvLndfc2l6ZSksby5oZWFkPW5ldyBjLkJ1ZjE2KG8uaGFzaF9zaXplKSxvLnByZXY9bmV3IGMuQnVmMTYoby53X3NpemUpLG8ubGl0X2J1ZnNpemU9MTw8aSs2LG8ucGVuZGluZ19idWZfc2l6ZT00Km8ubGl0X2J1ZnNpemUsby5wZW5kaW5nX2J1Zj1uZXcgYy5CdWY4KG8ucGVuZGluZ19idWZfc2l6ZSksby5kX2J1Zj0xKm8ubGl0X2J1ZnNpemUsby5sX2J1Zj0zKm8ubGl0X2J1ZnNpemUsby5sZXZlbD10LG8uc3RyYXRlZ3k9cyxvLm1ldGhvZD1yLEsoZSl9aD1bbmV3IE0oMCwwLDAsMCxmdW5jdGlvbihlLHQpe3ZhciByPTY1NTM1O2ZvcihyPmUucGVuZGluZ19idWZfc2l6ZS01JiYocj1lLnBlbmRpbmdfYnVmX3NpemUtNSk7Oyl7aWYoZS5sb29rYWhlYWQ8PTEpe2lmKGooZSksMD09PWUubG9va2FoZWFkJiZ0PT09bClyZXR1cm4gQTtpZigwPT09ZS5sb29rYWhlYWQpYnJlYWt9ZS5zdHJzdGFydCs9ZS5sb29rYWhlYWQsZS5sb29rYWhlYWQ9MDt2YXIgbj1lLmJsb2NrX3N0YXJ0K3I7aWYoKDA9PT1lLnN0cnN0YXJ0fHxlLnN0cnN0YXJ0Pj1uKSYmKGUubG9va2FoZWFkPWUuc3Ryc3RhcnQtbixlLnN0cnN0YXJ0PW4sTihlLCExKSwwPT09ZS5zdHJtLmF2YWlsX291dCkpcmV0dXJuIEE7aWYoZS5zdHJzdGFydC1lLmJsb2NrX3N0YXJ0Pj1lLndfc2l6ZS16JiYoTihlLCExKSwwPT09ZS5zdHJtLmF2YWlsX291dCkpcmV0dXJuIEF9cmV0dXJuIGUuaW5zZXJ0PTAsdD09PWY/KE4oZSwhMCksMD09PWUuc3RybS5hdmFpbF9vdXQ/TzpCKTooZS5zdHJzdGFydD5lLmJsb2NrX3N0YXJ0JiYoTihlLCExKSxlLnN0cm0uYXZhaWxfb3V0KSxBKX0pLG5ldyBNKDQsNCw4LDQsWiksbmV3IE0oNCw1LDE2LDgsWiksbmV3IE0oNCw2LDMyLDMyLFopLG5ldyBNKDQsNCwxNiwxNixXKSxuZXcgTSg4LDE2LDMyLDMyLFcpLG5ldyBNKDgsMTYsMTI4LDEyOCxXKSxuZXcgTSg4LDMyLDEyOCwyNTYsVyksbmV3IE0oMzIsMTI4LDI1OCwxMDI0LFcpLG5ldyBNKDMyLDI1OCwyNTgsNDA5NixXKV0sci5kZWZsYXRlSW5pdD1mdW5jdGlvbihlLHQpe3JldHVybiBZKGUsdCx2LDE1LDgsMCl9LHIuZGVmbGF0ZUluaXQyPVksci5kZWZsYXRlUmVzZXQ9SyxyLmRlZmxhdGVSZXNldEtlZXA9RyxyLmRlZmxhdGVTZXRIZWFkZXI9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gZSYmZS5zdGF0ZT8yIT09ZS5zdGF0ZS53cmFwP186KGUuc3RhdGUuZ3poZWFkPXQsbSk6X30sci5kZWZsYXRlPWZ1bmN0aW9uKGUsdCl7dmFyIHIsbixpLHM7aWYoIWV8fCFlLnN0YXRlfHw1PHR8fHQ8MClyZXR1cm4gZT9SKGUsXyk6XztpZihuPWUuc3RhdGUsIWUub3V0cHV0fHwhZS5pbnB1dCYmMCE9PWUuYXZhaWxfaW58fDY2Nj09PW4uc3RhdHVzJiZ0IT09ZilyZXR1cm4gUihlLDA9PT1lLmF2YWlsX291dD8tNTpfKTtpZihuLnN0cm09ZSxyPW4ubGFzdF9mbHVzaCxuLmxhc3RfZmx1c2g9dCxuLnN0YXR1cz09PUMpaWYoMj09PW4ud3JhcCllLmFkbGVyPTAsVShuLDMxKSxVKG4sMTM5KSxVKG4sOCksbi5nemhlYWQ/KFUobiwobi5nemhlYWQudGV4dD8xOjApKyhuLmd6aGVhZC5oY3JjPzI6MCkrKG4uZ3poZWFkLmV4dHJhPzQ6MCkrKG4uZ3poZWFkLm5hbWU/ODowKSsobi5nemhlYWQuY29tbWVudD8xNjowKSksVShuLDI1NSZuLmd6aGVhZC50aW1lKSxVKG4sbi5nemhlYWQudGltZT4+OCYyNTUpLFUobixuLmd6aGVhZC50aW1lPj4xNiYyNTUpLFUobixuLmd6aGVhZC50aW1lPj4yNCYyNTUpLFUobiw5PT09bi5sZXZlbD8yOjI8PW4uc3RyYXRlZ3l8fG4ubGV2ZWw8Mj80OjApLFUobiwyNTUmbi5nemhlYWQub3MpLG4uZ3poZWFkLmV4dHJhJiZuLmd6aGVhZC5leHRyYS5sZW5ndGgmJihVKG4sMjU1Jm4uZ3poZWFkLmV4dHJhLmxlbmd0aCksVShuLG4uZ3poZWFkLmV4dHJhLmxlbmd0aD4+OCYyNTUpKSxuLmd6aGVhZC5oY3JjJiYoZS5hZGxlcj1wKGUuYWRsZXIsbi5wZW5kaW5nX2J1ZixuLnBlbmRpbmcsMCkpLG4uZ3ppbmRleD0wLG4uc3RhdHVzPTY5KTooVShuLDApLFUobiwwKSxVKG4sMCksVShuLDApLFUobiwwKSxVKG4sOT09PW4ubGV2ZWw/MjoyPD1uLnN0cmF0ZWd5fHxuLmxldmVsPDI/NDowKSxVKG4sMyksbi5zdGF0dXM9RSk7ZWxzZXt2YXIgYT12KyhuLndfYml0cy04PDw0KTw8ODthfD0oMjw9bi5zdHJhdGVneXx8bi5sZXZlbDwyPzA6bi5sZXZlbDw2PzE6Nj09PW4ubGV2ZWw/MjozKTw8NiwwIT09bi5zdHJzdGFydCYmKGF8PTMyKSxhKz0zMS1hJTMxLG4uc3RhdHVzPUUsUChuLGEpLDAhPT1uLnN0cnN0YXJ0JiYoUChuLGUuYWRsZXI+Pj4xNiksUChuLDY1NTM1JmUuYWRsZXIpKSxlLmFkbGVyPTF9aWYoNjk9PT1uLnN0YXR1cylpZihuLmd6aGVhZC5leHRyYSl7Zm9yKGk9bi5wZW5kaW5nO24uZ3ppbmRleDwoNjU1MzUmbi5nemhlYWQuZXh0cmEubGVuZ3RoKSYmKG4ucGVuZGluZyE9PW4ucGVuZGluZ19idWZfc2l6ZXx8KG4uZ3poZWFkLmhjcmMmJm4ucGVuZGluZz5pJiYoZS5hZGxlcj1wKGUuYWRsZXIsbi5wZW5kaW5nX2J1ZixuLnBlbmRpbmctaSxpKSksRihlKSxpPW4ucGVuZGluZyxuLnBlbmRpbmchPT1uLnBlbmRpbmdfYnVmX3NpemUpKTspVShuLDI1NSZuLmd6aGVhZC5leHRyYVtuLmd6aW5kZXhdKSxuLmd6aW5kZXgrKztuLmd6aGVhZC5oY3JjJiZuLnBlbmRpbmc+aSYmKGUuYWRsZXI9cChlLmFkbGVyLG4ucGVuZGluZ19idWYsbi5wZW5kaW5nLWksaSkpLG4uZ3ppbmRleD09PW4uZ3poZWFkLmV4dHJhLmxlbmd0aCYmKG4uZ3ppbmRleD0wLG4uc3RhdHVzPTczKX1lbHNlIG4uc3RhdHVzPTczO2lmKDczPT09bi5zdGF0dXMpaWYobi5nemhlYWQubmFtZSl7aT1uLnBlbmRpbmc7ZG97aWYobi5wZW5kaW5nPT09bi5wZW5kaW5nX2J1Zl9zaXplJiYobi5nemhlYWQuaGNyYyYmbi5wZW5kaW5nPmkmJihlLmFkbGVyPXAoZS5hZGxlcixuLnBlbmRpbmdfYnVmLG4ucGVuZGluZy1pLGkpKSxGKGUpLGk9bi5wZW5kaW5nLG4ucGVuZGluZz09PW4ucGVuZGluZ19idWZfc2l6ZSkpe3M9MTticmVha31zPW4uZ3ppbmRleDxuLmd6aGVhZC5uYW1lLmxlbmd0aD8yNTUmbi5nemhlYWQubmFtZS5jaGFyQ29kZUF0KG4uZ3ppbmRleCsrKTowLFUobixzKX13aGlsZSgwIT09cyk7bi5nemhlYWQuaGNyYyYmbi5wZW5kaW5nPmkmJihlLmFkbGVyPXAoZS5hZGxlcixuLnBlbmRpbmdfYnVmLG4ucGVuZGluZy1pLGkpKSwwPT09cyYmKG4uZ3ppbmRleD0wLG4uc3RhdHVzPTkxKX1lbHNlIG4uc3RhdHVzPTkxO2lmKDkxPT09bi5zdGF0dXMpaWYobi5nemhlYWQuY29tbWVudCl7aT1uLnBlbmRpbmc7ZG97aWYobi5wZW5kaW5nPT09bi5wZW5kaW5nX2J1Zl9zaXplJiYobi5nemhlYWQuaGNyYyYmbi5wZW5kaW5nPmkmJihlLmFkbGVyPXAoZS5hZGxlcixuLnBlbmRpbmdfYnVmLG4ucGVuZGluZy1pLGkpKSxGKGUpLGk9bi5wZW5kaW5nLG4ucGVuZGluZz09PW4ucGVuZGluZ19idWZfc2l6ZSkpe3M9MTticmVha31zPW4uZ3ppbmRleDxuLmd6aGVhZC5jb21tZW50Lmxlbmd0aD8yNTUmbi5nemhlYWQuY29tbWVudC5jaGFyQ29kZUF0KG4uZ3ppbmRleCsrKTowLFUobixzKX13aGlsZSgwIT09cyk7bi5nemhlYWQuaGNyYyYmbi5wZW5kaW5nPmkmJihlLmFkbGVyPXAoZS5hZGxlcixuLnBlbmRpbmdfYnVmLG4ucGVuZGluZy1pLGkpKSwwPT09cyYmKG4uc3RhdHVzPTEwMyl9ZWxzZSBuLnN0YXR1cz0xMDM7aWYoMTAzPT09bi5zdGF0dXMmJihuLmd6aGVhZC5oY3JjPyhuLnBlbmRpbmcrMj5uLnBlbmRpbmdfYnVmX3NpemUmJkYoZSksbi5wZW5kaW5nKzI8PW4ucGVuZGluZ19idWZfc2l6ZSYmKFUobiwyNTUmZS5hZGxlciksVShuLGUuYWRsZXI+PjgmMjU1KSxlLmFkbGVyPTAsbi5zdGF0dXM9RSkpOm4uc3RhdHVzPUUpLDAhPT1uLnBlbmRpbmcpe2lmKEYoZSksMD09PWUuYXZhaWxfb3V0KXJldHVybiBuLmxhc3RfZmx1c2g9LTEsbX1lbHNlIGlmKDA9PT1lLmF2YWlsX2luJiZUKHQpPD1UKHIpJiZ0IT09ZilyZXR1cm4gUihlLC01KTtpZig2NjY9PT1uLnN0YXR1cyYmMCE9PWUuYXZhaWxfaW4pcmV0dXJuIFIoZSwtNSk7aWYoMCE9PWUuYXZhaWxfaW58fDAhPT1uLmxvb2thaGVhZHx8dCE9PWwmJjY2NiE9PW4uc3RhdHVzKXt2YXIgbz0yPT09bi5zdHJhdGVneT9mdW5jdGlvbihlLHQpe2Zvcih2YXIgcjs7KXtpZigwPT09ZS5sb29rYWhlYWQmJihqKGUpLDA9PT1lLmxvb2thaGVhZCkpe2lmKHQ9PT1sKXJldHVybiBBO2JyZWFrfWlmKGUubWF0Y2hfbGVuZ3RoPTAscj11Ll90cl90YWxseShlLDAsZS53aW5kb3dbZS5zdHJzdGFydF0pLGUubG9va2FoZWFkLS0sZS5zdHJzdGFydCsrLHImJihOKGUsITEpLDA9PT1lLnN0cm0uYXZhaWxfb3V0KSlyZXR1cm4gQX1yZXR1cm4gZS5pbnNlcnQ9MCx0PT09Zj8oTihlLCEwKSwwPT09ZS5zdHJtLmF2YWlsX291dD9POkIpOmUubGFzdF9saXQmJihOKGUsITEpLDA9PT1lLnN0cm0uYXZhaWxfb3V0KT9BOkl9KG4sdCk6Mz09PW4uc3RyYXRlZ3k/ZnVuY3Rpb24oZSx0KXtmb3IodmFyIHIsbixpLHMsYT1lLndpbmRvdzs7KXtpZihlLmxvb2thaGVhZDw9Uyl7aWYoaihlKSxlLmxvb2thaGVhZDw9UyYmdD09PWwpcmV0dXJuIEE7aWYoMD09PWUubG9va2FoZWFkKWJyZWFrfWlmKGUubWF0Y2hfbGVuZ3RoPTAsZS5sb29rYWhlYWQ+PXgmJjA8ZS5zdHJzdGFydCYmKG49YVtpPWUuc3Ryc3RhcnQtMV0pPT09YVsrK2ldJiZuPT09YVsrK2ldJiZuPT09YVsrK2ldKXtzPWUuc3Ryc3RhcnQrUztkb3t9d2hpbGUobj09PWFbKytpXSYmbj09PWFbKytpXSYmbj09PWFbKytpXSYmbj09PWFbKytpXSYmbj09PWFbKytpXSYmbj09PWFbKytpXSYmbj09PWFbKytpXSYmbj09PWFbKytpXSYmaTxzKTtlLm1hdGNoX2xlbmd0aD1TLShzLWkpLGUubWF0Y2hfbGVuZ3RoPmUubG9va2FoZWFkJiYoZS5tYXRjaF9sZW5ndGg9ZS5sb29rYWhlYWQpfWlmKGUubWF0Y2hfbGVuZ3RoPj14PyhyPXUuX3RyX3RhbGx5KGUsMSxlLm1hdGNoX2xlbmd0aC14KSxlLmxvb2thaGVhZC09ZS5tYXRjaF9sZW5ndGgsZS5zdHJzdGFydCs9ZS5tYXRjaF9sZW5ndGgsZS5tYXRjaF9sZW5ndGg9MCk6KHI9dS5fdHJfdGFsbHkoZSwwLGUud2luZG93W2Uuc3Ryc3RhcnRdKSxlLmxvb2thaGVhZC0tLGUuc3Ryc3RhcnQrKyksciYmKE4oZSwhMSksMD09PWUuc3RybS5hdmFpbF9vdXQpKXJldHVybiBBfXJldHVybiBlLmluc2VydD0wLHQ9PT1mPyhOKGUsITApLDA9PT1lLnN0cm0uYXZhaWxfb3V0P086Qik6ZS5sYXN0X2xpdCYmKE4oZSwhMSksMD09PWUuc3RybS5hdmFpbF9vdXQpP0E6SX0obix0KTpoW24ubGV2ZWxdLmZ1bmMobix0KTtpZihvIT09TyYmbyE9PUJ8fChuLnN0YXR1cz02NjYpLG89PT1BfHxvPT09TylyZXR1cm4gMD09PWUuYXZhaWxfb3V0JiYobi5sYXN0X2ZsdXNoPS0xKSxtO2lmKG89PT1JJiYoMT09PXQ/dS5fdHJfYWxpZ24obik6NSE9PXQmJih1Ll90cl9zdG9yZWRfYmxvY2sobiwwLDAsITEpLDM9PT10JiYoRChuLmhlYWQpLDA9PT1uLmxvb2thaGVhZCYmKG4uc3Ryc3RhcnQ9MCxuLmJsb2NrX3N0YXJ0PTAsbi5pbnNlcnQ9MCkpKSxGKGUpLDA9PT1lLmF2YWlsX291dCkpcmV0dXJuIG4ubGFzdF9mbHVzaD0tMSxtfXJldHVybiB0IT09Zj9tOm4ud3JhcDw9MD8xOigyPT09bi53cmFwPyhVKG4sMjU1JmUuYWRsZXIpLFUobixlLmFkbGVyPj44JjI1NSksVShuLGUuYWRsZXI+PjE2JjI1NSksVShuLGUuYWRsZXI+PjI0JjI1NSksVShuLDI1NSZlLnRvdGFsX2luKSxVKG4sZS50b3RhbF9pbj4+OCYyNTUpLFUobixlLnRvdGFsX2luPj4xNiYyNTUpLFUobixlLnRvdGFsX2luPj4yNCYyNTUpKTooUChuLGUuYWRsZXI+Pj4xNiksUChuLDY1NTM1JmUuYWRsZXIpKSxGKGUpLDA8bi53cmFwJiYobi53cmFwPS1uLndyYXApLDAhPT1uLnBlbmRpbmc/bToxKX0sci5kZWZsYXRlRW5kPWZ1bmN0aW9uKGUpe3ZhciB0O3JldHVybiBlJiZlLnN0YXRlPyh0PWUuc3RhdGUuc3RhdHVzKSE9PUMmJjY5IT09dCYmNzMhPT10JiY5MSE9PXQmJjEwMyE9PXQmJnQhPT1FJiY2NjYhPT10P1IoZSxfKTooZS5zdGF0ZT1udWxsLHQ9PT1FP1IoZSwtMyk6bSk6X30sci5kZWZsYXRlU2V0RGljdGlvbmFyeT1mdW5jdGlvbihlLHQpe3ZhciByLG4saSxzLGEsbyxoLHUsbD10Lmxlbmd0aDtpZighZXx8IWUuc3RhdGUpcmV0dXJuIF87aWYoMj09PShzPShyPWUuc3RhdGUpLndyYXApfHwxPT09cyYmci5zdGF0dXMhPT1DfHxyLmxvb2thaGVhZClyZXR1cm4gXztmb3IoMT09PXMmJihlLmFkbGVyPWQoZS5hZGxlcix0LGwsMCkpLHIud3JhcD0wLGw+PXIud19zaXplJiYoMD09PXMmJihEKHIuaGVhZCksci5zdHJzdGFydD0wLHIuYmxvY2tfc3RhcnQ9MCxyLmluc2VydD0wKSx1PW5ldyBjLkJ1Zjgoci53X3NpemUpLGMuYXJyYXlTZXQodSx0LGwtci53X3NpemUsci53X3NpemUsMCksdD11LGw9ci53X3NpemUpLGE9ZS5hdmFpbF9pbixvPWUubmV4dF9pbixoPWUuaW5wdXQsZS5hdmFpbF9pbj1sLGUubmV4dF9pbj0wLGUuaW5wdXQ9dCxqKHIpO3IubG9va2FoZWFkPj14Oyl7Zm9yKG49ci5zdHJzdGFydCxpPXIubG9va2FoZWFkLSh4LTEpO3IuaW5zX2g9KHIuaW5zX2g8PHIuaGFzaF9zaGlmdF5yLndpbmRvd1tuK3gtMV0pJnIuaGFzaF9tYXNrLHIucHJldltuJnIud19tYXNrXT1yLmhlYWRbci5pbnNfaF0sci5oZWFkW3IuaW5zX2hdPW4sbisrLC0taTspO3Iuc3Ryc3RhcnQ9bixyLmxvb2thaGVhZD14LTEsaihyKX1yZXR1cm4gci5zdHJzdGFydCs9ci5sb29rYWhlYWQsci5ibG9ja19zdGFydD1yLnN0cnN0YXJ0LHIuaW5zZXJ0PXIubG9va2FoZWFkLHIubG9va2FoZWFkPTAsci5tYXRjaF9sZW5ndGg9ci5wcmV2X2xlbmd0aD14LTEsci5tYXRjaF9hdmFpbGFibGU9MCxlLm5leHRfaW49byxlLmlucHV0PWgsZS5hdmFpbF9pbj1hLHIud3JhcD1zLG19LHIuZGVmbGF0ZUluZm89XCJwYWtvIGRlZmxhdGUgKGZyb20gTm9kZWNhIHByb2plY3QpXCJ9LHtcIi4uL3V0aWxzL2NvbW1vblwiOjQxLFwiLi9hZGxlcjMyXCI6NDMsXCIuL2NyYzMyXCI6NDUsXCIuL21lc3NhZ2VzXCI6NTEsXCIuL3RyZWVzXCI6NTJ9XSw0NzpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3QuZXhwb3J0cz1mdW5jdGlvbigpe3RoaXMudGV4dD0wLHRoaXMudGltZT0wLHRoaXMueGZsYWdzPTAsdGhpcy5vcz0wLHRoaXMuZXh0cmE9bnVsbCx0aGlzLmV4dHJhX2xlbj0wLHRoaXMubmFtZT1cIlwiLHRoaXMuY29tbWVudD1cIlwiLHRoaXMuaGNyYz0wLHRoaXMuZG9uZT0hMX19LHt9XSw0ODpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3QuZXhwb3J0cz1mdW5jdGlvbihlLHQpe3ZhciByLG4saSxzLGEsbyxoLHUsbCxmLGMsZCxwLG0sXyxnLGIsdix5LHcsayx4LFMseixDO3I9ZS5zdGF0ZSxuPWUubmV4dF9pbix6PWUuaW5wdXQsaT1uKyhlLmF2YWlsX2luLTUpLHM9ZS5uZXh0X291dCxDPWUub3V0cHV0LGE9cy0odC1lLmF2YWlsX291dCksbz1zKyhlLmF2YWlsX291dC0yNTcpLGg9ci5kbWF4LHU9ci53c2l6ZSxsPXIud2hhdmUsZj1yLnduZXh0LGM9ci53aW5kb3csZD1yLmhvbGQscD1yLmJpdHMsbT1yLmxlbmNvZGUsXz1yLmRpc3Rjb2RlLGc9KDE8PHIubGVuYml0cyktMSxiPSgxPDxyLmRpc3RiaXRzKS0xO2U6ZG97cDwxNSYmKGQrPXpbbisrXTw8cCxwKz04LGQrPXpbbisrXTw8cCxwKz04KSx2PW1bZCZnXTt0OmZvcig7Oyl7aWYoZD4+Pj15PXY+Pj4yNCxwLT15LDA9PT0oeT12Pj4+MTYmMjU1KSlDW3MrK109NjU1MzUmdjtlbHNle2lmKCEoMTYmeSkpe2lmKDA9PSg2NCZ5KSl7dj1tWyg2NTUzNSZ2KSsoZCYoMTw8eSktMSldO2NvbnRpbnVlIHR9aWYoMzImeSl7ci5tb2RlPTEyO2JyZWFrIGV9ZS5tc2c9XCJpbnZhbGlkIGxpdGVyYWwvbGVuZ3RoIGNvZGVcIixyLm1vZGU9MzA7YnJlYWsgZX13PTY1NTM1JnYsKHkmPTE1KSYmKHA8eSYmKGQrPXpbbisrXTw8cCxwKz04KSx3Kz1kJigxPDx5KS0xLGQ+Pj49eSxwLT15KSxwPDE1JiYoZCs9eltuKytdPDxwLHArPTgsZCs9eltuKytdPDxwLHArPTgpLHY9X1tkJmJdO3I6Zm9yKDs7KXtpZihkPj4+PXk9dj4+PjI0LHAtPXksISgxNiYoeT12Pj4+MTYmMjU1KSkpe2lmKDA9PSg2NCZ5KSl7dj1fWyg2NTUzNSZ2KSsoZCYoMTw8eSktMSldO2NvbnRpbnVlIHJ9ZS5tc2c9XCJpbnZhbGlkIGRpc3RhbmNlIGNvZGVcIixyLm1vZGU9MzA7YnJlYWsgZX1pZihrPTY1NTM1JnYscDwoeSY9MTUpJiYoZCs9eltuKytdPDxwLChwKz04KTx5JiYoZCs9eltuKytdPDxwLHArPTgpKSxoPChrKz1kJigxPDx5KS0xKSl7ZS5tc2c9XCJpbnZhbGlkIGRpc3RhbmNlIHRvbyBmYXIgYmFja1wiLHIubW9kZT0zMDticmVhayBlfWlmKGQ+Pj49eSxwLT15LCh5PXMtYSk8ayl7aWYobDwoeT1rLXkpJiZyLnNhbmUpe2UubXNnPVwiaW52YWxpZCBkaXN0YW5jZSB0b28gZmFyIGJhY2tcIixyLm1vZGU9MzA7YnJlYWsgZX1pZihTPWMsKHg9MCk9PT1mKXtpZih4Kz11LXkseTx3KXtmb3Iody09eTtDW3MrK109Y1t4KytdLC0teTspO3g9cy1rLFM9Q319ZWxzZSBpZihmPHkpe2lmKHgrPXUrZi15LCh5LT1mKTx3KXtmb3Iody09eTtDW3MrK109Y1t4KytdLC0teTspO2lmKHg9MCxmPHcpe2Zvcih3LT15PWY7Q1tzKytdPWNbeCsrXSwtLXk7KTt4PXMtayxTPUN9fX1lbHNlIGlmKHgrPWYteSx5PHcpe2Zvcih3LT15O0NbcysrXT1jW3grK10sLS15Oyk7eD1zLWssUz1DfWZvcig7Mjx3OylDW3MrK109U1t4KytdLENbcysrXT1TW3grK10sQ1tzKytdPVNbeCsrXSx3LT0zO3cmJihDW3MrK109U1t4KytdLDE8dyYmKENbcysrXT1TW3grK10pKX1lbHNle2Zvcih4PXMtaztDW3MrK109Q1t4KytdLENbcysrXT1DW3grK10sQ1tzKytdPUNbeCsrXSwyPCh3LT0zKTspO3cmJihDW3MrK109Q1t4KytdLDE8dyYmKENbcysrXT1DW3grK10pKX1icmVha319YnJlYWt9fXdoaWxlKG48aSYmczxvKTtuLT13PXA+PjMsZCY9KDE8PChwLT13PDwzKSktMSxlLm5leHRfaW49bixlLm5leHRfb3V0PXMsZS5hdmFpbF9pbj1uPGk/aS1uKzU6NS0obi1pKSxlLmF2YWlsX291dD1zPG8/by1zKzI1NzoyNTctKHMtbyksci5ob2xkPWQsci5iaXRzPXB9fSx7fV0sNDk6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt2YXIgST1lKFwiLi4vdXRpbHMvY29tbW9uXCIpLE89ZShcIi4vYWRsZXIzMlwiKSxCPWUoXCIuL2NyYzMyXCIpLFI9ZShcIi4vaW5mZmFzdFwiKSxUPWUoXCIuL2luZnRyZWVzXCIpLEQ9MSxGPTIsTj0wLFU9LTIsUD0xLG49ODUyLGk9NTkyO2Z1bmN0aW9uIEwoZSl7cmV0dXJuKGU+Pj4yNCYyNTUpKyhlPj4+OCY2NTI4MCkrKCg2NTI4MCZlKTw8OCkrKCgyNTUmZSk8PDI0KX1mdW5jdGlvbiBzKCl7dGhpcy5tb2RlPTAsdGhpcy5sYXN0PSExLHRoaXMud3JhcD0wLHRoaXMuaGF2ZWRpY3Q9ITEsdGhpcy5mbGFncz0wLHRoaXMuZG1heD0wLHRoaXMuY2hlY2s9MCx0aGlzLnRvdGFsPTAsdGhpcy5oZWFkPW51bGwsdGhpcy53Yml0cz0wLHRoaXMud3NpemU9MCx0aGlzLndoYXZlPTAsdGhpcy53bmV4dD0wLHRoaXMud2luZG93PW51bGwsdGhpcy5ob2xkPTAsdGhpcy5iaXRzPTAsdGhpcy5sZW5ndGg9MCx0aGlzLm9mZnNldD0wLHRoaXMuZXh0cmE9MCx0aGlzLmxlbmNvZGU9bnVsbCx0aGlzLmRpc3Rjb2RlPW51bGwsdGhpcy5sZW5iaXRzPTAsdGhpcy5kaXN0Yml0cz0wLHRoaXMubmNvZGU9MCx0aGlzLm5sZW49MCx0aGlzLm5kaXN0PTAsdGhpcy5oYXZlPTAsdGhpcy5uZXh0PW51bGwsdGhpcy5sZW5zPW5ldyBJLkJ1ZjE2KDMyMCksdGhpcy53b3JrPW5ldyBJLkJ1ZjE2KDI4OCksdGhpcy5sZW5keW49bnVsbCx0aGlzLmRpc3RkeW49bnVsbCx0aGlzLnNhbmU9MCx0aGlzLmJhY2s9MCx0aGlzLndhcz0wfWZ1bmN0aW9uIGEoZSl7dmFyIHQ7cmV0dXJuIGUmJmUuc3RhdGU/KHQ9ZS5zdGF0ZSxlLnRvdGFsX2luPWUudG90YWxfb3V0PXQudG90YWw9MCxlLm1zZz1cIlwiLHQud3JhcCYmKGUuYWRsZXI9MSZ0LndyYXApLHQubW9kZT1QLHQubGFzdD0wLHQuaGF2ZWRpY3Q9MCx0LmRtYXg9MzI3NjgsdC5oZWFkPW51bGwsdC5ob2xkPTAsdC5iaXRzPTAsdC5sZW5jb2RlPXQubGVuZHluPW5ldyBJLkJ1ZjMyKG4pLHQuZGlzdGNvZGU9dC5kaXN0ZHluPW5ldyBJLkJ1ZjMyKGkpLHQuc2FuZT0xLHQuYmFjaz0tMSxOKTpVfWZ1bmN0aW9uIG8oZSl7dmFyIHQ7cmV0dXJuIGUmJmUuc3RhdGU/KCh0PWUuc3RhdGUpLndzaXplPTAsdC53aGF2ZT0wLHQud25leHQ9MCxhKGUpKTpVfWZ1bmN0aW9uIGgoZSx0KXt2YXIgcixuO3JldHVybiBlJiZlLnN0YXRlPyhuPWUuc3RhdGUsdDwwPyhyPTAsdD0tdCk6KHI9MSsodD4+NCksdDw0OCYmKHQmPTE1KSksdCYmKHQ8OHx8MTU8dCk/VToobnVsbCE9PW4ud2luZG93JiZuLndiaXRzIT09dCYmKG4ud2luZG93PW51bGwpLG4ud3JhcD1yLG4ud2JpdHM9dCxvKGUpKSk6VX1mdW5jdGlvbiB1KGUsdCl7dmFyIHIsbjtyZXR1cm4gZT8obj1uZXcgcywoZS5zdGF0ZT1uKS53aW5kb3c9bnVsbCwocj1oKGUsdCkpIT09TiYmKGUuc3RhdGU9bnVsbCkscik6VX12YXIgbCxmLGM9ITA7ZnVuY3Rpb24gaihlKXtpZihjKXt2YXIgdDtmb3IobD1uZXcgSS5CdWYzMig1MTIpLGY9bmV3IEkuQnVmMzIoMzIpLHQ9MDt0PDE0NDspZS5sZW5zW3QrK109ODtmb3IoO3Q8MjU2OyllLmxlbnNbdCsrXT05O2Zvcig7dDwyODA7KWUubGVuc1t0KytdPTc7Zm9yKDt0PDI4ODspZS5sZW5zW3QrK109ODtmb3IoVChELGUubGVucywwLDI4OCxsLDAsZS53b3JrLHtiaXRzOjl9KSx0PTA7dDwzMjspZS5sZW5zW3QrK109NTtUKEYsZS5sZW5zLDAsMzIsZiwwLGUud29yayx7Yml0czo1fSksYz0hMX1lLmxlbmNvZGU9bCxlLmxlbmJpdHM9OSxlLmRpc3Rjb2RlPWYsZS5kaXN0Yml0cz01fWZ1bmN0aW9uIFooZSx0LHIsbil7dmFyIGkscz1lLnN0YXRlO3JldHVybiBudWxsPT09cy53aW5kb3cmJihzLndzaXplPTE8PHMud2JpdHMscy53bmV4dD0wLHMud2hhdmU9MCxzLndpbmRvdz1uZXcgSS5CdWY4KHMud3NpemUpKSxuPj1zLndzaXplPyhJLmFycmF5U2V0KHMud2luZG93LHQsci1zLndzaXplLHMud3NpemUsMCkscy53bmV4dD0wLHMud2hhdmU9cy53c2l6ZSk6KG48KGk9cy53c2l6ZS1zLnduZXh0KSYmKGk9biksSS5hcnJheVNldChzLndpbmRvdyx0LHItbixpLHMud25leHQpLChuLT1pKT8oSS5hcnJheVNldChzLndpbmRvdyx0LHItbixuLDApLHMud25leHQ9bixzLndoYXZlPXMud3NpemUpOihzLnduZXh0Kz1pLHMud25leHQ9PT1zLndzaXplJiYocy53bmV4dD0wKSxzLndoYXZlPHMud3NpemUmJihzLndoYXZlKz1pKSkpLDB9ci5pbmZsYXRlUmVzZXQ9byxyLmluZmxhdGVSZXNldDI9aCxyLmluZmxhdGVSZXNldEtlZXA9YSxyLmluZmxhdGVJbml0PWZ1bmN0aW9uKGUpe3JldHVybiB1KGUsMTUpfSxyLmluZmxhdGVJbml0Mj11LHIuaW5mbGF0ZT1mdW5jdGlvbihlLHQpe3ZhciByLG4saSxzLGEsbyxoLHUsbCxmLGMsZCxwLG0sXyxnLGIsdix5LHcsayx4LFMseixDPTAsRT1uZXcgSS5CdWY4KDQpLEE9WzE2LDE3LDE4LDAsOCw3LDksNiwxMCw1LDExLDQsMTIsMywxMywyLDE0LDEsMTVdO2lmKCFlfHwhZS5zdGF0ZXx8IWUub3V0cHV0fHwhZS5pbnB1dCYmMCE9PWUuYXZhaWxfaW4pcmV0dXJuIFU7MTI9PT0ocj1lLnN0YXRlKS5tb2RlJiYoci5tb2RlPTEzKSxhPWUubmV4dF9vdXQsaT1lLm91dHB1dCxoPWUuYXZhaWxfb3V0LHM9ZS5uZXh0X2luLG49ZS5pbnB1dCxvPWUuYXZhaWxfaW4sdT1yLmhvbGQsbD1yLmJpdHMsZj1vLGM9aCx4PU47ZTpmb3IoOzspc3dpdGNoKHIubW9kZSl7Y2FzZSBQOmlmKDA9PT1yLndyYXApe3IubW9kZT0xMzticmVha31mb3IoO2w8MTY7KXtpZigwPT09bylicmVhayBlO28tLSx1Kz1uW3MrK108PGwsbCs9OH1pZigyJnIud3JhcCYmMzU2MTU9PT11KXtFW3IuY2hlY2s9MF09MjU1JnUsRVsxXT11Pj4+OCYyNTUsci5jaGVjaz1CKHIuY2hlY2ssRSwyLDApLGw9dT0wLHIubW9kZT0yO2JyZWFrfWlmKHIuZmxhZ3M9MCxyLmhlYWQmJihyLmhlYWQuZG9uZT0hMSksISgxJnIud3JhcCl8fCgoKDI1NSZ1KTw8OCkrKHU+PjgpKSUzMSl7ZS5tc2c9XCJpbmNvcnJlY3QgaGVhZGVyIGNoZWNrXCIsci5tb2RlPTMwO2JyZWFrfWlmKDghPSgxNSZ1KSl7ZS5tc2c9XCJ1bmtub3duIGNvbXByZXNzaW9uIG1ldGhvZFwiLHIubW9kZT0zMDticmVha31pZihsLT00LGs9OCsoMTUmKHU+Pj49NCkpLDA9PT1yLndiaXRzKXIud2JpdHM9aztlbHNlIGlmKGs+ci53Yml0cyl7ZS5tc2c9XCJpbnZhbGlkIHdpbmRvdyBzaXplXCIsci5tb2RlPTMwO2JyZWFrfXIuZG1heD0xPDxrLGUuYWRsZXI9ci5jaGVjaz0xLHIubW9kZT01MTImdT8xMDoxMixsPXU9MDticmVhaztjYXNlIDI6Zm9yKDtsPDE2Oyl7aWYoMD09PW8pYnJlYWsgZTtvLS0sdSs9bltzKytdPDxsLGwrPTh9aWYoci5mbGFncz11LDghPSgyNTUmci5mbGFncykpe2UubXNnPVwidW5rbm93biBjb21wcmVzc2lvbiBtZXRob2RcIixyLm1vZGU9MzA7YnJlYWt9aWYoNTczNDQmci5mbGFncyl7ZS5tc2c9XCJ1bmtub3duIGhlYWRlciBmbGFncyBzZXRcIixyLm1vZGU9MzA7YnJlYWt9ci5oZWFkJiYoci5oZWFkLnRleHQ9dT4+OCYxKSw1MTImci5mbGFncyYmKEVbMF09MjU1JnUsRVsxXT11Pj4+OCYyNTUsci5jaGVjaz1CKHIuY2hlY2ssRSwyLDApKSxsPXU9MCxyLm1vZGU9MztjYXNlIDM6Zm9yKDtsPDMyOyl7aWYoMD09PW8pYnJlYWsgZTtvLS0sdSs9bltzKytdPDxsLGwrPTh9ci5oZWFkJiYoci5oZWFkLnRpbWU9dSksNTEyJnIuZmxhZ3MmJihFWzBdPTI1NSZ1LEVbMV09dT4+PjgmMjU1LEVbMl09dT4+PjE2JjI1NSxFWzNdPXU+Pj4yNCYyNTUsci5jaGVjaz1CKHIuY2hlY2ssRSw0LDApKSxsPXU9MCxyLm1vZGU9NDtjYXNlIDQ6Zm9yKDtsPDE2Oyl7aWYoMD09PW8pYnJlYWsgZTtvLS0sdSs9bltzKytdPDxsLGwrPTh9ci5oZWFkJiYoci5oZWFkLnhmbGFncz0yNTUmdSxyLmhlYWQub3M9dT4+OCksNTEyJnIuZmxhZ3MmJihFWzBdPTI1NSZ1LEVbMV09dT4+PjgmMjU1LHIuY2hlY2s9QihyLmNoZWNrLEUsMiwwKSksbD11PTAsci5tb2RlPTU7Y2FzZSA1OmlmKDEwMjQmci5mbGFncyl7Zm9yKDtsPDE2Oyl7aWYoMD09PW8pYnJlYWsgZTtvLS0sdSs9bltzKytdPDxsLGwrPTh9ci5sZW5ndGg9dSxyLmhlYWQmJihyLmhlYWQuZXh0cmFfbGVuPXUpLDUxMiZyLmZsYWdzJiYoRVswXT0yNTUmdSxFWzFdPXU+Pj44JjI1NSxyLmNoZWNrPUIoci5jaGVjayxFLDIsMCkpLGw9dT0wfWVsc2Ugci5oZWFkJiYoci5oZWFkLmV4dHJhPW51bGwpO3IubW9kZT02O2Nhc2UgNjppZigxMDI0JnIuZmxhZ3MmJihvPChkPXIubGVuZ3RoKSYmKGQ9byksZCYmKHIuaGVhZCYmKGs9ci5oZWFkLmV4dHJhX2xlbi1yLmxlbmd0aCxyLmhlYWQuZXh0cmF8fChyLmhlYWQuZXh0cmE9bmV3IEFycmF5KHIuaGVhZC5leHRyYV9sZW4pKSxJLmFycmF5U2V0KHIuaGVhZC5leHRyYSxuLHMsZCxrKSksNTEyJnIuZmxhZ3MmJihyLmNoZWNrPUIoci5jaGVjayxuLGQscykpLG8tPWQscys9ZCxyLmxlbmd0aC09ZCksci5sZW5ndGgpKWJyZWFrIGU7ci5sZW5ndGg9MCxyLm1vZGU9NztjYXNlIDc6aWYoMjA0OCZyLmZsYWdzKXtpZigwPT09bylicmVhayBlO2ZvcihkPTA7az1uW3MrZCsrXSxyLmhlYWQmJmsmJnIubGVuZ3RoPDY1NTM2JiYoci5oZWFkLm5hbWUrPVN0cmluZy5mcm9tQ2hhckNvZGUoaykpLGsmJmQ8bzspO2lmKDUxMiZyLmZsYWdzJiYoci5jaGVjaz1CKHIuY2hlY2ssbixkLHMpKSxvLT1kLHMrPWQsaylicmVhayBlfWVsc2Ugci5oZWFkJiYoci5oZWFkLm5hbWU9bnVsbCk7ci5sZW5ndGg9MCxyLm1vZGU9ODtjYXNlIDg6aWYoNDA5NiZyLmZsYWdzKXtpZigwPT09bylicmVhayBlO2ZvcihkPTA7az1uW3MrZCsrXSxyLmhlYWQmJmsmJnIubGVuZ3RoPDY1NTM2JiYoci5oZWFkLmNvbW1lbnQrPVN0cmluZy5mcm9tQ2hhckNvZGUoaykpLGsmJmQ8bzspO2lmKDUxMiZyLmZsYWdzJiYoci5jaGVjaz1CKHIuY2hlY2ssbixkLHMpKSxvLT1kLHMrPWQsaylicmVhayBlfWVsc2Ugci5oZWFkJiYoci5oZWFkLmNvbW1lbnQ9bnVsbCk7ci5tb2RlPTk7Y2FzZSA5OmlmKDUxMiZyLmZsYWdzKXtmb3IoO2w8MTY7KXtpZigwPT09bylicmVhayBlO28tLSx1Kz1uW3MrK108PGwsbCs9OH1pZih1IT09KDY1NTM1JnIuY2hlY2spKXtlLm1zZz1cImhlYWRlciBjcmMgbWlzbWF0Y2hcIixyLm1vZGU9MzA7YnJlYWt9bD11PTB9ci5oZWFkJiYoci5oZWFkLmhjcmM9ci5mbGFncz4+OSYxLHIuaGVhZC5kb25lPSEwKSxlLmFkbGVyPXIuY2hlY2s9MCxyLm1vZGU9MTI7YnJlYWs7Y2FzZSAxMDpmb3IoO2w8MzI7KXtpZigwPT09bylicmVhayBlO28tLSx1Kz1uW3MrK108PGwsbCs9OH1lLmFkbGVyPXIuY2hlY2s9TCh1KSxsPXU9MCxyLm1vZGU9MTE7Y2FzZSAxMTppZigwPT09ci5oYXZlZGljdClyZXR1cm4gZS5uZXh0X291dD1hLGUuYXZhaWxfb3V0PWgsZS5uZXh0X2luPXMsZS5hdmFpbF9pbj1vLHIuaG9sZD11LHIuYml0cz1sLDI7ZS5hZGxlcj1yLmNoZWNrPTEsci5tb2RlPTEyO2Nhc2UgMTI6aWYoNT09PXR8fDY9PT10KWJyZWFrIGU7Y2FzZSAxMzppZihyLmxhc3Qpe3U+Pj49NyZsLGwtPTcmbCxyLm1vZGU9Mjc7YnJlYWt9Zm9yKDtsPDM7KXtpZigwPT09bylicmVhayBlO28tLSx1Kz1uW3MrK108PGwsbCs9OH1zd2l0Y2goci5sYXN0PTEmdSxsLT0xLDMmKHU+Pj49MSkpe2Nhc2UgMDpyLm1vZGU9MTQ7YnJlYWs7Y2FzZSAxOmlmKGoociksci5tb2RlPTIwLDYhPT10KWJyZWFrO3U+Pj49MixsLT0yO2JyZWFrIGU7Y2FzZSAyOnIubW9kZT0xNzticmVhaztjYXNlIDM6ZS5tc2c9XCJpbnZhbGlkIGJsb2NrIHR5cGVcIixyLm1vZGU9MzB9dT4+Pj0yLGwtPTI7YnJlYWs7Y2FzZSAxNDpmb3IodT4+Pj03JmwsbC09NyZsO2w8MzI7KXtpZigwPT09bylicmVhayBlO28tLSx1Kz1uW3MrK108PGwsbCs9OH1pZigoNjU1MzUmdSkhPSh1Pj4+MTZeNjU1MzUpKXtlLm1zZz1cImludmFsaWQgc3RvcmVkIGJsb2NrIGxlbmd0aHNcIixyLm1vZGU9MzA7YnJlYWt9aWYoci5sZW5ndGg9NjU1MzUmdSxsPXU9MCxyLm1vZGU9MTUsNj09PXQpYnJlYWsgZTtjYXNlIDE1OnIubW9kZT0xNjtjYXNlIDE2OmlmKGQ9ci5sZW5ndGgpe2lmKG88ZCYmKGQ9byksaDxkJiYoZD1oKSwwPT09ZClicmVhayBlO0kuYXJyYXlTZXQoaSxuLHMsZCxhKSxvLT1kLHMrPWQsaC09ZCxhKz1kLHIubGVuZ3RoLT1kO2JyZWFrfXIubW9kZT0xMjticmVhaztjYXNlIDE3OmZvcig7bDwxNDspe2lmKDA9PT1vKWJyZWFrIGU7by0tLHUrPW5bcysrXTw8bCxsKz04fWlmKHIubmxlbj0yNTcrKDMxJnUpLHU+Pj49NSxsLT01LHIubmRpc3Q9MSsoMzEmdSksdT4+Pj01LGwtPTUsci5uY29kZT00KygxNSZ1KSx1Pj4+PTQsbC09NCwyODY8ci5ubGVufHwzMDxyLm5kaXN0KXtlLm1zZz1cInRvbyBtYW55IGxlbmd0aCBvciBkaXN0YW5jZSBzeW1ib2xzXCIsci5tb2RlPTMwO2JyZWFrfXIuaGF2ZT0wLHIubW9kZT0xODtjYXNlIDE4OmZvcig7ci5oYXZlPHIubmNvZGU7KXtmb3IoO2w8Mzspe2lmKDA9PT1vKWJyZWFrIGU7by0tLHUrPW5bcysrXTw8bCxsKz04fXIubGVuc1tBW3IuaGF2ZSsrXV09NyZ1LHU+Pj49MyxsLT0zfWZvcig7ci5oYXZlPDE5OylyLmxlbnNbQVtyLmhhdmUrK11dPTA7aWYoci5sZW5jb2RlPXIubGVuZHluLHIubGVuYml0cz03LFM9e2JpdHM6ci5sZW5iaXRzfSx4PVQoMCxyLmxlbnMsMCwxOSxyLmxlbmNvZGUsMCxyLndvcmssUyksci5sZW5iaXRzPVMuYml0cyx4KXtlLm1zZz1cImludmFsaWQgY29kZSBsZW5ndGhzIHNldFwiLHIubW9kZT0zMDticmVha31yLmhhdmU9MCxyLm1vZGU9MTk7Y2FzZSAxOTpmb3IoO3IuaGF2ZTxyLm5sZW4rci5uZGlzdDspe2Zvcig7Zz0oQz1yLmxlbmNvZGVbdSYoMTw8ci5sZW5iaXRzKS0xXSk+Pj4xNiYyNTUsYj02NTUzNSZDLCEoKF89Qz4+PjI0KTw9bCk7KXtpZigwPT09bylicmVhayBlO28tLSx1Kz1uW3MrK108PGwsbCs9OH1pZihiPDE2KXU+Pj49XyxsLT1fLHIubGVuc1tyLmhhdmUrK109YjtlbHNle2lmKDE2PT09Yil7Zm9yKHo9XysyO2w8ejspe2lmKDA9PT1vKWJyZWFrIGU7by0tLHUrPW5bcysrXTw8bCxsKz04fWlmKHU+Pj49XyxsLT1fLDA9PT1yLmhhdmUpe2UubXNnPVwiaW52YWxpZCBiaXQgbGVuZ3RoIHJlcGVhdFwiLHIubW9kZT0zMDticmVha31rPXIubGVuc1tyLmhhdmUtMV0sZD0zKygzJnUpLHU+Pj49MixsLT0yfWVsc2UgaWYoMTc9PT1iKXtmb3Ioej1fKzM7bDx6Oyl7aWYoMD09PW8pYnJlYWsgZTtvLS0sdSs9bltzKytdPDxsLGwrPTh9bC09XyxrPTAsZD0zKyg3Jih1Pj4+PV8pKSx1Pj4+PTMsbC09M31lbHNle2Zvcih6PV8rNztsPHo7KXtpZigwPT09bylicmVhayBlO28tLSx1Kz1uW3MrK108PGwsbCs9OH1sLT1fLGs9MCxkPTExKygxMjcmKHU+Pj49XykpLHU+Pj49NyxsLT03fWlmKHIuaGF2ZStkPnIubmxlbityLm5kaXN0KXtlLm1zZz1cImludmFsaWQgYml0IGxlbmd0aCByZXBlYXRcIixyLm1vZGU9MzA7YnJlYWt9Zm9yKDtkLS07KXIubGVuc1tyLmhhdmUrK109a319aWYoMzA9PT1yLm1vZGUpYnJlYWs7aWYoMD09PXIubGVuc1syNTZdKXtlLm1zZz1cImludmFsaWQgY29kZSAtLSBtaXNzaW5nIGVuZC1vZi1ibG9ja1wiLHIubW9kZT0zMDticmVha31pZihyLmxlbmJpdHM9OSxTPXtiaXRzOnIubGVuYml0c30seD1UKEQsci5sZW5zLDAsci5ubGVuLHIubGVuY29kZSwwLHIud29yayxTKSxyLmxlbmJpdHM9Uy5iaXRzLHgpe2UubXNnPVwiaW52YWxpZCBsaXRlcmFsL2xlbmd0aHMgc2V0XCIsci5tb2RlPTMwO2JyZWFrfWlmKHIuZGlzdGJpdHM9NixyLmRpc3Rjb2RlPXIuZGlzdGR5bixTPXtiaXRzOnIuZGlzdGJpdHN9LHg9VChGLHIubGVucyxyLm5sZW4sci5uZGlzdCxyLmRpc3Rjb2RlLDAsci53b3JrLFMpLHIuZGlzdGJpdHM9Uy5iaXRzLHgpe2UubXNnPVwiaW52YWxpZCBkaXN0YW5jZXMgc2V0XCIsci5tb2RlPTMwO2JyZWFrfWlmKHIubW9kZT0yMCw2PT09dClicmVhayBlO2Nhc2UgMjA6ci5tb2RlPTIxO2Nhc2UgMjE6aWYoNjw9byYmMjU4PD1oKXtlLm5leHRfb3V0PWEsZS5hdmFpbF9vdXQ9aCxlLm5leHRfaW49cyxlLmF2YWlsX2luPW8sci5ob2xkPXUsci5iaXRzPWwsUihlLGMpLGE9ZS5uZXh0X291dCxpPWUub3V0cHV0LGg9ZS5hdmFpbF9vdXQscz1lLm5leHRfaW4sbj1lLmlucHV0LG89ZS5hdmFpbF9pbix1PXIuaG9sZCxsPXIuYml0cywxMj09PXIubW9kZSYmKHIuYmFjaz0tMSk7YnJlYWt9Zm9yKHIuYmFjaz0wO2c9KEM9ci5sZW5jb2RlW3UmKDE8PHIubGVuYml0cyktMV0pPj4+MTYmMjU1LGI9NjU1MzUmQywhKChfPUM+Pj4yNCk8PWwpOyl7aWYoMD09PW8pYnJlYWsgZTtvLS0sdSs9bltzKytdPDxsLGwrPTh9aWYoZyYmMD09KDI0MCZnKSl7Zm9yKHY9Xyx5PWcsdz1iO2c9KEM9ci5sZW5jb2RlW3crKCh1JigxPDx2K3kpLTEpPj52KV0pPj4+MTYmMjU1LGI9NjU1MzUmQywhKHYrKF89Qz4+PjI0KTw9bCk7KXtpZigwPT09bylicmVhayBlO28tLSx1Kz1uW3MrK108PGwsbCs9OH11Pj4+PXYsbC09dixyLmJhY2srPXZ9aWYodT4+Pj1fLGwtPV8sci5iYWNrKz1fLHIubGVuZ3RoPWIsMD09PWcpe3IubW9kZT0yNjticmVha31pZigzMiZnKXtyLmJhY2s9LTEsci5tb2RlPTEyO2JyZWFrfWlmKDY0Jmcpe2UubXNnPVwiaW52YWxpZCBsaXRlcmFsL2xlbmd0aCBjb2RlXCIsci5tb2RlPTMwO2JyZWFrfXIuZXh0cmE9MTUmZyxyLm1vZGU9MjI7Y2FzZSAyMjppZihyLmV4dHJhKXtmb3Ioej1yLmV4dHJhO2w8ejspe2lmKDA9PT1vKWJyZWFrIGU7by0tLHUrPW5bcysrXTw8bCxsKz04fXIubGVuZ3RoKz11JigxPDxyLmV4dHJhKS0xLHU+Pj49ci5leHRyYSxsLT1yLmV4dHJhLHIuYmFjays9ci5leHRyYX1yLndhcz1yLmxlbmd0aCxyLm1vZGU9MjM7Y2FzZSAyMzpmb3IoO2c9KEM9ci5kaXN0Y29kZVt1JigxPDxyLmRpc3RiaXRzKS0xXSk+Pj4xNiYyNTUsYj02NTUzNSZDLCEoKF89Qz4+PjI0KTw9bCk7KXtpZigwPT09bylicmVhayBlO28tLSx1Kz1uW3MrK108PGwsbCs9OH1pZigwPT0oMjQwJmcpKXtmb3Iodj1fLHk9Zyx3PWI7Zz0oQz1yLmRpc3Rjb2RlW3crKCh1JigxPDx2K3kpLTEpPj52KV0pPj4+MTYmMjU1LGI9NjU1MzUmQywhKHYrKF89Qz4+PjI0KTw9bCk7KXtpZigwPT09bylicmVhayBlO28tLSx1Kz1uW3MrK108PGwsbCs9OH11Pj4+PXYsbC09dixyLmJhY2srPXZ9aWYodT4+Pj1fLGwtPV8sci5iYWNrKz1fLDY0Jmcpe2UubXNnPVwiaW52YWxpZCBkaXN0YW5jZSBjb2RlXCIsci5tb2RlPTMwO2JyZWFrfXIub2Zmc2V0PWIsci5leHRyYT0xNSZnLHIubW9kZT0yNDtjYXNlIDI0OmlmKHIuZXh0cmEpe2Zvcih6PXIuZXh0cmE7bDx6Oyl7aWYoMD09PW8pYnJlYWsgZTtvLS0sdSs9bltzKytdPDxsLGwrPTh9ci5vZmZzZXQrPXUmKDE8PHIuZXh0cmEpLTEsdT4+Pj1yLmV4dHJhLGwtPXIuZXh0cmEsci5iYWNrKz1yLmV4dHJhfWlmKHIub2Zmc2V0PnIuZG1heCl7ZS5tc2c9XCJpbnZhbGlkIGRpc3RhbmNlIHRvbyBmYXIgYmFja1wiLHIubW9kZT0zMDticmVha31yLm1vZGU9MjU7Y2FzZSAyNTppZigwPT09aClicmVhayBlO2lmKGQ9Yy1oLHIub2Zmc2V0PmQpe2lmKChkPXIub2Zmc2V0LWQpPnIud2hhdmUmJnIuc2FuZSl7ZS5tc2c9XCJpbnZhbGlkIGRpc3RhbmNlIHRvbyBmYXIgYmFja1wiLHIubW9kZT0zMDticmVha31wPWQ+ci53bmV4dD8oZC09ci53bmV4dCxyLndzaXplLWQpOnIud25leHQtZCxkPnIubGVuZ3RoJiYoZD1yLmxlbmd0aCksbT1yLndpbmRvd31lbHNlIG09aSxwPWEtci5vZmZzZXQsZD1yLmxlbmd0aDtmb3IoaDxkJiYoZD1oKSxoLT1kLHIubGVuZ3RoLT1kO2lbYSsrXT1tW3ArK10sLS1kOyk7MD09PXIubGVuZ3RoJiYoci5tb2RlPTIxKTticmVhaztjYXNlIDI2OmlmKDA9PT1oKWJyZWFrIGU7aVthKytdPXIubGVuZ3RoLGgtLSxyLm1vZGU9MjE7YnJlYWs7Y2FzZSAyNzppZihyLndyYXApe2Zvcig7bDwzMjspe2lmKDA9PT1vKWJyZWFrIGU7by0tLHV8PW5bcysrXTw8bCxsKz04fWlmKGMtPWgsZS50b3RhbF9vdXQrPWMsci50b3RhbCs9YyxjJiYoZS5hZGxlcj1yLmNoZWNrPXIuZmxhZ3M/QihyLmNoZWNrLGksYyxhLWMpOk8oci5jaGVjayxpLGMsYS1jKSksYz1oLChyLmZsYWdzP3U6TCh1KSkhPT1yLmNoZWNrKXtlLm1zZz1cImluY29ycmVjdCBkYXRhIGNoZWNrXCIsci5tb2RlPTMwO2JyZWFrfWw9dT0wfXIubW9kZT0yODtjYXNlIDI4OmlmKHIud3JhcCYmci5mbGFncyl7Zm9yKDtsPDMyOyl7aWYoMD09PW8pYnJlYWsgZTtvLS0sdSs9bltzKytdPDxsLGwrPTh9aWYodSE9PSg0Mjk0OTY3Mjk1JnIudG90YWwpKXtlLm1zZz1cImluY29ycmVjdCBsZW5ndGggY2hlY2tcIixyLm1vZGU9MzA7YnJlYWt9bD11PTB9ci5tb2RlPTI5O2Nhc2UgMjk6eD0xO2JyZWFrIGU7Y2FzZSAzMDp4PS0zO2JyZWFrIGU7Y2FzZSAzMTpyZXR1cm4tNDtjYXNlIDMyOmRlZmF1bHQ6cmV0dXJuIFV9cmV0dXJuIGUubmV4dF9vdXQ9YSxlLmF2YWlsX291dD1oLGUubmV4dF9pbj1zLGUuYXZhaWxfaW49byxyLmhvbGQ9dSxyLmJpdHM9bCwoci53c2l6ZXx8YyE9PWUuYXZhaWxfb3V0JiZyLm1vZGU8MzAmJihyLm1vZGU8Mjd8fDQhPT10KSkmJlooZSxlLm91dHB1dCxlLm5leHRfb3V0LGMtZS5hdmFpbF9vdXQpPyhyLm1vZGU9MzEsLTQpOihmLT1lLmF2YWlsX2luLGMtPWUuYXZhaWxfb3V0LGUudG90YWxfaW4rPWYsZS50b3RhbF9vdXQrPWMsci50b3RhbCs9YyxyLndyYXAmJmMmJihlLmFkbGVyPXIuY2hlY2s9ci5mbGFncz9CKHIuY2hlY2ssaSxjLGUubmV4dF9vdXQtYyk6TyhyLmNoZWNrLGksYyxlLm5leHRfb3V0LWMpKSxlLmRhdGFfdHlwZT1yLmJpdHMrKHIubGFzdD82NDowKSsoMTI9PT1yLm1vZGU/MTI4OjApKygyMD09PXIubW9kZXx8MTU9PT1yLm1vZGU/MjU2OjApLCgwPT1mJiYwPT09Y3x8ND09PXQpJiZ4PT09TiYmKHg9LTUpLHgpfSxyLmluZmxhdGVFbmQ9ZnVuY3Rpb24oZSl7aWYoIWV8fCFlLnN0YXRlKXJldHVybiBVO3ZhciB0PWUuc3RhdGU7cmV0dXJuIHQud2luZG93JiYodC53aW5kb3c9bnVsbCksZS5zdGF0ZT1udWxsLE59LHIuaW5mbGF0ZUdldEhlYWRlcj1mdW5jdGlvbihlLHQpe3ZhciByO3JldHVybiBlJiZlLnN0YXRlPzA9PSgyJihyPWUuc3RhdGUpLndyYXApP1U6KChyLmhlYWQ9dCkuZG9uZT0hMSxOKTpVfSxyLmluZmxhdGVTZXREaWN0aW9uYXJ5PWZ1bmN0aW9uKGUsdCl7dmFyIHIsbj10Lmxlbmd0aDtyZXR1cm4gZSYmZS5zdGF0ZT8wIT09KHI9ZS5zdGF0ZSkud3JhcCYmMTEhPT1yLm1vZGU/VToxMT09PXIubW9kZSYmTygxLHQsbiwwKSE9PXIuY2hlY2s/LTM6WihlLHQsbixuKT8oci5tb2RlPTMxLC00KTooci5oYXZlZGljdD0xLE4pOlV9LHIuaW5mbGF0ZUluZm89XCJwYWtvIGluZmxhdGUgKGZyb20gTm9kZWNhIHByb2plY3QpXCJ9LHtcIi4uL3V0aWxzL2NvbW1vblwiOjQxLFwiLi9hZGxlcjMyXCI6NDMsXCIuL2NyYzMyXCI6NDUsXCIuL2luZmZhc3RcIjo0OCxcIi4vaW5mdHJlZXNcIjo1MH1dLDUwOltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7dmFyIEQ9ZShcIi4uL3V0aWxzL2NvbW1vblwiKSxGPVszLDQsNSw2LDcsOCw5LDEwLDExLDEzLDE1LDE3LDE5LDIzLDI3LDMxLDM1LDQzLDUxLDU5LDY3LDgzLDk5LDExNSwxMzEsMTYzLDE5NSwyMjcsMjU4LDAsMF0sTj1bMTYsMTYsMTYsMTYsMTYsMTYsMTYsMTYsMTcsMTcsMTcsMTcsMTgsMTgsMTgsMTgsMTksMTksMTksMTksMjAsMjAsMjAsMjAsMjEsMjEsMjEsMjEsMTYsNzIsNzhdLFU9WzEsMiwzLDQsNSw3LDksMTMsMTcsMjUsMzMsNDksNjUsOTcsMTI5LDE5MywyNTcsMzg1LDUxMyw3NjksMTAyNSwxNTM3LDIwNDksMzA3Myw0MDk3LDYxNDUsODE5MywxMjI4OSwxNjM4NSwyNDU3NywwLDBdLFA9WzE2LDE2LDE2LDE2LDE3LDE3LDE4LDE4LDE5LDE5LDIwLDIwLDIxLDIxLDIyLDIyLDIzLDIzLDI0LDI0LDI1LDI1LDI2LDI2LDI3LDI3LDI4LDI4LDI5LDI5LDY0LDY0XTt0LmV4cG9ydHM9ZnVuY3Rpb24oZSx0LHIsbixpLHMsYSxvKXt2YXIgaCx1LGwsZixjLGQscCxtLF8sZz1vLmJpdHMsYj0wLHY9MCx5PTAsdz0wLGs9MCx4PTAsUz0wLHo9MCxDPTAsRT0wLEE9bnVsbCxJPTAsTz1uZXcgRC5CdWYxNigxNiksQj1uZXcgRC5CdWYxNigxNiksUj1udWxsLFQ9MDtmb3IoYj0wO2I8PTE1O2IrKylPW2JdPTA7Zm9yKHY9MDt2PG47disrKU9bdFtyK3ZdXSsrO2ZvcihrPWcsdz0xNTsxPD13JiYwPT09T1t3XTt3LS0pO2lmKHc8ayYmKGs9dyksMD09PXcpcmV0dXJuIGlbcysrXT0yMDk3MTUyMCxpW3MrK109MjA5NzE1MjAsby5iaXRzPTEsMDtmb3IoeT0xO3k8dyYmMD09PU9beV07eSsrKTtmb3Ioazx5JiYoaz15KSxiPXo9MTtiPD0xNTtiKyspaWYoejw8PTEsKHotPU9bYl0pPDApcmV0dXJuLTE7aWYoMDx6JiYoMD09PWV8fDEhPT13KSlyZXR1cm4tMTtmb3IoQlsxXT0wLGI9MTtiPDE1O2IrKylCW2IrMV09QltiXStPW2JdO2Zvcih2PTA7djxuO3YrKykwIT09dFtyK3ZdJiYoYVtCW3Rbcit2XV0rK109dik7aWYoZD0wPT09ZT8oQT1SPWEsMTkpOjE9PT1lPyhBPUYsSS09MjU3LFI9TixULT0yNTcsMjU2KTooQT1VLFI9UCwtMSksYj15LGM9cyxTPXY9RT0wLGw9LTEsZj0oQz0xPDwoeD1rKSktMSwxPT09ZSYmODUyPEN8fDI9PT1lJiY1OTI8QylyZXR1cm4gMTtmb3IoOzspe2ZvcihwPWItUyxfPWFbdl08ZD8obT0wLGFbdl0pOmFbdl0+ZD8obT1SW1QrYVt2XV0sQVtJK2Fbdl1dKToobT05NiwwKSxoPTE8PGItUyx5PXU9MTw8eDtpW2MrKEU+PlMpKyh1LT1oKV09cDw8MjR8bTw8MTZ8X3wwLDAhPT11Oyk7Zm9yKGg9MTw8Yi0xO0UmaDspaD4+PTE7aWYoMCE9PWg/KEUmPWgtMSxFKz1oKTpFPTAsdisrLDA9PS0tT1tiXSl7aWYoYj09PXcpYnJlYWs7Yj10W3IrYVt2XV19aWYoazxiJiYoRSZmKSE9PWwpe2ZvcigwPT09UyYmKFM9ayksYys9eSx6PTE8PCh4PWItUyk7eCtTPHcmJiEoKHotPU9beCtTXSk8PTApOyl4Kyssejw8PTE7aWYoQys9MTw8eCwxPT09ZSYmODUyPEN8fDI9PT1lJiY1OTI8QylyZXR1cm4gMTtpW2w9RSZmXT1rPDwyNHx4PDwxNnxjLXN8MH19cmV0dXJuIDAhPT1FJiYoaVtjK0VdPWItUzw8MjR8NjQ8PDE2fDApLG8uYml0cz1rLDB9fSx7XCIuLi91dGlscy9jb21tb25cIjo0MX1dLDUxOltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7dC5leHBvcnRzPXsyOlwibmVlZCBkaWN0aW9uYXJ5XCIsMTpcInN0cmVhbSBlbmRcIiwwOlwiXCIsXCItMVwiOlwiZmlsZSBlcnJvclwiLFwiLTJcIjpcInN0cmVhbSBlcnJvclwiLFwiLTNcIjpcImRhdGEgZXJyb3JcIixcIi00XCI6XCJpbnN1ZmZpY2llbnQgbWVtb3J5XCIsXCItNVwiOlwiYnVmZmVyIGVycm9yXCIsXCItNlwiOlwiaW5jb21wYXRpYmxlIHZlcnNpb25cIn19LHt9XSw1MjpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3ZhciBpPWUoXCIuLi91dGlscy9jb21tb25cIiksbz0wLGg9MTtmdW5jdGlvbiBuKGUpe2Zvcih2YXIgdD1lLmxlbmd0aDswPD0tLXQ7KWVbdF09MH12YXIgcz0wLGE9MjksdT0yNTYsbD11KzErYSxmPTMwLGM9MTksXz0yKmwrMSxnPTE1LGQ9MTYscD03LG09MjU2LGI9MTYsdj0xNyx5PTE4LHc9WzAsMCwwLDAsMCwwLDAsMCwxLDEsMSwxLDIsMiwyLDIsMywzLDMsMyw0LDQsNCw0LDUsNSw1LDUsMF0saz1bMCwwLDAsMCwxLDEsMiwyLDMsMyw0LDQsNSw1LDYsNiw3LDcsOCw4LDksOSwxMCwxMCwxMSwxMSwxMiwxMiwxMywxM10seD1bMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwyLDMsN10sUz1bMTYsMTcsMTgsMCw4LDcsOSw2LDEwLDUsMTEsNCwxMiwzLDEzLDIsMTQsMSwxNV0sej1uZXcgQXJyYXkoMioobCsyKSk7bih6KTt2YXIgQz1uZXcgQXJyYXkoMipmKTtuKEMpO3ZhciBFPW5ldyBBcnJheSg1MTIpO24oRSk7dmFyIEE9bmV3IEFycmF5KDI1Nik7bihBKTt2YXIgST1uZXcgQXJyYXkoYSk7bihJKTt2YXIgTyxCLFIsVD1uZXcgQXJyYXkoZik7ZnVuY3Rpb24gRChlLHQscixuLGkpe3RoaXMuc3RhdGljX3RyZWU9ZSx0aGlzLmV4dHJhX2JpdHM9dCx0aGlzLmV4dHJhX2Jhc2U9cix0aGlzLmVsZW1zPW4sdGhpcy5tYXhfbGVuZ3RoPWksdGhpcy5oYXNfc3RyZWU9ZSYmZS5sZW5ndGh9ZnVuY3Rpb24gRihlLHQpe3RoaXMuZHluX3RyZWU9ZSx0aGlzLm1heF9jb2RlPTAsdGhpcy5zdGF0X2Rlc2M9dH1mdW5jdGlvbiBOKGUpe3JldHVybiBlPDI1Nj9FW2VdOkVbMjU2KyhlPj4+NyldfWZ1bmN0aW9uIFUoZSx0KXtlLnBlbmRpbmdfYnVmW2UucGVuZGluZysrXT0yNTUmdCxlLnBlbmRpbmdfYnVmW2UucGVuZGluZysrXT10Pj4+OCYyNTV9ZnVuY3Rpb24gUChlLHQscil7ZS5iaV92YWxpZD5kLXI/KGUuYmlfYnVmfD10PDxlLmJpX3ZhbGlkJjY1NTM1LFUoZSxlLmJpX2J1ZiksZS5iaV9idWY9dD4+ZC1lLmJpX3ZhbGlkLGUuYmlfdmFsaWQrPXItZCk6KGUuYmlfYnVmfD10PDxlLmJpX3ZhbGlkJjY1NTM1LGUuYmlfdmFsaWQrPXIpfWZ1bmN0aW9uIEwoZSx0LHIpe1AoZSxyWzIqdF0sclsyKnQrMV0pfWZ1bmN0aW9uIGooZSx0KXtmb3IodmFyIHI9MDtyfD0xJmUsZT4+Pj0xLHI8PD0xLDA8LS10Oyk7cmV0dXJuIHI+Pj4xfWZ1bmN0aW9uIFooZSx0LHIpe3ZhciBuLGkscz1uZXcgQXJyYXkoZysxKSxhPTA7Zm9yKG49MTtuPD1nO24rKylzW25dPWE9YStyW24tMV08PDE7Zm9yKGk9MDtpPD10O2krKyl7dmFyIG89ZVsyKmkrMV07MCE9PW8mJihlWzIqaV09aihzW29dKyssbykpfX1mdW5jdGlvbiBXKGUpe3ZhciB0O2Zvcih0PTA7dDxsO3QrKyllLmR5bl9sdHJlZVsyKnRdPTA7Zm9yKHQ9MDt0PGY7dCsrKWUuZHluX2R0cmVlWzIqdF09MDtmb3IodD0wO3Q8Yzt0KyspZS5ibF90cmVlWzIqdF09MDtlLmR5bl9sdHJlZVsyKm1dPTEsZS5vcHRfbGVuPWUuc3RhdGljX2xlbj0wLGUubGFzdF9saXQ9ZS5tYXRjaGVzPTB9ZnVuY3Rpb24gTShlKXs4PGUuYmlfdmFsaWQ/VShlLGUuYmlfYnVmKTowPGUuYmlfdmFsaWQmJihlLnBlbmRpbmdfYnVmW2UucGVuZGluZysrXT1lLmJpX2J1ZiksZS5iaV9idWY9MCxlLmJpX3ZhbGlkPTB9ZnVuY3Rpb24gSChlLHQscixuKXt2YXIgaT0yKnQscz0yKnI7cmV0dXJuIGVbaV08ZVtzXXx8ZVtpXT09PWVbc10mJm5bdF08PW5bcl19ZnVuY3Rpb24gRyhlLHQscil7Zm9yKHZhciBuPWUuaGVhcFtyXSxpPXI8PDE7aTw9ZS5oZWFwX2xlbiYmKGk8ZS5oZWFwX2xlbiYmSCh0LGUuaGVhcFtpKzFdLGUuaGVhcFtpXSxlLmRlcHRoKSYmaSsrLCFIKHQsbixlLmhlYXBbaV0sZS5kZXB0aCkpOyllLmhlYXBbcl09ZS5oZWFwW2ldLHI9aSxpPDw9MTtlLmhlYXBbcl09bn1mdW5jdGlvbiBLKGUsdCxyKXt2YXIgbixpLHMsYSxvPTA7aWYoMCE9PWUubGFzdF9saXQpZm9yKDtuPWUucGVuZGluZ19idWZbZS5kX2J1ZisyKm9dPDw4fGUucGVuZGluZ19idWZbZS5kX2J1ZisyKm8rMV0saT1lLnBlbmRpbmdfYnVmW2UubF9idWYrb10sbysrLDA9PT1uP0woZSxpLHQpOihMKGUsKHM9QVtpXSkrdSsxLHQpLDAhPT0oYT13W3NdKSYmUChlLGktPUlbc10sYSksTChlLHM9TigtLW4pLHIpLDAhPT0oYT1rW3NdKSYmUChlLG4tPVRbc10sYSkpLG88ZS5sYXN0X2xpdDspO0woZSxtLHQpfWZ1bmN0aW9uIFkoZSx0KXt2YXIgcixuLGkscz10LmR5bl90cmVlLGE9dC5zdGF0X2Rlc2Muc3RhdGljX3RyZWUsbz10LnN0YXRfZGVzYy5oYXNfc3RyZWUsaD10LnN0YXRfZGVzYy5lbGVtcyx1PS0xO2ZvcihlLmhlYXBfbGVuPTAsZS5oZWFwX21heD1fLHI9MDtyPGg7cisrKTAhPT1zWzIqcl0/KGUuaGVhcFsrK2UuaGVhcF9sZW5dPXU9cixlLmRlcHRoW3JdPTApOnNbMipyKzFdPTA7Zm9yKDtlLmhlYXBfbGVuPDI7KXNbMiooaT1lLmhlYXBbKytlLmhlYXBfbGVuXT11PDI/Kyt1OjApXT0xLGUuZGVwdGhbaV09MCxlLm9wdF9sZW4tLSxvJiYoZS5zdGF0aWNfbGVuLT1hWzIqaSsxXSk7Zm9yKHQubWF4X2NvZGU9dSxyPWUuaGVhcF9sZW4+PjE7MTw9cjtyLS0pRyhlLHMscik7Zm9yKGk9aDtyPWUuaGVhcFsxXSxlLmhlYXBbMV09ZS5oZWFwW2UuaGVhcF9sZW4tLV0sRyhlLHMsMSksbj1lLmhlYXBbMV0sZS5oZWFwWy0tZS5oZWFwX21heF09cixlLmhlYXBbLS1lLmhlYXBfbWF4XT1uLHNbMippXT1zWzIqcl0rc1syKm5dLGUuZGVwdGhbaV09KGUuZGVwdGhbcl0+PWUuZGVwdGhbbl0/ZS5kZXB0aFtyXTplLmRlcHRoW25dKSsxLHNbMipyKzFdPXNbMipuKzFdPWksZS5oZWFwWzFdPWkrKyxHKGUscywxKSwyPD1lLmhlYXBfbGVuOyk7ZS5oZWFwWy0tZS5oZWFwX21heF09ZS5oZWFwWzFdLGZ1bmN0aW9uKGUsdCl7dmFyIHIsbixpLHMsYSxvLGg9dC5keW5fdHJlZSx1PXQubWF4X2NvZGUsbD10LnN0YXRfZGVzYy5zdGF0aWNfdHJlZSxmPXQuc3RhdF9kZXNjLmhhc19zdHJlZSxjPXQuc3RhdF9kZXNjLmV4dHJhX2JpdHMsZD10LnN0YXRfZGVzYy5leHRyYV9iYXNlLHA9dC5zdGF0X2Rlc2MubWF4X2xlbmd0aCxtPTA7Zm9yKHM9MDtzPD1nO3MrKyllLmJsX2NvdW50W3NdPTA7Zm9yKGhbMiplLmhlYXBbZS5oZWFwX21heF0rMV09MCxyPWUuaGVhcF9tYXgrMTtyPF87cisrKXA8KHM9aFsyKmhbMioobj1lLmhlYXBbcl0pKzFdKzFdKzEpJiYocz1wLG0rKyksaFsyKm4rMV09cyx1PG58fChlLmJsX2NvdW50W3NdKyssYT0wLGQ8PW4mJihhPWNbbi1kXSksbz1oWzIqbl0sZS5vcHRfbGVuKz1vKihzK2EpLGYmJihlLnN0YXRpY19sZW4rPW8qKGxbMipuKzFdK2EpKSk7aWYoMCE9PW0pe2Rve2ZvcihzPXAtMTswPT09ZS5ibF9jb3VudFtzXTspcy0tO2UuYmxfY291bnRbc10tLSxlLmJsX2NvdW50W3MrMV0rPTIsZS5ibF9jb3VudFtwXS0tLG0tPTJ9d2hpbGUoMDxtKTtmb3Iocz1wOzAhPT1zO3MtLSlmb3Iobj1lLmJsX2NvdW50W3NdOzAhPT1uOyl1PChpPWUuaGVhcFstLXJdKXx8KGhbMippKzFdIT09cyYmKGUub3B0X2xlbis9KHMtaFsyKmkrMV0pKmhbMippXSxoWzIqaSsxXT1zKSxuLS0pfX0oZSx0KSxaKHMsdSxlLmJsX2NvdW50KX1mdW5jdGlvbiBYKGUsdCxyKXt2YXIgbixpLHM9LTEsYT10WzFdLG89MCxoPTcsdT00O2ZvcigwPT09YSYmKGg9MTM4LHU9MyksdFsyKihyKzEpKzFdPTY1NTM1LG49MDtuPD1yO24rKylpPWEsYT10WzIqKG4rMSkrMV0sKytvPGgmJmk9PT1hfHwobzx1P2UuYmxfdHJlZVsyKmldKz1vOjAhPT1pPyhpIT09cyYmZS5ibF90cmVlWzIqaV0rKyxlLmJsX3RyZWVbMipiXSsrKTpvPD0xMD9lLmJsX3RyZWVbMip2XSsrOmUuYmxfdHJlZVsyKnldKysscz1pLHU9KG89MCk9PT1hPyhoPTEzOCwzKTppPT09YT8oaD02LDMpOihoPTcsNCkpfWZ1bmN0aW9uIFYoZSx0LHIpe3ZhciBuLGkscz0tMSxhPXRbMV0sbz0wLGg9Nyx1PTQ7Zm9yKDA9PT1hJiYoaD0xMzgsdT0zKSxuPTA7bjw9cjtuKyspaWYoaT1hLGE9dFsyKihuKzEpKzFdLCEoKytvPGgmJmk9PT1hKSl7aWYobzx1KWZvcig7TChlLGksZS5ibF90cmVlKSwwIT0tLW87KTtlbHNlIDAhPT1pPyhpIT09cyYmKEwoZSxpLGUuYmxfdHJlZSksby0tKSxMKGUsYixlLmJsX3RyZWUpLFAoZSxvLTMsMikpOm88PTEwPyhMKGUsdixlLmJsX3RyZWUpLFAoZSxvLTMsMykpOihMKGUseSxlLmJsX3RyZWUpLFAoZSxvLTExLDcpKTtzPWksdT0obz0wKT09PWE/KGg9MTM4LDMpOmk9PT1hPyhoPTYsMyk6KGg9Nyw0KX19bihUKTt2YXIgcT0hMTtmdW5jdGlvbiBKKGUsdCxyLG4pe1AoZSwoczw8MSkrKG4/MTowKSwzKSxmdW5jdGlvbihlLHQscixuKXtNKGUpLG4mJihVKGUsciksVShlLH5yKSksaS5hcnJheVNldChlLnBlbmRpbmdfYnVmLGUud2luZG93LHQscixlLnBlbmRpbmcpLGUucGVuZGluZys9cn0oZSx0LHIsITApfXIuX3RyX2luaXQ9ZnVuY3Rpb24oZSl7cXx8KGZ1bmN0aW9uKCl7dmFyIGUsdCxyLG4saSxzPW5ldyBBcnJheShnKzEpO2ZvcihuPXI9MDtuPGEtMTtuKyspZm9yKElbbl09cixlPTA7ZTwxPDx3W25dO2UrKylBW3IrK109bjtmb3IoQVtyLTFdPW4sbj1pPTA7bjwxNjtuKyspZm9yKFRbbl09aSxlPTA7ZTwxPDxrW25dO2UrKylFW2krK109bjtmb3IoaT4+PTc7bjxmO24rKylmb3IoVFtuXT1pPDw3LGU9MDtlPDE8PGtbbl0tNztlKyspRVsyNTYraSsrXT1uO2Zvcih0PTA7dDw9Zzt0Kyspc1t0XT0wO2ZvcihlPTA7ZTw9MTQzOyl6WzIqZSsxXT04LGUrKyxzWzhdKys7Zm9yKDtlPD0yNTU7KXpbMiplKzFdPTksZSsrLHNbOV0rKztmb3IoO2U8PTI3OTspelsyKmUrMV09NyxlKyssc1s3XSsrO2Zvcig7ZTw9Mjg3Oyl6WzIqZSsxXT04LGUrKyxzWzhdKys7Zm9yKFooeixsKzEscyksZT0wO2U8ZjtlKyspQ1syKmUrMV09NSxDWzIqZV09aihlLDUpO089bmV3IEQoeix3LHUrMSxsLGcpLEI9bmV3IEQoQyxrLDAsZixnKSxSPW5ldyBEKG5ldyBBcnJheSgwKSx4LDAsYyxwKX0oKSxxPSEwKSxlLmxfZGVzYz1uZXcgRihlLmR5bl9sdHJlZSxPKSxlLmRfZGVzYz1uZXcgRihlLmR5bl9kdHJlZSxCKSxlLmJsX2Rlc2M9bmV3IEYoZS5ibF90cmVlLFIpLGUuYmlfYnVmPTAsZS5iaV92YWxpZD0wLFcoZSl9LHIuX3RyX3N0b3JlZF9ibG9jaz1KLHIuX3RyX2ZsdXNoX2Jsb2NrPWZ1bmN0aW9uKGUsdCxyLG4pe3ZhciBpLHMsYT0wOzA8ZS5sZXZlbD8oMj09PWUuc3RybS5kYXRhX3R5cGUmJihlLnN0cm0uZGF0YV90eXBlPWZ1bmN0aW9uKGUpe3ZhciB0LHI9NDA5MzYyNDQ0Nztmb3IodD0wO3Q8PTMxO3QrKyxyPj4+PTEpaWYoMSZyJiYwIT09ZS5keW5fbHRyZWVbMip0XSlyZXR1cm4gbztpZigwIT09ZS5keW5fbHRyZWVbMThdfHwwIT09ZS5keW5fbHRyZWVbMjBdfHwwIT09ZS5keW5fbHRyZWVbMjZdKXJldHVybiBoO2Zvcih0PTMyO3Q8dTt0KyspaWYoMCE9PWUuZHluX2x0cmVlWzIqdF0pcmV0dXJuIGg7cmV0dXJuIG99KGUpKSxZKGUsZS5sX2Rlc2MpLFkoZSxlLmRfZGVzYyksYT1mdW5jdGlvbihlKXt2YXIgdDtmb3IoWChlLGUuZHluX2x0cmVlLGUubF9kZXNjLm1heF9jb2RlKSxYKGUsZS5keW5fZHRyZWUsZS5kX2Rlc2MubWF4X2NvZGUpLFkoZSxlLmJsX2Rlc2MpLHQ9Yy0xOzM8PXQmJjA9PT1lLmJsX3RyZWVbMipTW3RdKzFdO3QtLSk7cmV0dXJuIGUub3B0X2xlbis9MyoodCsxKSs1KzUrNCx0fShlKSxpPWUub3B0X2xlbiszKzc+Pj4zLChzPWUuc3RhdGljX2xlbiszKzc+Pj4zKTw9aSYmKGk9cykpOmk9cz1yKzUscis0PD1pJiYtMSE9PXQ/SihlLHQscixuKTo0PT09ZS5zdHJhdGVneXx8cz09PWk/KFAoZSwyKyhuPzE6MCksMyksSyhlLHosQykpOihQKGUsNCsobj8xOjApLDMpLGZ1bmN0aW9uKGUsdCxyLG4pe3ZhciBpO2ZvcihQKGUsdC0yNTcsNSksUChlLHItMSw1KSxQKGUsbi00LDQpLGk9MDtpPG47aSsrKVAoZSxlLmJsX3RyZWVbMipTW2ldKzFdLDMpO1YoZSxlLmR5bl9sdHJlZSx0LTEpLFYoZSxlLmR5bl9kdHJlZSxyLTEpfShlLGUubF9kZXNjLm1heF9jb2RlKzEsZS5kX2Rlc2MubWF4X2NvZGUrMSxhKzEpLEsoZSxlLmR5bl9sdHJlZSxlLmR5bl9kdHJlZSkpLFcoZSksbiYmTShlKX0sci5fdHJfdGFsbHk9ZnVuY3Rpb24oZSx0LHIpe3JldHVybiBlLnBlbmRpbmdfYnVmW2UuZF9idWYrMiplLmxhc3RfbGl0XT10Pj4+OCYyNTUsZS5wZW5kaW5nX2J1ZltlLmRfYnVmKzIqZS5sYXN0X2xpdCsxXT0yNTUmdCxlLnBlbmRpbmdfYnVmW2UubF9idWYrZS5sYXN0X2xpdF09MjU1JnIsZS5sYXN0X2xpdCsrLDA9PT10P2UuZHluX2x0cmVlWzIqcl0rKzooZS5tYXRjaGVzKyssdC0tLGUuZHluX2x0cmVlWzIqKEFbcl0rdSsxKV0rKyxlLmR5bl9kdHJlZVsyKk4odCldKyspLGUubGFzdF9saXQ9PT1lLmxpdF9idWZzaXplLTF9LHIuX3RyX2FsaWduPWZ1bmN0aW9uKGUpe1AoZSwyLDMpLEwoZSxtLHopLGZ1bmN0aW9uKGUpezE2PT09ZS5iaV92YWxpZD8oVShlLGUuYmlfYnVmKSxlLmJpX2J1Zj0wLGUuYmlfdmFsaWQ9MCk6ODw9ZS5iaV92YWxpZCYmKGUucGVuZGluZ19idWZbZS5wZW5kaW5nKytdPTI1NSZlLmJpX2J1ZixlLmJpX2J1Zj4+PTgsZS5iaV92YWxpZC09OCl9KGUpfX0se1wiLi4vdXRpbHMvY29tbW9uXCI6NDF9XSw1MzpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3QuZXhwb3J0cz1mdW5jdGlvbigpe3RoaXMuaW5wdXQ9bnVsbCx0aGlzLm5leHRfaW49MCx0aGlzLmF2YWlsX2luPTAsdGhpcy50b3RhbF9pbj0wLHRoaXMub3V0cHV0PW51bGwsdGhpcy5uZXh0X291dD0wLHRoaXMuYXZhaWxfb3V0PTAsdGhpcy50b3RhbF9vdXQ9MCx0aGlzLm1zZz1cIlwiLHRoaXMuc3RhdGU9bnVsbCx0aGlzLmRhdGFfdHlwZT0yLHRoaXMuYWRsZXI9MH19LHt9XSw1NDpbZnVuY3Rpb24oZSx0LHIpeyhmdW5jdGlvbihlKXshZnVuY3Rpb24ocixuKXtcInVzZSBzdHJpY3RcIjtpZighci5zZXRJbW1lZGlhdGUpe3ZhciBpLHMsdCxhLG89MSxoPXt9LHU9ITEsbD1yLmRvY3VtZW50LGU9T2JqZWN0LmdldFByb3RvdHlwZU9mJiZPYmplY3QuZ2V0UHJvdG90eXBlT2Yocik7ZT1lJiZlLnNldFRpbWVvdXQ/ZTpyLGk9XCJbb2JqZWN0IHByb2Nlc3NdXCI9PT17fS50b1N0cmluZy5jYWxsKHIucHJvY2Vzcyk/ZnVuY3Rpb24oZSl7cHJvY2Vzcy5uZXh0VGljayhmdW5jdGlvbigpe2MoZSl9KX06ZnVuY3Rpb24oKXtpZihyLnBvc3RNZXNzYWdlJiYhci5pbXBvcnRTY3JpcHRzKXt2YXIgZT0hMCx0PXIub25tZXNzYWdlO3JldHVybiByLm9ubWVzc2FnZT1mdW5jdGlvbigpe2U9ITF9LHIucG9zdE1lc3NhZ2UoXCJcIixcIipcIiksci5vbm1lc3NhZ2U9dCxlfX0oKT8oYT1cInNldEltbWVkaWF0ZSRcIitNYXRoLnJhbmRvbSgpK1wiJFwiLHIuYWRkRXZlbnRMaXN0ZW5lcj9yLmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsZCwhMSk6ci5hdHRhY2hFdmVudChcIm9ubWVzc2FnZVwiLGQpLGZ1bmN0aW9uKGUpe3IucG9zdE1lc3NhZ2UoYStlLFwiKlwiKX0pOnIuTWVzc2FnZUNoYW5uZWw/KCh0PW5ldyBNZXNzYWdlQ2hhbm5lbCkucG9ydDEub25tZXNzYWdlPWZ1bmN0aW9uKGUpe2MoZS5kYXRhKX0sZnVuY3Rpb24oZSl7dC5wb3J0Mi5wb3N0TWVzc2FnZShlKX0pOmwmJlwib25yZWFkeXN0YXRlY2hhbmdlXCJpbiBsLmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik/KHM9bC5kb2N1bWVudEVsZW1lbnQsZnVuY3Rpb24oZSl7dmFyIHQ9bC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO3Qub25yZWFkeXN0YXRlY2hhbmdlPWZ1bmN0aW9uKCl7YyhlKSx0Lm9ucmVhZHlzdGF0ZWNoYW5nZT1udWxsLHMucmVtb3ZlQ2hpbGQodCksdD1udWxsfSxzLmFwcGVuZENoaWxkKHQpfSk6ZnVuY3Rpb24oZSl7c2V0VGltZW91dChjLDAsZSl9LGUuc2V0SW1tZWRpYXRlPWZ1bmN0aW9uKGUpe1wiZnVuY3Rpb25cIiE9dHlwZW9mIGUmJihlPW5ldyBGdW5jdGlvbihcIlwiK2UpKTtmb3IodmFyIHQ9bmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGgtMSkscj0wO3I8dC5sZW5ndGg7cisrKXRbcl09YXJndW1lbnRzW3IrMV07dmFyIG49e2NhbGxiYWNrOmUsYXJnczp0fTtyZXR1cm4gaFtvXT1uLGkobyksbysrfSxlLmNsZWFySW1tZWRpYXRlPWZ9ZnVuY3Rpb24gZihlKXtkZWxldGUgaFtlXX1mdW5jdGlvbiBjKGUpe2lmKHUpc2V0VGltZW91dChjLDAsZSk7ZWxzZXt2YXIgdD1oW2VdO2lmKHQpe3U9ITA7dHJ5eyFmdW5jdGlvbihlKXt2YXIgdD1lLmNhbGxiYWNrLHI9ZS5hcmdzO3N3aXRjaChyLmxlbmd0aCl7Y2FzZSAwOnQoKTticmVhaztjYXNlIDE6dChyWzBdKTticmVhaztjYXNlIDI6dChyWzBdLHJbMV0pO2JyZWFrO2Nhc2UgMzp0KHJbMF0sclsxXSxyWzJdKTticmVhaztkZWZhdWx0OnQuYXBwbHkobixyKX19KHQpfWZpbmFsbHl7ZihlKSx1PSExfX19fWZ1bmN0aW9uIGQoZSl7ZS5zb3VyY2U9PT1yJiZcInN0cmluZ1wiPT10eXBlb2YgZS5kYXRhJiYwPT09ZS5kYXRhLmluZGV4T2YoYSkmJmMoK2UuZGF0YS5zbGljZShhLmxlbmd0aCkpfX0oXCJ1bmRlZmluZWRcIj09dHlwZW9mIHNlbGY/dm9pZCAwPT09ZT90aGlzOmU6c2VsZil9KS5jYWxsKHRoaXMsXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGdsb2JhbD9nbG9iYWw6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGY/c2VsZjpcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P3dpbmRvdzp7fSl9LHt9XX0se30sWzEwXSkoMTApfSk7IiwgImltcG9ydCB7IEFwcCwgTW9kYWwsIE5vdGljZSwgUGx1Z2luLCBQbHVnaW5TZXR0aW5nVGFiLCBTZXR0aW5nIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5pbXBvcnQgeyBPdmVyd3JpdGVEZWNpc2lvbiwgVXBkYXRlU2VydmljZSB9IGZyb20gXCIuL3VwZGF0ZS1zZXJ2aWNlXCI7XG5pbXBvcnQgeyBQbHVnaW5EYXRhLCBSZWxlYXNlRW50cnksIFJlbGVhc2VNYW5pZmVzdCwgU1VQUE9SVEVEX0xBTkdVQUdFUywgVXBkYXRlQmF0Y2ggfSBmcm9tIFwiLi90eXBlc1wiO1xuaW1wb3J0IHsgaW5pdGlhbGl6ZVBsdWdpbkRhdGEgfSBmcm9tIFwiLi9wbHVnaW4tZGF0YVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUYnBlZGlhVXBkYXRlUGx1Z2luIGV4dGVuZHMgUGx1Z2luIHtcbiAgcHJpdmF0ZSBkYXRhOiBQbHVnaW5EYXRhID0gaW5pdGlhbGl6ZVBsdWdpbkRhdGEoKTtcbiAgcHJpdmF0ZSB1cGRhdGVyITogVXBkYXRlU2VydmljZTtcbiAgcHJpdmF0ZSBzZXR0aW5nc1RhYiE6IFRicGVkaWFVcGRhdGVTZXR0aW5nc1RhYjtcbiAgcHJpdmF0ZSBjaGVja2luZyA9IGZhbHNlO1xuICBwcml2YXRlIGluc3RhbGxpbmcgPSBmYWxzZTtcblxuICBhc3luYyBvbmxvYWQoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhpcy5kYXRhID0gaW5pdGlhbGl6ZVBsdWdpbkRhdGEoYXdhaXQgdGhpcy5sb2FkRGF0YSgpKTtcbiAgICBhd2FpdCB0aGlzLnBlcnNpc3REYXRhKHRoaXMuZGF0YSk7XG4gICAgdGhpcy51cGRhdGVyID0gbmV3IFVwZGF0ZVNlcnZpY2UodGhpcy5hcHAsIHRoaXMubWFuaWZlc3QudmVyc2lvbiwgKCkgPT4gdGhpcy5kYXRhLCAoZGF0YSkgPT4gdGhpcy5wZXJzaXN0RGF0YShkYXRhKSk7XG4gICAgdGhpcy5zZXR0aW5nc1RhYiA9IG5ldyBUYnBlZGlhVXBkYXRlU2V0dGluZ3NUYWIodGhpcy5hcHAsIHRoaXMpO1xuICAgIHRoaXMuYWRkU2V0dGluZ1RhYih0aGlzLnNldHRpbmdzVGFiKTtcbiAgICB0aGlzLmFkZFJpYmJvbkljb24oXCJkb3dubG9hZFwiLCBcIkNoZWNrIFRicGVkaWEgdXBkYXRlc1wiLCAoKSA9PiB2b2lkIHRoaXMuY2hlY2tGb3JVcGRhdGUoKSk7XG4gICAgdGhpcy5hZGRDb21tYW5kKHsgaWQ6IFwiY2hlY2stZm9yLWNvbnRlbnQtdXBkYXRlXCIsIG5hbWU6IFwiQ2hlY2sgZm9yIGNvbnRlbnQgdXBkYXRlXCIsIGNhbGxiYWNrOiAoKSA9PiB2b2lkIHRoaXMuY2hlY2tGb3JVcGRhdGUoKSB9KTtcbiAgICB0aGlzLmFwcC53b3Jrc3BhY2Uub25MYXlvdXRSZWFkeSgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5kYXRhLmNoZWNrRm9yVXBkYXRlc09uU3RhcnR1cCAmJiB0aGlzLmRhdGEubGFuZ3VhZ2VDb2RlICYmIHRoaXMuZGF0YS5zZXJpZXNJZCAmJiB0aGlzLmRhdGEuZWRpdGlvbklkKSB2b2lkIHRoaXMuY2hlY2tGb3JVcGRhdGUodHJ1ZSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGNoZWNrRm9yVXBkYXRlKHNpbGVudFdoZW5DdXJyZW50ID0gZmFsc2UpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAodGhpcy5jaGVja2luZykgcmV0dXJuO1xuICAgIHRoaXMuY2hlY2tpbmcgPSB0cnVlO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBiYXRjaCA9IGF3YWl0IHRoaXMudXBkYXRlci5jaGVjaygpO1xuICAgICAgaWYgKCFiYXRjaCkgeyBpZiAoIXNpbGVudFdoZW5DdXJyZW50KSBuZXcgTm90aWNlKFwiWW91ciBUYnBlZGlhIGNvbnRlbnQgaXMgdXAgdG8gZGF0ZS5cIik7IHJldHVybjsgfVxuICAgICAgY29uc3QgbGF0ZXN0ID0gYmF0Y2gucmVsZWFzZXMuYXQoLTEpITtcbiAgICAgIGNvbnN0IGtleSA9IGAke2JhdGNoLm1hbmlmZXN0LnRicGVkaWEubGFuZ3VhZ2UuY29kZX0vJHtiYXRjaC5tYW5pZmVzdC50YnBlZGlhLnNlcmllcy5pZH0vJHtiYXRjaC5tYW5pZmVzdC50YnBlZGlhLmVkaXRpb24uaWR9LyR7YmF0Y2gubWFuaWZlc3QuQ29sbGVjdGlvbn0vJHtsYXRlc3QucmVsZWFzZUlkfWA7XG4gICAgICBpZiAoc2lsZW50V2hlbkN1cnJlbnQgJiYgdGhpcy5kYXRhLm5vdGlmaWVkUmVsZWFzZUlkcz8uaW5jbHVkZXMoa2V5KSkgcmV0dXJuO1xuICAgICAgaWYgKCF0aGlzLmRhdGEubm90aWZpZWRSZWxlYXNlSWRzPy5pbmNsdWRlcyhrZXkpKSBhd2FpdCB0aGlzLnBlcnNpc3REYXRhKHsgLi4udGhpcy5kYXRhLCBub3RpZmllZFJlbGVhc2VJZHM6IFsuLi4odGhpcy5kYXRhLm5vdGlmaWVkUmVsZWFzZUlkcyA/PyBbXSksIGtleV0gfSk7XG4gICAgICBuZXcgUmVsZWFzZU5vdGljZU1vZGFsKHRoaXMuYXBwLCBiYXRjaC5tYW5pZmVzdCwgbGF0ZXN0LCAoKSA9PiB0aGlzLm9wZW5SZWxlYXNlSW5mb3JtYXRpb24oKSkub3BlbigpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7IG5ldyBOb3RpY2UoYENvdWxkIG5vdCBjaGVjayBmb3IgVGJwZWRpYSB1cGRhdGVzOiAke21lc3NhZ2UoZXJyb3IpfWApOyB9XG4gICAgZmluYWxseSB7IHRoaXMuY2hlY2tpbmcgPSBmYWxzZTsgfVxuICB9XG5cbiAgcHJpdmF0ZSBvcGVuUmVsZWFzZUluZm9ybWF0aW9uKCk6IHZvaWQge1xuICAgIGNvbnN0IHNldHRpbmdzID0gKHRoaXMuYXBwIGFzIEFwcCAmIHsgc2V0dGluZz86IHsgb3BlbigpOiB2b2lkOyBvcGVuVGFiQnlJZChpZDogc3RyaW5nKTogdm9pZCB9IH0pLnNldHRpbmc7XG4gICAgdGhpcy5zZXR0aW5nc1RhYi5zZWxlY3RSZWxlYXNlcygpO1xuICAgIGlmIChzZXR0aW5ncykgeyBzZXR0aW5ncy5vcGVuKCk7IHNldHRpbmdzLm9wZW5UYWJCeUlkKHRoaXMubWFuaWZlc3QuaWQpOyB9XG4gICAgZWxzZSBuZXcgTm90aWNlKFwiT3BlbiBTZXR0aW5ncyBcdTIxOTIgVGJwZWRpYSBVcGRhdGUgXHUyMTkyIFJlbGVhc2UgaW5mb3JtYXRpb24gdG8gc2VsZWN0IHJlbGVhc2VzLlwiKTtcbiAgfVxuXG4gIGdldFNlbGVjdGVkQmF0Y2gobWFuaWZlc3Q6IFJlbGVhc2VNYW5pZmVzdCwgc2VsZWN0ZWRJZHM6IFNldDxzdHJpbmc+KTogVXBkYXRlQmF0Y2ggeyByZXR1cm4gdGhpcy51cGRhdGVyLmdldFNlbGVjdGVkQmF0Y2gobWFuaWZlc3QsIHNlbGVjdGVkSWRzKTsgfVxuXG4gIGFzeW5jIGluc3RhbGxTZWxlY3RlZChiYXRjaDogVXBkYXRlQmF0Y2gsIHByb2dyZXNzOiAobWVzc2FnZTogc3RyaW5nKSA9PiB2b2lkKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKHRoaXMuaW5zdGFsbGluZykgdGhyb3cgbmV3IEVycm9yKFwiQSBUYnBlZGlhIHVwZGF0ZSBpcyBhbHJlYWR5IGluIHByb2dyZXNzLlwiKTtcbiAgICB0aGlzLmluc3RhbGxpbmcgPSB0cnVlO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBjdXJyZW50ID0gYXdhaXQgdGhpcy51cGRhdGVyLmdldFJlbGVhc2VNYW5pZmVzdCh0cnVlKTtcbiAgICAgIGlmIChKU09OLnN0cmluZ2lmeShjdXJyZW50KSAhPT0gSlNPTi5zdHJpbmdpZnkoYmF0Y2gubWFuaWZlc3QpKSB0aHJvdyBuZXcgRXJyb3IoXCJSZWxlYXNlIGluZm9ybWF0aW9uIGhhcyBjaGFuZ2VkLiBSZWZyZXNoIGFuZCBzZWxlY3QgcmVsZWFzZXMgYWdhaW4uXCIpO1xuICAgICAgY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLnVwZGF0ZXIuZ2V0U2VsZWN0ZWRCYXRjaChjdXJyZW50LCBuZXcgU2V0KGJhdGNoLnJlbGVhc2VzLm1hcCgocmVsZWFzZSkgPT4gcmVsZWFzZS5yZWxlYXNlSWQpKSk7XG4gICAgICBhd2FpdCB0aGlzLnVwZGF0ZXIuaW5zdGFsbChzZWxlY3RlZCwgcHJvZ3Jlc3MsXG4gICAgICAgIChwYXRoKSA9PiBuZXcgUHJvbWlzZTxPdmVyd3JpdGVEZWNpc2lvbj4oKHJlc29sdmUpID0+IG5ldyBPdmVyd3JpdGVNb2RhbCh0aGlzLmFwcCwgcGF0aCwgcmVzb2x2ZSkub3BlbigpKSk7XG4gICAgICB0aGlzLnNldHRpbmdzVGFiLmRpc3BsYXkoKTtcbiAgICB9IGZpbmFsbHkgeyB0aGlzLmluc3RhbGxpbmcgPSBmYWxzZTsgfVxuICB9XG5cbiAgYXN5bmMgc2V0SW50ZXJmYWNlTGFuZ3VhZ2UoaW50ZXJmYWNlTGFuZ3VhZ2U6IFBsdWdpbkRhdGFbXCJpbnRlcmZhY2VMYW5ndWFnZVwiXSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHRoaXMucGVyc2lzdERhdGEoeyAuLi50aGlzLmRhdGEsIGludGVyZmFjZUxhbmd1YWdlIH0pO1xuICB9XG5cbiAgYXN5bmMgc2V0Q2hlY2tGb3JVcGRhdGVzT25TdGFydHVwKGNoZWNrRm9yVXBkYXRlc09uU3RhcnR1cDogYm9vbGVhbik6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHRoaXMucGVyc2lzdERhdGEoeyAuLi50aGlzLmRhdGEsIGNoZWNrRm9yVXBkYXRlc09uU3RhcnR1cCB9KTtcbiAgfVxuXG4gIGdldFJlbGVhc2VNYW5pZmVzdChmb3JjZVJlZnJlc2ggPSBmYWxzZSk6IFByb21pc2U8UmVsZWFzZU1hbmlmZXN0PiB7IHJldHVybiB0aGlzLnVwZGF0ZXIuZ2V0UmVsZWFzZU1hbmlmZXN0KGZvcmNlUmVmcmVzaCk7IH1cbiAgaXNSZWxlYXNlSW5zdGFsbGVkKHJlbGVhc2U6IFJlbGVhc2VFbnRyeSwgbWFuaWZlc3Q6IFJlbGVhc2VNYW5pZmVzdCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy51cGRhdGVyLmlzUmVsZWFzZUluc3RhbGxlZChyZWxlYXNlLCBtYW5pZmVzdCk7IH1cblxuICBwcml2YXRlIGFzeW5jIHBlcnNpc3REYXRhKGRhdGE6IFBsdWdpbkRhdGEpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCB7IGxhbmd1YWdlQ29kZSwgc2VyaWVzSWQsIGVkaXRpb25JZCwgdGJwZWRpYSwgYmFzZVJlbGVhc2UsIC4uLnJlc3QgfSA9IGRhdGE7XG4gICAgdGhpcy5kYXRhID0geyBsYW5ndWFnZUNvZGUsIHNlcmllc0lkLCBlZGl0aW9uSWQsIHRicGVkaWEsIGJhc2VSZWxlYXNlLCAuLi5yZXN0IH07XG4gICAgYXdhaXQgdGhpcy5zYXZlRGF0YSh0aGlzLmRhdGEpO1xuICB9XG5cbiAgZ2V0IGRvd25sb2FkRGF0YSgpOiBQbHVnaW5EYXRhIHsgcmV0dXJuIHRoaXMuZGF0YTsgfVxuXG4gIGdldCBpbnRlcmZhY2VMYW5ndWFnZSgpOiBQbHVnaW5EYXRhW1wiaW50ZXJmYWNlTGFuZ3VhZ2VcIl0geyByZXR1cm4gdGhpcy5kYXRhLmludGVyZmFjZUxhbmd1YWdlID8/ICh0aGlzLmRhdGEubGFuZ3VhZ2VDb2RlIHx8IHVuZGVmaW5lZCk7IH1cbiAgZ2V0IGNoZWNrRm9yVXBkYXRlc09uU3RhcnR1cCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuZGF0YS5jaGVja0ZvclVwZGF0ZXNPblN0YXJ0dXA7IH1cbiAgZ2V0IGJhc2VSZWxlYXNlKCk6IE5vbk51bGxhYmxlPFBsdWdpbkRhdGFbXCJiYXNlUmVsZWFzZVwiXT4geyByZXR1cm4gdGhpcy5kYXRhLmJhc2VSZWxlYXNlID8/IHt9OyB9XG59XG5cbmNsYXNzIFRicGVkaWFVcGRhdGVTZXR0aW5nc1RhYiBleHRlbmRzIFBsdWdpblNldHRpbmdUYWIge1xuICBwcml2YXRlIGFjdGl2ZVRhYjogXCJzZXR0aW5nc1wiIHwgXCJyZWxlYXNlc1wiIHwgXCJkb3dubG9hZHNcIiA9IFwic2V0dGluZ3NcIjtcbiAgcHJpdmF0ZSByZW5kZXJJZCA9IDA7XG4gIGNvbnN0cnVjdG9yKGFwcDogQXBwLCBwcml2YXRlIHJlYWRvbmx5IHBsdWdpbjogVGJwZWRpYVVwZGF0ZVBsdWdpbikgeyBzdXBlcihhcHAsIHBsdWdpbik7IH1cbiAgc2VsZWN0UmVsZWFzZXMoKTogdm9pZCB7IHRoaXMuYWN0aXZlVGFiID0gXCJyZWxlYXNlc1wiOyB9XG4gIGRpc3BsYXkoZm9yY2VSZWZyZXNoID0gZmFsc2UpOiB2b2lkIHtcbiAgICBjb25zdCB7IGNvbnRhaW5lckVsIH0gPSB0aGlzO1xuICAgIGNvbnRhaW5lckVsLmVtcHR5KCk7XG4gICAgY29uc3QgcmVuZGVySWQgPSArK3RoaXMucmVuZGVySWQ7XG4gICAgY29udGFpbmVyRWwuY3JlYXRlRWwoXCJoMlwiLCB7IHRleHQ6IFwiVGJwZWRpYSBVcGRhdGVcIiB9KTtcbiAgICBjb25zdCB0YWJzID0gY29udGFpbmVyRWwuY3JlYXRlRGl2KCk7XG4gICAgdGFicy5zZXRBdHRyaWJ1dGUoXCJyb2xlXCIsIFwidGFibGlzdFwiKTtcbiAgICB0YWJzLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgICB0YWJzLnN0eWxlLmdhcCA9IFwiOHB4XCI7XG4gICAgdGFicy5zdHlsZS5tYXJnaW5Cb3R0b20gPSBcIjE2cHhcIjtcbiAgICBmb3IgKGNvbnN0IFtpZCwgbGFiZWxdIG9mIFtbXCJzZXR0aW5nc1wiLCBcIlNldHRpbmdzXCJdLCBbXCJyZWxlYXNlc1wiLCBcIlJlbGVhc2UgaW5mb3JtYXRpb25cIl0sIFtcImRvd25sb2Fkc1wiLCBcIk15IERvd25sb2FkXCJdXSBhcyBjb25zdCkge1xuICAgICAgY29uc3QgYnV0dG9uID0gdGFicy5jcmVhdGVFbChcImJ1dHRvblwiLCB7IHRleHQ6IGxhYmVsIH0pO1xuICAgICAgYnV0dG9uLnNldEF0dHJpYnV0ZShcInJvbGVcIiwgXCJ0YWJcIik7XG4gICAgICBidXR0b24uc2V0QXR0cmlidXRlKFwiYXJpYS1zZWxlY3RlZFwiLCBTdHJpbmcodGhpcy5hY3RpdmVUYWIgPT09IGlkKSk7XG4gICAgICBidXR0b24uaWQgPSBgdGJwZWRpYS10YWItJHtpZH1gO1xuICAgICAgYnV0dG9uLnNldEF0dHJpYnV0ZShcImFyaWEtY29udHJvbHNcIiwgXCJ0YnBlZGlhLXNldHRpbmdzLXBhbmVsXCIpO1xuICAgICAgaWYgKHRoaXMuYWN0aXZlVGFiID09PSBpZCkgYnV0dG9uLmFkZENsYXNzKFwibW9kLWN0YVwiKTtcbiAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4geyB0aGlzLmFjdGl2ZVRhYiA9IGlkOyB0aGlzLmRpc3BsYXkoKTsgfSk7XG4gICAgfVxuICAgIGNvbnN0IHBhbmVsID0gY29udGFpbmVyRWwuY3JlYXRlRGl2KCk7XG4gICAgcGFuZWwuaWQgPSBcInRicGVkaWEtc2V0dGluZ3MtcGFuZWxcIjtcbiAgICBwYW5lbC5zZXRBdHRyaWJ1dGUoXCJyb2xlXCIsIFwidGFicGFuZWxcIik7XG4gICAgcGFuZWwuc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbGxlZGJ5XCIsIGB0YnBlZGlhLXRhYi0ke3RoaXMuYWN0aXZlVGFifWApO1xuICAgIGlmICh0aGlzLmFjdGl2ZVRhYiA9PT0gXCJyZWxlYXNlc1wiKSB7XG4gICAgICB2b2lkIHRoaXMuZGlzcGxheVJlbGVhc2VzKHBhbmVsLCByZW5kZXJJZCwgZm9yY2VSZWZyZXNoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMuYWN0aXZlVGFiID09PSBcImRvd25sb2Fkc1wiKSB7IHRoaXMuZGlzcGxheURvd25sb2FkcyhwYW5lbCk7IHJldHVybjsgfVxuICAgIG5ldyBTZXR0aW5nKHBhbmVsKVxuICAgICAgLnNldE5hbWUoXCJJbnRlcmZhY2UgbGFuZ3VhZ2VcIilcbiAgICAgIC5zZXREZXNjKFwiU2VsZWN0IHlvdXIgcHJlZmVycmVkIGludGVyZmFjZSBsYW5ndWFnZS4gQ29udGVudCB1cGRhdGVzIHVzZSB0aGUgY29sbGVjdGlvbiBsYW5ndWFnZSBjb25maWd1cmVkIGluIGRhdGEuanNvbi5cIilcbiAgICAgIC5hZGREcm9wZG93bigoZHJvcGRvd24pID0+IHtcbiAgICAgICAgZHJvcGRvd24uYWRkT3B0aW9uKFwiXCIsIFwiQ2hvb3NlIGxhbmd1YWdlXHUyMDI2XCIpO1xuICAgICAgICBmb3IgKGNvbnN0IGNvZGUgb2YgU1VQUE9SVEVEX0xBTkdVQUdFUykgZHJvcGRvd24uYWRkT3B0aW9uKGNvZGUsIGNvZGUpO1xuICAgICAgICBkcm9wZG93bi5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5pbnRlcmZhY2VMYW5ndWFnZSA/PyBcIlwiKTtcbiAgICAgICAgZHJvcGRvd24ub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7IGF3YWl0IHRoaXMucGx1Z2luLnNldEludGVyZmFjZUxhbmd1YWdlKHZhbHVlID8gdmFsdWUgYXMgUGx1Z2luRGF0YVtcImludGVyZmFjZUxhbmd1YWdlXCJdIDogdW5kZWZpbmVkKTsgfSk7XG4gICAgICB9KTtcbiAgICBuZXcgU2V0dGluZyhwYW5lbClcbiAgICAgIC5zZXROYW1lKFwiQ2hlY2sgZm9yIGNvbnRlbnQgdXBkYXRlcyBvbiBzdGFydHVwXCIpXG4gICAgICAuc2V0RGVzYyhcIkNoZWNrIGZvciBUYnBlZGlhIGNvbnRlbnQgdXBkYXRlcyB3aGVuIE9ic2lkaWFuIHN0YXJ0cy4gRW5hYmxlZCBieSBkZWZhdWx0LlwiKVxuICAgICAgLmFkZFRvZ2dsZSgodG9nZ2xlKSA9PiB7XG4gICAgICAgIHRvZ2dsZS5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5jaGVja0ZvclVwZGF0ZXNPblN0YXJ0dXApO1xuICAgICAgICB0b2dnbGUub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7IGF3YWl0IHRoaXMucGx1Z2luLnNldENoZWNrRm9yVXBkYXRlc09uU3RhcnR1cCh2YWx1ZSk7IH0pO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGRpc3BsYXlEb3dubG9hZHMocGFuZWw6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgcGFuZWwuY3JlYXRlRWwoXCJoM1wiLCB7IHRleHQ6IFwiTXkgRG93bmxvYWRcIiB9KTtcbiAgICBwYW5lbC5jcmVhdGVFbChcInBcIiwgeyB0ZXh0OiBcIllvdXIgbG9jYWxseSByZWNvcmRlZCByZWxlYXNlcyBhbmQgZmlsZSBjaGFuZ2VzIGZyb20gdGhlIHBsdWdpblx1MjAxOXMgZGF0YS5qc29uLiBSZW1vdmVkIGZpbGVzIGFyZSBjaGFuZ2VzLCBub3QgZG93bmxvYWRzLiBGaWxlIGxpc3RzIHJlZmxlY3QgcmVjb3JkZWQgY2hhbmdlcywgbm90IHRoZSBjdXJyZW50IGNvbnRlbnRzIG9mIHlvdXIgdmF1bHQuXCIgfSk7XG4gICAgY29uc3QgZGF0YSA9IHRoaXMucGx1Z2luLmRvd25sb2FkRGF0YTtcbiAgICBjb25zdCBtZXRhZGF0YSA9IHBhbmVsLmNyZWF0ZUVsKFwiZGxcIik7XG4gICAgbWV0YWRhdGEuc3R5bGUuZGlzcGxheSA9IFwiZ3JpZFwiO1xuICAgIG1ldGFkYXRhLnN0eWxlLmdyaWRUZW1wbGF0ZUNvbHVtbnMgPSBcIm1heC1jb250ZW50IDFmclwiO1xuICAgIG1ldGFkYXRhLnN0eWxlLmdhcCA9IFwiOHB4IDE2cHhcIjtcbiAgICBmb3IgKGNvbnN0IFtsYWJlbCwgdmFsdWVdIG9mIFtcbiAgICAgIFtcIlRpdGxlXCIsIGRhdGEudGl0bGUgfHwgXCJOb3QgY29uZmlndXJlZFwiXSxcbiAgICAgIFtcIkxhbmd1YWdlXCIsIGRhdGEubGFuZ3VhZ2VDb2RlIHx8IFwiTm90IGNvbmZpZ3VyZWRcIl0sIFtcIlNlcmllc1wiLCBkYXRhLnNlcmllc0lkIHx8IFwiTm90IGNvbmZpZ3VyZWRcIl0sXG4gICAgICBbXCJFZGl0aW9uXCIsIGRhdGEuZWRpdGlvbklkIHx8IFwiTm90IGNvbmZpZ3VyZWRcIl0sIFtcIkNvbGxlY3Rpb25cIiwgZGF0YS50YnBlZGlhXSxcbiAgICAgIFtcIkJhc2UgcmVsZWFzZVwiLCBkYXRhLmJhc2VSZWxlYXNlPy5yZWxlYXNlVmVyc2lvbiA/PyBkYXRhLmJhc2VSZWxlYXNlPy5yZWxlYXNlSWQgPz8gXCJOb3QgcmVjb3JkZWRcIl0sXG4gICAgICBbXCJMYXRlc3QgaW5zdGFsbGVkIHJlbGVhc2VcIiwgZGF0YS5pbnN0YWxsZWQucmVsZWFzZVZlcnNpb24gPz8gZGF0YS5pbnN0YWxsZWQucmVsZWFzZUlkID8/IFwiTm90IHJlY29yZGVkXCJdLFxuICAgIF0pIHtcbiAgICAgIG1ldGFkYXRhLmNyZWF0ZUVsKFwiZHRcIiwgeyB0ZXh0OiBsYWJlbCB9KTtcbiAgICAgIG1ldGFkYXRhLmNyZWF0ZUVsKFwiZGRcIiwgeyB0ZXh0OiB2YWx1ZSB9KS5zdHlsZS5tYXJnaW4gPSBcIjBcIjtcbiAgICB9XG4gICAgY29uc3QgaW5zdGFsbGVkID0gZGF0YS5pbnN0YWxsZWQ7XG4gICAgY29uc3QgaWRzID0gWy4uLm5ldyBTZXQoWy4uLk9iamVjdC5rZXlzKGluc3RhbGxlZC5vd25lZEZpbGVzKSwgLi4uaW5zdGFsbGVkLmFwcGxpZWRSZWxlYXNlSWRzLFxuICAgICAgLi4uKGluc3RhbGxlZC5yZWxlYXNlSWQgPyBbaW5zdGFsbGVkLnJlbGVhc2VJZF0gOiBbXSldKV0ucmV2ZXJzZSgpO1xuICAgIGlmICghaWRzLmxlbmd0aCkge1xuICAgICAgcGFuZWwuY3JlYXRlRWwoXCJwXCIsIHsgdGV4dDogXCJObyBkb3dubG9hZGVkIHJlbGVhc2VzIHJlY29yZGVkIHlldC4gT3BlbiBSZWxlYXNlIGluZm9ybWF0aW9uIHRvIGRvd25sb2FkIHlvdXIgZmlyc3QgdXBkYXRlLiBUaGUgYmFzZSBjb2xsZWN0aW9uIG1heSBoYXZlIGJlZW4gaW5zdGFsbGVkIHNlcGFyYXRlbHkuXCIgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IG1ha2VUYWJsZSA9IChwYXJlbnQ6IEhUTUxFbGVtZW50LCBjYXB0aW9uOiBzdHJpbmcsIGhlYWRlcnM6IHN0cmluZ1tdKTogSFRNTFRhYmxlU2VjdGlvbkVsZW1lbnQgPT4ge1xuICAgICAgY29uc3Qgd3JhcHBlciA9IHBhcmVudC5jcmVhdGVEaXYoKTtcbiAgICAgIHdyYXBwZXIuc3R5bGUub3ZlcmZsb3dYID0gXCJhdXRvXCI7XG4gICAgICB3cmFwcGVyLnN0eWxlLm1heFdpZHRoID0gXCIxMDAlXCI7XG4gICAgICB3cmFwcGVyLnRhYkluZGV4ID0gMDtcbiAgICAgIHdyYXBwZXIuc2V0QXR0cmlidXRlKFwicm9sZVwiLCBcInJlZ2lvblwiKTtcbiAgICAgIHdyYXBwZXIuc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCBjYXB0aW9uICsgXCIgXHUyMDE0IHNjcm9sbCBob3Jpem9udGFsbHkgdG8gdmlldyBhbGwgY29sdW1uc1wiKTtcbiAgICAgIGNvbnN0IHRhYmxlID0gd3JhcHBlci5jcmVhdGVFbChcInRhYmxlXCIpO1xuICAgICAgdGFibGUuc3R5bGUud2lkdGggPSBcIm1heC1jb250ZW50XCI7XG4gICAgICB0YWJsZS5zdHlsZS50YWJsZUxheW91dCA9IFwiYXV0b1wiO1xuICAgICAgdGFibGUuc3R5bGUud2hpdGVTcGFjZSA9IFwibm93cmFwXCI7XG4gICAgICB0YWJsZS5zdHlsZS5ib3JkZXJDb2xsYXBzZSA9IFwiY29sbGFwc2VcIjtcbiAgICAgIHRhYmxlLmNyZWF0ZUVsKFwiY2FwdGlvblwiLCB7IHRleHQ6IGNhcHRpb24gfSk7XG4gICAgICBjb25zdCBoZWFkID0gdGFibGUuY3JlYXRlRWwoXCJ0aGVhZFwiKS5jcmVhdGVFbChcInRyXCIpO1xuICAgICAgZm9yIChjb25zdCBsYWJlbCBvZiBoZWFkZXJzKSBoZWFkLmNyZWF0ZUVsKFwidGhcIiwgeyB0ZXh0OiBsYWJlbCB9KS5zZXRBdHRyaWJ1dGUoXCJzY29wZVwiLCBcImNvbFwiKTtcbiAgICAgIHJldHVybiB0YWJsZS5jcmVhdGVFbChcInRib2R5XCIpO1xuICAgIH07XG4gICAgY29uc3QgYm9keSA9IG1ha2VUYWJsZShwYW5lbCwgXCJSZWNvcmRlZCByZWxlYXNlcyAobW9zdCByZWNlbnRseSBhcHBsaWVkIGZpcnN0KVwiLCBbXCJSZWxlYXNlIElEXCIsIFwiU3RhdHVzXCIsIFwiRmlsZSBkZXRhaWxzXCIsIFwiRG93bmxvYWRlZCBmaWxlc1wiLCBcIkFkZGVkXCIsIFwiVXBkYXRlZFwiLCBcIlJlbW92ZWRcIl0pO1xuICAgIGZvciAoY29uc3QgaWQgb2YgaWRzKSB7XG4gICAgICBjb25zdCBmaWxlcyA9IGluc3RhbGxlZC5vd25lZEZpbGVzW2lkXSA/PyBbXTtcbiAgICAgIGNvbnN0IHJlY29yZGVkID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGluc3RhbGxlZC5vd25lZEZpbGVzLCBpZCk7XG4gICAgICBjb25zdCBjb21wbGV0ZWQgPSBpbnN0YWxsZWQuYXBwbGllZFJlbGVhc2VJZHMuaW5jbHVkZXMoaWQpIHx8IGluc3RhbGxlZC5yZWxlYXNlSWQgPT09IGlkO1xuICAgICAgY29uc3QgYWRkZWQgPSBmaWxlcy5maWx0ZXIoZmlsZSA9PiBmaWxlLmNoYW5nZSA9PT0gXCIrXCIpLmxlbmd0aDtcbiAgICAgIGNvbnN0IHVwZGF0ZWQgPSBmaWxlcy5maWx0ZXIoZmlsZSA9PiBmaWxlLmNoYW5nZSA9PT0gXCJ+XCIpLmxlbmd0aDtcbiAgICAgIGNvbnN0IHJlbW92ZWQgPSBmaWxlcy5maWx0ZXIoZmlsZSA9PiBmaWxlLmNoYW5nZSA9PT0gXCItXCIpLmxlbmd0aDtcbiAgICAgIGNvbnN0IHJvdyA9IGJvZHkuY3JlYXRlRWwoXCJ0clwiKTtcbiAgICAgIGZvciAoY29uc3QgdmFsdWUgb2YgW2lkLCBjb21wbGV0ZWQgPyBcIkluc3RhbGxlZFwiIDogXCJGaWxlIHJlY29yZHMgb25seVwiLCByZWNvcmRlZCA/IFN0cmluZyhhZGRlZCArIHVwZGF0ZWQpIDogXCJOb3QgcmVjb3JkZWRcIixcbiAgICAgICAgcmVjb3JkZWQgPyBTdHJpbmcoYWRkZWQpIDogXCJcdTIwMTRcIiwgcmVjb3JkZWQgPyBTdHJpbmcodXBkYXRlZCkgOiBcIlx1MjAxNFwiLCByZWNvcmRlZCA/IFN0cmluZyhyZW1vdmVkKSA6IFwiXHUyMDE0XCJdKSByb3cuY3JlYXRlRWwoXCJ0ZFwiLCB7IHRleHQ6IHZhbHVlIH0pO1xuICAgICAgY29uc3QgY2VsbCA9IHJvdy5jcmVhdGVFbChcInRkXCIpO1xuICAgICAgcm93Lmluc2VydEJlZm9yZShjZWxsLCByb3cuY2hpbGRyZW5bMl0pO1xuICAgICAgaWYgKCFmaWxlcy5sZW5ndGgpIHsgY2VsbC5zZXRUZXh0KHJlY29yZGVkID8gXCJObyBmaWxlIGNoYW5nZXMgcmVjb3JkZWRcIiA6IFwiRmlsZSBkZXRhaWxzIHdlcmUgbm90IHNhdmVkIGZvciB0aGlzIHJlbGVhc2VcIik7IGNvbnRpbnVlOyB9XG4gICAgICBjb25zdCBkZXRhaWxzID0gY2VsbC5jcmVhdGVFbChcImRldGFpbHNcIik7XG4gICAgICBkZXRhaWxzLmNyZWF0ZUVsKFwic3VtbWFyeVwiLCB7IHRleHQ6IFwiVmlldyBcIiArIGZpbGVzLmxlbmd0aCArIFwiIGZpbGUgY2hhbmdlc1wiIH0pO1xuICAgICAgZGV0YWlscy5hZGRFdmVudExpc3RlbmVyKFwidG9nZ2xlXCIsICgpID0+IHtcbiAgICAgICAgaWYgKCFkZXRhaWxzLm9wZW4gfHwgZGV0YWlscy5xdWVyeVNlbGVjdG9yKFwidGFibGVcIikpIHJldHVybjtcbiAgICAgICAgY29uc3QgZmlsZUJvZHkgPSBtYWtlVGFibGUoZGV0YWlscywgXCJGaWxlcyBmb3IgXCIgKyBpZCwgW1wiRmlsZSBuYW1lXCIsIFwiRm9sZGVyXCIsIFwiQ2hhbmdlXCJdKTtcbiAgICAgICAgZm9yIChjb25zdCBmaWxlIG9mIGZpbGVzKSB7XG4gICAgICAgICAgY29uc3QgZmlsZVJvdyA9IGZpbGVCb2R5LmNyZWF0ZUVsKFwidHJcIik7XG4gICAgICAgICAgY29uc3Qgc3BsaXQgPSBmaWxlLnBhdGgubGFzdEluZGV4T2YoXCIvXCIpO1xuICAgICAgICAgIGNvbnN0IG5hbWUgPSBmaWxlUm93LmNyZWF0ZUVsKFwidGRcIiwgeyB0ZXh0OiBmaWxlLnBhdGguc2xpY2Uoc3BsaXQgKyAxKSB9KTtcbiAgICAgICAgICBuYW1lLnRpdGxlID0gZmlsZS5wYXRoO1xuICAgICAgICAgIGZpbGVSb3cuY3JlYXRlRWwoXCJ0ZFwiLCB7IHRleHQ6IHNwbGl0IDwgMCA/IFwiVmF1bHQgcm9vdFwiIDogZmlsZS5wYXRoLnNsaWNlKDAsIHNwbGl0KSB9KS5zdHlsZS5vdmVyZmxvd1dyYXAgPSBcImFueXdoZXJlXCI7XG4gICAgICAgICAgZmlsZVJvdy5jcmVhdGVFbChcInRkXCIsIHsgdGV4dDogZmlsZS5jaGFuZ2UgPT09IFwiK1wiID8gXCJBZGRlZFwiIDogZmlsZS5jaGFuZ2UgPT09IFwiflwiID8gXCJVcGRhdGVkXCIgOiBcIlJlbW92ZWRcIiB9KTtcbiAgICAgICAgfVxuICAgICAgICBzdHlsZUNlbGxzKGRldGFpbHMpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHN0eWxlQ2VsbHMocm9vdDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICAgIGZvciAoY29uc3QgY2VsbCBvZiBBcnJheS5mcm9tKHJvb3QucXVlcnlTZWxlY3RvckFsbDxIVE1MRWxlbWVudD4oXCJ0aCwgdGRcIikpKSB7XG4gICAgICAgIGNlbGwuc3R5bGUucGFkZGluZyA9IFwiMTBweFwiO1xuICAgICAgICBjZWxsLnN0eWxlLnRleHRBbGlnbiA9IFwibGVmdFwiO1xuICAgICAgICBjZWxsLnN0eWxlLnZlcnRpY2FsQWxpZ24gPSBcInRvcFwiO1xuICAgICAgICBjZWxsLnN0eWxlLmJvcmRlckJvdHRvbSA9IFwiMXB4IHNvbGlkIHZhcigtLWJhY2tncm91bmQtbW9kaWZpZXItYm9yZGVyKVwiO1xuICAgICAgICBjZWxsLnN0eWxlLm92ZXJmbG93V3JhcCA9IFwiYW55d2hlcmVcIjtcbiAgICAgIH1cbiAgICB9XG4gICAgc3R5bGVDZWxscyhwYW5lbCk7XG4gIH1cblxuICBoaWRlKCk6IHZvaWQgeyB0aGlzLnJlbmRlcklkKys7IH1cblxuICBwcml2YXRlIGFzeW5jIGRpc3BsYXlSZWxlYXNlcyhwYW5lbDogSFRNTEVsZW1lbnQsIHJlbmRlcklkOiBudW1iZXIsIGZvcmNlUmVmcmVzaDogYm9vbGVhbik6IFByb21pc2U8dm9pZD4ge1xuICAgIG5ldyBTZXR0aW5nKHBhbmVsKVxuICAgICAgLnNldE5hbWUoXCJSZWxlYXNlIGluZm9ybWF0aW9uXCIpXG4gICAgICAuc2V0RGVzYyhcIlJlbGVhc2VzIGZvciB0aGlzIHZhdWx0XHUyMDE5cyBjb25maWd1cmVkIGNvbGxlY3Rpb24uIERvd25sb2FkZWQgc3RhdHVzIGluZGljYXRlcyBhIGNvbXBsZXRlZCBpbnN0YWxsYXRpb24gcmVjb3JkZWQgYnkgdGhlIHBsdWdpbi5cIilcbiAgICAgIC5hZGRCdXR0b24oKGJ1dHRvbikgPT4gYnV0dG9uLnNldEJ1dHRvblRleHQoXCJSZWZyZXNoXCIpLm9uQ2xpY2soKCkgPT4gdGhpcy5kaXNwbGF5KHRydWUpKSk7XG4gICAgY29uc3QgY29udGVudCA9IHBhbmVsLmNyZWF0ZURpdigpO1xuICAgIGNvbnRlbnQuc2V0QXR0cmlidXRlKFwiYXJpYS1saXZlXCIsIFwicG9saXRlXCIpO1xuICAgIGNvbnRlbnQuY3JlYXRlRWwoXCJwXCIsIHsgdGV4dDogXCJMb2FkaW5nIHJlbGVhc2UgaW5mb3JtYXRpb25cdTIwMjZcIiB9KTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgbWFuaWZlc3QgPSBhd2FpdCB0aGlzLnBsdWdpbi5nZXRSZWxlYXNlTWFuaWZlc3QoZm9yY2VSZWZyZXNoKTtcbiAgICAgIGlmIChyZW5kZXJJZCAhPT0gdGhpcy5yZW5kZXJJZCkgcmV0dXJuO1xuICAgICAgY29udGVudC5lbXB0eSgpO1xuICAgICAgY29udGVudC5jcmVhdGVFbChcImgzXCIsIHsgdGV4dDogbWFuaWZlc3QudGl0bGUgfSk7XG4gICAgICBjb25zdCBtZXRhZGF0YSA9IGNvbnRlbnQuY3JlYXRlRWwoXCJkbFwiKTtcbiAgICAgIG1ldGFkYXRhLnN0eWxlLmRpc3BsYXkgPSBcImdyaWRcIjtcbiAgICAgIG1ldGFkYXRhLnN0eWxlLmdyaWRUZW1wbGF0ZUNvbHVtbnMgPSBcIm1heC1jb250ZW50IDFmclwiO1xuICAgICAgbWV0YWRhdGEuc3R5bGUuY29sdW1uR2FwID0gXCIxNnB4XCI7XG4gICAgICBmb3IgKGNvbnN0IFtsYWJlbCwgdmFsdWVdIG9mIFtcbiAgICAgICAgW1wiTGFuZ3VhZ2UgQ29kZVwiLCBtYW5pZmVzdC50YnBlZGlhLmxhbmd1YWdlLmNvZGVdLFxuICAgICAgICBbXCJTZXJpZXNcIiwgbWFuaWZlc3QudGJwZWRpYS5zZXJpZXMuaWRdLFxuICAgICAgICBbXCJFZGl0aW9uXCIsIG1hbmlmZXN0LnRicGVkaWEuZWRpdGlvbi5pZF0sXG4gICAgICAgIFtcIkNvbGxlY3Rpb25cIiwgbWFuaWZlc3QuQ29sbGVjdGlvbl0sXG4gICAgICAgIFtcIkJhc2UgUmVsZWFzZVwiLCB0aGlzLnBsdWdpbi5iYXNlUmVsZWFzZS5yZWxlYXNlVmVyc2lvbiA/PyB0aGlzLnBsdWdpbi5iYXNlUmVsZWFzZS5yZWxlYXNlSWQgPz8gXCJOb3QgY29uZmlndXJlZFwiXSxcbiAgICAgICAgW1wiQmFzZSBSZWxlYXNlIElEXCIsIHRoaXMucGx1Z2luLmJhc2VSZWxlYXNlLnJlbGVhc2VJZCA/PyBcIk5vdCBjb25maWd1cmVkXCJdLFxuICAgICAgXSkge1xuICAgICAgICBtZXRhZGF0YS5jcmVhdGVFbChcImR0XCIsIHsgdGV4dDogbGFiZWwgfSk7XG4gICAgICAgIGNvbnN0IGRldGFpbCA9IG1ldGFkYXRhLmNyZWF0ZUVsKFwiZGRcIiwgeyB0ZXh0OiB2YWx1ZSB9KTtcbiAgICAgICAgZGV0YWlsLnN0eWxlLm1hcmdpbiA9IFwiMFwiO1xuICAgICAgfVxuICAgICAgY29uc3Qgd3JhcHBlciA9IGNvbnRlbnQuY3JlYXRlRGl2KCk7XG4gICAgICB3cmFwcGVyLnN0eWxlLm92ZXJmbG93WCA9IFwiYXV0b1wiO1xuICAgICAgY29uc3QgdGFibGUgPSB3cmFwcGVyLmNyZWF0ZUVsKFwidGFibGVcIik7XG4gICAgICB0YWJsZS5zdHlsZS53aWR0aCA9IFwiMTAwJVwiO1xuICAgICAgdGFibGUuc3R5bGUuYm9yZGVyQ29sbGFwc2UgPSBcImNvbGxhcHNlXCI7XG4gICAgICB0YWJsZS5jcmVhdGVFbChcImNhcHRpb25cIiwgeyB0ZXh0OiBcIkF2YWlsYWJsZSByZWxlYXNlcyAobmV3ZXN0IGZpcnN0KVwiIH0pO1xuICAgICAgY29uc3QgaGVhZGVyID0gdGFibGUuY3JlYXRlRWwoXCJ0aGVhZFwiKS5jcmVhdGVFbChcInRyXCIpO1xuICAgICAgZm9yIChjb25zdCBsYWJlbCBvZiBbXCJTZWxlY3RcIiwgXCJSZWxlYXNlVmVyc2lvblwiLCBcIlB1Ymxpc2hlZCBkYXRlXCIsIFwiRG93bmxvYWRlZFwiLCBcIlJlbGVhc2VOb3RlOiBTdW1tYXJ5XCIsIFwiQWRkZWRcIiwgXCJVcGRhdGVkXCIsIFwiUmVtb3ZlZFwiLCBcIkRlcGVuZGVuY2llc1wiXSkge1xuICAgICAgICBjb25zdCBjZWxsID0gaGVhZGVyLmNyZWF0ZUVsKFwidGhcIiwgeyB0ZXh0OiBsYWJlbCB9KTtcbiAgICAgICAgY2VsbC5zZXRBdHRyaWJ1dGUoXCJzY29wZVwiLCBcImNvbFwiKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGJvZHkgPSB0YWJsZS5jcmVhdGVFbChcInRib2R5XCIpO1xuICAgICAgY29uc3Qgc2VsZWN0ZWRJZHMgPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgICAgIGNvbnN0IGNoZWNrYm94ZXMgPSBuZXcgTWFwPHN0cmluZywgSFRNTElucHV0RWxlbWVudD4oKTtcbiAgICAgIGNvbnN0IHNlbGVjdGlvblN0YXR1cyA9IGNvbnRlbnQuY3JlYXRlRWwoXCJwXCIsIHsgdGV4dDogXCJTZWxlY3QgcmVsZWFzZXMgdG8gZG93bmxvYWQuIFJlcXVpcmVkIGRlcGVuZGVuY2llcyBhcmUgaW5jbHVkZWQgYXV0b21hdGljYWxseTsgaW5kZXBlbmRlbnQgcmVsZWFzZXMgY2FuIGJlIHNlbGVjdGVkIG9uIHRoZWlyIG93bi5cIiB9KTtcbiAgICAgIGNvbnN0IGRvd25sb2FkID0gY29udGVudC5jcmVhdGVFbChcImJ1dHRvblwiLCB7IHRleHQ6IFwiRG93bmxvYWQgc2VsZWN0ZWQgcmVsZWFzZXNcIiB9KTtcbiAgICAgIGRvd25sb2FkLmFkZENsYXNzKFwibW9kLWN0YVwiKTtcbiAgICAgIGRvd25sb2FkLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgIGNvbnN0IHVwZGF0ZVNlbGVjdGlvbiA9ICgpOiB2b2lkID0+IHtcbiAgICAgICAgZG93bmxvYWQuZGlzYWJsZWQgPSBzZWxlY3RlZElkcy5zaXplID09PSAwO1xuICAgICAgICBpZiAoIXNlbGVjdGVkSWRzLnNpemUpIHsgc2VsZWN0aW9uU3RhdHVzLnNldFRleHQoXCJTZWxlY3QgcmVsZWFzZXMgdG8gZG93bmxvYWQuIFJlcXVpcmVkIGRlcGVuZGVuY2llcyBhcmUgaW5jbHVkZWQgYXV0b21hdGljYWxseTsgaW5kZXBlbmRlbnQgcmVsZWFzZXMgY2FuIGJlIHNlbGVjdGVkIG9uIHRoZWlyIG93bi5cIik7IHJldHVybjsgfVxuICAgICAgICBjb25zdCBiYXRjaCA9IHRoaXMucGx1Z2luLmdldFNlbGVjdGVkQmF0Y2gobWFuaWZlc3QsIHNlbGVjdGVkSWRzKTtcbiAgICAgICAgY29uc3QgaW5jbHVkZWQgPSBuZXcgU2V0KGJhdGNoLnJlbGVhc2VzLm1hcCgocmVsZWFzZSkgPT4gcmVsZWFzZS5yZWxlYXNlSWQpKTtcbiAgICAgICAgZm9yIChjb25zdCBbaWQsIGNoZWNrYm94XSBvZiBjaGVja2JveGVzKSBjaGVja2JveC5jaGVja2VkID0gaW5jbHVkZWQuaGFzKGlkKTtcbiAgICAgICAgc2VsZWN0aW9uU3RhdHVzLnNldFRleHQoYCR7YmF0Y2gucmVsZWFzZXMubGVuZ3RofSByZWxlYXNlKHMpIHdpbGwgYmUgZG93bmxvYWRlZCBhbmQgaW5zdGFsbGVkIGluIG9yZGVyLCBpbmNsdWRpbmcgcmVxdWlyZWQgZGVwZW5kZW5jaWVzLmApO1xuICAgICAgfTtcbiAgICAgIGRvd25sb2FkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGlmICghc2VsZWN0ZWRJZHMuc2l6ZSkgcmV0dXJuO1xuICAgICAgICBjb25zdCBiYXRjaCA9IHRoaXMucGx1Z2luLmdldFNlbGVjdGVkQmF0Y2gobWFuaWZlc3QsIHNlbGVjdGVkSWRzKTtcbiAgICAgICAgbmV3IFVwZGF0ZU1vZGFsKHRoaXMuYXBwLCBiYXRjaCwgKHByb2dyZXNzKSA9PiB0aGlzLnBsdWdpbi5pbnN0YWxsU2VsZWN0ZWQoYmF0Y2gsIHByb2dyZXNzKSkub3BlbigpO1xuICAgICAgfSk7XG4gICAgICBmb3IgKGNvbnN0IHJlbGVhc2Ugb2YgWy4uLm1hbmlmZXN0LnJlbGVhc2VzXS5yZXZlcnNlKCkpIHtcbiAgICAgICAgY29uc3Qgcm93ID0gYm9keS5jcmVhdGVFbChcInRyXCIpO1xuICAgICAgICBjb25zdCBpbnN0YWxsZWQgPSB0aGlzLnBsdWdpbi5pc1JlbGVhc2VJbnN0YWxsZWQocmVsZWFzZSwgbWFuaWZlc3QpO1xuICAgICAgICBjb25zdCBjaGVja2JveCA9IHJvdy5jcmVhdGVFbChcInRkXCIpLmNyZWF0ZUVsKFwiaW5wdXRcIiwgeyB0eXBlOiBcImNoZWNrYm94XCIgfSk7XG4gICAgICAgIGNoZWNrYm94LmRpc2FibGVkID0gaW5zdGFsbGVkO1xuICAgICAgICBjaGVja2JveC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIGBTZWxlY3QgJHtyZWxlYXNlLnJlbGVhc2VWZXJzaW9ufWApO1xuICAgICAgICBpZiAoIWluc3RhbGxlZCkgY2hlY2tib3hlcy5zZXQocmVsZWFzZS5yZWxlYXNlSWQsIGNoZWNrYm94KTtcbiAgICAgICAgY2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoKSA9PiB7XG4gICAgICAgICAgaWYgKGNoZWNrYm94LmNoZWNrZWQpIHNlbGVjdGVkSWRzLmFkZChyZWxlYXNlLnJlbGVhc2VJZCk7XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGlkIG9mIFsuLi5zZWxlY3RlZElkc10pIHtcbiAgICAgICAgICAgICAgaWYgKHRoaXMucGx1Z2luLmdldFNlbGVjdGVkQmF0Y2gobWFuaWZlc3QsIG5ldyBTZXQoW2lkXSkpLnJlbGVhc2VzLnNvbWUoKGVudHJ5KSA9PiBlbnRyeS5yZWxlYXNlSWQgPT09IHJlbGVhc2UucmVsZWFzZUlkKSkgc2VsZWN0ZWRJZHMuZGVsZXRlKGlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGNoZWNrYm94ZXMudmFsdWVzKCkpIGl0ZW0uY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICAgIHVwZGF0ZVNlbGVjdGlvbigpO1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKHJlbGVhc2UucHVibGlzaGVkQXQpO1xuICAgICAgICBjb25zdCB2YWx1ZXMgPSBbcmVsZWFzZS5yZWxlYXNlVmVyc2lvbiwgZGF0ZS50b0xvY2FsZURhdGVTdHJpbmcodW5kZWZpbmVkLCB7IHllYXI6IFwibnVtZXJpY1wiLCBtb250aDogXCJzaG9ydFwiLCBkYXk6IFwibnVtZXJpY1wiIH0pLFxuICAgICAgICAgIGluc3RhbGxlZCA/IFwiWWVzIChpbnN0YWxsZWQpXCIgOiBcIk5vXCIsXG4gICAgICAgICAgcmVsZWFzZS5yZWxlYXNlTm90ZXMuc3VtbWFyeSwgU3RyaW5nKHJlbGVhc2UucmVsZWFzZU5vdGVzLmFkZGVkKSwgU3RyaW5nKHJlbGVhc2UucmVsZWFzZU5vdGVzLnVwZGF0ZWQpLCBTdHJpbmcocmVsZWFzZS5yZWxlYXNlTm90ZXMucmVtb3ZlZCksXG4gICAgICAgICAgcmVsZWFzZS5kZXBlbmRzT24gPT09IHVuZGVmaW5lZCA/IFwiQWxsIGVhcmxpZXIgcmVsZWFzZXNcIiA6IHJlbGVhc2UuZGVwZW5kc09uLmxlbmd0aCA/IHJlbGVhc2UuZGVwZW5kc09uLmpvaW4oXCIsIFwiKSA6IFwiTm9uZSAoaW5kZXBlbmRlbnQpXCJdO1xuICAgICAgICBmb3IgKGNvbnN0IFtpbmRleCwgdmFsdWVdIG9mIHZhbHVlcy5lbnRyaWVzKCkpIHtcbiAgICAgICAgICBjb25zdCBjZWxsID0gcm93LmNyZWF0ZUVsKFwidGRcIiwgeyB0ZXh0OiB2YWx1ZSB9KTtcbiAgICAgICAgICBpZiAoaW5kZXggPT09IDEpIGNlbGwudGl0bGUgPSByZWxlYXNlLnB1Ymxpc2hlZEF0O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmb3IgKGNvbnN0IGNlbGwgb2YgQXJyYXkuZnJvbSh0YWJsZS5xdWVyeVNlbGVjdG9yQWxsKFwidGgsIHRkXCIpKSkge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gY2VsbCBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5wYWRkaW5nID0gXCI4cHhcIjtcbiAgICAgICAgZWxlbWVudC5zdHlsZS50ZXh0QWxpZ24gPSBcImxlZnRcIjtcbiAgICAgICAgZWxlbWVudC5zdHlsZS52ZXJ0aWNhbEFsaWduID0gXCJ0b3BcIjtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5ib3JkZXJCb3R0b20gPSBcIjFweCBzb2xpZCB2YXIoLS1iYWNrZ3JvdW5kLW1vZGlmaWVyLWJvcmRlcilcIjtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgaWYgKHJlbmRlcklkICE9PSB0aGlzLnJlbmRlcklkKSByZXR1cm47XG4gICAgICBjb250ZW50LmVtcHR5KCk7XG4gICAgICBjb250ZW50LmNyZWF0ZUVsKFwicFwiLCB7IHRleHQ6IGBDb3VsZCBub3QgbG9hZCByZWxlYXNlIGluZm9ybWF0aW9uOiAke21lc3NhZ2UoZXJyb3IpfWAgfSk7XG4gICAgfVxuICB9XG59XG5cbmNsYXNzIFJlbGVhc2VOb3RpY2VNb2RhbCBleHRlbmRzIE1vZGFsIHtcbiAgY29uc3RydWN0b3IoYXBwOiBBcHAsIHByaXZhdGUgcmVhZG9ubHkgbWFuaWZlc3Q6IFJlbGVhc2VNYW5pZmVzdCwgcHJpdmF0ZSByZWFkb25seSByZWxlYXNlOiBSZWxlYXNlRW50cnksIHByaXZhdGUgcmVhZG9ubHkgZ29Ub0Rvd25sb2FkOiAoKSA9PiB2b2lkKSB7IHN1cGVyKGFwcCk7IH1cbiAgb25PcGVuKCk6IHZvaWQge1xuICAgIGNvbnN0IHsgY29udGVudEVsIH0gPSB0aGlzO1xuICAgIGNvbnRlbnRFbC5jcmVhdGVFbChcImgyXCIsIHsgdGV4dDogXCJOZXcgVGJwZWRpYSByZWxlYXNlIGF2YWlsYWJsZVwiIH0pO1xuICAgIGNvbnRlbnRFbC5jcmVhdGVFbChcImgzXCIsIHsgdGV4dDogdGhpcy5tYW5pZmVzdC50aXRsZSB9KTtcbiAgICBjb250ZW50RWwuY3JlYXRlRWwoXCJwXCIsIHsgdGV4dDogdGhpcy5yZWxlYXNlLnJlbGVhc2VWZXJzaW9uIH0pO1xuICAgIGNvbnRlbnRFbC5jcmVhdGVFbChcInBcIiwgeyB0ZXh0OiBgUHVibGlzaGVkOiAke25ldyBEYXRlKHRoaXMucmVsZWFzZS5wdWJsaXNoZWRBdCkudG9Mb2NhbGVTdHJpbmcoKX1gIH0pO1xuICAgIGNvbnRlbnRFbC5jcmVhdGVFbChcInBcIiwgeyB0ZXh0OiB0aGlzLnJlbGVhc2UucmVsZWFzZU5vdGVzLnN1bW1hcnkgfSk7XG4gICAgY29udGVudEVsLmNyZWF0ZUVsKFwicFwiLCB7IHRleHQ6IGBBZGRlZDogJHt0aGlzLnJlbGVhc2UucmVsZWFzZU5vdGVzLmFkZGVkfSBcdTAwQjcgVXBkYXRlZDogJHt0aGlzLnJlbGVhc2UucmVsZWFzZU5vdGVzLnVwZGF0ZWR9IFx1MDBCNyBSZW1vdmVkOiAke3RoaXMucmVsZWFzZS5yZWxlYXNlTm90ZXMucmVtb3ZlZH1gIH0pO1xuICAgIGNvbnRlbnRFbC5jcmVhdGVFbChcInBcIiwgeyB0ZXh0OiBcIkdvIHRvIFNldHRpbmdzIFx1MjE5MiBSZWxlYXNlIGluZm9ybWF0aW9uIHRvIHNlbGVjdCByZWxlYXNlcyBmb3IgZG93bmxvYWQuIFRoaXMgYW5ub3VuY2VtZW50IHdpbGwgYXBwZWFyIGFnYWluIHdoZW4gYSBuZXcgcmVsZWFzZSBpcyBhdmFpbGFibGUuXCIgfSk7XG4gICAgbmV3IFNldHRpbmcoY29udGVudEVsKVxuICAgICAgLmFkZEJ1dHRvbigoYnV0dG9uKSA9PiBidXR0b24uc2V0QnV0dG9uVGV4dChcIkFja25vd2xlZGdlXCIpLm9uQ2xpY2soKCkgPT4gdGhpcy5jbG9zZSgpKSlcbiAgICAgIC5hZGRCdXR0b24oKGJ1dHRvbikgPT4gYnV0dG9uLnNldEJ1dHRvblRleHQoXCJHbyB0byBkb3dubG9hZFwiKS5zZXRDdGEoKS5vbkNsaWNrKCgpID0+IHsgdGhpcy5jbG9zZSgpOyB0aGlzLmdvVG9Eb3dubG9hZCgpOyB9KSk7XG4gIH1cbiAgb25DbG9zZSgpOiB2b2lkIHsgdGhpcy5jb250ZW50RWwuZW1wdHkoKTsgfVxufVxuXG5jbGFzcyBPdmVyd3JpdGVNb2RhbCBleHRlbmRzIE1vZGFsIHtcbiAgcHJpdmF0ZSBkZWNpc2lvbjogT3ZlcndyaXRlRGVjaXNpb24gPSBcImNhbmNlbFwiO1xuICBjb25zdHJ1Y3RvcihhcHA6IEFwcCwgcHJpdmF0ZSByZWFkb25seSBwYXRoOiBzdHJpbmcsIHByaXZhdGUgcmVhZG9ubHkgcmVzb2x2ZTogKGRlY2lzaW9uOiBPdmVyd3JpdGVEZWNpc2lvbikgPT4gdm9pZCkgeyBzdXBlcihhcHApOyB9XG4gIG9uT3BlbigpOiB2b2lkIHtcbiAgICB0aGlzLmNvbnRlbnRFbC5jcmVhdGVFbChcImgyXCIsIHsgdGV4dDogXCJPdmVyd3JpdGUgZXhpc3RpbmcgZmlsZT9cIiB9KTtcbiAgICB0aGlzLmNvbnRlbnRFbC5jcmVhdGVFbChcInBcIiwgeyB0ZXh0OiBcIlRoaXMgbG9jYWwgZmlsZSB3YXMgbm90IGluc3RhbGxlZCBieSBUYnBlZGlhIFVwZGF0ZS4gT3ZlcndyaXRpbmcgcmVwbGFjZXMgaXRzIGNvbnRlbnRzIHdpdGggdGhlIHJlbGVhc2UgdmVyc2lvbi5cIiB9KTtcbiAgICB0aGlzLmNvbnRlbnRFbC5jcmVhdGVFbChcInBcIiwgeyB0ZXh0OiB0aGlzLnBhdGggfSk7XG4gICAgdGhpcy5jb250ZW50RWwuY3JlYXRlRWwoXCJwXCIsIHsgdGV4dDogXCJPdmVyd3JpdGUgYWxsIGFwcGxpZXMgdG8gYWxsIHJlbWFpbmluZyBjb25mbGljdGluZyBmaWxlcyBpbiB0aGlzIHVwZGF0ZSwgaW5jbHVkaW5nIHN1YnNlcXVlbnQgcmVsZWFzZXMuIENhbmNlbCBzdG9wcyB0aGUgY3VycmVudCByZWxlYXNlOyBlYXJsaWVyIGNvbXBsZXRlZCByZWxlYXNlcyByZW1haW4gaW5zdGFsbGVkLlwiIH0pO1xuICAgIG5ldyBTZXR0aW5nKHRoaXMuY29udGVudEVsKVxuICAgICAgLmFkZEJ1dHRvbigoYnV0dG9uKSA9PiBidXR0b24uc2V0QnV0dG9uVGV4dChcIkNhbmNlbCB1cGRhdGVcIikub25DbGljaygoKSA9PiB0aGlzLmNsb3NlKCkpKVxuICAgICAgLmFkZEJ1dHRvbigoYnV0dG9uKSA9PiBidXR0b24uc2V0QnV0dG9uVGV4dChcIk92ZXJ3cml0ZSB0aGlzIGZpbGVcIikub25DbGljaygoKSA9PiB0aGlzLmNob29zZShcIm92ZXJ3cml0ZVwiKSkpXG4gICAgICAuYWRkQnV0dG9uKChidXR0b24pID0+IGJ1dHRvbi5zZXRCdXR0b25UZXh0KFwiT3ZlcndyaXRlIGFsbFwiKS5zZXRDdGEoKS5vbkNsaWNrKCgpID0+IHRoaXMuY2hvb3NlKFwib3ZlcndyaXRlLWFsbFwiKSkpO1xuICB9XG4gIHByaXZhdGUgY2hvb3NlKGRlY2lzaW9uOiBPdmVyd3JpdGVEZWNpc2lvbik6IHZvaWQgeyB0aGlzLmRlY2lzaW9uID0gZGVjaXNpb247IHRoaXMuY2xvc2UoKTsgfVxuICBvbkNsb3NlKCk6IHZvaWQgeyB0aGlzLmNvbnRlbnRFbC5lbXB0eSgpOyB0aGlzLnJlc29sdmUodGhpcy5kZWNpc2lvbik7IH1cbn1cblxuY2xhc3MgVXBkYXRlTW9kYWwgZXh0ZW5kcyBNb2RhbCB7XG4gIGNvbnN0cnVjdG9yKGFwcDogQXBwLCBwcml2YXRlIHJlYWRvbmx5IGJhdGNoOiBVcGRhdGVCYXRjaCwgcHJpdmF0ZSByZWFkb25seSBpbnN0YWxsOiAocHJvZ3Jlc3M6IChtZXNzYWdlOiBzdHJpbmcpID0+IHZvaWQpID0+IFByb21pc2U8dm9pZD4pIHsgc3VwZXIoYXBwKTsgfVxuICBvbk9wZW4oKTogdm9pZCB7XG4gICAgY29uc3QgeyBjb250ZW50RWwgfSA9IHRoaXM7XG4gICAgY29uc3QgZmlyc3QgPSB0aGlzLmJhdGNoLnJlbGVhc2VzWzBdOyBjb25zdCBsYXN0ID0gdGhpcy5iYXRjaC5yZWxlYXNlcy5hdCgtMSkhO1xuICAgIGNvbnRlbnRFbC5jcmVhdGVFbChcImgyXCIsIHsgdGV4dDogYEluc3RhbGwgJHt0aGlzLmJhdGNoLnJlbGVhc2VzLmxlbmd0aH0gVGJwZWRpYSByZWxlYXNlJHt0aGlzLmJhdGNoLnJlbGVhc2VzLmxlbmd0aCA9PT0gMSA/IFwiXCIgOiBcInNcIn1gIH0pO1xuICAgIGNvbnRlbnRFbC5jcmVhdGVFbChcInBcIiwgeyB0ZXh0OiBgJHtmaXJzdC5yZWxlYXNlVmVyc2lvbn0gXHUyMTkyICR7bGFzdC5yZWxlYXNlVmVyc2lvbn1gIH0pO1xuICAgIGNvbnRlbnRFbC5jcmVhdGVFbChcInBcIiwgeyB0ZXh0OiBcIlRoZSBsaXN0IGJlbG93IGluY2x1ZGVzIHNlbGVjdGVkIHJlbGVhc2VzIGFuZCB0aGVpciByZXF1aXJlZCBkZXBlbmRlbmNpZXMuXCIgfSk7XG4gICAgY29uc3QgbGlzdCA9IGNvbnRlbnRFbC5jcmVhdGVFbChcInVsXCIpO1xuICAgIGZvciAoY29uc3QgcmVsZWFzZSBvZiB0aGlzLmJhdGNoLnJlbGVhc2VzKSBsaXN0LmNyZWF0ZUVsKFwibGlcIiwgeyB0ZXh0OiBgJHtyZWxlYXNlLnJlbGVhc2VWZXJzaW9ufSBcdTIwMTQgJHtyZWxlYXNlLnJlbGVhc2VOb3Rlcy5zdW1tYXJ5fWAgfSk7XG4gICAgY29uc3Qgc3RhdHVzID0gY29udGVudEVsLmNyZWF0ZUVsKFwicFwiKTtcbiAgICBuZXcgU2V0dGluZyhjb250ZW50RWwpXG4gICAgICAuYWRkQnV0dG9uKChidXR0b24pID0+IGJ1dHRvbi5zZXRCdXR0b25UZXh0KFwiQ2FuY2VsXCIpLm9uQ2xpY2soKCkgPT4gdGhpcy5jbG9zZSgpKSlcbiAgICAgIC5hZGRCdXR0b24oKGJ1dHRvbikgPT4gYnV0dG9uLnNldEN0YSgpLnNldEJ1dHRvblRleHQoXCJVcGRhdGUgbm93XCIpLm9uQ2xpY2soYXN5bmMgKCkgPT4ge1xuICAgICAgICBidXR0b24uc2V0RGlzYWJsZWQodHJ1ZSk7IHN0YXR1cy5zZXRUZXh0KFwiU3RhcnRpbmcgdXBkYXRlXHUyMDI2XCIpO1xuICAgICAgICB0cnkgeyBhd2FpdCB0aGlzLmluc3RhbGwoKHRleHQpID0+IHN0YXR1cy5zZXRUZXh0KHRleHQpKTsgdGhpcy5jbG9zZSgpOyB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJUYnBlZGlhIHVwZGF0ZSBpbnN0YWxsYXRpb24gZmFpbGVkXCIsIGVycm9yKTtcbiAgICAgICAgICBzdGF0dXMuc2V0VGV4dChgVXBkYXRlIGZhaWxlZDogJHttZXNzYWdlKGVycm9yKX1gKTtcbiAgICAgICAgICBidXR0b24uc2V0RGlzYWJsZWQoZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9KSk7XG4gIH1cbiAgb25DbG9zZSgpOiB2b2lkIHsgdGhpcy5jb250ZW50RWwuZW1wdHkoKTsgfVxufVxuZnVuY3Rpb24gbWVzc2FnZShlcnJvcjogdW5rbm93bik6IHN0cmluZyB7IHJldHVybiBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFwiVW5rbm93biBlcnJvclwiOyB9XG4iLCAiaW1wb3J0IEpTWmlwIGZyb20gXCJqc3ppcFwiO1xyXG5pbXBvcnQgeyBBcHAsIERhdGFBZGFwdGVyLCBOb3RpY2UsIFBsYXRmb3JtLCByZXF1ZXN0VXJsIH0gZnJvbSBcIm9ic2lkaWFuXCI7XHJcbmltcG9ydCB7IGNvbXBhcmVSZWxlYXNlVmVyc2lvbnMsIGNvbXBhcmVWZXJzaW9ucywgcGFyc2VBbmRWYWxpZGF0ZU1hbmlmZXN0IH0gZnJvbSBcIi4vbWFuaWZlc3RcIjtcclxuaW1wb3J0IHsgYXNzZXJ0TWFuYWdlZFBhdGgsIGVuc3VyZU5vUGF0aENvbmZsaWN0cyB9IGZyb20gXCIuL3BhdGgtcG9saWN5XCI7XHJcbmltcG9ydCB7IGN1cnJlbnRPd25lZFBhdGhzLCBtaWdyYXRlT3duZWRGaWxlcyB9IGZyb20gXCIuL293bmVyc2hpcFwiO1xyXG5pbXBvcnQgeyBNQU5BR0VEX1JPT1RTLCBNQU5JRkVTVF9CQVNFX1VSTCwgUGx1Z2luRGF0YSwgUHJvYmVSZXN1bHQsIFJlbGVhc2VFbnRyeSwgUmVsZWFzZU1hbmlmZXN0LCBTb3VyY2UsIFN1cHBvcnRlZExhbmd1YWdlLCBVcGRhdGVCYXRjaCwgVXBkYXRlUGxhbiwgVXBkYXRlVHJhbnNhY3Rpb24sIFdPUktFUl9VUkwgfSBmcm9tIFwiLi90eXBlc1wiO1xyXG5cclxuY29uc3QgU1RBR0lOR19ESVIgPSBcIi5vYnNpZGlhbi9wbHVnaW5zL3RicGVkaWEtdXBkYXRlLy5zdGFnaW5nXCI7XHJcbmNvbnN0IE1BWF9BUkNISVZFX0JZVEVTID0gMTAyNCAqIDEwMjQgKiAxMDI0O1xyXG5jb25zdCBNQVhfRklMRVMgPSAzMF8wMDA7XHJcbmNvbnN0IE1BWF9VTkNPTVBSRVNTRURfQllURVMgPSA0ICogMTAyNCAqIDEwMjQgKiAxMDI0O1xyXG5cclxuZXhwb3J0IHR5cGUgT3ZlcndyaXRlRGVjaXNpb24gPSBcIm92ZXJ3cml0ZVwiIHwgXCJvdmVyd3JpdGUtYWxsXCIgfCBcImNhbmNlbFwiO1xyXG5leHBvcnQgdHlwZSBDb25maXJtT3ZlcndyaXRlID0gKHBhdGg6IHN0cmluZykgPT4gUHJvbWlzZTxPdmVyd3JpdGVEZWNpc2lvbj47XHJcblxyXG5leHBvcnQgY2xhc3MgVXBkYXRlU2VydmljZSB7XG4gIHByaXZhdGUgbWFuaWZlc3RDYWNoZT86IHsga2V5OiBzdHJpbmc7IHZhbHVlOiBSZWxlYXNlTWFuaWZlc3Q7IGZldGNoZWRBdDogbnVtYmVyIH07XG4gIHByaXZhdGUgbWFuaWZlc3RSZXF1ZXN0PzogeyBrZXk6IHN0cmluZzsgcHJvbWlzZTogUHJvbWlzZTxSZWxlYXNlTWFuaWZlc3Q+IH07XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGFwcDogQXBwLFxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBwbHVnaW5WZXJzaW9uOiBzdHJpbmcsXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGdldERhdGE6ICgpID0+IFBsdWdpbkRhdGEsXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHNhdmVEYXRhOiAoZGF0YTogUGx1Z2luRGF0YSkgPT4gUHJvbWlzZTx2b2lkPixcclxuICApIHt9XHJcblxyXG4gIGFzeW5jIGNoZWNrKCk6IFByb21pc2U8VXBkYXRlQmF0Y2ggfCBudWxsPiB7XHJcbiAgICBjb25zdCBtYW5pZmVzdCA9IGF3YWl0IHRoaXMuZ2V0UmVsZWFzZU1hbmlmZXN0KHRydWUpO1xyXG4gICAgdGhpcy5hc3NlcnRDb21wYXRpYmxlKG1hbmlmZXN0KTtcclxuICAgIGNvbnN0IGRhdGEgPSB0aGlzLmdldERhdGEoKTtcclxuICAgIGF3YWl0IHRoaXMuc2F2ZURhdGEoeyAuLi5kYXRhLCBzZXJpZXNJZDogbWFuaWZlc3QudGJwZWRpYS5zZXJpZXMuaWQsIGVkaXRpb25JZDogbWFuaWZlc3QudGJwZWRpYS5lZGl0aW9uLmlkLFxyXG4gICAgICBpbnN0YWxsZWQ6IHsgLi4uZGF0YS5pbnN0YWxsZWQsIG93bmVkRmlsZXM6IG1pZ3JhdGVPd25lZEZpbGVzKGRhdGEuaW5zdGFsbGVkLm93bmVkRmlsZXMsIGRhdGEuaW5zdGFsbGVkLCBtYW5pZmVzdCkgfSB9KTtcclxuICAgIGNvbnN0IHJlbGVhc2VzID0gdGhpcy5taXNzaW5nUmVsZWFzZXMobWFuaWZlc3QpO1xyXG4gICAgcmV0dXJuIHJlbGVhc2VzLmxlbmd0aCA/IHsgbWFuaWZlc3QsIHJlbGVhc2VzIH0gOiBudWxsO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgZ2V0UmVsZWFzZU1hbmlmZXN0KGZvcmNlUmVmcmVzaCA9IGZhbHNlKTogUHJvbWlzZTxSZWxlYXNlTWFuaWZlc3Q+IHtcclxuICAgIGNvbnN0IGxhbmd1YWdlID0gdGhpcy5nZXREYXRhKCkubGFuZ3VhZ2VDb2RlO1xyXG4gICAgaWYgKCFsYW5ndWFnZSkgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyB2YXVsdFx1MjAxOXMgVGJwZWRpYSBjb2xsZWN0aW9uIGxhbmd1YWdlIGlzIG1pc3NpbmcuIENvbmZpZ3VyZSBsYW5ndWFnZUNvZGUgaW4gdGhlIHBsdWdpblx1MjAxOXMgZGF0YS5qc29uIGZpcnN0LlwiKTtcclxuICAgIGNvbnN0IGVkaXRpb24gPSB0aGlzLmdldERhdGEoKS5lZGl0aW9uSWQ7XHJcbiAgICBjb25zdCBkYXRhID0gdGhpcy5nZXREYXRhKCk7XG4gICAgY29uc3Qga2V5ID0gSlNPTi5zdHJpbmdpZnkoW2xhbmd1YWdlLCBkYXRhLnNlcmllc0lkLCBlZGl0aW9uLCBkYXRhLnRicGVkaWFdKTtcbiAgICBpZiAodGhpcy5tYW5pZmVzdFJlcXVlc3Q/LmtleSA9PT0ga2V5KSByZXR1cm4gdGhpcy5tYW5pZmVzdFJlcXVlc3QucHJvbWlzZTtcbiAgICBpZiAoIWZvcmNlUmVmcmVzaCAmJiB0aGlzLm1hbmlmZXN0Q2FjaGU/LmtleSA9PT0ga2V5ICYmIERhdGUubm93KCkgLSB0aGlzLm1hbmlmZXN0Q2FjaGUuZmV0Y2hlZEF0IDwgNjBfMDAwKSB7XG4gICAgICByZXR1cm4gdGhpcy5tYW5pZmVzdENhY2hlLnZhbHVlO1xuICAgIH1cbiAgICBjb25zdCBwcm9taXNlID0gdGhpcy5mZXRjaE1hbmlmZXN0KGxhbmd1YWdlLCBkYXRhLnNlcmllc0lkLCBlZGl0aW9uLCBkYXRhLnRicGVkaWEpLnRoZW4oKG1hbmlmZXN0KSA9PiB7XG4gICAgICB0aGlzLmFzc2VydFNlbGVjdGVkQ29sbGVjdGlvbihtYW5pZmVzdCk7XG4gICAgICB0aGlzLm1hbmlmZXN0Q2FjaGUgPSB7IGtleSwgdmFsdWU6IG1hbmlmZXN0LCBmZXRjaGVkQXQ6IERhdGUubm93KCkgfTtcbiAgICAgIHJldHVybiBtYW5pZmVzdDtcbiAgICB9KTtcbiAgICB0aGlzLm1hbmlmZXN0UmVxdWVzdCA9IHsga2V5LCBwcm9taXNlIH07XG4gICAgbGV0IG1hbmlmZXN0OiBSZWxlYXNlTWFuaWZlc3Q7XG4gICAgdHJ5IHsgbWFuaWZlc3QgPSBhd2FpdCBwcm9taXNlOyB9XG4gICAgZmluYWxseSB7IGlmICh0aGlzLm1hbmlmZXN0UmVxdWVzdD8ucHJvbWlzZSA9PT0gcHJvbWlzZSkgdGhpcy5tYW5pZmVzdFJlcXVlc3QgPSB1bmRlZmluZWQ7IH1cclxuICAgIHRoaXMuYXNzZXJ0U2VsZWN0ZWRDb2xsZWN0aW9uKG1hbmlmZXN0KTtcclxuICAgIHJldHVybiBtYW5pZmVzdDtcclxuICB9XHJcblxyXG4gIGlzUmVsZWFzZUluc3RhbGxlZChyZWxlYXNlOiBSZWxlYXNlRW50cnksIG1hbmlmZXN0OiBSZWxlYXNlTWFuaWZlc3QpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLmluc3RhbGxlZFJlbGVhc2VJZHMobWFuaWZlc3QpLmhhcyhyZWxlYXNlLnJlbGVhc2VJZCk7XHJcbiAgfVxyXG5cclxuICBnZXRTZWxlY3RlZEJhdGNoKG1hbmlmZXN0OiBSZWxlYXNlTWFuaWZlc3QsIHNlbGVjdGVkSWRzOiBTZXQ8c3RyaW5nPik6IFVwZGF0ZUJhdGNoIHtcclxuICAgIGNvbnN0IGluc3RhbGxlZCA9IHRoaXMuaW5zdGFsbGVkUmVsZWFzZUlkcyhtYW5pZmVzdCk7XHJcbiAgICBjb25zdCBpbmNsdWRlZCA9IG5ldyBTZXQ8c3RyaW5nPigpO1xyXG4gICAgY29uc3QgdmlzaXQgPSAoaWQ6IHN0cmluZyk6IHZvaWQgPT4ge1xyXG4gICAgICBpZiAoaW5zdGFsbGVkLmhhcyhpZCkgfHwgaW5jbHVkZWQuaGFzKGlkKSkgcmV0dXJuO1xyXG4gICAgICBjb25zdCBpbmRleCA9IG1hbmlmZXN0LnJlbGVhc2VzLmZpbmRJbmRleCgocmVsZWFzZSkgPT4gcmVsZWFzZS5yZWxlYXNlSWQgPT09IGlkKTtcclxuICAgICAgaWYgKGluZGV4IDwgMCkgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIHJlbGVhc2UgZGVwZW5kZW5jeTogJHtpZH0uYCk7XHJcbiAgICAgIGNvbnN0IHJlbGVhc2UgPSBtYW5pZmVzdC5yZWxlYXNlc1tpbmRleF07XHJcbiAgICAgIGluY2x1ZGVkLmFkZChpZCk7XHJcbiAgICAgIGZvciAoY29uc3QgZGVwZW5kZW5jeSBvZiByZWxlYXNlLmRlcGVuZHNPbiA/PyBtYW5pZmVzdC5yZWxlYXNlcy5zbGljZSgwLCBpbmRleCkubWFwKChlbnRyeSkgPT4gZW50cnkucmVsZWFzZUlkKSkgdmlzaXQoZGVwZW5kZW5jeSk7XHJcbiAgICB9O1xyXG4gICAgZm9yIChjb25zdCBpZCBvZiBzZWxlY3RlZElkcykgdmlzaXQoaWQpO1xyXG4gICAgY29uc3QgcmVsZWFzZXMgPSBtYW5pZmVzdC5yZWxlYXNlcy5maWx0ZXIoKHJlbGVhc2UpID0+IGluY2x1ZGVkLmhhcyhyZWxlYXNlLnJlbGVhc2VJZCkpO1xyXG4gICAgaWYgKCFyZWxlYXNlcy5sZW5ndGgpIHRocm93IG5ldyBFcnJvcihcIlNlbGVjdCBhdCBsZWFzdCBvbmUgcGVuZGluZyByZWxlYXNlLlwiKTtcclxuICAgIHJldHVybiB7IG1hbmlmZXN0LCByZWxlYXNlcyB9O1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgaW5zdGFsbChiYXRjaDogVXBkYXRlQmF0Y2gsIHByb2dyZXNzOiAobWVzc2FnZTogc3RyaW5nKSA9PiB2b2lkLCBjb25maXJtT3ZlcndyaXRlPzogQ29uZmlybU92ZXJ3cml0ZSk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgdGhpcy5hc3NlcnRTZWxlY3RlZENvbGxlY3Rpb24oYmF0Y2gubWFuaWZlc3QpO1xyXG4gICAgdGhpcy5hc3NlcnRDb21wYXRpYmxlKGJhdGNoLm1hbmlmZXN0KTtcclxuICAgIGJhdGNoID0gdGhpcy5nZXRTZWxlY3RlZEJhdGNoKGJhdGNoLm1hbmlmZXN0LCBuZXcgU2V0KGJhdGNoLnJlbGVhc2VzLm1hcCgocmVsZWFzZSkgPT4gcmVsZWFzZS5yZWxlYXNlSWQpKSk7XHJcbiAgICAvLyBBcHByb3ZhbCBsYXN0cyBvbmx5IGZvciB0aGlzIGluc3RhbGxhdGlvbiwgaW5jbHVkaW5nIHN1YnNlcXVlbnQgcmVsZWFzZXMuXHJcbiAgICBsZXQgb3ZlcndyaXRlQWxsID0gZmFsc2U7XHJcbiAgICBjb25zdCBhcHByb3ZlT3ZlcndyaXRlOiBDb25maXJtT3ZlcndyaXRlID0gYXN5bmMgKHBhdGgpID0+IHtcclxuICAgICAgaWYgKG92ZXJ3cml0ZUFsbCkgcmV0dXJuIFwib3ZlcndyaXRlXCI7XHJcbiAgICAgIGNvbnN0IGRlY2lzaW9uID0gYXdhaXQgY29uZmlybU92ZXJ3cml0ZT8uKHBhdGgpID8/IFwiY2FuY2VsXCI7XHJcbiAgICAgIGlmIChkZWNpc2lvbiA9PT0gXCJvdmVyd3JpdGUtYWxsXCIpIG92ZXJ3cml0ZUFsbCA9IHRydWU7XHJcbiAgICAgIHJldHVybiBkZWNpc2lvbjtcclxuICAgIH07XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgYmF0Y2gucmVsZWFzZXMubGVuZ3RoOyBpbmRleCArPSAxKSB7XHJcbiAgICAgIHRoaXMuYXNzZXJ0U2VsZWN0ZWRDb2xsZWN0aW9uKGJhdGNoLm1hbmlmZXN0KTtcclxuICAgICAgY29uc3QgcmVsZWFzZSA9IGJhdGNoLnJlbGVhc2VzW2luZGV4XTtcclxuICAgICAgcHJvZ3Jlc3MoYFJlbGVhc2UgJHtpbmRleCArIDF9IG9mICR7YmF0Y2gucmVsZWFzZXMubGVuZ3RofTogJHtyZWxlYXNlLnJlbGVhc2VWZXJzaW9ufWApO1xyXG4gICAgICBhd2FpdCB0aGlzLmluc3RhbGxSZWxlYXNlKGJhdGNoLm1hbmlmZXN0LCByZWxlYXNlLCBwcm9ncmVzcywgYXBwcm92ZU92ZXJ3cml0ZSk7XHJcbiAgICB9XHJcbiAgICBuZXcgTm90aWNlKGBJbnN0YWxsZWQgJHtiYXRjaC5yZWxlYXNlcy5sZW5ndGh9IFRicGVkaWEgcmVsZWFzZShzKS5gKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXN5bmMgaW5zdGFsbFJlbGVhc2UobWFuaWZlc3Q6IFJlbGVhc2VNYW5pZmVzdCwgcmVsZWFzZTogUmVsZWFzZUVudHJ5LCBwcm9ncmVzczogKG1lc3NhZ2U6IHN0cmluZykgPT4gdm9pZCwgY29uZmlybU92ZXJ3cml0ZTogQ29uZmlybU92ZXJ3cml0ZSk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgbGV0IHRyYW5zYWN0aW9uOiBVcGRhdGVUcmFuc2FjdGlvbiB8IHVuZGVmaW5lZDtcclxuICAgIGxldCBjb21taXR0ZWQgPSBmYWxzZTtcclxuICAgIHRyeSB7XHJcbiAgICAgIHByb2dyZXNzKFwiQ3JlYXRpbmcgdXBkYXRlIHRyYW5zYWN0aW9uXHUyMDI2XCIpO1xyXG4gICAgICB0cmFuc2FjdGlvbiA9IGF3YWl0IHRoaXMuY3JlYXRlVHJhbnNhY3Rpb24obWFuaWZlc3QsIHJlbGVhc2UpO1xyXG4gICAgICBwcm9ncmVzcyhcIkRpc2NvdmVyaW5nIHVwZGF0ZSBzb3VyY2VzXHUyMDI2XCIpO1xyXG4gICAgICBjb25zdCBzb3VyY2VzID0gYXdhaXQgdGhpcy5nZXRTb3VyY2VzKG1hbmlmZXN0LCByZWxlYXNlLCB0cmFuc2FjdGlvbik7XHJcbiAgICAgIGlmICghc291cmNlcy5sZW5ndGgpIHRocm93IG5ldyBFcnJvcihcIk5vIGVuYWJsZWQgdXBkYXRlIHNvdXJjZSBpcyBhdmFpbGFibGUuXCIpO1xyXG4gICAgICBjb25zdCByYW5rZWQgPSBhd2FpdCB0aGlzLnJhbmtTb3VyY2VzKHNvdXJjZXMsIHRyYW5zYWN0aW9uLCBwcm9ncmVzcyk7XHJcbiAgICAgIGlmICghcmFua2VkLmxlbmd0aCkgdGhyb3cgbmV3IEVycm9yKFwiQWxsIHVwZGF0ZSBzb3VyY2VzIGZhaWxlZCB0aGVpciBoZWFsdGggY2hlY2suXCIpO1xyXG5cclxuICAgICAgbGV0IGFyY2hpdmU6IEFycmF5QnVmZmVyIHwgdW5kZWZpbmVkO1xyXG4gICAgICBsZXQgbGFzdEVycm9yOiB1bmtub3duO1xyXG4gICAgICBmb3IgKGNvbnN0IHNvdXJjZSBvZiByYW5rZWQpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgcHJvZ3Jlc3MoYERvd25sb2FkaW5nIGZyb20gJHtzb3VyY2UubmFtZX1cdTIwMjZgKTtcclxuICAgICAgICAgIGFyY2hpdmUgPSBhd2FpdCB0aGlzLmRvd25sb2FkUGFja2FnZShzb3VyY2UsIHRyYW5zYWN0aW9uLCByZWxlYXNlLmZpbGVuYW1lKTtcbiAgICAgICAgICBhd2FpdCB0aGlzLnZhbGlkYXRlQXJjaGl2ZShhcmNoaXZlLCBtYW5pZmVzdCwgcmVsZWFzZSk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikgeyBsYXN0RXJyb3IgPSBlcnJvcjsgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmICghYXJjaGl2ZSkgdGhyb3cgbGFzdEVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBsYXN0RXJyb3IgOiBuZXcgRXJyb3IoXCJBbGwgdXBkYXRlIHNvdXJjZXMgZmFpbGVkLlwiKTtcclxuXHJcbiAgICAgIHByb2dyZXNzKFwiVmFsaWRhdGluZyByZWxlYXNlIGFyY2hpdmVcdTIwMjZcIik7XHJcbiAgICAgIGNvbnN0IHN0YWdpbmdQYXRoID0gYCR7U1RBR0lOR19ESVJ9LyR7dHJhbnNhY3Rpb24uaWR9L3BhY2thZ2UuemlwYDtcclxuICAgICAgYXdhaXQgd3JpdGVCaW5hcnkodGhpcy5hcHAudmF1bHQuYWRhcHRlciwgc3RhZ2luZ1BhdGgsIGFyY2hpdmUpO1xyXG4gICAgICBhcmNoaXZlID0gYXdhaXQgdGhpcy5hcHAudmF1bHQuYWRhcHRlci5yZWFkQmluYXJ5KHN0YWdpbmdQYXRoKTtcclxuICAgICAgY29uc3QgcGxhbiA9IGF3YWl0IHRoaXMudmFsaWRhdGVBcmNoaXZlKGFyY2hpdmUsIG1hbmlmZXN0LCByZWxlYXNlKTtcclxuICAgICAgcHJvZ3Jlc3MoXCJBcHBseWluZyBtYW5hZ2VkIGZpbGVzXHUyMDI2XCIpO1xyXG4gICAgICBhd2FpdCB0aGlzLmFwcGx5KHBsYW4sIGFyY2hpdmUsIHByb2dyZXNzLCBjb25maXJtT3ZlcndyaXRlKTtcclxuICAgICAgY29tbWl0dGVkID0gdHJ1ZTtcclxuICAgICAgdHJ5IHsgYXdhaXQgdGhpcy5yZXBvcnQodHJhbnNhY3Rpb24sIFwic3VjY2Vzc1wiKTsgfVxyXG4gICAgICBjYXRjaCB7IG5ldyBOb3RpY2UoXCJUYnBlZGlhIHdhcyB1cGRhdGVkLCBidXQgdGhlIHNlcnZpY2UgY291bGQgbm90IHJlY29yZCB0aGUgc3VjY2VzcyBhdWRpdC5cIik7IH1cclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGlmICh0cmFuc2FjdGlvbiAmJiAhY29tbWl0dGVkKSBhd2FpdCB0aGlzLnJlcG9ydCh0cmFuc2FjdGlvbiwgXCJmYWlsZWRcIikuY2F0Y2goKCkgPT4gdW5kZWZpbmVkKTtcclxuICAgICAgdGhyb3cgZXJyb3I7XHJcbiAgICB9IGZpbmFsbHkge1xyXG4gICAgICBpZiAodHJhbnNhY3Rpb24pIGF3YWl0IHJlbW92ZVRyZWUodGhpcy5hcHAudmF1bHQuYWRhcHRlciwgYCR7U1RBR0lOR19ESVJ9LyR7dHJhbnNhY3Rpb24uaWR9YCkuY2F0Y2goKCkgPT4gdW5kZWZpbmVkKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgbWlzc2luZ1JlbGVhc2VzKG1hbmlmZXN0OiBSZWxlYXNlTWFuaWZlc3QpOiBSZWxlYXNlRW50cnlbXSB7XHJcbiAgICBjb25zdCBpbnN0YWxsZWQgPSB0aGlzLmluc3RhbGxlZFJlbGVhc2VJZHMobWFuaWZlc3QpO1xyXG4gICAgcmV0dXJuIG1hbmlmZXN0LnJlbGVhc2VzLmZpbHRlcigocmVsZWFzZSkgPT4gIWluc3RhbGxlZC5oYXMocmVsZWFzZS5yZWxlYXNlSWQpKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5zdGFsbGVkUmVsZWFzZUlkcyhtYW5pZmVzdDogUmVsZWFzZU1hbmlmZXN0KTogU2V0PHN0cmluZz4ge1xyXG4gICAgY29uc3QgaW5zdGFsbGVkID0gdGhpcy5nZXREYXRhKCkuaW5zdGFsbGVkO1xyXG4gICAgY29uc3QgaWRzID0gbmV3IFNldChpbnN0YWxsZWQuYXBwbGllZFJlbGVhc2VJZHMpO1xyXG4gICAgaWYgKGluc3RhbGxlZC5yZWxlYXNlSWQpIGlkcy5hZGQoaW5zdGFsbGVkLnJlbGVhc2VJZCk7XHJcbiAgICBpZiAoaW5zdGFsbGVkLnRyYWNraW5nVmVyc2lvbiA9PT0gMikgcmV0dXJuIGlkcztcclxuICAgIGNvbnN0IGluc3RhbGxlZEluZGV4ID0gaW5zdGFsbGVkLnJlbGVhc2VJZCA/IG1hbmlmZXN0LnJlbGVhc2VzLmZpbmRJbmRleCgocmVsZWFzZSkgPT4gcmVsZWFzZS5yZWxlYXNlSWQgPT09IGluc3RhbGxlZC5yZWxlYXNlSWQpIDogLTE7XHJcbiAgICBpZiAoaW5zdGFsbGVkSW5kZXggPj0gMCkge1xyXG4gICAgICBmb3IgKGNvbnN0IHJlbGVhc2Ugb2YgbWFuaWZlc3QucmVsZWFzZXMuc2xpY2UoMCwgaW5zdGFsbGVkSW5kZXggKyAxKSkgaWRzLmFkZChyZWxlYXNlLnJlbGVhc2VJZCk7XHJcbiAgICAgIHJldHVybiBpZHM7XHJcbiAgICB9XHJcbiAgICBpZiAoIWluc3RhbGxlZC5yZWxlYXNlVmVyc2lvbikgcmV0dXJuIGlkcztcclxuICAgIGNvbnN0IGtleSA9IFttYW5pZmVzdC50YnBlZGlhLmxhbmd1YWdlLmNvZGUsIG1hbmlmZXN0LnRicGVkaWEuc2VyaWVzLmlkLCBtYW5pZmVzdC50YnBlZGlhLmVkaXRpb24uaWRdLmpvaW4oXCItXCIpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICBpZiAoIWluc3RhbGxlZC5yZWxlYXNlVmVyc2lvbi5zdGFydHNXaXRoKGAke2tleX0tYCkgJiYgIS9eXFxkezR9XFwuLy50ZXN0KGluc3RhbGxlZC5yZWxlYXNlVmVyc2lvbikpIHtcclxuICAgICAgcmV0dXJuIGlkcztcclxuICAgIH1cclxuICAgIGZvciAoY29uc3QgcmVsZWFzZSBvZiBtYW5pZmVzdC5yZWxlYXNlcykgaWYgKGNvbXBhcmVSZWxlYXNlVmVyc2lvbnMocmVsZWFzZS5yZWxlYXNlVmVyc2lvbiwgaW5zdGFsbGVkLnJlbGVhc2VWZXJzaW9uKSA8PSAwKSBpZHMuYWRkKHJlbGVhc2UucmVsZWFzZUlkKTtcclxuICAgIHJldHVybiBpZHM7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFzeW5jIGZldGNoTWFuaWZlc3QobGFuZ3VhZ2U6IFN1cHBvcnRlZExhbmd1YWdlLCBzZXJpZXM6IHN0cmluZywgZWRpdGlvbjogc3RyaW5nLCBjb2xsZWN0aW9uOiBzdHJpbmcpOiBQcm9taXNlPFJlbGVhc2VNYW5pZmVzdD4ge1xyXG4gICAgaWYgKCEvXlthLXowLTldKyg/Oi1bYS16MC05XSspKiQvLnRlc3Qoc2VyaWVzKSkgdGhyb3cgbmV3IEVycm9yKFwiVGhlIGNvbmZpZ3VyZWQgVGJwZWRpYSBzZXJpZXMgSUQgaXMgaW52YWxpZC5cIik7XHJcbiAgICBpZiAoZWRpdGlvbiAhPT0gXCJzdGFuZGFyZFwiICYmIGVkaXRpb24gIT09IFwiYWR2YW5jZWRcIikgdGhyb3cgbmV3IEVycm9yKFwiQ2hvb3NlIGEgc3VwcG9ydGVkIFRicGVkaWEgZWRpdGlvbiBpbiB0aGUgcGx1Z2luIHNldHRpbmdzLlwiKTtcclxuICAgIGlmICghL15WWzEtOV1cXGQqJC8udGVzdChjb2xsZWN0aW9uKSkgdGhyb3cgbmV3IEVycm9yKFwiVGhlIGNvbmZpZ3VyZWQgdGJwZWRpYSB2ZXJzaW9uIG11c3QgYmUgYSB2ZXJzaW9uIHN1Y2ggYXMgVjEuXCIpO1xyXG4gICAgY29uc3QgdXJsID0gYCR7TUFOSUZFU1RfQkFTRV9VUkx9LyR7bGFuZ3VhZ2UudG9Mb3dlckNhc2UoKX0vJHtzZXJpZXN9LyR7ZWRpdGlvbn0vJHtjb2xsZWN0aW9ufS9sYXRlc3QuanNvbj9jaGVjaz0ke2NyeXB0by5yYW5kb21VVUlEKCl9YDtcbiAgICBjb25zdCBuYXRpdmVSZXF1ZXN0ID0gKCkgPT4gd2l0aE1hbmlmZXN0VGltZW91dChQcm9taXNlLnJlc29sdmUocmVxdWVzdFVybCh7IHVybCwgbWV0aG9kOiBcIkdFVFwiLCBoZWFkZXJzOiB7IFwiQ2FjaGUtQ29udHJvbFwiOiBcIm5vLWNhY2hlXCIgfSwgdGhyb3c6IGZhbHNlIH0pKSk7XG4gICAgbGV0IHJlc3BvbnNlOiB7IHN0YXR1czogbnVtYmVyOyBqc29uOiB1bmtub3duIH07XG4gICAgaWYgKFBsYXRmb3JtPy5pc01vYmlsZSkge1xuICAgICAgY29uc3QgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlc3BvbnNlID0gYXdhaXQgd2l0aE1hbmlmZXN0VGltZW91dCgoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGZldGNoKHVybCwgeyBzaWduYWw6IGNvbnRyb2xsZXIuc2lnbmFsIH0pO1xuICAgICAgICAgIHJldHVybiB7IHN0YXR1czogcmVzdWx0LnN0YXR1cywganNvbjogcmVzdWx0LnN0YXR1cyA9PT0gMjAwID8gYXdhaXQgcmVzdWx0Lmpzb24oKSA6IG51bGwgfTtcbiAgICAgICAgfSkoKSk7XG4gICAgICB9IGNhdGNoIHtcbiAgICAgICAgY29udHJvbGxlci5hYm9ydCgpO1xuICAgICAgICByZXNwb25zZSA9IGF3YWl0IG5hdGl2ZVJlcXVlc3QoKTtcbiAgICAgIH0gZmluYWxseSB7IGNvbnRyb2xsZXIuYWJvcnQoKTsgfVxuICAgIH0gZWxzZSByZXNwb25zZSA9IGF3YWl0IG5hdGl2ZVJlcXVlc3QoKTtcclxuICAgIGlmIChyZXNwb25zZS5zdGF0dXMgIT09IDIwMCkgdGhyb3cgbmV3IEVycm9yKGBDb3VsZCBub3QgcmV0cmlldmUgcmVsZWFzZSBtZXRhZGF0YSAoSFRUUCAke3Jlc3BvbnNlLnN0YXR1c30pLmApO1xyXG4gICAgbGV0IGpzb246IHVua25vd247XHJcbiAgICB0cnkgeyBqc29uID0gcmVzcG9uc2UuanNvbjsgfSBjYXRjaCB7IHRocm93IG5ldyBFcnJvcihcIlJlbGVhc2UgbWV0YWRhdGEgaXMgbm90IHZhbGlkIEpTT04uXCIpOyB9XHJcbiAgICByZXR1cm4gcGFyc2VBbmRWYWxpZGF0ZU1hbmlmZXN0KGpzb24pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhc3NlcnRTZWxlY3RlZENvbGxlY3Rpb24obWFuaWZlc3Q6IFJlbGVhc2VNYW5pZmVzdCk6IHZvaWQge1xyXG4gICAgY29uc3QgZGF0YSA9IHRoaXMuZ2V0RGF0YSgpO1xyXG4gICAgaWYgKG1hbmlmZXN0LnRicGVkaWEubGFuZ3VhZ2UuY29kZSAhPT0gZGF0YS5sYW5ndWFnZUNvZGUgfHwgbWFuaWZlc3QudGJwZWRpYS5zZXJpZXMuaWQgIT09IGRhdGEuc2VyaWVzSWQgfHwgbWFuaWZlc3QudGJwZWRpYS5lZGl0aW9uLmlkICE9PSBkYXRhLmVkaXRpb25JZCB8fCBtYW5pZmVzdC5Db2xsZWN0aW9uICE9PSBkYXRhLnRicGVkaWEpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhlIHJlbGVhc2UgbWFuaWZlc3QgZG9lcyBub3QgbWF0Y2ggdGhlIHNlbGVjdGVkIGxhbmd1YWdlLCBzZXJpZXMsIGVkaXRpb24sIGFuZCBDb2xsZWN0aW9uLiBDaGVjayBmb3IgdXBkYXRlcyBhZ2FpbiBhZnRlciBjaGFuZ2luZyBzZXR0aW5ncy5cIik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFzc2VydENvbXBhdGlibGUobWFuaWZlc3Q6IFJlbGVhc2VNYW5pZmVzdCk6IHZvaWQge1xyXG4gICAgaWYgKGNvbXBhcmVWZXJzaW9ucyh0aGlzLnBsdWdpblZlcnNpb24sIG1hbmlmZXN0Lm1pbmltdW1QbHVnaW5WZXJzaW9uKSA8IDApIHRocm93IG5ldyBFcnJvcihgVGhpcyByZWxlYXNlIHJlcXVpcmVzIHBsdWdpbiAke21hbmlmZXN0Lm1pbmltdW1QbHVnaW5WZXJzaW9ufSBvciBuZXdlci5gKTtcclxuICAgIGNvbnN0IGFwcFZlcnNpb24gPSB0aGlzLmFwcFZlcnNpb24oKTtcclxuICAgIC8vIE9ic2lkaWFuIGRvZXMgbm90IGV4cG9zZSBhIHN0YWJsZSwgdHlwZWQgdmVyc2lvbiBwcm9wZXJ0eSB0byBldmVyeSBwbHVnaW5cclxuICAgIC8vIHJ1bnRpbWUuIEEgbWlzc2luZyB2YWx1ZSBtdXN0IG5vdCBiZSBpbnRlcnByZXRlZCBhcyB2ZXJzaW9uIDAuMC4wLlxyXG4gICAgaWYgKGFwcFZlcnNpb24gJiYgY29tcGFyZVZlcnNpb25zKGFwcFZlcnNpb24sIG1hbmlmZXN0Lm1pbmltdW1PYnNpZGlhblZlcnNpb24pIDwgMCkgdGhyb3cgbmV3IEVycm9yKGBUaGlzIHJlbGVhc2UgcmVxdWlyZXMgT2JzaWRpYW4gJHttYW5pZmVzdC5taW5pbXVtT2JzaWRpYW5WZXJzaW9ufSBvciBuZXdlci5gKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXN5bmMgY3JlYXRlVHJhbnNhY3Rpb24obWFuaWZlc3Q6IFJlbGVhc2VNYW5pZmVzdCwgcmVsZWFzZTogUmVsZWFzZUVudHJ5KTogUHJvbWlzZTxVcGRhdGVUcmFuc2FjdGlvbj4ge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmFwaShcIi91cGRhdGVzL3RyYW5zYWN0aW9uc1wiLCBcIlBPU1RcIiwge1xyXG4gICAgICB0aXRsZTogbWFuaWZlc3QudGl0bGUsIHZlcnNpb246IHJlbGVhc2UucmVsZWFzZVZlcnNpb24sIGZpbGVuYW1lOiByZWxlYXNlLmZpbGVuYW1lLCBsYW5ndWFnZTogbWFuaWZlc3QudGJwZWRpYS5sYW5ndWFnZS5jb2RlLFxyXG4gICAgICBzZXJpZXM6IG1hbmlmZXN0LnRicGVkaWEuc2VyaWVzLmlkLCBlZGl0aW9uOiBtYW5pZmVzdC50YnBlZGlhLmVkaXRpb24uaWQsXHJcbiAgICAgIGRldmljZV90eXBlOiBQbGF0Zm9ybS5pc01vYmlsZSA/IFwibW9iaWxlXCIgOiBcImRlc2t0b3BcIiwgb3M6IG5hdmlnYXRvci5wbGF0Zm9ybSxcclxuICAgICAgY2xpZW50X3ZlcnNpb246IGAke3RoaXMuYXBwVmVyc2lvbigpID8/IFwidW5rbm93blwifTsgcGx1Z2luLyR7dGhpcy5wbHVnaW5WZXJzaW9ufWAsIHVzZXJfYWdlbnQ6IG5hdmlnYXRvci51c2VyQWdlbnQsXHJcbiAgICB9KTtcclxuICAgIGlmICh0eXBlb2YgcmVzcG9uc2UuaWQgIT09IFwic3RyaW5nXCIgfHwgdHlwZW9mIHJlc3BvbnNlLnRva2VuICE9PSBcInN0cmluZ1wiKSB0aHJvdyBuZXcgRXJyb3IoXCJVcGRhdGUgc2VydmljZSByZXR1cm5lZCBhbiBpbnZhbGlkIHRyYW5zYWN0aW9uLlwiKTtcclxuICAgIHJldHVybiB7IGlkOiByZXNwb25zZS5pZCwgdG9rZW46IHJlc3BvbnNlLnRva2VuIH07XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFzeW5jIGdldFNvdXJjZXMobWFuaWZlc3Q6IFJlbGVhc2VNYW5pZmVzdCwgcmVsZWFzZTogUmVsZWFzZUVudHJ5LCB0cmFuc2FjdGlvbjogVXBkYXRlVHJhbnNhY3Rpb24pOiBQcm9taXNlPFNvdXJjZVtdPiB7XHJcbiAgICBjb25zdCBxdWVyeSA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoeyBsYW5ndWFnZTogbWFuaWZlc3QudGJwZWRpYS5sYW5ndWFnZS5jb2RlLCBzZXJpZXM6IG1hbmlmZXN0LnRicGVkaWEuc2VyaWVzLmlkLCBlZGl0aW9uOiBtYW5pZmVzdC50YnBlZGlhLmVkaXRpb24uaWQsIHRpdGxlOiBtYW5pZmVzdC50aXRsZSwgdmVyc2lvbjogcmVsZWFzZS5yZWxlYXNlVmVyc2lvbiwgZmlsZW5hbWU6IHJlbGVhc2UuZmlsZW5hbWUgfSk7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuYXBpKGAvdXBkYXRlcy9zb3VyY2VzPyR7cXVlcnl9YCwgXCJHRVRcIiwgdW5kZWZpbmVkLCB0cmFuc2FjdGlvbik7XHJcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkocmVzcG9uc2Uuc291cmNlcykpIHRocm93IG5ldyBFcnJvcihcIlVwZGF0ZSBzZXJ2aWNlIHJldHVybmVkIGFuIGludmFsaWQgc291cmNlIGxpc3QuXCIpO1xyXG4gICAgcmV0dXJuIHJlc3BvbnNlLnNvdXJjZXMuZmlsdGVyKGlzU291cmNlKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXN5bmMgcmFua1NvdXJjZXMoc291cmNlczogU291cmNlW10sIHRyYW5zYWN0aW9uOiBVcGRhdGVUcmFuc2FjdGlvbiwgcHJvZ3Jlc3M6IChtZXNzYWdlOiBzdHJpbmcpID0+IHZvaWQpOiBQcm9taXNlPFNvdXJjZVtdPiB7XHJcbiAgICBwcm9ncmVzcyhcIlRlc3RpbmcgdXBkYXRlIHNvdXJjZXNcdTIwMjZcIik7XHJcbiAgICBjb25zdCBwcm9iZXMgPSBhd2FpdCBQcm9taXNlLmFsbChzb3VyY2VzLnNsaWNlKDAsIDgpLm1hcChhc3luYyAoc291cmNlKSA9PiAoeyBzb3VyY2UsIHJlc3VsdDogYXdhaXQgdGhpcy5wcm9iZShzb3VyY2UsIHRyYW5zYWN0aW9uKSB9KSkpO1xyXG4gICAgcmV0dXJuIHByb2Jlc1xyXG4gICAgICAuZmlsdGVyKChpdGVtKTogaXRlbSBpcyB7IHNvdXJjZTogU291cmNlOyByZXN1bHQ6IFByb2JlUmVzdWx0IH0gPT4gaXRlbS5yZXN1bHQuaGVhbHRoeSAmJiB0eXBlb2YgaXRlbS5yZXN1bHQubGF0ZW5jeU1zID09PSBcIm51bWJlclwiKVxyXG4gICAgICAuc29ydCgoYSwgYikgPT4gc2NvcmUoYS5zb3VyY2UsIGEucmVzdWx0KSAtIHNjb3JlKGIuc291cmNlLCBiLnJlc3VsdCkpXHJcbiAgICAgIC5tYXAoKGl0ZW0pID0+IGl0ZW0uc291cmNlKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXN5bmMgcHJvYmUoc291cmNlOiBTb3VyY2UsIHRyYW5zYWN0aW9uOiBVcGRhdGVUcmFuc2FjdGlvbik6IFByb21pc2U8UHJvYmVSZXN1bHQ+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5hcGkoYC91cGRhdGVzL3NvdXJjZXMvJHtlbmNvZGVVUklDb21wb25lbnQoc291cmNlLnNvdXJjZUlkKX0vcHJvYmVgLCBcIlBPU1RcIiwge30sIHRyYW5zYWN0aW9uKTtcclxuICAgICAgcmV0dXJuIHsgc291cmNlSWQ6IHNvdXJjZS5zb3VyY2VJZCwgaGVhbHRoeTogcmVzcG9uc2UuaGVhbHRoeSA9PT0gdHJ1ZSwgbGF0ZW5jeU1zOiBhc051bWJlcihyZXNwb25zZS5sYXRlbmN5TXMpLCBieXRlczogYXNOdW1iZXIocmVzcG9uc2UuYnl0ZXMpLCBlcnJvcjogYXNTdHJpbmcocmVzcG9uc2UuZXJyb3IpIH07XHJcbiAgICB9IGNhdGNoIHsgcmV0dXJuIHsgc291cmNlSWQ6IHNvdXJjZS5zb3VyY2VJZCwgaGVhbHRoeTogZmFsc2UgfTsgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhc3luYyBkb3dubG9hZFBhY2thZ2Uoc291cmNlOiBTb3VyY2UsIHRyYW5zYWN0aW9uOiBVcGRhdGVUcmFuc2FjdGlvbiwgZmlsZW5hbWU6IHN0cmluZyk6IFByb21pc2U8QXJyYXlCdWZmZXI+IHtcbiAgICBpZiAoUGxhdGZvcm0/LmlzTW9iaWxlKSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHJlcXVlc3RVcmwoeyB1cmw6IGAke1dPUktFUl9VUkx9L3VwZGF0ZXMvcGFja2FnZWAsIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsIC4uLmF1dGhIZWFkZXJzKHRyYW5zYWN0aW9uKSB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IHNvdXJjZUlkOiBzb3VyY2Uuc291cmNlSWQsIGZpbGVuYW1lIH0pLCB0aHJvdzogZmFsc2UgfSk7XG4gICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHRocm93IG5ldyBFcnJvcihgRG93bmxvYWQgZmFpbGVkIGZyb20gJHtzb3VyY2UubmFtZX0gKEhUVFAgJHtyZXNwb25zZS5zdGF0dXN9KS5gKTtcbiAgICAgIGNvbnN0IGFyY2hpdmUgPSByZXNwb25zZS5hcnJheUJ1ZmZlcjtcbiAgICAgIGlmIChhcmNoaXZlLmJ5dGVMZW5ndGggPiBNQVhfQVJDSElWRV9CWVRFUykgdGhyb3cgbmV3IEVycm9yKFwiUmVsZWFzZSBhcmNoaXZlIGV4Y2VlZHMgdGhlIGNvbmZpZ3VyZWQgc2l6ZSBsaW1pdC5cIik7XG4gICAgICBjb25zdCBkZWNsYXJlZExlbmd0aCA9IE51bWJlcihyZXNwb25zZS5oZWFkZXJzW1wiY29udGVudC1sZW5ndGhcIl0gPz8gcmVzcG9uc2UuaGVhZGVyc1tcIkNvbnRlbnQtTGVuZ3RoXCJdID8/IDApO1xuICAgICAgaWYgKGRlY2xhcmVkTGVuZ3RoID4gMCAmJiBhcmNoaXZlLmJ5dGVMZW5ndGggIT09IGRlY2xhcmVkTGVuZ3RoKSB0aHJvdyBuZXcgRXJyb3IoYEluY29tcGxldGUgWklQIGZyb20gJHtzb3VyY2UubmFtZX06IHJlY2VpdmVkICR7YXJjaGl2ZS5ieXRlTGVuZ3RofSBvZiAke2RlY2xhcmVkTGVuZ3RofSBieXRlcy5gKTtcbiAgICAgIHJldHVybiBhcmNoaXZlO1xuICAgIH1cclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYCR7V09SS0VSX1VSTH0vdXBkYXRlcy9wYWNrYWdlYCwge1xyXG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLCBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLCAuLi5hdXRoSGVhZGVycyh0cmFuc2FjdGlvbikgfSxcclxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBzb3VyY2VJZDogc291cmNlLnNvdXJjZUlkLCBmaWxlbmFtZSB9KSxcclxuICAgIH0pO1xyXG4gICAgaWYgKCFyZXNwb25zZS5vayB8fCAhcmVzcG9uc2UuYm9keSkgdGhyb3cgbmV3IEVycm9yKGBEb3dubG9hZCBmYWlsZWQgZnJvbSAke3NvdXJjZS5uYW1lfSAoSFRUUCAke3Jlc3BvbnNlLnN0YXR1c30pLmApO1xyXG4gICAgY29uc3QgZGVjbGFyZWRMZW5ndGggPSBOdW1iZXIocmVzcG9uc2UuaGVhZGVycy5nZXQoXCJDb250ZW50LUxlbmd0aFwiKSA/PyAwKTtcbiAgICBjb25zdCByZWFkZXIgPSByZXNwb25zZS5ib2R5LmdldFJlYWRlcigpOyBjb25zdCBjaHVua3M6IFVpbnQ4QXJyYXlbXSA9IFtdOyBsZXQgdG90YWwgPSAwO1xyXG4gICAgd2hpbGUgKHRydWUpIHtcclxuICAgICAgY29uc3QgeyB2YWx1ZSwgZG9uZSB9ID0gYXdhaXQgcmVhZGVyLnJlYWQoKTtcclxuICAgICAgaWYgKGRvbmUpIGJyZWFrO1xyXG4gICAgICB0b3RhbCArPSB2YWx1ZS5ieXRlTGVuZ3RoO1xyXG4gICAgICBpZiAodG90YWwgPiBNQVhfQVJDSElWRV9CWVRFUykgeyBhd2FpdCByZWFkZXIuY2FuY2VsKCk7IHRocm93IG5ldyBFcnJvcihcIlJlbGVhc2UgYXJjaGl2ZSBleGNlZWRzIHRoZSBjb25maWd1cmVkIHNpemUgbGltaXQuXCIpOyB9XHJcbiAgICAgIGNodW5rcy5wdXNoKHZhbHVlKTtcclxuICAgIH1cclxuICAgIGNvbnN0IGFyY2hpdmUgPSBuZXcgVWludDhBcnJheSh0b3RhbCk7IGxldCBvZmZzZXQgPSAwO1xyXG4gICAgZm9yIChjb25zdCBjaHVuayBvZiBjaHVua3MpIHsgYXJjaGl2ZS5zZXQoY2h1bmssIG9mZnNldCk7IG9mZnNldCArPSBjaHVuay5ieXRlTGVuZ3RoOyB9XHJcbiAgICBpZiAoZGVjbGFyZWRMZW5ndGggPiAwICYmIHRvdGFsICE9PSBkZWNsYXJlZExlbmd0aCkgdGhyb3cgbmV3IEVycm9yKGBJbmNvbXBsZXRlIFpJUCBmcm9tICR7c291cmNlLm5hbWV9OiByZWNlaXZlZCAke3RvdGFsfSBvZiAke2RlY2xhcmVkTGVuZ3RofSBieXRlcy5gKTtcbiAgICByZXR1cm4gYXJjaGl2ZS5idWZmZXI7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFzeW5jIHZhbGlkYXRlQXJjaGl2ZShhcmNoaXZlOiBBcnJheUJ1ZmZlciwgbWFuaWZlc3Q6IFJlbGVhc2VNYW5pZmVzdCwgcmVsZWFzZTogUmVsZWFzZUVudHJ5KTogUHJvbWlzZTxVcGRhdGVQbGFuPiB7XHJcbiAgICBsZXQgemlwOiBKU1ppcDtcbiAgICB0cnkgeyB6aXAgPSBhd2FpdCBKU1ppcC5sb2FkQXN5bmMoYXJjaGl2ZSwgeyBjcmVhdGVGb2xkZXJzOiBmYWxzZSwgY2hlY2tDUkMzMjogZmFsc2UgfSk7IH1cbiAgICBjYXRjaCB7IHRocm93IG5ldyBFcnJvcihgUmVsZWFzZSBaSVAgaXMgaW5jb21wbGV0ZSBvciBjb3JydXB0ICgke2FyY2hpdmUuYnl0ZUxlbmd0aH0gYnl0ZXMgcmVjZWl2ZWQpLiBSZXRyeSB0aGUgZG93bmxvYWQgb3IgY2hlY2sgdGhlIGNvbmZpZ3VyZWQgc291cmNlLmApOyB9XHJcbiAgICBjb25zdCBleHBlY3RlZCA9IG5ldyBTZXQocmVsZWFzZS5maWxlcy5maWx0ZXIoKGZpbGUpID0+IGZpbGUuY2hhbmdlICE9PSBcIi1cIikubWFwKChmaWxlKSA9PiBmaWxlLnBhdGgpKTtcclxuICAgIGNvbnN0IGFjdHVhbDogc3RyaW5nW10gPSBbXTsgbGV0IHRvdGFsVW5jb21wcmVzc2VkID0gMDtcclxuICAgIGZvciAoY29uc3QgZW50cnkgb2YgT2JqZWN0LnZhbHVlcyh6aXAuZmlsZXMpKSB7XHJcbiAgICAgIGNvbnN0IGVudHJ5TmFtZSA9IGVudHJ5LmRpciA/IGVudHJ5Lm5hbWUucmVwbGFjZSgvXFwvJC8sIFwiXCIpIDogZW50cnkubmFtZTtcclxuICAgICAgaWYgKGVudHJ5TmFtZSAmJiAhKGVudHJ5LmRpciAmJiBlbnRyeU5hbWUgPT09IFwiLm9ic2lkaWFuXCIpKSBhc3NlcnRNYW5hZ2VkUGF0aChlbnRyeU5hbWUpO1xyXG4gICAgICBpZiAoZW50cnkuZGlyKSBjb250aW51ZTtcclxuICAgICAgaWYgKGFjdHVhbC5sZW5ndGggPj0gTUFYX0ZJTEVTKSB0aHJvdyBuZXcgRXJyb3IoXCJSZWxlYXNlIGFyY2hpdmUgaGFzIHRvbyBtYW55IGZpbGVzLlwiKTtcclxuICAgICAgY29uc3QgcGF0aCA9IGFzc2VydE1hbmFnZWRQYXRoKGVudHJ5Lm5hbWUpO1xyXG4gICAgICBhY3R1YWwucHVzaChwYXRoKTtcclxuICAgICAgY29uc3Qgc2l6ZSA9IHppcEVudHJ5U2l6ZShlbnRyeSk7XHJcbiAgICAgIGlmIChzaXplID09PSB1bmRlZmluZWQpIHRocm93IG5ldyBFcnJvcihcIlJlbGVhc2UgYXJjaGl2ZSBoYXMgYW4gZW50cnkgd2l0aCBubyBzaXplIG1ldGFkYXRhLlwiKTtcclxuICAgICAgdG90YWxVbmNvbXByZXNzZWQgKz0gc2l6ZTtcclxuICAgICAgaWYgKHRvdGFsVW5jb21wcmVzc2VkID4gTUFYX1VOQ09NUFJFU1NFRF9CWVRFUykgdGhyb3cgbmV3IEVycm9yKFwiUmVsZWFzZSBhcmNoaXZlIGV4Y2VlZHMgdGhlIGNvbmZpZ3VyZWQgZXh0cmFjdGVkLXNpemUgbGltaXQuXCIpO1xyXG4gICAgfVxyXG4gICAgaWYgKG5ldyBTZXQoYWN0dWFsKS5zaXplICE9PSBhY3R1YWwubGVuZ3RoKSB0aHJvdyBuZXcgRXJyb3IoXCJSZWxlYXNlIGFyY2hpdmUgY29udGFpbnMgY29sbGlkaW5nIHBhdGhzLlwiKTtcclxuICAgIGVuc3VyZU5vUGF0aENvbmZsaWN0cyhhY3R1YWwpO1xyXG4gICAgY29uc3QgYWN0dWFsUGF0aHMgPSBuZXcgU2V0KGFjdHVhbCk7XHJcbiAgICBjb25zdCBtaXNzaW5nID0gWy4uLmV4cGVjdGVkXS5maWx0ZXIoKHBhdGgpID0+ICFhY3R1YWxQYXRocy5oYXMocGF0aCkpO1xyXG4gICAgY29uc3QgdW5leHBlY3RlZCA9IGFjdHVhbC5maWx0ZXIoKHBhdGgpID0+ICFleHBlY3RlZC5oYXMocGF0aCkpO1xyXG4gICAgaWYgKG1pc3NpbmcubGVuZ3RoIHx8IHVuZXhwZWN0ZWQubGVuZ3RoKSB7XHJcbiAgICAgIGNvbnN0IGRlc2NyaWJlID0gKHBhdGhzOiBzdHJpbmdbXSk6IHN0cmluZyA9PiBgJHtwYXRocy5zbGljZSgwLCA1KS5qb2luKFwiLCBcIil9JHtwYXRocy5sZW5ndGggPiA1ID8gYCAoYW5kICR7cGF0aHMubGVuZ3RoIC0gNX0gbW9yZSlgIDogXCJcIn1gO1xyXG4gICAgICBjb25zdCBkZXRhaWxzID0gW21pc3NpbmcubGVuZ3RoID8gYE1pc3NpbmcgZmlsZXM6ICR7ZGVzY3JpYmUobWlzc2luZyl9LmAgOiBcIlwiLCB1bmV4cGVjdGVkLmxlbmd0aCA/IGBVbmV4cGVjdGVkIGZpbGVzOiAke2Rlc2NyaWJlKHVuZXhwZWN0ZWQpfS5gIDogXCJcIl0uZmlsdGVyKEJvb2xlYW4pLmpvaW4oXCIgXCIpO1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFJlbGVhc2UgYXJjaGl2ZSBkb2VzIG5vdCBleGFjdGx5IG1hdGNoIHRoZSBtYW5pZmVzdCBpbnZlbnRvcnkgZm9yICR7cmVsZWFzZS5yZWxlYXNlSWR9ICgke3JlbGVhc2UuZmlsZW5hbWV9KS4gJHtkZXRhaWxzfWApO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHsgbWFuaWZlc3QsIHJlbGVhc2UsIHdyaXRlczogYWN0dWFsLCBkZWxldGlvbnM6IHJlbGVhc2UuZGVsZXRpb25zIH07XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFzeW5jIGFwcGx5KHBsYW46IFVwZGF0ZVBsYW4sIGFyY2hpdmU6IEFycmF5QnVmZmVyLCBwcm9ncmVzczogKG1lc3NhZ2U6IHN0cmluZykgPT4gdm9pZCwgY29uZmlybU92ZXJ3cml0ZTogQ29uZmlybU92ZXJ3cml0ZSk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgY29uc3QgYWRhcHRlciA9IHRoaXMuYXBwLnZhdWx0LmFkYXB0ZXI7XHJcbiAgICBjb25zdCBwcmV2aW91cyA9IHsgLi4udGhpcy5nZXREYXRhKCkuaW5zdGFsbGVkLCBhcHBsaWVkUmVsZWFzZUlkczogWy4uLnRoaXMuaW5zdGFsbGVkUmVsZWFzZUlkcyhwbGFuLm1hbmlmZXN0KV0gfTtcclxuICAgIGNvbnN0IG93bmVkID0gY3VycmVudE93bmVkUGF0aHMocHJldmlvdXMpO1xyXG4gICAgLy8gRWFjaCByZWxlYXNlIGlzIGluY3JlbWVudGFsOiBvbmx5IGV4cGxpY2l0IGRlbGV0aW9ucyBhcmUgcmVtb3ZlZC4gRWFybGllclxyXG4gICAgLy8gcmVsZWFzZXMgcmVtYWluIGluc3RhbGxlZCBhZnRlciB0aGVpciBaSVAgaGFzIGNvbW1pdHRlZCBzdWNjZXNzZnVsbHkuXHJcbiAgICAvLyBCdW5kbGVkIGRhdGEuanNvbiBmaWxlcyBhcmUgZGVmYXVsdHM7IGV4aXN0aW5nIHZhdWx0IGRhdGEgYWx3YXlzIHdpbnMuXG4gICAgY29uc3QgcHJlc2VydmVkID0gbmV3IFNldDxzdHJpbmc+KCk7XG4gICAgZm9yIChjb25zdCBwYXRoIG9mIFsuLi5wbGFuLndyaXRlcywgLi4ucGxhbi5kZWxldGlvbnNdKSB7XG4gICAgICBpZiAocGF0aC5zcGxpdChcIi9cIikuYXQoLTEpPy50b0xvd2VyQ2FzZSgpID09PSBcImRhdGEuanNvblwiICYmIGF3YWl0IGFkYXB0ZXIuZXhpc3RzKHBhdGgpKSB7XG4gICAgICAgIHByZXNlcnZlZC5hZGQocGF0aCk7XG4gICAgICAgIHByb2dyZXNzKGBQcmVzZXJ2aW5nIGV4aXN0aW5nICR7cGF0aH1gKTtcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3Qgd3JpdGVzID0gcGxhbi53cml0ZXMuZmlsdGVyKChwYXRoKSA9PiAhcHJlc2VydmVkLmhhcyhwYXRoKSk7XG4gICAgY29uc3QgZGVsZXRpb25DYW5kaWRhdGVzID0gWy4uLm5ldyBTZXQocGxhbi5kZWxldGlvbnMpXS5maWx0ZXIoKHBhdGgpID0+ICFwcmVzZXJ2ZWQuaGFzKHBhdGgpKTtcbiAgICBjb25zdCBkZWxldGlvbnM6IHN0cmluZ1tdID0gW107XHJcbiAgICBmb3IgKGNvbnN0IHBhdGggb2Ygd3JpdGVzKSB7XHJcbiAgICAgIGF3YWl0IGFzc2VydE5vUmVwYXJzZVBvaW50cyh0aGlzLmFwcCwgcGF0aCk7XHJcbiAgICAgIGlmIChhd2FpdCBhZGFwdGVyLmV4aXN0cyhwYXRoKSkge1xyXG4gICAgICAgIGlmICgoYXdhaXQgYWRhcHRlci5zdGF0KHBhdGgpKT8udHlwZSA9PT0gXCJmb2xkZXJcIikgdGhyb3cgbmV3IEVycm9yKGBSZWZ1c2luZyB0byByZXBsYWNlIGEgbG9jYWwgZm9sZGVyOiAke3BhdGh9YCk7XHJcbiAgICAgICAgaWYgKCFvd25lZC5oYXMocGF0aCkpIHtcclxuICAgICAgICAgIHByb2dyZXNzKGBXYWl0aW5nIGZvciBvdmVyd3JpdGUgYXBwcm92YWw6ICR7cGF0aH1gKTtcclxuICAgICAgICAgIGlmIChhd2FpdCBjb25maXJtT3ZlcndyaXRlKHBhdGgpID09PSBcImNhbmNlbFwiKSB0aHJvdyBuZXcgRXJyb3IoXCJVcGRhdGUgY2FuY2VsbGVkLiBObyBmaWxlcyBpbiB0aGlzIHJlbGVhc2Ugd2VyZSBjaGFuZ2VkOyBlYXJsaWVyIGNvbXBsZXRlZCByZWxlYXNlcyByZW1haW4gaW5zdGFsbGVkLlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGZvciAoY29uc3QgcGF0aCBvZiBkZWxldGlvbkNhbmRpZGF0ZXMpIHtcclxuICAgICAgYXdhaXQgYXNzZXJ0Tm9SZXBhcnNlUG9pbnRzKHRoaXMuYXBwLCBwYXRoKTtcclxuICAgICAgY29uc3QgbWFuYWdlZFBhdGggPSBhc3NlcnRNYW5hZ2VkUGF0aChwYXRoKTtcclxuICAgICAgY29uc3QgZXhpc3RzID0gYXdhaXQgYWRhcHRlci5leGlzdHMobWFuYWdlZFBhdGgpO1xyXG4gICAgICBpZiAoIWV4aXN0cykge1xuICAgICAgICBwcm9ncmVzcyhgSW5mb3JtYXRpb246IHNraXBwaW5nIGRlbGV0aW9uOyBmaWxlIGlzIGFscmVhZHkgYWJzZW50OiAke21hbmFnZWRQYXRofWApO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICgoYXdhaXQgYWRhcHRlci5zdGF0KG1hbmFnZWRQYXRoKSk/LnR5cGUgPT09IFwiZm9sZGVyXCIpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFJlZnVzaW5nIHRvIGRlbGV0ZSBhIGxvY2FsIGZvbGRlcjogJHttYW5hZ2VkUGF0aH1gKTtcclxuICAgICAgfVxyXG4gICAgICAvLyBFeHBsaWNpdCBkZWxldGlvbnMgYWxzbyBjb3ZlciBjb2xsZWN0aW9uIG5vdGVzIHByZWRhdGluZyBvd25lcnNoaXAgdHJhY2tpbmcuXHJcbiAgICAgIGNvbnN0IGlzVW50cmFja2VkQ29sbGVjdGlvbk5vdGUgPSBleGlzdHMgJiYgbWFuYWdlZFBhdGgudG9Mb3dlckNhc2UoKS5lbmRzV2l0aChcIi5tZFwiKVxyXG4gICAgICAgICYmIChNQU5BR0VEX1JPT1RTIGFzIHJlYWRvbmx5IHN0cmluZ1tdKS5pbmNsdWRlcyhtYW5hZ2VkUGF0aC5zcGxpdChcIi9cIilbMF0pO1xyXG4gICAgICBpZiAoIW93bmVkLmhhcyhwYXRoKSAmJiAhaXNVbnRyYWNrZWRDb2xsZWN0aW9uTm90ZSkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgUmVmdXNpbmcgdG8gZGVsZXRlIGEgZmlsZSBub3Qgb3duZWQgYnkgdGhlIHByaW9yIHJlbGVhc2U6ICR7cGF0aH1gKTtcclxuICAgICAgfVxyXG4gICAgICBkZWxldGlvbnMucHVzaChtYW5hZ2VkUGF0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdHJhbnNhY3Rpb25EaXIgPSBgJHtTVEFHSU5HX0RJUn0vJHtjcnlwdG8ucmFuZG9tVVVJRCgpfWA7XHJcbiAgICBjb25zdCBiYWNrdXBEaXIgPSBgJHt0cmFuc2FjdGlvbkRpcn0vYmFja3VwYDtcclxuICAgIGNvbnN0IGpvdXJuYWxQYXRoID0gYCR7dHJhbnNhY3Rpb25EaXJ9L3RyYW5zYWN0aW9uLmpzb25gO1xyXG4gICAgYXdhaXQgbWtkaXJwKGFkYXB0ZXIsIGJhY2t1cERpcik7XHJcbiAgICBjb25zdCB0YXJnZXRzID0gWy4uLm5ldyBTZXQoWy4uLndyaXRlcywgLi4uZGVsZXRpb25zXSldO1xyXG4gICAgY29uc3Qgb3JpZ2luYWxzOiBBcnJheTx7IHBhdGg6IHN0cmluZzsgZXhpc3RlZDogYm9vbGVhbiB9PiA9IFtdO1xyXG4gICAgZm9yIChjb25zdCBwYXRoIG9mIHRhcmdldHMpIHtcclxuICAgICAgY29uc3QgZXhpc3RlZCA9IGF3YWl0IGFkYXB0ZXIuZXhpc3RzKHBhdGgpOyBvcmlnaW5hbHMucHVzaCh7IHBhdGgsIGV4aXN0ZWQgfSk7XHJcbiAgICAgIGlmIChleGlzdGVkKSBhd2FpdCB3cml0ZUJpbmFyeShhZGFwdGVyLCBgJHtiYWNrdXBEaXJ9LyR7ZW5jb2RlVVJJQ29tcG9uZW50KHBhdGgpfWAsIGF3YWl0IGFkYXB0ZXIucmVhZEJpbmFyeShwYXRoKSk7XHJcbiAgICB9XHJcbiAgICBhd2FpdCBhZGFwdGVyLndyaXRlKGpvdXJuYWxQYXRoLCBKU09OLnN0cmluZ2lmeSh7IG9yaWdpbmFscyB9KSk7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgemlwID0gYXdhaXQgSlNaaXAubG9hZEFzeW5jKGFyY2hpdmUsIHsgY3JlYXRlRm9sZGVyczogZmFsc2UsIGNoZWNrQ1JDMzI6IGZhbHNlIH0pO1xuICAgICAgZm9yIChjb25zdCBwYXRoIG9mIGRlbGV0aW9ucykgaWYgKGF3YWl0IGFkYXB0ZXIuZXhpc3RzKHBhdGgpKSBhd2FpdCBhZGFwdGVyLnJlbW92ZShwYXRoKTtcclxuICAgICAgZm9yIChjb25zdCBwYXRoIG9mIHdyaXRlcykge1xyXG4gICAgICAgIHByb2dyZXNzKGBXcml0aW5nICR7cGF0aH1cdTIwMjZgKTtcclxuICAgICAgICBhd2FpdCBta2RpcnAoYWRhcHRlciwgcGFyZW50KHBhdGgpKTtcclxuICAgICAgICBjb25zdCBlbnRyeSA9IHppcC5maWxlKHBhdGgpO1xyXG4gICAgICAgIGlmICghZW50cnkpIHRocm93IG5ldyBFcnJvcihgQXJjaGl2ZSBlbnRyeSBkaXNhcHBlYXJlZDogJHtwYXRofWApO1xyXG4gICAgICAgIGF3YWl0IHdyaXRlQmluYXJ5KGFkYXB0ZXIsIHBhdGgsIGF3YWl0IGVudHJ5LmFzeW5jKFwidWludDhhcnJheVwiKSk7XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgbmV4dE93bmVkID0geyAuLi5wcmV2aW91cy5vd25lZEZpbGVzLCBbcGxhbi5yZWxlYXNlLnJlbGVhc2VJZF06IHBsYW4ucmVsZWFzZS5maWxlcy5maWx0ZXIoKGZpbGUpID0+ICFwcmVzZXJ2ZWQuaGFzKGZpbGUucGF0aCkpLm1hcCgoZmlsZSkgPT4gKHsgLi4uZmlsZSB9KSkgfTtcclxuICAgICAgYXdhaXQgdGhpcy5zYXZlRGF0YSh7IC4uLnRoaXMuZ2V0RGF0YSgpLCBpbnN0YWxsZWQ6IHtcclxuICAgICAgICB0cmFja2luZ1ZlcnNpb246IDIsXHJcbiAgICAgICAgcmVsZWFzZVZlcnNpb246IHBsYW4ucmVsZWFzZS5yZWxlYXNlVmVyc2lvbixcclxuICAgICAgICByZWxlYXNlSWQ6IHBsYW4ucmVsZWFzZS5yZWxlYXNlSWQsXHJcbiAgICAgICAgYXBwbGllZFJlbGVhc2VJZHM6IFsuLi5uZXcgU2V0KFsuLi4ocHJldmlvdXMuYXBwbGllZFJlbGVhc2VJZHMgPz8gW10pLCBwbGFuLnJlbGVhc2UucmVsZWFzZUlkXSldLFxyXG4gICAgICAgIG93bmVkRmlsZXM6IG5leHRPd25lZCxcclxuICAgICAgfSB9KTtcclxuICAgICAgYXdhaXQgcmVtb3ZlVHJlZShhZGFwdGVyLCB0cmFuc2FjdGlvbkRpcik7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBhd2FpdCB0aGlzLnJvbGxiYWNrKGFkYXB0ZXIsIG9yaWdpbmFscywgYmFja3VwRGlyKTtcclxuICAgICAgdGhyb3cgZXJyb3I7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFzeW5jIHJvbGxiYWNrKGFkYXB0ZXI6IERhdGFBZGFwdGVyLCBvcmlnaW5hbHM6IEFycmF5PHsgcGF0aDogc3RyaW5nOyBleGlzdGVkOiBib29sZWFuIH0+LCBiYWNrdXBEaXI6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgZm9yIChjb25zdCBvcmlnaW5hbCBvZiBvcmlnaW5hbHMucmV2ZXJzZSgpKSB7XHJcbiAgICAgIGlmIChvcmlnaW5hbC5leGlzdGVkKSBhd2FpdCB3cml0ZUJpbmFyeShhZGFwdGVyLCBvcmlnaW5hbC5wYXRoLCBhd2FpdCBhZGFwdGVyLnJlYWRCaW5hcnkoYCR7YmFja3VwRGlyfS8ke2VuY29kZVVSSUNvbXBvbmVudChvcmlnaW5hbC5wYXRoKX1gKSk7XHJcbiAgICAgIGVsc2UgaWYgKGF3YWl0IGFkYXB0ZXIuZXhpc3RzKG9yaWdpbmFsLnBhdGgpKSBhd2FpdCBhZGFwdGVyLnJlbW92ZShvcmlnaW5hbC5wYXRoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXN5bmMgcmVwb3J0KHRyYW5zYWN0aW9uOiBVcGRhdGVUcmFuc2FjdGlvbiwgc3RhdHVzOiBcInN1Y2Nlc3NcIiB8IFwiZmFpbGVkXCIpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIGF3YWl0IHRoaXMuYXBpKGAvdXBkYXRlcy90cmFuc2FjdGlvbnMvJHtlbmNvZGVVUklDb21wb25lbnQodHJhbnNhY3Rpb24uaWQpfS9yZXN1bHRgLCBcIlBPU1RcIiwgeyBzdGF0dXMgfSwgdHJhbnNhY3Rpb24pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhc3luYyBhcGkocGF0aDogc3RyaW5nLCBtZXRob2Q6IFwiR0VUXCIgfCBcIlBPU1RcIiwgYm9keT86IG9iamVjdCwgdHJhbnNhY3Rpb24/OiBVcGRhdGVUcmFuc2FjdGlvbik6IFByb21pc2U8UmVjb3JkPHN0cmluZywgdW5rbm93bj4+IHtcclxuICAgIGlmIChQbGF0Zm9ybT8uaXNNb2JpbGUpIHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgd2l0aE1hbmlmZXN0VGltZW91dChQcm9taXNlLnJlc29sdmUocmVxdWVzdFVybCh7IHVybDogYCR7V09SS0VSX1VSTH0ke3BhdGh9YCwgbWV0aG9kLFxuICAgICAgICBoZWFkZXJzOiB7IC4uLihib2R5ID8geyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9IDoge30pLCAuLi4odHJhbnNhY3Rpb24gPyBhdXRoSGVhZGVycyh0cmFuc2FjdGlvbikgOiB7fSkgfSxcbiAgICAgICAgYm9keTogYm9keSA/IEpTT04uc3RyaW5naWZ5KGJvZHkpIDogdW5kZWZpbmVkLCB0aHJvdzogZmFsc2UgfSkpKTtcbiAgICAgIGxldCBqc29uOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPjtcbiAgICAgIHRyeSB7IGpzb24gPSByZXNwb25zZS5qc29uIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+OyB9IGNhdGNoIHsgdGhyb3cgbmV3IEVycm9yKGBVcGRhdGUgc2VydmljZSByZXR1cm5lZCBpbnZhbGlkIEpTT04gZm9yICR7cGF0aH0uYCk7IH1cbiAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPCAyMDAgfHwgcmVzcG9uc2Uuc3RhdHVzID49IDMwMCkgdGhyb3cgbmV3IEVycm9yKHR5cGVvZiBqc29uLmVycm9yID09PSBcInN0cmluZ1wiID8ganNvbi5lcnJvciA6IGBVcGRhdGUgc2VydmljZSByZXF1ZXN0IGZhaWxlZCAoSFRUUCAke3Jlc3BvbnNlLnN0YXR1c30pLmApO1xuICAgICAgcmV0dXJuIGpzb247XG4gICAgfVxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYCR7V09SS0VSX1VSTH0ke3BhdGh9YCwgeyBtZXRob2QsIGhlYWRlcnM6IHsgLi4uKGJvZHkgPyB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0gOiB7fSksIC4uLih0cmFuc2FjdGlvbiA/IGF1dGhIZWFkZXJzKHRyYW5zYWN0aW9uKSA6IHt9KSB9LCBib2R5OiBib2R5ID8gSlNPTi5zdHJpbmdpZnkoYm9keSkgOiB1bmRlZmluZWQgfSk7XHJcbiAgICBjb25zdCBqc29uID0gYXdhaXQgcmVzcG9uc2UuanNvbigpLmNhdGNoKCgpID0+ICh7fSkpO1xyXG4gICAgaWYgKCFyZXNwb25zZS5vaykgdGhyb3cgbmV3IEVycm9yKHR5cGVvZiBqc29uLmVycm9yID09PSBcInN0cmluZ1wiID8ganNvbi5lcnJvciA6IGBVcGRhdGUgc2VydmljZSByZXF1ZXN0IGZhaWxlZCAoSFRUUCAke3Jlc3BvbnNlLnN0YXR1c30pLmApO1xyXG4gICAgcmV0dXJuIGpzb24gYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj47XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFwcFZlcnNpb24oKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcclxuICAgIGNvbnN0IGFwcCA9IHRoaXMuYXBwIGFzIHVua25vd24gYXMgeyB2ZXJzaW9uPzogdW5rbm93bjsgYXBwVmVyc2lvbj86IHVua25vd247IHZhdWx0OiB7IGdldENvbmZpZz86IChrZXk6IHN0cmluZykgPT4gdW5rbm93biB9IH07XHJcbiAgICBjb25zdCBnbG9iYWxBcHAgPSAoZ2xvYmFsVGhpcyBhcyB1bmtub3duIGFzIHsgYXBwPzogeyB2ZXJzaW9uPzogdW5rbm93bjsgYXBwVmVyc2lvbj86IHVua25vd24gfSB9KS5hcHA7XHJcbiAgICBjb25zdCBjYW5kaWRhdGVzID0gW2FwcC52ZXJzaW9uLCBhcHAuYXBwVmVyc2lvbiwgZ2xvYmFsQXBwPy52ZXJzaW9uLCBnbG9iYWxBcHA/LmFwcFZlcnNpb24sIGFwcC52YXVsdC5nZXRDb25maWc/LihcImFwcFZlcnNpb25cIildO1xyXG4gICAgcmV0dXJuIGNhbmRpZGF0ZXMuZmluZCgodmFsdWUpOiB2YWx1ZSBpcyBzdHJpbmcgPT4gdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiICYmIC9eXFxkK1xcLlxcZCtcXC5cXGQrLy50ZXN0KHZhbHVlKSk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBhdXRoSGVhZGVycyh0cmFuc2FjdGlvbjogVXBkYXRlVHJhbnNhY3Rpb24pOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+IHsgcmV0dXJuIHsgXCJYLVVwZGF0ZS1UcmFuc2FjdGlvblwiOiB0cmFuc2FjdGlvbi5pZCwgXCJBdXRob3JpemF0aW9uXCI6IGBCZWFyZXIgJHt0cmFuc2FjdGlvbi50b2tlbn1gIH07IH1cclxuZnVuY3Rpb24gaXNTb3VyY2UodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBTb3VyY2UgeyByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiAodmFsdWUgYXMgU291cmNlKS5zb3VyY2VJZCA9PT0gXCJzdHJpbmdcIiAmJiB0eXBlb2YgKHZhbHVlIGFzIFNvdXJjZSkubmFtZSA9PT0gXCJzdHJpbmdcIiAmJiB0eXBlb2YgKHZhbHVlIGFzIFNvdXJjZSkucHJpb3JpdHkgPT09IFwibnVtYmVyXCIgJiYgdHlwZW9mICh2YWx1ZSBhcyBTb3VyY2UpLnN1cHBvcnRzUmFuZ2UgPT09IFwiYm9vbGVhblwiOyB9XHJcbmZ1bmN0aW9uIHNjb3JlKHNvdXJjZTogU291cmNlLCBwcm9iZTogUHJvYmVSZXN1bHQpOiBudW1iZXIgeyByZXR1cm4gKHByb2JlLmxhdGVuY3lNcyA/PyA2MF8wMDApICsgc291cmNlLnByaW9yaXR5ICogMjUgLSAocHJvYmUuYnl0ZXMgPz8gMCkgLyA0MDk2OyB9XHJcbmZ1bmN0aW9uIGFzTnVtYmVyKHZhbHVlOiB1bmtub3duKTogbnVtYmVyIHwgdW5kZWZpbmVkIHsgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIiAmJiBOdW1iZXIuaXNGaW5pdGUodmFsdWUpID8gdmFsdWUgOiB1bmRlZmluZWQ7IH1cclxuZnVuY3Rpb24gYXNTdHJpbmcodmFsdWU6IHVua25vd24pOiBzdHJpbmcgfCB1bmRlZmluZWQgeyByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiID8gdmFsdWUgOiB1bmRlZmluZWQ7IH1cclxuZnVuY3Rpb24gemlwRW50cnlTaXplKGVudHJ5OiBKU1ppcC5KU1ppcE9iamVjdCk6IG51bWJlciB8IHVuZGVmaW5lZCB7XHJcbiAgY29uc3Qgc2l6ZSA9IChlbnRyeSBhcyB1bmtub3duIGFzIHsgX2RhdGE/OiB7IHVuY29tcHJlc3NlZFNpemU/OiB1bmtub3duIH0gfSkuX2RhdGE/LnVuY29tcHJlc3NlZFNpemU7XHJcbiAgcmV0dXJuIHR5cGVvZiBzaXplID09PSBcIm51bWJlclwiICYmIE51bWJlci5pc1NhZmVJbnRlZ2VyKHNpemUpICYmIHNpemUgPj0gMCA/IHNpemUgOiB1bmRlZmluZWQ7XHJcbn1cclxuZnVuY3Rpb24gcGFyZW50KHBhdGg6IHN0cmluZyk6IHN0cmluZyB7IGNvbnN0IGluZGV4ID0gcGF0aC5sYXN0SW5kZXhPZihcIi9cIik7IHJldHVybiBpbmRleCA9PT0gLTEgPyBcIlwiIDogcGF0aC5zbGljZSgwLCBpbmRleCk7IH1cclxuYXN5bmMgZnVuY3Rpb24gbWtkaXJwKGFkYXB0ZXI6IERhdGFBZGFwdGVyLCBwYXRoOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcclxuICBpZiAoIXBhdGgpIHJldHVybjtcclxuICBsZXQgY3VycmVudCA9IFwiXCI7XHJcbiAgZm9yIChjb25zdCBzZWdtZW50IG9mIHBhdGguc3BsaXQoXCIvXCIpKSB7XHJcbiAgICBjdXJyZW50ID0gY3VycmVudCA/IGAke2N1cnJlbnR9LyR7c2VnbWVudH1gIDogc2VnbWVudDtcclxuICAgIGlmICghKGF3YWl0IGFkYXB0ZXIuZXhpc3RzKGN1cnJlbnQpKSkgYXdhaXQgYWRhcHRlci5ta2RpcihjdXJyZW50KTtcclxuICB9XHJcbn1cclxuYXN5bmMgZnVuY3Rpb24gd3JpdGVCaW5hcnkoYWRhcHRlcjogRGF0YUFkYXB0ZXIsIHBhdGg6IHN0cmluZywgZGF0YTogQXJyYXlCdWZmZXIgfCBVaW50OEFycmF5KTogUHJvbWlzZTx2b2lkPiB7IGNvbnN0IGNvcHkgPSBuZXcgVWludDhBcnJheShkYXRhIGluc3RhbmNlb2YgVWludDhBcnJheSA/IGRhdGEgOiBuZXcgVWludDhBcnJheShkYXRhKSk7IGF3YWl0IG1rZGlycChhZGFwdGVyLCBwYXJlbnQocGF0aCkpOyBhd2FpdCBhZGFwdGVyLndyaXRlQmluYXJ5KHBhdGgsIGNvcHkuYnVmZmVyKTsgfVxyXG5hc3luYyBmdW5jdGlvbiByZW1vdmVUcmVlKGFkYXB0ZXI6IERhdGFBZGFwdGVyLCBwYXRoOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHsgaWYgKGF3YWl0IGFkYXB0ZXIuZXhpc3RzKHBhdGgpKSBhd2FpdCBhZGFwdGVyLnJtZGlyKHBhdGgsIHRydWUpOyB9XHJcbmFzeW5jIGZ1bmN0aW9uIGFzc2VydE5vUmVwYXJzZVBvaW50cyhhcHA6IEFwcCwgdmF1bHRQYXRoOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcclxuICBjb25zdCBiYXNlUGF0aCA9IChhcHAudmF1bHQuYWRhcHRlciBhcyB1bmtub3duIGFzIHsgZ2V0QmFzZVBhdGg/OiAoKSA9PiBzdHJpbmcgfSkuZ2V0QmFzZVBhdGg/LigpO1xyXG4gIGNvbnN0IHJlcXVpcmVGbiA9IChnbG9iYWxUaGlzIGFzIHVua25vd24gYXMgeyByZXF1aXJlPzogKG5hbWU6IHN0cmluZykgPT4geyBsc3RhdDogKHBhdGg6IHN0cmluZykgPT4gUHJvbWlzZTx7IGlzU3ltYm9saWNMaW5rOiAoKSA9PiBib29sZWFuIH0+IH0gfSkucmVxdWlyZTtcclxuICBpZiAoIWJhc2VQYXRoIHx8ICFyZXF1aXJlRm4pIHJldHVybjtcclxuICBjb25zdCBmcyA9IHJlcXVpcmVGbihcImZzL3Byb21pc2VzXCIpO1xyXG4gIGxldCBjdXJyZW50ID0gYmFzZVBhdGg7XHJcbiAgZm9yIChjb25zdCBzZWdtZW50IG9mIHZhdWx0UGF0aC5zcGxpdChcIi9cIikpIHtcclxuICAgIGN1cnJlbnQgPSBgJHtjdXJyZW50fS8ke3NlZ21lbnR9YDtcclxuICAgIHRyeSB7XHJcbiAgICAgIGlmICgoYXdhaXQgZnMubHN0YXQoY3VycmVudCkpLmlzU3ltYm9saWNMaW5rKCkpIHRocm93IG5ldyBFcnJvcihgUmVmdXNpbmcgdG8gdHJhdmVyc2UgYSBsaW5rIG9yIHJlcGFyc2UgcG9pbnQ6ICR7dmF1bHRQYXRofWApO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgaWYgKChlcnJvciBhcyB7IGNvZGU/OiBzdHJpbmcgfSkuY29kZSAhPT0gXCJFTk9FTlRcIikgdGhyb3cgZXJyb3I7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxuYXN5bmMgZnVuY3Rpb24gd2l0aE1hbmlmZXN0VGltZW91dDxUPihyZXF1ZXN0OiBQcm9taXNlPFQ+KTogUHJvbWlzZTxUPiB7XG4gIGxldCB0aW1lcjogUmV0dXJuVHlwZTx0eXBlb2Ygc2V0VGltZW91dD4gfCB1bmRlZmluZWQ7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGF3YWl0IFByb21pc2UucmFjZShbcmVxdWVzdCwgbmV3IFByb21pc2U8bmV2ZXI+KChfLCByZWplY3QpID0+IHtcbiAgICAgIHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiByZWplY3QobmV3IEVycm9yKFwiR2l0SHViIHJlbGVhc2UgcmVxdWVzdCB0aW1lZCBvdXQuIENoZWNrIHlvdXIgY29ubmVjdGlvbiBhbmQgdGFwIFJlZnJlc2ggdG8gcmV0cnkuXCIpKSwgMTJfMDAwKTtcbiAgICB9KV0pO1xuICB9IGZpbmFsbHkgeyBpZiAodGltZXIgIT09IHVuZGVmaW5lZCkgY2xlYXJUaW1lb3V0KHRpbWVyKTsgfVxufSIsICJleHBvcnQgY29uc3QgTUFOSUZFU1RfQkFTRV9VUkwgPSBcImh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS90YnNwZWRpYS90YnBlZGlhLXVwZGF0ZS9tYWluL21hbmlmZXN0c1wiO1xyXG5leHBvcnQgY29uc3QgV09SS0VSX1VSTCA9IFwiaHR0cHM6Ly9jZnVwZGF0ZS50YnBlZGlhLm9yZ1wiO1xyXG5cclxuZXhwb3J0IGNvbnN0IFNVUFBPUlRFRF9MQU5HVUFHRVMgPSBbXCJlblwiLCBcImphXCIsIFwiZnJcIiwgXCJlc1wiLCBcImRlXCIsIFwibmxcIiwgXCJzdlwiLCBcImtvXCIsIFwiemgtVFdcIiwgXCJ6aC1DTlwiLCBcInZpXCIsIFwiaWRcIiwgXCJ0aFwiLCBcImJvXCJdIGFzIGNvbnN0O1xyXG5leHBvcnQgdHlwZSBTdXBwb3J0ZWRMYW5ndWFnZSA9IHR5cGVvZiBTVVBQT1JURURfTEFOR1VBR0VTW251bWJlcl07XHJcblxyXG5leHBvcnQgY29uc3QgTUFOQUdFRF9ST09UUyA9IFtcclxuICBcIjAwIFx1OEFBQVx1NjYwRVwiLCBcIjAxIFx1NjU4N1x1OTZDNlx1OTBFOFwiLCBcIjAyIFx1OTU4Qlx1NzkzQVx1OTBFOFwiLCBcIjAzIFx1N0Q5M1x1ODVDRlx1OTBFOFwiLCBcIjA0IFx1OTgwQ1x1ODIwN1x1NjIxMlx1NUY4QlwiLFxyXG4gIFwiMDUgXHU1MEIzXHU2Q0Q1XHU5MEU4XCIsIFwiMDYgXHU1QkM2XHU2Q0Q1XHU1MTAwXHU4RUNDXCIsIFwiMDcgXHU0RjVCXHU4QTlFXHU1MTc4XHU4NUNGXCIsIFwiMDggXHU1MTc2XHU0RUQ2XHU5ODVFXHU1MjI1XCIsIFwiMDkgXHU4NEVFXHU5OTk5XHU0RTBBXHU1RTJCXCIsXHJcbiAgXCIxMCBcdTc3MUZcdTRGNUJcdTVCOTdcIiwgXCIyMCBcdTVDMDhcdTk4NENcIiwgXCI1MCBcdTUyMTdcdTg4NjhcIiwgXCI2MCBcdTVDMEVcdThCODBcIiwgXCI3MCBcdTgwQ0NcdTY2NkZcdThDQzdcdTY1OTlcIiwgXCI5MCBcdTVFNkJcdTUyQTlcIixcclxuICBcIjk4IFx1NEUwQlx1OEYwOVx1OENDN1x1NjU5OVwiLCBcIjk5IFNldHRpbmdcIlxyXG5dIGFzIGNvbnN0O1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBGaWxlQ2hhbmdlIHsgcGF0aDogc3RyaW5nOyBjaGFuZ2U6IFwiK1wiIHwgXCItXCIgfCBcIn5cIjsgfVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBSZWxlYXNlRW50cnkge1xyXG4gIHJlbGVhc2VWZXJzaW9uOiBzdHJpbmc7XHJcbiAgcmVsZWFzZUlkOiBzdHJpbmc7XHJcbiAgcHVibGlzaGVkQXQ6IHN0cmluZztcclxuICBmaWxlbmFtZTogc3RyaW5nO1xyXG4gIGRlcGVuZHNPbj86IHN0cmluZ1tdO1xyXG4gIGZpbGVzOiBGaWxlQ2hhbmdlW107XHJcbiAgZGVsZXRpb25zOiBzdHJpbmdbXTtcclxuICByZWxlYXNlTm90ZXM6IHsgc3VtbWFyeTogc3RyaW5nOyBhZGRlZDogbnVtYmVyOyB1cGRhdGVkOiBudW1iZXI7IHJlbW92ZWQ6IG51bWJlciB9O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFJlbGVhc2VNYW5pZmVzdCB7XHJcbiAgc2NoZW1hVmVyc2lvbjogMjtcclxuICBwcm9kdWN0OiBcIlRicGVkaWEtRGlzdHJpYnV0ZVwiO1xyXG4gIHBsdWdpbjogXCJ0YnBlZGlhLXVwZGF0ZVwiO1xyXG4gIGNoYW5uZWw6IFwic3RhYmxlXCI7XHJcbiAgdGl0bGU6IHN0cmluZztcclxuICB0YnBlZGlhOiB7XHJcbiAgICBsYW5ndWFnZTogeyBjb2RlOiBzdHJpbmcgfTtcclxuICAgIHNlcmllczogeyBpZDogc3RyaW5nIH07XHJcbiAgICBlZGl0aW9uOiB7IGlkOiBzdHJpbmcgfTtcclxuICB9O1xyXG4gIG1pbmltdW1QbHVnaW5WZXJzaW9uOiBzdHJpbmc7XHJcbiAgQ29sbGVjdGlvbjogc3RyaW5nO1xyXG4gIG1pbmltdW1PYnNpZGlhblZlcnNpb246IHN0cmluZztcclxuICBtYW5hZ2VkUm9vdHM6IHN0cmluZ1tdO1xyXG4gIHJlbGVhc2VzOiBSZWxlYXNlRW50cnlbXTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJbnN0YWxsZWRTdGF0ZSB7XHJcbiAgdHJhY2tpbmdWZXJzaW9uPzogMjtcclxuICByZWxlYXNlVmVyc2lvbj86IHN0cmluZztcclxuICByZWxlYXNlSWQ/OiBzdHJpbmc7XHJcbiAgYXBwbGllZFJlbGVhc2VJZHM6IHN0cmluZ1tdO1xyXG4gIG93bmVkRmlsZXM6IFJlY29yZDxzdHJpbmcsIEZpbGVDaGFuZ2VbXT47XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUGx1Z2luRGF0YSB7XG4gIHRpdGxlPzogc3RyaW5nO1xyXG4gIGNoZWNrRm9yVXBkYXRlc09uU3RhcnR1cDogYm9vbGVhbjtcclxuICBsYW5ndWFnZUNvZGU/OiBTdXBwb3J0ZWRMYW5ndWFnZSB8IFwiXCI7XHJcbiAgaW50ZXJmYWNlTGFuZ3VhZ2U/OiBTdXBwb3J0ZWRMYW5ndWFnZTtcclxuICBub3RpZmllZFJlbGVhc2VJZHM/OiBzdHJpbmdbXTtcclxuICBzZXJpZXNJZDogc3RyaW5nO1xyXG4gIGVkaXRpb25JZDogc3RyaW5nO1xyXG4gIHRicGVkaWE6IHN0cmluZztcclxuICBpbnN0YWxsZWQ6IEluc3RhbGxlZFN0YXRlO1xyXG4gIGJhc2VSZWxlYXNlPzogeyByZWxlYXNlVmVyc2lvbj86IHN0cmluZzsgcmVsZWFzZUlkPzogc3RyaW5nIH07XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgU291cmNlIHtcclxuICBzb3VyY2VJZDogc3RyaW5nO1xyXG4gIG5hbWU6IHN0cmluZztcclxuICByZWdpb24/OiBzdHJpbmc7XHJcbiAgcHJpb3JpdHk6IG51bWJlcjtcclxuICBzdXBwb3J0c1JhbmdlOiBib29sZWFuO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFVwZGF0ZVRyYW5zYWN0aW9uIHtcclxuICBpZDogc3RyaW5nO1xyXG4gIHRva2VuOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUHJvYmVSZXN1bHQge1xyXG4gIHNvdXJjZUlkOiBzdHJpbmc7XHJcbiAgaGVhbHRoeTogYm9vbGVhbjtcclxuICBsYXRlbmN5TXM/OiBudW1iZXI7XHJcbiAgYnl0ZXM/OiBudW1iZXI7XHJcbiAgZXJyb3I/OiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVXBkYXRlUGxhbiB7XHJcbiAgbWFuaWZlc3Q6IFJlbGVhc2VNYW5pZmVzdDtcclxuICByZWxlYXNlOiBSZWxlYXNlRW50cnk7XHJcbiAgd3JpdGVzOiBzdHJpbmdbXTtcclxuICBkZWxldGlvbnM6IHN0cmluZ1tdO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFVwZGF0ZUJhdGNoIHtcclxuICBtYW5pZmVzdDogUmVsZWFzZU1hbmlmZXN0O1xyXG4gIHJlbGVhc2VzOiBSZWxlYXNlRW50cnlbXTtcclxufVxyXG4iLCAiaW1wb3J0IHsgTUFOQUdFRF9ST09UUyB9IGZyb20gXCIuL3R5cGVzXCI7XHJcblxyXG5jb25zdCBSRVNFUlZFRCA9IC9eKGNvbnxwcm58YXV4fG51bHxjb21bMS05XXxscHRbMS05XSkoXFwuLiopPyQvaTtcclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplUGF0aCh2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcclxuICByZXR1cm4gdmFsdWUubm9ybWFsaXplKFwiTkZDXCIpLnJlcGxhY2UoL1xcXFwvZywgXCIvXCIpLnJlcGxhY2UoL1xcLysvZywgXCIvXCIpLnJlcGxhY2UoL15cXC5cXC8vLCBcIlwiKTtcclxufVxyXG5cclxuLyoqIFBhdGhzIGFyZSBhbHdheXMgcmVsYXRpdmUgdG8gdGhlIGN1cnJlbnQgdmF1bHQgcm9vdC4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGFzc2VydE1hbmFnZWRQYXRoKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gIGNvbnN0IHBhdGggPSBub3JtYWxpemVQYXRoKHZhbHVlKTtcclxuICBpZiAoIXBhdGggfHwgcGF0aC5pbmNsdWRlcyhcIlxcMFwiKSB8fCBwYXRoLnN0YXJ0c1dpdGgoXCIvXCIpIHx8IC9eW0EtWmEtel06Ly50ZXN0KHBhdGgpKSB0aHJvdyBuZXcgRXJyb3IoYFVuc2FmZSBwYXRoOiAke3ZhbHVlfWApO1xyXG4gIGNvbnN0IHNlZ21lbnRzID0gcGF0aC5zcGxpdChcIi9cIik7XHJcbiAgaWYgKHNlZ21lbnRzLnNvbWUoKHNlZ21lbnQpID0+ICFzZWdtZW50IHx8IHNlZ21lbnQgPT09IFwiLlwiIHx8IHNlZ21lbnQgPT09IFwiLi5cIiB8fCAvWzw+OlwifD8qXS8udGVzdChzZWdtZW50KSB8fCBSRVNFUlZFRC50ZXN0KHNlZ21lbnQpKSkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKGBVbnNhZmUgcGF0aDogJHt2YWx1ZX1gKTtcclxuICB9XHJcbiAgY29uc3QgdG9wTGV2ZWwgPSBzZWdtZW50c1swXTtcclxuICBpZiAoKE1BTkFHRURfUk9PVFMgYXMgcmVhZG9ubHkgc3RyaW5nW10pLmluY2x1ZGVzKHRvcExldmVsKSkge1xyXG4gICAgcmV0dXJuIHBhdGg7XHJcbiAgfVxyXG4gIGlmICgodG9wTGV2ZWwgPT09IFwiLm9ic2lkaWFuXCIgJiYgc2VnbWVudHMubGVuZ3RoID4gMSkgfHwgKCFwYXRoLmluY2x1ZGVzKFwiL1wiKSAmJiAhcGF0aC5zdGFydHNXaXRoKFwiLlwiKSkpIHJldHVybiBwYXRoO1xyXG4gIHRocm93IG5ldyBFcnJvcihgUGF0aCBpcyBvdXRzaWRlIHRoZSBtYW5hZ2VkIGJvdW5kYXJ5OiAke3ZhbHVlfWApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZW5zdXJlTm9QYXRoQ29uZmxpY3RzKHBhdGhzOiBzdHJpbmdbXSk6IHZvaWQge1xyXG4gIGNvbnN0IHNvcnRlZCA9IFsuLi5wYXRoc10uc29ydCgpO1xyXG4gIGZvciAobGV0IGkgPSAxOyBpIDwgc29ydGVkLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICBpZiAoc29ydGVkW2ldLnN0YXJ0c1dpdGgoYCR7c29ydGVkW2kgLSAxXX0vYCkpIHRocm93IG5ldyBFcnJvcihgRmlsZS9kaXJlY3RvcnkgcGF0aCBjb25mbGljdDogJHtzb3J0ZWRbaSAtIDFdfWApO1xyXG4gIH1cclxufVxyXG4iLCAiaW1wb3J0IHsgTUFOQUdFRF9ST09UUywgUmVsZWFzZUVudHJ5LCBSZWxlYXNlTWFuaWZlc3QgfSBmcm9tIFwiLi90eXBlc1wiO1xuaW1wb3J0IHsgYXNzZXJ0TWFuYWdlZFBhdGggfSBmcm9tIFwiLi9wYXRoLXBvbGljeVwiO1xuXG5jb25zdCBSRVFVSVJFRF9TVFJJTkdfRklFTERTID0gW1widGl0bGVcIiwgXCJtaW5pbXVtUGx1Z2luVmVyc2lvblwiLCBcIm1pbmltdW1PYnNpZGlhblZlcnNpb25cIl0gYXMgY29uc3Q7XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUFuZFZhbGlkYXRlTWFuaWZlc3QoaW5wdXQ6IHVua25vd24pOiBSZWxlYXNlTWFuaWZlc3Qge1xuICBpZiAoIWlzUmVjb3JkKGlucHV0KSkgdGhyb3cgbmV3IEVycm9yKFwiUmVsZWFzZSBtYW5pZmVzdCBtdXN0IGJlIGEgSlNPTiBvYmplY3QuXCIpO1xuICBpZiAoXCJjb2xsZWN0aW9uXCIgaW4gaW5wdXQpIHRocm93IG5ldyBFcnJvcihcIlRoZSBsb3dlcmNhc2UgY29sbGVjdGlvbiBmaWVsZCB3YXMgcmVuYW1lZCB0byB0YnBlZGlhLiBLZWVwIHVwcGVyY2FzZSBDb2xsZWN0aW9uIGZvciB0aGUgdmVyc2lvbi5cIik7XG4gIGZvciAoY29uc3QgZm9yYmlkZGVuIG9mIFtcInNpZ25hdHVyZVwiLCBcInBheWxvYWRcIiwgXCJjb2xsZWN0aW9uS2V5XCIsIFwic2hhMjU2XCIsIFwic2l6ZVwiLCBcImRvd25sb2FkVXJsXCIsIFwidXJsXCJdKSB7XG4gICAgaWYgKGZvcmJpZGRlbiBpbiBpbnB1dCkgdGhyb3cgbmV3IEVycm9yKGBNYW5pZmVzdCBjb250YWlucyB1bnN1cHBvcnRlZCBmaWVsZDogJHtmb3JiaWRkZW59LmApO1xuICB9XG4gIGlmIChpbnB1dC5zY2hlbWFWZXJzaW9uICE9PSAyIHx8IGlucHV0LnByb2R1Y3QgIT09IFwiVGJwZWRpYS1EaXN0cmlidXRlXCIgfHwgaW5wdXQucGx1Z2luICE9PSBcInRicGVkaWEtdXBkYXRlXCIpIHRocm93IG5ldyBFcnJvcihcIlRoaXMgaXMgbm90IGEgc3VwcG9ydGVkIGluY3JlbWVudGFsIFRicGVkaWEgcmVsZWFzZSBtYW5pZmVzdC5cIik7XG4gIGlmIChpbnB1dC5jaGFubmVsICE9PSBcInN0YWJsZVwiKSB0aHJvdyBuZXcgRXJyb3IoXCJPbmx5IHRoZSBzdGFibGUgcmVsZWFzZSBjaGFubmVsIGlzIHN1cHBvcnRlZC5cIik7XG4gIGlmICh0eXBlb2YgaW5wdXQuQ29sbGVjdGlvbiAhPT0gXCJzdHJpbmdcIiB8fCAhL15WWzEtOV1cXGQqJC8udGVzdChpbnB1dC5Db2xsZWN0aW9uKSkgdGhyb3cgbmV3IEVycm9yKFwiQ29sbGVjdGlvbiBtdXN0IGJlIGEgdmVyc2lvbiBzdWNoIGFzIFYxLlwiKTtcbiAgZm9yIChjb25zdCBmaWVsZCBvZiBSRVFVSVJFRF9TVFJJTkdfRklFTERTKSBpZiAodHlwZW9mIGlucHV0W2ZpZWxkXSAhPT0gXCJzdHJpbmdcIiB8fCAhaW5wdXRbZmllbGRdLnRyaW0oKSkgdGhyb3cgbmV3IEVycm9yKGBNYW5pZmVzdCBmaWVsZCAke2ZpZWxkfSBpcyBpbnZhbGlkLmApO1xuICBpZiAoIWlzUmVjb3JkKGlucHV0LnRicGVkaWEpIHx8ICFpc1RicGVkaWFQYXJ0KGlucHV0LnRicGVkaWEubGFuZ3VhZ2UsIFwiY29kZVwiKSB8fCAhaXNUYnBlZGlhUGFydChpbnB1dC50YnBlZGlhLnNlcmllcywgXCJpZFwiKSB8fCAhaXNUYnBlZGlhUGFydChpbnB1dC50YnBlZGlhLmVkaXRpb24sIFwiaWRcIikpIHRocm93IG5ldyBFcnJvcihcInRicGVkaWEgaWRlbnRpdHkgaXMgaW52YWxpZC5cIik7XG4gIGNvbnN0IHRicGVkaWEgPSBpbnB1dC50YnBlZGlhIGFzIFJlbGVhc2VNYW5pZmVzdFtcInRicGVkaWFcIl07XG4gIGNvbnN0IHJlbGVhc2VLZXkgPSBbdGJwZWRpYS5sYW5ndWFnZS5jb2RlLCB0YnBlZGlhLnNlcmllcy5pZCwgdGJwZWRpYS5lZGl0aW9uLmlkXS5qb2luKFwiLVwiKS50b0xvd2VyQ2FzZSgpO1xuICBpZiAoIUFycmF5LmlzQXJyYXkoaW5wdXQubWFuYWdlZFJvb3RzKSB8fCAhc2FtZVNldChpbnB1dC5tYW5hZ2VkUm9vdHMsIFsuLi5NQU5BR0VEX1JPT1RTXSkpIHRocm93IG5ldyBFcnJvcihcIm1hbmFnZWRSb290cyBkb2VzIG5vdCBtYXRjaCB0aGUgYXBwcm92ZWQgYm91bmRhcnkuXCIpO1xuICBpZiAoIUFycmF5LmlzQXJyYXkoaW5wdXQucmVsZWFzZXMpIHx8IGlucHV0LnJlbGVhc2VzLmxlbmd0aCA9PT0gMCkgdGhyb3cgbmV3IEVycm9yKFwicmVsZWFzZXMgbXVzdCBiZSBhIG5vbi1lbXB0eSBhcnJheS5cIik7XG5cbiAgY29uc3QgZXhpc3RpbmdQYXRocyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICBjb25zdCByZWxlYXNlcyA9IGlucHV0LnJlbGVhc2VzLm1hcCgoZW50cnkpID0+IHtcbiAgICBjb25zdCByZWxlYXNlID0gcGFyc2VSZWxlYXNlKGVudHJ5LCByZWxlYXNlS2V5LCBleGlzdGluZ1BhdGhzKTtcbiAgICBmb3IgKGNvbnN0IGZpbGUgb2YgcmVsZWFzZS5maWxlcykge1xuICAgICAgaWYgKGZpbGUuY2hhbmdlID09PSBcIi1cIikgZXhpc3RpbmdQYXRocy5kZWxldGUoZmlsZS5wYXRoKTtcbiAgICAgIGVsc2UgZXhpc3RpbmdQYXRocy5hZGQoZmlsZS5wYXRoKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlbGVhc2U7XG4gIH0pO1xuICBjb25zdCBpZHMgPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHJlbGVhc2VzLmxlbmd0aDsgaW5kZXggKz0gMSkge1xuICAgIGNvbnN0IHJlbGVhc2UgPSByZWxlYXNlc1tpbmRleF07XG4gICAgaWYgKGlkcy5oYXMocmVsZWFzZS5yZWxlYXNlSWQpKSB0aHJvdyBuZXcgRXJyb3IoYER1cGxpY2F0ZSByZWxlYXNlSWQ6ICR7cmVsZWFzZS5yZWxlYXNlSWR9LmApO1xuICAgIGZvciAoY29uc3QgZGVwZW5kZW5jeSBvZiByZWxlYXNlLmRlcGVuZHNPbiA/PyBbXSkge1xuICAgICAgaWYgKCFpZHMuaGFzKGRlcGVuZGVuY3kpKSB0aHJvdyBuZXcgRXJyb3IoYFJlbGVhc2UgJHtyZWxlYXNlLnJlbGVhc2VJZH0gZGVwZW5kcyBvbiAke2RlcGVuZGVuY3l9LCB3aGljaCBtdXN0IGJlIGFuIGVhcmxpZXIgcmVsZWFzZSBpbiB0aGlzIG1hbmlmZXN0LmApO1xuICAgIH1cbiAgICBpZHMuYWRkKHJlbGVhc2UucmVsZWFzZUlkKTtcbiAgICBpZiAoaW5kZXggPiAwICYmIGNvbXBhcmVSZWxlYXNlKHJlbGVhc2VzW2luZGV4IC0gMV0sIHJlbGVhc2UpID49IDApIHRocm93IG5ldyBFcnJvcihcInJlbGVhc2VzIG11c3QgYmUgaW4gc3RyaWN0bHkgaW5jcmVhc2luZyB2ZXJzaW9uIGFuZCBwdWJsaWNhdGlvbiBvcmRlci5cIik7XG4gIH1cbiAgaWYgKHJlbGVhc2VzLnNvbWUoKHJlbGVhc2UpID0+IHJlbGVhc2UuZGVwZW5kc09uICE9PSB1bmRlZmluZWQpICYmIGNvbXBhcmVWZXJzaW9ucyhpbnB1dC5taW5pbXVtUGx1Z2luVmVyc2lvbiwgXCIxLjIuMFwiKSA8IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJNYW5pZmVzdHMgdXNpbmcgZGVwZW5kc09uIG11c3QgcmVxdWlyZSBtaW5pbXVtUGx1Z2luVmVyc2lvbiAxLjIuMCBvciBuZXdlci5cIik7XG4gIH1cbiAgcmV0dXJuIHsgLi4uaW5wdXQsIHJlbGVhc2VzIH0gYXMgUmVsZWFzZU1hbmlmZXN0O1xufVxuXG5mdW5jdGlvbiBwYXJzZVJlbGVhc2UoaW5wdXQ6IHVua25vd24sIGV4cGVjdGVkS2V5OiBzdHJpbmcsIGV4aXN0aW5nUGF0aHM6IFNldDxzdHJpbmc+KTogUmVsZWFzZUVudHJ5IHtcbiAgaWYgKCFpc1JlY29yZChpbnB1dCkpIHRocm93IG5ldyBFcnJvcihcIkVhY2ggcmVsZWFzZSBtdXN0IGJlIGFuIG9iamVjdC5cIik7XG4gIGZvciAoY29uc3QgZmllbGQgb2YgW1wicmVsZWFzZVZlcnNpb25cIiwgXCJyZWxlYXNlSWRcIiwgXCJwdWJsaXNoZWRBdFwiLCBcImZpbGVuYW1lXCJdIGFzIGNvbnN0KSBpZiAodHlwZW9mIGlucHV0W2ZpZWxkXSAhPT0gXCJzdHJpbmdcIiB8fCAhaW5wdXRbZmllbGRdLnRyaW0oKSkgdGhyb3cgbmV3IEVycm9yKGBSZWxlYXNlIGZpZWxkICR7ZmllbGR9IGlzIGludmFsaWQuYCk7XG4gIGNvbnN0IHZlcnNpb24gPSBwYXJzZVJlbGVhc2VWZXJzaW9uKGlucHV0LnJlbGVhc2VWZXJzaW9uKTtcbiAgaWYgKCF2ZXJzaW9uIHx8IHZlcnNpb24ua2V5ICE9PSBleHBlY3RlZEtleSkgdGhyb3cgbmV3IEVycm9yKGByZWxlYXNlVmVyc2lvbiBtdXN0IGhhdmUgdGhlIGZvcm1hdCAke2V4cGVjdGVkS2V5fS1ZWVlZLk0uRC5gKTtcbiAgY29uc3QgcmVsZWFzZUlkID0gcGFyc2VSZWxlYXNlSWQoaW5wdXQucmVsZWFzZUlkKTtcbiAgaWYgKCFyZWxlYXNlSWQgfHwgcmVsZWFzZUlkLmtleSAhPT0gZXhwZWN0ZWRLZXkpIHRocm93IG5ldyBFcnJvcihgcmVsZWFzZUlkIG11c3QgaGF2ZSB0aGUgZm9ybWF0ICR7ZXhwZWN0ZWRLZXl9LVlZWVktTS1ELnNlcXVlbmNlLCBmb3IgZXhhbXBsZSAke2V4cGVjdGVkS2V5fS0yMDI2LTEwLTEuMS5gKTtcbiAgaWYgKHJlbGVhc2VJZC55ZWFyICE9PSB2ZXJzaW9uLnllYXIgfHwgcmVsZWFzZUlkLm1vbnRoICE9PSB2ZXJzaW9uLm1vbnRoIHx8IHJlbGVhc2VJZC5kYXkgIT09IHZlcnNpb24uZGF5KSB0aHJvdyBuZXcgRXJyb3IoXCJyZWxlYXNlSWQgZGF0ZSBtdXN0IG1hdGNoIHJlbGVhc2VWZXJzaW9uLlwiKTtcbiAgaWYgKE51bWJlci5pc05hTihEYXRlLnBhcnNlKGlucHV0LnB1Ymxpc2hlZEF0KSkpIHRocm93IG5ldyBFcnJvcihcInB1Ymxpc2hlZEF0IG11c3QgYmUgSVNPLTg2MDEuXCIpO1xuICBpZiAoIUFycmF5LmlzQXJyYXkoaW5wdXQuZmlsZXMpIHx8ICFBcnJheS5pc0FycmF5KGlucHV0LmRlbGV0aW9ucykpIHRocm93IG5ldyBFcnJvcihcImZpbGVzIGFuZCBkZWxldGlvbnMgbXVzdCBiZSBhcnJheXMuXCIpO1xuICBpZiAoaW5wdXQuZGVwZW5kc09uICE9PSB1bmRlZmluZWQgJiYgKCFBcnJheS5pc0FycmF5KGlucHV0LmRlcGVuZHNPbikgfHwgaW5wdXQuZGVwZW5kc09uLnNvbWUoKGlkOiB1bmtub3duKSA9PiB0eXBlb2YgaWQgIT09IFwic3RyaW5nXCIgfHwgIWlkLnRyaW0oKSkgfHwgbmV3IFNldChpbnB1dC5kZXBlbmRzT24pLnNpemUgIT09IGlucHV0LmRlcGVuZHNPbi5sZW5ndGgpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBSZWxlYXNlICR7aW5wdXQucmVsZWFzZUlkfSBkZXBlbmRzT24gbXVzdCBiZSBhbiBhcnJheSBvZiB1bmlxdWUgcmVsZWFzZSBJRHMuYCk7XG4gIH1cbiAgY29uc3QgZmlsZXMgPSBpbnB1dC5maWxlcy5tYXAoKGVudHJ5KSA9PiB7XG4gICAgaWYgKCFpc1JlY29yZChlbnRyeSkgfHwgdHlwZW9mIGVudHJ5LnBhdGggIT09IFwic3RyaW5nXCIpIHRocm93IG5ldyBFcnJvcihcIkVhY2ggZmlsZSBlbnRyeSBuZWVkcyBhIHBhdGguXCIpO1xuICAgIGNvbnN0IHBhdGggPSBhc3NlcnRNYW5hZ2VkUGF0aChlbnRyeS5wYXRoKTtcbiAgICBjb25zdCBjaGFuZ2UgPSBlbnRyeS5jaGFuZ2UgPz8gKGV4aXN0aW5nUGF0aHMuaGFzKHBhdGgpID8gXCJ+XCIgOiBcIitcIik7XG4gICAgaWYgKGNoYW5nZSAhPT0gXCIrXCIgJiYgY2hhbmdlICE9PSBcIi1cIiAmJiBjaGFuZ2UgIT09IFwiflwiKSB0aHJvdyBuZXcgRXJyb3IoXCJGaWxlIGNoYW5nZSBtdXN0IGJlICssIC0sIG9yIH4uXCIpO1xuICAgIHJldHVybiB7IHBhdGgsIGNoYW5nZSB9O1xuICB9KTtcbiAgY29uc3QgZGVsZXRpb25zID0gaW5wdXQuZGVsZXRpb25zLm1hcCgocGF0aCkgPT4ge1xuICAgIGlmICh0eXBlb2YgcGF0aCAhPT0gXCJzdHJpbmdcIikgdGhyb3cgbmV3IEVycm9yKFwiRWFjaCBkZWxldGlvbiBtdXN0IGJlIGEgcGF0aC5cIik7XG4gICAgcmV0dXJuIGFzc2VydE1hbmFnZWRQYXRoKHBhdGgpO1xuICB9KTtcbiAgZm9yIChjb25zdCBwYXRoIG9mIGRlbGV0aW9ucykge1xuICAgIGNvbnN0IGZpbGUgPSBmaWxlcy5maW5kKChlbnRyeSkgPT4gZW50cnkucGF0aCA9PT0gcGF0aCk7XG4gICAgaWYgKGZpbGUgJiYgZmlsZS5jaGFuZ2UgIT09IFwiLVwiKSB0aHJvdyBuZXcgRXJyb3IoXCJBIGRlbGV0aW9uIGNvbmZsaWN0cyB3aXRoIGEgZmlsZSB3cml0ZS5cIik7XG4gICAgaWYgKCFmaWxlKSBmaWxlcy5wdXNoKHsgcGF0aCwgY2hhbmdlOiBcIi1cIiB9KTtcbiAgfVxuICBjb25zdCBhbGxQYXRocyA9IGZpbGVzLm1hcCgoZmlsZSkgPT4gZmlsZS5wYXRoKTtcbiAgaWYgKG5ldyBTZXQoYWxsUGF0aHMpLnNpemUgIT09IGFsbFBhdGhzLmxlbmd0aCkgdGhyb3cgbmV3IEVycm9yKGBSZWxlYXNlICR7aW5wdXQucmVsZWFzZUlkfSBjb250YWlucyBkdXBsaWNhdGUgb3IgY29uZmxpY3RpbmcgcGF0aHMuYCk7XG4gIGlmICghaXNSZWNvcmQoaW5wdXQucmVsZWFzZU5vdGVzKSB8fCB0eXBlb2YgaW5wdXQucmVsZWFzZU5vdGVzLnN1bW1hcnkgIT09IFwic3RyaW5nXCIgfHwgIVtcImFkZGVkXCIsIFwidXBkYXRlZFwiLCBcInJlbW92ZWRcIl0uZXZlcnkoKGtleSkgPT4gdHlwZW9mIGlucHV0LnJlbGVhc2VOb3Rlc1trZXldID09PSBcIm51bWJlclwiICYmIGlucHV0LnJlbGVhc2VOb3Rlc1trZXldID49IDApKSB0aHJvdyBuZXcgRXJyb3IoXCJyZWxlYXNlTm90ZXMgaXMgaW52YWxpZC5cIik7XG4gIHJldHVybiB7IHJlbGVhc2VWZXJzaW9uOiBpbnB1dC5yZWxlYXNlVmVyc2lvbiwgcmVsZWFzZUlkOiBpbnB1dC5yZWxlYXNlSWQsIHB1Ymxpc2hlZEF0OiBpbnB1dC5wdWJsaXNoZWRBdCwgZmlsZW5hbWU6IGlucHV0LmZpbGVuYW1lLCAuLi4oaW5wdXQuZGVwZW5kc09uICE9PSB1bmRlZmluZWQgPyB7IGRlcGVuZHNPbjogaW5wdXQuZGVwZW5kc09uIH0gOiB7fSksIGZpbGVzLCBkZWxldGlvbnM6IGZpbGVzLmZpbHRlcigoZmlsZSkgPT4gZmlsZS5jaGFuZ2UgPT09IFwiLVwiKS5tYXAoKGZpbGUpID0+IGZpbGUucGF0aCksIHJlbGVhc2VOb3RlczogaW5wdXQucmVsZWFzZU5vdGVzIGFzIFJlbGVhc2VFbnRyeVtcInJlbGVhc2VOb3Rlc1wiXSB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29tcGFyZVZlcnNpb25zKGE6IHN0cmluZywgYjogc3RyaW5nKTogbnVtYmVyIHtcbiAgY29uc3QgcGFyc2UgPSAodmFsdWU6IHN0cmluZykgPT4gdmFsdWUucmVwbGFjZSgvXnYvLCBcIlwiKS5zcGxpdCgvWy4rLV0vKS5zbGljZSgwLCAzKS5tYXAoKHBhcnQpID0+IE51bWJlci5wYXJzZUludChwYXJ0LCAxMCkgfHwgMCk7XG4gIGNvbnN0IGxlZnQgPSBwYXJzZShhKTsgY29uc3QgcmlnaHQgPSBwYXJzZShiKTtcbiAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IDM7IGluZGV4ICs9IDEpIGlmIChsZWZ0W2luZGV4XSAhPT0gcmlnaHRbaW5kZXhdKSByZXR1cm4gbGVmdFtpbmRleF0gLSByaWdodFtpbmRleF07XG4gIHJldHVybiAwO1xufVxuLyoqIENvbXBhcmVzIHJlYWRhYmxlIGNvbGxlY3Rpb24gcmVsZWFzZSB2ZXJzaW9ucywgd2hpbGUgYWNjZXB0aW5nIGxlZ2FjeSBkYXRlLW9ubHkgc3RvcmVkIHZlcnNpb25zLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbXBhcmVSZWxlYXNlVmVyc2lvbnMoYTogc3RyaW5nLCBiOiBzdHJpbmcpOiBudW1iZXIge1xuICBjb25zdCBsZWZ0ID0gcGFyc2VSZWxlYXNlVmVyc2lvbihhKTsgY29uc3QgcmlnaHQgPSBwYXJzZVJlbGVhc2VWZXJzaW9uKGIpO1xuICBpZiAoIWxlZnQgfHwgIXJpZ2h0KSByZXR1cm4gY29tcGFyZVZlcnNpb25zKGEsIGIpO1xuICByZXR1cm4gY29tcGFyZURhdGVzKGxlZnQsIHJpZ2h0KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjb21wYXJlUmVsZWFzZShhOiBSZWxlYXNlRW50cnksIGI6IFJlbGVhc2VFbnRyeSk6IG51bWJlciB7XG4gIGNvbnN0IHZlcnNpb24gPSBjb21wYXJlUmVsZWFzZVZlcnNpb25zKGEucmVsZWFzZVZlcnNpb24sIGIucmVsZWFzZVZlcnNpb24pO1xuICBpZiAodmVyc2lvbikgcmV0dXJuIHZlcnNpb247XG4gIGNvbnN0IHNlcXVlbmNlID0gcGFyc2VSZWxlYXNlSWQoYS5yZWxlYXNlSWQpIS5zZXF1ZW5jZSAtIHBhcnNlUmVsZWFzZUlkKGIucmVsZWFzZUlkKSEuc2VxdWVuY2U7XG4gIHJldHVybiBzZXF1ZW5jZSB8fCBEYXRlLnBhcnNlKGEucHVibGlzaGVkQXQpIC0gRGF0ZS5wYXJzZShiLnB1Ymxpc2hlZEF0KTtcbn1cbmZ1bmN0aW9uIHBhcnNlUmVsZWFzZVZlcnNpb24odmFsdWU6IHN0cmluZyk6IHsga2V5Pzogc3RyaW5nOyB5ZWFyOiBudW1iZXI7IG1vbnRoOiBudW1iZXI7IGRheTogbnVtYmVyIH0gfCB1bmRlZmluZWQge1xuICBjb25zdCBtYXRjaCA9IC9eKD86KFthLXowLTldKyg/Oi1bYS16MC05XSspKiktKT8oXFxkezR9KVxcLihcXGR7MSwyfSlcXC4oXFxkezEsMn0pJC8uZXhlYyh2YWx1ZSk7XG4gIHJldHVybiBtYXRjaCAmJiB2YWxpZERhdGUoTnVtYmVyKG1hdGNoWzJdKSwgTnVtYmVyKG1hdGNoWzNdKSwgTnVtYmVyKG1hdGNoWzRdKSkgPyB7IGtleTogbWF0Y2hbMV0sIHllYXI6IE51bWJlcihtYXRjaFsyXSksIG1vbnRoOiBOdW1iZXIobWF0Y2hbM10pLCBkYXk6IE51bWJlcihtYXRjaFs0XSkgfSA6IHVuZGVmaW5lZDtcbn1cbmZ1bmN0aW9uIHBhcnNlUmVsZWFzZUlkKHZhbHVlOiBzdHJpbmcpOiB7IGtleT86IHN0cmluZzsgeWVhcjogbnVtYmVyOyBtb250aDogbnVtYmVyOyBkYXk6IG51bWJlcjsgc2VxdWVuY2U6IG51bWJlciB9IHwgdW5kZWZpbmVkIHtcbiAgY29uc3QgbWF0Y2ggPSAvXig/OihbYS16MC05XSsoPzotW2EtejAtOV0rKSopLSk/KFxcZHs0fSktKFxcZHsxLDJ9KS0oXFxkezEsMn0pXFwuKFxcZCspJC8uZXhlYyh2YWx1ZSk7XG4gIGlmICghbWF0Y2gpIHJldHVybiB1bmRlZmluZWQ7XG4gIGNvbnN0IHllYXIgPSBOdW1iZXIobWF0Y2hbMl0pOyBjb25zdCBtb250aCA9IE51bWJlcihtYXRjaFszXSk7IGNvbnN0IGRheSA9IE51bWJlcihtYXRjaFs0XSk7IGNvbnN0IHNlcXVlbmNlID0gTnVtYmVyKG1hdGNoWzVdKTtcbiAgcmV0dXJuIHZhbGlkRGF0ZSh5ZWFyLCBtb250aCwgZGF5KSAmJiBOdW1iZXIuaXNTYWZlSW50ZWdlcihzZXF1ZW5jZSkgJiYgc2VxdWVuY2UgPj0gMSA/IHsga2V5OiBtYXRjaFsxXSwgeWVhciwgbW9udGgsIGRheSwgc2VxdWVuY2UgfSA6IHVuZGVmaW5lZDtcbn1cbmZ1bmN0aW9uIGNvbXBhcmVEYXRlcyhhOiB7IHllYXI6IG51bWJlcjsgbW9udGg6IG51bWJlcjsgZGF5OiBudW1iZXIgfSwgYjogeyB5ZWFyOiBudW1iZXI7IG1vbnRoOiBudW1iZXI7IGRheTogbnVtYmVyIH0pOiBudW1iZXIgeyByZXR1cm4gYS55ZWFyIC0gYi55ZWFyIHx8IGEubW9udGggLSBiLm1vbnRoIHx8IGEuZGF5IC0gYi5kYXk7IH1cbmZ1bmN0aW9uIHZhbGlkRGF0ZSh5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXIsIGRheTogbnVtYmVyKTogYm9vbGVhbiB7IGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShEYXRlLlVUQyh5ZWFyLCBtb250aCAtIDEsIGRheSkpOyByZXR1cm4gZGF0ZS5nZXRVVENGdWxsWWVhcigpID09PSB5ZWFyICYmIGRhdGUuZ2V0VVRDTW9udGgoKSA9PT0gbW9udGggLSAxICYmIGRhdGUuZ2V0VVRDRGF0ZSgpID09PSBkYXk7IH1cbmZ1bmN0aW9uIGlzVGJwZWRpYVBhcnQodmFsdWU6IHVua25vd24sIGlkZW50aXR5OiBcImNvZGVcIiB8IFwiaWRcIik6IHZhbHVlIGlzIFJlY29yZDxzdHJpbmcsIHN0cmluZz4geyByZXR1cm4gaXNSZWNvcmQodmFsdWUpICYmIHR5cGVvZiB2YWx1ZVtpZGVudGl0eV0gPT09IFwic3RyaW5nXCIgJiYgdmFsdWVbaWRlbnRpdHldLnRyaW0oKS5sZW5ndGggPiAwOyB9XG5mdW5jdGlvbiBpc1JlY29yZCh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIFJlY29yZDxzdHJpbmcsIGFueT4geyByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmIHZhbHVlICE9PSBudWxsICYmICFBcnJheS5pc0FycmF5KHZhbHVlKTsgfVxuZnVuY3Rpb24gc2FtZVNldCh2YWx1ZXM6IHVua25vd25bXSwgZXhwZWN0ZWQ6IHN0cmluZ1tdKTogYm9vbGVhbiB7IHJldHVybiB2YWx1ZXMubGVuZ3RoID09PSBleHBlY3RlZC5sZW5ndGggJiYgbmV3IFNldCh2YWx1ZXMpLnNpemUgPT09IHZhbHVlcy5sZW5ndGggJiYgdmFsdWVzLmV2ZXJ5KCh2YWx1ZSkgPT4gdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiICYmIGV4cGVjdGVkLmluY2x1ZGVzKHZhbHVlKSk7IH1cbiIsICJpbXBvcnQgeyBGaWxlQ2hhbmdlLCBJbnN0YWxsZWRTdGF0ZSwgUmVsZWFzZU1hbmlmZXN0IH0gZnJvbSBcIi4vdHlwZXNcIjtcblxudHlwZSBMZWdhY3lGaWxlcyA9IFJlY29yZDxzdHJpbmcsIEFycmF5PHN0cmluZyB8IEZpbGVDaGFuZ2U+PiB8IHN0cmluZ1tdO1xuXG5leHBvcnQgZnVuY3Rpb24gbWlncmF0ZU93bmVkRmlsZXModmFsdWU6IExlZ2FjeUZpbGVzLCBpbnN0YWxsZWQ6IEluc3RhbGxlZFN0YXRlLCBtYW5pZmVzdD86IFJlbGVhc2VNYW5pZmVzdCk6IFJlY29yZDxzdHJpbmcsIEZpbGVDaGFuZ2VbXT4ge1xuICBjb25zdCBzb3VyY2UgPSBBcnJheS5pc0FycmF5KHZhbHVlKSA/IHsgbGVnYWN5OiB2YWx1ZSB9IDogdmFsdWU7XG4gIGNvbnN0IGdyb3VwczogUmVjb3JkPHN0cmluZywgRmlsZUNoYW5nZVtdPiA9IHt9O1xuICBmb3IgKGNvbnN0IFtpZCwgZW50cmllc10gb2YgT2JqZWN0LmVudHJpZXMoc291cmNlKSkge1xuICAgIGdyb3Vwc1tpZF0gPSBlbnRyaWVzLm1hcCgoZW50cnkpID0+IHR5cGVvZiBlbnRyeSA9PT0gXCJzdHJpbmdcIiA/IHsgcGF0aDogZW50cnksIGNoYW5nZTogXCIrXCIgfSA6IHsgLi4uZW50cnkgfSk7XG4gIH1cbiAgaWYgKG1hbmlmZXN0KSB7XG4gICAgZm9yIChjb25zdCByZWxlYXNlIG9mIG1hbmlmZXN0LnJlbGVhc2VzKSB7XG4gICAgICBpZiAoIWluc3RhbGxlZC5hcHBsaWVkUmVsZWFzZUlkcy5pbmNsdWRlcyhyZWxlYXNlLnJlbGVhc2VJZCkgJiYgaW5zdGFsbGVkLnJlbGVhc2VJZCAhPT0gcmVsZWFzZS5yZWxlYXNlSWQpIGNvbnRpbnVlO1xuICAgICAgY29uc3Qga25vd24gPSBuZXcgU2V0KHJlbGVhc2UuZmlsZXMubWFwKChmaWxlKSA9PiBmaWxlLnBhdGgpKTtcbiAgICAgIGdyb3Vwc1tyZWxlYXNlLnJlbGVhc2VJZF0gPSBbLi4ucmVsZWFzZS5maWxlcy5tYXAoKGZpbGUpID0+ICh7IC4uLmZpbGUgfSkpLCAuLi4oZ3JvdXBzW3JlbGVhc2UucmVsZWFzZUlkXSA/PyBbXSkuZmlsdGVyKChmaWxlKSA9PiAha25vd24uaGFzKGZpbGUucGF0aCkpXTtcbiAgICAgIGlmIChncm91cHMubGVnYWN5KSBncm91cHMubGVnYWN5ID0gZ3JvdXBzLmxlZ2FjeS5maWx0ZXIoKGZpbGUpID0+ICFrbm93bi5oYXMoZmlsZS5wYXRoKSk7XG4gICAgfVxuICAgIGlmIChncm91cHMubGVnYWN5Py5sZW5ndGggPT09IDApIGRlbGV0ZSBncm91cHMubGVnYWN5O1xuICB9XG4gIHJldHVybiBncm91cHM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjdXJyZW50T3duZWRQYXRocyhpbnN0YWxsZWQ6IEluc3RhbGxlZFN0YXRlKTogU2V0PHN0cmluZz4ge1xuICBjb25zdCBvd25lZCA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICBjb25zdCBvcmRlciA9IFsuLi5uZXcgU2V0KFsuLi5PYmplY3Qua2V5cyhpbnN0YWxsZWQub3duZWRGaWxlcykuZmlsdGVyKChpZCkgPT4gIWluc3RhbGxlZC5hcHBsaWVkUmVsZWFzZUlkcy5pbmNsdWRlcyhpZCkpLCAuLi5pbnN0YWxsZWQuYXBwbGllZFJlbGVhc2VJZHNdKV07XG4gIGZvciAoY29uc3QgaWQgb2Ygb3JkZXIpIHtcbiAgICBmb3IgKGNvbnN0IGZpbGUgb2YgaW5zdGFsbGVkLm93bmVkRmlsZXNbaWRdID8/IFtdKSB7XG4gICAgICBpZiAoZmlsZS5jaGFuZ2UgPT09IFwiLVwiKSBvd25lZC5kZWxldGUoZmlsZS5wYXRoKTtcbiAgICAgIGVsc2Ugb3duZWQuYWRkKGZpbGUucGF0aCk7XG4gICAgfVxuICB9XG4gIHJldHVybiBvd25lZDtcbn1cclxuIiwgImltcG9ydCB7IFBsdWdpbkRhdGEgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG4vKiogUHJlc2VydmUgdGhlIHN0YXJ0aW5nIHJlbGVhc2U7IGRvIG5vdCBtaXN0YWtlIGEgbGF0ZXIgaW5zdGFsbGVkIHVwZGF0ZSBmb3IgaXQuICovXG5leHBvcnQgZnVuY3Rpb24gaW5pdGlhbGl6ZUJhc2VSZWxlYXNlKGRhdGE6IFBsdWdpbkRhdGEpOiBOb25OdWxsYWJsZTxQbHVnaW5EYXRhW1wiYmFzZVJlbGVhc2VcIl0+IHtcbiAgaWYgKGRhdGEuYmFzZVJlbGVhc2UpIHJldHVybiBkYXRhLmJhc2VSZWxlYXNlO1xuICBjb25zdCBsZWdhY3kgPSBkYXRhLmluc3RhbGxlZC5hcHBsaWVkUmVsZWFzZUlkc1xuICAgIC5tYXAoKGlkKSA9PiAoeyBpZCwgbWF0Y2g6IC9eKFxcZHs0fSktKFxcZHsxLDJ9KS0oXFxkezEsMn0pXFwuKFxcZCspJC8uZXhlYyhpZCkgfSkpXG4gICAgLmZpbHRlcigoZW50cnkpID0+IGVudHJ5Lm1hdGNoICE9PSBudWxsKVxuICAgIC5zb3J0KChhLCBiKSA9PiB7XG4gICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSA0OyBpKyspIHtcbiAgICAgICAgY29uc3QgZGlmZmVyZW5jZSA9IE51bWJlcihhLm1hdGNoIVtpXSkgLSBOdW1iZXIoYi5tYXRjaCFbaV0pO1xuICAgICAgICBpZiAoZGlmZmVyZW5jZSkgcmV0dXJuIGRpZmZlcmVuY2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gMDtcbiAgICB9KVswXTtcbiAgaWYgKGxlZ2FjeSkgcmV0dXJuIHsgcmVsZWFzZVZlcnNpb246IGAke2xlZ2FjeS5tYXRjaCFbMV19LiR7TnVtYmVyKGxlZ2FjeS5tYXRjaCFbMl0pfS4ke051bWJlcihsZWdhY3kubWF0Y2ghWzNdKX1gLCByZWxlYXNlSWQ6IGxlZ2FjeS5pZCB9O1xuICBpZiAoZGF0YS5pbnN0YWxsZWQudHJhY2tpbmdWZXJzaW9uICE9PSAyICYmIE9iamVjdC5rZXlzKGRhdGEuaW5zdGFsbGVkLm93bmVkRmlsZXMpLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiB7IHJlbGVhc2VWZXJzaW9uOiBkYXRhLmluc3RhbGxlZC5yZWxlYXNlVmVyc2lvbiwgcmVsZWFzZUlkOiBkYXRhLmluc3RhbGxlZC5yZWxlYXNlSWQgfTtcbiAgfVxuICByZXR1cm4ge307XG59XG4iLCAiaW1wb3J0IHsgUGx1Z2luRGF0YSB9IGZyb20gXCIuL3R5cGVzXCI7XHJcbmltcG9ydCB7IGluaXRpYWxpemVCYXNlUmVsZWFzZSB9IGZyb20gXCIuL2Jhc2UtcmVsZWFzZVwiO1xyXG5pbXBvcnQgeyBtaWdyYXRlT3duZWRGaWxlcyB9IGZyb20gXCIuL293bmVyc2hpcFwiO1xyXG5cclxuLyoqIEZyZXNoIGluc3RhbGxhdGlvbnMgcmVxdWlyZSB0aGUgdmF1bHQgb3duZXIgdG8gY29uZmlndXJlIHRoZSBjb250ZW50IGlkZW50aXR5LiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaW5pdGlhbGl6ZVBsdWdpbkRhdGEoc2F2ZWQ/OiAoUGFydGlhbDxQbHVnaW5EYXRhPiAmIHsgQ29sbGVjdGlvbj86IHN0cmluZyB9KSB8IG51bGwpOiBQbHVnaW5EYXRhIHtcclxuICBjb25zdCB7IENvbGxlY3Rpb246IGxlZ2FjeVZlcnNpb24sIC4uLmV4aXN0aW5nIH0gPSBzYXZlZCA/PyB7fTtcclxuICBjb25zdCBkYXRhOiBQbHVnaW5EYXRhID0ge1xyXG4gICAgbGFuZ3VhZ2VDb2RlOiBcIlwiLFxyXG4gICAgc2VyaWVzSWQ6IFwiXCIsXHJcbiAgICBlZGl0aW9uSWQ6IFwiXCIsXHJcbiAgICB0YnBlZGlhOiBcIlYxXCIsXG4gICAgY2hlY2tGb3JVcGRhdGVzT25TdGFydHVwOiB0cnVlLFxyXG4gICAgLi4uZXhpc3RpbmcsXHJcbiAgICBpbnN0YWxsZWQ6IHsgb3duZWRGaWxlczoge30sIGFwcGxpZWRSZWxlYXNlSWRzOiBbXSwgLi4uZXhpc3RpbmcuaW5zdGFsbGVkIH0sXHJcbiAgfTtcclxuICBkYXRhLnRicGVkaWEgPSBleGlzdGluZy50YnBlZGlhID8/IGxlZ2FjeVZlcnNpb24gPz8gXCJWMVwiO1xyXG4gIGRhdGEuaW5zdGFsbGVkLm93bmVkRmlsZXMgPSBtaWdyYXRlT3duZWRGaWxlcyhkYXRhLmluc3RhbGxlZC5vd25lZEZpbGVzLCBkYXRhLmluc3RhbGxlZCk7XHJcbiAgZGF0YS5iYXNlUmVsZWFzZSA9IHNhdmVkID09IG51bGwgfHwgT2JqZWN0LmtleXMoc2F2ZWQpLmxlbmd0aCA9PT0gMFxyXG4gICAgPyB7IHJlbGVhc2VWZXJzaW9uOiBcIjIwMjYuOS4zMFwiLCByZWxlYXNlSWQ6IFwiMjAyNi05LTMwLjFcIiB9XHJcbiAgICA6IGluaXRpYWxpemVCYXNlUmVsZWFzZShkYXRhKTtcclxuICBjb25zdCB7IGxhbmd1YWdlQ29kZSwgc2VyaWVzSWQsIGVkaXRpb25JZCwgdGJwZWRpYSwgYmFzZVJlbGVhc2UsIGNoZWNrRm9yVXBkYXRlc09uU3RhcnR1cCwgaW5zdGFsbGVkLCAuLi5yZXN0IH0gPSBkYXRhO1xyXG4gIHJldHVybiB7IGxhbmd1YWdlQ29kZTogbGFuZ3VhZ2VDb2RlID8/IFwiXCIsIHNlcmllc0lkLCBlZGl0aW9uSWQsIHRicGVkaWEsIGJhc2VSZWxlYXNlLFxyXG4gICAgY2hlY2tGb3JVcGRhdGVzT25TdGFydHVwOiBjaGVja0ZvclVwZGF0ZXNPblN0YXJ0dXAgPz8gdHJ1ZSwgaW5zdGFsbGVkLCAuLi5yZXN0IH07XHJcbn1cclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQSxrRkFBQUEsU0FBQTtBQVlBLE1BQUMsU0FBUyxHQUFFO0FBQUMsVUFBRyxZQUFVLE9BQU8sV0FBUyxlQUFhLE9BQU9BLFFBQU8sQ0FBQUEsUUFBTyxVQUFRLEVBQUU7QUFBQSxlQUFVLGNBQVksT0FBTyxVQUFRLE9BQU8sSUFBSSxRQUFPLENBQUMsR0FBRSxDQUFDO0FBQUEsV0FBTTtBQUFDLFNBQUMsZUFBYSxPQUFPLFNBQU8sU0FBTyxlQUFhLE9BQU8sU0FBTyxTQUFPLGVBQWEsT0FBTyxPQUFLLE9BQUssTUFBTSxRQUFNLEVBQUU7QUFBQSxNQUFDO0FBQUEsSUFBQyxHQUFFLFdBQVU7QUFBQyxjQUFPLFNBQVMsRUFBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGlCQUFTLEVBQUUsR0FBRUMsSUFBRTtBQUFDLGNBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRTtBQUFDLGdCQUFHLENBQUMsRUFBRSxDQUFDLEdBQUU7QUFBQyxrQkFBSSxJQUFFLGNBQVksT0FBTyxXQUFTO0FBQVEsa0JBQUcsQ0FBQ0EsTUFBRyxFQUFFLFFBQU8sRUFBRSxHQUFFLElBQUU7QUFBRSxrQkFBRyxFQUFFLFFBQU8sRUFBRSxHQUFFLElBQUU7QUFBRSxrQkFBSSxJQUFFLElBQUksTUFBTSx5QkFBdUIsSUFBRSxHQUFHO0FBQUUsb0JBQU0sRUFBRSxPQUFLLG9CQUFtQjtBQUFBLFlBQUM7QUFBQyxnQkFBSSxJQUFFLEVBQUUsQ0FBQyxJQUFFLEVBQUMsU0FBUSxDQUFDLEVBQUM7QUFBRSxjQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLFNBQVEsU0FBU0EsSUFBRTtBQUFDLGtCQUFJQyxLQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRUQsRUFBQztBQUFFLHFCQUFPLEVBQUVDLE1BQUdELEVBQUM7QUFBQSxZQUFDLEdBQUUsR0FBRSxFQUFFLFNBQVEsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFBLFVBQUM7QUFBQyxpQkFBTyxFQUFFLENBQUMsRUFBRTtBQUFBLFFBQU87QUFBQyxpQkFBUSxJQUFFLGNBQVksT0FBTyxXQUFTLFNBQVEsSUFBRSxHQUFFLElBQUUsRUFBRSxRQUFPLElBQUksR0FBRSxFQUFFLENBQUMsQ0FBQztBQUFFLGVBQU87QUFBQSxNQUFDLEdBQUUsRUFBQyxHQUFFLENBQUMsU0FBUyxHQUFFLEdBQUUsR0FBRTtBQUFDO0FBQWEsWUFBSSxJQUFFLEVBQUUsU0FBUyxHQUFFLElBQUUsRUFBRSxXQUFXLEdBQUUsSUFBRTtBQUFvRSxVQUFFLFNBQU8sU0FBU0EsSUFBRTtBQUFDLG1CQUFRQyxJQUFFQyxJQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxJQUFFLENBQUMsR0FBRSxJQUFFLEdBQUUsSUFBRUYsR0FBRSxRQUFPLElBQUUsR0FBRUcsS0FBRSxhQUFXLEVBQUUsVUFBVUgsRUFBQyxHQUFFLElBQUVBLEdBQUUsU0FBUSxLQUFFLElBQUUsR0FBRSxJQUFFRyxNQUFHRixLQUFFRCxHQUFFLEdBQUcsR0FBRUUsS0FBRSxJQUFFLElBQUVGLEdBQUUsR0FBRyxJQUFFLEdBQUUsSUFBRSxJQUFFQSxHQUFFLEdBQUcsSUFBRSxNQUFJQyxLQUFFRCxHQUFFLFdBQVcsR0FBRyxHQUFFRSxLQUFFLElBQUUsSUFBRUYsR0FBRSxXQUFXLEdBQUcsSUFBRSxHQUFFLElBQUUsSUFBRUEsR0FBRSxXQUFXLEdBQUcsSUFBRSxJQUFHLElBQUVDLE1BQUcsR0FBRSxLQUFHLElBQUVBLE9BQUksSUFBRUMsTUFBRyxHQUFFLElBQUUsSUFBRSxLQUFHLEtBQUdBLE9BQUksSUFBRSxLQUFHLElBQUUsSUFBRyxJQUFFLElBQUUsSUFBRSxLQUFHLElBQUUsSUFBRyxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsSUFBRSxFQUFFLE9BQU8sQ0FBQyxJQUFFLEVBQUUsT0FBTyxDQUFDLElBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUFFLGlCQUFPLEVBQUUsS0FBSyxFQUFFO0FBQUEsUUFBQyxHQUFFLEVBQUUsU0FBTyxTQUFTRixJQUFFO0FBQUMsY0FBSUMsSUFBRUMsSUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRTtBQUFRLGNBQUdGLEdBQUUsT0FBTyxHQUFFLEVBQUUsTUFBTSxNQUFJLEVBQUUsT0FBTSxJQUFJLE1BQU0saURBQWlEO0FBQUUsY0FBSSxHQUFFLElBQUUsS0FBR0EsS0FBRUEsR0FBRSxRQUFRLG9CQUFtQixFQUFFLEdBQUcsU0FBTztBQUFFLGNBQUdBLEdBQUUsT0FBT0EsR0FBRSxTQUFPLENBQUMsTUFBSSxFQUFFLE9BQU8sRUFBRSxLQUFHLEtBQUlBLEdBQUUsT0FBT0EsR0FBRSxTQUFPLENBQUMsTUFBSSxFQUFFLE9BQU8sRUFBRSxLQUFHLEtBQUksSUFBRSxLQUFHLEVBQUUsT0FBTSxJQUFJLE1BQU0sMkNBQTJDO0FBQUUsZUFBSSxJQUFFLEVBQUUsYUFBVyxJQUFJLFdBQVcsSUFBRSxDQUFDLElBQUUsSUFBSSxNQUFNLElBQUUsQ0FBQyxHQUFFLElBQUVBLEdBQUUsU0FBUSxDQUFBQyxLQUFFLEVBQUUsUUFBUUQsR0FBRSxPQUFP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QyxHQUFFLE9BQUssRUFBRSxVQUFVRCxFQUFDLEdBQUVDLEdBQUUsWUFBVUEsR0FBRSxlQUFlO0FBQUEsVUFBQyxHQUFFLFNBQVNELElBQUU7QUFBQyxZQUFBQyxHQUFFLE1BQU1ELEVBQUM7QUFBQSxVQUFDLENBQUM7QUFBQSxRQUFDO0FBQUMsVUFBRSxTQUFTLEdBQUUsQ0FBQyxHQUFFLEVBQUUsVUFBVSxVQUFRLFdBQVU7QUFBQyxZQUFFLFVBQVUsUUFBUSxLQUFLLElBQUksR0FBRSxLQUFLLE9BQUs7QUFBQSxRQUFJLEdBQUUsRUFBRSxVQUFVLFNBQU8sV0FBVTtBQUFDLGlCQUFNLENBQUMsQ0FBQyxFQUFFLFVBQVUsT0FBTyxLQUFLLElBQUksTUFBSSxDQUFDLEtBQUssa0JBQWdCLEtBQUssZ0JBQWMsS0FBSyxpQkFBZSxNQUFHLEVBQUUsTUFBTSxLQUFLLGdCQUFlLENBQUMsR0FBRSxJQUFJLElBQUc7QUFBQSxRQUFHLEdBQUUsRUFBRSxVQUFVLGlCQUFlLFdBQVU7QUFBQyxlQUFLLGlCQUFlLE9BQUcsS0FBSyxZQUFVLEtBQUssZUFBYSxLQUFLLE1BQU0sR0FBRSxLQUFLLGVBQWEsRUFBRSxNQUFNLEtBQUssZ0JBQWUsQ0FBQyxHQUFFLElBQUksR0FBRSxLQUFLLGlCQUFlO0FBQUEsUUFBSSxHQUFFLEVBQUUsVUFBVSxRQUFNLFdBQVU7QUFBQyxjQUFHLEtBQUssWUFBVSxLQUFLLFdBQVcsUUFBTTtBQUFHLGNBQUlBLEtBQUUsTUFBS0MsS0FBRSxLQUFLLElBQUksS0FBSyxLQUFJLEtBQUssUUFBTSxLQUFLO0FBQUUsY0FBRyxLQUFLLFNBQU8sS0FBSyxJQUFJLFFBQU8sS0FBSyxJQUFJO0FBQUUsa0JBQU8sS0FBSyxNQUFLO0FBQUEsWUFBQyxLQUFJO0FBQVMsY0FBQUQsS0FBRSxLQUFLLEtBQUssVUFBVSxLQUFLLE9BQU1DLEVBQUM7QUFBRTtBQUFBLFlBQU0sS0FBSTtBQUFhLGNBQUFELEtBQUUsS0FBSyxLQUFLLFNBQVMsS0FBSyxPQUFNQyxFQUFDO0FBQUU7QUFBQSxZQUFNLEtBQUk7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QUVDLEVBQUMsS0FBR0QsR0FBRSxTQUFPQyxJQUFFRDtBQUFBLFFBQUU7QUFBRSxZQUFJLElBQUUsRUFBQyxVQUFTLFNBQVNBLElBQUVDLElBQUVDLElBQUVFLElBQUVDLElBQUU7QUFBQyxjQUFHSixHQUFFLFlBQVVELEdBQUUsU0FBUyxDQUFBQSxHQUFFLElBQUlDLEdBQUUsU0FBU0MsSUFBRUEsS0FBRUUsRUFBQyxHQUFFQyxFQUFDO0FBQUEsY0FBTyxVQUFRQyxLQUFFLEdBQUVBLEtBQUVGLElBQUVFLEtBQUksQ0FBQU4sR0FBRUssS0FBRUMsRUFBQyxJQUFFTCxHQUFFQyxLQUFFSSxFQUFDO0FBQUEsUUFBQyxHQUFFLGVBQWMsU0FBU04sSUFBRTtBQUFDLGNBQUlDLElBQUVDLElBQUVFLElBQUVDLElBQUVDLElBQUU7QUFBRSxlQUFJTCxLQUFFRyxLQUFFLEdBQUVGLEtBQUVGLEdBQUUsUUFBT0MsS0FBRUMsSUFBRUQsS0FBSSxDQUFBRyxNQUFHSixHQUFFQyxFQUFDLEVBQUU7QUFBTyxlQUFJLElBQUUsSUFBSSxXQUFXRyxFQUFDLEdBQUVILEtBQUVJLEtBQUUsR0FBRUgsS0FBRUYsR0FBRSxRQUFPQyxLQUFFQyxJQUFFRCxLQUFJLENBQUFLLEtBQUVOLEdBQUVDLEVBQUMsR0FBRSxFQUFFLElBQUlLLElBQUVELEVBQUMsR0FBRUEsTUFBR0MsR0FBRTtBQUFPLGlCQUFPO0FBQUEsUUFBQyxFQUFDLEdBQUUsSUFBRSxFQUFDLFVBQVMsU0FBU04sSUFBRUMsSUFBRUMsSUFBRUUsSUFBRUMsSUFBRTtBQUFDLG1CQUFRQyxLQUFFLEdBQUVBLEtBQUVGLElBQUVFLEtBQUksQ0FBQU4sR0FBRUssS0FBRUMsRUFBQyxJQUFFTCxHQUFFQyxLQUFFSSxFQUFDO0FBQUEsUUFBQyxHQUFFLGVBQWMsU0FBU04sSUFBRTtBQUFDLGlCQUFNLENBQUMsRUFBRSxPQUFPLE1BQU0sQ0FBQyxHQUFFQSxFQUFDO0FBQUEsUUFBQyxFQUFDO0FBQUUsVUFBRSxXQUFTLFNBQVNBLElBQUU7QUFBQyxVQUFBQSxNQUFHLEVBQUUsT0FBSyxZQUFXLEVBQUUsUUFBTSxhQUFZLEVBQUUsUUFBTSxZQUFXLEVBQUUsT0FBTyxHQUFFLENBQUMsTUFBSSxFQUFFLE9BQUssT0FBTSxFQUFFLFFBQU0sT0FBTSxFQUFFLFFBQU0sT0FBTSxFQUFFLE9BQU8sR0FBRSxDQUFDO0FBQUEsUUFBRSxHQUFFLEVBQUUsU0FBUyxDQUFDO0FBQUEsTUFBQyxHQUFFLENBQUMsQ0FBQyxHQUFFLElBQUcsQ0FBQyxTQUFTLEdBQUUsR0FBRSxHQUFFO0FBQUM7QUFBYSxZQUFJLElBQUUsRUFBRSxVQUFVLEdBQUUsSUFBRSxNQUFHLElBQUU7QUFBRyxZQUFHO0FBQUMsaUJBQU8sYUFBYSxNQUFNLE1BQUssQ0FBQyxDQUFDLENBQUM7QUFBQSxRQUFDLFNBQU9BLElBQUU7QUFBQyxjQUFFO0FBQUEsUUFBRTtBQUFDLFlBQUc7QUFBQyxpQkFBTyxhQUFhLE1BQU0sTUFBSyxJQUFJLFdBQVcsQ0FBQyxDQUFDO0FBQUEsUUFBQyxTQUFPQSxJQUFFO0FBQUMsY0FBRTtBQUFBLFFBQUU7QUFBQyxpQkFBUSxJQUFFLElBQUksRUFBRSxLQUFLLEdBQUcsR0FBRSxJQUFFLEdBQUUsSUFBRSxLQUFJLElBQUksR0FBRSxDQUFDLElBQUUsT0FBSyxJQUFFLElBQUUsT0FBSyxJQUFFLElBQUUsT0FBSyxJQUFFLElBQUUsT0FBSyxJQUFFLElBQUUsT0FBSyxJQUFFLElBQUU7QUFBRSxpQkFBUyxFQUFFQSxJQUFFQyxJQUFFO0FBQUMsY0FBR0EsS0FBRSxVQUFRRCxHQUFFLFlBQVUsS0FBRyxDQUFDQSxHQUFFLFlBQVUsR0FBRyxRQUFPLE9BQU8sYUFBYSxNQUFNLE1BQUssRUFBRSxVQUFVQSxJQUFFQyxFQUFDLENBQUM7QUFBRSxtQkFBUUMsS0FBRSxJQUFHRSxLQUFFLEdBQUVBLEtBQUVILElBQUVHLEtBQUksQ0FBQUYsTUFBRyxPQUFPLGFBQWFGLEdBQUVJLEVBQUMsQ0FBQztBQUFFLGlCQUFPRjtBQUFBLFFBQUM7QUFBQyxVQUFFLEdBQUcsSUFBRSxFQUFFLEdBQUcsSUFBRSxHQUFFLEVBQUUsYUFBVyxTQUFTRixJQUFFO0FBQUMsY0FBSUMsSUFBRUMsSUFBRUUsSUFBRUMsSUFBRUMsSUFBRSxJQUFFTixHQUFFLFFBQU8sSUFBRTtBQUFFLGVBQUlLLEtBQUUsR0FBRUEsS0FBRSxHQUFFQSxLQUFJLFdBQVEsU0FBT0gsS0FBRUYsR0FBRSxXQUFXSyxFQUFDLE9BQUtBLEtBQUUsSUFBRSxLQUFHLFVBQVEsU0FBT0QsS0FBRUosR0FBRSxXQUFXSyxLQUFFLENBQUMsUUFBTUgsS0FBRSxTQUFPQSxLQUFFLFNBQU8sT0FBS0UsS0FBRSxRQUFPQyxPQUFLLEtBQUdILEtBQUUsTUFBSSxJQUFFQSxLQUFFLE9BQUssSUFBRUEsS0FBRSxRQUFNLElBQUU7QUFBRSxlQUFJRCxLQUFFLElBQUksRUFBRSxLQUFLLENBQUMsR0FBRUksS0FBRUMsS0FBRSxHQUFFQSxLQUFFLEdBQUVELEtBQUksV0FBUSxTQUFPSCxLQUFFRixHQUFFLFdBQVdLLEVBQUMsT0FBS0EsS0FBRSxJQUFFLEtBQUcsVUFBUSxTQUFPRCxLQUFFSixHQUFFLFdBQVdLLEtBQUUsQ0FBQyxRQUFNSCxLQUFFLFNBQU9BLEtBQUUsU0FBTyxPQUFLRSxLQUFFLFFBQU9DLE9BQUtILEtBQUUsTUFBSUQsR0FBRUssSUFBRyxJQUFFSixNQUFHQSxLQUFFLE9BQUtELEdBQUVLLElBQUcsSUFBRSxNQUFJSixPQUFJLEtBQUdBLEtBQUUsUUFBTUQsR0FBRUssSUFBRyxJQUFFLE1BQUlKLE9BQUksTUFBSUQsR0FBRUssSUFBRyxJQUFFLE1BQUlKLE9BQUksSUFBR0QsR0FBRUssSUFBRyxJQUFFLE1BQUlKLE9BQUksS0FBRyxLQUFJRCxHQUFFSyxJQUFHLElBQUUsTUFBSUosT0FBSSxJQUFFLEtBQUlELEdBQUVLLElBQUcsSUFBRSxNQUFJLEtBQUdKO0FBQUcsaUJBQU9EO0FBQUEsUUFBQyxHQUFFLEVBQUUsZ0JBQWMsU0FBU0QsSUFBRTtBQUFDLGlCQUFPLEVBQUVBLElBQUVBLEdBQUUsTUFBTTtBQUFBLFFBQUMsR0FBRSxFQUFFLGdCQUFjLFNBQVNBLElBQUU7QUFBQyxtQkFBUUMsS0FBRSxJQUFJLEVBQUUsS0FBS0QsR0FBRSxNQUFNLEdBQUVFLEtBQUUsR0FBRUUsS0FBRUgsR0FBRSxRQUFPQyxLQUFFRSxJQUFFRixLQUFJLENBQUFELEdBQUVDLEVBQUMsSUFBRUYsR0FBRSxXQUFXRSxFQUFDO0FBQUUsaUJBQU9EO0FBQUEsUUFBQyxHQUFFLEVBQUUsYUFBVyxTQUFTRCxJQUFFQyxJQUFFO0FBQUMsY0FBSUMsSUFBRUUsSUFBRUMsSUFBRUMsSUFBRSxJQUFFTCxNQUFHRCxHQUFFLFFBQU8sSUFBRSxJQUFJLE1BQU0sSUFBRSxDQUFDO0FBQUUsZUFBSUUsS0FBRUUsS0FBRSxHQUFFRixLQUFFLElBQUcsTUFBSUcsS0FBRUwsR0FBRUUsSUFBRyxLQUFHLElBQUksR0FBRUUsSUFBRyxJQUFFQztBQUFBLG1CQUFVLEtBQUdDLEtBQUUsRUFBRUQsRUFBQyxHQUFHLEdBQUVELElBQUcsSUFBRSxPQUFNRixNQUFHSSxLQUFFO0FBQUEsZUFBTTtBQUFDLGlCQUFJRCxNQUFHLE1BQUlDLEtBQUUsS0FBRyxNQUFJQSxLQUFFLEtBQUcsR0FBRSxJQUFFQSxNQUFHSixLQUFFLElBQUcsQ0FBQUcsS0FBRUEsTUFBRyxJQUFFLEtBQUdMLEdBQUVFLElBQUcsR0FBRUk7QUFBSSxnQkFBRUEsS0FBRSxFQUFFRixJQUFHLElBQUUsUUFBTUMsS0FBRSxRQUFNLEVBQUVELElBQUcsSUFBRUMsTUFBR0EsTUFBRyxPQUFNLEVBQUVELElBQUcsSUFBRSxRQUFNQyxNQUFHLEtBQUcsTUFBSyxFQUFFRCxJQUFHLElBQUUsUUFBTSxPQUFLQztBQUFBLFVBQUU7QUFBQyxpQkFBTyxFQUFFLEdBQUVELEVBQUM7QUFBQSxRQUFDLEdBQUUsRUFBRSxhQUFXLFNBQVNKLElBQUVDLElBQUU7QUFBQyxjQUFJQztBQUFFLGdCQUFLRCxLQUFFQSxNQUFHRCxHQUFFLFVBQVFBLEdBQUUsV0FBU0MsS0FBRUQsR0FBRSxTQUFRRSxLQUFFRCxLQUFFLEdBQUUsS0FBR0MsTUFBRyxRQUFNLE1BQUlGLEdBQUVFLEVBQUMsS0FBSSxDQUFBQTtBQUFJLGlCQUFPQSxLQUFFLElBQUVELEtBQUUsTUFBSUMsS0FBRUQsS0FBRUMsS0FBRSxFQUFFRixHQUFFRSxFQUFDLENBQUMsSUFBRUQsS0FBRUMsS0FBRUQ7QUFBQSxRQUFDO0FBQUEsTUFBQyxHQUFFLEVBQUMsWUFBVyxHQUFFLENBQUMsR0FBRSxJQUFHLENBQUMsU0FBUyxHQUFFLEdBQUUsR0FBRTtBQUFDO0FBQWEsVUFBRSxVQUFRLFNBQVNELElBQUVDLElBQUVDLElBQUUsR0FBRTtBQUFDLG1CQUFRLElBQUUsUUFBTUYsS0FBRSxHQUFFLElBQUVBLE9BQUksS0FBRyxRQUFNLEdBQUUsSUFBRSxHQUFFLE1BQUlFLE1BQUc7QUFBQyxpQkFBSUEsTUFBRyxJQUFFLE1BQUlBLEtBQUUsTUFBSUEsSUFBRSxJQUFFLEtBQUcsSUFBRSxJQUFFRCxHQUFFLEdBQUcsSUFBRSxLQUFHLEdBQUUsRUFBRSxJQUFHO0FBQUMsaUJBQUcsT0FBTSxLQUFHO0FBQUEsVUFBSztBQUFDLGlCQUFPLElBQUUsS0FBRyxLQUFHO0FBQUEsUUFBQztBQUFBLE1BQUMsR0FBRSxDQUFDLENBQUMsR0FBRSxJQUFHLENBQUMsU0FBUyxHQUFFLEdBQUUsR0FBRTtBQUFDO0FBQWEsVUFBRSxVQUFRLEVBQUMsWUFBVyxHQUFFLGlCQUFnQixHQUFFLGNBQWEsR0FBRSxjQUFhLEdBQUUsVUFBUyxHQUFFLFNBQVEsR0FBRSxTQUFRLEdBQUUsTUFBSyxHQUFFLGNBQWEsR0FBRSxhQUFZLEdBQUUsU0FBUSxJQUFHLGdCQUFlLElBQUcsY0FBYSxJQUFHLGFBQVksSUFBRyxrQkFBaUIsR0FBRSxjQUFhLEdBQUUsb0JBQW1CLEdBQUUsdUJBQXNCLElBQUcsWUFBVyxHQUFFLGdCQUFlLEdBQUUsT0FBTSxHQUFFLFNBQVEsR0FBRSxvQkFBbUIsR0FBRSxVQUFTLEdBQUUsUUFBTyxHQUFFLFdBQVUsR0FBRSxZQUFXLEVBQUM7QUFBQSxNQUFDLEdBQUUsQ0FBQyxDQUFDLEdBQUUsSUFBRyxDQUFDLFNBQVMsR0FBRSxHQUFFLEdBQUU7QUFBQztBQUFhLFlBQUksS0FBRSxXQUFVO0FBQUMsbUJBQVFELElBQUVDLEtBQUUsQ0FBQyxHQUFFQyxLQUFFLEdBQUVBLEtBQUUsS0FBSUEsTUFBSTtBQUFDLFlBQUFGLEtBQUVFO0FBQUUscUJBQVEsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFJLENBQUFGLEtBQUUsSUFBRUEsS0FBRSxhQUFXQSxPQUFJLElBQUVBLE9BQUk7QUFBRSxZQUFBQyxHQUFFQyxFQUFDLElBQUVGO0FBQUEsVUFBQztBQUFDLGlCQUFPQztBQUFBLFFBQUMsR0FBRTtBQUFFLFVBQUUsVUFBUSxTQUFTRCxJQUFFQyxJQUFFQyxJQUFFLEdBQUU7QUFBQyxjQUFJLElBQUUsR0FBRSxJQUFFLElBQUVBO0FBQUUsVUFBQUYsTUFBRztBQUFHLG1CQUFRLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBSSxDQUFBQSxLQUFFQSxPQUFJLElBQUUsRUFBRSxPQUFLQSxLQUFFQyxHQUFFLENBQUMsRUFBRTtBQUFFLGlCQUFNLEtBQUdEO0FBQUEsUUFBQztBQUFBLE1BQUMsR0FBRSxDQUFDLENBQUMsR0FBRSxJQUFHLENBQUMsU0FBUyxHQUFFLEdBQUUsR0FBRTtBQUFDO0FBQWEsWUFBSSxHQUFFLElBQUUsRUFBRSxpQkFBaUIsR0FBRSxJQUFFLEVBQUUsU0FBUyxHQUFFLElBQUUsRUFBRSxXQUFXLEdBQUUsSUFBRSxFQUFFLFNBQVMsR0FBRSxJQUFFLEVBQUUsWUFBWSxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsSUFBRyxJQUFFLElBQUcsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsS0FBSSxJQUFFLElBQUcsSUFBRSxJQUFHLElBQUUsSUFBRSxJQUFFLEdBQUUsSUFBRSxJQUFHLElBQUUsR0FBRSxJQUFFLEtBQUksSUFBRSxJQUFFLElBQUUsR0FBRSxJQUFFLElBQUcsSUFBRSxLQUFJLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUU7QUFBRSxpQkFBUyxFQUFFQSxJQUFFQyxJQUFFO0FBQUMsaUJBQU9ELEdBQUUsTUFBSSxFQUFFQyxFQUFDLEdBQUVBO0FBQUEsUUFBQztBQUFDLGlCQUFTLEVBQUVELElBQUU7QUFBQyxrQkFBT0EsTUFBRyxNQUFJLElBQUVBLEtBQUUsSUFBRTtBQUFBLFFBQUU7QUFBQyxpQkFBUyxFQUFFQSxJQUFFO0FBQUMsbUJBQVFDLEtBQUVELEdBQUUsUUFBTyxLQUFHLEVBQUVDLEtBQUcsQ0FBQUQsR0FBRUMsRUFBQyxJQUFFO0FBQUEsUUFBQztBQUFDLGlCQUFTLEVBQUVELElBQUU7QUFBQyxjQUFJQyxLQUFFRCxHQUFFLE9BQU1FLEtBQUVELEdBQUU7QUFBUSxVQUFBQyxLQUFFRixHQUFFLGNBQVlFLEtBQUVGLEdBQUUsWUFBVyxNQUFJRSxPQUFJLEVBQUUsU0FBU0YsR0FBRSxRQUFPQyxHQUFFLGFBQVlBLEdBQUUsYUFBWUMsSUFBRUYsR0FBRSxRQUFRLEdBQUVBLEdBQUUsWUFBVUUsSUFBRUQsR0FBRSxlQUFhQyxJQUFFRixHQUFFLGFBQVdFLElBQUVGLEdBQUUsYUFBV0UsSUFBRUQsR0FBRSxXQUFTQyxJQUFFLE1BQUlELEdBQUUsWUFBVUEsR0FBRSxjQUFZO0FBQUEsUUFBRztBQUFDLGlCQUFTLEVBQUVELElBQUVDLElBQUU7QUFBQyxZQUFFLGdCQUFnQkQsSUFBRSxLQUFHQSxHQUFFLGNBQVlBLEdBQUUsY0FBWSxJQUFHQSxHQUFFLFdBQVNBLEdBQUUsYUFBWUMsRUFBQyxHQUFFRCxHQUFFLGNBQVlBLEdBQUUsVUFBUyxFQUFFQSxHQUFFLElBQUk7QUFBQSxRQUFDO0FBQUMsaUJBQVMsRUFBRUEsSUFBRUMsSUFBRTtBQUFDLFVBQUFELEdBQUUsWUFBWUEsR0FBRSxTQUFTLElBQUVDO0FBQUEsUUFBQztBQUFDLGlCQUFTLEVBQUVELElBQUVDLElBQUU7QUFBQyxVQUFBRCxHQUFFLFlBQVlBLEdBQUUsU0FBUyxJQUFFQyxPQUFJLElBQUUsS0FBSUQsR0FBRSxZQUFZQSxHQUFFLFNBQVMsSUFBRSxNQUFJQztBQUFBLFFBQUM7QUFBQyxpQkFBUyxFQUFFRCxJQUFFQyxJQUFFO0FBQUMsY0FBSUMsSUFBRUUsSUFBRUMsS0FBRUwsR0FBRSxrQkFBaUJNLEtBQUVOLEdBQUUsVUFBU08sS0FBRVAsR0FBRSxhQUFZUSxLQUFFUixHQUFFLFlBQVdTLEtBQUVULEdBQUUsV0FBU0EsR0FBRSxTQUFPLElBQUVBLEdBQUUsWUFBVUEsR0FBRSxTQUFPLEtBQUcsR0FBRVUsS0FBRVYsR0FBRSxRQUFPVyxLQUFFWCxHQUFFLFFBQU9ZLEtBQUVaLEdBQUUsTUFBS0csS0FBRUgsR0FBRSxXQUFTLEdBQUVhLEtBQUVILEdBQUVKLEtBQUVDLEtBQUUsQ0FBQyxHQUFFTyxLQUFFSixHQUFFSixLQUFFQyxFQUFDO0FBQUUsVUFBQVAsR0FBRSxlQUFhQSxHQUFFLGVBQWFLLE9BQUksSUFBR0csS0FBRVIsR0FBRSxjQUFZUSxLQUFFUixHQUFFO0FBQVcsYUFBRTtBQUFDLGdCQUFHVSxJQUFHUixLQUFFRCxNQUFHTSxFQUFDLE1BQUlPLE1BQUdKLEdBQUVSLEtBQUVLLEtBQUUsQ0FBQyxNQUFJTSxNQUFHSCxHQUFFUixFQUFDLE1BQUlRLEdBQUVKLEVBQUMsS0FBR0ksR0FBRSxFQUFFUixFQUFDLE1BQUlRLEdBQUVKLEtBQUUsQ0FBQyxHQUFFO0FBQUMsY0FBQUEsTUFBRyxHQUFFSjtBQUFJLGlCQUFFO0FBQUEsY0FBQyxTQUFPUSxHQUFFLEVBQUVKLEVBQUMsTUFBSUksR0FBRSxFQUFFUixFQUFDLEtBQUdRLEdBQUUsRUFBRUosRUFBQyxNQUFJSSxHQUFFLEVBQUVSLEVBQUMsS0FBR1EsR0FBRSxFQUFFSixFQUFDLE1BQUlJLEdBQUUsRUFBRVIsRUFBQyxLQUFHUSxHQUFFLEVBQUVKLEVBQUMsTUFBSUksR0FBRSxFQUFFUixFQUFDLEtBQUdRLEdBQUUsRUFBRUosRUFBQyxNQUFJSSxHQUFFLEVBQUVSLEVBQUMsS0FBR1EsR0FBRSxFQUFFSixFQUFDLE1BQUlJLEdBQUUsRUFBRVIsRUFBQyxLQUFHUSxHQUFFLEVBQUVKLEVBQUMsTUFBSUksR0FBRSxFQUFFUixFQUFDLEtBQUdRLEdBQUUsRUFBRUosRUFBQyxNQUFJSSxHQUFFLEVBQUVSLEVBQUMsS0FBR0ksS0FBRUg7QUFBRyxrQkFBR0MsS0FBRSxLQUFHRCxLQUFFRyxLQUFHQSxLQUFFSCxLQUFFLEdBQUVJLEtBQUVILElBQUU7QUFBQyxvQkFBR0osR0FBRSxjQUFZQyxJQUFFTyxPQUFJRCxLQUFFSCxJQUFHO0FBQU0sZ0JBQUFTLEtBQUVILEdBQUVKLEtBQUVDLEtBQUUsQ0FBQyxHQUFFTyxLQUFFSixHQUFFSixLQUFFQyxFQUFDO0FBQUEsY0FBQztBQUFBLFlBQUM7QUFBQSxVQUFDLFVBQVFOLEtBQUVXLEdBQUVYLEtBQUVVLEVBQUMsS0FBR0YsTUFBRyxLQUFHLEVBQUVKO0FBQUcsaUJBQU9FLE1BQUdQLEdBQUUsWUFBVU8sS0FBRVAsR0FBRTtBQUFBLFFBQVM7QUFBQyxpQkFBUyxFQUFFQSxJQUFFO0FBQUMsY0FBSUMsSUFBRUMsSUFBRUUsSUFBRUMsSUFBRUMsSUFBRUMsSUFBRUMsSUFBRUMsSUFBRUMsSUFBRUMsSUFBRUMsS0FBRVosR0FBRTtBQUFPLGFBQUU7QUFBQyxnQkFBR0ssS0FBRUwsR0FBRSxjQUFZQSxHQUFFLFlBQVVBLEdBQUUsVUFBU0EsR0FBRSxZQUFVWSxNQUFHQSxLQUFFLElBQUc7QUFBQyxtQkFBSSxFQUFFLFNBQVNaLEdBQUUsUUFBT0EsR0FBRSxRQUFPWSxJQUFFQSxJQUFFLENBQUMsR0FBRVosR0FBRSxlQUFhWSxJQUFFWixHQUFFLFlBQVVZLElBQUVaLEdBQUUsZUFBYVksSUFBRVgsS0FBRUMsS0FBRUYsR0FBRSxXQUFVSSxLQUFFSixHQUFFLEtBQUssRUFBRUMsRUFBQyxHQUFFRCxHQUFFLEtBQUtDLEVBQUMsSUFBRVcsTUFBR1IsS0FBRUEsS0FBRVEsS0FBRSxHQUFFLEVBQUVWLEtBQUc7QUFBQyxtQkFBSUQsS0FBRUMsS0FBRVUsSUFBRVIsS0FBRUosR0FBRSxLQUFLLEVBQUVDLEVBQUMsR0FBRUQsR0FBRSxLQUFLQyxFQUFDLElBQUVXLE1BQUdSLEtBQUVBLEtBQUVRLEtBQUUsR0FBRSxFQUFFVixLQUFHO0FBQUMsY0FBQUcsTUFBR087QUFBQSxZQUFDO0FBQUMsZ0JBQUcsTUFBSVosR0FBRSxLQUFLLFNBQVM7QUFBTSxnQkFBR08sS0FBRVAsR0FBRSxNQUFLUSxLQUFFUixHQUFFLFFBQU9TLEtBQUVULEdBQUUsV0FBU0EsR0FBRSxXQUFVVSxLQUFFTCxJQUFFTSxLQUFFLFFBQU9BLEtBQUVKLEdBQUUsVUFBU0csS0FBRUMsT0FBSUEsS0FBRUQsS0FBR1IsS0FBRSxNQUFJUyxLQUFFLEtBQUdKLEdBQUUsWUFBVUksSUFBRSxFQUFFLFNBQVNILElBQUVELEdBQUUsT0FBTUEsR0FBRSxTQUFRSSxJQUFFRixFQUFDLEdBQUUsTUFBSUYsR0FBRSxNQUFNLE9BQUtBLEdBQUUsUUFBTSxFQUFFQSxHQUFFLE9BQU1DLElBQUVHLElBQUVGLEVBQUMsSUFBRSxNQUFJRixHQUFFLE1BQU0sU0FBT0EsR0FBRSxRQUFNLEVBQUVBLEdBQUUsT0FBTUMsSUFBRUcsSUFBRUYsRUFBQyxJQUFHRixHQUFFLFdBQVNJLElBQUVKLEdBQUUsWUFBVUksSUFBRUEsS0FBR1gsR0FBRSxhQUFXRSxJQUFFRixHQUFFLFlBQVVBLEdBQUUsVUFBUSxFQUFFLE1BQUlNLEtBQUVOLEdBQUUsV0FBU0EsR0FBRSxRQUFPQSxHQUFFLFFBQU1BLEdBQUUsT0FBT00sRUFBQyxHQUFFTixHQUFFLFNBQU9BLEdBQUUsU0FBT0EsR0FBRSxhQUFXQSxHQUFFLE9BQU9NLEtBQUUsQ0FBQyxLQUFHTixHQUFFLFdBQVVBLEdBQUUsV0FBU0EsR0FBRSxTQUFPQSxHQUFFLFNBQU9BLEdBQUUsYUFBV0EsR0FBRSxPQUFPTSxLQUFFLElBQUUsQ0FBQyxLQUFHTixHQUFFLFdBQVVBLEdBQUUsS0FBS00sS0FBRU4sR0FBRSxNQUFNLElBQUVBLEdBQUUsS0FBS0EsR0FBRSxLQUFLLEdBQUVBLEdBQUUsS0FBS0EsR0FBRSxLQUFLLElBQUVNLElBQUVBLE1BQUlOLEdBQUUsVUFBUyxFQUFFQSxHQUFFLFlBQVVBLEdBQUUsU0FBTyxNQUFLO0FBQUEsVUFBQyxTQUFPQSxHQUFFLFlBQVUsS0FBRyxNQUFJQSxHQUFFLEtBQUs7QUFBQSxRQUFTO0FBQUMsaUJBQVMsRUFBRUEsSUFBRUMsSUFBRTtBQUFDLG1CQUFRQyxJQUFFRSxRQUFJO0FBQUMsZ0JBQUdKLEdBQUUsWUFBVSxHQUFFO0FBQUMsa0JBQUcsRUFBRUEsRUFBQyxHQUFFQSxHQUFFLFlBQVUsS0FBR0MsT0FBSSxFQUFFLFFBQU87QUFBRSxrQkFBRyxNQUFJRCxHQUFFLFVBQVU7QUFBQSxZQUFLO0FBQUMsZ0JBQUdFLEtBQUUsR0FBRUYsR0FBRSxhQUFXLE1BQUlBLEdBQUUsU0FBT0EsR0FBRSxTQUFPQSxHQUFFLGFBQVdBLEdBQUUsT0FBT0EsR0FBRSxXQUFTLElBQUUsQ0FBQyxLQUFHQSxHQUFFLFdBQVVFLEtBQUVGLEdBQUUsS0FBS0EsR0FBRSxXQUFTQSxHQUFFLE1BQU0sSUFBRUEsR0FBRSxLQUFLQSxHQUFFLEtBQUssR0FBRUEsR0FBRSxLQUFLQSxHQUFFLEtBQUssSUFBRUEsR0FBRSxXQUFVLE1BQUlFLE1BQUdGLEdBQUUsV0FBU0UsTUFBR0YsR0FBRSxTQUFPLE1BQUlBLEdBQUUsZUFBYSxFQUFFQSxJQUFFRSxFQUFDLElBQUdGLEdBQUUsZ0JBQWMsRUFBRSxLQUFHSSxLQUFFLEVBQUUsVUFBVUosSUFBRUEsR0FBRSxXQUFTQSxHQUFFLGFBQVlBLEdBQUUsZUFBYSxDQUFDLEdBQUVBLEdBQUUsYUFBV0EsR0FBRSxjQUFhQSxHQUFFLGdCQUFjQSxHQUFFLGtCQUFnQkEsR0FBRSxhQUFXLEdBQUU7QUFBQyxtQkFBSUEsR0FBRSxnQkFBZUEsR0FBRSxZQUFXQSxHQUFFLFNBQU9BLEdBQUUsU0FBT0EsR0FBRSxhQUFXQSxHQUFFLE9BQU9BLEdBQUUsV0FBUyxJQUFFLENBQUMsS0FBR0EsR0FBRSxXQUFVRSxLQUFFRixHQUFFLEtBQUtBLEdBQUUsV0FBU0EsR0FBRSxNQUFNLElBQUVBLEdBQUUsS0FBS0EsR0FBRSxLQUFLLEdBQUVBLEdBQUUsS0FBS0EsR0FBRSxLQUFLLElBQUVBLEdBQUUsVUFBUyxLQUFHLEVBQUVBLEdBQUUsZUFBYztBQUFDLGNBQUFBLEdBQUU7QUFBQSxZQUFVLE1BQU0sQ0FBQUEsR0FBRSxZQUFVQSxHQUFFLGNBQWFBLEdBQUUsZUFBYSxHQUFFQSxHQUFFLFFBQU1BLEdBQUUsT0FBT0EsR0FBRSxRQUFRLEdBQUVBLEdBQUUsU0FBT0EsR0FBRSxTQUFPQSxHQUFFLGFBQVdBLEdBQUUsT0FBT0EsR0FBRSxXQUFTLENBQUMsS0FBR0EsR0FBRTtBQUFBLGdCQUFlLENBQUFJLEtBQUUsRUFBRSxVQUFVSixJQUFFLEdBQUVBLEdBQUUsT0FBT0EsR0FBRSxRQUFRLENBQUMsR0FBRUEsR0FBRSxhQUFZQSxHQUFFO0FBQVcsZ0JBQUdJLE9BQUksRUFBRUosSUFBRSxLQUFFLEdBQUUsTUFBSUEsR0FBRSxLQUFLLFdBQVcsUUFBTztBQUFBLFVBQUM7QUFBQyxpQkFBT0EsR0FBRSxTQUFPQSxHQUFFLFdBQVMsSUFBRSxJQUFFQSxHQUFFLFdBQVMsSUFBRSxHQUFFQyxPQUFJLEtBQUcsRUFBRUQsSUFBRSxJQUFFLEdBQUUsTUFBSUEsR0FBRSxLQUFLLFlBQVUsSUFBRSxLQUFHQSxHQUFFLGFBQVcsRUFBRUEsSUFBRSxLQUFFLEdBQUUsTUFBSUEsR0FBRSxLQUFLLGFBQVcsSUFBRTtBQUFBLFFBQUM7QUFBQyxpQkFBUyxFQUFFQSxJQUFFQyxJQUFFO0FBQUMsbUJBQVFDLElBQUVFLElBQUVDLFFBQUk7QUFBQyxnQkFBR0wsR0FBRSxZQUFVLEdBQUU7QUFBQyxrQkFBRyxFQUFFQSxFQUFDLEdBQUVBLEdBQUUsWUFBVSxLQUFHQyxPQUFJLEVBQUUsUUFBTztBQUFFLGtCQUFHLE1BQUlELEdBQUUsVUFBVTtBQUFBLFlBQUs7QUFBQyxnQkFBR0UsS0FBRSxHQUFFRixHQUFFLGFBQVcsTUFBSUEsR0FBRSxTQUFPQSxHQUFFLFNBQU9BLEdBQUUsYUFBV0EsR0FBRSxPQUFPQSxHQUFFLFdBQVMsSUFBRSxDQUFDLEtBQUdBLEdBQUUsV0FBVUUsS0FBRUYsR0FBRSxLQUFLQSxHQUFFLFdBQVNBLEdBQUUsTUFBTSxJQUFFQSxHQUFFLEtBQUtBLEdBQUUsS0FBSyxHQUFFQSxHQUFFLEtBQUtBLEdBQUUsS0FBSyxJQUFFQSxHQUFFLFdBQVVBLEdBQUUsY0FBWUEsR0FBRSxjQUFhQSxHQUFFLGFBQVdBLEdBQUUsYUFBWUEsR0FBRSxlQUFhLElBQUUsR0FBRSxNQUFJRSxNQUFHRixHQUFFLGNBQVlBLEdBQUUsa0JBQWdCQSxHQUFFLFdBQVNFLE1BQUdGLEdBQUUsU0FBTyxNQUFJQSxHQUFFLGVBQWEsRUFBRUEsSUFBRUUsRUFBQyxHQUFFRixHQUFFLGdCQUFjLE1BQUksTUFBSUEsR0FBRSxZQUFVQSxHQUFFLGlCQUFlLEtBQUcsT0FBS0EsR0FBRSxXQUFTQSxHQUFFLGlCQUFlQSxHQUFFLGVBQWEsSUFBRSxLQUFJQSxHQUFFLGVBQWEsS0FBR0EsR0FBRSxnQkFBY0EsR0FBRSxhQUFZO0FBQUMsbUJBQUlLLEtBQUVMLEdBQUUsV0FBU0EsR0FBRSxZQUFVLEdBQUVJLEtBQUUsRUFBRSxVQUFVSixJQUFFQSxHQUFFLFdBQVMsSUFBRUEsR0FBRSxZQUFXQSxHQUFFLGNBQVksQ0FBQyxHQUFFQSxHQUFFLGFBQVdBLEdBQUUsY0FBWSxHQUFFQSxHQUFFLGVBQWEsR0FBRSxFQUFFQSxHQUFFLFlBQVVLLE9BQUlMLEdBQUUsU0FBT0EsR0FBRSxTQUFPQSxHQUFFLGFBQVdBLEdBQUUsT0FBT0EsR0FBRSxXQUFTLElBQUUsQ0FBQyxLQUFHQSxHQUFFLFdBQVVFLEtBQUVGLEdBQUUsS0FBS0EsR0FBRSxXQUFTQSxHQUFFLE1BQU0sSUFBRUEsR0FBRSxLQUFLQSxHQUFFLEtBQUssR0FBRUEsR0FBRSxLQUFLQSxHQUFFLEtBQUssSUFBRUEsR0FBRSxXQUFVLEtBQUcsRUFBRUEsR0FBRSxjQUFhO0FBQUMsa0JBQUdBLEdBQUUsa0JBQWdCLEdBQUVBLEdBQUUsZUFBYSxJQUFFLEdBQUVBLEdBQUUsWUFBV0ksT0FBSSxFQUFFSixJQUFFLEtBQUUsR0FBRSxNQUFJQSxHQUFFLEtBQUssV0FBVyxRQUFPO0FBQUEsWUFBQyxXQUFTQSxHQUFFLGlCQUFnQjtBQUFDLG1CQUFJSSxLQUFFLEVBQUUsVUFBVUosSUFBRSxHQUFFQSxHQUFFLE9BQU9BLEdBQUUsV0FBUyxDQUFDLENBQUMsTUFBSSxFQUFFQSxJQUFFLEtBQUUsR0FBRUEsR0FBRSxZQUFXQSxHQUFFLGFBQVksTUFBSUEsR0FBRSxLQUFLLFVBQVUsUUFBTztBQUFBLFlBQUMsTUFBTSxDQUFBQSxHQUFFLGtCQUFnQixHQUFFQSxHQUFFLFlBQVdBLEdBQUU7QUFBQSxVQUFXO0FBQUMsaUJBQU9BLEdBQUUsb0JBQWtCSSxLQUFFLEVBQUUsVUFBVUosSUFBRSxHQUFFQSxHQUFFLE9BQU9BLEdBQUUsV0FBUyxDQUFDLENBQUMsR0FBRUEsR0FBRSxrQkFBZ0IsSUFBR0EsR0FBRSxTQUFPQSxHQUFFLFdBQVMsSUFBRSxJQUFFQSxHQUFFLFdBQVMsSUFBRSxHQUFFQyxPQUFJLEtBQUcsRUFBRUQsSUFBRSxJQUFFLEdBQUUsTUFBSUEsR0FBRSxLQUFLLFlBQVUsSUFBRSxLQUFHQSxHQUFFLGFBQVcsRUFBRUEsSUFBRSxLQUFFLEdBQUUsTUFBSUEsR0FBRSxLQUFLLGFBQVcsSUFBRTtBQUFBLFFBQUM7QUFBQyxpQkFBUyxFQUFFQSxJQUFFQyxJQUFFQyxJQUFFRSxJQUFFQyxJQUFFO0FBQUMsZUFBSyxjQUFZTCxJQUFFLEtBQUssV0FBU0MsSUFBRSxLQUFLLGNBQVlDLElBQUUsS0FBSyxZQUFVRSxJQUFFLEtBQUssT0FBS0M7QUFBQSxRQUFDO0FBQUMsaUJBQVMsSUFBRztBQUFDLGVBQUssT0FBSyxNQUFLLEtBQUssU0FBTyxHQUFFLEtBQUssY0FBWSxNQUFLLEtBQUssbUJBQWlCLEdBQUUsS0FBSyxjQUFZLEdBQUUsS0FBSyxVQUFRLEdBQUUsS0FBSyxPQUFLLEdBQUUsS0FBSyxTQUFPLE1BQUssS0FBSyxVQUFRLEdBQUUsS0FBSyxTQUFPLEdBQUUsS0FBSyxhQUFXLElBQUcsS0FBSyxTQUFPLEdBQUUsS0FBSyxTQUFPLEdBQUUsS0FBSyxTQUFPLEdBQUUsS0FBSyxTQUFPLE1BQUssS0FBSyxjQUFZLEdBQUUsS0FBSyxPQUFLLE1BQUssS0FBSyxPQUFLLE1BQUssS0FBSyxRQUFNLEdBQUUsS0FBSyxZQUFVLEdBQUUsS0FBSyxZQUFVLEdBQUUsS0FBSyxZQUFVLEdBQUUsS0FBSyxhQUFXLEdBQUUsS0FBSyxjQUFZLEdBQUUsS0FBSyxlQUFhLEdBQUUsS0FBSyxhQUFXLEdBQUUsS0FBSyxrQkFBZ0IsR0FBRSxLQUFLLFdBQVMsR0FBRSxLQUFLLGNBQVksR0FBRSxLQUFLLFlBQVUsR0FBRSxLQUFLLGNBQVksR0FBRSxLQUFLLG1CQUFpQixHQUFFLEtBQUssaUJBQWUsR0FBRSxLQUFLLFFBQU0sR0FBRSxLQUFLLFdBQVMsR0FBRSxLQUFLLGFBQVcsR0FBRSxLQUFLLGFBQVcsR0FBRSxLQUFLLFlBQVUsSUFBSSxFQUFFLE1BQU0sSUFBRSxDQUFDLEdBQUUsS0FBSyxZQUFVLElBQUksRUFBRSxNQUFNLEtBQUcsSUFBRSxJQUFFLEVBQUUsR0FBRSxLQUFLLFVBQVEsSUFBSSxFQUFFLE1BQU0sS0FBRyxJQUFFLElBQUUsRUFBRSxHQUFFLEVBQUUsS0FBSyxTQUFTLEdBQUUsRUFBRSxLQUFLLFNBQVMsR0FBRSxFQUFFLEtBQUssT0FBTyxHQUFFLEtBQUssU0FBTyxNQUFLLEtBQUssU0FBTyxNQUFLLEtBQUssVUFBUSxNQUFLLEtBQUssV0FBUyxJQUFJLEVBQUUsTUFBTSxJQUFFLENBQUMsR0FBRSxLQUFLLE9BQUssSUFBSSxFQUFFLE1BQU0sSUFBRSxJQUFFLENBQUMsR0FBRSxFQUFFLEtBQUssSUFBSSxHQUFFLEtBQUssV0FBUyxHQUFFLEtBQUssV0FBUyxHQUFFLEtBQUssUUFBTSxJQUFJLEVBQUUsTUFBTSxJQUFFLElBQUUsQ0FBQyxHQUFFLEVBQUUsS0FBSyxLQUFLLEdBQUUsS0FBSyxRQUFNLEdBQUUsS0FBSyxjQUFZLEdBQUUsS0FBSyxXQUFTLEdBQUUsS0FBSyxRQUFNLEdBQUUsS0FBSyxVQUFRLEdBQUUsS0FBSyxhQUFXLEdBQUUsS0FBSyxV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QUFNLEdBQUUsRUFBRUksSUFBRSxFQUFFLEdBQUUsRUFBRUEsSUFBRSxHQUFHLEdBQUUsRUFBRUEsSUFBRSxDQUFDLEdBQUVBLEdBQUUsVUFBUSxFQUFFQSxLQUFHQSxHQUFFLE9BQU8sT0FBSyxJQUFFLE1BQUlBLEdBQUUsT0FBTyxPQUFLLElBQUUsTUFBSUEsR0FBRSxPQUFPLFFBQU0sSUFBRSxNQUFJQSxHQUFFLE9BQU8sT0FBSyxJQUFFLE1BQUlBLEdBQUUsT0FBTyxVQUFRLEtBQUcsRUFBRSxHQUFFLEVBQUVBLElBQUUsTUFBSUEsR0FBRSxPQUFPLElBQUksR0FBRSxFQUFFQSxJQUFFQSxHQUFFLE9BQU8sUUFBTSxJQUFFLEdBQUcsR0FBRSxFQUFFQSxJQUFFQSxHQUFFLE9BQU8sUUFBTSxLQUFHLEdBQUcsR0FBRSxFQUFFQSxJQUFFQSxHQUFFLE9BQU8sUUFBTSxLQUFHLEdBQUcsR0FBRSxFQUFFQSxJQUFFLE1BQUlBLEdBQUUsUUFBTSxJQUFFLEtBQUdBLEdBQUUsWUFBVUEsR0FBRSxRQUFNLElBQUUsSUFBRSxDQUFDLEdBQUUsRUFBRUEsSUFBRSxNQUFJQSxHQUFFLE9BQU8sRUFBRSxHQUFFQSxHQUFFLE9BQU8sU0FBT0EsR0FBRSxPQUFPLE1BQU0sV0FBUyxFQUFFQSxJQUFFLE1BQUlBLEdBQUUsT0FBTyxNQUFNLE1BQU0sR0FBRSxFQUFFQSxJQUFFQSxHQUFFLE9BQU8sTUFBTSxVQUFRLElBQUUsR0FBRyxJQUFHQSxHQUFFLE9BQU8sU0FBT0osR0FBRSxRQUFNLEVBQUVBLEdBQUUsT0FBTUksR0FBRSxhQUFZQSxHQUFFLFNBQVEsQ0FBQyxJQUFHQSxHQUFFLFVBQVEsR0FBRUEsR0FBRSxTQUFPLE9BQUssRUFBRUEsSUFBRSxDQUFDLEdBQUUsRUFBRUEsSUFBRSxDQUFDLEdBQUUsRUFBRUEsSUFBRSxDQUFDLEdBQUUsRUFBRUEsSUFBRSxDQUFDLEdBQUUsRUFBRUEsSUFBRSxDQUFDLEdBQUUsRUFBRUEsSUFBRSxNQUFJQSxHQUFFLFFBQU0sSUFBRSxLQUFHQSxHQUFFLFlBQVVBLEdBQUUs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QUFBQSxvQkFBQztBQUFDLHdCQUFHLElBQUUsSUFBRyxJQUFFLE9BQUssR0FBRTtBQUFDLDBCQUFHLEtBQUcsSUFBRSxHQUFFLElBQUUsR0FBRTtBQUFDLDZCQUFJLEtBQUcsR0FBRSxFQUFFLEdBQUcsSUFBRSxFQUFFLEdBQUcsR0FBRSxFQUFFLElBQUc7QUFBQyw0QkFBRSxJQUFFLEdBQUUsSUFBRTtBQUFBLHNCQUFDO0FBQUEsb0JBQUMsV0FBUyxJQUFFLEdBQUU7QUFBQywwQkFBRyxLQUFHLElBQUUsSUFBRSxJQUFHLEtBQUcsS0FBRyxHQUFFO0FBQUMsNkJBQUksS0FBRyxHQUFFLEVBQUUsR0FBRyxJQUFFLEVBQUUsR0FBRyxHQUFFLEVBQUUsSUFBRztBQUFDLDRCQUFHLElBQUUsR0FBRSxJQUFFLEdBQUU7QUFBQywrQkFBSSxLQUFHLElBQUUsR0FBRSxFQUFFLEdBQUcsSUFBRSxFQUFFLEdBQUcsR0FBRSxFQUFFLElBQUc7QUFBQyw4QkFBRSxJQUFFLEdBQUUsSUFBRTtBQUFBLHdCQUFDO0FBQUEsc0JBQUM7QUFBQSxvQkFBQyxXQUFTLEtBQUcsSUFBRSxHQUFFLElBQUUsR0FBRTtBQUFDLDJCQUFJLEtBQUcsR0FBRSxFQUFFLEdBQUcsSUFBRSxFQUFFLEdBQUcsR0FBRSxFQUFFLElBQUc7QUFBQywwQkFBRSxJQUFFLEdBQUUsSUFBRTtBQUFBLG9CQUFDO0FBQUMsMkJBQUssSUFBRSxJQUFHLEdBQUUsR0FBRyxJQUFFLEVBQUUsR0FBRyxHQUFFLEVBQUUsR0FBRyxJQUFFLEVBQUUsR0FBRyxHQUFFLEVBQUUsR0FBRyxJQUFFLEVBQUUsR0FBRyxHQUFFLEtBQUc7QUFBRSwwQkFBSSxFQUFFLEdBQUcsSUFBRSxFQUFFLEdBQUcsR0FBRSxJQUFFLE1BQUksRUFBRSxHQUFHLElBQUUsRUFBRSxHQUFHO0FBQUEsa0JBQUcsT0FBSztBQUFDLHlCQUFJLElBQUUsSUFBRSxHQUFFLEVBQUUsR0FBRyxJQUFFLEVBQUUsR0FBRyxHQUFFLEVBQUUsR0FBRyxJQUFFLEVBQUUsR0FBRyxHQUFFLEVBQUUsR0FBRyxJQUFFLEVBQUUsR0FBRyxHQUFFLEtBQUcsS0FBRyxLQUFJO0FBQUMsMEJBQUksRUFBRSxHQUFHLElBQUUsRUFBRSxHQUFHLEdBQUUsSUFBRSxNQUFJLEVBQUUsR0FBRyxJQUFFLEVBQUUsR0FBRztBQUFBLGtCQUFHO0FBQUM7QUFBQSxnQkFBSztBQUFBLGNBQUM7QUFBQztBQUFBLFlBQUs7QUFBQSxVQUFDLFNBQU8sSUFBRSxLQUFHLElBQUU7QUFBRyxlQUFHLElBQUUsS0FBRyxHQUFFLE1BQUksTUFBSSxLQUFHLEtBQUcsTUFBSSxHQUFFRixHQUFFLFVBQVEsR0FBRUEsR0FBRSxXQUFTLEdBQUVBLEdBQUUsV0FBUyxJQUFFLElBQUUsSUFBRSxJQUFFLElBQUUsS0FBRyxJQUFFLElBQUdBLEdBQUUsWUFBVSxJQUFFLElBQUUsSUFBRSxJQUFFLE1BQUksT0FBSyxJQUFFLElBQUdFLEdBQUUsT0FBSyxHQUFFQSxHQUFFLE9BQUs7QUFBQSxRQUFDO0FBQUEsTUFBQyxHQUFFLENBQUMsQ0FBQyxHQUFFLElBQUcsQ0FBQyxTQUFTLEdBQUUsR0FBRSxHQUFFO0FBQUM7QUFBYSxZQUFJLElBQUUsRUFBRSxpQkFBaUIsR0FBRSxJQUFFLEVBQUUsV0FBVyxHQUFFLElBQUUsRUFBRSxTQUFTLEdBQUUsSUFBRSxFQUFFLFdBQVcsR0FBRSxJQUFFLEVBQUUsWUFBWSxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsSUFBRyxJQUFFLEdBQUUsSUFBRSxLQUFJLElBQUU7QUFBSSxpQkFBUyxFQUFFRixJQUFFO0FBQUMsa0JBQU9BLE9BQUksS0FBRyxRQUFNQSxPQUFJLElBQUUsV0FBUyxRQUFNQSxPQUFJLE9BQUssTUFBSUEsT0FBSTtBQUFBLFFBQUc7QUFBQyxpQkFBUyxJQUFHO0FBQUMsZUFBSyxPQUFLLEdBQUUsS0FBSyxPQUFLLE9BQUcsS0FBSyxPQUFLLEdBQUUsS0FBSyxXQUFTLE9BQUcsS0FBSyxRQUFNLEdBQUUsS0FBSyxPQUFLLEdBQUUsS0FBSyxRQUFNLEdBQUUsS0FBSyxRQUFNLEdBQUUsS0FBSyxPQUFLLE1BQUssS0FBSyxRQUFNLEdBQUUsS0FBSyxRQUFNLEdBQUUsS0FBSyxRQUFNLEdBQUUsS0FBSyxRQUFNLEdBQUUsS0FBSyxTQUFPLE1BQUssS0FBSyxPQUFLLEdBQUUsS0FBSyxPQUFLLEdBQUUsS0FBSyxTQUFPLEdBQUUsS0FBSyxTQUFPLEdBQUUsS0FBSyxRQUFNLEdBQUUsS0FBSyxVQUFRLE1BQUssS0FBSyxXQUFTLE1BQUssS0FBSyxVQUFRLEdBQUUsS0FBSyxXQUFTLEdBQUUsS0FBSyxRQUFNLEdBQUUsS0FBSyxPQUFLLEdBQUUsS0FBSyxRQUFNLEdBQUUsS0FBSyxPQUFLLEdBQUUsS0FBSyxPQUFLLE1BQUssS0FBSyxPQUFLLElBQUksRUFBRSxNQUFNLEdBQUcsR0FBRSxLQUFLLE9BQUssSUFBSSxFQUFFLE1BQU0sR0FBRyxHQUFFLEtBQUssU0FBTyxNQUFLLEtBQUssVUFBUSxNQUFLLEtBQUssT0FBSyxHQUFFLEtBQUssT0FBSyxHQUFFLEtBQUssTUFBSTtBQUFBLFFBQUM7QUFBQyxpQkFBUyxFQUFFQSxJQUFFO0FBQUMsY0FBSUM7QUFBRSxpQkFBT0QsTUFBR0EsR0FBRSxTQUFPQyxLQUFFRCxHQUFFLE9BQU1BLEdBQUUsV0FBU0EsR0FBRSxZQUFVQyxHQUFFLFFBQU0sR0FBRUQsR0FBRSxNQUFJLElBQUdDLEdBQUUsU0FBT0QsR0FBRSxRQUFNLElBQUVDLEdBQUUsT0FBTUEsR0FBRSxPQUFLLEdBQUVBLEdBQUUsT0FBSyxHQUFFQSxHQUFFLFdBQVMsR0FBRUEsR0FBRSxPQUFLLE9BQU1BLEdBQUUsT0FBSyxNQUFLQSxHQUFFLE9BQUssR0FBRUEsR0FBRSxPQUFLLEdBQUVBLEdBQUUsVUFBUUEsR0FBRSxTQUFPLElBQUksRUFBRSxNQUFNLENBQUMsR0FBRUEsR0FBRSxXQUFTQSxHQUFFLFVBQVEsSUFBSSxFQUFFLE1BQU0sQ0FBQyxHQUFFQSxHQUFFLE9BQUssR0FBRUEsR0FBRSxPQUFLLElBQUcsS0FBRztBQUFBLFFBQUM7QUFBQyxpQkFBUyxFQUFFRCxJQUFFO0FBQUMsY0FBSUM7QUFBRSxpQkFBT0QsTUFBR0EsR0FBRSxVQUFRQyxLQUFFRCxHQUFFLE9BQU8sUUFBTSxHQUFFQyxHQUFFLFFBQU0sR0FBRUEsR0FBRSxRQUFNLEdBQUUsRUFBRUQsRUFBQyxLQUFHO0FBQUEsUUFBQztBQUFDLGlCQUFTLEVBQUVBLElBQUVDLElBQUU7QUFBQyxjQUFJQyxJQUFFRTtBQUFFLGlCQUFPSixNQUFHQSxHQUFFLFNBQU9JLEtBQUVKLEdBQUUsT0FBTUMsS0FBRSxLQUFHQyxLQUFFLEdBQUVELEtBQUUsQ0FBQ0EsT0FBSUMsS0FBRSxLQUFHRCxNQUFHLElBQUdBLEtBQUUsT0FBS0EsTUFBRyxNQUFLQSxPQUFJQSxLQUFFLEtBQUcsS0FBR0EsTUFBRyxLQUFHLFNBQU9HLEdBQUUsVUFBUUEsR0FBRSxVQUFRSCxPQUFJRyxHQUFFLFNBQU8sT0FBTUEsR0FBRSxPQUFLRixJQUFFRSxHQUFFLFFBQU1ILElBQUUsRUFBRUQsRUFBQyxNQUFJO0FBQUEsUUFBQztBQUFDLGlCQUFTLEVBQUVBLElBQUVDLElBQUU7QUFBQyxjQUFJQyxJQUFFRTtBQUFFLGlCQUFPSixNQUFHSSxLQUFFLElBQUksTUFBR0osR0FBRSxRQUFNSSxJQUFHLFNBQU8sT0FBTUYsS0FBRSxFQUFFRixJQUFFQyxFQUFDLE9BQUssTUFBSUQsR0FBRSxRQUFNLE9BQU1FLE1BQUc7QUFBQSxRQUFDO0FBQUMsWUFBSSxHQUFFLEdBQUUsSUFBRTtBQUFHLGlCQUFTLEVBQUVGLElBQUU7QUFBQyxjQUFHLEdBQUU7QUFBQyxnQkFBSUM7QUFBRSxpQkFBSSxJQUFFLElBQUksRUFBRSxNQUFNLEdBQUcsR0FBRSxJQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsR0FBRUEsS0FBRSxHQUFFQSxLQUFFLE1BQUssQ0FBQUQsR0FBRSxLQUFLQyxJQUFHLElBQUU7QUFBRSxtQkFBS0EsS0FBRSxNQUFLLENBQUFELEdBQUUsS0FBS0MsSUFBRyxJQUFFO0FBQUUsbUJBQUtBLEtBQUUsTUFBSyxDQUFBRCxHQUFFLEtBQUtDLElBQUcsSUFBRTtBQUFFLG1CQUFLQSxLQUFFLE1BQUssQ0FBQUQsR0FBRSxLQUFLQyxJQUFHLElBQUU7QUFBRSxpQkFBSSxFQUFFLEdBQUVELEdBQUUsTUFBSyxHQUFFLEtBQUksR0FBRSxHQUFFQSxHQUFFLE1BQUssRUFBQyxNQUFLLEVBQUMsQ0FBQyxHQUFFQyxLQUFFLEdBQUVBLEtBQUUsS0FBSSxDQUFBRCxHQUFFLEtBQUtDLElBQUcsSUFBRTtBQUFFLGNBQUUsR0FBRUQsR0FBRSxNQUFLLEdBQUUsSUFBRyxHQUFFLEdBQUVBLEdBQUUsTUFBSyxFQUFDLE1BQUssRUFBQyxDQUFDLEdBQUUsSUFBRTtBQUFBLFVBQUU7QUFBQyxVQUFBQSxHQUFFLFVBQVEsR0FBRUEsR0FBRSxVQUFRLEdBQUVBLEdBQUUsV0FBUyxHQUFFQSxHQUFFLFdBQVM7QUFBQSxRQUFDO0FBQUMsaUJBQVMsRUFBRUEsSUFBRUMsSUFBRUMsSUFBRUUsSUFBRTtBQUFDLGNBQUlDLElBQUVDLEtBQUVOLEdBQUU7QUFBTSxpQkFBTyxTQUFPTSxHQUFFLFdBQVNBLEdBQUUsUUFBTSxLQUFHQSxHQUFFLE9BQU1BLEdBQUUsUUFBTSxHQUFFQSxHQUFFLFFBQU0sR0FBRUEsR0FBRSxTQUFPLElBQUksRUFBRSxLQUFLQSxHQUFFLEtBQUssSUFBR0YsTUFBR0UsR0FBRSxTQUFPLEVBQUUsU0FBU0EsR0FBRSxRQUFPTCxJQUFFQyxLQUFFSSxHQUFFLE9BQU1BLEdBQUUsT0FBTSxDQUFDLEdBQUVBLEdBQUUsUUFBTSxHQUFFQSxHQUFFLFFBQU1BLEdBQUUsVUFBUUYsTUFBR0MsS0FBRUMsR0FBRSxRQUFNQSxHQUFFLFdBQVNELEtBQUVELEtBQUcsRUFBRSxTQUFTRSxHQUFFLFFBQU9MLElBQUVDLEtBQUVFLElBQUVDLElBQUVDLEdBQUUsS0FBSyxJQUFHRixNQUFHQyxPQUFJLEVBQUUsU0FBU0MsR0FBRSxRQUFPTCxJQUFFQyxLQUFFRSxJQUFFQSxJQUFFLENBQUMsR0FBRUUsR0FBRSxRQUFNRixJQUFFRSxHQUFFLFFBQU1BLEdBQUUsVUFBUUEsR0FBRSxT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SSxNQUFNQSxHQUFFLEtBQUssU0FBUyxJQUFHLEVBQUUsU0FBU0EsR0FBRSxLQUFLLE9BQU1FLElBQUVFLElBQUUsR0FBRSxDQUFDLElBQUcsTUFBSUosR0FBRSxVQUFRQSxHQUFFLFFBQU0sRUFBRUEsR0FBRSxPQUFNRSxJQUFFLEdBQUVFLEVBQUMsSUFBR0UsTUFBRyxHQUFFRixNQUFHLEdBQUVKLEdBQUUsVUFBUSxJQUFHQSxHQUFFLFFBQVEsT0FBTTtBQUFFLGNBQUFBLEdBQUUsU0FBTyxHQUFFQSxHQUFFLE9BQUs7QUFBQSxZQUFFLEtBQUs7QUFBRSxrQkFBRyxPQUFLQSxHQUFFLE9BQU07QUFBQyxvQkFBRyxNQUFJTSxHQUFFLE9BQU07QUFBRSxxQkFBSSxJQUFFLEdBQUUsSUFBRUosR0FBRUUsS0FBRSxHQUFHLEdBQUVKLEdBQUUsUUFBTSxLQUFHQSxHQUFFLFNBQU8sVUFBUUEsR0FBRSxLQUFLLFFBQU0sT0FBTyxhQUFhLENBQUMsSUFBRyxLQUFHLElBQUVNLEtBQUc7QUFBQyxvQkFBRyxNQUFJTixHQUFFLFVBQVFBLEdBQUUsUUFBTSxFQUFFQSxHQUFFLE9BQU1FLElBQUUsR0FBRUUsRUFBQyxJQUFHRSxNQUFHLEdBQUVGLE1BQUcsR0FBRSxFQUFFLE9BQU07QUFBQSxjQUFDLE1BQU0sQ0FBQUosR0FBRSxTQUFPQSxHQUFFLEtBQUssT0FBSztBQUFNLGNBQUFBLEdBQUUsU0FBTyxHQUFFQSxHQUFFLE9BQUs7QUFBQSxZQUFFLEtBQUs7QUFBRSxrQkFBRyxPQUFLQSxHQUFFLE9BQU07QUFBQyxvQkFBRyxNQUFJTSxHQUFFLE9BQU07QUFBRSxxQkFBSSxJQUFFLEdBQUUsSUFBRUosR0FBRUUsS0FBRSxHQUFHLEdBQUVKLEdBQUUsUUFBTSxLQUFHQSxHQUFFLFNBQU8sVUFBUUEsR0FBRSxLQUFLLFdBQVMsT0FBTyxhQUFhLENBQUMsSUFBRyxLQUFHLElBQUVNLEtBQUc7QUFBQyxvQkFBRyxNQUFJTixHQUFFLFVBQVFBLEdBQUUsUUFBTSxFQUFFQSxHQUFFLE9BQU1FLElBQUUsR0FBRUUsRUFB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QUUsR0FBRSxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLEtBQUksS0FBSSxLQUFJLEtBQUksS0FBSSxLQUFJLEdBQUUsQ0FBQyxHQUFFLElBQUUsQ0FBQyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxFQUFFLEdBQUUsSUFBRSxDQUFDLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxLQUFJLEtBQUksS0FBSSxLQUFJLEtBQUksS0FBSSxNQUFLLE1BQUssTUFBSyxNQUFLLE1BQUssTUFBSyxNQUFLLE9BQU0sT0FBTSxPQUFNLEdBQUUsQ0FBQyxHQUFFLElBQUUsQ0FBQyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLEVBQUU7QUFBRSxVQUFFLFVBQVEsU0FBU0YsSUFBRUMsSUFBRUMsSUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxjQUFJLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLElBQUUsRUFBRSxNQUFLLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLE1BQUssSUFBRSxHQUFFLElBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxHQUFFLElBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxHQUFFLElBQUUsTUFBSyxJQUFFO0FBQUUsZUFBSSxJQUFFLEdBQUUsS0FBRyxJQUFHLElBQUksR0FBRSxDQUFDLElBQUU7QUFBRSxlQUFJLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBSSxHQUFFRCxHQUFFQyxLQUFFLENBQUMsQ0FBQztBQUFJLGVBQUksSUFBRSxHQUFFLElBQUUsSUFBRyxLQUFHLEtBQUcsTUFBSSxFQUFFLENBQUMsR0FBRSxJQUFJO0FBQUMsY0FBRyxJQUFFLE1BQUksSUFBRSxJQUFHLE1BQUksRUFBRSxRQUFPLEVBQUUsR0FBRyxJQUFFLFVBQVMsRUFBRSxHQUFHLElBQUUsVUFBUyxFQUFFLE9BQUssR0FBRTtBQUFFLGVBQUksSUFBRSxHQUFFLElBQUUsS0FBRyxNQUFJLEVBQUUsQ0FBQyxHQUFFLElBQUk7QUFBQyxlQUFJLElBQUUsTUFBSSxJQUFFLElBQUcsSUFBRSxJQUFFLEdBQUUsS0FBRyxJQUFHLElBQUksS0FBRyxNQUFJLElBQUcsS0FBRyxFQUFFLENBQUMsS0FBRyxFQUFFLFFBQU07QUFBRyxjQUFHLElBQUUsTUFBSSxNQUFJRixNQUFHLE1BQUksR0FBRyxRQUFNO0FBQUcsZUFBSSxFQUFFLENBQUMsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLElBQUcsSUFBSSxHQUFFLElBQUUsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxJQUFFLEVBQUUsQ0FBQztBQUFFLGVBQUksSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFJLE9BQUlDLEdBQUVDLEtBQUUsQ0FBQyxNQUFJLEVBQUUsRUFBRUQsR0FBRUMsS0FBRSxDQUFDLENBQUMsR0FBRyxJQUFFO0FBQUcsY0FBRyxJQUFFLE1BQUlGLE1BQUcsSUFBRSxJQUFFLEdBQUUsTUFBSSxNQUFJQSxNQUFHLElBQUUsR0FBRSxLQUFHLEtBQUksSUFBRSxHQUFFLEtBQUcsS0FBSSxRQUFNLElBQUUsR0FBRSxJQUFFLEdBQUUsS0FBSSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsSUFBRSxJQUFFLEdBQUUsSUFBRSxJQUFHLEtBQUcsSUFBRSxNQUFJLElBQUUsTUFBSSxHQUFFLE1BQUlBLE1BQUcsTUFBSSxLQUFHLE1BQUlBLE1BQUcsTUFBSSxFQUFFLFFBQU87QUFBRSxxQkFBTztBQUFDLGlCQUFJLElBQUUsSUFBRSxHQUFFLElBQUUsRUFBRSxDQUFDLElBQUUsS0FBRyxJQUFFLEdBQUUsRUFBRSxDQUFDLEtBQUcsRUFBRSxDQUFDLElBQUUsS0FBRyxJQUFFLEVBQUUsSUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFFLEVBQUUsSUFBRSxFQUFFLENBQUMsQ0FBQyxNQUFJLElBQUUsSUFBRyxJQUFHLElBQUUsS0FBRyxJQUFFLEdBQUUsSUFBRSxJQUFFLEtBQUcsR0FBRSxFQUFFLEtBQUcsS0FBRyxNQUFJLEtBQUcsRUFBRSxJQUFFLEtBQUcsS0FBRyxLQUFHLEtBQUcsSUFBRSxHQUFFLE1BQUksSUFBRztBQUFDLGlCQUFJLElBQUUsS0FBRyxJQUFFLEdBQUUsSUFBRSxJQUFHLE9BQUk7QUFBRSxnQkFBRyxNQUFJLEtBQUcsS0FBRyxJQUFFLEdBQUUsS0FBRyxLQUFHLElBQUUsR0FBRSxLQUFJLEtBQUcsRUFBRSxFQUFFLENBQUMsR0FBRTtBQUFDLGtCQUFHLE1BQUksRUFBRTtBQUFNLGtCQUFFQyxHQUFFQyxLQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQUEsWUFBQztBQUFDLGdCQUFHLElBQUUsTUFBSSxJQUFFLE9BQUssR0FBRTtBQUFDLG1CQUFJLE1BQUksTUFBSSxJQUFFLElBQUcsS0FBRyxHQUFFLElBQUUsTUFBSSxJQUFFLElBQUUsSUFBRyxJQUFFLElBQUUsS0FBRyxHQUFHLEtBQUcsRUFBRSxJQUFFLENBQUMsTUFBSSxLQUFJLE1BQUksTUFBSTtBQUFFLGtCQUFHLEtBQUcsS0FBRyxHQUFFLE1BQUlGLE1BQUcsTUFBSSxLQUFHLE1BQUlBLE1BQUcsTUFBSSxFQUFFLFFBQU87QUFBRSxnQkFBRSxJQUFFLElBQUUsQ0FBQyxJQUFFLEtBQUcsS0FBRyxLQUFHLEtBQUcsSUFBRSxJQUFFO0FBQUEsWUFBQztBQUFBLFVBQUM7QUFBQyxpQkFBTyxNQUFJLE1BQUksRUFBRSxJQUFFLENBQUMsSUFBRSxJQUFFLEtBQUcsS0FBRyxNQUFJLEtBQUcsSUFBRyxFQUFFLE9BQUssR0FBRTtBQUFBLFFBQUM7QUFBQSxNQUFDLEdBQUUsRUFBQyxtQkFBa0IsR0FBRSxDQUFDLEdBQUUsSUFBRyxDQUFDLFNBQVMsR0FBRSxHQUFFLEdBQUU7QUFBQztBQUFhLFVBQUUsVUFBUSxFQUFDLEdBQUUsbUJBQWtCLEdBQUUsY0FBYSxHQUFFLElBQUcsTUFBSyxjQUFhLE1BQUssZ0JBQWUsTUFBSyxjQUFhLE1BQUssdUJBQXNCLE1BQUssZ0JBQWUsTUFBSyx1QkFBc0I7QUFBQSxNQUFDLEdBQUUsQ0FBQyxDQUFDLEdBQUUsSUFBRyxDQUFDLFNBQVMsR0FBRSxHQUFFLEdBQUU7QUFBQztBQUFhLFlBQUksSUFBRSxFQUFFLGlCQUFpQixHQUFFLElBQUUsR0FBRSxJQUFFO0FBQUUsaUJBQVMsRUFBRUEsSUFBRTtBQUFDLG1CQUFRQyxLQUFFRCxHQUFFLFFBQU8sS0FBRyxFQUFFQyxLQUFHLENBQUFELEdBQUVDLEVBQUMsSUFBRTtBQUFBLFFBQUM7QUFBQyxZQUFJLElBQUUsR0FBRSxJQUFFLElBQUcsSUFBRSxLQUFJLElBQUUsSUFBRSxJQUFFLEdBQUUsSUFBRSxJQUFHLElBQUUsSUFBRyxJQUFFLElBQUUsSUFBRSxHQUFFLElBQUUsSUFBRyxJQUFFLElBQUcsSUFBRSxHQUFFLElBQUUsS0FBSSxJQUFFLElBQUcsSUFBRSxJQUFHLElBQUUsSUFBRyxJQUFFLENBQUMsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDLEdBQUUsSUFBRSxDQUFDLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxFQUFFLEdBQUUsSUFBRSxDQUFDLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUMsR0FBRSxJQUFFLENBQUMsSUFBRyxJQUFHLElBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLElBQUcsR0FBRSxJQUFHLEdBQUUsSUFBRyxHQUFFLElBQUcsR0FBRSxJQUFHLEdBQUUsRUFBRSxHQUFFLElBQUUsSUFBSSxNQUFNLEtBQUcsSUFBRSxFQUFFO0FBQUUsVUFBRSxDQUFDO0FBQUUsWUFBSSxJQUFFLElBQUksTUFBTSxJQUFFLENBQUM7QUFBRSxVQUFFLENBQUM7QUFBRSxZQUFJLElBQUUsSUFBSSxNQUFNLEdBQUc7QUFBRSxVQUFFLENBQUM7QUFBRSxZQUFJLElBQUUsSUFBSSxNQUFNLEdBQUc7QUFBRSxVQUFFLENBQUM7QUFBRSxZQUFJLElBQUUsSUFBSSxNQUFNLENBQUM7QUFBRSxVQUFFLENBQUM7QUFBRSxZQUFJLEdBQUUsR0FBRSxHQUFFLElBQUUsSUFBSSxNQUFNLENBQUM7QUFBRSxpQkFBUyxFQUFFRCxJQUFFQyxJQUFFQyxJQUFFRSxJQUFFQyxJQUFFO0FBQUMsZUFBSyxjQUFZTCxJQUFFLEtBQUssYUFBV0MsSUFBRSxLQUFLLGFBQVdDLElBQUUsS0FBSyxRQUFNRSxJQUFFLEtBQUssYUFBV0MsSUFBRSxLQUFLLFlBQVVMLE1BQUdBLEdBQUU7QUFBQSxRQUFNO0FBQUMsaUJBQVMsRUFBRUEsSUFBRUMsSUFBRTtBQUFDLGVBQUssV0FBU0QsSUFBRSxLQUFLLFdBQVMsR0FBRSxLQUFLLFlBQVVDO0FBQUEsUUFBQztBQUFDLGlCQUFTLEVBQUVELElBQUU7QUFB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RUFBRUEsSUFBRVEsS0FBRSxHQUFFLENBQUMsTUFBSSxFQUFFUixJQUFFLEdBQUVBLEdBQUUsT0FBTyxHQUFFLEVBQUVBLElBQUVRLEtBQUUsSUFBRyxDQUFDO0FBQUcsWUFBQUYsS0FBRUQsSUFBRUssTUFBR0YsS0FBRSxPQUFLRCxNQUFHRSxLQUFFLEtBQUksS0FBR0osT0FBSUUsTUFBR0UsS0FBRSxHQUFFLE1BQUlBLEtBQUUsR0FBRTtBQUFBLFVBQUU7QUFBQSxRQUFDO0FBQUMsVUFBRSxDQUFDO0FBQUUsWUFBSSxJQUFFO0FBQUcsaUJBQVMsRUFBRVQsSUFBRUMsSUFBRUMsSUFBRUUsSUFBRTtBQUFDLFlBQUVKLEtBQUcsS0FBRyxNQUFJSSxLQUFFLElBQUUsSUFBRyxDQUFDLElBQUUsU0FBU0osSUFBRUMsSUFBRUMsSUFBRUUsSUFBRTtBQUFDLGNBQUVKLEVBQUMsR0FBRUksT0FBSSxFQUFFSixJQUFFRSxFQUFDLEdBQUUsRUFBRUYsSUFBRSxDQUFDRSxFQUFDLElBQUcsRUFBRSxTQUFTRixHQUFFLGFBQVlBLEdBQUUsUUFBT0MsSUFBRUMsSUFBRUYsR0FBRSxPQUFPLEdBQUVBLEdBQUUsV0FBU0U7QUFBQSxVQUFDLEdBQUVGLElBQUVDLElBQUVDLElBQUUsSUFBRTtBQUFBLFFBQUM7QUFBQyxVQUFFLFdBQVMsU0FBU0YsSUFBRTtBQUFDLGlCQUFJLFdBQVU7QUFBQyxnQkFBSUEsSUFBRUMsSUFBRUMsSUFBRUUsSUFBRUMsSUFBRUMsS0FBRSxJQUFJLE1BQU0sSUFBRSxDQUFDO0FBQUUsaUJBQUlGLEtBQUVGLEtBQUUsR0FBRUUsS0FBRSxJQUFFLEdBQUVBLEtBQUksTUFBSSxFQUFFQSxFQUFDLElBQUVGLElBQUVGLEtBQUUsR0FBRUEsS0FBRSxLQUFHLEVBQUVJLEVBQUMsR0FBRUosS0FBSSxHQUFFRSxJQUFHLElBQUVFO0FBQUUsaUJBQUksRUFBRUYsS0FBRSxDQUFDLElBQUVFLElBQUVBLEtBQUVDLEtBQUUsR0FBRUQsS0FBRSxJQUFHQSxLQUFJLE1BQUksRUFBRUEsRUFBQyxJQUFFQyxJQUFFTCxLQUFFLEdBQUVBLEtBQUUsS0FBRyxFQUFFSSxFQUFDLEdBQUVKLEtBQUksR0FBRUssSUFBRyxJQUFFRDtBQUFFLGlCQUFJQyxPQUFJLEdBQUVELEtBQUUsR0FBRUEsS0FBSSxNQUFJLEVBQUVBLEVBQUMsSUFBRUMsTUFBRyxHQUFFTCxLQUFFLEdBQUVBLEtBQUUsS0FBRyxFQUFFSSxFQUFDLElBQUUsR0FBRUosS0FBSSxHQUFFLE1BQUlLLElBQUcsSUFBRUQ7QUFBRSxpQkFBSUgsS0FBRSxHQUFFQSxNQUFHLEdBQUVBLEtBQUksQ0FBQUssR0FBRUwsRUFBQyxJQUFFO0FBQUUsaUJBQUlELEtBQUUsR0FBRUEsTUFBRyxNQUFLLEdBQUUsSUFBRUEsS0FBRSxDQUFDLElBQUUsR0FBRUEsTUFBSU0sR0FBRSxDQUFDO0FBQUksbUJBQUtOLE1BQUcsTUFBSyxHQUFFLElBQUVBLEtBQUUsQ0FBQyxJQUFFLEdBQUVBLE1BQUlNLEdBQUUsQ0FBQztBQUFJLG1CQUFLTixNQUFHLE1BQUssR0FBRSxJQUFFQSxLQUFFLENBQUMsSUFBRSxHQUFFQSxNQUFJTSxHQUFFLENBQUM7QUFBSSxtQkFBS04sTUFBRyxNQUFLLEdBQUUsSUFBRUEsS0FBRSxDQUFDLElBQUUsR0FBRUEsTUFBSU0sR0FBRSxDQUFDO0FBQUksaUJBQUksRUFBRSxHQUFFLElBQUUsR0FBRUEsRUFBQyxHQUFFTixLQUFFLEdBQUVBLEtBQUUsR0FBRUEsS0FBSSxHQUFFLElBQUVBLEtBQUUsQ0FBQyxJQUFFLEdBQUUsRUFBRSxJQUFFQSxFQUFDLElBQUUsRUFBRUEsSUFBRSxDQUFDO0FBQUUsZ0JBQUUsSUFBSSxFQUFFLEdBQUUsR0FBRSxJQUFFLEdBQUUsR0FBRSxDQUFDLEdBQUUsSUFBRSxJQUFJLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDLEdBQUUsSUFBRSxJQUFJLEVBQUUsSUFBSSxNQUFNLENBQUMsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsVUFBQyxHQUFFLEdBQUUsSUFBRSxPQUFJQSxHQUFFLFNBQU8sSUFBSSxFQUFFQSxHQUFFLFdBQVUsQ0FBQyxHQUFFQSxHQUFFLFNBQU8sSUFBSSxFQUFFQSxHQUFFLFdBQVUsQ0FBQyxHQUFFQSxHQUFFLFVBQVEsSUFBSSxFQUFFQSxHQUFFLFNBQVEsQ0FBQyxHQUFFQSxHQUFFLFNBQU8sR0FBRUEsR0FBRSxXQUFTLEdBQUUsRUFBRUEsRUFBQztBQUFBLFFBQUMsR0FBRSxFQUFFLG1CQUFpQixHQUFFLEVBQUUsa0JBQWdCLFNBQVNBLElBQUVDLElBQUVDLElBQUVFLElBQUU7QUFBQyxjQUFJQyxJQUFFQyxJQUFFQyxLQUFFO0FBQUUsY0FBRVAsR0FBRSxTQUFPLE1BQUlBLEdBQUUsS0FBSyxjQUFZQSxHQUFFLEtBQUssYUFBVSxTQUFTQSxJQUFFO0FBQUMsZ0JBQUlDLElBQUVDLEtBQUU7QUFBVyxpQkFBSUQsS0FBRSxHQUFFQSxNQUFHLElBQUdBLE1BQUlDLFFBQUssRUFBRSxLQUFHLElBQUVBLE1BQUcsTUFBSUYsR0FBRSxVQUFVLElBQUVDLEVBQUMsRUFBRSxRQUFPO0FBQUUsZ0JBQUcsTUFBSUQsR0FBRSxVQUFVLEVBQUUsS0FBRyxNQUFJQSxHQUFFLFVBQVUsRUFBRSxLQUFHLE1BQUlBLEdBQUUsVUFBVSxFQUFFLEVBQUUsUUFBTztBQUFFLGlCQUFJQyxLQUFFLElBQUdBLEtBQUUsR0FBRUEsS0FBSSxLQUFHLE1BQUlELEdBQUUsVUFBVSxJQUFFQyxFQUFDLEVBQUUsUUFBTztBQUFFLG1CQUFPO0FBQUEsVUFBQyxHQUFFRCxFQUFDLElBQUcsRUFBRUEsSUFBRUEsR0FBRSxNQUFNLEdBQUUsRUFBRUEsSUFBRUEsR0FBRSxNQUFNLEdBQUVPLE1BQUUsU0FBU1AsSUFBRTtBQUFDLGdCQUFJQztBQUFFLGlCQUFJLEVBQUVELElBQUVBLEdBQUUsV0FBVUEsR0FBRSxPQUFPLFFBQVEsR0FBRSxFQUFFQSxJQUFFQSxHQUFFLFdBQVVBLEdBQUUsT0FBTyxRQUFRLEdBQUUsRUFBRUEsSUFBRUEsR0FBRSxPQUFPLEdBQUVDLEtBQUUsSUFBRSxHQUFFLEtBQUdBLE1BQUcsTUFBSUQsR0FBRSxRQUFRLElBQUUsRUFBRUMsRUFBQyxJQUFFLENBQUMsR0FBRUEsS0FBSTtBQUFDLG1CQUFPRCxHQUFFLFdBQVMsS0FBR0MsS0FBRSxLQUFHLElBQUUsSUFBRSxHQUFFQTtBQUFBLFVBQUMsR0FBRUQsRUFBQyxHQUFFSyxLQUFFTCxHQUFFLFVBQVEsSUFBRSxNQUFJLElBQUdNLEtBQUVOLEdBQUUsYUFBVyxJQUFFLE1BQUksTUFBSUssT0FBSUEsS0FBRUMsT0FBSUQsS0FBRUMsS0FBRUosS0FBRSxHQUFFQSxLQUFFLEtBQUdHLE1BQUcsT0FBS0osS0FBRSxFQUFFRCxJQUFFQyxJQUFFQyxJQUFFRSxFQUFDLElBQUUsTUFBSUosR0FBRSxZQUFVTSxPQUFJRCxNQUFHLEVBQUVMLElBQUUsS0FBR0ksS0FBRSxJQUFFLElBQUcsQ0FBQyxHQUFFLEVBQUVKLElBQUUsR0FBRSxDQUFDLE1BQUksRUFBRUEsSUFBRSxLQUFHSSxLQUFFLElBQUUsSUFBRyxDQUFDLElBQUUsU0FBU0osSUFBRUMsSUFBRUMsSUFBRUUsSUFBRTtBQUFDLGdCQUFJQztBQUFFLGlCQUFJLEVBQUVMLElBQUVDLEtBQUUsS0FBSSxDQUFDLEdBQUUsRUFBRUQsSUFBRUUsS0FBRSxHQUFFLENBQUMsR0FBRSxFQUFFRixJQUFFSSxLQUFFLEdBQUUsQ0FBQyxHQUFFQyxLQUFFLEdBQUVBLEtBQUVELElBQUVDLEtBQUksR0FBRUwsSUFBRUEsR0FBRSxRQUFRLElBQUUsRUFBRUssRUFBQyxJQUFFLENBQUMsR0FBRSxDQUFDO0FBQUUsY0FBRUwsSUFBRUEsR0FBRSxXQUFVQyxLQUFFLENBQUMsR0FBRSxFQUFFRCxJQUFFQSxHQUFFLFdBQVVFLEtBQUUsQ0FBQztBQUFBLFVBQUMsR0FBRUYsSUFBRUEsR0FBRSxPQUFPLFdBQVMsR0FBRUEsR0FBRSxPQUFPLFdBQVMsR0FBRU8sS0FBRSxDQUFDLEdBQUUsRUFBRVAsSUFBRUEsR0FBRSxXQUFVQSxHQUFFLFNBQVMsSUFBRyxFQUFFQSxFQUFDLEdBQUVJLE1BQUcsRUFBRUosRUFBQztBQUFBLFFB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O0FBQ1osZ0JBQVEsTUFBTSxzQ0FBc0MsS0FBSztBQUN6RCxlQUFPLFFBQVEsa0JBQWtCLFFBQVEsS0FBSyxDQUFDLEVBQUU7QUFDakQsZUFBTyxZQUFZLEtBQUs7QUFBQSxNQUMxQjtBQUFBLElBQ0YsQ0FBQyxDQUFDO0FBQUEsRUFDTjtBQUFBLEVBQ0EsVUFBZ0I7QUFBRSxTQUFLLFVBQVUsTUFBTTtBQUFBLEVBQUc7QUFDNUM7QUFDQSxTQUFTLFFBQVEsT0FBd0I7QUFBRSxTQUFPLGlCQUFpQixRQUFRLE1BQU0sVUFBVTtBQUFpQjsiLAogICJuYW1lcyI6IFsibW9kdWxlIiwgImUiLCAidCIsICJyIiwgImMiLCAibiIsICJpIiwgInMiLCAiYSIsICJvIiwgImgiLCAidSIsICJsIiwgImYiLCAiZCIsICJwIiwgIm0iLCAiaW1wb3J0X29ic2lkaWFuIiwgIm1hbmlmZXN0IiwgInJlbGVhc2UiLCAicmVzcG9uc2UiLCAiYXJjaGl2ZSIsICJkZWNsYXJlZExlbmd0aCIsICJKU1ppcCIsICJqc29uIiwgInBhcmVudCJdCn0K
