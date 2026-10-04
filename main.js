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
var MANIFEST_URL = "https://raw.githubusercontent.com/tbspedia/tbpedia-update/main/latest.json";
var WORKER_URL = "https://cfupdate.tbpedia.org";
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
    const manifest = await this.fetchManifest();
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
  async fetchManifest() {
    const response = await (0, import_obsidian.requestUrl)({ url: MANIFEST_URL, method: "GET", throw: false });
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibm9kZV9tb2R1bGVzLy5wbnBtL2pzemlwQDMuMTAuMi9ub2RlX21vZHVsZXMvanN6aXAvZGlzdC9qc3ppcC5taW4uanMiLCAic3JjL21haW4udHMiLCAic3JjL3VwZGF0ZS1zZXJ2aWNlLnRzIiwgInNyYy90eXBlcy50cyIsICJzcmMvcGF0aC1wb2xpY3kudHMiLCAic3JjL21hbmlmZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvKiFcblxuSlNaaXAgdjMuMTAuMiAtIEEgSmF2YVNjcmlwdCBjbGFzcyBmb3IgZ2VuZXJhdGluZyBhbmQgcmVhZGluZyB6aXAgZmlsZXNcbjxodHRwOi8vc3R1YXJ0ay5jb20vanN6aXA+XG5cbihjKSAyMDA5LTIwMTYgU3R1YXJ0IEtuaWdodGxleSA8c3R1YXJ0IFthdF0gc3R1YXJ0ay5jb20+XG5EdWFsIGxpY2VuY2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBvciBHUEx2My4gU2VlIGh0dHBzOi8vcmF3LmdpdGh1Yi5jb20vU3R1ay9qc3ppcC9tYWluL0xJQ0VOU0UubWFya2Rvd24uXG5cbkpTWmlwIHVzZXMgdGhlIGxpYnJhcnkgcGFrbyByZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgOlxuaHR0cHM6Ly9naXRodWIuY29tL25vZGVjYS9wYWtvL2Jsb2IvbWFpbi9MSUNFTlNFXG4qL1xuXG4hZnVuY3Rpb24oZSl7aWYoXCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBtb2R1bGUpbW9kdWxlLmV4cG9ydHM9ZSgpO2Vsc2UgaWYoXCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kKWRlZmluZShbXSxlKTtlbHNleyhcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P3dpbmRvdzpcInVuZGVmaW5lZFwiIT10eXBlb2YgZ2xvYmFsP2dsb2JhbDpcInVuZGVmaW5lZFwiIT10eXBlb2Ygc2VsZj9zZWxmOnRoaXMpLkpTWmlwPWUoKX19KGZ1bmN0aW9uKCl7cmV0dXJuIGZ1bmN0aW9uIHMoYSxvLGgpe2Z1bmN0aW9uIHUocixlKXtpZighb1tyXSl7aWYoIWFbcl0pe3ZhciB0PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWUmJnQpcmV0dXJuIHQociwhMCk7aWYobClyZXR1cm4gbChyLCEwKTt2YXIgbj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK3IrXCInXCIpO3Rocm93IG4uY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixufXZhciBpPW9bcl09e2V4cG9ydHM6e319O2Fbcl1bMF0uY2FsbChpLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIHQ9YVtyXVsxXVtlXTtyZXR1cm4gdSh0fHxlKX0saSxpLmV4cG9ydHMscyxhLG8saCl9cmV0dXJuIG9bcl0uZXhwb3J0c31mb3IodmFyIGw9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxlPTA7ZTxoLmxlbmd0aDtlKyspdShoW2VdKTtyZXR1cm4gdX0oezE6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt2YXIgZD1lKFwiLi91dGlsc1wiKSxjPWUoXCIuL3N1cHBvcnRcIikscD1cIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky89XCI7ci5lbmNvZGU9ZnVuY3Rpb24oZSl7Zm9yKHZhciB0LHIsbixpLHMsYSxvLGg9W10sdT0wLGw9ZS5sZW5ndGgsZj1sLGM9XCJzdHJpbmdcIiE9PWQuZ2V0VHlwZU9mKGUpO3U8ZS5sZW5ndGg7KWY9bC11LG49Yz8odD1lW3UrK10scj11PGw/ZVt1KytdOjAsdTxsP2VbdSsrXTowKToodD1lLmNoYXJDb2RlQXQodSsrKSxyPXU8bD9lLmNoYXJDb2RlQXQodSsrKTowLHU8bD9lLmNoYXJDb2RlQXQodSsrKTowKSxpPXQ+PjIscz0oMyZ0KTw8NHxyPj40LGE9MTxmPygxNSZyKTw8MnxuPj42OjY0LG89MjxmPzYzJm46NjQsaC5wdXNoKHAuY2hhckF0KGkpK3AuY2hhckF0KHMpK3AuY2hhckF0KGEpK3AuY2hhckF0KG8pKTtyZXR1cm4gaC5qb2luKFwiXCIpfSxyLmRlY29kZT1mdW5jdGlvbihlKXt2YXIgdCxyLG4saSxzLGEsbz0wLGg9MCx1PVwiZGF0YTpcIjtpZihlLnN1YnN0cigwLHUubGVuZ3RoKT09PXUpdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBiYXNlNjQgaW5wdXQsIGl0IGxvb2tzIGxpa2UgYSBkYXRhIHVybC5cIik7dmFyIGwsZj0zKihlPWUucmVwbGFjZSgvW15BLVphLXowLTkrLz1dL2csXCJcIikpLmxlbmd0aC80O2lmKGUuY2hhckF0KGUubGVuZ3RoLTEpPT09cC5jaGFyQXQoNjQpJiZmLS0sZS5jaGFyQXQoZS5sZW5ndGgtMik9PT1wLmNoYXJBdCg2NCkmJmYtLSxmJTEhPTApdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBiYXNlNjQgaW5wdXQsIGJhZCBjb250ZW50IGxlbmd0aC5cIik7Zm9yKGw9Yy51aW50OGFycmF5P25ldyBVaW50OEFycmF5KDB8Zik6bmV3IEFycmF5KDB8Zik7bzxlLmxlbmd0aDspdD1wLmluZGV4T2YoZS5jaGFyQXQobysrKSk8PDJ8KGk9cC5pbmRleE9mKGUuY2hhckF0KG8rKykpKT4+NCxyPSgxNSZpKTw8NHwocz1wLmluZGV4T2YoZS5jaGFyQXQobysrKSkpPj4yLG49KDMmcyk8PDZ8KGE9cC5pbmRleE9mKGUuY2hhckF0KG8rKykpKSxsW2grK109dCw2NCE9PXMmJihsW2grK109ciksNjQhPT1hJiYobFtoKytdPW4pO3JldHVybiBsfX0se1wiLi9zdXBwb3J0XCI6MzAsXCIuL3V0aWxzXCI6MzJ9XSwyOltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7dmFyIG49ZShcIi4vZXh0ZXJuYWxcIiksaT1lKFwiLi9zdHJlYW0vRGF0YVdvcmtlclwiKSxzPWUoXCIuL3N0cmVhbS9DcmMzMlByb2JlXCIpLGE9ZShcIi4vc3RyZWFtL0RhdGFMZW5ndGhQcm9iZVwiKTtmdW5jdGlvbiBvKGUsdCxyLG4saSl7dGhpcy5jb21wcmVzc2VkU2l6ZT1lLHRoaXMudW5jb21wcmVzc2VkU2l6ZT10LHRoaXMuY3JjMzI9cix0aGlzLmNvbXByZXNzaW9uPW4sdGhpcy5jb21wcmVzc2VkQ29udGVudD1pfW8ucHJvdG90eXBlPXtnZXRDb250ZW50V29ya2VyOmZ1bmN0aW9uKCl7dmFyIGU9bmV3IGkobi5Qcm9taXNlLnJlc29sdmUodGhpcy5jb21wcmVzc2VkQ29udGVudCkpLnBpcGUodGhpcy5jb21wcmVzc2lvbi51bmNvbXByZXNzV29ya2VyKCkpLnBpcGUobmV3IGEoXCJkYXRhX2xlbmd0aFwiKSksdD10aGlzO3JldHVybiBlLm9uKFwiZW5kXCIsZnVuY3Rpb24oKXtpZih0aGlzLnN0cmVhbUluZm8uZGF0YV9sZW5ndGghPT10LnVuY29tcHJlc3NlZFNpemUpdGhyb3cgbmV3IEVycm9yKFwiQnVnIDogdW5jb21wcmVzc2VkIGRhdGEgc2l6ZSBtaXNtYXRjaFwiKX0pLGV9LGdldENvbXByZXNzZWRXb3JrZXI6ZnVuY3Rpb24oKXtyZXR1cm4gbmV3IGkobi5Qcm9taXNlLnJlc29sdmUodGhpcy5jb21wcmVzc2VkQ29udGVudCkpLndpdGhTdHJlYW1JbmZvKFwiY29tcHJlc3NlZFNpemVcIix0aGlzLmNvbXByZXNzZWRTaXplKS53aXRoU3RyZWFtSW5mbyhcInVuY29tcHJlc3NlZFNpemVcIix0aGlzLnVuY29tcHJlc3NlZFNpemUpLndpdGhTdHJlYW1JbmZvKFwiY3JjMzJcIix0aGlzLmNyYzMyKS53aXRoU3RyZWFtSW5mbyhcImNvbXByZXNzaW9uXCIsdGhpcy5jb21wcmVzc2lvbil9fSxvLmNyZWF0ZVdvcmtlckZyb209ZnVuY3Rpb24oZSx0LHIpe3JldHVybiBlLnBpcGUobmV3IHMpLnBpcGUobmV3IGEoXCJ1bmNvbXByZXNzZWRTaXplXCIpKS5waXBlKHQuY29tcHJlc3NXb3JrZXIocikpLnBpcGUobmV3IGEoXCJjb21wcmVzc2VkU2l6ZVwiKSkud2l0aFN0cmVhbUluZm8oXCJjb21wcmVzc2lvblwiLHQpfSx0LmV4cG9ydHM9b30se1wiLi9leHRlcm5hbFwiOjYsXCIuL3N0cmVhbS9DcmMzMlByb2JlXCI6MjUsXCIuL3N0cmVhbS9EYXRhTGVuZ3RoUHJvYmVcIjoyNixcIi4vc3RyZWFtL0RhdGFXb3JrZXJcIjoyN31dLDM6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt2YXIgbj1lKFwiLi9zdHJlYW0vR2VuZXJpY1dvcmtlclwiKTtyLlNUT1JFPXttYWdpYzpcIlxcMFxcMFwiLGNvbXByZXNzV29ya2VyOmZ1bmN0aW9uKCl7cmV0dXJuIG5ldyBuKFwiU1RPUkUgY29tcHJlc3Npb25cIil9LHVuY29tcHJlc3NXb3JrZXI6ZnVuY3Rpb24oKXtyZXR1cm4gbmV3IG4oXCJTVE9SRSBkZWNvbXByZXNzaW9uXCIpfX0sci5ERUZMQVRFPWUoXCIuL2ZsYXRlXCIpfSx7XCIuL2ZsYXRlXCI6NyxcIi4vc3RyZWFtL0dlbmVyaWNXb3JrZXJcIjoyOH1dLDQ6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt2YXIgbj1lKFwiLi91dGlsc1wiKTt2YXIgbz1mdW5jdGlvbigpe2Zvcih2YXIgZSx0PVtdLHI9MDtyPDI1NjtyKyspe2U9cjtmb3IodmFyIG49MDtuPDg7bisrKWU9MSZlPzM5ODgyOTIzODReZT4+PjE6ZT4+PjE7dFtyXT1lfXJldHVybiB0fSgpO3QuZXhwb3J0cz1mdW5jdGlvbihlLHQpe3JldHVybiB2b2lkIDAhPT1lJiZlLmxlbmd0aD9cInN0cmluZ1wiIT09bi5nZXRUeXBlT2YoZSk/ZnVuY3Rpb24oZSx0LHIsbil7dmFyIGk9byxzPW4rcjtlXj0tMTtmb3IodmFyIGE9bjthPHM7YSsrKWU9ZT4+PjheaVsyNTUmKGVedFthXSldO3JldHVybi0xXmV9KDB8dCxlLGUubGVuZ3RoLDApOmZ1bmN0aW9uKGUsdCxyLG4pe3ZhciBpPW8scz1uK3I7ZV49LTE7Zm9yKHZhciBhPW47YTxzO2ErKyllPWU+Pj44XmlbMjU1JihlXnQuY2hhckNvZGVBdChhKSldO3JldHVybi0xXmV9KDB8dCxlLGUubGVuZ3RoLDApOjB9fSx7XCIuL3V0aWxzXCI6MzJ9XSw1OltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7ci5iYXNlNjQ9ITEsci5iaW5hcnk9ITEsci5kaXI9ITEsci5jcmVhdGVGb2xkZXJzPSEwLHIuZGF0ZT1udWxsLHIuY29tcHJlc3Npb249bnVsbCxyLmNvbXByZXNzaW9uT3B0aW9ucz1udWxsLHIuY29tbWVudD1udWxsLHIudW5peFBlcm1pc3Npb25zPW51bGwsci5kb3NQZXJtaXNzaW9ucz1udWxsfSx7fV0sNjpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3ZhciBuPW51bGw7bj1cInVuZGVmaW5lZFwiIT10eXBlb2YgUHJvbWlzZT9Qcm9taXNlOmUoXCJsaWVcIiksdC5leHBvcnRzPXtQcm9taXNlOm59fSx7bGllOjM3fV0sNzpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3ZhciBuPVwidW5kZWZpbmVkXCIhPXR5cGVvZiBVaW50OEFycmF5JiZcInVuZGVmaW5lZFwiIT10eXBlb2YgVWludDE2QXJyYXkmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBVaW50MzJBcnJheSxpPWUoXCJwYWtvXCIpLHM9ZShcIi4vdXRpbHNcIiksYT1lKFwiLi9zdHJlYW0vR2VuZXJpY1dvcmtlclwiKSxvPW4/XCJ1aW50OGFycmF5XCI6XCJhcnJheVwiO2Z1bmN0aW9uIGgoZSx0KXthLmNhbGwodGhpcyxcIkZsYXRlV29ya2VyL1wiK2UpLHRoaXMuX3Bha289bnVsbCx0aGlzLl9wYWtvQWN0aW9uPWUsdGhpcy5fcGFrb09wdGlvbnM9dCx0aGlzLm1ldGE9e319ci5tYWdpYz1cIlxcYlxcMFwiLHMuaW5oZXJpdHMoaCxhKSxoLnByb3RvdHlwZS5wcm9jZXNzQ2h1bms9ZnVuY3Rpb24oZSl7dGhpcy5tZXRhPWUubWV0YSxudWxsPT09dGhpcy5fcGFrbyYmdGhpcy5fY3JlYXRlUGFrbygpLHRoaXMuX3Bha28ucHVzaChzLnRyYW5zZm9ybVRvKG8sZS5kYXRhKSwhMSl9LGgucHJvdG90eXBlLmZsdXNoPWZ1bmN0aW9uKCl7YS5wcm90b3R5cGUuZmx1c2guY2FsbCh0aGlzKSxudWxsPT09dGhpcy5fcGFrbyYmdGhpcy5fY3JlYXRlUGFrbygpLHRoaXMuX3Bha28ucHVzaChbXSwhMCl9LGgucHJvdG90eXBlLmNsZWFuVXA9ZnVuY3Rpb24oKXthLnByb3RvdHlwZS5jbGVhblVwLmNhbGwodGhpcyksdGhpcy5fcGFrbz1udWxsfSxoLnByb3RvdHlwZS5fY3JlYXRlUGFrbz1mdW5jdGlvbigpe3RoaXMuX3Bha289bmV3IGlbdGhpcy5fcGFrb0FjdGlvbl0oe3JhdzohMCxsZXZlbDp0aGlzLl9wYWtvT3B0aW9ucy5sZXZlbHx8LTF9KTt2YXIgdD10aGlzO3RoaXMuX3Bha28ub25EYXRhPWZ1bmN0aW9uKGUpe3QucHVzaCh7ZGF0YTplLG1ldGE6dC5tZXRhfSl9fSxyLmNvbXByZXNzV29ya2VyPWZ1bmN0aW9uKGUpe3JldHVybiBuZXcgaChcIkRlZmxhdGVcIixlKX0sci51bmNvbXByZXNzV29ya2VyPWZ1bmN0aW9uKCl7cmV0dXJuIG5ldyBoKFwiSW5mbGF0ZVwiLHt9KX19LHtcIi4vc3RyZWFtL0dlbmVyaWNXb3JrZXJcIjoyOCxcIi4vdXRpbHNcIjozMixwYWtvOjM4fV0sODpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIEEoZSx0KXt2YXIgcixuPVwiXCI7Zm9yKHI9MDtyPHQ7cisrKW4rPVN0cmluZy5mcm9tQ2hhckNvZGUoMjU1JmUpLGU+Pj49ODtyZXR1cm4gbn1mdW5jdGlvbiBuKGUsdCxyLG4saSxzKXt2YXIgYSxvLGg9ZS5maWxlLHU9ZS5jb21wcmVzc2lvbixsPXMhPT1PLnV0ZjhlbmNvZGUsZj1JLnRyYW5zZm9ybVRvKFwic3RyaW5nXCIscyhoLm5hbWUpKSxjPUkudHJhbnNmb3JtVG8oXCJzdHJpbmdcIixPLnV0ZjhlbmNvZGUoaC5uYW1lKSksZD1oLmNvbW1lbnQscD1JLnRyYW5zZm9ybVRvKFwic3RyaW5nXCIscyhkKSksbT1JLnRyYW5zZm9ybVRvKFwic3RyaW5nXCIsTy51dGY4ZW5jb2RlKGQpKSxfPWMubGVuZ3RoIT09aC5uYW1lLmxlbmd0aCxnPW0ubGVuZ3RoIT09ZC5sZW5ndGgsYj1cIlwiLHY9XCJcIix5PVwiXCIsdz1oLmRpcixrPWguZGF0ZSx4PXtjcmMzMjowLGNvbXByZXNzZWRTaXplOjAsdW5jb21wcmVzc2VkU2l6ZTowfTt0JiYhcnx8KHguY3JjMzI9ZS5jcmMzMix4LmNvbXByZXNzZWRTaXplPWUuY29tcHJlc3NlZFNpemUseC51bmNvbXByZXNzZWRTaXplPWUudW5jb21wcmVzc2VkU2l6ZSk7dmFyIFM9MDt0JiYoU3w9OCksbHx8IV8mJiFnfHwoU3w9MjA0OCk7dmFyIHo9MCxDPTA7dyYmKHp8PTE2KSxcIlVOSVhcIj09PWk/KEM9Nzk4LHp8PWZ1bmN0aW9uKGUsdCl7dmFyIHI9ZTtyZXR1cm4gZXx8KHI9dD8xNjg5MzozMzIwNCksKDY1NTM1JnIpPDwxNn0oaC51bml4UGVybWlzc2lvbnMsdykpOihDPTIwLHp8PWZ1bmN0aW9uKGUpe3JldHVybiA2MyYoZXx8MCl9KGguZG9zUGVybWlzc2lvbnMpKSxhPWsuZ2V0VVRDSG91cnMoKSxhPDw9NixhfD1rLmdldFVUQ01pbnV0ZXMoKSxhPDw9NSxhfD1rLmdldFVUQ1NlY29uZHMoKS8yLG89ay5nZXRVVENGdWxsWWVhcigpLTE5ODAsbzw8PTQsb3w9ay5nZXRVVENNb250aCgpKzEsbzw8PTUsb3w9ay5nZXRVVENEYXRlKCksXyYmKHY9QSgxLDEpK0EoQihmKSw0KStjLGIrPVwidXBcIitBKHYubGVuZ3RoLDIpK3YpLGcmJih5PUEoMSwxKStBKEIocCksNCkrbSxiKz1cInVjXCIrQSh5Lmxlbmd0aCwyKSt5KTt2YXIgRT1cIlwiO3JldHVybiBFKz1cIlxcblxcMFwiLEUrPUEoUywyKSxFKz11Lm1hZ2ljLEUrPUEoYSwyKSxFKz1BKG8sMiksRSs9QSh4LmNyYzMyLDQpLEUrPUEoeC5jb21wcmVzc2VkU2l6ZSw0KSxFKz1BKHgudW5jb21wcmVzc2VkU2l6ZSw0KSxFKz1BKGYubGVuZ3RoLDIpLEUrPUEoYi5sZW5ndGgsMikse2ZpbGVSZWNvcmQ6Ui5MT0NBTF9GSUxFX0hFQURFUitFK2YrYixkaXJSZWNvcmQ6Ui5DRU5UUkFMX0ZJTEVfSEVBREVSK0EoQywyKStFK0EocC5sZW5ndGgsMikrXCJcXDBcXDBcXDBcXDBcIitBKHosNCkrQShuLDQpK2YrYitwfX12YXIgST1lKFwiLi4vdXRpbHNcIiksaT1lKFwiLi4vc3RyZWFtL0dlbmVyaWNXb3JrZXJcIiksTz1lKFwiLi4vdXRmOFwiKSxCPWUoXCIuLi9jcmMzMlwiKSxSPWUoXCIuLi9zaWduYXR1cmVcIik7ZnVuY3Rpb24gcyhlLHQscixuKXtpLmNhbGwodGhpcyxcIlppcEZpbGVXb3JrZXJcIiksdGhpcy5ieXRlc1dyaXR0ZW49MCx0aGlzLnppcENvbW1lbnQ9dCx0aGlzLnppcFBsYXRmb3JtPXIsdGhpcy5lbmNvZGVGaWxlTmFtZT1uLHRoaXMuc3RyZWFtRmlsZXM9ZSx0aGlzLmFjY3VtdWxhdGU9ITEsdGhpcy5jb250ZW50QnVmZmVyPVtdLHRoaXMuZGlyUmVjb3Jkcz1bXSx0aGlzLmN1cnJlbnRTb3VyY2VPZmZzZXQ9MCx0aGlzLmVudHJpZXNDb3VudD0wLHRoaXMuY3VycmVudEZpbGU9bnVsbCx0aGlzLl9zb3VyY2VzPVtdfUkuaW5oZXJpdHMocyxpKSxzLnByb3RvdHlwZS5wdXNoPWZ1bmN0aW9uKGUpe3ZhciB0PWUubWV0YS5wZXJjZW50fHwwLHI9dGhpcy5lbnRyaWVzQ291bnQsbj10aGlzLl9zb3VyY2VzLmxlbmd0aDt0aGlzLmFjY3VtdWxhdGU/dGhpcy5jb250ZW50QnVmZmVyLnB1c2goZSk6KHRoaXMuYnl0ZXNXcml0dGVuKz1lLmRhdGEubGVuZ3RoLGkucHJvdG90eXBlLnB1c2guY2FsbCh0aGlzLHtkYXRhOmUuZGF0YSxtZXRhOntjdXJyZW50RmlsZTp0aGlzLmN1cnJlbnRGaWxlLHBlcmNlbnQ6cj8odCsxMDAqKHItbi0xKSkvcjoxMDB9fSkpfSxzLnByb3RvdHlwZS5vcGVuZWRTb3VyY2U9ZnVuY3Rpb24oZSl7dGhpcy5jdXJyZW50U291cmNlT2Zmc2V0PXRoaXMuYnl0ZXNXcml0dGVuLHRoaXMuY3VycmVudEZpbGU9ZS5maWxlLm5hbWU7dmFyIHQ9dGhpcy5zdHJlYW1GaWxlcyYmIWUuZmlsZS5kaXI7aWYodCl7dmFyIHI9bihlLHQsITEsdGhpcy5jdXJyZW50U291cmNlT2Zmc2V0LHRoaXMuemlwUGxhdGZvcm0sdGhpcy5lbmNvZGVGaWxlTmFtZSk7dGhpcy5wdXNoKHtkYXRhOnIuZmlsZVJlY29yZCxtZXRhOntwZXJjZW50OjB9fSl9ZWxzZSB0aGlzLmFjY3VtdWxhdGU9ITB9LHMucHJvdG90eXBlLmNsb3NlZFNvdXJjZT1mdW5jdGlvbihlKXt0aGlzLmFjY3VtdWxhdGU9ITE7dmFyIHQ9dGhpcy5zdHJlYW1GaWxlcyYmIWUuZmlsZS5kaXIscj1uKGUsdCwhMCx0aGlzLmN1cnJlbnRTb3VyY2VPZmZzZXQsdGhpcy56aXBQbGF0Zm9ybSx0aGlzLmVuY29kZUZpbGVOYW1lKTtpZih0aGlzLmRpclJlY29yZHMucHVzaChyLmRpclJlY29yZCksdCl0aGlzLnB1c2goe2RhdGE6ZnVuY3Rpb24oZSl7cmV0dXJuIFIuREFUQV9ERVNDUklQVE9SK0EoZS5jcmMzMiw0KStBKGUuY29tcHJlc3NlZFNpemUsNCkrQShlLnVuY29tcHJlc3NlZFNpemUsNCl9KGUpLG1ldGE6e3BlcmNlbnQ6MTAwfX0pO2Vsc2UgZm9yKHRoaXMucHVzaCh7ZGF0YTpyLmZpbGVSZWNvcmQsbWV0YTp7cGVyY2VudDowfX0pO3RoaXMuY29udGVudEJ1ZmZlci5sZW5ndGg7KXRoaXMucHVzaCh0aGlzLmNvbnRlbnRCdWZmZXIuc2hpZnQoKSk7dGhpcy5jdXJyZW50RmlsZT1udWxsfSxzLnByb3RvdHlwZS5mbHVzaD1mdW5jdGlvbigpe2Zvcih2YXIgZT10aGlzLmJ5dGVzV3JpdHRlbix0PTA7dDx0aGlzLmRpclJlY29yZHMubGVuZ3RoO3QrKyl0aGlzLnB1c2goe2RhdGE6dGhpcy5kaXJSZWNvcmRzW3RdLG1ldGE6e3BlcmNlbnQ6MTAwfX0pO3ZhciByPXRoaXMuYnl0ZXNXcml0dGVuLWUsbj1mdW5jdGlvbihlLHQscixuLGkpe3ZhciBzPUkudHJhbnNmb3JtVG8oXCJzdHJpbmdcIixpKG4pKTtyZXR1cm4gUi5DRU5UUkFMX0RJUkVDVE9SWV9FTkQrXCJcXDBcXDBcXDBcXDBcIitBKGUsMikrQShlLDIpK0EodCw0KStBKHIsNCkrQShzLmxlbmd0aCwyKStzfSh0aGlzLmRpclJlY29yZHMubGVuZ3RoLHIsZSx0aGlzLnppcENvbW1lbnQsdGhpcy5lbmNvZGVGaWxlTmFtZSk7dGhpcy5wdXNoKHtkYXRhOm4sbWV0YTp7cGVyY2VudDoxMDB9fSl9LHMucHJvdG90eXBlLnByZXBhcmVOZXh0U291cmNlPWZ1bmN0aW9uKCl7dGhpcy5wcmV2aW91cz10aGlzLl9zb3VyY2VzLnNoaWZ0KCksdGhpcy5vcGVuZWRTb3VyY2UodGhpcy5wcmV2aW91cy5zdHJlYW1JbmZvKSx0aGlzLmlzUGF1c2VkP3RoaXMucHJldmlvdXMucGF1c2UoKTp0aGlzLnByZXZpb3VzLnJlc3VtZSgpfSxzLnByb3RvdHlwZS5yZWdpc3RlclByZXZpb3VzPWZ1bmN0aW9uKGUpe3RoaXMuX3NvdXJjZXMucHVzaChlKTt2YXIgdD10aGlzO3JldHVybiBlLm9uKFwiZGF0YVwiLGZ1bmN0aW9uKGUpe3QucHJvY2Vzc0NodW5rKGUpfSksZS5vbihcImVuZFwiLGZ1bmN0aW9uKCl7dC5jbG9zZWRTb3VyY2UodC5wcmV2aW91cy5zdHJlYW1JbmZvKSx0Ll9zb3VyY2VzLmxlbmd0aD90LnByZXBhcmVOZXh0U291cmNlKCk6dC5lbmQoKX0pLGUub24oXCJlcnJvclwiLGZ1bmN0aW9uKGUpe3QuZXJyb3IoZSl9KSx0aGlzfSxzLnByb3RvdHlwZS5yZXN1bWU9ZnVuY3Rpb24oKXtyZXR1cm4hIWkucHJvdG90eXBlLnJlc3VtZS5jYWxsKHRoaXMpJiYoIXRoaXMucHJldmlvdXMmJnRoaXMuX3NvdXJjZXMubGVuZ3RoPyh0aGlzLnByZXBhcmVOZXh0U291cmNlKCksITApOnRoaXMucHJldmlvdXN8fHRoaXMuX3NvdXJjZXMubGVuZ3RofHx0aGlzLmdlbmVyYXRlZEVycm9yP3ZvaWQgMDoodGhpcy5lbmQoKSwhMCkpfSxzLnByb3RvdHlwZS5lcnJvcj1mdW5jdGlvbihlKXt2YXIgdD10aGlzLl9zb3VyY2VzO2lmKCFpLnByb3RvdHlwZS5lcnJvci5jYWxsKHRoaXMsZSkpcmV0dXJuITE7Zm9yKHZhciByPTA7cjx0Lmxlbmd0aDtyKyspdHJ5e3Rbcl0uZXJyb3IoZSl9Y2F0Y2goZSl7fXJldHVybiEwfSxzLnByb3RvdHlwZS5sb2NrPWZ1bmN0aW9uKCl7aS5wcm90b3R5cGUubG9jay5jYWxsKHRoaXMpO2Zvcih2YXIgZT10aGlzLl9zb3VyY2VzLHQ9MDt0PGUubGVuZ3RoO3QrKyllW3RdLmxvY2soKX0sdC5leHBvcnRzPXN9LHtcIi4uL2NyYzMyXCI6NCxcIi4uL3NpZ25hdHVyZVwiOjIzLFwiLi4vc3RyZWFtL0dlbmVyaWNXb3JrZXJcIjoyOCxcIi4uL3V0ZjhcIjozMSxcIi4uL3V0aWxzXCI6MzJ9XSw5OltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7dmFyIHU9ZShcIi4uL2NvbXByZXNzaW9uc1wiKSxuPWUoXCIuL1ppcEZpbGVXb3JrZXJcIik7ci5nZW5lcmF0ZVdvcmtlcj1mdW5jdGlvbihlLGEsdCl7dmFyIG89bmV3IG4oYS5zdHJlYW1GaWxlcyx0LGEucGxhdGZvcm0sYS5lbmNvZGVGaWxlTmFtZSksaD0wO3RyeXtlLmZvckVhY2goZnVuY3Rpb24oZSx0KXtoKys7dmFyIHI9ZnVuY3Rpb24oZSx0KXt2YXIgcj1lfHx0LG49dVtyXTtpZighbil0aHJvdyBuZXcgRXJyb3IocitcIiBpcyBub3QgYSB2YWxpZCBjb21wcmVzc2lvbiBtZXRob2QgIVwiKTtyZXR1cm4gbn0odC5vcHRpb25zLmNvbXByZXNzaW9uLGEuY29tcHJlc3Npb24pLG49dC5vcHRpb25zLmNvbXByZXNzaW9uT3B0aW9uc3x8YS5jb21wcmVzc2lvbk9wdGlvbnN8fHt9LGk9dC5kaXIscz10LmRhdGU7dC5fY29tcHJlc3NXb3JrZXIocixuKS53aXRoU3RyZWFtSW5mbyhcImZpbGVcIix7bmFtZTplLGRpcjppLGRhdGU6cyxjb21tZW50OnQuY29tbWVudHx8XCJcIix1bml4UGVybWlzc2lvbnM6dC51bml4UGVybWlzc2lvbnMsZG9zUGVybWlzc2lvbnM6dC5kb3NQZXJtaXNzaW9uc30pLnBpcGUobyl9KSxvLmVudHJpZXNDb3VudD1ofWNhdGNoKGUpe28uZXJyb3IoZSl9cmV0dXJuIG99fSx7XCIuLi9jb21wcmVzc2lvbnNcIjozLFwiLi9aaXBGaWxlV29ya2VyXCI6OH1dLDEwOltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gbigpe2lmKCEodGhpcyBpbnN0YW5jZW9mIG4pKXJldHVybiBuZXcgbjtpZihhcmd1bWVudHMubGVuZ3RoKXRocm93IG5ldyBFcnJvcihcIlRoZSBjb25zdHJ1Y3RvciB3aXRoIHBhcmFtZXRlcnMgaGFzIGJlZW4gcmVtb3ZlZCBpbiBKU1ppcCAzLjAsIHBsZWFzZSBjaGVjayB0aGUgdXBncmFkZSBndWlkZS5cIik7dGhpcy5maWxlcz1PYmplY3QuY3JlYXRlKG51bGwpLHRoaXMuY29tbWVudD1udWxsLHRoaXMucm9vdD1cIlwiLHRoaXMuY2xvbmU9ZnVuY3Rpb24oKXt2YXIgZT1uZXcgbjtmb3IodmFyIHQgaW4gdGhpcylcImZ1bmN0aW9uXCIhPXR5cGVvZiB0aGlzW3RdJiYoZVt0XT10aGlzW3RdKTtyZXR1cm4gZX19KG4ucHJvdG90eXBlPWUoXCIuL29iamVjdFwiKSkubG9hZEFzeW5jPWUoXCIuL2xvYWRcIiksbi5zdXBwb3J0PWUoXCIuL3N1cHBvcnRcIiksbi5kZWZhdWx0cz1lKFwiLi9kZWZhdWx0c1wiKSxuLnZlcnNpb249XCIzLjEwLjJcIixuLmxvYWRBc3luYz1mdW5jdGlvbihlLHQpe3JldHVybihuZXcgbikubG9hZEFzeW5jKGUsdCl9LG4uZXh0ZXJuYWw9ZShcIi4vZXh0ZXJuYWxcIiksdC5leHBvcnRzPW59LHtcIi4vZGVmYXVsdHNcIjo1LFwiLi9leHRlcm5hbFwiOjYsXCIuL2xvYWRcIjoxMSxcIi4vb2JqZWN0XCI6MTUsXCIuL3N1cHBvcnRcIjozMH1dLDExOltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7dmFyIHU9ZShcIi4vdXRpbHNcIiksaT1lKFwiLi9leHRlcm5hbFwiKSxuPWUoXCIuL3V0ZjhcIikscz1lKFwiLi96aXBFbnRyaWVzXCIpLGE9ZShcIi4vc3RyZWFtL0NyYzMyUHJvYmVcIiksbD1lKFwiLi9ub2RlanNVdGlsc1wiKTtmdW5jdGlvbiBmKG4pe3JldHVybiBuZXcgaS5Qcm9taXNlKGZ1bmN0aW9uKGUsdCl7dmFyIHI9bi5kZWNvbXByZXNzZWQuZ2V0Q29udGVudFdvcmtlcigpLnBpcGUobmV3IGEpO3Iub24oXCJlcnJvclwiLGZ1bmN0aW9uKGUpe3QoZSl9KS5vbihcImVuZFwiLGZ1bmN0aW9uKCl7ci5zdHJlYW1JbmZvLmNyYzMyIT09bi5kZWNvbXByZXNzZWQuY3JjMzI/dChuZXcgRXJyb3IoXCJDb3JydXB0ZWQgemlwIDogQ1JDMzIgbWlzbWF0Y2hcIikpOmUoKX0pLnJlc3VtZSgpfSl9dC5leHBvcnRzPWZ1bmN0aW9uKGUsbyl7dmFyIGg9dGhpcztyZXR1cm4gbz11LmV4dGVuZChvfHx7fSx7YmFzZTY0OiExLGNoZWNrQ1JDMzI6ITEsb3B0aW1pemVkQmluYXJ5U3RyaW5nOiExLGNyZWF0ZUZvbGRlcnM6ITEsZGVjb2RlRmlsZU5hbWU6bi51dGY4ZGVjb2RlfSksbC5pc05vZGUmJmwuaXNTdHJlYW0oZSk/aS5Qcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJKU1ppcCBjYW4ndCBhY2NlcHQgYSBzdHJlYW0gd2hlbiBsb2FkaW5nIGEgemlwIGZpbGUuXCIpKTp1LnByZXBhcmVDb250ZW50KFwidGhlIGxvYWRlZCB6aXAgZmlsZVwiLGUsITAsby5vcHRpbWl6ZWRCaW5hcnlTdHJpbmcsby5iYXNlNjQpLnRoZW4oZnVuY3Rpb24oZSl7dmFyIHQ9bmV3IHMobyk7cmV0dXJuIHQubG9hZChlKSx0fSkudGhlbihmdW5jdGlvbihlKXt2YXIgdD1baS5Qcm9taXNlLnJlc29sdmUoZSldLHI9ZS5maWxlcztpZihvLmNoZWNrQ1JDMzIpZm9yKHZhciBuPTA7bjxyLmxlbmd0aDtuKyspdC5wdXNoKGYocltuXSkpO3JldHVybiBpLlByb21pc2UuYWxsKHQpfSkudGhlbihmdW5jdGlvbihlKXtmb3IodmFyIHQ9ZS5zaGlmdCgpLHI9dC5maWxlcyxuPTA7bjxyLmxlbmd0aDtuKyspe3ZhciBpPXJbbl0scz1pLmZpbGVOYW1lU3RyLGE9dS5yZXNvbHZlKGkuZmlsZU5hbWVTdHIpO2guZmlsZShhLGkuZGVjb21wcmVzc2VkLHtiaW5hcnk6ITAsb3B0aW1pemVkQmluYXJ5U3RyaW5nOiEwLGRhdGU6aS5kYXRlLGRpcjppLmRpcixjb21tZW50OmkuZmlsZUNvbW1lbnRTdHIubGVuZ3RoP2kuZmlsZUNvbW1lbnRTdHI6bnVsbCx1bml4UGVybWlzc2lvbnM6aS51bml4UGVybWlzc2lvbnMsZG9zUGVybWlzc2lvbnM6aS5kb3NQZXJtaXNzaW9ucyxjcmVhdGVGb2xkZXJzOm8uY3JlYXRlRm9sZGVyc30pLGkuZGlyfHwoaC5maWxlKGEpLnVuc2FmZU9yaWdpbmFsTmFtZT1zKX1yZXR1cm4gdC56aXBDb21tZW50Lmxlbmd0aCYmKGguY29tbWVudD10LnppcENvbW1lbnQpLGh9KX19LHtcIi4vZXh0ZXJuYWxcIjo2LFwiLi9ub2RlanNVdGlsc1wiOjE0LFwiLi9zdHJlYW0vQ3JjMzJQcm9iZVwiOjI1LFwiLi91dGY4XCI6MzEsXCIuL3V0aWxzXCI6MzIsXCIuL3ppcEVudHJpZXNcIjozM31dLDEyOltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7dmFyIG49ZShcIi4uL3V0aWxzXCIpLGk9ZShcIi4uL3N0cmVhbS9HZW5lcmljV29ya2VyXCIpO2Z1bmN0aW9uIHMoZSx0KXtpLmNhbGwodGhpcyxcIk5vZGVqcyBzdHJlYW0gaW5wdXQgYWRhcHRlciBmb3IgXCIrZSksdGhpcy5fdXBzdHJlYW1FbmRlZD0hMSx0aGlzLl9iaW5kU3RyZWFtKHQpfW4uaW5oZXJpdHMocyxpKSxzLnByb3RvdHlwZS5fYmluZFN0cmVhbT1mdW5jdGlvbihlKXt2YXIgdD10aGlzOyh0aGlzLl9zdHJlYW09ZSkucGF1c2UoKSxlLm9uKFwiZGF0YVwiLGZ1bmN0aW9uKGUpe3QucHVzaCh7ZGF0YTplLG1ldGE6e3BlcmNlbnQ6MH19KX0pLm9uKFwiZXJyb3JcIixmdW5jdGlvbihlKXt0LmlzUGF1c2VkP3RoaXMuZ2VuZXJhdGVkRXJyb3I9ZTp0LmVycm9yKGUpfSkub24oXCJlbmRcIixmdW5jdGlvbigpe3QuaXNQYXVzZWQ/dC5fdXBzdHJlYW1FbmRlZD0hMDp0LmVuZCgpfSl9LHMucHJvdG90eXBlLnBhdXNlPWZ1bmN0aW9uKCl7cmV0dXJuISFpLnByb3RvdHlwZS5wYXVzZS5jYWxsKHRoaXMpJiYodGhpcy5fc3RyZWFtLnBhdXNlKCksITApfSxzLnByb3RvdHlwZS5yZXN1bWU9ZnVuY3Rpb24oKXtyZXR1cm4hIWkucHJvdG90eXBlLnJlc3VtZS5jYWxsKHRoaXMpJiYodGhpcy5fdXBzdHJlYW1FbmRlZD90aGlzLmVuZCgpOnRoaXMuX3N0cmVhbS5yZXN1bWUoKSwhMCl9LHQuZXhwb3J0cz1zfSx7XCIuLi9zdHJlYW0vR2VuZXJpY1dvcmtlclwiOjI4LFwiLi4vdXRpbHNcIjozMn1dLDEzOltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7dmFyIGk9ZShcInJlYWRhYmxlLXN0cmVhbVwiKS5SZWFkYWJsZTtmdW5jdGlvbiBuKGUsdCxyKXtpLmNhbGwodGhpcyx0KSx0aGlzLl9oZWxwZXI9ZTt2YXIgbj10aGlzO2Uub24oXCJkYXRhXCIsZnVuY3Rpb24oZSx0KXtuLnB1c2goZSl8fG4uX2hlbHBlci5wYXVzZSgpLHImJnIodCl9KS5vbihcImVycm9yXCIsZnVuY3Rpb24oZSl7bi5lbWl0KFwiZXJyb3JcIixlKX0pLm9uKFwiZW5kXCIsZnVuY3Rpb24oKXtuLnB1c2gobnVsbCl9KX1lKFwiLi4vdXRpbHNcIikuaW5oZXJpdHMobixpKSxuLnByb3RvdHlwZS5fcmVhZD1mdW5jdGlvbigpe3RoaXMuX2hlbHBlci5yZXN1bWUoKX0sdC5leHBvcnRzPW59LHtcIi4uL3V0aWxzXCI6MzIsXCJyZWFkYWJsZS1zdHJlYW1cIjoxNn1dLDE0OltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7dC5leHBvcnRzPXtpc05vZGU6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIEJ1ZmZlcixuZXdCdWZmZXJGcm9tOmZ1bmN0aW9uKGUsdCl7aWYoQnVmZmVyLmZyb20mJkJ1ZmZlci5mcm9tIT09VWludDhBcnJheS5mcm9tKXJldHVybiBCdWZmZXIuZnJvbShlLHQpO2lmKFwibnVtYmVyXCI9PXR5cGVvZiBlKXRocm93IG5ldyBFcnJvcignVGhlIFwiZGF0YVwiIGFyZ3VtZW50IG11c3Qgbm90IGJlIGEgbnVtYmVyJyk7cmV0dXJuIG5ldyBCdWZmZXIoZSx0KX0sYWxsb2NCdWZmZXI6ZnVuY3Rpb24oZSl7aWYoQnVmZmVyLmFsbG9jKXJldHVybiBCdWZmZXIuYWxsb2MoZSk7dmFyIHQ9bmV3IEJ1ZmZlcihlKTtyZXR1cm4gdC5maWxsKDApLHR9LGlzQnVmZmVyOmZ1bmN0aW9uKGUpe3JldHVybiBCdWZmZXIuaXNCdWZmZXIoZSl9LGlzU3RyZWFtOmZ1bmN0aW9uKGUpe3JldHVybiBlJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBlLm9uJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBlLnBhdXNlJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBlLnJlc3VtZX19fSx7fV0sMTU6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBzKGUsdCxyKXt2YXIgbixpPXUuZ2V0VHlwZU9mKHQpLHM9dS5leHRlbmQocnx8e30sZik7cy5kYXRlPXMuZGF0ZXx8bmV3IERhdGUsbnVsbCE9PXMuY29tcHJlc3Npb24mJihzLmNvbXByZXNzaW9uPXMuY29tcHJlc3Npb24udG9VcHBlckNhc2UoKSksXCJzdHJpbmdcIj09dHlwZW9mIHMudW5peFBlcm1pc3Npb25zJiYocy51bml4UGVybWlzc2lvbnM9cGFyc2VJbnQocy51bml4UGVybWlzc2lvbnMsOCkpLHMudW5peFBlcm1pc3Npb25zJiYxNjM4NCZzLnVuaXhQZXJtaXNzaW9ucyYmKHMuZGlyPSEwKSxzLmRvc1Blcm1pc3Npb25zJiYxNiZzLmRvc1Blcm1pc3Npb25zJiYocy5kaXI9ITApLHMuZGlyJiYoZT1nKGUpKSxzLmNyZWF0ZUZvbGRlcnMmJihuPV8oZSkpJiZiLmNhbGwodGhpcyxuLCEwKTt2YXIgYT1cInN0cmluZ1wiPT09aSYmITE9PT1zLmJpbmFyeSYmITE9PT1zLmJhc2U2NDtyJiZ2b2lkIDAhPT1yLmJpbmFyeXx8KHMuYmluYXJ5PSFhKSwodCBpbnN0YW5jZW9mIGMmJjA9PT10LnVuY29tcHJlc3NlZFNpemV8fHMuZGlyfHwhdHx8MD09PXQubGVuZ3RoKSYmKHMuYmFzZTY0PSExLHMuYmluYXJ5PSEwLHQ9XCJcIixzLmNvbXByZXNzaW9uPVwiU1RPUkVcIixpPVwic3RyaW5nXCIpO3ZhciBvPW51bGw7bz10IGluc3RhbmNlb2YgY3x8dCBpbnN0YW5jZW9mIGw/dDpwLmlzTm9kZSYmcC5pc1N0cmVhbSh0KT9uZXcgbShlLHQpOnUucHJlcGFyZUNvbnRlbnQoZSx0LHMuYmluYXJ5LHMub3B0aW1pemVkQmluYXJ5U3RyaW5nLHMuYmFzZTY0KTt2YXIgaD1uZXcgZChlLG8scyk7dGhpcy5maWxlc1tlXT1ofXZhciBpPWUoXCIuL3V0ZjhcIiksdT1lKFwiLi91dGlsc1wiKSxsPWUoXCIuL3N0cmVhbS9HZW5lcmljV29ya2VyXCIpLGE9ZShcIi4vc3RyZWFtL1N0cmVhbUhlbHBlclwiKSxmPWUoXCIuL2RlZmF1bHRzXCIpLGM9ZShcIi4vY29tcHJlc3NlZE9iamVjdFwiKSxkPWUoXCIuL3ppcE9iamVjdFwiKSxvPWUoXCIuL2dlbmVyYXRlXCIpLHA9ZShcIi4vbm9kZWpzVXRpbHNcIiksbT1lKFwiLi9ub2RlanMvTm9kZWpzU3RyZWFtSW5wdXRBZGFwdGVyXCIpLF89ZnVuY3Rpb24oZSl7XCIvXCI9PT1lLnNsaWNlKC0xKSYmKGU9ZS5zdWJzdHJpbmcoMCxlLmxlbmd0aC0xKSk7dmFyIHQ9ZS5sYXN0SW5kZXhPZihcIi9cIik7cmV0dXJuIDA8dD9lLnN1YnN0cmluZygwLHQpOlwiXCJ9LGc9ZnVuY3Rpb24oZSl7cmV0dXJuXCIvXCIhPT1lLnNsaWNlKC0xKSYmKGUrPVwiL1wiKSxlfSxiPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIHQ9dm9pZCAwIT09dD90OmYuY3JlYXRlRm9sZGVycyxlPWcoZSksdGhpcy5maWxlc1tlXXx8cy5jYWxsKHRoaXMsZSxudWxsLHtkaXI6ITAsY3JlYXRlRm9sZGVyczp0fSksdGhpcy5maWxlc1tlXX07ZnVuY3Rpb24gaChlKXtyZXR1cm5cIltvYmplY3QgUmVnRXhwXVwiPT09T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGUpfXZhciBuPXtsb2FkOmZ1bmN0aW9uKCl7dGhyb3cgbmV3IEVycm9yKFwiVGhpcyBtZXRob2QgaGFzIGJlZW4gcmVtb3ZlZCBpbiBKU1ppcCAzLjAsIHBsZWFzZSBjaGVjayB0aGUgdXBncmFkZSBndWlkZS5cIil9LGZvckVhY2g6ZnVuY3Rpb24oZSl7dmFyIHQscixuO2Zvcih0IGluIHRoaXMuZmlsZXMpbj10aGlzLmZpbGVzW3RdLChyPXQuc2xpY2UodGhpcy5yb290Lmxlbmd0aCx0Lmxlbmd0aCkpJiZ0LnNsaWNlKDAsdGhpcy5yb290Lmxlbmd0aCk9PT10aGlzLnJvb3QmJmUocixuKX0sZmlsdGVyOmZ1bmN0aW9uKHIpe3ZhciBuPVtdO3JldHVybiB0aGlzLmZvckVhY2goZnVuY3Rpb24oZSx0KXtyKGUsdCkmJm4ucHVzaCh0KX0pLG59LGZpbGU6ZnVuY3Rpb24oZSx0LHIpe2lmKDEhPT1hcmd1bWVudHMubGVuZ3RoKXJldHVybiBlPXRoaXMucm9vdCtlLHMuY2FsbCh0aGlzLGUsdCxyKSx0aGlzO2lmKGgoZSkpe3ZhciBuPWU7cmV0dXJuIHRoaXMuZmlsdGVyKGZ1bmN0aW9uKGUsdCl7cmV0dXJuIXQuZGlyJiZuLnRlc3QoZSl9KX12YXIgaT10aGlzLmZpbGVzW3RoaXMucm9vdCtlXTtyZXR1cm4gaSYmIWkuZGlyP2k6bnVsbH0sZm9sZGVyOmZ1bmN0aW9uKHIpe2lmKCFyKXJldHVybiB0aGlzO2lmKGgocikpcmV0dXJuIHRoaXMuZmlsdGVyKGZ1bmN0aW9uKGUsdCl7cmV0dXJuIHQuZGlyJiZyLnRlc3QoZSl9KTt2YXIgZT10aGlzLnJvb3Qrcix0PWIuY2FsbCh0aGlzLGUpLG49dGhpcy5jbG9uZSgpO3JldHVybiBuLnJvb3Q9dC5uYW1lLG59LHJlbW92ZTpmdW5jdGlvbihyKXtyPXRoaXMucm9vdCtyO3ZhciBlPXRoaXMuZmlsZXNbcl07aWYoZXx8KFwiL1wiIT09ci5zbGljZSgtMSkmJihyKz1cIi9cIiksZT10aGlzLmZpbGVzW3JdKSxlJiYhZS5kaXIpZGVsZXRlIHRoaXMuZmlsZXNbcl07ZWxzZSBmb3IodmFyIHQ9dGhpcy5maWx0ZXIoZnVuY3Rpb24oZSx0KXtyZXR1cm4gdC5uYW1lLnNsaWNlKDAsci5sZW5ndGgpPT09cn0pLG49MDtuPHQubGVuZ3RoO24rKylkZWxldGUgdGhpcy5maWxlc1t0W25dLm5hbWVdO3JldHVybiB0aGlzfSxnZW5lcmF0ZTpmdW5jdGlvbigpe3Rocm93IG5ldyBFcnJvcihcIlRoaXMgbWV0aG9kIGhhcyBiZWVuIHJlbW92ZWQgaW4gSlNaaXAgMy4wLCBwbGVhc2UgY2hlY2sgdGhlIHVwZ3JhZGUgZ3VpZGUuXCIpfSxnZW5lcmF0ZUludGVybmFsU3RyZWFtOmZ1bmN0aW9uKGUpe3ZhciB0LHI9e307dHJ5e2lmKChyPXUuZXh0ZW5kKGV8fHt9LHtzdHJlYW1GaWxlczohMSxjb21wcmVzc2lvbjpcIlNUT1JFXCIsY29tcHJlc3Npb25PcHRpb25zOm51bGwsdHlwZTpcIlwiLHBsYXRmb3JtOlwiRE9TXCIsY29tbWVudDpudWxsLG1pbWVUeXBlOlwiYXBwbGljYXRpb24vemlwXCIsZW5jb2RlRmlsZU5hbWU6aS51dGY4ZW5jb2RlfSkpLnR5cGU9ci50eXBlLnRvTG93ZXJDYXNlKCksci5jb21wcmVzc2lvbj1yLmNvbXByZXNzaW9uLnRvVXBwZXJDYXNlKCksXCJiaW5hcnlzdHJpbmdcIj09PXIudHlwZSYmKHIudHlwZT1cInN0cmluZ1wiKSwhci50eXBlKXRocm93IG5ldyBFcnJvcihcIk5vIG91dHB1dCB0eXBlIHNwZWNpZmllZC5cIik7dS5jaGVja1N1cHBvcnQoci50eXBlKSxcImRhcndpblwiIT09ci5wbGF0Zm9ybSYmXCJmcmVlYnNkXCIhPT1yLnBsYXRmb3JtJiZcImxpbnV4XCIhPT1yLnBsYXRmb3JtJiZcInN1bm9zXCIhPT1yLnBsYXRmb3JtfHwoci5wbGF0Zm9ybT1cIlVOSVhcIiksXCJ3aW4zMlwiPT09ci5wbGF0Zm9ybSYmKHIucGxhdGZvcm09XCJET1NcIik7dmFyIG49ci5jb21tZW50fHx0aGlzLmNvbW1lbnR8fFwiXCI7dD1vLmdlbmVyYXRlV29ya2VyKHRoaXMscixuKX1jYXRjaChlKXsodD1uZXcgbChcImVycm9yXCIpKS5lcnJvcihlKX1yZXR1cm4gbmV3IGEodCxyLnR5cGV8fFwic3RyaW5nXCIsci5taW1lVHlwZSl9LGdlbmVyYXRlQXN5bmM6ZnVuY3Rpb24oZSx0KXtyZXR1cm4gdGhpcy5nZW5lcmF0ZUludGVybmFsU3RyZWFtKGUpLmFjY3VtdWxhdGUodCl9LGdlbmVyYXRlTm9kZVN0cmVhbTpmdW5jdGlvbihlLHQpe3JldHVybihlPWV8fHt9KS50eXBlfHwoZS50eXBlPVwibm9kZWJ1ZmZlclwiKSx0aGlzLmdlbmVyYXRlSW50ZXJuYWxTdHJlYW0oZSkudG9Ob2RlanNTdHJlYW0odCl9fTt0LmV4cG9ydHM9bn0se1wiLi9jb21wcmVzc2VkT2JqZWN0XCI6MixcIi4vZGVmYXVsdHNcIjo1LFwiLi9nZW5lcmF0ZVwiOjksXCIuL25vZGVqcy9Ob2RlanNTdHJlYW1JbnB1dEFkYXB0ZXJcIjoxMixcIi4vbm9kZWpzVXRpbHNcIjoxNCxcIi4vc3RyZWFtL0dlbmVyaWNXb3JrZXJcIjoyOCxcIi4vc3RyZWFtL1N0cmVhbUhlbHBlclwiOjI5LFwiLi91dGY4XCI6MzEsXCIuL3V0aWxzXCI6MzIsXCIuL3ppcE9iamVjdFwiOjM1fV0sMTY6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt0LmV4cG9ydHM9ZShcInN0cmVhbVwiKX0se3N0cmVhbTp2b2lkIDB9XSwxNzpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3ZhciBuPWUoXCIuL0RhdGFSZWFkZXJcIik7ZnVuY3Rpb24gaShlKXtuLmNhbGwodGhpcyxlKTtmb3IodmFyIHQ9MDt0PHRoaXMuZGF0YS5sZW5ndGg7dCsrKWVbdF09MjU1JmVbdF19ZShcIi4uL3V0aWxzXCIpLmluaGVyaXRzKGksbiksaS5wcm90b3R5cGUuYnl0ZUF0PWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLmRhdGFbdGhpcy56ZXJvK2VdfSxpLnByb3RvdHlwZS5sYXN0SW5kZXhPZlNpZ25hdHVyZT1mdW5jdGlvbihlKXtmb3IodmFyIHQ9ZS5jaGFyQ29kZUF0KDApLHI9ZS5jaGFyQ29kZUF0KDEpLG49ZS5jaGFyQ29kZUF0KDIpLGk9ZS5jaGFyQ29kZUF0KDMpLHM9dGhpcy5sZW5ndGgtNDswPD1zOy0tcylpZih0aGlzLmRhdGFbc109PT10JiZ0aGlzLmRhdGFbcysxXT09PXImJnRoaXMuZGF0YVtzKzJdPT09biYmdGhpcy5kYXRhW3MrM109PT1pKXJldHVybiBzLXRoaXMuemVybztyZXR1cm4tMX0saS5wcm90b3R5cGUucmVhZEFuZENoZWNrU2lnbmF0dXJlPWZ1bmN0aW9uKGUpe3ZhciB0PWUuY2hhckNvZGVBdCgwKSxyPWUuY2hhckNvZGVBdCgxKSxuPWUuY2hhckNvZGVBdCgyKSxpPWUuY2hhckNvZGVBdCgzKSxzPXRoaXMucmVhZERhdGEoNCk7cmV0dXJuIHQ9PT1zWzBdJiZyPT09c1sxXSYmbj09PXNbMl0mJmk9PT1zWzNdfSxpLnByb3RvdHlwZS5yZWFkRGF0YT1mdW5jdGlvbihlKXtpZih0aGlzLmNoZWNrT2Zmc2V0KGUpLDA9PT1lKXJldHVybltdO3ZhciB0PXRoaXMuZGF0YS5zbGljZSh0aGlzLnplcm8rdGhpcy5pbmRleCx0aGlzLnplcm8rdGhpcy5pbmRleCtlKTtyZXR1cm4gdGhpcy5pbmRleCs9ZSx0fSx0LmV4cG9ydHM9aX0se1wiLi4vdXRpbHNcIjozMixcIi4vRGF0YVJlYWRlclwiOjE4fV0sMTg6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt2YXIgbj1lKFwiLi4vdXRpbHNcIik7ZnVuY3Rpb24gaShlKXt0aGlzLmRhdGE9ZSx0aGlzLmxlbmd0aD1lLmxlbmd0aCx0aGlzLmluZGV4PTAsdGhpcy56ZXJvPTB9aS5wcm90b3R5cGU9e2NoZWNrT2Zmc2V0OmZ1bmN0aW9uKGUpe3RoaXMuY2hlY2tJbmRleCh0aGlzLmluZGV4K2UpfSxjaGVja0luZGV4OmZ1bmN0aW9uKGUpe2lmKHRoaXMubGVuZ3RoPHRoaXMuemVybytlfHxlPDApdGhyb3cgbmV3IEVycm9yKFwiRW5kIG9mIGRhdGEgcmVhY2hlZCAoZGF0YSBsZW5ndGggPSBcIit0aGlzLmxlbmd0aCtcIiwgYXNrZWQgaW5kZXggPSBcIitlK1wiKS4gQ29ycnVwdGVkIHppcCA/XCIpfSxzZXRJbmRleDpmdW5jdGlvbihlKXt0aGlzLmNoZWNrSW5kZXgoZSksdGhpcy5pbmRleD1lfSxza2lwOmZ1bmN0aW9uKGUpe3RoaXMuc2V0SW5kZXgodGhpcy5pbmRleCtlKX0sYnl0ZUF0OmZ1bmN0aW9uKCl7fSxyZWFkSW50OmZ1bmN0aW9uKGUpe3ZhciB0LHI9MDtmb3IodGhpcy5jaGVja09mZnNldChlKSx0PXRoaXMuaW5kZXgrZS0xO3Q+PXRoaXMuaW5kZXg7dC0tKXI9KHI8PDgpK3RoaXMuYnl0ZUF0KHQpO3JldHVybiB0aGlzLmluZGV4Kz1lLHJ9LHJlYWRTdHJpbmc6ZnVuY3Rpb24oZSl7cmV0dXJuIG4udHJhbnNmb3JtVG8oXCJzdHJpbmdcIix0aGlzLnJlYWREYXRhKGUpKX0scmVhZERhdGE6ZnVuY3Rpb24oKXt9LGxhc3RJbmRleE9mU2lnbmF0dXJlOmZ1bmN0aW9uKCl7fSxyZWFkQW5kQ2hlY2tTaWduYXR1cmU6ZnVuY3Rpb24oKXt9LHJlYWREYXRlOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcy5yZWFkSW50KDQpO3JldHVybiBuZXcgRGF0ZShEYXRlLlVUQygxOTgwKyhlPj4yNSYxMjcpLChlPj4yMSYxNSktMSxlPj4xNiYzMSxlPj4xMSYzMSxlPj41JjYzLCgzMSZlKTw8MSkpfX0sdC5leHBvcnRzPWl9LHtcIi4uL3V0aWxzXCI6MzJ9XSwxOTpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3ZhciBuPWUoXCIuL1VpbnQ4QXJyYXlSZWFkZXJcIik7ZnVuY3Rpb24gaShlKXtuLmNhbGwodGhpcyxlKX1lKFwiLi4vdXRpbHNcIikuaW5oZXJpdHMoaSxuKSxpLnByb3RvdHlwZS5yZWFkRGF0YT1mdW5jdGlvbihlKXt0aGlzLmNoZWNrT2Zmc2V0KGUpO3ZhciB0PXRoaXMuZGF0YS5zbGljZSh0aGlzLnplcm8rdGhpcy5pbmRleCx0aGlzLnplcm8rdGhpcy5pbmRleCtlKTtyZXR1cm4gdGhpcy5pbmRleCs9ZSx0fSx0LmV4cG9ydHM9aX0se1wiLi4vdXRpbHNcIjozMixcIi4vVWludDhBcnJheVJlYWRlclwiOjIxfV0sMjA6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt2YXIgbj1lKFwiLi9EYXRhUmVhZGVyXCIpO2Z1bmN0aW9uIGkoZSl7bi5jYWxsKHRoaXMsZSl9ZShcIi4uL3V0aWxzXCIpLmluaGVyaXRzKGksbiksaS5wcm90b3R5cGUuYnl0ZUF0PWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLmRhdGEuY2hhckNvZGVBdCh0aGlzLnplcm8rZSl9LGkucHJvdG90eXBlLmxhc3RJbmRleE9mU2lnbmF0dXJlPWZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLmRhdGEubGFzdEluZGV4T2YoZSktdGhpcy56ZXJvfSxpLnByb3RvdHlwZS5yZWFkQW5kQ2hlY2tTaWduYXR1cmU9ZnVuY3Rpb24oZSl7cmV0dXJuIGU9PT10aGlzLnJlYWREYXRhKDQpfSxpLnByb3RvdHlwZS5yZWFkRGF0YT1mdW5jdGlvbihlKXt0aGlzLmNoZWNrT2Zmc2V0KGUpO3ZhciB0PXRoaXMuZGF0YS5zbGljZSh0aGlzLnplcm8rdGhpcy5pbmRleCx0aGlzLnplcm8rdGhpcy5pbmRleCtlKTtyZXR1cm4gdGhpcy5pbmRleCs9ZSx0fSx0LmV4cG9ydHM9aX0se1wiLi4vdXRpbHNcIjozMixcIi4vRGF0YVJlYWRlclwiOjE4fV0sMjE6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt2YXIgbj1lKFwiLi9BcnJheVJlYWRlclwiKTtmdW5jdGlvbiBpKGUpe24uY2FsbCh0aGlzLGUpfWUoXCIuLi91dGlsc1wiKS5pbmhlcml0cyhpLG4pLGkucHJvdG90eXBlLnJlYWREYXRhPWZ1bmN0aW9uKGUpe2lmKHRoaXMuY2hlY2tPZmZzZXQoZSksMD09PWUpcmV0dXJuIG5ldyBVaW50OEFycmF5KDApO3ZhciB0PXRoaXMuZGF0YS5zdWJhcnJheSh0aGlzLnplcm8rdGhpcy5pbmRleCx0aGlzLnplcm8rdGhpcy5pbmRleCtlKTtyZXR1cm4gdGhpcy5pbmRleCs9ZSx0fSx0LmV4cG9ydHM9aX0se1wiLi4vdXRpbHNcIjozMixcIi4vQXJyYXlSZWFkZXJcIjoxN31dLDIyOltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7dmFyIG49ZShcIi4uL3V0aWxzXCIpLGk9ZShcIi4uL3N1cHBvcnRcIikscz1lKFwiLi9BcnJheVJlYWRlclwiKSxhPWUoXCIuL1N0cmluZ1JlYWRlclwiKSxvPWUoXCIuL05vZGVCdWZmZXJSZWFkZXJcIiksaD1lKFwiLi9VaW50OEFycmF5UmVhZGVyXCIpO3QuZXhwb3J0cz1mdW5jdGlvbihlKXt2YXIgdD1uLmdldFR5cGVPZihlKTtyZXR1cm4gbi5jaGVja1N1cHBvcnQodCksXCJzdHJpbmdcIiE9PXR8fGkudWludDhhcnJheT9cIm5vZGVidWZmZXJcIj09PXQ/bmV3IG8oZSk6aS51aW50OGFycmF5P25ldyBoKG4udHJhbnNmb3JtVG8oXCJ1aW50OGFycmF5XCIsZSkpOm5ldyBzKG4udHJhbnNmb3JtVG8oXCJhcnJheVwiLGUpKTpuZXcgYShlKX19LHtcIi4uL3N1cHBvcnRcIjozMCxcIi4uL3V0aWxzXCI6MzIsXCIuL0FycmF5UmVhZGVyXCI6MTcsXCIuL05vZGVCdWZmZXJSZWFkZXJcIjoxOSxcIi4vU3RyaW5nUmVhZGVyXCI6MjAsXCIuL1VpbnQ4QXJyYXlSZWFkZXJcIjoyMX1dLDIzOltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7ci5MT0NBTF9GSUxFX0hFQURFUj1cIlBLXHUwMDAzXHUwMDA0XCIsci5DRU5UUkFMX0ZJTEVfSEVBREVSPVwiUEtcdTAwMDFcdTAwMDJcIixyLkNFTlRSQUxfRElSRUNUT1JZX0VORD1cIlBLXHUwMDA1XHUwMDA2XCIsci5aSVA2NF9DRU5UUkFMX0RJUkVDVE9SWV9MT0NBVE9SPVwiUEtcdTAwMDZcdTAwMDdcIixyLlpJUDY0X0NFTlRSQUxfRElSRUNUT1JZX0VORD1cIlBLXHUwMDA2XHUwMDA2XCIsci5EQVRBX0RFU0NSSVBUT1I9XCJQS1x1MDAwN1xcYlwifSx7fV0sMjQ6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt2YXIgbj1lKFwiLi9HZW5lcmljV29ya2VyXCIpLGk9ZShcIi4uL3V0aWxzXCIpO2Z1bmN0aW9uIHMoZSl7bi5jYWxsKHRoaXMsXCJDb252ZXJ0V29ya2VyIHRvIFwiK2UpLHRoaXMuZGVzdFR5cGU9ZX1pLmluaGVyaXRzKHMsbikscy5wcm90b3R5cGUucHJvY2Vzc0NodW5rPWZ1bmN0aW9uKGUpe3RoaXMucHVzaCh7ZGF0YTppLnRyYW5zZm9ybVRvKHRoaXMuZGVzdFR5cGUsZS5kYXRhKSxtZXRhOmUubWV0YX0pfSx0LmV4cG9ydHM9c30se1wiLi4vdXRpbHNcIjozMixcIi4vR2VuZXJpY1dvcmtlclwiOjI4fV0sMjU6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt2YXIgbj1lKFwiLi9HZW5lcmljV29ya2VyXCIpLGk9ZShcIi4uL2NyYzMyXCIpO2Z1bmN0aW9uIHMoKXtuLmNhbGwodGhpcyxcIkNyYzMyUHJvYmVcIiksdGhpcy53aXRoU3RyZWFtSW5mbyhcImNyYzMyXCIsMCl9ZShcIi4uL3V0aWxzXCIpLmluaGVyaXRzKHMsbikscy5wcm90b3R5cGUucHJvY2Vzc0NodW5rPWZ1bmN0aW9uKGUpe3RoaXMuc3RyZWFtSW5mby5jcmMzMj1pKGUuZGF0YSx0aGlzLnN0cmVhbUluZm8uY3JjMzJ8fDApLHRoaXMucHVzaChlKX0sdC5leHBvcnRzPXN9LHtcIi4uL2NyYzMyXCI6NCxcIi4uL3V0aWxzXCI6MzIsXCIuL0dlbmVyaWNXb3JrZXJcIjoyOH1dLDI2OltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7dmFyIG49ZShcIi4uL3V0aWxzXCIpLGk9ZShcIi4vR2VuZXJpY1dvcmtlclwiKTtmdW5jdGlvbiBzKGUpe2kuY2FsbCh0aGlzLFwiRGF0YUxlbmd0aFByb2JlIGZvciBcIitlKSx0aGlzLnByb3BOYW1lPWUsdGhpcy53aXRoU3RyZWFtSW5mbyhlLDApfW4uaW5oZXJpdHMocyxpKSxzLnByb3RvdHlwZS5wcm9jZXNzQ2h1bms9ZnVuY3Rpb24oZSl7aWYoZSl7dmFyIHQ9dGhpcy5zdHJlYW1JbmZvW3RoaXMucHJvcE5hbWVdfHwwO3RoaXMuc3RyZWFtSW5mb1t0aGlzLnByb3BOYW1lXT10K2UuZGF0YS5sZW5ndGh9aS5wcm90b3R5cGUucHJvY2Vzc0NodW5rLmNhbGwodGhpcyxlKX0sdC5leHBvcnRzPXN9LHtcIi4uL3V0aWxzXCI6MzIsXCIuL0dlbmVyaWNXb3JrZXJcIjoyOH1dLDI3OltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7dmFyIG49ZShcIi4uL3V0aWxzXCIpLGk9ZShcIi4vR2VuZXJpY1dvcmtlclwiKTtmdW5jdGlvbiBzKGUpe2kuY2FsbCh0aGlzLFwiRGF0YVdvcmtlclwiKTt2YXIgdD10aGlzO3RoaXMuZGF0YUlzUmVhZHk9ITEsdGhpcy5pbmRleD0wLHRoaXMubWF4PTAsdGhpcy5kYXRhPW51bGwsdGhpcy50eXBlPVwiXCIsdGhpcy5fdGlja1NjaGVkdWxlZD0hMSxlLnRoZW4oZnVuY3Rpb24oZSl7dC5kYXRhSXNSZWFkeT0hMCx0LmRhdGE9ZSx0Lm1heD1lJiZlLmxlbmd0aHx8MCx0LnR5cGU9bi5nZXRUeXBlT2YoZSksdC5pc1BhdXNlZHx8dC5fdGlja0FuZFJlcGVhdCgpfSxmdW5jdGlvbihlKXt0LmVycm9yKGUpfSl9bi5pbmhlcml0cyhzLGkpLHMucHJvdG90eXBlLmNsZWFuVXA9ZnVuY3Rpb24oKXtpLnByb3RvdHlwZS5jbGVhblVwLmNhbGwodGhpcyksdGhpcy5kYXRhPW51bGx9LHMucHJvdG90eXBlLnJlc3VtZT1mdW5jdGlvbigpe3JldHVybiEhaS5wcm90b3R5cGUucmVzdW1lLmNhbGwodGhpcykmJighdGhpcy5fdGlja1NjaGVkdWxlZCYmdGhpcy5kYXRhSXNSZWFkeSYmKHRoaXMuX3RpY2tTY2hlZHVsZWQ9ITAsbi5kZWxheSh0aGlzLl90aWNrQW5kUmVwZWF0LFtdLHRoaXMpKSwhMCl9LHMucHJvdG90eXBlLl90aWNrQW5kUmVwZWF0PWZ1bmN0aW9uKCl7dGhpcy5fdGlja1NjaGVkdWxlZD0hMSx0aGlzLmlzUGF1c2VkfHx0aGlzLmlzRmluaXNoZWR8fCh0aGlzLl90aWNrKCksdGhpcy5pc0ZpbmlzaGVkfHwobi5kZWxheSh0aGlzLl90aWNrQW5kUmVwZWF0LFtdLHRoaXMpLHRoaXMuX3RpY2tTY2hlZHVsZWQ9ITApKX0scy5wcm90b3R5cGUuX3RpY2s9ZnVuY3Rpb24oKXtpZih0aGlzLmlzUGF1c2VkfHx0aGlzLmlzRmluaXNoZWQpcmV0dXJuITE7dmFyIGU9bnVsbCx0PU1hdGgubWluKHRoaXMubWF4LHRoaXMuaW5kZXgrMTYzODQpO2lmKHRoaXMuaW5kZXg+PXRoaXMubWF4KXJldHVybiB0aGlzLmVuZCgpO3N3aXRjaCh0aGlzLnR5cGUpe2Nhc2VcInN0cmluZ1wiOmU9dGhpcy5kYXRhLnN1YnN0cmluZyh0aGlzLmluZGV4LHQpO2JyZWFrO2Nhc2VcInVpbnQ4YXJyYXlcIjplPXRoaXMuZGF0YS5zdWJhcnJheSh0aGlzLmluZGV4LHQpO2JyZWFrO2Nhc2VcImFycmF5XCI6Y2FzZVwibm9kZWJ1ZmZlclwiOmU9dGhpcy5kYXRhLnNsaWNlKHRoaXMuaW5kZXgsdCl9cmV0dXJuIHRoaXMuaW5kZXg9dCx0aGlzLnB1c2goe2RhdGE6ZSxtZXRhOntwZXJjZW50OnRoaXMubWF4P3RoaXMuaW5kZXgvdGhpcy5tYXgqMTAwOjB9fSl9LHQuZXhwb3J0cz1zfSx7XCIuLi91dGlsc1wiOjMyLFwiLi9HZW5lcmljV29ya2VyXCI6Mjh9XSwyODpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIG4oZSl7dGhpcy5uYW1lPWV8fFwiZGVmYXVsdFwiLHRoaXMuc3RyZWFtSW5mbz17fSx0aGlzLmdlbmVyYXRlZEVycm9yPW51bGwsdGhpcy5leHRyYVN0cmVhbUluZm89e30sdGhpcy5pc1BhdXNlZD0hMCx0aGlzLmlzRmluaXNoZWQ9ITEsdGhpcy5pc0xvY2tlZD0hMSx0aGlzLl9saXN0ZW5lcnM9e2RhdGE6W10sZW5kOltdLGVycm9yOltdfSx0aGlzLnByZXZpb3VzPW51bGx9bi5wcm90b3R5cGU9e3B1c2g6ZnVuY3Rpb24oZSl7dGhpcy5lbWl0KFwiZGF0YVwiLGUpfSxlbmQ6ZnVuY3Rpb24oKXtpZih0aGlzLmlzRmluaXNoZWQpcmV0dXJuITE7dGhpcy5mbHVzaCgpO3RyeXt0aGlzLmVtaXQoXCJlbmRcIiksdGhpcy5jbGVhblVwKCksdGhpcy5pc0ZpbmlzaGVkPSEwfWNhdGNoKGUpe3RoaXMuZW1pdChcImVycm9yXCIsZSl9cmV0dXJuITB9LGVycm9yOmZ1bmN0aW9uKGUpe3JldHVybiF0aGlzLmlzRmluaXNoZWQmJih0aGlzLmlzUGF1c2VkP3RoaXMuZ2VuZXJhdGVkRXJyb3I9ZToodGhpcy5pc0ZpbmlzaGVkPSEwLHRoaXMuZW1pdChcImVycm9yXCIsZSksdGhpcy5wcmV2aW91cyYmdGhpcy5wcmV2aW91cy5lcnJvcihlKSx0aGlzLmNsZWFuVXAoKSksITApfSxvbjpmdW5jdGlvbihlLHQpe3JldHVybiB0aGlzLl9saXN0ZW5lcnNbZV0ucHVzaCh0KSx0aGlzfSxjbGVhblVwOmZ1bmN0aW9uKCl7dGhpcy5zdHJlYW1JbmZvPXRoaXMuZ2VuZXJhdGVkRXJyb3I9dGhpcy5leHRyYVN0cmVhbUluZm89bnVsbCx0aGlzLl9saXN0ZW5lcnM9W119LGVtaXQ6ZnVuY3Rpb24oZSx0KXtpZih0aGlzLl9saXN0ZW5lcnNbZV0pZm9yKHZhciByPTA7cjx0aGlzLl9saXN0ZW5lcnNbZV0ubGVuZ3RoO3IrKyl0aGlzLl9saXN0ZW5lcnNbZV1bcl0uY2FsbCh0aGlzLHQpfSxwaXBlOmZ1bmN0aW9uKGUpe3JldHVybiBlLnJlZ2lzdGVyUHJldmlvdXModGhpcyl9LHJlZ2lzdGVyUHJldmlvdXM6ZnVuY3Rpb24oZSl7aWYodGhpcy5pc0xvY2tlZCl0aHJvdyBuZXcgRXJyb3IoXCJUaGUgc3RyZWFtICdcIit0aGlzK1wiJyBoYXMgYWxyZWFkeSBiZWVuIHVzZWQuXCIpO3RoaXMuc3RyZWFtSW5mbz1lLnN0cmVhbUluZm8sdGhpcy5tZXJnZVN0cmVhbUluZm8oKSx0aGlzLnByZXZpb3VzPWU7dmFyIHQ9dGhpcztyZXR1cm4gZS5vbihcImRhdGFcIixmdW5jdGlvbihlKXt0LnByb2Nlc3NDaHVuayhlKX0pLGUub24oXCJlbmRcIixmdW5jdGlvbigpe3QuZW5kKCl9KSxlLm9uKFwiZXJyb3JcIixmdW5jdGlvbihlKXt0LmVycm9yKGUpfSksdGhpc30scGF1c2U6ZnVuY3Rpb24oKXtyZXR1cm4hdGhpcy5pc1BhdXNlZCYmIXRoaXMuaXNGaW5pc2hlZCYmKHRoaXMuaXNQYXVzZWQ9ITAsdGhpcy5wcmV2aW91cyYmdGhpcy5wcmV2aW91cy5wYXVzZSgpLCEwKX0scmVzdW1lOmZ1bmN0aW9uKCl7aWYoIXRoaXMuaXNQYXVzZWR8fHRoaXMuaXNGaW5pc2hlZClyZXR1cm4hMTt2YXIgZT10aGlzLmlzUGF1c2VkPSExO3JldHVybiB0aGlzLmdlbmVyYXRlZEVycm9yJiYodGhpcy5lcnJvcih0aGlzLmdlbmVyYXRlZEVycm9yKSxlPSEwKSx0aGlzLnByZXZpb3VzJiZ0aGlzLnByZXZpb3VzLnJlc3VtZSgpLCFlfSxmbHVzaDpmdW5jdGlvbigpe30scHJvY2Vzc0NodW5rOmZ1bmN0aW9uKGUpe3RoaXMucHVzaChlKX0sd2l0aFN0cmVhbUluZm86ZnVuY3Rpb24oZSx0KXtyZXR1cm4gdGhpcy5leHRyYVN0cmVhbUluZm9bZV09dCx0aGlzLm1lcmdlU3RyZWFtSW5mbygpLHRoaXN9LG1lcmdlU3RyZWFtSW5mbzpmdW5jdGlvbigpe2Zvcih2YXIgZSBpbiB0aGlzLmV4dHJhU3RyZWFtSW5mbylPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodGhpcy5leHRyYVN0cmVhbUluZm8sZSkmJih0aGlzLnN0cmVhbUluZm9bZV09dGhpcy5leHRyYVN0cmVhbUluZm9bZV0pfSxsb2NrOmZ1bmN0aW9uKCl7aWYodGhpcy5pc0xvY2tlZCl0aHJvdyBuZXcgRXJyb3IoXCJUaGUgc3RyZWFtICdcIit0aGlzK1wiJyBoYXMgYWxyZWFkeSBiZWVuIHVzZWQuXCIpO3RoaXMuaXNMb2NrZWQ9ITAsdGhpcy5wcmV2aW91cyYmdGhpcy5wcmV2aW91cy5sb2NrKCl9LHRvU3RyaW5nOmZ1bmN0aW9uKCl7dmFyIGU9XCJXb3JrZXIgXCIrdGhpcy5uYW1lO3JldHVybiB0aGlzLnByZXZpb3VzP3RoaXMucHJldmlvdXMrXCIgLT4gXCIrZTplfX0sdC5leHBvcnRzPW59LHt9XSwyOTpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3ZhciBoPWUoXCIuLi91dGlsc1wiKSxpPWUoXCIuL0NvbnZlcnRXb3JrZXJcIikscz1lKFwiLi9HZW5lcmljV29ya2VyXCIpLHU9ZShcIi4uL2Jhc2U2NFwiKSxuPWUoXCIuLi9zdXBwb3J0XCIpLGE9ZShcIi4uL2V4dGVybmFsXCIpLG89bnVsbDtpZihuLm5vZGVzdHJlYW0pdHJ5e289ZShcIi4uL25vZGVqcy9Ob2RlanNTdHJlYW1PdXRwdXRBZGFwdGVyXCIpfWNhdGNoKGUpe31mdW5jdGlvbiBsKGUsbyl7cmV0dXJuIG5ldyBhLlByb21pc2UoZnVuY3Rpb24odCxyKXt2YXIgbj1bXSxpPWUuX2ludGVybmFsVHlwZSxzPWUuX291dHB1dFR5cGUsYT1lLl9taW1lVHlwZTtlLm9uKFwiZGF0YVwiLGZ1bmN0aW9uKGUsdCl7bi5wdXNoKGUpLG8mJm8odCl9KS5vbihcImVycm9yXCIsZnVuY3Rpb24oZSl7bj1bXSxyKGUpfSkub24oXCJlbmRcIixmdW5jdGlvbigpe3RyeXt2YXIgZT1mdW5jdGlvbihlLHQscil7c3dpdGNoKGUpe2Nhc2VcImJsb2JcIjpyZXR1cm4gaC5uZXdCbG9iKGgudHJhbnNmb3JtVG8oXCJhcnJheWJ1ZmZlclwiLHQpLHIpO2Nhc2VcImJhc2U2NFwiOnJldHVybiB1LmVuY29kZSh0KTtkZWZhdWx0OnJldHVybiBoLnRyYW5zZm9ybVRvKGUsdCl9fShzLGZ1bmN0aW9uKGUsdCl7dmFyIHIsbj0wLGk9bnVsbCxzPTA7Zm9yKHI9MDtyPHQubGVuZ3RoO3IrKylzKz10W3JdLmxlbmd0aDtzd2l0Y2goZSl7Y2FzZVwic3RyaW5nXCI6cmV0dXJuIHQuam9pbihcIlwiKTtjYXNlXCJhcnJheVwiOnJldHVybiBBcnJheS5wcm90b3R5cGUuY29uY2F0LmFwcGx5KFtdLHQpO2Nhc2VcInVpbnQ4YXJyYXlcIjpmb3IoaT1uZXcgVWludDhBcnJheShzKSxyPTA7cjx0Lmxlbmd0aDtyKyspaS5zZXQodFtyXSxuKSxuKz10W3JdLmxlbmd0aDtyZXR1cm4gaTtjYXNlXCJub2RlYnVmZmVyXCI6cmV0dXJuIEJ1ZmZlci5jb25jYXQodCk7ZGVmYXVsdDp0aHJvdyBuZXcgRXJyb3IoXCJjb25jYXQgOiB1bnN1cHBvcnRlZCB0eXBlICdcIitlK1wiJ1wiKX19KGksbiksYSk7dChlKX1jYXRjaChlKXtyKGUpfW49W119KS5yZXN1bWUoKX0pfWZ1bmN0aW9uIGYoZSx0LHIpe3ZhciBuPXQ7c3dpdGNoKHQpe2Nhc2VcImJsb2JcIjpjYXNlXCJhcnJheWJ1ZmZlclwiOm49XCJ1aW50OGFycmF5XCI7YnJlYWs7Y2FzZVwiYmFzZTY0XCI6bj1cInN0cmluZ1wifXRyeXt0aGlzLl9pbnRlcm5hbFR5cGU9bix0aGlzLl9vdXRwdXRUeXBlPXQsdGhpcy5fbWltZVR5cGU9cixoLmNoZWNrU3VwcG9ydChuKSx0aGlzLl93b3JrZXI9ZS5waXBlKG5ldyBpKG4pKSxlLmxvY2soKX1jYXRjaChlKXt0aGlzLl93b3JrZXI9bmV3IHMoXCJlcnJvclwiKSx0aGlzLl93b3JrZXIuZXJyb3IoZSl9fWYucHJvdG90eXBlPXthY2N1bXVsYXRlOmZ1bmN0aW9uKGUpe3JldHVybiBsKHRoaXMsZSl9LG9uOmZ1bmN0aW9uKGUsdCl7dmFyIHI9dGhpcztyZXR1cm5cImRhdGFcIj09PWU/dGhpcy5fd29ya2VyLm9uKGUsZnVuY3Rpb24oZSl7dC5jYWxsKHIsZS5kYXRhLGUubWV0YSl9KTp0aGlzLl93b3JrZXIub24oZSxmdW5jdGlvbigpe2guZGVsYXkodCxhcmd1bWVudHMscil9KSx0aGlzfSxyZXN1bWU6ZnVuY3Rpb24oKXtyZXR1cm4gaC5kZWxheSh0aGlzLl93b3JrZXIucmVzdW1lLFtdLHRoaXMuX3dvcmtlciksdGhpc30scGF1c2U6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5fd29ya2VyLnBhdXNlKCksdGhpc30sdG9Ob2RlanNTdHJlYW06ZnVuY3Rpb24oZSl7aWYoaC5jaGVja1N1cHBvcnQoXCJub2Rlc3RyZWFtXCIpLFwibm9kZWJ1ZmZlclwiIT09dGhpcy5fb3V0cHV0VHlwZSl0aHJvdyBuZXcgRXJyb3IodGhpcy5fb3V0cHV0VHlwZStcIiBpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoaXMgbWV0aG9kXCIpO3JldHVybiBuZXcgbyh0aGlzLHtvYmplY3RNb2RlOlwibm9kZWJ1ZmZlclwiIT09dGhpcy5fb3V0cHV0VHlwZX0sZSl9fSx0LmV4cG9ydHM9Zn0se1wiLi4vYmFzZTY0XCI6MSxcIi4uL2V4dGVybmFsXCI6NixcIi4uL25vZGVqcy9Ob2RlanNTdHJlYW1PdXRwdXRBZGFwdGVyXCI6MTMsXCIuLi9zdXBwb3J0XCI6MzAsXCIuLi91dGlsc1wiOjMyLFwiLi9Db252ZXJ0V29ya2VyXCI6MjQsXCIuL0dlbmVyaWNXb3JrZXJcIjoyOH1dLDMwOltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7aWYoci5iYXNlNjQ9ITAsci5hcnJheT0hMCxyLnN0cmluZz0hMCxyLmFycmF5YnVmZmVyPVwidW5kZWZpbmVkXCIhPXR5cGVvZiBBcnJheUJ1ZmZlciYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIFVpbnQ4QXJyYXksci5ub2RlYnVmZmVyPVwidW5kZWZpbmVkXCIhPXR5cGVvZiBCdWZmZXIsci51aW50OGFycmF5PVwidW5kZWZpbmVkXCIhPXR5cGVvZiBVaW50OEFycmF5LFwidW5kZWZpbmVkXCI9PXR5cGVvZiBBcnJheUJ1ZmZlcilyLmJsb2I9ITE7ZWxzZXt2YXIgbj1uZXcgQXJyYXlCdWZmZXIoMCk7dHJ5e3IuYmxvYj0wPT09bmV3IEJsb2IoW25dLHt0eXBlOlwiYXBwbGljYXRpb24vemlwXCJ9KS5zaXplfWNhdGNoKGUpe3RyeXt2YXIgaT1uZXcoc2VsZi5CbG9iQnVpbGRlcnx8c2VsZi5XZWJLaXRCbG9iQnVpbGRlcnx8c2VsZi5Nb3pCbG9iQnVpbGRlcnx8c2VsZi5NU0Jsb2JCdWlsZGVyKTtpLmFwcGVuZChuKSxyLmJsb2I9MD09PWkuZ2V0QmxvYihcImFwcGxpY2F0aW9uL3ppcFwiKS5zaXplfWNhdGNoKGUpe3IuYmxvYj0hMX19fXRyeXtyLm5vZGVzdHJlYW09ISFlKFwicmVhZGFibGUtc3RyZWFtXCIpLlJlYWRhYmxlfWNhdGNoKGUpe3Iubm9kZXN0cmVhbT0hMX19LHtcInJlYWRhYmxlLXN0cmVhbVwiOjE2fV0sMzE6W2Z1bmN0aW9uKGUsdCxzKXtcInVzZSBzdHJpY3RcIjtmb3IodmFyIG89ZShcIi4vdXRpbHNcIiksaD1lKFwiLi9zdXBwb3J0XCIpLHI9ZShcIi4vbm9kZWpzVXRpbHNcIiksbj1lKFwiLi9zdHJlYW0vR2VuZXJpY1dvcmtlclwiKSx1PW5ldyBBcnJheSgyNTYpLGk9MDtpPDI1NjtpKyspdVtpXT0yNTI8PWk/NjoyNDg8PWk/NToyNDA8PWk/NDoyMjQ8PWk/MzoxOTI8PWk/MjoxO3VbMjU0XT11WzI1NF09MTtmdW5jdGlvbiBhKCl7bi5jYWxsKHRoaXMsXCJ1dGYtOCBkZWNvZGVcIiksdGhpcy5sZWZ0T3Zlcj1udWxsfWZ1bmN0aW9uIGwoKXtuLmNhbGwodGhpcyxcInV0Zi04IGVuY29kZVwiKX1zLnV0ZjhlbmNvZGU9ZnVuY3Rpb24oZSl7cmV0dXJuIGgubm9kZWJ1ZmZlcj9yLm5ld0J1ZmZlckZyb20oZSxcInV0Zi04XCIpOmZ1bmN0aW9uKGUpe3ZhciB0LHIsbixpLHMsYT1lLmxlbmd0aCxvPTA7Zm9yKGk9MDtpPGE7aSsrKTU1Mjk2PT0oNjQ1MTImKHI9ZS5jaGFyQ29kZUF0KGkpKSkmJmkrMTxhJiY1NjMyMD09KDY0NTEyJihuPWUuY2hhckNvZGVBdChpKzEpKSkmJihyPTY1NTM2KyhyLTU1Mjk2PDwxMCkrKG4tNTYzMjApLGkrKyksbys9cjwxMjg/MTpyPDIwNDg/MjpyPDY1NTM2PzM6NDtmb3IodD1oLnVpbnQ4YXJyYXk/bmV3IFVpbnQ4QXJyYXkobyk6bmV3IEFycmF5KG8pLGk9cz0wO3M8bztpKyspNTUyOTY9PSg2NDUxMiYocj1lLmNoYXJDb2RlQXQoaSkpKSYmaSsxPGEmJjU2MzIwPT0oNjQ1MTImKG49ZS5jaGFyQ29kZUF0KGkrMSkpKSYmKHI9NjU1MzYrKHItNTUyOTY8PDEwKSsobi01NjMyMCksaSsrKSxyPDEyOD90W3MrK109cjoocjwyMDQ4P3RbcysrXT0xOTJ8cj4+PjY6KHI8NjU1MzY/dFtzKytdPTIyNHxyPj4+MTI6KHRbcysrXT0yNDB8cj4+PjE4LHRbcysrXT0xMjh8cj4+PjEyJjYzKSx0W3MrK109MTI4fHI+Pj42JjYzKSx0W3MrK109MTI4fDYzJnIpO3JldHVybiB0fShlKX0scy51dGY4ZGVjb2RlPWZ1bmN0aW9uKGUpe3JldHVybiBoLm5vZGVidWZmZXI/by50cmFuc2Zvcm1UbyhcIm5vZGVidWZmZXJcIixlKS50b1N0cmluZyhcInV0Zi04XCIpOmZ1bmN0aW9uKGUpe3ZhciB0LHIsbixpLHM9ZS5sZW5ndGgsYT1uZXcgQXJyYXkoMipzKTtmb3IodD1yPTA7dDxzOylpZigobj1lW3QrK10pPDEyOClhW3IrK109bjtlbHNlIGlmKDQ8KGk9dVtuXSkpYVtyKytdPTY1NTMzLHQrPWktMTtlbHNle2ZvcihuJj0yPT09aT8zMTozPT09aT8xNTo3OzE8aSYmdDxzOyluPW48PDZ8NjMmZVt0KytdLGktLTsxPGk/YVtyKytdPTY1NTMzOm48NjU1MzY/YVtyKytdPW46KG4tPTY1NTM2LGFbcisrXT01NTI5NnxuPj4xMCYxMDIzLGFbcisrXT01NjMyMHwxMDIzJm4pfXJldHVybiBhLmxlbmd0aCE9PXImJihhLnN1YmFycmF5P2E9YS5zdWJhcnJheSgwLHIpOmEubGVuZ3RoPXIpLG8uYXBwbHlGcm9tQ2hhckNvZGUoYSl9KGU9by50cmFuc2Zvcm1UbyhoLnVpbnQ4YXJyYXk/XCJ1aW50OGFycmF5XCI6XCJhcnJheVwiLGUpKX0sby5pbmhlcml0cyhhLG4pLGEucHJvdG90eXBlLnByb2Nlc3NDaHVuaz1mdW5jdGlvbihlKXt2YXIgdD1vLnRyYW5zZm9ybVRvKGgudWludDhhcnJheT9cInVpbnQ4YXJyYXlcIjpcImFycmF5XCIsZS5kYXRhKTtpZih0aGlzLmxlZnRPdmVyJiZ0aGlzLmxlZnRPdmVyLmxlbmd0aCl7aWYoaC51aW50OGFycmF5KXt2YXIgcj10Oyh0PW5ldyBVaW50OEFycmF5KHIubGVuZ3RoK3RoaXMubGVmdE92ZXIubGVuZ3RoKSkuc2V0KHRoaXMubGVmdE92ZXIsMCksdC5zZXQocix0aGlzLmxlZnRPdmVyLmxlbmd0aCl9ZWxzZSB0PXRoaXMubGVmdE92ZXIuY29uY2F0KHQpO3RoaXMubGVmdE92ZXI9bnVsbH12YXIgbj1mdW5jdGlvbihlLHQpe3ZhciByO2ZvcigodD10fHxlLmxlbmd0aCk+ZS5sZW5ndGgmJih0PWUubGVuZ3RoKSxyPXQtMTswPD1yJiYxMjg9PSgxOTImZVtyXSk7KXItLTtyZXR1cm4gcjwwP3Q6MD09PXI/dDpyK3VbZVtyXV0+dD9yOnR9KHQpLGk9dDtuIT09dC5sZW5ndGgmJihoLnVpbnQ4YXJyYXk/KGk9dC5zdWJhcnJheSgwLG4pLHRoaXMubGVmdE92ZXI9dC5zdWJhcnJheShuLHQubGVuZ3RoKSk6KGk9dC5zbGljZSgwLG4pLHRoaXMubGVmdE92ZXI9dC5zbGljZShuLHQubGVuZ3RoKSkpLHRoaXMucHVzaCh7ZGF0YTpzLnV0ZjhkZWNvZGUoaSksbWV0YTplLm1ldGF9KX0sYS5wcm90b3R5cGUuZmx1c2g9ZnVuY3Rpb24oKXt0aGlzLmxlZnRPdmVyJiZ0aGlzLmxlZnRPdmVyLmxlbmd0aCYmKHRoaXMucHVzaCh7ZGF0YTpzLnV0ZjhkZWNvZGUodGhpcy5sZWZ0T3ZlciksbWV0YTp7fX0pLHRoaXMubGVmdE92ZXI9bnVsbCl9LHMuVXRmOERlY29kZVdvcmtlcj1hLG8uaW5oZXJpdHMobCxuKSxsLnByb3RvdHlwZS5wcm9jZXNzQ2h1bms9ZnVuY3Rpb24oZSl7dGhpcy5wdXNoKHtkYXRhOnMudXRmOGVuY29kZShlLmRhdGEpLG1ldGE6ZS5tZXRhfSl9LHMuVXRmOEVuY29kZVdvcmtlcj1sfSx7XCIuL25vZGVqc1V0aWxzXCI6MTQsXCIuL3N0cmVhbS9HZW5lcmljV29ya2VyXCI6MjgsXCIuL3N1cHBvcnRcIjozMCxcIi4vdXRpbHNcIjozMn1dLDMyOltmdW5jdGlvbihlLHQsYSl7XCJ1c2Ugc3RyaWN0XCI7dmFyIG89ZShcIi4vc3VwcG9ydFwiKSxoPWUoXCIuL2Jhc2U2NFwiKSxyPWUoXCIuL25vZGVqc1V0aWxzXCIpLHU9ZShcIi4vZXh0ZXJuYWxcIik7ZnVuY3Rpb24gbihlKXtyZXR1cm4gZX1mdW5jdGlvbiBsKGUsdCl7Zm9yKHZhciByPTA7cjxlLmxlbmd0aDsrK3IpdFtyXT0yNTUmZS5jaGFyQ29kZUF0KHIpO3JldHVybiB0fWUoXCJzZXRpbW1lZGlhdGVcIiksYS5uZXdCbG9iPWZ1bmN0aW9uKHQscil7YS5jaGVja1N1cHBvcnQoXCJibG9iXCIpO3RyeXtyZXR1cm4gbmV3IEJsb2IoW3RdLHt0eXBlOnJ9KX1jYXRjaChlKXt0cnl7dmFyIG49bmV3KHNlbGYuQmxvYkJ1aWxkZXJ8fHNlbGYuV2ViS2l0QmxvYkJ1aWxkZXJ8fHNlbGYuTW96QmxvYkJ1aWxkZXJ8fHNlbGYuTVNCbG9iQnVpbGRlcik7cmV0dXJuIG4uYXBwZW5kKHQpLG4uZ2V0QmxvYihyKX1jYXRjaChlKXt0aHJvdyBuZXcgRXJyb3IoXCJCdWcgOiBjYW4ndCBjb25zdHJ1Y3QgdGhlIEJsb2IuXCIpfX19O3ZhciBpPXtzdHJpbmdpZnlCeUNodW5rOmZ1bmN0aW9uKGUsdCxyKXt2YXIgbj1bXSxpPTAscz1lLmxlbmd0aDtpZihzPD1yKXJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsZSk7Zm9yKDtpPHM7KVwiYXJyYXlcIj09PXR8fFwibm9kZWJ1ZmZlclwiPT09dD9uLnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLGUuc2xpY2UoaSxNYXRoLm1pbihpK3IscykpKSk6bi5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCxlLnN1YmFycmF5KGksTWF0aC5taW4oaStyLHMpKSkpLGkrPXI7cmV0dXJuIG4uam9pbihcIlwiKX0sc3RyaW5naWZ5QnlDaGFyOmZ1bmN0aW9uKGUpe2Zvcih2YXIgdD1cIlwiLHI9MDtyPGUubGVuZ3RoO3IrKyl0Kz1TdHJpbmcuZnJvbUNoYXJDb2RlKGVbcl0pO3JldHVybiB0fSxhcHBseUNhbkJlVXNlZDp7dWludDhhcnJheTpmdW5jdGlvbigpe3RyeXtyZXR1cm4gby51aW50OGFycmF5JiYxPT09U3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLG5ldyBVaW50OEFycmF5KDEpKS5sZW5ndGh9Y2F0Y2goZSl7cmV0dXJuITF9fSgpLG5vZGVidWZmZXI6ZnVuY3Rpb24oKXt0cnl7cmV0dXJuIG8ubm9kZWJ1ZmZlciYmMT09PVN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCxyLmFsbG9jQnVmZmVyKDEpKS5sZW5ndGh9Y2F0Y2goZSl7cmV0dXJuITF9fSgpfX07ZnVuY3Rpb24gcyhlKXt2YXIgdD02NTUzNixyPWEuZ2V0VHlwZU9mKGUpLG49ITA7aWYoXCJ1aW50OGFycmF5XCI9PT1yP249aS5hcHBseUNhbkJlVXNlZC51aW50OGFycmF5Olwibm9kZWJ1ZmZlclwiPT09ciYmKG49aS5hcHBseUNhbkJlVXNlZC5ub2RlYnVmZmVyKSxuKWZvcig7MTx0Oyl0cnl7cmV0dXJuIGkuc3RyaW5naWZ5QnlDaHVuayhlLHIsdCl9Y2F0Y2goZSl7dD1NYXRoLmZsb29yKHQvMil9cmV0dXJuIGkuc3RyaW5naWZ5QnlDaGFyKGUpfWZ1bmN0aW9uIGYoZSx0KXtmb3IodmFyIHI9MDtyPGUubGVuZ3RoO3IrKyl0W3JdPWVbcl07cmV0dXJuIHR9YS5hcHBseUZyb21DaGFyQ29kZT1zO3ZhciBjPXt9O2Muc3RyaW5nPXtzdHJpbmc6bixhcnJheTpmdW5jdGlvbihlKXtyZXR1cm4gbChlLG5ldyBBcnJheShlLmxlbmd0aCkpfSxhcnJheWJ1ZmZlcjpmdW5jdGlvbihlKXtyZXR1cm4gYy5zdHJpbmcudWludDhhcnJheShlKS5idWZmZXJ9LHVpbnQ4YXJyYXk6ZnVuY3Rpb24oZSl7cmV0dXJuIGwoZSxuZXcgVWludDhBcnJheShlLmxlbmd0aCkpfSxub2RlYnVmZmVyOmZ1bmN0aW9uKGUpe3JldHVybiBsKGUsci5hbGxvY0J1ZmZlcihlLmxlbmd0aCkpfX0sYy5hcnJheT17c3RyaW5nOnMsYXJyYXk6bixhcnJheWJ1ZmZlcjpmdW5jdGlvbihlKXtyZXR1cm4gbmV3IFVpbnQ4QXJyYXkoZSkuYnVmZmVyfSx1aW50OGFycmF5OmZ1bmN0aW9uKGUpe3JldHVybiBuZXcgVWludDhBcnJheShlKX0sbm9kZWJ1ZmZlcjpmdW5jdGlvbihlKXtyZXR1cm4gci5uZXdCdWZmZXJGcm9tKGUpfX0sYy5hcnJheWJ1ZmZlcj17c3RyaW5nOmZ1bmN0aW9uKGUpe3JldHVybiBzKG5ldyBVaW50OEFycmF5KGUpKX0sYXJyYXk6ZnVuY3Rpb24oZSl7cmV0dXJuIGYobmV3IFVpbnQ4QXJyYXkoZSksbmV3IEFycmF5KGUuYnl0ZUxlbmd0aCkpfSxhcnJheWJ1ZmZlcjpuLHVpbnQ4YXJyYXk6ZnVuY3Rpb24oZSl7cmV0dXJuIG5ldyBVaW50OEFycmF5KGUpfSxub2RlYnVmZmVyOmZ1bmN0aW9uKGUpe3JldHVybiByLm5ld0J1ZmZlckZyb20obmV3IFVpbnQ4QXJyYXkoZSkpfX0sYy51aW50OGFycmF5PXtzdHJpbmc6cyxhcnJheTpmdW5jdGlvbihlKXtyZXR1cm4gZihlLG5ldyBBcnJheShlLmxlbmd0aCkpfSxhcnJheWJ1ZmZlcjpmdW5jdGlvbihlKXtyZXR1cm4gZS5idWZmZXJ9LHVpbnQ4YXJyYXk6bixub2RlYnVmZmVyOmZ1bmN0aW9uKGUpe3JldHVybiByLm5ld0J1ZmZlckZyb20oZSl9fSxjLm5vZGVidWZmZXI9e3N0cmluZzpzLGFycmF5OmZ1bmN0aW9uKGUpe3JldHVybiBmKGUsbmV3IEFycmF5KGUubGVuZ3RoKSl9LGFycmF5YnVmZmVyOmZ1bmN0aW9uKGUpe3JldHVybiBjLm5vZGVidWZmZXIudWludDhhcnJheShlKS5idWZmZXJ9LHVpbnQ4YXJyYXk6ZnVuY3Rpb24oZSl7cmV0dXJuIGYoZSxuZXcgVWludDhBcnJheShlLmxlbmd0aCkpfSxub2RlYnVmZmVyOm59LGEudHJhbnNmb3JtVG89ZnVuY3Rpb24oZSx0KXtpZih0PXR8fFwiXCIsIWUpcmV0dXJuIHQ7YS5jaGVja1N1cHBvcnQoZSk7dmFyIHI9YS5nZXRUeXBlT2YodCk7cmV0dXJuIGNbcl1bZV0odCl9LGEucmVzb2x2ZT1mdW5jdGlvbihlKXtmb3IodmFyIHQ9ZS5zcGxpdChcIi9cIikscj1bXSxuPTA7bjx0Lmxlbmd0aDtuKyspe3ZhciBpPXRbbl07XCIuXCI9PT1pfHxcIlwiPT09aSYmMCE9PW4mJm4hPT10Lmxlbmd0aC0xfHwoXCIuLlwiPT09aT9yLnBvcCgpOnIucHVzaChpKSl9cmV0dXJuIHIuam9pbihcIi9cIil9LGEuZ2V0VHlwZU9mPWZ1bmN0aW9uKGUpe2lmKFwic3RyaW5nXCI9PXR5cGVvZiBlKXJldHVyblwic3RyaW5nXCI7dmFyIHQ9T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGUpO3JldHVyblwiW29iamVjdCBBcnJheV1cIj09PXQ/XCJhcnJheVwiOm8ubm9kZWJ1ZmZlciYmci5pc0J1ZmZlcihlKT9cIm5vZGVidWZmZXJcIjpvLnVpbnQ4YXJyYXkmJlwiW29iamVjdCBVaW50OEFycmF5XVwiPT09dD9cInVpbnQ4YXJyYXlcIjpvLmFycmF5YnVmZmVyJiZcIltvYmplY3QgQXJyYXlCdWZmZXJdXCI9PT10P1wiYXJyYXlidWZmZXJcIjp2b2lkIDB9LGEuY2hlY2tTdXBwb3J0PWZ1bmN0aW9uKGUpe2lmKCFvW2UudG9Mb3dlckNhc2UoKV0pdGhyb3cgbmV3IEVycm9yKGUrXCIgaXMgbm90IHN1cHBvcnRlZCBieSB0aGlzIHBsYXRmb3JtXCIpfSxhLk1BWF9WQUxVRV8xNkJJVFM9NjU1MzUsYS5NQVhfVkFMVUVfMzJCSVRTPS0xLGEucHJldHR5PWZ1bmN0aW9uKGUpe3ZhciB0LHIsbj1cIlwiO2ZvcihyPTA7cjwoZXx8XCJcIikubGVuZ3RoO3IrKyluKz1cIlxcXFx4XCIrKCh0PWUuY2hhckNvZGVBdChyKSk8MTY/XCIwXCI6XCJcIikrdC50b1N0cmluZygxNikudG9VcHBlckNhc2UoKTtyZXR1cm4gbn0sYS5kZWxheT1mdW5jdGlvbihlLHQscil7c2V0SW1tZWRpYXRlKGZ1bmN0aW9uKCl7ZS5hcHBseShyfHxudWxsLHR8fFtdKX0pfSxhLmluaGVyaXRzPWZ1bmN0aW9uKGUsdCl7ZnVuY3Rpb24gcigpe31yLnByb3RvdHlwZT10LnByb3RvdHlwZSxlLnByb3RvdHlwZT1uZXcgcn0sYS5leHRlbmQ9ZnVuY3Rpb24oKXt2YXIgZSx0LHI9e307Zm9yKGU9MDtlPGFyZ3VtZW50cy5sZW5ndGg7ZSsrKWZvcih0IGluIGFyZ3VtZW50c1tlXSlPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYXJndW1lbnRzW2VdLHQpJiZ2b2lkIDA9PT1yW3RdJiYoclt0XT1hcmd1bWVudHNbZV1bdF0pO3JldHVybiByfSxhLnByZXBhcmVDb250ZW50PWZ1bmN0aW9uKHIsZSxuLGkscyl7cmV0dXJuIHUuUHJvbWlzZS5yZXNvbHZlKGUpLnRoZW4oZnVuY3Rpb24obil7cmV0dXJuIG8uYmxvYiYmKG4gaW5zdGFuY2VvZiBCbG9ifHwtMSE9PVtcIltvYmplY3QgRmlsZV1cIixcIltvYmplY3QgQmxvYl1cIl0uaW5kZXhPZihPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobikpKT92b2lkIDAhPT1CbG9iLnByb3RvdHlwZS5hcnJheUJ1ZmZlcj9uLmFycmF5QnVmZmVyKCk6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIEZpbGVSZWFkZXI/bmV3IHUuUHJvbWlzZShmdW5jdGlvbih0LHIpe3ZhciBlPW5ldyBGaWxlUmVhZGVyO2Uub25sb2FkPWZ1bmN0aW9uKGUpe3QoZS50YXJnZXQucmVzdWx0KX0sZS5vbmVycm9yPWZ1bmN0aW9uKGUpe3IoZS50YXJnZXQuZXJyb3IpfSxlLnJlYWRBc0FycmF5QnVmZmVyKG4pfSk6dS5Qcm9taXNlLnJlamVjdChuZXcgRXJyb3IocitcIiBpcyBhIEJsb2IsIGJ1dCB3ZSBoYXZlIG5vIHdheSBvZiByZWFkaW5nIGl0LlwiKSk6bn0pLnRoZW4oZnVuY3Rpb24oZSl7dmFyIHQ9YS5nZXRUeXBlT2YoZSk7cmV0dXJuIHQ/KFwiYXJyYXlidWZmZXJcIj09PXQ/ZT1hLnRyYW5zZm9ybVRvKFwidWludDhhcnJheVwiLGUpOlwic3RyaW5nXCI9PT10JiYocz9lPWguZGVjb2RlKGUpOm4mJiEwIT09aSYmKGU9ZnVuY3Rpb24oZSl7cmV0dXJuIGwoZSxvLnVpbnQ4YXJyYXk/bmV3IFVpbnQ4QXJyYXkoZS5sZW5ndGgpOm5ldyBBcnJheShlLmxlbmd0aCkpfShlKSkpLGUpOnUuUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiQ2FuJ3QgcmVhZCB0aGUgZGF0YSBvZiAnXCIrcitcIicuIElzIGl0IGluIGEgc3VwcG9ydGVkIEphdmFTY3JpcHQgdHlwZSAoU3RyaW5nLCBCbG9iLCBBcnJheUJ1ZmZlciwgZXRjKSA/XCIpKX0pfX0se1wiLi9iYXNlNjRcIjoxLFwiLi9leHRlcm5hbFwiOjYsXCIuL25vZGVqc1V0aWxzXCI6MTQsXCIuL3N1cHBvcnRcIjozMCxzZXRpbW1lZGlhdGU6NTR9XSwzMzpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3ZhciBuPWUoXCIuL3JlYWRlci9yZWFkZXJGb3JcIiksaT1lKFwiLi91dGlsc1wiKSxzPWUoXCIuL3NpZ25hdHVyZVwiKSxhPWUoXCIuL3ppcEVudHJ5XCIpLG89ZShcIi4vc3VwcG9ydFwiKTtmdW5jdGlvbiBoKGUpe3RoaXMuZmlsZXM9W10sdGhpcy5sb2FkT3B0aW9ucz1lfWgucHJvdG90eXBlPXtjaGVja1NpZ25hdHVyZTpmdW5jdGlvbihlKXtpZighdGhpcy5yZWFkZXIucmVhZEFuZENoZWNrU2lnbmF0dXJlKGUpKXt0aGlzLnJlYWRlci5pbmRleC09NDt2YXIgdD10aGlzLnJlYWRlci5yZWFkU3RyaW5nKDQpO3Rocm93IG5ldyBFcnJvcihcIkNvcnJ1cHRlZCB6aXAgb3IgYnVnOiB1bmV4cGVjdGVkIHNpZ25hdHVyZSAoXCIraS5wcmV0dHkodCkrXCIsIGV4cGVjdGVkIFwiK2kucHJldHR5KGUpK1wiKVwiKX19LGlzU2lnbmF0dXJlOmZ1bmN0aW9uKGUsdCl7dmFyIHI9dGhpcy5yZWFkZXIuaW5kZXg7dGhpcy5yZWFkZXIuc2V0SW5kZXgoZSk7dmFyIG49dGhpcy5yZWFkZXIucmVhZFN0cmluZyg0KT09PXQ7cmV0dXJuIHRoaXMucmVhZGVyLnNldEluZGV4KHIpLG59LHJlYWRCbG9ja0VuZE9mQ2VudHJhbDpmdW5jdGlvbigpe3RoaXMuZGlza051bWJlcj10aGlzLnJlYWRlci5yZWFkSW50KDIpLHRoaXMuZGlza1dpdGhDZW50cmFsRGlyU3RhcnQ9dGhpcy5yZWFkZXIucmVhZEludCgyKSx0aGlzLmNlbnRyYWxEaXJSZWNvcmRzT25UaGlzRGlzaz10aGlzLnJlYWRlci5yZWFkSW50KDIpLHRoaXMuY2VudHJhbERpclJlY29yZHM9dGhpcy5yZWFkZXIucmVhZEludCgyKSx0aGlzLmNlbnRyYWxEaXJTaXplPXRoaXMucmVhZGVyLnJlYWRJbnQoNCksdGhpcy5jZW50cmFsRGlyT2Zmc2V0PXRoaXMucmVhZGVyLnJlYWRJbnQoNCksdGhpcy56aXBDb21tZW50TGVuZ3RoPXRoaXMucmVhZGVyLnJlYWRJbnQoMik7dmFyIGU9dGhpcy5yZWFkZXIucmVhZERhdGEodGhpcy56aXBDb21tZW50TGVuZ3RoKSx0PW8udWludDhhcnJheT9cInVpbnQ4YXJyYXlcIjpcImFycmF5XCIscj1pLnRyYW5zZm9ybVRvKHQsZSk7dGhpcy56aXBDb21tZW50PXRoaXMubG9hZE9wdGlvbnMuZGVjb2RlRmlsZU5hbWUocil9LHJlYWRCbG9ja1ppcDY0RW5kT2ZDZW50cmFsOmZ1bmN0aW9uKCl7dGhpcy56aXA2NEVuZE9mQ2VudHJhbFNpemU9dGhpcy5yZWFkZXIucmVhZEludCg4KSx0aGlzLnJlYWRlci5za2lwKDQpLHRoaXMuZGlza051bWJlcj10aGlzLnJlYWRlci5yZWFkSW50KDQpLHRoaXMuZGlza1dpdGhDZW50cmFsRGlyU3RhcnQ9dGhpcy5yZWFkZXIucmVhZEludCg0KSx0aGlzLmNlbnRyYWxEaXJSZWNvcmRzT25UaGlzRGlzaz10aGlzLnJlYWRlci5yZWFkSW50KDgpLHRoaXMuY2VudHJhbERpclJlY29yZHM9dGhpcy5yZWFkZXIucmVhZEludCg4KSx0aGlzLmNlbnRyYWxEaXJTaXplPXRoaXMucmVhZGVyLnJlYWRJbnQoOCksdGhpcy5jZW50cmFsRGlyT2Zmc2V0PXRoaXMucmVhZGVyLnJlYWRJbnQoOCksdGhpcy56aXA2NEV4dGVuc2libGVEYXRhPXt9O2Zvcih2YXIgZSx0LHIsbj10aGlzLnppcDY0RW5kT2ZDZW50cmFsU2l6ZS00NDswPG47KWU9dGhpcy5yZWFkZXIucmVhZEludCgyKSx0PXRoaXMucmVhZGVyLnJlYWRJbnQoNCkscj10aGlzLnJlYWRlci5yZWFkRGF0YSh0KSx0aGlzLnppcDY0RXh0ZW5zaWJsZURhdGFbZV09e2lkOmUsbGVuZ3RoOnQsdmFsdWU6cn19LHJlYWRCbG9ja1ppcDY0RW5kT2ZDZW50cmFsTG9jYXRvcjpmdW5jdGlvbigpe2lmKHRoaXMuZGlza1dpdGhaaXA2NENlbnRyYWxEaXJTdGFydD10aGlzLnJlYWRlci5yZWFkSW50KDQpLHRoaXMucmVsYXRpdmVPZmZzZXRFbmRPZlppcDY0Q2VudHJhbERpcj10aGlzLnJlYWRlci5yZWFkSW50KDgpLHRoaXMuZGlza3NDb3VudD10aGlzLnJlYWRlci5yZWFkSW50KDQpLDE8dGhpcy5kaXNrc0NvdW50KXRocm93IG5ldyBFcnJvcihcIk11bHRpLXZvbHVtZXMgemlwIGFyZSBub3Qgc3VwcG9ydGVkXCIpfSxyZWFkTG9jYWxGaWxlczpmdW5jdGlvbigpe3ZhciBlLHQ7Zm9yKGU9MDtlPHRoaXMuZmlsZXMubGVuZ3RoO2UrKyl0PXRoaXMuZmlsZXNbZV0sdGhpcy5yZWFkZXIuc2V0SW5kZXgodC5sb2NhbEhlYWRlck9mZnNldCksdGhpcy5jaGVja1NpZ25hdHVyZShzLkxPQ0FMX0ZJTEVfSEVBREVSKSx0LnJlYWRMb2NhbFBhcnQodGhpcy5yZWFkZXIpLHQuaGFuZGxlVVRGOCgpLHQucHJvY2Vzc0F0dHJpYnV0ZXMoKX0scmVhZENlbnRyYWxEaXI6ZnVuY3Rpb24oKXt2YXIgZTtmb3IodGhpcy5yZWFkZXIuc2V0SW5kZXgodGhpcy5jZW50cmFsRGlyT2Zmc2V0KTt0aGlzLnJlYWRlci5yZWFkQW5kQ2hlY2tTaWduYXR1cmUocy5DRU5UUkFMX0ZJTEVfSEVBREVSKTspKGU9bmV3IGEoe3ppcDY0OnRoaXMuemlwNjR9LHRoaXMubG9hZE9wdGlvbnMpKS5yZWFkQ2VudHJhbFBhcnQodGhpcy5yZWFkZXIpLHRoaXMuZmlsZXMucHVzaChlKTtpZih0aGlzLmNlbnRyYWxEaXJSZWNvcmRzIT09dGhpcy5maWxlcy5sZW5ndGgmJjAhPT10aGlzLmNlbnRyYWxEaXJSZWNvcmRzJiYwPT09dGhpcy5maWxlcy5sZW5ndGgpdGhyb3cgbmV3IEVycm9yKFwiQ29ycnVwdGVkIHppcCBvciBidWc6IGV4cGVjdGVkIFwiK3RoaXMuY2VudHJhbERpclJlY29yZHMrXCIgcmVjb3JkcyBpbiBjZW50cmFsIGRpciwgZ290IFwiK3RoaXMuZmlsZXMubGVuZ3RoKX0scmVhZEVuZE9mQ2VudHJhbDpmdW5jdGlvbigpe3ZhciBlPXRoaXMucmVhZGVyLmxhc3RJbmRleE9mU2lnbmF0dXJlKHMuQ0VOVFJBTF9ESVJFQ1RPUllfRU5EKTtpZihlPDApdGhyb3chdGhpcy5pc1NpZ25hdHVyZSgwLHMuTE9DQUxfRklMRV9IRUFERVIpP25ldyBFcnJvcihcIkNhbid0IGZpbmQgZW5kIG9mIGNlbnRyYWwgZGlyZWN0b3J5IDogaXMgdGhpcyBhIHppcCBmaWxlID8gSWYgaXQgaXMsIHNlZSBodHRwczovL3N0dWsuZ2l0aHViLmlvL2pzemlwL2RvY3VtZW50YXRpb24vaG93dG8vcmVhZF96aXAuaHRtbFwiKTpuZXcgRXJyb3IoXCJDb3JydXB0ZWQgemlwOiBjYW4ndCBmaW5kIGVuZCBvZiBjZW50cmFsIGRpcmVjdG9yeVwiKTt0aGlzLnJlYWRlci5zZXRJbmRleChlKTt2YXIgdD1lO2lmKHRoaXMuY2hlY2tTaWduYXR1cmUocy5DRU5UUkFMX0RJUkVDVE9SWV9FTkQpLHRoaXMucmVhZEJsb2NrRW5kT2ZDZW50cmFsKCksdGhpcy5kaXNrTnVtYmVyPT09aS5NQVhfVkFMVUVfMTZCSVRTfHx0aGlzLmRpc2tXaXRoQ2VudHJhbERpclN0YXJ0PT09aS5NQVhfVkFMVUVfMTZCSVRTfHx0aGlzLmNlbnRyYWxEaXJSZWNvcmRzT25UaGlzRGlzaz09PWkuTUFYX1ZBTFVFXzE2QklUU3x8dGhpcy5jZW50cmFsRGlyUmVjb3Jkcz09PWkuTUFYX1ZBTFVFXzE2QklUU3x8dGhpcy5jZW50cmFsRGlyU2l6ZT09PWkuTUFYX1ZBTFVFXzMyQklUU3x8dGhpcy5jZW50cmFsRGlyT2Zmc2V0PT09aS5NQVhfVkFMVUVfMzJCSVRTKXtpZih0aGlzLnppcDY0PSEwLChlPXRoaXMucmVhZGVyLmxhc3RJbmRleE9mU2lnbmF0dXJlKHMuWklQNjRfQ0VOVFJBTF9ESVJFQ1RPUllfTE9DQVRPUikpPDApdGhyb3cgbmV3IEVycm9yKFwiQ29ycnVwdGVkIHppcDogY2FuJ3QgZmluZCB0aGUgWklQNjQgZW5kIG9mIGNlbnRyYWwgZGlyZWN0b3J5IGxvY2F0b3JcIik7aWYodGhpcy5yZWFkZXIuc2V0SW5kZXgoZSksdGhpcy5jaGVja1NpZ25hdHVyZShzLlpJUDY0X0NFTlRSQUxfRElSRUNUT1JZX0xPQ0FUT1IpLHRoaXMucmVhZEJsb2NrWmlwNjRFbmRPZkNlbnRyYWxMb2NhdG9yKCksIXRoaXMuaXNTaWduYXR1cmUodGhpcy5yZWxhdGl2ZU9mZnNldEVuZE9mWmlwNjRDZW50cmFsRGlyLHMuWklQNjRfQ0VOVFJBTF9ESVJFQ1RPUllfRU5EKSYmKHRoaXMucmVsYXRpdmVPZmZzZXRFbmRPZlppcDY0Q2VudHJhbERpcj10aGlzLnJlYWRlci5sYXN0SW5kZXhPZlNpZ25hdHVyZShzLlpJUDY0X0NFTlRSQUxfRElSRUNUT1JZX0VORCksdGhpcy5yZWxhdGl2ZU9mZnNldEVuZE9mWmlwNjRDZW50cmFsRGlyPDApKXRocm93IG5ldyBFcnJvcihcIkNvcnJ1cHRlZCB6aXA6IGNhbid0IGZpbmQgdGhlIFpJUDY0IGVuZCBvZiBjZW50cmFsIGRpcmVjdG9yeVwiKTt0aGlzLnJlYWRlci5zZXRJbmRleCh0aGlzLnJlbGF0aXZlT2Zmc2V0RW5kT2ZaaXA2NENlbnRyYWxEaXIpLHRoaXMuY2hlY2tTaWduYXR1cmUocy5aSVA2NF9DRU5UUkFMX0RJUkVDVE9SWV9FTkQpLHRoaXMucmVhZEJsb2NrWmlwNjRFbmRPZkNlbnRyYWwoKX12YXIgcj10aGlzLmNlbnRyYWxEaXJPZmZzZXQrdGhpcy5jZW50cmFsRGlyU2l6ZTt0aGlzLnppcDY0JiYocis9MjAscis9MTIrdGhpcy56aXA2NEVuZE9mQ2VudHJhbFNpemUpO3ZhciBuPXQtcjtpZigwPG4pdGhpcy5pc1NpZ25hdHVyZSh0LHMuQ0VOVFJBTF9GSUxFX0hFQURFUil8fCh0aGlzLnJlYWRlci56ZXJvPW4pO2Vsc2UgaWYobjwwKXRocm93IG5ldyBFcnJvcihcIkNvcnJ1cHRlZCB6aXA6IG1pc3NpbmcgXCIrTWF0aC5hYnMobikrXCIgYnl0ZXMuXCIpfSxwcmVwYXJlUmVhZGVyOmZ1bmN0aW9uKGUpe3RoaXMucmVhZGVyPW4oZSl9LGxvYWQ6ZnVuY3Rpb24oZSl7dGhpcy5wcmVwYXJlUmVhZGVyKGUpLHRoaXMucmVhZEVuZE9mQ2VudHJhbCgpLHRoaXMucmVhZENlbnRyYWxEaXIoKSx0aGlzLnJlYWRMb2NhbEZpbGVzKCl9fSx0LmV4cG9ydHM9aH0se1wiLi9yZWFkZXIvcmVhZGVyRm9yXCI6MjIsXCIuL3NpZ25hdHVyZVwiOjIzLFwiLi9zdXBwb3J0XCI6MzAsXCIuL3V0aWxzXCI6MzIsXCIuL3ppcEVudHJ5XCI6MzR9XSwzNDpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3ZhciBuPWUoXCIuL3JlYWRlci9yZWFkZXJGb3JcIikscz1lKFwiLi91dGlsc1wiKSxpPWUoXCIuL2NvbXByZXNzZWRPYmplY3RcIiksYT1lKFwiLi9jcmMzMlwiKSxvPWUoXCIuL3V0ZjhcIiksaD1lKFwiLi9jb21wcmVzc2lvbnNcIiksdT1lKFwiLi9zdXBwb3J0XCIpO2Z1bmN0aW9uIGwoZSx0KXt0aGlzLm9wdGlvbnM9ZSx0aGlzLmxvYWRPcHRpb25zPXR9bC5wcm90b3R5cGU9e2lzRW5jcnlwdGVkOmZ1bmN0aW9uKCl7cmV0dXJuIDE9PSgxJnRoaXMuYml0RmxhZyl9LHVzZVVURjg6ZnVuY3Rpb24oKXtyZXR1cm4gMjA0OD09KDIwNDgmdGhpcy5iaXRGbGFnKX0scmVhZExvY2FsUGFydDpmdW5jdGlvbihlKXt2YXIgdCxyO2lmKGUuc2tpcCgyMiksdGhpcy5maWxlTmFtZUxlbmd0aD1lLnJlYWRJbnQoMikscj1lLnJlYWRJbnQoMiksdGhpcy5maWxlTmFtZT1lLnJlYWREYXRhKHRoaXMuZmlsZU5hbWVMZW5ndGgpLGUuc2tpcChyKSwtMT09PXRoaXMuY29tcHJlc3NlZFNpemV8fC0xPT09dGhpcy51bmNvbXByZXNzZWRTaXplKXRocm93IG5ldyBFcnJvcihcIkJ1ZyBvciBjb3JydXB0ZWQgemlwIDogZGlkbid0IGdldCBlbm91Z2ggaW5mb3JtYXRpb24gZnJvbSB0aGUgY2VudHJhbCBkaXJlY3RvcnkgKGNvbXByZXNzZWRTaXplID09PSAtMSB8fCB1bmNvbXByZXNzZWRTaXplID09PSAtMSlcIik7aWYobnVsbD09PSh0PWZ1bmN0aW9uKGUpe2Zvcih2YXIgdCBpbiBoKWlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChoLHQpJiZoW3RdLm1hZ2ljPT09ZSlyZXR1cm4gaFt0XTtyZXR1cm4gbnVsbH0odGhpcy5jb21wcmVzc2lvbk1ldGhvZCkpKXRocm93IG5ldyBFcnJvcihcIkNvcnJ1cHRlZCB6aXAgOiBjb21wcmVzc2lvbiBcIitzLnByZXR0eSh0aGlzLmNvbXByZXNzaW9uTWV0aG9kKStcIiB1bmtub3duIChpbm5lciBmaWxlIDogXCIrcy50cmFuc2Zvcm1UbyhcInN0cmluZ1wiLHRoaXMuZmlsZU5hbWUpK1wiKVwiKTt0aGlzLmRlY29tcHJlc3NlZD1uZXcgaSh0aGlzLmNvbXByZXNzZWRTaXplLHRoaXMudW5jb21wcmVzc2VkU2l6ZSx0aGlzLmNyYzMyLHQsZS5yZWFkRGF0YSh0aGlzLmNvbXByZXNzZWRTaXplKSl9LHJlYWRDZW50cmFsUGFydDpmdW5jdGlvbihlKXt0aGlzLnZlcnNpb25NYWRlQnk9ZS5yZWFkSW50KDIpLGUuc2tpcCgyKSx0aGlzLmJpdEZsYWc9ZS5yZWFkSW50KDIpLHRoaXMuY29tcHJlc3Npb25NZXRob2Q9ZS5yZWFkU3RyaW5nKDIpLHRoaXMuZGF0ZT1lLnJlYWREYXRlKCksdGhpcy5jcmMzMj1lLnJlYWRJbnQoNCksdGhpcy5jb21wcmVzc2VkU2l6ZT1lLnJlYWRJbnQoNCksdGhpcy51bmNvbXByZXNzZWRTaXplPWUucmVhZEludCg0KTt2YXIgdD1lLnJlYWRJbnQoMik7aWYodGhpcy5leHRyYUZpZWxkc0xlbmd0aD1lLnJlYWRJbnQoMiksdGhpcy5maWxlQ29tbWVudExlbmd0aD1lLnJlYWRJbnQoMiksdGhpcy5kaXNrTnVtYmVyU3RhcnQ9ZS5yZWFkSW50KDIpLHRoaXMuaW50ZXJuYWxGaWxlQXR0cmlidXRlcz1lLnJlYWRJbnQoMiksdGhpcy5leHRlcm5hbEZpbGVBdHRyaWJ1dGVzPWUucmVhZEludCg0KSx0aGlzLmxvY2FsSGVhZGVyT2Zmc2V0PWUucmVhZEludCg0KSx0aGlzLmlzRW5jcnlwdGVkKCkpdGhyb3cgbmV3IEVycm9yKFwiRW5jcnlwdGVkIHppcCBhcmUgbm90IHN1cHBvcnRlZFwiKTtlLnNraXAodCksdGhpcy5yZWFkRXh0cmFGaWVsZHMoZSksdGhpcy5wYXJzZVpJUDY0RXh0cmFGaWVsZChlKSx0aGlzLmZpbGVDb21tZW50PWUucmVhZERhdGEodGhpcy5maWxlQ29tbWVudExlbmd0aCl9LHByb2Nlc3NBdHRyaWJ1dGVzOmZ1bmN0aW9uKCl7dGhpcy51bml4UGVybWlzc2lvbnM9bnVsbCx0aGlzLmRvc1Blcm1pc3Npb25zPW51bGw7dmFyIGU9dGhpcy52ZXJzaW9uTWFkZUJ5Pj44O3RoaXMuZGlyPSEhKDE2JnRoaXMuZXh0ZXJuYWxGaWxlQXR0cmlidXRlcyksMD09ZSYmKHRoaXMuZG9zUGVybWlzc2lvbnM9NjMmdGhpcy5leHRlcm5hbEZpbGVBdHRyaWJ1dGVzKSwzPT1lJiYodGhpcy51bml4UGVybWlzc2lvbnM9dGhpcy5leHRlcm5hbEZpbGVBdHRyaWJ1dGVzPj4xNiY2NTUzNSksdGhpcy5kaXJ8fFwiL1wiIT09dGhpcy5maWxlTmFtZVN0ci5zbGljZSgtMSl8fCh0aGlzLmRpcj0hMCl9LHBhcnNlWklQNjRFeHRyYUZpZWxkOmZ1bmN0aW9uKCl7aWYodGhpcy5leHRyYUZpZWxkc1sxXSl7dmFyIGU9bih0aGlzLmV4dHJhRmllbGRzWzFdLnZhbHVlKTt0aGlzLnVuY29tcHJlc3NlZFNpemU9PT1zLk1BWF9WQUxVRV8zMkJJVFMmJih0aGlzLnVuY29tcHJlc3NlZFNpemU9ZS5yZWFkSW50KDgpKSx0aGlzLmNvbXByZXNzZWRTaXplPT09cy5NQVhfVkFMVUVfMzJCSVRTJiYodGhpcy5jb21wcmVzc2VkU2l6ZT1lLnJlYWRJbnQoOCkpLHRoaXMubG9jYWxIZWFkZXJPZmZzZXQ9PT1zLk1BWF9WQUxVRV8zMkJJVFMmJih0aGlzLmxvY2FsSGVhZGVyT2Zmc2V0PWUucmVhZEludCg4KSksdGhpcy5kaXNrTnVtYmVyU3RhcnQ9PT1zLk1BWF9WQUxVRV8zMkJJVFMmJih0aGlzLmRpc2tOdW1iZXJTdGFydD1lLnJlYWRJbnQoNCkpfX0scmVhZEV4dHJhRmllbGRzOmZ1bmN0aW9uKGUpe3ZhciB0LHIsbixpPWUuaW5kZXgrdGhpcy5leHRyYUZpZWxkc0xlbmd0aDtmb3IodGhpcy5leHRyYUZpZWxkc3x8KHRoaXMuZXh0cmFGaWVsZHM9e30pO2UuaW5kZXgrNDxpOyl0PWUucmVhZEludCgyKSxyPWUucmVhZEludCgyKSxuPWUucmVhZERhdGEociksdGhpcy5leHRyYUZpZWxkc1t0XT17aWQ6dCxsZW5ndGg6cix2YWx1ZTpufTtlLnNldEluZGV4KGkpfSxoYW5kbGVVVEY4OmZ1bmN0aW9uKCl7dmFyIGU9dS51aW50OGFycmF5P1widWludDhhcnJheVwiOlwiYXJyYXlcIjtpZih0aGlzLnVzZVVURjgoKSl0aGlzLmZpbGVOYW1lU3RyPW8udXRmOGRlY29kZSh0aGlzLmZpbGVOYW1lKSx0aGlzLmZpbGVDb21tZW50U3RyPW8udXRmOGRlY29kZSh0aGlzLmZpbGVDb21tZW50KTtlbHNle3ZhciB0PXRoaXMuZmluZEV4dHJhRmllbGRVbmljb2RlUGF0aCgpO2lmKG51bGwhPT10KXRoaXMuZmlsZU5hbWVTdHI9dDtlbHNle3ZhciByPXMudHJhbnNmb3JtVG8oZSx0aGlzLmZpbGVOYW1lKTt0aGlzLmZpbGVOYW1lU3RyPXRoaXMubG9hZE9wdGlvbnMuZGVjb2RlRmlsZU5hbWUocil9dmFyIG49dGhpcy5maW5kRXh0cmFGaWVsZFVuaWNvZGVDb21tZW50KCk7aWYobnVsbCE9PW4pdGhpcy5maWxlQ29tbWVudFN0cj1uO2Vsc2V7dmFyIGk9cy50cmFuc2Zvcm1UbyhlLHRoaXMuZmlsZUNvbW1lbnQpO3RoaXMuZmlsZUNvbW1lbnRTdHI9dGhpcy5sb2FkT3B0aW9ucy5kZWNvZGVGaWxlTmFtZShpKX19fSxmaW5kRXh0cmFGaWVsZFVuaWNvZGVQYXRoOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcy5leHRyYUZpZWxkc1syODc4OV07aWYoZSl7dmFyIHQ9bihlLnZhbHVlKTtyZXR1cm4gMSE9PXQucmVhZEludCgxKT9udWxsOmEodGhpcy5maWxlTmFtZSkhPT10LnJlYWRJbnQoNCk/bnVsbDpvLnV0ZjhkZWNvZGUodC5yZWFkRGF0YShlLmxlbmd0aC01KSl9cmV0dXJuIG51bGx9LGZpbmRFeHRyYUZpZWxkVW5pY29kZUNvbW1lbnQ6ZnVuY3Rpb24oKXt2YXIgZT10aGlzLmV4dHJhRmllbGRzWzI1NDYxXTtpZihlKXt2YXIgdD1uKGUudmFsdWUpO3JldHVybiAxIT09dC5yZWFkSW50KDEpP251bGw6YSh0aGlzLmZpbGVDb21tZW50KSE9PXQucmVhZEludCg0KT9udWxsOm8udXRmOGRlY29kZSh0LnJlYWREYXRhKGUubGVuZ3RoLTUpKX1yZXR1cm4gbnVsbH19LHQuZXhwb3J0cz1sfSx7XCIuL2NvbXByZXNzZWRPYmplY3RcIjoyLFwiLi9jb21wcmVzc2lvbnNcIjozLFwiLi9jcmMzMlwiOjQsXCIuL3JlYWRlci9yZWFkZXJGb3JcIjoyMixcIi4vc3VwcG9ydFwiOjMwLFwiLi91dGY4XCI6MzEsXCIuL3V0aWxzXCI6MzJ9XSwzNTpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIG4oZSx0LHIpe3RoaXMubmFtZT1lLHRoaXMuZGlyPXIuZGlyLHRoaXMuZGF0ZT1yLmRhdGUsdGhpcy5jb21tZW50PXIuY29tbWVudCx0aGlzLnVuaXhQZXJtaXNzaW9ucz1yLnVuaXhQZXJtaXNzaW9ucyx0aGlzLmRvc1Blcm1pc3Npb25zPXIuZG9zUGVybWlzc2lvbnMsdGhpcy5fZGF0YT10LHRoaXMuX2RhdGFCaW5hcnk9ci5iaW5hcnksdGhpcy5vcHRpb25zPXtjb21wcmVzc2lvbjpyLmNvbXByZXNzaW9uLGNvbXByZXNzaW9uT3B0aW9uczpyLmNvbXByZXNzaW9uT3B0aW9uc319dmFyIHM9ZShcIi4vc3RyZWFtL1N0cmVhbUhlbHBlclwiKSxpPWUoXCIuL3N0cmVhbS9EYXRhV29ya2VyXCIpLGE9ZShcIi4vdXRmOFwiKSxvPWUoXCIuL2NvbXByZXNzZWRPYmplY3RcIiksaD1lKFwiLi9zdHJlYW0vR2VuZXJpY1dvcmtlclwiKTtuLnByb3RvdHlwZT17aW50ZXJuYWxTdHJlYW06ZnVuY3Rpb24oZSl7dmFyIHQ9bnVsbCxyPVwic3RyaW5nXCI7dHJ5e2lmKCFlKXRocm93IG5ldyBFcnJvcihcIk5vIG91dHB1dCB0eXBlIHNwZWNpZmllZC5cIik7dmFyIG49XCJzdHJpbmdcIj09PShyPWUudG9Mb3dlckNhc2UoKSl8fFwidGV4dFwiPT09cjtcImJpbmFyeXN0cmluZ1wiIT09ciYmXCJ0ZXh0XCIhPT1yfHwocj1cInN0cmluZ1wiKSx0PXRoaXMuX2RlY29tcHJlc3NXb3JrZXIoKTt2YXIgaT0hdGhpcy5fZGF0YUJpbmFyeTtpJiYhbiYmKHQ9dC5waXBlKG5ldyBhLlV0ZjhFbmNvZGVXb3JrZXIpKSwhaSYmbiYmKHQ9dC5waXBlKG5ldyBhLlV0ZjhEZWNvZGVXb3JrZXIpKX1jYXRjaChlKXsodD1uZXcgaChcImVycm9yXCIpKS5lcnJvcihlKX1yZXR1cm4gbmV3IHModCxyLFwiXCIpfSxhc3luYzpmdW5jdGlvbihlLHQpe3JldHVybiB0aGlzLmludGVybmFsU3RyZWFtKGUpLmFjY3VtdWxhdGUodCl9LG5vZGVTdHJlYW06ZnVuY3Rpb24oZSx0KXtyZXR1cm4gdGhpcy5pbnRlcm5hbFN0cmVhbShlfHxcIm5vZGVidWZmZXJcIikudG9Ob2RlanNTdHJlYW0odCl9LF9jb21wcmVzc1dvcmtlcjpmdW5jdGlvbihlLHQpe2lmKHRoaXMuX2RhdGEgaW5zdGFuY2VvZiBvJiZ0aGlzLl9kYXRhLmNvbXByZXNzaW9uLm1hZ2ljPT09ZS5tYWdpYylyZXR1cm4gdGhpcy5fZGF0YS5nZXRDb21wcmVzc2VkV29ya2VyKCk7dmFyIHI9dGhpcy5fZGVjb21wcmVzc1dvcmtlcigpO3JldHVybiB0aGlzLl9kYXRhQmluYXJ5fHwocj1yLnBpcGUobmV3IGEuVXRmOEVuY29kZVdvcmtlcikpLG8uY3JlYXRlV29ya2VyRnJvbShyLGUsdCl9LF9kZWNvbXByZXNzV29ya2VyOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuX2RhdGEgaW5zdGFuY2VvZiBvP3RoaXMuX2RhdGEuZ2V0Q29udGVudFdvcmtlcigpOnRoaXMuX2RhdGEgaW5zdGFuY2VvZiBoP3RoaXMuX2RhdGE6bmV3IGkodGhpcy5fZGF0YSl9fTtmb3IodmFyIHU9W1wiYXNUZXh0XCIsXCJhc0JpbmFyeVwiLFwiYXNOb2RlQnVmZmVyXCIsXCJhc1VpbnQ4QXJyYXlcIixcImFzQXJyYXlCdWZmZXJcIl0sbD1mdW5jdGlvbigpe3Rocm93IG5ldyBFcnJvcihcIlRoaXMgbWV0aG9kIGhhcyBiZWVuIHJlbW92ZWQgaW4gSlNaaXAgMy4wLCBwbGVhc2UgY2hlY2sgdGhlIHVwZ3JhZGUgZ3VpZGUuXCIpfSxmPTA7Zjx1Lmxlbmd0aDtmKyspbi5wcm90b3R5cGVbdVtmXV09bDt0LmV4cG9ydHM9bn0se1wiLi9jb21wcmVzc2VkT2JqZWN0XCI6MixcIi4vc3RyZWFtL0RhdGFXb3JrZXJcIjoyNyxcIi4vc3RyZWFtL0dlbmVyaWNXb3JrZXJcIjoyOCxcIi4vc3RyZWFtL1N0cmVhbUhlbHBlclwiOjI5LFwiLi91dGY4XCI6MzF9XSwzNjpbZnVuY3Rpb24oZSxsLHQpeyhmdW5jdGlvbih0KXtcInVzZSBzdHJpY3RcIjt2YXIgcixuLGU9dC5NdXRhdGlvbk9ic2VydmVyfHx0LldlYktpdE11dGF0aW9uT2JzZXJ2ZXI7aWYoZSl7dmFyIGk9MCxzPW5ldyBlKHUpLGE9dC5kb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIlwiKTtzLm9ic2VydmUoYSx7Y2hhcmFjdGVyRGF0YTohMH0pLHI9ZnVuY3Rpb24oKXthLmRhdGE9aT0rK2klMn19ZWxzZSBpZih0LnNldEltbWVkaWF0ZXx8dm9pZCAwPT09dC5NZXNzYWdlQ2hhbm5lbClyPVwiZG9jdW1lbnRcImluIHQmJlwib25yZWFkeXN0YXRlY2hhbmdlXCJpbiB0LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik/ZnVuY3Rpb24oKXt2YXIgZT10LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7ZS5vbnJlYWR5c3RhdGVjaGFuZ2U9ZnVuY3Rpb24oKXt1KCksZS5vbnJlYWR5c3RhdGVjaGFuZ2U9bnVsbCxlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZSksZT1udWxsfSx0LmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hcHBlbmRDaGlsZChlKX06ZnVuY3Rpb24oKXtzZXRUaW1lb3V0KHUsMCl9O2Vsc2V7dmFyIG89bmV3IHQuTWVzc2FnZUNoYW5uZWw7by5wb3J0MS5vbm1lc3NhZ2U9dSxyPWZ1bmN0aW9uKCl7by5wb3J0Mi5wb3N0TWVzc2FnZSgwKX19dmFyIGg9W107ZnVuY3Rpb24gdSgpe3ZhciBlLHQ7bj0hMDtmb3IodmFyIHI9aC5sZW5ndGg7cjspe2Zvcih0PWgsaD1bXSxlPS0xOysrZTxyOyl0W2VdKCk7cj1oLmxlbmd0aH1uPSExfWwuZXhwb3J0cz1mdW5jdGlvbihlKXsxIT09aC5wdXNoKGUpfHxufHxyKCl9fSkuY2FsbCh0aGlzLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBnbG9iYWw/Z2xvYmFsOlwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmP3NlbGY6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdz93aW5kb3c6e30pfSx7fV0sMzc6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt2YXIgaT1lKFwiaW1tZWRpYXRlXCIpO2Z1bmN0aW9uIHUoKXt9dmFyIGw9e30scz1bXCJSRUpFQ1RFRFwiXSxhPVtcIkZVTEZJTExFRFwiXSxuPVtcIlBFTkRJTkdcIl07ZnVuY3Rpb24gbyhlKXtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiBlKXRocm93IG5ldyBUeXBlRXJyb3IoXCJyZXNvbHZlciBtdXN0IGJlIGEgZnVuY3Rpb25cIik7dGhpcy5zdGF0ZT1uLHRoaXMucXVldWU9W10sdGhpcy5vdXRjb21lPXZvaWQgMCxlIT09dSYmZCh0aGlzLGUpfWZ1bmN0aW9uIGgoZSx0LHIpe3RoaXMucHJvbWlzZT1lLFwiZnVuY3Rpb25cIj09dHlwZW9mIHQmJih0aGlzLm9uRnVsZmlsbGVkPXQsdGhpcy5jYWxsRnVsZmlsbGVkPXRoaXMub3RoZXJDYWxsRnVsZmlsbGVkKSxcImZ1bmN0aW9uXCI9PXR5cGVvZiByJiYodGhpcy5vblJlamVjdGVkPXIsdGhpcy5jYWxsUmVqZWN0ZWQ9dGhpcy5vdGhlckNhbGxSZWplY3RlZCl9ZnVuY3Rpb24gZih0LHIsbil7aShmdW5jdGlvbigpe3ZhciBlO3RyeXtlPXIobil9Y2F0Y2goZSl7cmV0dXJuIGwucmVqZWN0KHQsZSl9ZT09PXQ/bC5yZWplY3QodCxuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHJlc29sdmUgcHJvbWlzZSB3aXRoIGl0c2VsZlwiKSk6bC5yZXNvbHZlKHQsZSl9KX1mdW5jdGlvbiBjKGUpe3ZhciB0PWUmJmUudGhlbjtpZihlJiYoXCJvYmplY3RcIj09dHlwZW9mIGV8fFwiZnVuY3Rpb25cIj09dHlwZW9mIGUpJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiB0KXJldHVybiBmdW5jdGlvbigpe3QuYXBwbHkoZSxhcmd1bWVudHMpfX1mdW5jdGlvbiBkKHQsZSl7dmFyIHI9ITE7ZnVuY3Rpb24gbihlKXtyfHwocj0hMCxsLnJlamVjdCh0LGUpKX1mdW5jdGlvbiBpKGUpe3J8fChyPSEwLGwucmVzb2x2ZSh0LGUpKX12YXIgcz1wKGZ1bmN0aW9uKCl7ZShpLG4pfSk7XCJlcnJvclwiPT09cy5zdGF0dXMmJm4ocy52YWx1ZSl9ZnVuY3Rpb24gcChlLHQpe3ZhciByPXt9O3RyeXtyLnZhbHVlPWUodCksci5zdGF0dXM9XCJzdWNjZXNzXCJ9Y2F0Y2goZSl7ci5zdGF0dXM9XCJlcnJvclwiLHIudmFsdWU9ZX1yZXR1cm4gcn0odC5leHBvcnRzPW8pLnByb3RvdHlwZS5maW5hbGx5PWZ1bmN0aW9uKHQpe2lmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIHQpcmV0dXJuIHRoaXM7dmFyIHI9dGhpcy5jb25zdHJ1Y3RvcjtyZXR1cm4gdGhpcy50aGVuKGZ1bmN0aW9uKGUpe3JldHVybiByLnJlc29sdmUodCgpKS50aGVuKGZ1bmN0aW9uKCl7cmV0dXJuIGV9KX0sZnVuY3Rpb24oZSl7cmV0dXJuIHIucmVzb2x2ZSh0KCkpLnRoZW4oZnVuY3Rpb24oKXt0aHJvdyBlfSl9KX0sby5wcm90b3R5cGUuY2F0Y2g9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMudGhlbihudWxsLGUpfSxvLnByb3RvdHlwZS50aGVuPWZ1bmN0aW9uKGUsdCl7aWYoXCJmdW5jdGlvblwiIT10eXBlb2YgZSYmdGhpcy5zdGF0ZT09PWF8fFwiZnVuY3Rpb25cIiE9dHlwZW9mIHQmJnRoaXMuc3RhdGU9PT1zKXJldHVybiB0aGlzO3ZhciByPW5ldyB0aGlzLmNvbnN0cnVjdG9yKHUpO3RoaXMuc3RhdGUhPT1uP2Yocix0aGlzLnN0YXRlPT09YT9lOnQsdGhpcy5vdXRjb21lKTp0aGlzLnF1ZXVlLnB1c2gobmV3IGgocixlLHQpKTtyZXR1cm4gcn0saC5wcm90b3R5cGUuY2FsbEZ1bGZpbGxlZD1mdW5jdGlvbihlKXtsLnJlc29sdmUodGhpcy5wcm9taXNlLGUpfSxoLnByb3RvdHlwZS5vdGhlckNhbGxGdWxmaWxsZWQ9ZnVuY3Rpb24oZSl7Zih0aGlzLnByb21pc2UsdGhpcy5vbkZ1bGZpbGxlZCxlKX0saC5wcm90b3R5cGUuY2FsbFJlamVjdGVkPWZ1bmN0aW9uKGUpe2wucmVqZWN0KHRoaXMucHJvbWlzZSxlKX0saC5wcm90b3R5cGUub3RoZXJDYWxsUmVqZWN0ZWQ9ZnVuY3Rpb24oZSl7Zih0aGlzLnByb21pc2UsdGhpcy5vblJlamVjdGVkLGUpfSxsLnJlc29sdmU9ZnVuY3Rpb24oZSx0KXt2YXIgcj1wKGMsdCk7aWYoXCJlcnJvclwiPT09ci5zdGF0dXMpcmV0dXJuIGwucmVqZWN0KGUsci52YWx1ZSk7dmFyIG49ci52YWx1ZTtpZihuKWQoZSxuKTtlbHNle2Uuc3RhdGU9YSxlLm91dGNvbWU9dDtmb3IodmFyIGk9LTEscz1lLnF1ZXVlLmxlbmd0aDsrK2k8czspZS5xdWV1ZVtpXS5jYWxsRnVsZmlsbGVkKHQpfXJldHVybiBlfSxsLnJlamVjdD1mdW5jdGlvbihlLHQpe2Uuc3RhdGU9cyxlLm91dGNvbWU9dDtmb3IodmFyIHI9LTEsbj1lLnF1ZXVlLmxlbmd0aDsrK3I8bjspZS5xdWV1ZVtyXS5jYWxsUmVqZWN0ZWQodCk7cmV0dXJuIGV9LG8ucmVzb2x2ZT1mdW5jdGlvbihlKXtpZihlIGluc3RhbmNlb2YgdGhpcylyZXR1cm4gZTtyZXR1cm4gbC5yZXNvbHZlKG5ldyB0aGlzKHUpLGUpfSxvLnJlamVjdD1mdW5jdGlvbihlKXt2YXIgdD1uZXcgdGhpcyh1KTtyZXR1cm4gbC5yZWplY3QodCxlKX0sby5hbGw9ZnVuY3Rpb24oZSl7dmFyIHI9dGhpcztpZihcIltvYmplY3QgQXJyYXldXCIhPT1PYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZSkpcmV0dXJuIHRoaXMucmVqZWN0KG5ldyBUeXBlRXJyb3IoXCJtdXN0IGJlIGFuIGFycmF5XCIpKTt2YXIgbj1lLmxlbmd0aCxpPSExO2lmKCFuKXJldHVybiB0aGlzLnJlc29sdmUoW10pO3ZhciBzPW5ldyBBcnJheShuKSxhPTAsdD0tMSxvPW5ldyB0aGlzKHUpO2Zvcig7Kyt0PG47KWgoZVt0XSx0KTtyZXR1cm4gbztmdW5jdGlvbiBoKGUsdCl7ci5yZXNvbHZlKGUpLnRoZW4oZnVuY3Rpb24oZSl7c1t0XT1lLCsrYSE9PW58fGl8fChpPSEwLGwucmVzb2x2ZShvLHMpKX0sZnVuY3Rpb24oZSl7aXx8KGk9ITAsbC5yZWplY3QobyxlKSl9KX19LG8ucmFjZT1mdW5jdGlvbihlKXt2YXIgdD10aGlzO2lmKFwiW29iamVjdCBBcnJheV1cIiE9PU9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChlKSlyZXR1cm4gdGhpcy5yZWplY3QobmV3IFR5cGVFcnJvcihcIm11c3QgYmUgYW4gYXJyYXlcIikpO3ZhciByPWUubGVuZ3RoLG49ITE7aWYoIXIpcmV0dXJuIHRoaXMucmVzb2x2ZShbXSk7dmFyIGk9LTEscz1uZXcgdGhpcyh1KTtmb3IoOysraTxyOylhPWVbaV0sdC5yZXNvbHZlKGEpLnRoZW4oZnVuY3Rpb24oZSl7bnx8KG49ITAsbC5yZXNvbHZlKHMsZSkpfSxmdW5jdGlvbihlKXtufHwobj0hMCxsLnJlamVjdChzLGUpKX0pO3ZhciBhO3JldHVybiBzfX0se2ltbWVkaWF0ZTozNn1dLDM4OltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7dmFyIG49e307KDAsZShcIi4vbGliL3V0aWxzL2NvbW1vblwiKS5hc3NpZ24pKG4sZShcIi4vbGliL2RlZmxhdGVcIiksZShcIi4vbGliL2luZmxhdGVcIiksZShcIi4vbGliL3psaWIvY29uc3RhbnRzXCIpKSx0LmV4cG9ydHM9bn0se1wiLi9saWIvZGVmbGF0ZVwiOjM5LFwiLi9saWIvaW5mbGF0ZVwiOjQwLFwiLi9saWIvdXRpbHMvY29tbW9uXCI6NDEsXCIuL2xpYi96bGliL2NvbnN0YW50c1wiOjQ0fV0sMzk6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt2YXIgYT1lKFwiLi96bGliL2RlZmxhdGVcIiksbz1lKFwiLi91dGlscy9jb21tb25cIiksaD1lKFwiLi91dGlscy9zdHJpbmdzXCIpLGk9ZShcIi4vemxpYi9tZXNzYWdlc1wiKSxzPWUoXCIuL3psaWIvenN0cmVhbVwiKSx1PU9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcsbD0wLGY9LTEsYz0wLGQ9ODtmdW5jdGlvbiBwKGUpe2lmKCEodGhpcyBpbnN0YW5jZW9mIHApKXJldHVybiBuZXcgcChlKTt0aGlzLm9wdGlvbnM9by5hc3NpZ24oe2xldmVsOmYsbWV0aG9kOmQsY2h1bmtTaXplOjE2Mzg0LHdpbmRvd0JpdHM6MTUsbWVtTGV2ZWw6OCxzdHJhdGVneTpjLHRvOlwiXCJ9LGV8fHt9KTt2YXIgdD10aGlzLm9wdGlvbnM7dC5yYXcmJjA8dC53aW5kb3dCaXRzP3Qud2luZG93Qml0cz0tdC53aW5kb3dCaXRzOnQuZ3ppcCYmMDx0LndpbmRvd0JpdHMmJnQud2luZG93Qml0czwxNiYmKHQud2luZG93Qml0cys9MTYpLHRoaXMuZXJyPTAsdGhpcy5tc2c9XCJcIix0aGlzLmVuZGVkPSExLHRoaXMuY2h1bmtzPVtdLHRoaXMuc3RybT1uZXcgcyx0aGlzLnN0cm0uYXZhaWxfb3V0PTA7dmFyIHI9YS5kZWZsYXRlSW5pdDIodGhpcy5zdHJtLHQubGV2ZWwsdC5tZXRob2QsdC53aW5kb3dCaXRzLHQubWVtTGV2ZWwsdC5zdHJhdGVneSk7aWYociE9PWwpdGhyb3cgbmV3IEVycm9yKGlbcl0pO2lmKHQuaGVhZGVyJiZhLmRlZmxhdGVTZXRIZWFkZXIodGhpcy5zdHJtLHQuaGVhZGVyKSx0LmRpY3Rpb25hcnkpe3ZhciBuO2lmKG49XCJzdHJpbmdcIj09dHlwZW9mIHQuZGljdGlvbmFyeT9oLnN0cmluZzJidWYodC5kaWN0aW9uYXJ5KTpcIltvYmplY3QgQXJyYXlCdWZmZXJdXCI9PT11LmNhbGwodC5kaWN0aW9uYXJ5KT9uZXcgVWludDhBcnJheSh0LmRpY3Rpb25hcnkpOnQuZGljdGlvbmFyeSwocj1hLmRlZmxhdGVTZXREaWN0aW9uYXJ5KHRoaXMuc3RybSxuKSkhPT1sKXRocm93IG5ldyBFcnJvcihpW3JdKTt0aGlzLl9kaWN0X3NldD0hMH19ZnVuY3Rpb24gbihlLHQpe3ZhciByPW5ldyBwKHQpO2lmKHIucHVzaChlLCEwKSxyLmVycil0aHJvdyByLm1zZ3x8aVtyLmVycl07cmV0dXJuIHIucmVzdWx0fXAucHJvdG90eXBlLnB1c2g9ZnVuY3Rpb24oZSx0KXt2YXIgcixuLGk9dGhpcy5zdHJtLHM9dGhpcy5vcHRpb25zLmNodW5rU2l6ZTtpZih0aGlzLmVuZGVkKXJldHVybiExO249dD09PX5+dD90OiEwPT09dD80OjAsXCJzdHJpbmdcIj09dHlwZW9mIGU/aS5pbnB1dD1oLnN0cmluZzJidWYoZSk6XCJbb2JqZWN0IEFycmF5QnVmZmVyXVwiPT09dS5jYWxsKGUpP2kuaW5wdXQ9bmV3IFVpbnQ4QXJyYXkoZSk6aS5pbnB1dD1lLGkubmV4dF9pbj0wLGkuYXZhaWxfaW49aS5pbnB1dC5sZW5ndGg7ZG97aWYoMD09PWkuYXZhaWxfb3V0JiYoaS5vdXRwdXQ9bmV3IG8uQnVmOChzKSxpLm5leHRfb3V0PTAsaS5hdmFpbF9vdXQ9cyksMSE9PShyPWEuZGVmbGF0ZShpLG4pKSYmciE9PWwpcmV0dXJuIHRoaXMub25FbmQociksISh0aGlzLmVuZGVkPSEwKTswIT09aS5hdmFpbF9vdXQmJigwIT09aS5hdmFpbF9pbnx8NCE9PW4mJjIhPT1uKXx8KFwic3RyaW5nXCI9PT10aGlzLm9wdGlvbnMudG8/dGhpcy5vbkRhdGEoaC5idWYyYmluc3RyaW5nKG8uc2hyaW5rQnVmKGkub3V0cHV0LGkubmV4dF9vdXQpKSk6dGhpcy5vbkRhdGEoby5zaHJpbmtCdWYoaS5vdXRwdXQsaS5uZXh0X291dCkpKX13aGlsZSgoMDxpLmF2YWlsX2lufHwwPT09aS5hdmFpbF9vdXQpJiYxIT09cik7cmV0dXJuIDQ9PT1uPyhyPWEuZGVmbGF0ZUVuZCh0aGlzLnN0cm0pLHRoaXMub25FbmQociksdGhpcy5lbmRlZD0hMCxyPT09bCk6MiE9PW58fCh0aGlzLm9uRW5kKGwpLCEoaS5hdmFpbF9vdXQ9MCkpfSxwLnByb3RvdHlwZS5vbkRhdGE9ZnVuY3Rpb24oZSl7dGhpcy5jaHVua3MucHVzaChlKX0scC5wcm90b3R5cGUub25FbmQ9ZnVuY3Rpb24oZSl7ZT09PWwmJihcInN0cmluZ1wiPT09dGhpcy5vcHRpb25zLnRvP3RoaXMucmVzdWx0PXRoaXMuY2h1bmtzLmpvaW4oXCJcIik6dGhpcy5yZXN1bHQ9by5mbGF0dGVuQ2h1bmtzKHRoaXMuY2h1bmtzKSksdGhpcy5jaHVua3M9W10sdGhpcy5lcnI9ZSx0aGlzLm1zZz10aGlzLnN0cm0ubXNnfSxyLkRlZmxhdGU9cCxyLmRlZmxhdGU9bixyLmRlZmxhdGVSYXc9ZnVuY3Rpb24oZSx0KXtyZXR1cm4odD10fHx7fSkucmF3PSEwLG4oZSx0KX0sci5nemlwPWZ1bmN0aW9uKGUsdCl7cmV0dXJuKHQ9dHx8e30pLmd6aXA9ITAsbihlLHQpfX0se1wiLi91dGlscy9jb21tb25cIjo0MSxcIi4vdXRpbHMvc3RyaW5nc1wiOjQyLFwiLi96bGliL2RlZmxhdGVcIjo0NixcIi4vemxpYi9tZXNzYWdlc1wiOjUxLFwiLi96bGliL3pzdHJlYW1cIjo1M31dLDQwOltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7dmFyIGM9ZShcIi4vemxpYi9pbmZsYXRlXCIpLGQ9ZShcIi4vdXRpbHMvY29tbW9uXCIpLHA9ZShcIi4vdXRpbHMvc3RyaW5nc1wiKSxtPWUoXCIuL3psaWIvY29uc3RhbnRzXCIpLG49ZShcIi4vemxpYi9tZXNzYWdlc1wiKSxpPWUoXCIuL3psaWIvenN0cmVhbVwiKSxzPWUoXCIuL3psaWIvZ3poZWFkZXJcIiksXz1PYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO2Z1bmN0aW9uIGEoZSl7aWYoISh0aGlzIGluc3RhbmNlb2YgYSkpcmV0dXJuIG5ldyBhKGUpO3RoaXMub3B0aW9ucz1kLmFzc2lnbih7Y2h1bmtTaXplOjE2Mzg0LHdpbmRvd0JpdHM6MCx0bzpcIlwifSxlfHx7fSk7dmFyIHQ9dGhpcy5vcHRpb25zO3QucmF3JiYwPD10LndpbmRvd0JpdHMmJnQud2luZG93Qml0czwxNiYmKHQud2luZG93Qml0cz0tdC53aW5kb3dCaXRzLDA9PT10LndpbmRvd0JpdHMmJih0LndpbmRvd0JpdHM9LTE1KSksISgwPD10LndpbmRvd0JpdHMmJnQud2luZG93Qml0czwxNil8fGUmJmUud2luZG93Qml0c3x8KHQud2luZG93Qml0cys9MzIpLDE1PHQud2luZG93Qml0cyYmdC53aW5kb3dCaXRzPDQ4JiYwPT0oMTUmdC53aW5kb3dCaXRzKSYmKHQud2luZG93Qml0c3w9MTUpLHRoaXMuZXJyPTAsdGhpcy5tc2c9XCJcIix0aGlzLmVuZGVkPSExLHRoaXMuY2h1bmtzPVtdLHRoaXMuc3RybT1uZXcgaSx0aGlzLnN0cm0uYXZhaWxfb3V0PTA7dmFyIHI9Yy5pbmZsYXRlSW5pdDIodGhpcy5zdHJtLHQud2luZG93Qml0cyk7aWYociE9PW0uWl9PSyl0aHJvdyBuZXcgRXJyb3IobltyXSk7dGhpcy5oZWFkZXI9bmV3IHMsYy5pbmZsYXRlR2V0SGVhZGVyKHRoaXMuc3RybSx0aGlzLmhlYWRlcil9ZnVuY3Rpb24gbyhlLHQpe3ZhciByPW5ldyBhKHQpO2lmKHIucHVzaChlLCEwKSxyLmVycil0aHJvdyByLm1zZ3x8bltyLmVycl07cmV0dXJuIHIucmVzdWx0fWEucHJvdG90eXBlLnB1c2g9ZnVuY3Rpb24oZSx0KXt2YXIgcixuLGkscyxhLG8saD10aGlzLnN0cm0sdT10aGlzLm9wdGlvbnMuY2h1bmtTaXplLGw9dGhpcy5vcHRpb25zLmRpY3Rpb25hcnksZj0hMTtpZih0aGlzLmVuZGVkKXJldHVybiExO249dD09PX5+dD90OiEwPT09dD9tLlpfRklOSVNIOm0uWl9OT19GTFVTSCxcInN0cmluZ1wiPT10eXBlb2YgZT9oLmlucHV0PXAuYmluc3RyaW5nMmJ1ZihlKTpcIltvYmplY3QgQXJyYXlCdWZmZXJdXCI9PT1fLmNhbGwoZSk/aC5pbnB1dD1uZXcgVWludDhBcnJheShlKTpoLmlucHV0PWUsaC5uZXh0X2luPTAsaC5hdmFpbF9pbj1oLmlucHV0Lmxlbmd0aDtkb3tpZigwPT09aC5hdmFpbF9vdXQmJihoLm91dHB1dD1uZXcgZC5CdWY4KHUpLGgubmV4dF9vdXQ9MCxoLmF2YWlsX291dD11KSwocj1jLmluZmxhdGUoaCxtLlpfTk9fRkxVU0gpKT09PW0uWl9ORUVEX0RJQ1QmJmwmJihvPVwic3RyaW5nXCI9PXR5cGVvZiBsP3Auc3RyaW5nMmJ1ZihsKTpcIltvYmplY3QgQXJyYXlCdWZmZXJdXCI9PT1fLmNhbGwobCk/bmV3IFVpbnQ4QXJyYXkobCk6bCxyPWMuaW5mbGF0ZVNldERpY3Rpb25hcnkodGhpcy5zdHJtLG8pKSxyPT09bS5aX0JVRl9FUlJPUiYmITA9PT1mJiYocj1tLlpfT0ssZj0hMSksciE9PW0uWl9TVFJFQU1fRU5EJiZyIT09bS5aX09LKXJldHVybiB0aGlzLm9uRW5kKHIpLCEodGhpcy5lbmRlZD0hMCk7aC5uZXh0X291dCYmKDAhPT1oLmF2YWlsX291dCYmciE9PW0uWl9TVFJFQU1fRU5EJiYoMCE9PWguYXZhaWxfaW58fG4hPT1tLlpfRklOSVNIJiZuIT09bS5aX1NZTkNfRkxVU0gpfHwoXCJzdHJpbmdcIj09PXRoaXMub3B0aW9ucy50bz8oaT1wLnV0Zjhib3JkZXIoaC5vdXRwdXQsaC5uZXh0X291dCkscz1oLm5leHRfb3V0LWksYT1wLmJ1ZjJzdHJpbmcoaC5vdXRwdXQsaSksaC5uZXh0X291dD1zLGguYXZhaWxfb3V0PXUtcyxzJiZkLmFycmF5U2V0KGgub3V0cHV0LGgub3V0cHV0LGkscywwKSx0aGlzLm9uRGF0YShhKSk6dGhpcy5vbkRhdGEoZC5zaHJpbmtCdWYoaC5vdXRwdXQsaC5uZXh0X291dCkpKSksMD09PWguYXZhaWxfaW4mJjA9PT1oLmF2YWlsX291dCYmKGY9ITApfXdoaWxlKCgwPGguYXZhaWxfaW58fDA9PT1oLmF2YWlsX291dCkmJnIhPT1tLlpfU1RSRUFNX0VORCk7cmV0dXJuIHI9PT1tLlpfU1RSRUFNX0VORCYmKG49bS5aX0ZJTklTSCksbj09PW0uWl9GSU5JU0g/KHI9Yy5pbmZsYXRlRW5kKHRoaXMuc3RybSksdGhpcy5vbkVuZChyKSx0aGlzLmVuZGVkPSEwLHI9PT1tLlpfT0spOm4hPT1tLlpfU1lOQ19GTFVTSHx8KHRoaXMub25FbmQobS5aX09LKSwhKGguYXZhaWxfb3V0PTApKX0sYS5wcm90b3R5cGUub25EYXRhPWZ1bmN0aW9uKGUpe3RoaXMuY2h1bmtzLnB1c2goZSl9LGEucHJvdG90eXBlLm9uRW5kPWZ1bmN0aW9uKGUpe2U9PT1tLlpfT0smJihcInN0cmluZ1wiPT09dGhpcy5vcHRpb25zLnRvP3RoaXMucmVzdWx0PXRoaXMuY2h1bmtzLmpvaW4oXCJcIik6dGhpcy5yZXN1bHQ9ZC5mbGF0dGVuQ2h1bmtzKHRoaXMuY2h1bmtzKSksdGhpcy5jaHVua3M9W10sdGhpcy5lcnI9ZSx0aGlzLm1zZz10aGlzLnN0cm0ubXNnfSxyLkluZmxhdGU9YSxyLmluZmxhdGU9byxyLmluZmxhdGVSYXc9ZnVuY3Rpb24oZSx0KXtyZXR1cm4odD10fHx7fSkucmF3PSEwLG8oZSx0KX0sci51bmd6aXA9b30se1wiLi91dGlscy9jb21tb25cIjo0MSxcIi4vdXRpbHMvc3RyaW5nc1wiOjQyLFwiLi96bGliL2NvbnN0YW50c1wiOjQ0LFwiLi96bGliL2d6aGVhZGVyXCI6NDcsXCIuL3psaWIvaW5mbGF0ZVwiOjQ5LFwiLi96bGliL21lc3NhZ2VzXCI6NTEsXCIuL3psaWIvenN0cmVhbVwiOjUzfV0sNDE6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt2YXIgbj1cInVuZGVmaW5lZFwiIT10eXBlb2YgVWludDhBcnJheSYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIFVpbnQxNkFycmF5JiZcInVuZGVmaW5lZFwiIT10eXBlb2YgSW50MzJBcnJheTtyLmFzc2lnbj1mdW5jdGlvbihlKXtmb3IodmFyIHQ9QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLDEpO3QubGVuZ3RoOyl7dmFyIHI9dC5zaGlmdCgpO2lmKHIpe2lmKFwib2JqZWN0XCIhPXR5cGVvZiByKXRocm93IG5ldyBUeXBlRXJyb3IocitcIm11c3QgYmUgbm9uLW9iamVjdFwiKTtmb3IodmFyIG4gaW4gcilyLmhhc093blByb3BlcnR5KG4pJiYoZVtuXT1yW25dKX19cmV0dXJuIGV9LHIuc2hyaW5rQnVmPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIGUubGVuZ3RoPT09dD9lOmUuc3ViYXJyYXk/ZS5zdWJhcnJheSgwLHQpOihlLmxlbmd0aD10LGUpfTt2YXIgaT17YXJyYXlTZXQ6ZnVuY3Rpb24oZSx0LHIsbixpKXtpZih0LnN1YmFycmF5JiZlLnN1YmFycmF5KWUuc2V0KHQuc3ViYXJyYXkocixyK24pLGkpO2Vsc2UgZm9yKHZhciBzPTA7czxuO3MrKyllW2krc109dFtyK3NdfSxmbGF0dGVuQ2h1bmtzOmZ1bmN0aW9uKGUpe3ZhciB0LHIsbixpLHMsYTtmb3IodD1uPTAscj1lLmxlbmd0aDt0PHI7dCsrKW4rPWVbdF0ubGVuZ3RoO2ZvcihhPW5ldyBVaW50OEFycmF5KG4pLHQ9aT0wLHI9ZS5sZW5ndGg7dDxyO3QrKylzPWVbdF0sYS5zZXQocyxpKSxpKz1zLmxlbmd0aDtyZXR1cm4gYX19LHM9e2FycmF5U2V0OmZ1bmN0aW9uKGUsdCxyLG4saSl7Zm9yKHZhciBzPTA7czxuO3MrKyllW2krc109dFtyK3NdfSxmbGF0dGVuQ2h1bmtzOmZ1bmN0aW9uKGUpe3JldHVybltdLmNvbmNhdC5hcHBseShbXSxlKX19O3Iuc2V0VHlwZWQ9ZnVuY3Rpb24oZSl7ZT8oci5CdWY4PVVpbnQ4QXJyYXksci5CdWYxNj1VaW50MTZBcnJheSxyLkJ1ZjMyPUludDMyQXJyYXksci5hc3NpZ24ocixpKSk6KHIuQnVmOD1BcnJheSxyLkJ1ZjE2PUFycmF5LHIuQnVmMzI9QXJyYXksci5hc3NpZ24ocixzKSl9LHIuc2V0VHlwZWQobil9LHt9XSw0MjpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3ZhciBoPWUoXCIuL2NvbW1vblwiKSxpPSEwLHM9ITA7dHJ5e1N0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCxbMF0pfWNhdGNoKGUpe2k9ITF9dHJ5e1N0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCxuZXcgVWludDhBcnJheSgxKSl9Y2F0Y2goZSl7cz0hMX1mb3IodmFyIHU9bmV3IGguQnVmOCgyNTYpLG49MDtuPDI1NjtuKyspdVtuXT0yNTI8PW4/NjoyNDg8PW4/NToyNDA8PW4/NDoyMjQ8PW4/MzoxOTI8PW4/MjoxO2Z1bmN0aW9uIGwoZSx0KXtpZih0PDY1NTM3JiYoZS5zdWJhcnJheSYmc3x8IWUuc3ViYXJyYXkmJmkpKXJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsaC5zaHJpbmtCdWYoZSx0KSk7Zm9yKHZhciByPVwiXCIsbj0wO248dDtuKyspcis9U3RyaW5nLmZyb21DaGFyQ29kZShlW25dKTtyZXR1cm4gcn11WzI1NF09dVsyNTRdPTEsci5zdHJpbmcyYnVmPWZ1bmN0aW9uKGUpe3ZhciB0LHIsbixpLHMsYT1lLmxlbmd0aCxvPTA7Zm9yKGk9MDtpPGE7aSsrKTU1Mjk2PT0oNjQ1MTImKHI9ZS5jaGFyQ29kZUF0KGkpKSkmJmkrMTxhJiY1NjMyMD09KDY0NTEyJihuPWUuY2hhckNvZGVBdChpKzEpKSkmJihyPTY1NTM2KyhyLTU1Mjk2PDwxMCkrKG4tNTYzMjApLGkrKyksbys9cjwxMjg/MTpyPDIwNDg/MjpyPDY1NTM2PzM6NDtmb3IodD1uZXcgaC5CdWY4KG8pLGk9cz0wO3M8bztpKyspNTUyOTY9PSg2NDUxMiYocj1lLmNoYXJDb2RlQXQoaSkpKSYmaSsxPGEmJjU2MzIwPT0oNjQ1MTImKG49ZS5jaGFyQ29kZUF0KGkrMSkpKSYmKHI9NjU1MzYrKHItNTUyOTY8PDEwKSsobi01NjMyMCksaSsrKSxyPDEyOD90W3MrK109cjoocjwyMDQ4P3RbcysrXT0xOTJ8cj4+PjY6KHI8NjU1MzY/dFtzKytdPTIyNHxyPj4+MTI6KHRbcysrXT0yNDB8cj4+PjE4LHRbcysrXT0xMjh8cj4+PjEyJjYzKSx0W3MrK109MTI4fHI+Pj42JjYzKSx0W3MrK109MTI4fDYzJnIpO3JldHVybiB0fSxyLmJ1ZjJiaW5zdHJpbmc9ZnVuY3Rpb24oZSl7cmV0dXJuIGwoZSxlLmxlbmd0aCl9LHIuYmluc3RyaW5nMmJ1Zj1mdW5jdGlvbihlKXtmb3IodmFyIHQ9bmV3IGguQnVmOChlLmxlbmd0aCkscj0wLG49dC5sZW5ndGg7cjxuO3IrKyl0W3JdPWUuY2hhckNvZGVBdChyKTtyZXR1cm4gdH0sci5idWYyc3RyaW5nPWZ1bmN0aW9uKGUsdCl7dmFyIHIsbixpLHMsYT10fHxlLmxlbmd0aCxvPW5ldyBBcnJheSgyKmEpO2ZvcihyPW49MDtyPGE7KWlmKChpPWVbcisrXSk8MTI4KW9bbisrXT1pO2Vsc2UgaWYoNDwocz11W2ldKSlvW24rK109NjU1MzMscis9cy0xO2Vsc2V7Zm9yKGkmPTI9PT1zPzMxOjM9PT1zPzE1Ojc7MTxzJiZyPGE7KWk9aTw8Nnw2MyZlW3IrK10scy0tOzE8cz9vW24rK109NjU1MzM6aTw2NTUzNj9vW24rK109aTooaS09NjU1MzYsb1tuKytdPTU1Mjk2fGk+PjEwJjEwMjMsb1tuKytdPTU2MzIwfDEwMjMmaSl9cmV0dXJuIGwobyxuKX0sci51dGY4Ym9yZGVyPWZ1bmN0aW9uKGUsdCl7dmFyIHI7Zm9yKCh0PXR8fGUubGVuZ3RoKT5lLmxlbmd0aCYmKHQ9ZS5sZW5ndGgpLHI9dC0xOzA8PXImJjEyOD09KDE5MiZlW3JdKTspci0tO3JldHVybiByPDA/dDowPT09cj90OnIrdVtlW3JdXT50P3I6dH19LHtcIi4vY29tbW9uXCI6NDF9XSw0MzpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3QuZXhwb3J0cz1mdW5jdGlvbihlLHQscixuKXtmb3IodmFyIGk9NjU1MzUmZXwwLHM9ZT4+PjE2JjY1NTM1fDAsYT0wOzAhPT1yOyl7Zm9yKHItPWE9MmUzPHI/MmUzOnI7cz1zKyhpPWkrdFtuKytdfDApfDAsLS1hOyk7aSU9NjU1MjEscyU9NjU1MjF9cmV0dXJuIGl8czw8MTZ8MH19LHt9XSw0NDpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3QuZXhwb3J0cz17Wl9OT19GTFVTSDowLFpfUEFSVElBTF9GTFVTSDoxLFpfU1lOQ19GTFVTSDoyLFpfRlVMTF9GTFVTSDozLFpfRklOSVNIOjQsWl9CTE9DSzo1LFpfVFJFRVM6NixaX09LOjAsWl9TVFJFQU1fRU5EOjEsWl9ORUVEX0RJQ1Q6MixaX0VSUk5POi0xLFpfU1RSRUFNX0VSUk9SOi0yLFpfREFUQV9FUlJPUjotMyxaX0JVRl9FUlJPUjotNSxaX05PX0NPTVBSRVNTSU9OOjAsWl9CRVNUX1NQRUVEOjEsWl9CRVNUX0NPTVBSRVNTSU9OOjksWl9ERUZBVUxUX0NPTVBSRVNTSU9OOi0xLFpfRklMVEVSRUQ6MSxaX0hVRkZNQU5fT05MWToyLFpfUkxFOjMsWl9GSVhFRDo0LFpfREVGQVVMVF9TVFJBVEVHWTowLFpfQklOQVJZOjAsWl9URVhUOjEsWl9VTktOT1dOOjIsWl9ERUZMQVRFRDo4fX0se31dLDQ1OltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7dmFyIG89ZnVuY3Rpb24oKXtmb3IodmFyIGUsdD1bXSxyPTA7cjwyNTY7cisrKXtlPXI7Zm9yKHZhciBuPTA7bjw4O24rKyllPTEmZT8zOTg4MjkyMzg0XmU+Pj4xOmU+Pj4xO3Rbcl09ZX1yZXR1cm4gdH0oKTt0LmV4cG9ydHM9ZnVuY3Rpb24oZSx0LHIsbil7dmFyIGk9byxzPW4rcjtlXj0tMTtmb3IodmFyIGE9bjthPHM7YSsrKWU9ZT4+PjheaVsyNTUmKGVedFthXSldO3JldHVybi0xXmV9fSx7fV0sNDY6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt2YXIgaCxjPWUoXCIuLi91dGlscy9jb21tb25cIiksdT1lKFwiLi90cmVlc1wiKSxkPWUoXCIuL2FkbGVyMzJcIikscD1lKFwiLi9jcmMzMlwiKSxuPWUoXCIuL21lc3NhZ2VzXCIpLGw9MCxmPTQsbT0wLF89LTIsZz0tMSxiPTQsaT0yLHY9OCx5PTkscz0yODYsYT0zMCxvPTE5LHc9MipzKzEsaz0xNSx4PTMsUz0yNTgsej1TK3grMSxDPTQyLEU9MTEzLEE9MSxJPTIsTz0zLEI9NDtmdW5jdGlvbiBSKGUsdCl7cmV0dXJuIGUubXNnPW5bdF0sdH1mdW5jdGlvbiBUKGUpe3JldHVybihlPDwxKS0oNDxlPzk6MCl9ZnVuY3Rpb24gRChlKXtmb3IodmFyIHQ9ZS5sZW5ndGg7MDw9LS10OyllW3RdPTB9ZnVuY3Rpb24gRihlKXt2YXIgdD1lLnN0YXRlLHI9dC5wZW5kaW5nO3I+ZS5hdmFpbF9vdXQmJihyPWUuYXZhaWxfb3V0KSwwIT09ciYmKGMuYXJyYXlTZXQoZS5vdXRwdXQsdC5wZW5kaW5nX2J1Zix0LnBlbmRpbmdfb3V0LHIsZS5uZXh0X291dCksZS5uZXh0X291dCs9cix0LnBlbmRpbmdfb3V0Kz1yLGUudG90YWxfb3V0Kz1yLGUuYXZhaWxfb3V0LT1yLHQucGVuZGluZy09ciwwPT09dC5wZW5kaW5nJiYodC5wZW5kaW5nX291dD0wKSl9ZnVuY3Rpb24gTihlLHQpe3UuX3RyX2ZsdXNoX2Jsb2NrKGUsMDw9ZS5ibG9ja19zdGFydD9lLmJsb2NrX3N0YXJ0Oi0xLGUuc3Ryc3RhcnQtZS5ibG9ja19zdGFydCx0KSxlLmJsb2NrX3N0YXJ0PWUuc3Ryc3RhcnQsRihlLnN0cm0pfWZ1bmN0aW9uIFUoZSx0KXtlLnBlbmRpbmdfYnVmW2UucGVuZGluZysrXT10fWZ1bmN0aW9uIFAoZSx0KXtlLnBlbmRpbmdfYnVmW2UucGVuZGluZysrXT10Pj4+OCYyNTUsZS5wZW5kaW5nX2J1ZltlLnBlbmRpbmcrK109MjU1JnR9ZnVuY3Rpb24gTChlLHQpe3ZhciByLG4saT1lLm1heF9jaGFpbl9sZW5ndGgscz1lLnN0cnN0YXJ0LGE9ZS5wcmV2X2xlbmd0aCxvPWUubmljZV9tYXRjaCxoPWUuc3Ryc3RhcnQ+ZS53X3NpemUtej9lLnN0cnN0YXJ0LShlLndfc2l6ZS16KTowLHU9ZS53aW5kb3csbD1lLndfbWFzayxmPWUucHJldixjPWUuc3Ryc3RhcnQrUyxkPXVbcythLTFdLHA9dVtzK2FdO2UucHJldl9sZW5ndGg+PWUuZ29vZF9tYXRjaCYmKGk+Pj0yKSxvPmUubG9va2FoZWFkJiYobz1lLmxvb2thaGVhZCk7ZG97aWYodVsocj10KSthXT09PXAmJnVbcithLTFdPT09ZCYmdVtyXT09PXVbc10mJnVbKytyXT09PXVbcysxXSl7cys9MixyKys7ZG97fXdoaWxlKHVbKytzXT09PXVbKytyXSYmdVsrK3NdPT09dVsrK3JdJiZ1Wysrc109PT11Wysrcl0mJnVbKytzXT09PXVbKytyXSYmdVsrK3NdPT09dVsrK3JdJiZ1Wysrc109PT11Wysrcl0mJnVbKytzXT09PXVbKytyXSYmdVsrK3NdPT09dVsrK3JdJiZzPGMpO2lmKG49Uy0oYy1zKSxzPWMtUyxhPG4pe2lmKGUubWF0Y2hfc3RhcnQ9dCxvPD0oYT1uKSlicmVhaztkPXVbcythLTFdLHA9dVtzK2FdfX19d2hpbGUoKHQ9Zlt0JmxdKT5oJiYwIT0tLWkpO3JldHVybiBhPD1lLmxvb2thaGVhZD9hOmUubG9va2FoZWFkfWZ1bmN0aW9uIGooZSl7dmFyIHQscixuLGkscyxhLG8saCx1LGwsZj1lLndfc2l6ZTtkb3tpZihpPWUud2luZG93X3NpemUtZS5sb29rYWhlYWQtZS5zdHJzdGFydCxlLnN0cnN0YXJ0Pj1mKyhmLXopKXtmb3IoYy5hcnJheVNldChlLndpbmRvdyxlLndpbmRvdyxmLGYsMCksZS5tYXRjaF9zdGFydC09ZixlLnN0cnN0YXJ0LT1mLGUuYmxvY2tfc3RhcnQtPWYsdD1yPWUuaGFzaF9zaXplO249ZS5oZWFkWy0tdF0sZS5oZWFkW3RdPWY8PW4/bi1mOjAsLS1yOyk7Zm9yKHQ9cj1mO249ZS5wcmV2Wy0tdF0sZS5wcmV2W3RdPWY8PW4/bi1mOjAsLS1yOyk7aSs9Zn1pZigwPT09ZS5zdHJtLmF2YWlsX2luKWJyZWFrO2lmKGE9ZS5zdHJtLG89ZS53aW5kb3csaD1lLnN0cnN0YXJ0K2UubG9va2FoZWFkLHU9aSxsPXZvaWQgMCxsPWEuYXZhaWxfaW4sdTxsJiYobD11KSxyPTA9PT1sPzA6KGEuYXZhaWxfaW4tPWwsYy5hcnJheVNldChvLGEuaW5wdXQsYS5uZXh0X2luLGwsaCksMT09PWEuc3RhdGUud3JhcD9hLmFkbGVyPWQoYS5hZGxlcixvLGwsaCk6Mj09PWEuc3RhdGUud3JhcCYmKGEuYWRsZXI9cChhLmFkbGVyLG8sbCxoKSksYS5uZXh0X2luKz1sLGEudG90YWxfaW4rPWwsbCksZS5sb29rYWhlYWQrPXIsZS5sb29rYWhlYWQrZS5pbnNlcnQ+PXgpZm9yKHM9ZS5zdHJzdGFydC1lLmluc2VydCxlLmluc19oPWUud2luZG93W3NdLGUuaW5zX2g9KGUuaW5zX2g8PGUuaGFzaF9zaGlmdF5lLndpbmRvd1tzKzFdKSZlLmhhc2hfbWFzaztlLmluc2VydCYmKGUuaW5zX2g9KGUuaW5zX2g8PGUuaGFzaF9zaGlmdF5lLndpbmRvd1tzK3gtMV0pJmUuaGFzaF9tYXNrLGUucHJldltzJmUud19tYXNrXT1lLmhlYWRbZS5pbnNfaF0sZS5oZWFkW2UuaW5zX2hdPXMscysrLGUuaW5zZXJ0LS0sIShlLmxvb2thaGVhZCtlLmluc2VydDx4KSk7KTt9d2hpbGUoZS5sb29rYWhlYWQ8eiYmMCE9PWUuc3RybS5hdmFpbF9pbil9ZnVuY3Rpb24gWihlLHQpe2Zvcih2YXIgcixuOzspe2lmKGUubG9va2FoZWFkPHope2lmKGooZSksZS5sb29rYWhlYWQ8eiYmdD09PWwpcmV0dXJuIEE7aWYoMD09PWUubG9va2FoZWFkKWJyZWFrfWlmKHI9MCxlLmxvb2thaGVhZD49eCYmKGUuaW5zX2g9KGUuaW5zX2g8PGUuaGFzaF9zaGlmdF5lLndpbmRvd1tlLnN0cnN0YXJ0K3gtMV0pJmUuaGFzaF9tYXNrLHI9ZS5wcmV2W2Uuc3Ryc3RhcnQmZS53X21hc2tdPWUuaGVhZFtlLmluc19oXSxlLmhlYWRbZS5pbnNfaF09ZS5zdHJzdGFydCksMCE9PXImJmUuc3Ryc3RhcnQtcjw9ZS53X3NpemUteiYmKGUubWF0Y2hfbGVuZ3RoPUwoZSxyKSksZS5tYXRjaF9sZW5ndGg+PXgpaWYobj11Ll90cl90YWxseShlLGUuc3Ryc3RhcnQtZS5tYXRjaF9zdGFydCxlLm1hdGNoX2xlbmd0aC14KSxlLmxvb2thaGVhZC09ZS5tYXRjaF9sZW5ndGgsZS5tYXRjaF9sZW5ndGg8PWUubWF4X2xhenlfbWF0Y2gmJmUubG9va2FoZWFkPj14KXtmb3IoZS5tYXRjaF9sZW5ndGgtLTtlLnN0cnN0YXJ0KyssZS5pbnNfaD0oZS5pbnNfaDw8ZS5oYXNoX3NoaWZ0XmUud2luZG93W2Uuc3Ryc3RhcnQreC0xXSkmZS5oYXNoX21hc2sscj1lLnByZXZbZS5zdHJzdGFydCZlLndfbWFza109ZS5oZWFkW2UuaW5zX2hdLGUuaGVhZFtlLmluc19oXT1lLnN0cnN0YXJ0LDAhPS0tZS5tYXRjaF9sZW5ndGg7KTtlLnN0cnN0YXJ0Kyt9ZWxzZSBlLnN0cnN0YXJ0Kz1lLm1hdGNoX2xlbmd0aCxlLm1hdGNoX2xlbmd0aD0wLGUuaW5zX2g9ZS53aW5kb3dbZS5zdHJzdGFydF0sZS5pbnNfaD0oZS5pbnNfaDw8ZS5oYXNoX3NoaWZ0XmUud2luZG93W2Uuc3Ryc3RhcnQrMV0pJmUuaGFzaF9tYXNrO2Vsc2Ugbj11Ll90cl90YWxseShlLDAsZS53aW5kb3dbZS5zdHJzdGFydF0pLGUubG9va2FoZWFkLS0sZS5zdHJzdGFydCsrO2lmKG4mJihOKGUsITEpLDA9PT1lLnN0cm0uYXZhaWxfb3V0KSlyZXR1cm4gQX1yZXR1cm4gZS5pbnNlcnQ9ZS5zdHJzdGFydDx4LTE/ZS5zdHJzdGFydDp4LTEsdD09PWY/KE4oZSwhMCksMD09PWUuc3RybS5hdmFpbF9vdXQ/TzpCKTplLmxhc3RfbGl0JiYoTihlLCExKSwwPT09ZS5zdHJtLmF2YWlsX291dCk/QTpJfWZ1bmN0aW9uIFcoZSx0KXtmb3IodmFyIHIsbixpOzspe2lmKGUubG9va2FoZWFkPHope2lmKGooZSksZS5sb29rYWhlYWQ8eiYmdD09PWwpcmV0dXJuIEE7aWYoMD09PWUubG9va2FoZWFkKWJyZWFrfWlmKHI9MCxlLmxvb2thaGVhZD49eCYmKGUuaW5zX2g9KGUuaW5zX2g8PGUuaGFzaF9zaGlmdF5lLndpbmRvd1tlLnN0cnN0YXJ0K3gtMV0pJmUuaGFzaF9tYXNrLHI9ZS5wcmV2W2Uuc3Ryc3RhcnQmZS53X21hc2tdPWUuaGVhZFtlLmluc19oXSxlLmhlYWRbZS5pbnNfaF09ZS5zdHJzdGFydCksZS5wcmV2X2xlbmd0aD1lLm1hdGNoX2xlbmd0aCxlLnByZXZfbWF0Y2g9ZS5tYXRjaF9zdGFydCxlLm1hdGNoX2xlbmd0aD14LTEsMCE9PXImJmUucHJldl9sZW5ndGg8ZS5tYXhfbGF6eV9tYXRjaCYmZS5zdHJzdGFydC1yPD1lLndfc2l6ZS16JiYoZS5tYXRjaF9sZW5ndGg9TChlLHIpLGUubWF0Y2hfbGVuZ3RoPD01JiYoMT09PWUuc3RyYXRlZ3l8fGUubWF0Y2hfbGVuZ3RoPT09eCYmNDA5NjxlLnN0cnN0YXJ0LWUubWF0Y2hfc3RhcnQpJiYoZS5tYXRjaF9sZW5ndGg9eC0xKSksZS5wcmV2X2xlbmd0aD49eCYmZS5tYXRjaF9sZW5ndGg8PWUucHJldl9sZW5ndGgpe2ZvcihpPWUuc3Ryc3RhcnQrZS5sb29rYWhlYWQteCxuPXUuX3RyX3RhbGx5KGUsZS5zdHJzdGFydC0xLWUucHJldl9tYXRjaCxlLnByZXZfbGVuZ3RoLXgpLGUubG9va2FoZWFkLT1lLnByZXZfbGVuZ3RoLTEsZS5wcmV2X2xlbmd0aC09MjsrK2Uuc3Ryc3RhcnQ8PWkmJihlLmluc19oPShlLmluc19oPDxlLmhhc2hfc2hpZnReZS53aW5kb3dbZS5zdHJzdGFydCt4LTFdKSZlLmhhc2hfbWFzayxyPWUucHJldltlLnN0cnN0YXJ0JmUud19tYXNrXT1lLmhlYWRbZS5pbnNfaF0sZS5oZWFkW2UuaW5zX2hdPWUuc3Ryc3RhcnQpLDAhPS0tZS5wcmV2X2xlbmd0aDspO2lmKGUubWF0Y2hfYXZhaWxhYmxlPTAsZS5tYXRjaF9sZW5ndGg9eC0xLGUuc3Ryc3RhcnQrKyxuJiYoTihlLCExKSwwPT09ZS5zdHJtLmF2YWlsX291dCkpcmV0dXJuIEF9ZWxzZSBpZihlLm1hdGNoX2F2YWlsYWJsZSl7aWYoKG49dS5fdHJfdGFsbHkoZSwwLGUud2luZG93W2Uuc3Ryc3RhcnQtMV0pKSYmTihlLCExKSxlLnN0cnN0YXJ0KyssZS5sb29rYWhlYWQtLSwwPT09ZS5zdHJtLmF2YWlsX291dClyZXR1cm4gQX1lbHNlIGUubWF0Y2hfYXZhaWxhYmxlPTEsZS5zdHJzdGFydCsrLGUubG9va2FoZWFkLS19cmV0dXJuIGUubWF0Y2hfYXZhaWxhYmxlJiYobj11Ll90cl90YWxseShlLDAsZS53aW5kb3dbZS5zdHJzdGFydC0xXSksZS5tYXRjaF9hdmFpbGFibGU9MCksZS5pbnNlcnQ9ZS5zdHJzdGFydDx4LTE/ZS5zdHJzdGFydDp4LTEsdD09PWY/KE4oZSwhMCksMD09PWUuc3RybS5hdmFpbF9vdXQ/TzpCKTplLmxhc3RfbGl0JiYoTihlLCExKSwwPT09ZS5zdHJtLmF2YWlsX291dCk/QTpJfWZ1bmN0aW9uIE0oZSx0LHIsbixpKXt0aGlzLmdvb2RfbGVuZ3RoPWUsdGhpcy5tYXhfbGF6eT10LHRoaXMubmljZV9sZW5ndGg9cix0aGlzLm1heF9jaGFpbj1uLHRoaXMuZnVuYz1pfWZ1bmN0aW9uIEgoKXt0aGlzLnN0cm09bnVsbCx0aGlzLnN0YXR1cz0wLHRoaXMucGVuZGluZ19idWY9bnVsbCx0aGlzLnBlbmRpbmdfYnVmX3NpemU9MCx0aGlzLnBlbmRpbmdfb3V0PTAsdGhpcy5wZW5kaW5nPTAsdGhpcy53cmFwPTAsdGhpcy5nemhlYWQ9bnVsbCx0aGlzLmd6aW5kZXg9MCx0aGlzLm1ldGhvZD12LHRoaXMubGFzdF9mbHVzaD0tMSx0aGlzLndfc2l6ZT0wLHRoaXMud19iaXRzPTAsdGhpcy53X21hc2s9MCx0aGlzLndpbmRvdz1udWxsLHRoaXMud2luZG93X3NpemU9MCx0aGlzLnByZXY9bnVsbCx0aGlzLmhlYWQ9bnVsbCx0aGlzLmluc19oPTAsdGhpcy5oYXNoX3NpemU9MCx0aGlzLmhhc2hfYml0cz0wLHRoaXMuaGFzaF9tYXNrPTAsdGhpcy5oYXNoX3NoaWZ0PTAsdGhpcy5ibG9ja19zdGFydD0wLHRoaXMubWF0Y2hfbGVuZ3RoPTAsdGhpcy5wcmV2X21hdGNoPTAsdGhpcy5tYXRjaF9hdmFpbGFibGU9MCx0aGlzLnN0cnN0YXJ0PTAsdGhpcy5tYXRjaF9zdGFydD0wLHRoaXMubG9va2FoZWFkPTAsdGhpcy5wcmV2X2xlbmd0aD0wLHRoaXMubWF4X2NoYWluX2xlbmd0aD0wLHRoaXMubWF4X2xhenlfbWF0Y2g9MCx0aGlzLmxldmVsPTAsdGhpcy5zdHJhdGVneT0wLHRoaXMuZ29vZF9tYXRjaD0wLHRoaXMubmljZV9tYXRjaD0wLHRoaXMuZHluX2x0cmVlPW5ldyBjLkJ1ZjE2KDIqdyksdGhpcy5keW5fZHRyZWU9bmV3IGMuQnVmMTYoMiooMiphKzEpKSx0aGlzLmJsX3RyZWU9bmV3IGMuQnVmMTYoMiooMipvKzEpKSxEKHRoaXMuZHluX2x0cmVlKSxEKHRoaXMuZHluX2R0cmVlKSxEKHRoaXMuYmxfdHJlZSksdGhpcy5sX2Rlc2M9bnVsbCx0aGlzLmRfZGVzYz1udWxsLHRoaXMuYmxfZGVzYz1udWxsLHRoaXMuYmxfY291bnQ9bmV3IGMuQnVmMTYoaysxKSx0aGlzLmhlYXA9bmV3IGMuQnVmMTYoMipzKzEpLEQodGhpcy5oZWFwKSx0aGlzLmhlYXBfbGVuPTAsdGhpcy5oZWFwX21heD0wLHRoaXMuZGVwdGg9bmV3IGMuQnVmMTYoMipzKzEpLEQodGhpcy5kZXB0aCksdGhpcy5sX2J1Zj0wLHRoaXMubGl0X2J1ZnNpemU9MCx0aGlzLmxhc3RfbGl0PTAsdGhpcy5kX2J1Zj0wLHRoaXMub3B0X2xlbj0wLHRoaXMuc3RhdGljX2xlbj0wLHRoaXMubWF0Y2hlcz0wLHRoaXMuaW5zZXJ0PTAsdGhpcy5iaV9idWY9MCx0aGlzLmJpX3ZhbGlkPTB9ZnVuY3Rpb24gRyhlKXt2YXIgdDtyZXR1cm4gZSYmZS5zdGF0ZT8oZS50b3RhbF9pbj1lLnRvdGFsX291dD0wLGUuZGF0YV90eXBlPWksKHQ9ZS5zdGF0ZSkucGVuZGluZz0wLHQucGVuZGluZ19vdXQ9MCx0LndyYXA8MCYmKHQud3JhcD0tdC53cmFwKSx0LnN0YXR1cz10LndyYXA/QzpFLGUuYWRsZXI9Mj09PXQud3JhcD8wOjEsdC5sYXN0X2ZsdXNoPWwsdS5fdHJfaW5pdCh0KSxtKTpSKGUsXyl9ZnVuY3Rpb24gSyhlKXt2YXIgdD1HKGUpO3JldHVybiB0PT09bSYmZnVuY3Rpb24oZSl7ZS53aW5kb3dfc2l6ZT0yKmUud19zaXplLEQoZS5oZWFkKSxlLm1heF9sYXp5X21hdGNoPWhbZS5sZXZlbF0ubWF4X2xhenksZS5nb29kX21hdGNoPWhbZS5sZXZlbF0uZ29vZF9sZW5ndGgsZS5uaWNlX21hdGNoPWhbZS5sZXZlbF0ubmljZV9sZW5ndGgsZS5tYXhfY2hhaW5fbGVuZ3RoPWhbZS5sZXZlbF0ubWF4X2NoYWluLGUuc3Ryc3RhcnQ9MCxlLmJsb2NrX3N0YXJ0PTAsZS5sb29rYWhlYWQ9MCxlLmluc2VydD0wLGUubWF0Y2hfbGVuZ3RoPWUucHJldl9sZW5ndGg9eC0xLGUubWF0Y2hfYXZhaWxhYmxlPTAsZS5pbnNfaD0wfShlLnN0YXRlKSx0fWZ1bmN0aW9uIFkoZSx0LHIsbixpLHMpe2lmKCFlKXJldHVybiBfO3ZhciBhPTE7aWYodD09PWcmJih0PTYpLG48MD8oYT0wLG49LW4pOjE1PG4mJihhPTIsbi09MTYpLGk8MXx8eTxpfHxyIT09dnx8bjw4fHwxNTxufHx0PDB8fDk8dHx8czwwfHxiPHMpcmV0dXJuIFIoZSxfKTs4PT09biYmKG49OSk7dmFyIG89bmV3IEg7cmV0dXJuKGUuc3RhdGU9bykuc3RybT1lLG8ud3JhcD1hLG8uZ3poZWFkPW51bGwsby53X2JpdHM9bixvLndfc2l6ZT0xPDxvLndfYml0cyxvLndfbWFzaz1vLndfc2l6ZS0xLG8uaGFzaF9iaXRzPWkrNyxvLmhhc2hfc2l6ZT0xPDxvLmhhc2hfYml0cyxvLmhhc2hfbWFzaz1vLmhhc2hfc2l6ZS0xLG8uaGFzaF9zaGlmdD1+figoby5oYXNoX2JpdHMreC0xKS94KSxvLndpbmRvdz1uZXcgYy5CdWY4KDIqby53X3NpemUpLG8uaGVhZD1uZXcgYy5CdWYxNihvLmhhc2hfc2l6ZSksby5wcmV2PW5ldyBjLkJ1ZjE2KG8ud19zaXplKSxvLmxpdF9idWZzaXplPTE8PGkrNixvLnBlbmRpbmdfYnVmX3NpemU9NCpvLmxpdF9idWZzaXplLG8ucGVuZGluZ19idWY9bmV3IGMuQnVmOChvLnBlbmRpbmdfYnVmX3NpemUpLG8uZF9idWY9MSpvLmxpdF9idWZzaXplLG8ubF9idWY9MypvLmxpdF9idWZzaXplLG8ubGV2ZWw9dCxvLnN0cmF0ZWd5PXMsby5tZXRob2Q9cixLKGUpfWg9W25ldyBNKDAsMCwwLDAsZnVuY3Rpb24oZSx0KXt2YXIgcj02NTUzNTtmb3Iocj5lLnBlbmRpbmdfYnVmX3NpemUtNSYmKHI9ZS5wZW5kaW5nX2J1Zl9zaXplLTUpOzspe2lmKGUubG9va2FoZWFkPD0xKXtpZihqKGUpLDA9PT1lLmxvb2thaGVhZCYmdD09PWwpcmV0dXJuIEE7aWYoMD09PWUubG9va2FoZWFkKWJyZWFrfWUuc3Ryc3RhcnQrPWUubG9va2FoZWFkLGUubG9va2FoZWFkPTA7dmFyIG49ZS5ibG9ja19zdGFydCtyO2lmKCgwPT09ZS5zdHJzdGFydHx8ZS5zdHJzdGFydD49bikmJihlLmxvb2thaGVhZD1lLnN0cnN0YXJ0LW4sZS5zdHJzdGFydD1uLE4oZSwhMSksMD09PWUuc3RybS5hdmFpbF9vdXQpKXJldHVybiBBO2lmKGUuc3Ryc3RhcnQtZS5ibG9ja19zdGFydD49ZS53X3NpemUteiYmKE4oZSwhMSksMD09PWUuc3RybS5hdmFpbF9vdXQpKXJldHVybiBBfXJldHVybiBlLmluc2VydD0wLHQ9PT1mPyhOKGUsITApLDA9PT1lLnN0cm0uYXZhaWxfb3V0P086Qik6KGUuc3Ryc3RhcnQ+ZS5ibG9ja19zdGFydCYmKE4oZSwhMSksZS5zdHJtLmF2YWlsX291dCksQSl9KSxuZXcgTSg0LDQsOCw0LFopLG5ldyBNKDQsNSwxNiw4LFopLG5ldyBNKDQsNiwzMiwzMixaKSxuZXcgTSg0LDQsMTYsMTYsVyksbmV3IE0oOCwxNiwzMiwzMixXKSxuZXcgTSg4LDE2LDEyOCwxMjgsVyksbmV3IE0oOCwzMiwxMjgsMjU2LFcpLG5ldyBNKDMyLDEyOCwyNTgsMTAyNCxXKSxuZXcgTSgzMiwyNTgsMjU4LDQwOTYsVyldLHIuZGVmbGF0ZUluaXQ9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gWShlLHQsdiwxNSw4LDApfSxyLmRlZmxhdGVJbml0Mj1ZLHIuZGVmbGF0ZVJlc2V0PUssci5kZWZsYXRlUmVzZXRLZWVwPUcsci5kZWZsYXRlU2V0SGVhZGVyPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIGUmJmUuc3RhdGU/MiE9PWUuc3RhdGUud3JhcD9fOihlLnN0YXRlLmd6aGVhZD10LG0pOl99LHIuZGVmbGF0ZT1mdW5jdGlvbihlLHQpe3ZhciByLG4saSxzO2lmKCFlfHwhZS5zdGF0ZXx8NTx0fHx0PDApcmV0dXJuIGU/UihlLF8pOl87aWYobj1lLnN0YXRlLCFlLm91dHB1dHx8IWUuaW5wdXQmJjAhPT1lLmF2YWlsX2lufHw2NjY9PT1uLnN0YXR1cyYmdCE9PWYpcmV0dXJuIFIoZSwwPT09ZS5hdmFpbF9vdXQ/LTU6Xyk7aWYobi5zdHJtPWUscj1uLmxhc3RfZmx1c2gsbi5sYXN0X2ZsdXNoPXQsbi5zdGF0dXM9PT1DKWlmKDI9PT1uLndyYXApZS5hZGxlcj0wLFUobiwzMSksVShuLDEzOSksVShuLDgpLG4uZ3poZWFkPyhVKG4sKG4uZ3poZWFkLnRleHQ/MTowKSsobi5nemhlYWQuaGNyYz8yOjApKyhuLmd6aGVhZC5leHRyYT80OjApKyhuLmd6aGVhZC5uYW1lPzg6MCkrKG4uZ3poZWFkLmNvbW1lbnQ/MTY6MCkpLFUobiwyNTUmbi5nemhlYWQudGltZSksVShuLG4uZ3poZWFkLnRpbWU+PjgmMjU1KSxVKG4sbi5nemhlYWQudGltZT4+MTYmMjU1KSxVKG4sbi5nemhlYWQudGltZT4+MjQmMjU1KSxVKG4sOT09PW4ubGV2ZWw/MjoyPD1uLnN0cmF0ZWd5fHxuLmxldmVsPDI/NDowKSxVKG4sMjU1Jm4uZ3poZWFkLm9zKSxuLmd6aGVhZC5leHRyYSYmbi5nemhlYWQuZXh0cmEubGVuZ3RoJiYoVShuLDI1NSZuLmd6aGVhZC5leHRyYS5sZW5ndGgpLFUobixuLmd6aGVhZC5leHRyYS5sZW5ndGg+PjgmMjU1KSksbi5nemhlYWQuaGNyYyYmKGUuYWRsZXI9cChlLmFkbGVyLG4ucGVuZGluZ19idWYsbi5wZW5kaW5nLDApKSxuLmd6aW5kZXg9MCxuLnN0YXR1cz02OSk6KFUobiwwKSxVKG4sMCksVShuLDApLFUobiwwKSxVKG4sMCksVShuLDk9PT1uLmxldmVsPzI6Mjw9bi5zdHJhdGVneXx8bi5sZXZlbDwyPzQ6MCksVShuLDMpLG4uc3RhdHVzPUUpO2Vsc2V7dmFyIGE9disobi53X2JpdHMtODw8NCk8PDg7YXw9KDI8PW4uc3RyYXRlZ3l8fG4ubGV2ZWw8Mj8wOm4ubGV2ZWw8Nj8xOjY9PT1uLmxldmVsPzI6Myk8PDYsMCE9PW4uc3Ryc3RhcnQmJihhfD0zMiksYSs9MzEtYSUzMSxuLnN0YXR1cz1FLFAobixhKSwwIT09bi5zdHJzdGFydCYmKFAobixlLmFkbGVyPj4+MTYpLFAobiw2NTUzNSZlLmFkbGVyKSksZS5hZGxlcj0xfWlmKDY5PT09bi5zdGF0dXMpaWYobi5nemhlYWQuZXh0cmEpe2ZvcihpPW4ucGVuZGluZztuLmd6aW5kZXg8KDY1NTM1Jm4uZ3poZWFkLmV4dHJhLmxlbmd0aCkmJihuLnBlbmRpbmchPT1uLnBlbmRpbmdfYnVmX3NpemV8fChuLmd6aGVhZC5oY3JjJiZuLnBlbmRpbmc+aSYmKGUuYWRsZXI9cChlLmFkbGVyLG4ucGVuZGluZ19idWYsbi5wZW5kaW5nLWksaSkpLEYoZSksaT1uLnBlbmRpbmcsbi5wZW5kaW5nIT09bi5wZW5kaW5nX2J1Zl9zaXplKSk7KVUobiwyNTUmbi5nemhlYWQuZXh0cmFbbi5nemluZGV4XSksbi5nemluZGV4Kys7bi5nemhlYWQuaGNyYyYmbi5wZW5kaW5nPmkmJihlLmFkbGVyPXAoZS5hZGxlcixuLnBlbmRpbmdfYnVmLG4ucGVuZGluZy1pLGkpKSxuLmd6aW5kZXg9PT1uLmd6aGVhZC5leHRyYS5sZW5ndGgmJihuLmd6aW5kZXg9MCxuLnN0YXR1cz03Myl9ZWxzZSBuLnN0YXR1cz03MztpZig3Mz09PW4uc3RhdHVzKWlmKG4uZ3poZWFkLm5hbWUpe2k9bi5wZW5kaW5nO2Rve2lmKG4ucGVuZGluZz09PW4ucGVuZGluZ19idWZfc2l6ZSYmKG4uZ3poZWFkLmhjcmMmJm4ucGVuZGluZz5pJiYoZS5hZGxlcj1wKGUuYWRsZXIsbi5wZW5kaW5nX2J1ZixuLnBlbmRpbmctaSxpKSksRihlKSxpPW4ucGVuZGluZyxuLnBlbmRpbmc9PT1uLnBlbmRpbmdfYnVmX3NpemUpKXtzPTE7YnJlYWt9cz1uLmd6aW5kZXg8bi5nemhlYWQubmFtZS5sZW5ndGg/MjU1Jm4uZ3poZWFkLm5hbWUuY2hhckNvZGVBdChuLmd6aW5kZXgrKyk6MCxVKG4scyl9d2hpbGUoMCE9PXMpO24uZ3poZWFkLmhjcmMmJm4ucGVuZGluZz5pJiYoZS5hZGxlcj1wKGUuYWRsZXIsbi5wZW5kaW5nX2J1ZixuLnBlbmRpbmctaSxpKSksMD09PXMmJihuLmd6aW5kZXg9MCxuLnN0YXR1cz05MSl9ZWxzZSBuLnN0YXR1cz05MTtpZig5MT09PW4uc3RhdHVzKWlmKG4uZ3poZWFkLmNvbW1lbnQpe2k9bi5wZW5kaW5nO2Rve2lmKG4ucGVuZGluZz09PW4ucGVuZGluZ19idWZfc2l6ZSYmKG4uZ3poZWFkLmhjcmMmJm4ucGVuZGluZz5pJiYoZS5hZGxlcj1wKGUuYWRsZXIsbi5wZW5kaW5nX2J1ZixuLnBlbmRpbmctaSxpKSksRihlKSxpPW4ucGVuZGluZyxuLnBlbmRpbmc9PT1uLnBlbmRpbmdfYnVmX3NpemUpKXtzPTE7YnJlYWt9cz1uLmd6aW5kZXg8bi5nemhlYWQuY29tbWVudC5sZW5ndGg/MjU1Jm4uZ3poZWFkLmNvbW1lbnQuY2hhckNvZGVBdChuLmd6aW5kZXgrKyk6MCxVKG4scyl9d2hpbGUoMCE9PXMpO24uZ3poZWFkLmhjcmMmJm4ucGVuZGluZz5pJiYoZS5hZGxlcj1wKGUuYWRsZXIsbi5wZW5kaW5nX2J1ZixuLnBlbmRpbmctaSxpKSksMD09PXMmJihuLnN0YXR1cz0xMDMpfWVsc2Ugbi5zdGF0dXM9MTAzO2lmKDEwMz09PW4uc3RhdHVzJiYobi5nemhlYWQuaGNyYz8obi5wZW5kaW5nKzI+bi5wZW5kaW5nX2J1Zl9zaXplJiZGKGUpLG4ucGVuZGluZysyPD1uLnBlbmRpbmdfYnVmX3NpemUmJihVKG4sMjU1JmUuYWRsZXIpLFUobixlLmFkbGVyPj44JjI1NSksZS5hZGxlcj0wLG4uc3RhdHVzPUUpKTpuLnN0YXR1cz1FKSwwIT09bi5wZW5kaW5nKXtpZihGKGUpLDA9PT1lLmF2YWlsX291dClyZXR1cm4gbi5sYXN0X2ZsdXNoPS0xLG19ZWxzZSBpZigwPT09ZS5hdmFpbF9pbiYmVCh0KTw9VChyKSYmdCE9PWYpcmV0dXJuIFIoZSwtNSk7aWYoNjY2PT09bi5zdGF0dXMmJjAhPT1lLmF2YWlsX2luKXJldHVybiBSKGUsLTUpO2lmKDAhPT1lLmF2YWlsX2lufHwwIT09bi5sb29rYWhlYWR8fHQhPT1sJiY2NjYhPT1uLnN0YXR1cyl7dmFyIG89Mj09PW4uc3RyYXRlZ3k/ZnVuY3Rpb24oZSx0KXtmb3IodmFyIHI7Oyl7aWYoMD09PWUubG9va2FoZWFkJiYoaihlKSwwPT09ZS5sb29rYWhlYWQpKXtpZih0PT09bClyZXR1cm4gQTticmVha31pZihlLm1hdGNoX2xlbmd0aD0wLHI9dS5fdHJfdGFsbHkoZSwwLGUud2luZG93W2Uuc3Ryc3RhcnRdKSxlLmxvb2thaGVhZC0tLGUuc3Ryc3RhcnQrKyxyJiYoTihlLCExKSwwPT09ZS5zdHJtLmF2YWlsX291dCkpcmV0dXJuIEF9cmV0dXJuIGUuaW5zZXJ0PTAsdD09PWY/KE4oZSwhMCksMD09PWUuc3RybS5hdmFpbF9vdXQ/TzpCKTplLmxhc3RfbGl0JiYoTihlLCExKSwwPT09ZS5zdHJtLmF2YWlsX291dCk/QTpJfShuLHQpOjM9PT1uLnN0cmF0ZWd5P2Z1bmN0aW9uKGUsdCl7Zm9yKHZhciByLG4saSxzLGE9ZS53aW5kb3c7Oyl7aWYoZS5sb29rYWhlYWQ8PVMpe2lmKGooZSksZS5sb29rYWhlYWQ8PVMmJnQ9PT1sKXJldHVybiBBO2lmKDA9PT1lLmxvb2thaGVhZClicmVha31pZihlLm1hdGNoX2xlbmd0aD0wLGUubG9va2FoZWFkPj14JiYwPGUuc3Ryc3RhcnQmJihuPWFbaT1lLnN0cnN0YXJ0LTFdKT09PWFbKytpXSYmbj09PWFbKytpXSYmbj09PWFbKytpXSl7cz1lLnN0cnN0YXJ0K1M7ZG97fXdoaWxlKG49PT1hWysraV0mJm49PT1hWysraV0mJm49PT1hWysraV0mJm49PT1hWysraV0mJm49PT1hWysraV0mJm49PT1hWysraV0mJm49PT1hWysraV0mJm49PT1hWysraV0mJmk8cyk7ZS5tYXRjaF9sZW5ndGg9Uy0ocy1pKSxlLm1hdGNoX2xlbmd0aD5lLmxvb2thaGVhZCYmKGUubWF0Y2hfbGVuZ3RoPWUubG9va2FoZWFkKX1pZihlLm1hdGNoX2xlbmd0aD49eD8ocj11Ll90cl90YWxseShlLDEsZS5tYXRjaF9sZW5ndGgteCksZS5sb29rYWhlYWQtPWUubWF0Y2hfbGVuZ3RoLGUuc3Ryc3RhcnQrPWUubWF0Y2hfbGVuZ3RoLGUubWF0Y2hfbGVuZ3RoPTApOihyPXUuX3RyX3RhbGx5KGUsMCxlLndpbmRvd1tlLnN0cnN0YXJ0XSksZS5sb29rYWhlYWQtLSxlLnN0cnN0YXJ0KyspLHImJihOKGUsITEpLDA9PT1lLnN0cm0uYXZhaWxfb3V0KSlyZXR1cm4gQX1yZXR1cm4gZS5pbnNlcnQ9MCx0PT09Zj8oTihlLCEwKSwwPT09ZS5zdHJtLmF2YWlsX291dD9POkIpOmUubGFzdF9saXQmJihOKGUsITEpLDA9PT1lLnN0cm0uYXZhaWxfb3V0KT9BOkl9KG4sdCk6aFtuLmxldmVsXS5mdW5jKG4sdCk7aWYobyE9PU8mJm8hPT1CfHwobi5zdGF0dXM9NjY2KSxvPT09QXx8bz09PU8pcmV0dXJuIDA9PT1lLmF2YWlsX291dCYmKG4ubGFzdF9mbHVzaD0tMSksbTtpZihvPT09SSYmKDE9PT10P3UuX3RyX2FsaWduKG4pOjUhPT10JiYodS5fdHJfc3RvcmVkX2Jsb2NrKG4sMCwwLCExKSwzPT09dCYmKEQobi5oZWFkKSwwPT09bi5sb29rYWhlYWQmJihuLnN0cnN0YXJ0PTAsbi5ibG9ja19zdGFydD0wLG4uaW5zZXJ0PTApKSksRihlKSwwPT09ZS5hdmFpbF9vdXQpKXJldHVybiBuLmxhc3RfZmx1c2g9LTEsbX1yZXR1cm4gdCE9PWY/bTpuLndyYXA8PTA/MTooMj09PW4ud3JhcD8oVShuLDI1NSZlLmFkbGVyKSxVKG4sZS5hZGxlcj4+OCYyNTUpLFUobixlLmFkbGVyPj4xNiYyNTUpLFUobixlLmFkbGVyPj4yNCYyNTUpLFUobiwyNTUmZS50b3RhbF9pbiksVShuLGUudG90YWxfaW4+PjgmMjU1KSxVKG4sZS50b3RhbF9pbj4+MTYmMjU1KSxVKG4sZS50b3RhbF9pbj4+MjQmMjU1KSk6KFAobixlLmFkbGVyPj4+MTYpLFAobiw2NTUzNSZlLmFkbGVyKSksRihlKSwwPG4ud3JhcCYmKG4ud3JhcD0tbi53cmFwKSwwIT09bi5wZW5kaW5nP206MSl9LHIuZGVmbGF0ZUVuZD1mdW5jdGlvbihlKXt2YXIgdDtyZXR1cm4gZSYmZS5zdGF0ZT8odD1lLnN0YXRlLnN0YXR1cykhPT1DJiY2OSE9PXQmJjczIT09dCYmOTEhPT10JiYxMDMhPT10JiZ0IT09RSYmNjY2IT09dD9SKGUsXyk6KGUuc3RhdGU9bnVsbCx0PT09RT9SKGUsLTMpOm0pOl99LHIuZGVmbGF0ZVNldERpY3Rpb25hcnk9ZnVuY3Rpb24oZSx0KXt2YXIgcixuLGkscyxhLG8saCx1LGw9dC5sZW5ndGg7aWYoIWV8fCFlLnN0YXRlKXJldHVybiBfO2lmKDI9PT0ocz0ocj1lLnN0YXRlKS53cmFwKXx8MT09PXMmJnIuc3RhdHVzIT09Q3x8ci5sb29rYWhlYWQpcmV0dXJuIF87Zm9yKDE9PT1zJiYoZS5hZGxlcj1kKGUuYWRsZXIsdCxsLDApKSxyLndyYXA9MCxsPj1yLndfc2l6ZSYmKDA9PT1zJiYoRChyLmhlYWQpLHIuc3Ryc3RhcnQ9MCxyLmJsb2NrX3N0YXJ0PTAsci5pbnNlcnQ9MCksdT1uZXcgYy5CdWY4KHIud19zaXplKSxjLmFycmF5U2V0KHUsdCxsLXIud19zaXplLHIud19zaXplLDApLHQ9dSxsPXIud19zaXplKSxhPWUuYXZhaWxfaW4sbz1lLm5leHRfaW4saD1lLmlucHV0LGUuYXZhaWxfaW49bCxlLm5leHRfaW49MCxlLmlucHV0PXQsaihyKTtyLmxvb2thaGVhZD49eDspe2ZvcihuPXIuc3Ryc3RhcnQsaT1yLmxvb2thaGVhZC0oeC0xKTtyLmluc19oPShyLmluc19oPDxyLmhhc2hfc2hpZnReci53aW5kb3dbbit4LTFdKSZyLmhhc2hfbWFzayxyLnByZXZbbiZyLndfbWFza109ci5oZWFkW3IuaW5zX2hdLHIuaGVhZFtyLmluc19oXT1uLG4rKywtLWk7KTtyLnN0cnN0YXJ0PW4sci5sb29rYWhlYWQ9eC0xLGoocil9cmV0dXJuIHIuc3Ryc3RhcnQrPXIubG9va2FoZWFkLHIuYmxvY2tfc3RhcnQ9ci5zdHJzdGFydCxyLmluc2VydD1yLmxvb2thaGVhZCxyLmxvb2thaGVhZD0wLHIubWF0Y2hfbGVuZ3RoPXIucHJldl9sZW5ndGg9eC0xLHIubWF0Y2hfYXZhaWxhYmxlPTAsZS5uZXh0X2luPW8sZS5pbnB1dD1oLGUuYXZhaWxfaW49YSxyLndyYXA9cyxtfSxyLmRlZmxhdGVJbmZvPVwicGFrbyBkZWZsYXRlIChmcm9tIE5vZGVjYSBwcm9qZWN0KVwifSx7XCIuLi91dGlscy9jb21tb25cIjo0MSxcIi4vYWRsZXIzMlwiOjQzLFwiLi9jcmMzMlwiOjQ1LFwiLi9tZXNzYWdlc1wiOjUxLFwiLi90cmVlc1wiOjUyfV0sNDc6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt0LmV4cG9ydHM9ZnVuY3Rpb24oKXt0aGlzLnRleHQ9MCx0aGlzLnRpbWU9MCx0aGlzLnhmbGFncz0wLHRoaXMub3M9MCx0aGlzLmV4dHJhPW51bGwsdGhpcy5leHRyYV9sZW49MCx0aGlzLm5hbWU9XCJcIix0aGlzLmNvbW1lbnQ9XCJcIix0aGlzLmhjcmM9MCx0aGlzLmRvbmU9ITF9fSx7fV0sNDg6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt0LmV4cG9ydHM9ZnVuY3Rpb24oZSx0KXt2YXIgcixuLGkscyxhLG8saCx1LGwsZixjLGQscCxtLF8sZyxiLHYseSx3LGsseCxTLHosQztyPWUuc3RhdGUsbj1lLm5leHRfaW4sej1lLmlucHV0LGk9bisoZS5hdmFpbF9pbi01KSxzPWUubmV4dF9vdXQsQz1lLm91dHB1dCxhPXMtKHQtZS5hdmFpbF9vdXQpLG89cysoZS5hdmFpbF9vdXQtMjU3KSxoPXIuZG1heCx1PXIud3NpemUsbD1yLndoYXZlLGY9ci53bmV4dCxjPXIud2luZG93LGQ9ci5ob2xkLHA9ci5iaXRzLG09ci5sZW5jb2RlLF89ci5kaXN0Y29kZSxnPSgxPDxyLmxlbmJpdHMpLTEsYj0oMTw8ci5kaXN0Yml0cyktMTtlOmRve3A8MTUmJihkKz16W24rK108PHAscCs9OCxkKz16W24rK108PHAscCs9OCksdj1tW2QmZ107dDpmb3IoOzspe2lmKGQ+Pj49eT12Pj4+MjQscC09eSwwPT09KHk9dj4+PjE2JjI1NSkpQ1tzKytdPTY1NTM1JnY7ZWxzZXtpZighKDE2JnkpKXtpZigwPT0oNjQmeSkpe3Y9bVsoNjU1MzUmdikrKGQmKDE8PHkpLTEpXTtjb250aW51ZSB0fWlmKDMyJnkpe3IubW9kZT0xMjticmVhayBlfWUubXNnPVwiaW52YWxpZCBsaXRlcmFsL2xlbmd0aCBjb2RlXCIsci5tb2RlPTMwO2JyZWFrIGV9dz02NTUzNSZ2LCh5Jj0xNSkmJihwPHkmJihkKz16W24rK108PHAscCs9OCksdys9ZCYoMTw8eSktMSxkPj4+PXkscC09eSkscDwxNSYmKGQrPXpbbisrXTw8cCxwKz04LGQrPXpbbisrXTw8cCxwKz04KSx2PV9bZCZiXTtyOmZvcig7Oyl7aWYoZD4+Pj15PXY+Pj4yNCxwLT15LCEoMTYmKHk9dj4+PjE2JjI1NSkpKXtpZigwPT0oNjQmeSkpe3Y9X1soNjU1MzUmdikrKGQmKDE8PHkpLTEpXTtjb250aW51ZSByfWUubXNnPVwiaW52YWxpZCBkaXN0YW5jZSBjb2RlXCIsci5tb2RlPTMwO2JyZWFrIGV9aWYoaz02NTUzNSZ2LHA8KHkmPTE1KSYmKGQrPXpbbisrXTw8cCwocCs9OCk8eSYmKGQrPXpbbisrXTw8cCxwKz04KSksaDwoays9ZCYoMTw8eSktMSkpe2UubXNnPVwiaW52YWxpZCBkaXN0YW5jZSB0b28gZmFyIGJhY2tcIixyLm1vZGU9MzA7YnJlYWsgZX1pZihkPj4+PXkscC09eSwoeT1zLWEpPGspe2lmKGw8KHk9ay15KSYmci5zYW5lKXtlLm1zZz1cImludmFsaWQgZGlzdGFuY2UgdG9vIGZhciBiYWNrXCIsci5tb2RlPTMwO2JyZWFrIGV9aWYoUz1jLCh4PTApPT09Zil7aWYoeCs9dS15LHk8dyl7Zm9yKHctPXk7Q1tzKytdPWNbeCsrXSwtLXk7KTt4PXMtayxTPUN9fWVsc2UgaWYoZjx5KXtpZih4Kz11K2YteSwoeS09Zik8dyl7Zm9yKHctPXk7Q1tzKytdPWNbeCsrXSwtLXk7KTtpZih4PTAsZjx3KXtmb3Iody09eT1mO0NbcysrXT1jW3grK10sLS15Oyk7eD1zLWssUz1DfX19ZWxzZSBpZih4Kz1mLXkseTx3KXtmb3Iody09eTtDW3MrK109Y1t4KytdLC0teTspO3g9cy1rLFM9Q31mb3IoOzI8dzspQ1tzKytdPVNbeCsrXSxDW3MrK109U1t4KytdLENbcysrXT1TW3grK10sdy09Mzt3JiYoQ1tzKytdPVNbeCsrXSwxPHcmJihDW3MrK109U1t4KytdKSl9ZWxzZXtmb3IoeD1zLWs7Q1tzKytdPUNbeCsrXSxDW3MrK109Q1t4KytdLENbcysrXT1DW3grK10sMjwody09Myk7KTt3JiYoQ1tzKytdPUNbeCsrXSwxPHcmJihDW3MrK109Q1t4KytdKSl9YnJlYWt9fWJyZWFrfX13aGlsZShuPGkmJnM8byk7bi09dz1wPj4zLGQmPSgxPDwocC09dzw8MykpLTEsZS5uZXh0X2luPW4sZS5uZXh0X291dD1zLGUuYXZhaWxfaW49bjxpP2ktbis1OjUtKG4taSksZS5hdmFpbF9vdXQ9czxvP28tcysyNTc6MjU3LShzLW8pLHIuaG9sZD1kLHIuYml0cz1wfX0se31dLDQ5OltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7dmFyIEk9ZShcIi4uL3V0aWxzL2NvbW1vblwiKSxPPWUoXCIuL2FkbGVyMzJcIiksQj1lKFwiLi9jcmMzMlwiKSxSPWUoXCIuL2luZmZhc3RcIiksVD1lKFwiLi9pbmZ0cmVlc1wiKSxEPTEsRj0yLE49MCxVPS0yLFA9MSxuPTg1MixpPTU5MjtmdW5jdGlvbiBMKGUpe3JldHVybihlPj4+MjQmMjU1KSsoZT4+PjgmNjUyODApKygoNjUyODAmZSk8PDgpKygoMjU1JmUpPDwyNCl9ZnVuY3Rpb24gcygpe3RoaXMubW9kZT0wLHRoaXMubGFzdD0hMSx0aGlzLndyYXA9MCx0aGlzLmhhdmVkaWN0PSExLHRoaXMuZmxhZ3M9MCx0aGlzLmRtYXg9MCx0aGlzLmNoZWNrPTAsdGhpcy50b3RhbD0wLHRoaXMuaGVhZD1udWxsLHRoaXMud2JpdHM9MCx0aGlzLndzaXplPTAsdGhpcy53aGF2ZT0wLHRoaXMud25leHQ9MCx0aGlzLndpbmRvdz1udWxsLHRoaXMuaG9sZD0wLHRoaXMuYml0cz0wLHRoaXMubGVuZ3RoPTAsdGhpcy5vZmZzZXQ9MCx0aGlzLmV4dHJhPTAsdGhpcy5sZW5jb2RlPW51bGwsdGhpcy5kaXN0Y29kZT1udWxsLHRoaXMubGVuYml0cz0wLHRoaXMuZGlzdGJpdHM9MCx0aGlzLm5jb2RlPTAsdGhpcy5ubGVuPTAsdGhpcy5uZGlzdD0wLHRoaXMuaGF2ZT0wLHRoaXMubmV4dD1udWxsLHRoaXMubGVucz1uZXcgSS5CdWYxNigzMjApLHRoaXMud29yaz1uZXcgSS5CdWYxNigyODgpLHRoaXMubGVuZHluPW51bGwsdGhpcy5kaXN0ZHluPW51bGwsdGhpcy5zYW5lPTAsdGhpcy5iYWNrPTAsdGhpcy53YXM9MH1mdW5jdGlvbiBhKGUpe3ZhciB0O3JldHVybiBlJiZlLnN0YXRlPyh0PWUuc3RhdGUsZS50b3RhbF9pbj1lLnRvdGFsX291dD10LnRvdGFsPTAsZS5tc2c9XCJcIix0LndyYXAmJihlLmFkbGVyPTEmdC53cmFwKSx0Lm1vZGU9UCx0Lmxhc3Q9MCx0LmhhdmVkaWN0PTAsdC5kbWF4PTMyNzY4LHQuaGVhZD1udWxsLHQuaG9sZD0wLHQuYml0cz0wLHQubGVuY29kZT10LmxlbmR5bj1uZXcgSS5CdWYzMihuKSx0LmRpc3Rjb2RlPXQuZGlzdGR5bj1uZXcgSS5CdWYzMihpKSx0LnNhbmU9MSx0LmJhY2s9LTEsTik6VX1mdW5jdGlvbiBvKGUpe3ZhciB0O3JldHVybiBlJiZlLnN0YXRlPygodD1lLnN0YXRlKS53c2l6ZT0wLHQud2hhdmU9MCx0LnduZXh0PTAsYShlKSk6VX1mdW5jdGlvbiBoKGUsdCl7dmFyIHIsbjtyZXR1cm4gZSYmZS5zdGF0ZT8obj1lLnN0YXRlLHQ8MD8ocj0wLHQ9LXQpOihyPTErKHQ+PjQpLHQ8NDgmJih0Jj0xNSkpLHQmJih0PDh8fDE1PHQpP1U6KG51bGwhPT1uLndpbmRvdyYmbi53Yml0cyE9PXQmJihuLndpbmRvdz1udWxsKSxuLndyYXA9cixuLndiaXRzPXQsbyhlKSkpOlV9ZnVuY3Rpb24gdShlLHQpe3ZhciByLG47cmV0dXJuIGU/KG49bmV3IHMsKGUuc3RhdGU9bikud2luZG93PW51bGwsKHI9aChlLHQpKSE9PU4mJihlLnN0YXRlPW51bGwpLHIpOlV9dmFyIGwsZixjPSEwO2Z1bmN0aW9uIGooZSl7aWYoYyl7dmFyIHQ7Zm9yKGw9bmV3IEkuQnVmMzIoNTEyKSxmPW5ldyBJLkJ1ZjMyKDMyKSx0PTA7dDwxNDQ7KWUubGVuc1t0KytdPTg7Zm9yKDt0PDI1NjspZS5sZW5zW3QrK109OTtmb3IoO3Q8MjgwOyllLmxlbnNbdCsrXT03O2Zvcig7dDwyODg7KWUubGVuc1t0KytdPTg7Zm9yKFQoRCxlLmxlbnMsMCwyODgsbCwwLGUud29yayx7Yml0czo5fSksdD0wO3Q8MzI7KWUubGVuc1t0KytdPTU7VChGLGUubGVucywwLDMyLGYsMCxlLndvcmsse2JpdHM6NX0pLGM9ITF9ZS5sZW5jb2RlPWwsZS5sZW5iaXRzPTksZS5kaXN0Y29kZT1mLGUuZGlzdGJpdHM9NX1mdW5jdGlvbiBaKGUsdCxyLG4pe3ZhciBpLHM9ZS5zdGF0ZTtyZXR1cm4gbnVsbD09PXMud2luZG93JiYocy53c2l6ZT0xPDxzLndiaXRzLHMud25leHQ9MCxzLndoYXZlPTAscy53aW5kb3c9bmV3IEkuQnVmOChzLndzaXplKSksbj49cy53c2l6ZT8oSS5hcnJheVNldChzLndpbmRvdyx0LHItcy53c2l6ZSxzLndzaXplLDApLHMud25leHQ9MCxzLndoYXZlPXMud3NpemUpOihuPChpPXMud3NpemUtcy53bmV4dCkmJihpPW4pLEkuYXJyYXlTZXQocy53aW5kb3csdCxyLW4saSxzLnduZXh0KSwobi09aSk/KEkuYXJyYXlTZXQocy53aW5kb3csdCxyLW4sbiwwKSxzLnduZXh0PW4scy53aGF2ZT1zLndzaXplKToocy53bmV4dCs9aSxzLnduZXh0PT09cy53c2l6ZSYmKHMud25leHQ9MCkscy53aGF2ZTxzLndzaXplJiYocy53aGF2ZSs9aSkpKSwwfXIuaW5mbGF0ZVJlc2V0PW8sci5pbmZsYXRlUmVzZXQyPWgsci5pbmZsYXRlUmVzZXRLZWVwPWEsci5pbmZsYXRlSW5pdD1mdW5jdGlvbihlKXtyZXR1cm4gdShlLDE1KX0sci5pbmZsYXRlSW5pdDI9dSxyLmluZmxhdGU9ZnVuY3Rpb24oZSx0KXt2YXIgcixuLGkscyxhLG8saCx1LGwsZixjLGQscCxtLF8sZyxiLHYseSx3LGsseCxTLHosQz0wLEU9bmV3IEkuQnVmOCg0KSxBPVsxNiwxNywxOCwwLDgsNyw5LDYsMTAsNSwxMSw0LDEyLDMsMTMsMiwxNCwxLDE1XTtpZighZXx8IWUuc3RhdGV8fCFlLm91dHB1dHx8IWUuaW5wdXQmJjAhPT1lLmF2YWlsX2luKXJldHVybiBVOzEyPT09KHI9ZS5zdGF0ZSkubW9kZSYmKHIubW9kZT0xMyksYT1lLm5leHRfb3V0LGk9ZS5vdXRwdXQsaD1lLmF2YWlsX291dCxzPWUubmV4dF9pbixuPWUuaW5wdXQsbz1lLmF2YWlsX2luLHU9ci5ob2xkLGw9ci5iaXRzLGY9byxjPWgseD1OO2U6Zm9yKDs7KXN3aXRjaChyLm1vZGUpe2Nhc2UgUDppZigwPT09ci53cmFwKXtyLm1vZGU9MTM7YnJlYWt9Zm9yKDtsPDE2Oyl7aWYoMD09PW8pYnJlYWsgZTtvLS0sdSs9bltzKytdPDxsLGwrPTh9aWYoMiZyLndyYXAmJjM1NjE1PT09dSl7RVtyLmNoZWNrPTBdPTI1NSZ1LEVbMV09dT4+PjgmMjU1LHIuY2hlY2s9QihyLmNoZWNrLEUsMiwwKSxsPXU9MCxyLm1vZGU9MjticmVha31pZihyLmZsYWdzPTAsci5oZWFkJiYoci5oZWFkLmRvbmU9ITEpLCEoMSZyLndyYXApfHwoKCgyNTUmdSk8PDgpKyh1Pj44KSklMzEpe2UubXNnPVwiaW5jb3JyZWN0IGhlYWRlciBjaGVja1wiLHIubW9kZT0zMDticmVha31pZig4IT0oMTUmdSkpe2UubXNnPVwidW5rbm93biBjb21wcmVzc2lvbiBtZXRob2RcIixyLm1vZGU9MzA7YnJlYWt9aWYobC09NCxrPTgrKDE1Jih1Pj4+PTQpKSwwPT09ci53Yml0cylyLndiaXRzPWs7ZWxzZSBpZihrPnIud2JpdHMpe2UubXNnPVwiaW52YWxpZCB3aW5kb3cgc2l6ZVwiLHIubW9kZT0zMDticmVha31yLmRtYXg9MTw8ayxlLmFkbGVyPXIuY2hlY2s9MSxyLm1vZGU9NTEyJnU/MTA6MTIsbD11PTA7YnJlYWs7Y2FzZSAyOmZvcig7bDwxNjspe2lmKDA9PT1vKWJyZWFrIGU7by0tLHUrPW5bcysrXTw8bCxsKz04fWlmKHIuZmxhZ3M9dSw4IT0oMjU1JnIuZmxhZ3MpKXtlLm1zZz1cInVua25vd24gY29tcHJlc3Npb24gbWV0aG9kXCIsci5tb2RlPTMwO2JyZWFrfWlmKDU3MzQ0JnIuZmxhZ3Mpe2UubXNnPVwidW5rbm93biBoZWFkZXIgZmxhZ3Mgc2V0XCIsci5tb2RlPTMwO2JyZWFrfXIuaGVhZCYmKHIuaGVhZC50ZXh0PXU+PjgmMSksNTEyJnIuZmxhZ3MmJihFWzBdPTI1NSZ1LEVbMV09dT4+PjgmMjU1LHIuY2hlY2s9QihyLmNoZWNrLEUsMiwwKSksbD11PTAsci5tb2RlPTM7Y2FzZSAzOmZvcig7bDwzMjspe2lmKDA9PT1vKWJyZWFrIGU7by0tLHUrPW5bcysrXTw8bCxsKz04fXIuaGVhZCYmKHIuaGVhZC50aW1lPXUpLDUxMiZyLmZsYWdzJiYoRVswXT0yNTUmdSxFWzFdPXU+Pj44JjI1NSxFWzJdPXU+Pj4xNiYyNTUsRVszXT11Pj4+MjQmMjU1LHIuY2hlY2s9QihyLmNoZWNrLEUsNCwwKSksbD11PTAsci5tb2RlPTQ7Y2FzZSA0OmZvcig7bDwxNjspe2lmKDA9PT1vKWJyZWFrIGU7by0tLHUrPW5bcysrXTw8bCxsKz04fXIuaGVhZCYmKHIuaGVhZC54ZmxhZ3M9MjU1JnUsci5oZWFkLm9zPXU+PjgpLDUxMiZyLmZsYWdzJiYoRVswXT0yNTUmdSxFWzFdPXU+Pj44JjI1NSxyLmNoZWNrPUIoci5jaGVjayxFLDIsMCkpLGw9dT0wLHIubW9kZT01O2Nhc2UgNTppZigxMDI0JnIuZmxhZ3Mpe2Zvcig7bDwxNjspe2lmKDA9PT1vKWJyZWFrIGU7by0tLHUrPW5bcysrXTw8bCxsKz04fXIubGVuZ3RoPXUsci5oZWFkJiYoci5oZWFkLmV4dHJhX2xlbj11KSw1MTImci5mbGFncyYmKEVbMF09MjU1JnUsRVsxXT11Pj4+OCYyNTUsci5jaGVjaz1CKHIuY2hlY2ssRSwyLDApKSxsPXU9MH1lbHNlIHIuaGVhZCYmKHIuaGVhZC5leHRyYT1udWxsKTtyLm1vZGU9NjtjYXNlIDY6aWYoMTAyNCZyLmZsYWdzJiYobzwoZD1yLmxlbmd0aCkmJihkPW8pLGQmJihyLmhlYWQmJihrPXIuaGVhZC5leHRyYV9sZW4tci5sZW5ndGgsci5oZWFkLmV4dHJhfHwoci5oZWFkLmV4dHJhPW5ldyBBcnJheShyLmhlYWQuZXh0cmFfbGVuKSksSS5hcnJheVNldChyLmhlYWQuZXh0cmEsbixzLGQsaykpLDUxMiZyLmZsYWdzJiYoci5jaGVjaz1CKHIuY2hlY2ssbixkLHMpKSxvLT1kLHMrPWQsci5sZW5ndGgtPWQpLHIubGVuZ3RoKSlicmVhayBlO3IubGVuZ3RoPTAsci5tb2RlPTc7Y2FzZSA3OmlmKDIwNDgmci5mbGFncyl7aWYoMD09PW8pYnJlYWsgZTtmb3IoZD0wO2s9bltzK2QrK10sci5oZWFkJiZrJiZyLmxlbmd0aDw2NTUzNiYmKHIuaGVhZC5uYW1lKz1TdHJpbmcuZnJvbUNoYXJDb2RlKGspKSxrJiZkPG87KTtpZig1MTImci5mbGFncyYmKHIuY2hlY2s9QihyLmNoZWNrLG4sZCxzKSksby09ZCxzKz1kLGspYnJlYWsgZX1lbHNlIHIuaGVhZCYmKHIuaGVhZC5uYW1lPW51bGwpO3IubGVuZ3RoPTAsci5tb2RlPTg7Y2FzZSA4OmlmKDQwOTYmci5mbGFncyl7aWYoMD09PW8pYnJlYWsgZTtmb3IoZD0wO2s9bltzK2QrK10sci5oZWFkJiZrJiZyLmxlbmd0aDw2NTUzNiYmKHIuaGVhZC5jb21tZW50Kz1TdHJpbmcuZnJvbUNoYXJDb2RlKGspKSxrJiZkPG87KTtpZig1MTImci5mbGFncyYmKHIuY2hlY2s9QihyLmNoZWNrLG4sZCxzKSksby09ZCxzKz1kLGspYnJlYWsgZX1lbHNlIHIuaGVhZCYmKHIuaGVhZC5jb21tZW50PW51bGwpO3IubW9kZT05O2Nhc2UgOTppZig1MTImci5mbGFncyl7Zm9yKDtsPDE2Oyl7aWYoMD09PW8pYnJlYWsgZTtvLS0sdSs9bltzKytdPDxsLGwrPTh9aWYodSE9PSg2NTUzNSZyLmNoZWNrKSl7ZS5tc2c9XCJoZWFkZXIgY3JjIG1pc21hdGNoXCIsci5tb2RlPTMwO2JyZWFrfWw9dT0wfXIuaGVhZCYmKHIuaGVhZC5oY3JjPXIuZmxhZ3M+PjkmMSxyLmhlYWQuZG9uZT0hMCksZS5hZGxlcj1yLmNoZWNrPTAsci5tb2RlPTEyO2JyZWFrO2Nhc2UgMTA6Zm9yKDtsPDMyOyl7aWYoMD09PW8pYnJlYWsgZTtvLS0sdSs9bltzKytdPDxsLGwrPTh9ZS5hZGxlcj1yLmNoZWNrPUwodSksbD11PTAsci5tb2RlPTExO2Nhc2UgMTE6aWYoMD09PXIuaGF2ZWRpY3QpcmV0dXJuIGUubmV4dF9vdXQ9YSxlLmF2YWlsX291dD1oLGUubmV4dF9pbj1zLGUuYXZhaWxfaW49byxyLmhvbGQ9dSxyLmJpdHM9bCwyO2UuYWRsZXI9ci5jaGVjaz0xLHIubW9kZT0xMjtjYXNlIDEyOmlmKDU9PT10fHw2PT09dClicmVhayBlO2Nhc2UgMTM6aWYoci5sYXN0KXt1Pj4+PTcmbCxsLT03Jmwsci5tb2RlPTI3O2JyZWFrfWZvcig7bDwzOyl7aWYoMD09PW8pYnJlYWsgZTtvLS0sdSs9bltzKytdPDxsLGwrPTh9c3dpdGNoKHIubGFzdD0xJnUsbC09MSwzJih1Pj4+PTEpKXtjYXNlIDA6ci5tb2RlPTE0O2JyZWFrO2Nhc2UgMTppZihqKHIpLHIubW9kZT0yMCw2IT09dClicmVhazt1Pj4+PTIsbC09MjticmVhayBlO2Nhc2UgMjpyLm1vZGU9MTc7YnJlYWs7Y2FzZSAzOmUubXNnPVwiaW52YWxpZCBibG9jayB0eXBlXCIsci5tb2RlPTMwfXU+Pj49MixsLT0yO2JyZWFrO2Nhc2UgMTQ6Zm9yKHU+Pj49NyZsLGwtPTcmbDtsPDMyOyl7aWYoMD09PW8pYnJlYWsgZTtvLS0sdSs9bltzKytdPDxsLGwrPTh9aWYoKDY1NTM1JnUpIT0odT4+PjE2XjY1NTM1KSl7ZS5tc2c9XCJpbnZhbGlkIHN0b3JlZCBibG9jayBsZW5ndGhzXCIsci5tb2RlPTMwO2JyZWFrfWlmKHIubGVuZ3RoPTY1NTM1JnUsbD11PTAsci5tb2RlPTE1LDY9PT10KWJyZWFrIGU7Y2FzZSAxNTpyLm1vZGU9MTY7Y2FzZSAxNjppZihkPXIubGVuZ3RoKXtpZihvPGQmJihkPW8pLGg8ZCYmKGQ9aCksMD09PWQpYnJlYWsgZTtJLmFycmF5U2V0KGksbixzLGQsYSksby09ZCxzKz1kLGgtPWQsYSs9ZCxyLmxlbmd0aC09ZDticmVha31yLm1vZGU9MTI7YnJlYWs7Y2FzZSAxNzpmb3IoO2w8MTQ7KXtpZigwPT09bylicmVhayBlO28tLSx1Kz1uW3MrK108PGwsbCs9OH1pZihyLm5sZW49MjU3KygzMSZ1KSx1Pj4+PTUsbC09NSxyLm5kaXN0PTErKDMxJnUpLHU+Pj49NSxsLT01LHIubmNvZGU9NCsoMTUmdSksdT4+Pj00LGwtPTQsMjg2PHIubmxlbnx8MzA8ci5uZGlzdCl7ZS5tc2c9XCJ0b28gbWFueSBsZW5ndGggb3IgZGlzdGFuY2Ugc3ltYm9sc1wiLHIubW9kZT0zMDticmVha31yLmhhdmU9MCxyLm1vZGU9MTg7Y2FzZSAxODpmb3IoO3IuaGF2ZTxyLm5jb2RlOyl7Zm9yKDtsPDM7KXtpZigwPT09bylicmVhayBlO28tLSx1Kz1uW3MrK108PGwsbCs9OH1yLmxlbnNbQVtyLmhhdmUrK11dPTcmdSx1Pj4+PTMsbC09M31mb3IoO3IuaGF2ZTwxOTspci5sZW5zW0Fbci5oYXZlKytdXT0wO2lmKHIubGVuY29kZT1yLmxlbmR5bixyLmxlbmJpdHM9NyxTPXtiaXRzOnIubGVuYml0c30seD1UKDAsci5sZW5zLDAsMTksci5sZW5jb2RlLDAsci53b3JrLFMpLHIubGVuYml0cz1TLmJpdHMseCl7ZS5tc2c9XCJpbnZhbGlkIGNvZGUgbGVuZ3RocyBzZXRcIixyLm1vZGU9MzA7YnJlYWt9ci5oYXZlPTAsci5tb2RlPTE5O2Nhc2UgMTk6Zm9yKDtyLmhhdmU8ci5ubGVuK3IubmRpc3Q7KXtmb3IoO2c9KEM9ci5sZW5jb2RlW3UmKDE8PHIubGVuYml0cyktMV0pPj4+MTYmMjU1LGI9NjU1MzUmQywhKChfPUM+Pj4yNCk8PWwpOyl7aWYoMD09PW8pYnJlYWsgZTtvLS0sdSs9bltzKytdPDxsLGwrPTh9aWYoYjwxNil1Pj4+PV8sbC09XyxyLmxlbnNbci5oYXZlKytdPWI7ZWxzZXtpZigxNj09PWIpe2Zvcih6PV8rMjtsPHo7KXtpZigwPT09bylicmVhayBlO28tLSx1Kz1uW3MrK108PGwsbCs9OH1pZih1Pj4+PV8sbC09XywwPT09ci5oYXZlKXtlLm1zZz1cImludmFsaWQgYml0IGxlbmd0aCByZXBlYXRcIixyLm1vZGU9MzA7YnJlYWt9az1yLmxlbnNbci5oYXZlLTFdLGQ9MysoMyZ1KSx1Pj4+PTIsbC09Mn1lbHNlIGlmKDE3PT09Yil7Zm9yKHo9XyszO2w8ejspe2lmKDA9PT1vKWJyZWFrIGU7by0tLHUrPW5bcysrXTw8bCxsKz04fWwtPV8saz0wLGQ9MysoNyYodT4+Pj1fKSksdT4+Pj0zLGwtPTN9ZWxzZXtmb3Ioej1fKzc7bDx6Oyl7aWYoMD09PW8pYnJlYWsgZTtvLS0sdSs9bltzKytdPDxsLGwrPTh9bC09XyxrPTAsZD0xMSsoMTI3Jih1Pj4+PV8pKSx1Pj4+PTcsbC09N31pZihyLmhhdmUrZD5yLm5sZW4rci5uZGlzdCl7ZS5tc2c9XCJpbnZhbGlkIGJpdCBsZW5ndGggcmVwZWF0XCIsci5tb2RlPTMwO2JyZWFrfWZvcig7ZC0tOylyLmxlbnNbci5oYXZlKytdPWt9fWlmKDMwPT09ci5tb2RlKWJyZWFrO2lmKDA9PT1yLmxlbnNbMjU2XSl7ZS5tc2c9XCJpbnZhbGlkIGNvZGUgLS0gbWlzc2luZyBlbmQtb2YtYmxvY2tcIixyLm1vZGU9MzA7YnJlYWt9aWYoci5sZW5iaXRzPTksUz17Yml0czpyLmxlbmJpdHN9LHg9VChELHIubGVucywwLHIubmxlbixyLmxlbmNvZGUsMCxyLndvcmssUyksci5sZW5iaXRzPVMuYml0cyx4KXtlLm1zZz1cImludmFsaWQgbGl0ZXJhbC9sZW5ndGhzIHNldFwiLHIubW9kZT0zMDticmVha31pZihyLmRpc3RiaXRzPTYsci5kaXN0Y29kZT1yLmRpc3RkeW4sUz17Yml0czpyLmRpc3RiaXRzfSx4PVQoRixyLmxlbnMsci5ubGVuLHIubmRpc3Qsci5kaXN0Y29kZSwwLHIud29yayxTKSxyLmRpc3RiaXRzPVMuYml0cyx4KXtlLm1zZz1cImludmFsaWQgZGlzdGFuY2VzIHNldFwiLHIubW9kZT0zMDticmVha31pZihyLm1vZGU9MjAsNj09PXQpYnJlYWsgZTtjYXNlIDIwOnIubW9kZT0yMTtjYXNlIDIxOmlmKDY8PW8mJjI1ODw9aCl7ZS5uZXh0X291dD1hLGUuYXZhaWxfb3V0PWgsZS5uZXh0X2luPXMsZS5hdmFpbF9pbj1vLHIuaG9sZD11LHIuYml0cz1sLFIoZSxjKSxhPWUubmV4dF9vdXQsaT1lLm91dHB1dCxoPWUuYXZhaWxfb3V0LHM9ZS5uZXh0X2luLG49ZS5pbnB1dCxvPWUuYXZhaWxfaW4sdT1yLmhvbGQsbD1yLmJpdHMsMTI9PT1yLm1vZGUmJihyLmJhY2s9LTEpO2JyZWFrfWZvcihyLmJhY2s9MDtnPShDPXIubGVuY29kZVt1JigxPDxyLmxlbmJpdHMpLTFdKT4+PjE2JjI1NSxiPTY1NTM1JkMsISgoXz1DPj4+MjQpPD1sKTspe2lmKDA9PT1vKWJyZWFrIGU7by0tLHUrPW5bcysrXTw8bCxsKz04fWlmKGcmJjA9PSgyNDAmZykpe2Zvcih2PV8seT1nLHc9YjtnPShDPXIubGVuY29kZVt3KygodSYoMTw8dit5KS0xKT4+dildKT4+PjE2JjI1NSxiPTY1NTM1JkMsISh2KyhfPUM+Pj4yNCk8PWwpOyl7aWYoMD09PW8pYnJlYWsgZTtvLS0sdSs9bltzKytdPDxsLGwrPTh9dT4+Pj12LGwtPXYsci5iYWNrKz12fWlmKHU+Pj49XyxsLT1fLHIuYmFjays9XyxyLmxlbmd0aD1iLDA9PT1nKXtyLm1vZGU9MjY7YnJlYWt9aWYoMzImZyl7ci5iYWNrPS0xLHIubW9kZT0xMjticmVha31pZig2NCZnKXtlLm1zZz1cImludmFsaWQgbGl0ZXJhbC9sZW5ndGggY29kZVwiLHIubW9kZT0zMDticmVha31yLmV4dHJhPTE1Jmcsci5tb2RlPTIyO2Nhc2UgMjI6aWYoci5leHRyYSl7Zm9yKHo9ci5leHRyYTtsPHo7KXtpZigwPT09bylicmVhayBlO28tLSx1Kz1uW3MrK108PGwsbCs9OH1yLmxlbmd0aCs9dSYoMTw8ci5leHRyYSktMSx1Pj4+PXIuZXh0cmEsbC09ci5leHRyYSxyLmJhY2srPXIuZXh0cmF9ci53YXM9ci5sZW5ndGgsci5tb2RlPTIzO2Nhc2UgMjM6Zm9yKDtnPShDPXIuZGlzdGNvZGVbdSYoMTw8ci5kaXN0Yml0cyktMV0pPj4+MTYmMjU1LGI9NjU1MzUmQywhKChfPUM+Pj4yNCk8PWwpOyl7aWYoMD09PW8pYnJlYWsgZTtvLS0sdSs9bltzKytdPDxsLGwrPTh9aWYoMD09KDI0MCZnKSl7Zm9yKHY9Xyx5PWcsdz1iO2c9KEM9ci5kaXN0Y29kZVt3KygodSYoMTw8dit5KS0xKT4+dildKT4+PjE2JjI1NSxiPTY1NTM1JkMsISh2KyhfPUM+Pj4yNCk8PWwpOyl7aWYoMD09PW8pYnJlYWsgZTtvLS0sdSs9bltzKytdPDxsLGwrPTh9dT4+Pj12LGwtPXYsci5iYWNrKz12fWlmKHU+Pj49XyxsLT1fLHIuYmFjays9Xyw2NCZnKXtlLm1zZz1cImludmFsaWQgZGlzdGFuY2UgY29kZVwiLHIubW9kZT0zMDticmVha31yLm9mZnNldD1iLHIuZXh0cmE9MTUmZyxyLm1vZGU9MjQ7Y2FzZSAyNDppZihyLmV4dHJhKXtmb3Ioej1yLmV4dHJhO2w8ejspe2lmKDA9PT1vKWJyZWFrIGU7by0tLHUrPW5bcysrXTw8bCxsKz04fXIub2Zmc2V0Kz11JigxPDxyLmV4dHJhKS0xLHU+Pj49ci5leHRyYSxsLT1yLmV4dHJhLHIuYmFjays9ci5leHRyYX1pZihyLm9mZnNldD5yLmRtYXgpe2UubXNnPVwiaW52YWxpZCBkaXN0YW5jZSB0b28gZmFyIGJhY2tcIixyLm1vZGU9MzA7YnJlYWt9ci5tb2RlPTI1O2Nhc2UgMjU6aWYoMD09PWgpYnJlYWsgZTtpZihkPWMtaCxyLm9mZnNldD5kKXtpZigoZD1yLm9mZnNldC1kKT5yLndoYXZlJiZyLnNhbmUpe2UubXNnPVwiaW52YWxpZCBkaXN0YW5jZSB0b28gZmFyIGJhY2tcIixyLm1vZGU9MzA7YnJlYWt9cD1kPnIud25leHQ/KGQtPXIud25leHQsci53c2l6ZS1kKTpyLnduZXh0LWQsZD5yLmxlbmd0aCYmKGQ9ci5sZW5ndGgpLG09ci53aW5kb3d9ZWxzZSBtPWkscD1hLXIub2Zmc2V0LGQ9ci5sZW5ndGg7Zm9yKGg8ZCYmKGQ9aCksaC09ZCxyLmxlbmd0aC09ZDtpW2ErK109bVtwKytdLC0tZDspOzA9PT1yLmxlbmd0aCYmKHIubW9kZT0yMSk7YnJlYWs7Y2FzZSAyNjppZigwPT09aClicmVhayBlO2lbYSsrXT1yLmxlbmd0aCxoLS0sci5tb2RlPTIxO2JyZWFrO2Nhc2UgMjc6aWYoci53cmFwKXtmb3IoO2w8MzI7KXtpZigwPT09bylicmVhayBlO28tLSx1fD1uW3MrK108PGwsbCs9OH1pZihjLT1oLGUudG90YWxfb3V0Kz1jLHIudG90YWwrPWMsYyYmKGUuYWRsZXI9ci5jaGVjaz1yLmZsYWdzP0Ioci5jaGVjayxpLGMsYS1jKTpPKHIuY2hlY2ssaSxjLGEtYykpLGM9aCwoci5mbGFncz91OkwodSkpIT09ci5jaGVjayl7ZS5tc2c9XCJpbmNvcnJlY3QgZGF0YSBjaGVja1wiLHIubW9kZT0zMDticmVha31sPXU9MH1yLm1vZGU9Mjg7Y2FzZSAyODppZihyLndyYXAmJnIuZmxhZ3Mpe2Zvcig7bDwzMjspe2lmKDA9PT1vKWJyZWFrIGU7by0tLHUrPW5bcysrXTw8bCxsKz04fWlmKHUhPT0oNDI5NDk2NzI5NSZyLnRvdGFsKSl7ZS5tc2c9XCJpbmNvcnJlY3QgbGVuZ3RoIGNoZWNrXCIsci5tb2RlPTMwO2JyZWFrfWw9dT0wfXIubW9kZT0yOTtjYXNlIDI5Ong9MTticmVhayBlO2Nhc2UgMzA6eD0tMzticmVhayBlO2Nhc2UgMzE6cmV0dXJuLTQ7Y2FzZSAzMjpkZWZhdWx0OnJldHVybiBVfXJldHVybiBlLm5leHRfb3V0PWEsZS5hdmFpbF9vdXQ9aCxlLm5leHRfaW49cyxlLmF2YWlsX2luPW8sci5ob2xkPXUsci5iaXRzPWwsKHIud3NpemV8fGMhPT1lLmF2YWlsX291dCYmci5tb2RlPDMwJiYoci5tb2RlPDI3fHw0IT09dCkpJiZaKGUsZS5vdXRwdXQsZS5uZXh0X291dCxjLWUuYXZhaWxfb3V0KT8oci5tb2RlPTMxLC00KTooZi09ZS5hdmFpbF9pbixjLT1lLmF2YWlsX291dCxlLnRvdGFsX2luKz1mLGUudG90YWxfb3V0Kz1jLHIudG90YWwrPWMsci53cmFwJiZjJiYoZS5hZGxlcj1yLmNoZWNrPXIuZmxhZ3M/QihyLmNoZWNrLGksYyxlLm5leHRfb3V0LWMpOk8oci5jaGVjayxpLGMsZS5uZXh0X291dC1jKSksZS5kYXRhX3R5cGU9ci5iaXRzKyhyLmxhc3Q/NjQ6MCkrKDEyPT09ci5tb2RlPzEyODowKSsoMjA9PT1yLm1vZGV8fDE1PT09ci5tb2RlPzI1NjowKSwoMD09ZiYmMD09PWN8fDQ9PT10KSYmeD09PU4mJih4PS01KSx4KX0sci5pbmZsYXRlRW5kPWZ1bmN0aW9uKGUpe2lmKCFlfHwhZS5zdGF0ZSlyZXR1cm4gVTt2YXIgdD1lLnN0YXRlO3JldHVybiB0LndpbmRvdyYmKHQud2luZG93PW51bGwpLGUuc3RhdGU9bnVsbCxOfSxyLmluZmxhdGVHZXRIZWFkZXI9ZnVuY3Rpb24oZSx0KXt2YXIgcjtyZXR1cm4gZSYmZS5zdGF0ZT8wPT0oMiYocj1lLnN0YXRlKS53cmFwKT9VOigoci5oZWFkPXQpLmRvbmU9ITEsTik6VX0sci5pbmZsYXRlU2V0RGljdGlvbmFyeT1mdW5jdGlvbihlLHQpe3ZhciByLG49dC5sZW5ndGg7cmV0dXJuIGUmJmUuc3RhdGU/MCE9PShyPWUuc3RhdGUpLndyYXAmJjExIT09ci5tb2RlP1U6MTE9PT1yLm1vZGUmJk8oMSx0LG4sMCkhPT1yLmNoZWNrPy0zOlooZSx0LG4sbik/KHIubW9kZT0zMSwtNCk6KHIuaGF2ZWRpY3Q9MSxOKTpVfSxyLmluZmxhdGVJbmZvPVwicGFrbyBpbmZsYXRlIChmcm9tIE5vZGVjYSBwcm9qZWN0KVwifSx7XCIuLi91dGlscy9jb21tb25cIjo0MSxcIi4vYWRsZXIzMlwiOjQzLFwiLi9jcmMzMlwiOjQ1LFwiLi9pbmZmYXN0XCI6NDgsXCIuL2luZnRyZWVzXCI6NTB9XSw1MDpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3ZhciBEPWUoXCIuLi91dGlscy9jb21tb25cIiksRj1bMyw0LDUsNiw3LDgsOSwxMCwxMSwxMywxNSwxNywxOSwyMywyNywzMSwzNSw0Myw1MSw1OSw2Nyw4Myw5OSwxMTUsMTMxLDE2MywxOTUsMjI3LDI1OCwwLDBdLE49WzE2LDE2LDE2LDE2LDE2LDE2LDE2LDE2LDE3LDE3LDE3LDE3LDE4LDE4LDE4LDE4LDE5LDE5LDE5LDE5LDIwLDIwLDIwLDIwLDIxLDIxLDIxLDIxLDE2LDcyLDc4XSxVPVsxLDIsMyw0LDUsNyw5LDEzLDE3LDI1LDMzLDQ5LDY1LDk3LDEyOSwxOTMsMjU3LDM4NSw1MTMsNzY5LDEwMjUsMTUzNywyMDQ5LDMwNzMsNDA5Nyw2MTQ1LDgxOTMsMTIyODksMTYzODUsMjQ1NzcsMCwwXSxQPVsxNiwxNiwxNiwxNiwxNywxNywxOCwxOCwxOSwxOSwyMCwyMCwyMSwyMSwyMiwyMiwyMywyMywyNCwyNCwyNSwyNSwyNiwyNiwyNywyNywyOCwyOCwyOSwyOSw2NCw2NF07dC5leHBvcnRzPWZ1bmN0aW9uKGUsdCxyLG4saSxzLGEsbyl7dmFyIGgsdSxsLGYsYyxkLHAsbSxfLGc9by5iaXRzLGI9MCx2PTAseT0wLHc9MCxrPTAseD0wLFM9MCx6PTAsQz0wLEU9MCxBPW51bGwsST0wLE89bmV3IEQuQnVmMTYoMTYpLEI9bmV3IEQuQnVmMTYoMTYpLFI9bnVsbCxUPTA7Zm9yKGI9MDtiPD0xNTtiKyspT1tiXT0wO2Zvcih2PTA7djxuO3YrKylPW3Rbcit2XV0rKztmb3Ioaz1nLHc9MTU7MTw9dyYmMD09PU9bd107dy0tKTtpZih3PGsmJihrPXcpLDA9PT13KXJldHVybiBpW3MrK109MjA5NzE1MjAsaVtzKytdPTIwOTcxNTIwLG8uYml0cz0xLDA7Zm9yKHk9MTt5PHcmJjA9PT1PW3ldO3krKyk7Zm9yKGs8eSYmKGs9eSksYj16PTE7Yjw9MTU7YisrKWlmKHo8PD0xLCh6LT1PW2JdKTwwKXJldHVybi0xO2lmKDA8eiYmKDA9PT1lfHwxIT09dykpcmV0dXJuLTE7Zm9yKEJbMV09MCxiPTE7YjwxNTtiKyspQltiKzFdPUJbYl0rT1tiXTtmb3Iodj0wO3Y8bjt2KyspMCE9PXRbcit2XSYmKGFbQlt0W3Irdl1dKytdPXYpO2lmKGQ9MD09PWU/KEE9Uj1hLDE5KToxPT09ZT8oQT1GLEktPTI1NyxSPU4sVC09MjU3LDI1Nik6KEE9VSxSPVAsLTEpLGI9eSxjPXMsUz12PUU9MCxsPS0xLGY9KEM9MTw8KHg9aykpLTEsMT09PWUmJjg1MjxDfHwyPT09ZSYmNTkyPEMpcmV0dXJuIDE7Zm9yKDs7KXtmb3IocD1iLVMsXz1hW3ZdPGQ/KG09MCxhW3ZdKTphW3ZdPmQ/KG09UltUK2Fbdl1dLEFbSSthW3ZdXSk6KG09OTYsMCksaD0xPDxiLVMseT11PTE8PHg7aVtjKyhFPj5TKSsodS09aCldPXA8PDI0fG08PDE2fF98MCwwIT09dTspO2ZvcihoPTE8PGItMTtFJmg7KWg+Pj0xO2lmKDAhPT1oPyhFJj1oLTEsRSs9aCk6RT0wLHYrKywwPT0tLU9bYl0pe2lmKGI9PT13KWJyZWFrO2I9dFtyK2Fbdl1dfWlmKGs8YiYmKEUmZikhPT1sKXtmb3IoMD09PVMmJihTPWspLGMrPXksej0xPDwoeD1iLVMpO3grUzx3JiYhKCh6LT1PW3grU10pPD0wKTspeCsrLHo8PD0xO2lmKEMrPTE8PHgsMT09PWUmJjg1MjxDfHwyPT09ZSYmNTkyPEMpcmV0dXJuIDE7aVtsPUUmZl09azw8MjR8eDw8MTZ8Yy1zfDB9fXJldHVybiAwIT09RSYmKGlbYytFXT1iLVM8PDI0fDY0PDwxNnwwKSxvLmJpdHM9aywwfX0se1wiLi4vdXRpbHMvY29tbW9uXCI6NDF9XSw1MTpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3QuZXhwb3J0cz17MjpcIm5lZWQgZGljdGlvbmFyeVwiLDE6XCJzdHJlYW0gZW5kXCIsMDpcIlwiLFwiLTFcIjpcImZpbGUgZXJyb3JcIixcIi0yXCI6XCJzdHJlYW0gZXJyb3JcIixcIi0zXCI6XCJkYXRhIGVycm9yXCIsXCItNFwiOlwiaW5zdWZmaWNpZW50IG1lbW9yeVwiLFwiLTVcIjpcImJ1ZmZlciBlcnJvclwiLFwiLTZcIjpcImluY29tcGF0aWJsZSB2ZXJzaW9uXCJ9fSx7fV0sNTI6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt2YXIgaT1lKFwiLi4vdXRpbHMvY29tbW9uXCIpLG89MCxoPTE7ZnVuY3Rpb24gbihlKXtmb3IodmFyIHQ9ZS5sZW5ndGg7MDw9LS10OyllW3RdPTB9dmFyIHM9MCxhPTI5LHU9MjU2LGw9dSsxK2EsZj0zMCxjPTE5LF89MipsKzEsZz0xNSxkPTE2LHA9NyxtPTI1NixiPTE2LHY9MTcseT0xOCx3PVswLDAsMCwwLDAsMCwwLDAsMSwxLDEsMSwyLDIsMiwyLDMsMywzLDMsNCw0LDQsNCw1LDUsNSw1LDBdLGs9WzAsMCwwLDAsMSwxLDIsMiwzLDMsNCw0LDUsNSw2LDYsNyw3LDgsOCw5LDksMTAsMTAsMTEsMTEsMTIsMTIsMTMsMTNdLHg9WzAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMiwzLDddLFM9WzE2LDE3LDE4LDAsOCw3LDksNiwxMCw1LDExLDQsMTIsMywxMywyLDE0LDEsMTVdLHo9bmV3IEFycmF5KDIqKGwrMikpO24oeik7dmFyIEM9bmV3IEFycmF5KDIqZik7bihDKTt2YXIgRT1uZXcgQXJyYXkoNTEyKTtuKEUpO3ZhciBBPW5ldyBBcnJheSgyNTYpO24oQSk7dmFyIEk9bmV3IEFycmF5KGEpO24oSSk7dmFyIE8sQixSLFQ9bmV3IEFycmF5KGYpO2Z1bmN0aW9uIEQoZSx0LHIsbixpKXt0aGlzLnN0YXRpY190cmVlPWUsdGhpcy5leHRyYV9iaXRzPXQsdGhpcy5leHRyYV9iYXNlPXIsdGhpcy5lbGVtcz1uLHRoaXMubWF4X2xlbmd0aD1pLHRoaXMuaGFzX3N0cmVlPWUmJmUubGVuZ3RofWZ1bmN0aW9uIEYoZSx0KXt0aGlzLmR5bl90cmVlPWUsdGhpcy5tYXhfY29kZT0wLHRoaXMuc3RhdF9kZXNjPXR9ZnVuY3Rpb24gTihlKXtyZXR1cm4gZTwyNTY/RVtlXTpFWzI1NisoZT4+PjcpXX1mdW5jdGlvbiBVKGUsdCl7ZS5wZW5kaW5nX2J1ZltlLnBlbmRpbmcrK109MjU1JnQsZS5wZW5kaW5nX2J1ZltlLnBlbmRpbmcrK109dD4+PjgmMjU1fWZ1bmN0aW9uIFAoZSx0LHIpe2UuYmlfdmFsaWQ+ZC1yPyhlLmJpX2J1Znw9dDw8ZS5iaV92YWxpZCY2NTUzNSxVKGUsZS5iaV9idWYpLGUuYmlfYnVmPXQ+PmQtZS5iaV92YWxpZCxlLmJpX3ZhbGlkKz1yLWQpOihlLmJpX2J1Znw9dDw8ZS5iaV92YWxpZCY2NTUzNSxlLmJpX3ZhbGlkKz1yKX1mdW5jdGlvbiBMKGUsdCxyKXtQKGUsclsyKnRdLHJbMip0KzFdKX1mdW5jdGlvbiBqKGUsdCl7Zm9yKHZhciByPTA7cnw9MSZlLGU+Pj49MSxyPDw9MSwwPC0tdDspO3JldHVybiByPj4+MX1mdW5jdGlvbiBaKGUsdCxyKXt2YXIgbixpLHM9bmV3IEFycmF5KGcrMSksYT0wO2ZvcihuPTE7bjw9ZztuKyspc1tuXT1hPWErcltuLTFdPDwxO2ZvcihpPTA7aTw9dDtpKyspe3ZhciBvPWVbMippKzFdOzAhPT1vJiYoZVsyKmldPWooc1tvXSsrLG8pKX19ZnVuY3Rpb24gVyhlKXt2YXIgdDtmb3IodD0wO3Q8bDt0KyspZS5keW5fbHRyZWVbMip0XT0wO2Zvcih0PTA7dDxmO3QrKyllLmR5bl9kdHJlZVsyKnRdPTA7Zm9yKHQ9MDt0PGM7dCsrKWUuYmxfdHJlZVsyKnRdPTA7ZS5keW5fbHRyZWVbMiptXT0xLGUub3B0X2xlbj1lLnN0YXRpY19sZW49MCxlLmxhc3RfbGl0PWUubWF0Y2hlcz0wfWZ1bmN0aW9uIE0oZSl7ODxlLmJpX3ZhbGlkP1UoZSxlLmJpX2J1Zik6MDxlLmJpX3ZhbGlkJiYoZS5wZW5kaW5nX2J1ZltlLnBlbmRpbmcrK109ZS5iaV9idWYpLGUuYmlfYnVmPTAsZS5iaV92YWxpZD0wfWZ1bmN0aW9uIEgoZSx0LHIsbil7dmFyIGk9Mip0LHM9MipyO3JldHVybiBlW2ldPGVbc118fGVbaV09PT1lW3NdJiZuW3RdPD1uW3JdfWZ1bmN0aW9uIEcoZSx0LHIpe2Zvcih2YXIgbj1lLmhlYXBbcl0saT1yPDwxO2k8PWUuaGVhcF9sZW4mJihpPGUuaGVhcF9sZW4mJkgodCxlLmhlYXBbaSsxXSxlLmhlYXBbaV0sZS5kZXB0aCkmJmkrKywhSCh0LG4sZS5oZWFwW2ldLGUuZGVwdGgpKTspZS5oZWFwW3JdPWUuaGVhcFtpXSxyPWksaTw8PTE7ZS5oZWFwW3JdPW59ZnVuY3Rpb24gSyhlLHQscil7dmFyIG4saSxzLGEsbz0wO2lmKDAhPT1lLmxhc3RfbGl0KWZvcig7bj1lLnBlbmRpbmdfYnVmW2UuZF9idWYrMipvXTw8OHxlLnBlbmRpbmdfYnVmW2UuZF9idWYrMipvKzFdLGk9ZS5wZW5kaW5nX2J1ZltlLmxfYnVmK29dLG8rKywwPT09bj9MKGUsaSx0KTooTChlLChzPUFbaV0pK3UrMSx0KSwwIT09KGE9d1tzXSkmJlAoZSxpLT1JW3NdLGEpLEwoZSxzPU4oLS1uKSxyKSwwIT09KGE9a1tzXSkmJlAoZSxuLT1UW3NdLGEpKSxvPGUubGFzdF9saXQ7KTtMKGUsbSx0KX1mdW5jdGlvbiBZKGUsdCl7dmFyIHIsbixpLHM9dC5keW5fdHJlZSxhPXQuc3RhdF9kZXNjLnN0YXRpY190cmVlLG89dC5zdGF0X2Rlc2MuaGFzX3N0cmVlLGg9dC5zdGF0X2Rlc2MuZWxlbXMsdT0tMTtmb3IoZS5oZWFwX2xlbj0wLGUuaGVhcF9tYXg9XyxyPTA7cjxoO3IrKykwIT09c1syKnJdPyhlLmhlYXBbKytlLmhlYXBfbGVuXT11PXIsZS5kZXB0aFtyXT0wKTpzWzIqcisxXT0wO2Zvcig7ZS5oZWFwX2xlbjwyOylzWzIqKGk9ZS5oZWFwWysrZS5oZWFwX2xlbl09dTwyPysrdTowKV09MSxlLmRlcHRoW2ldPTAsZS5vcHRfbGVuLS0sbyYmKGUuc3RhdGljX2xlbi09YVsyKmkrMV0pO2Zvcih0Lm1heF9jb2RlPXUscj1lLmhlYXBfbGVuPj4xOzE8PXI7ci0tKUcoZSxzLHIpO2ZvcihpPWg7cj1lLmhlYXBbMV0sZS5oZWFwWzFdPWUuaGVhcFtlLmhlYXBfbGVuLS1dLEcoZSxzLDEpLG49ZS5oZWFwWzFdLGUuaGVhcFstLWUuaGVhcF9tYXhdPXIsZS5oZWFwWy0tZS5oZWFwX21heF09bixzWzIqaV09c1syKnJdK3NbMipuXSxlLmRlcHRoW2ldPShlLmRlcHRoW3JdPj1lLmRlcHRoW25dP2UuZGVwdGhbcl06ZS5kZXB0aFtuXSkrMSxzWzIqcisxXT1zWzIqbisxXT1pLGUuaGVhcFsxXT1pKyssRyhlLHMsMSksMjw9ZS5oZWFwX2xlbjspO2UuaGVhcFstLWUuaGVhcF9tYXhdPWUuaGVhcFsxXSxmdW5jdGlvbihlLHQpe3ZhciByLG4saSxzLGEsbyxoPXQuZHluX3RyZWUsdT10Lm1heF9jb2RlLGw9dC5zdGF0X2Rlc2Muc3RhdGljX3RyZWUsZj10LnN0YXRfZGVzYy5oYXNfc3RyZWUsYz10LnN0YXRfZGVzYy5leHRyYV9iaXRzLGQ9dC5zdGF0X2Rlc2MuZXh0cmFfYmFzZSxwPXQuc3RhdF9kZXNjLm1heF9sZW5ndGgsbT0wO2ZvcihzPTA7czw9ZztzKyspZS5ibF9jb3VudFtzXT0wO2ZvcihoWzIqZS5oZWFwW2UuaGVhcF9tYXhdKzFdPTAscj1lLmhlYXBfbWF4KzE7cjxfO3IrKylwPChzPWhbMipoWzIqKG49ZS5oZWFwW3JdKSsxXSsxXSsxKSYmKHM9cCxtKyspLGhbMipuKzFdPXMsdTxufHwoZS5ibF9jb3VudFtzXSsrLGE9MCxkPD1uJiYoYT1jW24tZF0pLG89aFsyKm5dLGUub3B0X2xlbis9byoocythKSxmJiYoZS5zdGF0aWNfbGVuKz1vKihsWzIqbisxXSthKSkpO2lmKDAhPT1tKXtkb3tmb3Iocz1wLTE7MD09PWUuYmxfY291bnRbc107KXMtLTtlLmJsX2NvdW50W3NdLS0sZS5ibF9jb3VudFtzKzFdKz0yLGUuYmxfY291bnRbcF0tLSxtLT0yfXdoaWxlKDA8bSk7Zm9yKHM9cDswIT09cztzLS0pZm9yKG49ZS5ibF9jb3VudFtzXTswIT09bjspdTwoaT1lLmhlYXBbLS1yXSl8fChoWzIqaSsxXSE9PXMmJihlLm9wdF9sZW4rPShzLWhbMippKzFdKSpoWzIqaV0saFsyKmkrMV09cyksbi0tKX19KGUsdCksWihzLHUsZS5ibF9jb3VudCl9ZnVuY3Rpb24gWChlLHQscil7dmFyIG4saSxzPS0xLGE9dFsxXSxvPTAsaD03LHU9NDtmb3IoMD09PWEmJihoPTEzOCx1PTMpLHRbMioocisxKSsxXT02NTUzNSxuPTA7bjw9cjtuKyspaT1hLGE9dFsyKihuKzEpKzFdLCsrbzxoJiZpPT09YXx8KG88dT9lLmJsX3RyZWVbMippXSs9bzowIT09aT8oaSE9PXMmJmUuYmxfdHJlZVsyKmldKyssZS5ibF90cmVlWzIqYl0rKyk6bzw9MTA/ZS5ibF90cmVlWzIqdl0rKzplLmJsX3RyZWVbMip5XSsrLHM9aSx1PShvPTApPT09YT8oaD0xMzgsMyk6aT09PWE/KGg9NiwzKTooaD03LDQpKX1mdW5jdGlvbiBWKGUsdCxyKXt2YXIgbixpLHM9LTEsYT10WzFdLG89MCxoPTcsdT00O2ZvcigwPT09YSYmKGg9MTM4LHU9Myksbj0wO248PXI7bisrKWlmKGk9YSxhPXRbMioobisxKSsxXSwhKCsrbzxoJiZpPT09YSkpe2lmKG88dSlmb3IoO0woZSxpLGUuYmxfdHJlZSksMCE9LS1vOyk7ZWxzZSAwIT09aT8oaSE9PXMmJihMKGUsaSxlLmJsX3RyZWUpLG8tLSksTChlLGIsZS5ibF90cmVlKSxQKGUsby0zLDIpKTpvPD0xMD8oTChlLHYsZS5ibF90cmVlKSxQKGUsby0zLDMpKTooTChlLHksZS5ibF90cmVlKSxQKGUsby0xMSw3KSk7cz1pLHU9KG89MCk9PT1hPyhoPTEzOCwzKTppPT09YT8oaD02LDMpOihoPTcsNCl9fW4oVCk7dmFyIHE9ITE7ZnVuY3Rpb24gSihlLHQscixuKXtQKGUsKHM8PDEpKyhuPzE6MCksMyksZnVuY3Rpb24oZSx0LHIsbil7TShlKSxuJiYoVShlLHIpLFUoZSx+cikpLGkuYXJyYXlTZXQoZS5wZW5kaW5nX2J1ZixlLndpbmRvdyx0LHIsZS5wZW5kaW5nKSxlLnBlbmRpbmcrPXJ9KGUsdCxyLCEwKX1yLl90cl9pbml0PWZ1bmN0aW9uKGUpe3F8fChmdW5jdGlvbigpe3ZhciBlLHQscixuLGkscz1uZXcgQXJyYXkoZysxKTtmb3Iobj1yPTA7bjxhLTE7bisrKWZvcihJW25dPXIsZT0wO2U8MTw8d1tuXTtlKyspQVtyKytdPW47Zm9yKEFbci0xXT1uLG49aT0wO248MTY7bisrKWZvcihUW25dPWksZT0wO2U8MTw8a1tuXTtlKyspRVtpKytdPW47Zm9yKGk+Pj03O248ZjtuKyspZm9yKFRbbl09aTw8NyxlPTA7ZTwxPDxrW25dLTc7ZSsrKUVbMjU2K2krK109bjtmb3IodD0wO3Q8PWc7dCsrKXNbdF09MDtmb3IoZT0wO2U8PTE0MzspelsyKmUrMV09OCxlKyssc1s4XSsrO2Zvcig7ZTw9MjU1Oyl6WzIqZSsxXT05LGUrKyxzWzldKys7Zm9yKDtlPD0yNzk7KXpbMiplKzFdPTcsZSsrLHNbN10rKztmb3IoO2U8PTI4NzspelsyKmUrMV09OCxlKyssc1s4XSsrO2ZvcihaKHosbCsxLHMpLGU9MDtlPGY7ZSsrKUNbMiplKzFdPTUsQ1syKmVdPWooZSw1KTtPPW5ldyBEKHosdyx1KzEsbCxnKSxCPW5ldyBEKEMsaywwLGYsZyksUj1uZXcgRChuZXcgQXJyYXkoMCkseCwwLGMscCl9KCkscT0hMCksZS5sX2Rlc2M9bmV3IEYoZS5keW5fbHRyZWUsTyksZS5kX2Rlc2M9bmV3IEYoZS5keW5fZHRyZWUsQiksZS5ibF9kZXNjPW5ldyBGKGUuYmxfdHJlZSxSKSxlLmJpX2J1Zj0wLGUuYmlfdmFsaWQ9MCxXKGUpfSxyLl90cl9zdG9yZWRfYmxvY2s9SixyLl90cl9mbHVzaF9ibG9jaz1mdW5jdGlvbihlLHQscixuKXt2YXIgaSxzLGE9MDswPGUubGV2ZWw/KDI9PT1lLnN0cm0uZGF0YV90eXBlJiYoZS5zdHJtLmRhdGFfdHlwZT1mdW5jdGlvbihlKXt2YXIgdCxyPTQwOTM2MjQ0NDc7Zm9yKHQ9MDt0PD0zMTt0Kysscj4+Pj0xKWlmKDEmciYmMCE9PWUuZHluX2x0cmVlWzIqdF0pcmV0dXJuIG87aWYoMCE9PWUuZHluX2x0cmVlWzE4XXx8MCE9PWUuZHluX2x0cmVlWzIwXXx8MCE9PWUuZHluX2x0cmVlWzI2XSlyZXR1cm4gaDtmb3IodD0zMjt0PHU7dCsrKWlmKDAhPT1lLmR5bl9sdHJlZVsyKnRdKXJldHVybiBoO3JldHVybiBvfShlKSksWShlLGUubF9kZXNjKSxZKGUsZS5kX2Rlc2MpLGE9ZnVuY3Rpb24oZSl7dmFyIHQ7Zm9yKFgoZSxlLmR5bl9sdHJlZSxlLmxfZGVzYy5tYXhfY29kZSksWChlLGUuZHluX2R0cmVlLGUuZF9kZXNjLm1heF9jb2RlKSxZKGUsZS5ibF9kZXNjKSx0PWMtMTszPD10JiYwPT09ZS5ibF90cmVlWzIqU1t0XSsxXTt0LS0pO3JldHVybiBlLm9wdF9sZW4rPTMqKHQrMSkrNSs1KzQsdH0oZSksaT1lLm9wdF9sZW4rMys3Pj4+Mywocz1lLnN0YXRpY19sZW4rMys3Pj4+Myk8PWkmJihpPXMpKTppPXM9cis1LHIrNDw9aSYmLTEhPT10P0ooZSx0LHIsbik6ND09PWUuc3RyYXRlZ3l8fHM9PT1pPyhQKGUsMisobj8xOjApLDMpLEsoZSx6LEMpKTooUChlLDQrKG4/MTowKSwzKSxmdW5jdGlvbihlLHQscixuKXt2YXIgaTtmb3IoUChlLHQtMjU3LDUpLFAoZSxyLTEsNSksUChlLG4tNCw0KSxpPTA7aTxuO2krKylQKGUsZS5ibF90cmVlWzIqU1tpXSsxXSwzKTtWKGUsZS5keW5fbHRyZWUsdC0xKSxWKGUsZS5keW5fZHRyZWUsci0xKX0oZSxlLmxfZGVzYy5tYXhfY29kZSsxLGUuZF9kZXNjLm1heF9jb2RlKzEsYSsxKSxLKGUsZS5keW5fbHRyZWUsZS5keW5fZHRyZWUpKSxXKGUpLG4mJk0oZSl9LHIuX3RyX3RhbGx5PWZ1bmN0aW9uKGUsdCxyKXtyZXR1cm4gZS5wZW5kaW5nX2J1ZltlLmRfYnVmKzIqZS5sYXN0X2xpdF09dD4+PjgmMjU1LGUucGVuZGluZ19idWZbZS5kX2J1ZisyKmUubGFzdF9saXQrMV09MjU1JnQsZS5wZW5kaW5nX2J1ZltlLmxfYnVmK2UubGFzdF9saXRdPTI1NSZyLGUubGFzdF9saXQrKywwPT09dD9lLmR5bl9sdHJlZVsyKnJdKys6KGUubWF0Y2hlcysrLHQtLSxlLmR5bl9sdHJlZVsyKihBW3JdK3UrMSldKyssZS5keW5fZHRyZWVbMipOKHQpXSsrKSxlLmxhc3RfbGl0PT09ZS5saXRfYnVmc2l6ZS0xfSxyLl90cl9hbGlnbj1mdW5jdGlvbihlKXtQKGUsMiwzKSxMKGUsbSx6KSxmdW5jdGlvbihlKXsxNj09PWUuYmlfdmFsaWQ/KFUoZSxlLmJpX2J1ZiksZS5iaV9idWY9MCxlLmJpX3ZhbGlkPTApOjg8PWUuYmlfdmFsaWQmJihlLnBlbmRpbmdfYnVmW2UucGVuZGluZysrXT0yNTUmZS5iaV9idWYsZS5iaV9idWY+Pj04LGUuYmlfdmFsaWQtPTgpfShlKX19LHtcIi4uL3V0aWxzL2NvbW1vblwiOjQxfV0sNTM6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt0LmV4cG9ydHM9ZnVuY3Rpb24oKXt0aGlzLmlucHV0PW51bGwsdGhpcy5uZXh0X2luPTAsdGhpcy5hdmFpbF9pbj0wLHRoaXMudG90YWxfaW49MCx0aGlzLm91dHB1dD1udWxsLHRoaXMubmV4dF9vdXQ9MCx0aGlzLmF2YWlsX291dD0wLHRoaXMudG90YWxfb3V0PTAsdGhpcy5tc2c9XCJcIix0aGlzLnN0YXRlPW51bGwsdGhpcy5kYXRhX3R5cGU9Mix0aGlzLmFkbGVyPTB9fSx7fV0sNTQ6W2Z1bmN0aW9uKGUsdCxyKXsoZnVuY3Rpb24oZSl7IWZ1bmN0aW9uKHIsbil7XCJ1c2Ugc3RyaWN0XCI7aWYoIXIuc2V0SW1tZWRpYXRlKXt2YXIgaSxzLHQsYSxvPTEsaD17fSx1PSExLGw9ci5kb2N1bWVudCxlPU9iamVjdC5nZXRQcm90b3R5cGVPZiYmT2JqZWN0LmdldFByb3RvdHlwZU9mKHIpO2U9ZSYmZS5zZXRUaW1lb3V0P2U6cixpPVwiW29iamVjdCBwcm9jZXNzXVwiPT09e30udG9TdHJpbmcuY2FsbChyLnByb2Nlc3MpP2Z1bmN0aW9uKGUpe3Byb2Nlc3MubmV4dFRpY2soZnVuY3Rpb24oKXtjKGUpfSl9OmZ1bmN0aW9uKCl7aWYoci5wb3N0TWVzc2FnZSYmIXIuaW1wb3J0U2NyaXB0cyl7dmFyIGU9ITAsdD1yLm9ubWVzc2FnZTtyZXR1cm4gci5vbm1lc3NhZ2U9ZnVuY3Rpb24oKXtlPSExfSxyLnBvc3RNZXNzYWdlKFwiXCIsXCIqXCIpLHIub25tZXNzYWdlPXQsZX19KCk/KGE9XCJzZXRJbW1lZGlhdGUkXCIrTWF0aC5yYW5kb20oKStcIiRcIixyLmFkZEV2ZW50TGlzdGVuZXI/ci5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLGQsITEpOnIuYXR0YWNoRXZlbnQoXCJvbm1lc3NhZ2VcIixkKSxmdW5jdGlvbihlKXtyLnBvc3RNZXNzYWdlKGErZSxcIipcIil9KTpyLk1lc3NhZ2VDaGFubmVsPygodD1uZXcgTWVzc2FnZUNoYW5uZWwpLnBvcnQxLm9ubWVzc2FnZT1mdW5jdGlvbihlKXtjKGUuZGF0YSl9LGZ1bmN0aW9uKGUpe3QucG9ydDIucG9zdE1lc3NhZ2UoZSl9KTpsJiZcIm9ucmVhZHlzdGF0ZWNoYW5nZVwiaW4gbC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpPyhzPWwuZG9jdW1lbnRFbGVtZW50LGZ1bmN0aW9uKGUpe3ZhciB0PWwuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTt0Lm9ucmVhZHlzdGF0ZWNoYW5nZT1mdW5jdGlvbigpe2MoZSksdC5vbnJlYWR5c3RhdGVjaGFuZ2U9bnVsbCxzLnJlbW92ZUNoaWxkKHQpLHQ9bnVsbH0scy5hcHBlbmRDaGlsZCh0KX0pOmZ1bmN0aW9uKGUpe3NldFRpbWVvdXQoYywwLGUpfSxlLnNldEltbWVkaWF0ZT1mdW5jdGlvbihlKXtcImZ1bmN0aW9uXCIhPXR5cGVvZiBlJiYoZT1uZXcgRnVuY3Rpb24oXCJcIitlKSk7Zm9yKHZhciB0PW5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoLTEpLHI9MDtyPHQubGVuZ3RoO3IrKyl0W3JdPWFyZ3VtZW50c1tyKzFdO3ZhciBuPXtjYWxsYmFjazplLGFyZ3M6dH07cmV0dXJuIGhbb109bixpKG8pLG8rK30sZS5jbGVhckltbWVkaWF0ZT1mfWZ1bmN0aW9uIGYoZSl7ZGVsZXRlIGhbZV19ZnVuY3Rpb24gYyhlKXtpZih1KXNldFRpbWVvdXQoYywwLGUpO2Vsc2V7dmFyIHQ9aFtlXTtpZih0KXt1PSEwO3RyeXshZnVuY3Rpb24oZSl7dmFyIHQ9ZS5jYWxsYmFjayxyPWUuYXJncztzd2l0Y2goci5sZW5ndGgpe2Nhc2UgMDp0KCk7YnJlYWs7Y2FzZSAxOnQoclswXSk7YnJlYWs7Y2FzZSAyOnQoclswXSxyWzFdKTticmVhaztjYXNlIDM6dChyWzBdLHJbMV0sclsyXSk7YnJlYWs7ZGVmYXVsdDp0LmFwcGx5KG4scil9fSh0KX1maW5hbGx5e2YoZSksdT0hMX19fX1mdW5jdGlvbiBkKGUpe2Uuc291cmNlPT09ciYmXCJzdHJpbmdcIj09dHlwZW9mIGUuZGF0YSYmMD09PWUuZGF0YS5pbmRleE9mKGEpJiZjKCtlLmRhdGEuc2xpY2UoYS5sZW5ndGgpKX19KFwidW5kZWZpbmVkXCI9PXR5cGVvZiBzZWxmP3ZvaWQgMD09PWU/dGhpczplOnNlbGYpfSkuY2FsbCh0aGlzLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBnbG9iYWw/Z2xvYmFsOlwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmP3NlbGY6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdz93aW5kb3c6e30pfSx7fV19LHt9LFsxMF0pKDEwKX0pOyIsICJpbXBvcnQgeyBBcHAsIE1vZGFsLCBOb3RpY2UsIFBsdWdpbiwgU2V0dGluZyB9IGZyb20gXCJvYnNpZGlhblwiO1xuaW1wb3J0IHsgVXBkYXRlU2VydmljZSB9IGZyb20gXCIuL3VwZGF0ZS1zZXJ2aWNlXCI7XG5pbXBvcnQgeyBQbHVnaW5EYXRhLCBVcGRhdGVCYXRjaCB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbmNvbnN0IERFRkFVTFRfREFUQTogUGx1Z2luRGF0YSA9IHsgaW5zdGFsbGVkOiB7IG93bmVkRmlsZXM6IFtdLCBhcHBsaWVkUmVsZWFzZUlkczogW10gfSB9O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUYnBlZGlhVXBkYXRlUGx1Z2luIGV4dGVuZHMgUGx1Z2luIHtcbiAgcHJpdmF0ZSBkYXRhOiBQbHVnaW5EYXRhID0gREVGQVVMVF9EQVRBO1xuICBwcml2YXRlIHVwZGF0ZXIhOiBVcGRhdGVTZXJ2aWNlO1xuXG4gIGFzeW5jIG9ubG9hZCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBzYXZlZCA9IGF3YWl0IHRoaXMubG9hZERhdGEoKSA/PyB7fTtcbiAgICB0aGlzLmRhdGEgPSB7IC4uLkRFRkFVTFRfREFUQSwgLi4uc2F2ZWQsIGluc3RhbGxlZDogeyBvd25lZEZpbGVzOiBbXSwgYXBwbGllZFJlbGVhc2VJZHM6IFtdLCAuLi5zYXZlZC5pbnN0YWxsZWQgfSB9O1xuICAgIHRoaXMudXBkYXRlciA9IG5ldyBVcGRhdGVTZXJ2aWNlKHRoaXMuYXBwLCB0aGlzLm1hbmlmZXN0LnZlcnNpb24sICgpID0+IHRoaXMuZGF0YSwgYXN5bmMgKGRhdGEpID0+IHsgdGhpcy5kYXRhID0gZGF0YTsgYXdhaXQgdGhpcy5zYXZlRGF0YShkYXRhKTsgfSk7XG4gICAgdGhpcy5hZGRSaWJib25JY29uKFwiZG93bmxvYWRcIiwgXCJDaGVjayBUYnBlZGlhIHVwZGF0ZXNcIiwgKCkgPT4gdm9pZCB0aGlzLmNoZWNrRm9yVXBkYXRlKCkpO1xuICAgIHRoaXMuYWRkQ29tbWFuZCh7IGlkOiBcImNoZWNrLWZvci1jb250ZW50LXVwZGF0ZVwiLCBuYW1lOiBcIkNoZWNrIGZvciBjb250ZW50IHVwZGF0ZVwiLCBjYWxsYmFjazogKCkgPT4gdm9pZCB0aGlzLmNoZWNrRm9yVXBkYXRlKCkgfSk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGNoZWNrRm9yVXBkYXRlKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBtYW5pZmVzdCA9IGF3YWl0IHRoaXMudXBkYXRlci5jaGVjaygpO1xuICAgICAgaWYgKCFtYW5pZmVzdCkgeyBuZXcgTm90aWNlKFwiWW91ciBUYnBlZGlhIGNvbnRlbnQgaXMgdXAgdG8gZGF0ZS5cIik7IHJldHVybjsgfVxuICAgICAgbmV3IFVwZGF0ZU1vZGFsKHRoaXMuYXBwLCBtYW5pZmVzdCwgKHByb2dyZXNzKSA9PiB0aGlzLnVwZGF0ZXIuaW5zdGFsbChtYW5pZmVzdCwgcHJvZ3Jlc3MpKS5vcGVuKCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHsgbmV3IE5vdGljZShgQ291bGQgbm90IGNoZWNrIGZvciBUYnBlZGlhIHVwZGF0ZXM6ICR7bWVzc2FnZShlcnJvcil9YCk7IH1cbiAgfVxufVxuXG5jbGFzcyBVcGRhdGVNb2RhbCBleHRlbmRzIE1vZGFsIHtcbiAgY29uc3RydWN0b3IoYXBwOiBBcHAsIHByaXZhdGUgcmVhZG9ubHkgYmF0Y2g6IFVwZGF0ZUJhdGNoLCBwcml2YXRlIHJlYWRvbmx5IGluc3RhbGw6IChwcm9ncmVzczogKG1lc3NhZ2U6IHN0cmluZykgPT4gdm9pZCkgPT4gUHJvbWlzZTx2b2lkPikgeyBzdXBlcihhcHApOyB9XG4gIG9uT3BlbigpOiB2b2lkIHtcbiAgICBjb25zdCB7IGNvbnRlbnRFbCB9ID0gdGhpcztcbiAgICBjb25zdCBmaXJzdCA9IHRoaXMuYmF0Y2gucmVsZWFzZXNbMF07IGNvbnN0IGxhc3QgPSB0aGlzLmJhdGNoLnJlbGVhc2VzLmF0KC0xKSE7XG4gICAgY29udGVudEVsLmNyZWF0ZUVsKFwiaDJcIiwgeyB0ZXh0OiBgSW5zdGFsbCAke3RoaXMuYmF0Y2gucmVsZWFzZXMubGVuZ3RofSBUYnBlZGlhIHJlbGVhc2Uke3RoaXMuYmF0Y2gucmVsZWFzZXMubGVuZ3RoID09PSAxID8gXCJcIiA6IFwic1wifWAgfSk7XG4gICAgY29udGVudEVsLmNyZWF0ZUVsKFwicFwiLCB7IHRleHQ6IGAke2ZpcnN0LnJlbGVhc2VWZXJzaW9ufSBcdTIxOTIgJHtsYXN0LnJlbGVhc2VWZXJzaW9ufWAgfSk7XG4gICAgY29uc3QgbGlzdCA9IGNvbnRlbnRFbC5jcmVhdGVFbChcInVsXCIpO1xuICAgIGZvciAoY29uc3QgcmVsZWFzZSBvZiB0aGlzLmJhdGNoLnJlbGVhc2VzKSBsaXN0LmNyZWF0ZUVsKFwibGlcIiwgeyB0ZXh0OiBgJHtyZWxlYXNlLnJlbGVhc2VWZXJzaW9ufSBcdTIwMTQgJHtyZWxlYXNlLnJlbGVhc2VOb3Rlcy5zdW1tYXJ5fWAgfSk7XG4gICAgY29uc3Qgc3RhdHVzID0gY29udGVudEVsLmNyZWF0ZUVsKFwicFwiKTtcbiAgICBuZXcgU2V0dGluZyhjb250ZW50RWwpXG4gICAgICAuYWRkQnV0dG9uKChidXR0b24pID0+IGJ1dHRvbi5zZXRCdXR0b25UZXh0KFwiQ2FuY2VsXCIpLm9uQ2xpY2soKCkgPT4gdGhpcy5jbG9zZSgpKSlcbiAgICAgIC5hZGRCdXR0b24oKGJ1dHRvbikgPT4gYnV0dG9uLnNldEN0YSgpLnNldEJ1dHRvblRleHQoXCJVcGRhdGUgbm93XCIpLm9uQ2xpY2soYXN5bmMgKCkgPT4ge1xuICAgICAgICBidXR0b24uc2V0RGlzYWJsZWQodHJ1ZSk7IHN0YXR1cy5zZXRUZXh0KFwiU3RhcnRpbmcgdXBkYXRlXHUyMDI2XCIpO1xuICAgICAgICB0cnkgeyBhd2FpdCB0aGlzLmluc3RhbGwoKHRleHQpID0+IHN0YXR1cy5zZXRUZXh0KHRleHQpKTsgdGhpcy5jbG9zZSgpOyB9XG4gICAgICAgIGNhdGNoIChlcnJvcikgeyBzdGF0dXMuc2V0VGV4dChgVXBkYXRlIGZhaWxlZDogJHttZXNzYWdlKGVycm9yKX1gKTsgYnV0dG9uLnNldERpc2FibGVkKGZhbHNlKTsgfVxuICAgICAgfSkpO1xuICB9XG4gIG9uQ2xvc2UoKTogdm9pZCB7IHRoaXMuY29udGVudEVsLmVtcHR5KCk7IH1cbn1cbmZ1bmN0aW9uIG1lc3NhZ2UoZXJyb3I6IHVua25vd24pOiBzdHJpbmcgeyByZXR1cm4gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBcIlVua25vd24gZXJyb3JcIjsgfVxuIiwgImltcG9ydCBKU1ppcCBmcm9tIFwianN6aXBcIjtcbmltcG9ydCB7IEFwcCwgRGF0YUFkYXB0ZXIsIE5vdGljZSwgUGxhdGZvcm0sIHJlcXVlc3RVcmwgfSBmcm9tIFwib2JzaWRpYW5cIjtcbmltcG9ydCB7IGNvbXBhcmVWZXJzaW9ucywgcGFyc2VBbmRWYWxpZGF0ZU1hbmlmZXN0IH0gZnJvbSBcIi4vbWFuaWZlc3RcIjtcbmltcG9ydCB7IGFzc2VydE1hbmFnZWRQYXRoLCBlbnN1cmVOb1BhdGhDb25mbGljdHMsIG5vcm1hbGl6ZVBhdGggfSBmcm9tIFwiLi9wYXRoLXBvbGljeVwiO1xuaW1wb3J0IHsgTUFOSUZFU1RfVVJMLCBQbHVnaW5EYXRhLCBQcm9iZVJlc3VsdCwgUmVsZWFzZUVudHJ5LCBSZWxlYXNlTWFuaWZlc3QsIFNvdXJjZSwgVXBkYXRlQmF0Y2gsIFVwZGF0ZVBsYW4sIFVwZGF0ZVRyYW5zYWN0aW9uLCBXT1JLRVJfVVJMIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuY29uc3QgU1RBR0lOR19ESVIgPSBcIi5vYnNpZGlhbi9wbHVnaW5zL3RicGVkaWEtdXBkYXRlLy5zdGFnaW5nXCI7XG5jb25zdCBNQVhfQVJDSElWRV9CWVRFUyA9IDEwMjQgKiAxMDI0ICogMTAyNDtcbmNvbnN0IE1BWF9GSUxFUyA9IDMwXzAwMDtcbmNvbnN0IE1BWF9VTkNPTVBSRVNTRURfQllURVMgPSA0ICogMTAyNCAqIDEwMjQgKiAxMDI0O1xuXG5leHBvcnQgY2xhc3MgVXBkYXRlU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcmVhZG9ubHkgYXBwOiBBcHAsXG4gICAgcHJpdmF0ZSByZWFkb25seSBwbHVnaW5WZXJzaW9uOiBzdHJpbmcsXG4gICAgcHJpdmF0ZSByZWFkb25seSBnZXREYXRhOiAoKSA9PiBQbHVnaW5EYXRhLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgc2F2ZURhdGE6IChkYXRhOiBQbHVnaW5EYXRhKSA9PiBQcm9taXNlPHZvaWQ+LFxuICApIHt9XG5cbiAgYXN5bmMgY2hlY2soKTogUHJvbWlzZTxVcGRhdGVCYXRjaCB8IG51bGw+IHtcbiAgICBjb25zdCBtYW5pZmVzdCA9IGF3YWl0IHRoaXMuZmV0Y2hNYW5pZmVzdCgpO1xuICAgIHRoaXMuYXNzZXJ0Q29tcGF0aWJsZShtYW5pZmVzdCk7XG4gICAgY29uc3QgcmVsZWFzZXMgPSB0aGlzLm1pc3NpbmdSZWxlYXNlcyhtYW5pZmVzdCk7XG4gICAgcmV0dXJuIHJlbGVhc2VzLmxlbmd0aCA/IHsgbWFuaWZlc3QsIHJlbGVhc2VzIH0gOiBudWxsO1xuICB9XG5cbiAgYXN5bmMgaW5zdGFsbChiYXRjaDogVXBkYXRlQmF0Y2gsIHByb2dyZXNzOiAobWVzc2FnZTogc3RyaW5nKSA9PiB2b2lkKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhpcy5hc3NlcnRDb21wYXRpYmxlKGJhdGNoLm1hbmlmZXN0KTtcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgYmF0Y2gucmVsZWFzZXMubGVuZ3RoOyBpbmRleCArPSAxKSB7XG4gICAgICBjb25zdCByZWxlYXNlID0gYmF0Y2gucmVsZWFzZXNbaW5kZXhdO1xuICAgICAgcHJvZ3Jlc3MoYFJlbGVhc2UgJHtpbmRleCArIDF9IG9mICR7YmF0Y2gucmVsZWFzZXMubGVuZ3RofTogJHtyZWxlYXNlLnJlbGVhc2VWZXJzaW9ufWApO1xuICAgICAgYXdhaXQgdGhpcy5pbnN0YWxsUmVsZWFzZShiYXRjaC5tYW5pZmVzdCwgcmVsZWFzZSwgcHJvZ3Jlc3MpO1xuICAgIH1cbiAgICBuZXcgTm90aWNlKGBUYnBlZGlhIHVwZGF0ZWQgdGhyb3VnaCAke2JhdGNoLnJlbGVhc2VzLmF0KC0xKSEucmVsZWFzZVZlcnNpb259LmApO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBpbnN0YWxsUmVsZWFzZShtYW5pZmVzdDogUmVsZWFzZU1hbmlmZXN0LCByZWxlYXNlOiBSZWxlYXNlRW50cnksIHByb2dyZXNzOiAobWVzc2FnZTogc3RyaW5nKSA9PiB2b2lkKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgbGV0IHRyYW5zYWN0aW9uOiBVcGRhdGVUcmFuc2FjdGlvbiB8IHVuZGVmaW5lZDtcbiAgICBsZXQgY29tbWl0dGVkID0gZmFsc2U7XG4gICAgdHJ5IHtcbiAgICAgIHByb2dyZXNzKFwiQ3JlYXRpbmcgdXBkYXRlIHRyYW5zYWN0aW9uXHUyMDI2XCIpO1xuICAgICAgdHJhbnNhY3Rpb24gPSBhd2FpdCB0aGlzLmNyZWF0ZVRyYW5zYWN0aW9uKG1hbmlmZXN0LCByZWxlYXNlKTtcbiAgICAgIHByb2dyZXNzKFwiRGlzY292ZXJpbmcgdXBkYXRlIHNvdXJjZXNcdTIwMjZcIik7XG4gICAgICBjb25zdCBzb3VyY2VzID0gYXdhaXQgdGhpcy5nZXRTb3VyY2VzKG1hbmlmZXN0LCByZWxlYXNlLCB0cmFuc2FjdGlvbik7XG4gICAgICBpZiAoIXNvdXJjZXMubGVuZ3RoKSB0aHJvdyBuZXcgRXJyb3IoXCJObyBlbmFibGVkIHVwZGF0ZSBzb3VyY2UgaXMgYXZhaWxhYmxlLlwiKTtcbiAgICAgIGNvbnN0IHJhbmtlZCA9IGF3YWl0IHRoaXMucmFua1NvdXJjZXMoc291cmNlcywgdHJhbnNhY3Rpb24sIHByb2dyZXNzKTtcbiAgICAgIGlmICghcmFua2VkLmxlbmd0aCkgdGhyb3cgbmV3IEVycm9yKFwiQWxsIHVwZGF0ZSBzb3VyY2VzIGZhaWxlZCB0aGVpciBoZWFsdGggY2hlY2suXCIpO1xuXG4gICAgICBsZXQgYXJjaGl2ZTogQXJyYXlCdWZmZXIgfCB1bmRlZmluZWQ7XG4gICAgICBsZXQgbGFzdEVycm9yOiB1bmtub3duO1xuICAgICAgZm9yIChjb25zdCBzb3VyY2Ugb2YgcmFua2VkKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcHJvZ3Jlc3MoYERvd25sb2FkaW5nIGZyb20gJHtzb3VyY2UubmFtZX1cdTIwMjZgKTtcbiAgICAgICAgICBhcmNoaXZlID0gYXdhaXQgdGhpcy5kb3dubG9hZFBhY2thZ2Uoc291cmNlLCB0cmFuc2FjdGlvbiwgcmVsZWFzZS5maWxlbmFtZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7IGxhc3RFcnJvciA9IGVycm9yOyB9XG4gICAgICB9XG4gICAgICBpZiAoIWFyY2hpdmUpIHRocm93IGxhc3RFcnJvciBpbnN0YW5jZW9mIEVycm9yID8gbGFzdEVycm9yIDogbmV3IEVycm9yKFwiQWxsIHVwZGF0ZSBzb3VyY2VzIGZhaWxlZC5cIik7XG5cbiAgICAgIHByb2dyZXNzKFwiVmFsaWRhdGluZyByZWxlYXNlIGFyY2hpdmVcdTIwMjZcIik7XG4gICAgICBjb25zdCBzdGFnaW5nUGF0aCA9IGAke1NUQUdJTkdfRElSfS8ke3RyYW5zYWN0aW9uLmlkfS9wYWNrYWdlLnppcGA7XG4gICAgICBhd2FpdCB3cml0ZUJpbmFyeSh0aGlzLmFwcC52YXVsdC5hZGFwdGVyLCBzdGFnaW5nUGF0aCwgYXJjaGl2ZSk7XG4gICAgICBhcmNoaXZlID0gYXdhaXQgdGhpcy5hcHAudmF1bHQuYWRhcHRlci5yZWFkQmluYXJ5KHN0YWdpbmdQYXRoKTtcbiAgICAgIGNvbnN0IHBsYW4gPSBhd2FpdCB0aGlzLnZhbGlkYXRlQXJjaGl2ZShhcmNoaXZlLCBtYW5pZmVzdCwgcmVsZWFzZSk7XG4gICAgICBwcm9ncmVzcyhcIkFwcGx5aW5nIG1hbmFnZWQgZmlsZXNcdTIwMjZcIik7XG4gICAgICBhd2FpdCB0aGlzLmFwcGx5KHBsYW4sIGFyY2hpdmUsIHByb2dyZXNzKTtcbiAgICAgIGNvbW1pdHRlZCA9IHRydWU7XG4gICAgICB0cnkgeyBhd2FpdCB0aGlzLnJlcG9ydCh0cmFuc2FjdGlvbiwgXCJzdWNjZXNzXCIpOyB9XG4gICAgICBjYXRjaCB7IG5ldyBOb3RpY2UoXCJUYnBlZGlhIHdhcyB1cGRhdGVkLCBidXQgdGhlIHNlcnZpY2UgY291bGQgbm90IHJlY29yZCB0aGUgc3VjY2VzcyBhdWRpdC5cIik7IH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgaWYgKHRyYW5zYWN0aW9uICYmICFjb21taXR0ZWQpIGF3YWl0IHRoaXMucmVwb3J0KHRyYW5zYWN0aW9uLCBcImZhaWxlZFwiKS5jYXRjaCgoKSA9PiB1bmRlZmluZWQpO1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlmICh0cmFuc2FjdGlvbikgYXdhaXQgcmVtb3ZlVHJlZSh0aGlzLmFwcC52YXVsdC5hZGFwdGVyLCBgJHtTVEFHSU5HX0RJUn0vJHt0cmFuc2FjdGlvbi5pZH1gKS5jYXRjaCgoKSA9PiB1bmRlZmluZWQpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgbWlzc2luZ1JlbGVhc2VzKG1hbmlmZXN0OiBSZWxlYXNlTWFuaWZlc3QpOiBSZWxlYXNlRW50cnlbXSB7XG4gICAgY29uc3QgaW5zdGFsbGVkID0gdGhpcy5nZXREYXRhKCkuaW5zdGFsbGVkO1xuICAgIGNvbnN0IGluc3RhbGxlZEluZGV4ID0gaW5zdGFsbGVkLnJlbGVhc2VJZCA/IG1hbmlmZXN0LnJlbGVhc2VzLmZpbmRJbmRleCgocmVsZWFzZSkgPT4gcmVsZWFzZS5yZWxlYXNlSWQgPT09IGluc3RhbGxlZC5yZWxlYXNlSWQpIDogLTE7XG4gICAgaWYgKGluc3RhbGxlZEluZGV4ID49IDApIHJldHVybiBtYW5pZmVzdC5yZWxlYXNlcy5zbGljZShpbnN0YWxsZWRJbmRleCArIDEpO1xuICAgIGlmICghaW5zdGFsbGVkLnJlbGVhc2VWZXJzaW9uKSByZXR1cm4gbWFuaWZlc3QucmVsZWFzZXM7XG4gICAgcmV0dXJuIG1hbmlmZXN0LnJlbGVhc2VzLmZpbHRlcigocmVsZWFzZSkgPT4gY29tcGFyZVZlcnNpb25zKHJlbGVhc2UucmVsZWFzZVZlcnNpb24sIGluc3RhbGxlZC5yZWxlYXNlVmVyc2lvbiEpID4gMCk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGZldGNoTWFuaWZlc3QoKTogUHJvbWlzZTxSZWxlYXNlTWFuaWZlc3Q+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHJlcXVlc3RVcmwoeyB1cmw6IE1BTklGRVNUX1VSTCwgbWV0aG9kOiBcIkdFVFwiLCB0aHJvdzogZmFsc2UgfSk7XG4gICAgaWYgKHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB0aHJvdyBuZXcgRXJyb3IoYENvdWxkIG5vdCByZXRyaWV2ZSByZWxlYXNlIG1ldGFkYXRhIChIVFRQICR7cmVzcG9uc2Uuc3RhdHVzfSkuYCk7XG4gICAgbGV0IGpzb246IHVua25vd247XG4gICAgdHJ5IHsganNvbiA9IHJlc3BvbnNlLmpzb247IH0gY2F0Y2ggeyB0aHJvdyBuZXcgRXJyb3IoXCJSZWxlYXNlIG1ldGFkYXRhIGlzIG5vdCB2YWxpZCBKU09OLlwiKTsgfVxuICAgIHJldHVybiBwYXJzZUFuZFZhbGlkYXRlTWFuaWZlc3QoanNvbik7XG4gIH1cblxuICBwcml2YXRlIGFzc2VydENvbXBhdGlibGUobWFuaWZlc3Q6IFJlbGVhc2VNYW5pZmVzdCk6IHZvaWQge1xuICAgIGlmIChjb21wYXJlVmVyc2lvbnModGhpcy5wbHVnaW5WZXJzaW9uLCBtYW5pZmVzdC5taW5pbXVtUGx1Z2luVmVyc2lvbikgPCAwKSB0aHJvdyBuZXcgRXJyb3IoYFRoaXMgcmVsZWFzZSByZXF1aXJlcyBwbHVnaW4gJHttYW5pZmVzdC5taW5pbXVtUGx1Z2luVmVyc2lvbn0gb3IgbmV3ZXIuYCk7XG4gICAgY29uc3QgYXBwVmVyc2lvbiA9IHRoaXMuYXBwVmVyc2lvbigpO1xuICAgIC8vIE9ic2lkaWFuIGRvZXMgbm90IGV4cG9zZSBhIHN0YWJsZSwgdHlwZWQgdmVyc2lvbiBwcm9wZXJ0eSB0byBldmVyeSBwbHVnaW5cbiAgICAvLyBydW50aW1lLiBBIG1pc3NpbmcgdmFsdWUgbXVzdCBub3QgYmUgaW50ZXJwcmV0ZWQgYXMgdmVyc2lvbiAwLjAuMC5cbiAgICBpZiAoYXBwVmVyc2lvbiAmJiBjb21wYXJlVmVyc2lvbnMoYXBwVmVyc2lvbiwgbWFuaWZlc3QubWluaW11bU9ic2lkaWFuVmVyc2lvbikgPCAwKSB0aHJvdyBuZXcgRXJyb3IoYFRoaXMgcmVsZWFzZSByZXF1aXJlcyBPYnNpZGlhbiAke21hbmlmZXN0Lm1pbmltdW1PYnNpZGlhblZlcnNpb259IG9yIG5ld2VyLmApO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBjcmVhdGVUcmFuc2FjdGlvbihtYW5pZmVzdDogUmVsZWFzZU1hbmlmZXN0LCByZWxlYXNlOiBSZWxlYXNlRW50cnkpOiBQcm9taXNlPFVwZGF0ZVRyYW5zYWN0aW9uPiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmFwaShcIi91cGRhdGVzL3RyYW5zYWN0aW9uc1wiLCBcIlBPU1RcIiwge1xuICAgICAgdGl0bGU6IG1hbmlmZXN0LnRpdGxlLCB2ZXJzaW9uOiByZWxlYXNlLnJlbGVhc2VWZXJzaW9uLCBmaWxlbmFtZTogcmVsZWFzZS5maWxlbmFtZSwgbGFuZ3VhZ2U6IG1hbmlmZXN0LmNvbGxlY3Rpb24ubGFuZ3VhZ2UuY29kZSxcbiAgICAgIHNlcmllczogbWFuaWZlc3QuY29sbGVjdGlvbi5zZXJpZXMuaWQsIGVkaXRpb246IG1hbmlmZXN0LmNvbGxlY3Rpb24uZWRpdGlvbi5pZCxcbiAgICAgIGRldmljZV90eXBlOiBQbGF0Zm9ybS5pc01vYmlsZSA/IFwibW9iaWxlXCIgOiBcImRlc2t0b3BcIiwgb3M6IG5hdmlnYXRvci5wbGF0Zm9ybSxcbiAgICAgIGNsaWVudF92ZXJzaW9uOiBgJHt0aGlzLmFwcFZlcnNpb24oKSA/PyBcInVua25vd25cIn07IHBsdWdpbi8ke3RoaXMucGx1Z2luVmVyc2lvbn1gLCB1c2VyX2FnZW50OiBuYXZpZ2F0b3IudXNlckFnZW50LFxuICAgIH0pO1xuICAgIGlmICh0eXBlb2YgcmVzcG9uc2UuaWQgIT09IFwic3RyaW5nXCIgfHwgdHlwZW9mIHJlc3BvbnNlLnRva2VuICE9PSBcInN0cmluZ1wiKSB0aHJvdyBuZXcgRXJyb3IoXCJVcGRhdGUgc2VydmljZSByZXR1cm5lZCBhbiBpbnZhbGlkIHRyYW5zYWN0aW9uLlwiKTtcbiAgICByZXR1cm4geyBpZDogcmVzcG9uc2UuaWQsIHRva2VuOiByZXNwb25zZS50b2tlbiB9O1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBnZXRTb3VyY2VzKG1hbmlmZXN0OiBSZWxlYXNlTWFuaWZlc3QsIHJlbGVhc2U6IFJlbGVhc2VFbnRyeSwgdHJhbnNhY3Rpb246IFVwZGF0ZVRyYW5zYWN0aW9uKTogUHJvbWlzZTxTb3VyY2VbXT4ge1xuICAgIGNvbnN0IHF1ZXJ5ID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh7IGxhbmd1YWdlOiBtYW5pZmVzdC5jb2xsZWN0aW9uLmxhbmd1YWdlLmNvZGUsIHNlcmllczogbWFuaWZlc3QuY29sbGVjdGlvbi5zZXJpZXMuaWQsIGVkaXRpb246IG1hbmlmZXN0LmNvbGxlY3Rpb24uZWRpdGlvbi5pZCwgdGl0bGU6IG1hbmlmZXN0LnRpdGxlLCB2ZXJzaW9uOiByZWxlYXNlLnJlbGVhc2VWZXJzaW9uLCBmaWxlbmFtZTogcmVsZWFzZS5maWxlbmFtZSB9KTtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuYXBpKGAvdXBkYXRlcy9zb3VyY2VzPyR7cXVlcnl9YCwgXCJHRVRcIiwgdW5kZWZpbmVkLCB0cmFuc2FjdGlvbik7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHJlc3BvbnNlLnNvdXJjZXMpKSB0aHJvdyBuZXcgRXJyb3IoXCJVcGRhdGUgc2VydmljZSByZXR1cm5lZCBhbiBpbnZhbGlkIHNvdXJjZSBsaXN0LlwiKTtcbiAgICByZXR1cm4gcmVzcG9uc2Uuc291cmNlcy5maWx0ZXIoaXNTb3VyY2UpO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyByYW5rU291cmNlcyhzb3VyY2VzOiBTb3VyY2VbXSwgdHJhbnNhY3Rpb246IFVwZGF0ZVRyYW5zYWN0aW9uLCBwcm9ncmVzczogKG1lc3NhZ2U6IHN0cmluZykgPT4gdm9pZCk6IFByb21pc2U8U291cmNlW10+IHtcbiAgICBwcm9ncmVzcyhcIlRlc3RpbmcgdXBkYXRlIHNvdXJjZXNcdTIwMjZcIik7XG4gICAgY29uc3QgcHJvYmVzID0gYXdhaXQgUHJvbWlzZS5hbGwoc291cmNlcy5zbGljZSgwLCA4KS5tYXAoYXN5bmMgKHNvdXJjZSkgPT4gKHsgc291cmNlLCByZXN1bHQ6IGF3YWl0IHRoaXMucHJvYmUoc291cmNlLCB0cmFuc2FjdGlvbikgfSkpKTtcbiAgICByZXR1cm4gcHJvYmVzXG4gICAgICAuZmlsdGVyKChpdGVtKTogaXRlbSBpcyB7IHNvdXJjZTogU291cmNlOyByZXN1bHQ6IFByb2JlUmVzdWx0IH0gPT4gaXRlbS5yZXN1bHQuaGVhbHRoeSAmJiB0eXBlb2YgaXRlbS5yZXN1bHQubGF0ZW5jeU1zID09PSBcIm51bWJlclwiKVxuICAgICAgLnNvcnQoKGEsIGIpID0+IHNjb3JlKGEuc291cmNlLCBhLnJlc3VsdCkgLSBzY29yZShiLnNvdXJjZSwgYi5yZXN1bHQpKVxuICAgICAgLm1hcCgoaXRlbSkgPT4gaXRlbS5zb3VyY2UpO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBwcm9iZShzb3VyY2U6IFNvdXJjZSwgdHJhbnNhY3Rpb246IFVwZGF0ZVRyYW5zYWN0aW9uKTogUHJvbWlzZTxQcm9iZVJlc3VsdD4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuYXBpKGAvdXBkYXRlcy9zb3VyY2VzLyR7ZW5jb2RlVVJJQ29tcG9uZW50KHNvdXJjZS5zb3VyY2VJZCl9L3Byb2JlYCwgXCJQT1NUXCIsIHt9LCB0cmFuc2FjdGlvbik7XG4gICAgICByZXR1cm4geyBzb3VyY2VJZDogc291cmNlLnNvdXJjZUlkLCBoZWFsdGh5OiByZXNwb25zZS5oZWFsdGh5ID09PSB0cnVlLCBsYXRlbmN5TXM6IGFzTnVtYmVyKHJlc3BvbnNlLmxhdGVuY3lNcyksIGJ5dGVzOiBhc051bWJlcihyZXNwb25zZS5ieXRlcyksIGVycm9yOiBhc1N0cmluZyhyZXNwb25zZS5lcnJvcikgfTtcbiAgICB9IGNhdGNoIHsgcmV0dXJuIHsgc291cmNlSWQ6IHNvdXJjZS5zb3VyY2VJZCwgaGVhbHRoeTogZmFsc2UgfTsgfVxuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBkb3dubG9hZFBhY2thZ2Uoc291cmNlOiBTb3VyY2UsIHRyYW5zYWN0aW9uOiBVcGRhdGVUcmFuc2FjdGlvbiwgZmlsZW5hbWU6IHN0cmluZyk6IFByb21pc2U8QXJyYXlCdWZmZXI+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAke1dPUktFUl9VUkx9L3VwZGF0ZXMvcGFja2FnZWAsIHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsIC4uLmF1dGhIZWFkZXJzKHRyYW5zYWN0aW9uKSB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBzb3VyY2VJZDogc291cmNlLnNvdXJjZUlkLCBmaWxlbmFtZSB9KSxcbiAgICB9KTtcbiAgICBpZiAoIXJlc3BvbnNlLm9rIHx8ICFyZXNwb25zZS5ib2R5KSB0aHJvdyBuZXcgRXJyb3IoYERvd25sb2FkIGZhaWxlZCBmcm9tICR7c291cmNlLm5hbWV9IChIVFRQICR7cmVzcG9uc2Uuc3RhdHVzfSkuYCk7XG4gICAgY29uc3QgcmVhZGVyID0gcmVzcG9uc2UuYm9keS5nZXRSZWFkZXIoKTsgY29uc3QgY2h1bmtzOiBVaW50OEFycmF5W10gPSBbXTsgbGV0IHRvdGFsID0gMDtcbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgY29uc3QgeyB2YWx1ZSwgZG9uZSB9ID0gYXdhaXQgcmVhZGVyLnJlYWQoKTtcbiAgICAgIGlmIChkb25lKSBicmVhaztcbiAgICAgIHRvdGFsICs9IHZhbHVlLmJ5dGVMZW5ndGg7XG4gICAgICBpZiAodG90YWwgPiBNQVhfQVJDSElWRV9CWVRFUykgeyBhd2FpdCByZWFkZXIuY2FuY2VsKCk7IHRocm93IG5ldyBFcnJvcihcIlJlbGVhc2UgYXJjaGl2ZSBleGNlZWRzIHRoZSBjb25maWd1cmVkIHNpemUgbGltaXQuXCIpOyB9XG4gICAgICBjaHVua3MucHVzaCh2YWx1ZSk7XG4gICAgfVxuICAgIGNvbnN0IGFyY2hpdmUgPSBuZXcgVWludDhBcnJheSh0b3RhbCk7IGxldCBvZmZzZXQgPSAwO1xuICAgIGZvciAoY29uc3QgY2h1bmsgb2YgY2h1bmtzKSB7IGFyY2hpdmUuc2V0KGNodW5rLCBvZmZzZXQpOyBvZmZzZXQgKz0gY2h1bmsuYnl0ZUxlbmd0aDsgfVxuICAgIHJldHVybiBhcmNoaXZlLmJ1ZmZlcjtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgdmFsaWRhdGVBcmNoaXZlKGFyY2hpdmU6IEFycmF5QnVmZmVyLCBtYW5pZmVzdDogUmVsZWFzZU1hbmlmZXN0LCByZWxlYXNlOiBSZWxlYXNlRW50cnkpOiBQcm9taXNlPFVwZGF0ZVBsYW4+IHtcbiAgICBjb25zdCB6aXAgPSBhd2FpdCBKU1ppcC5sb2FkQXN5bmMoYXJjaGl2ZSwgeyBjcmVhdGVGb2xkZXJzOiBmYWxzZSwgY2hlY2tDUkMzMjogZmFsc2UgfSk7XG4gICAgY29uc3QgZXhwZWN0ZWQgPSBuZXcgU2V0KHJlbGVhc2UuZmlsZXMubWFwKChmaWxlKSA9PiBmaWxlLnBhdGgpKTtcbiAgICBjb25zdCBhY3R1YWw6IHN0cmluZ1tdID0gW107IGxldCB0b3RhbFVuY29tcHJlc3NlZCA9IDA7XG4gICAgZm9yIChjb25zdCBlbnRyeSBvZiBPYmplY3QudmFsdWVzKHppcC5maWxlcykpIHtcbiAgICAgIGNvbnN0IGVudHJ5TmFtZSA9IGVudHJ5LmRpciA/IGVudHJ5Lm5hbWUucmVwbGFjZSgvXFwvJC8sIFwiXCIpIDogZW50cnkubmFtZTtcbiAgICAgIGlmIChlbnRyeU5hbWUpIGFzc2VydE1hbmFnZWRQYXRoKGVudHJ5TmFtZSwgbm9ybWFsaXplUGF0aChtYW5pZmVzdC5jb2xsZWN0aW9uLmluc3RhbGxSb290KSk7XG4gICAgICBpZiAoZW50cnkuZGlyKSBjb250aW51ZTtcbiAgICAgIGlmICgrK2FjdHVhbC5sZW5ndGggPiBNQVhfRklMRVMpIHRocm93IG5ldyBFcnJvcihcIlJlbGVhc2UgYXJjaGl2ZSBoYXMgdG9vIG1hbnkgZmlsZXMuXCIpO1xuICAgICAgY29uc3QgcGF0aCA9IGFzc2VydE1hbmFnZWRQYXRoKGVudHJ5Lm5hbWUsIG5vcm1hbGl6ZVBhdGgobWFuaWZlc3QuY29sbGVjdGlvbi5pbnN0YWxsUm9vdCkpO1xuICAgICAgYWN0dWFsLnB1c2gocGF0aCk7XG4gICAgICBjb25zdCBzaXplID0gemlwRW50cnlTaXplKGVudHJ5KTtcbiAgICAgIGlmIChzaXplID09PSB1bmRlZmluZWQpIHRocm93IG5ldyBFcnJvcihcIlJlbGVhc2UgYXJjaGl2ZSBoYXMgYW4gZW50cnkgd2l0aCBubyBzaXplIG1ldGFkYXRhLlwiKTtcbiAgICAgIHRvdGFsVW5jb21wcmVzc2VkICs9IHNpemU7XG4gICAgICBpZiAodG90YWxVbmNvbXByZXNzZWQgPiBNQVhfVU5DT01QUkVTU0VEX0JZVEVTKSB0aHJvdyBuZXcgRXJyb3IoXCJSZWxlYXNlIGFyY2hpdmUgZXhjZWVkcyB0aGUgY29uZmlndXJlZCBleHRyYWN0ZWQtc2l6ZSBsaW1pdC5cIik7XG4gICAgfVxuICAgIGlmIChuZXcgU2V0KGFjdHVhbCkuc2l6ZSAhPT0gYWN0dWFsLmxlbmd0aCkgdGhyb3cgbmV3IEVycm9yKFwiUmVsZWFzZSBhcmNoaXZlIGNvbnRhaW5zIGNvbGxpZGluZyBwYXRocy5cIik7XG4gICAgZW5zdXJlTm9QYXRoQ29uZmxpY3RzKGFjdHVhbCk7XG4gICAgaWYgKGFjdHVhbC5sZW5ndGggIT09IGV4cGVjdGVkLnNpemUgfHwgYWN0dWFsLnNvbWUoKHBhdGgpID0+ICFleHBlY3RlZC5oYXMocGF0aCkpKSB0aHJvdyBuZXcgRXJyb3IoXCJSZWxlYXNlIGFyY2hpdmUgZG9lcyBub3QgZXhhY3RseSBtYXRjaCB0aGUgbWFuaWZlc3QgaW52ZW50b3J5LlwiKTtcbiAgICByZXR1cm4geyBtYW5pZmVzdCwgcmVsZWFzZSwgd3JpdGVzOiBhY3R1YWwsIGRlbGV0aW9uczogcmVsZWFzZS5kZWxldGlvbnMgfTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgYXBwbHkocGxhbjogVXBkYXRlUGxhbiwgYXJjaGl2ZTogQXJyYXlCdWZmZXIsIHByb2dyZXNzOiAobWVzc2FnZTogc3RyaW5nKSA9PiB2b2lkKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgYWRhcHRlciA9IHRoaXMuYXBwLnZhdWx0LmFkYXB0ZXI7XG4gICAgY29uc3QgcHJldmlvdXMgPSB0aGlzLmdldERhdGEoKS5pbnN0YWxsZWQ7XG4gICAgY29uc3Qgb3duZWQgPSBuZXcgU2V0KHByZXZpb3VzLm93bmVkRmlsZXMpO1xuICAgIC8vIEVhY2ggcmVsZWFzZSBpcyBpbmNyZW1lbnRhbDogb25seSBleHBsaWNpdCBkZWxldGlvbnMgYXJlIHJlbW92ZWQuIEVhcmxpZXJcbiAgICAvLyByZWxlYXNlcyByZW1haW4gaW5zdGFsbGVkIGFmdGVyIHRoZWlyIFpJUCBoYXMgY29tbWl0dGVkIHN1Y2Nlc3NmdWxseS5cbiAgICBjb25zdCBkZWxldGlvbnMgPSBbLi4ubmV3IFNldChwbGFuLmRlbGV0aW9ucyldO1xuICAgIGZvciAoY29uc3QgcGF0aCBvZiBwbGFuLndyaXRlcykge1xuICAgICAgYXdhaXQgYXNzZXJ0Tm9SZXBhcnNlUG9pbnRzKHRoaXMuYXBwLCBwYXRoKTtcbiAgICAgIGlmIChhd2FpdCBhZGFwdGVyLmV4aXN0cyhwYXRoKSkge1xuICAgICAgICBpZiAoKGF3YWl0IGFkYXB0ZXIuc3RhdChwYXRoKSk/LnR5cGUgPT09IFwiZm9sZGVyXCIpIHRocm93IG5ldyBFcnJvcihgUmVmdXNpbmcgdG8gcmVwbGFjZSBhIGxvY2FsIGZvbGRlcjogJHtwYXRofWApO1xuICAgICAgICBpZiAoIW93bmVkLmhhcyhwYXRoKSkgdGhyb3cgbmV3IEVycm9yKGBSZWZ1c2luZyB0byBvdmVyd3JpdGUgdW5tYW5hZ2VkIGxvY2FsIGZpbGU6ICR7cGF0aH1gKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZm9yIChjb25zdCBwYXRoIG9mIGRlbGV0aW9ucykge1xuICAgICAgYXdhaXQgYXNzZXJ0Tm9SZXBhcnNlUG9pbnRzKHRoaXMuYXBwLCBwYXRoKTtcbiAgICAgIGlmICghb3duZWQuaGFzKHBhdGgpKSB0aHJvdyBuZXcgRXJyb3IoYFJlZnVzaW5nIHRvIGRlbGV0ZSBhIGZpbGUgbm90IG93bmVkIGJ5IHRoZSBwcmlvciByZWxlYXNlOiAke3BhdGh9YCk7XG4gICAgfVxuXG4gICAgY29uc3QgdHJhbnNhY3Rpb25EaXIgPSBgJHtTVEFHSU5HX0RJUn0vJHtjcnlwdG8ucmFuZG9tVVVJRCgpfWA7XG4gICAgY29uc3QgYmFja3VwRGlyID0gYCR7dHJhbnNhY3Rpb25EaXJ9L2JhY2t1cGA7XG4gICAgY29uc3Qgam91cm5hbFBhdGggPSBgJHt0cmFuc2FjdGlvbkRpcn0vdHJhbnNhY3Rpb24uanNvbmA7XG4gICAgYXdhaXQgbWtkaXJwKGFkYXB0ZXIsIGJhY2t1cERpcik7XG4gICAgY29uc3QgdGFyZ2V0cyA9IFsuLi5uZXcgU2V0KFsuLi5wbGFuLndyaXRlcywgLi4uZGVsZXRpb25zXSldO1xuICAgIGNvbnN0IG9yaWdpbmFsczogQXJyYXk8eyBwYXRoOiBzdHJpbmc7IGV4aXN0ZWQ6IGJvb2xlYW4gfT4gPSBbXTtcbiAgICBmb3IgKGNvbnN0IHBhdGggb2YgdGFyZ2V0cykge1xuICAgICAgY29uc3QgZXhpc3RlZCA9IGF3YWl0IGFkYXB0ZXIuZXhpc3RzKHBhdGgpOyBvcmlnaW5hbHMucHVzaCh7IHBhdGgsIGV4aXN0ZWQgfSk7XG4gICAgICBpZiAoZXhpc3RlZCkgYXdhaXQgd3JpdGVCaW5hcnkoYWRhcHRlciwgYCR7YmFja3VwRGlyfS8ke2VuY29kZVVSSUNvbXBvbmVudChwYXRoKX1gLCBhd2FpdCBhZGFwdGVyLnJlYWRCaW5hcnkocGF0aCkpO1xuICAgIH1cbiAgICBhd2FpdCBhZGFwdGVyLndyaXRlKGpvdXJuYWxQYXRoLCBKU09OLnN0cmluZ2lmeSh7IG9yaWdpbmFscyB9KSk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgemlwID0gYXdhaXQgSlNaaXAubG9hZEFzeW5jKGFyY2hpdmUsIHsgY3JlYXRlRm9sZGVyczogZmFsc2UsIGNoZWNrQ1JDMzI6IGZhbHNlIH0pO1xuICAgICAgZm9yIChjb25zdCBwYXRoIG9mIGRlbGV0aW9ucykgaWYgKGF3YWl0IGFkYXB0ZXIuZXhpc3RzKHBhdGgpKSBhd2FpdCBhZGFwdGVyLnJlbW92ZShwYXRoKTtcbiAgICAgIGZvciAoY29uc3QgcGF0aCBvZiBwbGFuLndyaXRlcykge1xuICAgICAgICBwcm9ncmVzcyhgV3JpdGluZyAke3BhdGh9XHUyMDI2YCk7XG4gICAgICAgIGF3YWl0IG1rZGlycChhZGFwdGVyLCBwYXJlbnQocGF0aCkpO1xuICAgICAgICBjb25zdCBlbnRyeSA9IHppcC5maWxlKHBhdGgpO1xuICAgICAgICBpZiAoIWVudHJ5KSB0aHJvdyBuZXcgRXJyb3IoYEFyY2hpdmUgZW50cnkgZGlzYXBwZWFyZWQ6ICR7cGF0aH1gKTtcbiAgICAgICAgYXdhaXQgd3JpdGVCaW5hcnkoYWRhcHRlciwgcGF0aCwgYXdhaXQgZW50cnkuYXN5bmMoXCJ1aW50OGFycmF5XCIpKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG5leHRPd25lZCA9IG5ldyBTZXQocHJldmlvdXMub3duZWRGaWxlcyk7XG4gICAgICBmb3IgKGNvbnN0IHBhdGggb2YgZGVsZXRpb25zKSBuZXh0T3duZWQuZGVsZXRlKHBhdGgpO1xuICAgICAgZm9yIChjb25zdCBwYXRoIG9mIHBsYW4ud3JpdGVzKSBuZXh0T3duZWQuYWRkKHBhdGgpO1xuICAgICAgYXdhaXQgdGhpcy5zYXZlRGF0YSh7IGluc3RhbGxlZDoge1xuICAgICAgICByZWxlYXNlVmVyc2lvbjogcGxhbi5yZWxlYXNlLnJlbGVhc2VWZXJzaW9uLFxuICAgICAgICByZWxlYXNlSWQ6IHBsYW4ucmVsZWFzZS5yZWxlYXNlSWQsXG4gICAgICAgIGFwcGxpZWRSZWxlYXNlSWRzOiBbLi4ubmV3IFNldChbLi4uKHByZXZpb3VzLmFwcGxpZWRSZWxlYXNlSWRzID8/IFtdKSwgcGxhbi5yZWxlYXNlLnJlbGVhc2VJZF0pXSxcbiAgICAgICAgb3duZWRGaWxlczogWy4uLm5leHRPd25lZF0uc29ydCgpLFxuICAgICAgfSB9KTtcbiAgICAgIGF3YWl0IHJlbW92ZVRyZWUoYWRhcHRlciwgdHJhbnNhY3Rpb25EaXIpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBhd2FpdCB0aGlzLnJvbGxiYWNrKGFkYXB0ZXIsIG9yaWdpbmFscywgYmFja3VwRGlyKTtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgcm9sbGJhY2soYWRhcHRlcjogRGF0YUFkYXB0ZXIsIG9yaWdpbmFsczogQXJyYXk8eyBwYXRoOiBzdHJpbmc7IGV4aXN0ZWQ6IGJvb2xlYW4gfT4sIGJhY2t1cERpcjogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgZm9yIChjb25zdCBvcmlnaW5hbCBvZiBvcmlnaW5hbHMucmV2ZXJzZSgpKSB7XG4gICAgICBpZiAob3JpZ2luYWwuZXhpc3RlZCkgYXdhaXQgd3JpdGVCaW5hcnkoYWRhcHRlciwgb3JpZ2luYWwucGF0aCwgYXdhaXQgYWRhcHRlci5yZWFkQmluYXJ5KGAke2JhY2t1cERpcn0vJHtlbmNvZGVVUklDb21wb25lbnQob3JpZ2luYWwucGF0aCl9YCkpO1xuICAgICAgZWxzZSBpZiAoYXdhaXQgYWRhcHRlci5leGlzdHMob3JpZ2luYWwucGF0aCkpIGF3YWl0IGFkYXB0ZXIucmVtb3ZlKG9yaWdpbmFsLnBhdGgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgcmVwb3J0KHRyYW5zYWN0aW9uOiBVcGRhdGVUcmFuc2FjdGlvbiwgc3RhdHVzOiBcInN1Y2Nlc3NcIiB8IFwiZmFpbGVkXCIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCB0aGlzLmFwaShgL3VwZGF0ZXMvdHJhbnNhY3Rpb25zLyR7ZW5jb2RlVVJJQ29tcG9uZW50KHRyYW5zYWN0aW9uLmlkKX0vcmVzdWx0YCwgXCJQT1NUXCIsIHsgc3RhdHVzIH0sIHRyYW5zYWN0aW9uKTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgYXBpKHBhdGg6IHN0cmluZywgbWV0aG9kOiBcIkdFVFwiIHwgXCJQT1NUXCIsIGJvZHk/OiBvYmplY3QsIHRyYW5zYWN0aW9uPzogVXBkYXRlVHJhbnNhY3Rpb24pOiBQcm9taXNlPFJlY29yZDxzdHJpbmcsIHVua25vd24+PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgJHtXT1JLRVJfVVJMfSR7cGF0aH1gLCB7IG1ldGhvZCwgaGVhZGVyczogeyAuLi4oYm9keSA/IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSA6IHt9KSwgLi4uKHRyYW5zYWN0aW9uID8gYXV0aEhlYWRlcnModHJhbnNhY3Rpb24pIDoge30pIH0sIGJvZHk6IGJvZHkgPyBKU09OLnN0cmluZ2lmeShib2R5KSA6IHVuZGVmaW5lZCB9KTtcbiAgICBjb25zdCBqc29uID0gYXdhaXQgcmVzcG9uc2UuanNvbigpLmNhdGNoKCgpID0+ICh7fSkpO1xuICAgIGlmICghcmVzcG9uc2Uub2spIHRocm93IG5ldyBFcnJvcih0eXBlb2YganNvbi5lcnJvciA9PT0gXCJzdHJpbmdcIiA/IGpzb24uZXJyb3IgOiBgVXBkYXRlIHNlcnZpY2UgcmVxdWVzdCBmYWlsZWQgKEhUVFAgJHtyZXNwb25zZS5zdGF0dXN9KS5gKTtcbiAgICByZXR1cm4ganNvbiBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPjtcbiAgfVxuXG4gIHByaXZhdGUgYXBwVmVyc2lvbigpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IGFwcCA9IHRoaXMuYXBwIGFzIHVua25vd24gYXMgeyB2ZXJzaW9uPzogdW5rbm93bjsgYXBwVmVyc2lvbj86IHVua25vd247IHZhdWx0OiB7IGdldENvbmZpZz86IChrZXk6IHN0cmluZykgPT4gdW5rbm93biB9IH07XG4gICAgY29uc3QgZ2xvYmFsQXBwID0gKGdsb2JhbFRoaXMgYXMgdW5rbm93biBhcyB7IGFwcD86IHsgdmVyc2lvbj86IHVua25vd247IGFwcFZlcnNpb24/OiB1bmtub3duIH0gfSkuYXBwO1xuICAgIGNvbnN0IGNhbmRpZGF0ZXMgPSBbYXBwLnZlcnNpb24sIGFwcC5hcHBWZXJzaW9uLCBnbG9iYWxBcHA/LnZlcnNpb24sIGdsb2JhbEFwcD8uYXBwVmVyc2lvbiwgYXBwLnZhdWx0LmdldENvbmZpZz8uKFwiYXBwVmVyc2lvblwiKV07XG4gICAgcmV0dXJuIGNhbmRpZGF0ZXMuZmluZCgodmFsdWUpOiB2YWx1ZSBpcyBzdHJpbmcgPT4gdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiICYmIC9eXFxkK1xcLlxcZCtcXC5cXGQrLy50ZXN0KHZhbHVlKSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gYXV0aEhlYWRlcnModHJhbnNhY3Rpb246IFVwZGF0ZVRyYW5zYWN0aW9uKTogUmVjb3JkPHN0cmluZywgc3RyaW5nPiB7IHJldHVybiB7IFwiWC1VcGRhdGUtVHJhbnNhY3Rpb25cIjogdHJhbnNhY3Rpb24uaWQsIFwiQXV0aG9yaXphdGlvblwiOiBgQmVhcmVyICR7dHJhbnNhY3Rpb24udG9rZW59YCB9OyB9XG5mdW5jdGlvbiBpc1NvdXJjZSh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIFNvdXJjZSB7IHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiYgdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mICh2YWx1ZSBhcyBTb3VyY2UpLnNvdXJjZUlkID09PSBcInN0cmluZ1wiICYmIHR5cGVvZiAodmFsdWUgYXMgU291cmNlKS5uYW1lID09PSBcInN0cmluZ1wiICYmIHR5cGVvZiAodmFsdWUgYXMgU291cmNlKS5wcmlvcml0eSA9PT0gXCJudW1iZXJcIiAmJiB0eXBlb2YgKHZhbHVlIGFzIFNvdXJjZSkuc3VwcG9ydHNSYW5nZSA9PT0gXCJib29sZWFuXCI7IH1cbmZ1bmN0aW9uIHNjb3JlKHNvdXJjZTogU291cmNlLCBwcm9iZTogUHJvYmVSZXN1bHQpOiBudW1iZXIgeyByZXR1cm4gKHByb2JlLmxhdGVuY3lNcyA/PyA2MF8wMDApICsgc291cmNlLnByaW9yaXR5ICogMjUgLSAocHJvYmUuYnl0ZXMgPz8gMCkgLyA0MDk2OyB9XG5mdW5jdGlvbiBhc051bWJlcih2YWx1ZTogdW5rbm93bik6IG51bWJlciB8IHVuZGVmaW5lZCB7IHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIgJiYgTnVtYmVyLmlzRmluaXRlKHZhbHVlKSA/IHZhbHVlIDogdW5kZWZpbmVkOyB9XG5mdW5jdGlvbiBhc1N0cmluZyh2YWx1ZTogdW5rbm93bik6IHN0cmluZyB8IHVuZGVmaW5lZCB7IHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgPyB2YWx1ZSA6IHVuZGVmaW5lZDsgfVxuZnVuY3Rpb24gemlwRW50cnlTaXplKGVudHJ5OiBKU1ppcC5KU1ppcE9iamVjdCk6IG51bWJlciB8IHVuZGVmaW5lZCB7XG4gIGNvbnN0IHNpemUgPSAoZW50cnkgYXMgdW5rbm93biBhcyB7IF9kYXRhPzogeyB1bmNvbXByZXNzZWRTaXplPzogdW5rbm93biB9IH0pLl9kYXRhPy51bmNvbXByZXNzZWRTaXplO1xuICByZXR1cm4gdHlwZW9mIHNpemUgPT09IFwibnVtYmVyXCIgJiYgTnVtYmVyLmlzU2FmZUludGVnZXIoc2l6ZSkgJiYgc2l6ZSA+PSAwID8gc2l6ZSA6IHVuZGVmaW5lZDtcbn1cbmZ1bmN0aW9uIHBhcmVudChwYXRoOiBzdHJpbmcpOiBzdHJpbmcgeyBjb25zdCBpbmRleCA9IHBhdGgubGFzdEluZGV4T2YoXCIvXCIpOyByZXR1cm4gaW5kZXggPT09IC0xID8gXCJcIiA6IHBhdGguc2xpY2UoMCwgaW5kZXgpOyB9XG5hc3luYyBmdW5jdGlvbiBta2RpcnAoYWRhcHRlcjogRGF0YUFkYXB0ZXIsIHBhdGg6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICBpZiAoIXBhdGgpIHJldHVybjtcbiAgbGV0IGN1cnJlbnQgPSBcIlwiO1xuICBmb3IgKGNvbnN0IHNlZ21lbnQgb2YgcGF0aC5zcGxpdChcIi9cIikpIHtcbiAgICBjdXJyZW50ID0gY3VycmVudCA/IGAke2N1cnJlbnR9LyR7c2VnbWVudH1gIDogc2VnbWVudDtcbiAgICBpZiAoIShhd2FpdCBhZGFwdGVyLmV4aXN0cyhjdXJyZW50KSkpIGF3YWl0IGFkYXB0ZXIubWtkaXIoY3VycmVudCk7XG4gIH1cbn1cbmFzeW5jIGZ1bmN0aW9uIHdyaXRlQmluYXJ5KGFkYXB0ZXI6IERhdGFBZGFwdGVyLCBwYXRoOiBzdHJpbmcsIGRhdGE6IEFycmF5QnVmZmVyIHwgVWludDhBcnJheSk6IFByb21pc2U8dm9pZD4geyBjb25zdCBjb3B5ID0gbmV3IFVpbnQ4QXJyYXkoZGF0YSBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkgPyBkYXRhIDogbmV3IFVpbnQ4QXJyYXkoZGF0YSkpOyBhd2FpdCBta2RpcnAoYWRhcHRlciwgcGFyZW50KHBhdGgpKTsgYXdhaXQgYWRhcHRlci53cml0ZUJpbmFyeShwYXRoLCBjb3B5LmJ1ZmZlcik7IH1cbmFzeW5jIGZ1bmN0aW9uIHJlbW92ZVRyZWUoYWRhcHRlcjogRGF0YUFkYXB0ZXIsIHBhdGg6IHN0cmluZyk6IFByb21pc2U8dm9pZD4geyBpZiAoYXdhaXQgYWRhcHRlci5leGlzdHMocGF0aCkpIGF3YWl0IGFkYXB0ZXIucm1kaXIocGF0aCwgdHJ1ZSk7IH1cbmFzeW5jIGZ1bmN0aW9uIGFzc2VydE5vUmVwYXJzZVBvaW50cyhhcHA6IEFwcCwgdmF1bHRQYXRoOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3QgYmFzZVBhdGggPSAoYXBwLnZhdWx0LmFkYXB0ZXIgYXMgdW5rbm93biBhcyB7IGdldEJhc2VQYXRoPzogKCkgPT4gc3RyaW5nIH0pLmdldEJhc2VQYXRoPy4oKTtcbiAgY29uc3QgcmVxdWlyZUZuID0gKGdsb2JhbFRoaXMgYXMgdW5rbm93biBhcyB7IHJlcXVpcmU/OiAobmFtZTogc3RyaW5nKSA9PiB7IGxzdGF0OiAocGF0aDogc3RyaW5nKSA9PiBQcm9taXNlPHsgaXNTeW1ib2xpY0xpbms6ICgpID0+IGJvb2xlYW4gfT4gfSB9KS5yZXF1aXJlO1xuICBpZiAoIWJhc2VQYXRoIHx8ICFyZXF1aXJlRm4pIHJldHVybjtcbiAgY29uc3QgZnMgPSByZXF1aXJlRm4oXCJmcy9wcm9taXNlc1wiKTtcbiAgbGV0IGN1cnJlbnQgPSBiYXNlUGF0aDtcbiAgZm9yIChjb25zdCBzZWdtZW50IG9mIHZhdWx0UGF0aC5zcGxpdChcIi9cIikpIHtcbiAgICBjdXJyZW50ID0gYCR7Y3VycmVudH0vJHtzZWdtZW50fWA7XG4gICAgdHJ5IHtcbiAgICAgIGlmICgoYXdhaXQgZnMubHN0YXQoY3VycmVudCkpLmlzU3ltYm9saWNMaW5rKCkpIHRocm93IG5ldyBFcnJvcihgUmVmdXNpbmcgdG8gdHJhdmVyc2UgYSBsaW5rIG9yIHJlcGFyc2UgcG9pbnQ6ICR7dmF1bHRQYXRofWApO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBpZiAoKGVycm9yIGFzIHsgY29kZT86IHN0cmluZyB9KS5jb2RlICE9PSBcIkVOT0VOVFwiKSB0aHJvdyBlcnJvcjtcbiAgICB9XG4gIH1cbn1cbiIsICJleHBvcnQgY29uc3QgTUFOSUZFU1RfVVJMID0gXCJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vdGJzcGVkaWEvdGJwZWRpYS11cGRhdGUvbWFpbi9sYXRlc3QuanNvblwiO1xuZXhwb3J0IGNvbnN0IFdPUktFUl9VUkwgPSBcImh0dHBzOi8vY2Z1cGRhdGUudGJwZWRpYS5vcmdcIjtcblxuZXhwb3J0IGNvbnN0IE1BTkFHRURfUk9PVFMgPSBbXG4gIFwiMDAgXHU4QUFBXHU2NjBFXCIsIFwiMDEgXHU2NTg3XHU5NkM2XHU5MEU4XCIsIFwiMDIgXHU5NThCXHU3OTNBXHU5MEU4XCIsIFwiMDMgXHU3RDkzXHU4NUNGXHU5MEU4XCIsIFwiMDQgXHU5ODBDXHU4MjA3XHU2MjEyXHU1RjhCXCIsXG4gIFwiMDUgXHU1MEIzXHU2Q0Q1XHU5MEU4XCIsIFwiMDYgXHU1QkM2XHU2Q0Q1XHU1MTAwXHU4RUNDXCIsIFwiMDcgXHU0RjVCXHU4QTlFXHU1MTc4XHU4NUNGXCIsIFwiMDggXHU1MTc2XHU0RUQ2XHU5ODVFXHU1MjI1XCIsIFwiMDkgXHU4NEVFXHU5OTk5XHU0RTBBXHU1RTJCXCIsXG4gIFwiMTAgXHU3NzFGXHU0RjVCXHU1Qjk3XCIsIFwiMjAgXHU1QzA4XHU5ODRDXCIsIFwiNTAgXHU1MjE3XHU4ODY4XCIsIFwiNjAgXHU1QzBFXHU4QjgwXCIsIFwiNzAgXHU4MENDXHU2NjZGXHU4Q0M3XHU2NTk5XCIsIFwiOTAgXHU1RTZCXHU1MkE5XCIsXG4gIFwiOTggXHU0RTBCXHU4RjA5XHU4Q0M3XHU2NTk5XCIsIFwiOTkgU2V0dGluZ1wiXG5dIGFzIGNvbnN0O1xuXG5leHBvcnQgaW50ZXJmYWNlIFJlbGVhc2VFbnRyeSB7XG4gIHJlbGVhc2VWZXJzaW9uOiBzdHJpbmc7XG4gIHJlbGVhc2VJZDogc3RyaW5nO1xuICBwdWJsaXNoZWRBdDogc3RyaW5nO1xuICBmaWxlbmFtZTogc3RyaW5nO1xuICBmaWxlczogQXJyYXk8eyBwYXRoOiBzdHJpbmcgfT47XG4gIGRlbGV0aW9uczogc3RyaW5nW107XG4gIHJlbGVhc2VOb3RlczogeyBzdW1tYXJ5OiBzdHJpbmc7IGFkZGVkOiBudW1iZXI7IHVwZGF0ZWQ6IG51bWJlcjsgcmVtb3ZlZDogbnVtYmVyIH07XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVsZWFzZU1hbmlmZXN0IHtcbiAgc2NoZW1hVmVyc2lvbjogMjtcbiAgcHJvZHVjdDogXCJUYnBlZGlhLURpc3RyaWJ1dGVcIjtcbiAgcGx1Z2luOiBcInRicGVkaWEtdXBkYXRlXCI7XG4gIGNoYW5uZWw6IFwic3RhYmxlXCI7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIGNvbGxlY3Rpb246IHtcbiAgICBsYW5ndWFnZTogeyBjb2RlOiBzdHJpbmc7IG5hbWU6IHN0cmluZzsgZm9sZGVyOiBzdHJpbmcgfTtcbiAgICBzZXJpZXM6IHsgaWQ6IHN0cmluZzsgbmFtZTogc3RyaW5nOyBmb2xkZXI6IHN0cmluZyB9O1xuICAgIGVkaXRpb246IHsgaWQ6IHN0cmluZzsgbmFtZTogc3RyaW5nOyBmb2xkZXI6IHN0cmluZyB9O1xuICAgIGluc3RhbGxSb290OiBzdHJpbmc7XG4gIH07XG4gIG1pbmltdW1QbHVnaW5WZXJzaW9uOiBzdHJpbmc7XG4gIG1pbmltdW1PYnNpZGlhblZlcnNpb246IHN0cmluZztcbiAgbWFuYWdlZFJvb3RzOiBzdHJpbmdbXTtcbiAgcmVsZWFzZXM6IFJlbGVhc2VFbnRyeVtdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEluc3RhbGxlZFN0YXRlIHtcbiAgcmVsZWFzZVZlcnNpb24/OiBzdHJpbmc7XG4gIHJlbGVhc2VJZD86IHN0cmluZztcbiAgYXBwbGllZFJlbGVhc2VJZHM6IHN0cmluZ1tdO1xuICBvd25lZEZpbGVzOiBzdHJpbmdbXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQbHVnaW5EYXRhIHtcbiAgaW5zdGFsbGVkOiBJbnN0YWxsZWRTdGF0ZTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTb3VyY2Uge1xuICBzb3VyY2VJZDogc3RyaW5nO1xuICBuYW1lOiBzdHJpbmc7XG4gIHJlZ2lvbj86IHN0cmluZztcbiAgcHJpb3JpdHk6IG51bWJlcjtcbiAgc3VwcG9ydHNSYW5nZTogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBVcGRhdGVUcmFuc2FjdGlvbiB7XG4gIGlkOiBzdHJpbmc7XG4gIHRva2VuOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJvYmVSZXN1bHQge1xuICBzb3VyY2VJZDogc3RyaW5nO1xuICBoZWFsdGh5OiBib29sZWFuO1xuICBsYXRlbmN5TXM/OiBudW1iZXI7XG4gIGJ5dGVzPzogbnVtYmVyO1xuICBlcnJvcj86IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBVcGRhdGVQbGFuIHtcbiAgbWFuaWZlc3Q6IFJlbGVhc2VNYW5pZmVzdDtcbiAgcmVsZWFzZTogUmVsZWFzZUVudHJ5O1xuICB3cml0ZXM6IHN0cmluZ1tdO1xuICBkZWxldGlvbnM6IHN0cmluZ1tdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFVwZGF0ZUJhdGNoIHtcbiAgbWFuaWZlc3Q6IFJlbGVhc2VNYW5pZmVzdDtcbiAgcmVsZWFzZXM6IFJlbGVhc2VFbnRyeVtdO1xufVxuIiwgImltcG9ydCB7IE1BTkFHRURfUk9PVFMgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5jb25zdCBSRVNFUlZFRCA9IC9eKGNvbnxwcm58YXV4fG51bHxjb21bMS05XXxscHRbMS05XSkoXFwuLiopPyQvaTtcbmNvbnN0IE9CU0lESUFOX0ZJTEVTID0gbmV3IFNldChbXG4gIFwiLm9ic2lkaWFuL2FwcC5qc29uXCIsIFwiLm9ic2lkaWFuL2FwcGVhcmFuY2UuanNvblwiLCBcIi5vYnNpZGlhbi9jb21tdW5pdHktcGx1Z2lucy5qc29uXCIsXG4gIFwiLm9ic2lkaWFuL2hvdGtleXMuanNvblwiLCBcIi5vYnNpZGlhbi93b3Jrc3BhY2UuanNvblwiLCBcIi5vYnNpZGlhbi93b3Jrc3BhY2UtbW9iaWxlLmpzb25cIlxuXSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVQYXRoKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gdmFsdWUubm9ybWFsaXplKFwiTkZDXCIpLnJlcGxhY2UoL1xcXFwvZywgXCIvXCIpLnJlcGxhY2UoL1xcLysvZywgXCIvXCIpLnJlcGxhY2UoL15cXC5cXC8vLCBcIlwiKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFzc2VydE1hbmFnZWRQYXRoKHZhbHVlOiBzdHJpbmcsIGluc3RhbGxSb290OiBzdHJpbmcpOiBzdHJpbmcge1xuICBjb25zdCBwYXRoID0gbm9ybWFsaXplUGF0aCh2YWx1ZSk7XG4gIGlmICghcGF0aCB8fCBwYXRoLmluY2x1ZGVzKFwiXFwwXCIpIHx8IHBhdGguc3RhcnRzV2l0aChcIi9cIikgfHwgL15bQS1aYS16XTovLnRlc3QocGF0aCkpIHRocm93IG5ldyBFcnJvcihgVW5zYWZlIHBhdGg6ICR7dmFsdWV9YCk7XG4gIGNvbnN0IHNlZ21lbnRzID0gcGF0aC5zcGxpdChcIi9cIik7XG4gIGlmIChzZWdtZW50cy5zb21lKChzZWdtZW50KSA9PiAhc2VnbWVudCB8fCBzZWdtZW50ID09PSBcIi5cIiB8fCBzZWdtZW50ID09PSBcIi4uXCIgfHwgL1s8PjpcInw/Kl0vLnRlc3Qoc2VnbWVudCkgfHwgUkVTRVJWRUQudGVzdChzZWdtZW50KSkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFVuc2FmZSBwYXRoOiAke3ZhbHVlfWApO1xuICB9XG4gIGlmIChwYXRoLnN0YXJ0c1dpdGgoYCR7aW5zdGFsbFJvb3R9L2ApKSB7XG4gICAgY29uc3QgY2hpbGQgPSBwYXRoLnNsaWNlKGluc3RhbGxSb290Lmxlbmd0aCArIDEpLnNwbGl0KFwiL1wiKVswXTtcbiAgICBpZiAoIShNQU5BR0VEX1JPT1RTIGFzIHJlYWRvbmx5IHN0cmluZ1tdKS5pbmNsdWRlcyhjaGlsZCkpIHRocm93IG5ldyBFcnJvcihgUGF0aCBpcyBvdXRzaWRlIG1hbmFnZWQgcm9vdHM6ICR7dmFsdWV9YCk7XG4gICAgcmV0dXJuIHBhdGg7XG4gIH1cbiAgaWYgKE9CU0lESUFOX0ZJTEVTLmhhcyhwYXRoKSB8fCAoIXBhdGguaW5jbHVkZXMoXCIvXCIpICYmICFwYXRoLnN0YXJ0c1dpdGgoXCIuXCIpKSkgcmV0dXJuIHBhdGg7XG4gIHRocm93IG5ldyBFcnJvcihgUGF0aCBpcyBvdXRzaWRlIHRoZSBtYW5hZ2VkIGJvdW5kYXJ5OiAke3ZhbHVlfWApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZW5zdXJlTm9QYXRoQ29uZmxpY3RzKHBhdGhzOiBzdHJpbmdbXSk6IHZvaWQge1xuICBjb25zdCBzb3J0ZWQgPSBbLi4ucGF0aHNdLnNvcnQoKTtcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCBzb3J0ZWQubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBpZiAoc29ydGVkW2ldLnN0YXJ0c1dpdGgoYCR7c29ydGVkW2kgLSAxXX0vYCkpIHRocm93IG5ldyBFcnJvcihgRmlsZS9kaXJlY3RvcnkgcGF0aCBjb25mbGljdDogJHtzb3J0ZWRbaSAtIDFdfWApO1xuICB9XG59XG4iLCAiaW1wb3J0IHsgTUFOQUdFRF9ST09UUywgUmVsZWFzZUVudHJ5LCBSZWxlYXNlTWFuaWZlc3QgfSBmcm9tIFwiLi90eXBlc1wiO1xuaW1wb3J0IHsgYXNzZXJ0TWFuYWdlZFBhdGgsIG5vcm1hbGl6ZVBhdGggfSBmcm9tIFwiLi9wYXRoLXBvbGljeVwiO1xuXG5jb25zdCBSRVFVSVJFRF9TVFJJTkdfRklFTERTID0gW1widGl0bGVcIiwgXCJtaW5pbXVtUGx1Z2luVmVyc2lvblwiLCBcIm1pbmltdW1PYnNpZGlhblZlcnNpb25cIl0gYXMgY29uc3Q7XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUFuZFZhbGlkYXRlTWFuaWZlc3QoaW5wdXQ6IHVua25vd24pOiBSZWxlYXNlTWFuaWZlc3Qge1xuICBpZiAoIWlzUmVjb3JkKGlucHV0KSkgdGhyb3cgbmV3IEVycm9yKFwiUmVsZWFzZSBtYW5pZmVzdCBtdXN0IGJlIGEgSlNPTiBvYmplY3QuXCIpO1xuICBmb3IgKGNvbnN0IGZvcmJpZGRlbiBvZiBbXCJzaWduYXR1cmVcIiwgXCJwYXlsb2FkXCIsIFwiY29sbGVjdGlvbktleVwiLCBcInNoYTI1NlwiLCBcInNpemVcIiwgXCJkb3dubG9hZFVybFwiLCBcInVybFwiXSkge1xuICAgIGlmIChmb3JiaWRkZW4gaW4gaW5wdXQpIHRocm93IG5ldyBFcnJvcihgTWFuaWZlc3QgY29udGFpbnMgdW5zdXBwb3J0ZWQgZmllbGQ6ICR7Zm9yYmlkZGVufS5gKTtcbiAgfVxuICBpZiAoaW5wdXQuc2NoZW1hVmVyc2lvbiAhPT0gMiB8fCBpbnB1dC5wcm9kdWN0ICE9PSBcIlRicGVkaWEtRGlzdHJpYnV0ZVwiIHx8IGlucHV0LnBsdWdpbiAhPT0gXCJ0YnBlZGlhLXVwZGF0ZVwiKSB0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIGlzIG5vdCBhIHN1cHBvcnRlZCBpbmNyZW1lbnRhbCBUYnBlZGlhIHJlbGVhc2UgbWFuaWZlc3QuXCIpO1xuICBpZiAoaW5wdXQuY2hhbm5lbCAhPT0gXCJzdGFibGVcIikgdGhyb3cgbmV3IEVycm9yKFwiT25seSB0aGUgc3RhYmxlIHJlbGVhc2UgY2hhbm5lbCBpcyBzdXBwb3J0ZWQuXCIpO1xuICBmb3IgKGNvbnN0IGZpZWxkIG9mIFJFUVVJUkVEX1NUUklOR19GSUVMRFMpIGlmICh0eXBlb2YgaW5wdXRbZmllbGRdICE9PSBcInN0cmluZ1wiIHx8ICFpbnB1dFtmaWVsZF0udHJpbSgpKSB0aHJvdyBuZXcgRXJyb3IoYE1hbmlmZXN0IGZpZWxkICR7ZmllbGR9IGlzIGludmFsaWQuYCk7XG4gIGlmICghaXNSZWNvcmQoaW5wdXQuY29sbGVjdGlvbikgfHwgIWlzQ29sbGVjdGlvblBhcnQoaW5wdXQuY29sbGVjdGlvbi5sYW5ndWFnZSwgXCJjb2RlXCIpIHx8ICFpc0NvbGxlY3Rpb25QYXJ0KGlucHV0LmNvbGxlY3Rpb24uc2VyaWVzLCBcImlkXCIpIHx8ICFpc0NvbGxlY3Rpb25QYXJ0KGlucHV0LmNvbGxlY3Rpb24uZWRpdGlvbiwgXCJpZFwiKSB8fCB0eXBlb2YgaW5wdXQuY29sbGVjdGlvbi5pbnN0YWxsUm9vdCAhPT0gXCJzdHJpbmdcIikgdGhyb3cgbmV3IEVycm9yKFwiQ29sbGVjdGlvbiBpZGVudGl0eSBpcyBpbnZhbGlkLlwiKTtcblxuICBjb25zdCBjb2xsZWN0aW9uID0gaW5wdXQuY29sbGVjdGlvbiBhcyBSZWxlYXNlTWFuaWZlc3RbXCJjb2xsZWN0aW9uXCJdO1xuICBjb25zdCBleHBlY3RlZFJvb3QgPSBbY29sbGVjdGlvbi5sYW5ndWFnZS5mb2xkZXIsIGNvbGxlY3Rpb24uc2VyaWVzLmZvbGRlciwgY29sbGVjdGlvbi5lZGl0aW9uLmZvbGRlcl0uam9pbihcIi9cIik7XG4gIGlmIChub3JtYWxpemVQYXRoKGNvbGxlY3Rpb24uaW5zdGFsbFJvb3QpICE9PSBub3JtYWxpemVQYXRoKGV4cGVjdGVkUm9vdCkpIHRocm93IG5ldyBFcnJvcihcImluc3RhbGxSb290IGRvZXMgbm90IG1hdGNoIGNvbGxlY3Rpb24gZm9sZGVycy5cIik7XG4gIGlmICghQXJyYXkuaXNBcnJheShpbnB1dC5tYW5hZ2VkUm9vdHMpIHx8ICFzYW1lU2V0KGlucHV0Lm1hbmFnZWRSb290cywgWy4uLk1BTkFHRURfUk9PVFNdKSkgdGhyb3cgbmV3IEVycm9yKFwibWFuYWdlZFJvb3RzIGRvZXMgbm90IG1hdGNoIHRoZSBhcHByb3ZlZCBib3VuZGFyeS5cIik7XG4gIGlmICghQXJyYXkuaXNBcnJheShpbnB1dC5yZWxlYXNlcykgfHwgaW5wdXQucmVsZWFzZXMubGVuZ3RoID09PSAwKSB0aHJvdyBuZXcgRXJyb3IoXCJyZWxlYXNlcyBtdXN0IGJlIGEgbm9uLWVtcHR5IGFycmF5LlwiKTtcblxuICBjb25zdCByZWxlYXNlcyA9IGlucHV0LnJlbGVhc2VzLm1hcCgoZW50cnkpID0+IHBhcnNlUmVsZWFzZShlbnRyeSwgbm9ybWFsaXplUGF0aChjb2xsZWN0aW9uLmluc3RhbGxSb290KSkpO1xuICBjb25zdCBpZHMgPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHJlbGVhc2VzLmxlbmd0aDsgaW5kZXggKz0gMSkge1xuICAgIGNvbnN0IHJlbGVhc2UgPSByZWxlYXNlc1tpbmRleF07XG4gICAgaWYgKGlkcy5oYXMocmVsZWFzZS5yZWxlYXNlSWQpKSB0aHJvdyBuZXcgRXJyb3IoYER1cGxpY2F0ZSByZWxlYXNlSWQ6ICR7cmVsZWFzZS5yZWxlYXNlSWR9LmApO1xuICAgIGlkcy5hZGQocmVsZWFzZS5yZWxlYXNlSWQpO1xuICAgIGlmIChpbmRleCA+IDAgJiYgY29tcGFyZVJlbGVhc2UocmVsZWFzZXNbaW5kZXggLSAxXSwgcmVsZWFzZSkgPj0gMCkgdGhyb3cgbmV3IEVycm9yKFwicmVsZWFzZXMgbXVzdCBiZSBpbiBzdHJpY3RseSBpbmNyZWFzaW5nIHZlcnNpb24gYW5kIHB1YmxpY2F0aW9uIG9yZGVyLlwiKTtcbiAgfVxuICByZXR1cm4geyAuLi5pbnB1dCwgcmVsZWFzZXMgfSBhcyBSZWxlYXNlTWFuaWZlc3Q7XG59XG5cbmZ1bmN0aW9uIHBhcnNlUmVsZWFzZShpbnB1dDogdW5rbm93biwgaW5zdGFsbFJvb3Q6IHN0cmluZyk6IFJlbGVhc2VFbnRyeSB7XG4gIGlmICghaXNSZWNvcmQoaW5wdXQpKSB0aHJvdyBuZXcgRXJyb3IoXCJFYWNoIHJlbGVhc2UgbXVzdCBiZSBhbiBvYmplY3QuXCIpO1xuICBmb3IgKGNvbnN0IGZpZWxkIG9mIFtcInJlbGVhc2VWZXJzaW9uXCIsIFwicmVsZWFzZUlkXCIsIFwicHVibGlzaGVkQXRcIiwgXCJmaWxlbmFtZVwiXSBhcyBjb25zdCkgaWYgKHR5cGVvZiBpbnB1dFtmaWVsZF0gIT09IFwic3RyaW5nXCIgfHwgIWlucHV0W2ZpZWxkXS50cmltKCkpIHRocm93IG5ldyBFcnJvcihgUmVsZWFzZSBmaWVsZCAke2ZpZWxkfSBpcyBpbnZhbGlkLmApO1xuICBjb25zdCB2ZXJzaW9uRGF0ZSA9IHBhcnNlVmVyc2lvbkRhdGUoaW5wdXQucmVsZWFzZVZlcnNpb24pO1xuICBpZiAoIXZlcnNpb25EYXRlKSB0aHJvdyBuZXcgRXJyb3IoXCJyZWxlYXNlVmVyc2lvbiBtdXN0IGJlIGEgZGF0ZS1iYXNlZCB2ZXJzaW9uLlwiKTtcbiAgY29uc3QgcmVsZWFzZUlkID0gcGFyc2VSZWxlYXNlSWQoaW5wdXQucmVsZWFzZUlkKTtcbiAgaWYgKCFyZWxlYXNlSWQpIHRocm93IG5ldyBFcnJvcihcInJlbGVhc2VJZCBtdXN0IGhhdmUgdGhlIGZvcm1hdCBZWVlZLU0tRC5zZXF1ZW5jZSwgZm9yIGV4YW1wbGUgMjAyNi0xMC0xLjEuXCIpO1xuICBpZiAocmVsZWFzZUlkLnllYXIgIT09IHZlcnNpb25EYXRlLnllYXIgfHwgcmVsZWFzZUlkLm1vbnRoICE9PSB2ZXJzaW9uRGF0ZS5tb250aCB8fCByZWxlYXNlSWQuZGF5ICE9PSB2ZXJzaW9uRGF0ZS5kYXkpIHRocm93IG5ldyBFcnJvcihcInJlbGVhc2VJZCBkYXRlIG11c3QgbWF0Y2ggcmVsZWFzZVZlcnNpb24uXCIpO1xuICBpZiAoTnVtYmVyLmlzTmFOKERhdGUucGFyc2UoaW5wdXQucHVibGlzaGVkQXQpKSkgdGhyb3cgbmV3IEVycm9yKFwicHVibGlzaGVkQXQgbXVzdCBiZSBJU08tODYwMS5cIik7XG4gIGlmICghQXJyYXkuaXNBcnJheShpbnB1dC5maWxlcykgfHwgIUFycmF5LmlzQXJyYXkoaW5wdXQuZGVsZXRpb25zKSkgdGhyb3cgbmV3IEVycm9yKFwiZmlsZXMgYW5kIGRlbGV0aW9ucyBtdXN0IGJlIGFycmF5cy5cIik7XG4gIGNvbnN0IGZpbGVzID0gaW5wdXQuZmlsZXMubWFwKChlbnRyeSkgPT4ge1xuICAgIGlmICghaXNSZWNvcmQoZW50cnkpIHx8IHR5cGVvZiBlbnRyeS5wYXRoICE9PSBcInN0cmluZ1wiKSB0aHJvdyBuZXcgRXJyb3IoXCJFYWNoIGZpbGUgZW50cnkgbmVlZHMgYSBwYXRoLlwiKTtcbiAgICByZXR1cm4geyBwYXRoOiBhc3NlcnRNYW5hZ2VkUGF0aChlbnRyeS5wYXRoLCBpbnN0YWxsUm9vdCkgfTtcbiAgfSk7XG4gIGNvbnN0IGRlbGV0aW9ucyA9IGlucHV0LmRlbGV0aW9ucy5tYXAoKHBhdGgpID0+IHtcbiAgICBpZiAodHlwZW9mIHBhdGggIT09IFwic3RyaW5nXCIpIHRocm93IG5ldyBFcnJvcihcIkVhY2ggZGVsZXRpb24gbXVzdCBiZSBhIHBhdGguXCIpO1xuICAgIHJldHVybiBhc3NlcnRNYW5hZ2VkUGF0aChwYXRoLCBpbnN0YWxsUm9vdCk7XG4gIH0pO1xuICBjb25zdCBhbGxQYXRocyA9IFsuLi5maWxlcy5tYXAoKGZpbGUpID0+IGZpbGUucGF0aCksIC4uLmRlbGV0aW9uc107XG4gIGlmIChuZXcgU2V0KGFsbFBhdGhzKS5zaXplICE9PSBhbGxQYXRocy5sZW5ndGgpIHRocm93IG5ldyBFcnJvcihgUmVsZWFzZSAke2lucHV0LnJlbGVhc2VJZH0gY29udGFpbnMgZHVwbGljYXRlIG9yIGNvbmZsaWN0aW5nIHBhdGhzLmApO1xuICBpZiAoIWlzUmVjb3JkKGlucHV0LnJlbGVhc2VOb3RlcykgfHwgdHlwZW9mIGlucHV0LnJlbGVhc2VOb3Rlcy5zdW1tYXJ5ICE9PSBcInN0cmluZ1wiIHx8ICFbXCJhZGRlZFwiLCBcInVwZGF0ZWRcIiwgXCJyZW1vdmVkXCJdLmV2ZXJ5KChrZXkpID0+IHR5cGVvZiBpbnB1dC5yZWxlYXNlTm90ZXNba2V5XSA9PT0gXCJudW1iZXJcIiAmJiBpbnB1dC5yZWxlYXNlTm90ZXNba2V5XSA+PSAwKSkgdGhyb3cgbmV3IEVycm9yKFwicmVsZWFzZU5vdGVzIGlzIGludmFsaWQuXCIpO1xuICByZXR1cm4geyByZWxlYXNlVmVyc2lvbjogaW5wdXQucmVsZWFzZVZlcnNpb24sIHJlbGVhc2VJZDogaW5wdXQucmVsZWFzZUlkLCBwdWJsaXNoZWRBdDogaW5wdXQucHVibGlzaGVkQXQsIGZpbGVuYW1lOiBpbnB1dC5maWxlbmFtZSwgZmlsZXMsIGRlbGV0aW9ucywgcmVsZWFzZU5vdGVzOiBpbnB1dC5yZWxlYXNlTm90ZXMgYXMgUmVsZWFzZUVudHJ5W1wicmVsZWFzZU5vdGVzXCJdIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb21wYXJlVmVyc2lvbnMoYTogc3RyaW5nLCBiOiBzdHJpbmcpOiBudW1iZXIge1xuICBjb25zdCBwYXJzZSA9ICh2YWx1ZTogc3RyaW5nKSA9PiB2YWx1ZS5yZXBsYWNlKC9edi8sIFwiXCIpLnNwbGl0KC9bListXS8pLnNsaWNlKDAsIDMpLm1hcCgocGFydCkgPT4gTnVtYmVyLnBhcnNlSW50KHBhcnQsIDEwKSB8fCAwKTtcbiAgY29uc3QgbGVmdCA9IHBhcnNlKGEpOyBjb25zdCByaWdodCA9IHBhcnNlKGIpO1xuICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgMzsgaW5kZXggKz0gMSkgaWYgKGxlZnRbaW5kZXhdICE9PSByaWdodFtpbmRleF0pIHJldHVybiBsZWZ0W2luZGV4XSAtIHJpZ2h0W2luZGV4XTtcbiAgcmV0dXJuIDA7XG59XG5leHBvcnQgZnVuY3Rpb24gY29tcGFyZVJlbGVhc2UoYTogUmVsZWFzZUVudHJ5LCBiOiBSZWxlYXNlRW50cnkpOiBudW1iZXIge1xuICBjb25zdCB2ZXJzaW9uID0gY29tcGFyZVZlcnNpb25zKGEucmVsZWFzZVZlcnNpb24sIGIucmVsZWFzZVZlcnNpb24pO1xuICBpZiAodmVyc2lvbikgcmV0dXJuIHZlcnNpb247XG4gIGNvbnN0IHNlcXVlbmNlID0gcGFyc2VSZWxlYXNlSWQoYS5yZWxlYXNlSWQpIS5zZXF1ZW5jZSAtIHBhcnNlUmVsZWFzZUlkKGIucmVsZWFzZUlkKSEuc2VxdWVuY2U7XG4gIHJldHVybiBzZXF1ZW5jZSB8fCBEYXRlLnBhcnNlKGEucHVibGlzaGVkQXQpIC0gRGF0ZS5wYXJzZShiLnB1Ymxpc2hlZEF0KTtcbn1cbmZ1bmN0aW9uIHBhcnNlVmVyc2lvbkRhdGUodmFsdWU6IHN0cmluZyk6IHsgeWVhcjogbnVtYmVyOyBtb250aDogbnVtYmVyOyBkYXk6IG51bWJlciB9IHwgdW5kZWZpbmVkIHtcbiAgY29uc3QgbWF0Y2ggPSAvXihcXGR7NH0pXFwuKFxcZHsxLDJ9KVxcLihcXGR7MSwyfSkoPzpbLStdWzAtOUEtWmEtei4tXSspPyQvLmV4ZWModmFsdWUpO1xuICByZXR1cm4gbWF0Y2ggJiYgdmFsaWREYXRlKE51bWJlcihtYXRjaFsxXSksIE51bWJlcihtYXRjaFsyXSksIE51bWJlcihtYXRjaFszXSkpID8geyB5ZWFyOiBOdW1iZXIobWF0Y2hbMV0pLCBtb250aDogTnVtYmVyKG1hdGNoWzJdKSwgZGF5OiBOdW1iZXIobWF0Y2hbM10pIH0gOiB1bmRlZmluZWQ7XG59XG5mdW5jdGlvbiBwYXJzZVJlbGVhc2VJZCh2YWx1ZTogc3RyaW5nKTogeyB5ZWFyOiBudW1iZXI7IG1vbnRoOiBudW1iZXI7IGRheTogbnVtYmVyOyBzZXF1ZW5jZTogbnVtYmVyIH0gfCB1bmRlZmluZWQge1xuICBjb25zdCBtYXRjaCA9IC9eKFxcZHs0fSktKFxcZHsxLDJ9KS0oXFxkezEsMn0pXFwuKFxcZCspJC8uZXhlYyh2YWx1ZSk7XG4gIGlmICghbWF0Y2gpIHJldHVybiB1bmRlZmluZWQ7XG4gIGNvbnN0IHllYXIgPSBOdW1iZXIobWF0Y2hbMV0pOyBjb25zdCBtb250aCA9IE51bWJlcihtYXRjaFsyXSk7IGNvbnN0IGRheSA9IE51bWJlcihtYXRjaFszXSk7IGNvbnN0IHNlcXVlbmNlID0gTnVtYmVyKG1hdGNoWzRdKTtcbiAgcmV0dXJuIHZhbGlkRGF0ZSh5ZWFyLCBtb250aCwgZGF5KSAmJiBOdW1iZXIuaXNTYWZlSW50ZWdlcihzZXF1ZW5jZSkgJiYgc2VxdWVuY2UgPj0gMSA/IHsgeWVhciwgbW9udGgsIGRheSwgc2VxdWVuY2UgfSA6IHVuZGVmaW5lZDtcbn1cbmZ1bmN0aW9uIHZhbGlkRGF0ZSh5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXIsIGRheTogbnVtYmVyKTogYm9vbGVhbiB7IGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShEYXRlLlVUQyh5ZWFyLCBtb250aCAtIDEsIGRheSkpOyByZXR1cm4gZGF0ZS5nZXRVVENGdWxsWWVhcigpID09PSB5ZWFyICYmIGRhdGUuZ2V0VVRDTW9udGgoKSA9PT0gbW9udGggLSAxICYmIGRhdGUuZ2V0VVRDRGF0ZSgpID09PSBkYXk7IH1cbmZ1bmN0aW9uIGlzQ29sbGVjdGlvblBhcnQodmFsdWU6IHVua25vd24sIGlkZW50aXR5OiBcImNvZGVcIiB8IFwiaWRcIik6IHZhbHVlIGlzIFJlY29yZDxzdHJpbmcsIHN0cmluZz4geyByZXR1cm4gaXNSZWNvcmQodmFsdWUpICYmIHR5cGVvZiB2YWx1ZVtpZGVudGl0eV0gPT09IFwic3RyaW5nXCIgJiYgdHlwZW9mIHZhbHVlLm5hbWUgPT09IFwic3RyaW5nXCIgJiYgdHlwZW9mIHZhbHVlLmZvbGRlciA9PT0gXCJzdHJpbmdcIjsgfVxuZnVuY3Rpb24gaXNSZWNvcmQodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBSZWNvcmQ8c3RyaW5nLCBhbnk+IHsgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJiB2YWx1ZSAhPT0gbnVsbCAmJiAhQXJyYXkuaXNBcnJheSh2YWx1ZSk7IH1cbmZ1bmN0aW9uIHNhbWVTZXQodmFsdWVzOiB1bmtub3duW10sIGV4cGVjdGVkOiBzdHJpbmdbXSk6IGJvb2xlYW4geyByZXR1cm4gdmFsdWVzLmxlbmd0aCA9PT0gZXhwZWN0ZWQubGVuZ3RoICYmIG5ldyBTZXQodmFsdWVzKS5zaXplID09PSB2YWx1ZXMubGVuZ3RoICYmIHZhbHVlcy5ldmVyeSgodmFsdWUpID0+IHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiAmJiBleHBlY3RlZC5pbmNsdWRlcyh2YWx1ZSkpOyB9XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBLGtGQUFBQSxTQUFBO0FBWUEsTUFBQyxTQUFTLEdBQUU7QUFBQyxVQUFHLFlBQVUsT0FBTyxXQUFTLGVBQWEsT0FBT0EsUUFBTyxDQUFBQSxRQUFPLFVBQVEsRUFBRTtBQUFBLGVBQVUsY0FBWSxPQUFPLFVBQVEsT0FBTyxJQUFJLFFBQU8sQ0FBQyxHQUFFLENBQUM7QUFBQSxXQUFNO0FBQUMsU0FBQyxlQUFhLE9BQU8sU0FBTyxTQUFPLGVBQWEsT0FBTyxTQUFPLFNBQU8sZUFBYSxPQUFPLE9BQUssT0FBSyxNQUFNLFFBQU0sRUFBRTtBQUFBLE1BQUM7QUFBQSxJQUFDLEdBQUUsV0FBVTtBQUFDLGNBQU8sU0FBUyxFQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsaUJBQVMsRUFBRSxHQUFFQyxJQUFFO0FBQUMsY0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFFO0FBQUMsZ0JBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRTtBQUFDLGtCQUFJLElBQUUsY0FBWSxPQUFPLFdBQVM7QUFBUSxrQkFBRyxDQUFDQSxNQUFHLEVBQUUsUUFBTyxFQUFFLEdBQUUsSUFBRTtBQUFFLGtCQUFHLEVBQUUsUUFBTyxFQUFFLEdBQUUsSUFBRTtBQUFFLGtCQUFJLElBQUUsSUFBSSxNQUFNLHlCQUF1QixJQUFFLEdBQUc7QUFBRSxvQkFBTSxFQUFFLE9BQUssb0JBQW1CO0FBQUEsWUFBQztBQUFDLGdCQUFJLElBQUUsRUFBRSxDQUFDLElBQUUsRUFBQyxTQUFRLENBQUMsRUFBQztBQUFFLGNBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsU0FBUSxTQUFTQSxJQUFFO0FBQUMsa0JBQUlDLEtBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFRCxFQUFDO0FBQUUscUJBQU8sRUFBRUMsTUFBR0QsRUFBQztBQUFBLFlBQUMsR0FBRSxHQUFFLEVBQUUsU0FBUSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsVUFBQztBQUFDLGlCQUFPLEVBQUUsQ0FBQyxFQUFFO0FBQUEsUUFBTztBQUFDLGlCQUFRLElBQUUsY0FBWSxPQUFPLFdBQVMsU0FBUSxJQUFFLEdBQUUsSUFBRSxFQUFFLFFBQU8sSUFBSSxHQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQUUsZUFBTztBQUFBLE1BQUMsR0FBRSxFQUFDLEdBQUUsQ0FBQyxTQUFTLEdBQUUsR0FBRSxHQUFFO0FBQUM7QUFBYSxZQUFJLElBQUUsRUFBRSxTQUFTLEdBQUUsSUFBRSxFQUFFLFdBQVcsR0FBRSxJQUFFO0FBQW9FLFVBQUUsU0FBTyxTQUFTQSxJQUFFO0FBQUMsbUJBQVFDLElBQUVDLElBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLElBQUUsQ0FBQyxHQUFFLElBQUUsR0FBRSxJQUFFRixHQUFFLFFBQU8sSUFBRSxHQUFFRyxLQUFFLGFBQVcsRUFBRSxVQUFVSCxFQUFDLEdBQUUsSUFBRUEsR0FBRSxTQUFRLEtBQUUsSUFBRSxHQUFFLElBQUVHLE1BQUdGLEtBQUVELEdBQUUsR0FBRyxHQUFFRSxLQUFFLElBQUUsSUFBRUYsR0FBRSxHQUFHLElBQUUsR0FBRSxJQUFFLElBQUVBLEdBQUUsR0FBRyxJQUFFLE1BQUlDLEtBQUVELEdBQUUsV0FBVyxHQUFHLEdBQUVFLEtBQUUsSUFBRSxJQUFFRixHQUFFLFdBQVcsR0FBRyxJQUFFLEdBQUUsSUFBRSxJQUFFQSxHQUFFLFdBQVcsR0FBRyxJQUFFLElBQUcsSUFBRUMsTUFBRyxHQUFFLEtBQUcsSUFBRUEsT0FBSSxJQUFFQyxNQUFHLEdBQUUsSUFBRSxJQUFFLEtBQUcsS0FBR0EsT0FBSSxJQUFFLEtBQUcsSUFBRSxJQUFHLElBQUUsSUFBRSxJQUFFLEtBQUcsSUFBRSxJQUFHLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxJQUFFLEVBQUUsT0FBTyxDQUFDLElBQUUsRUFBRSxPQUFPLENBQUMsSUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQUUsaUJBQU8sRUFBRSxLQUFLLEVB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QUFLLEtBQUssUUFBT0EsS0FBSSxDQUFBRCxHQUFFQyxFQUFDLElBQUUsTUFBSUQsR0FBRUMsRUFBQztBQUFBLFFBQUM7QUFBQyxVQUFFLFVBQVUsRUFBRSxTQUFTLEdBQUUsQ0FBQyxHQUFFLEVBQUUsVUFBVSxTQUFPLFNBQVNELElBQUU7QUFBQyxpQkFBTyxLQUFLLEtBQUssS0FBSyxPQUFLQSxFQUFDO0FBQUEsUUFBQyxHQUFFLEVBQUUsVUFBVSx1QkFBcUIsU0FBU0EsSUFBRTtBQUFDLG1CQUFRQyxLQUFFRCxHQUFFLFdBQVcsQ0FBQyxHQUFFRSxLQUFFRixHQUFFLFdBQVcsQ0FBQyxHQUFFSSxLQUFFSixHQUFFLFdBQVcsQ0FBQyxHQUFFSyxLQUFFTCxHQUFFLFdBQVcsQ0FBQyxHQUFFLElBQUUsS0FBSyxTQUFPLEdBQUUsS0FBRyxHQUFFLEVBQUUsRUFBRSxLQUFHLEtBQUssS0FBSyxDQUFDLE1BQUlDLE1BQUcsS0FBSyxLQUFLLElBQUUsQ0FBQyxNQUFJQyxNQUFHLEtBQUssS0FBSyxJQUFFLENBQUMsTUFBSUUsTUFBRyxLQUFLLEtBQUssSUFBRSxDQUFDLE1BQUlDLEdBQUUsUUFBTyxJQUFFLEtBQUs7QUFBSyxpQkFBTTtBQUFBLFFBQUUsR0FBRSxFQUFFLFVBQVUsd0JBQXNCLFNBQVNMLElBQUU7QUFBQyxjQUFJQyxLQUFFRCxHQUFFLFdBQVcsQ0FBQyxHQUFFRSxLQUFFRixHQUFFLFdBQVcsQ0FBQyxHQUFFSSxLQUFFSixHQUFFLFdBQVcsQ0FBQyxHQUFFSyxLQUFFTCxHQUFFLFdBQVcsQ0FBQyxHQUFFLElBQUUsS0FBSyxTQUFTLENBQUM7QUFBRSxpQkFBT0MsT0FBSSxFQUFFLENBQUMsS0FBR0MsT0FBSSxFQUFFLENBQUMsS0FBR0UsT0FBSSxFQUFFLENBQUMsS0FBR0MsT0FBSSxFQUFFLENBQUM7QUFBQSxRQUFDLEdBQUUsRUFBRSxVQUFVLFdBQVMsU0FBU0wsSUFBRTtBQUFDLGNBQUcsS0FBSyxZQUFZQSxFQUFDLEdBQUUsTUFBSUEsR0FBRSxRQUFNLENBQUM7QUFBRSxjQUFJQyxL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TyxJQUFJLFdBQVdBLEVBQUM7QUFBQSxRQUFDLEdBQUUsWUFBVyxTQUFTQSxJQUFFO0FBQUMsaUJBQU8sRUFBRSxjQUFjQSxFQUFDO0FBQUEsUUFBQyxFQUFDLEdBQUUsRUFBRSxjQUFZLEVBQUMsUUFBTyxTQUFTQSxJQUFFO0FBQUMsaUJBQU8sRUFBRSxJQUFJLFdBQVdBLEVBQUMsQ0FBQztBQUFBLFFBQUMsR0FBRSxPQUFNLFNBQVNBLElBQUU7QUFBQyxpQkFBTyxFQUFFLElBQUksV0FBV0EsRUFBQyxHQUFFLElBQUksTUFBTUEsR0FBRSxVQUFVLENBQUM7QUFBQSxRQUFDLEdBQUUsYUFBWSxHQUFFLFlBQVcsU0FBU0EsSUFBRTtBQUFDLGlCQUFPLElBQUksV0FBV0EsRUFBQztBQUFBLFFBQUMsR0FBRSxZQUFXLFNBQVNBLElBQUU7QUFBQyxpQkFBTyxFQUFFLGNBQWMsSUFBSSxXQUFXQSxFQUFDLENBQUM7QUFBQSxRQUFDLEVBQUMsR0FBRSxFQUFFLGFBQVcsRUFBQyxRQUFPLEdBQUUsT0FBTSxTQUFTQSxJQUFFO0FBQUMsaUJBQU8sRUFBRUEsSUFBRSxJQUFJLE1BQU1BLEdBQUUsTUFBTSxDQUFDO0FBQUEsUUFBQyxHQUFFLGFBQVksU0FBU0EsSUFBRTtBQUFDLGlCQUFPQSxHQUFFO0FBQUEsUUFBTSxHQUFFLFlBQVcsR0FBRSxZQUFXLFNBQVNBLElBQUU7QUFBQyxpQkFBTyxFQUFFLGNBQWNBLEVBQUM7QUFBQSxRQUFDLEVBQUMsR0FBRSxFQUFFLGFBQVcsRUFBQyxRQUFPLEdBQUUsT0FBTSxTQUFTQSxJQUFFO0FBQUMsaUJBQU8sRUFBRUEsSUFBRSxJQUFJLE1BQU1BLEdBQUUsTUFBTSxDQUFDO0FBQUEsUUFBQyxHQUFFLGFBQVksU0FBU0EsSUFBRTtBQUFDLGlCQUFPLEVBQUUsV0FBVyxXQUFXQSxFQUFDLEVBQUU7QUFBQSxRQUFNLEdBQUUsWUFBVyxTQUFTQSxJQUFFO0FBQUMsaUJBQU8sRUFBRUEsSUFBRSxJQUFJLFdBQVdBLEdBQUUsTUFBTSxDQUFDO0FBQUEsUUFBQyxHQUFFLFlBQVcs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QUFFLElBQUUsR0FBRSxJQUFJLENBQUFBLEtBQUVBLE9BQUksSUFBRSxFQUFFLE9BQUtBLEtBQUVDLEdBQUUsQ0FBQyxFQUFFO0FBQUUsaUJBQU0sS0FBR0Q7QUFBQSxRQUFDO0FBQUEsTUFBQyxHQUFFLENBQUMsQ0FBQyxHQUFFLElBQUcsQ0FBQyxTQUFTLEdBQUUsR0FBRSxHQUFFO0FBQUM7QUFBYSxZQUFJLEdBQUUsSUFBRSxFQUFFLGlCQUFpQixHQUFFLElBQUUsRUFBRSxTQUFTLEdBQUUsSUFBRSxFQUFFLFdBQVcsR0FBRSxJQUFFLEVBQUUsU0FBUyxHQUFFLElBQUUsRUFBRSxZQUFZLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxJQUFHLElBQUUsSUFBRyxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxLQUFJLElBQUUsSUFBRyxJQUFFLElBQUcsSUFBRSxJQUFFLElBQUUsR0FBRSxJQUFFLElBQUcsSUFBRSxHQUFFLElBQUUsS0FBSSxJQUFFLElBQUUsSUFBRSxHQUFFLElBQUUsSUFBRyxJQUFFLEtBQUksSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRTtBQUFFLGlCQUFTLEVBQUVBLElBQUVDLElBQUU7QUFBQyxpQkFBT0QsR0FBRSxNQUFJLEVBQUVDLEVBQUMsR0FBRUE7QUFBQSxRQUFDO0FBQUMsaUJBQVMsRUFBRUQsSUFBRTtBQUFDLGtCQUFPQSxNQUFHLE1BQUksSUFBRUEsS0FBRSxJQUFFO0FBQUEsUUFBRTtBQUFDLGlCQUFTLEVBQUVBLElBQUU7QUFBQyxtQkFBUUMsS0FBRUQsR0FBRSxRQUFPLEtBQUcsRUFBRUMsS0FBRyxDQUFBRCxHQUFFQyxFQUFDLElBQUU7QUFBQSxRQUFDO0FBQUMsaUJBQVMsRUFBRUQsSUFBRTtBQUFDLGNBQUlDLEtBQUVELEdBQUUsT0FBTUUsS0FBRUQsR0FBRTtBQUFRLFVBQUFDLEtBQUVGLEdBQUUsY0FBWUUsS0FBRUYsR0FBRSxZQUFXLE1BQUlFLE9BQUksRUFBRSxTQUFTRixH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TUFBTSxJQUFFLENBQUMsR0FBRSxLQUFLLFlBQVUsSUFBSSxFQUFFLE1BQU0sS0FBRyxJQUFFLElBQUUsRUFBRSxHQUFFLEtBQUssVUFBUSxJQUFJLEVBQUUsTUFBTSxLQUFHLElBQUUsSUFBRSxFQUFFLEdBQUUsRUFBRSxLQUFLLFNBQVMsR0FBRSxFQUFFLEtBQUssU0FBUyxHQUFFLEVBQUUsS0FBSyxPQUFPLEdBQUUsS0FBSyxTQUFPLE1BQUssS0FBSyxTQUFPLE1BQUssS0FBSyxVQUFRLE1BQUssS0FBSyxXQUFTLElBQUksRUFBRSxNQUFNLElBQUUsQ0FBQyxHQUFFLEtBQUssT0FBSyxJQUFJLEVBQUUsTUFBTSxJQUFFLElBQUUsQ0FBQyxHQUFFLEVBQUUsS0FBSyxJQUFJLEdBQUUsS0FBSyxXQUFTLEdBQUUsS0FBSyxXQUFTLEdBQUUsS0FBSyxRQUFNLElBQUksRUFBRSxNQUFNLElBQUUsSUFBRSxDQUFDLEdBQUUsRUFBRSxLQUFLLEtBQUssR0FBRSxLQUFLLFFBQU0sR0FBRSxLQUFLLGNBQVksR0FBRSxLQUFLLFdBQVMsR0FBRSxLQUFLLFFBQU0sR0FBRSxLQUFLLFVBQVEsR0FBRSxLQUFLLGFBQVcsR0FBRSxLQUFLLFVBQVEsR0FBRSxLQUFLLFNBQU8sR0FBRSxLQUFLLFNBQU8sR0FBRSxLQUFLLFdBQVM7QUFBQSxRQUFDO0FBQUMsaUJBQVMsRUFBRUwsSUFBRTtBQUFDLGNBQUlDO0FBQUUsaUJBQU9ELE1BQUdBLEdBQUUsU0FBT0EsR0FBRSxXQUFTQSxHQUFFLFlBQVUsR0FBRUEsR0FBRSxZQUFVLElBQUdDLEtBQUVELEdBQUUsT0FBTyxVQUFRLEdBQUVDLEdBQUUsY0FBWSxHQUFFQSxHQUFFLE9BQUssTUFBSUEsR0FBRSxPQUFLLENBQUNBLEdBQUUsT0FBTUEsR0FBRSxTQUFPQSxHQUFFLE9BQUssSUFBRSxHQUFFRCxHQUFFLFFBQU0sTUFBSUMsR0FBRSxPQUFLLElBQUUsR0FBRUEsR0FBRSxhQUFXLEdBQUUsRUFBRSxTQUFTQSxFQUFDLEdBQUUsS0FBRyxFQUFFRCxJQUFFLENBQUM7QUFB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QUdBLEdBQUUsUUFBTTtBQUFBLFVBQUM7QUFBQyxjQUFHLE9BQUtJLEdBQUUsT0FBTyxLQUFHQSxHQUFFLE9BQU8sT0FBTTtBQUFDLGlCQUFJQyxLQUFFRCxHQUFFLFNBQVFBLEdBQUUsV0FBUyxRQUFNQSxHQUFFLE9BQU8sTUFBTSxZQUFVQSxHQUFFLFlBQVVBLEdBQUUscUJBQW1CQSxHQUFFLE9BQU8sUUFBTUEsR0FBRSxVQUFRQyxPQUFJTCxHQUFFLFFBQU0sRUFBRUEsR0FBRSxPQUFNSSxHQUFFLGFBQVlBLEdBQUUsVUFBUUMsSUFBRUEsRUFBQyxJQUFHLEVBQUVMLEVBQUMsR0FBRUssS0FBRUQsR0FBRSxTQUFRQSxHQUFFLFlBQVVBLEdBQUUscUJBQW9CLEdBQUVBLElBQUUsTUFBSUEsR0FBRSxPQUFPLE1BQU1BLEdBQUUsT0FBTyxDQUFDLEdBQUVBLEdBQUU7QUFBVSxZQUFBQSxHQUFFLE9BQU8sUUFBTUEsR0FBRSxVQUFRQyxPQUFJTCxHQUFFLFFBQU0sRUFBRUEsR0FBRSxPQUFNSSxHQUFFLGFBQVlBLEdBQUUsVUFBUUMsSUFBRUEsRUFBQyxJQUFHRCxHQUFFLFlBQVVBLEdBQUUsT0FBTyxNQUFNLFdBQVNBLEdBQUUsVUFBUSxHQUFFQSxHQUFFLFNBQU87QUFBQSxVQUFHLE1BQU0sQ0FBQUEsR0FBRSxTQUFPO0FBQUcsY0FBRyxPQUFLQSxHQUFFLE9BQU8sS0FBR0EsR0FBRSxPQUFPLE1BQUs7QUFBQyxZQUFBQyxLQUFFRCxHQUFFO0FBQVEsZUFBRTtBQUFDLGtCQUFHQSxHQUFFLFlBQVVBLEdBQUUscUJBQW1CQSxHQUFFLE9BQU8sUUFBTUEsR0FBRSxVQUFRQyxPQUFJTCxHQUFFLFFBQU0sRUFBRUEsR0FBRSxPQUFNSSxHQUFFLGFBQVlBLEdBQUUsVUFBUUMsSUFBRUEsRUFBQyxJQUFHLEVBQUVMLEVBQUMsR0FBRUssS0FBRUQsR0FBRSxTQUFRQSxHQUFFLFlBQVVBLEdBQUUsbUJBQWtCO0FBQUMsZ0JBQUFFLEtBQUU7QUFBRTtBQUFBLGNBQUs7QUFBQyxjQUFBQSxLQUFFRixHQUFFLFVB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SUFBR0UsR0FBRSxPQUFLLEdBQUVBLEdBQUUsT0FBSztBQUFBLFFBQUM7QUFBQSxNQUFDLEdBQUUsQ0FBQyxDQUFDLEdBQUUsSUFBRyxDQUFDLFNBQVMsR0FBRSxHQUFFLEdBQUU7QUFBQztBQUFhLFlBQUksSUFBRSxFQUFFLGlCQUFpQixHQUFFLElBQUUsRUFBRSxXQUFXLEdBQUUsSUFBRSxFQUFFLFNBQVMsR0FBRSxJQUFFLEVBQUUsV0FBVyxHQUFFLElBQUUsRUFBRSxZQUFZLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxJQUFHLElBQUUsR0FBRSxJQUFFLEtBQUksSUFBRTtBQUFJLGlCQUFTLEVBQUVGLElBQUU7QUFBQyxrQkFBT0EsT0FBSSxLQUFHLFFBQU1BLE9BQUksSUFBRSxXQUFTLFFBQU1BLE9BQUksT0FBSyxNQUFJQSxPQUFJO0FBQUEsUUFBRztBQUFDLGlCQUFTLElBQUc7QUFBQyxlQUFLLE9BQUssR0FBRSxLQUFLLE9BQUssT0FBRyxLQUFLLE9BQUssR0FBRSxLQUFLLFdBQVMsT0FBRyxLQUFLLFFBQU0sR0FBRSxLQUFLLE9BQUssR0FBRSxLQUFLLFFBQU0sR0FBRSxLQUFLLFFBQU0sR0FBRSxLQUFLLE9BQUssTUFBSyxLQUFLLFFBQU0sR0FBRSxLQUFLLFFBQU0sR0FBRSxLQUFLLFFBQU0sR0FBRSxLQUFLLFFBQU0sR0FBRSxLQUFLLFNBQU8sTUFBSyxLQUFLLE9BQUssR0FBRSxLQUFLLE9BQUssR0FBRSxLQUFLLFNBQU8sR0FBRSxLQUFLLFNBQU8sR0FBRSxLQUFLLFFBQU0sR0FBRSxLQUFLLFVBQVEsTUFBSyxLQUFLLFdBQVMsTUFBSyxLQUFLLFVBQVEsR0FBRSxLQUFLLFdBQVMsR0FBRSxLQUFLLFFBQU0sR0FBRSxLQUFLLE9BQUssR0FBRSxLQUFLLFFBQU0sR0FBRSxLQUFLLE9BQUssR0FBRSxLQUFLLE9BQUssTUFBSyxLQUFLLE9BQUssSUFBSSxFQUFFLE1BQU0sR0FBRyxHQUFFLEtBQUssT0FBSyxJQUFJLEVBQUUsTUFBTSxHQUFHLEdBQUUsS0FBSyxTQUFPLE1BQUssS0FBSyxVQUFRLE1BQUssS0FBSyxPQUFLLEdBQUUsS0FBSyxPQUFLLEdBQUUsS0FBSyxNQUFJO0FBQUEsUUFBQztBQUFDLGlCQUFTLEVBQUVBLElBQUU7QUFBQyxjQUFJQztBQUFFLGlCQUFPRCxNQUFHQSxHQUFFLFNBQU9DLEtBQUVELEdBQUUsT0FBTUEsR0FBRSxXQUFTQSxHQUFFLFlBQVVDLEdBQUUsUUFBTSxHQUFFRCxHQUFFLE1BQUksSUFBR0MsR0FBRSxTQUFPRCxHQUFFLFFBQU0sSUFBRUMsR0FBRSxPQUFNQSxHQUFFLE9BQUssR0FBRUEsR0FBRSxPQUFLLEdBQUVBLEdBQUUsV0FBUyxHQUFFQSxHQUFFLE9BQUssT0FBTUEsR0FBRSxPQUFLLE1BQUtBLEdBQUUsT0FBSyxHQUFFQSxHQUFFLE9BQUssR0FBRUEsR0FBRSxVQUFRQSxHQUFFLFNBQU8sSUFBSSxFQUFFLE1BQU0sQ0FBQyxHQUFFQSxHQUFFLFdBQVNBLEdBQUUsVUFBUSxJQUFJLEVBQUUsTUFBTSxDQUFDLEdBQUVBLEdBQUUsT0FBSyxHQUFFQSxHQUFFLE9BQUssSUFBRyxLQUFHO0FBQUEsUUFBQztBQUFDLGlCQUFTLEVBQUVELElBQUU7QUFBQyxjQUFJQztBQUFFLGlCQUFPRCxNQUFHQSxHQUFFLFVBQVFDLEtBQUVELEdBQUUsT0FBTyxRQUFNLEdBQUVDLEdBQUUsUUFBTSxHQUFFQSxHQUFFLFFBQU0sR0FBRSxFQUFFRCxFQUFDLEtBQUc7QUFBQSxRQUFDO0FBQUMsaUJBQVMsRUFBRUEsSUFBRUMsSUFBRTtBQUFDLGNBQUlDLElBQUVFO0FBQUUsaUJBQU9KLE1BQUdBLEdBQUUsU0FBT0ksS0FBRUosR0FBRSxPQUFNQyxLQUFFLEtBQUdDLEtBQUUsR0FBRUQsS0FBRSxDQUFDQSxPQUFJQyxLQUFFLEtBQUdELE1BQUcsSUFBR0EsS0FBRSxPQUFLQSxNQUFHLE1BQUtBLE9BQUlBLEtBQUUsS0FBRyxLQUFHQSxNQUFHLEtBQUcsU0FBT0csR0FBRSxVQUFRQSxHQUFFLFVBQVFILE9BQUlHLEdBQUUsU0FBTyxPQUFN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QUFHLEtBQUksS0FBSSxLQUFJLEtBQUksS0FBSSxLQUFJLE1BQUssTUFBSyxNQUFLLE1BQUssTUFBSyxNQUFLLE1BQUssT0FBTSxPQUFNLE9BQU0sR0FBRSxDQUFDLEdBQUUsSUFBRSxDQUFDLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsRUFBRTtBQUFFLFVBQUUsVUFBUSxTQUFTRixJQUFFQyxJQUFFQyxJQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGNBQUksR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsSUFBRSxFQUFFLE1BQUssSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsTUFBSyxJQUFFLEdBQUUsSUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEdBQUUsSUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEdBQUUsSUFBRSxNQUFLLElBQUU7QUFBRSxlQUFJLElBQUUsR0FBRSxLQUFHLElBQUcsSUFBSSxHQUFFLENBQUMsSUFBRTtBQUFFLGVBQUksSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFJLEdBQUVELEdBQUVDLEtBQUUsQ0FBQyxDQUFDO0FBQUksZUFBSSxJQUFFLEdBQUUsSUFBRSxJQUFHLEtBQUcsS0FBRyxNQUFJLEVBQUUsQ0FBQyxHQUFFLElBQUk7QUFBQyxjQUFHLElBQUUsTUFBSSxJQUFFLElBQUcsTUFBSSxFQUFFLFFBQU8sRUFBRSxHQUFHLElBQUUsVUFBUyxFQUFFLEdBQUcsSUFBRSxVQUFTLEVBQUUsT0FBSyxHQUFFO0FBQUUsZUFBSSxJQUFFLEdBQUUsSUFBRSxLQUFHLE1BQUksRUFBRSxDQUFDLEdBQUUsSUFBSTtBQUFDLGVBQUksSUFBRSxNQUFJLElBQUUsSUFBRyxJQUFFLElBQUUsR0FBRSxLQUFHLElBQUcsSUFBSSxLQUFHLE1BQUksSUFBRyxLQUFHLEVBQUUsQ0FBQyxLQUFHLEVBQUUsUUFBTTtBQUFHLGNBQUcsSUFBRSxNQUFJLE1BQUlGLE1BQUcsTUFBSSxHQUFHLFFBQU07QUFBRyxlQUFJLEVBQUUsQ0FBQyxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsSUFBRyxJQUFJLEdBQUUsSUFBRSxDQUFDLElBQUUsRUFBRSxDQUFDLElBQUUsRUFBRSxDQUFDO0FBQUUsZUFBSSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUksT0FBSUMsR0FBRUMsS0FBRSxDQUFDLE1BQUksRUFBRSxFQUFFRCxHQUFFQyxLQUFFLENBQUMsQ0FBQyxHQUFHLElBQUU7QUFBRyxjQUFHLElBQUUsTUFBSUYsTUFBRyxJQUFFLElBQUUsR0FBRSxNQUFJLE1BQUlBLE1BQUcsSUFBRSxHQUFFLEtBQUcsS0FBSSxJQUFFLEdBQUUsS0FBRyxLQUFJLFFBQU0sSUFBRSxHQUFFLElBQUUsR0FBRSxLQUFJLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxJQUFFLElBQUUsR0FBRSxJQUFFLElBQUcsS0FBRyxJQUFFLE1BQUksSUFBRSxNQUFJLEdBQUUsTUFBSUEsTUFBRyxNQUFJLEtBQUcsTUFBSUEsTUFBRyxNQUFJLEVBQUUsUUFBTztBQUFFLHFCQUFPO0FBQUMsaUJBQUksSUFBRSxJQUFFLEdBQUUsSUFBRSxFQUFFLENBQUMsSUFBRSxLQUFHLElBQUUsR0FBRSxFQUFFLENBQUMsS0FBRyxFQUFFLENBQUMsSUFBRSxLQUFHLElBQUUsRUFBRSxJQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUUsRUFBRSxJQUFFLEVBQUUsQ0FBQyxDQUFDLE1BQUksSUFBRSxJQUFHLElBQUcsSUFBRSxLQUFHLElBQUUsR0FBRSxJQUFFLElBQUUsS0FBRyxHQUFFLEVBQUUsS0FBRyxLQUFHLE1BQUksS0FBRyxFQUFFLElBQUUsS0FBRyxLQUFHLEtBQUcsS0FBRyxJQUFFLEdBQUUsTUFBSSxJQUFHO0FBQUMsaUJBQUksSUFBRSxLQUFHLElBQUUsR0FBRSxJQUFFLElBQUcsT0FBSTtBQUFFLGdCQUFHLE1BQUksS0FBRyxLQUFHLElBQUUsR0FBRSxLQUFHLEtBQUcsSUFBRSxHQUFFLEtBQUksS0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFFO0FBQUMsa0JBQUcsTUFBSSxFQUFFO0FBQU0sa0JBQUVDLEdBQUVDLEtBQUUsRUFBRSxDQUFDLENBQUM7QUFBQSxZQUFDO0FBQUMsZ0JBQUcsSUFBRSxNQUFJLElBQUUsT0FBSyxHQUFFO0FBQUMsbUJBQUksTUFBSSxNQUFJLElBQUUsSUFBRyxLQUFHLEdBQUUsSUFBRSxNQUFJLElBQUUsSUFBRSxJQUFHLElBQUUsSUFBRSxLQUFHLEdBQUcsS0FBRyxFQUFFLElBQUUsQ0FBQyxNQUFJLEtBQUksTUFBSSxNQUFJO0FBQUUsa0JBQUcsS0FBRyxLQUFHLEdBQUUsTUFBSUYsTUFBRyxNQUFJLEtBQUcsTUFBSUEsTUFBRyxNQUFJLEVBQUUsUUFBTztBQUFFLGdCQUFFLElBQUUsSUFBRSxDQUFDLElBQUUsS0FBRyxLQUFHLEtBQUcsS0FBRyxJQUFFLElBQUU7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLGlCQUFPLE1BQUksTUFBSSxFQUFFLElBQUUsQ0FBQyxJQUFFLElBQUUsS0FBRyxLQUFHLE1BQUksS0FBRyxJQUFHLEVBQUUsT0FBSyxHQUFFO0FBQUEsUUFBQztBQUFBLE1BQUMsR0FBRSxFQUFDLG1CQUFrQixHQUFFLENBQUMsR0FBRSxJQUFHLENBQUMsU0FBUyxHQUFFLEdBQUUsR0FBRTtBQUFDO0FBQWEsVUFBRSxVQUFRLEVBQUMsR0FBRSxtQkFBa0IsR0FBRSxjQUFhLEdBQUUsSUFBRyxNQUFLLGNBQWEsTUFBSyxnQkFBZSxNQUFLLGNBQWEsTUFBSyx1QkFBc0IsTUFBSyxnQkFBZSxNQUFLLHVCQUFzQjtBQUFBLE1BQUMsR0FBRSxDQUFDLENBQUMsR0FBRSxJQUFHLENBQUMsU0FBUyxHQUFFLEdBQUUsR0FBRTtBQUFDO0FBQWEsWUFBSSxJQUFFLEVBQUUsaUJBQWlCLEdBQUUsSUFBRSxHQUFFLElBQUU7QUFBRSxpQkFBUyxFQUFFQSxJQUFFO0FBQUMsbUJBQVFDLEtBQUVELEdBQUUsUUFBTyxLQUFHLEVBQUVDLEtBQUcsQ0FBQUQsR0FBRUMsRUFBQyxJQUFFO0FBQUEsUUFBQztBQUFDLFlBQUksSUFBRSxHQUFFLElBQUUsSUFBRyxJQUFFLEtBQUksSUFBRSxJQUFFLElBQUUsR0FBRSxJQUFFLElBQUcsSUFBRSxJQUFHLElBQUUsSUFBRSxJQUFFLEdBQUUsSUFBRSxJQUFHLElBQUUsSUFBRyxJQUFFLEdBQUUsSUFBRSxLQUFJLElBQUUsSUFBRyxJQUFFLElBQUcsSUFBRSxJQUFHLElBQUUsQ0FBQyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUMsR0FBRSxJQUFFLENBQUMsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLEVBQUUsR0FBRSxJQUFFLENBQUMsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQyxHQUFFLElBQUUsQ0FBQyxJQUFHLElBQUcsSUFBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsSUFBRyxHQUFFLElBQUcsR0FBRSxJQUFHLEdBQUUsSUFBRyxHQUFFLElBQUcsR0FBRSxFQUFFLEdBQUUsSUFBRSxJQUFJLE1BQU0sS0FBRyxJQUFFLEVBQUU7QUFBRSxVQUFFLENBQUM7QUFBRSxZQUFJLElBQUUsSUFBSSxNQUFNLElBQUUsQ0FBQztBQUFFLFVBQUUsQ0FBQztBQUFFLFlBQUksSUFBRSxJQUFJLE1BQU0sR0FBRztBQUFFLFVBQUUsQ0FBQztBQUFFLFlBQUksSUFBRSxJQUFJLE1BQU0sR0FBRztBQUFFLFVBQUUsQ0FBQztBQUFFLFlBQUksSUFBRSxJQUFJLE1BQU0sQ0FBQztBQUFFLFVBQUUsQ0FBQztBQUFFLFlBQUksR0FBRSxHQUFFLEdBQUUsSUFBRSxJQUFJLE1BQU0sQ0FBQztBQUFFLGlCQUFTLEVBQUVELElBQUVDLElBQUVDLElBQUVFLElBQUVDLElBQUU7QUFBQyxlQUFLLGNBQVlMLElBQUUsS0FBSyxhQUFXQyxJQUFFLEtBQUssYUFBV0MsSUFBRSxLQUFLLFFBQU1FLElBQUUsS0FBSyxhQUFXQyxJQUFFLEtBQUssWUFBVUwsTUFBR0EsR0FBRTtBQUFBLFFBQU07QUFBQyxpQkFBUyxFQUFFQSxJQUFFQyxJQUFFO0FBQUMsZUFBSyxXQUFTRCxJQUFFLEtBQUssV0FBUyxHQUFFLEtBQUssWUFBVUM7QUFBQSxRQUFDO0FBQUMsaUJBQVMsRUFBRUQsSUFBRTtBQUFDLGlCQUFPQSxLQUFFLE1BQUksRUFBRUEsRUFBQyxJQUFFLEVBQUUsT0FBS0EsT0FBSSxFQUFFO0FBQUEsUUFBQztBQUFDLGlCQUFTLEVBQUVBLElBQUVDLElBQUU7QUFBQyxVQUFBRCxHQUFFLFlBQVlBLEdBQUUsU0FBUyxJQUFFLE1BQUlDLElBQUVELEdBQUUsWUFBWUEsR0FBRSxTQUFTLElBQUVDLE9BQUksSUFBRTtBQUFBLFFBQUc7QUFBQyxpQkFBUyxFQUFFRCxJQUFFQyxJQUFFQyxJQUFFO0FBQUMsVUFBQUYsR0FBRSxXQUFTLElBQUVFLE1BQUdGLEdBQUUsVUFBUUMsTUFBR0QsR0FBRSxXQUFTLE9BQU0sRUFBRUEsSUFBRUEsR0FBRSxNQUFNLEdBQUVBLEdBQUUsU0FBT0MsTUFBRyxJQUFFRCxHQUFFLFVBQVNBLEdBQUUsWUFBVUUsS0FBRSxNQUFJRixHQUFFLFVBQVFDLE1BQUdELEdBQUUsV0FBUyxPQUFNQSxHQUFFLFlBQVVFO0FBQUEsUUFBRTtBQUFDLGlCQUFTLEVBQUVGLElBQUVDLElBQUVDLElBQUU7QUFBQyxZQUFFRixJQUFFRSxHQUFFLElBQUVELEVBQUMsR0FBRUMsR0FBRSxJQUFFRCxLQUFFLENBQUMsQ0FBQztBQUFBLFFBQUM7QUFBQyxpQkFBUyxFQUFFRCxJQUFFQyxJQUFFO0FBQUMsbUJBQVFDLEtBQUUsR0FBRUEsTUFBRyxJQUFFRixJQUFFQSxRQUFLLEdBQUVFLE9BQUksR0FBRSxJQUFFLEVBQUVELEtBQUc7QUFBQyxpQkFBT0MsT0FBSTtBQUFBLFFBQUM7QUFBQyxpQkFBUyxFQUFFRixJQUFFQyxJQUFFQyxJQUFFO0FBQUMsY0FBSUUsSUFBRUMsSUFBRUMsS0FBRSxJQUFJLE1BQU0sSUFBRSxDQUFDLEdBQUVDLEtBQUU7QUFBRSxlQUFJSCxLQUFFLEdBQUVBLE1BQUcsR0FBRUEsS0FBSSxDQUFBRSxHQUFFRixFQUFDLElBQUVHLEtBQUVBLEtBQUVMLEdBQUVFLEtBQUUsQ0FBQyxLQUFHO0FBQUUsZUFBSUMsS0FBRSxHQUFFQSxNQUFHSixJQUFFSSxNQUFJO0FBQUMsZ0JBQUlHLEtBQUVSLEdBQUUsSUFBRUssS0FBRSxDQUFDO0FBQUUsa0JBQUlHLE9BQUlSLEdBQUUsSUFBRUssRUFBQyxJQUFFLEVBQUVDLEdBQUVFLEVBQUMsS0FBSUEsRUFBQztBQUFBLFVBQUU7QUFBQSxRQUFDO0FBQUMsaUJBQVMsRUFBRVIsSUFBRTtBQUFDLGNBQUlDO0FBQUUsZUFBSUEsS0FBRSxHQUFFQSxLQUFFLEdBQUVBLEtBQUksQ0FBQUQsR0FBRSxVQUFVLElBQUVDLEVBQUMsSUFBRTtBQUFFLGVBQUlBLEtBQUUsR0FBRUEsS0FBRSxHQUFFQSxLQUFJLENBQUFELEdBQUUsVUFBVSxJQUFFQyxFQUFDLElBQUU7QUFBRSxlQUFJQSxLQUFFLEdBQUVBLEtBQUUsR0FBRUEsS0FBSSxDQUFBRCxHQUFFLFFBQVEsSUFBRUMsRUFBQyxJQUFFO0FBQUUsVUFBQUQsR0FBRSxVQUFVLElBQUUsQ0FBQyxJQUFFLEdBQUVBLEdBQUUsVUFBUUEsR0FBRSxhQUFXLEdBQUVBLEdBQUUsV0FBU0EsR0FBRSxVQUFRO0FBQUEsUUFBQztBQUFDLGlCQUFTLEVBQUVBLElBQUU7QUFBQyxjQUFFQSxHQUFFLFdBQVMsRUFBRUEsSUFBRUEsR0FBRSxNQUFNLElBQUUsSUFBRUEsR0FBRSxhQUFXQSxHQUFFLFlBQVlBLEdBQUUsU0FBUyxJQUFFQSxHQUFFLFNBQVFBLEdBQUUsU0FBTyxHQUFFQSxHQUFFLFdBQVM7QUFBQSxRQUFDO0FBQUMsaUJBQVMsRUFBRUEsSUFBRUMsSUFBRUMsSUFBRUUsSUFBRTtBQUFDLGNBQUlDLEtBQUUsSUFBRUosSUFBRUssS0FBRSxJQUFFSjtBQUFFLGlCQUFPRixHQUFFSyxFQUFDLElBQUVMLEdBQUVNLEVBQUMsS0FBR04sR0FBRUssRUFBQyxNQUFJTCxHQUFFTSxFQUFDLEtBQUdGLEdBQUVILEVBQUMsS0FBR0csR0FBRUYsRUFBQztBQUFBLFFBQUM7QUFBQyxpQkFBUyxFQUFFRixJQUFFQyxJQUFFQyxJQUFFO0FBQUMsbUJBQVFFLEtBQUVKLEdBQUUsS0FBS0UsRUFBQyxHQUFFRyxLQUFFSCxNQUFHLEdBQUVHLE1BQUdMLEdBQUUsYUFBV0ssS0FBRUwsR0FBRSxZQUFVLEVBQUVDLElBQUVELEdBQUUsS0FBS0ssS0FBRSxDQUFDLEdBQUVMLEdBQUUsS0FBS0ssRUFBQyxHQUFFTCxHQUFFLEtBQUssS0FBR0ssTUFBSSxDQUFDLEVBQUVKLElBQUVHLElBQUVKLEdBQUUsS0FBS0ssRUFBQyxHQUFFTCxHQUFFLEtBQUssS0FBSSxDQUFBQSxHQUFFLEtBQUtFLEVBQUMsSUFBRUYsR0FBRSxLQUFLSyxFQUFDLEdBQUVILEtBQUVHLElBQUVBLE9BQUk7QUFBRSxVQUFBTCxHQUFFLEtBQUtFLEVBQUMsSUFBRUU7QUFBQSxRQUFDO0FBQUMsaUJBQVMsRUFBRUosSUFBRUMsSUFBRUMsSUFBRTtBQUFDLGNBQUlFLElBQUVDLElBQUVDLElBQUVDLElBQUVDLEtBQUU7QUFBRSxjQUFHLE1BQUlSLEdBQUUsU0FBUyxRQUFLSSxLQUFFSixHQUFFLFlBQVlBLEdBQUUsUUFBTSxJQUFFUSxFQUFDLEtBQUcsSUFBRVIsR0FBRSxZQUFZQSxHQUFFLFFBQU0sSUFBRVEsS0FBRSxDQUFDLEdBQUVILEtBQUVMLEdBQUUsWUFBWUEsR0FBRSxRQUFNUSxFQUFDLEdBQUVBLE1BQUksTUFBSUosS0FBRSxFQUFFSixJQUFFSyxJQUFFSixFQUFDLEtBQUcsRUFBRUQsS0FBR00sS0FBRSxFQUFFRCxFQUFDLEtBQUcsSUFBRSxHQUFFSixFQUFDLEdBQUUsT0FBS00sS0FBRSxFQUFFRCxFQUFDLE1BQUksRUFBRU4sSUFBRUssTUFBRyxFQUFFQyxFQUFDLEdBQUVDLEVBQUMsR0FBRSxFQUFFUCxJQUFFTSxLQUFFLEVBQUUsRUFBRUYsRUFBQyxHQUFFRixFQUFDLEdBQUUsT0FBS0ssS0FBRSxFQUFFRCxFQUFDLE1BQUksRUFBRU4sSUFBRUksTUFBRyxFQUFFRSxFQUFDLEdBQUVDLEVBQUMsSUFBR0MsS0FBRVIsR0FBRSxXQUFVO0FBQUMsWUFBRUEsSUFBRSxHQUFFQyxFQUFDO0FBQUEsUUFBQztBQUFDLGlCQUFTLEVBQUVELElBQUVDLElBQUU7QUFBQyxjQUFJQyxJQUFFRSxJQUFFQyxJQUFFQyxLQUFFTCxHQUFFLFVBQVNNLEtBQUVOLEdBQUUsVUFBVSxhQUFZTyxLQUFFUCxHQUFFLFVBQVUsV0FBVVEsS0FBRVIsR0FBRSxVQUFVLE9BQU1TLEtBQUU7QUFBRyxlQUFJVixHQUFFLFdBQVMsR0FBRUEsR0FBRSxXQUFTLEdBQUVFLEtBQUUsR0FBRUEsS0FBRU8sSUFBRVAsS0FBSSxPQUFJSSxHQUFFLElBQUVKLEVBQUMsS0FBR0YsR0FBRSxLQUFLLEVBQUVBLEdBQUUsUUFBUSxJQUFFVSxLQUFFUixJQUFFRixHQUFFLE1BQU1FLEVBQUMsSUFBRSxLQUFHSSxHQUFFLElBQUVKLEtBQUUsQ0FBQyxJQUFFO0FBQUUsaUJBQUtGLEdBQUUsV0FBUyxJQUFHLENBQUFNLEdBQUUsS0FBR0QsS0FBRUwsR0FBRSxLQUFLLEVBQUVBLEdBQUUsUUFBUSxJQUFFVSxLQUFFLElBQUUsRUFBRUEsS0FBRSxFQUFFLElBQUUsR0FBRVYsR0FBRSxNQUFNSyxFQUFDLElBQUUsR0FBRUwsR0FBRSxXQUFVUSxPQUFJUixHQUFFLGNBQVlPLEdBQUUsSUFBRUYsS0FBRSxDQUFDO0FBQUcsZUFBSUosR0FBRSxXQUFTUyxJQUFFUixLQUFFRixHQUFFLFlBQVUsR0FBRSxLQUFHRSxJQUFFQSxLQUFJLEdBQUVGLElBQUVNLElBQUVKLEVBQUM7QUFBRSxlQUFJRyxLQUFFSSxJQUFFUCxLQUFFRixHQUFFLEtBQUssQ0FBQyxHQUFFQSxHQUFFLEtBQUssQ0FBQyxJQUFFQSxHQUFFLEtBQUtBLEdBQUUsVUFBVSxHQUFFLEVBQUVBLElBQUVNLElBQUUsQ0FBQyxHQUFFRixLQUFFSixHQUFFLEtBQUssQ0FBQyxHQUFFQSxHQUFFLEtBQUssRUFBRUEsR0FBRSxRQUFRLElBQUVFLElBQUVGLEdBQUUsS0FBSyxFQUFFQSxHQUFFLFFBQVEsSUFBRUksSUFBRUUsR0FBRSxJQUFFRCxFQUFDLElBQUVDLEdBQUUsSUFBRUosRUFBQyxJQUFFSSxHQUFFLElBQUVGLEVBQUMsR0FBRUosR0FBRSxNQUFNSyxFQUFDLEtBQUdMLEdBQUUsTUFBTUUsRUFBQyxLQUFHRixHQUFFLE1BQU1JLEVBQUMsSUFBRUosR0FBRSxNQUFNRSxFQUFDLElBQUVGLEdBQUUsTUFBTUksRUFBQyxLQUFHLEdBQUVFLEdBQUUsSUFBRUosS0FBRSxDQUFDLElBQUVJLEdBQUUsSUFBRUYsS0FBRSxDQUFDLElBQUVDLElBQUVMLEdBQUUsS0FBSyxDQUFDLElBQUVLLE1BQUksRUFBRUwsSUFBRU0sSUFBRSxDQUFDLEdBQUUsS0FBR04sR0FBRSxXQUFVO0FBQUMsVUFBQUEsR0FBRSxLQUFLLEVBQUVBLEdBQUUsUUFBUSxJQUFFQSxHQUFFLEtBQUssQ0FBQyxJQUFFLFNBQVNBLElBQUVDLElBQUU7QUFBQyxnQkFBSUMsSUFBRUUsSUFBRUMsSUFBRUMsSUFBRUMsSUFBRUMsSUFBRUMsS0FBRVIsR0FBRSxVQUFTUyxLQUFFVCxHQUFFLFVBQVNVLEtBQUVWLEdBQUUsVUFBVSxhQUFZVyxLQUFFWCxHQUFFLFVBQVUsV0FBVUUsS0FBRUYsR0FBRSxVQUFVLFlBQVdZLEtBQUVaLEdBQUUsVUFBVSxZQUFXYSxLQUFFYixHQUFFLFVBQVUsWUFBV2MsS0FBRTtBQUFFLGlCQUFJVCxLQUFFLEdBQUVBLE1BQUcsR0FBRUEsS0FBSSxDQUFBTixHQUFFLFNBQVNNLEVBQUMsSUFBRTtBQUFFLGlCQUFJRyxHQUFFLElBQUVULEdBQUUsS0FBS0EsR0FBRSxRQUFRLElBQUUsQ0FBQyxJQUFFLEdBQUVFLEtBQUVGLEdBQUUsV0FBUyxHQUFFRSxLQUFFLEdBQUVBLEtBQUksQ0FBQVksTUFBR1IsS0FBRUcsR0FBRSxJQUFFQSxHQUFFLEtBQUdMLEtBQUVKLEdBQUUsS0FBS0UsRUFBQyxLQUFHLENBQUMsSUFBRSxDQUFDLElBQUUsT0FBS0ksS0FBRVEsSUFBRUMsT0FBS04sR0FBRSxJQUFFTCxLQUFFLENBQUMsSUFBRUUsSUFBRUksS0FBRU4sT0FBSUosR0FBRSxTQUFTTSxFQUFDLEtBQUlDLEtBQUUsR0FBRU0sTUFBR1QsT0FBSUcsS0FBRUosR0FBRUMsS0FBRVMsRUFBQyxJQUFHTCxLQUFFQyxHQUFFLElBQUVMLEVBQUMsR0FBRUosR0FBRSxXQUFTUSxNQUFHRixLQUFFQyxLQUFHSyxPQUFJWixHQUFFLGNBQVlRLE1BQUdHLEdBQUUsSUFBRVAsS0FBRSxDQUFDLElBQUVHO0FBQUssZ0JBQUcsTUFBSVEsSUFBRTtBQUFDLGlCQUFFO0FBQUMscUJBQUlULEtBQUVRLEtBQUUsR0FBRSxNQUFJZCxHQUFFLFNBQVNNLEVBQUMsSUFBRyxDQUFBQTtBQUFJLGdCQUFBTixHQUFFLFNBQVNNLEVBQUMsS0FBSU4sR0FBRSxTQUFTTSxLQUFFLENBQUMsS0FBRyxHQUFFTixHQUFFLFNBQVNjLEVBQUMsS0FBSUMsTUFBRztBQUFBLGNBQUMsU0FBTyxJQUFFQTtBQUFHLG1CQUFJVCxLQUFFUSxJQUFFLE1BQUlSLElBQUVBLEtBQUksTUFBSUYsS0FBRUosR0FBRSxTQUFTTSxFQUFDLEdBQUUsTUFBSUYsS0FBRyxDQUFBTSxNQUFHTCxLQUFFTCxHQUFFLEtBQUssRUFBRUUsRUFBQyxPQUFLTyxHQUFFLElBQUVKLEtBQUUsQ0FBQyxNQUFJQyxPQUFJTixHQUFFLFlBQVVNLEtBQUVHLEdBQUUsSUFBRUosS0FBRSxDQUFDLEtBQUdJLEdBQUUsSUFBRUosRUFBQyxHQUFFSSxHQUFFLElBQUVKLEtBQUUsQ0FBQyxJQUFFQyxLQUFHRjtBQUFBLFlBQUk7QUFBQSxVQUFDLEdBQUVKLElBQUVDLEVBQUMsR0FBRSxFQUFFSyxJQUFFSSxJQUFFVixHQUFFLFFBQVE7QUFBQSxRQUFDO0FBQUMsaUJBQVMsRUFBRUEsSUFBRUMsSUFBRUMsSUFBRTtBQUFDLGNBQUlFLElBQUVDLElBQUVDLEtBQUUsSUFBR0MsS0FBRU4sR0FBRSxDQUFDLEdBQUVPLEtBQUUsR0FBRUMsS0FBRSxHQUFFQyxLQUFFO0FBQUUsZUFBSSxNQUFJSCxPQUFJRSxLQUFFLEtBQUlDLEtBQUUsSUFBR1QsR0FBRSxLQUFHQyxLQUFFLEtBQUcsQ0FBQyxJQUFFLE9BQU1FLEtBQUUsR0FBRUEsTUFBR0YsSUFBRUUsS0FBSSxDQUFBQyxLQUFFRSxJQUFFQSxLQUFFTixHQUFFLEtBQUdHLEtBQUUsS0FBRyxDQUFDLEdBQUUsRUFBRUksS0FBRUMsTUFBR0osT0FBSUUsT0FBSUMsS0FBRUUsS0FBRVYsR0FBRSxRQUFRLElBQUVLLEVBQUMsS0FBR0csS0FBRSxNQUFJSCxNQUFHQSxPQUFJQyxNQUFHTixHQUFFLFFBQVEsSUFBRUssRUFBQyxLQUFJTCxHQUFFLFFBQVEsSUFBRSxDQUFDLE9BQUtRLE1BQUcsS0FBR1IsR0FBRSxRQUFRLElBQUUsQ0FBQyxNQUFJQSxHQUFFLFFBQVEsSUFBRSxDQUFDLEtBQUlNLEtBQUVELElBQUVLLE1BQUdGLEtBQUUsT0FBS0QsTUFBR0UsS0FBRSxLQUFJLEtBQUdKLE9BQUlFLE1BQUdFLEtBQUUsR0FBRSxNQUFJQSxLQUFFLEdBQUU7QUFBQSxRQUFHO0FBQUMsaUJBQVMsRUFBRVQsSUFBRUMsSUFBRUMsSUFBRTtBQUFDLGNBQUlFLElBQUVDLElBQUVDLEtBQUUsSUFBR0MsS0FBRU4sR0FBRSxDQUFDLEdBQUVPLEtBQUUsR0FBRUMsS0FBRSxHQUFFQyxLQUFFO0FBQUUsZUFBSSxNQUFJSCxPQUFJRSxLQUFFLEtBQUlDLEtBQUUsSUFBR04sS0FBRSxHQUFFQSxNQUFHRixJQUFFRSxLQUFJLEtBQUdDLEtBQUVFLElBQUVBLEtBQUVOLEdBQUUsS0FBR0csS0FBRSxLQUFHLENBQUMsR0FBRSxFQUFFLEVBQUVJLEtBQUVDLE1BQUdKLE9BQUlFLEtBQUc7QUFBQyxnQkFBR0MsS0FBRUUsR0FBRSxRQUFLLEVBQUVWLElBQUVLLElBQUVMLEdBQUUsT0FBTyxHQUFFLEtBQUcsRUFBRVEsS0FBRztBQUFBLGdCQUFNLE9BQUlILE1BQUdBLE9BQUlDLE9BQUksRUFBRU4sSUFBRUssSUFBRUwsR0FBRSxPQUFPLEdBQUVRLE9BQUssRUFBRVIsSUFBRSxHQUFFQSxHQUFFLE9BQU8sR0FBRSxFQUFFQSxJQUFFUSxLQUFFLEdBQUUsQ0FBQyxLQUFHQSxNQUFHLE1BQUksRUFBRVIsSUFBRSxHQUFFQSxHQUFFLE9BQU8sR0FBRSxFQUFFQSxJQUFFUSxLQUFFLEdBQUUsQ0FBQyxNQUFJLEVBQUVSLElBQUUsR0FBRUEsR0FBRSxPQUFPLEdBQUUsRUFBRUEsSUFBRVEsS0FBRSxJQUFHLENBQUM7QUFBRyxZQUFBRixLQUFFRCxJQUFFSyxNQUFHRixLQUFFLE9BQUtELE1BQUdFLEtBQUUsS0FBSSxLQUFHSixPQUFJRSxNQUFHRSxLQUFFLEdBQUUsTUFBSUEsS0FBRSxHQUFFO0FBQUEsVUFBRTtBQUFBLFFBQUM7QUFBQyxVQUFFLENBQUM7QUFBRSxZQUFJLElBQUU7QUFBRyxpQkFBUyxFQUFFVCxJQUFFQyxJQUFFQyxJQUFFRSxJQUFFO0FBQUMsWUFBRUosS0FBRyxLQUFHLE1BQUlJLEtBQUUsSUFBRSxJQUFHLENBQUMsSUFBRSxTQUFTSixJQUFFQyxJQUFFQyxJQUFFRSxJQUFFO0FBQUMsY0FBRUosRUFBQyxHQUFFSSxPQUFJLEVBQUVKLElBQUVFLEVBQUMsR0FBRSxFQUFFRixJQUFFLENBQUNFLEVBQUMsSUFBRyxFQUFFLFNBQVNGLEdBQUUsYUFBWUEsR0FBRSxRQUFPQyxJQUFFQyxJQUFFRixHQUFFLE9BQU8sR0FBRUEsR0FBRSxXQUFTRTtBQUFBLFVBQUMsR0FBRUYsSUFBRUMsSUFBRUMsSUFBRSxJQUFFO0FBQUEsUUFBQztBQUFDLFVBQUUsV0FBUyxTQUFTRixJQUFFO0FBQUMsaUJBQUksV0FBVTtBQUFDLGdCQUFJQSxJQUFFQyxJQUFFQyxJQUFFRSxJQUFFQyxJQUFFQyxLQUFFLElBQUksTUFBTSxJQUFFLENBQUM7QUFBRSxpQkFBSUYsS0FBRUYsS0FBRSxHQUFFRSxLQUFFLElBQUUsR0FBRUEsS0FBSSxNQUFJLEVBQUVBLEVBQUMsSUFBRUYsSUFBRUYsS0FBRSxHQUFFQSxLQUFFLEtBQUcsRUFBRUksRUFBQyxHQUFFSixLQUFJLEdBQUVFLElBQUcsSUFBRUU7QUFBRSxpQkFBSSxFQUFFRixLQUFFLENBQUMsSUFBRUUsSUFBRUEsS0FBRUMsS0FBRSxHQUFFRCxLQUFFLElBQUdBLEtBQUksTUFBSSxFQUFFQSxFQUFDLElBQUVDLElBQUVMLEtBQUUsR0FBRUEsS0FBRSxLQUFHLEVBQUVJLEVBQUMsR0FBRUosS0FBSSxHQUFFSyxJQUFHLElBQUVEO0FBQUUsaUJBQUlDLE9BQUksR0FBRUQsS0FBRSxHQUFFQSxLQUFJLE1BQUksRUFBRUEsRUFBQyxJQUFFQyxNQUFHLEdBQUVMLEtBQUUsR0FBRUEsS0FBRSxLQUFHLEVBQUVJLEVBQUMsSUFBRSxHQUFFSixLQUFJLEdBQUUsTUFBSUssSUFBRyxJQUFFRDtBQUFFLGlCQUFJSCxLQUFFLEdBQUVBLE1BQUcsR0FBRUEsS0FBSSxDQUFBSyxHQUFFTCxFQUFDLElBQUU7QUFBRSxpQkFBSUQsS0FBRSxHQUFFQSxNQUFHLE1BQUssR0FBRSxJQUFFQSxLQUFFLENBQUMsSUFBRSxHQUFFQSxNQUFJTSxHQUFFLENBQUM7QUFBSSxtQkFBS04sTUFBRyxNQUFLLEdBQUUsSUFBRUEsS0FBRSxDQUFDLElBQUUsR0FBRUEsTUFBSU0sR0FBRSxDQUFDO0FBQUksbUJBQUtOLE1BQUcsTUFBSyxHQUFFLElBQUVBLEtBQUUsQ0FBQyxJQUFFLEdBQUVBLE1BQUlNLEdBQUUsQ0FBQztBQUFJLG1CQUFLTixNQUFHLE1BQUssR0FBRSxJQUFFQSxLQUFFLENBQUMsSUFBRSxHQUFFQSxNQUFJTSxHQUFFLENBQUM7QUFBSSxpQkFBSSxFQUFFLEdBQUUsSUFBRSxHQUFFQSxFQUFDLEdBQUVOLEtBQUUsR0FBRUEsS0FBRSxHQUFFQSxLQUFJLEdBQUUsSUFBRUEsS0FBRSxDQUFDLElBQUUsR0FBRSxFQUFFLElBQUVBLEVBQUMsSUFBRSxFQUFFQSxJQUFFLENBQUM7QUFBRSxnQkFBRSxJQUFJLEVBQUUsR0FBRSxHQUFFLElBQUUsR0FBRSxHQUFFLENBQUMsR0FBRSxJQUFFLElBQUksRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUMsR0FBRSxJQUFFLElBQUksRUFBRSxJQUFJLE1BQU0sQ0FBQyxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBQSxVQUFDLEdBQUUsR0FBRSxJQUFFLE9BQUlBLEdBQUUsU0FBTyxJQUFJLEVBQUVBLEdBQUUsV0FBVSxDQUFDLEdBQUVBLEdBQUUsU0FBTyxJQUFJLEVBQUVBLEdBQUUsV0FBVSxDQUFDLEdBQUVBLEdBQUUsVUFBUSxJQUFJLEVBQUVBLEdBQUUsU0FBUSxDQUFDLEdBQUVBLEdBQUUsU0FBTyxHQUFFQSxHQUFFLFdBQVMsR0FBRSxFQUFFQSxFQUFDO0FBQUEsUUFBQyxHQUFFLEVBQUUsbUJBQWlCLEdBQUUsRUFBRSxrQkFBZ0IsU0FBU0EsSUFBRUMsSUFBRUMsSUFBRUUsSUFBRTtBQUFDLGNBQUlDLElBQUVDLElBQUVDLEtBQUU7QUFBRSxjQUFFUCxHQUFFLFNBQU8sTUFBSUEsR0FBRSxLQUFLLGNBQVlBLEdBQUUsS0FBSyxhQUFVLFNBQVNBLElBQUU7QUFBQyxnQkFBSUMsSUFBRUMsS0FBRTtBQUFXLGlCQUFJRCxLQUFFLEdBQUVBLE1BQUcsSUFBR0EsTUFBSUMsUUFBSyxFQUFFLEtBQUcsSUFBRUEsTUFBRyxNQUFJRixHQUFFLFVBQVUsSUFBRUMsRUFBQyxFQUFFLFFBQU87QUFBRSxnQkFBRyxNQUFJRCxHQUFFLFVBQVUsRUFBRSxLQUFHLE1BQUlBLEdBQUUsVUFBVSxFQUFFLEtBQUcsTUFBSUEsR0FBRSxVQUFVLEVBQUUsRUFBRSxRQUFPO0FBQUUsaUJBQUlDLEtBQUUsSUFBR0EsS0FBRSxHQUFFQSxLQUFJLEtBQUcsTUFBSUQsR0FBRSxVQUFVLElBQUVDLEVBQUMsRUFBRSxRQUFPO0FBQUUsbUJBQU87QUFBQSxVQUFDLEdBQUVELEVBQUMsSUFBRyxFQUFFQSxJQUFFQSxHQUFFLE1BQU0sR0FBRSxFQUFFQSxJQUFFQSxHQUFFLE1BQU0sR0FBRU8sTUFBRSxTQUFTUCxJQUFFO0FBQUMsZ0JBQUlDO0FBQUUsaUJBQUksRUFBRUQsSUFBRUEsR0FBRSxXQUFVQSxHQUFFLE9BQU8sUUFBUSxHQUFFLEVBQUVBLElBQUVBLEdBQUUsV0FBVUEsR0FBRSxPQUFPLFFBQVEsR0FBRSxFQUFFQSxJQUFFQSxHQUFFLE9BQU8sR0FBRUMsS0FBRSxJQUFFLEdBQUUsS0FBR0EsTUFBRyxNQUFJRCxHQUFFLFFBQVEsSUFBRSxFQUFFQyxFQUFDLElBQUUsQ0FBQyxHQUFFQSxLQUFJO0FBQUMsbUJBQU9ELEdBQUUsV0FBUyxLQUFHQyxLQUFFLEtBQUcsSUFBRSxJQUFFLEdBQUVBO0FBQUEsVUFBQyxHQUFFRCxFQUFDLEdBQUVLLEtBQUVMLEdBQUUsVUFBUSxJQUFFLE1BQUksSUFBR00sS0FBRU4sR0FBRSxhQUFXLElBQUUsTUFBSSxNQUFJSyxPQUFJQSxLQUFFQyxPQUFJRCxLQUFFQyxLQUFFSixLQUFFLEdBQUVBLEtBQUUsS0FBR0csTUFBRyxPQUFLSixLQUFFLEVBQUVELElBQUVDLElBQUVDLElBQUVFLEVBQUMsSUFBRSxNQUFJSixHQUFFLFlBQVVNLE9BQUlELE1BQUcsRUFBRUwsSUFBRSxLQUFHSSxLQUFFLElBQUUsSUFBRyxDQUFDLEdBQUUsRUFBRUosSUFBRSxHQUFFLENBQUMsTUFBSSxFQUFFQSxJQUFFLEtBQUdJLEtBQUUsSUFBRSxJQUFHLENBQUMsSUFBRSxTQUFTSixJQUFFQyxJQUFFQyxJQUFFRSxJQUFFO0FBQUMsZ0JBQUlDO0FBQUUsaUJBQUksRUFBRUwsSUFBRUMsS0FBRSxLQUFJLENBQUMsR0FBRSxFQUFFRCxJQUFFRSxLQUFFLEdBQUUsQ0FBQyxHQUFFLEVBQUVGLElBQUVJLEtBQUUsR0FBRSxDQUFDLEdBQUVDLEtBQUUsR0FBRUEsS0FBRUQsSUFBRUMsS0FBSSxHQUFFTCxJQUFFQSxHQUFFLFFBQVEsSUFBRSxFQUFFSyxFQUFDLElBQUUsQ0FBQyxHQUFFLENBQUM7QUFBRSxjQUFFTCxJQUFFQSxHQUFFLFdBQVVDLEtBQUUsQ0FBQyxHQUFFLEVBQUVELElBQUVBLEdBQUUsV0FBVUUsS0FBRSxDQUFDO0FBQUEsVUFBQyxHQUFFRixJQUFFQSxHQUFFLE9BQU8sV0FBUyxHQUFFQSxHQUFFLE9BQU8sV0FBUyxHQUFFTyxLQUFFLENBQUMsR0FBRSxFQUFFUCxJQUFFQSxHQUFFLFdBQVVBLEdBQUUsU0FBUyxJQUFHLEVBQUVBLEVBQUMsR0FBRUksTUFBRyxFQUFFSixFQUFDO0FBQUEsUUFBQyxHQUFFLEVBQUUsWUFBVSxTQUFTQSxJQUFFQyxJQUFFQyxJQUFFO0FBQUMsaUJBQU9GLEdBQUUsWUFBWUEsR0FBRSxRQUFNLElBQUVBLEdBQUUsUUFBUSxJQUFFQyxPQUFJLElBQUUsS0FBSUQsR0FBRSxZQUFZQSxHQUFFLFFBQU0sSUFBRUEsR0FBRSxXQUFTLENBQUMsSUFBRSxNQUFJQyxJQUFFRCxHQUFFLFlBQVlBLEdBQUUsUUFBTUEsR0FBRSxRQUFRLElBQUUsTUFBSUUsSUFBRUYsR0FBRSxZQUFXLE1BQUlDLEtBQUVELEdBQUUsVUFBVSxJQUFFRSxFQUFDLE9BQUtGLEdBQUUsV0FBVUMsTUFBSUQsR0FBRSxVQUFVLEtBQUcsRUFBRUUsRUFBQyxJQUFFLElBQUUsRUFBRSxLQUFJRixHQUFFLFVBQVUsSUFBRSxFQUFFQyxFQUFDLENBQUMsTUFBS0QsR0FBRSxhQUFXQSxHQUFFLGNBQVk7QUFBQSxRQUFDLEdBQUUsRUFBRSxZQUFVLFNBQVNBLElBQUU7QUFBQyxZQUFFQSxJQUFFLEdBQUUsQ0FBQyxHQUFFLEVBQUVBLElBQUUsR0FBRSxDQUFDLElBQUUsU0FBU0EsSUFBRTtBQUFDLG1CQUFLQSxHQUFFLFlBQVUsRUFBRUEsSUFBRUEsR0FBRSxNQUFNLEdBQUVBLEdBQUUsU0FBTyxHQUFFQSxHQUFFLFdBQVMsS0FBRyxLQUFHQSxHQUFFLGFBQVdBLEdBQUUsWUFBWUEsR0FBRSxTQUFTLElBQUUsTUFBSUEsR0FBRSxRQUFPQSxHQUFFLFdBQVMsR0FBRUEsR0FBRSxZQUFVO0FBQUEsVUFBRSxHQUFFQSxFQUFDO0FBQUEsUUFBQztBQUFBLE1BQUMsR0FBRSxFQUFDLG1CQUFrQixHQUFFLENBQUMsR0FBRSxJQUFHLENBQUMsU0FBUyxHQUFFLEdBQUUsR0FBRTtBQUFDO0FBQWEsVUFBRSxVQUFRLFdBQVU7QUFBQyxlQUFLLFFBQU0sTUFBSyxLQUFLLFVBQVEsR0FBRSxLQUFLLFdBQVMsR0FBRSxLQUFLLFdBQVMsR0FBRSxLQUFLLFNBQU8sTUFBSyxLQUFLLFdBQVMsR0FBRSxLQUFLLFlBQVUsR0FBRSxLQUFLLFlBQVUsR0FBRSxLQUFLLE1BQUksSUFBRyxLQUFLLFFBQU0sTUFBSyxLQUFLLFlBQVUsR0FBRSxLQUFLLFFBQU07QUFBQSxRQUFDO0FBQUEsTUFBQyxHQUFFLENBQUMsQ0FBQyxHQUFFLElBQUcsQ0FBQyxTQUFTLEdBQUUsR0FBRSxHQUFFO0FBQUMsU0FBQyxTQUFTQSxJQUFFO0FBQUMsWUFBQyxTQUFTRSxJQUFFLEdBQUU7QUFBQztBQUFhLGdCQUFHLENBQUNBLEdBQUUsY0FBYTtBQUFDLGtCQUFJLEdBQUUsR0FBRUQsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLENBQUMsR0FBRSxJQUFFLE9BQUcsSUFBRUMsR0FBRSxVQUFTRixLQUFFLE9BQU8sa0JBQWdCLE9BQU8sZUFBZUUsRUFBQztBQUFFLGNBQUFGLEtBQUVBLE1BQUdBLEdBQUUsYUFBV0EsS0FBRUUsSUFBRSxJQUFFLHVCQUFxQixDQUFDLEVBQUUsU0FBUyxLQUFLQSxHQUFFLE9BQU8sSUFBRSxTQUFTRixJQUFFO0FBQUMsd0JBQVEsU0FBUyxXQUFVO0FBQUMsb0JBQUVBLEVBQUM7QUFBQSxnQkFBQyxDQUFDO0FBQUEsY0FBQyxLQUFFLFdBQVU7QUFBQyxvQkFBR0UsR0FBRSxlQUFhLENBQUNBLEdBQUUsZUFBYztBQUFDLHNCQUFJRixLQUFFLE1BQUdDLEtBQUVDLEdBQUU7QUFBVSx5QkFBT0EsR0FBRSxZQUFVLFdBQVU7QUFBQyxvQkFBQUYsS0FBRTtBQUFBLGtCQUFFLEdBQUVFLEdBQUUsWUFBWSxJQUFHLEdBQUcsR0FBRUEsR0FBRSxZQUFVRCxJQUFFRDtBQUFBLGdCQUFDO0FBQUEsY0FBQyxHQUFFLEtBQUcsSUFBRSxrQkFBZ0IsS0FBSyxPQUFPLElBQUUsS0FBSUUsR0FBRSxtQkFBaUJBLEdBQUUsaUJBQWlCLFdBQVUsR0FBRSxLQUFFLElBQUVBLEdBQUUsWUFBWSxhQUFZLENBQUMsR0FBRSxTQUFTRixJQUFFO0FBQUMsZ0JBQUFFLEdBQUUsWUFBWSxJQUFFRixJQUFFLEdBQUc7QUFBQSxjQUFDLEtBQUdFLEdBQUUsbUJBQWlCRCxLQUFFLElBQUksa0JBQWdCLE1BQU0sWUFBVSxTQUFTRCxJQUFFO0FBQUMsa0JBQUVBLEdBQUUsSUFBSTtBQUFBLGNBQUMsR0FBRSxTQUFTQSxJQUFFO0FBQUMsZ0JBQUFDLEdBQUUsTUFBTSxZQUFZRCxFQUFDO0FBQUEsY0FBQyxLQUFHLEtBQUcsd0JBQXVCLEVBQUUsY0FBYyxRQUFRLEtBQUcsSUFBRSxFQUFFLGlCQUFnQixTQUFTQSxJQUFFO0FBQUMsb0JBQUlDLEtBQUUsRUFBRSxjQUFjLFFBQVE7QUFBRSxnQkFBQUEsR0FBRSxxQkFBbUIsV0FBVTtBQUFDLG9CQUFFRCxFQUFDLEdBQUVDLEdBQUUscUJBQW1CLE1BQUssRUFBRSxZQUFZQSxFQUFDLEdBQUVBLEtBQUU7QUFBQSxnQkFBSSxHQUFFLEVBQUUsWUFBWUEsRUFBQztBQUFBLGNBQUMsS0FBRyxTQUFTRCxJQUFFO0FBQUMsMkJBQVcsR0FBRSxHQUFFQSxFQUFDO0FBQUEsY0FBQyxHQUFFQSxHQUFFLGVBQWEsU0FBU0EsSUFBRTtBQUFDLDhCQUFZLE9BQU9BLE9BQUlBLEtBQUUsSUFBSSxTQUFTLEtBQUdBLEVBQUM7QUFBRyx5QkFBUUMsS0FBRSxJQUFJLE1BQU0sVUFBVSxTQUFPLENBQUMsR0FBRUMsS0FBRSxHQUFFQSxLQUFFRCxHQUFFLFFBQU9DLEtBQUksQ0FBQUQsR0FBRUMsRUFBQyxJQUFFLFVBQVVBLEtBQUUsQ0FBQztBQUFFLG9CQUFJRSxLQUFFLEVBQUMsVUFBU0osSUFBRSxNQUFLQyxHQUFDO0FBQUUsdUJBQU8sRUFBRSxDQUFDLElBQUVHLElBQUUsRUFBRSxDQUFDLEdBQUU7QUFBQSxjQUFHLEdBQUVKLEdBQUUsaUJBQWU7QUFBQSxZQUFDO0FBQUMscUJBQVMsRUFBRUEsSUFBRTtBQUFDLHFCQUFPLEVBQUVBLEVBQUM7QUFBQSxZQUFDO0FBQUMscUJBQVMsRUFBRUEsSUFBRTtBQUFDLGtCQUFHLEVBQUUsWUFBVyxHQUFFLEdBQUVBLEVBQUM7QUFBQSxtQkFBTTtBQUFDLG9CQUFJQyxLQUFFLEVBQUVELEVBQUM7QUFBRSxvQkFBR0MsSUFBRTtBQUFDLHNCQUFFO0FBQUcsc0JBQUc7QUFBQyxzQkFBQyxTQUFTRCxJQUFFO0FBQUMsMEJBQUlDLEtBQUVELEdBQUUsVUFBU0UsS0FBRUYsR0FBRTtBQUFLLDhCQUFPRSxHQUFFLFFBQU87QUFBQSx3QkFBQyxLQUFLO0FBQUUsMEJBQUFELEdBQUU7QUFBRTtBQUFBLHdCQUFNLEtBQUs7QUFBRSwwQkFBQUEsR0FBRUMsR0FBRSxDQUFDLENBQUM7QUFBRTtBQUFBLHdCQUFNLEtBQUs7QUFBRSwwQkFBQUQsR0FBRUMsR0FBRSxDQUFDLEdBQUVBLEdBQUUsQ0FBQyxDQUFDO0FBQUU7QUFBQSx3QkFBTSxLQUFLO0FBQUUsMEJBQUFELEdBQUVDLEdBQUUsQ0FBQyxHQUFFQSxHQUFFLENBQUMsR0FBRUEsR0FBRSxDQUFDLENBQUM7QUFBRTtBQUFBLHdCQUFNO0FBQVEsMEJBQUFELEdBQUUsTUFBTSxHQUFFQyxFQUFDO0FBQUEsc0JBQUM7QUFBQSxvQkFBQyxHQUFFRCxFQUFDO0FBQUEsa0JBQUMsVUFBQztBQUFRLHNCQUFFRCxFQUFDLEdBQUUsSUFBRTtBQUFBLGtCQUFFO0FBQUEsZ0JBQUM7QUFBQSxjQUFDO0FBQUEsWUFBQztBQUFDLHFCQUFTLEVBQUVBLElBQUU7QUFBQyxjQUFBQSxHQUFFLFdBQVNFLE1BQUcsWUFBVSxPQUFPRixHQUFFLFFBQU0sTUFBSUEsR0FBRSxLQUFLLFFBQVEsQ0FBQyxLQUFHLEVBQUUsQ0FBQ0EsR0FBRSxLQUFLLE1BQU0sRUFBRSxNQUFNLENBQUM7QUFBQSxZQUFDO0FBQUEsVUFBQyxHQUFFLGVBQWEsT0FBTyxPQUFLLFdBQVNBLEtBQUUsT0FBS0EsS0FBRSxJQUFJO0FBQUEsUUFBQyxHQUFHLEtBQUssTUFBSyxlQUFhLE9BQU8sU0FBTyxTQUFPLGVBQWEsT0FBTyxPQUFLLE9BQUssZUFBYSxPQUFPLFNBQU8sU0FBTyxDQUFDLENBQUM7QUFBQSxNQUFDLEdBQUUsQ0FBQyxDQUFDLEVBQUMsR0FBRSxDQUFDLEdBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQUEsSUFBQyxDQUFDO0FBQUE7QUFBQTs7O0FDWm5uK0Y7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBQUFnQixtQkFBb0Q7OztBQ0FwRCxtQkFBa0I7QUFDbEIsc0JBQStEOzs7QUNEeEQsSUFBTSxlQUFlO0FBQ3JCLElBQU0sYUFBYTtBQUVuQixJQUFNLGdCQUFnQjtBQUFBLEVBQzNCO0FBQUEsRUFBUztBQUFBLEVBQVU7QUFBQSxFQUFVO0FBQUEsRUFBVTtBQUFBLEVBQ3ZDO0FBQUEsRUFBVTtBQUFBLEVBQVc7QUFBQSxFQUFXO0FBQUEsRUFBVztBQUFBLEVBQzNDO0FBQUEsRUFBVTtBQUFBLEVBQVM7QUFBQSxFQUFTO0FBQUEsRUFBUztBQUFBLEVBQVc7QUFBQSxFQUNoRDtBQUFBLEVBQVc7QUFDYjs7O0FDTkEsSUFBTSxXQUFXO0FBQ2pCLElBQU0saUJBQWlCLG9CQUFJLElBQUk7QUFBQSxFQUM3QjtBQUFBLEVBQXNCO0FBQUEsRUFBNkI7QUFBQSxFQUNuRDtBQUFBLEVBQTBCO0FBQUEsRUFBNEI7QUFDeEQsQ0FBQztBQUVNLFNBQVMsY0FBYyxPQUF1QjtBQUNuRCxTQUFPLE1BQU0sVUFBVSxLQUFLLEVBQUUsUUFBUSxPQUFPLEdBQUcsRUFBRSxRQUFRLFFBQVEsR0FBRyxFQUFFLFFBQVEsU0FBUyxFQUFFO0FBQzVGO0FBRU8sU0FBUyxrQkFBa0IsT0FBZSxhQUE2QjtBQUM1RSxRQUFNLE9BQU8sY0FBYyxLQUFLO0FBQ2hDLE1BQUksQ0FBQyxRQUFRLEtBQUssU0FBUyxJQUFJLEtBQUssS0FBSyxXQUFXLEdBQUcsS0FBSyxhQUFhLEtBQUssSUFBSSxFQUFHLE9BQU0sSUFBSSxNQUFNLGdCQUFnQixLQUFLLEVBQUU7QUFDNUgsUUFBTSxXQUFXLEtBQUssTUFBTSxHQUFHO0FBQy9CLE1BQUksU0FBUyxLQUFLLENBQUMsWUFBWSxDQUFDLFdBQVcsWUFBWSxPQUFPLFlBQVksUUFBUSxZQUFZLEtBQUssT0FBTyxLQUFLLFNBQVMsS0FBSyxPQUFPLENBQUMsR0FBRztBQUN0SSxVQUFNLElBQUksTUFBTSxnQkFBZ0IsS0FBSyxFQUFFO0FBQUEsRUFDekM7QUFDQSxNQUFJLEtBQUssV0FBVyxHQUFHLFdBQVcsR0FBRyxHQUFHO0FBQ3RDLFVBQU0sUUFBUSxLQUFLLE1BQU0sWUFBWSxTQUFTLENBQUMsRUFBRSxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQzdELFFBQUksQ0FBRSxjQUFvQyxTQUFTLEtBQUssRUFBRyxPQUFNLElBQUksTUFBTSxrQ0FBa0MsS0FBSyxFQUFFO0FBQ3BILFdBQU87QUFBQSxFQUNUO0FBQ0EsTUFBSSxlQUFlLElBQUksSUFBSSxLQUFNLENBQUMsS0FBSyxTQUFTLEdBQUcsS0FBSyxDQUFDLEtBQUssV0FBVyxHQUFHLEVBQUksUUFBTztBQUN2RixRQUFNLElBQUksTUFBTSx5Q0FBeUMsS0FBSyxFQUFFO0FBQ2xFO0FBRU8sU0FBUyxzQkFBc0IsT0FBdUI7QUFDM0QsUUFBTSxTQUFTLENBQUMsR0FBRyxLQUFLLEVBQUUsS0FBSztBQUMvQixXQUFTLElBQUksR0FBRyxJQUFJLE9BQU8sUUFBUSxLQUFLLEdBQUc7QUFDekMsUUFBSSxPQUFPLENBQUMsRUFBRSxXQUFXLEdBQUcsT0FBTyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUcsT0FBTSxJQUFJLE1BQU0saUNBQWlDLE9BQU8sSUFBSSxDQUFDLENBQUMsRUFBRTtBQUFBLEVBQ2pIO0FBQ0Y7OztBQzlCQSxJQUFNLHlCQUF5QixDQUFDLFNBQVMsd0JBQXdCLHdCQUF3QjtBQUVsRixTQUFTLHlCQUF5QixPQUFpQztBQUN4RSxNQUFJLENBQUMsU0FBUyxLQUFLLEVBQUcsT0FBTSxJQUFJLE1BQU0seUNBQXlDO0FBQy9FLGFBQVcsYUFBYSxDQUFDLGFBQWEsV0FBVyxpQkFBaUIsVUFBVSxRQUFRLGVBQWUsS0FBSyxHQUFHO0FBQ3pHLFFBQUksYUFBYSxNQUFPLE9BQU0sSUFBSSxNQUFNLHdDQUF3QyxTQUFTLEdBQUc7QUFBQSxFQUM5RjtBQUNBLE1BQUksTUFBTSxrQkFBa0IsS0FBSyxNQUFNLFlBQVksd0JBQXdCLE1BQU0sV0FBVyxpQkFBa0IsT0FBTSxJQUFJLE1BQU0sK0RBQStEO0FBQzdMLE1BQUksTUFBTSxZQUFZLFNBQVUsT0FBTSxJQUFJLE1BQU0sK0NBQStDO0FBQy9GLGFBQVcsU0FBUyx1QkFBd0IsS0FBSSxPQUFPLE1BQU0sS0FBSyxNQUFNLFlBQVksQ0FBQyxNQUFNLEtBQUssRUFBRSxLQUFLLEVBQUcsT0FBTSxJQUFJLE1BQU0sa0JBQWtCLEtBQUssY0FBYztBQUMvSixNQUFJLENBQUMsU0FBUyxNQUFNLFVBQVUsS0FBSyxDQUFDLGlCQUFpQixNQUFNLFdBQVcsVUFBVSxNQUFNLEtBQUssQ0FBQyxpQkFBaUIsTUFBTSxXQUFXLFFBQVEsSUFBSSxLQUFLLENBQUMsaUJBQWlCLE1BQU0sV0FBVyxTQUFTLElBQUksS0FBSyxPQUFPLE1BQU0sV0FBVyxnQkFBZ0IsU0FBVSxPQUFNLElBQUksTUFBTSxpQ0FBaUM7QUFFdlMsUUFBTSxhQUFhLE1BQU07QUFDekIsUUFBTSxlQUFlLENBQUMsV0FBVyxTQUFTLFFBQVEsV0FBVyxPQUFPLFFBQVEsV0FBVyxRQUFRLE1BQU0sRUFBRSxLQUFLLEdBQUc7QUFDL0csTUFBSSxjQUFjLFdBQVcsV0FBVyxNQUFNLGNBQWMsWUFBWSxFQUFHLE9BQU0sSUFBSSxNQUFNLGdEQUFnRDtBQUMzSSxNQUFJLENBQUMsTUFBTSxRQUFRLE1BQU0sWUFBWSxLQUFLLENBQUMsUUFBUSxNQUFNLGNBQWMsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxFQUFHLE9BQU0sSUFBSSxNQUFNLG9EQUFvRDtBQUNoSyxNQUFJLENBQUMsTUFBTSxRQUFRLE1BQU0sUUFBUSxLQUFLLE1BQU0sU0FBUyxXQUFXLEVBQUcsT0FBTSxJQUFJLE1BQU0scUNBQXFDO0FBRXhILFFBQU0sV0FBVyxNQUFNLFNBQVMsSUFBSSxDQUFDLFVBQVUsYUFBYSxPQUFPLGNBQWMsV0FBVyxXQUFXLENBQUMsQ0FBQztBQUN6RyxRQUFNLE1BQU0sb0JBQUksSUFBWTtBQUM1QixXQUFTLFFBQVEsR0FBRyxRQUFRLFNBQVMsUUFBUSxTQUFTLEdBQUc7QUFDdkQsVUFBTSxVQUFVLFNBQVMsS0FBSztBQUM5QixRQUFJLElBQUksSUFBSSxRQUFRLFNBQVMsRUFBRyxPQUFNLElBQUksTUFBTSx3QkFBd0IsUUFBUSxTQUFTLEdBQUc7QUFDNUYsUUFBSSxJQUFJLFFBQVEsU0FBUztBQUN6QixRQUFJLFFBQVEsS0FBSyxlQUFlLFNBQVMsUUFBUSxDQUFDLEdBQUcsT0FBTyxLQUFLLEVBQUcsT0FBTSxJQUFJLE1BQU0sd0VBQXdFO0FBQUEsRUFDOUo7QUFDQSxTQUFPLEVBQUUsR0FBRyxPQUFPLFNBQVM7QUFDOUI7QUFFQSxTQUFTLGFBQWEsT0FBZ0IsYUFBbUM7QUFDdkUsTUFBSSxDQUFDLFNBQVMsS0FBSyxFQUFHLE9BQU0sSUFBSSxNQUFNLGlDQUFpQztBQUN2RSxhQUFXLFNBQVMsQ0FBQyxrQkFBa0IsYUFBYSxlQUFlLFVBQVUsRUFBWSxLQUFJLE9BQU8sTUFBTSxLQUFLLE1BQU0sWUFBWSxDQUFDLE1BQU0sS0FBSyxFQUFFLEtBQUssRUFBRyxPQUFNLElBQUksTUFBTSxpQkFBaUIsS0FBSyxjQUFjO0FBQzNNLFFBQU0sY0FBYyxpQkFBaUIsTUFBTSxjQUFjO0FBQ3pELE1BQUksQ0FBQyxZQUFhLE9BQU0sSUFBSSxNQUFNLDhDQUE4QztBQUNoRixRQUFNLFlBQVksZUFBZSxNQUFNLFNBQVM7QUFDaEQsTUFBSSxDQUFDLFVBQVcsT0FBTSxJQUFJLE1BQU0sNEVBQTRFO0FBQzVHLE1BQUksVUFBVSxTQUFTLFlBQVksUUFBUSxVQUFVLFVBQVUsWUFBWSxTQUFTLFVBQVUsUUFBUSxZQUFZLElBQUssT0FBTSxJQUFJLE1BQU0sMkNBQTJDO0FBQ2xMLE1BQUksT0FBTyxNQUFNLEtBQUssTUFBTSxNQUFNLFdBQVcsQ0FBQyxFQUFHLE9BQU0sSUFBSSxNQUFNLCtCQUErQjtBQUNoRyxNQUFJLENBQUMsTUFBTSxRQUFRLE1BQU0sS0FBSyxLQUFLLENBQUMsTUFBTSxRQUFRLE1BQU0sU0FBUyxFQUFHLE9BQU0sSUFBSSxNQUFNLHFDQUFxQztBQUN6SCxRQUFNLFFBQVEsTUFBTSxNQUFNLElBQUksQ0FBQyxVQUFVO0FBQ3ZDLFFBQUksQ0FBQyxTQUFTLEtBQUssS0FBSyxPQUFPLE1BQU0sU0FBUyxTQUFVLE9BQU0sSUFBSSxNQUFNLCtCQUErQjtBQUN2RyxXQUFPLEVBQUUsTUFBTSxrQkFBa0IsTUFBTSxNQUFNLFdBQVcsRUFBRTtBQUFBLEVBQzVELENBQUM7QUFDRCxRQUFNLFlBQVksTUFBTSxVQUFVLElBQUksQ0FBQyxTQUFTO0FBQzlDLFFBQUksT0FBTyxTQUFTLFNBQVUsT0FBTSxJQUFJLE1BQU0sK0JBQStCO0FBQzdFLFdBQU8sa0JBQWtCLE1BQU0sV0FBVztBQUFBLEVBQzVDLENBQUM7QUFDRCxRQUFNLFdBQVcsQ0FBQyxHQUFHLE1BQU0sSUFBSSxDQUFDLFNBQVMsS0FBSyxJQUFJLEdBQUcsR0FBRyxTQUFTO0FBQ2pFLE1BQUksSUFBSSxJQUFJLFFBQVEsRUFBRSxTQUFTLFNBQVMsT0FBUSxPQUFNLElBQUksTUFBTSxXQUFXLE1BQU0sU0FBUywyQ0FBMkM7QUFDckksTUFBSSxDQUFDLFNBQVMsTUFBTSxZQUFZLEtBQUssT0FBTyxNQUFNLGFBQWEsWUFBWSxZQUFZLENBQUMsQ0FBQyxTQUFTLFdBQVcsU0FBUyxFQUFFLE1BQU0sQ0FBQyxRQUFRLE9BQU8sTUFBTSxhQUFhLEdBQUcsTUFBTSxZQUFZLE1BQU0sYUFBYSxHQUFHLEtBQUssQ0FBQyxFQUFHLE9BQU0sSUFBSSxNQUFNLDBCQUEwQjtBQUMvUCxTQUFPLEVBQUUsZ0JBQWdCLE1BQU0sZ0JBQWdCLFdBQVcsTUFBTSxXQUFXLGFBQWEsTUFBTSxhQUFhLFVBQVUsTUFBTSxVQUFVLE9BQU8sV0FBVyxjQUFjLE1BQU0sYUFBNkM7QUFDMU47QUFFTyxTQUFTLGdCQUFnQixHQUFXLEdBQW1CO0FBQzVELFFBQU0sUUFBUSxDQUFDLFVBQWtCLE1BQU0sUUFBUSxNQUFNLEVBQUUsRUFBRSxNQUFNLE9BQU8sRUFBRSxNQUFNLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxTQUFTLE9BQU8sU0FBUyxNQUFNLEVBQUUsS0FBSyxDQUFDO0FBQ2hJLFFBQU0sT0FBTyxNQUFNLENBQUM7QUFBRyxRQUFNLFFBQVEsTUFBTSxDQUFDO0FBQzVDLFdBQVMsUUFBUSxHQUFHLFFBQVEsR0FBRyxTQUFTLEVBQUcsS0FBSSxLQUFLLEtBQUssTUFBTSxNQUFNLEtBQUssRUFBRyxRQUFPLEtBQUssS0FBSyxJQUFJLE1BQU0sS0FBSztBQUM3RyxTQUFPO0FBQ1Q7QUFDTyxTQUFTLGVBQWUsR0FBaUIsR0FBeUI7QUFDdkUsUUFBTSxVQUFVLGdCQUFnQixFQUFFLGdCQUFnQixFQUFFLGNBQWM7QUFDbEUsTUFBSSxRQUFTLFFBQU87QUFDcEIsUUFBTSxXQUFXLGVBQWUsRUFBRSxTQUFTLEVBQUcsV0FBVyxlQUFlLEVBQUUsU0FBUyxFQUFHO0FBQ3RGLFNBQU8sWUFBWSxLQUFLLE1BQU0sRUFBRSxXQUFXLElBQUksS0FBSyxNQUFNLEVBQUUsV0FBVztBQUN6RTtBQUNBLFNBQVMsaUJBQWlCLE9BQXlFO0FBQ2pHLFFBQU0sUUFBUSx5REFBeUQsS0FBSyxLQUFLO0FBQ2pGLFNBQU8sU0FBUyxVQUFVLE9BQU8sTUFBTSxDQUFDLENBQUMsR0FBRyxPQUFPLE1BQU0sQ0FBQyxDQUFDLEdBQUcsT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxNQUFNLE9BQU8sTUFBTSxDQUFDLENBQUMsR0FBRyxPQUFPLE9BQU8sTUFBTSxDQUFDLENBQUMsR0FBRyxLQUFLLE9BQU8sTUFBTSxDQUFDLENBQUMsRUFBRSxJQUFJO0FBQ2pLO0FBQ0EsU0FBUyxlQUFlLE9BQTJGO0FBQ2pILFFBQU0sUUFBUSx1Q0FBdUMsS0FBSyxLQUFLO0FBQy9ELE1BQUksQ0FBQyxNQUFPLFFBQU87QUFDbkIsUUFBTSxPQUFPLE9BQU8sTUFBTSxDQUFDLENBQUM7QUFBRyxRQUFNLFFBQVEsT0FBTyxNQUFNLENBQUMsQ0FBQztBQUFHLFFBQU0sTUFBTSxPQUFPLE1BQU0sQ0FBQyxDQUFDO0FBQUcsUUFBTSxXQUFXLE9BQU8sTUFBTSxDQUFDLENBQUM7QUFDN0gsU0FBTyxVQUFVLE1BQU0sT0FBTyxHQUFHLEtBQUssT0FBTyxjQUFjLFFBQVEsS0FBSyxZQUFZLElBQUksRUFBRSxNQUFNLE9BQU8sS0FBSyxTQUFTLElBQUk7QUFDM0g7QUFDQSxTQUFTLFVBQVUsTUFBYyxPQUFlLEtBQXNCO0FBQUUsUUFBTSxPQUFPLElBQUksS0FBSyxLQUFLLElBQUksTUFBTSxRQUFRLEdBQUcsR0FBRyxDQUFDO0FBQUcsU0FBTyxLQUFLLGVBQWUsTUFBTSxRQUFRLEtBQUssWUFBWSxNQUFNLFFBQVEsS0FBSyxLQUFLLFdBQVcsTUFBTTtBQUFLO0FBQ3ZPLFNBQVMsaUJBQWlCLE9BQWdCLFVBQTBEO0FBQUUsU0FBTyxTQUFTLEtBQUssS0FBSyxPQUFPLE1BQU0sUUFBUSxNQUFNLFlBQVksT0FBTyxNQUFNLFNBQVMsWUFBWSxPQUFPLE1BQU0sV0FBVztBQUFVO0FBQzNPLFNBQVMsU0FBUyxPQUE4QztBQUFFLFNBQU8sT0FBTyxVQUFVLFlBQVksVUFBVSxRQUFRLENBQUMsTUFBTSxRQUFRLEtBQUs7QUFBRztBQUMvSSxTQUFTLFFBQVEsUUFBbUIsVUFBNkI7QUFBRSxTQUFPLE9BQU8sV0FBVyxTQUFTLFVBQVUsSUFBSSxJQUFJLE1BQU0sRUFBRSxTQUFTLE9BQU8sVUFBVSxPQUFPLE1BQU0sQ0FBQyxVQUFVLE9BQU8sVUFBVSxZQUFZLFNBQVMsU0FBUyxLQUFLLENBQUM7QUFBRzs7O0FIM0V6TyxJQUFNLGNBQWM7QUFDcEIsSUFBTSxvQkFBb0IsT0FBTyxPQUFPO0FBQ3hDLElBQU0sWUFBWTtBQUNsQixJQUFNLHlCQUF5QixJQUFJLE9BQU8sT0FBTztBQUUxQyxJQUFNLGdCQUFOLE1BQW9CO0FBQUEsRUFDekIsWUFDbUIsS0FDQSxlQUNBLFNBQ0EsVUFDakI7QUFKaUI7QUFDQTtBQUNBO0FBQ0E7QUFBQSxFQUNoQjtBQUFBLEVBRUgsTUFBTSxRQUFxQztBQUN6QyxVQUFNLFdBQVcsTUFBTSxLQUFLLGNBQWM7QUFDMUMsU0FBSyxpQkFBaUIsUUFBUTtBQUM5QixVQUFNLFdBQVcsS0FBSyxnQkFBZ0IsUUFBUTtBQUM5QyxXQUFPLFNBQVMsU0FBUyxFQUFFLFVBQVUsU0FBUyxJQUFJO0FBQUEsRUFDcEQ7QUFBQSxFQUVBLE1BQU0sUUFBUSxPQUFvQixVQUFvRDtBQUNwRixTQUFLLGlCQUFpQixNQUFNLFFBQVE7QUFDcEMsYUFBUyxRQUFRLEdBQUcsUUFBUSxNQUFNLFNBQVMsUUFBUSxTQUFTLEdBQUc7QUFDN0QsWUFBTSxVQUFVLE1BQU0sU0FBUyxLQUFLO0FBQ3BDLGVBQVMsV0FBVyxRQUFRLENBQUMsT0FBTyxNQUFNLFNBQVMsTUFBTSxLQUFLLFFBQVEsY0FBYyxFQUFFO0FBQ3RGLFlBQU0sS0FBSyxlQUFlLE1BQU0sVUFBVSxTQUFTLFFBQVE7QUFBQSxJQUM3RDtBQUNBLFFBQUksdUJBQU8sMkJBQTJCLE1BQU0sU0FBUyxHQUFHLEVBQUUsRUFBRyxjQUFjLEdBQUc7QUFBQSxFQUNoRjtBQUFBLEVBRUEsTUFBYyxlQUFlLFVBQTJCLFNBQXVCLFVBQW9EO0FBQ2pJLFFBQUk7QUFDSixRQUFJLFlBQVk7QUFDaEIsUUFBSTtBQUNGLGVBQVMsbUNBQThCO0FBQ3ZDLG9CQUFjLE1BQU0sS0FBSyxrQkFBa0IsVUFBVSxPQUFPO0FBQzVELGVBQVMsa0NBQTZCO0FBQ3RDLFlBQU0sVUFBVSxNQUFNLEtBQUssV0FBVyxVQUFVLFNBQVMsV0FBVztBQUNwRSxVQUFJLENBQUMsUUFBUSxPQUFRLE9BQU0sSUFBSSxNQUFNLHdDQUF3QztBQUM3RSxZQUFNLFNBQVMsTUFBTSxLQUFLLFlBQVksU0FBUyxhQUFhLFFBQVE7QUFDcEUsVUFBSSxDQUFDLE9BQU8sT0FBUSxPQUFNLElBQUksTUFBTSwrQ0FBK0M7QUFFbkYsVUFBSTtBQUNKLFVBQUk7QUFDSixpQkFBVyxVQUFVLFFBQVE7QUFDM0IsWUFBSTtBQUNGLG1CQUFTLG9CQUFvQixPQUFPLElBQUksUUFBRztBQUMzQyxvQkFBVSxNQUFNLEtBQUssZ0JBQWdCLFFBQVEsYUFBYSxRQUFRLFFBQVE7QUFDMUU7QUFBQSxRQUNGLFNBQVMsT0FBTztBQUFFLHNCQUFZO0FBQUEsUUFBTztBQUFBLE1BQ3ZDO0FBQ0EsVUFBSSxDQUFDLFFBQVMsT0FBTSxxQkFBcUIsUUFBUSxZQUFZLElBQUksTUFBTSw0QkFBNEI7QUFFbkcsZUFBUyxrQ0FBNkI7QUFDdEMsWUFBTSxjQUFjLEdBQUcsV0FBVyxJQUFJLFlBQVksRUFBRTtBQUNwRCxZQUFNLFlBQVksS0FBSyxJQUFJLE1BQU0sU0FBUyxhQUFhLE9BQU87QUFDOUQsZ0JBQVUsTUFBTSxLQUFLLElBQUksTUFBTSxRQUFRLFdBQVcsV0FBVztBQUM3RCxZQUFNLE9BQU8sTUFBTSxLQUFLLGdCQUFnQixTQUFTLFVBQVUsT0FBTztBQUNsRSxlQUFTLDhCQUF5QjtBQUNsQyxZQUFNLEtBQUssTUFBTSxNQUFNLFNBQVMsUUFBUTtBQUN4QyxrQkFBWTtBQUNaLFVBQUk7QUFBRSxjQUFNLEtBQUssT0FBTyxhQUFhLFNBQVM7QUFBQSxNQUFHLFFBQzNDO0FBQUUsWUFBSSx1QkFBTywwRUFBMEU7QUFBQSxNQUFHO0FBQUEsSUFDbEcsU0FBUyxPQUFPO0FBQ2QsVUFBSSxlQUFlLENBQUMsVUFBVyxPQUFNLEtBQUssT0FBTyxhQUFhLFFBQVEsRUFBRSxNQUFNLE1BQU0sTUFBUztBQUM3RixZQUFNO0FBQUEsSUFDUixVQUFFO0FBQ0EsVUFBSSxZQUFhLE9BQU0sV0FBVyxLQUFLLElBQUksTUFBTSxTQUFTLEdBQUcsV0FBVyxJQUFJLFlBQVksRUFBRSxFQUFFLEVBQUUsTUFBTSxNQUFNLE1BQVM7QUFBQSxJQUNySDtBQUFBLEVBQ0Y7QUFBQSxFQUVRLGdCQUFnQixVQUEyQztBQUNqRSxVQUFNLFlBQVksS0FBSyxRQUFRLEVBQUU7QUFDakMsVUFBTSxpQkFBaUIsVUFBVSxZQUFZLFNBQVMsU0FBUyxVQUFVLENBQUMsWUFBWSxRQUFRLGNBQWMsVUFBVSxTQUFTLElBQUk7QUFDbkksUUFBSSxrQkFBa0IsRUFBRyxRQUFPLFNBQVMsU0FBUyxNQUFNLGlCQUFpQixDQUFDO0FBQzFFLFFBQUksQ0FBQyxVQUFVLGVBQWdCLFFBQU8sU0FBUztBQUMvQyxXQUFPLFNBQVMsU0FBUyxPQUFPLENBQUMsWUFBWSxnQkFBZ0IsUUFBUSxnQkFBZ0IsVUFBVSxjQUFlLElBQUksQ0FBQztBQUFBLEVBQ3JIO0FBQUEsRUFFQSxNQUFjLGdCQUEwQztBQUN0RCxVQUFNLFdBQVcsVUFBTSw0QkFBVyxFQUFFLEtBQUssY0FBYyxRQUFRLE9BQU8sT0FBTyxNQUFNLENBQUM7QUFDcEYsUUFBSSxTQUFTLFdBQVcsSUFBSyxPQUFNLElBQUksTUFBTSw2Q0FBNkMsU0FBUyxNQUFNLElBQUk7QUFDN0csUUFBSTtBQUNKLFFBQUk7QUFBRSxhQUFPLFNBQVM7QUFBQSxJQUFNLFFBQVE7QUFBRSxZQUFNLElBQUksTUFBTSxxQ0FBcUM7QUFBQSxJQUFHO0FBQzlGLFdBQU8seUJBQXlCLElBQUk7QUFBQSxFQUN0QztBQUFBLEVBRVEsaUJBQWlCLFVBQWlDO0FBQ3hELFFBQUksZ0JBQWdCLEtBQUssZUFBZSxTQUFTLG9CQUFvQixJQUFJLEVBQUcsT0FBTSxJQUFJLE1BQU0sZ0NBQWdDLFNBQVMsb0JBQW9CLFlBQVk7QUFDckssVUFBTSxhQUFhLEtBQUssV0FBVztBQUduQyxRQUFJLGNBQWMsZ0JBQWdCLFlBQVksU0FBUyxzQkFBc0IsSUFBSSxFQUFHLE9BQU0sSUFBSSxNQUFNLGtDQUFrQyxTQUFTLHNCQUFzQixZQUFZO0FBQUEsRUFDbkw7QUFBQSxFQUVBLE1BQWMsa0JBQWtCLFVBQTJCLFNBQW1EO0FBQzVHLFVBQU0sV0FBVyxNQUFNLEtBQUssSUFBSSx5QkFBeUIsUUFBUTtBQUFBLE1BQy9ELE9BQU8sU0FBUztBQUFBLE1BQU8sU0FBUyxRQUFRO0FBQUEsTUFBZ0IsVUFBVSxRQUFRO0FBQUEsTUFBVSxVQUFVLFNBQVMsV0FBVyxTQUFTO0FBQUEsTUFDM0gsUUFBUSxTQUFTLFdBQVcsT0FBTztBQUFBLE1BQUksU0FBUyxTQUFTLFdBQVcsUUFBUTtBQUFBLE1BQzVFLGFBQWEseUJBQVMsV0FBVyxXQUFXO0FBQUEsTUFBVyxJQUFJLFVBQVU7QUFBQSxNQUNyRSxnQkFBZ0IsR0FBRyxLQUFLLFdBQVcsS0FBSyxTQUFTLFlBQVksS0FBSyxhQUFhO0FBQUEsTUFBSSxZQUFZLFVBQVU7QUFBQSxJQUMzRyxDQUFDO0FBQ0QsUUFBSSxPQUFPLFNBQVMsT0FBTyxZQUFZLE9BQU8sU0FBUyxVQUFVLFNBQVUsT0FBTSxJQUFJLE1BQU0saURBQWlEO0FBQzVJLFdBQU8sRUFBRSxJQUFJLFNBQVMsSUFBSSxPQUFPLFNBQVMsTUFBTTtBQUFBLEVBQ2xEO0FBQUEsRUFFQSxNQUFjLFdBQVcsVUFBMkIsU0FBdUIsYUFBbUQ7QUFDNUgsVUFBTSxRQUFRLElBQUksZ0JBQWdCLEVBQUUsVUFBVSxTQUFTLFdBQVcsU0FBUyxNQUFNLFFBQVEsU0FBUyxXQUFXLE9BQU8sSUFBSSxTQUFTLFNBQVMsV0FBVyxRQUFRLElBQUksT0FBTyxTQUFTLE9BQU8sU0FBUyxRQUFRLGdCQUFnQixVQUFVLFFBQVEsU0FBUyxDQUFDO0FBQ3JQLFVBQU0sV0FBVyxNQUFNLEtBQUssSUFBSSxvQkFBb0IsS0FBSyxJQUFJLE9BQU8sUUFBVyxXQUFXO0FBQzFGLFFBQUksQ0FBQyxNQUFNLFFBQVEsU0FBUyxPQUFPLEVBQUcsT0FBTSxJQUFJLE1BQU0saURBQWlEO0FBQ3ZHLFdBQU8sU0FBUyxRQUFRLE9BQU8sUUFBUTtBQUFBLEVBQ3pDO0FBQUEsRUFFQSxNQUFjLFlBQVksU0FBbUIsYUFBZ0MsVUFBd0Q7QUFDbkksYUFBUyw4QkFBeUI7QUFDbEMsVUFBTSxTQUFTLE1BQU0sUUFBUSxJQUFJLFFBQVEsTUFBTSxHQUFHLENBQUMsRUFBRSxJQUFJLE9BQU8sWUFBWSxFQUFFLFFBQVEsUUFBUSxNQUFNLEtBQUssTUFBTSxRQUFRLFdBQVcsRUFBRSxFQUFFLENBQUM7QUFDdkksV0FBTyxPQUNKLE9BQU8sQ0FBQyxTQUEwRCxLQUFLLE9BQU8sV0FBVyxPQUFPLEtBQUssT0FBTyxjQUFjLFFBQVEsRUFDbEksS0FBSyxDQUFDLEdBQUcsTUFBTSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sSUFBSSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUNwRSxJQUFJLENBQUMsU0FBUyxLQUFLLE1BQU07QUFBQSxFQUM5QjtBQUFBLEVBRUEsTUFBYyxNQUFNLFFBQWdCLGFBQXNEO0FBQ3hGLFFBQUk7QUFDRixZQUFNLFdBQVcsTUFBTSxLQUFLLElBQUksb0JBQW9CLG1CQUFtQixPQUFPLFFBQVEsQ0FBQyxVQUFVLFFBQVEsQ0FBQyxHQUFHLFdBQVc7QUFDeEgsYUFBTyxFQUFFLFVBQVUsT0FBTyxVQUFVLFNBQVMsU0FBUyxZQUFZLE1BQU0sV0FBVyxTQUFTLFNBQVMsU0FBUyxHQUFHLE9BQU8sU0FBUyxTQUFTLEtBQUssR0FBRyxPQUFPLFNBQVMsU0FBUyxLQUFLLEVBQUU7QUFBQSxJQUNwTCxRQUFRO0FBQUUsYUFBTyxFQUFFLFVBQVUsT0FBTyxVQUFVLFNBQVMsTUFBTTtBQUFBLElBQUc7QUFBQSxFQUNsRTtBQUFBLEVBRUEsTUFBYyxnQkFBZ0IsUUFBZ0IsYUFBZ0MsVUFBd0M7QUFDcEgsVUFBTSxXQUFXLE1BQU0sTUFBTSxHQUFHLFVBQVUsb0JBQW9CO0FBQUEsTUFDNUQsUUFBUTtBQUFBLE1BQVEsU0FBUyxFQUFFLGdCQUFnQixvQkFBb0IsR0FBRyxZQUFZLFdBQVcsRUFBRTtBQUFBLE1BQzNGLE1BQU0sS0FBSyxVQUFVLEVBQUUsVUFBVSxPQUFPLFVBQVUsU0FBUyxDQUFDO0FBQUEsSUFDOUQsQ0FBQztBQUNELFFBQUksQ0FBQyxTQUFTLE1BQU0sQ0FBQyxTQUFTLEtBQU0sT0FBTSxJQUFJLE1BQU0sd0JBQXdCLE9BQU8sSUFBSSxVQUFVLFNBQVMsTUFBTSxJQUFJO0FBQ3BILFVBQU0sU0FBUyxTQUFTLEtBQUssVUFBVTtBQUFHLFVBQU0sU0FBdUIsQ0FBQztBQUFHLFFBQUksUUFBUTtBQUN2RixXQUFPLE1BQU07QUFDWCxZQUFNLEVBQUUsT0FBTyxLQUFLLElBQUksTUFBTSxPQUFPLEtBQUs7QUFDMUMsVUFBSSxLQUFNO0FBQ1YsZUFBUyxNQUFNO0FBQ2YsVUFBSSxRQUFRLG1CQUFtQjtBQUFFLGNBQU0sT0FBTyxPQUFPO0FBQUcsY0FBTSxJQUFJLE1BQU0sb0RBQW9EO0FBQUEsTUFBRztBQUMvSCxhQUFPLEtBQUssS0FBSztBQUFBLElBQ25CO0FBQ0EsVUFBTSxVQUFVLElBQUksV0FBVyxLQUFLO0FBQUcsUUFBSSxTQUFTO0FBQ3BELGVBQVcsU0FBUyxRQUFRO0FBQUUsY0FBUSxJQUFJLE9BQU8sTUFBTTtBQUFHLGdCQUFVLE1BQU07QUFBQSxJQUFZO0FBQ3RGLFdBQU8sUUFBUTtBQUFBLEVBQ2pCO0FBQUEsRUFFQSxNQUFjLGdCQUFnQixTQUFzQixVQUEyQixTQUE0QztBQUN6SCxVQUFNLE1BQU0sTUFBTSxhQUFBQyxRQUFNLFVBQVUsU0FBUyxFQUFFLGVBQWUsT0FBTyxZQUFZLE1BQU0sQ0FBQztBQUN0RixVQUFNLFdBQVcsSUFBSSxJQUFJLFFBQVEsTUFBTSxJQUFJLENBQUMsU0FBUyxLQUFLLElBQUksQ0FBQztBQUMvRCxVQUFNLFNBQW1CLENBQUM7QUFBRyxRQUFJLG9CQUFvQjtBQUNyRCxlQUFXLFNBQVMsT0FBTyxPQUFPLElBQUksS0FBSyxHQUFHO0FBQzVDLFlBQU0sWUFBWSxNQUFNLE1BQU0sTUFBTSxLQUFLLFFBQVEsT0FBTyxFQUFFLElBQUksTUFBTTtBQUNwRSxVQUFJLFVBQVcsbUJBQWtCLFdBQVcsY0FBYyxTQUFTLFdBQVcsV0FBVyxDQUFDO0FBQzFGLFVBQUksTUFBTSxJQUFLO0FBQ2YsVUFBSSxFQUFFLE9BQU8sU0FBUyxVQUFXLE9BQU0sSUFBSSxNQUFNLHFDQUFxQztBQUN0RixZQUFNLE9BQU8sa0JBQWtCLE1BQU0sTUFBTSxjQUFjLFNBQVMsV0FBVyxXQUFXLENBQUM7QUFDekYsYUFBTyxLQUFLLElBQUk7QUFDaEIsWUFBTSxPQUFPLGFBQWEsS0FBSztBQUMvQixVQUFJLFNBQVMsT0FBVyxPQUFNLElBQUksTUFBTSxxREFBcUQ7QUFDN0YsMkJBQXFCO0FBQ3JCLFVBQUksb0JBQW9CLHVCQUF3QixPQUFNLElBQUksTUFBTSw4REFBOEQ7QUFBQSxJQUNoSTtBQUNBLFFBQUksSUFBSSxJQUFJLE1BQU0sRUFBRSxTQUFTLE9BQU8sT0FBUSxPQUFNLElBQUksTUFBTSwyQ0FBMkM7QUFDdkcsMEJBQXNCLE1BQU07QUFDNUIsUUFBSSxPQUFPLFdBQVcsU0FBUyxRQUFRLE9BQU8sS0FBSyxDQUFDLFNBQVMsQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLEVBQUcsT0FBTSxJQUFJLE1BQU0sZ0VBQWdFO0FBQ25LLFdBQU8sRUFBRSxVQUFVLFNBQVMsUUFBUSxRQUFRLFdBQVcsUUFBUSxVQUFVO0FBQUEsRUFDM0U7QUFBQSxFQUVBLE1BQWMsTUFBTSxNQUFrQixTQUFzQixVQUFvRDtBQUM5RyxVQUFNLFVBQVUsS0FBSyxJQUFJLE1BQU07QUFDL0IsVUFBTSxXQUFXLEtBQUssUUFBUSxFQUFFO0FBQ2hDLFVBQU0sUUFBUSxJQUFJLElBQUksU0FBUyxVQUFVO0FBR3pDLFVBQU0sWUFBWSxDQUFDLEdBQUcsSUFBSSxJQUFJLEtBQUssU0FBUyxDQUFDO0FBQzdDLGVBQVcsUUFBUSxLQUFLLFFBQVE7QUFDOUIsWUFBTSxzQkFBc0IsS0FBSyxLQUFLLElBQUk7QUFDMUMsVUFBSSxNQUFNLFFBQVEsT0FBTyxJQUFJLEdBQUc7QUFDOUIsYUFBSyxNQUFNLFFBQVEsS0FBSyxJQUFJLElBQUksU0FBUyxTQUFVLE9BQU0sSUFBSSxNQUFNLHVDQUF1QyxJQUFJLEVBQUU7QUFDaEgsWUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLEVBQUcsT0FBTSxJQUFJLE1BQU0sK0NBQStDLElBQUksRUFBRTtBQUFBLE1BQzdGO0FBQUEsSUFDRjtBQUNBLGVBQVcsUUFBUSxXQUFXO0FBQzVCLFlBQU0sc0JBQXNCLEtBQUssS0FBSyxJQUFJO0FBQzFDLFVBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxFQUFHLE9BQU0sSUFBSSxNQUFNLDZEQUE2RCxJQUFJLEVBQUU7QUFBQSxJQUMzRztBQUVBLFVBQU0saUJBQWlCLEdBQUcsV0FBVyxJQUFJLE9BQU8sV0FBVyxDQUFDO0FBQzVELFVBQU0sWUFBWSxHQUFHLGNBQWM7QUFDbkMsVUFBTSxjQUFjLEdBQUcsY0FBYztBQUNyQyxVQUFNLE9BQU8sU0FBUyxTQUFTO0FBQy9CLFVBQU0sVUFBVSxDQUFDLEdBQUcsb0JBQUksSUFBSSxDQUFDLEdBQUcsS0FBSyxRQUFRLEdBQUcsU0FBUyxDQUFDLENBQUM7QUFDM0QsVUFBTSxZQUF1RCxDQUFDO0FBQzlELGVBQVcsUUFBUSxTQUFTO0FBQzFCLFlBQU0sVUFBVSxNQUFNLFFBQVEsT0FBTyxJQUFJO0FBQUcsZ0JBQVUsS0FBSyxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQzVFLFVBQUksUUFBUyxPQUFNLFlBQVksU0FBUyxHQUFHLFNBQVMsSUFBSSxtQkFBbUIsSUFBSSxDQUFDLElBQUksTUFBTSxRQUFRLFdBQVcsSUFBSSxDQUFDO0FBQUEsSUFDcEg7QUFDQSxVQUFNLFFBQVEsTUFBTSxhQUFhLEtBQUssVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBRTlELFFBQUk7QUFDRixZQUFNLE1BQU0sTUFBTSxhQUFBQSxRQUFNLFVBQVUsU0FBUyxFQUFFLGVBQWUsT0FBTyxZQUFZLE1BQU0sQ0FBQztBQUN0RixpQkFBVyxRQUFRLFVBQVcsS0FBSSxNQUFNLFFBQVEsT0FBTyxJQUFJLEVBQUcsT0FBTSxRQUFRLE9BQU8sSUFBSTtBQUN2RixpQkFBVyxRQUFRLEtBQUssUUFBUTtBQUM5QixpQkFBUyxXQUFXLElBQUksUUFBRztBQUMzQixjQUFNLE9BQU8sU0FBUyxPQUFPLElBQUksQ0FBQztBQUNsQyxjQUFNLFFBQVEsSUFBSSxLQUFLLElBQUk7QUFDM0IsWUFBSSxDQUFDLE1BQU8sT0FBTSxJQUFJLE1BQU0sOEJBQThCLElBQUksRUFBRTtBQUNoRSxjQUFNLFlBQVksU0FBUyxNQUFNLE1BQU0sTUFBTSxNQUFNLFlBQVksQ0FBQztBQUFBLE1BQ2xFO0FBQ0EsWUFBTSxZQUFZLElBQUksSUFBSSxTQUFTLFVBQVU7QUFDN0MsaUJBQVcsUUFBUSxVQUFXLFdBQVUsT0FBTyxJQUFJO0FBQ25ELGlCQUFXLFFBQVEsS0FBSyxPQUFRLFdBQVUsSUFBSSxJQUFJO0FBQ2xELFlBQU0sS0FBSyxTQUFTLEVBQUUsV0FBVztBQUFBLFFBQy9CLGdCQUFnQixLQUFLLFFBQVE7QUFBQSxRQUM3QixXQUFXLEtBQUssUUFBUTtBQUFBLFFBQ3hCLG1CQUFtQixDQUFDLEdBQUcsb0JBQUksSUFBSSxDQUFDLEdBQUksU0FBUyxxQkFBcUIsQ0FBQyxHQUFJLEtBQUssUUFBUSxTQUFTLENBQUMsQ0FBQztBQUFBLFFBQy9GLFlBQVksQ0FBQyxHQUFHLFNBQVMsRUFBRSxLQUFLO0FBQUEsTUFDbEMsRUFBRSxDQUFDO0FBQ0gsWUFBTSxXQUFXLFNBQVMsY0FBYztBQUFBLElBQzFDLFNBQVMsT0FBTztBQUNkLFlBQU0sS0FBSyxTQUFTLFNBQVMsV0FBVyxTQUFTO0FBQ2pELFlBQU07QUFBQSxJQUNSO0FBQUEsRUFDRjtBQUFBLEVBRUEsTUFBYyxTQUFTLFNBQXNCLFdBQXNELFdBQWtDO0FBQ25JLGVBQVcsWUFBWSxVQUFVLFFBQVEsR0FBRztBQUMxQyxVQUFJLFNBQVMsUUFBUyxPQUFNLFlBQVksU0FBUyxTQUFTLE1BQU0sTUFBTSxRQUFRLFdBQVcsR0FBRyxTQUFTLElBQUksbUJBQW1CLFNBQVMsSUFBSSxDQUFDLEVBQUUsQ0FBQztBQUFBLGVBQ3BJLE1BQU0sUUFBUSxPQUFPLFNBQVMsSUFBSSxFQUFHLE9BQU0sUUFBUSxPQUFPLFNBQVMsSUFBSTtBQUFBLElBQ2xGO0FBQUEsRUFDRjtBQUFBLEVBRUEsTUFBYyxPQUFPLGFBQWdDLFFBQTZDO0FBQ2hHLFVBQU0sS0FBSyxJQUFJLHlCQUF5QixtQkFBbUIsWUFBWSxFQUFFLENBQUMsV0FBVyxRQUFRLEVBQUUsT0FBTyxHQUFHLFdBQVc7QUFBQSxFQUN0SDtBQUFBLEVBRUEsTUFBYyxJQUFJLE1BQWMsUUFBd0IsTUFBZSxhQUFtRTtBQUN4SSxVQUFNLFdBQVcsTUFBTSxNQUFNLEdBQUcsVUFBVSxHQUFHLElBQUksSUFBSSxFQUFFLFFBQVEsU0FBUyxFQUFFLEdBQUksT0FBTyxFQUFFLGdCQUFnQixtQkFBbUIsSUFBSSxDQUFDLEdBQUksR0FBSSxjQUFjLFlBQVksV0FBVyxJQUFJLENBQUMsRUFBRyxHQUFHLE1BQU0sT0FBTyxLQUFLLFVBQVUsSUFBSSxJQUFJLE9BQVUsQ0FBQztBQUN0TyxVQUFNLE9BQU8sTUFBTSxTQUFTLEtBQUssRUFBRSxNQUFNLE9BQU8sQ0FBQyxFQUFFO0FBQ25ELFFBQUksQ0FBQyxTQUFTLEdBQUksT0FBTSxJQUFJLE1BQU0sT0FBTyxLQUFLLFVBQVUsV0FBVyxLQUFLLFFBQVEsdUNBQXVDLFNBQVMsTUFBTSxJQUFJO0FBQzFJLFdBQU87QUFBQSxFQUNUO0FBQUEsRUFFUSxhQUFpQztBQUN2QyxVQUFNLE1BQU0sS0FBSztBQUNqQixVQUFNLFlBQWEsV0FBZ0Y7QUFDbkcsVUFBTSxhQUFhLENBQUMsSUFBSSxTQUFTLElBQUksWUFBWSxXQUFXLFNBQVMsV0FBVyxZQUFZLElBQUksTUFBTSxZQUFZLFlBQVksQ0FBQztBQUMvSCxXQUFPLFdBQVcsS0FBSyxDQUFDLFVBQTJCLE9BQU8sVUFBVSxZQUFZLGlCQUFpQixLQUFLLEtBQUssQ0FBQztBQUFBLEVBQzlHO0FBQ0Y7QUFFQSxTQUFTLFlBQVksYUFBd0Q7QUFBRSxTQUFPLEVBQUUsd0JBQXdCLFlBQVksSUFBSSxpQkFBaUIsVUFBVSxZQUFZLEtBQUssR0FBRztBQUFHO0FBQ2xMLFNBQVMsU0FBUyxPQUFpQztBQUFFLFNBQU8sT0FBTyxVQUFVLFlBQVksVUFBVSxRQUFRLE9BQVEsTUFBaUIsYUFBYSxZQUFZLE9BQVEsTUFBaUIsU0FBUyxZQUFZLE9BQVEsTUFBaUIsYUFBYSxZQUFZLE9BQVEsTUFBaUIsa0JBQWtCO0FBQVc7QUFDblQsU0FBUyxNQUFNLFFBQWdCLE9BQTRCO0FBQUUsVUFBUSxNQUFNLGFBQWEsT0FBVSxPQUFPLFdBQVcsTUFBTSxNQUFNLFNBQVMsS0FBSztBQUFNO0FBQ3BKLFNBQVMsU0FBUyxPQUFvQztBQUFFLFNBQU8sT0FBTyxVQUFVLFlBQVksT0FBTyxTQUFTLEtBQUssSUFBSSxRQUFRO0FBQVc7QUFDeEksU0FBUyxTQUFTLE9BQW9DO0FBQUUsU0FBTyxPQUFPLFVBQVUsV0FBVyxRQUFRO0FBQVc7QUFDOUcsU0FBUyxhQUFhLE9BQThDO0FBQ2xFLFFBQU0sT0FBUSxNQUFnRSxPQUFPO0FBQ3JGLFNBQU8sT0FBTyxTQUFTLFlBQVksT0FBTyxjQUFjLElBQUksS0FBSyxRQUFRLElBQUksT0FBTztBQUN0RjtBQUNBLFNBQVMsT0FBTyxNQUFzQjtBQUFFLFFBQU0sUUFBUSxLQUFLLFlBQVksR0FBRztBQUFHLFNBQU8sVUFBVSxLQUFLLEtBQUssS0FBSyxNQUFNLEdBQUcsS0FBSztBQUFHO0FBQzlILGVBQWUsT0FBTyxTQUFzQixNQUE2QjtBQUN2RSxNQUFJLENBQUMsS0FBTTtBQUNYLE1BQUksVUFBVTtBQUNkLGFBQVcsV0FBVyxLQUFLLE1BQU0sR0FBRyxHQUFHO0FBQ3JDLGNBQVUsVUFBVSxHQUFHLE9BQU8sSUFBSSxPQUFPLEtBQUs7QUFDOUMsUUFBSSxDQUFFLE1BQU0sUUFBUSxPQUFPLE9BQU8sRUFBSSxPQUFNLFFBQVEsTUFBTSxPQUFPO0FBQUEsRUFDbkU7QUFDRjtBQUNBLGVBQWUsWUFBWSxTQUFzQixNQUFjLE1BQStDO0FBQUUsUUFBTSxPQUFPLElBQUksV0FBVyxnQkFBZ0IsYUFBYSxPQUFPLElBQUksV0FBVyxJQUFJLENBQUM7QUFBRyxRQUFNLE9BQU8sU0FBUyxPQUFPLElBQUksQ0FBQztBQUFHLFFBQU0sUUFBUSxZQUFZLE1BQU0sS0FBSyxNQUFNO0FBQUc7QUFDMVIsZUFBZSxXQUFXLFNBQXNCLE1BQTZCO0FBQUUsTUFBSSxNQUFNLFFBQVEsT0FBTyxJQUFJLEVBQUcsT0FBTSxRQUFRLE1BQU0sTUFBTSxJQUFJO0FBQUc7QUFDaEosZUFBZSxzQkFBc0IsS0FBVSxXQUFrQztBQUMvRSxRQUFNLFdBQVksSUFBSSxNQUFNLFFBQXNELGNBQWM7QUFDaEcsUUFBTSxZQUFhLFdBQWtJO0FBQ3JKLE1BQUksQ0FBQyxZQUFZLENBQUMsVUFBVztBQUM3QixRQUFNLEtBQUssVUFBVSxhQUFhO0FBQ2xDLE1BQUksVUFBVTtBQUNkLGFBQVcsV0FBVyxVQUFVLE1BQU0sR0FBRyxHQUFHO0FBQzFDLGNBQVUsR0FBRyxPQUFPLElBQUksT0FBTztBQUMvQixRQUFJO0FBQ0YsV0FBSyxNQUFNLEdBQUcsTUFBTSxPQUFPLEdBQUcsZUFBZSxFQUFHLE9BQU0sSUFBSSxNQUFNLGlEQUFpRCxTQUFTLEVBQUU7QUFBQSxJQUM5SCxTQUFTLE9BQU87QUFDZCxVQUFLLE1BQTRCLFNBQVMsU0FBVSxPQUFNO0FBQUEsSUFDNUQ7QUFBQSxFQUNGO0FBQ0Y7OztBRGpTQSxJQUFNLGVBQTJCLEVBQUUsV0FBVyxFQUFFLFlBQVksQ0FBQyxHQUFHLG1CQUFtQixDQUFDLEVBQUUsRUFBRTtBQUV4RixJQUFxQixzQkFBckIsY0FBaUQsd0JBQU87QUFBQSxFQUM5QyxPQUFtQjtBQUFBLEVBQ25CO0FBQUEsRUFFUixNQUFNLFNBQXdCO0FBQzVCLFVBQU0sUUFBUSxNQUFNLEtBQUssU0FBUyxLQUFLLENBQUM7QUFDeEMsU0FBSyxPQUFPLEVBQUUsR0FBRyxjQUFjLEdBQUcsT0FBTyxXQUFXLEVBQUUsWUFBWSxDQUFDLEdBQUcsbUJBQW1CLENBQUMsR0FBRyxHQUFHLE1BQU0sVUFBVSxFQUFFO0FBQ2xILFNBQUssVUFBVSxJQUFJLGNBQWMsS0FBSyxLQUFLLEtBQUssU0FBUyxTQUFTLE1BQU0sS0FBSyxNQUFNLE9BQU8sU0FBUztBQUFFLFdBQUssT0FBTztBQUFNLFlBQU0sS0FBSyxTQUFTLElBQUk7QUFBQSxJQUFHLENBQUM7QUFDbkosU0FBSyxjQUFjLFlBQVkseUJBQXlCLE1BQU0sS0FBSyxLQUFLLGVBQWUsQ0FBQztBQUN4RixTQUFLLFdBQVcsRUFBRSxJQUFJLDRCQUE0QixNQUFNLDRCQUE0QixVQUFVLE1BQU0sS0FBSyxLQUFLLGVBQWUsRUFBRSxDQUFDO0FBQUEsRUFDbEk7QUFBQSxFQUVBLE1BQWMsaUJBQWdDO0FBQzVDLFFBQUk7QUFDRixZQUFNLFdBQVcsTUFBTSxLQUFLLFFBQVEsTUFBTTtBQUMxQyxVQUFJLENBQUMsVUFBVTtBQUFFLFlBQUksd0JBQU8scUNBQXFDO0FBQUc7QUFBQSxNQUFRO0FBQzVFLFVBQUksWUFBWSxLQUFLLEtBQUssVUFBVSxDQUFDLGFBQWEsS0FBSyxRQUFRLFFBQVEsVUFBVSxRQUFRLENBQUMsRUFBRSxLQUFLO0FBQUEsSUFDbkcsU0FBUyxPQUFPO0FBQUUsVUFBSSx3QkFBTyx3Q0FBd0MsUUFBUSxLQUFLLENBQUMsRUFBRTtBQUFBLElBQUc7QUFBQSxFQUMxRjtBQUNGO0FBRUEsSUFBTSxjQUFOLGNBQTBCLHVCQUFNO0FBQUEsRUFDOUIsWUFBWSxLQUEyQixPQUFxQyxTQUFpRTtBQUFFLFVBQU0sR0FBRztBQUFqSDtBQUFxQztBQUFBLEVBQStFO0FBQUEsRUFDM0osU0FBZTtBQUNiLFVBQU0sRUFBRSxVQUFVLElBQUk7QUFDdEIsVUFBTSxRQUFRLEtBQUssTUFBTSxTQUFTLENBQUM7QUFBRyxVQUFNLE9BQU8sS0FBSyxNQUFNLFNBQVMsR0FBRyxFQUFFO0FBQzVFLGNBQVUsU0FBUyxNQUFNLEVBQUUsTUFBTSxXQUFXLEtBQUssTUFBTSxTQUFTLE1BQU0sbUJBQW1CLEtBQUssTUFBTSxTQUFTLFdBQVcsSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDO0FBQ3hJLGNBQVUsU0FBUyxLQUFLLEVBQUUsTUFBTSxHQUFHLE1BQU0sY0FBYyxXQUFNLEtBQUssY0FBYyxHQUFHLENBQUM7QUFDcEYsVUFBTSxPQUFPLFVBQVUsU0FBUyxJQUFJO0FBQ3BDLGVBQVcsV0FBVyxLQUFLLE1BQU0sU0FBVSxNQUFLLFNBQVMsTUFBTSxFQUFFLE1BQU0sR0FBRyxRQUFRLGNBQWMsV0FBTSxRQUFRLGFBQWEsT0FBTyxHQUFHLENBQUM7QUFDdEksVUFBTSxTQUFTLFVBQVUsU0FBUyxHQUFHO0FBQ3JDLFFBQUkseUJBQVEsU0FBUyxFQUNsQixVQUFVLENBQUMsV0FBVyxPQUFPLGNBQWMsUUFBUSxFQUFFLFFBQVEsTUFBTSxLQUFLLE1BQU0sQ0FBQyxDQUFDLEVBQ2hGLFVBQVUsQ0FBQyxXQUFXLE9BQU8sT0FBTyxFQUFFLGNBQWMsWUFBWSxFQUFFLFFBQVEsWUFBWTtBQUNyRixhQUFPLFlBQVksSUFBSTtBQUFHLGFBQU8sUUFBUSx1QkFBa0I7QUFDM0QsVUFBSTtBQUFFLGNBQU0sS0FBSyxRQUFRLENBQUMsU0FBUyxPQUFPLFFBQVEsSUFBSSxDQUFDO0FBQUcsYUFBSyxNQUFNO0FBQUEsTUFBRyxTQUNqRSxPQUFPO0FBQUUsZUFBTyxRQUFRLGtCQUFrQixRQUFRLEtBQUssQ0FBQyxFQUFFO0FBQUcsZUFBTyxZQUFZLEtBQUs7QUFBQSxNQUFHO0FBQUEsSUFDakcsQ0FBQyxDQUFDO0FBQUEsRUFDTjtBQUFBLEVBQ0EsVUFBZ0I7QUFBRSxTQUFLLFVBQVUsTUFBTTtBQUFBLEVBQUc7QUFDNUM7QUFDQSxTQUFTLFFBQVEsT0FBd0I7QUFBRSxTQUFPLGlCQUFpQixRQUFRLE1BQU0sVUFBVTtBQUFpQjsiLAogICJuYW1lcyI6IFsibW9kdWxlIiwgImUiLCAidCIsICJyIiwgImMiLCAibiIsICJpIiwgInMiLCAiYSIsICJvIiwgImgiLCAidSIsICJsIiwgImYiLCAiZCIsICJwIiwgIm0iLCAiaW1wb3J0X29ic2lkaWFuIiwgIkpTWmlwIl0KfQo=
