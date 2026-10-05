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
    ids.add(release.releaseId);
    if (index > 0 && compareRelease(releases[index - 1], release) >= 0) throw new Error("releases must be in strictly increasing version and publication order.");
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
  return { releaseVersion: input.releaseVersion, releaseId: input.releaseId, publishedAt: input.publishedAt, filename: input.filename, files, deletions: files.filter((file) => file.change === "-").map((file) => file.path), releaseNotes: input.releaseNotes };
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
    const language = this.getData().languageCode;
    if (!language) throw new Error("Choose this vault\u2019s Tbpedia language in the plugin settings first.");
    const edition = this.getData().editionId;
    const manifest = await this.fetchManifest(language, edition);
    this.assertSelectedCollection(manifest);
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
  async install(batch, progress, confirmOverwrite) {
    this.assertSelectedCollection(batch.manifest);
    this.assertCompatible(batch.manifest);
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
    new import_obsidian.Notice(`Tbpedia updated through ${batch.releases.at(-1).releaseVersion}.`);
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
    const installed = this.getData().installed;
    const installedIndex = installed.releaseId ? manifest.releases.findIndex((release) => release.releaseId === installed.releaseId) : -1;
    if (installedIndex >= 0) return manifest.releases.slice(installedIndex + 1);
    if (!installed.releaseVersion) return manifest.releases;
    const key = [manifest.collection.language.code, manifest.collection.series.id, manifest.collection.edition.id].join("-").toLowerCase();
    if (!installed.releaseVersion.startsWith(`${key}-`) && !/^\d{4}\./.test(installed.releaseVersion)) {
      return manifest.releases.filter((release) => !installed.appliedReleaseIds.includes(release.releaseId));
    }
    return manifest.releases.filter((release) => compareReleaseVersions(release.releaseVersion, installed.releaseVersion) > 0);
  }
  async fetchManifest(language, edition) {
    if (edition !== "standard" && edition !== "advanced") throw new Error("Choose a supported Tbpedia edition in the plugin settings.");
    const editionPath = edition === "advanced" ? "/advanced" : "";
    const response = await (0, import_obsidian.requestUrl)({ url: `${MANIFEST_BASE_URL}/${language.toLowerCase()}${editionPath}/latest.json`, method: "GET", throw: false });
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
    if (manifest.collection.language.code !== data.languageCode || manifest.collection.series.id !== data.seriesId || manifest.collection.edition.id !== data.editionId) {
      throw new Error("The release manifest does not match the selected language, series, and edition. Check for updates again after changing settings.");
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
    if (actual.length !== expected.size || actual.some((path) => !expected.has(path))) throw new Error("Release archive does not exactly match the manifest inventory.");
    return { manifest, release, writes: actual, deletions: release.deletions };
  }
  async apply(plan, archive, progress, confirmOverwrite) {
    const adapter = this.app.vault.adapter;
    const previous = this.getData().installed;
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
      const nextOwned = { ...previous.ownedFiles, [plan.release.releaseId]: plan.release.files.map((file) => ({ ...file })) };
      await this.saveData({ ...this.getData(), installed: {
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

// src/main.ts
var DEFAULT_DATA = { seriesId: "reading", editionId: "standard", installed: { ownedFiles: {}, appliedReleaseIds: [] } };
var TbpediaUpdatePlugin = class extends import_obsidian2.Plugin {
  data = DEFAULT_DATA;
  updater;
  async onload() {
    const saved = await this.loadData() ?? {};
    this.data = { ...DEFAULT_DATA, ...saved, installed: { ownedFiles: {}, appliedReleaseIds: [], ...saved.installed } };
    this.data.installed.ownedFiles = migrateOwnedFiles(this.data.installed.ownedFiles, this.data.installed);
    await this.persistData(this.data);
    this.updater = new UpdateService(this.app, this.manifest.version, () => this.data, (data) => this.persistData(data));
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
      new UpdateModal(this.app, manifest, (progress) => this.updater.install(
        manifest,
        progress,
        (path) => new Promise((resolve) => new OverwriteModal(this.app, path, resolve).open())
      )).open();
    } catch (error) {
      new import_obsidian2.Notice(`Could not check for Tbpedia updates: ${message(error)}`);
    }
  }
  async setLanguageCode(languageCode) {
    await this.persistData({ ...this.data, languageCode });
  }
  async setEditionId(editionId) {
    if (editionId !== "standard" && editionId !== "advanced") throw new Error("Unsupported Tbpedia edition.");
    await this.persistData({ ...this.data, editionId });
  }
  async persistData(data) {
    const { languageCode, seriesId, editionId, ...rest } = data;
    this.data = { languageCode, seriesId, editionId, ...rest };
    await this.saveData(this.data);
  }
  get languageCode() {
    return this.data.languageCode;
  }
  get editionId() {
    return this.data.editionId;
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
    new import_obsidian2.Setting(containerEl).setName("Vault edition").setDesc("Choose Standard or Advanced to use that edition\u2019s release history. Existing release records are preserved.").addDropdown((dropdown) => {
      dropdown.addOption("standard", "Standard (\u6A19\u6E96\u7248\u672C)");
      dropdown.addOption("advanced", "Advanced (\u9AD8\u7D1A\u7248\u672C)");
      dropdown.setValue(this.plugin.editionId);
      dropdown.onChange(async (value) => {
        await this.plugin.setEditionId(value);
      });
    });
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibm9kZV9tb2R1bGVzLy5wbnBtL2pzemlwQDMuMTAuMi9ub2RlX21vZHVsZXMvanN6aXAvZGlzdC9qc3ppcC5taW4uanMiLCAic3JjL21haW4udHMiLCAic3JjL3VwZGF0ZS1zZXJ2aWNlLnRzIiwgInNyYy90eXBlcy50cyIsICJzcmMvcGF0aC1wb2xpY3kudHMiLCAic3JjL21hbmlmZXN0LnRzIiwgInNyYy9vd25lcnNoaXAudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8qIVxuXG5KU1ppcCB2My4xMC4yIC0gQSBKYXZhU2NyaXB0IGNsYXNzIGZvciBnZW5lcmF0aW5nIGFuZCByZWFkaW5nIHppcCBmaWxlc1xuPGh0dHA6Ly9zdHVhcnRrLmNvbS9qc3ppcD5cblxuKGMpIDIwMDktMjAxNiBTdHVhcnQgS25pZ2h0bGV5IDxzdHVhcnQgW2F0XSBzdHVhcnRrLmNvbT5cbkR1YWwgbGljZW5jZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIG9yIEdQTHYzLiBTZWUgaHR0cHM6Ly9yYXcuZ2l0aHViLmNvbS9TdHVrL2pzemlwL21haW4vTElDRU5TRS5tYXJrZG93bi5cblxuSlNaaXAgdXNlcyB0aGUgbGlicmFyeSBwYWtvIHJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSA6XG5odHRwczovL2dpdGh1Yi5jb20vbm9kZWNhL3Bha28vYmxvYi9tYWluL0xJQ0VOU0VcbiovXG5cbiFmdW5jdGlvbihlKXtpZihcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIG1vZHVsZSltb2R1bGUuZXhwb3J0cz1lKCk7ZWxzZSBpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQpZGVmaW5lKFtdLGUpO2Vsc2V7KFwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/d2luZG93OlwidW5kZWZpbmVkXCIhPXR5cGVvZiBnbG9iYWw/Z2xvYmFsOlwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmP3NlbGY6dGhpcykuSlNaaXA9ZSgpfX0oZnVuY3Rpb24oKXtyZXR1cm4gZnVuY3Rpb24gcyhhLG8saCl7ZnVuY3Rpb24gdShyLGUpe2lmKCFvW3JdKXtpZighYVtyXSl7dmFyIHQ9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZSYmdClyZXR1cm4gdChyLCEwKTtpZihsKXJldHVybiBsKHIsITApO3ZhciBuPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrcitcIidcIik7dGhyb3cgbi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLG59dmFyIGk9b1tyXT17ZXhwb3J0czp7fX07YVtyXVswXS5jYWxsKGkuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgdD1hW3JdWzFdW2VdO3JldHVybiB1KHR8fGUpfSxpLGkuZXhwb3J0cyxzLGEsbyxoKX1yZXR1cm4gb1tyXS5leHBvcnRzfWZvcih2YXIgbD1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGU9MDtlPGgubGVuZ3RoO2UrKyl1KGhbZV0pO3JldHVybiB1fSh7MTpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3ZhciBkPWUoXCIuL3V0aWxzXCIpLGM9ZShcIi4vc3VwcG9ydFwiKSxwPVwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLz1cIjtyLmVuY29kZT1mdW5jdGlvbihlKXtmb3IodmFyIHQscixuLGkscyxhLG8saD1bXSx1PTAsbD1lLmxlbmd0aCxmPWwsYz1cInN0cmluZ1wiIT09ZC5nZXRUeXBlT2YoZSk7dTxlLmxlbmd0aDspZj1sLXUsbj1jPyh0PWVbdSsrXSxyPXU8bD9lW3UrK106MCx1PGw/ZVt1KytdOjApOih0PWUuY2hhckNvZGVBdCh1KyspLHI9dTxsP2UuY2hhckNvZGVBdCh1KyspOjAsdTxsP2UuY2hhckNvZGVBdCh1KyspOjApLGk9dD4+MixzPSgzJnQpPDw0fHI+PjQsYT0xPGY/KDE1JnIpPDwyfG4+PjY6NjQsbz0yPGY/NjMmbjo2NCxoLnB1c2gocC5jaGFyQXQoaSkrcC5jaGFyQXQocykrcC5jaGFyQXQoYSkrcC5jaGFyQXQobykpO3JldHVybiBoLmpvaW4oXCJcIil9LHIuZGVjb2RlPWZ1bmN0aW9uKGUpe3ZhciB0LHIsbixpLHMsYSxvPTAsaD0wLHU9XCJkYXRhOlwiO2lmKGUuc3Vic3RyKDAsdS5sZW5ndGgpPT09dSl0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGJhc2U2NCBpbnB1dCwgaXQgbG9va3MgbGlrZSBhIGRhdGEgdXJsLlwiKTt2YXIgbCxmPTMqKGU9ZS5yZXBsYWNlKC9bXkEtWmEtejAtOSsvPV0vZyxcIlwiKSkubGVuZ3RoLzQ7aWYoZS5jaGFyQXQoZS5sZW5ndGgtMSk9PT1wLmNoYXJBdCg2NCkmJmYtLSxlLmNoYXJBdChlLmxlbmd0aC0yKT09PXAuY2hhckF0KDY0KSYmZi0tLGYlMSE9MCl0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGJhc2U2NCBpbnB1dCwgYmFkIGNvbnRlbnQgbGVuZ3RoLlwiKTtmb3IobD1jLnVpbnQ4YXJyYXk/bmV3IFVpbnQ4QXJyYXkoMHxmKTpuZXcgQXJyYXkoMHxmKTtvPGUubGVuZ3RoOyl0PXAuaW5kZXhPZihlLmNoYXJBdChvKyspKTw8MnwoaT1wLmluZGV4T2YoZS5jaGFyQXQobysrKSkpPj40LHI9KDE1JmkpPDw0fChzPXAuaW5kZXhPZihlLmNoYXJBdChvKyspKSk+PjIsbj0oMyZzKTw8NnwoYT1wLmluZGV4T2YoZS5jaGFyQXQobysrKSkpLGxbaCsrXT10LDY0IT09cyYmKGxbaCsrXT1yKSw2NCE9PWEmJihsW2grK109bik7cmV0dXJuIGx9fSx7XCIuL3N1cHBvcnRcIjozMCxcIi4vdXRpbHNcIjozMn1dLDI6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt2YXIgbj1lKFwiLi9leHRlcm5hbFwiKSxpPWUoXCIuL3N0cmVhbS9EYXRhV29ya2VyXCIpLHM9ZShcIi4vc3RyZWFtL0NyYzMyUHJvYmVcIiksYT1lKFwiLi9zdHJlYW0vRGF0YUxlbmd0aFByb2JlXCIpO2Z1bmN0aW9uIG8oZSx0LHIsbixpKXt0aGlzLmNvbXByZXNzZWRTaXplPWUsdGhpcy51bmNvbXByZXNzZWRTaXplPXQsdGhpcy5jcmMzMj1yLHRoaXMuY29tcHJlc3Npb249bix0aGlzLmNvbXByZXNzZWRDb250ZW50PWl9by5wcm90b3R5cGU9e2dldENvbnRlbnRXb3JrZXI6ZnVuY3Rpb24oKXt2YXIgZT1uZXcgaShuLlByb21pc2UucmVzb2x2ZSh0aGlzLmNvbXByZXNzZWRDb250ZW50KSkucGlwZSh0aGlzLmNvbXByZXNzaW9uLnVuY29tcHJlc3NXb3JrZXIoKSkucGlwZShuZXcgYShcImRhdGFfbGVuZ3RoXCIpKSx0PXRoaXM7cmV0dXJuIGUub24oXCJlbmRcIixmdW5jdGlvbigpe2lmKHRoaXMuc3RyZWFtSW5mby5kYXRhX2xlbmd0aCE9PXQudW5jb21wcmVzc2VkU2l6ZSl0aHJvdyBuZXcgRXJyb3IoXCJCdWcgOiB1bmNvbXByZXNzZWQgZGF0YSBzaXplIG1pc21hdGNoXCIpfSksZX0sZ2V0Q29tcHJlc3NlZFdvcmtlcjpmdW5jdGlvbigpe3JldHVybiBuZXcgaShuLlByb21pc2UucmVzb2x2ZSh0aGlzLmNvbXByZXNzZWRDb250ZW50KSkud2l0aFN0cmVhbUluZm8oXCJjb21wcmVzc2VkU2l6ZVwiLHRoaXMuY29tcHJlc3NlZFNpemUpLndpdGhTdHJlYW1JbmZvKFwidW5jb21wcmVzc2VkU2l6ZVwiLHRoaXMudW5jb21wcmVzc2VkU2l6ZSkud2l0aFN0cmVhbUluZm8oXCJjcmMzMlwiLHRoaXMuY3JjMzIpLndpdGhTdHJlYW1JbmZvKFwiY29tcHJlc3Npb25cIix0aGlzLmNvbXByZXNzaW9uKX19LG8uY3JlYXRlV29ya2VyRnJvbT1mdW5jdGlvbihlLHQscil7cmV0dXJuIGUucGlwZShuZXcgcykucGlwZShuZXcgYShcInVuY29tcHJlc3NlZFNpemVcIikpLnBpcGUodC5jb21wcmVzc1dvcmtlcihyKSkucGlwZShuZXcgYShcImNvbXByZXNzZWRTaXplXCIpKS53aXRoU3RyZWFtSW5mbyhcImNvbXByZXNzaW9uXCIsdCl9LHQuZXhwb3J0cz1vfSx7XCIuL2V4dGVybmFsXCI6NixcIi4vc3RyZWFtL0NyYzMyUHJvYmVcIjoyNSxcIi4vc3RyZWFtL0RhdGFMZW5ndGhQcm9iZVwiOjI2LFwiLi9zdHJlYW0vRGF0YVdvcmtlclwiOjI3fV0sMzpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3ZhciBuPWUoXCIuL3N0cmVhbS9HZW5lcmljV29ya2VyXCIpO3IuU1RPUkU9e21hZ2ljOlwiXFwwXFwwXCIsY29tcHJlc3NXb3JrZXI6ZnVuY3Rpb24oKXtyZXR1cm4gbmV3IG4oXCJTVE9SRSBjb21wcmVzc2lvblwiKX0sdW5jb21wcmVzc1dvcmtlcjpmdW5jdGlvbigpe3JldHVybiBuZXcgbihcIlNUT1JFIGRlY29tcHJlc3Npb25cIil9fSxyLkRFRkxBVEU9ZShcIi4vZmxhdGVcIil9LHtcIi4vZmxhdGVcIjo3LFwiLi9zdHJlYW0vR2VuZXJpY1dvcmtlclwiOjI4fV0sNDpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3ZhciBuPWUoXCIuL3V0aWxzXCIpO3ZhciBvPWZ1bmN0aW9uKCl7Zm9yKHZhciBlLHQ9W10scj0wO3I8MjU2O3IrKyl7ZT1yO2Zvcih2YXIgbj0wO248ODtuKyspZT0xJmU/Mzk4ODI5MjM4NF5lPj4+MTplPj4+MTt0W3JdPWV9cmV0dXJuIHR9KCk7dC5leHBvcnRzPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIHZvaWQgMCE9PWUmJmUubGVuZ3RoP1wic3RyaW5nXCIhPT1uLmdldFR5cGVPZihlKT9mdW5jdGlvbihlLHQscixuKXt2YXIgaT1vLHM9bityO2VePS0xO2Zvcih2YXIgYT1uO2E8czthKyspZT1lPj4+OF5pWzI1NSYoZV50W2FdKV07cmV0dXJuLTFeZX0oMHx0LGUsZS5sZW5ndGgsMCk6ZnVuY3Rpb24oZSx0LHIsbil7dmFyIGk9byxzPW4rcjtlXj0tMTtmb3IodmFyIGE9bjthPHM7YSsrKWU9ZT4+PjheaVsyNTUmKGVedC5jaGFyQ29kZUF0KGEpKV07cmV0dXJuLTFeZX0oMHx0LGUsZS5sZW5ndGgsMCk6MH19LHtcIi4vdXRpbHNcIjozMn1dLDU6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjtyLmJhc2U2ND0hMSxyLmJpbmFyeT0hMSxyLmRpcj0hMSxyLmNyZWF0ZUZvbGRlcnM9ITAsci5kYXRlPW51bGwsci5jb21wcmVzc2lvbj1udWxsLHIuY29tcHJlc3Npb25PcHRpb25zPW51bGwsci5jb21tZW50PW51bGwsci51bml4UGVybWlzc2lvbnM9bnVsbCxyLmRvc1Blcm1pc3Npb25zPW51bGx9LHt9XSw2OltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7dmFyIG49bnVsbDtuPVwidW5kZWZpbmVkXCIhPXR5cGVvZiBQcm9taXNlP1Byb21pc2U6ZShcImxpZVwiKSx0LmV4cG9ydHM9e1Byb21pc2U6bn19LHtsaWU6Mzd9XSw3OltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7dmFyIG49XCJ1bmRlZmluZWRcIiE9dHlwZW9mIFVpbnQ4QXJyYXkmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBVaW50MTZBcnJheSYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIFVpbnQzMkFycmF5LGk9ZShcInBha29cIikscz1lKFwiLi91dGlsc1wiKSxhPWUoXCIuL3N0cmVhbS9HZW5lcmljV29ya2VyXCIpLG89bj9cInVpbnQ4YXJyYXlcIjpcImFycmF5XCI7ZnVuY3Rpb24gaChlLHQpe2EuY2FsbCh0aGlzLFwiRmxhdGVXb3JrZXIvXCIrZSksdGhpcy5fcGFrbz1udWxsLHRoaXMuX3Bha29BY3Rpb249ZSx0aGlzLl9wYWtvT3B0aW9ucz10LHRoaXMubWV0YT17fX1yLm1hZ2ljPVwiXFxiXFwwXCIscy5pbmhlcml0cyhoLGEpLGgucHJvdG90eXBlLnByb2Nlc3NDaHVuaz1mdW5jdGlvbihlKXt0aGlzLm1ldGE9ZS5tZXRhLG51bGw9PT10aGlzLl9wYWtvJiZ0aGlzLl9jcmVhdGVQYWtvKCksdGhpcy5fcGFrby5wdXNoKHMudHJhbnNmb3JtVG8obyxlLmRhdGEpLCExKX0saC5wcm90b3R5cGUuZmx1c2g9ZnVuY3Rpb24oKXthLnByb3RvdHlwZS5mbHVzaC5jYWxsKHRoaXMpLG51bGw9PT10aGlzLl9wYWtvJiZ0aGlzLl9jcmVhdGVQYWtvKCksdGhpcy5fcGFrby5wdXNoKFtdLCEwKX0saC5wcm90b3R5cGUuY2xlYW5VcD1mdW5jdGlvbigpe2EucHJvdG90eXBlLmNsZWFuVXAuY2FsbCh0aGlzKSx0aGlzLl9wYWtvPW51bGx9LGgucHJvdG90eXBlLl9jcmVhdGVQYWtvPWZ1bmN0aW9uKCl7dGhpcy5fcGFrbz1uZXcgaVt0aGlzLl9wYWtvQWN0aW9uXSh7cmF3OiEwLGxldmVsOnRoaXMuX3Bha29PcHRpb25zLmxldmVsfHwtMX0pO3ZhciB0PXRoaXM7dGhpcy5fcGFrby5vbkRhdGE9ZnVuY3Rpb24oZSl7dC5wdXNoKHtkYXRhOmUsbWV0YTp0Lm1ldGF9KX19LHIuY29tcHJlc3NXb3JrZXI9ZnVuY3Rpb24oZSl7cmV0dXJuIG5ldyBoKFwiRGVmbGF0ZVwiLGUpfSxyLnVuY29tcHJlc3NXb3JrZXI9ZnVuY3Rpb24oKXtyZXR1cm4gbmV3IGgoXCJJbmZsYXRlXCIse30pfX0se1wiLi9zdHJlYW0vR2VuZXJpY1dvcmtlclwiOjI4LFwiLi91dGlsc1wiOjMyLHBha286Mzh9XSw4OltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gQShlLHQpe3ZhciByLG49XCJcIjtmb3Iocj0wO3I8dDtyKyspbis9U3RyaW5nLmZyb21DaGFyQ29kZSgyNTUmZSksZT4+Pj04O3JldHVybiBufWZ1bmN0aW9uIG4oZSx0LHIsbixpLHMpe3ZhciBhLG8saD1lLmZpbGUsdT1lLmNvbXByZXNzaW9uLGw9cyE9PU8udXRmOGVuY29kZSxmPUkudHJhbnNmb3JtVG8oXCJzdHJpbmdcIixzKGgubmFtZSkpLGM9SS50cmFuc2Zvcm1UbyhcInN0cmluZ1wiLE8udXRmOGVuY29kZShoLm5hbWUpKSxkPWguY29tbWVudCxwPUkudHJhbnNmb3JtVG8oXCJzdHJpbmdcIixzKGQpKSxtPUkudHJhbnNmb3JtVG8oXCJzdHJpbmdcIixPLnV0ZjhlbmNvZGUoZCkpLF89Yy5sZW5ndGghPT1oLm5hbWUubGVuZ3RoLGc9bS5sZW5ndGghPT1kLmxlbmd0aCxiPVwiXCIsdj1cIlwiLHk9XCJcIix3PWguZGlyLGs9aC5kYXRlLHg9e2NyYzMyOjAsY29tcHJlc3NlZFNpemU6MCx1bmNvbXByZXNzZWRTaXplOjB9O3QmJiFyfHwoeC5jcmMzMj1lLmNyYzMyLHguY29tcHJlc3NlZFNpemU9ZS5jb21wcmVzc2VkU2l6ZSx4LnVuY29tcHJlc3NlZFNpemU9ZS51bmNvbXByZXNzZWRTaXplKTt2YXIgUz0wO3QmJihTfD04KSxsfHwhXyYmIWd8fChTfD0yMDQ4KTt2YXIgej0wLEM9MDt3JiYoenw9MTYpLFwiVU5JWFwiPT09aT8oQz03OTgsenw9ZnVuY3Rpb24oZSx0KXt2YXIgcj1lO3JldHVybiBlfHwocj10PzE2ODkzOjMzMjA0KSwoNjU1MzUmcik8PDE2fShoLnVuaXhQZXJtaXNzaW9ucyx3KSk6KEM9MjAsenw9ZnVuY3Rpb24oZSl7cmV0dXJuIDYzJihlfHwwKX0oaC5kb3NQZXJtaXNzaW9ucykpLGE9ay5nZXRVVENIb3VycygpLGE8PD02LGF8PWsuZ2V0VVRDTWludXRlcygpLGE8PD01LGF8PWsuZ2V0VVRDU2Vjb25kcygpLzIsbz1rLmdldFVUQ0Z1bGxZZWFyKCktMTk4MCxvPDw9NCxvfD1rLmdldFVUQ01vbnRoKCkrMSxvPDw9NSxvfD1rLmdldFVUQ0RhdGUoKSxfJiYodj1BKDEsMSkrQShCKGYpLDQpK2MsYis9XCJ1cFwiK0Eodi5sZW5ndGgsMikrdiksZyYmKHk9QSgxLDEpK0EoQihwKSw0KSttLGIrPVwidWNcIitBKHkubGVuZ3RoLDIpK3kpO3ZhciBFPVwiXCI7cmV0dXJuIEUrPVwiXFxuXFwwXCIsRSs9QShTLDIpLEUrPXUubWFnaWMsRSs9QShhLDIpLEUrPUEobywyKSxFKz1BKHguY3JjMzIsNCksRSs9QSh4LmNvbXByZXNzZWRTaXplLDQpLEUrPUEoeC51bmNvbXByZXNzZWRTaXplLDQpLEUrPUEoZi5sZW5ndGgsMiksRSs9QShiLmxlbmd0aCwyKSx7ZmlsZVJlY29yZDpSLkxPQ0FMX0ZJTEVfSEVBREVSK0UrZitiLGRpclJlY29yZDpSLkNFTlRSQUxfRklMRV9IRUFERVIrQShDLDIpK0UrQShwLmxlbmd0aCwyKStcIlxcMFxcMFxcMFxcMFwiK0Eoeiw0KStBKG4sNCkrZitiK3B9fXZhciBJPWUoXCIuLi91dGlsc1wiKSxpPWUoXCIuLi9zdHJlYW0vR2VuZXJpY1dvcmtlclwiKSxPPWUoXCIuLi91dGY4XCIpLEI9ZShcIi4uL2NyYzMyXCIpLFI9ZShcIi4uL3NpZ25hdHVyZVwiKTtmdW5jdGlvbiBzKGUsdCxyLG4pe2kuY2FsbCh0aGlzLFwiWmlwRmlsZVdvcmtlclwiKSx0aGlzLmJ5dGVzV3JpdHRlbj0wLHRoaXMuemlwQ29tbWVudD10LHRoaXMuemlwUGxhdGZvcm09cix0aGlzLmVuY29kZUZpbGVOYW1lPW4sdGhpcy5zdHJlYW1GaWxlcz1lLHRoaXMuYWNjdW11bGF0ZT0hMSx0aGlzLmNvbnRlbnRCdWZmZXI9W10sdGhpcy5kaXJSZWNvcmRzPVtdLHRoaXMuY3VycmVudFNvdXJjZU9mZnNldD0wLHRoaXMuZW50cmllc0NvdW50PTAsdGhpcy5jdXJyZW50RmlsZT1udWxsLHRoaXMuX3NvdXJjZXM9W119SS5pbmhlcml0cyhzLGkpLHMucHJvdG90eXBlLnB1c2g9ZnVuY3Rpb24oZSl7dmFyIHQ9ZS5tZXRhLnBlcmNlbnR8fDAscj10aGlzLmVudHJpZXNDb3VudCxuPXRoaXMuX3NvdXJjZXMubGVuZ3RoO3RoaXMuYWNjdW11bGF0ZT90aGlzLmNvbnRlbnRCdWZmZXIucHVzaChlKToodGhpcy5ieXRlc1dyaXR0ZW4rPWUuZGF0YS5sZW5ndGgsaS5wcm90b3R5cGUucHVzaC5jYWxsKHRoaXMse2RhdGE6ZS5kYXRhLG1ldGE6e2N1cnJlbnRGaWxlOnRoaXMuY3VycmVudEZpbGUscGVyY2VudDpyPyh0KzEwMCooci1uLTEpKS9yOjEwMH19KSl9LHMucHJvdG90eXBlLm9wZW5lZFNvdXJjZT1mdW5jdGlvbihlKXt0aGlzLmN1cnJlbnRTb3VyY2VPZmZzZXQ9dGhpcy5ieXRlc1dyaXR0ZW4sdGhpcy5jdXJyZW50RmlsZT1lLmZpbGUubmFtZTt2YXIgdD10aGlzLnN0cmVhbUZpbGVzJiYhZS5maWxlLmRpcjtpZih0KXt2YXIgcj1uKGUsdCwhMSx0aGlzLmN1cnJlbnRTb3VyY2VPZmZzZXQsdGhpcy56aXBQbGF0Zm9ybSx0aGlzLmVuY29kZUZpbGVOYW1lKTt0aGlzLnB1c2goe2RhdGE6ci5maWxlUmVjb3JkLG1ldGE6e3BlcmNlbnQ6MH19KX1lbHNlIHRoaXMuYWNjdW11bGF0ZT0hMH0scy5wcm90b3R5cGUuY2xvc2VkU291cmNlPWZ1bmN0aW9uKGUpe3RoaXMuYWNjdW11bGF0ZT0hMTt2YXIgdD10aGlzLnN0cmVhbUZpbGVzJiYhZS5maWxlLmRpcixyPW4oZSx0LCEwLHRoaXMuY3VycmVudFNvdXJjZU9mZnNldCx0aGlzLnppcFBsYXRmb3JtLHRoaXMuZW5jb2RlRmlsZU5hbWUpO2lmKHRoaXMuZGlyUmVjb3Jkcy5wdXNoKHIuZGlyUmVjb3JkKSx0KXRoaXMucHVzaCh7ZGF0YTpmdW5jdGlvbihlKXtyZXR1cm4gUi5EQVRBX0RFU0NSSVBUT1IrQShlLmNyYzMyLDQpK0EoZS5jb21wcmVzc2VkU2l6ZSw0KStBKGUudW5jb21wcmVzc2VkU2l6ZSw0KX0oZSksbWV0YTp7cGVyY2VudDoxMDB9fSk7ZWxzZSBmb3IodGhpcy5wdXNoKHtkYXRhOnIuZmlsZVJlY29yZCxtZXRhOntwZXJjZW50OjB9fSk7dGhpcy5jb250ZW50QnVmZmVyLmxlbmd0aDspdGhpcy5wdXNoKHRoaXMuY29udGVudEJ1ZmZlci5zaGlmdCgpKTt0aGlzLmN1cnJlbnRGaWxlPW51bGx9LHMucHJvdG90eXBlLmZsdXNoPWZ1bmN0aW9uKCl7Zm9yKHZhciBlPXRoaXMuYnl0ZXNXcml0dGVuLHQ9MDt0PHRoaXMuZGlyUmVjb3Jkcy5sZW5ndGg7dCsrKXRoaXMucHVzaCh7ZGF0YTp0aGlzLmRpclJlY29yZHNbdF0sbWV0YTp7cGVyY2VudDoxMDB9fSk7dmFyIHI9dGhpcy5ieXRlc1dyaXR0ZW4tZSxuPWZ1bmN0aW9uKGUsdCxyLG4saSl7dmFyIHM9SS50cmFuc2Zvcm1UbyhcInN0cmluZ1wiLGkobikpO3JldHVybiBSLkNFTlRSQUxfRElSRUNUT1JZX0VORCtcIlxcMFxcMFxcMFxcMFwiK0EoZSwyKStBKGUsMikrQSh0LDQpK0Eociw0KStBKHMubGVuZ3RoLDIpK3N9KHRoaXMuZGlyUmVjb3Jkcy5sZW5ndGgscixlLHRoaXMuemlwQ29tbWVudCx0aGlzLmVuY29kZUZpbGVOYW1lKTt0aGlzLnB1c2goe2RhdGE6bixtZXRhOntwZXJjZW50OjEwMH19KX0scy5wcm90b3R5cGUucHJlcGFyZU5leHRTb3VyY2U9ZnVuY3Rpb24oKXt0aGlzLnByZXZpb3VzPXRoaXMuX3NvdXJjZXMuc2hpZnQoKSx0aGlzLm9wZW5lZFNvdXJjZSh0aGlzLnByZXZpb3VzLnN0cmVhbUluZm8pLHRoaXMuaXNQYXVzZWQ/dGhpcy5wcmV2aW91cy5wYXVzZSgpOnRoaXMucHJldmlvdXMucmVzdW1lKCl9LHMucHJvdG90eXBlLnJlZ2lzdGVyUHJldmlvdXM9ZnVuY3Rpb24oZSl7dGhpcy5fc291cmNlcy5wdXNoKGUpO3ZhciB0PXRoaXM7cmV0dXJuIGUub24oXCJkYXRhXCIsZnVuY3Rpb24oZSl7dC5wcm9jZXNzQ2h1bmsoZSl9KSxlLm9uKFwiZW5kXCIsZnVuY3Rpb24oKXt0LmNsb3NlZFNvdXJjZSh0LnByZXZpb3VzLnN0cmVhbUluZm8pLHQuX3NvdXJjZXMubGVuZ3RoP3QucHJlcGFyZU5leHRTb3VyY2UoKTp0LmVuZCgpfSksZS5vbihcImVycm9yXCIsZnVuY3Rpb24oZSl7dC5lcnJvcihlKX0pLHRoaXN9LHMucHJvdG90eXBlLnJlc3VtZT1mdW5jdGlvbigpe3JldHVybiEhaS5wcm90b3R5cGUucmVzdW1lLmNhbGwodGhpcykmJighdGhpcy5wcmV2aW91cyYmdGhpcy5fc291cmNlcy5sZW5ndGg/KHRoaXMucHJlcGFyZU5leHRTb3VyY2UoKSwhMCk6dGhpcy5wcmV2aW91c3x8dGhpcy5fc291cmNlcy5sZW5ndGh8fHRoaXMuZ2VuZXJhdGVkRXJyb3I/dm9pZCAwOih0aGlzLmVuZCgpLCEwKSl9LHMucHJvdG90eXBlLmVycm9yPWZ1bmN0aW9uKGUpe3ZhciB0PXRoaXMuX3NvdXJjZXM7aWYoIWkucHJvdG90eXBlLmVycm9yLmNhbGwodGhpcyxlKSlyZXR1cm4hMTtmb3IodmFyIHI9MDtyPHQubGVuZ3RoO3IrKyl0cnl7dFtyXS5lcnJvcihlKX1jYXRjaChlKXt9cmV0dXJuITB9LHMucHJvdG90eXBlLmxvY2s9ZnVuY3Rpb24oKXtpLnByb3RvdHlwZS5sb2NrLmNhbGwodGhpcyk7Zm9yKHZhciBlPXRoaXMuX3NvdXJjZXMsdD0wO3Q8ZS5sZW5ndGg7dCsrKWVbdF0ubG9jaygpfSx0LmV4cG9ydHM9c30se1wiLi4vY3JjMzJcIjo0LFwiLi4vc2lnbmF0dXJlXCI6MjMsXCIuLi9zdHJlYW0vR2VuZXJpY1dvcmtlclwiOjI4LFwiLi4vdXRmOFwiOjMxLFwiLi4vdXRpbHNcIjozMn1dLDk6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt2YXIgdT1lKFwiLi4vY29tcHJlc3Npb25zXCIpLG49ZShcIi4vWmlwRmlsZVdvcmtlclwiKTtyLmdlbmVyYXRlV29ya2VyPWZ1bmN0aW9uKGUsYSx0KXt2YXIgbz1uZXcgbihhLnN0cmVhbUZpbGVzLHQsYS5wbGF0Zm9ybSxhLmVuY29kZUZpbGVOYW1lKSxoPTA7dHJ5e2UuZm9yRWFjaChmdW5jdGlvbihlLHQpe2grKzt2YXIgcj1mdW5jdGlvbihlLHQpe3ZhciByPWV8fHQsbj11W3JdO2lmKCFuKXRocm93IG5ldyBFcnJvcihyK1wiIGlzIG5vdCBhIHZhbGlkIGNvbXByZXNzaW9uIG1ldGhvZCAhXCIpO3JldHVybiBufSh0Lm9wdGlvbnMuY29tcHJlc3Npb24sYS5jb21wcmVzc2lvbiksbj10Lm9wdGlvbnMuY29tcHJlc3Npb25PcHRpb25zfHxhLmNvbXByZXNzaW9uT3B0aW9uc3x8e30saT10LmRpcixzPXQuZGF0ZTt0Ll9jb21wcmVzc1dvcmtlcihyLG4pLndpdGhTdHJlYW1JbmZvKFwiZmlsZVwiLHtuYW1lOmUsZGlyOmksZGF0ZTpzLGNvbW1lbnQ6dC5jb21tZW50fHxcIlwiLHVuaXhQZXJtaXNzaW9uczp0LnVuaXhQZXJtaXNzaW9ucyxkb3NQZXJtaXNzaW9uczp0LmRvc1Blcm1pc3Npb25zfSkucGlwZShvKX0pLG8uZW50cmllc0NvdW50PWh9Y2F0Y2goZSl7by5lcnJvcihlKX1yZXR1cm4gb319LHtcIi4uL2NvbXByZXNzaW9uc1wiOjMsXCIuL1ppcEZpbGVXb3JrZXJcIjo4fV0sMTA6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBuKCl7aWYoISh0aGlzIGluc3RhbmNlb2YgbikpcmV0dXJuIG5ldyBuO2lmKGFyZ3VtZW50cy5sZW5ndGgpdGhyb3cgbmV3IEVycm9yKFwiVGhlIGNvbnN0cnVjdG9yIHdpdGggcGFyYW1ldGVycyBoYXMgYmVlbiByZW1vdmVkIGluIEpTWmlwIDMuMCwgcGxlYXNlIGNoZWNrIHRoZSB1cGdyYWRlIGd1aWRlLlwiKTt0aGlzLmZpbGVzPU9iamVjdC5jcmVhdGUobnVsbCksdGhpcy5jb21tZW50PW51bGwsdGhpcy5yb290PVwiXCIsdGhpcy5jbG9uZT1mdW5jdGlvbigpe3ZhciBlPW5ldyBuO2Zvcih2YXIgdCBpbiB0aGlzKVwiZnVuY3Rpb25cIiE9dHlwZW9mIHRoaXNbdF0mJihlW3RdPXRoaXNbdF0pO3JldHVybiBlfX0obi5wcm90b3R5cGU9ZShcIi4vb2JqZWN0XCIpKS5sb2FkQXN5bmM9ZShcIi4vbG9hZFwiKSxuLnN1cHBvcnQ9ZShcIi4vc3VwcG9ydFwiKSxuLmRlZmF1bHRzPWUoXCIuL2RlZmF1bHRzXCIpLG4udmVyc2lvbj1cIjMuMTAuMlwiLG4ubG9hZEFzeW5jPWZ1bmN0aW9uKGUsdCl7cmV0dXJuKG5ldyBuKS5sb2FkQXN5bmMoZSx0KX0sbi5leHRlcm5hbD1lKFwiLi9leHRlcm5hbFwiKSx0LmV4cG9ydHM9bn0se1wiLi9kZWZhdWx0c1wiOjUsXCIuL2V4dGVybmFsXCI6NixcIi4vbG9hZFwiOjExLFwiLi9vYmplY3RcIjoxNSxcIi4vc3VwcG9ydFwiOjMwfV0sMTE6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt2YXIgdT1lKFwiLi91dGlsc1wiKSxpPWUoXCIuL2V4dGVybmFsXCIpLG49ZShcIi4vdXRmOFwiKSxzPWUoXCIuL3ppcEVudHJpZXNcIiksYT1lKFwiLi9zdHJlYW0vQ3JjMzJQcm9iZVwiKSxsPWUoXCIuL25vZGVqc1V0aWxzXCIpO2Z1bmN0aW9uIGYobil7cmV0dXJuIG5ldyBpLlByb21pc2UoZnVuY3Rpb24oZSx0KXt2YXIgcj1uLmRlY29tcHJlc3NlZC5nZXRDb250ZW50V29ya2VyKCkucGlwZShuZXcgYSk7ci5vbihcImVycm9yXCIsZnVuY3Rpb24oZSl7dChlKX0pLm9uKFwiZW5kXCIsZnVuY3Rpb24oKXtyLnN0cmVhbUluZm8uY3JjMzIhPT1uLmRlY29tcHJlc3NlZC5jcmMzMj90KG5ldyBFcnJvcihcIkNvcnJ1cHRlZCB6aXAgOiBDUkMzMiBtaXNtYXRjaFwiKSk6ZSgpfSkucmVzdW1lKCl9KX10LmV4cG9ydHM9ZnVuY3Rpb24oZSxvKXt2YXIgaD10aGlzO3JldHVybiBvPXUuZXh0ZW5kKG98fHt9LHtiYXNlNjQ6ITEsY2hlY2tDUkMzMjohMSxvcHRpbWl6ZWRCaW5hcnlTdHJpbmc6ITEsY3JlYXRlRm9sZGVyczohMSxkZWNvZGVGaWxlTmFtZTpuLnV0ZjhkZWNvZGV9KSxsLmlzTm9kZSYmbC5pc1N0cmVhbShlKT9pLlByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIkpTWmlwIGNhbid0IGFjY2VwdCBhIHN0cmVhbSB3aGVuIGxvYWRpbmcgYSB6aXAgZmlsZS5cIikpOnUucHJlcGFyZUNvbnRlbnQoXCJ0aGUgbG9hZGVkIHppcCBmaWxlXCIsZSwhMCxvLm9wdGltaXplZEJpbmFyeVN0cmluZyxvLmJhc2U2NCkudGhlbihmdW5jdGlvbihlKXt2YXIgdD1uZXcgcyhvKTtyZXR1cm4gdC5sb2FkKGUpLHR9KS50aGVuKGZ1bmN0aW9uKGUpe3ZhciB0PVtpLlByb21pc2UucmVzb2x2ZShlKV0scj1lLmZpbGVzO2lmKG8uY2hlY2tDUkMzMilmb3IodmFyIG49MDtuPHIubGVuZ3RoO24rKyl0LnB1c2goZihyW25dKSk7cmV0dXJuIGkuUHJvbWlzZS5hbGwodCl9KS50aGVuKGZ1bmN0aW9uKGUpe2Zvcih2YXIgdD1lLnNoaWZ0KCkscj10LmZpbGVzLG49MDtuPHIubGVuZ3RoO24rKyl7dmFyIGk9cltuXSxzPWkuZmlsZU5hbWVTdHIsYT11LnJlc29sdmUoaS5maWxlTmFtZVN0cik7aC5maWxlKGEsaS5kZWNvbXByZXNzZWQse2JpbmFyeTohMCxvcHRpbWl6ZWRCaW5hcnlTdHJpbmc6ITAsZGF0ZTppLmRhdGUsZGlyOmkuZGlyLGNvbW1lbnQ6aS5maWxlQ29tbWVudFN0ci5sZW5ndGg/aS5maWxlQ29tbWVudFN0cjpudWxsLHVuaXhQZXJtaXNzaW9uczppLnVuaXhQZXJtaXNzaW9ucyxkb3NQZXJtaXNzaW9uczppLmRvc1Blcm1pc3Npb25zLGNyZWF0ZUZvbGRlcnM6by5jcmVhdGVGb2xkZXJzfSksaS5kaXJ8fChoLmZpbGUoYSkudW5zYWZlT3JpZ2luYWxOYW1lPXMpfXJldHVybiB0LnppcENvbW1lbnQubGVuZ3RoJiYoaC5jb21tZW50PXQuemlwQ29tbWVudCksaH0pfX0se1wiLi9leHRlcm5hbFwiOjYsXCIuL25vZGVqc1V0aWxzXCI6MTQsXCIuL3N0cmVhbS9DcmMzMlByb2JlXCI6MjUsXCIuL3V0ZjhcIjozMSxcIi4vdXRpbHNcIjozMixcIi4vemlwRW50cmllc1wiOjMzfV0sMTI6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt2YXIgbj1lKFwiLi4vdXRpbHNcIiksaT1lKFwiLi4vc3RyZWFtL0dlbmVyaWNXb3JrZXJcIik7ZnVuY3Rpb24gcyhlLHQpe2kuY2FsbCh0aGlzLFwiTm9kZWpzIHN0cmVhbSBpbnB1dCBhZGFwdGVyIGZvciBcIitlKSx0aGlzLl91cHN0cmVhbUVuZGVkPSExLHRoaXMuX2JpbmRTdHJlYW0odCl9bi5pbmhlcml0cyhzLGkpLHMucHJvdG90eXBlLl9iaW5kU3RyZWFtPWZ1bmN0aW9uKGUpe3ZhciB0PXRoaXM7KHRoaXMuX3N0cmVhbT1lKS5wYXVzZSgpLGUub24oXCJkYXRhXCIsZnVuY3Rpb24oZSl7dC5wdXNoKHtkYXRhOmUsbWV0YTp7cGVyY2VudDowfX0pfSkub24oXCJlcnJvclwiLGZ1bmN0aW9uKGUpe3QuaXNQYXVzZWQ/dGhpcy5nZW5lcmF0ZWRFcnJvcj1lOnQuZXJyb3IoZSl9KS5vbihcImVuZFwiLGZ1bmN0aW9uKCl7dC5pc1BhdXNlZD90Ll91cHN0cmVhbUVuZGVkPSEwOnQuZW5kKCl9KX0scy5wcm90b3R5cGUucGF1c2U9ZnVuY3Rpb24oKXtyZXR1cm4hIWkucHJvdG90eXBlLnBhdXNlLmNhbGwodGhpcykmJih0aGlzLl9zdHJlYW0ucGF1c2UoKSwhMCl9LHMucHJvdG90eXBlLnJlc3VtZT1mdW5jdGlvbigpe3JldHVybiEhaS5wcm90b3R5cGUucmVzdW1lLmNhbGwodGhpcykmJih0aGlzLl91cHN0cmVhbUVuZGVkP3RoaXMuZW5kKCk6dGhpcy5fc3RyZWFtLnJlc3VtZSgpLCEwKX0sdC5leHBvcnRzPXN9LHtcIi4uL3N0cmVhbS9HZW5lcmljV29ya2VyXCI6MjgsXCIuLi91dGlsc1wiOjMyfV0sMTM6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt2YXIgaT1lKFwicmVhZGFibGUtc3RyZWFtXCIpLlJlYWRhYmxlO2Z1bmN0aW9uIG4oZSx0LHIpe2kuY2FsbCh0aGlzLHQpLHRoaXMuX2hlbHBlcj1lO3ZhciBuPXRoaXM7ZS5vbihcImRhdGFcIixmdW5jdGlvbihlLHQpe24ucHVzaChlKXx8bi5faGVscGVyLnBhdXNlKCksciYmcih0KX0pLm9uKFwiZXJyb3JcIixmdW5jdGlvbihlKXtuLmVtaXQoXCJlcnJvclwiLGUpfSkub24oXCJlbmRcIixmdW5jdGlvbigpe24ucHVzaChudWxsKX0pfWUoXCIuLi91dGlsc1wiKS5pbmhlcml0cyhuLGkpLG4ucHJvdG90eXBlLl9yZWFkPWZ1bmN0aW9uKCl7dGhpcy5faGVscGVyLnJlc3VtZSgpfSx0LmV4cG9ydHM9bn0se1wiLi4vdXRpbHNcIjozMixcInJlYWRhYmxlLXN0cmVhbVwiOjE2fV0sMTQ6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt0LmV4cG9ydHM9e2lzTm9kZTpcInVuZGVmaW5lZFwiIT10eXBlb2YgQnVmZmVyLG5ld0J1ZmZlckZyb206ZnVuY3Rpb24oZSx0KXtpZihCdWZmZXIuZnJvbSYmQnVmZmVyLmZyb20hPT1VaW50OEFycmF5LmZyb20pcmV0dXJuIEJ1ZmZlci5mcm9tKGUsdCk7aWYoXCJudW1iZXJcIj09dHlwZW9mIGUpdGhyb3cgbmV3IEVycm9yKCdUaGUgXCJkYXRhXCIgYXJndW1lbnQgbXVzdCBub3QgYmUgYSBudW1iZXInKTtyZXR1cm4gbmV3IEJ1ZmZlcihlLHQpfSxhbGxvY0J1ZmZlcjpmdW5jdGlvbihlKXtpZihCdWZmZXIuYWxsb2MpcmV0dXJuIEJ1ZmZlci5hbGxvYyhlKTt2YXIgdD1uZXcgQnVmZmVyKGUpO3JldHVybiB0LmZpbGwoMCksdH0saXNCdWZmZXI6ZnVuY3Rpb24oZSl7cmV0dXJuIEJ1ZmZlci5pc0J1ZmZlcihlKX0saXNTdHJlYW06ZnVuY3Rpb24oZSl7cmV0dXJuIGUmJlwiZnVuY3Rpb25cIj09dHlwZW9mIGUub24mJlwiZnVuY3Rpb25cIj09dHlwZW9mIGUucGF1c2UmJlwiZnVuY3Rpb25cIj09dHlwZW9mIGUucmVzdW1lfX19LHt9XSwxNTpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHMoZSx0LHIpe3ZhciBuLGk9dS5nZXRUeXBlT2YodCkscz11LmV4dGVuZChyfHx7fSxmKTtzLmRhdGU9cy5kYXRlfHxuZXcgRGF0ZSxudWxsIT09cy5jb21wcmVzc2lvbiYmKHMuY29tcHJlc3Npb249cy5jb21wcmVzc2lvbi50b1VwcGVyQ2FzZSgpKSxcInN0cmluZ1wiPT10eXBlb2Ygcy51bml4UGVybWlzc2lvbnMmJihzLnVuaXhQZXJtaXNzaW9ucz1wYXJzZUludChzLnVuaXhQZXJtaXNzaW9ucyw4KSkscy51bml4UGVybWlzc2lvbnMmJjE2Mzg0JnMudW5peFBlcm1pc3Npb25zJiYocy5kaXI9ITApLHMuZG9zUGVybWlzc2lvbnMmJjE2JnMuZG9zUGVybWlzc2lvbnMmJihzLmRpcj0hMCkscy5kaXImJihlPWcoZSkpLHMuY3JlYXRlRm9sZGVycyYmKG49XyhlKSkmJmIuY2FsbCh0aGlzLG4sITApO3ZhciBhPVwic3RyaW5nXCI9PT1pJiYhMT09PXMuYmluYXJ5JiYhMT09PXMuYmFzZTY0O3ImJnZvaWQgMCE9PXIuYmluYXJ5fHwocy5iaW5hcnk9IWEpLCh0IGluc3RhbmNlb2YgYyYmMD09PXQudW5jb21wcmVzc2VkU2l6ZXx8cy5kaXJ8fCF0fHwwPT09dC5sZW5ndGgpJiYocy5iYXNlNjQ9ITEscy5iaW5hcnk9ITAsdD1cIlwiLHMuY29tcHJlc3Npb249XCJTVE9SRVwiLGk9XCJzdHJpbmdcIik7dmFyIG89bnVsbDtvPXQgaW5zdGFuY2VvZiBjfHx0IGluc3RhbmNlb2YgbD90OnAuaXNOb2RlJiZwLmlzU3RyZWFtKHQpP25ldyBtKGUsdCk6dS5wcmVwYXJlQ29udGVudChlLHQscy5iaW5hcnkscy5vcHRpbWl6ZWRCaW5hcnlTdHJpbmcscy5iYXNlNjQpO3ZhciBoPW5ldyBkKGUsbyxzKTt0aGlzLmZpbGVzW2VdPWh9dmFyIGk9ZShcIi4vdXRmOFwiKSx1PWUoXCIuL3V0aWxzXCIpLGw9ZShcIi4vc3RyZWFtL0dlbmVyaWNXb3JrZXJcIiksYT1lKFwiLi9zdHJlYW0vU3RyZWFtSGVscGVyXCIpLGY9ZShcIi4vZGVmYXVsdHNcIiksYz1lKFwiLi9jb21wcmVzc2VkT2JqZWN0XCIpLGQ9ZShcIi4vemlwT2JqZWN0XCIpLG89ZShcIi4vZ2VuZXJhdGVcIikscD1lKFwiLi9ub2RlanNVdGlsc1wiKSxtPWUoXCIuL25vZGVqcy9Ob2RlanNTdHJlYW1JbnB1dEFkYXB0ZXJcIiksXz1mdW5jdGlvbihlKXtcIi9cIj09PWUuc2xpY2UoLTEpJiYoZT1lLnN1YnN0cmluZygwLGUubGVuZ3RoLTEpKTt2YXIgdD1lLmxhc3RJbmRleE9mKFwiL1wiKTtyZXR1cm4gMDx0P2Uuc3Vic3RyaW5nKDAsdCk6XCJcIn0sZz1mdW5jdGlvbihlKXtyZXR1cm5cIi9cIiE9PWUuc2xpY2UoLTEpJiYoZSs9XCIvXCIpLGV9LGI9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gdD12b2lkIDAhPT10P3Q6Zi5jcmVhdGVGb2xkZXJzLGU9ZyhlKSx0aGlzLmZpbGVzW2VdfHxzLmNhbGwodGhpcyxlLG51bGwse2RpcjohMCxjcmVhdGVGb2xkZXJzOnR9KSx0aGlzLmZpbGVzW2VdfTtmdW5jdGlvbiBoKGUpe3JldHVyblwiW29iamVjdCBSZWdFeHBdXCI9PT1PYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZSl9dmFyIG49e2xvYWQ6ZnVuY3Rpb24oKXt0aHJvdyBuZXcgRXJyb3IoXCJUaGlzIG1ldGhvZCBoYXMgYmVlbiByZW1vdmVkIGluIEpTWmlwIDMuMCwgcGxlYXNlIGNoZWNrIHRoZSB1cGdyYWRlIGd1aWRlLlwiKX0sZm9yRWFjaDpmdW5jdGlvbihlKXt2YXIgdCxyLG47Zm9yKHQgaW4gdGhpcy5maWxlcyluPXRoaXMuZmlsZXNbdF0sKHI9dC5zbGljZSh0aGlzLnJvb3QubGVuZ3RoLHQubGVuZ3RoKSkmJnQuc2xpY2UoMCx0aGlzLnJvb3QubGVuZ3RoKT09PXRoaXMucm9vdCYmZShyLG4pfSxmaWx0ZXI6ZnVuY3Rpb24ocil7dmFyIG49W107cmV0dXJuIHRoaXMuZm9yRWFjaChmdW5jdGlvbihlLHQpe3IoZSx0KSYmbi5wdXNoKHQpfSksbn0sZmlsZTpmdW5jdGlvbihlLHQscil7aWYoMSE9PWFyZ3VtZW50cy5sZW5ndGgpcmV0dXJuIGU9dGhpcy5yb290K2Uscy5jYWxsKHRoaXMsZSx0LHIpLHRoaXM7aWYoaChlKSl7dmFyIG49ZTtyZXR1cm4gdGhpcy5maWx0ZXIoZnVuY3Rpb24oZSx0KXtyZXR1cm4hdC5kaXImJm4udGVzdChlKX0pfXZhciBpPXRoaXMuZmlsZXNbdGhpcy5yb290K2VdO3JldHVybiBpJiYhaS5kaXI/aTpudWxsfSxmb2xkZXI6ZnVuY3Rpb24ocil7aWYoIXIpcmV0dXJuIHRoaXM7aWYoaChyKSlyZXR1cm4gdGhpcy5maWx0ZXIoZnVuY3Rpb24oZSx0KXtyZXR1cm4gdC5kaXImJnIudGVzdChlKX0pO3ZhciBlPXRoaXMucm9vdCtyLHQ9Yi5jYWxsKHRoaXMsZSksbj10aGlzLmNsb25lKCk7cmV0dXJuIG4ucm9vdD10Lm5hbWUsbn0scmVtb3ZlOmZ1bmN0aW9uKHIpe3I9dGhpcy5yb290K3I7dmFyIGU9dGhpcy5maWxlc1tyXTtpZihlfHwoXCIvXCIhPT1yLnNsaWNlKC0xKSYmKHIrPVwiL1wiKSxlPXRoaXMuZmlsZXNbcl0pLGUmJiFlLmRpcilkZWxldGUgdGhpcy5maWxlc1tyXTtlbHNlIGZvcih2YXIgdD10aGlzLmZpbHRlcihmdW5jdGlvbihlLHQpe3JldHVybiB0Lm5hbWUuc2xpY2UoMCxyLmxlbmd0aCk9PT1yfSksbj0wO248dC5sZW5ndGg7bisrKWRlbGV0ZSB0aGlzLmZpbGVzW3Rbbl0ubmFtZV07cmV0dXJuIHRoaXN9LGdlbmVyYXRlOmZ1bmN0aW9uKCl7dGhyb3cgbmV3IEVycm9yKFwiVGhpcyBtZXRob2QgaGFzIGJlZW4gcmVtb3ZlZCBpbiBKU1ppcCAzLjAsIHBsZWFzZSBjaGVjayB0aGUgdXBncmFkZSBndWlkZS5cIil9LGdlbmVyYXRlSW50ZXJuYWxTdHJlYW06ZnVuY3Rpb24oZSl7dmFyIHQscj17fTt0cnl7aWYoKHI9dS5leHRlbmQoZXx8e30se3N0cmVhbUZpbGVzOiExLGNvbXByZXNzaW9uOlwiU1RPUkVcIixjb21wcmVzc2lvbk9wdGlvbnM6bnVsbCx0eXBlOlwiXCIscGxhdGZvcm06XCJET1NcIixjb21tZW50Om51bGwsbWltZVR5cGU6XCJhcHBsaWNhdGlvbi96aXBcIixlbmNvZGVGaWxlTmFtZTppLnV0ZjhlbmNvZGV9KSkudHlwZT1yLnR5cGUudG9Mb3dlckNhc2UoKSxyLmNvbXByZXNzaW9uPXIuY29tcHJlc3Npb24udG9VcHBlckNhc2UoKSxcImJpbmFyeXN0cmluZ1wiPT09ci50eXBlJiYoci50eXBlPVwic3RyaW5nXCIpLCFyLnR5cGUpdGhyb3cgbmV3IEVycm9yKFwiTm8gb3V0cHV0IHR5cGUgc3BlY2lmaWVkLlwiKTt1LmNoZWNrU3VwcG9ydChyLnR5cGUpLFwiZGFyd2luXCIhPT1yLnBsYXRmb3JtJiZcImZyZWVic2RcIiE9PXIucGxhdGZvcm0mJlwibGludXhcIiE9PXIucGxhdGZvcm0mJlwic3Vub3NcIiE9PXIucGxhdGZvcm18fChyLnBsYXRmb3JtPVwiVU5JWFwiKSxcIndpbjMyXCI9PT1yLnBsYXRmb3JtJiYoci5wbGF0Zm9ybT1cIkRPU1wiKTt2YXIgbj1yLmNvbW1lbnR8fHRoaXMuY29tbWVudHx8XCJcIjt0PW8uZ2VuZXJhdGVXb3JrZXIodGhpcyxyLG4pfWNhdGNoKGUpeyh0PW5ldyBsKFwiZXJyb3JcIikpLmVycm9yKGUpfXJldHVybiBuZXcgYSh0LHIudHlwZXx8XCJzdHJpbmdcIixyLm1pbWVUeXBlKX0sZ2VuZXJhdGVBc3luYzpmdW5jdGlvbihlLHQpe3JldHVybiB0aGlzLmdlbmVyYXRlSW50ZXJuYWxTdHJlYW0oZSkuYWNjdW11bGF0ZSh0KX0sZ2VuZXJhdGVOb2RlU3RyZWFtOmZ1bmN0aW9uKGUsdCl7cmV0dXJuKGU9ZXx8e30pLnR5cGV8fChlLnR5cGU9XCJub2RlYnVmZmVyXCIpLHRoaXMuZ2VuZXJhdGVJbnRlcm5hbFN0cmVhbShlKS50b05vZGVqc1N0cmVhbSh0KX19O3QuZXhwb3J0cz1ufSx7XCIuL2NvbXByZXNzZWRPYmplY3RcIjoyLFwiLi9kZWZhdWx0c1wiOjUsXCIuL2dlbmVyYXRlXCI6OSxcIi4vbm9kZWpzL05vZGVqc1N0cmVhbUlucHV0QWRhcHRlclwiOjEyLFwiLi9ub2RlanNVdGlsc1wiOjE0LFwiLi9zdHJlYW0vR2VuZXJpY1dvcmtlclwiOjI4LFwiLi9zdHJlYW0vU3RyZWFtSGVscGVyXCI6MjksXCIuL3V0ZjhcIjozMSxcIi4vdXRpbHNcIjozMixcIi4vemlwT2JqZWN0XCI6MzV9XSwxNjpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3QuZXhwb3J0cz1lKFwic3RyZWFtXCIpfSx7c3RyZWFtOnZvaWQgMH1dLDE3OltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7dmFyIG49ZShcIi4vRGF0YVJlYWRlclwiKTtmdW5jdGlvbiBpKGUpe24uY2FsbCh0aGlzLGUpO2Zvcih2YXIgdD0wO3Q8dGhpcy5kYXRhLmxlbmd0aDt0KyspZVt0XT0yNTUmZVt0XX1lKFwiLi4vdXRpbHNcIikuaW5oZXJpdHMoaSxuKSxpLnByb3RvdHlwZS5ieXRlQXQ9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMuZGF0YVt0aGlzLnplcm8rZV19LGkucHJvdG90eXBlLmxhc3RJbmRleE9mU2lnbmF0dXJlPWZ1bmN0aW9uKGUpe2Zvcih2YXIgdD1lLmNoYXJDb2RlQXQoMCkscj1lLmNoYXJDb2RlQXQoMSksbj1lLmNoYXJDb2RlQXQoMiksaT1lLmNoYXJDb2RlQXQoMykscz10aGlzLmxlbmd0aC00OzA8PXM7LS1zKWlmKHRoaXMuZGF0YVtzXT09PXQmJnRoaXMuZGF0YVtzKzFdPT09ciYmdGhpcy5kYXRhW3MrMl09PT1uJiZ0aGlzLmRhdGFbcyszXT09PWkpcmV0dXJuIHMtdGhpcy56ZXJvO3JldHVybi0xfSxpLnByb3RvdHlwZS5yZWFkQW5kQ2hlY2tTaWduYXR1cmU9ZnVuY3Rpb24oZSl7dmFyIHQ9ZS5jaGFyQ29kZUF0KDApLHI9ZS5jaGFyQ29kZUF0KDEpLG49ZS5jaGFyQ29kZUF0KDIpLGk9ZS5jaGFyQ29kZUF0KDMpLHM9dGhpcy5yZWFkRGF0YSg0KTtyZXR1cm4gdD09PXNbMF0mJnI9PT1zWzFdJiZuPT09c1syXSYmaT09PXNbM119LGkucHJvdG90eXBlLnJlYWREYXRhPWZ1bmN0aW9uKGUpe2lmKHRoaXMuY2hlY2tPZmZzZXQoZSksMD09PWUpcmV0dXJuW107dmFyIHQ9dGhpcy5kYXRhLnNsaWNlKHRoaXMuemVybyt0aGlzLmluZGV4LHRoaXMuemVybyt0aGlzLmluZGV4K2UpO3JldHVybiB0aGlzLmluZGV4Kz1lLHR9LHQuZXhwb3J0cz1pfSx7XCIuLi91dGlsc1wiOjMyLFwiLi9EYXRhUmVhZGVyXCI6MTh9XSwxODpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3ZhciBuPWUoXCIuLi91dGlsc1wiKTtmdW5jdGlvbiBpKGUpe3RoaXMuZGF0YT1lLHRoaXMubGVuZ3RoPWUubGVuZ3RoLHRoaXMuaW5kZXg9MCx0aGlzLnplcm89MH1pLnByb3RvdHlwZT17Y2hlY2tPZmZzZXQ6ZnVuY3Rpb24oZSl7dGhpcy5jaGVja0luZGV4KHRoaXMuaW5kZXgrZSl9LGNoZWNrSW5kZXg6ZnVuY3Rpb24oZSl7aWYodGhpcy5sZW5ndGg8dGhpcy56ZXJvK2V8fGU8MCl0aHJvdyBuZXcgRXJyb3IoXCJFbmQgb2YgZGF0YSByZWFjaGVkIChkYXRhIGxlbmd0aCA9IFwiK3RoaXMubGVuZ3RoK1wiLCBhc2tlZCBpbmRleCA9IFwiK2UrXCIpLiBDb3JydXB0ZWQgemlwID9cIil9LHNldEluZGV4OmZ1bmN0aW9uKGUpe3RoaXMuY2hlY2tJbmRleChlKSx0aGlzLmluZGV4PWV9LHNraXA6ZnVuY3Rpb24oZSl7dGhpcy5zZXRJbmRleCh0aGlzLmluZGV4K2UpfSxieXRlQXQ6ZnVuY3Rpb24oKXt9LHJlYWRJbnQ6ZnVuY3Rpb24oZSl7dmFyIHQscj0wO2Zvcih0aGlzLmNoZWNrT2Zmc2V0KGUpLHQ9dGhpcy5pbmRleCtlLTE7dD49dGhpcy5pbmRleDt0LS0pcj0ocjw8OCkrdGhpcy5ieXRlQXQodCk7cmV0dXJuIHRoaXMuaW5kZXgrPWUscn0scmVhZFN0cmluZzpmdW5jdGlvbihlKXtyZXR1cm4gbi50cmFuc2Zvcm1UbyhcInN0cmluZ1wiLHRoaXMucmVhZERhdGEoZSkpfSxyZWFkRGF0YTpmdW5jdGlvbigpe30sbGFzdEluZGV4T2ZTaWduYXR1cmU6ZnVuY3Rpb24oKXt9LHJlYWRBbmRDaGVja1NpZ25hdHVyZTpmdW5jdGlvbigpe30scmVhZERhdGU6ZnVuY3Rpb24oKXt2YXIgZT10aGlzLnJlYWRJbnQoNCk7cmV0dXJuIG5ldyBEYXRlKERhdGUuVVRDKDE5ODArKGU+PjI1JjEyNyksKGU+PjIxJjE1KS0xLGU+PjE2JjMxLGU+PjExJjMxLGU+PjUmNjMsKDMxJmUpPDwxKSl9fSx0LmV4cG9ydHM9aX0se1wiLi4vdXRpbHNcIjozMn1dLDE5OltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7dmFyIG49ZShcIi4vVWludDhBcnJheVJlYWRlclwiKTtmdW5jdGlvbiBpKGUpe24uY2FsbCh0aGlzLGUpfWUoXCIuLi91dGlsc1wiKS5pbmhlcml0cyhpLG4pLGkucHJvdG90eXBlLnJlYWREYXRhPWZ1bmN0aW9uKGUpe3RoaXMuY2hlY2tPZmZzZXQoZSk7dmFyIHQ9dGhpcy5kYXRhLnNsaWNlKHRoaXMuemVybyt0aGlzLmluZGV4LHRoaXMuemVybyt0aGlzLmluZGV4K2UpO3JldHVybiB0aGlzLmluZGV4Kz1lLHR9LHQuZXhwb3J0cz1pfSx7XCIuLi91dGlsc1wiOjMyLFwiLi9VaW50OEFycmF5UmVhZGVyXCI6MjF9XSwyMDpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3ZhciBuPWUoXCIuL0RhdGFSZWFkZXJcIik7ZnVuY3Rpb24gaShlKXtuLmNhbGwodGhpcyxlKX1lKFwiLi4vdXRpbHNcIikuaW5oZXJpdHMoaSxuKSxpLnByb3RvdHlwZS5ieXRlQXQ9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMuZGF0YS5jaGFyQ29kZUF0KHRoaXMuemVybytlKX0saS5wcm90b3R5cGUubGFzdEluZGV4T2ZTaWduYXR1cmU9ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMuZGF0YS5sYXN0SW5kZXhPZihlKS10aGlzLnplcm99LGkucHJvdG90eXBlLnJlYWRBbmRDaGVja1NpZ25hdHVyZT1mdW5jdGlvbihlKXtyZXR1cm4gZT09PXRoaXMucmVhZERhdGEoNCl9LGkucHJvdG90eXBlLnJlYWREYXRhPWZ1bmN0aW9uKGUpe3RoaXMuY2hlY2tPZmZzZXQoZSk7dmFyIHQ9dGhpcy5kYXRhLnNsaWNlKHRoaXMuemVybyt0aGlzLmluZGV4LHRoaXMuemVybyt0aGlzLmluZGV4K2UpO3JldHVybiB0aGlzLmluZGV4Kz1lLHR9LHQuZXhwb3J0cz1pfSx7XCIuLi91dGlsc1wiOjMyLFwiLi9EYXRhUmVhZGVyXCI6MTh9XSwyMTpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3ZhciBuPWUoXCIuL0FycmF5UmVhZGVyXCIpO2Z1bmN0aW9uIGkoZSl7bi5jYWxsKHRoaXMsZSl9ZShcIi4uL3V0aWxzXCIpLmluaGVyaXRzKGksbiksaS5wcm90b3R5cGUucmVhZERhdGE9ZnVuY3Rpb24oZSl7aWYodGhpcy5jaGVja09mZnNldChlKSwwPT09ZSlyZXR1cm4gbmV3IFVpbnQ4QXJyYXkoMCk7dmFyIHQ9dGhpcy5kYXRhLnN1YmFycmF5KHRoaXMuemVybyt0aGlzLmluZGV4LHRoaXMuemVybyt0aGlzLmluZGV4K2UpO3JldHVybiB0aGlzLmluZGV4Kz1lLHR9LHQuZXhwb3J0cz1pfSx7XCIuLi91dGlsc1wiOjMyLFwiLi9BcnJheVJlYWRlclwiOjE3fV0sMjI6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt2YXIgbj1lKFwiLi4vdXRpbHNcIiksaT1lKFwiLi4vc3VwcG9ydFwiKSxzPWUoXCIuL0FycmF5UmVhZGVyXCIpLGE9ZShcIi4vU3RyaW5nUmVhZGVyXCIpLG89ZShcIi4vTm9kZUJ1ZmZlclJlYWRlclwiKSxoPWUoXCIuL1VpbnQ4QXJyYXlSZWFkZXJcIik7dC5leHBvcnRzPWZ1bmN0aW9uKGUpe3ZhciB0PW4uZ2V0VHlwZU9mKGUpO3JldHVybiBuLmNoZWNrU3VwcG9ydCh0KSxcInN0cmluZ1wiIT09dHx8aS51aW50OGFycmF5P1wibm9kZWJ1ZmZlclwiPT09dD9uZXcgbyhlKTppLnVpbnQ4YXJyYXk/bmV3IGgobi50cmFuc2Zvcm1UbyhcInVpbnQ4YXJyYXlcIixlKSk6bmV3IHMobi50cmFuc2Zvcm1UbyhcImFycmF5XCIsZSkpOm5ldyBhKGUpfX0se1wiLi4vc3VwcG9ydFwiOjMwLFwiLi4vdXRpbHNcIjozMixcIi4vQXJyYXlSZWFkZXJcIjoxNyxcIi4vTm9kZUJ1ZmZlclJlYWRlclwiOjE5LFwiLi9TdHJpbmdSZWFkZXJcIjoyMCxcIi4vVWludDhBcnJheVJlYWRlclwiOjIxfV0sMjM6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjtyLkxPQ0FMX0ZJTEVfSEVBREVSPVwiUEtcdTAwMDNcdTAwMDRcIixyLkNFTlRSQUxfRklMRV9IRUFERVI9XCJQS1x1MDAwMVx1MDAwMlwiLHIuQ0VOVFJBTF9ESVJFQ1RPUllfRU5EPVwiUEtcdTAwMDVcdTAwMDZcIixyLlpJUDY0X0NFTlRSQUxfRElSRUNUT1JZX0xPQ0FUT1I9XCJQS1x1MDAwNlx1MDAwN1wiLHIuWklQNjRfQ0VOVFJBTF9ESVJFQ1RPUllfRU5EPVwiUEtcdTAwMDZcdTAwMDZcIixyLkRBVEFfREVTQ1JJUFRPUj1cIlBLXHUwMDA3XFxiXCJ9LHt9XSwyNDpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3ZhciBuPWUoXCIuL0dlbmVyaWNXb3JrZXJcIiksaT1lKFwiLi4vdXRpbHNcIik7ZnVuY3Rpb24gcyhlKXtuLmNhbGwodGhpcyxcIkNvbnZlcnRXb3JrZXIgdG8gXCIrZSksdGhpcy5kZXN0VHlwZT1lfWkuaW5oZXJpdHMocyxuKSxzLnByb3RvdHlwZS5wcm9jZXNzQ2h1bms9ZnVuY3Rpb24oZSl7dGhpcy5wdXNoKHtkYXRhOmkudHJhbnNmb3JtVG8odGhpcy5kZXN0VHlwZSxlLmRhdGEpLG1ldGE6ZS5tZXRhfSl9LHQuZXhwb3J0cz1zfSx7XCIuLi91dGlsc1wiOjMyLFwiLi9HZW5lcmljV29ya2VyXCI6Mjh9XSwyNTpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3ZhciBuPWUoXCIuL0dlbmVyaWNXb3JrZXJcIiksaT1lKFwiLi4vY3JjMzJcIik7ZnVuY3Rpb24gcygpe24uY2FsbCh0aGlzLFwiQ3JjMzJQcm9iZVwiKSx0aGlzLndpdGhTdHJlYW1JbmZvKFwiY3JjMzJcIiwwKX1lKFwiLi4vdXRpbHNcIikuaW5oZXJpdHMocyxuKSxzLnByb3RvdHlwZS5wcm9jZXNzQ2h1bms9ZnVuY3Rpb24oZSl7dGhpcy5zdHJlYW1JbmZvLmNyYzMyPWkoZS5kYXRhLHRoaXMuc3RyZWFtSW5mby5jcmMzMnx8MCksdGhpcy5wdXNoKGUpfSx0LmV4cG9ydHM9c30se1wiLi4vY3JjMzJcIjo0LFwiLi4vdXRpbHNcIjozMixcIi4vR2VuZXJpY1dvcmtlclwiOjI4fV0sMjY6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt2YXIgbj1lKFwiLi4vdXRpbHNcIiksaT1lKFwiLi9HZW5lcmljV29ya2VyXCIpO2Z1bmN0aW9uIHMoZSl7aS5jYWxsKHRoaXMsXCJEYXRhTGVuZ3RoUHJvYmUgZm9yIFwiK2UpLHRoaXMucHJvcE5hbWU9ZSx0aGlzLndpdGhTdHJlYW1JbmZvKGUsMCl9bi5pbmhlcml0cyhzLGkpLHMucHJvdG90eXBlLnByb2Nlc3NDaHVuaz1mdW5jdGlvbihlKXtpZihlKXt2YXIgdD10aGlzLnN0cmVhbUluZm9bdGhpcy5wcm9wTmFtZV18fDA7dGhpcy5zdHJlYW1JbmZvW3RoaXMucHJvcE5hbWVdPXQrZS5kYXRhLmxlbmd0aH1pLnByb3RvdHlwZS5wcm9jZXNzQ2h1bmsuY2FsbCh0aGlzLGUpfSx0LmV4cG9ydHM9c30se1wiLi4vdXRpbHNcIjozMixcIi4vR2VuZXJpY1dvcmtlclwiOjI4fV0sMjc6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt2YXIgbj1lKFwiLi4vdXRpbHNcIiksaT1lKFwiLi9HZW5lcmljV29ya2VyXCIpO2Z1bmN0aW9uIHMoZSl7aS5jYWxsKHRoaXMsXCJEYXRhV29ya2VyXCIpO3ZhciB0PXRoaXM7dGhpcy5kYXRhSXNSZWFkeT0hMSx0aGlzLmluZGV4PTAsdGhpcy5tYXg9MCx0aGlzLmRhdGE9bnVsbCx0aGlzLnR5cGU9XCJcIix0aGlzLl90aWNrU2NoZWR1bGVkPSExLGUudGhlbihmdW5jdGlvbihlKXt0LmRhdGFJc1JlYWR5PSEwLHQuZGF0YT1lLHQubWF4PWUmJmUubGVuZ3RofHwwLHQudHlwZT1uLmdldFR5cGVPZihlKSx0LmlzUGF1c2VkfHx0Ll90aWNrQW5kUmVwZWF0KCl9LGZ1bmN0aW9uKGUpe3QuZXJyb3IoZSl9KX1uLmluaGVyaXRzKHMsaSkscy5wcm90b3R5cGUuY2xlYW5VcD1mdW5jdGlvbigpe2kucHJvdG90eXBlLmNsZWFuVXAuY2FsbCh0aGlzKSx0aGlzLmRhdGE9bnVsbH0scy5wcm90b3R5cGUucmVzdW1lPWZ1bmN0aW9uKCl7cmV0dXJuISFpLnByb3RvdHlwZS5yZXN1bWUuY2FsbCh0aGlzKSYmKCF0aGlzLl90aWNrU2NoZWR1bGVkJiZ0aGlzLmRhdGFJc1JlYWR5JiYodGhpcy5fdGlja1NjaGVkdWxlZD0hMCxuLmRlbGF5KHRoaXMuX3RpY2tBbmRSZXBlYXQsW10sdGhpcykpLCEwKX0scy5wcm90b3R5cGUuX3RpY2tBbmRSZXBlYXQ9ZnVuY3Rpb24oKXt0aGlzLl90aWNrU2NoZWR1bGVkPSExLHRoaXMuaXNQYXVzZWR8fHRoaXMuaXNGaW5pc2hlZHx8KHRoaXMuX3RpY2soKSx0aGlzLmlzRmluaXNoZWR8fChuLmRlbGF5KHRoaXMuX3RpY2tBbmRSZXBlYXQsW10sdGhpcyksdGhpcy5fdGlja1NjaGVkdWxlZD0hMCkpfSxzLnByb3RvdHlwZS5fdGljaz1mdW5jdGlvbigpe2lmKHRoaXMuaXNQYXVzZWR8fHRoaXMuaXNGaW5pc2hlZClyZXR1cm4hMTt2YXIgZT1udWxsLHQ9TWF0aC5taW4odGhpcy5tYXgsdGhpcy5pbmRleCsxNjM4NCk7aWYodGhpcy5pbmRleD49dGhpcy5tYXgpcmV0dXJuIHRoaXMuZW5kKCk7c3dpdGNoKHRoaXMudHlwZSl7Y2FzZVwic3RyaW5nXCI6ZT10aGlzLmRhdGEuc3Vic3RyaW5nKHRoaXMuaW5kZXgsdCk7YnJlYWs7Y2FzZVwidWludDhhcnJheVwiOmU9dGhpcy5kYXRhLnN1YmFycmF5KHRoaXMuaW5kZXgsdCk7YnJlYWs7Y2FzZVwiYXJyYXlcIjpjYXNlXCJub2RlYnVmZmVyXCI6ZT10aGlzLmRhdGEuc2xpY2UodGhpcy5pbmRleCx0KX1yZXR1cm4gdGhpcy5pbmRleD10LHRoaXMucHVzaCh7ZGF0YTplLG1ldGE6e3BlcmNlbnQ6dGhpcy5tYXg/dGhpcy5pbmRleC90aGlzLm1heCoxMDA6MH19KX0sdC5leHBvcnRzPXN9LHtcIi4uL3V0aWxzXCI6MzIsXCIuL0dlbmVyaWNXb3JrZXJcIjoyOH1dLDI4OltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gbihlKXt0aGlzLm5hbWU9ZXx8XCJkZWZhdWx0XCIsdGhpcy5zdHJlYW1JbmZvPXt9LHRoaXMuZ2VuZXJhdGVkRXJyb3I9bnVsbCx0aGlzLmV4dHJhU3RyZWFtSW5mbz17fSx0aGlzLmlzUGF1c2VkPSEwLHRoaXMuaXNGaW5pc2hlZD0hMSx0aGlzLmlzTG9ja2VkPSExLHRoaXMuX2xpc3RlbmVycz17ZGF0YTpbXSxlbmQ6W10sZXJyb3I6W119LHRoaXMucHJldmlvdXM9bnVsbH1uLnByb3RvdHlwZT17cHVzaDpmdW5jdGlvbihlKXt0aGlzLmVtaXQoXCJkYXRhXCIsZSl9LGVuZDpmdW5jdGlvbigpe2lmKHRoaXMuaXNGaW5pc2hlZClyZXR1cm4hMTt0aGlzLmZsdXNoKCk7dHJ5e3RoaXMuZW1pdChcImVuZFwiKSx0aGlzLmNsZWFuVXAoKSx0aGlzLmlzRmluaXNoZWQ9ITB9Y2F0Y2goZSl7dGhpcy5lbWl0KFwiZXJyb3JcIixlKX1yZXR1cm4hMH0sZXJyb3I6ZnVuY3Rpb24oZSl7cmV0dXJuIXRoaXMuaXNGaW5pc2hlZCYmKHRoaXMuaXNQYXVzZWQ/dGhpcy5nZW5lcmF0ZWRFcnJvcj1lOih0aGlzLmlzRmluaXNoZWQ9ITAsdGhpcy5lbWl0KFwiZXJyb3JcIixlKSx0aGlzLnByZXZpb3VzJiZ0aGlzLnByZXZpb3VzLmVycm9yKGUpLHRoaXMuY2xlYW5VcCgpKSwhMCl9LG9uOmZ1bmN0aW9uKGUsdCl7cmV0dXJuIHRoaXMuX2xpc3RlbmVyc1tlXS5wdXNoKHQpLHRoaXN9LGNsZWFuVXA6ZnVuY3Rpb24oKXt0aGlzLnN0cmVhbUluZm89dGhpcy5nZW5lcmF0ZWRFcnJvcj10aGlzLmV4dHJhU3RyZWFtSW5mbz1udWxsLHRoaXMuX2xpc3RlbmVycz1bXX0sZW1pdDpmdW5jdGlvbihlLHQpe2lmKHRoaXMuX2xpc3RlbmVyc1tlXSlmb3IodmFyIHI9MDtyPHRoaXMuX2xpc3RlbmVyc1tlXS5sZW5ndGg7cisrKXRoaXMuX2xpc3RlbmVyc1tlXVtyXS5jYWxsKHRoaXMsdCl9LHBpcGU6ZnVuY3Rpb24oZSl7cmV0dXJuIGUucmVnaXN0ZXJQcmV2aW91cyh0aGlzKX0scmVnaXN0ZXJQcmV2aW91czpmdW5jdGlvbihlKXtpZih0aGlzLmlzTG9ja2VkKXRocm93IG5ldyBFcnJvcihcIlRoZSBzdHJlYW0gJ1wiK3RoaXMrXCInIGhhcyBhbHJlYWR5IGJlZW4gdXNlZC5cIik7dGhpcy5zdHJlYW1JbmZvPWUuc3RyZWFtSW5mbyx0aGlzLm1lcmdlU3RyZWFtSW5mbygpLHRoaXMucHJldmlvdXM9ZTt2YXIgdD10aGlzO3JldHVybiBlLm9uKFwiZGF0YVwiLGZ1bmN0aW9uKGUpe3QucHJvY2Vzc0NodW5rKGUpfSksZS5vbihcImVuZFwiLGZ1bmN0aW9uKCl7dC5lbmQoKX0pLGUub24oXCJlcnJvclwiLGZ1bmN0aW9uKGUpe3QuZXJyb3IoZSl9KSx0aGlzfSxwYXVzZTpmdW5jdGlvbigpe3JldHVybiF0aGlzLmlzUGF1c2VkJiYhdGhpcy5pc0ZpbmlzaGVkJiYodGhpcy5pc1BhdXNlZD0hMCx0aGlzLnByZXZpb3VzJiZ0aGlzLnByZXZpb3VzLnBhdXNlKCksITApfSxyZXN1bWU6ZnVuY3Rpb24oKXtpZighdGhpcy5pc1BhdXNlZHx8dGhpcy5pc0ZpbmlzaGVkKXJldHVybiExO3ZhciBlPXRoaXMuaXNQYXVzZWQ9ITE7cmV0dXJuIHRoaXMuZ2VuZXJhdGVkRXJyb3ImJih0aGlzLmVycm9yKHRoaXMuZ2VuZXJhdGVkRXJyb3IpLGU9ITApLHRoaXMucHJldmlvdXMmJnRoaXMucHJldmlvdXMucmVzdW1lKCksIWV9LGZsdXNoOmZ1bmN0aW9uKCl7fSxwcm9jZXNzQ2h1bms6ZnVuY3Rpb24oZSl7dGhpcy5wdXNoKGUpfSx3aXRoU3RyZWFtSW5mbzpmdW5jdGlvbihlLHQpe3JldHVybiB0aGlzLmV4dHJhU3RyZWFtSW5mb1tlXT10LHRoaXMubWVyZ2VTdHJlYW1JbmZvKCksdGhpc30sbWVyZ2VTdHJlYW1JbmZvOmZ1bmN0aW9uKCl7Zm9yKHZhciBlIGluIHRoaXMuZXh0cmFTdHJlYW1JbmZvKU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0aGlzLmV4dHJhU3RyZWFtSW5mbyxlKSYmKHRoaXMuc3RyZWFtSW5mb1tlXT10aGlzLmV4dHJhU3RyZWFtSW5mb1tlXSl9LGxvY2s6ZnVuY3Rpb24oKXtpZih0aGlzLmlzTG9ja2VkKXRocm93IG5ldyBFcnJvcihcIlRoZSBzdHJlYW0gJ1wiK3RoaXMrXCInIGhhcyBhbHJlYWR5IGJlZW4gdXNlZC5cIik7dGhpcy5pc0xvY2tlZD0hMCx0aGlzLnByZXZpb3VzJiZ0aGlzLnByZXZpb3VzLmxvY2soKX0sdG9TdHJpbmc6ZnVuY3Rpb24oKXt2YXIgZT1cIldvcmtlciBcIit0aGlzLm5hbWU7cmV0dXJuIHRoaXMucHJldmlvdXM/dGhpcy5wcmV2aW91cytcIiAtPiBcIitlOmV9fSx0LmV4cG9ydHM9bn0se31dLDI5OltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7dmFyIGg9ZShcIi4uL3V0aWxzXCIpLGk9ZShcIi4vQ29udmVydFdvcmtlclwiKSxzPWUoXCIuL0dlbmVyaWNXb3JrZXJcIiksdT1lKFwiLi4vYmFzZTY0XCIpLG49ZShcIi4uL3N1cHBvcnRcIiksYT1lKFwiLi4vZXh0ZXJuYWxcIiksbz1udWxsO2lmKG4ubm9kZXN0cmVhbSl0cnl7bz1lKFwiLi4vbm9kZWpzL05vZGVqc1N0cmVhbU91dHB1dEFkYXB0ZXJcIil9Y2F0Y2goZSl7fWZ1bmN0aW9uIGwoZSxvKXtyZXR1cm4gbmV3IGEuUHJvbWlzZShmdW5jdGlvbih0LHIpe3ZhciBuPVtdLGk9ZS5faW50ZXJuYWxUeXBlLHM9ZS5fb3V0cHV0VHlwZSxhPWUuX21pbWVUeXBlO2Uub24oXCJkYXRhXCIsZnVuY3Rpb24oZSx0KXtuLnB1c2goZSksbyYmbyh0KX0pLm9uKFwiZXJyb3JcIixmdW5jdGlvbihlKXtuPVtdLHIoZSl9KS5vbihcImVuZFwiLGZ1bmN0aW9uKCl7dHJ5e3ZhciBlPWZ1bmN0aW9uKGUsdCxyKXtzd2l0Y2goZSl7Y2FzZVwiYmxvYlwiOnJldHVybiBoLm5ld0Jsb2IoaC50cmFuc2Zvcm1UbyhcImFycmF5YnVmZmVyXCIsdCkscik7Y2FzZVwiYmFzZTY0XCI6cmV0dXJuIHUuZW5jb2RlKHQpO2RlZmF1bHQ6cmV0dXJuIGgudHJhbnNmb3JtVG8oZSx0KX19KHMsZnVuY3Rpb24oZSx0KXt2YXIgcixuPTAsaT1udWxsLHM9MDtmb3Iocj0wO3I8dC5sZW5ndGg7cisrKXMrPXRbcl0ubGVuZ3RoO3N3aXRjaChlKXtjYXNlXCJzdHJpbmdcIjpyZXR1cm4gdC5qb2luKFwiXCIpO2Nhc2VcImFycmF5XCI6cmV0dXJuIEFycmF5LnByb3RvdHlwZS5jb25jYXQuYXBwbHkoW10sdCk7Y2FzZVwidWludDhhcnJheVwiOmZvcihpPW5ldyBVaW50OEFycmF5KHMpLHI9MDtyPHQubGVuZ3RoO3IrKylpLnNldCh0W3JdLG4pLG4rPXRbcl0ubGVuZ3RoO3JldHVybiBpO2Nhc2VcIm5vZGVidWZmZXJcIjpyZXR1cm4gQnVmZmVyLmNvbmNhdCh0KTtkZWZhdWx0OnRocm93IG5ldyBFcnJvcihcImNvbmNhdCA6IHVuc3VwcG9ydGVkIHR5cGUgJ1wiK2UrXCInXCIpfX0oaSxuKSxhKTt0KGUpfWNhdGNoKGUpe3IoZSl9bj1bXX0pLnJlc3VtZSgpfSl9ZnVuY3Rpb24gZihlLHQscil7dmFyIG49dDtzd2l0Y2godCl7Y2FzZVwiYmxvYlwiOmNhc2VcImFycmF5YnVmZmVyXCI6bj1cInVpbnQ4YXJyYXlcIjticmVhaztjYXNlXCJiYXNlNjRcIjpuPVwic3RyaW5nXCJ9dHJ5e3RoaXMuX2ludGVybmFsVHlwZT1uLHRoaXMuX291dHB1dFR5cGU9dCx0aGlzLl9taW1lVHlwZT1yLGguY2hlY2tTdXBwb3J0KG4pLHRoaXMuX3dvcmtlcj1lLnBpcGUobmV3IGkobikpLGUubG9jaygpfWNhdGNoKGUpe3RoaXMuX3dvcmtlcj1uZXcgcyhcImVycm9yXCIpLHRoaXMuX3dvcmtlci5lcnJvcihlKX19Zi5wcm90b3R5cGU9e2FjY3VtdWxhdGU6ZnVuY3Rpb24oZSl7cmV0dXJuIGwodGhpcyxlKX0sb246ZnVuY3Rpb24oZSx0KXt2YXIgcj10aGlzO3JldHVyblwiZGF0YVwiPT09ZT90aGlzLl93b3JrZXIub24oZSxmdW5jdGlvbihlKXt0LmNhbGwocixlLmRhdGEsZS5tZXRhKX0pOnRoaXMuX3dvcmtlci5vbihlLGZ1bmN0aW9uKCl7aC5kZWxheSh0LGFyZ3VtZW50cyxyKX0pLHRoaXN9LHJlc3VtZTpmdW5jdGlvbigpe3JldHVybiBoLmRlbGF5KHRoaXMuX3dvcmtlci5yZXN1bWUsW10sdGhpcy5fd29ya2VyKSx0aGlzfSxwYXVzZTpmdW5jdGlvbigpe3JldHVybiB0aGlzLl93b3JrZXIucGF1c2UoKSx0aGlzfSx0b05vZGVqc1N0cmVhbTpmdW5jdGlvbihlKXtpZihoLmNoZWNrU3VwcG9ydChcIm5vZGVzdHJlYW1cIiksXCJub2RlYnVmZmVyXCIhPT10aGlzLl9vdXRwdXRUeXBlKXRocm93IG5ldyBFcnJvcih0aGlzLl9vdXRwdXRUeXBlK1wiIGlzIG5vdCBzdXBwb3J0ZWQgYnkgdGhpcyBtZXRob2RcIik7cmV0dXJuIG5ldyBvKHRoaXMse29iamVjdE1vZGU6XCJub2RlYnVmZmVyXCIhPT10aGlzLl9vdXRwdXRUeXBlfSxlKX19LHQuZXhwb3J0cz1mfSx7XCIuLi9iYXNlNjRcIjoxLFwiLi4vZXh0ZXJuYWxcIjo2LFwiLi4vbm9kZWpzL05vZGVqc1N0cmVhbU91dHB1dEFkYXB0ZXJcIjoxMyxcIi4uL3N1cHBvcnRcIjozMCxcIi4uL3V0aWxzXCI6MzIsXCIuL0NvbnZlcnRXb3JrZXJcIjoyNCxcIi4vR2VuZXJpY1dvcmtlclwiOjI4fV0sMzA6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjtpZihyLmJhc2U2ND0hMCxyLmFycmF5PSEwLHIuc3RyaW5nPSEwLHIuYXJyYXlidWZmZXI9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIEFycmF5QnVmZmVyJiZcInVuZGVmaW5lZFwiIT10eXBlb2YgVWludDhBcnJheSxyLm5vZGVidWZmZXI9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIEJ1ZmZlcixyLnVpbnQ4YXJyYXk9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIFVpbnQ4QXJyYXksXCJ1bmRlZmluZWRcIj09dHlwZW9mIEFycmF5QnVmZmVyKXIuYmxvYj0hMTtlbHNle3ZhciBuPW5ldyBBcnJheUJ1ZmZlcigwKTt0cnl7ci5ibG9iPTA9PT1uZXcgQmxvYihbbl0se3R5cGU6XCJhcHBsaWNhdGlvbi96aXBcIn0pLnNpemV9Y2F0Y2goZSl7dHJ5e3ZhciBpPW5ldyhzZWxmLkJsb2JCdWlsZGVyfHxzZWxmLldlYktpdEJsb2JCdWlsZGVyfHxzZWxmLk1vekJsb2JCdWlsZGVyfHxzZWxmLk1TQmxvYkJ1aWxkZXIpO2kuYXBwZW5kKG4pLHIuYmxvYj0wPT09aS5nZXRCbG9iKFwiYXBwbGljYXRpb24vemlwXCIpLnNpemV9Y2F0Y2goZSl7ci5ibG9iPSExfX19dHJ5e3Iubm9kZXN0cmVhbT0hIWUoXCJyZWFkYWJsZS1zdHJlYW1cIikuUmVhZGFibGV9Y2F0Y2goZSl7ci5ub2Rlc3RyZWFtPSExfX0se1wicmVhZGFibGUtc3RyZWFtXCI6MTZ9XSwzMTpbZnVuY3Rpb24oZSx0LHMpe1widXNlIHN0cmljdFwiO2Zvcih2YXIgbz1lKFwiLi91dGlsc1wiKSxoPWUoXCIuL3N1cHBvcnRcIikscj1lKFwiLi9ub2RlanNVdGlsc1wiKSxuPWUoXCIuL3N0cmVhbS9HZW5lcmljV29ya2VyXCIpLHU9bmV3IEFycmF5KDI1NiksaT0wO2k8MjU2O2krKyl1W2ldPTI1Mjw9aT82OjI0ODw9aT81OjI0MDw9aT80OjIyNDw9aT8zOjE5Mjw9aT8yOjE7dVsyNTRdPXVbMjU0XT0xO2Z1bmN0aW9uIGEoKXtuLmNhbGwodGhpcyxcInV0Zi04IGRlY29kZVwiKSx0aGlzLmxlZnRPdmVyPW51bGx9ZnVuY3Rpb24gbCgpe24uY2FsbCh0aGlzLFwidXRmLTggZW5jb2RlXCIpfXMudXRmOGVuY29kZT1mdW5jdGlvbihlKXtyZXR1cm4gaC5ub2RlYnVmZmVyP3IubmV3QnVmZmVyRnJvbShlLFwidXRmLThcIik6ZnVuY3Rpb24oZSl7dmFyIHQscixuLGkscyxhPWUubGVuZ3RoLG89MDtmb3IoaT0wO2k8YTtpKyspNTUyOTY9PSg2NDUxMiYocj1lLmNoYXJDb2RlQXQoaSkpKSYmaSsxPGEmJjU2MzIwPT0oNjQ1MTImKG49ZS5jaGFyQ29kZUF0KGkrMSkpKSYmKHI9NjU1MzYrKHItNTUyOTY8PDEwKSsobi01NjMyMCksaSsrKSxvKz1yPDEyOD8xOnI8MjA0OD8yOnI8NjU1MzY/Mzo0O2Zvcih0PWgudWludDhhcnJheT9uZXcgVWludDhBcnJheShvKTpuZXcgQXJyYXkobyksaT1zPTA7czxvO2krKyk1NTI5Nj09KDY0NTEyJihyPWUuY2hhckNvZGVBdChpKSkpJiZpKzE8YSYmNTYzMjA9PSg2NDUxMiYobj1lLmNoYXJDb2RlQXQoaSsxKSkpJiYocj02NTUzNisoci01NTI5Njw8MTApKyhuLTU2MzIwKSxpKyspLHI8MTI4P3RbcysrXT1yOihyPDIwNDg/dFtzKytdPTE5MnxyPj4+Njoocjw2NTUzNj90W3MrK109MjI0fHI+Pj4xMjoodFtzKytdPTI0MHxyPj4+MTgsdFtzKytdPTEyOHxyPj4+MTImNjMpLHRbcysrXT0xMjh8cj4+PjYmNjMpLHRbcysrXT0xMjh8NjMmcik7cmV0dXJuIHR9KGUpfSxzLnV0ZjhkZWNvZGU9ZnVuY3Rpb24oZSl7cmV0dXJuIGgubm9kZWJ1ZmZlcj9vLnRyYW5zZm9ybVRvKFwibm9kZWJ1ZmZlclwiLGUpLnRvU3RyaW5nKFwidXRmLThcIik6ZnVuY3Rpb24oZSl7dmFyIHQscixuLGkscz1lLmxlbmd0aCxhPW5ldyBBcnJheSgyKnMpO2Zvcih0PXI9MDt0PHM7KWlmKChuPWVbdCsrXSk8MTI4KWFbcisrXT1uO2Vsc2UgaWYoNDwoaT11W25dKSlhW3IrK109NjU1MzMsdCs9aS0xO2Vsc2V7Zm9yKG4mPTI9PT1pPzMxOjM9PT1pPzE1Ojc7MTxpJiZ0PHM7KW49bjw8Nnw2MyZlW3QrK10saS0tOzE8aT9hW3IrK109NjU1MzM6bjw2NTUzNj9hW3IrK109bjoobi09NjU1MzYsYVtyKytdPTU1Mjk2fG4+PjEwJjEwMjMsYVtyKytdPTU2MzIwfDEwMjMmbil9cmV0dXJuIGEubGVuZ3RoIT09ciYmKGEuc3ViYXJyYXk/YT1hLnN1YmFycmF5KDAscik6YS5sZW5ndGg9ciksby5hcHBseUZyb21DaGFyQ29kZShhKX0oZT1vLnRyYW5zZm9ybVRvKGgudWludDhhcnJheT9cInVpbnQ4YXJyYXlcIjpcImFycmF5XCIsZSkpfSxvLmluaGVyaXRzKGEsbiksYS5wcm90b3R5cGUucHJvY2Vzc0NodW5rPWZ1bmN0aW9uKGUpe3ZhciB0PW8udHJhbnNmb3JtVG8oaC51aW50OGFycmF5P1widWludDhhcnJheVwiOlwiYXJyYXlcIixlLmRhdGEpO2lmKHRoaXMubGVmdE92ZXImJnRoaXMubGVmdE92ZXIubGVuZ3RoKXtpZihoLnVpbnQ4YXJyYXkpe3ZhciByPXQ7KHQ9bmV3IFVpbnQ4QXJyYXkoci5sZW5ndGgrdGhpcy5sZWZ0T3Zlci5sZW5ndGgpKS5zZXQodGhpcy5sZWZ0T3ZlciwwKSx0LnNldChyLHRoaXMubGVmdE92ZXIubGVuZ3RoKX1lbHNlIHQ9dGhpcy5sZWZ0T3Zlci5jb25jYXQodCk7dGhpcy5sZWZ0T3Zlcj1udWxsfXZhciBuPWZ1bmN0aW9uKGUsdCl7dmFyIHI7Zm9yKCh0PXR8fGUubGVuZ3RoKT5lLmxlbmd0aCYmKHQ9ZS5sZW5ndGgpLHI9dC0xOzA8PXImJjEyOD09KDE5MiZlW3JdKTspci0tO3JldHVybiByPDA/dDowPT09cj90OnIrdVtlW3JdXT50P3I6dH0odCksaT10O24hPT10Lmxlbmd0aCYmKGgudWludDhhcnJheT8oaT10LnN1YmFycmF5KDAsbiksdGhpcy5sZWZ0T3Zlcj10LnN1YmFycmF5KG4sdC5sZW5ndGgpKTooaT10LnNsaWNlKDAsbiksdGhpcy5sZWZ0T3Zlcj10LnNsaWNlKG4sdC5sZW5ndGgpKSksdGhpcy5wdXNoKHtkYXRhOnMudXRmOGRlY29kZShpKSxtZXRhOmUubWV0YX0pfSxhLnByb3RvdHlwZS5mbHVzaD1mdW5jdGlvbigpe3RoaXMubGVmdE92ZXImJnRoaXMubGVmdE92ZXIubGVuZ3RoJiYodGhpcy5wdXNoKHtkYXRhOnMudXRmOGRlY29kZSh0aGlzLmxlZnRPdmVyKSxtZXRhOnt9fSksdGhpcy5sZWZ0T3Zlcj1udWxsKX0scy5VdGY4RGVjb2RlV29ya2VyPWEsby5pbmhlcml0cyhsLG4pLGwucHJvdG90eXBlLnByb2Nlc3NDaHVuaz1mdW5jdGlvbihlKXt0aGlzLnB1c2goe2RhdGE6cy51dGY4ZW5jb2RlKGUuZGF0YSksbWV0YTplLm1ldGF9KX0scy5VdGY4RW5jb2RlV29ya2VyPWx9LHtcIi4vbm9kZWpzVXRpbHNcIjoxNCxcIi4vc3RyZWFtL0dlbmVyaWNXb3JrZXJcIjoyOCxcIi4vc3VwcG9ydFwiOjMwLFwiLi91dGlsc1wiOjMyfV0sMzI6W2Z1bmN0aW9uKGUsdCxhKXtcInVzZSBzdHJpY3RcIjt2YXIgbz1lKFwiLi9zdXBwb3J0XCIpLGg9ZShcIi4vYmFzZTY0XCIpLHI9ZShcIi4vbm9kZWpzVXRpbHNcIiksdT1lKFwiLi9leHRlcm5hbFwiKTtmdW5jdGlvbiBuKGUpe3JldHVybiBlfWZ1bmN0aW9uIGwoZSx0KXtmb3IodmFyIHI9MDtyPGUubGVuZ3RoOysrcil0W3JdPTI1NSZlLmNoYXJDb2RlQXQocik7cmV0dXJuIHR9ZShcInNldGltbWVkaWF0ZVwiKSxhLm5ld0Jsb2I9ZnVuY3Rpb24odCxyKXthLmNoZWNrU3VwcG9ydChcImJsb2JcIik7dHJ5e3JldHVybiBuZXcgQmxvYihbdF0se3R5cGU6cn0pfWNhdGNoKGUpe3RyeXt2YXIgbj1uZXcoc2VsZi5CbG9iQnVpbGRlcnx8c2VsZi5XZWJLaXRCbG9iQnVpbGRlcnx8c2VsZi5Nb3pCbG9iQnVpbGRlcnx8c2VsZi5NU0Jsb2JCdWlsZGVyKTtyZXR1cm4gbi5hcHBlbmQodCksbi5nZXRCbG9iKHIpfWNhdGNoKGUpe3Rocm93IG5ldyBFcnJvcihcIkJ1ZyA6IGNhbid0IGNvbnN0cnVjdCB0aGUgQmxvYi5cIil9fX07dmFyIGk9e3N0cmluZ2lmeUJ5Q2h1bms6ZnVuY3Rpb24oZSx0LHIpe3ZhciBuPVtdLGk9MCxzPWUubGVuZ3RoO2lmKHM8PXIpcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCxlKTtmb3IoO2k8czspXCJhcnJheVwiPT09dHx8XCJub2RlYnVmZmVyXCI9PT10P24ucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsZS5zbGljZShpLE1hdGgubWluKGkrcixzKSkpKTpuLnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLGUuc3ViYXJyYXkoaSxNYXRoLm1pbihpK3IscykpKSksaSs9cjtyZXR1cm4gbi5qb2luKFwiXCIpfSxzdHJpbmdpZnlCeUNoYXI6ZnVuY3Rpb24oZSl7Zm9yKHZhciB0PVwiXCIscj0wO3I8ZS5sZW5ndGg7cisrKXQrPVN0cmluZy5mcm9tQ2hhckNvZGUoZVtyXSk7cmV0dXJuIHR9LGFwcGx5Q2FuQmVVc2VkOnt1aW50OGFycmF5OmZ1bmN0aW9uKCl7dHJ5e3JldHVybiBvLnVpbnQ4YXJyYXkmJjE9PT1TdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsbmV3IFVpbnQ4QXJyYXkoMSkpLmxlbmd0aH1jYXRjaChlKXtyZXR1cm4hMX19KCksbm9kZWJ1ZmZlcjpmdW5jdGlvbigpe3RyeXtyZXR1cm4gby5ub2RlYnVmZmVyJiYxPT09U3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLHIuYWxsb2NCdWZmZXIoMSkpLmxlbmd0aH1jYXRjaChlKXtyZXR1cm4hMX19KCl9fTtmdW5jdGlvbiBzKGUpe3ZhciB0PTY1NTM2LHI9YS5nZXRUeXBlT2YoZSksbj0hMDtpZihcInVpbnQ4YXJyYXlcIj09PXI/bj1pLmFwcGx5Q2FuQmVVc2VkLnVpbnQ4YXJyYXk6XCJub2RlYnVmZmVyXCI9PT1yJiYobj1pLmFwcGx5Q2FuQmVVc2VkLm5vZGVidWZmZXIpLG4pZm9yKDsxPHQ7KXRyeXtyZXR1cm4gaS5zdHJpbmdpZnlCeUNodW5rKGUscix0KX1jYXRjaChlKXt0PU1hdGguZmxvb3IodC8yKX1yZXR1cm4gaS5zdHJpbmdpZnlCeUNoYXIoZSl9ZnVuY3Rpb24gZihlLHQpe2Zvcih2YXIgcj0wO3I8ZS5sZW5ndGg7cisrKXRbcl09ZVtyXTtyZXR1cm4gdH1hLmFwcGx5RnJvbUNoYXJDb2RlPXM7dmFyIGM9e307Yy5zdHJpbmc9e3N0cmluZzpuLGFycmF5OmZ1bmN0aW9uKGUpe3JldHVybiBsKGUsbmV3IEFycmF5KGUubGVuZ3RoKSl9LGFycmF5YnVmZmVyOmZ1bmN0aW9uKGUpe3JldHVybiBjLnN0cmluZy51aW50OGFycmF5KGUpLmJ1ZmZlcn0sdWludDhhcnJheTpmdW5jdGlvbihlKXtyZXR1cm4gbChlLG5ldyBVaW50OEFycmF5KGUubGVuZ3RoKSl9LG5vZGVidWZmZXI6ZnVuY3Rpb24oZSl7cmV0dXJuIGwoZSxyLmFsbG9jQnVmZmVyKGUubGVuZ3RoKSl9fSxjLmFycmF5PXtzdHJpbmc6cyxhcnJheTpuLGFycmF5YnVmZmVyOmZ1bmN0aW9uKGUpe3JldHVybiBuZXcgVWludDhBcnJheShlKS5idWZmZXJ9LHVpbnQ4YXJyYXk6ZnVuY3Rpb24oZSl7cmV0dXJuIG5ldyBVaW50OEFycmF5KGUpfSxub2RlYnVmZmVyOmZ1bmN0aW9uKGUpe3JldHVybiByLm5ld0J1ZmZlckZyb20oZSl9fSxjLmFycmF5YnVmZmVyPXtzdHJpbmc6ZnVuY3Rpb24oZSl7cmV0dXJuIHMobmV3IFVpbnQ4QXJyYXkoZSkpfSxhcnJheTpmdW5jdGlvbihlKXtyZXR1cm4gZihuZXcgVWludDhBcnJheShlKSxuZXcgQXJyYXkoZS5ieXRlTGVuZ3RoKSl9LGFycmF5YnVmZmVyOm4sdWludDhhcnJheTpmdW5jdGlvbihlKXtyZXR1cm4gbmV3IFVpbnQ4QXJyYXkoZSl9LG5vZGVidWZmZXI6ZnVuY3Rpb24oZSl7cmV0dXJuIHIubmV3QnVmZmVyRnJvbShuZXcgVWludDhBcnJheShlKSl9fSxjLnVpbnQ4YXJyYXk9e3N0cmluZzpzLGFycmF5OmZ1bmN0aW9uKGUpe3JldHVybiBmKGUsbmV3IEFycmF5KGUubGVuZ3RoKSl9LGFycmF5YnVmZmVyOmZ1bmN0aW9uKGUpe3JldHVybiBlLmJ1ZmZlcn0sdWludDhhcnJheTpuLG5vZGVidWZmZXI6ZnVuY3Rpb24oZSl7cmV0dXJuIHIubmV3QnVmZmVyRnJvbShlKX19LGMubm9kZWJ1ZmZlcj17c3RyaW5nOnMsYXJyYXk6ZnVuY3Rpb24oZSl7cmV0dXJuIGYoZSxuZXcgQXJyYXkoZS5sZW5ndGgpKX0sYXJyYXlidWZmZXI6ZnVuY3Rpb24oZSl7cmV0dXJuIGMubm9kZWJ1ZmZlci51aW50OGFycmF5KGUpLmJ1ZmZlcn0sdWludDhhcnJheTpmdW5jdGlvbihlKXtyZXR1cm4gZihlLG5ldyBVaW50OEFycmF5KGUubGVuZ3RoKSl9LG5vZGVidWZmZXI6bn0sYS50cmFuc2Zvcm1Ubz1mdW5jdGlvbihlLHQpe2lmKHQ9dHx8XCJcIiwhZSlyZXR1cm4gdDthLmNoZWNrU3VwcG9ydChlKTt2YXIgcj1hLmdldFR5cGVPZih0KTtyZXR1cm4gY1tyXVtlXSh0KX0sYS5yZXNvbHZlPWZ1bmN0aW9uKGUpe2Zvcih2YXIgdD1lLnNwbGl0KFwiL1wiKSxyPVtdLG49MDtuPHQubGVuZ3RoO24rKyl7dmFyIGk9dFtuXTtcIi5cIj09PWl8fFwiXCI9PT1pJiYwIT09biYmbiE9PXQubGVuZ3RoLTF8fChcIi4uXCI9PT1pP3IucG9wKCk6ci5wdXNoKGkpKX1yZXR1cm4gci5qb2luKFwiL1wiKX0sYS5nZXRUeXBlT2Y9ZnVuY3Rpb24oZSl7aWYoXCJzdHJpbmdcIj09dHlwZW9mIGUpcmV0dXJuXCJzdHJpbmdcIjt2YXIgdD1PYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZSk7cmV0dXJuXCJbb2JqZWN0IEFycmF5XVwiPT09dD9cImFycmF5XCI6by5ub2RlYnVmZmVyJiZyLmlzQnVmZmVyKGUpP1wibm9kZWJ1ZmZlclwiOm8udWludDhhcnJheSYmXCJbb2JqZWN0IFVpbnQ4QXJyYXldXCI9PT10P1widWludDhhcnJheVwiOm8uYXJyYXlidWZmZXImJlwiW29iamVjdCBBcnJheUJ1ZmZlcl1cIj09PXQ/XCJhcnJheWJ1ZmZlclwiOnZvaWQgMH0sYS5jaGVja1N1cHBvcnQ9ZnVuY3Rpb24oZSl7aWYoIW9bZS50b0xvd2VyQ2FzZSgpXSl0aHJvdyBuZXcgRXJyb3IoZStcIiBpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoaXMgcGxhdGZvcm1cIil9LGEuTUFYX1ZBTFVFXzE2QklUUz02NTUzNSxhLk1BWF9WQUxVRV8zMkJJVFM9LTEsYS5wcmV0dHk9ZnVuY3Rpb24oZSl7dmFyIHQscixuPVwiXCI7Zm9yKHI9MDtyPChlfHxcIlwiKS5sZW5ndGg7cisrKW4rPVwiXFxcXHhcIisoKHQ9ZS5jaGFyQ29kZUF0KHIpKTwxNj9cIjBcIjpcIlwiKSt0LnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpO3JldHVybiBufSxhLmRlbGF5PWZ1bmN0aW9uKGUsdCxyKXtzZXRJbW1lZGlhdGUoZnVuY3Rpb24oKXtlLmFwcGx5KHJ8fG51bGwsdHx8W10pfSl9LGEuaW5oZXJpdHM9ZnVuY3Rpb24oZSx0KXtmdW5jdGlvbiByKCl7fXIucHJvdG90eXBlPXQucHJvdG90eXBlLGUucHJvdG90eXBlPW5ldyByfSxhLmV4dGVuZD1mdW5jdGlvbigpe3ZhciBlLHQscj17fTtmb3IoZT0wO2U8YXJndW1lbnRzLmxlbmd0aDtlKyspZm9yKHQgaW4gYXJndW1lbnRzW2VdKU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhcmd1bWVudHNbZV0sdCkmJnZvaWQgMD09PXJbdF0mJihyW3RdPWFyZ3VtZW50c1tlXVt0XSk7cmV0dXJuIHJ9LGEucHJlcGFyZUNvbnRlbnQ9ZnVuY3Rpb24ocixlLG4saSxzKXtyZXR1cm4gdS5Qcm9taXNlLnJlc29sdmUoZSkudGhlbihmdW5jdGlvbihuKXtyZXR1cm4gby5ibG9iJiYobiBpbnN0YW5jZW9mIEJsb2J8fC0xIT09W1wiW29iamVjdCBGaWxlXVwiLFwiW29iamVjdCBCbG9iXVwiXS5pbmRleE9mKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChuKSkpP3ZvaWQgMCE9PUJsb2IucHJvdG90eXBlLmFycmF5QnVmZmVyP24uYXJyYXlCdWZmZXIoKTpcInVuZGVmaW5lZFwiIT10eXBlb2YgRmlsZVJlYWRlcj9uZXcgdS5Qcm9taXNlKGZ1bmN0aW9uKHQscil7dmFyIGU9bmV3IEZpbGVSZWFkZXI7ZS5vbmxvYWQ9ZnVuY3Rpb24oZSl7dChlLnRhcmdldC5yZXN1bHQpfSxlLm9uZXJyb3I9ZnVuY3Rpb24oZSl7cihlLnRhcmdldC5lcnJvcil9LGUucmVhZEFzQXJyYXlCdWZmZXIobil9KTp1LlByb21pc2UucmVqZWN0KG5ldyBFcnJvcihyK1wiIGlzIGEgQmxvYiwgYnV0IHdlIGhhdmUgbm8gd2F5IG9mIHJlYWRpbmcgaXQuXCIpKTpufSkudGhlbihmdW5jdGlvbihlKXt2YXIgdD1hLmdldFR5cGVPZihlKTtyZXR1cm4gdD8oXCJhcnJheWJ1ZmZlclwiPT09dD9lPWEudHJhbnNmb3JtVG8oXCJ1aW50OGFycmF5XCIsZSk6XCJzdHJpbmdcIj09PXQmJihzP2U9aC5kZWNvZGUoZSk6biYmITAhPT1pJiYoZT1mdW5jdGlvbihlKXtyZXR1cm4gbChlLG8udWludDhhcnJheT9uZXcgVWludDhBcnJheShlLmxlbmd0aCk6bmV3IEFycmF5KGUubGVuZ3RoKSl9KGUpKSksZSk6dS5Qcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJDYW4ndCByZWFkIHRoZSBkYXRhIG9mICdcIityK1wiJy4gSXMgaXQgaW4gYSBzdXBwb3J0ZWQgSmF2YVNjcmlwdCB0eXBlIChTdHJpbmcsIEJsb2IsIEFycmF5QnVmZmVyLCBldGMpID9cIikpfSl9fSx7XCIuL2Jhc2U2NFwiOjEsXCIuL2V4dGVybmFsXCI6NixcIi4vbm9kZWpzVXRpbHNcIjoxNCxcIi4vc3VwcG9ydFwiOjMwLHNldGltbWVkaWF0ZTo1NH1dLDMzOltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7dmFyIG49ZShcIi4vcmVhZGVyL3JlYWRlckZvclwiKSxpPWUoXCIuL3V0aWxzXCIpLHM9ZShcIi4vc2lnbmF0dXJlXCIpLGE9ZShcIi4vemlwRW50cnlcIiksbz1lKFwiLi9zdXBwb3J0XCIpO2Z1bmN0aW9uIGgoZSl7dGhpcy5maWxlcz1bXSx0aGlzLmxvYWRPcHRpb25zPWV9aC5wcm90b3R5cGU9e2NoZWNrU2lnbmF0dXJlOmZ1bmN0aW9uKGUpe2lmKCF0aGlzLnJlYWRlci5yZWFkQW5kQ2hlY2tTaWduYXR1cmUoZSkpe3RoaXMucmVhZGVyLmluZGV4LT00O3ZhciB0PXRoaXMucmVhZGVyLnJlYWRTdHJpbmcoNCk7dGhyb3cgbmV3IEVycm9yKFwiQ29ycnVwdGVkIHppcCBvciBidWc6IHVuZXhwZWN0ZWQgc2lnbmF0dXJlIChcIitpLnByZXR0eSh0KStcIiwgZXhwZWN0ZWQgXCIraS5wcmV0dHkoZSkrXCIpXCIpfX0saXNTaWduYXR1cmU6ZnVuY3Rpb24oZSx0KXt2YXIgcj10aGlzLnJlYWRlci5pbmRleDt0aGlzLnJlYWRlci5zZXRJbmRleChlKTt2YXIgbj10aGlzLnJlYWRlci5yZWFkU3RyaW5nKDQpPT09dDtyZXR1cm4gdGhpcy5yZWFkZXIuc2V0SW5kZXgociksbn0scmVhZEJsb2NrRW5kT2ZDZW50cmFsOmZ1bmN0aW9uKCl7dGhpcy5kaXNrTnVtYmVyPXRoaXMucmVhZGVyLnJlYWRJbnQoMiksdGhpcy5kaXNrV2l0aENlbnRyYWxEaXJTdGFydD10aGlzLnJlYWRlci5yZWFkSW50KDIpLHRoaXMuY2VudHJhbERpclJlY29yZHNPblRoaXNEaXNrPXRoaXMucmVhZGVyLnJlYWRJbnQoMiksdGhpcy5jZW50cmFsRGlyUmVjb3Jkcz10aGlzLnJlYWRlci5yZWFkSW50KDIpLHRoaXMuY2VudHJhbERpclNpemU9dGhpcy5yZWFkZXIucmVhZEludCg0KSx0aGlzLmNlbnRyYWxEaXJPZmZzZXQ9dGhpcy5yZWFkZXIucmVhZEludCg0KSx0aGlzLnppcENvbW1lbnRMZW5ndGg9dGhpcy5yZWFkZXIucmVhZEludCgyKTt2YXIgZT10aGlzLnJlYWRlci5yZWFkRGF0YSh0aGlzLnppcENvbW1lbnRMZW5ndGgpLHQ9by51aW50OGFycmF5P1widWludDhhcnJheVwiOlwiYXJyYXlcIixyPWkudHJhbnNmb3JtVG8odCxlKTt0aGlzLnppcENvbW1lbnQ9dGhpcy5sb2FkT3B0aW9ucy5kZWNvZGVGaWxlTmFtZShyKX0scmVhZEJsb2NrWmlwNjRFbmRPZkNlbnRyYWw6ZnVuY3Rpb24oKXt0aGlzLnppcDY0RW5kT2ZDZW50cmFsU2l6ZT10aGlzLnJlYWRlci5yZWFkSW50KDgpLHRoaXMucmVhZGVyLnNraXAoNCksdGhpcy5kaXNrTnVtYmVyPXRoaXMucmVhZGVyLnJlYWRJbnQoNCksdGhpcy5kaXNrV2l0aENlbnRyYWxEaXJTdGFydD10aGlzLnJlYWRlci5yZWFkSW50KDQpLHRoaXMuY2VudHJhbERpclJlY29yZHNPblRoaXNEaXNrPXRoaXMucmVhZGVyLnJlYWRJbnQoOCksdGhpcy5jZW50cmFsRGlyUmVjb3Jkcz10aGlzLnJlYWRlci5yZWFkSW50KDgpLHRoaXMuY2VudHJhbERpclNpemU9dGhpcy5yZWFkZXIucmVhZEludCg4KSx0aGlzLmNlbnRyYWxEaXJPZmZzZXQ9dGhpcy5yZWFkZXIucmVhZEludCg4KSx0aGlzLnppcDY0RXh0ZW5zaWJsZURhdGE9e307Zm9yKHZhciBlLHQscixuPXRoaXMuemlwNjRFbmRPZkNlbnRyYWxTaXplLTQ0OzA8bjspZT10aGlzLnJlYWRlci5yZWFkSW50KDIpLHQ9dGhpcy5yZWFkZXIucmVhZEludCg0KSxyPXRoaXMucmVhZGVyLnJlYWREYXRhKHQpLHRoaXMuemlwNjRFeHRlbnNpYmxlRGF0YVtlXT17aWQ6ZSxsZW5ndGg6dCx2YWx1ZTpyfX0scmVhZEJsb2NrWmlwNjRFbmRPZkNlbnRyYWxMb2NhdG9yOmZ1bmN0aW9uKCl7aWYodGhpcy5kaXNrV2l0aFppcDY0Q2VudHJhbERpclN0YXJ0PXRoaXMucmVhZGVyLnJlYWRJbnQoNCksdGhpcy5yZWxhdGl2ZU9mZnNldEVuZE9mWmlwNjRDZW50cmFsRGlyPXRoaXMucmVhZGVyLnJlYWRJbnQoOCksdGhpcy5kaXNrc0NvdW50PXRoaXMucmVhZGVyLnJlYWRJbnQoNCksMTx0aGlzLmRpc2tzQ291bnQpdGhyb3cgbmV3IEVycm9yKFwiTXVsdGktdm9sdW1lcyB6aXAgYXJlIG5vdCBzdXBwb3J0ZWRcIil9LHJlYWRMb2NhbEZpbGVzOmZ1bmN0aW9uKCl7dmFyIGUsdDtmb3IoZT0wO2U8dGhpcy5maWxlcy5sZW5ndGg7ZSsrKXQ9dGhpcy5maWxlc1tlXSx0aGlzLnJlYWRlci5zZXRJbmRleCh0LmxvY2FsSGVhZGVyT2Zmc2V0KSx0aGlzLmNoZWNrU2lnbmF0dXJlKHMuTE9DQUxfRklMRV9IRUFERVIpLHQucmVhZExvY2FsUGFydCh0aGlzLnJlYWRlciksdC5oYW5kbGVVVEY4KCksdC5wcm9jZXNzQXR0cmlidXRlcygpfSxyZWFkQ2VudHJhbERpcjpmdW5jdGlvbigpe3ZhciBlO2Zvcih0aGlzLnJlYWRlci5zZXRJbmRleCh0aGlzLmNlbnRyYWxEaXJPZmZzZXQpO3RoaXMucmVhZGVyLnJlYWRBbmRDaGVja1NpZ25hdHVyZShzLkNFTlRSQUxfRklMRV9IRUFERVIpOykoZT1uZXcgYSh7emlwNjQ6dGhpcy56aXA2NH0sdGhpcy5sb2FkT3B0aW9ucykpLnJlYWRDZW50cmFsUGFydCh0aGlzLnJlYWRlciksdGhpcy5maWxlcy5wdXNoKGUpO2lmKHRoaXMuY2VudHJhbERpclJlY29yZHMhPT10aGlzLmZpbGVzLmxlbmd0aCYmMCE9PXRoaXMuY2VudHJhbERpclJlY29yZHMmJjA9PT10aGlzLmZpbGVzLmxlbmd0aCl0aHJvdyBuZXcgRXJyb3IoXCJDb3JydXB0ZWQgemlwIG9yIGJ1ZzogZXhwZWN0ZWQgXCIrdGhpcy5jZW50cmFsRGlyUmVjb3JkcytcIiByZWNvcmRzIGluIGNlbnRyYWwgZGlyLCBnb3QgXCIrdGhpcy5maWxlcy5sZW5ndGgpfSxyZWFkRW5kT2ZDZW50cmFsOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcy5yZWFkZXIubGFzdEluZGV4T2ZTaWduYXR1cmUocy5DRU5UUkFMX0RJUkVDVE9SWV9FTkQpO2lmKGU8MCl0aHJvdyF0aGlzLmlzU2lnbmF0dXJlKDAscy5MT0NBTF9GSUxFX0hFQURFUik/bmV3IEVycm9yKFwiQ2FuJ3QgZmluZCBlbmQgb2YgY2VudHJhbCBkaXJlY3RvcnkgOiBpcyB0aGlzIGEgemlwIGZpbGUgPyBJZiBpdCBpcywgc2VlIGh0dHBzOi8vc3R1ay5naXRodWIuaW8vanN6aXAvZG9jdW1lbnRhdGlvbi9ob3d0by9yZWFkX3ppcC5odG1sXCIpOm5ldyBFcnJvcihcIkNvcnJ1cHRlZCB6aXA6IGNhbid0IGZpbmQgZW5kIG9mIGNlbnRyYWwgZGlyZWN0b3J5XCIpO3RoaXMucmVhZGVyLnNldEluZGV4KGUpO3ZhciB0PWU7aWYodGhpcy5jaGVja1NpZ25hdHVyZShzLkNFTlRSQUxfRElSRUNUT1JZX0VORCksdGhpcy5yZWFkQmxvY2tFbmRPZkNlbnRyYWwoKSx0aGlzLmRpc2tOdW1iZXI9PT1pLk1BWF9WQUxVRV8xNkJJVFN8fHRoaXMuZGlza1dpdGhDZW50cmFsRGlyU3RhcnQ9PT1pLk1BWF9WQUxVRV8xNkJJVFN8fHRoaXMuY2VudHJhbERpclJlY29yZHNPblRoaXNEaXNrPT09aS5NQVhfVkFMVUVfMTZCSVRTfHx0aGlzLmNlbnRyYWxEaXJSZWNvcmRzPT09aS5NQVhfVkFMVUVfMTZCSVRTfHx0aGlzLmNlbnRyYWxEaXJTaXplPT09aS5NQVhfVkFMVUVfMzJCSVRTfHx0aGlzLmNlbnRyYWxEaXJPZmZzZXQ9PT1pLk1BWF9WQUxVRV8zMkJJVFMpe2lmKHRoaXMuemlwNjQ9ITAsKGU9dGhpcy5yZWFkZXIubGFzdEluZGV4T2ZTaWduYXR1cmUocy5aSVA2NF9DRU5UUkFMX0RJUkVDVE9SWV9MT0NBVE9SKSk8MCl0aHJvdyBuZXcgRXJyb3IoXCJDb3JydXB0ZWQgemlwOiBjYW4ndCBmaW5kIHRoZSBaSVA2NCBlbmQgb2YgY2VudHJhbCBkaXJlY3RvcnkgbG9jYXRvclwiKTtpZih0aGlzLnJlYWRlci5zZXRJbmRleChlKSx0aGlzLmNoZWNrU2lnbmF0dXJlKHMuWklQNjRfQ0VOVFJBTF9ESVJFQ1RPUllfTE9DQVRPUiksdGhpcy5yZWFkQmxvY2taaXA2NEVuZE9mQ2VudHJhbExvY2F0b3IoKSwhdGhpcy5pc1NpZ25hdHVyZSh0aGlzLnJlbGF0aXZlT2Zmc2V0RW5kT2ZaaXA2NENlbnRyYWxEaXIscy5aSVA2NF9DRU5UUkFMX0RJUkVDVE9SWV9FTkQpJiYodGhpcy5yZWxhdGl2ZU9mZnNldEVuZE9mWmlwNjRDZW50cmFsRGlyPXRoaXMucmVhZGVyLmxhc3RJbmRleE9mU2lnbmF0dXJlKHMuWklQNjRfQ0VOVFJBTF9ESVJFQ1RPUllfRU5EKSx0aGlzLnJlbGF0aXZlT2Zmc2V0RW5kT2ZaaXA2NENlbnRyYWxEaXI8MCkpdGhyb3cgbmV3IEVycm9yKFwiQ29ycnVwdGVkIHppcDogY2FuJ3QgZmluZCB0aGUgWklQNjQgZW5kIG9mIGNlbnRyYWwgZGlyZWN0b3J5XCIpO3RoaXMucmVhZGVyLnNldEluZGV4KHRoaXMucmVsYXRpdmVPZmZzZXRFbmRPZlppcDY0Q2VudHJhbERpciksdGhpcy5jaGVja1NpZ25hdHVyZShzLlpJUDY0X0NFTlRSQUxfRElSRUNUT1JZX0VORCksdGhpcy5yZWFkQmxvY2taaXA2NEVuZE9mQ2VudHJhbCgpfXZhciByPXRoaXMuY2VudHJhbERpck9mZnNldCt0aGlzLmNlbnRyYWxEaXJTaXplO3RoaXMuemlwNjQmJihyKz0yMCxyKz0xMit0aGlzLnppcDY0RW5kT2ZDZW50cmFsU2l6ZSk7dmFyIG49dC1yO2lmKDA8bil0aGlzLmlzU2lnbmF0dXJlKHQscy5DRU5UUkFMX0ZJTEVfSEVBREVSKXx8KHRoaXMucmVhZGVyLnplcm89bik7ZWxzZSBpZihuPDApdGhyb3cgbmV3IEVycm9yKFwiQ29ycnVwdGVkIHppcDogbWlzc2luZyBcIitNYXRoLmFicyhuKStcIiBieXRlcy5cIil9LHByZXBhcmVSZWFkZXI6ZnVuY3Rpb24oZSl7dGhpcy5yZWFkZXI9bihlKX0sbG9hZDpmdW5jdGlvbihlKXt0aGlzLnByZXBhcmVSZWFkZXIoZSksdGhpcy5yZWFkRW5kT2ZDZW50cmFsKCksdGhpcy5yZWFkQ2VudHJhbERpcigpLHRoaXMucmVhZExvY2FsRmlsZXMoKX19LHQuZXhwb3J0cz1ofSx7XCIuL3JlYWRlci9yZWFkZXJGb3JcIjoyMixcIi4vc2lnbmF0dXJlXCI6MjMsXCIuL3N1cHBvcnRcIjozMCxcIi4vdXRpbHNcIjozMixcIi4vemlwRW50cnlcIjozNH1dLDM0OltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7dmFyIG49ZShcIi4vcmVhZGVyL3JlYWRlckZvclwiKSxzPWUoXCIuL3V0aWxzXCIpLGk9ZShcIi4vY29tcHJlc3NlZE9iamVjdFwiKSxhPWUoXCIuL2NyYzMyXCIpLG89ZShcIi4vdXRmOFwiKSxoPWUoXCIuL2NvbXByZXNzaW9uc1wiKSx1PWUoXCIuL3N1cHBvcnRcIik7ZnVuY3Rpb24gbChlLHQpe3RoaXMub3B0aW9ucz1lLHRoaXMubG9hZE9wdGlvbnM9dH1sLnByb3RvdHlwZT17aXNFbmNyeXB0ZWQ6ZnVuY3Rpb24oKXtyZXR1cm4gMT09KDEmdGhpcy5iaXRGbGFnKX0sdXNlVVRGODpmdW5jdGlvbigpe3JldHVybiAyMDQ4PT0oMjA0OCZ0aGlzLmJpdEZsYWcpfSxyZWFkTG9jYWxQYXJ0OmZ1bmN0aW9uKGUpe3ZhciB0LHI7aWYoZS5za2lwKDIyKSx0aGlzLmZpbGVOYW1lTGVuZ3RoPWUucmVhZEludCgyKSxyPWUucmVhZEludCgyKSx0aGlzLmZpbGVOYW1lPWUucmVhZERhdGEodGhpcy5maWxlTmFtZUxlbmd0aCksZS5za2lwKHIpLC0xPT09dGhpcy5jb21wcmVzc2VkU2l6ZXx8LTE9PT10aGlzLnVuY29tcHJlc3NlZFNpemUpdGhyb3cgbmV3IEVycm9yKFwiQnVnIG9yIGNvcnJ1cHRlZCB6aXAgOiBkaWRuJ3QgZ2V0IGVub3VnaCBpbmZvcm1hdGlvbiBmcm9tIHRoZSBjZW50cmFsIGRpcmVjdG9yeSAoY29tcHJlc3NlZFNpemUgPT09IC0xIHx8IHVuY29tcHJlc3NlZFNpemUgPT09IC0xKVwiKTtpZihudWxsPT09KHQ9ZnVuY3Rpb24oZSl7Zm9yKHZhciB0IGluIGgpaWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGgsdCkmJmhbdF0ubWFnaWM9PT1lKXJldHVybiBoW3RdO3JldHVybiBudWxsfSh0aGlzLmNvbXByZXNzaW9uTWV0aG9kKSkpdGhyb3cgbmV3IEVycm9yKFwiQ29ycnVwdGVkIHppcCA6IGNvbXByZXNzaW9uIFwiK3MucHJldHR5KHRoaXMuY29tcHJlc3Npb25NZXRob2QpK1wiIHVua25vd24gKGlubmVyIGZpbGUgOiBcIitzLnRyYW5zZm9ybVRvKFwic3RyaW5nXCIsdGhpcy5maWxlTmFtZSkrXCIpXCIpO3RoaXMuZGVjb21wcmVzc2VkPW5ldyBpKHRoaXMuY29tcHJlc3NlZFNpemUsdGhpcy51bmNvbXByZXNzZWRTaXplLHRoaXMuY3JjMzIsdCxlLnJlYWREYXRhKHRoaXMuY29tcHJlc3NlZFNpemUpKX0scmVhZENlbnRyYWxQYXJ0OmZ1bmN0aW9uKGUpe3RoaXMudmVyc2lvbk1hZGVCeT1lLnJlYWRJbnQoMiksZS5za2lwKDIpLHRoaXMuYml0RmxhZz1lLnJlYWRJbnQoMiksdGhpcy5jb21wcmVzc2lvbk1ldGhvZD1lLnJlYWRTdHJpbmcoMiksdGhpcy5kYXRlPWUucmVhZERhdGUoKSx0aGlzLmNyYzMyPWUucmVhZEludCg0KSx0aGlzLmNvbXByZXNzZWRTaXplPWUucmVhZEludCg0KSx0aGlzLnVuY29tcHJlc3NlZFNpemU9ZS5yZWFkSW50KDQpO3ZhciB0PWUucmVhZEludCgyKTtpZih0aGlzLmV4dHJhRmllbGRzTGVuZ3RoPWUucmVhZEludCgyKSx0aGlzLmZpbGVDb21tZW50TGVuZ3RoPWUucmVhZEludCgyKSx0aGlzLmRpc2tOdW1iZXJTdGFydD1lLnJlYWRJbnQoMiksdGhpcy5pbnRlcm5hbEZpbGVBdHRyaWJ1dGVzPWUucmVhZEludCgyKSx0aGlzLmV4dGVybmFsRmlsZUF0dHJpYnV0ZXM9ZS5yZWFkSW50KDQpLHRoaXMubG9jYWxIZWFkZXJPZmZzZXQ9ZS5yZWFkSW50KDQpLHRoaXMuaXNFbmNyeXB0ZWQoKSl0aHJvdyBuZXcgRXJyb3IoXCJFbmNyeXB0ZWQgemlwIGFyZSBub3Qgc3VwcG9ydGVkXCIpO2Uuc2tpcCh0KSx0aGlzLnJlYWRFeHRyYUZpZWxkcyhlKSx0aGlzLnBhcnNlWklQNjRFeHRyYUZpZWxkKGUpLHRoaXMuZmlsZUNvbW1lbnQ9ZS5yZWFkRGF0YSh0aGlzLmZpbGVDb21tZW50TGVuZ3RoKX0scHJvY2Vzc0F0dHJpYnV0ZXM6ZnVuY3Rpb24oKXt0aGlzLnVuaXhQZXJtaXNzaW9ucz1udWxsLHRoaXMuZG9zUGVybWlzc2lvbnM9bnVsbDt2YXIgZT10aGlzLnZlcnNpb25NYWRlQnk+Pjg7dGhpcy5kaXI9ISEoMTYmdGhpcy5leHRlcm5hbEZpbGVBdHRyaWJ1dGVzKSwwPT1lJiYodGhpcy5kb3NQZXJtaXNzaW9ucz02MyZ0aGlzLmV4dGVybmFsRmlsZUF0dHJpYnV0ZXMpLDM9PWUmJih0aGlzLnVuaXhQZXJtaXNzaW9ucz10aGlzLmV4dGVybmFsRmlsZUF0dHJpYnV0ZXM+PjE2JjY1NTM1KSx0aGlzLmRpcnx8XCIvXCIhPT10aGlzLmZpbGVOYW1lU3RyLnNsaWNlKC0xKXx8KHRoaXMuZGlyPSEwKX0scGFyc2VaSVA2NEV4dHJhRmllbGQ6ZnVuY3Rpb24oKXtpZih0aGlzLmV4dHJhRmllbGRzWzFdKXt2YXIgZT1uKHRoaXMuZXh0cmFGaWVsZHNbMV0udmFsdWUpO3RoaXMudW5jb21wcmVzc2VkU2l6ZT09PXMuTUFYX1ZBTFVFXzMyQklUUyYmKHRoaXMudW5jb21wcmVzc2VkU2l6ZT1lLnJlYWRJbnQoOCkpLHRoaXMuY29tcHJlc3NlZFNpemU9PT1zLk1BWF9WQUxVRV8zMkJJVFMmJih0aGlzLmNvbXByZXNzZWRTaXplPWUucmVhZEludCg4KSksdGhpcy5sb2NhbEhlYWRlck9mZnNldD09PXMuTUFYX1ZBTFVFXzMyQklUUyYmKHRoaXMubG9jYWxIZWFkZXJPZmZzZXQ9ZS5yZWFkSW50KDgpKSx0aGlzLmRpc2tOdW1iZXJTdGFydD09PXMuTUFYX1ZBTFVFXzMyQklUUyYmKHRoaXMuZGlza051bWJlclN0YXJ0PWUucmVhZEludCg0KSl9fSxyZWFkRXh0cmFGaWVsZHM6ZnVuY3Rpb24oZSl7dmFyIHQscixuLGk9ZS5pbmRleCt0aGlzLmV4dHJhRmllbGRzTGVuZ3RoO2Zvcih0aGlzLmV4dHJhRmllbGRzfHwodGhpcy5leHRyYUZpZWxkcz17fSk7ZS5pbmRleCs0PGk7KXQ9ZS5yZWFkSW50KDIpLHI9ZS5yZWFkSW50KDIpLG49ZS5yZWFkRGF0YShyKSx0aGlzLmV4dHJhRmllbGRzW3RdPXtpZDp0LGxlbmd0aDpyLHZhbHVlOm59O2Uuc2V0SW5kZXgoaSl9LGhhbmRsZVVURjg6ZnVuY3Rpb24oKXt2YXIgZT11LnVpbnQ4YXJyYXk/XCJ1aW50OGFycmF5XCI6XCJhcnJheVwiO2lmKHRoaXMudXNlVVRGOCgpKXRoaXMuZmlsZU5hbWVTdHI9by51dGY4ZGVjb2RlKHRoaXMuZmlsZU5hbWUpLHRoaXMuZmlsZUNvbW1lbnRTdHI9by51dGY4ZGVjb2RlKHRoaXMuZmlsZUNvbW1lbnQpO2Vsc2V7dmFyIHQ9dGhpcy5maW5kRXh0cmFGaWVsZFVuaWNvZGVQYXRoKCk7aWYobnVsbCE9PXQpdGhpcy5maWxlTmFtZVN0cj10O2Vsc2V7dmFyIHI9cy50cmFuc2Zvcm1UbyhlLHRoaXMuZmlsZU5hbWUpO3RoaXMuZmlsZU5hbWVTdHI9dGhpcy5sb2FkT3B0aW9ucy5kZWNvZGVGaWxlTmFtZShyKX12YXIgbj10aGlzLmZpbmRFeHRyYUZpZWxkVW5pY29kZUNvbW1lbnQoKTtpZihudWxsIT09bil0aGlzLmZpbGVDb21tZW50U3RyPW47ZWxzZXt2YXIgaT1zLnRyYW5zZm9ybVRvKGUsdGhpcy5maWxlQ29tbWVudCk7dGhpcy5maWxlQ29tbWVudFN0cj10aGlzLmxvYWRPcHRpb25zLmRlY29kZUZpbGVOYW1lKGkpfX19LGZpbmRFeHRyYUZpZWxkVW5pY29kZVBhdGg6ZnVuY3Rpb24oKXt2YXIgZT10aGlzLmV4dHJhRmllbGRzWzI4Nzg5XTtpZihlKXt2YXIgdD1uKGUudmFsdWUpO3JldHVybiAxIT09dC5yZWFkSW50KDEpP251bGw6YSh0aGlzLmZpbGVOYW1lKSE9PXQucmVhZEludCg0KT9udWxsOm8udXRmOGRlY29kZSh0LnJlYWREYXRhKGUubGVuZ3RoLTUpKX1yZXR1cm4gbnVsbH0sZmluZEV4dHJhRmllbGRVbmljb2RlQ29tbWVudDpmdW5jdGlvbigpe3ZhciBlPXRoaXMuZXh0cmFGaWVsZHNbMjU0NjFdO2lmKGUpe3ZhciB0PW4oZS52YWx1ZSk7cmV0dXJuIDEhPT10LnJlYWRJbnQoMSk/bnVsbDphKHRoaXMuZmlsZUNvbW1lbnQpIT09dC5yZWFkSW50KDQpP251bGw6by51dGY4ZGVjb2RlKHQucmVhZERhdGEoZS5sZW5ndGgtNSkpfXJldHVybiBudWxsfX0sdC5leHBvcnRzPWx9LHtcIi4vY29tcHJlc3NlZE9iamVjdFwiOjIsXCIuL2NvbXByZXNzaW9uc1wiOjMsXCIuL2NyYzMyXCI6NCxcIi4vcmVhZGVyL3JlYWRlckZvclwiOjIyLFwiLi9zdXBwb3J0XCI6MzAsXCIuL3V0ZjhcIjozMSxcIi4vdXRpbHNcIjozMn1dLDM1OltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gbihlLHQscil7dGhpcy5uYW1lPWUsdGhpcy5kaXI9ci5kaXIsdGhpcy5kYXRlPXIuZGF0ZSx0aGlzLmNvbW1lbnQ9ci5jb21tZW50LHRoaXMudW5peFBlcm1pc3Npb25zPXIudW5peFBlcm1pc3Npb25zLHRoaXMuZG9zUGVybWlzc2lvbnM9ci5kb3NQZXJtaXNzaW9ucyx0aGlzLl9kYXRhPXQsdGhpcy5fZGF0YUJpbmFyeT1yLmJpbmFyeSx0aGlzLm9wdGlvbnM9e2NvbXByZXNzaW9uOnIuY29tcHJlc3Npb24sY29tcHJlc3Npb25PcHRpb25zOnIuY29tcHJlc3Npb25PcHRpb25zfX12YXIgcz1lKFwiLi9zdHJlYW0vU3RyZWFtSGVscGVyXCIpLGk9ZShcIi4vc3RyZWFtL0RhdGFXb3JrZXJcIiksYT1lKFwiLi91dGY4XCIpLG89ZShcIi4vY29tcHJlc3NlZE9iamVjdFwiKSxoPWUoXCIuL3N0cmVhbS9HZW5lcmljV29ya2VyXCIpO24ucHJvdG90eXBlPXtpbnRlcm5hbFN0cmVhbTpmdW5jdGlvbihlKXt2YXIgdD1udWxsLHI9XCJzdHJpbmdcIjt0cnl7aWYoIWUpdGhyb3cgbmV3IEVycm9yKFwiTm8gb3V0cHV0IHR5cGUgc3BlY2lmaWVkLlwiKTt2YXIgbj1cInN0cmluZ1wiPT09KHI9ZS50b0xvd2VyQ2FzZSgpKXx8XCJ0ZXh0XCI9PT1yO1wiYmluYXJ5c3RyaW5nXCIhPT1yJiZcInRleHRcIiE9PXJ8fChyPVwic3RyaW5nXCIpLHQ9dGhpcy5fZGVjb21wcmVzc1dvcmtlcigpO3ZhciBpPSF0aGlzLl9kYXRhQmluYXJ5O2kmJiFuJiYodD10LnBpcGUobmV3IGEuVXRmOEVuY29kZVdvcmtlcikpLCFpJiZuJiYodD10LnBpcGUobmV3IGEuVXRmOERlY29kZVdvcmtlcikpfWNhdGNoKGUpeyh0PW5ldyBoKFwiZXJyb3JcIikpLmVycm9yKGUpfXJldHVybiBuZXcgcyh0LHIsXCJcIil9LGFzeW5jOmZ1bmN0aW9uKGUsdCl7cmV0dXJuIHRoaXMuaW50ZXJuYWxTdHJlYW0oZSkuYWNjdW11bGF0ZSh0KX0sbm9kZVN0cmVhbTpmdW5jdGlvbihlLHQpe3JldHVybiB0aGlzLmludGVybmFsU3RyZWFtKGV8fFwibm9kZWJ1ZmZlclwiKS50b05vZGVqc1N0cmVhbSh0KX0sX2NvbXByZXNzV29ya2VyOmZ1bmN0aW9uKGUsdCl7aWYodGhpcy5fZGF0YSBpbnN0YW5jZW9mIG8mJnRoaXMuX2RhdGEuY29tcHJlc3Npb24ubWFnaWM9PT1lLm1hZ2ljKXJldHVybiB0aGlzLl9kYXRhLmdldENvbXByZXNzZWRXb3JrZXIoKTt2YXIgcj10aGlzLl9kZWNvbXByZXNzV29ya2VyKCk7cmV0dXJuIHRoaXMuX2RhdGFCaW5hcnl8fChyPXIucGlwZShuZXcgYS5VdGY4RW5jb2RlV29ya2VyKSksby5jcmVhdGVXb3JrZXJGcm9tKHIsZSx0KX0sX2RlY29tcHJlc3NXb3JrZXI6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5fZGF0YSBpbnN0YW5jZW9mIG8/dGhpcy5fZGF0YS5nZXRDb250ZW50V29ya2VyKCk6dGhpcy5fZGF0YSBpbnN0YW5jZW9mIGg/dGhpcy5fZGF0YTpuZXcgaSh0aGlzLl9kYXRhKX19O2Zvcih2YXIgdT1bXCJhc1RleHRcIixcImFzQmluYXJ5XCIsXCJhc05vZGVCdWZmZXJcIixcImFzVWludDhBcnJheVwiLFwiYXNBcnJheUJ1ZmZlclwiXSxsPWZ1bmN0aW9uKCl7dGhyb3cgbmV3IEVycm9yKFwiVGhpcyBtZXRob2QgaGFzIGJlZW4gcmVtb3ZlZCBpbiBKU1ppcCAzLjAsIHBsZWFzZSBjaGVjayB0aGUgdXBncmFkZSBndWlkZS5cIil9LGY9MDtmPHUubGVuZ3RoO2YrKyluLnByb3RvdHlwZVt1W2ZdXT1sO3QuZXhwb3J0cz1ufSx7XCIuL2NvbXByZXNzZWRPYmplY3RcIjoyLFwiLi9zdHJlYW0vRGF0YVdvcmtlclwiOjI3LFwiLi9zdHJlYW0vR2VuZXJpY1dvcmtlclwiOjI4LFwiLi9zdHJlYW0vU3RyZWFtSGVscGVyXCI6MjksXCIuL3V0ZjhcIjozMX1dLDM2OltmdW5jdGlvbihlLGwsdCl7KGZ1bmN0aW9uKHQpe1widXNlIHN0cmljdFwiO3ZhciByLG4sZT10Lk11dGF0aW9uT2JzZXJ2ZXJ8fHQuV2ViS2l0TXV0YXRpb25PYnNlcnZlcjtpZihlKXt2YXIgaT0wLHM9bmV3IGUodSksYT10LmRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiXCIpO3Mub2JzZXJ2ZShhLHtjaGFyYWN0ZXJEYXRhOiEwfSkscj1mdW5jdGlvbigpe2EuZGF0YT1pPSsraSUyfX1lbHNlIGlmKHQuc2V0SW1tZWRpYXRlfHx2b2lkIDA9PT10Lk1lc3NhZ2VDaGFubmVsKXI9XCJkb2N1bWVudFwiaW4gdCYmXCJvbnJlYWR5c3RhdGVjaGFuZ2VcImluIHQuZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKT9mdW5jdGlvbigpe3ZhciBlPXQuZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtlLm9ucmVhZHlzdGF0ZWNoYW5nZT1mdW5jdGlvbigpe3UoKSxlLm9ucmVhZHlzdGF0ZWNoYW5nZT1udWxsLGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlKSxlPW51bGx9LHQuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmFwcGVuZENoaWxkKGUpfTpmdW5jdGlvbigpe3NldFRpbWVvdXQodSwwKX07ZWxzZXt2YXIgbz1uZXcgdC5NZXNzYWdlQ2hhbm5lbDtvLnBvcnQxLm9ubWVzc2FnZT11LHI9ZnVuY3Rpb24oKXtvLnBvcnQyLnBvc3RNZXNzYWdlKDApfX12YXIgaD1bXTtmdW5jdGlvbiB1KCl7dmFyIGUsdDtuPSEwO2Zvcih2YXIgcj1oLmxlbmd0aDtyOyl7Zm9yKHQ9aCxoPVtdLGU9LTE7KytlPHI7KXRbZV0oKTtyPWgubGVuZ3RofW49ITF9bC5leHBvcnRzPWZ1bmN0aW9uKGUpezEhPT1oLnB1c2goZSl8fG58fHIoKX19KS5jYWxsKHRoaXMsXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGdsb2JhbD9nbG9iYWw6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGY/c2VsZjpcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P3dpbmRvdzp7fSl9LHt9XSwzNzpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3ZhciBpPWUoXCJpbW1lZGlhdGVcIik7ZnVuY3Rpb24gdSgpe312YXIgbD17fSxzPVtcIlJFSkVDVEVEXCJdLGE9W1wiRlVMRklMTEVEXCJdLG49W1wiUEVORElOR1wiXTtmdW5jdGlvbiBvKGUpe2lmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIGUpdGhyb3cgbmV3IFR5cGVFcnJvcihcInJlc29sdmVyIG11c3QgYmUgYSBmdW5jdGlvblwiKTt0aGlzLnN0YXRlPW4sdGhpcy5xdWV1ZT1bXSx0aGlzLm91dGNvbWU9dm9pZCAwLGUhPT11JiZkKHRoaXMsZSl9ZnVuY3Rpb24gaChlLHQscil7dGhpcy5wcm9taXNlPWUsXCJmdW5jdGlvblwiPT10eXBlb2YgdCYmKHRoaXMub25GdWxmaWxsZWQ9dCx0aGlzLmNhbGxGdWxmaWxsZWQ9dGhpcy5vdGhlckNhbGxGdWxmaWxsZWQpLFwiZnVuY3Rpb25cIj09dHlwZW9mIHImJih0aGlzLm9uUmVqZWN0ZWQ9cix0aGlzLmNhbGxSZWplY3RlZD10aGlzLm90aGVyQ2FsbFJlamVjdGVkKX1mdW5jdGlvbiBmKHQscixuKXtpKGZ1bmN0aW9uKCl7dmFyIGU7dHJ5e2U9cihuKX1jYXRjaChlKXtyZXR1cm4gbC5yZWplY3QodCxlKX1lPT09dD9sLnJlamVjdCh0LG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgcmVzb2x2ZSBwcm9taXNlIHdpdGggaXRzZWxmXCIpKTpsLnJlc29sdmUodCxlKX0pfWZ1bmN0aW9uIGMoZSl7dmFyIHQ9ZSYmZS50aGVuO2lmKGUmJihcIm9iamVjdFwiPT10eXBlb2YgZXx8XCJmdW5jdGlvblwiPT10eXBlb2YgZSkmJlwiZnVuY3Rpb25cIj09dHlwZW9mIHQpcmV0dXJuIGZ1bmN0aW9uKCl7dC5hcHBseShlLGFyZ3VtZW50cyl9fWZ1bmN0aW9uIGQodCxlKXt2YXIgcj0hMTtmdW5jdGlvbiBuKGUpe3J8fChyPSEwLGwucmVqZWN0KHQsZSkpfWZ1bmN0aW9uIGkoZSl7cnx8KHI9ITAsbC5yZXNvbHZlKHQsZSkpfXZhciBzPXAoZnVuY3Rpb24oKXtlKGksbil9KTtcImVycm9yXCI9PT1zLnN0YXR1cyYmbihzLnZhbHVlKX1mdW5jdGlvbiBwKGUsdCl7dmFyIHI9e307dHJ5e3IudmFsdWU9ZSh0KSxyLnN0YXR1cz1cInN1Y2Nlc3NcIn1jYXRjaChlKXtyLnN0YXR1cz1cImVycm9yXCIsci52YWx1ZT1lfXJldHVybiByfSh0LmV4cG9ydHM9bykucHJvdG90eXBlLmZpbmFsbHk9ZnVuY3Rpb24odCl7aWYoXCJmdW5jdGlvblwiIT10eXBlb2YgdClyZXR1cm4gdGhpczt2YXIgcj10aGlzLmNvbnN0cnVjdG9yO3JldHVybiB0aGlzLnRoZW4oZnVuY3Rpb24oZSl7cmV0dXJuIHIucmVzb2x2ZSh0KCkpLnRoZW4oZnVuY3Rpb24oKXtyZXR1cm4gZX0pfSxmdW5jdGlvbihlKXtyZXR1cm4gci5yZXNvbHZlKHQoKSkudGhlbihmdW5jdGlvbigpe3Rocm93IGV9KX0pfSxvLnByb3RvdHlwZS5jYXRjaD1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy50aGVuKG51bGwsZSl9LG8ucHJvdG90eXBlLnRoZW49ZnVuY3Rpb24oZSx0KXtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiBlJiZ0aGlzLnN0YXRlPT09YXx8XCJmdW5jdGlvblwiIT10eXBlb2YgdCYmdGhpcy5zdGF0ZT09PXMpcmV0dXJuIHRoaXM7dmFyIHI9bmV3IHRoaXMuY29uc3RydWN0b3IodSk7dGhpcy5zdGF0ZSE9PW4/ZihyLHRoaXMuc3RhdGU9PT1hP2U6dCx0aGlzLm91dGNvbWUpOnRoaXMucXVldWUucHVzaChuZXcgaChyLGUsdCkpO3JldHVybiByfSxoLnByb3RvdHlwZS5jYWxsRnVsZmlsbGVkPWZ1bmN0aW9uKGUpe2wucmVzb2x2ZSh0aGlzLnByb21pc2UsZSl9LGgucHJvdG90eXBlLm90aGVyQ2FsbEZ1bGZpbGxlZD1mdW5jdGlvbihlKXtmKHRoaXMucHJvbWlzZSx0aGlzLm9uRnVsZmlsbGVkLGUpfSxoLnByb3RvdHlwZS5jYWxsUmVqZWN0ZWQ9ZnVuY3Rpb24oZSl7bC5yZWplY3QodGhpcy5wcm9taXNlLGUpfSxoLnByb3RvdHlwZS5vdGhlckNhbGxSZWplY3RlZD1mdW5jdGlvbihlKXtmKHRoaXMucHJvbWlzZSx0aGlzLm9uUmVqZWN0ZWQsZSl9LGwucmVzb2x2ZT1mdW5jdGlvbihlLHQpe3ZhciByPXAoYyx0KTtpZihcImVycm9yXCI9PT1yLnN0YXR1cylyZXR1cm4gbC5yZWplY3QoZSxyLnZhbHVlKTt2YXIgbj1yLnZhbHVlO2lmKG4pZChlLG4pO2Vsc2V7ZS5zdGF0ZT1hLGUub3V0Y29tZT10O2Zvcih2YXIgaT0tMSxzPWUucXVldWUubGVuZ3RoOysraTxzOyllLnF1ZXVlW2ldLmNhbGxGdWxmaWxsZWQodCl9cmV0dXJuIGV9LGwucmVqZWN0PWZ1bmN0aW9uKGUsdCl7ZS5zdGF0ZT1zLGUub3V0Y29tZT10O2Zvcih2YXIgcj0tMSxuPWUucXVldWUubGVuZ3RoOysrcjxuOyllLnF1ZXVlW3JdLmNhbGxSZWplY3RlZCh0KTtyZXR1cm4gZX0sby5yZXNvbHZlPWZ1bmN0aW9uKGUpe2lmKGUgaW5zdGFuY2VvZiB0aGlzKXJldHVybiBlO3JldHVybiBsLnJlc29sdmUobmV3IHRoaXModSksZSl9LG8ucmVqZWN0PWZ1bmN0aW9uKGUpe3ZhciB0PW5ldyB0aGlzKHUpO3JldHVybiBsLnJlamVjdCh0LGUpfSxvLmFsbD1mdW5jdGlvbihlKXt2YXIgcj10aGlzO2lmKFwiW29iamVjdCBBcnJheV1cIiE9PU9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChlKSlyZXR1cm4gdGhpcy5yZWplY3QobmV3IFR5cGVFcnJvcihcIm11c3QgYmUgYW4gYXJyYXlcIikpO3ZhciBuPWUubGVuZ3RoLGk9ITE7aWYoIW4pcmV0dXJuIHRoaXMucmVzb2x2ZShbXSk7dmFyIHM9bmV3IEFycmF5KG4pLGE9MCx0PS0xLG89bmV3IHRoaXModSk7Zm9yKDsrK3Q8bjspaChlW3RdLHQpO3JldHVybiBvO2Z1bmN0aW9uIGgoZSx0KXtyLnJlc29sdmUoZSkudGhlbihmdW5jdGlvbihlKXtzW3RdPWUsKythIT09bnx8aXx8KGk9ITAsbC5yZXNvbHZlKG8scykpfSxmdW5jdGlvbihlKXtpfHwoaT0hMCxsLnJlamVjdChvLGUpKX0pfX0sby5yYWNlPWZ1bmN0aW9uKGUpe3ZhciB0PXRoaXM7aWYoXCJbb2JqZWN0IEFycmF5XVwiIT09T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGUpKXJldHVybiB0aGlzLnJlamVjdChuZXcgVHlwZUVycm9yKFwibXVzdCBiZSBhbiBhcnJheVwiKSk7dmFyIHI9ZS5sZW5ndGgsbj0hMTtpZighcilyZXR1cm4gdGhpcy5yZXNvbHZlKFtdKTt2YXIgaT0tMSxzPW5ldyB0aGlzKHUpO2Zvcig7KytpPHI7KWE9ZVtpXSx0LnJlc29sdmUoYSkudGhlbihmdW5jdGlvbihlKXtufHwobj0hMCxsLnJlc29sdmUocyxlKSl9LGZ1bmN0aW9uKGUpe258fChuPSEwLGwucmVqZWN0KHMsZSkpfSk7dmFyIGE7cmV0dXJuIHN9fSx7aW1tZWRpYXRlOjM2fV0sMzg6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt2YXIgbj17fTsoMCxlKFwiLi9saWIvdXRpbHMvY29tbW9uXCIpLmFzc2lnbikobixlKFwiLi9saWIvZGVmbGF0ZVwiKSxlKFwiLi9saWIvaW5mbGF0ZVwiKSxlKFwiLi9saWIvemxpYi9jb25zdGFudHNcIikpLHQuZXhwb3J0cz1ufSx7XCIuL2xpYi9kZWZsYXRlXCI6MzksXCIuL2xpYi9pbmZsYXRlXCI6NDAsXCIuL2xpYi91dGlscy9jb21tb25cIjo0MSxcIi4vbGliL3psaWIvY29uc3RhbnRzXCI6NDR9XSwzOTpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3ZhciBhPWUoXCIuL3psaWIvZGVmbGF0ZVwiKSxvPWUoXCIuL3V0aWxzL2NvbW1vblwiKSxoPWUoXCIuL3V0aWxzL3N0cmluZ3NcIiksaT1lKFwiLi96bGliL21lc3NhZ2VzXCIpLHM9ZShcIi4vemxpYi96c3RyZWFtXCIpLHU9T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZyxsPTAsZj0tMSxjPTAsZD04O2Z1bmN0aW9uIHAoZSl7aWYoISh0aGlzIGluc3RhbmNlb2YgcCkpcmV0dXJuIG5ldyBwKGUpO3RoaXMub3B0aW9ucz1vLmFzc2lnbih7bGV2ZWw6ZixtZXRob2Q6ZCxjaHVua1NpemU6MTYzODQsd2luZG93Qml0czoxNSxtZW1MZXZlbDo4LHN0cmF0ZWd5OmMsdG86XCJcIn0sZXx8e30pO3ZhciB0PXRoaXMub3B0aW9uczt0LnJhdyYmMDx0LndpbmRvd0JpdHM/dC53aW5kb3dCaXRzPS10LndpbmRvd0JpdHM6dC5nemlwJiYwPHQud2luZG93Qml0cyYmdC53aW5kb3dCaXRzPDE2JiYodC53aW5kb3dCaXRzKz0xNiksdGhpcy5lcnI9MCx0aGlzLm1zZz1cIlwiLHRoaXMuZW5kZWQ9ITEsdGhpcy5jaHVua3M9W10sdGhpcy5zdHJtPW5ldyBzLHRoaXMuc3RybS5hdmFpbF9vdXQ9MDt2YXIgcj1hLmRlZmxhdGVJbml0Mih0aGlzLnN0cm0sdC5sZXZlbCx0Lm1ldGhvZCx0LndpbmRvd0JpdHMsdC5tZW1MZXZlbCx0LnN0cmF0ZWd5KTtpZihyIT09bCl0aHJvdyBuZXcgRXJyb3IoaVtyXSk7aWYodC5oZWFkZXImJmEuZGVmbGF0ZVNldEhlYWRlcih0aGlzLnN0cm0sdC5oZWFkZXIpLHQuZGljdGlvbmFyeSl7dmFyIG47aWYobj1cInN0cmluZ1wiPT10eXBlb2YgdC5kaWN0aW9uYXJ5P2guc3RyaW5nMmJ1Zih0LmRpY3Rpb25hcnkpOlwiW29iamVjdCBBcnJheUJ1ZmZlcl1cIj09PXUuY2FsbCh0LmRpY3Rpb25hcnkpP25ldyBVaW50OEFycmF5KHQuZGljdGlvbmFyeSk6dC5kaWN0aW9uYXJ5LChyPWEuZGVmbGF0ZVNldERpY3Rpb25hcnkodGhpcy5zdHJtLG4pKSE9PWwpdGhyb3cgbmV3IEVycm9yKGlbcl0pO3RoaXMuX2RpY3Rfc2V0PSEwfX1mdW5jdGlvbiBuKGUsdCl7dmFyIHI9bmV3IHAodCk7aWYoci5wdXNoKGUsITApLHIuZXJyKXRocm93IHIubXNnfHxpW3IuZXJyXTtyZXR1cm4gci5yZXN1bHR9cC5wcm90b3R5cGUucHVzaD1mdW5jdGlvbihlLHQpe3ZhciByLG4saT10aGlzLnN0cm0scz10aGlzLm9wdGlvbnMuY2h1bmtTaXplO2lmKHRoaXMuZW5kZWQpcmV0dXJuITE7bj10PT09fn50P3Q6ITA9PT10PzQ6MCxcInN0cmluZ1wiPT10eXBlb2YgZT9pLmlucHV0PWguc3RyaW5nMmJ1ZihlKTpcIltvYmplY3QgQXJyYXlCdWZmZXJdXCI9PT11LmNhbGwoZSk/aS5pbnB1dD1uZXcgVWludDhBcnJheShlKTppLmlucHV0PWUsaS5uZXh0X2luPTAsaS5hdmFpbF9pbj1pLmlucHV0Lmxlbmd0aDtkb3tpZigwPT09aS5hdmFpbF9vdXQmJihpLm91dHB1dD1uZXcgby5CdWY4KHMpLGkubmV4dF9vdXQ9MCxpLmF2YWlsX291dD1zKSwxIT09KHI9YS5kZWZsYXRlKGksbikpJiZyIT09bClyZXR1cm4gdGhpcy5vbkVuZChyKSwhKHRoaXMuZW5kZWQ9ITApOzAhPT1pLmF2YWlsX291dCYmKDAhPT1pLmF2YWlsX2lufHw0IT09biYmMiE9PW4pfHwoXCJzdHJpbmdcIj09PXRoaXMub3B0aW9ucy50bz90aGlzLm9uRGF0YShoLmJ1ZjJiaW5zdHJpbmcoby5zaHJpbmtCdWYoaS5vdXRwdXQsaS5uZXh0X291dCkpKTp0aGlzLm9uRGF0YShvLnNocmlua0J1ZihpLm91dHB1dCxpLm5leHRfb3V0KSkpfXdoaWxlKCgwPGkuYXZhaWxfaW58fDA9PT1pLmF2YWlsX291dCkmJjEhPT1yKTtyZXR1cm4gND09PW4/KHI9YS5kZWZsYXRlRW5kKHRoaXMuc3RybSksdGhpcy5vbkVuZChyKSx0aGlzLmVuZGVkPSEwLHI9PT1sKToyIT09bnx8KHRoaXMub25FbmQobCksIShpLmF2YWlsX291dD0wKSl9LHAucHJvdG90eXBlLm9uRGF0YT1mdW5jdGlvbihlKXt0aGlzLmNodW5rcy5wdXNoKGUpfSxwLnByb3RvdHlwZS5vbkVuZD1mdW5jdGlvbihlKXtlPT09bCYmKFwic3RyaW5nXCI9PT10aGlzLm9wdGlvbnMudG8/dGhpcy5yZXN1bHQ9dGhpcy5jaHVua3Muam9pbihcIlwiKTp0aGlzLnJlc3VsdD1vLmZsYXR0ZW5DaHVua3ModGhpcy5jaHVua3MpKSx0aGlzLmNodW5rcz1bXSx0aGlzLmVycj1lLHRoaXMubXNnPXRoaXMuc3RybS5tc2d9LHIuRGVmbGF0ZT1wLHIuZGVmbGF0ZT1uLHIuZGVmbGF0ZVJhdz1mdW5jdGlvbihlLHQpe3JldHVybih0PXR8fHt9KS5yYXc9ITAsbihlLHQpfSxyLmd6aXA9ZnVuY3Rpb24oZSx0KXtyZXR1cm4odD10fHx7fSkuZ3ppcD0hMCxuKGUsdCl9fSx7XCIuL3V0aWxzL2NvbW1vblwiOjQxLFwiLi91dGlscy9zdHJpbmdzXCI6NDIsXCIuL3psaWIvZGVmbGF0ZVwiOjQ2LFwiLi96bGliL21lc3NhZ2VzXCI6NTEsXCIuL3psaWIvenN0cmVhbVwiOjUzfV0sNDA6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt2YXIgYz1lKFwiLi96bGliL2luZmxhdGVcIiksZD1lKFwiLi91dGlscy9jb21tb25cIikscD1lKFwiLi91dGlscy9zdHJpbmdzXCIpLG09ZShcIi4vemxpYi9jb25zdGFudHNcIiksbj1lKFwiLi96bGliL21lc3NhZ2VzXCIpLGk9ZShcIi4vemxpYi96c3RyZWFtXCIpLHM9ZShcIi4vemxpYi9nemhlYWRlclwiKSxfPU9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7ZnVuY3Rpb24gYShlKXtpZighKHRoaXMgaW5zdGFuY2VvZiBhKSlyZXR1cm4gbmV3IGEoZSk7dGhpcy5vcHRpb25zPWQuYXNzaWduKHtjaHVua1NpemU6MTYzODQsd2luZG93Qml0czowLHRvOlwiXCJ9LGV8fHt9KTt2YXIgdD10aGlzLm9wdGlvbnM7dC5yYXcmJjA8PXQud2luZG93Qml0cyYmdC53aW5kb3dCaXRzPDE2JiYodC53aW5kb3dCaXRzPS10LndpbmRvd0JpdHMsMD09PXQud2luZG93Qml0cyYmKHQud2luZG93Qml0cz0tMTUpKSwhKDA8PXQud2luZG93Qml0cyYmdC53aW5kb3dCaXRzPDE2KXx8ZSYmZS53aW5kb3dCaXRzfHwodC53aW5kb3dCaXRzKz0zMiksMTU8dC53aW5kb3dCaXRzJiZ0LndpbmRvd0JpdHM8NDgmJjA9PSgxNSZ0LndpbmRvd0JpdHMpJiYodC53aW5kb3dCaXRzfD0xNSksdGhpcy5lcnI9MCx0aGlzLm1zZz1cIlwiLHRoaXMuZW5kZWQ9ITEsdGhpcy5jaHVua3M9W10sdGhpcy5zdHJtPW5ldyBpLHRoaXMuc3RybS5hdmFpbF9vdXQ9MDt2YXIgcj1jLmluZmxhdGVJbml0Mih0aGlzLnN0cm0sdC53aW5kb3dCaXRzKTtpZihyIT09bS5aX09LKXRocm93IG5ldyBFcnJvcihuW3JdKTt0aGlzLmhlYWRlcj1uZXcgcyxjLmluZmxhdGVHZXRIZWFkZXIodGhpcy5zdHJtLHRoaXMuaGVhZGVyKX1mdW5jdGlvbiBvKGUsdCl7dmFyIHI9bmV3IGEodCk7aWYoci5wdXNoKGUsITApLHIuZXJyKXRocm93IHIubXNnfHxuW3IuZXJyXTtyZXR1cm4gci5yZXN1bHR9YS5wcm90b3R5cGUucHVzaD1mdW5jdGlvbihlLHQpe3ZhciByLG4saSxzLGEsbyxoPXRoaXMuc3RybSx1PXRoaXMub3B0aW9ucy5jaHVua1NpemUsbD10aGlzLm9wdGlvbnMuZGljdGlvbmFyeSxmPSExO2lmKHRoaXMuZW5kZWQpcmV0dXJuITE7bj10PT09fn50P3Q6ITA9PT10P20uWl9GSU5JU0g6bS5aX05PX0ZMVVNILFwic3RyaW5nXCI9PXR5cGVvZiBlP2guaW5wdXQ9cC5iaW5zdHJpbmcyYnVmKGUpOlwiW29iamVjdCBBcnJheUJ1ZmZlcl1cIj09PV8uY2FsbChlKT9oLmlucHV0PW5ldyBVaW50OEFycmF5KGUpOmguaW5wdXQ9ZSxoLm5leHRfaW49MCxoLmF2YWlsX2luPWguaW5wdXQubGVuZ3RoO2Rve2lmKDA9PT1oLmF2YWlsX291dCYmKGgub3V0cHV0PW5ldyBkLkJ1ZjgodSksaC5uZXh0X291dD0wLGguYXZhaWxfb3V0PXUpLChyPWMuaW5mbGF0ZShoLG0uWl9OT19GTFVTSCkpPT09bS5aX05FRURfRElDVCYmbCYmKG89XCJzdHJpbmdcIj09dHlwZW9mIGw/cC5zdHJpbmcyYnVmKGwpOlwiW29iamVjdCBBcnJheUJ1ZmZlcl1cIj09PV8uY2FsbChsKT9uZXcgVWludDhBcnJheShsKTpsLHI9Yy5pbmZsYXRlU2V0RGljdGlvbmFyeSh0aGlzLnN0cm0sbykpLHI9PT1tLlpfQlVGX0VSUk9SJiYhMD09PWYmJihyPW0uWl9PSyxmPSExKSxyIT09bS5aX1NUUkVBTV9FTkQmJnIhPT1tLlpfT0spcmV0dXJuIHRoaXMub25FbmQociksISh0aGlzLmVuZGVkPSEwKTtoLm5leHRfb3V0JiYoMCE9PWguYXZhaWxfb3V0JiZyIT09bS5aX1NUUkVBTV9FTkQmJigwIT09aC5hdmFpbF9pbnx8biE9PW0uWl9GSU5JU0gmJm4hPT1tLlpfU1lOQ19GTFVTSCl8fChcInN0cmluZ1wiPT09dGhpcy5vcHRpb25zLnRvPyhpPXAudXRmOGJvcmRlcihoLm91dHB1dCxoLm5leHRfb3V0KSxzPWgubmV4dF9vdXQtaSxhPXAuYnVmMnN0cmluZyhoLm91dHB1dCxpKSxoLm5leHRfb3V0PXMsaC5hdmFpbF9vdXQ9dS1zLHMmJmQuYXJyYXlTZXQoaC5vdXRwdXQsaC5vdXRwdXQsaSxzLDApLHRoaXMub25EYXRhKGEpKTp0aGlzLm9uRGF0YShkLnNocmlua0J1ZihoLm91dHB1dCxoLm5leHRfb3V0KSkpKSwwPT09aC5hdmFpbF9pbiYmMD09PWguYXZhaWxfb3V0JiYoZj0hMCl9d2hpbGUoKDA8aC5hdmFpbF9pbnx8MD09PWguYXZhaWxfb3V0KSYmciE9PW0uWl9TVFJFQU1fRU5EKTtyZXR1cm4gcj09PW0uWl9TVFJFQU1fRU5EJiYobj1tLlpfRklOSVNIKSxuPT09bS5aX0ZJTklTSD8ocj1jLmluZmxhdGVFbmQodGhpcy5zdHJtKSx0aGlzLm9uRW5kKHIpLHRoaXMuZW5kZWQ9ITAscj09PW0uWl9PSyk6biE9PW0uWl9TWU5DX0ZMVVNIfHwodGhpcy5vbkVuZChtLlpfT0spLCEoaC5hdmFpbF9vdXQ9MCkpfSxhLnByb3RvdHlwZS5vbkRhdGE9ZnVuY3Rpb24oZSl7dGhpcy5jaHVua3MucHVzaChlKX0sYS5wcm90b3R5cGUub25FbmQ9ZnVuY3Rpb24oZSl7ZT09PW0uWl9PSyYmKFwic3RyaW5nXCI9PT10aGlzLm9wdGlvbnMudG8/dGhpcy5yZXN1bHQ9dGhpcy5jaHVua3Muam9pbihcIlwiKTp0aGlzLnJlc3VsdD1kLmZsYXR0ZW5DaHVua3ModGhpcy5jaHVua3MpKSx0aGlzLmNodW5rcz1bXSx0aGlzLmVycj1lLHRoaXMubXNnPXRoaXMuc3RybS5tc2d9LHIuSW5mbGF0ZT1hLHIuaW5mbGF0ZT1vLHIuaW5mbGF0ZVJhdz1mdW5jdGlvbihlLHQpe3JldHVybih0PXR8fHt9KS5yYXc9ITAsbyhlLHQpfSxyLnVuZ3ppcD1vfSx7XCIuL3V0aWxzL2NvbW1vblwiOjQxLFwiLi91dGlscy9zdHJpbmdzXCI6NDIsXCIuL3psaWIvY29uc3RhbnRzXCI6NDQsXCIuL3psaWIvZ3poZWFkZXJcIjo0NyxcIi4vemxpYi9pbmZsYXRlXCI6NDksXCIuL3psaWIvbWVzc2FnZXNcIjo1MSxcIi4vemxpYi96c3RyZWFtXCI6NTN9XSw0MTpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3ZhciBuPVwidW5kZWZpbmVkXCIhPXR5cGVvZiBVaW50OEFycmF5JiZcInVuZGVmaW5lZFwiIT10eXBlb2YgVWludDE2QXJyYXkmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBJbnQzMkFycmF5O3IuYXNzaWduPWZ1bmN0aW9uKGUpe2Zvcih2YXIgdD1BcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsMSk7dC5sZW5ndGg7KXt2YXIgcj10LnNoaWZ0KCk7aWYocil7aWYoXCJvYmplY3RcIiE9dHlwZW9mIHIpdGhyb3cgbmV3IFR5cGVFcnJvcihyK1wibXVzdCBiZSBub24tb2JqZWN0XCIpO2Zvcih2YXIgbiBpbiByKXIuaGFzT3duUHJvcGVydHkobikmJihlW25dPXJbbl0pfX1yZXR1cm4gZX0sci5zaHJpbmtCdWY9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gZS5sZW5ndGg9PT10P2U6ZS5zdWJhcnJheT9lLnN1YmFycmF5KDAsdCk6KGUubGVuZ3RoPXQsZSl9O3ZhciBpPXthcnJheVNldDpmdW5jdGlvbihlLHQscixuLGkpe2lmKHQuc3ViYXJyYXkmJmUuc3ViYXJyYXkpZS5zZXQodC5zdWJhcnJheShyLHIrbiksaSk7ZWxzZSBmb3IodmFyIHM9MDtzPG47cysrKWVbaStzXT10W3Irc119LGZsYXR0ZW5DaHVua3M6ZnVuY3Rpb24oZSl7dmFyIHQscixuLGkscyxhO2Zvcih0PW49MCxyPWUubGVuZ3RoO3Q8cjt0Kyspbis9ZVt0XS5sZW5ndGg7Zm9yKGE9bmV3IFVpbnQ4QXJyYXkobiksdD1pPTAscj1lLmxlbmd0aDt0PHI7dCsrKXM9ZVt0XSxhLnNldChzLGkpLGkrPXMubGVuZ3RoO3JldHVybiBhfX0scz17YXJyYXlTZXQ6ZnVuY3Rpb24oZSx0LHIsbixpKXtmb3IodmFyIHM9MDtzPG47cysrKWVbaStzXT10W3Irc119LGZsYXR0ZW5DaHVua3M6ZnVuY3Rpb24oZSl7cmV0dXJuW10uY29uY2F0LmFwcGx5KFtdLGUpfX07ci5zZXRUeXBlZD1mdW5jdGlvbihlKXtlPyhyLkJ1Zjg9VWludDhBcnJheSxyLkJ1ZjE2PVVpbnQxNkFycmF5LHIuQnVmMzI9SW50MzJBcnJheSxyLmFzc2lnbihyLGkpKTooci5CdWY4PUFycmF5LHIuQnVmMTY9QXJyYXksci5CdWYzMj1BcnJheSxyLmFzc2lnbihyLHMpKX0sci5zZXRUeXBlZChuKX0se31dLDQyOltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7dmFyIGg9ZShcIi4vY29tbW9uXCIpLGk9ITAscz0hMDt0cnl7U3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLFswXSl9Y2F0Y2goZSl7aT0hMX10cnl7U3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLG5ldyBVaW50OEFycmF5KDEpKX1jYXRjaChlKXtzPSExfWZvcih2YXIgdT1uZXcgaC5CdWY4KDI1Niksbj0wO248MjU2O24rKyl1W25dPTI1Mjw9bj82OjI0ODw9bj81OjI0MDw9bj80OjIyNDw9bj8zOjE5Mjw9bj8yOjE7ZnVuY3Rpb24gbChlLHQpe2lmKHQ8NjU1MzcmJihlLnN1YmFycmF5JiZzfHwhZS5zdWJhcnJheSYmaSkpcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCxoLnNocmlua0J1ZihlLHQpKTtmb3IodmFyIHI9XCJcIixuPTA7bjx0O24rKylyKz1TdHJpbmcuZnJvbUNoYXJDb2RlKGVbbl0pO3JldHVybiByfXVbMjU0XT11WzI1NF09MSxyLnN0cmluZzJidWY9ZnVuY3Rpb24oZSl7dmFyIHQscixuLGkscyxhPWUubGVuZ3RoLG89MDtmb3IoaT0wO2k8YTtpKyspNTUyOTY9PSg2NDUxMiYocj1lLmNoYXJDb2RlQXQoaSkpKSYmaSsxPGEmJjU2MzIwPT0oNjQ1MTImKG49ZS5jaGFyQ29kZUF0KGkrMSkpKSYmKHI9NjU1MzYrKHItNTUyOTY8PDEwKSsobi01NjMyMCksaSsrKSxvKz1yPDEyOD8xOnI8MjA0OD8yOnI8NjU1MzY/Mzo0O2Zvcih0PW5ldyBoLkJ1ZjgobyksaT1zPTA7czxvO2krKyk1NTI5Nj09KDY0NTEyJihyPWUuY2hhckNvZGVBdChpKSkpJiZpKzE8YSYmNTYzMjA9PSg2NDUxMiYobj1lLmNoYXJDb2RlQXQoaSsxKSkpJiYocj02NTUzNisoci01NTI5Njw8MTApKyhuLTU2MzIwKSxpKyspLHI8MTI4P3RbcysrXT1yOihyPDIwNDg/dFtzKytdPTE5MnxyPj4+Njoocjw2NTUzNj90W3MrK109MjI0fHI+Pj4xMjoodFtzKytdPTI0MHxyPj4+MTgsdFtzKytdPTEyOHxyPj4+MTImNjMpLHRbcysrXT0xMjh8cj4+PjYmNjMpLHRbcysrXT0xMjh8NjMmcik7cmV0dXJuIHR9LHIuYnVmMmJpbnN0cmluZz1mdW5jdGlvbihlKXtyZXR1cm4gbChlLGUubGVuZ3RoKX0sci5iaW5zdHJpbmcyYnVmPWZ1bmN0aW9uKGUpe2Zvcih2YXIgdD1uZXcgaC5CdWY4KGUubGVuZ3RoKSxyPTAsbj10Lmxlbmd0aDtyPG47cisrKXRbcl09ZS5jaGFyQ29kZUF0KHIpO3JldHVybiB0fSxyLmJ1ZjJzdHJpbmc9ZnVuY3Rpb24oZSx0KXt2YXIgcixuLGkscyxhPXR8fGUubGVuZ3RoLG89bmV3IEFycmF5KDIqYSk7Zm9yKHI9bj0wO3I8YTspaWYoKGk9ZVtyKytdKTwxMjgpb1tuKytdPWk7ZWxzZSBpZig0PChzPXVbaV0pKW9bbisrXT02NTUzMyxyKz1zLTE7ZWxzZXtmb3IoaSY9Mj09PXM/MzE6Mz09PXM/MTU6NzsxPHMmJnI8YTspaT1pPDw2fDYzJmVbcisrXSxzLS07MTxzP29bbisrXT02NTUzMzppPDY1NTM2P29bbisrXT1pOihpLT02NTUzNixvW24rK109NTUyOTZ8aT4+MTAmMTAyMyxvW24rK109NTYzMjB8MTAyMyZpKX1yZXR1cm4gbChvLG4pfSxyLnV0Zjhib3JkZXI9ZnVuY3Rpb24oZSx0KXt2YXIgcjtmb3IoKHQ9dHx8ZS5sZW5ndGgpPmUubGVuZ3RoJiYodD1lLmxlbmd0aCkscj10LTE7MDw9ciYmMTI4PT0oMTkyJmVbcl0pOylyLS07cmV0dXJuIHI8MD90OjA9PT1yP3Q6cit1W2Vbcl1dPnQ/cjp0fX0se1wiLi9jb21tb25cIjo0MX1dLDQzOltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7dC5leHBvcnRzPWZ1bmN0aW9uKGUsdCxyLG4pe2Zvcih2YXIgaT02NTUzNSZlfDAscz1lPj4+MTYmNjU1MzV8MCxhPTA7MCE9PXI7KXtmb3Ioci09YT0yZTM8cj8yZTM6cjtzPXMrKGk9aSt0W24rK118MCl8MCwtLWE7KTtpJT02NTUyMSxzJT02NTUyMX1yZXR1cm4gaXxzPDwxNnwwfX0se31dLDQ0OltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7dC5leHBvcnRzPXtaX05PX0ZMVVNIOjAsWl9QQVJUSUFMX0ZMVVNIOjEsWl9TWU5DX0ZMVVNIOjIsWl9GVUxMX0ZMVVNIOjMsWl9GSU5JU0g6NCxaX0JMT0NLOjUsWl9UUkVFUzo2LFpfT0s6MCxaX1NUUkVBTV9FTkQ6MSxaX05FRURfRElDVDoyLFpfRVJSTk86LTEsWl9TVFJFQU1fRVJST1I6LTIsWl9EQVRBX0VSUk9SOi0zLFpfQlVGX0VSUk9SOi01LFpfTk9fQ09NUFJFU1NJT046MCxaX0JFU1RfU1BFRUQ6MSxaX0JFU1RfQ09NUFJFU1NJT046OSxaX0RFRkFVTFRfQ09NUFJFU1NJT046LTEsWl9GSUxURVJFRDoxLFpfSFVGRk1BTl9PTkxZOjIsWl9STEU6MyxaX0ZJWEVEOjQsWl9ERUZBVUxUX1NUUkFURUdZOjAsWl9CSU5BUlk6MCxaX1RFWFQ6MSxaX1VOS05PV046MixaX0RFRkxBVEVEOjh9fSx7fV0sNDU6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt2YXIgbz1mdW5jdGlvbigpe2Zvcih2YXIgZSx0PVtdLHI9MDtyPDI1NjtyKyspe2U9cjtmb3IodmFyIG49MDtuPDg7bisrKWU9MSZlPzM5ODgyOTIzODReZT4+PjE6ZT4+PjE7dFtyXT1lfXJldHVybiB0fSgpO3QuZXhwb3J0cz1mdW5jdGlvbihlLHQscixuKXt2YXIgaT1vLHM9bityO2VePS0xO2Zvcih2YXIgYT1uO2E8czthKyspZT1lPj4+OF5pWzI1NSYoZV50W2FdKV07cmV0dXJuLTFeZX19LHt9XSw0NjpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3ZhciBoLGM9ZShcIi4uL3V0aWxzL2NvbW1vblwiKSx1PWUoXCIuL3RyZWVzXCIpLGQ9ZShcIi4vYWRsZXIzMlwiKSxwPWUoXCIuL2NyYzMyXCIpLG49ZShcIi4vbWVzc2FnZXNcIiksbD0wLGY9NCxtPTAsXz0tMixnPS0xLGI9NCxpPTIsdj04LHk9OSxzPTI4NixhPTMwLG89MTksdz0yKnMrMSxrPTE1LHg9MyxTPTI1OCx6PVMreCsxLEM9NDIsRT0xMTMsQT0xLEk9MixPPTMsQj00O2Z1bmN0aW9uIFIoZSx0KXtyZXR1cm4gZS5tc2c9blt0XSx0fWZ1bmN0aW9uIFQoZSl7cmV0dXJuKGU8PDEpLSg0PGU/OTowKX1mdW5jdGlvbiBEKGUpe2Zvcih2YXIgdD1lLmxlbmd0aDswPD0tLXQ7KWVbdF09MH1mdW5jdGlvbiBGKGUpe3ZhciB0PWUuc3RhdGUscj10LnBlbmRpbmc7cj5lLmF2YWlsX291dCYmKHI9ZS5hdmFpbF9vdXQpLDAhPT1yJiYoYy5hcnJheVNldChlLm91dHB1dCx0LnBlbmRpbmdfYnVmLHQucGVuZGluZ19vdXQscixlLm5leHRfb3V0KSxlLm5leHRfb3V0Kz1yLHQucGVuZGluZ19vdXQrPXIsZS50b3RhbF9vdXQrPXIsZS5hdmFpbF9vdXQtPXIsdC5wZW5kaW5nLT1yLDA9PT10LnBlbmRpbmcmJih0LnBlbmRpbmdfb3V0PTApKX1mdW5jdGlvbiBOKGUsdCl7dS5fdHJfZmx1c2hfYmxvY2soZSwwPD1lLmJsb2NrX3N0YXJ0P2UuYmxvY2tfc3RhcnQ6LTEsZS5zdHJzdGFydC1lLmJsb2NrX3N0YXJ0LHQpLGUuYmxvY2tfc3RhcnQ9ZS5zdHJzdGFydCxGKGUuc3RybSl9ZnVuY3Rpb24gVShlLHQpe2UucGVuZGluZ19idWZbZS5wZW5kaW5nKytdPXR9ZnVuY3Rpb24gUChlLHQpe2UucGVuZGluZ19idWZbZS5wZW5kaW5nKytdPXQ+Pj44JjI1NSxlLnBlbmRpbmdfYnVmW2UucGVuZGluZysrXT0yNTUmdH1mdW5jdGlvbiBMKGUsdCl7dmFyIHIsbixpPWUubWF4X2NoYWluX2xlbmd0aCxzPWUuc3Ryc3RhcnQsYT1lLnByZXZfbGVuZ3RoLG89ZS5uaWNlX21hdGNoLGg9ZS5zdHJzdGFydD5lLndfc2l6ZS16P2Uuc3Ryc3RhcnQtKGUud19zaXplLXopOjAsdT1lLndpbmRvdyxsPWUud19tYXNrLGY9ZS5wcmV2LGM9ZS5zdHJzdGFydCtTLGQ9dVtzK2EtMV0scD11W3MrYV07ZS5wcmV2X2xlbmd0aD49ZS5nb29kX21hdGNoJiYoaT4+PTIpLG8+ZS5sb29rYWhlYWQmJihvPWUubG9va2FoZWFkKTtkb3tpZih1WyhyPXQpK2FdPT09cCYmdVtyK2EtMV09PT1kJiZ1W3JdPT09dVtzXSYmdVsrK3JdPT09dVtzKzFdKXtzKz0yLHIrKztkb3t9d2hpbGUodVsrK3NdPT09dVsrK3JdJiZ1Wysrc109PT11Wysrcl0mJnVbKytzXT09PXVbKytyXSYmdVsrK3NdPT09dVsrK3JdJiZ1Wysrc109PT11Wysrcl0mJnVbKytzXT09PXVbKytyXSYmdVsrK3NdPT09dVsrK3JdJiZ1Wysrc109PT11Wysrcl0mJnM8Yyk7aWYobj1TLShjLXMpLHM9Yy1TLGE8bil7aWYoZS5tYXRjaF9zdGFydD10LG88PShhPW4pKWJyZWFrO2Q9dVtzK2EtMV0scD11W3MrYV19fX13aGlsZSgodD1mW3QmbF0pPmgmJjAhPS0taSk7cmV0dXJuIGE8PWUubG9va2FoZWFkP2E6ZS5sb29rYWhlYWR9ZnVuY3Rpb24gaihlKXt2YXIgdCxyLG4saSxzLGEsbyxoLHUsbCxmPWUud19zaXplO2Rve2lmKGk9ZS53aW5kb3dfc2l6ZS1lLmxvb2thaGVhZC1lLnN0cnN0YXJ0LGUuc3Ryc3RhcnQ+PWYrKGYteikpe2ZvcihjLmFycmF5U2V0KGUud2luZG93LGUud2luZG93LGYsZiwwKSxlLm1hdGNoX3N0YXJ0LT1mLGUuc3Ryc3RhcnQtPWYsZS5ibG9ja19zdGFydC09Zix0PXI9ZS5oYXNoX3NpemU7bj1lLmhlYWRbLS10XSxlLmhlYWRbdF09Zjw9bj9uLWY6MCwtLXI7KTtmb3IodD1yPWY7bj1lLnByZXZbLS10XSxlLnByZXZbdF09Zjw9bj9uLWY6MCwtLXI7KTtpKz1mfWlmKDA9PT1lLnN0cm0uYXZhaWxfaW4pYnJlYWs7aWYoYT1lLnN0cm0sbz1lLndpbmRvdyxoPWUuc3Ryc3RhcnQrZS5sb29rYWhlYWQsdT1pLGw9dm9pZCAwLGw9YS5hdmFpbF9pbix1PGwmJihsPXUpLHI9MD09PWw/MDooYS5hdmFpbF9pbi09bCxjLmFycmF5U2V0KG8sYS5pbnB1dCxhLm5leHRfaW4sbCxoKSwxPT09YS5zdGF0ZS53cmFwP2EuYWRsZXI9ZChhLmFkbGVyLG8sbCxoKToyPT09YS5zdGF0ZS53cmFwJiYoYS5hZGxlcj1wKGEuYWRsZXIsbyxsLGgpKSxhLm5leHRfaW4rPWwsYS50b3RhbF9pbis9bCxsKSxlLmxvb2thaGVhZCs9cixlLmxvb2thaGVhZCtlLmluc2VydD49eClmb3Iocz1lLnN0cnN0YXJ0LWUuaW5zZXJ0LGUuaW5zX2g9ZS53aW5kb3dbc10sZS5pbnNfaD0oZS5pbnNfaDw8ZS5oYXNoX3NoaWZ0XmUud2luZG93W3MrMV0pJmUuaGFzaF9tYXNrO2UuaW5zZXJ0JiYoZS5pbnNfaD0oZS5pbnNfaDw8ZS5oYXNoX3NoaWZ0XmUud2luZG93W3MreC0xXSkmZS5oYXNoX21hc2ssZS5wcmV2W3MmZS53X21hc2tdPWUuaGVhZFtlLmluc19oXSxlLmhlYWRbZS5pbnNfaF09cyxzKyssZS5pbnNlcnQtLSwhKGUubG9va2FoZWFkK2UuaW5zZXJ0PHgpKTspO313aGlsZShlLmxvb2thaGVhZDx6JiYwIT09ZS5zdHJtLmF2YWlsX2luKX1mdW5jdGlvbiBaKGUsdCl7Zm9yKHZhciByLG47Oyl7aWYoZS5sb29rYWhlYWQ8eil7aWYoaihlKSxlLmxvb2thaGVhZDx6JiZ0PT09bClyZXR1cm4gQTtpZigwPT09ZS5sb29rYWhlYWQpYnJlYWt9aWYocj0wLGUubG9va2FoZWFkPj14JiYoZS5pbnNfaD0oZS5pbnNfaDw8ZS5oYXNoX3NoaWZ0XmUud2luZG93W2Uuc3Ryc3RhcnQreC0xXSkmZS5oYXNoX21hc2sscj1lLnByZXZbZS5zdHJzdGFydCZlLndfbWFza109ZS5oZWFkW2UuaW5zX2hdLGUuaGVhZFtlLmluc19oXT1lLnN0cnN0YXJ0KSwwIT09ciYmZS5zdHJzdGFydC1yPD1lLndfc2l6ZS16JiYoZS5tYXRjaF9sZW5ndGg9TChlLHIpKSxlLm1hdGNoX2xlbmd0aD49eClpZihuPXUuX3RyX3RhbGx5KGUsZS5zdHJzdGFydC1lLm1hdGNoX3N0YXJ0LGUubWF0Y2hfbGVuZ3RoLXgpLGUubG9va2FoZWFkLT1lLm1hdGNoX2xlbmd0aCxlLm1hdGNoX2xlbmd0aDw9ZS5tYXhfbGF6eV9tYXRjaCYmZS5sb29rYWhlYWQ+PXgpe2ZvcihlLm1hdGNoX2xlbmd0aC0tO2Uuc3Ryc3RhcnQrKyxlLmluc19oPShlLmluc19oPDxlLmhhc2hfc2hpZnReZS53aW5kb3dbZS5zdHJzdGFydCt4LTFdKSZlLmhhc2hfbWFzayxyPWUucHJldltlLnN0cnN0YXJ0JmUud19tYXNrXT1lLmhlYWRbZS5pbnNfaF0sZS5oZWFkW2UuaW5zX2hdPWUuc3Ryc3RhcnQsMCE9LS1lLm1hdGNoX2xlbmd0aDspO2Uuc3Ryc3RhcnQrK31lbHNlIGUuc3Ryc3RhcnQrPWUubWF0Y2hfbGVuZ3RoLGUubWF0Y2hfbGVuZ3RoPTAsZS5pbnNfaD1lLndpbmRvd1tlLnN0cnN0YXJ0XSxlLmluc19oPShlLmluc19oPDxlLmhhc2hfc2hpZnReZS53aW5kb3dbZS5zdHJzdGFydCsxXSkmZS5oYXNoX21hc2s7ZWxzZSBuPXUuX3RyX3RhbGx5KGUsMCxlLndpbmRvd1tlLnN0cnN0YXJ0XSksZS5sb29rYWhlYWQtLSxlLnN0cnN0YXJ0Kys7aWYobiYmKE4oZSwhMSksMD09PWUuc3RybS5hdmFpbF9vdXQpKXJldHVybiBBfXJldHVybiBlLmluc2VydD1lLnN0cnN0YXJ0PHgtMT9lLnN0cnN0YXJ0OngtMSx0PT09Zj8oTihlLCEwKSwwPT09ZS5zdHJtLmF2YWlsX291dD9POkIpOmUubGFzdF9saXQmJihOKGUsITEpLDA9PT1lLnN0cm0uYXZhaWxfb3V0KT9BOkl9ZnVuY3Rpb24gVyhlLHQpe2Zvcih2YXIgcixuLGk7Oyl7aWYoZS5sb29rYWhlYWQ8eil7aWYoaihlKSxlLmxvb2thaGVhZDx6JiZ0PT09bClyZXR1cm4gQTtpZigwPT09ZS5sb29rYWhlYWQpYnJlYWt9aWYocj0wLGUubG9va2FoZWFkPj14JiYoZS5pbnNfaD0oZS5pbnNfaDw8ZS5oYXNoX3NoaWZ0XmUud2luZG93W2Uuc3Ryc3RhcnQreC0xXSkmZS5oYXNoX21hc2sscj1lLnByZXZbZS5zdHJzdGFydCZlLndfbWFza109ZS5oZWFkW2UuaW5zX2hdLGUuaGVhZFtlLmluc19oXT1lLnN0cnN0YXJ0KSxlLnByZXZfbGVuZ3RoPWUubWF0Y2hfbGVuZ3RoLGUucHJldl9tYXRjaD1lLm1hdGNoX3N0YXJ0LGUubWF0Y2hfbGVuZ3RoPXgtMSwwIT09ciYmZS5wcmV2X2xlbmd0aDxlLm1heF9sYXp5X21hdGNoJiZlLnN0cnN0YXJ0LXI8PWUud19zaXplLXomJihlLm1hdGNoX2xlbmd0aD1MKGUsciksZS5tYXRjaF9sZW5ndGg8PTUmJigxPT09ZS5zdHJhdGVneXx8ZS5tYXRjaF9sZW5ndGg9PT14JiY0MDk2PGUuc3Ryc3RhcnQtZS5tYXRjaF9zdGFydCkmJihlLm1hdGNoX2xlbmd0aD14LTEpKSxlLnByZXZfbGVuZ3RoPj14JiZlLm1hdGNoX2xlbmd0aDw9ZS5wcmV2X2xlbmd0aCl7Zm9yKGk9ZS5zdHJzdGFydCtlLmxvb2thaGVhZC14LG49dS5fdHJfdGFsbHkoZSxlLnN0cnN0YXJ0LTEtZS5wcmV2X21hdGNoLGUucHJldl9sZW5ndGgteCksZS5sb29rYWhlYWQtPWUucHJldl9sZW5ndGgtMSxlLnByZXZfbGVuZ3RoLT0yOysrZS5zdHJzdGFydDw9aSYmKGUuaW5zX2g9KGUuaW5zX2g8PGUuaGFzaF9zaGlmdF5lLndpbmRvd1tlLnN0cnN0YXJ0K3gtMV0pJmUuaGFzaF9tYXNrLHI9ZS5wcmV2W2Uuc3Ryc3RhcnQmZS53X21hc2tdPWUuaGVhZFtlLmluc19oXSxlLmhlYWRbZS5pbnNfaF09ZS5zdHJzdGFydCksMCE9LS1lLnByZXZfbGVuZ3RoOyk7aWYoZS5tYXRjaF9hdmFpbGFibGU9MCxlLm1hdGNoX2xlbmd0aD14LTEsZS5zdHJzdGFydCsrLG4mJihOKGUsITEpLDA9PT1lLnN0cm0uYXZhaWxfb3V0KSlyZXR1cm4gQX1lbHNlIGlmKGUubWF0Y2hfYXZhaWxhYmxlKXtpZigobj11Ll90cl90YWxseShlLDAsZS53aW5kb3dbZS5zdHJzdGFydC0xXSkpJiZOKGUsITEpLGUuc3Ryc3RhcnQrKyxlLmxvb2thaGVhZC0tLDA9PT1lLnN0cm0uYXZhaWxfb3V0KXJldHVybiBBfWVsc2UgZS5tYXRjaF9hdmFpbGFibGU9MSxlLnN0cnN0YXJ0KyssZS5sb29rYWhlYWQtLX1yZXR1cm4gZS5tYXRjaF9hdmFpbGFibGUmJihuPXUuX3RyX3RhbGx5KGUsMCxlLndpbmRvd1tlLnN0cnN0YXJ0LTFdKSxlLm1hdGNoX2F2YWlsYWJsZT0wKSxlLmluc2VydD1lLnN0cnN0YXJ0PHgtMT9lLnN0cnN0YXJ0OngtMSx0PT09Zj8oTihlLCEwKSwwPT09ZS5zdHJtLmF2YWlsX291dD9POkIpOmUubGFzdF9saXQmJihOKGUsITEpLDA9PT1lLnN0cm0uYXZhaWxfb3V0KT9BOkl9ZnVuY3Rpb24gTShlLHQscixuLGkpe3RoaXMuZ29vZF9sZW5ndGg9ZSx0aGlzLm1heF9sYXp5PXQsdGhpcy5uaWNlX2xlbmd0aD1yLHRoaXMubWF4X2NoYWluPW4sdGhpcy5mdW5jPWl9ZnVuY3Rpb24gSCgpe3RoaXMuc3RybT1udWxsLHRoaXMuc3RhdHVzPTAsdGhpcy5wZW5kaW5nX2J1Zj1udWxsLHRoaXMucGVuZGluZ19idWZfc2l6ZT0wLHRoaXMucGVuZGluZ19vdXQ9MCx0aGlzLnBlbmRpbmc9MCx0aGlzLndyYXA9MCx0aGlzLmd6aGVhZD1udWxsLHRoaXMuZ3ppbmRleD0wLHRoaXMubWV0aG9kPXYsdGhpcy5sYXN0X2ZsdXNoPS0xLHRoaXMud19zaXplPTAsdGhpcy53X2JpdHM9MCx0aGlzLndfbWFzaz0wLHRoaXMud2luZG93PW51bGwsdGhpcy53aW5kb3dfc2l6ZT0wLHRoaXMucHJldj1udWxsLHRoaXMuaGVhZD1udWxsLHRoaXMuaW5zX2g9MCx0aGlzLmhhc2hfc2l6ZT0wLHRoaXMuaGFzaF9iaXRzPTAsdGhpcy5oYXNoX21hc2s9MCx0aGlzLmhhc2hfc2hpZnQ9MCx0aGlzLmJsb2NrX3N0YXJ0PTAsdGhpcy5tYXRjaF9sZW5ndGg9MCx0aGlzLnByZXZfbWF0Y2g9MCx0aGlzLm1hdGNoX2F2YWlsYWJsZT0wLHRoaXMuc3Ryc3RhcnQ9MCx0aGlzLm1hdGNoX3N0YXJ0PTAsdGhpcy5sb29rYWhlYWQ9MCx0aGlzLnByZXZfbGVuZ3RoPTAsdGhpcy5tYXhfY2hhaW5fbGVuZ3RoPTAsdGhpcy5tYXhfbGF6eV9tYXRjaD0wLHRoaXMubGV2ZWw9MCx0aGlzLnN0cmF0ZWd5PTAsdGhpcy5nb29kX21hdGNoPTAsdGhpcy5uaWNlX21hdGNoPTAsdGhpcy5keW5fbHRyZWU9bmV3IGMuQnVmMTYoMip3KSx0aGlzLmR5bl9kdHJlZT1uZXcgYy5CdWYxNigyKigyKmErMSkpLHRoaXMuYmxfdHJlZT1uZXcgYy5CdWYxNigyKigyKm8rMSkpLEQodGhpcy5keW5fbHRyZWUpLEQodGhpcy5keW5fZHRyZWUpLEQodGhpcy5ibF90cmVlKSx0aGlzLmxfZGVzYz1udWxsLHRoaXMuZF9kZXNjPW51bGwsdGhpcy5ibF9kZXNjPW51bGwsdGhpcy5ibF9jb3VudD1uZXcgYy5CdWYxNihrKzEpLHRoaXMuaGVhcD1uZXcgYy5CdWYxNigyKnMrMSksRCh0aGlzLmhlYXApLHRoaXMuaGVhcF9sZW49MCx0aGlzLmhlYXBfbWF4PTAsdGhpcy5kZXB0aD1uZXcgYy5CdWYxNigyKnMrMSksRCh0aGlzLmRlcHRoKSx0aGlzLmxfYnVmPTAsdGhpcy5saXRfYnVmc2l6ZT0wLHRoaXMubGFzdF9saXQ9MCx0aGlzLmRfYnVmPTAsdGhpcy5vcHRfbGVuPTAsdGhpcy5zdGF0aWNfbGVuPTAsdGhpcy5tYXRjaGVzPTAsdGhpcy5pbnNlcnQ9MCx0aGlzLmJpX2J1Zj0wLHRoaXMuYmlfdmFsaWQ9MH1mdW5jdGlvbiBHKGUpe3ZhciB0O3JldHVybiBlJiZlLnN0YXRlPyhlLnRvdGFsX2luPWUudG90YWxfb3V0PTAsZS5kYXRhX3R5cGU9aSwodD1lLnN0YXRlKS5wZW5kaW5nPTAsdC5wZW5kaW5nX291dD0wLHQud3JhcDwwJiYodC53cmFwPS10LndyYXApLHQuc3RhdHVzPXQud3JhcD9DOkUsZS5hZGxlcj0yPT09dC53cmFwPzA6MSx0Lmxhc3RfZmx1c2g9bCx1Ll90cl9pbml0KHQpLG0pOlIoZSxfKX1mdW5jdGlvbiBLKGUpe3ZhciB0PUcoZSk7cmV0dXJuIHQ9PT1tJiZmdW5jdGlvbihlKXtlLndpbmRvd19zaXplPTIqZS53X3NpemUsRChlLmhlYWQpLGUubWF4X2xhenlfbWF0Y2g9aFtlLmxldmVsXS5tYXhfbGF6eSxlLmdvb2RfbWF0Y2g9aFtlLmxldmVsXS5nb29kX2xlbmd0aCxlLm5pY2VfbWF0Y2g9aFtlLmxldmVsXS5uaWNlX2xlbmd0aCxlLm1heF9jaGFpbl9sZW5ndGg9aFtlLmxldmVsXS5tYXhfY2hhaW4sZS5zdHJzdGFydD0wLGUuYmxvY2tfc3RhcnQ9MCxlLmxvb2thaGVhZD0wLGUuaW5zZXJ0PTAsZS5tYXRjaF9sZW5ndGg9ZS5wcmV2X2xlbmd0aD14LTEsZS5tYXRjaF9hdmFpbGFibGU9MCxlLmluc19oPTB9KGUuc3RhdGUpLHR9ZnVuY3Rpb24gWShlLHQscixuLGkscyl7aWYoIWUpcmV0dXJuIF87dmFyIGE9MTtpZih0PT09ZyYmKHQ9NiksbjwwPyhhPTAsbj0tbik6MTU8biYmKGE9MixuLT0xNiksaTwxfHx5PGl8fHIhPT12fHxuPDh8fDE1PG58fHQ8MHx8OTx0fHxzPDB8fGI8cylyZXR1cm4gUihlLF8pOzg9PT1uJiYobj05KTt2YXIgbz1uZXcgSDtyZXR1cm4oZS5zdGF0ZT1vKS5zdHJtPWUsby53cmFwPWEsby5nemhlYWQ9bnVsbCxvLndfYml0cz1uLG8ud19zaXplPTE8PG8ud19iaXRzLG8ud19tYXNrPW8ud19zaXplLTEsby5oYXNoX2JpdHM9aSs3LG8uaGFzaF9zaXplPTE8PG8uaGFzaF9iaXRzLG8uaGFzaF9tYXNrPW8uaGFzaF9zaXplLTEsby5oYXNoX3NoaWZ0PX5+KChvLmhhc2hfYml0cyt4LTEpL3gpLG8ud2luZG93PW5ldyBjLkJ1ZjgoMipvLndfc2l6ZSksby5oZWFkPW5ldyBjLkJ1ZjE2KG8uaGFzaF9zaXplKSxvLnByZXY9bmV3IGMuQnVmMTYoby53X3NpemUpLG8ubGl0X2J1ZnNpemU9MTw8aSs2LG8ucGVuZGluZ19idWZfc2l6ZT00Km8ubGl0X2J1ZnNpemUsby5wZW5kaW5nX2J1Zj1uZXcgYy5CdWY4KG8ucGVuZGluZ19idWZfc2l6ZSksby5kX2J1Zj0xKm8ubGl0X2J1ZnNpemUsby5sX2J1Zj0zKm8ubGl0X2J1ZnNpemUsby5sZXZlbD10LG8uc3RyYXRlZ3k9cyxvLm1ldGhvZD1yLEsoZSl9aD1bbmV3IE0oMCwwLDAsMCxmdW5jdGlvbihlLHQpe3ZhciByPTY1NTM1O2ZvcihyPmUucGVuZGluZ19idWZfc2l6ZS01JiYocj1lLnBlbmRpbmdfYnVmX3NpemUtNSk7Oyl7aWYoZS5sb29rYWhlYWQ8PTEpe2lmKGooZSksMD09PWUubG9va2FoZWFkJiZ0PT09bClyZXR1cm4gQTtpZigwPT09ZS5sb29rYWhlYWQpYnJlYWt9ZS5zdHJzdGFydCs9ZS5sb29rYWhlYWQsZS5sb29rYWhlYWQ9MDt2YXIgbj1lLmJsb2NrX3N0YXJ0K3I7aWYoKDA9PT1lLnN0cnN0YXJ0fHxlLnN0cnN0YXJ0Pj1uKSYmKGUubG9va2FoZWFkPWUuc3Ryc3RhcnQtbixlLnN0cnN0YXJ0PW4sTihlLCExKSwwPT09ZS5zdHJtLmF2YWlsX291dCkpcmV0dXJuIEE7aWYoZS5zdHJzdGFydC1lLmJsb2NrX3N0YXJ0Pj1lLndfc2l6ZS16JiYoTihlLCExKSwwPT09ZS5zdHJtLmF2YWlsX291dCkpcmV0dXJuIEF9cmV0dXJuIGUuaW5zZXJ0PTAsdD09PWY/KE4oZSwhMCksMD09PWUuc3RybS5hdmFpbF9vdXQ/TzpCKTooZS5zdHJzdGFydD5lLmJsb2NrX3N0YXJ0JiYoTihlLCExKSxlLnN0cm0uYXZhaWxfb3V0KSxBKX0pLG5ldyBNKDQsNCw4LDQsWiksbmV3IE0oNCw1LDE2LDgsWiksbmV3IE0oNCw2LDMyLDMyLFopLG5ldyBNKDQsNCwxNiwxNixXKSxuZXcgTSg4LDE2LDMyLDMyLFcpLG5ldyBNKDgsMTYsMTI4LDEyOCxXKSxuZXcgTSg4LDMyLDEyOCwyNTYsVyksbmV3IE0oMzIsMTI4LDI1OCwxMDI0LFcpLG5ldyBNKDMyLDI1OCwyNTgsNDA5NixXKV0sci5kZWZsYXRlSW5pdD1mdW5jdGlvbihlLHQpe3JldHVybiBZKGUsdCx2LDE1LDgsMCl9LHIuZGVmbGF0ZUluaXQyPVksci5kZWZsYXRlUmVzZXQ9SyxyLmRlZmxhdGVSZXNldEtlZXA9RyxyLmRlZmxhdGVTZXRIZWFkZXI9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gZSYmZS5zdGF0ZT8yIT09ZS5zdGF0ZS53cmFwP186KGUuc3RhdGUuZ3poZWFkPXQsbSk6X30sci5kZWZsYXRlPWZ1bmN0aW9uKGUsdCl7dmFyIHIsbixpLHM7aWYoIWV8fCFlLnN0YXRlfHw1PHR8fHQ8MClyZXR1cm4gZT9SKGUsXyk6XztpZihuPWUuc3RhdGUsIWUub3V0cHV0fHwhZS5pbnB1dCYmMCE9PWUuYXZhaWxfaW58fDY2Nj09PW4uc3RhdHVzJiZ0IT09ZilyZXR1cm4gUihlLDA9PT1lLmF2YWlsX291dD8tNTpfKTtpZihuLnN0cm09ZSxyPW4ubGFzdF9mbHVzaCxuLmxhc3RfZmx1c2g9dCxuLnN0YXR1cz09PUMpaWYoMj09PW4ud3JhcCllLmFkbGVyPTAsVShuLDMxKSxVKG4sMTM5KSxVKG4sOCksbi5nemhlYWQ/KFUobiwobi5nemhlYWQudGV4dD8xOjApKyhuLmd6aGVhZC5oY3JjPzI6MCkrKG4uZ3poZWFkLmV4dHJhPzQ6MCkrKG4uZ3poZWFkLm5hbWU/ODowKSsobi5nemhlYWQuY29tbWVudD8xNjowKSksVShuLDI1NSZuLmd6aGVhZC50aW1lKSxVKG4sbi5nemhlYWQudGltZT4+OCYyNTUpLFUobixuLmd6aGVhZC50aW1lPj4xNiYyNTUpLFUobixuLmd6aGVhZC50aW1lPj4yNCYyNTUpLFUobiw5PT09bi5sZXZlbD8yOjI8PW4uc3RyYXRlZ3l8fG4ubGV2ZWw8Mj80OjApLFUobiwyNTUmbi5nemhlYWQub3MpLG4uZ3poZWFkLmV4dHJhJiZuLmd6aGVhZC5leHRyYS5sZW5ndGgmJihVKG4sMjU1Jm4uZ3poZWFkLmV4dHJhLmxlbmd0aCksVShuLG4uZ3poZWFkLmV4dHJhLmxlbmd0aD4+OCYyNTUpKSxuLmd6aGVhZC5oY3JjJiYoZS5hZGxlcj1wKGUuYWRsZXIsbi5wZW5kaW5nX2J1ZixuLnBlbmRpbmcsMCkpLG4uZ3ppbmRleD0wLG4uc3RhdHVzPTY5KTooVShuLDApLFUobiwwKSxVKG4sMCksVShuLDApLFUobiwwKSxVKG4sOT09PW4ubGV2ZWw/MjoyPD1uLnN0cmF0ZWd5fHxuLmxldmVsPDI/NDowKSxVKG4sMyksbi5zdGF0dXM9RSk7ZWxzZXt2YXIgYT12KyhuLndfYml0cy04PDw0KTw8ODthfD0oMjw9bi5zdHJhdGVneXx8bi5sZXZlbDwyPzA6bi5sZXZlbDw2PzE6Nj09PW4ubGV2ZWw/MjozKTw8NiwwIT09bi5zdHJzdGFydCYmKGF8PTMyKSxhKz0zMS1hJTMxLG4uc3RhdHVzPUUsUChuLGEpLDAhPT1uLnN0cnN0YXJ0JiYoUChuLGUuYWRsZXI+Pj4xNiksUChuLDY1NTM1JmUuYWRsZXIpKSxlLmFkbGVyPTF9aWYoNjk9PT1uLnN0YXR1cylpZihuLmd6aGVhZC5leHRyYSl7Zm9yKGk9bi5wZW5kaW5nO24uZ3ppbmRleDwoNjU1MzUmbi5nemhlYWQuZXh0cmEubGVuZ3RoKSYmKG4ucGVuZGluZyE9PW4ucGVuZGluZ19idWZfc2l6ZXx8KG4uZ3poZWFkLmhjcmMmJm4ucGVuZGluZz5pJiYoZS5hZGxlcj1wKGUuYWRsZXIsbi5wZW5kaW5nX2J1ZixuLnBlbmRpbmctaSxpKSksRihlKSxpPW4ucGVuZGluZyxuLnBlbmRpbmchPT1uLnBlbmRpbmdfYnVmX3NpemUpKTspVShuLDI1NSZuLmd6aGVhZC5leHRyYVtuLmd6aW5kZXhdKSxuLmd6aW5kZXgrKztuLmd6aGVhZC5oY3JjJiZuLnBlbmRpbmc+aSYmKGUuYWRsZXI9cChlLmFkbGVyLG4ucGVuZGluZ19idWYsbi5wZW5kaW5nLWksaSkpLG4uZ3ppbmRleD09PW4uZ3poZWFkLmV4dHJhLmxlbmd0aCYmKG4uZ3ppbmRleD0wLG4uc3RhdHVzPTczKX1lbHNlIG4uc3RhdHVzPTczO2lmKDczPT09bi5zdGF0dXMpaWYobi5nemhlYWQubmFtZSl7aT1uLnBlbmRpbmc7ZG97aWYobi5wZW5kaW5nPT09bi5wZW5kaW5nX2J1Zl9zaXplJiYobi5nemhlYWQuaGNyYyYmbi5wZW5kaW5nPmkmJihlLmFkbGVyPXAoZS5hZGxlcixuLnBlbmRpbmdfYnVmLG4ucGVuZGluZy1pLGkpKSxGKGUpLGk9bi5wZW5kaW5nLG4ucGVuZGluZz09PW4ucGVuZGluZ19idWZfc2l6ZSkpe3M9MTticmVha31zPW4uZ3ppbmRleDxuLmd6aGVhZC5uYW1lLmxlbmd0aD8yNTUmbi5nemhlYWQubmFtZS5jaGFyQ29kZUF0KG4uZ3ppbmRleCsrKTowLFUobixzKX13aGlsZSgwIT09cyk7bi5nemhlYWQuaGNyYyYmbi5wZW5kaW5nPmkmJihlLmFkbGVyPXAoZS5hZGxlcixuLnBlbmRpbmdfYnVmLG4ucGVuZGluZy1pLGkpKSwwPT09cyYmKG4uZ3ppbmRleD0wLG4uc3RhdHVzPTkxKX1lbHNlIG4uc3RhdHVzPTkxO2lmKDkxPT09bi5zdGF0dXMpaWYobi5nemhlYWQuY29tbWVudCl7aT1uLnBlbmRpbmc7ZG97aWYobi5wZW5kaW5nPT09bi5wZW5kaW5nX2J1Zl9zaXplJiYobi5nemhlYWQuaGNyYyYmbi5wZW5kaW5nPmkmJihlLmFkbGVyPXAoZS5hZGxlcixuLnBlbmRpbmdfYnVmLG4ucGVuZGluZy1pLGkpKSxGKGUpLGk9bi5wZW5kaW5nLG4ucGVuZGluZz09PW4ucGVuZGluZ19idWZfc2l6ZSkpe3M9MTticmVha31zPW4uZ3ppbmRleDxuLmd6aGVhZC5jb21tZW50Lmxlbmd0aD8yNTUmbi5nemhlYWQuY29tbWVudC5jaGFyQ29kZUF0KG4uZ3ppbmRleCsrKTowLFUobixzKX13aGlsZSgwIT09cyk7bi5nemhlYWQuaGNyYyYmbi5wZW5kaW5nPmkmJihlLmFkbGVyPXAoZS5hZGxlcixuLnBlbmRpbmdfYnVmLG4ucGVuZGluZy1pLGkpKSwwPT09cyYmKG4uc3RhdHVzPTEwMyl9ZWxzZSBuLnN0YXR1cz0xMDM7aWYoMTAzPT09bi5zdGF0dXMmJihuLmd6aGVhZC5oY3JjPyhuLnBlbmRpbmcrMj5uLnBlbmRpbmdfYnVmX3NpemUmJkYoZSksbi5wZW5kaW5nKzI8PW4ucGVuZGluZ19idWZfc2l6ZSYmKFUobiwyNTUmZS5hZGxlciksVShuLGUuYWRsZXI+PjgmMjU1KSxlLmFkbGVyPTAsbi5zdGF0dXM9RSkpOm4uc3RhdHVzPUUpLDAhPT1uLnBlbmRpbmcpe2lmKEYoZSksMD09PWUuYXZhaWxfb3V0KXJldHVybiBuLmxhc3RfZmx1c2g9LTEsbX1lbHNlIGlmKDA9PT1lLmF2YWlsX2luJiZUKHQpPD1UKHIpJiZ0IT09ZilyZXR1cm4gUihlLC01KTtpZig2NjY9PT1uLnN0YXR1cyYmMCE9PWUuYXZhaWxfaW4pcmV0dXJuIFIoZSwtNSk7aWYoMCE9PWUuYXZhaWxfaW58fDAhPT1uLmxvb2thaGVhZHx8dCE9PWwmJjY2NiE9PW4uc3RhdHVzKXt2YXIgbz0yPT09bi5zdHJhdGVneT9mdW5jdGlvbihlLHQpe2Zvcih2YXIgcjs7KXtpZigwPT09ZS5sb29rYWhlYWQmJihqKGUpLDA9PT1lLmxvb2thaGVhZCkpe2lmKHQ9PT1sKXJldHVybiBBO2JyZWFrfWlmKGUubWF0Y2hfbGVuZ3RoPTAscj11Ll90cl90YWxseShlLDAsZS53aW5kb3dbZS5zdHJzdGFydF0pLGUubG9va2FoZWFkLS0sZS5zdHJzdGFydCsrLHImJihOKGUsITEpLDA9PT1lLnN0cm0uYXZhaWxfb3V0KSlyZXR1cm4gQX1yZXR1cm4gZS5pbnNlcnQ9MCx0PT09Zj8oTihlLCEwKSwwPT09ZS5zdHJtLmF2YWlsX291dD9POkIpOmUubGFzdF9saXQmJihOKGUsITEpLDA9PT1lLnN0cm0uYXZhaWxfb3V0KT9BOkl9KG4sdCk6Mz09PW4uc3RyYXRlZ3k/ZnVuY3Rpb24oZSx0KXtmb3IodmFyIHIsbixpLHMsYT1lLndpbmRvdzs7KXtpZihlLmxvb2thaGVhZDw9Uyl7aWYoaihlKSxlLmxvb2thaGVhZDw9UyYmdD09PWwpcmV0dXJuIEE7aWYoMD09PWUubG9va2FoZWFkKWJyZWFrfWlmKGUubWF0Y2hfbGVuZ3RoPTAsZS5sb29rYWhlYWQ+PXgmJjA8ZS5zdHJzdGFydCYmKG49YVtpPWUuc3Ryc3RhcnQtMV0pPT09YVsrK2ldJiZuPT09YVsrK2ldJiZuPT09YVsrK2ldKXtzPWUuc3Ryc3RhcnQrUztkb3t9d2hpbGUobj09PWFbKytpXSYmbj09PWFbKytpXSYmbj09PWFbKytpXSYmbj09PWFbKytpXSYmbj09PWFbKytpXSYmbj09PWFbKytpXSYmbj09PWFbKytpXSYmbj09PWFbKytpXSYmaTxzKTtlLm1hdGNoX2xlbmd0aD1TLShzLWkpLGUubWF0Y2hfbGVuZ3RoPmUubG9va2FoZWFkJiYoZS5tYXRjaF9sZW5ndGg9ZS5sb29rYWhlYWQpfWlmKGUubWF0Y2hfbGVuZ3RoPj14PyhyPXUuX3RyX3RhbGx5KGUsMSxlLm1hdGNoX2xlbmd0aC14KSxlLmxvb2thaGVhZC09ZS5tYXRjaF9sZW5ndGgsZS5zdHJzdGFydCs9ZS5tYXRjaF9sZW5ndGgsZS5tYXRjaF9sZW5ndGg9MCk6KHI9dS5fdHJfdGFsbHkoZSwwLGUud2luZG93W2Uuc3Ryc3RhcnRdKSxlLmxvb2thaGVhZC0tLGUuc3Ryc3RhcnQrKyksciYmKE4oZSwhMSksMD09PWUuc3RybS5hdmFpbF9vdXQpKXJldHVybiBBfXJldHVybiBlLmluc2VydD0wLHQ9PT1mPyhOKGUsITApLDA9PT1lLnN0cm0uYXZhaWxfb3V0P086Qik6ZS5sYXN0X2xpdCYmKE4oZSwhMSksMD09PWUuc3RybS5hdmFpbF9vdXQpP0E6SX0obix0KTpoW24ubGV2ZWxdLmZ1bmMobix0KTtpZihvIT09TyYmbyE9PUJ8fChuLnN0YXR1cz02NjYpLG89PT1BfHxvPT09TylyZXR1cm4gMD09PWUuYXZhaWxfb3V0JiYobi5sYXN0X2ZsdXNoPS0xKSxtO2lmKG89PT1JJiYoMT09PXQ/dS5fdHJfYWxpZ24obik6NSE9PXQmJih1Ll90cl9zdG9yZWRfYmxvY2sobiwwLDAsITEpLDM9PT10JiYoRChuLmhlYWQpLDA9PT1uLmxvb2thaGVhZCYmKG4uc3Ryc3RhcnQ9MCxuLmJsb2NrX3N0YXJ0PTAsbi5pbnNlcnQ9MCkpKSxGKGUpLDA9PT1lLmF2YWlsX291dCkpcmV0dXJuIG4ubGFzdF9mbHVzaD0tMSxtfXJldHVybiB0IT09Zj9tOm4ud3JhcDw9MD8xOigyPT09bi53cmFwPyhVKG4sMjU1JmUuYWRsZXIpLFUobixlLmFkbGVyPj44JjI1NSksVShuLGUuYWRsZXI+PjE2JjI1NSksVShuLGUuYWRsZXI+PjI0JjI1NSksVShuLDI1NSZlLnRvdGFsX2luKSxVKG4sZS50b3RhbF9pbj4+OCYyNTUpLFUobixlLnRvdGFsX2luPj4xNiYyNTUpLFUobixlLnRvdGFsX2luPj4yNCYyNTUpKTooUChuLGUuYWRsZXI+Pj4xNiksUChuLDY1NTM1JmUuYWRsZXIpKSxGKGUpLDA8bi53cmFwJiYobi53cmFwPS1uLndyYXApLDAhPT1uLnBlbmRpbmc/bToxKX0sci5kZWZsYXRlRW5kPWZ1bmN0aW9uKGUpe3ZhciB0O3JldHVybiBlJiZlLnN0YXRlPyh0PWUuc3RhdGUuc3RhdHVzKSE9PUMmJjY5IT09dCYmNzMhPT10JiY5MSE9PXQmJjEwMyE9PXQmJnQhPT1FJiY2NjYhPT10P1IoZSxfKTooZS5zdGF0ZT1udWxsLHQ9PT1FP1IoZSwtMyk6bSk6X30sci5kZWZsYXRlU2V0RGljdGlvbmFyeT1mdW5jdGlvbihlLHQpe3ZhciByLG4saSxzLGEsbyxoLHUsbD10Lmxlbmd0aDtpZighZXx8IWUuc3RhdGUpcmV0dXJuIF87aWYoMj09PShzPShyPWUuc3RhdGUpLndyYXApfHwxPT09cyYmci5zdGF0dXMhPT1DfHxyLmxvb2thaGVhZClyZXR1cm4gXztmb3IoMT09PXMmJihlLmFkbGVyPWQoZS5hZGxlcix0LGwsMCkpLHIud3JhcD0wLGw+PXIud19zaXplJiYoMD09PXMmJihEKHIuaGVhZCksci5zdHJzdGFydD0wLHIuYmxvY2tfc3RhcnQ9MCxyLmluc2VydD0wKSx1PW5ldyBjLkJ1Zjgoci53X3NpemUpLGMuYXJyYXlTZXQodSx0LGwtci53X3NpemUsci53X3NpemUsMCksdD11LGw9ci53X3NpemUpLGE9ZS5hdmFpbF9pbixvPWUubmV4dF9pbixoPWUuaW5wdXQsZS5hdmFpbF9pbj1sLGUubmV4dF9pbj0wLGUuaW5wdXQ9dCxqKHIpO3IubG9va2FoZWFkPj14Oyl7Zm9yKG49ci5zdHJzdGFydCxpPXIubG9va2FoZWFkLSh4LTEpO3IuaW5zX2g9KHIuaW5zX2g8PHIuaGFzaF9zaGlmdF5yLndpbmRvd1tuK3gtMV0pJnIuaGFzaF9tYXNrLHIucHJldltuJnIud19tYXNrXT1yLmhlYWRbci5pbnNfaF0sci5oZWFkW3IuaW5zX2hdPW4sbisrLC0taTspO3Iuc3Ryc3RhcnQ9bixyLmxvb2thaGVhZD14LTEsaihyKX1yZXR1cm4gci5zdHJzdGFydCs9ci5sb29rYWhlYWQsci5ibG9ja19zdGFydD1yLnN0cnN0YXJ0LHIuaW5zZXJ0PXIubG9va2FoZWFkLHIubG9va2FoZWFkPTAsci5tYXRjaF9sZW5ndGg9ci5wcmV2X2xlbmd0aD14LTEsci5tYXRjaF9hdmFpbGFibGU9MCxlLm5leHRfaW49byxlLmlucHV0PWgsZS5hdmFpbF9pbj1hLHIud3JhcD1zLG19LHIuZGVmbGF0ZUluZm89XCJwYWtvIGRlZmxhdGUgKGZyb20gTm9kZWNhIHByb2plY3QpXCJ9LHtcIi4uL3V0aWxzL2NvbW1vblwiOjQxLFwiLi9hZGxlcjMyXCI6NDMsXCIuL2NyYzMyXCI6NDUsXCIuL21lc3NhZ2VzXCI6NTEsXCIuL3RyZWVzXCI6NTJ9XSw0NzpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3QuZXhwb3J0cz1mdW5jdGlvbigpe3RoaXMudGV4dD0wLHRoaXMudGltZT0wLHRoaXMueGZsYWdzPTAsdGhpcy5vcz0wLHRoaXMuZXh0cmE9bnVsbCx0aGlzLmV4dHJhX2xlbj0wLHRoaXMubmFtZT1cIlwiLHRoaXMuY29tbWVudD1cIlwiLHRoaXMuaGNyYz0wLHRoaXMuZG9uZT0hMX19LHt9XSw0ODpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3QuZXhwb3J0cz1mdW5jdGlvbihlLHQpe3ZhciByLG4saSxzLGEsbyxoLHUsbCxmLGMsZCxwLG0sXyxnLGIsdix5LHcsayx4LFMseixDO3I9ZS5zdGF0ZSxuPWUubmV4dF9pbix6PWUuaW5wdXQsaT1uKyhlLmF2YWlsX2luLTUpLHM9ZS5uZXh0X291dCxDPWUub3V0cHV0LGE9cy0odC1lLmF2YWlsX291dCksbz1zKyhlLmF2YWlsX291dC0yNTcpLGg9ci5kbWF4LHU9ci53c2l6ZSxsPXIud2hhdmUsZj1yLnduZXh0LGM9ci53aW5kb3csZD1yLmhvbGQscD1yLmJpdHMsbT1yLmxlbmNvZGUsXz1yLmRpc3Rjb2RlLGc9KDE8PHIubGVuYml0cyktMSxiPSgxPDxyLmRpc3RiaXRzKS0xO2U6ZG97cDwxNSYmKGQrPXpbbisrXTw8cCxwKz04LGQrPXpbbisrXTw8cCxwKz04KSx2PW1bZCZnXTt0OmZvcig7Oyl7aWYoZD4+Pj15PXY+Pj4yNCxwLT15LDA9PT0oeT12Pj4+MTYmMjU1KSlDW3MrK109NjU1MzUmdjtlbHNle2lmKCEoMTYmeSkpe2lmKDA9PSg2NCZ5KSl7dj1tWyg2NTUzNSZ2KSsoZCYoMTw8eSktMSldO2NvbnRpbnVlIHR9aWYoMzImeSl7ci5tb2RlPTEyO2JyZWFrIGV9ZS5tc2c9XCJpbnZhbGlkIGxpdGVyYWwvbGVuZ3RoIGNvZGVcIixyLm1vZGU9MzA7YnJlYWsgZX13PTY1NTM1JnYsKHkmPTE1KSYmKHA8eSYmKGQrPXpbbisrXTw8cCxwKz04KSx3Kz1kJigxPDx5KS0xLGQ+Pj49eSxwLT15KSxwPDE1JiYoZCs9eltuKytdPDxwLHArPTgsZCs9eltuKytdPDxwLHArPTgpLHY9X1tkJmJdO3I6Zm9yKDs7KXtpZihkPj4+PXk9dj4+PjI0LHAtPXksISgxNiYoeT12Pj4+MTYmMjU1KSkpe2lmKDA9PSg2NCZ5KSl7dj1fWyg2NTUzNSZ2KSsoZCYoMTw8eSktMSldO2NvbnRpbnVlIHJ9ZS5tc2c9XCJpbnZhbGlkIGRpc3RhbmNlIGNvZGVcIixyLm1vZGU9MzA7YnJlYWsgZX1pZihrPTY1NTM1JnYscDwoeSY9MTUpJiYoZCs9eltuKytdPDxwLChwKz04KTx5JiYoZCs9eltuKytdPDxwLHArPTgpKSxoPChrKz1kJigxPDx5KS0xKSl7ZS5tc2c9XCJpbnZhbGlkIGRpc3RhbmNlIHRvbyBmYXIgYmFja1wiLHIubW9kZT0zMDticmVhayBlfWlmKGQ+Pj49eSxwLT15LCh5PXMtYSk8ayl7aWYobDwoeT1rLXkpJiZyLnNhbmUpe2UubXNnPVwiaW52YWxpZCBkaXN0YW5jZSB0b28gZmFyIGJhY2tcIixyLm1vZGU9MzA7YnJlYWsgZX1pZihTPWMsKHg9MCk9PT1mKXtpZih4Kz11LXkseTx3KXtmb3Iody09eTtDW3MrK109Y1t4KytdLC0teTspO3g9cy1rLFM9Q319ZWxzZSBpZihmPHkpe2lmKHgrPXUrZi15LCh5LT1mKTx3KXtmb3Iody09eTtDW3MrK109Y1t4KytdLC0teTspO2lmKHg9MCxmPHcpe2Zvcih3LT15PWY7Q1tzKytdPWNbeCsrXSwtLXk7KTt4PXMtayxTPUN9fX1lbHNlIGlmKHgrPWYteSx5PHcpe2Zvcih3LT15O0NbcysrXT1jW3grK10sLS15Oyk7eD1zLWssUz1DfWZvcig7Mjx3OylDW3MrK109U1t4KytdLENbcysrXT1TW3grK10sQ1tzKytdPVNbeCsrXSx3LT0zO3cmJihDW3MrK109U1t4KytdLDE8dyYmKENbcysrXT1TW3grK10pKX1lbHNle2Zvcih4PXMtaztDW3MrK109Q1t4KytdLENbcysrXT1DW3grK10sQ1tzKytdPUNbeCsrXSwyPCh3LT0zKTspO3cmJihDW3MrK109Q1t4KytdLDE8dyYmKENbcysrXT1DW3grK10pKX1icmVha319YnJlYWt9fXdoaWxlKG48aSYmczxvKTtuLT13PXA+PjMsZCY9KDE8PChwLT13PDwzKSktMSxlLm5leHRfaW49bixlLm5leHRfb3V0PXMsZS5hdmFpbF9pbj1uPGk/aS1uKzU6NS0obi1pKSxlLmF2YWlsX291dD1zPG8/by1zKzI1NzoyNTctKHMtbyksci5ob2xkPWQsci5iaXRzPXB9fSx7fV0sNDk6W2Z1bmN0aW9uKGUsdCxyKXtcInVzZSBzdHJpY3RcIjt2YXIgST1lKFwiLi4vdXRpbHMvY29tbW9uXCIpLE89ZShcIi4vYWRsZXIzMlwiKSxCPWUoXCIuL2NyYzMyXCIpLFI9ZShcIi4vaW5mZmFzdFwiKSxUPWUoXCIuL2luZnRyZWVzXCIpLEQ9MSxGPTIsTj0wLFU9LTIsUD0xLG49ODUyLGk9NTkyO2Z1bmN0aW9uIEwoZSl7cmV0dXJuKGU+Pj4yNCYyNTUpKyhlPj4+OCY2NTI4MCkrKCg2NTI4MCZlKTw8OCkrKCgyNTUmZSk8PDI0KX1mdW5jdGlvbiBzKCl7dGhpcy5tb2RlPTAsdGhpcy5sYXN0PSExLHRoaXMud3JhcD0wLHRoaXMuaGF2ZWRpY3Q9ITEsdGhpcy5mbGFncz0wLHRoaXMuZG1heD0wLHRoaXMuY2hlY2s9MCx0aGlzLnRvdGFsPTAsdGhpcy5oZWFkPW51bGwsdGhpcy53Yml0cz0wLHRoaXMud3NpemU9MCx0aGlzLndoYXZlPTAsdGhpcy53bmV4dD0wLHRoaXMud2luZG93PW51bGwsdGhpcy5ob2xkPTAsdGhpcy5iaXRzPTAsdGhpcy5sZW5ndGg9MCx0aGlzLm9mZnNldD0wLHRoaXMuZXh0cmE9MCx0aGlzLmxlbmNvZGU9bnVsbCx0aGlzLmRpc3Rjb2RlPW51bGwsdGhpcy5sZW5iaXRzPTAsdGhpcy5kaXN0Yml0cz0wLHRoaXMubmNvZGU9MCx0aGlzLm5sZW49MCx0aGlzLm5kaXN0PTAsdGhpcy5oYXZlPTAsdGhpcy5uZXh0PW51bGwsdGhpcy5sZW5zPW5ldyBJLkJ1ZjE2KDMyMCksdGhpcy53b3JrPW5ldyBJLkJ1ZjE2KDI4OCksdGhpcy5sZW5keW49bnVsbCx0aGlzLmRpc3RkeW49bnVsbCx0aGlzLnNhbmU9MCx0aGlzLmJhY2s9MCx0aGlzLndhcz0wfWZ1bmN0aW9uIGEoZSl7dmFyIHQ7cmV0dXJuIGUmJmUuc3RhdGU/KHQ9ZS5zdGF0ZSxlLnRvdGFsX2luPWUudG90YWxfb3V0PXQudG90YWw9MCxlLm1zZz1cIlwiLHQud3JhcCYmKGUuYWRsZXI9MSZ0LndyYXApLHQubW9kZT1QLHQubGFzdD0wLHQuaGF2ZWRpY3Q9MCx0LmRtYXg9MzI3NjgsdC5oZWFkPW51bGwsdC5ob2xkPTAsdC5iaXRzPTAsdC5sZW5jb2RlPXQubGVuZHluPW5ldyBJLkJ1ZjMyKG4pLHQuZGlzdGNvZGU9dC5kaXN0ZHluPW5ldyBJLkJ1ZjMyKGkpLHQuc2FuZT0xLHQuYmFjaz0tMSxOKTpVfWZ1bmN0aW9uIG8oZSl7dmFyIHQ7cmV0dXJuIGUmJmUuc3RhdGU/KCh0PWUuc3RhdGUpLndzaXplPTAsdC53aGF2ZT0wLHQud25leHQ9MCxhKGUpKTpVfWZ1bmN0aW9uIGgoZSx0KXt2YXIgcixuO3JldHVybiBlJiZlLnN0YXRlPyhuPWUuc3RhdGUsdDwwPyhyPTAsdD0tdCk6KHI9MSsodD4+NCksdDw0OCYmKHQmPTE1KSksdCYmKHQ8OHx8MTU8dCk/VToobnVsbCE9PW4ud2luZG93JiZuLndiaXRzIT09dCYmKG4ud2luZG93PW51bGwpLG4ud3JhcD1yLG4ud2JpdHM9dCxvKGUpKSk6VX1mdW5jdGlvbiB1KGUsdCl7dmFyIHIsbjtyZXR1cm4gZT8obj1uZXcgcywoZS5zdGF0ZT1uKS53aW5kb3c9bnVsbCwocj1oKGUsdCkpIT09TiYmKGUuc3RhdGU9bnVsbCkscik6VX12YXIgbCxmLGM9ITA7ZnVuY3Rpb24gaihlKXtpZihjKXt2YXIgdDtmb3IobD1uZXcgSS5CdWYzMig1MTIpLGY9bmV3IEkuQnVmMzIoMzIpLHQ9MDt0PDE0NDspZS5sZW5zW3QrK109ODtmb3IoO3Q8MjU2OyllLmxlbnNbdCsrXT05O2Zvcig7dDwyODA7KWUubGVuc1t0KytdPTc7Zm9yKDt0PDI4ODspZS5sZW5zW3QrK109ODtmb3IoVChELGUubGVucywwLDI4OCxsLDAsZS53b3JrLHtiaXRzOjl9KSx0PTA7dDwzMjspZS5sZW5zW3QrK109NTtUKEYsZS5sZW5zLDAsMzIsZiwwLGUud29yayx7Yml0czo1fSksYz0hMX1lLmxlbmNvZGU9bCxlLmxlbmJpdHM9OSxlLmRpc3Rjb2RlPWYsZS5kaXN0Yml0cz01fWZ1bmN0aW9uIFooZSx0LHIsbil7dmFyIGkscz1lLnN0YXRlO3JldHVybiBudWxsPT09cy53aW5kb3cmJihzLndzaXplPTE8PHMud2JpdHMscy53bmV4dD0wLHMud2hhdmU9MCxzLndpbmRvdz1uZXcgSS5CdWY4KHMud3NpemUpKSxuPj1zLndzaXplPyhJLmFycmF5U2V0KHMud2luZG93LHQsci1zLndzaXplLHMud3NpemUsMCkscy53bmV4dD0wLHMud2hhdmU9cy53c2l6ZSk6KG48KGk9cy53c2l6ZS1zLnduZXh0KSYmKGk9biksSS5hcnJheVNldChzLndpbmRvdyx0LHItbixpLHMud25leHQpLChuLT1pKT8oSS5hcnJheVNldChzLndpbmRvdyx0LHItbixuLDApLHMud25leHQ9bixzLndoYXZlPXMud3NpemUpOihzLnduZXh0Kz1pLHMud25leHQ9PT1zLndzaXplJiYocy53bmV4dD0wKSxzLndoYXZlPHMud3NpemUmJihzLndoYXZlKz1pKSkpLDB9ci5pbmZsYXRlUmVzZXQ9byxyLmluZmxhdGVSZXNldDI9aCxyLmluZmxhdGVSZXNldEtlZXA9YSxyLmluZmxhdGVJbml0PWZ1bmN0aW9uKGUpe3JldHVybiB1KGUsMTUpfSxyLmluZmxhdGVJbml0Mj11LHIuaW5mbGF0ZT1mdW5jdGlvbihlLHQpe3ZhciByLG4saSxzLGEsbyxoLHUsbCxmLGMsZCxwLG0sXyxnLGIsdix5LHcsayx4LFMseixDPTAsRT1uZXcgSS5CdWY4KDQpLEE9WzE2LDE3LDE4LDAsOCw3LDksNiwxMCw1LDExLDQsMTIsMywxMywyLDE0LDEsMTVdO2lmKCFlfHwhZS5zdGF0ZXx8IWUub3V0cHV0fHwhZS5pbnB1dCYmMCE9PWUuYXZhaWxfaW4pcmV0dXJuIFU7MTI9PT0ocj1lLnN0YXRlKS5tb2RlJiYoci5tb2RlPTEzKSxhPWUubmV4dF9vdXQsaT1lLm91dHB1dCxoPWUuYXZhaWxfb3V0LHM9ZS5uZXh0X2luLG49ZS5pbnB1dCxvPWUuYXZhaWxfaW4sdT1yLmhvbGQsbD1yLmJpdHMsZj1vLGM9aCx4PU47ZTpmb3IoOzspc3dpdGNoKHIubW9kZSl7Y2FzZSBQOmlmKDA9PT1yLndyYXApe3IubW9kZT0xMzticmVha31mb3IoO2w8MTY7KXtpZigwPT09bylicmVhayBlO28tLSx1Kz1uW3MrK108PGwsbCs9OH1pZigyJnIud3JhcCYmMzU2MTU9PT11KXtFW3IuY2hlY2s9MF09MjU1JnUsRVsxXT11Pj4+OCYyNTUsci5jaGVjaz1CKHIuY2hlY2ssRSwyLDApLGw9dT0wLHIubW9kZT0yO2JyZWFrfWlmKHIuZmxhZ3M9MCxyLmhlYWQmJihyLmhlYWQuZG9uZT0hMSksISgxJnIud3JhcCl8fCgoKDI1NSZ1KTw8OCkrKHU+PjgpKSUzMSl7ZS5tc2c9XCJpbmNvcnJlY3QgaGVhZGVyIGNoZWNrXCIsci5tb2RlPTMwO2JyZWFrfWlmKDghPSgxNSZ1KSl7ZS5tc2c9XCJ1bmtub3duIGNvbXByZXNzaW9uIG1ldGhvZFwiLHIubW9kZT0zMDticmVha31pZihsLT00LGs9OCsoMTUmKHU+Pj49NCkpLDA9PT1yLndiaXRzKXIud2JpdHM9aztlbHNlIGlmKGs+ci53Yml0cyl7ZS5tc2c9XCJpbnZhbGlkIHdpbmRvdyBzaXplXCIsci5tb2RlPTMwO2JyZWFrfXIuZG1heD0xPDxrLGUuYWRsZXI9ci5jaGVjaz0xLHIubW9kZT01MTImdT8xMDoxMixsPXU9MDticmVhaztjYXNlIDI6Zm9yKDtsPDE2Oyl7aWYoMD09PW8pYnJlYWsgZTtvLS0sdSs9bltzKytdPDxsLGwrPTh9aWYoci5mbGFncz11LDghPSgyNTUmci5mbGFncykpe2UubXNnPVwidW5rbm93biBjb21wcmVzc2lvbiBtZXRob2RcIixyLm1vZGU9MzA7YnJlYWt9aWYoNTczNDQmci5mbGFncyl7ZS5tc2c9XCJ1bmtub3duIGhlYWRlciBmbGFncyBzZXRcIixyLm1vZGU9MzA7YnJlYWt9ci5oZWFkJiYoci5oZWFkLnRleHQ9dT4+OCYxKSw1MTImci5mbGFncyYmKEVbMF09MjU1JnUsRVsxXT11Pj4+OCYyNTUsci5jaGVjaz1CKHIuY2hlY2ssRSwyLDApKSxsPXU9MCxyLm1vZGU9MztjYXNlIDM6Zm9yKDtsPDMyOyl7aWYoMD09PW8pYnJlYWsgZTtvLS0sdSs9bltzKytdPDxsLGwrPTh9ci5oZWFkJiYoci5oZWFkLnRpbWU9dSksNTEyJnIuZmxhZ3MmJihFWzBdPTI1NSZ1LEVbMV09dT4+PjgmMjU1LEVbMl09dT4+PjE2JjI1NSxFWzNdPXU+Pj4yNCYyNTUsci5jaGVjaz1CKHIuY2hlY2ssRSw0LDApKSxsPXU9MCxyLm1vZGU9NDtjYXNlIDQ6Zm9yKDtsPDE2Oyl7aWYoMD09PW8pYnJlYWsgZTtvLS0sdSs9bltzKytdPDxsLGwrPTh9ci5oZWFkJiYoci5oZWFkLnhmbGFncz0yNTUmdSxyLmhlYWQub3M9dT4+OCksNTEyJnIuZmxhZ3MmJihFWzBdPTI1NSZ1LEVbMV09dT4+PjgmMjU1LHIuY2hlY2s9QihyLmNoZWNrLEUsMiwwKSksbD11PTAsci5tb2RlPTU7Y2FzZSA1OmlmKDEwMjQmci5mbGFncyl7Zm9yKDtsPDE2Oyl7aWYoMD09PW8pYnJlYWsgZTtvLS0sdSs9bltzKytdPDxsLGwrPTh9ci5sZW5ndGg9dSxyLmhlYWQmJihyLmhlYWQuZXh0cmFfbGVuPXUpLDUxMiZyLmZsYWdzJiYoRVswXT0yNTUmdSxFWzFdPXU+Pj44JjI1NSxyLmNoZWNrPUIoci5jaGVjayxFLDIsMCkpLGw9dT0wfWVsc2Ugci5oZWFkJiYoci5oZWFkLmV4dHJhPW51bGwpO3IubW9kZT02O2Nhc2UgNjppZigxMDI0JnIuZmxhZ3MmJihvPChkPXIubGVuZ3RoKSYmKGQ9byksZCYmKHIuaGVhZCYmKGs9ci5oZWFkLmV4dHJhX2xlbi1yLmxlbmd0aCxyLmhlYWQuZXh0cmF8fChyLmhlYWQuZXh0cmE9bmV3IEFycmF5KHIuaGVhZC5leHRyYV9sZW4pKSxJLmFycmF5U2V0KHIuaGVhZC5leHRyYSxuLHMsZCxrKSksNTEyJnIuZmxhZ3MmJihyLmNoZWNrPUIoci5jaGVjayxuLGQscykpLG8tPWQscys9ZCxyLmxlbmd0aC09ZCksci5sZW5ndGgpKWJyZWFrIGU7ci5sZW5ndGg9MCxyLm1vZGU9NztjYXNlIDc6aWYoMjA0OCZyLmZsYWdzKXtpZigwPT09bylicmVhayBlO2ZvcihkPTA7az1uW3MrZCsrXSxyLmhlYWQmJmsmJnIubGVuZ3RoPDY1NTM2JiYoci5oZWFkLm5hbWUrPVN0cmluZy5mcm9tQ2hhckNvZGUoaykpLGsmJmQ8bzspO2lmKDUxMiZyLmZsYWdzJiYoci5jaGVjaz1CKHIuY2hlY2ssbixkLHMpKSxvLT1kLHMrPWQsaylicmVhayBlfWVsc2Ugci5oZWFkJiYoci5oZWFkLm5hbWU9bnVsbCk7ci5sZW5ndGg9MCxyLm1vZGU9ODtjYXNlIDg6aWYoNDA5NiZyLmZsYWdzKXtpZigwPT09bylicmVhayBlO2ZvcihkPTA7az1uW3MrZCsrXSxyLmhlYWQmJmsmJnIubGVuZ3RoPDY1NTM2JiYoci5oZWFkLmNvbW1lbnQrPVN0cmluZy5mcm9tQ2hhckNvZGUoaykpLGsmJmQ8bzspO2lmKDUxMiZyLmZsYWdzJiYoci5jaGVjaz1CKHIuY2hlY2ssbixkLHMpKSxvLT1kLHMrPWQsaylicmVhayBlfWVsc2Ugci5oZWFkJiYoci5oZWFkLmNvbW1lbnQ9bnVsbCk7ci5tb2RlPTk7Y2FzZSA5OmlmKDUxMiZyLmZsYWdzKXtmb3IoO2w8MTY7KXtpZigwPT09bylicmVhayBlO28tLSx1Kz1uW3MrK108PGwsbCs9OH1pZih1IT09KDY1NTM1JnIuY2hlY2spKXtlLm1zZz1cImhlYWRlciBjcmMgbWlzbWF0Y2hcIixyLm1vZGU9MzA7YnJlYWt9bD11PTB9ci5oZWFkJiYoci5oZWFkLmhjcmM9ci5mbGFncz4+OSYxLHIuaGVhZC5kb25lPSEwKSxlLmFkbGVyPXIuY2hlY2s9MCxyLm1vZGU9MTI7YnJlYWs7Y2FzZSAxMDpmb3IoO2w8MzI7KXtpZigwPT09bylicmVhayBlO28tLSx1Kz1uW3MrK108PGwsbCs9OH1lLmFkbGVyPXIuY2hlY2s9TCh1KSxsPXU9MCxyLm1vZGU9MTE7Y2FzZSAxMTppZigwPT09ci5oYXZlZGljdClyZXR1cm4gZS5uZXh0X291dD1hLGUuYXZhaWxfb3V0PWgsZS5uZXh0X2luPXMsZS5hdmFpbF9pbj1vLHIuaG9sZD11LHIuYml0cz1sLDI7ZS5hZGxlcj1yLmNoZWNrPTEsci5tb2RlPTEyO2Nhc2UgMTI6aWYoNT09PXR8fDY9PT10KWJyZWFrIGU7Y2FzZSAxMzppZihyLmxhc3Qpe3U+Pj49NyZsLGwtPTcmbCxyLm1vZGU9Mjc7YnJlYWt9Zm9yKDtsPDM7KXtpZigwPT09bylicmVhayBlO28tLSx1Kz1uW3MrK108PGwsbCs9OH1zd2l0Y2goci5sYXN0PTEmdSxsLT0xLDMmKHU+Pj49MSkpe2Nhc2UgMDpyLm1vZGU9MTQ7YnJlYWs7Y2FzZSAxOmlmKGoociksci5tb2RlPTIwLDYhPT10KWJyZWFrO3U+Pj49MixsLT0yO2JyZWFrIGU7Y2FzZSAyOnIubW9kZT0xNzticmVhaztjYXNlIDM6ZS5tc2c9XCJpbnZhbGlkIGJsb2NrIHR5cGVcIixyLm1vZGU9MzB9dT4+Pj0yLGwtPTI7YnJlYWs7Y2FzZSAxNDpmb3IodT4+Pj03JmwsbC09NyZsO2w8MzI7KXtpZigwPT09bylicmVhayBlO28tLSx1Kz1uW3MrK108PGwsbCs9OH1pZigoNjU1MzUmdSkhPSh1Pj4+MTZeNjU1MzUpKXtlLm1zZz1cImludmFsaWQgc3RvcmVkIGJsb2NrIGxlbmd0aHNcIixyLm1vZGU9MzA7YnJlYWt9aWYoci5sZW5ndGg9NjU1MzUmdSxsPXU9MCxyLm1vZGU9MTUsNj09PXQpYnJlYWsgZTtjYXNlIDE1OnIubW9kZT0xNjtjYXNlIDE2OmlmKGQ9ci5sZW5ndGgpe2lmKG88ZCYmKGQ9byksaDxkJiYoZD1oKSwwPT09ZClicmVhayBlO0kuYXJyYXlTZXQoaSxuLHMsZCxhKSxvLT1kLHMrPWQsaC09ZCxhKz1kLHIubGVuZ3RoLT1kO2JyZWFrfXIubW9kZT0xMjticmVhaztjYXNlIDE3OmZvcig7bDwxNDspe2lmKDA9PT1vKWJyZWFrIGU7by0tLHUrPW5bcysrXTw8bCxsKz04fWlmKHIubmxlbj0yNTcrKDMxJnUpLHU+Pj49NSxsLT01LHIubmRpc3Q9MSsoMzEmdSksdT4+Pj01LGwtPTUsci5uY29kZT00KygxNSZ1KSx1Pj4+PTQsbC09NCwyODY8ci5ubGVufHwzMDxyLm5kaXN0KXtlLm1zZz1cInRvbyBtYW55IGxlbmd0aCBvciBkaXN0YW5jZSBzeW1ib2xzXCIsci5tb2RlPTMwO2JyZWFrfXIuaGF2ZT0wLHIubW9kZT0xODtjYXNlIDE4OmZvcig7ci5oYXZlPHIubmNvZGU7KXtmb3IoO2w8Mzspe2lmKDA9PT1vKWJyZWFrIGU7by0tLHUrPW5bcysrXTw8bCxsKz04fXIubGVuc1tBW3IuaGF2ZSsrXV09NyZ1LHU+Pj49MyxsLT0zfWZvcig7ci5oYXZlPDE5OylyLmxlbnNbQVtyLmhhdmUrK11dPTA7aWYoci5sZW5jb2RlPXIubGVuZHluLHIubGVuYml0cz03LFM9e2JpdHM6ci5sZW5iaXRzfSx4PVQoMCxyLmxlbnMsMCwxOSxyLmxlbmNvZGUsMCxyLndvcmssUyksci5sZW5iaXRzPVMuYml0cyx4KXtlLm1zZz1cImludmFsaWQgY29kZSBsZW5ndGhzIHNldFwiLHIubW9kZT0zMDticmVha31yLmhhdmU9MCxyLm1vZGU9MTk7Y2FzZSAxOTpmb3IoO3IuaGF2ZTxyLm5sZW4rci5uZGlzdDspe2Zvcig7Zz0oQz1yLmxlbmNvZGVbdSYoMTw8ci5sZW5iaXRzKS0xXSk+Pj4xNiYyNTUsYj02NTUzNSZDLCEoKF89Qz4+PjI0KTw9bCk7KXtpZigwPT09bylicmVhayBlO28tLSx1Kz1uW3MrK108PGwsbCs9OH1pZihiPDE2KXU+Pj49XyxsLT1fLHIubGVuc1tyLmhhdmUrK109YjtlbHNle2lmKDE2PT09Yil7Zm9yKHo9XysyO2w8ejspe2lmKDA9PT1vKWJyZWFrIGU7by0tLHUrPW5bcysrXTw8bCxsKz04fWlmKHU+Pj49XyxsLT1fLDA9PT1yLmhhdmUpe2UubXNnPVwiaW52YWxpZCBiaXQgbGVuZ3RoIHJlcGVhdFwiLHIubW9kZT0zMDticmVha31rPXIubGVuc1tyLmhhdmUtMV0sZD0zKygzJnUpLHU+Pj49MixsLT0yfWVsc2UgaWYoMTc9PT1iKXtmb3Ioej1fKzM7bDx6Oyl7aWYoMD09PW8pYnJlYWsgZTtvLS0sdSs9bltzKytdPDxsLGwrPTh9bC09XyxrPTAsZD0zKyg3Jih1Pj4+PV8pKSx1Pj4+PTMsbC09M31lbHNle2Zvcih6PV8rNztsPHo7KXtpZigwPT09bylicmVhayBlO28tLSx1Kz1uW3MrK108PGwsbCs9OH1sLT1fLGs9MCxkPTExKygxMjcmKHU+Pj49XykpLHU+Pj49NyxsLT03fWlmKHIuaGF2ZStkPnIubmxlbityLm5kaXN0KXtlLm1zZz1cImludmFsaWQgYml0IGxlbmd0aCByZXBlYXRcIixyLm1vZGU9MzA7YnJlYWt9Zm9yKDtkLS07KXIubGVuc1tyLmhhdmUrK109a319aWYoMzA9PT1yLm1vZGUpYnJlYWs7aWYoMD09PXIubGVuc1syNTZdKXtlLm1zZz1cImludmFsaWQgY29kZSAtLSBtaXNzaW5nIGVuZC1vZi1ibG9ja1wiLHIubW9kZT0zMDticmVha31pZihyLmxlbmJpdHM9OSxTPXtiaXRzOnIubGVuYml0c30seD1UKEQsci5sZW5zLDAsci5ubGVuLHIubGVuY29kZSwwLHIud29yayxTKSxyLmxlbmJpdHM9Uy5iaXRzLHgpe2UubXNnPVwiaW52YWxpZCBsaXRlcmFsL2xlbmd0aHMgc2V0XCIsci5tb2RlPTMwO2JyZWFrfWlmKHIuZGlzdGJpdHM9NixyLmRpc3Rjb2RlPXIuZGlzdGR5bixTPXtiaXRzOnIuZGlzdGJpdHN9LHg9VChGLHIubGVucyxyLm5sZW4sci5uZGlzdCxyLmRpc3Rjb2RlLDAsci53b3JrLFMpLHIuZGlzdGJpdHM9Uy5iaXRzLHgpe2UubXNnPVwiaW52YWxpZCBkaXN0YW5jZXMgc2V0XCIsci5tb2RlPTMwO2JyZWFrfWlmKHIubW9kZT0yMCw2PT09dClicmVhayBlO2Nhc2UgMjA6ci5tb2RlPTIxO2Nhc2UgMjE6aWYoNjw9byYmMjU4PD1oKXtlLm5leHRfb3V0PWEsZS5hdmFpbF9vdXQ9aCxlLm5leHRfaW49cyxlLmF2YWlsX2luPW8sci5ob2xkPXUsci5iaXRzPWwsUihlLGMpLGE9ZS5uZXh0X291dCxpPWUub3V0cHV0LGg9ZS5hdmFpbF9vdXQscz1lLm5leHRfaW4sbj1lLmlucHV0LG89ZS5hdmFpbF9pbix1PXIuaG9sZCxsPXIuYml0cywxMj09PXIubW9kZSYmKHIuYmFjaz0tMSk7YnJlYWt9Zm9yKHIuYmFjaz0wO2c9KEM9ci5sZW5jb2RlW3UmKDE8PHIubGVuYml0cyktMV0pPj4+MTYmMjU1LGI9NjU1MzUmQywhKChfPUM+Pj4yNCk8PWwpOyl7aWYoMD09PW8pYnJlYWsgZTtvLS0sdSs9bltzKytdPDxsLGwrPTh9aWYoZyYmMD09KDI0MCZnKSl7Zm9yKHY9Xyx5PWcsdz1iO2c9KEM9ci5sZW5jb2RlW3crKCh1JigxPDx2K3kpLTEpPj52KV0pPj4+MTYmMjU1LGI9NjU1MzUmQywhKHYrKF89Qz4+PjI0KTw9bCk7KXtpZigwPT09bylicmVhayBlO28tLSx1Kz1uW3MrK108PGwsbCs9OH11Pj4+PXYsbC09dixyLmJhY2srPXZ9aWYodT4+Pj1fLGwtPV8sci5iYWNrKz1fLHIubGVuZ3RoPWIsMD09PWcpe3IubW9kZT0yNjticmVha31pZigzMiZnKXtyLmJhY2s9LTEsci5tb2RlPTEyO2JyZWFrfWlmKDY0Jmcpe2UubXNnPVwiaW52YWxpZCBsaXRlcmFsL2xlbmd0aCBjb2RlXCIsci5tb2RlPTMwO2JyZWFrfXIuZXh0cmE9MTUmZyxyLm1vZGU9MjI7Y2FzZSAyMjppZihyLmV4dHJhKXtmb3Ioej1yLmV4dHJhO2w8ejspe2lmKDA9PT1vKWJyZWFrIGU7by0tLHUrPW5bcysrXTw8bCxsKz04fXIubGVuZ3RoKz11JigxPDxyLmV4dHJhKS0xLHU+Pj49ci5leHRyYSxsLT1yLmV4dHJhLHIuYmFjays9ci5leHRyYX1yLndhcz1yLmxlbmd0aCxyLm1vZGU9MjM7Y2FzZSAyMzpmb3IoO2c9KEM9ci5kaXN0Y29kZVt1JigxPDxyLmRpc3RiaXRzKS0xXSk+Pj4xNiYyNTUsYj02NTUzNSZDLCEoKF89Qz4+PjI0KTw9bCk7KXtpZigwPT09bylicmVhayBlO28tLSx1Kz1uW3MrK108PGwsbCs9OH1pZigwPT0oMjQwJmcpKXtmb3Iodj1fLHk9Zyx3PWI7Zz0oQz1yLmRpc3Rjb2RlW3crKCh1JigxPDx2K3kpLTEpPj52KV0pPj4+MTYmMjU1LGI9NjU1MzUmQywhKHYrKF89Qz4+PjI0KTw9bCk7KXtpZigwPT09bylicmVhayBlO28tLSx1Kz1uW3MrK108PGwsbCs9OH11Pj4+PXYsbC09dixyLmJhY2srPXZ9aWYodT4+Pj1fLGwtPV8sci5iYWNrKz1fLDY0Jmcpe2UubXNnPVwiaW52YWxpZCBkaXN0YW5jZSBjb2RlXCIsci5tb2RlPTMwO2JyZWFrfXIub2Zmc2V0PWIsci5leHRyYT0xNSZnLHIubW9kZT0yNDtjYXNlIDI0OmlmKHIuZXh0cmEpe2Zvcih6PXIuZXh0cmE7bDx6Oyl7aWYoMD09PW8pYnJlYWsgZTtvLS0sdSs9bltzKytdPDxsLGwrPTh9ci5vZmZzZXQrPXUmKDE8PHIuZXh0cmEpLTEsdT4+Pj1yLmV4dHJhLGwtPXIuZXh0cmEsci5iYWNrKz1yLmV4dHJhfWlmKHIub2Zmc2V0PnIuZG1heCl7ZS5tc2c9XCJpbnZhbGlkIGRpc3RhbmNlIHRvbyBmYXIgYmFja1wiLHIubW9kZT0zMDticmVha31yLm1vZGU9MjU7Y2FzZSAyNTppZigwPT09aClicmVhayBlO2lmKGQ9Yy1oLHIub2Zmc2V0PmQpe2lmKChkPXIub2Zmc2V0LWQpPnIud2hhdmUmJnIuc2FuZSl7ZS5tc2c9XCJpbnZhbGlkIGRpc3RhbmNlIHRvbyBmYXIgYmFja1wiLHIubW9kZT0zMDticmVha31wPWQ+ci53bmV4dD8oZC09ci53bmV4dCxyLndzaXplLWQpOnIud25leHQtZCxkPnIubGVuZ3RoJiYoZD1yLmxlbmd0aCksbT1yLndpbmRvd31lbHNlIG09aSxwPWEtci5vZmZzZXQsZD1yLmxlbmd0aDtmb3IoaDxkJiYoZD1oKSxoLT1kLHIubGVuZ3RoLT1kO2lbYSsrXT1tW3ArK10sLS1kOyk7MD09PXIubGVuZ3RoJiYoci5tb2RlPTIxKTticmVhaztjYXNlIDI2OmlmKDA9PT1oKWJyZWFrIGU7aVthKytdPXIubGVuZ3RoLGgtLSxyLm1vZGU9MjE7YnJlYWs7Y2FzZSAyNzppZihyLndyYXApe2Zvcig7bDwzMjspe2lmKDA9PT1vKWJyZWFrIGU7by0tLHV8PW5bcysrXTw8bCxsKz04fWlmKGMtPWgsZS50b3RhbF9vdXQrPWMsci50b3RhbCs9YyxjJiYoZS5hZGxlcj1yLmNoZWNrPXIuZmxhZ3M/QihyLmNoZWNrLGksYyxhLWMpOk8oci5jaGVjayxpLGMsYS1jKSksYz1oLChyLmZsYWdzP3U6TCh1KSkhPT1yLmNoZWNrKXtlLm1zZz1cImluY29ycmVjdCBkYXRhIGNoZWNrXCIsci5tb2RlPTMwO2JyZWFrfWw9dT0wfXIubW9kZT0yODtjYXNlIDI4OmlmKHIud3JhcCYmci5mbGFncyl7Zm9yKDtsPDMyOyl7aWYoMD09PW8pYnJlYWsgZTtvLS0sdSs9bltzKytdPDxsLGwrPTh9aWYodSE9PSg0Mjk0OTY3Mjk1JnIudG90YWwpKXtlLm1zZz1cImluY29ycmVjdCBsZW5ndGggY2hlY2tcIixyLm1vZGU9MzA7YnJlYWt9bD11PTB9ci5tb2RlPTI5O2Nhc2UgMjk6eD0xO2JyZWFrIGU7Y2FzZSAzMDp4PS0zO2JyZWFrIGU7Y2FzZSAzMTpyZXR1cm4tNDtjYXNlIDMyOmRlZmF1bHQ6cmV0dXJuIFV9cmV0dXJuIGUubmV4dF9vdXQ9YSxlLmF2YWlsX291dD1oLGUubmV4dF9pbj1zLGUuYXZhaWxfaW49byxyLmhvbGQ9dSxyLmJpdHM9bCwoci53c2l6ZXx8YyE9PWUuYXZhaWxfb3V0JiZyLm1vZGU8MzAmJihyLm1vZGU8Mjd8fDQhPT10KSkmJlooZSxlLm91dHB1dCxlLm5leHRfb3V0LGMtZS5hdmFpbF9vdXQpPyhyLm1vZGU9MzEsLTQpOihmLT1lLmF2YWlsX2luLGMtPWUuYXZhaWxfb3V0LGUudG90YWxfaW4rPWYsZS50b3RhbF9vdXQrPWMsci50b3RhbCs9YyxyLndyYXAmJmMmJihlLmFkbGVyPXIuY2hlY2s9ci5mbGFncz9CKHIuY2hlY2ssaSxjLGUubmV4dF9vdXQtYyk6TyhyLmNoZWNrLGksYyxlLm5leHRfb3V0LWMpKSxlLmRhdGFfdHlwZT1yLmJpdHMrKHIubGFzdD82NDowKSsoMTI9PT1yLm1vZGU/MTI4OjApKygyMD09PXIubW9kZXx8MTU9PT1yLm1vZGU/MjU2OjApLCgwPT1mJiYwPT09Y3x8ND09PXQpJiZ4PT09TiYmKHg9LTUpLHgpfSxyLmluZmxhdGVFbmQ9ZnVuY3Rpb24oZSl7aWYoIWV8fCFlLnN0YXRlKXJldHVybiBVO3ZhciB0PWUuc3RhdGU7cmV0dXJuIHQud2luZG93JiYodC53aW5kb3c9bnVsbCksZS5zdGF0ZT1udWxsLE59LHIuaW5mbGF0ZUdldEhlYWRlcj1mdW5jdGlvbihlLHQpe3ZhciByO3JldHVybiBlJiZlLnN0YXRlPzA9PSgyJihyPWUuc3RhdGUpLndyYXApP1U6KChyLmhlYWQ9dCkuZG9uZT0hMSxOKTpVfSxyLmluZmxhdGVTZXREaWN0aW9uYXJ5PWZ1bmN0aW9uKGUsdCl7dmFyIHIsbj10Lmxlbmd0aDtyZXR1cm4gZSYmZS5zdGF0ZT8wIT09KHI9ZS5zdGF0ZSkud3JhcCYmMTEhPT1yLm1vZGU/VToxMT09PXIubW9kZSYmTygxLHQsbiwwKSE9PXIuY2hlY2s/LTM6WihlLHQsbixuKT8oci5tb2RlPTMxLC00KTooci5oYXZlZGljdD0xLE4pOlV9LHIuaW5mbGF0ZUluZm89XCJwYWtvIGluZmxhdGUgKGZyb20gTm9kZWNhIHByb2plY3QpXCJ9LHtcIi4uL3V0aWxzL2NvbW1vblwiOjQxLFwiLi9hZGxlcjMyXCI6NDMsXCIuL2NyYzMyXCI6NDUsXCIuL2luZmZhc3RcIjo0OCxcIi4vaW5mdHJlZXNcIjo1MH1dLDUwOltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7dmFyIEQ9ZShcIi4uL3V0aWxzL2NvbW1vblwiKSxGPVszLDQsNSw2LDcsOCw5LDEwLDExLDEzLDE1LDE3LDE5LDIzLDI3LDMxLDM1LDQzLDUxLDU5LDY3LDgzLDk5LDExNSwxMzEsMTYzLDE5NSwyMjcsMjU4LDAsMF0sTj1bMTYsMTYsMTYsMTYsMTYsMTYsMTYsMTYsMTcsMTcsMTcsMTcsMTgsMTgsMTgsMTgsMTksMTksMTksMTksMjAsMjAsMjAsMjAsMjEsMjEsMjEsMjEsMTYsNzIsNzhdLFU9WzEsMiwzLDQsNSw3LDksMTMsMTcsMjUsMzMsNDksNjUsOTcsMTI5LDE5MywyNTcsMzg1LDUxMyw3NjksMTAyNSwxNTM3LDIwNDksMzA3Myw0MDk3LDYxNDUsODE5MywxMjI4OSwxNjM4NSwyNDU3NywwLDBdLFA9WzE2LDE2LDE2LDE2LDE3LDE3LDE4LDE4LDE5LDE5LDIwLDIwLDIxLDIxLDIyLDIyLDIzLDIzLDI0LDI0LDI1LDI1LDI2LDI2LDI3LDI3LDI4LDI4LDI5LDI5LDY0LDY0XTt0LmV4cG9ydHM9ZnVuY3Rpb24oZSx0LHIsbixpLHMsYSxvKXt2YXIgaCx1LGwsZixjLGQscCxtLF8sZz1vLmJpdHMsYj0wLHY9MCx5PTAsdz0wLGs9MCx4PTAsUz0wLHo9MCxDPTAsRT0wLEE9bnVsbCxJPTAsTz1uZXcgRC5CdWYxNigxNiksQj1uZXcgRC5CdWYxNigxNiksUj1udWxsLFQ9MDtmb3IoYj0wO2I8PTE1O2IrKylPW2JdPTA7Zm9yKHY9MDt2PG47disrKU9bdFtyK3ZdXSsrO2ZvcihrPWcsdz0xNTsxPD13JiYwPT09T1t3XTt3LS0pO2lmKHc8ayYmKGs9dyksMD09PXcpcmV0dXJuIGlbcysrXT0yMDk3MTUyMCxpW3MrK109MjA5NzE1MjAsby5iaXRzPTEsMDtmb3IoeT0xO3k8dyYmMD09PU9beV07eSsrKTtmb3Ioazx5JiYoaz15KSxiPXo9MTtiPD0xNTtiKyspaWYoejw8PTEsKHotPU9bYl0pPDApcmV0dXJuLTE7aWYoMDx6JiYoMD09PWV8fDEhPT13KSlyZXR1cm4tMTtmb3IoQlsxXT0wLGI9MTtiPDE1O2IrKylCW2IrMV09QltiXStPW2JdO2Zvcih2PTA7djxuO3YrKykwIT09dFtyK3ZdJiYoYVtCW3Rbcit2XV0rK109dik7aWYoZD0wPT09ZT8oQT1SPWEsMTkpOjE9PT1lPyhBPUYsSS09MjU3LFI9TixULT0yNTcsMjU2KTooQT1VLFI9UCwtMSksYj15LGM9cyxTPXY9RT0wLGw9LTEsZj0oQz0xPDwoeD1rKSktMSwxPT09ZSYmODUyPEN8fDI9PT1lJiY1OTI8QylyZXR1cm4gMTtmb3IoOzspe2ZvcihwPWItUyxfPWFbdl08ZD8obT0wLGFbdl0pOmFbdl0+ZD8obT1SW1QrYVt2XV0sQVtJK2Fbdl1dKToobT05NiwwKSxoPTE8PGItUyx5PXU9MTw8eDtpW2MrKEU+PlMpKyh1LT1oKV09cDw8MjR8bTw8MTZ8X3wwLDAhPT11Oyk7Zm9yKGg9MTw8Yi0xO0UmaDspaD4+PTE7aWYoMCE9PWg/KEUmPWgtMSxFKz1oKTpFPTAsdisrLDA9PS0tT1tiXSl7aWYoYj09PXcpYnJlYWs7Yj10W3IrYVt2XV19aWYoazxiJiYoRSZmKSE9PWwpe2ZvcigwPT09UyYmKFM9ayksYys9eSx6PTE8PCh4PWItUyk7eCtTPHcmJiEoKHotPU9beCtTXSk8PTApOyl4Kyssejw8PTE7aWYoQys9MTw8eCwxPT09ZSYmODUyPEN8fDI9PT1lJiY1OTI8QylyZXR1cm4gMTtpW2w9RSZmXT1rPDwyNHx4PDwxNnxjLXN8MH19cmV0dXJuIDAhPT1FJiYoaVtjK0VdPWItUzw8MjR8NjQ8PDE2fDApLG8uYml0cz1rLDB9fSx7XCIuLi91dGlscy9jb21tb25cIjo0MX1dLDUxOltmdW5jdGlvbihlLHQscil7XCJ1c2Ugc3RyaWN0XCI7dC5leHBvcnRzPXsyOlwibmVlZCBkaWN0aW9uYXJ5XCIsMTpcInN0cmVhbSBlbmRcIiwwOlwiXCIsXCItMVwiOlwiZmlsZSBlcnJvclwiLFwiLTJcIjpcInN0cmVhbSBlcnJvclwiLFwiLTNcIjpcImRhdGEgZXJyb3JcIixcIi00XCI6XCJpbnN1ZmZpY2llbnQgbWVtb3J5XCIsXCItNVwiOlwiYnVmZmVyIGVycm9yXCIsXCItNlwiOlwiaW5jb21wYXRpYmxlIHZlcnNpb25cIn19LHt9XSw1MjpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3ZhciBpPWUoXCIuLi91dGlscy9jb21tb25cIiksbz0wLGg9MTtmdW5jdGlvbiBuKGUpe2Zvcih2YXIgdD1lLmxlbmd0aDswPD0tLXQ7KWVbdF09MH12YXIgcz0wLGE9MjksdT0yNTYsbD11KzErYSxmPTMwLGM9MTksXz0yKmwrMSxnPTE1LGQ9MTYscD03LG09MjU2LGI9MTYsdj0xNyx5PTE4LHc9WzAsMCwwLDAsMCwwLDAsMCwxLDEsMSwxLDIsMiwyLDIsMywzLDMsMyw0LDQsNCw0LDUsNSw1LDUsMF0saz1bMCwwLDAsMCwxLDEsMiwyLDMsMyw0LDQsNSw1LDYsNiw3LDcsOCw4LDksOSwxMCwxMCwxMSwxMSwxMiwxMiwxMywxM10seD1bMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwyLDMsN10sUz1bMTYsMTcsMTgsMCw4LDcsOSw2LDEwLDUsMTEsNCwxMiwzLDEzLDIsMTQsMSwxNV0sej1uZXcgQXJyYXkoMioobCsyKSk7bih6KTt2YXIgQz1uZXcgQXJyYXkoMipmKTtuKEMpO3ZhciBFPW5ldyBBcnJheSg1MTIpO24oRSk7dmFyIEE9bmV3IEFycmF5KDI1Nik7bihBKTt2YXIgST1uZXcgQXJyYXkoYSk7bihJKTt2YXIgTyxCLFIsVD1uZXcgQXJyYXkoZik7ZnVuY3Rpb24gRChlLHQscixuLGkpe3RoaXMuc3RhdGljX3RyZWU9ZSx0aGlzLmV4dHJhX2JpdHM9dCx0aGlzLmV4dHJhX2Jhc2U9cix0aGlzLmVsZW1zPW4sdGhpcy5tYXhfbGVuZ3RoPWksdGhpcy5oYXNfc3RyZWU9ZSYmZS5sZW5ndGh9ZnVuY3Rpb24gRihlLHQpe3RoaXMuZHluX3RyZWU9ZSx0aGlzLm1heF9jb2RlPTAsdGhpcy5zdGF0X2Rlc2M9dH1mdW5jdGlvbiBOKGUpe3JldHVybiBlPDI1Nj9FW2VdOkVbMjU2KyhlPj4+NyldfWZ1bmN0aW9uIFUoZSx0KXtlLnBlbmRpbmdfYnVmW2UucGVuZGluZysrXT0yNTUmdCxlLnBlbmRpbmdfYnVmW2UucGVuZGluZysrXT10Pj4+OCYyNTV9ZnVuY3Rpb24gUChlLHQscil7ZS5iaV92YWxpZD5kLXI/KGUuYmlfYnVmfD10PDxlLmJpX3ZhbGlkJjY1NTM1LFUoZSxlLmJpX2J1ZiksZS5iaV9idWY9dD4+ZC1lLmJpX3ZhbGlkLGUuYmlfdmFsaWQrPXItZCk6KGUuYmlfYnVmfD10PDxlLmJpX3ZhbGlkJjY1NTM1LGUuYmlfdmFsaWQrPXIpfWZ1bmN0aW9uIEwoZSx0LHIpe1AoZSxyWzIqdF0sclsyKnQrMV0pfWZ1bmN0aW9uIGooZSx0KXtmb3IodmFyIHI9MDtyfD0xJmUsZT4+Pj0xLHI8PD0xLDA8LS10Oyk7cmV0dXJuIHI+Pj4xfWZ1bmN0aW9uIFooZSx0LHIpe3ZhciBuLGkscz1uZXcgQXJyYXkoZysxKSxhPTA7Zm9yKG49MTtuPD1nO24rKylzW25dPWE9YStyW24tMV08PDE7Zm9yKGk9MDtpPD10O2krKyl7dmFyIG89ZVsyKmkrMV07MCE9PW8mJihlWzIqaV09aihzW29dKyssbykpfX1mdW5jdGlvbiBXKGUpe3ZhciB0O2Zvcih0PTA7dDxsO3QrKyllLmR5bl9sdHJlZVsyKnRdPTA7Zm9yKHQ9MDt0PGY7dCsrKWUuZHluX2R0cmVlWzIqdF09MDtmb3IodD0wO3Q8Yzt0KyspZS5ibF90cmVlWzIqdF09MDtlLmR5bl9sdHJlZVsyKm1dPTEsZS5vcHRfbGVuPWUuc3RhdGljX2xlbj0wLGUubGFzdF9saXQ9ZS5tYXRjaGVzPTB9ZnVuY3Rpb24gTShlKXs4PGUuYmlfdmFsaWQ/VShlLGUuYmlfYnVmKTowPGUuYmlfdmFsaWQmJihlLnBlbmRpbmdfYnVmW2UucGVuZGluZysrXT1lLmJpX2J1ZiksZS5iaV9idWY9MCxlLmJpX3ZhbGlkPTB9ZnVuY3Rpb24gSChlLHQscixuKXt2YXIgaT0yKnQscz0yKnI7cmV0dXJuIGVbaV08ZVtzXXx8ZVtpXT09PWVbc10mJm5bdF08PW5bcl19ZnVuY3Rpb24gRyhlLHQscil7Zm9yKHZhciBuPWUuaGVhcFtyXSxpPXI8PDE7aTw9ZS5oZWFwX2xlbiYmKGk8ZS5oZWFwX2xlbiYmSCh0LGUuaGVhcFtpKzFdLGUuaGVhcFtpXSxlLmRlcHRoKSYmaSsrLCFIKHQsbixlLmhlYXBbaV0sZS5kZXB0aCkpOyllLmhlYXBbcl09ZS5oZWFwW2ldLHI9aSxpPDw9MTtlLmhlYXBbcl09bn1mdW5jdGlvbiBLKGUsdCxyKXt2YXIgbixpLHMsYSxvPTA7aWYoMCE9PWUubGFzdF9saXQpZm9yKDtuPWUucGVuZGluZ19idWZbZS5kX2J1ZisyKm9dPDw4fGUucGVuZGluZ19idWZbZS5kX2J1ZisyKm8rMV0saT1lLnBlbmRpbmdfYnVmW2UubF9idWYrb10sbysrLDA9PT1uP0woZSxpLHQpOihMKGUsKHM9QVtpXSkrdSsxLHQpLDAhPT0oYT13W3NdKSYmUChlLGktPUlbc10sYSksTChlLHM9TigtLW4pLHIpLDAhPT0oYT1rW3NdKSYmUChlLG4tPVRbc10sYSkpLG88ZS5sYXN0X2xpdDspO0woZSxtLHQpfWZ1bmN0aW9uIFkoZSx0KXt2YXIgcixuLGkscz10LmR5bl90cmVlLGE9dC5zdGF0X2Rlc2Muc3RhdGljX3RyZWUsbz10LnN0YXRfZGVzYy5oYXNfc3RyZWUsaD10LnN0YXRfZGVzYy5lbGVtcyx1PS0xO2ZvcihlLmhlYXBfbGVuPTAsZS5oZWFwX21heD1fLHI9MDtyPGg7cisrKTAhPT1zWzIqcl0/KGUuaGVhcFsrK2UuaGVhcF9sZW5dPXU9cixlLmRlcHRoW3JdPTApOnNbMipyKzFdPTA7Zm9yKDtlLmhlYXBfbGVuPDI7KXNbMiooaT1lLmhlYXBbKytlLmhlYXBfbGVuXT11PDI/Kyt1OjApXT0xLGUuZGVwdGhbaV09MCxlLm9wdF9sZW4tLSxvJiYoZS5zdGF0aWNfbGVuLT1hWzIqaSsxXSk7Zm9yKHQubWF4X2NvZGU9dSxyPWUuaGVhcF9sZW4+PjE7MTw9cjtyLS0pRyhlLHMscik7Zm9yKGk9aDtyPWUuaGVhcFsxXSxlLmhlYXBbMV09ZS5oZWFwW2UuaGVhcF9sZW4tLV0sRyhlLHMsMSksbj1lLmhlYXBbMV0sZS5oZWFwWy0tZS5oZWFwX21heF09cixlLmhlYXBbLS1lLmhlYXBfbWF4XT1uLHNbMippXT1zWzIqcl0rc1syKm5dLGUuZGVwdGhbaV09KGUuZGVwdGhbcl0+PWUuZGVwdGhbbl0/ZS5kZXB0aFtyXTplLmRlcHRoW25dKSsxLHNbMipyKzFdPXNbMipuKzFdPWksZS5oZWFwWzFdPWkrKyxHKGUscywxKSwyPD1lLmhlYXBfbGVuOyk7ZS5oZWFwWy0tZS5oZWFwX21heF09ZS5oZWFwWzFdLGZ1bmN0aW9uKGUsdCl7dmFyIHIsbixpLHMsYSxvLGg9dC5keW5fdHJlZSx1PXQubWF4X2NvZGUsbD10LnN0YXRfZGVzYy5zdGF0aWNfdHJlZSxmPXQuc3RhdF9kZXNjLmhhc19zdHJlZSxjPXQuc3RhdF9kZXNjLmV4dHJhX2JpdHMsZD10LnN0YXRfZGVzYy5leHRyYV9iYXNlLHA9dC5zdGF0X2Rlc2MubWF4X2xlbmd0aCxtPTA7Zm9yKHM9MDtzPD1nO3MrKyllLmJsX2NvdW50W3NdPTA7Zm9yKGhbMiplLmhlYXBbZS5oZWFwX21heF0rMV09MCxyPWUuaGVhcF9tYXgrMTtyPF87cisrKXA8KHM9aFsyKmhbMioobj1lLmhlYXBbcl0pKzFdKzFdKzEpJiYocz1wLG0rKyksaFsyKm4rMV09cyx1PG58fChlLmJsX2NvdW50W3NdKyssYT0wLGQ8PW4mJihhPWNbbi1kXSksbz1oWzIqbl0sZS5vcHRfbGVuKz1vKihzK2EpLGYmJihlLnN0YXRpY19sZW4rPW8qKGxbMipuKzFdK2EpKSk7aWYoMCE9PW0pe2Rve2ZvcihzPXAtMTswPT09ZS5ibF9jb3VudFtzXTspcy0tO2UuYmxfY291bnRbc10tLSxlLmJsX2NvdW50W3MrMV0rPTIsZS5ibF9jb3VudFtwXS0tLG0tPTJ9d2hpbGUoMDxtKTtmb3Iocz1wOzAhPT1zO3MtLSlmb3Iobj1lLmJsX2NvdW50W3NdOzAhPT1uOyl1PChpPWUuaGVhcFstLXJdKXx8KGhbMippKzFdIT09cyYmKGUub3B0X2xlbis9KHMtaFsyKmkrMV0pKmhbMippXSxoWzIqaSsxXT1zKSxuLS0pfX0oZSx0KSxaKHMsdSxlLmJsX2NvdW50KX1mdW5jdGlvbiBYKGUsdCxyKXt2YXIgbixpLHM9LTEsYT10WzFdLG89MCxoPTcsdT00O2ZvcigwPT09YSYmKGg9MTM4LHU9MyksdFsyKihyKzEpKzFdPTY1NTM1LG49MDtuPD1yO24rKylpPWEsYT10WzIqKG4rMSkrMV0sKytvPGgmJmk9PT1hfHwobzx1P2UuYmxfdHJlZVsyKmldKz1vOjAhPT1pPyhpIT09cyYmZS5ibF90cmVlWzIqaV0rKyxlLmJsX3RyZWVbMipiXSsrKTpvPD0xMD9lLmJsX3RyZWVbMip2XSsrOmUuYmxfdHJlZVsyKnldKysscz1pLHU9KG89MCk9PT1hPyhoPTEzOCwzKTppPT09YT8oaD02LDMpOihoPTcsNCkpfWZ1bmN0aW9uIFYoZSx0LHIpe3ZhciBuLGkscz0tMSxhPXRbMV0sbz0wLGg9Nyx1PTQ7Zm9yKDA9PT1hJiYoaD0xMzgsdT0zKSxuPTA7bjw9cjtuKyspaWYoaT1hLGE9dFsyKihuKzEpKzFdLCEoKytvPGgmJmk9PT1hKSl7aWYobzx1KWZvcig7TChlLGksZS5ibF90cmVlKSwwIT0tLW87KTtlbHNlIDAhPT1pPyhpIT09cyYmKEwoZSxpLGUuYmxfdHJlZSksby0tKSxMKGUsYixlLmJsX3RyZWUpLFAoZSxvLTMsMikpOm88PTEwPyhMKGUsdixlLmJsX3RyZWUpLFAoZSxvLTMsMykpOihMKGUseSxlLmJsX3RyZWUpLFAoZSxvLTExLDcpKTtzPWksdT0obz0wKT09PWE/KGg9MTM4LDMpOmk9PT1hPyhoPTYsMyk6KGg9Nyw0KX19bihUKTt2YXIgcT0hMTtmdW5jdGlvbiBKKGUsdCxyLG4pe1AoZSwoczw8MSkrKG4/MTowKSwzKSxmdW5jdGlvbihlLHQscixuKXtNKGUpLG4mJihVKGUsciksVShlLH5yKSksaS5hcnJheVNldChlLnBlbmRpbmdfYnVmLGUud2luZG93LHQscixlLnBlbmRpbmcpLGUucGVuZGluZys9cn0oZSx0LHIsITApfXIuX3RyX2luaXQ9ZnVuY3Rpb24oZSl7cXx8KGZ1bmN0aW9uKCl7dmFyIGUsdCxyLG4saSxzPW5ldyBBcnJheShnKzEpO2ZvcihuPXI9MDtuPGEtMTtuKyspZm9yKElbbl09cixlPTA7ZTwxPDx3W25dO2UrKylBW3IrK109bjtmb3IoQVtyLTFdPW4sbj1pPTA7bjwxNjtuKyspZm9yKFRbbl09aSxlPTA7ZTwxPDxrW25dO2UrKylFW2krK109bjtmb3IoaT4+PTc7bjxmO24rKylmb3IoVFtuXT1pPDw3LGU9MDtlPDE8PGtbbl0tNztlKyspRVsyNTYraSsrXT1uO2Zvcih0PTA7dDw9Zzt0Kyspc1t0XT0wO2ZvcihlPTA7ZTw9MTQzOyl6WzIqZSsxXT04LGUrKyxzWzhdKys7Zm9yKDtlPD0yNTU7KXpbMiplKzFdPTksZSsrLHNbOV0rKztmb3IoO2U8PTI3OTspelsyKmUrMV09NyxlKyssc1s3XSsrO2Zvcig7ZTw9Mjg3Oyl6WzIqZSsxXT04LGUrKyxzWzhdKys7Zm9yKFooeixsKzEscyksZT0wO2U8ZjtlKyspQ1syKmUrMV09NSxDWzIqZV09aihlLDUpO089bmV3IEQoeix3LHUrMSxsLGcpLEI9bmV3IEQoQyxrLDAsZixnKSxSPW5ldyBEKG5ldyBBcnJheSgwKSx4LDAsYyxwKX0oKSxxPSEwKSxlLmxfZGVzYz1uZXcgRihlLmR5bl9sdHJlZSxPKSxlLmRfZGVzYz1uZXcgRihlLmR5bl9kdHJlZSxCKSxlLmJsX2Rlc2M9bmV3IEYoZS5ibF90cmVlLFIpLGUuYmlfYnVmPTAsZS5iaV92YWxpZD0wLFcoZSl9LHIuX3RyX3N0b3JlZF9ibG9jaz1KLHIuX3RyX2ZsdXNoX2Jsb2NrPWZ1bmN0aW9uKGUsdCxyLG4pe3ZhciBpLHMsYT0wOzA8ZS5sZXZlbD8oMj09PWUuc3RybS5kYXRhX3R5cGUmJihlLnN0cm0uZGF0YV90eXBlPWZ1bmN0aW9uKGUpe3ZhciB0LHI9NDA5MzYyNDQ0Nztmb3IodD0wO3Q8PTMxO3QrKyxyPj4+PTEpaWYoMSZyJiYwIT09ZS5keW5fbHRyZWVbMip0XSlyZXR1cm4gbztpZigwIT09ZS5keW5fbHRyZWVbMThdfHwwIT09ZS5keW5fbHRyZWVbMjBdfHwwIT09ZS5keW5fbHRyZWVbMjZdKXJldHVybiBoO2Zvcih0PTMyO3Q8dTt0KyspaWYoMCE9PWUuZHluX2x0cmVlWzIqdF0pcmV0dXJuIGg7cmV0dXJuIG99KGUpKSxZKGUsZS5sX2Rlc2MpLFkoZSxlLmRfZGVzYyksYT1mdW5jdGlvbihlKXt2YXIgdDtmb3IoWChlLGUuZHluX2x0cmVlLGUubF9kZXNjLm1heF9jb2RlKSxYKGUsZS5keW5fZHRyZWUsZS5kX2Rlc2MubWF4X2NvZGUpLFkoZSxlLmJsX2Rlc2MpLHQ9Yy0xOzM8PXQmJjA9PT1lLmJsX3RyZWVbMipTW3RdKzFdO3QtLSk7cmV0dXJuIGUub3B0X2xlbis9MyoodCsxKSs1KzUrNCx0fShlKSxpPWUub3B0X2xlbiszKzc+Pj4zLChzPWUuc3RhdGljX2xlbiszKzc+Pj4zKTw9aSYmKGk9cykpOmk9cz1yKzUscis0PD1pJiYtMSE9PXQ/SihlLHQscixuKTo0PT09ZS5zdHJhdGVneXx8cz09PWk/KFAoZSwyKyhuPzE6MCksMyksSyhlLHosQykpOihQKGUsNCsobj8xOjApLDMpLGZ1bmN0aW9uKGUsdCxyLG4pe3ZhciBpO2ZvcihQKGUsdC0yNTcsNSksUChlLHItMSw1KSxQKGUsbi00LDQpLGk9MDtpPG47aSsrKVAoZSxlLmJsX3RyZWVbMipTW2ldKzFdLDMpO1YoZSxlLmR5bl9sdHJlZSx0LTEpLFYoZSxlLmR5bl9kdHJlZSxyLTEpfShlLGUubF9kZXNjLm1heF9jb2RlKzEsZS5kX2Rlc2MubWF4X2NvZGUrMSxhKzEpLEsoZSxlLmR5bl9sdHJlZSxlLmR5bl9kdHJlZSkpLFcoZSksbiYmTShlKX0sci5fdHJfdGFsbHk9ZnVuY3Rpb24oZSx0LHIpe3JldHVybiBlLnBlbmRpbmdfYnVmW2UuZF9idWYrMiplLmxhc3RfbGl0XT10Pj4+OCYyNTUsZS5wZW5kaW5nX2J1ZltlLmRfYnVmKzIqZS5sYXN0X2xpdCsxXT0yNTUmdCxlLnBlbmRpbmdfYnVmW2UubF9idWYrZS5sYXN0X2xpdF09MjU1JnIsZS5sYXN0X2xpdCsrLDA9PT10P2UuZHluX2x0cmVlWzIqcl0rKzooZS5tYXRjaGVzKyssdC0tLGUuZHluX2x0cmVlWzIqKEFbcl0rdSsxKV0rKyxlLmR5bl9kdHJlZVsyKk4odCldKyspLGUubGFzdF9saXQ9PT1lLmxpdF9idWZzaXplLTF9LHIuX3RyX2FsaWduPWZ1bmN0aW9uKGUpe1AoZSwyLDMpLEwoZSxtLHopLGZ1bmN0aW9uKGUpezE2PT09ZS5iaV92YWxpZD8oVShlLGUuYmlfYnVmKSxlLmJpX2J1Zj0wLGUuYmlfdmFsaWQ9MCk6ODw9ZS5iaV92YWxpZCYmKGUucGVuZGluZ19idWZbZS5wZW5kaW5nKytdPTI1NSZlLmJpX2J1ZixlLmJpX2J1Zj4+PTgsZS5iaV92YWxpZC09OCl9KGUpfX0se1wiLi4vdXRpbHMvY29tbW9uXCI6NDF9XSw1MzpbZnVuY3Rpb24oZSx0LHIpe1widXNlIHN0cmljdFwiO3QuZXhwb3J0cz1mdW5jdGlvbigpe3RoaXMuaW5wdXQ9bnVsbCx0aGlzLm5leHRfaW49MCx0aGlzLmF2YWlsX2luPTAsdGhpcy50b3RhbF9pbj0wLHRoaXMub3V0cHV0PW51bGwsdGhpcy5uZXh0X291dD0wLHRoaXMuYXZhaWxfb3V0PTAsdGhpcy50b3RhbF9vdXQ9MCx0aGlzLm1zZz1cIlwiLHRoaXMuc3RhdGU9bnVsbCx0aGlzLmRhdGFfdHlwZT0yLHRoaXMuYWRsZXI9MH19LHt9XSw1NDpbZnVuY3Rpb24oZSx0LHIpeyhmdW5jdGlvbihlKXshZnVuY3Rpb24ocixuKXtcInVzZSBzdHJpY3RcIjtpZighci5zZXRJbW1lZGlhdGUpe3ZhciBpLHMsdCxhLG89MSxoPXt9LHU9ITEsbD1yLmRvY3VtZW50LGU9T2JqZWN0LmdldFByb3RvdHlwZU9mJiZPYmplY3QuZ2V0UHJvdG90eXBlT2Yocik7ZT1lJiZlLnNldFRpbWVvdXQ/ZTpyLGk9XCJbb2JqZWN0IHByb2Nlc3NdXCI9PT17fS50b1N0cmluZy5jYWxsKHIucHJvY2Vzcyk/ZnVuY3Rpb24oZSl7cHJvY2Vzcy5uZXh0VGljayhmdW5jdGlvbigpe2MoZSl9KX06ZnVuY3Rpb24oKXtpZihyLnBvc3RNZXNzYWdlJiYhci5pbXBvcnRTY3JpcHRzKXt2YXIgZT0hMCx0PXIub25tZXNzYWdlO3JldHVybiByLm9ubWVzc2FnZT1mdW5jdGlvbigpe2U9ITF9LHIucG9zdE1lc3NhZ2UoXCJcIixcIipcIiksci5vbm1lc3NhZ2U9dCxlfX0oKT8oYT1cInNldEltbWVkaWF0ZSRcIitNYXRoLnJhbmRvbSgpK1wiJFwiLHIuYWRkRXZlbnRMaXN0ZW5lcj9yLmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsZCwhMSk6ci5hdHRhY2hFdmVudChcIm9ubWVzc2FnZVwiLGQpLGZ1bmN0aW9uKGUpe3IucG9zdE1lc3NhZ2UoYStlLFwiKlwiKX0pOnIuTWVzc2FnZUNoYW5uZWw/KCh0PW5ldyBNZXNzYWdlQ2hhbm5lbCkucG9ydDEub25tZXNzYWdlPWZ1bmN0aW9uKGUpe2MoZS5kYXRhKX0sZnVuY3Rpb24oZSl7dC5wb3J0Mi5wb3N0TWVzc2FnZShlKX0pOmwmJlwib25yZWFkeXN0YXRlY2hhbmdlXCJpbiBsLmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik/KHM9bC5kb2N1bWVudEVsZW1lbnQsZnVuY3Rpb24oZSl7dmFyIHQ9bC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO3Qub25yZWFkeXN0YXRlY2hhbmdlPWZ1bmN0aW9uKCl7YyhlKSx0Lm9ucmVhZHlzdGF0ZWNoYW5nZT1udWxsLHMucmVtb3ZlQ2hpbGQodCksdD1udWxsfSxzLmFwcGVuZENoaWxkKHQpfSk6ZnVuY3Rpb24oZSl7c2V0VGltZW91dChjLDAsZSl9LGUuc2V0SW1tZWRpYXRlPWZ1bmN0aW9uKGUpe1wiZnVuY3Rpb25cIiE9dHlwZW9mIGUmJihlPW5ldyBGdW5jdGlvbihcIlwiK2UpKTtmb3IodmFyIHQ9bmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGgtMSkscj0wO3I8dC5sZW5ndGg7cisrKXRbcl09YXJndW1lbnRzW3IrMV07dmFyIG49e2NhbGxiYWNrOmUsYXJnczp0fTtyZXR1cm4gaFtvXT1uLGkobyksbysrfSxlLmNsZWFySW1tZWRpYXRlPWZ9ZnVuY3Rpb24gZihlKXtkZWxldGUgaFtlXX1mdW5jdGlvbiBjKGUpe2lmKHUpc2V0VGltZW91dChjLDAsZSk7ZWxzZXt2YXIgdD1oW2VdO2lmKHQpe3U9ITA7dHJ5eyFmdW5jdGlvbihlKXt2YXIgdD1lLmNhbGxiYWNrLHI9ZS5hcmdzO3N3aXRjaChyLmxlbmd0aCl7Y2FzZSAwOnQoKTticmVhaztjYXNlIDE6dChyWzBdKTticmVhaztjYXNlIDI6dChyWzBdLHJbMV0pO2JyZWFrO2Nhc2UgMzp0KHJbMF0sclsxXSxyWzJdKTticmVhaztkZWZhdWx0OnQuYXBwbHkobixyKX19KHQpfWZpbmFsbHl7ZihlKSx1PSExfX19fWZ1bmN0aW9uIGQoZSl7ZS5zb3VyY2U9PT1yJiZcInN0cmluZ1wiPT10eXBlb2YgZS5kYXRhJiYwPT09ZS5kYXRhLmluZGV4T2YoYSkmJmMoK2UuZGF0YS5zbGljZShhLmxlbmd0aCkpfX0oXCJ1bmRlZmluZWRcIj09dHlwZW9mIHNlbGY/dm9pZCAwPT09ZT90aGlzOmU6c2VsZil9KS5jYWxsKHRoaXMsXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGdsb2JhbD9nbG9iYWw6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGY/c2VsZjpcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P3dpbmRvdzp7fSl9LHt9XX0se30sWzEwXSkoMTApfSk7IiwgImltcG9ydCB7IEFwcCwgTW9kYWwsIE5vdGljZSwgUGx1Z2luLCBQbHVnaW5TZXR0aW5nVGFiLCBTZXR0aW5nIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5pbXBvcnQgeyBPdmVyd3JpdGVEZWNpc2lvbiwgVXBkYXRlU2VydmljZSB9IGZyb20gXCIuL3VwZGF0ZS1zZXJ2aWNlXCI7XG5pbXBvcnQgeyBQbHVnaW5EYXRhLCBTVVBQT1JURURfTEFOR1VBR0VTLCBVcGRhdGVCYXRjaCB9IGZyb20gXCIuL3R5cGVzXCI7XG5pbXBvcnQgeyBtaWdyYXRlT3duZWRGaWxlcyB9IGZyb20gXCIuL293bmVyc2hpcFwiO1xuXG5jb25zdCBERUZBVUxUX0RBVEE6IFBsdWdpbkRhdGEgPSB7IHNlcmllc0lkOiBcInJlYWRpbmdcIiwgZWRpdGlvbklkOiBcInN0YW5kYXJkXCIsIGluc3RhbGxlZDogeyBvd25lZEZpbGVzOiB7fSwgYXBwbGllZFJlbGVhc2VJZHM6IFtdIH0gfTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGJwZWRpYVVwZGF0ZVBsdWdpbiBleHRlbmRzIFBsdWdpbiB7XG4gIHByaXZhdGUgZGF0YTogUGx1Z2luRGF0YSA9IERFRkFVTFRfREFUQTtcbiAgcHJpdmF0ZSB1cGRhdGVyITogVXBkYXRlU2VydmljZTtcblxuICBhc3luYyBvbmxvYWQoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3Qgc2F2ZWQgPSBhd2FpdCB0aGlzLmxvYWREYXRhKCkgPz8ge307XG4gICAgdGhpcy5kYXRhID0geyAuLi5ERUZBVUxUX0RBVEEsIC4uLnNhdmVkLCBpbnN0YWxsZWQ6IHsgb3duZWRGaWxlczoge30sIGFwcGxpZWRSZWxlYXNlSWRzOiBbXSwgLi4uc2F2ZWQuaW5zdGFsbGVkIH0gfTtcbiAgICB0aGlzLmRhdGEuaW5zdGFsbGVkLm93bmVkRmlsZXMgPSBtaWdyYXRlT3duZWRGaWxlcyh0aGlzLmRhdGEuaW5zdGFsbGVkLm93bmVkRmlsZXMsIHRoaXMuZGF0YS5pbnN0YWxsZWQpO1xuICAgIGF3YWl0IHRoaXMucGVyc2lzdERhdGEodGhpcy5kYXRhKTtcbiAgICB0aGlzLnVwZGF0ZXIgPSBuZXcgVXBkYXRlU2VydmljZSh0aGlzLmFwcCwgdGhpcy5tYW5pZmVzdC52ZXJzaW9uLCAoKSA9PiB0aGlzLmRhdGEsIChkYXRhKSA9PiB0aGlzLnBlcnNpc3REYXRhKGRhdGEpKTtcbiAgICB0aGlzLmFkZFNldHRpbmdUYWIobmV3IFRicGVkaWFVcGRhdGVTZXR0aW5nc1RhYih0aGlzLmFwcCwgdGhpcykpO1xuICAgIHRoaXMuYWRkUmliYm9uSWNvbihcImRvd25sb2FkXCIsIFwiQ2hlY2sgVGJwZWRpYSB1cGRhdGVzXCIsICgpID0+IHZvaWQgdGhpcy5jaGVja0ZvclVwZGF0ZSgpKTtcbiAgICB0aGlzLmFkZENvbW1hbmQoeyBpZDogXCJjaGVjay1mb3ItY29udGVudC11cGRhdGVcIiwgbmFtZTogXCJDaGVjayBmb3IgY29udGVudCB1cGRhdGVcIiwgY2FsbGJhY2s6ICgpID0+IHZvaWQgdGhpcy5jaGVja0ZvclVwZGF0ZSgpIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBjaGVja0ZvclVwZGF0ZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgbWFuaWZlc3QgPSBhd2FpdCB0aGlzLnVwZGF0ZXIuY2hlY2soKTtcbiAgICAgIGlmICghbWFuaWZlc3QpIHsgbmV3IE5vdGljZShcIllvdXIgVGJwZWRpYSBjb250ZW50IGlzIHVwIHRvIGRhdGUuXCIpOyByZXR1cm47IH1cbiAgICAgIG5ldyBVcGRhdGVNb2RhbCh0aGlzLmFwcCwgbWFuaWZlc3QsIChwcm9ncmVzcykgPT4gdGhpcy51cGRhdGVyLmluc3RhbGwobWFuaWZlc3QsIHByb2dyZXNzLFxuICAgICAgICAocGF0aCkgPT4gbmV3IFByb21pc2U8T3ZlcndyaXRlRGVjaXNpb24+KChyZXNvbHZlKSA9PiBuZXcgT3ZlcndyaXRlTW9kYWwodGhpcy5hcHAsIHBhdGgsIHJlc29sdmUpLm9wZW4oKSkpKS5vcGVuKCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHsgbmV3IE5vdGljZShgQ291bGQgbm90IGNoZWNrIGZvciBUYnBlZGlhIHVwZGF0ZXM6ICR7bWVzc2FnZShlcnJvcil9YCk7IH1cbiAgfVxuXG4gIGFzeW5jIHNldExhbmd1YWdlQ29kZShsYW5ndWFnZUNvZGU6IFBsdWdpbkRhdGFbXCJsYW5ndWFnZUNvZGVcIl0pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCB0aGlzLnBlcnNpc3REYXRhKHsgLi4udGhpcy5kYXRhLCBsYW5ndWFnZUNvZGUgfSk7XG4gIH1cblxuICBhc3luYyBzZXRFZGl0aW9uSWQoZWRpdGlvbklkOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoZWRpdGlvbklkICE9PSBcInN0YW5kYXJkXCIgJiYgZWRpdGlvbklkICE9PSBcImFkdmFuY2VkXCIpIHRocm93IG5ldyBFcnJvcihcIlVuc3VwcG9ydGVkIFRicGVkaWEgZWRpdGlvbi5cIik7XG4gICAgYXdhaXQgdGhpcy5wZXJzaXN0RGF0YSh7IC4uLnRoaXMuZGF0YSwgZWRpdGlvbklkIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBwZXJzaXN0RGF0YShkYXRhOiBQbHVnaW5EYXRhKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgeyBsYW5ndWFnZUNvZGUsIHNlcmllc0lkLCBlZGl0aW9uSWQsIC4uLnJlc3QgfSA9IGRhdGE7XG4gICAgdGhpcy5kYXRhID0geyBsYW5ndWFnZUNvZGUsIHNlcmllc0lkLCBlZGl0aW9uSWQsIC4uLnJlc3QgfTtcbiAgICBhd2FpdCB0aGlzLnNhdmVEYXRhKHRoaXMuZGF0YSk7XG4gIH1cblxuICBnZXQgbGFuZ3VhZ2VDb2RlKCk6IFBsdWdpbkRhdGFbXCJsYW5ndWFnZUNvZGVcIl0geyByZXR1cm4gdGhpcy5kYXRhLmxhbmd1YWdlQ29kZTsgfVxuICBnZXQgZWRpdGlvbklkKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLmRhdGEuZWRpdGlvbklkOyB9XG59XG5cbmNsYXNzIFRicGVkaWFVcGRhdGVTZXR0aW5nc1RhYiBleHRlbmRzIFBsdWdpblNldHRpbmdUYWIge1xuICBjb25zdHJ1Y3RvcihhcHA6IEFwcCwgcHJpdmF0ZSByZWFkb25seSBwbHVnaW46IFRicGVkaWFVcGRhdGVQbHVnaW4pIHsgc3VwZXIoYXBwLCBwbHVnaW4pOyB9XG4gIGRpc3BsYXkoKTogdm9pZCB7XG4gICAgY29uc3QgeyBjb250YWluZXJFbCB9ID0gdGhpcztcbiAgICBjb250YWluZXJFbC5lbXB0eSgpO1xuICAgIGNvbnRhaW5lckVsLmNyZWF0ZUVsKFwiaDJcIiwgeyB0ZXh0OiBcIlRicGVkaWEgVXBkYXRlXCIgfSk7XG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuc2V0TmFtZShcIlZhdWx0IGxhbmd1YWdlXCIpXG4gICAgICAuc2V0RGVzYyhcIlNlbGVjdCB0aGUgbGFuZ3VhZ2Ugb2YgdGhpcyBpbnN0YWxsZWQgVGJwZWRpYSBjb2xsZWN0aW9uLiBJdCBkZXRlcm1pbmVzIHdoaWNoIHJlbGVhc2UgaGlzdG9yeSBpcyB1c2VkLlwiKVxuICAgICAgLmFkZERyb3Bkb3duKChkcm9wZG93bikgPT4ge1xuICAgICAgICBkcm9wZG93bi5hZGRPcHRpb24oXCJcIiwgXCJDaG9vc2UgbGFuZ3VhZ2VcdTIwMjZcIik7XG4gICAgICAgIGZvciAoY29uc3QgY29kZSBvZiBTVVBQT1JURURfTEFOR1VBR0VTKSBkcm9wZG93bi5hZGRPcHRpb24oY29kZSwgY29kZSk7XG4gICAgICAgIGRyb3Bkb3duLnNldFZhbHVlKHRoaXMucGx1Z2luLmxhbmd1YWdlQ29kZSA/PyBcIlwiKTtcbiAgICAgICAgZHJvcGRvd24ub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7IGF3YWl0IHRoaXMucGx1Z2luLnNldExhbmd1YWdlQ29kZSh2YWx1ZSBhcyBQbHVnaW5EYXRhW1wibGFuZ3VhZ2VDb2RlXCJdKTsgfSk7XG4gICAgICB9KTtcbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKFwiVmF1bHQgZWRpdGlvblwiKVxuICAgICAgLnNldERlc2MoXCJDaG9vc2UgU3RhbmRhcmQgb3IgQWR2YW5jZWQgdG8gdXNlIHRoYXQgZWRpdGlvblx1MjAxOXMgcmVsZWFzZSBoaXN0b3J5LiBFeGlzdGluZyByZWxlYXNlIHJlY29yZHMgYXJlIHByZXNlcnZlZC5cIilcbiAgICAgIC5hZGREcm9wZG93bigoZHJvcGRvd24pID0+IHtcbiAgICAgICAgZHJvcGRvd24uYWRkT3B0aW9uKFwic3RhbmRhcmRcIiwgXCJTdGFuZGFyZCAoXHU2QTE5XHU2RTk2XHU3MjQ4XHU2NzJDKVwiKTtcbiAgICAgICAgZHJvcGRvd24uYWRkT3B0aW9uKFwiYWR2YW5jZWRcIiwgXCJBZHZhbmNlZCAoXHU5QUQ4XHU3RDFBXHU3MjQ4XHU2NzJDKVwiKTtcbiAgICAgICAgZHJvcGRvd24uc2V0VmFsdWUodGhpcy5wbHVnaW4uZWRpdGlvbklkKTtcbiAgICAgICAgZHJvcGRvd24ub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7IGF3YWl0IHRoaXMucGx1Z2luLnNldEVkaXRpb25JZCh2YWx1ZSk7IH0pO1xuICAgICAgfSk7XG4gIH1cbn1cblxuY2xhc3MgT3ZlcndyaXRlTW9kYWwgZXh0ZW5kcyBNb2RhbCB7XG4gIHByaXZhdGUgZGVjaXNpb246IE92ZXJ3cml0ZURlY2lzaW9uID0gXCJjYW5jZWxcIjtcbiAgY29uc3RydWN0b3IoYXBwOiBBcHAsIHByaXZhdGUgcmVhZG9ubHkgcGF0aDogc3RyaW5nLCBwcml2YXRlIHJlYWRvbmx5IHJlc29sdmU6IChkZWNpc2lvbjogT3ZlcndyaXRlRGVjaXNpb24pID0+IHZvaWQpIHsgc3VwZXIoYXBwKTsgfVxuICBvbk9wZW4oKTogdm9pZCB7XG4gICAgdGhpcy5jb250ZW50RWwuY3JlYXRlRWwoXCJoMlwiLCB7IHRleHQ6IFwiT3ZlcndyaXRlIGV4aXN0aW5nIGZpbGU/XCIgfSk7XG4gICAgdGhpcy5jb250ZW50RWwuY3JlYXRlRWwoXCJwXCIsIHsgdGV4dDogXCJUaGlzIGxvY2FsIGZpbGUgd2FzIG5vdCBpbnN0YWxsZWQgYnkgVGJwZWRpYSBVcGRhdGUuIE92ZXJ3cml0aW5nIHJlcGxhY2VzIGl0cyBjb250ZW50cyB3aXRoIHRoZSByZWxlYXNlIHZlcnNpb24uXCIgfSk7XG4gICAgdGhpcy5jb250ZW50RWwuY3JlYXRlRWwoXCJwXCIsIHsgdGV4dDogdGhpcy5wYXRoIH0pO1xuICAgIHRoaXMuY29udGVudEVsLmNyZWF0ZUVsKFwicFwiLCB7IHRleHQ6IFwiT3ZlcndyaXRlIGFsbCBhcHBsaWVzIHRvIGFsbCByZW1haW5pbmcgY29uZmxpY3RpbmcgZmlsZXMgaW4gdGhpcyB1cGRhdGUsIGluY2x1ZGluZyBzdWJzZXF1ZW50IHJlbGVhc2VzLiBDYW5jZWwgc3RvcHMgdGhlIGN1cnJlbnQgcmVsZWFzZTsgZWFybGllciBjb21wbGV0ZWQgcmVsZWFzZXMgcmVtYWluIGluc3RhbGxlZC5cIiB9KTtcbiAgICBuZXcgU2V0dGluZyh0aGlzLmNvbnRlbnRFbClcbiAgICAgIC5hZGRCdXR0b24oKGJ1dHRvbikgPT4gYnV0dG9uLnNldEJ1dHRvblRleHQoXCJDYW5jZWwgdXBkYXRlXCIpLm9uQ2xpY2soKCkgPT4gdGhpcy5jbG9zZSgpKSlcbiAgICAgIC5hZGRCdXR0b24oKGJ1dHRvbikgPT4gYnV0dG9uLnNldEJ1dHRvblRleHQoXCJPdmVyd3JpdGUgdGhpcyBmaWxlXCIpLm9uQ2xpY2soKCkgPT4gdGhpcy5jaG9vc2UoXCJvdmVyd3JpdGVcIikpKVxuICAgICAgLmFkZEJ1dHRvbigoYnV0dG9uKSA9PiBidXR0b24uc2V0QnV0dG9uVGV4dChcIk92ZXJ3cml0ZSBhbGxcIikuc2V0Q3RhKCkub25DbGljaygoKSA9PiB0aGlzLmNob29zZShcIm92ZXJ3cml0ZS1hbGxcIikpKTtcbiAgfVxuICBwcml2YXRlIGNob29zZShkZWNpc2lvbjogT3ZlcndyaXRlRGVjaXNpb24pOiB2b2lkIHsgdGhpcy5kZWNpc2lvbiA9IGRlY2lzaW9uOyB0aGlzLmNsb3NlKCk7IH1cbiAgb25DbG9zZSgpOiB2b2lkIHsgdGhpcy5jb250ZW50RWwuZW1wdHkoKTsgdGhpcy5yZXNvbHZlKHRoaXMuZGVjaXNpb24pOyB9XG59XG5cbmNsYXNzIFVwZGF0ZU1vZGFsIGV4dGVuZHMgTW9kYWwge1xuICBjb25zdHJ1Y3RvcihhcHA6IEFwcCwgcHJpdmF0ZSByZWFkb25seSBiYXRjaDogVXBkYXRlQmF0Y2gsIHByaXZhdGUgcmVhZG9ubHkgaW5zdGFsbDogKHByb2dyZXNzOiAobWVzc2FnZTogc3RyaW5nKSA9PiB2b2lkKSA9PiBQcm9taXNlPHZvaWQ+KSB7IHN1cGVyKGFwcCk7IH1cbiAgb25PcGVuKCk6IHZvaWQge1xuICAgIGNvbnN0IHsgY29udGVudEVsIH0gPSB0aGlzO1xuICAgIGNvbnN0IGZpcnN0ID0gdGhpcy5iYXRjaC5yZWxlYXNlc1swXTsgY29uc3QgbGFzdCA9IHRoaXMuYmF0Y2gucmVsZWFzZXMuYXQoLTEpITtcbiAgICBjb250ZW50RWwuY3JlYXRlRWwoXCJoMlwiLCB7IHRleHQ6IGBJbnN0YWxsICR7dGhpcy5iYXRjaC5yZWxlYXNlcy5sZW5ndGh9IFRicGVkaWEgcmVsZWFzZSR7dGhpcy5iYXRjaC5yZWxlYXNlcy5sZW5ndGggPT09IDEgPyBcIlwiIDogXCJzXCJ9YCB9KTtcbiAgICBjb250ZW50RWwuY3JlYXRlRWwoXCJwXCIsIHsgdGV4dDogYCR7Zmlyc3QucmVsZWFzZVZlcnNpb259IFx1MjE5MiAke2xhc3QucmVsZWFzZVZlcnNpb259YCB9KTtcbiAgICBjb25zdCBsaXN0ID0gY29udGVudEVsLmNyZWF0ZUVsKFwidWxcIik7XG4gICAgZm9yIChjb25zdCByZWxlYXNlIG9mIHRoaXMuYmF0Y2gucmVsZWFzZXMpIGxpc3QuY3JlYXRlRWwoXCJsaVwiLCB7IHRleHQ6IGAke3JlbGVhc2UucmVsZWFzZVZlcnNpb259IFx1MjAxNCAke3JlbGVhc2UucmVsZWFzZU5vdGVzLnN1bW1hcnl9YCB9KTtcbiAgICBjb25zdCBzdGF0dXMgPSBjb250ZW50RWwuY3JlYXRlRWwoXCJwXCIpO1xuICAgIG5ldyBTZXR0aW5nKGNvbnRlbnRFbClcbiAgICAgIC5hZGRCdXR0b24oKGJ1dHRvbikgPT4gYnV0dG9uLnNldEJ1dHRvblRleHQoXCJDYW5jZWxcIikub25DbGljaygoKSA9PiB0aGlzLmNsb3NlKCkpKVxuICAgICAgLmFkZEJ1dHRvbigoYnV0dG9uKSA9PiBidXR0b24uc2V0Q3RhKCkuc2V0QnV0dG9uVGV4dChcIlVwZGF0ZSBub3dcIikub25DbGljayhhc3luYyAoKSA9PiB7XG4gICAgICAgIGJ1dHRvbi5zZXREaXNhYmxlZCh0cnVlKTsgc3RhdHVzLnNldFRleHQoXCJTdGFydGluZyB1cGRhdGVcdTIwMjZcIik7XG4gICAgICAgIHRyeSB7IGF3YWl0IHRoaXMuaW5zdGFsbCgodGV4dCkgPT4gc3RhdHVzLnNldFRleHQodGV4dCkpOyB0aGlzLmNsb3NlKCk7IH1cbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIlRicGVkaWEgdXBkYXRlIGluc3RhbGxhdGlvbiBmYWlsZWRcIiwgZXJyb3IpO1xuICAgICAgICAgIHN0YXR1cy5zZXRUZXh0KGBVcGRhdGUgZmFpbGVkOiAke21lc3NhZ2UoZXJyb3IpfWApO1xuICAgICAgICAgIGJ1dHRvbi5zZXREaXNhYmxlZChmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgIH0pKTtcbiAgfVxuICBvbkNsb3NlKCk6IHZvaWQgeyB0aGlzLmNvbnRlbnRFbC5lbXB0eSgpOyB9XG59XG5mdW5jdGlvbiBtZXNzYWdlKGVycm9yOiB1bmtub3duKTogc3RyaW5nIHsgcmV0dXJuIGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogXCJVbmtub3duIGVycm9yXCI7IH1cbiIsICJpbXBvcnQgSlNaaXAgZnJvbSBcImpzemlwXCI7XG5pbXBvcnQgeyBBcHAsIERhdGFBZGFwdGVyLCBOb3RpY2UsIFBsYXRmb3JtLCByZXF1ZXN0VXJsIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5pbXBvcnQgeyBjb21wYXJlUmVsZWFzZVZlcnNpb25zLCBjb21wYXJlVmVyc2lvbnMsIHBhcnNlQW5kVmFsaWRhdGVNYW5pZmVzdCB9IGZyb20gXCIuL21hbmlmZXN0XCI7XG5pbXBvcnQgeyBhc3NlcnRNYW5hZ2VkUGF0aCwgZW5zdXJlTm9QYXRoQ29uZmxpY3RzIH0gZnJvbSBcIi4vcGF0aC1wb2xpY3lcIjtcbmltcG9ydCB7IGN1cnJlbnRPd25lZFBhdGhzLCBtaWdyYXRlT3duZWRGaWxlcyB9IGZyb20gXCIuL293bmVyc2hpcFwiO1xuaW1wb3J0IHsgTUFOSUZFU1RfQkFTRV9VUkwsIFBsdWdpbkRhdGEsIFByb2JlUmVzdWx0LCBSZWxlYXNlRW50cnksIFJlbGVhc2VNYW5pZmVzdCwgU291cmNlLCBTdXBwb3J0ZWRMYW5ndWFnZSwgVXBkYXRlQmF0Y2gsIFVwZGF0ZVBsYW4sIFVwZGF0ZVRyYW5zYWN0aW9uLCBXT1JLRVJfVVJMIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuY29uc3QgU1RBR0lOR19ESVIgPSBcIi5vYnNpZGlhbi9wbHVnaW5zL3RicGVkaWEtdXBkYXRlLy5zdGFnaW5nXCI7XG5jb25zdCBNQVhfQVJDSElWRV9CWVRFUyA9IDEwMjQgKiAxMDI0ICogMTAyNDtcbmNvbnN0IE1BWF9GSUxFUyA9IDMwXzAwMDtcbmNvbnN0IE1BWF9VTkNPTVBSRVNTRURfQllURVMgPSA0ICogMTAyNCAqIDEwMjQgKiAxMDI0O1xuXG5leHBvcnQgdHlwZSBPdmVyd3JpdGVEZWNpc2lvbiA9IFwib3ZlcndyaXRlXCIgfCBcIm92ZXJ3cml0ZS1hbGxcIiB8IFwiY2FuY2VsXCI7XG5leHBvcnQgdHlwZSBDb25maXJtT3ZlcndyaXRlID0gKHBhdGg6IHN0cmluZykgPT4gUHJvbWlzZTxPdmVyd3JpdGVEZWNpc2lvbj47XG5cbmV4cG9ydCBjbGFzcyBVcGRhdGVTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByZWFkb25seSBhcHA6IEFwcCxcbiAgICBwcml2YXRlIHJlYWRvbmx5IHBsdWdpblZlcnNpb246IHN0cmluZyxcbiAgICBwcml2YXRlIHJlYWRvbmx5IGdldERhdGE6ICgpID0+IFBsdWdpbkRhdGEsXG4gICAgcHJpdmF0ZSByZWFkb25seSBzYXZlRGF0YTogKGRhdGE6IFBsdWdpbkRhdGEpID0+IFByb21pc2U8dm9pZD4sXG4gICkge31cblxuICBhc3luYyBjaGVjaygpOiBQcm9taXNlPFVwZGF0ZUJhdGNoIHwgbnVsbD4ge1xuICAgIGNvbnN0IGxhbmd1YWdlID0gdGhpcy5nZXREYXRhKCkubGFuZ3VhZ2VDb2RlO1xuICAgIGlmICghbGFuZ3VhZ2UpIHRocm93IG5ldyBFcnJvcihcIkNob29zZSB0aGlzIHZhdWx0XHUyMDE5cyBUYnBlZGlhIGxhbmd1YWdlIGluIHRoZSBwbHVnaW4gc2V0dGluZ3MgZmlyc3QuXCIpO1xuICAgIGNvbnN0IGVkaXRpb24gPSB0aGlzLmdldERhdGEoKS5lZGl0aW9uSWQ7XG4gICAgY29uc3QgbWFuaWZlc3QgPSBhd2FpdCB0aGlzLmZldGNoTWFuaWZlc3QobGFuZ3VhZ2UsIGVkaXRpb24pO1xuICAgIHRoaXMuYXNzZXJ0U2VsZWN0ZWRDb2xsZWN0aW9uKG1hbmlmZXN0KTtcbiAgICB0aGlzLmFzc2VydENvbXBhdGlibGUobWFuaWZlc3QpO1xuICAgIGNvbnN0IGRhdGEgPSB0aGlzLmdldERhdGEoKTtcbiAgICBhd2FpdCB0aGlzLnNhdmVEYXRhKHsgLi4uZGF0YSwgc2VyaWVzSWQ6IG1hbmlmZXN0LmNvbGxlY3Rpb24uc2VyaWVzLmlkLCBlZGl0aW9uSWQ6IG1hbmlmZXN0LmNvbGxlY3Rpb24uZWRpdGlvbi5pZCxcbiAgICAgIGluc3RhbGxlZDogeyAuLi5kYXRhLmluc3RhbGxlZCwgb3duZWRGaWxlczogbWlncmF0ZU93bmVkRmlsZXMoZGF0YS5pbnN0YWxsZWQub3duZWRGaWxlcywgZGF0YS5pbnN0YWxsZWQsIG1hbmlmZXN0KSB9IH0pO1xuICAgIGNvbnN0IHJlbGVhc2VzID0gdGhpcy5taXNzaW5nUmVsZWFzZXMobWFuaWZlc3QpO1xuICAgIHJldHVybiByZWxlYXNlcy5sZW5ndGggPyB7IG1hbmlmZXN0LCByZWxlYXNlcyB9IDogbnVsbDtcbiAgfVxuXG4gIGFzeW5jIGluc3RhbGwoYmF0Y2g6IFVwZGF0ZUJhdGNoLCBwcm9ncmVzczogKG1lc3NhZ2U6IHN0cmluZykgPT4gdm9pZCwgY29uZmlybU92ZXJ3cml0ZT86IENvbmZpcm1PdmVyd3JpdGUpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0aGlzLmFzc2VydFNlbGVjdGVkQ29sbGVjdGlvbihiYXRjaC5tYW5pZmVzdCk7XG4gICAgdGhpcy5hc3NlcnRDb21wYXRpYmxlKGJhdGNoLm1hbmlmZXN0KTtcbiAgICAvLyBBcHByb3ZhbCBsYXN0cyBvbmx5IGZvciB0aGlzIGluc3RhbGxhdGlvbiwgaW5jbHVkaW5nIHN1YnNlcXVlbnQgcmVsZWFzZXMuXG4gICAgbGV0IG92ZXJ3cml0ZUFsbCA9IGZhbHNlO1xuICAgIGNvbnN0IGFwcHJvdmVPdmVyd3JpdGU6IENvbmZpcm1PdmVyd3JpdGUgPSBhc3luYyAocGF0aCkgPT4ge1xuICAgICAgaWYgKG92ZXJ3cml0ZUFsbCkgcmV0dXJuIFwib3ZlcndyaXRlXCI7XG4gICAgICBjb25zdCBkZWNpc2lvbiA9IGF3YWl0IGNvbmZpcm1PdmVyd3JpdGU/LihwYXRoKSA/PyBcImNhbmNlbFwiO1xuICAgICAgaWYgKGRlY2lzaW9uID09PSBcIm92ZXJ3cml0ZS1hbGxcIikgb3ZlcndyaXRlQWxsID0gdHJ1ZTtcbiAgICAgIHJldHVybiBkZWNpc2lvbjtcbiAgICB9O1xuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBiYXRjaC5yZWxlYXNlcy5sZW5ndGg7IGluZGV4ICs9IDEpIHtcbiAgICAgIHRoaXMuYXNzZXJ0U2VsZWN0ZWRDb2xsZWN0aW9uKGJhdGNoLm1hbmlmZXN0KTtcbiAgICAgIGNvbnN0IHJlbGVhc2UgPSBiYXRjaC5yZWxlYXNlc1tpbmRleF07XG4gICAgICBwcm9ncmVzcyhgUmVsZWFzZSAke2luZGV4ICsgMX0gb2YgJHtiYXRjaC5yZWxlYXNlcy5sZW5ndGh9OiAke3JlbGVhc2UucmVsZWFzZVZlcnNpb259YCk7XG4gICAgICBhd2FpdCB0aGlzLmluc3RhbGxSZWxlYXNlKGJhdGNoLm1hbmlmZXN0LCByZWxlYXNlLCBwcm9ncmVzcywgYXBwcm92ZU92ZXJ3cml0ZSk7XG4gICAgfVxuICAgIG5ldyBOb3RpY2UoYFRicGVkaWEgdXBkYXRlZCB0aHJvdWdoICR7YmF0Y2gucmVsZWFzZXMuYXQoLTEpIS5yZWxlYXNlVmVyc2lvbn0uYCk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGluc3RhbGxSZWxlYXNlKG1hbmlmZXN0OiBSZWxlYXNlTWFuaWZlc3QsIHJlbGVhc2U6IFJlbGVhc2VFbnRyeSwgcHJvZ3Jlc3M6IChtZXNzYWdlOiBzdHJpbmcpID0+IHZvaWQsIGNvbmZpcm1PdmVyd3JpdGU6IENvbmZpcm1PdmVyd3JpdGUpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBsZXQgdHJhbnNhY3Rpb246IFVwZGF0ZVRyYW5zYWN0aW9uIHwgdW5kZWZpbmVkO1xuICAgIGxldCBjb21taXR0ZWQgPSBmYWxzZTtcbiAgICB0cnkge1xuICAgICAgcHJvZ3Jlc3MoXCJDcmVhdGluZyB1cGRhdGUgdHJhbnNhY3Rpb25cdTIwMjZcIik7XG4gICAgICB0cmFuc2FjdGlvbiA9IGF3YWl0IHRoaXMuY3JlYXRlVHJhbnNhY3Rpb24obWFuaWZlc3QsIHJlbGVhc2UpO1xuICAgICAgcHJvZ3Jlc3MoXCJEaXNjb3ZlcmluZyB1cGRhdGUgc291cmNlc1x1MjAyNlwiKTtcbiAgICAgIGNvbnN0IHNvdXJjZXMgPSBhd2FpdCB0aGlzLmdldFNvdXJjZXMobWFuaWZlc3QsIHJlbGVhc2UsIHRyYW5zYWN0aW9uKTtcbiAgICAgIGlmICghc291cmNlcy5sZW5ndGgpIHRocm93IG5ldyBFcnJvcihcIk5vIGVuYWJsZWQgdXBkYXRlIHNvdXJjZSBpcyBhdmFpbGFibGUuXCIpO1xuICAgICAgY29uc3QgcmFua2VkID0gYXdhaXQgdGhpcy5yYW5rU291cmNlcyhzb3VyY2VzLCB0cmFuc2FjdGlvbiwgcHJvZ3Jlc3MpO1xuICAgICAgaWYgKCFyYW5rZWQubGVuZ3RoKSB0aHJvdyBuZXcgRXJyb3IoXCJBbGwgdXBkYXRlIHNvdXJjZXMgZmFpbGVkIHRoZWlyIGhlYWx0aCBjaGVjay5cIik7XG5cbiAgICAgIGxldCBhcmNoaXZlOiBBcnJheUJ1ZmZlciB8IHVuZGVmaW5lZDtcbiAgICAgIGxldCBsYXN0RXJyb3I6IHVua25vd247XG4gICAgICBmb3IgKGNvbnN0IHNvdXJjZSBvZiByYW5rZWQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBwcm9ncmVzcyhgRG93bmxvYWRpbmcgZnJvbSAke3NvdXJjZS5uYW1lfVx1MjAyNmApO1xuICAgICAgICAgIGFyY2hpdmUgPSBhd2FpdCB0aGlzLmRvd25sb2FkUGFja2FnZShzb3VyY2UsIHRyYW5zYWN0aW9uLCByZWxlYXNlLmZpbGVuYW1lKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHsgbGFzdEVycm9yID0gZXJyb3I7IH1cbiAgICAgIH1cbiAgICAgIGlmICghYXJjaGl2ZSkgdGhyb3cgbGFzdEVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBsYXN0RXJyb3IgOiBuZXcgRXJyb3IoXCJBbGwgdXBkYXRlIHNvdXJjZXMgZmFpbGVkLlwiKTtcblxuICAgICAgcHJvZ3Jlc3MoXCJWYWxpZGF0aW5nIHJlbGVhc2UgYXJjaGl2ZVx1MjAyNlwiKTtcbiAgICAgIGNvbnN0IHN0YWdpbmdQYXRoID0gYCR7U1RBR0lOR19ESVJ9LyR7dHJhbnNhY3Rpb24uaWR9L3BhY2thZ2UuemlwYDtcbiAgICAgIGF3YWl0IHdyaXRlQmluYXJ5KHRoaXMuYXBwLnZhdWx0LmFkYXB0ZXIsIHN0YWdpbmdQYXRoLCBhcmNoaXZlKTtcbiAgICAgIGFyY2hpdmUgPSBhd2FpdCB0aGlzLmFwcC52YXVsdC5hZGFwdGVyLnJlYWRCaW5hcnkoc3RhZ2luZ1BhdGgpO1xuICAgICAgY29uc3QgcGxhbiA9IGF3YWl0IHRoaXMudmFsaWRhdGVBcmNoaXZlKGFyY2hpdmUsIG1hbmlmZXN0LCByZWxlYXNlKTtcbiAgICAgIHByb2dyZXNzKFwiQXBwbHlpbmcgbWFuYWdlZCBmaWxlc1x1MjAyNlwiKTtcbiAgICAgIGF3YWl0IHRoaXMuYXBwbHkocGxhbiwgYXJjaGl2ZSwgcHJvZ3Jlc3MsIGNvbmZpcm1PdmVyd3JpdGUpO1xuICAgICAgY29tbWl0dGVkID0gdHJ1ZTtcbiAgICAgIHRyeSB7IGF3YWl0IHRoaXMucmVwb3J0KHRyYW5zYWN0aW9uLCBcInN1Y2Nlc3NcIik7IH1cbiAgICAgIGNhdGNoIHsgbmV3IE5vdGljZShcIlRicGVkaWEgd2FzIHVwZGF0ZWQsIGJ1dCB0aGUgc2VydmljZSBjb3VsZCBub3QgcmVjb3JkIHRoZSBzdWNjZXNzIGF1ZGl0LlwiKTsgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBpZiAodHJhbnNhY3Rpb24gJiYgIWNvbW1pdHRlZCkgYXdhaXQgdGhpcy5yZXBvcnQodHJhbnNhY3Rpb24sIFwiZmFpbGVkXCIpLmNhdGNoKCgpID0+IHVuZGVmaW5lZCk7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgaWYgKHRyYW5zYWN0aW9uKSBhd2FpdCByZW1vdmVUcmVlKHRoaXMuYXBwLnZhdWx0LmFkYXB0ZXIsIGAke1NUQUdJTkdfRElSfS8ke3RyYW5zYWN0aW9uLmlkfWApLmNhdGNoKCgpID0+IHVuZGVmaW5lZCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBtaXNzaW5nUmVsZWFzZXMobWFuaWZlc3Q6IFJlbGVhc2VNYW5pZmVzdCk6IFJlbGVhc2VFbnRyeVtdIHtcbiAgICBjb25zdCBpbnN0YWxsZWQgPSB0aGlzLmdldERhdGEoKS5pbnN0YWxsZWQ7XG4gICAgY29uc3QgaW5zdGFsbGVkSW5kZXggPSBpbnN0YWxsZWQucmVsZWFzZUlkID8gbWFuaWZlc3QucmVsZWFzZXMuZmluZEluZGV4KChyZWxlYXNlKSA9PiByZWxlYXNlLnJlbGVhc2VJZCA9PT0gaW5zdGFsbGVkLnJlbGVhc2VJZCkgOiAtMTtcbiAgICBpZiAoaW5zdGFsbGVkSW5kZXggPj0gMCkgcmV0dXJuIG1hbmlmZXN0LnJlbGVhc2VzLnNsaWNlKGluc3RhbGxlZEluZGV4ICsgMSk7XG4gICAgaWYgKCFpbnN0YWxsZWQucmVsZWFzZVZlcnNpb24pIHJldHVybiBtYW5pZmVzdC5yZWxlYXNlcztcbiAgICBjb25zdCBrZXkgPSBbbWFuaWZlc3QuY29sbGVjdGlvbi5sYW5ndWFnZS5jb2RlLCBtYW5pZmVzdC5jb2xsZWN0aW9uLnNlcmllcy5pZCwgbWFuaWZlc3QuY29sbGVjdGlvbi5lZGl0aW9uLmlkXS5qb2luKFwiLVwiKS50b0xvd2VyQ2FzZSgpO1xuICAgIGlmICghaW5zdGFsbGVkLnJlbGVhc2VWZXJzaW9uLnN0YXJ0c1dpdGgoYCR7a2V5fS1gKSAmJiAhL15cXGR7NH1cXC4vLnRlc3QoaW5zdGFsbGVkLnJlbGVhc2VWZXJzaW9uKSkge1xuICAgICAgcmV0dXJuIG1hbmlmZXN0LnJlbGVhc2VzLmZpbHRlcigocmVsZWFzZSkgPT4gIWluc3RhbGxlZC5hcHBsaWVkUmVsZWFzZUlkcy5pbmNsdWRlcyhyZWxlYXNlLnJlbGVhc2VJZCkpO1xuICAgIH1cbiAgICByZXR1cm4gbWFuaWZlc3QucmVsZWFzZXMuZmlsdGVyKChyZWxlYXNlKSA9PiBjb21wYXJlUmVsZWFzZVZlcnNpb25zKHJlbGVhc2UucmVsZWFzZVZlcnNpb24sIGluc3RhbGxlZC5yZWxlYXNlVmVyc2lvbiEpID4gMCk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGZldGNoTWFuaWZlc3QobGFuZ3VhZ2U6IFN1cHBvcnRlZExhbmd1YWdlLCBlZGl0aW9uOiBzdHJpbmcpOiBQcm9taXNlPFJlbGVhc2VNYW5pZmVzdD4ge1xuICAgIGlmIChlZGl0aW9uICE9PSBcInN0YW5kYXJkXCIgJiYgZWRpdGlvbiAhPT0gXCJhZHZhbmNlZFwiKSB0aHJvdyBuZXcgRXJyb3IoXCJDaG9vc2UgYSBzdXBwb3J0ZWQgVGJwZWRpYSBlZGl0aW9uIGluIHRoZSBwbHVnaW4gc2V0dGluZ3MuXCIpO1xuICAgIGNvbnN0IGVkaXRpb25QYXRoID0gZWRpdGlvbiA9PT0gXCJhZHZhbmNlZFwiID8gXCIvYWR2YW5jZWRcIiA6IFwiXCI7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCByZXF1ZXN0VXJsKHsgdXJsOiBgJHtNQU5JRkVTVF9CQVNFX1VSTH0vJHtsYW5ndWFnZS50b0xvd2VyQ2FzZSgpfSR7ZWRpdGlvblBhdGh9L2xhdGVzdC5qc29uYCwgbWV0aG9kOiBcIkdFVFwiLCB0aHJvdzogZmFsc2UgfSk7XG4gICAgaWYgKHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB0aHJvdyBuZXcgRXJyb3IoYENvdWxkIG5vdCByZXRyaWV2ZSByZWxlYXNlIG1ldGFkYXRhIChIVFRQICR7cmVzcG9uc2Uuc3RhdHVzfSkuYCk7XG4gICAgbGV0IGpzb246IHVua25vd247XG4gICAgdHJ5IHsganNvbiA9IHJlc3BvbnNlLmpzb247IH0gY2F0Y2ggeyB0aHJvdyBuZXcgRXJyb3IoXCJSZWxlYXNlIG1ldGFkYXRhIGlzIG5vdCB2YWxpZCBKU09OLlwiKTsgfVxuICAgIHJldHVybiBwYXJzZUFuZFZhbGlkYXRlTWFuaWZlc3QoanNvbik7XG4gIH1cblxuICBwcml2YXRlIGFzc2VydFNlbGVjdGVkQ29sbGVjdGlvbihtYW5pZmVzdDogUmVsZWFzZU1hbmlmZXN0KTogdm9pZCB7XG4gICAgY29uc3QgZGF0YSA9IHRoaXMuZ2V0RGF0YSgpO1xuICAgIGlmIChtYW5pZmVzdC5jb2xsZWN0aW9uLmxhbmd1YWdlLmNvZGUgIT09IGRhdGEubGFuZ3VhZ2VDb2RlIHx8IG1hbmlmZXN0LmNvbGxlY3Rpb24uc2VyaWVzLmlkICE9PSBkYXRhLnNlcmllc0lkIHx8IG1hbmlmZXN0LmNvbGxlY3Rpb24uZWRpdGlvbi5pZCAhPT0gZGF0YS5lZGl0aW9uSWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoZSByZWxlYXNlIG1hbmlmZXN0IGRvZXMgbm90IG1hdGNoIHRoZSBzZWxlY3RlZCBsYW5ndWFnZSwgc2VyaWVzLCBhbmQgZWRpdGlvbi4gQ2hlY2sgZm9yIHVwZGF0ZXMgYWdhaW4gYWZ0ZXIgY2hhbmdpbmcgc2V0dGluZ3MuXCIpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXNzZXJ0Q29tcGF0aWJsZShtYW5pZmVzdDogUmVsZWFzZU1hbmlmZXN0KTogdm9pZCB7XG4gICAgaWYgKGNvbXBhcmVWZXJzaW9ucyh0aGlzLnBsdWdpblZlcnNpb24sIG1hbmlmZXN0Lm1pbmltdW1QbHVnaW5WZXJzaW9uKSA8IDApIHRocm93IG5ldyBFcnJvcihgVGhpcyByZWxlYXNlIHJlcXVpcmVzIHBsdWdpbiAke21hbmlmZXN0Lm1pbmltdW1QbHVnaW5WZXJzaW9ufSBvciBuZXdlci5gKTtcbiAgICBjb25zdCBhcHBWZXJzaW9uID0gdGhpcy5hcHBWZXJzaW9uKCk7XG4gICAgLy8gT2JzaWRpYW4gZG9lcyBub3QgZXhwb3NlIGEgc3RhYmxlLCB0eXBlZCB2ZXJzaW9uIHByb3BlcnR5IHRvIGV2ZXJ5IHBsdWdpblxuICAgIC8vIHJ1bnRpbWUuIEEgbWlzc2luZyB2YWx1ZSBtdXN0IG5vdCBiZSBpbnRlcnByZXRlZCBhcyB2ZXJzaW9uIDAuMC4wLlxuICAgIGlmIChhcHBWZXJzaW9uICYmIGNvbXBhcmVWZXJzaW9ucyhhcHBWZXJzaW9uLCBtYW5pZmVzdC5taW5pbXVtT2JzaWRpYW5WZXJzaW9uKSA8IDApIHRocm93IG5ldyBFcnJvcihgVGhpcyByZWxlYXNlIHJlcXVpcmVzIE9ic2lkaWFuICR7bWFuaWZlc3QubWluaW11bU9ic2lkaWFuVmVyc2lvbn0gb3IgbmV3ZXIuYCk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGNyZWF0ZVRyYW5zYWN0aW9uKG1hbmlmZXN0OiBSZWxlYXNlTWFuaWZlc3QsIHJlbGVhc2U6IFJlbGVhc2VFbnRyeSk6IFByb21pc2U8VXBkYXRlVHJhbnNhY3Rpb24+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuYXBpKFwiL3VwZGF0ZXMvdHJhbnNhY3Rpb25zXCIsIFwiUE9TVFwiLCB7XG4gICAgICB0aXRsZTogbWFuaWZlc3QudGl0bGUsIHZlcnNpb246IHJlbGVhc2UucmVsZWFzZVZlcnNpb24sIGZpbGVuYW1lOiByZWxlYXNlLmZpbGVuYW1lLCBsYW5ndWFnZTogbWFuaWZlc3QuY29sbGVjdGlvbi5sYW5ndWFnZS5jb2RlLFxuICAgICAgc2VyaWVzOiBtYW5pZmVzdC5jb2xsZWN0aW9uLnNlcmllcy5pZCwgZWRpdGlvbjogbWFuaWZlc3QuY29sbGVjdGlvbi5lZGl0aW9uLmlkLFxuICAgICAgZGV2aWNlX3R5cGU6IFBsYXRmb3JtLmlzTW9iaWxlID8gXCJtb2JpbGVcIiA6IFwiZGVza3RvcFwiLCBvczogbmF2aWdhdG9yLnBsYXRmb3JtLFxuICAgICAgY2xpZW50X3ZlcnNpb246IGAke3RoaXMuYXBwVmVyc2lvbigpID8/IFwidW5rbm93blwifTsgcGx1Z2luLyR7dGhpcy5wbHVnaW5WZXJzaW9ufWAsIHVzZXJfYWdlbnQ6IG5hdmlnYXRvci51c2VyQWdlbnQsXG4gICAgfSk7XG4gICAgaWYgKHR5cGVvZiByZXNwb25zZS5pZCAhPT0gXCJzdHJpbmdcIiB8fCB0eXBlb2YgcmVzcG9uc2UudG9rZW4gIT09IFwic3RyaW5nXCIpIHRocm93IG5ldyBFcnJvcihcIlVwZGF0ZSBzZXJ2aWNlIHJldHVybmVkIGFuIGludmFsaWQgdHJhbnNhY3Rpb24uXCIpO1xuICAgIHJldHVybiB7IGlkOiByZXNwb25zZS5pZCwgdG9rZW46IHJlc3BvbnNlLnRva2VuIH07XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGdldFNvdXJjZXMobWFuaWZlc3Q6IFJlbGVhc2VNYW5pZmVzdCwgcmVsZWFzZTogUmVsZWFzZUVudHJ5LCB0cmFuc2FjdGlvbjogVXBkYXRlVHJhbnNhY3Rpb24pOiBQcm9taXNlPFNvdXJjZVtdPiB7XG4gICAgY29uc3QgcXVlcnkgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHsgbGFuZ3VhZ2U6IG1hbmlmZXN0LmNvbGxlY3Rpb24ubGFuZ3VhZ2UuY29kZSwgc2VyaWVzOiBtYW5pZmVzdC5jb2xsZWN0aW9uLnNlcmllcy5pZCwgZWRpdGlvbjogbWFuaWZlc3QuY29sbGVjdGlvbi5lZGl0aW9uLmlkLCB0aXRsZTogbWFuaWZlc3QudGl0bGUsIHZlcnNpb246IHJlbGVhc2UucmVsZWFzZVZlcnNpb24sIGZpbGVuYW1lOiByZWxlYXNlLmZpbGVuYW1lIH0pO1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5hcGkoYC91cGRhdGVzL3NvdXJjZXM/JHtxdWVyeX1gLCBcIkdFVFwiLCB1bmRlZmluZWQsIHRyYW5zYWN0aW9uKTtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkocmVzcG9uc2Uuc291cmNlcykpIHRocm93IG5ldyBFcnJvcihcIlVwZGF0ZSBzZXJ2aWNlIHJldHVybmVkIGFuIGludmFsaWQgc291cmNlIGxpc3QuXCIpO1xuICAgIHJldHVybiByZXNwb25zZS5zb3VyY2VzLmZpbHRlcihpc1NvdXJjZSk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIHJhbmtTb3VyY2VzKHNvdXJjZXM6IFNvdXJjZVtdLCB0cmFuc2FjdGlvbjogVXBkYXRlVHJhbnNhY3Rpb24sIHByb2dyZXNzOiAobWVzc2FnZTogc3RyaW5nKSA9PiB2b2lkKTogUHJvbWlzZTxTb3VyY2VbXT4ge1xuICAgIHByb2dyZXNzKFwiVGVzdGluZyB1cGRhdGUgc291cmNlc1x1MjAyNlwiKTtcbiAgICBjb25zdCBwcm9iZXMgPSBhd2FpdCBQcm9taXNlLmFsbChzb3VyY2VzLnNsaWNlKDAsIDgpLm1hcChhc3luYyAoc291cmNlKSA9PiAoeyBzb3VyY2UsIHJlc3VsdDogYXdhaXQgdGhpcy5wcm9iZShzb3VyY2UsIHRyYW5zYWN0aW9uKSB9KSkpO1xuICAgIHJldHVybiBwcm9iZXNcbiAgICAgIC5maWx0ZXIoKGl0ZW0pOiBpdGVtIGlzIHsgc291cmNlOiBTb3VyY2U7IHJlc3VsdDogUHJvYmVSZXN1bHQgfSA9PiBpdGVtLnJlc3VsdC5oZWFsdGh5ICYmIHR5cGVvZiBpdGVtLnJlc3VsdC5sYXRlbmN5TXMgPT09IFwibnVtYmVyXCIpXG4gICAgICAuc29ydCgoYSwgYikgPT4gc2NvcmUoYS5zb3VyY2UsIGEucmVzdWx0KSAtIHNjb3JlKGIuc291cmNlLCBiLnJlc3VsdCkpXG4gICAgICAubWFwKChpdGVtKSA9PiBpdGVtLnNvdXJjZSk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIHByb2JlKHNvdXJjZTogU291cmNlLCB0cmFuc2FjdGlvbjogVXBkYXRlVHJhbnNhY3Rpb24pOiBQcm9taXNlPFByb2JlUmVzdWx0PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5hcGkoYC91cGRhdGVzL3NvdXJjZXMvJHtlbmNvZGVVUklDb21wb25lbnQoc291cmNlLnNvdXJjZUlkKX0vcHJvYmVgLCBcIlBPU1RcIiwge30sIHRyYW5zYWN0aW9uKTtcbiAgICAgIHJldHVybiB7IHNvdXJjZUlkOiBzb3VyY2Uuc291cmNlSWQsIGhlYWx0aHk6IHJlc3BvbnNlLmhlYWx0aHkgPT09IHRydWUsIGxhdGVuY3lNczogYXNOdW1iZXIocmVzcG9uc2UubGF0ZW5jeU1zKSwgYnl0ZXM6IGFzTnVtYmVyKHJlc3BvbnNlLmJ5dGVzKSwgZXJyb3I6IGFzU3RyaW5nKHJlc3BvbnNlLmVycm9yKSB9O1xuICAgIH0gY2F0Y2ggeyByZXR1cm4geyBzb3VyY2VJZDogc291cmNlLnNvdXJjZUlkLCBoZWFsdGh5OiBmYWxzZSB9OyB9XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGRvd25sb2FkUGFja2FnZShzb3VyY2U6IFNvdXJjZSwgdHJhbnNhY3Rpb246IFVwZGF0ZVRyYW5zYWN0aW9uLCBmaWxlbmFtZTogc3RyaW5nKTogUHJvbWlzZTxBcnJheUJ1ZmZlcj4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYCR7V09SS0VSX1VSTH0vdXBkYXRlcy9wYWNrYWdlYCwge1xuICAgICAgbWV0aG9kOiBcIlBPU1RcIiwgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiwgLi4uYXV0aEhlYWRlcnModHJhbnNhY3Rpb24pIH0sXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IHNvdXJjZUlkOiBzb3VyY2Uuc291cmNlSWQsIGZpbGVuYW1lIH0pLFxuICAgIH0pO1xuICAgIGlmICghcmVzcG9uc2Uub2sgfHwgIXJlc3BvbnNlLmJvZHkpIHRocm93IG5ldyBFcnJvcihgRG93bmxvYWQgZmFpbGVkIGZyb20gJHtzb3VyY2UubmFtZX0gKEhUVFAgJHtyZXNwb25zZS5zdGF0dXN9KS5gKTtcbiAgICBjb25zdCByZWFkZXIgPSByZXNwb25zZS5ib2R5LmdldFJlYWRlcigpOyBjb25zdCBjaHVua3M6IFVpbnQ4QXJyYXlbXSA9IFtdOyBsZXQgdG90YWwgPSAwO1xuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICBjb25zdCB7IHZhbHVlLCBkb25lIH0gPSBhd2FpdCByZWFkZXIucmVhZCgpO1xuICAgICAgaWYgKGRvbmUpIGJyZWFrO1xuICAgICAgdG90YWwgKz0gdmFsdWUuYnl0ZUxlbmd0aDtcbiAgICAgIGlmICh0b3RhbCA+IE1BWF9BUkNISVZFX0JZVEVTKSB7IGF3YWl0IHJlYWRlci5jYW5jZWwoKTsgdGhyb3cgbmV3IEVycm9yKFwiUmVsZWFzZSBhcmNoaXZlIGV4Y2VlZHMgdGhlIGNvbmZpZ3VyZWQgc2l6ZSBsaW1pdC5cIik7IH1cbiAgICAgIGNodW5rcy5wdXNoKHZhbHVlKTtcbiAgICB9XG4gICAgY29uc3QgYXJjaGl2ZSA9IG5ldyBVaW50OEFycmF5KHRvdGFsKTsgbGV0IG9mZnNldCA9IDA7XG4gICAgZm9yIChjb25zdCBjaHVuayBvZiBjaHVua3MpIHsgYXJjaGl2ZS5zZXQoY2h1bmssIG9mZnNldCk7IG9mZnNldCArPSBjaHVuay5ieXRlTGVuZ3RoOyB9XG4gICAgcmV0dXJuIGFyY2hpdmUuYnVmZmVyO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyB2YWxpZGF0ZUFyY2hpdmUoYXJjaGl2ZTogQXJyYXlCdWZmZXIsIG1hbmlmZXN0OiBSZWxlYXNlTWFuaWZlc3QsIHJlbGVhc2U6IFJlbGVhc2VFbnRyeSk6IFByb21pc2U8VXBkYXRlUGxhbj4ge1xuICAgIGNvbnN0IHppcCA9IGF3YWl0IEpTWmlwLmxvYWRBc3luYyhhcmNoaXZlLCB7IGNyZWF0ZUZvbGRlcnM6IGZhbHNlLCBjaGVja0NSQzMyOiBmYWxzZSB9KTtcbiAgICBjb25zdCBleHBlY3RlZCA9IG5ldyBTZXQocmVsZWFzZS5maWxlcy5maWx0ZXIoKGZpbGUpID0+IGZpbGUuY2hhbmdlICE9PSBcIi1cIikubWFwKChmaWxlKSA9PiBmaWxlLnBhdGgpKTtcbiAgICBjb25zdCBhY3R1YWw6IHN0cmluZ1tdID0gW107IGxldCB0b3RhbFVuY29tcHJlc3NlZCA9IDA7XG4gICAgZm9yIChjb25zdCBlbnRyeSBvZiBPYmplY3QudmFsdWVzKHppcC5maWxlcykpIHtcbiAgICAgIGNvbnN0IGVudHJ5TmFtZSA9IGVudHJ5LmRpciA/IGVudHJ5Lm5hbWUucmVwbGFjZSgvXFwvJC8sIFwiXCIpIDogZW50cnkubmFtZTtcbiAgICAgIGlmIChlbnRyeU5hbWUpIGFzc2VydE1hbmFnZWRQYXRoKGVudHJ5TmFtZSk7XG4gICAgICBpZiAoZW50cnkuZGlyKSBjb250aW51ZTtcbiAgICAgIGlmIChhY3R1YWwubGVuZ3RoID49IE1BWF9GSUxFUykgdGhyb3cgbmV3IEVycm9yKFwiUmVsZWFzZSBhcmNoaXZlIGhhcyB0b28gbWFueSBmaWxlcy5cIik7XG4gICAgICBjb25zdCBwYXRoID0gYXNzZXJ0TWFuYWdlZFBhdGgoZW50cnkubmFtZSk7XG4gICAgICBhY3R1YWwucHVzaChwYXRoKTtcbiAgICAgIGNvbnN0IHNpemUgPSB6aXBFbnRyeVNpemUoZW50cnkpO1xuICAgICAgaWYgKHNpemUgPT09IHVuZGVmaW5lZCkgdGhyb3cgbmV3IEVycm9yKFwiUmVsZWFzZSBhcmNoaXZlIGhhcyBhbiBlbnRyeSB3aXRoIG5vIHNpemUgbWV0YWRhdGEuXCIpO1xuICAgICAgdG90YWxVbmNvbXByZXNzZWQgKz0gc2l6ZTtcbiAgICAgIGlmICh0b3RhbFVuY29tcHJlc3NlZCA+IE1BWF9VTkNPTVBSRVNTRURfQllURVMpIHRocm93IG5ldyBFcnJvcihcIlJlbGVhc2UgYXJjaGl2ZSBleGNlZWRzIHRoZSBjb25maWd1cmVkIGV4dHJhY3RlZC1zaXplIGxpbWl0LlwiKTtcbiAgICB9XG4gICAgaWYgKG5ldyBTZXQoYWN0dWFsKS5zaXplICE9PSBhY3R1YWwubGVuZ3RoKSB0aHJvdyBuZXcgRXJyb3IoXCJSZWxlYXNlIGFyY2hpdmUgY29udGFpbnMgY29sbGlkaW5nIHBhdGhzLlwiKTtcbiAgICBlbnN1cmVOb1BhdGhDb25mbGljdHMoYWN0dWFsKTtcbiAgICBpZiAoYWN0dWFsLmxlbmd0aCAhPT0gZXhwZWN0ZWQuc2l6ZSB8fCBhY3R1YWwuc29tZSgocGF0aCkgPT4gIWV4cGVjdGVkLmhhcyhwYXRoKSkpIHRocm93IG5ldyBFcnJvcihcIlJlbGVhc2UgYXJjaGl2ZSBkb2VzIG5vdCBleGFjdGx5IG1hdGNoIHRoZSBtYW5pZmVzdCBpbnZlbnRvcnkuXCIpO1xuICAgIHJldHVybiB7IG1hbmlmZXN0LCByZWxlYXNlLCB3cml0ZXM6IGFjdHVhbCwgZGVsZXRpb25zOiByZWxlYXNlLmRlbGV0aW9ucyB9O1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBhcHBseShwbGFuOiBVcGRhdGVQbGFuLCBhcmNoaXZlOiBBcnJheUJ1ZmZlciwgcHJvZ3Jlc3M6IChtZXNzYWdlOiBzdHJpbmcpID0+IHZvaWQsIGNvbmZpcm1PdmVyd3JpdGU6IENvbmZpcm1PdmVyd3JpdGUpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBhZGFwdGVyID0gdGhpcy5hcHAudmF1bHQuYWRhcHRlcjtcbiAgICBjb25zdCBwcmV2aW91cyA9IHRoaXMuZ2V0RGF0YSgpLmluc3RhbGxlZDtcbiAgICBjb25zdCBvd25lZCA9IGN1cnJlbnRPd25lZFBhdGhzKHByZXZpb3VzKTtcbiAgICAvLyBFYWNoIHJlbGVhc2UgaXMgaW5jcmVtZW50YWw6IG9ubHkgZXhwbGljaXQgZGVsZXRpb25zIGFyZSByZW1vdmVkLiBFYXJsaWVyXG4gICAgLy8gcmVsZWFzZXMgcmVtYWluIGluc3RhbGxlZCBhZnRlciB0aGVpciBaSVAgaGFzIGNvbW1pdHRlZCBzdWNjZXNzZnVsbHkuXG4gICAgY29uc3QgZGVsZXRpb25zID0gWy4uLm5ldyBTZXQocGxhbi5kZWxldGlvbnMpXTtcbiAgICBmb3IgKGNvbnN0IHBhdGggb2YgcGxhbi53cml0ZXMpIHtcbiAgICAgIGF3YWl0IGFzc2VydE5vUmVwYXJzZVBvaW50cyh0aGlzLmFwcCwgcGF0aCk7XG4gICAgICBpZiAoYXdhaXQgYWRhcHRlci5leGlzdHMocGF0aCkpIHtcbiAgICAgICAgaWYgKChhd2FpdCBhZGFwdGVyLnN0YXQocGF0aCkpPy50eXBlID09PSBcImZvbGRlclwiKSB0aHJvdyBuZXcgRXJyb3IoYFJlZnVzaW5nIHRvIHJlcGxhY2UgYSBsb2NhbCBmb2xkZXI6ICR7cGF0aH1gKTtcbiAgICAgICAgaWYgKCFvd25lZC5oYXMocGF0aCkpIHtcbiAgICAgICAgICBwcm9ncmVzcyhgV2FpdGluZyBmb3Igb3ZlcndyaXRlIGFwcHJvdmFsOiAke3BhdGh9YCk7XG4gICAgICAgICAgaWYgKGF3YWl0IGNvbmZpcm1PdmVyd3JpdGUocGF0aCkgPT09IFwiY2FuY2VsXCIpIHRocm93IG5ldyBFcnJvcihcIlVwZGF0ZSBjYW5jZWxsZWQuIE5vIGZpbGVzIGluIHRoaXMgcmVsZWFzZSB3ZXJlIGNoYW5nZWQ7IGVhcmxpZXIgY29tcGxldGVkIHJlbGVhc2VzIHJlbWFpbiBpbnN0YWxsZWQuXCIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAoY29uc3QgcGF0aCBvZiBkZWxldGlvbnMpIHtcbiAgICAgIGF3YWl0IGFzc2VydE5vUmVwYXJzZVBvaW50cyh0aGlzLmFwcCwgcGF0aCk7XG4gICAgICBpZiAoIW93bmVkLmhhcyhwYXRoKSkgdGhyb3cgbmV3IEVycm9yKGBSZWZ1c2luZyB0byBkZWxldGUgYSBmaWxlIG5vdCBvd25lZCBieSB0aGUgcHJpb3IgcmVsZWFzZTogJHtwYXRofWApO1xuICAgIH1cblxuICAgIGNvbnN0IHRyYW5zYWN0aW9uRGlyID0gYCR7U1RBR0lOR19ESVJ9LyR7Y3J5cHRvLnJhbmRvbVVVSUQoKX1gO1xuICAgIGNvbnN0IGJhY2t1cERpciA9IGAke3RyYW5zYWN0aW9uRGlyfS9iYWNrdXBgO1xuICAgIGNvbnN0IGpvdXJuYWxQYXRoID0gYCR7dHJhbnNhY3Rpb25EaXJ9L3RyYW5zYWN0aW9uLmpzb25gO1xuICAgIGF3YWl0IG1rZGlycChhZGFwdGVyLCBiYWNrdXBEaXIpO1xuICAgIGNvbnN0IHRhcmdldHMgPSBbLi4ubmV3IFNldChbLi4ucGxhbi53cml0ZXMsIC4uLmRlbGV0aW9uc10pXTtcbiAgICBjb25zdCBvcmlnaW5hbHM6IEFycmF5PHsgcGF0aDogc3RyaW5nOyBleGlzdGVkOiBib29sZWFuIH0+ID0gW107XG4gICAgZm9yIChjb25zdCBwYXRoIG9mIHRhcmdldHMpIHtcbiAgICAgIGNvbnN0IGV4aXN0ZWQgPSBhd2FpdCBhZGFwdGVyLmV4aXN0cyhwYXRoKTsgb3JpZ2luYWxzLnB1c2goeyBwYXRoLCBleGlzdGVkIH0pO1xuICAgICAgaWYgKGV4aXN0ZWQpIGF3YWl0IHdyaXRlQmluYXJ5KGFkYXB0ZXIsIGAke2JhY2t1cERpcn0vJHtlbmNvZGVVUklDb21wb25lbnQocGF0aCl9YCwgYXdhaXQgYWRhcHRlci5yZWFkQmluYXJ5KHBhdGgpKTtcbiAgICB9XG4gICAgYXdhaXQgYWRhcHRlci53cml0ZShqb3VybmFsUGF0aCwgSlNPTi5zdHJpbmdpZnkoeyBvcmlnaW5hbHMgfSkpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHppcCA9IGF3YWl0IEpTWmlwLmxvYWRBc3luYyhhcmNoaXZlLCB7IGNyZWF0ZUZvbGRlcnM6IGZhbHNlLCBjaGVja0NSQzMyOiBmYWxzZSB9KTtcbiAgICAgIGZvciAoY29uc3QgcGF0aCBvZiBkZWxldGlvbnMpIGlmIChhd2FpdCBhZGFwdGVyLmV4aXN0cyhwYXRoKSkgYXdhaXQgYWRhcHRlci5yZW1vdmUocGF0aCk7XG4gICAgICBmb3IgKGNvbnN0IHBhdGggb2YgcGxhbi53cml0ZXMpIHtcbiAgICAgICAgcHJvZ3Jlc3MoYFdyaXRpbmcgJHtwYXRofVx1MjAyNmApO1xuICAgICAgICBhd2FpdCBta2RpcnAoYWRhcHRlciwgcGFyZW50KHBhdGgpKTtcbiAgICAgICAgY29uc3QgZW50cnkgPSB6aXAuZmlsZShwYXRoKTtcbiAgICAgICAgaWYgKCFlbnRyeSkgdGhyb3cgbmV3IEVycm9yKGBBcmNoaXZlIGVudHJ5IGRpc2FwcGVhcmVkOiAke3BhdGh9YCk7XG4gICAgICAgIGF3YWl0IHdyaXRlQmluYXJ5KGFkYXB0ZXIsIHBhdGgsIGF3YWl0IGVudHJ5LmFzeW5jKFwidWludDhhcnJheVwiKSk7XG4gICAgICB9XG4gICAgICBjb25zdCBuZXh0T3duZWQgPSB7IC4uLnByZXZpb3VzLm93bmVkRmlsZXMsIFtwbGFuLnJlbGVhc2UucmVsZWFzZUlkXTogcGxhbi5yZWxlYXNlLmZpbGVzLm1hcCgoZmlsZSkgPT4gKHsgLi4uZmlsZSB9KSkgfTtcbiAgICAgIGF3YWl0IHRoaXMuc2F2ZURhdGEoeyAuLi50aGlzLmdldERhdGEoKSwgaW5zdGFsbGVkOiB7XG4gICAgICAgIHJlbGVhc2VWZXJzaW9uOiBwbGFuLnJlbGVhc2UucmVsZWFzZVZlcnNpb24sXG4gICAgICAgIHJlbGVhc2VJZDogcGxhbi5yZWxlYXNlLnJlbGVhc2VJZCxcbiAgICAgICAgYXBwbGllZFJlbGVhc2VJZHM6IFsuLi5uZXcgU2V0KFsuLi4ocHJldmlvdXMuYXBwbGllZFJlbGVhc2VJZHMgPz8gW10pLCBwbGFuLnJlbGVhc2UucmVsZWFzZUlkXSldLFxuICAgICAgICBvd25lZEZpbGVzOiBuZXh0T3duZWQsXG4gICAgICB9IH0pO1xuICAgICAgYXdhaXQgcmVtb3ZlVHJlZShhZGFwdGVyLCB0cmFuc2FjdGlvbkRpcik7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGF3YWl0IHRoaXMucm9sbGJhY2soYWRhcHRlciwgb3JpZ2luYWxzLCBiYWNrdXBEaXIpO1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyByb2xsYmFjayhhZGFwdGVyOiBEYXRhQWRhcHRlciwgb3JpZ2luYWxzOiBBcnJheTx7IHBhdGg6IHN0cmluZzsgZXhpc3RlZDogYm9vbGVhbiB9PiwgYmFja3VwRGlyOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBmb3IgKGNvbnN0IG9yaWdpbmFsIG9mIG9yaWdpbmFscy5yZXZlcnNlKCkpIHtcbiAgICAgIGlmIChvcmlnaW5hbC5leGlzdGVkKSBhd2FpdCB3cml0ZUJpbmFyeShhZGFwdGVyLCBvcmlnaW5hbC5wYXRoLCBhd2FpdCBhZGFwdGVyLnJlYWRCaW5hcnkoYCR7YmFja3VwRGlyfS8ke2VuY29kZVVSSUNvbXBvbmVudChvcmlnaW5hbC5wYXRoKX1gKSk7XG4gICAgICBlbHNlIGlmIChhd2FpdCBhZGFwdGVyLmV4aXN0cyhvcmlnaW5hbC5wYXRoKSkgYXdhaXQgYWRhcHRlci5yZW1vdmUob3JpZ2luYWwucGF0aCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyByZXBvcnQodHJhbnNhY3Rpb246IFVwZGF0ZVRyYW5zYWN0aW9uLCBzdGF0dXM6IFwic3VjY2Vzc1wiIHwgXCJmYWlsZWRcIik6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHRoaXMuYXBpKGAvdXBkYXRlcy90cmFuc2FjdGlvbnMvJHtlbmNvZGVVUklDb21wb25lbnQodHJhbnNhY3Rpb24uaWQpfS9yZXN1bHRgLCBcIlBPU1RcIiwgeyBzdGF0dXMgfSwgdHJhbnNhY3Rpb24pO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBhcGkocGF0aDogc3RyaW5nLCBtZXRob2Q6IFwiR0VUXCIgfCBcIlBPU1RcIiwgYm9keT86IG9iamVjdCwgdHJhbnNhY3Rpb24/OiBVcGRhdGVUcmFuc2FjdGlvbik6IFByb21pc2U8UmVjb3JkPHN0cmluZywgdW5rbm93bj4+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAke1dPUktFUl9VUkx9JHtwYXRofWAsIHsgbWV0aG9kLCBoZWFkZXJzOiB7IC4uLihib2R5ID8geyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9IDoge30pLCAuLi4odHJhbnNhY3Rpb24gPyBhdXRoSGVhZGVycyh0cmFuc2FjdGlvbikgOiB7fSkgfSwgYm9keTogYm9keSA/IEpTT04uc3RyaW5naWZ5KGJvZHkpIDogdW5kZWZpbmVkIH0pO1xuICAgIGNvbnN0IGpzb24gPSBhd2FpdCByZXNwb25zZS5qc29uKCkuY2F0Y2goKCkgPT4gKHt9KSk7XG4gICAgaWYgKCFyZXNwb25zZS5vaykgdGhyb3cgbmV3IEVycm9yKHR5cGVvZiBqc29uLmVycm9yID09PSBcInN0cmluZ1wiID8ganNvbi5lcnJvciA6IGBVcGRhdGUgc2VydmljZSByZXF1ZXN0IGZhaWxlZCAoSFRUUCAke3Jlc3BvbnNlLnN0YXR1c30pLmApO1xuICAgIHJldHVybiBqc29uIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+O1xuICB9XG5cbiAgcHJpdmF0ZSBhcHBWZXJzaW9uKCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3QgYXBwID0gdGhpcy5hcHAgYXMgdW5rbm93biBhcyB7IHZlcnNpb24/OiB1bmtub3duOyBhcHBWZXJzaW9uPzogdW5rbm93bjsgdmF1bHQ6IHsgZ2V0Q29uZmlnPzogKGtleTogc3RyaW5nKSA9PiB1bmtub3duIH0gfTtcbiAgICBjb25zdCBnbG9iYWxBcHAgPSAoZ2xvYmFsVGhpcyBhcyB1bmtub3duIGFzIHsgYXBwPzogeyB2ZXJzaW9uPzogdW5rbm93bjsgYXBwVmVyc2lvbj86IHVua25vd24gfSB9KS5hcHA7XG4gICAgY29uc3QgY2FuZGlkYXRlcyA9IFthcHAudmVyc2lvbiwgYXBwLmFwcFZlcnNpb24sIGdsb2JhbEFwcD8udmVyc2lvbiwgZ2xvYmFsQXBwPy5hcHBWZXJzaW9uLCBhcHAudmF1bHQuZ2V0Q29uZmlnPy4oXCJhcHBWZXJzaW9uXCIpXTtcbiAgICByZXR1cm4gY2FuZGlkYXRlcy5maW5kKCh2YWx1ZSk6IHZhbHVlIGlzIHN0cmluZyA9PiB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgJiYgL15cXGQrXFwuXFxkK1xcLlxcZCsvLnRlc3QodmFsdWUpKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBhdXRoSGVhZGVycyh0cmFuc2FjdGlvbjogVXBkYXRlVHJhbnNhY3Rpb24pOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+IHsgcmV0dXJuIHsgXCJYLVVwZGF0ZS1UcmFuc2FjdGlvblwiOiB0cmFuc2FjdGlvbi5pZCwgXCJBdXRob3JpemF0aW9uXCI6IGBCZWFyZXIgJHt0cmFuc2FjdGlvbi50b2tlbn1gIH07IH1cbmZ1bmN0aW9uIGlzU291cmNlKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgU291cmNlIHsgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgKHZhbHVlIGFzIFNvdXJjZSkuc291cmNlSWQgPT09IFwic3RyaW5nXCIgJiYgdHlwZW9mICh2YWx1ZSBhcyBTb3VyY2UpLm5hbWUgPT09IFwic3RyaW5nXCIgJiYgdHlwZW9mICh2YWx1ZSBhcyBTb3VyY2UpLnByaW9yaXR5ID09PSBcIm51bWJlclwiICYmIHR5cGVvZiAodmFsdWUgYXMgU291cmNlKS5zdXBwb3J0c1JhbmdlID09PSBcImJvb2xlYW5cIjsgfVxuZnVuY3Rpb24gc2NvcmUoc291cmNlOiBTb3VyY2UsIHByb2JlOiBQcm9iZVJlc3VsdCk6IG51bWJlciB7IHJldHVybiAocHJvYmUubGF0ZW5jeU1zID8/IDYwXzAwMCkgKyBzb3VyY2UucHJpb3JpdHkgKiAyNSAtIChwcm9iZS5ieXRlcyA/PyAwKSAvIDQwOTY7IH1cbmZ1bmN0aW9uIGFzTnVtYmVyKHZhbHVlOiB1bmtub3duKTogbnVtYmVyIHwgdW5kZWZpbmVkIHsgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIiAmJiBOdW1iZXIuaXNGaW5pdGUodmFsdWUpID8gdmFsdWUgOiB1bmRlZmluZWQ7IH1cbmZ1bmN0aW9uIGFzU3RyaW5nKHZhbHVlOiB1bmtub3duKTogc3RyaW5nIHwgdW5kZWZpbmVkIHsgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiA/IHZhbHVlIDogdW5kZWZpbmVkOyB9XG5mdW5jdGlvbiB6aXBFbnRyeVNpemUoZW50cnk6IEpTWmlwLkpTWmlwT2JqZWN0KTogbnVtYmVyIHwgdW5kZWZpbmVkIHtcbiAgY29uc3Qgc2l6ZSA9IChlbnRyeSBhcyB1bmtub3duIGFzIHsgX2RhdGE/OiB7IHVuY29tcHJlc3NlZFNpemU/OiB1bmtub3duIH0gfSkuX2RhdGE/LnVuY29tcHJlc3NlZFNpemU7XG4gIHJldHVybiB0eXBlb2Ygc2l6ZSA9PT0gXCJudW1iZXJcIiAmJiBOdW1iZXIuaXNTYWZlSW50ZWdlcihzaXplKSAmJiBzaXplID49IDAgPyBzaXplIDogdW5kZWZpbmVkO1xufVxuZnVuY3Rpb24gcGFyZW50KHBhdGg6IHN0cmluZyk6IHN0cmluZyB7IGNvbnN0IGluZGV4ID0gcGF0aC5sYXN0SW5kZXhPZihcIi9cIik7IHJldHVybiBpbmRleCA9PT0gLTEgPyBcIlwiIDogcGF0aC5zbGljZSgwLCBpbmRleCk7IH1cbmFzeW5jIGZ1bmN0aW9uIG1rZGlycChhZGFwdGVyOiBEYXRhQWRhcHRlciwgcGF0aDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gIGlmICghcGF0aCkgcmV0dXJuO1xuICBsZXQgY3VycmVudCA9IFwiXCI7XG4gIGZvciAoY29uc3Qgc2VnbWVudCBvZiBwYXRoLnNwbGl0KFwiL1wiKSkge1xuICAgIGN1cnJlbnQgPSBjdXJyZW50ID8gYCR7Y3VycmVudH0vJHtzZWdtZW50fWAgOiBzZWdtZW50O1xuICAgIGlmICghKGF3YWl0IGFkYXB0ZXIuZXhpc3RzKGN1cnJlbnQpKSkgYXdhaXQgYWRhcHRlci5ta2RpcihjdXJyZW50KTtcbiAgfVxufVxuYXN5bmMgZnVuY3Rpb24gd3JpdGVCaW5hcnkoYWRhcHRlcjogRGF0YUFkYXB0ZXIsIHBhdGg6IHN0cmluZywgZGF0YTogQXJyYXlCdWZmZXIgfCBVaW50OEFycmF5KTogUHJvbWlzZTx2b2lkPiB7IGNvbnN0IGNvcHkgPSBuZXcgVWludDhBcnJheShkYXRhIGluc3RhbmNlb2YgVWludDhBcnJheSA/IGRhdGEgOiBuZXcgVWludDhBcnJheShkYXRhKSk7IGF3YWl0IG1rZGlycChhZGFwdGVyLCBwYXJlbnQocGF0aCkpOyBhd2FpdCBhZGFwdGVyLndyaXRlQmluYXJ5KHBhdGgsIGNvcHkuYnVmZmVyKTsgfVxuYXN5bmMgZnVuY3Rpb24gcmVtb3ZlVHJlZShhZGFwdGVyOiBEYXRhQWRhcHRlciwgcGF0aDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7IGlmIChhd2FpdCBhZGFwdGVyLmV4aXN0cyhwYXRoKSkgYXdhaXQgYWRhcHRlci5ybWRpcihwYXRoLCB0cnVlKTsgfVxuYXN5bmMgZnVuY3Rpb24gYXNzZXJ0Tm9SZXBhcnNlUG9pbnRzKGFwcDogQXBwLCB2YXVsdFBhdGg6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBiYXNlUGF0aCA9IChhcHAudmF1bHQuYWRhcHRlciBhcyB1bmtub3duIGFzIHsgZ2V0QmFzZVBhdGg/OiAoKSA9PiBzdHJpbmcgfSkuZ2V0QmFzZVBhdGg/LigpO1xuICBjb25zdCByZXF1aXJlRm4gPSAoZ2xvYmFsVGhpcyBhcyB1bmtub3duIGFzIHsgcmVxdWlyZT86IChuYW1lOiBzdHJpbmcpID0+IHsgbHN0YXQ6IChwYXRoOiBzdHJpbmcpID0+IFByb21pc2U8eyBpc1N5bWJvbGljTGluazogKCkgPT4gYm9vbGVhbiB9PiB9IH0pLnJlcXVpcmU7XG4gIGlmICghYmFzZVBhdGggfHwgIXJlcXVpcmVGbikgcmV0dXJuO1xuICBjb25zdCBmcyA9IHJlcXVpcmVGbihcImZzL3Byb21pc2VzXCIpO1xuICBsZXQgY3VycmVudCA9IGJhc2VQYXRoO1xuICBmb3IgKGNvbnN0IHNlZ21lbnQgb2YgdmF1bHRQYXRoLnNwbGl0KFwiL1wiKSkge1xuICAgIGN1cnJlbnQgPSBgJHtjdXJyZW50fS8ke3NlZ21lbnR9YDtcbiAgICB0cnkge1xuICAgICAgaWYgKChhd2FpdCBmcy5sc3RhdChjdXJyZW50KSkuaXNTeW1ib2xpY0xpbmsoKSkgdGhyb3cgbmV3IEVycm9yKGBSZWZ1c2luZyB0byB0cmF2ZXJzZSBhIGxpbmsgb3IgcmVwYXJzZSBwb2ludDogJHt2YXVsdFBhdGh9YCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGlmICgoZXJyb3IgYXMgeyBjb2RlPzogc3RyaW5nIH0pLmNvZGUgIT09IFwiRU5PRU5UXCIpIHRocm93IGVycm9yO1xuICAgIH1cbiAgfVxufVxuIiwgImV4cG9ydCBjb25zdCBNQU5JRkVTVF9CQVNFX1VSTCA9IFwiaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3Ric3BlZGlhL3RicGVkaWEtdXBkYXRlL21haW4vbWFuaWZlc3RzXCI7XG5leHBvcnQgY29uc3QgV09SS0VSX1VSTCA9IFwiaHR0cHM6Ly9jZnVwZGF0ZS50YnBlZGlhLm9yZ1wiO1xuXG5leHBvcnQgY29uc3QgU1VQUE9SVEVEX0xBTkdVQUdFUyA9IFtcImVuXCIsIFwiamFcIiwgXCJmclwiLCBcImVzXCIsIFwiZGVcIiwgXCJubFwiLCBcInN2XCIsIFwia29cIiwgXCJ6aC1UV1wiLCBcInpoLUNOXCIsIFwidmlcIiwgXCJpZFwiLCBcInRoXCIsIFwiYm9cIl0gYXMgY29uc3Q7XG5leHBvcnQgdHlwZSBTdXBwb3J0ZWRMYW5ndWFnZSA9IHR5cGVvZiBTVVBQT1JURURfTEFOR1VBR0VTW251bWJlcl07XG5cbmV4cG9ydCBjb25zdCBNQU5BR0VEX1JPT1RTID0gW1xuICBcIjAwIFx1OEFBQVx1NjYwRVwiLCBcIjAxIFx1NjU4N1x1OTZDNlx1OTBFOFwiLCBcIjAyIFx1OTU4Qlx1NzkzQVx1OTBFOFwiLCBcIjAzIFx1N0Q5M1x1ODVDRlx1OTBFOFwiLCBcIjA0IFx1OTgwQ1x1ODIwN1x1NjIxMlx1NUY4QlwiLFxuICBcIjA1IFx1NTBCM1x1NkNENVx1OTBFOFwiLCBcIjA2IFx1NUJDNlx1NkNENVx1NTEwMFx1OEVDQ1wiLCBcIjA3IFx1NEY1Qlx1OEE5RVx1NTE3OFx1ODVDRlwiLCBcIjA4IFx1NTE3Nlx1NEVENlx1OTg1RVx1NTIyNVwiLCBcIjA5IFx1ODRFRVx1OTk5OVx1NEUwQVx1NUUyQlwiLFxuICBcIjEwIFx1NzcxRlx1NEY1Qlx1NUI5N1wiLCBcIjIwIFx1NUMwOFx1OTg0Q1wiLCBcIjUwIFx1NTIxN1x1ODg2OFwiLCBcIjYwIFx1NUMwRVx1OEI4MFwiLCBcIjcwIFx1ODBDQ1x1NjY2Rlx1OENDN1x1NjU5OVwiLCBcIjkwIFx1NUU2Qlx1NTJBOVwiLFxuICBcIjk4IFx1NEUwQlx1OEYwOVx1OENDN1x1NjU5OVwiLCBcIjk5IFNldHRpbmdcIlxuXSBhcyBjb25zdDtcblxuZXhwb3J0IGludGVyZmFjZSBGaWxlQ2hhbmdlIHsgcGF0aDogc3RyaW5nOyBjaGFuZ2U6IFwiK1wiIHwgXCItXCIgfCBcIn5cIjsgfVxuXG5leHBvcnQgaW50ZXJmYWNlIFJlbGVhc2VFbnRyeSB7XG4gIHJlbGVhc2VWZXJzaW9uOiBzdHJpbmc7XG4gIHJlbGVhc2VJZDogc3RyaW5nO1xuICBwdWJsaXNoZWRBdDogc3RyaW5nO1xuICBmaWxlbmFtZTogc3RyaW5nO1xuICBmaWxlczogRmlsZUNoYW5nZVtdO1xuICBkZWxldGlvbnM6IHN0cmluZ1tdO1xuICByZWxlYXNlTm90ZXM6IHsgc3VtbWFyeTogc3RyaW5nOyBhZGRlZDogbnVtYmVyOyB1cGRhdGVkOiBudW1iZXI7IHJlbW92ZWQ6IG51bWJlciB9O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJlbGVhc2VNYW5pZmVzdCB7XG4gIHNjaGVtYVZlcnNpb246IDI7XG4gIHByb2R1Y3Q6IFwiVGJwZWRpYS1EaXN0cmlidXRlXCI7XG4gIHBsdWdpbjogXCJ0YnBlZGlhLXVwZGF0ZVwiO1xuICBjaGFubmVsOiBcInN0YWJsZVwiO1xuICB0aXRsZTogc3RyaW5nO1xuICBjb2xsZWN0aW9uOiB7XG4gICAgbGFuZ3VhZ2U6IHsgY29kZTogc3RyaW5nIH07XG4gICAgc2VyaWVzOiB7IGlkOiBzdHJpbmcgfTtcbiAgICBlZGl0aW9uOiB7IGlkOiBzdHJpbmcgfTtcbiAgfTtcbiAgbWluaW11bVBsdWdpblZlcnNpb246IHN0cmluZztcbiAgbWluaW11bU9ic2lkaWFuVmVyc2lvbjogc3RyaW5nO1xuICBtYW5hZ2VkUm9vdHM6IHN0cmluZ1tdO1xuICByZWxlYXNlczogUmVsZWFzZUVudHJ5W107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSW5zdGFsbGVkU3RhdGUge1xuICByZWxlYXNlVmVyc2lvbj86IHN0cmluZztcbiAgcmVsZWFzZUlkPzogc3RyaW5nO1xuICBhcHBsaWVkUmVsZWFzZUlkczogc3RyaW5nW107XG4gIG93bmVkRmlsZXM6IFJlY29yZDxzdHJpbmcsIEZpbGVDaGFuZ2VbXT47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGx1Z2luRGF0YSB7XG4gIGxhbmd1YWdlQ29kZT86IFN1cHBvcnRlZExhbmd1YWdlO1xuICBzZXJpZXNJZDogc3RyaW5nO1xuICBlZGl0aW9uSWQ6IHN0cmluZztcbiAgaW5zdGFsbGVkOiBJbnN0YWxsZWRTdGF0ZTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTb3VyY2Uge1xuICBzb3VyY2VJZDogc3RyaW5nO1xuICBuYW1lOiBzdHJpbmc7XG4gIHJlZ2lvbj86IHN0cmluZztcbiAgcHJpb3JpdHk6IG51bWJlcjtcbiAgc3VwcG9ydHNSYW5nZTogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBVcGRhdGVUcmFuc2FjdGlvbiB7XG4gIGlkOiBzdHJpbmc7XG4gIHRva2VuOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJvYmVSZXN1bHQge1xuICBzb3VyY2VJZDogc3RyaW5nO1xuICBoZWFsdGh5OiBib29sZWFuO1xuICBsYXRlbmN5TXM/OiBudW1iZXI7XG4gIGJ5dGVzPzogbnVtYmVyO1xuICBlcnJvcj86IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBVcGRhdGVQbGFuIHtcbiAgbWFuaWZlc3Q6IFJlbGVhc2VNYW5pZmVzdDtcbiAgcmVsZWFzZTogUmVsZWFzZUVudHJ5O1xuICB3cml0ZXM6IHN0cmluZ1tdO1xuICBkZWxldGlvbnM6IHN0cmluZ1tdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFVwZGF0ZUJhdGNoIHtcbiAgbWFuaWZlc3Q6IFJlbGVhc2VNYW5pZmVzdDtcbiAgcmVsZWFzZXM6IFJlbGVhc2VFbnRyeVtdO1xufVxuIiwgImltcG9ydCB7IE1BTkFHRURfUk9PVFMgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5jb25zdCBSRVNFUlZFRCA9IC9eKGNvbnxwcm58YXV4fG51bHxjb21bMS05XXxscHRbMS05XSkoXFwuLiopPyQvaTtcbmNvbnN0IE9CU0lESUFOX0ZJTEVTID0gbmV3IFNldChbXG4gIFwiLm9ic2lkaWFuL2FwcC5qc29uXCIsIFwiLm9ic2lkaWFuL2FwcGVhcmFuY2UuanNvblwiLCBcIi5vYnNpZGlhbi9jb21tdW5pdHktcGx1Z2lucy5qc29uXCIsXG4gIFwiLm9ic2lkaWFuL2hvdGtleXMuanNvblwiLCBcIi5vYnNpZGlhbi93b3Jrc3BhY2UuanNvblwiLCBcIi5vYnNpZGlhbi93b3Jrc3BhY2UtbW9iaWxlLmpzb25cIlxuXSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVQYXRoKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gdmFsdWUubm9ybWFsaXplKFwiTkZDXCIpLnJlcGxhY2UoL1xcXFwvZywgXCIvXCIpLnJlcGxhY2UoL1xcLysvZywgXCIvXCIpLnJlcGxhY2UoL15cXC5cXC8vLCBcIlwiKTtcbn1cblxuLyoqIFBhdGhzIGFyZSBhbHdheXMgcmVsYXRpdmUgdG8gdGhlIGN1cnJlbnQgdmF1bHQgcm9vdC4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhc3NlcnRNYW5hZ2VkUGF0aCh2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgY29uc3QgcGF0aCA9IG5vcm1hbGl6ZVBhdGgodmFsdWUpO1xuICBpZiAoIXBhdGggfHwgcGF0aC5pbmNsdWRlcyhcIlxcMFwiKSB8fCBwYXRoLnN0YXJ0c1dpdGgoXCIvXCIpIHx8IC9eW0EtWmEtel06Ly50ZXN0KHBhdGgpKSB0aHJvdyBuZXcgRXJyb3IoYFVuc2FmZSBwYXRoOiAke3ZhbHVlfWApO1xuICBjb25zdCBzZWdtZW50cyA9IHBhdGguc3BsaXQoXCIvXCIpO1xuICBpZiAoc2VnbWVudHMuc29tZSgoc2VnbWVudCkgPT4gIXNlZ21lbnQgfHwgc2VnbWVudCA9PT0gXCIuXCIgfHwgc2VnbWVudCA9PT0gXCIuLlwiIHx8IC9bPD46XCJ8PypdLy50ZXN0KHNlZ21lbnQpIHx8IFJFU0VSVkVELnRlc3Qoc2VnbWVudCkpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBVbnNhZmUgcGF0aDogJHt2YWx1ZX1gKTtcbiAgfVxuICBjb25zdCB0b3BMZXZlbCA9IHNlZ21lbnRzWzBdO1xuICBpZiAoKE1BTkFHRURfUk9PVFMgYXMgcmVhZG9ubHkgc3RyaW5nW10pLmluY2x1ZGVzKHRvcExldmVsKSkge1xuICAgIHJldHVybiBwYXRoO1xuICB9XG4gIGlmIChPQlNJRElBTl9GSUxFUy5oYXMocGF0aCkgfHwgKCFwYXRoLmluY2x1ZGVzKFwiL1wiKSAmJiAhcGF0aC5zdGFydHNXaXRoKFwiLlwiKSkpIHJldHVybiBwYXRoO1xuICB0aHJvdyBuZXcgRXJyb3IoYFBhdGggaXMgb3V0c2lkZSB0aGUgbWFuYWdlZCBib3VuZGFyeTogJHt2YWx1ZX1gKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVuc3VyZU5vUGF0aENvbmZsaWN0cyhwYXRoczogc3RyaW5nW10pOiB2b2lkIHtcbiAgY29uc3Qgc29ydGVkID0gWy4uLnBhdGhzXS5zb3J0KCk7XG4gIGZvciAobGV0IGkgPSAxOyBpIDwgc29ydGVkLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgaWYgKHNvcnRlZFtpXS5zdGFydHNXaXRoKGAke3NvcnRlZFtpIC0gMV19L2ApKSB0aHJvdyBuZXcgRXJyb3IoYEZpbGUvZGlyZWN0b3J5IHBhdGggY29uZmxpY3Q6ICR7c29ydGVkW2kgLSAxXX1gKTtcbiAgfVxufVxuIiwgImltcG9ydCB7IE1BTkFHRURfUk9PVFMsIFJlbGVhc2VFbnRyeSwgUmVsZWFzZU1hbmlmZXN0IH0gZnJvbSBcIi4vdHlwZXNcIjtcbmltcG9ydCB7IGFzc2VydE1hbmFnZWRQYXRoIH0gZnJvbSBcIi4vcGF0aC1wb2xpY3lcIjtcblxuY29uc3QgUkVRVUlSRURfU1RSSU5HX0ZJRUxEUyA9IFtcInRpdGxlXCIsIFwibWluaW11bVBsdWdpblZlcnNpb25cIiwgXCJtaW5pbXVtT2JzaWRpYW5WZXJzaW9uXCJdIGFzIGNvbnN0O1xuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VBbmRWYWxpZGF0ZU1hbmlmZXN0KGlucHV0OiB1bmtub3duKTogUmVsZWFzZU1hbmlmZXN0IHtcbiAgaWYgKCFpc1JlY29yZChpbnB1dCkpIHRocm93IG5ldyBFcnJvcihcIlJlbGVhc2UgbWFuaWZlc3QgbXVzdCBiZSBhIEpTT04gb2JqZWN0LlwiKTtcbiAgZm9yIChjb25zdCBmb3JiaWRkZW4gb2YgW1wic2lnbmF0dXJlXCIsIFwicGF5bG9hZFwiLCBcImNvbGxlY3Rpb25LZXlcIiwgXCJzaGEyNTZcIiwgXCJzaXplXCIsIFwiZG93bmxvYWRVcmxcIiwgXCJ1cmxcIl0pIHtcbiAgICBpZiAoZm9yYmlkZGVuIGluIGlucHV0KSB0aHJvdyBuZXcgRXJyb3IoYE1hbmlmZXN0IGNvbnRhaW5zIHVuc3VwcG9ydGVkIGZpZWxkOiAke2ZvcmJpZGRlbn0uYCk7XG4gIH1cbiAgaWYgKGlucHV0LnNjaGVtYVZlcnNpb24gIT09IDIgfHwgaW5wdXQucHJvZHVjdCAhPT0gXCJUYnBlZGlhLURpc3RyaWJ1dGVcIiB8fCBpbnB1dC5wbHVnaW4gIT09IFwidGJwZWRpYS11cGRhdGVcIikgdGhyb3cgbmV3IEVycm9yKFwiVGhpcyBpcyBub3QgYSBzdXBwb3J0ZWQgaW5jcmVtZW50YWwgVGJwZWRpYSByZWxlYXNlIG1hbmlmZXN0LlwiKTtcbiAgaWYgKGlucHV0LmNoYW5uZWwgIT09IFwic3RhYmxlXCIpIHRocm93IG5ldyBFcnJvcihcIk9ubHkgdGhlIHN0YWJsZSByZWxlYXNlIGNoYW5uZWwgaXMgc3VwcG9ydGVkLlwiKTtcbiAgZm9yIChjb25zdCBmaWVsZCBvZiBSRVFVSVJFRF9TVFJJTkdfRklFTERTKSBpZiAodHlwZW9mIGlucHV0W2ZpZWxkXSAhPT0gXCJzdHJpbmdcIiB8fCAhaW5wdXRbZmllbGRdLnRyaW0oKSkgdGhyb3cgbmV3IEVycm9yKGBNYW5pZmVzdCBmaWVsZCAke2ZpZWxkfSBpcyBpbnZhbGlkLmApO1xuICBpZiAoIWlzUmVjb3JkKGlucHV0LmNvbGxlY3Rpb24pIHx8ICFpc0NvbGxlY3Rpb25QYXJ0KGlucHV0LmNvbGxlY3Rpb24ubGFuZ3VhZ2UsIFwiY29kZVwiKSB8fCAhaXNDb2xsZWN0aW9uUGFydChpbnB1dC5jb2xsZWN0aW9uLnNlcmllcywgXCJpZFwiKSB8fCAhaXNDb2xsZWN0aW9uUGFydChpbnB1dC5jb2xsZWN0aW9uLmVkaXRpb24sIFwiaWRcIikpIHRocm93IG5ldyBFcnJvcihcIkNvbGxlY3Rpb24gaWRlbnRpdHkgaXMgaW52YWxpZC5cIik7XG4gIGNvbnN0IGNvbGxlY3Rpb24gPSBpbnB1dC5jb2xsZWN0aW9uIGFzIFJlbGVhc2VNYW5pZmVzdFtcImNvbGxlY3Rpb25cIl07XG4gIGNvbnN0IHJlbGVhc2VLZXkgPSBbY29sbGVjdGlvbi5sYW5ndWFnZS5jb2RlLCBjb2xsZWN0aW9uLnNlcmllcy5pZCwgY29sbGVjdGlvbi5lZGl0aW9uLmlkXS5qb2luKFwiLVwiKS50b0xvd2VyQ2FzZSgpO1xuICBpZiAoIUFycmF5LmlzQXJyYXkoaW5wdXQubWFuYWdlZFJvb3RzKSB8fCAhc2FtZVNldChpbnB1dC5tYW5hZ2VkUm9vdHMsIFsuLi5NQU5BR0VEX1JPT1RTXSkpIHRocm93IG5ldyBFcnJvcihcIm1hbmFnZWRSb290cyBkb2VzIG5vdCBtYXRjaCB0aGUgYXBwcm92ZWQgYm91bmRhcnkuXCIpO1xuICBpZiAoIUFycmF5LmlzQXJyYXkoaW5wdXQucmVsZWFzZXMpIHx8IGlucHV0LnJlbGVhc2VzLmxlbmd0aCA9PT0gMCkgdGhyb3cgbmV3IEVycm9yKFwicmVsZWFzZXMgbXVzdCBiZSBhIG5vbi1lbXB0eSBhcnJheS5cIik7XG5cbiAgY29uc3QgZXhpc3RpbmdQYXRocyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICBjb25zdCByZWxlYXNlcyA9IGlucHV0LnJlbGVhc2VzLm1hcCgoZW50cnkpID0+IHtcbiAgICBjb25zdCByZWxlYXNlID0gcGFyc2VSZWxlYXNlKGVudHJ5LCByZWxlYXNlS2V5LCBleGlzdGluZ1BhdGhzKTtcbiAgICBmb3IgKGNvbnN0IGZpbGUgb2YgcmVsZWFzZS5maWxlcykge1xuICAgICAgaWYgKGZpbGUuY2hhbmdlID09PSBcIi1cIikgZXhpc3RpbmdQYXRocy5kZWxldGUoZmlsZS5wYXRoKTtcbiAgICAgIGVsc2UgZXhpc3RpbmdQYXRocy5hZGQoZmlsZS5wYXRoKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlbGVhc2U7XG4gIH0pO1xuICBjb25zdCBpZHMgPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHJlbGVhc2VzLmxlbmd0aDsgaW5kZXggKz0gMSkge1xuICAgIGNvbnN0IHJlbGVhc2UgPSByZWxlYXNlc1tpbmRleF07XG4gICAgaWYgKGlkcy5oYXMocmVsZWFzZS5yZWxlYXNlSWQpKSB0aHJvdyBuZXcgRXJyb3IoYER1cGxpY2F0ZSByZWxlYXNlSWQ6ICR7cmVsZWFzZS5yZWxlYXNlSWR9LmApO1xuICAgIGlkcy5hZGQocmVsZWFzZS5yZWxlYXNlSWQpO1xuICAgIGlmIChpbmRleCA+IDAgJiYgY29tcGFyZVJlbGVhc2UocmVsZWFzZXNbaW5kZXggLSAxXSwgcmVsZWFzZSkgPj0gMCkgdGhyb3cgbmV3IEVycm9yKFwicmVsZWFzZXMgbXVzdCBiZSBpbiBzdHJpY3RseSBpbmNyZWFzaW5nIHZlcnNpb24gYW5kIHB1YmxpY2F0aW9uIG9yZGVyLlwiKTtcbiAgfVxuICByZXR1cm4geyAuLi5pbnB1dCwgcmVsZWFzZXMgfSBhcyBSZWxlYXNlTWFuaWZlc3Q7XG59XG5cbmZ1bmN0aW9uIHBhcnNlUmVsZWFzZShpbnB1dDogdW5rbm93biwgZXhwZWN0ZWRLZXk6IHN0cmluZywgZXhpc3RpbmdQYXRoczogU2V0PHN0cmluZz4pOiBSZWxlYXNlRW50cnkge1xuICBpZiAoIWlzUmVjb3JkKGlucHV0KSkgdGhyb3cgbmV3IEVycm9yKFwiRWFjaCByZWxlYXNlIG11c3QgYmUgYW4gb2JqZWN0LlwiKTtcbiAgZm9yIChjb25zdCBmaWVsZCBvZiBbXCJyZWxlYXNlVmVyc2lvblwiLCBcInJlbGVhc2VJZFwiLCBcInB1Ymxpc2hlZEF0XCIsIFwiZmlsZW5hbWVcIl0gYXMgY29uc3QpIGlmICh0eXBlb2YgaW5wdXRbZmllbGRdICE9PSBcInN0cmluZ1wiIHx8ICFpbnB1dFtmaWVsZF0udHJpbSgpKSB0aHJvdyBuZXcgRXJyb3IoYFJlbGVhc2UgZmllbGQgJHtmaWVsZH0gaXMgaW52YWxpZC5gKTtcbiAgY29uc3QgdmVyc2lvbiA9IHBhcnNlUmVsZWFzZVZlcnNpb24oaW5wdXQucmVsZWFzZVZlcnNpb24pO1xuICBpZiAoIXZlcnNpb24gfHwgdmVyc2lvbi5rZXkgIT09IGV4cGVjdGVkS2V5KSB0aHJvdyBuZXcgRXJyb3IoYHJlbGVhc2VWZXJzaW9uIG11c3QgaGF2ZSB0aGUgZm9ybWF0ICR7ZXhwZWN0ZWRLZXl9LVlZWVkuTS5ELmApO1xuICBjb25zdCByZWxlYXNlSWQgPSBwYXJzZVJlbGVhc2VJZChpbnB1dC5yZWxlYXNlSWQpO1xuICBpZiAoIXJlbGVhc2VJZCB8fCByZWxlYXNlSWQua2V5ICE9PSBleHBlY3RlZEtleSkgdGhyb3cgbmV3IEVycm9yKGByZWxlYXNlSWQgbXVzdCBoYXZlIHRoZSBmb3JtYXQgJHtleHBlY3RlZEtleX0tWVlZWS1NLUQuc2VxdWVuY2UsIGZvciBleGFtcGxlICR7ZXhwZWN0ZWRLZXl9LTIwMjYtMTAtMS4xLmApO1xuICBpZiAocmVsZWFzZUlkLnllYXIgIT09IHZlcnNpb24ueWVhciB8fCByZWxlYXNlSWQubW9udGggIT09IHZlcnNpb24ubW9udGggfHwgcmVsZWFzZUlkLmRheSAhPT0gdmVyc2lvbi5kYXkpIHRocm93IG5ldyBFcnJvcihcInJlbGVhc2VJZCBkYXRlIG11c3QgbWF0Y2ggcmVsZWFzZVZlcnNpb24uXCIpO1xuICBpZiAoTnVtYmVyLmlzTmFOKERhdGUucGFyc2UoaW5wdXQucHVibGlzaGVkQXQpKSkgdGhyb3cgbmV3IEVycm9yKFwicHVibGlzaGVkQXQgbXVzdCBiZSBJU08tODYwMS5cIik7XG4gIGlmICghQXJyYXkuaXNBcnJheShpbnB1dC5maWxlcykgfHwgIUFycmF5LmlzQXJyYXkoaW5wdXQuZGVsZXRpb25zKSkgdGhyb3cgbmV3IEVycm9yKFwiZmlsZXMgYW5kIGRlbGV0aW9ucyBtdXN0IGJlIGFycmF5cy5cIik7XG4gIGNvbnN0IGZpbGVzID0gaW5wdXQuZmlsZXMubWFwKChlbnRyeSkgPT4ge1xuICAgIGlmICghaXNSZWNvcmQoZW50cnkpIHx8IHR5cGVvZiBlbnRyeS5wYXRoICE9PSBcInN0cmluZ1wiKSB0aHJvdyBuZXcgRXJyb3IoXCJFYWNoIGZpbGUgZW50cnkgbmVlZHMgYSBwYXRoLlwiKTtcbiAgICBjb25zdCBwYXRoID0gYXNzZXJ0TWFuYWdlZFBhdGgoZW50cnkucGF0aCk7XG4gICAgY29uc3QgY2hhbmdlID0gZW50cnkuY2hhbmdlID8/IChleGlzdGluZ1BhdGhzLmhhcyhwYXRoKSA/IFwiflwiIDogXCIrXCIpO1xuICAgIGlmIChjaGFuZ2UgIT09IFwiK1wiICYmIGNoYW5nZSAhPT0gXCItXCIgJiYgY2hhbmdlICE9PSBcIn5cIikgdGhyb3cgbmV3IEVycm9yKFwiRmlsZSBjaGFuZ2UgbXVzdCBiZSArLCAtLCBvciB+LlwiKTtcbiAgICByZXR1cm4geyBwYXRoLCBjaGFuZ2UgfTtcbiAgfSk7XG4gIGNvbnN0IGRlbGV0aW9ucyA9IGlucHV0LmRlbGV0aW9ucy5tYXAoKHBhdGgpID0+IHtcbiAgICBpZiAodHlwZW9mIHBhdGggIT09IFwic3RyaW5nXCIpIHRocm93IG5ldyBFcnJvcihcIkVhY2ggZGVsZXRpb24gbXVzdCBiZSBhIHBhdGguXCIpO1xuICAgIHJldHVybiBhc3NlcnRNYW5hZ2VkUGF0aChwYXRoKTtcbiAgfSk7XG4gIGZvciAoY29uc3QgcGF0aCBvZiBkZWxldGlvbnMpIHtcbiAgICBjb25zdCBmaWxlID0gZmlsZXMuZmluZCgoZW50cnkpID0+IGVudHJ5LnBhdGggPT09IHBhdGgpO1xuICAgIGlmIChmaWxlICYmIGZpbGUuY2hhbmdlICE9PSBcIi1cIikgdGhyb3cgbmV3IEVycm9yKFwiQSBkZWxldGlvbiBjb25mbGljdHMgd2l0aCBhIGZpbGUgd3JpdGUuXCIpO1xuICAgIGlmICghZmlsZSkgZmlsZXMucHVzaCh7IHBhdGgsIGNoYW5nZTogXCItXCIgfSk7XG4gIH1cbiAgY29uc3QgYWxsUGF0aHMgPSBmaWxlcy5tYXAoKGZpbGUpID0+IGZpbGUucGF0aCk7XG4gIGlmIChuZXcgU2V0KGFsbFBhdGhzKS5zaXplICE9PSBhbGxQYXRocy5sZW5ndGgpIHRocm93IG5ldyBFcnJvcihgUmVsZWFzZSAke2lucHV0LnJlbGVhc2VJZH0gY29udGFpbnMgZHVwbGljYXRlIG9yIGNvbmZsaWN0aW5nIHBhdGhzLmApO1xuICBpZiAoIWlzUmVjb3JkKGlucHV0LnJlbGVhc2VOb3RlcykgfHwgdHlwZW9mIGlucHV0LnJlbGVhc2VOb3Rlcy5zdW1tYXJ5ICE9PSBcInN0cmluZ1wiIHx8ICFbXCJhZGRlZFwiLCBcInVwZGF0ZWRcIiwgXCJyZW1vdmVkXCJdLmV2ZXJ5KChrZXkpID0+IHR5cGVvZiBpbnB1dC5yZWxlYXNlTm90ZXNba2V5XSA9PT0gXCJudW1iZXJcIiAmJiBpbnB1dC5yZWxlYXNlTm90ZXNba2V5XSA+PSAwKSkgdGhyb3cgbmV3IEVycm9yKFwicmVsZWFzZU5vdGVzIGlzIGludmFsaWQuXCIpO1xuICByZXR1cm4geyByZWxlYXNlVmVyc2lvbjogaW5wdXQucmVsZWFzZVZlcnNpb24sIHJlbGVhc2VJZDogaW5wdXQucmVsZWFzZUlkLCBwdWJsaXNoZWRBdDogaW5wdXQucHVibGlzaGVkQXQsIGZpbGVuYW1lOiBpbnB1dC5maWxlbmFtZSwgZmlsZXMsIGRlbGV0aW9uczogZmlsZXMuZmlsdGVyKChmaWxlKSA9PiBmaWxlLmNoYW5nZSA9PT0gXCItXCIpLm1hcCgoZmlsZSkgPT4gZmlsZS5wYXRoKSwgcmVsZWFzZU5vdGVzOiBpbnB1dC5yZWxlYXNlTm90ZXMgYXMgUmVsZWFzZUVudHJ5W1wicmVsZWFzZU5vdGVzXCJdIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb21wYXJlVmVyc2lvbnMoYTogc3RyaW5nLCBiOiBzdHJpbmcpOiBudW1iZXIge1xuICBjb25zdCBwYXJzZSA9ICh2YWx1ZTogc3RyaW5nKSA9PiB2YWx1ZS5yZXBsYWNlKC9edi8sIFwiXCIpLnNwbGl0KC9bListXS8pLnNsaWNlKDAsIDMpLm1hcCgocGFydCkgPT4gTnVtYmVyLnBhcnNlSW50KHBhcnQsIDEwKSB8fCAwKTtcbiAgY29uc3QgbGVmdCA9IHBhcnNlKGEpOyBjb25zdCByaWdodCA9IHBhcnNlKGIpO1xuICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgMzsgaW5kZXggKz0gMSkgaWYgKGxlZnRbaW5kZXhdICE9PSByaWdodFtpbmRleF0pIHJldHVybiBsZWZ0W2luZGV4XSAtIHJpZ2h0W2luZGV4XTtcbiAgcmV0dXJuIDA7XG59XG4vKiogQ29tcGFyZXMgcmVhZGFibGUgY29sbGVjdGlvbiByZWxlYXNlIHZlcnNpb25zLCB3aGlsZSBhY2NlcHRpbmcgbGVnYWN5IGRhdGUtb25seSBzdG9yZWQgdmVyc2lvbnMuICovXG5leHBvcnQgZnVuY3Rpb24gY29tcGFyZVJlbGVhc2VWZXJzaW9ucyhhOiBzdHJpbmcsIGI6IHN0cmluZyk6IG51bWJlciB7XG4gIGNvbnN0IGxlZnQgPSBwYXJzZVJlbGVhc2VWZXJzaW9uKGEpOyBjb25zdCByaWdodCA9IHBhcnNlUmVsZWFzZVZlcnNpb24oYik7XG4gIGlmICghbGVmdCB8fCAhcmlnaHQpIHJldHVybiBjb21wYXJlVmVyc2lvbnMoYSwgYik7XG4gIHJldHVybiBjb21wYXJlRGF0ZXMobGVmdCwgcmlnaHQpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNvbXBhcmVSZWxlYXNlKGE6IFJlbGVhc2VFbnRyeSwgYjogUmVsZWFzZUVudHJ5KTogbnVtYmVyIHtcbiAgY29uc3QgdmVyc2lvbiA9IGNvbXBhcmVSZWxlYXNlVmVyc2lvbnMoYS5yZWxlYXNlVmVyc2lvbiwgYi5yZWxlYXNlVmVyc2lvbik7XG4gIGlmICh2ZXJzaW9uKSByZXR1cm4gdmVyc2lvbjtcbiAgY29uc3Qgc2VxdWVuY2UgPSBwYXJzZVJlbGVhc2VJZChhLnJlbGVhc2VJZCkhLnNlcXVlbmNlIC0gcGFyc2VSZWxlYXNlSWQoYi5yZWxlYXNlSWQpIS5zZXF1ZW5jZTtcbiAgcmV0dXJuIHNlcXVlbmNlIHx8IERhdGUucGFyc2UoYS5wdWJsaXNoZWRBdCkgLSBEYXRlLnBhcnNlKGIucHVibGlzaGVkQXQpO1xufVxuZnVuY3Rpb24gcGFyc2VSZWxlYXNlVmVyc2lvbih2YWx1ZTogc3RyaW5nKTogeyBrZXk/OiBzdHJpbmc7IHllYXI6IG51bWJlcjsgbW9udGg6IG51bWJlcjsgZGF5OiBudW1iZXIgfSB8IHVuZGVmaW5lZCB7XG4gIGNvbnN0IG1hdGNoID0gL14oPzooW2EtejAtOV0rKD86LVthLXowLTldKykqKS0pPyhcXGR7NH0pXFwuKFxcZHsxLDJ9KVxcLihcXGR7MSwyfSkkLy5leGVjKHZhbHVlKTtcbiAgcmV0dXJuIG1hdGNoICYmIHZhbGlkRGF0ZShOdW1iZXIobWF0Y2hbMl0pLCBOdW1iZXIobWF0Y2hbM10pLCBOdW1iZXIobWF0Y2hbNF0pKSA/IHsga2V5OiBtYXRjaFsxXSwgeWVhcjogTnVtYmVyKG1hdGNoWzJdKSwgbW9udGg6IE51bWJlcihtYXRjaFszXSksIGRheTogTnVtYmVyKG1hdGNoWzRdKSB9IDogdW5kZWZpbmVkO1xufVxuZnVuY3Rpb24gcGFyc2VSZWxlYXNlSWQodmFsdWU6IHN0cmluZyk6IHsga2V5Pzogc3RyaW5nOyB5ZWFyOiBudW1iZXI7IG1vbnRoOiBudW1iZXI7IGRheTogbnVtYmVyOyBzZXF1ZW5jZTogbnVtYmVyIH0gfCB1bmRlZmluZWQge1xuICBjb25zdCBtYXRjaCA9IC9eKD86KFthLXowLTldKyg/Oi1bYS16MC05XSspKiktKT8oXFxkezR9KS0oXFxkezEsMn0pLShcXGR7MSwyfSlcXC4oXFxkKykkLy5leGVjKHZhbHVlKTtcbiAgaWYgKCFtYXRjaCkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgY29uc3QgeWVhciA9IE51bWJlcihtYXRjaFsyXSk7IGNvbnN0IG1vbnRoID0gTnVtYmVyKG1hdGNoWzNdKTsgY29uc3QgZGF5ID0gTnVtYmVyKG1hdGNoWzRdKTsgY29uc3Qgc2VxdWVuY2UgPSBOdW1iZXIobWF0Y2hbNV0pO1xuICByZXR1cm4gdmFsaWREYXRlKHllYXIsIG1vbnRoLCBkYXkpICYmIE51bWJlci5pc1NhZmVJbnRlZ2VyKHNlcXVlbmNlKSAmJiBzZXF1ZW5jZSA+PSAxID8geyBrZXk6IG1hdGNoWzFdLCB5ZWFyLCBtb250aCwgZGF5LCBzZXF1ZW5jZSB9IDogdW5kZWZpbmVkO1xufVxuZnVuY3Rpb24gY29tcGFyZURhdGVzKGE6IHsgeWVhcjogbnVtYmVyOyBtb250aDogbnVtYmVyOyBkYXk6IG51bWJlciB9LCBiOiB7IHllYXI6IG51bWJlcjsgbW9udGg6IG51bWJlcjsgZGF5OiBudW1iZXIgfSk6IG51bWJlciB7IHJldHVybiBhLnllYXIgLSBiLnllYXIgfHwgYS5tb250aCAtIGIubW9udGggfHwgYS5kYXkgLSBiLmRheTsgfVxuZnVuY3Rpb24gdmFsaWREYXRlKHllYXI6IG51bWJlciwgbW9udGg6IG51bWJlciwgZGF5OiBudW1iZXIpOiBib29sZWFuIHsgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKERhdGUuVVRDKHllYXIsIG1vbnRoIC0gMSwgZGF5KSk7IHJldHVybiBkYXRlLmdldFVUQ0Z1bGxZZWFyKCkgPT09IHllYXIgJiYgZGF0ZS5nZXRVVENNb250aCgpID09PSBtb250aCAtIDEgJiYgZGF0ZS5nZXRVVENEYXRlKCkgPT09IGRheTsgfVxuZnVuY3Rpb24gaXNDb2xsZWN0aW9uUGFydCh2YWx1ZTogdW5rbm93biwgaWRlbnRpdHk6IFwiY29kZVwiIHwgXCJpZFwiKTogdmFsdWUgaXMgUmVjb3JkPHN0cmluZywgc3RyaW5nPiB7IHJldHVybiBpc1JlY29yZCh2YWx1ZSkgJiYgdHlwZW9mIHZhbHVlW2lkZW50aXR5XSA9PT0gXCJzdHJpbmdcIiAmJiB2YWx1ZVtpZGVudGl0eV0udHJpbSgpLmxlbmd0aCA+IDA7IH1cbmZ1bmN0aW9uIGlzUmVjb3JkKHZhbHVlOiB1bmtub3duKTogdmFsdWUgaXMgUmVjb3JkPHN0cmluZywgYW55PiB7IHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiYgdmFsdWUgIT09IG51bGwgJiYgIUFycmF5LmlzQXJyYXkodmFsdWUpOyB9XG5mdW5jdGlvbiBzYW1lU2V0KHZhbHVlczogdW5rbm93bltdLCBleHBlY3RlZDogc3RyaW5nW10pOiBib29sZWFuIHsgcmV0dXJuIHZhbHVlcy5sZW5ndGggPT09IGV4cGVjdGVkLmxlbmd0aCAmJiBuZXcgU2V0KHZhbHVlcykuc2l6ZSA9PT0gdmFsdWVzLmxlbmd0aCAmJiB2YWx1ZXMuZXZlcnkoKHZhbHVlKSA9PiB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgJiYgZXhwZWN0ZWQuaW5jbHVkZXModmFsdWUpKTsgfVxuIiwgImltcG9ydCB7IEZpbGVDaGFuZ2UsIEluc3RhbGxlZFN0YXRlLCBSZWxlYXNlTWFuaWZlc3QgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG50eXBlIExlZ2FjeUZpbGVzID0gUmVjb3JkPHN0cmluZywgQXJyYXk8c3RyaW5nIHwgRmlsZUNoYW5nZT4+IHwgc3RyaW5nW107XG5cbmV4cG9ydCBmdW5jdGlvbiBtaWdyYXRlT3duZWRGaWxlcyh2YWx1ZTogTGVnYWN5RmlsZXMsIGluc3RhbGxlZDogSW5zdGFsbGVkU3RhdGUsIG1hbmlmZXN0PzogUmVsZWFzZU1hbmlmZXN0KTogUmVjb3JkPHN0cmluZywgRmlsZUNoYW5nZVtdPiB7XG4gIGNvbnN0IHNvdXJjZSA9IEFycmF5LmlzQXJyYXkodmFsdWUpID8geyBsZWdhY3k6IHZhbHVlIH0gOiB2YWx1ZTtcbiAgY29uc3QgZ3JvdXBzOiBSZWNvcmQ8c3RyaW5nLCBGaWxlQ2hhbmdlW10+ID0ge307XG4gIGZvciAoY29uc3QgW2lkLCBlbnRyaWVzXSBvZiBPYmplY3QuZW50cmllcyhzb3VyY2UpKSB7XG4gICAgZ3JvdXBzW2lkXSA9IGVudHJpZXMubWFwKChlbnRyeSkgPT4gdHlwZW9mIGVudHJ5ID09PSBcInN0cmluZ1wiID8geyBwYXRoOiBlbnRyeSwgY2hhbmdlOiBcIitcIiB9IDogeyAuLi5lbnRyeSB9KTtcbiAgfVxuICBpZiAobWFuaWZlc3QpIHtcbiAgICBmb3IgKGNvbnN0IHJlbGVhc2Ugb2YgbWFuaWZlc3QucmVsZWFzZXMpIHtcbiAgICAgIGlmICghaW5zdGFsbGVkLmFwcGxpZWRSZWxlYXNlSWRzLmluY2x1ZGVzKHJlbGVhc2UucmVsZWFzZUlkKSAmJiBpbnN0YWxsZWQucmVsZWFzZUlkICE9PSByZWxlYXNlLnJlbGVhc2VJZCkgY29udGludWU7XG4gICAgICBjb25zdCBrbm93biA9IG5ldyBTZXQocmVsZWFzZS5maWxlcy5tYXAoKGZpbGUpID0+IGZpbGUucGF0aCkpO1xuICAgICAgZ3JvdXBzW3JlbGVhc2UucmVsZWFzZUlkXSA9IFsuLi5yZWxlYXNlLmZpbGVzLm1hcCgoZmlsZSkgPT4gKHsgLi4uZmlsZSB9KSksIC4uLihncm91cHNbcmVsZWFzZS5yZWxlYXNlSWRdID8/IFtdKS5maWx0ZXIoKGZpbGUpID0+ICFrbm93bi5oYXMoZmlsZS5wYXRoKSldO1xuICAgICAgaWYgKGdyb3Vwcy5sZWdhY3kpIGdyb3Vwcy5sZWdhY3kgPSBncm91cHMubGVnYWN5LmZpbHRlcigoZmlsZSkgPT4gIWtub3duLmhhcyhmaWxlLnBhdGgpKTtcbiAgICB9XG4gICAgaWYgKGdyb3Vwcy5sZWdhY3k/Lmxlbmd0aCA9PT0gMCkgZGVsZXRlIGdyb3Vwcy5sZWdhY3k7XG4gIH1cbiAgcmV0dXJuIGdyb3Vwcztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGN1cnJlbnRPd25lZFBhdGhzKGluc3RhbGxlZDogSW5zdGFsbGVkU3RhdGUpOiBTZXQ8c3RyaW5nPiB7XG4gIGNvbnN0IG93bmVkID0gbmV3IFNldDxzdHJpbmc+KCk7XG4gIGNvbnN0IG9yZGVyID0gWy4uLm5ldyBTZXQoWy4uLk9iamVjdC5rZXlzKGluc3RhbGxlZC5vd25lZEZpbGVzKS5maWx0ZXIoKGlkKSA9PiAhaW5zdGFsbGVkLmFwcGxpZWRSZWxlYXNlSWRzLmluY2x1ZGVzKGlkKSksIC4uLmluc3RhbGxlZC5hcHBsaWVkUmVsZWFzZUlkc10pXTtcbiAgZm9yIChjb25zdCBpZCBvZiBvcmRlcikge1xuICAgIGZvciAoY29uc3QgZmlsZSBvZiBpbnN0YWxsZWQub3duZWRGaWxlc1tpZF0gPz8gW10pIHtcbiAgICAgIGlmIChmaWxlLmNoYW5nZSA9PT0gXCItXCIpIG93bmVkLmRlbGV0ZShmaWxlLnBhdGgpO1xuICAgICAgZWxzZSBvd25lZC5hZGQoZmlsZS5wYXRoKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG93bmVkO1xufVxyXG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBLGtGQUFBQSxTQUFBO0FBWUEsTUFBQyxTQUFTLEdBQUU7QUFBQyxVQUFHLFlBQVUsT0FBTyxXQUFTLGVBQWEsT0FBT0EsUUFBTyxDQUFBQSxRQUFPLFVBQVEsRUFBRTtBQUFBLGVBQVUsY0FBWSxPQUFPLFVBQVEsT0FBTyxJQUFJLFFBQU8sQ0FBQyxHQUFFLENBQUM7QUFBQSxXQUFNO0FBQUMsU0FBQyxlQUFhLE9BQU8sU0FBTyxTQUFPLGVBQWEsT0FBTyxTQUFPLFNBQU8sZUFBYSxPQUFPLE9BQUssT0FBSyxNQUFNLFFBQU0sRUFBRTtBQUFBLE1BQUM7QUFBQSxJQUFDLEdBQUUsV0FBVTtBQUFDLGNBQU8sU0FBUyxFQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsaUJBQVMsRUFBRSxHQUFFQyxJQUFFO0FBQUMsY0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFFO0FBQUMsZ0JBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRTtBQUFDLGtCQUFJLElBQUUsY0FBWSxPQUFPLFdBQVM7QUFBUSxrQkFBRyxDQUFDQSxNQUFHLEVBQUUsUUFBTyxFQUFFLEdBQUUsSUFBRTtBQUFFLGtCQUFHLEVBQUUsUUFBTyxFQUFFLEdBQUUsSUFBRTtBQUFFLGtCQUFJLElBQUUsSUFBSSxNQUFNLHlCQUF1QixJQUFFLEdBQUc7QUFBRSxvQkFBTSxFQUFFLE9BQUssb0JBQW1CO0FBQUEsWUFBQztBQUFDLGdCQUFJLElBQUUsRUFBRSxDQUFDLElBQUUsRUFBQyxTQUFRLENBQUMsRUFBQztBQUFFLGNBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsU0FBUSxTQUFTQSxJQUFFO0FBQUMsa0JBQUlDLEtBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFRCxFQUFDO0FBQUUscUJBQU8sRUFBRUMsTUFBR0QsRUFBQztBQUFBLFlBQUMsR0FBRSxHQUFFLEVBQUUsU0FBUSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUEsVUFBQztBQUFDLGlCQUFPLEVBQUUsQ0FBQyxFQUFFO0FBQUEsUUFBTztBQUFDLGlCQUFRLElBQUUsY0FBWSxPQUFPLFdBQVMsU0FBUSxJQUFFLEdBQUUsSUFBRSxFQUFFLFFBQU8sSUFBSSxHQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQUUsZUFBTztBQUFBLE1BQUMsR0FBRSxFQUFDLEdBQUUsQ0FBQyxTQUFTLEdBQUUsR0FBRSxHQUFFO0FBQUM7QUFBYSxZQUFJLElBQUUsRUFBRSxTQUFTLEdBQUUsSUFBRSxFQUFFLFdBQVcsR0FBRSxJQUFFO0FBQW9FLFVBQUUsU0FBTyxTQUFTQSxJQUFFO0FBQUMsbUJBQVFDLElBQUVDLElBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLElBQUUsQ0FBQyxHQUFFLElBQUUsR0FBRSxJQUFFRixHQUFFLFFBQU8sSUFBRSxHQUFFRyxLQUFFLGFBQVcsRUFBRSxVQUFVSCxFQUFDLEdBQUUsSUFBRUEsR0FBRSxTQUFRLEtBQUUsSUFBRSxHQUFFLElBQUVHLE1BQUdGLEtBQUVELEdBQUUsR0FBRyxHQUFFRSxLQUFFLElBQUUsSUFBRUYsR0FBRSxHQUFHLElBQUUsR0FBRSxJQUFFLElBQUVBLEdBQUUsR0FBRyxJQUFFLE1BQUlDLEtBQUVELEdBQUUsV0FBVyxHQUFHLEdBQUVFLEtBQUUsSUFBRSxJQUFFRixHQUFFLFdBQVcsR0FBRyxJQUFFLEdBQUUsSUFBRSxJQUFFQSxHQUFFLFdBQVcsR0FBRyxJQUFFLElBQUcsSUFBRUMsTUFBRyxHQUFFLEtBQUcsSUFBRUEsT0FBSSxJQUFFQyxNQUFHLEdBQUUsSUFBRSxJQUFFLEtBQUcsS0FBR0EsT0FBSSxJQUFFLEtBQUcsSUFBRSxJQUFHLElBQUUsSUFBRSxJQUFFLEtBQUcsSUFBRSxJQUFHLEVBQUUs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O0FBQUUsVUFBRSxVQUFRLFNBQVNELElBQUVDLElBQUVDLElBQUUsR0FBRTtBQUFDLGNBQUksSUFBRSxHQUFFLElBQUUsSUFBRUE7QUFBRSxVQUFBRixNQUFHO0FBQUcsbUJBQVEsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFJLENBQUFBLEtBQUVBLE9BQUksSUFBRSxFQUFFLE9BQUtBLEtBQUVDLEdBQUUsQ0FBQyxFQUFFO0FBQUUsaUJBQU0sS0FBR0Q7QUFBQSxRQUFDO0FBQUEsTUFBQyxHQUFFLENBQUMsQ0FBQyxHQUFFLElBQUcsQ0FBQyxTQUFTLEdBQUUsR0FBRSxHQUFFO0FBQUM7QUFBYSxZQUFJLEdBQUUsSUFBRSxFQUFFLGlCQUFpQixHQUFFLElBQUUsRUFBRSxTQUFTLEdBQUUsSUFBRSxFQUFFLFdBQVcsR0FBRSxJQUFFLEVBQUUsU0FBUyxHQUFFLElBQUUsRUFBRSxZQUFZLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxJQUFHLElBQUUsSUFBRyxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxLQUFJLElBQUUsSUFBRyxJQUFFLElBQUcsSUFBRSxJQUFFLElBQUUsR0FBRSxJQUFFLElBQUcsSUFBRSxHQUFFLElBQUUsS0FBSSxJQUFFLElBQUUsSUFBRSxHQUFFLElBQUUsSUFBRyxJQUFFLEtBQUksSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRTtBQUFFLGlCQUFTLEVBQUVBLElBQUVDLElBQUU7QUFBQyxpQkFBT0QsR0FBRSxNQUFJLEVBQUVDLEVBQUMsR0FBRUE7QUFBQSxRQUFDO0FBQUMsaUJBQVMsRUFBRUQsSUFBRTtBQUFDLGtCQUFPQSxNQUFHLE1BQUksSUFBRUEsS0FBRSxJQUFFO0FBQUEsUUFBRTtBQUFDLGlCQUFTLEVBQUVBLElBQUU7QUFBQyxtQkFBUUMsS0FBRUQsR0FBRSxRQUFPLEtBQUcsRUFBRUMsS0FBRyxDQUFBRCxHQUFFQyxFQUFDLElBQUU7QUFBQSxRQUFDO0FBQUMsaUJBQVMsRUFBRUQsSUFB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QUFPLEdBQUUsRUFBRUEsSUFBRUcsRUFBQyxHQUFFLE1BQUlILEdBQUUsYUFBVyxFQUFFQSxJQUFFSixHQUFFLFVBQVEsRUFBRSxHQUFFLEVBQUVJLElBQUUsUUFBTUosR0FBRSxLQUFLLElBQUdBLEdBQUUsUUFBTTtBQUFBLFVBQUM7QUFBQyxjQUFHLE9BQUtJLEdBQUUsT0FBTyxLQUFHQSxHQUFFLE9BQU8sT0FBTTtBQUFDLGlCQUFJQyxLQUFFRCxHQUFFLFNBQVFBLEdBQUUsV0FBUyxRQUFNQSxHQUFFLE9BQU8sTUFBTSxZQUFVQSxHQUFFLFlBQVVBLEdBQUUscUJBQW1CQSxHQUFFLE9BQU8sUUFBTUEsR0FBRSxVQUFRQyxPQUFJTCxHQUFFLFFBQU0sRUFBRUEsR0FBRSxPQUFNSSxHQUFFLGFBQVlBLEdBQUUsVUFBUUMsSUFBRUEsRUFBQyxJQUFHLEVBQUVMLEVBQUMsR0FBRUssS0FBRUQsR0FBRSxTQUFRQSxHQUFFLFlBQVVBLEdBQUUscUJBQW9CLEdBQUVBLElBQUUsTUFBSUEsR0FBRSxPQUFPLE1BQU1BLEdBQUUsT0FBTyxDQUFDLEdBQUVBLEdBQUU7QUFBVSxZQUFBQSxHQUFFLE9BQU8sUUFBTUEsR0FBRSxVQUFRQyxPQUFJTCxHQUFFLFFBQU0sRUFBRUEsR0FBRSxPQUFNSSxHQUFFLGFBQVlBLEdBQUUsVUFBUUMsSUFBRUEsRUFBQyxJQUFHRCxHQUFFLFlBQVVBLEdBQUUsT0FBTyxNQUFNLFdBQVNBLEdBQUUsVUFBUSxHQUFFQSxHQUFFLFNBQU87QUFBQSxVQUFHLE1BQU0sQ0FBQUEsR0FBRSxTQUFPO0FBQUcsY0FBRyxPQUFLQSxHQUFFLE9BQU8sS0FBR0EsR0FBRSxPQUFPLE1BQUs7QUFBQyxZQUFBQyxLQUFFRCxHQUFFO0FBQVEsZUFBRTtBQUFDLGtCQUFHQSxHQUFFLFlBQVVBLEdBQUUscUJBQW1CQSxHQUFFLE9BQU8sUUFBTUEsR0FBRSxVQUFRQyxPQUFJTCxHQUFFLFFBQU0sRUFBRUEsR0FBRSxPQUFNSSxHQUFFLGFBQVlBLEdBQUUsVUFBUUMsSUFBRUEsRUFBQyxJQUFHLEVBQUVM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LFdBQVMsR0FBRUEsR0FBRSxXQUFTLElBQUUsSUFBRSxJQUFFLElBQUUsSUFBRSxLQUFHLElBQUUsSUFBR0EsR0FBRSxZQUFVLElBQUUsSUFBRSxJQUFFLElBQUUsTUFBSSxPQUFLLElBQUUsSUFBR0UsR0FBRSxPQUFLLEdBQUVBLEdBQUUsT0FBSztBQUFBLFFBQUM7QUFBQSxNQUFDLEdBQUUsQ0FBQyxDQUFDLEdBQUUsSUFBRyxDQUFDLFNBQVMsR0FBRSxHQUFFLEdBQUU7QUFBQztBQUFhLFlBQUksSUFBRSxFQUFFLGlCQUFpQixHQUFFLElBQUUsRUFBRSxXQUFXLEdBQUUsSUFBRSxFQUFFLFNBQVMsR0FBRSxJQUFFLEVBQUUsV0FBVyxHQUFFLElBQUUsRUFBRSxZQUFZLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxJQUFHLElBQUUsR0FBRSxJQUFFLEtBQUksSUFBRTtBQUFJLGlCQUFTLEVBQUVGLElBQUU7QUFBQyxrQkFBT0EsT0FBSSxLQUFHLFFBQU1BLE9BQUksSUFBRSxXQUFTLFFBQU1BLE9BQUksT0FBSyxNQUFJQSxPQUFJO0FBQUEsUUFBRztBQUFDLGlCQUFTLElBQUc7QUFBQyxlQUFLLE9BQUssR0FBRSxLQUFLLE9BQUssT0FBRyxLQUFLLE9BQUssR0FBRSxLQUFLLFdBQVMsT0FBRyxLQUFLLFFBQU0sR0FBRSxLQUFLLE9BQUssR0FBRSxLQUFLLFFBQU0sR0FBRSxLQUFLLFFBQU0sR0FBRSxLQUFLLE9BQUssTUFBSyxLQUFLLFFBQU0sR0FBRSxLQUFLLFFBQU0sR0FBRSxLQUFLLFFBQU0sR0FBRSxLQUFLLFFBQU0sR0FBRSxLQUFLLFNBQU8sTUFBSyxLQUFLLE9BQUssR0FBRSxLQUFLLE9BQUssR0FBRSxLQUFLLFNBQU8sR0FBRSxLQUFLLFNBQU8sR0FBRSxLQUFLLFFBQU0sR0FBRSxLQUFLLFVBQVEsTUFBSyxLQUFLLFdBQVMsTUFBSyxLQUFLLFVBQVEsR0FBRSxLQUFLLFdBQVMsR0FBRSxLQUFLLFFBQU0sR0FBRSxLQUFLLE9BQUssR0FBRSxLQUFLLFFBQU0sR0FBRSxLQUFLLE9BQUssR0FBRSxLQUFLLE9BQUssTUFBSyxLQUFLLE9BQUssSUFBSSxFQUFFLE1BQU0sR0FBRyxHQUFFLEtBQUssT0FBSyxJQUFJLEVBQUUsTUFBTSxHQUFHLEdBQUUsS0FBSyxTQUFPLE1BQUssS0FBSyxVQUFRLE1BQUssS0FBSyxPQUFLLEdBQUUsS0FBSyxPQUFLLEdBQUUsS0FBSyxNQUFJO0FBQUEsUUFBQztBQUFDLGlCQUFTLEVBQUVBLElBQUU7QUFBQyxjQUFJQztBQUFFLGlCQUFPRCxNQUFHQSxHQUFFLFNBQU9DLEtBQUVELEdBQUUsT0FBTUEsR0FBRSxXQUFTQSxHQUFFLFlBQVVDLEdBQUUsUUFBTSxHQUFFRCxHQUFFLE1BQUksSUFBR0MsR0FBRSxTQUFPRCxHQUFFLFFBQU0sSUFBRUMsR0FBRSxPQUFNQSxHQUFFLE9BQUssR0FBRUEsR0FBRSxPQUFLLEdBQUVBLEdBQUUsV0FBUyxHQUFFQSxHQUFFLE9BQUssT0FBTUEsR0FBRSxPQUFLLE1BQUtBLEdBQUUsT0FBSyxHQUFFQSxHQUFFLE9BQUssR0FBRUEsR0FBRSxVQUFRQSxHQUFFLFNBQU8sSUFBSSxFQUFFLE1BQU0sQ0FBQyxHQUFFQSxHQUFFLFdBQVNBLEdBQUUsVUFBUSxJQUFJLEVBQUUsTUFBTSxDQUFDLEdBQUVBLEdBQUUsT0FBSyxHQUFFQSxHQUFFLE9BQUssSUFBRyxLQUFHO0FBQUEsUUFBQztBQUFDLGlCQUFTLEVBQUVELElBQUU7QUFBQyxjQUFJQztBQUFFLGlCQUFPRCxNQUFHQSxHQUFFLFVBQVFDLEtBQUVELEdBQUUsT0FBTyxRQUFNLEdBQUVDLEdBQUUsUUFBTSxHQUFFQSxHQUFFLFFBQU0sR0FBRSxFQUFFRCxFQUFDLEtBQUc7QUFBQSxRQUFDO0FBQUMsaUJBQVMsRUFBRUEsSUFBRUMsSUFBRTtBQUFDLGNBQUlDLElBQUVFO0FBQUUsaUJBQU9KLE1BQUdBLEdBQUUsU0FBT0ksS0FBRUosR0FBRSxPQUFNQyxLQUFFLEtBQUdDLEtBQUUsR0FBRUQsS0FBRSxDQUFDQSxPQUFJQyxLQUFFLEtBQUdELE1BQUcs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QUUsT0FBTTtBQUFDLG9CQUFHLE1BQUlNLEdBQUUsT0FBTTtBQUFFLHFCQUFJLElBQUUsR0FBRSxJQUFFSixHQUFFRSxLQUFFLEdBQUcsR0FBRUosR0FBRSxRQUFNLEtBQUdBLEdBQUUsU0FBTyxVQUFRQSxHQUFFLEtBQUssUUFBTSxPQUFPLGFBQWEsQ0FBQyxJQUFHLEtBQUcsSUFBRU0sS0FBRztBQUFDLG9CQUFHLE1BQUlOLEdBQUUsVUFBUUEsR0FBRSxRQUFNLEVBQUVBLEdBQUUsT0FBTUUsSUFBRSxHQUFFRSxFQUFDLElBQUdFLE1BQUcsR0FBRUYsTUFBRyxHQUFFLEVBQUUsT0FBTTtBQUFBLGNBQUMsTUFBTSxDQUFBSixHQUFFLFNBQU9BLEdBQUUsS0FBSyxPQUFLO0FBQU0sY0FBQUEsR0FBRSxTQUFPLEdBQUVBLEdBQUUsT0FBSztBQUFBLFlBQUUsS0FBSztBQUFFLGtCQUFHLE9BQUtBLEdBQUUsT0FBTTtBQUFDLG9CQUFHLE1BQUlNLEdBQUUsT0FBTTtBQUFFLHFCQUFJLElBQUUsR0FBRSxJQUFFSixHQUFFRSxLQUFFLEdBQUcsR0FBRUosR0FBRSxRQUFNLEtBQUdBLEdBQUUsU0FBTyxVQUFRQSxHQUFFLEtBQUssV0FBUyxPQUFPLGFBQWEsQ0FBQyxJQUFHLEtBQUcsSUFBRU0sS0FBRztBQUFDLG9CQUFHLE1BQUlOLEdBQUUsVUFBUUEsR0FBRSxRQUFNLEVBQUVBLEdBQUUsT0FBTUUsSUFBRSxHQUFFRSxFQUFDLElBQUdFLE1BQUcsR0FBRUYsTUFBRyxHQUFFLEVBQUUsT0FBTTtBQUFBLGNBQUMsTUFBTSxDQUFBSixHQUFFLFNBQU9BLEdBQUUsS0FBSyxVQUFRO0FBQU0sY0FBQUEsR0FBRSxPQUFLO0FBQUEsWUFBRSxLQUFLO0FBQUUsa0JBQUcsTUFBSUEsR0FBRSxPQUFNO0FBQUMsdUJBQUtTLEtBQUUsTUFBSTtBQUFDLHNCQUFHLE1BQUlILEdBQUUsT0FBTTtBQUFFLGtCQUFBQSxNQUFJRSxNQUFHTixHQUFFRSxJQUFHLEtBQUdLLElBQUVBLE1BQUc7QUFBQSxnQkFBQztBQUFDLG9CQUFH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RyxJQUFHLElBQUcsSUFBRyxJQUFHLEVBQUUsR0FBRSxJQUFFLENBQUMsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLEtBQUksS0FBSSxLQUFJLEtBQUksS0FBSSxLQUFJLE1BQUssTUFBSyxNQUFLLE1BQUssTUFBSyxNQUFLLE1BQUssT0FBTSxPQUFNLE9BQU0sR0FBRSxDQUFDLEdBQUUsSUFBRSxDQUFDLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsRUFBRTtBQUFFLFVBQUUsVUFBUSxTQUFTRixJQUFFQyxJQUFFQyxJQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLGNBQUksR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsSUFBRSxFQUFFLE1BQUssSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsTUFBSyxJQUFFLEdBQUUsSUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEdBQUUsSUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEdBQUUsSUFBRSxNQUFLLElBQUU7QUFBRSxlQUFJLElBQUUsR0FBRSxLQUFHLElBQUcsSUFBSSxHQUFFLENBQUMsSUFBRTtBQUFFLGVBQUksSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFJLEdBQUVELEdBQUVDLEtBQUUsQ0FBQyxDQUFDO0FBQUksZUFBSSxJQUFFLEdBQUUsSUFBRSxJQUFHLEtBQUcsS0FBRyxNQUFJLEVBQUUsQ0FBQyxHQUFFLElBQUk7QUFBQyxjQUFHLElBQUUsTUFBSSxJQUFFLElBQUcsTUFBSSxFQUFFLFFBQU8sRUFBRSxHQUFHLElBQUUsVUFBUyxFQUFFLEdBQUcsSUFBRSxVQUFTLEVBQUUsT0FBSyxHQUFFO0FBQUUsZUFBSSxJQUFFLEdBQUUsSUFBRSxLQUFHLE1BQUksRUFBRSxDQUFDLEdBQUUsSUFBSTtBQUFDLGVBQUksSUFBRSxNQUFJLElBQUUsSUFBRyxJQUFFLElBQUUsR0FBRSxLQUFHLElBQUcsSUFBSSxLQUFHLE1BQUksSUFBRyxLQUFHLEVBQUUsQ0FBQyxLQUFHLEVBQUUsUUFBTTtBQUFHLGNBQUcsSUFBRSxNQUFJLE1BQUlGLE1BQUcsTUFBSSxHQUFHLFFBQU07QUFBRyxlQUFJLEVBQUUsQ0FBQyxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsSUFBRyxJQUFJLEdBQUUsSUFBRSxDQUFDLElBQUUsRUFBRSxDQUFDLElBQUUsRUFBRSxDQUFDO0FBQUUsZUFBSSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUksT0FBSUMsR0FBRUMsS0FBRSxDQUFDLE1BQUksRUFBRSxFQUFFRCxHQUFFQyxLQUFFLENBQUMsQ0FBQyxHQUFHLElBQUU7QUFBRyxjQUFHLElBQUUsTUFBSUYsTUFBRyxJQUFFLElBQUUsR0FBRSxNQUFJLE1BQUlBLE1BQUcsSUFBRSxHQUFFLEtBQUcsS0FBSSxJQUFFLEdBQUUsS0FBRyxLQUFJLFFBQU0sSUFBRSxHQUFFLElBQUUsR0FBRSxLQUFJLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxJQUFFLElBQUUsR0FBRSxJQUFFLElBQUcsS0FBRyxJQUFFLE1BQUksSUFBRSxNQUFJLEdBQUUsTUFBSUEsTUFBRyxNQUFJLEtBQUcsTUFBSUEsTUFBRyxNQUFJLEVBQUUsUUFBTztBQUFFLHFCQUFPO0FBQUMsaUJBQUksSUFBRSxJQUFFLEdBQUUsSUFBRSxFQUFFLENBQUMsSUFBRSxLQUFHLElBQUUsR0FBRSxFQUFFLENBQUMsS0FBRyxFQUFFLENBQUMsSUFBRSxLQUFHLElBQUUsRUFBRSxJQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUUsRUFBRSxJQUFFLEVBQUUsQ0FBQyxDQUFDLE1BQUksSUFBRSxJQUFHLElBQUcsSUFBRSxLQUFHLElBQUUsR0FBRSxJQUFFLElBQUUsS0FBRyxHQUFFLEVBQUUsS0FBRyxLQUFHLE1BQUksS0FBRyxFQUFFLElBQUUsS0FBRyxLQUFHLEtBQUcsS0FBRyxJQUFFLEdBQUUsTUFBSSxJQUFHO0FBQUMsaUJBQUksSUFBRSxLQUFHLElBQUUsR0FBRSxJQUFFLElBQUcsT0FBSTtBQUFFLGdCQUFHLE1BQUksS0FBRyxLQUFHLElBQUUsR0FBRSxLQUFHLEtBQUcsSUFBRSxHQUFFLEtBQUksS0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFFO0FBQUMsa0JBQUcsTUFBSSxFQUFFO0FBQU0sa0JBQUVDLEdBQUVDLEtBQUUsRUFBRSxDQUFDLENBQUM7QUFBQSxZQUFDO0FBQUMsZ0JBQUcsSUFBRSxNQUFJLElBQUUsT0FBSyxHQUFFO0FBQUMsbUJBQUksTUFBSSxNQUFJLElBQUUsSUFBRyxLQUFHLEdBQUUsSUFBRSxNQUFJLElBQUUsSUFBRSxJQUFHLElBQUUsSUFBRSxLQUFHLEdBQUcsS0FBRyxFQUFFLElBQUUsQ0FBQyxNQUFJLEtBQUksTUFBSSxNQUFJO0FBQUUsa0JBQUcsS0FBRyxLQUFHLEdBQUUsTUFBSUYsTUFBRyxNQUFJLEtBQUcsTUFBSUEsTUFBRyxNQUFJLEVBQUUsUUFBTztBQUFFLGdCQUFFLElBQUUsSUFBRSxDQUFDLElBQUUsS0FBRyxLQUFHLEtBQUcsS0FBRyxJQUFFLElBQUU7QUFBQSxZQUFDO0FBQUEsVUFBQztBQUFDLGlCQUFPLE1BQUksTUFBSSxFQUFFLElBQUUsQ0FBQyxJQUFFLElBQUUsS0FBRyxLQUFHLE1BQUksS0FBRyxJQUFHLEVBQUUsT0FBSyxHQUFFO0FBQUEsUUFBQztBQUFBLE1BQUMsR0FBRSxFQUFDLG1CQUFrQixHQUFFLENBQUMsR0FBRSxJQUFHLENBQUMsU0FBUyxHQUFFLEdBQUUsR0FBRTtBQUFDO0FBQWEsVUFBRSxVQUFRLEVBQUMsR0FBRSxtQkFBa0IsR0FBRSxjQUFhLEdBQUUsSUFBRyxNQUFLLGNBQWEsTUFBSyxnQkFBZSxNQUFLLGNBQWEsTUFBSyx1QkFBc0IsTUFBSyxnQkFBZSxNQUFLLHVCQUFzQjtBQUFBLE1BQUMsR0FBRSxDQUFDLENBQUMsR0FBRSxJQUFHLENBQUMsU0FBUyxHQUFFLEdBQUUsR0FBRTtBQUFDO0FBQWEsWUFBSSxJQUFFLEVBQUUsaUJBQWlCLEdBQUUsSUFBRSxHQUFFLElBQUU7QUFBRSxpQkFBUyxFQUFFQSxJQUFFO0FBQUMsbUJBQVFDLEtBQUVELEdBQUUsUUFBTyxLQUFHLEVBQUVDLEtBQUcsQ0FBQUQsR0FBRUMsRUFBQyxJQUFFO0FBQUEsUUFBQztBQUFDLFlBQUksSUFBRSxHQUFFLElBQUUsSUFBRyxJQUFFLEtBQUksSUFBRSxJQUFFLElBQUUsR0FBRSxJQUFFLElBQUcsSUFBRSxJQUFHLElBQUUsSUFBRSxJQUFFLEdBQUUsSUFBRSxJQUFHLElBQUUsSUFBRyxJQUFFLEdBQUUsSUFBRSxLQUFJLElBQUUsSUFBRyxJQUFFLElBQUcsSUFBRSxJQUFHLElBQUUsQ0FBQyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUMsR0FBRSxJQUFFLENBQUMsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxJQUFHLElBQUcsSUFBRyxJQUFHLElBQUcsSUFBRyxJQUFHLEVBQUUsR0FBRSxJQUFFLENBQUMsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQyxHQUFFLElBQUUsQ0FBQyxJQUFHLElBQUcsSUFBRyxHQUFF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QU1FLEVBQUMsSUFBRSxLQUFHSSxHQUFFLElBQUVKLEtBQUUsQ0FBQyxJQUFFO0FBQUUsaUJBQUtGLEdBQUUsV0FBUyxJQUFHLENBQUFNLEdBQUUsS0FBR0QsS0FBRUwsR0FBRSxLQUFLLEVBQUVBLEdBQUUsUUFBUSxJQUFFVSxLQUFFLElBQUUsRUFBRUEsS0FBRSxFQUFFLElBQUUsR0FBRVYsR0FBRSxNQUFNSyxFQUFDLElBQUUsR0FBRUwsR0FBRSxXQUFVUSxPQUFJUixHQUFFLGNBQVlPLEdBQUUsSUFBRUYsS0FBRSxDQUFDO0FBQUcsZUFBSUosR0FBRSxXQUFTUyxJQUFFUixLQUFFRixHQUFFLFlBQVUsR0FBRSxLQUFHRSxJQUFFQSxLQUFJLEdBQUVGLElBQUVNLElBQUVKLEVBQUM7QUFBRSxlQUFJRyxLQUFFSSxJQUFFUCxLQUFFRixHQUFFLEtBQUssQ0FBQyxHQUFFQSxHQUFFLEtBQUssQ0FBQyxJQUFFQSxHQUFFLEtBQUtBLEdBQUUsVUFBVSxHQUFFLEVBQUVBLElBQUVNLElBQUUsQ0FBQyxHQUFFRixLQUFFSixHQUFFLEtBQUssQ0FBQyxHQUFFQSxHQUFFLEtBQUssRUFBRUEsR0FBRSxRQUFRLElBQUVFLElBQUVGLEdBQUUsS0FBSyxFQUFFQSxHQUFFLFFBQVEsSUFBRUksSUFBRUUsR0FBRSxJQUFFRCxFQUFDLElBQUVDLEdBQUUsSUFBRUosRUFBQyxJQUFFSSxHQUFFLElBQUVGLEVBQUMsR0FBRUosR0FBRSxNQUFNSyxFQUFDLEtBQUdMLEdBQUUsTUFBTUUsRUFBQyxLQUFHRixHQUFFLE1BQU1JLEVBQUMsSUFBRUosR0FBRSxNQUFNRSxFQUFDLElBQUVGLEdBQUUsTUFBTUksRUFBQyxLQUFHLEdBQUVFLEdBQUUsSUFBRUosS0FBRSxDQUFDLElBQUVJLEdBQUUsSUFBRUYsS0FBRSxDQUFDLElBQUVDLElBQUVMLEdBQUUsS0FBSyxDQUFDLElBQUVLLE1BQUksRUFBRUwsSUFBRU0sSUFBRSxDQUFDLEdBQUUsS0FBR04sR0FBRSxXQUFVO0FBQUMsVUFBQUEsR0FBRSxLQUFLLEVBQUVBLEdBQUUs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QUUsV0FBVUMsTUFBSUQsR0FBRSxVQUFVLEtBQUcsRUFBRUUsRUFBQyxJQUFFLElBQUUsRUFBRSxLQUFJRixHQUFFLFVBQVUsSUFBRSxFQUFFQyxFQUFDLENBQUMsTUFBS0QsR0FBRSxhQUFXQSxHQUFFLGNBQVk7QUFBQSxRQUFDLEdBQUUsRUFBRSxZQUFVLFNBQVNBLElBQUU7QUFBQyxZQUFFQSxJQUFFLEdBQUUsQ0FBQyxHQUFFLEVBQUVBLElBQUUsR0FBRSxDQUFDLElBQUUsU0FBU0EsSUFBRTtBQUFDLG1CQUFLQSxHQUFFLFlBQVUsRUFBRUEsSUFBRUEsR0FBRSxNQUFNLEdBQUVBLEdBQUUsU0FBTyxHQUFFQSxHQUFFLFdBQVMsS0FBRyxLQUFHQSxHQUFFLGFBQVdBLEdBQUUsWUFBWUEsR0FBRSxTQUFTLElBQUUsTUFBSUEsR0FBRSxRQUFPQSxHQUFFLFdBQVMsR0FBRUEsR0FBRSxZQUFVO0FBQUEsVUFBRSxHQUFFQSxFQUFDO0FBQUEsUUFBQztBQUFBLE1BQUMsR0FBRSxFQUFDLG1CQUFrQixHQUFFLENBQUMsR0FBRSxJQUFHLENBQUMsU0FBUyxHQUFFLEdBQUUsR0FBRTtBQUFDO0FBQWEsVUFBRSxVQUFRLFdBQVU7QUFBQyxlQUFLLFFBQU0sTUFBSyxLQUFLLFVBQVEsR0FBRSxLQUFLLFdBQVMsR0FBRSxLQUFLLFdBQVMsR0FBRSxLQUFLLFNBQU8sTUFBSyxLQUFLLFdBQVMsR0FBRSxLQUFLLFlBQVUsR0FBRSxLQUFLLFlBQVUsR0FBRSxLQUFLLE1BQUksSUFBRyxLQUFLLFFBQU0sTUFBSyxLQUFLLFlBQVUsR0FBRSxLQUFLLFFBQU07QUFBQSxRQUFDO0FBQUEsTUFBQyxHQUFFLENBQUMsQ0FBQyxHQUFFLElBQUcsQ0FBQyxTQUFTLEdBQUUsR0FBRSxHQUFFO0FBQUMsU0FBQyxTQUFTQSxJQUFFO0FBQUMsWUFBQyxTQUFTRSxJQUFFLEdBQUU7QUFBQztBQUFhLGdCQUFHLENBQUNBLEdBQUUsY0FBYTtBQUFDLGtCQUFJLEdBQUUsR0FBRUQsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLENBQUMs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M0osU0FBZTtBQUNiLFVBQU0sRUFBRSxVQUFVLElBQUk7QUFDdEIsVUFBTSxRQUFRLEtBQUssTUFBTSxTQUFTLENBQUM7QUFBRyxVQUFNLE9BQU8sS0FBSyxNQUFNLFNBQVMsR0FBRyxFQUFFO0FBQzVFLGNBQVUsU0FBUyxNQUFNLEVBQUUsTUFBTSxXQUFXLEtBQUssTUFBTSxTQUFTLE1BQU0sbUJBQW1CLEtBQUssTUFBTSxTQUFTLFdBQVcsSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDO0FBQ3hJLGNBQVUsU0FBUyxLQUFLLEVBQUUsTUFBTSxHQUFHLE1BQU0sY0FBYyxXQUFNLEtBQUssY0FBYyxHQUFHLENBQUM7QUFDcEYsVUFBTSxPQUFPLFVBQVUsU0FBUyxJQUFJO0FBQ3BDLGVBQVcsV0FBVyxLQUFLLE1BQU0sU0FBVSxNQUFLLFNBQVMsTUFBTSxFQUFFLE1BQU0sR0FBRyxRQUFRLGNBQWMsV0FBTSxRQUFRLGFBQWEsT0FBTyxHQUFHLENBQUM7QUFDdEksVUFBTSxTQUFTLFVBQVUsU0FBUyxHQUFHO0FBQ3JDLFFBQUkseUJBQVEsU0FBUyxFQUNsQixVQUFVLENBQUMsV0FBVyxPQUFPLGNBQWMsUUFBUSxFQUFFLFFBQVEsTUFBTSxLQUFLLE1BQU0sQ0FBQyxDQUFDLEVBQ2hGLFVBQVUsQ0FBQyxXQUFXLE9BQU8sT0FBTyxFQUFFLGNBQWMsWUFBWSxFQUFFLFFBQVEsWUFBWTtBQUNyRixhQUFPLFlBQVksSUFBSTtBQUFHLGFBQU8sUUFBUSx1QkFBa0I7QUFDM0QsVUFBSTtBQUFFLGNBQU0sS0FBSyxRQUFRLENBQUMsU0FBUyxPQUFPLFFBQVEsSUFBSSxDQUFDO0FBQUcsYUFBSyxNQUFNO0FBQUEsTUFBRyxTQUNqRSxPQUFPO0FBQ1osZ0JBQVEsTUFBTSxzQ0FBc0MsS0FBSztBQUN6RCxlQUFPLFFBQVEsa0JBQWtCLFFBQVEsS0FBSyxDQUFDLEVBQUU7QUFDakQsZUFBTyxZQUFZLEtBQUs7QUFBQSxNQUMxQjtBQUFBLElBQ0YsQ0FBQyxDQUFDO0FBQUEsRUFDTjtBQUFBLEVBQ0EsVUFBZ0I7QUFBRSxTQUFLLFVBQVUsTUFBTTtBQUFBLEVBQUc7QUFDNUM7QUFDQSxTQUFTLFFBQVEsT0FBd0I7QUFBRSxTQUFPLGlCQUFpQixRQUFRLE1BQU0sVUFBVTtBQUFpQjsiLAogICJuYW1lcyI6IFsibW9kdWxlIiwgImUiLCAidCIsICJyIiwgImMiLCAibiIsICJpIiwgInMiLCAiYSIsICJvIiwgImgiLCAidSIsICJsIiwgImYiLCAiZCIsICJwIiwgIm0iLCAiaW1wb3J0X29ic2lkaWFuIiwgIkpTWmlwIl0KfQo=
