

/*!
 * Webflow: Front-end site library
 * @license MIT
 * Inline scripts may access the api using an async handler:
 *   var Webflow = Webflow || [];
 *   Webflow.push(readyFunction);
 */

(() => {
    var u = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports);
    var Ns = u(() => {
      (function () {
        if (typeof window > "u") return;
        let e = window.navigator.userAgent.match(/Edge\/(\d{2})\./),
          t = e ? parseInt(e[1], 10) >= 16 : !1;
        if ("objectFit" in document.documentElement.style && !t) {
          window.objectFitPolyfill = function () {
            return !1;
          };
          return;
        }
        let n = function (s) {
            let c = window.getComputedStyle(s, null),
              p = c.getPropertyValue("position"),
              E = c.getPropertyValue("overflow"),
              f = c.getPropertyValue("display");
            (!p || p === "static") && (s.style.position = "relative"),
              E !== "hidden" && (s.style.overflow = "hidden"),
              (!f || f === "inline") && (s.style.display = "block"),
              s.clientHeight === 0 && (s.style.height = "100%"),
              s.className.indexOf("object-fit-polyfill") === -1 &&
                (s.className += " object-fit-polyfill");
          },
          o = function (s) {
            let c = window.getComputedStyle(s, null),
              p = {
                "max-width": "none",
                "max-height": "none",
                "min-width": "0px",
                "min-height": "0px",
                top: "auto",
                right: "auto",
                bottom: "auto",
                left: "auto",
                "margin-top": "0px",
                "margin-right": "0px",
                "margin-bottom": "0px",
                "margin-left": "0px",
              };
            for (let E in p)
              c.getPropertyValue(E) !== p[E] && (s.style[E] = p[E]);
          },
          i = function (s) {
            let c = s.parentNode;
            n(c),
              o(s),
              (s.style.position = "absolute"),
              (s.style.height = "100%"),
              (s.style.width = "auto"),
              s.clientWidth > c.clientWidth
                ? ((s.style.top = "0"),
                  (s.style.marginTop = "0"),
                  (s.style.left = "50%"),
                  (s.style.marginLeft = s.clientWidth / -2 + "px"))
                : ((s.style.width = "100%"),
                  (s.style.height = "auto"),
                  (s.style.left = "0"),
                  (s.style.marginLeft = "0"),
                  (s.style.top = "50%"),
                  (s.style.marginTop = s.clientHeight / -2 + "px"));
          },
          a = function (s) {
            if (typeof s > "u" || s instanceof Event)
              s = document.querySelectorAll("[data-object-fit]");
            else if (s && s.nodeName) s = [s];
            else if (typeof s == "object" && s.length && s[0].nodeName) s = s;
            else return !1;
            for (let c = 0; c < s.length; c++) {
              if (!s[c].nodeName) continue;
              let p = s[c].nodeName.toLowerCase();
              if (p === "img") {
                if (t) continue;
                s[c].complete
                  ? i(s[c])
                  : s[c].addEventListener("load", function () {
                      i(this);
                    });
              } else
                p === "video"
                  ? s[c].readyState > 0
                    ? i(s[c])
                    : s[c].addEventListener("loadedmetadata", function () {
                        i(this);
                      })
                  : i(s[c]);
            }
            return !0;
          };
        document.readyState === "loading"
          ? document.addEventListener("DOMContentLoaded", a)
          : a(),
          window.addEventListener("resize", a),
          (window.objectFitPolyfill = a);
      })();
    });
    var Ps = u(() => {
      (function () {
        if (typeof window > "u") return;
        function e(n) {
          Webflow.env("design") ||
            ($("video").each(function () {
              n && $(this).prop("autoplay") ? this.play() : this.pause();
            }),
            $(".w-background-video--control").each(function () {
              n ? r($(this)) : t($(this));
            }));
        }
        function t(n) {
          n.find("> span").each(function (o) {
            $(this).prop("hidden", () => o === 0);
          });
        }
        function r(n) {
          n.find("> span").each(function (o) {
            $(this).prop("hidden", () => o === 1);
          });
        }
        $(document).ready(() => {
          let n = window.matchMedia("(prefers-reduced-motion: reduce)");
          n.addEventListener("change", (o) => {
            e(!o.matches);
          }),
            n.matches && e(!1),
            $("video:not([autoplay])").each(function () {
              $(this)
                .parent()
                .find(".w-background-video--control")
                .each(function () {
                  t($(this));
                });
            }),
            $(document).on("click", ".w-background-video--control", function (o) {
              if (Webflow.env("design")) return;
              let i = $(o.currentTarget),
                a = $(`video#${i.attr("aria-controls")}`).get(0);
              if (a)
                if (a.paused) {
                  let s = a.play();
                  r(i),
                    s &&
                      typeof s.catch == "function" &&
                      s.catch(() => {
                        t(i);
                      });
                } else a.pause(), t(i);
            });
        });
      })();
    });
    var Bi = u(() => {
      window.tram = (function (e) {
        function t(l, T) {
          var S = new d.Bare();
          return S.init(l, T);
        }
        function r(l) {
          return l.replace(/[A-Z]/g, function (T) {
            return "-" + T.toLowerCase();
          });
        }
        function n(l) {
          var T = parseInt(l.slice(1), 16),
            S = (T >> 16) & 255,
            R = (T >> 8) & 255,
            w = 255 & T;
          return [S, R, w];
        }
        function o(l, T, S) {
          return (
            "#" + ((1 << 24) | (l << 16) | (T << 8) | S).toString(16).slice(1)
          );
        }
        function i() {}
        function a(l, T) {
          p("Type warning: Expected: [" + l + "] Got: [" + typeof T + "] " + T);
        }
        function s(l, T, S) {
          p("Units do not match [" + l + "]: " + T + ", " + S);
        }
        function c(l, T, S) {
          if ((T !== void 0 && (S = T), l === void 0)) return S;
          var R = S;
          return (
            Ce.test(l) || !Xe.test(l)
              ? (R = parseInt(l, 10))
              : Xe.test(l) && (R = 1e3 * parseFloat(l)),
            0 > R && (R = 0),
            R === R ? R : S
          );
        }
        function p(l) {
          ae.debug && window && window.console.warn(l);
        }
        function E(l) {
          for (var T = -1, S = l ? l.length : 0, R = []; ++T < S; ) {
            var w = l[T];
            w && R.push(w);
          }
          return R;
        }
        var f = (function (l, T, S) {
            function R(ue) {
              return typeof ue == "object";
            }
            function w(ue) {
              return typeof ue == "function";
            }
            function C() {}
            function re(ue, me) {
              function K() {
                var Ue = new de();
                return w(Ue.init) && Ue.init.apply(Ue, arguments), Ue;
              }
              function de() {}
              me === S && ((me = ue), (ue = Object)), (K.Bare = de);
              var pe,
                Se = (C[l] = ue[l]),
                ct = (de[l] = K[l] = new C());
              return (
                (ct.constructor = K),
                (K.mixin = function (Ue) {
                  return (de[l] = K[l] = re(K, Ue)[l]), K;
                }),
                (K.open = function (Ue) {
                  if (
                    ((pe = {}),
                    w(Ue) ? (pe = Ue.call(K, ct, Se, K, ue)) : R(Ue) && (pe = Ue),
                    R(pe))
                  )
                    for (var Ar in pe) T.call(pe, Ar) && (ct[Ar] = pe[Ar]);
                  return w(ct.init) || (ct.init = ue), K;
                }),
                K.open(me)
              );
            }
            return re;
          })("prototype", {}.hasOwnProperty),
          I = {
            ease: [
              "ease",
              function (l, T, S, R) {
                var w = (l /= R) * l,
                  C = w * l;
                return (
                  T +
                  S * (-2.75 * C * w + 11 * w * w + -15.5 * C + 8 * w + 0.25 * l)
                );
              },
            ],
            "ease-in": [
              "ease-in",
              function (l, T, S, R) {
                var w = (l /= R) * l,
                  C = w * l;
                return T + S * (-1 * C * w + 3 * w * w + -3 * C + 2 * w);
              },
            ],
            "ease-out": [
              "ease-out",
              function (l, T, S, R) {
                var w = (l /= R) * l,
                  C = w * l;
                return (
                  T +
                  S * (0.3 * C * w + -1.6 * w * w + 2.2 * C + -1.8 * w + 1.9 * l)
                );
              },
            ],
            "ease-in-out": [
              "ease-in-out",
              function (l, T, S, R) {
                var w = (l /= R) * l,
                  C = w * l;
                return T + S * (2 * C * w + -5 * w * w + 2 * C + 2 * w);
              },
            ],
            linear: [
              "linear",
              function (l, T, S, R) {
                return (S * l) / R + T;
              },
            ],
            "ease-in-quad": [
              "cubic-bezier(0.550, 0.085, 0.680, 0.530)",
              function (l, T, S, R) {
                return S * (l /= R) * l + T;
              },
            ],
            "ease-out-quad": [
              "cubic-bezier(0.250, 0.460, 0.450, 0.940)",
              function (l, T, S, R) {
                return -S * (l /= R) * (l - 2) + T;
              },
            ],
            "ease-in-out-quad": [
              "cubic-bezier(0.455, 0.030, 0.515, 0.955)",
              function (l, T, S, R) {
                return (l /= R / 2) < 1
                  ? (S / 2) * l * l + T
                  : (-S / 2) * (--l * (l - 2) - 1) + T;
              },
            ],
            "ease-in-cubic": [
              "cubic-bezier(0.550, 0.055, 0.675, 0.190)",
              function (l, T, S, R) {
                return S * (l /= R) * l * l + T;
              },
            ],
            "ease-out-cubic": [
              "cubic-bezier(0.215, 0.610, 0.355, 1)",
              function (l, T, S, R) {
                return S * ((l = l / R - 1) * l * l + 1) + T;
              },
            ],
            "ease-in-out-cubic": [
              "cubic-bezier(0.645, 0.045, 0.355, 1)",
              function (l, T, S, R) {
                return (l /= R / 2) < 1
                  ? (S / 2) * l * l * l + T
                  : (S / 2) * ((l -= 2) * l * l + 2) + T;
              },
            ],
            "ease-in-quart": [
              "cubic-bezier(0.895, 0.030, 0.685, 0.220)",
              function (l, T, S, R) {
                return S * (l /= R) * l * l * l + T;
              },
            ],
            "ease-out-quart": [
              "cubic-bezier(0.165, 0.840, 0.440, 1)",
              function (l, T, S, R) {
                return -S * ((l = l / R - 1) * l * l * l - 1) + T;
              },
            ],
            "ease-in-out-quart": [
              "cubic-bezier(0.770, 0, 0.175, 1)",
              function (l, T, S, R) {
                return (l /= R / 2) < 1
                  ? (S / 2) * l * l * l * l + T
                  : (-S / 2) * ((l -= 2) * l * l * l - 2) + T;
              },
            ],
            "ease-in-quint": [
              "cubic-bezier(0.755, 0.050, 0.855, 0.060)",
              function (l, T, S, R) {
                return S * (l /= R) * l * l * l * l + T;
              },
            ],
            "ease-out-quint": [
              "cubic-bezier(0.230, 1, 0.320, 1)",
              function (l, T, S, R) {
                return S * ((l = l / R - 1) * l * l * l * l + 1) + T;
              },
            ],
            "ease-in-out-quint": [
              "cubic-bezier(0.860, 0, 0.070, 1)",
              function (l, T, S, R) {
                return (l /= R / 2) < 1
                  ? (S / 2) * l * l * l * l * l + T
                  : (S / 2) * ((l -= 2) * l * l * l * l + 2) + T;
              },
            ],
            "ease-in-sine": [
              "cubic-bezier(0.470, 0, 0.745, 0.715)",
              function (l, T, S, R) {
                return -S * Math.cos((l / R) * (Math.PI / 2)) + S + T;
              },
            ],
            "ease-out-sine": [
              "cubic-bezier(0.390, 0.575, 0.565, 1)",
              function (l, T, S, R) {
                return S * Math.sin((l / R) * (Math.PI / 2)) + T;
              },
            ],
            "ease-in-out-sine": [
              "cubic-bezier(0.445, 0.050, 0.550, 0.950)",
              function (l, T, S, R) {
                return (-S / 2) * (Math.cos((Math.PI * l) / R) - 1) + T;
              },
            ],
            "ease-in-expo": [
              "cubic-bezier(0.950, 0.050, 0.795, 0.035)",
              function (l, T, S, R) {
                return l === 0 ? T : S * Math.pow(2, 10 * (l / R - 1)) + T;
              },
            ],
            "ease-out-expo": [
              "cubic-bezier(0.190, 1, 0.220, 1)",
              function (l, T, S, R) {
                return l === R
                  ? T + S
                  : S * (-Math.pow(2, (-10 * l) / R) + 1) + T;
              },
            ],
            "ease-in-out-expo": [
              "cubic-bezier(1, 0, 0, 1)",
              function (l, T, S, R) {
                return l === 0
                  ? T
                  : l === R
                  ? T + S
                  : (l /= R / 2) < 1
                  ? (S / 2) * Math.pow(2, 10 * (l - 1)) + T
                  : (S / 2) * (-Math.pow(2, -10 * --l) + 2) + T;
              },
            ],
            "ease-in-circ": [
              "cubic-bezier(0.600, 0.040, 0.980, 0.335)",
              function (l, T, S, R) {
                return -S * (Math.sqrt(1 - (l /= R) * l) - 1) + T;
              },
            ],
            "ease-out-circ": [
              "cubic-bezier(0.075, 0.820, 0.165, 1)",
              function (l, T, S, R) {
                return S * Math.sqrt(1 - (l = l / R - 1) * l) + T;
              },
            ],
            "ease-in-out-circ": [
              "cubic-bezier(0.785, 0.135, 0.150, 0.860)",
              function (l, T, S, R) {
                return (l /= R / 2) < 1
                  ? (-S / 2) * (Math.sqrt(1 - l * l) - 1) + T
                  : (S / 2) * (Math.sqrt(1 - (l -= 2) * l) + 1) + T;
              },
            ],
            "ease-in-back": [
              "cubic-bezier(0.600, -0.280, 0.735, 0.045)",
              function (l, T, S, R, w) {
                return (
                  w === void 0 && (w = 1.70158),
                  S * (l /= R) * l * ((w + 1) * l - w) + T
                );
              },
            ],
            "ease-out-back": [
              "cubic-bezier(0.175, 0.885, 0.320, 1.275)",
              function (l, T, S, R, w) {
                return (
                  w === void 0 && (w = 1.70158),
                  S * ((l = l / R - 1) * l * ((w + 1) * l + w) + 1) + T
                );
              },
            ],
            "ease-in-out-back": [
              "cubic-bezier(0.680, -0.550, 0.265, 1.550)",
              function (l, T, S, R, w) {
                return (
                  w === void 0 && (w = 1.70158),
                  (l /= R / 2) < 1
                    ? (S / 2) * l * l * (((w *= 1.525) + 1) * l - w) + T
                    : (S / 2) *
                        ((l -= 2) * l * (((w *= 1.525) + 1) * l + w) + 2) +
                      T
                );
              },
            ],
          },
          _ = {
            "ease-in-back": "cubic-bezier(0.600, 0, 0.735, 0.045)",
            "ease-out-back": "cubic-bezier(0.175, 0.885, 0.320, 1)",
            "ease-in-out-back": "cubic-bezier(0.680, 0, 0.265, 1)",
          },
          m = document,
          b = window,
          N = "bkwld-tram",
          x = /[\-\.0-9]/g,
          P = /[A-Z]/,
          A = "number",
          V = /^(rgb|#)/,
          G = /(em|cm|mm|in|pt|pc|px)$/,
          M = /(em|cm|mm|in|pt|pc|px|%)$/,
          H = /(deg|rad|turn)$/,
          Z = "unitless",
          J = /(all|none) 0s ease 0s/,
          se = /^(width|height)$/,
          ne = " ",
          U = m.createElement("a"),
          O = ["Webkit", "Moz", "O", "ms"],
          q = ["-webkit-", "-moz-", "-o-", "-ms-"],
          F = function (l) {
            if (l in U.style) return { dom: l, css: l };
            var T,
              S,
              R = "",
              w = l.split("-");
            for (T = 0; T < w.length; T++)
              R += w[T].charAt(0).toUpperCase() + w[T].slice(1);
            for (T = 0; T < O.length; T++)
              if (((S = O[T] + R), S in U.style))
                return { dom: S, css: q[T] + l };
          },
          X = (t.support = {
            bind: Function.prototype.bind,
            transform: F("transform"),
            transition: F("transition"),
            backface: F("backface-visibility"),
            timing: F("transition-timing-function"),
          });
        if (X.transition) {
          var ee = X.timing.dom;
          if (((U.style[ee] = I["ease-in-back"][0]), !U.style[ee]))
            for (var ie in _) I[ie][0] = _[ie];
        }
        var D = (t.frame = (function () {
            var l =
              b.requestAnimationFrame ||
              b.webkitRequestAnimationFrame ||
              b.mozRequestAnimationFrame ||
              b.oRequestAnimationFrame ||
              b.msRequestAnimationFrame;
            return l && X.bind
              ? l.bind(b)
              : function (T) {
                  b.setTimeout(T, 16);
                };
          })()),
          B = (t.now = (function () {
            var l = b.performance,
              T = l && (l.now || l.webkitNow || l.msNow || l.mozNow);
            return T && X.bind
              ? T.bind(l)
              : Date.now ||
                  function () {
                    return +new Date();
                  };
          })()),
          v = f(function (l) {
            function T(oe, he) {
              var be = E(("" + oe).split(ne)),
                Ee = be[0];
              he = he || {};
              var Ve = j[Ee];
              if (!Ve) return p("Unsupported property: " + Ee);
              if (!he.weak || !this.props[Ee]) {
                var Je = Ve[0],
                  He = this.props[Ee];
                return (
                  He || (He = this.props[Ee] = new Je.Bare()),
                  He.init(this.$el, be, Ve, he),
                  He
                );
              }
            }
            function S(oe, he, be) {
              if (oe) {
                var Ee = typeof oe;
                if (
                  (he ||
                    (this.timer && this.timer.destroy(),
                    (this.queue = []),
                    (this.active = !1)),
                  Ee == "number" && he)
                )
                  return (
                    (this.timer = new te({
                      duration: oe,
                      context: this,
                      complete: C,
                    })),
                    void (this.active = !0)
                  );
                if (Ee == "string" && he) {
                  switch (oe) {
                    case "hide":
                      K.call(this);
                      break;
                    case "stop":
                      re.call(this);
                      break;
                    case "redraw":
                      de.call(this);
                      break;
                    default:
                      T.call(this, oe, be && be[1]);
                  }
                  return C.call(this);
                }
                if (Ee == "function") return void oe.call(this, this);
                if (Ee == "object") {
                  var Ve = 0;
                  ct.call(
                    this,
                    oe,
                    function (Ae, Rm) {
                      Ae.span > Ve && (Ve = Ae.span), Ae.stop(), Ae.animate(Rm);
                    },
                    function (Ae) {
                      "wait" in Ae && (Ve = c(Ae.wait, 0));
                    }
                  ),
                    Se.call(this),
                    Ve > 0 &&
                      ((this.timer = new te({ duration: Ve, context: this })),
                      (this.active = !0),
                      he && (this.timer.complete = C));
                  var Je = this,
                    He = !1,
                    dn = {};
                  D(function () {
                    ct.call(Je, oe, function (Ae) {
                      Ae.active && ((He = !0), (dn[Ae.name] = Ae.nextStyle));
                    }),
                      He && Je.$el.css(dn);
                  });
                }
              }
            }
            function R(oe) {
              (oe = c(oe, 0)),
                this.active
                  ? this.queue.push({ options: oe })
                  : ((this.timer = new te({
                      duration: oe,
                      context: this,
                      complete: C,
                    })),
                    (this.active = !0));
            }
            function w(oe) {
              return this.active
                ? (this.queue.push({ options: oe, args: arguments }),
                  void (this.timer.complete = C))
                : p(
                    "No active transition timer. Use start() or wait() before then()."
                  );
            }
            function C() {
              if (
                (this.timer && this.timer.destroy(),
                (this.active = !1),
                this.queue.length)
              ) {
                var oe = this.queue.shift();
                S.call(this, oe.options, !0, oe.args);
              }
            }
            function re(oe) {
              this.timer && this.timer.destroy(),
                (this.queue = []),
                (this.active = !1);
              var he;
              typeof oe == "string"
                ? ((he = {}), (he[oe] = 1))
                : (he = typeof oe == "object" && oe != null ? oe : this.props),
                ct.call(this, he, Ue),
                Se.call(this);
            }
            function ue(oe) {
              re.call(this, oe), ct.call(this, oe, Ar, Sm);
            }
            function me(oe) {
              typeof oe != "string" && (oe = "block"),
                (this.el.style.display = oe);
            }
            function K() {
              re.call(this), (this.el.style.display = "none");
            }
            function de() {
              this.el.offsetHeight;
            }
            function pe() {
              re.call(this),
                e.removeData(this.el, N),
                (this.$el = this.el = null);
            }
            function Se() {
              var oe,
                he,
                be = [];
              this.upstream && be.push(this.upstream);
              for (oe in this.props)
                (he = this.props[oe]), he.active && be.push(he.string);
              (be = be.join(",")),
                this.style !== be &&
                  ((this.style = be), (this.el.style[X.transition.dom] = be));
            }
            function ct(oe, he, be) {
              var Ee,
                Ve,
                Je,
                He,
                dn = he !== Ue,
                Ae = {};
              for (Ee in oe)
                (Je = oe[Ee]),
                  Ee in ve
                    ? (Ae.transform || (Ae.transform = {}),
                      (Ae.transform[Ee] = Je))
                    : (P.test(Ee) && (Ee = r(Ee)),
                      Ee in j ? (Ae[Ee] = Je) : (He || (He = {}), (He[Ee] = Je)));
              for (Ee in Ae) {
                if (((Je = Ae[Ee]), (Ve = this.props[Ee]), !Ve)) {
                  if (!dn) continue;
                  Ve = T.call(this, Ee);
                }
                he.call(this, Ve, Je);
              }
              be && He && be.call(this, He);
            }
            function Ue(oe) {
              oe.stop();
            }
            function Ar(oe, he) {
              oe.set(he);
            }
            function Sm(oe) {
              this.$el.css(oe);
            }
            function Ze(oe, he) {
              l[oe] = function () {
                return this.children
                  ? Am.call(this, he, arguments)
                  : (this.el && he.apply(this, arguments), this);
              };
            }
            function Am(oe, he) {
              var be,
                Ee = this.children.length;
              for (be = 0; Ee > be; be++) oe.apply(this.children[be], he);
              return this;
            }
            (l.init = function (oe) {
              if (
                ((this.$el = e(oe)),
                (this.el = this.$el[0]),
                (this.props = {}),
                (this.queue = []),
                (this.style = ""),
                (this.active = !1),
                ae.keepInherited && !ae.fallback)
              ) {
                var he = W(this.el, "transition");
                he && !J.test(he) && (this.upstream = he);
              }
              X.backface &&
                ae.hideBackface &&
                y(this.el, X.backface.css, "hidden");
            }),
              Ze("add", T),
              Ze("start", S),
              Ze("wait", R),
              Ze("then", w),
              Ze("next", C),
              Ze("stop", re),
              Ze("set", ue),
              Ze("show", me),
              Ze("hide", K),
              Ze("redraw", de),
              Ze("destroy", pe);
          }),
          d = f(v, function (l) {
            function T(S, R) {
              var w = e.data(S, N) || e.data(S, N, new v.Bare());
              return w.el || w.init(S), R ? w.start(R) : w;
            }
            l.init = function (S, R) {
              var w = e(S);
              if (!w.length) return this;
              if (w.length === 1) return T(w[0], R);
              var C = [];
              return (
                w.each(function (re, ue) {
                  C.push(T(ue, R));
                }),
                (this.children = C),
                this
              );
            };
          }),
          h = f(function (l) {
            function T() {
              var C = this.get();
              this.update("auto");
              var re = this.get();
              return this.update(C), re;
            }
            function S(C, re, ue) {
              return re !== void 0 && (ue = re), C in I ? C : ue;
            }
            function R(C) {
              var re = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(C);
              return (re ? o(re[1], re[2], re[3]) : C).replace(
                /#(\w)(\w)(\w)$/,
                "#$1$1$2$2$3$3"
              );
            }
            var w = { duration: 500, ease: "ease", delay: 0 };
            (l.init = function (C, re, ue, me) {
              (this.$el = C), (this.el = C[0]);
              var K = re[0];
              ue[2] && (K = ue[2]),
                Q[K] && (K = Q[K]),
                (this.name = K),
                (this.type = ue[1]),
                (this.duration = c(re[1], this.duration, w.duration)),
                (this.ease = S(re[2], this.ease, w.ease)),
                (this.delay = c(re[3], this.delay, w.delay)),
                (this.span = this.duration + this.delay),
                (this.active = !1),
                (this.nextStyle = null),
                (this.auto = se.test(this.name)),
                (this.unit = me.unit || this.unit || ae.defaultUnit),
                (this.angle = me.angle || this.angle || ae.defaultAngle),
                ae.fallback || me.fallback
                  ? (this.animate = this.fallback)
                  : ((this.animate = this.transition),
                    (this.string =
                      this.name +
                      ne +
                      this.duration +
                      "ms" +
                      (this.ease != "ease" ? ne + I[this.ease][0] : "") +
                      (this.delay ? ne + this.delay + "ms" : "")));
            }),
              (l.set = function (C) {
                (C = this.convert(C, this.type)), this.update(C), this.redraw();
              }),
              (l.transition = function (C) {
                (this.active = !0),
                  (C = this.convert(C, this.type)),
                  this.auto &&
                    (this.el.style[this.name] == "auto" &&
                      (this.update(this.get()), this.redraw()),
                    C == "auto" && (C = T.call(this))),
                  (this.nextStyle = C);
              }),
              (l.fallback = function (C) {
                var re =
                  this.el.style[this.name] || this.convert(this.get(), this.type);
                (C = this.convert(C, this.type)),
                  this.auto &&
                    (re == "auto" && (re = this.convert(this.get(), this.type)),
                    C == "auto" && (C = T.call(this))),
                  (this.tween = new z({
                    from: re,
                    to: C,
                    duration: this.duration,
                    delay: this.delay,
                    ease: this.ease,
                    update: this.update,
                    context: this,
                  }));
              }),
              (l.get = function () {
                return W(this.el, this.name);
              }),
              (l.update = function (C) {
                y(this.el, this.name, C);
              }),
              (l.stop = function () {
                (this.active || this.nextStyle) &&
                  ((this.active = !1),
                  (this.nextStyle = null),
                  y(this.el, this.name, this.get()));
                var C = this.tween;
                C && C.context && C.destroy();
              }),
              (l.convert = function (C, re) {
                if (C == "auto" && this.auto) return C;
                var ue,
                  me = typeof C == "number",
                  K = typeof C == "string";
                switch (re) {
                  case A:
                    if (me) return C;
                    if (K && C.replace(x, "") === "") return +C;
                    ue = "number(unitless)";
                    break;
                  case V:
                    if (K) {
                      if (C === "" && this.original) return this.original;
                      if (re.test(C))
                        return C.charAt(0) == "#" && C.length == 7 ? C : R(C);
                    }
                    ue = "hex or rgb string";
                    break;
                  case G:
                    if (me) return C + this.unit;
                    if (K && re.test(C)) return C;
                    ue = "number(px) or string(unit)";
                    break;
                  case M:
                    if (me) return C + this.unit;
                    if (K && re.test(C)) return C;
                    ue = "number(px) or string(unit or %)";
                    break;
                  case H:
                    if (me) return C + this.angle;
                    if (K && re.test(C)) return C;
                    ue = "number(deg) or string(angle)";
                    break;
                  case Z:
                    if (me || (K && M.test(C))) return C;
                    ue = "number(unitless) or string(unit or %)";
                }
                return a(ue, C), C;
              }),
              (l.redraw = function () {
                this.el.offsetHeight;
              });
          }),
          g = f(h, function (l, T) {
            l.init = function () {
              T.init.apply(this, arguments),
                this.original || (this.original = this.convert(this.get(), V));
            };
          }),
          k = f(h, function (l, T) {
            (l.init = function () {
              T.init.apply(this, arguments), (this.animate = this.fallback);
            }),
              (l.get = function () {
                return this.$el[this.name]();
              }),
              (l.update = function (S) {
                this.$el[this.name](S);
              });
          }),
          Y = f(h, function (l, T) {
            function S(R, w) {
              var C, re, ue, me, K;
              for (C in R)
                (me = ve[C]),
                  (ue = me[0]),
                  (re = me[1] || C),
                  (K = this.convert(R[C], ue)),
                  w.call(this, re, K, ue);
            }
            (l.init = function () {
              T.init.apply(this, arguments),
                this.current ||
                  ((this.current = {}),
                  ve.perspective &&
                    ae.perspective &&
                    ((this.current.perspective = ae.perspective),
                    y(this.el, this.name, this.style(this.current)),
                    this.redraw()));
            }),
              (l.set = function (R) {
                S.call(this, R, function (w, C) {
                  this.current[w] = C;
                }),
                  y(this.el, this.name, this.style(this.current)),
                  this.redraw();
              }),
              (l.transition = function (R) {
                var w = this.values(R);
                this.tween = new ge({
                  current: this.current,
                  values: w,
                  duration: this.duration,
                  delay: this.delay,
                  ease: this.ease,
                });
                var C,
                  re = {};
                for (C in this.current) re[C] = C in w ? w[C] : this.current[C];
                (this.active = !0), (this.nextStyle = this.style(re));
              }),
              (l.fallback = function (R) {
                var w = this.values(R);
                this.tween = new ge({
                  current: this.current,
                  values: w,
                  duration: this.duration,
                  delay: this.delay,
                  ease: this.ease,
                  update: this.update,
                  context: this,
                });
              }),
              (l.update = function () {
                y(this.el, this.name, this.style(this.current));
              }),
              (l.style = function (R) {
                var w,
                  C = "";
                for (w in R) C += w + "(" + R[w] + ") ";
                return C;
              }),
              (l.values = function (R) {
                var w,
                  C = {};
                return (
                  S.call(this, R, function (re, ue, me) {
                    (C[re] = ue),
                      this.current[re] === void 0 &&
                        ((w = 0),
                        ~re.indexOf("scale") && (w = 1),
                        (this.current[re] = this.convert(w, me)));
                  }),
                  C
                );
              });
          }),
          z = f(function (l) {
            function T(K) {
              ue.push(K) === 1 && D(S);
            }
            function S() {
              var K,
                de,
                pe,
                Se = ue.length;
              if (Se)
                for (D(S), de = B(), K = Se; K--; )
                  (pe = ue[K]), pe && pe.render(de);
            }
            function R(K) {
              var de,
                pe = e.inArray(K, ue);
              pe >= 0 &&
                ((de = ue.slice(pe + 1)),
                (ue.length = pe),
                de.length && (ue = ue.concat(de)));
            }
            function w(K) {
              return Math.round(K * me) / me;
            }
            function C(K, de, pe) {
              return o(
                K[0] + pe * (de[0] - K[0]),
                K[1] + pe * (de[1] - K[1]),
                K[2] + pe * (de[2] - K[2])
              );
            }
            var re = { ease: I.ease[1], from: 0, to: 1 };
            (l.init = function (K) {
              (this.duration = K.duration || 0), (this.delay = K.delay || 0);
              var de = K.ease || re.ease;
              I[de] && (de = I[de][1]),
                typeof de != "function" && (de = re.ease),
                (this.ease = de),
                (this.update = K.update || i),
                (this.complete = K.complete || i),
                (this.context = K.context || this),
                (this.name = K.name);
              var pe = K.from,
                Se = K.to;
              pe === void 0 && (pe = re.from),
                Se === void 0 && (Se = re.to),
                (this.unit = K.unit || ""),
                typeof pe == "number" && typeof Se == "number"
                  ? ((this.begin = pe), (this.change = Se - pe))
                  : this.format(Se, pe),
                (this.value = this.begin + this.unit),
                (this.start = B()),
                K.autoplay !== !1 && this.play();
            }),
              (l.play = function () {
                this.active ||
                  (this.start || (this.start = B()), (this.active = !0), T(this));
              }),
              (l.stop = function () {
                this.active && ((this.active = !1), R(this));
              }),
              (l.render = function (K) {
                var de,
                  pe = K - this.start;
                if (this.delay) {
                  if (pe <= this.delay) return;
                  pe -= this.delay;
                }
                if (pe < this.duration) {
                  var Se = this.ease(pe, 0, 1, this.duration);
                  return (
                    (de = this.startRGB
                      ? C(this.startRGB, this.endRGB, Se)
                      : w(this.begin + Se * this.change)),
                    (this.value = de + this.unit),
                    void this.update.call(this.context, this.value)
                  );
                }
                (de = this.endHex || this.begin + this.change),
                  (this.value = de + this.unit),
                  this.update.call(this.context, this.value),
                  this.complete.call(this.context),
                  this.destroy();
              }),
              (l.format = function (K, de) {
                if (((de += ""), (K += ""), K.charAt(0) == "#"))
                  return (
                    (this.startRGB = n(de)),
                    (this.endRGB = n(K)),
                    (this.endHex = K),
                    (this.begin = 0),
                    void (this.change = 1)
                  );
                if (!this.unit) {
                  var pe = de.replace(x, ""),
                    Se = K.replace(x, "");
                  pe !== Se && s("tween", de, K), (this.unit = pe);
                }
                (de = parseFloat(de)),
                  (K = parseFloat(K)),
                  (this.begin = this.value = de),
                  (this.change = K - de);
              }),
              (l.destroy = function () {
                this.stop(),
                  (this.context = null),
                  (this.ease = this.update = this.complete = i);
              });
            var ue = [],
              me = 1e3;
          }),
          te = f(z, function (l) {
            (l.init = function (T) {
              (this.duration = T.duration || 0),
                (this.complete = T.complete || i),
                (this.context = T.context),
                this.play();
            }),
              (l.render = function (T) {
                var S = T - this.start;
                S < this.duration ||
                  (this.complete.call(this.context), this.destroy());
              });
          }),
          ge = f(z, function (l, T) {
            (l.init = function (S) {
              (this.context = S.context),
                (this.update = S.update),
                (this.tweens = []),
                (this.current = S.current);
              var R, w;
              for (R in S.values)
                (w = S.values[R]),
                  this.current[R] !== w &&
                    this.tweens.push(
                      new z({
                        name: R,
                        from: this.current[R],
                        to: w,
                        duration: S.duration,
                        delay: S.delay,
                        ease: S.ease,
                        autoplay: !1,
                      })
                    );
              this.play();
            }),
              (l.render = function (S) {
                var R,
                  w,
                  C = this.tweens.length,
                  re = !1;
                for (R = C; R--; )
                  (w = this.tweens[R]),
                    w.context &&
                      (w.render(S), (this.current[w.name] = w.value), (re = !0));
                return re
                  ? void (this.update && this.update.call(this.context))
                  : this.destroy();
              }),
              (l.destroy = function () {
                if ((T.destroy.call(this), this.tweens)) {
                  var S,
                    R = this.tweens.length;
                  for (S = R; S--; ) this.tweens[S].destroy();
                  (this.tweens = null), (this.current = null);
                }
              });
          }),
          ae = (t.config = {
            debug: !1,
            defaultUnit: "px",
            defaultAngle: "deg",
            keepInherited: !1,
            hideBackface: !1,
            perspective: "",
            fallback: !X.transition,
            agentTests: [],
          });
        (t.fallback = function (l) {
          if (!X.transition) return (ae.fallback = !0);
          ae.agentTests.push("(" + l + ")");
          var T = new RegExp(ae.agentTests.join("|"), "i");
          ae.fallback = T.test(navigator.userAgent);
        }),
          t.fallback("6.0.[2-5] Safari"),
          (t.tween = function (l) {
            return new z(l);
          }),
          (t.delay = function (l, T, S) {
            return new te({ complete: T, duration: l, context: S });
          }),
          (e.fn.tram = function (l) {
            return t.call(null, this, l);
          });
        var y = e.style,
          W = e.css,
          Q = { transform: X.transform && X.transform.css },
          j = {
            color: [g, V],
            background: [g, V, "background-color"],
            "outline-color": [g, V],
            "border-color": [g, V],
            "border-top-color": [g, V],
            "border-right-color": [g, V],
            "border-bottom-color": [g, V],
            "border-left-color": [g, V],
            "border-width": [h, G],
            "border-top-width": [h, G],
            "border-right-width": [h, G],
            "border-bottom-width": [h, G],
            "border-left-width": [h, G],
            "border-spacing": [h, G],
            "letter-spacing": [h, G],
            margin: [h, G],
            "margin-top": [h, G],
            "margin-right": [h, G],
            "margin-bottom": [h, G],
            "margin-left": [h, G],
            padding: [h, G],
            "padding-top": [h, G],
            "padding-right": [h, G],
            "padding-bottom": [h, G],
            "padding-left": [h, G],
            "outline-width": [h, G],
            opacity: [h, A],
            top: [h, M],
            right: [h, M],
            bottom: [h, M],
            left: [h, M],
            "font-size": [h, M],
            "text-indent": [h, M],
            "word-spacing": [h, M],
            width: [h, M],
            "min-width": [h, M],
            "max-width": [h, M],
            height: [h, M],
            "min-height": [h, M],
            "max-height": [h, M],
            "line-height": [h, Z],
            "scroll-top": [k, A, "scrollTop"],
            "scroll-left": [k, A, "scrollLeft"],
          },
          ve = {};
        X.transform &&
          ((j.transform = [Y]),
          (ve = {
            x: [M, "translateX"],
            y: [M, "translateY"],
            rotate: [H],
            rotateX: [H],
            rotateY: [H],
            scale: [A],
            scaleX: [A],
            scaleY: [A],
            skew: [H],
            skewX: [H],
            skewY: [H],
          })),
          X.transform &&
            X.backface &&
            ((ve.z = [M, "translateZ"]),
            (ve.rotateZ = [H]),
            (ve.scaleZ = [A]),
            (ve.perspective = [G]));
        var Ce = /ms/,
          Xe = /s|\./;
        return (e.tram = t);
      })(window.jQuery);
    });
    var qs = u((eB, Ls) => {
      var xm = window.$,
        Cm = Bi() && xm.tram;
      Ls.exports = (function () {
        var e = {};
        e.VERSION = "1.6.0-Webflow";
        var t = {},
          r = Array.prototype,
          n = Object.prototype,
          o = Function.prototype,
          i = r.push,
          a = r.slice,
          s = r.concat,
          c = n.toString,
          p = n.hasOwnProperty,
          E = r.forEach,
          f = r.map,
          I = r.reduce,
          _ = r.reduceRight,
          m = r.filter,
          b = r.every,
          N = r.some,
          x = r.indexOf,
          P = r.lastIndexOf,
          A = Array.isArray,
          V = Object.keys,
          G = o.bind,
          M =
            (e.each =
            e.forEach =
              function (O, q, F) {
                if (O == null) return O;
                if (E && O.forEach === E) O.forEach(q, F);
                else if (O.length === +O.length) {
                  for (var X = 0, ee = O.length; X < ee; X++)
                    if (q.call(F, O[X], X, O) === t) return;
                } else
                  for (var ie = e.keys(O), X = 0, ee = ie.length; X < ee; X++)
                    if (q.call(F, O[ie[X]], ie[X], O) === t) return;
                return O;
              });
        (e.map = e.collect =
          function (O, q, F) {
            var X = [];
            return O == null
              ? X
              : f && O.map === f
              ? O.map(q, F)
              : (M(O, function (ee, ie, D) {
                  X.push(q.call(F, ee, ie, D));
                }),
                X);
          }),
          (e.find = e.detect =
            function (O, q, F) {
              var X;
              return (
                H(O, function (ee, ie, D) {
                  if (q.call(F, ee, ie, D)) return (X = ee), !0;
                }),
                X
              );
            }),
          (e.filter = e.select =
            function (O, q, F) {
              var X = [];
              return O == null
                ? X
                : m && O.filter === m
                ? O.filter(q, F)
                : (M(O, function (ee, ie, D) {
                    q.call(F, ee, ie, D) && X.push(ee);
                  }),
                  X);
            });
        var H =
          (e.some =
          e.any =
            function (O, q, F) {
              q || (q = e.identity);
              var X = !1;
              return O == null
                ? X
                : N && O.some === N
                ? O.some(q, F)
                : (M(O, function (ee, ie, D) {
                    if (X || (X = q.call(F, ee, ie, D))) return t;
                  }),
                  !!X);
            });
        (e.contains = e.include =
          function (O, q) {
            return O == null
              ? !1
              : x && O.indexOf === x
              ? O.indexOf(q) != -1
              : H(O, function (F) {
                  return F === q;
                });
          }),
          (e.delay = function (O, q) {
            var F = a.call(arguments, 2);
            return setTimeout(function () {
              return O.apply(null, F);
            }, q);
          }),
          (e.defer = function (O) {
            return e.delay.apply(e, [O, 1].concat(a.call(arguments, 1)));
          }),
          (e.throttle = function (O) {
            var q, F, X;
            return function () {
              q ||
                ((q = !0),
                (F = arguments),
                (X = this),
                Cm.frame(function () {
                  (q = !1), O.apply(X, F);
                }));
            };
          }),
          (e.debounce = function (O, q, F) {
            var X,
              ee,
              ie,
              D,
              B,
              v = function () {
                var d = e.now() - D;
                d < q
                  ? (X = setTimeout(v, q - d))
                  : ((X = null), F || ((B = O.apply(ie, ee)), (ie = ee = null)));
              };
            return function () {
              (ie = this), (ee = arguments), (D = e.now());
              var d = F && !X;
              return (
                X || (X = setTimeout(v, q)),
                d && ((B = O.apply(ie, ee)), (ie = ee = null)),
                B
              );
            };
          }),
          (e.defaults = function (O) {
            if (!e.isObject(O)) return O;
            for (var q = 1, F = arguments.length; q < F; q++) {
              var X = arguments[q];
              for (var ee in X) O[ee] === void 0 && (O[ee] = X[ee]);
            }
            return O;
          }),
          (e.keys = function (O) {
            if (!e.isObject(O)) return [];
            if (V) return V(O);
            var q = [];
            for (var F in O) e.has(O, F) && q.push(F);
            return q;
          }),
          (e.has = function (O, q) {
            return p.call(O, q);
          }),
          (e.isObject = function (O) {
            return O === Object(O);
          }),
          (e.now =
            Date.now ||
            function () {
              return new Date().getTime();
            }),
          (e.templateSettings = {
            evaluate: /<%([\s\S]+?)%>/g,
            interpolate: /<%=([\s\S]+?)%>/g,
            escape: /<%-([\s\S]+?)%>/g,
          });
        var Z = /(.)^/,
          J = {
            "'": "'",
            "\\": "\\",
            "\r": "r",
            "\n": "n",
            "\u2028": "u2028",
            "\u2029": "u2029",
          },
          se = /\\|'|\r|\n|\u2028|\u2029/g,
          ne = function (O) {
            return "\\" + J[O];
          },
          U = /^\s*(\w|\$)+\s*$/;
        return (
          (e.template = function (O, q, F) {
            !q && F && (q = F), (q = e.defaults({}, q, e.templateSettings));
            var X = RegExp(
                [
                  (q.escape || Z).source,
                  (q.interpolate || Z).source,
                  (q.evaluate || Z).source,
                ].join("|") + "|$",
                "g"
              ),
              ee = 0,
              ie = "__p+='";
            O.replace(X, function (d, h, g, k, Y) {
              return (
                (ie += O.slice(ee, Y).replace(se, ne)),
                (ee = Y + d.length),
                h
                  ? (ie +=
                      `'+
  ((__t=(` +
                      h +
                      `))==null?'':_.escape(__t))+
  '`)
                  : g
                  ? (ie +=
                      `'+
  ((__t=(` +
                      g +
                      `))==null?'':__t)+
  '`)
                  : k &&
                    (ie +=
                      `';
  ` +
                      k +
                      `
  __p+='`),
                d
              );
            }),
              (ie += `';
  `);
            var D = q.variable;
            if (D) {
              if (!U.test(D))
                throw new Error("variable is not a bare identifier: " + D);
            } else
              (ie =
                `with(obj||{}){
  ` +
                ie +
                `}
  `),
                (D = "obj");
            ie =
              `var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
  ` +
              ie +
              `return __p;
  `;
            var B;
            try {
              B = new Function(q.variable || "obj", "_", ie);
            } catch (d) {
              throw ((d.source = ie), d);
            }
            var v = function (d) {
              return B.call(this, d, e);
            };
            return (
              (v.source =
                "function(" +
                D +
                `){
  ` +
                ie +
                "}"),
              v
            );
          }),
          e
        );
      })();
    });
    var Ye = u((tB, Ws) => {
      var _e = {},
        Qt = {},
        $t = [],
        Hi = window.Webflow || [],
        wt = window.jQuery,
        tt = wt(window),
        Nm = wt(document),
        lt = wt.isFunction,
        et = (_e._ = qs()),
        Ds = (_e.tram = Bi() && wt.tram),
        vn = !1,
        ji = !1;
      Ds.config.hideBackface = !1;
      Ds.config.keepInherited = !0;
      _e.define = function (e, t, r) {
        Qt[e] && Gs(Qt[e]);
        var n = (Qt[e] = t(wt, et, r) || {});
        return Fs(n), n;
      };
      _e.require = function (e) {
        return Qt[e];
      };
      function Fs(e) {
        _e.env() &&
          (lt(e.design) && tt.on("__wf_design", e.design),
          lt(e.preview) && tt.on("__wf_preview", e.preview)),
          lt(e.destroy) && tt.on("__wf_destroy", e.destroy),
          e.ready && lt(e.ready) && Pm(e);
      }
      function Pm(e) {
        if (vn) {
          e.ready();
          return;
        }
        et.contains($t, e.ready) || $t.push(e.ready);
      }
      function Gs(e) {
        lt(e.design) && tt.off("__wf_design", e.design),
          lt(e.preview) && tt.off("__wf_preview", e.preview),
          lt(e.destroy) && tt.off("__wf_destroy", e.destroy),
          e.ready && lt(e.ready) && Lm(e);
      }
      function Lm(e) {
        $t = et.filter($t, function (t) {
          return t !== e.ready;
        });
      }
      _e.push = function (e) {
        if (vn) {
          lt(e) && e();
          return;
        }
        Hi.push(e);
      };
      _e.env = function (e) {
        var t = window.__wf_design,
          r = typeof t < "u";
        if (!e) return r;
        if (e === "design") return r && t;
        if (e === "preview") return r && !t;
        if (e === "slug") return r && window.__wf_slug;
        if (e === "editor") return window.WebflowEditor;
        if (e === "test") return window.__wf_test;
        if (e === "frame") return window !== window.top;
      };
      var pn = navigator.userAgent.toLowerCase(),
        Xs = (_e.env.touch =
          "ontouchstart" in window ||
          (window.DocumentTouch && document instanceof window.DocumentTouch)),
        qm = (_e.env.chrome =
          /chrome/.test(pn) &&
          /Google/.test(navigator.vendor) &&
          parseInt(pn.match(/chrome\/(\d+)\./)[1], 10)),
        Mm = (_e.env.ios = /(ipod|iphone|ipad)/.test(pn));
      _e.env.safari = /safari/.test(pn) && !qm && !Mm;
      var ki;
      Xs &&
        Nm.on("touchstart mousedown", function (e) {
          ki = e.target;
        });
      _e.validClick = Xs
        ? function (e) {
            return e === ki || wt.contains(e, ki);
          }
        : function () {
            return !0;
          };
      var Us = "resize.webflow orientationchange.webflow load.webflow",
        Dm = "scroll.webflow " + Us;
      _e.resize = Ki(tt, Us);
      _e.scroll = Ki(tt, Dm);
      _e.redraw = Ki();
      function Ki(e, t) {
        var r = [],
          n = {};
        return (
          (n.up = et.throttle(function (o) {
            et.each(r, function (i) {
              i(o);
            });
          })),
          e && t && e.on(t, n.up),
          (n.on = function (o) {
            typeof o == "function" && (et.contains(r, o) || r.push(o));
          }),
          (n.off = function (o) {
            if (!arguments.length) {
              r = [];
              return;
            }
            r = et.filter(r, function (i) {
              return i !== o;
            });
          }),
          n
        );
      }
      _e.location = function (e) {
        window.location = e;
      };
      _e.env() && (_e.location = function () {});
      _e.ready = function () {
        (vn = !0), ji ? Fm() : et.each($t, Ms), et.each(Hi, Ms), _e.resize.up();
      };
      function Ms(e) {
        lt(e) && e();
      }
      function Fm() {
        (ji = !1), et.each(Qt, Fs);
      }
      var Ft;
      _e.load = function (e) {
        Ft.then(e);
      };
      function Vs() {
        Ft && (Ft.reject(), tt.off("load", Ft.resolve)),
          (Ft = new wt.Deferred()),
          tt.on("load", Ft.resolve);
      }
      _e.destroy = function (e) {
        (e = e || {}),
          (ji = !0),
          tt.triggerHandler("__wf_destroy"),
          e.domready != null && (vn = e.domready),
          et.each(Qt, Gs),
          _e.resize.off(),
          _e.scroll.off(),
          _e.redraw.off(),
          ($t = []),
          (Hi = []),
          Ft.state() === "pending" && Vs();
      };
      wt(_e.ready);
      Vs();
      Ws.exports = window.Webflow = _e;
    });
    var Hs = u((rB, ks) => {
      var Bs = Ye();
      Bs.define(
        "brand",
        (ks.exports = function (e) {
          var t = {},
            r = document,
            n = e("html"),
            o = e("body"),
            i = ".w-webflow-badge",
            a = window.location,
            s = /PhantomJS/i.test(navigator.userAgent),
            c =
              "fullscreenchange webkitfullscreenchange mozfullscreenchange msfullscreenchange",
            p;
          t.ready = function () {
            var _ = n.attr("data-wf-status"),
              m = n.attr("data-wf-domain") || "";
            /\.webflow\.io$/i.test(m) && a.hostname !== m && (_ = !0),
              _ &&
                !s &&
                ((p = p || f()),
                I(),
                setTimeout(I, 500),
                e(r).off(c, E).on(c, E));
          };
          function E() {
            var _ =
              r.fullScreen ||
              r.mozFullScreen ||
              r.webkitIsFullScreen ||
              r.msFullscreenElement ||
              !!r.webkitFullscreenElement;
            e(p).attr("style", _ ? "display: none !important;" : "");
          }
          function f() {
            var _ = e('<a class="w-webflow-badge"></a>').attr(
                "href",
                "https://webflow.com?utm_campaign=brandjs"
              ),
              m = e("<img>")
                .attr(
                  "src",
                  "https://d3e54v103j8qbb.cloudfront.net/img/webflow-badge-icon.f67cd735e3.svg"
                )
                .attr("alt", "")
                .css({ marginRight: "8px", width: "16px" }),
              b = e("<img>")
                .attr(
                  "src",
                  "https://d1otoma47x30pg.cloudfront.net/img/webflow-badge-text.6faa6a38cd.svg"
                )
                .attr("alt", "Made in Webflow");
            return _.append(m, b), _[0];
          }
          function I() {
            var _ = o.children(i),
              m = _.length && _.get(0) === p,
              b = Bs.env("editor");
            if (m) {
              b && _.remove();
              return;
            }
            _.length && _.remove(), b || o.append(p);
          }
          return t;
        })
      );
    });
    var Ks = u((nB, js) => {
      var Gm = Ye();
      Gm.define(
        "focus-visible",
        (js.exports = function () {
          function e(r) {
            var n = !0,
              o = !1,
              i = null,
              a = {
                text: !0,
                search: !0,
                url: !0,
                tel: !0,
                email: !0,
                password: !0,
                number: !0,
                date: !0,
                month: !0,
                week: !0,
                time: !0,
                datetime: !0,
                "datetime-local": !0,
              };
            function s(A) {
              return !!(
                A &&
                A !== document &&
                A.nodeName !== "HTML" &&
                A.nodeName !== "BODY" &&
                "classList" in A &&
                "contains" in A.classList
              );
            }
            function c(A) {
              var V = A.type,
                G = A.tagName;
              return !!(
                (G === "INPUT" && a[V] && !A.readOnly) ||
                (G === "TEXTAREA" && !A.readOnly) ||
                A.isContentEditable
              );
            }
            function p(A) {
              A.getAttribute("data-wf-focus-visible") ||
                A.setAttribute("data-wf-focus-visible", "true");
            }
            function E(A) {
              A.getAttribute("data-wf-focus-visible") &&
                A.removeAttribute("data-wf-focus-visible");
            }
            function f(A) {
              A.metaKey ||
                A.altKey ||
                A.ctrlKey ||
                (s(r.activeElement) && p(r.activeElement), (n = !0));
            }
            function I() {
              n = !1;
            }
            function _(A) {
              s(A.target) && (n || c(A.target)) && p(A.target);
            }
            function m(A) {
              s(A.target) &&
                A.target.hasAttribute("data-wf-focus-visible") &&
                ((o = !0),
                window.clearTimeout(i),
                (i = window.setTimeout(function () {
                  o = !1;
                }, 100)),
                E(A.target));
            }
            function b() {
              document.visibilityState === "hidden" && (o && (n = !0), N());
            }
            function N() {
              document.addEventListener("mousemove", P),
                document.addEventListener("mousedown", P),
                document.addEventListener("mouseup", P),
                document.addEventListener("pointermove", P),
                document.addEventListener("pointerdown", P),
                document.addEventListener("pointerup", P),
                document.addEventListener("touchmove", P),
                document.addEventListener("touchstart", P),
                document.addEventListener("touchend", P);
            }
            function x() {
              document.removeEventListener("mousemove", P),
                document.removeEventListener("mousedown", P),
                document.removeEventListener("mouseup", P),
                document.removeEventListener("pointermove", P),
                document.removeEventListener("pointerdown", P),
                document.removeEventListener("pointerup", P),
                document.removeEventListener("touchmove", P),
                document.removeEventListener("touchstart", P),
                document.removeEventListener("touchend", P);
            }
            function P(A) {
              (A.target.nodeName && A.target.nodeName.toLowerCase() === "html") ||
                ((n = !1), x());
            }
            document.addEventListener("keydown", f, !0),
              document.addEventListener("mousedown", I, !0),
              document.addEventListener("pointerdown", I, !0),
              document.addEventListener("touchstart", I, !0),
              document.addEventListener("visibilitychange", b, !0),
              N(),
              r.addEventListener("focus", _, !0),
              r.addEventListener("blur", m, !0);
          }
          function t() {
            if (typeof document < "u")
              try {
                document.querySelector(":focus-visible");
              } catch {
                e(document);
              }
          }
          return { ready: t };
        })
      );
    });
    var Qs = u((iB, Ys) => {
      var zs = Ye();
      zs.define(
        "focus",
        (Ys.exports = function () {
          var e = [],
            t = !1;
          function r(a) {
            t &&
              (a.preventDefault(),
              a.stopPropagation(),
              a.stopImmediatePropagation(),
              e.unshift(a));
          }
          function n(a) {
            var s = a.target,
              c = s.tagName;
            return (
              (/^a$/i.test(c) && s.href != null) ||
              (/^(button|textarea)$/i.test(c) && s.disabled !== !0) ||
              (/^input$/i.test(c) &&
                /^(button|reset|submit|radio|checkbox)$/i.test(s.type) &&
                !s.disabled) ||
              (!/^(button|input|textarea|select|a)$/i.test(c) &&
                !Number.isNaN(Number.parseFloat(s.tabIndex))) ||
              /^audio$/i.test(c) ||
              (/^video$/i.test(c) && s.controls === !0)
            );
          }
          function o(a) {
            n(a) &&
              ((t = !0),
              setTimeout(() => {
                for (t = !1, a.target.focus(); e.length > 0; ) {
                  var s = e.pop();
                  s.target.dispatchEvent(new MouseEvent(s.type, s));
                }
              }, 0));
          }
          function i() {
            typeof document < "u" &&
              document.body.hasAttribute("data-wf-focus-within") &&
              zs.env.safari &&
              (document.addEventListener("mousedown", o, !0),
              document.addEventListener("mouseup", r, !0),
              document.addEventListener("click", r, !0));
          }
          return { ready: i };
        })
      );
    });
    var Js = u((oB, Zs) => {
      "use strict";
      var zi = window.jQuery,
        ft = {},
        hn = [],
        $s = ".w-ix",
        gn = {
          reset: function (e, t) {
            t.__wf_intro = null;
          },
          intro: function (e, t) {
            t.__wf_intro ||
              ((t.__wf_intro = !0), zi(t).triggerHandler(ft.types.INTRO));
          },
          outro: function (e, t) {
            t.__wf_intro &&
              ((t.__wf_intro = null), zi(t).triggerHandler(ft.types.OUTRO));
          },
        };
      ft.triggers = {};
      ft.types = { INTRO: "w-ix-intro" + $s, OUTRO: "w-ix-outro" + $s };
      ft.init = function () {
        for (var e = hn.length, t = 0; t < e; t++) {
          var r = hn[t];
          r[0](0, r[1]);
        }
        (hn = []), zi.extend(ft.triggers, gn);
      };
      ft.async = function () {
        for (var e in gn) {
          var t = gn[e];
          gn.hasOwnProperty(e) &&
            (ft.triggers[e] = function (r, n) {
              hn.push([t, n]);
            });
        }
      };
      ft.async();
      Zs.exports = ft;
    });
    var _n = u((aB, ru) => {
      "use strict";
      var Yi = Js();
      function eu(e, t) {
        var r = document.createEvent("CustomEvent");
        r.initCustomEvent(t, !0, !0, null), e.dispatchEvent(r);
      }
      var Xm = window.jQuery,
        En = {},
        tu = ".w-ix",
        Um = {
          reset: function (e, t) {
            Yi.triggers.reset(e, t);
          },
          intro: function (e, t) {
            Yi.triggers.intro(e, t), eu(t, "COMPONENT_ACTIVE");
          },
          outro: function (e, t) {
            Yi.triggers.outro(e, t), eu(t, "COMPONENT_INACTIVE");
          },
        };
      En.triggers = {};
      En.types = { INTRO: "w-ix-intro" + tu, OUTRO: "w-ix-outro" + tu };
      Xm.extend(En.triggers, Um);
      ru.exports = En;
    });
    var nu = u((sB, mt) => {
      function Qi(e) {
        return (
          (mt.exports = Qi =
            typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    typeof Symbol == "function" &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? "symbol"
                    : typeof t;
                }),
          (mt.exports.__esModule = !0),
          (mt.exports.default = mt.exports),
          Qi(e)
        );
      }
      (mt.exports = Qi),
        (mt.exports.__esModule = !0),
        (mt.exports.default = mt.exports);
    });
    var Gt = u((uB, Rr) => {
      var Vm = nu().default;
      function iu(e) {
        if (typeof WeakMap != "function") return null;
        var t = new WeakMap(),
          r = new WeakMap();
        return (iu = function (o) {
          return o ? r : t;
        })(e);
      }
      function Wm(e, t) {
        if (!t && e && e.__esModule) return e;
        if (e === null || (Vm(e) !== "object" && typeof e != "function"))
          return { default: e };
        var r = iu(t);
        if (r && r.has(e)) return r.get(e);
        var n = {},
          o = Object.defineProperty && Object.getOwnPropertyDescriptor;
        for (var i in e)
          if (i !== "default" && Object.prototype.hasOwnProperty.call(e, i)) {
            var a = o ? Object.getOwnPropertyDescriptor(e, i) : null;
            a && (a.get || a.set)
              ? Object.defineProperty(n, i, a)
              : (n[i] = e[i]);
          }
        return (n.default = e), r && r.set(e, n), n;
      }
      (Rr.exports = Wm),
        (Rr.exports.__esModule = !0),
        (Rr.exports.default = Rr.exports);
    });
    var rt = u((cB, xr) => {
      function Bm(e) {
        return e && e.__esModule ? e : { default: e };
      }
      (xr.exports = Bm),
        (xr.exports.__esModule = !0),
        (xr.exports.default = xr.exports);
    });
    var Te = u((lB, ou) => {
      var yn = function (e) {
        return e && e.Math == Math && e;
      };
      ou.exports =
        yn(typeof globalThis == "object" && globalThis) ||
        yn(typeof window == "object" && window) ||
        yn(typeof self == "object" && self) ||
        yn(typeof global == "object" && global) ||
        (function () {
          return this;
        })() ||
        Function("return this")();
    });
    var Zt = u((fB, au) => {
      au.exports = function (e) {
        try {
          return !!e();
        } catch {
          return !0;
        }
      };
    });
    var Xt = u((dB, su) => {
      var km = Zt();
      su.exports = !km(function () {
        return (
          Object.defineProperty({}, 1, {
            get: function () {
              return 7;
            },
          })[1] != 7
        );
      });
    });
    var mn = u((pB, uu) => {
      var Cr = Function.prototype.call;
      uu.exports = Cr.bind
        ? Cr.bind(Cr)
        : function () {
            return Cr.apply(Cr, arguments);
          };
    });
    var du = u((fu) => {
      "use strict";
      var cu = {}.propertyIsEnumerable,
        lu = Object.getOwnPropertyDescriptor,
        Hm = lu && !cu.call({ 1: 2 }, 1);
      fu.f = Hm
        ? function (t) {
            var r = lu(this, t);
            return !!r && r.enumerable;
          }
        : cu;
    });
    var $i = u((hB, pu) => {
      pu.exports = function (e, t) {
        return {
          enumerable: !(e & 1),
          configurable: !(e & 2),
          writable: !(e & 4),
          value: t,
        };
      };
    });
    var nt = u((gB, hu) => {
      var vu = Function.prototype,
        Zi = vu.bind,
        Ji = vu.call,
        jm = Zi && Zi.bind(Ji);
      hu.exports = Zi
        ? function (e) {
            return e && jm(Ji, e);
          }
        : function (e) {
            return (
              e &&
              function () {
                return Ji.apply(e, arguments);
              }
            );
          };
    });
    var _u = u((EB, Eu) => {
      var gu = nt(),
        Km = gu({}.toString),
        zm = gu("".slice);
      Eu.exports = function (e) {
        return zm(Km(e), 8, -1);
      };
    });
    var mu = u((_B, yu) => {
      var Ym = Te(),
        Qm = nt(),
        $m = Zt(),
        Zm = _u(),
        eo = Ym.Object,
        Jm = Qm("".split);
      yu.exports = $m(function () {
        return !eo("z").propertyIsEnumerable(0);
      })
        ? function (e) {
            return Zm(e) == "String" ? Jm(e, "") : eo(e);
          }
        : eo;
    });
    var to = u((yB, Iu) => {
      var eI = Te(),
        tI = eI.TypeError;
      Iu.exports = function (e) {
        if (e == null) throw tI("Can't call method on " + e);
        return e;
      };
    });
    var Nr = u((mB, Tu) => {
      var rI = mu(),
        nI = to();
      Tu.exports = function (e) {
        return rI(nI(e));
      };
    });
    var dt = u((IB, bu) => {
      bu.exports = function (e) {
        return typeof e == "function";
      };
    });
    var Jt = u((TB, Ou) => {
      var iI = dt();
      Ou.exports = function (e) {
        return typeof e == "object" ? e !== null : iI(e);
      };
    });
    var Pr = u((bB, wu) => {
      var ro = Te(),
        oI = dt(),
        aI = function (e) {
          return oI(e) ? e : void 0;
        };
      wu.exports = function (e, t) {
        return arguments.length < 2 ? aI(ro[e]) : ro[e] && ro[e][t];
      };
    });
    var Au = u((OB, Su) => {
      var sI = nt();
      Su.exports = sI({}.isPrototypeOf);
    });
    var xu = u((wB, Ru) => {
      var uI = Pr();
      Ru.exports = uI("navigator", "userAgent") || "";
    });
    var Du = u((SB, Mu) => {
      var qu = Te(),
        no = xu(),
        Cu = qu.process,
        Nu = qu.Deno,
        Pu = (Cu && Cu.versions) || (Nu && Nu.version),
        Lu = Pu && Pu.v8,
        it,
        In;
      Lu &&
        ((it = Lu.split(".")),
        (In = it[0] > 0 && it[0] < 4 ? 1 : +(it[0] + it[1])));
      !In &&
        no &&
        ((it = no.match(/Edge\/(\d+)/)),
        (!it || it[1] >= 74) &&
          ((it = no.match(/Chrome\/(\d+)/)), it && (In = +it[1])));
      Mu.exports = In;
    });
    var io = u((AB, Gu) => {
      var Fu = Du(),
        cI = Zt();
      Gu.exports =
        !!Object.getOwnPropertySymbols &&
        !cI(function () {
          var e = Symbol();
          return (
            !String(e) ||
            !(Object(e) instanceof Symbol) ||
            (!Symbol.sham && Fu && Fu < 41)
          );
        });
    });
    var oo = u((RB, Xu) => {
      var lI = io();
      Xu.exports = lI && !Symbol.sham && typeof Symbol.iterator == "symbol";
    });
    var ao = u((xB, Uu) => {
      var fI = Te(),
        dI = Pr(),
        pI = dt(),
        vI = Au(),
        hI = oo(),
        gI = fI.Object;
      Uu.exports = hI
        ? function (e) {
            return typeof e == "symbol";
          }
        : function (e) {
            var t = dI("Symbol");
            return pI(t) && vI(t.prototype, gI(e));
          };
    });
    var Wu = u((CB, Vu) => {
      var EI = Te(),
        _I = EI.String;
      Vu.exports = function (e) {
        try {
          return _I(e);
        } catch {
          return "Object";
        }
      };
    });
    var ku = u((NB, Bu) => {
      var yI = Te(),
        mI = dt(),
        II = Wu(),
        TI = yI.TypeError;
      Bu.exports = function (e) {
        if (mI(e)) return e;
        throw TI(II(e) + " is not a function");
      };
    });
    var ju = u((PB, Hu) => {
      var bI = ku();
      Hu.exports = function (e, t) {
        var r = e[t];
        return r == null ? void 0 : bI(r);
      };
    });
    var zu = u((LB, Ku) => {
      var OI = Te(),
        so = mn(),
        uo = dt(),
        co = Jt(),
        wI = OI.TypeError;
      Ku.exports = function (e, t) {
        var r, n;
        if (
          (t === "string" && uo((r = e.toString)) && !co((n = so(r, e)))) ||
          (uo((r = e.valueOf)) && !co((n = so(r, e)))) ||
          (t !== "string" && uo((r = e.toString)) && !co((n = so(r, e))))
        )
          return n;
        throw wI("Can't convert object to primitive value");
      };
    });
    var Qu = u((qB, Yu) => {
      Yu.exports = !1;
    });
    var Tn = u((MB, Zu) => {
      var $u = Te(),
        SI = Object.defineProperty;
      Zu.exports = function (e, t) {
        try {
          SI($u, e, { value: t, configurable: !0, writable: !0 });
        } catch {
          $u[e] = t;
        }
        return t;
      };
    });
    var bn = u((DB, ec) => {
      var AI = Te(),
        RI = Tn(),
        Ju = "__core-js_shared__",
        xI = AI[Ju] || RI(Ju, {});
      ec.exports = xI;
    });
    var lo = u((FB, rc) => {
      var CI = Qu(),
        tc = bn();
      (rc.exports = function (e, t) {
        return tc[e] || (tc[e] = t !== void 0 ? t : {});
      })("versions", []).push({
        version: "3.19.0",
        mode: CI ? "pure" : "global",
        copyright: "\xA9 2021 Denis Pushkarev (zloirock.ru)",
      });
    });
    var ic = u((GB, nc) => {
      var NI = Te(),
        PI = to(),
        LI = NI.Object;
      nc.exports = function (e) {
        return LI(PI(e));
      };
    });
    var St = u((XB, oc) => {
      var qI = nt(),
        MI = ic(),
        DI = qI({}.hasOwnProperty);
      oc.exports =
        Object.hasOwn ||
        function (t, r) {
          return DI(MI(t), r);
        };
    });
    var fo = u((UB, ac) => {
      var FI = nt(),
        GI = 0,
        XI = Math.random(),
        UI = FI((1).toString);
      ac.exports = function (e) {
        return "Symbol(" + (e === void 0 ? "" : e) + ")_" + UI(++GI + XI, 36);
      };
    });
    var po = u((VB, fc) => {
      var VI = Te(),
        WI = lo(),
        sc = St(),
        BI = fo(),
        uc = io(),
        lc = oo(),
        er = WI("wks"),
        Ut = VI.Symbol,
        cc = Ut && Ut.for,
        kI = lc ? Ut : (Ut && Ut.withoutSetter) || BI;
      fc.exports = function (e) {
        if (!sc(er, e) || !(uc || typeof er[e] == "string")) {
          var t = "Symbol." + e;
          uc && sc(Ut, e)
            ? (er[e] = Ut[e])
            : lc && cc
            ? (er[e] = cc(t))
            : (er[e] = kI(t));
        }
        return er[e];
      };
    });
    var hc = u((WB, vc) => {
      var HI = Te(),
        jI = mn(),
        dc = Jt(),
        pc = ao(),
        KI = ju(),
        zI = zu(),
        YI = po(),
        QI = HI.TypeError,
        $I = YI("toPrimitive");
      vc.exports = function (e, t) {
        if (!dc(e) || pc(e)) return e;
        var r = KI(e, $I),
          n;
        if (r) {
          if (
            (t === void 0 && (t = "default"), (n = jI(r, e, t)), !dc(n) || pc(n))
          )
            return n;
          throw QI("Can't convert object to primitive value");
        }
        return t === void 0 && (t = "number"), zI(e, t);
      };
    });
    var vo = u((BB, gc) => {
      var ZI = hc(),
        JI = ao();
      gc.exports = function (e) {
        var t = ZI(e, "string");
        return JI(t) ? t : t + "";
      };
    });
    var go = u((kB, _c) => {
      var eT = Te(),
        Ec = Jt(),
        ho = eT.document,
        tT = Ec(ho) && Ec(ho.createElement);
      _c.exports = function (e) {
        return tT ? ho.createElement(e) : {};
      };
    });
    var Eo = u((HB, yc) => {
      var rT = Xt(),
        nT = Zt(),
        iT = go();
      yc.exports =
        !rT &&
        !nT(function () {
          return (
            Object.defineProperty(iT("div"), "a", {
              get: function () {
                return 7;
              },
            }).a != 7
          );
        });
    });
    var _o = u((Ic) => {
      var oT = Xt(),
        aT = mn(),
        sT = du(),
        uT = $i(),
        cT = Nr(),
        lT = vo(),
        fT = St(),
        dT = Eo(),
        mc = Object.getOwnPropertyDescriptor;
      Ic.f = oT
        ? mc
        : function (t, r) {
            if (((t = cT(t)), (r = lT(r)), dT))
              try {
                return mc(t, r);
              } catch {}
            if (fT(t, r)) return uT(!aT(sT.f, t, r), t[r]);
          };
    });
    var Lr = u((KB, bc) => {
      var Tc = Te(),
        pT = Jt(),
        vT = Tc.String,
        hT = Tc.TypeError;
      bc.exports = function (e) {
        if (pT(e)) return e;
        throw hT(vT(e) + " is not an object");
      };
    });
    var qr = u((Sc) => {
      var gT = Te(),
        ET = Xt(),
        _T = Eo(),
        Oc = Lr(),
        yT = vo(),
        mT = gT.TypeError,
        wc = Object.defineProperty;
      Sc.f = ET
        ? wc
        : function (t, r, n) {
            if ((Oc(t), (r = yT(r)), Oc(n), _T))
              try {
                return wc(t, r, n);
              } catch {}
            if ("get" in n || "set" in n) throw mT("Accessors not supported");
            return "value" in n && (t[r] = n.value), t;
          };
    });
    var On = u((YB, Ac) => {
      var IT = Xt(),
        TT = qr(),
        bT = $i();
      Ac.exports = IT
        ? function (e, t, r) {
            return TT.f(e, t, bT(1, r));
          }
        : function (e, t, r) {
            return (e[t] = r), e;
          };
    });
    var mo = u((QB, Rc) => {
      var OT = nt(),
        wT = dt(),
        yo = bn(),
        ST = OT(Function.toString);
      wT(yo.inspectSource) ||
        (yo.inspectSource = function (e) {
          return ST(e);
        });
      Rc.exports = yo.inspectSource;
    });
    var Nc = u(($B, Cc) => {
      var AT = Te(),
        RT = dt(),
        xT = mo(),
        xc = AT.WeakMap;
      Cc.exports = RT(xc) && /native code/.test(xT(xc));
    });
    var Io = u((ZB, Lc) => {
      var CT = lo(),
        NT = fo(),
        Pc = CT("keys");
      Lc.exports = function (e) {
        return Pc[e] || (Pc[e] = NT(e));
      };
    });
    var wn = u((JB, qc) => {
      qc.exports = {};
    });
    var Uc = u((ek, Xc) => {
      var PT = Nc(),
        Gc = Te(),
        To = nt(),
        LT = Jt(),
        qT = On(),
        bo = St(),
        Oo = bn(),
        MT = Io(),
        DT = wn(),
        Mc = "Object already initialized",
        So = Gc.TypeError,
        FT = Gc.WeakMap,
        Sn,
        Mr,
        An,
        GT = function (e) {
          return An(e) ? Mr(e) : Sn(e, {});
        },
        XT = function (e) {
          return function (t) {
            var r;
            if (!LT(t) || (r = Mr(t)).type !== e)
              throw So("Incompatible receiver, " + e + " required");
            return r;
          };
        };
      PT || Oo.state
        ? ((At = Oo.state || (Oo.state = new FT())),
          (Dc = To(At.get)),
          (wo = To(At.has)),
          (Fc = To(At.set)),
          (Sn = function (e, t) {
            if (wo(At, e)) throw new So(Mc);
            return (t.facade = e), Fc(At, e, t), t;
          }),
          (Mr = function (e) {
            return Dc(At, e) || {};
          }),
          (An = function (e) {
            return wo(At, e);
          }))
        : ((Vt = MT("state")),
          (DT[Vt] = !0),
          (Sn = function (e, t) {
            if (bo(e, Vt)) throw new So(Mc);
            return (t.facade = e), qT(e, Vt, t), t;
          }),
          (Mr = function (e) {
            return bo(e, Vt) ? e[Vt] : {};
          }),
          (An = function (e) {
            return bo(e, Vt);
          }));
      var At, Dc, wo, Fc, Vt;
      Xc.exports = { set: Sn, get: Mr, has: An, enforce: GT, getterFor: XT };
    });
    var Bc = u((tk, Wc) => {
      var Ao = Xt(),
        UT = St(),
        Vc = Function.prototype,
        VT = Ao && Object.getOwnPropertyDescriptor,
        Ro = UT(Vc, "name"),
        WT = Ro && function () {}.name === "something",
        BT = Ro && (!Ao || (Ao && VT(Vc, "name").configurable));
      Wc.exports = { EXISTS: Ro, PROPER: WT, CONFIGURABLE: BT };
    });
    var zc = u((rk, Kc) => {
      var kT = Te(),
        kc = dt(),
        HT = St(),
        Hc = On(),
        jT = Tn(),
        KT = mo(),
        jc = Uc(),
        zT = Bc().CONFIGURABLE,
        YT = jc.get,
        QT = jc.enforce,
        $T = String(String).split("String");
      (Kc.exports = function (e, t, r, n) {
        var o = n ? !!n.unsafe : !1,
          i = n ? !!n.enumerable : !1,
          a = n ? !!n.noTargetGet : !1,
          s = n && n.name !== void 0 ? n.name : t,
          c;
        if (
          (kc(r) &&
            (String(s).slice(0, 7) === "Symbol(" &&
              (s = "[" + String(s).replace(/^Symbol\(([^)]*)\)/, "$1") + "]"),
            (!HT(r, "name") || (zT && r.name !== s)) && Hc(r, "name", s),
            (c = QT(r)),
            c.source || (c.source = $T.join(typeof s == "string" ? s : ""))),
          e === kT)
        ) {
          i ? (e[t] = r) : jT(t, r);
          return;
        } else o ? !a && e[t] && (i = !0) : delete e[t];
        i ? (e[t] = r) : Hc(e, t, r);
      })(Function.prototype, "toString", function () {
        return (kc(this) && YT(this).source) || KT(this);
      });
    });
    var xo = u((nk, Yc) => {
      var ZT = Math.ceil,
        JT = Math.floor;
      Yc.exports = function (e) {
        var t = +e;
        return t !== t || t === 0 ? 0 : (t > 0 ? JT : ZT)(t);
      };
    });
    var $c = u((ik, Qc) => {
      var eb = xo(),
        tb = Math.max,
        rb = Math.min;
      Qc.exports = function (e, t) {
        var r = eb(e);
        return r < 0 ? tb(r + t, 0) : rb(r, t);
      };
    });
    var Jc = u((ok, Zc) => {
      var nb = xo(),
        ib = Math.min;
      Zc.exports = function (e) {
        return e > 0 ? ib(nb(e), 9007199254740991) : 0;
      };
    });
    var tl = u((ak, el) => {
      var ob = Jc();
      el.exports = function (e) {
        return ob(e.length);
      };
    });
    var Co = u((sk, nl) => {
      var ab = Nr(),
        sb = $c(),
        ub = tl(),
        rl = function (e) {
          return function (t, r, n) {
            var o = ab(t),
              i = ub(o),
              a = sb(n, i),
              s;
            if (e && r != r) {
              for (; i > a; ) if (((s = o[a++]), s != s)) return !0;
            } else
              for (; i > a; a++)
                if ((e || a in o) && o[a] === r) return e || a || 0;
            return !e && -1;
          };
        };
      nl.exports = { includes: rl(!0), indexOf: rl(!1) };
    });
    var Po = u((uk, ol) => {
      var cb = nt(),
        No = St(),
        lb = Nr(),
        fb = Co().indexOf,
        db = wn(),
        il = cb([].push);
      ol.exports = function (e, t) {
        var r = lb(e),
          n = 0,
          o = [],
          i;
        for (i in r) !No(db, i) && No(r, i) && il(o, i);
        for (; t.length > n; ) No(r, (i = t[n++])) && (~fb(o, i) || il(o, i));
        return o;
      };
    });
    var Rn = u((ck, al) => {
      al.exports = [
        "constructor",
        "hasOwnProperty",
        "isPrototypeOf",
        "propertyIsEnumerable",
        "toLocaleString",
        "toString",
        "valueOf",
      ];
    });
    var ul = u((sl) => {
      var pb = Po(),
        vb = Rn(),
        hb = vb.concat("length", "prototype");
      sl.f =
        Object.getOwnPropertyNames ||
        function (t) {
          return pb(t, hb);
        };
    });
    var ll = u((cl) => {
      cl.f = Object.getOwnPropertySymbols;
    });
    var dl = u((dk, fl) => {
      var gb = Pr(),
        Eb = nt(),
        _b = ul(),
        yb = ll(),
        mb = Lr(),
        Ib = Eb([].concat);
      fl.exports =
        gb("Reflect", "ownKeys") ||
        function (t) {
          var r = _b.f(mb(t)),
            n = yb.f;
          return n ? Ib(r, n(t)) : r;
        };
    });
    var vl = u((pk, pl) => {
      var Tb = St(),
        bb = dl(),
        Ob = _o(),
        wb = qr();
      pl.exports = function (e, t) {
        for (var r = bb(t), n = wb.f, o = Ob.f, i = 0; i < r.length; i++) {
          var a = r[i];
          Tb(e, a) || n(e, a, o(t, a));
        }
      };
    });
    var gl = u((vk, hl) => {
      var Sb = Zt(),
        Ab = dt(),
        Rb = /#|\.prototype\./,
        Dr = function (e, t) {
          var r = Cb[xb(e)];
          return r == Pb ? !0 : r == Nb ? !1 : Ab(t) ? Sb(t) : !!t;
        },
        xb = (Dr.normalize = function (e) {
          return String(e).replace(Rb, ".").toLowerCase();
        }),
        Cb = (Dr.data = {}),
        Nb = (Dr.NATIVE = "N"),
        Pb = (Dr.POLYFILL = "P");
      hl.exports = Dr;
    });
    var _l = u((hk, El) => {
      var Lo = Te(),
        Lb = _o().f,
        qb = On(),
        Mb = zc(),
        Db = Tn(),
        Fb = vl(),
        Gb = gl();
      El.exports = function (e, t) {
        var r = e.target,
          n = e.global,
          o = e.stat,
          i,
          a,
          s,
          c,
          p,
          E;
        if (
          (n
            ? (a = Lo)
            : o
            ? (a = Lo[r] || Db(r, {}))
            : (a = (Lo[r] || {}).prototype),
          a)
        )
          for (s in t) {
            if (
              ((p = t[s]),
              e.noTargetGet ? ((E = Lb(a, s)), (c = E && E.value)) : (c = a[s]),
              (i = Gb(n ? s : r + (o ? "." : "#") + s, e.forced)),
              !i && c !== void 0)
            ) {
              if (typeof p == typeof c) continue;
              Fb(p, c);
            }
            (e.sham || (c && c.sham)) && qb(p, "sham", !0), Mb(a, s, p, e);
          }
      };
    });
    var ml = u((gk, yl) => {
      var Xb = Po(),
        Ub = Rn();
      yl.exports =
        Object.keys ||
        function (t) {
          return Xb(t, Ub);
        };
    });
    var Tl = u((Ek, Il) => {
      var Vb = Xt(),
        Wb = qr(),
        Bb = Lr(),
        kb = Nr(),
        Hb = ml();
      Il.exports = Vb
        ? Object.defineProperties
        : function (t, r) {
            Bb(t);
            for (var n = kb(r), o = Hb(r), i = o.length, a = 0, s; i > a; )
              Wb.f(t, (s = o[a++]), n[s]);
            return t;
          };
    });
    var Ol = u((_k, bl) => {
      var jb = Pr();
      bl.exports = jb("document", "documentElement");
    });
    var Pl = u((yk, Nl) => {
      var Kb = Lr(),
        zb = Tl(),
        wl = Rn(),
        Yb = wn(),
        Qb = Ol(),
        $b = go(),
        Zb = Io(),
        Sl = ">",
        Al = "<",
        Mo = "prototype",
        Do = "script",
        xl = Zb("IE_PROTO"),
        qo = function () {},
        Cl = function (e) {
          return Al + Do + Sl + e + Al + "/" + Do + Sl;
        },
        Rl = function (e) {
          e.write(Cl("")), e.close();
          var t = e.parentWindow.Object;
          return (e = null), t;
        },
        Jb = function () {
          var e = $b("iframe"),
            t = "java" + Do + ":",
            r;
          return (
            (e.style.display = "none"),
            Qb.appendChild(e),
            (e.src = String(t)),
            (r = e.contentWindow.document),
            r.open(),
            r.write(Cl("document.F=Object")),
            r.close(),
            r.F
          );
        },
        xn,
        Cn = function () {
          try {
            xn = new ActiveXObject("htmlfile");
          } catch {}
          Cn =
            typeof document < "u"
              ? document.domain && xn
                ? Rl(xn)
                : Jb()
              : Rl(xn);
          for (var e = wl.length; e--; ) delete Cn[Mo][wl[e]];
          return Cn();
        };
      Yb[xl] = !0;
      Nl.exports =
        Object.create ||
        function (t, r) {
          var n;
          return (
            t !== null
              ? ((qo[Mo] = Kb(t)), (n = new qo()), (qo[Mo] = null), (n[xl] = t))
              : (n = Cn()),
            r === void 0 ? n : zb(n, r)
          );
        };
    });
    var ql = u((mk, Ll) => {
      var eO = po(),
        tO = Pl(),
        rO = qr(),
        Fo = eO("unscopables"),
        Go = Array.prototype;
      Go[Fo] == null && rO.f(Go, Fo, { configurable: !0, value: tO(null) });
      Ll.exports = function (e) {
        Go[Fo][e] = !0;
      };
    });
    var Ml = u(() => {
      "use strict";
      var nO = _l(),
        iO = Co().includes,
        oO = ql();
      nO(
        { target: "Array", proto: !0 },
        {
          includes: function (t) {
            return iO(this, t, arguments.length > 1 ? arguments[1] : void 0);
          },
        }
      );
      oO("includes");
    });
    var Fl = u((bk, Dl) => {
      var aO = Te(),
        sO = nt();
      Dl.exports = function (e, t) {
        return sO(aO[e].prototype[t]);
      };
    });
    var Xl = u((Ok, Gl) => {
      Ml();
      var uO = Fl();
      Gl.exports = uO("Array", "includes");
    });
    var Vl = u((wk, Ul) => {
      var cO = Xl();
      Ul.exports = cO;
    });
    var Bl = u((Sk, Wl) => {
      var lO = Vl();
      Wl.exports = lO;
    });
    var Xo = u((Ak, kl) => {
      var fO =
        typeof global == "object" && global && global.Object === Object && global;
      kl.exports = fO;
    });
    var ot = u((Rk, Hl) => {
      var dO = Xo(),
        pO = typeof self == "object" && self && self.Object === Object && self,
        vO = dO || pO || Function("return this")();
      Hl.exports = vO;
    });
    var tr = u((xk, jl) => {
      var hO = ot(),
        gO = hO.Symbol;
      jl.exports = gO;
    });
    var Ql = u((Ck, Yl) => {
      var Kl = tr(),
        zl = Object.prototype,
        EO = zl.hasOwnProperty,
        _O = zl.toString,
        Fr = Kl ? Kl.toStringTag : void 0;
      function yO(e) {
        var t = EO.call(e, Fr),
          r = e[Fr];
        try {
          e[Fr] = void 0;
          var n = !0;
        } catch {}
        var o = _O.call(e);
        return n && (t ? (e[Fr] = r) : delete e[Fr]), o;
      }
      Yl.exports = yO;
    });
    var Zl = u((Nk, $l) => {
      var mO = Object.prototype,
        IO = mO.toString;
      function TO(e) {
        return IO.call(e);
      }
      $l.exports = TO;
    });
    var Rt = u((Pk, tf) => {
      var Jl = tr(),
        bO = Ql(),
        OO = Zl(),
        wO = "[object Null]",
        SO = "[object Undefined]",
        ef = Jl ? Jl.toStringTag : void 0;
      function AO(e) {
        return e == null
          ? e === void 0
            ? SO
            : wO
          : ef && ef in Object(e)
          ? bO(e)
          : OO(e);
      }
      tf.exports = AO;
    });
    var Uo = u((Lk, rf) => {
      function RO(e, t) {
        return function (r) {
          return e(t(r));
        };
      }
      rf.exports = RO;
    });
    var Vo = u((qk, nf) => {
      var xO = Uo(),
        CO = xO(Object.getPrototypeOf, Object);
      nf.exports = CO;
    });
    var It = u((Mk, of) => {
      function NO(e) {
        return e != null && typeof e == "object";
      }
      of.exports = NO;
    });
    var Wo = u((Dk, sf) => {
      var PO = Rt(),
        LO = Vo(),
        qO = It(),
        MO = "[object Object]",
        DO = Function.prototype,
        FO = Object.prototype,
        af = DO.toString,
        GO = FO.hasOwnProperty,
        XO = af.call(Object);
      function UO(e) {
        if (!qO(e) || PO(e) != MO) return !1;
        var t = LO(e);
        if (t === null) return !0;
        var r = GO.call(t, "constructor") && t.constructor;
        return typeof r == "function" && r instanceof r && af.call(r) == XO;
      }
      sf.exports = UO;
    });
    var uf = u((Bo) => {
      "use strict";
      Object.defineProperty(Bo, "__esModule", { value: !0 });
      Bo.default = VO;
      function VO(e) {
        var t,
          r = e.Symbol;
        return (
          typeof r == "function"
            ? r.observable
              ? (t = r.observable)
              : ((t = r("observable")), (r.observable = t))
            : (t = "@@observable"),
          t
        );
      }
    });
    var cf = u((Ho, ko) => {
      "use strict";
      Object.defineProperty(Ho, "__esModule", { value: !0 });
      var WO = uf(),
        BO = kO(WO);
      function kO(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var rr;
      typeof self < "u"
        ? (rr = self)
        : typeof window < "u"
        ? (rr = window)
        : typeof global < "u"
        ? (rr = global)
        : typeof ko < "u"
        ? (rr = ko)
        : (rr = Function("return this")());
      var HO = (0, BO.default)(rr);
      Ho.default = HO;
    });
    var jo = u((Gr) => {
      "use strict";
      Gr.__esModule = !0;
      Gr.ActionTypes = void 0;
      Gr.default = pf;
      var jO = Wo(),
        KO = df(jO),
        zO = cf(),
        lf = df(zO);
      function df(e) {
        return e && e.__esModule ? e : { default: e };
      }
      var ff = (Gr.ActionTypes = { INIT: "@@redux/INIT" });
      function pf(e, t, r) {
        var n;
        if (
          (typeof t == "function" && typeof r > "u" && ((r = t), (t = void 0)),
          typeof r < "u")
        ) {
          if (typeof r != "function")
            throw new Error("Expected the enhancer to be a function.");
          return r(pf)(e, t);
        }
        if (typeof e != "function")
          throw new Error("Expected the reducer to be a function.");
        var o = e,
          i = t,
          a = [],
          s = a,
          c = !1;
        function p() {
          s === a && (s = a.slice());
        }
        function E() {
          return i;
        }
        function f(b) {
          if (typeof b != "function")
            throw new Error("Expected listener to be a function.");
          var N = !0;
          return (
            p(),
            s.push(b),
            function () {
              if (N) {
                (N = !1), p();
                var P = s.indexOf(b);
                s.splice(P, 1);
              }
            }
          );
        }
        function I(b) {
          if (!(0, KO.default)(b))
            throw new Error(
              "Actions must be plain objects. Use custom middleware for async actions."
            );
          if (typeof b.type > "u")
            throw new Error(
              'Actions may not have an undefined "type" property. Have you misspelled a constant?'
            );
          if (c) throw new Error("Reducers may not dispatch actions.");
          try {
            (c = !0), (i = o(i, b));
          } finally {
            c = !1;
          }
          for (var N = (a = s), x = 0; x < N.length; x++) N[x]();
          return b;
        }
        function _(b) {
          if (typeof b != "function")
            throw new Error("Expected the nextReducer to be a function.");
          (o = b), I({ type: ff.INIT });
        }
        function m() {
          var b,
            N = f;
          return (
            (b = {
              subscribe: function (P) {
                if (typeof P != "object")
                  throw new TypeError("Expected the observer to be an object.");
                function A() {
                  P.next && P.next(E());
                }
                A();
                var V = N(A);
                return { unsubscribe: V };
              },
            }),
            (b[lf.default] = function () {
              return this;
            }),
            b
          );
        }
        return (
          I({ type: ff.INIT }),
          (n = { dispatch: I, subscribe: f, getState: E, replaceReducer: _ }),
          (n[lf.default] = m),
          n
        );
      }
    });
    var zo = u((Ko) => {
      "use strict";
      Ko.__esModule = !0;
      Ko.default = YO;
      function YO(e) {
        typeof console < "u" &&
          typeof console.error == "function" &&
          console.error(e);
        try {
          throw new Error(e);
        } catch {}
      }
    });
    var gf = u((Yo) => {
      "use strict";
      Yo.__esModule = !0;
      Yo.default = e0;
      var vf = jo(),
        QO = Wo(),
        Uk = hf(QO),
        $O = zo(),
        Vk = hf($O);
      function hf(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function ZO(e, t) {
        var r = t && t.type,
          n = (r && '"' + r.toString() + '"') || "an action";
        return (
          "Given action " +
          n +
          ', reducer "' +
          e +
          '" returned undefined. To ignore an action, you must explicitly return the previous state.'
        );
      }
      function JO(e) {
        Object.keys(e).forEach(function (t) {
          var r = e[t],
            n = r(void 0, { type: vf.ActionTypes.INIT });
          if (typeof n > "u")
            throw new Error(
              'Reducer "' +
                t +
                '" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined.'
            );
          var o =
            "@@redux/PROBE_UNKNOWN_ACTION_" +
            Math.random().toString(36).substring(7).split("").join(".");
          if (typeof r(void 0, { type: o }) > "u")
            throw new Error(
              'Reducer "' +
                t +
                '" returned undefined when probed with a random type. ' +
                ("Don't try to handle " +
                  vf.ActionTypes.INIT +
                  ' or other actions in "redux/*" ') +
                "namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined."
            );
        });
      }
      function e0(e) {
        for (var t = Object.keys(e), r = {}, n = 0; n < t.length; n++) {
          var o = t[n];
          typeof e[o] == "function" && (r[o] = e[o]);
        }
        var i = Object.keys(r);
        if (!1) var a;
        var s;
        try {
          JO(r);
        } catch (c) {
          s = c;
        }
        return function () {
          var p =
              arguments.length <= 0 || arguments[0] === void 0
                ? {}
                : arguments[0],
            E = arguments[1];
          if (s) throw s;
          if (!1) var f;
          for (var I = !1, _ = {}, m = 0; m < i.length; m++) {
            var b = i[m],
              N = r[b],
              x = p[b],
              P = N(x, E);
            if (typeof P > "u") {
              var A = ZO(b, E);
              throw new Error(A);
            }
            (_[b] = P), (I = I || P !== x);
          }
          return I ? _ : p;
        };
      }
    });
    var _f = u((Qo) => {
      "use strict";
      Qo.__esModule = !0;
      Qo.default = t0;
      function Ef(e, t) {
        return function () {
          return t(e.apply(void 0, arguments));
        };
      }
      function t0(e, t) {
        if (typeof e == "function") return Ef(e, t);
        if (typeof e != "object" || e === null)
          throw new Error(
            "bindActionCreators expected an object or a function, instead received " +
              (e === null ? "null" : typeof e) +
              '. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?'
          );
        for (var r = Object.keys(e), n = {}, o = 0; o < r.length; o++) {
          var i = r[o],
            a = e[i];
          typeof a == "function" && (n[i] = Ef(a, t));
        }
        return n;
      }
    });
    var Zo = u(($o) => {
      "use strict";
      $o.__esModule = !0;
      $o.default = r0;
      function r0() {
        for (var e = arguments.length, t = Array(e), r = 0; r < e; r++)
          t[r] = arguments[r];
        if (t.length === 0)
          return function (i) {
            return i;
          };
        if (t.length === 1) return t[0];
        var n = t[t.length - 1],
          o = t.slice(0, -1);
        return function () {
          return o.reduceRight(function (i, a) {
            return a(i);
          }, n.apply(void 0, arguments));
        };
      }
    });
    var yf = u((Jo) => {
      "use strict";
      Jo.__esModule = !0;
      var n0 =
        Object.assign ||
        function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            for (var n in r)
              Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
          }
          return e;
        };
      Jo.default = s0;
      var i0 = Zo(),
        o0 = a0(i0);
      function a0(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function s0() {
        for (var e = arguments.length, t = Array(e), r = 0; r < e; r++)
          t[r] = arguments[r];
        return function (n) {
          return function (o, i, a) {
            var s = n(o, i, a),
              c = s.dispatch,
              p = [],
              E = {
                getState: s.getState,
                dispatch: function (I) {
                  return c(I);
                },
              };
            return (
              (p = t.map(function (f) {
                return f(E);
              })),
              (c = o0.default.apply(void 0, p)(s.dispatch)),
              n0({}, s, { dispatch: c })
            );
          };
        };
      }
    });
    var ea = u((Qe) => {
      "use strict";
      Qe.__esModule = !0;
      Qe.compose =
        Qe.applyMiddleware =
        Qe.bindActionCreators =
        Qe.combineReducers =
        Qe.createStore =
          void 0;
      var u0 = jo(),
        c0 = nr(u0),
        l0 = gf(),
        f0 = nr(l0),
        d0 = _f(),
        p0 = nr(d0),
        v0 = yf(),
        h0 = nr(v0),
        g0 = Zo(),
        E0 = nr(g0),
        _0 = zo(),
        jk = nr(_0);
      function nr(e) {
        return e && e.__esModule ? e : { default: e };
      }
      Qe.createStore = c0.default;
      Qe.combineReducers = f0.default;
      Qe.bindActionCreators = p0.default;
      Qe.applyMiddleware = h0.default;
      Qe.compose = E0.default;
    });
    var mf = u((Le) => {
      "use strict";
      Object.defineProperty(Le, "__esModule", { value: !0 });
      Le.QuickEffectIds =
        Le.QuickEffectDirectionConsts =
        Le.EventTypeConsts =
        Le.EventLimitAffectedElements =
        Le.EventContinuousMouseAxes =
        Le.EventBasedOn =
        Le.EventAppliesTo =
          void 0;
      var y0 = {
        NAVBAR_OPEN: "NAVBAR_OPEN",
        NAVBAR_CLOSE: "NAVBAR_CLOSE",
        TAB_ACTIVE: "TAB_ACTIVE",
        TAB_INACTIVE: "TAB_INACTIVE",
        SLIDER_ACTIVE: "SLIDER_ACTIVE",
        SLIDER_INACTIVE: "SLIDER_INACTIVE",
        DROPDOWN_OPEN: "DROPDOWN_OPEN",
        DROPDOWN_CLOSE: "DROPDOWN_CLOSE",
        MOUSE_CLICK: "MOUSE_CLICK",
        MOUSE_SECOND_CLICK: "MOUSE_SECOND_CLICK",
        MOUSE_DOWN: "MOUSE_DOWN",
        MOUSE_UP: "MOUSE_UP",
        MOUSE_OVER: "MOUSE_OVER",
        MOUSE_OUT: "MOUSE_OUT",
        MOUSE_MOVE: "MOUSE_MOVE",
        MOUSE_MOVE_IN_VIEWPORT: "MOUSE_MOVE_IN_VIEWPORT",
        SCROLL_INTO_VIEW: "SCROLL_INTO_VIEW",
        SCROLL_OUT_OF_VIEW: "SCROLL_OUT_OF_VIEW",
        SCROLLING_IN_VIEW: "SCROLLING_IN_VIEW",
        ECOMMERCE_CART_OPEN: "ECOMMERCE_CART_OPEN",
        ECOMMERCE_CART_CLOSE: "ECOMMERCE_CART_CLOSE",
        PAGE_START: "PAGE_START",
        PAGE_FINISH: "PAGE_FINISH",
        PAGE_SCROLL_UP: "PAGE_SCROLL_UP",
        PAGE_SCROLL_DOWN: "PAGE_SCROLL_DOWN",
        PAGE_SCROLL: "PAGE_SCROLL",
      };
      Le.EventTypeConsts = y0;
      var m0 = { ELEMENT: "ELEMENT", CLASS: "CLASS", PAGE: "PAGE" };
      Le.EventAppliesTo = m0;
      var I0 = { ELEMENT: "ELEMENT", VIEWPORT: "VIEWPORT" };
      Le.EventBasedOn = I0;
      var T0 = { X_AXIS: "X_AXIS", Y_AXIS: "Y_AXIS" };
      Le.EventContinuousMouseAxes = T0;
      var b0 = {
        CHILDREN: "CHILDREN",
        SIBLINGS: "SIBLINGS",
        IMMEDIATE_CHILDREN: "IMMEDIATE_CHILDREN",
      };
      Le.EventLimitAffectedElements = b0;
      var O0 = {
        FADE_EFFECT: "FADE_EFFECT",
        SLIDE_EFFECT: "SLIDE_EFFECT",
        GROW_EFFECT: "GROW_EFFECT",
        SHRINK_EFFECT: "SHRINK_EFFECT",
        SPIN_EFFECT: "SPIN_EFFECT",
        FLY_EFFECT: "FLY_EFFECT",
        POP_EFFECT: "POP_EFFECT",
        FLIP_EFFECT: "FLIP_EFFECT",
        JIGGLE_EFFECT: "JIGGLE_EFFECT",
        PULSE_EFFECT: "PULSE_EFFECT",
        DROP_EFFECT: "DROP_EFFECT",
        BLINK_EFFECT: "BLINK_EFFECT",
        BOUNCE_EFFECT: "BOUNCE_EFFECT",
        FLIP_LEFT_TO_RIGHT_EFFECT: "FLIP_LEFT_TO_RIGHT_EFFECT",
        FLIP_RIGHT_TO_LEFT_EFFECT: "FLIP_RIGHT_TO_LEFT_EFFECT",
        RUBBER_BAND_EFFECT: "RUBBER_BAND_EFFECT",
        JELLO_EFFECT: "JELLO_EFFECT",
        GROW_BIG_EFFECT: "GROW_BIG_EFFECT",
        SHRINK_BIG_EFFECT: "SHRINK_BIG_EFFECT",
        PLUGIN_LOTTIE_EFFECT: "PLUGIN_LOTTIE_EFFECT",
      };
      Le.QuickEffectIds = O0;
      var w0 = {
        LEFT: "LEFT",
        RIGHT: "RIGHT",
        BOTTOM: "BOTTOM",
        TOP: "TOP",
        BOTTOM_LEFT: "BOTTOM_LEFT",
        BOTTOM_RIGHT: "BOTTOM_RIGHT",
        TOP_RIGHT: "TOP_RIGHT",
        TOP_LEFT: "TOP_LEFT",
        CLOCKWISE: "CLOCKWISE",
        COUNTER_CLOCKWISE: "COUNTER_CLOCKWISE",
      };
      Le.QuickEffectDirectionConsts = w0;
    });
    var ta = u((ir) => {
      "use strict";
      Object.defineProperty(ir, "__esModule", { value: !0 });
      ir.ActionTypeConsts = ir.ActionAppliesTo = void 0;
      var S0 = {
        TRANSFORM_MOVE: "TRANSFORM_MOVE",
        TRANSFORM_SCALE: "TRANSFORM_SCALE",
        TRANSFORM_ROTATE: "TRANSFORM_ROTATE",
        TRANSFORM_SKEW: "TRANSFORM_SKEW",
        STYLE_OPACITY: "STYLE_OPACITY",
        STYLE_SIZE: "STYLE_SIZE",
        STYLE_FILTER: "STYLE_FILTER",
        STYLE_FONT_VARIATION: "STYLE_FONT_VARIATION",
        STYLE_BACKGROUND_COLOR: "STYLE_BACKGROUND_COLOR",
        STYLE_BORDER: "STYLE_BORDER",
        STYLE_TEXT_COLOR: "STYLE_TEXT_COLOR",
        OBJECT_VALUE: "OBJECT_VALUE",
        PLUGIN_LOTTIE: "PLUGIN_LOTTIE",
        PLUGIN_SPLINE: "PLUGIN_SPLINE",
        PLUGIN_VARIABLE: "PLUGIN_VARIABLE",
        GENERAL_DISPLAY: "GENERAL_DISPLAY",
        GENERAL_START_ACTION: "GENERAL_START_ACTION",
        GENERAL_CONTINUOUS_ACTION: "GENERAL_CONTINUOUS_ACTION",
        GENERAL_COMBO_CLASS: "GENERAL_COMBO_CLASS",
        GENERAL_STOP_ACTION: "GENERAL_STOP_ACTION",
        GENERAL_LOOP: "GENERAL_LOOP",
        STYLE_BOX_SHADOW: "STYLE_BOX_SHADOW",
      };
      ir.ActionTypeConsts = S0;
      var A0 = {
        ELEMENT: "ELEMENT",
        ELEMENT_CLASS: "ELEMENT_CLASS",
        TRIGGER_ELEMENT: "TRIGGER_ELEMENT",
      };
      ir.ActionAppliesTo = A0;
    });
    var If = u((Nn) => {
      "use strict";
      Object.defineProperty(Nn, "__esModule", { value: !0 });
      Nn.InteractionTypeConsts = void 0;
      var R0 = {
        MOUSE_CLICK_INTERACTION: "MOUSE_CLICK_INTERACTION",
        MOUSE_HOVER_INTERACTION: "MOUSE_HOVER_INTERACTION",
        MOUSE_MOVE_INTERACTION: "MOUSE_MOVE_INTERACTION",
        SCROLL_INTO_VIEW_INTERACTION: "SCROLL_INTO_VIEW_INTERACTION",
        SCROLLING_IN_VIEW_INTERACTION: "SCROLLING_IN_VIEW_INTERACTION",
        MOUSE_MOVE_IN_VIEWPORT_INTERACTION: "MOUSE_MOVE_IN_VIEWPORT_INTERACTION",
        PAGE_IS_SCROLLING_INTERACTION: "PAGE_IS_SCROLLING_INTERACTION",
        PAGE_LOAD_INTERACTION: "PAGE_LOAD_INTERACTION",
        PAGE_SCROLLED_INTERACTION: "PAGE_SCROLLED_INTERACTION",
        NAVBAR_INTERACTION: "NAVBAR_INTERACTION",
        DROPDOWN_INTERACTION: "DROPDOWN_INTERACTION",
        ECOMMERCE_CART_INTERACTION: "ECOMMERCE_CART_INTERACTION",
        TAB_INTERACTION: "TAB_INTERACTION",
        SLIDER_INTERACTION: "SLIDER_INTERACTION",
      };
      Nn.InteractionTypeConsts = R0;
    });
    var Tf = u((Pn) => {
      "use strict";
      Object.defineProperty(Pn, "__esModule", { value: !0 });
      Pn.ReducedMotionTypes = void 0;
      var x0 = ta(),
        {
          TRANSFORM_MOVE: C0,
          TRANSFORM_SCALE: N0,
          TRANSFORM_ROTATE: P0,
          TRANSFORM_SKEW: L0,
          STYLE_SIZE: q0,
          STYLE_FILTER: M0,
          STYLE_FONT_VARIATION: D0,
        } = x0.ActionTypeConsts,
        F0 = {
          [C0]: !0,
          [N0]: !0,
          [P0]: !0,
          [L0]: !0,
          [q0]: !0,
          [M0]: !0,
          [D0]: !0,
        };
      Pn.ReducedMotionTypes = F0;
    });
    var bf = u((le) => {
      "use strict";
      Object.defineProperty(le, "__esModule", { value: !0 });
      le.IX2_VIEWPORT_WIDTH_CHANGED =
        le.IX2_TEST_FRAME_RENDERED =
        le.IX2_STOP_REQUESTED =
        le.IX2_SESSION_STOPPED =
        le.IX2_SESSION_STARTED =
        le.IX2_SESSION_INITIALIZED =
        le.IX2_RAW_DATA_IMPORTED =
        le.IX2_PREVIEW_REQUESTED =
        le.IX2_PLAYBACK_REQUESTED =
        le.IX2_PARAMETER_CHANGED =
        le.IX2_MEDIA_QUERIES_DEFINED =
        le.IX2_INSTANCE_STARTED =
        le.IX2_INSTANCE_REMOVED =
        le.IX2_INSTANCE_ADDED =
        le.IX2_EVENT_STATE_CHANGED =
        le.IX2_EVENT_LISTENER_ADDED =
        le.IX2_ELEMENT_STATE_CHANGED =
        le.IX2_CLEAR_REQUESTED =
        le.IX2_ANIMATION_FRAME_CHANGED =
        le.IX2_ACTION_LIST_PLAYBACK_CHANGED =
          void 0;
      var G0 = "IX2_RAW_DATA_IMPORTED";
      le.IX2_RAW_DATA_IMPORTED = G0;
      var X0 = "IX2_SESSION_INITIALIZED";
      le.IX2_SESSION_INITIALIZED = X0;
      var U0 = "IX2_SESSION_STARTED";
      le.IX2_SESSION_STARTED = U0;
      var V0 = "IX2_SESSION_STOPPED";
      le.IX2_SESSION_STOPPED = V0;
      var W0 = "IX2_PREVIEW_REQUESTED";
      le.IX2_PREVIEW_REQUESTED = W0;
      var B0 = "IX2_PLAYBACK_REQUESTED";
      le.IX2_PLAYBACK_REQUESTED = B0;
      var k0 = "IX2_STOP_REQUESTED";
      le.IX2_STOP_REQUESTED = k0;
      var H0 = "IX2_CLEAR_REQUESTED";
      le.IX2_CLEAR_REQUESTED = H0;
      var j0 = "IX2_EVENT_LISTENER_ADDED";
      le.IX2_EVENT_LISTENER_ADDED = j0;
      var K0 = "IX2_EVENT_STATE_CHANGED";
      le.IX2_EVENT_STATE_CHANGED = K0;
      var z0 = "IX2_ANIMATION_FRAME_CHANGED";
      le.IX2_ANIMATION_FRAME_CHANGED = z0;
      var Y0 = "IX2_PARAMETER_CHANGED";
      le.IX2_PARAMETER_CHANGED = Y0;
      var Q0 = "IX2_INSTANCE_ADDED";
      le.IX2_INSTANCE_ADDED = Q0;
      var $0 = "IX2_INSTANCE_STARTED";
      le.IX2_INSTANCE_STARTED = $0;
      var Z0 = "IX2_INSTANCE_REMOVED";
      le.IX2_INSTANCE_REMOVED = Z0;
      var J0 = "IX2_ELEMENT_STATE_CHANGED";
      le.IX2_ELEMENT_STATE_CHANGED = J0;
      var ew = "IX2_ACTION_LIST_PLAYBACK_CHANGED";
      le.IX2_ACTION_LIST_PLAYBACK_CHANGED = ew;
      var tw = "IX2_VIEWPORT_WIDTH_CHANGED";
      le.IX2_VIEWPORT_WIDTH_CHANGED = tw;
      var rw = "IX2_MEDIA_QUERIES_DEFINED";
      le.IX2_MEDIA_QUERIES_DEFINED = rw;
      var nw = "IX2_TEST_FRAME_RENDERED";
      le.IX2_TEST_FRAME_RENDERED = nw;
    });
    var Of = u((L) => {
      "use strict";
      Object.defineProperty(L, "__esModule", { value: !0 });
      L.W_MOD_JS =
        L.W_MOD_IX =
        L.WILL_CHANGE =
        L.WIDTH =
        L.WF_PAGE =
        L.TRANSLATE_Z =
        L.TRANSLATE_Y =
        L.TRANSLATE_X =
        L.TRANSLATE_3D =
        L.TRANSFORM =
        L.SKEW_Y =
        L.SKEW_X =
        L.SKEW =
        L.SIBLINGS =
        L.SCALE_Z =
        L.SCALE_Y =
        L.SCALE_X =
        L.SCALE_3D =
        L.ROTATE_Z =
        L.ROTATE_Y =
        L.ROTATE_X =
        L.RENDER_TRANSFORM =
        L.RENDER_STYLE =
        L.RENDER_PLUGIN =
        L.RENDER_GENERAL =
        L.PRESERVE_3D =
        L.PLAIN_OBJECT =
        L.PARENT =
        L.OPACITY =
        L.IX2_ID_DELIMITER =
        L.IMMEDIATE_CHILDREN =
        L.HTML_ELEMENT =
        L.HEIGHT =
        L.FONT_VARIATION_SETTINGS =
        L.FLEX =
        L.FILTER =
        L.DISPLAY =
        L.CONFIG_Z_VALUE =
        L.CONFIG_Z_UNIT =
        L.CONFIG_Y_VALUE =
        L.CONFIG_Y_UNIT =
        L.CONFIG_X_VALUE =
        L.CONFIG_X_UNIT =
        L.CONFIG_VALUE =
        L.CONFIG_UNIT =
        L.COMMA_DELIMITER =
        L.COLOR =
        L.COLON_DELIMITER =
        L.CHILDREN =
        L.BOUNDARY_SELECTOR =
        L.BORDER_COLOR =
        L.BAR_DELIMITER =
        L.BACKGROUND_COLOR =
        L.BACKGROUND =
        L.AUTO =
        L.ABSTRACT_NODE =
          void 0;
      var iw = "|";
      L.IX2_ID_DELIMITER = iw;
      var ow = "data-wf-page";
      L.WF_PAGE = ow;
      var aw = "w-mod-js";
      L.W_MOD_JS = aw;
      var sw = "w-mod-ix";
      L.W_MOD_IX = sw;
      var uw = ".w-dyn-item";
      L.BOUNDARY_SELECTOR = uw;
      var cw = "xValue";
      L.CONFIG_X_VALUE = cw;
      var lw = "yValue";
      L.CONFIG_Y_VALUE = lw;
      var fw = "zValue";
      L.CONFIG_Z_VALUE = fw;
      var dw = "value";
      L.CONFIG_VALUE = dw;
      var pw = "xUnit";
      L.CONFIG_X_UNIT = pw;
      var vw = "yUnit";
      L.CONFIG_Y_UNIT = vw;
      var hw = "zUnit";
      L.CONFIG_Z_UNIT = hw;
      var gw = "unit";
      L.CONFIG_UNIT = gw;
      var Ew = "transform";
      L.TRANSFORM = Ew;
      var _w = "translateX";
      L.TRANSLATE_X = _w;
      var yw = "translateY";
      L.TRANSLATE_Y = yw;
      var mw = "translateZ";
      L.TRANSLATE_Z = mw;
      var Iw = "translate3d";
      L.TRANSLATE_3D = Iw;
      var Tw = "scaleX";
      L.SCALE_X = Tw;
      var bw = "scaleY";
      L.SCALE_Y = bw;
      var Ow = "scaleZ";
      L.SCALE_Z = Ow;
      var ww = "scale3d";
      L.SCALE_3D = ww;
      var Sw = "rotateX";
      L.ROTATE_X = Sw;
      var Aw = "rotateY";
      L.ROTATE_Y = Aw;
      var Rw = "rotateZ";
      L.ROTATE_Z = Rw;
      var xw = "skew";
      L.SKEW = xw;
      var Cw = "skewX";
      L.SKEW_X = Cw;
      var Nw = "skewY";
      L.SKEW_Y = Nw;
      var Pw = "opacity";
      L.OPACITY = Pw;
      var Lw = "filter";
      L.FILTER = Lw;
      var qw = "font-variation-settings";
      L.FONT_VARIATION_SETTINGS = qw;
      var Mw = "width";
      L.WIDTH = Mw;
      var Dw = "height";
      L.HEIGHT = Dw;
      var Fw = "backgroundColor";
      L.BACKGROUND_COLOR = Fw;
      var Gw = "background";
      L.BACKGROUND = Gw;
      var Xw = "borderColor";
      L.BORDER_COLOR = Xw;
      var Uw = "color";
      L.COLOR = Uw;
      var Vw = "display";
      L.DISPLAY = Vw;
      var Ww = "flex";
      L.FLEX = Ww;
      var Bw = "willChange";
      L.WILL_CHANGE = Bw;
      var kw = "AUTO";
      L.AUTO = kw;
      var Hw = ",";
      L.COMMA_DELIMITER = Hw;
      var jw = ":";
      L.COLON_DELIMITER = jw;
      var Kw = "|";
      L.BAR_DELIMITER = Kw;
      var zw = "CHILDREN";
      L.CHILDREN = zw;
      var Yw = "IMMEDIATE_CHILDREN";
      L.IMMEDIATE_CHILDREN = Yw;
      var Qw = "SIBLINGS";
      L.SIBLINGS = Qw;
      var $w = "PARENT";
      L.PARENT = $w;
      var Zw = "preserve-3d";
      L.PRESERVE_3D = Zw;
      var Jw = "HTML_ELEMENT";
      L.HTML_ELEMENT = Jw;
      var eS = "PLAIN_OBJECT";
      L.PLAIN_OBJECT = eS;
      var tS = "ABSTRACT_NODE";
      L.ABSTRACT_NODE = tS;
      var rS = "RENDER_TRANSFORM";
      L.RENDER_TRANSFORM = rS;
      var nS = "RENDER_GENERAL";
      L.RENDER_GENERAL = nS;
      var iS = "RENDER_STYLE";
      L.RENDER_STYLE = iS;
      var oS = "RENDER_PLUGIN";
      L.RENDER_PLUGIN = oS;
    });
    var je = u((Re) => {
      "use strict";
      var wf = Gt().default;
      Object.defineProperty(Re, "__esModule", { value: !0 });
      var Ln = { IX2EngineActionTypes: !0, IX2EngineConstants: !0 };
      Re.IX2EngineConstants = Re.IX2EngineActionTypes = void 0;
      var ra = mf();
      Object.keys(ra).forEach(function (e) {
        e === "default" ||
          e === "__esModule" ||
          Object.prototype.hasOwnProperty.call(Ln, e) ||
          (e in Re && Re[e] === ra[e]) ||
          Object.defineProperty(Re, e, {
            enumerable: !0,
            get: function () {
              return ra[e];
            },
          });
      });
      var na = ta();
      Object.keys(na).forEach(function (e) {
        e === "default" ||
          e === "__esModule" ||
          Object.prototype.hasOwnProperty.call(Ln, e) ||
          (e in Re && Re[e] === na[e]) ||
          Object.defineProperty(Re, e, {
            enumerable: !0,
            get: function () {
              return na[e];
            },
          });
      });
      var ia = If();
      Object.keys(ia).forEach(function (e) {
        e === "default" ||
          e === "__esModule" ||
          Object.prototype.hasOwnProperty.call(Ln, e) ||
          (e in Re && Re[e] === ia[e]) ||
          Object.defineProperty(Re, e, {
            enumerable: !0,
            get: function () {
              return ia[e];
            },
          });
      });
      var oa = Tf();
      Object.keys(oa).forEach(function (e) {
        e === "default" ||
          e === "__esModule" ||
          Object.prototype.hasOwnProperty.call(Ln, e) ||
          (e in Re && Re[e] === oa[e]) ||
          Object.defineProperty(Re, e, {
            enumerable: !0,
            get: function () {
              return oa[e];
            },
          });
      });
      var aS = wf(bf());
      Re.IX2EngineActionTypes = aS;
      var sS = wf(Of());
      Re.IX2EngineConstants = sS;
    });
    var Sf = u((qn) => {
      "use strict";
      Object.defineProperty(qn, "__esModule", { value: !0 });
      qn.ixData = void 0;
      var uS = je(),
        { IX2_RAW_DATA_IMPORTED: cS } = uS.IX2EngineActionTypes,
        lS = (e = Object.freeze({}), t) => {
          switch (t.type) {
            case cS:
              return t.payload.ixData || Object.freeze({});
            default:
              return e;
          }
        };
      qn.ixData = lS;
    });
    var or = u((rH, Tt) => {
      function aa() {
        return (
          (Tt.exports = aa =
            Object.assign
              ? Object.assign.bind()
              : function (e) {
                  for (var t = 1; t < arguments.length; t++) {
                    var r = arguments[t];
                    for (var n in r)
                      Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
                  }
                  return e;
                }),
          (Tt.exports.__esModule = !0),
          (Tt.exports.default = Tt.exports),
          aa.apply(this, arguments)
        );
      }
      (Tt.exports = aa),
        (Tt.exports.__esModule = !0),
        (Tt.exports.default = Tt.exports);
    });
    var ar = u((Oe) => {
      "use strict";
      Object.defineProperty(Oe, "__esModule", { value: !0 });
      var fS =
        typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e &&
                typeof Symbol == "function" &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? "symbol"
                : typeof e;
            };
      Oe.clone = Dn;
      Oe.addLast = xf;
      Oe.addFirst = Cf;
      Oe.removeLast = Nf;
      Oe.removeFirst = Pf;
      Oe.insert = Lf;
      Oe.removeAt = qf;
      Oe.replaceAt = Mf;
      Oe.getIn = Fn;
      Oe.set = Gn;
      Oe.setIn = Xn;
      Oe.update = Ff;
      Oe.updateIn = Gf;
      Oe.merge = Xf;
      Oe.mergeDeep = Uf;
      Oe.mergeIn = Vf;
      Oe.omit = Wf;
      Oe.addDefaults = Bf;
      var Af = "INVALID_ARGS";
      function Rf(e) {
        throw new Error(e);
      }
      function sa(e) {
        var t = Object.keys(e);
        return Object.getOwnPropertySymbols
          ? t.concat(Object.getOwnPropertySymbols(e))
          : t;
      }
      var dS = {}.hasOwnProperty;
      function Dn(e) {
        if (Array.isArray(e)) return e.slice();
        for (var t = sa(e), r = {}, n = 0; n < t.length; n++) {
          var o = t[n];
          r[o] = e[o];
        }
        return r;
      }
      function Ke(e, t, r) {
        var n = r;
        n == null && Rf(Af);
        for (
          var o = !1, i = arguments.length, a = Array(i > 3 ? i - 3 : 0), s = 3;
          s < i;
          s++
        )
          a[s - 3] = arguments[s];
        for (var c = 0; c < a.length; c++) {
          var p = a[c];
          if (p != null) {
            var E = sa(p);
            if (E.length)
              for (var f = 0; f <= E.length; f++) {
                var I = E[f];
                if (!(e && n[I] !== void 0)) {
                  var _ = p[I];
                  t && Mn(n[I]) && Mn(_) && (_ = Ke(e, t, n[I], _)),
                    !(_ === void 0 || _ === n[I]) &&
                      (o || ((o = !0), (n = Dn(n))), (n[I] = _));
                }
              }
          }
        }
        return n;
      }
      function Mn(e) {
        var t = typeof e > "u" ? "undefined" : fS(e);
        return e != null && (t === "object" || t === "function");
      }
      function xf(e, t) {
        return Array.isArray(t) ? e.concat(t) : e.concat([t]);
      }
      function Cf(e, t) {
        return Array.isArray(t) ? t.concat(e) : [t].concat(e);
      }
      function Nf(e) {
        return e.length ? e.slice(0, e.length - 1) : e;
      }
      function Pf(e) {
        return e.length ? e.slice(1) : e;
      }
      function Lf(e, t, r) {
        return e
          .slice(0, t)
          .concat(Array.isArray(r) ? r : [r])
          .concat(e.slice(t));
      }
      function qf(e, t) {
        return t >= e.length || t < 0 ? e : e.slice(0, t).concat(e.slice(t + 1));
      }
      function Mf(e, t, r) {
        if (e[t] === r) return e;
        for (var n = e.length, o = Array(n), i = 0; i < n; i++) o[i] = e[i];
        return (o[t] = r), o;
      }
      function Fn(e, t) {
        if ((!Array.isArray(t) && Rf(Af), e != null)) {
          for (var r = e, n = 0; n < t.length; n++) {
            var o = t[n];
            if (((r = r?.[o]), r === void 0)) return r;
          }
          return r;
        }
      }
      function Gn(e, t, r) {
        var n = typeof t == "number" ? [] : {},
          o = e ?? n;
        if (o[t] === r) return o;
        var i = Dn(o);
        return (i[t] = r), i;
      }
      function Df(e, t, r, n) {
        var o = void 0,
          i = t[n];
        if (n === t.length - 1) o = r;
        else {
          var a =
            Mn(e) && Mn(e[i]) ? e[i] : typeof t[n + 1] == "number" ? [] : {};
          o = Df(a, t, r, n + 1);
        }
        return Gn(e, i, o);
      }
      function Xn(e, t, r) {
        return t.length ? Df(e, t, r, 0) : r;
      }
      function Ff(e, t, r) {
        var n = e?.[t],
          o = r(n);
        return Gn(e, t, o);
      }
      function Gf(e, t, r) {
        var n = Fn(e, t),
          o = r(n);
        return Xn(e, t, o);
      }
      function Xf(e, t, r, n, o, i) {
        for (
          var a = arguments.length, s = Array(a > 6 ? a - 6 : 0), c = 6;
          c < a;
          c++
        )
          s[c - 6] = arguments[c];
        return s.length
          ? Ke.call.apply(Ke, [null, !1, !1, e, t, r, n, o, i].concat(s))
          : Ke(!1, !1, e, t, r, n, o, i);
      }
      function Uf(e, t, r, n, o, i) {
        for (
          var a = arguments.length, s = Array(a > 6 ? a - 6 : 0), c = 6;
          c < a;
          c++
        )
          s[c - 6] = arguments[c];
        return s.length
          ? Ke.call.apply(Ke, [null, !1, !0, e, t, r, n, o, i].concat(s))
          : Ke(!1, !0, e, t, r, n, o, i);
      }
      function Vf(e, t, r, n, o, i, a) {
        var s = Fn(e, t);
        s == null && (s = {});
        for (
          var c = void 0,
            p = arguments.length,
            E = Array(p > 7 ? p - 7 : 0),
            f = 7;
          f < p;
          f++
        )
          E[f - 7] = arguments[f];
        return (
          E.length
            ? (c = Ke.call.apply(Ke, [null, !1, !1, s, r, n, o, i, a].concat(E)))
            : (c = Ke(!1, !1, s, r, n, o, i, a)),
          Xn(e, t, c)
        );
      }
      function Wf(e, t) {
        for (var r = Array.isArray(t) ? t : [t], n = !1, o = 0; o < r.length; o++)
          if (dS.call(e, r[o])) {
            n = !0;
            break;
          }
        if (!n) return e;
        for (var i = {}, a = sa(e), s = 0; s < a.length; s++) {
          var c = a[s];
          r.indexOf(c) >= 0 || (i[c] = e[c]);
        }
        return i;
      }
      function Bf(e, t, r, n, o, i) {
        for (
          var a = arguments.length, s = Array(a > 6 ? a - 6 : 0), c = 6;
          c < a;
          c++
        )
          s[c - 6] = arguments[c];
        return s.length
          ? Ke.call.apply(Ke, [null, !0, !1, e, t, r, n, o, i].concat(s))
          : Ke(!0, !1, e, t, r, n, o, i);
      }
      var pS = {
        clone: Dn,
        addLast: xf,
        addFirst: Cf,
        removeLast: Nf,
        removeFirst: Pf,
        insert: Lf,
        removeAt: qf,
        replaceAt: Mf,
        getIn: Fn,
        set: Gn,
        setIn: Xn,
        update: Ff,
        updateIn: Gf,
        merge: Xf,
        mergeDeep: Uf,
        mergeIn: Vf,
        omit: Wf,
        addDefaults: Bf,
      };
      Oe.default = pS;
    });
    var Hf = u((Un) => {
      "use strict";
      var vS = rt().default;
      Object.defineProperty(Un, "__esModule", { value: !0 });
      Un.ixRequest = void 0;
      var hS = vS(or()),
        gS = je(),
        ES = ar(),
        {
          IX2_PREVIEW_REQUESTED: _S,
          IX2_PLAYBACK_REQUESTED: yS,
          IX2_STOP_REQUESTED: mS,
          IX2_CLEAR_REQUESTED: IS,
        } = gS.IX2EngineActionTypes,
        TS = { preview: {}, playback: {}, stop: {}, clear: {} },
        kf = Object.create(null, {
          [_S]: { value: "preview" },
          [yS]: { value: "playback" },
          [mS]: { value: "stop" },
          [IS]: { value: "clear" },
        }),
        bS = (e = TS, t) => {
          if (t.type in kf) {
            let r = [kf[t.type]];
            return (0, ES.setIn)(e, [r], (0, hS.default)({}, t.payload));
          }
          return e;
        };
      Un.ixRequest = bS;
    });
    var Kf = u((Vn) => {
      "use strict";
      Object.defineProperty(Vn, "__esModule", { value: !0 });
      Vn.ixSession = void 0;
      var OS = je(),
        pt = ar(),
        {
          IX2_SESSION_INITIALIZED: wS,
          IX2_SESSION_STARTED: SS,
          IX2_TEST_FRAME_RENDERED: AS,
          IX2_SESSION_STOPPED: RS,
          IX2_EVENT_LISTENER_ADDED: xS,
          IX2_EVENT_STATE_CHANGED: CS,
          IX2_ANIMATION_FRAME_CHANGED: NS,
          IX2_ACTION_LIST_PLAYBACK_CHANGED: PS,
          IX2_VIEWPORT_WIDTH_CHANGED: LS,
          IX2_MEDIA_QUERIES_DEFINED: qS,
        } = OS.IX2EngineActionTypes,
        jf = {
          active: !1,
          tick: 0,
          eventListeners: [],
          eventState: {},
          playbackState: {},
          viewportWidth: 0,
          mediaQueryKey: null,
          hasBoundaryNodes: !1,
          hasDefinedMediaQueries: !1,
          reducedMotion: !1,
        },
        MS = 20,
        DS = (e = jf, t) => {
          switch (t.type) {
            case wS: {
              let { hasBoundaryNodes: r, reducedMotion: n } = t.payload;
              return (0, pt.merge)(e, { hasBoundaryNodes: r, reducedMotion: n });
            }
            case SS:
              return (0, pt.set)(e, "active", !0);
            case AS: {
              let {
                payload: { step: r = MS },
              } = t;
              return (0, pt.set)(e, "tick", e.tick + r);
            }
            case RS:
              return jf;
            case NS: {
              let {
                payload: { now: r },
              } = t;
              return (0, pt.set)(e, "tick", r);
            }
            case xS: {
              let r = (0, pt.addLast)(e.eventListeners, t.payload);
              return (0, pt.set)(e, "eventListeners", r);
            }
            case CS: {
              let { stateKey: r, newState: n } = t.payload;
              return (0, pt.setIn)(e, ["eventState", r], n);
            }
            case PS: {
              let { actionListId: r, isPlaying: n } = t.payload;
              return (0, pt.setIn)(e, ["playbackState", r], n);
            }
            case LS: {
              let { width: r, mediaQueries: n } = t.payload,
                o = n.length,
                i = null;
              for (let a = 0; a < o; a++) {
                let { key: s, min: c, max: p } = n[a];
                if (r >= c && r <= p) {
                  i = s;
                  break;
                }
              }
              return (0, pt.merge)(e, { viewportWidth: r, mediaQueryKey: i });
            }
            case qS:
              return (0, pt.set)(e, "hasDefinedMediaQueries", !0);
            default:
              return e;
          }
        };
      Vn.ixSession = DS;
    });
    var Yf = u((aH, zf) => {
      function FS() {
        (this.__data__ = []), (this.size = 0);
      }
      zf.exports = FS;
    });
    var Wn = u((sH, Qf) => {
      function GS(e, t) {
        return e === t || (e !== e && t !== t);
      }
      Qf.exports = GS;
    });
    var Xr = u((uH, $f) => {
      var XS = Wn();
      function US(e, t) {
        for (var r = e.length; r--; ) if (XS(e[r][0], t)) return r;
        return -1;
      }
      $f.exports = US;
    });
    var Jf = u((cH, Zf) => {
      var VS = Xr(),
        WS = Array.prototype,
        BS = WS.splice;
      function kS(e) {
        var t = this.__data__,
          r = VS(t, e);
        if (r < 0) return !1;
        var n = t.length - 1;
        return r == n ? t.pop() : BS.call(t, r, 1), --this.size, !0;
      }
      Zf.exports = kS;
    });
    var td = u((lH, ed) => {
      var HS = Xr();
      function jS(e) {
        var t = this.__data__,
          r = HS(t, e);
        return r < 0 ? void 0 : t[r][1];
      }
      ed.exports = jS;
    });
    var nd = u((fH, rd) => {
      var KS = Xr();
      function zS(e) {
        return KS(this.__data__, e) > -1;
      }
      rd.exports = zS;
    });
    var od = u((dH, id) => {
      var YS = Xr();
      function QS(e, t) {
        var r = this.__data__,
          n = YS(r, e);
        return n < 0 ? (++this.size, r.push([e, t])) : (r[n][1] = t), this;
      }
      id.exports = QS;
    });
    var Ur = u((pH, ad) => {
      var $S = Yf(),
        ZS = Jf(),
        JS = td(),
        eA = nd(),
        tA = od();
      function sr(e) {
        var t = -1,
          r = e == null ? 0 : e.length;
        for (this.clear(); ++t < r; ) {
          var n = e[t];
          this.set(n[0], n[1]);
        }
      }
      sr.prototype.clear = $S;
      sr.prototype.delete = ZS;
      sr.prototype.get = JS;
      sr.prototype.has = eA;
      sr.prototype.set = tA;
      ad.exports = sr;
    });
    var ud = u((vH, sd) => {
      var rA = Ur();
      function nA() {
        (this.__data__ = new rA()), (this.size = 0);
      }
      sd.exports = nA;
    });
    var ld = u((hH, cd) => {
      function iA(e) {
        var t = this.__data__,
          r = t.delete(e);
        return (this.size = t.size), r;
      }
      cd.exports = iA;
    });
    var dd = u((gH, fd) => {
      function oA(e) {
        return this.__data__.get(e);
      }
      fd.exports = oA;
    });
    var vd = u((EH, pd) => {
      function aA(e) {
        return this.__data__.has(e);
      }
      pd.exports = aA;
    });
    var vt = u((_H, hd) => {
      function sA(e) {
        var t = typeof e;
        return e != null && (t == "object" || t == "function");
      }
      hd.exports = sA;
    });
    var ua = u((yH, gd) => {
      var uA = Rt(),
        cA = vt(),
        lA = "[object AsyncFunction]",
        fA = "[object Function]",
        dA = "[object GeneratorFunction]",
        pA = "[object Proxy]";
      function vA(e) {
        if (!cA(e)) return !1;
        var t = uA(e);
        return t == fA || t == dA || t == lA || t == pA;
      }
      gd.exports = vA;
    });
    var _d = u((mH, Ed) => {
      var hA = ot(),
        gA = hA["__core-js_shared__"];
      Ed.exports = gA;
    });
    var Id = u((IH, md) => {
      var ca = _d(),
        yd = (function () {
          var e = /[^.]+$/.exec((ca && ca.keys && ca.keys.IE_PROTO) || "");
          return e ? "Symbol(src)_1." + e : "";
        })();
      function EA(e) {
        return !!yd && yd in e;
      }
      md.exports = EA;
    });
    var la = u((TH, Td) => {
      var _A = Function.prototype,
        yA = _A.toString;
      function mA(e) {
        if (e != null) {
          try {
            return yA.call(e);
          } catch {}
          try {
            return e + "";
          } catch {}
        }
        return "";
      }
      Td.exports = mA;
    });
    var Od = u((bH, bd) => {
      var IA = ua(),
        TA = Id(),
        bA = vt(),
        OA = la(),
        wA = /[\\^$.*+?()[\]{}|]/g,
        SA = /^\[object .+?Constructor\]$/,
        AA = Function.prototype,
        RA = Object.prototype,
        xA = AA.toString,
        CA = RA.hasOwnProperty,
        NA = RegExp(
          "^" +
            xA
              .call(CA)
              .replace(wA, "\\$&")
              .replace(
                /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
                "$1.*?"
              ) +
            "$"
        );
      function PA(e) {
        if (!bA(e) || TA(e)) return !1;
        var t = IA(e) ? NA : SA;
        return t.test(OA(e));
      }
      bd.exports = PA;
    });
    var Sd = u((OH, wd) => {
      function LA(e, t) {
        return e?.[t];
      }
      wd.exports = LA;
    });
    var xt = u((wH, Ad) => {
      var qA = Od(),
        MA = Sd();
      function DA(e, t) {
        var r = MA(e, t);
        return qA(r) ? r : void 0;
      }
      Ad.exports = DA;
    });
    var Bn = u((SH, Rd) => {
      var FA = xt(),
        GA = ot(),
        XA = FA(GA, "Map");
      Rd.exports = XA;
    });
    var Vr = u((AH, xd) => {
      var UA = xt(),
        VA = UA(Object, "create");
      xd.exports = VA;
    });
    var Pd = u((RH, Nd) => {
      var Cd = Vr();
      function WA() {
        (this.__data__ = Cd ? Cd(null) : {}), (this.size = 0);
      }
      Nd.exports = WA;
    });
    var qd = u((xH, Ld) => {
      function BA(e) {
        var t = this.has(e) && delete this.__data__[e];
        return (this.size -= t ? 1 : 0), t;
      }
      Ld.exports = BA;
    });
    var Dd = u((CH, Md) => {
      var kA = Vr(),
        HA = "__lodash_hash_undefined__",
        jA = Object.prototype,
        KA = jA.hasOwnProperty;
      function zA(e) {
        var t = this.__data__;
        if (kA) {
          var r = t[e];
          return r === HA ? void 0 : r;
        }
        return KA.call(t, e) ? t[e] : void 0;
      }
      Md.exports = zA;
    });
    var Gd = u((NH, Fd) => {
      var YA = Vr(),
        QA = Object.prototype,
        $A = QA.hasOwnProperty;
      function ZA(e) {
        var t = this.__data__;
        return YA ? t[e] !== void 0 : $A.call(t, e);
      }
      Fd.exports = ZA;
    });
    var Ud = u((PH, Xd) => {
      var JA = Vr(),
        eR = "__lodash_hash_undefined__";
      function tR(e, t) {
        var r = this.__data__;
        return (
          (this.size += this.has(e) ? 0 : 1),
          (r[e] = JA && t === void 0 ? eR : t),
          this
        );
      }
      Xd.exports = tR;
    });
    var Wd = u((LH, Vd) => {
      var rR = Pd(),
        nR = qd(),
        iR = Dd(),
        oR = Gd(),
        aR = Ud();
      function ur(e) {
        var t = -1,
          r = e == null ? 0 : e.length;
        for (this.clear(); ++t < r; ) {
          var n = e[t];
          this.set(n[0], n[1]);
        }
      }
      ur.prototype.clear = rR;
      ur.prototype.delete = nR;
      ur.prototype.get = iR;
      ur.prototype.has = oR;
      ur.prototype.set = aR;
      Vd.exports = ur;
    });
    var Hd = u((qH, kd) => {
      var Bd = Wd(),
        sR = Ur(),
        uR = Bn();
      function cR() {
        (this.size = 0),
          (this.__data__ = {
            hash: new Bd(),
            map: new (uR || sR)(),
            string: new Bd(),
          });
      }
      kd.exports = cR;
    });
    var Kd = u((MH, jd) => {
      function lR(e) {
        var t = typeof e;
        return t == "string" || t == "number" || t == "symbol" || t == "boolean"
          ? e !== "__proto__"
          : e === null;
      }
      jd.exports = lR;
    });
    var Wr = u((DH, zd) => {
      var fR = Kd();
      function dR(e, t) {
        var r = e.__data__;
        return fR(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
      }
      zd.exports = dR;
    });
    var Qd = u((FH, Yd) => {
      var pR = Wr();
      function vR(e) {
        var t = pR(this, e).delete(e);
        return (this.size -= t ? 1 : 0), t;
      }
      Yd.exports = vR;
    });
    var Zd = u((GH, $d) => {
      var hR = Wr();
      function gR(e) {
        return hR(this, e).get(e);
      }
      $d.exports = gR;
    });
    var ep = u((XH, Jd) => {
      var ER = Wr();
      function _R(e) {
        return ER(this, e).has(e);
      }
      Jd.exports = _R;
    });
    var rp = u((UH, tp) => {
      var yR = Wr();
      function mR(e, t) {
        var r = yR(this, e),
          n = r.size;
        return r.set(e, t), (this.size += r.size == n ? 0 : 1), this;
      }
      tp.exports = mR;
    });
    var kn = u((VH, np) => {
      var IR = Hd(),
        TR = Qd(),
        bR = Zd(),
        OR = ep(),
        wR = rp();
      function cr(e) {
        var t = -1,
          r = e == null ? 0 : e.length;
        for (this.clear(); ++t < r; ) {
          var n = e[t];
          this.set(n[0], n[1]);
        }
      }
      cr.prototype.clear = IR;
      cr.prototype.delete = TR;
      cr.prototype.get = bR;
      cr.prototype.has = OR;
      cr.prototype.set = wR;
      np.exports = cr;
    });
    var op = u((WH, ip) => {
      var SR = Ur(),
        AR = Bn(),
        RR = kn(),
        xR = 200;
      function CR(e, t) {
        var r = this.__data__;
        if (r instanceof SR) {
          var n = r.__data__;
          if (!AR || n.length < xR - 1)
            return n.push([e, t]), (this.size = ++r.size), this;
          r = this.__data__ = new RR(n);
        }
        return r.set(e, t), (this.size = r.size), this;
      }
      ip.exports = CR;
    });
    var fa = u((BH, ap) => {
      var NR = Ur(),
        PR = ud(),
        LR = ld(),
        qR = dd(),
        MR = vd(),
        DR = op();
      function lr(e) {
        var t = (this.__data__ = new NR(e));
        this.size = t.size;
      }
      lr.prototype.clear = PR;
      lr.prototype.delete = LR;
      lr.prototype.get = qR;
      lr.prototype.has = MR;
      lr.prototype.set = DR;
      ap.exports = lr;
    });
    var up = u((kH, sp) => {
      var FR = "__lodash_hash_undefined__";
      function GR(e) {
        return this.__data__.set(e, FR), this;
      }
      sp.exports = GR;
    });
    var lp = u((HH, cp) => {
      function XR(e) {
        return this.__data__.has(e);
      }
      cp.exports = XR;
    });
    var dp = u((jH, fp) => {
      var UR = kn(),
        VR = up(),
        WR = lp();
      function Hn(e) {
        var t = -1,
          r = e == null ? 0 : e.length;
        for (this.__data__ = new UR(); ++t < r; ) this.add(e[t]);
      }
      Hn.prototype.add = Hn.prototype.push = VR;
      Hn.prototype.has = WR;
      fp.exports = Hn;
    });
    var vp = u((KH, pp) => {
      function BR(e, t) {
        for (var r = -1, n = e == null ? 0 : e.length; ++r < n; )
          if (t(e[r], r, e)) return !0;
        return !1;
      }
      pp.exports = BR;
    });
    var gp = u((zH, hp) => {
      function kR(e, t) {
        return e.has(t);
      }
      hp.exports = kR;
    });
    var da = u((YH, Ep) => {
      var HR = dp(),
        jR = vp(),
        KR = gp(),
        zR = 1,
        YR = 2;
      function QR(e, t, r, n, o, i) {
        var a = r & zR,
          s = e.length,
          c = t.length;
        if (s != c && !(a && c > s)) return !1;
        var p = i.get(e),
          E = i.get(t);
        if (p && E) return p == t && E == e;
        var f = -1,
          I = !0,
          _ = r & YR ? new HR() : void 0;
        for (i.set(e, t), i.set(t, e); ++f < s; ) {
          var m = e[f],
            b = t[f];
          if (n) var N = a ? n(b, m, f, t, e, i) : n(m, b, f, e, t, i);
          if (N !== void 0) {
            if (N) continue;
            I = !1;
            break;
          }
          if (_) {
            if (
              !jR(t, function (x, P) {
                if (!KR(_, P) && (m === x || o(m, x, r, n, i))) return _.push(P);
              })
            ) {
              I = !1;
              break;
            }
          } else if (!(m === b || o(m, b, r, n, i))) {
            I = !1;
            break;
          }
        }
        return i.delete(e), i.delete(t), I;
      }
      Ep.exports = QR;
    });
    var yp = u((QH, _p) => {
      var $R = ot(),
        ZR = $R.Uint8Array;
      _p.exports = ZR;
    });
    var Ip = u(($H, mp) => {
      function JR(e) {
        var t = -1,
          r = Array(e.size);
        return (
          e.forEach(function (n, o) {
            r[++t] = [o, n];
          }),
          r
        );
      }
      mp.exports = JR;
    });
    var bp = u((ZH, Tp) => {
      function ex(e) {
        var t = -1,
          r = Array(e.size);
        return (
          e.forEach(function (n) {
            r[++t] = n;
          }),
          r
        );
      }
      Tp.exports = ex;
    });
    var Rp = u((JH, Ap) => {
      var Op = tr(),
        wp = yp(),
        tx = Wn(),
        rx = da(),
        nx = Ip(),
        ix = bp(),
        ox = 1,
        ax = 2,
        sx = "[object Boolean]",
        ux = "[object Date]",
        cx = "[object Error]",
        lx = "[object Map]",
        fx = "[object Number]",
        dx = "[object RegExp]",
        px = "[object Set]",
        vx = "[object String]",
        hx = "[object Symbol]",
        gx = "[object ArrayBuffer]",
        Ex = "[object DataView]",
        Sp = Op ? Op.prototype : void 0,
        pa = Sp ? Sp.valueOf : void 0;
      function _x(e, t, r, n, o, i, a) {
        switch (r) {
          case Ex:
            if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
              return !1;
            (e = e.buffer), (t = t.buffer);
          case gx:
            return !(e.byteLength != t.byteLength || !i(new wp(e), new wp(t)));
          case sx:
          case ux:
          case fx:
            return tx(+e, +t);
          case cx:
            return e.name == t.name && e.message == t.message;
          case dx:
          case vx:
            return e == t + "";
          case lx:
            var s = nx;
          case px:
            var c = n & ox;
            if ((s || (s = ix), e.size != t.size && !c)) return !1;
            var p = a.get(e);
            if (p) return p == t;
            (n |= ax), a.set(e, t);
            var E = rx(s(e), s(t), n, o, i, a);
            return a.delete(e), E;
          case hx:
            if (pa) return pa.call(e) == pa.call(t);
        }
        return !1;
      }
      Ap.exports = _x;
    });
    var jn = u((e5, xp) => {
      function yx(e, t) {
        for (var r = -1, n = t.length, o = e.length; ++r < n; ) e[o + r] = t[r];
        return e;
      }
      xp.exports = yx;
    });
    var qe = u((t5, Cp) => {
      var mx = Array.isArray;
      Cp.exports = mx;
    });
    var va = u((r5, Np) => {
      var Ix = jn(),
        Tx = qe();
      function bx(e, t, r) {
        var n = t(e);
        return Tx(e) ? n : Ix(n, r(e));
      }
      Np.exports = bx;
    });
    var Lp = u((n5, Pp) => {
      function Ox(e, t) {
        for (var r = -1, n = e == null ? 0 : e.length, o = 0, i = []; ++r < n; ) {
          var a = e[r];
          t(a, r, e) && (i[o++] = a);
        }
        return i;
      }
      Pp.exports = Ox;
    });
    var ha = u((i5, qp) => {
      function wx() {
        return [];
      }
      qp.exports = wx;
    });
    var ga = u((o5, Dp) => {
      var Sx = Lp(),
        Ax = ha(),
        Rx = Object.prototype,
        xx = Rx.propertyIsEnumerable,
        Mp = Object.getOwnPropertySymbols,
        Cx = Mp
          ? function (e) {
              return e == null
                ? []
                : ((e = Object(e)),
                  Sx(Mp(e), function (t) {
                    return xx.call(e, t);
                  }));
            }
          : Ax;
      Dp.exports = Cx;
    });
    var Gp = u((a5, Fp) => {
      function Nx(e, t) {
        for (var r = -1, n = Array(e); ++r < e; ) n[r] = t(r);
        return n;
      }
      Fp.exports = Nx;
    });
    var Up = u((s5, Xp) => {
      var Px = Rt(),
        Lx = It(),
        qx = "[object Arguments]";
      function Mx(e) {
        return Lx(e) && Px(e) == qx;
      }
      Xp.exports = Mx;
    });
    var Br = u((u5, Bp) => {
      var Vp = Up(),
        Dx = It(),
        Wp = Object.prototype,
        Fx = Wp.hasOwnProperty,
        Gx = Wp.propertyIsEnumerable,
        Xx = Vp(
          (function () {
            return arguments;
          })()
        )
          ? Vp
          : function (e) {
              return Dx(e) && Fx.call(e, "callee") && !Gx.call(e, "callee");
            };
      Bp.exports = Xx;
    });
    var Hp = u((c5, kp) => {
      function Ux() {
        return !1;
      }
      kp.exports = Ux;
    });
    var Kn = u((kr, fr) => {
      var Vx = ot(),
        Wx = Hp(),
        zp = typeof kr == "object" && kr && !kr.nodeType && kr,
        jp = zp && typeof fr == "object" && fr && !fr.nodeType && fr,
        Bx = jp && jp.exports === zp,
        Kp = Bx ? Vx.Buffer : void 0,
        kx = Kp ? Kp.isBuffer : void 0,
        Hx = kx || Wx;
      fr.exports = Hx;
    });
    var zn = u((l5, Yp) => {
      var jx = 9007199254740991,
        Kx = /^(?:0|[1-9]\d*)$/;
      function zx(e, t) {
        var r = typeof e;
        return (
          (t = t ?? jx),
          !!t &&
            (r == "number" || (r != "symbol" && Kx.test(e))) &&
            e > -1 &&
            e % 1 == 0 &&
            e < t
        );
      }
      Yp.exports = zx;
    });
    var Yn = u((f5, Qp) => {
      var Yx = 9007199254740991;
      function Qx(e) {
        return typeof e == "number" && e > -1 && e % 1 == 0 && e <= Yx;
      }
      Qp.exports = Qx;
    });
    var Zp = u((d5, $p) => {
      var $x = Rt(),
        Zx = Yn(),
        Jx = It(),
        eC = "[object Arguments]",
        tC = "[object Array]",
        rC = "[object Boolean]",
        nC = "[object Date]",
        iC = "[object Error]",
        oC = "[object Function]",
        aC = "[object Map]",
        sC = "[object Number]",
        uC = "[object Object]",
        cC = "[object RegExp]",
        lC = "[object Set]",
        fC = "[object String]",
        dC = "[object WeakMap]",
        pC = "[object ArrayBuffer]",
        vC = "[object DataView]",
        hC = "[object Float32Array]",
        gC = "[object Float64Array]",
        EC = "[object Int8Array]",
        _C = "[object Int16Array]",
        yC = "[object Int32Array]",
        mC = "[object Uint8Array]",
        IC = "[object Uint8ClampedArray]",
        TC = "[object Uint16Array]",
        bC = "[object Uint32Array]",
        Ie = {};
      Ie[hC] =
        Ie[gC] =
        Ie[EC] =
        Ie[_C] =
        Ie[yC] =
        Ie[mC] =
        Ie[IC] =
        Ie[TC] =
        Ie[bC] =
          !0;
      Ie[eC] =
        Ie[tC] =
        Ie[pC] =
        Ie[rC] =
        Ie[vC] =
        Ie[nC] =
        Ie[iC] =
        Ie[oC] =
        Ie[aC] =
        Ie[sC] =
        Ie[uC] =
        Ie[cC] =
        Ie[lC] =
        Ie[fC] =
        Ie[dC] =
          !1;
      function OC(e) {
        return Jx(e) && Zx(e.length) && !!Ie[$x(e)];
      }
      $p.exports = OC;
    });
    var ev = u((p5, Jp) => {
      function wC(e) {
        return function (t) {
          return e(t);
        };
      }
      Jp.exports = wC;
    });
    var rv = u((Hr, dr) => {
      var SC = Xo(),
        tv = typeof Hr == "object" && Hr && !Hr.nodeType && Hr,
        jr = tv && typeof dr == "object" && dr && !dr.nodeType && dr,
        AC = jr && jr.exports === tv,
        Ea = AC && SC.process,
        RC = (function () {
          try {
            var e = jr && jr.require && jr.require("util").types;
            return e || (Ea && Ea.binding && Ea.binding("util"));
          } catch {}
        })();
      dr.exports = RC;
    });
    var Qn = u((v5, ov) => {
      var xC = Zp(),
        CC = ev(),
        nv = rv(),
        iv = nv && nv.isTypedArray,
        NC = iv ? CC(iv) : xC;
      ov.exports = NC;
    });
    var _a = u((h5, av) => {
      var PC = Gp(),
        LC = Br(),
        qC = qe(),
        MC = Kn(),
        DC = zn(),
        FC = Qn(),
        GC = Object.prototype,
        XC = GC.hasOwnProperty;
      function UC(e, t) {
        var r = qC(e),
          n = !r && LC(e),
          o = !r && !n && MC(e),
          i = !r && !n && !o && FC(e),
          a = r || n || o || i,
          s = a ? PC(e.length, String) : [],
          c = s.length;
        for (var p in e)
          (t || XC.call(e, p)) &&
            !(
              a &&
              (p == "length" ||
                (o && (p == "offset" || p == "parent")) ||
                (i &&
                  (p == "buffer" || p == "byteLength" || p == "byteOffset")) ||
                DC(p, c))
            ) &&
            s.push(p);
        return s;
      }
      av.exports = UC;
    });
    var $n = u((g5, sv) => {
      var VC = Object.prototype;
      function WC(e) {
        var t = e && e.constructor,
          r = (typeof t == "function" && t.prototype) || VC;
        return e === r;
      }
      sv.exports = WC;
    });
    var cv = u((E5, uv) => {
      var BC = Uo(),
        kC = BC(Object.keys, Object);
      uv.exports = kC;
    });
    var Zn = u((_5, lv) => {
      var HC = $n(),
        jC = cv(),
        KC = Object.prototype,
        zC = KC.hasOwnProperty;
      function YC(e) {
        if (!HC(e)) return jC(e);
        var t = [];
        for (var r in Object(e)) zC.call(e, r) && r != "constructor" && t.push(r);
        return t;
      }
      lv.exports = YC;
    });
    var Wt = u((y5, fv) => {
      var QC = ua(),
        $C = Yn();
      function ZC(e) {
        return e != null && $C(e.length) && !QC(e);
      }
      fv.exports = ZC;
    });
    var Kr = u((m5, dv) => {
      var JC = _a(),
        eN = Zn(),
        tN = Wt();
      function rN(e) {
        return tN(e) ? JC(e) : eN(e);
      }
      dv.exports = rN;
    });
    var vv = u((I5, pv) => {
      var nN = va(),
        iN = ga(),
        oN = Kr();
      function aN(e) {
        return nN(e, oN, iN);
      }
      pv.exports = aN;
    });
    var Ev = u((T5, gv) => {
      var hv = vv(),
        sN = 1,
        uN = Object.prototype,
        cN = uN.hasOwnProperty;
      function lN(e, t, r, n, o, i) {
        var a = r & sN,
          s = hv(e),
          c = s.length,
          p = hv(t),
          E = p.length;
        if (c != E && !a) return !1;
        for (var f = c; f--; ) {
          var I = s[f];
          if (!(a ? I in t : cN.call(t, I))) return !1;
        }
        var _ = i.get(e),
          m = i.get(t);
        if (_ && m) return _ == t && m == e;
        var b = !0;
        i.set(e, t), i.set(t, e);
        for (var N = a; ++f < c; ) {
          I = s[f];
          var x = e[I],
            P = t[I];
          if (n) var A = a ? n(P, x, I, t, e, i) : n(x, P, I, e, t, i);
          if (!(A === void 0 ? x === P || o(x, P, r, n, i) : A)) {
            b = !1;
            break;
          }
          N || (N = I == "constructor");
        }
        if (b && !N) {
          var V = e.constructor,
            G = t.constructor;
          V != G &&
            "constructor" in e &&
            "constructor" in t &&
            !(
              typeof V == "function" &&
              V instanceof V &&
              typeof G == "function" &&
              G instanceof G
            ) &&
            (b = !1);
        }
        return i.delete(e), i.delete(t), b;
      }
      gv.exports = lN;
    });
    var yv = u((b5, _v) => {
      var fN = xt(),
        dN = ot(),
        pN = fN(dN, "DataView");
      _v.exports = pN;
    });
    var Iv = u((O5, mv) => {
      var vN = xt(),
        hN = ot(),
        gN = vN(hN, "Promise");
      mv.exports = gN;
    });
    var bv = u((w5, Tv) => {
      var EN = xt(),
        _N = ot(),
        yN = EN(_N, "Set");
      Tv.exports = yN;
    });
    var ya = u((S5, Ov) => {
      var mN = xt(),
        IN = ot(),
        TN = mN(IN, "WeakMap");
      Ov.exports = TN;
    });
    var Jn = u((A5, Nv) => {
      var ma = yv(),
        Ia = Bn(),
        Ta = Iv(),
        ba = bv(),
        Oa = ya(),
        Cv = Rt(),
        pr = la(),
        wv = "[object Map]",
        bN = "[object Object]",
        Sv = "[object Promise]",
        Av = "[object Set]",
        Rv = "[object WeakMap]",
        xv = "[object DataView]",
        ON = pr(ma),
        wN = pr(Ia),
        SN = pr(Ta),
        AN = pr(ba),
        RN = pr(Oa),
        Bt = Cv;
      ((ma && Bt(new ma(new ArrayBuffer(1))) != xv) ||
        (Ia && Bt(new Ia()) != wv) ||
        (Ta && Bt(Ta.resolve()) != Sv) ||
        (ba && Bt(new ba()) != Av) ||
        (Oa && Bt(new Oa()) != Rv)) &&
        (Bt = function (e) {
          var t = Cv(e),
            r = t == bN ? e.constructor : void 0,
            n = r ? pr(r) : "";
          if (n)
            switch (n) {
              case ON:
                return xv;
              case wN:
                return wv;
              case SN:
                return Sv;
              case AN:
                return Av;
              case RN:
                return Rv;
            }
          return t;
        });
      Nv.exports = Bt;
    });
    var Xv = u((R5, Gv) => {
      var wa = fa(),
        xN = da(),
        CN = Rp(),
        NN = Ev(),
        Pv = Jn(),
        Lv = qe(),
        qv = Kn(),
        PN = Qn(),
        LN = 1,
        Mv = "[object Arguments]",
        Dv = "[object Array]",
        ei = "[object Object]",
        qN = Object.prototype,
        Fv = qN.hasOwnProperty;
      function MN(e, t, r, n, o, i) {
        var a = Lv(e),
          s = Lv(t),
          c = a ? Dv : Pv(e),
          p = s ? Dv : Pv(t);
        (c = c == Mv ? ei : c), (p = p == Mv ? ei : p);
        var E = c == ei,
          f = p == ei,
          I = c == p;
        if (I && qv(e)) {
          if (!qv(t)) return !1;
          (a = !0), (E = !1);
        }
        if (I && !E)
          return (
            i || (i = new wa()),
            a || PN(e) ? xN(e, t, r, n, o, i) : CN(e, t, c, r, n, o, i)
          );
        if (!(r & LN)) {
          var _ = E && Fv.call(e, "__wrapped__"),
            m = f && Fv.call(t, "__wrapped__");
          if (_ || m) {
            var b = _ ? e.value() : e,
              N = m ? t.value() : t;
            return i || (i = new wa()), o(b, N, r, n, i);
          }
        }
        return I ? (i || (i = new wa()), NN(e, t, r, n, o, i)) : !1;
      }
      Gv.exports = MN;
    });
    var Sa = u((x5, Wv) => {
      var DN = Xv(),
        Uv = It();
      function Vv(e, t, r, n, o) {
        return e === t
          ? !0
          : e == null || t == null || (!Uv(e) && !Uv(t))
          ? e !== e && t !== t
          : DN(e, t, r, n, Vv, o);
      }
      Wv.exports = Vv;
    });
    var kv = u((C5, Bv) => {
      var FN = fa(),
        GN = Sa(),
        XN = 1,
        UN = 2;
      function VN(e, t, r, n) {
        var o = r.length,
          i = o,
          a = !n;
        if (e == null) return !i;
        for (e = Object(e); o--; ) {
          var s = r[o];
          if (a && s[2] ? s[1] !== e[s[0]] : !(s[0] in e)) return !1;
        }
        for (; ++o < i; ) {
          s = r[o];
          var c = s[0],
            p = e[c],
            E = s[1];
          if (a && s[2]) {
            if (p === void 0 && !(c in e)) return !1;
          } else {
            var f = new FN();
            if (n) var I = n(p, E, c, e, t, f);
            if (!(I === void 0 ? GN(E, p, XN | UN, n, f) : I)) return !1;
          }
        }
        return !0;
      }
      Bv.exports = VN;
    });
    var Aa = u((N5, Hv) => {
      var WN = vt();
      function BN(e) {
        return e === e && !WN(e);
      }
      Hv.exports = BN;
    });
    var Kv = u((P5, jv) => {
      var kN = Aa(),
        HN = Kr();
      function jN(e) {
        for (var t = HN(e), r = t.length; r--; ) {
          var n = t[r],
            o = e[n];
          t[r] = [n, o, kN(o)];
        }
        return t;
      }
      jv.exports = jN;
    });
    var Ra = u((L5, zv) => {
      function KN(e, t) {
        return function (r) {
          return r == null ? !1 : r[e] === t && (t !== void 0 || e in Object(r));
        };
      }
      zv.exports = KN;
    });
    var Qv = u((q5, Yv) => {
      var zN = kv(),
        YN = Kv(),
        QN = Ra();
      function $N(e) {
        var t = YN(e);
        return t.length == 1 && t[0][2]
          ? QN(t[0][0], t[0][1])
          : function (r) {
              return r === e || zN(r, e, t);
            };
      }
      Yv.exports = $N;
    });
    var zr = u((M5, $v) => {
      var ZN = Rt(),
        JN = It(),
        eP = "[object Symbol]";
      function tP(e) {
        return typeof e == "symbol" || (JN(e) && ZN(e) == eP);
      }
      $v.exports = tP;
    });
    var ti = u((D5, Zv) => {
      var rP = qe(),
        nP = zr(),
        iP = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
        oP = /^\w*$/;
      function aP(e, t) {
        if (rP(e)) return !1;
        var r = typeof e;
        return r == "number" ||
          r == "symbol" ||
          r == "boolean" ||
          e == null ||
          nP(e)
          ? !0
          : oP.test(e) || !iP.test(e) || (t != null && e in Object(t));
      }
      Zv.exports = aP;
    });
    var th = u((F5, eh) => {
      var Jv = kn(),
        sP = "Expected a function";
      function xa(e, t) {
        if (typeof e != "function" || (t != null && typeof t != "function"))
          throw new TypeError(sP);
        var r = function () {
          var n = arguments,
            o = t ? t.apply(this, n) : n[0],
            i = r.cache;
          if (i.has(o)) return i.get(o);
          var a = e.apply(this, n);
          return (r.cache = i.set(o, a) || i), a;
        };
        return (r.cache = new (xa.Cache || Jv)()), r;
      }
      xa.Cache = Jv;
      eh.exports = xa;
    });
    var nh = u((G5, rh) => {
      var uP = th(),
        cP = 500;
      function lP(e) {
        var t = uP(e, function (n) {
            return r.size === cP && r.clear(), n;
          }),
          r = t.cache;
        return t;
      }
      rh.exports = lP;
    });
    var oh = u((X5, ih) => {
      var fP = nh(),
        dP =
          /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
        pP = /\\(\\)?/g,
        vP = fP(function (e) {
          var t = [];
          return (
            e.charCodeAt(0) === 46 && t.push(""),
            e.replace(dP, function (r, n, o, i) {
              t.push(o ? i.replace(pP, "$1") : n || r);
            }),
            t
          );
        });
      ih.exports = vP;
    });
    var Ca = u((U5, ah) => {
      function hP(e, t) {
        for (var r = -1, n = e == null ? 0 : e.length, o = Array(n); ++r < n; )
          o[r] = t(e[r], r, e);
        return o;
      }
      ah.exports = hP;
    });
    var dh = u((V5, fh) => {
      var sh = tr(),
        gP = Ca(),
        EP = qe(),
        _P = zr(),
        yP = 1 / 0,
        uh = sh ? sh.prototype : void 0,
        ch = uh ? uh.toString : void 0;
      function lh(e) {
        if (typeof e == "string") return e;
        if (EP(e)) return gP(e, lh) + "";
        if (_P(e)) return ch ? ch.call(e) : "";
        var t = e + "";
        return t == "0" && 1 / e == -yP ? "-0" : t;
      }
      fh.exports = lh;
    });
    var vh = u((W5, ph) => {
      var mP = dh();
      function IP(e) {
        return e == null ? "" : mP(e);
      }
      ph.exports = IP;
    });
    var Yr = u((B5, hh) => {
      var TP = qe(),
        bP = ti(),
        OP = oh(),
        wP = vh();
      function SP(e, t) {
        return TP(e) ? e : bP(e, t) ? [e] : OP(wP(e));
      }
      hh.exports = SP;
    });
    var vr = u((k5, gh) => {
      var AP = zr(),
        RP = 1 / 0;
      function xP(e) {
        if (typeof e == "string" || AP(e)) return e;
        var t = e + "";
        return t == "0" && 1 / e == -RP ? "-0" : t;
      }
      gh.exports = xP;
    });
    var ri = u((H5, Eh) => {
      var CP = Yr(),
        NP = vr();
      function PP(e, t) {
        t = CP(t, e);
        for (var r = 0, n = t.length; e != null && r < n; ) e = e[NP(t[r++])];
        return r && r == n ? e : void 0;
      }
      Eh.exports = PP;
    });
    var ni = u((j5, _h) => {
      var LP = ri();
      function qP(e, t, r) {
        var n = e == null ? void 0 : LP(e, t);
        return n === void 0 ? r : n;
      }
      _h.exports = qP;
    });
    var mh = u((K5, yh) => {
      function MP(e, t) {
        return e != null && t in Object(e);
      }
      yh.exports = MP;
    });
    var Th = u((z5, Ih) => {
      var DP = Yr(),
        FP = Br(),
        GP = qe(),
        XP = zn(),
        UP = Yn(),
        VP = vr();
      function WP(e, t, r) {
        t = DP(t, e);
        for (var n = -1, o = t.length, i = !1; ++n < o; ) {
          var a = VP(t[n]);
          if (!(i = e != null && r(e, a))) break;
          e = e[a];
        }
        return i || ++n != o
          ? i
          : ((o = e == null ? 0 : e.length),
            !!o && UP(o) && XP(a, o) && (GP(e) || FP(e)));
      }
      Ih.exports = WP;
    });
    var Oh = u((Y5, bh) => {
      var BP = mh(),
        kP = Th();
      function HP(e, t) {
        return e != null && kP(e, t, BP);
      }
      bh.exports = HP;
    });
    var Sh = u((Q5, wh) => {
      var jP = Sa(),
        KP = ni(),
        zP = Oh(),
        YP = ti(),
        QP = Aa(),
        $P = Ra(),
        ZP = vr(),
        JP = 1,
        eL = 2;
      function tL(e, t) {
        return YP(e) && QP(t)
          ? $P(ZP(e), t)
          : function (r) {
              var n = KP(r, e);
              return n === void 0 && n === t ? zP(r, e) : jP(t, n, JP | eL);
            };
      }
      wh.exports = tL;
    });
    var ii = u(($5, Ah) => {
      function rL(e) {
        return e;
      }
      Ah.exports = rL;
    });
    var Na = u((Z5, Rh) => {
      function nL(e) {
        return function (t) {
          return t?.[e];
        };
      }
      Rh.exports = nL;
    });
    var Ch = u((J5, xh) => {
      var iL = ri();
      function oL(e) {
        return function (t) {
          return iL(t, e);
        };
      }
      xh.exports = oL;
    });
    var Ph = u((ej, Nh) => {
      var aL = Na(),
        sL = Ch(),
        uL = ti(),
        cL = vr();
      function lL(e) {
        return uL(e) ? aL(cL(e)) : sL(e);
      }
      Nh.exports = lL;
    });
    var Ct = u((tj, Lh) => {
      var fL = Qv(),
        dL = Sh(),
        pL = ii(),
        vL = qe(),
        hL = Ph();
      function gL(e) {
        return typeof e == "function"
          ? e
          : e == null
          ? pL
          : typeof e == "object"
          ? vL(e)
            ? dL(e[0], e[1])
            : fL(e)
          : hL(e);
      }
      Lh.exports = gL;
    });
    var Pa = u((rj, qh) => {
      var EL = Ct(),
        _L = Wt(),
        yL = Kr();
      function mL(e) {
        return function (t, r, n) {
          var o = Object(t);
          if (!_L(t)) {
            var i = EL(r, 3);
            (t = yL(t)),
              (r = function (s) {
                return i(o[s], s, o);
              });
          }
          var a = e(t, r, n);
          return a > -1 ? o[i ? t[a] : a] : void 0;
        };
      }
      qh.exports = mL;
    });
    var La = u((nj, Mh) => {
      function IL(e, t, r, n) {
        for (var o = e.length, i = r + (n ? 1 : -1); n ? i-- : ++i < o; )
          if (t(e[i], i, e)) return i;
        return -1;
      }
      Mh.exports = IL;
    });
    var Fh = u((ij, Dh) => {
      var TL = /\s/;
      function bL(e) {
        for (var t = e.length; t-- && TL.test(e.charAt(t)); );
        return t;
      }
      Dh.exports = bL;
    });
    var Xh = u((oj, Gh) => {
      var OL = Fh(),
        wL = /^\s+/;
      function SL(e) {
        return e && e.slice(0, OL(e) + 1).replace(wL, "");
      }
      Gh.exports = SL;
    });
    var oi = u((aj, Wh) => {
      var AL = Xh(),
        Uh = vt(),
        RL = zr(),
        Vh = 0 / 0,
        xL = /^[-+]0x[0-9a-f]+$/i,
        CL = /^0b[01]+$/i,
        NL = /^0o[0-7]+$/i,
        PL = parseInt;
      function LL(e) {
        if (typeof e == "number") return e;
        if (RL(e)) return Vh;
        if (Uh(e)) {
          var t = typeof e.valueOf == "function" ? e.valueOf() : e;
          e = Uh(t) ? t + "" : t;
        }
        if (typeof e != "string") return e === 0 ? e : +e;
        e = AL(e);
        var r = CL.test(e);
        return r || NL.test(e) ? PL(e.slice(2), r ? 2 : 8) : xL.test(e) ? Vh : +e;
      }
      Wh.exports = LL;
    });
    var Hh = u((sj, kh) => {
      var qL = oi(),
        Bh = 1 / 0,
        ML = 17976931348623157e292;
      function DL(e) {
        if (!e) return e === 0 ? e : 0;
        if (((e = qL(e)), e === Bh || e === -Bh)) {
          var t = e < 0 ? -1 : 1;
          return t * ML;
        }
        return e === e ? e : 0;
      }
      kh.exports = DL;
    });
    var qa = u((uj, jh) => {
      var FL = Hh();
      function GL(e) {
        var t = FL(e),
          r = t % 1;
        return t === t ? (r ? t - r : t) : 0;
      }
      jh.exports = GL;
    });
    var zh = u((cj, Kh) => {
      var XL = La(),
        UL = Ct(),
        VL = qa(),
        WL = Math.max;
      function BL(e, t, r) {
        var n = e == null ? 0 : e.length;
        if (!n) return -1;
        var o = r == null ? 0 : VL(r);
        return o < 0 && (o = WL(n + o, 0)), XL(e, UL(t, 3), o);
      }
      Kh.exports = BL;
    });
    var Ma = u((lj, Yh) => {
      var kL = Pa(),
        HL = zh(),
        jL = kL(HL);
      Yh.exports = jL;
    });
    var si = u((We) => {
      "use strict";
      var KL = rt().default;
      Object.defineProperty(We, "__esModule", { value: !0 });
      We.withBrowser =
        We.TRANSFORM_STYLE_PREFIXED =
        We.TRANSFORM_PREFIXED =
        We.IS_BROWSER_ENV =
        We.FLEX_PREFIXED =
        We.ELEMENT_MATCHES =
          void 0;
      var zL = KL(Ma()),
        $h = typeof window < "u";
      We.IS_BROWSER_ENV = $h;
      var ai = (e, t) => ($h ? e() : t);
      We.withBrowser = ai;
      var YL = ai(() =>
        (0, zL.default)(
          [
            "matches",
            "matchesSelector",
            "mozMatchesSelector",
            "msMatchesSelector",
            "oMatchesSelector",
            "webkitMatchesSelector",
          ],
          (e) => e in Element.prototype
        )
      );
      We.ELEMENT_MATCHES = YL;
      var QL = ai(() => {
        let e = document.createElement("i"),
          t = ["flex", "-webkit-flex", "-ms-flexbox", "-moz-box", "-webkit-box"],
          r = "";
        try {
          let { length: n } = t;
          for (let o = 0; o < n; o++) {
            let i = t[o];
            if (((e.style.display = i), e.style.display === i)) return i;
          }
          return r;
        } catch {
          return r;
        }
      }, "flex");
      We.FLEX_PREFIXED = QL;
      var Zh = ai(() => {
        let e = document.createElement("i");
        if (e.style.transform == null) {
          let t = ["Webkit", "Moz", "ms"],
            r = "Transform",
            { length: n } = t;
          for (let o = 0; o < n; o++) {
            let i = t[o] + r;
            if (e.style[i] !== void 0) return i;
          }
        }
        return "transform";
      }, "transform");
      We.TRANSFORM_PREFIXED = Zh;
      var Qh = Zh.split("transform")[0],
        $L = Qh ? Qh + "TransformStyle" : "transformStyle";
      We.TRANSFORM_STYLE_PREFIXED = $L;
    });
    var Da = u((dj, ng) => {
      var ZL = 4,
        JL = 0.001,
        eq = 1e-7,
        tq = 10,
        Qr = 11,
        ui = 1 / (Qr - 1),
        rq = typeof Float32Array == "function";
      function Jh(e, t) {
        return 1 - 3 * t + 3 * e;
      }
      function eg(e, t) {
        return 3 * t - 6 * e;
      }
      function tg(e) {
        return 3 * e;
      }
      function ci(e, t, r) {
        return ((Jh(t, r) * e + eg(t, r)) * e + tg(t)) * e;
      }
      function rg(e, t, r) {
        return 3 * Jh(t, r) * e * e + 2 * eg(t, r) * e + tg(t);
      }
      function nq(e, t, r, n, o) {
        var i,
          a,
          s = 0;
        do
          (a = t + (r - t) / 2), (i = ci(a, n, o) - e), i > 0 ? (r = a) : (t = a);
        while (Math.abs(i) > eq && ++s < tq);
        return a;
      }
      function iq(e, t, r, n) {
        for (var o = 0; o < ZL; ++o) {
          var i = rg(t, r, n);
          if (i === 0) return t;
          var a = ci(t, r, n) - e;
          t -= a / i;
        }
        return t;
      }
      ng.exports = function (t, r, n, o) {
        if (!(0 <= t && t <= 1 && 0 <= n && n <= 1))
          throw new Error("bezier x values must be in [0, 1] range");
        var i = rq ? new Float32Array(Qr) : new Array(Qr);
        if (t !== r || n !== o)
          for (var a = 0; a < Qr; ++a) i[a] = ci(a * ui, t, n);
        function s(c) {
          for (var p = 0, E = 1, f = Qr - 1; E !== f && i[E] <= c; ++E) p += ui;
          --E;
          var I = (c - i[E]) / (i[E + 1] - i[E]),
            _ = p + I * ui,
            m = rg(_, t, n);
          return m >= JL ? iq(c, _, t, n) : m === 0 ? _ : nq(c, p, p + ui, t, n);
        }
        return function (p) {
          return t === r && n === o
            ? p
            : p === 0
            ? 0
            : p === 1
            ? 1
            : ci(s(p), r, o);
        };
      };
    });
    var Fa = u((ce) => {
      "use strict";
      var oq = rt().default;
      Object.defineProperty(ce, "__esModule", { value: !0 });
      ce.bounce = Vq;
      ce.bouncePast = Wq;
      ce.easeOut = ce.easeInOut = ce.easeIn = ce.ease = void 0;
      ce.inBack = Pq;
      ce.inCirc = Rq;
      ce.inCubic = pq;
      ce.inElastic = Mq;
      ce.inExpo = wq;
      ce.inOutBack = qq;
      ce.inOutCirc = Cq;
      ce.inOutCubic = hq;
      ce.inOutElastic = Fq;
      ce.inOutExpo = Aq;
      ce.inOutQuad = dq;
      ce.inOutQuart = _q;
      ce.inOutQuint = Iq;
      ce.inOutSine = Oq;
      ce.inQuad = lq;
      ce.inQuart = gq;
      ce.inQuint = yq;
      ce.inSine = Tq;
      ce.outBack = Lq;
      ce.outBounce = Nq;
      ce.outCirc = xq;
      ce.outCubic = vq;
      ce.outElastic = Dq;
      ce.outExpo = Sq;
      ce.outQuad = fq;
      ce.outQuart = Eq;
      ce.outQuint = mq;
      ce.outSine = bq;
      ce.swingFrom = Xq;
      ce.swingFromTo = Gq;
      ce.swingTo = Uq;
      var li = oq(Da()),
        bt = 1.70158,
        aq = (0, li.default)(0.25, 0.1, 0.25, 1);
      ce.ease = aq;
      var sq = (0, li.default)(0.42, 0, 1, 1);
      ce.easeIn = sq;
      var uq = (0, li.default)(0, 0, 0.58, 1);
      ce.easeOut = uq;
      var cq = (0, li.default)(0.42, 0, 0.58, 1);
      ce.easeInOut = cq;
      function lq(e) {
        return Math.pow(e, 2);
      }
      function fq(e) {
        return -(Math.pow(e - 1, 2) - 1);
      }
      function dq(e) {
        return (e /= 0.5) < 1 ? 0.5 * Math.pow(e, 2) : -0.5 * ((e -= 2) * e - 2);
      }
      function pq(e) {
        return Math.pow(e, 3);
      }
      function vq(e) {
        return Math.pow(e - 1, 3) + 1;
      }
      function hq(e) {
        return (e /= 0.5) < 1
          ? 0.5 * Math.pow(e, 3)
          : 0.5 * (Math.pow(e - 2, 3) + 2);
      }
      function gq(e) {
        return Math.pow(e, 4);
      }
      function Eq(e) {
        return -(Math.pow(e - 1, 4) - 1);
      }
      function _q(e) {
        return (e /= 0.5) < 1
          ? 0.5 * Math.pow(e, 4)
          : -0.5 * ((e -= 2) * Math.pow(e, 3) - 2);
      }
      function yq(e) {
        return Math.pow(e, 5);
      }
      function mq(e) {
        return Math.pow(e - 1, 5) + 1;
      }
      function Iq(e) {
        return (e /= 0.5) < 1
          ? 0.5 * Math.pow(e, 5)
          : 0.5 * (Math.pow(e - 2, 5) + 2);
      }
      function Tq(e) {
        return -Math.cos(e * (Math.PI / 2)) + 1;
      }
      function bq(e) {
        return Math.sin(e * (Math.PI / 2));
      }
      function Oq(e) {
        return -0.5 * (Math.cos(Math.PI * e) - 1);
      }
      function wq(e) {
        return e === 0 ? 0 : Math.pow(2, 10 * (e - 1));
      }
      function Sq(e) {
        return e === 1 ? 1 : -Math.pow(2, -10 * e) + 1;
      }
      function Aq(e) {
        return e === 0
          ? 0
          : e === 1
          ? 1
          : (e /= 0.5) < 1
          ? 0.5 * Math.pow(2, 10 * (e - 1))
          : 0.5 * (-Math.pow(2, -10 * --e) + 2);
      }
      function Rq(e) {
        return -(Math.sqrt(1 - e * e) - 1);
      }
      function xq(e) {
        return Math.sqrt(1 - Math.pow(e - 1, 2));
      }
      function Cq(e) {
        return (e /= 0.5) < 1
          ? -0.5 * (Math.sqrt(1 - e * e) - 1)
          : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1);
      }
      function Nq(e) {
        return e < 1 / 2.75
          ? 7.5625 * e * e
          : e < 2 / 2.75
          ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75
          : e < 2.5 / 2.75
          ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375
          : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
      }
      function Pq(e) {
        let t = bt;
        return e * e * ((t + 1) * e - t);
      }
      function Lq(e) {
        let t = bt;
        return (e -= 1) * e * ((t + 1) * e + t) + 1;
      }
      function qq(e) {
        let t = bt;
        return (e /= 0.5) < 1
          ? 0.5 * (e * e * (((t *= 1.525) + 1) * e - t))
          : 0.5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2);
      }
      function Mq(e) {
        let t = bt,
          r = 0,
          n = 1;
        return e === 0
          ? 0
          : e === 1
          ? 1
          : (r || (r = 0.3),
            n < 1
              ? ((n = 1), (t = r / 4))
              : (t = (r / (2 * Math.PI)) * Math.asin(1 / n)),
            -(
              n *
              Math.pow(2, 10 * (e -= 1)) *
              Math.sin(((e - t) * (2 * Math.PI)) / r)
            ));
      }
      function Dq(e) {
        let t = bt,
          r = 0,
          n = 1;
        return e === 0
          ? 0
          : e === 1
          ? 1
          : (r || (r = 0.3),
            n < 1
              ? ((n = 1), (t = r / 4))
              : (t = (r / (2 * Math.PI)) * Math.asin(1 / n)),
            n * Math.pow(2, -10 * e) * Math.sin(((e - t) * (2 * Math.PI)) / r) +
              1);
      }
      function Fq(e) {
        let t = bt,
          r = 0,
          n = 1;
        return e === 0
          ? 0
          : (e /= 1 / 2) === 2
          ? 1
          : (r || (r = 0.3 * 1.5),
            n < 1
              ? ((n = 1), (t = r / 4))
              : (t = (r / (2 * Math.PI)) * Math.asin(1 / n)),
            e < 1
              ? -0.5 *
                (n *
                  Math.pow(2, 10 * (e -= 1)) *
                  Math.sin(((e - t) * (2 * Math.PI)) / r))
              : n *
                  Math.pow(2, -10 * (e -= 1)) *
                  Math.sin(((e - t) * (2 * Math.PI)) / r) *
                  0.5 +
                1);
      }
      function Gq(e) {
        let t = bt;
        return (e /= 0.5) < 1
          ? 0.5 * (e * e * (((t *= 1.525) + 1) * e - t))
          : 0.5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2);
      }
      function Xq(e) {
        let t = bt;
        return e * e * ((t + 1) * e - t);
      }
      function Uq(e) {
        let t = bt;
        return (e -= 1) * e * ((t + 1) * e + t) + 1;
      }
      function Vq(e) {
        return e < 1 / 2.75
          ? 7.5625 * e * e
          : e < 2 / 2.75
          ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75
          : e < 2.5 / 2.75
          ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375
          : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
      }
      function Wq(e) {
        return e < 1 / 2.75
          ? 7.5625 * e * e
          : e < 2 / 2.75
          ? 2 - (7.5625 * (e -= 1.5 / 2.75) * e + 0.75)
          : e < 2.5 / 2.75
          ? 2 - (7.5625 * (e -= 2.25 / 2.75) * e + 0.9375)
          : 2 - (7.5625 * (e -= 2.625 / 2.75) * e + 0.984375);
      }
    });
    var Xa = u(($r) => {
      "use strict";
      var Bq = rt().default,
        kq = Gt().default;
      Object.defineProperty($r, "__esModule", { value: !0 });
      $r.applyEasing = Kq;
      $r.createBezierEasing = jq;
      $r.optimizeFloat = Ga;
      var ig = kq(Fa()),
        Hq = Bq(Da());
      function Ga(e, t = 5, r = 10) {
        let n = Math.pow(r, t),
          o = Number(Math.round(e * n) / n);
        return Math.abs(o) > 1e-4 ? o : 0;
      }
      function jq(e) {
        return (0, Hq.default)(...e);
      }
      function Kq(e, t, r) {
        return t === 0
          ? 0
          : t === 1
          ? 1
          : Ga(r ? (t > 0 ? r(t) : t) : t > 0 && e && ig[e] ? ig[e](t) : t);
      }
    });
    var ug = u((hr) => {
      "use strict";
      Object.defineProperty(hr, "__esModule", { value: !0 });
      hr.createElementState = sg;
      hr.ixElements = void 0;
      hr.mergeActionState = Ua;
      var fi = ar(),
        ag = je(),
        {
          HTML_ELEMENT: hj,
          PLAIN_OBJECT: zq,
          ABSTRACT_NODE: gj,
          CONFIG_X_VALUE: Yq,
          CONFIG_Y_VALUE: Qq,
          CONFIG_Z_VALUE: $q,
          CONFIG_VALUE: Zq,
          CONFIG_X_UNIT: Jq,
          CONFIG_Y_UNIT: eM,
          CONFIG_Z_UNIT: tM,
          CONFIG_UNIT: rM,
        } = ag.IX2EngineConstants,
        {
          IX2_SESSION_STOPPED: nM,
          IX2_INSTANCE_ADDED: iM,
          IX2_ELEMENT_STATE_CHANGED: oM,
        } = ag.IX2EngineActionTypes,
        og = {},
        aM = "refState",
        sM = (e = og, t = {}) => {
          switch (t.type) {
            case nM:
              return og;
            case iM: {
              let {
                  elementId: r,
                  element: n,
                  origin: o,
                  actionItem: i,
                  refType: a,
                } = t.payload,
                { actionTypeId: s } = i,
                c = e;
              return (
                (0, fi.getIn)(c, [r, n]) !== n && (c = sg(c, n, a, r, i)),
                Ua(c, r, s, o, i)
              );
            }
            case oM: {
              let {
                elementId: r,
                actionTypeId: n,
                current: o,
                actionItem: i,
              } = t.payload;
              return Ua(e, r, n, o, i);
            }
            default:
              return e;
          }
        };
      hr.ixElements = sM;
      function sg(e, t, r, n, o) {
        let i =
          r === zq ? (0, fi.getIn)(o, ["config", "target", "objectId"]) : null;
        return (0, fi.mergeIn)(e, [n], { id: n, ref: t, refId: i, refType: r });
      }
      function Ua(e, t, r, n, o) {
        let i = cM(o),
          a = [t, aM, r];
        return (0, fi.mergeIn)(e, a, n, i);
      }
      var uM = [
        [Yq, Jq],
        [Qq, eM],
        [$q, tM],
        [Zq, rM],
      ];
      function cM(e) {
        let { config: t } = e;
        return uM.reduce((r, n) => {
          let o = n[0],
            i = n[1],
            a = t[o],
            s = t[i];
          return a != null && s != null && (r[i] = s), r;
        }, {});
      }
    });
    var cg = u((Me) => {
      "use strict";
      Object.defineProperty(Me, "__esModule", { value: !0 });
      Me.renderPlugin =
        Me.getPluginOrigin =
        Me.getPluginDuration =
        Me.getPluginDestination =
        Me.getPluginConfig =
        Me.createPluginInstance =
        Me.clearPlugin =
          void 0;
      var lM = (e) => e.value;
      Me.getPluginConfig = lM;
      var fM = (e, t) => {
        if (t.config.duration !== "auto") return null;
        let r = parseFloat(e.getAttribute("data-duration"));
        return r > 0
          ? r * 1e3
          : parseFloat(e.getAttribute("data-default-duration")) * 1e3;
      };
      Me.getPluginDuration = fM;
      var dM = (e) => e || { value: 0 };
      Me.getPluginOrigin = dM;
      var pM = (e) => ({ value: e.value });
      Me.getPluginDestination = pM;
      var vM = (e) => {
        let t = window.Webflow.require("lottie").createInstance(e);
        return t.stop(), t.setSubframe(!0), t;
      };
      Me.createPluginInstance = vM;
      var hM = (e, t, r) => {
        if (!e) return;
        let n = t[r.actionTypeId].value / 100;
        e.goToFrame(e.frames * n);
      };
      Me.renderPlugin = hM;
      var gM = (e) => {
        window.Webflow.require("lottie").createInstance(e).stop();
      };
      Me.clearPlugin = gM;
    });
    var fg = u((De) => {
      "use strict";
      Object.defineProperty(De, "__esModule", { value: !0 });
      De.renderPlugin =
        De.getPluginOrigin =
        De.getPluginDuration =
        De.getPluginDestination =
        De.getPluginConfig =
        De.createPluginInstance =
        De.clearPlugin =
          void 0;
      var EM = (e) => document.querySelector(`[data-w-id="${e}"]`),
        _M = () => window.Webflow.require("spline"),
        yM = (e, t) => e.filter((r) => !t.includes(r)),
        mM = (e, t) => e.value[t];
      De.getPluginConfig = mM;
      var IM = () => null;
      De.getPluginDuration = IM;
      var lg = Object.freeze({
          positionX: 0,
          positionY: 0,
          positionZ: 0,
          rotationX: 0,
          rotationY: 0,
          rotationZ: 0,
          scaleX: 1,
          scaleY: 1,
          scaleZ: 1,
        }),
        TM = (e, t) => {
          let r = t.config.value,
            n = Object.keys(r);
          if (e) {
            let i = Object.keys(e),
              a = yM(n, i);
            return a.length ? a.reduce((c, p) => ((c[p] = lg[p]), c), e) : e;
          }
          return n.reduce((i, a) => ((i[a] = lg[a]), i), {});
        };
      De.getPluginOrigin = TM;
      var bM = (e) => e.value;
      De.getPluginDestination = bM;
      var OM = (e, t) => {
        var r, n;
        let o =
          t == null ||
          (r = t.config) === null ||
          r === void 0 ||
          (n = r.target) === null ||
          n === void 0
            ? void 0
            : n.pluginElement;
        return o ? EM(o) : null;
      };
      De.createPluginInstance = OM;
      var wM = (e, t, r) => {
        let n = _M().getInstance(e),
          o = r.config.target.objectId;
        if (!n || !o) return;
        let i = n.spline.findObjectById(o);
        if (!i) return;
        let { PLUGIN_SPLINE: a } = t;
        a.positionX != null && (i.position.x = a.positionX),
          a.positionY != null && (i.position.y = a.positionY),
          a.positionZ != null && (i.position.z = a.positionZ),
          a.rotationX != null && (i.rotation.x = a.rotationX),
          a.rotationY != null && (i.rotation.y = a.rotationY),
          a.rotationZ != null && (i.rotation.z = a.rotationZ),
          a.scaleX != null && (i.scale.x = a.scaleX),
          a.scaleY != null && (i.scale.y = a.scaleY),
          a.scaleZ != null && (i.scale.z = a.scaleZ);
      };
      De.renderPlugin = wM;
      var SM = () => null;
      De.clearPlugin = SM;
    });
    var pg = u((Ne) => {
      "use strict";
      Object.defineProperty(Ne, "__esModule", { value: !0 });
      Ne.getPluginOrigin =
        Ne.getPluginDuration =
        Ne.getPluginDestination =
        Ne.getPluginConfig =
        Ne.createPluginInstance =
        Ne.clearPlugin =
          void 0;
      Ne.normalizeColor = dg;
      Ne.renderPlugin = void 0;
      function dg(e) {
        let t,
          r,
          n,
          o = 1,
          i = e.replace(/\s/g, "").toLowerCase();
        if (i.startsWith("#")) {
          let a = i.substring(1);
          a.length === 3
            ? ((t = parseInt(a[0] + a[0], 16)),
              (r = parseInt(a[1] + a[1], 16)),
              (n = parseInt(a[2] + a[2], 16)))
            : a.length === 6 &&
              ((t = parseInt(a.substring(0, 2), 16)),
              (r = parseInt(a.substring(2, 4), 16)),
              (n = parseInt(a.substring(4, 6), 16)));
        } else if (i.startsWith("rgba")) {
          let a = i.match(/rgba\(([^)]+)\)/)[1].split(",");
          (t = parseInt(a[0], 10)),
            (r = parseInt(a[1], 10)),
            (n = parseInt(a[2], 10)),
            (o = parseFloat(a[3]));
        } else if (i.startsWith("rgb")) {
          let a = i.match(/rgb\(([^)]+)\)/)[1].split(",");
          (t = parseInt(a[0], 10)),
            (r = parseInt(a[1], 10)),
            (n = parseInt(a[2], 10));
        } else if (i.startsWith("hsla")) {
          let a = i.match(/hsla\(([^)]+)\)/)[1].split(","),
            s = parseFloat(a[0]),
            c = parseFloat(a[1].replace("%", "")) / 100,
            p = parseFloat(a[2].replace("%", "")) / 100;
          o = parseFloat(a[3]);
          let E = (1 - Math.abs(2 * p - 1)) * c,
            f = E * (1 - Math.abs(((s / 60) % 2) - 1)),
            I = p - E / 2,
            _,
            m,
            b;
          s >= 0 && s < 60
            ? ((_ = E), (m = f), (b = 0))
            : s >= 60 && s < 120
            ? ((_ = f), (m = E), (b = 0))
            : s >= 120 && s < 180
            ? ((_ = 0), (m = E), (b = f))
            : s >= 180 && s < 240
            ? ((_ = 0), (m = f), (b = E))
            : s >= 240 && s < 300
            ? ((_ = f), (m = 0), (b = E))
            : ((_ = E), (m = 0), (b = f)),
            (t = Math.round((_ + I) * 255)),
            (r = Math.round((m + I) * 255)),
            (n = Math.round((b + I) * 255));
        } else if (i.startsWith("hsl")) {
          let a = i.match(/hsl\(([^)]+)\)/)[1].split(","),
            s = parseFloat(a[0]),
            c = parseFloat(a[1].replace("%", "")) / 100,
            p = parseFloat(a[2].replace("%", "")) / 100,
            E = (1 - Math.abs(2 * p - 1)) * c,
            f = E * (1 - Math.abs(((s / 60) % 2) - 1)),
            I = p - E / 2,
            _,
            m,
            b;
          s >= 0 && s < 60
            ? ((_ = E), (m = f), (b = 0))
            : s >= 60 && s < 120
            ? ((_ = f), (m = E), (b = 0))
            : s >= 120 && s < 180
            ? ((_ = 0), (m = E), (b = f))
            : s >= 180 && s < 240
            ? ((_ = 0), (m = f), (b = E))
            : s >= 240 && s < 300
            ? ((_ = f), (m = 0), (b = E))
            : ((_ = E), (m = 0), (b = f)),
            (t = Math.round((_ + I) * 255)),
            (r = Math.round((m + I) * 255)),
            (n = Math.round((b + I) * 255));
        }
        return (
          (Number.isNaN(t) || Number.isNaN(r) || Number.isNaN(n)) && `${e}`,
          { red: t, green: r, blue: n, alpha: o }
        );
      }
      var AM = (e, t) => e.value[t];
      Ne.getPluginConfig = AM;
      var RM = () => null;
      Ne.getPluginDuration = RM;
      var xM = (e, t) => {
        if (e) return e;
        let r = t.config.value,
          n = t.config.target.objectId,
          o = getComputedStyle(document.documentElement).getPropertyValue(n);
        if (r.size != null) return { size: parseInt(o, 10) };
        if (r.red != null && r.green != null && r.blue != null) return dg(o);
      };
      Ne.getPluginOrigin = xM;
      var CM = (e) => e.value;
      Ne.getPluginDestination = CM;
      var NM = () => null;
      Ne.createPluginInstance = NM;
      var PM = (e, t, r) => {
        let n = r.config.target.objectId,
          o = r.config.value.unit,
          { PLUGIN_VARIABLE: i } = t,
          { size: a, red: s, green: c, blue: p, alpha: E } = i,
          f;
        a != null && (f = a + o),
          s != null &&
            p != null &&
            c != null &&
            E != null &&
            (f = `rgba(${s}, ${c}, ${p}, ${E})`),
          f != null && document.documentElement.style.setProperty(n, f);
      };
      Ne.renderPlugin = PM;
      var LM = (e, t) => {
        let r = t.config.target.objectId;
        document.documentElement.style.removeProperty(r);
      };
      Ne.clearPlugin = LM;
    });
    var vg = u((di) => {
      "use strict";
      var Ba = Gt().default,
        qM = rt().default;
      Object.defineProperty(di, "__esModule", { value: !0 });
      di.pluginMethodMap = void 0;
      var Va = qM(or()),
        Wa = je(),
        MM = Ba(cg()),
        DM = Ba(fg()),
        FM = Ba(pg()),
        GM = new Map([
          [Wa.ActionTypeConsts.PLUGIN_LOTTIE, (0, Va.default)({}, MM)],
          [Wa.ActionTypeConsts.PLUGIN_SPLINE, (0, Va.default)({}, DM)],
          [Wa.ActionTypeConsts.PLUGIN_VARIABLE, (0, Va.default)({}, FM)],
        ]);
      di.pluginMethodMap = GM;
    });
    var ka = u((Pe) => {
      "use strict";
      Object.defineProperty(Pe, "__esModule", { value: !0 });
      Pe.getPluginOrigin =
        Pe.getPluginDuration =
        Pe.getPluginDestination =
        Pe.getPluginConfig =
        Pe.createPluginInstance =
        Pe.clearPlugin =
          void 0;
      Pe.isPluginType = UM;
      Pe.renderPlugin = void 0;
      var XM = si(),
        hg = vg();
      function UM(e) {
        return hg.pluginMethodMap.has(e);
      }
      var kt = (e) => (t) => {
          if (!XM.IS_BROWSER_ENV) return () => null;
          let r = hg.pluginMethodMap.get(t);
          if (!r) throw new Error(`IX2 no plugin configured for: ${t}`);
          let n = r[e];
          if (!n) throw new Error(`IX2 invalid plugin method: ${e}`);
          return n;
        },
        VM = kt("getPluginConfig");
      Pe.getPluginConfig = VM;
      var WM = kt("getPluginOrigin");
      Pe.getPluginOrigin = WM;
      var BM = kt("getPluginDuration");
      Pe.getPluginDuration = BM;
      var kM = kt("getPluginDestination");
      Pe.getPluginDestination = kM;
      var HM = kt("createPluginInstance");
      Pe.createPluginInstance = HM;
      var jM = kt("renderPlugin");
      Pe.renderPlugin = jM;
      var KM = kt("clearPlugin");
      Pe.clearPlugin = KM;
    });
    var Eg = u((bj, gg) => {
      function zM(e, t) {
        return e == null || e !== e ? t : e;
      }
      gg.exports = zM;
    });
    var yg = u((Oj, _g) => {
      function YM(e, t, r, n) {
        var o = -1,
          i = e == null ? 0 : e.length;
        for (n && i && (r = e[++o]); ++o < i; ) r = t(r, e[o], o, e);
        return r;
      }
      _g.exports = YM;
    });
    var Ig = u((wj, mg) => {
      function QM(e) {
        return function (t, r, n) {
          for (var o = -1, i = Object(t), a = n(t), s = a.length; s--; ) {
            var c = a[e ? s : ++o];
            if (r(i[c], c, i) === !1) break;
          }
          return t;
        };
      }
      mg.exports = QM;
    });
    var bg = u((Sj, Tg) => {
      var $M = Ig(),
        ZM = $M();
      Tg.exports = ZM;
    });
    var Ha = u((Aj, Og) => {
      var JM = bg(),
        eD = Kr();
      function tD(e, t) {
        return e && JM(e, t, eD);
      }
      Og.exports = tD;
    });
    var Sg = u((Rj, wg) => {
      var rD = Wt();
      function nD(e, t) {
        return function (r, n) {
          if (r == null) return r;
          if (!rD(r)) return e(r, n);
          for (
            var o = r.length, i = t ? o : -1, a = Object(r);
            (t ? i-- : ++i < o) && n(a[i], i, a) !== !1;
  
          );
          return r;
        };
      }
      wg.exports = nD;
    });
    var ja = u((xj, Ag) => {
      var iD = Ha(),
        oD = Sg(),
        aD = oD(iD);
      Ag.exports = aD;
    });
    var xg = u((Cj, Rg) => {
      function sD(e, t, r, n, o) {
        return (
          o(e, function (i, a, s) {
            r = n ? ((n = !1), i) : t(r, i, a, s);
          }),
          r
        );
      }
      Rg.exports = sD;
    });
    var Ng = u((Nj, Cg) => {
      var uD = yg(),
        cD = ja(),
        lD = Ct(),
        fD = xg(),
        dD = qe();
      function pD(e, t, r) {
        var n = dD(e) ? uD : fD,
          o = arguments.length < 3;
        return n(e, lD(t, 4), r, o, cD);
      }
      Cg.exports = pD;
    });
    var Lg = u((Pj, Pg) => {
      var vD = La(),
        hD = Ct(),
        gD = qa(),
        ED = Math.max,
        _D = Math.min;
      function yD(e, t, r) {
        var n = e == null ? 0 : e.length;
        if (!n) return -1;
        var o = n - 1;
        return (
          r !== void 0 &&
            ((o = gD(r)), (o = r < 0 ? ED(n + o, 0) : _D(o, n - 1))),
          vD(e, hD(t, 3), o, !0)
        );
      }
      Pg.exports = yD;
    });
    var Mg = u((Lj, qg) => {
      var mD = Pa(),
        ID = Lg(),
        TD = mD(ID);
      qg.exports = TD;
    });
    var Fg = u((pi) => {
      "use strict";
      Object.defineProperty(pi, "__esModule", { value: !0 });
      pi.default = void 0;
      var bD = Object.prototype.hasOwnProperty;
      function Dg(e, t) {
        return e === t
          ? e !== 0 || t !== 0 || 1 / e === 1 / t
          : e !== e && t !== t;
      }
      function OD(e, t) {
        if (Dg(e, t)) return !0;
        if (
          typeof e != "object" ||
          e === null ||
          typeof t != "object" ||
          t === null
        )
          return !1;
        let r = Object.keys(e),
          n = Object.keys(t);
        if (r.length !== n.length) return !1;
        for (let o = 0; o < r.length; o++)
          if (!bD.call(t, r[o]) || !Dg(e[r[o]], t[r[o]])) return !1;
        return !0;
      }
      var wD = OD;
      pi.default = wD;
    });
    var rE = u((ye) => {
      "use strict";
      var Ei = rt().default;
      Object.defineProperty(ye, "__esModule", { value: !0 });
      ye.cleanupHTMLElement = b1;
      ye.clearAllStyles = T1;
      ye.clearObjectCache = BD;
      ye.getActionListProgress = w1;
      ye.getAffectedElements = Ja;
      ye.getComputedStyle = $D;
      ye.getDestinationValues = i1;
      ye.getElementId = KD;
      ye.getInstanceId = HD;
      ye.getInstanceOrigin = e1;
      ye.getItemConfigByKey = void 0;
      ye.getMaxDurationItemIndex = tE;
      ye.getNamespacedParameterId = R1;
      ye.getRenderType = Zg;
      ye.getStyleProp = o1;
      ye.mediaQueriesEqual = C1;
      ye.observeStore = QD;
      ye.reduceListToGroup = S1;
      ye.reifyState = zD;
      ye.renderHTMLElement = a1;
      Object.defineProperty(ye, "shallowEqual", {
        enumerable: !0,
        get: function () {
          return Hg.default;
        },
      });
      ye.shouldAllowMediaQuery = x1;
      ye.shouldNamespaceEventParameter = A1;
      ye.stringifyTarget = N1;
      var Nt = Ei(Eg()),
        Ya = Ei(Ng()),
        za = Ei(Mg()),
        Gg = ar(),
        Ht = je(),
        Hg = Ei(Fg()),
        SD = Xa(),
        Et = ka(),
        Be = si(),
        {
          BACKGROUND: AD,
          TRANSFORM: RD,
          TRANSLATE_3D: xD,
          SCALE_3D: CD,
          ROTATE_X: ND,
          ROTATE_Y: PD,
          ROTATE_Z: LD,
          SKEW: qD,
          PRESERVE_3D: MD,
          FLEX: DD,
          OPACITY: hi,
          FILTER: Zr,
          FONT_VARIATION_SETTINGS: Jr,
          WIDTH: ht,
          HEIGHT: gt,
          BACKGROUND_COLOR: jg,
          BORDER_COLOR: FD,
          COLOR: GD,
          CHILDREN: Xg,
          IMMEDIATE_CHILDREN: XD,
          SIBLINGS: Ug,
          PARENT: UD,
          DISPLAY: gi,
          WILL_CHANGE: gr,
          AUTO: Pt,
          COMMA_DELIMITER: en,
          COLON_DELIMITER: VD,
          BAR_DELIMITER: Ka,
          RENDER_TRANSFORM: Kg,
          RENDER_GENERAL: Qa,
          RENDER_STYLE: $a,
          RENDER_PLUGIN: zg,
        } = Ht.IX2EngineConstants,
        {
          TRANSFORM_MOVE: Er,
          TRANSFORM_SCALE: _r,
          TRANSFORM_ROTATE: yr,
          TRANSFORM_SKEW: tn,
          STYLE_OPACITY: Yg,
          STYLE_FILTER: rn,
          STYLE_FONT_VARIATION: nn,
          STYLE_SIZE: mr,
          STYLE_BACKGROUND_COLOR: Ir,
          STYLE_BORDER: Tr,
          STYLE_TEXT_COLOR: br,
          GENERAL_DISPLAY: _i,
          OBJECT_VALUE: WD,
        } = Ht.ActionTypeConsts,
        Qg = (e) => e.trim(),
        Za = Object.freeze({ [Ir]: jg, [Tr]: FD, [br]: GD }),
        $g = Object.freeze({
          [Be.TRANSFORM_PREFIXED]: RD,
          [jg]: AD,
          [hi]: hi,
          [Zr]: Zr,
          [ht]: ht,
          [gt]: gt,
          [Jr]: Jr,
        }),
        vi = new Map();
      function BD() {
        vi.clear();
      }
      var kD = 1;
      function HD() {
        return "i" + kD++;
      }
      var jD = 1;
      function KD(e, t) {
        for (let r in e) {
          let n = e[r];
          if (n && n.ref === t) return n.id;
        }
        return "e" + jD++;
      }
      function zD({ events: e, actionLists: t, site: r } = {}) {
        let n = (0, Ya.default)(
            e,
            (a, s) => {
              let { eventTypeId: c } = s;
              return a[c] || (a[c] = {}), (a[c][s.id] = s), a;
            },
            {}
          ),
          o = r && r.mediaQueries,
          i = [];
        return (
          o
            ? (i = o.map((a) => a.key))
            : ((o = []), console.warn("IX2 missing mediaQueries in site data")),
          {
            ixData: {
              events: e,
              actionLists: t,
              eventTypeMap: n,
              mediaQueries: o,
              mediaQueryKeys: i,
            },
          }
        );
      }
      var YD = (e, t) => e === t;
      function QD({ store: e, select: t, onChange: r, comparator: n = YD }) {
        let { getState: o, subscribe: i } = e,
          a = i(c),
          s = t(o());
        function c() {
          let p = t(o());
          if (p == null) {
            a();
            return;
          }
          n(p, s) || ((s = p), r(s, e));
        }
        return a;
      }
      function Vg(e) {
        let t = typeof e;
        if (t === "string") return { id: e };
        if (e != null && t === "object") {
          let {
            id: r,
            objectId: n,
            selector: o,
            selectorGuids: i,
            appliesTo: a,
            useEventTarget: s,
          } = e;
          return {
            id: r,
            objectId: n,
            selector: o,
            selectorGuids: i,
            appliesTo: a,
            useEventTarget: s,
          };
        }
        return {};
      }
      function Ja({
        config: e,
        event: t,
        eventTarget: r,
        elementRoot: n,
        elementApi: o,
      }) {
        var i, a, s;
        if (!o) throw new Error("IX2 missing elementApi");
        let { targets: c } = e;
        if (Array.isArray(c) && c.length > 0)
          return c.reduce(
            (F, X) =>
              F.concat(
                Ja({
                  config: { target: X },
                  event: t,
                  eventTarget: r,
                  elementRoot: n,
                  elementApi: o,
                })
              ),
            []
          );
        let {
            getValidDocument: p,
            getQuerySelector: E,
            queryDocument: f,
            getChildElements: I,
            getSiblingElements: _,
            matchSelector: m,
            elementContains: b,
            isSiblingNode: N,
          } = o,
          { target: x } = e;
        if (!x) return [];
        let {
          id: P,
          objectId: A,
          selector: V,
          selectorGuids: G,
          appliesTo: M,
          useEventTarget: H,
        } = Vg(x);
        if (A) return [vi.has(A) ? vi.get(A) : vi.set(A, {}).get(A)];
        if (M === Ht.EventAppliesTo.PAGE) {
          let F = p(P);
          return F ? [F] : [];
        }
        let J =
            ((i =
              t == null ||
              (a = t.action) === null ||
              a === void 0 ||
              (s = a.config) === null ||
              s === void 0
                ? void 0
                : s.affectedElements) !== null && i !== void 0
              ? i
              : {})[P || V] || {},
          se = !!(J.id || J.selector),
          ne,
          U,
          O,
          q = t && E(Vg(t.target));
        if (
          (se
            ? ((ne = J.limitAffectedElements), (U = q), (O = E(J)))
            : (U = O = E({ id: P, selector: V, selectorGuids: G })),
          t && H)
        ) {
          let F = r && (O || H === !0) ? [r] : f(q);
          if (O) {
            if (H === UD) return f(O).filter((X) => F.some((ee) => b(X, ee)));
            if (H === Xg) return f(O).filter((X) => F.some((ee) => b(ee, X)));
            if (H === Ug) return f(O).filter((X) => F.some((ee) => N(ee, X)));
          }
          return F;
        }
        return U == null || O == null
          ? []
          : Be.IS_BROWSER_ENV && n
          ? f(O).filter((F) => n.contains(F))
          : ne === Xg
          ? f(U, O)
          : ne === XD
          ? I(f(U)).filter(m(O))
          : ne === Ug
          ? _(f(U)).filter(m(O))
          : f(O);
      }
      function $D({ element: e, actionItem: t }) {
        if (!Be.IS_BROWSER_ENV) return {};
        let { actionTypeId: r } = t;
        switch (r) {
          case mr:
          case Ir:
          case Tr:
          case br:
          case _i:
            return window.getComputedStyle(e);
          default:
            return {};
        }
      }
      var Wg = /px/,
        ZD = (e, t) =>
          t.reduce(
            (r, n) => (r[n.type] == null && (r[n.type] = s1[n.type]), r),
            e || {}
          ),
        JD = (e, t) =>
          t.reduce(
            (r, n) => (
              r[n.type] == null &&
                (r[n.type] = u1[n.type] || n.defaultValue || 0),
              r
            ),
            e || {}
          );
      function e1(e, t = {}, r = {}, n, o) {
        let { getStyle: i } = o,
          { actionTypeId: a } = n;
        if ((0, Et.isPluginType)(a)) return (0, Et.getPluginOrigin)(a)(t[a], n);
        switch (n.actionTypeId) {
          case Er:
          case _r:
          case yr:
          case tn:
            return t[n.actionTypeId] || es[n.actionTypeId];
          case rn:
            return ZD(t[n.actionTypeId], n.config.filters);
          case nn:
            return JD(t[n.actionTypeId], n.config.fontVariations);
          case Yg:
            return { value: (0, Nt.default)(parseFloat(i(e, hi)), 1) };
          case mr: {
            let s = i(e, ht),
              c = i(e, gt),
              p,
              E;
            return (
              n.config.widthUnit === Pt
                ? (p = Wg.test(s) ? parseFloat(s) : parseFloat(r.width))
                : (p = (0, Nt.default)(parseFloat(s), parseFloat(r.width))),
              n.config.heightUnit === Pt
                ? (E = Wg.test(c) ? parseFloat(c) : parseFloat(r.height))
                : (E = (0, Nt.default)(parseFloat(c), parseFloat(r.height))),
              { widthValue: p, heightValue: E }
            );
          }
          case Ir:
          case Tr:
          case br:
            return y1({
              element: e,
              actionTypeId: n.actionTypeId,
              computedStyle: r,
              getStyle: i,
            });
          case _i:
            return { value: (0, Nt.default)(i(e, gi), r.display) };
          case WD:
            return t[n.actionTypeId] || { value: 0 };
          default:
            return;
        }
      }
      var t1 = (e, t) => (t && (e[t.type] = t.value || 0), e),
        r1 = (e, t) => (t && (e[t.type] = t.value || 0), e),
        n1 = (e, t, r) => {
          if ((0, Et.isPluginType)(e)) return (0, Et.getPluginConfig)(e)(r, t);
          switch (e) {
            case rn: {
              let n = (0, za.default)(r.filters, ({ type: o }) => o === t);
              return n ? n.value : 0;
            }
            case nn: {
              let n = (0, za.default)(r.fontVariations, ({ type: o }) => o === t);
              return n ? n.value : 0;
            }
            default:
              return r[t];
          }
        };
      ye.getItemConfigByKey = n1;
      function i1({ element: e, actionItem: t, elementApi: r }) {
        if ((0, Et.isPluginType)(t.actionTypeId))
          return (0, Et.getPluginDestination)(t.actionTypeId)(t.config);
        switch (t.actionTypeId) {
          case Er:
          case _r:
          case yr:
          case tn: {
            let { xValue: n, yValue: o, zValue: i } = t.config;
            return { xValue: n, yValue: o, zValue: i };
          }
          case mr: {
            let { getStyle: n, setStyle: o, getProperty: i } = r,
              { widthUnit: a, heightUnit: s } = t.config,
              { widthValue: c, heightValue: p } = t.config;
            if (!Be.IS_BROWSER_ENV) return { widthValue: c, heightValue: p };
            if (a === Pt) {
              let E = n(e, ht);
              o(e, ht, ""), (c = i(e, "offsetWidth")), o(e, ht, E);
            }
            if (s === Pt) {
              let E = n(e, gt);
              o(e, gt, ""), (p = i(e, "offsetHeight")), o(e, gt, E);
            }
            return { widthValue: c, heightValue: p };
          }
          case Ir:
          case Tr:
          case br: {
            let { rValue: n, gValue: o, bValue: i, aValue: a } = t.config;
            return { rValue: n, gValue: o, bValue: i, aValue: a };
          }
          case rn:
            return t.config.filters.reduce(t1, {});
          case nn:
            return t.config.fontVariations.reduce(r1, {});
          default: {
            let { value: n } = t.config;
            return { value: n };
          }
        }
      }
      function Zg(e) {
        if (/^TRANSFORM_/.test(e)) return Kg;
        if (/^STYLE_/.test(e)) return $a;
        if (/^GENERAL_/.test(e)) return Qa;
        if (/^PLUGIN_/.test(e)) return zg;
      }
      function o1(e, t) {
        return e === $a ? t.replace("STYLE_", "").toLowerCase() : null;
      }
      function a1(e, t, r, n, o, i, a, s, c) {
        switch (s) {
          case Kg:
            return f1(e, t, r, o, a);
          case $a:
            return m1(e, t, r, o, i, a);
          case Qa:
            return I1(e, o, a);
          case zg: {
            let { actionTypeId: p } = o;
            if ((0, Et.isPluginType)(p)) return (0, Et.renderPlugin)(p)(c, t, o);
          }
        }
      }
      var es = {
          [Er]: Object.freeze({ xValue: 0, yValue: 0, zValue: 0 }),
          [_r]: Object.freeze({ xValue: 1, yValue: 1, zValue: 1 }),
          [yr]: Object.freeze({ xValue: 0, yValue: 0, zValue: 0 }),
          [tn]: Object.freeze({ xValue: 0, yValue: 0 }),
        },
        s1 = Object.freeze({
          blur: 0,
          "hue-rotate": 0,
          invert: 0,
          grayscale: 0,
          saturate: 100,
          sepia: 0,
          contrast: 100,
          brightness: 100,
        }),
        u1 = Object.freeze({ wght: 0, opsz: 0, wdth: 0, slnt: 0 }),
        c1 = (e, t) => {
          let r = (0, za.default)(t.filters, ({ type: n }) => n === e);
          if (r && r.unit) return r.unit;
          switch (e) {
            case "blur":
              return "px";
            case "hue-rotate":
              return "deg";
            default:
              return "%";
          }
        },
        l1 = Object.keys(es);
      function f1(e, t, r, n, o) {
        let i = l1
            .map((s) => {
              let c = es[s],
                {
                  xValue: p = c.xValue,
                  yValue: E = c.yValue,
                  zValue: f = c.zValue,
                  xUnit: I = "",
                  yUnit: _ = "",
                  zUnit: m = "",
                } = t[s] || {};
              switch (s) {
                case Er:
                  return `${xD}(${p}${I}, ${E}${_}, ${f}${m})`;
                case _r:
                  return `${CD}(${p}${I}, ${E}${_}, ${f}${m})`;
                case yr:
                  return `${ND}(${p}${I}) ${PD}(${E}${_}) ${LD}(${f}${m})`;
                case tn:
                  return `${qD}(${p}${I}, ${E}${_})`;
                default:
                  return "";
              }
            })
            .join(" "),
          { setStyle: a } = o;
        jt(e, Be.TRANSFORM_PREFIXED, o),
          a(e, Be.TRANSFORM_PREFIXED, i),
          v1(n, r) && a(e, Be.TRANSFORM_STYLE_PREFIXED, MD);
      }
      function d1(e, t, r, n) {
        let o = (0, Ya.default)(t, (a, s, c) => `${a} ${c}(${s}${c1(c, r)})`, ""),
          { setStyle: i } = n;
        jt(e, Zr, n), i(e, Zr, o);
      }
      function p1(e, t, r, n) {
        let o = (0, Ya.default)(
            t,
            (a, s, c) => (a.push(`"${c}" ${s}`), a),
            []
          ).join(", "),
          { setStyle: i } = n;
        jt(e, Jr, n), i(e, Jr, o);
      }
      function v1({ actionTypeId: e }, { xValue: t, yValue: r, zValue: n }) {
        return (
          (e === Er && n !== void 0) ||
          (e === _r && n !== void 0) ||
          (e === yr && (t !== void 0 || r !== void 0))
        );
      }
      var h1 = "\\(([^)]+)\\)",
        g1 = /^rgb/,
        E1 = RegExp(`rgba?${h1}`);
      function _1(e, t) {
        let r = e.exec(t);
        return r ? r[1] : "";
      }
      function y1({
        element: e,
        actionTypeId: t,
        computedStyle: r,
        getStyle: n,
      }) {
        let o = Za[t],
          i = n(e, o),
          a = g1.test(i) ? i : r[o],
          s = _1(E1, a).split(en);
        return {
          rValue: (0, Nt.default)(parseInt(s[0], 10), 255),
          gValue: (0, Nt.default)(parseInt(s[1], 10), 255),
          bValue: (0, Nt.default)(parseInt(s[2], 10), 255),
          aValue: (0, Nt.default)(parseFloat(s[3]), 1),
        };
      }
      function m1(e, t, r, n, o, i) {
        let { setStyle: a } = i;
        switch (n.actionTypeId) {
          case mr: {
            let { widthUnit: s = "", heightUnit: c = "" } = n.config,
              { widthValue: p, heightValue: E } = r;
            p !== void 0 &&
              (s === Pt && (s = "px"), jt(e, ht, i), a(e, ht, p + s)),
              E !== void 0 &&
                (c === Pt && (c = "px"), jt(e, gt, i), a(e, gt, E + c));
            break;
          }
          case rn: {
            d1(e, r, n.config, i);
            break;
          }
          case nn: {
            p1(e, r, n.config, i);
            break;
          }
          case Ir:
          case Tr:
          case br: {
            let s = Za[n.actionTypeId],
              c = Math.round(r.rValue),
              p = Math.round(r.gValue),
              E = Math.round(r.bValue),
              f = r.aValue;
            jt(e, s, i),
              a(
                e,
                s,
                f >= 1 ? `rgb(${c},${p},${E})` : `rgba(${c},${p},${E},${f})`
              );
            break;
          }
          default: {
            let { unit: s = "" } = n.config;
            jt(e, o, i), a(e, o, r.value + s);
            break;
          }
        }
      }
      function I1(e, t, r) {
        let { setStyle: n } = r;
        switch (t.actionTypeId) {
          case _i: {
            let { value: o } = t.config;
            o === DD && Be.IS_BROWSER_ENV
              ? n(e, gi, Be.FLEX_PREFIXED)
              : n(e, gi, o);
            return;
          }
        }
      }
      function jt(e, t, r) {
        if (!Be.IS_BROWSER_ENV) return;
        let n = $g[t];
        if (!n) return;
        let { getStyle: o, setStyle: i } = r,
          a = o(e, gr);
        if (!a) {
          i(e, gr, n);
          return;
        }
        let s = a.split(en).map(Qg);
        s.indexOf(n) === -1 && i(e, gr, s.concat(n).join(en));
      }
      function Jg(e, t, r) {
        if (!Be.IS_BROWSER_ENV) return;
        let n = $g[t];
        if (!n) return;
        let { getStyle: o, setStyle: i } = r,
          a = o(e, gr);
        !a ||
          a.indexOf(n) === -1 ||
          i(
            e,
            gr,
            a
              .split(en)
              .map(Qg)
              .filter((s) => s !== n)
              .join(en)
          );
      }
      function T1({ store: e, elementApi: t }) {
        let { ixData: r } = e.getState(),
          { events: n = {}, actionLists: o = {} } = r;
        Object.keys(n).forEach((i) => {
          let a = n[i],
            { config: s } = a.action,
            { actionListId: c } = s,
            p = o[c];
          p && Bg({ actionList: p, event: a, elementApi: t });
        }),
          Object.keys(o).forEach((i) => {
            Bg({ actionList: o[i], elementApi: t });
          });
      }
      function Bg({ actionList: e = {}, event: t, elementApi: r }) {
        let { actionItemGroups: n, continuousParameterGroups: o } = e;
        n &&
          n.forEach((i) => {
            kg({ actionGroup: i, event: t, elementApi: r });
          }),
          o &&
            o.forEach((i) => {
              let { continuousActionGroups: a } = i;
              a.forEach((s) => {
                kg({ actionGroup: s, event: t, elementApi: r });
              });
            });
      }
      function kg({ actionGroup: e, event: t, elementApi: r }) {
        let { actionItems: n } = e;
        n.forEach((o) => {
          let { actionTypeId: i, config: a } = o,
            s;
          (0, Et.isPluginType)(i)
            ? (s = (c) => (0, Et.clearPlugin)(i)(c, o))
            : (s = eE({ effect: O1, actionTypeId: i, elementApi: r })),
            Ja({ config: a, event: t, elementApi: r }).forEach(s);
        });
      }
      function b1(e, t, r) {
        let { setStyle: n, getStyle: o } = r,
          { actionTypeId: i } = t;
        if (i === mr) {
          let { config: a } = t;
          a.widthUnit === Pt && n(e, ht, ""), a.heightUnit === Pt && n(e, gt, "");
        }
        o(e, gr) && eE({ effect: Jg, actionTypeId: i, elementApi: r })(e);
      }
      var eE =
        ({ effect: e, actionTypeId: t, elementApi: r }) =>
        (n) => {
          switch (t) {
            case Er:
            case _r:
            case yr:
            case tn:
              e(n, Be.TRANSFORM_PREFIXED, r);
              break;
            case rn:
              e(n, Zr, r);
              break;
            case nn:
              e(n, Jr, r);
              break;
            case Yg:
              e(n, hi, r);
              break;
            case mr:
              e(n, ht, r), e(n, gt, r);
              break;
            case Ir:
            case Tr:
            case br:
              e(n, Za[t], r);
              break;
            case _i:
              e(n, gi, r);
              break;
          }
        };
      function O1(e, t, r) {
        let { setStyle: n } = r;
        Jg(e, t, r),
          n(e, t, ""),
          t === Be.TRANSFORM_PREFIXED && n(e, Be.TRANSFORM_STYLE_PREFIXED, "");
      }
      function tE(e) {
        let t = 0,
          r = 0;
        return (
          e.forEach((n, o) => {
            let { config: i } = n,
              a = i.delay + i.duration;
            a >= t && ((t = a), (r = o));
          }),
          r
        );
      }
      function w1(e, t) {
        let { actionItemGroups: r, useFirstGroupAsInitialState: n } = e,
          { actionItem: o, verboseTimeElapsed: i = 0 } = t,
          a = 0,
          s = 0;
        return (
          r.forEach((c, p) => {
            if (n && p === 0) return;
            let { actionItems: E } = c,
              f = E[tE(E)],
              { config: I, actionTypeId: _ } = f;
            o.id === f.id && (s = a + i);
            let m = Zg(_) === Qa ? 0 : I.duration;
            a += I.delay + m;
          }),
          a > 0 ? (0, SD.optimizeFloat)(s / a) : 0
        );
      }
      function S1({ actionList: e, actionItemId: t, rawData: r }) {
        let { actionItemGroups: n, continuousParameterGroups: o } = e,
          i = [],
          a = (s) => (
            i.push((0, Gg.mergeIn)(s, ["config"], { delay: 0, duration: 0 })),
            s.id === t
          );
        return (
          n && n.some(({ actionItems: s }) => s.some(a)),
          o &&
            o.some((s) => {
              let { continuousActionGroups: c } = s;
              return c.some(({ actionItems: p }) => p.some(a));
            }),
          (0, Gg.setIn)(r, ["actionLists"], {
            [e.id]: { id: e.id, actionItemGroups: [{ actionItems: i }] },
          })
        );
      }
      function A1(e, { basedOn: t }) {
        return (
          (e === Ht.EventTypeConsts.SCROLLING_IN_VIEW &&
            (t === Ht.EventBasedOn.ELEMENT || t == null)) ||
          (e === Ht.EventTypeConsts.MOUSE_MOVE && t === Ht.EventBasedOn.ELEMENT)
        );
      }
      function R1(e, t) {
        return e + VD + t;
      }
      function x1(e, t) {
        return t == null ? !0 : e.indexOf(t) !== -1;
      }
      function C1(e, t) {
        return (0, Hg.default)(e && e.sort(), t && t.sort());
      }
      function N1(e) {
        if (typeof e == "string") return e;
        if (e.pluginElement && e.objectId)
          return e.pluginElement + Ka + e.objectId;
        if (e.objectId) return e.objectId;
        let { id: t = "", selector: r = "", useEventTarget: n = "" } = e;
        return t + Ka + r + Ka + n;
      }
    });
    var Kt = u((ke) => {
      "use strict";
      var Or = Gt().default;
      Object.defineProperty(ke, "__esModule", { value: !0 });
      ke.IX2VanillaUtils =
        ke.IX2VanillaPlugins =
        ke.IX2ElementsReducer =
        ke.IX2Easings =
        ke.IX2EasingUtils =
        ke.IX2BrowserSupport =
          void 0;
      var P1 = Or(si());
      ke.IX2BrowserSupport = P1;
      var L1 = Or(Fa());
      ke.IX2Easings = L1;
      var q1 = Or(Xa());
      ke.IX2EasingUtils = q1;
      var M1 = Or(ug());
      ke.IX2ElementsReducer = M1;
      var D1 = Or(ka());
      ke.IX2VanillaPlugins = D1;
      var F1 = Or(rE());
      ke.IX2VanillaUtils = F1;
    });
    var aE = u((mi) => {
      "use strict";
      Object.defineProperty(mi, "__esModule", { value: !0 });
      mi.ixInstances = void 0;
      var nE = je(),
        iE = Kt(),
        wr = ar(),
        {
          IX2_RAW_DATA_IMPORTED: G1,
          IX2_SESSION_STOPPED: X1,
          IX2_INSTANCE_ADDED: U1,
          IX2_INSTANCE_STARTED: V1,
          IX2_INSTANCE_REMOVED: W1,
          IX2_ANIMATION_FRAME_CHANGED: B1,
        } = nE.IX2EngineActionTypes,
        {
          optimizeFloat: yi,
          applyEasing: oE,
          createBezierEasing: k1,
        } = iE.IX2EasingUtils,
        { RENDER_GENERAL: H1 } = nE.IX2EngineConstants,
        {
          getItemConfigByKey: ts,
          getRenderType: j1,
          getStyleProp: K1,
        } = iE.IX2VanillaUtils,
        z1 = (e, t) => {
          let {
              position: r,
              parameterId: n,
              actionGroups: o,
              destinationKeys: i,
              smoothing: a,
              restingValue: s,
              actionTypeId: c,
              customEasingFn: p,
              skipMotion: E,
              skipToValue: f,
            } = e,
            { parameters: I } = t.payload,
            _ = Math.max(1 - a, 0.01),
            m = I[n];
          m == null && ((_ = 1), (m = s));
          let b = Math.max(m, 0) || 0,
            N = yi(b - r),
            x = E ? f : yi(r + N * _),
            P = x * 100;
          if (x === r && e.current) return e;
          let A, V, G, M;
          for (let Z = 0, { length: J } = o; Z < J; Z++) {
            let { keyframe: se, actionItems: ne } = o[Z];
            if ((Z === 0 && (A = ne[0]), P >= se)) {
              A = ne[0];
              let U = o[Z + 1],
                O = U && P !== se;
              (V = O ? U.actionItems[0] : null),
                O && ((G = se / 100), (M = (U.keyframe - se) / 100));
            }
          }
          let H = {};
          if (A && !V)
            for (let Z = 0, { length: J } = i; Z < J; Z++) {
              let se = i[Z];
              H[se] = ts(c, se, A.config);
            }
          else if (A && V && G !== void 0 && M !== void 0) {
            let Z = (x - G) / M,
              J = A.config.easing,
              se = oE(J, Z, p);
            for (let ne = 0, { length: U } = i; ne < U; ne++) {
              let O = i[ne],
                q = ts(c, O, A.config),
                ee = (ts(c, O, V.config) - q) * se + q;
              H[O] = ee;
            }
          }
          return (0, wr.merge)(e, { position: x, current: H });
        },
        Y1 = (e, t) => {
          let {
              active: r,
              origin: n,
              start: o,
              immediate: i,
              renderType: a,
              verbose: s,
              actionItem: c,
              destination: p,
              destinationKeys: E,
              pluginDuration: f,
              instanceDelay: I,
              customEasingFn: _,
              skipMotion: m,
            } = e,
            b = c.config.easing,
            { duration: N, delay: x } = c.config;
          f != null && (N = f),
            (x = I ?? x),
            a === H1 ? (N = 0) : (i || m) && (N = x = 0);
          let { now: P } = t.payload;
          if (r && n) {
            let A = P - (o + x);
            if (s) {
              let Z = P - o,
                J = N + x,
                se = yi(Math.min(Math.max(0, Z / J), 1));
              e = (0, wr.set)(e, "verboseTimeElapsed", J * se);
            }
            if (A < 0) return e;
            let V = yi(Math.min(Math.max(0, A / N), 1)),
              G = oE(b, V, _),
              M = {},
              H = null;
            return (
              E.length &&
                (H = E.reduce((Z, J) => {
                  let se = p[J],
                    ne = parseFloat(n[J]) || 0,
                    O = (parseFloat(se) - ne) * G + ne;
                  return (Z[J] = O), Z;
                }, {})),
              (M.current = H),
              (M.position = V),
              V === 1 && ((M.active = !1), (M.complete = !0)),
              (0, wr.merge)(e, M)
            );
          }
          return e;
        },
        Q1 = (e = Object.freeze({}), t) => {
          switch (t.type) {
            case G1:
              return t.payload.ixInstances || Object.freeze({});
            case X1:
              return Object.freeze({});
            case U1: {
              let {
                  instanceId: r,
                  elementId: n,
                  actionItem: o,
                  eventId: i,
                  eventTarget: a,
                  eventStateKey: s,
                  actionListId: c,
                  groupIndex: p,
                  isCarrier: E,
                  origin: f,
                  destination: I,
                  immediate: _,
                  verbose: m,
                  continuous: b,
                  parameterId: N,
                  actionGroups: x,
                  smoothing: P,
                  restingValue: A,
                  pluginInstance: V,
                  pluginDuration: G,
                  instanceDelay: M,
                  skipMotion: H,
                  skipToValue: Z,
                } = t.payload,
                { actionTypeId: J } = o,
                se = j1(J),
                ne = K1(se, J),
                U = Object.keys(I).filter(
                  (q) => I[q] != null && typeof I[q] != "string"
                ),
                { easing: O } = o.config;
              return (0, wr.set)(e, r, {
                id: r,
                elementId: n,
                active: !1,
                position: 0,
                start: 0,
                origin: f,
                destination: I,
                destinationKeys: U,
                immediate: _,
                verbose: m,
                current: null,
                actionItem: o,
                actionTypeId: J,
                eventId: i,
                eventTarget: a,
                eventStateKey: s,
                actionListId: c,
                groupIndex: p,
                renderType: se,
                isCarrier: E,
                styleProp: ne,
                continuous: b,
                parameterId: N,
                actionGroups: x,
                smoothing: P,
                restingValue: A,
                pluginInstance: V,
                pluginDuration: G,
                instanceDelay: M,
                skipMotion: H,
                skipToValue: Z,
                customEasingFn:
                  Array.isArray(O) && O.length === 4 ? k1(O) : void 0,
              });
            }
            case V1: {
              let { instanceId: r, time: n } = t.payload;
              return (0, wr.mergeIn)(e, [r], {
                active: !0,
                complete: !1,
                start: n,
              });
            }
            case W1: {
              let { instanceId: r } = t.payload;
              if (!e[r]) return e;
              let n = {},
                o = Object.keys(e),
                { length: i } = o;
              for (let a = 0; a < i; a++) {
                let s = o[a];
                s !== r && (n[s] = e[s]);
              }
              return n;
            }
            case B1: {
              let r = e,
                n = Object.keys(e),
                { length: o } = n;
              for (let i = 0; i < o; i++) {
                let a = n[i],
                  s = e[a],
                  c = s.continuous ? z1 : Y1;
                r = (0, wr.set)(r, a, c(s, t));
              }
              return r;
            }
            default:
              return e;
          }
        };
      mi.ixInstances = Q1;
    });
    var sE = u((Ii) => {
      "use strict";
      Object.defineProperty(Ii, "__esModule", { value: !0 });
      Ii.ixParameters = void 0;
      var $1 = je(),
        {
          IX2_RAW_DATA_IMPORTED: Z1,
          IX2_SESSION_STOPPED: J1,
          IX2_PARAMETER_CHANGED: e2,
        } = $1.IX2EngineActionTypes,
        t2 = (e = {}, t) => {
          switch (t.type) {
            case Z1:
              return t.payload.ixParameters || {};
            case J1:
              return {};
            case e2: {
              let { key: r, value: n } = t.payload;
              return (e[r] = n), e;
            }
            default:
              return e;
          }
        };
      Ii.ixParameters = t2;
    });
    var uE = u((Ti) => {
      "use strict";
      Object.defineProperty(Ti, "__esModule", { value: !0 });
      Ti.default = void 0;
      var r2 = ea(),
        n2 = Sf(),
        i2 = Hf(),
        o2 = Kf(),
        a2 = Kt(),
        s2 = aE(),
        u2 = sE(),
        { ixElements: c2 } = a2.IX2ElementsReducer,
        l2 = (0, r2.combineReducers)({
          ixData: n2.ixData,
          ixRequest: i2.ixRequest,
          ixSession: o2.ixSession,
          ixElements: c2,
          ixInstances: s2.ixInstances,
          ixParameters: u2.ixParameters,
        });
      Ti.default = l2;
    });
    var cE = u((Uj, on) => {
      function f2(e, t) {
        if (e == null) return {};
        var r = {},
          n = Object.keys(e),
          o,
          i;
        for (i = 0; i < n.length; i++)
          (o = n[i]), !(t.indexOf(o) >= 0) && (r[o] = e[o]);
        return r;
      }
      (on.exports = f2),
        (on.exports.__esModule = !0),
        (on.exports.default = on.exports);
    });
    var fE = u((Vj, lE) => {
      var d2 = Rt(),
        p2 = qe(),
        v2 = It(),
        h2 = "[object String]";
      function g2(e) {
        return typeof e == "string" || (!p2(e) && v2(e) && d2(e) == h2);
      }
      lE.exports = g2;
    });
    var pE = u((Wj, dE) => {
      var E2 = Na(),
        _2 = E2("length");
      dE.exports = _2;
    });
    var hE = u((Bj, vE) => {
      var y2 = "\\ud800-\\udfff",
        m2 = "\\u0300-\\u036f",
        I2 = "\\ufe20-\\ufe2f",
        T2 = "\\u20d0-\\u20ff",
        b2 = m2 + I2 + T2,
        O2 = "\\ufe0e\\ufe0f",
        w2 = "\\u200d",
        S2 = RegExp("[" + w2 + y2 + b2 + O2 + "]");
      function A2(e) {
        return S2.test(e);
      }
      vE.exports = A2;
    });
    var OE = u((kj, bE) => {
      var EE = "\\ud800-\\udfff",
        R2 = "\\u0300-\\u036f",
        x2 = "\\ufe20-\\ufe2f",
        C2 = "\\u20d0-\\u20ff",
        N2 = R2 + x2 + C2,
        P2 = "\\ufe0e\\ufe0f",
        L2 = "[" + EE + "]",
        rs = "[" + N2 + "]",
        ns = "\\ud83c[\\udffb-\\udfff]",
        q2 = "(?:" + rs + "|" + ns + ")",
        _E = "[^" + EE + "]",
        yE = "(?:\\ud83c[\\udde6-\\uddff]){2}",
        mE = "[\\ud800-\\udbff][\\udc00-\\udfff]",
        M2 = "\\u200d",
        IE = q2 + "?",
        TE = "[" + P2 + "]?",
        D2 = "(?:" + M2 + "(?:" + [_E, yE, mE].join("|") + ")" + TE + IE + ")*",
        F2 = TE + IE + D2,
        G2 = "(?:" + [_E + rs + "?", rs, yE, mE, L2].join("|") + ")",
        gE = RegExp(ns + "(?=" + ns + ")|" + G2 + F2, "g");
      function X2(e) {
        for (var t = (gE.lastIndex = 0); gE.test(e); ) ++t;
        return t;
      }
      bE.exports = X2;
    });
    var SE = u((Hj, wE) => {
      var U2 = pE(),
        V2 = hE(),
        W2 = OE();
      function B2(e) {
        return V2(e) ? W2(e) : U2(e);
      }
      wE.exports = B2;
    });
    var RE = u((jj, AE) => {
      var k2 = Zn(),
        H2 = Jn(),
        j2 = Wt(),
        K2 = fE(),
        z2 = SE(),
        Y2 = "[object Map]",
        Q2 = "[object Set]";
      function $2(e) {
        if (e == null) return 0;
        if (j2(e)) return K2(e) ? z2(e) : e.length;
        var t = H2(e);
        return t == Y2 || t == Q2 ? e.size : k2(e).length;
      }
      AE.exports = $2;
    });
    var CE = u((Kj, xE) => {
      var Z2 = "Expected a function";
      function J2(e) {
        if (typeof e != "function") throw new TypeError(Z2);
        return function () {
          var t = arguments;
          switch (t.length) {
            case 0:
              return !e.call(this);
            case 1:
              return !e.call(this, t[0]);
            case 2:
              return !e.call(this, t[0], t[1]);
            case 3:
              return !e.call(this, t[0], t[1], t[2]);
          }
          return !e.apply(this, t);
        };
      }
      xE.exports = J2;
    });
    var is = u((zj, NE) => {
      var eF = xt(),
        tF = (function () {
          try {
            var e = eF(Object, "defineProperty");
            return e({}, "", {}), e;
          } catch {}
        })();
      NE.exports = tF;
    });
    var os = u((Yj, LE) => {
      var PE = is();
      function rF(e, t, r) {
        t == "__proto__" && PE
          ? PE(e, t, { configurable: !0, enumerable: !0, value: r, writable: !0 })
          : (e[t] = r);
      }
      LE.exports = rF;
    });
    var ME = u((Qj, qE) => {
      var nF = os(),
        iF = Wn(),
        oF = Object.prototype,
        aF = oF.hasOwnProperty;
      function sF(e, t, r) {
        var n = e[t];
        (!(aF.call(e, t) && iF(n, r)) || (r === void 0 && !(t in e))) &&
          nF(e, t, r);
      }
      qE.exports = sF;
    });
    var GE = u(($j, FE) => {
      var uF = ME(),
        cF = Yr(),
        lF = zn(),
        DE = vt(),
        fF = vr();
      function dF(e, t, r, n) {
        if (!DE(e)) return e;
        t = cF(t, e);
        for (var o = -1, i = t.length, a = i - 1, s = e; s != null && ++o < i; ) {
          var c = fF(t[o]),
            p = r;
          if (c === "__proto__" || c === "constructor" || c === "prototype")
            return e;
          if (o != a) {
            var E = s[c];
            (p = n ? n(E, c, s) : void 0),
              p === void 0 && (p = DE(E) ? E : lF(t[o + 1]) ? [] : {});
          }
          uF(s, c, p), (s = s[c]);
        }
        return e;
      }
      FE.exports = dF;
    });
    var UE = u((Zj, XE) => {
      var pF = ri(),
        vF = GE(),
        hF = Yr();
      function gF(e, t, r) {
        for (var n = -1, o = t.length, i = {}; ++n < o; ) {
          var a = t[n],
            s = pF(e, a);
          r(s, a) && vF(i, hF(a, e), s);
        }
        return i;
      }
      XE.exports = gF;
    });
    var WE = u((Jj, VE) => {
      var EF = jn(),
        _F = Vo(),
        yF = ga(),
        mF = ha(),
        IF = Object.getOwnPropertySymbols,
        TF = IF
          ? function (e) {
              for (var t = []; e; ) EF(t, yF(e)), (e = _F(e));
              return t;
            }
          : mF;
      VE.exports = TF;
    });
    var kE = u((eK, BE) => {
      function bF(e) {
        var t = [];
        if (e != null) for (var r in Object(e)) t.push(r);
        return t;
      }
      BE.exports = bF;
    });
    var jE = u((tK, HE) => {
      var OF = vt(),
        wF = $n(),
        SF = kE(),
        AF = Object.prototype,
        RF = AF.hasOwnProperty;
      function xF(e) {
        if (!OF(e)) return SF(e);
        var t = wF(e),
          r = [];
        for (var n in e)
          (n == "constructor" && (t || !RF.call(e, n))) || r.push(n);
        return r;
      }
      HE.exports = xF;
    });
    var zE = u((rK, KE) => {
      var CF = _a(),
        NF = jE(),
        PF = Wt();
      function LF(e) {
        return PF(e) ? CF(e, !0) : NF(e);
      }
      KE.exports = LF;
    });
    var QE = u((nK, YE) => {
      var qF = va(),
        MF = WE(),
        DF = zE();
      function FF(e) {
        return qF(e, DF, MF);
      }
      YE.exports = FF;
    });
    var ZE = u((iK, $E) => {
      var GF = Ca(),
        XF = Ct(),
        UF = UE(),
        VF = QE();
      function WF(e, t) {
        if (e == null) return {};
        var r = GF(VF(e), function (n) {
          return [n];
        });
        return (
          (t = XF(t)),
          UF(e, r, function (n, o) {
            return t(n, o[0]);
          })
        );
      }
      $E.exports = WF;
    });
    var e_ = u((oK, JE) => {
      var BF = Ct(),
        kF = CE(),
        HF = ZE();
      function jF(e, t) {
        return HF(e, kF(BF(t)));
      }
      JE.exports = jF;
    });
    var r_ = u((aK, t_) => {
      var KF = Zn(),
        zF = Jn(),
        YF = Br(),
        QF = qe(),
        $F = Wt(),
        ZF = Kn(),
        JF = $n(),
        eG = Qn(),
        tG = "[object Map]",
        rG = "[object Set]",
        nG = Object.prototype,
        iG = nG.hasOwnProperty;
      function oG(e) {
        if (e == null) return !0;
        if (
          $F(e) &&
          (QF(e) ||
            typeof e == "string" ||
            typeof e.splice == "function" ||
            ZF(e) ||
            eG(e) ||
            YF(e))
        )
          return !e.length;
        var t = zF(e);
        if (t == tG || t == rG) return !e.size;
        if (JF(e)) return !KF(e).length;
        for (var r in e) if (iG.call(e, r)) return !1;
        return !0;
      }
      t_.exports = oG;
    });
    var i_ = u((sK, n_) => {
      var aG = os(),
        sG = Ha(),
        uG = Ct();
      function cG(e, t) {
        var r = {};
        return (
          (t = uG(t, 3)),
          sG(e, function (n, o, i) {
            aG(r, o, t(n, o, i));
          }),
          r
        );
      }
      n_.exports = cG;
    });
    var a_ = u((uK, o_) => {
      function lG(e, t) {
        for (
          var r = -1, n = e == null ? 0 : e.length;
          ++r < n && t(e[r], r, e) !== !1;
  
        );
        return e;
      }
      o_.exports = lG;
    });
    var u_ = u((cK, s_) => {
      var fG = ii();
      function dG(e) {
        return typeof e == "function" ? e : fG;
      }
      s_.exports = dG;
    });
    var l_ = u((lK, c_) => {
      var pG = a_(),
        vG = ja(),
        hG = u_(),
        gG = qe();
      function EG(e, t) {
        var r = gG(e) ? pG : vG;
        return r(e, hG(t));
      }
      c_.exports = EG;
    });
    var d_ = u((fK, f_) => {
      var _G = ot(),
        yG = function () {
          return _G.Date.now();
        };
      f_.exports = yG;
    });
    var h_ = u((dK, v_) => {
      var mG = vt(),
        as = d_(),
        p_ = oi(),
        IG = "Expected a function",
        TG = Math.max,
        bG = Math.min;
      function OG(e, t, r) {
        var n,
          o,
          i,
          a,
          s,
          c,
          p = 0,
          E = !1,
          f = !1,
          I = !0;
        if (typeof e != "function") throw new TypeError(IG);
        (t = p_(t) || 0),
          mG(r) &&
            ((E = !!r.leading),
            (f = "maxWait" in r),
            (i = f ? TG(p_(r.maxWait) || 0, t) : i),
            (I = "trailing" in r ? !!r.trailing : I));
        function _(M) {
          var H = n,
            Z = o;
          return (n = o = void 0), (p = M), (a = e.apply(Z, H)), a;
        }
        function m(M) {
          return (p = M), (s = setTimeout(x, t)), E ? _(M) : a;
        }
        function b(M) {
          var H = M - c,
            Z = M - p,
            J = t - H;
          return f ? bG(J, i - Z) : J;
        }
        function N(M) {
          var H = M - c,
            Z = M - p;
          return c === void 0 || H >= t || H < 0 || (f && Z >= i);
        }
        function x() {
          var M = as();
          if (N(M)) return P(M);
          s = setTimeout(x, b(M));
        }
        function P(M) {
          return (s = void 0), I && n ? _(M) : ((n = o = void 0), a);
        }
        function A() {
          s !== void 0 && clearTimeout(s), (p = 0), (n = c = o = s = void 0);
        }
        function V() {
          return s === void 0 ? a : P(as());
        }
        function G() {
          var M = as(),
            H = N(M);
          if (((n = arguments), (o = this), (c = M), H)) {
            if (s === void 0) return m(c);
            if (f) return clearTimeout(s), (s = setTimeout(x, t)), _(c);
          }
          return s === void 0 && (s = setTimeout(x, t)), a;
        }
        return (G.cancel = A), (G.flush = V), G;
      }
      v_.exports = OG;
    });
    var E_ = u((pK, g_) => {
      var wG = h_(),
        SG = vt(),
        AG = "Expected a function";
      function RG(e, t, r) {
        var n = !0,
          o = !0;
        if (typeof e != "function") throw new TypeError(AG);
        return (
          SG(r) &&
            ((n = "leading" in r ? !!r.leading : n),
            (o = "trailing" in r ? !!r.trailing : o)),
          wG(e, t, { leading: n, maxWait: t, trailing: o })
        );
      }
      g_.exports = RG;
    });
    var bi = u((fe) => {
      "use strict";
      var xG = rt().default;
      Object.defineProperty(fe, "__esModule", { value: !0 });
      fe.viewportWidthChanged =
        fe.testFrameRendered =
        fe.stopRequested =
        fe.sessionStopped =
        fe.sessionStarted =
        fe.sessionInitialized =
        fe.rawDataImported =
        fe.previewRequested =
        fe.playbackRequested =
        fe.parameterChanged =
        fe.mediaQueriesDefined =
        fe.instanceStarted =
        fe.instanceRemoved =
        fe.instanceAdded =
        fe.eventStateChanged =
        fe.eventListenerAdded =
        fe.elementStateChanged =
        fe.clearRequested =
        fe.animationFrameChanged =
        fe.actionListPlaybackChanged =
          void 0;
      var __ = xG(or()),
        y_ = je(),
        CG = Kt(),
        {
          IX2_RAW_DATA_IMPORTED: NG,
          IX2_SESSION_INITIALIZED: PG,
          IX2_SESSION_STARTED: LG,
          IX2_SESSION_STOPPED: qG,
          IX2_PREVIEW_REQUESTED: MG,
          IX2_PLAYBACK_REQUESTED: DG,
          IX2_STOP_REQUESTED: FG,
          IX2_CLEAR_REQUESTED: GG,
          IX2_EVENT_LISTENER_ADDED: XG,
          IX2_TEST_FRAME_RENDERED: UG,
          IX2_EVENT_STATE_CHANGED: VG,
          IX2_ANIMATION_FRAME_CHANGED: WG,
          IX2_PARAMETER_CHANGED: BG,
          IX2_INSTANCE_ADDED: kG,
          IX2_INSTANCE_STARTED: HG,
          IX2_INSTANCE_REMOVED: jG,
          IX2_ELEMENT_STATE_CHANGED: KG,
          IX2_ACTION_LIST_PLAYBACK_CHANGED: zG,
          IX2_VIEWPORT_WIDTH_CHANGED: YG,
          IX2_MEDIA_QUERIES_DEFINED: QG,
        } = y_.IX2EngineActionTypes,
        { reifyState: $G } = CG.IX2VanillaUtils,
        ZG = (e) => ({ type: NG, payload: (0, __.default)({}, $G(e)) });
      fe.rawDataImported = ZG;
      var JG = ({ hasBoundaryNodes: e, reducedMotion: t }) => ({
        type: PG,
        payload: { hasBoundaryNodes: e, reducedMotion: t },
      });
      fe.sessionInitialized = JG;
      var eX = () => ({ type: LG });
      fe.sessionStarted = eX;
      var tX = () => ({ type: qG });
      fe.sessionStopped = tX;
      var rX = ({ rawData: e, defer: t }) => ({
        type: MG,
        payload: { defer: t, rawData: e },
      });
      fe.previewRequested = rX;
      var nX = ({
        actionTypeId: e = y_.ActionTypeConsts.GENERAL_START_ACTION,
        actionListId: t,
        actionItemId: r,
        eventId: n,
        allowEvents: o,
        immediate: i,
        testManual: a,
        verbose: s,
        rawData: c,
      }) => ({
        type: DG,
        payload: {
          actionTypeId: e,
          actionListId: t,
          actionItemId: r,
          testManual: a,
          eventId: n,
          allowEvents: o,
          immediate: i,
          verbose: s,
          rawData: c,
        },
      });
      fe.playbackRequested = nX;
      var iX = (e) => ({ type: FG, payload: { actionListId: e } });
      fe.stopRequested = iX;
      var oX = () => ({ type: GG });
      fe.clearRequested = oX;
      var aX = (e, t) => ({
        type: XG,
        payload: { target: e, listenerParams: t },
      });
      fe.eventListenerAdded = aX;
      var sX = (e = 1) => ({ type: UG, payload: { step: e } });
      fe.testFrameRendered = sX;
      var uX = (e, t) => ({ type: VG, payload: { stateKey: e, newState: t } });
      fe.eventStateChanged = uX;
      var cX = (e, t) => ({ type: WG, payload: { now: e, parameters: t } });
      fe.animationFrameChanged = cX;
      var lX = (e, t) => ({ type: BG, payload: { key: e, value: t } });
      fe.parameterChanged = lX;
      var fX = (e) => ({ type: kG, payload: (0, __.default)({}, e) });
      fe.instanceAdded = fX;
      var dX = (e, t) => ({ type: HG, payload: { instanceId: e, time: t } });
      fe.instanceStarted = dX;
      var pX = (e) => ({ type: jG, payload: { instanceId: e } });
      fe.instanceRemoved = pX;
      var vX = (e, t, r, n) => ({
        type: KG,
        payload: { elementId: e, actionTypeId: t, current: r, actionItem: n },
      });
      fe.elementStateChanged = vX;
      var hX = ({ actionListId: e, isPlaying: t }) => ({
        type: zG,
        payload: { actionListId: e, isPlaying: t },
      });
      fe.actionListPlaybackChanged = hX;
      var gX = ({ width: e, mediaQueries: t }) => ({
        type: YG,
        payload: { width: e, mediaQueries: t },
      });
      fe.viewportWidthChanged = gX;
      var EX = () => ({ type: QG });
      fe.mediaQueriesDefined = EX;
    });
    var T_ = u((Fe) => {
      "use strict";
      Object.defineProperty(Fe, "__esModule", { value: !0 });
      Fe.elementContains = xX;
      Fe.getChildElements = NX;
      Fe.getClosestElement = void 0;
      Fe.getProperty = OX;
      Fe.getQuerySelector = SX;
      Fe.getRefType = qX;
      Fe.getSiblingElements = PX;
      Fe.getStyle = bX;
      Fe.getValidDocument = AX;
      Fe.isSiblingNode = CX;
      Fe.matchSelector = wX;
      Fe.queryDocument = RX;
      Fe.setStyle = TX;
      var _X = Kt(),
        yX = je(),
        { ELEMENT_MATCHES: ss } = _X.IX2BrowserSupport,
        {
          IX2_ID_DELIMITER: m_,
          HTML_ELEMENT: mX,
          PLAIN_OBJECT: IX,
          WF_PAGE: I_,
        } = yX.IX2EngineConstants;
      function TX(e, t, r) {
        e.style[t] = r;
      }
      function bX(e, t) {
        return e.style[t];
      }
      function OX(e, t) {
        return e[t];
      }
      function wX(e) {
        return (t) => t[ss](e);
      }
      function SX({ id: e, selector: t }) {
        if (e) {
          let r = e;
          if (e.indexOf(m_) !== -1) {
            let n = e.split(m_),
              o = n[0];
            if (((r = n[1]), o !== document.documentElement.getAttribute(I_)))
              return null;
          }
          return `[data-w-id="${r}"], [data-w-id^="${r}_instance"]`;
        }
        return t;
      }
      function AX(e) {
        return e == null || e === document.documentElement.getAttribute(I_)
          ? document
          : null;
      }
      function RX(e, t) {
        return Array.prototype.slice.call(
          document.querySelectorAll(t ? e + " " + t : e)
        );
      }
      function xX(e, t) {
        return e.contains(t);
      }
      function CX(e, t) {
        return e !== t && e.parentNode === t.parentNode;
      }
      function NX(e) {
        let t = [];
        for (let r = 0, { length: n } = e || []; r < n; r++) {
          let { children: o } = e[r],
            { length: i } = o;
          if (i) for (let a = 0; a < i; a++) t.push(o[a]);
        }
        return t;
      }
      function PX(e = []) {
        let t = [],
          r = [];
        for (let n = 0, { length: o } = e; n < o; n++) {
          let { parentNode: i } = e[n];
          if (!i || !i.children || !i.children.length || r.indexOf(i) !== -1)
            continue;
          r.push(i);
          let a = i.firstElementChild;
          for (; a != null; )
            e.indexOf(a) === -1 && t.push(a), (a = a.nextElementSibling);
        }
        return t;
      }
      var LX = Element.prototype.closest
        ? (e, t) => (document.documentElement.contains(e) ? e.closest(t) : null)
        : (e, t) => {
            if (!document.documentElement.contains(e)) return null;
            let r = e;
            do {
              if (r[ss] && r[ss](t)) return r;
              r = r.parentNode;
            } while (r != null);
            return null;
          };
      Fe.getClosestElement = LX;
      function qX(e) {
        return e != null && typeof e == "object"
          ? e instanceof Element
            ? mX
            : IX
          : null;
      }
    });
    var us = u((gK, O_) => {
      var MX = vt(),
        b_ = Object.create,
        DX = (function () {
          function e() {}
          return function (t) {
            if (!MX(t)) return {};
            if (b_) return b_(t);
            e.prototype = t;
            var r = new e();
            return (e.prototype = void 0), r;
          };
        })();
      O_.exports = DX;
    });
    var Oi = u((EK, w_) => {
      function FX() {}
      w_.exports = FX;
    });
    var Si = u((_K, S_) => {
      var GX = us(),
        XX = Oi();
      function wi(e, t) {
        (this.__wrapped__ = e),
          (this.__actions__ = []),
          (this.__chain__ = !!t),
          (this.__index__ = 0),
          (this.__values__ = void 0);
      }
      wi.prototype = GX(XX.prototype);
      wi.prototype.constructor = wi;
      S_.exports = wi;
    });
    var C_ = u((yK, x_) => {
      var A_ = tr(),
        UX = Br(),
        VX = qe(),
        R_ = A_ ? A_.isConcatSpreadable : void 0;
      function WX(e) {
        return VX(e) || UX(e) || !!(R_ && e && e[R_]);
      }
      x_.exports = WX;
    });
    var L_ = u((mK, P_) => {
      var BX = jn(),
        kX = C_();
      function N_(e, t, r, n, o) {
        var i = -1,
          a = e.length;
        for (r || (r = kX), o || (o = []); ++i < a; ) {
          var s = e[i];
          t > 0 && r(s)
            ? t > 1
              ? N_(s, t - 1, r, n, o)
              : BX(o, s)
            : n || (o[o.length] = s);
        }
        return o;
      }
      P_.exports = N_;
    });
    var M_ = u((IK, q_) => {
      var HX = L_();
      function jX(e) {
        var t = e == null ? 0 : e.length;
        return t ? HX(e, 1) : [];
      }
      q_.exports = jX;
    });
    var F_ = u((TK, D_) => {
      function KX(e, t, r) {
        switch (r.length) {
          case 0:
            return e.call(t);
          case 1:
            return e.call(t, r[0]);
          case 2:
            return e.call(t, r[0], r[1]);
          case 3:
            return e.call(t, r[0], r[1], r[2]);
        }
        return e.apply(t, r);
      }
      D_.exports = KX;
    });
    var U_ = u((bK, X_) => {
      var zX = F_(),
        G_ = Math.max;
      function YX(e, t, r) {
        return (
          (t = G_(t === void 0 ? e.length - 1 : t, 0)),
          function () {
            for (
              var n = arguments, o = -1, i = G_(n.length - t, 0), a = Array(i);
              ++o < i;
  
            )
              a[o] = n[t + o];
            o = -1;
            for (var s = Array(t + 1); ++o < t; ) s[o] = n[o];
            return (s[t] = r(a)), zX(e, this, s);
          }
        );
      }
      X_.exports = YX;
    });
    var W_ = u((OK, V_) => {
      function QX(e) {
        return function () {
          return e;
        };
      }
      V_.exports = QX;
    });
    var H_ = u((wK, k_) => {
      var $X = W_(),
        B_ = is(),
        ZX = ii(),
        JX = B_
          ? function (e, t) {
              return B_(e, "toString", {
                configurable: !0,
                enumerable: !1,
                value: $X(t),
                writable: !0,
              });
            }
          : ZX;
      k_.exports = JX;
    });
    var K_ = u((SK, j_) => {
      var eU = 800,
        tU = 16,
        rU = Date.now;
      function nU(e) {
        var t = 0,
          r = 0;
        return function () {
          var n = rU(),
            o = tU - (n - r);
          if (((r = n), o > 0)) {
            if (++t >= eU) return arguments[0];
          } else t = 0;
          return e.apply(void 0, arguments);
        };
      }
      j_.exports = nU;
    });
    var Y_ = u((AK, z_) => {
      var iU = H_(),
        oU = K_(),
        aU = oU(iU);
      z_.exports = aU;
    });
    var $_ = u((RK, Q_) => {
      var sU = M_(),
        uU = U_(),
        cU = Y_();
      function lU(e) {
        return cU(uU(e, void 0, sU), e + "");
      }
      Q_.exports = lU;
    });
    var ey = u((xK, J_) => {
      var Z_ = ya(),
        fU = Z_ && new Z_();
      J_.exports = fU;
    });
    var ry = u((CK, ty) => {
      function dU() {}
      ty.exports = dU;
    });
    var cs = u((NK, iy) => {
      var ny = ey(),
        pU = ry(),
        vU = ny
          ? function (e) {
              return ny.get(e);
            }
          : pU;
      iy.exports = vU;
    });
    var ay = u((PK, oy) => {
      var hU = {};
      oy.exports = hU;
    });
    var ls = u((LK, uy) => {
      var sy = ay(),
        gU = Object.prototype,
        EU = gU.hasOwnProperty;
      function _U(e) {
        for (
          var t = e.name + "", r = sy[t], n = EU.call(sy, t) ? r.length : 0;
          n--;
  
        ) {
          var o = r[n],
            i = o.func;
          if (i == null || i == e) return o.name;
        }
        return t;
      }
      uy.exports = _U;
    });
    var Ri = u((qK, cy) => {
      var yU = us(),
        mU = Oi(),
        IU = 4294967295;
      function Ai(e) {
        (this.__wrapped__ = e),
          (this.__actions__ = []),
          (this.__dir__ = 1),
          (this.__filtered__ = !1),
          (this.__iteratees__ = []),
          (this.__takeCount__ = IU),
          (this.__views__ = []);
      }
      Ai.prototype = yU(mU.prototype);
      Ai.prototype.constructor = Ai;
      cy.exports = Ai;
    });
    var fy = u((MK, ly) => {
      function TU(e, t) {
        var r = -1,
          n = e.length;
        for (t || (t = Array(n)); ++r < n; ) t[r] = e[r];
        return t;
      }
      ly.exports = TU;
    });
    var py = u((DK, dy) => {
      var bU = Ri(),
        OU = Si(),
        wU = fy();
      function SU(e) {
        if (e instanceof bU) return e.clone();
        var t = new OU(e.__wrapped__, e.__chain__);
        return (
          (t.__actions__ = wU(e.__actions__)),
          (t.__index__ = e.__index__),
          (t.__values__ = e.__values__),
          t
        );
      }
      dy.exports = SU;
    });
    var gy = u((FK, hy) => {
      var AU = Ri(),
        vy = Si(),
        RU = Oi(),
        xU = qe(),
        CU = It(),
        NU = py(),
        PU = Object.prototype,
        LU = PU.hasOwnProperty;
      function xi(e) {
        if (CU(e) && !xU(e) && !(e instanceof AU)) {
          if (e instanceof vy) return e;
          if (LU.call(e, "__wrapped__")) return NU(e);
        }
        return new vy(e);
      }
      xi.prototype = RU.prototype;
      xi.prototype.constructor = xi;
      hy.exports = xi;
    });
    var _y = u((GK, Ey) => {
      var qU = Ri(),
        MU = cs(),
        DU = ls(),
        FU = gy();
      function GU(e) {
        var t = DU(e),
          r = FU[t];
        if (typeof r != "function" || !(t in qU.prototype)) return !1;
        if (e === r) return !0;
        var n = MU(r);
        return !!n && e === n[0];
      }
      Ey.exports = GU;
    });
    var Ty = u((XK, Iy) => {
      var yy = Si(),
        XU = $_(),
        UU = cs(),
        fs = ls(),
        VU = qe(),
        my = _y(),
        WU = "Expected a function",
        BU = 8,
        kU = 32,
        HU = 128,
        jU = 256;
      function KU(e) {
        return XU(function (t) {
          var r = t.length,
            n = r,
            o = yy.prototype.thru;
          for (e && t.reverse(); n--; ) {
            var i = t[n];
            if (typeof i != "function") throw new TypeError(WU);
            if (o && !a && fs(i) == "wrapper") var a = new yy([], !0);
          }
          for (n = a ? n : r; ++n < r; ) {
            i = t[n];
            var s = fs(i),
              c = s == "wrapper" ? UU(i) : void 0;
            c &&
            my(c[0]) &&
            c[1] == (HU | BU | kU | jU) &&
            !c[4].length &&
            c[9] == 1
              ? (a = a[fs(c[0])].apply(a, c[3]))
              : (a = i.length == 1 && my(i) ? a[s]() : a.thru(i));
          }
          return function () {
            var p = arguments,
              E = p[0];
            if (a && p.length == 1 && VU(E)) return a.plant(E).value();
            for (var f = 0, I = r ? t[f].apply(this, p) : E; ++f < r; )
              I = t[f].call(this, I);
            return I;
          };
        });
      }
      Iy.exports = KU;
    });
    var Oy = u((UK, by) => {
      var zU = Ty(),
        YU = zU();
      by.exports = YU;
    });
    var Sy = u((VK, wy) => {
      function QU(e, t, r) {
        return (
          e === e &&
            (r !== void 0 && (e = e <= r ? e : r),
            t !== void 0 && (e = e >= t ? e : t)),
          e
        );
      }
      wy.exports = QU;
    });
    var Ry = u((WK, Ay) => {
      var $U = Sy(),
        ds = oi();
      function ZU(e, t, r) {
        return (
          r === void 0 && ((r = t), (t = void 0)),
          r !== void 0 && ((r = ds(r)), (r = r === r ? r : 0)),
          t !== void 0 && ((t = ds(t)), (t = t === t ? t : 0)),
          $U(ds(e), t, r)
        );
      }
      Ay.exports = ZU;
    });
    var jy = u((qi) => {
      "use strict";
      var Li = rt().default;
      Object.defineProperty(qi, "__esModule", { value: !0 });
      qi.default = void 0;
      var $e = Li(or()),
        JU = Li(Oy()),
        eV = Li(ni()),
        tV = Li(Ry()),
        zt = je(),
        ps = Es(),
        Ci = bi(),
        rV = Kt(),
        {
          MOUSE_CLICK: nV,
          MOUSE_SECOND_CLICK: iV,
          MOUSE_DOWN: oV,
          MOUSE_UP: aV,
          MOUSE_OVER: sV,
          MOUSE_OUT: uV,
          DROPDOWN_CLOSE: cV,
          DROPDOWN_OPEN: lV,
          SLIDER_ACTIVE: fV,
          SLIDER_INACTIVE: dV,
          TAB_ACTIVE: pV,
          TAB_INACTIVE: vV,
          NAVBAR_CLOSE: hV,
          NAVBAR_OPEN: gV,
          MOUSE_MOVE: EV,
          PAGE_SCROLL_DOWN: Fy,
          SCROLL_INTO_VIEW: Gy,
          SCROLL_OUT_OF_VIEW: _V,
          PAGE_SCROLL_UP: yV,
          SCROLLING_IN_VIEW: mV,
          PAGE_FINISH: Xy,
          ECOMMERCE_CART_CLOSE: IV,
          ECOMMERCE_CART_OPEN: TV,
          PAGE_START: Uy,
          PAGE_SCROLL: bV,
        } = zt.EventTypeConsts,
        vs = "COMPONENT_ACTIVE",
        Vy = "COMPONENT_INACTIVE",
        { COLON_DELIMITER: xy } = zt.IX2EngineConstants,
        { getNamespacedParameterId: Cy } = rV.IX2VanillaUtils,
        Wy = (e) => (t) => typeof t == "object" && e(t) ? !0 : t,
        sn = Wy(({ element: e, nativeEvent: t }) => e === t.target),
        OV = Wy(({ element: e, nativeEvent: t }) => e.contains(t.target)),
        _t = (0, JU.default)([sn, OV]),
        By = (e, t) => {
          if (t) {
            let { ixData: r } = e.getState(),
              { events: n } = r,
              o = n[t];
            if (o && !SV[o.eventTypeId]) return o;
          }
          return null;
        },
        wV = ({ store: e, event: t }) => {
          let { action: r } = t,
            { autoStopEventId: n } = r.config;
          return !!By(e, n);
        },
        ze = ({ store: e, event: t, element: r, eventStateKey: n }, o) => {
          let { action: i, id: a } = t,
            { actionListId: s, autoStopEventId: c } = i.config,
            p = By(e, c);
          return (
            p &&
              (0, ps.stopActionGroup)({
                store: e,
                eventId: c,
                eventTarget: r,
                eventStateKey: c + xy + n.split(xy)[1],
                actionListId: (0, eV.default)(p, "action.config.actionListId"),
              }),
            (0, ps.stopActionGroup)({
              store: e,
              eventId: a,
              eventTarget: r,
              eventStateKey: n,
              actionListId: s,
            }),
            (0, ps.startActionGroup)({
              store: e,
              eventId: a,
              eventTarget: r,
              eventStateKey: n,
              actionListId: s,
            }),
            o
          );
        },
        at = (e, t) => (r, n) => e(r, n) === !0 ? t(r, n) : n,
        un = { handler: at(_t, ze) },
        ky = (0, $e.default)({}, un, { types: [vs, Vy].join(" ") }),
        hs = [
          { target: window, types: "resize orientationchange", throttle: !0 },
          {
            target: document,
            types: "scroll wheel readystatechange IX2_PAGE_UPDATE",
            throttle: !0,
          },
        ],
        Ny = "mouseover mouseout",
        gs = { types: hs },
        SV = { PAGE_START: Uy, PAGE_FINISH: Xy },
        an = (() => {
          let e = window.pageXOffset !== void 0,
            r =
              document.compatMode === "CSS1Compat"
                ? document.documentElement
                : document.body;
          return () => ({
            scrollLeft: e ? window.pageXOffset : r.scrollLeft,
            scrollTop: e ? window.pageYOffset : r.scrollTop,
            stiffScrollTop: (0, tV.default)(
              e ? window.pageYOffset : r.scrollTop,
              0,
              r.scrollHeight - window.innerHeight
            ),
            scrollWidth: r.scrollWidth,
            scrollHeight: r.scrollHeight,
            clientWidth: r.clientWidth,
            clientHeight: r.clientHeight,
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight,
          });
        })(),
        AV = (e, t) =>
          !(
            e.left > t.right ||
            e.right < t.left ||
            e.top > t.bottom ||
            e.bottom < t.top
          ),
        RV = ({ element: e, nativeEvent: t }) => {
          let { type: r, target: n, relatedTarget: o } = t,
            i = e.contains(n);
          if (r === "mouseover" && i) return !0;
          let a = e.contains(o);
          return !!(r === "mouseout" && i && a);
        },
        xV = (e) => {
          let {
              element: t,
              event: { config: r },
            } = e,
            { clientWidth: n, clientHeight: o } = an(),
            i = r.scrollOffsetValue,
            c = r.scrollOffsetUnit === "PX" ? i : (o * (i || 0)) / 100;
          return AV(t.getBoundingClientRect(), {
            left: 0,
            top: c,
            right: n,
            bottom: o - c,
          });
        },
        Hy = (e) => (t, r) => {
          let { type: n } = t.nativeEvent,
            o = [vs, Vy].indexOf(n) !== -1 ? n === vs : r.isActive,
            i = (0, $e.default)({}, r, { isActive: o });
          return ((!r || i.isActive !== r.isActive) && e(t, i)) || i;
        },
        Py = (e) => (t, r) => {
          let n = { elementHovered: RV(t) };
          return (
            ((r ? n.elementHovered !== r.elementHovered : n.elementHovered) &&
              e(t, n)) ||
            n
          );
        },
        CV = (e) => (t, r) => {
          let n = (0, $e.default)({}, r, { elementVisible: xV(t) });
          return (
            ((r ? n.elementVisible !== r.elementVisible : n.elementVisible) &&
              e(t, n)) ||
            n
          );
        },
        Ly =
          (e) =>
          (t, r = {}) => {
            let { stiffScrollTop: n, scrollHeight: o, innerHeight: i } = an(),
              {
                event: { config: a, eventTypeId: s },
              } = t,
              { scrollOffsetValue: c, scrollOffsetUnit: p } = a,
              E = p === "PX",
              f = o - i,
              I = Number((n / f).toFixed(2));
            if (r && r.percentTop === I) return r;
            let _ = (E ? c : (i * (c || 0)) / 100) / f,
              m,
              b,
              N = 0;
            r &&
              ((m = I > r.percentTop),
              (b = r.scrollingDown !== m),
              (N = b ? I : r.anchorTop));
            let x = s === Fy ? I >= N + _ : I <= N - _,
              P = (0, $e.default)({}, r, {
                percentTop: I,
                inBounds: x,
                anchorTop: N,
                scrollingDown: m,
              });
            return (r && x && (b || P.inBounds !== r.inBounds) && e(t, P)) || P;
          },
        NV = (e, t) =>
          e.left > t.left &&
          e.left < t.right &&
          e.top > t.top &&
          e.top < t.bottom,
        PV = (e) => (t, r) => {
          let n = { finished: document.readyState === "complete" };
          return n.finished && !(r && r.finshed) && e(t), n;
        },
        LV = (e) => (t, r) => {
          let n = { started: !0 };
          return r || e(t), n;
        },
        qy =
          (e) =>
          (t, r = { clickCount: 0 }) => {
            let n = { clickCount: (r.clickCount % 2) + 1 };
            return (n.clickCount !== r.clickCount && e(t, n)) || n;
          },
        Ni = (e = !0) =>
          (0, $e.default)({}, ky, {
            handler: at(
              e ? _t : sn,
              Hy((t, r) => (r.isActive ? un.handler(t, r) : r))
            ),
          }),
        Pi = (e = !0) =>
          (0, $e.default)({}, ky, {
            handler: at(
              e ? _t : sn,
              Hy((t, r) => (r.isActive ? r : un.handler(t, r)))
            ),
          }),
        My = (0, $e.default)({}, gs, {
          handler: CV((e, t) => {
            let { elementVisible: r } = t,
              { event: n, store: o } = e,
              { ixData: i } = o.getState(),
              { events: a } = i;
            return !a[n.action.config.autoStopEventId] && t.triggered
              ? t
              : (n.eventTypeId === Gy) === r
              ? (ze(e), (0, $e.default)({}, t, { triggered: !0 }))
              : t;
          }),
        }),
        Dy = 0.05,
        qV = {
          [fV]: Ni(),
          [dV]: Pi(),
          [lV]: Ni(),
          [cV]: Pi(),
          [gV]: Ni(!1),
          [hV]: Pi(!1),
          [pV]: Ni(),
          [vV]: Pi(),
          [TV]: { types: "ecommerce-cart-open", handler: at(_t, ze) },
          [IV]: { types: "ecommerce-cart-close", handler: at(_t, ze) },
          [nV]: {
            types: "click",
            handler: at(
              _t,
              qy((e, { clickCount: t }) => {
                wV(e) ? t === 1 && ze(e) : ze(e);
              })
            ),
          },
          [iV]: {
            types: "click",
            handler: at(
              _t,
              qy((e, { clickCount: t }) => {
                t === 2 && ze(e);
              })
            ),
          },
          [oV]: (0, $e.default)({}, un, { types: "mousedown" }),
          [aV]: (0, $e.default)({}, un, { types: "mouseup" }),
          [sV]: {
            types: Ny,
            handler: at(
              _t,
              Py((e, t) => {
                t.elementHovered && ze(e);
              })
            ),
          },
          [uV]: {
            types: Ny,
            handler: at(
              _t,
              Py((e, t) => {
                t.elementHovered || ze(e);
              })
            ),
          },
          [EV]: {
            types: "mousemove mouseout scroll",
            handler: (
              {
                store: e,
                element: t,
                eventConfig: r,
                nativeEvent: n,
                eventStateKey: o,
              },
              i = { clientX: 0, clientY: 0, pageX: 0, pageY: 0 }
            ) => {
              let {
                  basedOn: a,
                  selectedAxis: s,
                  continuousParameterGroupId: c,
                  reverse: p,
                  restingState: E = 0,
                } = r,
                {
                  clientX: f = i.clientX,
                  clientY: I = i.clientY,
                  pageX: _ = i.pageX,
                  pageY: m = i.pageY,
                } = n,
                b = s === "X_AXIS",
                N = n.type === "mouseout",
                x = E / 100,
                P = c,
                A = !1;
              switch (a) {
                case zt.EventBasedOn.VIEWPORT: {
                  x = b
                    ? Math.min(f, window.innerWidth) / window.innerWidth
                    : Math.min(I, window.innerHeight) / window.innerHeight;
                  break;
                }
                case zt.EventBasedOn.PAGE: {
                  let {
                    scrollLeft: V,
                    scrollTop: G,
                    scrollWidth: M,
                    scrollHeight: H,
                  } = an();
                  x = b ? Math.min(V + _, M) / M : Math.min(G + m, H) / H;
                  break;
                }
                case zt.EventBasedOn.ELEMENT:
                default: {
                  P = Cy(o, c);
                  let V = n.type.indexOf("mouse") === 0;
                  if (V && _t({ element: t, nativeEvent: n }) !== !0) break;
                  let G = t.getBoundingClientRect(),
                    { left: M, top: H, width: Z, height: J } = G;
                  if (!V && !NV({ left: f, top: I }, G)) break;
                  (A = !0), (x = b ? (f - M) / Z : (I - H) / J);
                  break;
                }
              }
              return (
                N && (x > 1 - Dy || x < Dy) && (x = Math.round(x)),
                (a !== zt.EventBasedOn.ELEMENT || A || A !== i.elementHovered) &&
                  ((x = p ? 1 - x : x),
                  e.dispatch((0, Ci.parameterChanged)(P, x))),
                { elementHovered: A, clientX: f, clientY: I, pageX: _, pageY: m }
              );
            },
          },
          [bV]: {
            types: hs,
            handler: ({ store: e, eventConfig: t }) => {
              let { continuousParameterGroupId: r, reverse: n } = t,
                { scrollTop: o, scrollHeight: i, clientHeight: a } = an(),
                s = o / (i - a);
              (s = n ? 1 - s : s), e.dispatch((0, Ci.parameterChanged)(r, s));
            },
          },
          [mV]: {
            types: hs,
            handler: (
              { element: e, store: t, eventConfig: r, eventStateKey: n },
              o = { scrollPercent: 0 }
            ) => {
              let {
                  scrollLeft: i,
                  scrollTop: a,
                  scrollWidth: s,
                  scrollHeight: c,
                  clientHeight: p,
                } = an(),
                {
                  basedOn: E,
                  selectedAxis: f,
                  continuousParameterGroupId: I,
                  startsEntering: _,
                  startsExiting: m,
                  addEndOffset: b,
                  addStartOffset: N,
                  addOffsetValue: x = 0,
                  endOffsetValue: P = 0,
                } = r,
                A = f === "X_AXIS";
              if (E === zt.EventBasedOn.VIEWPORT) {
                let V = A ? i / s : a / c;
                return (
                  V !== o.scrollPercent &&
                    t.dispatch((0, Ci.parameterChanged)(I, V)),
                  { scrollPercent: V }
                );
              } else {
                let V = Cy(n, I),
                  G = e.getBoundingClientRect(),
                  M = (N ? x : 0) / 100,
                  H = (b ? P : 0) / 100;
                (M = _ ? M : 1 - M), (H = m ? H : 1 - H);
                let Z = G.top + Math.min(G.height * M, p),
                  se = G.top + G.height * H - Z,
                  ne = Math.min(p + se, c),
                  O = Math.min(Math.max(0, p - Z), ne) / ne;
                return (
                  O !== o.scrollPercent &&
                    t.dispatch((0, Ci.parameterChanged)(V, O)),
                  { scrollPercent: O }
                );
              }
            },
          },
          [Gy]: My,
          [_V]: My,
          [Fy]: (0, $e.default)({}, gs, {
            handler: Ly((e, t) => {
              t.scrollingDown && ze(e);
            }),
          }),
          [yV]: (0, $e.default)({}, gs, {
            handler: Ly((e, t) => {
              t.scrollingDown || ze(e);
            }),
          }),
          [Xy]: {
            types: "readystatechange IX2_PAGE_UPDATE",
            handler: at(sn, PV(ze)),
          },
          [Uy]: {
            types: "readystatechange IX2_PAGE_UPDATE",
            handler: at(sn, LV(ze)),
          },
        };
      qi.default = qV;
    });
    var Es = u((qt) => {
      "use strict";
      var ut = rt().default,
        MV = Gt().default;
      Object.defineProperty(qt, "__esModule", { value: !0 });
      qt.observeRequests = fW;
      qt.startActionGroup = bs;
      qt.startEngine = Xi;
      qt.stopActionGroup = Ts;
      qt.stopAllActionGroups = tm;
      qt.stopEngine = Ui;
      var DV = ut(or()),
        FV = ut(cE()),
        GV = ut(Ma()),
        Lt = ut(ni()),
        XV = ut(RE()),
        UV = ut(e_()),
        VV = ut(r_()),
        WV = ut(i_()),
        cn = ut(l_()),
        BV = ut(E_()),
        st = je(),
        Yy = Kt(),
        we = bi(),
        xe = MV(T_()),
        kV = ut(jy()),
        HV = ["store", "computedStyle"],
        jV = Object.keys(st.QuickEffectIds),
        _s = (e) => jV.includes(e),
        {
          COLON_DELIMITER: ys,
          BOUNDARY_SELECTOR: Mi,
          HTML_ELEMENT: Qy,
          RENDER_GENERAL: KV,
          W_MOD_IX: Ky,
        } = st.IX2EngineConstants,
        {
          getAffectedElements: Di,
          getElementId: zV,
          getDestinationValues: ms,
          observeStore: Yt,
          getInstanceId: YV,
          renderHTMLElement: QV,
          clearAllStyles: $y,
          getMaxDurationItemIndex: $V,
          getComputedStyle: ZV,
          getInstanceOrigin: JV,
          reduceListToGroup: eW,
          shouldNamespaceEventParameter: tW,
          getNamespacedParameterId: rW,
          shouldAllowMediaQuery: Fi,
          cleanupHTMLElement: nW,
          clearObjectCache: iW,
          stringifyTarget: oW,
          mediaQueriesEqual: aW,
          shallowEqual: sW,
        } = Yy.IX2VanillaUtils,
        {
          isPluginType: Gi,
          createPluginInstance: Is,
          getPluginDuration: uW,
        } = Yy.IX2VanillaPlugins,
        zy = navigator.userAgent,
        cW = zy.match(/iPad/i) || zy.match(/iPhone/),
        lW = 12;
      function fW(e) {
        Yt({ store: e, select: ({ ixRequest: t }) => t.preview, onChange: vW }),
          Yt({
            store: e,
            select: ({ ixRequest: t }) => t.playback,
            onChange: hW,
          }),
          Yt({ store: e, select: ({ ixRequest: t }) => t.stop, onChange: gW }),
          Yt({ store: e, select: ({ ixRequest: t }) => t.clear, onChange: EW });
      }
      function dW(e) {
        Yt({
          store: e,
          select: ({ ixSession: t }) => t.mediaQueryKey,
          onChange: () => {
            Ui(e),
              $y({ store: e, elementApi: xe }),
              Xi({ store: e, allowEvents: !0 }),
              Zy();
          },
        });
      }
      function pW(e, t) {
        let r = Yt({
          store: e,
          select: ({ ixSession: n }) => n.tick,
          onChange: (n) => {
            t(n), r();
          },
        });
      }
      function vW({ rawData: e, defer: t }, r) {
        let n = () => {
          Xi({ store: r, rawData: e, allowEvents: !0 }), Zy();
        };
        t ? setTimeout(n, 0) : n();
      }
      function Zy() {
        document.dispatchEvent(new CustomEvent("IX2_PAGE_UPDATE"));
      }
      function hW(e, t) {
        let {
            actionTypeId: r,
            actionListId: n,
            actionItemId: o,
            eventId: i,
            allowEvents: a,
            immediate: s,
            testManual: c,
            verbose: p = !0,
          } = e,
          { rawData: E } = e;
        if (n && o && E && s) {
          let f = E.actionLists[n];
          f && (E = eW({ actionList: f, actionItemId: o, rawData: E }));
        }
        if (
          (Xi({ store: t, rawData: E, allowEvents: a, testManual: c }),
          (n && r === st.ActionTypeConsts.GENERAL_START_ACTION) || _s(r))
        ) {
          Ts({ store: t, actionListId: n }),
            em({ store: t, actionListId: n, eventId: i });
          let f = bs({
            store: t,
            eventId: i,
            actionListId: n,
            immediate: s,
            verbose: p,
          });
          p &&
            f &&
            t.dispatch(
              (0, we.actionListPlaybackChanged)({
                actionListId: n,
                isPlaying: !s,
              })
            );
        }
      }
      function gW({ actionListId: e }, t) {
        e ? Ts({ store: t, actionListId: e }) : tm({ store: t }), Ui(t);
      }
      function EW(e, t) {
        Ui(t), $y({ store: t, elementApi: xe });
      }
      function Xi({ store: e, rawData: t, allowEvents: r, testManual: n }) {
        let { ixSession: o } = e.getState();
        t && e.dispatch((0, we.rawDataImported)(t)),
          o.active ||
            (e.dispatch(
              (0, we.sessionInitialized)({
                hasBoundaryNodes: !!document.querySelector(Mi),
                reducedMotion:
                  document.body.hasAttribute("data-wf-ix-vacation") &&
                  window.matchMedia("(prefers-reduced-motion)").matches,
              })
            ),
            r &&
              (bW(e),
              _W(),
              e.getState().ixSession.hasDefinedMediaQueries && dW(e)),
            e.dispatch((0, we.sessionStarted)()),
            yW(e, n));
      }
      function _W() {
        let { documentElement: e } = document;
        e.className.indexOf(Ky) === -1 && (e.className += ` ${Ky}`);
      }
      function yW(e, t) {
        let r = (n) => {
          let { ixSession: o, ixParameters: i } = e.getState();
          o.active &&
            (e.dispatch((0, we.animationFrameChanged)(n, i)),
            t ? pW(e, r) : requestAnimationFrame(r));
        };
        r(window.performance.now());
      }
      function Ui(e) {
        let { ixSession: t } = e.getState();
        if (t.active) {
          let { eventListeners: r } = t;
          r.forEach(mW), iW(), e.dispatch((0, we.sessionStopped)());
        }
      }
      function mW({ target: e, listenerParams: t }) {
        e.removeEventListener.apply(e, t);
      }
      function IW({
        store: e,
        eventStateKey: t,
        eventTarget: r,
        eventId: n,
        eventConfig: o,
        actionListId: i,
        parameterGroup: a,
        smoothing: s,
        restingValue: c,
      }) {
        let { ixData: p, ixSession: E } = e.getState(),
          { events: f } = p,
          I = f[n],
          { eventTypeId: _ } = I,
          m = {},
          b = {},
          N = [],
          { continuousActionGroups: x } = a,
          { id: P } = a;
        tW(_, o) && (P = rW(t, P));
        let A = E.hasBoundaryNodes && r ? xe.getClosestElement(r, Mi) : null;
        x.forEach((V) => {
          let { keyframe: G, actionItems: M } = V;
          M.forEach((H) => {
            let { actionTypeId: Z } = H,
              { target: J } = H.config;
            if (!J) return;
            let se = J.boundaryMode ? A : null,
              ne = oW(J) + ys + Z;
            if (((b[ne] = TW(b[ne], G, H)), !m[ne])) {
              m[ne] = !0;
              let { config: U } = H;
              Di({
                config: U,
                event: I,
                eventTarget: r,
                elementRoot: se,
                elementApi: xe,
              }).forEach((O) => {
                N.push({ element: O, key: ne });
              });
            }
          });
        }),
          N.forEach(({ element: V, key: G }) => {
            let M = b[G],
              H = (0, Lt.default)(M, "[0].actionItems[0]", {}),
              { actionTypeId: Z } = H,
              J = Gi(Z) ? Is(Z)(V, H) : null,
              se = ms({ element: V, actionItem: H, elementApi: xe }, J);
            Os({
              store: e,
              element: V,
              eventId: n,
              actionListId: i,
              actionItem: H,
              destination: se,
              continuous: !0,
              parameterId: P,
              actionGroups: M,
              smoothing: s,
              restingValue: c,
              pluginInstance: J,
            });
          });
      }
      function TW(e = [], t, r) {
        let n = [...e],
          o;
        return (
          n.some((i, a) => (i.keyframe === t ? ((o = a), !0) : !1)),
          o == null && ((o = n.length), n.push({ keyframe: t, actionItems: [] })),
          n[o].actionItems.push(r),
          n
        );
      }
      function bW(e) {
        let { ixData: t } = e.getState(),
          { eventTypeMap: r } = t;
        Jy(e),
          (0, cn.default)(r, (o, i) => {
            let a = kV.default[i];
            if (!a) {
              console.warn(`IX2 event type not configured: ${i}`);
              return;
            }
            xW({ logic: a, store: e, events: o });
          });
        let { ixSession: n } = e.getState();
        n.eventListeners.length && wW(e);
      }
      var OW = ["resize", "orientationchange"];
      function wW(e) {
        let t = () => {
          Jy(e);
        };
        OW.forEach((r) => {
          window.addEventListener(r, t),
            e.dispatch((0, we.eventListenerAdded)(window, [r, t]));
        }),
          t();
      }
      function Jy(e) {
        let { ixSession: t, ixData: r } = e.getState(),
          n = window.innerWidth;
        if (n !== t.viewportWidth) {
          let { mediaQueries: o } = r;
          e.dispatch((0, we.viewportWidthChanged)({ width: n, mediaQueries: o }));
        }
      }
      var SW = (e, t) => (0, UV.default)((0, WV.default)(e, t), VV.default),
        AW = (e, t) => {
          (0, cn.default)(e, (r, n) => {
            r.forEach((o, i) => {
              let a = n + ys + i;
              t(o, n, a);
            });
          });
        },
        RW = (e) => {
          let t = { target: e.target, targets: e.targets };
          return Di({ config: t, elementApi: xe });
        };
      function xW({ logic: e, store: t, events: r }) {
        CW(r);
        let { types: n, handler: o } = e,
          { ixData: i } = t.getState(),
          { actionLists: a } = i,
          s = SW(r, RW);
        if (!(0, XV.default)(s)) return;
        (0, cn.default)(s, (f, I) => {
          let _ = r[I],
            { action: m, id: b, mediaQueries: N = i.mediaQueryKeys } = _,
            { actionListId: x } = m.config;
          aW(N, i.mediaQueryKeys) || t.dispatch((0, we.mediaQueriesDefined)()),
            m.actionTypeId === st.ActionTypeConsts.GENERAL_CONTINUOUS_ACTION &&
              (Array.isArray(_.config) ? _.config : [_.config]).forEach((A) => {
                let { continuousParameterGroupId: V } = A,
                  G = (0, Lt.default)(a, `${x}.continuousParameterGroups`, []),
                  M = (0, GV.default)(G, ({ id: J }) => J === V),
                  H = (A.smoothing || 0) / 100,
                  Z = (A.restingState || 0) / 100;
                M &&
                  f.forEach((J, se) => {
                    let ne = b + ys + se;
                    IW({
                      store: t,
                      eventStateKey: ne,
                      eventTarget: J,
                      eventId: b,
                      eventConfig: A,
                      actionListId: x,
                      parameterGroup: M,
                      smoothing: H,
                      restingValue: Z,
                    });
                  });
              }),
            (m.actionTypeId === st.ActionTypeConsts.GENERAL_START_ACTION ||
              _s(m.actionTypeId)) &&
              em({ store: t, actionListId: x, eventId: b });
        });
        let c = (f) => {
            let { ixSession: I } = t.getState();
            AW(s, (_, m, b) => {
              let N = r[m],
                x = I.eventState[b],
                { action: P, mediaQueries: A = i.mediaQueryKeys } = N;
              if (!Fi(A, I.mediaQueryKey)) return;
              let V = (G = {}) => {
                let M = o(
                  {
                    store: t,
                    element: _,
                    event: N,
                    eventConfig: G,
                    nativeEvent: f,
                    eventStateKey: b,
                  },
                  x
                );
                sW(M, x) || t.dispatch((0, we.eventStateChanged)(b, M));
              };
              P.actionTypeId === st.ActionTypeConsts.GENERAL_CONTINUOUS_ACTION
                ? (Array.isArray(N.config) ? N.config : [N.config]).forEach(V)
                : V();
            });
          },
          p = (0, BV.default)(c, lW),
          E = ({ target: f = document, types: I, throttle: _ }) => {
            I.split(" ")
              .filter(Boolean)
              .forEach((m) => {
                let b = _ ? p : c;
                f.addEventListener(m, b),
                  t.dispatch((0, we.eventListenerAdded)(f, [m, b]));
              });
          };
        Array.isArray(n) ? n.forEach(E) : typeof n == "string" && E(e);
      }
      function CW(e) {
        if (!cW) return;
        let t = {},
          r = "";
        for (let n in e) {
          let { eventTypeId: o, target: i } = e[n],
            a = xe.getQuerySelector(i);
          t[a] ||
            ((o === st.EventTypeConsts.MOUSE_CLICK ||
              o === st.EventTypeConsts.MOUSE_SECOND_CLICK) &&
              ((t[a] = !0),
              (r += a + "{cursor: pointer;touch-action: manipulation;}")));
        }
        if (r) {
          let n = document.createElement("style");
          (n.textContent = r), document.body.appendChild(n);
        }
      }
      function em({ store: e, actionListId: t, eventId: r }) {
        let { ixData: n, ixSession: o } = e.getState(),
          { actionLists: i, events: a } = n,
          s = a[r],
          c = i[t];
        if (c && c.useFirstGroupAsInitialState) {
          let p = (0, Lt.default)(c, "actionItemGroups[0].actionItems", []),
            E = (0, Lt.default)(s, "mediaQueries", n.mediaQueryKeys);
          if (!Fi(E, o.mediaQueryKey)) return;
          p.forEach((f) => {
            var I;
            let { config: _, actionTypeId: m } = f,
              b =
                (_ == null || (I = _.target) === null || I === void 0
                  ? void 0
                  : I.useEventTarget) === !0
                  ? { target: s.target, targets: s.targets }
                  : _,
              N = Di({ config: b, event: s, elementApi: xe }),
              x = Gi(m);
            N.forEach((P) => {
              let A = x ? Is(m)(P, f) : null;
              Os({
                destination: ms({ element: P, actionItem: f, elementApi: xe }, A),
                immediate: !0,
                store: e,
                element: P,
                eventId: r,
                actionItem: f,
                actionListId: t,
                pluginInstance: A,
              });
            });
          });
        }
      }
      function tm({ store: e }) {
        let { ixInstances: t } = e.getState();
        (0, cn.default)(t, (r) => {
          if (!r.continuous) {
            let { actionListId: n, verbose: o } = r;
            ws(r, e),
              o &&
                e.dispatch(
                  (0, we.actionListPlaybackChanged)({
                    actionListId: n,
                    isPlaying: !1,
                  })
                );
          }
        });
      }
      function Ts({
        store: e,
        eventId: t,
        eventTarget: r,
        eventStateKey: n,
        actionListId: o,
      }) {
        let { ixInstances: i, ixSession: a } = e.getState(),
          s = a.hasBoundaryNodes && r ? xe.getClosestElement(r, Mi) : null;
        (0, cn.default)(i, (c) => {
          let p = (0, Lt.default)(c, "actionItem.config.target.boundaryMode"),
            E = n ? c.eventStateKey === n : !0;
          if (c.actionListId === o && c.eventId === t && E) {
            if (s && p && !xe.elementContains(s, c.element)) return;
            ws(c, e),
              c.verbose &&
                e.dispatch(
                  (0, we.actionListPlaybackChanged)({
                    actionListId: o,
                    isPlaying: !1,
                  })
                );
          }
        });
      }
      function bs({
        store: e,
        eventId: t,
        eventTarget: r,
        eventStateKey: n,
        actionListId: o,
        groupIndex: i = 0,
        immediate: a,
        verbose: s,
      }) {
        var c;
        let { ixData: p, ixSession: E } = e.getState(),
          { events: f } = p,
          I = f[t] || {},
          { mediaQueries: _ = p.mediaQueryKeys } = I,
          m = (0, Lt.default)(p, `actionLists.${o}`, {}),
          { actionItemGroups: b, useFirstGroupAsInitialState: N } = m;
        if (!b || !b.length) return !1;
        i >= b.length && (0, Lt.default)(I, "config.loop") && (i = 0),
          i === 0 && N && i++;
        let P =
            (i === 0 || (i === 1 && N)) &&
            _s((c = I.action) === null || c === void 0 ? void 0 : c.actionTypeId)
              ? I.config.delay
              : void 0,
          A = (0, Lt.default)(b, [i, "actionItems"], []);
        if (!A.length || !Fi(_, E.mediaQueryKey)) return !1;
        let V = E.hasBoundaryNodes && r ? xe.getClosestElement(r, Mi) : null,
          G = $V(A),
          M = !1;
        return (
          A.forEach((H, Z) => {
            let { config: J, actionTypeId: se } = H,
              ne = Gi(se),
              { target: U } = J;
            if (!U) return;
            let O = U.boundaryMode ? V : null;
            Di({
              config: J,
              event: I,
              eventTarget: r,
              elementRoot: O,
              elementApi: xe,
            }).forEach((F, X) => {
              let ee = ne ? Is(se)(F, H) : null,
                ie = ne ? uW(se)(F, H) : null;
              M = !0;
              let D = G === Z && X === 0,
                B = ZV({ element: F, actionItem: H }),
                v = ms({ element: F, actionItem: H, elementApi: xe }, ee);
              Os({
                store: e,
                element: F,
                actionItem: H,
                eventId: t,
                eventTarget: r,
                eventStateKey: n,
                actionListId: o,
                groupIndex: i,
                isCarrier: D,
                computedStyle: B,
                destination: v,
                immediate: a,
                verbose: s,
                pluginInstance: ee,
                pluginDuration: ie,
                instanceDelay: P,
              });
            });
          }),
          M
        );
      }
      function Os(e) {
        var t;
        let { store: r, computedStyle: n } = e,
          o = (0, FV.default)(e, HV),
          {
            element: i,
            actionItem: a,
            immediate: s,
            pluginInstance: c,
            continuous: p,
            restingValue: E,
            eventId: f,
          } = o,
          I = !p,
          _ = YV(),
          { ixElements: m, ixSession: b, ixData: N } = r.getState(),
          x = zV(m, i),
          { refState: P } = m[x] || {},
          A = xe.getRefType(i),
          V = b.reducedMotion && st.ReducedMotionTypes[a.actionTypeId],
          G;
        if (V && p)
          switch (
            (t = N.events[f]) === null || t === void 0 ? void 0 : t.eventTypeId
          ) {
            case st.EventTypeConsts.MOUSE_MOVE:
            case st.EventTypeConsts.MOUSE_MOVE_IN_VIEWPORT:
              G = E;
              break;
            default:
              G = 0.5;
              break;
          }
        let M = JV(i, P, n, a, xe, c);
        if (
          (r.dispatch(
            (0, we.instanceAdded)(
              (0, DV.default)(
                {
                  instanceId: _,
                  elementId: x,
                  origin: M,
                  refType: A,
                  skipMotion: V,
                  skipToValue: G,
                },
                o
              )
            )
          ),
          rm(document.body, "ix2-animation-started", _),
          s)
        ) {
          NW(r, _);
          return;
        }
        Yt({ store: r, select: ({ ixInstances: H }) => H[_], onChange: nm }),
          I && r.dispatch((0, we.instanceStarted)(_, b.tick));
      }
      function ws(e, t) {
        rm(document.body, "ix2-animation-stopping", {
          instanceId: e.id,
          state: t.getState(),
        });
        let { elementId: r, actionItem: n } = e,
          { ixElements: o } = t.getState(),
          { ref: i, refType: a } = o[r] || {};
        a === Qy && nW(i, n, xe), t.dispatch((0, we.instanceRemoved)(e.id));
      }
      function rm(e, t, r) {
        let n = document.createEvent("CustomEvent");
        n.initCustomEvent(t, !0, !0, r), e.dispatchEvent(n);
      }
      function NW(e, t) {
        let { ixParameters: r } = e.getState();
        e.dispatch((0, we.instanceStarted)(t, 0)),
          e.dispatch((0, we.animationFrameChanged)(performance.now(), r));
        let { ixInstances: n } = e.getState();
        nm(n[t], e);
      }
      function nm(e, t) {
        let {
            active: r,
            continuous: n,
            complete: o,
            elementId: i,
            actionItem: a,
            actionTypeId: s,
            renderType: c,
            current: p,
            groupIndex: E,
            eventId: f,
            eventTarget: I,
            eventStateKey: _,
            actionListId: m,
            isCarrier: b,
            styleProp: N,
            verbose: x,
            pluginInstance: P,
          } = e,
          { ixData: A, ixSession: V } = t.getState(),
          { events: G } = A,
          M = G[f] || {},
          { mediaQueries: H = A.mediaQueryKeys } = M;
        if (Fi(H, V.mediaQueryKey) && (n || r || o)) {
          if (p || (c === KV && o)) {
            t.dispatch((0, we.elementStateChanged)(i, s, p, a));
            let { ixElements: Z } = t.getState(),
              { ref: J, refType: se, refState: ne } = Z[i] || {},
              U = ne && ne[s];
            (se === Qy || Gi(s)) && QV(J, ne, U, f, a, N, xe, c, P);
          }
          if (o) {
            if (b) {
              let Z = bs({
                store: t,
                eventId: f,
                eventTarget: I,
                eventStateKey: _,
                actionListId: m,
                groupIndex: E + 1,
                verbose: x,
              });
              x &&
                !Z &&
                t.dispatch(
                  (0, we.actionListPlaybackChanged)({
                    actionListId: m,
                    isPlaying: !1,
                  })
                );
            }
            ws(e, t);
          }
        }
      }
    });
    var om = u((Ot) => {
      "use strict";
      var PW = Gt().default,
        LW = rt().default;
      Object.defineProperty(Ot, "__esModule", { value: !0 });
      Ot.actions = void 0;
      Ot.destroy = im;
      Ot.init = GW;
      Ot.setEnv = FW;
      Ot.store = void 0;
      Bl();
      var qW = ea(),
        MW = LW(uE()),
        Ss = Es(),
        DW = PW(bi());
      Ot.actions = DW;
      var Vi = (0, qW.createStore)(MW.default);
      Ot.store = Vi;
      function FW(e) {
        e() && (0, Ss.observeRequests)(Vi);
      }
      function GW(e) {
        im(), (0, Ss.startEngine)({ store: Vi, rawData: e, allowEvents: !0 });
      }
      function im() {
        (0, Ss.stopEngine)(Vi);
      }
    });
    var cm = u((jK, um) => {
      var am = Ye(),
        sm = om();
      sm.setEnv(am.env);
      am.define(
        "ix2",
        (um.exports = function () {
          return sm;
        })
      );
    });
    var fm = u((KK, lm) => {
      var Sr = Ye();
      Sr.define(
        "links",
        (lm.exports = function (e, t) {
          var r = {},
            n = e(window),
            o,
            i = Sr.env(),
            a = window.location,
            s = document.createElement("a"),
            c = "w--current",
            p = /index\.(html|php)$/,
            E = /\/$/,
            f,
            I;
          r.ready = r.design = r.preview = _;
          function _() {
            (o = i && Sr.env("design")),
              (I = Sr.env("slug") || a.pathname || ""),
              Sr.scroll.off(b),
              (f = []);
            for (var x = document.links, P = 0; P < x.length; ++P) m(x[P]);
            f.length && (Sr.scroll.on(b), b());
          }
          function m(x) {
            var P =
              (o && x.getAttribute("href-disabled")) || x.getAttribute("href");
            if (((s.href = P), !(P.indexOf(":") >= 0))) {
              var A = e(x);
              if (
                s.hash.length > 1 &&
                s.host + s.pathname === a.host + a.pathname
              ) {
                if (!/^#[a-zA-Z0-9\-\_]+$/.test(s.hash)) return;
                var V = e(s.hash);
                V.length && f.push({ link: A, sec: V, active: !1 });
                return;
              }
              if (!(P === "#" || P === "")) {
                var G = s.href === a.href || P === I || (p.test(P) && E.test(I));
                N(A, c, G);
              }
            }
          }
          function b() {
            var x = n.scrollTop(),
              P = n.height();
            t.each(f, function (A) {
              var V = A.link,
                G = A.sec,
                M = G.offset().top,
                H = G.outerHeight(),
                Z = P * 0.5,
                J = G.is(":visible") && M + H - Z >= x && M + Z <= x + P;
              A.active !== J && ((A.active = J), N(V, c, J));
            });
          }
          function N(x, P, A) {
            var V = x.hasClass(P);
            (A && V) || (!A && !V) || (A ? x.addClass(P) : x.removeClass(P));
          }
          return r;
        })
      );
    });
    var pm = u((zK, dm) => {
      var Wi = Ye();
      Wi.define(
        "scroll",
        (dm.exports = function (e) {
          var t = {
              WF_CLICK_EMPTY: "click.wf-empty-link",
              WF_CLICK_SCROLL: "click.wf-scroll",
            },
            r = window.location,
            n = m() ? null : window.history,
            o = e(window),
            i = e(document),
            a = e(document.body),
            s =
              window.requestAnimationFrame ||
              window.mozRequestAnimationFrame ||
              window.webkitRequestAnimationFrame ||
              function (U) {
                window.setTimeout(U, 15);
              },
            c = Wi.env("editor") ? ".w-editor-body" : "body",
            p =
              "header, " +
              c +
              " > .header, " +
              c +
              " > .w-nav:not([data-no-scroll])",
            E = 'a[href="#"]',
            f = 'a[href*="#"]:not(.w-tab-link):not(' + E + ")",
            I = '.wf-force-outline-none[tabindex="-1"]:focus{outline:none;}',
            _ = document.createElement("style");
          _.appendChild(document.createTextNode(I));
          function m() {
            try {
              return !!window.frameElement;
            } catch {
              return !0;
            }
          }
          var b = /^#[a-zA-Z0-9][\w:.-]*$/;
          function N(U) {
            return b.test(U.hash) && U.host + U.pathname === r.host + r.pathname;
          }
          let x =
            typeof window.matchMedia == "function" &&
            window.matchMedia("(prefers-reduced-motion: reduce)");
          function P() {
            return (
              document.body.getAttribute("data-wf-scroll-motion") === "none" ||
              x.matches
            );
          }
          function A(U, O) {
            var q;
            switch (O) {
              case "add":
                (q = U.attr("tabindex")),
                  q
                    ? U.attr("data-wf-tabindex-swap", q)
                    : U.attr("tabindex", "-1");
                break;
              case "remove":
                (q = U.attr("data-wf-tabindex-swap")),
                  q
                    ? (U.attr("tabindex", q),
                      U.removeAttr("data-wf-tabindex-swap"))
                    : U.removeAttr("tabindex");
                break;
            }
            U.toggleClass("wf-force-outline-none", O === "add");
          }
          function V(U) {
            var O = U.currentTarget;
            if (
              !(
                Wi.env("design") ||
                (window.$.mobile && /(?:^|\s)ui-link(?:$|\s)/.test(O.className))
              )
            ) {
              var q = N(O) ? O.hash : "";
              if (q !== "") {
                var F = e(q);
                F.length &&
                  (U && (U.preventDefault(), U.stopPropagation()),
                  G(q, U),
                  window.setTimeout(
                    function () {
                      M(F, function () {
                        A(F, "add"),
                          F.get(0).focus({ preventScroll: !0 }),
                          A(F, "remove");
                      });
                    },
                    U ? 0 : 300
                  ));
              }
            }
          }
          function G(U) {
            if (
              r.hash !== U &&
              n &&
              n.pushState &&
              !(Wi.env.chrome && r.protocol === "file:")
            ) {
              var O = n.state && n.state.hash;
              O !== U && n.pushState({ hash: U }, "", U);
            }
          }
          function M(U, O) {
            var q = o.scrollTop(),
              F = H(U);
            if (q !== F) {
              var X = Z(U, q, F),
                ee = Date.now(),
                ie = function () {
                  var D = Date.now() - ee;
                  window.scroll(0, J(q, F, D, X)),
                    D <= X ? s(ie) : typeof O == "function" && O();
                };
              s(ie);
            }
          }
          function H(U) {
            var O = e(p),
              q = O.css("position") === "fixed" ? O.outerHeight() : 0,
              F = U.offset().top - q;
            if (U.data("scroll") === "mid") {
              var X = o.height() - q,
                ee = U.outerHeight();
              ee < X && (F -= Math.round((X - ee) / 2));
            }
            return F;
          }
          function Z(U, O, q) {
            if (P()) return 0;
            var F = 1;
            return (
              a.add(U).each(function (X, ee) {
                var ie = parseFloat(ee.getAttribute("data-scroll-time"));
                !isNaN(ie) && ie >= 0 && (F = ie);
              }),
              (472.143 * Math.log(Math.abs(O - q) + 125) - 2e3) * F
            );
          }
          function J(U, O, q, F) {
            return q > F ? O : U + (O - U) * se(q / F);
          }
          function se(U) {
            return U < 0.5
              ? 4 * U * U * U
              : (U - 1) * (2 * U - 2) * (2 * U - 2) + 1;
          }
          function ne() {
            var { WF_CLICK_EMPTY: U, WF_CLICK_SCROLL: O } = t;
            i.on(O, f, V),
              i.on(U, E, function (q) {
                q.preventDefault();
              }),
              document.head.insertBefore(_, document.head.firstChild);
          }
          return { ready: ne };
        })
      );
    });
    var hm = u((YK, vm) => {
      var XW = Ye();
      XW.define(
        "touch",
        (vm.exports = function (e) {
          var t = {},
            r = window.getSelection;
          (e.event.special.tap = { bindType: "click", delegateType: "click" }),
            (t.init = function (i) {
              return (
                (i = typeof i == "string" ? e(i).get(0) : i), i ? new n(i) : null
              );
            });
          function n(i) {
            var a = !1,
              s = !1,
              c = Math.min(Math.round(window.innerWidth * 0.04), 40),
              p,
              E;
            i.addEventListener("touchstart", f, !1),
              i.addEventListener("touchmove", I, !1),
              i.addEventListener("touchend", _, !1),
              i.addEventListener("touchcancel", m, !1),
              i.addEventListener("mousedown", f, !1),
              i.addEventListener("mousemove", I, !1),
              i.addEventListener("mouseup", _, !1),
              i.addEventListener("mouseout", m, !1);
            function f(N) {
              var x = N.touches;
              (x && x.length > 1) ||
                ((a = !0),
                x ? ((s = !0), (p = x[0].clientX)) : (p = N.clientX),
                (E = p));
            }
            function I(N) {
              if (a) {
                if (s && N.type === "mousemove") {
                  N.preventDefault(), N.stopPropagation();
                  return;
                }
                var x = N.touches,
                  P = x ? x[0].clientX : N.clientX,
                  A = P - E;
                (E = P),
                  Math.abs(A) > c &&
                    r &&
                    String(r()) === "" &&
                    (o("swipe", N, { direction: A > 0 ? "right" : "left" }), m());
              }
            }
            function _(N) {
              if (a && ((a = !1), s && N.type === "mouseup")) {
                N.preventDefault(), N.stopPropagation(), (s = !1);
                return;
              }
            }
            function m() {
              a = !1;
            }
            function b() {
              i.removeEventListener("touchstart", f, !1),
                i.removeEventListener("touchmove", I, !1),
                i.removeEventListener("touchend", _, !1),
                i.removeEventListener("touchcancel", m, !1),
                i.removeEventListener("mousedown", f, !1),
                i.removeEventListener("mousemove", I, !1),
                i.removeEventListener("mouseup", _, !1),
                i.removeEventListener("mouseout", m, !1),
                (i = null);
            }
            this.destroy = b;
          }
          function o(i, a, s) {
            var c = e.Event(i, { originalEvent: a });
            e(a.target).trigger(c, s);
          }
          return (t.instance = t.init(document)), t;
        })
      );
    });
    var Em = u((QK, gm) => {
      var As = Ye();
      As.define(
        "forms",
        (gm.exports = function (e, t) {
          var r = {},
            n = e(document),
            o,
            i = window.location,
            a = window.XDomainRequest && !window.atob,
            s = ".w-form",
            c,
            p = /e(-)?mail/i,
            E = /^\S+@\S+$/,
            f = window.alert,
            I = As.env(),
            _,
            m,
            b,
            N = /list-manage[1-9]?.com/i,
            x = t.debounce(function () {
              f(
                "Oops! This page has improperly configured forms. Please contact your website administrator to fix this issue."
              );
            }, 100);
          r.ready =
            r.design =
            r.preview =
              function () {
                P(), !I && !_ && V();
              };
          function P() {
            (c = e("html").attr("data-wf-site")),
              (m = "https://webflow.com/api/v1/form/" + c),
              a &&
                m.indexOf("https://webflow.com") >= 0 &&
                (m = m.replace(
                  "https://webflow.com",
                  "https://formdata.webflow.com"
                )),
              (b = `${m}/signFile`),
              (o = e(s + " form")),
              o.length && o.each(A);
          }
          function A(D, B) {
            var v = e(B),
              d = e.data(B, s);
            d || (d = e.data(B, s, { form: v })), G(d);
            var h = v.closest("div.w-form");
            (d.done = h.find("> .w-form-done")),
              (d.fail = h.find("> .w-form-fail")),
              (d.fileUploads = h.find(".w-file-upload")),
              d.fileUploads.each(function (Y) {
                X(Y, d);
              });
            var g =
              d.form.attr("aria-label") || d.form.attr("data-name") || "Form";
            d.done.attr("aria-label") || d.form.attr("aria-label", g),
              d.done.attr("tabindex", "-1"),
              d.done.attr("role", "region"),
              d.done.attr("aria-label") ||
                d.done.attr("aria-label", g + " success"),
              d.fail.attr("tabindex", "-1"),
              d.fail.attr("role", "region"),
              d.fail.attr("aria-label") ||
                d.fail.attr("aria-label", g + " failure");
            var k = (d.action = v.attr("action"));
            if (
              ((d.handler = null),
              (d.redirect = v.attr("data-redirect")),
              N.test(k))
            ) {
              d.handler = O;
              return;
            }
            if (!k) {
              if (c) {
                d.handler = U;
                return;
              }
              x();
            }
          }
          function V() {
            (_ = !0),
              n.on("submit", s + " form", function (Y) {
                var z = e.data(this, s);
                z.handler && ((z.evt = Y), z.handler(z));
              });
            let D = ".w-checkbox-input",
              B = ".w-radio-input",
              v = "w--redirected-checked",
              d = "w--redirected-focus",
              h = "w--redirected-focus-visible",
              g = ":focus-visible, [data-wf-focus-visible]",
              k = [
                ["checkbox", D],
                ["radio", B],
              ];
            n.on(
              "change",
              s + ' form input[type="checkbox"]:not(' + D + ")",
              (Y) => {
                e(Y.target).siblings(D).toggleClass(v);
              }
            ),
              n.on("change", s + ' form input[type="radio"]', (Y) => {
                e(`input[name="${Y.target.name}"]:not(${D})`).map((te, ge) =>
                  e(ge).siblings(B).removeClass(v)
                );
                let z = e(Y.target);
                z.hasClass("w-radio-input") || z.siblings(B).addClass(v);
              }),
              k.forEach(([Y, z]) => {
                n.on(
                  "focus",
                  s + ` form input[type="${Y}"]:not(` + z + ")",
                  (te) => {
                    e(te.target).siblings(z).addClass(d),
                      e(te.target).filter(g).siblings(z).addClass(h);
                  }
                ),
                  n.on(
                    "blur",
                    s + ` form input[type="${Y}"]:not(` + z + ")",
                    (te) => {
                      e(te.target).siblings(z).removeClass(`${d} ${h}`);
                    }
                  );
              });
          }
          function G(D) {
            var B = (D.btn = D.form.find(':input[type="submit"]'));
            (D.wait = D.btn.attr("data-wait") || null),
              (D.success = !1),
              B.prop("disabled", !1),
              D.label && B.val(D.label);
          }
          function M(D) {
            var B = D.btn,
              v = D.wait;
            B.prop("disabled", !0), v && ((D.label = B.val()), B.val(v));
          }
          function H(D, B) {
            var v = null;
            return (
              (B = B || {}),
              D.find(':input:not([type="submit"]):not([type="file"])').each(
                function (d, h) {
                  var g = e(h),
                    k = g.attr("type"),
                    Y =
                      g.attr("data-name") || g.attr("name") || "Field " + (d + 1),
                    z = g.val();
                  if (k === "checkbox") z = g.is(":checked");
                  else if (k === "radio") {
                    if (B[Y] === null || typeof B[Y] == "string") return;
                    z =
                      D.find(
                        'input[name="' + g.attr("name") + '"]:checked'
                      ).val() || null;
                  }
                  typeof z == "string" && (z = e.trim(z)),
                    (B[Y] = z),
                    (v = v || ne(g, k, Y, z));
                }
              ),
              v
            );
          }
          function Z(D) {
            var B = {};
            return (
              D.find(':input[type="file"]').each(function (v, d) {
                var h = e(d),
                  g = h.attr("data-name") || h.attr("name") || "File " + (v + 1),
                  k = h.attr("data-value");
                typeof k == "string" && (k = e.trim(k)), (B[g] = k);
              }),
              B
            );
          }
          let J = { _mkto_trk: "marketo" };
          function se() {
            return document.cookie.split("; ").reduce(function (B, v) {
              let d = v.split("="),
                h = d[0];
              if (h in J) {
                let g = J[h],
                  k = d.slice(1).join("=");
                B[g] = k;
              }
              return B;
            }, {});
          }
          function ne(D, B, v, d) {
            var h = null;
            return (
              B === "password"
                ? (h = "Passwords cannot be submitted.")
                : D.attr("required")
                ? d
                  ? p.test(D.attr("type")) &&
                    (E.test(d) ||
                      (h = "Please enter a valid email address for: " + v))
                  : (h = "Please fill out the required field: " + v)
                : v === "g-recaptcha-response" &&
                  !d &&
                  (h = "Please confirm you\u2019re not a robot."),
              h
            );
          }
          function U(D) {
            F(D), q(D);
          }
          function O(D) {
            G(D);
            var B = D.form,
              v = {};
            if (/^https/.test(i.href) && !/^https/.test(D.action)) {
              B.attr("method", "post");
              return;
            }
            F(D);
            var d = H(B, v);
            if (d) return f(d);
            M(D);
            var h;
            t.each(v, function (z, te) {
              p.test(te) && (v.EMAIL = z),
                /^((full[ _-]?)?name)$/i.test(te) && (h = z),
                /^(first[ _-]?name)$/i.test(te) && (v.FNAME = z),
                /^(last[ _-]?name)$/i.test(te) && (v.LNAME = z);
            }),
              h &&
                !v.FNAME &&
                ((h = h.split(" ")),
                (v.FNAME = h[0]),
                (v.LNAME = v.LNAME || h[1]));
            var g = D.action.replace("/post?", "/post-json?") + "&c=?",
              k = g.indexOf("u=") + 2;
            k = g.substring(k, g.indexOf("&", k));
            var Y = g.indexOf("id=") + 3;
            (Y = g.substring(Y, g.indexOf("&", Y))),
              (v["b_" + k + "_" + Y] = ""),
              e
                .ajax({ url: g, data: v, dataType: "jsonp" })
                .done(function (z) {
                  (D.success = z.result === "success" || /already/.test(z.msg)),
                    D.success || console.info("MailChimp error: " + z.msg),
                    q(D);
                })
                .fail(function () {
                  q(D);
                });
          }
          function q(D) {
            var B = D.form,
              v = D.redirect,
              d = D.success;
            if (d && v) {
              As.location(v);
              return;
            }
            D.done.toggle(d),
              D.fail.toggle(!d),
              d ? D.done.focus() : D.fail.focus(),
              B.toggle(!d),
              G(D);
          }
          function F(D) {
            D.evt && D.evt.preventDefault(), (D.evt = null);
          }
          function X(D, B) {
            if (!B.fileUploads || !B.fileUploads[D]) return;
            var v,
              d = e(B.fileUploads[D]),
              h = d.find("> .w-file-upload-default"),
              g = d.find("> .w-file-upload-uploading"),
              k = d.find("> .w-file-upload-success"),
              Y = d.find("> .w-file-upload-error"),
              z = h.find(".w-file-upload-input"),
              te = h.find(".w-file-upload-label"),
              ge = te.children(),
              ae = Y.find(".w-file-upload-error-msg"),
              y = k.find(".w-file-upload-file"),
              W = k.find(".w-file-remove-link"),
              Q = y.find(".w-file-upload-file-name"),
              j = ae.attr("data-w-size-error"),
              ve = ae.attr("data-w-type-error"),
              Ce = ae.attr("data-w-generic-error");
            if (
              (I ||
                te.on("click keydown", function (w) {
                  (w.type === "keydown" && w.which !== 13 && w.which !== 32) ||
                    (w.preventDefault(), z.click());
                }),
              te.find(".w-icon-file-upload-icon").attr("aria-hidden", "true"),
              W.find(".w-icon-file-upload-remove").attr("aria-hidden", "true"),
              I)
            )
              z.on("click", function (w) {
                w.preventDefault();
              }),
                te.on("click", function (w) {
                  w.preventDefault();
                }),
                ge.on("click", function (w) {
                  w.preventDefault();
                });
            else {
              W.on("click keydown", function (w) {
                if (w.type === "keydown") {
                  if (w.which !== 13 && w.which !== 32) return;
                  w.preventDefault();
                }
                z.removeAttr("data-value"),
                  z.val(""),
                  Q.html(""),
                  h.toggle(!0),
                  k.toggle(!1),
                  te.focus();
              }),
                z.on("change", function (w) {
                  (v = w.target && w.target.files && w.target.files[0]),
                    v &&
                      (h.toggle(!1),
                      Y.toggle(!1),
                      g.toggle(!0),
                      g.focus(),
                      Q.text(v.name),
                      R() || M(B),
                      (B.fileUploads[D].uploading = !0),
                      ee(v, T));
                });
              var Xe = te.outerHeight();
              z.height(Xe), z.width(1);
            }
            function l(w) {
              var C = w.responseJSON && w.responseJSON.msg,
                re = Ce;
              typeof C == "string" && C.indexOf("InvalidFileTypeError") === 0
                ? (re = ve)
                : typeof C == "string" &&
                  C.indexOf("MaxFileSizeError") === 0 &&
                  (re = j),
                ae.text(re),
                z.removeAttr("data-value"),
                z.val(""),
                g.toggle(!1),
                h.toggle(!0),
                Y.toggle(!0),
                Y.focus(),
                (B.fileUploads[D].uploading = !1),
                R() || G(B);
            }
            function T(w, C) {
              if (w) return l(w);
              var re = C.fileName,
                ue = C.postData,
                me = C.fileId,
                K = C.s3Url;
              z.attr("data-value", me), ie(K, ue, v, re, S);
            }
            function S(w) {
              if (w) return l(w);
              g.toggle(!1),
                k.css("display", "inline-block"),
                k.focus(),
                (B.fileUploads[D].uploading = !1),
                R() || G(B);
            }
            function R() {
              var w = (B.fileUploads && B.fileUploads.toArray()) || [];
              return w.some(function (C) {
                return C.uploading;
              });
            }
          }
          function ee(D, B) {
            var v = new URLSearchParams({ name: D.name, size: D.size });
            e.ajax({ type: "GET", url: `${b}?${v}`, crossDomain: !0 })
              .done(function (d) {
                B(null, d);
              })
              .fail(function (d) {
                B(d);
              });
          }
          function ie(D, B, v, d, h) {
            var g = new FormData();
            for (var k in B) g.append(k, B[k]);
            g.append("file", v, d),
              e
                .ajax({
                  type: "POST",
                  url: D,
                  data: g,
                  processData: !1,
                  contentType: !1,
                })
                .done(function () {
                  h(null);
                })
                .fail(function (Y) {
                  h(Y);
                });
          }
          return r;
        })
      );
    });
    var mm = u(($K, ym) => {
      var Rs = Ye(),
        _m = "w-condition-invisible",
        UW = "." + _m;
      function VW(e) {
        return e.filter(function (t) {
          return !fn(t);
        });
      }
      function fn(e) {
        return !!(e.$el && e.$el.closest(UW).length);
      }
      function xs(e, t) {
        for (var r = e; r >= 0; r--) if (!fn(t[r])) return r;
        return -1;
      }
      function Cs(e, t) {
        for (var r = e; r <= t.length - 1; r++) if (!fn(t[r])) return r;
        return -1;
      }
      function WW(e, t) {
        return xs(e - 1, t) === -1;
      }
      function BW(e, t) {
        return Cs(e + 1, t) === -1;
      }
      function ln(e, t) {
        e.attr("aria-label") || e.attr("aria-label", t);
      }
      function kW(e, t, r, n) {
        var o = r.tram,
          i = Array.isArray,
          a = "w-lightbox",
          s = a + "-",
          c = /(^|\s+)/g,
          p = [],
          E,
          f,
          I,
          _ = [];
        function m(d, h) {
          return (
            (p = i(d) ? d : [d]),
            f || m.build(),
            VW(p).length > 1 &&
              ((f.items = f.empty),
              p.forEach(function (g, k) {
                var Y = B("thumbnail"),
                  z = B("item")
                    .prop("tabIndex", 0)
                    .attr("aria-controls", "w-lightbox-view")
                    .attr("role", "tab")
                    .append(Y);
                ln(z, `show item ${k + 1} of ${p.length}`),
                  fn(g) && z.addClass(_m),
                  (f.items = f.items.add(z)),
                  se(g.thumbnailUrl || g.url, function (te) {
                    te.prop("width") > te.prop("height")
                      ? X(te, "wide")
                      : X(te, "tall"),
                      Y.append(X(te, "thumbnail-image"));
                  });
              }),
              f.strip.empty().append(f.items),
              X(f.content, "group")),
            o(ee(f.lightbox, "hide").trigger("focus"))
              .add("opacity .3s")
              .start({ opacity: 1 }),
            X(f.html, "noscroll"),
            m.show(h || 0)
          );
        }
        (m.build = function () {
          return (
            m.destroy(),
            (f = { html: r(t.documentElement), empty: r() }),
            (f.arrowLeft = B("control left inactive")
              .attr("role", "button")
              .attr("aria-hidden", !0)
              .attr("aria-controls", "w-lightbox-view")),
            (f.arrowRight = B("control right inactive")
              .attr("role", "button")
              .attr("aria-hidden", !0)
              .attr("aria-controls", "w-lightbox-view")),
            (f.close = B("control close").attr("role", "button")),
            ln(f.arrowLeft, "previous image"),
            ln(f.arrowRight, "next image"),
            ln(f.close, "close lightbox"),
            (f.spinner = B("spinner")
              .attr("role", "progressbar")
              .attr("aria-live", "polite")
              .attr("aria-hidden", !1)
              .attr("aria-busy", !0)
              .attr("aria-valuemin", 0)
              .attr("aria-valuemax", 100)
              .attr("aria-valuenow", 0)
              .attr("aria-valuetext", "Loading image")),
            (f.strip = B("strip").attr("role", "tablist")),
            (I = new O(f.spinner, q("hide"))),
            (f.content = B("content").append(
              f.spinner,
              f.arrowLeft,
              f.arrowRight,
              f.close
            )),
            (f.container = B("container").append(f.content, f.strip)),
            (f.lightbox = B("backdrop hide").append(f.container)),
            f.strip.on("click", F("item"), A),
            f.content
              .on("swipe", V)
              .on("click", F("left"), N)
              .on("click", F("right"), x)
              .on("click", F("close"), P)
              .on("click", F("image, caption"), x),
            f.container.on("click", F("view"), P).on("dragstart", F("img"), M),
            f.lightbox.on("keydown", H).on("focusin", G),
            r(n).append(f.lightbox),
            m
          );
        }),
          (m.destroy = function () {
            f && (ee(f.html, "noscroll"), f.lightbox.remove(), (f = void 0));
          }),
          (m.show = function (d) {
            if (d !== E) {
              var h = p[d];
              if (!h) return m.hide();
              if (fn(h)) {
                if (d < E) {
                  var g = xs(d - 1, p);
                  d = g > -1 ? g : d;
                } else {
                  var k = Cs(d + 1, p);
                  d = k > -1 ? k : d;
                }
                h = p[d];
              }
              var Y = E;
              (E = d),
                f.spinner
                  .attr("aria-hidden", !1)
                  .attr("aria-busy", !0)
                  .attr("aria-valuenow", 0)
                  .attr("aria-valuetext", "Loading image"),
                I.show();
              var z = (h.html && v(h.width, h.height)) || h.url;
              return (
                se(z, function (te) {
                  if (d !== E) return;
                  var ge = B("figure", "figure").append(X(te, "image")),
                    ae = B("frame").append(ge),
                    y = B("view")
                      .prop("tabIndex", 0)
                      .attr("id", "w-lightbox-view")
                      .append(ae),
                    W,
                    Q;
                  h.html &&
                    ((W = r(h.html)),
                    (Q = W.is("iframe")),
                    Q && W.on("load", j),
                    ge.append(X(W, "embed"))),
                    h.caption &&
                      ge.append(B("caption", "figcaption").text(h.caption)),
                    f.spinner.before(y),
                    Q || j();
                  function j() {
                    if (
                      (f.spinner
                        .attr("aria-hidden", !0)
                        .attr("aria-busy", !1)
                        .attr("aria-valuenow", 100)
                        .attr("aria-valuetext", "Loaded image"),
                      I.hide(),
                      d !== E)
                    ) {
                      y.remove();
                      return;
                    }
                    let ve = WW(d, p);
                    ie(f.arrowLeft, "inactive", ve),
                      D(f.arrowLeft, ve),
                      ve && f.arrowLeft.is(":focus") && f.arrowRight.focus();
                    let Ce = BW(d, p);
                    if (
                      (ie(f.arrowRight, "inactive", Ce),
                      D(f.arrowRight, Ce),
                      Ce && f.arrowRight.is(":focus") && f.arrowLeft.focus(),
                      f.view
                        ? (o(f.view)
                            .add("opacity .3s")
                            .start({ opacity: 0 })
                            .then(ne(f.view)),
                          o(y)
                            .add("opacity .3s")
                            .add("transform .3s")
                            .set({ x: d > Y ? "80px" : "-80px" })
                            .start({ opacity: 1, x: 0 }))
                        : y.css("opacity", 1),
                      (f.view = y),
                      f.view.prop("tabIndex", 0),
                      f.items)
                    ) {
                      ee(f.items, "active"), f.items.removeAttr("aria-selected");
                      var Xe = f.items.eq(d);
                      X(Xe, "active"), Xe.attr("aria-selected", !0), U(Xe);
                    }
                  }
                }),
                f.close.prop("tabIndex", 0),
                r(":focus").addClass("active-lightbox"),
                _.length === 0 &&
                  (r("body")
                    .children()
                    .each(function () {
                      r(this).hasClass("w-lightbox-backdrop") ||
                        r(this).is("script") ||
                        (_.push({
                          node: r(this),
                          hidden: r(this).attr("aria-hidden"),
                          tabIndex: r(this).attr("tabIndex"),
                        }),
                        r(this).attr("aria-hidden", !0).attr("tabIndex", -1));
                    }),
                  f.close.focus()),
                m
              );
            }
          }),
          (m.hide = function () {
            return (
              o(f.lightbox).add("opacity .3s").start({ opacity: 0 }).then(J), m
            );
          }),
          (m.prev = function () {
            var d = xs(E - 1, p);
            d > -1 && m.show(d);
          }),
          (m.next = function () {
            var d = Cs(E + 1, p);
            d > -1 && m.show(d);
          });
        function b(d) {
          return function (h) {
            this === h.target && (h.stopPropagation(), h.preventDefault(), d());
          };
        }
        var N = b(m.prev),
          x = b(m.next),
          P = b(m.hide),
          A = function (d) {
            var h = r(this).index();
            d.preventDefault(), m.show(h);
          },
          V = function (d, h) {
            d.preventDefault(),
              h.direction === "left"
                ? m.next()
                : h.direction === "right" && m.prev();
          },
          G = function () {
            this.focus();
          };
        function M(d) {
          d.preventDefault();
        }
        function H(d) {
          var h = d.keyCode;
          h === 27 || Z(h, "close")
            ? m.hide()
            : h === 37 || Z(h, "left")
            ? m.prev()
            : h === 39 || Z(h, "right")
            ? m.next()
            : Z(h, "item") && r(":focus").click();
        }
        function Z(d, h) {
          if (d !== 13 && d !== 32) return !1;
          var g = r(":focus").attr("class"),
            k = q(h).trim();
          return g.includes(k);
        }
        function J() {
          f &&
            (f.strip.scrollLeft(0).empty(),
            ee(f.html, "noscroll"),
            X(f.lightbox, "hide"),
            f.view && f.view.remove(),
            ee(f.content, "group"),
            X(f.arrowLeft, "inactive"),
            X(f.arrowRight, "inactive"),
            (E = f.view = void 0),
            _.forEach(function (d) {
              var h = d.node;
              h &&
                (d.hidden
                  ? h.attr("aria-hidden", d.hidden)
                  : h.removeAttr("aria-hidden"),
                d.tabIndex
                  ? h.attr("tabIndex", d.tabIndex)
                  : h.removeAttr("tabIndex"));
            }),
            (_ = []),
            r(".active-lightbox").removeClass("active-lightbox").focus());
        }
        function se(d, h) {
          var g = B("img", "img");
          return (
            g.one("load", function () {
              h(g);
            }),
            g.attr("src", d),
            g
          );
        }
        function ne(d) {
          return function () {
            d.remove();
          };
        }
        function U(d) {
          var h = d.get(0),
            g = f.strip.get(0),
            k = h.offsetLeft,
            Y = h.clientWidth,
            z = g.scrollLeft,
            te = g.clientWidth,
            ge = g.scrollWidth - te,
            ae;
          k < z
            ? (ae = Math.max(0, k + Y - te))
            : k + Y > te + z && (ae = Math.min(k, ge)),
            ae != null &&
              o(f.strip).add("scroll-left 500ms").start({ "scroll-left": ae });
        }
        function O(d, h, g) {
          (this.$element = d),
            (this.className = h),
            (this.delay = g || 200),
            this.hide();
        }
        (O.prototype.show = function () {
          var d = this;
          d.timeoutId ||
            (d.timeoutId = setTimeout(function () {
              d.$element.removeClass(d.className), delete d.timeoutId;
            }, d.delay));
        }),
          (O.prototype.hide = function () {
            var d = this;
            if (d.timeoutId) {
              clearTimeout(d.timeoutId), delete d.timeoutId;
              return;
            }
            d.$element.addClass(d.className);
          });
        function q(d, h) {
          return d.replace(c, (h ? " ." : " ") + s);
        }
        function F(d) {
          return q(d, !0);
        }
        function X(d, h) {
          return d.addClass(q(h));
        }
        function ee(d, h) {
          return d.removeClass(q(h));
        }
        function ie(d, h, g) {
          return d.toggleClass(q(h), g);
        }
        function D(d, h) {
          return d.attr("aria-hidden", h).attr("tabIndex", h ? -1 : 0);
        }
        function B(d, h) {
          return X(r(t.createElement(h || "div")), d);
        }
        function v(d, h) {
          var g =
            '<svg xmlns="http://www.w3.org/2000/svg" width="' +
            d +
            '" height="' +
            h +
            '"/>';
          return "data:image/svg+xml;charset=utf-8," + encodeURI(g);
        }
        return (
          (function () {
            var d = e.navigator.userAgent,
              h = /(iPhone|iPad|iPod);[^OS]*OS (\d)/,
              g = d.match(h),
              k = d.indexOf("Android ") > -1 && d.indexOf("Chrome") === -1;
            if (!k && (!g || g[2] > 7)) return;
            var Y = t.createElement("style");
            t.head.appendChild(Y), e.addEventListener("resize", z, !0);
            function z() {
              var te = e.innerHeight,
                ge = e.innerWidth,
                ae =
                  ".w-lightbox-content, .w-lightbox-view, .w-lightbox-view:before {height:" +
                  te +
                  "px}.w-lightbox-view {width:" +
                  ge +
                  "px}.w-lightbox-group, .w-lightbox-group .w-lightbox-view, .w-lightbox-group .w-lightbox-view:before {height:" +
                  0.86 * te +
                  "px}.w-lightbox-image {max-width:" +
                  ge +
                  "px;max-height:" +
                  te +
                  "px}.w-lightbox-group .w-lightbox-image {max-height:" +
                  0.86 * te +
                  "px}.w-lightbox-strip {padding: 0 " +
                  0.01 * te +
                  "px}.w-lightbox-item {width:" +
                  0.1 * te +
                  "px;padding:" +
                  0.02 * te +
                  "px " +
                  0.01 * te +
                  "px}.w-lightbox-thumbnail {height:" +
                  0.1 * te +
                  "px}@media (min-width: 768px) {.w-lightbox-content, .w-lightbox-view, .w-lightbox-view:before {height:" +
                  0.96 * te +
                  "px}.w-lightbox-content {margin-top:" +
                  0.02 * te +
                  "px}.w-lightbox-group, .w-lightbox-group .w-lightbox-view, .w-lightbox-group .w-lightbox-view:before {height:" +
                  0.84 * te +
                  "px}.w-lightbox-image {max-width:" +
                  0.96 * ge +
                  "px;max-height:" +
                  0.96 * te +
                  "px}.w-lightbox-group .w-lightbox-image {max-width:" +
                  0.823 * ge +
                  "px;max-height:" +
                  0.84 * te +
                  "px}}";
              Y.textContent = ae;
            }
            z();
          })(),
          m
        );
      }
      Rs.define(
        "lightbox",
        (ym.exports = function (e) {
          var t = {},
            r = Rs.env(),
            n = kW(window, document, e, r ? "#lightbox-mountpoint" : "body"),
            o = e(document),
            i,
            a,
            s = ".w-lightbox",
            c;
          t.ready = t.design = t.preview = p;
          function p() {
            (a = r && Rs.env("design")),
              n.destroy(),
              (c = {}),
              (i = o.find(s)),
              i.webflowLightBox(),
              i.each(function () {
                ln(e(this), "open lightbox"),
                  e(this).attr("aria-haspopup", "dialog");
              });
          }
          jQuery.fn.extend({
            webflowLightBox: function () {
              var _ = this;
              e.each(_, function (m, b) {
                var N = e.data(b, s);
                N ||
                  (N = e.data(b, s, {
                    el: e(b),
                    mode: "images",
                    images: [],
                    embed: "",
                  })),
                  N.el.off(s),
                  E(N),
                  a
                    ? N.el.on("setting" + s, E.bind(null, N))
                    : N.el.on("click" + s, f(N)).on("click" + s, function (x) {
                        x.preventDefault();
                      });
              });
            },
          });
          function E(_) {
            var m = _.el.children(".w-json").html(),
              b,
              N;
            if (!m) {
              _.items = [];
              return;
            }
            try {
              m = JSON.parse(m);
            } catch (x) {
              console.error("Malformed lightbox JSON configuration.", x);
            }
            I(m),
              m.items.forEach(function (x) {
                x.$el = _.el;
              }),
              (b = m.group),
              b
                ? ((N = c[b]),
                  N || (N = c[b] = []),
                  (_.items = N),
                  m.items.length &&
                    ((_.index = N.length), N.push.apply(N, m.items)))
                : ((_.items = m.items), (_.index = 0));
          }
          function f(_) {
            return function () {
              _.items.length && n(_.items, _.index || 0);
            };
          }
          function I(_) {
            _.images &&
              (_.images.forEach(function (m) {
                m.type = "image";
              }),
              (_.items = _.images)),
              _.embed && ((_.embed.type = "video"), (_.items = [_.embed])),
              _.groupId && (_.group = _.groupId);
          }
          return t;
        })
      );
    });
    var Tm = u((ZK, Im) => {
      var Mt = Ye(),
        HW = _n(),
        Ge = {
          ARROW_LEFT: 37,
          ARROW_UP: 38,
          ARROW_RIGHT: 39,
          ARROW_DOWN: 40,
          ESCAPE: 27,
          SPACE: 32,
          ENTER: 13,
          HOME: 36,
          END: 35,
        };
      Mt.define(
        "navbar",
        (Im.exports = function (e, t) {
          var r = {},
            n = e.tram,
            o = e(window),
            i = e(document),
            a = t.debounce,
            s,
            c,
            p,
            E,
            f = Mt.env(),
            I = '<div class="w-nav-overlay" data-wf-ignore />',
            _ = ".w-nav",
            m = "w--open",
            b = "w--nav-dropdown-open",
            N = "w--nav-dropdown-toggle-open",
            x = "w--nav-dropdown-list-open",
            P = "w--nav-link-open",
            A = HW.triggers,
            V = e();
          (r.ready = r.design = r.preview = G),
            (r.destroy = function () {
              (V = e()), M(), c && c.length && c.each(se);
            });
          function G() {
            (p = f && Mt.env("design")),
              (E = Mt.env("editor")),
              (s = e(document.body)),
              (c = i.find(_)),
              c.length && (c.each(J), M(), H());
          }
          function M() {
            Mt.resize.off(Z);
          }
          function H() {
            Mt.resize.on(Z);
          }
          function Z() {
            c.each(h);
          }
          function J(y, W) {
            var Q = e(W),
              j = e.data(W, _);
            j ||
              (j = e.data(W, _, {
                open: !1,
                el: Q,
                config: {},
                selectedIdx: -1,
              })),
              (j.menu = Q.find(".w-nav-menu")),
              (j.links = j.menu.find(".w-nav-link")),
              (j.dropdowns = j.menu.find(".w-dropdown")),
              (j.dropdownToggle = j.menu.find(".w-dropdown-toggle")),
              (j.dropdownList = j.menu.find(".w-dropdown-list")),
              (j.button = Q.find(".w-nav-button")),
              (j.container = Q.find(".w-container")),
              (j.overlayContainerId = "w-nav-overlay-" + y),
              (j.outside = v(j));
            var ve = Q.find(".w-nav-brand");
            ve &&
              ve.attr("href") === "/" &&
              ve.attr("aria-label") == null &&
              ve.attr("aria-label", "home"),
              j.button.attr("style", "-webkit-user-select: text;"),
              j.button.attr("aria-label") == null &&
                j.button.attr("aria-label", "menu"),
              j.button.attr("role", "button"),
              j.button.attr("tabindex", "0"),
              j.button.attr("aria-controls", j.overlayContainerId),
              j.button.attr("aria-haspopup", "menu"),
              j.button.attr("aria-expanded", "false"),
              j.el.off(_),
              j.button.off(_),
              j.menu.off(_),
              O(j),
              p
                ? (ne(j), j.el.on("setting" + _, q(j)))
                : (U(j),
                  j.button.on("click" + _, D(j)),
                  j.menu.on("click" + _, "a", B(j)),
                  j.button.on("keydown" + _, F(j)),
                  j.el.on("keydown" + _, X(j))),
              h(y, W);
          }
          function se(y, W) {
            var Q = e.data(W, _);
            Q && (ne(Q), e.removeData(W, _));
          }
          function ne(y) {
            y.overlay && (ae(y, !0), y.overlay.remove(), (y.overlay = null));
          }
          function U(y) {
            y.overlay ||
              ((y.overlay = e(I).appendTo(y.el)),
              y.overlay.attr("id", y.overlayContainerId),
              (y.parent = y.menu.parent()),
              ae(y, !0));
          }
          function O(y) {
            var W = {},
              Q = y.config || {},
              j = (W.animation = y.el.attr("data-animation") || "default");
            (W.animOver = /^over/.test(j)),
              (W.animDirect = /left$/.test(j) ? -1 : 1),
              Q.animation !== j && y.open && t.defer(ie, y),
              (W.easing = y.el.attr("data-easing") || "ease"),
              (W.easing2 = y.el.attr("data-easing2") || "ease");
            var ve = y.el.attr("data-duration");
            (W.duration = ve != null ? Number(ve) : 400),
              (W.docHeight = y.el.attr("data-doc-height")),
              (y.config = W);
          }
          function q(y) {
            return function (W, Q) {
              Q = Q || {};
              var j = o.width();
              O(y),
                Q.open === !0 && te(y, !0),
                Q.open === !1 && ae(y, !0),
                y.open &&
                  t.defer(function () {
                    j !== o.width() && ie(y);
                  });
            };
          }
          function F(y) {
            return function (W) {
              switch (W.keyCode) {
                case Ge.SPACE:
                case Ge.ENTER:
                  return D(y)(), W.preventDefault(), W.stopPropagation();
                case Ge.ESCAPE:
                  return ae(y), W.preventDefault(), W.stopPropagation();
                case Ge.ARROW_RIGHT:
                case Ge.ARROW_DOWN:
                case Ge.HOME:
                case Ge.END:
                  return y.open
                    ? (W.keyCode === Ge.END
                        ? (y.selectedIdx = y.links.length - 1)
                        : (y.selectedIdx = 0),
                      ee(y),
                      W.preventDefault(),
                      W.stopPropagation())
                    : (W.preventDefault(), W.stopPropagation());
              }
            };
          }
          function X(y) {
            return function (W) {
              if (y.open)
                switch (
                  ((y.selectedIdx = y.links.index(document.activeElement)),
                  W.keyCode)
                ) {
                  case Ge.HOME:
                  case Ge.END:
                    return (
                      W.keyCode === Ge.END
                        ? (y.selectedIdx = y.links.length - 1)
                        : (y.selectedIdx = 0),
                      ee(y),
                      W.preventDefault(),
                      W.stopPropagation()
                    );
                  case Ge.ESCAPE:
                    return (
                      ae(y),
                      y.button.focus(),
                      W.preventDefault(),
                      W.stopPropagation()
                    );
                  case Ge.ARROW_LEFT:
                  case Ge.ARROW_UP:
                    return (
                      (y.selectedIdx = Math.max(-1, y.selectedIdx - 1)),
                      ee(y),
                      W.preventDefault(),
                      W.stopPropagation()
                    );
                  case Ge.ARROW_RIGHT:
                  case Ge.ARROW_DOWN:
                    return (
                      (y.selectedIdx = Math.min(
                        y.links.length - 1,
                        y.selectedIdx + 1
                      )),
                      ee(y),
                      W.preventDefault(),
                      W.stopPropagation()
                    );
                }
            };
          }
          function ee(y) {
            if (y.links[y.selectedIdx]) {
              var W = y.links[y.selectedIdx];
              W.focus(), B(W);
            }
          }
          function ie(y) {
            y.open && (ae(y, !0), te(y, !0));
          }
          function D(y) {
            return a(function () {
              y.open ? ae(y) : te(y);
            });
          }
          function B(y) {
            return function (W) {
              var Q = e(this),
                j = Q.attr("href");
              if (!Mt.validClick(W.currentTarget)) {
                W.preventDefault();
                return;
              }
              j && j.indexOf("#") === 0 && y.open && ae(y);
            };
          }
          function v(y) {
            return (
              y.outside && i.off("click" + _, y.outside),
              function (W) {
                var Q = e(W.target);
                (E && Q.closest(".w-editor-bem-EditorOverlay").length) || d(y, Q);
              }
            );
          }
          var d = a(function (y, W) {
            if (y.open) {
              var Q = W.closest(".w-nav-menu");
              y.menu.is(Q) || ae(y);
            }
          });
          function h(y, W) {
            var Q = e.data(W, _),
              j = (Q.collapsed = Q.button.css("display") !== "none");
            if ((Q.open && !j && !p && ae(Q, !0), Q.container.length)) {
              var ve = k(Q);
              Q.links.each(ve), Q.dropdowns.each(ve);
            }
            Q.open && ge(Q);
          }
          var g = "max-width";
          function k(y) {
            var W = y.container.css(g);
            return (
              W === "none" && (W = ""),
              function (Q, j) {
                (j = e(j)), j.css(g, ""), j.css(g) === "none" && j.css(g, W);
              }
            );
          }
          function Y(y, W) {
            W.setAttribute("data-nav-menu-open", "");
          }
          function z(y, W) {
            W.removeAttribute("data-nav-menu-open");
          }
          function te(y, W) {
            if (y.open) return;
            (y.open = !0),
              y.menu.each(Y),
              y.links.addClass(P),
              y.dropdowns.addClass(b),
              y.dropdownToggle.addClass(N),
              y.dropdownList.addClass(x),
              y.button.addClass(m);
            var Q = y.config,
              j = Q.animation;
            (j === "none" || !n.support.transform || Q.duration <= 0) && (W = !0);
            var ve = ge(y),
              Ce = y.menu.outerHeight(!0),
              Xe = y.menu.outerWidth(!0),
              l = y.el.height(),
              T = y.el[0];
            if (
              (h(0, T),
              A.intro(0, T),
              Mt.redraw.up(),
              p || i.on("click" + _, y.outside),
              W)
            ) {
              w();
              return;
            }
            var S = "transform " + Q.duration + "ms " + Q.easing;
            if (
              (y.overlay &&
                ((V = y.menu.prev()), y.overlay.show().append(y.menu)),
              Q.animOver)
            ) {
              n(y.menu)
                .add(S)
                .set({ x: Q.animDirect * Xe, height: ve })
                .start({ x: 0 })
                .then(w),
                y.overlay && y.overlay.width(Xe);
              return;
            }
            var R = l + Ce;
            n(y.menu).add(S).set({ y: -R }).start({ y: 0 }).then(w);
            function w() {
              y.button.attr("aria-expanded", "true");
            }
          }
          function ge(y) {
            var W = y.config,
              Q = W.docHeight ? i.height() : s.height();
            return (
              W.animOver
                ? y.menu.height(Q)
                : y.el.css("position") !== "fixed" && (Q -= y.el.outerHeight(!0)),
              y.overlay && y.overlay.height(Q),
              Q
            );
          }
          function ae(y, W) {
            if (!y.open) return;
            (y.open = !1), y.button.removeClass(m);
            var Q = y.config;
            if (
              ((Q.animation === "none" ||
                !n.support.transform ||
                Q.duration <= 0) &&
                (W = !0),
              A.outro(0, y.el[0]),
              i.off("click" + _, y.outside),
              W)
            ) {
              n(y.menu).stop(), T();
              return;
            }
            var j = "transform " + Q.duration + "ms " + Q.easing2,
              ve = y.menu.outerHeight(!0),
              Ce = y.menu.outerWidth(!0),
              Xe = y.el.height();
            if (Q.animOver) {
              n(y.menu)
                .add(j)
                .start({ x: Ce * Q.animDirect })
                .then(T);
              return;
            }
            var l = Xe + ve;
            n(y.menu).add(j).start({ y: -l }).then(T);
            function T() {
              y.menu.height(""),
                n(y.menu).set({ x: 0, y: 0 }),
                y.menu.each(z),
                y.links.removeClass(P),
                y.dropdowns.removeClass(b),
                y.dropdownToggle.removeClass(N),
                y.dropdownList.removeClass(x),
                y.overlay &&
                  y.overlay.children().length &&
                  (V.length ? y.menu.insertAfter(V) : y.menu.prependTo(y.parent),
                  y.overlay.attr("style", "").hide()),
                y.el.triggerHandler("w-close"),
                y.button.attr("aria-expanded", "false");
            }
          }
          return r;
        })
      );
    });
    var wm = u((JK, Om) => {
      var Dt = Ye(),
        jW = _n(),
        yt = {
          ARROW_LEFT: 37,
          ARROW_UP: 38,
          ARROW_RIGHT: 39,
          ARROW_DOWN: 40,
          SPACE: 32,
          ENTER: 13,
          HOME: 36,
          END: 35,
        },
        bm =
          'a[href], area[href], [role="button"], input, select, textarea, button, iframe, object, embed, *[tabindex], *[contenteditable]';
      Dt.define(
        "slider",
        (Om.exports = function (e, t) {
          var r = {},
            n = e.tram,
            o = e(document),
            i,
            a,
            s = Dt.env(),
            c = ".w-slider",
            p = '<div class="w-slider-dot" data-wf-ignore />',
            E =
              '<div aria-live="off" aria-atomic="true" class="w-slider-aria-label" data-wf-ignore />',
            f = "w-slider-force-show",
            I = jW.triggers,
            _,
            m = !1;
          (r.ready = function () {
            (a = Dt.env("design")), b();
          }),
            (r.design = function () {
              (a = !0), setTimeout(b, 1e3);
            }),
            (r.preview = function () {
              (a = !1), b();
            }),
            (r.redraw = function () {
              (m = !0), b(), (m = !1);
            }),
            (r.destroy = N);
          function b() {
            (i = o.find(c)), i.length && (i.each(A), !_ && (N(), x()));
          }
          function N() {
            Dt.resize.off(P), Dt.redraw.off(r.redraw);
          }
          function x() {
            Dt.resize.on(P), Dt.redraw.on(r.redraw);
          }
          function P() {
            i.filter(":visible").each(X);
          }
          function A(v, d) {
            var h = e(d),
              g = e.data(d, c);
            g ||
              (g = e.data(d, c, {
                index: 0,
                depth: 1,
                hasFocus: { keyboard: !1, mouse: !1 },
                el: h,
                config: {},
              })),
              (g.mask = h.children(".w-slider-mask")),
              (g.left = h.children(".w-slider-arrow-left")),
              (g.right = h.children(".w-slider-arrow-right")),
              (g.nav = h.children(".w-slider-nav")),
              (g.slides = g.mask.children(".w-slide")),
              g.slides.each(I.reset),
              m && (g.maskWidth = 0),
              h.attr("role") === void 0 && h.attr("role", "region"),
              h.attr("aria-label") === void 0 && h.attr("aria-label", "carousel");
            var k = g.mask.attr("id");
            if (
              (k || ((k = "w-slider-mask-" + v), g.mask.attr("id", k)),
              !a && !g.ariaLiveLabel && (g.ariaLiveLabel = e(E).appendTo(g.mask)),
              g.left.attr("role", "button"),
              g.left.attr("tabindex", "0"),
              g.left.attr("aria-controls", k),
              g.left.attr("aria-label") === void 0 &&
                g.left.attr("aria-label", "previous slide"),
              g.right.attr("role", "button"),
              g.right.attr("tabindex", "0"),
              g.right.attr("aria-controls", k),
              g.right.attr("aria-label") === void 0 &&
                g.right.attr("aria-label", "next slide"),
              !n.support.transform)
            ) {
              g.left.hide(), g.right.hide(), g.nav.hide(), (_ = !0);
              return;
            }
            g.el.off(c),
              g.left.off(c),
              g.right.off(c),
              g.nav.off(c),
              V(g),
              a
                ? (g.el.on("setting" + c, O(g)), U(g), (g.hasTimer = !1))
                : (g.el.on("swipe" + c, O(g)),
                  g.left.on("click" + c, Z(g)),
                  g.right.on("click" + c, J(g)),
                  g.left.on("keydown" + c, H(g, Z)),
                  g.right.on("keydown" + c, H(g, J)),
                  g.nav.on("keydown" + c, "> div", O(g)),
                  g.config.autoplay &&
                    !g.hasTimer &&
                    ((g.hasTimer = !0), (g.timerCount = 1), ne(g)),
                  g.el.on("mouseenter" + c, M(g, !0, "mouse")),
                  g.el.on("focusin" + c, M(g, !0, "keyboard")),
                  g.el.on("mouseleave" + c, M(g, !1, "mouse")),
                  g.el.on("focusout" + c, M(g, !1, "keyboard"))),
              g.nav.on("click" + c, "> div", O(g)),
              s ||
                g.mask
                  .contents()
                  .filter(function () {
                    return this.nodeType === 3;
                  })
                  .remove();
            var Y = h.filter(":hidden");
            Y.addClass(f);
            var z = h.parents(":hidden");
            z.addClass(f), m || X(v, d), Y.removeClass(f), z.removeClass(f);
          }
          function V(v) {
            var d = {};
            (d.crossOver = 0),
              (d.animation = v.el.attr("data-animation") || "slide"),
              d.animation === "outin" &&
                ((d.animation = "cross"), (d.crossOver = 0.5)),
              (d.easing = v.el.attr("data-easing") || "ease");
            var h = v.el.attr("data-duration");
            if (
              ((d.duration = h != null ? parseInt(h, 10) : 500),
              G(v.el.attr("data-infinite")) && (d.infinite = !0),
              G(v.el.attr("data-disable-swipe")) && (d.disableSwipe = !0),
              G(v.el.attr("data-hide-arrows"))
                ? (d.hideArrows = !0)
                : v.config.hideArrows && (v.left.show(), v.right.show()),
              G(v.el.attr("data-autoplay")))
            ) {
              (d.autoplay = !0),
                (d.delay = parseInt(v.el.attr("data-delay"), 10) || 2e3),
                (d.timerMax = parseInt(v.el.attr("data-autoplay-limit"), 10));
              var g = "mousedown" + c + " touchstart" + c;
              a ||
                v.el.off(g).one(g, function () {
                  U(v);
                });
            }
            var k = v.right.width();
            (d.edge = k ? k + 40 : 100), (v.config = d);
          }
          function G(v) {
            return v === "1" || v === "true";
          }
          function M(v, d, h) {
            return function (g) {
              if (d) v.hasFocus[h] = d;
              else if (
                e.contains(v.el.get(0), g.relatedTarget) ||
                ((v.hasFocus[h] = d),
                (v.hasFocus.mouse && h === "keyboard") ||
                  (v.hasFocus.keyboard && h === "mouse"))
              )
                return;
              d
                ? (v.ariaLiveLabel.attr("aria-live", "polite"),
                  v.hasTimer && U(v))
                : (v.ariaLiveLabel.attr("aria-live", "off"), v.hasTimer && ne(v));
            };
          }
          function H(v, d) {
            return function (h) {
              switch (h.keyCode) {
                case yt.SPACE:
                case yt.ENTER:
                  return d(v)(), h.preventDefault(), h.stopPropagation();
              }
            };
          }
          function Z(v) {
            return function () {
              F(v, { index: v.index - 1, vector: -1 });
            };
          }
          function J(v) {
            return function () {
              F(v, { index: v.index + 1, vector: 1 });
            };
          }
          function se(v, d) {
            var h = null;
            d === v.slides.length && (b(), ee(v)),
              t.each(v.anchors, function (g, k) {
                e(g.els).each(function (Y, z) {
                  e(z).index() === d && (h = k);
                });
              }),
              h != null && F(v, { index: h, immediate: !0 });
          }
          function ne(v) {
            U(v);
            var d = v.config,
              h = d.timerMax;
            (h && v.timerCount++ > h) ||
              (v.timerId = window.setTimeout(function () {
                v.timerId == null || a || (J(v)(), ne(v));
              }, d.delay));
          }
          function U(v) {
            window.clearTimeout(v.timerId), (v.timerId = null);
          }
          function O(v) {
            return function (d, h) {
              h = h || {};
              var g = v.config;
              if (a && d.type === "setting") {
                if (h.select === "prev") return Z(v)();
                if (h.select === "next") return J(v)();
                if ((V(v), ee(v), h.select == null)) return;
                se(v, h.select);
                return;
              }
              if (d.type === "swipe")
                return g.disableSwipe || Dt.env("editor")
                  ? void 0
                  : h.direction === "left"
                  ? J(v)()
                  : h.direction === "right"
                  ? Z(v)()
                  : void 0;
              if (v.nav.has(d.target).length) {
                var k = e(d.target).index();
                if (
                  (d.type === "click" && F(v, { index: k }), d.type === "keydown")
                )
                  switch (d.keyCode) {
                    case yt.ENTER:
                    case yt.SPACE: {
                      F(v, { index: k }), d.preventDefault();
                      break;
                    }
                    case yt.ARROW_LEFT:
                    case yt.ARROW_UP: {
                      q(v.nav, Math.max(k - 1, 0)), d.preventDefault();
                      break;
                    }
                    case yt.ARROW_RIGHT:
                    case yt.ARROW_DOWN: {
                      q(v.nav, Math.min(k + 1, v.pages)), d.preventDefault();
                      break;
                    }
                    case yt.HOME: {
                      q(v.nav, 0), d.preventDefault();
                      break;
                    }
                    case yt.END: {
                      q(v.nav, v.pages), d.preventDefault();
                      break;
                    }
                    default:
                      return;
                  }
              }
            };
          }
          function q(v, d) {
            var h = v.children().eq(d).focus();
            v.children().not(h);
          }
          function F(v, d) {
            d = d || {};
            var h = v.config,
              g = v.anchors;
            v.previous = v.index;
            var k = d.index,
              Y = {};
            k < 0
              ? ((k = g.length - 1),
                h.infinite &&
                  ((Y.x = -v.endX), (Y.from = 0), (Y.to = g[0].width)))
              : k >= g.length &&
                ((k = 0),
                h.infinite &&
                  ((Y.x = g[g.length - 1].width),
                  (Y.from = -g[g.length - 1].x),
                  (Y.to = Y.from - Y.x))),
              (v.index = k);
            var z = v.nav
              .children()
              .eq(k)
              .addClass("w-active")
              .attr("aria-pressed", "true")
              .attr("tabindex", "0");
            v.nav
              .children()
              .not(z)
              .removeClass("w-active")
              .attr("aria-pressed", "false")
              .attr("tabindex", "-1"),
              h.hideArrows &&
                (v.index === g.length - 1 ? v.right.hide() : v.right.show(),
                v.index === 0 ? v.left.hide() : v.left.show());
            var te = v.offsetX || 0,
              ge = (v.offsetX = -g[v.index].x),
              ae = { x: ge, opacity: 1, visibility: "" },
              y = e(g[v.index].els),
              W = e(g[v.previous] && g[v.previous].els),
              Q = v.slides.not(y),
              j = h.animation,
              ve = h.easing,
              Ce = Math.round(h.duration),
              Xe = d.vector || (v.index > v.previous ? 1 : -1),
              l = "opacity " + Ce + "ms " + ve,
              T = "transform " + Ce + "ms " + ve;
            if (
              (y.find(bm).removeAttr("tabindex"),
              y.removeAttr("aria-hidden"),
              y.find("*").removeAttr("aria-hidden"),
              Q.find(bm).attr("tabindex", "-1"),
              Q.attr("aria-hidden", "true"),
              Q.find("*").attr("aria-hidden", "true"),
              a || (y.each(I.intro), Q.each(I.outro)),
              d.immediate && !m)
            ) {
              n(y).set(ae), w();
              return;
            }
            if (v.index === v.previous) return;
            if (
              (a || v.ariaLiveLabel.text(`Slide ${k + 1} of ${g.length}.`),
              j === "cross")
            ) {
              var S = Math.round(Ce - Ce * h.crossOver),
                R = Math.round(Ce - S);
              (l = "opacity " + S + "ms " + ve),
                n(W).set({ visibility: "" }).add(l).start({ opacity: 0 }),
                n(y)
                  .set({ visibility: "", x: ge, opacity: 0, zIndex: v.depth++ })
                  .add(l)
                  .wait(R)
                  .then({ opacity: 1 })
                  .then(w);
              return;
            }
            if (j === "fade") {
              n(W).set({ visibility: "" }).stop(),
                n(y)
                  .set({ visibility: "", x: ge, opacity: 0, zIndex: v.depth++ })
                  .add(l)
                  .start({ opacity: 1 })
                  .then(w);
              return;
            }
            if (j === "over") {
              (ae = { x: v.endX }),
                n(W).set({ visibility: "" }).stop(),
                n(y)
                  .set({
                    visibility: "",
                    zIndex: v.depth++,
                    x: ge + g[v.index].width * Xe,
                  })
                  .add(T)
                  .start({ x: ge })
                  .then(w);
              return;
            }
            h.infinite && Y.x
              ? (n(v.slides.not(W))
                  .set({ visibility: "", x: Y.x })
                  .add(T)
                  .start({ x: ge }),
                n(W).set({ visibility: "", x: Y.from }).add(T).start({ x: Y.to }),
                (v.shifted = W))
              : (h.infinite &&
                  v.shifted &&
                  (n(v.shifted).set({ visibility: "", x: te }),
                  (v.shifted = null)),
                n(v.slides).set({ visibility: "" }).add(T).start({ x: ge }));
            function w() {
              (y = e(g[v.index].els)),
                (Q = v.slides.not(y)),
                j !== "slide" && (ae.visibility = "hidden"),
                n(Q).set(ae);
            }
          }
          function X(v, d) {
            var h = e.data(d, c);
            if (h) {
              if (D(h)) return ee(h);
              a && B(h) && ee(h);
            }
          }
          function ee(v) {
            var d = 1,
              h = 0,
              g = 0,
              k = 0,
              Y = v.maskWidth,
              z = Y - v.config.edge;
            z < 0 && (z = 0),
              (v.anchors = [{ els: [], x: 0, width: 0 }]),
              v.slides.each(function (ge, ae) {
                g - h > z &&
                  (d++,
                  (h += Y),
                  (v.anchors[d - 1] = { els: [], x: g, width: 0 })),
                  (k = e(ae).outerWidth(!0)),
                  (g += k),
                  (v.anchors[d - 1].width += k),
                  v.anchors[d - 1].els.push(ae);
                var y = ge + 1 + " of " + v.slides.length;
                e(ae).attr("aria-label", y), e(ae).attr("role", "group");
              }),
              (v.endX = g),
              a && (v.pages = null),
              v.nav.length && v.pages !== d && ((v.pages = d), ie(v));
            var te = v.index;
            te >= d && (te = d - 1), F(v, { immediate: !0, index: te });
          }
          function ie(v) {
            var d = [],
              h,
              g = v.el.attr("data-nav-spacing");
            g && (g = parseFloat(g) + "px");
            for (var k = 0, Y = v.pages; k < Y; k++)
              (h = e(p)),
                h
                  .attr("aria-label", "Show slide " + (k + 1) + " of " + Y)
                  .attr("aria-pressed", "false")
                  .attr("role", "button")
                  .attr("tabindex", "-1"),
                v.nav.hasClass("w-num") && h.text(k + 1),
                g != null && h.css({ "margin-left": g, "margin-right": g }),
                d.push(h);
            v.nav.empty().append(d);
          }
          function D(v) {
            var d = v.mask.width();
            return v.maskWidth !== d ? ((v.maskWidth = d), !0) : !1;
          }
          function B(v) {
            var d = 0;
            return (
              v.slides.each(function (h, g) {
                d += e(g).outerWidth(!0);
              }),
              v.slidesWidth !== d ? ((v.slidesWidth = d), !0) : !1
            );
          }
          return r;
        })
      );
    });
    Ns();
    Ps();
    Hs();
    Ks();
    Qs();
    _n();
    cm();
    fm();
    pm();
    hm();
    Em();
    mm();
    Tm();
    wm();
  })();
  /*!
   * tram.js v0.8.2-global
   * Cross-browser CSS3 transitions in JavaScript
   * https://github.com/bkwld/tram
   * MIT License
   */
  /*!
   * Webflow._ (aka) Underscore.js 1.6.0 (custom build)
   * _.each
   * _.map
   * _.find
   * _.filter
   * _.any
   * _.contains
   * _.delay
   * _.defer
   * _.throttle (webflow)
   * _.debounce
   * _.keys
   * _.has
   * _.now
   * _.template (webflow: upgraded to 1.13.6)
   *
   * http://underscorejs.org
   * (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   * Underscore may be freely distributed under the MIT license.
   * @license MIT
   */
  /*! Bundled license information:
  
  timm/lib/timm.js:
    (*!
     * Timm
     *
     * Immutability helpers with fast reads and acceptable writes.
     *
     * @copyright Guillermo Grau Panea 2016
     * @license MIT
     *)
  */
  /**
   * ----------------------------------------------------------------------
   * Webflow: Interactions 2.0: Init
   */
  Webflow.require("ix2").init({
    events: {
      e: {
        id: "e",
        name: "",
        animationType: "custom",
        eventTypeId: "SLIDER_ACTIVE",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-40",
          },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          selector: ".hero-slide",
          originalId:
            "648d360b319e67c67e8c1ebf|d89a1f31-92a7-a401-f845-a6676c6e881c",
          appliesTo: "CLASS",
        },
        targets: [
          {
            selector: ".hero-slide",
            originalId:
              "648d360b319e67c67e8c1ebf|d89a1f31-92a7-a401-f845-a6676c6e881c",
            appliesTo: "CLASS",
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1616675610063,
      },
      "e-2": {
        id: "e-2",
        name: "",
        animationType: "custom",
        eventTypeId: "SLIDER_INACTIVE",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-2",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-39",
          },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          selector: ".hero-slide",
          originalId:
            "648d360b319e67c67e8c1ebf|d89a1f31-92a7-a401-f845-a6676c6e881c",
          appliesTo: "CLASS",
        },
        targets: [
          {
            selector: ".hero-slide",
            originalId:
              "648d360b319e67c67e8c1ebf|d89a1f31-92a7-a401-f845-a6676c6e881c",
            appliesTo: "CLASS",
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1616675610064,
      },
      "e-3": {
        id: "e-3",
        name: "",
        animationType: "custom",
        eventTypeId: "MOUSE_OVER",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-3",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-125",
          },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          selector: ".slide-cta",
          originalId:
            "648d360b319e67c67e8c1ebf|d89a1f31-92a7-a401-f845-a6676c6e882d",
          appliesTo: "CLASS",
        },
        targets: [
          {
            selector: ".slide-cta",
            originalId:
              "648d360b319e67c67e8c1ebf|d89a1f31-92a7-a401-f845-a6676c6e882d",
            appliesTo: "CLASS",
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1616681006543,
      },
      "e-4": {
        id: "e-4",
        name: "",
        animationType: "custom",
        eventTypeId: "MOUSE_OUT",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-4",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-84",
          },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          selector: ".slide-cta",
          originalId:
            "648d360b319e67c67e8c1ebf|d89a1f31-92a7-a401-f845-a6676c6e882d",
          appliesTo: "CLASS",
        },
        targets: [
          {
            selector: ".slide-cta",
            originalId:
              "648d360b319e67c67e8c1ebf|d89a1f31-92a7-a401-f845-a6676c6e882d",
            appliesTo: "CLASS",
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1616681006544,
      },
      "e-5": {
        id: "e-5",
        name: "",
        animationType: "custom",
        eventTypeId: "MOUSE_OVER",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-5",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-128",
          },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          selector: "._w-hero-slider-nav",
          originalId:
            "648d360b319e67c67e8c1ebf|d89a1f31-92a7-a401-f845-a6676c6e8888",
          appliesTo: "CLASS",
        },
        targets: [
          {
            selector: "._w-hero-slider-nav",
            originalId:
              "648d360b319e67c67e8c1ebf|d89a1f31-92a7-a401-f845-a6676c6e8888",
            appliesTo: "CLASS",
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1616679430557,
      },
      "e-6": {
        id: "e-6",
        name: "",
        animationType: "custom",
        eventTypeId: "MOUSE_OUT",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-6",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-56",
          },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          selector: "._w-hero-slider-nav",
          originalId:
            "648d360b319e67c67e8c1ebf|d89a1f31-92a7-a401-f845-a6676c6e8888",
          appliesTo: "CLASS",
        },
        targets: [
          {
            selector: "._w-hero-slider-nav",
            originalId:
              "648d360b319e67c67e8c1ebf|d89a1f31-92a7-a401-f845-a6676c6e8888",
            appliesTo: "CLASS",
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1616679430558,
      },
      "e-8": {
        id: "e-8",
        animationType: "custom",
        eventTypeId: "MOUSE_MOVE",
        action: {
          id: "",
          actionTypeId: "GENERAL_CONTINUOUS_ACTION",
          config: { actionListId: "a-17", affectedElements: {}, duration: 0 },
        },
        mediaQueries: ["main"],
        target: {
          selector: ".c-slide-btn-link",
          originalId: "7b8c8c1c-9b5d-b039-aca2-819631562b8c",
          appliesTo: "CLASS",
        },
        targets: [
          {
            selector: ".c-slide-btn-link",
            originalId: "7b8c8c1c-9b5d-b039-aca2-819631562b8c",
            appliesTo: "CLASS",
          },
        ],
        config: [
          {
            continuousParameterGroupId: "a-17-p",
            selectedAxis: "X_AXIS",
            basedOn: "ELEMENT",
            reverse: false,
            smoothing: 95,
            restingState: 50,
          },
          {
            continuousParameterGroupId: "a-17-p-2",
            selectedAxis: "Y_AXIS",
            basedOn: "ELEMENT",
            reverse: false,
            smoothing: 95,
            restingState: 50,
          },
        ],
        createdOn: 1598573372173,
      },
      "e-9": {
        id: "e-9",
        animationType: "custom",
        eventTypeId: "MOUSE_OVER",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-16",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-105",
          },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          selector: ".c-slider-btn.right",
          originalId:
            "648d360b319e67c67e8c1ebf|0a8f61d1-ca67-4eae-d98d-2f942a55b048",
          appliesTo: "CLASS",
        },
        targets: [
          {
            selector: ".c-slider-btn.right",
            originalId:
              "648d360b319e67c67e8c1ebf|0a8f61d1-ca67-4eae-d98d-2f942a55b048",
            appliesTo: "CLASS",
          },
        ],
        config: {
          loop: true,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1598573992235,
      },
      "e-10": {
        id: "e-10",
        animationType: "custom",
        eventTypeId: "MOUSE_OVER",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-19",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-125",
          },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          selector: ".c-slider-btn.right",
          originalId:
            "648d360b319e67c67e8c1ebf|0a8f61d1-ca67-4eae-d98d-2f942a55b048",
          appliesTo: "CLASS",
        },
        targets: [
          {
            selector: ".c-slider-btn.right",
            originalId:
              "648d360b319e67c67e8c1ebf|0a8f61d1-ca67-4eae-d98d-2f942a55b048",
            appliesTo: "CLASS",
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1598522835085,
      },
      "e-11": {
        id: "e-11",
        animationType: "custom",
        eventTypeId: "SLIDER_ACTIVE",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-14",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-130",
          },
        },
        mediaQueries: ["main"],
        target: {
          selector: ".main-slider-slide",
          originalId:
            "648d360b319e67c67e8c1ebf|0a8f61d1-ca67-4eae-d98d-2f942a55afdd",
          appliesTo: "CLASS",
        },
        targets: [
          {
            selector: ".main-slider-slide",
            originalId:
              "648d360b319e67c67e8c1ebf|0a8f61d1-ca67-4eae-d98d-2f942a55afdd",
            appliesTo: "CLASS",
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1598526807674,
      },
      "e-12": {
        id: "e-12",
        animationType: "custom",
        eventTypeId: "MOUSE_OUT",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-10",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-83",
          },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          selector: ".c-slider-btn.right",
          originalId:
            "648d360b319e67c67e8c1ebf|0a8f61d1-ca67-4eae-d98d-2f942a55b048",
          appliesTo: "CLASS",
        },
        targets: [
          {
            selector: ".c-slider-btn.right",
            originalId:
              "648d360b319e67c67e8c1ebf|0a8f61d1-ca67-4eae-d98d-2f942a55b048",
            appliesTo: "CLASS",
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1598573992236,
      },
      "e-13": {
        id: "e-13",
        animationType: "custom",
        eventTypeId: "MOUSE_OVER",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-7",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-16",
          },
        },
        mediaQueries: ["main"],
        target: {
          selector: ".c-slide-btn-block",
          originalId: "7b8c8c1c-9b5d-b039-aca2-819631562b8d",
          appliesTo: "CLASS",
        },
        targets: [
          {
            selector: ".c-slide-btn-block",
            originalId: "7b8c8c1c-9b5d-b039-aca2-819631562b8d",
            appliesTo: "CLASS",
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1598528421826,
      },
      "e-14": {
        id: "e-14",
        animationType: "custom",
        eventTypeId: "MOUSE_OVER",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-13",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-106",
          },
        },
        mediaQueries: ["main"],
        target: {
          selector: ".c-slide-btn-block",
          originalId: "7b8c8c1c-9b5d-b039-aca2-819631562b8d",
          appliesTo: "CLASS",
        },
        targets: [
          {
            selector: ".c-slide-btn-block",
            originalId: "7b8c8c1c-9b5d-b039-aca2-819631562b8d",
            appliesTo: "CLASS",
          },
        ],
        config: {
          loop: true,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1598528576759,
      },
      "e-15": {
        id: "e-15",
        animationType: "custom",
        eventTypeId: "MOUSE_OUT",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-11",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-107",
          },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          selector: ".c-slider-btn.right",
          originalId:
            "648d360b319e67c67e8c1ebf|0a8f61d1-ca67-4eae-d98d-2f942a55b048",
          appliesTo: "CLASS",
        },
        targets: [
          {
            selector: ".c-slider-btn.right",
            originalId:
              "648d360b319e67c67e8c1ebf|0a8f61d1-ca67-4eae-d98d-2f942a55b048",
            appliesTo: "CLASS",
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1598574153929,
      },
      "e-16": {
        id: "e-16",
        animationType: "custom",
        eventTypeId: "MOUSE_OUT",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-12",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-13",
          },
        },
        mediaQueries: ["main"],
        target: {
          selector: ".c-slide-btn-block",
          originalId: "7b8c8c1c-9b5d-b039-aca2-819631562b8d",
          appliesTo: "CLASS",
        },
        targets: [
          {
            selector: ".c-slide-btn-block",
            originalId: "7b8c8c1c-9b5d-b039-aca2-819631562b8d",
            appliesTo: "CLASS",
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1598528421827,
      },
      "e-17": {
        id: "e-17",
        animationType: "custom",
        eventTypeId: "MOUSE_OUT",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-20",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-14",
          },
        },
        mediaQueries: ["main"],
        target: {
          selector: ".c-slide-btn-block",
          originalId: "7b8c8c1c-9b5d-b039-aca2-819631562b8d",
          appliesTo: "CLASS",
        },
        targets: [
          {
            selector: ".c-slide-btn-block",
            originalId: "7b8c8c1c-9b5d-b039-aca2-819631562b8d",
            appliesTo: "CLASS",
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1598528576759,
      },
      "e-18": {
        id: "e-18",
        animationType: "custom",
        eventTypeId: "MOUSE_OVER",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-15",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-15",
          },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          selector: ".c-slider-btn.right",
          originalId:
            "648d360b319e67c67e8c1ebf|0a8f61d1-ca67-4eae-d98d-2f942a55b048",
          appliesTo: "CLASS",
        },
        targets: [
          {
            selector: ".c-slider-btn.right",
            originalId:
              "648d360b319e67c67e8c1ebf|0a8f61d1-ca67-4eae-d98d-2f942a55b048",
            appliesTo: "CLASS",
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1598574153927,
      },
      "e-19": {
        id: "e-19",
        animationType: "custom",
        eventTypeId: "MOUSE_MOVE",
        action: {
          id: "",
          actionTypeId: "GENERAL_CONTINUOUS_ACTION",
          config: { actionListId: "a-9", affectedElements: {}, duration: 0 },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          selector: ".sub-slider-slide",
          originalId:
            "648d360b319e67c67e8c1ebf|0a8f61d1-ca67-4eae-d98d-2f942a55b05b",
          appliesTo: "CLASS",
        },
        targets: [
          {
            selector: ".sub-slider-slide",
            originalId:
              "648d360b319e67c67e8c1ebf|0a8f61d1-ca67-4eae-d98d-2f942a55b05b",
            appliesTo: "CLASS",
          },
        ],
        config: [
          {
            continuousParameterGroupId: "a-9-p",
            selectedAxis: "X_AXIS",
            basedOn: "ELEMENT",
            reverse: false,
            smoothing: 95,
            restingState: 50,
          },
          {
            continuousParameterGroupId: "a-9-p-2",
            selectedAxis: "Y_AXIS",
            basedOn: "ELEMENT",
            reverse: false,
            smoothing: 95,
            restingState: 50,
          },
        ],
        createdOn: 1598524420836,
      },
      "e-20": {
        id: "e-20",
        animationType: "custom",
        eventTypeId: "MOUSE_OUT",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-8",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-84",
          },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          selector: ".c-slider-btn.right",
          originalId:
            "648d360b319e67c67e8c1ebf|0a8f61d1-ca67-4eae-d98d-2f942a55b048",
          appliesTo: "CLASS",
        },
        targets: [
          {
            selector: ".c-slider-btn.right",
            originalId:
              "648d360b319e67c67e8c1ebf|0a8f61d1-ca67-4eae-d98d-2f942a55b048",
            appliesTo: "CLASS",
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1598522835085,
      },
      "e-22": {
        id: "e-22",
        animationType: "custom",
        eventTypeId: "SLIDER_INACTIVE",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-18",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-104",
          },
        },
        mediaQueries: ["main"],
        target: {
          selector: ".main-slider-slide",
          originalId:
            "648d360b319e67c67e8c1ebf|0a8f61d1-ca67-4eae-d98d-2f942a55afdd",
          appliesTo: "CLASS",
        },
        targets: [
          {
            selector: ".main-slider-slide",
            originalId:
              "648d360b319e67c67e8c1ebf|0a8f61d1-ca67-4eae-d98d-2f942a55afdd",
            appliesTo: "CLASS",
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1598526807675,
      },
      "e-33": {
        id: "e-33",
        animationType: "custom",
        eventTypeId: "MOUSE_OVER",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-23",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-34",
          },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          selector: ".d-64-card-wrapper",
          originalId:
            "648d360b319e67c67e8c1ebf|32f2ba5a-970c-f5b8-8f62-6973a63dde7a",
          appliesTo: "CLASS",
        },
        targets: [
          {
            selector: ".d-64-card-wrapper",
            originalId:
              "648d360b319e67c67e8c1ebf|fdb10e2b-ea6a-081e-60a2-78d94b82670f",
            appliesTo: "CLASS",
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1548387962296,
      },
      "e-34": {
        id: "e-34",
        animationType: "custom",
        eventTypeId: "MOUSE_OUT",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-24",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-33",
          },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          selector: ".d-64-card-wrapper",
          originalId:
            "648d360b319e67c67e8c1ebf|32f2ba5a-970c-f5b8-8f62-6973a63dde7a",
          appliesTo: "CLASS",
        },
        targets: [
          {
            selector: ".d-64-card-wrapper",
            originalId:
              "648d360b319e67c67e8c1ebf|fdb10e2b-ea6a-081e-60a2-78d94b82670f",
            appliesTo: "CLASS",
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1548387962296,
      },
      "e-35": {
        id: "e-35",
        name: "",
        animationType: "custom",
        eventTypeId: "MOUSE_OVER",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-27",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-36",
          },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          selector: ".d-127-card-wrapper",
          originalId:
            "648d360b319e67c67e8c1ebf|867720da-3717-99c5-7fb2-14488eb2e0b5",
          appliesTo: "CLASS",
        },
        targets: [
          {
            selector: ".d-127-card-wrapper",
            originalId:
              "648d360b319e67c67e8c1ebf|867720da-3717-99c5-7fb2-14488eb2e0b5",
            appliesTo: "CLASS",
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1687008325178,
      },
      "e-36": {
        id: "e-36",
        name: "",
        animationType: "custom",
        eventTypeId: "MOUSE_OUT",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-28",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-35",
          },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          selector: ".d-127-card-wrapper",
          originalId:
            "648d360b319e67c67e8c1ebf|867720da-3717-99c5-7fb2-14488eb2e0b5",
          appliesTo: "CLASS",
        },
        targets: [
          {
            selector: ".d-127-card-wrapper",
            originalId:
              "648d360b319e67c67e8c1ebf|867720da-3717-99c5-7fb2-14488eb2e0b5",
            appliesTo: "CLASS",
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1687008325179,
      },
      "e-37": {
        id: "e-37",
        name: "",
        animationType: "custom",
        eventTypeId: "MOUSE_MOVE",
        action: {
          id: "",
          actionTypeId: "GENERAL_CONTINUOUS_ACTION",
          config: { actionListId: "a-29", affectedElements: {}, duration: 0 },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "648d360b319e67c67e8c1ebf",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "648d360b319e67c67e8c1ebf",
            appliesTo: "PAGE",
            styleBlockIds: [],
          },
        ],
        config: [
          {
            continuousParameterGroupId: "a-29-p",
            selectedAxis: "X_AXIS",
            basedOn: "VIEWPORT",
            reverse: false,
            smoothing: 50,
            restingState: 50,
          },
          {
            continuousParameterGroupId: "a-29-p-2",
            selectedAxis: "Y_AXIS",
            basedOn: "VIEWPORT",
            reverse: false,
            smoothing: 50,
            restingState: 50,
          },
        ],
        createdOn: 1687030789276,
      },
      "e-38": {
        id: "e-38",
        name: "",
        animationType: "custom",
        eventTypeId: "MOUSE_MOVE",
        action: {
          id: "",
          actionTypeId: "GENERAL_CONTINUOUS_ACTION",
          config: { actionListId: "a-30", affectedElements: {}, duration: 0 },
        },
        mediaQueries: ["main"],
        target: {
          id: "648d360b319e67c67e8c1ebf",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "648d360b319e67c67e8c1ebf",
            appliesTo: "PAGE",
            styleBlockIds: [],
          },
        ],
        config: [
          {
            continuousParameterGroupId: "a-30-p",
            selectedAxis: "X_AXIS",
            basedOn: "VIEWPORT",
            reverse: false,
            smoothing: 50,
            restingState: 50,
          },
          {
            continuousParameterGroupId: "a-30-p-2",
            selectedAxis: "Y_AXIS",
            basedOn: "VIEWPORT",
            reverse: false,
            smoothing: 50,
            restingState: 50,
          },
        ],
        createdOn: 1687122007616,
      },
      "e-39": {
        id: "e-39",
        animationType: "custom",
        eventTypeId: "MOUSE_OVER",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-33",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-40",
          },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "648d360b319e67c67e8c1ebf|f5adc4da-c6c0-6455-e0eb-1c51d27c3de6",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "648d360b319e67c67e8c1ebf|f5adc4da-c6c0-6455-e0eb-1c51d27c3de6",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1557768367629,
      },
      "e-40": {
        id: "e-40",
        animationType: "custom",
        eventTypeId: "MOUSE_OUT",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-34",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-39",
          },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "648d360b319e67c67e8c1ebf|f5adc4da-c6c0-6455-e0eb-1c51d27c3de6",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "648d360b319e67c67e8c1ebf|f5adc4da-c6c0-6455-e0eb-1c51d27c3de6",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1557768367630,
      },
      "e-41": {
        id: "e-41",
        name: "",
        animationType: "preset",
        eventTypeId: "MOUSE_OVER",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-33",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-42",
          },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "648d360b319e67c67e8c1ebf|188645f1-ad69-5742-ca3d-5bc8d748ebdc",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "648d360b319e67c67e8c1ebf|188645f1-ad69-5742-ca3d-5bc8d748ebdc",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1687122722744,
      },
      "e-42": {
        id: "e-42",
        name: "",
        animationType: "preset",
        eventTypeId: "MOUSE_OUT",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-34",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-41",
          },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "648d360b319e67c67e8c1ebf|188645f1-ad69-5742-ca3d-5bc8d748ebdc",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "648d360b319e67c67e8c1ebf|188645f1-ad69-5742-ca3d-5bc8d748ebdc",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1687122722744,
      },
      "e-43": {
        id: "e-43",
        name: "",
        animationType: "preset",
        eventTypeId: "MOUSE_OVER",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-33",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-44",
          },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "4b59dc72-2a4a-720f-cdbe-3a4f096749ce",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "4b59dc72-2a4a-720f-cdbe-3a4f096749ce",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1687122777892,
      },
      "e-44": {
        id: "e-44",
        name: "",
        animationType: "preset",
        eventTypeId: "MOUSE_OUT",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-34",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-43",
          },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "4b59dc72-2a4a-720f-cdbe-3a4f096749ce",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "4b59dc72-2a4a-720f-cdbe-3a4f096749ce",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1687122777892,
      },
      "e-45": {
        id: "e-45",
        name: "",
        animationType: "preset",
        eventTypeId: "MOUSE_OVER",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-33",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-46",
          },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "0eac992d-6146-fb9a-a45c-ca7b2786be4a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "0eac992d-6146-fb9a-a45c-ca7b2786be4a",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1687122861139,
      },
      "e-46": {
        id: "e-46",
        name: "",
        animationType: "preset",
        eventTypeId: "MOUSE_OUT",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-34",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-45",
          },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "0eac992d-6146-fb9a-a45c-ca7b2786be4a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "0eac992d-6146-fb9a-a45c-ca7b2786be4a",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1687122861139,
      },
      "e-47": {
        id: "e-47",
        name: "",
        animationType: "preset",
        eventTypeId: "MOUSE_OVER",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-33",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-48",
          },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "a10103f9-b1c5-76e6-5b94-6988bd7911ef",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "a10103f9-b1c5-76e6-5b94-6988bd7911ef",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1687122885848,
      },
      "e-48": {
        id: "e-48",
        name: "",
        animationType: "preset",
        eventTypeId: "MOUSE_OUT",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-34",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-47",
          },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "a10103f9-b1c5-76e6-5b94-6988bd7911ef",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "a10103f9-b1c5-76e6-5b94-6988bd7911ef",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1687122885848,
      },
      "e-49": {
        id: "e-49",
        name: "",
        animationType: "preset",
        eventTypeId: "MOUSE_OVER",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-33",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-50",
          },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "fcda0acd-e946-9354-139a-7ef51307e7fa",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "fcda0acd-e946-9354-139a-7ef51307e7fa",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1687122940920,
      },
      "e-50": {
        id: "e-50",
        name: "",
        animationType: "preset",
        eventTypeId: "MOUSE_OUT",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-34",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-49",
          },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "fcda0acd-e946-9354-139a-7ef51307e7fa",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "fcda0acd-e946-9354-139a-7ef51307e7fa",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1687122940920,
      },
      "e-53": {
        id: "e-53",
        animationType: "custom",
        eventTypeId: "MOUSE_OVER",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-38",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-54",
          },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          selector: ".btn",
          originalId:
            "648d360b319e67c67e8c1ebf|680ab966-a63f-8320-b43a-b939e8cea7a0",
          appliesTo: "CLASS",
        },
        targets: [
          {
            selector: ".btn",
            originalId:
              "648d360b319e67c67e8c1ebf|680ab966-a63f-8320-b43a-b939e8cea7a0",
            appliesTo: "CLASS",
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1579915036589,
      },
      "e-54": {
        id: "e-54",
        animationType: "custom",
        eventTypeId: "MOUSE_OUT",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-39",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-53",
          },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          selector: ".btn",
          originalId:
            "648d360b319e67c67e8c1ebf|680ab966-a63f-8320-b43a-b939e8cea7a0",
          appliesTo: "CLASS",
        },
        targets: [
          {
            selector: ".btn",
            originalId:
              "648d360b319e67c67e8c1ebf|680ab966-a63f-8320-b43a-b939e8cea7a0",
            appliesTo: "CLASS",
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1579915036589,
      },
      "e-55": {
        id: "e-55",
        animationType: "custom",
        eventTypeId: "SCROLLING_IN_VIEW",
        action: {
          id: "",
          actionTypeId: "GENERAL_CONTINUOUS_ACTION",
          config: { actionListId: "a-40", affectedElements: {}, duration: 0 },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          selector: ".project",
          originalId:
            "648d360b319e67c67e8c1ebf|680ab966-a63f-8320-b43a-b939e8cea7af",
          appliesTo: "CLASS",
        },
        targets: [
          {
            selector: ".project",
            originalId:
              "648d360b319e67c67e8c1ebf|680ab966-a63f-8320-b43a-b939e8cea7af",
            appliesTo: "CLASS",
          },
        ],
        config: [
          {
            continuousParameterGroupId: "a-40-p",
            smoothing: 40,
            startsEntering: true,
            addStartOffset: false,
            addOffsetValue: 50,
            startsExiting: false,
            addEndOffset: false,
            endOffsetValue: 50,
          },
        ],
        createdOn: 1579824908741,
      },
      "e-57": {
        id: "e-57",
        name: "",
        animationType: "custom",
        eventTypeId: "MOUSE_OVER",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-41",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-58",
          },
        },
        mediaQueries: ["main", "medium"],
        target: {
          selector: ".link-02",
          originalId:
            "648d360b319e67c67e8c1ebf|538bd9bc-346a-48b0-5f75-040d2d09d1dc",
          appliesTo: "CLASS",
        },
        targets: [
          {
            selector: ".link-02",
            originalId:
              "648d360b319e67c67e8c1ebf|538bd9bc-346a-48b0-5f75-040d2d09d1dc",
            appliesTo: "CLASS",
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1680164269960,
      },
      "e-58": {
        id: "e-58",
        name: "",
        animationType: "custom",
        eventTypeId: "MOUSE_OUT",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-42",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-57",
          },
        },
        mediaQueries: ["main", "medium"],
        target: {
          selector: ".link-02",
          originalId:
            "648d360b319e67c67e8c1ebf|538bd9bc-346a-48b0-5f75-040d2d09d1dc",
          appliesTo: "CLASS",
        },
        targets: [
          {
            selector: ".link-02",
            originalId:
              "648d360b319e67c67e8c1ebf|538bd9bc-346a-48b0-5f75-040d2d09d1dc",
            appliesTo: "CLASS",
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1680164269961,
      },
      "e-61": {
        id: "e-61",
        name: "",
        animationType: "preset",
        eventTypeId: "MOUSE_OVER",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-43",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-62",
          },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "862ab496-b65f-1be2-3b0f-89a005c275cc",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "862ab496-b65f-1be2-3b0f-89a005c275cc",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1687129215832,
      },
      "e-62": {
        id: "e-62",
        name: "",
        animationType: "preset",
        eventTypeId: "MOUSE_OUT",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-44",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-61",
          },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "862ab496-b65f-1be2-3b0f-89a005c275cc",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "862ab496-b65f-1be2-3b0f-89a005c275cc",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1687129215832,
      },
      "e-63": {
        id: "e-63",
        name: "",
        animationType: "custom",
        eventTypeId: "MOUSE_MOVE",
        action: {
          id: "",
          actionTypeId: "GENERAL_CONTINUOUS_ACTION",
          config: { actionListId: "a-48", affectedElements: {}, duration: 0 },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "648d360b319e67c67e8c1ebf",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "648d360b319e67c67e8c1ebf",
            appliesTo: "PAGE",
            styleBlockIds: [],
          },
        ],
        config: [
          {
            continuousParameterGroupId: "a-48-p",
            selectedAxis: "X_AXIS",
            basedOn: "VIEWPORT",
            reverse: false,
            smoothing: 50,
            restingState: 50,
          },
          {
            continuousParameterGroupId: "a-48-p-2",
            selectedAxis: "Y_AXIS",
            basedOn: "VIEWPORT",
            reverse: false,
            smoothing: 50,
            restingState: 50,
          },
        ],
        createdOn: 1687159741525,
      },
      "e-64": {
        id: "e-64",
        name: "",
        animationType: "preset",
        eventTypeId: "SCROLL_INTO_VIEW",
        action: {
          id: "",
          actionTypeId: "SLIDE_EFFECT",
          instant: false,
          config: { actionListId: "slideInBottom", autoStopEventId: "e-65" },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "648d360b319e67c67e8c1ebf|829a1ed6-6e89-b854-2c87-ae2816cd6814",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "648d360b319e67c67e8c1ebf|829a1ed6-6e89-b854-2c87-ae2816cd6814",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: 10,
          scrollOffsetUnit: "%",
          delay: 200,
          direction: "BOTTOM",
          effectIn: true,
        },
        createdOn: 1687159990850,
      },
      "e-66": {
        id: "e-66",
        name: "",
        animationType: "preset",
        eventTypeId: "SCROLL_INTO_VIEW",
        action: {
          id: "",
          actionTypeId: "SLIDE_EFFECT",
          instant: false,
          config: { actionListId: "slideInBottom", autoStopEventId: "e-67" },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "648d360b319e67c67e8c1ebf|26fe4e2b-70c9-0e77-387f-d506d10f8885",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "648d360b319e67c67e8c1ebf|26fe4e2b-70c9-0e77-387f-d506d10f8885",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: 10,
          scrollOffsetUnit: "%",
          delay: 200,
          direction: "BOTTOM",
          effectIn: true,
        },
        createdOn: 1687160013181,
      },
      "e-68": {
        id: "e-68",
        name: "",
        animationType: "preset",
        eventTypeId: "SCROLL_INTO_VIEW",
        action: {
          id: "",
          actionTypeId: "SLIDE_EFFECT",
          instant: false,
          config: { actionListId: "slideInBottom", autoStopEventId: "e-69" },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "648d360b319e67c67e8c1ebf|717db575-3442-0723-971a-666579a0e8a1",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "648d360b319e67c67e8c1ebf|717db575-3442-0723-971a-666579a0e8a1",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: 20,
          scrollOffsetUnit: "%",
          delay: 300,
          direction: "BOTTOM",
          effectIn: true,
        },
        createdOn: 1687160031093,
      },
      "e-70": {
        id: "e-70",
        name: "",
        animationType: "preset",
        eventTypeId: "SCROLL_INTO_VIEW",
        action: {
          id: "",
          actionTypeId: "FADE_EFFECT",
          instant: false,
          config: { actionListId: "fadeIn", autoStopEventId: "e-71" },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "648d360b319e67c67e8c1ebf|53650ff3-1016-d787-c581-87c118f8da5c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "648d360b319e67c67e8c1ebf|53650ff3-1016-d787-c581-87c118f8da5c",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: 10,
          scrollOffsetUnit: "%",
          delay: 200,
          direction: null,
          effectIn: true,
        },
        createdOn: 1687160049470,
      },
      "e-72": {
        id: "e-72",
        name: "",
        animationType: "custom",
        eventTypeId: "SCROLLING_IN_VIEW",
        action: {
          id: "",
          actionTypeId: "GENERAL_CONTINUOUS_ACTION",
          config: { actionListId: "a-49", affectedElements: {}, duration: 0 },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          selector: ".card",
          originalId:
            "6491ee0113b648dfaa07c6e2|00c20098-ca54-304f-1120-0c3922c413d6",
          appliesTo: "CLASS",
        },
        targets: [
          {
            selector: ".card",
            originalId:
              "6491ee0113b648dfaa07c6e2|00c20098-ca54-304f-1120-0c3922c413d6",
            appliesTo: "CLASS",
          },
        ],
        config: [
          {
            continuousParameterGroupId: "a-49-p",
            smoothing: 75,
            startsEntering: true,
            addStartOffset: false,
            addOffsetValue: 50,
            startsExiting: false,
            addEndOffset: false,
            endOffsetValue: 50,
          },
        ],
        createdOn: 1681112637894,
      },
      "e-81": {
        id: "e-81",
        name: "",
        animationType: "custom",
        eventTypeId: "MOUSE_OVER",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-52",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-82",
          },
        },
        mediaQueries: ["main"],
        target: {
          selector: ".nav-link",
          originalId: "c0e85af1-ae48-50b8-3353-f790c9d98329",
          appliesTo: "CLASS",
        },
        targets: [
          {
            selector: ".nav-link",
            originalId: "c0e85af1-ae48-50b8-3353-f790c9d98329",
            appliesTo: "CLASS",
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1617498236287,
      },
      "e-82": {
        id: "e-82",
        name: "",
        animationType: "custom",
        eventTypeId: "MOUSE_OUT",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-53",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-81",
          },
        },
        mediaQueries: ["main"],
        target: {
          selector: ".nav-link",
          originalId: "c0e85af1-ae48-50b8-3353-f790c9d98329",
          appliesTo: "CLASS",
        },
        targets: [
          {
            selector: ".nav-link",
            originalId: "c0e85af1-ae48-50b8-3353-f790c9d98329",
            appliesTo: "CLASS",
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1617498236288,
      },
      "e-83": {
        id: "e-83",
        name: "",
        animationType: "custom",
        eventTypeId: "MOUSE_OVER",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-54",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-84",
          },
        },
        mediaQueries: ["main"],
        target: {
          selector: ".sublink",
          originalId: "5d873e14-6ff2-4a6b-a36e-358380c2073f",
          appliesTo: "CLASS",
        },
        targets: [
          {
            selector: ".sublink",
            originalId: "5d873e14-6ff2-4a6b-a36e-358380c2073f",
            appliesTo: "CLASS",
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1617498443695,
      },
      "e-84": {
        id: "e-84",
        name: "",
        animationType: "custom",
        eventTypeId: "MOUSE_OUT",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-55",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-83",
          },
        },
        mediaQueries: ["main"],
        target: {
          selector: ".sublink",
          originalId: "5d873e14-6ff2-4a6b-a36e-358380c2073f",
          appliesTo: "CLASS",
        },
        targets: [
          {
            selector: ".sublink",
            originalId: "5d873e14-6ff2-4a6b-a36e-358380c2073f",
            appliesTo: "CLASS",
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1617498443696,
      },
      "e-85": {
        id: "e-85",
        name: "",
        animationType: "custom",
        eventTypeId: "MOUSE_CLICK",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-56",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-86",
          },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          selector: ".trigger",
          originalId: "46a408eb-724e-a3f4-e485-a0ea0dc1991b",
          appliesTo: "CLASS",
        },
        targets: [
          {
            selector: ".trigger",
            originalId: "46a408eb-724e-a3f4-e485-a0ea0dc1991b",
            appliesTo: "CLASS",
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1617485540060,
      },
      "e-86": {
        id: "e-86",
        name: "",
        animationType: "custom",
        eventTypeId: "MOUSE_SECOND_CLICK",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-57",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-85",
          },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          selector: ".trigger",
          originalId: "46a408eb-724e-a3f4-e485-a0ea0dc1991b",
          appliesTo: "CLASS",
        },
        targets: [
          {
            selector: ".trigger",
            originalId: "46a408eb-724e-a3f4-e485-a0ea0dc1991b",
            appliesTo: "CLASS",
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1617485540061,
      },
      "e-87": {
        id: "e-87",
        name: "",
        animationType: "custom",
        eventTypeId: "MOUSE_OVER",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-58",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-88",
          },
        },
        mediaQueries: ["main"],
        target: {
          selector: ".control",
          originalId:
            "648d360b319e67c67e8c1ebf|30c1bbcf-98de-a729-db68-051bc46dee15",
          appliesTo: "CLASS",
        },
        targets: [
          {
            selector: ".control",
            originalId:
              "648d360b319e67c67e8c1ebf|30c1bbcf-98de-a729-db68-051bc46dee15",
            appliesTo: "CLASS",
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1617476135370,
      },
      "e-88": {
        id: "e-88",
        name: "",
        animationType: "custom",
        eventTypeId: "MOUSE_OUT",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-59",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-87",
          },
        },
        mediaQueries: ["main"],
        target: {
          selector: ".control",
          originalId:
            "648d360b319e67c67e8c1ebf|30c1bbcf-98de-a729-db68-051bc46dee15",
          appliesTo: "CLASS",
        },
        targets: [
          {
            selector: ".control",
            originalId:
              "648d360b319e67c67e8c1ebf|30c1bbcf-98de-a729-db68-051bc46dee15",
            appliesTo: "CLASS",
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1617476135371,
      },
      "e-99": {
        id: "e-99",
        name: "",
        animationType: "custom",
        eventTypeId: "MOUSE_MOVE",
        action: {
          id: "",
          actionTypeId: "GENERAL_CONTINUOUS_ACTION",
          config: { actionListId: "a-69", affectedElements: {}, duration: 0 },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "648d360b319e67c67e8c1ebf|9da493a1-3224-3ffe-734b-26e22b6dc6e7",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "648d360b319e67c67e8c1ebf|9da493a1-3224-3ffe-734b-26e22b6dc6e7",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: [
          {
            continuousParameterGroupId: "a-69-p",
            selectedAxis: "X_AXIS",
            basedOn: "ELEMENT",
            reverse: false,
            smoothing: 50,
            restingState: 50,
          },
          {
            continuousParameterGroupId: "a-69-p-2",
            selectedAxis: "Y_AXIS",
            basedOn: "ELEMENT",
            reverse: false,
            smoothing: 50,
            restingState: 50,
          },
        ],
        createdOn: 1688364428987,
      },
      "e-100": {
        id: "e-100",
        name: "",
        animationType: "custom",
        eventTypeId: "MOUSE_MOVE",
        action: {
          id: "",
          actionTypeId: "GENERAL_CONTINUOUS_ACTION",
          config: { actionListId: "a-70", affectedElements: {}, duration: 0 },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "648d360b319e67c67e8c1ebf|77486698-56a5-44f4-fff7-dadb6cb553a2",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "648d360b319e67c67e8c1ebf|77486698-56a5-44f4-fff7-dadb6cb553a2",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: [
          {
            continuousParameterGroupId: "a-70-p",
            selectedAxis: "X_AXIS",
            basedOn: "ELEMENT",
            reverse: false,
            smoothing: 50,
            restingState: 50,
          },
          {
            continuousParameterGroupId: "a-70-p-2",
            selectedAxis: "Y_AXIS",
            basedOn: "ELEMENT",
            reverse: false,
            smoothing: 50,
            restingState: 50,
          },
        ],
        createdOn: 1688364880334,
      },
      "e-101": {
        id: "e-101",
        name: "",
        animationType: "custom",
        eventTypeId: "SCROLLING_IN_VIEW",
        action: {
          id: "",
          actionTypeId: "GENERAL_CONTINUOUS_ACTION",
          config: { actionListId: "a-61", affectedElements: {}, duration: 0 },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "648d360b319e67c67e8c1ebf|0990450d-d3bf-f2f7-b5e2-ebcb6c80c709",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "648d360b319e67c67e8c1ebf|0990450d-d3bf-f2f7-b5e2-ebcb6c80c709",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: [
          {
            continuousParameterGroupId: "a-61-p",
            smoothing: 75,
            startsEntering: true,
            addStartOffset: false,
            addOffsetValue: 50,
            startsExiting: false,
            addEndOffset: false,
            endOffsetValue: 50,
          },
        ],
        createdOn: 1688366005823,
      },
      "e-102": {
        id: "e-102",
        name: "",
        animationType: "custom",
        eventTypeId: "MOUSE_OVER",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-71",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-103",
          },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "648d360b319e67c67e8c1ebf|92970298-11e2-15a3-b1dc-a311ebf6b893",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "648d360b319e67c67e8c1ebf|92970298-11e2-15a3-b1dc-a311ebf6b893",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1671758268949,
      },
      "e-103": {
        id: "e-103",
        name: "",
        animationType: "custom",
        eventTypeId: "MOUSE_OUT",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-72",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-102",
          },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "648d360b319e67c67e8c1ebf|92970298-11e2-15a3-b1dc-a311ebf6b893",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "648d360b319e67c67e8c1ebf|92970298-11e2-15a3-b1dc-a311ebf6b893",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1671758268950,
      },
      "e-104": {
        id: "e-104",
        name: "",
        animationType: "preset",
        eventTypeId: "MOUSE_OVER",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-71",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-105",
          },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "648d360b319e67c67e8c1ebf|92970298-11e2-15a3-b1dc-a311ebf6b8a0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "648d360b319e67c67e8c1ebf|92970298-11e2-15a3-b1dc-a311ebf6b8a0",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1671759036659,
      },
      "e-105": {
        id: "e-105",
        name: "",
        animationType: "preset",
        eventTypeId: "MOUSE_OUT",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-72",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-104",
          },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "648d360b319e67c67e8c1ebf|92970298-11e2-15a3-b1dc-a311ebf6b8a0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "648d360b319e67c67e8c1ebf|92970298-11e2-15a3-b1dc-a311ebf6b8a0",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1671759036659,
      },
      "e-109": {
        id: "e-109",
        name: "",
        animationType: "preset",
        eventTypeId: "SCROLLING_IN_VIEW",
        action: {
          id: "",
          actionTypeId: "GENERAL_CONTINUOUS_ACTION",
          config: { actionListId: "a-73", affectedElements: {}, duration: 0 },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "648d360b319e67c67e8c1ebf|32441005-6a11-1b5e-388b-008d65ccf793",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "648d360b319e67c67e8c1ebf|32441005-6a11-1b5e-388b-008d65ccf793",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: [
          {
            continuousParameterGroupId: "a-73-p",
            smoothing: 50,
            startsEntering: true,
            addStartOffset: false,
            addOffsetValue: 50,
            startsExiting: false,
            addEndOffset: false,
            endOffsetValue: 50,
          },
        ],
        createdOn: 1688423858194,
      },
      "e-110": {
        id: "e-110",
        name: "",
        animationType: "custom",
        eventTypeId: "SCROLL_INTO_VIEW",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-76",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-111",
          },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          selector: ".step-block",
          originalId:
            "64d30dd914d7241a1fdcb70a|87dfd21a-104d-61a8-3969-09291c380ee5",
          appliesTo: "CLASS",
        },
        targets: [
          {
            selector: ".step-block",
            originalId:
              "64d30dd914d7241a1fdcb70a|87dfd21a-104d-61a8-3969-09291c380ee5",
            appliesTo: "CLASS",
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: 50,
          scrollOffsetUnit: "%",
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1611337298036,
      },
      "e-112": {
        id: "e-112",
        name: "",
        animationType: "preset",
        eventTypeId: "SCROLL_INTO_VIEW",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-77",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-113",
          },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          selector: ".step-block",
          originalId:
            "64d30dd914d7241a1fdcb70a|87dfd21a-104d-61a8-3969-09291c380f08",
          appliesTo: "CLASS",
        },
        targets: [
          {
            selector: ".step-block",
            originalId:
              "64d30dd914d7241a1fdcb70a|87dfd21a-104d-61a8-3969-09291c380f08",
            appliesTo: "CLASS",
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: 50,
          scrollOffsetUnit: "%",
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1611755066275,
      },
      "e-114": {
        id: "e-114",
        name: "",
        animationType: "custom",
        eventTypeId: "MOUSE_OVER",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-78",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-115",
          },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          selector: ".single-marque-div",
          originalId:
            "64d30dd914d7241a1fdcb70a|748eef15-a7de-e10b-7133-0b4f3bac9488",
          appliesTo: "CLASS",
        },
        targets: [
          {
            selector: ".single-marque-div",
            originalId:
              "64d30dd914d7241a1fdcb70a|748eef15-a7de-e10b-7133-0b4f3bac9488",
            appliesTo: "CLASS",
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1653394985507,
      },
      "e-115": {
        id: "e-115",
        name: "",
        animationType: "custom",
        eventTypeId: "MOUSE_OUT",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-79",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-114",
          },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          selector: ".single-marque-div",
          originalId:
            "64d30dd914d7241a1fdcb70a|748eef15-a7de-e10b-7133-0b4f3bac9488",
          appliesTo: "CLASS",
        },
        targets: [
          {
            selector: ".single-marque-div",
            originalId:
              "64d30dd914d7241a1fdcb70a|748eef15-a7de-e10b-7133-0b4f3bac9488",
            appliesTo: "CLASS",
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1653394985508,
      },
      "e-116": {
        id: "e-116",
        name: "",
        animationType: "custom",
        eventTypeId: "PAGE_START",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-80",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-117",
          },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "64d30dd914d7241a1fdcb70a",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "64d30dd914d7241a1fdcb70a",
            appliesTo: "PAGE",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: true,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1691562080964,
      },
      "e-118": {
        id: "e-118",
        name: "",
        animationType: "custom",
        eventTypeId: "PAGE_START",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-81",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-119",
          },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "64d30dd914d7241a1fdcb70a",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "64d30dd914d7241a1fdcb70a",
            appliesTo: "PAGE",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: true,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1691562226692,
      },
      "e-120": {
        id: "e-120",
        name: "",
        animationType: "custom",
        eventTypeId: "PAGE_START",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-82",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-121",
          },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "64d30dd914d7241a1fdcb70a",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "64d30dd914d7241a1fdcb70a",
            appliesTo: "PAGE",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: true,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1691562289754,
      },
      "e-122": {
        id: "e-122",
        name: "",
        animationType: "custom",
        eventTypeId: "PAGE_START",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-83",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-123",
          },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "64d30dd914d7241a1fdcb70a",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "64d30dd914d7241a1fdcb70a",
            appliesTo: "PAGE",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: true,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1691562321495,
      },
      "e-166": {
        id: "e-166",
        name: "",
        animationType: "custom",
        eventTypeId: "MOUSE_CLICK",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-86",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-167",
          },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          selector: ".accordion-item-trigger",
          originalId:
            "64d33c8086efff4efa9e9da6|a365c338-1dad-cb05-6cdf-ea7ea30e6dd6",
          appliesTo: "CLASS",
        },
        targets: [
          {
            selector: ".accordion-item-trigger",
            originalId:
              "64d33c8086efff4efa9e9da6|a365c338-1dad-cb05-6cdf-ea7ea30e6dd6",
            appliesTo: "CLASS",
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1555887741271,
      },
      "e-167": {
        id: "e-167",
        name: "",
        animationType: "custom",
        eventTypeId: "MOUSE_SECOND_CLICK",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-87",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-166",
          },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          selector: ".accordion-item-trigger",
          originalId:
            "64d33c8086efff4efa9e9da6|a365c338-1dad-cb05-6cdf-ea7ea30e6dd6",
          appliesTo: "CLASS",
        },
        targets: [
          {
            selector: ".accordion-item-trigger",
            originalId:
              "64d33c8086efff4efa9e9da6|a365c338-1dad-cb05-6cdf-ea7ea30e6dd6",
            appliesTo: "CLASS",
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1555887741273,
      },
      "e-168": {
        id: "e-168",
        name: "",
        animationType: "preset",
        eventTypeId: "MOUSE_OVER",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-33",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-169",
          },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "648d360b319e67c67e8c1ebf|12fcc23a-34aa-fb97-e1a3-b22ed2b05df3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "648d360b319e67c67e8c1ebf|12fcc23a-34aa-fb97-e1a3-b22ed2b05df3",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1691610077045,
      },
      "e-169": {
        id: "e-169",
        name: "",
        animationType: "preset",
        eventTypeId: "MOUSE_OUT",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-34",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-168",
          },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "648d360b319e67c67e8c1ebf|12fcc23a-34aa-fb97-e1a3-b22ed2b05df3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "648d360b319e67c67e8c1ebf|12fcc23a-34aa-fb97-e1a3-b22ed2b05df3",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1691610077045,
      },
      "e-170": {
        id: "e-170",
        name: "",
        animationType: "preset",
        eventTypeId: "MOUSE_OVER",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-33",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-171",
          },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "648d360b319e67c67e8c1ebf|4cbbf004-b7ca-e333-4429-69768a839bad",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "648d360b319e67c67e8c1ebf|4cbbf004-b7ca-e333-4429-69768a839bad",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1691750728051,
      },
      "e-171": {
        id: "e-171",
        name: "",
        animationType: "preset",
        eventTypeId: "MOUSE_OUT",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-34",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-170",
          },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "648d360b319e67c67e8c1ebf|4cbbf004-b7ca-e333-4429-69768a839bad",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "648d360b319e67c67e8c1ebf|4cbbf004-b7ca-e333-4429-69768a839bad",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1691750728051,
      },
      "e-172": {
        id: "e-172",
        name: "",
        animationType: "preset",
        eventTypeId: "MOUSE_OVER",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-33",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-173",
          },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "648d360b319e67c67e8c1ebf|728c5782-3bb0-11a6-2a38-5522433ded61",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "648d360b319e67c67e8c1ebf|728c5782-3bb0-11a6-2a38-5522433ded61",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1691781320108,
      },
      "e-173": {
        id: "e-173",
        name: "",
        animationType: "preset",
        eventTypeId: "MOUSE_OUT",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-34",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-172",
          },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "648d360b319e67c67e8c1ebf|728c5782-3bb0-11a6-2a38-5522433ded61",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "648d360b319e67c67e8c1ebf|728c5782-3bb0-11a6-2a38-5522433ded61",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1691781320108,
      },
      "e-174": {
        id: "e-174",
        name: "",
        animationType: "preset",
        eventTypeId: "MOUSE_OVER",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-33",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-175",
          },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "648d360b319e67c67e8c1ebf|ebae334b-4563-dfd7-11e4-d95facbd9ecc",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "648d360b319e67c67e8c1ebf|ebae334b-4563-dfd7-11e4-d95facbd9ecc",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1691781604667,
      },
      "e-175": {
        id: "e-175",
        name: "",
        animationType: "preset",
        eventTypeId: "MOUSE_OUT",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-34",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-174",
          },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "648d360b319e67c67e8c1ebf|ebae334b-4563-dfd7-11e4-d95facbd9ecc",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "648d360b319e67c67e8c1ebf|ebae334b-4563-dfd7-11e4-d95facbd9ecc",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1691781604667,
      },
      "e-176": {
        id: "e-176",
        name: "",
        animationType: "preset",
        eventTypeId: "MOUSE_OVER",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-33",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-177",
          },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "648d360b319e67c67e8c1ebf|73b5c6d4-9363-1187-6447-768d1df28335",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "648d360b319e67c67e8c1ebf|73b5c6d4-9363-1187-6447-768d1df28335",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1691782618980,
      },
      "e-177": {
        id: "e-177",
        name: "",
        animationType: "preset",
        eventTypeId: "MOUSE_OUT",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-34",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-176",
          },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "648d360b319e67c67e8c1ebf|73b5c6d4-9363-1187-6447-768d1df28335",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "648d360b319e67c67e8c1ebf|73b5c6d4-9363-1187-6447-768d1df28335",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1691782618980,
      },
      "e-178": {
        id: "e-178",
        name: "",
        animationType: "preset",
        eventTypeId: "MOUSE_OVER",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-33",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-179",
          },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "648d360b319e67c67e8c1ebf|bc176e95-3024-8293-f70d-2264308513a7",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "648d360b319e67c67e8c1ebf|bc176e95-3024-8293-f70d-2264308513a7",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1691782696100,
      },
      "e-179": {
        id: "e-179",
        name: "",
        animationType: "preset",
        eventTypeId: "MOUSE_OUT",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-34",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-178",
          },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "648d360b319e67c67e8c1ebf|bc176e95-3024-8293-f70d-2264308513a7",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "648d360b319e67c67e8c1ebf|bc176e95-3024-8293-f70d-2264308513a7",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1691782696100,
      },
      "e-182": {
        id: "e-182",
        name: "",
        animationType: "custom",
        eventTypeId: "MOUSE_CLICK",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-89",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-183",
          },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          selector: ".accordion-item-trigger",
          originalId:
            "64ecd66cd17de197baca0c30|c3570db4-0cdb-e3f4-a50a-d6f3d0ae7ff3",
          appliesTo: "CLASS",
        },
        targets: [
          {
            selector: ".accordion-item-trigger",
            originalId:
              "64ecd66cd17de197baca0c30|c3570db4-0cdb-e3f4-a50a-d6f3d0ae7ff3",
            appliesTo: "CLASS",
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1555887741271,
      },
      "e-183": {
        id: "e-183",
        name: "",
        animationType: "custom",
        eventTypeId: "MOUSE_SECOND_CLICK",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-90",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-182",
          },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          selector: ".accordion-item-trigger",
          originalId:
            "64ecd66cd17de197baca0c30|c3570db4-0cdb-e3f4-a50a-d6f3d0ae7ff3",
          appliesTo: "CLASS",
        },
        targets: [
          {
            selector: ".accordion-item-trigger",
            originalId:
              "64ecd66cd17de197baca0c30|c3570db4-0cdb-e3f4-a50a-d6f3d0ae7ff3",
            appliesTo: "CLASS",
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1555887741273,
      },
      "e-184": {
        id: "e-184",
        name: "",
        animationType: "custom",
        eventTypeId: "MOUSE_CLICK",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-91",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-185",
          },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "64ecd66cd17de197baca0c30|c3570db4-0cdb-e3f4-a50a-d6f3d0ae7ff2",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "64ecd66cd17de197baca0c30|c3570db4-0cdb-e3f4-a50a-d6f3d0ae7ff2",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1693242124686,
      },
      "e-186": {
        id: "e-186",
        name: "",
        animationType: "preset",
        eventTypeId: "MOUSE_CLICK",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-92",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-187",
          },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "64ecd66cd17de197baca0c30|a210e246-0747-6068-fe21-d08a072a887f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "64ecd66cd17de197baca0c30|a210e246-0747-6068-fe21-d08a072a887f",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1693244109736,
      },
      "e-188": {
        id: "e-188",
        name: "",
        animationType: "preset",
        eventTypeId: "MOUSE_CLICK",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-93",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-189",
          },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "64ecd66cd17de197baca0c30|9575fd52-c19b-cac4-3675-d49a3f4f28ab",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "64ecd66cd17de197baca0c30|9575fd52-c19b-cac4-3675-d49a3f4f28ab",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1693244868239,
      },
      "e-190": {
        id: "e-190",
        name: "",
        animationType: "preset",
        eventTypeId: "MOUSE_CLICK",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-94",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-191",
          },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "64ecd66cd17de197baca0c30|196d5424-c7e2-01bf-3d82-8213a0c22f1b",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "64ecd66cd17de197baca0c30|196d5424-c7e2-01bf-3d82-8213a0c22f1b",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1693246967976,
      },
      "e-192": {
        id: "e-192",
        name: "",
        animationType: "preset",
        eventTypeId: "MOUSE_CLICK",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-95",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-193",
          },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "64ecd66cd17de197baca0c30|ac021592-371e-6df1-5ba8-a30ba06cadd5",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "64ecd66cd17de197baca0c30|ac021592-371e-6df1-5ba8-a30ba06cadd5",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1693282906778,
      },
      "e-194": {
        id: "e-194",
        name: "",
        animationType: "preset",
        eventTypeId: "MOUSE_CLICK",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-96",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-195",
          },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "64ecd66cd17de197baca0c30|16c7d0de-70ad-6ffb-642c-080e71bbd687",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "64ecd66cd17de197baca0c30|16c7d0de-70ad-6ffb-642c-080e71bbd687",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1693284077983,
      },
      "e-196": {
        id: "e-196",
        name: "",
        animationType: "preset",
        eventTypeId: "MOUSE_CLICK",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-97",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-197",
          },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "64ecd66cd17de197baca0c30|f2f5c6d0-4a3b-a66c-7259-8d1bcf7749b5",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "64ecd66cd17de197baca0c30|f2f5c6d0-4a3b-a66c-7259-8d1bcf7749b5",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1693285306816,
      },
      "e-198": {
        id: "e-198",
        name: "",
        animationType: "preset",
        eventTypeId: "MOUSE_CLICK",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-98",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-199",
          },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "64ecd66cd17de197baca0c30|abeae3ec-220d-0c14-5ed0-47a7e5032cdb",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "64ecd66cd17de197baca0c30|abeae3ec-220d-0c14-5ed0-47a7e5032cdb",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1693285755495,
      },
      "e-200": {
        id: "e-200",
        name: "",
        animationType: "preset",
        eventTypeId: "MOUSE_CLICK",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-99",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-201",
          },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "64ecd66cd17de197baca0c30|43308d20-19be-e1a2-cafc-63a63e622104",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "64ecd66cd17de197baca0c30|43308d20-19be-e1a2-cafc-63a63e622104",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1693300491013,
      },
      "e-202": {
        id: "e-202",
        name: "",
        animationType: "preset",
        eventTypeId: "MOUSE_CLICK",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-100",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-203",
          },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "64ecd66cd17de197baca0c30|dc707d1f-f9a7-a29b-8487-1daf5043bdcb",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "64ecd66cd17de197baca0c30|dc707d1f-f9a7-a29b-8487-1daf5043bdcb",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1693300807894,
      },
      "e-204": {
        id: "e-204",
        name: "",
        animationType: "preset",
        eventTypeId: "MOUSE_CLICK",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-101",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-205",
          },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "64ecd66cd17de197baca0c30|6f01a23e-f95e-7e51-7f3e-ab10c4ed303a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "64ecd66cd17de197baca0c30|6f01a23e-f95e-7e51-7f3e-ab10c4ed303a",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1693300882095,
      },
      "e-206": {
        id: "e-206",
        name: "",
        animationType: "preset",
        eventTypeId: "SCROLL_INTO_VIEW",
        action: {
          id: "",
          actionTypeId: "SLIDE_EFFECT",
          instant: false,
          config: { actionListId: "slideInLeft", autoStopEventId: "e-207" },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "648d360b319e67c67e8c1ebf|9da493a1-3224-3ffe-734b-26e22b6dc6e7",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "648d360b319e67c67e8c1ebf|9da493a1-3224-3ffe-734b-26e22b6dc6e7",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: 20,
          scrollOffsetUnit: "%",
          delay: 300,
          direction: "LEFT",
          effectIn: true,
        },
        createdOn: 1693372637714,
      },
      "e-208": {
        id: "e-208",
        name: "",
        animationType: "preset",
        eventTypeId: "SCROLL_INTO_VIEW",
        action: {
          id: "",
          actionTypeId: "SLIDE_EFFECT",
          instant: false,
          config: { actionListId: "slideInBottom", autoStopEventId: "e-209" },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "648d360b319e67c67e8c1ebf|3d7bab92-075c-711c-3381-a332a5f0d186",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "648d360b319e67c67e8c1ebf|3d7bab92-075c-711c-3381-a332a5f0d186",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: 20,
          scrollOffsetUnit: "%",
          delay: 300,
          direction: "BOTTOM",
          effectIn: true,
        },
        createdOn: 1693372659063,
      },
      "e-212": {
        id: "e-212",
        name: "",
        animationType: "preset",
        eventTypeId: "SCROLL_INTO_VIEW",
        action: {
          id: "",
          actionTypeId: "SLIDE_EFFECT",
          instant: false,
          config: { actionListId: "slideInBottom", autoStopEventId: "e-213" },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "648d360b319e67c67e8c1ebf|f5adc4da-c6c0-6455-e0eb-1c51d27c3de6",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "648d360b319e67c67e8c1ebf|f5adc4da-c6c0-6455-e0eb-1c51d27c3de6",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: 20,
          scrollOffsetUnit: "%",
          delay: 300,
          direction: "BOTTOM",
          effectIn: true,
        },
        createdOn: 1693372771015,
      },
      "e-214": {
        id: "e-214",
        name: "",
        animationType: "preset",
        eventTypeId: "SCROLL_INTO_VIEW",
        action: {
          id: "",
          actionTypeId: "SLIDE_EFFECT",
          instant: false,
          config: { actionListId: "slideInBottom", autoStopEventId: "e-215" },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          selector: ".d-131-logo-link-block",
          originalId:
            "648d360b319e67c67e8c1ebf|d2ccb4b8-e66e-40db-2b59-94f849c5e641",
          appliesTo: "CLASS",
        },
        targets: [
          {
            selector: ".d-131-logo-link-block",
            originalId:
              "648d360b319e67c67e8c1ebf|d2ccb4b8-e66e-40db-2b59-94f849c5e641",
            appliesTo: "CLASS",
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: 20,
          scrollOffsetUnit: "%",
          delay: 300,
          direction: "BOTTOM",
          effectIn: true,
        },
        createdOn: 1693372794506,
      },
      "e-216": {
        id: "e-216",
        name: "",
        animationType: "preset",
        eventTypeId: "SCROLL_INTO_VIEW",
        action: {
          id: "",
          actionTypeId: "SLIDE_EFFECT",
          instant: false,
          config: { actionListId: "slideInBottom", autoStopEventId: "e-217" },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          selector: ".business_text-style_h2",
          originalId:
            "648d360b319e67c67e8c1ebf|b082ccd1-b31c-d171-2677-b7c03add4046",
          appliesTo: "CLASS",
        },
        targets: [
          {
            selector: ".business_text-style_h2",
            originalId:
              "648d360b319e67c67e8c1ebf|b082ccd1-b31c-d171-2677-b7c03add4046",
            appliesTo: "CLASS",
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: 20,
          scrollOffsetUnit: "%",
          delay: 300,
          direction: "BOTTOM",
          effectIn: true,
        },
        createdOn: 1693372826535,
      },
      "e-218": {
        id: "e-218",
        name: "",
        animationType: "preset",
        eventTypeId: "SCROLL_INTO_VIEW",
        action: {
          id: "",
          actionTypeId: "SLIDE_EFFECT",
          instant: false,
          config: { actionListId: "slideInLeft", autoStopEventId: "e-219" },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "648d360b319e67c67e8c1ebf|77486698-56a5-44f4-fff7-dadb6cb553a6",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "648d360b319e67c67e8c1ebf|77486698-56a5-44f4-fff7-dadb6cb553a6",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: 20,
          scrollOffsetUnit: "%",
          delay: 300,
          direction: "LEFT",
          effectIn: true,
        },
        createdOn: 1693372847635,
      },
      "e-220": {
        id: "e-220",
        name: "",
        animationType: "preset",
        eventTypeId: "SCROLL_INTO_VIEW",
        action: {
          id: "",
          actionTypeId: "SLIDE_EFFECT",
          instant: false,
          config: { actionListId: "slideInLeft", autoStopEventId: "e-221" },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "648d360b319e67c67e8c1ebf|77486698-56a5-44f4-fff7-dadb6cb553ab",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "648d360b319e67c67e8c1ebf|77486698-56a5-44f4-fff7-dadb6cb553ab",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: 20,
          scrollOffsetUnit: "%",
          delay: 300,
          direction: "LEFT",
          effectIn: true,
        },
        createdOn: 1693372861178,
      },
      "e-222": {
        id: "e-222",
        name: "",
        animationType: "preset",
        eventTypeId: "SCROLL_INTO_VIEW",
        action: {
          id: "",
          actionTypeId: "SLIDE_EFFECT",
          instant: false,
          config: { actionListId: "slideInLeft", autoStopEventId: "e-223" },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "648d360b319e67c67e8c1ebf|e89fcaef-e405-ad94-ec14-bed7959a41e2",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "648d360b319e67c67e8c1ebf|e89fcaef-e405-ad94-ec14-bed7959a41e2",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: 20,
          scrollOffsetUnit: "%",
          delay: 300,
          direction: "LEFT",
          effectIn: true,
        },
        createdOn: 1693372872593,
      },
      "e-224": {
        id: "e-224",
        name: "",
        animationType: "preset",
        eventTypeId: "SCROLL_INTO_VIEW",
        action: {
          id: "",
          actionTypeId: "SLIDE_EFFECT",
          instant: false,
          config: { actionListId: "slideInLeft", autoStopEventId: "e-225" },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "648d360b319e67c67e8c1ebf|188645f1-ad69-5742-ca3d-5bc8d748ebdc",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "648d360b319e67c67e8c1ebf|188645f1-ad69-5742-ca3d-5bc8d748ebdc",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: 20,
          scrollOffsetUnit: "%",
          delay: 300,
          direction: "LEFT",
          effectIn: true,
        },
        createdOn: 1693372899668,
      },
      "e-226": {
        id: "e-226",
        name: "",
        animationType: "preset",
        eventTypeId: "SCROLL_INTO_VIEW",
        action: {
          id: "",
          actionTypeId: "SLIDE_EFFECT",
          instant: false,
          config: { actionListId: "slideInBottom", autoStopEventId: "e-227" },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "648d360b319e67c67e8c1ebf|c080ee4d-2c88-c343-1bb9-7d987863afc8",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "648d360b319e67c67e8c1ebf|c080ee4d-2c88-c343-1bb9-7d987863afc8",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: 20,
          scrollOffsetUnit: "%",
          delay: 300,
          direction: "BOTTOM",
          effectIn: true,
        },
        createdOn: 1693372915552,
      },
      "e-228": {
        id: "e-228",
        name: "",
        animationType: "preset",
        eventTypeId: "SCROLL_INTO_VIEW",
        action: {
          id: "",
          actionTypeId: "SLIDE_EFFECT",
          instant: false,
          config: { actionListId: "slideInBottom", autoStopEventId: "e-229" },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "648d360b319e67c67e8c1ebf|739ad890-0c17-bb84-0bb6-22ecef6067e5",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "648d360b319e67c67e8c1ebf|739ad890-0c17-bb84-0bb6-22ecef6067e5",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: 20,
          scrollOffsetUnit: "%",
          delay: 300,
          direction: "BOTTOM",
          effectIn: true,
        },
        createdOn: 1693372928568,
      },
      "e-230": {
        id: "e-230",
        name: "",
        animationType: "preset",
        eventTypeId: "SCROLL_INTO_VIEW",
        action: {
          id: "",
          actionTypeId: "FLIP_EFFECT",
          instant: false,
          config: { actionListId: "flipInLeft", autoStopEventId: "e-231" },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "648d360b319e67c67e8c1ebf|f33735ef-5ab4-a12f-5319-02cf47eb39df",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "648d360b319e67c67e8c1ebf|f33735ef-5ab4-a12f-5319-02cf47eb39df",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: 20,
          scrollOffsetUnit: "%",
          delay: 0,
          direction: "LEFT",
          effectIn: true,
        },
        createdOn: 1693372951081,
      },
      "e-232": {
        id: "e-232",
        name: "",
        animationType: "preset",
        eventTypeId: "SCROLL_INTO_VIEW",
        action: {
          id: "",
          actionTypeId: "SLIDE_EFFECT",
          instant: false,
          config: { actionListId: "slideInBottom", autoStopEventId: "e-233" },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "648d360b319e67c67e8c1ebf|ec9b9e35-d2bf-3fc9-7ad3-1db636a0a528",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "648d360b319e67c67e8c1ebf|ec9b9e35-d2bf-3fc9-7ad3-1db636a0a528",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: 20,
          scrollOffsetUnit: "%",
          delay: 300,
          direction: "BOTTOM",
          effectIn: true,
        },
        createdOn: 1693372973197,
      },
      "e-234": {
        id: "e-234",
        name: "",
        animationType: "preset",
        eventTypeId: "SCROLL_INTO_VIEW",
        action: {
          id: "",
          actionTypeId: "GROW_EFFECT",
          instant: false,
          config: { actionListId: "growIn", autoStopEventId: "e-235" },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "648d360b319e67c67e8c1ebf|92970298-11e2-15a3-b1dc-a311ebf6b893",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "648d360b319e67c67e8c1ebf|92970298-11e2-15a3-b1dc-a311ebf6b893",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: 20,
          scrollOffsetUnit: "%",
          delay: 300,
          direction: null,
          effectIn: true,
        },
        createdOn: 1693372992539,
      },
      "e-236": {
        id: "e-236",
        name: "",
        animationType: "preset",
        eventTypeId: "SCROLL_INTO_VIEW",
        action: {
          id: "",
          actionTypeId: "GROW_EFFECT",
          instant: false,
          config: { actionListId: "growIn", autoStopEventId: "e-237" },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "648d360b319e67c67e8c1ebf|92970298-11e2-15a3-b1dc-a311ebf6b8a0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "648d360b319e67c67e8c1ebf|92970298-11e2-15a3-b1dc-a311ebf6b8a0",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: 20,
          scrollOffsetUnit: "%",
          delay: 300,
          direction: null,
          effectIn: true,
        },
        createdOn: 1693373002402,
      },
      "e-238": {
        id: "e-238",
        name: "",
        animationType: "preset",
        eventTypeId: "SCROLL_INTO_VIEW",
        action: {
          id: "",
          actionTypeId: "SLIDE_EFFECT",
          instant: false,
          config: { actionListId: "slideInBottom", autoStopEventId: "e-239" },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "648d360b319e67c67e8c1ebf|9def9098-93a8-c995-5487-00af1c604a9c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "648d360b319e67c67e8c1ebf|9def9098-93a8-c995-5487-00af1c604a9c",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: 20,
          scrollOffsetUnit: "%",
          delay: 300,
          direction: "BOTTOM",
          effectIn: true,
        },
        createdOn: 1693373075225,
      },
      "e-240": {
        id: "e-240",
        name: "",
        animationType: "preset",
        eventTypeId: "SCROLL_INTO_VIEW",
        action: {
          id: "",
          actionTypeId: "GROW_EFFECT",
          instant: false,
          config: { actionListId: "growIn", autoStopEventId: "e-241" },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          selector: ".d-127-card-wrapper",
          originalId:
            "648d360b319e67c67e8c1ebf|867720da-3717-99c5-7fb2-14488eb2e0b5",
          appliesTo: "CLASS",
        },
        targets: [
          {
            selector: ".d-127-card-wrapper",
            originalId:
              "648d360b319e67c67e8c1ebf|867720da-3717-99c5-7fb2-14488eb2e0b5",
            appliesTo: "CLASS",
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: 20,
          scrollOffsetUnit: "%",
          delay: 300,
          direction: null,
          effectIn: true,
        },
        createdOn: 1693373094127,
      },
      "e-242": {
        id: "e-242",
        name: "",
        animationType: "preset",
        eventTypeId: "SCROLL_INTO_VIEW",
        action: {
          id: "",
          actionTypeId: "SLIDE_EFFECT",
          instant: false,
          config: { actionListId: "slideInBottom", autoStopEventId: "e-243" },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "648d360b319e67c67e8c1ebf|d6a0d227-7a82-8fc2-70aa-737c672d9ca7",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "648d360b319e67c67e8c1ebf|d6a0d227-7a82-8fc2-70aa-737c672d9ca7",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: 20,
          scrollOffsetUnit: "%",
          delay: 300,
          direction: "BOTTOM",
          effectIn: true,
        },
        createdOn: 1693373122191,
      },
      "e-244": {
        id: "e-244",
        name: "",
        animationType: "preset",
        eventTypeId: "SCROLL_INTO_VIEW",
        action: {
          id: "",
          actionTypeId: "SLIDE_EFFECT",
          instant: false,
          config: { actionListId: "slideInBottom", autoStopEventId: "e-245" },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "648d360b319e67c67e8c1ebf|7490f97c-df12-661b-d712-e80cae24ee29",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "648d360b319e67c67e8c1ebf|7490f97c-df12-661b-d712-e80cae24ee29",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: 20,
          scrollOffsetUnit: "%",
          delay: 300,
          direction: "BOTTOM",
          effectIn: true,
        },
        createdOn: 1693373136500,
      },
      "e-246": {
        id: "e-246",
        name: "",
        animationType: "preset",
        eventTypeId: "SCROLL_INTO_VIEW",
        action: {
          id: "",
          actionTypeId: "GROW_BIG_EFFECT",
          instant: false,
          config: { actionListId: "growBigIn", autoStopEventId: "e-247" },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "648d360b319e67c67e8c1ebf|32441005-6a11-1b5e-388b-008d65ccf797",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "648d360b319e67c67e8c1ebf|32441005-6a11-1b5e-388b-008d65ccf797",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: 20,
          scrollOffsetUnit: "%",
          delay: 300,
          direction: null,
          effectIn: true,
        },
        createdOn: 1693373160021,
      },
      "e-248": {
        id: "e-248",
        name: "",
        animationType: "preset",
        eventTypeId: "SCROLL_INTO_VIEW",
        action: {
          id: "",
          actionTypeId: "SLIDE_EFFECT",
          instant: false,
          config: { actionListId: "slideInLeft", autoStopEventId: "e-249" },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "648d360b319e67c67e8c1ebf|32441005-6a11-1b5e-388b-008d65ccf799",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "648d360b319e67c67e8c1ebf|32441005-6a11-1b5e-388b-008d65ccf799",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: 20,
          scrollOffsetUnit: "%",
          delay: 300,
          direction: "LEFT",
          effectIn: true,
        },
        createdOn: 1693373171998,
      },
      "e-250": {
        id: "e-250",
        name: "",
        animationType: "preset",
        eventTypeId: "SCROLL_INTO_VIEW",
        action: {
          id: "",
          actionTypeId: "SLIDE_EFFECT",
          instant: false,
          config: { actionListId: "slideInLeft", autoStopEventId: "e-251" },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "648d360b319e67c67e8c1ebf|12fcc23a-34aa-fb97-e1a3-b22ed2b05df3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "648d360b319e67c67e8c1ebf|12fcc23a-34aa-fb97-e1a3-b22ed2b05df3",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: 20,
          scrollOffsetUnit: "%",
          delay: 300,
          direction: "LEFT",
          effectIn: true,
        },
        createdOn: 1693373197861,
      },
      "e-252": {
        id: "e-252",
        name: "",
        animationType: "preset",
        eventTypeId: "SCROLL_INTO_VIEW",
        action: {
          id: "",
          actionTypeId: "SLIDE_EFFECT",
          instant: false,
          config: { actionListId: "slideInBottom", autoStopEventId: "e-253" },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "648d360b319e67c67e8c1ebf|a3b3fc76-9f5f-f97e-58e9-b47b00c6111c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "648d360b319e67c67e8c1ebf|a3b3fc76-9f5f-f97e-58e9-b47b00c6111c",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: 20,
          scrollOffsetUnit: "%",
          delay: 300,
          direction: "BOTTOM",
          effectIn: true,
        },
        createdOn: 1693373221245,
      },
      "e-254": {
        id: "e-254",
        name: "",
        animationType: "preset",
        eventTypeId: "SCROLL_INTO_VIEW",
        action: {
          id: "",
          actionTypeId: "SLIDE_EFFECT",
          instant: false,
          config: { actionListId: "slideInBottom", autoStopEventId: "e-255" },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "648d360b319e67c67e8c1ebf|f5680780-d878-41dc-6be7-c79ec982c6e6",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "648d360b319e67c67e8c1ebf|f5680780-d878-41dc-6be7-c79ec982c6e6",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: 20,
          scrollOffsetUnit: "%",
          delay: 300,
          direction: "BOTTOM",
          effectIn: true,
        },
        createdOn: 1693373233009,
      },
      "e-256": {
        id: "e-256",
        name: "",
        animationType: "preset",
        eventTypeId: "SCROLL_INTO_VIEW",
        action: {
          id: "",
          actionTypeId: "SLIDE_EFFECT",
          instant: false,
          config: { actionListId: "slideInRight", autoStopEventId: "e-257" },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "648d360b319e67c67e8c1ebf|8a3c007e-0ca7-283b-ce3e-1e81f8d4deca",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "648d360b319e67c67e8c1ebf|8a3c007e-0ca7-283b-ce3e-1e81f8d4deca",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: 20,
          scrollOffsetUnit: "%",
          delay: 300,
          direction: "RIGHT",
          effectIn: true,
        },
        createdOn: 1693373333227,
      },
      "e-258": {
        id: "e-258",
        name: "",
        animationType: "preset",
        eventTypeId: "SCROLL_INTO_VIEW",
        action: {
          id: "",
          actionTypeId: "SLIDE_EFFECT",
          instant: false,
          config: { actionListId: "slideInBottom", autoStopEventId: "e-259" },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          selector: ".product-page_text-style-heading",
          originalId:
            "64ab0ca880dc875e20e64bf2|916b137a-1c1b-2e8d-e9a6-51a5824aa934",
          appliesTo: "CLASS",
        },
        targets: [
          {
            selector: ".product-page_text-style-heading",
            originalId:
              "64ab0ca880dc875e20e64bf2|916b137a-1c1b-2e8d-e9a6-51a5824aa934",
            appliesTo: "CLASS",
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: 20,
          scrollOffsetUnit: "%",
          delay: 200,
          direction: "BOTTOM",
          effectIn: true,
        },
        createdOn: 1693373361139,
      },
      "e-260": {
        id: "e-260",
        name: "",
        animationType: "preset",
        eventTypeId: "SCROLL_INTO_VIEW",
        action: {
          id: "",
          actionTypeId: "GROW_BIG_EFFECT",
          instant: false,
          config: { actionListId: "growBigIn", autoStopEventId: "e-261" },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          selector: ".filter-button-00.button-filter.concrete",
          originalId:
            "64ab0ca880dc875e20e64bf2|2679b4fc-d207-04c5-0c62-f4607754dc12",
          appliesTo: "CLASS",
        },
        targets: [
          {
            selector: ".filter-button-00.button-filter.concrete",
            originalId:
              "64ab0ca880dc875e20e64bf2|2679b4fc-d207-04c5-0c62-f4607754dc12",
            appliesTo: "CLASS",
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: 20,
          scrollOffsetUnit: "%",
          delay: 200,
          direction: null,
          effectIn: true,
        },
        createdOn: 1693373382752,
      },
      "e-262": {
        id: "e-262",
        name: "",
        animationType: "preset",
        eventTypeId: "SCROLL_INTO_VIEW",
        action: {
          id: "",
          actionTypeId: "GROW_BIG_EFFECT",
          instant: false,
          config: { actionListId: "growBigIn", autoStopEventId: "e-263" },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          selector: ".filter-button-01.button-filter.repairs",
          originalId:
            "64ab0ca880dc875e20e64bf2|a8d7f2f1-c65d-b374-a0d0-e1abd53c08eb",
          appliesTo: "CLASS",
        },
        targets: [
          {
            selector: ".filter-button-01.button-filter.repairs",
            originalId:
              "64ab0ca880dc875e20e64bf2|a8d7f2f1-c65d-b374-a0d0-e1abd53c08eb",
            appliesTo: "CLASS",
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: 20,
          scrollOffsetUnit: "%",
          delay: 200,
          direction: null,
          effectIn: true,
        },
        createdOn: 1693373435580,
      },
      "e-264": {
        id: "e-264",
        name: "",
        animationType: "preset",
        eventTypeId: "SCROLL_INTO_VIEW",
        action: {
          id: "",
          actionTypeId: "SLIDE_EFFECT",
          instant: false,
          config: { actionListId: "slideInBottom", autoStopEventId: "e-265" },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          selector: ".section-subtitle",
          originalId:
            "64d30dd914d7241a1fdcb70a|54255e0b-6f1d-99d0-e38b-49d74fe81a63",
          appliesTo: "CLASS",
        },
        targets: [
          {
            selector: ".section-subtitle",
            originalId:
              "64d30dd914d7241a1fdcb70a|54255e0b-6f1d-99d0-e38b-49d74fe81a63",
            appliesTo: "CLASS",
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: 20,
          scrollOffsetUnit: "%",
          delay: 300,
          direction: "BOTTOM",
          effectIn: true,
        },
        createdOn: 1693373464177,
      },
      "e-266": {
        id: "e-266",
        name: "",
        animationType: "preset",
        eventTypeId: "SCROLL_INTO_VIEW",
        action: {
          id: "",
          actionTypeId: "SLIDE_EFFECT",
          instant: false,
          config: { actionListId: "slideInBottom", autoStopEventId: "e-267" },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          selector: ".paragraph-2",
          originalId:
            "64d30dd914d7241a1fdcb70a|8ef0b6ff-6ebf-990f-271a-540a9e8b4f6e",
          appliesTo: "CLASS",
        },
        targets: [
          {
            selector: ".paragraph-2",
            originalId:
              "64d30dd914d7241a1fdcb70a|8ef0b6ff-6ebf-990f-271a-540a9e8b4f6e",
            appliesTo: "CLASS",
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: 20,
          scrollOffsetUnit: "%",
          delay: 300,
          direction: "BOTTOM",
          effectIn: true,
        },
        createdOn: 1693373480283,
      },
      "e-268": {
        id: "e-268",
        name: "",
        animationType: "preset",
        eventTypeId: "SCROLL_INTO_VIEW",
        action: {
          id: "",
          actionTypeId: "SLIDE_EFFECT",
          instant: false,
          config: { actionListId: "slideInLeft", autoStopEventId: "e-269" },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "64d30dd914d7241a1fdcb70a|b9c4794c-a392-3db0-5f71-f828bce36c95",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "64d30dd914d7241a1fdcb70a|b9c4794c-a392-3db0-5f71-f828bce36c95",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: 20,
          scrollOffsetUnit: "%",
          delay: 200,
          direction: "LEFT",
          effectIn: true,
        },
        createdOn: 1693373501103,
      },
      "e-270": {
        id: "e-270",
        name: "",
        animationType: "preset",
        eventTypeId: "SCROLL_INTO_VIEW",
        action: {
          id: "",
          actionTypeId: "SLIDE_EFFECT",
          instant: false,
          config: { actionListId: "slideInRight", autoStopEventId: "e-271" },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "64d30dd914d7241a1fdcb70a|f9d00c26-c098-714e-93e1-ec907b772cd6",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "64d30dd914d7241a1fdcb70a|f9d00c26-c098-714e-93e1-ec907b772cd6",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: 20,
          scrollOffsetUnit: "%",
          delay: 200,
          direction: "RIGHT",
          effectIn: true,
        },
        createdOn: 1693373511261,
      },
      "e-272": {
        id: "e-272",
        name: "",
        animationType: "preset",
        eventTypeId: "SCROLL_INTO_VIEW",
        action: {
          id: "",
          actionTypeId: "SLIDE_EFFECT",
          instant: false,
          config: { actionListId: "slideInRight", autoStopEventId: "e-273" },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "64d30dd914d7241a1fdcb70a|4b4da4ce-d3ec-971d-17e0-aeba8afdd85b",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "64d30dd914d7241a1fdcb70a|4b4da4ce-d3ec-971d-17e0-aeba8afdd85b",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: 20,
          scrollOffsetUnit: "%",
          delay: 200,
          direction: "RIGHT",
          effectIn: true,
        },
        createdOn: 1693373524825,
      },
      "e-274": {
        id: "e-274",
        name: "",
        animationType: "preset",
        eventTypeId: "SCROLL_INTO_VIEW",
        action: {
          id: "",
          actionTypeId: "SLIDE_EFFECT",
          instant: false,
          config: { actionListId: "slideInLeft", autoStopEventId: "e-275" },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "64d30dd914d7241a1fdcb70a|9885f298-747e-8d9c-ba30-57b916073fb9",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "64d30dd914d7241a1fdcb70a|9885f298-747e-8d9c-ba30-57b916073fb9",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: 20,
          scrollOffsetUnit: "%",
          delay: 200,
          direction: "LEFT",
          effectIn: true,
        },
        createdOn: 1693373536663,
      },
      "e-278": {
        id: "e-278",
        name: "",
        animationType: "preset",
        eventTypeId: "SCROLL_INTO_VIEW",
        action: {
          id: "",
          actionTypeId: "SLIDE_EFFECT",
          instant: false,
          config: { actionListId: "slideInLeft", autoStopEventId: "e-279" },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "64d30dd914d7241a1fdcb70a|398e1d4a-7b93-6920-2a82-40316bffce17",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "64d30dd914d7241a1fdcb70a|398e1d4a-7b93-6920-2a82-40316bffce17",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: 20,
          scrollOffsetUnit: "%",
          delay: 200,
          direction: "LEFT",
          effectIn: true,
        },
        createdOn: 1693373564582,
      },
      "e-280": {
        id: "e-280",
        name: "",
        animationType: "preset",
        eventTypeId: "SCROLL_INTO_VIEW",
        action: {
          id: "",
          actionTypeId: "SLIDE_EFFECT",
          instant: false,
          config: { actionListId: "slideInLeft", autoStopEventId: "e-281" },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "64d30dd914d7241a1fdcb70a|d7d6d11f-51b0-5521-dbd3-6a38cce123af",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "64d30dd914d7241a1fdcb70a|d7d6d11f-51b0-5521-dbd3-6a38cce123af",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: 20,
          scrollOffsetUnit: "%",
          delay: 300,
          direction: "LEFT",
          effectIn: true,
        },
        createdOn: 1693384138006,
      },
      "e-282": {
        id: "e-282",
        name: "",
        animationType: "preset",
        eventTypeId: "SCROLL_INTO_VIEW",
        action: {
          id: "",
          actionTypeId: "SLIDE_EFFECT",
          instant: false,
          config: { actionListId: "slideInRight", autoStopEventId: "e-283" },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "64d30dd914d7241a1fdcb70a|c0d0d1ca-eb3a-e57c-b125-5efd32a952c3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "64d30dd914d7241a1fdcb70a|c0d0d1ca-eb3a-e57c-b125-5efd32a952c3",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: 20,
          scrollOffsetUnit: "%",
          delay: 300,
          direction: "RIGHT",
          effectIn: true,
        },
        createdOn: 1693384151682,
      },
      "e-284": {
        id: "e-284",
        name: "",
        animationType: "preset",
        eventTypeId: "SCROLL_INTO_VIEW",
        action: {
          id: "",
          actionTypeId: "SLIDE_EFFECT",
          instant: false,
          config: { actionListId: "slideInLeft", autoStopEventId: "e-285" },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "64d30dd914d7241a1fdcb70a|52d0b049-33fd-e6d6-8c93-3a3cacebe990",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "64d30dd914d7241a1fdcb70a|52d0b049-33fd-e6d6-8c93-3a3cacebe990",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: 20,
          scrollOffsetUnit: "%",
          delay: 300,
          direction: "LEFT",
          effectIn: true,
        },
        createdOn: 1693384180475,
      },
      "e-286": {
        id: "e-286",
        name: "",
        animationType: "preset",
        eventTypeId: "SCROLL_INTO_VIEW",
        action: {
          id: "",
          actionTypeId: "SLIDE_EFFECT",
          instant: false,
          config: { actionListId: "slideInRight", autoStopEventId: "e-287" },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "64d30dd914d7241a1fdcb70a|52d0b049-33fd-e6d6-8c93-3a3cacebe993",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "64d30dd914d7241a1fdcb70a|52d0b049-33fd-e6d6-8c93-3a3cacebe993",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: 20,
          scrollOffsetUnit: "%",
          delay: 300,
          direction: "RIGHT",
          effectIn: true,
        },
        createdOn: 1693384192761,
      },
      "e-288": {
        id: "e-288",
        name: "",
        animationType: "preset",
        eventTypeId: "SCROLL_INTO_VIEW",
        action: {
          id: "",
          actionTypeId: "SLIDE_EFFECT",
          instant: false,
          config: { actionListId: "slideInBottom", autoStopEventId: "e-289" },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          selector: ".project_title",
          originalId:
            "64d30dd914d7241a1fdcb70a|d68054f3-8b7b-dfe9-fe84-65942ebf6096",
          appliesTo: "CLASS",
        },
        targets: [
          {
            selector: ".project_title",
            originalId:
              "64d30dd914d7241a1fdcb70a|d68054f3-8b7b-dfe9-fe84-65942ebf6096",
            appliesTo: "CLASS",
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: 20,
          scrollOffsetUnit: "%",
          delay: 300,
          direction: "BOTTOM",
          effectIn: true,
        },
        createdOn: 1693384202500,
      },
      "e-290": {
        id: "e-290",
        name: "",
        animationType: "preset",
        eventTypeId: "SCROLL_INTO_VIEW",
        action: {
          id: "",
          actionTypeId: "GROW_EFFECT",
          instant: false,
          config: { actionListId: "growIn", autoStopEventId: "e-291" },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          selector: ".project_image._01",
          originalId:
            "64d30dd914d7241a1fdcb70a|8a55ec92-c6a8-93cd-8059-ccb21995dc46",
          appliesTo: "CLASS",
        },
        targets: [
          {
            selector: ".project_image._01",
            originalId:
              "64d30dd914d7241a1fdcb70a|8a55ec92-c6a8-93cd-8059-ccb21995dc46",
            appliesTo: "CLASS",
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: 20,
          scrollOffsetUnit: "%",
          delay: 200,
          direction: null,
          effectIn: true,
        },
        createdOn: 1693384216159,
      },
      "e-292": {
        id: "e-292",
        name: "",
        animationType: "preset",
        eventTypeId: "SCROLL_INTO_VIEW",
        action: {
          id: "",
          actionTypeId: "SLIDE_EFFECT",
          instant: false,
          config: { actionListId: "slideInBottom", autoStopEventId: "e-293" },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "64d30dd914d7241a1fdcb70a|63029712-c074-827b-3153-53382e89ced1",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "64d30dd914d7241a1fdcb70a|63029712-c074-827b-3153-53382e89ced1",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: 20,
          scrollOffsetUnit: "%",
          delay: 200,
          direction: "BOTTOM",
          effectIn: true,
        },
        createdOn: 1693384244597,
      },
      "e-294": {
        id: "e-294",
        name: "",
        animationType: "preset",
        eventTypeId: "SCROLL_INTO_VIEW",
        action: {
          id: "",
          actionTypeId: "SLIDE_EFFECT",
          instant: false,
          config: { actionListId: "slideInBottom", autoStopEventId: "e-295" },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "64d30dd914d7241a1fdcb70a|3fa196fe-2105-cf04-5e42-7a6768b85238",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "64d30dd914d7241a1fdcb70a|3fa196fe-2105-cf04-5e42-7a6768b85238",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: 20,
          scrollOffsetUnit: "%",
          delay: 200,
          direction: "BOTTOM",
          effectIn: true,
        },
        createdOn: 1693384258347,
      },
      "e-296": {
        id: "e-296",
        name: "",
        animationType: "preset",
        eventTypeId: "SCROLL_INTO_VIEW",
        action: {
          id: "",
          actionTypeId: "SLIDE_EFFECT",
          instant: false,
          config: { actionListId: "slideInBottom", autoStopEventId: "e-297" },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "64d30dd914d7241a1fdcb70a|3bddebbc-9b3f-f616-bc5e-9fa225282528",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "64d30dd914d7241a1fdcb70a|3bddebbc-9b3f-f616-bc5e-9fa225282528",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: 20,
          scrollOffsetUnit: "%",
          delay: 200,
          direction: "BOTTOM",
          effectIn: true,
        },
        createdOn: 1693384272000,
      },
      "e-298": {
        id: "e-298",
        name: "",
        animationType: "preset",
        eventTypeId: "SCROLL_INTO_VIEW",
        action: {
          id: "",
          actionTypeId: "SLIDE_EFFECT",
          instant: false,
          config: { actionListId: "slideInBottom", autoStopEventId: "e-299" },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          selector: ".paragraph_title",
          originalId:
            "64d30dd914d7241a1fdcb70a|56050a1c-5566-c05b-f87b-0760c09b4f60",
          appliesTo: "CLASS",
        },
        targets: [
          {
            selector: ".paragraph_title",
            originalId:
              "64d30dd914d7241a1fdcb70a|56050a1c-5566-c05b-f87b-0760c09b4f60",
            appliesTo: "CLASS",
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: 20,
          scrollOffsetUnit: "%",
          delay: 200,
          direction: "BOTTOM",
          effectIn: true,
        },
        createdOn: 1693384280581,
      },
      "e-300": {
        id: "e-300",
        name: "",
        animationType: "preset",
        eventTypeId: "SCROLL_INTO_VIEW",
        action: {
          id: "",
          actionTypeId: "SLIDE_EFFECT",
          instant: false,
          config: { actionListId: "slideInBottom", autoStopEventId: "e-301" },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          selector: ".our-leaders_title",
          originalId:
            "64d30dd914d7241a1fdcb70a|9cc98ec9-e0ce-6adb-e678-9597a84a9835",
          appliesTo: "CLASS",
        },
        targets: [
          {
            selector: ".our-leaders_title",
            originalId:
              "64d30dd914d7241a1fdcb70a|9cc98ec9-e0ce-6adb-e678-9597a84a9835",
            appliesTo: "CLASS",
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: 20,
          scrollOffsetUnit: "%",
          delay: 200,
          direction: "BOTTOM",
          effectIn: true,
        },
        createdOn: 1693384346304,
      },
      "e-302": {
        id: "e-302",
        name: "",
        animationType: "preset",
        eventTypeId: "SCROLL_INTO_VIEW",
        action: {
          id: "",
          actionTypeId: "SLIDE_EFFECT",
          instant: false,
          config: { actionListId: "slideInBottom", autoStopEventId: "e-303" },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "64d30dd914d7241a1fdcb70a|816f2d11-a7ad-b26a-3e7f-3cd6d53ab06b",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "64d30dd914d7241a1fdcb70a|816f2d11-a7ad-b26a-3e7f-3cd6d53ab06b",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: 20,
          scrollOffsetUnit: "%",
          delay: 200,
          direction: "BOTTOM",
          effectIn: true,
        },
        createdOn: 1693384357389,
      },
      "e-304": {
        id: "e-304",
        name: "",
        animationType: "preset",
        eventTypeId: "SCROLL_INTO_VIEW",
        action: {
          id: "",
          actionTypeId: "SLIDE_EFFECT",
          instant: false,
          config: { actionListId: "slideInBottom", autoStopEventId: "e-305" },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "64d30dd914d7241a1fdcb70a|363a93c4-df72-da71-2f84-006d6c0e2fd6",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "64d30dd914d7241a1fdcb70a|363a93c4-df72-da71-2f84-006d6c0e2fd6",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: 20,
          scrollOffsetUnit: "%",
          delay: 200,
          direction: "BOTTOM",
          effectIn: true,
        },
        createdOn: 1693384366654,
      },
      "e-306": {
        id: "e-306",
        name: "",
        animationType: "preset",
        eventTypeId: "SCROLL_INTO_VIEW",
        action: {
          id: "",
          actionTypeId: "SLIDE_EFFECT",
          instant: false,
          config: { actionListId: "slideInBottom", autoStopEventId: "e-307" },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "64d30dd914d7241a1fdcb70a|c740d3fd-59bd-d3ec-f6f5-f164d3f47c12",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "64d30dd914d7241a1fdcb70a|c740d3fd-59bd-d3ec-f6f5-f164d3f47c12",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: 20,
          scrollOffsetUnit: "%",
          delay: 200,
          direction: "BOTTOM",
          effectIn: true,
        },
        createdOn: 1693384381903,
      },
      "e-308": {
        id: "e-308",
        name: "",
        animationType: "preset",
        eventTypeId: "SCROLL_INTO_VIEW",
        action: {
          id: "",
          actionTypeId: "SLIDE_EFFECT",
          instant: false,
          config: { actionListId: "slideInBottom", autoStopEventId: "e-309" },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "64d30dd914d7241a1fdcb70a|ab898282-2a29-7b18-8f4d-4d344345daca",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "64d30dd914d7241a1fdcb70a|ab898282-2a29-7b18-8f4d-4d344345daca",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: 20,
          scrollOffsetUnit: "%",
          delay: 200,
          direction: "BOTTOM",
          effectIn: true,
        },
        createdOn: 1693384408864,
      },
      "e-310": {
        id: "e-310",
        name: "",
        animationType: "preset",
        eventTypeId: "SCROLL_INTO_VIEW",
        action: {
          id: "",
          actionTypeId: "SLIDE_EFFECT",
          instant: false,
          config: { actionListId: "slideInLeft", autoStopEventId: "e-311" },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "64d30dd914d7241a1fdcb70a|f3780ce0-7ea2-0983-c6d5-61a57ec4bdcf",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "64d30dd914d7241a1fdcb70a|f3780ce0-7ea2-0983-c6d5-61a57ec4bdcf",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: 20,
          scrollOffsetUnit: "%",
          delay: 200,
          direction: "LEFT",
          effectIn: true,
        },
        createdOn: 1693384417319,
      },
      "e-312": {
        id: "e-312",
        name: "",
        animationType: "preset",
        eventTypeId: "SCROLL_INTO_VIEW",
        action: {
          id: "",
          actionTypeId: "SLIDE_EFFECT",
          instant: false,
          config: { actionListId: "slideInBottom", autoStopEventId: "e-313" },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          selector: "._4s_title",
          originalId:
            "64d33c8086efff4efa9e9da6|7f467289-73ce-c56b-3601-61c7aa249072",
          appliesTo: "CLASS",
        },
        targets: [
          {
            selector: "._4s_title",
            originalId:
              "64d33c8086efff4efa9e9da6|7f467289-73ce-c56b-3601-61c7aa249072",
            appliesTo: "CLASS",
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: 20,
          scrollOffsetUnit: "%",
          delay: 200,
          direction: "BOTTOM",
          effectIn: true,
        },
        createdOn: 1693384431885,
      },
      "e-314": {
        id: "e-314",
        name: "",
        animationType: "preset",
        eventTypeId: "SCROLL_INTO_VIEW",
        action: {
          id: "",
          actionTypeId: "SLIDE_EFFECT",
          instant: false,
          config: { actionListId: "slideInBottom", autoStopEventId: "e-315" },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          selector: ".heading-5",
          originalId:
            "64d33c8086efff4efa9e9da6|d6c5b993-7a48-2190-f500-9c929dd5eb52",
          appliesTo: "CLASS",
        },
        targets: [
          {
            selector: ".heading-5",
            originalId:
              "64d33c8086efff4efa9e9da6|d6c5b993-7a48-2190-f500-9c929dd5eb52",
            appliesTo: "CLASS",
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: 20,
          scrollOffsetUnit: "%",
          delay: 200,
          direction: "BOTTOM",
          effectIn: true,
        },
        createdOn: 1693384443107,
      },
      "e-316": {
        id: "e-316",
        name: "",
        animationType: "preset",
        eventTypeId: "SCROLL_INTO_VIEW",
        action: {
          id: "",
          actionTypeId: "SLIDE_EFFECT",
          instant: false,
          config: { actionListId: "slideInBottom", autoStopEventId: "e-317" },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "64d33c8086efff4efa9e9da6|428d6575-a58b-58cb-c153-db02a0218e02",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "64d33c8086efff4efa9e9da6|428d6575-a58b-58cb-c153-db02a0218e02",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: 20,
          scrollOffsetUnit: "%",
          delay: 200,
          direction: "BOTTOM",
          effectIn: true,
        },
        createdOn: 1693384458313,
      },
      "e-318": {
        id: "e-318",
        name: "",
        animationType: "preset",
        eventTypeId: "SCROLL_INTO_VIEW",
        action: {
          id: "",
          actionTypeId: "FLIP_EFFECT",
          instant: false,
          config: { actionListId: "flipInLeft", autoStopEventId: "e-319" },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "64d33c8086efff4efa9e9da6|a365c338-1dad-cb05-6cdf-ea7ea30e6dd4",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "64d33c8086efff4efa9e9da6|a365c338-1dad-cb05-6cdf-ea7ea30e6dd4",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: 20,
          scrollOffsetUnit: "%",
          delay: 200,
          direction: "LEFT",
          effectIn: true,
        },
        createdOn: 1693384473106,
      },
      "e-320": {
        id: "e-320",
        name: "",
        animationType: "preset",
        eventTypeId: "SCROLL_INTO_VIEW",
        action: {
          id: "",
          actionTypeId: "SLIDE_EFFECT",
          instant: false,
          config: { actionListId: "slideInLeft", autoStopEventId: "e-321" },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "64d33c8086efff4efa9e9da6|adeda897-f619-7738-7ce1-768f56e18aee",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "64d33c8086efff4efa9e9da6|adeda897-f619-7738-7ce1-768f56e18aee",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: 20,
          scrollOffsetUnit: "%",
          delay: 200,
          direction: "LEFT",
          effectIn: true,
        },
        createdOn: 1693384486671,
      },
      "e-322": {
        id: "e-322",
        name: "",
        animationType: "preset",
        eventTypeId: "SCROLL_INTO_VIEW",
        action: {
          id: "",
          actionTypeId: "SLIDE_EFFECT",
          instant: false,
          config: { actionListId: "slideInLeft", autoStopEventId: "e-323" },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "64d33c8086efff4efa9e9da6|5c1a444d-786a-bf52-8c2c-e1ecf40af177",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "64d33c8086efff4efa9e9da6|5c1a444d-786a-bf52-8c2c-e1ecf40af177",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: 20,
          scrollOffsetUnit: "%",
          delay: 200,
          direction: "LEFT",
          effectIn: true,
        },
        createdOn: 1693384495763,
      },
      "e-324": {
        id: "e-324",
        name: "",
        animationType: "preset",
        eventTypeId: "SCROLL_INTO_VIEW",
        action: {
          id: "",
          actionTypeId: "SLIDE_EFFECT",
          instant: false,
          config: { actionListId: "slideInLeft", autoStopEventId: "e-325" },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "64d33c8086efff4efa9e9da6|a3a4a917-059d-7fdb-d7b1-254011e899e0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "64d33c8086efff4efa9e9da6|a3a4a917-059d-7fdb-d7b1-254011e899e0",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: 20,
          scrollOffsetUnit: "%",
          delay: 200,
          direction: "LEFT",
          effectIn: true,
        },
        createdOn: 1693391256805,
      },
      "e-326": {
        id: "e-326",
        name: "",
        animationType: "preset",
        eventTypeId: "SCROLL_INTO_VIEW",
        action: {
          id: "",
          actionTypeId: "SLIDE_EFFECT",
          instant: false,
          config: { actionListId: "slideInRight", autoStopEventId: "e-327" },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "64d33c8086efff4efa9e9da6|114a54c1-0df1-4548-6e2b-6f816b3ccfc9",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "64d33c8086efff4efa9e9da6|114a54c1-0df1-4548-6e2b-6f816b3ccfc9",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: 20,
          scrollOffsetUnit: "%",
          delay: 200,
          direction: "RIGHT",
          effectIn: true,
        },
        createdOn: 1693391266020,
      },
      "e-328": {
        id: "e-328",
        name: "",
        animationType: "preset",
        eventTypeId: "SCROLL_INTO_VIEW",
        action: {
          id: "",
          actionTypeId: "SLIDE_EFFECT",
          instant: false,
          config: { actionListId: "slideInRight", autoStopEventId: "e-329" },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "64d33c8086efff4efa9e9da6|11f90406-3769-5e5b-e8ac-b50400c85f82",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "64d33c8086efff4efa9e9da6|11f90406-3769-5e5b-e8ac-b50400c85f82",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: 20,
          scrollOffsetUnit: "%",
          delay: 200,
          direction: "RIGHT",
          effectIn: true,
        },
        createdOn: 1693391278687,
      },
      "e-330": {
        id: "e-330",
        name: "",
        animationType: "preset",
        eventTypeId: "SCROLL_INTO_VIEW",
        action: {
          id: "",
          actionTypeId: "SLIDE_EFFECT",
          instant: false,
          config: { actionListId: "slideInLeft", autoStopEventId: "e-331" },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "64d33c8086efff4efa9e9da6|a120ada8-8181-e9e9-1502-5b4dfc565763",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "64d33c8086efff4efa9e9da6|a120ada8-8181-e9e9-1502-5b4dfc565763",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: 20,
          scrollOffsetUnit: "%",
          delay: 200,
          direction: "LEFT",
          effectIn: true,
        },
        createdOn: 1693391287081,
      },
      "e-332": {
        id: "e-332",
        name: "",
        animationType: "preset",
        eventTypeId: "SCROLL_INTO_VIEW",
        action: {
          id: "",
          actionTypeId: "SLIDE_EFFECT",
          instant: false,
          config: { actionListId: "slideInLeft", autoStopEventId: "e-333" },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "64d33c8086efff4efa9e9da6|cba6d869-e673-c8ca-36bd-9869c841763a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "64d33c8086efff4efa9e9da6|cba6d869-e673-c8ca-36bd-9869c841763a",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: 20,
          scrollOffsetUnit: "%",
          delay: 200,
          direction: "LEFT",
          effectIn: true,
        },
        createdOn: 1693391295002,
      },
      "e-334": {
        id: "e-334",
        name: "",
        animationType: "preset",
        eventTypeId: "SCROLL_INTO_VIEW",
        action: {
          id: "",
          actionTypeId: "SLIDE_EFFECT",
          instant: false,
          config: { actionListId: "slideInRight", autoStopEventId: "e-335" },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "64d33c8086efff4efa9e9da6|c3f07408-ff27-2db1-3f57-027dbba8c065",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "64d33c8086efff4efa9e9da6|c3f07408-ff27-2db1-3f57-027dbba8c065",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: 20,
          scrollOffsetUnit: "%",
          delay: 200,
          direction: "RIGHT",
          effectIn: true,
        },
        createdOn: 1693391301604,
      },
      "e-336": {
        id: "e-336",
        name: "",
        animationType: "custom",
        eventTypeId: "PAGE_START",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-102",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-337",
          },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "64d30dd914d7241a1fdcb70a",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "64d30dd914d7241a1fdcb70a",
            appliesTo: "PAGE",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: true,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1693560473206,
      },
      "e-338": {
        id: "e-338",
        name: "",
        animationType: "custom",
        eventTypeId: "PAGE_START",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-103",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-339",
          },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "64d30dd914d7241a1fdcb70a",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "64d30dd914d7241a1fdcb70a",
            appliesTo: "PAGE",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: true,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1693560574210,
      },
      "e-340": {
        id: "e-340",
        name: "",
        animationType: "custom",
        eventTypeId: "PAGE_START",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-104",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-341",
          },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "64d30dd914d7241a1fdcb70a",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "64d30dd914d7241a1fdcb70a",
            appliesTo: "PAGE",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: true,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1693560620417,
      },
      "e-342": {
        id: "e-342",
        name: "",
        animationType: "custom",
        eventTypeId: "PAGE_START",
        action: {
          id: "",
          actionTypeId: "GENERAL_START_ACTION",
          config: {
            delay: 0,
            easing: "",
            duration: 0,
            actionListId: "a-105",
            affectedElements: {},
            playInReverse: false,
            autoStopEventId: "e-343",
          },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "64d30dd914d7241a1fdcb70a",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "64d30dd914d7241a1fdcb70a",
            appliesTo: "PAGE",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: true,
          playInReverse: false,
          scrollOffsetValue: null,
          scrollOffsetUnit: null,
          delay: null,
          direction: null,
          effectIn: null,
        },
        createdOn: 1693560690046,
      },
      "e-344": {
        id: "e-344",
        name: "",
        animationType: "preset",
        eventTypeId: "SCROLL_INTO_VIEW",
        action: {
          id: "",
          actionTypeId: "SLIDE_EFFECT",
          instant: false,
          config: { actionListId: "slideInLeft", autoStopEventId: "e-345" },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "64d30dd914d7241a1fdcb70a|b16bb02d-4de6-2747-089c-c8517016901a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "64d30dd914d7241a1fdcb70a|b16bb02d-4de6-2747-089c-c8517016901a",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: 20,
          scrollOffsetUnit: "%",
          delay: 200,
          direction: "LEFT",
          effectIn: true,
        },
        createdOn: 1694069281180,
      },
      "e-346": {
        id: "e-346",
        name: "",
        animationType: "preset",
        eventTypeId: "SCROLL_INTO_VIEW",
        action: {
          id: "",
          actionTypeId: "SLIDE_EFFECT",
          instant: false,
          config: { actionListId: "slideInRight", autoStopEventId: "e-347" },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "64d30dd914d7241a1fdcb70a|b16bb02d-4de6-2747-089c-c8517016901e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "64d30dd914d7241a1fdcb70a|b16bb02d-4de6-2747-089c-c8517016901e",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: 20,
          scrollOffsetUnit: "%",
          delay: 200,
          direction: "RIGHT",
          effectIn: true,
        },
        createdOn: 1694069281180,
      },
      "e-350": {
        id: "e-350",
        name: "",
        animationType: "preset",
        eventTypeId: "SCROLL_INTO_VIEW",
        action: {
          id: "",
          actionTypeId: "SLIDE_EFFECT",
          instant: false,
          config: { actionListId: "slideInRight", autoStopEventId: "e-351" },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "64d30dd914d7241a1fdcb70a|37ac41f5-f73e-b9f6-f9cc-9f0772948419",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "64d30dd914d7241a1fdcb70a|37ac41f5-f73e-b9f6-f9cc-9f0772948419",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: 20,
          scrollOffsetUnit: "%",
          delay: 200,
          direction: "RIGHT",
          effectIn: true,
        },
        createdOn: 1694070235129,
      },
      "e-352": {
        id: "e-352",
        name: "",
        animationType: "preset",
        eventTypeId: "SCROLL_INTO_VIEW",
        action: {
          id: "",
          actionTypeId: "SLIDE_EFFECT",
          instant: false,
          config: { actionListId: "slideInBottom", autoStopEventId: "e-353" },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "64d30dd914d7241a1fdcb70a|7ce23612-706f-0023-628a-bfe36de2a0ba",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "64d30dd914d7241a1fdcb70a|7ce23612-706f-0023-628a-bfe36de2a0ba",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: 20,
          scrollOffsetUnit: "%",
          delay: 200,
          direction: "BOTTOM",
          effectIn: true,
        },
        createdOn: 1694070608259,
      },
      "e-354": {
        id: "e-354",
        name: "",
        animationType: "preset",
        eventTypeId: "SCROLL_INTO_VIEW",
        action: {
          id: "",
          actionTypeId: "SLIDE_EFFECT",
          instant: false,
          config: { actionListId: "slideInBottom", autoStopEventId: "e-355" },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "64d30dd914d7241a1fdcb70a|7ce23612-706f-0023-628a-bfe36de2a0bf",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "64d30dd914d7241a1fdcb70a|7ce23612-706f-0023-628a-bfe36de2a0bf",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: 20,
          scrollOffsetUnit: "%",
          delay: 200,
          direction: "BOTTOM",
          effectIn: true,
        },
        createdOn: 1694070621108,
      },
      "e-356": {
        id: "e-356",
        name: "",
        animationType: "preset",
        eventTypeId: "SCROLL_INTO_VIEW",
        action: {
          id: "",
          actionTypeId: "SLIDE_EFFECT",
          instant: false,
          config: { actionListId: "slideInBottom", autoStopEventId: "e-357" },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "64d30dd914d7241a1fdcb70a|7ce23612-706f-0023-628a-bfe36de2a0c6",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "64d30dd914d7241a1fdcb70a|7ce23612-706f-0023-628a-bfe36de2a0c6",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: 20,
          scrollOffsetUnit: "%",
          delay: 200,
          direction: "BOTTOM",
          effectIn: true,
        },
        createdOn: 1694070629860,
      },
      "e-358": {
        id: "e-358",
        name: "",
        animationType: "preset",
        eventTypeId: "SCROLL_INTO_VIEW",
        action: {
          id: "",
          actionTypeId: "GROW_EFFECT",
          instant: false,
          config: { actionListId: "growIn", autoStopEventId: "e-359" },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "64d30dd914d7241a1fdcb70a|7ce23612-706f-0023-628a-bfe36de2a0b9",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "64d30dd914d7241a1fdcb70a|7ce23612-706f-0023-628a-bfe36de2a0b9",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: 20,
          scrollOffsetUnit: "%",
          delay: 200,
          direction: null,
          effectIn: true,
        },
        createdOn: 1694070667112,
      },
      "e-360": {
        id: "e-360",
        name: "",
        animationType: "preset",
        eventTypeId: "SCROLL_INTO_VIEW",
        action: {
          id: "",
          actionTypeId: "FADE_EFFECT",
          instant: false,
          config: { actionListId: "fadeIn", autoStopEventId: "e-361" },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "64d30dd914d7241a1fdcb70a|816f2d11-a7ad-b26a-3e7f-3cd6d53ab067",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "64d30dd914d7241a1fdcb70a|816f2d11-a7ad-b26a-3e7f-3cd6d53ab067",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: 20,
          scrollOffsetUnit: "%",
          delay: 200,
          direction: null,
          effectIn: true,
        },
        createdOn: 1694070713168,
      },
      "e-362": {
        id: "e-362",
        name: "",
        animationType: "preset",
        eventTypeId: "SCROLL_INTO_VIEW",
        action: {
          id: "",
          actionTypeId: "FADE_EFFECT",
          instant: false,
          config: { actionListId: "fadeIn", autoStopEventId: "e-363" },
        },
        mediaQueries: ["main", "medium", "small", "tiny"],
        target: {
          id: "64d30dd914d7241a1fdcb70a|363a93c4-df72-da71-2f84-006d6c0e2fcf",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
        targets: [
          {
            id: "64d30dd914d7241a1fdcb70a|363a93c4-df72-da71-2f84-006d6c0e2fcf",
            appliesTo: "ELEMENT",
            styleBlockIds: [],
          },
        ],
        config: {
          loop: false,
          playInReverse: false,
          scrollOffsetValue: 20,
          scrollOffsetUnit: "%",
          delay: 200,
          direction: null,
          effectIn: true,
        },
        createdOn: 1694070723457,
      },
    },
    actionLists: {
      a: {
        id: "a",
        title: "Slide IN",
        actionItemGroups: [
          {
            actionItems: [
              {
                id: "a-n",
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 0,
                  easing: "ease",
                  duration: 500,
                  target: {},
                  xValue: 0,
                  xUnit: "%",
                  yUnit: "PX",
                  zUnit: "PX",
                },
              },
              {
                id: "a-n-2",
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 0,
                  easing: "ease",
                  duration: 500,
                  target: {},
                  yValue: 0,
                  xUnit: "PX",
                  yUnit: "%",
                  zUnit: "PX",
                },
              },
              {
                id: "a-n-3",
                actionTypeId: "STYLE_OPACITY",
                config: {
                  delay: 0,
                  easing: "ease",
                  duration: 500,
                  target: {},
                  value: 1,
                  unit: "",
                },
              },
              {
                id: "a-n-4",
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 0,
                  easing: "ease",
                  duration: 500,
                  target: {},
                  xValue: 0,
                  xUnit: "%",
                  yUnit: "PX",
                  zUnit: "PX",
                },
              },
              {
                id: "a-n-5",
                actionTypeId: "STYLE_OPACITY",
                config: {
                  delay: 0,
                  easing: "ease",
                  duration: 500,
                  target: {},
                  value: 1,
                  unit: "",
                },
              },
            ],
          },
        ],
        useFirstGroupAsInitialState: false,
        createdOn: 1616675667325,
      },
      "a-2": {
        id: "a-2",
        title: "Slide OUT",
        actionItemGroups: [
          {
            actionItems: [
              {
                id: "a-2-n",
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 0,
                  easing: "ease",
                  duration: 500,
                  target: {},
                  xValue: -101,
                  xUnit: "%",
                  yUnit: "PX",
                  zUnit: "PX",
                },
              },
              {
                id: "a-2-n-2",
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 0,
                  easing: "ease",
                  duration: 500,
                  target: {},
                  yValue: 50,
                  xUnit: "PX",
                  yUnit: "%",
                  zUnit: "PX",
                },
              },
              {
                id: "a-2-n-3",
                actionTypeId: "STYLE_OPACITY",
                config: {
                  delay: 0,
                  easing: "ease",
                  duration: 500,
                  target: {},
                  value: 0,
                  unit: "",
                },
              },
              {
                id: "a-2-n-4",
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 0,
                  easing: "ease",
                  duration: 500,
                  target: {},
                  xValue: 25,
                  xUnit: "%",
                  yUnit: "PX",
                  zUnit: "PX",
                },
              },
              {
                id: "a-2-n-5",
                actionTypeId: "STYLE_OPACITY",
                config: {
                  delay: 0,
                  easing: "ease",
                  duration: 500,
                  target: {},
                  value: 0,
                  unit: "",
                },
              },
            ],
          },
        ],
        useFirstGroupAsInitialState: false,
        createdOn: 1616675667325,
      },
      "a-3": {
        id: "a-3",
        title: "CTA Curtain IN",
        actionItemGroups: [
          {
            actionItems: [
              {
                id: "a-3-n",
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 0,
                  easing: "ease",
                  duration: 350,
                  target: {},
                  yValue: 101,
                  xUnit: "PX",
                  yUnit: "%",
                  zUnit: "PX",
                },
              },
            ],
          },
          {
            actionItems: [
              {
                id: "a-3-n-2",
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 0,
                  easing: "ease",
                  duration: 250,
                  target: {},
                  yValue: 0,
                  xUnit: "PX",
                  yUnit: "%",
                  zUnit: "PX",
                },
              },
            ],
          },
        ],
        useFirstGroupAsInitialState: true,
        createdOn: 1616681009460,
      },
      "a-4": {
        id: "a-4",
        title: "CTA Curtain OUT",
        actionItemGroups: [
          {
            actionItems: [
              {
                id: "a-4-n",
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 0,
                  easing: "ease",
                  duration: 250,
                  target: {},
                  yValue: 101,
                  xUnit: "PX",
                  yUnit: "%",
                  zUnit: "PX",
                },
              },
            ],
          },
        ],
        useFirstGroupAsInitialState: false,
        createdOn: 1616681009460,
      },
      "a-5": {
        id: "a-5",
        title: "Slider Nav IN",
        actionItemGroups: [
          {
            actionItems: [
              {
                id: "a-5-n",
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 0,
                  easing: "ease",
                  duration: 500,
                  target: {},
                  yValue: 101,
                  xUnit: "PX",
                  yUnit: "%",
                  zUnit: "PX",
                },
              },
            ],
          },
          {
            actionItems: [
              {
                id: "a-5-n-2",
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 0,
                  easing: "ease",
                  duration: 250,
                  target: {},
                  yValue: 0,
                  xUnit: "PX",
                  yUnit: "%",
                  zUnit: "PX",
                },
              },
            ],
          },
        ],
        useFirstGroupAsInitialState: true,
        createdOn: 1616675124507,
      },
      "a-6": {
        id: "a-6",
        title: "Slider Nav OUT",
        actionItemGroups: [
          {
            actionItems: [
              {
                id: "a-6-n",
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 0,
                  easing: "ease",
                  duration: 250,
                  target: {},
                  yValue: 101,
                  xUnit: "PX",
                  yUnit: "%",
                  zUnit: "PX",
                },
              },
            ],
          },
        ],
        useFirstGroupAsInitialState: false,
        createdOn: 1616675124507,
      },
      "a-17": {
        id: "a-17",
        title: "Play Button",
        continuousParameterGroups: [
          {
            id: "a-17-p",
            type: "MOUSE_X",
            parameterLabel: "Mouse X",
            continuousActionGroups: [
              {
                keyframe: 0,
                actionItems: [
                  {
                    id: "a-17-n",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: true,
                        id: "7b8c8c1c-9b5d-b039-aca2-819631562b8c",
                      },
                      xValue: -25,
                      xUnit: "%",
                      yUnit: "PX",
                      zUnit: "PX",
                    },
                  },
                ],
              },
              {
                keyframe: 100,
                actionItems: [
                  {
                    id: "a-17-n-2",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: true,
                        id: "7b8c8c1c-9b5d-b039-aca2-819631562b8c",
                      },
                      xValue: 25,
                      xUnit: "%",
                      yUnit: "PX",
                      zUnit: "PX",
                    },
                  },
                ],
              },
            ],
          },
          {
            id: "a-17-p-2",
            type: "MOUSE_Y",
            parameterLabel: "Mouse Y",
            continuousActionGroups: [
              {
                keyframe: 0,
                actionItems: [
                  {
                    id: "a-17-n-3",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: true,
                        id: "7b8c8c1c-9b5d-b039-aca2-819631562b8c",
                      },
                      yValue: -25,
                      xUnit: "%",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                ],
              },
              {
                keyframe: 100,
                actionItems: [
                  {
                    id: "a-17-n-4",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: true,
                        id: "7b8c8c1c-9b5d-b039-aca2-819631562b8c",
                      },
                      yValue: 25,
                      xUnit: "%",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                ],
              },
            ],
          },
        ],
        createdOn: 1598573375494,
      },
      "a-16": {
        id: "a-16",
        title: "Slider Btn Rotate IN",
        actionItemGroups: [
          {
            actionItems: [
              {
                id: "a-16-n",
                actionTypeId: "TRANSFORM_ROTATE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 10000,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".ci-slider-btn-loading",
                    selectorGuids: ["92a7d6a0-aa9c-e22a-d3e8-72dcb35e8e23"],
                  },
                  zValue: 0,
                  xUnit: "DEG",
                  yUnit: "DEG",
                  zUnit: "DEG",
                },
              },
            ],
          },
          {
            actionItems: [
              {
                id: "a-16-n-2",
                actionTypeId: "TRANSFORM_ROTATE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 10000,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".ci-slider-btn-loading",
                    selectorGuids: ["92a7d6a0-aa9c-e22a-d3e8-72dcb35e8e23"],
                  },
                  zValue: 360,
                  xUnit: "DEG",
                  yUnit: "DEG",
                  zUnit: "DEG",
                },
              },
            ],
          },
          {
            actionItems: [
              {
                id: "a-16-n-3",
                actionTypeId: "TRANSFORM_ROTATE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".ci-slider-btn-loading",
                    selectorGuids: ["92a7d6a0-aa9c-e22a-d3e8-72dcb35e8e23"],
                  },
                  zValue: 0,
                  xUnit: "DEG",
                  yUnit: "DEG",
                  zUnit: "DEG",
                },
              },
            ],
          },
        ],
        useFirstGroupAsInitialState: true,
        createdOn: 1598522687052,
      },
      "a-19": {
        id: "a-19",
        title: "Slider Btn IN",
        actionItemGroups: [
          {
            actionItems: [
              {
                id: "a-19-n",
                actionTypeId: "TRANSFORM_SCALE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".c-slider-btn-loading",
                    selectorGuids: ["92a7d6a0-aa9c-e22a-d3e8-72dcb35e8dfa"],
                  },
                  xValue: 0,
                  yValue: 0,
                  locked: true,
                },
              },
              {
                id: "a-19-n-2",
                actionTypeId: "STYLE_OPACITY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".c-slider-btn-loading",
                    selectorGuids: ["92a7d6a0-aa9c-e22a-d3e8-72dcb35e8dfa"],
                  },
                  value: 0,
                  unit: "",
                },
              },
              {
                id: "a-19-n-3",
                actionTypeId: "TRANSFORM_SCALE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".c-slider-btn-circle",
                    selectorGuids: ["92a7d6a0-aa9c-e22a-d3e8-72dcb35e8e14"],
                  },
                  xValue: 1,
                  yValue: 1,
                  locked: true,
                },
              },
              {
                id: "a-19-n-4",
                actionTypeId: "STYLE_OPACITY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".c-slider-btn-circle",
                    selectorGuids: ["92a7d6a0-aa9c-e22a-d3e8-72dcb35e8e14"],
                  },
                  value: 1,
                  unit: "",
                },
              },
            ],
          },
          {
            actionItems: [
              {
                id: "a-19-n-5",
                actionTypeId: "TRANSFORM_SCALE",
                config: {
                  delay: 0,
                  easing: "swingFromTo",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".c-slider-btn-loading",
                    selectorGuids: ["92a7d6a0-aa9c-e22a-d3e8-72dcb35e8dfa"],
                  },
                  xValue: 1,
                  yValue: 1,
                  locked: true,
                },
              },
              {
                id: "a-19-n-6",
                actionTypeId: "STYLE_OPACITY",
                config: {
                  delay: 0,
                  easing: "ease",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".c-slider-btn-loading",
                    selectorGuids: ["92a7d6a0-aa9c-e22a-d3e8-72dcb35e8dfa"],
                  },
                  value: 1,
                  unit: "",
                },
              },
              {
                id: "a-19-n-7",
                actionTypeId: "TRANSFORM_SCALE",
                config: {
                  delay: 0,
                  easing: "swingFromTo",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".c-slider-btn-circle",
                    selectorGuids: ["92a7d6a0-aa9c-e22a-d3e8-72dcb35e8e14"],
                  },
                  xValue: 0,
                  yValue: 0,
                  locked: true,
                },
              },
              {
                id: "a-19-n-8",
                actionTypeId: "STYLE_OPACITY",
                config: {
                  delay: 0,
                  easing: "ease",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".c-slider-btn-circle",
                    selectorGuids: ["92a7d6a0-aa9c-e22a-d3e8-72dcb35e8e14"],
                  },
                  value: 0,
                  unit: "",
                },
              },
            ],
          },
        ],
        useFirstGroupAsInitialState: true,
        createdOn: 1598522687052,
      },
      "a-14": {
        id: "a-14",
        title: "Slide IN 2",
        actionItemGroups: [
          {
            actionItems: [
              {
                id: "a-14-n",
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 0,
                  easing: "ease",
                  duration: 0,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".main-slide-wrapper",
                    selectorGuids: ["92a7d6a0-aa9c-e22a-d3e8-72dcb35e8dfe"],
                  },
                  yValue: 100,
                  xUnit: "PX",
                  yUnit: "%",
                  zUnit: "PX",
                },
              },
              {
                id: "a-14-n-2",
                actionTypeId: "STYLE_OPACITY",
                config: {
                  delay: 0,
                  easing: "ease",
                  duration: 0,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".main-slide-wrapper",
                    selectorGuids: ["92a7d6a0-aa9c-e22a-d3e8-72dcb35e8dfe"],
                  },
                  value: 0,
                  unit: "",
                },
              },
            ],
          },
          {
            actionItems: [
              {
                id: "a-14-n-3",
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 0,
                  easing: "ease",
                  duration: 0,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".main-slide-wrapper",
                    selectorGuids: ["92a7d6a0-aa9c-e22a-d3e8-72dcb35e8dfe"],
                  },
                  yValue: 100,
                  xUnit: "PX",
                  yUnit: "%",
                  zUnit: "PX",
                },
              },
              {
                id: "a-14-n-4",
                actionTypeId: "STYLE_OPACITY",
                config: {
                  delay: 0,
                  easing: "ease",
                  duration: 0,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".main-slide-wrapper",
                    selectorGuids: ["92a7d6a0-aa9c-e22a-d3e8-72dcb35e8dfe"],
                  },
                  value: 0,
                  unit: "",
                },
              },
            ],
          },
          {
            actionItems: [
              {
                id: "a-14-n-5",
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 0,
                  easing: "ease",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".main-slide-wrapper",
                    selectorGuids: ["92a7d6a0-aa9c-e22a-d3e8-72dcb35e8dfe"],
                  },
                  yValue: 0,
                  xUnit: "PX",
                  yUnit: "%",
                  zUnit: "PX",
                },
              },
              {
                id: "a-14-n-6",
                actionTypeId: "STYLE_OPACITY",
                config: {
                  delay: 0,
                  easing: "ease",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".main-slide-wrapper",
                    selectorGuids: ["92a7d6a0-aa9c-e22a-d3e8-72dcb35e8dfe"],
                  },
                  value: 1,
                  unit: "",
                },
              },
            ],
          },
        ],
        useFirstGroupAsInitialState: true,
        createdOn: 1598526479224,
      },
      "a-10": {
        id: "a-10",
        title: "Slider Btn Rotate OUT",
        actionItemGroups: [
          {
            actionItems: [
              {
                id: "a-10-n",
                actionTypeId: "TRANSFORM_ROTATE",
                config: {
                  delay: 0,
                  easing: "ease",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".ci-slider-btn-loading",
                    selectorGuids: ["92a7d6a0-aa9c-e22a-d3e8-72dcb35e8e23"],
                  },
                  zValue: 0,
                  xUnit: "DEG",
                  yUnit: "DEG",
                  zUnit: "DEG",
                },
              },
            ],
          },
        ],
        useFirstGroupAsInitialState: false,
        createdOn: 1598522687052,
      },
      "a-7": {
        id: "a-7",
        title: "Play Btn IN",
        actionItemGroups: [
          {
            actionItems: [
              {
                id: "a-7-n",
                actionTypeId: "TRANSFORM_SCALE",
                config: {
                  delay: 0,
                  easing: "swingFromTo",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".c-slide-btn-loading",
                    selectorGuids: ["92a7d6a0-aa9c-e22a-d3e8-72dcb35e8e19"],
                  },
                  xValue: 0,
                  yValue: 0,
                  locked: true,
                },
              },
              {
                id: "a-7-n-2",
                actionTypeId: "STYLE_OPACITY",
                config: {
                  delay: 0,
                  easing: "ease",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".c-slide-btn-loading",
                    selectorGuids: ["92a7d6a0-aa9c-e22a-d3e8-72dcb35e8e19"],
                  },
                  value: 0,
                  unit: "",
                },
              },
              {
                id: "a-7-n-3",
                actionTypeId: "TRANSFORM_SCALE",
                config: {
                  delay: 0,
                  easing: "swingFromTo",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".c-slide-btn-frame",
                    selectorGuids: ["92a7d6a0-aa9c-e22a-d3e8-72dcb35e8e1d"],
                  },
                  xValue: 1,
                  yValue: 1,
                  locked: true,
                },
              },
              {
                id: "a-7-n-4",
                actionTypeId: "STYLE_OPACITY",
                config: {
                  delay: 0,
                  easing: "ease",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".c-slide-btn-frame",
                    selectorGuids: ["92a7d6a0-aa9c-e22a-d3e8-72dcb35e8e1d"],
                  },
                  value: 1,
                  unit: "",
                },
              },
              {
                id: "a-7-n-5",
                actionTypeId: "STYLE_OPACITY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".c-play-btn",
                    selectorGuids: ["92a7d6a0-aa9c-e22a-d3e8-72dcb35e8e10"],
                  },
                  value: 0.75,
                  unit: "",
                },
              },
              {
                id: "a-7-n-6",
                actionTypeId: "TRANSFORM_SCALE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".c-play-btn",
                    selectorGuids: ["92a7d6a0-aa9c-e22a-d3e8-72dcb35e8e10"],
                  },
                  xValue: 0.8,
                  yValue: 0.8,
                  locked: true,
                },
              },
            ],
          },
          {
            actionItems: [
              {
                id: "a-7-n-7",
                actionTypeId: "TRANSFORM_SCALE",
                config: {
                  delay: 0,
                  easing: "swingFromTo",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".c-slide-btn-loading",
                    selectorGuids: ["92a7d6a0-aa9c-e22a-d3e8-72dcb35e8e19"],
                  },
                  xValue: 1,
                  yValue: 1,
                  locked: true,
                },
              },
              {
                id: "a-7-n-8",
                actionTypeId: "STYLE_OPACITY",
                config: {
                  delay: 0,
                  easing: "ease",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".c-slide-btn-loading",
                    selectorGuids: ["92a7d6a0-aa9c-e22a-d3e8-72dcb35e8e19"],
                  },
                  value: 1,
                  unit: "",
                },
              },
              {
                id: "a-7-n-9",
                actionTypeId: "TRANSFORM_SCALE",
                config: {
                  delay: 0,
                  easing: "swingFromTo",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".c-slide-btn-frame",
                    selectorGuids: ["92a7d6a0-aa9c-e22a-d3e8-72dcb35e8e1d"],
                  },
                  xValue: 0,
                  yValue: 0,
                  locked: true,
                },
              },
              {
                id: "a-7-n-10",
                actionTypeId: "STYLE_OPACITY",
                config: {
                  delay: 0,
                  easing: "ease",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".c-slide-btn-frame",
                    selectorGuids: ["92a7d6a0-aa9c-e22a-d3e8-72dcb35e8e1d"],
                  },
                  value: 0,
                  unit: "",
                },
              },
              {
                id: "a-7-n-11",
                actionTypeId: "STYLE_OPACITY",
                config: {
                  delay: 0,
                  easing: "ease",
                  duration: 350,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".c-play-btn",
                    selectorGuids: ["92a7d6a0-aa9c-e22a-d3e8-72dcb35e8e10"],
                  },
                  value: 1,
                  unit: "",
                },
              },
              {
                id: "a-7-n-12",
                actionTypeId: "TRANSFORM_SCALE",
                config: {
                  delay: 0,
                  easing: "swingFromTo",
                  duration: 350,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".c-play-btn",
                    selectorGuids: ["92a7d6a0-aa9c-e22a-d3e8-72dcb35e8e10"],
                  },
                  xValue: 1,
                  yValue: 1,
                  locked: true,
                },
              },
            ],
          },
        ],
        useFirstGroupAsInitialState: true,
        createdOn: 1598528424548,
      },
      "a-13": {
        id: "a-13",
        title: "Spin Play IN",
        actionItemGroups: [
          {
            actionItems: [
              {
                id: "a-13-n",
                actionTypeId: "TRANSFORM_ROTATE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 10000,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".c-slide-btn-loading",
                    selectorGuids: ["92a7d6a0-aa9c-e22a-d3e8-72dcb35e8e19"],
                  },
                  zValue: 0,
                  xUnit: "DEG",
                  yUnit: "DEG",
                  zUnit: "DEG",
                },
              },
            ],
          },
          {
            actionItems: [
              {
                id: "a-13-n-2",
                actionTypeId: "TRANSFORM_ROTATE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 10000,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".c-slide-btn-loading",
                    selectorGuids: ["92a7d6a0-aa9c-e22a-d3e8-72dcb35e8e19"],
                  },
                  zValue: 360,
                  xUnit: "DEG",
                  yUnit: "DEG",
                  zUnit: "DEG",
                },
              },
            ],
          },
          {
            actionItems: [
              {
                id: "a-13-n-3",
                actionTypeId: "TRANSFORM_ROTATE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".c-slide-btn-loading",
                    selectorGuids: ["92a7d6a0-aa9c-e22a-d3e8-72dcb35e8e19"],
                  },
                  zValue: 0,
                  xUnit: "DEG",
                  yUnit: "DEG",
                  zUnit: "DEG",
                },
              },
            ],
          },
        ],
        useFirstGroupAsInitialState: true,
        createdOn: 1598528579956,
      },
      "a-11": {
        id: "a-11",
        title: "Slider Btn Sibling OUT",
        actionItemGroups: [
          {
            actionItems: [
              {
                id: "a-11-n",
                actionTypeId: "TRANSFORM_SCALE",
                config: {
                  delay: 0,
                  easing: "swingFromTo",
                  duration: 500,
                  target: {
                    useEventTarget: "SIBLINGS",
                    selector: ".c-slider-btn",
                    selectorGuids: ["92a7d6a0-aa9c-e22a-d3e8-72dcb35e8df9"],
                  },
                  xValue: 1,
                  yValue: 1,
                  locked: true,
                },
              },
              {
                id: "a-11-n-2",
                actionTypeId: "STYLE_OPACITY",
                config: {
                  delay: 0,
                  easing: "ease",
                  duration: 500,
                  target: {
                    useEventTarget: "SIBLINGS",
                    selector: ".c-slider-btn",
                    selectorGuids: ["92a7d6a0-aa9c-e22a-d3e8-72dcb35e8df9"],
                  },
                  value: 1,
                  unit: "",
                },
              },
            ],
          },
        ],
        useFirstGroupAsInitialState: false,
        createdOn: 1598574163002,
      },
      "a-12": {
        id: "a-12",
        title: "Play Btn OUT",
        actionItemGroups: [
          {
            actionItems: [
              {
                id: "a-12-n",
                actionTypeId: "TRANSFORM_SCALE",
                config: {
                  delay: 0,
                  easing: "swingFromTo",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".c-slide-btn-loading",
                    selectorGuids: ["92a7d6a0-aa9c-e22a-d3e8-72dcb35e8e19"],
                  },
                  xValue: 0,
                  yValue: 0,
                  locked: true,
                },
              },
              {
                id: "a-12-n-2",
                actionTypeId: "STYLE_OPACITY",
                config: {
                  delay: 0,
                  easing: "ease",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".c-slide-btn-loading",
                    selectorGuids: ["92a7d6a0-aa9c-e22a-d3e8-72dcb35e8e19"],
                  },
                  value: 0,
                  unit: "",
                },
              },
              {
                id: "a-12-n-3",
                actionTypeId: "TRANSFORM_SCALE",
                config: {
                  delay: 0,
                  easing: "swingFromTo",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".c-slide-btn-frame",
                    selectorGuids: ["92a7d6a0-aa9c-e22a-d3e8-72dcb35e8e1d"],
                  },
                  xValue: 1,
                  yValue: 1,
                  locked: true,
                },
              },
              {
                id: "a-12-n-4",
                actionTypeId: "STYLE_OPACITY",
                config: {
                  delay: 0,
                  easing: "ease",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".c-slide-btn-frame",
                    selectorGuids: ["92a7d6a0-aa9c-e22a-d3e8-72dcb35e8e1d"],
                  },
                  value: 1,
                  unit: "",
                },
              },
              {
                id: "a-12-n-5",
                actionTypeId: "TRANSFORM_SCALE",
                config: {
                  delay: 0,
                  easing: "swingFromTo",
                  duration: 350,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".c-play-btn",
                    selectorGuids: ["92a7d6a0-aa9c-e22a-d3e8-72dcb35e8e10"],
                  },
                  xValue: 0.8,
                  yValue: 0.8,
                  locked: true,
                },
              },
              {
                id: "a-12-n-6",
                actionTypeId: "STYLE_OPACITY",
                config: {
                  delay: 0,
                  easing: "ease",
                  duration: 350,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".c-play-btn",
                    selectorGuids: ["92a7d6a0-aa9c-e22a-d3e8-72dcb35e8e10"],
                  },
                  value: 0.75,
                  unit: "",
                },
              },
            ],
          },
        ],
        useFirstGroupAsInitialState: false,
        createdOn: 1598528424548,
      },
      "a-20": {
        id: "a-20",
        title: "Spin Play OUT",
        actionItemGroups: [
          {
            actionItems: [
              {
                id: "a-20-n",
                actionTypeId: "TRANSFORM_ROTATE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".c-slide-btn-loading",
                    selectorGuids: ["92a7d6a0-aa9c-e22a-d3e8-72dcb35e8e19"],
                  },
                  zValue: 0,
                  xUnit: "DEG",
                  yUnit: "DEG",
                  zUnit: "DEG",
                },
              },
            ],
          },
        ],
        useFirstGroupAsInitialState: false,
        createdOn: 1598528579956,
      },
      "a-15": {
        id: "a-15",
        title: "Slider Btn Sibling IN",
        actionItemGroups: [
          {
            actionItems: [
              {
                id: "a-15-n",
                actionTypeId: "TRANSFORM_SCALE",
                config: {
                  delay: 0,
                  easing: "swingFromTo",
                  duration: 500,
                  target: {
                    useEventTarget: "SIBLINGS",
                    selector: ".c-slider-btn",
                    selectorGuids: ["92a7d6a0-aa9c-e22a-d3e8-72dcb35e8df9"],
                  },
                  xValue: 1,
                  yValue: 1,
                  locked: true,
                },
              },
              {
                id: "a-15-n-2",
                actionTypeId: "STYLE_OPACITY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {
                    useEventTarget: "SIBLINGS",
                    selector: ".c-slider-btn",
                    selectorGuids: ["92a7d6a0-aa9c-e22a-d3e8-72dcb35e8df9"],
                  },
                  value: 1,
                  unit: "",
                },
              },
            ],
          },
          {
            actionItems: [
              {
                id: "a-15-n-3",
                actionTypeId: "TRANSFORM_SCALE",
                config: {
                  delay: 0,
                  easing: "swingFromTo",
                  duration: 500,
                  target: {
                    useEventTarget: "SIBLINGS",
                    selector: ".c-slider-btn",
                    selectorGuids: ["92a7d6a0-aa9c-e22a-d3e8-72dcb35e8df9"],
                  },
                  xValue: 0.85,
                  yValue: 0.85,
                  locked: true,
                },
              },
              {
                id: "a-15-n-4",
                actionTypeId: "STYLE_OPACITY",
                config: {
                  delay: 0,
                  easing: "ease",
                  duration: 500,
                  target: {
                    useEventTarget: "SIBLINGS",
                    selector: ".c-slider-btn",
                    selectorGuids: ["92a7d6a0-aa9c-e22a-d3e8-72dcb35e8df9"],
                  },
                  value: 0.5,
                  unit: "",
                },
              },
            ],
          },
        ],
        useFirstGroupAsInitialState: true,
        createdOn: 1598574163002,
      },
      "a-9": {
        id: "a-9",
        title: "Card Hover",
        continuousParameterGroups: [
          {
            id: "a-9-p",
            type: "MOUSE_X",
            parameterLabel: "Mouse X",
            continuousActionGroups: [
              {
                keyframe: 0,
                actionItems: [
                  {
                    id: "a-9-n",
                    actionTypeId: "TRANSFORM_ROTATE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".sub-slide-container",
                        selectorGuids: ["92a7d6a0-aa9c-e22a-d3e8-72dcb35e8e1a"],
                      },
                      yValue: -20,
                      xUnit: "DEG",
                      yUnit: "DEG",
                      zUnit: "DEG",
                    },
                  },
                  {
                    id: "a-9-n-2",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".sub-slide-title",
                        selectorGuids: ["92a7d6a0-aa9c-e22a-d3e8-72dcb35e8e11"],
                      },
                      zValue: 50,
                      xUnit: "PX",
                      yUnit: "PX",
                      zUnit: "PX",
                    },
                  },
                ],
              },
              {
                keyframe: 50,
                actionItems: [
                  {
                    id: "a-9-n-3",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".sub-slide-title",
                        selectorGuids: ["92a7d6a0-aa9c-e22a-d3e8-72dcb35e8e11"],
                      },
                      zValue: 0,
                      xUnit: "PX",
                      yUnit: "PX",
                      zUnit: "PX",
                    },
                  },
                ],
              },
              {
                keyframe: 100,
                actionItems: [
                  {
                    id: "a-9-n-4",
                    actionTypeId: "TRANSFORM_ROTATE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".sub-slide-container",
                        selectorGuids: ["92a7d6a0-aa9c-e22a-d3e8-72dcb35e8e1a"],
                      },
                      yValue: 20,
                      xUnit: "DEG",
                      yUnit: "DEG",
                      zUnit: "DEG",
                    },
                  },
                  {
                    id: "a-9-n-5",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".sub-slide-title",
                        selectorGuids: ["92a7d6a0-aa9c-e22a-d3e8-72dcb35e8e11"],
                      },
                      zValue: 50,
                      xUnit: "PX",
                      yUnit: "PX",
                      zUnit: "PX",
                    },
                  },
                ],
              },
            ],
          },
          {
            id: "a-9-p-2",
            type: "MOUSE_Y",
            parameterLabel: "Mouse Y",
            continuousActionGroups: [
              {
                keyframe: 0,
                actionItems: [
                  {
                    id: "a-9-n-6",
                    actionTypeId: "TRANSFORM_ROTATE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".sub-slide-container",
                        selectorGuids: ["92a7d6a0-aa9c-e22a-d3e8-72dcb35e8e1a"],
                      },
                      xValue: 20,
                      xUnit: "DEG",
                      yUnit: "DEG",
                      zUnit: "DEG",
                    },
                  },
                ],
              },
              {
                keyframe: 100,
                actionItems: [
                  {
                    id: "a-9-n-7",
                    actionTypeId: "TRANSFORM_ROTATE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".sub-slide-container",
                        selectorGuids: ["92a7d6a0-aa9c-e22a-d3e8-72dcb35e8e1a"],
                      },
                      xValue: -20,
                      xUnit: "DEG",
                      yUnit: "DEG",
                      zUnit: "DEG",
                    },
                  },
                ],
              },
            ],
          },
        ],
        createdOn: 1598524426290,
      },
      "a-8": {
        id: "a-8",
        title: "Slider Btn OUT",
        actionItemGroups: [
          {
            actionItems: [
              {
                id: "a-8-n",
                actionTypeId: "TRANSFORM_SCALE",
                config: {
                  delay: 0,
                  easing: "swingFromTo",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".c-slider-btn-circle",
                    selectorGuids: ["92a7d6a0-aa9c-e22a-d3e8-72dcb35e8e14"],
                  },
                  xValue: 1,
                  yValue: 1,
                  locked: true,
                },
              },
              {
                id: "a-8-n-2",
                actionTypeId: "STYLE_OPACITY",
                config: {
                  delay: 0,
                  easing: "ease",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".c-slider-btn-circle",
                    selectorGuids: ["92a7d6a0-aa9c-e22a-d3e8-72dcb35e8e14"],
                  },
                  value: 1,
                  unit: "",
                },
              },
              {
                id: "a-8-n-3",
                actionTypeId: "TRANSFORM_SCALE",
                config: {
                  delay: 0,
                  easing: "swingFromTo",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".c-slider-btn-loading",
                    selectorGuids: ["92a7d6a0-aa9c-e22a-d3e8-72dcb35e8dfa"],
                  },
                  xValue: 0,
                  yValue: 0,
                  locked: true,
                },
              },
              {
                id: "a-8-n-4",
                actionTypeId: "STYLE_OPACITY",
                config: {
                  delay: 0,
                  easing: "ease",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".c-slider-btn-loading",
                    selectorGuids: ["92a7d6a0-aa9c-e22a-d3e8-72dcb35e8dfa"],
                  },
                  value: 0,
                  unit: "",
                },
              },
            ],
          },
        ],
        useFirstGroupAsInitialState: false,
        createdOn: 1598522687052,
      },
      "a-18": {
        id: "a-18",
        title: "Slide OUT 2",
        actionItemGroups: [
          {
            actionItems: [
              {
                id: "a-18-n",
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 0,
                  easing: "ease",
                  duration: 0,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".main-slide-wrapper",
                    selectorGuids: ["92a7d6a0-aa9c-e22a-d3e8-72dcb35e8dfe"],
                  },
                  yValue: 0,
                  xUnit: "PX",
                  yUnit: "%",
                  zUnit: "PX",
                },
              },
              {
                id: "a-18-n-2",
                actionTypeId: "STYLE_OPACITY",
                config: {
                  delay: 0,
                  easing: "ease",
                  duration: 0,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".main-slide-wrapper",
                    selectorGuids: ["92a7d6a0-aa9c-e22a-d3e8-72dcb35e8dfe"],
                  },
                  value: 1,
                  unit: "",
                },
              },
            ],
          },
        ],
        useFirstGroupAsInitialState: false,
        createdOn: 1598526479224,
      },
      "a-23": {
        id: "a-23",
        title: "d-64-mouse-in",
        actionItemGroups: [
          {
            actionItems: [
              {
                id: "a-23-n-3",
                actionTypeId: "STYLE_OPACITY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {
                    id: "648d360b319e67c67e8c1ebf|fdb10e2b-ea6a-081e-60a2-78d94b826712",
                  },
                  value: 0,
                  unit: "",
                },
              },
              {
                id: "a-23-n-2",
                actionTypeId: "STYLE_OPACITY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {},
                  value: 0,
                  unit: "",
                },
              },
              {
                id: "a-23-n",
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {},
                  yValue: 160,
                  xUnit: "PX",
                  yUnit: "%",
                  zUnit: "PX",
                },
              },
            ],
          },
          {
            actionItems: [
              {
                id: "a-23-n-4",
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 0,
                  easing: "outExpo",
                  duration: 500,
                  target: {},
                  yValue: 100,
                  xUnit: "PX",
                  yUnit: "%",
                  zUnit: "PX",
                },
              },
              {
                id: "a-23-n-5",
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 0,
                  easing: "outExpo",
                  duration: 500,
                  target: {},
                  yValue: 0,
                  xUnit: "PX",
                  yUnit: "%",
                  zUnit: "PX",
                },
              },
              {
                id: "a-23-n-7",
                actionTypeId: "STYLE_OPACITY",
                config: {
                  delay: 0,
                  easing: "ease",
                  duration: 500,
                  target: {
                    id: "648d360b319e67c67e8c1ebf|fdb10e2b-ea6a-081e-60a2-78d94b826712",
                  },
                  value: 1,
                  unit: "",
                },
              },
              {
                id: "a-23-n-6",
                actionTypeId: "STYLE_OPACITY",
                config: {
                  delay: 0,
                  easing: "ease",
                  duration: 500,
                  target: {},
                  value: 0.7,
                  unit: "",
                },
              },
            ],
          },
        ],
        useFirstGroupAsInitialState: true,
        createdOn: 1548387129869,
      },
      "a-24": {
        id: "a-24",
        title: "d-64-mouse-out",
        actionItemGroups: [
          {
            actionItems: [
              {
                id: "a-24-n",
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 0,
                  easing: "outExpo",
                  duration: 500,
                  target: {},
                  yValue: 0,
                  xUnit: "PX",
                  yUnit: "%",
                  zUnit: "PX",
                },
              },
              {
                id: "a-24-n-2",
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 0,
                  easing: "outExpo",
                  duration: 500,
                  target: {},
                  yValue: 160,
                  xUnit: "PX",
                  yUnit: "%",
                  zUnit: "PX",
                },
              },
              {
                id: "a-24-n-3",
                actionTypeId: "STYLE_OPACITY",
                config: {
                  delay: 0,
                  easing: "ease",
                  duration: 500,
                  target: {},
                  value: 0,
                  unit: "",
                },
              },
              {
                id: "a-24-n-4",
                actionTypeId: "STYLE_OPACITY",
                config: {
                  delay: 0,
                  easing: "ease",
                  duration: 500,
                  target: {
                    id: "648d360b319e67c67e8c1ebf|fdb10e2b-ea6a-081e-60a2-78d94b826712",
                  },
                  value: 0,
                  unit: "",
                },
              },
            ],
          },
        ],
        useFirstGroupAsInitialState: false,
        createdOn: 1548387129869,
      },
      "a-27": {
        id: "a-27",
        title: "d-127-mouse-in",
        actionItemGroups: [
          {
            actionItems: [
              {
                id: "a-27-n",
                actionTypeId: "TRANSFORM_SCALE",
                config: {
                  delay: 0,
                  easing: "outQuart",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".d-127-inner-circle",
                    selectorGuids: ["dc8e320a-e51e-43f5-3996-3512b3b7e4d3"],
                  },
                  xValue: 10,
                  yValue: 10,
                  locked: true,
                },
              },
              {
                id: "a-27-n-2",
                actionTypeId: "STYLE_BACKGROUND_COLOR",
                config: {
                  delay: 0,
                  easing: "outQuart",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".d-127-icon-circle",
                    selectorGuids: ["dc8e320a-e51e-43f5-3996-3512b3b7e4d8"],
                  },
                  globalSwatchId: "",
                  rValue: 255,
                  bValue: 255,
                  gValue: 255,
                  aValue: 1,
                },
              },
              {
                id: "a-27-n-3",
                actionTypeId: "TRANSFORM_SCALE",
                config: {
                  delay: 0,
                  easing: "outQuart",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".d-127-circle-border",
                    selectorGuids: ["dc8e320a-e51e-43f5-3996-3512b3b7e4d4"],
                  },
                  xValue: 1.15,
                  yValue: 1.15,
                  locked: true,
                },
              },
              {
                id: "a-27-n-4",
                actionTypeId: "STYLE_TEXT_COLOR",
                config: {
                  delay: 0,
                  easing: "outQuart",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".d-127-card-title",
                    selectorGuids: ["dc8e320a-e51e-43f5-3996-3512b3b7e4d7"],
                  },
                  globalSwatchId: "",
                  rValue: 255,
                  bValue: 255,
                  gValue: 255,
                  aValue: 1,
                },
              },
              {
                id: "a-27-n-5",
                actionTypeId: "STYLE_BORDER",
                config: {
                  delay: 0,
                  easing: "outQuart",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".d-127-circle-border",
                    selectorGuids: ["dc8e320a-e51e-43f5-3996-3512b3b7e4d4"],
                  },
                  globalSwatchId: "",
                  rValue: 255,
                  bValue: 255,
                  gValue: 255,
                  aValue: 1,
                },
              },
            ],
          },
        ],
        useFirstGroupAsInitialState: false,
        createdOn: 1558489486897,
      },
      "a-28": {
        id: "a-28",
        title: "d-127-mouse-out-red",
        actionItemGroups: [
          {
            actionItems: [
              {
                id: "a-28-n",
                actionTypeId: "TRANSFORM_SCALE",
                config: {
                  delay: 0,
                  easing: "outQuart",
                  duration: 350,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".d-127-inner-circle",
                    selectorGuids: ["dc8e320a-e51e-43f5-3996-3512b3b7e4d3"],
                  },
                  xValue: 1,
                  yValue: 1,
                  locked: true,
                },
              },
              {
                id: "a-28-n-2",
                actionTypeId: "STYLE_BACKGROUND_COLOR",
                config: {
                  delay: 0,
                  easing: "outQuart",
                  duration: 350,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".d-127-icon-circle",
                    selectorGuids: ["dc8e320a-e51e-43f5-3996-3512b3b7e4d8"],
                  },
                  globalSwatchId: "",
                  rValue: 0,
                  bValue: 0,
                  gValue: 0,
                  aValue: 0,
                },
              },
              {
                id: "a-28-n-3",
                actionTypeId: "STYLE_BORDER",
                config: {
                  delay: 0,
                  easing: "outQuart",
                  duration: 350,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".d-127-circle-border",
                    selectorGuids: ["dc8e320a-e51e-43f5-3996-3512b3b7e4d4"],
                  },
                  globalSwatchId: "119fb1b8",
                  rValue: 218,
                  bValue: 36,
                  gValue: 43,
                  aValue: 1,
                },
              },
              {
                id: "a-28-n-4",
                actionTypeId: "TRANSFORM_SCALE",
                config: {
                  delay: 0,
                  easing: "outQuart",
                  duration: 350,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".d-127-circle-border",
                    selectorGuids: ["dc8e320a-e51e-43f5-3996-3512b3b7e4d4"],
                  },
                  xValue: 1,
                  yValue: 1,
                  locked: true,
                },
              },
              {
                id: "a-28-n-5",
                actionTypeId: "STYLE_TEXT_COLOR",
                config: {
                  delay: 0,
                  easing: "outQuart",
                  duration: 350,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".d-127-card-title",
                    selectorGuids: ["dc8e320a-e51e-43f5-3996-3512b3b7e4d7"],
                  },
                  globalSwatchId: "",
                  rValue: 51,
                  bValue: 51,
                  gValue: 51,
                  aValue: 1,
                },
              },
            ],
          },
        ],
        useFirstGroupAsInitialState: false,
        createdOn: 1558489486897,
      },
      "a-29": {
        id: "a-29",
        title: "Big Nav text",
        continuousParameterGroups: [
          {
            id: "a-29-p",
            type: "MOUSE_X",
            parameterLabel: "Mouse X",
            continuousActionGroups: [
              {
                keyframe: 0,
                actionItems: [
                  {
                    id: "a-29-n",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        id: "648d360b319e67c67e8c1ebf|0a8f61d1-ca67-4eae-d98d-2f942a55b042",
                      },
                      xValue: -3,
                      xUnit: "%",
                      yUnit: "PX",
                      zUnit: "PX",
                    },
                  },
                ],
              },
              {
                keyframe: 100,
                actionItems: [
                  {
                    id: "a-29-n-2",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        id: "648d360b319e67c67e8c1ebf|0a8f61d1-ca67-4eae-d98d-2f942a55b042",
                      },
                      xValue: 3,
                      xUnit: "%",
                      yUnit: "PX",
                      zUnit: "PX",
                    },
                  },
                ],
              },
            ],
          },
          {
            id: "a-29-p-2",
            type: "MOUSE_Y",
            parameterLabel: "Mouse Y",
            continuousActionGroups: [],
          },
        ],
        createdOn: 1687030801930,
      },
      "a-30": {
        id: "a-30",
        title: "Hero text mouse hover animation",
        continuousParameterGroups: [
          {
            id: "a-30-p",
            type: "MOUSE_X",
            parameterLabel: "Mouse X",
            continuousActionGroups: [
              {
                keyframe: 0,
                actionItems: [
                  {
                    id: "a-30-n",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".c-main-slide-title",
                        selectorGuids: ["92a7d6a0-aa9c-e22a-d3e8-72dcb35e8e0b"],
                      },
                      xValue: -3,
                      xUnit: "%",
                      yUnit: "PX",
                      zUnit: "PX",
                    },
                  },
                ],
              },
              {
                keyframe: 100,
                actionItems: [
                  {
                    id: "a-30-n-2",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".c-main-slide-title",
                        selectorGuids: ["92a7d6a0-aa9c-e22a-d3e8-72dcb35e8e0b"],
                      },
                      xValue: 0,
                      xUnit: "%",
                      yUnit: "PX",
                      zUnit: "PX",
                    },
                  },
                ],
              },
            ],
          },
          {
            id: "a-30-p-2",
            type: "MOUSE_Y",
            parameterLabel: "Mouse Y",
            continuousActionGroups: [
              {
                keyframe: 0,
                actionItems: [
                  {
                    id: "a-30-n-3",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".c-main-slide-title",
                        selectorGuids: ["92a7d6a0-aa9c-e22a-d3e8-72dcb35e8e0b"],
                      },
                      yValue: -3,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                ],
              },
              {
                keyframe: 100,
                actionItems: [
                  {
                    id: "a-30-n-4",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        selector: ".c-main-slide-title",
                        selectorGuids: ["92a7d6a0-aa9c-e22a-d3e8-72dcb35e8e0b"],
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                ],
              },
            ],
          },
        ],
        createdOn: 1687122013088,
      },
      "a-33": {
        id: "a-33",
        title: "button1 2",
        actionItemGroups: [
          {
            actionItems: [
              {
                id: "a-33-n",
                actionTypeId: "TRANSFORM_SCALE",
                config: {
                  delay: 0,
                  easing: "inOutQuart",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".button1-left-2",
                    selectorGuids: ["19e31d33-fc16-a6d8-e52a-756fa87394c8"],
                  },
                  xValue: 0,
                  yValue: 1,
                  locked: false,
                },
              },
              {
                id: "a-33-n-2",
                actionTypeId: "STYLE_TEXT_COLOR",
                config: {
                  delay: 0,
                  easing: "inOutQuart",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".button1-text",
                    selectorGuids: ["6f6f5fda-3370-a981-0e9e-36f02bbc13f6"],
                  },
                  globalSwatchId: "141d5da8",
                  rValue: 255,
                  bValue: 255,
                  gValue: 255,
                  aValue: 1,
                },
              },
              {
                id: "a-33-n-3",
                actionTypeId: "TRANSFORM_SCALE",
                config: {
                  delay: 0,
                  easing: "inOutQuart",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".button1-right-2",
                    selectorGuids: ["19e31d33-fc16-a6d8-e52a-756fa87394c9"],
                  },
                  xValue: 0,
                  yValue: 1,
                  locked: false,
                },
              },
            ],
          },
          {
            actionItems: [
              {
                id: "a-33-n-4",
                actionTypeId: "TRANSFORM_SCALE",
                config: {
                  delay: 0,
                  easing: "inOutQuart",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".button1-left-2",
                    selectorGuids: ["19e31d33-fc16-a6d8-e52a-756fa87394c8"],
                  },
                  xValue: 1,
                  yValue: 1,
                  locked: true,
                },
              },
              {
                id: "a-33-n-5",
                actionTypeId: "STYLE_TEXT_COLOR",
                config: {
                  delay: 0,
                  easing: "inOutQuart",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".button1-text",
                    selectorGuids: ["6f6f5fda-3370-a981-0e9e-36f02bbc13f6"],
                  },
                  globalSwatchId: "119fb1b8",
                  rValue: 218,
                  bValue: 36,
                  gValue: 43,
                  aValue: 1,
                },
              },
              {
                id: "a-33-n-6",
                actionTypeId: "TRANSFORM_SCALE",
                config: {
                  delay: 0,
                  easing: "inOutQuart",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".button1-right-2",
                    selectorGuids: ["19e31d33-fc16-a6d8-e52a-756fa87394c9"],
                  },
                  xValue: 1,
                  yValue: 1,
                  locked: true,
                },
              },
            ],
          },
        ],
        useFirstGroupAsInitialState: true,
        createdOn: 1557768370159,
      },
      "a-34": {
        id: "a-34",
        title: "button1 out 2",
        actionItemGroups: [
          {
            actionItems: [
              {
                id: "a-34-n",
                actionTypeId: "TRANSFORM_SCALE",
                config: {
                  delay: 0,
                  easing: "inOutQuart",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".button1-left-2",
                    selectorGuids: ["19e31d33-fc16-a6d8-e52a-756fa87394c8"],
                  },
                  xValue: 0,
                  yValue: 1,
                  locked: false,
                },
              },
              {
                id: "a-34-n-2",
                actionTypeId: "STYLE_TEXT_COLOR",
                config: {
                  delay: 0,
                  easing: "inOutQuart",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".button1-text",
                    selectorGuids: ["6f6f5fda-3370-a981-0e9e-36f02bbc13f6"],
                  },
                  globalSwatchId: "141d5da8",
                  rValue: 255,
                  bValue: 255,
                  gValue: 255,
                  aValue: 1,
                },
              },
              {
                id: "a-34-n-3",
                actionTypeId: "TRANSFORM_SCALE",
                config: {
                  delay: 0,
                  easing: "inOutQuart",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".button1-right-2",
                    selectorGuids: ["19e31d33-fc16-a6d8-e52a-756fa87394c9"],
                  },
                  xValue: 0,
                  yValue: 1,
                  locked: false,
                },
              },
            ],
          },
        ],
        useFirstGroupAsInitialState: false,
        createdOn: 1557768370159,
      },
      "a-38": {
        id: "a-38",
        title: "btn-in",
        actionItemGroups: [
          {
            actionItems: [
              {
                id: "a-38-n",
                actionTypeId: "STYLE_SIZE",
                config: {
                  delay: 0,
                  easing: "ease",
                  duration: 300,
                  target: {},
                  widthValue: 76,
                  widthUnit: "PX",
                  heightUnit: "PX",
                  locked: false,
                },
              },
            ],
          },
        ],
        useFirstGroupAsInitialState: false,
        createdOn: 1579915040290,
      },
      "a-39": {
        id: "a-39",
        title: "btn-out",
        actionItemGroups: [
          {
            actionItems: [
              {
                id: "a-39-n",
                actionTypeId: "STYLE_SIZE",
                config: {
                  delay: 0,
                  easing: "ease",
                  duration: 300,
                  target: {},
                  widthValue: 56,
                  widthUnit: "PX",
                  heightUnit: "PX",
                  locked: false,
                },
              },
            ],
          },
        ],
        useFirstGroupAsInitialState: false,
        createdOn: 1579915040290,
      },
      "a-40": {
        id: "a-40",
        title: "project",
        continuousParameterGroups: [
          {
            id: "a-40-p",
            type: "SCROLL_PROGRESS",
            parameterLabel: "Scroll",
            continuousActionGroups: [
              {
                keyframe: 0,
                actionItems: [
                  {
                    id: "a-40-n",
                    actionTypeId: "TRANSFORM_ROTATE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: true,
                        id: "648d360b319e67c67e8c1ebf|680ab966-a63f-8320-b43a-b939e8cea7af",
                      },
                      zValue: 35,
                      xUnit: "DEG",
                      yUnit: "DEG",
                      zUnit: "DEG",
                    },
                  },
                  {
                    id: "a-40-n-2",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: true,
                        id: "648d360b319e67c67e8c1ebf|680ab966-a63f-8320-b43a-b939e8cea7af",
                      },
                      xValue: -16,
                      xUnit: "VW",
                      yUnit: "PX",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-40-n-3",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: true,
                        id: "648d360b319e67c67e8c1ebf|680ab966-a63f-8320-b43a-b939e8cea7af",
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                ],
              },
              {
                keyframe: 25,
                actionItems: [
                  {
                    id: "a-40-n-4",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: true,
                        id: "648d360b319e67c67e8c1ebf|680ab966-a63f-8320-b43a-b939e8cea7af",
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                ],
              },
              {
                keyframe: 42,
                actionItems: [
                  {
                    id: "a-40-n-5",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: true,
                        id: "648d360b319e67c67e8c1ebf|680ab966-a63f-8320-b43a-b939e8cea7af",
                      },
                      xValue: 0,
                      xUnit: "VW",
                      yUnit: "PX",
                      zUnit: "PX",
                    },
                  },
                ],
              },
              {
                keyframe: 58,
                actionItems: [
                  {
                    id: "a-40-n-6",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: true,
                        id: "648d360b319e67c67e8c1ebf|680ab966-a63f-8320-b43a-b939e8cea7af",
                      },
                      xValue: 0,
                      xUnit: "VW",
                      yUnit: "PX",
                      zUnit: "PX",
                    },
                  },
                ],
              },
              {
                keyframe: 75,
                actionItems: [
                  {
                    id: "a-40-n-7",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: true,
                        id: "648d360b319e67c67e8c1ebf|680ab966-a63f-8320-b43a-b939e8cea7af",
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                ],
              },
              {
                keyframe: 100,
                actionItems: [
                  {
                    id: "a-40-n-8",
                    actionTypeId: "TRANSFORM_ROTATE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: true,
                        id: "648d360b319e67c67e8c1ebf|680ab966-a63f-8320-b43a-b939e8cea7af",
                      },
                      zValue: -35,
                      xUnit: "DEG",
                      yUnit: "DEG",
                      zUnit: "DEG",
                    },
                  },
                  {
                    id: "a-40-n-9",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: true,
                        id: "648d360b319e67c67e8c1ebf|680ab966-a63f-8320-b43a-b939e8cea7af",
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                ],
              },
            ],
          },
        ],
        createdOn: 1579801964381,
      },
      "a-41": {
        id: "a-41",
        title: "02/ link-02-hover-in",
        actionItemGroups: [
          {
            actionItems: [
              {
                id: "a-41-n",
                actionTypeId: "STYLE_OPACITY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".link-text.is-02.is-hidden",
                    selectorGuids: [
                      "d2f9a2fe-4c61-7026-6a1b-668ce6096b09",
                      "d2f9a2fe-4c61-7026-6a1b-668ce6096b0b",
                      "d2f9a2fe-4c61-7026-6a1b-668ce6096b0c",
                    ],
                  },
                  value: 1,
                  unit: "",
                },
              },
              {
                id: "a-41-n-2",
                actionTypeId: "STYLE_OPACITY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".link-02_underline",
                    selectorGuids: ["d2f9a2fe-4c61-7026-6a1b-668ce6096b0a"],
                  },
                  value: 0,
                  unit: "",
                },
              },
            ],
          },
          {
            actionItems: [
              {
                id: "a-41-n-3",
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 0,
                  easing: [0.165, 0.84, 0.44, 1],
                  duration: 600,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".link-text.is-02",
                    selectorGuids: [
                      "d2f9a2fe-4c61-7026-6a1b-668ce6096b09",
                      "d2f9a2fe-4c61-7026-6a1b-668ce6096b0b",
                    ],
                  },
                  yValue: -100,
                  xUnit: "PX",
                  yUnit: "%",
                  zUnit: "PX",
                },
              },
              {
                id: "a-41-n-4",
                actionTypeId: "STYLE_OPACITY",
                config: {
                  delay: 0,
                  easing: [0.165, 0.84, 0.44, 1],
                  duration: 600,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".link-text.is-02",
                    selectorGuids: [
                      "d2f9a2fe-4c61-7026-6a1b-668ce6096b09",
                      "d2f9a2fe-4c61-7026-6a1b-668ce6096b0b",
                    ],
                  },
                  value: 0,
                  unit: "",
                },
              },
              {
                id: "a-41-n-5",
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 150,
                  easing: [0.165, 0.84, 0.44, 1],
                  duration: 580,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".link-text.is-02.is-hidden",
                    selectorGuids: [
                      "d2f9a2fe-4c61-7026-6a1b-668ce6096b09",
                      "d2f9a2fe-4c61-7026-6a1b-668ce6096b0b",
                      "d2f9a2fe-4c61-7026-6a1b-668ce6096b0c",
                    ],
                  },
                  yValue: -100,
                  xUnit: "PX",
                  yUnit: "%",
                  zUnit: "PX",
                },
              },
              {
                id: "a-41-n-6",
                actionTypeId: "STYLE_OPACITY",
                config: {
                  delay: 150,
                  easing: [0.165, 0.84, 0.44, 1],
                  duration: 600,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".link-text.is-02.is-hidden",
                    selectorGuids: [
                      "d2f9a2fe-4c61-7026-6a1b-668ce6096b09",
                      "d2f9a2fe-4c61-7026-6a1b-668ce6096b0b",
                      "d2f9a2fe-4c61-7026-6a1b-668ce6096b0c",
                    ],
                  },
                  value: 1,
                  unit: "",
                },
              },
              {
                id: "a-41-n-9",
                actionTypeId: "STYLE_TEXT_COLOR",
                config: {
                  delay: 150,
                  easing: "",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".link-text.is-02.is-hidden",
                    selectorGuids: [
                      "d2f9a2fe-4c61-7026-6a1b-668ce6096b09",
                      "d2f9a2fe-4c61-7026-6a1b-668ce6096b0b",
                      "d2f9a2fe-4c61-7026-6a1b-668ce6096b0c",
                    ],
                  },
                  globalSwatchId: "119fb1b8",
                  rValue: 218,
                  bValue: 36,
                  gValue: 43,
                  aValue: 1,
                },
              },
              {
                id: "a-41-n-7",
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 150,
                  easing: [0.165, 0.84, 0.44, 1],
                  duration: 600,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".link-02_underline",
                    selectorGuids: ["d2f9a2fe-4c61-7026-6a1b-668ce6096b0a"],
                  },
                  yValue: 10,
                  xUnit: "PX",
                  yUnit: "%",
                  zUnit: "PX",
                },
              },
              {
                id: "a-41-n-10",
                actionTypeId: "STYLE_BACKGROUND_COLOR",
                config: {
                  delay: 250,
                  easing: "",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".link-02_underline",
                    selectorGuids: ["d2f9a2fe-4c61-7026-6a1b-668ce6096b0a"],
                  },
                  globalSwatchId: "119fb1b8",
                  rValue: 218,
                  bValue: 36,
                  gValue: 43,
                  aValue: 1,
                },
              },
              {
                id: "a-41-n-8",
                actionTypeId: "STYLE_OPACITY",
                config: {
                  delay: 250,
                  easing: [0.165, 0.84, 0.44, 1],
                  duration: 600,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".link-02_underline",
                    selectorGuids: ["d2f9a2fe-4c61-7026-6a1b-668ce6096b0a"],
                  },
                  value: 1,
                  unit: "",
                },
              },
            ],
          },
        ],
        useFirstGroupAsInitialState: true,
        createdOn: 1667654560179,
      },
      "a-42": {
        id: "a-42",
        title: "02/ link-02-hover-out",
        actionItemGroups: [
          {
            actionItems: [
              {
                id: "a-42-n",
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 0,
                  easing: [0.165, 0.84, 0.44, 1],
                  duration: 600,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".link-text.is-02",
                    selectorGuids: [
                      "d2f9a2fe-4c61-7026-6a1b-668ce6096b09",
                      "d2f9a2fe-4c61-7026-6a1b-668ce6096b0b",
                    ],
                  },
                  yValue: 0,
                  xUnit: "PX",
                  yUnit: "%",
                  zUnit: "PX",
                },
              },
              {
                id: "a-42-n-2",
                actionTypeId: "STYLE_OPACITY",
                config: {
                  delay: 0,
                  easing: [0.165, 0.84, 0.44, 1],
                  duration: 600,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".link-text.is-02",
                    selectorGuids: [
                      "d2f9a2fe-4c61-7026-6a1b-668ce6096b09",
                      "d2f9a2fe-4c61-7026-6a1b-668ce6096b0b",
                    ],
                  },
                  value: 1,
                  unit: "",
                },
              },
              {
                id: "a-42-n-3",
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 0,
                  easing: [0.165, 0.84, 0.44, 1],
                  duration: 600,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".link-text.is-02.is-hidden",
                    selectorGuids: [
                      "d2f9a2fe-4c61-7026-6a1b-668ce6096b09",
                      "d2f9a2fe-4c61-7026-6a1b-668ce6096b0b",
                      "d2f9a2fe-4c61-7026-6a1b-668ce6096b0c",
                    ],
                  },
                  yValue: 0,
                  xUnit: "PX",
                  yUnit: "%",
                  zUnit: "PX",
                },
              },
              {
                id: "a-42-n-4",
                actionTypeId: "STYLE_OPACITY",
                config: {
                  delay: 0,
                  easing: [0.165, 0.84, 0.44, 1],
                  duration: 600,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".link-text.is-02.is-hidden",
                    selectorGuids: [
                      "d2f9a2fe-4c61-7026-6a1b-668ce6096b09",
                      "d2f9a2fe-4c61-7026-6a1b-668ce6096b0b",
                      "d2f9a2fe-4c61-7026-6a1b-668ce6096b0c",
                    ],
                  },
                  value: 0,
                  unit: "",
                },
              },
              {
                id: "a-42-n-5",
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 0,
                  easing: [0.165, 0.84, 0.44, 1],
                  duration: 600,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".link-02_underline",
                    selectorGuids: ["d2f9a2fe-4c61-7026-6a1b-668ce6096b0a"],
                  },
                  yValue: 0.35,
                  xUnit: "PX",
                  yUnit: "rem",
                  zUnit: "PX",
                },
              },
              {
                id: "a-42-n-6",
                actionTypeId: "STYLE_OPACITY",
                config: {
                  delay: 0,
                  easing: [0.165, 0.84, 0.44, 1],
                  duration: 600,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".link-02_underline",
                    selectorGuids: ["d2f9a2fe-4c61-7026-6a1b-668ce6096b0a"],
                  },
                  value: 0,
                  unit: "",
                },
              },
            ],
          },
        ],
        useFirstGroupAsInitialState: false,
        createdOn: 1667654560179,
      },
      "a-43": {
        id: "a-43",
        title: "button2 hover in",
        actionItemGroups: [
          {
            actionItems: [
              {
                id: "a-43-n",
                actionTypeId: "TRANSFORM_SCALE",
                config: {
                  delay: 0,
                  easing: "inOutQuad",
                  duration: 350,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".button2-reveal",
                    selectorGuids: ["f607a3e9-b0b7-9172-8525-e80f23728c99"],
                  },
                  xValue: 0,
                  yValue: 1,
                  locked: false,
                },
              },
              {
                id: "a-43-n-2",
                actionTypeId: "STYLE_TEXT_COLOR",
                config: {
                  delay: 0,
                  easing: "inOutQuad",
                  duration: 350,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".button2-text",
                    selectorGuids: ["f607a3e9-b0b7-9172-8525-e80f23728c98"],
                  },
                  globalSwatchId: "",
                  rValue: 255,
                  bValue: 255,
                  gValue: 255,
                  aValue: 1,
                },
              },
            ],
          },
          {
            actionItems: [
              {
                id: "a-43-n-3",
                actionTypeId: "TRANSFORM_SCALE",
                config: {
                  delay: 0,
                  easing: "inOutQuad",
                  duration: 350,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".button2-reveal",
                    selectorGuids: ["f607a3e9-b0b7-9172-8525-e80f23728c99"],
                  },
                  xValue: 1,
                  yValue: 1,
                  locked: true,
                },
              },
              {
                id: "a-43-n-4",
                actionTypeId: "STYLE_TEXT_COLOR",
                config: {
                  delay: 0,
                  easing: "inOutQuad",
                  duration: 350,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".button2-text",
                    selectorGuids: ["f607a3e9-b0b7-9172-8525-e80f23728c98"],
                  },
                  globalSwatchId: "119fb1b8",
                  rValue: 218,
                  bValue: 36,
                  gValue: 43,
                  aValue: 1,
                },
              },
            ],
          },
        ],
        useFirstGroupAsInitialState: true,
        createdOn: 1551271969823,
      },
      "a-44": {
        id: "a-44",
        title: "button2 hover out",
        actionItemGroups: [
          {
            actionItems: [
              {
                id: "a-44-n",
                actionTypeId: "TRANSFORM_SCALE",
                config: {
                  delay: 0,
                  easing: "inOutQuad",
                  duration: 350,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".button2-reveal",
                    selectorGuids: ["f607a3e9-b0b7-9172-8525-e80f23728c99"],
                  },
                  xValue: 0,
                  yValue: 1,
                  locked: false,
                },
              },
              {
                id: "a-44-n-2",
                actionTypeId: "STYLE_TEXT_COLOR",
                config: {
                  delay: 0,
                  easing: "inOutQuad",
                  duration: 350,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".button2-text",
                    selectorGuids: ["f607a3e9-b0b7-9172-8525-e80f23728c98"],
                  },
                  globalSwatchId: "141d5da8",
                  rValue: 255,
                  bValue: 255,
                  gValue: 255,
                  aValue: 1,
                },
              },
            ],
          },
        ],
        useFirstGroupAsInitialState: false,
        createdOn: 1551271969823,
      },
      "a-48": {
        id: "a-48",
        title: "Our product mouse hover animation",
        continuousParameterGroups: [
          {
            id: "a-48-p",
            type: "MOUSE_X",
            parameterLabel: "Mouse X",
            continuousActionGroups: [
              {
                keyframe: 0,
                actionItems: [
                  {
                    id: "a-48-n",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {},
                      xValue: -3,
                      xUnit: "%",
                      yUnit: "PX",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-48-n-5",
                    actionTypeId: "TRANSFORM_ROTATE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {},
                      yValue: -10,
                      xUnit: "DEG",
                      yUnit: "deg",
                      zUnit: "DEG",
                    },
                  },
                ],
              },
              {
                keyframe: 100,
                actionItems: [
                  {
                    id: "a-48-n-2",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {},
                      xValue: 0,
                      xUnit: "%",
                      yUnit: "PX",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-48-n-6",
                    actionTypeId: "TRANSFORM_ROTATE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {},
                      yValue: 10,
                      xUnit: "DEG",
                      yUnit: "deg",
                      zUnit: "DEG",
                    },
                  },
                ],
              },
            ],
          },
          {
            id: "a-48-p-2",
            type: "MOUSE_Y",
            parameterLabel: "Mouse Y",
            continuousActionGroups: [
              {
                keyframe: 0,
                actionItems: [
                  {
                    id: "a-48-n-3",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {},
                      yValue: -3,
                      xUnit: "PX",
                      yUnit: "%",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-48-n-7",
                    actionTypeId: "TRANSFORM_ROTATE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {},
                      xValue: -10,
                      xUnit: "deg",
                      yUnit: "DEG",
                      zUnit: "DEG",
                    },
                  },
                ],
              },
              {
                keyframe: 100,
                actionItems: [
                  {
                    id: "a-48-n-4",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {},
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "px",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-48-n-8",
                    actionTypeId: "TRANSFORM_ROTATE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {},
                      xValue: 10,
                      xUnit: "deg",
                      yUnit: "DEG",
                      zUnit: "DEG",
                    },
                  },
                ],
              },
            ],
          },
        ],
        createdOn: 1687159745839,
      },
      "a-49": {
        id: "a-49",
        title: "Scroll in",
        continuousParameterGroups: [
          {
            id: "a-49-p",
            type: "SCROLL_PROGRESS",
            parameterLabel: "Scroll",
            continuousActionGroups: [
              {
                keyframe: 0,
                actionItems: [
                  {
                    id: "a-49-n",
                    actionTypeId: "TRANSFORM_ROTATE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: true,
                        id: "6491ee0113b648dfaa07c6e2|00c20098-ca54-304f-1120-0c3922c413d6",
                      },
                      xValue: 45,
                      xUnit: "deg",
                      yUnit: "DEG",
                      zUnit: "DEG",
                    },
                  },
                ],
              },
              {
                keyframe: 10,
                actionItems: [
                  {
                    id: "a-49-n-2",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {},
                      xValue: -200,
                      xUnit: "px",
                      yUnit: "PX",
                      zUnit: "PX",
                    },
                  },
                ],
              },
              {
                keyframe: 40,
                actionItems: [
                  {
                    id: "a-49-n-3",
                    actionTypeId: "TRANSFORM_ROTATE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: true,
                        id: "6491ee0113b648dfaa07c6e2|00c20098-ca54-304f-1120-0c3922c413d6",
                      },
                      xValue: 0,
                      xUnit: "deg",
                      yUnit: "DEG",
                      zUnit: "DEG",
                    },
                  },
                  {
                    id: "a-49-n-4",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {},
                      xValue: 960,
                      xUnit: "px",
                      yUnit: "PX",
                      zUnit: "PX",
                    },
                  },
                  {
                    id: "a-49-n-5",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: true,
                        id: "6491ee0113b648dfaa07c6e2|00c20098-ca54-304f-1120-0c3922c413d6",
                      },
                      yValue: 0,
                      xUnit: "PX",
                      yUnit: "px",
                      zUnit: "PX",
                    },
                  },
                ],
              },
              {
                keyframe: 100,
                actionItems: [
                  {
                    id: "a-49-n-6",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: true,
                        id: "6491ee0113b648dfaa07c6e2|00c20098-ca54-304f-1120-0c3922c413d6",
                      },
                      yValue: -400,
                      xUnit: "PX",
                      yUnit: "px",
                      zUnit: "PX",
                    },
                  },
                ],
              },
            ],
          },
        ],
        createdOn: 1681112643286,
      },
      "a-52": {
        id: "a-52",
        title: "Nav Link Hover In",
        actionItemGroups: [
          {
            actionItems: [
              {
                id: "a-52-n",
                actionTypeId: "STYLE_SIZE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {},
                  widthValue: 0,
                  widthUnit: "em",
                  heightUnit: "PX",
                  locked: false,
                },
              },
              {
                id: "a-52-n-2",
                actionTypeId: "STYLE_OPACITY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {},
                  value: 0,
                  unit: "",
                },
              },
              {
                id: "a-52-n-3",
                actionTypeId: "TRANSFORM_SCALE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {},
                  xValue: 0.7,
                  yValue: 0.7,
                  locked: true,
                },
              },
              {
                id: "a-52-n-4",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {},
                  value: "none",
                },
              },
            ],
          },
          {
            actionItems: [
              {
                id: "a-52-n-5",
                actionTypeId: "STYLE_SIZE",
                config: {
                  delay: 0,
                  easing: "outQuart",
                  duration: 500,
                  target: {},
                  widthValue: 5,
                  widthUnit: "em",
                  heightUnit: "PX",
                  locked: false,
                },
              },
              {
                id: "a-52-n-6",
                actionTypeId: "STYLE_OPACITY",
                config: {
                  delay: 0,
                  easing: "outQuart",
                  duration: 500,
                  target: {},
                  value: 1,
                  unit: "",
                },
              },
              {
                id: "a-52-n-7",
                actionTypeId: "TRANSFORM_SCALE",
                config: {
                  delay: 0,
                  easing: "outQuart",
                  duration: 500,
                  target: {},
                  xValue: 1,
                  yValue: 1,
                  locked: true,
                },
              },
              {
                id: "a-52-n-8",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {},
                  value: "block",
                },
              },
            ],
          },
        ],
        useFirstGroupAsInitialState: true,
        createdOn: 1617498243251,
      },
      "a-53": {
        id: "a-53",
        title: "Nav Link Hover Out",
        actionItemGroups: [
          {
            actionItems: [
              {
                id: "a-53-n",
                actionTypeId: "STYLE_SIZE",
                config: {
                  delay: 0,
                  easing: "outQuart",
                  duration: 500,
                  target: {},
                  widthValue: 0,
                  widthUnit: "em",
                  heightUnit: "PX",
                  locked: false,
                },
              },
              {
                id: "a-53-n-2",
                actionTypeId: "STYLE_OPACITY",
                config: {
                  delay: 0,
                  easing: "outQuart",
                  duration: 500,
                  target: {},
                  value: 0,
                  unit: "",
                },
              },
              {
                id: "a-53-n-3",
                actionTypeId: "TRANSFORM_SCALE",
                config: {
                  delay: 0,
                  easing: "outQuart",
                  duration: 500,
                  target: {},
                  xValue: 0.7,
                  yValue: 0.7,
                  locked: true,
                },
              },
            ],
          },
          {
            actionItems: [
              {
                id: "a-53-n-4",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {},
                  value: "none",
                },
              },
            ],
          },
        ],
        useFirstGroupAsInitialState: false,
        createdOn: 1617498243251,
      },
      "a-54": {
        id: "a-54",
        title: "Sub Hover In",
        actionItemGroups: [
          {
            actionItems: [
              {
                id: "a-54-n",
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {},
                  xValue: -101,
                  xUnit: "%",
                  yUnit: "PX",
                  zUnit: "PX",
                },
              },
            ],
          },
          {
            actionItems: [
              {
                id: "a-54-n-2",
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 0,
                  easing: "outQuart",
                  duration: 500,
                  target: {},
                  xValue: 0,
                  xUnit: "%",
                  yUnit: "PX",
                  zUnit: "PX",
                },
              },
            ],
          },
        ],
        useFirstGroupAsInitialState: true,
        createdOn: 1617498447445,
      },
      "a-55": {
        id: "a-55",
        title: "Sub Hover Out",
        actionItemGroups: [
          {
            actionItems: [
              {
                id: "a-55-n",
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 0,
                  easing: "outQuart",
                  duration: 500,
                  target: {},
                  xValue: 101,
                  xUnit: "%",
                  yUnit: "PX",
                  zUnit: "PX",
                },
              },
            ],
          },
          {
            actionItems: [
              {
                id: "a-55-n-2",
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {},
                  xValue: -101,
                  xUnit: "%",
                  yUnit: "PX",
                  zUnit: "PX",
                },
              },
            ],
          },
        ],
        useFirstGroupAsInitialState: false,
        createdOn: 1617498447445,
      },
      "a-56": {
        id: "a-56",
        title: "Open Nav",
        actionItemGroups: [
          {
            actionItems: [
              {
                id: "a-56-n",
                actionTypeId: "STYLE_BACKGROUND_COLOR",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {},
                  globalSwatchId: "8b9854de",
                  rValue: 13,
                  bValue: 40,
                  gValue: 6,
                  aValue: 1,
                },
              },
              {
                id: "a-56-n-2",
                actionTypeId: "PLUGIN_LOTTIE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {},
                  value: 0,
                },
              },
              {
                id: "a-56-n-3",
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {},
                  yValue: -100,
                  xUnit: "PX",
                  yUnit: "%",
                  zUnit: "PX",
                },
              },
              {
                id: "a-56-n-4",
                actionTypeId: "TRANSFORM_SCALE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {},
                  xValue: 0,
                  yValue: 0,
                  locked: true,
                },
              },
              {
                id: "a-56-n-5",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {},
                  value: "none",
                },
              },
              {
                id: "a-56-n-6",
                actionTypeId: "STYLE_OPACITY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {},
                  value: 0,
                  unit: "",
                },
              },
              {
                id: "a-56-n-7",
                actionTypeId: "TRANSFORM_SCALE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {},
                  xValue: 1,
                  yValue: 1,
                  locked: true,
                },
              },
              {
                id: "a-56-n-8",
                actionTypeId: "STYLE_TEXT_COLOR",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {},
                  globalSwatchId: "8b9854de",
                  rValue: 13,
                  bValue: 40,
                  gValue: 6,
                  aValue: 1,
                },
              },
              {
                id: "a-56-n-9",
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {},
                  yValue: 0,
                  xUnit: "PX",
                  yUnit: "em",
                  zUnit: "PX",
                },
              },
              {
                id: "a-56-n-10",
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {},
                  yValue: 0,
                  xUnit: "PX",
                  yUnit: "em",
                  zUnit: "PX",
                },
              },
              {
                id: "a-56-n-11",
                actionTypeId: "TRANSFORM_ROTATE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {},
                  zValue: 0,
                  xUnit: "DEG",
                  yUnit: "DEG",
                  zUnit: "deg",
                },
              },
              {
                id: "a-56-n-12",
                actionTypeId: "STYLE_BACKGROUND_COLOR",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {},
                  globalSwatchId: "8b9854de",
                  rValue: 13,
                  bValue: 40,
                  gValue: 6,
                  aValue: 1,
                },
              },
              {
                id: "a-56-n-13",
                actionTypeId: "TRANSFORM_ROTATE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {},
                  zValue: 0,
                  xUnit: "DEG",
                  yUnit: "DEG",
                  zUnit: "deg",
                },
              },
              {
                id: "a-56-n-14",
                actionTypeId: "STYLE_BORDER",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {},
                  globalSwatchId: "8b9854de",
                  rValue: 13,
                  bValue: 40,
                  gValue: 6,
                  aValue: 1,
                },
              },
            ],
          },
          {
            actionItems: [
              {
                id: "a-56-n-15",
                actionTypeId: "STYLE_BACKGROUND_COLOR",
                config: {
                  delay: 0,
                  easing: "outSine",
                  duration: 500,
                  target: {},
                  globalSwatchId: "76649f22",
                  rValue: 233,
                  bValue: 221,
                  gValue: 198,
                  aValue: 1,
                },
              },
              {
                id: "a-56-n-16",
                actionTypeId: "PLUGIN_LOTTIE",
                config: {
                  delay: 0,
                  easing: "outSine",
                  duration: 800,
                  target: {},
                  value: 50,
                },
              },
              {
                id: "a-56-n-17",
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 0,
                  easing: "outSine",
                  duration: 700,
                  target: {},
                  yValue: 0,
                  xUnit: "PX",
                  yUnit: "%",
                  zUnit: "PX",
                },
              },
              {
                id: "a-56-n-18",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {},
                  value: "block",
                },
              },
              {
                id: "a-56-n-19",
                actionTypeId: "TRANSFORM_SCALE",
                config: {
                  delay: 0,
                  easing: "outSine",
                  duration: 500,
                  target: {},
                  xValue: 0.8,
                  yValue: 0.8,
                  locked: true,
                },
              },
              {
                id: "a-56-n-20",
                actionTypeId: "STYLE_TEXT_COLOR",
                config: {
                  delay: 0,
                  easing: "outSine",
                  duration: 500,
                  target: {},
                  globalSwatchId: "76649f22",
                  rValue: 233,
                  bValue: 221,
                  gValue: 198,
                  aValue: 1,
                },
              },
              {
                id: "a-56-n-21",
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 0,
                  easing: "outSine",
                  duration: 500,
                  target: {},
                  yValue: 0.4,
                  xUnit: "PX",
                  yUnit: "em",
                  zUnit: "PX",
                },
              },
              {
                id: "a-56-n-22",
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 0,
                  easing: "outSine",
                  duration: 500,
                  target: {},
                  yValue: -0.4,
                  xUnit: "PX",
                  yUnit: "em",
                  zUnit: "PX",
                },
              },
              {
                id: "a-56-n-23",
                actionTypeId: "TRANSFORM_ROTATE",
                config: {
                  delay: 0,
                  easing: "outSine",
                  duration: 500,
                  target: {},
                  zValue: -45,
                  xUnit: "DEG",
                  yUnit: "DEG",
                  zUnit: "deg",
                },
              },
              {
                id: "a-56-n-24",
                actionTypeId: "STYLE_BACKGROUND_COLOR",
                config: {
                  delay: 0,
                  easing: "outSine",
                  duration: 500,
                  target: {},
                  globalSwatchId: "76649f22",
                  rValue: 233,
                  bValue: 221,
                  gValue: 198,
                  aValue: 1,
                },
              },
              {
                id: "a-56-n-25",
                actionTypeId: "TRANSFORM_ROTATE",
                config: {
                  delay: 0,
                  easing: "outSine",
                  duration: 500,
                  target: {},
                  zValue: 45,
                  xUnit: "DEG",
                  yUnit: "DEG",
                  zUnit: "deg",
                },
              },
              {
                id: "a-56-n-26",
                actionTypeId: "STYLE_BORDER",
                config: {
                  delay: 0,
                  easing: "outSine",
                  duration: 500,
                  target: {},
                  globalSwatchId: "76649f22",
                  rValue: 233,
                  bValue: 221,
                  gValue: 198,
                  aValue: 1,
                },
              },
              {
                id: "a-56-n-27",
                actionTypeId: "TRANSFORM_SCALE",
                config: {
                  delay: 300,
                  easing: "outQuart",
                  duration: 500,
                  target: {},
                  xValue: 1,
                  yValue: 1,
                  locked: true,
                },
              },
              {
                id: "a-56-n-28",
                actionTypeId: "STYLE_OPACITY",
                config: {
                  delay: 400,
                  easing: "",
                  duration: 300,
                  target: {},
                  value: 1,
                  unit: "",
                },
              },
            ],
          },
        ],
        useFirstGroupAsInitialState: true,
        createdOn: 1617485543381,
      },
      "a-57": {
        id: "a-57",
        title: "Close Nav",
        actionItemGroups: [
          {
            actionItems: [
              {
                id: "a-57-n",
                actionTypeId: "STYLE_OPACITY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 200,
                  target: {},
                  value: 0,
                  unit: "",
                },
              },
              {
                id: "a-57-n-2",
                actionTypeId: "TRANSFORM_SCALE",
                config: {
                  delay: 200,
                  easing: "outQuart",
                  duration: 500,
                  target: {},
                  xValue: 0,
                  yValue: 0,
                  locked: true,
                },
              },
              {
                id: "a-57-n-3",
                actionTypeId: "PLUGIN_LOTTIE",
                config: {
                  delay: 200,
                  easing: "outSine",
                  duration: 800,
                  target: {},
                  value: 99,
                },
              },
              {
                id: "a-57-n-4",
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 200,
                  easing: "outSine",
                  duration: 700,
                  target: {},
                  yValue: -100,
                  xUnit: "PX",
                  yUnit: "%",
                  zUnit: "PX",
                },
              },
              {
                id: "a-57-n-5",
                actionTypeId: "STYLE_BACKGROUND_COLOR",
                config: {
                  delay: 200,
                  easing: "outSine",
                  duration: 500,
                  target: {},
                  globalSwatchId: "8b9854de",
                  rValue: 13,
                  bValue: 40,
                  gValue: 6,
                  aValue: 1,
                },
              },
              {
                id: "a-57-n-6",
                actionTypeId: "TRANSFORM_SCALE",
                config: {
                  delay: 200,
                  easing: "outSine",
                  duration: 500,
                  target: {},
                  xValue: 1,
                  yValue: 1,
                  locked: true,
                },
              },
              {
                id: "a-57-n-7",
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 200,
                  easing: "outSine",
                  duration: 700,
                  target: {},
                  yValue: -100,
                  xUnit: "PX",
                  yUnit: "%",
                  zUnit: "PX",
                },
              },
              {
                id: "a-57-n-8",
                actionTypeId: "STYLE_TEXT_COLOR",
                config: {
                  delay: 200,
                  easing: "outSine",
                  duration: 500,
                  target: {},
                  globalSwatchId: "8b9854de",
                  rValue: 13,
                  bValue: 40,
                  gValue: 6,
                  aValue: 1,
                },
              },
              {
                id: "a-57-n-9",
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 200,
                  easing: "outSine",
                  duration: 500,
                  target: {},
                  yValue: 0,
                  xUnit: "PX",
                  yUnit: "em",
                  zUnit: "PX",
                },
              },
              {
                id: "a-57-n-10",
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 200,
                  easing: "outSine",
                  duration: 500,
                  target: {},
                  yValue: 0,
                  xUnit: "PX",
                  yUnit: "em",
                  zUnit: "PX",
                },
              },
              {
                id: "a-57-n-11",
                actionTypeId: "TRANSFORM_ROTATE",
                config: {
                  delay: 200,
                  easing: "outSine",
                  duration: 500,
                  target: {},
                  zValue: 0,
                  xUnit: "DEG",
                  yUnit: "DEG",
                  zUnit: "deg",
                },
              },
              {
                id: "a-57-n-12",
                actionTypeId: "STYLE_BACKGROUND_COLOR",
                config: {
                  delay: 200,
                  easing: "outSine",
                  duration: 500,
                  target: {},
                  globalSwatchId: "8b9854de",
                  rValue: 13,
                  bValue: 40,
                  gValue: 6,
                  aValue: 1,
                },
              },
              {
                id: "a-57-n-13",
                actionTypeId: "TRANSFORM_ROTATE",
                config: {
                  delay: 200,
                  easing: "outSine",
                  duration: 500,
                  target: {},
                  zValue: 0,
                  xUnit: "DEG",
                  yUnit: "DEG",
                  zUnit: "deg",
                },
              },
              {
                id: "a-57-n-14",
                actionTypeId: "STYLE_BORDER",
                config: {
                  delay: 200,
                  easing: "outSine",
                  duration: 500,
                  target: {},
                  globalSwatchId: "8b9854de",
                  rValue: 13,
                  bValue: 40,
                  gValue: 6,
                  aValue: 1,
                },
              },
            ],
          },
          {
            actionItems: [
              {
                id: "a-57-n-15",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {},
                  value: "none",
                },
              },
              {
                id: "a-57-n-16",
                actionTypeId: "PLUGIN_LOTTIE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {},
                  value: 0,
                },
              },
            ],
          },
        ],
        useFirstGroupAsInitialState: false,
        createdOn: 1617485543381,
      },
      "a-58": {
        id: "a-58",
        title: "Control Hover In",
        actionItemGroups: [
          {
            actionItems: [
              {
                id: "a-58-n",
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {},
                  xValue: 0,
                  yValue: 0,
                  xUnit: "%",
                  yUnit: "%",
                  zUnit: "PX",
                },
              },
              {
                id: "a-58-n-2",
                actionTypeId: "STYLE_BACKGROUND_COLOR",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {
                    useEventTarget: true,
                    id: "648d360b319e67c67e8c1ebf|30c1bbcf-98de-a729-db68-051bc46dee15",
                  },
                  globalSwatchId: "",
                  rValue: 0,
                  bValue: 0,
                  gValue: 0,
                  aValue: 0,
                },
              },
              {
                id: "a-58-n-3",
                actionTypeId: "STYLE_TEXT_COLOR",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {
                    useEventTarget: true,
                    id: "648d360b319e67c67e8c1ebf|30c1bbcf-98de-a729-db68-051bc46dee15",
                  },
                  globalSwatchId: "119fb1b8",
                  rValue: 218,
                  bValue: 36,
                  gValue: 43,
                  aValue: 1,
                },
              },
            ],
          },
          {
            actionItems: [
              {
                id: "a-58-n-4",
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 0,
                  easing: "outQuart",
                  duration: 500,
                  target: {},
                  xValue: -100,
                  yValue: 100,
                  xUnit: "%",
                  yUnit: "%",
                  zUnit: "PX",
                },
              },
              {
                id: "a-58-n-5",
                actionTypeId: "STYLE_TEXT_COLOR",
                config: {
                  delay: 0,
                  easing: "outQuart",
                  duration: 500,
                  target: {
                    useEventTarget: true,
                    id: "648d360b319e67c67e8c1ebf|30c1bbcf-98de-a729-db68-051bc46dee15",
                  },
                  globalSwatchId: "",
                  rValue: 255,
                  bValue: 255,
                  gValue: 255,
                  aValue: 1,
                },
              },
              {
                id: "a-58-n-6",
                actionTypeId: "STYLE_BACKGROUND_COLOR",
                config: {
                  delay: 400,
                  easing: "outQuart",
                  duration: 200,
                  target: {
                    useEventTarget: true,
                    id: "648d360b319e67c67e8c1ebf|30c1bbcf-98de-a729-db68-051bc46dee15",
                  },
                  globalSwatchId: "119fb1b8",
                  rValue: 218,
                  bValue: 36,
                  gValue: 43,
                  aValue: 1,
                },
              },
            ],
          },
        ],
        useFirstGroupAsInitialState: true,
        createdOn: 1617476139421,
      },
      "a-59": {
        id: "a-59",
        title: "Control Hover Out",
        actionItemGroups: [
          {
            actionItems: [
              {
                id: "a-59-n",
                actionTypeId: "STYLE_BACKGROUND_COLOR",
                config: {
                  delay: 0,
                  easing: "outQuart",
                  duration: 200,
                  target: {
                    useEventTarget: true,
                    id: "648d360b319e67c67e8c1ebf|30c1bbcf-98de-a729-db68-051bc46dee15",
                  },
                  globalSwatchId: "",
                  rValue: 0,
                  bValue: 0,
                  gValue: 0,
                  aValue: 0,
                },
              },
              {
                id: "a-59-n-2",
                actionTypeId: "STYLE_TEXT_COLOR",
                config: {
                  delay: 100,
                  easing: "outQuart",
                  duration: 500,
                  target: {
                    useEventTarget: true,
                    id: "648d360b319e67c67e8c1ebf|30c1bbcf-98de-a729-db68-051bc46dee15",
                  },
                  globalSwatchId: "119fb1b8",
                  rValue: 218,
                  bValue: 36,
                  gValue: 43,
                  aValue: 1,
                },
              },
              {
                id: "a-59-n-3",
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 100,
                  easing: "outQuart",
                  duration: 500,
                  target: {},
                  xValue: 0,
                  yValue: 0,
                  xUnit: "%",
                  yUnit: "%",
                  zUnit: "PX",
                },
              },
            ],
          },
        ],
        useFirstGroupAsInitialState: false,
        createdOn: 1617476139421,
      },
      "a-69": {
        id: "a-69",
        title: "About us Card Hover",
        continuousParameterGroups: [
          {
            id: "a-69-p",
            type: "MOUSE_X",
            parameterLabel: "Mouse X",
            continuousActionGroups: [
              {
                keyframe: 0,
                actionItems: [
                  {
                    id: "a-69-n",
                    actionTypeId: "TRANSFORM_ROTATE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".div-block-6",
                        selectorGuids: ["7e62c7d9-c9ee-839b-25ea-4f5f979be360"],
                      },
                      yValue: -10,
                      xUnit: "DEG",
                      yUnit: "deg",
                      zUnit: "DEG",
                    },
                  },
                  {
                    id: "a-69-n-2",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".div-block-6",
                        selectorGuids: ["7e62c7d9-c9ee-839b-25ea-4f5f979be360"],
                      },
                      zValue: 25,
                      xUnit: "PX",
                      yUnit: "PX",
                      zUnit: "px",
                    },
                  },
                ],
              },
              {
                keyframe: 50,
                actionItems: [
                  {
                    id: "a-69-n-3",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".div-block-6",
                        selectorGuids: ["7e62c7d9-c9ee-839b-25ea-4f5f979be360"],
                      },
                      zValue: 5,
                      xUnit: "PX",
                      yUnit: "PX",
                      zUnit: "px",
                    },
                  },
                ],
              },
              {
                keyframe: 100,
                actionItems: [
                  {
                    id: "a-69-n-4",
                    actionTypeId: "TRANSFORM_ROTATE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".div-block-6",
                        selectorGuids: ["7e62c7d9-c9ee-839b-25ea-4f5f979be360"],
                      },
                      yValue: 10,
                      xUnit: "DEG",
                      yUnit: "deg",
                      zUnit: "DEG",
                    },
                  },
                  {
                    id: "a-69-n-5",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".div-block-6",
                        selectorGuids: ["7e62c7d9-c9ee-839b-25ea-4f5f979be360"],
                      },
                      zValue: 25,
                      xUnit: "PX",
                      yUnit: "PX",
                      zUnit: "px",
                    },
                  },
                ],
              },
            ],
          },
          {
            id: "a-69-p-2",
            type: "MOUSE_Y",
            parameterLabel: "Mouse Y",
            continuousActionGroups: [
              {
                keyframe: 0,
                actionItems: [
                  {
                    id: "a-69-n-6",
                    actionTypeId: "TRANSFORM_ROTATE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".div-block-6",
                        selectorGuids: ["7e62c7d9-c9ee-839b-25ea-4f5f979be360"],
                      },
                      xValue: 10,
                      xUnit: "deg",
                      yUnit: "DEG",
                      zUnit: "DEG",
                    },
                  },
                ],
              },
              {
                keyframe: 100,
                actionItems: [
                  {
                    id: "a-69-n-7",
                    actionTypeId: "TRANSFORM_ROTATE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".div-block-6",
                        selectorGuids: ["7e62c7d9-c9ee-839b-25ea-4f5f979be360"],
                      },
                      xValue: -10,
                      xUnit: "deg",
                      yUnit: "DEG",
                      zUnit: "DEG",
                    },
                  },
                ],
              },
            ],
          },
        ],
        createdOn: 1598524426290,
      },
      "a-70": {
        id: "a-70",
        title: "Construction Chemicals",
        continuousParameterGroups: [
          {
            id: "a-70-p",
            type: "MOUSE_X",
            parameterLabel: "Mouse X",
            continuousActionGroups: [
              {
                keyframe: 0,
                actionItems: [
                  {
                    id: "a-70-n",
                    actionTypeId: "TRANSFORM_ROTATE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".div-block",
                        selectorGuids: ["0bec61ea-bd89-6af4-c760-fae24d4fd631"],
                      },
                      yValue: -10,
                      xUnit: "DEG",
                      yUnit: "deg",
                      zUnit: "DEG",
                    },
                  },
                  {
                    id: "a-70-n-2",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".div-block",
                        selectorGuids: ["0bec61ea-bd89-6af4-c760-fae24d4fd631"],
                      },
                      zValue: 25,
                      xUnit: "PX",
                      yUnit: "PX",
                      zUnit: "px",
                    },
                  },
                ],
              },
              {
                keyframe: 50,
                actionItems: [
                  {
                    id: "a-70-n-3",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".div-block",
                        selectorGuids: ["0bec61ea-bd89-6af4-c760-fae24d4fd631"],
                      },
                      zValue: 5,
                      xUnit: "PX",
                      yUnit: "PX",
                      zUnit: "px",
                    },
                  },
                ],
              },
              {
                keyframe: 100,
                actionItems: [
                  {
                    id: "a-70-n-4",
                    actionTypeId: "TRANSFORM_ROTATE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".div-block",
                        selectorGuids: ["0bec61ea-bd89-6af4-c760-fae24d4fd631"],
                      },
                      yValue: 10,
                      xUnit: "DEG",
                      yUnit: "deg",
                      zUnit: "DEG",
                    },
                  },
                  {
                    id: "a-70-n-5",
                    actionTypeId: "TRANSFORM_MOVE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".div-block",
                        selectorGuids: ["0bec61ea-bd89-6af4-c760-fae24d4fd631"],
                      },
                      zValue: 25,
                      xUnit: "PX",
                      yUnit: "PX",
                      zUnit: "px",
                    },
                  },
                ],
              },
            ],
          },
          {
            id: "a-70-p-2",
            type: "MOUSE_Y",
            parameterLabel: "Mouse Y",
            continuousActionGroups: [
              {
                keyframe: 0,
                actionItems: [
                  {
                    id: "a-70-n-6",
                    actionTypeId: "TRANSFORM_ROTATE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".div-block",
                        selectorGuids: ["0bec61ea-bd89-6af4-c760-fae24d4fd631"],
                      },
                      xValue: 10,
                      xUnit: "deg",
                      yUnit: "DEG",
                      zUnit: "DEG",
                    },
                  },
                ],
              },
              {
                keyframe: 100,
                actionItems: [
                  {
                    id: "a-70-n-7",
                    actionTypeId: "TRANSFORM_ROTATE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".div-block",
                        selectorGuids: ["0bec61ea-bd89-6af4-c760-fae24d4fd631"],
                      },
                      xValue: -10,
                      xUnit: "deg",
                      yUnit: "DEG",
                      zUnit: "DEG",
                    },
                  },
                ],
              },
            ],
          },
        ],
        createdOn: 1598524426290,
      },
      "a-61": {
        id: "a-61",
        title: "Counter animation",
        continuousParameterGroups: [
          {
            id: "a-61-p",
            type: "SCROLL_PROGRESS",
            parameterLabel: "Scroll",
            continuousActionGroups: [
              {
                keyframe: 0,
                actionItems: [
                  {
                    id: "a-61-n",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "easeInOut",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|7ff48168-4179-51b1-4335-adf3038e88eb",
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-61-n-3",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "easeInOut",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|3939beb4-8b1e-811d-b424-1f7b8b66feda",
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-61-n-5",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "easeInOut",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|d0ba1ea2-6a60-0455-7d00-c93a423f4687",
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-61-n-7",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "easeInOut",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|2573bc00-dd0f-94b4-68fa-83931b436a61",
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-61-n-9",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "easeInOut",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|232a3bd9-d0a0-a77a-14b5-9ed3eeb142a6",
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-61-n-11",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "easeInOut",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|5b239ecb-86d8-6ce4-828a-a28dffc18775",
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-61-n-13",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "easeInOut",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|487a4b54-eacb-e1dd-c239-bcdedeae1b19",
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-61-n-15",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "easeInOut",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|0202d759-8ed2-64cf-d53c-a9622f751f1d",
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-61-n-25",
                    actionTypeId: "STYLE_BORDER",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|d2ccb4b8-e66e-40db-2b59-94f849c5e641",
                      },
                      globalSwatchId: "",
                      rValue: 0,
                      bValue: 0,
                      gValue: 0,
                      aValue: 0,
                    },
                  },
                  {
                    id: "a-61-n-27",
                    actionTypeId: "STYLE_BORDER",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|002a50d6-32a5-e2aa-7b29-fd73535dfb39",
                      },
                      globalSwatchId: "",
                      rValue: 0,
                      bValue: 0,
                      gValue: 0,
                      aValue: 0,
                    },
                  },
                  {
                    id: "a-61-n-30",
                    actionTypeId: "STYLE_BORDER",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|b22c7fb3-8435-41be-fc50-f7ad088212c8",
                      },
                      globalSwatchId: "",
                      rValue: 0,
                      bValue: 0,
                      gValue: 0,
                      aValue: 0,
                    },
                  },
                  {
                    id: "a-61-n-33",
                    actionTypeId: "STYLE_BORDER",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|f3d893a8-b62b-9a17-786e-a72965da51fc",
                      },
                      globalSwatchId: "",
                      rValue: 0,
                      bValue: 0,
                      gValue: 0,
                      aValue: 0,
                    },
                  },
                  {
                    id: "a-61-n-36",
                    actionTypeId: "STYLE_BORDER",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|a3e28c98-47d3-9964-61a7-58754273b24d",
                      },
                      globalSwatchId: "",
                      rValue: 0,
                      bValue: 0,
                      gValue: 0,
                      aValue: 0,
                    },
                  },
                  {
                    id: "a-61-n-39",
                    actionTypeId: "STYLE_BORDER",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|70d644ae-08fa-e199-0713-f195e8e5b787",
                      },
                      globalSwatchId: "",
                      rValue: 0,
                      bValue: 0,
                      gValue: 0,
                      aValue: 0,
                    },
                  },
                  {
                    id: "a-61-n-42",
                    actionTypeId: "STYLE_BORDER",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|5ee2aa8b-c6ec-7619-32bb-c210196db03c",
                      },
                      globalSwatchId: "",
                      rValue: 0,
                      bValue: 0,
                      gValue: 0,
                      aValue: 0,
                    },
                  },
                  {
                    id: "a-61-n-45",
                    actionTypeId: "STYLE_BORDER",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|ebb4ae24-b7c9-8ab2-1be0-c7fc8ffab87e",
                      },
                      globalSwatchId: "",
                      rValue: 0,
                      bValue: 0,
                      gValue: 0,
                      aValue: 0,
                    },
                  },
                  {
                    id: "a-61-n-75",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "easeInOut",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|cc9ad8cd-be0c-4701-5c69-1ec8be63c6b3",
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-61-n-76",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "easeInOut",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|cc9ad8cd-be0c-4701-5c69-1ec8be63c6c4",
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-61-n-77",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "easeInOut",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|cc9ad8cd-be0c-4701-5c69-1ec8be63c6d7",
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-61-n-78",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "easeInOut",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|cc9ad8cd-be0c-4701-5c69-1ec8be63c6fb",
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-61-n-79",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "easeInOut",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|cc9ad8cd-be0c-4701-5c69-1ec8be63c70e",
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-61-n-80",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "easeInOut",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|cc9ad8cd-be0c-4701-5c69-1ec8be63c71f",
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-61-n-81",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "easeInOut",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|487a4b54-eacb-e1dd-c239-bcdedeae1b19",
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-61-n-82",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "easeInOut",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|0202d759-8ed2-64cf-d53c-a9622f751f1d",
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-61-n-83",
                    actionTypeId: "STYLE_BORDER",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|cc9ad8cd-be0c-4701-5c69-1ec8be63c6b2",
                      },
                      globalSwatchId: "",
                      rValue: 0,
                      bValue: 0,
                      gValue: 0,
                      aValue: 0,
                    },
                  },
                  {
                    id: "a-61-n-84",
                    actionTypeId: "STYLE_BORDER",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|cc9ad8cd-be0c-4701-5c69-1ec8be63c6c3",
                      },
                      globalSwatchId: "",
                      rValue: 0,
                      bValue: 0,
                      gValue: 0,
                      aValue: 0,
                    },
                  },
                  {
                    id: "a-61-n-85",
                    actionTypeId: "STYLE_BORDER",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|cc9ad8cd-be0c-4701-5c69-1ec8be63c6d6",
                      },
                      globalSwatchId: "",
                      rValue: 0,
                      bValue: 0,
                      gValue: 0,
                      aValue: 0,
                    },
                  },
                  {
                    id: "a-61-n-86",
                    actionTypeId: "STYLE_BORDER",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|cc9ad8cd-be0c-4701-5c69-1ec8be63c6fa",
                      },
                      globalSwatchId: "",
                      rValue: 0,
                      bValue: 0,
                      gValue: 0,
                      aValue: 0,
                    },
                  },
                  {
                    id: "a-61-n-87",
                    actionTypeId: "STYLE_BORDER",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|cc9ad8cd-be0c-4701-5c69-1ec8be63c70d",
                      },
                      globalSwatchId: "",
                      rValue: 0,
                      bValue: 0,
                      gValue: 0,
                      aValue: 0,
                    },
                  },
                  {
                    id: "a-61-n-88",
                    actionTypeId: "STYLE_BORDER",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|cc9ad8cd-be0c-4701-5c69-1ec8be63c71e",
                      },
                      globalSwatchId: "",
                      rValue: 0,
                      bValue: 0,
                      gValue: 0,
                      aValue: 0,
                    },
                  },
                  {
                    id: "a-61-n-89",
                    actionTypeId: "STYLE_BORDER",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|5ee2aa8b-c6ec-7619-32bb-c210196db03c",
                      },
                      globalSwatchId: "",
                      rValue: 0,
                      bValue: 0,
                      gValue: 0,
                      aValue: 0,
                    },
                  },
                  {
                    id: "a-61-n-90",
                    actionTypeId: "STYLE_BORDER",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|ebb4ae24-b7c9-8ab2-1be0-c7fc8ffab87e",
                      },
                      globalSwatchId: "",
                      rValue: 0,
                      bValue: 0,
                      gValue: 0,
                      aValue: 0,
                    },
                  },
                ],
              },
              {
                keyframe: 30,
                actionItems: [
                  {
                    id: "a-61-n-24",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "easeInOut",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|7ff48168-4179-51b1-4335-adf3038e88eb",
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-61-n-26",
                    actionTypeId: "STYLE_BORDER",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|d2ccb4b8-e66e-40db-2b59-94f849c5e641",
                      },
                      globalSwatchId: "119fb1b8",
                      rValue: 218,
                      bValue: 36,
                      gValue: 43,
                      aValue: 1,
                    },
                  },
                ],
              },
              {
                keyframe: 35,
                actionItems: [
                  {
                    id: "a-61-n-2",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "easeInOut",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|7ff48168-4179-51b1-4335-adf3038e88eb",
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-61-n-4",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "easeInOut",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|3939beb4-8b1e-811d-b424-1f7b8b66feda",
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-61-n-28",
                    actionTypeId: "STYLE_BORDER",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|002a50d6-32a5-e2aa-7b29-fd73535dfb39",
                      },
                      globalSwatchId: "119fb1b8",
                      rValue: 218,
                      bValue: 36,
                      gValue: 43,
                      aValue: 1,
                    },
                  },
                  {
                    id: "a-61-n-29",
                    actionTypeId: "STYLE_BORDER",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|d2ccb4b8-e66e-40db-2b59-94f849c5e641",
                      },
                      globalSwatchId: "",
                      rValue: 0,
                      bValue: 0,
                      gValue: 0,
                      aValue: 0,
                    },
                  },
                ],
              },
              {
                keyframe: 40,
                actionItems: [
                  {
                    id: "a-61-n-23",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "easeInOut",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|3939beb4-8b1e-811d-b424-1f7b8b66feda",
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-61-n-6",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "easeInOut",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|d0ba1ea2-6a60-0455-7d00-c93a423f4687",
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-61-n-31",
                    actionTypeId: "STYLE_BORDER",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|b22c7fb3-8435-41be-fc50-f7ad088212c8",
                      },
                      globalSwatchId: "119fb1b8",
                      rValue: 218,
                      bValue: 36,
                      gValue: 43,
                      aValue: 1,
                    },
                  },
                  {
                    id: "a-61-n-32",
                    actionTypeId: "STYLE_BORDER",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|002a50d6-32a5-e2aa-7b29-fd73535dfb39",
                      },
                      globalSwatchId: "",
                      rValue: 0,
                      bValue: 0,
                      gValue: 0,
                      aValue: 0,
                    },
                  },
                ],
              },
              {
                keyframe: 45,
                actionItems: [
                  {
                    id: "a-61-n-22",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "easeInOut",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|d0ba1ea2-6a60-0455-7d00-c93a423f4687",
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-61-n-8",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "easeInOut",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|2573bc00-dd0f-94b4-68fa-83931b436a61",
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-61-n-34",
                    actionTypeId: "STYLE_BORDER",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|f3d893a8-b62b-9a17-786e-a72965da51fc",
                      },
                      globalSwatchId: "119fb1b8",
                      rValue: 218,
                      bValue: 36,
                      gValue: 43,
                      aValue: 1,
                    },
                  },
                  {
                    id: "a-61-n-35",
                    actionTypeId: "STYLE_BORDER",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|b22c7fb3-8435-41be-fc50-f7ad088212c8",
                      },
                      globalSwatchId: "",
                      rValue: 0,
                      bValue: 0,
                      gValue: 0,
                      aValue: 0,
                    },
                  },
                ],
              },
              {
                keyframe: 50,
                actionItems: [
                  {
                    id: "a-61-n-21",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "easeInOut",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|2573bc00-dd0f-94b4-68fa-83931b436a61",
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-61-n-10",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "easeInOut",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|232a3bd9-d0a0-a77a-14b5-9ed3eeb142a6",
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-61-n-37",
                    actionTypeId: "STYLE_BORDER",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|a3e28c98-47d3-9964-61a7-58754273b24d",
                      },
                      globalSwatchId: "119fb1b8",
                      rValue: 218,
                      bValue: 36,
                      gValue: 43,
                      aValue: 1,
                    },
                  },
                  {
                    id: "a-61-n-38",
                    actionTypeId: "STYLE_BORDER",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|f3d893a8-b62b-9a17-786e-a72965da51fc",
                      },
                      globalSwatchId: "",
                      rValue: 0,
                      bValue: 0,
                      gValue: 0,
                      aValue: 0,
                    },
                  },
                ],
              },
              {
                keyframe: 55,
                actionItems: [
                  {
                    id: "a-61-n-20",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "easeInOut",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|232a3bd9-d0a0-a77a-14b5-9ed3eeb142a6",
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-61-n-12",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "easeInOut",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|5b239ecb-86d8-6ce4-828a-a28dffc18775",
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-61-n-40",
                    actionTypeId: "STYLE_BORDER",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|70d644ae-08fa-e199-0713-f195e8e5b787",
                      },
                      globalSwatchId: "119fb1b8",
                      rValue: 218,
                      bValue: 36,
                      gValue: 43,
                      aValue: 1,
                    },
                  },
                  {
                    id: "a-61-n-41",
                    actionTypeId: "STYLE_BORDER",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|a3e28c98-47d3-9964-61a7-58754273b24d",
                      },
                      globalSwatchId: "",
                      rValue: 0,
                      bValue: 0,
                      gValue: 0,
                      aValue: 0,
                    },
                  },
                ],
              },
              {
                keyframe: 56,
                actionItems: [
                  {
                    id: "a-61-n-49",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "easeInOut",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|cc9ad8cd-be0c-4701-5c69-1ec8be63c6b3",
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-61-n-50",
                    actionTypeId: "STYLE_BORDER",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|cc9ad8cd-be0c-4701-5c69-1ec8be63c6b2",
                      },
                      globalSwatchId: "119fb1b8",
                      rValue: 218,
                      bValue: 36,
                      gValue: 43,
                      aValue: 1,
                    },
                  },
                ],
              },
              {
                keyframe: 60,
                actionItems: [
                  {
                    id: "a-61-n-19",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "easeInOut",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|5b239ecb-86d8-6ce4-828a-a28dffc18775",
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-61-n-14",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "easeInOut",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|487a4b54-eacb-e1dd-c239-bcdedeae1b19",
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-61-n-43",
                    actionTypeId: "STYLE_BORDER",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|5ee2aa8b-c6ec-7619-32bb-c210196db03c",
                      },
                      globalSwatchId: "119fb1b8",
                      rValue: 218,
                      bValue: 36,
                      gValue: 43,
                      aValue: 1,
                    },
                  },
                  {
                    id: "a-61-n-44",
                    actionTypeId: "STYLE_BORDER",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|70d644ae-08fa-e199-0713-f195e8e5b787",
                      },
                      globalSwatchId: "",
                      rValue: 0,
                      bValue: 0,
                      gValue: 0,
                      aValue: 0,
                    },
                  },
                ],
              },
              {
                keyframe: 61,
                actionItems: [
                  {
                    id: "a-61-n-51",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "easeInOut",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|cc9ad8cd-be0c-4701-5c69-1ec8be63c6b3",
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-61-n-52",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "easeInOut",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|cc9ad8cd-be0c-4701-5c69-1ec8be63c6c4",
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-61-n-53",
                    actionTypeId: "STYLE_BORDER",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|cc9ad8cd-be0c-4701-5c69-1ec8be63c6c3",
                      },
                      globalSwatchId: "119fb1b8",
                      rValue: 218,
                      bValue: 36,
                      gValue: 43,
                      aValue: 1,
                    },
                  },
                  {
                    id: "a-61-n-54",
                    actionTypeId: "STYLE_BORDER",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|cc9ad8cd-be0c-4701-5c69-1ec8be63c6b2",
                      },
                      globalSwatchId: "",
                      rValue: 0,
                      bValue: 0,
                      gValue: 0,
                      aValue: 0,
                    },
                  },
                ],
              },
              {
                keyframe: 65,
                actionItems: [
                  {
                    id: "a-61-n-18",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "easeInOut",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|487a4b54-eacb-e1dd-c239-bcdedeae1b19",
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-61-n-16",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "easeInOut",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|0202d759-8ed2-64cf-d53c-a9622f751f1d",
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-61-n-46",
                    actionTypeId: "STYLE_BORDER",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|ebb4ae24-b7c9-8ab2-1be0-c7fc8ffab87e",
                      },
                      globalSwatchId: "119fb1b8",
                      rValue: 218,
                      bValue: 36,
                      gValue: 43,
                      aValue: 1,
                    },
                  },
                  {
                    id: "a-61-n-47",
                    actionTypeId: "STYLE_BORDER",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|5ee2aa8b-c6ec-7619-32bb-c210196db03c",
                      },
                      globalSwatchId: "",
                      rValue: 0,
                      bValue: 0,
                      gValue: 0,
                      aValue: 0,
                    },
                  },
                ],
              },
              {
                keyframe: 66,
                actionItems: [
                  {
                    id: "a-61-n-55",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "easeInOut",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|cc9ad8cd-be0c-4701-5c69-1ec8be63c6c4",
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-61-n-56",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "easeInOut",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|cc9ad8cd-be0c-4701-5c69-1ec8be63c6d7",
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-61-n-57",
                    actionTypeId: "STYLE_BORDER",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|cc9ad8cd-be0c-4701-5c69-1ec8be63c6d6",
                      },
                      globalSwatchId: "119fb1b8",
                      rValue: 218,
                      bValue: 36,
                      gValue: 43,
                      aValue: 1,
                    },
                  },
                  {
                    id: "a-61-n-58",
                    actionTypeId: "STYLE_BORDER",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|cc9ad8cd-be0c-4701-5c69-1ec8be63c6c3",
                      },
                      globalSwatchId: "",
                      rValue: 0,
                      bValue: 0,
                      gValue: 0,
                      aValue: 0,
                    },
                  },
                ],
              },
              {
                keyframe: 70,
                actionItems: [
                  {
                    id: "a-61-n-17",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "easeInOut",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|0202d759-8ed2-64cf-d53c-a9622f751f1d",
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-61-n-48",
                    actionTypeId: "STYLE_BORDER",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|ebb4ae24-b7c9-8ab2-1be0-c7fc8ffab87e",
                      },
                      globalSwatchId: "",
                      rValue: 0,
                      bValue: 0,
                      gValue: 0,
                      aValue: 0,
                    },
                  },
                ],
              },
              {
                keyframe: 71,
                actionItems: [
                  {
                    id: "a-61-n-59",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "easeInOut",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|cc9ad8cd-be0c-4701-5c69-1ec8be63c6d7",
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-61-n-60",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "easeInOut",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|cc9ad8cd-be0c-4701-5c69-1ec8be63c6fb",
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-61-n-61",
                    actionTypeId: "STYLE_BORDER",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|cc9ad8cd-be0c-4701-5c69-1ec8be63c6fa",
                      },
                      globalSwatchId: "119fb1b8",
                      rValue: 218,
                      bValue: 36,
                      gValue: 43,
                      aValue: 1,
                    },
                  },
                  {
                    id: "a-61-n-62",
                    actionTypeId: "STYLE_BORDER",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|cc9ad8cd-be0c-4701-5c69-1ec8be63c6d6",
                      },
                      globalSwatchId: "",
                      rValue: 0,
                      bValue: 0,
                      gValue: 0,
                      aValue: 0,
                    },
                  },
                ],
              },
              {
                keyframe: 76,
                actionItems: [
                  {
                    id: "a-61-n-63",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "easeInOut",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|cc9ad8cd-be0c-4701-5c69-1ec8be63c6fb",
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-61-n-64",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "easeInOut",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|cc9ad8cd-be0c-4701-5c69-1ec8be63c70e",
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-61-n-65",
                    actionTypeId: "STYLE_BORDER",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|cc9ad8cd-be0c-4701-5c69-1ec8be63c70d",
                      },
                      globalSwatchId: "119fb1b8",
                      rValue: 218,
                      bValue: 36,
                      gValue: 43,
                      aValue: 1,
                    },
                  },
                  {
                    id: "a-61-n-66",
                    actionTypeId: "STYLE_BORDER",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|cc9ad8cd-be0c-4701-5c69-1ec8be63c6fa",
                      },
                      globalSwatchId: "",
                      rValue: 0,
                      bValue: 0,
                      gValue: 0,
                      aValue: 0,
                    },
                  },
                ],
              },
              {
                keyframe: 81,
                actionItems: [
                  {
                    id: "a-61-n-67",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "easeInOut",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|cc9ad8cd-be0c-4701-5c69-1ec8be63c71f",
                      },
                      value: 1,
                      unit: "",
                    },
                  },
                  {
                    id: "a-61-n-68",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "easeInOut",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|cc9ad8cd-be0c-4701-5c69-1ec8be63c70e",
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-61-n-69",
                    actionTypeId: "STYLE_BORDER",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|cc9ad8cd-be0c-4701-5c69-1ec8be63c70d",
                      },
                      globalSwatchId: "",
                      rValue: 0,
                      bValue: 0,
                      gValue: 0,
                      aValue: 0,
                    },
                  },
                  {
                    id: "a-61-n-70",
                    actionTypeId: "STYLE_BORDER",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|cc9ad8cd-be0c-4701-5c69-1ec8be63c71e",
                      },
                      globalSwatchId: "119fb1b8",
                      rValue: 218,
                      bValue: 36,
                      gValue: 43,
                      aValue: 1,
                    },
                  },
                ],
              },
              {
                keyframe: 86,
                actionItems: [
                  {
                    id: "a-61-n-72",
                    actionTypeId: "STYLE_OPACITY",
                    config: {
                      delay: 0,
                      easing: "easeInOut",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|cc9ad8cd-be0c-4701-5c69-1ec8be63c71f",
                      },
                      value: 0,
                      unit: "",
                    },
                  },
                  {
                    id: "a-61-n-74",
                    actionTypeId: "STYLE_BORDER",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|cc9ad8cd-be0c-4701-5c69-1ec8be63c71e",
                      },
                      globalSwatchId: "",
                      rValue: 0,
                      bValue: 0,
                      gValue: 0,
                      aValue: 0,
                    },
                  },
                ],
              },
            ],
          },
        ],
        createdOn: 1687433980538,
      },
      "a-71": {
        id: "a-71",
        title: "card-scroll-up",
        actionItemGroups: [
          {
            actionItems: [
              {
                id: "a-71-n",
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".card_scroll",
                    selectorGuids: ["ee30d97a-30f5-1df4-f191-428172f0af7c"],
                  },
                  yValue: -101,
                  xUnit: "PX",
                  yUnit: "%",
                  zUnit: "PX",
                },
              },
              {
                id: "a-71-n-13",
                actionTypeId: "STYLE_TEXT_COLOR",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".text-size-large",
                    selectorGuids: ["ee30d97a-30f5-1df4-f191-428172f0af73"],
                  },
                  globalSwatchId: "651c78b4",
                  rValue: 45,
                  bValue: 45,
                  gValue: 46,
                  aValue: 1,
                },
              },
              {
                id: "a-71-n-11",
                actionTypeId: "STYLE_TEXT_COLOR",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".text-color-grey",
                    selectorGuids: ["ee30d97a-30f5-1df4-f191-428172f0af72"],
                  },
                  globalSwatchId: "",
                  rValue: 77,
                  bValue: 77,
                  gValue: 77,
                  aValue: 1,
                },
              },
              {
                id: "a-71-n-2",
                actionTypeId: "TRANSFORM_ROTATE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".card_logo",
                    selectorGuids: ["ee30d97a-30f5-1df4-f191-428172f0af75"],
                  },
                  zValue: 0,
                  xUnit: "DEG",
                  yUnit: "DEG",
                  zUnit: "deg",
                },
              },
              {
                id: "a-71-n-3",
                actionTypeId: "TRANSFORM_SCALE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".card_logo",
                    selectorGuids: ["ee30d97a-30f5-1df4-f191-428172f0af75"],
                  },
                  xValue: 1,
                  yValue: 1,
                  locked: true,
                },
              },
              {
                id: "a-71-n-4",
                actionTypeId: "STYLE_BACKGROUND_COLOR",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".card_line",
                    selectorGuids: ["ee30d97a-30f5-1df4-f191-428172f0af74"],
                  },
                  globalSwatchId: "119fb1b8",
                  rValue: 218,
                  bValue: 36,
                  gValue: 43,
                  aValue: 1,
                },
              },
              {
                id: "a-71-n-5",
                actionTypeId: "STYLE_BORDER",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".card_img",
                    selectorGuids: ["ee30d97a-30f5-1df4-f191-428172f0af70"],
                  },
                  globalSwatchId: "",
                  rValue: 29,
                  bValue: 29,
                  gValue: 27,
                  aValue: 1,
                },
              },
            ],
          },
          {
            actionItems: [
              {
                id: "a-71-n-6",
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 0,
                  easing: "inOutQuart",
                  duration: 400,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".card_scroll",
                    selectorGuids: ["ee30d97a-30f5-1df4-f191-428172f0af7c"],
                  },
                  yValue: 0,
                  xUnit: "PX",
                  yUnit: "%",
                  zUnit: "PX",
                },
              },
              {
                id: "a-71-n-14",
                actionTypeId: "STYLE_TEXT_COLOR",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".text-size-large",
                    selectorGuids: ["ee30d97a-30f5-1df4-f191-428172f0af73"],
                  },
                  globalSwatchId: "141d5da8",
                  rValue: 255,
                  bValue: 255,
                  gValue: 255,
                  aValue: 1,
                },
              },
              {
                id: "a-71-n-12",
                actionTypeId: "STYLE_TEXT_COLOR",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".text-color-grey",
                    selectorGuids: ["ee30d97a-30f5-1df4-f191-428172f0af72"],
                  },
                  globalSwatchId: "",
                  rValue: 248,
                  bValue: 239,
                  gValue: 239,
                  aValue: 1,
                },
              },
              {
                id: "a-71-n-7",
                actionTypeId: "TRANSFORM_ROTATE",
                config: {
                  delay: 0,
                  easing: "outQuart",
                  duration: 800,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".card_logo",
                    selectorGuids: ["ee30d97a-30f5-1df4-f191-428172f0af75"],
                  },
                  zValue: -8,
                  xUnit: "DEG",
                  yUnit: "DEG",
                  zUnit: "deg",
                },
              },
              {
                id: "a-71-n-8",
                actionTypeId: "TRANSFORM_SCALE",
                config: {
                  delay: 0,
                  easing: "outQuart",
                  duration: 400,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".card_logo",
                    selectorGuids: ["ee30d97a-30f5-1df4-f191-428172f0af75"],
                  },
                  xValue: 1.2,
                  yValue: 1.2,
                  locked: true,
                },
              },
              {
                id: "a-71-n-9",
                actionTypeId: "STYLE_BACKGROUND_COLOR",
                config: {
                  delay: 0,
                  easing: "ease",
                  duration: 400,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".card_line",
                    selectorGuids: ["ee30d97a-30f5-1df4-f191-428172f0af74"],
                  },
                  globalSwatchId: "141d5da8",
                  rValue: 255,
                  bValue: 255,
                  gValue: 255,
                  aValue: 1,
                },
              },
              {
                id: "a-71-n-10",
                actionTypeId: "STYLE_BORDER",
                config: {
                  delay: 0,
                  easing: "easeIn",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".card_img",
                    selectorGuids: ["ee30d97a-30f5-1df4-f191-428172f0af70"],
                  },
                  globalSwatchId: "141d5da8",
                  rValue: 255,
                  bValue: 255,
                  gValue: 255,
                  aValue: 1,
                },
              },
            ],
          },
        ],
        useFirstGroupAsInitialState: true,
        createdOn: 1670635234530,
      },
      "a-72": {
        id: "a-72",
        title: "card-scroll-up 2",
        actionItemGroups: [
          {
            actionItems: [
              {
                id: "a-72-n",
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 300,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".card_scroll",
                    selectorGuids: ["ee30d97a-30f5-1df4-f191-428172f0af7c"],
                  },
                  yValue: -101,
                  xUnit: "PX",
                  yUnit: "%",
                  zUnit: "PX",
                },
              },
              {
                id: "a-72-n-7",
                actionTypeId: "STYLE_TEXT_COLOR",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".text-color-grey",
                    selectorGuids: ["ee30d97a-30f5-1df4-f191-428172f0af72"],
                  },
                  globalSwatchId: "",
                  rValue: 77,
                  bValue: 77,
                  gValue: 77,
                  aValue: 1,
                },
              },
              {
                id: "a-72-n-6",
                actionTypeId: "STYLE_TEXT_COLOR",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".text-size-large",
                    selectorGuids: ["ee30d97a-30f5-1df4-f191-428172f0af73"],
                  },
                  globalSwatchId: "651c78b4",
                  rValue: 45,
                  bValue: 45,
                  gValue: 46,
                  aValue: 1,
                },
              },
              {
                id: "a-72-n-2",
                actionTypeId: "TRANSFORM_ROTATE",
                config: {
                  delay: 0,
                  easing: "outQuart",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".card_logo",
                    selectorGuids: ["ee30d97a-30f5-1df4-f191-428172f0af75"],
                  },
                  zValue: 0,
                  xUnit: "DEG",
                  yUnit: "DEG",
                  zUnit: "deg",
                },
              },
              {
                id: "a-72-n-3",
                actionTypeId: "TRANSFORM_SCALE",
                config: {
                  delay: 0,
                  easing: "outQuart",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".card_logo",
                    selectorGuids: ["ee30d97a-30f5-1df4-f191-428172f0af75"],
                  },
                  xValue: 1,
                  yValue: 1,
                  locked: true,
                },
              },
              {
                id: "a-72-n-4",
                actionTypeId: "STYLE_BACKGROUND_COLOR",
                config: {
                  delay: 0,
                  easing: "easeOut",
                  duration: 100,
                  target: {
                    selector: ".card_line",
                    selectorGuids: ["ee30d97a-30f5-1df4-f191-428172f0af74"],
                  },
                  globalSwatchId: "119fb1b8",
                  rValue: 218,
                  bValue: 36,
                  gValue: 43,
                  aValue: 1,
                },
              },
              {
                id: "a-72-n-5",
                actionTypeId: "STYLE_BORDER",
                config: {
                  delay: 0,
                  easing: "easeOut",
                  duration: 200,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".card_img",
                    selectorGuids: ["ee30d97a-30f5-1df4-f191-428172f0af70"],
                  },
                  globalSwatchId: "",
                  rValue: 29,
                  bValue: 29,
                  gValue: 27,
                  aValue: 1,
                },
              },
            ],
          },
        ],
        useFirstGroupAsInitialState: false,
        createdOn: 1670635234530,
      },
      "a-73": {
        id: "a-73",
        title: "stacking-cards",
        continuousParameterGroups: [
          {
            id: "a-73-p",
            type: "SCROLL_PROGRESS",
            parameterLabel: "Scroll",
            continuousActionGroups: [
              {
                keyframe: 20,
                actionItems: [
                  {
                    id: "a-73-n",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|32441005-6a11-1b5e-388b-008d65ccf79c",
                      },
                      xValue: 1,
                      yValue: 1,
                      locked: true,
                    },
                  },
                  {
                    id: "a-73-n-2",
                    actionTypeId: "STYLE_FILTER",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|32441005-6a11-1b5e-388b-008d65ccf79c",
                      },
                      filters: [
                        {
                          type: "brightness",
                          filterId: "9991",
                          value: 100,
                          unit: "%",
                        },
                      ],
                    },
                  },
                ],
              },
              {
                keyframe: 28,
                actionItems: [
                  {
                    id: "a-73-n-3",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|32441005-6a11-1b5e-388b-008d65ccf79c",
                      },
                      xValue: 0.7,
                      yValue: 0.7,
                      locked: true,
                    },
                  },
                  {
                    id: "a-73-n-4",
                    actionTypeId: "STYLE_FILTER",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        id: "648d360b319e67c67e8c1ebf|32441005-6a11-1b5e-388b-008d65ccf79c",
                      },
                      filters: [
                        {
                          type: "brightness",
                          filterId: "9991",
                          value: 70,
                          unit: "%",
                        },
                      ],
                    },
                  },
                ],
              },
              {
                keyframe: 38,
                actionItems: [
                  {
                    id: "a-73-n-5",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".features-card.second",
                        selectorGuids: [
                          "ac664224-6daa-c894-69b8-e510d34d7ffd",
                          "ac664224-6daa-c894-69b8-e510d34d8005",
                        ],
                      },
                      xValue: 1,
                      yValue: 1,
                      locked: true,
                    },
                  },
                  {
                    id: "a-73-n-6",
                    actionTypeId: "STYLE_FILTER",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".features-card.second",
                        selectorGuids: [
                          "ac664224-6daa-c894-69b8-e510d34d7ffd",
                          "ac664224-6daa-c894-69b8-e510d34d8005",
                        ],
                      },
                      filters: [
                        {
                          type: "brightness",
                          filterId: "9e67",
                          value: 100,
                          unit: "%",
                        },
                      ],
                    },
                  },
                ],
              },
              {
                keyframe: 50,
                actionItems: [
                  {
                    id: "a-73-n-7",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".features-card.second",
                        selectorGuids: [
                          "ac664224-6daa-c894-69b8-e510d34d7ffd",
                          "ac664224-6daa-c894-69b8-e510d34d8005",
                        ],
                      },
                      xValue: 0.8,
                      yValue: 0.8,
                      locked: true,
                    },
                  },
                  {
                    id: "a-73-n-8",
                    actionTypeId: "STYLE_FILTER",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".features-card.second",
                        selectorGuids: [
                          "ac664224-6daa-c894-69b8-e510d34d7ffd",
                          "ac664224-6daa-c894-69b8-e510d34d8005",
                        ],
                      },
                      filters: [
                        {
                          type: "brightness",
                          filterId: "9e67",
                          value: 80,
                          unit: "%",
                        },
                      ],
                    },
                  },
                ],
              },
              {
                keyframe: 58,
                actionItems: [
                  {
                    id: "a-73-n-9",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".features-card.third",
                        selectorGuids: [
                          "ac664224-6daa-c894-69b8-e510d34d7ffd",
                          "ac664224-6daa-c894-69b8-e510d34d8006",
                        ],
                      },
                      xValue: 1,
                      yValue: 1,
                      locked: true,
                    },
                  },
                  {
                    id: "a-73-n-10",
                    actionTypeId: "STYLE_FILTER",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".features-card.third",
                        selectorGuids: [
                          "ac664224-6daa-c894-69b8-e510d34d7ffd",
                          "ac664224-6daa-c894-69b8-e510d34d8006",
                        ],
                      },
                      filters: [
                        {
                          type: "brightness",
                          filterId: "a2f6",
                          value: 100,
                          unit: "%",
                        },
                      ],
                    },
                  },
                ],
              },
              {
                keyframe: 64,
                actionItems: [
                  {
                    id: "a-73-n-11",
                    actionTypeId: "TRANSFORM_SCALE",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".features-card.third",
                        selectorGuids: [
                          "ac664224-6daa-c894-69b8-e510d34d7ffd",
                          "ac664224-6daa-c894-69b8-e510d34d8006",
                        ],
                      },
                      xValue: 0.9,
                      yValue: 0.9,
                      locked: true,
                    },
                  },
                  {
                    id: "a-73-n-12",
                    actionTypeId: "STYLE_FILTER",
                    config: {
                      delay: 0,
                      easing: "",
                      duration: 500,
                      target: {
                        useEventTarget: "CHILDREN",
                        selector: ".features-card.third",
                        selectorGuids: [
                          "ac664224-6daa-c894-69b8-e510d34d7ffd",
                          "ac664224-6daa-c894-69b8-e510d34d8006",
                        ],
                      },
                      filters: [
                        {
                          type: "brightness",
                          filterId: "a2f6",
                          value: 90,
                          unit: "%",
                        },
                      ],
                    },
                  },
                ],
              },
            ],
          },
        ],
        createdOn: 1657968073231,
      },
      "a-76": {
        id: "a-76",
        title: "Scroll-Content",
        actionItemGroups: [
          {
            actionItems: [
              {
                id: "a-76-n",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".bg-shadow",
                    selectorGuids: ["3ff1f9c6-d91d-b6af-94ca-d50bce2b0b1e"],
                  },
                  value: "none",
                },
              },
              {
                id: "a-76-n-2",
                actionTypeId: "STYLE_BACKGROUND_COLOR",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".dot",
                    selectorGuids: ["3ff1f9c6-d91d-b6af-94ca-d50bce2b0b2a"],
                  },
                  globalSwatchId: "1730333e",
                  rValue: 238,
                  bValue: 244,
                  gValue: 239,
                  aValue: 1,
                },
              },
              {
                id: "a-76-n-3",
                actionTypeId: "STYLE_SIZE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".dot",
                    selectorGuids: ["3ff1f9c6-d91d-b6af-94ca-d50bce2b0b2a"],
                  },
                  widthValue: 12,
                  heightValue: 12,
                  widthUnit: "px",
                  heightUnit: "px",
                  locked: false,
                },
              },
              {
                id: "a-76-n-4",
                actionTypeId: "STYLE_OPACITY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".img-block",
                    selectorGuids: ["3ff1f9c6-d91d-b6af-94ca-d50bce2b0b1f"],
                  },
                  value: 0.4,
                  unit: "",
                },
              },
              {
                id: "a-76-n-5",
                actionTypeId: "STYLE_TEXT_COLOR",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".content",
                    selectorGuids: ["3ff1f9c6-d91d-b6af-94ca-d50bce2b0b28"],
                  },
                  globalSwatchId: "1f0d510e",
                  rValue: 71,
                  bValue: 87,
                  gValue: 74,
                  aValue: 1,
                },
              },
              {
                id: "a-76-n-6",
                actionTypeId: "STYLE_TEXT_COLOR",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {},
                  globalSwatchId: "",
                  rValue: 173,
                  bValue: 194,
                  gValue: 180,
                  aValue: 1,
                },
              },
              {
                id: "a-76-n-7",
                actionTypeId: "STYLE_TEXT_COLOR",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {},
                  globalSwatchId: "1f0d510e",
                  rValue: 71,
                  bValue: 87,
                  gValue: 74,
                  aValue: 1,
                },
              },
              {
                id: "a-76-n-8",
                actionTypeId: "STYLE_BACKGROUND_COLOR",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".step",
                    selectorGuids: ["3ff1f9c6-d91d-b6af-94ca-d50bce2b0b2b"],
                  },
                  globalSwatchId: "1730333e",
                  rValue: 238,
                  bValue: 244,
                  gValue: 239,
                  aValue: 1,
                },
              },
            ],
          },
          {
            actionItems: [
              {
                id: "a-76-n-9",
                actionTypeId: "STYLE_TEXT_COLOR",
                config: {
                  delay: 600,
                  easing: "",
                  duration: 200,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".content",
                    selectorGuids: ["3ff1f9c6-d91d-b6af-94ca-d50bce2b0b28"],
                  },
                  globalSwatchId: "0b375fce",
                  rValue: 18,
                  bValue: 18,
                  gValue: 18,
                  aValue: 1,
                },
              },
              {
                id: "a-76-n-10",
                actionTypeId: "STYLE_BACKGROUND_COLOR",
                config: {
                  delay: 600,
                  easing: "",
                  duration: 200,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".dot",
                    selectorGuids: ["3ff1f9c6-d91d-b6af-94ca-d50bce2b0b2a"],
                  },
                  globalSwatchId: "119fb1b8",
                  rValue: 218,
                  bValue: 36,
                  gValue: 43,
                  aValue: 1,
                },
              },
              {
                id: "a-76-n-11",
                actionTypeId: "STYLE_SIZE",
                config: {
                  delay: 600,
                  easing: "",
                  duration: 200,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".dot",
                    selectorGuids: ["3ff1f9c6-d91d-b6af-94ca-d50bce2b0b2a"],
                  },
                  widthValue: 24,
                  heightValue: 24,
                  widthUnit: "px",
                  heightUnit: "px",
                  locked: false,
                },
              },
              {
                id: "a-76-n-12",
                actionTypeId: "STYLE_OPACITY",
                config: {
                  delay: 600,
                  easing: "",
                  duration: 400,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".img-block",
                    selectorGuids: ["3ff1f9c6-d91d-b6af-94ca-d50bce2b0b1f"],
                  },
                  value: 1,
                  unit: "",
                },
              },
              {
                id: "a-76-n-13",
                actionTypeId: "STYLE_BACKGROUND_COLOR",
                config: {
                  delay: 600,
                  easing: "",
                  duration: 200,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".step",
                    selectorGuids: ["3ff1f9c6-d91d-b6af-94ca-d50bce2b0b2b"],
                  },
                  globalSwatchId: "50035ee0",
                  rValue: 255,
                  bValue: 255,
                  gValue: 255,
                  aValue: 1,
                },
              },
              {
                id: "a-76-n-14",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 600,
                  easing: "",
                  duration: 0,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".bg-shadow",
                    selectorGuids: ["3ff1f9c6-d91d-b6af-94ca-d50bce2b0b1e"],
                  },
                  value: "block",
                },
              },
              {
                id: "a-76-n-15",
                actionTypeId: "STYLE_TEXT_COLOR",
                config: {
                  delay: 600,
                  easing: "",
                  duration: 200,
                  target: {},
                  globalSwatchId: "6126b98f",
                  rValue: 0,
                  bValue: 208,
                  gValue: 108,
                  aValue: 1,
                },
              },
              {
                id: "a-76-n-16",
                actionTypeId: "STYLE_TEXT_COLOR",
                config: {
                  delay: 600,
                  easing: "",
                  duration: 200,
                  target: {},
                  globalSwatchId: "e5674d92",
                  rValue: 112,
                  bValue: 138,
                  gValue: 118,
                  aValue: 1,
                },
              },
            ],
          },
        ],
        useFirstGroupAsInitialState: true,
        createdOn: 1611336400626,
      },
      "a-77": {
        id: "a-77",
        title: "Scroll Line",
        actionItemGroups: [
          {
            actionItems: [
              {
                id: "a-77-n",
                actionTypeId: "TRANSFORM_SCALE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".scroll-animate",
                    selectorGuids: ["3ff1f9c6-d91d-b6af-94ca-d50bce2b0b25"],
                  },
                  xValue: 1,
                  yValue: 0,
                  locked: false,
                },
              },
            ],
          },
          {
            actionItems: [
              {
                id: "a-77-n-2",
                actionTypeId: "TRANSFORM_SCALE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 600,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".scroll-animate",
                    selectorGuids: ["3ff1f9c6-d91d-b6af-94ca-d50bce2b0b25"],
                  },
                  xValue: 1,
                  yValue: 1,
                  locked: false,
                },
              },
            ],
          },
        ],
        useFirstGroupAsInitialState: true,
        createdOn: 1611752162523,
      },
      "a-78": {
        id: "a-78",
        title: "Hover Marque Show",
        actionItemGroups: [
          {
            actionItems: [
              {
                id: "a-78-n",
                actionTypeId: "STYLE_OPACITY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".single-moving-marque-div",
                    selectorGuids: ["67e7df61-b468-5ba9-d1ad-37bd737d6d66"],
                  },
                  value: 0,
                  unit: "",
                },
              },
              {
                id: "a-78-n-2",
                actionTypeId: "STYLE_SIZE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".single-moving-marque-div",
                    selectorGuids: ["67e7df61-b468-5ba9-d1ad-37bd737d6d66"],
                  },
                  heightValue: 0,
                  widthUnit: "PX",
                  heightUnit: "%",
                  locked: false,
                },
              },
            ],
          },
          {
            actionItems: [
              {
                id: "a-78-n-3",
                actionTypeId: "STYLE_OPACITY",
                config: {
                  delay: 0,
                  easing: "ease",
                  duration: 200,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".single-moving-marque-div",
                    selectorGuids: ["67e7df61-b468-5ba9-d1ad-37bd737d6d66"],
                  },
                  value: 1,
                  unit: "",
                },
              },
              {
                id: "a-78-n-4",
                actionTypeId: "STYLE_SIZE",
                config: {
                  delay: 0,
                  easing: "ease",
                  duration: 200,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".single-moving-marque-div",
                    selectorGuids: ["67e7df61-b468-5ba9-d1ad-37bd737d6d66"],
                  },
                  heightValue: 100,
                  widthUnit: "PX",
                  heightUnit: "%",
                  locked: false,
                },
              },
            ],
          },
        ],
        useFirstGroupAsInitialState: true,
        createdOn: 1653394988678,
      },
      "a-79": {
        id: "a-79",
        title: "Hover Marque Hide",
        actionItemGroups: [
          {
            actionItems: [
              {
                id: "a-79-n",
                actionTypeId: "STYLE_OPACITY",
                config: {
                  delay: 0,
                  easing: "ease",
                  duration: 200,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".single-moving-marque-div",
                    selectorGuids: ["67e7df61-b468-5ba9-d1ad-37bd737d6d66"],
                  },
                  value: 0,
                  unit: "",
                },
              },
              {
                id: "a-79-n-2",
                actionTypeId: "STYLE_SIZE",
                config: {
                  delay: 0,
                  easing: "ease",
                  duration: 200,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".single-moving-marque-div",
                    selectorGuids: ["67e7df61-b468-5ba9-d1ad-37bd737d6d66"],
                  },
                  heightValue: 0,
                  widthUnit: "PX",
                  heightUnit: "%",
                  locked: false,
                },
              },
            ],
          },
        ],
        useFirstGroupAsInitialState: false,
        createdOn: 1653394988678,
      },
      "a-80": {
        id: "a-80",
        title: "Marque Move",
        actionItemGroups: [
          {
            actionItems: [
              {
                id: "a-80-n",
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {
                    id: "64d30dd914d7241a1fdcb70a|748eef15-a7de-e10b-7133-0b4f3bac948d",
                  },
                  xValue: 0,
                  xUnit: "vw",
                  yUnit: "PX",
                  zUnit: "PX",
                },
              },
            ],
          },
          {
            actionItems: [
              {
                id: "a-80-n-2",
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 30000,
                  target: {
                    id: "64d30dd914d7241a1fdcb70a|748eef15-a7de-e10b-7133-0b4f3bac948d",
                  },
                  xValue: -204.5,
                  xUnit: "vw",
                  yUnit: "PX",
                  zUnit: "PX",
                },
              },
            ],
          },
          {
            actionItems: [
              {
                id: "a-80-n-3",
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    id: "64d30dd914d7241a1fdcb70a|748eef15-a7de-e10b-7133-0b4f3bac948d",
                  },
                  xValue: 0,
                  xUnit: "vw",
                  yUnit: "PX",
                  zUnit: "PX",
                },
              },
            ],
          },
        ],
        useFirstGroupAsInitialState: true,
        createdOn: 1691562090832,
      },
      "a-81": {
        id: "a-81",
        title: "Marque Move 2",
        actionItemGroups: [
          {
            actionItems: [
              {
                id: "a-81-n",
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {
                    id: "64d30dd914d7241a1fdcb70a|37ac41f5-f73e-b9f6-f9cc-9f07729482e6",
                  },
                  xValue: 0,
                  xUnit: "vw",
                  yUnit: "PX",
                  zUnit: "PX",
                },
              },
            ],
          },
          {
            actionItems: [
              {
                id: "a-81-n-2",
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 30000,
                  target: {
                    id: "64d30dd914d7241a1fdcb70a|37ac41f5-f73e-b9f6-f9cc-9f07729482e6",
                  },
                  xValue: -204.5,
                  xUnit: "vw",
                  yUnit: "PX",
                  zUnit: "PX",
                },
              },
            ],
          },
          {
            actionItems: [
              {
                id: "a-81-n-3",
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    id: "64d30dd914d7241a1fdcb70a|37ac41f5-f73e-b9f6-f9cc-9f07729482e6",
                  },
                  xValue: 0,
                  xUnit: "vw",
                  yUnit: "PX",
                  zUnit: "PX",
                },
              },
            ],
          },
        ],
        useFirstGroupAsInitialState: true,
        createdOn: 1691562090832,
      },
      "a-82": {
        id: "a-82",
        title: "Marque Move 3",
        actionItemGroups: [
          {
            actionItems: [
              {
                id: "a-82-n",
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {
                    id: "64d30dd914d7241a1fdcb70a|37ac41f5-f73e-b9f6-f9cc-9f077294830c",
                  },
                  xValue: 0,
                  xUnit: "vw",
                  yUnit: "PX",
                  zUnit: "PX",
                },
              },
            ],
          },
          {
            actionItems: [
              {
                id: "a-82-n-2",
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 30000,
                  target: {
                    id: "64d30dd914d7241a1fdcb70a|37ac41f5-f73e-b9f6-f9cc-9f077294830c",
                  },
                  xValue: -204.5,
                  xUnit: "vw",
                  yUnit: "PX",
                  zUnit: "PX",
                },
              },
            ],
          },
          {
            actionItems: [
              {
                id: "a-82-n-3",
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    id: "64d30dd914d7241a1fdcb70a|37ac41f5-f73e-b9f6-f9cc-9f077294830c",
                  },
                  xValue: 0,
                  xUnit: "vw",
                  yUnit: "PX",
                  zUnit: "PX",
                },
              },
            ],
          },
        ],
        useFirstGroupAsInitialState: true,
        createdOn: 1691562090832,
      },
      "a-83": {
        id: "a-83",
        title: "Marque Move 4",
        actionItemGroups: [
          {
            actionItems: [
              {
                id: "a-83-n",
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {
                    id: "64d30dd914d7241a1fdcb70a|37ac41f5-f73e-b9f6-f9cc-9f0772948346",
                  },
                  xValue: 0,
                  xUnit: "vw",
                  yUnit: "PX",
                  zUnit: "PX",
                },
              },
            ],
          },
          {
            actionItems: [
              {
                id: "a-83-n-2",
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 30000,
                  target: {
                    id: "64d30dd914d7241a1fdcb70a|37ac41f5-f73e-b9f6-f9cc-9f0772948346",
                  },
                  xValue: -204.5,
                  xUnit: "vw",
                  yUnit: "PX",
                  zUnit: "PX",
                },
              },
            ],
          },
          {
            actionItems: [
              {
                id: "a-83-n-3",
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    id: "64d30dd914d7241a1fdcb70a|37ac41f5-f73e-b9f6-f9cc-9f0772948346",
                  },
                  xValue: 0,
                  xUnit: "vw",
                  yUnit: "PX",
                  zUnit: "PX",
                },
              },
            ],
          },
        ],
        useFirstGroupAsInitialState: true,
        createdOn: 1691562090832,
      },
      "a-86": {
        id: "a-86",
        title: "Accordion Open 2",
        actionItemGroups: [
          {
            actionItems: [
              {
                id: "a-86-n",
                actionTypeId: "STYLE_SIZE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {
                    useEventTarget: "SIBLINGS",
                    selector: ".accordion-item-content",
                    selectorGuids: ["099a097a-7fe8-3894-27c1-b6fd3412b1d3"],
                  },
                  heightValue: 0,
                  widthUnit: "PX",
                  heightUnit: "PX",
                  locked: false,
                },
              },
              {
                id: "a-86-n-2",
                actionTypeId: "TRANSFORM_ROTATE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".icon.accordion-icon",
                    selectorGuids: [
                      "099a097a-7fe8-3894-27c1-b6fd3412b1d2",
                      "099a097a-7fe8-3894-27c1-b6fd3412b1d4",
                    ],
                  },
                  zValue: 0,
                  xUnit: "DEG",
                  yUnit: "DEG",
                  zUnit: "DEG",
                },
              },
            ],
          },
          {
            actionItems: [
              {
                id: "a-86-n-3",
                actionTypeId: "STYLE_SIZE",
                config: {
                  delay: 0,
                  easing: "outQuad",
                  duration: 200,
                  target: {
                    useEventTarget: "SIBLINGS",
                    selector: ".accordion-item-content",
                    selectorGuids: ["099a097a-7fe8-3894-27c1-b6fd3412b1d3"],
                  },
                  widthUnit: "PX",
                  heightUnit: "AUTO",
                  locked: false,
                },
              },
              {
                id: "a-86-n-4",
                actionTypeId: "STYLE_TEXT_COLOR",
                config: {
                  delay: 0,
                  easing: "easeOut",
                  duration: 200,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".accordion-heading",
                    selectorGuids: ["099a097a-7fe8-3894-27c1-b6fd3412b1d1"],
                  },
                  globalSwatchId: "119fb1b8",
                  rValue: 218,
                  bValue: 36,
                  gValue: 43,
                  aValue: 1,
                },
              },
              {
                id: "a-86-n-5",
                actionTypeId: "TRANSFORM_ROTATE",
                config: {
                  delay: 0,
                  easing: "outQuad",
                  duration: 200,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".icon.accordion-icon",
                    selectorGuids: [
                      "099a097a-7fe8-3894-27c1-b6fd3412b1d2",
                      "099a097a-7fe8-3894-27c1-b6fd3412b1d4",
                    ],
                  },
                  zValue: 180,
                  xUnit: "DEG",
                  yUnit: "DEG",
                  zUnit: "DEG",
                },
              },
            ],
          },
        ],
        useFirstGroupAsInitialState: true,
        createdOn: 1555887748956,
      },
      "a-87": {
        id: "a-87",
        title: "Accordion Close 2",
        actionItemGroups: [
          {
            actionItems: [
              {
                id: "a-87-n",
                actionTypeId: "STYLE_SIZE",
                config: {
                  delay: 0,
                  easing: "inQuad",
                  duration: 200,
                  target: {
                    useEventTarget: "SIBLINGS",
                    selector: ".accordion-item-content",
                    selectorGuids: ["099a097a-7fe8-3894-27c1-b6fd3412b1d3"],
                  },
                  heightValue: 0,
                  widthUnit: "PX",
                  heightUnit: "PX",
                  locked: false,
                },
              },
              {
                id: "a-87-n-2",
                actionTypeId: "STYLE_TEXT_COLOR",
                config: {
                  delay: 0,
                  easing: "easeIn",
                  duration: 200,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".accordion-heading",
                    selectorGuids: ["099a097a-7fe8-3894-27c1-b6fd3412b1d1"],
                  },
                  globalSwatchId: "",
                  rValue: 0,
                  bValue: 0,
                  gValue: 0,
                  aValue: 1,
                },
              },
              {
                id: "a-87-n-3",
                actionTypeId: "TRANSFORM_ROTATE",
                config: {
                  delay: 0,
                  easing: "inQuad",
                  duration: 200,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".icon.accordion-icon",
                    selectorGuids: [
                      "099a097a-7fe8-3894-27c1-b6fd3412b1d2",
                      "099a097a-7fe8-3894-27c1-b6fd3412b1d4",
                    ],
                  },
                  zValue: 0,
                  xUnit: "DEG",
                  yUnit: "DEG",
                  zUnit: "DEG",
                },
              },
            ],
          },
        ],
        useFirstGroupAsInitialState: false,
        createdOn: 1555887963005,
      },
      "a-89": {
        id: "a-89",
        title: "Accordion Open",
        actionItemGroups: [
          {
            actionItems: [
              {
                id: "a-89-n",
                actionTypeId: "STYLE_SIZE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {
                    useEventTarget: "SIBLINGS",
                    selector: ".accordion-item-content",
                    selectorGuids: ["099a097a-7fe8-3894-27c1-b6fd3412b1d3"],
                  },
                  heightValue: 0,
                  widthUnit: "PX",
                  heightUnit: "PX",
                  locked: false,
                },
              },
              {
                id: "a-89-n-2",
                actionTypeId: "TRANSFORM_ROTATE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".icon.accordion-icon",
                    selectorGuids: [
                      "099a097a-7fe8-3894-27c1-b6fd3412b1d2",
                      "d3aac1c4-b8ec-8c98-7301-1945aa042b5f",
                    ],
                  },
                  zValue: 0,
                  xUnit: "DEG",
                  yUnit: "DEG",
                  zUnit: "DEG",
                },
              },
            ],
          },
          {
            actionItems: [
              {
                id: "a-89-n-3",
                actionTypeId: "STYLE_SIZE",
                config: {
                  delay: 0,
                  easing: "outQuad",
                  duration: 200,
                  target: {
                    useEventTarget: "SIBLINGS",
                    selector: ".accordion-item-content",
                    selectorGuids: ["099a097a-7fe8-3894-27c1-b6fd3412b1d3"],
                  },
                  widthUnit: "PX",
                  heightUnit: "AUTO",
                  locked: false,
                },
              },
              {
                id: "a-89-n-4",
                actionTypeId: "STYLE_TEXT_COLOR",
                config: {
                  delay: 0,
                  easing: "easeOut",
                  duration: 200,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".accordion-heading-2",
                    selectorGuids: ["d3aac1c4-b8ec-8c98-7301-1945aa042b5e"],
                  },
                  globalSwatchId: "119fb1b8",
                  rValue: 218,
                  bValue: 36,
                  gValue: 43,
                  aValue: 1,
                },
              },
              {
                id: "a-89-n-5",
                actionTypeId: "TRANSFORM_ROTATE",
                config: {
                  delay: 0,
                  easing: "outQuad",
                  duration: 200,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".icon.accordion-icon",
                    selectorGuids: [
                      "099a097a-7fe8-3894-27c1-b6fd3412b1d2",
                      "d3aac1c4-b8ec-8c98-7301-1945aa042b5f",
                    ],
                  },
                  zValue: 180,
                  xUnit: "DEG",
                  yUnit: "DEG",
                  zUnit: "DEG",
                },
              },
            ],
          },
        ],
        useFirstGroupAsInitialState: true,
        createdOn: 1555887748956,
      },
      "a-90": {
        id: "a-90",
        title: "Accordion Close",
        actionItemGroups: [
          {
            actionItems: [
              {
                id: "a-90-n",
                actionTypeId: "STYLE_SIZE",
                config: {
                  delay: 0,
                  easing: "inQuad",
                  duration: 200,
                  target: {
                    useEventTarget: "SIBLINGS",
                    selector: ".accordion-item-content",
                    selectorGuids: ["099a097a-7fe8-3894-27c1-b6fd3412b1d3"],
                  },
                  heightValue: 0,
                  widthUnit: "PX",
                  heightUnit: "PX",
                  locked: false,
                },
              },
              {
                id: "a-90-n-2",
                actionTypeId: "STYLE_TEXT_COLOR",
                config: {
                  delay: 0,
                  easing: "easeIn",
                  duration: 200,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".accordion-heading-2",
                    selectorGuids: ["d3aac1c4-b8ec-8c98-7301-1945aa042b5e"],
                  },
                  globalSwatchId: "",
                  rValue: 0,
                  bValue: 0,
                  gValue: 0,
                  aValue: 1,
                },
              },
              {
                id: "a-90-n-3",
                actionTypeId: "TRANSFORM_ROTATE",
                config: {
                  delay: 0,
                  easing: "inQuad",
                  duration: 200,
                  target: {
                    useEventTarget: "CHILDREN",
                    selector: ".icon.accordion-icon",
                    selectorGuids: [
                      "099a097a-7fe8-3894-27c1-b6fd3412b1d2",
                      "d3aac1c4-b8ec-8c98-7301-1945aa042b5f",
                    ],
                  },
                  zValue: 0,
                  xUnit: "DEG",
                  yUnit: "DEG",
                  zUnit: "DEG",
                },
              },
            ],
          },
        ],
        useFirstGroupAsInitialState: false,
        createdOn: 1555887963005,
      },
      "a-91": {
        id: "a-91",
        title: "Category 01 disc. displayed",
        actionItemGroups: [
          {
            actionItems: [
              {
                id: "a-91-n",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    selector: ".mix.paragraph-category.concrete",
                    selectorGuids: [
                      "0a6ae8d9-d8d7-f6be-9a7e-8be0e6b007a0",
                      "b71644b6-9e65-0e33-719d-3ea21aa97ef1",
                      "5cd29165-2816-951a-cfcf-dfd61b8e7e4f",
                    ],
                  },
                  value: "block",
                },
              },
              {
                id: "a-91-n-8",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    selector: ".mix.paragraph-category.industrial-flooring",
                    selectorGuids: [
                      "0a6ae8d9-d8d7-f6be-9a7e-8be0e6b007a0",
                      "b71644b6-9e65-0e33-719d-3ea21aa97ef1",
                      "7b8f3617-28bd-9141-9012-220dc57e450f",
                    ],
                  },
                  value: "none",
                },
              },
              {
                id: "a-91-n-7",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    selector: ".mix.paragraph-category.expansion-joint",
                    selectorGuids: [
                      "0a6ae8d9-d8d7-f6be-9a7e-8be0e6b007a0",
                      "b71644b6-9e65-0e33-719d-3ea21aa97ef1",
                      "d32a99e8-c301-1857-1550-d26b9f9cf683",
                    ],
                  },
                  value: "none",
                },
              },
              {
                id: "a-91-n-6",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    selector: ".mix.paragraph-category.facade",
                    selectorGuids: [
                      "0a6ae8d9-d8d7-f6be-9a7e-8be0e6b007a0",
                      "b71644b6-9e65-0e33-719d-3ea21aa97ef1",
                      "ce0c212a-5a18-5e4c-75dd-31e5fe1e0577",
                    ],
                  },
                  value: "none",
                },
              },
              {
                id: "a-91-n-5",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    selector: ".mix.paragraph-category.waterproofing",
                    selectorGuids: [
                      "0a6ae8d9-d8d7-f6be-9a7e-8be0e6b007a0",
                      "b71644b6-9e65-0e33-719d-3ea21aa97ef1",
                      "531d439d-afa0-ef1c-fdc5-32d4bd9e412c",
                    ],
                  },
                  value: "none",
                },
              },
              {
                id: "a-91-n-4",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    selector: ".mix.paragraph-category.coatings",
                    selectorGuids: [
                      "0a6ae8d9-d8d7-f6be-9a7e-8be0e6b007a0",
                      "b71644b6-9e65-0e33-719d-3ea21aa97ef1",
                      "b952ebf0-1fc4-1d1b-ebb5-d8905fe0a3fd",
                    ],
                  },
                  value: "none",
                },
              },
              {
                id: "a-91-n-3",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    selector: ".mix.paragraph-category.tile-fixing",
                    selectorGuids: [
                      "0a6ae8d9-d8d7-f6be-9a7e-8be0e6b007a0",
                      "b71644b6-9e65-0e33-719d-3ea21aa97ef1",
                      "d7ccd647-fa77-2566-9fb2-e1810580809a",
                    ],
                  },
                  value: "none",
                },
              },
              {
                id: "a-91-n-2",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    selector: ".mix.paragraph-category.plasters",
                    selectorGuids: [
                      "0a6ae8d9-d8d7-f6be-9a7e-8be0e6b007a0",
                      "b71644b6-9e65-0e33-719d-3ea21aa97ef1",
                      "5ebc9fd5-3a87-b1df-97c0-fd66b4875747",
                    ],
                  },
                  value: "none",
                },
              },
            ],
          },
        ],
        useFirstGroupAsInitialState: false,
        createdOn: 1693242129115,
      },
      "a-92": {
        id: "a-92",
        title: "Category 02 disc. displayed",
        actionItemGroups: [
          {
            actionItems: [
              {
                id: "a-92-n",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    selector: ".mix.paragraph-category.concrete",
                    selectorGuids: [
                      "0a6ae8d9-d8d7-f6be-9a7e-8be0e6b007a0",
                      "b71644b6-9e65-0e33-719d-3ea21aa97ef1",
                      "5cd29165-2816-951a-cfcf-dfd61b8e7e4f",
                    ],
                  },
                  value: "none",
                },
              },
              {
                id: "a-92-n-2",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    selector: ".mix.paragraph-category.industrial-flooring",
                    selectorGuids: [
                      "0a6ae8d9-d8d7-f6be-9a7e-8be0e6b007a0",
                      "b71644b6-9e65-0e33-719d-3ea21aa97ef1",
                      "7b8f3617-28bd-9141-9012-220dc57e450f",
                    ],
                  },
                  value: "none",
                },
              },
              {
                id: "a-92-n-3",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    selector: ".mix.paragraph-category.expansion-joint",
                    selectorGuids: [
                      "0a6ae8d9-d8d7-f6be-9a7e-8be0e6b007a0",
                      "b71644b6-9e65-0e33-719d-3ea21aa97ef1",
                      "d32a99e8-c301-1857-1550-d26b9f9cf683",
                    ],
                  },
                  value: "none",
                },
              },
              {
                id: "a-92-n-4",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    selector: ".mix.paragraph-category.facade",
                    selectorGuids: [
                      "0a6ae8d9-d8d7-f6be-9a7e-8be0e6b007a0",
                      "b71644b6-9e65-0e33-719d-3ea21aa97ef1",
                      "ce0c212a-5a18-5e4c-75dd-31e5fe1e0577",
                    ],
                  },
                  value: "none",
                },
              },
              {
                id: "a-92-n-5",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    selector: ".mix.paragraph-category.waterproofing",
                    selectorGuids: [
                      "0a6ae8d9-d8d7-f6be-9a7e-8be0e6b007a0",
                      "b71644b6-9e65-0e33-719d-3ea21aa97ef1",
                      "531d439d-afa0-ef1c-fdc5-32d4bd9e412c",
                    ],
                  },
                  value: "none",
                },
              },
              {
                id: "a-92-n-6",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    selector: ".mix.paragraph-category.coatings",
                    selectorGuids: [
                      "0a6ae8d9-d8d7-f6be-9a7e-8be0e6b007a0",
                      "b71644b6-9e65-0e33-719d-3ea21aa97ef1",
                      "b952ebf0-1fc4-1d1b-ebb5-d8905fe0a3fd",
                    ],
                  },
                  value: "none",
                },
              },
              {
                id: "a-92-n-7",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    selector: ".mix.paragraph-category.tile-fixing",
                    selectorGuids: [
                      "0a6ae8d9-d8d7-f6be-9a7e-8be0e6b007a0",
                      "b71644b6-9e65-0e33-719d-3ea21aa97ef1",
                      "d7ccd647-fa77-2566-9fb2-e1810580809a",
                    ],
                  },
                  value: "none",
                },
              },
              {
                id: "a-92-n-8",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    selector: ".mix.paragraph-category.plasters",
                    selectorGuids: [
                      "0a6ae8d9-d8d7-f6be-9a7e-8be0e6b007a0",
                      "b71644b6-9e65-0e33-719d-3ea21aa97ef1",
                      "5ebc9fd5-3a87-b1df-97c0-fd66b4875747",
                    ],
                  },
                  value: "block",
                },
              },
            ],
          },
        ],
        useFirstGroupAsInitialState: false,
        createdOn: 1693242129115,
      },
      "a-93": {
        id: "a-93",
        title: "Category 03 disc. displayed",
        actionItemGroups: [
          {
            actionItems: [
              {
                id: "a-93-n",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    selector: ".mix.paragraph-category.concrete",
                    selectorGuids: [
                      "0a6ae8d9-d8d7-f6be-9a7e-8be0e6b007a0",
                      "b71644b6-9e65-0e33-719d-3ea21aa97ef1",
                      "5cd29165-2816-951a-cfcf-dfd61b8e7e4f",
                    ],
                  },
                  value: "none",
                },
              },
              {
                id: "a-93-n-2",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    selector: ".mix.paragraph-category.industrial-flooring",
                    selectorGuids: [
                      "0a6ae8d9-d8d7-f6be-9a7e-8be0e6b007a0",
                      "b71644b6-9e65-0e33-719d-3ea21aa97ef1",
                      "7b8f3617-28bd-9141-9012-220dc57e450f",
                    ],
                  },
                  value: "none",
                },
              },
              {
                id: "a-93-n-3",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    selector: ".mix.paragraph-category.expansion-joint",
                    selectorGuids: [
                      "0a6ae8d9-d8d7-f6be-9a7e-8be0e6b007a0",
                      "b71644b6-9e65-0e33-719d-3ea21aa97ef1",
                      "d32a99e8-c301-1857-1550-d26b9f9cf683",
                    ],
                  },
                  value: "none",
                },
              },
              {
                id: "a-93-n-4",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    selector: ".mix.paragraph-category.facade",
                    selectorGuids: [
                      "0a6ae8d9-d8d7-f6be-9a7e-8be0e6b007a0",
                      "b71644b6-9e65-0e33-719d-3ea21aa97ef1",
                      "ce0c212a-5a18-5e4c-75dd-31e5fe1e0577",
                    ],
                  },
                  value: "none",
                },
              },
              {
                id: "a-93-n-5",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    selector: ".mix.paragraph-category.waterproofing",
                    selectorGuids: [
                      "0a6ae8d9-d8d7-f6be-9a7e-8be0e6b007a0",
                      "b71644b6-9e65-0e33-719d-3ea21aa97ef1",
                      "531d439d-afa0-ef1c-fdc5-32d4bd9e412c",
                    ],
                  },
                  value: "none",
                },
              },
              {
                id: "a-93-n-6",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    selector: ".mix.paragraph-category.coatings",
                    selectorGuids: [
                      "0a6ae8d9-d8d7-f6be-9a7e-8be0e6b007a0",
                      "b71644b6-9e65-0e33-719d-3ea21aa97ef1",
                      "b952ebf0-1fc4-1d1b-ebb5-d8905fe0a3fd",
                    ],
                  },
                  value: "none",
                },
              },
              {
                id: "a-93-n-7",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    selector: ".mix.paragraph-category.tile-fixing",
                    selectorGuids: [
                      "0a6ae8d9-d8d7-f6be-9a7e-8be0e6b007a0",
                      "b71644b6-9e65-0e33-719d-3ea21aa97ef1",
                      "d7ccd647-fa77-2566-9fb2-e1810580809a",
                    ],
                  },
                  value: "block",
                },
              },
              {
                id: "a-93-n-8",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    selector: ".mix.paragraph-category.plasters",
                    selectorGuids: [
                      "0a6ae8d9-d8d7-f6be-9a7e-8be0e6b007a0",
                      "b71644b6-9e65-0e33-719d-3ea21aa97ef1",
                      "5ebc9fd5-3a87-b1df-97c0-fd66b4875747",
                    ],
                  },
                  value: "none",
                },
              },
            ],
          },
        ],
        useFirstGroupAsInitialState: false,
        createdOn: 1693242129115,
      },
      "a-94": {
        id: "a-94",
        title: "Category 04 disc. displayed",
        actionItemGroups: [
          {
            actionItems: [
              {
                id: "a-94-n",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    selector: ".mix.paragraph-category.concrete",
                    selectorGuids: [
                      "0a6ae8d9-d8d7-f6be-9a7e-8be0e6b007a0",
                      "b71644b6-9e65-0e33-719d-3ea21aa97ef1",
                      "5cd29165-2816-951a-cfcf-dfd61b8e7e4f",
                    ],
                  },
                  value: "none",
                },
              },
              {
                id: "a-94-n-2",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    selector: ".mix.paragraph-category.industrial-flooring",
                    selectorGuids: [
                      "0a6ae8d9-d8d7-f6be-9a7e-8be0e6b007a0",
                      "b71644b6-9e65-0e33-719d-3ea21aa97ef1",
                      "7b8f3617-28bd-9141-9012-220dc57e450f",
                    ],
                  },
                  value: "none",
                },
              },
              {
                id: "a-94-n-3",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    selector: ".mix.paragraph-category.expansion-joint",
                    selectorGuids: [
                      "0a6ae8d9-d8d7-f6be-9a7e-8be0e6b007a0",
                      "b71644b6-9e65-0e33-719d-3ea21aa97ef1",
                      "d32a99e8-c301-1857-1550-d26b9f9cf683",
                    ],
                  },
                  value: "none",
                },
              },
              {
                id: "a-94-n-4",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    selector: ".mix.paragraph-category.facade",
                    selectorGuids: [
                      "0a6ae8d9-d8d7-f6be-9a7e-8be0e6b007a0",
                      "b71644b6-9e65-0e33-719d-3ea21aa97ef1",
                      "ce0c212a-5a18-5e4c-75dd-31e5fe1e0577",
                    ],
                  },
                  value: "none",
                },
              },
              {
                id: "a-94-n-5",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    selector: ".mix.paragraph-category.waterproofing",
                    selectorGuids: [
                      "0a6ae8d9-d8d7-f6be-9a7e-8be0e6b007a0",
                      "b71644b6-9e65-0e33-719d-3ea21aa97ef1",
                      "531d439d-afa0-ef1c-fdc5-32d4bd9e412c",
                    ],
                  },
                  value: "block",
                },
              },
              {
                id: "a-94-n-6",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    selector: ".mix.paragraph-category.coatings",
                    selectorGuids: [
                      "0a6ae8d9-d8d7-f6be-9a7e-8be0e6b007a0",
                      "b71644b6-9e65-0e33-719d-3ea21aa97ef1",
                      "b952ebf0-1fc4-1d1b-ebb5-d8905fe0a3fd",
                    ],
                  },
                  value: "none",
                },
              },
              {
                id: "a-94-n-7",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    selector: ".mix.paragraph-category.tile-fixing",
                    selectorGuids: [
                      "0a6ae8d9-d8d7-f6be-9a7e-8be0e6b007a0",
                      "b71644b6-9e65-0e33-719d-3ea21aa97ef1",
                      "d7ccd647-fa77-2566-9fb2-e1810580809a",
                    ],
                  },
                  value: "none",
                },
              },
              {
                id: "a-94-n-8",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    selector: ".mix.paragraph-category.plasters",
                    selectorGuids: [
                      "0a6ae8d9-d8d7-f6be-9a7e-8be0e6b007a0",
                      "b71644b6-9e65-0e33-719d-3ea21aa97ef1",
                      "5ebc9fd5-3a87-b1df-97c0-fd66b4875747",
                    ],
                  },
                  value: "none",
                },
              },
            ],
          },
        ],
        useFirstGroupAsInitialState: false,
        createdOn: 1693242129115,
      },
      "a-95": {
        id: "a-95",
        title: "Category 05 disc. displayed",
        actionItemGroups: [
          {
            actionItems: [
              {
                id: "a-95-n",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    selector: ".mix.paragraph-category.concrete",
                    selectorGuids: [
                      "0a6ae8d9-d8d7-f6be-9a7e-8be0e6b007a0",
                      "b71644b6-9e65-0e33-719d-3ea21aa97ef1",
                      "5cd29165-2816-951a-cfcf-dfd61b8e7e4f",
                    ],
                  },
                  value: "none",
                },
              },
              {
                id: "a-95-n-2",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    selector: ".mix.paragraph-category.industrial-flooring",
                    selectorGuids: [
                      "0a6ae8d9-d8d7-f6be-9a7e-8be0e6b007a0",
                      "b71644b6-9e65-0e33-719d-3ea21aa97ef1",
                      "7b8f3617-28bd-9141-9012-220dc57e450f",
                    ],
                  },
                  value: "none",
                },
              },
              {
                id: "a-95-n-3",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    selector: ".mix.paragraph-category.expansion-joint",
                    selectorGuids: [
                      "0a6ae8d9-d8d7-f6be-9a7e-8be0e6b007a0",
                      "b71644b6-9e65-0e33-719d-3ea21aa97ef1",
                      "d32a99e8-c301-1857-1550-d26b9f9cf683",
                    ],
                  },
                  value: "none",
                },
              },
              {
                id: "a-95-n-4",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    selector: ".mix.paragraph-category.facade",
                    selectorGuids: [
                      "0a6ae8d9-d8d7-f6be-9a7e-8be0e6b007a0",
                      "b71644b6-9e65-0e33-719d-3ea21aa97ef1",
                      "ce0c212a-5a18-5e4c-75dd-31e5fe1e0577",
                    ],
                  },
                  value: "none",
                },
              },
              {
                id: "a-95-n-5",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    selector: ".mix.paragraph-category.waterproofing",
                    selectorGuids: [
                      "0a6ae8d9-d8d7-f6be-9a7e-8be0e6b007a0",
                      "b71644b6-9e65-0e33-719d-3ea21aa97ef1",
                      "531d439d-afa0-ef1c-fdc5-32d4bd9e412c",
                    ],
                  },
                  value: "none",
                },
              },
              {
                id: "a-95-n-6",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    selector: ".mix.paragraph-category.coatings",
                    selectorGuids: [
                      "0a6ae8d9-d8d7-f6be-9a7e-8be0e6b007a0",
                      "b71644b6-9e65-0e33-719d-3ea21aa97ef1",
                      "b952ebf0-1fc4-1d1b-ebb5-d8905fe0a3fd",
                    ],
                  },
                  value: "block",
                },
              },
              {
                id: "a-95-n-7",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    selector: ".mix.paragraph-category.tile-fixing",
                    selectorGuids: [
                      "0a6ae8d9-d8d7-f6be-9a7e-8be0e6b007a0",
                      "b71644b6-9e65-0e33-719d-3ea21aa97ef1",
                      "d7ccd647-fa77-2566-9fb2-e1810580809a",
                    ],
                  },
                  value: "none",
                },
              },
              {
                id: "a-95-n-8",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    selector: ".mix.paragraph-category.plasters",
                    selectorGuids: [
                      "0a6ae8d9-d8d7-f6be-9a7e-8be0e6b007a0",
                      "b71644b6-9e65-0e33-719d-3ea21aa97ef1",
                      "5ebc9fd5-3a87-b1df-97c0-fd66b4875747",
                    ],
                  },
                  value: "none",
                },
              },
            ],
          },
        ],
        useFirstGroupAsInitialState: false,
        createdOn: 1693242129115,
      },
      "a-96": {
        id: "a-96",
        title: "Category 06 disc. displayed",
        actionItemGroups: [
          {
            actionItems: [
              {
                id: "a-96-n",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    selector: ".mix.paragraph-category.concrete",
                    selectorGuids: [
                      "0a6ae8d9-d8d7-f6be-9a7e-8be0e6b007a0",
                      "b71644b6-9e65-0e33-719d-3ea21aa97ef1",
                      "5cd29165-2816-951a-cfcf-dfd61b8e7e4f",
                    ],
                  },
                  value: "none",
                },
              },
              {
                id: "a-96-n-2",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    selector: ".mix.paragraph-category.industrial-flooring",
                    selectorGuids: [
                      "0a6ae8d9-d8d7-f6be-9a7e-8be0e6b007a0",
                      "b71644b6-9e65-0e33-719d-3ea21aa97ef1",
                      "7b8f3617-28bd-9141-9012-220dc57e450f",
                    ],
                  },
                  value: "none",
                },
              },
              {
                id: "a-96-n-3",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    selector: ".mix.paragraph-category.expansion-joint",
                    selectorGuids: [
                      "0a6ae8d9-d8d7-f6be-9a7e-8be0e6b007a0",
                      "b71644b6-9e65-0e33-719d-3ea21aa97ef1",
                      "d32a99e8-c301-1857-1550-d26b9f9cf683",
                    ],
                  },
                  value: "none",
                },
              },
              {
                id: "a-96-n-4",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    selector: ".mix.paragraph-category.facade",
                    selectorGuids: [
                      "0a6ae8d9-d8d7-f6be-9a7e-8be0e6b007a0",
                      "b71644b6-9e65-0e33-719d-3ea21aa97ef1",
                      "ce0c212a-5a18-5e4c-75dd-31e5fe1e0577",
                    ],
                  },
                  value: "block",
                },
              },
              {
                id: "a-96-n-5",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    selector: ".mix.paragraph-category.waterproofing",
                    selectorGuids: [
                      "0a6ae8d9-d8d7-f6be-9a7e-8be0e6b007a0",
                      "b71644b6-9e65-0e33-719d-3ea21aa97ef1",
                      "531d439d-afa0-ef1c-fdc5-32d4bd9e412c",
                    ],
                  },
                  value: "none",
                },
              },
              {
                id: "a-96-n-6",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    selector: ".mix.paragraph-category.coatings",
                    selectorGuids: [
                      "0a6ae8d9-d8d7-f6be-9a7e-8be0e6b007a0",
                      "b71644b6-9e65-0e33-719d-3ea21aa97ef1",
                      "b952ebf0-1fc4-1d1b-ebb5-d8905fe0a3fd",
                    ],
                  },
                  value: "none",
                },
              },
              {
                id: "a-96-n-7",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    selector: ".mix.paragraph-category.tile-fixing",
                    selectorGuids: [
                      "0a6ae8d9-d8d7-f6be-9a7e-8be0e6b007a0",
                      "b71644b6-9e65-0e33-719d-3ea21aa97ef1",
                      "d7ccd647-fa77-2566-9fb2-e1810580809a",
                    ],
                  },
                  value: "none",
                },
              },
              {
                id: "a-96-n-8",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    selector: ".mix.paragraph-category.plasters",
                    selectorGuids: [
                      "0a6ae8d9-d8d7-f6be-9a7e-8be0e6b007a0",
                      "b71644b6-9e65-0e33-719d-3ea21aa97ef1",
                      "5ebc9fd5-3a87-b1df-97c0-fd66b4875747",
                    ],
                  },
                  value: "none",
                },
              },
            ],
          },
        ],
        useFirstGroupAsInitialState: false,
        createdOn: 1693242129115,
      },
      "a-97": {
        id: "a-97",
        title: "Category 07 disc. displayed",
        actionItemGroups: [
          {
            actionItems: [
              {
                id: "a-97-n",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    selector: ".mix.paragraph-category.concrete",
                    selectorGuids: [
                      "0a6ae8d9-d8d7-f6be-9a7e-8be0e6b007a0",
                      "b71644b6-9e65-0e33-719d-3ea21aa97ef1",
                      "5cd29165-2816-951a-cfcf-dfd61b8e7e4f",
                    ],
                  },
                  value: "none",
                },
              },
              {
                id: "a-97-n-2",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    selector: ".mix.paragraph-category.industrial-flooring",
                    selectorGuids: [
                      "0a6ae8d9-d8d7-f6be-9a7e-8be0e6b007a0",
                      "b71644b6-9e65-0e33-719d-3ea21aa97ef1",
                      "7b8f3617-28bd-9141-9012-220dc57e450f",
                    ],
                  },
                  value: "none",
                },
              },
              {
                id: "a-97-n-3",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    selector: ".mix.paragraph-category.expansion-joint",
                    selectorGuids: [
                      "0a6ae8d9-d8d7-f6be-9a7e-8be0e6b007a0",
                      "b71644b6-9e65-0e33-719d-3ea21aa97ef1",
                      "d32a99e8-c301-1857-1550-d26b9f9cf683",
                    ],
                  },
                  value: "block",
                },
              },
              {
                id: "a-97-n-4",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    selector: ".mix.paragraph-category.facade",
                    selectorGuids: [
                      "0a6ae8d9-d8d7-f6be-9a7e-8be0e6b007a0",
                      "b71644b6-9e65-0e33-719d-3ea21aa97ef1",
                      "ce0c212a-5a18-5e4c-75dd-31e5fe1e0577",
                    ],
                  },
                  value: "none",
                },
              },
              {
                id: "a-97-n-5",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    selector: ".mix.paragraph-category.waterproofing",
                    selectorGuids: [
                      "0a6ae8d9-d8d7-f6be-9a7e-8be0e6b007a0",
                      "b71644b6-9e65-0e33-719d-3ea21aa97ef1",
                      "531d439d-afa0-ef1c-fdc5-32d4bd9e412c",
                    ],
                  },
                  value: "none",
                },
              },
              {
                id: "a-97-n-6",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    selector: ".mix.paragraph-category.coatings",
                    selectorGuids: [
                      "0a6ae8d9-d8d7-f6be-9a7e-8be0e6b007a0",
                      "b71644b6-9e65-0e33-719d-3ea21aa97ef1",
                      "b952ebf0-1fc4-1d1b-ebb5-d8905fe0a3fd",
                    ],
                  },
                  value: "none",
                },
              },
              {
                id: "a-97-n-7",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    selector: ".mix.paragraph-category.tile-fixing",
                    selectorGuids: [
                      "0a6ae8d9-d8d7-f6be-9a7e-8be0e6b007a0",
                      "b71644b6-9e65-0e33-719d-3ea21aa97ef1",
                      "d7ccd647-fa77-2566-9fb2-e1810580809a",
                    ],
                  },
                  value: "none",
                },
              },
              {
                id: "a-97-n-8",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    selector: ".mix.paragraph-category.plasters",
                    selectorGuids: [
                      "0a6ae8d9-d8d7-f6be-9a7e-8be0e6b007a0",
                      "b71644b6-9e65-0e33-719d-3ea21aa97ef1",
                      "5ebc9fd5-3a87-b1df-97c0-fd66b4875747",
                    ],
                  },
                  value: "none",
                },
              },
            ],
          },
        ],
        useFirstGroupAsInitialState: false,
        createdOn: 1693242129115,
      },
      "a-98": {
        id: "a-98",
        title: "Category 08 disc. displayed",
        actionItemGroups: [
          {
            actionItems: [
              {
                id: "a-98-n",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    selector: ".mix.paragraph-category.concrete",
                    selectorGuids: [
                      "0a6ae8d9-d8d7-f6be-9a7e-8be0e6b007a0",
                      "b71644b6-9e65-0e33-719d-3ea21aa97ef1",
                      "5cd29165-2816-951a-cfcf-dfd61b8e7e4f",
                    ],
                  },
                  value: "none",
                },
              },
              {
                id: "a-98-n-2",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    selector: ".mix.paragraph-category.industrial-flooring",
                    selectorGuids: [
                      "0a6ae8d9-d8d7-f6be-9a7e-8be0e6b007a0",
                      "b71644b6-9e65-0e33-719d-3ea21aa97ef1",
                      "7b8f3617-28bd-9141-9012-220dc57e450f",
                    ],
                  },
                  value: "block",
                },
              },
              {
                id: "a-98-n-3",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    selector: ".mix.paragraph-category.expansion-joint",
                    selectorGuids: [
                      "0a6ae8d9-d8d7-f6be-9a7e-8be0e6b007a0",
                      "b71644b6-9e65-0e33-719d-3ea21aa97ef1",
                      "d32a99e8-c301-1857-1550-d26b9f9cf683",
                    ],
                  },
                  value: "none",
                },
              },
              {
                id: "a-98-n-4",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    selector: ".mix.paragraph-category.facade",
                    selectorGuids: [
                      "0a6ae8d9-d8d7-f6be-9a7e-8be0e6b007a0",
                      "b71644b6-9e65-0e33-719d-3ea21aa97ef1",
                      "ce0c212a-5a18-5e4c-75dd-31e5fe1e0577",
                    ],
                  },
                  value: "none",
                },
              },
              {
                id: "a-98-n-5",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    selector: ".mix.paragraph-category.waterproofing",
                    selectorGuids: [
                      "0a6ae8d9-d8d7-f6be-9a7e-8be0e6b007a0",
                      "b71644b6-9e65-0e33-719d-3ea21aa97ef1",
                      "531d439d-afa0-ef1c-fdc5-32d4bd9e412c",
                    ],
                  },
                  value: "none",
                },
              },
              {
                id: "a-98-n-6",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    selector: ".mix.paragraph-category.coatings",
                    selectorGuids: [
                      "0a6ae8d9-d8d7-f6be-9a7e-8be0e6b007a0",
                      "b71644b6-9e65-0e33-719d-3ea21aa97ef1",
                      "b952ebf0-1fc4-1d1b-ebb5-d8905fe0a3fd",
                    ],
                  },
                  value: "none",
                },
              },
              {
                id: "a-98-n-7",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    selector: ".mix.paragraph-category.tile-fixing",
                    selectorGuids: [
                      "0a6ae8d9-d8d7-f6be-9a7e-8be0e6b007a0",
                      "b71644b6-9e65-0e33-719d-3ea21aa97ef1",
                      "d7ccd647-fa77-2566-9fb2-e1810580809a",
                    ],
                  },
                  value: "none",
                },
              },
              {
                id: "a-98-n-8",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    selector: ".mix.paragraph-category.plasters",
                    selectorGuids: [
                      "0a6ae8d9-d8d7-f6be-9a7e-8be0e6b007a0",
                      "b71644b6-9e65-0e33-719d-3ea21aa97ef1",
                      "5ebc9fd5-3a87-b1df-97c0-fd66b4875747",
                    ],
                  },
                  value: "none",
                },
              },
            ],
          },
        ],
        useFirstGroupAsInitialState: false,
        createdOn: 1693242129115,
      },
      "a-99": {
        id: "a-99",
        title: "Category A disc. displayed",
        actionItemGroups: [
          {
            actionItems: [
              {
                id: "a-99-n",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    selector: ".mix.paragraph-category.repairs",
                    selectorGuids: [
                      "0a6ae8d9-d8d7-f6be-9a7e-8be0e6b007a0",
                      "b71644b6-9e65-0e33-719d-3ea21aa97ef1",
                      "f03177b0-20d6-ff95-9e3f-62b71950579e",
                    ],
                  },
                  value: "block",
                },
              },
              {
                id: "a-99-n-2",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    selector: ".mix.paragraph-category.waterproofing",
                    selectorGuids: [
                      "0a6ae8d9-d8d7-f6be-9a7e-8be0e6b007a0",
                      "b71644b6-9e65-0e33-719d-3ea21aa97ef1",
                      "531d439d-afa0-ef1c-fdc5-32d4bd9e412c",
                    ],
                  },
                  value: "none",
                },
              },
              {
                id: "a-99-n-3",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    selector: ".mix.paragraph-category.concrete-floor",
                    selectorGuids: [
                      "0a6ae8d9-d8d7-f6be-9a7e-8be0e6b007a0",
                      "b71644b6-9e65-0e33-719d-3ea21aa97ef1",
                      "347b2b3b-aaed-00e5-2359-d9871cec3f14",
                    ],
                  },
                  value: "none",
                },
              },
            ],
          },
        ],
        useFirstGroupAsInitialState: false,
        createdOn: 1693242129115,
      },
      "a-100": {
        id: "a-100",
        title: "Category C disc. displayed",
        actionItemGroups: [
          {
            actionItems: [
              {
                id: "a-100-n",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    selector: ".mix.paragraph-category.concrete-floor",
                    selectorGuids: [
                      "0a6ae8d9-d8d7-f6be-9a7e-8be0e6b007a0",
                      "b71644b6-9e65-0e33-719d-3ea21aa97ef1",
                      "347b2b3b-aaed-00e5-2359-d9871cec3f14",
                    ],
                  },
                  value: "block",
                },
              },
              {
                id: "a-100-n-2",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    selector: ".mix.paragraph-category.waterproofing",
                    selectorGuids: [
                      "0a6ae8d9-d8d7-f6be-9a7e-8be0e6b007a0",
                      "b71644b6-9e65-0e33-719d-3ea21aa97ef1",
                      "531d439d-afa0-ef1c-fdc5-32d4bd9e412c",
                    ],
                  },
                  value: "none",
                },
              },
              {
                id: "a-100-n-3",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    selector: ".mix.paragraph-category.repairs",
                    selectorGuids: [
                      "0a6ae8d9-d8d7-f6be-9a7e-8be0e6b007a0",
                      "b71644b6-9e65-0e33-719d-3ea21aa97ef1",
                      "f03177b0-20d6-ff95-9e3f-62b71950579e",
                    ],
                  },
                  value: "none",
                },
              },
            ],
          },
        ],
        useFirstGroupAsInitialState: false,
        createdOn: 1693242129115,
      },
      "a-101": {
        id: "a-101",
        title: "Category B disc. displayed",
        actionItemGroups: [
          {
            actionItems: [
              {
                id: "a-101-n",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    selector: ".mix.paragraph-category.waterproofing",
                    selectorGuids: [
                      "0a6ae8d9-d8d7-f6be-9a7e-8be0e6b007a0",
                      "b71644b6-9e65-0e33-719d-3ea21aa97ef1",
                      "531d439d-afa0-ef1c-fdc5-32d4bd9e412c",
                    ],
                  },
                  value: "block",
                },
              },
              {
                id: "a-101-n-2",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    selector: ".mix.paragraph-category.repairs",
                    selectorGuids: [
                      "0a6ae8d9-d8d7-f6be-9a7e-8be0e6b007a0",
                      "b71644b6-9e65-0e33-719d-3ea21aa97ef1",
                      "f03177b0-20d6-ff95-9e3f-62b71950579e",
                    ],
                  },
                  value: "none",
                },
              },
              {
                id: "a-101-n-3",
                actionTypeId: "GENERAL_DISPLAY",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    selector: ".mix.paragraph-category.concrete-floor",
                    selectorGuids: [
                      "0a6ae8d9-d8d7-f6be-9a7e-8be0e6b007a0",
                      "b71644b6-9e65-0e33-719d-3ea21aa97ef1",
                      "347b2b3b-aaed-00e5-2359-d9871cec3f14",
                    ],
                  },
                  value: "none",
                },
              },
            ],
          },
        ],
        useFirstGroupAsInitialState: false,
        createdOn: 1693242129115,
      },
      "a-102": {
        id: "a-102",
        title: "Marque Move 5",
        actionItemGroups: [
          {
            actionItems: [
              {
                id: "a-102-n",
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {
                    id: "64d30dd914d7241a1fdcb70a|37ac41f5-f73e-b9f6-f9cc-9f077294838e",
                  },
                  xValue: 0,
                  xUnit: "vw",
                  yUnit: "PX",
                  zUnit: "PX",
                },
              },
            ],
          },
          {
            actionItems: [
              {
                id: "a-102-n-2",
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 30000,
                  target: {
                    id: "64d30dd914d7241a1fdcb70a|37ac41f5-f73e-b9f6-f9cc-9f077294838e",
                  },
                  xValue: -204.5,
                  xUnit: "vw",
                  yUnit: "PX",
                  zUnit: "PX",
                },
              },
            ],
          },
          {
            actionItems: [
              {
                id: "a-102-n-3",
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    id: "64d30dd914d7241a1fdcb70a|37ac41f5-f73e-b9f6-f9cc-9f077294838e",
                  },
                  xValue: 0,
                  xUnit: "vw",
                  yUnit: "PX",
                  zUnit: "PX",
                },
              },
            ],
          },
        ],
        useFirstGroupAsInitialState: true,
        createdOn: 1691562090832,
      },
      "a-103": {
        id: "a-103",
        title: "Marque Move 6",
        actionItemGroups: [
          {
            actionItems: [
              {
                id: "a-103-n",
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {
                    id: "64d30dd914d7241a1fdcb70a|37ac41f5-f73e-b9f6-f9cc-9f077294838e",
                  },
                  xValue: 0,
                  xUnit: "vw",
                  yUnit: "PX",
                  zUnit: "PX",
                },
              },
            ],
          },
          {
            actionItems: [
              {
                id: "a-103-n-2",
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 30000,
                  target: {
                    id: "64d30dd914d7241a1fdcb70a|37ac41f5-f73e-b9f6-f9cc-9f077294838e",
                  },
                  xValue: -204.5,
                  xUnit: "vw",
                  yUnit: "PX",
                  zUnit: "PX",
                },
              },
            ],
          },
          {
            actionItems: [
              {
                id: "a-103-n-3",
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    id: "64d30dd914d7241a1fdcb70a|37ac41f5-f73e-b9f6-f9cc-9f077294838e",
                  },
                  xValue: 0,
                  xUnit: "vw",
                  yUnit: "PX",
                  zUnit: "PX",
                },
              },
            ],
          },
        ],
        useFirstGroupAsInitialState: true,
        createdOn: 1691562090832,
      },
      "a-104": {
        id: "a-104",
        title: "Marque Move 7",
        actionItemGroups: [
          {
            actionItems: [
              {
                id: "a-104-n",
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {
                    id: "64d30dd914d7241a1fdcb70a|37ac41f5-f73e-b9f6-f9cc-9f07729483b8",
                  },
                  xValue: 0,
                  xUnit: "vw",
                  yUnit: "PX",
                  zUnit: "PX",
                },
              },
            ],
          },
          {
            actionItems: [
              {
                id: "a-104-n-2",
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 30000,
                  target: {
                    id: "64d30dd914d7241a1fdcb70a|37ac41f5-f73e-b9f6-f9cc-9f07729483b8",
                  },
                  xValue: -204.5,
                  xUnit: "vw",
                  yUnit: "PX",
                  zUnit: "PX",
                },
              },
            ],
          },
          {
            actionItems: [
              {
                id: "a-104-n-3",
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    id: "64d30dd914d7241a1fdcb70a|37ac41f5-f73e-b9f6-f9cc-9f07729483b8",
                  },
                  xValue: 0,
                  xUnit: "vw",
                  yUnit: "PX",
                  zUnit: "PX",
                },
              },
            ],
          },
        ],
        useFirstGroupAsInitialState: true,
        createdOn: 1691562090832,
      },
      "a-105": {
        id: "a-105",
        title: "Marque Move 8",
        actionItemGroups: [
          {
            actionItems: [
              {
                id: "a-105-n",
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 500,
                  target: {
                    id: "64d30dd914d7241a1fdcb70a|37ac41f5-f73e-b9f6-f9cc-9f07729483da",
                  },
                  xValue: 0,
                  xUnit: "vw",
                  yUnit: "PX",
                  zUnit: "PX",
                },
              },
            ],
          },
          {
            actionItems: [
              {
                id: "a-105-n-2",
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 30000,
                  target: {
                    id: "64d30dd914d7241a1fdcb70a|37ac41f5-f73e-b9f6-f9cc-9f07729483da",
                  },
                  xValue: -204.5,
                  xUnit: "vw",
                  yUnit: "PX",
                  zUnit: "PX",
                },
              },
            ],
          },
          {
            actionItems: [
              {
                id: "a-105-n-3",
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 0,
                  easing: "",
                  duration: 0,
                  target: {
                    id: "64d30dd914d7241a1fdcb70a|37ac41f5-f73e-b9f6-f9cc-9f07729483da",
                  },
                  xValue: 0,
                  xUnit: "vw",
                  yUnit: "PX",
                  zUnit: "PX",
                },
              },
            ],
          },
        ],
        useFirstGroupAsInitialState: true,
        createdOn: 1691562090832,
      },
      slideInBottom: {
        id: "slideInBottom",
        useFirstGroupAsInitialState: true,
        actionItemGroups: [
          {
            actionItems: [
              {
                actionTypeId: "STYLE_OPACITY",
                config: {
                  delay: 0,
                  duration: 0,
                  target: {
                    id: "N/A",
                    appliesTo: "TRIGGER_ELEMENT",
                    useEventTarget: true,
                  },
                  value: 0,
                },
              },
            ],
          },
          {
            actionItems: [
              {
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 0,
                  duration: 0,
                  target: {
                    id: "N/A",
                    appliesTo: "TRIGGER_ELEMENT",
                    useEventTarget: true,
                  },
                  xValue: 0,
                  yValue: 100,
                  xUnit: "PX",
                  yUnit: "PX",
                  zUnit: "PX",
                },
              },
            ],
          },
          {
            actionItems: [
              {
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 0,
                  easing: "outQuart",
                  duration: 1000,
                  target: {
                    id: "N/A",
                    appliesTo: "TRIGGER_ELEMENT",
                    useEventTarget: true,
                  },
                  xValue: 0,
                  yValue: 0,
                  xUnit: "PX",
                  yUnit: "PX",
                  zUnit: "PX",
                },
              },
              {
                actionTypeId: "STYLE_OPACITY",
                config: {
                  delay: 0,
                  easing: "outQuart",
                  duration: 1000,
                  target: {
                    id: "N/A",
                    appliesTo: "TRIGGER_ELEMENT",
                    useEventTarget: true,
                  },
                  value: 1,
                },
              },
            ],
          },
        ],
      },
      fadeIn: {
        id: "fadeIn",
        useFirstGroupAsInitialState: true,
        actionItemGroups: [
          {
            actionItems: [
              {
                actionTypeId: "STYLE_OPACITY",
                config: {
                  delay: 0,
                  duration: 0,
                  target: {
                    id: "N/A",
                    appliesTo: "TRIGGER_ELEMENT",
                    useEventTarget: true,
                  },
                  value: 0,
                },
              },
            ],
          },
          {
            actionItems: [
              {
                actionTypeId: "STYLE_OPACITY",
                config: {
                  delay: 0,
                  easing: "outQuart",
                  duration: 1000,
                  target: {
                    id: "N/A",
                    appliesTo: "TRIGGER_ELEMENT",
                    useEventTarget: true,
                  },
                  value: 1,
                },
              },
            ],
          },
        ],
      },
      slideInLeft: {
        id: "slideInLeft",
        useFirstGroupAsInitialState: true,
        actionItemGroups: [
          {
            actionItems: [
              {
                actionTypeId: "STYLE_OPACITY",
                config: {
                  delay: 0,
                  duration: 0,
                  target: {
                    id: "N/A",
                    appliesTo: "TRIGGER_ELEMENT",
                    useEventTarget: true,
                  },
                  value: 0,
                },
              },
            ],
          },
          {
            actionItems: [
              {
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 0,
                  duration: 0,
                  target: {
                    id: "N/A",
                    appliesTo: "TRIGGER_ELEMENT",
                    useEventTarget: true,
                  },
                  xValue: -100,
                  yValue: 0,
                  xUnit: "PX",
                  yUnit: "PX",
                  zUnit: "PX",
                },
              },
            ],
          },
          {
            actionItems: [
              {
                actionTypeId: "STYLE_OPACITY",
                config: {
                  delay: 0,
                  easing: "outQuart",
                  duration: 1000,
                  target: {
                    id: "N/A",
                    appliesTo: "TRIGGER_ELEMENT",
                    useEventTarget: true,
                  },
                  value: 1,
                },
              },
              {
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 0,
                  easing: "outQuart",
                  duration: 1000,
                  target: {
                    id: "N/A",
                    appliesTo: "TRIGGER_ELEMENT",
                    useEventTarget: true,
                  },
                  xValue: 0,
                  yValue: 0,
                  xUnit: "PX",
                  yUnit: "PX",
                  zUnit: "PX",
                },
              },
            ],
          },
        ],
      },
      flipInLeft: {
        id: "flipInLeft",
        useFirstGroupAsInitialState: true,
        actionItemGroups: [
          {
            actionItems: [
              {
                actionTypeId: "STYLE_OPACITY",
                config: {
                  duration: 0,
                  delay: 0,
                  target: {
                    id: "N/A",
                    appliesTo: "TRIGGER_ELEMENT",
                    useEventTarget: true,
                  },
                  value: 0,
                },
              },
            ],
          },
          {
            actionItems: [
              {
                actionTypeId: "TRANSFORM_ROTATE",
                config: {
                  delay: 0,
                  duration: 0,
                  target: {
                    id: "N/A",
                    appliesTo: "TRIGGER_ELEMENT",
                    useEventTarget: true,
                  },
                  xValue: 0,
                  yValue: -90,
                  zValue: 0,
                  xUnit: "DEG",
                  yUnit: "DEG",
                  zUnit: "DEG",
                },
              },
            ],
          },
          {
            actionItems: [
              {
                actionTypeId: "TRANSFORM_ROTATE",
                config: {
                  delay: 0,
                  easing: "outQuart",
                  duration: 1000,
                  target: {
                    id: "N/A",
                    appliesTo: "TRIGGER_ELEMENT",
                    useEventTarget: true,
                  },
                  xValue: 0,
                  yValue: 0,
                  zValue: 0,
                  xUnit: "DEG",
                  yUnit: "DEG",
                  zUnit: "DEG",
                },
              },
              {
                actionTypeId: "STYLE_OPACITY",
                config: {
                  delay: 0,
                  easing: "outQuart",
                  duration: 1000,
                  target: {
                    id: "N/A",
                    appliesTo: "TRIGGER_ELEMENT",
                    useEventTarget: true,
                  },
                  value: 1,
                },
              },
            ],
          },
        ],
      },
      growIn: {
        id: "growIn",
        useFirstGroupAsInitialState: true,
        actionItemGroups: [
          {
            actionItems: [
              {
                actionTypeId: "STYLE_OPACITY",
                config: {
                  delay: 0,
                  duration: 0,
                  target: {
                    id: "N/A",
                    appliesTo: "TRIGGER_ELEMENT",
                    useEventTarget: true,
                  },
                  value: 0,
                },
              },
            ],
          },
          {
            actionItems: [
              {
                actionTypeId: "TRANSFORM_SCALE",
                config: {
                  delay: 0,
                  duration: 0,
                  target: {
                    id: "N/A",
                    appliesTo: "TRIGGER_ELEMENT",
                    useEventTarget: true,
                  },
                  xValue: 0.7500000000000001,
                  yValue: 0.7500000000000001,
                },
              },
            ],
          },
          {
            actionItems: [
              {
                actionTypeId: "TRANSFORM_SCALE",
                config: {
                  delay: 0,
                  easing: "outQuart",
                  duration: 1000,
                  target: {
                    id: "N/A",
                    appliesTo: "TRIGGER_ELEMENT",
                    useEventTarget: true,
                  },
                  xValue: 1,
                  yValue: 1,
                },
              },
              {
                actionTypeId: "STYLE_OPACITY",
                config: {
                  delay: 0,
                  easing: "outQuart",
                  duration: 1000,
                  target: {
                    id: "N/A",
                    appliesTo: "TRIGGER_ELEMENT",
                    useEventTarget: true,
                  },
                  value: 1,
                },
              },
            ],
          },
        ],
      },
      growBigIn: {
        id: "growBigIn",
        useFirstGroupAsInitialState: true,
        actionItemGroups: [
          {
            actionItems: [
              {
                actionTypeId: "STYLE_OPACITY",
                config: {
                  delay: 0,
                  duration: 0,
                  target: {
                    id: "N/A",
                    appliesTo: "TRIGGER_ELEMENT",
                    useEventTarget: true,
                  },
                  value: 0,
                },
              },
            ],
          },
          {
            actionItems: [
              {
                actionTypeId: "TRANSFORM_SCALE",
                config: {
                  delay: 0,
                  duration: 0,
                  target: {
                    id: "N/A",
                    appliesTo: "TRIGGER_ELEMENT",
                    useEventTarget: true,
                  },
                  xValue: 0,
                  yValue: 0,
                },
              },
            ],
          },
          {
            actionItems: [
              {
                actionTypeId: "TRANSFORM_SCALE",
                config: {
                  delay: 0,
                  easing: "outQuart",
                  duration: 1000,
                  target: {
                    id: "N/A",
                    appliesTo: "TRIGGER_ELEMENT",
                    useEventTarget: true,
                  },
                  xValue: 1,
                  yValue: 1,
                },
              },
              {
                actionTypeId: "STYLE_OPACITY",
                config: {
                  delay: 0,
                  easing: "outQuart",
                  duration: 1000,
                  target: {
                    id: "N/A",
                    appliesTo: "TRIGGER_ELEMENT",
                    useEventTarget: true,
                  },
                  value: 1,
                },
              },
            ],
          },
        ],
      },
      slideInRight: {
        id: "slideInRight",
        useFirstGroupAsInitialState: true,
        actionItemGroups: [
          {
            actionItems: [
              {
                actionTypeId: "STYLE_OPACITY",
                config: {
                  delay: 0,
                  duration: 0,
                  target: {
                    id: "N/A",
                    appliesTo: "TRIGGER_ELEMENT",
                    useEventTarget: true,
                  },
                  value: 0,
                },
              },
            ],
          },
          {
            actionItems: [
              {
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 0,
                  duration: 0,
                  target: {
                    id: "N/A",
                    appliesTo: "TRIGGER_ELEMENT",
                    useEventTarget: true,
                  },
                  xValue: 100,
                  yValue: 0,
                  xUnit: "PX",
                  yUnit: "PX",
                  zUnit: "PX",
                },
              },
            ],
          },
          {
            actionItems: [
              {
                actionTypeId: "STYLE_OPACITY",
                config: {
                  delay: 0,
                  easing: "outQuart",
                  duration: 1000,
                  target: {
                    id: "N/A",
                    appliesTo: "TRIGGER_ELEMENT",
                    useEventTarget: true,
                  },
                  value: 1,
                },
              },
              {
                actionTypeId: "TRANSFORM_MOVE",
                config: {
                  delay: 0,
                  easing: "outQuart",
                  duration: 1000,
                  target: {
                    id: "N/A",
                    appliesTo: "TRIGGER_ELEMENT",
                    useEventTarget: true,
                  },
                  xValue: 0,
                  yValue: 0,
                  xUnit: "PX",
                  yUnit: "PX",
                  zUnit: "PX",
                },
              },
            ],
          },
        ],
      },
    },
    site: {
      mediaQueries: [
        { key: "main", min: 992, max: 10000 },
        { key: "medium", min: 768, max: 991 },
        { key: "small", min: 480, max: 767 },
        { key: "tiny", min: 0, max: 479 },
      ],
    },
  });
  