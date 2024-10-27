/*
脚本引用https://raw.githubusercontent.com/Keywos/rule/main/script/wy/js/wyres.js
*/
(() => {
  var Y =
    typeof globalThis < "u"
      ? globalThis
      : typeof window < "u"
      ? window
      : typeof global < "u"
      ? global
      : typeof self < "u"
      ? self
      : {};
  function Be(l) {
    return l &&
      l.__esModule &&
      Object.prototype.hasOwnProperty.call(l, "default")
      ? l.default
      : l;
  }
  function Oe(l) {
    if (l.__esModule) return l;
    var M = l.default;
    if (typeof M == "function") {
      var R = function C() {
        return this instanceof C
          ? Reflect.construct(M, arguments, this.constructor)
          : M.apply(this, arguments);
      };
      R.prototype = M.prototype;
    } else R = {};
    return (
      Object.defineProperty(R, "__esModule", { value: !0 }),
      Object.keys(l).forEach(function (C) {
        var p = Object.getOwnPropertyDescriptor(l, C);
        Object.defineProperty(
          R,
          C,
          p.get
            ? p
            : {
                enumerable: !0,
                get: function () {
                  return l[C];
                },
              }
        );
      }),
      R
    );
  }
  var Se = { exports: {} },
    W = { exports: {} },
    we = Oe(
      Object.freeze(
        Object.defineProperty(
          { __proto__: null, default: {} },
          Symbol.toStringTag,
          { value: "Module" }
        )
      )
    ),
    X;
  function N() {
    return (
      X ||
        ((X = 1),
        (W.exports =
          ((l =
            l ||
            (function (M, R) {
              var C;
              if (
                (typeof window < "u" && window.crypto && (C = window.crypto),
                typeof self < "u" && self.crypto && (C = self.crypto),
                typeof globalThis < "u" &&
                  globalThis.crypto &&
                  (C = globalThis.crypto),
                !C &&
                  typeof window < "u" &&
                  window.msCrypto &&
                  (C = window.msCrypto),
                !C && Y !== void 0 && Y.crypto && (C = Y.crypto),
                !C)
              )
                try {
                  C = we;
                } catch {}
              var p = function () {
                  if (C) {
                    if (typeof C.getRandomValues == "function")
                      try {
                        return C.getRandomValues(new Uint32Array(1))[0];
                      } catch {}
                    if (typeof C.randomBytes == "function")
                      try {
                        return C.randomBytes(4).readInt32LE();
                      } catch {}
                  }
                  throw new Error(
                    "Native crypto module could not be used to get secure random number."
                  );
                },
                x =
                  Object.create ||
                  (function () {
                    function e() {}
                    return function (i) {
                      var s;
                      return (
                        (e.prototype = i),
                        (s = new e()),
                        (e.prototype = null),
                        s
                      );
                    };
                  })(),
                O = {},
                o = (O.lib = {}),
                A = (o.Base = (function () {
                  return {
                    extend: function (e) {
                      var i = x(this);
                      return (
                        e && i.mixIn(e),
                        (i.hasOwnProperty("init") && this.init !== i.init) ||
                          (i.init = function () {
                            i.$super.init.apply(this, arguments);
                          }),
                        (i.init.prototype = i),
                        (i.$super = this),
                        i
                      );
                    },
                    create: function () {
                      var e = this.extend();
                      return e.init.apply(e, arguments), e;
                    },
                    init: function () {},
                    mixIn: function (e) {
                      for (var i in e) e.hasOwnProperty(i) && (this[i] = e[i]);
                      e.hasOwnProperty("toString") &&
                        (this.toString = e.toString);
                    },
                    clone: function () {
                      return this.init.prototype.extend(this);
                    },
                  };
                })()),
                g = (o.WordArray = A.extend({
                  init: function (e, i) {
                    (e = this.words = e || []),
                      (this.sigBytes = i != R ? i : 4 * e.length);
                  },
                  toString: function (e) {
                    return (e || m).stringify(this);
                  },
                  concat: function (e) {
                    var i = this.words,
                      s = e.words,
                      E = this.sigBytes,
                      t = e.sigBytes;
                    if ((this.clamp(), E % 4))
                      for (var n = 0; n < t; n++) {
                        var v = (s[n >>> 2] >>> (24 - (n % 4) * 8)) & 255;
                        i[(E + n) >>> 2] |= v << (24 - ((E + n) % 4) * 8);
                      }
                    else
                      for (var a = 0; a < t; a += 4)
                        i[(E + a) >>> 2] = s[a >>> 2];
                    return (this.sigBytes += t), this;
                  },
                  clamp: function () {
                    var e = this.words,
                      i = this.sigBytes;
                    (e[i >>> 2] &= 4294967295 << (32 - (i % 4) * 8)),
                      (e.length = M.ceil(i / 4));
                  },
                  clone: function () {
                    var e = A.clone.call(this);
                    return (e.words = this.words.slice(0)), e;
                  },
                  random: function (e) {
                    for (var i = [], s = 0; s < e; s += 4) i.push(p());
                    return new g.init(i, e);
                  },
                })),
                r = (O.enc = {}),
                m = (r.Hex = {
                  stringify: function (e) {
                    for (
                      var i = e.words, s = e.sigBytes, E = [], t = 0;
                      t < s;
                      t++
                    ) {
                      var n = (i[t >>> 2] >>> (24 - (t % 4) * 8)) & 255;
                      E.push((n >>> 4).toString(16)),
                        E.push((15 & n).toString(16));
                    }
                    return E.join("");
                  },
                  parse: function (e) {
                    for (var i = e.length, s = [], E = 0; E < i; E += 2)
                      s[E >>> 3] |=
                        parseInt(e.substr(E, 2), 16) << (24 - (E % 8) * 4);
                    return new g.init(s, i / 2);
                  },
                }),
                c = (r.Latin1 = {
                  stringify: function (e) {
                    for (
                      var i = e.words, s = e.sigBytes, E = [], t = 0;
                      t < s;
                      t++
                    ) {
                      var n = (i[t >>> 2] >>> (24 - (t % 4) * 8)) & 255;
                      E.push(String.fromCharCode(n));
                    }
                    return E.join("");
                  },
                  parse: function (e) {
                    for (var i = e.length, s = [], E = 0; E < i; E++)
                      s[E >>> 2] |=
                        (255 & e.charCodeAt(E)) << (24 - (E % 4) * 8);
                    return new g.init(s, i);
                  },
                }),
                k = (r.Utf8 = {
                  stringify: function (e) {
                    try {
                      return decodeURIComponent(escape(c.stringify(e)));
                    } catch {
                      throw new Error("Malformed UTF-8 data");
                    }
                  },
                  parse: function (e) {
                    return c.parse(unescape(encodeURIComponent(e)));
                  },
                }),
                b = (o.BufferedBlockAlgorithm = A.extend({
                  reset: function () {
                    (this._data = new g.init()), (this._nDataBytes = 0);
                  },
                  _append: function (e) {
                    typeof e == "string" && (e = k.parse(e)),
                      this._data.concat(e),
                      (this._nDataBytes += e.sigBytes);
                  },
                  _process: function (e) {
                    var i,
                      s = this._data,
                      E = s.words,
                      t = s.sigBytes,
                      n = this.blockSize,
                      v = t / (4 * n),
                      a =
                        (v = e
                          ? M.ceil(v)
                          : M.max((0 | v) - this._minBufferSize, 0)) * n,
                      _ = M.min(4 * a, t);
                    if (a) {
                      for (var B = 0; B < a; B += n) this._doProcessBlock(E, B);
                      (i = E.splice(0, a)), (s.sigBytes -= _);
                    }
                    return new g.init(i, _);
                  },
                  clone: function () {
                    var e = A.clone.call(this);
                    return (e._data = this._data.clone()), e;
                  },
                  _minBufferSize: 0,
                }));
              o.Hasher = b.extend({
                cfg: A.extend(),
                init: function (e) {
                  (this.cfg = this.cfg.extend(e)), this.reset();
                },
                reset: function () {
                  b.reset.call(this), this._doReset();
                },
                update: function (e) {
                  return this._append(e), this._process(), this;
                },
                finalize: function (e) {
                  return e && this._append(e), this._doFinalize();
                },
                blockSize: 16,
                _createHelper: function (e) {
                  return function (i, s) {
                    return new e.init(s).finalize(i);
                  };
                },
                _createHmacHelper: function (e) {
                  return function (i, s) {
                    return new S.HMAC.init(e, s).finalize(i);
                  };
                },
              });
              var S = (O.algo = {});
              return O;
            })(Math)),
          l))),
      W.exports
    );
    var l;
  }
  var q,
    Q = { exports: {} };
  function De() {
    return (
      q ||
        ((q = 1),
        (Q.exports =
          ((l = N()),
          (function () {
            if (typeof ArrayBuffer == "function") {
              var M = l.lib.WordArray,
                R = M.init,
                C = (M.init = function (p) {
                  if (
                    (p instanceof ArrayBuffer && (p = new Uint8Array(p)),
                    (p instanceof Int8Array ||
                      (typeof Uint8ClampedArray < "u" &&
                        p instanceof Uint8ClampedArray) ||
                      p instanceof Int16Array ||
                      p instanceof Uint16Array ||
                      p instanceof Int32Array ||
                      p instanceof Uint32Array ||
                      p instanceof Float32Array ||
                      p instanceof Float64Array) &&
                      (p = new Uint8Array(
                        p.buffer,
                        p.byteOffset,
                        p.byteLength
                      )),
                    p instanceof Uint8Array)
                  ) {
                    for (var x = p.byteLength, O = [], o = 0; o < x; o++)
                      O[o >>> 2] |= p[o] << (24 - (o % 4) * 8);
                    R.call(this, O, x);
                  } else R.apply(this, arguments);
                });
              C.prototype = M;
            }
          })(),
          l.lib.WordArray))),
      Q.exports
    );
    var l;
  }
  var Z,
    Pe = { exports: {} },
    ee = { exports: {} },
    te = { exports: {} },
    re = { exports: {} };
  function Le() {
    return (
      Z ||
        ((Z = 1),
        (re.exports =
          ((o = N()),
          (M = (l = o).lib),
          (R = M.WordArray),
          (C = M.Hasher),
          (p = l.algo),
          (x = []),
          (O = p.SHA1 =
            C.extend({
              _doReset: function () {
                this._hash = new R.init([
                  1732584193, 4023233417, 2562383102, 271733878, 3285377520,
                ]);
              },
              _doProcessBlock: function (A, g) {
                for (
                  var r = this._hash.words,
                    m = r[0],
                    c = r[1],
                    k = r[2],
                    b = r[3],
                    S = r[4],
                    e = 0;
                  e < 80;
                  e++
                ) {
                  if (e < 16) x[e] = 0 | A[g + e];
                  else {
                    var i = x[e - 3] ^ x[e - 8] ^ x[e - 14] ^ x[e - 16];
                    x[e] = (i << 1) | (i >>> 31);
                  }
                  var s = ((m << 5) | (m >>> 27)) + S + x[e];
                  (s +=
                    e < 20
                      ? 1518500249 + ((c & k) | (~c & b))
                      : e < 40
                      ? 1859775393 + (c ^ k ^ b)
                      : e < 60
                      ? ((c & k) | (c & b) | (k & b)) - 1894007588
                      : (c ^ k ^ b) - 899497514),
                    (S = b),
                    (b = k),
                    (k = (c << 30) | (c >>> 2)),
                    (c = m),
                    (m = s);
                }
                (r[0] = (r[0] + m) | 0),
                  (r[1] = (r[1] + c) | 0),
                  (r[2] = (r[2] + k) | 0),
                  (r[3] = (r[3] + b) | 0),
                  (r[4] = (r[4] + S) | 0);
              },
              _doFinalize: function () {
                var A = this._data,
                  g = A.words,
                  r = 8 * this._nDataBytes,
                  m = 8 * A.sigBytes;
                return (
                  (g[m >>> 5] |= 128 << (24 - (m % 32))),
                  (g[14 + (((m + 64) >>> 9) << 4)] = Math.floor(
                    r / 4294967296
                  )),
                  (g[15 + (((m + 64) >>> 9) << 4)] = r),
                  (A.sigBytes = 4 * g.length),
                  this._process(),
                  this._hash
                );
              },
              clone: function () {
                var A = C.clone.call(this);
                return (A._hash = this._hash.clone()), A;
              },
            })),
          (l.SHA1 = C._createHelper(O)),
          (l.HmacSHA1 = C._createHmacHelper(O)),
          o.SHA1))),
      re.exports
    );
    var l, M, R, C, p, x, O, o;
  }
  var ne,
    ie,
    oe,
    ae,
    se = { exports: {} };
  function ye() {
    return (
      ie ||
        ((ie = 1),
        (te.exports = (function (p) {
          return (
            (function () {
              var x = p,
                O = x.lib,
                o = O.Base,
                A = O.WordArray,
                g = x.algo,
                r = g.MD5,
                m = (g.EvpKDF = o.extend({
                  cfg: o.extend({ keySize: 4, hasher: r, iterations: 1 }),
                  init: function (c) {
                    this.cfg = this.cfg.extend(c);
                  },
                  compute: function (c, k) {
                    for (
                      var b,
                        S = this.cfg,
                        e = S.hasher.create(),
                        i = A.create(),
                        s = i.words,
                        E = S.keySize,
                        t = S.iterations;
                      s.length < E;

                    ) {
                      b && e.update(b),
                        (b = e.update(c).finalize(k)),
                        e.reset();
                      for (var n = 1; n < t; n++)
                        (b = e.finalize(b)), e.reset();
                      i.concat(b);
                    }
                    return (i.sigBytes = 4 * E), i;
                  },
                }));
              x.EvpKDF = function (c, k, b) {
                return m.create(b).compute(c, k);
              };
            })(),
            p.EvpKDF
          );
        })(
          N(),
          Le(),
          (ne ||
            ((ne = 1),
            (se.exports =
              ((l = N()),
              (R = (M = l).lib.Base),
              (C = M.enc.Utf8),
              void (M.algo.HMAC = R.extend({
                init: function (p, x) {
                  (p = this._hasher = new p.init()),
                    typeof x == "string" && (x = C.parse(x));
                  var O = p.blockSize,
                    o = 4 * O;
                  x.sigBytes > o && (x = p.finalize(x)), x.clamp();
                  for (
                    var A = (this._oKey = x.clone()),
                      g = (this._iKey = x.clone()),
                      r = A.words,
                      m = g.words,
                      c = 0;
                    c < O;
                    c++
                  )
                    (r[c] ^= 1549556828), (m[c] ^= 909522486);
                  (A.sigBytes = g.sigBytes = o), this.reset();
                },
                reset: function () {
                  var p = this._hasher;
                  p.reset(), p.update(this._iKey);
                },
                update: function (p) {
                  return this._hasher.update(p), this;
                },
                finalize: function (p) {
                  var x = this._hasher,
                    O = x.finalize(p);
                  return x.reset(), x.finalize(this._oKey.clone().concat(O));
                },
              }))))),
          se.exports)
        ))),
      te.exports
    );
    var l, M, R, C;
  }
  function ce() {
    return (
      oe ||
        ((oe = 1),
        (ee.exports =
          ((l = N()),
          ye(),
          void (
            l.lib.Cipher ||
            (function (M) {
              var R = l,
                C = R.lib,
                p = C.Base,
                x = C.WordArray,
                O = C.BufferedBlockAlgorithm,
                o = R.enc;
              o.Utf8;
              var A = o.Base64,
                g = R.algo.EvpKDF,
                r = (C.Cipher = O.extend({
                  cfg: p.extend(),
                  createEncryptor: function (t, n) {
                    return this.create(this._ENC_XFORM_MODE, t, n);
                  },
                  createDecryptor: function (t, n) {
                    return this.create(this._DEC_XFORM_MODE, t, n);
                  },
                  init: function (t, n, v) {
                    (this.cfg = this.cfg.extend(v)),
                      (this._xformMode = t),
                      (this._key = n),
                      this.reset();
                  },
                  reset: function () {
                    O.reset.call(this), this._doReset();
                  },
                  process: function (t) {
                    return this._append(t), this._process();
                  },
                  finalize: function (t) {
                    return t && this._append(t), this._doFinalize();
                  },
                  keySize: 4,
                  ivSize: 4,
                  _ENC_XFORM_MODE: 1,
                  _DEC_XFORM_MODE: 2,
                  _createHelper: (function () {
                    function t(n) {
                      return typeof n == "string" ? E : i;
                    }
                    return function (n) {
                      return {
                        encrypt: function (v, a, _) {
                          return t(a).encrypt(n, v, a, _);
                        },
                        decrypt: function (v, a, _) {
                          return t(a).decrypt(n, v, a, _);
                        },
                      };
                    };
                  })(),
                }));
              C.StreamCipher = r.extend({
                _doFinalize: function () {
                  return this._process(!0);
                },
                blockSize: 1,
              });
              var m = (R.mode = {}),
                c = (C.BlockCipherMode = p.extend({
                  createEncryptor: function (t, n) {
                    return this.Encryptor.create(t, n);
                  },
                  createDecryptor: function (t, n) {
                    return this.Decryptor.create(t, n);
                  },
                  init: function (t, n) {
                    (this._cipher = t), (this._iv = n);
                  },
                })),
                k = (m.CBC = (function () {
                  var t = c.extend();
                  function n(v, a, _) {
                    var B,
                      w = this._iv;
                    w ? ((B = w), (this._iv = M)) : (B = this._prevBlock);
                    for (var D = 0; D < _; D++) v[a + D] ^= B[D];
                  }
                  return (
                    (t.Encryptor = t.extend({
                      processBlock: function (v, a) {
                        var _ = this._cipher,
                          B = _.blockSize;
                        n.call(this, v, a, B),
                          _.encryptBlock(v, a),
                          (this._prevBlock = v.slice(a, a + B));
                      },
                    })),
                    (t.Decryptor = t.extend({
                      processBlock: function (v, a) {
                        var _ = this._cipher,
                          B = _.blockSize,
                          w = v.slice(a, a + B);
                        _.decryptBlock(v, a),
                          n.call(this, v, a, B),
                          (this._prevBlock = w);
                      },
                    })),
                    t
                  );
                })()),
                b = ((R.pad = {}).Pkcs7 = {
                  pad: function (t, n) {
                    for (
                      var v = 4 * n,
                        a = v - (t.sigBytes % v),
                        _ = (a << 24) | (a << 16) | (a << 8) | a,
                        B = [],
                        w = 0;
                      w < a;
                      w += 4
                    )
                      B.push(_);
                    var D = x.create(B, a);
                    t.concat(D);
                  },
                  unpad: function (t) {
                    var n = 255 & t.words[(t.sigBytes - 1) >>> 2];
                    t.sigBytes -= n;
                  },
                });
              C.BlockCipher = r.extend({
                cfg: r.cfg.extend({ mode: k, padding: b }),
                reset: function () {
                  var t;
                  r.reset.call(this);
                  var n = this.cfg,
                    v = n.iv,
                    a = n.mode;
                  this._xformMode == this._ENC_XFORM_MODE
                    ? (t = a.createEncryptor)
                    : ((t = a.createDecryptor), (this._minBufferSize = 1)),
                    this._mode && this._mode.__creator == t
                      ? this._mode.init(this, v && v.words)
                      : ((this._mode = t.call(a, this, v && v.words)),
                        (this._mode.__creator = t));
                },
                _doProcessBlock: function (t, n) {
                  this._mode.processBlock(t, n);
                },
                _doFinalize: function () {
                  var t,
                    n = this.cfg.padding;
                  return (
                    this._xformMode == this._ENC_XFORM_MODE
                      ? (n.pad(this._data, this.blockSize),
                        (t = this._process(!0)))
                      : ((t = this._process(!0)), n.unpad(t)),
                    t
                  );
                },
                blockSize: 4,
              });
              var S = (C.CipherParams = p.extend({
                  init: function (t) {
                    this.mixIn(t);
                  },
                  toString: function (t) {
                    return (t || this.formatter).stringify(this);
                  },
                })),
                e = ((R.format = {}).OpenSSL = {
                  stringify: function (t) {
                    var n = t.ciphertext,
                      v = t.salt;
                    return (
                      v
                        ? x.create([1398893684, 1701076831]).concat(v).concat(n)
                        : n
                    ).toString(A);
                  },
                  parse: function (t) {
                    var n,
                      v = A.parse(t),
                      a = v.words;
                    return (
                      a[0] == 1398893684 &&
                        a[1] == 1701076831 &&
                        ((n = x.create(a.slice(2, 4))),
                        a.splice(0, 4),
                        (v.sigBytes -= 16)),
                      S.create({ ciphertext: v, salt: n })
                    );
                  },
                }),
                i = (C.SerializableCipher = p.extend({
                  cfg: p.extend({ format: e }),
                  encrypt: function (t, n, v, a) {
                    a = this.cfg.extend(a);
                    var _ = t.createEncryptor(v, a),
                      B = _.finalize(n),
                      w = _.cfg;
                    return S.create({
                      ciphertext: B,
                      key: v,
                      iv: w.iv,
                      algorithm: t,
                      mode: w.mode,
                      padding: w.padding,
                      blockSize: t.blockSize,
                      formatter: a.format,
                    });
                  },
                  decrypt: function (t, n, v, a) {
                    return (
                      (a = this.cfg.extend(a)),
                      (n = this._parse(n, a.format)),
                      t.createDecryptor(v, a).finalize(n.ciphertext)
                    );
                  },
                  _parse: function (t, n) {
                    return typeof t == "string" ? n.parse(t, this) : t;
                  },
                })),
                s = ((R.kdf = {}).OpenSSL = {
                  execute: function (t, n, v, a, _) {
                    if ((a || (a = x.random(8)), _))
                      B = g.create({ keySize: n + v, hasher: _ }).compute(t, a);
                    else var B = g.create({ keySize: n + v }).compute(t, a);
                    var w = x.create(B.words.slice(n), 4 * v);
                    return (
                      (B.sigBytes = 4 * n), S.create({ key: B, iv: w, salt: a })
                    );
                  },
                }),
                E = (C.PasswordBasedCipher = i.extend({
                  cfg: i.cfg.extend({ kdf: s }),
                  encrypt: function (t, n, v, a) {
                    var _ = (a = this.cfg.extend(a)).kdf.execute(
                      v,
                      t.keySize,
                      t.ivSize,
                      a.salt,
                      a.hasher
                    );
                    a.iv = _.iv;
                    var B = i.encrypt.call(this, t, n, _.key, a);
                    return B.mixIn(_), B;
                  },
                  decrypt: function (t, n, v, a) {
                    (a = this.cfg.extend(a)), (n = this._parse(n, a.format));
                    var _ = a.kdf.execute(
                      v,
                      t.keySize,
                      t.ivSize,
                      n.salt,
                      a.hasher
                    );
                    return (a.iv = _.iv), i.decrypt.call(this, t, n, _.key, a);
                  },
                }));
            })()
          )))),
      ee.exports
    );
    var l;
  }
  var le,
    fe = { exports: {} },
    de = { exports: {} };
  function Ne() {
    return (
      le ||
        ((le = 1),
        (de.exports =
          ((l = N()),
          (function () {
            var M = l,
              R = M.lib.WordArray;
            function C(p, x, O) {
              for (var o = [], A = 0, g = 0; g < x; g++)
                if (g % 4) {
                  var r =
                    (O[p.charCodeAt(g - 1)] << ((g % 4) * 2)) |
                    (O[p.charCodeAt(g)] >>> (6 - (g % 4) * 2));
                  (o[A >>> 2] |= r << (24 - (A % 4) * 8)), A++;
                }
              return R.create(o, A);
            }
            M.enc.Base64 = {
              stringify: function (p) {
                var x = p.words,
                  O = p.sigBytes,
                  o = this._map;
                p.clamp();
                for (var A = [], g = 0; g < O; g += 3)
                  for (
                    var r =
                        (((x[g >>> 2] >>> (24 - (g % 4) * 8)) & 255) << 16) |
                        (((x[(g + 1) >>> 2] >>> (24 - ((g + 1) % 4) * 8)) &
                          255) <<
                          8) |
                        ((x[(g + 2) >>> 2] >>> (24 - ((g + 2) % 4) * 8)) & 255),
                      m = 0;
                    m < 4 && g + 0.75 * m < O;
                    m++
                  )
                    A.push(o.charAt((r >>> (6 * (3 - m))) & 63));
                var c = o.charAt(64);
                if (c) for (; A.length % 4; ) A.push(c);
                return A.join("");
              },
              parse: function (p) {
                var x = p.length,
                  O = this._map,
                  o = this._reverseMap;
                if (!o) {
                  o = this._reverseMap = [];
                  for (var A = 0; A < O.length; A++) o[O.charCodeAt(A)] = A;
                }
                var g = O.charAt(64);
                if (g) {
                  var r = p.indexOf(g);
                  r !== -1 && (x = r);
                }
                return C(p, x, o);
              },
              _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
            };
          })(),
          l.enc.Base64))),
      de.exports
    );
    var l;
  }
  var ue,
    pe,
    $,
    K,
    he = { exports: {} };
  function ze() {
    return (
      ue ||
        ((ue = 1),
        (he.exports =
          ((l = N()),
          (function (M) {
            var R = l,
              C = R.lib,
              p = C.WordArray,
              x = C.Hasher,
              O = R.algo,
              o = [];
            (function () {
              for (var k = 0; k < 64; k++)
                o[k] = (4294967296 * M.abs(M.sin(k + 1))) | 0;
            })();
            var A = (O.MD5 = x.extend({
              _doReset: function () {
                this._hash = new p.init([
                  1732584193, 4023233417, 2562383102, 271733878,
                ]);
              },
              _doProcessBlock: function (k, b) {
                for (var S = 0; S < 16; S++) {
                  var e = b + S,
                    i = k[e];
                  k[e] =
                    (16711935 & ((i << 8) | (i >>> 24))) |
                    (4278255360 & ((i << 24) | (i >>> 8)));
                }
                var s = this._hash.words,
                  E = k[b + 0],
                  t = k[b + 1],
                  n = k[b + 2],
                  v = k[b + 3],
                  a = k[b + 4],
                  _ = k[b + 5],
                  B = k[b + 6],
                  w = k[b + 7],
                  D = k[b + 8],
                  P = k[b + 9],
                  L = k[b + 10],
                  U = k[b + 11],
                  T = k[b + 12],
                  I = k[b + 13],
                  G = k[b + 14],
                  H = k[b + 15],
                  f = s[0],
                  y = s[1],
                  d = s[2],
                  u = s[3];
                (f = g(f, y, d, u, E, 7, o[0])),
                  (u = g(u, f, y, d, t, 12, o[1])),
                  (d = g(d, u, f, y, n, 17, o[2])),
                  (y = g(y, d, u, f, v, 22, o[3])),
                  (f = g(f, y, d, u, a, 7, o[4])),
                  (u = g(u, f, y, d, _, 12, o[5])),
                  (d = g(d, u, f, y, B, 17, o[6])),
                  (y = g(y, d, u, f, w, 22, o[7])),
                  (f = g(f, y, d, u, D, 7, o[8])),
                  (u = g(u, f, y, d, P, 12, o[9])),
                  (d = g(d, u, f, y, L, 17, o[10])),
                  (y = g(y, d, u, f, U, 22, o[11])),
                  (f = g(f, y, d, u, T, 7, o[12])),
                  (u = g(u, f, y, d, I, 12, o[13])),
                  (d = g(d, u, f, y, G, 17, o[14])),
                  (f = r(
                    f,
                    (y = g(y, d, u, f, H, 22, o[15])),
                    d,
                    u,
                    t,
                    5,
                    o[16]
                  )),
                  (u = r(u, f, y, d, B, 9, o[17])),
                  (d = r(d, u, f, y, U, 14, o[18])),
                  (y = r(y, d, u, f, E, 20, o[19])),
                  (f = r(f, y, d, u, _, 5, o[20])),
                  (u = r(u, f, y, d, L, 9, o[21])),
                  (d = r(d, u, f, y, H, 14, o[22])),
                  (y = r(y, d, u, f, a, 20, o[23])),
                  (f = r(f, y, d, u, P, 5, o[24])),
                  (u = r(u, f, y, d, G, 9, o[25])),
                  (d = r(d, u, f, y, v, 14, o[26])),
                  (y = r(y, d, u, f, D, 20, o[27])),
                  (f = r(f, y, d, u, I, 5, o[28])),
                  (u = r(u, f, y, d, n, 9, o[29])),
                  (d = r(d, u, f, y, w, 14, o[30])),
                  (f = m(
                    f,
                    (y = r(y, d, u, f, T, 20, o[31])),
                    d,
                    u,
                    _,
                    4,
                    o[32]
                  )),
                  (u = m(u, f, y, d, D, 11, o[33])),
                  (d = m(d, u, f, y, U, 16, o[34])),
                  (y = m(y, d, u, f, G, 23, o[35])),
                  (f = m(f, y, d, u, t, 4, o[36])),
                  (u = m(u, f, y, d, a, 11, o[37])),
                  (d = m(d, u, f, y, w, 16, o[38])),
                  (y = m(y, d, u, f, L, 23, o[39])),
                  (f = m(f, y, d, u, I, 4, o[40])),
                  (u = m(u, f, y, d, E, 11, o[41])),
                  (d = m(d, u, f, y, v, 16, o[42])),
                  (y = m(y, d, u, f, B, 23, o[43])),
                  (f = m(f, y, d, u, P, 4, o[44])),
                  (u = m(u, f, y, d, T, 11, o[45])),
                  (d = m(d, u, f, y, H, 16, o[46])),
                  (f = c(
                    f,
                    (y = m(y, d, u, f, n, 23, o[47])),
                    d,
                    u,
                    E,
                    6,
                    o[48]
                  )),
                  (u = c(u, f, y, d, w, 10, o[49])),
                  (d = c(d, u, f, y, G, 15, o[50])),
                  (y = c(y, d, u, f, _, 21, o[51])),
                  (f = c(f, y, d, u, T, 6, o[52])),
                  (u = c(u, f, y, d, v, 10, o[53])),
                  (d = c(d, u, f, y, L, 15, o[54])),
                  (y = c(y, d, u, f, t, 21, o[55])),
                  (f = c(f, y, d, u, D, 6, o[56])),
                  (u = c(u, f, y, d, H, 10, o[57])),
                  (d = c(d, u, f, y, B, 15, o[58])),
                  (y = c(y, d, u, f, I, 21, o[59])),
                  (f = c(f, y, d, u, a, 6, o[60])),
                  (u = c(u, f, y, d, U, 10, o[61])),
                  (d = c(d, u, f, y, n, 15, o[62])),
                  (y = c(y, d, u, f, P, 21, o[63])),
                  (s[0] = (s[0] + f) | 0),
                  (s[1] = (s[1] + y) | 0),
                  (s[2] = (s[2] + d) | 0),
                  (s[3] = (s[3] + u) | 0);
              },
              _doFinalize: function () {
                var k = this._data,
                  b = k.words,
                  S = 8 * this._nDataBytes,
                  e = 8 * k.sigBytes;
                b[e >>> 5] |= 128 << (24 - (e % 32));
                var i = M.floor(S / 4294967296),
                  s = S;
                (b[15 + (((e + 64) >>> 9) << 4)] =
                  (16711935 & ((i << 8) | (i >>> 24))) |
                  (4278255360 & ((i << 24) | (i >>> 8)))),
                  (b[14 + (((e + 64) >>> 9) << 4)] =
                    (16711935 & ((s << 8) | (s >>> 24))) |
                    (4278255360 & ((s << 24) | (s >>> 8)))),
                  (k.sigBytes = 4 * (b.length + 1)),
                  this._process();
                for (var E = this._hash, t = E.words, n = 0; n < 4; n++) {
                  var v = t[n];
                  t[n] =
                    (16711935 & ((v << 8) | (v >>> 24))) |
                    (4278255360 & ((v << 24) | (v >>> 8)));
                }
                return E;
              },
              clone: function () {
                var k = x.clone.call(this);
                return (k._hash = this._hash.clone()), k;
              },
            }));
            function g(k, b, S, e, i, s, E) {
              var t = k + ((b & S) | (~b & e)) + i + E;
              return ((t << s) | (t >>> (32 - s))) + b;
            }
            function r(k, b, S, e, i, s, E) {
              var t = k + ((b & e) | (S & ~e)) + i + E;
              return ((t << s) | (t >>> (32 - s))) + b;
            }
            function m(k, b, S, e, i, s, E) {
              var t = k + (b ^ S ^ e) + i + E;
              return ((t << s) | (t >>> (32 - s))) + b;
            }
            function c(k, b, S, e, i, s, E) {
              var t = k + (S ^ (b | ~e)) + i + E;
              return ((t << s) | (t >>> (32 - s))) + b;
            }
            (R.MD5 = x._createHelper(A)), (R.HmacMD5 = x._createHmacHelper(A));
          })(Math),
          l.MD5))),
      he.exports
    );
    var l;
  }
  var z = Be(
    (Se.exports = (function (l) {
      return l;
    })(
      N(),
      De(),
      ae ||
        ((ae = 1),
        (Pe.exports =
          ((K = N()),
          ce(),
          (K.mode.ECB =
            ((($ = K.lib.BlockCipherMode.extend()).Encryptor = $.extend({
              processBlock: function (l, M) {
                this._cipher.encryptBlock(l, M);
              },
            })),
            ($.Decryptor = $.extend({
              processBlock: function (l, M) {
                this._cipher.decryptBlock(l, M);
              },
            })),
            $)),
          K.mode.ECB))),
      (function () {
        return pe
          ? fe.exports
          : ((pe = 1),
            (fe.exports =
              ((l = N()),
              Ne(),
              ze(),
              ye(),
              ce(),
              (function () {
                var M = l,
                  R = M.lib.BlockCipher,
                  C = M.algo,
                  p = [],
                  x = [],
                  O = [],
                  o = [],
                  A = [],
                  g = [],
                  r = [],
                  m = [],
                  c = [],
                  k = [];
                (function () {
                  for (var e = [], i = 0; i < 256; i++)
                    e[i] = i < 128 ? i << 1 : (i << 1) ^ 283;
                  var s = 0,
                    E = 0;
                  for (i = 0; i < 256; i++) {
                    var t = E ^ (E << 1) ^ (E << 2) ^ (E << 3) ^ (E << 4);
                    (t = (t >>> 8) ^ (255 & t) ^ 99), (p[s] = t), (x[t] = s);
                    var n = e[s],
                      v = e[n],
                      a = e[v],
                      _ = (257 * e[t]) ^ (16843008 * t);
                    (O[s] = (_ << 24) | (_ >>> 8)),
                      (o[s] = (_ << 16) | (_ >>> 16)),
                      (A[s] = (_ << 8) | (_ >>> 24)),
                      (g[s] = _),
                      (_ =
                        (16843009 * a) ^
                        (65537 * v) ^
                        (257 * n) ^
                        (16843008 * s)),
                      (r[t] = (_ << 24) | (_ >>> 8)),
                      (m[t] = (_ << 16) | (_ >>> 16)),
                      (c[t] = (_ << 8) | (_ >>> 24)),
                      (k[t] = _),
                      s
                        ? ((s = n ^ e[e[e[a ^ n]]]), (E ^= e[e[E]]))
                        : (s = E = 1);
                  }
                })();
                var b = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54],
                  S = (C.AES = R.extend({
                    _doReset: function () {
                      if (!this._nRounds || this._keyPriorReset !== this._key) {
                        for (
                          var e = (this._keyPriorReset = this._key),
                            i = e.words,
                            s = e.sigBytes / 4,
                            E = 4 * ((this._nRounds = s + 6) + 1),
                            t = (this._keySchedule = []),
                            n = 0;
                          n < E;
                          n++
                        )
                          n < s
                            ? (t[n] = i[n])
                            : ((_ = t[n - 1]),
                              n % s
                                ? s > 6 &&
                                  n % s == 4 &&
                                  (_ =
                                    (p[_ >>> 24] << 24) |
                                    (p[(_ >>> 16) & 255] << 16) |
                                    (p[(_ >>> 8) & 255] << 8) |
                                    p[255 & _])
                                : ((_ =
                                    (p[(_ = (_ << 8) | (_ >>> 24)) >>> 24] <<
                                      24) |
                                    (p[(_ >>> 16) & 255] << 16) |
                                    (p[(_ >>> 8) & 255] << 8) |
                                    p[255 & _]),
                                  (_ ^= b[(n / s) | 0] << 24)),
                              (t[n] = t[n - s] ^ _));
                        for (
                          var v = (this._invKeySchedule = []), a = 0;
                          a < E;
                          a++
                        ) {
                          if (((n = E - a), a % 4)) var _ = t[n];
                          else _ = t[n - 4];
                          v[a] =
                            a < 4 || n <= 4
                              ? _
                              : r[p[_ >>> 24]] ^
                                m[p[(_ >>> 16) & 255]] ^
                                c[p[(_ >>> 8) & 255]] ^
                                k[p[255 & _]];
                        }
                      }
                    },
                    encryptBlock: function (e, i) {
                      this._doCryptBlock(
                        e,
                        i,
                        this._keySchedule,
                        O,
                        o,
                        A,
                        g,
                        p
                      );
                    },
                    decryptBlock: function (e, i) {
                      var s = e[i + 1];
                      (e[i + 1] = e[i + 3]),
                        (e[i + 3] = s),
                        this._doCryptBlock(
                          e,
                          i,
                          this._invKeySchedule,
                          r,
                          m,
                          c,
                          k,
                          x
                        ),
                        (s = e[i + 1]),
                        (e[i + 1] = e[i + 3]),
                        (e[i + 3] = s);
                    },
                    _doCryptBlock: function (e, i, s, E, t, n, v, a) {
                      for (
                        var _ = this._nRounds,
                          B = e[i] ^ s[0],
                          w = e[i + 1] ^ s[1],
                          D = e[i + 2] ^ s[2],
                          P = e[i + 3] ^ s[3],
                          L = 4,
                          U = 1;
                        U < _;
                        U++
                      ) {
                        var T =
                            E[B >>> 24] ^
                            t[(w >>> 16) & 255] ^
                            n[(D >>> 8) & 255] ^
                            v[255 & P] ^
                            s[L++],
                          I =
                            E[w >>> 24] ^
                            t[(D >>> 16) & 255] ^
                            n[(P >>> 8) & 255] ^
                            v[255 & B] ^
                            s[L++],
                          G =
                            E[D >>> 24] ^
                            t[(P >>> 16) & 255] ^
                            n[(B >>> 8) & 255] ^
                            v[255 & w] ^
                            s[L++],
                          H =
                            E[P >>> 24] ^
                            t[(B >>> 16) & 255] ^
                            n[(w >>> 8) & 255] ^
                            v[255 & D] ^
                            s[L++];
                        (B = T), (w = I), (D = G), (P = H);
                      }
                      (T =
                        ((a[B >>> 24] << 24) |
                          (a[(w >>> 16) & 255] << 16) |
                          (a[(D >>> 8) & 255] << 8) |
                          a[255 & P]) ^
                        s[L++]),
                        (I =
                          ((a[w >>> 24] << 24) |
                            (a[(D >>> 16) & 255] << 16) |
                            (a[(P >>> 8) & 255] << 8) |
                            a[255 & B]) ^
                          s[L++]),
                        (G =
                          ((a[D >>> 24] << 24) |
                            (a[(P >>> 16) & 255] << 16) |
                            (a[(B >>> 8) & 255] << 8) |
                            a[255 & w]) ^
                          s[L++]),
                        (H =
                          ((a[P >>> 24] << 24) |
                            (a[(B >>> 16) & 255] << 16) |
                            (a[(w >>> 8) & 255] << 8) |
                            a[255 & D]) ^
                          s[L++]),
                        (e[i] = T),
                        (e[i + 1] = I),
                        (e[i + 2] = G),
                        (e[i + 3] = H);
                    },
                    keySize: 8,
                  }));
                M.AES = R._createHelper(S);
              })(),
              l.AES)));
        var l;
      })()
    ))
  );
  var Ce = {
    words: [1698181731, 1801809512, 946104675, 1751477816],
    sigBytes: 16,
  };
  function _e(l) {
    try {
      return (
        (l = z.AES.decrypt({ ciphertext: z.lib.WordArray.create(l) }, Ce, {
          mode: z.mode.ECB,
          padding: z.pad.Pkcs7,
        })),
        JSON.parse(z.enc.Utf8.stringify(l))
      );
    } catch (M) {
      return console.log(M.message), null;
    }
  }
  function Te(l) {
    l = z.AES.encrypt(JSON.stringify(l), Ce, {
      mode: z.mode.ECB,
      padding: z.pad.Pkcs7,
    }).ciphertext;
    let M = new Uint8Array(l.sigBytes);
    for (let R = 0; R < l.sigBytes; R++)
      M[R] = (l.words[R >>> 2] >>> (24 - (R % 4) * 8)) & 255;
    return M;
  }
  var Me = typeof $task < "u",
    J = $request.url,
    h = $response.body,
    me = $response.headers,
    ve = me["content-type"] || me["Content-Type"] || "";
  !ve.includes("application/json") &&
    !h &&
    (console.log("contentType\u4E0D\u5339\u914D" + ve), $done({}));
  var ge = {},
    Ee = J.match(/(?:^https?:\/\/[^\/]+)\/(?:e?api)(\/[a-z0-9-/]+)(\?.*)?/),
    ke = Ee ? Ee[1] : $done({});
  Me ? (h = _e($response.bodyBytes)) : (h = _e(h));
  var Re = () =>
      typeof $environment < "u" && $environment["surge-version"]
        ? "Surge"
        : typeof $loon < "u"
        ? "Loon"
        : void 0,
    V = 2e12,
    j = [
      "PAGE_RECOMMEND_DAILY_RECOMMEND",
      "PAGE_RECOMMEND_SPECIAL_CLOUD_VILLAGE_PLAYLIST",
      "PAGE_RECOMMEND_SHORTCUT",
      "HOMEPAGE_MUSIC_PARTNER",
      "PAGE_RECOMMEND_RADAR",
      "PAGE_RECOMMEND_RANK",
    ];
  function be() {
    if (Ae())
      try {
        let M = {
          PRGG: "PAGE_RECOMMEND_GREETING",
          PRDRD: "PAGE_RECOMMEND_DAILY_RECOMMEND",
          PRSCVPT: "PAGE_RECOMMEND_SPECIAL_CLOUD_VILLAGE_PLAYLIST",
          PRST: "PAGE_RECOMMEND_SHORTCUT",
          HMPR: "HOMEPAGE_MUSIC_PARTNER",
          PRRR: "PAGE_RECOMMEND_RADAR",
          PRRK: "PAGE_RECOMMEND_RANK",
          PRMST: "PAGE_RECOMMEND_MY_SHEET",
          PRCN: "PAGE_RECOMMEND_COMBINATION",
        };
        (F = JSON.parse($argument)),
          (j = Object.keys(F)
            .filter((R) => F[R])
            .map((R) => M[R]));
      } catch {}
  }
  var F;
  function xe(l) {
    l?.musicPackage &&
      (l.musicPackage &&
        ((l.musicPackage.expireTime = V), (l.musicPackage.vipLevel = 7)),
      l.associator &&
        ((l.associator.expireTime = V), (l.associator.vipLevel = 7)),
      l.voiceBookVip &&
        ((l.voiceBookVip.expireTime = V), (l.voiceBookVip.vipLevel = 7)),
      (l.redplus = {
        vipCode: 300,
        expireTime: V,
        iconUrl: null,
        dynamicIconUrl: null,
        vipLevel: 7,
        isSignDeduct: !1,
        isSignIap: !1,
        isSignIapDeduct: !1,
        isSign: !1,
      }),
      l.redVipLevel && (l.redVipLevel = 7));
  }
  try {
    if (h === null) throw new Error("\u89E3\u5BC6\u5931\u8D25: " + ke);
    switch (ke) {
      case "/batch":
        let M = (r, m = {}) => {
          h[r]?.data && (h[r].data = m);
        };
        M("/api/comment/tips/v2/get", { count: 0, offset: 0, records: [] }),
          M("/api/social/event/bff/ad/resources"),
          M("/api/ad/get", { code: 200, ads: {} });
        let R = "/api/music-vip-membership/client/vip/info",
          C = "/api/v2/resource/comments",
          p = "/api/comment/feed/inserted/resources",
          x = "/api/event/rcmd/topic/list",
          O = "/api/platform/song/bff/grading/song/order/entrance";
        h[R]?.data && xe(h[R].data),
          h[C]?.data?.comments &&
            h[C].data.comments.forEach((r) => {
              r.user?.followed === !1 && (r.user.followed = !0),
                (r.user.vipRights = null),
                (r.user.avatarDetail = null),
                (r.userBizLevels = null),
                (r.pendantData = null),
                (r.tag.extDatas = []),
                (r.tag.contentPicDatas = null);
            }),
          h[p]?.data &&
            ((h[p].data = {}), h[p].trp?.rules && (h[p].trp.rules = [])),
          h[x]?.data?.topicList && (h[x].data.topicList = []),
          h[O]?.data?.songOrderEntrance && (h[O].data.songOrderEntrance = {});
        break;
      case "/v2/resource/comment/floor/get":
        h.data?.ownerComment &&
          ((h.data.ownerComment.user.vipRights = null),
          (h.data.ownerComment.user.avatarDetail = {}),
          (h.data.ownerComment.pendantData = null)),
          h.data?.comments &&
            h.data.comments.forEach((r) => {
              r.user?.followed === !1 && (r.user.followed = !0),
                (r.user.vipRights = null),
                (r.user.avatarDetail = null),
                (r.userBizLevels = null),
                (r.pendantData = null),
                (r.tag.extDatas = []),
                (r.tag.contentPicDatas = null);
            });
        break;
      case "/music-vip-membership/client/vip/info":
        xe(h.data);
        break;
      case "api/ad/get":
        h = { code: 200, ads: {} };
        break;
      case "/link/position/show/resource":
        h.data?.crossPlatformResource?.positionCode &&
          h.data.crossPlatformResource.positionCode === "MyPageBar" &&
          (h.data.crossPlatformResource = {});
        break;
      case "/user/follow/users/mixed/get/v2":
        h.data?.records &&
          h.data.records.forEach((r) => {
            r.mutualFollowDay === null &&
              (r.showContent = {
                message: "\u{1F4A2}\u4ED6/\u5979,\u672A\u5173\u6CE8\u4F60",
                time: 1e12,
                active: !0,
                boxContent: {},
              });
          });
        break;
      case "/vipnewcenter/app/resource/newaccountpage":
        h.data &&
          ((h.data.mainTitle.vipCurrLevel = 7),
          (h.data.mainTitle.imgUrl = ""),
          (h.data.mainTitle.jumpUrl = ""),
          (h.data.mainTitle.reachMaxLevel = !0),
          (h.data.subTitle.carousels = []),
          (h.data.buttonTitle = {}));
        break;
      case "/link/home/framework/tab":
        let o = [],
          A = !1;
        if (Ae())
          try {
            F = JSON.parse($argument);
            let r = {
              MY: "\u6F2B\u6E38",
              DT: "\u52A8\u6001",
              TJ: "\u63A8\u8350",
              FX: "\u53D1\u73B0",
            };
            o = Object.keys(F)
              .filter((m) => !F[m])
              .map((m) => r[m]);
          } catch {
            A = !0;
          }
        else A = !0;
        A && (o = ["\u6F2B\u6E38"]),
          h.data?.commonResourceList &&
            ((h.data.commonResourceList = h.data.commonResourceList.filter(
              (r) => !o.includes(r.title)
            )),
            h.data.commonResourceList.forEach((r) => {
              r.title === "\u53D1\u73B0" &&
                (r.subCommonResourceList = r.subCommonResourceList.filter(
                  (m) => !["\u76F4\u64AD"].includes(m.title)
                ));
            }));
        break;
      case "/song/play/more/list/v2":
        if (h.data?.bottomItem?.itemNodeList) {
          let r = h.data.bottomItem.itemNodeList[0],
            m = r.find((k) => k.type === "effect"),
            c = r.indexOf(m);
          c !== -1 && (r.splice(c, 1), r.unshift(m));
        }
        break;
      case "homepage/block/page":
        if (h.data?.blocks) {
          for (let r = 0; r < h.data.blocks.length; r++)
            if (h.data.blocks[r].showType === "BANNER") {
              h.data.blocks[r].extInfo.banners = h.data.blocks[
                r
              ].extInfo.banners.filter(
                (m) => !["\u6D3B\u52A8", "\u5E7F\u544A"].includes(m.typeTitle)
              );
              break;
            }
        }
        break;
      case "/link/page/discovery/resource/show":
        if (h.data?.blockCodeOrderList)
          try {
            h.data.blockCodeOrderList = JSON.stringify(
              JSON.parse(h.data.blockCodeOrderList).filter(
                (r) => !["PAGE_DISCOVERY_BANNER"].includes(r)
              )
            );
          } catch {
            console.log("101123");
          }
        h.data?.blocks &&
          (h.data.blocks = h.data.blocks.filter(
            (r) => !["PAGE_DISCOVERY_BANNER"].includes(r.bizCode)
          ));
        break;
      case "/link/page/rcmd/resource/show":
        if (
          (be(),
          h.data?.blocks &&
            ((h.data.blocks = h.data.blocks.filter((r) =>
              j.includes(r.bizCode)
            )),
            h.data.blocks.length > 0))
        ) {
          for (let r = 0; r < h.data.blocks.length; r++)
            if (h.data.blocks[r].bizCode === "PAGE_RECOMMEND_GREETING") {
              Object.keys(h.data.blocks[r].dslData).forEach((m) => {
                h.data.blocks[r].dslData[m].commonResourceList &&
                  (h.data.blocks[r].dslData[m].commonResourceList =
                    h.data.blocks[r].dslData[m].commonResourceList.forEach(
                      (c) => {
                        (c.summary || c.extraMap || c.title) &&
                          (c.summary && (c.summary = ""),
                          c.extraMap && (c.extraMap = {}),
                          c.trp_id && (c.trp_id = ""),
                          c.log && (c.log = {}),
                          c.icon && (c.icon = ""),
                          c.actionUrl && (c.actionUrl = ""),
                          c.s_ctrp && (c.s_ctrp = ""),
                          c.resourceType && (c.resourceType = ""));
                      }
                    ));
              });
              break;
            }
        }
        if (h.data?.blockCodeOrderList)
          try {
            h.data.blockCodeOrderList = JSON.stringify(
              JSON.parse(h.data.blockCodeOrderList).filter((r) => j.includes(r))
            );
          } catch {}
        break;
      case "/link/page/rcmd/block/resource/multi/refresh":
        if (
          h.data &&
          (be(),
          (h.data = h.data.filter((r) => j.includes(r.blockCode))),
          h.data?.length > 0)
        ) {
          for (let r = 0; r < h.data.length; r++)
            if (h.data[r].blockCode === "PAGE_RECOMMEND_GREETING") {
              Object.keys(h.data[r].block.dslData).forEach((m) => {
                h.data[r].block.dslData[m].commonResourceList &&
                  (h.data[r].block.dslData[m].commonResourceList = h.data[
                    r
                  ].block.dslData[m].commonResourceList.forEach((c) => {
                    (c.summary || c.extraMap || c.title) &&
                      (c.summary && (c.summary = ""),
                      c.extraMap && (c.extraMap = {}),
                      c.trp_id && (c.trp_id = ""),
                      c.log && (c.log = {}),
                      c.icon && (c.icon = ""),
                      c.actionUrl && (c.actionUrl = ""),
                      c.s_ctrp && (c.s_ctrp = ""),
                      c.resourceType && (c.resourceType = ""));
                  }));
              });
              break;
            }
        }
        break;
      default:
        console.log("\u672A\u5339\u914D\u5230: " + J), $done({});
    }
    let l = Te(h);
    ge = Me
      ? { bodyBytes: l.buffer.slice(l.byteOffset, l.byteLength + l.byteOffset) }
      : { body: l };
  } catch (l) {
    console.log(J), console.log(l.message);
  } finally {
    $done(ge);
  }
  function Ae() {
    return typeof $argument < "u" && $argument !== "";
  }
})();
