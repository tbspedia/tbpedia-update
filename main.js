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
  if (typeof input.Collection !== "string" || !/^V[1-9]\d*$/.test(input.Collection)) throw new Error("Collection must be a version such as V1.");
  for (const field of REQUIRED_STRING_FIELDS) if (typeof input[field] !== "string" || !input[field].trim()) throw new Error(`Manifest field ${field} is invalid.`);
  if (!isRecord(input.collection) || !isCollectionPart(input.collection.language, "code") || !isCollectionPart(input.collection.series, "id") || !isCollectionPart(input.collection.edition, "id")) throw new Error("Collection identity is invalid.");
  const collection = input.collection;
  const releaseKey = [collection.language.code, collection.series.id, collection.edition.id].join("-").toLowerCase();
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
function isCollectionPart(value, identity) {
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
  async check() {
    const manifest = await this.getReleaseManifest();
    this.assertCompatible(manifest);
    const data = this.getData();
    await this.saveData({
      ...data,
      seriesId: manifest.collection.series.id,
      editionId: manifest.collection.edition.id,
      installed: { ...data.installed, ownedFiles: migrateOwnedFiles(data.installed.ownedFiles, data.installed, manifest) }
    });
    const releases = this.missingReleases(manifest);
    return releases.length ? { manifest, releases } : null;
  }
  async getReleaseManifest() {
    const language = this.getData().languageCode;
    if (!language) throw new Error("This vault\u2019s Tbpedia collection language is missing. Configure languageCode in the plugin\u2019s data.json first.");
    const edition = this.getData().editionId;
    const manifest = await this.fetchManifest(language, this.getData().seriesId, edition, this.getData().Collection);
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
    const key = [manifest.collection.language.code, manifest.collection.series.id, manifest.collection.edition.id].join("-").toLowerCase();
    if (!installed.releaseVersion.startsWith(`${key}-`) && !/^\d{4}\./.test(installed.releaseVersion)) {
      return ids;
    }
    for (const release of manifest.releases) if (compareReleaseVersions(release.releaseVersion, installed.releaseVersion) <= 0) ids.add(release.releaseId);
    return ids;
  }
  async fetchManifest(language, series, edition, collection) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(series)) throw new Error("The configured Tbpedia series ID is invalid.");
    if (edition !== "standard" && edition !== "advanced") throw new Error("Choose a supported Tbpedia edition in the plugin settings.");
    if (!/^V[1-9]\d*$/.test(collection)) throw new Error("The configured Collection must be a version such as V1.");
    const response = await (0, import_obsidian.requestUrl)({ url: `${MANIFEST_BASE_URL}/${language.toLowerCase()}/${series}/${edition}/${collection}/latest.json`, method: "GET", throw: false });
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
    if (manifest.collection.language.code !== data.languageCode || manifest.collection.series.id !== data.seriesId || manifest.collection.edition.id !== data.editionId || manifest.Collection !== data.Collection) {
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
    const expected = new Set(release.files.filter((file) => file.change !== "-").map((file) => file.path));
    const actual = [];
    let totalUncompressed = 0;
    for (const entry of Object.values(zip.files)) {
      const entryName = entry.dir ? entry.name.replace(/\/$/, "") : entry.name;
      if (entryName) assertManagedPath(entryName);
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
    const deletions = [...new Set(plan.deletions)];
    for (const path of plan.writes) {
      await assertNoReparsePoints(this.app, path);
      if (await adapter.exists(path)) {
        if ((await adapter.stat(path))?.type === "folder") throw new Error(`Refusing to replace a local folder: ${path}`);
        if (!owned.has(path)) {
          progress(`Waiting for overwrite approval: ${path}`);
          if (await confirmOverwrite(path) === "cancel") throw new Error("Update cancelled. No files in this release were changed; earlier completed releases remain installed.");
        }
      }
    }
    for (const path of deletions) {
      await assertNoReparsePoints(this.app, path);
      const managedPath = assertManagedPath(path);
      const exists = await adapter.exists(managedPath);
      if (exists && (await adapter.stat(managedPath))?.type === "folder") {
        throw new Error(`Refusing to delete a local folder: ${managedPath}`);
      }
      const isUntrackedCollectionNote = exists && managedPath.toLowerCase().endsWith(".md") && MANAGED_ROOTS.includes(managedPath.split("/")[0]);
      if (!owned.has(path) && !isUntrackedCollectionNote) {
        throw new Error(`Refusing to delete a file not owned by the prior release: ${path}`);
      }
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
      const nextOwned = { ...previous.ownedFiles, [plan.release.releaseId]: plan.release.files.map((file) => ({ ...file })) };
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

// src/main.ts
var DEFAULT_DATA = { checkForUpdatesOnStartup: true, seriesId: "reading", editionId: "standard", Collection: "V1", installed: { ownedFiles: {}, appliedReleaseIds: [] } };
var TbpediaUpdatePlugin = class extends import_obsidian2.Plugin {
  data = DEFAULT_DATA;
  updater;
  settingsTab;
  checking = false;
  installing = false;
  async onload() {
    const saved = await this.loadData() ?? {};
    this.data = { ...DEFAULT_DATA, ...saved, installed: { ownedFiles: {}, appliedReleaseIds: [], ...saved.installed } };
    this.data.installed.ownedFiles = migrateOwnedFiles(this.data.installed.ownedFiles, this.data.installed);
    this.data.baseRelease = initializeBaseRelease(this.data);
    await this.persistData(this.data);
    this.updater = new UpdateService(this.app, this.manifest.version, () => this.data, (data) => this.persistData(data));
    this.settingsTab = new TbpediaUpdateSettingsTab(this.app, this);
    this.addSettingTab(this.settingsTab);
    this.addRibbonIcon("download", "Check Tbpedia updates", () => void this.checkForUpdate());
    this.addCommand({ id: "check-for-content-update", name: "Check for content update", callback: () => void this.checkForUpdate() });
    this.app.workspace.onLayoutReady(() => {
      if (this.data.checkForUpdatesOnStartup && this.data.languageCode) void this.checkForUpdate(true);
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
      const key = `${batch.manifest.collection.language.code}/${batch.manifest.collection.series.id}/${batch.manifest.collection.edition.id}/${batch.manifest.Collection}/${latest.releaseId}`;
      if (this.data.notifiedReleaseIds?.includes(key)) return;
      await this.persistData({ ...this.data, notifiedReleaseIds: [...this.data.notifiedReleaseIds ?? [], key] });
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
      const current = await this.updater.getReleaseManifest();
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
  getReleaseManifest() {
    return this.updater.getReleaseManifest();
  }
  isReleaseInstalled(release, manifest) {
    return this.updater.isReleaseInstalled(release, manifest);
  }
  async persistData(data) {
    const { languageCode, seriesId, editionId, Collection, baseRelease, ...rest } = data;
    this.data = { languageCode, seriesId, editionId, Collection, baseRelease, ...rest };
    await this.saveData(this.data);
  }
  get interfaceLanguage() {
    return this.data.interfaceLanguage ?? this.data.languageCode;
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
  display() {
    const { containerEl } = this;
    containerEl.empty();
    const renderId = ++this.renderId;
    containerEl.createEl("h2", { text: "Tbpedia Update" });
    const tabs = containerEl.createDiv();
    tabs.setAttribute("role", "tablist");
    tabs.style.display = "flex";
    tabs.style.gap = "8px";
    tabs.style.marginBottom = "16px";
    for (const [id, label] of [["settings", "Settings"], ["releases", "Release information"]]) {
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
      void this.displayReleases(panel, renderId);
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
  hide() {
    this.renderId++;
  }
  async displayReleases(panel, renderId) {
    new import_obsidian2.Setting(panel).setName("Release information").setDesc("Releases for this vault\u2019s configured collection. Downloaded status indicates a completed installation recorded by the plugin.").addButton((button) => button.setButtonText("Refresh").onClick(() => this.display()));
    const content = panel.createDiv();
    content.setAttribute("aria-live", "polite");
    content.createEl("p", { text: "Loading release information\u2026" });
    try {
      const manifest = await this.plugin.getReleaseManifest();
      if (renderId !== this.renderId) return;
      content.empty();
      content.createEl("h3", { text: manifest.title });
      const metadata = content.createEl("dl");
      metadata.style.display = "grid";
      metadata.style.gridTemplateColumns = "max-content 1fr";
      metadata.style.columnGap = "16px";
      for (const [label, value] of [
        ["Language Code", manifest.collection.language.code],
        ["Series", manifest.collection.series.id],
        ["Edition", manifest.collection.edition.id],
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
      for (const label of ["Select", "ReleaseVersion", "Published date", "ReleaseNote: Summary", "Added", "Updated", "Removed", "Dependencies", "Downloaded"]) {
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
          release.releaseNotes.summary,
          String(release.releaseNotes.added),
          String(release.releaseNotes.updated),
          String(release.releaseNotes.removed),
          release.dependsOn === void 0 ? "All earlier releases" : release.dependsOn.length ? release.dependsOn.join(", ") : "None (independent)",
          installed ? "Yes (installed)" : "No"
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibm9kZV9tb2R1bGVzLy5wbnBtL2pzemlwQDMuMTAuMi9ub2RlX21vZHVsZXMvanN6aXAvZGlzdC9qc3ppcC5taW4uanMiLCAic3JjL21haW4udHMiLCAic3JjL3VwZGF0ZS1zZXJ2aWNlLnRzIiwgInNyYy90eXBlcy50cyIsICJzcmMvcGF0aC1wb2xpY3kudHMiLCAic3JjL21hbmlmZXN0LnRzIiwgInNyYy9vd25lcnNoaXAudHMiLCAic3JjL2Jhc2UtcmVsZWFzZS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLyohXG5cbkpTWmlwIHYzLjEwLjIgLSBBIEphdmFTY3JpcHQgY2xhc3MgZm9yIGdlbmVyYXRpbmcgYW5kIHJlYWRpbmcgemlwIGZpbGVzXG48aHR0cDovL3N0dWFydGsuY29tL2pzemlwPlxuXG4oYykgMjAwOS0yMDE2IFN0dWFydCBLbmlnaHRsZXkgPHN0dWFydCBbYXRdIHN0dWFydGsuY29tPlxuRHVhbCBsaWNlbmNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2Ugb3IgR1BMdjMuIFNlZSBodHRwczovL3Jhdy5naXRodWIuY29tL1N0dWsvanN6aXAvbWFpbi9MSUNFTlNFLm1hcmtkb3duLlxuXG5KU1ppcCB1c2VzIHRoZSBsaWJyYXJ5IHBha28gcmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIDpcbmh0dHBzOi8vZ2l0aHViLmNvbS9ub2RlY2EvcGFrby9ibG9iL21haW4vTElDRU5TRVxuKi9cblxuIWZ1bmN0aW9uKGUpe2lmKFwib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzJiZcInVuZGVmaW5lZFwiIT10eXBlb2YgbW9kdWxlKW1vZHVsZS5leHBvcnRzPWUoKTtlbHNlIGlmKFwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZClkZWZpbmUoW10sZSk7ZWxzZXsoXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdz93aW5kb3c6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIGdsb2JhbD9nbG9iYWw6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGY/c2VsZjp0aGlzKS5KU1ppcD1lKCl9fShmdW5jdGlvbigpe3JldHVybiBmdW5jdGlvbiBzKGEsbyxoKXtmdW5jdGlvbiB1KHIsZSl7aWYoIW9bcl0pe2lmKCFhW3JdKXt2YXIgdD1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFlJiZ0KXJldHVybiB0KHIsITApO2lmKGwpcmV0dXJuIGwociwhMCk7dmFyIG49bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIityK1wiJ1wiKTt0aHJvdyBuLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsbn12YXIgaT1vW3JdPXtleHBvcnRzOnt9fTthW3JdWzBdLmNhbGwoaS5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciB0PWFbcl1bMV1bZV07cmV0dXJuIHUodHx8ZSl9LGksaS5leHBvcnRzLHMsYSxvLGgpfXJldHVybiBvW3JdLmV4cG9ydHN9Zm9yKHZhciBsPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsZT0wO2U8aC5sZW5ndGg7ZSsrKXUoaFtlXSk7cmV0dXJuIHV9KHsxOltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7dmFyIGQ9ZShcIi4vdXRpbHNcIiksYz1lKFwiLi9zdXBwb3J0XCIpLHA9XCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvPVwiO3IuZW5jb2RlPWZ1bmN0aW9uKGUpe2Zvcih2YXIgdCxyLG4saSxzLGEsbyxoPVtdLHU9MCxsPWUubGVuZ3RoLGY9bCxjPVwic3RyaW5nXCIhPT1kLmdldFR5cGVPZihlKTt1PGUubGVuZ3RoOylmPWwtdSxuPWM/KHQ9ZVt1KytdLHI9dTxsP2VbdSsrXTowLHU8bD9lW3UrK106MCk6KHQ9ZS5jaGFyQ29kZUF0KHUrKykscj11PGw/ZS5jaGFyQ29kZUF0KHUrKyk6MCx1PGw/ZS5jaGFyQ29kZUF0KHUrKyk6MCksaT10Pj4yLHM9KDMmdCk8PDR8cj4+NCxhPTE8Zj8oMTUmcik8PDJ8bj4+Njo2NCxvPTI8Zj82MyZuOjY0LGgucHVzaChwLmNoYXJBdChpKStwLmNoYXJBdChzKStwLmNoYXJBdChhKStwLmNoYXJBdChvKSk7cmV0dXJuIGguam9pbihcIlwiKX0sci5kZWNvZGU9ZnVuY3Rpb24oZSl7dmFyIHQscixuLGkscyxhLG89MCxoPTAsdT1cImRhdGE6XCI7aWYoZS5zdWJzdHIoMCx1Lmxlbmd0aCk9PT11KXRocm93IG5ldyBFcnJvcihcIkludmFsaWQgYmFzZTY0IGlucHV0LCBpdCBsb29rcyBsaWtlIGEgZGF0YSB1cmwuXCIpO3ZhciBsLGY9MyooZT1lLnJlcGxhY2UoL1teQS1aYS16MC05Ky89XS9nLFwiXCIpKS5sZW5ndGgvNDtpZihlLmNoYXJBdChlLmxlbmd0aC0xKT09PXAuY2hhckF0KDY0KSYmZi0tLGUuY2hhckF0KGUubGVuZ3RoLTIpPT09cC5jaGFyQXQoNjQpJiZmLS0sZiUxIT0wKXRocm93IG5ldyBFcnJvcihcIkludmFsaWQgYmFzZTY0IGlucHV0LCBiYWQgY29udGVudCBsZW5ndGguXCIpO2ZvcihsPWMudWludDhhcnJheT9uZXcgVWludDhBcnJheSgwfGYpOm5ldyBBcnJheSgwfGYpO288ZS5sZW5ndGg7KXQ9cC5pbmRleE9mKGUuY2hhckF0KG8rKykpPDwyfChpPXAuaW5kZXhPZihlLmNoYXJBdChvKyspKSk+PjQscj0oMTUmaSk8PDR8KHM9cC5pbmRleE9mKGUuY2hhckF0KG8rKykpKT4+MixuPSgzJnMpPDw2fChhPXAuaW5kZXhPZihlLmNoYXJBdChvKyspKSksbFtoKytdPXQsNjQhPT1zJiYobFtoKytdPXIpLDY0IT09YSYmKGxbaCsrXT1uKTtyZXR1cm4gbH19LHtcIi4vc3VwcG9ydFwiOjMwLFwiLi91dGlsc1wiOjMyfV0sMjpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3ZhciBuPWUoXCIuL2V4dGVybmFsXCIpLGk9ZShcIi4vc3RyZWFtL0RhdGFXb3JrZXJcIikscz1lKFwiLi9zdHJlYW0vQ3JjMzJQcm9iZVwiKSxhPWUoXCIuL3N0cmVhbS9EYXRhTGVuZ3RoUHJvYmVcIik7ZnVuY3Rpb24gbyhlLHQscixuLGkpe3RoaXMuY29tcHJlc3NlZFNpemU9ZSx0aGlzLnVuY29tcHJlc3NlZFNpemU9dCx0aGlzLmNyYzMyPXIsdGhpcy5jb21wcmVzc2lvbj1uLHRoaXMuY29tcHJlc3NlZENvbnRlbnQ9aX1vLnByb3RvdHlwZT17Z2V0Q29udGVudFdvcmtlcjpmdW5jdGlvbigpe3ZhciBlPW5ldyBpKG4uUHJvbWlzZS5yZXNvbHZlKHRoaXMuY29tcHJlc3NlZENvbnRlbnQpKS5waXBlKHRoaXMuY29tcHJlc3Npb24udW5jb21wcmVzc1dvcmtlcigpKS5waXBlKG5ldyBhKFwiZGF0YV9sZW5ndGhcIikpLHQ9dGhpcztyZXR1cm4gZS5vbihcImVuZFwiLGZ1bmN0aW9uKCl7aWYodGhpcy5zdHJlYW1JbmZvLmRhdGFfbGVuZ3RoIT09dC51bmNvbXByZXNzZWRTaXplKXRocm93IG5ldyBFcnJvcihcIkJ1ZyA6IHVuY29tcHJlc3NlZCBkYXRhIHNpemUgbWlzbWF0Y2hcIil9KSxlfSxnZXRDb21wcmVzc2VkV29ya2VyOmZ1bmN0aW9uKCl7cmV0dXJuIG5ldyBpKG4uUHJvbWlzZS5yZXNvbHZlKHRoaXMuY29tcHJlc3NlZENvbnRlbnQpKS53aXRoU3RyZWFtSW5mbyhcImNvbXByZXNzZWRTaXplXCIsdGhpcy5jb21wcmVzc2VkU2l6ZSkud2l0aFN0cmVhbUluZm8oXCJ1bmNvbXByZXNzZWRTaXplXCIsdGhpcy51bmNvbXByZXNzZWRTaXplKS53aXRoU3RyZWFtSW5mbyhcImNyYzMyXCIsdGhpcy5jcmMzMikud2l0aFN0cmVhbUluZm8oXCJjb21wcmVzc2lvblwiLHRoaXMuY29tcHJlc3Npb24pfX0sby5jcmVhdGVXb3JrZXJGcm9tPWZ1bmN0aW9uKGUsdCxyKXtyZXR1cm4gZS5waXBlKG5ldyBzKS5waXBlKG5ldyBhKFwidW5jb21wcmVzc2VkU2l6ZVwiKSkucGlwZSh0LmNvbXByZXNzV29ya2VyKHIpKS5waXBlKG5ldyBhKFwiY29tcHJlc3NlZFNpemVcIikpLndpdGhTdHJlYW1JbmZvKFwiY29tcHJlc3Npb25cIix0KX0sdC5leHBvcnRzPW99LHtcIi4vZXh0ZXJuYWxcIjo2LFwiLi9zdHJlYW0vQ3JjMzJQcm9iZVwiOjI1LFwiLi9zdHJlYW0vRGF0YUxlbmd0aFByb2JlXCI6MjYsXCIuL3N0cmVhbS9EYXRhV29ya2VyXCI6Mjd9XSwzOltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7dmFyIG49ZShcIi4vc3RyZWFtL0dlbmVyaWNXb3JrZXJcIik7ci5TVE9SRT17bWFnaWM6XCJcXDBcXDBcIixjb21wcmVzc1dvcmtlcjpmdW5jdGlvbigpe3JldHVybiBuZXcgbihcIlNUT1JFIGNvbXByZXNzaW9uXCIpfSx1bmNvbXByZXNzV29ya2VyOmZ1bmN0aW9uKCl7cmV0dXJuIG5ldyBuKFwiU1RPUkUgZGVjb21wcmVzc2lvblwiKX19LHIuREVGTEFURT1lKFwiLi9mbGF0ZVwiKX0se1wiLi9mbGF0ZVwiOjcsXCIuL3N0cmVhbS9HZW5lcmljV29ya2VyXCI6Mjh9XSw0OltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7dmFyIG49ZShcIi4vdXRpbHNcIik7dmFyIG89ZnVuY3Rpb24oKXtmb3IodmFyIGUsdD1bXSxyPTA7cjwyNTY7cisrKXtlPXI7Zm9yKHZhciBuPTA7bjw4O24rKyllPTEmZT8zOTg4MjkyMzg0XmU+Pj4xOmU+Pj4xO3Rbcl09ZX1yZXR1cm4gdH0oKTt0LmV4cG9ydHM9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gdm9pZCAwIT09ZSYmZS5sZW5ndGg/XCJzdHJpbmdcIiE9PW4uZ2V0VHlwZU9mKGUpP2Z1bmN0aW9uKGUsdCxyLG4pe3ZhciBpPW8scz1uK3I7ZV49LTE7Zm9yKHZhciBhPW47YTxzO2ErKyllPWU+Pj44XmlbMjU1JihlXnRbYV0pXTtyZXR1cm4tMV5lfSgwfHQsZSxlLmxlbmd0aCwwKTpmdW5jdGlvbihlLHQscixuKXt2YXIgaT1vLHM9bityO2VePS0xO2Zvcih2YXIgYT1uO2E8czthKyspZT1lPj4+OF5pWzI1NSYoZV50LmNoYXJDb2RlQXQoYSkpXTtyZXR1cm4tMV5lfSgwfHQsZSxlLmxlbmd0aCwwKTowfX0se1wiLi91dGlsc1wiOjMyfV0sNTpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3IuYmFzZTY0PSExLHIuYmluYXJ5PSExLHIuZGlyPSExLHIuY3JlYXRlRm9sZGVycz0hMCxyLmRhdGU9bnVsbCxyLmNvbXByZXNzaW9uPW51bGwsci5jb21wcmVzc2lvbk9wdGlvbnM9bnVsbCxyLmNvbW1lbnQ9bnVsbCxyLnVuaXhQZXJtaXNzaW9ucz1udWxsLHIuZG9zUGVybWlzc2lvbnM9bnVsbH0se31dLDY6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt2YXIgbj1udWxsO249XCJ1bmRlZmluZWRcIiE9dHlwZW9mIFByb21pc2U/UHJvbWlzZTplKFwibGllXCIpLHQuZXhwb3J0cz17UHJvbWlzZTpufX0se2xpZTozN31dLDc6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt2YXIgbj1cInVuZGVmaW5lZFwiIT10eXBlb2YgVWludDhBcnJheSYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIFVpbnQxNkFycmF5JiZcInVuZGVmaW5lZFwiIT10eXBlb2YgVWludDMyQXJyYXksaT1lKFwicGFrb1wiKSxzPWUoXCIuL3V0aWxzXCIpLGE9ZShcIi4vc3RyZWFtL0dlbmVyaWNXb3JrZXJcIiksbz1uP1widWludDhhcnJheVwiOlwiYXJyYXlcIjtmdW5jdGlvbiBoKGUsdCl7YS5jYWxsKHRoaXMsXCJGbGF0ZVdvcmtlci9cIitlKSx0aGlzLl9wYWtvPW51bGwsdGhpcy5fcGFrb0FjdGlvbj1lLHRoaXMuX3Bha29PcHRpb25zPXQsdGhpcy5tZXRhPXt9fXIubWFnaWM9XCJcXGJcXDBcIixzLmluaGVyaXRzKGgsYSksaC5wcm90b3R5cGUucHJvY2Vzc0NodW5rPWZ1bmN0aW9uKGUpe3RoaXMubWV0YT1lLm1ldGEsbnVsbD09PXRoaXMuX3Bha28mJnRoaXMuX2NyZWF0ZVBha28oKSx0aGlzLl9wYWtvLnB1c2gocy50cmFuc2Zvcm1UbyhvLGUuZGF0YSksITEpfSxoLnByb3RvdHlwZS5mbHVzaD1mdW5jdGlvbigpe2EucHJvdG90eXBlLmZsdXNoLmNhbGwodGhpcyksbnVsbD09PXRoaXMuX3Bha28mJnRoaXMuX2NyZWF0ZVBha28oKSx0aGlzLl9wYWtvLnB1c2goW10sITApfSxoLnByb3RvdHlwZS5jbGVhblVwPWZ1bmN0aW9uKCl7YS5wcm90b3R5cGUuY2xlYW5VcC5jYWxsKHRoaXMpLHRoaXMuX3Bha289bnVsbH0saC5wcm90b3R5cGUuX2NyZWF0ZVBha289ZnVuY3Rpb24oKXt0aGlzLl9wYWtvPW5ldyBpW3RoaXMuX3Bha29BY3Rpb25dKHtyYXc6ITAsbGV2ZWw6dGhpcy5fcGFrb09wdGlvbnMubGV2ZWx8fC0xfSk7dmFyIHQ9dGhpczt0aGlzLl9wYWtvLm9uRGF0YT1mdW5jdGlvbihlKXt0LnB1c2goe2RhdGE6ZSxtZXRhOnQubWV0YX0pfX0sci5jb21wcmVzc1dvcmtlcj1mdW5jdGlvbihlKXtyZXR1cm4gbmV3IGgoXCJEZWZsYXRlXCIsZSl9LHIudW5jb21wcmVzc1dvcmtlcj1mdW5jdGlvbigpe3JldHVybiBuZXcgaChcIkluZmxhdGVcIix7fSl9fSx7XCIuL3N0cmVhbS9HZW5lcmljV29ya2VyXCI6MjgsXCIuL3V0aWxzXCI6MzIscGFrbzozOH1dLDg6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBBKGUsdCl7dmFyIHIsbj1cIlwiO2ZvcihyPTA7cjx0O3IrKyluKz1TdHJpbmcuZnJvbUNoYXJDb2RlKDI1NSZlKSxlPj4+PTg7cmV0dXJuIG59ZnVuY3Rpb24gbihlLHQscixuLGkscyl7dmFyIGEsbyxoPWUuZmlsZSx1PWUuY29tcHJlc3Npb24sbD1zIT09Ty51dGY4ZW5jb2RlLGY9SS50cmFuc2Zvcm1UbyhcInN0cmluZ1wiLHMoaC5uYW1lKSksYz1JLnRyYW5zZm9ybVRvKFwic3RyaW5nXCIsTy51dGY4ZW5jb2RlKGgubmFtZSkpLGQ9aC5jb21tZW50LHA9SS50cmFuc2Zvcm1UbyhcInN0cmluZ1wiLHMoZCkpLG09SS50cmFuc2Zvcm1UbyhcInN0cmluZ1wiLE8udXRmOGVuY29kZShkKSksXz1jLmxlbmd0aCE9PWgubmFtZS5sZW5ndGgsZz1tLmxlbmd0aCE9PWQubGVuZ3RoLGI9XCJcIix2PVwiXCIseT1cIlwiLHc9aC5kaXIsaz1oLmRhdGUseD17Y3JjMzI6MCxjb21wcmVzc2VkU2l6ZTowLHVuY29tcHJlc3NlZFNpemU6MH07dCYmIXJ8fCh4LmNyYzMyPWUuY3JjMzIseC5jb21wcmVzc2VkU2l6ZT1lLmNvbXByZXNzZWRTaXplLHgudW5jb21wcmVzc2VkU2l6ZT1lLnVuY29tcHJlc3NlZFNpemUpO3ZhciBTPTA7dCYmKFN8PTgpLGx8fCFfJiYhZ3x8KFN8PTIwNDgpO3ZhciB6PTAsQz0wO3cmJih6fD0xNiksXCJVTklYXCI9PT1pPyhDPTc5OCx6fD1mdW5jdGlvbihlLHQpe3ZhciByPWU7cmV0dXJuIGV8fChyPXQ/MTY4OTM6MzMyMDQpLCg2NTUzNSZyKTw8MTZ9KGgudW5peFBlcm1pc3Npb25zLHcpKTooQz0yMCx6fD1mdW5jdGlvbihlKXtyZXR1cm4gNjMmKGV8fDApfShoLmRvc1Blcm1pc3Npb25zKSksYT1rLmdldFVUQ0hvdXJzKCksYTw8PTYsYXw9ay5nZXRVVENNaW51dGVzKCksYTw8PTUsYXw9ay5nZXRVVENTZWNvbmRzKCkvMixvPWsuZ2V0VVRDRnVsbFllYXIoKS0xOTgwLG88PD00LG98PWsuZ2V0VVRDTW9udGgoKSsxLG88PD01LG98PWsuZ2V0VVRDRGF0ZSgpLF8mJih2PUEoMSwxKStBKEIoZiksNCkrYyxiKz1cInVwXCIrQSh2Lmxlbmd0aCwyKSt2KSxnJiYoeT1BKDEsMSkrQShCKHApLDQpK20sYis9XCJ1Y1wiK0EoeS5sZW5ndGgsMikreSk7dmFyIEU9XCJcIjtyZXR1cm4gRSs9XCJcXG5cXDBcIixFKz1BKFMsMiksRSs9dS5tYWdpYyxFKz1BKGEsMiksRSs9QShvLDIpLEUrPUEoeC5jcmMzMiw0KSxFKz1BKHguY29tcHJlc3NlZFNpemUsNCksRSs9QSh4LnVuY29tcHJlc3NlZFNpemUsNCksRSs9QShmLmxlbmd0aCwyKSxFKz1BKGIubGVuZ3RoLDIpLHtmaWxlUmVjb3JkOlIuTE9DQUxfRklMRV9IRUFERVIrRStmK2IsZGlyUmVjb3JkOlIuQ0VOVFJBTF9GSUxFX0hFQURFUitBKEMsMikrRStBKHAubGVuZ3RoLDIpK1wiXFwwXFwwXFwwXFwwXCIrQSh6LDQpK0Eobiw0KStmK2IrcH19dmFyIEk9ZShcIi4uL3V0aWxzXCIpLGk9ZShcIi4uL3N0cmVhbS9HZW5lcmljV29ya2VyXCIpLE89ZShcIi4uL3V0ZjhcIiksQj1lKFwiLi4vY3JjMzJcIiksUj1lKFwiLi4vc2lnbmF0dXJlXCIpO2Z1bmN0aW9uIHMoZSx0LHIsbil7aS5jYWxsKHRoaXMsXCJaaXBGaWxlV29ya2VyXCIpLHRoaXMuYnl0ZXNXcml0dGVuPTAsdGhpcy56aXBDb21tZW50PXQsdGhpcy56aXBQbGF0Zm9ybT1yLHRoaXMuZW5jb2RlRmlsZU5hbWU9bix0aGlzLnN0cmVhbUZpbGVzPWUsdGhpcy5hY2N1bXVsYXRlPSExLHRoaXMuY29udGVudEJ1ZmZlcj1bXSx0aGlzLmRpclJlY29yZHM9W10sdGhpcy5jdXJyZW50U291cmNlT2Zmc2V0PTAsdGhpcy5lbnRyaWVzQ291bnQ9MCx0aGlzLmN1cnJlbnRGaWxlPW51bGwsdGhpcy5fc291cmNlcz1bXX1JLmluaGVyaXRzKHMsaSkscy5wcm90b3R5cGUucHVzaD1mdW5jdGlvbihlKXt2YXIgdD1lLm1ldGEucGVyY2VudHx8MCxyPXRoaXMuZW50cmllc0NvdW50LG49dGhpcy5fc291cmNlcy5sZW5ndGg7dGhpcy5hY2N1bXVsYXRlP3RoaXMuY29udGVudEJ1ZmZlci5wdXNoKGUpOih0aGlzLmJ5dGVzV3JpdHRlbis9ZS5kYXRhLmxlbmd0aCxpLnByb3RvdHlwZS5wdXNoLmNhbGwodGhpcyx7ZGF0YTplLmRhdGEsbWV0YTp7Y3VycmVudEZpbGU6dGhpcy5jdXJyZW50RmlsZSxwZXJjZW50OnI/KHQrMTAwKihyLW4tMSkpL3I6MTAwfX0pKX0scy5wcm90b3R5cGUub3BlbmVkU291cmNlPWZ1bmN0aW9uKGUpe3RoaXMuY3VycmVudFNvdXJjZU9mZnNldD10aGlzLmJ5dGVzV3JpdHRlbix0aGlzLmN1cnJlbnRGaWxlPWUuZmlsZS5uYW1lO3ZhciB0PXRoaXMuc3RyZWFtRmlsZXMmJiFlLmZpbGUuZGlyO2lmKHQpe3ZhciByPW4oZSx0LCExLHRoaXMuY3VycmVudFNvdXJjZU9mZnNldCx0aGlzLnppcFBsYXRmb3JtLHRoaXMuZW5jb2RlRmlsZU5hbWUpO3RoaXMucHVzaCh7ZGF0YTpyLmZpbGVSZWNvcmQsbWV0YTp7cGVyY2VudDowfX0pfWVsc2UgdGhpcy5hY2N1bXVsYXRlPSEwfSxzLnByb3RvdHlwZS5jbG9zZWRTb3VyY2U9ZnVuY3Rpb24oZSl7dGhpcy5hY2N1bXVsYXRlPSExO3ZhciB0PXRoaXMuc3RyZWFtRmlsZXMmJiFlLmZpbGUuZGlyLHI9bihlLHQsITAsdGhpcy5jdXJyZW50U291cmNlT2Zmc2V0LHRoaXMuemlwUGxhdGZvcm0sdGhpcy5lbmNvZGVGaWxlTmFtZSk7aWYodGhpcy5kaXJSZWNvcmRzLnB1c2goci5kaXJSZWNvcmQpLHQpdGhpcy5wdXNoKHtkYXRhOmZ1bmN0aW9uKGUpe3JldHVybiBSLkRBVEFfREVTQ1JJUFRPUitBKGUuY3JjMzIsNCkrQShlLmNvbXByZXNzZWRTaXplLDQpK0EoZS51bmNvbXByZXNzZWRTaXplLDQpfShlKSxtZXRhOntwZXJjZW50OjEwMH19KTtlbHNlIGZvcih0aGlzLnB1c2goe2RhdGE6ci5maWxlUmVjb3JkLG1ldGE6e3BlcmNlbnQ6MH19KTt0aGlzLmNvbnRlbnRCdWZmZXIubGVuZ3RoOyl0aGlzLnB1c2godGhpcy5jb250ZW50QnVmZmVyLnNoaWZ0KCkpO3RoaXMuY3VycmVudEZpbGU9bnVsbH0scy5wcm90b3R5cGUuZmx1c2g9ZnVuY3Rpb24oKXtmb3IodmFyIGU9dGhpcy5ieXRlc1dyaXR0ZW4sdD0wO3Q8dGhpcy5kaXJSZWNvcmRzLmxlbmd0aDt0KyspdGhpcy5wdXNoKHtkYXRhOnRoaXMuZGlyUmVjb3Jkc1t0XSxtZXRhOntwZXJjZW50OjEwMH19KTt2YXIgcj10aGlzLmJ5dGVzV3JpdHRlbi1lLG49ZnVuY3Rpb24oZSx0LHIsbixpKXt2YXIgcz1JLnRyYW5zZm9ybVRvKFwic3RyaW5nXCIsaShuKSk7cmV0dXJuIFIuQ0VOVFJBTF9ESVJFQ1RPUllfRU5EK1wiXFwwXFwwXFwwXFwwXCIrQShlLDIpK0EoZSwyKStBKHQsNCkrQShyLDQpK0Eocy5sZW5ndGgsMikrc30odGhpcy5kaXJSZWNvcmRzLmxlbmd0aCxyLGUsdGhpcy56aXBDb21tZW50LHRoaXMuZW5jb2RlRmlsZU5hbWUpO3RoaXMucHVzaCh7ZGF0YTpuLG1ldGE6e3BlcmNlbnQ6MTAwfX0pfSxzLnByb3RvdHlwZS5wcmVwYXJlTmV4dFNvdXJjZT1mdW5jdGlvbigpe3RoaXMucHJldmlvdXM9dGhpcy5fc291cmNlcy5zaGlmdCgpLHRoaXMub3BlbmVkU291cmNlKHRoaXMucHJldmlvdXMuc3RyZWFtSW5mbyksdGhpcy5pc1BhdXNlZD90aGlzLnByZXZpb3VzLnBhdXNlKCk6dGhpcy5wcmV2aW91cy5yZXN1bWUoKX0scy5wcm90b3R5cGUucmVnaXN0ZXJQcmV2aW91cz1mdW5jdGlvbihlKXt0aGlzLl9zb3VyY2VzLnB1c2goZSk7dmFyIHQ9dGhpcztyZXR1cm4gZS5vbihcImRhdGFcIixmdW5jdGlvbihlKXt0LnByb2Nlc3NDaHVuayhlKX0pLGUub24oXCJlbmRcIixmdW5jdGlvbigpe3QuY2xvc2VkU291cmNlKHQucHJldmlvdXMuc3RyZWFtSW5mbyksdC5fc291cmNlcy5sZW5ndGg/dC5wcmVwYXJlTmV4dFNvdXJjZSgpOnQuZW5kKCl9KSxlLm9uKFwiZXJyb3JcIixmdW5jdGlvbihlKXt0LmVycm9yKGUpfSksdGhpc30scy5wcm90b3R5cGUucmVzdW1lPWZ1bmN0aW9uKCl7cmV0dXJuISFpLnByb3RvdHlwZS5yZXN1bWUuY2FsbCh0aGlzKSYmKCF0aGlzLnByZXZpb3VzJiZ0aGlzLl9zb3VyY2VzLmxlbmd0aD8odGhpcy5wcmVwYXJlTmV4dFNvdXJjZSgpLCEwKTp0aGlzLnByZXZpb3VzfHx0aGlzLl9zb3VyY2VzLmxlbmd0aHx8dGhpcy5nZW5lcmF0ZWRFcnJvcj92b2lkIDA6KHRoaXMuZW5kKCksITApKX0scy5wcm90b3R5cGUuZXJyb3I9ZnVuY3Rpb24oZSl7dmFyIHQ9dGhpcy5fc291cmNlcztpZighaS5wcm90b3R5cGUuZXJyb3IuY2FsbCh0aGlzLGUpKXJldHVybiExO2Zvcih2YXIgcj0wO3I8dC5sZW5ndGg7cisrKXRyeXt0W3JdLmVycm9yKGUpfWNhdGNoKGUpe31yZXR1cm4hMH0scy5wcm90b3R5cGUubG9jaz1mdW5jdGlvbigpe2kucHJvdG90eXBlLmxvY2suY2FsbCh0aGlzKTtmb3IodmFyIGU9dGhpcy5fc291cmNlcyx0PTA7dDxlLmxlbmd0aDt0KyspZVt0XS5sb2NrKCl9LHQuZXhwb3J0cz1zfSx7XCIuLi9jcmMzMlwiOjQsXCIuLi9zaWduYXR1cmVcIjoyMyxcIi4uL3N0cmVhbS9HZW5lcmljV29ya2VyXCI6MjgsXCIuLi91dGY4XCI6MzEsXCIuLi91dGlsc1wiOjMyfV0sOTpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3ZhciB1PWUoXCIuLi9jb21wcmVzc2lvbnNcIiksbj1lKFwiLi9aaXBGaWxlV29ya2VyXCIpO3IuZ2VuZXJhdGVXb3JrZXI9ZnVuY3Rpb24oZSxhLHQpe3ZhciBvPW5ldyBuKGEuc3RyZWFtRmlsZXMsdCxhLnBsYXRmb3JtLGEuZW5jb2RlRmlsZU5hbWUpLGg9MDt0cnl7ZS5mb3JFYWNoKGZ1bmN0aW9uKGUsdCl7aCsrO3ZhciByPWZ1bmN0aW9uKGUsdCl7dmFyIHI9ZXx8dCxuPXVbcl07aWYoIW4pdGhyb3cgbmV3IEVycm9yKHIrXCIgaXMgbm90IGEgdmFsaWQgY29tcHJlc3Npb24gbWV0aG9kICFcIik7cmV0dXJuIG59KHQub3B0aW9ucy5jb21wcmVzc2lvbixhLmNvbXByZXNzaW9uKSxuPXQub3B0aW9ucy5jb21wcmVzc2lvbk9wdGlvbnN8fGEuY29tcHJlc3Npb25PcHRpb25zfHx7fSxpPXQuZGlyLHM9dC5kYXRlO3QuX2NvbXByZXNzV29ya2VyKHIsbikud2l0aFN0cmVhbUluZm8oXCJmaWxlXCIse25hbWU6ZSxkaXI6aSxkYXRlOnMsY29tbWVudDp0LmNvbW1lbnR8fFwiXCIsdW5peFBlcm1pc3Npb25zOnQudW5peFBlcm1pc3Npb25zLGRvc1Blcm1pc3Npb25zOnQuZG9zUGVybWlzc2lvbnN9KS5waXBlKG8pfSksby5lbnRyaWVzQ291bnQ9aH1jYXRjaChlKXtvLmVycm9yKGUpfXJldHVybiBvfX0se1wiLi4vY29tcHJlc3Npb25zXCI6MyxcIi4vWmlwRmlsZVdvcmtlclwiOjh9XSwxMDpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIG4oKXtpZighKHRoaXMgaW5zdGFuY2VvZiBuKSlyZXR1cm4gbmV3IG47aWYoYXJndW1lbnRzLmxlbmd0aCl0aHJvdyBuZXcgRXJyb3IoXCJUaGUgY29uc3RydWN0b3Igd2l0aCBwYXJhbWV0ZXJzIGhhcyBiZWVuIHJlbW92ZWQgaW4gSlNaaXAgMy4wLCBwbGVhc2UgY2hlY2sgdGhlIHVwZ3JhZGUgZ3VpZGUuXCIpO3RoaXMuZmlsZXM9T2JqZWN0LmNyZWF0ZShudWxsKSx0aGlzLmNvbW1lbnQ9bnVsbCx0aGlzLnJvb3Q9XCJcIix0aGlzLmNsb25lPWZ1bmN0aW9uKCl7dmFyIGU9bmV3IG47Zm9yKHZhciB0IGluIHRoaXMpXCJmdW5jdGlvblwiIT10eXBlb2YgdGhpc1t0XSYmKGVbdF09dGhpc1t0XSk7cmV0dXJuIGV9fShuLnByb3RvdHlwZT1lKFwiLi9vYmplY3RcIikpLmxvYWRBc3luYz1lKFwiLi9sb2FkXCIpLG4uc3VwcG9ydD1lKFwiLi9zdXBwb3J0XCIpLG4uZGVmYXVsdHM9ZShcIi4vZGVmYXVsdHNcIiksbi52ZXJzaW9uPVwiMy4xMC4yXCIsbi5sb2FkQXN5bmM9ZnVuY3Rpb24oZSx0KXtyZXR1cm4obmV3IG4pLmxvYWRBc3luYyhlLHQpfSxuLmV4dGVybmFsPWUoXCIuL2V4dGVybmFsXCIpLHQuZXhwb3J0cz1ufSx7XCIuL2RlZmF1bHRzXCI6NSxcIi4vZXh0ZXJuYWxcIjo2LFwiLi9sb2FkXCI6MTEsXCIuL29iamVjdFwiOjE1LFwiLi9zdXBwb3J0XCI6MzB9XSwxMTpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3ZhciB1PWUoXCIuL3V0aWxzXCIpLGk9ZShcIi4vZXh0ZXJuYWxcIiksbj1lKFwiLi91dGY4XCIpLHM9ZShcIi4vemlwRW50cmllc1wiKSxhPWUoXCIuL3N0cmVhbS9DcmMzMlByb2JlXCIpLGw9ZShcIi4vbm9kZWpzVXRpbHNcIik7ZnVuY3Rpb24gZihuKXtyZXR1cm4gbmV3IGkuUHJvbWlzZShmdW5jdGlvbihlLHQpe3ZhciByPW4uZGVjb21wcmVzc2VkLmdldENvbnRlbnRXb3JrZXIoKS5waXBlKG5ldyBhKTtyLm9uKFwiZXJyb3JcIixmdW5jdGlvbihlKXt0KGUpfSkub24oXCJlbmRcIixmdW5jdGlvbigpe3Iuc3RyZWFtSW5mby5jcmMzMiE9PW4uZGVjb21wcmVzc2VkLmNyYzMyP3QobmV3IEVycm9yKFwiQ29ycnVwdGVkIHppcCA6IENSQzMyIG1pc21hdGNoXCIpKTplKCl9KS5yZXN1bWUoKX0pfXQuZXhwb3J0cz1mdW5jdGlvbihlLG8pe3ZhciBoPXRoaXM7cmV0dXJuIG89dS5leHRlbmQob3x8e30se2Jhc2U2NDohMSxjaGVja0NSQzMyOiExLG9wdGltaXplZEJpbmFyeVN0cmluZzohMSxjcmVhdGVGb2xkZXJzOiExLGRlY29kZUZpbGVOYW1lOm4udXRmOGRlY29kZX0pLGwuaXNOb2RlJiZsLmlzU3RyZWFtKGUpP2kuUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiSlNaaXAgY2FuJ3QgYWNjZXB0IGEgc3RyZWFtIHdoZW4gbG9hZGluZyBhIHppcCBmaWxlLlwiKSk6dS5wcmVwYXJlQ29udGVudChcInRoZSBsb2FkZWQgemlwIGZpbGVcIixlLCEwLG8ub3B0aW1pemVkQmluYXJ5U3RyaW5nLG8uYmFzZTY0KS50aGVuKGZ1bmN0aW9uKGUpe3ZhciB0PW5ldyBzKG8pO3JldHVybiB0LmxvYWQoZSksdH0pLnRoZW4oZnVuY3Rpb24oZSl7dmFyIHQ9W2kuUHJvbWlzZS5yZXNvbHZlKGUpXSxyPWUuZmlsZXM7aWYoby5jaGVja0NSQzMyKWZvcih2YXIgbj0wO248ci5sZW5ndGg7bisrKXQucHVzaChmKHJbbl0pKTtyZXR1cm4gaS5Qcm9taXNlLmFsbCh0KX0pLnRoZW4oZnVuY3Rpb24oZSl7Zm9yKHZhciB0PWUuc2hpZnQoKSxyPXQuZmlsZXMsbj0wO248ci5sZW5ndGg7bisrKXt2YXIgaT1yW25dLHM9aS5maWxlTmFtZVN0cixhPXUucmVzb2x2ZShpLmZpbGVOYW1lU3RyKTtoLmZpbGUoYSxpLmRlY29tcHJlc3NlZCx7YmluYXJ5OiEwLG9wdGltaXplZEJpbmFyeVN0cmluZzohMCxkYXRlOmkuZGF0ZSxkaXI6aS5kaXIsY29tbWVudDppLmZpbGVDb21tZW50U3RyLmxlbmd0aD9pLmZpbGVDb21tZW50U3RyOm51bGwsdW5peFBlcm1pc3Npb25zOmkudW5peFBlcm1pc3Npb25zLGRvc1Blcm1pc3Npb25zOmkuZG9zUGVybWlzc2lvbnMsY3JlYXRlRm9sZGVyczpvLmNyZWF0ZUZvbGRlcnN9KSxpLmRpcnx8KGguZmlsZShhKS51bnNhZmVPcmlnaW5hbE5hbWU9cyl9cmV0dXJuIHQuemlwQ29tbWVudC5sZW5ndGgmJihoLmNvbW1lbnQ9dC56aXBDb21tZW50KSxofSl9fSx7XCIuL2V4dGVybmFsXCI6NixcIi4vbm9kZWpzVXRpbHNcIjoxNCxcIi4vc3RyZWFtL0NyYzMyUHJvYmVcIjoyNSxcIi4vdXRmOFwiOjMxLFwiLi91dGlsc1wiOjMyLFwiLi96aXBFbnRyaWVzXCI6MzN9XSwxMjpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3ZhciBuPWUoXCIuLi91dGlsc1wiKSxpPWUoXCIuLi9zdHJlYW0vR2VuZXJpY1dvcmtlclwiKTtmdW5jdGlvbiBzKGUsdCl7aS5jYWxsKHRoaXMsXCJOb2RlanMgc3RyZWFtIGlucHV0IGFkYXB0ZXIgZm9yIFwiK2UpLHRoaXMuX3Vwc3RyZWFtRW5kZWQ9ITEsdGhpcy5fYmluZFN0cmVhbSh0KX1uLmluaGVyaXRzKHMsaSkscy5wcm90b3R5cGUuX2JpbmRTdHJlYW09ZnVuY3Rpb24oZSl7dmFyIHQ9dGhpczsodGhpcy5fc3RyZWFtPWUpLnBhdXNlKCksZS5vbihcImRhdGFcIixmdW5jdGlvbihlKXt0LnB1c2goe2RhdGE6ZSxtZXRhOntwZXJjZW50OjB9fSl9KS5vbihcImVycm9yXCIsZnVuY3Rpb24oZSl7dC5pc1BhdXNlZD90aGlzLmdlbmVyYXRlZEVycm9yPWU6dC5lcnJvcihlKX0pLm9uKFwiZW5kXCIsZnVuY3Rpb24oKXt0LmlzUGF1c2VkP3QuX3Vwc3RyZWFtRW5kZWQ9ITA6dC5lbmQoKX0pfSxzLnByb3RvdHlwZS5wYXVzZT1mdW5jdGlvbigpe3JldHVybiEhaS5wcm90b3R5cGUucGF1c2UuY2FsbCh0aGlzKSYmKHRoaXMuX3N0cmVhbS5wYXVzZSgpLCEwKX0scy5wcm90b3R5cGUucmVzdW1lPWZ1bmN0aW9uKCl7cmV0dXJuISFpLnByb3RvdHlwZS5yZXN1bWUuY2FsbCh0aGlzKSYmKHRoaXMuX3Vwc3RyZWFtRW5kZWQ/dGhpcy5lbmQoKTp0aGlzLl9zdHJlYW0ucmVzdW1lKCksITApfSx0LmV4cG9ydHM9c30se1wiLi4vc3RyZWFtL0dlbmVyaWNXb3JrZXJcIjoyOCxcIi4uL3V0aWxzXCI6MzJ9XSwxMzpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3ZhciBpPWUoXCJyZWFkYWJsZS1zdHJlYW1cIikuUmVhZGFibGU7ZnVuY3Rpb24gbihlLHQscil7aS5jYWxsKHRoaXMsdCksdGhpcy5faGVscGVyPWU7dmFyIG49dGhpcztlLm9uKFwiZGF0YVwiLGZ1bmN0aW9uKGUsdCl7bi5wdXNoKGUpfHxuLl9oZWxwZXIucGF1c2UoKSxyJiZyKHQpfSkub24oXCJlcnJvclwiLGZ1bmN0aW9uKGUpe24uZW1pdChcImVycm9yXCIsZSl9KS5vbihcImVuZFwiLGZ1bmN0aW9uKCl7bi5wdXNoKG51bGwpfSl9ZShcIi4uL3V0aWxzXCIpLmluaGVyaXRzKG4saSksbi5wcm90b3R5cGUuX3JlYWQ9ZnVuY3Rpb24oKXt0aGlzLl9oZWxwZXIucmVzdW1lKCl9LHQuZXhwb3J0cz1ufSx7XCIuLi91dGlsc1wiOjMyLFwicmVhZGFibGUtc3RyZWFtXCI6MTZ9XSwxNDpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3QuZXhwb3J0cz17aXNOb2RlOlwidW5kZWZpbmVkXCIhPXR5cGVvZiBCdWZmZXIsbmV3QnVmZmVyRnJvbTpmdW5jdGlvbihlLHQpe2lmKEJ1ZmZlci5mcm9tJiZCdWZmZXIuZnJvbSE9PVVpbnQ4QXJyYXkuZnJvbSlyZXR1cm4gQnVmZmVyLmZyb20oZSx0KTtpZihcIm51bWJlclwiPT10eXBlb2YgZSl0aHJvdyBuZXcgRXJyb3IoJ1RoZSBcImRhdGFcIiBhcmd1bWVudCBtdXN0IG5vdCBiZSBhIG51bWJlcicpO3JldHVybiBuZXcgQnVmZmVyKGUsdCl9LGFsbG9jQnVmZmVyOmZ1bmN0aW9uKGUpe2lmKEJ1ZmZlci5hbGxvYylyZXR1cm4gQnVmZmVyLmFsbG9jKGUpO3ZhciB0PW5ldyBCdWZmZXIoZSk7cmV0dXJuIHQuZmlsbCgwKSx0fSxpc0J1ZmZlcjpmdW5jdGlvbihlKXtyZXR1cm4gQnVmZmVyLmlzQnVmZmVyKGUpfSxpc1N0cmVhbTpmdW5jdGlvbihlKXtyZXR1cm4gZSYmXCJmdW5jdGlvblwiPT10eXBlb2YgZS5vbiYmXCJmdW5jdGlvblwiPT10eXBlb2YgZS5wYXVzZSYmXCJmdW5jdGlvblwiPT10eXBlb2YgZS5yZXN1bWV9fX0se31dLDE1OltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcyhlLHQscil7dmFyIG4saT11LmdldFR5cGVPZih0KSxzPXUuZXh0ZW5kKHJ8fHt9LGYpO3MuZGF0ZT1zLmRhdGV8fG5ldyBEYXRlLG51bGwhPT1zLmNvbXByZXNzaW9uJiYocy5jb21wcmVzc2lvbj1zLmNvbXByZXNzaW9uLnRvVXBwZXJDYXNlKCkpLFwic3RyaW5nXCI9PXR5cGVvZiBzLnVuaXhQZXJtaXNzaW9ucyYmKHMudW5peFBlcm1pc3Npb25zPXBhcnNlSW50KHMudW5peFBlcm1pc3Npb25zLDgpKSxzLnVuaXhQZXJtaXNzaW9ucyYmMTYzODQmcy51bml4UGVybWlzc2lvbnMmJihzLmRpcj0hMCkscy5kb3NQZXJtaXNzaW9ucyYmMTYmcy5kb3NQZXJtaXNzaW9ucyYmKHMuZGlyPSEwKSxzLmRpciYmKGU9ZyhlKSkscy5jcmVhdGVGb2xkZXJzJiYobj1fKGUpKSYmYi5jYWxsKHRoaXMsbiwhMCk7dmFyIGE9XCJzdHJpbmdcIj09PWkmJiExPT09cy5iaW5hcnkmJiExPT09cy5iYXNlNjQ7ciYmdm9pZCAwIT09ci5iaW5hcnl8fChzLmJpbmFyeT0hYSksKHQgaW5zdGFuY2VvZiBjJiYwPT09dC51bmNvbXByZXNzZWRTaXplfHxzLmRpcnx8IXR8fDA9PT10Lmxlbmd0aCkmJihzLmJhc2U2ND0hMSxzLmJpbmFyeT0hMCx0PVwiXCIscy5jb21wcmVzc2lvbj1cIlNUT1JFXCIsaT1cInN0cmluZ1wiKTt2YXIgbz1udWxsO289dCBpbnN0YW5jZW9mIGN8fHQgaW5zdGFuY2VvZiBsP3Q6cC5pc05vZGUmJnAuaXNTdHJlYW0odCk/bmV3IG0oZSx0KTp1LnByZXBhcmVDb250ZW50KGUsdCxzLmJpbmFyeSxzLm9wdGltaXplZEJpbmFyeVN0cmluZyxzLmJhc2U2NCk7dmFyIGg9bmV3IGQoZSxvLHMpO3RoaXMuZmlsZXNbZV09aH12YXIgaT1lKFwiLi91dGY4XCIpLHU9ZShcIi4vdXRpbHNcIiksbD1lKFwiLi9zdHJlYW0vR2VuZXJpY1dvcmtlclwiKSxhPWUoXCIuL3N0cmVhbS9TdHJlYW1IZWxwZXJcIiksZj1lKFwiLi9kZWZhdWx0c1wiKSxjPWUoXCIuL2NvbXByZXNzZWRPYmplY3RcIiksZD1lKFwiLi96aXBPYmplY3RcIiksbz1lKFwiLi9nZW5lcmF0ZVwiKSxwPWUoXCIuL25vZGVqc1V0aWxzXCIpLG09ZShcIi4vbm9kZWpzL05vZGVqc1N0cmVhbUlucHV0QWRhcHRlclwiKSxfPWZ1bmN0aW9uKGUpe1wiL1wiPT09ZS5zbGljZSgtMSkmJihlPWUuc3Vic3RyaW5nKDAsZS5sZW5ndGgtMSkpO3ZhciB0PWUubGFzdEluZGV4T2YoXCIvXCIpO3JldHVybiAwPHQ/ZS5zdWJzdHJpbmcoMCx0KTpcIlwifSxnPWZ1bmN0aW9uKGUpe3JldHVyblwiL1wiIT09ZS5zbGljZSgtMSkmJihlKz1cIi9cIiksZX0sYj1mdW5jdGlvbihlLHQpe3JldHVybiB0PXZvaWQgMCE9PXQ/dDpmLmNyZWF0ZUZvbGRlcnMsZT1nKGUpLHRoaXMuZmlsZXNbZV18fHMuY2FsbCh0aGlzLGUsbnVsbCx7ZGlyOiEwLGNyZWF0ZUZvbGRlcnM6dH0pLHRoaXMuZmlsZXNbZV19O2Z1bmN0aW9uIGgoZSl7cmV0dXJuXCJbb2JqZWN0IFJlZ0V4cF1cIj09PU9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChlKX12YXIgbj17bG9hZDpmdW5jdGlvbigpe3Rocm93IG5ldyBFcnJvcihcIlRoaXMgbWV0aG9kIGhhcyBiZWVuIHJlbW92ZWQgaW4gSlNaaXAgMy4wLCBwbGVhc2UgY2hlY2sgdGhlIHVwZ3JhZGUgZ3VpZGUuXCIpfSxmb3JFYWNoOmZ1bmN0aW9uKGUpe3ZhciB0LHIsbjtmb3IodCBpbiB0aGlzLmZpbGVzKW49dGhpcy5maWxlc1t0XSwocj10LnNsaWNlKHRoaXMucm9vdC5sZW5ndGgsdC5sZW5ndGgpKSYmdC5zbGljZSgwLHRoaXMucm9vdC5sZW5ndGgpPT09dGhpcy5yb290JiZlKHIsbil9LGZpbHRlcjpmdW5jdGlvbihyKXt2YXIgbj1bXTtyZXR1cm4gdGhpcy5mb3JFYWNoKGZ1bmN0aW9uKGUsdCl7cihlLHQpJiZuLnB1c2godCl9KSxufSxmaWxlOmZ1bmN0aW9uKGUsdCxyKXtpZigxIT09YXJndW1lbnRzLmxlbmd0aClyZXR1cm4gZT10aGlzLnJvb3QrZSxzLmNhbGwodGhpcyxlLHQsciksdGhpcztpZihoKGUpKXt2YXIgbj1lO3JldHVybiB0aGlzLmZpbHRlcihmdW5jdGlvbihlLHQpe3JldHVybiF0LmRpciYmbi50ZXN0KGUpfSl9dmFyIGk9dGhpcy5maWxlc1t0aGlzLnJvb3QrZV07cmV0dXJuIGkmJiFpLmRpcj9pOm51bGx9LGZvbGRlcjpmdW5jdGlvbihyKXtpZighcilyZXR1cm4gdGhpcztpZihoKHIpKXJldHVybiB0aGlzLmZpbHRlcihmdW5jdGlvbihlLHQpe3JldHVybiB0LmRpciYmci50ZXN0KGUpfSk7dmFyIGU9dGhpcy5yb290K3IsdD1iLmNhbGwodGhpcyxlKSxuPXRoaXMuY2xvbmUoKTtyZXR1cm4gbi5yb290PXQubmFtZSxufSxyZW1vdmU6ZnVuY3Rpb24ocil7cj10aGlzLnJvb3Qrcjt2YXIgZT10aGlzLmZpbGVzW3JdO2lmKGV8fChcIi9cIiE9PXIuc2xpY2UoLTEpJiYocis9XCIvXCIpLGU9dGhpcy5maWxlc1tyXSksZSYmIWUuZGlyKWRlbGV0ZSB0aGlzLmZpbGVzW3JdO2Vsc2UgZm9yKHZhciB0PXRoaXMuZmlsdGVyKGZ1bmN0aW9uKGUsdCl7cmV0dXJuIHQubmFtZS5zbGljZSgwLHIubGVuZ3RoKT09PXJ9KSxuPTA7bjx0Lmxlbmd0aDtuKyspZGVsZXRlIHRoaXMuZmlsZXNbdFtuXS5uYW1lXTtyZXR1cm4gdGhpc30sZ2VuZXJhdGU6ZnVuY3Rpb24oKXt0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIG1ldGhvZCBoYXMgYmVlbiByZW1vdmVkIGluIEpTWmlwIDMuMCwgcGxlYXNlIGNoZWNrIHRoZSB1cGdyYWRlIGd1aWRlLlwiKX0sZ2VuZXJhdGVJbnRlcm5hbFN0cmVhbTpmdW5jdGlvbihlKXt2YXIgdCxyPXt9O3RyeXtpZigocj11LmV4dGVuZChlfHx7fSx7c3RyZWFtRmlsZXM6ITEsY29tcHJlc3Npb246XCJTVE9SRVwiLGNvbXByZXNzaW9uT3B0aW9uczpudWxsLHR5cGU6XCJcIixwbGF0Zm9ybTpcIkRPU1wiLGNvbW1lbnQ6bnVsbCxtaW1lVHlwZTpcImFwcGxpY2F0aW9uL3ppcFwiLGVuY29kZUZpbGVOYW1lOmkudXRmOGVuY29kZX0pKS50eXBlPXIudHlwZS50b0xvd2VyQ2FzZSgpLHIuY29tcHJlc3Npb249ci5jb21wcmVzc2lvbi50b1VwcGVyQ2FzZSgpLFwiYmluYXJ5c3RyaW5nXCI9PT1yLnR5cGUmJihyLnR5cGU9XCJzdHJpbmdcIiksIXIudHlwZSl0aHJvdyBuZXcgRXJyb3IoXCJObyBvdXRwdXQgdHlwZSBzcGVjaWZpZWQuXCIpO3UuY2hlY2tTdXBwb3J0KHIudHlwZSksXCJkYXJ3aW5cIiE9PXIucGxhdGZvcm0mJlwiZnJlZWJzZFwiIT09ci5wbGF0Zm9ybSYmXCJsaW51eFwiIT09ci5wbGF0Zm9ybSYmXCJzdW5vc1wiIT09ci5wbGF0Zm9ybXx8KHIucGxhdGZvcm09XCJVTklYXCIpLFwid2luMzJcIj09PXIucGxhdGZvcm0mJihyLnBsYXRmb3JtPVwiRE9TXCIpO3ZhciBuPXIuY29tbWVudHx8dGhpcy5jb21tZW50fHxcIlwiO3Q9by5nZW5lcmF0ZVdvcmtlcih0aGlzLHIsbil9Y2F0Y2goZSl7KHQ9bmV3IGwoXCJlcnJvclwiKSkuZXJyb3IoZSl9cmV0dXJuIG5ldyBhKHQsci50eXBlfHxcInN0cmluZ1wiLHIubWltZVR5cGUpfSxnZW5lcmF0ZUFzeW5jOmZ1bmN0aW9uKGUsdCl7cmV0dXJuIHRoaXMuZ2VuZXJhdGVJbnRlcm5hbFN0cmVhbShlKS5hY2N1bXVsYXRlKHQpfSxnZW5lcmF0ZU5vZGVTdHJlYW06ZnVuY3Rpb24oZSx0KXtyZXR1cm4oZT1lfHx7fSkudHlwZXx8KGUudHlwZT1cIm5vZGVidWZmZXJcIiksdGhpcy5nZW5lcmF0ZUludGVybmFsU3RyZWFtKGUpLnRvTm9kZWpzU3RyZWFtKHQpfX07dC5leHBvcnRzPW59LHtcIi4vY29tcHJlc3NlZE9iamVjdFwiOjIsXCIuL2RlZmF1bHRzXCI6NSxcIi4vZ2VuZXJhdGVcIjo5LFwiLi9ub2RlanMvTm9kZWpzU3RyZWFtSW5wdXRBZGFwdGVyXCI6MTIsXCIuL25vZGVqc1V0aWxzXCI6MTQsXCIuL3N0cmVhbS9HZW5lcmljV29ya2VyXCI6MjgsXCIuL3N0cmVhbS9TdHJlYW1IZWxwZXJcIjoyOSxcIi4vdXRmOFwiOjMxLFwiLi91dGlsc1wiOjMyLFwiLi96aXBPYmplY3RcIjozNX1dLDE2OltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7dC5leHBvcnRzPWUoXCJzdHJlYW1cIil9LHtzdHJlYW06dm9pZCAwfV0sMTc6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt2YXIgbj1lKFwiLi9EYXRhUmVhZGVyXCIpO2Z1bmN0aW9uIGkoZSl7bi5jYWxsKHRoaXMsZSk7Zm9yKHZhciB0PTA7dDx0aGlzLmRhdGEubGVuZ3RoO3QrKyllW3RdPTI1NSZlW3RdfWUoXCIuLi91dGlsc1wiKS5pbmhlcml0cyhpLG4pLGkucHJvdG90eXBlLmJ5dGVBdD1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5kYXRhW3RoaXMuemVybytlXX0saS5wcm90b3R5cGUubGFzdEluZGV4T2ZTaWduYXR1cmU9ZnVuY3Rpb24oZSl7Zm9yKHZhciB0PWUuY2hhckNvZGVBdCgwKSxyPWUuY2hhckNvZGVBdCgxKSxuPWUuY2hhckNvZGVBdCgyKSxpPWUuY2hhckNvZGVBdCgzKSxzPXRoaXMubGVuZ3RoLTQ7MDw9czstLXMpaWYodGhpcy5kYXRhW3NdPT09dCYmdGhpcy5kYXRhW3MrMV09PT1yJiZ0aGlzLmRhdGFbcysyXT09PW4mJnRoaXMuZGF0YVtzKzNdPT09aSlyZXR1cm4gcy10aGlzLnplcm87cmV0dXJuLTF9LGkucHJvdG90eXBlLnJlYWRBbmRDaGVja1NpZ25hdHVyZT1mdW5jdGlvbihlKXt2YXIgdD1lLmNoYXJDb2RlQXQoMCkscj1lLmNoYXJDb2RlQXQoMSksbj1lLmNoYXJDb2RlQXQoMiksaT1lLmNoYXJDb2RlQXQoMykscz10aGlzLnJlYWREYXRhKDQpO3JldHVybiB0PT09c1swXSYmcj09PXNbMV0mJm49PT1zWzJdJiZpPT09c1szXX0saS5wcm90b3R5cGUucmVhZERhdGE9ZnVuY3Rpb24oZSl7aWYodGhpcy5jaGVja09mZnNldChlKSwwPT09ZSlyZXR1cm5bXTt2YXIgdD10aGlzLmRhdGEuc2xpY2UodGhpcy56ZXJvK3RoaXMuaW5kZXgsdGhpcy56ZXJvK3RoaXMuaW5kZXgrZSk7cmV0dXJuIHRoaXMuaW5kZXgrPWUsdH0sdC5leHBvcnRzPWl9LHtcIi4uL3V0aWxzXCI6MzIsXCIuL0RhdGFSZWFkZXJcIjoxOH1dLDE4OltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7dmFyIG49ZShcIi4uL3V0aWxzXCIpO2Z1bmN0aW9uIGkoZSl7dGhpcy5kYXRhPWUsdGhpcy5sZW5ndGg9ZS5sZW5ndGgsdGhpcy5pbmRleD0wLHRoaXMuemVybz0wfWkucHJvdG90eXBlPXtjaGVja09mZnNldDpmdW5jdGlvbihlKXt0aGlzLmNoZWNrSW5kZXgodGhpcy5pbmRleCtlKX0sY2hlY2tJbmRleDpmdW5jdGlvbihlKXtpZih0aGlzLmxlbmd0aDx0aGlzLnplcm8rZXx8ZTwwKXRocm93IG5ldyBFcnJvcihcIkVuZCBvZiBkYXRhIHJlYWNoZWQgKGRhdGEgbGVuZ3RoID0gXCIrdGhpcy5sZW5ndGgrXCIsIGFza2VkIGluZGV4ID0gXCIrZStcIikuIENvcnJ1cHRlZCB6aXAgP1wiKX0sc2V0SW5kZXg6ZnVuY3Rpb24oZSl7dGhpcy5jaGVja0luZGV4KGUpLHRoaXMuaW5kZXg9ZX0sc2tpcDpmdW5jdGlvbihlKXt0aGlzLnNldEluZGV4KHRoaXMuaW5kZXgrZSl9LGJ5dGVBdDpmdW5jdGlvbigpe30scmVhZEludDpmdW5jdGlvbihlKXt2YXIgdCxyPTA7Zm9yKHRoaXMuY2hlY2tPZmZzZXQoZSksdD10aGlzLmluZGV4K2UtMTt0Pj10aGlzLmluZGV4O3QtLSlyPShyPDw4KSt0aGlzLmJ5dGVBdCh0KTtyZXR1cm4gdGhpcy5pbmRleCs9ZSxyfSxyZWFkU3RyaW5nOmZ1bmN0aW9uKGUpe3JldHVybiBuLnRyYW5zZm9ybVRvKFwic3RyaW5nXCIsdGhpcy5yZWFkRGF0YShlKSl9LHJlYWREYXRhOmZ1bmN0aW9uKCl7fSxsYXN0SW5kZXhPZlNpZ25hdHVyZTpmdW5jdGlvbigpe30scmVhZEFuZENoZWNrU2lnbmF0dXJlOmZ1bmN0aW9uKCl7fSxyZWFkRGF0ZTpmdW5jdGlvbigpe3ZhciBlPXRoaXMucmVhZEludCg0KTtyZXR1cm4gbmV3IERhdGUoRGF0ZS5VVEMoMTk4MCsoZT4+MjUmMTI3KSwoZT4+MjEmMTUpLTEsZT4+MTYmMzEsZT4+MTEmMzEsZT4+NSY2MywoMzEmZSk8PDEpKX19LHQuZXhwb3J0cz1pfSx7XCIuLi91dGlsc1wiOjMyfV0sMTk6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt2YXIgbj1lKFwiLi9VaW50OEFycmF5UmVhZGVyXCIpO2Z1bmN0aW9uIGkoZSl7bi5jYWxsKHRoaXMsZSl9ZShcIi4uL3V0aWxzXCIpLmluaGVyaXRzKGksbiksaS5wcm90b3R5cGUucmVhZERhdGE9ZnVuY3Rpb24oZSl7dGhpcy5jaGVja09mZnNldChlKTt2YXIgdD10aGlzLmRhdGEuc2xpY2UodGhpcy56ZXJvK3RoaXMuaW5kZXgsdGhpcy56ZXJvK3RoaXMuaW5kZXgrZSk7cmV0dXJuIHRoaXMuaW5kZXgrPWUsdH0sdC5leHBvcnRzPWl9LHtcIi4uL3V0aWxzXCI6MzIsXCIuL1VpbnQ4QXJyYXlSZWFkZXJcIjoyMX1dLDIwOltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7dmFyIG49ZShcIi4vRGF0YVJlYWRlclwiKTtmdW5jdGlvbiBpKGUpe24uY2FsbCh0aGlzLGUpfWUoXCIuLi91dGlsc1wiKS5pbmhlcml0cyhpLG4pLGkucHJvdG90eXBlLmJ5dGVBdD1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5kYXRhLmNoYXJDb2RlQXQodGhpcy56ZXJvK2UpfSxpLnByb3RvdHlwZS5sYXN0SW5kZXhPZlNpZ25hdHVyZT1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy5kYXRhLmxhc3RJbmRleE9mKGUpLXRoaXMuemVyb30saS5wcm90b3R5cGUucmVhZEFuZENoZWNrU2lnbmF0dXJlPWZ1bmN0aW9uKGUpe3JldHVybiBlPT09dGhpcy5yZWFkRGF0YSg0KX0saS5wcm90b3R5cGUucmVhZERhdGE9ZnVuY3Rpb24oZSl7dGhpcy5jaGVja09mZnNldChlKTt2YXIgdD10aGlzLmRhdGEuc2xpY2UodGhpcy56ZXJvK3RoaXMuaW5kZXgsdGhpcy56ZXJvK3RoaXMuaW5kZXgrZSk7cmV0dXJuIHRoaXMuaW5kZXgrPWUsdH0sdC5leHBvcnRzPWl9LHtcIi4uL3V0aWxzXCI6MzIsXCIuL0RhdGFSZWFkZXJcIjoxOH1dLDIxOltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7dmFyIG49ZShcIi4vQXJyYXlSZWFkZXJcIik7ZnVuY3Rpb24gaShlKXtuLmNhbGwodGhpcyxlKX1lKFwiLi4vdXRpbHNcIikuaW5oZXJpdHMoaSxuKSxpLnByb3RvdHlwZS5yZWFkRGF0YT1mdW5jdGlvbihlKXtpZih0aGlzLmNoZWNrT2Zmc2V0KGUpLDA9PT1lKXJldHVybiBuZXcgVWludDhBcnJheSgwKTt2YXIgdD10aGlzLmRhdGEuc3ViYXJyYXkodGhpcy56ZXJvK3RoaXMuaW5kZXgsdGhpcy56ZXJvK3RoaXMuaW5kZXgrZSk7cmV0dXJuIHRoaXMuaW5kZXgrPWUsdH0sdC5leHBvcnRzPWl9LHtcIi4uL3V0aWxzXCI6MzIsXCIuL0FycmF5UmVhZGVyXCI6MTd9XSwyMjpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3ZhciBuPWUoXCIuLi91dGlsc1wiKSxpPWUoXCIuLi9zdXBwb3J0XCIpLHM9ZShcIi4vQXJyYXlSZWFkZXJcIiksYT1lKFwiLi9TdHJpbmdSZWFkZXJcIiksbz1lKFwiLi9Ob2RlQnVmZmVyUmVhZGVyXCIpLGg9ZShcIi4vVWludDhBcnJheVJlYWRlclwiKTt0LmV4cG9ydHM9ZnVuY3Rpb24oZSl7dmFyIHQ9bi5nZXRUeXBlT2YoZSk7cmV0dXJuIG4uY2hlY2tTdXBwb3J0KHQpLFwic3RyaW5nXCIhPT10fHxpLnVpbnQ4YXJyYXk/XCJub2RlYnVmZmVyXCI9PT10P25ldyBvKGUpOmkudWludDhhcnJheT9uZXcgaChuLnRyYW5zZm9ybVRvKFwidWludDhhcnJheVwiLGUpKTpuZXcgcyhuLnRyYW5zZm9ybVRvKFwiYXJyYXlcIixlKSk6bmV3IGEoZSl9fSx7XCIuLi9zdXBwb3J0XCI6MzAsXCIuLi91dGlsc1wiOjMyLFwiLi9BcnJheVJlYWRlclwiOjE3LFwiLi9Ob2RlQnVmZmVyUmVhZGVyXCI6MTksXCIuL1N0cmluZ1JlYWRlclwiOjIwLFwiLi9VaW50OEFycmF5UmVhZGVyXCI6MjF9XSwyMzpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3IuTE9DQUxfRklMRV9IRUFERVI9XCJQS1x1MDAwM1x1MDAwNFwiLHIuQ0VOVFJBTF9GSUxFX0hFQURFUj1cIlBLXHUwMDAxXHUwMDAyXCIsci5DRU5UUkFMX0RJUkVDVE9SWV9FTkQ9XCJQS1x1MDAwNVx1MDAwNlwiLHIuWklQNjRfQ0VOVFJBTF9ESVJFQ1RPUllfTE9DQVRPUj1cIlBLXHUwMDA2XHUwMDA3XCIsci5aSVA2NF9DRU5UUkFMX0RJUkVDVE9SWV9FTkQ9XCJQS1x1MDAwNlx1MDAwNlwiLHIuREFUQV9ERVNDUklQVE9SPVwiUEtcdTAwMDdcXGJcIn0se31dLDI0OltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7dmFyIG49ZShcIi4vR2VuZXJpY1dvcmtlclwiKSxpPWUoXCIuLi91dGlsc1wiKTtmdW5jdGlvbiBzKGUpe24uY2FsbCh0aGlzLFwiQ29udmVydFdvcmtlciB0byBcIitlKSx0aGlzLmRlc3RUeXBlPWV9aS5pbmhlcml0cyhzLG4pLHMucHJvdG90eXBlLnByb2Nlc3NDaHVuaz1mdW5jdGlvbihlKXt0aGlzLnB1c2goe2RhdGE6aS50cmFuc2Zvcm1Ubyh0aGlzLmRlc3RUeXBlLGUuZGF0YSksbWV0YTplLm1ldGF9KX0sdC5leHBvcnRzPXN9LHtcIi4uL3V0aWxzXCI6MzIsXCIuL0dlbmVyaWNXb3JrZXJcIjoyOH1dLDI1OltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7dmFyIG49ZShcIi4vR2VuZXJpY1dvcmtlclwiKSxpPWUoXCIuLi9jcmMzMlwiKTtmdW5jdGlvbiBzKCl7bi5jYWxsKHRoaXMsXCJDcmMzMlByb2JlXCIpLHRoaXMud2l0aFN0cmVhbUluZm8oXCJjcmMzMlwiLDApfWUoXCIuLi91dGlsc1wiKS5pbmhlcml0cyhzLG4pLHMucHJvdG90eXBlLnByb2Nlc3NDaHVuaz1mdW5jdGlvbihlKXt0aGlzLnN0cmVhbUluZm8uY3JjMzI9aShlLmRhdGEsdGhpcy5zdHJlYW1JbmZvLmNyYzMyfHwwKSx0aGlzLnB1c2goZSl9LHQuZXhwb3J0cz1zfSx7XCIuLi9jcmMzMlwiOjQsXCIuLi91dGlsc1wiOjMyLFwiLi9HZW5lcmljV29ya2VyXCI6Mjh9XSwyNjpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3ZhciBuPWUoXCIuLi91dGlsc1wiKSxpPWUoXCIuL0dlbmVyaWNXb3JrZXJcIik7ZnVuY3Rpb24gcyhlKXtpLmNhbGwodGhpcyxcIkRhdGFMZW5ndGhQcm9iZSBmb3IgXCIrZSksdGhpcy5wcm9wTmFtZT1lLHRoaXMud2l0aFN0cmVhbUluZm8oZSwwKX1uLmluaGVyaXRzKHMsaSkscy5wcm90b3R5cGUucHJvY2Vzc0NodW5rPWZ1bmN0aW9uKGUpe2lmKGUpe3ZhciB0PXRoaXMuc3RyZWFtSW5mb1t0aGlzLnByb3BOYW1lXXx8MDt0aGlzLnN0cmVhbUluZm9bdGhpcy5wcm9wTmFtZV09dCtlLmRhdGEubGVuZ3RofWkucHJvdG90eXBlLnByb2Nlc3NDaHVuay5jYWxsKHRoaXMsZSl9LHQuZXhwb3J0cz1zfSx7XCIuLi91dGlsc1wiOjMyLFwiLi9HZW5lcmljV29ya2VyXCI6Mjh9XSwyNzpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3ZhciBuPWUoXCIuLi91dGlsc1wiKSxpPWUoXCIuL0dlbmVyaWNXb3JrZXJcIik7ZnVuY3Rpb24gcyhlKXtpLmNhbGwodGhpcyxcIkRhdGFXb3JrZXJcIik7dmFyIHQ9dGhpczt0aGlzLmRhdGFJc1JlYWR5PSExLHRoaXMuaW5kZXg9MCx0aGlzLm1heD0wLHRoaXMuZGF0YT1udWxsLHRoaXMudHlwZT1cIlwiLHRoaXMuX3RpY2tTY2hlZHVsZWQ9ITEsZS50aGVuKGZ1bmN0aW9uKGUpe3QuZGF0YUlzUmVhZHk9ITAsdC5kYXRhPWUsdC5tYXg9ZSYmZS5sZW5ndGh8fDAsdC50eXBlPW4uZ2V0VHlwZU9mKGUpLHQuaXNQYXVzZWR8fHQuX3RpY2tBbmRSZXBlYXQoKX0sZnVuY3Rpb24oZSl7dC5lcnJvcihlKX0pfW4uaW5oZXJpdHMocyxpKSxzLnByb3RvdHlwZS5jbGVhblVwPWZ1bmN0aW9uKCl7aS5wcm90b3R5cGUuY2xlYW5VcC5jYWxsKHRoaXMpLHRoaXMuZGF0YT1udWxsfSxzLnByb3RvdHlwZS5yZXN1bWU9ZnVuY3Rpb24oKXtyZXR1cm4hIWkucHJvdG90eXBlLnJlc3VtZS5jYWxsKHRoaXMpJiYoIXRoaXMuX3RpY2tTY2hlZHVsZWQmJnRoaXMuZGF0YUlzUmVhZHkmJih0aGlzLl90aWNrU2NoZWR1bGVkPSEwLG4uZGVsYXkodGhpcy5fdGlja0FuZFJlcGVhdCxbXSx0aGlzKSksITApfSxzLnByb3RvdHlwZS5fdGlja0FuZFJlcGVhdD1mdW5jdGlvbigpe3RoaXMuX3RpY2tTY2hlZHVsZWQ9ITEsdGhpcy5pc1BhdXNlZHx8dGhpcy5pc0ZpbmlzaGVkfHwodGhpcy5fdGljaygpLHRoaXMuaXNGaW5pc2hlZHx8KG4uZGVsYXkodGhpcy5fdGlja0FuZFJlcGVhdCxbXSx0aGlzKSx0aGlzLl90aWNrU2NoZWR1bGVkPSEwKSl9LHMucHJvdG90eXBlLl90aWNrPWZ1bmN0aW9uKCl7aWYodGhpcy5pc1BhdXNlZHx8dGhpcy5pc0ZpbmlzaGVkKXJldHVybiExO3ZhciBlPW51bGwsdD1NYXRoLm1pbih0aGlzLm1heCx0aGlzLmluZGV4KzE2Mzg0KTtpZih0aGlzLmluZGV4Pj10aGlzLm1heClyZXR1cm4gdGhpcy5lbmQoKTtzd2l0Y2godGhpcy50eXBlKXtjYXNlXCJzdHJpbmdcIjplPXRoaXMuZGF0YS5zdWJzdHJpbmcodGhpcy5pbmRleCx0KTticmVhaztjYXNlXCJ1aW50OGFycmF5XCI6ZT10aGlzLmRhdGEuc3ViYXJyYXkodGhpcy5pbmRleCx0KTticmVhaztjYXNlXCJhcnJheVwiOmNhc2VcIm5vZGVidWZmZXJcIjplPXRoaXMuZGF0YS5zbGljZSh0aGlzLmluZGV4LHQpfXJldHVybiB0aGlzLmluZGV4PXQsdGhpcy5wdXNoKHtkYXRhOmUsbWV0YTp7cGVyY2VudDp0aGlzLm1heD90aGlzLmluZGV4L3RoaXMubWF4KjEwMDowfX0pfSx0LmV4cG9ydHM9c30se1wiLi4vdXRpbHNcIjozMixcIi4vR2VuZXJpY1dvcmtlclwiOjI4fV0sMjg6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBuKGUpe3RoaXMubmFtZT1lfHxcImRlZmF1bHRcIix0aGlzLnN0cmVhbUluZm89e30sdGhpcy5nZW5lcmF0ZWRFcnJvcj1udWxsLHRoaXMuZXh0cmFTdHJlYW1JbmZvPXt9LHRoaXMuaXNQYXVzZWQ9ITAsdGhpcy5pc0ZpbmlzaGVkPSExLHRoaXMuaXNMb2NrZWQ9ITEsdGhpcy5fbGlzdGVuZXJzPXtkYXRhOltdLGVuZDpbXSxlcnJvcjpbXX0sdGhpcy5wcmV2aW91cz1udWxsfW4ucHJvdG90eXBlPXtwdXNoOmZ1bmN0aW9uKGUpe3RoaXMuZW1pdChcImRhdGFcIixlKX0sZW5kOmZ1bmN0aW9uKCl7aWYodGhpcy5pc0ZpbmlzaGVkKXJldHVybiExO3RoaXMuZmx1c2goKTt0cnl7dGhpcy5lbWl0KFwiZW5kXCIpLHRoaXMuY2xlYW5VcCgpLHRoaXMuaXNGaW5pc2hlZD0hMH1jYXRjaChlKXt0aGlzLmVtaXQoXCJlcnJvclwiLGUpfXJldHVybiEwfSxlcnJvcjpmdW5jdGlvbihlKXtyZXR1cm4hdGhpcy5pc0ZpbmlzaGVkJiYodGhpcy5pc1BhdXNlZD90aGlzLmdlbmVyYXRlZEVycm9yPWU6KHRoaXMuaXNGaW5pc2hlZD0hMCx0aGlzLmVtaXQoXCJlcnJvclwiLGUpLHRoaXMucHJldmlvdXMmJnRoaXMucHJldmlvdXMuZXJyb3IoZSksdGhpcy5jbGVhblVwKCkpLCEwKX0sb246ZnVuY3Rpb24oZSx0KXtyZXR1cm4gdGhpcy5fbGlzdGVuZXJzW2VdLnB1c2godCksdGhpc30sY2xlYW5VcDpmdW5jdGlvbigpe3RoaXMuc3RyZWFtSW5mbz10aGlzLmdlbmVyYXRlZEVycm9yPXRoaXMuZXh0cmFTdHJlYW1JbmZvPW51bGwsdGhpcy5fbGlzdGVuZXJzPVtdfSxlbWl0OmZ1bmN0aW9uKGUsdCl7aWYodGhpcy5fbGlzdGVuZXJzW2VdKWZvcih2YXIgcj0wO3I8dGhpcy5fbGlzdGVuZXJzW2VdLmxlbmd0aDtyKyspdGhpcy5fbGlzdGVuZXJzW2VdW3JdLmNhbGwodGhpcyx0KX0scGlwZTpmdW5jdGlvbihlKXtyZXR1cm4gZS5yZWdpc3RlclByZXZpb3VzKHRoaXMpfSxyZWdpc3RlclByZXZpb3VzOmZ1bmN0aW9uKGUpe2lmKHRoaXMuaXNMb2NrZWQpdGhyb3cgbmV3IEVycm9yKFwiVGhlIHN0cmVhbSAnXCIrdGhpcytcIicgaGFzIGFscmVhZHkgYmVlbiB1c2VkLlwiKTt0aGlzLnN0cmVhbUluZm89ZS5zdHJlYW1JbmZvLHRoaXMubWVyZ2VTdHJlYW1JbmZvKCksdGhpcy5wcmV2aW91cz1lO3ZhciB0PXRoaXM7cmV0dXJuIGUub24oXCJkYXRhXCIsZnVuY3Rpb24oZSl7dC5wcm9jZXNzQ2h1bmsoZSl9KSxlLm9uKFwiZW5kXCIsZnVuY3Rpb24oKXt0LmVuZCgpfSksZS5vbihcImVycm9yXCIsZnVuY3Rpb24oZSl7dC5lcnJvcihlKX0pLHRoaXN9LHBhdXNlOmZ1bmN0aW9uKCl7cmV0dXJuIXRoaXMuaXNQYXVzZWQmJiF0aGlzLmlzRmluaXNoZWQmJih0aGlzLmlzUGF1c2VkPSEwLHRoaXMucHJldmlvdXMmJnRoaXMucHJldmlvdXMucGF1c2UoKSwhMCl9LHJlc3VtZTpmdW5jdGlvbigpe2lmKCF0aGlzLmlzUGF1c2VkfHx0aGlzLmlzRmluaXNoZWQpcmV0dXJuITE7dmFyIGU9dGhpcy5pc1BhdXNlZD0hMTtyZXR1cm4gdGhpcy5nZW5lcmF0ZWRFcnJvciYmKHRoaXMuZXJyb3IodGhpcy5nZW5lcmF0ZWRFcnJvciksZT0hMCksdGhpcy5wcmV2aW91cyYmdGhpcy5wcmV2aW91cy5yZXN1bWUoKSwhZX0sZmx1c2g6ZnVuY3Rpb24oKXt9LHByb2Nlc3NDaHVuazpmdW5jdGlvbihlKXt0aGlzLnB1c2goZSl9LHdpdGhTdHJlYW1JbmZvOmZ1bmN0aW9uKGUsdCl7cmV0dXJuIHRoaXMuZXh0cmFTdHJlYW1JbmZvW2VdPXQsdGhpcy5tZXJnZVN0cmVhbUluZm8oKSx0aGlzfSxtZXJnZVN0cmVhbUluZm86ZnVuY3Rpb24oKXtmb3IodmFyIGUgaW4gdGhpcy5leHRyYVN0cmVhbUluZm8pT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHRoaXMuZXh0cmFTdHJlYW1JbmZvLGUpJiYodGhpcy5zdHJlYW1JbmZvW2VdPXRoaXMuZXh0cmFTdHJlYW1JbmZvW2VdKX0sbG9jazpmdW5jdGlvbigpe2lmKHRoaXMuaXNMb2NrZWQpdGhyb3cgbmV3IEVycm9yKFwiVGhlIHN0cmVhbSAnXCIrdGhpcytcIicgaGFzIGFscmVhZHkgYmVlbiB1c2VkLlwiKTt0aGlzLmlzTG9ja2VkPSEwLHRoaXMucHJldmlvdXMmJnRoaXMucHJldmlvdXMubG9jaygpfSx0b1N0cmluZzpmdW5jdGlvbigpe3ZhciBlPVwiV29ya2VyIFwiK3RoaXMubmFtZTtyZXR1cm4gdGhpcy5wcmV2aW91cz90aGlzLnByZXZpb3VzK1wiIC0+IFwiK2U6ZX19LHQuZXhwb3J0cz1ufSx7fV0sMjk6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt2YXIgaD1lKFwiLi4vdXRpbHNcIiksaT1lKFwiLi9Db252ZXJ0V29ya2VyXCIpLHM9ZShcIi4vR2VuZXJpY1dvcmtlclwiKSx1PWUoXCIuLi9iYXNlNjRcIiksbj1lKFwiLi4vc3VwcG9ydFwiKSxhPWUoXCIuLi9leHRlcm5hbFwiKSxvPW51bGw7aWYobi5ub2Rlc3RyZWFtKXRyeXtvPWUoXCIuLi9ub2RlanMvTm9kZWpzU3RyZWFtT3V0cHV0QWRhcHRlclwiKX1jYXRjaChlKXt9ZnVuY3Rpb24gbChlLG8pe3JldHVybiBuZXcgYS5Qcm9taXNlKGZ1bmN0aW9uKHQscil7dmFyIG49W10saT1lLl9pbnRlcm5hbFR5cGUscz1lLl9vdXRwdXRUeXBlLGE9ZS5fbWltZVR5cGU7ZS5vbihcImRhdGFcIixmdW5jdGlvbihlLHQpe24ucHVzaChlKSxvJiZvKHQpfSkub24oXCJlcnJvclwiLGZ1bmN0aW9uKGUpe249W10scihlKX0pLm9uKFwiZW5kXCIsZnVuY3Rpb24oKXt0cnl7dmFyIGU9ZnVuY3Rpb24oZSx0LHIpe3N3aXRjaChlKXtjYXNlXCJibG9iXCI6cmV0dXJuIGgubmV3QmxvYihoLnRyYW5zZm9ybVRvKFwiYXJyYXlidWZmZXJcIix0KSxyKTtjYXNlXCJiYXNlNjRcIjpyZXR1cm4gdS5lbmNvZGUodCk7ZGVmYXVsdDpyZXR1cm4gaC50cmFuc2Zvcm1UbyhlLHQpfX0ocyxmdW5jdGlvbihlLHQpe3ZhciByLG49MCxpPW51bGwscz0wO2ZvcihyPTA7cjx0Lmxlbmd0aDtyKyspcys9dFtyXS5sZW5ndGg7c3dpdGNoKGUpe2Nhc2VcInN0cmluZ1wiOnJldHVybiB0LmpvaW4oXCJcIik7Y2FzZVwiYXJyYXlcIjpyZXR1cm4gQXJyYXkucHJvdG90eXBlLmNvbmNhdC5hcHBseShbXSx0KTtjYXNlXCJ1aW50OGFycmF5XCI6Zm9yKGk9bmV3IFVpbnQ4QXJyYXkocykscj0wO3I8dC5sZW5ndGg7cisrKWkuc2V0KHRbcl0sbiksbis9dFtyXS5sZW5ndGg7cmV0dXJuIGk7Y2FzZVwibm9kZWJ1ZmZlclwiOnJldHVybiBCdWZmZXIuY29uY2F0KHQpO2RlZmF1bHQ6dGhyb3cgbmV3IEVycm9yKFwiY29uY2F0IDogdW5zdXBwb3J0ZWQgdHlwZSAnXCIrZStcIidcIil9fShpLG4pLGEpO3QoZSl9Y2F0Y2goZSl7cihlKX1uPVtdfSkucmVzdW1lKCl9KX1mdW5jdGlvbiBmKGUsdCxyKXt2YXIgbj10O3N3aXRjaCh0KXtjYXNlXCJibG9iXCI6Y2FzZVwiYXJyYXlidWZmZXJcIjpuPVwidWludDhhcnJheVwiO2JyZWFrO2Nhc2VcImJhc2U2NFwiOm49XCJzdHJpbmdcIn10cnl7dGhpcy5faW50ZXJuYWxUeXBlPW4sdGhpcy5fb3V0cHV0VHlwZT10LHRoaXMuX21pbWVUeXBlPXIsaC5jaGVja1N1cHBvcnQobiksdGhpcy5fd29ya2VyPWUucGlwZShuZXcgaShuKSksZS5sb2NrKCl9Y2F0Y2goZSl7dGhpcy5fd29ya2VyPW5ldyBzKFwiZXJyb3JcIiksdGhpcy5fd29ya2VyLmVycm9yKGUpfX1mLnByb3RvdHlwZT17YWNjdW11bGF0ZTpmdW5jdGlvbihlKXtyZXR1cm4gbCh0aGlzLGUpfSxvbjpmdW5jdGlvbihlLHQpe3ZhciByPXRoaXM7cmV0dXJuXCJkYXRhXCI9PT1lP3RoaXMuX3dvcmtlci5vbihlLGZ1bmN0aW9uKGUpe3QuY2FsbChyLGUuZGF0YSxlLm1ldGEpfSk6dGhpcy5fd29ya2VyLm9uKGUsZnVuY3Rpb24oKXtoLmRlbGF5KHQsYXJndW1lbnRzLHIpfSksdGhpc30scmVzdW1lOmZ1bmN0aW9uKCl7cmV0dXJuIGguZGVsYXkodGhpcy5fd29ya2VyLnJlc3VtZSxbXSx0aGlzLl93b3JrZXIpLHRoaXN9LHBhdXNlOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuX3dvcmtlci5wYXVzZSgpLHRoaXN9LHRvTm9kZWpzU3RyZWFtOmZ1bmN0aW9uKGUpe2lmKGguY2hlY2tTdXBwb3J0KFwibm9kZXN0cmVhbVwiKSxcIm5vZGVidWZmZXJcIiE9PXRoaXMuX291dHB1dFR5cGUpdGhyb3cgbmV3IEVycm9yKHRoaXMuX291dHB1dFR5cGUrXCIgaXMgbm90IHN1cHBvcnRlZCBieSB0aGlzIG1ldGhvZFwiKTtyZXR1cm4gbmV3IG8odGhpcyx7b2JqZWN0TW9kZTpcIm5vZGVidWZmZXJcIiE9PXRoaXMuX291dHB1dFR5cGV9LGUpfX0sdC5leHBvcnRzPWZ9LHtcIi4uL2Jhc2U2NFwiOjEsXCIuLi9leHRlcm5hbFwiOjYsXCIuLi9ub2RlanMvTm9kZWpzU3RyZWFtT3V0cHV0QWRhcHRlclwiOjEzLFwiLi4vc3VwcG9ydFwiOjMwLFwiLi4vdXRpbHNcIjozMixcIi4vQ29udmVydFdvcmtlclwiOjI0LFwiLi9HZW5lcmljV29ya2VyXCI6Mjh9XSwzMDpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO2lmKHIuYmFzZTY0PSEwLHIuYXJyYXk9ITAsci5zdHJpbmc9ITAsci5hcnJheWJ1ZmZlcj1cInVuZGVmaW5lZFwiIT10eXBlb2YgQXJyYXlCdWZmZXImJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBVaW50OEFycmF5LHIubm9kZWJ1ZmZlcj1cInVuZGVmaW5lZFwiIT10eXBlb2YgQnVmZmVyLHIudWludDhhcnJheT1cInVuZGVmaW5lZFwiIT10eXBlb2YgVWludDhBcnJheSxcInVuZGVmaW5lZFwiPT10eXBlb2YgQXJyYXlCdWZmZXIpci5ibG9iPSExO2Vsc2V7dmFyIG49bmV3IEFycmF5QnVmZmVyKDApO3RyeXtyLmJsb2I9MD09PW5ldyBCbG9iKFtuXSx7dHlwZTpcImFwcGxpY2F0aW9uL3ppcFwifSkuc2l6ZX1jYXRjaChlKXt0cnl7dmFyIGk9bmV3KHNlbGYuQmxvYkJ1aWxkZXJ8fHNlbGYuV2ViS2l0QmxvYkJ1aWxkZXJ8fHNlbGYuTW96QmxvYkJ1aWxkZXJ8fHNlbGYuTVNCbG9iQnVpbGRlcik7aS5hcHBlbmQobiksci5ibG9iPTA9PT1pLmdldEJsb2IoXCJhcHBsaWNhdGlvbi96aXBcIikuc2l6ZX1jYXRjaChlKXtyLmJsb2I9ITF9fX10cnl7ci5ub2Rlc3RyZWFtPSEhZShcInJlYWRhYmxlLXN0cmVhbVwiKS5SZWFkYWJsZX1jYXRjaChlKXtyLm5vZGVzdHJlYW09ITF9fSx7XCJyZWFkYWJsZS1zdHJlYW1cIjoxNn1dLDMxOltmdW5jdGlvbihlLHQscyl7XCJ1c2Ugc3RyaWN0XCI7Zm9yKHZhciBvPWUoXCIuL3V0aWxzXCIpLGg9ZShcIi4vc3VwcG9ydFwiKSxyPWUoXCIuL25vZGVqc1V0aWxzXCIpLG49ZShcIi4vc3RyZWFtL0dlbmVyaWNXb3JrZXJcIiksdT1uZXcgQXJyYXkoMjU2KSxpPTA7aTwyNTY7aSsrKXVbaV09MjUyPD1pPzY6MjQ4PD1pPzU6MjQwPD1pPzQ6MjI0PD1pPzM6MTkyPD1pPzI6MTt1WzI1NF09dVsyNTRdPTE7ZnVuY3Rpb24gYSgpe24uY2FsbCh0aGlzLFwidXRmLTggZGVjb2RlXCIpLHRoaXMubGVmdE92ZXI9bnVsbH1mdW5jdGlvbiBsKCl7bi5jYWxsKHRoaXMsXCJ1dGYtOCBlbmNvZGVcIil9cy51dGY4ZW5jb2RlPWZ1bmN0aW9uKGUpe3JldHVybiBoLm5vZGVidWZmZXI/ci5uZXdCdWZmZXJGcm9tKGUsXCJ1dGYtOFwiKTpmdW5jdGlvbihlKXt2YXIgdCxyLG4saSxzLGE9ZS5sZW5ndGgsbz0wO2ZvcihpPTA7aTxhO2krKyk1NTI5Nj09KDY0NTEyJihyPWUuY2hhckNvZGVBdChpKSkpJiZpKzE8YSYmNTYzMjA9PSg2NDUxMiYobj1lLmNoYXJDb2RlQXQoaSsxKSkpJiYocj02NTUzNisoci01NTI5Njw8MTApKyhuLTU2MzIwKSxpKyspLG8rPXI8MTI4PzE6cjwyMDQ4PzI6cjw2NTUzNj8zOjQ7Zm9yKHQ9aC51aW50OGFycmF5P25ldyBVaW50OEFycmF5KG8pOm5ldyBBcnJheShvKSxpPXM9MDtzPG87aSsrKTU1Mjk2PT0oNjQ1MTImKHI9ZS5jaGFyQ29kZUF0KGkpKSkmJmkrMTxhJiY1NjMyMD09KDY0NTEyJihuPWUuY2hhckNvZGVBdChpKzEpKSkmJihyPTY1NTM2KyhyLTU1Mjk2PDwxMCkrKG4tNTYzMjApLGkrKykscjwxMjg/dFtzKytdPXI6KHI8MjA0OD90W3MrK109MTkyfHI+Pj42OihyPDY1NTM2P3RbcysrXT0yMjR8cj4+PjEyOih0W3MrK109MjQwfHI+Pj4xOCx0W3MrK109MTI4fHI+Pj4xMiY2MyksdFtzKytdPTEyOHxyPj4+NiY2MyksdFtzKytdPTEyOHw2MyZyKTtyZXR1cm4gdH0oZSl9LHMudXRmOGRlY29kZT1mdW5jdGlvbihlKXtyZXR1cm4gaC5ub2RlYnVmZmVyP28udHJhbnNmb3JtVG8oXCJub2RlYnVmZmVyXCIsZSkudG9TdHJpbmcoXCJ1dGYtOFwiKTpmdW5jdGlvbihlKXt2YXIgdCxyLG4saSxzPWUubGVuZ3RoLGE9bmV3IEFycmF5KDIqcyk7Zm9yKHQ9cj0wO3Q8czspaWYoKG49ZVt0KytdKTwxMjgpYVtyKytdPW47ZWxzZSBpZig0PChpPXVbbl0pKWFbcisrXT02NTUzMyx0Kz1pLTE7ZWxzZXtmb3IobiY9Mj09PWk/MzE6Mz09PWk/MTU6NzsxPGkmJnQ8czspbj1uPDw2fDYzJmVbdCsrXSxpLS07MTxpP2FbcisrXT02NTUzMzpuPDY1NTM2P2FbcisrXT1uOihuLT02NTUzNixhW3IrK109NTUyOTZ8bj4+MTAmMTAyMyxhW3IrK109NTYzMjB8MTAyMyZuKX1yZXR1cm4gYS5sZW5ndGghPT1yJiYoYS5zdWJhcnJheT9hPWEuc3ViYXJyYXkoMCxyKTphLmxlbmd0aD1yKSxvLmFwcGx5RnJvbUNoYXJDb2RlKGEpfShlPW8udHJhbnNmb3JtVG8oaC51aW50OGFycmF5P1widWludDhhcnJheVwiOlwiYXJyYXlcIixlKSl9LG8uaW5oZXJpdHMoYSxuKSxhLnByb3RvdHlwZS5wcm9jZXNzQ2h1bms9ZnVuY3Rpb24oZSl7dmFyIHQ9by50cmFuc2Zvcm1UbyhoLnVpbnQ4YXJyYXk/XCJ1aW50OGFycmF5XCI6XCJhcnJheVwiLGUuZGF0YSk7aWYodGhpcy5sZWZ0T3ZlciYmdGhpcy5sZWZ0T3Zlci5sZW5ndGgpe2lmKGgudWludDhhcnJheSl7dmFyIHI9dDsodD1uZXcgVWludDhBcnJheShyLmxlbmd0aCt0aGlzLmxlZnRPdmVyLmxlbmd0aCkpLnNldCh0aGlzLmxlZnRPdmVyLDApLHQuc2V0KHIsdGhpcy5sZWZ0T3Zlci5sZW5ndGgpfWVsc2UgdD10aGlzLmxlZnRPdmVyLmNvbmNhdCh0KTt0aGlzLmxlZnRPdmVyPW51bGx9dmFyIG49ZnVuY3Rpb24oZSx0KXt2YXIgcjtmb3IoKHQ9dHx8ZS5sZW5ndGgpPmUubGVuZ3RoJiYodD1lLmxlbmd0aCkscj10LTE7MDw9ciYmMTI4PT0oMTkyJmVbcl0pOylyLS07cmV0dXJuIHI8MD90OjA9PT1yP3Q6cit1W2Vbcl1dPnQ/cjp0fSh0KSxpPXQ7biE9PXQubGVuZ3RoJiYoaC51aW50OGFycmF5PyhpPXQuc3ViYXJyYXkoMCxuKSx0aGlzLmxlZnRPdmVyPXQuc3ViYXJyYXkobix0Lmxlbmd0aCkpOihpPXQuc2xpY2UoMCxuKSx0aGlzLmxlZnRPdmVyPXQuc2xpY2Uobix0Lmxlbmd0aCkpKSx0aGlzLnB1c2goe2RhdGE6cy51dGY4ZGVjb2RlKGkpLG1ldGE6ZS5tZXRhfSl9LGEucHJvdG90eXBlLmZsdXNoPWZ1bmN0aW9uKCl7dGhpcy5sZWZ0T3ZlciYmdGhpcy5sZWZ0T3Zlci5sZW5ndGgmJih0aGlzLnB1c2goe2RhdGE6cy51dGY4ZGVjb2RlKHRoaXMubGVmdE92ZXIpLG1ldGE6e319KSx0aGlzLmxlZnRPdmVyPW51bGwpfSxzLlV0ZjhEZWNvZGVXb3JrZXI9YSxvLmluaGVyaXRzKGwsbiksbC5wcm90b3R5cGUucHJvY2Vzc0NodW5rPWZ1bmN0aW9uKGUpe3RoaXMucHVzaCh7ZGF0YTpzLnV0ZjhlbmNvZGUoZS5kYXRhKSxtZXRhOmUubWV0YX0pfSxzLlV0ZjhFbmNvZGVXb3JrZXI9bH0se1wiLi9ub2RlanNVdGlsc1wiOjE0LFwiLi9zdHJlYW0vR2VuZXJpY1dvcmtlclwiOjI4LFwiLi9zdXBwb3J0XCI6MzAsXCIuL3V0aWxzXCI6MzJ9XSwzMjpbZnVuY3Rpb24oZSx0LGEpe1widXNlIHN0cmljdFwiO3ZhciBvPWUoXCIuL3N1cHBvcnRcIiksaD1lKFwiLi9iYXNlNjRcIikscj1lKFwiLi9ub2RlanNVdGlsc1wiKSx1PWUoXCIuL2V4dGVybmFsXCIpO2Z1bmN0aW9uIG4oZSl7cmV0dXJuIGV9ZnVuY3Rpb24gbChlLHQpe2Zvcih2YXIgcj0wO3I8ZS5sZW5ndGg7KytyKXRbcl09MjU1JmUuY2hhckNvZGVBdChyKTtyZXR1cm4gdH1lKFwic2V0aW1tZWRpYXRlXCIpLGEubmV3QmxvYj1mdW5jdGlvbih0LHIpe2EuY2hlY2tTdXBwb3J0KFwiYmxvYlwiKTt0cnl7cmV0dXJuIG5ldyBCbG9iKFt0XSx7dHlwZTpyfSl9Y2F0Y2goZSl7dHJ5e3ZhciBuPW5ldyhzZWxmLkJsb2JCdWlsZGVyfHxzZWxmLldlYktpdEJsb2JCdWlsZGVyfHxzZWxmLk1vekJsb2JCdWlsZGVyfHxzZWxmLk1TQmxvYkJ1aWxkZXIpO3JldHVybiBuLmFwcGVuZCh0KSxuLmdldEJsb2Iocil9Y2F0Y2goZSl7dGhyb3cgbmV3IEVycm9yKFwiQnVnIDogY2FuJ3QgY29uc3RydWN0IHRoZSBCbG9iLlwiKX19fTt2YXIgaT17c3RyaW5naWZ5QnlDaHVuazpmdW5jdGlvbihlLHQscil7dmFyIG49W10saT0wLHM9ZS5sZW5ndGg7aWYoczw9cilyZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLGUpO2Zvcig7aTxzOylcImFycmF5XCI9PT10fHxcIm5vZGVidWZmZXJcIj09PXQ/bi5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCxlLnNsaWNlKGksTWF0aC5taW4oaStyLHMpKSkpOm4ucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsZS5zdWJhcnJheShpLE1hdGgubWluKGkrcixzKSkpKSxpKz1yO3JldHVybiBuLmpvaW4oXCJcIil9LHN0cmluZ2lmeUJ5Q2hhcjpmdW5jdGlvbihlKXtmb3IodmFyIHQ9XCJcIixyPTA7cjxlLmxlbmd0aDtyKyspdCs9U3RyaW5nLmZyb21DaGFyQ29kZShlW3JdKTtyZXR1cm4gdH0sYXBwbHlDYW5CZVVzZWQ6e3VpbnQ4YXJyYXk6ZnVuY3Rpb24oKXt0cnl7cmV0dXJuIG8udWludDhhcnJheSYmMT09PVN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCxuZXcgVWludDhBcnJheSgxKSkubGVuZ3RofWNhdGNoKGUpe3JldHVybiExfX0oKSxub2RlYnVmZmVyOmZ1bmN0aW9uKCl7dHJ5e3JldHVybiBvLm5vZGVidWZmZXImJjE9PT1TdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsci5hbGxvY0J1ZmZlcigxKSkubGVuZ3RofWNhdGNoKGUpe3JldHVybiExfX0oKX19O2Z1bmN0aW9uIHMoZSl7dmFyIHQ9NjU1MzYscj1hLmdldFR5cGVPZihlKSxuPSEwO2lmKFwidWludDhhcnJheVwiPT09cj9uPWkuYXBwbHlDYW5CZVVzZWQudWludDhhcnJheTpcIm5vZGVidWZmZXJcIj09PXImJihuPWkuYXBwbHlDYW5CZVVzZWQubm9kZWJ1ZmZlciksbilmb3IoOzE8dDspdHJ5e3JldHVybiBpLnN0cmluZ2lmeUJ5Q2h1bmsoZSxyLHQpfWNhdGNoKGUpe3Q9TWF0aC5mbG9vcih0LzIpfXJldHVybiBpLnN0cmluZ2lmeUJ5Q2hhcihlKX1mdW5jdGlvbiBmKGUsdCl7Zm9yKHZhciByPTA7cjxlLmxlbmd0aDtyKyspdFtyXT1lW3JdO3JldHVybiB0fWEuYXBwbHlGcm9tQ2hhckNvZGU9czt2YXIgYz17fTtjLnN0cmluZz17c3RyaW5nOm4sYXJyYXk6ZnVuY3Rpb24oZSl7cmV0dXJuIGwoZSxuZXcgQXJyYXkoZS5sZW5ndGgpKX0sYXJyYXlidWZmZXI6ZnVuY3Rpb24oZSl7cmV0dXJuIGMuc3RyaW5nLnVpbnQ4YXJyYXkoZSkuYnVmZmVyfSx1aW50OGFycmF5OmZ1bmN0aW9uKGUpe3JldHVybiBsKGUsbmV3IFVpbnQ4QXJyYXkoZS5sZW5ndGgpKX0sbm9kZWJ1ZmZlcjpmdW5jdGlvbihlKXtyZXR1cm4gbChlLHIuYWxsb2NCdWZmZXIoZS5sZW5ndGgpKX19LGMuYXJyYXk9e3N0cmluZzpzLGFycmF5Om4sYXJyYXlidWZmZXI6ZnVuY3Rpb24oZSl7cmV0dXJuIG5ldyBVaW50OEFycmF5KGUpLmJ1ZmZlcn0sdWludDhhcnJheTpmdW5jdGlvbihlKXtyZXR1cm4gbmV3IFVpbnQ4QXJyYXkoZSl9LG5vZGVidWZmZXI6ZnVuY3Rpb24oZSl7cmV0dXJuIHIubmV3QnVmZmVyRnJvbShlKX19LGMuYXJyYXlidWZmZXI9e3N0cmluZzpmdW5jdGlvbihlKXtyZXR1cm4gcyhuZXcgVWludDhBcnJheShlKSl9LGFycmF5OmZ1bmN0aW9uKGUpe3JldHVybiBmKG5ldyBVaW50OEFycmF5KGUpLG5ldyBBcnJheShlLmJ5dGVMZW5ndGgpKX0sYXJyYXlidWZmZXI6bix1aW50OGFycmF5OmZ1bmN0aW9uKGUpe3JldHVybiBuZXcgVWludDhBcnJheShlKX0sbm9kZWJ1ZmZlcjpmdW5jdGlvbihlKXtyZXR1cm4gci5uZXdCdWZmZXJGcm9tKG5ldyBVaW50OEFycmF5KGUpKX19LGMudWludDhhcnJheT17c3RyaW5nOnMsYXJyYXk6ZnVuY3Rpb24oZSl7cmV0dXJuIGYoZSxuZXcgQXJyYXkoZS5sZW5ndGgpKX0sYXJyYXlidWZmZXI6ZnVuY3Rpb24oZSl7cmV0dXJuIGUuYnVmZmVyfSx1aW50OGFycmF5Om4sbm9kZWJ1ZmZlcjpmdW5jdGlvbihlKXtyZXR1cm4gci5uZXdCdWZmZXJGcm9tKGUpfX0sYy5ub2RlYnVmZmVyPXtzdHJpbmc6cyxhcnJheTpmdW5jdGlvbihlKXtyZXR1cm4gZihlLG5ldyBBcnJheShlLmxlbmd0aCkpfSxhcnJheWJ1ZmZlcjpmdW5jdGlvbihlKXtyZXR1cm4gYy5ub2RlYnVmZmVyLnVpbnQ4YXJyYXkoZSkuYnVmZmVyfSx1aW50OGFycmF5OmZ1bmN0aW9uKGUpe3JldHVybiBmKGUsbmV3IFVpbnQ4QXJyYXkoZS5sZW5ndGgpKX0sbm9kZWJ1ZmZlcjpufSxhLnRyYW5zZm9ybVRvPWZ1bmN0aW9uKGUsdCl7aWYodD10fHxcIlwiLCFlKXJldHVybiB0O2EuY2hlY2tTdXBwb3J0KGUpO3ZhciByPWEuZ2V0VHlwZU9mKHQpO3JldHVybiBjW3JdW2VdKHQpfSxhLnJlc29sdmU9ZnVuY3Rpb24oZSl7Zm9yKHZhciB0PWUuc3BsaXQoXCIvXCIpLHI9W10sbj0wO248dC5sZW5ndGg7bisrKXt2YXIgaT10W25dO1wiLlwiPT09aXx8XCJcIj09PWkmJjAhPT1uJiZuIT09dC5sZW5ndGgtMXx8KFwiLi5cIj09PWk/ci5wb3AoKTpyLnB1c2goaSkpfXJldHVybiByLmpvaW4oXCIvXCIpfSxhLmdldFR5cGVPZj1mdW5jdGlvbihlKXtpZihcInN0cmluZ1wiPT10eXBlb2YgZSlyZXR1cm5cInN0cmluZ1wiO3ZhciB0PU9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChlKTtyZXR1cm5cIltvYmplY3QgQXJyYXldXCI9PT10P1wiYXJyYXlcIjpvLm5vZGVidWZmZXImJnIuaXNCdWZmZXIoZSk/XCJub2RlYnVmZmVyXCI6by51aW50OGFycmF5JiZcIltvYmplY3QgVWludDhBcnJheV1cIj09PXQ/XCJ1aW50OGFycmF5XCI6by5hcnJheWJ1ZmZlciYmXCJbb2JqZWN0IEFycmF5QnVmZmVyXVwiPT09dD9cImFycmF5YnVmZmVyXCI6dm9pZCAwfSxhLmNoZWNrU3VwcG9ydD1mdW5jdGlvbihlKXtpZighb1tlLnRvTG93ZXJDYXNlKCldKXRocm93IG5ldyBFcnJvcihlK1wiIGlzIG5vdCBzdXBwb3J0ZWQgYnkgdGhpcyBwbGF0Zm9ybVwiKX0sYS5NQVhfVkFMVUVfMTZCSVRTPTY1NTM1LGEuTUFYX1ZBTFVFXzMyQklUUz0tMSxhLnByZXR0eT1mdW5jdGlvbihlKXt2YXIgdCxyLG49XCJcIjtmb3Iocj0wO3I8KGV8fFwiXCIpLmxlbmd0aDtyKyspbis9XCJcXFxceFwiKygodD1lLmNoYXJDb2RlQXQocikpPDE2P1wiMFwiOlwiXCIpK3QudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCk7cmV0dXJuIG59LGEuZGVsYXk9ZnVuY3Rpb24oZSx0LHIpe3NldEltbWVkaWF0ZShmdW5jdGlvbigpe2UuYXBwbHkocnx8bnVsbCx0fHxbXSl9KX0sYS5pbmhlcml0cz1mdW5jdGlvbihlLHQpe2Z1bmN0aW9uIHIoKXt9ci5wcm90b3R5cGU9dC5wcm90b3R5cGUsZS5wcm90b3R5cGU9bmV3IHJ9LGEuZXh0ZW5kPWZ1bmN0aW9uKCl7dmFyIGUsdCxyPXt9O2ZvcihlPTA7ZTxhcmd1bWVudHMubGVuZ3RoO2UrKylmb3IodCBpbiBhcmd1bWVudHNbZV0pT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGFyZ3VtZW50c1tlXSx0KSYmdm9pZCAwPT09clt0XSYmKHJbdF09YXJndW1lbnRzW2VdW3RdKTtyZXR1cm4gcn0sYS5wcmVwYXJlQ29udGVudD1mdW5jdGlvbihyLGUsbixpLHMpe3JldHVybiB1LlByb21pc2UucmVzb2x2ZShlKS50aGVuKGZ1bmN0aW9uKG4pe3JldHVybiBvLmJsb2ImJihuIGluc3RhbmNlb2YgQmxvYnx8LTEhPT1bXCJbb2JqZWN0IEZpbGVdXCIsXCJbb2JqZWN0IEJsb2JdXCJdLmluZGV4T2YoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG4pKSk/dm9pZCAwIT09QmxvYi5wcm90b3R5cGUuYXJyYXlCdWZmZXI/bi5hcnJheUJ1ZmZlcigpOlwidW5kZWZpbmVkXCIhPXR5cGVvZiBGaWxlUmVhZGVyP25ldyB1LlByb21pc2UoZnVuY3Rpb24odCxyKXt2YXIgZT1uZXcgRmlsZVJlYWRlcjtlLm9ubG9hZD1mdW5jdGlvbihlKXt0KGUudGFyZ2V0LnJlc3VsdCl9LGUub25lcnJvcj1mdW5jdGlvbihlKXtyKGUudGFyZ2V0LmVycm9yKX0sZS5yZWFkQXNBcnJheUJ1ZmZlcihuKX0pOnUuUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKHIrXCIgaXMgYSBCbG9iLCBidXQgd2UgaGF2ZSBubyB3YXkgb2YgcmVhZGluZyBpdC5cIikpOm59KS50aGVuKGZ1bmN0aW9uKGUpe3ZhciB0PWEuZ2V0VHlwZU9mKGUpO3JldHVybiB0PyhcImFycmF5YnVmZmVyXCI9PT10P2U9YS50cmFuc2Zvcm1UbyhcInVpbnQ4YXJyYXlcIixlKTpcInN0cmluZ1wiPT09dCYmKHM/ZT1oLmRlY29kZShlKTpuJiYhMCE9PWkmJihlPWZ1bmN0aW9uKGUpe3JldHVybiBsKGUsby51aW50OGFycmF5P25ldyBVaW50OEFycmF5KGUubGVuZ3RoKTpuZXcgQXJyYXkoZS5sZW5ndGgpKX0oZSkpKSxlKTp1LlByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIkNhbid0IHJlYWQgdGhlIGRhdGEgb2YgJ1wiK3IrXCInLiBJcyBpdCBpbiBhIHN1cHBvcnRlZCBKYXZhU2NyaXB0IHR5cGUgKFN0cmluZywgQmxvYiwgQXJyYXlCdWZmZXIsIGV0YykgP1wiKSl9KX19LHtcIi4vYmFzZTY0XCI6MSxcIi4vZXh0ZXJuYWxcIjo2LFwiLi9ub2RlanNVdGlsc1wiOjE0LFwiLi9zdXBwb3J0XCI6MzAsc2V0aW1tZWRpYXRlOjU0fV0sMzM6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt2YXIgbj1lKFwiLi9yZWFkZXIvcmVhZGVyRm9yXCIpLGk9ZShcIi4vdXRpbHNcIikscz1lKFwiLi9zaWduYXR1cmVcIiksYT1lKFwiLi96aXBFbnRyeVwiKSxvPWUoXCIuL3N1cHBvcnRcIik7ZnVuY3Rpb24gaChlKXt0aGlzLmZpbGVzPVtdLHRoaXMubG9hZE9wdGlvbnM9ZX1oLnByb3RvdHlwZT17Y2hlY2tTaWduYXR1cmU6ZnVuY3Rpb24oZSl7aWYoIXRoaXMucmVhZGVyLnJlYWRBbmRDaGVja1NpZ25hdHVyZShlKSl7dGhpcy5yZWFkZXIuaW5kZXgtPTQ7dmFyIHQ9dGhpcy5yZWFkZXIucmVhZFN0cmluZyg0KTt0aHJvdyBuZXcgRXJyb3IoXCJDb3JydXB0ZWQgemlwIG9yIGJ1ZzogdW5leHBlY3RlZCBzaWduYXR1cmUgKFwiK2kucHJldHR5KHQpK1wiLCBleHBlY3RlZCBcIitpLnByZXR0eShlKStcIilcIil9fSxpc1NpZ25hdHVyZTpmdW5jdGlvbihlLHQpe3ZhciByPXRoaXMucmVhZGVyLmluZGV4O3RoaXMucmVhZGVyLnNldEluZGV4KGUpO3ZhciBuPXRoaXMucmVhZGVyLnJlYWRTdHJpbmcoNCk9PT10O3JldHVybiB0aGlzLnJlYWRlci5zZXRJbmRleChyKSxufSxyZWFkQmxvY2tFbmRPZkNlbnRyYWw6ZnVuY3Rpb24oKXt0aGlzLmRpc2tOdW1iZXI9dGhpcy5yZWFkZXIucmVhZEludCgyKSx0aGlzLmRpc2tXaXRoQ2VudHJhbERpclN0YXJ0PXRoaXMucmVhZGVyLnJlYWRJbnQoMiksdGhpcy5jZW50cmFsRGlyUmVjb3Jkc09uVGhpc0Rpc2s9dGhpcy5yZWFkZXIucmVhZEludCgyKSx0aGlzLmNlbnRyYWxEaXJSZWNvcmRzPXRoaXMucmVhZGVyLnJlYWRJbnQoMiksdGhpcy5jZW50cmFsRGlyU2l6ZT10aGlzLnJlYWRlci5yZWFkSW50KDQpLHRoaXMuY2VudHJhbERpck9mZnNldD10aGlzLnJlYWRlci5yZWFkSW50KDQpLHRoaXMuemlwQ29tbWVudExlbmd0aD10aGlzLnJlYWRlci5yZWFkSW50KDIpO3ZhciBlPXRoaXMucmVhZGVyLnJlYWREYXRhKHRoaXMuemlwQ29tbWVudExlbmd0aCksdD1vLnVpbnQ4YXJyYXk/XCJ1aW50OGFycmF5XCI6XCJhcnJheVwiLHI9aS50cmFuc2Zvcm1Ubyh0LGUpO3RoaXMuemlwQ29tbWVudD10aGlzLmxvYWRPcHRpb25zLmRlY29kZUZpbGVOYW1lKHIpfSxyZWFkQmxvY2taaXA2NEVuZE9mQ2VudHJhbDpmdW5jdGlvbigpe3RoaXMuemlwNjRFbmRPZkNlbnRyYWxTaXplPXRoaXMucmVhZGVyLnJlYWRJbnQoOCksdGhpcy5yZWFkZXIuc2tpcCg0KSx0aGlzLmRpc2tOdW1iZXI9dGhpcy5yZWFkZXIucmVhZEludCg0KSx0aGlzLmRpc2tXaXRoQ2VudHJhbERpclN0YXJ0PXRoaXMucmVhZGVyLnJlYWRJbnQoNCksdGhpcy5jZW50cmFsRGlyUmVjb3Jkc09uVGhpc0Rpc2s9dGhpcy5yZWFkZXIucmVhZEludCg4KSx0aGlzLmNlbnRyYWxEaXJSZWNvcmRzPXRoaXMucmVhZGVyLnJlYWRJbnQoOCksdGhpcy5jZW50cmFsRGlyU2l6ZT10aGlzLnJlYWRlci5yZWFkSW50KDgpLHRoaXMuY2VudHJhbERpck9mZnNldD10aGlzLnJlYWRlci5yZWFkSW50KDgpLHRoaXMuemlwNjRFeHRlbnNpYmxlRGF0YT17fTtmb3IodmFyIGUsdCxyLG49dGhpcy56aXA2NEVuZE9mQ2VudHJhbFNpemUtNDQ7MDxuOyllPXRoaXMucmVhZGVyLnJlYWRJbnQoMiksdD10aGlzLnJlYWRlci5yZWFkSW50KDQpLHI9dGhpcy5yZWFkZXIucmVhZERhdGEodCksdGhpcy56aXA2NEV4dGVuc2libGVEYXRhW2VdPXtpZDplLGxlbmd0aDp0LHZhbHVlOnJ9fSxyZWFkQmxvY2taaXA2NEVuZE9mQ2VudHJhbExvY2F0b3I6ZnVuY3Rpb24oKXtpZih0aGlzLmRpc2tXaXRoWmlwNjRDZW50cmFsRGlyU3RhcnQ9dGhpcy5yZWFkZXIucmVhZEludCg0KSx0aGlzLnJlbGF0aXZlT2Zmc2V0RW5kT2ZaaXA2NENlbnRyYWxEaXI9dGhpcy5yZWFkZXIucmVhZEludCg4KSx0aGlzLmRpc2tzQ291bnQ9dGhpcy5yZWFkZXIucmVhZEludCg0KSwxPHRoaXMuZGlza3NDb3VudCl0aHJvdyBuZXcgRXJyb3IoXCJNdWx0aS12b2x1bWVzIHppcCBhcmUgbm90IHN1cHBvcnRlZFwiKX0scmVhZExvY2FsRmlsZXM6ZnVuY3Rpb24oKXt2YXIgZSx0O2ZvcihlPTA7ZTx0aGlzLmZpbGVzLmxlbmd0aDtlKyspdD10aGlzLmZpbGVzW2VdLHRoaXMucmVhZGVyLnNldEluZGV4KHQubG9jYWxIZWFkZXJPZmZzZXQpLHRoaXMuY2hlY2tTaWduYXR1cmUocy5MT0NBTF9GSUxFX0hFQURFUiksdC5yZWFkTG9jYWxQYXJ0KHRoaXMucmVhZGVyKSx0LmhhbmRsZVVURjgoKSx0LnByb2Nlc3NBdHRyaWJ1dGVzKCl9LHJlYWRDZW50cmFsRGlyOmZ1bmN0aW9uKCl7dmFyIGU7Zm9yKHRoaXMucmVhZGVyLnNldEluZGV4KHRoaXMuY2VudHJhbERpck9mZnNldCk7dGhpcy5yZWFkZXIucmVhZEFuZENoZWNrU2lnbmF0dXJlKHMuQ0VOVFJBTF9GSUxFX0hFQURFUik7KShlPW5ldyBhKHt6aXA2NDp0aGlzLnppcDY0fSx0aGlzLmxvYWRPcHRpb25zKSkucmVhZENlbnRyYWxQYXJ0KHRoaXMucmVhZGVyKSx0aGlzLmZpbGVzLnB1c2goZSk7aWYodGhpcy5jZW50cmFsRGlyUmVjb3JkcyE9PXRoaXMuZmlsZXMubGVuZ3RoJiYwIT09dGhpcy5jZW50cmFsRGlyUmVjb3JkcyYmMD09PXRoaXMuZmlsZXMubGVuZ3RoKXRocm93IG5ldyBFcnJvcihcIkNvcnJ1cHRlZCB6aXAgb3IgYnVnOiBleHBlY3RlZCBcIit0aGlzLmNlbnRyYWxEaXJSZWNvcmRzK1wiIHJlY29yZHMgaW4gY2VudHJhbCBkaXIsIGdvdCBcIit0aGlzLmZpbGVzLmxlbmd0aCl9LHJlYWRFbmRPZkNlbnRyYWw6ZnVuY3Rpb24oKXt2YXIgZT10aGlzLnJlYWRlci5sYXN0SW5kZXhPZlNpZ25hdHVyZShzLkNFTlRSQUxfRElSRUNUT1JZX0VORCk7aWYoZTwwKXRocm93IXRoaXMuaXNTaWduYXR1cmUoMCxzLkxPQ0FMX0ZJTEVfSEVBREVSKT9uZXcgRXJyb3IoXCJDYW4ndCBmaW5kIGVuZCBvZiBjZW50cmFsIGRpcmVjdG9yeSA6IGlzIHRoaXMgYSB6aXAgZmlsZSA/IElmIGl0IGlzLCBzZWUgaHR0cHM6Ly9zdHVrLmdpdGh1Yi5pby9qc3ppcC9kb2N1bWVudGF0aW9uL2hvd3RvL3JlYWRfemlwLmh0bWxcIik6bmV3IEVycm9yKFwiQ29ycnVwdGVkIHppcDogY2FuJ3QgZmluZCBlbmQgb2YgY2VudHJhbCBkaXJlY3RvcnlcIik7dGhpcy5yZWFkZXIuc2V0SW5kZXgoZSk7dmFyIHQ9ZTtpZih0aGlzLmNoZWNrU2lnbmF0dXJlKHMuQ0VOVFJBTF9ESVJFQ1RPUllfRU5EKSx0aGlzLnJlYWRCbG9ja0VuZE9mQ2VudHJhbCgpLHRoaXMuZGlza051bWJlcj09PWkuTUFYX1ZBTFVFXzE2QklUU3x8dGhpcy5kaXNrV2l0aENlbnRyYWxEaXJTdGFydD09PWkuTUFYX1ZBTFVFXzE2QklUU3x8dGhpcy5jZW50cmFsRGlyUmVjb3Jkc09uVGhpc0Rpc2s9PT1pLk1BWF9WQUxVRV8xNkJJVFN8fHRoaXMuY2VudHJhbERpclJlY29yZHM9PT1pLk1BWF9WQUxVRV8xNkJJVFN8fHRoaXMuY2VudHJhbERpclNpemU9PT1pLk1BWF9WQUxVRV8zMkJJVFN8fHRoaXMuY2VudHJhbERpck9mZnNldD09PWkuTUFYX1ZBTFVFXzMyQklUUyl7aWYodGhpcy56aXA2ND0hMCwoZT10aGlzLnJlYWRlci5sYXN0SW5kZXhPZlNpZ25hdHVyZShzLlpJUDY0X0NFTlRSQUxfRElSRUNUT1JZX0xPQ0FUT1IpKTwwKXRocm93IG5ldyBFcnJvcihcIkNvcnJ1cHRlZCB6aXA6IGNhbid0IGZpbmQgdGhlIFpJUDY0IGVuZCBvZiBjZW50cmFsIGRpcmVjdG9yeSBsb2NhdG9yXCIpO2lmKHRoaXMucmVhZGVyLnNldEluZGV4KGUpLHRoaXMuY2hlY2tTaWduYXR1cmUocy5aSVA2NF9DRU5UUkFMX0RJUkVDVE9SWV9MT0NBVE9SKSx0aGlzLnJlYWRCbG9ja1ppcDY0RW5kT2ZDZW50cmFsTG9jYXRvcigpLCF0aGlzLmlzU2lnbmF0dXJlKHRoaXMucmVsYXRpdmVPZmZzZXRFbmRPZlppcDY0Q2VudHJhbERpcixzLlpJUDY0X0NFTlRSQUxfRElSRUNUT1JZX0VORCkmJih0aGlzLnJlbGF0aXZlT2Zmc2V0RW5kT2ZaaXA2NENlbnRyYWxEaXI9dGhpcy5yZWFkZXIubGFzdEluZGV4T2ZTaWduYXR1cmUocy5aSVA2NF9DRU5UUkFMX0RJUkVDVE9SWV9FTkQpLHRoaXMucmVsYXRpdmVPZmZzZXRFbmRPZlppcDY0Q2VudHJhbERpcjwwKSl0aHJvdyBuZXcgRXJyb3IoXCJDb3JydXB0ZWQgemlwOiBjYW4ndCBmaW5kIHRoZSBaSVA2NCBlbmQgb2YgY2VudHJhbCBkaXJlY3RvcnlcIik7dGhpcy5yZWFkZXIuc2V0SW5kZXgodGhpcy5yZWxhdGl2ZU9mZnNldEVuZE9mWmlwNjRDZW50cmFsRGlyKSx0aGlzLmNoZWNrU2lnbmF0dXJlKHMuWklQNjRfQ0VOVFJBTF9ESVJFQ1RPUllfRU5EKSx0aGlzLnJlYWRCbG9ja1ppcDY0RW5kT2ZDZW50cmFsKCl9dmFyIHI9dGhpcy5jZW50cmFsRGlyT2Zmc2V0K3RoaXMuY2VudHJhbERpclNpemU7dGhpcy56aXA2NCYmKHIrPTIwLHIrPTEyK3RoaXMuemlwNjRFbmRPZkNlbnRyYWxTaXplKTt2YXIgbj10LXI7aWYoMDxuKXRoaXMuaXNTaWduYXR1cmUodCxzLkNFTlRSQUxfRklMRV9IRUFERVIpfHwodGhpcy5yZWFkZXIuemVybz1uKTtlbHNlIGlmKG48MCl0aHJvdyBuZXcgRXJyb3IoXCJDb3JydXB0ZWQgemlwOiBtaXNzaW5nIFwiK01hdGguYWJzKG4pK1wiIGJ5dGVzLlwiKX0scHJlcGFyZVJlYWRlcjpmdW5jdGlvbihlKXt0aGlzLnJlYWRlcj1uKGUpfSxsb2FkOmZ1bmN0aW9uKGUpe3RoaXMucHJlcGFyZVJlYWRlcihlKSx0aGlzLnJlYWRFbmRPZkNlbnRyYWwoKSx0aGlzLnJlYWRDZW50cmFsRGlyKCksdGhpcy5yZWFkTG9jYWxGaWxlcygpfX0sdC5leHBvcnRzPWh9LHtcIi4vcmVhZGVyL3JlYWRlckZvclwiOjIyLFwiLi9zaWduYXR1cmVcIjoyMyxcIi4vc3VwcG9ydFwiOjMwLFwiLi91dGlsc1wiOjMyLFwiLi96aXBFbnRyeVwiOjM0fV0sMzQ6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt2YXIgbj1lKFwiLi9yZWFkZXIvcmVhZGVyRm9yXCIpLHM9ZShcIi4vdXRpbHNcIiksaT1lKFwiLi9jb21wcmVzc2VkT2JqZWN0XCIpLGE9ZShcIi4vY3JjMzJcIiksbz1lKFwiLi91dGY4XCIpLGg9ZShcIi4vY29tcHJlc3Npb25zXCIpLHU9ZShcIi4vc3VwcG9ydFwiKTtmdW5jdGlvbiBsKGUsdCl7dGhpcy5vcHRpb25zPWUsdGhpcy5sb2FkT3B0aW9ucz10fWwucHJvdG90eXBlPXtpc0VuY3J5cHRlZDpmdW5jdGlvbigpe3JldHVybiAxPT0oMSZ0aGlzLmJpdEZsYWcpfSx1c2VVVEY4OmZ1bmN0aW9uKCl7cmV0dXJuIDIwNDg9PSgyMDQ4JnRoaXMuYml0RmxhZyl9LHJlYWRMb2NhbFBhcnQ6ZnVuY3Rpb24oZSl7dmFyIHQscjtpZihlLnNraXAoMjIpLHRoaXMuZmlsZU5hbWVMZW5ndGg9ZS5yZWFkSW50KDIpLHI9ZS5yZWFkSW50KDIpLHRoaXMuZmlsZU5hbWU9ZS5yZWFkRGF0YSh0aGlzLmZpbGVOYW1lTGVuZ3RoKSxlLnNraXAociksLTE9PT10aGlzLmNvbXByZXNzZWRTaXplfHwtMT09PXRoaXMudW5jb21wcmVzc2VkU2l6ZSl0aHJvdyBuZXcgRXJyb3IoXCJCdWcgb3IgY29ycnVwdGVkIHppcCA6IGRpZG4ndCBnZXQgZW5vdWdoIGluZm9ybWF0aW9uIGZyb20gdGhlIGNlbnRyYWwgZGlyZWN0b3J5IChjb21wcmVzc2VkU2l6ZSA9PT0gLTEgfHwgdW5jb21wcmVzc2VkU2l6ZSA9PT0gLTEpXCIpO2lmKG51bGw9PT0odD1mdW5jdGlvbihlKXtmb3IodmFyIHQgaW4gaClpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaCx0KSYmaFt0XS5tYWdpYz09PWUpcmV0dXJuIGhbdF07cmV0dXJuIG51bGx9KHRoaXMuY29tcHJlc3Npb25NZXRob2QpKSl0aHJvdyBuZXcgRXJyb3IoXCJDb3JydXB0ZWQgemlwIDogY29tcHJlc3Npb24gXCIrcy5wcmV0dHkodGhpcy5jb21wcmVzc2lvbk1ldGhvZCkrXCIgdW5rbm93biAoaW5uZXIgZmlsZSA6IFwiK3MudHJhbnNmb3JtVG8oXCJzdHJpbmdcIix0aGlzLmZpbGVOYW1lKStcIilcIik7dGhpcy5kZWNvbXByZXNzZWQ9bmV3IGkodGhpcy5jb21wcmVzc2VkU2l6ZSx0aGlzLnVuY29tcHJlc3NlZFNpemUsdGhpcy5jcmMzMix0LGUucmVhZERhdGEodGhpcy5jb21wcmVzc2VkU2l6ZSkpfSxyZWFkQ2VudHJhbFBhcnQ6ZnVuY3Rpb24oZSl7dGhpcy52ZXJzaW9uTWFkZUJ5PWUucmVhZEludCgyKSxlLnNraXAoMiksdGhpcy5iaXRGbGFnPWUucmVhZEludCgyKSx0aGlzLmNvbXByZXNzaW9uTWV0aG9kPWUucmVhZFN0cmluZygyKSx0aGlzLmRhdGU9ZS5yZWFkRGF0ZSgpLHRoaXMuY3JjMzI9ZS5yZWFkSW50KDQpLHRoaXMuY29tcHJlc3NlZFNpemU9ZS5yZWFkSW50KDQpLHRoaXMudW5jb21wcmVzc2VkU2l6ZT1lLnJlYWRJbnQoNCk7dmFyIHQ9ZS5yZWFkSW50KDIpO2lmKHRoaXMuZXh0cmFGaWVsZHNMZW5ndGg9ZS5yZWFkSW50KDIpLHRoaXMuZmlsZUNvbW1lbnRMZW5ndGg9ZS5yZWFkSW50KDIpLHRoaXMuZGlza051bWJlclN0YXJ0PWUucmVhZEludCgyKSx0aGlzLmludGVybmFsRmlsZUF0dHJpYnV0ZXM9ZS5yZWFkSW50KDIpLHRoaXMuZXh0ZXJuYWxGaWxlQXR0cmlidXRlcz1lLnJlYWRJbnQoNCksdGhpcy5sb2NhbEhlYWRlck9mZnNldD1lLnJlYWRJbnQoNCksdGhpcy5pc0VuY3J5cHRlZCgpKXRocm93IG5ldyBFcnJvcihcIkVuY3J5cHRlZCB6aXAgYXJlIG5vdCBzdXBwb3J0ZWRcIik7ZS5za2lwKHQpLHRoaXMucmVhZEV4dHJhRmllbGRzKGUpLHRoaXMucGFyc2VaSVA2NEV4dHJhRmllbGQoZSksdGhpcy5maWxlQ29tbWVudD1lLnJlYWREYXRhKHRoaXMuZmlsZUNvbW1lbnRMZW5ndGgpfSxwcm9jZXNzQXR0cmlidXRlczpmdW5jdGlvbigpe3RoaXMudW5peFBlcm1pc3Npb25zPW51bGwsdGhpcy5kb3NQZXJtaXNzaW9ucz1udWxsO3ZhciBlPXRoaXMudmVyc2lvbk1hZGVCeT4+ODt0aGlzLmRpcj0hISgxNiZ0aGlzLmV4dGVybmFsRmlsZUF0dHJpYnV0ZXMpLDA9PWUmJih0aGlzLmRvc1Blcm1pc3Npb25zPTYzJnRoaXMuZXh0ZXJuYWxGaWxlQXR0cmlidXRlcyksMz09ZSYmKHRoaXMudW5peFBlcm1pc3Npb25zPXRoaXMuZXh0ZXJuYWxGaWxlQXR0cmlidXRlcz4+MTYmNjU1MzUpLHRoaXMuZGlyfHxcIi9cIiE9PXRoaXMuZmlsZU5hbWVTdHIuc2xpY2UoLTEpfHwodGhpcy5kaXI9ITApfSxwYXJzZVpJUDY0RXh0cmFGaWVsZDpmdW5jdGlvbigpe2lmKHRoaXMuZXh0cmFGaWVsZHNbMV0pe3ZhciBlPW4odGhpcy5leHRyYUZpZWxkc1sxXS52YWx1ZSk7dGhpcy51bmNvbXByZXNzZWRTaXplPT09cy5NQVhfVkFMVUVfMzJCSVRTJiYodGhpcy51bmNvbXByZXNzZWRTaXplPWUucmVhZEludCg4KSksdGhpcy5jb21wcmVzc2VkU2l6ZT09PXMuTUFYX1ZBTFVFXzMyQklUUyYmKHRoaXMuY29tcHJlc3NlZFNpemU9ZS5yZWFkSW50KDgpKSx0aGlzLmxvY2FsSGVhZGVyT2Zmc2V0PT09cy5NQVhfVkFMVUVfMzJCSVRTJiYodGhpcy5sb2NhbEhlYWRlck9mZnNldD1lLnJlYWRJbnQoOCkpLHRoaXMuZGlza051bWJlclN0YXJ0PT09cy5NQVhfVkFMVUVfMzJCSVRTJiYodGhpcy5kaXNrTnVtYmVyU3RhcnQ9ZS5yZWFkSW50KDQpKX19LHJlYWRFeHRyYUZpZWxkczpmdW5jdGlvbihlKXt2YXIgdCxyLG4saT1lLmluZGV4K3RoaXMuZXh0cmFGaWVsZHNMZW5ndGg7Zm9yKHRoaXMuZXh0cmFGaWVsZHN8fCh0aGlzLmV4dHJhRmllbGRzPXt9KTtlLmluZGV4KzQ8aTspdD1lLnJlYWRJbnQoMikscj1lLnJlYWRJbnQoMiksbj1lLnJlYWREYXRhKHIpLHRoaXMuZXh0cmFGaWVsZHNbdF09e2lkOnQsbGVuZ3RoOnIsdmFsdWU6bn07ZS5zZXRJbmRleChpKX0saGFuZGxlVVRGODpmdW5jdGlvbigpe3ZhciBlPXUudWludDhhcnJheT9cInVpbnQ4YXJyYXlcIjpcImFycmF5XCI7aWYodGhpcy51c2VVVEY4KCkpdGhpcy5maWxlTmFtZVN0cj1vLnV0ZjhkZWNvZGUodGhpcy5maWxlTmFtZSksdGhpcy5maWxlQ29tbWVudFN0cj1vLnV0ZjhkZWNvZGUodGhpcy5maWxlQ29tbWVudCk7ZWxzZXt2YXIgdD10aGlzLmZpbmRFeHRyYUZpZWxkVW5pY29kZVBhdGgoKTtpZihudWxsIT09dCl0aGlzLmZpbGVOYW1lU3RyPXQ7ZWxzZXt2YXIgcj1zLnRyYW5zZm9ybVRvKGUsdGhpcy5maWxlTmFtZSk7dGhpcy5maWxlTmFtZVN0cj10aGlzLmxvYWRPcHRpb25zLmRlY29kZUZpbGVOYW1lKHIpfXZhciBuPXRoaXMuZmluZEV4dHJhRmllbGRVbmljb2RlQ29tbWVudCgpO2lmKG51bGwhPT1uKXRoaXMuZmlsZUNvbW1lbnRTdHI9bjtlbHNle3ZhciBpPXMudHJhbnNmb3JtVG8oZSx0aGlzLmZpbGVDb21tZW50KTt0aGlzLmZpbGVDb21tZW50U3RyPXRoaXMubG9hZE9wdGlvbnMuZGVjb2RlRmlsZU5hbWUoaSl9fX0sZmluZEV4dHJhRmllbGRVbmljb2RlUGF0aDpmdW5jdGlvbigpe3ZhciBlPXRoaXMuZXh0cmFGaWVsZHNbMjg3ODldO2lmKGUpe3ZhciB0PW4oZS52YWx1ZSk7cmV0dXJuIDEhPT10LnJlYWRJbnQoMSk/bnVsbDphKHRoaXMuZmlsZU5hbWUpIT09dC5yZWFkSW50KDQpP251bGw6by51dGY4ZGVjb2RlKHQucmVhZERhdGEoZS5sZW5ndGgtNSkpfXJldHVybiBudWxsfSxmaW5kRXh0cmFGaWVsZFVuaWNvZGVDb21tZW50OmZ1bmN0aW9uKCl7dmFyIGU9dGhpcy5leHRyYUZpZWxkc1syNTQ2MV07aWYoZSl7dmFyIHQ9bihlLnZhbHVlKTtyZXR1cm4gMSE9PXQucmVhZEludCgxKT9udWxsOmEodGhpcy5maWxlQ29tbWVudCkhPT10LnJlYWRJbnQoNCk/bnVsbDpvLnV0ZjhkZWNvZGUodC5yZWFkRGF0YShlLmxlbmd0aC01KSl9cmV0dXJuIG51bGx9fSx0LmV4cG9ydHM9bH0se1wiLi9jb21wcmVzc2VkT2JqZWN0XCI6MixcIi4vY29tcHJlc3Npb25zXCI6MyxcIi4vY3JjMzJcIjo0LFwiLi9yZWFkZXIvcmVhZGVyRm9yXCI6MjIsXCIuL3N1cHBvcnRcIjozMCxcIi4vdXRmOFwiOjMxLFwiLi91dGlsc1wiOjMyfV0sMzU6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBuKGUsdCxyKXt0aGlzLm5hbWU9ZSx0aGlzLmRpcj1yLmRpcix0aGlzLmRhdGU9ci5kYXRlLHRoaXMuY29tbWVudD1yLmNvbW1lbnQsdGhpcy51bml4UGVybWlzc2lvbnM9ci51bml4UGVybWlzc2lvbnMsdGhpcy5kb3NQZXJtaXNzaW9ucz1yLmRvc1Blcm1pc3Npb25zLHRoaXMuX2RhdGE9dCx0aGlzLl9kYXRhQmluYXJ5PXIuYmluYXJ5LHRoaXMub3B0aW9ucz17Y29tcHJlc3Npb246ci5jb21wcmVzc2lvbixjb21wcmVzc2lvbk9wdGlvbnM6ci5jb21wcmVzc2lvbk9wdGlvbnN9fXZhciBzPWUoXCIuL3N0cmVhbS9TdHJlYW1IZWxwZXJcIiksaT1lKFwiLi9zdHJlYW0vRGF0YVdvcmtlclwiKSxhPWUoXCIuL3V0ZjhcIiksbz1lKFwiLi9jb21wcmVzc2VkT2JqZWN0XCIpLGg9ZShcIi4vc3RyZWFtL0dlbmVyaWNXb3JrZXJcIik7bi5wcm90b3R5cGU9e2ludGVybmFsU3RyZWFtOmZ1bmN0aW9uKGUpe3ZhciB0PW51bGwscj1cInN0cmluZ1wiO3RyeXtpZighZSl0aHJvdyBuZXcgRXJyb3IoXCJObyBvdXRwdXQgdHlwZSBzcGVjaWZpZWQuXCIpO3ZhciBuPVwic3RyaW5nXCI9PT0ocj1lLnRvTG93ZXJDYXNlKCkpfHxcInRleHRcIj09PXI7XCJiaW5hcnlzdHJpbmdcIiE9PXImJlwidGV4dFwiIT09cnx8KHI9XCJzdHJpbmdcIiksdD10aGlzLl9kZWNvbXByZXNzV29ya2VyKCk7dmFyIGk9IXRoaXMuX2RhdGFCaW5hcnk7aSYmIW4mJih0PXQucGlwZShuZXcgYS5VdGY4RW5jb2RlV29ya2VyKSksIWkmJm4mJih0PXQucGlwZShuZXcgYS5VdGY4RGVjb2RlV29ya2VyKSl9Y2F0Y2goZSl7KHQ9bmV3IGgoXCJlcnJvclwiKSkuZXJyb3IoZSl9cmV0dXJuIG5ldyBzKHQscixcIlwiKX0sYXN5bmM6ZnVuY3Rpb24oZSx0KXtyZXR1cm4gdGhpcy5pbnRlcm5hbFN0cmVhbShlKS5hY2N1bXVsYXRlKHQpfSxub2RlU3RyZWFtOmZ1bmN0aW9uKGUsdCl7cmV0dXJuIHRoaXMuaW50ZXJuYWxTdHJlYW0oZXx8XCJub2RlYnVmZmVyXCIpLnRvTm9kZWpzU3RyZWFtKHQpfSxfY29tcHJlc3NXb3JrZXI6ZnVuY3Rpb24oZSx0KXtpZih0aGlzLl9kYXRhIGluc3RhbmNlb2YgbyYmdGhpcy5fZGF0YS5jb21wcmVzc2lvbi5tYWdpYz09PWUubWFnaWMpcmV0dXJuIHRoaXMuX2RhdGEuZ2V0Q29tcHJlc3NlZFdvcmtlcigpO3ZhciByPXRoaXMuX2RlY29tcHJlc3NXb3JrZXIoKTtyZXR1cm4gdGhpcy5fZGF0YUJpbmFyeXx8KHI9ci5waXBlKG5ldyBhLlV0ZjhFbmNvZGVXb3JrZXIpKSxvLmNyZWF0ZVdvcmtlckZyb20ocixlLHQpfSxfZGVjb21wcmVzc1dvcmtlcjpmdW5jdGlvbigpe3JldHVybiB0aGlzLl9kYXRhIGluc3RhbmNlb2Ygbz90aGlzLl9kYXRhLmdldENvbnRlbnRXb3JrZXIoKTp0aGlzLl9kYXRhIGluc3RhbmNlb2YgaD90aGlzLl9kYXRhOm5ldyBpKHRoaXMuX2RhdGEpfX07Zm9yKHZhciB1PVtcImFzVGV4dFwiLFwiYXNCaW5hcnlcIixcImFzTm9kZUJ1ZmZlclwiLFwiYXNVaW50OEFycmF5XCIsXCJhc0FycmF5QnVmZmVyXCJdLGw9ZnVuY3Rpb24oKXt0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIG1ldGhvZCBoYXMgYmVlbiByZW1vdmVkIGluIEpTWmlwIDMuMCwgcGxlYXNlIGNoZWNrIHRoZSB1cGdyYWRlIGd1aWRlLlwiKX0sZj0wO2Y8dS5sZW5ndGg7ZisrKW4ucHJvdG90eXBlW3VbZl1dPWw7dC5leHBvcnRzPW59LHtcIi4vY29tcHJlc3NlZE9iamVjdFwiOjIsXCIuL3N0cmVhbS9EYXRhV29ya2VyXCI6MjcsXCIuL3N0cmVhbS9HZW5lcmljV29ya2VyXCI6MjgsXCIuL3N0cmVhbS9TdHJlYW1IZWxwZXJcIjoyOSxcIi4vdXRmOFwiOjMxfV0sMzY6W2Z1bmN0aW9uKGUsbCx0KXsoZnVuY3Rpb24odCl7XCJ1c2Ugc3RyaWN0XCI7dmFyIHIsbixlPXQuTXV0YXRpb25PYnNlcnZlcnx8dC5XZWJLaXRNdXRhdGlvbk9ic2VydmVyO2lmKGUpe3ZhciBpPTAscz1uZXcgZSh1KSxhPXQuZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJcIik7cy5vYnNlcnZlKGEse2NoYXJhY3RlckRhdGE6ITB9KSxyPWZ1bmN0aW9uKCl7YS5kYXRhPWk9KytpJTJ9fWVsc2UgaWYodC5zZXRJbW1lZGlhdGV8fHZvaWQgMD09PXQuTWVzc2FnZUNoYW5uZWwpcj1cImRvY3VtZW50XCJpbiB0JiZcIm9ucmVhZHlzdGF0ZWNoYW5nZVwiaW4gdC5kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpP2Z1bmN0aW9uKCl7dmFyIGU9dC5kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO2Uub25yZWFkeXN0YXRlY2hhbmdlPWZ1bmN0aW9uKCl7dSgpLGUub25yZWFkeXN0YXRlY2hhbmdlPW51bGwsZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGUpLGU9bnVsbH0sdC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYXBwZW5kQ2hpbGQoZSl9OmZ1bmN0aW9uKCl7c2V0VGltZW91dCh1LDApfTtlbHNle3ZhciBvPW5ldyB0Lk1lc3NhZ2VDaGFubmVsO28ucG9ydDEub25tZXNzYWdlPXUscj1mdW5jdGlvbigpe28ucG9ydDIucG9zdE1lc3NhZ2UoMCl9fXZhciBoPVtdO2Z1bmN0aW9uIHUoKXt2YXIgZSx0O249ITA7Zm9yKHZhciByPWgubGVuZ3RoO3I7KXtmb3IodD1oLGg9W10sZT0tMTsrK2U8cjspdFtlXSgpO3I9aC5sZW5ndGh9bj0hMX1sLmV4cG9ydHM9ZnVuY3Rpb24oZSl7MSE9PWgucHVzaChlKXx8bnx8cigpfX0pLmNhbGwodGhpcyxcInVuZGVmaW5lZFwiIT10eXBlb2YgZ2xvYmFsP2dsb2JhbDpcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZj9zZWxmOlwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/d2luZG93Ont9KX0se31dLDM3OltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7dmFyIGk9ZShcImltbWVkaWF0ZVwiKTtmdW5jdGlvbiB1KCl7fXZhciBsPXt9LHM9W1wiUkVKRUNURURcIl0sYT1bXCJGVUxGSUxMRURcIl0sbj1bXCJQRU5ESU5HXCJdO2Z1bmN0aW9uIG8oZSl7aWYoXCJmdW5jdGlvblwiIT10eXBlb2YgZSl0aHJvdyBuZXcgVHlwZUVycm9yKFwicmVzb2x2ZXIgbXVzdCBiZSBhIGZ1bmN0aW9uXCIpO3RoaXMuc3RhdGU9bix0aGlzLnF1ZXVlPVtdLHRoaXMub3V0Y29tZT12b2lkIDAsZSE9PXUmJmQodGhpcyxlKX1mdW5jdGlvbiBoKGUsdCxyKXt0aGlzLnByb21pc2U9ZSxcImZ1bmN0aW9uXCI9PXR5cGVvZiB0JiYodGhpcy5vbkZ1bGZpbGxlZD10LHRoaXMuY2FsbEZ1bGZpbGxlZD10aGlzLm90aGVyQ2FsbEZ1bGZpbGxlZCksXCJmdW5jdGlvblwiPT10eXBlb2YgciYmKHRoaXMub25SZWplY3RlZD1yLHRoaXMuY2FsbFJlamVjdGVkPXRoaXMub3RoZXJDYWxsUmVqZWN0ZWQpfWZ1bmN0aW9uIGYodCxyLG4pe2koZnVuY3Rpb24oKXt2YXIgZTt0cnl7ZT1yKG4pfWNhdGNoKGUpe3JldHVybiBsLnJlamVjdCh0LGUpfWU9PT10P2wucmVqZWN0KHQsbmV3IFR5cGVFcnJvcihcIkNhbm5vdCByZXNvbHZlIHByb21pc2Ugd2l0aCBpdHNlbGZcIikpOmwucmVzb2x2ZSh0LGUpfSl9ZnVuY3Rpb24gYyhlKXt2YXIgdD1lJiZlLnRoZW47aWYoZSYmKFwib2JqZWN0XCI9PXR5cGVvZiBlfHxcImZ1bmN0aW9uXCI9PXR5cGVvZiBlKSYmXCJmdW5jdGlvblwiPT10eXBlb2YgdClyZXR1cm4gZnVuY3Rpb24oKXt0LmFwcGx5KGUsYXJndW1lbnRzKX19ZnVuY3Rpb24gZCh0LGUpe3ZhciByPSExO2Z1bmN0aW9uIG4oZSl7cnx8KHI9ITAsbC5yZWplY3QodCxlKSl9ZnVuY3Rpb24gaShlKXtyfHwocj0hMCxsLnJlc29sdmUodCxlKSl9dmFyIHM9cChmdW5jdGlvbigpe2UoaSxuKX0pO1wiZXJyb3JcIj09PXMuc3RhdHVzJiZuKHMudmFsdWUpfWZ1bmN0aW9uIHAoZSx0KXt2YXIgcj17fTt0cnl7ci52YWx1ZT1lKHQpLHIuc3RhdHVzPVwic3VjY2Vzc1wifWNhdGNoKGUpe3Iuc3RhdHVzPVwiZXJyb3JcIixyLnZhbHVlPWV9cmV0dXJuIHJ9KHQuZXhwb3J0cz1vKS5wcm90b3R5cGUuZmluYWxseT1mdW5jdGlvbih0KXtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiB0KXJldHVybiB0aGlzO3ZhciByPXRoaXMuY29uc3RydWN0b3I7cmV0dXJuIHRoaXMudGhlbihmdW5jdGlvbihlKXtyZXR1cm4gci5yZXNvbHZlKHQoKSkudGhlbihmdW5jdGlvbigpe3JldHVybiBlfSl9LGZ1bmN0aW9uKGUpe3JldHVybiByLnJlc29sdmUodCgpKS50aGVuKGZ1bmN0aW9uKCl7dGhyb3cgZX0pfSl9LG8ucHJvdG90eXBlLmNhdGNoPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLnRoZW4obnVsbCxlKX0sby5wcm90b3R5cGUudGhlbj1mdW5jdGlvbihlLHQpe2lmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIGUmJnRoaXMuc3RhdGU9PT1hfHxcImZ1bmN0aW9uXCIhPXR5cGVvZiB0JiZ0aGlzLnN0YXRlPT09cylyZXR1cm4gdGhpczt2YXIgcj1uZXcgdGhpcy5jb25zdHJ1Y3Rvcih1KTt0aGlzLnN0YXRlIT09bj9mKHIsdGhpcy5zdGF0ZT09PWE/ZTp0LHRoaXMub3V0Y29tZSk6dGhpcy5xdWV1ZS5wdXNoKG5ldyBoKHIsZSx0KSk7cmV0dXJuIHJ9LGgucHJvdG90eXBlLmNhbGxGdWxmaWxsZWQ9ZnVuY3Rpb24oZSl7bC5yZXNvbHZlKHRoaXMucHJvbWlzZSxlKX0saC5wcm90b3R5cGUub3RoZXJDYWxsRnVsZmlsbGVkPWZ1bmN0aW9uKGUpe2YodGhpcy5wcm9taXNlLHRoaXMub25GdWxmaWxsZWQsZSl9LGgucHJvdG90eXBlLmNhbGxSZWplY3RlZD1mdW5jdGlvbihlKXtsLnJlamVjdCh0aGlzLnByb21pc2UsZSl9LGgucHJvdG90eXBlLm90aGVyQ2FsbFJlamVjdGVkPWZ1bmN0aW9uKGUpe2YodGhpcy5wcm9taXNlLHRoaXMub25SZWplY3RlZCxlKX0sbC5yZXNvbHZlPWZ1bmN0aW9uKGUsdCl7dmFyIHI9cChjLHQpO2lmKFwiZXJyb3JcIj09PXIuc3RhdHVzKXJldHVybiBsLnJlamVjdChlLHIudmFsdWUpO3ZhciBuPXIudmFsdWU7aWYobilkKGUsbik7ZWxzZXtlLnN0YXRlPWEsZS5vdXRjb21lPXQ7Zm9yKHZhciBpPS0xLHM9ZS5xdWV1ZS5sZW5ndGg7KytpPHM7KWUucXVldWVbaV0uY2FsbEZ1bGZpbGxlZCh0KX1yZXR1cm4gZX0sbC5yZWplY3Q9ZnVuY3Rpb24oZSx0KXtlLnN0YXRlPXMsZS5vdXRjb21lPXQ7Zm9yKHZhciByPS0xLG49ZS5xdWV1ZS5sZW5ndGg7KytyPG47KWUucXVldWVbcl0uY2FsbFJlamVjdGVkKHQpO3JldHVybiBlfSxvLnJlc29sdmU9ZnVuY3Rpb24oZSl7aWYoZSBpbnN0YW5jZW9mIHRoaXMpcmV0dXJuIGU7cmV0dXJuIGwucmVzb2x2ZShuZXcgdGhpcyh1KSxlKX0sby5yZWplY3Q9ZnVuY3Rpb24oZSl7dmFyIHQ9bmV3IHRoaXModSk7cmV0dXJuIGwucmVqZWN0KHQsZSl9LG8uYWxsPWZ1bmN0aW9uKGUpe3ZhciByPXRoaXM7aWYoXCJbb2JqZWN0IEFycmF5XVwiIT09T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGUpKXJldHVybiB0aGlzLnJlamVjdChuZXcgVHlwZUVycm9yKFwibXVzdCBiZSBhbiBhcnJheVwiKSk7dmFyIG49ZS5sZW5ndGgsaT0hMTtpZighbilyZXR1cm4gdGhpcy5yZXNvbHZlKFtdKTt2YXIgcz1uZXcgQXJyYXkobiksYT0wLHQ9LTEsbz1uZXcgdGhpcyh1KTtmb3IoOysrdDxuOyloKGVbdF0sdCk7cmV0dXJuIG87ZnVuY3Rpb24gaChlLHQpe3IucmVzb2x2ZShlKS50aGVuKGZ1bmN0aW9uKGUpe3NbdF09ZSwrK2EhPT1ufHxpfHwoaT0hMCxsLnJlc29sdmUobyxzKSl9LGZ1bmN0aW9uKGUpe2l8fChpPSEwLGwucmVqZWN0KG8sZSkpfSl9fSxvLnJhY2U9ZnVuY3Rpb24oZSl7dmFyIHQ9dGhpcztpZihcIltvYmplY3QgQXJyYXldXCIhPT1PYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZSkpcmV0dXJuIHRoaXMucmVqZWN0KG5ldyBUeXBlRXJyb3IoXCJtdXN0IGJlIGFuIGFycmF5XCIpKTt2YXIgcj1lLmxlbmd0aCxuPSExO2lmKCFyKXJldHVybiB0aGlzLnJlc29sdmUoW10pO3ZhciBpPS0xLHM9bmV3IHRoaXModSk7Zm9yKDsrK2k8cjspYT1lW2ldLHQucmVzb2x2ZShhKS50aGVuKGZ1bmN0aW9uKGUpe258fChuPSEwLGwucmVzb2x2ZShzLGUpKX0sZnVuY3Rpb24oZSl7bnx8KG49ITAsbC5yZWplY3QocyxlKSl9KTt2YXIgYTtyZXR1cm4gc319LHtpbW1lZGlhdGU6MzZ9XSwzODpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3ZhciBuPXt9OygwLGUoXCIuL2xpYi91dGlscy9jb21tb25cIikuYXNzaWduKShuLGUoXCIuL2xpYi9kZWZsYXRlXCIpLGUoXCIuL2xpYi9pbmZsYXRlXCIpLGUoXCIuL2xpYi96bGliL2NvbnN0YW50c1wiKSksdC5leHBvcnRzPW59LHtcIi4vbGliL2RlZmxhdGVcIjozOSxcIi4vbGliL2luZmxhdGVcIjo0MCxcIi4vbGliL3V0aWxzL2NvbW1vblwiOjQxLFwiLi9saWIvemxpYi9jb25zdGFudHNcIjo0NH1dLDM5OltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7dmFyIGE9ZShcIi4vemxpYi9kZWZsYXRlXCIpLG89ZShcIi4vdXRpbHMvY29tbW9uXCIpLGg9ZShcIi4vdXRpbHMvc3RyaW5nc1wiKSxpPWUoXCIuL3psaWIvbWVzc2FnZXNcIikscz1lKFwiLi96bGliL3pzdHJlYW1cIiksdT1PYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLGw9MCxmPS0xLGM9MCxkPTg7ZnVuY3Rpb24gcChlKXtpZighKHRoaXMgaW5zdGFuY2VvZiBwKSlyZXR1cm4gbmV3IHAoZSk7dGhpcy5vcHRpb25zPW8uYXNzaWduKHtsZXZlbDpmLG1ldGhvZDpkLGNodW5rU2l6ZToxNjM4NCx3aW5kb3dCaXRzOjE1LG1lbUxldmVsOjgsc3RyYXRlZ3k6Yyx0bzpcIlwifSxlfHx7fSk7dmFyIHQ9dGhpcy5vcHRpb25zO3QucmF3JiYwPHQud2luZG93Qml0cz90LndpbmRvd0JpdHM9LXQud2luZG93Qml0czp0Lmd6aXAmJjA8dC53aW5kb3dCaXRzJiZ0LndpbmRvd0JpdHM8MTYmJih0LndpbmRvd0JpdHMrPTE2KSx0aGlzLmVycj0wLHRoaXMubXNnPVwiXCIsdGhpcy5lbmRlZD0hMSx0aGlzLmNodW5rcz1bXSx0aGlzLnN0cm09bmV3IHMsdGhpcy5zdHJtLmF2YWlsX291dD0wO3ZhciByPWEuZGVmbGF0ZUluaXQyKHRoaXMuc3RybSx0LmxldmVsLHQubWV0aG9kLHQud2luZG93Qml0cyx0Lm1lbUxldmVsLHQuc3RyYXRlZ3kpO2lmKHIhPT1sKXRocm93IG5ldyBFcnJvcihpW3JdKTtpZih0LmhlYWRlciYmYS5kZWZsYXRlU2V0SGVhZGVyKHRoaXMuc3RybSx0LmhlYWRlciksdC5kaWN0aW9uYXJ5KXt2YXIgbjtpZihuPVwic3RyaW5nXCI9PXR5cGVvZiB0LmRpY3Rpb25hcnk/aC5zdHJpbmcyYnVmKHQuZGljdGlvbmFyeSk6XCJbb2JqZWN0IEFycmF5QnVmZmVyXVwiPT09dS5jYWxsKHQuZGljdGlvbmFyeSk/bmV3IFVpbnQ4QXJyYXkodC5kaWN0aW9uYXJ5KTp0LmRpY3Rpb25hcnksKHI9YS5kZWZsYXRlU2V0RGljdGlvbmFyeSh0aGlzLnN0cm0sbikpIT09bCl0aHJvdyBuZXcgRXJyb3IoaVtyXSk7dGhpcy5fZGljdF9zZXQ9ITB9fWZ1bmN0aW9uIG4oZSx0KXt2YXIgcj1uZXcgcCh0KTtpZihyLnB1c2goZSwhMCksci5lcnIpdGhyb3cgci5tc2d8fGlbci5lcnJdO3JldHVybiByLnJlc3VsdH1wLnByb3RvdHlwZS5wdXNoPWZ1bmN0aW9uKGUsdCl7dmFyIHIsbixpPXRoaXMuc3RybSxzPXRoaXMub3B0aW9ucy5jaHVua1NpemU7aWYodGhpcy5lbmRlZClyZXR1cm4hMTtuPXQ9PT1+fnQ/dDohMD09PXQ/NDowLFwic3RyaW5nXCI9PXR5cGVvZiBlP2kuaW5wdXQ9aC5zdHJpbmcyYnVmKGUpOlwiW29iamVjdCBBcnJheUJ1ZmZlcl1cIj09PXUuY2FsbChlKT9pLmlucHV0PW5ldyBVaW50OEFycmF5KGUpOmkuaW5wdXQ9ZSxpLm5leHRfaW49MCxpLmF2YWlsX2luPWkuaW5wdXQubGVuZ3RoO2Rve2lmKDA9PT1pLmF2YWlsX291dCYmKGkub3V0cHV0PW5ldyBvLkJ1ZjgocyksaS5uZXh0X291dD0wLGkuYXZhaWxfb3V0PXMpLDEhPT0ocj1hLmRlZmxhdGUoaSxuKSkmJnIhPT1sKXJldHVybiB0aGlzLm9uRW5kKHIpLCEodGhpcy5lbmRlZD0hMCk7MCE9PWkuYXZhaWxfb3V0JiYoMCE9PWkuYXZhaWxfaW58fDQhPT1uJiYyIT09bil8fChcInN0cmluZ1wiPT09dGhpcy5vcHRpb25zLnRvP3RoaXMub25EYXRhKGguYnVmMmJpbnN0cmluZyhvLnNocmlua0J1ZihpLm91dHB1dCxpLm5leHRfb3V0KSkpOnRoaXMub25EYXRhKG8uc2hyaW5rQnVmKGkub3V0cHV0LGkubmV4dF9vdXQpKSl9d2hpbGUoKDA8aS5hdmFpbF9pbnx8MD09PWkuYXZhaWxfb3V0KSYmMSE9PXIpO3JldHVybiA0PT09bj8ocj1hLmRlZmxhdGVFbmQodGhpcy5zdHJtKSx0aGlzLm9uRW5kKHIpLHRoaXMuZW5kZWQ9ITAscj09PWwpOjIhPT1ufHwodGhpcy5vbkVuZChsKSwhKGkuYXZhaWxfb3V0PTApKX0scC5wcm90b3R5cGUub25EYXRhPWZ1bmN0aW9uKGUpe3RoaXMuY2h1bmtzLnB1c2goZSl9LHAucHJvdG90eXBlLm9uRW5kPWZ1bmN0aW9uKGUpe2U9PT1sJiYoXCJzdHJpbmdcIj09PXRoaXMub3B0aW9ucy50bz90aGlzLnJlc3VsdD10aGlzLmNodW5rcy5qb2luKFwiXCIpOnRoaXMucmVzdWx0PW8uZmxhdHRlbkNodW5rcyh0aGlzLmNodW5rcykpLHRoaXMuY2h1bmtzPVtdLHRoaXMuZXJyPWUsdGhpcy5tc2c9dGhpcy5zdHJtLm1zZ30sci5EZWZsYXRlPXAsci5kZWZsYXRlPW4sci5kZWZsYXRlUmF3PWZ1bmN0aW9uKGUsdCl7cmV0dXJuKHQ9dHx8e30pLnJhdz0hMCxuKGUsdCl9LHIuZ3ppcD1mdW5jdGlvbihlLHQpe3JldHVybih0PXR8fHt9KS5nemlwPSEwLG4oZSx0KX19LHtcIi4vdXRpbHMvY29tbW9uXCI6NDEsXCIuL3V0aWxzL3N0cmluZ3NcIjo0MixcIi4vemxpYi9kZWZsYXRlXCI6NDYsXCIuL3psaWIvbWVzc2FnZXNcIjo1MSxcIi4vemxpYi96c3RyZWFtXCI6NTN9XSw0MDpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3ZhciBjPWUoXCIuL3psaWIvaW5mbGF0ZVwiKSxkPWUoXCIuL3V0aWxzL2NvbW1vblwiKSxwPWUoXCIuL3V0aWxzL3N0cmluZ3NcIiksbT1lKFwiLi96bGliL2NvbnN0YW50c1wiKSxuPWUoXCIuL3psaWIvbWVzc2FnZXNcIiksaT1lKFwiLi96bGliL3pzdHJlYW1cIikscz1lKFwiLi96bGliL2d6aGVhZGVyXCIpLF89T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztmdW5jdGlvbiBhKGUpe2lmKCEodGhpcyBpbnN0YW5jZW9mIGEpKXJldHVybiBuZXcgYShlKTt0aGlzLm9wdGlvbnM9ZC5hc3NpZ24oe2NodW5rU2l6ZToxNjM4NCx3aW5kb3dCaXRzOjAsdG86XCJcIn0sZXx8e30pO3ZhciB0PXRoaXMub3B0aW9uczt0LnJhdyYmMDw9dC53aW5kb3dCaXRzJiZ0LndpbmRvd0JpdHM8MTYmJih0LndpbmRvd0JpdHM9LXQud2luZG93Qml0cywwPT09dC53aW5kb3dCaXRzJiYodC53aW5kb3dCaXRzPS0xNSkpLCEoMDw9dC53aW5kb3dCaXRzJiZ0LndpbmRvd0JpdHM8MTYpfHxlJiZlLndpbmRvd0JpdHN8fCh0LndpbmRvd0JpdHMrPTMyKSwxNTx0LndpbmRvd0JpdHMmJnQud2luZG93Qml0czw0OCYmMD09KDE1JnQud2luZG93Qml0cykmJih0LndpbmRvd0JpdHN8PTE1KSx0aGlzLmVycj0wLHRoaXMubXNnPVwiXCIsdGhpcy5lbmRlZD0hMSx0aGlzLmNodW5rcz1bXSx0aGlzLnN0cm09bmV3IGksdGhpcy5zdHJtLmF2YWlsX291dD0wO3ZhciByPWMuaW5mbGF0ZUluaXQyKHRoaXMuc3RybSx0LndpbmRvd0JpdHMpO2lmKHIhPT1tLlpfT0spdGhyb3cgbmV3IEVycm9yKG5bcl0pO3RoaXMuaGVhZGVyPW5ldyBzLGMuaW5mbGF0ZUdldEhlYWRlcih0aGlzLnN0cm0sdGhpcy5oZWFkZXIpfWZ1bmN0aW9uIG8oZSx0KXt2YXIgcj1uZXcgYSh0KTtpZihyLnB1c2goZSwhMCksci5lcnIpdGhyb3cgci5tc2d8fG5bci5lcnJdO3JldHVybiByLnJlc3VsdH1hLnByb3RvdHlwZS5wdXNoPWZ1bmN0aW9uKGUsdCl7dmFyIHIsbixpLHMsYSxvLGg9dGhpcy5zdHJtLHU9dGhpcy5vcHRpb25zLmNodW5rU2l6ZSxsPXRoaXMub3B0aW9ucy5kaWN0aW9uYXJ5LGY9ITE7aWYodGhpcy5lbmRlZClyZXR1cm4hMTtuPXQ9PT1+fnQ/dDohMD09PXQ/bS5aX0ZJTklTSDptLlpfTk9fRkxVU0gsXCJzdHJpbmdcIj09dHlwZW9mIGU/aC5pbnB1dD1wLmJpbnN0cmluZzJidWYoZSk6XCJbb2JqZWN0IEFycmF5QnVmZmVyXVwiPT09Xy5jYWxsKGUpP2guaW5wdXQ9bmV3IFVpbnQ4QXJyYXkoZSk6aC5pbnB1dD1lLGgubmV4dF9pbj0wLGguYXZhaWxfaW49aC5pbnB1dC5sZW5ndGg7ZG97aWYoMD09PWguYXZhaWxfb3V0JiYoaC5vdXRwdXQ9bmV3IGQuQnVmOCh1KSxoLm5leHRfb3V0PTAsaC5hdmFpbF9vdXQ9dSksKHI9Yy5pbmZsYXRlKGgsbS5aX05PX0ZMVVNIKSk9PT1tLlpfTkVFRF9ESUNUJiZsJiYobz1cInN0cmluZ1wiPT10eXBlb2YgbD9wLnN0cmluZzJidWYobCk6XCJbb2JqZWN0IEFycmF5QnVmZmVyXVwiPT09Xy5jYWxsKGwpP25ldyBVaW50OEFycmF5KGwpOmwscj1jLmluZmxhdGVTZXREaWN0aW9uYXJ5KHRoaXMuc3RybSxvKSkscj09PW0uWl9CVUZfRVJST1ImJiEwPT09ZiYmKHI9bS5aX09LLGY9ITEpLHIhPT1tLlpfU1RSRUFNX0VORCYmciE9PW0uWl9PSylyZXR1cm4gdGhpcy5vbkVuZChyKSwhKHRoaXMuZW5kZWQ9ITApO2gubmV4dF9vdXQmJigwIT09aC5hdmFpbF9vdXQmJnIhPT1tLlpfU1RSRUFNX0VORCYmKDAhPT1oLmF2YWlsX2lufHxuIT09bS5aX0ZJTklTSCYmbiE9PW0uWl9TWU5DX0ZMVVNIKXx8KFwic3RyaW5nXCI9PT10aGlzLm9wdGlvbnMudG8/KGk9cC51dGY4Ym9yZGVyKGgub3V0cHV0LGgubmV4dF9vdXQpLHM9aC5uZXh0X291dC1pLGE9cC5idWYyc3RyaW5nKGgub3V0cHV0LGkpLGgubmV4dF9vdXQ9cyxoLmF2YWlsX291dD11LXMscyYmZC5hcnJheVNldChoLm91dHB1dCxoLm91dHB1dCxpLHMsMCksdGhpcy5vbkRhdGEoYSkpOnRoaXMub25EYXRhKGQuc2hyaW5rQnVmKGgub3V0cHV0LGgubmV4dF9vdXQpKSkpLDA9PT1oLmF2YWlsX2luJiYwPT09aC5hdmFpbF9vdXQmJihmPSEwKX13aGlsZSgoMDxoLmF2YWlsX2lufHwwPT09aC5hdmFpbF9vdXQpJiZyIT09bS5aX1NUUkVBTV9FTkQpO3JldHVybiByPT09bS5aX1NUUkVBTV9FTkQmJihuPW0uWl9GSU5JU0gpLG49PT1tLlpfRklOSVNIPyhyPWMuaW5mbGF0ZUVuZCh0aGlzLnN0cm0pLHRoaXMub25FbmQociksdGhpcy5lbmRlZD0hMCxyPT09bS5aX09LKTpuIT09bS5aX1NZTkNfRkxVU0h8fCh0aGlzLm9uRW5kKG0uWl9PSyksIShoLmF2YWlsX291dD0wKSl9LGEucHJvdG90eXBlLm9uRGF0YT1mdW5jdGlvbihlKXt0aGlzLmNodW5rcy5wdXNoKGUpfSxhLnByb3RvdHlwZS5vbkVuZD1mdW5jdGlvbihlKXtlPT09bS5aX09LJiYoXCJzdHJpbmdcIj09PXRoaXMub3B0aW9ucy50bz90aGlzLnJlc3VsdD10aGlzLmNodW5rcy5qb2luKFwiXCIpOnRoaXMucmVzdWx0PWQuZmxhdHRlbkNodW5rcyh0aGlzLmNodW5rcykpLHRoaXMuY2h1bmtzPVtdLHRoaXMuZXJyPWUsdGhpcy5tc2c9dGhpcy5zdHJtLm1zZ30sci5JbmZsYXRlPWEsci5pbmZsYXRlPW8sci5pbmZsYXRlUmF3PWZ1bmN0aW9uKGUsdCl7cmV0dXJuKHQ9dHx8e30pLnJhdz0hMCxvKGUsdCl9LHIudW5nemlwPW99LHtcIi4vdXRpbHMvY29tbW9uXCI6NDEsXCIuL3V0aWxzL3N0cmluZ3NcIjo0MixcIi4vemxpYi9jb25zdGFudHNcIjo0NCxcIi4vemxpYi9nemhlYWRlclwiOjQ3LFwiLi96bGliL2luZmxhdGVcIjo0OSxcIi4vemxpYi9tZXNzYWdlc1wiOjUxLFwiLi96bGliL3pzdHJlYW1cIjo1M31dLDQxOltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7dmFyIG49XCJ1bmRlZmluZWRcIiE9dHlwZW9mIFVpbnQ4QXJyYXkmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBVaW50MTZBcnJheSYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIEludDMyQXJyYXk7ci5hc3NpZ249ZnVuY3Rpb24oZSl7Zm9yKHZhciB0PUFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywxKTt0Lmxlbmd0aDspe3ZhciByPXQuc2hpZnQoKTtpZihyKXtpZihcIm9iamVjdFwiIT10eXBlb2Ygcil0aHJvdyBuZXcgVHlwZUVycm9yKHIrXCJtdXN0IGJlIG5vbi1vYmplY3RcIik7Zm9yKHZhciBuIGluIHIpci5oYXNPd25Qcm9wZXJ0eShuKSYmKGVbbl09cltuXSl9fXJldHVybiBlfSxyLnNocmlua0J1Zj1mdW5jdGlvbihlLHQpe3JldHVybiBlLmxlbmd0aD09PXQ/ZTplLnN1YmFycmF5P2Uuc3ViYXJyYXkoMCx0KTooZS5sZW5ndGg9dCxlKX07dmFyIGk9e2FycmF5U2V0OmZ1bmN0aW9uKGUsdCxyLG4saSl7aWYodC5zdWJhcnJheSYmZS5zdWJhcnJheSllLnNldCh0LnN1YmFycmF5KHIscituKSxpKTtlbHNlIGZvcih2YXIgcz0wO3M8bjtzKyspZVtpK3NdPXRbcitzXX0sZmxhdHRlbkNodW5rczpmdW5jdGlvbihlKXt2YXIgdCxyLG4saSxzLGE7Zm9yKHQ9bj0wLHI9ZS5sZW5ndGg7dDxyO3QrKyluKz1lW3RdLmxlbmd0aDtmb3IoYT1uZXcgVWludDhBcnJheShuKSx0PWk9MCxyPWUubGVuZ3RoO3Q8cjt0Kyspcz1lW3RdLGEuc2V0KHMsaSksaSs9cy5sZW5ndGg7cmV0dXJuIGF9fSxzPXthcnJheVNldDpmdW5jdGlvbihlLHQscixuLGkpe2Zvcih2YXIgcz0wO3M8bjtzKyspZVtpK3NdPXRbcitzXX0sZmxhdHRlbkNodW5rczpmdW5jdGlvbihlKXtyZXR1cm5bXS5jb25jYXQuYXBwbHkoW10sZSl9fTtyLnNldFR5cGVkPWZ1bmN0aW9uKGUpe2U/KHIuQnVmOD1VaW50OEFycmF5LHIuQnVmMTY9VWludDE2QXJyYXksci5CdWYzMj1JbnQzMkFycmF5LHIuYXNzaWduKHIsaSkpOihyLkJ1Zjg9QXJyYXksci5CdWYxNj1BcnJheSxyLkJ1ZjMyPUFycmF5LHIuYXNzaWduKHIscykpfSxyLnNldFR5cGVkKG4pfSx7fV0sNDI6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt2YXIgaD1lKFwiLi9jb21tb25cIiksaT0hMCxzPSEwO3RyeXtTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsWzBdKX1jYXRjaChlKXtpPSExfXRyeXtTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsbmV3IFVpbnQ4QXJyYXkoMSkpfWNhdGNoKGUpe3M9ITF9Zm9yKHZhciB1PW5ldyBoLkJ1ZjgoMjU2KSxuPTA7bjwyNTY7bisrKXVbbl09MjUyPD1uPzY6MjQ4PD1uPzU6MjQwPD1uPzQ6MjI0PD1uPzM6MTkyPD1uPzI6MTtmdW5jdGlvbiBsKGUsdCl7aWYodDw2NTUzNyYmKGUuc3ViYXJyYXkmJnN8fCFlLnN1YmFycmF5JiZpKSlyZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLGguc2hyaW5rQnVmKGUsdCkpO2Zvcih2YXIgcj1cIlwiLG49MDtuPHQ7bisrKXIrPVN0cmluZy5mcm9tQ2hhckNvZGUoZVtuXSk7cmV0dXJuIHJ9dVsyNTRdPXVbMjU0XT0xLHIuc3RyaW5nMmJ1Zj1mdW5jdGlvbihlKXt2YXIgdCxyLG4saSxzLGE9ZS5sZW5ndGgsbz0wO2ZvcihpPTA7aTxhO2krKyk1NTI5Nj09KDY0NTEyJihyPWUuY2hhckNvZGVBdChpKSkpJiZpKzE8YSYmNTYzMjA9PSg2NDUxMiYobj1lLmNoYXJDb2RlQXQoaSsxKSkpJiYocj02NTUzNisoci01NTI5Njw8MTApKyhuLTU2MzIwKSxpKyspLG8rPXI8MTI4PzE6cjwyMDQ4PzI6cjw2NTUzNj8zOjQ7Zm9yKHQ9bmV3IGguQnVmOChvKSxpPXM9MDtzPG87aSsrKTU1Mjk2PT0oNjQ1MTImKHI9ZS5jaGFyQ29kZUF0KGkpKSkmJmkrMTxhJiY1NjMyMD09KDY0NTEyJihuPWUuY2hhckNvZGVBdChpKzEpKSkmJihyPTY1NTM2KyhyLTU1Mjk2PDwxMCkrKG4tNTYzMjApLGkrKykscjwxMjg/dFtzKytdPXI6KHI8MjA0OD90W3MrK109MTkyfHI+Pj42OihyPDY1NTM2P3RbcysrXT0yMjR8cj4+PjEyOih0W3MrK109MjQwfHI+Pj4xOCx0W3MrK109MTI4fHI+Pj4xMiY2MyksdFtzKytdPTEyOHxyPj4+NiY2MyksdFtzKytdPTEyOHw2MyZyKTtyZXR1cm4gdH0sci5idWYyYmluc3RyaW5nPWZ1bmN0aW9uKGUpe3JldHVybiBsKGUsZS5sZW5ndGgpfSxyLmJpbnN0cmluZzJidWY9ZnVuY3Rpb24oZSl7Zm9yKHZhciB0PW5ldyBoLkJ1ZjgoZS5sZW5ndGgpLHI9MCxuPXQubGVuZ3RoO3I8bjtyKyspdFtyXT1lLmNoYXJDb2RlQXQocik7cmV0dXJuIHR9LHIuYnVmMnN0cmluZz1mdW5jdGlvbihlLHQpe3ZhciByLG4saSxzLGE9dHx8ZS5sZW5ndGgsbz1uZXcgQXJyYXkoMiphKTtmb3Iocj1uPTA7cjxhOylpZigoaT1lW3IrK10pPDEyOClvW24rK109aTtlbHNlIGlmKDQ8KHM9dVtpXSkpb1tuKytdPTY1NTMzLHIrPXMtMTtlbHNle2ZvcihpJj0yPT09cz8zMTozPT09cz8xNTo3OzE8cyYmcjxhOylpPWk8PDZ8NjMmZVtyKytdLHMtLTsxPHM/b1tuKytdPTY1NTMzOmk8NjU1MzY/b1tuKytdPWk6KGktPTY1NTM2LG9bbisrXT01NTI5NnxpPj4xMCYxMDIzLG9bbisrXT01NjMyMHwxMDIzJmkpfXJldHVybiBsKG8sbil9LHIudXRmOGJvcmRlcj1mdW5jdGlvbihlLHQpe3ZhciByO2ZvcigodD10fHxlLmxlbmd0aCk+ZS5sZW5ndGgmJih0PWUubGVuZ3RoKSxyPXQtMTswPD1yJiYxMjg9PSgxOTImZVtyXSk7KXItLTtyZXR1cm4gcjwwP3Q6MD09PXI/dDpyK3VbZVtyXV0+dD9yOnR9fSx7XCIuL2NvbW1vblwiOjQxfV0sNDM6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt0LmV4cG9ydHM9ZnVuY3Rpb24oZSx0LHIsbil7Zm9yKHZhciBpPTY1NTM1JmV8MCxzPWU+Pj4xNiY2NTUzNXwwLGE9MDswIT09cjspe2ZvcihyLT1hPTJlMzxyPzJlMzpyO3M9cysoaT1pK3RbbisrXXwwKXwwLC0tYTspO2klPTY1NTIxLHMlPTY1NTIxfXJldHVybiBpfHM8PDE2fDB9fSx7fV0sNDQ6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt0LmV4cG9ydHM9e1pfTk9fRkxVU0g6MCxaX1BBUlRJQUxfRkxVU0g6MSxaX1NZTkNfRkxVU0g6MixaX0ZVTExfRkxVU0g6MyxaX0ZJTklTSDo0LFpfQkxPQ0s6NSxaX1RSRUVTOjYsWl9PSzowLFpfU1RSRUFNX0VORDoxLFpfTkVFRF9ESUNUOjIsWl9FUlJOTzotMSxaX1NUUkVBTV9FUlJPUjotMixaX0RBVEFfRVJST1I6LTMsWl9CVUZfRVJST1I6LTUsWl9OT19DT01QUkVTU0lPTjowLFpfQkVTVF9TUEVFRDoxLFpfQkVTVF9DT01QUkVTU0lPTjo5LFpfREVGQVVMVF9DT01QUkVTU0lPTjotMSxaX0ZJTFRFUkVEOjEsWl9IVUZGTUFOX09OTFk6MixaX1JMRTozLFpfRklYRUQ6NCxaX0RFRkFVTFRfU1RSQVRFR1k6MCxaX0JJTkFSWTowLFpfVEVYVDoxLFpfVU5LTk9XTjoyLFpfREVGTEFURUQ6OH19LHt9XSw0NTpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3ZhciBvPWZ1bmN0aW9uKCl7Zm9yKHZhciBlLHQ9W10scj0wO3I8MjU2O3IrKyl7ZT1yO2Zvcih2YXIgbj0wO248ODtuKyspZT0xJmU/Mzk4ODI5MjM4NF5lPj4+MTplPj4+MTt0W3JdPWV9cmV0dXJuIHR9KCk7dC5leHBvcnRzPWZ1bmN0aW9uKGUsdCxyLG4pe3ZhciBpPW8scz1uK3I7ZV49LTE7Zm9yKHZhciBhPW47YTxzO2ErKyllPWU+Pj44XmlbMjU1JihlXnRbYV0pXTtyZXR1cm4tMV5lfX0se31dLDQ2OltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7dmFyIGgsYz1lKFwiLi4vdXRpbHMvY29tbW9uXCIpLHU9ZShcIi4vdHJlZXNcIiksZD1lKFwiLi9hZGxlcjMyXCIpLHA9ZShcIi4vY3JjMzJcIiksbj1lKFwiLi9tZXNzYWdlc1wiKSxsPTAsZj00LG09MCxfPS0yLGc9LTEsYj00LGk9Mix2PTgseT05LHM9Mjg2LGE9MzAsbz0xOSx3PTIqcysxLGs9MTUseD0zLFM9MjU4LHo9Uyt4KzEsQz00MixFPTExMyxBPTEsST0yLE89MyxCPTQ7ZnVuY3Rpb24gUihlLHQpe3JldHVybiBlLm1zZz1uW3RdLHR9ZnVuY3Rpb24gVChlKXtyZXR1cm4oZTw8MSktKDQ8ZT85OjApfWZ1bmN0aW9uIEQoZSl7Zm9yKHZhciB0PWUubGVuZ3RoOzA8PS0tdDspZVt0XT0wfWZ1bmN0aW9uIEYoZSl7dmFyIHQ9ZS5zdGF0ZSxyPXQucGVuZGluZztyPmUuYXZhaWxfb3V0JiYocj1lLmF2YWlsX291dCksMCE9PXImJihjLmFycmF5U2V0KGUub3V0cHV0LHQucGVuZGluZ19idWYsdC5wZW5kaW5nX291dCxyLGUubmV4dF9vdXQpLGUubmV4dF9vdXQrPXIsdC5wZW5kaW5nX291dCs9cixlLnRvdGFsX291dCs9cixlLmF2YWlsX291dC09cix0LnBlbmRpbmctPXIsMD09PXQucGVuZGluZyYmKHQucGVuZGluZ19vdXQ9MCkpfWZ1bmN0aW9uIE4oZSx0KXt1Ll90cl9mbHVzaF9ibG9jayhlLDA8PWUuYmxvY2tfc3RhcnQ/ZS5ibG9ja19zdGFydDotMSxlLnN0cnN0YXJ0LWUuYmxvY2tfc3RhcnQsdCksZS5ibG9ja19zdGFydD1lLnN0cnN0YXJ0LEYoZS5zdHJtKX1mdW5jdGlvbiBVKGUsdCl7ZS5wZW5kaW5nX2J1ZltlLnBlbmRpbmcrK109dH1mdW5jdGlvbiBQKGUsdCl7ZS5wZW5kaW5nX2J1ZltlLnBlbmRpbmcrK109dD4+PjgmMjU1LGUucGVuZGluZ19idWZbZS5wZW5kaW5nKytdPTI1NSZ0fWZ1bmN0aW9uIEwoZSx0KXt2YXIgcixuLGk9ZS5tYXhfY2hhaW5fbGVuZ3RoLHM9ZS5zdHJzdGFydCxhPWUucHJldl9sZW5ndGgsbz1lLm5pY2VfbWF0Y2gsaD1lLnN0cnN0YXJ0PmUud19zaXplLXo/ZS5zdHJzdGFydC0oZS53X3NpemUteik6MCx1PWUud2luZG93LGw9ZS53X21hc2ssZj1lLnByZXYsYz1lLnN0cnN0YXJ0K1MsZD11W3MrYS0xXSxwPXVbcythXTtlLnByZXZfbGVuZ3RoPj1lLmdvb2RfbWF0Y2gmJihpPj49Miksbz5lLmxvb2thaGVhZCYmKG89ZS5sb29rYWhlYWQpO2Rve2lmKHVbKHI9dCkrYV09PT1wJiZ1W3IrYS0xXT09PWQmJnVbcl09PT11W3NdJiZ1Wysrcl09PT11W3MrMV0pe3MrPTIscisrO2Rve313aGlsZSh1Wysrc109PT11Wysrcl0mJnVbKytzXT09PXVbKytyXSYmdVsrK3NdPT09dVsrK3JdJiZ1Wysrc109PT11Wysrcl0mJnVbKytzXT09PXVbKytyXSYmdVsrK3NdPT09dVsrK3JdJiZ1Wysrc109PT11Wysrcl0mJnVbKytzXT09PXVbKytyXSYmczxjKTtpZihuPVMtKGMtcykscz1jLVMsYTxuKXtpZihlLm1hdGNoX3N0YXJ0PXQsbzw9KGE9bikpYnJlYWs7ZD11W3MrYS0xXSxwPXVbcythXX19fXdoaWxlKCh0PWZbdCZsXSk+aCYmMCE9LS1pKTtyZXR1cm4gYTw9ZS5sb29rYWhlYWQ/YTplLmxvb2thaGVhZH1mdW5jdGlvbiBqKGUpe3ZhciB0LHIsbixpLHMsYSxvLGgsdSxsLGY9ZS53X3NpemU7ZG97aWYoaT1lLndpbmRvd19zaXplLWUubG9va2FoZWFkLWUuc3Ryc3RhcnQsZS5zdHJzdGFydD49ZisoZi16KSl7Zm9yKGMuYXJyYXlTZXQoZS53aW5kb3csZS53aW5kb3csZixmLDApLGUubWF0Y2hfc3RhcnQtPWYsZS5zdHJzdGFydC09ZixlLmJsb2NrX3N0YXJ0LT1mLHQ9cj1lLmhhc2hfc2l6ZTtuPWUuaGVhZFstLXRdLGUuaGVhZFt0XT1mPD1uP24tZjowLC0tcjspO2Zvcih0PXI9ZjtuPWUucHJldlstLXRdLGUucHJldlt0XT1mPD1uP24tZjowLC0tcjspO2krPWZ9aWYoMD09PWUuc3RybS5hdmFpbF9pbilicmVhaztpZihhPWUuc3RybSxvPWUud2luZG93LGg9ZS5zdHJzdGFydCtlLmxvb2thaGVhZCx1PWksbD12b2lkIDAsbD1hLmF2YWlsX2luLHU8bCYmKGw9dSkscj0wPT09bD8wOihhLmF2YWlsX2luLT1sLGMuYXJyYXlTZXQobyxhLmlucHV0LGEubmV4dF9pbixsLGgpLDE9PT1hLnN0YXRlLndyYXA/YS5hZGxlcj1kKGEuYWRsZXIsbyxsLGgpOjI9PT1hLnN0YXRlLndyYXAmJihhLmFkbGVyPXAoYS5hZGxlcixvLGwsaCkpLGEubmV4dF9pbis9bCxhLnRvdGFsX2luKz1sLGwpLGUubG9va2FoZWFkKz1yLGUubG9va2FoZWFkK2UuaW5zZXJ0Pj14KWZvcihzPWUuc3Ryc3RhcnQtZS5pbnNlcnQsZS5pbnNfaD1lLndpbmRvd1tzXSxlLmluc19oPShlLmluc19oPDxlLmhhc2hfc2hpZnReZS53aW5kb3dbcysxXSkmZS5oYXNoX21hc2s7ZS5pbnNlcnQmJihlLmluc19oPShlLmluc19oPDxlLmhhc2hfc2hpZnReZS53aW5kb3dbcyt4LTFdKSZlLmhhc2hfbWFzayxlLnByZXZbcyZlLndfbWFza109ZS5oZWFkW2UuaW5zX2hdLGUuaGVhZFtlLmluc19oXT1zLHMrKyxlLmluc2VydC0tLCEoZS5sb29rYWhlYWQrZS5pbnNlcnQ8eCkpOyk7fXdoaWxlKGUubG9va2FoZWFkPHomJjAhPT1lLnN0cm0uYXZhaWxfaW4pfWZ1bmN0aW9uIFooZSx0KXtmb3IodmFyIHIsbjs7KXtpZihlLmxvb2thaGVhZDx6KXtpZihqKGUpLGUubG9va2FoZWFkPHomJnQ9PT1sKXJldHVybiBBO2lmKDA9PT1lLmxvb2thaGVhZClicmVha31pZihyPTAsZS5sb29rYWhlYWQ+PXgmJihlLmluc19oPShlLmluc19oPDxlLmhhc2hfc2hpZnReZS53aW5kb3dbZS5zdHJzdGFydCt4LTFdKSZlLmhhc2hfbWFzayxyPWUucHJldltlLnN0cnN0YXJ0JmUud19tYXNrXT1lLmhlYWRbZS5pbnNfaF0sZS5oZWFkW2UuaW5zX2hdPWUuc3Ryc3RhcnQpLDAhPT1yJiZlLnN0cnN0YXJ0LXI8PWUud19zaXplLXomJihlLm1hdGNoX2xlbmd0aD1MKGUscikpLGUubWF0Y2hfbGVuZ3RoPj14KWlmKG49dS5fdHJfdGFsbHkoZSxlLnN0cnN0YXJ0LWUubWF0Y2hfc3RhcnQsZS5tYXRjaF9sZW5ndGgteCksZS5sb29rYWhlYWQtPWUubWF0Y2hfbGVuZ3RoLGUubWF0Y2hfbGVuZ3RoPD1lLm1heF9sYXp5X21hdGNoJiZlLmxvb2thaGVhZD49eCl7Zm9yKGUubWF0Y2hfbGVuZ3RoLS07ZS5zdHJzdGFydCsrLGUuaW5zX2g9KGUuaW5zX2g8PGUuaGFzaF9zaGlmdF5lLndpbmRvd1tlLnN0cnN0YXJ0K3gtMV0pJmUuaGFzaF9tYXNrLHI9ZS5wcmV2W2Uuc3Ryc3RhcnQmZS53X21hc2tdPWUuaGVhZFtlLmluc19oXSxlLmhlYWRbZS5pbnNfaF09ZS5zdHJzdGFydCwwIT0tLWUubWF0Y2hfbGVuZ3RoOyk7ZS5zdHJzdGFydCsrfWVsc2UgZS5zdHJzdGFydCs9ZS5tYXRjaF9sZW5ndGgsZS5tYXRjaF9sZW5ndGg9MCxlLmluc19oPWUud2luZG93W2Uuc3Ryc3RhcnRdLGUuaW5zX2g9KGUuaW5zX2g8PGUuaGFzaF9zaGlmdF5lLndpbmRvd1tlLnN0cnN0YXJ0KzFdKSZlLmhhc2hfbWFzaztlbHNlIG49dS5fdHJfdGFsbHkoZSwwLGUud2luZG93W2Uuc3Ryc3RhcnRdKSxlLmxvb2thaGVhZC0tLGUuc3Ryc3RhcnQrKztpZihuJiYoTihlLCExKSwwPT09ZS5zdHJtLmF2YWlsX291dCkpcmV0dXJuIEF9cmV0dXJuIGUuaW5zZXJ0PWUuc3Ryc3RhcnQ8eC0xP2Uuc3Ryc3RhcnQ6eC0xLHQ9PT1mPyhOKGUsITApLDA9PT1lLnN0cm0uYXZhaWxfb3V0P086Qik6ZS5sYXN0X2xpdCYmKE4oZSwhMSksMD09PWUuc3RybS5hdmFpbF9vdXQpP0E6SX1mdW5jdGlvbiBXKGUsdCl7Zm9yKHZhciByLG4saTs7KXtpZihlLmxvb2thaGVhZDx6KXtpZihqKGUpLGUubG9va2FoZWFkPHomJnQ9PT1sKXJldHVybiBBO2lmKDA9PT1lLmxvb2thaGVhZClicmVha31pZihyPTAsZS5sb29rYWhlYWQ+PXgmJihlLmluc19oPShlLmluc19oPDxlLmhhc2hfc2hpZnReZS53aW5kb3dbZS5zdHJzdGFydCt4LTFdKSZlLmhhc2hfbWFzayxyPWUucHJldltlLnN0cnN0YXJ0JmUud19tYXNrXT1lLmhlYWRbZS5pbnNfaF0sZS5oZWFkW2UuaW5zX2hdPWUuc3Ryc3RhcnQpLGUucHJldl9sZW5ndGg9ZS5tYXRjaF9sZW5ndGgsZS5wcmV2X21hdGNoPWUubWF0Y2hfc3RhcnQsZS5tYXRjaF9sZW5ndGg9eC0xLDAhPT1yJiZlLnByZXZfbGVuZ3RoPGUubWF4X2xhenlfbWF0Y2gmJmUuc3Ryc3RhcnQtcjw9ZS53X3NpemUteiYmKGUubWF0Y2hfbGVuZ3RoPUwoZSxyKSxlLm1hdGNoX2xlbmd0aDw9NSYmKDE9PT1lLnN0cmF0ZWd5fHxlLm1hdGNoX2xlbmd0aD09PXgmJjQwOTY8ZS5zdHJzdGFydC1lLm1hdGNoX3N0YXJ0KSYmKGUubWF0Y2hfbGVuZ3RoPXgtMSkpLGUucHJldl9sZW5ndGg+PXgmJmUubWF0Y2hfbGVuZ3RoPD1lLnByZXZfbGVuZ3RoKXtmb3IoaT1lLnN0cnN0YXJ0K2UubG9va2FoZWFkLXgsbj11Ll90cl90YWxseShlLGUuc3Ryc3RhcnQtMS1lLnByZXZfbWF0Y2gsZS5wcmV2X2xlbmd0aC14KSxlLmxvb2thaGVhZC09ZS5wcmV2X2xlbmd0aC0xLGUucHJldl9sZW5ndGgtPTI7KytlLnN0cnN0YXJ0PD1pJiYoZS5pbnNfaD0oZS5pbnNfaDw8ZS5oYXNoX3NoaWZ0XmUud2luZG93W2Uuc3Ryc3RhcnQreC0xXSkmZS5oYXNoX21hc2sscj1lLnByZXZbZS5zdHJzdGFydCZlLndfbWFza109ZS5oZWFkW2UuaW5zX2hdLGUuaGVhZFtlLmluc19oXT1lLnN0cnN0YXJ0KSwwIT0tLWUucHJldl9sZW5ndGg7KTtpZihlLm1hdGNoX2F2YWlsYWJsZT0wLGUubWF0Y2hfbGVuZ3RoPXgtMSxlLnN0cnN0YXJ0KyssbiYmKE4oZSwhMSksMD09PWUuc3RybS5hdmFpbF9vdXQpKXJldHVybiBBfWVsc2UgaWYoZS5tYXRjaF9hdmFpbGFibGUpe2lmKChuPXUuX3RyX3RhbGx5KGUsMCxlLndpbmRvd1tlLnN0cnN0YXJ0LTFdKSkmJk4oZSwhMSksZS5zdHJzdGFydCsrLGUubG9va2FoZWFkLS0sMD09PWUuc3RybS5hdmFpbF9vdXQpcmV0dXJuIEF9ZWxzZSBlLm1hdGNoX2F2YWlsYWJsZT0xLGUuc3Ryc3RhcnQrKyxlLmxvb2thaGVhZC0tfXJldHVybiBlLm1hdGNoX2F2YWlsYWJsZSYmKG49dS5fdHJfdGFsbHkoZSwwLGUud2luZG93W2Uuc3Ryc3RhcnQtMV0pLGUubWF0Y2hfYXZhaWxhYmxlPTApLGUuaW5zZXJ0PWUuc3Ryc3RhcnQ8eC0xP2Uuc3Ryc3RhcnQ6eC0xLHQ9PT1mPyhOKGUsITApLDA9PT1lLnN0cm0uYXZhaWxfb3V0P086Qik6ZS5sYXN0X2xpdCYmKE4oZSwhMSksMD09PWUuc3RybS5hdmFpbF9vdXQpP0E6SX1mdW5jdGlvbiBNKGUsdCxyLG4saSl7dGhpcy5nb29kX2xlbmd0aD1lLHRoaXMubWF4X2xhenk9dCx0aGlzLm5pY2VfbGVuZ3RoPXIsdGhpcy5tYXhfY2hhaW49bix0aGlzLmZ1bmM9aX1mdW5jdGlvbiBIKCl7dGhpcy5zdHJtPW51bGwsdGhpcy5zdGF0dXM9MCx0aGlzLnBlbmRpbmdfYnVmPW51bGwsdGhpcy5wZW5kaW5nX2J1Zl9zaXplPTAsdGhpcy5wZW5kaW5nX291dD0wLHRoaXMucGVuZGluZz0wLHRoaXMud3JhcD0wLHRoaXMuZ3poZWFkPW51bGwsdGhpcy5nemluZGV4PTAsdGhpcy5tZXRob2Q9dix0aGlzLmxhc3RfZmx1c2g9LTEsdGhpcy53X3NpemU9MCx0aGlzLndfYml0cz0wLHRoaXMud19tYXNrPTAsdGhpcy53aW5kb3c9bnVsbCx0aGlzLndpbmRvd19zaXplPTAsdGhpcy5wcmV2PW51bGwsdGhpcy5oZWFkPW51bGwsdGhpcy5pbnNfaD0wLHRoaXMuaGFzaF9zaXplPTAsdGhpcy5oYXNoX2JpdHM9MCx0aGlzLmhhc2hfbWFzaz0wLHRoaXMuaGFzaF9zaGlmdD0wLHRoaXMuYmxvY2tfc3RhcnQ9MCx0aGlzLm1hdGNoX2xlbmd0aD0wLHRoaXMucHJldl9tYXRjaD0wLHRoaXMubWF0Y2hfYXZhaWxhYmxlPTAsdGhpcy5zdHJzdGFydD0wLHRoaXMubWF0Y2hfc3RhcnQ9MCx0aGlzLmxvb2thaGVhZD0wLHRoaXMucHJldl9sZW5ndGg9MCx0aGlzLm1heF9jaGFpbl9sZW5ndGg9MCx0aGlzLm1heF9sYXp5X21hdGNoPTAsdGhpcy5sZXZlbD0wLHRoaXMuc3RyYXRlZ3k9MCx0aGlzLmdvb2RfbWF0Y2g9MCx0aGlzLm5pY2VfbWF0Y2g9MCx0aGlzLmR5bl9sdHJlZT1uZXcgYy5CdWYxNigyKncpLHRoaXMuZHluX2R0cmVlPW5ldyBjLkJ1ZjE2KDIqKDIqYSsxKSksdGhpcy5ibF90cmVlPW5ldyBjLkJ1ZjE2KDIqKDIqbysxKSksRCh0aGlzLmR5bl9sdHJlZSksRCh0aGlzLmR5bl9kdHJlZSksRCh0aGlzLmJsX3RyZWUpLHRoaXMubF9kZXNjPW51bGwsdGhpcy5kX2Rlc2M9bnVsbCx0aGlzLmJsX2Rlc2M9bnVsbCx0aGlzLmJsX2NvdW50PW5ldyBjLkJ1ZjE2KGsrMSksdGhpcy5oZWFwPW5ldyBjLkJ1ZjE2KDIqcysxKSxEKHRoaXMuaGVhcCksdGhpcy5oZWFwX2xlbj0wLHRoaXMuaGVhcF9tYXg9MCx0aGlzLmRlcHRoPW5ldyBjLkJ1ZjE2KDIqcysxKSxEKHRoaXMuZGVwdGgpLHRoaXMubF9idWY9MCx0aGlzLmxpdF9idWZzaXplPTAsdGhpcy5sYXN0X2xpdD0wLHRoaXMuZF9idWY9MCx0aGlzLm9wdF9sZW49MCx0aGlzLnN0YXRpY19sZW49MCx0aGlzLm1hdGNoZXM9MCx0aGlzLmluc2VydD0wLHRoaXMuYmlfYnVmPTAsdGhpcy5iaV92YWxpZD0wfWZ1bmN0aW9uIEcoZSl7dmFyIHQ7cmV0dXJuIGUmJmUuc3RhdGU/KGUudG90YWxfaW49ZS50b3RhbF9vdXQ9MCxlLmRhdGFfdHlwZT1pLCh0PWUuc3RhdGUpLnBlbmRpbmc9MCx0LnBlbmRpbmdfb3V0PTAsdC53cmFwPDAmJih0LndyYXA9LXQud3JhcCksdC5zdGF0dXM9dC53cmFwP0M6RSxlLmFkbGVyPTI9PT10LndyYXA/MDoxLHQubGFzdF9mbHVzaD1sLHUuX3RyX2luaXQodCksbSk6UihlLF8pfWZ1bmN0aW9uIEsoZSl7dmFyIHQ9RyhlKTtyZXR1cm4gdD09PW0mJmZ1bmN0aW9uKGUpe2Uud2luZG93X3NpemU9MiplLndfc2l6ZSxEKGUuaGVhZCksZS5tYXhfbGF6eV9tYXRjaD1oW2UubGV2ZWxdLm1heF9sYXp5LGUuZ29vZF9tYXRjaD1oW2UubGV2ZWxdLmdvb2RfbGVuZ3RoLGUubmljZV9tYXRjaD1oW2UubGV2ZWxdLm5pY2VfbGVuZ3RoLGUubWF4X2NoYWluX2xlbmd0aD1oW2UubGV2ZWxdLm1heF9jaGFpbixlLnN0cnN0YXJ0PTAsZS5ibG9ja19zdGFydD0wLGUubG9va2FoZWFkPTAsZS5pbnNlcnQ9MCxlLm1hdGNoX2xlbmd0aD1lLnByZXZfbGVuZ3RoPXgtMSxlLm1hdGNoX2F2YWlsYWJsZT0wLGUuaW5zX2g9MH0oZS5zdGF0ZSksdH1mdW5jdGlvbiBZKGUsdCxyLG4saSxzKXtpZighZSlyZXR1cm4gXzt2YXIgYT0xO2lmKHQ9PT1nJiYodD02KSxuPDA/KGE9MCxuPS1uKToxNTxuJiYoYT0yLG4tPTE2KSxpPDF8fHk8aXx8ciE9PXZ8fG48OHx8MTU8bnx8dDwwfHw5PHR8fHM8MHx8YjxzKXJldHVybiBSKGUsXyk7OD09PW4mJihuPTkpO3ZhciBvPW5ldyBIO3JldHVybihlLnN0YXRlPW8pLnN0cm09ZSxvLndyYXA9YSxvLmd6aGVhZD1udWxsLG8ud19iaXRzPW4sby53X3NpemU9MTw8by53X2JpdHMsby53X21hc2s9by53X3NpemUtMSxvLmhhc2hfYml0cz1pKzcsby5oYXNoX3NpemU9MTw8by5oYXNoX2JpdHMsby5oYXNoX21hc2s9by5oYXNoX3NpemUtMSxvLmhhc2hfc2hpZnQ9fn4oKG8uaGFzaF9iaXRzK3gtMSkveCksby53aW5kb3c9bmV3IGMuQnVmOCgyKm8ud19zaXplKSxvLmhlYWQ9bmV3IGMuQnVmMTYoby5oYXNoX3NpemUpLG8ucHJldj1uZXcgYy5CdWYxNihvLndfc2l6ZSksby5saXRfYnVmc2l6ZT0xPDxpKzYsby5wZW5kaW5nX2J1Zl9zaXplPTQqby5saXRfYnVmc2l6ZSxvLnBlbmRpbmdfYnVmPW5ldyBjLkJ1Zjgoby5wZW5kaW5nX2J1Zl9zaXplKSxvLmRfYnVmPTEqby5saXRfYnVmc2l6ZSxvLmxfYnVmPTMqby5saXRfYnVmc2l6ZSxvLmxldmVsPXQsby5zdHJhdGVneT1zLG8ubWV0aG9kPXIsSyhlKX1oPVtuZXcgTSgwLDAsMCwwLGZ1bmN0aW9uKGUsdCl7dmFyIHI9NjU1MzU7Zm9yKHI+ZS5wZW5kaW5nX2J1Zl9zaXplLTUmJihyPWUucGVuZGluZ19idWZfc2l6ZS01KTs7KXtpZihlLmxvb2thaGVhZDw9MSl7aWYoaihlKSwwPT09ZS5sb29rYWhlYWQmJnQ9PT1sKXJldHVybiBBO2lmKDA9PT1lLmxvb2thaGVhZClicmVha31lLnN0cnN0YXJ0Kz1lLmxvb2thaGVhZCxlLmxvb2thaGVhZD0wO3ZhciBuPWUuYmxvY2tfc3RhcnQrcjtpZigoMD09PWUuc3Ryc3RhcnR8fGUuc3Ryc3RhcnQ+PW4pJiYoZS5sb29rYWhlYWQ9ZS5zdHJzdGFydC1uLGUuc3Ryc3RhcnQ9bixOKGUsITEpLDA9PT1lLnN0cm0uYXZhaWxfb3V0KSlyZXR1cm4gQTtpZihlLnN0cnN0YXJ0LWUuYmxvY2tfc3RhcnQ+PWUud19zaXplLXomJihOKGUsITEpLDA9PT1lLnN0cm0uYXZhaWxfb3V0KSlyZXR1cm4gQX1yZXR1cm4gZS5pbnNlcnQ9MCx0PT09Zj8oTihlLCEwKSwwPT09ZS5zdHJtLmF2YWlsX291dD9POkIpOihlLnN0cnN0YXJ0PmUuYmxvY2tfc3RhcnQmJihOKGUsITEpLGUuc3RybS5hdmFpbF9vdXQpLEEpfSksbmV3IE0oNCw0LDgsNCxaKSxuZXcgTSg0LDUsMTYsOCxaKSxuZXcgTSg0LDYsMzIsMzIsWiksbmV3IE0oNCw0LDE2LDE2LFcpLG5ldyBNKDgsMTYsMzIsMzIsVyksbmV3IE0oOCwxNiwxMjgsMTI4LFcpLG5ldyBNKDgsMzIsMTI4LDI1NixXKSxuZXcgTSgzMiwxMjgsMjU4LDEwMjQsVyksbmV3IE0oMzIsMjU4LDI1OCw0MDk2LFcpXSxyLmRlZmxhdGVJbml0PWZ1bmN0aW9uKGUsdCl7cmV0dXJuIFkoZSx0LHYsMTUsOCwwKX0sci5kZWZsYXRlSW5pdDI9WSxyLmRlZmxhdGVSZXNldD1LLHIuZGVmbGF0ZVJlc2V0S2VlcD1HLHIuZGVmbGF0ZVNldEhlYWRlcj1mdW5jdGlvbihlLHQpe3JldHVybiBlJiZlLnN0YXRlPzIhPT1lLnN0YXRlLndyYXA/XzooZS5zdGF0ZS5nemhlYWQ9dCxtKTpffSxyLmRlZmxhdGU9ZnVuY3Rpb24oZSx0KXt2YXIgcixuLGkscztpZighZXx8IWUuc3RhdGV8fDU8dHx8dDwwKXJldHVybiBlP1IoZSxfKTpfO2lmKG49ZS5zdGF0ZSwhZS5vdXRwdXR8fCFlLmlucHV0JiYwIT09ZS5hdmFpbF9pbnx8NjY2PT09bi5zdGF0dXMmJnQhPT1mKXJldHVybiBSKGUsMD09PWUuYXZhaWxfb3V0Py01Ol8pO2lmKG4uc3RybT1lLHI9bi5sYXN0X2ZsdXNoLG4ubGFzdF9mbHVzaD10LG4uc3RhdHVzPT09QylpZigyPT09bi53cmFwKWUuYWRsZXI9MCxVKG4sMzEpLFUobiwxMzkpLFUobiw4KSxuLmd6aGVhZD8oVShuLChuLmd6aGVhZC50ZXh0PzE6MCkrKG4uZ3poZWFkLmhjcmM/MjowKSsobi5nemhlYWQuZXh0cmE/NDowKSsobi5nemhlYWQubmFtZT84OjApKyhuLmd6aGVhZC5jb21tZW50PzE2OjApKSxVKG4sMjU1Jm4uZ3poZWFkLnRpbWUpLFUobixuLmd6aGVhZC50aW1lPj44JjI1NSksVShuLG4uZ3poZWFkLnRpbWU+PjE2JjI1NSksVShuLG4uZ3poZWFkLnRpbWU+PjI0JjI1NSksVShuLDk9PT1uLmxldmVsPzI6Mjw9bi5zdHJhdGVneXx8bi5sZXZlbDwyPzQ6MCksVShuLDI1NSZuLmd6aGVhZC5vcyksbi5nemhlYWQuZXh0cmEmJm4uZ3poZWFkLmV4dHJhLmxlbmd0aCYmKFUobiwyNTUmbi5nemhlYWQuZXh0cmEubGVuZ3RoKSxVKG4sbi5nemhlYWQuZXh0cmEubGVuZ3RoPj44JjI1NSkpLG4uZ3poZWFkLmhjcmMmJihlLmFkbGVyPXAoZS5hZGxlcixuLnBlbmRpbmdfYnVmLG4ucGVuZGluZywwKSksbi5nemluZGV4PTAsbi5zdGF0dXM9NjkpOihVKG4sMCksVShuLDApLFUobiwwKSxVKG4sMCksVShuLDApLFUobiw5PT09bi5sZXZlbD8yOjI8PW4uc3RyYXRlZ3l8fG4ubGV2ZWw8Mj80OjApLFUobiwzKSxuLnN0YXR1cz1FKTtlbHNle3ZhciBhPXYrKG4ud19iaXRzLTg8PDQpPDw4O2F8PSgyPD1uLnN0cmF0ZWd5fHxuLmxldmVsPDI/MDpuLmxldmVsPDY/MTo2PT09bi5sZXZlbD8yOjMpPDw2LDAhPT1uLnN0cnN0YXJ0JiYoYXw9MzIpLGErPTMxLWElMzEsbi5zdGF0dXM9RSxQKG4sYSksMCE9PW4uc3Ryc3RhcnQmJihQKG4sZS5hZGxlcj4+PjE2KSxQKG4sNjU1MzUmZS5hZGxlcikpLGUuYWRsZXI9MX1pZig2OT09PW4uc3RhdHVzKWlmKG4uZ3poZWFkLmV4dHJhKXtmb3IoaT1uLnBlbmRpbmc7bi5nemluZGV4PCg2NTUzNSZuLmd6aGVhZC5leHRyYS5sZW5ndGgpJiYobi5wZW5kaW5nIT09bi5wZW5kaW5nX2J1Zl9zaXplfHwobi5nemhlYWQuaGNyYyYmbi5wZW5kaW5nPmkmJihlLmFkbGVyPXAoZS5hZGxlcixuLnBlbmRpbmdfYnVmLG4ucGVuZGluZy1pLGkpKSxGKGUpLGk9bi5wZW5kaW5nLG4ucGVuZGluZyE9PW4ucGVuZGluZ19idWZfc2l6ZSkpOylVKG4sMjU1Jm4uZ3poZWFkLmV4dHJhW24uZ3ppbmRleF0pLG4uZ3ppbmRleCsrO24uZ3poZWFkLmhjcmMmJm4ucGVuZGluZz5pJiYoZS5hZGxlcj1wKGUuYWRsZXIsbi5wZW5kaW5nX2J1ZixuLnBlbmRpbmctaSxpKSksbi5nemluZGV4PT09bi5nemhlYWQuZXh0cmEubGVuZ3RoJiYobi5nemluZGV4PTAsbi5zdGF0dXM9NzMpfWVsc2Ugbi5zdGF0dXM9NzM7aWYoNzM9PT1uLnN0YXR1cylpZihuLmd6aGVhZC5uYW1lKXtpPW4ucGVuZGluZztkb3tpZihuLnBlbmRpbmc9PT1uLnBlbmRpbmdfYnVmX3NpemUmJihuLmd6aGVhZC5oY3JjJiZuLnBlbmRpbmc+aSYmKGUuYWRsZXI9cChlLmFkbGVyLG4ucGVuZGluZ19idWYsbi5wZW5kaW5nLWksaSkpLEYoZSksaT1uLnBlbmRpbmcsbi5wZW5kaW5nPT09bi5wZW5kaW5nX2J1Zl9zaXplKSl7cz0xO2JyZWFrfXM9bi5nemluZGV4PG4uZ3poZWFkLm5hbWUubGVuZ3RoPzI1NSZuLmd6aGVhZC5uYW1lLmNoYXJDb2RlQXQobi5nemluZGV4KyspOjAsVShuLHMpfXdoaWxlKDAhPT1zKTtuLmd6aGVhZC5oY3JjJiZuLnBlbmRpbmc+aSYmKGUuYWRsZXI9cChlLmFkbGVyLG4ucGVuZGluZ19idWYsbi5wZW5kaW5nLWksaSkpLDA9PT1zJiYobi5nemluZGV4PTAsbi5zdGF0dXM9OTEpfWVsc2Ugbi5zdGF0dXM9OTE7aWYoOTE9PT1uLnN0YXR1cylpZihuLmd6aGVhZC5jb21tZW50KXtpPW4ucGVuZGluZztkb3tpZihuLnBlbmRpbmc9PT1uLnBlbmRpbmdfYnVmX3NpemUmJihuLmd6aGVhZC5oY3JjJiZuLnBlbmRpbmc+aSYmKGUuYWRsZXI9cChlLmFkbGVyLG4ucGVuZGluZ19idWYsbi5wZW5kaW5nLWksaSkpLEYoZSksaT1uLnBlbmRpbmcsbi5wZW5kaW5nPT09bi5wZW5kaW5nX2J1Zl9zaXplKSl7cz0xO2JyZWFrfXM9bi5nemluZGV4PG4uZ3poZWFkLmNvbW1lbnQubGVuZ3RoPzI1NSZuLmd6aGVhZC5jb21tZW50LmNoYXJDb2RlQXQobi5nemluZGV4KyspOjAsVShuLHMpfXdoaWxlKDAhPT1zKTtuLmd6aGVhZC5oY3JjJiZuLnBlbmRpbmc+aSYmKGUuYWRsZXI9cChlLmFkbGVyLG4ucGVuZGluZ19idWYsbi5wZW5kaW5nLWksaSkpLDA9PT1zJiYobi5zdGF0dXM9MTAzKX1lbHNlIG4uc3RhdHVzPTEwMztpZigxMDM9PT1uLnN0YXR1cyYmKG4uZ3poZWFkLmhjcmM/KG4ucGVuZGluZysyPm4ucGVuZGluZ19idWZfc2l6ZSYmRihlKSxuLnBlbmRpbmcrMjw9bi5wZW5kaW5nX2J1Zl9zaXplJiYoVShuLDI1NSZlLmFkbGVyKSxVKG4sZS5hZGxlcj4+OCYyNTUpLGUuYWRsZXI9MCxuLnN0YXR1cz1FKSk6bi5zdGF0dXM9RSksMCE9PW4ucGVuZGluZyl7aWYoRihlKSwwPT09ZS5hdmFpbF9vdXQpcmV0dXJuIG4ubGFzdF9mbHVzaD0tMSxtfWVsc2UgaWYoMD09PWUuYXZhaWxfaW4mJlQodCk8PVQocikmJnQhPT1mKXJldHVybiBSKGUsLTUpO2lmKDY2Nj09PW4uc3RhdHVzJiYwIT09ZS5hdmFpbF9pbilyZXR1cm4gUihlLC01KTtpZigwIT09ZS5hdmFpbF9pbnx8MCE9PW4ubG9va2FoZWFkfHx0IT09bCYmNjY2IT09bi5zdGF0dXMpe3ZhciBvPTI9PT1uLnN0cmF0ZWd5P2Z1bmN0aW9uKGUsdCl7Zm9yKHZhciByOzspe2lmKDA9PT1lLmxvb2thaGVhZCYmKGooZSksMD09PWUubG9va2FoZWFkKSl7aWYodD09PWwpcmV0dXJuIEE7YnJlYWt9aWYoZS5tYXRjaF9sZW5ndGg9MCxyPXUuX3RyX3RhbGx5KGUsMCxlLndpbmRvd1tlLnN0cnN0YXJ0XSksZS5sb29rYWhlYWQtLSxlLnN0cnN0YXJ0KyssciYmKE4oZSwhMSksMD09PWUuc3RybS5hdmFpbF9vdXQpKXJldHVybiBBfXJldHVybiBlLmluc2VydD0wLHQ9PT1mPyhOKGUsITApLDA9PT1lLnN0cm0uYXZhaWxfb3V0P086Qik6ZS5sYXN0X2xpdCYmKE4oZSwhMSksMD09PWUuc3RybS5hdmFpbF9vdXQpP0E6SX0obix0KTozPT09bi5zdHJhdGVneT9mdW5jdGlvbihlLHQpe2Zvcih2YXIgcixuLGkscyxhPWUud2luZG93Ozspe2lmKGUubG9va2FoZWFkPD1TKXtpZihqKGUpLGUubG9va2FoZWFkPD1TJiZ0PT09bClyZXR1cm4gQTtpZigwPT09ZS5sb29rYWhlYWQpYnJlYWt9aWYoZS5tYXRjaF9sZW5ndGg9MCxlLmxvb2thaGVhZD49eCYmMDxlLnN0cnN0YXJ0JiYobj1hW2k9ZS5zdHJzdGFydC0xXSk9PT1hWysraV0mJm49PT1hWysraV0mJm49PT1hWysraV0pe3M9ZS5zdHJzdGFydCtTO2Rve313aGlsZShuPT09YVsrK2ldJiZuPT09YVsrK2ldJiZuPT09YVsrK2ldJiZuPT09YVsrK2ldJiZuPT09YVsrK2ldJiZuPT09YVsrK2ldJiZuPT09YVsrK2ldJiZuPT09YVsrK2ldJiZpPHMpO2UubWF0Y2hfbGVuZ3RoPVMtKHMtaSksZS5tYXRjaF9sZW5ndGg+ZS5sb29rYWhlYWQmJihlLm1hdGNoX2xlbmd0aD1lLmxvb2thaGVhZCl9aWYoZS5tYXRjaF9sZW5ndGg+PXg/KHI9dS5fdHJfdGFsbHkoZSwxLGUubWF0Y2hfbGVuZ3RoLXgpLGUubG9va2FoZWFkLT1lLm1hdGNoX2xlbmd0aCxlLnN0cnN0YXJ0Kz1lLm1hdGNoX2xlbmd0aCxlLm1hdGNoX2xlbmd0aD0wKToocj11Ll90cl90YWxseShlLDAsZS53aW5kb3dbZS5zdHJzdGFydF0pLGUubG9va2FoZWFkLS0sZS5zdHJzdGFydCsrKSxyJiYoTihlLCExKSwwPT09ZS5zdHJtLmF2YWlsX291dCkpcmV0dXJuIEF9cmV0dXJuIGUuaW5zZXJ0PTAsdD09PWY/KE4oZSwhMCksMD09PWUuc3RybS5hdmFpbF9vdXQ/TzpCKTplLmxhc3RfbGl0JiYoTihlLCExKSwwPT09ZS5zdHJtLmF2YWlsX291dCk/QTpJfShuLHQpOmhbbi5sZXZlbF0uZnVuYyhuLHQpO2lmKG8hPT1PJiZvIT09Qnx8KG4uc3RhdHVzPTY2Niksbz09PUF8fG89PT1PKXJldHVybiAwPT09ZS5hdmFpbF9vdXQmJihuLmxhc3RfZmx1c2g9LTEpLG07aWYobz09PUkmJigxPT09dD91Ll90cl9hbGlnbihuKTo1IT09dCYmKHUuX3RyX3N0b3JlZF9ibG9jayhuLDAsMCwhMSksMz09PXQmJihEKG4uaGVhZCksMD09PW4ubG9va2FoZWFkJiYobi5zdHJzdGFydD0wLG4uYmxvY2tfc3RhcnQ9MCxuLmluc2VydD0wKSkpLEYoZSksMD09PWUuYXZhaWxfb3V0KSlyZXR1cm4gbi5sYXN0X2ZsdXNoPS0xLG19cmV0dXJuIHQhPT1mP206bi53cmFwPD0wPzE6KDI9PT1uLndyYXA/KFUobiwyNTUmZS5hZGxlciksVShuLGUuYWRsZXI+PjgmMjU1KSxVKG4sZS5hZGxlcj4+MTYmMjU1KSxVKG4sZS5hZGxlcj4+MjQmMjU1KSxVKG4sMjU1JmUudG90YWxfaW4pLFUobixlLnRvdGFsX2luPj44JjI1NSksVShuLGUudG90YWxfaW4+PjE2JjI1NSksVShuLGUudG90YWxfaW4+PjI0JjI1NSkpOihQKG4sZS5hZGxlcj4+PjE2KSxQKG4sNjU1MzUmZS5hZGxlcikpLEYoZSksMDxuLndyYXAmJihuLndyYXA9LW4ud3JhcCksMCE9PW4ucGVuZGluZz9tOjEpfSxyLmRlZmxhdGVFbmQ9ZnVuY3Rpb24oZSl7dmFyIHQ7cmV0dXJuIGUmJmUuc3RhdGU/KHQ9ZS5zdGF0ZS5zdGF0dXMpIT09QyYmNjkhPT10JiY3MyE9PXQmJjkxIT09dCYmMTAzIT09dCYmdCE9PUUmJjY2NiE9PXQ/UihlLF8pOihlLnN0YXRlPW51bGwsdD09PUU/UihlLC0zKTptKTpffSxyLmRlZmxhdGVTZXREaWN0aW9uYXJ5PWZ1bmN0aW9uKGUsdCl7dmFyIHIsbixpLHMsYSxvLGgsdSxsPXQubGVuZ3RoO2lmKCFlfHwhZS5zdGF0ZSlyZXR1cm4gXztpZigyPT09KHM9KHI9ZS5zdGF0ZSkud3JhcCl8fDE9PT1zJiZyLnN0YXR1cyE9PUN8fHIubG9va2FoZWFkKXJldHVybiBfO2ZvcigxPT09cyYmKGUuYWRsZXI9ZChlLmFkbGVyLHQsbCwwKSksci53cmFwPTAsbD49ci53X3NpemUmJigwPT09cyYmKEQoci5oZWFkKSxyLnN0cnN0YXJ0PTAsci5ibG9ja19zdGFydD0wLHIuaW5zZXJ0PTApLHU9bmV3IGMuQnVmOChyLndfc2l6ZSksYy5hcnJheVNldCh1LHQsbC1yLndfc2l6ZSxyLndfc2l6ZSwwKSx0PXUsbD1yLndfc2l6ZSksYT1lLmF2YWlsX2luLG89ZS5uZXh0X2luLGg9ZS5pbnB1dCxlLmF2YWlsX2luPWwsZS5uZXh0X2luPTAsZS5pbnB1dD10LGoocik7ci5sb29rYWhlYWQ+PXg7KXtmb3Iobj1yLnN0cnN0YXJ0LGk9ci5sb29rYWhlYWQtKHgtMSk7ci5pbnNfaD0oci5pbnNfaDw8ci5oYXNoX3NoaWZ0XnIud2luZG93W24reC0xXSkmci5oYXNoX21hc2ssci5wcmV2W24mci53X21hc2tdPXIuaGVhZFtyLmluc19oXSxyLmhlYWRbci5pbnNfaF09bixuKyssLS1pOyk7ci5zdHJzdGFydD1uLHIubG9va2FoZWFkPXgtMSxqKHIpfXJldHVybiByLnN0cnN0YXJ0Kz1yLmxvb2thaGVhZCxyLmJsb2NrX3N0YXJ0PXIuc3Ryc3RhcnQsci5pbnNlcnQ9ci5sb29rYWhlYWQsci5sb29rYWhlYWQ9MCxyLm1hdGNoX2xlbmd0aD1yLnByZXZfbGVuZ3RoPXgtMSxyLm1hdGNoX2F2YWlsYWJsZT0wLGUubmV4dF9pbj1vLGUuaW5wdXQ9aCxlLmF2YWlsX2luPWEsci53cmFwPXMsbX0sci5kZWZsYXRlSW5mbz1cInBha28gZGVmbGF0ZSAoZnJvbSBOb2RlY2EgcHJvamVjdClcIn0se1wiLi4vdXRpbHMvY29tbW9uXCI6NDEsXCIuL2FkbGVyMzJcIjo0MyxcIi4vY3JjMzJcIjo0NSxcIi4vbWVzc2FnZXNcIjo1MSxcIi4vdHJlZXNcIjo1Mn1dLDQ3OltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7dC5leHBvcnRzPWZ1bmN0aW9uKCl7dGhpcy50ZXh0PTAsdGhpcy50aW1lPTAsdGhpcy54ZmxhZ3M9MCx0aGlzLm9zPTAsdGhpcy5leHRyYT1udWxsLHRoaXMuZXh0cmFfbGVuPTAsdGhpcy5uYW1lPVwiXCIsdGhpcy5jb21tZW50PVwiXCIsdGhpcy5oY3JjPTAsdGhpcy5kb25lPSExfX0se31dLDQ4OltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7dC5leHBvcnRzPWZ1bmN0aW9uKGUsdCl7dmFyIHIsbixpLHMsYSxvLGgsdSxsLGYsYyxkLHAsbSxfLGcsYix2LHksdyxrLHgsUyx6LEM7cj1lLnN0YXRlLG49ZS5uZXh0X2luLHo9ZS5pbnB1dCxpPW4rKGUuYXZhaWxfaW4tNSkscz1lLm5leHRfb3V0LEM9ZS5vdXRwdXQsYT1zLSh0LWUuYXZhaWxfb3V0KSxvPXMrKGUuYXZhaWxfb3V0LTI1NyksaD1yLmRtYXgsdT1yLndzaXplLGw9ci53aGF2ZSxmPXIud25leHQsYz1yLndpbmRvdyxkPXIuaG9sZCxwPXIuYml0cyxtPXIubGVuY29kZSxfPXIuZGlzdGNvZGUsZz0oMTw8ci5sZW5iaXRzKS0xLGI9KDE8PHIuZGlzdGJpdHMpLTE7ZTpkb3twPDE1JiYoZCs9eltuKytdPDxwLHArPTgsZCs9eltuKytdPDxwLHArPTgpLHY9bVtkJmddO3Q6Zm9yKDs7KXtpZihkPj4+PXk9dj4+PjI0LHAtPXksMD09PSh5PXY+Pj4xNiYyNTUpKUNbcysrXT02NTUzNSZ2O2Vsc2V7aWYoISgxNiZ5KSl7aWYoMD09KDY0JnkpKXt2PW1bKDY1NTM1JnYpKyhkJigxPDx5KS0xKV07Y29udGludWUgdH1pZigzMiZ5KXtyLm1vZGU9MTI7YnJlYWsgZX1lLm1zZz1cImludmFsaWQgbGl0ZXJhbC9sZW5ndGggY29kZVwiLHIubW9kZT0zMDticmVhayBlfXc9NjU1MzUmdiwoeSY9MTUpJiYocDx5JiYoZCs9eltuKytdPDxwLHArPTgpLHcrPWQmKDE8PHkpLTEsZD4+Pj15LHAtPXkpLHA8MTUmJihkKz16W24rK108PHAscCs9OCxkKz16W24rK108PHAscCs9OCksdj1fW2QmYl07cjpmb3IoOzspe2lmKGQ+Pj49eT12Pj4+MjQscC09eSwhKDE2Jih5PXY+Pj4xNiYyNTUpKSl7aWYoMD09KDY0JnkpKXt2PV9bKDY1NTM1JnYpKyhkJigxPDx5KS0xKV07Y29udGludWUgcn1lLm1zZz1cImludmFsaWQgZGlzdGFuY2UgY29kZVwiLHIubW9kZT0zMDticmVhayBlfWlmKGs9NjU1MzUmdixwPCh5Jj0xNSkmJihkKz16W24rK108PHAsKHArPTgpPHkmJihkKz16W24rK108PHAscCs9OCkpLGg8KGsrPWQmKDE8PHkpLTEpKXtlLm1zZz1cImludmFsaWQgZGlzdGFuY2UgdG9vIGZhciBiYWNrXCIsci5tb2RlPTMwO2JyZWFrIGV9aWYoZD4+Pj15LHAtPXksKHk9cy1hKTxrKXtpZihsPCh5PWsteSkmJnIuc2FuZSl7ZS5tc2c9XCJpbnZhbGlkIGRpc3RhbmNlIHRvbyBmYXIgYmFja1wiLHIubW9kZT0zMDticmVhayBlfWlmKFM9YywoeD0wKT09PWYpe2lmKHgrPXUteSx5PHcpe2Zvcih3LT15O0NbcysrXT1jW3grK10sLS15Oyk7eD1zLWssUz1DfX1lbHNlIGlmKGY8eSl7aWYoeCs9dStmLXksKHktPWYpPHcpe2Zvcih3LT15O0NbcysrXT1jW3grK10sLS15Oyk7aWYoeD0wLGY8dyl7Zm9yKHctPXk9ZjtDW3MrK109Y1t4KytdLC0teTspO3g9cy1rLFM9Q319fWVsc2UgaWYoeCs9Zi15LHk8dyl7Zm9yKHctPXk7Q1tzKytdPWNbeCsrXSwtLXk7KTt4PXMtayxTPUN9Zm9yKDsyPHc7KUNbcysrXT1TW3grK10sQ1tzKytdPVNbeCsrXSxDW3MrK109U1t4KytdLHctPTM7dyYmKENbcysrXT1TW3grK10sMTx3JiYoQ1tzKytdPVNbeCsrXSkpfWVsc2V7Zm9yKHg9cy1rO0NbcysrXT1DW3grK10sQ1tzKytdPUNbeCsrXSxDW3MrK109Q1t4KytdLDI8KHctPTMpOyk7dyYmKENbcysrXT1DW3grK10sMTx3JiYoQ1tzKytdPUNbeCsrXSkpfWJyZWFrfX1icmVha319d2hpbGUobjxpJiZzPG8pO24tPXc9cD4+MyxkJj0oMTw8KHAtPXc8PDMpKS0xLGUubmV4dF9pbj1uLGUubmV4dF9vdXQ9cyxlLmF2YWlsX2luPW48aT9pLW4rNTo1LShuLWkpLGUuYXZhaWxfb3V0PXM8bz9vLXMrMjU3OjI1Ny0ocy1vKSxyLmhvbGQ9ZCxyLmJpdHM9cH19LHt9XSw0OTpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3ZhciBJPWUoXCIuLi91dGlscy9jb21tb25cIiksTz1lKFwiLi9hZGxlcjMyXCIpLEI9ZShcIi4vY3JjMzJcIiksUj1lKFwiLi9pbmZmYXN0XCIpLFQ9ZShcIi4vaW5mdHJlZXNcIiksRD0xLEY9MixOPTAsVT0tMixQPTEsbj04NTIsaT01OTI7ZnVuY3Rpb24gTChlKXtyZXR1cm4oZT4+PjI0JjI1NSkrKGU+Pj44JjY1MjgwKSsoKDY1MjgwJmUpPDw4KSsoKDI1NSZlKTw8MjQpfWZ1bmN0aW9uIHMoKXt0aGlzLm1vZGU9MCx0aGlzLmxhc3Q9ITEsdGhpcy53cmFwPTAsdGhpcy5oYXZlZGljdD0hMSx0aGlzLmZsYWdzPTAsdGhpcy5kbWF4PTAsdGhpcy5jaGVjaz0wLHRoaXMudG90YWw9MCx0aGlzLmhlYWQ9bnVsbCx0aGlzLndiaXRzPTAsdGhpcy53c2l6ZT0wLHRoaXMud2hhdmU9MCx0aGlzLnduZXh0PTAsdGhpcy53aW5kb3c9bnVsbCx0aGlzLmhvbGQ9MCx0aGlzLmJpdHM9MCx0aGlzLmxlbmd0aD0wLHRoaXMub2Zmc2V0PTAsdGhpcy5leHRyYT0wLHRoaXMubGVuY29kZT1udWxsLHRoaXMuZGlzdGNvZGU9bnVsbCx0aGlzLmxlbmJpdHM9MCx0aGlzLmRpc3RiaXRzPTAsdGhpcy5uY29kZT0wLHRoaXMubmxlbj0wLHRoaXMubmRpc3Q9MCx0aGlzLmhhdmU9MCx0aGlzLm5leHQ9bnVsbCx0aGlzLmxlbnM9bmV3IEkuQnVmMTYoMzIwKSx0aGlzLndvcms9bmV3IEkuQnVmMTYoMjg4KSx0aGlzLmxlbmR5bj1udWxsLHRoaXMuZGlzdGR5bj1udWxsLHRoaXMuc2FuZT0wLHRoaXMuYmFjaz0wLHRoaXMud2FzPTB9ZnVuY3Rpb24gYShlKXt2YXIgdDtyZXR1cm4gZSYmZS5zdGF0ZT8odD1lLnN0YXRlLGUudG90YWxfaW49ZS50b3RhbF9vdXQ9dC50b3RhbD0wLGUubXNnPVwiXCIsdC53cmFwJiYoZS5hZGxlcj0xJnQud3JhcCksdC5tb2RlPVAsdC5sYXN0PTAsdC5oYXZlZGljdD0wLHQuZG1heD0zMjc2OCx0LmhlYWQ9bnVsbCx0LmhvbGQ9MCx0LmJpdHM9MCx0LmxlbmNvZGU9dC5sZW5keW49bmV3IEkuQnVmMzIobiksdC5kaXN0Y29kZT10LmRpc3RkeW49bmV3IEkuQnVmMzIoaSksdC5zYW5lPTEsdC5iYWNrPS0xLE4pOlV9ZnVuY3Rpb24gbyhlKXt2YXIgdDtyZXR1cm4gZSYmZS5zdGF0ZT8oKHQ9ZS5zdGF0ZSkud3NpemU9MCx0LndoYXZlPTAsdC53bmV4dD0wLGEoZSkpOlV9ZnVuY3Rpb24gaChlLHQpe3ZhciByLG47cmV0dXJuIGUmJmUuc3RhdGU/KG49ZS5zdGF0ZSx0PDA/KHI9MCx0PS10KToocj0xKyh0Pj40KSx0PDQ4JiYodCY9MTUpKSx0JiYodDw4fHwxNTx0KT9VOihudWxsIT09bi53aW5kb3cmJm4ud2JpdHMhPT10JiYobi53aW5kb3c9bnVsbCksbi53cmFwPXIsbi53Yml0cz10LG8oZSkpKTpVfWZ1bmN0aW9uIHUoZSx0KXt2YXIgcixuO3JldHVybiBlPyhuPW5ldyBzLChlLnN0YXRlPW4pLndpbmRvdz1udWxsLChyPWgoZSx0KSkhPT1OJiYoZS5zdGF0ZT1udWxsKSxyKTpVfXZhciBsLGYsYz0hMDtmdW5jdGlvbiBqKGUpe2lmKGMpe3ZhciB0O2ZvcihsPW5ldyBJLkJ1ZjMyKDUxMiksZj1uZXcgSS5CdWYzMigzMiksdD0wO3Q8MTQ0OyllLmxlbnNbdCsrXT04O2Zvcig7dDwyNTY7KWUubGVuc1t0KytdPTk7Zm9yKDt0PDI4MDspZS5sZW5zW3QrK109Nztmb3IoO3Q8Mjg4OyllLmxlbnNbdCsrXT04O2ZvcihUKEQsZS5sZW5zLDAsMjg4LGwsMCxlLndvcmsse2JpdHM6OX0pLHQ9MDt0PDMyOyllLmxlbnNbdCsrXT01O1QoRixlLmxlbnMsMCwzMixmLDAsZS53b3JrLHtiaXRzOjV9KSxjPSExfWUubGVuY29kZT1sLGUubGVuYml0cz05LGUuZGlzdGNvZGU9ZixlLmRpc3RiaXRzPTV9ZnVuY3Rpb24gWihlLHQscixuKXt2YXIgaSxzPWUuc3RhdGU7cmV0dXJuIG51bGw9PT1zLndpbmRvdyYmKHMud3NpemU9MTw8cy53Yml0cyxzLnduZXh0PTAscy53aGF2ZT0wLHMud2luZG93PW5ldyBJLkJ1Zjgocy53c2l6ZSkpLG4+PXMud3NpemU/KEkuYXJyYXlTZXQocy53aW5kb3csdCxyLXMud3NpemUscy53c2l6ZSwwKSxzLnduZXh0PTAscy53aGF2ZT1zLndzaXplKToobjwoaT1zLndzaXplLXMud25leHQpJiYoaT1uKSxJLmFycmF5U2V0KHMud2luZG93LHQsci1uLGkscy53bmV4dCksKG4tPWkpPyhJLmFycmF5U2V0KHMud2luZG93LHQsci1uLG4sMCkscy53bmV4dD1uLHMud2hhdmU9cy53c2l6ZSk6KHMud25leHQrPWkscy53bmV4dD09PXMud3NpemUmJihzLnduZXh0PTApLHMud2hhdmU8cy53c2l6ZSYmKHMud2hhdmUrPWkpKSksMH1yLmluZmxhdGVSZXNldD1vLHIuaW5mbGF0ZVJlc2V0Mj1oLHIuaW5mbGF0ZVJlc2V0S2VlcD1hLHIuaW5mbGF0ZUluaXQ9ZnVuY3Rpb24oZSl7cmV0dXJuIHUoZSwxNSl9LHIuaW5mbGF0ZUluaXQyPXUsci5pbmZsYXRlPWZ1bmN0aW9uKGUsdCl7dmFyIHIsbixpLHMsYSxvLGgsdSxsLGYsYyxkLHAsbSxfLGcsYix2LHksdyxrLHgsUyx6LEM9MCxFPW5ldyBJLkJ1ZjgoNCksQT1bMTYsMTcsMTgsMCw4LDcsOSw2LDEwLDUsMTEsNCwxMiwzLDEzLDIsMTQsMSwxNV07aWYoIWV8fCFlLnN0YXRlfHwhZS5vdXRwdXR8fCFlLmlucHV0JiYwIT09ZS5hdmFpbF9pbilyZXR1cm4gVTsxMj09PShyPWUuc3RhdGUpLm1vZGUmJihyLm1vZGU9MTMpLGE9ZS5uZXh0X291dCxpPWUub3V0cHV0LGg9ZS5hdmFpbF9vdXQscz1lLm5leHRfaW4sbj1lLmlucHV0LG89ZS5hdmFpbF9pbix1PXIuaG9sZCxsPXIuYml0cyxmPW8sYz1oLHg9TjtlOmZvcig7Oylzd2l0Y2goci5tb2RlKXtjYXNlIFA6aWYoMD09PXIud3JhcCl7ci5tb2RlPTEzO2JyZWFrfWZvcig7bDwxNjspe2lmKDA9PT1vKWJyZWFrIGU7by0tLHUrPW5bcysrXTw8bCxsKz04fWlmKDImci53cmFwJiYzNTYxNT09PXUpe0Vbci5jaGVjaz0wXT0yNTUmdSxFWzFdPXU+Pj44JjI1NSxyLmNoZWNrPUIoci5jaGVjayxFLDIsMCksbD11PTAsci5tb2RlPTI7YnJlYWt9aWYoci5mbGFncz0wLHIuaGVhZCYmKHIuaGVhZC5kb25lPSExKSwhKDEmci53cmFwKXx8KCgoMjU1JnUpPDw4KSsodT4+OCkpJTMxKXtlLm1zZz1cImluY29ycmVjdCBoZWFkZXIgY2hlY2tcIixyLm1vZGU9MzA7YnJlYWt9aWYoOCE9KDE1JnUpKXtlLm1zZz1cInVua25vd24gY29tcHJlc3Npb24gbWV0aG9kXCIsci5tb2RlPTMwO2JyZWFrfWlmKGwtPTQsaz04KygxNSYodT4+Pj00KSksMD09PXIud2JpdHMpci53Yml0cz1rO2Vsc2UgaWYoaz5yLndiaXRzKXtlLm1zZz1cImludmFsaWQgd2luZG93IHNpemVcIixyLm1vZGU9MzA7YnJlYWt9ci5kbWF4PTE8PGssZS5hZGxlcj1yLmNoZWNrPTEsci5tb2RlPTUxMiZ1PzEwOjEyLGw9dT0wO2JyZWFrO2Nhc2UgMjpmb3IoO2w8MTY7KXtpZigwPT09bylicmVhayBlO28tLSx1Kz1uW3MrK108PGwsbCs9OH1pZihyLmZsYWdzPXUsOCE9KDI1NSZyLmZsYWdzKSl7ZS5tc2c9XCJ1bmtub3duIGNvbXByZXNzaW9uIG1ldGhvZFwiLHIubW9kZT0zMDticmVha31pZig1NzM0NCZyLmZsYWdzKXtlLm1zZz1cInVua25vd24gaGVhZGVyIGZsYWdzIHNldFwiLHIubW9kZT0zMDticmVha31yLmhlYWQmJihyLmhlYWQudGV4dD11Pj44JjEpLDUxMiZyLmZsYWdzJiYoRVswXT0yNTUmdSxFWzFdPXU+Pj44JjI1NSxyLmNoZWNrPUIoci5jaGVjayxFLDIsMCkpLGw9dT0wLHIubW9kZT0zO2Nhc2UgMzpmb3IoO2w8MzI7KXtpZigwPT09bylicmVhayBlO28tLSx1Kz1uW3MrK108PGwsbCs9OH1yLmhlYWQmJihyLmhlYWQudGltZT11KSw1MTImci5mbGFncyYmKEVbMF09MjU1JnUsRVsxXT11Pj4+OCYyNTUsRVsyXT11Pj4+MTYmMjU1LEVbM109dT4+PjI0JjI1NSxyLmNoZWNrPUIoci5jaGVjayxFLDQsMCkpLGw9dT0wLHIubW9kZT00O2Nhc2UgNDpmb3IoO2w8MTY7KXtpZigwPT09bylicmVhayBlO28tLSx1Kz1uW3MrK108PGwsbCs9OH1yLmhlYWQmJihyLmhlYWQueGZsYWdzPTI1NSZ1LHIuaGVhZC5vcz11Pj44KSw1MTImci5mbGFncyYmKEVbMF09MjU1JnUsRVsxXT11Pj4+OCYyNTUsci5jaGVjaz1CKHIuY2hlY2ssRSwyLDApKSxsPXU9MCxyLm1vZGU9NTtjYXNlIDU6aWYoMTAyNCZyLmZsYWdzKXtmb3IoO2w8MTY7KXtpZigwPT09bylicmVhayBlO28tLSx1Kz1uW3MrK108PGwsbCs9OH1yLmxlbmd0aD11LHIuaGVhZCYmKHIuaGVhZC5leHRyYV9sZW49dSksNTEyJnIuZmxhZ3MmJihFWzBdPTI1NSZ1LEVbMV09dT4+PjgmMjU1LHIuY2hlY2s9QihyLmNoZWNrLEUsMiwwKSksbD11PTB9ZWxzZSByLmhlYWQmJihyLmhlYWQuZXh0cmE9bnVsbCk7ci5tb2RlPTY7Y2FzZSA2OmlmKDEwMjQmci5mbGFncyYmKG88KGQ9ci5sZW5ndGgpJiYoZD1vKSxkJiYoci5oZWFkJiYoaz1yLmhlYWQuZXh0cmFfbGVuLXIubGVuZ3RoLHIuaGVhZC5leHRyYXx8KHIuaGVhZC5leHRyYT1uZXcgQXJyYXkoci5oZWFkLmV4dHJhX2xlbikpLEkuYXJyYXlTZXQoci5oZWFkLmV4dHJhLG4scyxkLGspKSw1MTImci5mbGFncyYmKHIuY2hlY2s9QihyLmNoZWNrLG4sZCxzKSksby09ZCxzKz1kLHIubGVuZ3RoLT1kKSxyLmxlbmd0aCkpYnJlYWsgZTtyLmxlbmd0aD0wLHIubW9kZT03O2Nhc2UgNzppZigyMDQ4JnIuZmxhZ3Mpe2lmKDA9PT1vKWJyZWFrIGU7Zm9yKGQ9MDtrPW5bcytkKytdLHIuaGVhZCYmayYmci5sZW5ndGg8NjU1MzYmJihyLmhlYWQubmFtZSs9U3RyaW5nLmZyb21DaGFyQ29kZShrKSksayYmZDxvOyk7aWYoNTEyJnIuZmxhZ3MmJihyLmNoZWNrPUIoci5jaGVjayxuLGQscykpLG8tPWQscys9ZCxrKWJyZWFrIGV9ZWxzZSByLmhlYWQmJihyLmhlYWQubmFtZT1udWxsKTtyLmxlbmd0aD0wLHIubW9kZT04O2Nhc2UgODppZig0MDk2JnIuZmxhZ3Mpe2lmKDA9PT1vKWJyZWFrIGU7Zm9yKGQ9MDtrPW5bcytkKytdLHIuaGVhZCYmayYmci5sZW5ndGg8NjU1MzYmJihyLmhlYWQuY29tbWVudCs9U3RyaW5nLmZyb21DaGFyQ29kZShrKSksayYmZDxvOyk7aWYoNTEyJnIuZmxhZ3MmJihyLmNoZWNrPUIoci5jaGVjayxuLGQscykpLG8tPWQscys9ZCxrKWJyZWFrIGV9ZWxzZSByLmhlYWQmJihyLmhlYWQuY29tbWVudD1udWxsKTtyLm1vZGU9OTtjYXNlIDk6aWYoNTEyJnIuZmxhZ3Mpe2Zvcig7bDwxNjspe2lmKDA9PT1vKWJyZWFrIGU7by0tLHUrPW5bcysrXTw8bCxsKz04fWlmKHUhPT0oNjU1MzUmci5jaGVjaykpe2UubXNnPVwiaGVhZGVyIGNyYyBtaXNtYXRjaFwiLHIubW9kZT0zMDticmVha31sPXU9MH1yLmhlYWQmJihyLmhlYWQuaGNyYz1yLmZsYWdzPj45JjEsci5oZWFkLmRvbmU9ITApLGUuYWRsZXI9ci5jaGVjaz0wLHIubW9kZT0xMjticmVhaztjYXNlIDEwOmZvcig7bDwzMjspe2lmKDA9PT1vKWJyZWFrIGU7by0tLHUrPW5bcysrXTw8bCxsKz04fWUuYWRsZXI9ci5jaGVjaz1MKHUpLGw9dT0wLHIubW9kZT0xMTtjYXNlIDExOmlmKDA9PT1yLmhhdmVkaWN0KXJldHVybiBlLm5leHRfb3V0PWEsZS5hdmFpbF9vdXQ9aCxlLm5leHRfaW49cyxlLmF2YWlsX2luPW8sci5ob2xkPXUsci5iaXRzPWwsMjtlLmFkbGVyPXIuY2hlY2s9MSxyLm1vZGU9MTI7Y2FzZSAxMjppZig1PT09dHx8Nj09PXQpYnJlYWsgZTtjYXNlIDEzOmlmKHIubGFzdCl7dT4+Pj03JmwsbC09NyZsLHIubW9kZT0yNzticmVha31mb3IoO2w8Mzspe2lmKDA9PT1vKWJyZWFrIGU7by0tLHUrPW5bcysrXTw8bCxsKz04fXN3aXRjaChyLmxhc3Q9MSZ1LGwtPTEsMyYodT4+Pj0xKSl7Y2FzZSAwOnIubW9kZT0xNDticmVhaztjYXNlIDE6aWYoaihyKSxyLm1vZGU9MjAsNiE9PXQpYnJlYWs7dT4+Pj0yLGwtPTI7YnJlYWsgZTtjYXNlIDI6ci5tb2RlPTE3O2JyZWFrO2Nhc2UgMzplLm1zZz1cImludmFsaWQgYmxvY2sgdHlwZVwiLHIubW9kZT0zMH11Pj4+PTIsbC09MjticmVhaztjYXNlIDE0OmZvcih1Pj4+PTcmbCxsLT03Jmw7bDwzMjspe2lmKDA9PT1vKWJyZWFrIGU7by0tLHUrPW5bcysrXTw8bCxsKz04fWlmKCg2NTUzNSZ1KSE9KHU+Pj4xNl42NTUzNSkpe2UubXNnPVwiaW52YWxpZCBzdG9yZWQgYmxvY2sgbGVuZ3Roc1wiLHIubW9kZT0zMDticmVha31pZihyLmxlbmd0aD02NTUzNSZ1LGw9dT0wLHIubW9kZT0xNSw2PT09dClicmVhayBlO2Nhc2UgMTU6ci5tb2RlPTE2O2Nhc2UgMTY6aWYoZD1yLmxlbmd0aCl7aWYobzxkJiYoZD1vKSxoPGQmJihkPWgpLDA9PT1kKWJyZWFrIGU7SS5hcnJheVNldChpLG4scyxkLGEpLG8tPWQscys9ZCxoLT1kLGErPWQsci5sZW5ndGgtPWQ7YnJlYWt9ci5tb2RlPTEyO2JyZWFrO2Nhc2UgMTc6Zm9yKDtsPDE0Oyl7aWYoMD09PW8pYnJlYWsgZTtvLS0sdSs9bltzKytdPDxsLGwrPTh9aWYoci5ubGVuPTI1NysoMzEmdSksdT4+Pj01LGwtPTUsci5uZGlzdD0xKygzMSZ1KSx1Pj4+PTUsbC09NSxyLm5jb2RlPTQrKDE1JnUpLHU+Pj49NCxsLT00LDI4NjxyLm5sZW58fDMwPHIubmRpc3Qpe2UubXNnPVwidG9vIG1hbnkgbGVuZ3RoIG9yIGRpc3RhbmNlIHN5bWJvbHNcIixyLm1vZGU9MzA7YnJlYWt9ci5oYXZlPTAsci5tb2RlPTE4O2Nhc2UgMTg6Zm9yKDtyLmhhdmU8ci5uY29kZTspe2Zvcig7bDwzOyl7aWYoMD09PW8pYnJlYWsgZTtvLS0sdSs9bltzKytdPDxsLGwrPTh9ci5sZW5zW0Fbci5oYXZlKytdXT03JnUsdT4+Pj0zLGwtPTN9Zm9yKDtyLmhhdmU8MTk7KXIubGVuc1tBW3IuaGF2ZSsrXV09MDtpZihyLmxlbmNvZGU9ci5sZW5keW4sci5sZW5iaXRzPTcsUz17Yml0czpyLmxlbmJpdHN9LHg9VCgwLHIubGVucywwLDE5LHIubGVuY29kZSwwLHIud29yayxTKSxyLmxlbmJpdHM9Uy5iaXRzLHgpe2UubXNnPVwiaW52YWxpZCBjb2RlIGxlbmd0aHMgc2V0XCIsci5tb2RlPTMwO2JyZWFrfXIuaGF2ZT0wLHIubW9kZT0xOTtjYXNlIDE5OmZvcig7ci5oYXZlPHIubmxlbityLm5kaXN0Oyl7Zm9yKDtnPShDPXIubGVuY29kZVt1JigxPDxyLmxlbmJpdHMpLTFdKT4+PjE2JjI1NSxiPTY1NTM1JkMsISgoXz1DPj4+MjQpPD1sKTspe2lmKDA9PT1vKWJyZWFrIGU7by0tLHUrPW5bcysrXTw8bCxsKz04fWlmKGI8MTYpdT4+Pj1fLGwtPV8sci5sZW5zW3IuaGF2ZSsrXT1iO2Vsc2V7aWYoMTY9PT1iKXtmb3Ioej1fKzI7bDx6Oyl7aWYoMD09PW8pYnJlYWsgZTtvLS0sdSs9bltzKytdPDxsLGwrPTh9aWYodT4+Pj1fLGwtPV8sMD09PXIuaGF2ZSl7ZS5tc2c9XCJpbnZhbGlkIGJpdCBsZW5ndGggcmVwZWF0XCIsci5tb2RlPTMwO2JyZWFrfWs9ci5sZW5zW3IuaGF2ZS0xXSxkPTMrKDMmdSksdT4+Pj0yLGwtPTJ9ZWxzZSBpZigxNz09PWIpe2Zvcih6PV8rMztsPHo7KXtpZigwPT09bylicmVhayBlO28tLSx1Kz1uW3MrK108PGwsbCs9OH1sLT1fLGs9MCxkPTMrKDcmKHU+Pj49XykpLHU+Pj49MyxsLT0zfWVsc2V7Zm9yKHo9Xys3O2w8ejspe2lmKDA9PT1vKWJyZWFrIGU7by0tLHUrPW5bcysrXTw8bCxsKz04fWwtPV8saz0wLGQ9MTErKDEyNyYodT4+Pj1fKSksdT4+Pj03LGwtPTd9aWYoci5oYXZlK2Q+ci5ubGVuK3IubmRpc3Qpe2UubXNnPVwiaW52YWxpZCBiaXQgbGVuZ3RoIHJlcGVhdFwiLHIubW9kZT0zMDticmVha31mb3IoO2QtLTspci5sZW5zW3IuaGF2ZSsrXT1rfX1pZigzMD09PXIubW9kZSlicmVhaztpZigwPT09ci5sZW5zWzI1Nl0pe2UubXNnPVwiaW52YWxpZCBjb2RlIC0tIG1pc3NpbmcgZW5kLW9mLWJsb2NrXCIsci5tb2RlPTMwO2JyZWFrfWlmKHIubGVuYml0cz05LFM9e2JpdHM6ci5sZW5iaXRzfSx4PVQoRCxyLmxlbnMsMCxyLm5sZW4sci5sZW5jb2RlLDAsci53b3JrLFMpLHIubGVuYml0cz1TLmJpdHMseCl7ZS5tc2c9XCJpbnZhbGlkIGxpdGVyYWwvbGVuZ3RocyBzZXRcIixyLm1vZGU9MzA7YnJlYWt9aWYoci5kaXN0Yml0cz02LHIuZGlzdGNvZGU9ci5kaXN0ZHluLFM9e2JpdHM6ci5kaXN0Yml0c30seD1UKEYsci5sZW5zLHIubmxlbixyLm5kaXN0LHIuZGlzdGNvZGUsMCxyLndvcmssUyksci5kaXN0Yml0cz1TLmJpdHMseCl7ZS5tc2c9XCJpbnZhbGlkIGRpc3RhbmNlcyBzZXRcIixyLm1vZGU9MzA7YnJlYWt9aWYoci5tb2RlPTIwLDY9PT10KWJyZWFrIGU7Y2FzZSAyMDpyLm1vZGU9MjE7Y2FzZSAyMTppZig2PD1vJiYyNTg8PWgpe2UubmV4dF9vdXQ9YSxlLmF2YWlsX291dD1oLGUubmV4dF9pbj1zLGUuYXZhaWxfaW49byxyLmhvbGQ9dSxyLmJpdHM9bCxSKGUsYyksYT1lLm5leHRfb3V0LGk9ZS5vdXRwdXQsaD1lLmF2YWlsX291dCxzPWUubmV4dF9pbixuPWUuaW5wdXQsbz1lLmF2YWlsX2luLHU9ci5ob2xkLGw9ci5iaXRzLDEyPT09ci5tb2RlJiYoci5iYWNrPS0xKTticmVha31mb3Ioci5iYWNrPTA7Zz0oQz1yLmxlbmNvZGVbdSYoMTw8ci5sZW5iaXRzKS0xXSk+Pj4xNiYyNTUsYj02NTUzNSZDLCEoKF89Qz4+PjI0KTw9bCk7KXtpZigwPT09bylicmVhayBlO28tLSx1Kz1uW3MrK108PGwsbCs9OH1pZihnJiYwPT0oMjQwJmcpKXtmb3Iodj1fLHk9Zyx3PWI7Zz0oQz1yLmxlbmNvZGVbdysoKHUmKDE8PHYreSktMSk+PnYpXSk+Pj4xNiYyNTUsYj02NTUzNSZDLCEodisoXz1DPj4+MjQpPD1sKTspe2lmKDA9PT1vKWJyZWFrIGU7by0tLHUrPW5bcysrXTw8bCxsKz04fXU+Pj49dixsLT12LHIuYmFjays9dn1pZih1Pj4+PV8sbC09XyxyLmJhY2srPV8sci5sZW5ndGg9YiwwPT09Zyl7ci5tb2RlPTI2O2JyZWFrfWlmKDMyJmcpe3IuYmFjaz0tMSxyLm1vZGU9MTI7YnJlYWt9aWYoNjQmZyl7ZS5tc2c9XCJpbnZhbGlkIGxpdGVyYWwvbGVuZ3RoIGNvZGVcIixyLm1vZGU9MzA7YnJlYWt9ci5leHRyYT0xNSZnLHIubW9kZT0yMjtjYXNlIDIyOmlmKHIuZXh0cmEpe2Zvcih6PXIuZXh0cmE7bDx6Oyl7aWYoMD09PW8pYnJlYWsgZTtvLS0sdSs9bltzKytdPDxsLGwrPTh9ci5sZW5ndGgrPXUmKDE8PHIuZXh0cmEpLTEsdT4+Pj1yLmV4dHJhLGwtPXIuZXh0cmEsci5iYWNrKz1yLmV4dHJhfXIud2FzPXIubGVuZ3RoLHIubW9kZT0yMztjYXNlIDIzOmZvcig7Zz0oQz1yLmRpc3Rjb2RlW3UmKDE8PHIuZGlzdGJpdHMpLTFdKT4+PjE2JjI1NSxiPTY1NTM1JkMsISgoXz1DPj4+MjQpPD1sKTspe2lmKDA9PT1vKWJyZWFrIGU7by0tLHUrPW5bcysrXTw8bCxsKz04fWlmKDA9PSgyNDAmZykpe2Zvcih2PV8seT1nLHc9YjtnPShDPXIuZGlzdGNvZGVbdysoKHUmKDE8PHYreSktMSk+PnYpXSk+Pj4xNiYyNTUsYj02NTUzNSZDLCEodisoXz1DPj4+MjQpPD1sKTspe2lmKDA9PT1vKWJyZWFrIGU7by0tLHUrPW5bcysrXTw8bCxsKz04fXU+Pj49dixsLT12LHIuYmFjays9dn1pZih1Pj4+PV8sbC09XyxyLmJhY2srPV8sNjQmZyl7ZS5tc2c9XCJpbnZhbGlkIGRpc3RhbmNlIGNvZGVcIixyLm1vZGU9MzA7YnJlYWt9ci5vZmZzZXQ9YixyLmV4dHJhPTE1Jmcsci5tb2RlPTI0O2Nhc2UgMjQ6aWYoci5leHRyYSl7Zm9yKHo9ci5leHRyYTtsPHo7KXtpZigwPT09bylicmVhayBlO28tLSx1Kz1uW3MrK108PGwsbCs9OH1yLm9mZnNldCs9dSYoMTw8ci5leHRyYSktMSx1Pj4+PXIuZXh0cmEsbC09ci5leHRyYSxyLmJhY2srPXIuZXh0cmF9aWYoci5vZmZzZXQ+ci5kbWF4KXtlLm1zZz1cImludmFsaWQgZGlzdGFuY2UgdG9vIGZhciBiYWNrXCIsci5tb2RlPTMwO2JyZWFrfXIubW9kZT0yNTtjYXNlIDI1OmlmKDA9PT1oKWJyZWFrIGU7aWYoZD1jLWgsci5vZmZzZXQ+ZCl7aWYoKGQ9ci5vZmZzZXQtZCk+ci53aGF2ZSYmci5zYW5lKXtlLm1zZz1cImludmFsaWQgZGlzdGFuY2UgdG9vIGZhciBiYWNrXCIsci5tb2RlPTMwO2JyZWFrfXA9ZD5yLnduZXh0PyhkLT1yLnduZXh0LHIud3NpemUtZCk6ci53bmV4dC1kLGQ+ci5sZW5ndGgmJihkPXIubGVuZ3RoKSxtPXIud2luZG93fWVsc2UgbT1pLHA9YS1yLm9mZnNldCxkPXIubGVuZ3RoO2ZvcihoPGQmJihkPWgpLGgtPWQsci5sZW5ndGgtPWQ7aVthKytdPW1bcCsrXSwtLWQ7KTswPT09ci5sZW5ndGgmJihyLm1vZGU9MjEpO2JyZWFrO2Nhc2UgMjY6aWYoMD09PWgpYnJlYWsgZTtpW2ErK109ci5sZW5ndGgsaC0tLHIubW9kZT0yMTticmVhaztjYXNlIDI3OmlmKHIud3JhcCl7Zm9yKDtsPDMyOyl7aWYoMD09PW8pYnJlYWsgZTtvLS0sdXw9bltzKytdPDxsLGwrPTh9aWYoYy09aCxlLnRvdGFsX291dCs9YyxyLnRvdGFsKz1jLGMmJihlLmFkbGVyPXIuY2hlY2s9ci5mbGFncz9CKHIuY2hlY2ssaSxjLGEtYyk6TyhyLmNoZWNrLGksYyxhLWMpKSxjPWgsKHIuZmxhZ3M/dTpMKHUpKSE9PXIuY2hlY2spe2UubXNnPVwiaW5jb3JyZWN0IGRhdGEgY2hlY2tcIixyLm1vZGU9MzA7YnJlYWt9bD11PTB9ci5tb2RlPTI4O2Nhc2UgMjg6aWYoci53cmFwJiZyLmZsYWdzKXtmb3IoO2w8MzI7KXtpZigwPT09bylicmVhayBlO28tLSx1Kz1uW3MrK108PGwsbCs9OH1pZih1IT09KDQyOTQ5NjcyOTUmci50b3RhbCkpe2UubXNnPVwiaW5jb3JyZWN0IGxlbmd0aCBjaGVja1wiLHIubW9kZT0zMDticmVha31sPXU9MH1yLm1vZGU9Mjk7Y2FzZSAyOTp4PTE7YnJlYWsgZTtjYXNlIDMwOng9LTM7YnJlYWsgZTtjYXNlIDMxOnJldHVybi00O2Nhc2UgMzI6ZGVmYXVsdDpyZXR1cm4gVX1yZXR1cm4gZS5uZXh0X291dD1hLGUuYXZhaWxfb3V0PWgsZS5uZXh0X2luPXMsZS5hdmFpbF9pbj1vLHIuaG9sZD11LHIuYml0cz1sLChyLndzaXplfHxjIT09ZS5hdmFpbF9vdXQmJnIubW9kZTwzMCYmKHIubW9kZTwyN3x8NCE9PXQpKSYmWihlLGUub3V0cHV0LGUubmV4dF9vdXQsYy1lLmF2YWlsX291dCk/KHIubW9kZT0zMSwtNCk6KGYtPWUuYXZhaWxfaW4sYy09ZS5hdmFpbF9vdXQsZS50b3RhbF9pbis9ZixlLnRvdGFsX291dCs9YyxyLnRvdGFsKz1jLHIud3JhcCYmYyYmKGUuYWRsZXI9ci5jaGVjaz1yLmZsYWdzP0Ioci5jaGVjayxpLGMsZS5uZXh0X291dC1jKTpPKHIuY2hlY2ssaSxjLGUubmV4dF9vdXQtYykpLGUuZGF0YV90eXBlPXIuYml0cysoci5sYXN0PzY0OjApKygxMj09PXIubW9kZT8xMjg6MCkrKDIwPT09ci5tb2RlfHwxNT09PXIubW9kZT8yNTY6MCksKDA9PWYmJjA9PT1jfHw0PT09dCkmJng9PT1OJiYoeD0tNSkseCl9LHIuaW5mbGF0ZUVuZD1mdW5jdGlvbihlKXtpZighZXx8IWUuc3RhdGUpcmV0dXJuIFU7dmFyIHQ9ZS5zdGF0ZTtyZXR1cm4gdC53aW5kb3cmJih0LndpbmRvdz1udWxsKSxlLnN0YXRlPW51bGwsTn0sci5pbmZsYXRlR2V0SGVhZGVyPWZ1bmN0aW9uKGUsdCl7dmFyIHI7cmV0dXJuIGUmJmUuc3RhdGU/MD09KDImKHI9ZS5zdGF0ZSkud3JhcCk/VTooKHIuaGVhZD10KS5kb25lPSExLE4pOlV9LHIuaW5mbGF0ZVNldERpY3Rpb25hcnk9ZnVuY3Rpb24oZSx0KXt2YXIgcixuPXQubGVuZ3RoO3JldHVybiBlJiZlLnN0YXRlPzAhPT0ocj1lLnN0YXRlKS53cmFwJiYxMSE9PXIubW9kZT9VOjExPT09ci5tb2RlJiZPKDEsdCxuLDApIT09ci5jaGVjaz8tMzpaKGUsdCxuLG4pPyhyLm1vZGU9MzEsLTQpOihyLmhhdmVkaWN0PTEsTik6VX0sci5pbmZsYXRlSW5mbz1cInBha28gaW5mbGF0ZSAoZnJvbSBOb2RlY2EgcHJvamVjdClcIn0se1wiLi4vdXRpbHMvY29tbW9uXCI6NDEsXCIuL2FkbGVyMzJcIjo0MyxcIi4vY3JjMzJcIjo0NSxcIi4vaW5mZmFzdFwiOjQ4LFwiLi9pbmZ0cmVlc1wiOjUwfV0sNTA6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt2YXIgRD1lKFwiLi4vdXRpbHMvY29tbW9uXCIpLEY9WzMsNCw1LDYsNyw4LDksMTAsMTEsMTMsMTUsMTcsMTksMjMsMjcsMzEsMzUsNDMsNTEsNTksNjcsODMsOTksMTE1LDEzMSwxNjMsMTk1LDIyNywyNTgsMCwwXSxOPVsxNiwxNiwxNiwxNiwxNiwxNiwxNiwxNiwxNywxNywxNywxNywxOCwxOCwxOCwxOCwxOSwxOSwxOSwxOSwyMCwyMCwyMCwyMCwyMSwyMSwyMSwyMSwxNiw3Miw3OF0sVT1bMSwyLDMsNCw1LDcsOSwxMywxNywyNSwzMyw0OSw2NSw5NywxMjksMTkzLDI1NywzODUsNTEzLDc2OSwxMDI1LDE1MzcsMjA0OSwzMDczLDQwOTcsNjE0NSw4MTkzLDEyMjg5LDE2Mzg1LDI0NTc3LDAsMF0sUD1bMTYsMTYsMTYsMTYsMTcsMTcsMTgsMTgsMTksMTksMjAsMjAsMjEsMjEsMjIsMjIsMjMsMjMsMjQsMjQsMjUsMjUsMjYsMjYsMjcsMjcsMjgsMjgsMjksMjksNjQsNjRdO3QuZXhwb3J0cz1mdW5jdGlvbihlLHQscixuLGkscyxhLG8pe3ZhciBoLHUsbCxmLGMsZCxwLG0sXyxnPW8uYml0cyxiPTAsdj0wLHk9MCx3PTAsaz0wLHg9MCxTPTAsej0wLEM9MCxFPTAsQT1udWxsLEk9MCxPPW5ldyBELkJ1ZjE2KDE2KSxCPW5ldyBELkJ1ZjE2KDE2KSxSPW51bGwsVD0wO2ZvcihiPTA7Yjw9MTU7YisrKU9bYl09MDtmb3Iodj0wO3Y8bjt2KyspT1t0W3Irdl1dKys7Zm9yKGs9Zyx3PTE1OzE8PXcmJjA9PT1PW3ddO3ctLSk7aWYodzxrJiYoaz13KSwwPT09dylyZXR1cm4gaVtzKytdPTIwOTcxNTIwLGlbcysrXT0yMDk3MTUyMCxvLmJpdHM9MSwwO2Zvcih5PTE7eTx3JiYwPT09T1t5XTt5KyspO2ZvcihrPHkmJihrPXkpLGI9ej0xO2I8PTE1O2IrKylpZih6PDw9MSwoei09T1tiXSk8MClyZXR1cm4tMTtpZigwPHomJigwPT09ZXx8MSE9PXcpKXJldHVybi0xO2ZvcihCWzFdPTAsYj0xO2I8MTU7YisrKUJbYisxXT1CW2JdK09bYl07Zm9yKHY9MDt2PG47disrKTAhPT10W3Irdl0mJihhW0JbdFtyK3ZdXSsrXT12KTtpZihkPTA9PT1lPyhBPVI9YSwxOSk6MT09PWU/KEE9RixJLT0yNTcsUj1OLFQtPTI1NywyNTYpOihBPVUsUj1QLC0xKSxiPXksYz1zLFM9dj1FPTAsbD0tMSxmPShDPTE8PCh4PWspKS0xLDE9PT1lJiY4NTI8Q3x8Mj09PWUmJjU5MjxDKXJldHVybiAxO2Zvcig7Oyl7Zm9yKHA9Yi1TLF89YVt2XTxkPyhtPTAsYVt2XSk6YVt2XT5kPyhtPVJbVCthW3ZdXSxBW0krYVt2XV0pOihtPTk2LDApLGg9MTw8Yi1TLHk9dT0xPDx4O2lbYysoRT4+UykrKHUtPWgpXT1wPDwyNHxtPDwxNnxffDAsMCE9PXU7KTtmb3IoaD0xPDxiLTE7RSZoOyloPj49MTtpZigwIT09aD8oRSY9aC0xLEUrPWgpOkU9MCx2KyssMD09LS1PW2JdKXtpZihiPT09dylicmVhaztiPXRbcithW3ZdXX1pZihrPGImJihFJmYpIT09bCl7Zm9yKDA9PT1TJiYoUz1rKSxjKz15LHo9MTw8KHg9Yi1TKTt4K1M8dyYmISgoei09T1t4K1NdKTw9MCk7KXgrKyx6PDw9MTtpZihDKz0xPDx4LDE9PT1lJiY4NTI8Q3x8Mj09PWUmJjU5MjxDKXJldHVybiAxO2lbbD1FJmZdPWs8PDI0fHg8PDE2fGMtc3wwfX1yZXR1cm4gMCE9PUUmJihpW2MrRV09Yi1TPDwyNHw2NDw8MTZ8MCksby5iaXRzPWssMH19LHtcIi4uL3V0aWxzL2NvbW1vblwiOjQxfV0sNTE6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt0LmV4cG9ydHM9ezI6XCJuZWVkIGRpY3Rpb25hcnlcIiwxOlwic3RyZWFtIGVuZFwiLDA6XCJcIixcIi0xXCI6XCJmaWxlIGVycm9yXCIsXCItMlwiOlwic3RyZWFtIGVycm9yXCIsXCItM1wiOlwiZGF0YSBlcnJvclwiLFwiLTRcIjpcImluc3VmZmljaWVudCBtZW1vcnlcIixcIi01XCI6XCJidWZmZXIgZXJyb3JcIixcIi02XCI6XCJpbmNvbXBhdGlibGUgdmVyc2lvblwifX0se31dLDUyOltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7dmFyIGk9ZShcIi4uL3V0aWxzL2NvbW1vblwiKSxvPTAsaD0xO2Z1bmN0aW9uIG4oZSl7Zm9yKHZhciB0PWUubGVuZ3RoOzA8PS0tdDspZVt0XT0wfXZhciBzPTAsYT0yOSx1PTI1NixsPXUrMSthLGY9MzAsYz0xOSxfPTIqbCsxLGc9MTUsZD0xNixwPTcsbT0yNTYsYj0xNix2PTE3LHk9MTgsdz1bMCwwLDAsMCwwLDAsMCwwLDEsMSwxLDEsMiwyLDIsMiwzLDMsMywzLDQsNCw0LDQsNSw1LDUsNSwwXSxrPVswLDAsMCwwLDEsMSwyLDIsMywzLDQsNCw1LDUsNiw2LDcsNyw4LDgsOSw5LDEwLDEwLDExLDExLDEyLDEyLDEzLDEzXSx4PVswLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDIsMyw3XSxTPVsxNiwxNywxOCwwLDgsNyw5LDYsMTAsNSwxMSw0LDEyLDMsMTMsMiwxNCwxLDE1XSx6PW5ldyBBcnJheSgyKihsKzIpKTtuKHopO3ZhciBDPW5ldyBBcnJheSgyKmYpO24oQyk7dmFyIEU9bmV3IEFycmF5KDUxMik7bihFKTt2YXIgQT1uZXcgQXJyYXkoMjU2KTtuKEEpO3ZhciBJPW5ldyBBcnJheShhKTtuKEkpO3ZhciBPLEIsUixUPW5ldyBBcnJheShmKTtmdW5jdGlvbiBEKGUsdCxyLG4saSl7dGhpcy5zdGF0aWNfdHJlZT1lLHRoaXMuZXh0cmFfYml0cz10LHRoaXMuZXh0cmFfYmFzZT1yLHRoaXMuZWxlbXM9bix0aGlzLm1heF9sZW5ndGg9aSx0aGlzLmhhc19zdHJlZT1lJiZlLmxlbmd0aH1mdW5jdGlvbiBGKGUsdCl7dGhpcy5keW5fdHJlZT1lLHRoaXMubWF4X2NvZGU9MCx0aGlzLnN0YXRfZGVzYz10fWZ1bmN0aW9uIE4oZSl7cmV0dXJuIGU8MjU2P0VbZV06RVsyNTYrKGU+Pj43KV19ZnVuY3Rpb24gVShlLHQpe2UucGVuZGluZ19idWZbZS5wZW5kaW5nKytdPTI1NSZ0LGUucGVuZGluZ19idWZbZS5wZW5kaW5nKytdPXQ+Pj44JjI1NX1mdW5jdGlvbiBQKGUsdCxyKXtlLmJpX3ZhbGlkPmQtcj8oZS5iaV9idWZ8PXQ8PGUuYmlfdmFsaWQmNjU1MzUsVShlLGUuYmlfYnVmKSxlLmJpX2J1Zj10Pj5kLWUuYmlfdmFsaWQsZS5iaV92YWxpZCs9ci1kKTooZS5iaV9idWZ8PXQ8PGUuYmlfdmFsaWQmNjU1MzUsZS5iaV92YWxpZCs9cil9ZnVuY3Rpb24gTChlLHQscil7UChlLHJbMip0XSxyWzIqdCsxXSl9ZnVuY3Rpb24gaihlLHQpe2Zvcih2YXIgcj0wO3J8PTEmZSxlPj4+PTEscjw8PTEsMDwtLXQ7KTtyZXR1cm4gcj4+PjF9ZnVuY3Rpb24gWihlLHQscil7dmFyIG4saSxzPW5ldyBBcnJheShnKzEpLGE9MDtmb3Iobj0xO248PWc7bisrKXNbbl09YT1hK3Jbbi0xXTw8MTtmb3IoaT0wO2k8PXQ7aSsrKXt2YXIgbz1lWzIqaSsxXTswIT09byYmKGVbMippXT1qKHNbb10rKyxvKSl9fWZ1bmN0aW9uIFcoZSl7dmFyIHQ7Zm9yKHQ9MDt0PGw7dCsrKWUuZHluX2x0cmVlWzIqdF09MDtmb3IodD0wO3Q8Zjt0KyspZS5keW5fZHRyZWVbMip0XT0wO2Zvcih0PTA7dDxjO3QrKyllLmJsX3RyZWVbMip0XT0wO2UuZHluX2x0cmVlWzIqbV09MSxlLm9wdF9sZW49ZS5zdGF0aWNfbGVuPTAsZS5sYXN0X2xpdD1lLm1hdGNoZXM9MH1mdW5jdGlvbiBNKGUpezg8ZS5iaV92YWxpZD9VKGUsZS5iaV9idWYpOjA8ZS5iaV92YWxpZCYmKGUucGVuZGluZ19idWZbZS5wZW5kaW5nKytdPWUuYmlfYnVmKSxlLmJpX2J1Zj0wLGUuYmlfdmFsaWQ9MH1mdW5jdGlvbiBIKGUsdCxyLG4pe3ZhciBpPTIqdCxzPTIqcjtyZXR1cm4gZVtpXTxlW3NdfHxlW2ldPT09ZVtzXSYmblt0XTw9bltyXX1mdW5jdGlvbiBHKGUsdCxyKXtmb3IodmFyIG49ZS5oZWFwW3JdLGk9cjw8MTtpPD1lLmhlYXBfbGVuJiYoaTxlLmhlYXBfbGVuJiZIKHQsZS5oZWFwW2krMV0sZS5oZWFwW2ldLGUuZGVwdGgpJiZpKyssIUgodCxuLGUuaGVhcFtpXSxlLmRlcHRoKSk7KWUuaGVhcFtyXT1lLmhlYXBbaV0scj1pLGk8PD0xO2UuaGVhcFtyXT1ufWZ1bmN0aW9uIEsoZSx0LHIpe3ZhciBuLGkscyxhLG89MDtpZigwIT09ZS5sYXN0X2xpdClmb3IoO249ZS5wZW5kaW5nX2J1ZltlLmRfYnVmKzIqb108PDh8ZS5wZW5kaW5nX2J1ZltlLmRfYnVmKzIqbysxXSxpPWUucGVuZGluZ19idWZbZS5sX2J1ZitvXSxvKyssMD09PW4/TChlLGksdCk6KEwoZSwocz1BW2ldKSt1KzEsdCksMCE9PShhPXdbc10pJiZQKGUsaS09SVtzXSxhKSxMKGUscz1OKC0tbiksciksMCE9PShhPWtbc10pJiZQKGUsbi09VFtzXSxhKSksbzxlLmxhc3RfbGl0Oyk7TChlLG0sdCl9ZnVuY3Rpb24gWShlLHQpe3ZhciByLG4saSxzPXQuZHluX3RyZWUsYT10LnN0YXRfZGVzYy5zdGF0aWNfdHJlZSxvPXQuc3RhdF9kZXNjLmhhc19zdHJlZSxoPXQuc3RhdF9kZXNjLmVsZW1zLHU9LTE7Zm9yKGUuaGVhcF9sZW49MCxlLmhlYXBfbWF4PV8scj0wO3I8aDtyKyspMCE9PXNbMipyXT8oZS5oZWFwWysrZS5oZWFwX2xlbl09dT1yLGUuZGVwdGhbcl09MCk6c1syKnIrMV09MDtmb3IoO2UuaGVhcF9sZW48Mjspc1syKihpPWUuaGVhcFsrK2UuaGVhcF9sZW5dPXU8Mj8rK3U6MCldPTEsZS5kZXB0aFtpXT0wLGUub3B0X2xlbi0tLG8mJihlLnN0YXRpY19sZW4tPWFbMippKzFdKTtmb3IodC5tYXhfY29kZT11LHI9ZS5oZWFwX2xlbj4+MTsxPD1yO3ItLSlHKGUscyxyKTtmb3IoaT1oO3I9ZS5oZWFwWzFdLGUuaGVhcFsxXT1lLmhlYXBbZS5oZWFwX2xlbi0tXSxHKGUscywxKSxuPWUuaGVhcFsxXSxlLmhlYXBbLS1lLmhlYXBfbWF4XT1yLGUuaGVhcFstLWUuaGVhcF9tYXhdPW4sc1syKmldPXNbMipyXStzWzIqbl0sZS5kZXB0aFtpXT0oZS5kZXB0aFtyXT49ZS5kZXB0aFtuXT9lLmRlcHRoW3JdOmUuZGVwdGhbbl0pKzEsc1syKnIrMV09c1syKm4rMV09aSxlLmhlYXBbMV09aSsrLEcoZSxzLDEpLDI8PWUuaGVhcF9sZW47KTtlLmhlYXBbLS1lLmhlYXBfbWF4XT1lLmhlYXBbMV0sZnVuY3Rpb24oZSx0KXt2YXIgcixuLGkscyxhLG8saD10LmR5bl90cmVlLHU9dC5tYXhfY29kZSxsPXQuc3RhdF9kZXNjLnN0YXRpY190cmVlLGY9dC5zdGF0X2Rlc2MuaGFzX3N0cmVlLGM9dC5zdGF0X2Rlc2MuZXh0cmFfYml0cyxkPXQuc3RhdF9kZXNjLmV4dHJhX2Jhc2UscD10LnN0YXRfZGVzYy5tYXhfbGVuZ3RoLG09MDtmb3Iocz0wO3M8PWc7cysrKWUuYmxfY291bnRbc109MDtmb3IoaFsyKmUuaGVhcFtlLmhlYXBfbWF4XSsxXT0wLHI9ZS5oZWFwX21heCsxO3I8XztyKyspcDwocz1oWzIqaFsyKihuPWUuaGVhcFtyXSkrMV0rMV0rMSkmJihzPXAsbSsrKSxoWzIqbisxXT1zLHU8bnx8KGUuYmxfY291bnRbc10rKyxhPTAsZDw9biYmKGE9Y1tuLWRdKSxvPWhbMipuXSxlLm9wdF9sZW4rPW8qKHMrYSksZiYmKGUuc3RhdGljX2xlbis9byoobFsyKm4rMV0rYSkpKTtpZigwIT09bSl7ZG97Zm9yKHM9cC0xOzA9PT1lLmJsX2NvdW50W3NdOylzLS07ZS5ibF9jb3VudFtzXS0tLGUuYmxfY291bnRbcysxXSs9MixlLmJsX2NvdW50W3BdLS0sbS09Mn13aGlsZSgwPG0pO2ZvcihzPXA7MCE9PXM7cy0tKWZvcihuPWUuYmxfY291bnRbc107MCE9PW47KXU8KGk9ZS5oZWFwWy0tcl0pfHwoaFsyKmkrMV0hPT1zJiYoZS5vcHRfbGVuKz0ocy1oWzIqaSsxXSkqaFsyKmldLGhbMippKzFdPXMpLG4tLSl9fShlLHQpLFoocyx1LGUuYmxfY291bnQpfWZ1bmN0aW9uIFgoZSx0LHIpe3ZhciBuLGkscz0tMSxhPXRbMV0sbz0wLGg9Nyx1PTQ7Zm9yKDA9PT1hJiYoaD0xMzgsdT0zKSx0WzIqKHIrMSkrMV09NjU1MzUsbj0wO248PXI7bisrKWk9YSxhPXRbMioobisxKSsxXSwrK288aCYmaT09PWF8fChvPHU/ZS5ibF90cmVlWzIqaV0rPW86MCE9PWk/KGkhPT1zJiZlLmJsX3RyZWVbMippXSsrLGUuYmxfdHJlZVsyKmJdKyspOm88PTEwP2UuYmxfdHJlZVsyKnZdKys6ZS5ibF90cmVlWzIqeV0rKyxzPWksdT0obz0wKT09PWE/KGg9MTM4LDMpOmk9PT1hPyhoPTYsMyk6KGg9Nyw0KSl9ZnVuY3Rpb24gVihlLHQscil7dmFyIG4saSxzPS0xLGE9dFsxXSxvPTAsaD03LHU9NDtmb3IoMD09PWEmJihoPTEzOCx1PTMpLG49MDtuPD1yO24rKylpZihpPWEsYT10WzIqKG4rMSkrMV0sISgrK288aCYmaT09PWEpKXtpZihvPHUpZm9yKDtMKGUsaSxlLmJsX3RyZWUpLDAhPS0tbzspO2Vsc2UgMCE9PWk/KGkhPT1zJiYoTChlLGksZS5ibF90cmVlKSxvLS0pLEwoZSxiLGUuYmxfdHJlZSksUChlLG8tMywyKSk6bzw9MTA/KEwoZSx2LGUuYmxfdHJlZSksUChlLG8tMywzKSk6KEwoZSx5LGUuYmxfdHJlZSksUChlLG8tMTEsNykpO3M9aSx1PShvPTApPT09YT8oaD0xMzgsMyk6aT09PWE/KGg9NiwzKTooaD03LDQpfX1uKFQpO3ZhciBxPSExO2Z1bmN0aW9uIEooZSx0LHIsbil7UChlLChzPDwxKSsobj8xOjApLDMpLGZ1bmN0aW9uKGUsdCxyLG4pe00oZSksbiYmKFUoZSxyKSxVKGUsfnIpKSxpLmFycmF5U2V0KGUucGVuZGluZ19idWYsZS53aW5kb3csdCxyLGUucGVuZGluZyksZS5wZW5kaW5nKz1yfShlLHQsciwhMCl9ci5fdHJfaW5pdD1mdW5jdGlvbihlKXtxfHwoZnVuY3Rpb24oKXt2YXIgZSx0LHIsbixpLHM9bmV3IEFycmF5KGcrMSk7Zm9yKG49cj0wO248YS0xO24rKylmb3IoSVtuXT1yLGU9MDtlPDE8PHdbbl07ZSsrKUFbcisrXT1uO2ZvcihBW3ItMV09bixuPWk9MDtuPDE2O24rKylmb3IoVFtuXT1pLGU9MDtlPDE8PGtbbl07ZSsrKUVbaSsrXT1uO2ZvcihpPj49NztuPGY7bisrKWZvcihUW25dPWk8PDcsZT0wO2U8MTw8a1tuXS03O2UrKylFWzI1NitpKytdPW47Zm9yKHQ9MDt0PD1nO3QrKylzW3RdPTA7Zm9yKGU9MDtlPD0xNDM7KXpbMiplKzFdPTgsZSsrLHNbOF0rKztmb3IoO2U8PTI1NTspelsyKmUrMV09OSxlKyssc1s5XSsrO2Zvcig7ZTw9Mjc5Oyl6WzIqZSsxXT03LGUrKyxzWzddKys7Zm9yKDtlPD0yODc7KXpbMiplKzFdPTgsZSsrLHNbOF0rKztmb3IoWih6LGwrMSxzKSxlPTA7ZTxmO2UrKylDWzIqZSsxXT01LENbMiplXT1qKGUsNSk7Tz1uZXcgRCh6LHcsdSsxLGwsZyksQj1uZXcgRChDLGssMCxmLGcpLFI9bmV3IEQobmV3IEFycmF5KDApLHgsMCxjLHApfSgpLHE9ITApLGUubF9kZXNjPW5ldyBGKGUuZHluX2x0cmVlLE8pLGUuZF9kZXNjPW5ldyBGKGUuZHluX2R0cmVlLEIpLGUuYmxfZGVzYz1uZXcgRihlLmJsX3RyZWUsUiksZS5iaV9idWY9MCxlLmJpX3ZhbGlkPTAsVyhlKX0sci5fdHJfc3RvcmVkX2Jsb2NrPUosci5fdHJfZmx1c2hfYmxvY2s9ZnVuY3Rpb24oZSx0LHIsbil7dmFyIGkscyxhPTA7MDxlLmxldmVsPygyPT09ZS5zdHJtLmRhdGFfdHlwZSYmKGUuc3RybS5kYXRhX3R5cGU9ZnVuY3Rpb24oZSl7dmFyIHQscj00MDkzNjI0NDQ3O2Zvcih0PTA7dDw9MzE7dCsrLHI+Pj49MSlpZigxJnImJjAhPT1lLmR5bl9sdHJlZVsyKnRdKXJldHVybiBvO2lmKDAhPT1lLmR5bl9sdHJlZVsxOF18fDAhPT1lLmR5bl9sdHJlZVsyMF18fDAhPT1lLmR5bl9sdHJlZVsyNl0pcmV0dXJuIGg7Zm9yKHQ9MzI7dDx1O3QrKylpZigwIT09ZS5keW5fbHRyZWVbMip0XSlyZXR1cm4gaDtyZXR1cm4gb30oZSkpLFkoZSxlLmxfZGVzYyksWShlLGUuZF9kZXNjKSxhPWZ1bmN0aW9uKGUpe3ZhciB0O2ZvcihYKGUsZS5keW5fbHRyZWUsZS5sX2Rlc2MubWF4X2NvZGUpLFgoZSxlLmR5bl9kdHJlZSxlLmRfZGVzYy5tYXhfY29kZSksWShlLGUuYmxfZGVzYyksdD1jLTE7Mzw9dCYmMD09PWUuYmxfdHJlZVsyKlNbdF0rMV07dC0tKTtyZXR1cm4gZS5vcHRfbGVuKz0zKih0KzEpKzUrNSs0LHR9KGUpLGk9ZS5vcHRfbGVuKzMrNz4+PjMsKHM9ZS5zdGF0aWNfbGVuKzMrNz4+PjMpPD1pJiYoaT1zKSk6aT1zPXIrNSxyKzQ8PWkmJi0xIT09dD9KKGUsdCxyLG4pOjQ9PT1lLnN0cmF0ZWd5fHxzPT09aT8oUChlLDIrKG4/MTowKSwzKSxLKGUseixDKSk6KFAoZSw0KyhuPzE6MCksMyksZnVuY3Rpb24oZSx0LHIsbil7dmFyIGk7Zm9yKFAoZSx0LTI1Nyw1KSxQKGUsci0xLDUpLFAoZSxuLTQsNCksaT0wO2k8bjtpKyspUChlLGUuYmxfdHJlZVsyKlNbaV0rMV0sMyk7VihlLGUuZHluX2x0cmVlLHQtMSksVihlLGUuZHluX2R0cmVlLHItMSl9KGUsZS5sX2Rlc2MubWF4X2NvZGUrMSxlLmRfZGVzYy5tYXhfY29kZSsxLGErMSksSyhlLGUuZHluX2x0cmVlLGUuZHluX2R0cmVlKSksVyhlKSxuJiZNKGUpfSxyLl90cl90YWxseT1mdW5jdGlvbihlLHQscil7cmV0dXJuIGUucGVuZGluZ19idWZbZS5kX2J1ZisyKmUubGFzdF9saXRdPXQ+Pj44JjI1NSxlLnBlbmRpbmdfYnVmW2UuZF9idWYrMiplLmxhc3RfbGl0KzFdPTI1NSZ0LGUucGVuZGluZ19idWZbZS5sX2J1ZitlLmxhc3RfbGl0XT0yNTUmcixlLmxhc3RfbGl0KyssMD09PXQ/ZS5keW5fbHRyZWVbMipyXSsrOihlLm1hdGNoZXMrKyx0LS0sZS5keW5fbHRyZWVbMiooQVtyXSt1KzEpXSsrLGUuZHluX2R0cmVlWzIqTih0KV0rKyksZS5sYXN0X2xpdD09PWUubGl0X2J1ZnNpemUtMX0sci5fdHJfYWxpZ249ZnVuY3Rpb24oZSl7UChlLDIsMyksTChlLG0seiksZnVuY3Rpb24oZSl7MTY9PT1lLmJpX3ZhbGlkPyhVKGUsZS5iaV9idWYpLGUuYmlfYnVmPTAsZS5iaV92YWxpZD0wKTo4PD1lLmJpX3ZhbGlkJiYoZS5wZW5kaW5nX2J1ZltlLnBlbmRpbmcrK109MjU1JmUuYmlfYnVmLGUuYmlfYnVmPj49OCxlLmJpX3ZhbGlkLT04KX0oZSl9fSx7XCIuLi91dGlscy9jb21tb25cIjo0MX1dLDUzOltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7dC5leHBvcnRzPWZ1bmN0aW9uKCl7dGhpcy5pbnB1dD1udWxsLHRoaXMubmV4dF9pbj0wLHRoaXMuYXZhaWxfaW49MCx0aGlzLnRvdGFsX2luPTAsdGhpcy5vdXRwdXQ9bnVsbCx0aGlzLm5leHRfb3V0PTAsdGhpcy5hdmFpbF9vdXQ9MCx0aGlzLnRvdGFsX291dD0wLHRoaXMubXNnPVwiXCIsdGhpcy5zdGF0ZT1udWxsLHRoaXMuZGF0YV90eXBlPTIsdGhpcy5hZGxlcj0wfX0se31dLDU0OltmdW5jdGlvbihlLHQscil7KGZ1bmN0aW9uKGUpeyFmdW5jdGlvbihyLG4pe1widXNlIHN0cmljdFwiO2lmKCFyLnNldEltbWVkaWF0ZSl7dmFyIGkscyx0LGEsbz0xLGg9e30sdT0hMSxsPXIuZG9jdW1lbnQsZT1PYmplY3QuZ2V0UHJvdG90eXBlT2YmJk9iamVjdC5nZXRQcm90b3R5cGVPZihyKTtlPWUmJmUuc2V0VGltZW91dD9lOnIsaT1cIltvYmplY3QgcHJvY2Vzc11cIj09PXt9LnRvU3RyaW5nLmNhbGwoci5wcm9jZXNzKT9mdW5jdGlvbihlKXtwcm9jZXNzLm5leHRUaWNrKGZ1bmN0aW9uKCl7YyhlKX0pfTpmdW5jdGlvbigpe2lmKHIucG9zdE1lc3NhZ2UmJiFyLmltcG9ydFNjcmlwdHMpe3ZhciBlPSEwLHQ9ci5vbm1lc3NhZ2U7cmV0dXJuIHIub25tZXNzYWdlPWZ1bmN0aW9uKCl7ZT0hMX0sci5wb3N0TWVzc2FnZShcIlwiLFwiKlwiKSxyLm9ubWVzc2FnZT10LGV9fSgpPyhhPVwic2V0SW1tZWRpYXRlJFwiK01hdGgucmFuZG9tKCkrXCIkXCIsci5hZGRFdmVudExpc3RlbmVyP3IuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIixkLCExKTpyLmF0dGFjaEV2ZW50KFwib25tZXNzYWdlXCIsZCksZnVuY3Rpb24oZSl7ci5wb3N0TWVzc2FnZShhK2UsXCIqXCIpfSk6ci5NZXNzYWdlQ2hhbm5lbD8oKHQ9bmV3IE1lc3NhZ2VDaGFubmVsKS5wb3J0MS5vbm1lc3NhZ2U9ZnVuY3Rpb24oZSl7YyhlLmRhdGEpfSxmdW5jdGlvbihlKXt0LnBvcnQyLnBvc3RNZXNzYWdlKGUpfSk6bCYmXCJvbnJlYWR5c3RhdGVjaGFuZ2VcImluIGwuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKT8ocz1sLmRvY3VtZW50RWxlbWVudCxmdW5jdGlvbihlKXt2YXIgdD1sLmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7dC5vbnJlYWR5c3RhdGVjaGFuZ2U9ZnVuY3Rpb24oKXtjKGUpLHQub25yZWFkeXN0YXRlY2hhbmdlPW51bGwscy5yZW1vdmVDaGlsZCh0KSx0PW51bGx9LHMuYXBwZW5kQ2hpbGQodCl9KTpmdW5jdGlvbihlKXtzZXRUaW1lb3V0KGMsMCxlKX0sZS5zZXRJbW1lZGlhdGU9ZnVuY3Rpb24oZSl7XCJmdW5jdGlvblwiIT10eXBlb2YgZSYmKGU9bmV3IEZ1bmN0aW9uKFwiXCIrZSkpO2Zvcih2YXIgdD1uZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aC0xKSxyPTA7cjx0Lmxlbmd0aDtyKyspdFtyXT1hcmd1bWVudHNbcisxXTt2YXIgbj17Y2FsbGJhY2s6ZSxhcmdzOnR9O3JldHVybiBoW29dPW4saShvKSxvKyt9LGUuY2xlYXJJbW1lZGlhdGU9Zn1mdW5jdGlvbiBmKGUpe2RlbGV0ZSBoW2VdfWZ1bmN0aW9uIGMoZSl7aWYodSlzZXRUaW1lb3V0KGMsMCxlKTtlbHNle3ZhciB0PWhbZV07aWYodCl7dT0hMDt0cnl7IWZ1bmN0aW9uKGUpe3ZhciB0PWUuY2FsbGJhY2sscj1lLmFyZ3M7c3dpdGNoKHIubGVuZ3RoKXtjYXNlIDA6dCgpO2JyZWFrO2Nhc2UgMTp0KHJbMF0pO2JyZWFrO2Nhc2UgMjp0KHJbMF0sclsxXSk7YnJlYWs7Y2FzZSAzOnQoclswXSxyWzFdLHJbMl0pO2JyZWFrO2RlZmF1bHQ6dC5hcHBseShuLHIpfX0odCl9ZmluYWxseXtmKGUpLHU9ITF9fX19ZnVuY3Rpb24gZChlKXtlLnNvdXJjZT09PXImJlwic3RyaW5nXCI9PXR5cGVvZiBlLmRhdGEmJjA9PT1lLmRhdGEuaW5kZXhPZihhKSYmYygrZS5kYXRhLnNsaWNlKGEubGVuZ3RoKSl9fShcInVuZGVmaW5lZFwiPT10eXBlb2Ygc2VsZj92b2lkIDA9PT1lP3RoaXM6ZTpzZWxmKX0pLmNhbGwodGhpcyxcInVuZGVmaW5lZFwiIT10eXBlb2YgZ2xvYmFsP2dsb2JhbDpcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZj9zZWxmOlwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/d2luZG93Ont9KX0se31dfSx7fSxbMTBdKSgxMCl9KTsiLCAiaW1wb3J0IHsgQXBwLCBNb2RhbCwgTm90aWNlLCBQbHVnaW4sIFBsdWdpblNldHRpbmdUYWIsIFNldHRpbmcgfSBmcm9tIFwib2JzaWRpYW5cIjtcbmltcG9ydCB7IE92ZXJ3cml0ZURlY2lzaW9uLCBVcGRhdGVTZXJ2aWNlIH0gZnJvbSBcIi4vdXBkYXRlLXNlcnZpY2VcIjtcbmltcG9ydCB7IFBsdWdpbkRhdGEsIFJlbGVhc2VFbnRyeSwgUmVsZWFzZU1hbmlmZXN0LCBTVVBQT1JURURfTEFOR1VBR0VTLCBVcGRhdGVCYXRjaCB9IGZyb20gXCIuL3R5cGVzXCI7XG5pbXBvcnQgeyBtaWdyYXRlT3duZWRGaWxlcyB9IGZyb20gXCIuL293bmVyc2hpcFwiO1xuaW1wb3J0IHsgaW5pdGlhbGl6ZUJhc2VSZWxlYXNlIH0gZnJvbSBcIi4vYmFzZS1yZWxlYXNlXCI7XG5cbmNvbnN0IERFRkFVTFRfREFUQTogUGx1Z2luRGF0YSA9IHsgY2hlY2tGb3JVcGRhdGVzT25TdGFydHVwOiB0cnVlLCBzZXJpZXNJZDogXCJyZWFkaW5nXCIsIGVkaXRpb25JZDogXCJzdGFuZGFyZFwiLCBDb2xsZWN0aW9uOiBcIlYxXCIsIGluc3RhbGxlZDogeyBvd25lZEZpbGVzOiB7fSwgYXBwbGllZFJlbGVhc2VJZHM6IFtdIH0gfTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGJwZWRpYVVwZGF0ZVBsdWdpbiBleHRlbmRzIFBsdWdpbiB7XG4gIHByaXZhdGUgZGF0YTogUGx1Z2luRGF0YSA9IERFRkFVTFRfREFUQTtcbiAgcHJpdmF0ZSB1cGRhdGVyITogVXBkYXRlU2VydmljZTtcbiAgcHJpdmF0ZSBzZXR0aW5nc1RhYiE6IFRicGVkaWFVcGRhdGVTZXR0aW5nc1RhYjtcbiAgcHJpdmF0ZSBjaGVja2luZyA9IGZhbHNlO1xuICBwcml2YXRlIGluc3RhbGxpbmcgPSBmYWxzZTtcblxuICBhc3luYyBvbmxvYWQoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3Qgc2F2ZWQgPSBhd2FpdCB0aGlzLmxvYWREYXRhKCkgPz8ge307XG4gICAgdGhpcy5kYXRhID0geyAuLi5ERUZBVUxUX0RBVEEsIC4uLnNhdmVkLCBpbnN0YWxsZWQ6IHsgb3duZWRGaWxlczoge30sIGFwcGxpZWRSZWxlYXNlSWRzOiBbXSwgLi4uc2F2ZWQuaW5zdGFsbGVkIH0gfTtcbiAgICB0aGlzLmRhdGEuaW5zdGFsbGVkLm93bmVkRmlsZXMgPSBtaWdyYXRlT3duZWRGaWxlcyh0aGlzLmRhdGEuaW5zdGFsbGVkLm93bmVkRmlsZXMsIHRoaXMuZGF0YS5pbnN0YWxsZWQpO1xuICAgIHRoaXMuZGF0YS5iYXNlUmVsZWFzZSA9IGluaXRpYWxpemVCYXNlUmVsZWFzZSh0aGlzLmRhdGEpO1xuICAgIGF3YWl0IHRoaXMucGVyc2lzdERhdGEodGhpcy5kYXRhKTtcbiAgICB0aGlzLnVwZGF0ZXIgPSBuZXcgVXBkYXRlU2VydmljZSh0aGlzLmFwcCwgdGhpcy5tYW5pZmVzdC52ZXJzaW9uLCAoKSA9PiB0aGlzLmRhdGEsIChkYXRhKSA9PiB0aGlzLnBlcnNpc3REYXRhKGRhdGEpKTtcbiAgICB0aGlzLnNldHRpbmdzVGFiID0gbmV3IFRicGVkaWFVcGRhdGVTZXR0aW5nc1RhYih0aGlzLmFwcCwgdGhpcyk7XG4gICAgdGhpcy5hZGRTZXR0aW5nVGFiKHRoaXMuc2V0dGluZ3NUYWIpO1xuICAgIHRoaXMuYWRkUmliYm9uSWNvbihcImRvd25sb2FkXCIsIFwiQ2hlY2sgVGJwZWRpYSB1cGRhdGVzXCIsICgpID0+IHZvaWQgdGhpcy5jaGVja0ZvclVwZGF0ZSgpKTtcbiAgICB0aGlzLmFkZENvbW1hbmQoeyBpZDogXCJjaGVjay1mb3ItY29udGVudC11cGRhdGVcIiwgbmFtZTogXCJDaGVjayBmb3IgY29udGVudCB1cGRhdGVcIiwgY2FsbGJhY2s6ICgpID0+IHZvaWQgdGhpcy5jaGVja0ZvclVwZGF0ZSgpIH0pO1xuICAgIHRoaXMuYXBwLndvcmtzcGFjZS5vbkxheW91dFJlYWR5KCgpID0+IHtcbiAgICAgIGlmICh0aGlzLmRhdGEuY2hlY2tGb3JVcGRhdGVzT25TdGFydHVwICYmIHRoaXMuZGF0YS5sYW5ndWFnZUNvZGUpIHZvaWQgdGhpcy5jaGVja0ZvclVwZGF0ZSh0cnVlKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgY2hlY2tGb3JVcGRhdGUoc2lsZW50V2hlbkN1cnJlbnQgPSBmYWxzZSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmICh0aGlzLmNoZWNraW5nKSByZXR1cm47XG4gICAgdGhpcy5jaGVja2luZyA9IHRydWU7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGJhdGNoID0gYXdhaXQgdGhpcy51cGRhdGVyLmNoZWNrKCk7XG4gICAgICBpZiAoIWJhdGNoKSB7IGlmICghc2lsZW50V2hlbkN1cnJlbnQpIG5ldyBOb3RpY2UoXCJZb3VyIFRicGVkaWEgY29udGVudCBpcyB1cCB0byBkYXRlLlwiKTsgcmV0dXJuOyB9XG4gICAgICBjb25zdCBsYXRlc3QgPSBiYXRjaC5yZWxlYXNlcy5hdCgtMSkhO1xuICAgICAgY29uc3Qga2V5ID0gYCR7YmF0Y2gubWFuaWZlc3QuY29sbGVjdGlvbi5sYW5ndWFnZS5jb2RlfS8ke2JhdGNoLm1hbmlmZXN0LmNvbGxlY3Rpb24uc2VyaWVzLmlkfS8ke2JhdGNoLm1hbmlmZXN0LmNvbGxlY3Rpb24uZWRpdGlvbi5pZH0vJHtiYXRjaC5tYW5pZmVzdC5Db2xsZWN0aW9ufS8ke2xhdGVzdC5yZWxlYXNlSWR9YDtcbiAgICAgIGlmICh0aGlzLmRhdGEubm90aWZpZWRSZWxlYXNlSWRzPy5pbmNsdWRlcyhrZXkpKSByZXR1cm47XG4gICAgICBhd2FpdCB0aGlzLnBlcnNpc3REYXRhKHsgLi4udGhpcy5kYXRhLCBub3RpZmllZFJlbGVhc2VJZHM6IFsuLi4odGhpcy5kYXRhLm5vdGlmaWVkUmVsZWFzZUlkcyA/PyBbXSksIGtleV0gfSk7XG4gICAgICBuZXcgUmVsZWFzZU5vdGljZU1vZGFsKHRoaXMuYXBwLCBiYXRjaC5tYW5pZmVzdCwgbGF0ZXN0LCAoKSA9PiB0aGlzLm9wZW5SZWxlYXNlSW5mb3JtYXRpb24oKSkub3BlbigpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7IG5ldyBOb3RpY2UoYENvdWxkIG5vdCBjaGVjayBmb3IgVGJwZWRpYSB1cGRhdGVzOiAke21lc3NhZ2UoZXJyb3IpfWApOyB9XG4gICAgZmluYWxseSB7IHRoaXMuY2hlY2tpbmcgPSBmYWxzZTsgfVxuICB9XG5cbiAgcHJpdmF0ZSBvcGVuUmVsZWFzZUluZm9ybWF0aW9uKCk6IHZvaWQge1xuICAgIGNvbnN0IHNldHRpbmdzID0gKHRoaXMuYXBwIGFzIEFwcCAmIHsgc2V0dGluZz86IHsgb3BlbigpOiB2b2lkOyBvcGVuVGFiQnlJZChpZDogc3RyaW5nKTogdm9pZCB9IH0pLnNldHRpbmc7XG4gICAgdGhpcy5zZXR0aW5nc1RhYi5zZWxlY3RSZWxlYXNlcygpO1xuICAgIGlmIChzZXR0aW5ncykgeyBzZXR0aW5ncy5vcGVuKCk7IHNldHRpbmdzLm9wZW5UYWJCeUlkKHRoaXMubWFuaWZlc3QuaWQpOyB9XG4gICAgZWxzZSBuZXcgTm90aWNlKFwiT3BlbiBTZXR0aW5ncyBcdTIxOTIgVGJwZWRpYSBVcGRhdGUgXHUyMTkyIFJlbGVhc2UgaW5mb3JtYXRpb24gdG8gc2VsZWN0IHJlbGVhc2VzLlwiKTtcbiAgfVxuXG4gIGdldFNlbGVjdGVkQmF0Y2gobWFuaWZlc3Q6IFJlbGVhc2VNYW5pZmVzdCwgc2VsZWN0ZWRJZHM6IFNldDxzdHJpbmc+KTogVXBkYXRlQmF0Y2ggeyByZXR1cm4gdGhpcy51cGRhdGVyLmdldFNlbGVjdGVkQmF0Y2gobWFuaWZlc3QsIHNlbGVjdGVkSWRzKTsgfVxuXG4gIGFzeW5jIGluc3RhbGxTZWxlY3RlZChiYXRjaDogVXBkYXRlQmF0Y2gsIHByb2dyZXNzOiAobWVzc2FnZTogc3RyaW5nKSA9PiB2b2lkKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKHRoaXMuaW5zdGFsbGluZykgdGhyb3cgbmV3IEVycm9yKFwiQSBUYnBlZGlhIHVwZGF0ZSBpcyBhbHJlYWR5IGluIHByb2dyZXNzLlwiKTtcbiAgICB0aGlzLmluc3RhbGxpbmcgPSB0cnVlO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBjdXJyZW50ID0gYXdhaXQgdGhpcy51cGRhdGVyLmdldFJlbGVhc2VNYW5pZmVzdCgpO1xuICAgICAgaWYgKEpTT04uc3RyaW5naWZ5KGN1cnJlbnQpICE9PSBKU09OLnN0cmluZ2lmeShiYXRjaC5tYW5pZmVzdCkpIHRocm93IG5ldyBFcnJvcihcIlJlbGVhc2UgaW5mb3JtYXRpb24gaGFzIGNoYW5nZWQuIFJlZnJlc2ggYW5kIHNlbGVjdCByZWxlYXNlcyBhZ2Fpbi5cIik7XG4gICAgICBjb25zdCBzZWxlY3RlZCA9IHRoaXMudXBkYXRlci5nZXRTZWxlY3RlZEJhdGNoKGN1cnJlbnQsIG5ldyBTZXQoYmF0Y2gucmVsZWFzZXMubWFwKChyZWxlYXNlKSA9PiByZWxlYXNlLnJlbGVhc2VJZCkpKTtcbiAgICAgIGF3YWl0IHRoaXMudXBkYXRlci5pbnN0YWxsKHNlbGVjdGVkLCBwcm9ncmVzcyxcbiAgICAgICAgKHBhdGgpID0+IG5ldyBQcm9taXNlPE92ZXJ3cml0ZURlY2lzaW9uPigocmVzb2x2ZSkgPT4gbmV3IE92ZXJ3cml0ZU1vZGFsKHRoaXMuYXBwLCBwYXRoLCByZXNvbHZlKS5vcGVuKCkpKTtcbiAgICAgIHRoaXMuc2V0dGluZ3NUYWIuZGlzcGxheSgpO1xuICAgIH0gZmluYWxseSB7IHRoaXMuaW5zdGFsbGluZyA9IGZhbHNlOyB9XG4gIH1cblxuICBhc3luYyBzZXRJbnRlcmZhY2VMYW5ndWFnZShpbnRlcmZhY2VMYW5ndWFnZTogUGx1Z2luRGF0YVtcImludGVyZmFjZUxhbmd1YWdlXCJdKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgdGhpcy5wZXJzaXN0RGF0YSh7IC4uLnRoaXMuZGF0YSwgaW50ZXJmYWNlTGFuZ3VhZ2UgfSk7XG4gIH1cblxuICBhc3luYyBzZXRDaGVja0ZvclVwZGF0ZXNPblN0YXJ0dXAoY2hlY2tGb3JVcGRhdGVzT25TdGFydHVwOiBib29sZWFuKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgdGhpcy5wZXJzaXN0RGF0YSh7IC4uLnRoaXMuZGF0YSwgY2hlY2tGb3JVcGRhdGVzT25TdGFydHVwIH0pO1xuICB9XG5cbiAgZ2V0UmVsZWFzZU1hbmlmZXN0KCk6IFByb21pc2U8UmVsZWFzZU1hbmlmZXN0PiB7IHJldHVybiB0aGlzLnVwZGF0ZXIuZ2V0UmVsZWFzZU1hbmlmZXN0KCk7IH1cbiAgaXNSZWxlYXNlSW5zdGFsbGVkKHJlbGVhc2U6IFJlbGVhc2VFbnRyeSwgbWFuaWZlc3Q6IFJlbGVhc2VNYW5pZmVzdCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy51cGRhdGVyLmlzUmVsZWFzZUluc3RhbGxlZChyZWxlYXNlLCBtYW5pZmVzdCk7IH1cblxuICBwcml2YXRlIGFzeW5jIHBlcnNpc3REYXRhKGRhdGE6IFBsdWdpbkRhdGEpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCB7IGxhbmd1YWdlQ29kZSwgc2VyaWVzSWQsIGVkaXRpb25JZCwgQ29sbGVjdGlvbiwgYmFzZVJlbGVhc2UsIC4uLnJlc3QgfSA9IGRhdGE7XG4gICAgdGhpcy5kYXRhID0geyBsYW5ndWFnZUNvZGUsIHNlcmllc0lkLCBlZGl0aW9uSWQsIENvbGxlY3Rpb24sIGJhc2VSZWxlYXNlLCAuLi5yZXN0IH07XG4gICAgYXdhaXQgdGhpcy5zYXZlRGF0YSh0aGlzLmRhdGEpO1xuICB9XG5cbiAgZ2V0IGludGVyZmFjZUxhbmd1YWdlKCk6IFBsdWdpbkRhdGFbXCJpbnRlcmZhY2VMYW5ndWFnZVwiXSB7IHJldHVybiB0aGlzLmRhdGEuaW50ZXJmYWNlTGFuZ3VhZ2UgPz8gdGhpcy5kYXRhLmxhbmd1YWdlQ29kZTsgfVxuICBnZXQgY2hlY2tGb3JVcGRhdGVzT25TdGFydHVwKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5kYXRhLmNoZWNrRm9yVXBkYXRlc09uU3RhcnR1cDsgfVxuICBnZXQgYmFzZVJlbGVhc2UoKTogTm9uTnVsbGFibGU8UGx1Z2luRGF0YVtcImJhc2VSZWxlYXNlXCJdPiB7IHJldHVybiB0aGlzLmRhdGEuYmFzZVJlbGVhc2UgPz8ge307IH1cbn1cblxuY2xhc3MgVGJwZWRpYVVwZGF0ZVNldHRpbmdzVGFiIGV4dGVuZHMgUGx1Z2luU2V0dGluZ1RhYiB7XG4gIHByaXZhdGUgYWN0aXZlVGFiOiBcInNldHRpbmdzXCIgfCBcInJlbGVhc2VzXCIgPSBcInNldHRpbmdzXCI7XG4gIHByaXZhdGUgcmVuZGVySWQgPSAwO1xuICBjb25zdHJ1Y3RvcihhcHA6IEFwcCwgcHJpdmF0ZSByZWFkb25seSBwbHVnaW46IFRicGVkaWFVcGRhdGVQbHVnaW4pIHsgc3VwZXIoYXBwLCBwbHVnaW4pOyB9XG4gIHNlbGVjdFJlbGVhc2VzKCk6IHZvaWQgeyB0aGlzLmFjdGl2ZVRhYiA9IFwicmVsZWFzZXNcIjsgfVxuICBkaXNwbGF5KCk6IHZvaWQge1xuICAgIGNvbnN0IHsgY29udGFpbmVyRWwgfSA9IHRoaXM7XG4gICAgY29udGFpbmVyRWwuZW1wdHkoKTtcbiAgICBjb25zdCByZW5kZXJJZCA9ICsrdGhpcy5yZW5kZXJJZDtcbiAgICBjb250YWluZXJFbC5jcmVhdGVFbChcImgyXCIsIHsgdGV4dDogXCJUYnBlZGlhIFVwZGF0ZVwiIH0pO1xuICAgIGNvbnN0IHRhYnMgPSBjb250YWluZXJFbC5jcmVhdGVEaXYoKTtcbiAgICB0YWJzLnNldEF0dHJpYnV0ZShcInJvbGVcIiwgXCJ0YWJsaXN0XCIpO1xuICAgIHRhYnMuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuICAgIHRhYnMuc3R5bGUuZ2FwID0gXCI4cHhcIjtcbiAgICB0YWJzLnN0eWxlLm1hcmdpbkJvdHRvbSA9IFwiMTZweFwiO1xuICAgIGZvciAoY29uc3QgW2lkLCBsYWJlbF0gb2YgW1tcInNldHRpbmdzXCIsIFwiU2V0dGluZ3NcIl0sIFtcInJlbGVhc2VzXCIsIFwiUmVsZWFzZSBpbmZvcm1hdGlvblwiXV0gYXMgY29uc3QpIHtcbiAgICAgIGNvbnN0IGJ1dHRvbiA9IHRhYnMuY3JlYXRlRWwoXCJidXR0b25cIiwgeyB0ZXh0OiBsYWJlbCB9KTtcbiAgICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJyb2xlXCIsIFwidGFiXCIpO1xuICAgICAgYnV0dG9uLnNldEF0dHJpYnV0ZShcImFyaWEtc2VsZWN0ZWRcIiwgU3RyaW5nKHRoaXMuYWN0aXZlVGFiID09PSBpZCkpO1xuICAgICAgYnV0dG9uLmlkID0gYHRicGVkaWEtdGFiLSR7aWR9YDtcbiAgICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJhcmlhLWNvbnRyb2xzXCIsIFwidGJwZWRpYS1zZXR0aW5ncy1wYW5lbFwiKTtcbiAgICAgIGlmICh0aGlzLmFjdGl2ZVRhYiA9PT0gaWQpIGJ1dHRvbi5hZGRDbGFzcyhcIm1vZC1jdGFcIik7XG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHsgdGhpcy5hY3RpdmVUYWIgPSBpZDsgdGhpcy5kaXNwbGF5KCk7IH0pO1xuICAgIH1cbiAgICBjb25zdCBwYW5lbCA9IGNvbnRhaW5lckVsLmNyZWF0ZURpdigpO1xuICAgIHBhbmVsLmlkID0gXCJ0YnBlZGlhLXNldHRpbmdzLXBhbmVsXCI7XG4gICAgcGFuZWwuc2V0QXR0cmlidXRlKFwicm9sZVwiLCBcInRhYnBhbmVsXCIpO1xuICAgIHBhbmVsLnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxsZWRieVwiLCBgdGJwZWRpYS10YWItJHt0aGlzLmFjdGl2ZVRhYn1gKTtcbiAgICBpZiAodGhpcy5hY3RpdmVUYWIgPT09IFwicmVsZWFzZXNcIikge1xuICAgICAgdm9pZCB0aGlzLmRpc3BsYXlSZWxlYXNlcyhwYW5lbCwgcmVuZGVySWQpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBuZXcgU2V0dGluZyhwYW5lbClcbiAgICAgIC5zZXROYW1lKFwiSW50ZXJmYWNlIGxhbmd1YWdlXCIpXG4gICAgICAuc2V0RGVzYyhcIlNlbGVjdCB5b3VyIHByZWZlcnJlZCBpbnRlcmZhY2UgbGFuZ3VhZ2UuIENvbnRlbnQgdXBkYXRlcyB1c2UgdGhlIGNvbGxlY3Rpb24gbGFuZ3VhZ2UgY29uZmlndXJlZCBpbiBkYXRhLmpzb24uXCIpXG4gICAgICAuYWRkRHJvcGRvd24oKGRyb3Bkb3duKSA9PiB7XG4gICAgICAgIGRyb3Bkb3duLmFkZE9wdGlvbihcIlwiLCBcIkNob29zZSBsYW5ndWFnZVx1MjAyNlwiKTtcbiAgICAgICAgZm9yIChjb25zdCBjb2RlIG9mIFNVUFBPUlRFRF9MQU5HVUFHRVMpIGRyb3Bkb3duLmFkZE9wdGlvbihjb2RlLCBjb2RlKTtcbiAgICAgICAgZHJvcGRvd24uc2V0VmFsdWUodGhpcy5wbHVnaW4uaW50ZXJmYWNlTGFuZ3VhZ2UgPz8gXCJcIik7XG4gICAgICAgIGRyb3Bkb3duLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4geyBhd2FpdCB0aGlzLnBsdWdpbi5zZXRJbnRlcmZhY2VMYW5ndWFnZSh2YWx1ZSA/IHZhbHVlIGFzIFBsdWdpbkRhdGFbXCJpbnRlcmZhY2VMYW5ndWFnZVwiXSA6IHVuZGVmaW5lZCk7IH0pO1xuICAgICAgfSk7XG4gICAgbmV3IFNldHRpbmcocGFuZWwpXG4gICAgICAuc2V0TmFtZShcIkNoZWNrIGZvciBjb250ZW50IHVwZGF0ZXMgb24gc3RhcnR1cFwiKVxuICAgICAgLnNldERlc2MoXCJDaGVjayBmb3IgVGJwZWRpYSBjb250ZW50IHVwZGF0ZXMgd2hlbiBPYnNpZGlhbiBzdGFydHMuIEVuYWJsZWQgYnkgZGVmYXVsdC5cIilcbiAgICAgIC5hZGRUb2dnbGUoKHRvZ2dsZSkgPT4ge1xuICAgICAgICB0b2dnbGUuc2V0VmFsdWUodGhpcy5wbHVnaW4uY2hlY2tGb3JVcGRhdGVzT25TdGFydHVwKTtcbiAgICAgICAgdG9nZ2xlLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4geyBhd2FpdCB0aGlzLnBsdWdpbi5zZXRDaGVja0ZvclVwZGF0ZXNPblN0YXJ0dXAodmFsdWUpOyB9KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgaGlkZSgpOiB2b2lkIHsgdGhpcy5yZW5kZXJJZCsrOyB9XG5cbiAgcHJpdmF0ZSBhc3luYyBkaXNwbGF5UmVsZWFzZXMocGFuZWw6IEhUTUxFbGVtZW50LCByZW5kZXJJZDogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgbmV3IFNldHRpbmcocGFuZWwpXG4gICAgICAuc2V0TmFtZShcIlJlbGVhc2UgaW5mb3JtYXRpb25cIilcbiAgICAgIC5zZXREZXNjKFwiUmVsZWFzZXMgZm9yIHRoaXMgdmF1bHRcdTIwMTlzIGNvbmZpZ3VyZWQgY29sbGVjdGlvbi4gRG93bmxvYWRlZCBzdGF0dXMgaW5kaWNhdGVzIGEgY29tcGxldGVkIGluc3RhbGxhdGlvbiByZWNvcmRlZCBieSB0aGUgcGx1Z2luLlwiKVxuICAgICAgLmFkZEJ1dHRvbigoYnV0dG9uKSA9PiBidXR0b24uc2V0QnV0dG9uVGV4dChcIlJlZnJlc2hcIikub25DbGljaygoKSA9PiB0aGlzLmRpc3BsYXkoKSkpO1xuICAgIGNvbnN0IGNvbnRlbnQgPSBwYW5lbC5jcmVhdGVEaXYoKTtcbiAgICBjb250ZW50LnNldEF0dHJpYnV0ZShcImFyaWEtbGl2ZVwiLCBcInBvbGl0ZVwiKTtcbiAgICBjb250ZW50LmNyZWF0ZUVsKFwicFwiLCB7IHRleHQ6IFwiTG9hZGluZyByZWxlYXNlIGluZm9ybWF0aW9uXHUyMDI2XCIgfSk7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IG1hbmlmZXN0ID0gYXdhaXQgdGhpcy5wbHVnaW4uZ2V0UmVsZWFzZU1hbmlmZXN0KCk7XG4gICAgICBpZiAocmVuZGVySWQgIT09IHRoaXMucmVuZGVySWQpIHJldHVybjtcbiAgICAgIGNvbnRlbnQuZW1wdHkoKTtcbiAgICAgIGNvbnRlbnQuY3JlYXRlRWwoXCJoM1wiLCB7IHRleHQ6IG1hbmlmZXN0LnRpdGxlIH0pO1xuICAgICAgY29uc3QgbWV0YWRhdGEgPSBjb250ZW50LmNyZWF0ZUVsKFwiZGxcIik7XG4gICAgICBtZXRhZGF0YS5zdHlsZS5kaXNwbGF5ID0gXCJncmlkXCI7XG4gICAgICBtZXRhZGF0YS5zdHlsZS5ncmlkVGVtcGxhdGVDb2x1bW5zID0gXCJtYXgtY29udGVudCAxZnJcIjtcbiAgICAgIG1ldGFkYXRhLnN0eWxlLmNvbHVtbkdhcCA9IFwiMTZweFwiO1xuICAgICAgZm9yIChjb25zdCBbbGFiZWwsIHZhbHVlXSBvZiBbXG4gICAgICAgIFtcIkxhbmd1YWdlIENvZGVcIiwgbWFuaWZlc3QuY29sbGVjdGlvbi5sYW5ndWFnZS5jb2RlXSxcbiAgICAgICAgW1wiU2VyaWVzXCIsIG1hbmlmZXN0LmNvbGxlY3Rpb24uc2VyaWVzLmlkXSxcbiAgICAgICAgW1wiRWRpdGlvblwiLCBtYW5pZmVzdC5jb2xsZWN0aW9uLmVkaXRpb24uaWRdLFxuICAgICAgICBbXCJDb2xsZWN0aW9uXCIsIG1hbmlmZXN0LkNvbGxlY3Rpb25dLFxuICAgICAgICBbXCJCYXNlIFJlbGVhc2VcIiwgdGhpcy5wbHVnaW4uYmFzZVJlbGVhc2UucmVsZWFzZVZlcnNpb24gPz8gdGhpcy5wbHVnaW4uYmFzZVJlbGVhc2UucmVsZWFzZUlkID8/IFwiTm90IGNvbmZpZ3VyZWRcIl0sXG4gICAgICAgIFtcIkJhc2UgUmVsZWFzZSBJRFwiLCB0aGlzLnBsdWdpbi5iYXNlUmVsZWFzZS5yZWxlYXNlSWQgPz8gXCJOb3QgY29uZmlndXJlZFwiXSxcbiAgICAgIF0pIHtcbiAgICAgICAgbWV0YWRhdGEuY3JlYXRlRWwoXCJkdFwiLCB7IHRleHQ6IGxhYmVsIH0pO1xuICAgICAgICBjb25zdCBkZXRhaWwgPSBtZXRhZGF0YS5jcmVhdGVFbChcImRkXCIsIHsgdGV4dDogdmFsdWUgfSk7XG4gICAgICAgIGRldGFpbC5zdHlsZS5tYXJnaW4gPSBcIjBcIjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHdyYXBwZXIgPSBjb250ZW50LmNyZWF0ZURpdigpO1xuICAgICAgd3JhcHBlci5zdHlsZS5vdmVyZmxvd1ggPSBcImF1dG9cIjtcbiAgICAgIGNvbnN0IHRhYmxlID0gd3JhcHBlci5jcmVhdGVFbChcInRhYmxlXCIpO1xuICAgICAgdGFibGUuc3R5bGUud2lkdGggPSBcIjEwMCVcIjtcbiAgICAgIHRhYmxlLnN0eWxlLmJvcmRlckNvbGxhcHNlID0gXCJjb2xsYXBzZVwiO1xuICAgICAgdGFibGUuY3JlYXRlRWwoXCJjYXB0aW9uXCIsIHsgdGV4dDogXCJBdmFpbGFibGUgcmVsZWFzZXMgKG5ld2VzdCBmaXJzdClcIiB9KTtcbiAgICAgIGNvbnN0IGhlYWRlciA9IHRhYmxlLmNyZWF0ZUVsKFwidGhlYWRcIikuY3JlYXRlRWwoXCJ0clwiKTtcbiAgICAgIGZvciAoY29uc3QgbGFiZWwgb2YgW1wiU2VsZWN0XCIsIFwiUmVsZWFzZVZlcnNpb25cIiwgXCJQdWJsaXNoZWQgZGF0ZVwiLCBcIlJlbGVhc2VOb3RlOiBTdW1tYXJ5XCIsIFwiQWRkZWRcIiwgXCJVcGRhdGVkXCIsIFwiUmVtb3ZlZFwiLCBcIkRlcGVuZGVuY2llc1wiLCBcIkRvd25sb2FkZWRcIl0pIHtcbiAgICAgICAgY29uc3QgY2VsbCA9IGhlYWRlci5jcmVhdGVFbChcInRoXCIsIHsgdGV4dDogbGFiZWwgfSk7XG4gICAgICAgIGNlbGwuc2V0QXR0cmlidXRlKFwic2NvcGVcIiwgXCJjb2xcIik7XG4gICAgICB9XG4gICAgICBjb25zdCBib2R5ID0gdGFibGUuY3JlYXRlRWwoXCJ0Ym9keVwiKTtcbiAgICAgIGNvbnN0IHNlbGVjdGVkSWRzID0gbmV3IFNldDxzdHJpbmc+KCk7XG4gICAgICBjb25zdCBjaGVja2JveGVzID0gbmV3IE1hcDxzdHJpbmcsIEhUTUxJbnB1dEVsZW1lbnQ+KCk7XG4gICAgICBjb25zdCBzZWxlY3Rpb25TdGF0dXMgPSBjb250ZW50LmNyZWF0ZUVsKFwicFwiLCB7IHRleHQ6IFwiU2VsZWN0IHJlbGVhc2VzIHRvIGRvd25sb2FkLiBSZXF1aXJlZCBkZXBlbmRlbmNpZXMgYXJlIGluY2x1ZGVkIGF1dG9tYXRpY2FsbHk7IGluZGVwZW5kZW50IHJlbGVhc2VzIGNhbiBiZSBzZWxlY3RlZCBvbiB0aGVpciBvd24uXCIgfSk7XG4gICAgICBjb25zdCBkb3dubG9hZCA9IGNvbnRlbnQuY3JlYXRlRWwoXCJidXR0b25cIiwgeyB0ZXh0OiBcIkRvd25sb2FkIHNlbGVjdGVkIHJlbGVhc2VzXCIgfSk7XG4gICAgICBkb3dubG9hZC5hZGRDbGFzcyhcIm1vZC1jdGFcIik7XG4gICAgICBkb3dubG9hZC5kaXNhYmxlZCA9IHRydWU7XG4gICAgICBjb25zdCB1cGRhdGVTZWxlY3Rpb24gPSAoKTogdm9pZCA9PiB7XG4gICAgICAgIGRvd25sb2FkLmRpc2FibGVkID0gc2VsZWN0ZWRJZHMuc2l6ZSA9PT0gMDtcbiAgICAgICAgaWYgKCFzZWxlY3RlZElkcy5zaXplKSB7IHNlbGVjdGlvblN0YXR1cy5zZXRUZXh0KFwiU2VsZWN0IHJlbGVhc2VzIHRvIGRvd25sb2FkLiBSZXF1aXJlZCBkZXBlbmRlbmNpZXMgYXJlIGluY2x1ZGVkIGF1dG9tYXRpY2FsbHk7IGluZGVwZW5kZW50IHJlbGVhc2VzIGNhbiBiZSBzZWxlY3RlZCBvbiB0aGVpciBvd24uXCIpOyByZXR1cm47IH1cbiAgICAgICAgY29uc3QgYmF0Y2ggPSB0aGlzLnBsdWdpbi5nZXRTZWxlY3RlZEJhdGNoKG1hbmlmZXN0LCBzZWxlY3RlZElkcyk7XG4gICAgICAgIGNvbnN0IGluY2x1ZGVkID0gbmV3IFNldChiYXRjaC5yZWxlYXNlcy5tYXAoKHJlbGVhc2UpID0+IHJlbGVhc2UucmVsZWFzZUlkKSk7XG4gICAgICAgIGZvciAoY29uc3QgW2lkLCBjaGVja2JveF0gb2YgY2hlY2tib3hlcykgY2hlY2tib3guY2hlY2tlZCA9IGluY2x1ZGVkLmhhcyhpZCk7XG4gICAgICAgIHNlbGVjdGlvblN0YXR1cy5zZXRUZXh0KGAke2JhdGNoLnJlbGVhc2VzLmxlbmd0aH0gcmVsZWFzZShzKSB3aWxsIGJlIGRvd25sb2FkZWQgYW5kIGluc3RhbGxlZCBpbiBvcmRlciwgaW5jbHVkaW5nIHJlcXVpcmVkIGRlcGVuZGVuY2llcy5gKTtcbiAgICAgIH07XG4gICAgICBkb3dubG9hZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBpZiAoIXNlbGVjdGVkSWRzLnNpemUpIHJldHVybjtcbiAgICAgICAgY29uc3QgYmF0Y2ggPSB0aGlzLnBsdWdpbi5nZXRTZWxlY3RlZEJhdGNoKG1hbmlmZXN0LCBzZWxlY3RlZElkcyk7XG4gICAgICAgIG5ldyBVcGRhdGVNb2RhbCh0aGlzLmFwcCwgYmF0Y2gsIChwcm9ncmVzcykgPT4gdGhpcy5wbHVnaW4uaW5zdGFsbFNlbGVjdGVkKGJhdGNoLCBwcm9ncmVzcykpLm9wZW4oKTtcbiAgICAgIH0pO1xuICAgICAgZm9yIChjb25zdCByZWxlYXNlIG9mIFsuLi5tYW5pZmVzdC5yZWxlYXNlc10ucmV2ZXJzZSgpKSB7XG4gICAgICAgIGNvbnN0IHJvdyA9IGJvZHkuY3JlYXRlRWwoXCJ0clwiKTtcbiAgICAgICAgY29uc3QgaW5zdGFsbGVkID0gdGhpcy5wbHVnaW4uaXNSZWxlYXNlSW5zdGFsbGVkKHJlbGVhc2UsIG1hbmlmZXN0KTtcbiAgICAgICAgY29uc3QgY2hlY2tib3ggPSByb3cuY3JlYXRlRWwoXCJ0ZFwiKS5jcmVhdGVFbChcImlucHV0XCIsIHsgdHlwZTogXCJjaGVja2JveFwiIH0pO1xuICAgICAgICBjaGVja2JveC5kaXNhYmxlZCA9IGluc3RhbGxlZDtcbiAgICAgICAgY2hlY2tib3guc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCBgU2VsZWN0ICR7cmVsZWFzZS5yZWxlYXNlVmVyc2lvbn1gKTtcbiAgICAgICAgaWYgKCFpbnN0YWxsZWQpIGNoZWNrYm94ZXMuc2V0KHJlbGVhc2UucmVsZWFzZUlkLCBjaGVja2JveCk7XG4gICAgICAgIGNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKCkgPT4ge1xuICAgICAgICAgIGlmIChjaGVja2JveC5jaGVja2VkKSBzZWxlY3RlZElkcy5hZGQocmVsZWFzZS5yZWxlYXNlSWQpO1xuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZm9yIChjb25zdCBpZCBvZiBbLi4uc2VsZWN0ZWRJZHNdKSB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLnBsdWdpbi5nZXRTZWxlY3RlZEJhdGNoKG1hbmlmZXN0LCBuZXcgU2V0KFtpZF0pKS5yZWxlYXNlcy5zb21lKChlbnRyeSkgPT4gZW50cnkucmVsZWFzZUlkID09PSByZWxlYXNlLnJlbGVhc2VJZCkpIHNlbGVjdGVkSWRzLmRlbGV0ZShpZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBjaGVja2JveGVzLnZhbHVlcygpKSBpdGVtLmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICB1cGRhdGVTZWxlY3Rpb24oKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShyZWxlYXNlLnB1Ymxpc2hlZEF0KTtcbiAgICAgICAgY29uc3QgdmFsdWVzID0gW3JlbGVhc2UucmVsZWFzZVZlcnNpb24sIGRhdGUudG9Mb2NhbGVEYXRlU3RyaW5nKHVuZGVmaW5lZCwgeyB5ZWFyOiBcIm51bWVyaWNcIiwgbW9udGg6IFwic2hvcnRcIiwgZGF5OiBcIm51bWVyaWNcIiB9KSxcbiAgICAgICAgICByZWxlYXNlLnJlbGVhc2VOb3Rlcy5zdW1tYXJ5LCBTdHJpbmcocmVsZWFzZS5yZWxlYXNlTm90ZXMuYWRkZWQpLCBTdHJpbmcocmVsZWFzZS5yZWxlYXNlTm90ZXMudXBkYXRlZCksIFN0cmluZyhyZWxlYXNlLnJlbGVhc2VOb3Rlcy5yZW1vdmVkKSxcbiAgICAgICAgICByZWxlYXNlLmRlcGVuZHNPbiA9PT0gdW5kZWZpbmVkID8gXCJBbGwgZWFybGllciByZWxlYXNlc1wiIDogcmVsZWFzZS5kZXBlbmRzT24ubGVuZ3RoID8gcmVsZWFzZS5kZXBlbmRzT24uam9pbihcIiwgXCIpIDogXCJOb25lIChpbmRlcGVuZGVudClcIixcbiAgICAgICAgICBpbnN0YWxsZWQgPyBcIlllcyAoaW5zdGFsbGVkKVwiIDogXCJOb1wiXTtcbiAgICAgICAgZm9yIChjb25zdCBbaW5kZXgsIHZhbHVlXSBvZiB2YWx1ZXMuZW50cmllcygpKSB7XG4gICAgICAgICAgY29uc3QgY2VsbCA9IHJvdy5jcmVhdGVFbChcInRkXCIsIHsgdGV4dDogdmFsdWUgfSk7XG4gICAgICAgICAgaWYgKGluZGV4ID09PSAxKSBjZWxsLnRpdGxlID0gcmVsZWFzZS5wdWJsaXNoZWRBdDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZm9yIChjb25zdCBjZWxsIG9mIEFycmF5LmZyb20odGFibGUucXVlcnlTZWxlY3RvckFsbChcInRoLCB0ZFwiKSkpIHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IGNlbGwgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUucGFkZGluZyA9IFwiOHB4XCI7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUudGV4dEFsaWduID0gXCJsZWZ0XCI7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUudmVydGljYWxBbGlnbiA9IFwidG9wXCI7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUuYm9yZGVyQm90dG9tID0gXCIxcHggc29saWQgdmFyKC0tYmFja2dyb3VuZC1tb2RpZmllci1ib3JkZXIpXCI7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGlmIChyZW5kZXJJZCAhPT0gdGhpcy5yZW5kZXJJZCkgcmV0dXJuO1xuICAgICAgY29udGVudC5lbXB0eSgpO1xuICAgICAgY29udGVudC5jcmVhdGVFbChcInBcIiwgeyB0ZXh0OiBgQ291bGQgbm90IGxvYWQgcmVsZWFzZSBpbmZvcm1hdGlvbjogJHttZXNzYWdlKGVycm9yKX1gIH0pO1xuICAgIH1cbiAgfVxufVxuXG5jbGFzcyBSZWxlYXNlTm90aWNlTW9kYWwgZXh0ZW5kcyBNb2RhbCB7XG4gIGNvbnN0cnVjdG9yKGFwcDogQXBwLCBwcml2YXRlIHJlYWRvbmx5IG1hbmlmZXN0OiBSZWxlYXNlTWFuaWZlc3QsIHByaXZhdGUgcmVhZG9ubHkgcmVsZWFzZTogUmVsZWFzZUVudHJ5LCBwcml2YXRlIHJlYWRvbmx5IGdvVG9Eb3dubG9hZDogKCkgPT4gdm9pZCkgeyBzdXBlcihhcHApOyB9XG4gIG9uT3BlbigpOiB2b2lkIHtcbiAgICBjb25zdCB7IGNvbnRlbnRFbCB9ID0gdGhpcztcbiAgICBjb250ZW50RWwuY3JlYXRlRWwoXCJoMlwiLCB7IHRleHQ6IFwiTmV3IFRicGVkaWEgcmVsZWFzZSBhdmFpbGFibGVcIiB9KTtcbiAgICBjb250ZW50RWwuY3JlYXRlRWwoXCJoM1wiLCB7IHRleHQ6IHRoaXMubWFuaWZlc3QudGl0bGUgfSk7XG4gICAgY29udGVudEVsLmNyZWF0ZUVsKFwicFwiLCB7IHRleHQ6IHRoaXMucmVsZWFzZS5yZWxlYXNlVmVyc2lvbiB9KTtcbiAgICBjb250ZW50RWwuY3JlYXRlRWwoXCJwXCIsIHsgdGV4dDogYFB1Ymxpc2hlZDogJHtuZXcgRGF0ZSh0aGlzLnJlbGVhc2UucHVibGlzaGVkQXQpLnRvTG9jYWxlU3RyaW5nKCl9YCB9KTtcbiAgICBjb250ZW50RWwuY3JlYXRlRWwoXCJwXCIsIHsgdGV4dDogdGhpcy5yZWxlYXNlLnJlbGVhc2VOb3Rlcy5zdW1tYXJ5IH0pO1xuICAgIGNvbnRlbnRFbC5jcmVhdGVFbChcInBcIiwgeyB0ZXh0OiBgQWRkZWQ6ICR7dGhpcy5yZWxlYXNlLnJlbGVhc2VOb3Rlcy5hZGRlZH0gXHUwMEI3IFVwZGF0ZWQ6ICR7dGhpcy5yZWxlYXNlLnJlbGVhc2VOb3Rlcy51cGRhdGVkfSBcdTAwQjcgUmVtb3ZlZDogJHt0aGlzLnJlbGVhc2UucmVsZWFzZU5vdGVzLnJlbW92ZWR9YCB9KTtcbiAgICBjb250ZW50RWwuY3JlYXRlRWwoXCJwXCIsIHsgdGV4dDogXCJHbyB0byBTZXR0aW5ncyBcdTIxOTIgUmVsZWFzZSBpbmZvcm1hdGlvbiB0byBzZWxlY3QgcmVsZWFzZXMgZm9yIGRvd25sb2FkLiBUaGlzIGFubm91bmNlbWVudCB3aWxsIGFwcGVhciBhZ2FpbiB3aGVuIGEgbmV3IHJlbGVhc2UgaXMgYXZhaWxhYmxlLlwiIH0pO1xuICAgIG5ldyBTZXR0aW5nKGNvbnRlbnRFbClcbiAgICAgIC5hZGRCdXR0b24oKGJ1dHRvbikgPT4gYnV0dG9uLnNldEJ1dHRvblRleHQoXCJBY2tub3dsZWRnZVwiKS5vbkNsaWNrKCgpID0+IHRoaXMuY2xvc2UoKSkpXG4gICAgICAuYWRkQnV0dG9uKChidXR0b24pID0+IGJ1dHRvbi5zZXRCdXR0b25UZXh0KFwiR28gdG8gZG93bmxvYWRcIikuc2V0Q3RhKCkub25DbGljaygoKSA9PiB7IHRoaXMuY2xvc2UoKTsgdGhpcy5nb1RvRG93bmxvYWQoKTsgfSkpO1xuICB9XG4gIG9uQ2xvc2UoKTogdm9pZCB7IHRoaXMuY29udGVudEVsLmVtcHR5KCk7IH1cbn1cblxuY2xhc3MgT3ZlcndyaXRlTW9kYWwgZXh0ZW5kcyBNb2RhbCB7XG4gIHByaXZhdGUgZGVjaXNpb246IE92ZXJ3cml0ZURlY2lzaW9uID0gXCJjYW5jZWxcIjtcbiAgY29uc3RydWN0b3IoYXBwOiBBcHAsIHByaXZhdGUgcmVhZG9ubHkgcGF0aDogc3RyaW5nLCBwcml2YXRlIHJlYWRvbmx5IHJlc29sdmU6IChkZWNpc2lvbjogT3ZlcndyaXRlRGVjaXNpb24pID0+IHZvaWQpIHsgc3VwZXIoYXBwKTsgfVxuICBvbk9wZW4oKTogdm9pZCB7XG4gICAgdGhpcy5jb250ZW50RWwuY3JlYXRlRWwoXCJoMlwiLCB7IHRleHQ6IFwiT3ZlcndyaXRlIGV4aXN0aW5nIGZpbGU/XCIgfSk7XG4gICAgdGhpcy5jb250ZW50RWwuY3JlYXRlRWwoXCJwXCIsIHsgdGV4dDogXCJUaGlzIGxvY2FsIGZpbGUgd2FzIG5vdCBpbnN0YWxsZWQgYnkgVGJwZWRpYSBVcGRhdGUuIE92ZXJ3cml0aW5nIHJlcGxhY2VzIGl0cyBjb250ZW50cyB3aXRoIHRoZSByZWxlYXNlIHZlcnNpb24uXCIgfSk7XG4gICAgdGhpcy5jb250ZW50RWwuY3JlYXRlRWwoXCJwXCIsIHsgdGV4dDogdGhpcy5wYXRoIH0pO1xuICAgIHRoaXMuY29udGVudEVsLmNyZWF0ZUVsKFwicFwiLCB7IHRleHQ6IFwiT3ZlcndyaXRlIGFsbCBhcHBsaWVzIHRvIGFsbCByZW1haW5pbmcgY29uZmxpY3RpbmcgZmlsZXMgaW4gdGhpcyB1cGRhdGUsIGluY2x1ZGluZyBzdWJzZXF1ZW50IHJlbGVhc2VzLiBDYW5jZWwgc3RvcHMgdGhlIGN1cnJlbnQgcmVsZWFzZTsgZWFybGllciBjb21wbGV0ZWQgcmVsZWFzZXMgcmVtYWluIGluc3RhbGxlZC5cIiB9KTtcbiAgICBuZXcgU2V0dGluZyh0aGlzLmNvbnRlbnRFbClcbiAgICAgIC5hZGRCdXR0b24oKGJ1dHRvbikgPT4gYnV0dG9uLnNldEJ1dHRvblRleHQoXCJDYW5jZWwgdXBkYXRlXCIpLm9uQ2xpY2soKCkgPT4gdGhpcy5jbG9zZSgpKSlcbiAgICAgIC5hZGRCdXR0b24oKGJ1dHRvbikgPT4gYnV0dG9uLnNldEJ1dHRvblRleHQoXCJPdmVyd3JpdGUgdGhpcyBmaWxlXCIpLm9uQ2xpY2soKCkgPT4gdGhpcy5jaG9vc2UoXCJvdmVyd3JpdGVcIikpKVxuICAgICAgLmFkZEJ1dHRvbigoYnV0dG9uKSA9PiBidXR0b24uc2V0QnV0dG9uVGV4dChcIk92ZXJ3cml0ZSBhbGxcIikuc2V0Q3RhKCkub25DbGljaygoKSA9PiB0aGlzLmNob29zZShcIm92ZXJ3cml0ZS1hbGxcIikpKTtcbiAgfVxuICBwcml2YXRlIGNob29zZShkZWNpc2lvbjogT3ZlcndyaXRlRGVjaXNpb24pOiB2b2lkIHsgdGhpcy5kZWNpc2lvbiA9IGRlY2lzaW9uOyB0aGlzLmNsb3NlKCk7IH1cbiAgb25DbG9zZSgpOiB2b2lkIHsgdGhpcy5jb250ZW50RWwuZW1wdHkoKTsgdGhpcy5yZXNvbHZlKHRoaXMuZGVjaXNpb24pOyB9XG59XG5cbmNsYXNzIFVwZGF0ZU1vZGFsIGV4dGVuZHMgTW9kYWwge1xuICBjb25zdHJ1Y3RvcihhcHA6IEFwcCwgcHJpdmF0ZSByZWFkb25seSBiYXRjaDogVXBkYXRlQmF0Y2gsIHByaXZhdGUgcmVhZG9ubHkgaW5zdGFsbDogKHByb2dyZXNzOiAobWVzc2FnZTogc3RyaW5nKSA9PiB2b2lkKSA9PiBQcm9taXNlPHZvaWQ+KSB7IHN1cGVyKGFwcCk7IH1cbiAgb25PcGVuKCk6IHZvaWQge1xuICAgIGNvbnN0IHsgY29udGVudEVsIH0gPSB0aGlzO1xuICAgIGNvbnN0IGZpcnN0ID0gdGhpcy5iYXRjaC5yZWxlYXNlc1swXTsgY29uc3QgbGFzdCA9IHRoaXMuYmF0Y2gucmVsZWFzZXMuYXQoLTEpITtcbiAgICBjb250ZW50RWwuY3JlYXRlRWwoXCJoMlwiLCB7IHRleHQ6IGBJbnN0YWxsICR7dGhpcy5iYXRjaC5yZWxlYXNlcy5sZW5ndGh9IFRicGVkaWEgcmVsZWFzZSR7dGhpcy5iYXRjaC5yZWxlYXNlcy5sZW5ndGggPT09IDEgPyBcIlwiIDogXCJzXCJ9YCB9KTtcbiAgICBjb250ZW50RWwuY3JlYXRlRWwoXCJwXCIsIHsgdGV4dDogYCR7Zmlyc3QucmVsZWFzZVZlcnNpb259IFx1MjE5MiAke2xhc3QucmVsZWFzZVZlcnNpb259YCB9KTtcbiAgICBjb250ZW50RWwuY3JlYXRlRWwoXCJwXCIsIHsgdGV4dDogXCJUaGUgbGlzdCBiZWxvdyBpbmNsdWRlcyBzZWxlY3RlZCByZWxlYXNlcyBhbmQgdGhlaXIgcmVxdWlyZWQgZGVwZW5kZW5jaWVzLlwiIH0pO1xuICAgIGNvbnN0IGxpc3QgPSBjb250ZW50RWwuY3JlYXRlRWwoXCJ1bFwiKTtcbiAgICBmb3IgKGNvbnN0IHJlbGVhc2Ugb2YgdGhpcy5iYXRjaC5yZWxlYXNlcykgbGlzdC5jcmVhdGVFbChcImxpXCIsIHsgdGV4dDogYCR7cmVsZWFzZS5yZWxlYXNlVmVyc2lvbn0gXHUyMDE0ICR7cmVsZWFzZS5yZWxlYXNlTm90ZXMuc3VtbWFyeX1gIH0pO1xuICAgIGNvbnN0IHN0YXR1cyA9IGNvbnRlbnRFbC5jcmVhdGVFbChcInBcIik7XG4gICAgbmV3IFNldHRpbmcoY29udGVudEVsKVxuICAgICAgLmFkZEJ1dHRvbigoYnV0dG9uKSA9PiBidXR0b24uc2V0QnV0dG9uVGV4dChcIkNhbmNlbFwiKS5vbkNsaWNrKCgpID0+IHRoaXMuY2xvc2UoKSkpXG4gICAgICAuYWRkQnV0dG9uKChidXR0b24pID0+IGJ1dHRvbi5zZXRDdGEoKS5zZXRCdXR0b25UZXh0KFwiVXBkYXRlIG5vd1wiKS5vbkNsaWNrKGFzeW5jICgpID0+IHtcbiAgICAgICAgYnV0dG9uLnNldERpc2FibGVkKHRydWUpOyBzdGF0dXMuc2V0VGV4dChcIlN0YXJ0aW5nIHVwZGF0ZVx1MjAyNlwiKTtcbiAgICAgICAgdHJ5IHsgYXdhaXQgdGhpcy5pbnN0YWxsKCh0ZXh0KSA9PiBzdGF0dXMuc2V0VGV4dCh0ZXh0KSk7IHRoaXMuY2xvc2UoKTsgfVxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiVGJwZWRpYSB1cGRhdGUgaW5zdGFsbGF0aW9uIGZhaWxlZFwiLCBlcnJvcik7XG4gICAgICAgICAgc3RhdHVzLnNldFRleHQoYFVwZGF0ZSBmYWlsZWQ6ICR7bWVzc2FnZShlcnJvcil9YCk7XG4gICAgICAgICAgYnV0dG9uLnNldERpc2FibGVkKGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgfSkpO1xuICB9XG4gIG9uQ2xvc2UoKTogdm9pZCB7IHRoaXMuY29udGVudEVsLmVtcHR5KCk7IH1cbn1cbmZ1bmN0aW9uIG1lc3NhZ2UoZXJyb3I6IHVua25vd24pOiBzdHJpbmcgeyByZXR1cm4gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBcIlVua25vd24gZXJyb3JcIjsgfVxuIiwgImltcG9ydCBKU1ppcCBmcm9tIFwianN6aXBcIjtcbmltcG9ydCB7IEFwcCwgRGF0YUFkYXB0ZXIsIE5vdGljZSwgUGxhdGZvcm0sIHJlcXVlc3RVcmwgfSBmcm9tIFwib2JzaWRpYW5cIjtcbmltcG9ydCB7IGNvbXBhcmVSZWxlYXNlVmVyc2lvbnMsIGNvbXBhcmVWZXJzaW9ucywgcGFyc2VBbmRWYWxpZGF0ZU1hbmlmZXN0IH0gZnJvbSBcIi4vbWFuaWZlc3RcIjtcbmltcG9ydCB7IGFzc2VydE1hbmFnZWRQYXRoLCBlbnN1cmVOb1BhdGhDb25mbGljdHMgfSBmcm9tIFwiLi9wYXRoLXBvbGljeVwiO1xuaW1wb3J0IHsgY3VycmVudE93bmVkUGF0aHMsIG1pZ3JhdGVPd25lZEZpbGVzIH0gZnJvbSBcIi4vb3duZXJzaGlwXCI7XG5pbXBvcnQgeyBNQU5BR0VEX1JPT1RTLCBNQU5JRkVTVF9CQVNFX1VSTCwgUGx1Z2luRGF0YSwgUHJvYmVSZXN1bHQsIFJlbGVhc2VFbnRyeSwgUmVsZWFzZU1hbmlmZXN0LCBTb3VyY2UsIFN1cHBvcnRlZExhbmd1YWdlLCBVcGRhdGVCYXRjaCwgVXBkYXRlUGxhbiwgVXBkYXRlVHJhbnNhY3Rpb24sIFdPUktFUl9VUkwgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5jb25zdCBTVEFHSU5HX0RJUiA9IFwiLm9ic2lkaWFuL3BsdWdpbnMvdGJwZWRpYS11cGRhdGUvLnN0YWdpbmdcIjtcbmNvbnN0IE1BWF9BUkNISVZFX0JZVEVTID0gMTAyNCAqIDEwMjQgKiAxMDI0O1xuY29uc3QgTUFYX0ZJTEVTID0gMzBfMDAwO1xuY29uc3QgTUFYX1VOQ09NUFJFU1NFRF9CWVRFUyA9IDQgKiAxMDI0ICogMTAyNCAqIDEwMjQ7XG5cbmV4cG9ydCB0eXBlIE92ZXJ3cml0ZURlY2lzaW9uID0gXCJvdmVyd3JpdGVcIiB8IFwib3ZlcndyaXRlLWFsbFwiIHwgXCJjYW5jZWxcIjtcbmV4cG9ydCB0eXBlIENvbmZpcm1PdmVyd3JpdGUgPSAocGF0aDogc3RyaW5nKSA9PiBQcm9taXNlPE92ZXJ3cml0ZURlY2lzaW9uPjtcblxuZXhwb3J0IGNsYXNzIFVwZGF0ZVNlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJlYWRvbmx5IGFwcDogQXBwLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgcGx1Z2luVmVyc2lvbjogc3RyaW5nLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgZ2V0RGF0YTogKCkgPT4gUGx1Z2luRGF0YSxcbiAgICBwcml2YXRlIHJlYWRvbmx5IHNhdmVEYXRhOiAoZGF0YTogUGx1Z2luRGF0YSkgPT4gUHJvbWlzZTx2b2lkPixcbiAgKSB7fVxuXG4gIGFzeW5jIGNoZWNrKCk6IFByb21pc2U8VXBkYXRlQmF0Y2ggfCBudWxsPiB7XG4gICAgY29uc3QgbWFuaWZlc3QgPSBhd2FpdCB0aGlzLmdldFJlbGVhc2VNYW5pZmVzdCgpO1xuICAgIHRoaXMuYXNzZXJ0Q29tcGF0aWJsZShtYW5pZmVzdCk7XG4gICAgY29uc3QgZGF0YSA9IHRoaXMuZ2V0RGF0YSgpO1xuICAgIGF3YWl0IHRoaXMuc2F2ZURhdGEoeyAuLi5kYXRhLCBzZXJpZXNJZDogbWFuaWZlc3QuY29sbGVjdGlvbi5zZXJpZXMuaWQsIGVkaXRpb25JZDogbWFuaWZlc3QuY29sbGVjdGlvbi5lZGl0aW9uLmlkLFxuICAgICAgaW5zdGFsbGVkOiB7IC4uLmRhdGEuaW5zdGFsbGVkLCBvd25lZEZpbGVzOiBtaWdyYXRlT3duZWRGaWxlcyhkYXRhLmluc3RhbGxlZC5vd25lZEZpbGVzLCBkYXRhLmluc3RhbGxlZCwgbWFuaWZlc3QpIH0gfSk7XG4gICAgY29uc3QgcmVsZWFzZXMgPSB0aGlzLm1pc3NpbmdSZWxlYXNlcyhtYW5pZmVzdCk7XG4gICAgcmV0dXJuIHJlbGVhc2VzLmxlbmd0aCA/IHsgbWFuaWZlc3QsIHJlbGVhc2VzIH0gOiBudWxsO1xuICB9XG5cbiAgYXN5bmMgZ2V0UmVsZWFzZU1hbmlmZXN0KCk6IFByb21pc2U8UmVsZWFzZU1hbmlmZXN0PiB7XG4gICAgY29uc3QgbGFuZ3VhZ2UgPSB0aGlzLmdldERhdGEoKS5sYW5ndWFnZUNvZGU7XG4gICAgaWYgKCFsYW5ndWFnZSkgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyB2YXVsdFx1MjAxOXMgVGJwZWRpYSBjb2xsZWN0aW9uIGxhbmd1YWdlIGlzIG1pc3NpbmcuIENvbmZpZ3VyZSBsYW5ndWFnZUNvZGUgaW4gdGhlIHBsdWdpblx1MjAxOXMgZGF0YS5qc29uIGZpcnN0LlwiKTtcbiAgICBjb25zdCBlZGl0aW9uID0gdGhpcy5nZXREYXRhKCkuZWRpdGlvbklkO1xuICAgIGNvbnN0IG1hbmlmZXN0ID0gYXdhaXQgdGhpcy5mZXRjaE1hbmlmZXN0KGxhbmd1YWdlLCB0aGlzLmdldERhdGEoKS5zZXJpZXNJZCwgZWRpdGlvbiwgdGhpcy5nZXREYXRhKCkuQ29sbGVjdGlvbik7XG4gICAgdGhpcy5hc3NlcnRTZWxlY3RlZENvbGxlY3Rpb24obWFuaWZlc3QpO1xuICAgIHJldHVybiBtYW5pZmVzdDtcbiAgfVxuXG4gIGlzUmVsZWFzZUluc3RhbGxlZChyZWxlYXNlOiBSZWxlYXNlRW50cnksIG1hbmlmZXN0OiBSZWxlYXNlTWFuaWZlc3QpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5pbnN0YWxsZWRSZWxlYXNlSWRzKG1hbmlmZXN0KS5oYXMocmVsZWFzZS5yZWxlYXNlSWQpO1xuICB9XG5cbiAgZ2V0U2VsZWN0ZWRCYXRjaChtYW5pZmVzdDogUmVsZWFzZU1hbmlmZXN0LCBzZWxlY3RlZElkczogU2V0PHN0cmluZz4pOiBVcGRhdGVCYXRjaCB7XG4gICAgY29uc3QgaW5zdGFsbGVkID0gdGhpcy5pbnN0YWxsZWRSZWxlYXNlSWRzKG1hbmlmZXN0KTtcbiAgICBjb25zdCBpbmNsdWRlZCA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICAgIGNvbnN0IHZpc2l0ID0gKGlkOiBzdHJpbmcpOiB2b2lkID0+IHtcbiAgICAgIGlmIChpbnN0YWxsZWQuaGFzKGlkKSB8fCBpbmNsdWRlZC5oYXMoaWQpKSByZXR1cm47XG4gICAgICBjb25zdCBpbmRleCA9IG1hbmlmZXN0LnJlbGVhc2VzLmZpbmRJbmRleCgocmVsZWFzZSkgPT4gcmVsZWFzZS5yZWxlYXNlSWQgPT09IGlkKTtcbiAgICAgIGlmIChpbmRleCA8IDApIHRocm93IG5ldyBFcnJvcihgVW5rbm93biByZWxlYXNlIGRlcGVuZGVuY3k6ICR7aWR9LmApO1xuICAgICAgY29uc3QgcmVsZWFzZSA9IG1hbmlmZXN0LnJlbGVhc2VzW2luZGV4XTtcbiAgICAgIGluY2x1ZGVkLmFkZChpZCk7XG4gICAgICBmb3IgKGNvbnN0IGRlcGVuZGVuY3kgb2YgcmVsZWFzZS5kZXBlbmRzT24gPz8gbWFuaWZlc3QucmVsZWFzZXMuc2xpY2UoMCwgaW5kZXgpLm1hcCgoZW50cnkpID0+IGVudHJ5LnJlbGVhc2VJZCkpIHZpc2l0KGRlcGVuZGVuY3kpO1xuICAgIH07XG4gICAgZm9yIChjb25zdCBpZCBvZiBzZWxlY3RlZElkcykgdmlzaXQoaWQpO1xuICAgIGNvbnN0IHJlbGVhc2VzID0gbWFuaWZlc3QucmVsZWFzZXMuZmlsdGVyKChyZWxlYXNlKSA9PiBpbmNsdWRlZC5oYXMocmVsZWFzZS5yZWxlYXNlSWQpKTtcbiAgICBpZiAoIXJlbGVhc2VzLmxlbmd0aCkgdGhyb3cgbmV3IEVycm9yKFwiU2VsZWN0IGF0IGxlYXN0IG9uZSBwZW5kaW5nIHJlbGVhc2UuXCIpO1xuICAgIHJldHVybiB7IG1hbmlmZXN0LCByZWxlYXNlcyB9O1xuICB9XG5cbiAgYXN5bmMgaW5zdGFsbChiYXRjaDogVXBkYXRlQmF0Y2gsIHByb2dyZXNzOiAobWVzc2FnZTogc3RyaW5nKSA9PiB2b2lkLCBjb25maXJtT3ZlcndyaXRlPzogQ29uZmlybU92ZXJ3cml0ZSk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRoaXMuYXNzZXJ0U2VsZWN0ZWRDb2xsZWN0aW9uKGJhdGNoLm1hbmlmZXN0KTtcbiAgICB0aGlzLmFzc2VydENvbXBhdGlibGUoYmF0Y2gubWFuaWZlc3QpO1xuICAgIGJhdGNoID0gdGhpcy5nZXRTZWxlY3RlZEJhdGNoKGJhdGNoLm1hbmlmZXN0LCBuZXcgU2V0KGJhdGNoLnJlbGVhc2VzLm1hcCgocmVsZWFzZSkgPT4gcmVsZWFzZS5yZWxlYXNlSWQpKSk7XG4gICAgLy8gQXBwcm92YWwgbGFzdHMgb25seSBmb3IgdGhpcyBpbnN0YWxsYXRpb24sIGluY2x1ZGluZyBzdWJzZXF1ZW50IHJlbGVhc2VzLlxuICAgIGxldCBvdmVyd3JpdGVBbGwgPSBmYWxzZTtcbiAgICBjb25zdCBhcHByb3ZlT3ZlcndyaXRlOiBDb25maXJtT3ZlcndyaXRlID0gYXN5bmMgKHBhdGgpID0+IHtcbiAgICAgIGlmIChvdmVyd3JpdGVBbGwpIHJldHVybiBcIm92ZXJ3cml0ZVwiO1xuICAgICAgY29uc3QgZGVjaXNpb24gPSBhd2FpdCBjb25maXJtT3ZlcndyaXRlPy4ocGF0aCkgPz8gXCJjYW5jZWxcIjtcbiAgICAgIGlmIChkZWNpc2lvbiA9PT0gXCJvdmVyd3JpdGUtYWxsXCIpIG92ZXJ3cml0ZUFsbCA9IHRydWU7XG4gICAgICByZXR1cm4gZGVjaXNpb247XG4gICAgfTtcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgYmF0Y2gucmVsZWFzZXMubGVuZ3RoOyBpbmRleCArPSAxKSB7XG4gICAgICB0aGlzLmFzc2VydFNlbGVjdGVkQ29sbGVjdGlvbihiYXRjaC5tYW5pZmVzdCk7XG4gICAgICBjb25zdCByZWxlYXNlID0gYmF0Y2gucmVsZWFzZXNbaW5kZXhdO1xuICAgICAgcHJvZ3Jlc3MoYFJlbGVhc2UgJHtpbmRleCArIDF9IG9mICR7YmF0Y2gucmVsZWFzZXMubGVuZ3RofTogJHtyZWxlYXNlLnJlbGVhc2VWZXJzaW9ufWApO1xuICAgICAgYXdhaXQgdGhpcy5pbnN0YWxsUmVsZWFzZShiYXRjaC5tYW5pZmVzdCwgcmVsZWFzZSwgcHJvZ3Jlc3MsIGFwcHJvdmVPdmVyd3JpdGUpO1xuICAgIH1cbiAgICBuZXcgTm90aWNlKGBJbnN0YWxsZWQgJHtiYXRjaC5yZWxlYXNlcy5sZW5ndGh9IFRicGVkaWEgcmVsZWFzZShzKS5gKTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgaW5zdGFsbFJlbGVhc2UobWFuaWZlc3Q6IFJlbGVhc2VNYW5pZmVzdCwgcmVsZWFzZTogUmVsZWFzZUVudHJ5LCBwcm9ncmVzczogKG1lc3NhZ2U6IHN0cmluZykgPT4gdm9pZCwgY29uZmlybU92ZXJ3cml0ZTogQ29uZmlybU92ZXJ3cml0ZSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGxldCB0cmFuc2FjdGlvbjogVXBkYXRlVHJhbnNhY3Rpb24gfCB1bmRlZmluZWQ7XG4gICAgbGV0IGNvbW1pdHRlZCA9IGZhbHNlO1xuICAgIHRyeSB7XG4gICAgICBwcm9ncmVzcyhcIkNyZWF0aW5nIHVwZGF0ZSB0cmFuc2FjdGlvblx1MjAyNlwiKTtcbiAgICAgIHRyYW5zYWN0aW9uID0gYXdhaXQgdGhpcy5jcmVhdGVUcmFuc2FjdGlvbihtYW5pZmVzdCwgcmVsZWFzZSk7XG4gICAgICBwcm9ncmVzcyhcIkRpc2NvdmVyaW5nIHVwZGF0ZSBzb3VyY2VzXHUyMDI2XCIpO1xuICAgICAgY29uc3Qgc291cmNlcyA9IGF3YWl0IHRoaXMuZ2V0U291cmNlcyhtYW5pZmVzdCwgcmVsZWFzZSwgdHJhbnNhY3Rpb24pO1xuICAgICAgaWYgKCFzb3VyY2VzLmxlbmd0aCkgdGhyb3cgbmV3IEVycm9yKFwiTm8gZW5hYmxlZCB1cGRhdGUgc291cmNlIGlzIGF2YWlsYWJsZS5cIik7XG4gICAgICBjb25zdCByYW5rZWQgPSBhd2FpdCB0aGlzLnJhbmtTb3VyY2VzKHNvdXJjZXMsIHRyYW5zYWN0aW9uLCBwcm9ncmVzcyk7XG4gICAgICBpZiAoIXJhbmtlZC5sZW5ndGgpIHRocm93IG5ldyBFcnJvcihcIkFsbCB1cGRhdGUgc291cmNlcyBmYWlsZWQgdGhlaXIgaGVhbHRoIGNoZWNrLlwiKTtcblxuICAgICAgbGV0IGFyY2hpdmU6IEFycmF5QnVmZmVyIHwgdW5kZWZpbmVkO1xuICAgICAgbGV0IGxhc3RFcnJvcjogdW5rbm93bjtcbiAgICAgIGZvciAoY29uc3Qgc291cmNlIG9mIHJhbmtlZCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHByb2dyZXNzKGBEb3dubG9hZGluZyBmcm9tICR7c291cmNlLm5hbWV9XHUyMDI2YCk7XG4gICAgICAgICAgYXJjaGl2ZSA9IGF3YWl0IHRoaXMuZG93bmxvYWRQYWNrYWdlKHNvdXJjZSwgdHJhbnNhY3Rpb24sIHJlbGVhc2UuZmlsZW5hbWUpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikgeyBsYXN0RXJyb3IgPSBlcnJvcjsgfVxuICAgICAgfVxuICAgICAgaWYgKCFhcmNoaXZlKSB0aHJvdyBsYXN0RXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGxhc3RFcnJvciA6IG5ldyBFcnJvcihcIkFsbCB1cGRhdGUgc291cmNlcyBmYWlsZWQuXCIpO1xuXG4gICAgICBwcm9ncmVzcyhcIlZhbGlkYXRpbmcgcmVsZWFzZSBhcmNoaXZlXHUyMDI2XCIpO1xuICAgICAgY29uc3Qgc3RhZ2luZ1BhdGggPSBgJHtTVEFHSU5HX0RJUn0vJHt0cmFuc2FjdGlvbi5pZH0vcGFja2FnZS56aXBgO1xuICAgICAgYXdhaXQgd3JpdGVCaW5hcnkodGhpcy5hcHAudmF1bHQuYWRhcHRlciwgc3RhZ2luZ1BhdGgsIGFyY2hpdmUpO1xuICAgICAgYXJjaGl2ZSA9IGF3YWl0IHRoaXMuYXBwLnZhdWx0LmFkYXB0ZXIucmVhZEJpbmFyeShzdGFnaW5nUGF0aCk7XG4gICAgICBjb25zdCBwbGFuID0gYXdhaXQgdGhpcy52YWxpZGF0ZUFyY2hpdmUoYXJjaGl2ZSwgbWFuaWZlc3QsIHJlbGVhc2UpO1xuICAgICAgcHJvZ3Jlc3MoXCJBcHBseWluZyBtYW5hZ2VkIGZpbGVzXHUyMDI2XCIpO1xuICAgICAgYXdhaXQgdGhpcy5hcHBseShwbGFuLCBhcmNoaXZlLCBwcm9ncmVzcywgY29uZmlybU92ZXJ3cml0ZSk7XG4gICAgICBjb21taXR0ZWQgPSB0cnVlO1xuICAgICAgdHJ5IHsgYXdhaXQgdGhpcy5yZXBvcnQodHJhbnNhY3Rpb24sIFwic3VjY2Vzc1wiKTsgfVxuICAgICAgY2F0Y2ggeyBuZXcgTm90aWNlKFwiVGJwZWRpYSB3YXMgdXBkYXRlZCwgYnV0IHRoZSBzZXJ2aWNlIGNvdWxkIG5vdCByZWNvcmQgdGhlIHN1Y2Nlc3MgYXVkaXQuXCIpOyB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGlmICh0cmFuc2FjdGlvbiAmJiAhY29tbWl0dGVkKSBhd2FpdCB0aGlzLnJlcG9ydCh0cmFuc2FjdGlvbiwgXCJmYWlsZWRcIikuY2F0Y2goKCkgPT4gdW5kZWZpbmVkKTtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBpZiAodHJhbnNhY3Rpb24pIGF3YWl0IHJlbW92ZVRyZWUodGhpcy5hcHAudmF1bHQuYWRhcHRlciwgYCR7U1RBR0lOR19ESVJ9LyR7dHJhbnNhY3Rpb24uaWR9YCkuY2F0Y2goKCkgPT4gdW5kZWZpbmVkKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG1pc3NpbmdSZWxlYXNlcyhtYW5pZmVzdDogUmVsZWFzZU1hbmlmZXN0KTogUmVsZWFzZUVudHJ5W10ge1xuICAgIGNvbnN0IGluc3RhbGxlZCA9IHRoaXMuaW5zdGFsbGVkUmVsZWFzZUlkcyhtYW5pZmVzdCk7XG4gICAgcmV0dXJuIG1hbmlmZXN0LnJlbGVhc2VzLmZpbHRlcigocmVsZWFzZSkgPT4gIWluc3RhbGxlZC5oYXMocmVsZWFzZS5yZWxlYXNlSWQpKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5zdGFsbGVkUmVsZWFzZUlkcyhtYW5pZmVzdDogUmVsZWFzZU1hbmlmZXN0KTogU2V0PHN0cmluZz4ge1xuICAgIGNvbnN0IGluc3RhbGxlZCA9IHRoaXMuZ2V0RGF0YSgpLmluc3RhbGxlZDtcbiAgICBjb25zdCBpZHMgPSBuZXcgU2V0KGluc3RhbGxlZC5hcHBsaWVkUmVsZWFzZUlkcyk7XG4gICAgaWYgKGluc3RhbGxlZC5yZWxlYXNlSWQpIGlkcy5hZGQoaW5zdGFsbGVkLnJlbGVhc2VJZCk7XG4gICAgaWYgKGluc3RhbGxlZC50cmFja2luZ1ZlcnNpb24gPT09IDIpIHJldHVybiBpZHM7XG4gICAgY29uc3QgaW5zdGFsbGVkSW5kZXggPSBpbnN0YWxsZWQucmVsZWFzZUlkID8gbWFuaWZlc3QucmVsZWFzZXMuZmluZEluZGV4KChyZWxlYXNlKSA9PiByZWxlYXNlLnJlbGVhc2VJZCA9PT0gaW5zdGFsbGVkLnJlbGVhc2VJZCkgOiAtMTtcbiAgICBpZiAoaW5zdGFsbGVkSW5kZXggPj0gMCkge1xuICAgICAgZm9yIChjb25zdCByZWxlYXNlIG9mIG1hbmlmZXN0LnJlbGVhc2VzLnNsaWNlKDAsIGluc3RhbGxlZEluZGV4ICsgMSkpIGlkcy5hZGQocmVsZWFzZS5yZWxlYXNlSWQpO1xuICAgICAgcmV0dXJuIGlkcztcbiAgICB9XG4gICAgaWYgKCFpbnN0YWxsZWQucmVsZWFzZVZlcnNpb24pIHJldHVybiBpZHM7XG4gICAgY29uc3Qga2V5ID0gW21hbmlmZXN0LmNvbGxlY3Rpb24ubGFuZ3VhZ2UuY29kZSwgbWFuaWZlc3QuY29sbGVjdGlvbi5zZXJpZXMuaWQsIG1hbmlmZXN0LmNvbGxlY3Rpb24uZWRpdGlvbi5pZF0uam9pbihcIi1cIikudG9Mb3dlckNhc2UoKTtcbiAgICBpZiAoIWluc3RhbGxlZC5yZWxlYXNlVmVyc2lvbi5zdGFydHNXaXRoKGAke2tleX0tYCkgJiYgIS9eXFxkezR9XFwuLy50ZXN0KGluc3RhbGxlZC5yZWxlYXNlVmVyc2lvbikpIHtcbiAgICAgIHJldHVybiBpZHM7XG4gICAgfVxuICAgIGZvciAoY29uc3QgcmVsZWFzZSBvZiBtYW5pZmVzdC5yZWxlYXNlcykgaWYgKGNvbXBhcmVSZWxlYXNlVmVyc2lvbnMocmVsZWFzZS5yZWxlYXNlVmVyc2lvbiwgaW5zdGFsbGVkLnJlbGVhc2VWZXJzaW9uKSA8PSAwKSBpZHMuYWRkKHJlbGVhc2UucmVsZWFzZUlkKTtcbiAgICByZXR1cm4gaWRzO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBmZXRjaE1hbmlmZXN0KGxhbmd1YWdlOiBTdXBwb3J0ZWRMYW5ndWFnZSwgc2VyaWVzOiBzdHJpbmcsIGVkaXRpb246IHN0cmluZywgY29sbGVjdGlvbjogc3RyaW5nKTogUHJvbWlzZTxSZWxlYXNlTWFuaWZlc3Q+IHtcbiAgICBpZiAoIS9eW2EtejAtOV0rKD86LVthLXowLTldKykqJC8udGVzdChzZXJpZXMpKSB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgY29uZmlndXJlZCBUYnBlZGlhIHNlcmllcyBJRCBpcyBpbnZhbGlkLlwiKTtcbiAgICBpZiAoZWRpdGlvbiAhPT0gXCJzdGFuZGFyZFwiICYmIGVkaXRpb24gIT09IFwiYWR2YW5jZWRcIikgdGhyb3cgbmV3IEVycm9yKFwiQ2hvb3NlIGEgc3VwcG9ydGVkIFRicGVkaWEgZWRpdGlvbiBpbiB0aGUgcGx1Z2luIHNldHRpbmdzLlwiKTtcbiAgICBpZiAoIS9eVlsxLTldXFxkKiQvLnRlc3QoY29sbGVjdGlvbikpIHRocm93IG5ldyBFcnJvcihcIlRoZSBjb25maWd1cmVkIENvbGxlY3Rpb24gbXVzdCBiZSBhIHZlcnNpb24gc3VjaCBhcyBWMS5cIik7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCByZXF1ZXN0VXJsKHsgdXJsOiBgJHtNQU5JRkVTVF9CQVNFX1VSTH0vJHtsYW5ndWFnZS50b0xvd2VyQ2FzZSgpfS8ke3Nlcmllc30vJHtlZGl0aW9ufS8ke2NvbGxlY3Rpb259L2xhdGVzdC5qc29uYCwgbWV0aG9kOiBcIkdFVFwiLCB0aHJvdzogZmFsc2UgfSk7XG4gICAgaWYgKHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB0aHJvdyBuZXcgRXJyb3IoYENvdWxkIG5vdCByZXRyaWV2ZSByZWxlYXNlIG1ldGFkYXRhIChIVFRQICR7cmVzcG9uc2Uuc3RhdHVzfSkuYCk7XG4gICAgbGV0IGpzb246IHVua25vd247XG4gICAgdHJ5IHsganNvbiA9IHJlc3BvbnNlLmpzb247IH0gY2F0Y2ggeyB0aHJvdyBuZXcgRXJyb3IoXCJSZWxlYXNlIG1ldGFkYXRhIGlzIG5vdCB2YWxpZCBKU09OLlwiKTsgfVxuICAgIHJldHVybiBwYXJzZUFuZFZhbGlkYXRlTWFuaWZlc3QoanNvbik7XG4gIH1cblxuICBwcml2YXRlIGFzc2VydFNlbGVjdGVkQ29sbGVjdGlvbihtYW5pZmVzdDogUmVsZWFzZU1hbmlmZXN0KTogdm9pZCB7XG4gICAgY29uc3QgZGF0YSA9IHRoaXMuZ2V0RGF0YSgpO1xuICAgIGlmIChtYW5pZmVzdC5jb2xsZWN0aW9uLmxhbmd1YWdlLmNvZGUgIT09IGRhdGEubGFuZ3VhZ2VDb2RlIHx8IG1hbmlmZXN0LmNvbGxlY3Rpb24uc2VyaWVzLmlkICE9PSBkYXRhLnNlcmllc0lkIHx8IG1hbmlmZXN0LmNvbGxlY3Rpb24uZWRpdGlvbi5pZCAhPT0gZGF0YS5lZGl0aW9uSWQgfHwgbWFuaWZlc3QuQ29sbGVjdGlvbiAhPT0gZGF0YS5Db2xsZWN0aW9uKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgcmVsZWFzZSBtYW5pZmVzdCBkb2VzIG5vdCBtYXRjaCB0aGUgc2VsZWN0ZWQgbGFuZ3VhZ2UsIHNlcmllcywgZWRpdGlvbiwgYW5kIENvbGxlY3Rpb24uIENoZWNrIGZvciB1cGRhdGVzIGFnYWluIGFmdGVyIGNoYW5naW5nIHNldHRpbmdzLlwiKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFzc2VydENvbXBhdGlibGUobWFuaWZlc3Q6IFJlbGVhc2VNYW5pZmVzdCk6IHZvaWQge1xuICAgIGlmIChjb21wYXJlVmVyc2lvbnModGhpcy5wbHVnaW5WZXJzaW9uLCBtYW5pZmVzdC5taW5pbXVtUGx1Z2luVmVyc2lvbikgPCAwKSB0aHJvdyBuZXcgRXJyb3IoYFRoaXMgcmVsZWFzZSByZXF1aXJlcyBwbHVnaW4gJHttYW5pZmVzdC5taW5pbXVtUGx1Z2luVmVyc2lvbn0gb3IgbmV3ZXIuYCk7XG4gICAgY29uc3QgYXBwVmVyc2lvbiA9IHRoaXMuYXBwVmVyc2lvbigpO1xuICAgIC8vIE9ic2lkaWFuIGRvZXMgbm90IGV4cG9zZSBhIHN0YWJsZSwgdHlwZWQgdmVyc2lvbiBwcm9wZXJ0eSB0byBldmVyeSBwbHVnaW5cbiAgICAvLyBydW50aW1lLiBBIG1pc3NpbmcgdmFsdWUgbXVzdCBub3QgYmUgaW50ZXJwcmV0ZWQgYXMgdmVyc2lvbiAwLjAuMC5cbiAgICBpZiAoYXBwVmVyc2lvbiAmJiBjb21wYXJlVmVyc2lvbnMoYXBwVmVyc2lvbiwgbWFuaWZlc3QubWluaW11bU9ic2lkaWFuVmVyc2lvbikgPCAwKSB0aHJvdyBuZXcgRXJyb3IoYFRoaXMgcmVsZWFzZSByZXF1aXJlcyBPYnNpZGlhbiAke21hbmlmZXN0Lm1pbmltdW1PYnNpZGlhblZlcnNpb259IG9yIG5ld2VyLmApO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBjcmVhdGVUcmFuc2FjdGlvbihtYW5pZmVzdDogUmVsZWFzZU1hbmlmZXN0LCByZWxlYXNlOiBSZWxlYXNlRW50cnkpOiBQcm9taXNlPFVwZGF0ZVRyYW5zYWN0aW9uPiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmFwaShcIi91cGRhdGVzL3RyYW5zYWN0aW9uc1wiLCBcIlBPU1RcIiwge1xuICAgICAgdGl0bGU6IG1hbmlmZXN0LnRpdGxlLCB2ZXJzaW9uOiByZWxlYXNlLnJlbGVhc2VWZXJzaW9uLCBmaWxlbmFtZTogcmVsZWFzZS5maWxlbmFtZSwgbGFuZ3VhZ2U6IG1hbmlmZXN0LmNvbGxlY3Rpb24ubGFuZ3VhZ2UuY29kZSxcbiAgICAgIHNlcmllczogbWFuaWZlc3QuY29sbGVjdGlvbi5zZXJpZXMuaWQsIGVkaXRpb246IG1hbmlmZXN0LmNvbGxlY3Rpb24uZWRpdGlvbi5pZCxcbiAgICAgIGRldmljZV90eXBlOiBQbGF0Zm9ybS5pc01vYmlsZSA/IFwibW9iaWxlXCIgOiBcImRlc2t0b3BcIiwgb3M6IG5hdmlnYXRvci5wbGF0Zm9ybSxcbiAgICAgIGNsaWVudF92ZXJzaW9uOiBgJHt0aGlzLmFwcFZlcnNpb24oKSA/PyBcInVua25vd25cIn07IHBsdWdpbi8ke3RoaXMucGx1Z2luVmVyc2lvbn1gLCB1c2VyX2FnZW50OiBuYXZpZ2F0b3IudXNlckFnZW50LFxuICAgIH0pO1xuICAgIGlmICh0eXBlb2YgcmVzcG9uc2UuaWQgIT09IFwic3RyaW5nXCIgfHwgdHlwZW9mIHJlc3BvbnNlLnRva2VuICE9PSBcInN0cmluZ1wiKSB0aHJvdyBuZXcgRXJyb3IoXCJVcGRhdGUgc2VydmljZSByZXR1cm5lZCBhbiBpbnZhbGlkIHRyYW5zYWN0aW9uLlwiKTtcbiAgICByZXR1cm4geyBpZDogcmVzcG9uc2UuaWQsIHRva2VuOiByZXNwb25zZS50b2tlbiB9O1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBnZXRTb3VyY2VzKG1hbmlmZXN0OiBSZWxlYXNlTWFuaWZlc3QsIHJlbGVhc2U6IFJlbGVhc2VFbnRyeSwgdHJhbnNhY3Rpb246IFVwZGF0ZVRyYW5zYWN0aW9uKTogUHJvbWlzZTxTb3VyY2VbXT4ge1xuICAgIGNvbnN0IHF1ZXJ5ID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh7IGxhbmd1YWdlOiBtYW5pZmVzdC5jb2xsZWN0aW9uLmxhbmd1YWdlLmNvZGUsIHNlcmllczogbWFuaWZlc3QuY29sbGVjdGlvbi5zZXJpZXMuaWQsIGVkaXRpb246IG1hbmlmZXN0LmNvbGxlY3Rpb24uZWRpdGlvbi5pZCwgdGl0bGU6IG1hbmlmZXN0LnRpdGxlLCB2ZXJzaW9uOiByZWxlYXNlLnJlbGVhc2VWZXJzaW9uLCBmaWxlbmFtZTogcmVsZWFzZS5maWxlbmFtZSB9KTtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuYXBpKGAvdXBkYXRlcy9zb3VyY2VzPyR7cXVlcnl9YCwgXCJHRVRcIiwgdW5kZWZpbmVkLCB0cmFuc2FjdGlvbik7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHJlc3BvbnNlLnNvdXJjZXMpKSB0aHJvdyBuZXcgRXJyb3IoXCJVcGRhdGUgc2VydmljZSByZXR1cm5lZCBhbiBpbnZhbGlkIHNvdXJjZSBsaXN0LlwiKTtcbiAgICByZXR1cm4gcmVzcG9uc2Uuc291cmNlcy5maWx0ZXIoaXNTb3VyY2UpO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyByYW5rU291cmNlcyhzb3VyY2VzOiBTb3VyY2VbXSwgdHJhbnNhY3Rpb246IFVwZGF0ZVRyYW5zYWN0aW9uLCBwcm9ncmVzczogKG1lc3NhZ2U6IHN0cmluZykgPT4gdm9pZCk6IFByb21pc2U8U291cmNlW10+IHtcbiAgICBwcm9ncmVzcyhcIlRlc3RpbmcgdXBkYXRlIHNvdXJjZXNcdTIwMjZcIik7XG4gICAgY29uc3QgcHJvYmVzID0gYXdhaXQgUHJvbWlzZS5hbGwoc291cmNlcy5zbGljZSgwLCA4KS5tYXAoYXN5bmMgKHNvdXJjZSkgPT4gKHsgc291cmNlLCByZXN1bHQ6IGF3YWl0IHRoaXMucHJvYmUoc291cmNlLCB0cmFuc2FjdGlvbikgfSkpKTtcbiAgICByZXR1cm4gcHJvYmVzXG4gICAgICAuZmlsdGVyKChpdGVtKTogaXRlbSBpcyB7IHNvdXJjZTogU291cmNlOyByZXN1bHQ6IFByb2JlUmVzdWx0IH0gPT4gaXRlbS5yZXN1bHQuaGVhbHRoeSAmJiB0eXBlb2YgaXRlbS5yZXN1bHQubGF0ZW5jeU1zID09PSBcIm51bWJlclwiKVxuICAgICAgLnNvcnQoKGEsIGIpID0+IHNjb3JlKGEuc291cmNlLCBhLnJlc3VsdCkgLSBzY29yZShiLnNvdXJjZSwgYi5yZXN1bHQpKVxuICAgICAgLm1hcCgoaXRlbSkgPT4gaXRlbS5zb3VyY2UpO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBwcm9iZShzb3VyY2U6IFNvdXJjZSwgdHJhbnNhY3Rpb246IFVwZGF0ZVRyYW5zYWN0aW9uKTogUHJvbWlzZTxQcm9iZVJlc3VsdD4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuYXBpKGAvdXBkYXRlcy9zb3VyY2VzLyR7ZW5jb2RlVVJJQ29tcG9uZW50KHNvdXJjZS5zb3VyY2VJZCl9L3Byb2JlYCwgXCJQT1NUXCIsIHt9LCB0cmFuc2FjdGlvbik7XG4gICAgICByZXR1cm4geyBzb3VyY2VJZDogc291cmNlLnNvdXJjZUlkLCBoZWFsdGh5OiByZXNwb25zZS5oZWFsdGh5ID09PSB0cnVlLCBsYXRlbmN5TXM6IGFzTnVtYmVyKHJlc3BvbnNlLmxhdGVuY3lNcyksIGJ5dGVzOiBhc051bWJlcihyZXNwb25zZS5ieXRlcyksIGVycm9yOiBhc1N0cmluZyhyZXNwb25zZS5lcnJvcikgfTtcbiAgICB9IGNhdGNoIHsgcmV0dXJuIHsgc291cmNlSWQ6IHNvdXJjZS5zb3VyY2VJZCwgaGVhbHRoeTogZmFsc2UgfTsgfVxuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBkb3dubG9hZFBhY2thZ2Uoc291cmNlOiBTb3VyY2UsIHRyYW5zYWN0aW9uOiBVcGRhdGVUcmFuc2FjdGlvbiwgZmlsZW5hbWU6IHN0cmluZyk6IFByb21pc2U8QXJyYXlCdWZmZXI+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAke1dPUktFUl9VUkx9L3VwZGF0ZXMvcGFja2FnZWAsIHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsIC4uLmF1dGhIZWFkZXJzKHRyYW5zYWN0aW9uKSB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBzb3VyY2VJZDogc291cmNlLnNvdXJjZUlkLCBmaWxlbmFtZSB9KSxcbiAgICB9KTtcbiAgICBpZiAoIXJlc3BvbnNlLm9rIHx8ICFyZXNwb25zZS5ib2R5KSB0aHJvdyBuZXcgRXJyb3IoYERvd25sb2FkIGZhaWxlZCBmcm9tICR7c291cmNlLm5hbWV9IChIVFRQICR7cmVzcG9uc2Uuc3RhdHVzfSkuYCk7XG4gICAgY29uc3QgcmVhZGVyID0gcmVzcG9uc2UuYm9keS5nZXRSZWFkZXIoKTsgY29uc3QgY2h1bmtzOiBVaW50OEFycmF5W10gPSBbXTsgbGV0IHRvdGFsID0gMDtcbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgY29uc3QgeyB2YWx1ZSwgZG9uZSB9ID0gYXdhaXQgcmVhZGVyLnJlYWQoKTtcbiAgICAgIGlmIChkb25lKSBicmVhaztcbiAgICAgIHRvdGFsICs9IHZhbHVlLmJ5dGVMZW5ndGg7XG4gICAgICBpZiAodG90YWwgPiBNQVhfQVJDSElWRV9CWVRFUykgeyBhd2FpdCByZWFkZXIuY2FuY2VsKCk7IHRocm93IG5ldyBFcnJvcihcIlJlbGVhc2UgYXJjaGl2ZSBleGNlZWRzIHRoZSBjb25maWd1cmVkIHNpemUgbGltaXQuXCIpOyB9XG4gICAgICBjaHVua3MucHVzaCh2YWx1ZSk7XG4gICAgfVxuICAgIGNvbnN0IGFyY2hpdmUgPSBuZXcgVWludDhBcnJheSh0b3RhbCk7IGxldCBvZmZzZXQgPSAwO1xuICAgIGZvciAoY29uc3QgY2h1bmsgb2YgY2h1bmtzKSB7IGFyY2hpdmUuc2V0KGNodW5rLCBvZmZzZXQpOyBvZmZzZXQgKz0gY2h1bmsuYnl0ZUxlbmd0aDsgfVxuICAgIHJldHVybiBhcmNoaXZlLmJ1ZmZlcjtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgdmFsaWRhdGVBcmNoaXZlKGFyY2hpdmU6IEFycmF5QnVmZmVyLCBtYW5pZmVzdDogUmVsZWFzZU1hbmlmZXN0LCByZWxlYXNlOiBSZWxlYXNlRW50cnkpOiBQcm9taXNlPFVwZGF0ZVBsYW4+IHtcbiAgICBjb25zdCB6aXAgPSBhd2FpdCBKU1ppcC5sb2FkQXN5bmMoYXJjaGl2ZSwgeyBjcmVhdGVGb2xkZXJzOiBmYWxzZSwgY2hlY2tDUkMzMjogZmFsc2UgfSk7XG4gICAgY29uc3QgZXhwZWN0ZWQgPSBuZXcgU2V0KHJlbGVhc2UuZmlsZXMuZmlsdGVyKChmaWxlKSA9PiBmaWxlLmNoYW5nZSAhPT0gXCItXCIpLm1hcCgoZmlsZSkgPT4gZmlsZS5wYXRoKSk7XG4gICAgY29uc3QgYWN0dWFsOiBzdHJpbmdbXSA9IFtdOyBsZXQgdG90YWxVbmNvbXByZXNzZWQgPSAwO1xuICAgIGZvciAoY29uc3QgZW50cnkgb2YgT2JqZWN0LnZhbHVlcyh6aXAuZmlsZXMpKSB7XG4gICAgICBjb25zdCBlbnRyeU5hbWUgPSBlbnRyeS5kaXIgPyBlbnRyeS5uYW1lLnJlcGxhY2UoL1xcLyQvLCBcIlwiKSA6IGVudHJ5Lm5hbWU7XG4gICAgICBpZiAoZW50cnlOYW1lKSBhc3NlcnRNYW5hZ2VkUGF0aChlbnRyeU5hbWUpO1xuICAgICAgaWYgKGVudHJ5LmRpcikgY29udGludWU7XG4gICAgICBpZiAoYWN0dWFsLmxlbmd0aCA+PSBNQVhfRklMRVMpIHRocm93IG5ldyBFcnJvcihcIlJlbGVhc2UgYXJjaGl2ZSBoYXMgdG9vIG1hbnkgZmlsZXMuXCIpO1xuICAgICAgY29uc3QgcGF0aCA9IGFzc2VydE1hbmFnZWRQYXRoKGVudHJ5Lm5hbWUpO1xuICAgICAgYWN0dWFsLnB1c2gocGF0aCk7XG4gICAgICBjb25zdCBzaXplID0gemlwRW50cnlTaXplKGVudHJ5KTtcbiAgICAgIGlmIChzaXplID09PSB1bmRlZmluZWQpIHRocm93IG5ldyBFcnJvcihcIlJlbGVhc2UgYXJjaGl2ZSBoYXMgYW4gZW50cnkgd2l0aCBubyBzaXplIG1ldGFkYXRhLlwiKTtcbiAgICAgIHRvdGFsVW5jb21wcmVzc2VkICs9IHNpemU7XG4gICAgICBpZiAodG90YWxVbmNvbXByZXNzZWQgPiBNQVhfVU5DT01QUkVTU0VEX0JZVEVTKSB0aHJvdyBuZXcgRXJyb3IoXCJSZWxlYXNlIGFyY2hpdmUgZXhjZWVkcyB0aGUgY29uZmlndXJlZCBleHRyYWN0ZWQtc2l6ZSBsaW1pdC5cIik7XG4gICAgfVxuICAgIGlmIChuZXcgU2V0KGFjdHVhbCkuc2l6ZSAhPT0gYWN0dWFsLmxlbmd0aCkgdGhyb3cgbmV3IEVycm9yKFwiUmVsZWFzZSBhcmNoaXZlIGNvbnRhaW5zIGNvbGxpZGluZyBwYXRocy5cIik7XG4gICAgZW5zdXJlTm9QYXRoQ29uZmxpY3RzKGFjdHVhbCk7XG4gICAgY29uc3QgYWN0dWFsUGF0aHMgPSBuZXcgU2V0KGFjdHVhbCk7XG4gICAgY29uc3QgbWlzc2luZyA9IFsuLi5leHBlY3RlZF0uZmlsdGVyKChwYXRoKSA9PiAhYWN0dWFsUGF0aHMuaGFzKHBhdGgpKTtcbiAgICBjb25zdCB1bmV4cGVjdGVkID0gYWN0dWFsLmZpbHRlcigocGF0aCkgPT4gIWV4cGVjdGVkLmhhcyhwYXRoKSk7XG4gICAgaWYgKG1pc3NpbmcubGVuZ3RoIHx8IHVuZXhwZWN0ZWQubGVuZ3RoKSB7XG4gICAgICBjb25zdCBkZXNjcmliZSA9IChwYXRoczogc3RyaW5nW10pOiBzdHJpbmcgPT4gYCR7cGF0aHMuc2xpY2UoMCwgNSkuam9pbihcIiwgXCIpfSR7cGF0aHMubGVuZ3RoID4gNSA/IGAgKGFuZCAke3BhdGhzLmxlbmd0aCAtIDV9IG1vcmUpYCA6IFwiXCJ9YDtcbiAgICAgIGNvbnN0IGRldGFpbHMgPSBbbWlzc2luZy5sZW5ndGggPyBgTWlzc2luZyBmaWxlczogJHtkZXNjcmliZShtaXNzaW5nKX0uYCA6IFwiXCIsIHVuZXhwZWN0ZWQubGVuZ3RoID8gYFVuZXhwZWN0ZWQgZmlsZXM6ICR7ZGVzY3JpYmUodW5leHBlY3RlZCl9LmAgOiBcIlwiXS5maWx0ZXIoQm9vbGVhbikuam9pbihcIiBcIik7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFJlbGVhc2UgYXJjaGl2ZSBkb2VzIG5vdCBleGFjdGx5IG1hdGNoIHRoZSBtYW5pZmVzdCBpbnZlbnRvcnkgZm9yICR7cmVsZWFzZS5yZWxlYXNlSWR9ICgke3JlbGVhc2UuZmlsZW5hbWV9KS4gJHtkZXRhaWxzfWApO1xuICAgIH1cbiAgICByZXR1cm4geyBtYW5pZmVzdCwgcmVsZWFzZSwgd3JpdGVzOiBhY3R1YWwsIGRlbGV0aW9uczogcmVsZWFzZS5kZWxldGlvbnMgfTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgYXBwbHkocGxhbjogVXBkYXRlUGxhbiwgYXJjaGl2ZTogQXJyYXlCdWZmZXIsIHByb2dyZXNzOiAobWVzc2FnZTogc3RyaW5nKSA9PiB2b2lkLCBjb25maXJtT3ZlcndyaXRlOiBDb25maXJtT3ZlcndyaXRlKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgYWRhcHRlciA9IHRoaXMuYXBwLnZhdWx0LmFkYXB0ZXI7XG4gICAgY29uc3QgcHJldmlvdXMgPSB7IC4uLnRoaXMuZ2V0RGF0YSgpLmluc3RhbGxlZCwgYXBwbGllZFJlbGVhc2VJZHM6IFsuLi50aGlzLmluc3RhbGxlZFJlbGVhc2VJZHMocGxhbi5tYW5pZmVzdCldIH07XG4gICAgY29uc3Qgb3duZWQgPSBjdXJyZW50T3duZWRQYXRocyhwcmV2aW91cyk7XG4gICAgLy8gRWFjaCByZWxlYXNlIGlzIGluY3JlbWVudGFsOiBvbmx5IGV4cGxpY2l0IGRlbGV0aW9ucyBhcmUgcmVtb3ZlZC4gRWFybGllclxuICAgIC8vIHJlbGVhc2VzIHJlbWFpbiBpbnN0YWxsZWQgYWZ0ZXIgdGhlaXIgWklQIGhhcyBjb21taXR0ZWQgc3VjY2Vzc2Z1bGx5LlxuICAgIGNvbnN0IGRlbGV0aW9ucyA9IFsuLi5uZXcgU2V0KHBsYW4uZGVsZXRpb25zKV07XG4gICAgZm9yIChjb25zdCBwYXRoIG9mIHBsYW4ud3JpdGVzKSB7XG4gICAgICBhd2FpdCBhc3NlcnROb1JlcGFyc2VQb2ludHModGhpcy5hcHAsIHBhdGgpO1xuICAgICAgaWYgKGF3YWl0IGFkYXB0ZXIuZXhpc3RzKHBhdGgpKSB7XG4gICAgICAgIGlmICgoYXdhaXQgYWRhcHRlci5zdGF0KHBhdGgpKT8udHlwZSA9PT0gXCJmb2xkZXJcIikgdGhyb3cgbmV3IEVycm9yKGBSZWZ1c2luZyB0byByZXBsYWNlIGEgbG9jYWwgZm9sZGVyOiAke3BhdGh9YCk7XG4gICAgICAgIGlmICghb3duZWQuaGFzKHBhdGgpKSB7XG4gICAgICAgICAgcHJvZ3Jlc3MoYFdhaXRpbmcgZm9yIG92ZXJ3cml0ZSBhcHByb3ZhbDogJHtwYXRofWApO1xuICAgICAgICAgIGlmIChhd2FpdCBjb25maXJtT3ZlcndyaXRlKHBhdGgpID09PSBcImNhbmNlbFwiKSB0aHJvdyBuZXcgRXJyb3IoXCJVcGRhdGUgY2FuY2VsbGVkLiBObyBmaWxlcyBpbiB0aGlzIHJlbGVhc2Ugd2VyZSBjaGFuZ2VkOyBlYXJsaWVyIGNvbXBsZXRlZCByZWxlYXNlcyByZW1haW4gaW5zdGFsbGVkLlwiKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKGNvbnN0IHBhdGggb2YgZGVsZXRpb25zKSB7XG4gICAgICBhd2FpdCBhc3NlcnROb1JlcGFyc2VQb2ludHModGhpcy5hcHAsIHBhdGgpO1xuICAgICAgY29uc3QgbWFuYWdlZFBhdGggPSBhc3NlcnRNYW5hZ2VkUGF0aChwYXRoKTtcbiAgICAgIGNvbnN0IGV4aXN0cyA9IGF3YWl0IGFkYXB0ZXIuZXhpc3RzKG1hbmFnZWRQYXRoKTtcbiAgICAgIGlmIChleGlzdHMgJiYgKGF3YWl0IGFkYXB0ZXIuc3RhdChtYW5hZ2VkUGF0aCkpPy50eXBlID09PSBcImZvbGRlclwiKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgUmVmdXNpbmcgdG8gZGVsZXRlIGEgbG9jYWwgZm9sZGVyOiAke21hbmFnZWRQYXRofWApO1xuICAgICAgfVxuICAgICAgLy8gRXhwbGljaXQgZGVsZXRpb25zIGFsc28gY292ZXIgY29sbGVjdGlvbiBub3RlcyBwcmVkYXRpbmcgb3duZXJzaGlwIHRyYWNraW5nLlxuICAgICAgY29uc3QgaXNVbnRyYWNrZWRDb2xsZWN0aW9uTm90ZSA9IGV4aXN0cyAmJiBtYW5hZ2VkUGF0aC50b0xvd2VyQ2FzZSgpLmVuZHNXaXRoKFwiLm1kXCIpXG4gICAgICAgICYmIChNQU5BR0VEX1JPT1RTIGFzIHJlYWRvbmx5IHN0cmluZ1tdKS5pbmNsdWRlcyhtYW5hZ2VkUGF0aC5zcGxpdChcIi9cIilbMF0pO1xuICAgICAgaWYgKCFvd25lZC5oYXMocGF0aCkgJiYgIWlzVW50cmFja2VkQ29sbGVjdGlvbk5vdGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBSZWZ1c2luZyB0byBkZWxldGUgYSBmaWxlIG5vdCBvd25lZCBieSB0aGUgcHJpb3IgcmVsZWFzZTogJHtwYXRofWApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHRyYW5zYWN0aW9uRGlyID0gYCR7U1RBR0lOR19ESVJ9LyR7Y3J5cHRvLnJhbmRvbVVVSUQoKX1gO1xuICAgIGNvbnN0IGJhY2t1cERpciA9IGAke3RyYW5zYWN0aW9uRGlyfS9iYWNrdXBgO1xuICAgIGNvbnN0IGpvdXJuYWxQYXRoID0gYCR7dHJhbnNhY3Rpb25EaXJ9L3RyYW5zYWN0aW9uLmpzb25gO1xuICAgIGF3YWl0IG1rZGlycChhZGFwdGVyLCBiYWNrdXBEaXIpO1xuICAgIGNvbnN0IHRhcmdldHMgPSBbLi4ubmV3IFNldChbLi4ucGxhbi53cml0ZXMsIC4uLmRlbGV0aW9uc10pXTtcbiAgICBjb25zdCBvcmlnaW5hbHM6IEFycmF5PHsgcGF0aDogc3RyaW5nOyBleGlzdGVkOiBib29sZWFuIH0+ID0gW107XG4gICAgZm9yIChjb25zdCBwYXRoIG9mIHRhcmdldHMpIHtcbiAgICAgIGNvbnN0IGV4aXN0ZWQgPSBhd2FpdCBhZGFwdGVyLmV4aXN0cyhwYXRoKTsgb3JpZ2luYWxzLnB1c2goeyBwYXRoLCBleGlzdGVkIH0pO1xuICAgICAgaWYgKGV4aXN0ZWQpIGF3YWl0IHdyaXRlQmluYXJ5KGFkYXB0ZXIsIGAke2JhY2t1cERpcn0vJHtlbmNvZGVVUklDb21wb25lbnQocGF0aCl9YCwgYXdhaXQgYWRhcHRlci5yZWFkQmluYXJ5KHBhdGgpKTtcbiAgICB9XG4gICAgYXdhaXQgYWRhcHRlci53cml0ZShqb3VybmFsUGF0aCwgSlNPTi5zdHJpbmdpZnkoeyBvcmlnaW5hbHMgfSkpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHppcCA9IGF3YWl0IEpTWmlwLmxvYWRBc3luYyhhcmNoaXZlLCB7IGNyZWF0ZUZvbGRlcnM6IGZhbHNlLCBjaGVja0NSQzMyOiBmYWxzZSB9KTtcbiAgICAgIGZvciAoY29uc3QgcGF0aCBvZiBkZWxldGlvbnMpIGlmIChhd2FpdCBhZGFwdGVyLmV4aXN0cyhwYXRoKSkgYXdhaXQgYWRhcHRlci5yZW1vdmUocGF0aCk7XG4gICAgICBmb3IgKGNvbnN0IHBhdGggb2YgcGxhbi53cml0ZXMpIHtcbiAgICAgICAgcHJvZ3Jlc3MoYFdyaXRpbmcgJHtwYXRofVx1MjAyNmApO1xuICAgICAgICBhd2FpdCBta2RpcnAoYWRhcHRlciwgcGFyZW50KHBhdGgpKTtcbiAgICAgICAgY29uc3QgZW50cnkgPSB6aXAuZmlsZShwYXRoKTtcbiAgICAgICAgaWYgKCFlbnRyeSkgdGhyb3cgbmV3IEVycm9yKGBBcmNoaXZlIGVudHJ5IGRpc2FwcGVhcmVkOiAke3BhdGh9YCk7XG4gICAgICAgIGF3YWl0IHdyaXRlQmluYXJ5KGFkYXB0ZXIsIHBhdGgsIGF3YWl0IGVudHJ5LmFzeW5jKFwidWludDhhcnJheVwiKSk7XG4gICAgICB9XG4gICAgICBjb25zdCBuZXh0T3duZWQgPSB7IC4uLnByZXZpb3VzLm93bmVkRmlsZXMsIFtwbGFuLnJlbGVhc2UucmVsZWFzZUlkXTogcGxhbi5yZWxlYXNlLmZpbGVzLm1hcCgoZmlsZSkgPT4gKHsgLi4uZmlsZSB9KSkgfTtcbiAgICAgIGF3YWl0IHRoaXMuc2F2ZURhdGEoeyAuLi50aGlzLmdldERhdGEoKSwgaW5zdGFsbGVkOiB7XG4gICAgICAgIHRyYWNraW5nVmVyc2lvbjogMixcbiAgICAgICAgcmVsZWFzZVZlcnNpb246IHBsYW4ucmVsZWFzZS5yZWxlYXNlVmVyc2lvbixcbiAgICAgICAgcmVsZWFzZUlkOiBwbGFuLnJlbGVhc2UucmVsZWFzZUlkLFxuICAgICAgICBhcHBsaWVkUmVsZWFzZUlkczogWy4uLm5ldyBTZXQoWy4uLihwcmV2aW91cy5hcHBsaWVkUmVsZWFzZUlkcyA/PyBbXSksIHBsYW4ucmVsZWFzZS5yZWxlYXNlSWRdKV0sXG4gICAgICAgIG93bmVkRmlsZXM6IG5leHRPd25lZCxcbiAgICAgIH0gfSk7XG4gICAgICBhd2FpdCByZW1vdmVUcmVlKGFkYXB0ZXIsIHRyYW5zYWN0aW9uRGlyKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgYXdhaXQgdGhpcy5yb2xsYmFjayhhZGFwdGVyLCBvcmlnaW5hbHMsIGJhY2t1cERpcik7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIHJvbGxiYWNrKGFkYXB0ZXI6IERhdGFBZGFwdGVyLCBvcmlnaW5hbHM6IEFycmF5PHsgcGF0aDogc3RyaW5nOyBleGlzdGVkOiBib29sZWFuIH0+LCBiYWNrdXBEaXI6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGZvciAoY29uc3Qgb3JpZ2luYWwgb2Ygb3JpZ2luYWxzLnJldmVyc2UoKSkge1xuICAgICAgaWYgKG9yaWdpbmFsLmV4aXN0ZWQpIGF3YWl0IHdyaXRlQmluYXJ5KGFkYXB0ZXIsIG9yaWdpbmFsLnBhdGgsIGF3YWl0IGFkYXB0ZXIucmVhZEJpbmFyeShgJHtiYWNrdXBEaXJ9LyR7ZW5jb2RlVVJJQ29tcG9uZW50KG9yaWdpbmFsLnBhdGgpfWApKTtcbiAgICAgIGVsc2UgaWYgKGF3YWl0IGFkYXB0ZXIuZXhpc3RzKG9yaWdpbmFsLnBhdGgpKSBhd2FpdCBhZGFwdGVyLnJlbW92ZShvcmlnaW5hbC5wYXRoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIHJlcG9ydCh0cmFuc2FjdGlvbjogVXBkYXRlVHJhbnNhY3Rpb24sIHN0YXR1czogXCJzdWNjZXNzXCIgfCBcImZhaWxlZFwiKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgdGhpcy5hcGkoYC91cGRhdGVzL3RyYW5zYWN0aW9ucy8ke2VuY29kZVVSSUNvbXBvbmVudCh0cmFuc2FjdGlvbi5pZCl9L3Jlc3VsdGAsIFwiUE9TVFwiLCB7IHN0YXR1cyB9LCB0cmFuc2FjdGlvbik7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGFwaShwYXRoOiBzdHJpbmcsIG1ldGhvZDogXCJHRVRcIiB8IFwiUE9TVFwiLCBib2R5Pzogb2JqZWN0LCB0cmFuc2FjdGlvbj86IFVwZGF0ZVRyYW5zYWN0aW9uKTogUHJvbWlzZTxSZWNvcmQ8c3RyaW5nLCB1bmtub3duPj4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYCR7V09SS0VSX1VSTH0ke3BhdGh9YCwgeyBtZXRob2QsIGhlYWRlcnM6IHsgLi4uKGJvZHkgPyB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0gOiB7fSksIC4uLih0cmFuc2FjdGlvbiA/IGF1dGhIZWFkZXJzKHRyYW5zYWN0aW9uKSA6IHt9KSB9LCBib2R5OiBib2R5ID8gSlNPTi5zdHJpbmdpZnkoYm9keSkgOiB1bmRlZmluZWQgfSk7XG4gICAgY29uc3QganNvbiA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKS5jYXRjaCgoKSA9PiAoe30pKTtcbiAgICBpZiAoIXJlc3BvbnNlLm9rKSB0aHJvdyBuZXcgRXJyb3IodHlwZW9mIGpzb24uZXJyb3IgPT09IFwic3RyaW5nXCIgPyBqc29uLmVycm9yIDogYFVwZGF0ZSBzZXJ2aWNlIHJlcXVlc3QgZmFpbGVkIChIVFRQICR7cmVzcG9uc2Uuc3RhdHVzfSkuYCk7XG4gICAgcmV0dXJuIGpzb24gYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj47XG4gIH1cblxuICBwcml2YXRlIGFwcFZlcnNpb24oKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICBjb25zdCBhcHAgPSB0aGlzLmFwcCBhcyB1bmtub3duIGFzIHsgdmVyc2lvbj86IHVua25vd247IGFwcFZlcnNpb24/OiB1bmtub3duOyB2YXVsdDogeyBnZXRDb25maWc/OiAoa2V5OiBzdHJpbmcpID0+IHVua25vd24gfSB9O1xuICAgIGNvbnN0IGdsb2JhbEFwcCA9IChnbG9iYWxUaGlzIGFzIHVua25vd24gYXMgeyBhcHA/OiB7IHZlcnNpb24/OiB1bmtub3duOyBhcHBWZXJzaW9uPzogdW5rbm93biB9IH0pLmFwcDtcbiAgICBjb25zdCBjYW5kaWRhdGVzID0gW2FwcC52ZXJzaW9uLCBhcHAuYXBwVmVyc2lvbiwgZ2xvYmFsQXBwPy52ZXJzaW9uLCBnbG9iYWxBcHA/LmFwcFZlcnNpb24sIGFwcC52YXVsdC5nZXRDb25maWc/LihcImFwcFZlcnNpb25cIildO1xuICAgIHJldHVybiBjYW5kaWRhdGVzLmZpbmQoKHZhbHVlKTogdmFsdWUgaXMgc3RyaW5nID0+IHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiAmJiAvXlxcZCtcXC5cXGQrXFwuXFxkKy8udGVzdCh2YWx1ZSkpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGF1dGhIZWFkZXJzKHRyYW5zYWN0aW9uOiBVcGRhdGVUcmFuc2FjdGlvbik6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4geyByZXR1cm4geyBcIlgtVXBkYXRlLVRyYW5zYWN0aW9uXCI6IHRyYW5zYWN0aW9uLmlkLCBcIkF1dGhvcml6YXRpb25cIjogYEJlYXJlciAke3RyYW5zYWN0aW9uLnRva2VufWAgfTsgfVxuZnVuY3Rpb24gaXNTb3VyY2UodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBTb3VyY2UgeyByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiAodmFsdWUgYXMgU291cmNlKS5zb3VyY2VJZCA9PT0gXCJzdHJpbmdcIiAmJiB0eXBlb2YgKHZhbHVlIGFzIFNvdXJjZSkubmFtZSA9PT0gXCJzdHJpbmdcIiAmJiB0eXBlb2YgKHZhbHVlIGFzIFNvdXJjZSkucHJpb3JpdHkgPT09IFwibnVtYmVyXCIgJiYgdHlwZW9mICh2YWx1ZSBhcyBTb3VyY2UpLnN1cHBvcnRzUmFuZ2UgPT09IFwiYm9vbGVhblwiOyB9XG5mdW5jdGlvbiBzY29yZShzb3VyY2U6IFNvdXJjZSwgcHJvYmU6IFByb2JlUmVzdWx0KTogbnVtYmVyIHsgcmV0dXJuIChwcm9iZS5sYXRlbmN5TXMgPz8gNjBfMDAwKSArIHNvdXJjZS5wcmlvcml0eSAqIDI1IC0gKHByb2JlLmJ5dGVzID8/IDApIC8gNDA5NjsgfVxuZnVuY3Rpb24gYXNOdW1iZXIodmFsdWU6IHVua25vd24pOiBudW1iZXIgfCB1bmRlZmluZWQgeyByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiICYmIE51bWJlci5pc0Zpbml0ZSh2YWx1ZSkgPyB2YWx1ZSA6IHVuZGVmaW5lZDsgfVxuZnVuY3Rpb24gYXNTdHJpbmcodmFsdWU6IHVua25vd24pOiBzdHJpbmcgfCB1bmRlZmluZWQgeyByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiID8gdmFsdWUgOiB1bmRlZmluZWQ7IH1cbmZ1bmN0aW9uIHppcEVudHJ5U2l6ZShlbnRyeTogSlNaaXAuSlNaaXBPYmplY3QpOiBudW1iZXIgfCB1bmRlZmluZWQge1xuICBjb25zdCBzaXplID0gKGVudHJ5IGFzIHVua25vd24gYXMgeyBfZGF0YT86IHsgdW5jb21wcmVzc2VkU2l6ZT86IHVua25vd24gfSB9KS5fZGF0YT8udW5jb21wcmVzc2VkU2l6ZTtcbiAgcmV0dXJuIHR5cGVvZiBzaXplID09PSBcIm51bWJlclwiICYmIE51bWJlci5pc1NhZmVJbnRlZ2VyKHNpemUpICYmIHNpemUgPj0gMCA/IHNpemUgOiB1bmRlZmluZWQ7XG59XG5mdW5jdGlvbiBwYXJlbnQocGF0aDogc3RyaW5nKTogc3RyaW5nIHsgY29uc3QgaW5kZXggPSBwYXRoLmxhc3RJbmRleE9mKFwiL1wiKTsgcmV0dXJuIGluZGV4ID09PSAtMSA/IFwiXCIgOiBwYXRoLnNsaWNlKDAsIGluZGV4KTsgfVxuYXN5bmMgZnVuY3Rpb24gbWtkaXJwKGFkYXB0ZXI6IERhdGFBZGFwdGVyLCBwYXRoOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgaWYgKCFwYXRoKSByZXR1cm47XG4gIGxldCBjdXJyZW50ID0gXCJcIjtcbiAgZm9yIChjb25zdCBzZWdtZW50IG9mIHBhdGguc3BsaXQoXCIvXCIpKSB7XG4gICAgY3VycmVudCA9IGN1cnJlbnQgPyBgJHtjdXJyZW50fS8ke3NlZ21lbnR9YCA6IHNlZ21lbnQ7XG4gICAgaWYgKCEoYXdhaXQgYWRhcHRlci5leGlzdHMoY3VycmVudCkpKSBhd2FpdCBhZGFwdGVyLm1rZGlyKGN1cnJlbnQpO1xuICB9XG59XG5hc3luYyBmdW5jdGlvbiB3cml0ZUJpbmFyeShhZGFwdGVyOiBEYXRhQWRhcHRlciwgcGF0aDogc3RyaW5nLCBkYXRhOiBBcnJheUJ1ZmZlciB8IFVpbnQ4QXJyYXkpOiBQcm9taXNlPHZvaWQ+IHsgY29uc3QgY29weSA9IG5ldyBVaW50OEFycmF5KGRhdGEgaW5zdGFuY2VvZiBVaW50OEFycmF5ID8gZGF0YSA6IG5ldyBVaW50OEFycmF5KGRhdGEpKTsgYXdhaXQgbWtkaXJwKGFkYXB0ZXIsIHBhcmVudChwYXRoKSk7IGF3YWl0IGFkYXB0ZXIud3JpdGVCaW5hcnkocGF0aCwgY29weS5idWZmZXIpOyB9XG5hc3luYyBmdW5jdGlvbiByZW1vdmVUcmVlKGFkYXB0ZXI6IERhdGFBZGFwdGVyLCBwYXRoOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHsgaWYgKGF3YWl0IGFkYXB0ZXIuZXhpc3RzKHBhdGgpKSBhd2FpdCBhZGFwdGVyLnJtZGlyKHBhdGgsIHRydWUpOyB9XG5hc3luYyBmdW5jdGlvbiBhc3NlcnROb1JlcGFyc2VQb2ludHMoYXBwOiBBcHAsIHZhdWx0UGF0aDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IGJhc2VQYXRoID0gKGFwcC52YXVsdC5hZGFwdGVyIGFzIHVua25vd24gYXMgeyBnZXRCYXNlUGF0aD86ICgpID0+IHN0cmluZyB9KS5nZXRCYXNlUGF0aD8uKCk7XG4gIGNvbnN0IHJlcXVpcmVGbiA9IChnbG9iYWxUaGlzIGFzIHVua25vd24gYXMgeyByZXF1aXJlPzogKG5hbWU6IHN0cmluZykgPT4geyBsc3RhdDogKHBhdGg6IHN0cmluZykgPT4gUHJvbWlzZTx7IGlzU3ltYm9saWNMaW5rOiAoKSA9PiBib29sZWFuIH0+IH0gfSkucmVxdWlyZTtcbiAgaWYgKCFiYXNlUGF0aCB8fCAhcmVxdWlyZUZuKSByZXR1cm47XG4gIGNvbnN0IGZzID0gcmVxdWlyZUZuKFwiZnMvcHJvbWlzZXNcIik7XG4gIGxldCBjdXJyZW50ID0gYmFzZVBhdGg7XG4gIGZvciAoY29uc3Qgc2VnbWVudCBvZiB2YXVsdFBhdGguc3BsaXQoXCIvXCIpKSB7XG4gICAgY3VycmVudCA9IGAke2N1cnJlbnR9LyR7c2VnbWVudH1gO1xuICAgIHRyeSB7XG4gICAgICBpZiAoKGF3YWl0IGZzLmxzdGF0KGN1cnJlbnQpKS5pc1N5bWJvbGljTGluaygpKSB0aHJvdyBuZXcgRXJyb3IoYFJlZnVzaW5nIHRvIHRyYXZlcnNlIGEgbGluayBvciByZXBhcnNlIHBvaW50OiAke3ZhdWx0UGF0aH1gKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgaWYgKChlcnJvciBhcyB7IGNvZGU/OiBzdHJpbmcgfSkuY29kZSAhPT0gXCJFTk9FTlRcIikgdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9XG59XG4iLCAiZXhwb3J0IGNvbnN0IE1BTklGRVNUX0JBU0VfVVJMID0gXCJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vdGJzcGVkaWEvdGJwZWRpYS11cGRhdGUvbWFpbi9tYW5pZmVzdHNcIjtcbmV4cG9ydCBjb25zdCBXT1JLRVJfVVJMID0gXCJodHRwczovL2NmdXBkYXRlLnRicGVkaWEub3JnXCI7XG5cbmV4cG9ydCBjb25zdCBTVVBQT1JURURfTEFOR1VBR0VTID0gW1wiZW5cIiwgXCJqYVwiLCBcImZyXCIsIFwiZXNcIiwgXCJkZVwiLCBcIm5sXCIsIFwic3ZcIiwgXCJrb1wiLCBcInpoLVRXXCIsIFwiemgtQ05cIiwgXCJ2aVwiLCBcImlkXCIsIFwidGhcIiwgXCJib1wiXSBhcyBjb25zdDtcbmV4cG9ydCB0eXBlIFN1cHBvcnRlZExhbmd1YWdlID0gdHlwZW9mIFNVUFBPUlRFRF9MQU5HVUFHRVNbbnVtYmVyXTtcblxuZXhwb3J0IGNvbnN0IE1BTkFHRURfUk9PVFMgPSBbXG4gIFwiMDAgXHU4QUFBXHU2NjBFXCIsIFwiMDEgXHU2NTg3XHU5NkM2XHU5MEU4XCIsIFwiMDIgXHU5NThCXHU3OTNBXHU5MEU4XCIsIFwiMDMgXHU3RDkzXHU4NUNGXHU5MEU4XCIsIFwiMDQgXHU5ODBDXHU4MjA3XHU2MjEyXHU1RjhCXCIsXG4gIFwiMDUgXHU1MEIzXHU2Q0Q1XHU5MEU4XCIsIFwiMDYgXHU1QkM2XHU2Q0Q1XHU1MTAwXHU4RUNDXCIsIFwiMDcgXHU0RjVCXHU4QTlFXHU1MTc4XHU4NUNGXCIsIFwiMDggXHU1MTc2XHU0RUQ2XHU5ODVFXHU1MjI1XCIsIFwiMDkgXHU4NEVFXHU5OTk5XHU0RTBBXHU1RTJCXCIsXG4gIFwiMTAgXHU3NzFGXHU0RjVCXHU1Qjk3XCIsIFwiMjAgXHU1QzA4XHU5ODRDXCIsIFwiNTAgXHU1MjE3XHU4ODY4XCIsIFwiNjAgXHU1QzBFXHU4QjgwXCIsIFwiNzAgXHU4MENDXHU2NjZGXHU4Q0M3XHU2NTk5XCIsIFwiOTAgXHU1RTZCXHU1MkE5XCIsXG4gIFwiOTggXHU0RTBCXHU4RjA5XHU4Q0M3XHU2NTk5XCIsIFwiOTkgU2V0dGluZ1wiXG5dIGFzIGNvbnN0O1xuXG5leHBvcnQgaW50ZXJmYWNlIEZpbGVDaGFuZ2UgeyBwYXRoOiBzdHJpbmc7IGNoYW5nZTogXCIrXCIgfCBcIi1cIiB8IFwiflwiOyB9XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVsZWFzZUVudHJ5IHtcbiAgcmVsZWFzZVZlcnNpb246IHN0cmluZztcbiAgcmVsZWFzZUlkOiBzdHJpbmc7XG4gIHB1Ymxpc2hlZEF0OiBzdHJpbmc7XG4gIGZpbGVuYW1lOiBzdHJpbmc7XG4gIGRlcGVuZHNPbj86IHN0cmluZ1tdO1xuICBmaWxlczogRmlsZUNoYW5nZVtdO1xuICBkZWxldGlvbnM6IHN0cmluZ1tdO1xuICByZWxlYXNlTm90ZXM6IHsgc3VtbWFyeTogc3RyaW5nOyBhZGRlZDogbnVtYmVyOyB1cGRhdGVkOiBudW1iZXI7IHJlbW92ZWQ6IG51bWJlciB9O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJlbGVhc2VNYW5pZmVzdCB7XG4gIHNjaGVtYVZlcnNpb246IDI7XG4gIHByb2R1Y3Q6IFwiVGJwZWRpYS1EaXN0cmlidXRlXCI7XG4gIHBsdWdpbjogXCJ0YnBlZGlhLXVwZGF0ZVwiO1xuICBjaGFubmVsOiBcInN0YWJsZVwiO1xuICB0aXRsZTogc3RyaW5nO1xuICBjb2xsZWN0aW9uOiB7XG4gICAgbGFuZ3VhZ2U6IHsgY29kZTogc3RyaW5nIH07XG4gICAgc2VyaWVzOiB7IGlkOiBzdHJpbmcgfTtcbiAgICBlZGl0aW9uOiB7IGlkOiBzdHJpbmcgfTtcbiAgfTtcbiAgbWluaW11bVBsdWdpblZlcnNpb246IHN0cmluZztcbiAgQ29sbGVjdGlvbjogc3RyaW5nO1xuICBtaW5pbXVtT2JzaWRpYW5WZXJzaW9uOiBzdHJpbmc7XG4gIG1hbmFnZWRSb290czogc3RyaW5nW107XG4gIHJlbGVhc2VzOiBSZWxlYXNlRW50cnlbXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJbnN0YWxsZWRTdGF0ZSB7XG4gIHRyYWNraW5nVmVyc2lvbj86IDI7XG4gIHJlbGVhc2VWZXJzaW9uPzogc3RyaW5nO1xuICByZWxlYXNlSWQ/OiBzdHJpbmc7XG4gIGFwcGxpZWRSZWxlYXNlSWRzOiBzdHJpbmdbXTtcbiAgb3duZWRGaWxlczogUmVjb3JkPHN0cmluZywgRmlsZUNoYW5nZVtdPjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQbHVnaW5EYXRhIHtcbiAgY2hlY2tGb3JVcGRhdGVzT25TdGFydHVwOiBib29sZWFuO1xuICBsYW5ndWFnZUNvZGU/OiBTdXBwb3J0ZWRMYW5ndWFnZTtcbiAgaW50ZXJmYWNlTGFuZ3VhZ2U/OiBTdXBwb3J0ZWRMYW5ndWFnZTtcbiAgbm90aWZpZWRSZWxlYXNlSWRzPzogc3RyaW5nW107XG4gIHNlcmllc0lkOiBzdHJpbmc7XG4gIGVkaXRpb25JZDogc3RyaW5nO1xuICBDb2xsZWN0aW9uOiBzdHJpbmc7XG4gIGluc3RhbGxlZDogSW5zdGFsbGVkU3RhdGU7XG4gIGJhc2VSZWxlYXNlPzogeyByZWxlYXNlVmVyc2lvbj86IHN0cmluZzsgcmVsZWFzZUlkPzogc3RyaW5nIH07XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU291cmNlIHtcbiAgc291cmNlSWQ6IHN0cmluZztcbiAgbmFtZTogc3RyaW5nO1xuICByZWdpb24/OiBzdHJpbmc7XG4gIHByaW9yaXR5OiBudW1iZXI7XG4gIHN1cHBvcnRzUmFuZ2U6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVXBkYXRlVHJhbnNhY3Rpb24ge1xuICBpZDogc3RyaW5nO1xuICB0b2tlbjogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFByb2JlUmVzdWx0IHtcbiAgc291cmNlSWQ6IHN0cmluZztcbiAgaGVhbHRoeTogYm9vbGVhbjtcbiAgbGF0ZW5jeU1zPzogbnVtYmVyO1xuICBieXRlcz86IG51bWJlcjtcbiAgZXJyb3I/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVXBkYXRlUGxhbiB7XG4gIG1hbmlmZXN0OiBSZWxlYXNlTWFuaWZlc3Q7XG4gIHJlbGVhc2U6IFJlbGVhc2VFbnRyeTtcbiAgd3JpdGVzOiBzdHJpbmdbXTtcbiAgZGVsZXRpb25zOiBzdHJpbmdbXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBVcGRhdGVCYXRjaCB7XG4gIG1hbmlmZXN0OiBSZWxlYXNlTWFuaWZlc3Q7XG4gIHJlbGVhc2VzOiBSZWxlYXNlRW50cnlbXTtcbn1cbiIsICJpbXBvcnQgeyBNQU5BR0VEX1JPT1RTIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuY29uc3QgUkVTRVJWRUQgPSAvXihjb258cHJufGF1eHxudWx8Y29tWzEtOV18bHB0WzEtOV0pKFxcLi4qKT8kL2k7XG5jb25zdCBPQlNJRElBTl9GSUxFUyA9IG5ldyBTZXQoW1xuICBcIi5vYnNpZGlhbi9hcHAuanNvblwiLCBcIi5vYnNpZGlhbi9hcHBlYXJhbmNlLmpzb25cIiwgXCIub2JzaWRpYW4vY29tbXVuaXR5LXBsdWdpbnMuanNvblwiLFxuICBcIi5vYnNpZGlhbi9ob3RrZXlzLmpzb25cIiwgXCIub2JzaWRpYW4vd29ya3NwYWNlLmpzb25cIiwgXCIub2JzaWRpYW4vd29ya3NwYWNlLW1vYmlsZS5qc29uXCJcbl0pO1xuXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplUGF0aCh2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHZhbHVlLm5vcm1hbGl6ZShcIk5GQ1wiKS5yZXBsYWNlKC9cXFxcL2csIFwiL1wiKS5yZXBsYWNlKC9cXC8rL2csIFwiL1wiKS5yZXBsYWNlKC9eXFwuXFwvLywgXCJcIik7XG59XG5cbi8qKiBQYXRocyBhcmUgYWx3YXlzIHJlbGF0aXZlIHRvIHRoZSBjdXJyZW50IHZhdWx0IHJvb3QuICovXG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0TWFuYWdlZFBhdGgodmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XG4gIGNvbnN0IHBhdGggPSBub3JtYWxpemVQYXRoKHZhbHVlKTtcbiAgaWYgKCFwYXRoIHx8IHBhdGguaW5jbHVkZXMoXCJcXDBcIikgfHwgcGF0aC5zdGFydHNXaXRoKFwiL1wiKSB8fCAvXltBLVphLXpdOi8udGVzdChwYXRoKSkgdGhyb3cgbmV3IEVycm9yKGBVbnNhZmUgcGF0aDogJHt2YWx1ZX1gKTtcbiAgY29uc3Qgc2VnbWVudHMgPSBwYXRoLnNwbGl0KFwiL1wiKTtcbiAgaWYgKHNlZ21lbnRzLnNvbWUoKHNlZ21lbnQpID0+ICFzZWdtZW50IHx8IHNlZ21lbnQgPT09IFwiLlwiIHx8IHNlZ21lbnQgPT09IFwiLi5cIiB8fCAvWzw+OlwifD8qXS8udGVzdChzZWdtZW50KSB8fCBSRVNFUlZFRC50ZXN0KHNlZ21lbnQpKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgVW5zYWZlIHBhdGg6ICR7dmFsdWV9YCk7XG4gIH1cbiAgY29uc3QgdG9wTGV2ZWwgPSBzZWdtZW50c1swXTtcbiAgaWYgKChNQU5BR0VEX1JPT1RTIGFzIHJlYWRvbmx5IHN0cmluZ1tdKS5pbmNsdWRlcyh0b3BMZXZlbCkpIHtcbiAgICByZXR1cm4gcGF0aDtcbiAgfVxuICBpZiAoT0JTSURJQU5fRklMRVMuaGFzKHBhdGgpIHx8ICghcGF0aC5pbmNsdWRlcyhcIi9cIikgJiYgIXBhdGguc3RhcnRzV2l0aChcIi5cIikpKSByZXR1cm4gcGF0aDtcbiAgdGhyb3cgbmV3IEVycm9yKGBQYXRoIGlzIG91dHNpZGUgdGhlIG1hbmFnZWQgYm91bmRhcnk6ICR7dmFsdWV9YCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbnN1cmVOb1BhdGhDb25mbGljdHMocGF0aHM6IHN0cmluZ1tdKTogdm9pZCB7XG4gIGNvbnN0IHNvcnRlZCA9IFsuLi5wYXRoc10uc29ydCgpO1xuICBmb3IgKGxldCBpID0gMTsgaSA8IHNvcnRlZC5sZW5ndGg7IGkgKz0gMSkge1xuICAgIGlmIChzb3J0ZWRbaV0uc3RhcnRzV2l0aChgJHtzb3J0ZWRbaSAtIDFdfS9gKSkgdGhyb3cgbmV3IEVycm9yKGBGaWxlL2RpcmVjdG9yeSBwYXRoIGNvbmZsaWN0OiAke3NvcnRlZFtpIC0gMV19YCk7XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBNQU5BR0VEX1JPT1RTLCBSZWxlYXNlRW50cnksIFJlbGVhc2VNYW5pZmVzdCB9IGZyb20gXCIuL3R5cGVzXCI7XG5pbXBvcnQgeyBhc3NlcnRNYW5hZ2VkUGF0aCB9IGZyb20gXCIuL3BhdGgtcG9saWN5XCI7XG5cbmNvbnN0IFJFUVVJUkVEX1NUUklOR19GSUVMRFMgPSBbXCJ0aXRsZVwiLCBcIm1pbmltdW1QbHVnaW5WZXJzaW9uXCIsIFwibWluaW11bU9ic2lkaWFuVmVyc2lvblwiXSBhcyBjb25zdDtcblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlQW5kVmFsaWRhdGVNYW5pZmVzdChpbnB1dDogdW5rbm93bik6IFJlbGVhc2VNYW5pZmVzdCB7XG4gIGlmICghaXNSZWNvcmQoaW5wdXQpKSB0aHJvdyBuZXcgRXJyb3IoXCJSZWxlYXNlIG1hbmlmZXN0IG11c3QgYmUgYSBKU09OIG9iamVjdC5cIik7XG4gIGZvciAoY29uc3QgZm9yYmlkZGVuIG9mIFtcInNpZ25hdHVyZVwiLCBcInBheWxvYWRcIiwgXCJjb2xsZWN0aW9uS2V5XCIsIFwic2hhMjU2XCIsIFwic2l6ZVwiLCBcImRvd25sb2FkVXJsXCIsIFwidXJsXCJdKSB7XG4gICAgaWYgKGZvcmJpZGRlbiBpbiBpbnB1dCkgdGhyb3cgbmV3IEVycm9yKGBNYW5pZmVzdCBjb250YWlucyB1bnN1cHBvcnRlZCBmaWVsZDogJHtmb3JiaWRkZW59LmApO1xuICB9XG4gIGlmIChpbnB1dC5zY2hlbWFWZXJzaW9uICE9PSAyIHx8IGlucHV0LnByb2R1Y3QgIT09IFwiVGJwZWRpYS1EaXN0cmlidXRlXCIgfHwgaW5wdXQucGx1Z2luICE9PSBcInRicGVkaWEtdXBkYXRlXCIpIHRocm93IG5ldyBFcnJvcihcIlRoaXMgaXMgbm90IGEgc3VwcG9ydGVkIGluY3JlbWVudGFsIFRicGVkaWEgcmVsZWFzZSBtYW5pZmVzdC5cIik7XG4gIGlmIChpbnB1dC5jaGFubmVsICE9PSBcInN0YWJsZVwiKSB0aHJvdyBuZXcgRXJyb3IoXCJPbmx5IHRoZSBzdGFibGUgcmVsZWFzZSBjaGFubmVsIGlzIHN1cHBvcnRlZC5cIik7XG4gIGlmICh0eXBlb2YgaW5wdXQuQ29sbGVjdGlvbiAhPT0gXCJzdHJpbmdcIiB8fCAhL15WWzEtOV1cXGQqJC8udGVzdChpbnB1dC5Db2xsZWN0aW9uKSkgdGhyb3cgbmV3IEVycm9yKFwiQ29sbGVjdGlvbiBtdXN0IGJlIGEgdmVyc2lvbiBzdWNoIGFzIFYxLlwiKTtcbiAgZm9yIChjb25zdCBmaWVsZCBvZiBSRVFVSVJFRF9TVFJJTkdfRklFTERTKSBpZiAodHlwZW9mIGlucHV0W2ZpZWxkXSAhPT0gXCJzdHJpbmdcIiB8fCAhaW5wdXRbZmllbGRdLnRyaW0oKSkgdGhyb3cgbmV3IEVycm9yKGBNYW5pZmVzdCBmaWVsZCAke2ZpZWxkfSBpcyBpbnZhbGlkLmApO1xuICBpZiAoIWlzUmVjb3JkKGlucHV0LmNvbGxlY3Rpb24pIHx8ICFpc0NvbGxlY3Rpb25QYXJ0KGlucHV0LmNvbGxlY3Rpb24ubGFuZ3VhZ2UsIFwiY29kZVwiKSB8fCAhaXNDb2xsZWN0aW9uUGFydChpbnB1dC5jb2xsZWN0aW9uLnNlcmllcywgXCJpZFwiKSB8fCAhaXNDb2xsZWN0aW9uUGFydChpbnB1dC5jb2xsZWN0aW9uLmVkaXRpb24sIFwiaWRcIikpIHRocm93IG5ldyBFcnJvcihcIkNvbGxlY3Rpb24gaWRlbnRpdHkgaXMgaW52YWxpZC5cIik7XG4gIGNvbnN0IGNvbGxlY3Rpb24gPSBpbnB1dC5jb2xsZWN0aW9uIGFzIFJlbGVhc2VNYW5pZmVzdFtcImNvbGxlY3Rpb25cIl07XG4gIGNvbnN0IHJlbGVhc2VLZXkgPSBbY29sbGVjdGlvbi5sYW5ndWFnZS5jb2RlLCBjb2xsZWN0aW9uLnNlcmllcy5pZCwgY29sbGVjdGlvbi5lZGl0aW9uLmlkXS5qb2luKFwiLVwiKS50b0xvd2VyQ2FzZSgpO1xuICBpZiAoIUFycmF5LmlzQXJyYXkoaW5wdXQubWFuYWdlZFJvb3RzKSB8fCAhc2FtZVNldChpbnB1dC5tYW5hZ2VkUm9vdHMsIFsuLi5NQU5BR0VEX1JPT1RTXSkpIHRocm93IG5ldyBFcnJvcihcIm1hbmFnZWRSb290cyBkb2VzIG5vdCBtYXRjaCB0aGUgYXBwcm92ZWQgYm91bmRhcnkuXCIpO1xuICBpZiAoIUFycmF5LmlzQXJyYXkoaW5wdXQucmVsZWFzZXMpIHx8IGlucHV0LnJlbGVhc2VzLmxlbmd0aCA9PT0gMCkgdGhyb3cgbmV3IEVycm9yKFwicmVsZWFzZXMgbXVzdCBiZSBhIG5vbi1lbXB0eSBhcnJheS5cIik7XG5cbiAgY29uc3QgZXhpc3RpbmdQYXRocyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICBjb25zdCByZWxlYXNlcyA9IGlucHV0LnJlbGVhc2VzLm1hcCgoZW50cnkpID0+IHtcbiAgICBjb25zdCByZWxlYXNlID0gcGFyc2VSZWxlYXNlKGVudHJ5LCByZWxlYXNlS2V5LCBleGlzdGluZ1BhdGhzKTtcbiAgICBmb3IgKGNvbnN0IGZpbGUgb2YgcmVsZWFzZS5maWxlcykge1xuICAgICAgaWYgKGZpbGUuY2hhbmdlID09PSBcIi1cIikgZXhpc3RpbmdQYXRocy5kZWxldGUoZmlsZS5wYXRoKTtcbiAgICAgIGVsc2UgZXhpc3RpbmdQYXRocy5hZGQoZmlsZS5wYXRoKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlbGVhc2U7XG4gIH0pO1xuICBjb25zdCBpZHMgPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHJlbGVhc2VzLmxlbmd0aDsgaW5kZXggKz0gMSkge1xuICAgIGNvbnN0IHJlbGVhc2UgPSByZWxlYXNlc1tpbmRleF07XG4gICAgaWYgKGlkcy5oYXMocmVsZWFzZS5yZWxlYXNlSWQpKSB0aHJvdyBuZXcgRXJyb3IoYER1cGxpY2F0ZSByZWxlYXNlSWQ6ICR7cmVsZWFzZS5yZWxlYXNlSWR9LmApO1xuICAgIGZvciAoY29uc3QgZGVwZW5kZW5jeSBvZiByZWxlYXNlLmRlcGVuZHNPbiA/PyBbXSkge1xuICAgICAgaWYgKCFpZHMuaGFzKGRlcGVuZGVuY3kpKSB0aHJvdyBuZXcgRXJyb3IoYFJlbGVhc2UgJHtyZWxlYXNlLnJlbGVhc2VJZH0gZGVwZW5kcyBvbiAke2RlcGVuZGVuY3l9LCB3aGljaCBtdXN0IGJlIGFuIGVhcmxpZXIgcmVsZWFzZSBpbiB0aGlzIG1hbmlmZXN0LmApO1xuICAgIH1cbiAgICBpZHMuYWRkKHJlbGVhc2UucmVsZWFzZUlkKTtcbiAgICBpZiAoaW5kZXggPiAwICYmIGNvbXBhcmVSZWxlYXNlKHJlbGVhc2VzW2luZGV4IC0gMV0sIHJlbGVhc2UpID49IDApIHRocm93IG5ldyBFcnJvcihcInJlbGVhc2VzIG11c3QgYmUgaW4gc3RyaWN0bHkgaW5jcmVhc2luZyB2ZXJzaW9uIGFuZCBwdWJsaWNhdGlvbiBvcmRlci5cIik7XG4gIH1cbiAgaWYgKHJlbGVhc2VzLnNvbWUoKHJlbGVhc2UpID0+IHJlbGVhc2UuZGVwZW5kc09uICE9PSB1bmRlZmluZWQpICYmIGNvbXBhcmVWZXJzaW9ucyhpbnB1dC5taW5pbXVtUGx1Z2luVmVyc2lvbiwgXCIxLjIuMFwiKSA8IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJNYW5pZmVzdHMgdXNpbmcgZGVwZW5kc09uIG11c3QgcmVxdWlyZSBtaW5pbXVtUGx1Z2luVmVyc2lvbiAxLjIuMCBvciBuZXdlci5cIik7XG4gIH1cbiAgcmV0dXJuIHsgLi4uaW5wdXQsIHJlbGVhc2VzIH0gYXMgUmVsZWFzZU1hbmlmZXN0O1xufVxuXG5mdW5jdGlvbiBwYXJzZVJlbGVhc2UoaW5wdXQ6IHVua25vd24sIGV4cGVjdGVkS2V5OiBzdHJpbmcsIGV4aXN0aW5nUGF0aHM6IFNldDxzdHJpbmc+KTogUmVsZWFzZUVudHJ5IHtcbiAgaWYgKCFpc1JlY29yZChpbnB1dCkpIHRocm93IG5ldyBFcnJvcihcIkVhY2ggcmVsZWFzZSBtdXN0IGJlIGFuIG9iamVjdC5cIik7XG4gIGZvciAoY29uc3QgZmllbGQgb2YgW1wicmVsZWFzZVZlcnNpb25cIiwgXCJyZWxlYXNlSWRcIiwgXCJwdWJsaXNoZWRBdFwiLCBcImZpbGVuYW1lXCJdIGFzIGNvbnN0KSBpZiAodHlwZW9mIGlucHV0W2ZpZWxkXSAhPT0gXCJzdHJpbmdcIiB8fCAhaW5wdXRbZmllbGRdLnRyaW0oKSkgdGhyb3cgbmV3IEVycm9yKGBSZWxlYXNlIGZpZWxkICR7ZmllbGR9IGlzIGludmFsaWQuYCk7XG4gIGNvbnN0IHZlcnNpb24gPSBwYXJzZVJlbGVhc2VWZXJzaW9uKGlucHV0LnJlbGVhc2VWZXJzaW9uKTtcbiAgaWYgKCF2ZXJzaW9uIHx8IHZlcnNpb24ua2V5ICE9PSBleHBlY3RlZEtleSkgdGhyb3cgbmV3IEVycm9yKGByZWxlYXNlVmVyc2lvbiBtdXN0IGhhdmUgdGhlIGZvcm1hdCAke2V4cGVjdGVkS2V5fS1ZWVlZLk0uRC5gKTtcbiAgY29uc3QgcmVsZWFzZUlkID0gcGFyc2VSZWxlYXNlSWQoaW5wdXQucmVsZWFzZUlkKTtcbiAgaWYgKCFyZWxlYXNlSWQgfHwgcmVsZWFzZUlkLmtleSAhPT0gZXhwZWN0ZWRLZXkpIHRocm93IG5ldyBFcnJvcihgcmVsZWFzZUlkIG11c3QgaGF2ZSB0aGUgZm9ybWF0ICR7ZXhwZWN0ZWRLZXl9LVlZWVktTS1ELnNlcXVlbmNlLCBmb3IgZXhhbXBsZSAke2V4cGVjdGVkS2V5fS0yMDI2LTEwLTEuMS5gKTtcbiAgaWYgKHJlbGVhc2VJZC55ZWFyICE9PSB2ZXJzaW9uLnllYXIgfHwgcmVsZWFzZUlkLm1vbnRoICE9PSB2ZXJzaW9uLm1vbnRoIHx8IHJlbGVhc2VJZC5kYXkgIT09IHZlcnNpb24uZGF5KSB0aHJvdyBuZXcgRXJyb3IoXCJyZWxlYXNlSWQgZGF0ZSBtdXN0IG1hdGNoIHJlbGVhc2VWZXJzaW9uLlwiKTtcbiAgaWYgKE51bWJlci5pc05hTihEYXRlLnBhcnNlKGlucHV0LnB1Ymxpc2hlZEF0KSkpIHRocm93IG5ldyBFcnJvcihcInB1Ymxpc2hlZEF0IG11c3QgYmUgSVNPLTg2MDEuXCIpO1xuICBpZiAoIUFycmF5LmlzQXJyYXkoaW5wdXQuZmlsZXMpIHx8ICFBcnJheS5pc0FycmF5KGlucHV0LmRlbGV0aW9ucykpIHRocm93IG5ldyBFcnJvcihcImZpbGVzIGFuZCBkZWxldGlvbnMgbXVzdCBiZSBhcnJheXMuXCIpO1xuICBpZiAoaW5wdXQuZGVwZW5kc09uICE9PSB1bmRlZmluZWQgJiYgKCFBcnJheS5pc0FycmF5KGlucHV0LmRlcGVuZHNPbikgfHwgaW5wdXQuZGVwZW5kc09uLnNvbWUoKGlkOiB1bmtub3duKSA9PiB0eXBlb2YgaWQgIT09IFwic3RyaW5nXCIgfHwgIWlkLnRyaW0oKSkgfHwgbmV3IFNldChpbnB1dC5kZXBlbmRzT24pLnNpemUgIT09IGlucHV0LmRlcGVuZHNPbi5sZW5ndGgpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBSZWxlYXNlICR7aW5wdXQucmVsZWFzZUlkfSBkZXBlbmRzT24gbXVzdCBiZSBhbiBhcnJheSBvZiB1bmlxdWUgcmVsZWFzZSBJRHMuYCk7XG4gIH1cbiAgY29uc3QgZmlsZXMgPSBpbnB1dC5maWxlcy5tYXAoKGVudHJ5KSA9PiB7XG4gICAgaWYgKCFpc1JlY29yZChlbnRyeSkgfHwgdHlwZW9mIGVudHJ5LnBhdGggIT09IFwic3RyaW5nXCIpIHRocm93IG5ldyBFcnJvcihcIkVhY2ggZmlsZSBlbnRyeSBuZWVkcyBhIHBhdGguXCIpO1xuICAgIGNvbnN0IHBhdGggPSBhc3NlcnRNYW5hZ2VkUGF0aChlbnRyeS5wYXRoKTtcbiAgICBjb25zdCBjaGFuZ2UgPSBlbnRyeS5jaGFuZ2UgPz8gKGV4aXN0aW5nUGF0aHMuaGFzKHBhdGgpID8gXCJ+XCIgOiBcIitcIik7XG4gICAgaWYgKGNoYW5nZSAhPT0gXCIrXCIgJiYgY2hhbmdlICE9PSBcIi1cIiAmJiBjaGFuZ2UgIT09IFwiflwiKSB0aHJvdyBuZXcgRXJyb3IoXCJGaWxlIGNoYW5nZSBtdXN0IGJlICssIC0sIG9yIH4uXCIpO1xuICAgIHJldHVybiB7IHBhdGgsIGNoYW5nZSB9O1xuICB9KTtcbiAgY29uc3QgZGVsZXRpb25zID0gaW5wdXQuZGVsZXRpb25zLm1hcCgocGF0aCkgPT4ge1xuICAgIGlmICh0eXBlb2YgcGF0aCAhPT0gXCJzdHJpbmdcIikgdGhyb3cgbmV3IEVycm9yKFwiRWFjaCBkZWxldGlvbiBtdXN0IGJlIGEgcGF0aC5cIik7XG4gICAgcmV0dXJuIGFzc2VydE1hbmFnZWRQYXRoKHBhdGgpO1xuICB9KTtcbiAgZm9yIChjb25zdCBwYXRoIG9mIGRlbGV0aW9ucykge1xuICAgIGNvbnN0IGZpbGUgPSBmaWxlcy5maW5kKChlbnRyeSkgPT4gZW50cnkucGF0aCA9PT0gcGF0aCk7XG4gICAgaWYgKGZpbGUgJiYgZmlsZS5jaGFuZ2UgIT09IFwiLVwiKSB0aHJvdyBuZXcgRXJyb3IoXCJBIGRlbGV0aW9uIGNvbmZsaWN0cyB3aXRoIGEgZmlsZSB3cml0ZS5cIik7XG4gICAgaWYgKCFmaWxlKSBmaWxlcy5wdXNoKHsgcGF0aCwgY2hhbmdlOiBcIi1cIiB9KTtcbiAgfVxuICBjb25zdCBhbGxQYXRocyA9IGZpbGVzLm1hcCgoZmlsZSkgPT4gZmlsZS5wYXRoKTtcbiAgaWYgKG5ldyBTZXQoYWxsUGF0aHMpLnNpemUgIT09IGFsbFBhdGhzLmxlbmd0aCkgdGhyb3cgbmV3IEVycm9yKGBSZWxlYXNlICR7aW5wdXQucmVsZWFzZUlkfSBjb250YWlucyBkdXBsaWNhdGUgb3IgY29uZmxpY3RpbmcgcGF0aHMuYCk7XG4gIGlmICghaXNSZWNvcmQoaW5wdXQucmVsZWFzZU5vdGVzKSB8fCB0eXBlb2YgaW5wdXQucmVsZWFzZU5vdGVzLnN1bW1hcnkgIT09IFwic3RyaW5nXCIgfHwgIVtcImFkZGVkXCIsIFwidXBkYXRlZFwiLCBcInJlbW92ZWRcIl0uZXZlcnkoKGtleSkgPT4gdHlwZW9mIGlucHV0LnJlbGVhc2VOb3Rlc1trZXldID09PSBcIm51bWJlclwiICYmIGlucHV0LnJlbGVhc2VOb3Rlc1trZXldID49IDApKSB0aHJvdyBuZXcgRXJyb3IoXCJyZWxlYXNlTm90ZXMgaXMgaW52YWxpZC5cIik7XG4gIHJldHVybiB7IHJlbGVhc2VWZXJzaW9uOiBpbnB1dC5yZWxlYXNlVmVyc2lvbiwgcmVsZWFzZUlkOiBpbnB1dC5yZWxlYXNlSWQsIHB1Ymxpc2hlZEF0OiBpbnB1dC5wdWJsaXNoZWRBdCwgZmlsZW5hbWU6IGlucHV0LmZpbGVuYW1lLCAuLi4oaW5wdXQuZGVwZW5kc09uICE9PSB1bmRlZmluZWQgPyB7IGRlcGVuZHNPbjogaW5wdXQuZGVwZW5kc09uIH0gOiB7fSksIGZpbGVzLCBkZWxldGlvbnM6IGZpbGVzLmZpbHRlcigoZmlsZSkgPT4gZmlsZS5jaGFuZ2UgPT09IFwiLVwiKS5tYXAoKGZpbGUpID0+IGZpbGUucGF0aCksIHJlbGVhc2VOb3RlczogaW5wdXQucmVsZWFzZU5vdGVzIGFzIFJlbGVhc2VFbnRyeVtcInJlbGVhc2VOb3Rlc1wiXSB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29tcGFyZVZlcnNpb25zKGE6IHN0cmluZywgYjogc3RyaW5nKTogbnVtYmVyIHtcbiAgY29uc3QgcGFyc2UgPSAodmFsdWU6IHN0cmluZykgPT4gdmFsdWUucmVwbGFjZSgvXnYvLCBcIlwiKS5zcGxpdCgvWy4rLV0vKS5zbGljZSgwLCAzKS5tYXAoKHBhcnQpID0+IE51bWJlci5wYXJzZUludChwYXJ0LCAxMCkgfHwgMCk7XG4gIGNvbnN0IGxlZnQgPSBwYXJzZShhKTsgY29uc3QgcmlnaHQgPSBwYXJzZShiKTtcbiAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IDM7IGluZGV4ICs9IDEpIGlmIChsZWZ0W2luZGV4XSAhPT0gcmlnaHRbaW5kZXhdKSByZXR1cm4gbGVmdFtpbmRleF0gLSByaWdodFtpbmRleF07XG4gIHJldHVybiAwO1xufVxuLyoqIENvbXBhcmVzIHJlYWRhYmxlIGNvbGxlY3Rpb24gcmVsZWFzZSB2ZXJzaW9ucywgd2hpbGUgYWNjZXB0aW5nIGxlZ2FjeSBkYXRlLW9ubHkgc3RvcmVkIHZlcnNpb25zLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbXBhcmVSZWxlYXNlVmVyc2lvbnMoYTogc3RyaW5nLCBiOiBzdHJpbmcpOiBudW1iZXIge1xuICBjb25zdCBsZWZ0ID0gcGFyc2VSZWxlYXNlVmVyc2lvbihhKTsgY29uc3QgcmlnaHQgPSBwYXJzZVJlbGVhc2VWZXJzaW9uKGIpO1xuICBpZiAoIWxlZnQgfHwgIXJpZ2h0KSByZXR1cm4gY29tcGFyZVZlcnNpb25zKGEsIGIpO1xuICByZXR1cm4gY29tcGFyZURhdGVzKGxlZnQsIHJpZ2h0KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjb21wYXJlUmVsZWFzZShhOiBSZWxlYXNlRW50cnksIGI6IFJlbGVhc2VFbnRyeSk6IG51bWJlciB7XG4gIGNvbnN0IHZlcnNpb24gPSBjb21wYXJlUmVsZWFzZVZlcnNpb25zKGEucmVsZWFzZVZlcnNpb24sIGIucmVsZWFzZVZlcnNpb24pO1xuICBpZiAodmVyc2lvbikgcmV0dXJuIHZlcnNpb247XG4gIGNvbnN0IHNlcXVlbmNlID0gcGFyc2VSZWxlYXNlSWQoYS5yZWxlYXNlSWQpIS5zZXF1ZW5jZSAtIHBhcnNlUmVsZWFzZUlkKGIucmVsZWFzZUlkKSEuc2VxdWVuY2U7XG4gIHJldHVybiBzZXF1ZW5jZSB8fCBEYXRlLnBhcnNlKGEucHVibGlzaGVkQXQpIC0gRGF0ZS5wYXJzZShiLnB1Ymxpc2hlZEF0KTtcbn1cbmZ1bmN0aW9uIHBhcnNlUmVsZWFzZVZlcnNpb24odmFsdWU6IHN0cmluZyk6IHsga2V5Pzogc3RyaW5nOyB5ZWFyOiBudW1iZXI7IG1vbnRoOiBudW1iZXI7IGRheTogbnVtYmVyIH0gfCB1bmRlZmluZWQge1xuICBjb25zdCBtYXRjaCA9IC9eKD86KFthLXowLTldKyg/Oi1bYS16MC05XSspKiktKT8oXFxkezR9KVxcLihcXGR7MSwyfSlcXC4oXFxkezEsMn0pJC8uZXhlYyh2YWx1ZSk7XG4gIHJldHVybiBtYXRjaCAmJiB2YWxpZERhdGUoTnVtYmVyKG1hdGNoWzJdKSwgTnVtYmVyKG1hdGNoWzNdKSwgTnVtYmVyKG1hdGNoWzRdKSkgPyB7IGtleTogbWF0Y2hbMV0sIHllYXI6IE51bWJlcihtYXRjaFsyXSksIG1vbnRoOiBOdW1iZXIobWF0Y2hbM10pLCBkYXk6IE51bWJlcihtYXRjaFs0XSkgfSA6IHVuZGVmaW5lZDtcbn1cbmZ1bmN0aW9uIHBhcnNlUmVsZWFzZUlkKHZhbHVlOiBzdHJpbmcpOiB7IGtleT86IHN0cmluZzsgeWVhcjogbnVtYmVyOyBtb250aDogbnVtYmVyOyBkYXk6IG51bWJlcjsgc2VxdWVuY2U6IG51bWJlciB9IHwgdW5kZWZpbmVkIHtcbiAgY29uc3QgbWF0Y2ggPSAvXig/OihbYS16MC05XSsoPzotW2EtejAtOV0rKSopLSk/KFxcZHs0fSktKFxcZHsxLDJ9KS0oXFxkezEsMn0pXFwuKFxcZCspJC8uZXhlYyh2YWx1ZSk7XG4gIGlmICghbWF0Y2gpIHJldHVybiB1bmRlZmluZWQ7XG4gIGNvbnN0IHllYXIgPSBOdW1iZXIobWF0Y2hbMl0pOyBjb25zdCBtb250aCA9IE51bWJlcihtYXRjaFszXSk7IGNvbnN0IGRheSA9IE51bWJlcihtYXRjaFs0XSk7IGNvbnN0IHNlcXVlbmNlID0gTnVtYmVyKG1hdGNoWzVdKTtcbiAgcmV0dXJuIHZhbGlkRGF0ZSh5ZWFyLCBtb250aCwgZGF5KSAmJiBOdW1iZXIuaXNTYWZlSW50ZWdlcihzZXF1ZW5jZSkgJiYgc2VxdWVuY2UgPj0gMSA/IHsga2V5OiBtYXRjaFsxXSwgeWVhciwgbW9udGgsIGRheSwgc2VxdWVuY2UgfSA6IHVuZGVmaW5lZDtcbn1cbmZ1bmN0aW9uIGNvbXBhcmVEYXRlcyhhOiB7IHllYXI6IG51bWJlcjsgbW9udGg6IG51bWJlcjsgZGF5OiBudW1iZXIgfSwgYjogeyB5ZWFyOiBudW1iZXI7IG1vbnRoOiBudW1iZXI7IGRheTogbnVtYmVyIH0pOiBudW1iZXIgeyByZXR1cm4gYS55ZWFyIC0gYi55ZWFyIHx8IGEubW9udGggLSBiLm1vbnRoIHx8IGEuZGF5IC0gYi5kYXk7IH1cbmZ1bmN0aW9uIHZhbGlkRGF0ZSh5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXIsIGRheTogbnVtYmVyKTogYm9vbGVhbiB7IGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShEYXRlLlVUQyh5ZWFyLCBtb250aCAtIDEsIGRheSkpOyByZXR1cm4gZGF0ZS5nZXRVVENGdWxsWWVhcigpID09PSB5ZWFyICYmIGRhdGUuZ2V0VVRDTW9udGgoKSA9PT0gbW9udGggLSAxICYmIGRhdGUuZ2V0VVRDRGF0ZSgpID09PSBkYXk7IH1cbmZ1bmN0aW9uIGlzQ29sbGVjdGlvblBhcnQodmFsdWU6IHVua25vd24sIGlkZW50aXR5OiBcImNvZGVcIiB8IFwiaWRcIik6IHZhbHVlIGlzIFJlY29yZDxzdHJpbmcsIHN0cmluZz4geyByZXR1cm4gaXNSZWNvcmQodmFsdWUpICYmIHR5cGVvZiB2YWx1ZVtpZGVudGl0eV0gPT09IFwic3RyaW5nXCIgJiYgdmFsdWVbaWRlbnRpdHldLnRyaW0oKS5sZW5ndGggPiAwOyB9XG5mdW5jdGlvbiBpc1JlY29yZCh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIFJlY29yZDxzdHJpbmcsIGFueT4geyByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmIHZhbHVlICE9PSBudWxsICYmICFBcnJheS5pc0FycmF5KHZhbHVlKTsgfVxuZnVuY3Rpb24gc2FtZVNldCh2YWx1ZXM6IHVua25vd25bXSwgZXhwZWN0ZWQ6IHN0cmluZ1tdKTogYm9vbGVhbiB7IHJldHVybiB2YWx1ZXMubGVuZ3RoID09PSBleHBlY3RlZC5sZW5ndGggJiYgbmV3IFNldCh2YWx1ZXMpLnNpemUgPT09IHZhbHVlcy5sZW5ndGggJiYgdmFsdWVzLmV2ZXJ5KCh2YWx1ZSkgPT4gdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiICYmIGV4cGVjdGVkLmluY2x1ZGVzKHZhbHVlKSk7IH1cbiIsICJpbXBvcnQgeyBGaWxlQ2hhbmdlLCBJbnN0YWxsZWRTdGF0ZSwgUmVsZWFzZU1hbmlmZXN0IH0gZnJvbSBcIi4vdHlwZXNcIjtcblxudHlwZSBMZWdhY3lGaWxlcyA9IFJlY29yZDxzdHJpbmcsIEFycmF5PHN0cmluZyB8IEZpbGVDaGFuZ2U+PiB8IHN0cmluZ1tdO1xuXG5leHBvcnQgZnVuY3Rpb24gbWlncmF0ZU93bmVkRmlsZXModmFsdWU6IExlZ2FjeUZpbGVzLCBpbnN0YWxsZWQ6IEluc3RhbGxlZFN0YXRlLCBtYW5pZmVzdD86IFJlbGVhc2VNYW5pZmVzdCk6IFJlY29yZDxzdHJpbmcsIEZpbGVDaGFuZ2VbXT4ge1xuICBjb25zdCBzb3VyY2UgPSBBcnJheS5pc0FycmF5KHZhbHVlKSA/IHsgbGVnYWN5OiB2YWx1ZSB9IDogdmFsdWU7XG4gIGNvbnN0IGdyb3VwczogUmVjb3JkPHN0cmluZywgRmlsZUNoYW5nZVtdPiA9IHt9O1xuICBmb3IgKGNvbnN0IFtpZCwgZW50cmllc10gb2YgT2JqZWN0LmVudHJpZXMoc291cmNlKSkge1xuICAgIGdyb3Vwc1tpZF0gPSBlbnRyaWVzLm1hcCgoZW50cnkpID0+IHR5cGVvZiBlbnRyeSA9PT0gXCJzdHJpbmdcIiA/IHsgcGF0aDogZW50cnksIGNoYW5nZTogXCIrXCIgfSA6IHsgLi4uZW50cnkgfSk7XG4gIH1cbiAgaWYgKG1hbmlmZXN0KSB7XG4gICAgZm9yIChjb25zdCByZWxlYXNlIG9mIG1hbmlmZXN0LnJlbGVhc2VzKSB7XG4gICAgICBpZiAoIWluc3RhbGxlZC5hcHBsaWVkUmVsZWFzZUlkcy5pbmNsdWRlcyhyZWxlYXNlLnJlbGVhc2VJZCkgJiYgaW5zdGFsbGVkLnJlbGVhc2VJZCAhPT0gcmVsZWFzZS5yZWxlYXNlSWQpIGNvbnRpbnVlO1xuICAgICAgY29uc3Qga25vd24gPSBuZXcgU2V0KHJlbGVhc2UuZmlsZXMubWFwKChmaWxlKSA9PiBmaWxlLnBhdGgpKTtcbiAgICAgIGdyb3Vwc1tyZWxlYXNlLnJlbGVhc2VJZF0gPSBbLi4ucmVsZWFzZS5maWxlcy5tYXAoKGZpbGUpID0+ICh7IC4uLmZpbGUgfSkpLCAuLi4oZ3JvdXBzW3JlbGVhc2UucmVsZWFzZUlkXSA/PyBbXSkuZmlsdGVyKChmaWxlKSA9PiAha25vd24uaGFzKGZpbGUucGF0aCkpXTtcbiAgICAgIGlmIChncm91cHMubGVnYWN5KSBncm91cHMubGVnYWN5ID0gZ3JvdXBzLmxlZ2FjeS5maWx0ZXIoKGZpbGUpID0+ICFrbm93bi5oYXMoZmlsZS5wYXRoKSk7XG4gICAgfVxuICAgIGlmIChncm91cHMubGVnYWN5Py5sZW5ndGggPT09IDApIGRlbGV0ZSBncm91cHMubGVnYWN5O1xuICB9XG4gIHJldHVybiBncm91cHM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjdXJyZW50T3duZWRQYXRocyhpbnN0YWxsZWQ6IEluc3RhbGxlZFN0YXRlKTogU2V0PHN0cmluZz4ge1xuICBjb25zdCBvd25lZCA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICBjb25zdCBvcmRlciA9IFsuLi5uZXcgU2V0KFsuLi5PYmplY3Qua2V5cyhpbnN0YWxsZWQub3duZWRGaWxlcykuZmlsdGVyKChpZCkgPT4gIWluc3RhbGxlZC5hcHBsaWVkUmVsZWFzZUlkcy5pbmNsdWRlcyhpZCkpLCAuLi5pbnN0YWxsZWQuYXBwbGllZFJlbGVhc2VJZHNdKV07XG4gIGZvciAoY29uc3QgaWQgb2Ygb3JkZXIpIHtcbiAgICBmb3IgKGNvbnN0IGZpbGUgb2YgaW5zdGFsbGVkLm93bmVkRmlsZXNbaWRdID8/IFtdKSB7XG4gICAgICBpZiAoZmlsZS5jaGFuZ2UgPT09IFwiLVwiKSBvd25lZC5kZWxldGUoZmlsZS5wYXRoKTtcbiAgICAgIGVsc2Ugb3duZWQuYWRkKGZpbGUucGF0aCk7XG4gICAgfVxuICB9XG4gIHJldHVybiBvd25lZDtcbn1cclxuIiwgImltcG9ydCB7IFBsdWdpbkRhdGEgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG4vKiogUHJlc2VydmUgdGhlIHN0YXJ0aW5nIHJlbGVhc2U7IGRvIG5vdCBtaXN0YWtlIGEgbGF0ZXIgaW5zdGFsbGVkIHVwZGF0ZSBmb3IgaXQuICovXG5leHBvcnQgZnVuY3Rpb24gaW5pdGlhbGl6ZUJhc2VSZWxlYXNlKGRhdGE6IFBsdWdpbkRhdGEpOiBOb25OdWxsYWJsZTxQbHVnaW5EYXRhW1wiYmFzZVJlbGVhc2VcIl0+IHtcbiAgaWYgKGRhdGEuYmFzZVJlbGVhc2UpIHJldHVybiBkYXRhLmJhc2VSZWxlYXNlO1xuICBjb25zdCBsZWdhY3kgPSBkYXRhLmluc3RhbGxlZC5hcHBsaWVkUmVsZWFzZUlkc1xuICAgIC5tYXAoKGlkKSA9PiAoeyBpZCwgbWF0Y2g6IC9eKFxcZHs0fSktKFxcZHsxLDJ9KS0oXFxkezEsMn0pXFwuKFxcZCspJC8uZXhlYyhpZCkgfSkpXG4gICAgLmZpbHRlcigoZW50cnkpID0+IGVudHJ5Lm1hdGNoICE9PSBudWxsKVxuICAgIC5zb3J0KChhLCBiKSA9PiB7XG4gICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSA0OyBpKyspIHtcbiAgICAgICAgY29uc3QgZGlmZmVyZW5jZSA9IE51bWJlcihhLm1hdGNoIVtpXSkgLSBOdW1iZXIoYi5tYXRjaCFbaV0pO1xuICAgICAgICBpZiAoZGlmZmVyZW5jZSkgcmV0dXJuIGRpZmZlcmVuY2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gMDtcbiAgICB9KVswXTtcbiAgaWYgKGxlZ2FjeSkgcmV0dXJuIHsgcmVsZWFzZVZlcnNpb246IGAke2xlZ2FjeS5tYXRjaCFbMV19LiR7TnVtYmVyKGxlZ2FjeS5tYXRjaCFbMl0pfS4ke051bWJlcihsZWdhY3kubWF0Y2ghWzNdKX1gLCByZWxlYXNlSWQ6IGxlZ2FjeS5pZCB9O1xuICBpZiAoZGF0YS5pbnN0YWxsZWQudHJhY2tpbmdWZXJzaW9uICE9PSAyICYmIE9iamVjdC5rZXlzKGRhdGEuaW5zdGFsbGVkLm93bmVkRmlsZXMpLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiB7IHJlbGVhc2VWZXJzaW9uOiBkYXRhLmluc3RhbGxlZC5yZWxlYXNlVmVyc2lvbiwgcmVsZWFzZUlkOiBkYXRhLmluc3RhbGxlZC5yZWxlYXNlSWQgfTtcbiAgfVxuICByZXR1cm4ge307XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBLGtGQUFBQSxTQUFBO0FBWUEsTUFBQyxTQUFTLEdBQUU7QUFBQyxVQUFHLFlBQVUsT0FBTyxXQUFTLGVBQWEsT0FBT0EsUUFBTyxDQUFBQSxRQUFPLFVBQVEsRUFBRTtBQUFBLGVBQVUsY0FBWSxPQUFPLFVBQVEsT0FBTyxJQUFJLFFBQU8sQ0FBQyxHQUFFLENBQUM7QUFBQSxXQUFNO0FBQUMsU0FBQyxlQUFhLE9BQU8sU0FBTyxTQUFPLGVBQWEsT0FBTyxTQUFPLFNBQU8sZUFBYSxPQUFPLE9BQUssT0FBSyxNQUFNLFFBQU0sRUFBRTtBQUFBLE1BQUM7QUFBQSxJQUFDLEdBQUUsV0FBVTtBQUFDLGNBQU8sU0FBUyxFQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsaUJBQVMsRUFBRSxHQUFFQyxJQUFFO0FBQUMsY0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFFO0FBQUMsZ0JBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRTtBQUFDLGtCQUFJLElBQUUsY0FBWSxP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R0FBRSxJQUFHLENBQUMsU0FBUyxHQUFFLEdBQUUsR0FBRTtBQUFDO0FBQWEsWUFBSSxLQUFFLFdBQVU7QUFBQyxtQkFBUUQsSUFBRUMsS0FBRSxDQUFDLEdBQUVDLEtBQUUsR0FBRUEsS0FBRSxLQUFJQSxNQUFJO0FBQUMsWUFBQUYsS0FBRUU7QUFBRSxxQkFBUSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUksQ0FBQUYsS0FBRSxJQUFFQSxLQUFFLGFBQVdBLE9BQUksSUFBRUEsT0FBSTtBQUFFLFlBQUFDLEdBQUVDLEVBQUMsSUFBRUY7QUFBQSxVQUFDO0FBQUMsaUJBQU9DO0FBQUEsUUFBQyxHQUFFO0FBQUUsVUFBRSxVQUFRLFNBQVNELElBQUVDLElBQUVDLElBQUUsR0FBRTtBQUFDLGNBQUksSUFBRSxHQUFFLElBQUUsSUFBRUE7QUFBRSxVQUFBRixNQUFHO0FBQUcsbUJBQVEsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFJLENBQUFBLEtBQUVBLE9BQUksSUFBRSxFQUFFLE9BQUtBLEtBQUVDLEdBQUUsQ0FBQyxFQUFFO0FBQUUsaUJBQU0sS0FBR0Q7QUFBQSxRQUFDO0FBQUEsTUFBQyxHQUFFLENBQUMsQ0FBQyxHQUFFLElBQUcsQ0FBQyxTQUFTLEdBQUUsR0FBRSxHQUFFO0FBQUM7QUFBYSxZQUFJLEdBQUUsSUFBRSxFQUFFLGlCQUFpQixHQUFFLElBQUUsRUFBRSxTQUFTLEdBQUUsSUFBRSxFQUFFLFdBQVcsR0FBRSxJQUFFLEVBQUUsU0FBUyxHQUFFLElBQUUsRUFBRSxZQUFZLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxJQUFHLElBQUUsSUFBRyxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxLQUFJLElBQUUsSUFBRyxJQUFFLElBQUcsSUFBRSxJQUFFLElBQUUsR0FBRSxJQUFFLElBQUcsSUFBRSxHQUFFLElBQUUsS0FBSSxJQUFFLElBQUUsSUFBRSxHQUFFLElBQUUsSUFBRyxJQUFFLEtBQUksSUFBRSxHQUFFLElBQUUsR0FB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R0FBRSxLQUFLLFNBQU8sR0FBRSxLQUFLLFNBQU8sTUFBSyxLQUFLLGNBQVksR0FBRSxLQUFLLE9BQUssTUFBSyxLQUFLLE9BQUssTUFBSyxLQUFLLFFBQU0sR0FBRSxLQUFLLFlBQVUsR0FBRSxLQUFLLFlBQVUsR0FBRSxLQUFLLFlBQVUsR0FBRSxLQUFLLGFBQVcsR0FBRSxLQUFLLGNBQVksR0FBRSxLQUFLLGVBQWEsR0FBRSxLQUFLLGFBQVcsR0FBRSxLQUFLLGtCQUFnQixHQUFFLEtBQUssV0FBUyxHQUFFLEtBQUssY0FBWSxHQUFFLEtBQUssWUFBVSxHQUFFLEtBQUssY0FBWSxHQUFFLEtBQUssbUJBQWlCLEdBQUUsS0FBSyxpQkFBZSxHQUFFLEtBQUssUUFBTSxHQUFFLEtBQUssV0FBUyxHQUFFLEtBQUssYUFBVyxHQUFFLEtBQUssYUFBVyxHQUFFLEtBQUssWUFBVSxJQUFJLEVBQUUsTUFBTSxJQUFFLENBQUMsR0FBRSxLQUFLLFlBQVUsSUFBSSxFQUFFLE1BQU0sS0FBRyxJQUFFLElBQUUsRUFBRSxHQUFFLEtBQUssVUFBUSxJQUFJLEVBQUUsTUFBTSxLQUFHLElBQUUsSUFBRSxFQUFFLEdBQUUsRUFBRSxLQUFLLFNBQVMsR0FBRSxFQUFFLEtBQUssU0FBUyxHQUFFLEVBQUUsS0FBSyxPQUFPLEdBQUUsS0FBSyxTQUFPLE1BQUssS0FBSyxTQUFPLE1BQUssS0FBSyxVQUFRLE1BQUssS0FBSyxXQUFTLElBQUksRUFBRSxNQUFNLElBQUUsQ0FBQyxHQUFFLEtBQUssT0FBSyxJQUFJLEVBQUUsTUFBTSxJQUFFLElBQUUsQ0FBQyxHQUFFLEVBQUUsS0FBSyxJQUFJLEdBQUUsS0FBSyxXQUFTLEdBQUUsS0FBSyxXQUFTLEdBQUUsS0FBSyxRQUFNLElBQUksRUFBRSxNQUFNLElBQUUsSUFBRSxDQUFDLEdBQUUsRUFBRSxLQUFLLEtBQUssR0FBRSxLQUFLLFFBQU0sR0FBRSxLQUFLLGNBQVksR0FBRSxLQUFLLFdBQVMsR0FBRSxLQUFLLFFBQU0sR0FBRSxLQUFLLFVBQVEsR0FBRSxLQUFLLGFBQVcs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QUFBSixHQUFFLFFBQU0sR0FBRSxFQUFFSSxJQUFFLEVBQUUsR0FBRSxFQUFFQSxJQUFFLEdBQUcsR0FBRSxFQUFFQSxJQUFFLENBQUMsR0FBRUEsR0FBRSxVQUFRLEVBQUVBLEtBQUdBLEdBQUUsT0FBTyxPQUFLLElBQUUsTUFBSUEsR0FBRSxPQUFPLE9BQUssSUFBRSxNQUFJQSxHQUFFLE9BQU8sUUFBTSxJQUFFLE1BQUlBLEdBQUUsT0FBTyxPQUFLLElBQUUsTUFBSUEsR0FBRSxPQUFPLFVBQVEsS0FBRyxFQUFFLEdBQUUsRUFBRUEsSUFBRSxNQUFJQSxHQUFFLE9BQU8sSUFBSSxHQUFFLEVBQUVBLElBQUVBLEdBQUUsT0FBTyxRQUFNLElBQUUsR0FBRyxHQUFFLEVBQUVBLElBQUVBLEdBQUUsT0FBTyxRQUFNLEtBQUcsR0FBRyxHQUFFLEVBQUVBLElBQUVBLEdBQUUsT0FBTyxRQUFNLEtBQUcsR0FBRyxHQUFFLEVBQUVBLElBQUUsTUFBSUEsR0FBRSxRQUFNLElBQUUsS0FBR0EsR0FBRSxZQUFVQSxHQUFFLFFBQU0sSUFBRSxJQUFFLENBQUMsR0FBRSxFQUFFQSxJQUFFLE1BQUlBLEdBQUUsT0FBTyxFQUFFLEdBQUVBLEdBQUUsT0FBTyxTQUFPQSxHQUFFLE9BQU8sTUFBTSxXQUFTLEVBQUVBLElBQUUsTUFBSUEsR0FBRSxPQUFPLE1BQU0sTUFBTSxHQUFFLEVBQUVBLElBQUVBLEdBQUUsT0FBTyxNQUFNLFVBQVEsSUFBRSxHQUFHLElBQUdBLEdBQUUsT0FBTyxTQUFPSixHQUFFLFFBQU0sRUFBRUEsR0FBRSxPQUFNSSxHQUFFLGFBQVlBLEdBQUUsU0FBUSxDQUFDLElBQUdBLEdBQUUsVUFBUSxHQUFFQSxHQUFFLFNBQU8sT0FBSyxFQUFFQSxJQUFFLENBQUMsR0FBRSxFQUFFQSxJQUFFLENBQUMsR0FBRSxFQUFFQSxJQUFFLENBQUMsR0FBRSxFQUFFQSxJQUFFLENBQUMsR0FBRSxFQUFFQSxJQUFFLENBQUMsR0FBRSxFQUFFQSxJQUFFLE1BQUlBLEdBQUUsUUFBTSxJQUFFLEtBQUdBLEdBQUUs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QUFBRyw0QkFBTTtBQUFBLG9CQUFDO0FBQUMsd0JBQUcsSUFBRSxJQUFHLElBQUUsT0FBSyxHQUFFO0FBQUMsMEJBQUcsS0FBRyxJQUFFLEdBQUUsSUFBRSxHQUFFO0FBQUMsNkJBQUksS0FBRyxHQUFFLEVBQUUsR0FBRyxJQUFFLEVBQUUsR0FBRyxHQUFFLEVBQUUsSUFBRztBQUFDLDRCQUFFLElBQUUsR0FBRSxJQUFFO0FBQUEsc0JBQUM7QUFBQSxvQkFBQyxXQUFTLElBQUUsR0FBRTtBQUFDLDBCQUFHLEtBQUcsSUFBRSxJQUFFLElBQUcsS0FBRyxLQUFHLEdBQUU7QUFBQyw2QkFBSSxLQUFHLEdBQUUsRUFBRSxHQUFHLElBQUUsRUFBRSxHQUFHLEdBQUUsRUFBRSxJQUFHO0FBQUMsNEJBQUcsSUFBRSxHQUFFLElBQUUsR0FBRTtBQUFDLCtCQUFJLEtBQUcsSUFBRSxHQUFFLEVBQUUsR0FBRyxJQUFFLEVBQUUsR0FBRyxHQUFFLEVBQUUsSUFBRztBQUFDLDhCQUFFLElBQUUsR0FBRSxJQUFFO0FBQUEsd0JBQUM7QUFBQSxzQkFBQztBQUFBLG9CQUFDLFdBQVMsS0FBRyxJQUFFLEdBQUUsSUFBRSxHQUFFO0FBQUMsMkJBQUksS0FBRyxHQUFFLEVBQUUsR0FBRyxJQUFFLEVBQUUsR0FBRyxHQUFFLEVBQUUsSUFBRztBQUFDLDBCQUFFLElBQUUsR0FBRSxJQUFFO0FBQUEsb0JBQUM7QUFBQywyQkFBSyxJQUFFLElBQUcsR0FBRSxHQUFHLElBQUUsRUFBRSxHQUFHLEdBQUUsRUFBRSxHQUFHLElBQUUsRUFBRSxHQUFHLEdBQUUsRUFBRSxHQUFHLElBQUUsRUFBRSxHQUFHLEdBQUUsS0FBRztBQUFFLDBCQUFJLEVBQUUsR0FBRyxJQUFFLEVBQUUsR0FBRyxHQUFFLElBQUUsTUFBSSxFQUFFLEdBQUcsSUFBRSxFQUFFLEdBQUc7QUFBQSxrQkFBRyxPQUFLO0FBQUMseUJBQUksSUFBRSxJQUFFLEdBQUUsRUFBRSxHQUFHLElBQUUsRUFBRSxHQUFHLEdBQUUsRUFBRSxHQUFHLElBQUUsRUFBRSxHQUFHLEdBQUUsRUFBRSxHQUFHLElBQUUsRUFBRSxHQUFHLEdBQUUsS0FBRyxLQUFHLEtBQUk7QUFBQywwQkFBSSxFQUFFLEdBQUcsSUFBRSxFQUFFLEdBQUcsR0FBRSxJQUFFLE1BQUksRUFBRSxHQUFHLElBQUUsRUFBRSxHQUFHO0FBQUEsa0JBQUc7QUFBQztBQUFBLGdCQUFLO0FBQUEsY0FBQztBQUFDO0FBQUEsWUFBSztBQUFBLFVBQUMsU0FBTyxJQUFFLEtBQUcsSUFBRTtBQUFHLGVBQUcsSUFBRSxLQUFHLEdBQUUsTUFBSSxNQUFJLEtBQUcsS0FBRyxNQUFJLEdBQUVGLEdBQUUsVUFBUSxHQUFFQSxHQUFFLFdBQVMsR0FBRUEsR0FBRSxXQUFTLElBQUUsSUFBRSxJQUFFLElBQUUsSUFBRSxLQUFHLElBQUUsSUFBR0EsR0FBRSxZQUFVLElBQUUsSUFBRSxJQUFFLElBQUUsTUFBSSxPQUFLLElBQUUsSUFBR0UsR0FBRSxPQUFLLEdBQUVBLEdBQUUsT0FBSztBQUFBLFFBQUM7QUFBQSxNQUFDLEdBQUUsQ0FBQyxDQUFDLEdBQUUsSUFBRyxDQUFDLFNBQVMsR0FBRSxHQUFFLEdBQUU7QUFBQztBQUFhLFlBQUksSUFBRSxFQUFFLGlCQUFpQixHQUFFLElBQUUsRUFBRSxXQUFXLEdBQUUsSUFBRSxFQUFFLFNBQVMsR0FBRSxJQUFFLEVBQUUsV0FBVyxHQUFFLElBQUUsRUFBRSxZQUFZLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxJQUFHLElBQUUsR0FBRSxJQUFFLEtBQUksSUFBRTtBQUFJLGlCQUFTLEVBQUVGLElBQUU7QUFBQyxrQkFBT0EsT0FBSSxLQUFHLFFBQU1BLE9BQUksSUFBRSxXQUFTLFFBQU1BLE9BQUksT0FBSyxNQUFJQSxPQUFJO0FBQUEsUUFBRztBQUFDLGlCQUFTLElBQUc7QUFBQyxlQUFLLE9BQUssR0FBRSxLQUFLLE9BQUssT0FBRyxLQUFLLE9BQUssR0FBRSxLQUFLLFdBQVMsT0FBRyxLQUFLLFFBQU0sR0FBRSxLQUFLLE9BQUssR0FBRSxLQUFLLFFBQU0sR0FBRSxLQUFLLFFBQU0sR0FBRSxLQUFLLE9BQUssTUFBSyxLQUFLLFFBQU0sR0FBRSxLQUFLLFFBQU0sR0FBRSxLQUFLLFFBQU0sR0FBRSxLQUFLLFFBQU0sR0FBRSxLQUFLLFNBQU8sTUFBSyxLQUFLLE9BQUssR0FBRSxLQUFLLE9BQUssR0FBRSxLQUFLLFNBQU8sR0FBRSxLQUFLLFNBQU8sR0FBRSxLQUFLLFFBQU0sR0FBRSxLQUFLLFVBQVEsTUFBSyxLQUFLLFdBQVMsTUFBSyxLQUFLLFVBQVEsR0FBRSxLQUFLLFdBQVMsR0FBRSxLQUFLLFFBQU0sR0FBRSxLQUFLLE9BQUssR0FBRSxLQUFLLFFBQU0sR0FBRSxLQUFLLE9BQUssR0FBRSxLQUFLLE9BQUssTUFBSyxLQUFLLE9BQUssSUFBSSxFQUFFLE1BQU0sR0FBRyxHQUFFLEtBQUssT0FBSyxJQUFJLEVBQUUsTUFBTSxHQUFHLEdBQUUsS0FBSyxTQUFPLE1BQUssS0FBSyxVQUFRLE1BQUssS0FBSyxPQUFLLEdBQUUsS0FBSyxPQUFLLEdBQUUsS0FBSyxNQUFJO0FBQUEsUUFBQztBQUFDLGlCQUFTLEVBQUVBLElBQUU7QUFBQyxjQUFJQztBQUFFLGlCQUFPRCxNQUFHQSxHQUFFLFNBQU9DLEtBQUVELEdBQUUsT0FBTUEsR0FBRSxXQUFTQSxHQUFFLFlBQVVDLEdBQUUsUUFBTSxHQUFFRCxHQUFFLE1BQUksSUFBR0MsR0FBRSxTQUFPRCxHQUFFLFFBQU0sSUFBRUMsR0FBRSxPQUFNQSxHQUFFLE9BQUssR0FBRUEsR0FBRSxPQUFLLEdBQUVBLEdBQUUsV0FBUyxHQUFFQSxHQUFFLE9BQUssT0FBTUEsR0FBRSxPQUFLLE1BQUtBLEdBQUUsT0FBSyxHQUFFQSxHQUFFLE9BQUssR0FBRUEsR0FBRSxVQUFRQSxHQUFFLFNBQU8sSUFBSSxFQUFFLE1BQU0sQ0FBQyxHQUFFQSxHQUFFLFdBQVNBLEdBQUUsVUFBUSxJQUFJLEVBQUUsTUFBTSxDQUFDLEdBQUVBLEdBQUUsT0FBSyxHQUFFQSxHQUFFLE9BQUssSUFBRyxLQUFHO0FBQUEsUUFBQztBQUFDLGlCQUFT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QUssUUFBTSxJQUFJLE1BQU1BLEdBQUUsS0FBSyxTQUFTLElBQUcsRUFBRSxTQUFTQSxHQUFFLEtBQUssT0FBTUUsSUFBRUUsSUFBRSxHQUFFLENBQUMsSUFBRyxNQUFJSixHQUFFLFVBQVFBLEdBQUUsUUFBTSxFQUFFQSxHQUFFLE9BQU1FLElBQUUsR0FBRUUsRUFBQyxJQUFHRSxNQUFHLEdBQUVGLE1BQUcsR0FBRUosR0FBRSxVQUFRLElBQUdBLEdBQUUsUUFBUSxPQUFNO0FBQUUsY0FBQUEsR0FBRSxTQUFPLEdBQUVBLEdBQUUsT0FBSztBQUFBLFlBQUUsS0FBSztBQUFFLGtCQUFHLE9BQUtBLEdBQUUsT0FBTTtBQUFDLG9CQUFHLE1BQUlNLEdBQUUsT0FBTTtBQUFFLHFCQUFJLElBQUUsR0FBRSxJQUFFSixHQUFFRSxLQUFFLEdBQUcsR0FBRUosR0FBRSxRQUFNLEtBQUdBLEdBQUUsU0FBTyxVQUFRQSxHQUFFLEtBQUssUUFBTSxPQUFPLGFBQWEsQ0FBQyxJQUFHLEtBQUcsSUFBRU0sS0FBRztBQUFDLG9CQUFHLE1BQUlOLEdBQUUsVUFBUUEsR0FBRSxRQUFNLEVBQUVBLEdBQUUsT0FBTUUsSUFBRSxHQUFFRSxFQUFDLElBQUdFLE1BQUcsR0FBRUYsTUFBRyxHQUFFLEVBQUUsT0FBTTtBQUFBLGNBQUMsTUFBTSxDQUFBSixHQUFFLFNBQU9BLEdBQUUsS0FBSyxPQUFLO0FBQU0sY0FBQUEsR0FBRSxTQUFPLEdBQUVBLEdBQUUsT0FBSztBQUFBLFlBQUUsS0FBSztBQUFFLGtCQUFHLE9BQUtBLEdBQUUsT0FBTTtBQUFDLG9CQUFHLE1BQUlNLEdBQUUsT0FBTTtBQUFFLHFCQUFJLElBQUUsR0FBRSxJQUFFSixHQUFFRSxLQUFFLEdBQUcsR0FBRUosR0FBRSxRQUFNLEtBQUdBLEdBQUUsU0FBTyxVQUFRQSxHQUFFLEtBQUssV0FBUyxPQUFPLGFBQWEsQ0FBQyxJQUFHLEtBQUcsSUFBRU0sS0FBRztBQUFDLG9CQUFHLE1BQUlOLEdBQUUsVUFBUUEsR0FBRSxRQUFNLEVBQUVBLEdBQUUsT0FBTUUsSUFB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QUFFLEdBQUUsR0FBRSxHQUFFLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsS0FBSSxLQUFJLEtBQUksS0FBSSxLQUFJLEtBQUksR0FBRSxDQUFDLEdBQUUsSUFBRSxDQUFDLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLEVBQUUsR0FBRSxJQUFFLENBQUMsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLEtBQUksS0FBSSxLQUFJLEtBQUksS0FBSSxLQUFJLE1BQUssTUFBSyxNQUFLLE1BQUssTUFBSyxNQUFLLE1BQUssT0FBTSxPQUFNLE9BQU0sR0FBRSxDQUFDLEdBQUUsSUFBRSxDQUFDLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsRUFBRTtBQUFFLFVBQUUsVUFBUSxTQUFTRixJQUFFQyxJQUFFQyxJQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGNBQUksR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsSUFBRSxFQUFFLE1BQUssSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsTUFBSyxJQUFFLEdBQUUsSUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEdBQUUsSUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEdBQUUsSUFBRSxNQUFLLElBQUU7QUFBRSxlQUFJLElBQUUsR0FBRSxLQUFHLElBQUcsSUFBSSxHQUFFLENBQUMsSUFBRTtBQUFFLGVBQUksSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFJLEdBQUVELEdBQUVDLEtBQUUsQ0FBQyxDQUFDO0FBQUksZUFBSSxJQUFFLEdBQUUsSUFBRSxJQUFHLEtBQUcsS0FBRyxNQUFJLEVBQUUsQ0FBQyxHQUFFLElBQUk7QUFBQyxjQUFHLElBQUUsTUFBSSxJQUFFLElBQUcsTUFBSSxFQUFFLFFBQU8sRUFBRSxHQUFHLElBQUUsVUFBUyxFQUFFLEdBQUcsSUFBRSxVQUFTLEVBQUUsT0FBSyxHQUFFO0FBQUUsZUFBSSxJQUFFLEdBQUUsSUFBRSxLQUFHLE1BQUksRUFBRSxDQUFDLEdBQUUsSUFBSTtBQUFDLGVBQUksSUFBRSxNQUFJLElBQUUsSUFBRyxJQUFFLElBQUUsR0FBRSxLQUFHLElBQUcsSUFBSSxLQUFHLE1BQUksSUFBRyxLQUFHLEVBQUUsQ0FBQyxLQUFHLEVBQUUsUUFBTTtBQUFHLGNBQUcsSUFBRSxNQUFJLE1BQUlGLE1BQUcsTUFBSSxHQUFHLFFBQU07QUFBRyxlQUFJLEVBQUUsQ0FBQyxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsSUFBRyxJQUFJLEdBQUUsSUFBRSxDQUFDLElBQUUsRUFBRSxDQUFDLElBQUUsRUFBRSxDQUFDO0FBQUUsZUFBSSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUksT0FBSUMsR0FBRUMsS0FBRSxDQUFDLE1BQUksRUFBRSxFQUFFRCxHQUFFQyxLQUFFLENBQUMsQ0FBQyxHQUFHLElBQUU7QUFBRyxjQUFHLElBQUUsTUFBSUYsTUFBRyxJQUFFLElBQUUsR0FBRSxNQUFJLE1BQUlBLE1BQUcsSUFBRSxHQUFFLEtBQUcsS0FBSSxJQUFFLEdBQUUsS0FBRyxLQUFJLFFBQU0sSUFBRSxHQUFFLElBQUUsR0FBRSxLQUFJLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxJQUFFLElBQUUsR0FBRSxJQUFFLElBQUcsS0FBRyxJQUFFLE1BQUksSUFBRSxNQUFJLEdBQUUsTUFBSUEsTUFBRyxNQUFJLEtBQUcsTUFBSUEsTUFBRyxNQUFJLEVBQUUsUUFBTztBQUFFLHFCQUFPO0FBQUMsaUJBQUksSUFBRSxJQUFFLEdBQUUsSUFBRSxFQUFFLENBQUMsSUFBRSxLQUFHLElBQUUsR0FBRSxFQUFFLENBQUMsS0FBRyxFQUFFLENBQUMsSUFBRSxLQUFHLElBQUUsRUFBRSxJQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUUsRUFBRSxJQUFFLEVBQUUsQ0FBQyxDQUFDLE1BQUksSUFBRSxJQUFHLElBQUcsSUFBRSxLQUFHLElBQUUsR0FBRSxJQUFFLElBQUUsS0FBRyxHQUFFLEVBQUUsS0FBRyxLQUFHLE1BQUksS0FBRyxFQUFFLElBQUUsS0FBRyxLQUFHLEtBQUcsS0FBRyxJQUFFLEdBQUUsTUFBSSxJQUFHO0FBQUMsaUJBQUksSUFBRSxLQUFHLElBQUUsR0FBRSxJQUFFLElBQUcsT0FBSTtBQUFFLGdCQUFHLE1BQUksS0FBRyxLQUFHLElBQUUsR0FBRSxLQUFHLEtBQUcsSUFBRSxHQUFFLEtBQUksS0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFFO0FBQUMsa0JBQUcsTUFBSSxFQUFFO0FBQU0sa0JBQUVDLEdBQUVDLEtBQUUsRUFBRSxDQUFDLENBQUM7QUFBQSxZQUFDO0FBQUMsZ0JBQUcsSUFBRSxNQUFJLElBQUUsT0FBSyxHQUFFO0FBQUMsbUJBQUksTUFBSSxNQUFJLElBQUUsSUFBRyxLQUFHLEdBQUUsSUFBRSxNQUFJLElBQUUsSUFBRSxJQUFHLElBQUUsSUFBRSxLQUFHLEdBQUcsS0FBRyxFQUFFLElBQUUsQ0FBQyxNQUFJLEtBQUksTUFBSSxNQUFJO0FBQUUsa0JBQUcsS0FBRyxLQUFHLEdBQUUsTUFBSUYsTUFBRyxNQUFJLEtBQUcsTUFBSUEsTUFBRyxNQUFJLEVBQUUsUUFBTztBQUFFLGdCQUFFLElBQUUsSUFBRSxDQUFDLElBQUUsS0FBRyxLQUFHLEtBQUcsS0FBRyxJQUFFLElBQUU7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLGlCQUFPLE1BQUksTUFBSSxFQUFFLElBQUUsQ0FBQyxJQUFFLElBQUUsS0FBRyxLQUFHLE1BQUksS0FBRyxJQUFHLEVBQUUsT0FBSyxHQUFFO0FBQUEsUUFBQztBQUFBLE1BQUMsR0FBRSxFQUFDLG1CQUFrQixHQUFFLENBQUMsR0FBRSxJQUFHLENBQUMsU0FBUyxHQUFFLEdBQUUsR0FBRTtBQUFDO0FBQWEsVUFBRSxVQUFRLEVBQUMsR0FBRSxtQkFBa0IsR0FBRSxjQUFhLEdBQUUsSUFBRyxNQUFLLGNBQWEsTUFBSyxnQkFBZSxNQUFLLGNBQWEsTUFBSyx1QkFBc0IsTUFBSyxnQkFBZSxNQUFLLHVCQUFzQjtBQUFBLE1BQUMsR0FBRSxDQUFDLENBQUMsR0FBRSxJQUFHLENBQUMsU0FBUyxHQUFFLEdBQUUsR0FBRTtBQUFDO0FBQWEsWUFBSSxJQUFFLEVBQUUsaUJBQWlCLEdBQUUsSUFBRSxHQUFFLElBQUU7QUFBRSxpQkFBUyxFQUFFQSxJQUFFO0FBQUMsbUJBQVFDLEtBQUVELEdBQUUsUUFBTyxLQUFHLEVBQUVDLEtBQUcsQ0FBQUQsR0FBRUMsRUFBQyxJQUFFO0FBQUEsUUFBQztBQUFDLFlBQUksSUFBRSxHQUFFLElBQUUsSUFBRyxJQUFFLEtBQUksSUFBRSxJQUFFLElBQUUsR0FBRSxJQUFFLElBQUcsSUFBRSxJQUFHLElBQUUsSUFBRSxJQUFFLEdBQUUsSUFBRSxJQUFHLElBQUUsSUFBRyxJQUFFLEdBQUUsSUFBRSxLQUFJLElBQUUsSUFBRyxJQUFFLElBQUcsSUFBRSxJQUFHLElBQUUsQ0FBQyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUMsR0FBRSxJQUFFLENBQUMsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLEVBQUUsR0FBRSxJQUFFLENBQUMsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQyxHQUFFLElBQUUsQ0FBQyxJQUFHLElBQUcsSUFBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsSUFBRyxHQUFFLElBQUcsR0FBRSxJQUFHLEdBQUUsSUFBRyxHQUFFLElBQUcsR0FBRSxFQUFFLEdBQUUsSUFBRSxJQUFJLE1BQU0sS0FBRyxJQUFFLEVBQUU7QUFBRSxVQUFFLENBQUM7QUFBRSxZQUFJLElBQUUsSUFBSSxNQUFNLElBQUUsQ0FBQztBQUFFLFVBQUUsQ0FBQztBQUFFLFlBQUksSUFBRSxJQUFJLE1BQU0sR0FBRztBQUFFLFVBQUUsQ0FBQztBQUFFLFlBQUksSUFBRSxJQUFJLE1BQU0sR0FBRztBQUFFLFVBQUUsQ0FBQztBQUFFLFlBQUksSUFBRSxJQUFJLE1BQU0sQ0FBQztBQUFFLFVBQUUsQ0FBQztBQUFFLFlBQUksR0FBRSxHQUFFLEdBQUUsSUFBRSxJQUFJLE1BQU0sQ0FBQztBQUFFLGlCQUFTLEVBQUVELElBQUVDLElBQUVDLElBQUVFLElBQUVDLElBQUU7QUFBQyxlQUFLLGNBQVlMLElBQUUsS0FBSyxhQUFXQyxJQUFFLEtBQUssYUFBV0MsSUFBRSxLQUFLLFFBQU1FLElBQUUsS0FBSyxhQUFXQyxJQUFFLEtBQUssWUFBVUwsTUFBR0EsR0FBRTtBQUFBLFFBQU07QUFBQyxpQkFBUyxFQUFFQSxJQUFFQyxJQUFFO0FBQUMsZUFBSyxXQUFTRCxJQUFFLEtBQUssV0FBUyxHQUFFLEtBQUssWUFBVUM7QUFBQSxRQUFDO0FBQUMsaUJBQVMsRUFBRUQsSUFBRTtBQUFDLGlCQUFPQSxLQUFFLE1BQUksRUFBRUEsRUFBQyxJQUFFLEVBQUUsT0FBS0EsT0FBSSxFQUFFO0FBQUEsUUFBQztBQUFDLGlCQUFTLEVBQUVBLElBQUVDLElBQUU7QUFBQyxVQUFBRCxHQUFFLFlBQVlBLEdBQUUsU0FBUyxJQUFFLE1BQUlDLElBQUVELEdBQUUsWUFBWUEsR0FBRSxTQUFTLElBQUVDLE9BQUksSUFBRTtBQUFBLFFBQUc7QUFBQyxpQkFBUyxFQUFFRCxJQUFFQyxJQUFFQyxJQUFFO0FBQUMsVUFBQUYsR0FBRSxXQUFTLElBQUVFLE1BQUdGLEdBQUUsVUFBUUMsTUFBR0QsR0FBRSxXQUFTLE9BQU0sRUFBRUEsSUFBRUEsR0FBRSxNQUFNLEdBQUVBLEdBQUUsU0FBT0MsTUFBRyxJQUFFRCxHQUFFLFVBQVNBLEdBQUUsWUFBVUUsS0FBRSxNQUFJRixHQUFFLFVBQVFDLE1BQUdELEdBQUUsV0FBUyxPQUFNQSxHQUFFLFlBQVVFO0FBQUEsUUFBRTtBQUFDLGlCQUFTLEVBQUVGLElBQUVDLElBQUVDLElBQUU7QUFBQyxZQUFFRixJQUFFRSxHQUFFLElBQUVELEVBQUMsR0FBRUMsR0FBRSxJQUFFRCxLQUFFLENBQUMsQ0FBQztBQUFBLFFBQUM7QUFBQyxpQkFBUyxFQUFFRCxJQUFFQyxJQUFFO0FBQUMsbUJBQVFDLEtBQUUsR0FBRUEsTUFBRyxJQUFFRixJQUFFQSxRQUFLLEdBQUVFLE9BQUksR0FBRSxJQUFFLEVBQUVELEtBQUc7QUFBQyxpQkFBT0MsT0FBSTtBQUFBLFFBQUM7QUFBQyxpQkFBUyxFQUFFRixJQUFFQyxJQUFFQyxJQUFFO0FBQUMsY0FBSUUsSUFBRUMsSUFBRUMsS0FBRSxJQUFJLE1BQU0sSUFBRSxDQUFDLEdBQUVDLEtBQUU7QUFBRSxlQUFJSCxLQUFFLEdBQUVBLE1BQUcsR0FBRUEsS0FBSSxDQUFBRSxHQUFFRixFQUFDLElBQUVHLEtBQUVBLEtBQUVMLEdBQUVFLEtBQUUsQ0FBQyxLQUFHO0FBQUUsZUFBSUMsS0FBRSxHQUFFQSxNQUFHSixJQUFFSSxN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QUFDLElBQUVDLElBQUVMLEtBQUUsR0FBRUEsS0FBRSxLQUFHLEVBQUVJLEVBQUMsR0FBRUosS0FBSSxHQUFFSyxJQUFHLElBQUVEO0FBQUUsaUJBQUlDLE9BQUksR0FBRUQsS0FBRSxHQUFFQSxLQUFJLE1BQUksRUFBRUEsRUFBQyxJQUFFQyxNQUFHLEdBQUVMLEtBQUUsR0FBRUEsS0FBRSxLQUFHLEVBQUVJLEVBQUMsSUFBRSxHQUFFSixLQUFJLEdBQUUsTUFBSUssSUFBRyxJQUFFRDtBQUFFLGlCQUFJSCxLQUFFLEdBQUVBLE1BQUcsR0FBRUEsS0FBSSxDQUFBSyxHQUFFTCxFQUFDLElBQUU7QUFBRSxpQkFBSUQsS0FBRSxHQUFFQSxNQUFHLE1BQUssR0FBRSxJQUFFQSxLQUFFLENBQUMsSUFBRSxHQUFFQSxNQUFJTSxHQUFFLENBQUM7QUFBSSxtQkFBS04sTUFBRyxNQUFLLEdBQUUsSUFBRUEsS0FBRSxDQUFDLElBQUUsR0FBRUEsTUFBSU0sR0FBRSxDQUFDO0FBQUksbUJBQUtOLE1BQUcsTUFBSyxHQUFFLElBQUVBLEtBQUUsQ0FBQyxJQUFFLEdBQUVBLE1BQUlNLEdBQUUsQ0FBQztBQUFJLG1CQUFLTixNQUFHLE1BQUssR0FBRSxJQUFFQSxLQUFFLENBQUMsSUFBRSxHQUFFQSxNQUFJTSxHQUFFLENBQUM7QUFBSSxpQkFBSSxFQUFFLEdBQUUsSUFBRSxHQUFFQSxFQUFDLEdBQUVOLEtBQUUsR0FBRUEsS0FBRSxHQUFFQSxLQUFJLEdBQUUsSUFBRUEsS0FBRSxDQUFDLElBQUUsR0FBRSxFQUFFLElBQUVBLEVBQUMsSUFBRSxFQUFFQSxJQUFFLENBQUM7QUFBRSxnQkFBRSxJQUFJLEVBQUUsR0FBRSxHQUFFLElBQUUsR0FBRSxHQUFFLENBQUMsR0FBRSxJQUFFLElBQUksRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUMsR0FBRSxJQUFFLElBQUksRUFBRSxJQUFJLE1BQU0sQ0FBQyxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxVQUFDLEdBQUUsR0FBRSxJQUFFLE9BQUlBLEdBQUUs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QUFjLFdBQU0sUUFBUSxhQUFhLE9BQU8sR0FBRyxDQUFDO0FBQ3RJLFVBQU0sU0FBUyxVQUFVLFNBQVMsR0FBRztBQUNyQyxRQUFJLHlCQUFRLFNBQVMsRUFDbEIsVUFBVSxDQUFDLFdBQVcsT0FBTyxjQUFjLFFBQVEsRUFBRSxRQUFRLE1BQU0sS0FBSyxNQUFNLENBQUMsQ0FBQyxFQUNoRixVQUFVLENBQUMsV0FBVyxPQUFPLE9BQU8sRUFBRSxjQUFjLFlBQVksRUFBRSxRQUFRLFlBQVk7QUFDckYsYUFBTyxZQUFZLElBQUk7QUFBRyxhQUFPLFFBQVEsdUJBQWtCO0FBQzNELFVBQUk7QUFBRSxjQUFNLEtBQUssUUFBUSxDQUFDLFNBQVMsT0FBTyxRQUFRLElBQUksQ0FBQztBQUFHLGFBQUssTUFBTTtBQUFBLE1BQUcsU0FDakUsT0FBTztBQUNaLGdCQUFRLE1BQU0sc0NBQXNDLEtBQUs7QUFDekQsZUFBTyxRQUFRLGtCQUFrQixRQUFRLEtBQUssQ0FBQyxFQUFFO0FBQ2pELGVBQU8sWUFBWSxLQUFLO0FBQUEsTUFDMUI7QUFBQSxJQUNGLENBQUMsQ0FBQztBQUFBLEVBQ047QUFBQSxFQUNBLFVBQWdCO0FBQUUsU0FBSyxVQUFVLE1BQU07QUFBQSxFQUFHO0FBQzVDO0FBQ0EsU0FBUyxRQUFRLE9BQXdCO0FBQUUsU0FBTyxpQkFBaUIsUUFBUSxNQUFNLFVBQVU7QUFBaUI7IiwKICAibmFtZXMiOiBbIm1vZHVsZSIsICJlIiwgInQiLCAiciIsICJjIiwgIm4iLCAiaSIsICJzIiwgImEiLCAibyIsICJoIiwgInUiLCAibCIsICJmIiwgImQiLCAicCIsICJtIiwgImltcG9ydF9vYnNpZGlhbiIsICJyZWxlYXNlIiwgIkpTWmlwIl0KfQo=
