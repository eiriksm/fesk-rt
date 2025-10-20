var fE = { exports: {} }, Xp = {}, dE = { exports: {} }, ht = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var qR;
function W_() {
  if (qR) return ht;
  qR = 1;
  var J = Symbol.for("react.element"), W = Symbol.for("react.portal"), z = Symbol.for("react.fragment"), ct = Symbol.for("react.strict_mode"), Ct = Symbol.for("react.profiler"), Rt = Symbol.for("react.provider"), S = Symbol.for("react.context"), Vt = Symbol.for("react.forward_ref"), de = Symbol.for("react.suspense"), ve = Symbol.for("react.memo"), lt = Symbol.for("react.lazy"), ee = Symbol.iterator;
  function Ce(_) {
    return _ === null || typeof _ != "object" ? null : (_ = ee && _[ee] || _["@@iterator"], typeof _ == "function" ? _ : null);
  }
  var ue = { isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, Ye = Object.assign, mt = {};
  function dt(_, P, je) {
    this.props = _, this.context = P, this.refs = mt, this.updater = je || ue;
  }
  dt.prototype.isReactComponent = {}, dt.prototype.setState = function(_, P) {
    if (typeof _ != "object" && typeof _ != "function" && _ != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, _, P, "setState");
  }, dt.prototype.forceUpdate = function(_) {
    this.updater.enqueueForceUpdate(this, _, "forceUpdate");
  };
  function cn() {
  }
  cn.prototype = dt.prototype;
  function ft(_, P, je) {
    this.props = _, this.context = P, this.refs = mt, this.updater = je || ue;
  }
  var Ie = ft.prototype = new cn();
  Ie.constructor = ft, Ye(Ie, dt.prototype), Ie.isPureReactComponent = !0;
  var pt = Array.isArray, be = Object.prototype.hasOwnProperty, ut = { current: null }, Fe = { key: !0, ref: !0, __self: !0, __source: !0 };
  function rn(_, P, je) {
    var Ue, nt = {}, Ze = null, Xe = null;
    if (P != null) for (Ue in P.ref !== void 0 && (Xe = P.ref), P.key !== void 0 && (Ze = "" + P.key), P) be.call(P, Ue) && !Fe.hasOwnProperty(Ue) && (nt[Ue] = P[Ue]);
    var Je = arguments.length - 2;
    if (Je === 1) nt.children = je;
    else if (1 < Je) {
      for (var rt = Array(Je), Pt = 0; Pt < Je; Pt++) rt[Pt] = arguments[Pt + 2];
      nt.children = rt;
    }
    if (_ && _.defaultProps) for (Ue in Je = _.defaultProps, Je) nt[Ue] === void 0 && (nt[Ue] = Je[Ue]);
    return { $$typeof: J, type: _, key: Ze, ref: Xe, props: nt, _owner: ut.current };
  }
  function Ft(_, P) {
    return { $$typeof: J, type: _.type, key: P, ref: _.ref, props: _.props, _owner: _._owner };
  }
  function Kt(_) {
    return typeof _ == "object" && _ !== null && _.$$typeof === J;
  }
  function an(_) {
    var P = { "=": "=0", ":": "=2" };
    return "$" + _.replace(/[=:]/g, function(je) {
      return P[je];
    });
  }
  var xt = /\/+/g;
  function ke(_, P) {
    return typeof _ == "object" && _ !== null && _.key != null ? an("" + _.key) : P.toString(36);
  }
  function Ut(_, P, je, Ue, nt) {
    var Ze = typeof _;
    (Ze === "undefined" || Ze === "boolean") && (_ = null);
    var Xe = !1;
    if (_ === null) Xe = !0;
    else switch (Ze) {
      case "string":
      case "number":
        Xe = !0;
        break;
      case "object":
        switch (_.$$typeof) {
          case J:
          case W:
            Xe = !0;
        }
    }
    if (Xe) return Xe = _, nt = nt(Xe), _ = Ue === "" ? "." + ke(Xe, 0) : Ue, pt(nt) ? (je = "", _ != null && (je = _.replace(xt, "$&/") + "/"), Ut(nt, P, je, "", function(Pt) {
      return Pt;
    })) : nt != null && (Kt(nt) && (nt = Ft(nt, je + (!nt.key || Xe && Xe.key === nt.key ? "" : ("" + nt.key).replace(xt, "$&/") + "/") + _)), P.push(nt)), 1;
    if (Xe = 0, Ue = Ue === "" ? "." : Ue + ":", pt(_)) for (var Je = 0; Je < _.length; Je++) {
      Ze = _[Je];
      var rt = Ue + ke(Ze, Je);
      Xe += Ut(Ze, P, je, rt, nt);
    }
    else if (rt = Ce(_), typeof rt == "function") for (_ = rt.call(_), Je = 0; !(Ze = _.next()).done; ) Ze = Ze.value, rt = Ue + ke(Ze, Je++), Xe += Ut(Ze, P, je, rt, nt);
    else if (Ze === "object") throw P = String(_), Error("Objects are not valid as a React child (found: " + (P === "[object Object]" ? "object with keys {" + Object.keys(_).join(", ") + "}" : P) + "). If you meant to render a collection of children, use an array instead.");
    return Xe;
  }
  function bt(_, P, je) {
    if (_ == null) return _;
    var Ue = [], nt = 0;
    return Ut(_, Ue, "", "", function(Ze) {
      return P.call(je, Ze, nt++);
    }), Ue;
  }
  function Dt(_) {
    if (_._status === -1) {
      var P = _._result;
      P = P(), P.then(function(je) {
        (_._status === 0 || _._status === -1) && (_._status = 1, _._result = je);
      }, function(je) {
        (_._status === 0 || _._status === -1) && (_._status = 2, _._result = je);
      }), _._status === -1 && (_._status = 0, _._result = P);
    }
    if (_._status === 1) return _._result.default;
    throw _._result;
  }
  var Ee = { current: null }, K = { transition: null }, Re = { ReactCurrentDispatcher: Ee, ReactCurrentBatchConfig: K, ReactCurrentOwner: ut };
  function ne() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return ht.Children = { map: bt, forEach: function(_, P, je) {
    bt(_, function() {
      P.apply(this, arguments);
    }, je);
  }, count: function(_) {
    var P = 0;
    return bt(_, function() {
      P++;
    }), P;
  }, toArray: function(_) {
    return bt(_, function(P) {
      return P;
    }) || [];
  }, only: function(_) {
    if (!Kt(_)) throw Error("React.Children.only expected to receive a single React element child.");
    return _;
  } }, ht.Component = dt, ht.Fragment = z, ht.Profiler = Ct, ht.PureComponent = ft, ht.StrictMode = ct, ht.Suspense = de, ht.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Re, ht.act = ne, ht.cloneElement = function(_, P, je) {
    if (_ == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + _ + ".");
    var Ue = Ye({}, _.props), nt = _.key, Ze = _.ref, Xe = _._owner;
    if (P != null) {
      if (P.ref !== void 0 && (Ze = P.ref, Xe = ut.current), P.key !== void 0 && (nt = "" + P.key), _.type && _.type.defaultProps) var Je = _.type.defaultProps;
      for (rt in P) be.call(P, rt) && !Fe.hasOwnProperty(rt) && (Ue[rt] = P[rt] === void 0 && Je !== void 0 ? Je[rt] : P[rt]);
    }
    var rt = arguments.length - 2;
    if (rt === 1) Ue.children = je;
    else if (1 < rt) {
      Je = Array(rt);
      for (var Pt = 0; Pt < rt; Pt++) Je[Pt] = arguments[Pt + 2];
      Ue.children = Je;
    }
    return { $$typeof: J, type: _.type, key: nt, ref: Ze, props: Ue, _owner: Xe };
  }, ht.createContext = function(_) {
    return _ = { $$typeof: S, _currentValue: _, _currentValue2: _, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, _.Provider = { $$typeof: Rt, _context: _ }, _.Consumer = _;
  }, ht.createElement = rn, ht.createFactory = function(_) {
    var P = rn.bind(null, _);
    return P.type = _, P;
  }, ht.createRef = function() {
    return { current: null };
  }, ht.forwardRef = function(_) {
    return { $$typeof: Vt, render: _ };
  }, ht.isValidElement = Kt, ht.lazy = function(_) {
    return { $$typeof: lt, _payload: { _status: -1, _result: _ }, _init: Dt };
  }, ht.memo = function(_, P) {
    return { $$typeof: ve, type: _, compare: P === void 0 ? null : P };
  }, ht.startTransition = function(_) {
    var P = K.transition;
    K.transition = {};
    try {
      _();
    } finally {
      K.transition = P;
    }
  }, ht.unstable_act = ne, ht.useCallback = function(_, P) {
    return Ee.current.useCallback(_, P);
  }, ht.useContext = function(_) {
    return Ee.current.useContext(_);
  }, ht.useDebugValue = function() {
  }, ht.useDeferredValue = function(_) {
    return Ee.current.useDeferredValue(_);
  }, ht.useEffect = function(_, P) {
    return Ee.current.useEffect(_, P);
  }, ht.useId = function() {
    return Ee.current.useId();
  }, ht.useImperativeHandle = function(_, P, je) {
    return Ee.current.useImperativeHandle(_, P, je);
  }, ht.useInsertionEffect = function(_, P) {
    return Ee.current.useInsertionEffect(_, P);
  }, ht.useLayoutEffect = function(_, P) {
    return Ee.current.useLayoutEffect(_, P);
  }, ht.useMemo = function(_, P) {
    return Ee.current.useMemo(_, P);
  }, ht.useReducer = function(_, P, je) {
    return Ee.current.useReducer(_, P, je);
  }, ht.useRef = function(_) {
    return Ee.current.useRef(_);
  }, ht.useState = function(_) {
    return Ee.current.useState(_);
  }, ht.useSyncExternalStore = function(_, P, je) {
    return Ee.current.useSyncExternalStore(_, P, je);
  }, ht.useTransition = function() {
    return Ee.current.useTransition();
  }, ht.version = "18.3.1", ht;
}
var Zp = { exports: {} };
/**
 * @license React
 * react.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Zp.exports;
var XR;
function G_() {
  return XR || (XR = 1, function(J, W) {
    process.env.NODE_ENV !== "production" && function() {
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
      var z = "18.3.1", ct = Symbol.for("react.element"), Ct = Symbol.for("react.portal"), Rt = Symbol.for("react.fragment"), S = Symbol.for("react.strict_mode"), Vt = Symbol.for("react.profiler"), de = Symbol.for("react.provider"), ve = Symbol.for("react.context"), lt = Symbol.for("react.forward_ref"), ee = Symbol.for("react.suspense"), Ce = Symbol.for("react.suspense_list"), ue = Symbol.for("react.memo"), Ye = Symbol.for("react.lazy"), mt = Symbol.for("react.offscreen"), dt = Symbol.iterator, cn = "@@iterator";
      function ft(h) {
        if (h === null || typeof h != "object")
          return null;
        var C = dt && h[dt] || h[cn];
        return typeof C == "function" ? C : null;
      }
      var Ie = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      }, pt = {
        transition: null
      }, be = {
        current: null,
        // Used to reproduce behavior of `batchedUpdates` in legacy mode.
        isBatchingLegacy: !1,
        didScheduleLegacyUpdate: !1
      }, ut = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      }, Fe = {}, rn = null;
      function Ft(h) {
        rn = h;
      }
      Fe.setExtraStackFrame = function(h) {
        rn = h;
      }, Fe.getCurrentStack = null, Fe.getStackAddendum = function() {
        var h = "";
        rn && (h += rn);
        var C = Fe.getCurrentStack;
        return C && (h += C() || ""), h;
      };
      var Kt = !1, an = !1, xt = !1, ke = !1, Ut = !1, bt = {
        ReactCurrentDispatcher: Ie,
        ReactCurrentBatchConfig: pt,
        ReactCurrentOwner: ut
      };
      bt.ReactDebugCurrentFrame = Fe, bt.ReactCurrentActQueue = be;
      function Dt(h) {
        {
          for (var C = arguments.length, N = new Array(C > 1 ? C - 1 : 0), F = 1; F < C; F++)
            N[F - 1] = arguments[F];
          K("warn", h, N);
        }
      }
      function Ee(h) {
        {
          for (var C = arguments.length, N = new Array(C > 1 ? C - 1 : 0), F = 1; F < C; F++)
            N[F - 1] = arguments[F];
          K("error", h, N);
        }
      }
      function K(h, C, N) {
        {
          var F = bt.ReactDebugCurrentFrame, X = F.getStackAddendum();
          X !== "" && (C += "%s", N = N.concat([X]));
          var Oe = N.map(function(re) {
            return String(re);
          });
          Oe.unshift("Warning: " + C), Function.prototype.apply.call(console[h], console, Oe);
        }
      }
      var Re = {};
      function ne(h, C) {
        {
          var N = h.constructor, F = N && (N.displayName || N.name) || "ReactClass", X = F + "." + C;
          if (Re[X])
            return;
          Ee("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", C, F), Re[X] = !0;
        }
      }
      var _ = {
        /**
         * Checks whether or not this composite component is mounted.
         * @param {ReactClass} publicInstance The instance we want to test.
         * @return {boolean} True if mounted, false otherwise.
         * @protected
         * @final
         */
        isMounted: function(h) {
          return !1;
        },
        /**
         * Forces an update. This should only be invoked when it is known with
         * certainty that we are **not** in a DOM transaction.
         *
         * You may want to call this when you know that some deeper aspect of the
         * component's state has changed but `setState` was not called.
         *
         * This will not invoke `shouldComponentUpdate`, but it will invoke
         * `componentWillUpdate` and `componentDidUpdate`.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {?function} callback Called after component is updated.
         * @param {?string} callerName name of the calling function in the public API.
         * @internal
         */
        enqueueForceUpdate: function(h, C, N) {
          ne(h, "forceUpdate");
        },
        /**
         * Replaces all of the state. Always use this or `setState` to mutate state.
         * You should treat `this.state` as immutable.
         *
         * There is no guarantee that `this.state` will be immediately updated, so
         * accessing `this.state` after calling this method may return the old value.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {object} completeState Next state.
         * @param {?function} callback Called after component is updated.
         * @param {?string} callerName name of the calling function in the public API.
         * @internal
         */
        enqueueReplaceState: function(h, C, N, F) {
          ne(h, "replaceState");
        },
        /**
         * Sets a subset of the state. This only exists because _pendingState is
         * internal. This provides a merging strategy that is not available to deep
         * properties which is confusing. TODO: Expose pendingState or don't use it
         * during the merge.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {object} partialState Next partial state to be merged with state.
         * @param {?function} callback Called after component is updated.
         * @param {?string} Name of the calling function in the public API.
         * @internal
         */
        enqueueSetState: function(h, C, N, F) {
          ne(h, "setState");
        }
      }, P = Object.assign, je = {};
      Object.freeze(je);
      function Ue(h, C, N) {
        this.props = h, this.context = C, this.refs = je, this.updater = N || _;
      }
      Ue.prototype.isReactComponent = {}, Ue.prototype.setState = function(h, C) {
        if (typeof h != "object" && typeof h != "function" && h != null)
          throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
        this.updater.enqueueSetState(this, h, C, "setState");
      }, Ue.prototype.forceUpdate = function(h) {
        this.updater.enqueueForceUpdate(this, h, "forceUpdate");
      };
      {
        var nt = {
          isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
          replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
        }, Ze = function(h, C) {
          Object.defineProperty(Ue.prototype, h, {
            get: function() {
              Dt("%s(...) is deprecated in plain JavaScript React classes. %s", C[0], C[1]);
            }
          });
        };
        for (var Xe in nt)
          nt.hasOwnProperty(Xe) && Ze(Xe, nt[Xe]);
      }
      function Je() {
      }
      Je.prototype = Ue.prototype;
      function rt(h, C, N) {
        this.props = h, this.context = C, this.refs = je, this.updater = N || _;
      }
      var Pt = rt.prototype = new Je();
      Pt.constructor = rt, P(Pt, Ue.prototype), Pt.isPureReactComponent = !0;
      function kn() {
        var h = {
          current: null
        };
        return Object.seal(h), h;
      }
      var wr = Array.isArray;
      function En(h) {
        return wr(h);
      }
      function tr(h) {
        {
          var C = typeof Symbol == "function" && Symbol.toStringTag, N = C && h[Symbol.toStringTag] || h.constructor.name || "Object";
          return N;
        }
      }
      function Pn(h) {
        try {
          return Vn(h), !1;
        } catch {
          return !0;
        }
      }
      function Vn(h) {
        return "" + h;
      }
      function $r(h) {
        if (Pn(h))
          return Ee("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", tr(h)), Vn(h);
      }
      function si(h, C, N) {
        var F = h.displayName;
        if (F)
          return F;
        var X = C.displayName || C.name || "";
        return X !== "" ? N + "(" + X + ")" : N;
      }
      function oa(h) {
        return h.displayName || "Context";
      }
      function Gn(h) {
        if (h == null)
          return null;
        if (typeof h.tag == "number" && Ee("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof h == "function")
          return h.displayName || h.name || null;
        if (typeof h == "string")
          return h;
        switch (h) {
          case Rt:
            return "Fragment";
          case Ct:
            return "Portal";
          case Vt:
            return "Profiler";
          case S:
            return "StrictMode";
          case ee:
            return "Suspense";
          case Ce:
            return "SuspenseList";
        }
        if (typeof h == "object")
          switch (h.$$typeof) {
            case ve:
              var C = h;
              return oa(C) + ".Consumer";
            case de:
              var N = h;
              return oa(N._context) + ".Provider";
            case lt:
              return si(h, h.render, "ForwardRef");
            case ue:
              var F = h.displayName || null;
              return F !== null ? F : Gn(h.type) || "Memo";
            case Ye: {
              var X = h, Oe = X._payload, re = X._init;
              try {
                return Gn(re(Oe));
              } catch {
                return null;
              }
            }
          }
        return null;
      }
      var Cn = Object.prototype.hasOwnProperty, Bn = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
      }, yr, Ya, On;
      On = {};
      function gr(h) {
        if (Cn.call(h, "ref")) {
          var C = Object.getOwnPropertyDescriptor(h, "ref").get;
          if (C && C.isReactWarning)
            return !1;
        }
        return h.ref !== void 0;
      }
      function sa(h) {
        if (Cn.call(h, "key")) {
          var C = Object.getOwnPropertyDescriptor(h, "key").get;
          if (C && C.isReactWarning)
            return !1;
        }
        return h.key !== void 0;
      }
      function Ia(h, C) {
        var N = function() {
          yr || (yr = !0, Ee("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", C));
        };
        N.isReactWarning = !0, Object.defineProperty(h, "key", {
          get: N,
          configurable: !0
        });
      }
      function ci(h, C) {
        var N = function() {
          Ya || (Ya = !0, Ee("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", C));
        };
        N.isReactWarning = !0, Object.defineProperty(h, "ref", {
          get: N,
          configurable: !0
        });
      }
      function Z(h) {
        if (typeof h.ref == "string" && ut.current && h.__self && ut.current.stateNode !== h.__self) {
          var C = Gn(ut.current.type);
          On[C] || (Ee('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', C, h.ref), On[C] = !0);
        }
      }
      var Te = function(h, C, N, F, X, Oe, re) {
        var Ne = {
          // This tag allows us to uniquely identify this as a React Element
          $$typeof: ct,
          // Built-in properties that belong on the element
          type: h,
          key: C,
          ref: N,
          props: re,
          // Record the component responsible for creating this element.
          _owner: Oe
        };
        return Ne._store = {}, Object.defineProperty(Ne._store, "validated", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: !1
        }), Object.defineProperty(Ne, "_self", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: F
        }), Object.defineProperty(Ne, "_source", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: X
        }), Object.freeze && (Object.freeze(Ne.props), Object.freeze(Ne)), Ne;
      };
      function et(h, C, N) {
        var F, X = {}, Oe = null, re = null, Ne = null, st = null;
        if (C != null) {
          gr(C) && (re = C.ref, Z(C)), sa(C) && ($r(C.key), Oe = "" + C.key), Ne = C.__self === void 0 ? null : C.__self, st = C.__source === void 0 ? null : C.__source;
          for (F in C)
            Cn.call(C, F) && !Bn.hasOwnProperty(F) && (X[F] = C[F]);
        }
        var wt = arguments.length - 2;
        if (wt === 1)
          X.children = N;
        else if (wt > 1) {
          for (var tn = Array(wt), It = 0; It < wt; It++)
            tn[It] = arguments[It + 2];
          Object.freeze && Object.freeze(tn), X.children = tn;
        }
        if (h && h.defaultProps) {
          var tt = h.defaultProps;
          for (F in tt)
            X[F] === void 0 && (X[F] = tt[F]);
        }
        if (Oe || re) {
          var Qt = typeof h == "function" ? h.displayName || h.name || "Unknown" : h;
          Oe && Ia(X, Qt), re && ci(X, Qt);
        }
        return Te(h, Oe, re, Ne, st, ut.current, X);
      }
      function At(h, C) {
        var N = Te(h.type, C, h.ref, h._self, h._source, h._owner, h.props);
        return N;
      }
      function Zt(h, C, N) {
        if (h == null)
          throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + h + ".");
        var F, X = P({}, h.props), Oe = h.key, re = h.ref, Ne = h._self, st = h._source, wt = h._owner;
        if (C != null) {
          gr(C) && (re = C.ref, wt = ut.current), sa(C) && ($r(C.key), Oe = "" + C.key);
          var tn;
          h.type && h.type.defaultProps && (tn = h.type.defaultProps);
          for (F in C)
            Cn.call(C, F) && !Bn.hasOwnProperty(F) && (C[F] === void 0 && tn !== void 0 ? X[F] = tn[F] : X[F] = C[F]);
        }
        var It = arguments.length - 2;
        if (It === 1)
          X.children = N;
        else if (It > 1) {
          for (var tt = Array(It), Qt = 0; Qt < It; Qt++)
            tt[Qt] = arguments[Qt + 2];
          X.children = tt;
        }
        return Te(h.type, Oe, re, Ne, st, wt, X);
      }
      function pn(h) {
        return typeof h == "object" && h !== null && h.$$typeof === ct;
      }
      var ln = ".", qn = ":";
      function Jt(h) {
        var C = /[=:]/g, N = {
          "=": "=0",
          ":": "=2"
        }, F = h.replace(C, function(X) {
          return N[X];
        });
        return "$" + F;
      }
      var Bt = !1, $t = /\/+/g;
      function ca(h) {
        return h.replace($t, "$&/");
      }
      function Sr(h, C) {
        return typeof h == "object" && h !== null && h.key != null ? ($r(h.key), Jt("" + h.key)) : C.toString(36);
      }
      function Ta(h, C, N, F, X) {
        var Oe = typeof h;
        (Oe === "undefined" || Oe === "boolean") && (h = null);
        var re = !1;
        if (h === null)
          re = !0;
        else
          switch (Oe) {
            case "string":
            case "number":
              re = !0;
              break;
            case "object":
              switch (h.$$typeof) {
                case ct:
                case Ct:
                  re = !0;
              }
          }
        if (re) {
          var Ne = h, st = X(Ne), wt = F === "" ? ln + Sr(Ne, 0) : F;
          if (En(st)) {
            var tn = "";
            wt != null && (tn = ca(wt) + "/"), Ta(st, C, tn, "", function(Gf) {
              return Gf;
            });
          } else st != null && (pn(st) && (st.key && (!Ne || Ne.key !== st.key) && $r(st.key), st = At(
            st,
            // Keep both the (mapped) and old keys if they differ, just as
            // traverseAllChildren used to do for objects as children
            N + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
            (st.key && (!Ne || Ne.key !== st.key) ? (
              // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
              // eslint-disable-next-line react-internal/safe-string-coercion
              ca("" + st.key) + "/"
            ) : "") + wt
          )), C.push(st));
          return 1;
        }
        var It, tt, Qt = 0, vn = F === "" ? ln : F + qn;
        if (En(h))
          for (var Cl = 0; Cl < h.length; Cl++)
            It = h[Cl], tt = vn + Sr(It, Cl), Qt += Ta(It, C, N, tt, X);
        else {
          var Go = ft(h);
          if (typeof Go == "function") {
            var Vi = h;
            Go === Vi.entries && (Bt || Dt("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), Bt = !0);
            for (var qo = Go.call(Vi), uu, Wf = 0; !(uu = qo.next()).done; )
              It = uu.value, tt = vn + Sr(It, Wf++), Qt += Ta(It, C, N, tt, X);
          } else if (Oe === "object") {
            var uc = String(h);
            throw new Error("Objects are not valid as a React child (found: " + (uc === "[object Object]" ? "object with keys {" + Object.keys(h).join(", ") + "}" : uc) + "). If you meant to render a collection of children, use an array instead.");
          }
        }
        return Qt;
      }
      function ji(h, C, N) {
        if (h == null)
          return h;
        var F = [], X = 0;
        return Ta(h, F, "", "", function(Oe) {
          return C.call(N, Oe, X++);
        }), F;
      }
      function Zl(h) {
        var C = 0;
        return ji(h, function() {
          C++;
        }), C;
      }
      function Jl(h, C, N) {
        ji(h, function() {
          C.apply(this, arguments);
        }, N);
      }
      function dl(h) {
        return ji(h, function(C) {
          return C;
        }) || [];
      }
      function pl(h) {
        if (!pn(h))
          throw new Error("React.Children.only expected to receive a single React element child.");
        return h;
      }
      function eu(h) {
        var C = {
          $$typeof: ve,
          // As a workaround to support multiple concurrent renderers, we categorize
          // some renderers as primary and others as secondary. We only expect
          // there to be two concurrent renderers at most: React Native (primary) and
          // Fabric (secondary); React DOM (primary) and React ART (secondary).
          // Secondary renderers store their context values on separate fields.
          _currentValue: h,
          _currentValue2: h,
          // Used to track how many concurrent renderers this context currently
          // supports within in a single renderer. Such as parallel server rendering.
          _threadCount: 0,
          // These are circular
          Provider: null,
          Consumer: null,
          // Add these to use same hidden class in VM as ServerContext
          _defaultValue: null,
          _globalName: null
        };
        C.Provider = {
          $$typeof: de,
          _context: C
        };
        var N = !1, F = !1, X = !1;
        {
          var Oe = {
            $$typeof: ve,
            _context: C
          };
          Object.defineProperties(Oe, {
            Provider: {
              get: function() {
                return F || (F = !0, Ee("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?")), C.Provider;
              },
              set: function(re) {
                C.Provider = re;
              }
            },
            _currentValue: {
              get: function() {
                return C._currentValue;
              },
              set: function(re) {
                C._currentValue = re;
              }
            },
            _currentValue2: {
              get: function() {
                return C._currentValue2;
              },
              set: function(re) {
                C._currentValue2 = re;
              }
            },
            _threadCount: {
              get: function() {
                return C._threadCount;
              },
              set: function(re) {
                C._threadCount = re;
              }
            },
            Consumer: {
              get: function() {
                return N || (N = !0, Ee("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?")), C.Consumer;
              }
            },
            displayName: {
              get: function() {
                return C.displayName;
              },
              set: function(re) {
                X || (Dt("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", re), X = !0);
              }
            }
          }), C.Consumer = Oe;
        }
        return C._currentRenderer = null, C._currentRenderer2 = null, C;
      }
      var xr = -1, br = 0, nr = 1, fi = 2;
      function Qa(h) {
        if (h._status === xr) {
          var C = h._result, N = C();
          if (N.then(function(Oe) {
            if (h._status === br || h._status === xr) {
              var re = h;
              re._status = nr, re._result = Oe;
            }
          }, function(Oe) {
            if (h._status === br || h._status === xr) {
              var re = h;
              re._status = fi, re._result = Oe;
            }
          }), h._status === xr) {
            var F = h;
            F._status = br, F._result = N;
          }
        }
        if (h._status === nr) {
          var X = h._result;
          return X === void 0 && Ee(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`, X), "default" in X || Ee(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`, X), X.default;
        } else
          throw h._result;
      }
      function di(h) {
        var C = {
          // We use these fields to store the result.
          _status: xr,
          _result: h
        }, N = {
          $$typeof: Ye,
          _payload: C,
          _init: Qa
        };
        {
          var F, X;
          Object.defineProperties(N, {
            defaultProps: {
              configurable: !0,
              get: function() {
                return F;
              },
              set: function(Oe) {
                Ee("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), F = Oe, Object.defineProperty(N, "defaultProps", {
                  enumerable: !0
                });
              }
            },
            propTypes: {
              configurable: !0,
              get: function() {
                return X;
              },
              set: function(Oe) {
                Ee("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), X = Oe, Object.defineProperty(N, "propTypes", {
                  enumerable: !0
                });
              }
            }
          });
        }
        return N;
      }
      function pi(h) {
        h != null && h.$$typeof === ue ? Ee("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : typeof h != "function" ? Ee("forwardRef requires a render function but was given %s.", h === null ? "null" : typeof h) : h.length !== 0 && h.length !== 2 && Ee("forwardRef render functions accept exactly two parameters: props and ref. %s", h.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."), h != null && (h.defaultProps != null || h.propTypes != null) && Ee("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
        var C = {
          $$typeof: lt,
          render: h
        };
        {
          var N;
          Object.defineProperty(C, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
              return N;
            },
            set: function(F) {
              N = F, !h.name && !h.displayName && (h.displayName = F);
            }
          });
        }
        return C;
      }
      var R;
      R = Symbol.for("react.module.reference");
      function B(h) {
        return !!(typeof h == "string" || typeof h == "function" || h === Rt || h === Vt || Ut || h === S || h === ee || h === Ce || ke || h === mt || Kt || an || xt || typeof h == "object" && h !== null && (h.$$typeof === Ye || h.$$typeof === ue || h.$$typeof === de || h.$$typeof === ve || h.$$typeof === lt || // This needs to include all possible module reference object
        // types supported by any Flight configuration anywhere since
        // we don't know which Flight build this will end up being used
        // with.
        h.$$typeof === R || h.getModuleId !== void 0));
      }
      function ae(h, C) {
        B(h) || Ee("memo: The first argument must be a component. Instead received: %s", h === null ? "null" : typeof h);
        var N = {
          $$typeof: ue,
          type: h,
          compare: C === void 0 ? null : C
        };
        {
          var F;
          Object.defineProperty(N, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
              return F;
            },
            set: function(X) {
              F = X, !h.name && !h.displayName && (h.displayName = X);
            }
          });
        }
        return N;
      }
      function he() {
        var h = Ie.current;
        return h === null && Ee(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`), h;
      }
      function We(h) {
        var C = he();
        if (h._context !== void 0) {
          var N = h._context;
          N.Consumer === h ? Ee("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?") : N.Provider === h && Ee("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
        }
        return C.useContext(h);
      }
      function Be(h) {
        var C = he();
        return C.useState(h);
      }
      function ot(h, C, N) {
        var F = he();
        return F.useReducer(h, C, N);
      }
      function at(h) {
        var C = he();
        return C.useRef(h);
      }
      function Rn(h, C) {
        var N = he();
        return N.useEffect(h, C);
      }
      function en(h, C) {
        var N = he();
        return N.useInsertionEffect(h, C);
      }
      function un(h, C) {
        var N = he();
        return N.useLayoutEffect(h, C);
      }
      function rr(h, C) {
        var N = he();
        return N.useCallback(h, C);
      }
      function Wa(h, C) {
        var N = he();
        return N.useMemo(h, C);
      }
      function Ga(h, C, N) {
        var F = he();
        return F.useImperativeHandle(h, C, N);
      }
      function Ge(h, C) {
        {
          var N = he();
          return N.useDebugValue(h, C);
        }
      }
      function Ke() {
        var h = he();
        return h.useTransition();
      }
      function qa(h) {
        var C = he();
        return C.useDeferredValue(h);
      }
      function tu() {
        var h = he();
        return h.useId();
      }
      function nu(h, C, N) {
        var F = he();
        return F.useSyncExternalStore(h, C, N);
      }
      var vl = 0, Qu, hl, Yr, Yo, _r, ic, lc;
      function Wu() {
      }
      Wu.__reactDisabledLog = !0;
      function ml() {
        {
          if (vl === 0) {
            Qu = console.log, hl = console.info, Yr = console.warn, Yo = console.error, _r = console.group, ic = console.groupCollapsed, lc = console.groupEnd;
            var h = {
              configurable: !0,
              enumerable: !0,
              value: Wu,
              writable: !0
            };
            Object.defineProperties(console, {
              info: h,
              log: h,
              warn: h,
              error: h,
              group: h,
              groupCollapsed: h,
              groupEnd: h
            });
          }
          vl++;
        }
      }
      function fa() {
        {
          if (vl--, vl === 0) {
            var h = {
              configurable: !0,
              enumerable: !0,
              writable: !0
            };
            Object.defineProperties(console, {
              log: P({}, h, {
                value: Qu
              }),
              info: P({}, h, {
                value: hl
              }),
              warn: P({}, h, {
                value: Yr
              }),
              error: P({}, h, {
                value: Yo
              }),
              group: P({}, h, {
                value: _r
              }),
              groupCollapsed: P({}, h, {
                value: ic
              }),
              groupEnd: P({}, h, {
                value: lc
              })
            });
          }
          vl < 0 && Ee("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
        }
      }
      var Xa = bt.ReactCurrentDispatcher, Ka;
      function Gu(h, C, N) {
        {
          if (Ka === void 0)
            try {
              throw Error();
            } catch (X) {
              var F = X.stack.trim().match(/\n( *(at )?)/);
              Ka = F && F[1] || "";
            }
          return `
` + Ka + h;
        }
      }
      var ru = !1, yl;
      {
        var qu = typeof WeakMap == "function" ? WeakMap : Map;
        yl = new qu();
      }
      function Xu(h, C) {
        if (!h || ru)
          return "";
        {
          var N = yl.get(h);
          if (N !== void 0)
            return N;
        }
        var F;
        ru = !0;
        var X = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var Oe;
        Oe = Xa.current, Xa.current = null, ml();
        try {
          if (C) {
            var re = function() {
              throw Error();
            };
            if (Object.defineProperty(re.prototype, "props", {
              set: function() {
                throw Error();
              }
            }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(re, []);
              } catch (vn) {
                F = vn;
              }
              Reflect.construct(h, [], re);
            } else {
              try {
                re.call();
              } catch (vn) {
                F = vn;
              }
              h.call(re.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (vn) {
              F = vn;
            }
            h();
          }
        } catch (vn) {
          if (vn && F && typeof vn.stack == "string") {
            for (var Ne = vn.stack.split(`
`), st = F.stack.split(`
`), wt = Ne.length - 1, tn = st.length - 1; wt >= 1 && tn >= 0 && Ne[wt] !== st[tn]; )
              tn--;
            for (; wt >= 1 && tn >= 0; wt--, tn--)
              if (Ne[wt] !== st[tn]) {
                if (wt !== 1 || tn !== 1)
                  do
                    if (wt--, tn--, tn < 0 || Ne[wt] !== st[tn]) {
                      var It = `
` + Ne[wt].replace(" at new ", " at ");
                      return h.displayName && It.includes("<anonymous>") && (It = It.replace("<anonymous>", h.displayName)), typeof h == "function" && yl.set(h, It), It;
                    }
                  while (wt >= 1 && tn >= 0);
                break;
              }
          }
        } finally {
          ru = !1, Xa.current = Oe, fa(), Error.prepareStackTrace = X;
        }
        var tt = h ? h.displayName || h.name : "", Qt = tt ? Gu(tt) : "";
        return typeof h == "function" && yl.set(h, Qt), Qt;
      }
      function Hi(h, C, N) {
        return Xu(h, !1);
      }
      function If(h) {
        var C = h.prototype;
        return !!(C && C.isReactComponent);
      }
      function Pi(h, C, N) {
        if (h == null)
          return "";
        if (typeof h == "function")
          return Xu(h, If(h));
        if (typeof h == "string")
          return Gu(h);
        switch (h) {
          case ee:
            return Gu("Suspense");
          case Ce:
            return Gu("SuspenseList");
        }
        if (typeof h == "object")
          switch (h.$$typeof) {
            case lt:
              return Hi(h.render);
            case ue:
              return Pi(h.type, C, N);
            case Ye: {
              var F = h, X = F._payload, Oe = F._init;
              try {
                return Pi(Oe(X), C, N);
              } catch {
              }
            }
          }
        return "";
      }
      var kt = {}, Ku = bt.ReactDebugCurrentFrame;
      function Tt(h) {
        if (h) {
          var C = h._owner, N = Pi(h.type, h._source, C ? C.type : null);
          Ku.setExtraStackFrame(N);
        } else
          Ku.setExtraStackFrame(null);
      }
      function Io(h, C, N, F, X) {
        {
          var Oe = Function.call.bind(Cn);
          for (var re in h)
            if (Oe(h, re)) {
              var Ne = void 0;
              try {
                if (typeof h[re] != "function") {
                  var st = Error((F || "React class") + ": " + N + " type `" + re + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof h[re] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  throw st.name = "Invariant Violation", st;
                }
                Ne = h[re](C, re, F, N, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (wt) {
                Ne = wt;
              }
              Ne && !(Ne instanceof Error) && (Tt(X), Ee("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", F || "React class", N, re, typeof Ne), Tt(null)), Ne instanceof Error && !(Ne.message in kt) && (kt[Ne.message] = !0, Tt(X), Ee("Failed %s type: %s", N, Ne.message), Tt(null));
            }
        }
      }
      function vi(h) {
        if (h) {
          var C = h._owner, N = Pi(h.type, h._source, C ? C.type : null);
          Ft(N);
        } else
          Ft(null);
      }
      var Ve;
      Ve = !1;
      function Zu() {
        if (ut.current) {
          var h = Gn(ut.current.type);
          if (h)
            return `

Check the render method of \`` + h + "`.";
        }
        return "";
      }
      function ar(h) {
        if (h !== void 0) {
          var C = h.fileName.replace(/^.*[\\\/]/, ""), N = h.lineNumber;
          return `

Check your code at ` + C + ":" + N + ".";
        }
        return "";
      }
      function hi(h) {
        return h != null ? ar(h.__source) : "";
      }
      var Dr = {};
      function mi(h) {
        var C = Zu();
        if (!C) {
          var N = typeof h == "string" ? h : h.displayName || h.name;
          N && (C = `

Check the top-level render call using <` + N + ">.");
        }
        return C;
      }
      function on(h, C) {
        if (!(!h._store || h._store.validated || h.key != null)) {
          h._store.validated = !0;
          var N = mi(C);
          if (!Dr[N]) {
            Dr[N] = !0;
            var F = "";
            h && h._owner && h._owner !== ut.current && (F = " It was passed a child from " + Gn(h._owner.type) + "."), vi(h), Ee('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', N, F), vi(null);
          }
        }
      }
      function Yt(h, C) {
        if (typeof h == "object") {
          if (En(h))
            for (var N = 0; N < h.length; N++) {
              var F = h[N];
              pn(F) && on(F, C);
            }
          else if (pn(h))
            h._store && (h._store.validated = !0);
          else if (h) {
            var X = ft(h);
            if (typeof X == "function" && X !== h.entries)
              for (var Oe = X.call(h), re; !(re = Oe.next()).done; )
                pn(re.value) && on(re.value, C);
          }
        }
      }
      function gl(h) {
        {
          var C = h.type;
          if (C == null || typeof C == "string")
            return;
          var N;
          if (typeof C == "function")
            N = C.propTypes;
          else if (typeof C == "object" && (C.$$typeof === lt || // Note: Memo only checks outer props here.
          // Inner props are checked in the reconciler.
          C.$$typeof === ue))
            N = C.propTypes;
          else
            return;
          if (N) {
            var F = Gn(C);
            Io(N, h.props, "prop", F, h);
          } else if (C.PropTypes !== void 0 && !Ve) {
            Ve = !0;
            var X = Gn(C);
            Ee("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", X || "Unknown");
          }
          typeof C.getDefaultProps == "function" && !C.getDefaultProps.isReactClassApproved && Ee("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
        }
      }
      function $n(h) {
        {
          for (var C = Object.keys(h.props), N = 0; N < C.length; N++) {
            var F = C[N];
            if (F !== "children" && F !== "key") {
              vi(h), Ee("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", F), vi(null);
              break;
            }
          }
          h.ref !== null && (vi(h), Ee("Invalid attribute `ref` supplied to `React.Fragment`."), vi(null));
        }
      }
      function kr(h, C, N) {
        var F = B(h);
        if (!F) {
          var X = "";
          (h === void 0 || typeof h == "object" && h !== null && Object.keys(h).length === 0) && (X += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var Oe = hi(C);
          Oe ? X += Oe : X += Zu();
          var re;
          h === null ? re = "null" : En(h) ? re = "array" : h !== void 0 && h.$$typeof === ct ? (re = "<" + (Gn(h.type) || "Unknown") + " />", X = " Did you accidentally export a JSX literal instead of a component?") : re = typeof h, Ee("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", re, X);
        }
        var Ne = et.apply(this, arguments);
        if (Ne == null)
          return Ne;
        if (F)
          for (var st = 2; st < arguments.length; st++)
            Yt(arguments[st], h);
        return h === Rt ? $n(Ne) : gl(Ne), Ne;
      }
      var wa = !1;
      function au(h) {
        var C = kr.bind(null, h);
        return C.type = h, wa || (wa = !0, Dt("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.")), Object.defineProperty(C, "type", {
          enumerable: !1,
          get: function() {
            return Dt("Factory.type is deprecated. Access the class directly before passing it to createFactory."), Object.defineProperty(this, "type", {
              value: h
            }), h;
          }
        }), C;
      }
      function Qo(h, C, N) {
        for (var F = Zt.apply(this, arguments), X = 2; X < arguments.length; X++)
          Yt(arguments[X], F.type);
        return gl(F), F;
      }
      function Wo(h, C) {
        var N = pt.transition;
        pt.transition = {};
        var F = pt.transition;
        pt.transition._updatedFibers = /* @__PURE__ */ new Set();
        try {
          h();
        } finally {
          if (pt.transition = N, N === null && F._updatedFibers) {
            var X = F._updatedFibers.size;
            X > 10 && Dt("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), F._updatedFibers.clear();
          }
        }
      }
      var Sl = !1, iu = null;
      function Qf(h) {
        if (iu === null)
          try {
            var C = ("require" + Math.random()).slice(0, 7), N = J && J[C];
            iu = N.call(J, "timers").setImmediate;
          } catch {
            iu = function(X) {
              Sl === !1 && (Sl = !0, typeof MessageChannel > "u" && Ee("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
              var Oe = new MessageChannel();
              Oe.port1.onmessage = X, Oe.port2.postMessage(void 0);
            };
          }
        return iu(h);
      }
      var xa = 0, Za = !1;
      function yi(h) {
        {
          var C = xa;
          xa++, be.current === null && (be.current = []);
          var N = be.isBatchingLegacy, F;
          try {
            if (be.isBatchingLegacy = !0, F = h(), !N && be.didScheduleLegacyUpdate) {
              var X = be.current;
              X !== null && (be.didScheduleLegacyUpdate = !1, El(X));
            }
          } catch (tt) {
            throw ba(C), tt;
          } finally {
            be.isBatchingLegacy = N;
          }
          if (F !== null && typeof F == "object" && typeof F.then == "function") {
            var Oe = F, re = !1, Ne = {
              then: function(tt, Qt) {
                re = !0, Oe.then(function(vn) {
                  ba(C), xa === 0 ? Ju(vn, tt, Qt) : tt(vn);
                }, function(vn) {
                  ba(C), Qt(vn);
                });
              }
            };
            return !Za && typeof Promise < "u" && Promise.resolve().then(function() {
            }).then(function() {
              re || (Za = !0, Ee("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
            }), Ne;
          } else {
            var st = F;
            if (ba(C), xa === 0) {
              var wt = be.current;
              wt !== null && (El(wt), be.current = null);
              var tn = {
                then: function(tt, Qt) {
                  be.current === null ? (be.current = [], Ju(st, tt, Qt)) : tt(st);
                }
              };
              return tn;
            } else {
              var It = {
                then: function(tt, Qt) {
                  tt(st);
                }
              };
              return It;
            }
          }
        }
      }
      function ba(h) {
        h !== xa - 1 && Ee("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "), xa = h;
      }
      function Ju(h, C, N) {
        {
          var F = be.current;
          if (F !== null)
            try {
              El(F), Qf(function() {
                F.length === 0 ? (be.current = null, C(h)) : Ju(h, C, N);
              });
            } catch (X) {
              N(X);
            }
          else
            C(h);
        }
      }
      var eo = !1;
      function El(h) {
        if (!eo) {
          eo = !0;
          var C = 0;
          try {
            for (; C < h.length; C++) {
              var N = h[C];
              do
                N = N(!0);
              while (N !== null);
            }
            h.length = 0;
          } catch (F) {
            throw h = h.slice(C + 1), F;
          } finally {
            eo = !1;
          }
        }
      }
      var lu = kr, to = Qo, no = au, Ja = {
        map: ji,
        forEach: Jl,
        count: Zl,
        toArray: dl,
        only: pl
      };
      W.Children = Ja, W.Component = Ue, W.Fragment = Rt, W.Profiler = Vt, W.PureComponent = rt, W.StrictMode = S, W.Suspense = ee, W.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = bt, W.act = yi, W.cloneElement = to, W.createContext = eu, W.createElement = lu, W.createFactory = no, W.createRef = kn, W.forwardRef = pi, W.isValidElement = pn, W.lazy = di, W.memo = ae, W.startTransition = Wo, W.unstable_act = yi, W.useCallback = rr, W.useContext = We, W.useDebugValue = Ge, W.useDeferredValue = qa, W.useEffect = Rn, W.useId = tu, W.useImperativeHandle = Ga, W.useInsertionEffect = en, W.useLayoutEffect = un, W.useMemo = Wa, W.useReducer = ot, W.useRef = at, W.useState = Be, W.useSyncExternalStore = nu, W.useTransition = Ke, W.version = z, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
    }();
  }(Zp, Zp.exports)), Zp.exports;
}
process.env.NODE_ENV === "production" ? dE.exports = W_() : dE.exports = G_();
var Jp = dE.exports;
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var KR;
function q_() {
  if (KR) return Xp;
  KR = 1;
  var J = Jp, W = Symbol.for("react.element"), z = Symbol.for("react.fragment"), ct = Object.prototype.hasOwnProperty, Ct = J.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, Rt = { key: !0, ref: !0, __self: !0, __source: !0 };
  function S(Vt, de, ve) {
    var lt, ee = {}, Ce = null, ue = null;
    ve !== void 0 && (Ce = "" + ve), de.key !== void 0 && (Ce = "" + de.key), de.ref !== void 0 && (ue = de.ref);
    for (lt in de) ct.call(de, lt) && !Rt.hasOwnProperty(lt) && (ee[lt] = de[lt]);
    if (Vt && Vt.defaultProps) for (lt in de = Vt.defaultProps, de) ee[lt] === void 0 && (ee[lt] = de[lt]);
    return { $$typeof: W, type: Vt, key: Ce, ref: ue, props: ee, _owner: Ct.current };
  }
  return Xp.Fragment = z, Xp.jsx = S, Xp.jsxs = S, Xp;
}
var Kp = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ZR;
function X_() {
  return ZR || (ZR = 1, process.env.NODE_ENV !== "production" && function() {
    var J = Jp, W = Symbol.for("react.element"), z = Symbol.for("react.portal"), ct = Symbol.for("react.fragment"), Ct = Symbol.for("react.strict_mode"), Rt = Symbol.for("react.profiler"), S = Symbol.for("react.provider"), Vt = Symbol.for("react.context"), de = Symbol.for("react.forward_ref"), ve = Symbol.for("react.suspense"), lt = Symbol.for("react.suspense_list"), ee = Symbol.for("react.memo"), Ce = Symbol.for("react.lazy"), ue = Symbol.for("react.offscreen"), Ye = Symbol.iterator, mt = "@@iterator";
    function dt(R) {
      if (R === null || typeof R != "object")
        return null;
      var B = Ye && R[Ye] || R[mt];
      return typeof B == "function" ? B : null;
    }
    var cn = J.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function ft(R) {
      {
        for (var B = arguments.length, ae = new Array(B > 1 ? B - 1 : 0), he = 1; he < B; he++)
          ae[he - 1] = arguments[he];
        Ie("error", R, ae);
      }
    }
    function Ie(R, B, ae) {
      {
        var he = cn.ReactDebugCurrentFrame, We = he.getStackAddendum();
        We !== "" && (B += "%s", ae = ae.concat([We]));
        var Be = ae.map(function(ot) {
          return String(ot);
        });
        Be.unshift("Warning: " + B), Function.prototype.apply.call(console[R], console, Be);
      }
    }
    var pt = !1, be = !1, ut = !1, Fe = !1, rn = !1, Ft;
    Ft = Symbol.for("react.module.reference");
    function Kt(R) {
      return !!(typeof R == "string" || typeof R == "function" || R === ct || R === Rt || rn || R === Ct || R === ve || R === lt || Fe || R === ue || pt || be || ut || typeof R == "object" && R !== null && (R.$$typeof === Ce || R.$$typeof === ee || R.$$typeof === S || R.$$typeof === Vt || R.$$typeof === de || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      R.$$typeof === Ft || R.getModuleId !== void 0));
    }
    function an(R, B, ae) {
      var he = R.displayName;
      if (he)
        return he;
      var We = B.displayName || B.name || "";
      return We !== "" ? ae + "(" + We + ")" : ae;
    }
    function xt(R) {
      return R.displayName || "Context";
    }
    function ke(R) {
      if (R == null)
        return null;
      if (typeof R.tag == "number" && ft("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof R == "function")
        return R.displayName || R.name || null;
      if (typeof R == "string")
        return R;
      switch (R) {
        case ct:
          return "Fragment";
        case z:
          return "Portal";
        case Rt:
          return "Profiler";
        case Ct:
          return "StrictMode";
        case ve:
          return "Suspense";
        case lt:
          return "SuspenseList";
      }
      if (typeof R == "object")
        switch (R.$$typeof) {
          case Vt:
            var B = R;
            return xt(B) + ".Consumer";
          case S:
            var ae = R;
            return xt(ae._context) + ".Provider";
          case de:
            return an(R, R.render, "ForwardRef");
          case ee:
            var he = R.displayName || null;
            return he !== null ? he : ke(R.type) || "Memo";
          case Ce: {
            var We = R, Be = We._payload, ot = We._init;
            try {
              return ke(ot(Be));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var Ut = Object.assign, bt = 0, Dt, Ee, K, Re, ne, _, P;
    function je() {
    }
    je.__reactDisabledLog = !0;
    function Ue() {
      {
        if (bt === 0) {
          Dt = console.log, Ee = console.info, K = console.warn, Re = console.error, ne = console.group, _ = console.groupCollapsed, P = console.groupEnd;
          var R = {
            configurable: !0,
            enumerable: !0,
            value: je,
            writable: !0
          };
          Object.defineProperties(console, {
            info: R,
            log: R,
            warn: R,
            error: R,
            group: R,
            groupCollapsed: R,
            groupEnd: R
          });
        }
        bt++;
      }
    }
    function nt() {
      {
        if (bt--, bt === 0) {
          var R = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: Ut({}, R, {
              value: Dt
            }),
            info: Ut({}, R, {
              value: Ee
            }),
            warn: Ut({}, R, {
              value: K
            }),
            error: Ut({}, R, {
              value: Re
            }),
            group: Ut({}, R, {
              value: ne
            }),
            groupCollapsed: Ut({}, R, {
              value: _
            }),
            groupEnd: Ut({}, R, {
              value: P
            })
          });
        }
        bt < 0 && ft("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Ze = cn.ReactCurrentDispatcher, Xe;
    function Je(R, B, ae) {
      {
        if (Xe === void 0)
          try {
            throw Error();
          } catch (We) {
            var he = We.stack.trim().match(/\n( *(at )?)/);
            Xe = he && he[1] || "";
          }
        return `
` + Xe + R;
      }
    }
    var rt = !1, Pt;
    {
      var kn = typeof WeakMap == "function" ? WeakMap : Map;
      Pt = new kn();
    }
    function wr(R, B) {
      if (!R || rt)
        return "";
      {
        var ae = Pt.get(R);
        if (ae !== void 0)
          return ae;
      }
      var he;
      rt = !0;
      var We = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var Be;
      Be = Ze.current, Ze.current = null, Ue();
      try {
        if (B) {
          var ot = function() {
            throw Error();
          };
          if (Object.defineProperty(ot.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(ot, []);
            } catch (Ge) {
              he = Ge;
            }
            Reflect.construct(R, [], ot);
          } else {
            try {
              ot.call();
            } catch (Ge) {
              he = Ge;
            }
            R.call(ot.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (Ge) {
            he = Ge;
          }
          R();
        }
      } catch (Ge) {
        if (Ge && he && typeof Ge.stack == "string") {
          for (var at = Ge.stack.split(`
`), Rn = he.stack.split(`
`), en = at.length - 1, un = Rn.length - 1; en >= 1 && un >= 0 && at[en] !== Rn[un]; )
            un--;
          for (; en >= 1 && un >= 0; en--, un--)
            if (at[en] !== Rn[un]) {
              if (en !== 1 || un !== 1)
                do
                  if (en--, un--, un < 0 || at[en] !== Rn[un]) {
                    var rr = `
` + at[en].replace(" at new ", " at ");
                    return R.displayName && rr.includes("<anonymous>") && (rr = rr.replace("<anonymous>", R.displayName)), typeof R == "function" && Pt.set(R, rr), rr;
                  }
                while (en >= 1 && un >= 0);
              break;
            }
        }
      } finally {
        rt = !1, Ze.current = Be, nt(), Error.prepareStackTrace = We;
      }
      var Wa = R ? R.displayName || R.name : "", Ga = Wa ? Je(Wa) : "";
      return typeof R == "function" && Pt.set(R, Ga), Ga;
    }
    function En(R, B, ae) {
      return wr(R, !1);
    }
    function tr(R) {
      var B = R.prototype;
      return !!(B && B.isReactComponent);
    }
    function Pn(R, B, ae) {
      if (R == null)
        return "";
      if (typeof R == "function")
        return wr(R, tr(R));
      if (typeof R == "string")
        return Je(R);
      switch (R) {
        case ve:
          return Je("Suspense");
        case lt:
          return Je("SuspenseList");
      }
      if (typeof R == "object")
        switch (R.$$typeof) {
          case de:
            return En(R.render);
          case ee:
            return Pn(R.type, B, ae);
          case Ce: {
            var he = R, We = he._payload, Be = he._init;
            try {
              return Pn(Be(We), B, ae);
            } catch {
            }
          }
        }
      return "";
    }
    var Vn = Object.prototype.hasOwnProperty, $r = {}, si = cn.ReactDebugCurrentFrame;
    function oa(R) {
      if (R) {
        var B = R._owner, ae = Pn(R.type, R._source, B ? B.type : null);
        si.setExtraStackFrame(ae);
      } else
        si.setExtraStackFrame(null);
    }
    function Gn(R, B, ae, he, We) {
      {
        var Be = Function.call.bind(Vn);
        for (var ot in R)
          if (Be(R, ot)) {
            var at = void 0;
            try {
              if (typeof R[ot] != "function") {
                var Rn = Error((he || "React class") + ": " + ae + " type `" + ot + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof R[ot] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw Rn.name = "Invariant Violation", Rn;
              }
              at = R[ot](B, ot, he, ae, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (en) {
              at = en;
            }
            at && !(at instanceof Error) && (oa(We), ft("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", he || "React class", ae, ot, typeof at), oa(null)), at instanceof Error && !(at.message in $r) && ($r[at.message] = !0, oa(We), ft("Failed %s type: %s", ae, at.message), oa(null));
          }
      }
    }
    var Cn = Array.isArray;
    function Bn(R) {
      return Cn(R);
    }
    function yr(R) {
      {
        var B = typeof Symbol == "function" && Symbol.toStringTag, ae = B && R[Symbol.toStringTag] || R.constructor.name || "Object";
        return ae;
      }
    }
    function Ya(R) {
      try {
        return On(R), !1;
      } catch {
        return !0;
      }
    }
    function On(R) {
      return "" + R;
    }
    function gr(R) {
      if (Ya(R))
        return ft("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", yr(R)), On(R);
    }
    var sa = cn.ReactCurrentOwner, Ia = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, ci, Z;
    function Te(R) {
      if (Vn.call(R, "ref")) {
        var B = Object.getOwnPropertyDescriptor(R, "ref").get;
        if (B && B.isReactWarning)
          return !1;
      }
      return R.ref !== void 0;
    }
    function et(R) {
      if (Vn.call(R, "key")) {
        var B = Object.getOwnPropertyDescriptor(R, "key").get;
        if (B && B.isReactWarning)
          return !1;
      }
      return R.key !== void 0;
    }
    function At(R, B) {
      typeof R.ref == "string" && sa.current;
    }
    function Zt(R, B) {
      {
        var ae = function() {
          ci || (ci = !0, ft("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", B));
        };
        ae.isReactWarning = !0, Object.defineProperty(R, "key", {
          get: ae,
          configurable: !0
        });
      }
    }
    function pn(R, B) {
      {
        var ae = function() {
          Z || (Z = !0, ft("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", B));
        };
        ae.isReactWarning = !0, Object.defineProperty(R, "ref", {
          get: ae,
          configurable: !0
        });
      }
    }
    var ln = function(R, B, ae, he, We, Be, ot) {
      var at = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: W,
        // Built-in properties that belong on the element
        type: R,
        key: B,
        ref: ae,
        props: ot,
        // Record the component responsible for creating this element.
        _owner: Be
      };
      return at._store = {}, Object.defineProperty(at._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(at, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: he
      }), Object.defineProperty(at, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: We
      }), Object.freeze && (Object.freeze(at.props), Object.freeze(at)), at;
    };
    function qn(R, B, ae, he, We) {
      {
        var Be, ot = {}, at = null, Rn = null;
        ae !== void 0 && (gr(ae), at = "" + ae), et(B) && (gr(B.key), at = "" + B.key), Te(B) && (Rn = B.ref, At(B, We));
        for (Be in B)
          Vn.call(B, Be) && !Ia.hasOwnProperty(Be) && (ot[Be] = B[Be]);
        if (R && R.defaultProps) {
          var en = R.defaultProps;
          for (Be in en)
            ot[Be] === void 0 && (ot[Be] = en[Be]);
        }
        if (at || Rn) {
          var un = typeof R == "function" ? R.displayName || R.name || "Unknown" : R;
          at && Zt(ot, un), Rn && pn(ot, un);
        }
        return ln(R, at, Rn, We, he, sa.current, ot);
      }
    }
    var Jt = cn.ReactCurrentOwner, Bt = cn.ReactDebugCurrentFrame;
    function $t(R) {
      if (R) {
        var B = R._owner, ae = Pn(R.type, R._source, B ? B.type : null);
        Bt.setExtraStackFrame(ae);
      } else
        Bt.setExtraStackFrame(null);
    }
    var ca;
    ca = !1;
    function Sr(R) {
      return typeof R == "object" && R !== null && R.$$typeof === W;
    }
    function Ta() {
      {
        if (Jt.current) {
          var R = ke(Jt.current.type);
          if (R)
            return `

Check the render method of \`` + R + "`.";
        }
        return "";
      }
    }
    function ji(R) {
      return "";
    }
    var Zl = {};
    function Jl(R) {
      {
        var B = Ta();
        if (!B) {
          var ae = typeof R == "string" ? R : R.displayName || R.name;
          ae && (B = `

Check the top-level render call using <` + ae + ">.");
        }
        return B;
      }
    }
    function dl(R, B) {
      {
        if (!R._store || R._store.validated || R.key != null)
          return;
        R._store.validated = !0;
        var ae = Jl(B);
        if (Zl[ae])
          return;
        Zl[ae] = !0;
        var he = "";
        R && R._owner && R._owner !== Jt.current && (he = " It was passed a child from " + ke(R._owner.type) + "."), $t(R), ft('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', ae, he), $t(null);
      }
    }
    function pl(R, B) {
      {
        if (typeof R != "object")
          return;
        if (Bn(R))
          for (var ae = 0; ae < R.length; ae++) {
            var he = R[ae];
            Sr(he) && dl(he, B);
          }
        else if (Sr(R))
          R._store && (R._store.validated = !0);
        else if (R) {
          var We = dt(R);
          if (typeof We == "function" && We !== R.entries)
            for (var Be = We.call(R), ot; !(ot = Be.next()).done; )
              Sr(ot.value) && dl(ot.value, B);
        }
      }
    }
    function eu(R) {
      {
        var B = R.type;
        if (B == null || typeof B == "string")
          return;
        var ae;
        if (typeof B == "function")
          ae = B.propTypes;
        else if (typeof B == "object" && (B.$$typeof === de || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        B.$$typeof === ee))
          ae = B.propTypes;
        else
          return;
        if (ae) {
          var he = ke(B);
          Gn(ae, R.props, "prop", he, R);
        } else if (B.PropTypes !== void 0 && !ca) {
          ca = !0;
          var We = ke(B);
          ft("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", We || "Unknown");
        }
        typeof B.getDefaultProps == "function" && !B.getDefaultProps.isReactClassApproved && ft("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function xr(R) {
      {
        for (var B = Object.keys(R.props), ae = 0; ae < B.length; ae++) {
          var he = B[ae];
          if (he !== "children" && he !== "key") {
            $t(R), ft("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", he), $t(null);
            break;
          }
        }
        R.ref !== null && ($t(R), ft("Invalid attribute `ref` supplied to `React.Fragment`."), $t(null));
      }
    }
    var br = {};
    function nr(R, B, ae, he, We, Be) {
      {
        var ot = Kt(R);
        if (!ot) {
          var at = "";
          (R === void 0 || typeof R == "object" && R !== null && Object.keys(R).length === 0) && (at += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var Rn = ji();
          Rn ? at += Rn : at += Ta();
          var en;
          R === null ? en = "null" : Bn(R) ? en = "array" : R !== void 0 && R.$$typeof === W ? (en = "<" + (ke(R.type) || "Unknown") + " />", at = " Did you accidentally export a JSX literal instead of a component?") : en = typeof R, ft("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", en, at);
        }
        var un = qn(R, B, ae, We, Be);
        if (un == null)
          return un;
        if (ot) {
          var rr = B.children;
          if (rr !== void 0)
            if (he)
              if (Bn(rr)) {
                for (var Wa = 0; Wa < rr.length; Wa++)
                  pl(rr[Wa], R);
                Object.freeze && Object.freeze(rr);
              } else
                ft("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              pl(rr, R);
        }
        if (Vn.call(B, "key")) {
          var Ga = ke(R), Ge = Object.keys(B).filter(function(tu) {
            return tu !== "key";
          }), Ke = Ge.length > 0 ? "{key: someKey, " + Ge.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!br[Ga + Ke]) {
            var qa = Ge.length > 0 ? "{" + Ge.join(": ..., ") + ": ...}" : "{}";
            ft(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, Ke, Ga, qa, Ga), br[Ga + Ke] = !0;
          }
        }
        return R === ct ? xr(un) : eu(un), un;
      }
    }
    function fi(R, B, ae) {
      return nr(R, B, ae, !0);
    }
    function Qa(R, B, ae) {
      return nr(R, B, ae, !1);
    }
    var di = Qa, pi = fi;
    Kp.Fragment = ct, Kp.jsx = di, Kp.jsxs = pi;
  }()), Kp;
}
process.env.NODE_ENV === "production" ? fE.exports = q_() : fE.exports = X_();
var ua = fE.exports, pE = { exports: {} }, Ba = {}, Im = { exports: {} }, sE = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var JR;
function K_() {
  return JR || (JR = 1, function(J) {
    function W(K, Re) {
      var ne = K.length;
      K.push(Re);
      e: for (; 0 < ne; ) {
        var _ = ne - 1 >>> 1, P = K[_];
        if (0 < Ct(P, Re)) K[_] = Re, K[ne] = P, ne = _;
        else break e;
      }
    }
    function z(K) {
      return K.length === 0 ? null : K[0];
    }
    function ct(K) {
      if (K.length === 0) return null;
      var Re = K[0], ne = K.pop();
      if (ne !== Re) {
        K[0] = ne;
        e: for (var _ = 0, P = K.length, je = P >>> 1; _ < je; ) {
          var Ue = 2 * (_ + 1) - 1, nt = K[Ue], Ze = Ue + 1, Xe = K[Ze];
          if (0 > Ct(nt, ne)) Ze < P && 0 > Ct(Xe, nt) ? (K[_] = Xe, K[Ze] = ne, _ = Ze) : (K[_] = nt, K[Ue] = ne, _ = Ue);
          else if (Ze < P && 0 > Ct(Xe, ne)) K[_] = Xe, K[Ze] = ne, _ = Ze;
          else break e;
        }
      }
      return Re;
    }
    function Ct(K, Re) {
      var ne = K.sortIndex - Re.sortIndex;
      return ne !== 0 ? ne : K.id - Re.id;
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
      var Rt = performance;
      J.unstable_now = function() {
        return Rt.now();
      };
    } else {
      var S = Date, Vt = S.now();
      J.unstable_now = function() {
        return S.now() - Vt;
      };
    }
    var de = [], ve = [], lt = 1, ee = null, Ce = 3, ue = !1, Ye = !1, mt = !1, dt = typeof setTimeout == "function" ? setTimeout : null, cn = typeof clearTimeout == "function" ? clearTimeout : null, ft = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function Ie(K) {
      for (var Re = z(ve); Re !== null; ) {
        if (Re.callback === null) ct(ve);
        else if (Re.startTime <= K) ct(ve), Re.sortIndex = Re.expirationTime, W(de, Re);
        else break;
        Re = z(ve);
      }
    }
    function pt(K) {
      if (mt = !1, Ie(K), !Ye) if (z(de) !== null) Ye = !0, Dt(be);
      else {
        var Re = z(ve);
        Re !== null && Ee(pt, Re.startTime - K);
      }
    }
    function be(K, Re) {
      Ye = !1, mt && (mt = !1, cn(rn), rn = -1), ue = !0;
      var ne = Ce;
      try {
        for (Ie(Re), ee = z(de); ee !== null && (!(ee.expirationTime > Re) || K && !an()); ) {
          var _ = ee.callback;
          if (typeof _ == "function") {
            ee.callback = null, Ce = ee.priorityLevel;
            var P = _(ee.expirationTime <= Re);
            Re = J.unstable_now(), typeof P == "function" ? ee.callback = P : ee === z(de) && ct(de), Ie(Re);
          } else ct(de);
          ee = z(de);
        }
        if (ee !== null) var je = !0;
        else {
          var Ue = z(ve);
          Ue !== null && Ee(pt, Ue.startTime - Re), je = !1;
        }
        return je;
      } finally {
        ee = null, Ce = ne, ue = !1;
      }
    }
    var ut = !1, Fe = null, rn = -1, Ft = 5, Kt = -1;
    function an() {
      return !(J.unstable_now() - Kt < Ft);
    }
    function xt() {
      if (Fe !== null) {
        var K = J.unstable_now();
        Kt = K;
        var Re = !0;
        try {
          Re = Fe(!0, K);
        } finally {
          Re ? ke() : (ut = !1, Fe = null);
        }
      } else ut = !1;
    }
    var ke;
    if (typeof ft == "function") ke = function() {
      ft(xt);
    };
    else if (typeof MessageChannel < "u") {
      var Ut = new MessageChannel(), bt = Ut.port2;
      Ut.port1.onmessage = xt, ke = function() {
        bt.postMessage(null);
      };
    } else ke = function() {
      dt(xt, 0);
    };
    function Dt(K) {
      Fe = K, ut || (ut = !0, ke());
    }
    function Ee(K, Re) {
      rn = dt(function() {
        K(J.unstable_now());
      }, Re);
    }
    J.unstable_IdlePriority = 5, J.unstable_ImmediatePriority = 1, J.unstable_LowPriority = 4, J.unstable_NormalPriority = 3, J.unstable_Profiling = null, J.unstable_UserBlockingPriority = 2, J.unstable_cancelCallback = function(K) {
      K.callback = null;
    }, J.unstable_continueExecution = function() {
      Ye || ue || (Ye = !0, Dt(be));
    }, J.unstable_forceFrameRate = function(K) {
      0 > K || 125 < K ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : Ft = 0 < K ? Math.floor(1e3 / K) : 5;
    }, J.unstable_getCurrentPriorityLevel = function() {
      return Ce;
    }, J.unstable_getFirstCallbackNode = function() {
      return z(de);
    }, J.unstable_next = function(K) {
      switch (Ce) {
        case 1:
        case 2:
        case 3:
          var Re = 3;
          break;
        default:
          Re = Ce;
      }
      var ne = Ce;
      Ce = Re;
      try {
        return K();
      } finally {
        Ce = ne;
      }
    }, J.unstable_pauseExecution = function() {
    }, J.unstable_requestPaint = function() {
    }, J.unstable_runWithPriority = function(K, Re) {
      switch (K) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          K = 3;
      }
      var ne = Ce;
      Ce = K;
      try {
        return Re();
      } finally {
        Ce = ne;
      }
    }, J.unstable_scheduleCallback = function(K, Re, ne) {
      var _ = J.unstable_now();
      switch (typeof ne == "object" && ne !== null ? (ne = ne.delay, ne = typeof ne == "number" && 0 < ne ? _ + ne : _) : ne = _, K) {
        case 1:
          var P = -1;
          break;
        case 2:
          P = 250;
          break;
        case 5:
          P = 1073741823;
          break;
        case 4:
          P = 1e4;
          break;
        default:
          P = 5e3;
      }
      return P = ne + P, K = { id: lt++, callback: Re, priorityLevel: K, startTime: ne, expirationTime: P, sortIndex: -1 }, ne > _ ? (K.sortIndex = ne, W(ve, K), z(de) === null && K === z(ve) && (mt ? (cn(rn), rn = -1) : mt = !0, Ee(pt, ne - _))) : (K.sortIndex = P, W(de, K), Ye || ue || (Ye = !0, Dt(be))), K;
    }, J.unstable_shouldYield = an, J.unstable_wrapCallback = function(K) {
      var Re = Ce;
      return function() {
        var ne = Ce;
        Ce = Re;
        try {
          return K.apply(this, arguments);
        } finally {
          Ce = ne;
        }
      };
    };
  }(sE)), sE;
}
var cE = {};
/**
 * @license React
 * scheduler.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var eT;
function Z_() {
  return eT || (eT = 1, function(J) {
    process.env.NODE_ENV !== "production" && function() {
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
      var W = !1, z = 5;
      function ct(Z, Te) {
        var et = Z.length;
        Z.push(Te), S(Z, Te, et);
      }
      function Ct(Z) {
        return Z.length === 0 ? null : Z[0];
      }
      function Rt(Z) {
        if (Z.length === 0)
          return null;
        var Te = Z[0], et = Z.pop();
        return et !== Te && (Z[0] = et, Vt(Z, et, 0)), Te;
      }
      function S(Z, Te, et) {
        for (var At = et; At > 0; ) {
          var Zt = At - 1 >>> 1, pn = Z[Zt];
          if (de(pn, Te) > 0)
            Z[Zt] = Te, Z[At] = pn, At = Zt;
          else
            return;
        }
      }
      function Vt(Z, Te, et) {
        for (var At = et, Zt = Z.length, pn = Zt >>> 1; At < pn; ) {
          var ln = (At + 1) * 2 - 1, qn = Z[ln], Jt = ln + 1, Bt = Z[Jt];
          if (de(qn, Te) < 0)
            Jt < Zt && de(Bt, qn) < 0 ? (Z[At] = Bt, Z[Jt] = Te, At = Jt) : (Z[At] = qn, Z[ln] = Te, At = ln);
          else if (Jt < Zt && de(Bt, Te) < 0)
            Z[At] = Bt, Z[Jt] = Te, At = Jt;
          else
            return;
        }
      }
      function de(Z, Te) {
        var et = Z.sortIndex - Te.sortIndex;
        return et !== 0 ? et : Z.id - Te.id;
      }
      var ve = 1, lt = 2, ee = 3, Ce = 4, ue = 5;
      function Ye(Z, Te) {
      }
      var mt = typeof performance == "object" && typeof performance.now == "function";
      if (mt) {
        var dt = performance;
        J.unstable_now = function() {
          return dt.now();
        };
      } else {
        var cn = Date, ft = cn.now();
        J.unstable_now = function() {
          return cn.now() - ft;
        };
      }
      var Ie = 1073741823, pt = -1, be = 250, ut = 5e3, Fe = 1e4, rn = Ie, Ft = [], Kt = [], an = 1, xt = null, ke = ee, Ut = !1, bt = !1, Dt = !1, Ee = typeof setTimeout == "function" ? setTimeout : null, K = typeof clearTimeout == "function" ? clearTimeout : null, Re = typeof setImmediate < "u" ? setImmediate : null;
      typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
      function ne(Z) {
        for (var Te = Ct(Kt); Te !== null; ) {
          if (Te.callback === null)
            Rt(Kt);
          else if (Te.startTime <= Z)
            Rt(Kt), Te.sortIndex = Te.expirationTime, ct(Ft, Te);
          else
            return;
          Te = Ct(Kt);
        }
      }
      function _(Z) {
        if (Dt = !1, ne(Z), !bt)
          if (Ct(Ft) !== null)
            bt = !0, On(P);
          else {
            var Te = Ct(Kt);
            Te !== null && gr(_, Te.startTime - Z);
          }
      }
      function P(Z, Te) {
        bt = !1, Dt && (Dt = !1, sa()), Ut = !0;
        var et = ke;
        try {
          var At;
          if (!W) return je(Z, Te);
        } finally {
          xt = null, ke = et, Ut = !1;
        }
      }
      function je(Z, Te) {
        var et = Te;
        for (ne(et), xt = Ct(Ft); xt !== null && !(xt.expirationTime > et && (!Z || si())); ) {
          var At = xt.callback;
          if (typeof At == "function") {
            xt.callback = null, ke = xt.priorityLevel;
            var Zt = xt.expirationTime <= et, pn = At(Zt);
            et = J.unstable_now(), typeof pn == "function" ? xt.callback = pn : xt === Ct(Ft) && Rt(Ft), ne(et);
          } else
            Rt(Ft);
          xt = Ct(Ft);
        }
        if (xt !== null)
          return !0;
        var ln = Ct(Kt);
        return ln !== null && gr(_, ln.startTime - et), !1;
      }
      function Ue(Z, Te) {
        switch (Z) {
          case ve:
          case lt:
          case ee:
          case Ce:
          case ue:
            break;
          default:
            Z = ee;
        }
        var et = ke;
        ke = Z;
        try {
          return Te();
        } finally {
          ke = et;
        }
      }
      function nt(Z) {
        var Te;
        switch (ke) {
          case ve:
          case lt:
          case ee:
            Te = ee;
            break;
          default:
            Te = ke;
            break;
        }
        var et = ke;
        ke = Te;
        try {
          return Z();
        } finally {
          ke = et;
        }
      }
      function Ze(Z) {
        var Te = ke;
        return function() {
          var et = ke;
          ke = Te;
          try {
            return Z.apply(this, arguments);
          } finally {
            ke = et;
          }
        };
      }
      function Xe(Z, Te, et) {
        var At = J.unstable_now(), Zt;
        if (typeof et == "object" && et !== null) {
          var pn = et.delay;
          typeof pn == "number" && pn > 0 ? Zt = At + pn : Zt = At;
        } else
          Zt = At;
        var ln;
        switch (Z) {
          case ve:
            ln = pt;
            break;
          case lt:
            ln = be;
            break;
          case ue:
            ln = rn;
            break;
          case Ce:
            ln = Fe;
            break;
          case ee:
          default:
            ln = ut;
            break;
        }
        var qn = Zt + ln, Jt = {
          id: an++,
          callback: Te,
          priorityLevel: Z,
          startTime: Zt,
          expirationTime: qn,
          sortIndex: -1
        };
        return Zt > At ? (Jt.sortIndex = Zt, ct(Kt, Jt), Ct(Ft) === null && Jt === Ct(Kt) && (Dt ? sa() : Dt = !0, gr(_, Zt - At))) : (Jt.sortIndex = qn, ct(Ft, Jt), !bt && !Ut && (bt = !0, On(P))), Jt;
      }
      function Je() {
      }
      function rt() {
        !bt && !Ut && (bt = !0, On(P));
      }
      function Pt() {
        return Ct(Ft);
      }
      function kn(Z) {
        Z.callback = null;
      }
      function wr() {
        return ke;
      }
      var En = !1, tr = null, Pn = -1, Vn = z, $r = -1;
      function si() {
        var Z = J.unstable_now() - $r;
        return !(Z < Vn);
      }
      function oa() {
      }
      function Gn(Z) {
        if (Z < 0 || Z > 125) {
          console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported");
          return;
        }
        Z > 0 ? Vn = Math.floor(1e3 / Z) : Vn = z;
      }
      var Cn = function() {
        if (tr !== null) {
          var Z = J.unstable_now();
          $r = Z;
          var Te = !0, et = !0;
          try {
            et = tr(Te, Z);
          } finally {
            et ? Bn() : (En = !1, tr = null);
          }
        } else
          En = !1;
      }, Bn;
      if (typeof Re == "function")
        Bn = function() {
          Re(Cn);
        };
      else if (typeof MessageChannel < "u") {
        var yr = new MessageChannel(), Ya = yr.port2;
        yr.port1.onmessage = Cn, Bn = function() {
          Ya.postMessage(null);
        };
      } else
        Bn = function() {
          Ee(Cn, 0);
        };
      function On(Z) {
        tr = Z, En || (En = !0, Bn());
      }
      function gr(Z, Te) {
        Pn = Ee(function() {
          Z(J.unstable_now());
        }, Te);
      }
      function sa() {
        K(Pn), Pn = -1;
      }
      var Ia = oa, ci = null;
      J.unstable_IdlePriority = ue, J.unstable_ImmediatePriority = ve, J.unstable_LowPriority = Ce, J.unstable_NormalPriority = ee, J.unstable_Profiling = ci, J.unstable_UserBlockingPriority = lt, J.unstable_cancelCallback = kn, J.unstable_continueExecution = rt, J.unstable_forceFrameRate = Gn, J.unstable_getCurrentPriorityLevel = wr, J.unstable_getFirstCallbackNode = Pt, J.unstable_next = nt, J.unstable_pauseExecution = Je, J.unstable_requestPaint = Ia, J.unstable_runWithPriority = Ue, J.unstable_scheduleCallback = Xe, J.unstable_shouldYield = si, J.unstable_wrapCallback = Ze, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
    }();
  }(cE)), cE;
}
var tT;
function iT() {
  return tT || (tT = 1, process.env.NODE_ENV === "production" ? Im.exports = K_() : Im.exports = Z_()), Im.exports;
}
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var nT;
function J_() {
  if (nT) return Ba;
  nT = 1;
  var J = Jp, W = iT();
  function z(n) {
    for (var r = "https://reactjs.org/docs/error-decoder.html?invariant=" + n, l = 1; l < arguments.length; l++) r += "&args[]=" + encodeURIComponent(arguments[l]);
    return "Minified React error #" + n + "; visit " + r + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var ct = /* @__PURE__ */ new Set(), Ct = {};
  function Rt(n, r) {
    S(n, r), S(n + "Capture", r);
  }
  function S(n, r) {
    for (Ct[n] = r, n = 0; n < r.length; n++) ct.add(r[n]);
  }
  var Vt = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), de = Object.prototype.hasOwnProperty, ve = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, lt = {}, ee = {};
  function Ce(n) {
    return de.call(ee, n) ? !0 : de.call(lt, n) ? !1 : ve.test(n) ? ee[n] = !0 : (lt[n] = !0, !1);
  }
  function ue(n, r, l, o) {
    if (l !== null && l.type === 0) return !1;
    switch (typeof r) {
      case "function":
      case "symbol":
        return !0;
      case "boolean":
        return o ? !1 : l !== null ? !l.acceptsBooleans : (n = n.toLowerCase().slice(0, 5), n !== "data-" && n !== "aria-");
      default:
        return !1;
    }
  }
  function Ye(n, r, l, o) {
    if (r === null || typeof r > "u" || ue(n, r, l, o)) return !0;
    if (o) return !1;
    if (l !== null) switch (l.type) {
      case 3:
        return !r;
      case 4:
        return r === !1;
      case 5:
        return isNaN(r);
      case 6:
        return isNaN(r) || 1 > r;
    }
    return !1;
  }
  function mt(n, r, l, o, c, d, m) {
    this.acceptsBooleans = r === 2 || r === 3 || r === 4, this.attributeName = o, this.attributeNamespace = c, this.mustUseProperty = l, this.propertyName = n, this.type = r, this.sanitizeURL = d, this.removeEmptyString = m;
  }
  var dt = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(n) {
    dt[n] = new mt(n, 0, !1, n, null, !1, !1);
  }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(n) {
    var r = n[0];
    dt[r] = new mt(r, 1, !1, n[1], null, !1, !1);
  }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(n) {
    dt[n] = new mt(n, 2, !1, n.toLowerCase(), null, !1, !1);
  }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(n) {
    dt[n] = new mt(n, 2, !1, n, null, !1, !1);
  }), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(n) {
    dt[n] = new mt(n, 3, !1, n.toLowerCase(), null, !1, !1);
  }), ["checked", "multiple", "muted", "selected"].forEach(function(n) {
    dt[n] = new mt(n, 3, !0, n, null, !1, !1);
  }), ["capture", "download"].forEach(function(n) {
    dt[n] = new mt(n, 4, !1, n, null, !1, !1);
  }), ["cols", "rows", "size", "span"].forEach(function(n) {
    dt[n] = new mt(n, 6, !1, n, null, !1, !1);
  }), ["rowSpan", "start"].forEach(function(n) {
    dt[n] = new mt(n, 5, !1, n.toLowerCase(), null, !1, !1);
  });
  var cn = /[\-:]([a-z])/g;
  function ft(n) {
    return n[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(n) {
    var r = n.replace(
      cn,
      ft
    );
    dt[r] = new mt(r, 1, !1, n, null, !1, !1);
  }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(n) {
    var r = n.replace(cn, ft);
    dt[r] = new mt(r, 1, !1, n, "http://www.w3.org/1999/xlink", !1, !1);
  }), ["xml:base", "xml:lang", "xml:space"].forEach(function(n) {
    var r = n.replace(cn, ft);
    dt[r] = new mt(r, 1, !1, n, "http://www.w3.org/XML/1998/namespace", !1, !1);
  }), ["tabIndex", "crossOrigin"].forEach(function(n) {
    dt[n] = new mt(n, 1, !1, n.toLowerCase(), null, !1, !1);
  }), dt.xlinkHref = new mt("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), ["src", "href", "action", "formAction"].forEach(function(n) {
    dt[n] = new mt(n, 1, !1, n.toLowerCase(), null, !0, !0);
  });
  function Ie(n, r, l, o) {
    var c = dt.hasOwnProperty(r) ? dt[r] : null;
    (c !== null ? c.type !== 0 : o || !(2 < r.length) || r[0] !== "o" && r[0] !== "O" || r[1] !== "n" && r[1] !== "N") && (Ye(r, l, c, o) && (l = null), o || c === null ? Ce(r) && (l === null ? n.removeAttribute(r) : n.setAttribute(r, "" + l)) : c.mustUseProperty ? n[c.propertyName] = l === null ? c.type === 3 ? !1 : "" : l : (r = c.attributeName, o = c.attributeNamespace, l === null ? n.removeAttribute(r) : (c = c.type, l = c === 3 || c === 4 && l === !0 ? "" : "" + l, o ? n.setAttributeNS(o, r, l) : n.setAttribute(r, l))));
  }
  var pt = J.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, be = Symbol.for("react.element"), ut = Symbol.for("react.portal"), Fe = Symbol.for("react.fragment"), rn = Symbol.for("react.strict_mode"), Ft = Symbol.for("react.profiler"), Kt = Symbol.for("react.provider"), an = Symbol.for("react.context"), xt = Symbol.for("react.forward_ref"), ke = Symbol.for("react.suspense"), Ut = Symbol.for("react.suspense_list"), bt = Symbol.for("react.memo"), Dt = Symbol.for("react.lazy"), Ee = Symbol.for("react.offscreen"), K = Symbol.iterator;
  function Re(n) {
    return n === null || typeof n != "object" ? null : (n = K && n[K] || n["@@iterator"], typeof n == "function" ? n : null);
  }
  var ne = Object.assign, _;
  function P(n) {
    if (_ === void 0) try {
      throw Error();
    } catch (l) {
      var r = l.stack.trim().match(/\n( *(at )?)/);
      _ = r && r[1] || "";
    }
    return `
` + _ + n;
  }
  var je = !1;
  function Ue(n, r) {
    if (!n || je) return "";
    je = !0;
    var l = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (r) if (r = function() {
        throw Error();
      }, Object.defineProperty(r.prototype, "props", { set: function() {
        throw Error();
      } }), typeof Reflect == "object" && Reflect.construct) {
        try {
          Reflect.construct(r, []);
        } catch (U) {
          var o = U;
        }
        Reflect.construct(n, [], r);
      } else {
        try {
          r.call();
        } catch (U) {
          o = U;
        }
        n.call(r.prototype);
      }
      else {
        try {
          throw Error();
        } catch (U) {
          o = U;
        }
        n();
      }
    } catch (U) {
      if (U && o && typeof U.stack == "string") {
        for (var c = U.stack.split(`
`), d = o.stack.split(`
`), m = c.length - 1, E = d.length - 1; 1 <= m && 0 <= E && c[m] !== d[E]; ) E--;
        for (; 1 <= m && 0 <= E; m--, E--) if (c[m] !== d[E]) {
          if (m !== 1 || E !== 1)
            do
              if (m--, E--, 0 > E || c[m] !== d[E]) {
                var T = `
` + c[m].replace(" at new ", " at ");
                return n.displayName && T.includes("<anonymous>") && (T = T.replace("<anonymous>", n.displayName)), T;
              }
            while (1 <= m && 0 <= E);
          break;
        }
      }
    } finally {
      je = !1, Error.prepareStackTrace = l;
    }
    return (n = n ? n.displayName || n.name : "") ? P(n) : "";
  }
  function nt(n) {
    switch (n.tag) {
      case 5:
        return P(n.type);
      case 16:
        return P("Lazy");
      case 13:
        return P("Suspense");
      case 19:
        return P("SuspenseList");
      case 0:
      case 2:
      case 15:
        return n = Ue(n.type, !1), n;
      case 11:
        return n = Ue(n.type.render, !1), n;
      case 1:
        return n = Ue(n.type, !0), n;
      default:
        return "";
    }
  }
  function Ze(n) {
    if (n == null) return null;
    if (typeof n == "function") return n.displayName || n.name || null;
    if (typeof n == "string") return n;
    switch (n) {
      case Fe:
        return "Fragment";
      case ut:
        return "Portal";
      case Ft:
        return "Profiler";
      case rn:
        return "StrictMode";
      case ke:
        return "Suspense";
      case Ut:
        return "SuspenseList";
    }
    if (typeof n == "object") switch (n.$$typeof) {
      case an:
        return (n.displayName || "Context") + ".Consumer";
      case Kt:
        return (n._context.displayName || "Context") + ".Provider";
      case xt:
        var r = n.render;
        return n = n.displayName, n || (n = r.displayName || r.name || "", n = n !== "" ? "ForwardRef(" + n + ")" : "ForwardRef"), n;
      case bt:
        return r = n.displayName || null, r !== null ? r : Ze(n.type) || "Memo";
      case Dt:
        r = n._payload, n = n._init;
        try {
          return Ze(n(r));
        } catch {
        }
    }
    return null;
  }
  function Xe(n) {
    var r = n.type;
    switch (n.tag) {
      case 24:
        return "Cache";
      case 9:
        return (r.displayName || "Context") + ".Consumer";
      case 10:
        return (r._context.displayName || "Context") + ".Provider";
      case 18:
        return "DehydratedFragment";
      case 11:
        return n = r.render, n = n.displayName || n.name || "", r.displayName || (n !== "" ? "ForwardRef(" + n + ")" : "ForwardRef");
      case 7:
        return "Fragment";
      case 5:
        return r;
      case 4:
        return "Portal";
      case 3:
        return "Root";
      case 6:
        return "Text";
      case 16:
        return Ze(r);
      case 8:
        return r === rn ? "StrictMode" : "Mode";
      case 22:
        return "Offscreen";
      case 12:
        return "Profiler";
      case 21:
        return "Scope";
      case 13:
        return "Suspense";
      case 19:
        return "SuspenseList";
      case 25:
        return "TracingMarker";
      case 1:
      case 0:
      case 17:
      case 2:
      case 14:
      case 15:
        if (typeof r == "function") return r.displayName || r.name || null;
        if (typeof r == "string") return r;
    }
    return null;
  }
  function Je(n) {
    switch (typeof n) {
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return n;
      case "object":
        return n;
      default:
        return "";
    }
  }
  function rt(n) {
    var r = n.type;
    return (n = n.nodeName) && n.toLowerCase() === "input" && (r === "checkbox" || r === "radio");
  }
  function Pt(n) {
    var r = rt(n) ? "checked" : "value", l = Object.getOwnPropertyDescriptor(n.constructor.prototype, r), o = "" + n[r];
    if (!n.hasOwnProperty(r) && typeof l < "u" && typeof l.get == "function" && typeof l.set == "function") {
      var c = l.get, d = l.set;
      return Object.defineProperty(n, r, { configurable: !0, get: function() {
        return c.call(this);
      }, set: function(m) {
        o = "" + m, d.call(this, m);
      } }), Object.defineProperty(n, r, { enumerable: l.enumerable }), { getValue: function() {
        return o;
      }, setValue: function(m) {
        o = "" + m;
      }, stopTracking: function() {
        n._valueTracker = null, delete n[r];
      } };
    }
  }
  function kn(n) {
    n._valueTracker || (n._valueTracker = Pt(n));
  }
  function wr(n) {
    if (!n) return !1;
    var r = n._valueTracker;
    if (!r) return !0;
    var l = r.getValue(), o = "";
    return n && (o = rt(n) ? n.checked ? "true" : "false" : n.value), n = o, n !== l ? (r.setValue(n), !0) : !1;
  }
  function En(n) {
    if (n = n || (typeof document < "u" ? document : void 0), typeof n > "u") return null;
    try {
      return n.activeElement || n.body;
    } catch {
      return n.body;
    }
  }
  function tr(n, r) {
    var l = r.checked;
    return ne({}, r, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: l ?? n._wrapperState.initialChecked });
  }
  function Pn(n, r) {
    var l = r.defaultValue == null ? "" : r.defaultValue, o = r.checked != null ? r.checked : r.defaultChecked;
    l = Je(r.value != null ? r.value : l), n._wrapperState = { initialChecked: o, initialValue: l, controlled: r.type === "checkbox" || r.type === "radio" ? r.checked != null : r.value != null };
  }
  function Vn(n, r) {
    r = r.checked, r != null && Ie(n, "checked", r, !1);
  }
  function $r(n, r) {
    Vn(n, r);
    var l = Je(r.value), o = r.type;
    if (l != null) o === "number" ? (l === 0 && n.value === "" || n.value != l) && (n.value = "" + l) : n.value !== "" + l && (n.value = "" + l);
    else if (o === "submit" || o === "reset") {
      n.removeAttribute("value");
      return;
    }
    r.hasOwnProperty("value") ? oa(n, r.type, l) : r.hasOwnProperty("defaultValue") && oa(n, r.type, Je(r.defaultValue)), r.checked == null && r.defaultChecked != null && (n.defaultChecked = !!r.defaultChecked);
  }
  function si(n, r, l) {
    if (r.hasOwnProperty("value") || r.hasOwnProperty("defaultValue")) {
      var o = r.type;
      if (!(o !== "submit" && o !== "reset" || r.value !== void 0 && r.value !== null)) return;
      r = "" + n._wrapperState.initialValue, l || r === n.value || (n.value = r), n.defaultValue = r;
    }
    l = n.name, l !== "" && (n.name = ""), n.defaultChecked = !!n._wrapperState.initialChecked, l !== "" && (n.name = l);
  }
  function oa(n, r, l) {
    (r !== "number" || En(n.ownerDocument) !== n) && (l == null ? n.defaultValue = "" + n._wrapperState.initialValue : n.defaultValue !== "" + l && (n.defaultValue = "" + l));
  }
  var Gn = Array.isArray;
  function Cn(n, r, l, o) {
    if (n = n.options, r) {
      r = {};
      for (var c = 0; c < l.length; c++) r["$" + l[c]] = !0;
      for (l = 0; l < n.length; l++) c = r.hasOwnProperty("$" + n[l].value), n[l].selected !== c && (n[l].selected = c), c && o && (n[l].defaultSelected = !0);
    } else {
      for (l = "" + Je(l), r = null, c = 0; c < n.length; c++) {
        if (n[c].value === l) {
          n[c].selected = !0, o && (n[c].defaultSelected = !0);
          return;
        }
        r !== null || n[c].disabled || (r = n[c]);
      }
      r !== null && (r.selected = !0);
    }
  }
  function Bn(n, r) {
    if (r.dangerouslySetInnerHTML != null) throw Error(z(91));
    return ne({}, r, { value: void 0, defaultValue: void 0, children: "" + n._wrapperState.initialValue });
  }
  function yr(n, r) {
    var l = r.value;
    if (l == null) {
      if (l = r.children, r = r.defaultValue, l != null) {
        if (r != null) throw Error(z(92));
        if (Gn(l)) {
          if (1 < l.length) throw Error(z(93));
          l = l[0];
        }
        r = l;
      }
      r == null && (r = ""), l = r;
    }
    n._wrapperState = { initialValue: Je(l) };
  }
  function Ya(n, r) {
    var l = Je(r.value), o = Je(r.defaultValue);
    l != null && (l = "" + l, l !== n.value && (n.value = l), r.defaultValue == null && n.defaultValue !== l && (n.defaultValue = l)), o != null && (n.defaultValue = "" + o);
  }
  function On(n) {
    var r = n.textContent;
    r === n._wrapperState.initialValue && r !== "" && r !== null && (n.value = r);
  }
  function gr(n) {
    switch (n) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function sa(n, r) {
    return n == null || n === "http://www.w3.org/1999/xhtml" ? gr(r) : n === "http://www.w3.org/2000/svg" && r === "foreignObject" ? "http://www.w3.org/1999/xhtml" : n;
  }
  var Ia, ci = function(n) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(r, l, o, c) {
      MSApp.execUnsafeLocalFunction(function() {
        return n(r, l, o, c);
      });
    } : n;
  }(function(n, r) {
    if (n.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in n) n.innerHTML = r;
    else {
      for (Ia = Ia || document.createElement("div"), Ia.innerHTML = "<svg>" + r.valueOf().toString() + "</svg>", r = Ia.firstChild; n.firstChild; ) n.removeChild(n.firstChild);
      for (; r.firstChild; ) n.appendChild(r.firstChild);
    }
  });
  function Z(n, r) {
    if (r) {
      var l = n.firstChild;
      if (l && l === n.lastChild && l.nodeType === 3) {
        l.nodeValue = r;
        return;
      }
    }
    n.textContent = r;
  }
  var Te = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0
  }, et = ["Webkit", "ms", "Moz", "O"];
  Object.keys(Te).forEach(function(n) {
    et.forEach(function(r) {
      r = r + n.charAt(0).toUpperCase() + n.substring(1), Te[r] = Te[n];
    });
  });
  function At(n, r, l) {
    return r == null || typeof r == "boolean" || r === "" ? "" : l || typeof r != "number" || r === 0 || Te.hasOwnProperty(n) && Te[n] ? ("" + r).trim() : r + "px";
  }
  function Zt(n, r) {
    n = n.style;
    for (var l in r) if (r.hasOwnProperty(l)) {
      var o = l.indexOf("--") === 0, c = At(l, r[l], o);
      l === "float" && (l = "cssFloat"), o ? n.setProperty(l, c) : n[l] = c;
    }
  }
  var pn = ne({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
  function ln(n, r) {
    if (r) {
      if (pn[n] && (r.children != null || r.dangerouslySetInnerHTML != null)) throw Error(z(137, n));
      if (r.dangerouslySetInnerHTML != null) {
        if (r.children != null) throw Error(z(60));
        if (typeof r.dangerouslySetInnerHTML != "object" || !("__html" in r.dangerouslySetInnerHTML)) throw Error(z(61));
      }
      if (r.style != null && typeof r.style != "object") throw Error(z(62));
    }
  }
  function qn(n, r) {
    if (n.indexOf("-") === -1) return typeof r.is == "string";
    switch (n) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var Jt = null;
  function Bt(n) {
    return n = n.target || n.srcElement || window, n.correspondingUseElement && (n = n.correspondingUseElement), n.nodeType === 3 ? n.parentNode : n;
  }
  var $t = null, ca = null, Sr = null;
  function Ta(n) {
    if (n = _e(n)) {
      if (typeof $t != "function") throw Error(z(280));
      var r = n.stateNode;
      r && (r = hn(r), $t(n.stateNode, n.type, r));
    }
  }
  function ji(n) {
    ca ? Sr ? Sr.push(n) : Sr = [n] : ca = n;
  }
  function Zl() {
    if (ca) {
      var n = ca, r = Sr;
      if (Sr = ca = null, Ta(n), r) for (n = 0; n < r.length; n++) Ta(r[n]);
    }
  }
  function Jl(n, r) {
    return n(r);
  }
  function dl() {
  }
  var pl = !1;
  function eu(n, r, l) {
    if (pl) return n(r, l);
    pl = !0;
    try {
      return Jl(n, r, l);
    } finally {
      pl = !1, (ca !== null || Sr !== null) && (dl(), Zl());
    }
  }
  function xr(n, r) {
    var l = n.stateNode;
    if (l === null) return null;
    var o = hn(l);
    if (o === null) return null;
    l = o[r];
    e: switch (r) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (o = !o.disabled) || (n = n.type, o = !(n === "button" || n === "input" || n === "select" || n === "textarea")), n = !o;
        break e;
      default:
        n = !1;
    }
    if (n) return null;
    if (l && typeof l != "function") throw Error(z(231, r, typeof l));
    return l;
  }
  var br = !1;
  if (Vt) try {
    var nr = {};
    Object.defineProperty(nr, "passive", { get: function() {
      br = !0;
    } }), window.addEventListener("test", nr, nr), window.removeEventListener("test", nr, nr);
  } catch {
    br = !1;
  }
  function fi(n, r, l, o, c, d, m, E, T) {
    var U = Array.prototype.slice.call(arguments, 3);
    try {
      r.apply(l, U);
    } catch (I) {
      this.onError(I);
    }
  }
  var Qa = !1, di = null, pi = !1, R = null, B = { onError: function(n) {
    Qa = !0, di = n;
  } };
  function ae(n, r, l, o, c, d, m, E, T) {
    Qa = !1, di = null, fi.apply(B, arguments);
  }
  function he(n, r, l, o, c, d, m, E, T) {
    if (ae.apply(this, arguments), Qa) {
      if (Qa) {
        var U = di;
        Qa = !1, di = null;
      } else throw Error(z(198));
      pi || (pi = !0, R = U);
    }
  }
  function We(n) {
    var r = n, l = n;
    if (n.alternate) for (; r.return; ) r = r.return;
    else {
      n = r;
      do
        r = n, r.flags & 4098 && (l = r.return), n = r.return;
      while (n);
    }
    return r.tag === 3 ? l : null;
  }
  function Be(n) {
    if (n.tag === 13) {
      var r = n.memoizedState;
      if (r === null && (n = n.alternate, n !== null && (r = n.memoizedState)), r !== null) return r.dehydrated;
    }
    return null;
  }
  function ot(n) {
    if (We(n) !== n) throw Error(z(188));
  }
  function at(n) {
    var r = n.alternate;
    if (!r) {
      if (r = We(n), r === null) throw Error(z(188));
      return r !== n ? null : n;
    }
    for (var l = n, o = r; ; ) {
      var c = l.return;
      if (c === null) break;
      var d = c.alternate;
      if (d === null) {
        if (o = c.return, o !== null) {
          l = o;
          continue;
        }
        break;
      }
      if (c.child === d.child) {
        for (d = c.child; d; ) {
          if (d === l) return ot(c), n;
          if (d === o) return ot(c), r;
          d = d.sibling;
        }
        throw Error(z(188));
      }
      if (l.return !== o.return) l = c, o = d;
      else {
        for (var m = !1, E = c.child; E; ) {
          if (E === l) {
            m = !0, l = c, o = d;
            break;
          }
          if (E === o) {
            m = !0, o = c, l = d;
            break;
          }
          E = E.sibling;
        }
        if (!m) {
          for (E = d.child; E; ) {
            if (E === l) {
              m = !0, l = d, o = c;
              break;
            }
            if (E === o) {
              m = !0, o = d, l = c;
              break;
            }
            E = E.sibling;
          }
          if (!m) throw Error(z(189));
        }
      }
      if (l.alternate !== o) throw Error(z(190));
    }
    if (l.tag !== 3) throw Error(z(188));
    return l.stateNode.current === l ? n : r;
  }
  function Rn(n) {
    return n = at(n), n !== null ? en(n) : null;
  }
  function en(n) {
    if (n.tag === 5 || n.tag === 6) return n;
    for (n = n.child; n !== null; ) {
      var r = en(n);
      if (r !== null) return r;
      n = n.sibling;
    }
    return null;
  }
  var un = W.unstable_scheduleCallback, rr = W.unstable_cancelCallback, Wa = W.unstable_shouldYield, Ga = W.unstable_requestPaint, Ge = W.unstable_now, Ke = W.unstable_getCurrentPriorityLevel, qa = W.unstable_ImmediatePriority, tu = W.unstable_UserBlockingPriority, nu = W.unstable_NormalPriority, vl = W.unstable_LowPriority, Qu = W.unstable_IdlePriority, hl = null, Yr = null;
  function Yo(n) {
    if (Yr && typeof Yr.onCommitFiberRoot == "function") try {
      Yr.onCommitFiberRoot(hl, n, void 0, (n.current.flags & 128) === 128);
    } catch {
    }
  }
  var _r = Math.clz32 ? Math.clz32 : Wu, ic = Math.log, lc = Math.LN2;
  function Wu(n) {
    return n >>>= 0, n === 0 ? 32 : 31 - (ic(n) / lc | 0) | 0;
  }
  var ml = 64, fa = 4194304;
  function Xa(n) {
    switch (n & -n) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return n & 4194240;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return n & 130023424;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 1073741824;
      default:
        return n;
    }
  }
  function Ka(n, r) {
    var l = n.pendingLanes;
    if (l === 0) return 0;
    var o = 0, c = n.suspendedLanes, d = n.pingedLanes, m = l & 268435455;
    if (m !== 0) {
      var E = m & ~c;
      E !== 0 ? o = Xa(E) : (d &= m, d !== 0 && (o = Xa(d)));
    } else m = l & ~c, m !== 0 ? o = Xa(m) : d !== 0 && (o = Xa(d));
    if (o === 0) return 0;
    if (r !== 0 && r !== o && !(r & c) && (c = o & -o, d = r & -r, c >= d || c === 16 && (d & 4194240) !== 0)) return r;
    if (o & 4 && (o |= l & 16), r = n.entangledLanes, r !== 0) for (n = n.entanglements, r &= o; 0 < r; ) l = 31 - _r(r), c = 1 << l, o |= n[l], r &= ~c;
    return o;
  }
  function Gu(n, r) {
    switch (n) {
      case 1:
      case 2:
      case 4:
        return r + 250;
      case 8:
      case 16:
      case 32:
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return r + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return -1;
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function ru(n, r) {
    for (var l = n.suspendedLanes, o = n.pingedLanes, c = n.expirationTimes, d = n.pendingLanes; 0 < d; ) {
      var m = 31 - _r(d), E = 1 << m, T = c[m];
      T === -1 ? (!(E & l) || E & o) && (c[m] = Gu(E, r)) : T <= r && (n.expiredLanes |= E), d &= ~E;
    }
  }
  function yl(n) {
    return n = n.pendingLanes & -1073741825, n !== 0 ? n : n & 1073741824 ? 1073741824 : 0;
  }
  function qu() {
    var n = ml;
    return ml <<= 1, !(ml & 4194240) && (ml = 64), n;
  }
  function Xu(n) {
    for (var r = [], l = 0; 31 > l; l++) r.push(n);
    return r;
  }
  function Hi(n, r, l) {
    n.pendingLanes |= r, r !== 536870912 && (n.suspendedLanes = 0, n.pingedLanes = 0), n = n.eventTimes, r = 31 - _r(r), n[r] = l;
  }
  function If(n, r) {
    var l = n.pendingLanes & ~r;
    n.pendingLanes = r, n.suspendedLanes = 0, n.pingedLanes = 0, n.expiredLanes &= r, n.mutableReadLanes &= r, n.entangledLanes &= r, r = n.entanglements;
    var o = n.eventTimes;
    for (n = n.expirationTimes; 0 < l; ) {
      var c = 31 - _r(l), d = 1 << c;
      r[c] = 0, o[c] = -1, n[c] = -1, l &= ~d;
    }
  }
  function Pi(n, r) {
    var l = n.entangledLanes |= r;
    for (n = n.entanglements; l; ) {
      var o = 31 - _r(l), c = 1 << o;
      c & r | n[o] & r && (n[o] |= r), l &= ~c;
    }
  }
  var kt = 0;
  function Ku(n) {
    return n &= -n, 1 < n ? 4 < n ? n & 268435455 ? 16 : 536870912 : 4 : 1;
  }
  var Tt, Io, vi, Ve, Zu, ar = !1, hi = [], Dr = null, mi = null, on = null, Yt = /* @__PURE__ */ new Map(), gl = /* @__PURE__ */ new Map(), $n = [], kr = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function wa(n, r) {
    switch (n) {
      case "focusin":
      case "focusout":
        Dr = null;
        break;
      case "dragenter":
      case "dragleave":
        mi = null;
        break;
      case "mouseover":
      case "mouseout":
        on = null;
        break;
      case "pointerover":
      case "pointerout":
        Yt.delete(r.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        gl.delete(r.pointerId);
    }
  }
  function au(n, r, l, o, c, d) {
    return n === null || n.nativeEvent !== d ? (n = { blockedOn: r, domEventName: l, eventSystemFlags: o, nativeEvent: d, targetContainers: [c] }, r !== null && (r = _e(r), r !== null && Io(r)), n) : (n.eventSystemFlags |= o, r = n.targetContainers, c !== null && r.indexOf(c) === -1 && r.push(c), n);
  }
  function Qo(n, r, l, o, c) {
    switch (r) {
      case "focusin":
        return Dr = au(Dr, n, r, l, o, c), !0;
      case "dragenter":
        return mi = au(mi, n, r, l, o, c), !0;
      case "mouseover":
        return on = au(on, n, r, l, o, c), !0;
      case "pointerover":
        var d = c.pointerId;
        return Yt.set(d, au(Yt.get(d) || null, n, r, l, o, c)), !0;
      case "gotpointercapture":
        return d = c.pointerId, gl.set(d, au(gl.get(d) || null, n, r, l, o, c)), !0;
    }
    return !1;
  }
  function Wo(n) {
    var r = pu(n.target);
    if (r !== null) {
      var l = We(r);
      if (l !== null) {
        if (r = l.tag, r === 13) {
          if (r = Be(l), r !== null) {
            n.blockedOn = r, Zu(n.priority, function() {
              vi(l);
            });
            return;
          }
        } else if (r === 3 && l.stateNode.current.memoizedState.isDehydrated) {
          n.blockedOn = l.tag === 3 ? l.stateNode.containerInfo : null;
          return;
        }
      }
    }
    n.blockedOn = null;
  }
  function Sl(n) {
    if (n.blockedOn !== null) return !1;
    for (var r = n.targetContainers; 0 < r.length; ) {
      var l = to(n.domEventName, n.eventSystemFlags, r[0], n.nativeEvent);
      if (l === null) {
        l = n.nativeEvent;
        var o = new l.constructor(l.type, l);
        Jt = o, l.target.dispatchEvent(o), Jt = null;
      } else return r = _e(l), r !== null && Io(r), n.blockedOn = l, !1;
      r.shift();
    }
    return !0;
  }
  function iu(n, r, l) {
    Sl(n) && l.delete(r);
  }
  function Qf() {
    ar = !1, Dr !== null && Sl(Dr) && (Dr = null), mi !== null && Sl(mi) && (mi = null), on !== null && Sl(on) && (on = null), Yt.forEach(iu), gl.forEach(iu);
  }
  function xa(n, r) {
    n.blockedOn === r && (n.blockedOn = null, ar || (ar = !0, W.unstable_scheduleCallback(W.unstable_NormalPriority, Qf)));
  }
  function Za(n) {
    function r(c) {
      return xa(c, n);
    }
    if (0 < hi.length) {
      xa(hi[0], n);
      for (var l = 1; l < hi.length; l++) {
        var o = hi[l];
        o.blockedOn === n && (o.blockedOn = null);
      }
    }
    for (Dr !== null && xa(Dr, n), mi !== null && xa(mi, n), on !== null && xa(on, n), Yt.forEach(r), gl.forEach(r), l = 0; l < $n.length; l++) o = $n[l], o.blockedOn === n && (o.blockedOn = null);
    for (; 0 < $n.length && (l = $n[0], l.blockedOn === null); ) Wo(l), l.blockedOn === null && $n.shift();
  }
  var yi = pt.ReactCurrentBatchConfig, ba = !0;
  function Ju(n, r, l, o) {
    var c = kt, d = yi.transition;
    yi.transition = null;
    try {
      kt = 1, El(n, r, l, o);
    } finally {
      kt = c, yi.transition = d;
    }
  }
  function eo(n, r, l, o) {
    var c = kt, d = yi.transition;
    yi.transition = null;
    try {
      kt = 4, El(n, r, l, o);
    } finally {
      kt = c, yi.transition = d;
    }
  }
  function El(n, r, l, o) {
    if (ba) {
      var c = to(n, r, l, o);
      if (c === null) gc(n, r, o, lu, l), wa(n, o);
      else if (Qo(c, n, r, l, o)) o.stopPropagation();
      else if (wa(n, o), r & 4 && -1 < kr.indexOf(n)) {
        for (; c !== null; ) {
          var d = _e(c);
          if (d !== null && Tt(d), d = to(n, r, l, o), d === null && gc(n, r, o, lu, l), d === c) break;
          c = d;
        }
        c !== null && o.stopPropagation();
      } else gc(n, r, o, null, l);
    }
  }
  var lu = null;
  function to(n, r, l, o) {
    if (lu = null, n = Bt(o), n = pu(n), n !== null) if (r = We(n), r === null) n = null;
    else if (l = r.tag, l === 13) {
      if (n = Be(r), n !== null) return n;
      n = null;
    } else if (l === 3) {
      if (r.stateNode.current.memoizedState.isDehydrated) return r.tag === 3 ? r.stateNode.containerInfo : null;
      n = null;
    } else r !== n && (n = null);
    return lu = n, null;
  }
  function no(n) {
    switch (n) {
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 1;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "toggle":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 4;
      case "message":
        switch (Ke()) {
          case qa:
            return 1;
          case tu:
            return 4;
          case nu:
          case vl:
            return 16;
          case Qu:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var Ja = null, h = null, C = null;
  function N() {
    if (C) return C;
    var n, r = h, l = r.length, o, c = "value" in Ja ? Ja.value : Ja.textContent, d = c.length;
    for (n = 0; n < l && r[n] === c[n]; n++) ;
    var m = l - n;
    for (o = 1; o <= m && r[l - o] === c[d - o]; o++) ;
    return C = c.slice(n, 1 < o ? 1 - o : void 0);
  }
  function F(n) {
    var r = n.keyCode;
    return "charCode" in n ? (n = n.charCode, n === 0 && r === 13 && (n = 13)) : n = r, n === 10 && (n = 13), 32 <= n || n === 13 ? n : 0;
  }
  function X() {
    return !0;
  }
  function Oe() {
    return !1;
  }
  function re(n) {
    function r(l, o, c, d, m) {
      this._reactName = l, this._targetInst = c, this.type = o, this.nativeEvent = d, this.target = m, this.currentTarget = null;
      for (var E in n) n.hasOwnProperty(E) && (l = n[E], this[E] = l ? l(d) : d[E]);
      return this.isDefaultPrevented = (d.defaultPrevented != null ? d.defaultPrevented : d.returnValue === !1) ? X : Oe, this.isPropagationStopped = Oe, this;
    }
    return ne(r.prototype, { preventDefault: function() {
      this.defaultPrevented = !0;
      var l = this.nativeEvent;
      l && (l.preventDefault ? l.preventDefault() : typeof l.returnValue != "unknown" && (l.returnValue = !1), this.isDefaultPrevented = X);
    }, stopPropagation: function() {
      var l = this.nativeEvent;
      l && (l.stopPropagation ? l.stopPropagation() : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0), this.isPropagationStopped = X);
    }, persist: function() {
    }, isPersistent: X }), r;
  }
  var Ne = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(n) {
    return n.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, st = re(Ne), wt = ne({}, Ne, { view: 0, detail: 0 }), tn = re(wt), It, tt, Qt, vn = ne({}, wt, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Kf, button: 0, buttons: 0, relatedTarget: function(n) {
    return n.relatedTarget === void 0 ? n.fromElement === n.srcElement ? n.toElement : n.fromElement : n.relatedTarget;
  }, movementX: function(n) {
    return "movementX" in n ? n.movementX : (n !== Qt && (Qt && n.type === "mousemove" ? (It = n.screenX - Qt.screenX, tt = n.screenY - Qt.screenY) : tt = It = 0, Qt = n), It);
  }, movementY: function(n) {
    return "movementY" in n ? n.movementY : tt;
  } }), Cl = re(vn), Go = ne({}, vn, { dataTransfer: 0 }), Vi = re(Go), qo = ne({}, wt, { relatedTarget: 0 }), uu = re(qo), Wf = ne({}, Ne, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), uc = re(Wf), Gf = ne({}, Ne, { clipboardData: function(n) {
    return "clipboardData" in n ? n.clipboardData : window.clipboardData;
  } }), ev = re(Gf), qf = ne({}, Ne, { data: 0 }), Xf = re(qf), tv = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, nv = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, Wm = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function Bi(n) {
    var r = this.nativeEvent;
    return r.getModifierState ? r.getModifierState(n) : (n = Wm[n]) ? !!r[n] : !1;
  }
  function Kf() {
    return Bi;
  }
  var Zf = ne({}, wt, { key: function(n) {
    if (n.key) {
      var r = tv[n.key] || n.key;
      if (r !== "Unidentified") return r;
    }
    return n.type === "keypress" ? (n = F(n), n === 13 ? "Enter" : String.fromCharCode(n)) : n.type === "keydown" || n.type === "keyup" ? nv[n.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Kf, charCode: function(n) {
    return n.type === "keypress" ? F(n) : 0;
  }, keyCode: function(n) {
    return n.type === "keydown" || n.type === "keyup" ? n.keyCode : 0;
  }, which: function(n) {
    return n.type === "keypress" ? F(n) : n.type === "keydown" || n.type === "keyup" ? n.keyCode : 0;
  } }), Jf = re(Zf), ed = ne({}, vn, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), rv = re(ed), oc = ne({}, wt, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Kf }), av = re(oc), Ir = ne({}, Ne, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), $i = re(Ir), Ln = ne({}, vn, {
    deltaX: function(n) {
      return "deltaX" in n ? n.deltaX : "wheelDeltaX" in n ? -n.wheelDeltaX : 0;
    },
    deltaY: function(n) {
      return "deltaY" in n ? n.deltaY : "wheelDeltaY" in n ? -n.wheelDeltaY : "wheelDelta" in n ? -n.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Yi = re(Ln), td = [9, 13, 27, 32], ro = Vt && "CompositionEvent" in window, Xo = null;
  Vt && "documentMode" in document && (Xo = document.documentMode);
  var Ko = Vt && "TextEvent" in window && !Xo, iv = Vt && (!ro || Xo && 8 < Xo && 11 >= Xo), lv = " ", sc = !1;
  function uv(n, r) {
    switch (n) {
      case "keyup":
        return td.indexOf(r.keyCode) !== -1;
      case "keydown":
        return r.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function ov(n) {
    return n = n.detail, typeof n == "object" && "data" in n ? n.data : null;
  }
  var ao = !1;
  function sv(n, r) {
    switch (n) {
      case "compositionend":
        return ov(r);
      case "keypress":
        return r.which !== 32 ? null : (sc = !0, lv);
      case "textInput":
        return n = r.data, n === lv && sc ? null : n;
      default:
        return null;
    }
  }
  function Gm(n, r) {
    if (ao) return n === "compositionend" || !ro && uv(n, r) ? (n = N(), C = h = Ja = null, ao = !1, n) : null;
    switch (n) {
      case "paste":
        return null;
      case "keypress":
        if (!(r.ctrlKey || r.altKey || r.metaKey) || r.ctrlKey && r.altKey) {
          if (r.char && 1 < r.char.length) return r.char;
          if (r.which) return String.fromCharCode(r.which);
        }
        return null;
      case "compositionend":
        return iv && r.locale !== "ko" ? null : r.data;
      default:
        return null;
    }
  }
  var qm = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
  function cv(n) {
    var r = n && n.nodeName && n.nodeName.toLowerCase();
    return r === "input" ? !!qm[n.type] : r === "textarea";
  }
  function nd(n, r, l, o) {
    ji(o), r = rs(r, "onChange"), 0 < r.length && (l = new st("onChange", "change", null, l, o), n.push({ event: l, listeners: r }));
  }
  var gi = null, ou = null;
  function fv(n) {
    fu(n, 0);
  }
  function Zo(n) {
    var r = ti(n);
    if (wr(r)) return n;
  }
  function Xm(n, r) {
    if (n === "change") return r;
  }
  var dv = !1;
  if (Vt) {
    var rd;
    if (Vt) {
      var ad = "oninput" in document;
      if (!ad) {
        var pv = document.createElement("div");
        pv.setAttribute("oninput", "return;"), ad = typeof pv.oninput == "function";
      }
      rd = ad;
    } else rd = !1;
    dv = rd && (!document.documentMode || 9 < document.documentMode);
  }
  function vv() {
    gi && (gi.detachEvent("onpropertychange", hv), ou = gi = null);
  }
  function hv(n) {
    if (n.propertyName === "value" && Zo(ou)) {
      var r = [];
      nd(r, ou, n, Bt(n)), eu(fv, r);
    }
  }
  function Km(n, r, l) {
    n === "focusin" ? (vv(), gi = r, ou = l, gi.attachEvent("onpropertychange", hv)) : n === "focusout" && vv();
  }
  function mv(n) {
    if (n === "selectionchange" || n === "keyup" || n === "keydown") return Zo(ou);
  }
  function Zm(n, r) {
    if (n === "click") return Zo(r);
  }
  function yv(n, r) {
    if (n === "input" || n === "change") return Zo(r);
  }
  function Jm(n, r) {
    return n === r && (n !== 0 || 1 / n === 1 / r) || n !== n && r !== r;
  }
  var ei = typeof Object.is == "function" ? Object.is : Jm;
  function Jo(n, r) {
    if (ei(n, r)) return !0;
    if (typeof n != "object" || n === null || typeof r != "object" || r === null) return !1;
    var l = Object.keys(n), o = Object.keys(r);
    if (l.length !== o.length) return !1;
    for (o = 0; o < l.length; o++) {
      var c = l[o];
      if (!de.call(r, c) || !ei(n[c], r[c])) return !1;
    }
    return !0;
  }
  function gv(n) {
    for (; n && n.firstChild; ) n = n.firstChild;
    return n;
  }
  function cc(n, r) {
    var l = gv(n);
    n = 0;
    for (var o; l; ) {
      if (l.nodeType === 3) {
        if (o = n + l.textContent.length, n <= r && o >= r) return { node: l, offset: r - n };
        n = o;
      }
      e: {
        for (; l; ) {
          if (l.nextSibling) {
            l = l.nextSibling;
            break e;
          }
          l = l.parentNode;
        }
        l = void 0;
      }
      l = gv(l);
    }
  }
  function Rl(n, r) {
    return n && r ? n === r ? !0 : n && n.nodeType === 3 ? !1 : r && r.nodeType === 3 ? Rl(n, r.parentNode) : "contains" in n ? n.contains(r) : n.compareDocumentPosition ? !!(n.compareDocumentPosition(r) & 16) : !1 : !1;
  }
  function es() {
    for (var n = window, r = En(); r instanceof n.HTMLIFrameElement; ) {
      try {
        var l = typeof r.contentWindow.location.href == "string";
      } catch {
        l = !1;
      }
      if (l) n = r.contentWindow;
      else break;
      r = En(n.document);
    }
    return r;
  }
  function fc(n) {
    var r = n && n.nodeName && n.nodeName.toLowerCase();
    return r && (r === "input" && (n.type === "text" || n.type === "search" || n.type === "tel" || n.type === "url" || n.type === "password") || r === "textarea" || n.contentEditable === "true");
  }
  function io(n) {
    var r = es(), l = n.focusedElem, o = n.selectionRange;
    if (r !== l && l && l.ownerDocument && Rl(l.ownerDocument.documentElement, l)) {
      if (o !== null && fc(l)) {
        if (r = o.start, n = o.end, n === void 0 && (n = r), "selectionStart" in l) l.selectionStart = r, l.selectionEnd = Math.min(n, l.value.length);
        else if (n = (r = l.ownerDocument || document) && r.defaultView || window, n.getSelection) {
          n = n.getSelection();
          var c = l.textContent.length, d = Math.min(o.start, c);
          o = o.end === void 0 ? d : Math.min(o.end, c), !n.extend && d > o && (c = o, o = d, d = c), c = cc(l, d);
          var m = cc(
            l,
            o
          );
          c && m && (n.rangeCount !== 1 || n.anchorNode !== c.node || n.anchorOffset !== c.offset || n.focusNode !== m.node || n.focusOffset !== m.offset) && (r = r.createRange(), r.setStart(c.node, c.offset), n.removeAllRanges(), d > o ? (n.addRange(r), n.extend(m.node, m.offset)) : (r.setEnd(m.node, m.offset), n.addRange(r)));
        }
      }
      for (r = [], n = l; n = n.parentNode; ) n.nodeType === 1 && r.push({ element: n, left: n.scrollLeft, top: n.scrollTop });
      for (typeof l.focus == "function" && l.focus(), l = 0; l < r.length; l++) n = r[l], n.element.scrollLeft = n.left, n.element.scrollTop = n.top;
    }
  }
  var ey = Vt && "documentMode" in document && 11 >= document.documentMode, lo = null, id = null, ts = null, ld = !1;
  function ud(n, r, l) {
    var o = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    ld || lo == null || lo !== En(o) || (o = lo, "selectionStart" in o && fc(o) ? o = { start: o.selectionStart, end: o.selectionEnd } : (o = (o.ownerDocument && o.ownerDocument.defaultView || window).getSelection(), o = { anchorNode: o.anchorNode, anchorOffset: o.anchorOffset, focusNode: o.focusNode, focusOffset: o.focusOffset }), ts && Jo(ts, o) || (ts = o, o = rs(id, "onSelect"), 0 < o.length && (r = new st("onSelect", "select", null, r, l), n.push({ event: r, listeners: o }), r.target = lo)));
  }
  function dc(n, r) {
    var l = {};
    return l[n.toLowerCase()] = r.toLowerCase(), l["Webkit" + n] = "webkit" + r, l["Moz" + n] = "moz" + r, l;
  }
  var su = { animationend: dc("Animation", "AnimationEnd"), animationiteration: dc("Animation", "AnimationIteration"), animationstart: dc("Animation", "AnimationStart"), transitionend: dc("Transition", "TransitionEnd") }, ir = {}, od = {};
  Vt && (od = document.createElement("div").style, "AnimationEvent" in window || (delete su.animationend.animation, delete su.animationiteration.animation, delete su.animationstart.animation), "TransitionEvent" in window || delete su.transitionend.transition);
  function pc(n) {
    if (ir[n]) return ir[n];
    if (!su[n]) return n;
    var r = su[n], l;
    for (l in r) if (r.hasOwnProperty(l) && l in od) return ir[n] = r[l];
    return n;
  }
  var Sv = pc("animationend"), Ev = pc("animationiteration"), Cv = pc("animationstart"), Rv = pc("transitionend"), sd = /* @__PURE__ */ new Map(), vc = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function _a(n, r) {
    sd.set(n, r), Rt(r, [n]);
  }
  for (var cd = 0; cd < vc.length; cd++) {
    var cu = vc[cd], ty = cu.toLowerCase(), ny = cu[0].toUpperCase() + cu.slice(1);
    _a(ty, "on" + ny);
  }
  _a(Sv, "onAnimationEnd"), _a(Ev, "onAnimationIteration"), _a(Cv, "onAnimationStart"), _a("dblclick", "onDoubleClick"), _a("focusin", "onFocus"), _a("focusout", "onBlur"), _a(Rv, "onTransitionEnd"), S("onMouseEnter", ["mouseout", "mouseover"]), S("onMouseLeave", ["mouseout", "mouseover"]), S("onPointerEnter", ["pointerout", "pointerover"]), S("onPointerLeave", ["pointerout", "pointerover"]), Rt("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), Rt("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), Rt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), Rt("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), Rt("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), Rt("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var ns = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), fd = new Set("cancel close invalid load scroll toggle".split(" ").concat(ns));
  function hc(n, r, l) {
    var o = n.type || "unknown-event";
    n.currentTarget = l, he(o, r, void 0, n), n.currentTarget = null;
  }
  function fu(n, r) {
    r = (r & 4) !== 0;
    for (var l = 0; l < n.length; l++) {
      var o = n[l], c = o.event;
      o = o.listeners;
      e: {
        var d = void 0;
        if (r) for (var m = o.length - 1; 0 <= m; m--) {
          var E = o[m], T = E.instance, U = E.currentTarget;
          if (E = E.listener, T !== d && c.isPropagationStopped()) break e;
          hc(c, E, U), d = T;
        }
        else for (m = 0; m < o.length; m++) {
          if (E = o[m], T = E.instance, U = E.currentTarget, E = E.listener, T !== d && c.isPropagationStopped()) break e;
          hc(c, E, U), d = T;
        }
      }
    }
    if (pi) throw n = R, pi = !1, R = null, n;
  }
  function jt(n, r) {
    var l = r[ls];
    l === void 0 && (l = r[ls] = /* @__PURE__ */ new Set());
    var o = n + "__bubble";
    l.has(o) || (Tv(r, n, 2, !1), l.add(o));
  }
  function mc(n, r, l) {
    var o = 0;
    r && (o |= 4), Tv(l, n, o, r);
  }
  var yc = "_reactListening" + Math.random().toString(36).slice(2);
  function uo(n) {
    if (!n[yc]) {
      n[yc] = !0, ct.forEach(function(l) {
        l !== "selectionchange" && (fd.has(l) || mc(l, !1, n), mc(l, !0, n));
      });
      var r = n.nodeType === 9 ? n : n.ownerDocument;
      r === null || r[yc] || (r[yc] = !0, mc("selectionchange", !1, r));
    }
  }
  function Tv(n, r, l, o) {
    switch (no(r)) {
      case 1:
        var c = Ju;
        break;
      case 4:
        c = eo;
        break;
      default:
        c = El;
    }
    l = c.bind(null, r, l, n), c = void 0, !br || r !== "touchstart" && r !== "touchmove" && r !== "wheel" || (c = !0), o ? c !== void 0 ? n.addEventListener(r, l, { capture: !0, passive: c }) : n.addEventListener(r, l, !0) : c !== void 0 ? n.addEventListener(r, l, { passive: c }) : n.addEventListener(r, l, !1);
  }
  function gc(n, r, l, o, c) {
    var d = o;
    if (!(r & 1) && !(r & 2) && o !== null) e: for (; ; ) {
      if (o === null) return;
      var m = o.tag;
      if (m === 3 || m === 4) {
        var E = o.stateNode.containerInfo;
        if (E === c || E.nodeType === 8 && E.parentNode === c) break;
        if (m === 4) for (m = o.return; m !== null; ) {
          var T = m.tag;
          if ((T === 3 || T === 4) && (T = m.stateNode.containerInfo, T === c || T.nodeType === 8 && T.parentNode === c)) return;
          m = m.return;
        }
        for (; E !== null; ) {
          if (m = pu(E), m === null) return;
          if (T = m.tag, T === 5 || T === 6) {
            o = d = m;
            continue e;
          }
          E = E.parentNode;
        }
      }
      o = o.return;
    }
    eu(function() {
      var U = d, I = Bt(l), G = [];
      e: {
        var Y = sd.get(n);
        if (Y !== void 0) {
          var se = st, me = n;
          switch (n) {
            case "keypress":
              if (F(l) === 0) break e;
            case "keydown":
            case "keyup":
              se = Jf;
              break;
            case "focusin":
              me = "focus", se = uu;
              break;
            case "focusout":
              me = "blur", se = uu;
              break;
            case "beforeblur":
            case "afterblur":
              se = uu;
              break;
            case "click":
              if (l.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              se = Cl;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              se = Vi;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              se = av;
              break;
            case Sv:
            case Ev:
            case Cv:
              se = uc;
              break;
            case Rv:
              se = $i;
              break;
            case "scroll":
              se = tn;
              break;
            case "wheel":
              se = Yi;
              break;
            case "copy":
            case "cut":
            case "paste":
              se = ev;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              se = rv;
          }
          var Se = (r & 4) !== 0, _n = !Se && n === "scroll", D = Se ? Y !== null ? Y + "Capture" : null : Y;
          Se = [];
          for (var x = U, L; x !== null; ) {
            L = x;
            var Q = L.stateNode;
            if (L.tag === 5 && Q !== null && (L = Q, D !== null && (Q = xr(x, D), Q != null && Se.push(oo(x, Q, L)))), _n) break;
            x = x.return;
          }
          0 < Se.length && (Y = new se(Y, me, null, l, I), G.push({ event: Y, listeners: Se }));
        }
      }
      if (!(r & 7)) {
        e: {
          if (Y = n === "mouseover" || n === "pointerover", se = n === "mouseout" || n === "pointerout", Y && l !== Jt && (me = l.relatedTarget || l.fromElement) && (pu(me) || me[Ii])) break e;
          if ((se || Y) && (Y = I.window === I ? I : (Y = I.ownerDocument) ? Y.defaultView || Y.parentWindow : window, se ? (me = l.relatedTarget || l.toElement, se = U, me = me ? pu(me) : null, me !== null && (_n = We(me), me !== _n || me.tag !== 5 && me.tag !== 6) && (me = null)) : (se = null, me = U), se !== me)) {
            if (Se = Cl, Q = "onMouseLeave", D = "onMouseEnter", x = "mouse", (n === "pointerout" || n === "pointerover") && (Se = rv, Q = "onPointerLeave", D = "onPointerEnter", x = "pointer"), _n = se == null ? Y : ti(se), L = me == null ? Y : ti(me), Y = new Se(Q, x + "leave", se, l, I), Y.target = _n, Y.relatedTarget = L, Q = null, pu(I) === U && (Se = new Se(D, x + "enter", me, l, I), Se.target = L, Se.relatedTarget = _n, Q = Se), _n = Q, se && me) t: {
              for (Se = se, D = me, x = 0, L = Se; L; L = Tl(L)) x++;
              for (L = 0, Q = D; Q; Q = Tl(Q)) L++;
              for (; 0 < x - L; ) Se = Tl(Se), x--;
              for (; 0 < L - x; ) D = Tl(D), L--;
              for (; x--; ) {
                if (Se === D || D !== null && Se === D.alternate) break t;
                Se = Tl(Se), D = Tl(D);
              }
              Se = null;
            }
            else Se = null;
            se !== null && wv(G, Y, se, Se, !1), me !== null && _n !== null && wv(G, _n, me, Se, !0);
          }
        }
        e: {
          if (Y = U ? ti(U) : window, se = Y.nodeName && Y.nodeName.toLowerCase(), se === "select" || se === "input" && Y.type === "file") var ye = Xm;
          else if (cv(Y)) if (dv) ye = yv;
          else {
            ye = mv;
            var Me = Km;
          }
          else (se = Y.nodeName) && se.toLowerCase() === "input" && (Y.type === "checkbox" || Y.type === "radio") && (ye = Zm);
          if (ye && (ye = ye(n, U))) {
            nd(G, ye, l, I);
            break e;
          }
          Me && Me(n, Y, U), n === "focusout" && (Me = Y._wrapperState) && Me.controlled && Y.type === "number" && oa(Y, "number", Y.value);
        }
        switch (Me = U ? ti(U) : window, n) {
          case "focusin":
            (cv(Me) || Me.contentEditable === "true") && (lo = Me, id = U, ts = null);
            break;
          case "focusout":
            ts = id = lo = null;
            break;
          case "mousedown":
            ld = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            ld = !1, ud(G, l, I);
            break;
          case "selectionchange":
            if (ey) break;
          case "keydown":
          case "keyup":
            ud(G, l, I);
        }
        var ze;
        if (ro) e: {
          switch (n) {
            case "compositionstart":
              var Pe = "onCompositionStart";
              break e;
            case "compositionend":
              Pe = "onCompositionEnd";
              break e;
            case "compositionupdate":
              Pe = "onCompositionUpdate";
              break e;
          }
          Pe = void 0;
        }
        else ao ? uv(n, l) && (Pe = "onCompositionEnd") : n === "keydown" && l.keyCode === 229 && (Pe = "onCompositionStart");
        Pe && (iv && l.locale !== "ko" && (ao || Pe !== "onCompositionStart" ? Pe === "onCompositionEnd" && ao && (ze = N()) : (Ja = I, h = "value" in Ja ? Ja.value : Ja.textContent, ao = !0)), Me = rs(U, Pe), 0 < Me.length && (Pe = new Xf(Pe, n, null, l, I), G.push({ event: Pe, listeners: Me }), ze ? Pe.data = ze : (ze = ov(l), ze !== null && (Pe.data = ze)))), (ze = Ko ? sv(n, l) : Gm(n, l)) && (U = rs(U, "onBeforeInput"), 0 < U.length && (I = new Xf("onBeforeInput", "beforeinput", null, l, I), G.push({ event: I, listeners: U }), I.data = ze));
      }
      fu(G, r);
    });
  }
  function oo(n, r, l) {
    return { instance: n, listener: r, currentTarget: l };
  }
  function rs(n, r) {
    for (var l = r + "Capture", o = []; n !== null; ) {
      var c = n, d = c.stateNode;
      c.tag === 5 && d !== null && (c = d, d = xr(n, l), d != null && o.unshift(oo(n, d, c)), d = xr(n, r), d != null && o.push(oo(n, d, c))), n = n.return;
    }
    return o;
  }
  function Tl(n) {
    if (n === null) return null;
    do
      n = n.return;
    while (n && n.tag !== 5);
    return n || null;
  }
  function wv(n, r, l, o, c) {
    for (var d = r._reactName, m = []; l !== null && l !== o; ) {
      var E = l, T = E.alternate, U = E.stateNode;
      if (T !== null && T === o) break;
      E.tag === 5 && U !== null && (E = U, c ? (T = xr(l, d), T != null && m.unshift(oo(l, T, E))) : c || (T = xr(l, d), T != null && m.push(oo(l, T, E)))), l = l.return;
    }
    m.length !== 0 && n.push({ event: r, listeners: m });
  }
  var xv = /\r\n?/g, ry = /\u0000|\uFFFD/g;
  function bv(n) {
    return (typeof n == "string" ? n : "" + n).replace(xv, `
`).replace(ry, "");
  }
  function Sc(n, r, l) {
    if (r = bv(r), bv(n) !== r && l) throw Error(z(425));
  }
  function wl() {
  }
  var as = null, du = null;
  function Ec(n, r) {
    return n === "textarea" || n === "noscript" || typeof r.children == "string" || typeof r.children == "number" || typeof r.dangerouslySetInnerHTML == "object" && r.dangerouslySetInnerHTML !== null && r.dangerouslySetInnerHTML.__html != null;
  }
  var Cc = typeof setTimeout == "function" ? setTimeout : void 0, dd = typeof clearTimeout == "function" ? clearTimeout : void 0, _v = typeof Promise == "function" ? Promise : void 0, so = typeof queueMicrotask == "function" ? queueMicrotask : typeof _v < "u" ? function(n) {
    return _v.resolve(null).then(n).catch(Rc);
  } : Cc;
  function Rc(n) {
    setTimeout(function() {
      throw n;
    });
  }
  function co(n, r) {
    var l = r, o = 0;
    do {
      var c = l.nextSibling;
      if (n.removeChild(l), c && c.nodeType === 8) if (l = c.data, l === "/$") {
        if (o === 0) {
          n.removeChild(c), Za(r);
          return;
        }
        o--;
      } else l !== "$" && l !== "$?" && l !== "$!" || o++;
      l = c;
    } while (l);
    Za(r);
  }
  function Si(n) {
    for (; n != null; n = n.nextSibling) {
      var r = n.nodeType;
      if (r === 1 || r === 3) break;
      if (r === 8) {
        if (r = n.data, r === "$" || r === "$!" || r === "$?") break;
        if (r === "/$") return null;
      }
    }
    return n;
  }
  function Dv(n) {
    n = n.previousSibling;
    for (var r = 0; n; ) {
      if (n.nodeType === 8) {
        var l = n.data;
        if (l === "$" || l === "$!" || l === "$?") {
          if (r === 0) return n;
          r--;
        } else l === "/$" && r++;
      }
      n = n.previousSibling;
    }
    return null;
  }
  var xl = Math.random().toString(36).slice(2), Ei = "__reactFiber$" + xl, is = "__reactProps$" + xl, Ii = "__reactContainer$" + xl, ls = "__reactEvents$" + xl, fo = "__reactListeners$" + xl, ay = "__reactHandles$" + xl;
  function pu(n) {
    var r = n[Ei];
    if (r) return r;
    for (var l = n.parentNode; l; ) {
      if (r = l[Ii] || l[Ei]) {
        if (l = r.alternate, r.child !== null || l !== null && l.child !== null) for (n = Dv(n); n !== null; ) {
          if (l = n[Ei]) return l;
          n = Dv(n);
        }
        return r;
      }
      n = l, l = n.parentNode;
    }
    return null;
  }
  function _e(n) {
    return n = n[Ei] || n[Ii], !n || n.tag !== 5 && n.tag !== 6 && n.tag !== 13 && n.tag !== 3 ? null : n;
  }
  function ti(n) {
    if (n.tag === 5 || n.tag === 6) return n.stateNode;
    throw Error(z(33));
  }
  function hn(n) {
    return n[is] || null;
  }
  var yt = [], Da = -1;
  function ka(n) {
    return { current: n };
  }
  function nn(n) {
    0 > Da || (n.current = yt[Da], yt[Da] = null, Da--);
  }
  function xe(n, r) {
    Da++, yt[Da] = n.current, n.current = r;
  }
  var Er = {}, Sn = ka(Er), Yn = ka(!1), Qr = Er;
  function Wr(n, r) {
    var l = n.type.contextTypes;
    if (!l) return Er;
    var o = n.stateNode;
    if (o && o.__reactInternalMemoizedUnmaskedChildContext === r) return o.__reactInternalMemoizedMaskedChildContext;
    var c = {}, d;
    for (d in l) c[d] = r[d];
    return o && (n = n.stateNode, n.__reactInternalMemoizedUnmaskedChildContext = r, n.__reactInternalMemoizedMaskedChildContext = c), c;
  }
  function Mn(n) {
    return n = n.childContextTypes, n != null;
  }
  function po() {
    nn(Yn), nn(Sn);
  }
  function kv(n, r, l) {
    if (Sn.current !== Er) throw Error(z(168));
    xe(Sn, r), xe(Yn, l);
  }
  function us(n, r, l) {
    var o = n.stateNode;
    if (r = r.childContextTypes, typeof o.getChildContext != "function") return l;
    o = o.getChildContext();
    for (var c in o) if (!(c in r)) throw Error(z(108, Xe(n) || "Unknown", c));
    return ne({}, l, o);
  }
  function Xn(n) {
    return n = (n = n.stateNode) && n.__reactInternalMemoizedMergedChildContext || Er, Qr = Sn.current, xe(Sn, n), xe(Yn, Yn.current), !0;
  }
  function Tc(n, r, l) {
    var o = n.stateNode;
    if (!o) throw Error(z(169));
    l ? (n = us(n, r, Qr), o.__reactInternalMemoizedMergedChildContext = n, nn(Yn), nn(Sn), xe(Sn, n)) : nn(Yn), xe(Yn, l);
  }
  var Ci = null, vo = !1, Qi = !1;
  function wc(n) {
    Ci === null ? Ci = [n] : Ci.push(n);
  }
  function bl(n) {
    vo = !0, wc(n);
  }
  function Ri() {
    if (!Qi && Ci !== null) {
      Qi = !0;
      var n = 0, r = kt;
      try {
        var l = Ci;
        for (kt = 1; n < l.length; n++) {
          var o = l[n];
          do
            o = o(!0);
          while (o !== null);
        }
        Ci = null, vo = !1;
      } catch (c) {
        throw Ci !== null && (Ci = Ci.slice(n + 1)), un(qa, Ri), c;
      } finally {
        kt = r, Qi = !1;
      }
    }
    return null;
  }
  var _l = [], Dl = 0, kl = null, Wi = 0, Nn = [], Oa = 0, da = null, Ti = 1, wi = "";
  function vu(n, r) {
    _l[Dl++] = Wi, _l[Dl++] = kl, kl = n, Wi = r;
  }
  function Ov(n, r, l) {
    Nn[Oa++] = Ti, Nn[Oa++] = wi, Nn[Oa++] = da, da = n;
    var o = Ti;
    n = wi;
    var c = 32 - _r(o) - 1;
    o &= ~(1 << c), l += 1;
    var d = 32 - _r(r) + c;
    if (30 < d) {
      var m = c - c % 5;
      d = (o & (1 << m) - 1).toString(32), o >>= m, c -= m, Ti = 1 << 32 - _r(r) + c | l << c | o, wi = d + n;
    } else Ti = 1 << d | l << c | o, wi = n;
  }
  function xc(n) {
    n.return !== null && (vu(n, 1), Ov(n, 1, 0));
  }
  function bc(n) {
    for (; n === kl; ) kl = _l[--Dl], _l[Dl] = null, Wi = _l[--Dl], _l[Dl] = null;
    for (; n === da; ) da = Nn[--Oa], Nn[Oa] = null, wi = Nn[--Oa], Nn[Oa] = null, Ti = Nn[--Oa], Nn[Oa] = null;
  }
  var Gr = null, qr = null, fn = !1, La = null;
  function pd(n, r) {
    var l = Aa(5, null, null, 0);
    l.elementType = "DELETED", l.stateNode = r, l.return = n, r = n.deletions, r === null ? (n.deletions = [l], n.flags |= 16) : r.push(l);
  }
  function Lv(n, r) {
    switch (n.tag) {
      case 5:
        var l = n.type;
        return r = r.nodeType !== 1 || l.toLowerCase() !== r.nodeName.toLowerCase() ? null : r, r !== null ? (n.stateNode = r, Gr = n, qr = Si(r.firstChild), !0) : !1;
      case 6:
        return r = n.pendingProps === "" || r.nodeType !== 3 ? null : r, r !== null ? (n.stateNode = r, Gr = n, qr = null, !0) : !1;
      case 13:
        return r = r.nodeType !== 8 ? null : r, r !== null ? (l = da !== null ? { id: Ti, overflow: wi } : null, n.memoizedState = { dehydrated: r, treeContext: l, retryLane: 1073741824 }, l = Aa(18, null, null, 0), l.stateNode = r, l.return = n, n.child = l, Gr = n, qr = null, !0) : !1;
      default:
        return !1;
    }
  }
  function vd(n) {
    return (n.mode & 1) !== 0 && (n.flags & 128) === 0;
  }
  function hd(n) {
    if (fn) {
      var r = qr;
      if (r) {
        var l = r;
        if (!Lv(n, r)) {
          if (vd(n)) throw Error(z(418));
          r = Si(l.nextSibling);
          var o = Gr;
          r && Lv(n, r) ? pd(o, l) : (n.flags = n.flags & -4097 | 2, fn = !1, Gr = n);
        }
      } else {
        if (vd(n)) throw Error(z(418));
        n.flags = n.flags & -4097 | 2, fn = !1, Gr = n;
      }
    }
  }
  function In(n) {
    for (n = n.return; n !== null && n.tag !== 5 && n.tag !== 3 && n.tag !== 13; ) n = n.return;
    Gr = n;
  }
  function _c(n) {
    if (n !== Gr) return !1;
    if (!fn) return In(n), fn = !0, !1;
    var r;
    if ((r = n.tag !== 3) && !(r = n.tag !== 5) && (r = n.type, r = r !== "head" && r !== "body" && !Ec(n.type, n.memoizedProps)), r && (r = qr)) {
      if (vd(n)) throw os(), Error(z(418));
      for (; r; ) pd(n, r), r = Si(r.nextSibling);
    }
    if (In(n), n.tag === 13) {
      if (n = n.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(z(317));
      e: {
        for (n = n.nextSibling, r = 0; n; ) {
          if (n.nodeType === 8) {
            var l = n.data;
            if (l === "/$") {
              if (r === 0) {
                qr = Si(n.nextSibling);
                break e;
              }
              r--;
            } else l !== "$" && l !== "$!" && l !== "$?" || r++;
          }
          n = n.nextSibling;
        }
        qr = null;
      }
    } else qr = Gr ? Si(n.stateNode.nextSibling) : null;
    return !0;
  }
  function os() {
    for (var n = qr; n; ) n = Si(n.nextSibling);
  }
  function Ol() {
    qr = Gr = null, fn = !1;
  }
  function Gi(n) {
    La === null ? La = [n] : La.push(n);
  }
  var iy = pt.ReactCurrentBatchConfig;
  function hu(n, r, l) {
    if (n = l.ref, n !== null && typeof n != "function" && typeof n != "object") {
      if (l._owner) {
        if (l = l._owner, l) {
          if (l.tag !== 1) throw Error(z(309));
          var o = l.stateNode;
        }
        if (!o) throw Error(z(147, n));
        var c = o, d = "" + n;
        return r !== null && r.ref !== null && typeof r.ref == "function" && r.ref._stringRef === d ? r.ref : (r = function(m) {
          var E = c.refs;
          m === null ? delete E[d] : E[d] = m;
        }, r._stringRef = d, r);
      }
      if (typeof n != "string") throw Error(z(284));
      if (!l._owner) throw Error(z(290, n));
    }
    return n;
  }
  function Dc(n, r) {
    throw n = Object.prototype.toString.call(r), Error(z(31, n === "[object Object]" ? "object with keys {" + Object.keys(r).join(", ") + "}" : n));
  }
  function Mv(n) {
    var r = n._init;
    return r(n._payload);
  }
  function mu(n) {
    function r(D, x) {
      if (n) {
        var L = D.deletions;
        L === null ? (D.deletions = [x], D.flags |= 16) : L.push(x);
      }
    }
    function l(D, x) {
      if (!n) return null;
      for (; x !== null; ) r(D, x), x = x.sibling;
      return null;
    }
    function o(D, x) {
      for (D = /* @__PURE__ */ new Map(); x !== null; ) x.key !== null ? D.set(x.key, x) : D.set(x.index, x), x = x.sibling;
      return D;
    }
    function c(D, x) {
      return D = jl(D, x), D.index = 0, D.sibling = null, D;
    }
    function d(D, x, L) {
      return D.index = L, n ? (L = D.alternate, L !== null ? (L = L.index, L < x ? (D.flags |= 2, x) : L) : (D.flags |= 2, x)) : (D.flags |= 1048576, x);
    }
    function m(D) {
      return n && D.alternate === null && (D.flags |= 2), D;
    }
    function E(D, x, L, Q) {
      return x === null || x.tag !== 6 ? (x = Qd(L, D.mode, Q), x.return = D, x) : (x = c(x, L), x.return = D, x);
    }
    function T(D, x, L, Q) {
      var ye = L.type;
      return ye === Fe ? I(D, x, L.props.children, Q, L.key) : x !== null && (x.elementType === ye || typeof ye == "object" && ye !== null && ye.$$typeof === Dt && Mv(ye) === x.type) ? (Q = c(x, L.props), Q.ref = hu(D, x, L), Q.return = D, Q) : (Q = js(L.type, L.key, L.props, null, D.mode, Q), Q.ref = hu(D, x, L), Q.return = D, Q);
    }
    function U(D, x, L, Q) {
      return x === null || x.tag !== 4 || x.stateNode.containerInfo !== L.containerInfo || x.stateNode.implementation !== L.implementation ? (x = of(L, D.mode, Q), x.return = D, x) : (x = c(x, L.children || []), x.return = D, x);
    }
    function I(D, x, L, Q, ye) {
      return x === null || x.tag !== 7 ? (x = el(L, D.mode, Q, ye), x.return = D, x) : (x = c(x, L), x.return = D, x);
    }
    function G(D, x, L) {
      if (typeof x == "string" && x !== "" || typeof x == "number") return x = Qd("" + x, D.mode, L), x.return = D, x;
      if (typeof x == "object" && x !== null) {
        switch (x.$$typeof) {
          case be:
            return L = js(x.type, x.key, x.props, null, D.mode, L), L.ref = hu(D, null, x), L.return = D, L;
          case ut:
            return x = of(x, D.mode, L), x.return = D, x;
          case Dt:
            var Q = x._init;
            return G(D, Q(x._payload), L);
        }
        if (Gn(x) || Re(x)) return x = el(x, D.mode, L, null), x.return = D, x;
        Dc(D, x);
      }
      return null;
    }
    function Y(D, x, L, Q) {
      var ye = x !== null ? x.key : null;
      if (typeof L == "string" && L !== "" || typeof L == "number") return ye !== null ? null : E(D, x, "" + L, Q);
      if (typeof L == "object" && L !== null) {
        switch (L.$$typeof) {
          case be:
            return L.key === ye ? T(D, x, L, Q) : null;
          case ut:
            return L.key === ye ? U(D, x, L, Q) : null;
          case Dt:
            return ye = L._init, Y(
              D,
              x,
              ye(L._payload),
              Q
            );
        }
        if (Gn(L) || Re(L)) return ye !== null ? null : I(D, x, L, Q, null);
        Dc(D, L);
      }
      return null;
    }
    function se(D, x, L, Q, ye) {
      if (typeof Q == "string" && Q !== "" || typeof Q == "number") return D = D.get(L) || null, E(x, D, "" + Q, ye);
      if (typeof Q == "object" && Q !== null) {
        switch (Q.$$typeof) {
          case be:
            return D = D.get(Q.key === null ? L : Q.key) || null, T(x, D, Q, ye);
          case ut:
            return D = D.get(Q.key === null ? L : Q.key) || null, U(x, D, Q, ye);
          case Dt:
            var Me = Q._init;
            return se(D, x, L, Me(Q._payload), ye);
        }
        if (Gn(Q) || Re(Q)) return D = D.get(L) || null, I(x, D, Q, ye, null);
        Dc(x, Q);
      }
      return null;
    }
    function me(D, x, L, Q) {
      for (var ye = null, Me = null, ze = x, Pe = x = 0, Jn = null; ze !== null && Pe < L.length; Pe++) {
        ze.index > Pe ? (Jn = ze, ze = null) : Jn = ze.sibling;
        var Mt = Y(D, ze, L[Pe], Q);
        if (Mt === null) {
          ze === null && (ze = Jn);
          break;
        }
        n && ze && Mt.alternate === null && r(D, ze), x = d(Mt, x, Pe), Me === null ? ye = Mt : Me.sibling = Mt, Me = Mt, ze = Jn;
      }
      if (Pe === L.length) return l(D, ze), fn && vu(D, Pe), ye;
      if (ze === null) {
        for (; Pe < L.length; Pe++) ze = G(D, L[Pe], Q), ze !== null && (x = d(ze, x, Pe), Me === null ? ye = ze : Me.sibling = ze, Me = ze);
        return fn && vu(D, Pe), ye;
      }
      for (ze = o(D, ze); Pe < L.length; Pe++) Jn = se(ze, D, Pe, L[Pe], Q), Jn !== null && (n && Jn.alternate !== null && ze.delete(Jn.key === null ? Pe : Jn.key), x = d(Jn, x, Pe), Me === null ? ye = Jn : Me.sibling = Jn, Me = Jn);
      return n && ze.forEach(function(Vl) {
        return r(D, Vl);
      }), fn && vu(D, Pe), ye;
    }
    function Se(D, x, L, Q) {
      var ye = Re(L);
      if (typeof ye != "function") throw Error(z(150));
      if (L = ye.call(L), L == null) throw Error(z(151));
      for (var Me = ye = null, ze = x, Pe = x = 0, Jn = null, Mt = L.next(); ze !== null && !Mt.done; Pe++, Mt = L.next()) {
        ze.index > Pe ? (Jn = ze, ze = null) : Jn = ze.sibling;
        var Vl = Y(D, ze, Mt.value, Q);
        if (Vl === null) {
          ze === null && (ze = Jn);
          break;
        }
        n && ze && Vl.alternate === null && r(D, ze), x = d(Vl, x, Pe), Me === null ? ye = Vl : Me.sibling = Vl, Me = Vl, ze = Jn;
      }
      if (Mt.done) return l(
        D,
        ze
      ), fn && vu(D, Pe), ye;
      if (ze === null) {
        for (; !Mt.done; Pe++, Mt = L.next()) Mt = G(D, Mt.value, Q), Mt !== null && (x = d(Mt, x, Pe), Me === null ? ye = Mt : Me.sibling = Mt, Me = Mt);
        return fn && vu(D, Pe), ye;
      }
      for (ze = o(D, ze); !Mt.done; Pe++, Mt = L.next()) Mt = se(ze, D, Pe, Mt.value, Q), Mt !== null && (n && Mt.alternate !== null && ze.delete(Mt.key === null ? Pe : Mt.key), x = d(Mt, x, Pe), Me === null ? ye = Mt : Me.sibling = Mt, Me = Mt);
      return n && ze.forEach(function(vh) {
        return r(D, vh);
      }), fn && vu(D, Pe), ye;
    }
    function _n(D, x, L, Q) {
      if (typeof L == "object" && L !== null && L.type === Fe && L.key === null && (L = L.props.children), typeof L == "object" && L !== null) {
        switch (L.$$typeof) {
          case be:
            e: {
              for (var ye = L.key, Me = x; Me !== null; ) {
                if (Me.key === ye) {
                  if (ye = L.type, ye === Fe) {
                    if (Me.tag === 7) {
                      l(D, Me.sibling), x = c(Me, L.props.children), x.return = D, D = x;
                      break e;
                    }
                  } else if (Me.elementType === ye || typeof ye == "object" && ye !== null && ye.$$typeof === Dt && Mv(ye) === Me.type) {
                    l(D, Me.sibling), x = c(Me, L.props), x.ref = hu(D, Me, L), x.return = D, D = x;
                    break e;
                  }
                  l(D, Me);
                  break;
                } else r(D, Me);
                Me = Me.sibling;
              }
              L.type === Fe ? (x = el(L.props.children, D.mode, Q, L.key), x.return = D, D = x) : (Q = js(L.type, L.key, L.props, null, D.mode, Q), Q.ref = hu(D, x, L), Q.return = D, D = Q);
            }
            return m(D);
          case ut:
            e: {
              for (Me = L.key; x !== null; ) {
                if (x.key === Me) if (x.tag === 4 && x.stateNode.containerInfo === L.containerInfo && x.stateNode.implementation === L.implementation) {
                  l(D, x.sibling), x = c(x, L.children || []), x.return = D, D = x;
                  break e;
                } else {
                  l(D, x);
                  break;
                }
                else r(D, x);
                x = x.sibling;
              }
              x = of(L, D.mode, Q), x.return = D, D = x;
            }
            return m(D);
          case Dt:
            return Me = L._init, _n(D, x, Me(L._payload), Q);
        }
        if (Gn(L)) return me(D, x, L, Q);
        if (Re(L)) return Se(D, x, L, Q);
        Dc(D, L);
      }
      return typeof L == "string" && L !== "" || typeof L == "number" ? (L = "" + L, x !== null && x.tag === 6 ? (l(D, x.sibling), x = c(x, L), x.return = D, D = x) : (l(D, x), x = Qd(L, D.mode, Q), x.return = D, D = x), m(D)) : l(D, x);
    }
    return _n;
  }
  var Tn = mu(!0), ie = mu(!1), pa = ka(null), Xr = null, ho = null, md = null;
  function yd() {
    md = ho = Xr = null;
  }
  function gd(n) {
    var r = pa.current;
    nn(pa), n._currentValue = r;
  }
  function Sd(n, r, l) {
    for (; n !== null; ) {
      var o = n.alternate;
      if ((n.childLanes & r) !== r ? (n.childLanes |= r, o !== null && (o.childLanes |= r)) : o !== null && (o.childLanes & r) !== r && (o.childLanes |= r), n === l) break;
      n = n.return;
    }
  }
  function mn(n, r) {
    Xr = n, md = ho = null, n = n.dependencies, n !== null && n.firstContext !== null && (n.lanes & r && (Un = !0), n.firstContext = null);
  }
  function Ma(n) {
    var r = n._currentValue;
    if (md !== n) if (n = { context: n, memoizedValue: r, next: null }, ho === null) {
      if (Xr === null) throw Error(z(308));
      ho = n, Xr.dependencies = { lanes: 0, firstContext: n };
    } else ho = ho.next = n;
    return r;
  }
  var yu = null;
  function Ed(n) {
    yu === null ? yu = [n] : yu.push(n);
  }
  function Cd(n, r, l, o) {
    var c = r.interleaved;
    return c === null ? (l.next = l, Ed(r)) : (l.next = c.next, c.next = l), r.interleaved = l, va(n, o);
  }
  function va(n, r) {
    n.lanes |= r;
    var l = n.alternate;
    for (l !== null && (l.lanes |= r), l = n, n = n.return; n !== null; ) n.childLanes |= r, l = n.alternate, l !== null && (l.childLanes |= r), l = n, n = n.return;
    return l.tag === 3 ? l.stateNode : null;
  }
  var ha = !1;
  function Rd(n) {
    n.updateQueue = { baseState: n.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function Nv(n, r) {
    n = n.updateQueue, r.updateQueue === n && (r.updateQueue = { baseState: n.baseState, firstBaseUpdate: n.firstBaseUpdate, lastBaseUpdate: n.lastBaseUpdate, shared: n.shared, effects: n.effects });
  }
  function qi(n, r) {
    return { eventTime: n, lane: r, tag: 0, payload: null, callback: null, next: null };
  }
  function Ll(n, r, l) {
    var o = n.updateQueue;
    if (o === null) return null;
    if (o = o.shared, gt & 2) {
      var c = o.pending;
      return c === null ? r.next = r : (r.next = c.next, c.next = r), o.pending = r, va(n, l);
    }
    return c = o.interleaved, c === null ? (r.next = r, Ed(o)) : (r.next = c.next, c.next = r), o.interleaved = r, va(n, l);
  }
  function kc(n, r, l) {
    if (r = r.updateQueue, r !== null && (r = r.shared, (l & 4194240) !== 0)) {
      var o = r.lanes;
      o &= n.pendingLanes, l |= o, r.lanes = l, Pi(n, l);
    }
  }
  function zv(n, r) {
    var l = n.updateQueue, o = n.alternate;
    if (o !== null && (o = o.updateQueue, l === o)) {
      var c = null, d = null;
      if (l = l.firstBaseUpdate, l !== null) {
        do {
          var m = { eventTime: l.eventTime, lane: l.lane, tag: l.tag, payload: l.payload, callback: l.callback, next: null };
          d === null ? c = d = m : d = d.next = m, l = l.next;
        } while (l !== null);
        d === null ? c = d = r : d = d.next = r;
      } else c = d = r;
      l = { baseState: o.baseState, firstBaseUpdate: c, lastBaseUpdate: d, shared: o.shared, effects: o.effects }, n.updateQueue = l;
      return;
    }
    n = l.lastBaseUpdate, n === null ? l.firstBaseUpdate = r : n.next = r, l.lastBaseUpdate = r;
  }
  function ss(n, r, l, o) {
    var c = n.updateQueue;
    ha = !1;
    var d = c.firstBaseUpdate, m = c.lastBaseUpdate, E = c.shared.pending;
    if (E !== null) {
      c.shared.pending = null;
      var T = E, U = T.next;
      T.next = null, m === null ? d = U : m.next = U, m = T;
      var I = n.alternate;
      I !== null && (I = I.updateQueue, E = I.lastBaseUpdate, E !== m && (E === null ? I.firstBaseUpdate = U : E.next = U, I.lastBaseUpdate = T));
    }
    if (d !== null) {
      var G = c.baseState;
      m = 0, I = U = T = null, E = d;
      do {
        var Y = E.lane, se = E.eventTime;
        if ((o & Y) === Y) {
          I !== null && (I = I.next = {
            eventTime: se,
            lane: 0,
            tag: E.tag,
            payload: E.payload,
            callback: E.callback,
            next: null
          });
          e: {
            var me = n, Se = E;
            switch (Y = r, se = l, Se.tag) {
              case 1:
                if (me = Se.payload, typeof me == "function") {
                  G = me.call(se, G, Y);
                  break e;
                }
                G = me;
                break e;
              case 3:
                me.flags = me.flags & -65537 | 128;
              case 0:
                if (me = Se.payload, Y = typeof me == "function" ? me.call(se, G, Y) : me, Y == null) break e;
                G = ne({}, G, Y);
                break e;
              case 2:
                ha = !0;
            }
          }
          E.callback !== null && E.lane !== 0 && (n.flags |= 64, Y = c.effects, Y === null ? c.effects = [E] : Y.push(E));
        } else se = { eventTime: se, lane: Y, tag: E.tag, payload: E.payload, callback: E.callback, next: null }, I === null ? (U = I = se, T = G) : I = I.next = se, m |= Y;
        if (E = E.next, E === null) {
          if (E = c.shared.pending, E === null) break;
          Y = E, E = Y.next, Y.next = null, c.lastBaseUpdate = Y, c.shared.pending = null;
        }
      } while (!0);
      if (I === null && (T = G), c.baseState = T, c.firstBaseUpdate = U, c.lastBaseUpdate = I, r = c.shared.interleaved, r !== null) {
        c = r;
        do
          m |= c.lane, c = c.next;
        while (c !== r);
      } else d === null && (c.shared.lanes = 0);
      ki |= m, n.lanes = m, n.memoizedState = G;
    }
  }
  function Td(n, r, l) {
    if (n = r.effects, r.effects = null, n !== null) for (r = 0; r < n.length; r++) {
      var o = n[r], c = o.callback;
      if (c !== null) {
        if (o.callback = null, o = l, typeof c != "function") throw Error(z(191, c));
        c.call(o);
      }
    }
  }
  var cs = {}, xi = ka(cs), fs = ka(cs), ds = ka(cs);
  function gu(n) {
    if (n === cs) throw Error(z(174));
    return n;
  }
  function wd(n, r) {
    switch (xe(ds, r), xe(fs, n), xe(xi, cs), n = r.nodeType, n) {
      case 9:
      case 11:
        r = (r = r.documentElement) ? r.namespaceURI : sa(null, "");
        break;
      default:
        n = n === 8 ? r.parentNode : r, r = n.namespaceURI || null, n = n.tagName, r = sa(r, n);
    }
    nn(xi), xe(xi, r);
  }
  function Su() {
    nn(xi), nn(fs), nn(ds);
  }
  function Uv(n) {
    gu(ds.current);
    var r = gu(xi.current), l = sa(r, n.type);
    r !== l && (xe(fs, n), xe(xi, l));
  }
  function Oc(n) {
    fs.current === n && (nn(xi), nn(fs));
  }
  var yn = ka(0);
  function Lc(n) {
    for (var r = n; r !== null; ) {
      if (r.tag === 13) {
        var l = r.memoizedState;
        if (l !== null && (l = l.dehydrated, l === null || l.data === "$?" || l.data === "$!")) return r;
      } else if (r.tag === 19 && r.memoizedProps.revealOrder !== void 0) {
        if (r.flags & 128) return r;
      } else if (r.child !== null) {
        r.child.return = r, r = r.child;
        continue;
      }
      if (r === n) break;
      for (; r.sibling === null; ) {
        if (r.return === null || r.return === n) return null;
        r = r.return;
      }
      r.sibling.return = r.return, r = r.sibling;
    }
    return null;
  }
  var ps = [];
  function De() {
    for (var n = 0; n < ps.length; n++) ps[n]._workInProgressVersionPrimary = null;
    ps.length = 0;
  }
  var it = pt.ReactCurrentDispatcher, Ot = pt.ReactCurrentBatchConfig, Wt = 0, Lt = null, zn = null, Kn = null, Mc = !1, vs = !1, Eu = 0, $ = 0;
  function _t() {
    throw Error(z(321));
  }
  function Ae(n, r) {
    if (r === null) return !1;
    for (var l = 0; l < r.length && l < n.length; l++) if (!ei(n[l], r[l])) return !1;
    return !0;
  }
  function Ml(n, r, l, o, c, d) {
    if (Wt = d, Lt = r, r.memoizedState = null, r.updateQueue = null, r.lanes = 0, it.current = n === null || n.memoizedState === null ? Wc : Es, n = l(o, c), vs) {
      d = 0;
      do {
        if (vs = !1, Eu = 0, 25 <= d) throw Error(z(301));
        d += 1, Kn = zn = null, r.updateQueue = null, it.current = Gc, n = l(o, c);
      } while (vs);
    }
    if (it.current = xu, r = zn !== null && zn.next !== null, Wt = 0, Kn = zn = Lt = null, Mc = !1, r) throw Error(z(300));
    return n;
  }
  function ni() {
    var n = Eu !== 0;
    return Eu = 0, n;
  }
  function Cr() {
    var n = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return Kn === null ? Lt.memoizedState = Kn = n : Kn = Kn.next = n, Kn;
  }
  function wn() {
    if (zn === null) {
      var n = Lt.alternate;
      n = n !== null ? n.memoizedState : null;
    } else n = zn.next;
    var r = Kn === null ? Lt.memoizedState : Kn.next;
    if (r !== null) Kn = r, zn = n;
    else {
      if (n === null) throw Error(z(310));
      zn = n, n = { memoizedState: zn.memoizedState, baseState: zn.baseState, baseQueue: zn.baseQueue, queue: zn.queue, next: null }, Kn === null ? Lt.memoizedState = Kn = n : Kn = Kn.next = n;
    }
    return Kn;
  }
  function Xi(n, r) {
    return typeof r == "function" ? r(n) : r;
  }
  function Nl(n) {
    var r = wn(), l = r.queue;
    if (l === null) throw Error(z(311));
    l.lastRenderedReducer = n;
    var o = zn, c = o.baseQueue, d = l.pending;
    if (d !== null) {
      if (c !== null) {
        var m = c.next;
        c.next = d.next, d.next = m;
      }
      o.baseQueue = c = d, l.pending = null;
    }
    if (c !== null) {
      d = c.next, o = o.baseState;
      var E = m = null, T = null, U = d;
      do {
        var I = U.lane;
        if ((Wt & I) === I) T !== null && (T = T.next = { lane: 0, action: U.action, hasEagerState: U.hasEagerState, eagerState: U.eagerState, next: null }), o = U.hasEagerState ? U.eagerState : n(o, U.action);
        else {
          var G = {
            lane: I,
            action: U.action,
            hasEagerState: U.hasEagerState,
            eagerState: U.eagerState,
            next: null
          };
          T === null ? (E = T = G, m = o) : T = T.next = G, Lt.lanes |= I, ki |= I;
        }
        U = U.next;
      } while (U !== null && U !== d);
      T === null ? m = o : T.next = E, ei(o, r.memoizedState) || (Un = !0), r.memoizedState = o, r.baseState = m, r.baseQueue = T, l.lastRenderedState = o;
    }
    if (n = l.interleaved, n !== null) {
      c = n;
      do
        d = c.lane, Lt.lanes |= d, ki |= d, c = c.next;
      while (c !== n);
    } else c === null && (l.lanes = 0);
    return [r.memoizedState, l.dispatch];
  }
  function Cu(n) {
    var r = wn(), l = r.queue;
    if (l === null) throw Error(z(311));
    l.lastRenderedReducer = n;
    var o = l.dispatch, c = l.pending, d = r.memoizedState;
    if (c !== null) {
      l.pending = null;
      var m = c = c.next;
      do
        d = n(d, m.action), m = m.next;
      while (m !== c);
      ei(d, r.memoizedState) || (Un = !0), r.memoizedState = d, r.baseQueue === null && (r.baseState = d), l.lastRenderedState = d;
    }
    return [d, o];
  }
  function Nc() {
  }
  function zc(n, r) {
    var l = Lt, o = wn(), c = r(), d = !ei(o.memoizedState, c);
    if (d && (o.memoizedState = c, Un = !0), o = o.queue, hs(Fc.bind(null, l, o, n), [n]), o.getSnapshot !== r || d || Kn !== null && Kn.memoizedState.tag & 1) {
      if (l.flags |= 2048, Ru(9, Ac.bind(null, l, o, c, r), void 0, null), Qn === null) throw Error(z(349));
      Wt & 30 || Uc(l, r, c);
    }
    return c;
  }
  function Uc(n, r, l) {
    n.flags |= 16384, n = { getSnapshot: r, value: l }, r = Lt.updateQueue, r === null ? (r = { lastEffect: null, stores: null }, Lt.updateQueue = r, r.stores = [n]) : (l = r.stores, l === null ? r.stores = [n] : l.push(n));
  }
  function Ac(n, r, l, o) {
    r.value = l, r.getSnapshot = o, jc(r) && Hc(n);
  }
  function Fc(n, r, l) {
    return l(function() {
      jc(r) && Hc(n);
    });
  }
  function jc(n) {
    var r = n.getSnapshot;
    n = n.value;
    try {
      var l = r();
      return !ei(n, l);
    } catch {
      return !0;
    }
  }
  function Hc(n) {
    var r = va(n, 1);
    r !== null && Nr(r, n, 1, -1);
  }
  function Pc(n) {
    var r = Cr();
    return typeof n == "function" && (n = n()), r.memoizedState = r.baseState = n, n = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Xi, lastRenderedState: n }, r.queue = n, n = n.dispatch = wu.bind(null, Lt, n), [r.memoizedState, n];
  }
  function Ru(n, r, l, o) {
    return n = { tag: n, create: r, destroy: l, deps: o, next: null }, r = Lt.updateQueue, r === null ? (r = { lastEffect: null, stores: null }, Lt.updateQueue = r, r.lastEffect = n.next = n) : (l = r.lastEffect, l === null ? r.lastEffect = n.next = n : (o = l.next, l.next = n, n.next = o, r.lastEffect = n)), n;
  }
  function Vc() {
    return wn().memoizedState;
  }
  function mo(n, r, l, o) {
    var c = Cr();
    Lt.flags |= n, c.memoizedState = Ru(1 | r, l, void 0, o === void 0 ? null : o);
  }
  function yo(n, r, l, o) {
    var c = wn();
    o = o === void 0 ? null : o;
    var d = void 0;
    if (zn !== null) {
      var m = zn.memoizedState;
      if (d = m.destroy, o !== null && Ae(o, m.deps)) {
        c.memoizedState = Ru(r, l, d, o);
        return;
      }
    }
    Lt.flags |= n, c.memoizedState = Ru(1 | r, l, d, o);
  }
  function Bc(n, r) {
    return mo(8390656, 8, n, r);
  }
  function hs(n, r) {
    return yo(2048, 8, n, r);
  }
  function $c(n, r) {
    return yo(4, 2, n, r);
  }
  function ms(n, r) {
    return yo(4, 4, n, r);
  }
  function Tu(n, r) {
    if (typeof r == "function") return n = n(), r(n), function() {
      r(null);
    };
    if (r != null) return n = n(), r.current = n, function() {
      r.current = null;
    };
  }
  function Yc(n, r, l) {
    return l = l != null ? l.concat([n]) : null, yo(4, 4, Tu.bind(null, r, n), l);
  }
  function ys() {
  }
  function Ic(n, r) {
    var l = wn();
    r = r === void 0 ? null : r;
    var o = l.memoizedState;
    return o !== null && r !== null && Ae(r, o[1]) ? o[0] : (l.memoizedState = [n, r], n);
  }
  function Qc(n, r) {
    var l = wn();
    r = r === void 0 ? null : r;
    var o = l.memoizedState;
    return o !== null && r !== null && Ae(r, o[1]) ? o[0] : (n = n(), l.memoizedState = [n, r], n);
  }
  function xd(n, r, l) {
    return Wt & 21 ? (ei(l, r) || (l = qu(), Lt.lanes |= l, ki |= l, n.baseState = !0), r) : (n.baseState && (n.baseState = !1, Un = !0), n.memoizedState = l);
  }
  function gs(n, r) {
    var l = kt;
    kt = l !== 0 && 4 > l ? l : 4, n(!0);
    var o = Ot.transition;
    Ot.transition = {};
    try {
      n(!1), r();
    } finally {
      kt = l, Ot.transition = o;
    }
  }
  function bd() {
    return wn().memoizedState;
  }
  function Ss(n, r, l) {
    var o = Oi(n);
    if (l = { lane: o, action: l, hasEagerState: !1, eagerState: null, next: null }, Kr(n)) Av(r, l);
    else if (l = Cd(n, r, l, o), l !== null) {
      var c = jn();
      Nr(l, n, o, c), Xt(l, r, o);
    }
  }
  function wu(n, r, l) {
    var o = Oi(n), c = { lane: o, action: l, hasEagerState: !1, eagerState: null, next: null };
    if (Kr(n)) Av(r, c);
    else {
      var d = n.alternate;
      if (n.lanes === 0 && (d === null || d.lanes === 0) && (d = r.lastRenderedReducer, d !== null)) try {
        var m = r.lastRenderedState, E = d(m, l);
        if (c.hasEagerState = !0, c.eagerState = E, ei(E, m)) {
          var T = r.interleaved;
          T === null ? (c.next = c, Ed(r)) : (c.next = T.next, T.next = c), r.interleaved = c;
          return;
        }
      } catch {
      } finally {
      }
      l = Cd(n, r, c, o), l !== null && (c = jn(), Nr(l, n, o, c), Xt(l, r, o));
    }
  }
  function Kr(n) {
    var r = n.alternate;
    return n === Lt || r !== null && r === Lt;
  }
  function Av(n, r) {
    vs = Mc = !0;
    var l = n.pending;
    l === null ? r.next = r : (r.next = l.next, l.next = r), n.pending = r;
  }
  function Xt(n, r, l) {
    if (l & 4194240) {
      var o = r.lanes;
      o &= n.pendingLanes, l |= o, r.lanes = l, Pi(n, l);
    }
  }
  var xu = { readContext: Ma, useCallback: _t, useContext: _t, useEffect: _t, useImperativeHandle: _t, useInsertionEffect: _t, useLayoutEffect: _t, useMemo: _t, useReducer: _t, useRef: _t, useState: _t, useDebugValue: _t, useDeferredValue: _t, useTransition: _t, useMutableSource: _t, useSyncExternalStore: _t, useId: _t, unstable_isNewReconciler: !1 }, Wc = { readContext: Ma, useCallback: function(n, r) {
    return Cr().memoizedState = [n, r === void 0 ? null : r], n;
  }, useContext: Ma, useEffect: Bc, useImperativeHandle: function(n, r, l) {
    return l = l != null ? l.concat([n]) : null, mo(
      4194308,
      4,
      Tu.bind(null, r, n),
      l
    );
  }, useLayoutEffect: function(n, r) {
    return mo(4194308, 4, n, r);
  }, useInsertionEffect: function(n, r) {
    return mo(4, 2, n, r);
  }, useMemo: function(n, r) {
    var l = Cr();
    return r = r === void 0 ? null : r, n = n(), l.memoizedState = [n, r], n;
  }, useReducer: function(n, r, l) {
    var o = Cr();
    return r = l !== void 0 ? l(r) : r, o.memoizedState = o.baseState = r, n = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: n, lastRenderedState: r }, o.queue = n, n = n.dispatch = Ss.bind(null, Lt, n), [o.memoizedState, n];
  }, useRef: function(n) {
    var r = Cr();
    return n = { current: n }, r.memoizedState = n;
  }, useState: Pc, useDebugValue: ys, useDeferredValue: function(n) {
    return Cr().memoizedState = n;
  }, useTransition: function() {
    var n = Pc(!1), r = n[0];
    return n = gs.bind(null, n[1]), Cr().memoizedState = n, [r, n];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(n, r, l) {
    var o = Lt, c = Cr();
    if (fn) {
      if (l === void 0) throw Error(z(407));
      l = l();
    } else {
      if (l = r(), Qn === null) throw Error(z(349));
      Wt & 30 || Uc(o, r, l);
    }
    c.memoizedState = l;
    var d = { value: l, getSnapshot: r };
    return c.queue = d, Bc(Fc.bind(
      null,
      o,
      d,
      n
    ), [n]), o.flags |= 2048, Ru(9, Ac.bind(null, o, d, l, r), void 0, null), l;
  }, useId: function() {
    var n = Cr(), r = Qn.identifierPrefix;
    if (fn) {
      var l = wi, o = Ti;
      l = (o & ~(1 << 32 - _r(o) - 1)).toString(32) + l, r = ":" + r + "R" + l, l = Eu++, 0 < l && (r += "H" + l.toString(32)), r += ":";
    } else l = $++, r = ":" + r + "r" + l.toString(32) + ":";
    return n.memoizedState = r;
  }, unstable_isNewReconciler: !1 }, Es = {
    readContext: Ma,
    useCallback: Ic,
    useContext: Ma,
    useEffect: hs,
    useImperativeHandle: Yc,
    useInsertionEffect: $c,
    useLayoutEffect: ms,
    useMemo: Qc,
    useReducer: Nl,
    useRef: Vc,
    useState: function() {
      return Nl(Xi);
    },
    useDebugValue: ys,
    useDeferredValue: function(n) {
      var r = wn();
      return xd(r, zn.memoizedState, n);
    },
    useTransition: function() {
      var n = Nl(Xi)[0], r = wn().memoizedState;
      return [n, r];
    },
    useMutableSource: Nc,
    useSyncExternalStore: zc,
    useId: bd,
    unstable_isNewReconciler: !1
  }, Gc = { readContext: Ma, useCallback: Ic, useContext: Ma, useEffect: hs, useImperativeHandle: Yc, useInsertionEffect: $c, useLayoutEffect: ms, useMemo: Qc, useReducer: Cu, useRef: Vc, useState: function() {
    return Cu(Xi);
  }, useDebugValue: ys, useDeferredValue: function(n) {
    var r = wn();
    return zn === null ? r.memoizedState = n : xd(r, zn.memoizedState, n);
  }, useTransition: function() {
    var n = Cu(Xi)[0], r = wn().memoizedState;
    return [n, r];
  }, useMutableSource: Nc, useSyncExternalStore: zc, useId: bd, unstable_isNewReconciler: !1 };
  function ri(n, r) {
    if (n && n.defaultProps) {
      r = ne({}, r), n = n.defaultProps;
      for (var l in n) r[l] === void 0 && (r[l] = n[l]);
      return r;
    }
    return r;
  }
  function _d(n, r, l, o) {
    r = n.memoizedState, l = l(o, r), l = l == null ? r : ne({}, r, l), n.memoizedState = l, n.lanes === 0 && (n.updateQueue.baseState = l);
  }
  var qc = { isMounted: function(n) {
    return (n = n._reactInternals) ? We(n) === n : !1;
  }, enqueueSetState: function(n, r, l) {
    n = n._reactInternals;
    var o = jn(), c = Oi(n), d = qi(o, c);
    d.payload = r, l != null && (d.callback = l), r = Ll(n, d, c), r !== null && (Nr(r, n, c, o), kc(r, n, c));
  }, enqueueReplaceState: function(n, r, l) {
    n = n._reactInternals;
    var o = jn(), c = Oi(n), d = qi(o, c);
    d.tag = 1, d.payload = r, l != null && (d.callback = l), r = Ll(n, d, c), r !== null && (Nr(r, n, c, o), kc(r, n, c));
  }, enqueueForceUpdate: function(n, r) {
    n = n._reactInternals;
    var l = jn(), o = Oi(n), c = qi(l, o);
    c.tag = 2, r != null && (c.callback = r), r = Ll(n, c, o), r !== null && (Nr(r, n, o, l), kc(r, n, o));
  } };
  function Fv(n, r, l, o, c, d, m) {
    return n = n.stateNode, typeof n.shouldComponentUpdate == "function" ? n.shouldComponentUpdate(o, d, m) : r.prototype && r.prototype.isPureReactComponent ? !Jo(l, o) || !Jo(c, d) : !0;
  }
  function Xc(n, r, l) {
    var o = !1, c = Er, d = r.contextType;
    return typeof d == "object" && d !== null ? d = Ma(d) : (c = Mn(r) ? Qr : Sn.current, o = r.contextTypes, d = (o = o != null) ? Wr(n, c) : Er), r = new r(l, d), n.memoizedState = r.state !== null && r.state !== void 0 ? r.state : null, r.updater = qc, n.stateNode = r, r._reactInternals = n, o && (n = n.stateNode, n.__reactInternalMemoizedUnmaskedChildContext = c, n.__reactInternalMemoizedMaskedChildContext = d), r;
  }
  function jv(n, r, l, o) {
    n = r.state, typeof r.componentWillReceiveProps == "function" && r.componentWillReceiveProps(l, o), typeof r.UNSAFE_componentWillReceiveProps == "function" && r.UNSAFE_componentWillReceiveProps(l, o), r.state !== n && qc.enqueueReplaceState(r, r.state, null);
  }
  function Cs(n, r, l, o) {
    var c = n.stateNode;
    c.props = l, c.state = n.memoizedState, c.refs = {}, Rd(n);
    var d = r.contextType;
    typeof d == "object" && d !== null ? c.context = Ma(d) : (d = Mn(r) ? Qr : Sn.current, c.context = Wr(n, d)), c.state = n.memoizedState, d = r.getDerivedStateFromProps, typeof d == "function" && (_d(n, r, d, l), c.state = n.memoizedState), typeof r.getDerivedStateFromProps == "function" || typeof c.getSnapshotBeforeUpdate == "function" || typeof c.UNSAFE_componentWillMount != "function" && typeof c.componentWillMount != "function" || (r = c.state, typeof c.componentWillMount == "function" && c.componentWillMount(), typeof c.UNSAFE_componentWillMount == "function" && c.UNSAFE_componentWillMount(), r !== c.state && qc.enqueueReplaceState(c, c.state, null), ss(n, l, c, o), c.state = n.memoizedState), typeof c.componentDidMount == "function" && (n.flags |= 4194308);
  }
  function bu(n, r) {
    try {
      var l = "", o = r;
      do
        l += nt(o), o = o.return;
      while (o);
      var c = l;
    } catch (d) {
      c = `
Error generating stack: ` + d.message + `
` + d.stack;
    }
    return { value: n, source: r, stack: c, digest: null };
  }
  function Dd(n, r, l) {
    return { value: n, source: null, stack: l ?? null, digest: r ?? null };
  }
  function kd(n, r) {
    try {
      console.error(r.value);
    } catch (l) {
      setTimeout(function() {
        throw l;
      });
    }
  }
  var Kc = typeof WeakMap == "function" ? WeakMap : Map;
  function Hv(n, r, l) {
    l = qi(-1, l), l.tag = 3, l.payload = { element: null };
    var o = r.value;
    return l.callback = function() {
      To || (To = !0, ku = o), kd(n, r);
    }, l;
  }
  function Od(n, r, l) {
    l = qi(-1, l), l.tag = 3;
    var o = n.type.getDerivedStateFromError;
    if (typeof o == "function") {
      var c = r.value;
      l.payload = function() {
        return o(c);
      }, l.callback = function() {
        kd(n, r);
      };
    }
    var d = n.stateNode;
    return d !== null && typeof d.componentDidCatch == "function" && (l.callback = function() {
      kd(n, r), typeof o != "function" && (Al === null ? Al = /* @__PURE__ */ new Set([this]) : Al.add(this));
      var m = r.stack;
      this.componentDidCatch(r.value, { componentStack: m !== null ? m : "" });
    }), l;
  }
  function Ld(n, r, l) {
    var o = n.pingCache;
    if (o === null) {
      o = n.pingCache = new Kc();
      var c = /* @__PURE__ */ new Set();
      o.set(r, c);
    } else c = o.get(r), c === void 0 && (c = /* @__PURE__ */ new Set(), o.set(r, c));
    c.has(l) || (c.add(l), n = dy.bind(null, n, r, l), r.then(n, n));
  }
  function Pv(n) {
    do {
      var r;
      if ((r = n.tag === 13) && (r = n.memoizedState, r = r !== null ? r.dehydrated !== null : !0), r) return n;
      n = n.return;
    } while (n !== null);
    return null;
  }
  function zl(n, r, l, o, c) {
    return n.mode & 1 ? (n.flags |= 65536, n.lanes = c, n) : (n === r ? n.flags |= 65536 : (n.flags |= 128, l.flags |= 131072, l.flags &= -52805, l.tag === 1 && (l.alternate === null ? l.tag = 17 : (r = qi(-1, 1), r.tag = 2, Ll(l, r, 1))), l.lanes |= 1), n);
  }
  var Rs = pt.ReactCurrentOwner, Un = !1;
  function lr(n, r, l, o) {
    r.child = n === null ? ie(r, null, l, o) : Tn(r, n.child, l, o);
  }
  function Zr(n, r, l, o, c) {
    l = l.render;
    var d = r.ref;
    return mn(r, c), o = Ml(n, r, l, o, d, c), l = ni(), n !== null && !Un ? (r.updateQueue = n.updateQueue, r.flags &= -2053, n.lanes &= ~c, za(n, r, c)) : (fn && l && xc(r), r.flags |= 1, lr(n, r, o, c), r.child);
  }
  function _u(n, r, l, o, c) {
    if (n === null) {
      var d = l.type;
      return typeof d == "function" && !Id(d) && d.defaultProps === void 0 && l.compare === null && l.defaultProps === void 0 ? (r.tag = 15, r.type = d, qe(n, r, d, o, c)) : (n = js(l.type, null, o, r, r.mode, c), n.ref = r.ref, n.return = r, r.child = n);
    }
    if (d = n.child, !(n.lanes & c)) {
      var m = d.memoizedProps;
      if (l = l.compare, l = l !== null ? l : Jo, l(m, o) && n.ref === r.ref) return za(n, r, c);
    }
    return r.flags |= 1, n = jl(d, o), n.ref = r.ref, n.return = r, r.child = n;
  }
  function qe(n, r, l, o, c) {
    if (n !== null) {
      var d = n.memoizedProps;
      if (Jo(d, o) && n.ref === r.ref) if (Un = !1, r.pendingProps = o = d, (n.lanes & c) !== 0) n.flags & 131072 && (Un = !0);
      else return r.lanes = n.lanes, za(n, r, c);
    }
    return Vv(n, r, l, o, c);
  }
  function Ts(n, r, l) {
    var o = r.pendingProps, c = o.children, d = n !== null ? n.memoizedState : null;
    if (o.mode === "hidden") if (!(r.mode & 1)) r.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, xe(Eo, ma), ma |= l;
    else {
      if (!(l & 1073741824)) return n = d !== null ? d.baseLanes | l : l, r.lanes = r.childLanes = 1073741824, r.memoizedState = { baseLanes: n, cachePool: null, transitions: null }, r.updateQueue = null, xe(Eo, ma), ma |= n, null;
      r.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, o = d !== null ? d.baseLanes : l, xe(Eo, ma), ma |= o;
    }
    else d !== null ? (o = d.baseLanes | l, r.memoizedState = null) : o = l, xe(Eo, ma), ma |= o;
    return lr(n, r, c, l), r.child;
  }
  function Md(n, r) {
    var l = r.ref;
    (n === null && l !== null || n !== null && n.ref !== l) && (r.flags |= 512, r.flags |= 2097152);
  }
  function Vv(n, r, l, o, c) {
    var d = Mn(l) ? Qr : Sn.current;
    return d = Wr(r, d), mn(r, c), l = Ml(n, r, l, o, d, c), o = ni(), n !== null && !Un ? (r.updateQueue = n.updateQueue, r.flags &= -2053, n.lanes &= ~c, za(n, r, c)) : (fn && o && xc(r), r.flags |= 1, lr(n, r, l, c), r.child);
  }
  function Bv(n, r, l, o, c) {
    if (Mn(l)) {
      var d = !0;
      Xn(r);
    } else d = !1;
    if (mn(r, c), r.stateNode === null) Na(n, r), Xc(r, l, o), Cs(r, l, o, c), o = !0;
    else if (n === null) {
      var m = r.stateNode, E = r.memoizedProps;
      m.props = E;
      var T = m.context, U = l.contextType;
      typeof U == "object" && U !== null ? U = Ma(U) : (U = Mn(l) ? Qr : Sn.current, U = Wr(r, U));
      var I = l.getDerivedStateFromProps, G = typeof I == "function" || typeof m.getSnapshotBeforeUpdate == "function";
      G || typeof m.UNSAFE_componentWillReceiveProps != "function" && typeof m.componentWillReceiveProps != "function" || (E !== o || T !== U) && jv(r, m, o, U), ha = !1;
      var Y = r.memoizedState;
      m.state = Y, ss(r, o, m, c), T = r.memoizedState, E !== o || Y !== T || Yn.current || ha ? (typeof I == "function" && (_d(r, l, I, o), T = r.memoizedState), (E = ha || Fv(r, l, E, o, Y, T, U)) ? (G || typeof m.UNSAFE_componentWillMount != "function" && typeof m.componentWillMount != "function" || (typeof m.componentWillMount == "function" && m.componentWillMount(), typeof m.UNSAFE_componentWillMount == "function" && m.UNSAFE_componentWillMount()), typeof m.componentDidMount == "function" && (r.flags |= 4194308)) : (typeof m.componentDidMount == "function" && (r.flags |= 4194308), r.memoizedProps = o, r.memoizedState = T), m.props = o, m.state = T, m.context = U, o = E) : (typeof m.componentDidMount == "function" && (r.flags |= 4194308), o = !1);
    } else {
      m = r.stateNode, Nv(n, r), E = r.memoizedProps, U = r.type === r.elementType ? E : ri(r.type, E), m.props = U, G = r.pendingProps, Y = m.context, T = l.contextType, typeof T == "object" && T !== null ? T = Ma(T) : (T = Mn(l) ? Qr : Sn.current, T = Wr(r, T));
      var se = l.getDerivedStateFromProps;
      (I = typeof se == "function" || typeof m.getSnapshotBeforeUpdate == "function") || typeof m.UNSAFE_componentWillReceiveProps != "function" && typeof m.componentWillReceiveProps != "function" || (E !== G || Y !== T) && jv(r, m, o, T), ha = !1, Y = r.memoizedState, m.state = Y, ss(r, o, m, c);
      var me = r.memoizedState;
      E !== G || Y !== me || Yn.current || ha ? (typeof se == "function" && (_d(r, l, se, o), me = r.memoizedState), (U = ha || Fv(r, l, U, o, Y, me, T) || !1) ? (I || typeof m.UNSAFE_componentWillUpdate != "function" && typeof m.componentWillUpdate != "function" || (typeof m.componentWillUpdate == "function" && m.componentWillUpdate(o, me, T), typeof m.UNSAFE_componentWillUpdate == "function" && m.UNSAFE_componentWillUpdate(o, me, T)), typeof m.componentDidUpdate == "function" && (r.flags |= 4), typeof m.getSnapshotBeforeUpdate == "function" && (r.flags |= 1024)) : (typeof m.componentDidUpdate != "function" || E === n.memoizedProps && Y === n.memoizedState || (r.flags |= 4), typeof m.getSnapshotBeforeUpdate != "function" || E === n.memoizedProps && Y === n.memoizedState || (r.flags |= 1024), r.memoizedProps = o, r.memoizedState = me), m.props = o, m.state = me, m.context = T, o = U) : (typeof m.componentDidUpdate != "function" || E === n.memoizedProps && Y === n.memoizedState || (r.flags |= 4), typeof m.getSnapshotBeforeUpdate != "function" || E === n.memoizedProps && Y === n.memoizedState || (r.flags |= 1024), o = !1);
    }
    return ws(n, r, l, o, d, c);
  }
  function ws(n, r, l, o, c, d) {
    Md(n, r);
    var m = (r.flags & 128) !== 0;
    if (!o && !m) return c && Tc(r, l, !1), za(n, r, d);
    o = r.stateNode, Rs.current = r;
    var E = m && typeof l.getDerivedStateFromError != "function" ? null : o.render();
    return r.flags |= 1, n !== null && m ? (r.child = Tn(r, n.child, null, d), r.child = Tn(r, null, E, d)) : lr(n, r, E, d), r.memoizedState = o.state, c && Tc(r, l, !0), r.child;
  }
  function go(n) {
    var r = n.stateNode;
    r.pendingContext ? kv(n, r.pendingContext, r.pendingContext !== r.context) : r.context && kv(n, r.context, !1), wd(n, r.containerInfo);
  }
  function $v(n, r, l, o, c) {
    return Ol(), Gi(c), r.flags |= 256, lr(n, r, l, o), r.child;
  }
  var Zc = { dehydrated: null, treeContext: null, retryLane: 0 };
  function Nd(n) {
    return { baseLanes: n, cachePool: null, transitions: null };
  }
  function Jc(n, r, l) {
    var o = r.pendingProps, c = yn.current, d = !1, m = (r.flags & 128) !== 0, E;
    if ((E = m) || (E = n !== null && n.memoizedState === null ? !1 : (c & 2) !== 0), E ? (d = !0, r.flags &= -129) : (n === null || n.memoizedState !== null) && (c |= 1), xe(yn, c & 1), n === null)
      return hd(r), n = r.memoizedState, n !== null && (n = n.dehydrated, n !== null) ? (r.mode & 1 ? n.data === "$!" ? r.lanes = 8 : r.lanes = 1073741824 : r.lanes = 1, null) : (m = o.children, n = o.fallback, d ? (o = r.mode, d = r.child, m = { mode: "hidden", children: m }, !(o & 1) && d !== null ? (d.childLanes = 0, d.pendingProps = m) : d = Hl(m, o, 0, null), n = el(n, o, l, null), d.return = r, n.return = r, d.sibling = n, r.child = d, r.child.memoizedState = Nd(l), r.memoizedState = Zc, n) : zd(r, m));
    if (c = n.memoizedState, c !== null && (E = c.dehydrated, E !== null)) return Yv(n, r, m, o, E, c, l);
    if (d) {
      d = o.fallback, m = r.mode, c = n.child, E = c.sibling;
      var T = { mode: "hidden", children: o.children };
      return !(m & 1) && r.child !== c ? (o = r.child, o.childLanes = 0, o.pendingProps = T, r.deletions = null) : (o = jl(c, T), o.subtreeFlags = c.subtreeFlags & 14680064), E !== null ? d = jl(E, d) : (d = el(d, m, l, null), d.flags |= 2), d.return = r, o.return = r, o.sibling = d, r.child = o, o = d, d = r.child, m = n.child.memoizedState, m = m === null ? Nd(l) : { baseLanes: m.baseLanes | l, cachePool: null, transitions: m.transitions }, d.memoizedState = m, d.childLanes = n.childLanes & ~l, r.memoizedState = Zc, o;
    }
    return d = n.child, n = d.sibling, o = jl(d, { mode: "visible", children: o.children }), !(r.mode & 1) && (o.lanes = l), o.return = r, o.sibling = null, n !== null && (l = r.deletions, l === null ? (r.deletions = [n], r.flags |= 16) : l.push(n)), r.child = o, r.memoizedState = null, o;
  }
  function zd(n, r) {
    return r = Hl({ mode: "visible", children: r }, n.mode, 0, null), r.return = n, n.child = r;
  }
  function xs(n, r, l, o) {
    return o !== null && Gi(o), Tn(r, n.child, null, l), n = zd(r, r.pendingProps.children), n.flags |= 2, r.memoizedState = null, n;
  }
  function Yv(n, r, l, o, c, d, m) {
    if (l)
      return r.flags & 256 ? (r.flags &= -257, o = Dd(Error(z(422))), xs(n, r, m, o)) : r.memoizedState !== null ? (r.child = n.child, r.flags |= 128, null) : (d = o.fallback, c = r.mode, o = Hl({ mode: "visible", children: o.children }, c, 0, null), d = el(d, c, m, null), d.flags |= 2, o.return = r, d.return = r, o.sibling = d, r.child = o, r.mode & 1 && Tn(r, n.child, null, m), r.child.memoizedState = Nd(m), r.memoizedState = Zc, d);
    if (!(r.mode & 1)) return xs(n, r, m, null);
    if (c.data === "$!") {
      if (o = c.nextSibling && c.nextSibling.dataset, o) var E = o.dgst;
      return o = E, d = Error(z(419)), o = Dd(d, o, void 0), xs(n, r, m, o);
    }
    if (E = (m & n.childLanes) !== 0, Un || E) {
      if (o = Qn, o !== null) {
        switch (m & -m) {
          case 4:
            c = 2;
            break;
          case 16:
            c = 8;
            break;
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            c = 32;
            break;
          case 536870912:
            c = 268435456;
            break;
          default:
            c = 0;
        }
        c = c & (o.suspendedLanes | m) ? 0 : c, c !== 0 && c !== d.retryLane && (d.retryLane = c, va(n, c), Nr(o, n, c, -1));
      }
      return Yd(), o = Dd(Error(z(421))), xs(n, r, m, o);
    }
    return c.data === "$?" ? (r.flags |= 128, r.child = n.child, r = py.bind(null, n), c._reactRetry = r, null) : (n = d.treeContext, qr = Si(c.nextSibling), Gr = r, fn = !0, La = null, n !== null && (Nn[Oa++] = Ti, Nn[Oa++] = wi, Nn[Oa++] = da, Ti = n.id, wi = n.overflow, da = r), r = zd(r, o.children), r.flags |= 4096, r);
  }
  function Ud(n, r, l) {
    n.lanes |= r;
    var o = n.alternate;
    o !== null && (o.lanes |= r), Sd(n.return, r, l);
  }
  function Or(n, r, l, o, c) {
    var d = n.memoizedState;
    d === null ? n.memoizedState = { isBackwards: r, rendering: null, renderingStartTime: 0, last: o, tail: l, tailMode: c } : (d.isBackwards = r, d.rendering = null, d.renderingStartTime = 0, d.last = o, d.tail = l, d.tailMode = c);
  }
  function bi(n, r, l) {
    var o = r.pendingProps, c = o.revealOrder, d = o.tail;
    if (lr(n, r, o.children, l), o = yn.current, o & 2) o = o & 1 | 2, r.flags |= 128;
    else {
      if (n !== null && n.flags & 128) e: for (n = r.child; n !== null; ) {
        if (n.tag === 13) n.memoizedState !== null && Ud(n, l, r);
        else if (n.tag === 19) Ud(n, l, r);
        else if (n.child !== null) {
          n.child.return = n, n = n.child;
          continue;
        }
        if (n === r) break e;
        for (; n.sibling === null; ) {
          if (n.return === null || n.return === r) break e;
          n = n.return;
        }
        n.sibling.return = n.return, n = n.sibling;
      }
      o &= 1;
    }
    if (xe(yn, o), !(r.mode & 1)) r.memoizedState = null;
    else switch (c) {
      case "forwards":
        for (l = r.child, c = null; l !== null; ) n = l.alternate, n !== null && Lc(n) === null && (c = l), l = l.sibling;
        l = c, l === null ? (c = r.child, r.child = null) : (c = l.sibling, l.sibling = null), Or(r, !1, c, l, d);
        break;
      case "backwards":
        for (l = null, c = r.child, r.child = null; c !== null; ) {
          if (n = c.alternate, n !== null && Lc(n) === null) {
            r.child = c;
            break;
          }
          n = c.sibling, c.sibling = l, l = c, c = n;
        }
        Or(r, !0, l, null, d);
        break;
      case "together":
        Or(r, !1, null, null, void 0);
        break;
      default:
        r.memoizedState = null;
    }
    return r.child;
  }
  function Na(n, r) {
    !(r.mode & 1) && n !== null && (n.alternate = null, r.alternate = null, r.flags |= 2);
  }
  function za(n, r, l) {
    if (n !== null && (r.dependencies = n.dependencies), ki |= r.lanes, !(l & r.childLanes)) return null;
    if (n !== null && r.child !== n.child) throw Error(z(153));
    if (r.child !== null) {
      for (n = r.child, l = jl(n, n.pendingProps), r.child = l, l.return = r; n.sibling !== null; ) n = n.sibling, l = l.sibling = jl(n, n.pendingProps), l.return = r;
      l.sibling = null;
    }
    return r.child;
  }
  function bs(n, r, l) {
    switch (r.tag) {
      case 3:
        go(r), Ol();
        break;
      case 5:
        Uv(r);
        break;
      case 1:
        Mn(r.type) && Xn(r);
        break;
      case 4:
        wd(r, r.stateNode.containerInfo);
        break;
      case 10:
        var o = r.type._context, c = r.memoizedProps.value;
        xe(pa, o._currentValue), o._currentValue = c;
        break;
      case 13:
        if (o = r.memoizedState, o !== null)
          return o.dehydrated !== null ? (xe(yn, yn.current & 1), r.flags |= 128, null) : l & r.child.childLanes ? Jc(n, r, l) : (xe(yn, yn.current & 1), n = za(n, r, l), n !== null ? n.sibling : null);
        xe(yn, yn.current & 1);
        break;
      case 19:
        if (o = (l & r.childLanes) !== 0, n.flags & 128) {
          if (o) return bi(n, r, l);
          r.flags |= 128;
        }
        if (c = r.memoizedState, c !== null && (c.rendering = null, c.tail = null, c.lastEffect = null), xe(yn, yn.current), o) break;
        return null;
      case 22:
      case 23:
        return r.lanes = 0, Ts(n, r, l);
    }
    return za(n, r, l);
  }
  var Ua, An, Iv, Qv;
  Ua = function(n, r) {
    for (var l = r.child; l !== null; ) {
      if (l.tag === 5 || l.tag === 6) n.appendChild(l.stateNode);
      else if (l.tag !== 4 && l.child !== null) {
        l.child.return = l, l = l.child;
        continue;
      }
      if (l === r) break;
      for (; l.sibling === null; ) {
        if (l.return === null || l.return === r) return;
        l = l.return;
      }
      l.sibling.return = l.return, l = l.sibling;
    }
  }, An = function() {
  }, Iv = function(n, r, l, o) {
    var c = n.memoizedProps;
    if (c !== o) {
      n = r.stateNode, gu(xi.current);
      var d = null;
      switch (l) {
        case "input":
          c = tr(n, c), o = tr(n, o), d = [];
          break;
        case "select":
          c = ne({}, c, { value: void 0 }), o = ne({}, o, { value: void 0 }), d = [];
          break;
        case "textarea":
          c = Bn(n, c), o = Bn(n, o), d = [];
          break;
        default:
          typeof c.onClick != "function" && typeof o.onClick == "function" && (n.onclick = wl);
      }
      ln(l, o);
      var m;
      l = null;
      for (U in c) if (!o.hasOwnProperty(U) && c.hasOwnProperty(U) && c[U] != null) if (U === "style") {
        var E = c[U];
        for (m in E) E.hasOwnProperty(m) && (l || (l = {}), l[m] = "");
      } else U !== "dangerouslySetInnerHTML" && U !== "children" && U !== "suppressContentEditableWarning" && U !== "suppressHydrationWarning" && U !== "autoFocus" && (Ct.hasOwnProperty(U) ? d || (d = []) : (d = d || []).push(U, null));
      for (U in o) {
        var T = o[U];
        if (E = c != null ? c[U] : void 0, o.hasOwnProperty(U) && T !== E && (T != null || E != null)) if (U === "style") if (E) {
          for (m in E) !E.hasOwnProperty(m) || T && T.hasOwnProperty(m) || (l || (l = {}), l[m] = "");
          for (m in T) T.hasOwnProperty(m) && E[m] !== T[m] && (l || (l = {}), l[m] = T[m]);
        } else l || (d || (d = []), d.push(
          U,
          l
        )), l = T;
        else U === "dangerouslySetInnerHTML" ? (T = T ? T.__html : void 0, E = E ? E.__html : void 0, T != null && E !== T && (d = d || []).push(U, T)) : U === "children" ? typeof T != "string" && typeof T != "number" || (d = d || []).push(U, "" + T) : U !== "suppressContentEditableWarning" && U !== "suppressHydrationWarning" && (Ct.hasOwnProperty(U) ? (T != null && U === "onScroll" && jt("scroll", n), d || E === T || (d = [])) : (d = d || []).push(U, T));
      }
      l && (d = d || []).push("style", l);
      var U = d;
      (r.updateQueue = U) && (r.flags |= 4);
    }
  }, Qv = function(n, r, l, o) {
    l !== o && (r.flags |= 4);
  };
  function _s(n, r) {
    if (!fn) switch (n.tailMode) {
      case "hidden":
        r = n.tail;
        for (var l = null; r !== null; ) r.alternate !== null && (l = r), r = r.sibling;
        l === null ? n.tail = null : l.sibling = null;
        break;
      case "collapsed":
        l = n.tail;
        for (var o = null; l !== null; ) l.alternate !== null && (o = l), l = l.sibling;
        o === null ? r || n.tail === null ? n.tail = null : n.tail.sibling = null : o.sibling = null;
    }
  }
  function Zn(n) {
    var r = n.alternate !== null && n.alternate.child === n.child, l = 0, o = 0;
    if (r) for (var c = n.child; c !== null; ) l |= c.lanes | c.childLanes, o |= c.subtreeFlags & 14680064, o |= c.flags & 14680064, c.return = n, c = c.sibling;
    else for (c = n.child; c !== null; ) l |= c.lanes | c.childLanes, o |= c.subtreeFlags, o |= c.flags, c.return = n, c = c.sibling;
    return n.subtreeFlags |= o, n.childLanes = l, r;
  }
  function Wv(n, r, l) {
    var o = r.pendingProps;
    switch (bc(r), r.tag) {
      case 2:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Zn(r), null;
      case 1:
        return Mn(r.type) && po(), Zn(r), null;
      case 3:
        return o = r.stateNode, Su(), nn(Yn), nn(Sn), De(), o.pendingContext && (o.context = o.pendingContext, o.pendingContext = null), (n === null || n.child === null) && (_c(r) ? r.flags |= 4 : n === null || n.memoizedState.isDehydrated && !(r.flags & 256) || (r.flags |= 1024, La !== null && (Ou(La), La = null))), An(n, r), Zn(r), null;
      case 5:
        Oc(r);
        var c = gu(ds.current);
        if (l = r.type, n !== null && r.stateNode != null) Iv(n, r, l, o, c), n.ref !== r.ref && (r.flags |= 512, r.flags |= 2097152);
        else {
          if (!o) {
            if (r.stateNode === null) throw Error(z(166));
            return Zn(r), null;
          }
          if (n = gu(xi.current), _c(r)) {
            o = r.stateNode, l = r.type;
            var d = r.memoizedProps;
            switch (o[Ei] = r, o[is] = d, n = (r.mode & 1) !== 0, l) {
              case "dialog":
                jt("cancel", o), jt("close", o);
                break;
              case "iframe":
              case "object":
              case "embed":
                jt("load", o);
                break;
              case "video":
              case "audio":
                for (c = 0; c < ns.length; c++) jt(ns[c], o);
                break;
              case "source":
                jt("error", o);
                break;
              case "img":
              case "image":
              case "link":
                jt(
                  "error",
                  o
                ), jt("load", o);
                break;
              case "details":
                jt("toggle", o);
                break;
              case "input":
                Pn(o, d), jt("invalid", o);
                break;
              case "select":
                o._wrapperState = { wasMultiple: !!d.multiple }, jt("invalid", o);
                break;
              case "textarea":
                yr(o, d), jt("invalid", o);
            }
            ln(l, d), c = null;
            for (var m in d) if (d.hasOwnProperty(m)) {
              var E = d[m];
              m === "children" ? typeof E == "string" ? o.textContent !== E && (d.suppressHydrationWarning !== !0 && Sc(o.textContent, E, n), c = ["children", E]) : typeof E == "number" && o.textContent !== "" + E && (d.suppressHydrationWarning !== !0 && Sc(
                o.textContent,
                E,
                n
              ), c = ["children", "" + E]) : Ct.hasOwnProperty(m) && E != null && m === "onScroll" && jt("scroll", o);
            }
            switch (l) {
              case "input":
                kn(o), si(o, d, !0);
                break;
              case "textarea":
                kn(o), On(o);
                break;
              case "select":
              case "option":
                break;
              default:
                typeof d.onClick == "function" && (o.onclick = wl);
            }
            o = c, r.updateQueue = o, o !== null && (r.flags |= 4);
          } else {
            m = c.nodeType === 9 ? c : c.ownerDocument, n === "http://www.w3.org/1999/xhtml" && (n = gr(l)), n === "http://www.w3.org/1999/xhtml" ? l === "script" ? (n = m.createElement("div"), n.innerHTML = "<script><\/script>", n = n.removeChild(n.firstChild)) : typeof o.is == "string" ? n = m.createElement(l, { is: o.is }) : (n = m.createElement(l), l === "select" && (m = n, o.multiple ? m.multiple = !0 : o.size && (m.size = o.size))) : n = m.createElementNS(n, l), n[Ei] = r, n[is] = o, Ua(n, r, !1, !1), r.stateNode = n;
            e: {
              switch (m = qn(l, o), l) {
                case "dialog":
                  jt("cancel", n), jt("close", n), c = o;
                  break;
                case "iframe":
                case "object":
                case "embed":
                  jt("load", n), c = o;
                  break;
                case "video":
                case "audio":
                  for (c = 0; c < ns.length; c++) jt(ns[c], n);
                  c = o;
                  break;
                case "source":
                  jt("error", n), c = o;
                  break;
                case "img":
                case "image":
                case "link":
                  jt(
                    "error",
                    n
                  ), jt("load", n), c = o;
                  break;
                case "details":
                  jt("toggle", n), c = o;
                  break;
                case "input":
                  Pn(n, o), c = tr(n, o), jt("invalid", n);
                  break;
                case "option":
                  c = o;
                  break;
                case "select":
                  n._wrapperState = { wasMultiple: !!o.multiple }, c = ne({}, o, { value: void 0 }), jt("invalid", n);
                  break;
                case "textarea":
                  yr(n, o), c = Bn(n, o), jt("invalid", n);
                  break;
                default:
                  c = o;
              }
              ln(l, c), E = c;
              for (d in E) if (E.hasOwnProperty(d)) {
                var T = E[d];
                d === "style" ? Zt(n, T) : d === "dangerouslySetInnerHTML" ? (T = T ? T.__html : void 0, T != null && ci(n, T)) : d === "children" ? typeof T == "string" ? (l !== "textarea" || T !== "") && Z(n, T) : typeof T == "number" && Z(n, "" + T) : d !== "suppressContentEditableWarning" && d !== "suppressHydrationWarning" && d !== "autoFocus" && (Ct.hasOwnProperty(d) ? T != null && d === "onScroll" && jt("scroll", n) : T != null && Ie(n, d, T, m));
              }
              switch (l) {
                case "input":
                  kn(n), si(n, o, !1);
                  break;
                case "textarea":
                  kn(n), On(n);
                  break;
                case "option":
                  o.value != null && n.setAttribute("value", "" + Je(o.value));
                  break;
                case "select":
                  n.multiple = !!o.multiple, d = o.value, d != null ? Cn(n, !!o.multiple, d, !1) : o.defaultValue != null && Cn(
                    n,
                    !!o.multiple,
                    o.defaultValue,
                    !0
                  );
                  break;
                default:
                  typeof c.onClick == "function" && (n.onclick = wl);
              }
              switch (l) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  o = !!o.autoFocus;
                  break e;
                case "img":
                  o = !0;
                  break e;
                default:
                  o = !1;
              }
            }
            o && (r.flags |= 4);
          }
          r.ref !== null && (r.flags |= 512, r.flags |= 2097152);
        }
        return Zn(r), null;
      case 6:
        if (n && r.stateNode != null) Qv(n, r, n.memoizedProps, o);
        else {
          if (typeof o != "string" && r.stateNode === null) throw Error(z(166));
          if (l = gu(ds.current), gu(xi.current), _c(r)) {
            if (o = r.stateNode, l = r.memoizedProps, o[Ei] = r, (d = o.nodeValue !== l) && (n = Gr, n !== null)) switch (n.tag) {
              case 3:
                Sc(o.nodeValue, l, (n.mode & 1) !== 0);
                break;
              case 5:
                n.memoizedProps.suppressHydrationWarning !== !0 && Sc(o.nodeValue, l, (n.mode & 1) !== 0);
            }
            d && (r.flags |= 4);
          } else o = (l.nodeType === 9 ? l : l.ownerDocument).createTextNode(o), o[Ei] = r, r.stateNode = o;
        }
        return Zn(r), null;
      case 13:
        if (nn(yn), o = r.memoizedState, n === null || n.memoizedState !== null && n.memoizedState.dehydrated !== null) {
          if (fn && qr !== null && r.mode & 1 && !(r.flags & 128)) os(), Ol(), r.flags |= 98560, d = !1;
          else if (d = _c(r), o !== null && o.dehydrated !== null) {
            if (n === null) {
              if (!d) throw Error(z(318));
              if (d = r.memoizedState, d = d !== null ? d.dehydrated : null, !d) throw Error(z(317));
              d[Ei] = r;
            } else Ol(), !(r.flags & 128) && (r.memoizedState = null), r.flags |= 4;
            Zn(r), d = !1;
          } else La !== null && (Ou(La), La = null), d = !0;
          if (!d) return r.flags & 65536 ? r : null;
        }
        return r.flags & 128 ? (r.lanes = l, r) : (o = o !== null, o !== (n !== null && n.memoizedState !== null) && o && (r.child.flags |= 8192, r.mode & 1 && (n === null || yn.current & 1 ? bn === 0 && (bn = 3) : Yd())), r.updateQueue !== null && (r.flags |= 4), Zn(r), null);
      case 4:
        return Su(), An(n, r), n === null && uo(r.stateNode.containerInfo), Zn(r), null;
      case 10:
        return gd(r.type._context), Zn(r), null;
      case 17:
        return Mn(r.type) && po(), Zn(r), null;
      case 19:
        if (nn(yn), d = r.memoizedState, d === null) return Zn(r), null;
        if (o = (r.flags & 128) !== 0, m = d.rendering, m === null) if (o) _s(d, !1);
        else {
          if (bn !== 0 || n !== null && n.flags & 128) for (n = r.child; n !== null; ) {
            if (m = Lc(n), m !== null) {
              for (r.flags |= 128, _s(d, !1), o = m.updateQueue, o !== null && (r.updateQueue = o, r.flags |= 4), r.subtreeFlags = 0, o = l, l = r.child; l !== null; ) d = l, n = o, d.flags &= 14680066, m = d.alternate, m === null ? (d.childLanes = 0, d.lanes = n, d.child = null, d.subtreeFlags = 0, d.memoizedProps = null, d.memoizedState = null, d.updateQueue = null, d.dependencies = null, d.stateNode = null) : (d.childLanes = m.childLanes, d.lanes = m.lanes, d.child = m.child, d.subtreeFlags = 0, d.deletions = null, d.memoizedProps = m.memoizedProps, d.memoizedState = m.memoizedState, d.updateQueue = m.updateQueue, d.type = m.type, n = m.dependencies, d.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }), l = l.sibling;
              return xe(yn, yn.current & 1 | 2), r.child;
            }
            n = n.sibling;
          }
          d.tail !== null && Ge() > Ro && (r.flags |= 128, o = !0, _s(d, !1), r.lanes = 4194304);
        }
        else {
          if (!o) if (n = Lc(m), n !== null) {
            if (r.flags |= 128, o = !0, l = n.updateQueue, l !== null && (r.updateQueue = l, r.flags |= 4), _s(d, !0), d.tail === null && d.tailMode === "hidden" && !m.alternate && !fn) return Zn(r), null;
          } else 2 * Ge() - d.renderingStartTime > Ro && l !== 1073741824 && (r.flags |= 128, o = !0, _s(d, !1), r.lanes = 4194304);
          d.isBackwards ? (m.sibling = r.child, r.child = m) : (l = d.last, l !== null ? l.sibling = m : r.child = m, d.last = m);
        }
        return d.tail !== null ? (r = d.tail, d.rendering = r, d.tail = r.sibling, d.renderingStartTime = Ge(), r.sibling = null, l = yn.current, xe(yn, o ? l & 1 | 2 : l & 1), r) : (Zn(r), null);
      case 22:
      case 23:
        return $d(), o = r.memoizedState !== null, n !== null && n.memoizedState !== null !== o && (r.flags |= 8192), o && r.mode & 1 ? ma & 1073741824 && (Zn(r), r.subtreeFlags & 6 && (r.flags |= 8192)) : Zn(r), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(z(156, r.tag));
  }
  function ef(n, r) {
    switch (bc(r), r.tag) {
      case 1:
        return Mn(r.type) && po(), n = r.flags, n & 65536 ? (r.flags = n & -65537 | 128, r) : null;
      case 3:
        return Su(), nn(Yn), nn(Sn), De(), n = r.flags, n & 65536 && !(n & 128) ? (r.flags = n & -65537 | 128, r) : null;
      case 5:
        return Oc(r), null;
      case 13:
        if (nn(yn), n = r.memoizedState, n !== null && n.dehydrated !== null) {
          if (r.alternate === null) throw Error(z(340));
          Ol();
        }
        return n = r.flags, n & 65536 ? (r.flags = n & -65537 | 128, r) : null;
      case 19:
        return nn(yn), null;
      case 4:
        return Su(), null;
      case 10:
        return gd(r.type._context), null;
      case 22:
      case 23:
        return $d(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var Ds = !1, Rr = !1, ly = typeof WeakSet == "function" ? WeakSet : Set, pe = null;
  function So(n, r) {
    var l = n.ref;
    if (l !== null) if (typeof l == "function") try {
      l(null);
    } catch (o) {
      dn(n, r, o);
    }
    else l.current = null;
  }
  function tf(n, r, l) {
    try {
      l();
    } catch (o) {
      dn(n, r, o);
    }
  }
  var Gv = !1;
  function qv(n, r) {
    if (as = ba, n = es(), fc(n)) {
      if ("selectionStart" in n) var l = { start: n.selectionStart, end: n.selectionEnd };
      else e: {
        l = (l = n.ownerDocument) && l.defaultView || window;
        var o = l.getSelection && l.getSelection();
        if (o && o.rangeCount !== 0) {
          l = o.anchorNode;
          var c = o.anchorOffset, d = o.focusNode;
          o = o.focusOffset;
          try {
            l.nodeType, d.nodeType;
          } catch {
            l = null;
            break e;
          }
          var m = 0, E = -1, T = -1, U = 0, I = 0, G = n, Y = null;
          t: for (; ; ) {
            for (var se; G !== l || c !== 0 && G.nodeType !== 3 || (E = m + c), G !== d || o !== 0 && G.nodeType !== 3 || (T = m + o), G.nodeType === 3 && (m += G.nodeValue.length), (se = G.firstChild) !== null; )
              Y = G, G = se;
            for (; ; ) {
              if (G === n) break t;
              if (Y === l && ++U === c && (E = m), Y === d && ++I === o && (T = m), (se = G.nextSibling) !== null) break;
              G = Y, Y = G.parentNode;
            }
            G = se;
          }
          l = E === -1 || T === -1 ? null : { start: E, end: T };
        } else l = null;
      }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (du = { focusedElem: n, selectionRange: l }, ba = !1, pe = r; pe !== null; ) if (r = pe, n = r.child, (r.subtreeFlags & 1028) !== 0 && n !== null) n.return = r, pe = n;
    else for (; pe !== null; ) {
      r = pe;
      try {
        var me = r.alternate;
        if (r.flags & 1024) switch (r.tag) {
          case 0:
          case 11:
          case 15:
            break;
          case 1:
            if (me !== null) {
              var Se = me.memoizedProps, _n = me.memoizedState, D = r.stateNode, x = D.getSnapshotBeforeUpdate(r.elementType === r.type ? Se : ri(r.type, Se), _n);
              D.__reactInternalSnapshotBeforeUpdate = x;
            }
            break;
          case 3:
            var L = r.stateNode.containerInfo;
            L.nodeType === 1 ? L.textContent = "" : L.nodeType === 9 && L.documentElement && L.removeChild(L.documentElement);
            break;
          case 5:
          case 6:
          case 4:
          case 17:
            break;
          default:
            throw Error(z(163));
        }
      } catch (Q) {
        dn(r, r.return, Q);
      }
      if (n = r.sibling, n !== null) {
        n.return = r.return, pe = n;
        break;
      }
      pe = r.return;
    }
    return me = Gv, Gv = !1, me;
  }
  function ks(n, r, l) {
    var o = r.updateQueue;
    if (o = o !== null ? o.lastEffect : null, o !== null) {
      var c = o = o.next;
      do {
        if ((c.tag & n) === n) {
          var d = c.destroy;
          c.destroy = void 0, d !== void 0 && tf(r, l, d);
        }
        c = c.next;
      } while (c !== o);
    }
  }
  function Os(n, r) {
    if (r = r.updateQueue, r = r !== null ? r.lastEffect : null, r !== null) {
      var l = r = r.next;
      do {
        if ((l.tag & n) === n) {
          var o = l.create;
          l.destroy = o();
        }
        l = l.next;
      } while (l !== r);
    }
  }
  function Ad(n) {
    var r = n.ref;
    if (r !== null) {
      var l = n.stateNode;
      switch (n.tag) {
        case 5:
          n = l;
          break;
        default:
          n = l;
      }
      typeof r == "function" ? r(n) : r.current = n;
    }
  }
  function nf(n) {
    var r = n.alternate;
    r !== null && (n.alternate = null, nf(r)), n.child = null, n.deletions = null, n.sibling = null, n.tag === 5 && (r = n.stateNode, r !== null && (delete r[Ei], delete r[is], delete r[ls], delete r[fo], delete r[ay])), n.stateNode = null, n.return = null, n.dependencies = null, n.memoizedProps = null, n.memoizedState = null, n.pendingProps = null, n.stateNode = null, n.updateQueue = null;
  }
  function Ls(n) {
    return n.tag === 5 || n.tag === 3 || n.tag === 4;
  }
  function Ki(n) {
    e: for (; ; ) {
      for (; n.sibling === null; ) {
        if (n.return === null || Ls(n.return)) return null;
        n = n.return;
      }
      for (n.sibling.return = n.return, n = n.sibling; n.tag !== 5 && n.tag !== 6 && n.tag !== 18; ) {
        if (n.flags & 2 || n.child === null || n.tag === 4) continue e;
        n.child.return = n, n = n.child;
      }
      if (!(n.flags & 2)) return n.stateNode;
    }
  }
  function _i(n, r, l) {
    var o = n.tag;
    if (o === 5 || o === 6) n = n.stateNode, r ? l.nodeType === 8 ? l.parentNode.insertBefore(n, r) : l.insertBefore(n, r) : (l.nodeType === 8 ? (r = l.parentNode, r.insertBefore(n, l)) : (r = l, r.appendChild(n)), l = l._reactRootContainer, l != null || r.onclick !== null || (r.onclick = wl));
    else if (o !== 4 && (n = n.child, n !== null)) for (_i(n, r, l), n = n.sibling; n !== null; ) _i(n, r, l), n = n.sibling;
  }
  function Di(n, r, l) {
    var o = n.tag;
    if (o === 5 || o === 6) n = n.stateNode, r ? l.insertBefore(n, r) : l.appendChild(n);
    else if (o !== 4 && (n = n.child, n !== null)) for (Di(n, r, l), n = n.sibling; n !== null; ) Di(n, r, l), n = n.sibling;
  }
  var xn = null, Lr = !1;
  function Mr(n, r, l) {
    for (l = l.child; l !== null; ) Xv(n, r, l), l = l.sibling;
  }
  function Xv(n, r, l) {
    if (Yr && typeof Yr.onCommitFiberUnmount == "function") try {
      Yr.onCommitFiberUnmount(hl, l);
    } catch {
    }
    switch (l.tag) {
      case 5:
        Rr || So(l, r);
      case 6:
        var o = xn, c = Lr;
        xn = null, Mr(n, r, l), xn = o, Lr = c, xn !== null && (Lr ? (n = xn, l = l.stateNode, n.nodeType === 8 ? n.parentNode.removeChild(l) : n.removeChild(l)) : xn.removeChild(l.stateNode));
        break;
      case 18:
        xn !== null && (Lr ? (n = xn, l = l.stateNode, n.nodeType === 8 ? co(n.parentNode, l) : n.nodeType === 1 && co(n, l), Za(n)) : co(xn, l.stateNode));
        break;
      case 4:
        o = xn, c = Lr, xn = l.stateNode.containerInfo, Lr = !0, Mr(n, r, l), xn = o, Lr = c;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!Rr && (o = l.updateQueue, o !== null && (o = o.lastEffect, o !== null))) {
          c = o = o.next;
          do {
            var d = c, m = d.destroy;
            d = d.tag, m !== void 0 && (d & 2 || d & 4) && tf(l, r, m), c = c.next;
          } while (c !== o);
        }
        Mr(n, r, l);
        break;
      case 1:
        if (!Rr && (So(l, r), o = l.stateNode, typeof o.componentWillUnmount == "function")) try {
          o.props = l.memoizedProps, o.state = l.memoizedState, o.componentWillUnmount();
        } catch (E) {
          dn(l, r, E);
        }
        Mr(n, r, l);
        break;
      case 21:
        Mr(n, r, l);
        break;
      case 22:
        l.mode & 1 ? (Rr = (o = Rr) || l.memoizedState !== null, Mr(n, r, l), Rr = o) : Mr(n, r, l);
        break;
      default:
        Mr(n, r, l);
    }
  }
  function Kv(n) {
    var r = n.updateQueue;
    if (r !== null) {
      n.updateQueue = null;
      var l = n.stateNode;
      l === null && (l = n.stateNode = new ly()), r.forEach(function(o) {
        var c = lh.bind(null, n, o);
        l.has(o) || (l.add(o), o.then(c, c));
      });
    }
  }
  function ai(n, r) {
    var l = r.deletions;
    if (l !== null) for (var o = 0; o < l.length; o++) {
      var c = l[o];
      try {
        var d = n, m = r, E = m;
        e: for (; E !== null; ) {
          switch (E.tag) {
            case 5:
              xn = E.stateNode, Lr = !1;
              break e;
            case 3:
              xn = E.stateNode.containerInfo, Lr = !0;
              break e;
            case 4:
              xn = E.stateNode.containerInfo, Lr = !0;
              break e;
          }
          E = E.return;
        }
        if (xn === null) throw Error(z(160));
        Xv(d, m, c), xn = null, Lr = !1;
        var T = c.alternate;
        T !== null && (T.return = null), c.return = null;
      } catch (U) {
        dn(c, r, U);
      }
    }
    if (r.subtreeFlags & 12854) for (r = r.child; r !== null; ) Fd(r, n), r = r.sibling;
  }
  function Fd(n, r) {
    var l = n.alternate, o = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (ai(r, n), Jr(n), o & 4) {
          try {
            ks(3, n, n.return), Os(3, n);
          } catch (Se) {
            dn(n, n.return, Se);
          }
          try {
            ks(5, n, n.return);
          } catch (Se) {
            dn(n, n.return, Se);
          }
        }
        break;
      case 1:
        ai(r, n), Jr(n), o & 512 && l !== null && So(l, l.return);
        break;
      case 5:
        if (ai(r, n), Jr(n), o & 512 && l !== null && So(l, l.return), n.flags & 32) {
          var c = n.stateNode;
          try {
            Z(c, "");
          } catch (Se) {
            dn(n, n.return, Se);
          }
        }
        if (o & 4 && (c = n.stateNode, c != null)) {
          var d = n.memoizedProps, m = l !== null ? l.memoizedProps : d, E = n.type, T = n.updateQueue;
          if (n.updateQueue = null, T !== null) try {
            E === "input" && d.type === "radio" && d.name != null && Vn(c, d), qn(E, m);
            var U = qn(E, d);
            for (m = 0; m < T.length; m += 2) {
              var I = T[m], G = T[m + 1];
              I === "style" ? Zt(c, G) : I === "dangerouslySetInnerHTML" ? ci(c, G) : I === "children" ? Z(c, G) : Ie(c, I, G, U);
            }
            switch (E) {
              case "input":
                $r(c, d);
                break;
              case "textarea":
                Ya(c, d);
                break;
              case "select":
                var Y = c._wrapperState.wasMultiple;
                c._wrapperState.wasMultiple = !!d.multiple;
                var se = d.value;
                se != null ? Cn(c, !!d.multiple, se, !1) : Y !== !!d.multiple && (d.defaultValue != null ? Cn(
                  c,
                  !!d.multiple,
                  d.defaultValue,
                  !0
                ) : Cn(c, !!d.multiple, d.multiple ? [] : "", !1));
            }
            c[is] = d;
          } catch (Se) {
            dn(n, n.return, Se);
          }
        }
        break;
      case 6:
        if (ai(r, n), Jr(n), o & 4) {
          if (n.stateNode === null) throw Error(z(162));
          c = n.stateNode, d = n.memoizedProps;
          try {
            c.nodeValue = d;
          } catch (Se) {
            dn(n, n.return, Se);
          }
        }
        break;
      case 3:
        if (ai(r, n), Jr(n), o & 4 && l !== null && l.memoizedState.isDehydrated) try {
          Za(r.containerInfo);
        } catch (Se) {
          dn(n, n.return, Se);
        }
        break;
      case 4:
        ai(r, n), Jr(n);
        break;
      case 13:
        ai(r, n), Jr(n), c = n.child, c.flags & 8192 && (d = c.memoizedState !== null, c.stateNode.isHidden = d, !d || c.alternate !== null && c.alternate.memoizedState !== null || (Pd = Ge())), o & 4 && Kv(n);
        break;
      case 22:
        if (I = l !== null && l.memoizedState !== null, n.mode & 1 ? (Rr = (U = Rr) || I, ai(r, n), Rr = U) : ai(r, n), Jr(n), o & 8192) {
          if (U = n.memoizedState !== null, (n.stateNode.isHidden = U) && !I && n.mode & 1) for (pe = n, I = n.child; I !== null; ) {
            for (G = pe = I; pe !== null; ) {
              switch (Y = pe, se = Y.child, Y.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  ks(4, Y, Y.return);
                  break;
                case 1:
                  So(Y, Y.return);
                  var me = Y.stateNode;
                  if (typeof me.componentWillUnmount == "function") {
                    o = Y, l = Y.return;
                    try {
                      r = o, me.props = r.memoizedProps, me.state = r.memoizedState, me.componentWillUnmount();
                    } catch (Se) {
                      dn(o, l, Se);
                    }
                  }
                  break;
                case 5:
                  So(Y, Y.return);
                  break;
                case 22:
                  if (Y.memoizedState !== null) {
                    Ms(G);
                    continue;
                  }
              }
              se !== null ? (se.return = Y, pe = se) : Ms(G);
            }
            I = I.sibling;
          }
          e: for (I = null, G = n; ; ) {
            if (G.tag === 5) {
              if (I === null) {
                I = G;
                try {
                  c = G.stateNode, U ? (d = c.style, typeof d.setProperty == "function" ? d.setProperty("display", "none", "important") : d.display = "none") : (E = G.stateNode, T = G.memoizedProps.style, m = T != null && T.hasOwnProperty("display") ? T.display : null, E.style.display = At("display", m));
                } catch (Se) {
                  dn(n, n.return, Se);
                }
              }
            } else if (G.tag === 6) {
              if (I === null) try {
                G.stateNode.nodeValue = U ? "" : G.memoizedProps;
              } catch (Se) {
                dn(n, n.return, Se);
              }
            } else if ((G.tag !== 22 && G.tag !== 23 || G.memoizedState === null || G === n) && G.child !== null) {
              G.child.return = G, G = G.child;
              continue;
            }
            if (G === n) break e;
            for (; G.sibling === null; ) {
              if (G.return === null || G.return === n) break e;
              I === G && (I = null), G = G.return;
            }
            I === G && (I = null), G.sibling.return = G.return, G = G.sibling;
          }
        }
        break;
      case 19:
        ai(r, n), Jr(n), o & 4 && Kv(n);
        break;
      case 21:
        break;
      default:
        ai(
          r,
          n
        ), Jr(n);
    }
  }
  function Jr(n) {
    var r = n.flags;
    if (r & 2) {
      try {
        e: {
          for (var l = n.return; l !== null; ) {
            if (Ls(l)) {
              var o = l;
              break e;
            }
            l = l.return;
          }
          throw Error(z(160));
        }
        switch (o.tag) {
          case 5:
            var c = o.stateNode;
            o.flags & 32 && (Z(c, ""), o.flags &= -33);
            var d = Ki(n);
            Di(n, d, c);
            break;
          case 3:
          case 4:
            var m = o.stateNode.containerInfo, E = Ki(n);
            _i(n, E, m);
            break;
          default:
            throw Error(z(161));
        }
      } catch (T) {
        dn(n, n.return, T);
      }
      n.flags &= -3;
    }
    r & 4096 && (n.flags &= -4097);
  }
  function uy(n, r, l) {
    pe = n, jd(n);
  }
  function jd(n, r, l) {
    for (var o = (n.mode & 1) !== 0; pe !== null; ) {
      var c = pe, d = c.child;
      if (c.tag === 22 && o) {
        var m = c.memoizedState !== null || Ds;
        if (!m) {
          var E = c.alternate, T = E !== null && E.memoizedState !== null || Rr;
          E = Ds;
          var U = Rr;
          if (Ds = m, (Rr = T) && !U) for (pe = c; pe !== null; ) m = pe, T = m.child, m.tag === 22 && m.memoizedState !== null ? Hd(c) : T !== null ? (T.return = m, pe = T) : Hd(c);
          for (; d !== null; ) pe = d, jd(d), d = d.sibling;
          pe = c, Ds = E, Rr = U;
        }
        Zv(n);
      } else c.subtreeFlags & 8772 && d !== null ? (d.return = c, pe = d) : Zv(n);
    }
  }
  function Zv(n) {
    for (; pe !== null; ) {
      var r = pe;
      if (r.flags & 8772) {
        var l = r.alternate;
        try {
          if (r.flags & 8772) switch (r.tag) {
            case 0:
            case 11:
            case 15:
              Rr || Os(5, r);
              break;
            case 1:
              var o = r.stateNode;
              if (r.flags & 4 && !Rr) if (l === null) o.componentDidMount();
              else {
                var c = r.elementType === r.type ? l.memoizedProps : ri(r.type, l.memoizedProps);
                o.componentDidUpdate(c, l.memoizedState, o.__reactInternalSnapshotBeforeUpdate);
              }
              var d = r.updateQueue;
              d !== null && Td(r, d, o);
              break;
            case 3:
              var m = r.updateQueue;
              if (m !== null) {
                if (l = null, r.child !== null) switch (r.child.tag) {
                  case 5:
                    l = r.child.stateNode;
                    break;
                  case 1:
                    l = r.child.stateNode;
                }
                Td(r, m, l);
              }
              break;
            case 5:
              var E = r.stateNode;
              if (l === null && r.flags & 4) {
                l = E;
                var T = r.memoizedProps;
                switch (r.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    T.autoFocus && l.focus();
                    break;
                  case "img":
                    T.src && (l.src = T.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (r.memoizedState === null) {
                var U = r.alternate;
                if (U !== null) {
                  var I = U.memoizedState;
                  if (I !== null) {
                    var G = I.dehydrated;
                    G !== null && Za(G);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(z(163));
          }
          Rr || r.flags & 512 && Ad(r);
        } catch (Y) {
          dn(r, r.return, Y);
        }
      }
      if (r === n) {
        pe = null;
        break;
      }
      if (l = r.sibling, l !== null) {
        l.return = r.return, pe = l;
        break;
      }
      pe = r.return;
    }
  }
  function Ms(n) {
    for (; pe !== null; ) {
      var r = pe;
      if (r === n) {
        pe = null;
        break;
      }
      var l = r.sibling;
      if (l !== null) {
        l.return = r.return, pe = l;
        break;
      }
      pe = r.return;
    }
  }
  function Hd(n) {
    for (; pe !== null; ) {
      var r = pe;
      try {
        switch (r.tag) {
          case 0:
          case 11:
          case 15:
            var l = r.return;
            try {
              Os(4, r);
            } catch (T) {
              dn(r, l, T);
            }
            break;
          case 1:
            var o = r.stateNode;
            if (typeof o.componentDidMount == "function") {
              var c = r.return;
              try {
                o.componentDidMount();
              } catch (T) {
                dn(r, c, T);
              }
            }
            var d = r.return;
            try {
              Ad(r);
            } catch (T) {
              dn(r, d, T);
            }
            break;
          case 5:
            var m = r.return;
            try {
              Ad(r);
            } catch (T) {
              dn(r, m, T);
            }
        }
      } catch (T) {
        dn(r, r.return, T);
      }
      if (r === n) {
        pe = null;
        break;
      }
      var E = r.sibling;
      if (E !== null) {
        E.return = r.return, pe = E;
        break;
      }
      pe = r.return;
    }
  }
  var oy = Math.ceil, Ul = pt.ReactCurrentDispatcher, Du = pt.ReactCurrentOwner, ur = pt.ReactCurrentBatchConfig, gt = 0, Qn = null, Fn = null, or = 0, ma = 0, Eo = ka(0), bn = 0, Ns = null, ki = 0, Co = 0, rf = 0, zs = null, ea = null, Pd = 0, Ro = 1 / 0, ya = null, To = !1, ku = null, Al = null, af = !1, Zi = null, Us = 0, Fl = 0, wo = null, As = -1, Tr = 0;
  function jn() {
    return gt & 6 ? Ge() : As !== -1 ? As : As = Ge();
  }
  function Oi(n) {
    return n.mode & 1 ? gt & 2 && or !== 0 ? or & -or : iy.transition !== null ? (Tr === 0 && (Tr = qu()), Tr) : (n = kt, n !== 0 || (n = window.event, n = n === void 0 ? 16 : no(n.type)), n) : 1;
  }
  function Nr(n, r, l, o) {
    if (50 < Fl) throw Fl = 0, wo = null, Error(z(185));
    Hi(n, l, o), (!(gt & 2) || n !== Qn) && (n === Qn && (!(gt & 2) && (Co |= l), bn === 4 && ii(n, or)), ta(n, o), l === 1 && gt === 0 && !(r.mode & 1) && (Ro = Ge() + 500, vo && Ri()));
  }
  function ta(n, r) {
    var l = n.callbackNode;
    ru(n, r);
    var o = Ka(n, n === Qn ? or : 0);
    if (o === 0) l !== null && rr(l), n.callbackNode = null, n.callbackPriority = 0;
    else if (r = o & -o, n.callbackPriority !== r) {
      if (l != null && rr(l), r === 1) n.tag === 0 ? bl(Vd.bind(null, n)) : wc(Vd.bind(null, n)), so(function() {
        !(gt & 6) && Ri();
      }), l = null;
      else {
        switch (Ku(o)) {
          case 1:
            l = qa;
            break;
          case 4:
            l = tu;
            break;
          case 16:
            l = nu;
            break;
          case 536870912:
            l = Qu;
            break;
          default:
            l = nu;
        }
        l = oh(l, lf.bind(null, n));
      }
      n.callbackPriority = r, n.callbackNode = l;
    }
  }
  function lf(n, r) {
    if (As = -1, Tr = 0, gt & 6) throw Error(z(327));
    var l = n.callbackNode;
    if (xo() && n.callbackNode !== l) return null;
    var o = Ka(n, n === Qn ? or : 0);
    if (o === 0) return null;
    if (o & 30 || o & n.expiredLanes || r) r = uf(n, o);
    else {
      r = o;
      var c = gt;
      gt |= 2;
      var d = eh();
      (Qn !== n || or !== r) && (ya = null, Ro = Ge() + 500, Ji(n, r));
      do
        try {
          th();
          break;
        } catch (E) {
          Jv(n, E);
        }
      while (!0);
      yd(), Ul.current = d, gt = c, Fn !== null ? r = 0 : (Qn = null, or = 0, r = bn);
    }
    if (r !== 0) {
      if (r === 2 && (c = yl(n), c !== 0 && (o = c, r = Fs(n, c))), r === 1) throw l = Ns, Ji(n, 0), ii(n, o), ta(n, Ge()), l;
      if (r === 6) ii(n, o);
      else {
        if (c = n.current.alternate, !(o & 30) && !sy(c) && (r = uf(n, o), r === 2 && (d = yl(n), d !== 0 && (o = d, r = Fs(n, d))), r === 1)) throw l = Ns, Ji(n, 0), ii(n, o), ta(n, Ge()), l;
        switch (n.finishedWork = c, n.finishedLanes = o, r) {
          case 0:
          case 1:
            throw Error(z(345));
          case 2:
            Mu(n, ea, ya);
            break;
          case 3:
            if (ii(n, o), (o & 130023424) === o && (r = Pd + 500 - Ge(), 10 < r)) {
              if (Ka(n, 0) !== 0) break;
              if (c = n.suspendedLanes, (c & o) !== o) {
                jn(), n.pingedLanes |= n.suspendedLanes & c;
                break;
              }
              n.timeoutHandle = Cc(Mu.bind(null, n, ea, ya), r);
              break;
            }
            Mu(n, ea, ya);
            break;
          case 4:
            if (ii(n, o), (o & 4194240) === o) break;
            for (r = n.eventTimes, c = -1; 0 < o; ) {
              var m = 31 - _r(o);
              d = 1 << m, m = r[m], m > c && (c = m), o &= ~d;
            }
            if (o = c, o = Ge() - o, o = (120 > o ? 120 : 480 > o ? 480 : 1080 > o ? 1080 : 1920 > o ? 1920 : 3e3 > o ? 3e3 : 4320 > o ? 4320 : 1960 * oy(o / 1960)) - o, 10 < o) {
              n.timeoutHandle = Cc(Mu.bind(null, n, ea, ya), o);
              break;
            }
            Mu(n, ea, ya);
            break;
          case 5:
            Mu(n, ea, ya);
            break;
          default:
            throw Error(z(329));
        }
      }
    }
    return ta(n, Ge()), n.callbackNode === l ? lf.bind(null, n) : null;
  }
  function Fs(n, r) {
    var l = zs;
    return n.current.memoizedState.isDehydrated && (Ji(n, r).flags |= 256), n = uf(n, r), n !== 2 && (r = ea, ea = l, r !== null && Ou(r)), n;
  }
  function Ou(n) {
    ea === null ? ea = n : ea.push.apply(ea, n);
  }
  function sy(n) {
    for (var r = n; ; ) {
      if (r.flags & 16384) {
        var l = r.updateQueue;
        if (l !== null && (l = l.stores, l !== null)) for (var o = 0; o < l.length; o++) {
          var c = l[o], d = c.getSnapshot;
          c = c.value;
          try {
            if (!ei(d(), c)) return !1;
          } catch {
            return !1;
          }
        }
      }
      if (l = r.child, r.subtreeFlags & 16384 && l !== null) l.return = r, r = l;
      else {
        if (r === n) break;
        for (; r.sibling === null; ) {
          if (r.return === null || r.return === n) return !0;
          r = r.return;
        }
        r.sibling.return = r.return, r = r.sibling;
      }
    }
    return !0;
  }
  function ii(n, r) {
    for (r &= ~rf, r &= ~Co, n.suspendedLanes |= r, n.pingedLanes &= ~r, n = n.expirationTimes; 0 < r; ) {
      var l = 31 - _r(r), o = 1 << l;
      n[l] = -1, r &= ~o;
    }
  }
  function Vd(n) {
    if (gt & 6) throw Error(z(327));
    xo();
    var r = Ka(n, 0);
    if (!(r & 1)) return ta(n, Ge()), null;
    var l = uf(n, r);
    if (n.tag !== 0 && l === 2) {
      var o = yl(n);
      o !== 0 && (r = o, l = Fs(n, o));
    }
    if (l === 1) throw l = Ns, Ji(n, 0), ii(n, r), ta(n, Ge()), l;
    if (l === 6) throw Error(z(345));
    return n.finishedWork = n.current.alternate, n.finishedLanes = r, Mu(n, ea, ya), ta(n, Ge()), null;
  }
  function Bd(n, r) {
    var l = gt;
    gt |= 1;
    try {
      return n(r);
    } finally {
      gt = l, gt === 0 && (Ro = Ge() + 500, vo && Ri());
    }
  }
  function Lu(n) {
    Zi !== null && Zi.tag === 0 && !(gt & 6) && xo();
    var r = gt;
    gt |= 1;
    var l = ur.transition, o = kt;
    try {
      if (ur.transition = null, kt = 1, n) return n();
    } finally {
      kt = o, ur.transition = l, gt = r, !(gt & 6) && Ri();
    }
  }
  function $d() {
    ma = Eo.current, nn(Eo);
  }
  function Ji(n, r) {
    n.finishedWork = null, n.finishedLanes = 0;
    var l = n.timeoutHandle;
    if (l !== -1 && (n.timeoutHandle = -1, dd(l)), Fn !== null) for (l = Fn.return; l !== null; ) {
      var o = l;
      switch (bc(o), o.tag) {
        case 1:
          o = o.type.childContextTypes, o != null && po();
          break;
        case 3:
          Su(), nn(Yn), nn(Sn), De();
          break;
        case 5:
          Oc(o);
          break;
        case 4:
          Su();
          break;
        case 13:
          nn(yn);
          break;
        case 19:
          nn(yn);
          break;
        case 10:
          gd(o.type._context);
          break;
        case 22:
        case 23:
          $d();
      }
      l = l.return;
    }
    if (Qn = n, Fn = n = jl(n.current, null), or = ma = r, bn = 0, Ns = null, rf = Co = ki = 0, ea = zs = null, yu !== null) {
      for (r = 0; r < yu.length; r++) if (l = yu[r], o = l.interleaved, o !== null) {
        l.interleaved = null;
        var c = o.next, d = l.pending;
        if (d !== null) {
          var m = d.next;
          d.next = c, o.next = m;
        }
        l.pending = o;
      }
      yu = null;
    }
    return n;
  }
  function Jv(n, r) {
    do {
      var l = Fn;
      try {
        if (yd(), it.current = xu, Mc) {
          for (var o = Lt.memoizedState; o !== null; ) {
            var c = o.queue;
            c !== null && (c.pending = null), o = o.next;
          }
          Mc = !1;
        }
        if (Wt = 0, Kn = zn = Lt = null, vs = !1, Eu = 0, Du.current = null, l === null || l.return === null) {
          bn = 1, Ns = r, Fn = null;
          break;
        }
        e: {
          var d = n, m = l.return, E = l, T = r;
          if (r = or, E.flags |= 32768, T !== null && typeof T == "object" && typeof T.then == "function") {
            var U = T, I = E, G = I.tag;
            if (!(I.mode & 1) && (G === 0 || G === 11 || G === 15)) {
              var Y = I.alternate;
              Y ? (I.updateQueue = Y.updateQueue, I.memoizedState = Y.memoizedState, I.lanes = Y.lanes) : (I.updateQueue = null, I.memoizedState = null);
            }
            var se = Pv(m);
            if (se !== null) {
              se.flags &= -257, zl(se, m, E, d, r), se.mode & 1 && Ld(d, U, r), r = se, T = U;
              var me = r.updateQueue;
              if (me === null) {
                var Se = /* @__PURE__ */ new Set();
                Se.add(T), r.updateQueue = Se;
              } else me.add(T);
              break e;
            } else {
              if (!(r & 1)) {
                Ld(d, U, r), Yd();
                break e;
              }
              T = Error(z(426));
            }
          } else if (fn && E.mode & 1) {
            var _n = Pv(m);
            if (_n !== null) {
              !(_n.flags & 65536) && (_n.flags |= 256), zl(_n, m, E, d, r), Gi(bu(T, E));
              break e;
            }
          }
          d = T = bu(T, E), bn !== 4 && (bn = 2), zs === null ? zs = [d] : zs.push(d), d = m;
          do {
            switch (d.tag) {
              case 3:
                d.flags |= 65536, r &= -r, d.lanes |= r;
                var D = Hv(d, T, r);
                zv(d, D);
                break e;
              case 1:
                E = T;
                var x = d.type, L = d.stateNode;
                if (!(d.flags & 128) && (typeof x.getDerivedStateFromError == "function" || L !== null && typeof L.componentDidCatch == "function" && (Al === null || !Al.has(L)))) {
                  d.flags |= 65536, r &= -r, d.lanes |= r;
                  var Q = Od(d, E, r);
                  zv(d, Q);
                  break e;
                }
            }
            d = d.return;
          } while (d !== null);
        }
        rh(l);
      } catch (ye) {
        r = ye, Fn === l && l !== null && (Fn = l = l.return);
        continue;
      }
      break;
    } while (!0);
  }
  function eh() {
    var n = Ul.current;
    return Ul.current = xu, n === null ? xu : n;
  }
  function Yd() {
    (bn === 0 || bn === 3 || bn === 2) && (bn = 4), Qn === null || !(ki & 268435455) && !(Co & 268435455) || ii(Qn, or);
  }
  function uf(n, r) {
    var l = gt;
    gt |= 2;
    var o = eh();
    (Qn !== n || or !== r) && (ya = null, Ji(n, r));
    do
      try {
        cy();
        break;
      } catch (c) {
        Jv(n, c);
      }
    while (!0);
    if (yd(), gt = l, Ul.current = o, Fn !== null) throw Error(z(261));
    return Qn = null, or = 0, bn;
  }
  function cy() {
    for (; Fn !== null; ) nh(Fn);
  }
  function th() {
    for (; Fn !== null && !Wa(); ) nh(Fn);
  }
  function nh(n) {
    var r = uh(n.alternate, n, ma);
    n.memoizedProps = n.pendingProps, r === null ? rh(n) : Fn = r, Du.current = null;
  }
  function rh(n) {
    var r = n;
    do {
      var l = r.alternate;
      if (n = r.return, r.flags & 32768) {
        if (l = ef(l, r), l !== null) {
          l.flags &= 32767, Fn = l;
          return;
        }
        if (n !== null) n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null;
        else {
          bn = 6, Fn = null;
          return;
        }
      } else if (l = Wv(l, r, ma), l !== null) {
        Fn = l;
        return;
      }
      if (r = r.sibling, r !== null) {
        Fn = r;
        return;
      }
      Fn = r = n;
    } while (r !== null);
    bn === 0 && (bn = 5);
  }
  function Mu(n, r, l) {
    var o = kt, c = ur.transition;
    try {
      ur.transition = null, kt = 1, fy(n, r, l, o);
    } finally {
      ur.transition = c, kt = o;
    }
    return null;
  }
  function fy(n, r, l, o) {
    do
      xo();
    while (Zi !== null);
    if (gt & 6) throw Error(z(327));
    l = n.finishedWork;
    var c = n.finishedLanes;
    if (l === null) return null;
    if (n.finishedWork = null, n.finishedLanes = 0, l === n.current) throw Error(z(177));
    n.callbackNode = null, n.callbackPriority = 0;
    var d = l.lanes | l.childLanes;
    if (If(n, d), n === Qn && (Fn = Qn = null, or = 0), !(l.subtreeFlags & 2064) && !(l.flags & 2064) || af || (af = !0, oh(nu, function() {
      return xo(), null;
    })), d = (l.flags & 15990) !== 0, l.subtreeFlags & 15990 || d) {
      d = ur.transition, ur.transition = null;
      var m = kt;
      kt = 1;
      var E = gt;
      gt |= 4, Du.current = null, qv(n, l), Fd(l, n), io(du), ba = !!as, du = as = null, n.current = l, uy(l), Ga(), gt = E, kt = m, ur.transition = d;
    } else n.current = l;
    if (af && (af = !1, Zi = n, Us = c), d = n.pendingLanes, d === 0 && (Al = null), Yo(l.stateNode), ta(n, Ge()), r !== null) for (o = n.onRecoverableError, l = 0; l < r.length; l++) c = r[l], o(c.value, { componentStack: c.stack, digest: c.digest });
    if (To) throw To = !1, n = ku, ku = null, n;
    return Us & 1 && n.tag !== 0 && xo(), d = n.pendingLanes, d & 1 ? n === wo ? Fl++ : (Fl = 0, wo = n) : Fl = 0, Ri(), null;
  }
  function xo() {
    if (Zi !== null) {
      var n = Ku(Us), r = ur.transition, l = kt;
      try {
        if (ur.transition = null, kt = 16 > n ? 16 : n, Zi === null) var o = !1;
        else {
          if (n = Zi, Zi = null, Us = 0, gt & 6) throw Error(z(331));
          var c = gt;
          for (gt |= 4, pe = n.current; pe !== null; ) {
            var d = pe, m = d.child;
            if (pe.flags & 16) {
              var E = d.deletions;
              if (E !== null) {
                for (var T = 0; T < E.length; T++) {
                  var U = E[T];
                  for (pe = U; pe !== null; ) {
                    var I = pe;
                    switch (I.tag) {
                      case 0:
                      case 11:
                      case 15:
                        ks(8, I, d);
                    }
                    var G = I.child;
                    if (G !== null) G.return = I, pe = G;
                    else for (; pe !== null; ) {
                      I = pe;
                      var Y = I.sibling, se = I.return;
                      if (nf(I), I === U) {
                        pe = null;
                        break;
                      }
                      if (Y !== null) {
                        Y.return = se, pe = Y;
                        break;
                      }
                      pe = se;
                    }
                  }
                }
                var me = d.alternate;
                if (me !== null) {
                  var Se = me.child;
                  if (Se !== null) {
                    me.child = null;
                    do {
                      var _n = Se.sibling;
                      Se.sibling = null, Se = _n;
                    } while (Se !== null);
                  }
                }
                pe = d;
              }
            }
            if (d.subtreeFlags & 2064 && m !== null) m.return = d, pe = m;
            else e: for (; pe !== null; ) {
              if (d = pe, d.flags & 2048) switch (d.tag) {
                case 0:
                case 11:
                case 15:
                  ks(9, d, d.return);
              }
              var D = d.sibling;
              if (D !== null) {
                D.return = d.return, pe = D;
                break e;
              }
              pe = d.return;
            }
          }
          var x = n.current;
          for (pe = x; pe !== null; ) {
            m = pe;
            var L = m.child;
            if (m.subtreeFlags & 2064 && L !== null) L.return = m, pe = L;
            else e: for (m = x; pe !== null; ) {
              if (E = pe, E.flags & 2048) try {
                switch (E.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Os(9, E);
                }
              } catch (ye) {
                dn(E, E.return, ye);
              }
              if (E === m) {
                pe = null;
                break e;
              }
              var Q = E.sibling;
              if (Q !== null) {
                Q.return = E.return, pe = Q;
                break e;
              }
              pe = E.return;
            }
          }
          if (gt = c, Ri(), Yr && typeof Yr.onPostCommitFiberRoot == "function") try {
            Yr.onPostCommitFiberRoot(hl, n);
          } catch {
          }
          o = !0;
        }
        return o;
      } finally {
        kt = l, ur.transition = r;
      }
    }
    return !1;
  }
  function ah(n, r, l) {
    r = bu(l, r), r = Hv(n, r, 1), n = Ll(n, r, 1), r = jn(), n !== null && (Hi(n, 1, r), ta(n, r));
  }
  function dn(n, r, l) {
    if (n.tag === 3) ah(n, n, l);
    else for (; r !== null; ) {
      if (r.tag === 3) {
        ah(r, n, l);
        break;
      } else if (r.tag === 1) {
        var o = r.stateNode;
        if (typeof r.type.getDerivedStateFromError == "function" || typeof o.componentDidCatch == "function" && (Al === null || !Al.has(o))) {
          n = bu(l, n), n = Od(r, n, 1), r = Ll(r, n, 1), n = jn(), r !== null && (Hi(r, 1, n), ta(r, n));
          break;
        }
      }
      r = r.return;
    }
  }
  function dy(n, r, l) {
    var o = n.pingCache;
    o !== null && o.delete(r), r = jn(), n.pingedLanes |= n.suspendedLanes & l, Qn === n && (or & l) === l && (bn === 4 || bn === 3 && (or & 130023424) === or && 500 > Ge() - Pd ? Ji(n, 0) : rf |= l), ta(n, r);
  }
  function ih(n, r) {
    r === 0 && (n.mode & 1 ? (r = fa, fa <<= 1, !(fa & 130023424) && (fa = 4194304)) : r = 1);
    var l = jn();
    n = va(n, r), n !== null && (Hi(n, r, l), ta(n, l));
  }
  function py(n) {
    var r = n.memoizedState, l = 0;
    r !== null && (l = r.retryLane), ih(n, l);
  }
  function lh(n, r) {
    var l = 0;
    switch (n.tag) {
      case 13:
        var o = n.stateNode, c = n.memoizedState;
        c !== null && (l = c.retryLane);
        break;
      case 19:
        o = n.stateNode;
        break;
      default:
        throw Error(z(314));
    }
    o !== null && o.delete(r), ih(n, l);
  }
  var uh;
  uh = function(n, r, l) {
    if (n !== null) if (n.memoizedProps !== r.pendingProps || Yn.current) Un = !0;
    else {
      if (!(n.lanes & l) && !(r.flags & 128)) return Un = !1, bs(n, r, l);
      Un = !!(n.flags & 131072);
    }
    else Un = !1, fn && r.flags & 1048576 && Ov(r, Wi, r.index);
    switch (r.lanes = 0, r.tag) {
      case 2:
        var o = r.type;
        Na(n, r), n = r.pendingProps;
        var c = Wr(r, Sn.current);
        mn(r, l), c = Ml(null, r, o, n, c, l);
        var d = ni();
        return r.flags |= 1, typeof c == "object" && c !== null && typeof c.render == "function" && c.$$typeof === void 0 ? (r.tag = 1, r.memoizedState = null, r.updateQueue = null, Mn(o) ? (d = !0, Xn(r)) : d = !1, r.memoizedState = c.state !== null && c.state !== void 0 ? c.state : null, Rd(r), c.updater = qc, r.stateNode = c, c._reactInternals = r, Cs(r, o, n, l), r = ws(null, r, o, !0, d, l)) : (r.tag = 0, fn && d && xc(r), lr(null, r, c, l), r = r.child), r;
      case 16:
        o = r.elementType;
        e: {
          switch (Na(n, r), n = r.pendingProps, c = o._init, o = c(o._payload), r.type = o, c = r.tag = hy(o), n = ri(o, n), c) {
            case 0:
              r = Vv(null, r, o, n, l);
              break e;
            case 1:
              r = Bv(null, r, o, n, l);
              break e;
            case 11:
              r = Zr(null, r, o, n, l);
              break e;
            case 14:
              r = _u(null, r, o, ri(o.type, n), l);
              break e;
          }
          throw Error(z(
            306,
            o,
            ""
          ));
        }
        return r;
      case 0:
        return o = r.type, c = r.pendingProps, c = r.elementType === o ? c : ri(o, c), Vv(n, r, o, c, l);
      case 1:
        return o = r.type, c = r.pendingProps, c = r.elementType === o ? c : ri(o, c), Bv(n, r, o, c, l);
      case 3:
        e: {
          if (go(r), n === null) throw Error(z(387));
          o = r.pendingProps, d = r.memoizedState, c = d.element, Nv(n, r), ss(r, o, null, l);
          var m = r.memoizedState;
          if (o = m.element, d.isDehydrated) if (d = { element: o, isDehydrated: !1, cache: m.cache, pendingSuspenseBoundaries: m.pendingSuspenseBoundaries, transitions: m.transitions }, r.updateQueue.baseState = d, r.memoizedState = d, r.flags & 256) {
            c = bu(Error(z(423)), r), r = $v(n, r, o, l, c);
            break e;
          } else if (o !== c) {
            c = bu(Error(z(424)), r), r = $v(n, r, o, l, c);
            break e;
          } else for (qr = Si(r.stateNode.containerInfo.firstChild), Gr = r, fn = !0, La = null, l = ie(r, null, o, l), r.child = l; l; ) l.flags = l.flags & -3 | 4096, l = l.sibling;
          else {
            if (Ol(), o === c) {
              r = za(n, r, l);
              break e;
            }
            lr(n, r, o, l);
          }
          r = r.child;
        }
        return r;
      case 5:
        return Uv(r), n === null && hd(r), o = r.type, c = r.pendingProps, d = n !== null ? n.memoizedProps : null, m = c.children, Ec(o, c) ? m = null : d !== null && Ec(o, d) && (r.flags |= 32), Md(n, r), lr(n, r, m, l), r.child;
      case 6:
        return n === null && hd(r), null;
      case 13:
        return Jc(n, r, l);
      case 4:
        return wd(r, r.stateNode.containerInfo), o = r.pendingProps, n === null ? r.child = Tn(r, null, o, l) : lr(n, r, o, l), r.child;
      case 11:
        return o = r.type, c = r.pendingProps, c = r.elementType === o ? c : ri(o, c), Zr(n, r, o, c, l);
      case 7:
        return lr(n, r, r.pendingProps, l), r.child;
      case 8:
        return lr(n, r, r.pendingProps.children, l), r.child;
      case 12:
        return lr(n, r, r.pendingProps.children, l), r.child;
      case 10:
        e: {
          if (o = r.type._context, c = r.pendingProps, d = r.memoizedProps, m = c.value, xe(pa, o._currentValue), o._currentValue = m, d !== null) if (ei(d.value, m)) {
            if (d.children === c.children && !Yn.current) {
              r = za(n, r, l);
              break e;
            }
          } else for (d = r.child, d !== null && (d.return = r); d !== null; ) {
            var E = d.dependencies;
            if (E !== null) {
              m = d.child;
              for (var T = E.firstContext; T !== null; ) {
                if (T.context === o) {
                  if (d.tag === 1) {
                    T = qi(-1, l & -l), T.tag = 2;
                    var U = d.updateQueue;
                    if (U !== null) {
                      U = U.shared;
                      var I = U.pending;
                      I === null ? T.next = T : (T.next = I.next, I.next = T), U.pending = T;
                    }
                  }
                  d.lanes |= l, T = d.alternate, T !== null && (T.lanes |= l), Sd(
                    d.return,
                    l,
                    r
                  ), E.lanes |= l;
                  break;
                }
                T = T.next;
              }
            } else if (d.tag === 10) m = d.type === r.type ? null : d.child;
            else if (d.tag === 18) {
              if (m = d.return, m === null) throw Error(z(341));
              m.lanes |= l, E = m.alternate, E !== null && (E.lanes |= l), Sd(m, l, r), m = d.sibling;
            } else m = d.child;
            if (m !== null) m.return = d;
            else for (m = d; m !== null; ) {
              if (m === r) {
                m = null;
                break;
              }
              if (d = m.sibling, d !== null) {
                d.return = m.return, m = d;
                break;
              }
              m = m.return;
            }
            d = m;
          }
          lr(n, r, c.children, l), r = r.child;
        }
        return r;
      case 9:
        return c = r.type, o = r.pendingProps.children, mn(r, l), c = Ma(c), o = o(c), r.flags |= 1, lr(n, r, o, l), r.child;
      case 14:
        return o = r.type, c = ri(o, r.pendingProps), c = ri(o.type, c), _u(n, r, o, c, l);
      case 15:
        return qe(n, r, r.type, r.pendingProps, l);
      case 17:
        return o = r.type, c = r.pendingProps, c = r.elementType === o ? c : ri(o, c), Na(n, r), r.tag = 1, Mn(o) ? (n = !0, Xn(r)) : n = !1, mn(r, l), Xc(r, o, c), Cs(r, o, c, l), ws(null, r, o, !0, n, l);
      case 19:
        return bi(n, r, l);
      case 22:
        return Ts(n, r, l);
    }
    throw Error(z(156, r.tag));
  };
  function oh(n, r) {
    return un(n, r);
  }
  function vy(n, r, l, o) {
    this.tag = n, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = r, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = o, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Aa(n, r, l, o) {
    return new vy(n, r, l, o);
  }
  function Id(n) {
    return n = n.prototype, !(!n || !n.isReactComponent);
  }
  function hy(n) {
    if (typeof n == "function") return Id(n) ? 1 : 0;
    if (n != null) {
      if (n = n.$$typeof, n === xt) return 11;
      if (n === bt) return 14;
    }
    return 2;
  }
  function jl(n, r) {
    var l = n.alternate;
    return l === null ? (l = Aa(n.tag, r, n.key, n.mode), l.elementType = n.elementType, l.type = n.type, l.stateNode = n.stateNode, l.alternate = n, n.alternate = l) : (l.pendingProps = r, l.type = n.type, l.flags = 0, l.subtreeFlags = 0, l.deletions = null), l.flags = n.flags & 14680064, l.childLanes = n.childLanes, l.lanes = n.lanes, l.child = n.child, l.memoizedProps = n.memoizedProps, l.memoizedState = n.memoizedState, l.updateQueue = n.updateQueue, r = n.dependencies, l.dependencies = r === null ? null : { lanes: r.lanes, firstContext: r.firstContext }, l.sibling = n.sibling, l.index = n.index, l.ref = n.ref, l;
  }
  function js(n, r, l, o, c, d) {
    var m = 2;
    if (o = n, typeof n == "function") Id(n) && (m = 1);
    else if (typeof n == "string") m = 5;
    else e: switch (n) {
      case Fe:
        return el(l.children, c, d, r);
      case rn:
        m = 8, c |= 8;
        break;
      case Ft:
        return n = Aa(12, l, r, c | 2), n.elementType = Ft, n.lanes = d, n;
      case ke:
        return n = Aa(13, l, r, c), n.elementType = ke, n.lanes = d, n;
      case Ut:
        return n = Aa(19, l, r, c), n.elementType = Ut, n.lanes = d, n;
      case Ee:
        return Hl(l, c, d, r);
      default:
        if (typeof n == "object" && n !== null) switch (n.$$typeof) {
          case Kt:
            m = 10;
            break e;
          case an:
            m = 9;
            break e;
          case xt:
            m = 11;
            break e;
          case bt:
            m = 14;
            break e;
          case Dt:
            m = 16, o = null;
            break e;
        }
        throw Error(z(130, n == null ? n : typeof n, ""));
    }
    return r = Aa(m, l, r, c), r.elementType = n, r.type = o, r.lanes = d, r;
  }
  function el(n, r, l, o) {
    return n = Aa(7, n, o, r), n.lanes = l, n;
  }
  function Hl(n, r, l, o) {
    return n = Aa(22, n, o, r), n.elementType = Ee, n.lanes = l, n.stateNode = { isHidden: !1 }, n;
  }
  function Qd(n, r, l) {
    return n = Aa(6, n, null, r), n.lanes = l, n;
  }
  function of(n, r, l) {
    return r = Aa(4, n.children !== null ? n.children : [], n.key, r), r.lanes = l, r.stateNode = { containerInfo: n.containerInfo, pendingChildren: null, implementation: n.implementation }, r;
  }
  function sh(n, r, l, o, c) {
    this.tag = r, this.containerInfo = n, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Xu(0), this.expirationTimes = Xu(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Xu(0), this.identifierPrefix = o, this.onRecoverableError = c, this.mutableSourceEagerHydrationData = null;
  }
  function sf(n, r, l, o, c, d, m, E, T) {
    return n = new sh(n, r, l, E, T), r === 1 ? (r = 1, d === !0 && (r |= 8)) : r = 0, d = Aa(3, null, null, r), n.current = d, d.stateNode = n, d.memoizedState = { element: o, isDehydrated: l, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Rd(d), n;
  }
  function my(n, r, l) {
    var o = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: ut, key: o == null ? null : "" + o, children: n, containerInfo: r, implementation: l };
  }
  function Wd(n) {
    if (!n) return Er;
    n = n._reactInternals;
    e: {
      if (We(n) !== n || n.tag !== 1) throw Error(z(170));
      var r = n;
      do {
        switch (r.tag) {
          case 3:
            r = r.stateNode.context;
            break e;
          case 1:
            if (Mn(r.type)) {
              r = r.stateNode.__reactInternalMemoizedMergedChildContext;
              break e;
            }
        }
        r = r.return;
      } while (r !== null);
      throw Error(z(171));
    }
    if (n.tag === 1) {
      var l = n.type;
      if (Mn(l)) return us(n, l, r);
    }
    return r;
  }
  function ch(n, r, l, o, c, d, m, E, T) {
    return n = sf(l, o, !0, n, c, d, m, E, T), n.context = Wd(null), l = n.current, o = jn(), c = Oi(l), d = qi(o, c), d.callback = r ?? null, Ll(l, d, c), n.current.lanes = c, Hi(n, c, o), ta(n, o), n;
  }
  function cf(n, r, l, o) {
    var c = r.current, d = jn(), m = Oi(c);
    return l = Wd(l), r.context === null ? r.context = l : r.pendingContext = l, r = qi(d, m), r.payload = { element: n }, o = o === void 0 ? null : o, o !== null && (r.callback = o), n = Ll(c, r, m), n !== null && (Nr(n, c, m, d), kc(n, c, m)), m;
  }
  function ff(n) {
    if (n = n.current, !n.child) return null;
    switch (n.child.tag) {
      case 5:
        return n.child.stateNode;
      default:
        return n.child.stateNode;
    }
  }
  function Gd(n, r) {
    if (n = n.memoizedState, n !== null && n.dehydrated !== null) {
      var l = n.retryLane;
      n.retryLane = l !== 0 && l < r ? l : r;
    }
  }
  function df(n, r) {
    Gd(n, r), (n = n.alternate) && Gd(n, r);
  }
  function fh() {
    return null;
  }
  var Nu = typeof reportError == "function" ? reportError : function(n) {
    console.error(n);
  };
  function qd(n) {
    this._internalRoot = n;
  }
  pf.prototype.render = qd.prototype.render = function(n) {
    var r = this._internalRoot;
    if (r === null) throw Error(z(409));
    cf(n, r, null, null);
  }, pf.prototype.unmount = qd.prototype.unmount = function() {
    var n = this._internalRoot;
    if (n !== null) {
      this._internalRoot = null;
      var r = n.containerInfo;
      Lu(function() {
        cf(null, n, null, null);
      }), r[Ii] = null;
    }
  };
  function pf(n) {
    this._internalRoot = n;
  }
  pf.prototype.unstable_scheduleHydration = function(n) {
    if (n) {
      var r = Ve();
      n = { blockedOn: null, target: n, priority: r };
      for (var l = 0; l < $n.length && r !== 0 && r < $n[l].priority; l++) ;
      $n.splice(l, 0, n), l === 0 && Wo(n);
    }
  };
  function Xd(n) {
    return !(!n || n.nodeType !== 1 && n.nodeType !== 9 && n.nodeType !== 11);
  }
  function vf(n) {
    return !(!n || n.nodeType !== 1 && n.nodeType !== 9 && n.nodeType !== 11 && (n.nodeType !== 8 || n.nodeValue !== " react-mount-point-unstable "));
  }
  function dh() {
  }
  function yy(n, r, l, o, c) {
    if (c) {
      if (typeof o == "function") {
        var d = o;
        o = function() {
          var U = ff(m);
          d.call(U);
        };
      }
      var m = ch(r, o, n, 0, null, !1, !1, "", dh);
      return n._reactRootContainer = m, n[Ii] = m.current, uo(n.nodeType === 8 ? n.parentNode : n), Lu(), m;
    }
    for (; c = n.lastChild; ) n.removeChild(c);
    if (typeof o == "function") {
      var E = o;
      o = function() {
        var U = ff(T);
        E.call(U);
      };
    }
    var T = sf(n, 0, !1, null, null, !1, !1, "", dh);
    return n._reactRootContainer = T, n[Ii] = T.current, uo(n.nodeType === 8 ? n.parentNode : n), Lu(function() {
      cf(r, T, l, o);
    }), T;
  }
  function Hs(n, r, l, o, c) {
    var d = l._reactRootContainer;
    if (d) {
      var m = d;
      if (typeof c == "function") {
        var E = c;
        c = function() {
          var T = ff(m);
          E.call(T);
        };
      }
      cf(r, m, n, c);
    } else m = yy(l, r, n, c, o);
    return ff(m);
  }
  Tt = function(n) {
    switch (n.tag) {
      case 3:
        var r = n.stateNode;
        if (r.current.memoizedState.isDehydrated) {
          var l = Xa(r.pendingLanes);
          l !== 0 && (Pi(r, l | 1), ta(r, Ge()), !(gt & 6) && (Ro = Ge() + 500, Ri()));
        }
        break;
      case 13:
        Lu(function() {
          var o = va(n, 1);
          if (o !== null) {
            var c = jn();
            Nr(o, n, 1, c);
          }
        }), df(n, 1);
    }
  }, Io = function(n) {
    if (n.tag === 13) {
      var r = va(n, 134217728);
      if (r !== null) {
        var l = jn();
        Nr(r, n, 134217728, l);
      }
      df(n, 134217728);
    }
  }, vi = function(n) {
    if (n.tag === 13) {
      var r = Oi(n), l = va(n, r);
      if (l !== null) {
        var o = jn();
        Nr(l, n, r, o);
      }
      df(n, r);
    }
  }, Ve = function() {
    return kt;
  }, Zu = function(n, r) {
    var l = kt;
    try {
      return kt = n, r();
    } finally {
      kt = l;
    }
  }, $t = function(n, r, l) {
    switch (r) {
      case "input":
        if ($r(n, l), r = l.name, l.type === "radio" && r != null) {
          for (l = n; l.parentNode; ) l = l.parentNode;
          for (l = l.querySelectorAll("input[name=" + JSON.stringify("" + r) + '][type="radio"]'), r = 0; r < l.length; r++) {
            var o = l[r];
            if (o !== n && o.form === n.form) {
              var c = hn(o);
              if (!c) throw Error(z(90));
              wr(o), $r(o, c);
            }
          }
        }
        break;
      case "textarea":
        Ya(n, l);
        break;
      case "select":
        r = l.value, r != null && Cn(n, !!l.multiple, r, !1);
    }
  }, Jl = Bd, dl = Lu;
  var gy = { usingClientEntryPoint: !1, Events: [_e, ti, hn, ji, Zl, Bd] }, Ps = { findFiberByHostInstance: pu, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, ph = { bundleType: Ps.bundleType, version: Ps.version, rendererPackageName: Ps.rendererPackageName, rendererConfig: Ps.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: pt.ReactCurrentDispatcher, findHostInstanceByFiber: function(n) {
    return n = Rn(n), n === null ? null : n.stateNode;
  }, findFiberByHostInstance: Ps.findFiberByHostInstance || fh, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Pl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Pl.isDisabled && Pl.supportsFiber) try {
      hl = Pl.inject(ph), Yr = Pl;
    } catch {
    }
  }
  return Ba.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = gy, Ba.createPortal = function(n, r) {
    var l = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!Xd(r)) throw Error(z(200));
    return my(n, r, null, l);
  }, Ba.createRoot = function(n, r) {
    if (!Xd(n)) throw Error(z(299));
    var l = !1, o = "", c = Nu;
    return r != null && (r.unstable_strictMode === !0 && (l = !0), r.identifierPrefix !== void 0 && (o = r.identifierPrefix), r.onRecoverableError !== void 0 && (c = r.onRecoverableError)), r = sf(n, 1, !1, null, null, l, !1, o, c), n[Ii] = r.current, uo(n.nodeType === 8 ? n.parentNode : n), new qd(r);
  }, Ba.findDOMNode = function(n) {
    if (n == null) return null;
    if (n.nodeType === 1) return n;
    var r = n._reactInternals;
    if (r === void 0)
      throw typeof n.render == "function" ? Error(z(188)) : (n = Object.keys(n).join(","), Error(z(268, n)));
    return n = Rn(r), n = n === null ? null : n.stateNode, n;
  }, Ba.flushSync = function(n) {
    return Lu(n);
  }, Ba.hydrate = function(n, r, l) {
    if (!vf(r)) throw Error(z(200));
    return Hs(null, n, r, !0, l);
  }, Ba.hydrateRoot = function(n, r, l) {
    if (!Xd(n)) throw Error(z(405));
    var o = l != null && l.hydratedSources || null, c = !1, d = "", m = Nu;
    if (l != null && (l.unstable_strictMode === !0 && (c = !0), l.identifierPrefix !== void 0 && (d = l.identifierPrefix), l.onRecoverableError !== void 0 && (m = l.onRecoverableError)), r = ch(r, null, n, 1, l ?? null, c, !1, d, m), n[Ii] = r.current, uo(n), o) for (n = 0; n < o.length; n++) l = o[n], c = l._getVersion, c = c(l._source), r.mutableSourceEagerHydrationData == null ? r.mutableSourceEagerHydrationData = [l, c] : r.mutableSourceEagerHydrationData.push(
      l,
      c
    );
    return new pf(r);
  }, Ba.render = function(n, r, l) {
    if (!vf(r)) throw Error(z(200));
    return Hs(null, n, r, !1, l);
  }, Ba.unmountComponentAtNode = function(n) {
    if (!vf(n)) throw Error(z(40));
    return n._reactRootContainer ? (Lu(function() {
      Hs(null, null, n, !1, function() {
        n._reactRootContainer = null, n[Ii] = null;
      });
    }), !0) : !1;
  }, Ba.unstable_batchedUpdates = Bd, Ba.unstable_renderSubtreeIntoContainer = function(n, r, l, o) {
    if (!vf(l)) throw Error(z(200));
    if (n == null || n._reactInternals === void 0) throw Error(z(38));
    return Hs(n, r, l, !1, o);
  }, Ba.version = "18.3.1-next-f1338f8080-20240426", Ba;
}
var $a = {};
/**
 * @license React
 * react-dom.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var rT;
function eD() {
  return rT || (rT = 1, process.env.NODE_ENV !== "production" && function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var J = Jp, W = iT(), z = J.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, ct = !1;
    function Ct(e) {
      ct = e;
    }
    function Rt(e) {
      if (!ct) {
        for (var t = arguments.length, a = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
          a[i - 1] = arguments[i];
        Vt("warn", e, a);
      }
    }
    function S(e) {
      if (!ct) {
        for (var t = arguments.length, a = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
          a[i - 1] = arguments[i];
        Vt("error", e, a);
      }
    }
    function Vt(e, t, a) {
      {
        var i = z.ReactDebugCurrentFrame, u = i.getStackAddendum();
        u !== "" && (t += "%s", a = a.concat([u]));
        var s = a.map(function(f) {
          return String(f);
        });
        s.unshift("Warning: " + t), Function.prototype.apply.call(console[e], console, s);
      }
    }
    var de = 0, ve = 1, lt = 2, ee = 3, Ce = 4, ue = 5, Ye = 6, mt = 7, dt = 8, cn = 9, ft = 10, Ie = 11, pt = 12, be = 13, ut = 14, Fe = 15, rn = 16, Ft = 17, Kt = 18, an = 19, xt = 21, ke = 22, Ut = 23, bt = 24, Dt = 25, Ee = !0, K = !1, Re = !1, ne = !1, _ = !1, P = !0, je = !0, Ue = !0, nt = !0, Ze = /* @__PURE__ */ new Set(), Xe = {}, Je = {};
    function rt(e, t) {
      Pt(e, t), Pt(e + "Capture", t);
    }
    function Pt(e, t) {
      Xe[e] && S("EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.", e), Xe[e] = t;
      {
        var a = e.toLowerCase();
        Je[a] = e, e === "onDoubleClick" && (Je.ondblclick = e);
      }
      for (var i = 0; i < t.length; i++)
        Ze.add(t[i]);
    }
    var kn = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", wr = Object.prototype.hasOwnProperty;
    function En(e) {
      {
        var t = typeof Symbol == "function" && Symbol.toStringTag, a = t && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return a;
      }
    }
    function tr(e) {
      try {
        return Pn(e), !1;
      } catch {
        return !0;
      }
    }
    function Pn(e) {
      return "" + e;
    }
    function Vn(e, t) {
      if (tr(e))
        return S("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before before using it here.", t, En(e)), Pn(e);
    }
    function $r(e) {
      if (tr(e))
        return S("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", En(e)), Pn(e);
    }
    function si(e, t) {
      if (tr(e))
        return S("The provided `%s` prop is an unsupported type %s. This value must be coerced to a string before before using it here.", t, En(e)), Pn(e);
    }
    function oa(e, t) {
      if (tr(e))
        return S("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before before using it here.", t, En(e)), Pn(e);
    }
    function Gn(e) {
      if (tr(e))
        return S("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before before using it here.", En(e)), Pn(e);
    }
    function Cn(e) {
      if (tr(e))
        return S("Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before before using it here.", En(e)), Pn(e);
    }
    var Bn = 0, yr = 1, Ya = 2, On = 3, gr = 4, sa = 5, Ia = 6, ci = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", Z = ci + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040", Te = new RegExp("^[" + ci + "][" + Z + "]*$"), et = {}, At = {};
    function Zt(e) {
      return wr.call(At, e) ? !0 : wr.call(et, e) ? !1 : Te.test(e) ? (At[e] = !0, !0) : (et[e] = !0, S("Invalid attribute name: `%s`", e), !1);
    }
    function pn(e, t, a) {
      return t !== null ? t.type === Bn : a ? !1 : e.length > 2 && (e[0] === "o" || e[0] === "O") && (e[1] === "n" || e[1] === "N");
    }
    function ln(e, t, a, i) {
      if (a !== null && a.type === Bn)
        return !1;
      switch (typeof t) {
        case "function":
        case "symbol":
          return !0;
        case "boolean": {
          if (i)
            return !1;
          if (a !== null)
            return !a.acceptsBooleans;
          var u = e.toLowerCase().slice(0, 5);
          return u !== "data-" && u !== "aria-";
        }
        default:
          return !1;
      }
    }
    function qn(e, t, a, i) {
      if (t === null || typeof t > "u" || ln(e, t, a, i))
        return !0;
      if (i)
        return !1;
      if (a !== null)
        switch (a.type) {
          case On:
            return !t;
          case gr:
            return t === !1;
          case sa:
            return isNaN(t);
          case Ia:
            return isNaN(t) || t < 1;
        }
      return !1;
    }
    function Jt(e) {
      return $t.hasOwnProperty(e) ? $t[e] : null;
    }
    function Bt(e, t, a, i, u, s, f) {
      this.acceptsBooleans = t === Ya || t === On || t === gr, this.attributeName = i, this.attributeNamespace = u, this.mustUseProperty = a, this.propertyName = e, this.type = t, this.sanitizeURL = s, this.removeEmptyString = f;
    }
    var $t = {}, ca = [
      "children",
      "dangerouslySetInnerHTML",
      // TODO: This prevents the assignment of defaultValue to regular
      // elements (not just inputs). Now that ReactDOMInput assigns to the
      // defaultValue property -- do we need this?
      "defaultValue",
      "defaultChecked",
      "innerHTML",
      "suppressContentEditableWarning",
      "suppressHydrationWarning",
      "style"
    ];
    ca.forEach(function(e) {
      $t[e] = new Bt(
        e,
        Bn,
        !1,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
      var t = e[0], a = e[1];
      $t[t] = new Bt(
        t,
        yr,
        !1,
        // mustUseProperty
        a,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
      $t[e] = new Bt(
        e,
        Ya,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
      $t[e] = new Bt(
        e,
        Ya,
        !1,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "allowFullScreen",
      "async",
      // Note: there is a special case that prevents it from being written to the DOM
      // on the client side because the browsers are inconsistent. Instead we call focus().
      "autoFocus",
      "autoPlay",
      "controls",
      "default",
      "defer",
      "disabled",
      "disablePictureInPicture",
      "disableRemotePlayback",
      "formNoValidate",
      "hidden",
      "loop",
      "noModule",
      "noValidate",
      "open",
      "playsInline",
      "readOnly",
      "required",
      "reversed",
      "scoped",
      "seamless",
      // Microdata
      "itemScope"
    ].forEach(function(e) {
      $t[e] = new Bt(
        e,
        On,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "checked",
      // Note: `option.selected` is not updated if `select.multiple` is
      // disabled with `removeAttribute`. We have special logic for handling this.
      "multiple",
      "muted",
      "selected"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      $t[e] = new Bt(
        e,
        On,
        !0,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "capture",
      "download"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      $t[e] = new Bt(
        e,
        gr,
        !1,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "cols",
      "rows",
      "size",
      "span"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      $t[e] = new Bt(
        e,
        Ia,
        !1,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), ["rowSpan", "start"].forEach(function(e) {
      $t[e] = new Bt(
        e,
        sa,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    });
    var Sr = /[\-\:]([a-z])/g, Ta = function(e) {
      return e[1].toUpperCase();
    };
    [
      "accent-height",
      "alignment-baseline",
      "arabic-form",
      "baseline-shift",
      "cap-height",
      "clip-path",
      "clip-rule",
      "color-interpolation",
      "color-interpolation-filters",
      "color-profile",
      "color-rendering",
      "dominant-baseline",
      "enable-background",
      "fill-opacity",
      "fill-rule",
      "flood-color",
      "flood-opacity",
      "font-family",
      "font-size",
      "font-size-adjust",
      "font-stretch",
      "font-style",
      "font-variant",
      "font-weight",
      "glyph-name",
      "glyph-orientation-horizontal",
      "glyph-orientation-vertical",
      "horiz-adv-x",
      "horiz-origin-x",
      "image-rendering",
      "letter-spacing",
      "lighting-color",
      "marker-end",
      "marker-mid",
      "marker-start",
      "overline-position",
      "overline-thickness",
      "paint-order",
      "panose-1",
      "pointer-events",
      "rendering-intent",
      "shape-rendering",
      "stop-color",
      "stop-opacity",
      "strikethrough-position",
      "strikethrough-thickness",
      "stroke-dasharray",
      "stroke-dashoffset",
      "stroke-linecap",
      "stroke-linejoin",
      "stroke-miterlimit",
      "stroke-opacity",
      "stroke-width",
      "text-anchor",
      "text-decoration",
      "text-rendering",
      "underline-position",
      "underline-thickness",
      "unicode-bidi",
      "unicode-range",
      "units-per-em",
      "v-alphabetic",
      "v-hanging",
      "v-ideographic",
      "v-mathematical",
      "vector-effect",
      "vert-adv-y",
      "vert-origin-x",
      "vert-origin-y",
      "word-spacing",
      "writing-mode",
      "xmlns:xlink",
      "x-height"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      var t = e.replace(Sr, Ta);
      $t[t] = new Bt(
        t,
        yr,
        !1,
        // mustUseProperty
        e,
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "xlink:actuate",
      "xlink:arcrole",
      "xlink:role",
      "xlink:show",
      "xlink:title",
      "xlink:type"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      var t = e.replace(Sr, Ta);
      $t[t] = new Bt(
        t,
        yr,
        !1,
        // mustUseProperty
        e,
        "http://www.w3.org/1999/xlink",
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "xml:base",
      "xml:lang",
      "xml:space"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      var t = e.replace(Sr, Ta);
      $t[t] = new Bt(
        t,
        yr,
        !1,
        // mustUseProperty
        e,
        "http://www.w3.org/XML/1998/namespace",
        !1,
        // sanitizeURL
        !1
      );
    }), ["tabIndex", "crossOrigin"].forEach(function(e) {
      $t[e] = new Bt(
        e,
        yr,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    });
    var ji = "xlinkHref";
    $t[ji] = new Bt(
      "xlinkHref",
      yr,
      !1,
      // mustUseProperty
      "xlink:href",
      "http://www.w3.org/1999/xlink",
      !0,
      // sanitizeURL
      !1
    ), ["src", "href", "action", "formAction"].forEach(function(e) {
      $t[e] = new Bt(
        e,
        yr,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !0,
        // sanitizeURL
        !0
      );
    });
    var Zl = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*\:/i, Jl = !1;
    function dl(e) {
      !Jl && Zl.test(e) && (Jl = !0, S("A future version of React will block javascript: URLs as a security precaution. Use event handlers instead if you can. If you need to generate unsafe HTML try using dangerouslySetInnerHTML instead. React was passed %s.", JSON.stringify(e)));
    }
    function pl(e, t, a, i) {
      if (i.mustUseProperty) {
        var u = i.propertyName;
        return e[u];
      } else {
        Vn(a, t), i.sanitizeURL && dl("" + a);
        var s = i.attributeName, f = null;
        if (i.type === gr) {
          if (e.hasAttribute(s)) {
            var p = e.getAttribute(s);
            return p === "" ? !0 : qn(t, a, i, !1) ? p : p === "" + a ? a : p;
          }
        } else if (e.hasAttribute(s)) {
          if (qn(t, a, i, !1))
            return e.getAttribute(s);
          if (i.type === On)
            return a;
          f = e.getAttribute(s);
        }
        return qn(t, a, i, !1) ? f === null ? a : f : f === "" + a ? a : f;
      }
    }
    function eu(e, t, a, i) {
      {
        if (!Zt(t))
          return;
        if (!e.hasAttribute(t))
          return a === void 0 ? void 0 : null;
        var u = e.getAttribute(t);
        return Vn(a, t), u === "" + a ? a : u;
      }
    }
    function xr(e, t, a, i) {
      var u = Jt(t);
      if (!pn(t, u, i)) {
        if (qn(t, a, u, i) && (a = null), i || u === null) {
          if (Zt(t)) {
            var s = t;
            a === null ? e.removeAttribute(s) : (Vn(a, t), e.setAttribute(s, "" + a));
          }
          return;
        }
        var f = u.mustUseProperty;
        if (f) {
          var p = u.propertyName;
          if (a === null) {
            var v = u.type;
            e[p] = v === On ? !1 : "";
          } else
            e[p] = a;
          return;
        }
        var y = u.attributeName, g = u.attributeNamespace;
        if (a === null)
          e.removeAttribute(y);
        else {
          var b = u.type, w;
          b === On || b === gr && a === !0 ? w = "" : (Vn(a, y), w = "" + a, u.sanitizeURL && dl(w.toString())), g ? e.setAttributeNS(g, y, w) : e.setAttribute(y, w);
        }
      }
    }
    var br = Symbol.for("react.element"), nr = Symbol.for("react.portal"), fi = Symbol.for("react.fragment"), Qa = Symbol.for("react.strict_mode"), di = Symbol.for("react.profiler"), pi = Symbol.for("react.provider"), R = Symbol.for("react.context"), B = Symbol.for("react.forward_ref"), ae = Symbol.for("react.suspense"), he = Symbol.for("react.suspense_list"), We = Symbol.for("react.memo"), Be = Symbol.for("react.lazy"), ot = Symbol.for("react.scope"), at = Symbol.for("react.debug_trace_mode"), Rn = Symbol.for("react.offscreen"), en = Symbol.for("react.legacy_hidden"), un = Symbol.for("react.cache"), rr = Symbol.for("react.tracing_marker"), Wa = Symbol.iterator, Ga = "@@iterator";
    function Ge(e) {
      if (e === null || typeof e != "object")
        return null;
      var t = Wa && e[Wa] || e[Ga];
      return typeof t == "function" ? t : null;
    }
    var Ke = Object.assign, qa = 0, tu, nu, vl, Qu, hl, Yr, Yo;
    function _r() {
    }
    _r.__reactDisabledLog = !0;
    function ic() {
      {
        if (qa === 0) {
          tu = console.log, nu = console.info, vl = console.warn, Qu = console.error, hl = console.group, Yr = console.groupCollapsed, Yo = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: _r,
            writable: !0
          };
          Object.defineProperties(console, {
            info: e,
            log: e,
            warn: e,
            error: e,
            group: e,
            groupCollapsed: e,
            groupEnd: e
          });
        }
        qa++;
      }
    }
    function lc() {
      {
        if (qa--, qa === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: Ke({}, e, {
              value: tu
            }),
            info: Ke({}, e, {
              value: nu
            }),
            warn: Ke({}, e, {
              value: vl
            }),
            error: Ke({}, e, {
              value: Qu
            }),
            group: Ke({}, e, {
              value: hl
            }),
            groupCollapsed: Ke({}, e, {
              value: Yr
            }),
            groupEnd: Ke({}, e, {
              value: Yo
            })
          });
        }
        qa < 0 && S("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Wu = z.ReactCurrentDispatcher, ml;
    function fa(e, t, a) {
      {
        if (ml === void 0)
          try {
            throw Error();
          } catch (u) {
            var i = u.stack.trim().match(/\n( *(at )?)/);
            ml = i && i[1] || "";
          }
        return `
` + ml + e;
      }
    }
    var Xa = !1, Ka;
    {
      var Gu = typeof WeakMap == "function" ? WeakMap : Map;
      Ka = new Gu();
    }
    function ru(e, t) {
      if (!e || Xa)
        return "";
      {
        var a = Ka.get(e);
        if (a !== void 0)
          return a;
      }
      var i;
      Xa = !0;
      var u = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var s;
      s = Wu.current, Wu.current = null, ic();
      try {
        if (t) {
          var f = function() {
            throw Error();
          };
          if (Object.defineProperty(f.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(f, []);
            } catch (A) {
              i = A;
            }
            Reflect.construct(e, [], f);
          } else {
            try {
              f.call();
            } catch (A) {
              i = A;
            }
            e.call(f.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (A) {
            i = A;
          }
          e();
        }
      } catch (A) {
        if (A && i && typeof A.stack == "string") {
          for (var p = A.stack.split(`
`), v = i.stack.split(`
`), y = p.length - 1, g = v.length - 1; y >= 1 && g >= 0 && p[y] !== v[g]; )
            g--;
          for (; y >= 1 && g >= 0; y--, g--)
            if (p[y] !== v[g]) {
              if (y !== 1 || g !== 1)
                do
                  if (y--, g--, g < 0 || p[y] !== v[g]) {
                    var b = `
` + p[y].replace(" at new ", " at ");
                    return e.displayName && b.includes("<anonymous>") && (b = b.replace("<anonymous>", e.displayName)), typeof e == "function" && Ka.set(e, b), b;
                  }
                while (y >= 1 && g >= 0);
              break;
            }
        }
      } finally {
        Xa = !1, Wu.current = s, lc(), Error.prepareStackTrace = u;
      }
      var w = e ? e.displayName || e.name : "", M = w ? fa(w) : "";
      return typeof e == "function" && Ka.set(e, M), M;
    }
    function yl(e, t, a) {
      return ru(e, !0);
    }
    function qu(e, t, a) {
      return ru(e, !1);
    }
    function Xu(e) {
      var t = e.prototype;
      return !!(t && t.isReactComponent);
    }
    function Hi(e, t, a) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return ru(e, Xu(e));
      if (typeof e == "string")
        return fa(e);
      switch (e) {
        case ae:
          return fa("Suspense");
        case he:
          return fa("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case B:
            return qu(e.render);
          case We:
            return Hi(e.type, t, a);
          case Be: {
            var i = e, u = i._payload, s = i._init;
            try {
              return Hi(s(u), t, a);
            } catch {
            }
          }
        }
      return "";
    }
    function If(e) {
      switch (e._debugOwner && e._debugOwner.type, e._debugSource, e.tag) {
        case ue:
          return fa(e.type);
        case rn:
          return fa("Lazy");
        case be:
          return fa("Suspense");
        case an:
          return fa("SuspenseList");
        case de:
        case lt:
        case Fe:
          return qu(e.type);
        case Ie:
          return qu(e.type.render);
        case ve:
          return yl(e.type);
        default:
          return "";
      }
    }
    function Pi(e) {
      try {
        var t = "", a = e;
        do
          t += If(a), a = a.return;
        while (a);
        return t;
      } catch (i) {
        return `
Error generating stack: ` + i.message + `
` + i.stack;
      }
    }
    function kt(e, t, a) {
      var i = e.displayName;
      if (i)
        return i;
      var u = t.displayName || t.name || "";
      return u !== "" ? a + "(" + u + ")" : a;
    }
    function Ku(e) {
      return e.displayName || "Context";
    }
    function Tt(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && S("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case fi:
          return "Fragment";
        case nr:
          return "Portal";
        case di:
          return "Profiler";
        case Qa:
          return "StrictMode";
        case ae:
          return "Suspense";
        case he:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case R:
            var t = e;
            return Ku(t) + ".Consumer";
          case pi:
            var a = e;
            return Ku(a._context) + ".Provider";
          case B:
            return kt(e, e.render, "ForwardRef");
          case We:
            var i = e.displayName || null;
            return i !== null ? i : Tt(e.type) || "Memo";
          case Be: {
            var u = e, s = u._payload, f = u._init;
            try {
              return Tt(f(s));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    function Io(e, t, a) {
      var i = t.displayName || t.name || "";
      return e.displayName || (i !== "" ? a + "(" + i + ")" : a);
    }
    function vi(e) {
      return e.displayName || "Context";
    }
    function Ve(e) {
      var t = e.tag, a = e.type;
      switch (t) {
        case bt:
          return "Cache";
        case cn:
          var i = a;
          return vi(i) + ".Consumer";
        case ft:
          var u = a;
          return vi(u._context) + ".Provider";
        case Kt:
          return "DehydratedFragment";
        case Ie:
          return Io(a, a.render, "ForwardRef");
        case mt:
          return "Fragment";
        case ue:
          return a;
        case Ce:
          return "Portal";
        case ee:
          return "Root";
        case Ye:
          return "Text";
        case rn:
          return Tt(a);
        case dt:
          return a === Qa ? "StrictMode" : "Mode";
        case ke:
          return "Offscreen";
        case pt:
          return "Profiler";
        case xt:
          return "Scope";
        case be:
          return "Suspense";
        case an:
          return "SuspenseList";
        case Dt:
          return "TracingMarker";
        case ve:
        case de:
        case Ft:
        case lt:
        case ut:
        case Fe:
          if (typeof a == "function")
            return a.displayName || a.name || null;
          if (typeof a == "string")
            return a;
          break;
      }
      return null;
    }
    var Zu = z.ReactDebugCurrentFrame, ar = null, hi = !1;
    function Dr() {
      {
        if (ar === null)
          return null;
        var e = ar._debugOwner;
        if (e !== null && typeof e < "u")
          return Ve(e);
      }
      return null;
    }
    function mi() {
      return ar === null ? "" : Pi(ar);
    }
    function on() {
      Zu.getCurrentStack = null, ar = null, hi = !1;
    }
    function Yt(e) {
      Zu.getCurrentStack = e === null ? null : mi, ar = e, hi = !1;
    }
    function gl() {
      return ar;
    }
    function $n(e) {
      hi = e;
    }
    function kr(e) {
      return "" + e;
    }
    function wa(e) {
      switch (typeof e) {
        case "boolean":
        case "number":
        case "string":
        case "undefined":
          return e;
        case "object":
          return Cn(e), e;
        default:
          return "";
      }
    }
    var au = {
      button: !0,
      checkbox: !0,
      image: !0,
      hidden: !0,
      radio: !0,
      reset: !0,
      submit: !0
    };
    function Qo(e, t) {
      au[t.type] || t.onChange || t.onInput || t.readOnly || t.disabled || t.value == null || S("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."), t.onChange || t.readOnly || t.disabled || t.checked == null || S("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
    }
    function Wo(e) {
      var t = e.type, a = e.nodeName;
      return a && a.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
    }
    function Sl(e) {
      return e._valueTracker;
    }
    function iu(e) {
      e._valueTracker = null;
    }
    function Qf(e) {
      var t = "";
      return e && (Wo(e) ? t = e.checked ? "true" : "false" : t = e.value), t;
    }
    function xa(e) {
      var t = Wo(e) ? "checked" : "value", a = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
      Cn(e[t]);
      var i = "" + e[t];
      if (!(e.hasOwnProperty(t) || typeof a > "u" || typeof a.get != "function" || typeof a.set != "function")) {
        var u = a.get, s = a.set;
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function() {
            return u.call(this);
          },
          set: function(p) {
            Cn(p), i = "" + p, s.call(this, p);
          }
        }), Object.defineProperty(e, t, {
          enumerable: a.enumerable
        });
        var f = {
          getValue: function() {
            return i;
          },
          setValue: function(p) {
            Cn(p), i = "" + p;
          },
          stopTracking: function() {
            iu(e), delete e[t];
          }
        };
        return f;
      }
    }
    function Za(e) {
      Sl(e) || (e._valueTracker = xa(e));
    }
    function yi(e) {
      if (!e)
        return !1;
      var t = Sl(e);
      if (!t)
        return !0;
      var a = t.getValue(), i = Qf(e);
      return i !== a ? (t.setValue(i), !0) : !1;
    }
    function ba(e) {
      if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u")
        return null;
      try {
        return e.activeElement || e.body;
      } catch {
        return e.body;
      }
    }
    var Ju = !1, eo = !1, El = !1, lu = !1;
    function to(e) {
      var t = e.type === "checkbox" || e.type === "radio";
      return t ? e.checked != null : e.value != null;
    }
    function no(e, t) {
      var a = e, i = t.checked, u = Ke({}, t, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: i ?? a._wrapperState.initialChecked
      });
      return u;
    }
    function Ja(e, t) {
      Qo("input", t), t.checked !== void 0 && t.defaultChecked !== void 0 && !eo && (S("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", Dr() || "A component", t.type), eo = !0), t.value !== void 0 && t.defaultValue !== void 0 && !Ju && (S("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", Dr() || "A component", t.type), Ju = !0);
      var a = e, i = t.defaultValue == null ? "" : t.defaultValue;
      a._wrapperState = {
        initialChecked: t.checked != null ? t.checked : t.defaultChecked,
        initialValue: wa(t.value != null ? t.value : i),
        controlled: to(t)
      };
    }
    function h(e, t) {
      var a = e, i = t.checked;
      i != null && xr(a, "checked", i, !1);
    }
    function C(e, t) {
      var a = e;
      {
        var i = to(t);
        !a._wrapperState.controlled && i && !lu && (S("A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), lu = !0), a._wrapperState.controlled && !i && !El && (S("A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), El = !0);
      }
      h(e, t);
      var u = wa(t.value), s = t.type;
      if (u != null)
        s === "number" ? (u === 0 && a.value === "" || // We explicitly want to coerce to number here if possible.
        // eslint-disable-next-line
        a.value != u) && (a.value = kr(u)) : a.value !== kr(u) && (a.value = kr(u));
      else if (s === "submit" || s === "reset") {
        a.removeAttribute("value");
        return;
      }
      t.hasOwnProperty("value") ? Oe(a, t.type, u) : t.hasOwnProperty("defaultValue") && Oe(a, t.type, wa(t.defaultValue)), t.checked == null && t.defaultChecked != null && (a.defaultChecked = !!t.defaultChecked);
    }
    function N(e, t, a) {
      var i = e;
      if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
        var u = t.type, s = u === "submit" || u === "reset";
        if (s && (t.value === void 0 || t.value === null))
          return;
        var f = kr(i._wrapperState.initialValue);
        a || f !== i.value && (i.value = f), i.defaultValue = f;
      }
      var p = i.name;
      p !== "" && (i.name = ""), i.defaultChecked = !i.defaultChecked, i.defaultChecked = !!i._wrapperState.initialChecked, p !== "" && (i.name = p);
    }
    function F(e, t) {
      var a = e;
      C(a, t), X(a, t);
    }
    function X(e, t) {
      var a = t.name;
      if (t.type === "radio" && a != null) {
        for (var i = e; i.parentNode; )
          i = i.parentNode;
        Vn(a, "name");
        for (var u = i.querySelectorAll("input[name=" + JSON.stringify("" + a) + '][type="radio"]'), s = 0; s < u.length; s++) {
          var f = u[s];
          if (!(f === e || f.form !== e.form)) {
            var p = Lh(f);
            if (!p)
              throw new Error("ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported.");
            yi(f), C(f, p);
          }
        }
      }
    }
    function Oe(e, t, a) {
      // Focused number inputs synchronize on blur. See ChangeEventPlugin.js
      (t !== "number" || ba(e.ownerDocument) !== e) && (a == null ? e.defaultValue = kr(e._wrapperState.initialValue) : e.defaultValue !== kr(a) && (e.defaultValue = kr(a)));
    }
    var re = !1, Ne = !1, st = !1;
    function wt(e, t) {
      t.value == null && (typeof t.children == "object" && t.children !== null ? J.Children.forEach(t.children, function(a) {
        a != null && (typeof a == "string" || typeof a == "number" || Ne || (Ne = !0, S("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>.")));
      }) : t.dangerouslySetInnerHTML != null && (st || (st = !0, S("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected.")))), t.selected != null && !re && (S("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."), re = !0);
    }
    function tn(e, t) {
      t.value != null && e.setAttribute("value", kr(wa(t.value)));
    }
    var It = Array.isArray;
    function tt(e) {
      return It(e);
    }
    var Qt;
    Qt = !1;
    function vn() {
      var e = Dr();
      return e ? `

Check the render method of \`` + e + "`." : "";
    }
    var Cl = ["value", "defaultValue"];
    function Go(e) {
      {
        Qo("select", e);
        for (var t = 0; t < Cl.length; t++) {
          var a = Cl[t];
          if (e[a] != null) {
            var i = tt(e[a]);
            e.multiple && !i ? S("The `%s` prop supplied to <select> must be an array if `multiple` is true.%s", a, vn()) : !e.multiple && i && S("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s", a, vn());
          }
        }
      }
    }
    function Vi(e, t, a, i) {
      var u = e.options;
      if (t) {
        for (var s = a, f = {}, p = 0; p < s.length; p++)
          f["$" + s[p]] = !0;
        for (var v = 0; v < u.length; v++) {
          var y = f.hasOwnProperty("$" + u[v].value);
          u[v].selected !== y && (u[v].selected = y), y && i && (u[v].defaultSelected = !0);
        }
      } else {
        for (var g = kr(wa(a)), b = null, w = 0; w < u.length; w++) {
          if (u[w].value === g) {
            u[w].selected = !0, i && (u[w].defaultSelected = !0);
            return;
          }
          b === null && !u[w].disabled && (b = u[w]);
        }
        b !== null && (b.selected = !0);
      }
    }
    function qo(e, t) {
      return Ke({}, t, {
        value: void 0
      });
    }
    function uu(e, t) {
      var a = e;
      Go(t), a._wrapperState = {
        wasMultiple: !!t.multiple
      }, t.value !== void 0 && t.defaultValue !== void 0 && !Qt && (S("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://reactjs.org/link/controlled-components"), Qt = !0);
    }
    function Wf(e, t) {
      var a = e;
      a.multiple = !!t.multiple;
      var i = t.value;
      i != null ? Vi(a, !!t.multiple, i, !1) : t.defaultValue != null && Vi(a, !!t.multiple, t.defaultValue, !0);
    }
    function uc(e, t) {
      var a = e, i = a._wrapperState.wasMultiple;
      a._wrapperState.wasMultiple = !!t.multiple;
      var u = t.value;
      u != null ? Vi(a, !!t.multiple, u, !1) : i !== !!t.multiple && (t.defaultValue != null ? Vi(a, !!t.multiple, t.defaultValue, !0) : Vi(a, !!t.multiple, t.multiple ? [] : "", !1));
    }
    function Gf(e, t) {
      var a = e, i = t.value;
      i != null && Vi(a, !!t.multiple, i, !1);
    }
    var ev = !1;
    function qf(e, t) {
      var a = e;
      if (t.dangerouslySetInnerHTML != null)
        throw new Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
      var i = Ke({}, t, {
        value: void 0,
        defaultValue: void 0,
        children: kr(a._wrapperState.initialValue)
      });
      return i;
    }
    function Xf(e, t) {
      var a = e;
      Qo("textarea", t), t.value !== void 0 && t.defaultValue !== void 0 && !ev && (S("%s contains a textarea with both value and defaultValue props. Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://reactjs.org/link/controlled-components", Dr() || "A component"), ev = !0);
      var i = t.value;
      if (i == null) {
        var u = t.children, s = t.defaultValue;
        if (u != null) {
          S("Use the `defaultValue` or `value` props instead of setting children on <textarea>.");
          {
            if (s != null)
              throw new Error("If you supply `defaultValue` on a <textarea>, do not pass children.");
            if (tt(u)) {
              if (u.length > 1)
                throw new Error("<textarea> can only have at most one child.");
              u = u[0];
            }
            s = u;
          }
        }
        s == null && (s = ""), i = s;
      }
      a._wrapperState = {
        initialValue: wa(i)
      };
    }
    function tv(e, t) {
      var a = e, i = wa(t.value), u = wa(t.defaultValue);
      if (i != null) {
        var s = kr(i);
        s !== a.value && (a.value = s), t.defaultValue == null && a.defaultValue !== s && (a.defaultValue = s);
      }
      u != null && (a.defaultValue = kr(u));
    }
    function nv(e, t) {
      var a = e, i = a.textContent;
      i === a._wrapperState.initialValue && i !== "" && i !== null && (a.value = i);
    }
    function Wm(e, t) {
      tv(e, t);
    }
    var Bi = "http://www.w3.org/1999/xhtml", Kf = "http://www.w3.org/1998/Math/MathML", Zf = "http://www.w3.org/2000/svg";
    function Jf(e) {
      switch (e) {
        case "svg":
          return Zf;
        case "math":
          return Kf;
        default:
          return Bi;
      }
    }
    function ed(e, t) {
      return e == null || e === Bi ? Jf(t) : e === Zf && t === "foreignObject" ? Bi : e;
    }
    var rv = function(e) {
      return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, a, i, u) {
        MSApp.execUnsafeLocalFunction(function() {
          return e(t, a, i, u);
        });
      } : e;
    }, oc, av = rv(function(e, t) {
      if (e.namespaceURI === Zf && !("innerHTML" in e)) {
        oc = oc || document.createElement("div"), oc.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>";
        for (var a = oc.firstChild; e.firstChild; )
          e.removeChild(e.firstChild);
        for (; a.firstChild; )
          e.appendChild(a.firstChild);
        return;
      }
      e.innerHTML = t;
    }), Ir = 1, $i = 3, Ln = 8, Yi = 9, td = 11, ro = function(e, t) {
      if (t) {
        var a = e.firstChild;
        if (a && a === e.lastChild && a.nodeType === $i) {
          a.nodeValue = t;
          return;
        }
      }
      e.textContent = t;
    }, Xo = {
      animation: ["animationDelay", "animationDirection", "animationDuration", "animationFillMode", "animationIterationCount", "animationName", "animationPlayState", "animationTimingFunction"],
      background: ["backgroundAttachment", "backgroundClip", "backgroundColor", "backgroundImage", "backgroundOrigin", "backgroundPositionX", "backgroundPositionY", "backgroundRepeat", "backgroundSize"],
      backgroundPosition: ["backgroundPositionX", "backgroundPositionY"],
      border: ["borderBottomColor", "borderBottomStyle", "borderBottomWidth", "borderImageOutset", "borderImageRepeat", "borderImageSlice", "borderImageSource", "borderImageWidth", "borderLeftColor", "borderLeftStyle", "borderLeftWidth", "borderRightColor", "borderRightStyle", "borderRightWidth", "borderTopColor", "borderTopStyle", "borderTopWidth"],
      borderBlockEnd: ["borderBlockEndColor", "borderBlockEndStyle", "borderBlockEndWidth"],
      borderBlockStart: ["borderBlockStartColor", "borderBlockStartStyle", "borderBlockStartWidth"],
      borderBottom: ["borderBottomColor", "borderBottomStyle", "borderBottomWidth"],
      borderColor: ["borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor"],
      borderImage: ["borderImageOutset", "borderImageRepeat", "borderImageSlice", "borderImageSource", "borderImageWidth"],
      borderInlineEnd: ["borderInlineEndColor", "borderInlineEndStyle", "borderInlineEndWidth"],
      borderInlineStart: ["borderInlineStartColor", "borderInlineStartStyle", "borderInlineStartWidth"],
      borderLeft: ["borderLeftColor", "borderLeftStyle", "borderLeftWidth"],
      borderRadius: ["borderBottomLeftRadius", "borderBottomRightRadius", "borderTopLeftRadius", "borderTopRightRadius"],
      borderRight: ["borderRightColor", "borderRightStyle", "borderRightWidth"],
      borderStyle: ["borderBottomStyle", "borderLeftStyle", "borderRightStyle", "borderTopStyle"],
      borderTop: ["borderTopColor", "borderTopStyle", "borderTopWidth"],
      borderWidth: ["borderBottomWidth", "borderLeftWidth", "borderRightWidth", "borderTopWidth"],
      columnRule: ["columnRuleColor", "columnRuleStyle", "columnRuleWidth"],
      columns: ["columnCount", "columnWidth"],
      flex: ["flexBasis", "flexGrow", "flexShrink"],
      flexFlow: ["flexDirection", "flexWrap"],
      font: ["fontFamily", "fontFeatureSettings", "fontKerning", "fontLanguageOverride", "fontSize", "fontSizeAdjust", "fontStretch", "fontStyle", "fontVariant", "fontVariantAlternates", "fontVariantCaps", "fontVariantEastAsian", "fontVariantLigatures", "fontVariantNumeric", "fontVariantPosition", "fontWeight", "lineHeight"],
      fontVariant: ["fontVariantAlternates", "fontVariantCaps", "fontVariantEastAsian", "fontVariantLigatures", "fontVariantNumeric", "fontVariantPosition"],
      gap: ["columnGap", "rowGap"],
      grid: ["gridAutoColumns", "gridAutoFlow", "gridAutoRows", "gridTemplateAreas", "gridTemplateColumns", "gridTemplateRows"],
      gridArea: ["gridColumnEnd", "gridColumnStart", "gridRowEnd", "gridRowStart"],
      gridColumn: ["gridColumnEnd", "gridColumnStart"],
      gridColumnGap: ["columnGap"],
      gridGap: ["columnGap", "rowGap"],
      gridRow: ["gridRowEnd", "gridRowStart"],
      gridRowGap: ["rowGap"],
      gridTemplate: ["gridTemplateAreas", "gridTemplateColumns", "gridTemplateRows"],
      listStyle: ["listStyleImage", "listStylePosition", "listStyleType"],
      margin: ["marginBottom", "marginLeft", "marginRight", "marginTop"],
      marker: ["markerEnd", "markerMid", "markerStart"],
      mask: ["maskClip", "maskComposite", "maskImage", "maskMode", "maskOrigin", "maskPositionX", "maskPositionY", "maskRepeat", "maskSize"],
      maskPosition: ["maskPositionX", "maskPositionY"],
      outline: ["outlineColor", "outlineStyle", "outlineWidth"],
      overflow: ["overflowX", "overflowY"],
      padding: ["paddingBottom", "paddingLeft", "paddingRight", "paddingTop"],
      placeContent: ["alignContent", "justifyContent"],
      placeItems: ["alignItems", "justifyItems"],
      placeSelf: ["alignSelf", "justifySelf"],
      textDecoration: ["textDecorationColor", "textDecorationLine", "textDecorationStyle"],
      textEmphasis: ["textEmphasisColor", "textEmphasisStyle"],
      transition: ["transitionDelay", "transitionDuration", "transitionProperty", "transitionTimingFunction"],
      wordWrap: ["overflowWrap"]
    }, Ko = {
      animationIterationCount: !0,
      aspectRatio: !0,
      borderImageOutset: !0,
      borderImageSlice: !0,
      borderImageWidth: !0,
      boxFlex: !0,
      boxFlexGroup: !0,
      boxOrdinalGroup: !0,
      columnCount: !0,
      columns: !0,
      flex: !0,
      flexGrow: !0,
      flexPositive: !0,
      flexShrink: !0,
      flexNegative: !0,
      flexOrder: !0,
      gridArea: !0,
      gridRow: !0,
      gridRowEnd: !0,
      gridRowSpan: !0,
      gridRowStart: !0,
      gridColumn: !0,
      gridColumnEnd: !0,
      gridColumnSpan: !0,
      gridColumnStart: !0,
      fontWeight: !0,
      lineClamp: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      tabSize: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0,
      // SVG-related properties
      fillOpacity: !0,
      floodOpacity: !0,
      stopOpacity: !0,
      strokeDasharray: !0,
      strokeDashoffset: !0,
      strokeMiterlimit: !0,
      strokeOpacity: !0,
      strokeWidth: !0
    };
    function iv(e, t) {
      return e + t.charAt(0).toUpperCase() + t.substring(1);
    }
    var lv = ["Webkit", "ms", "Moz", "O"];
    Object.keys(Ko).forEach(function(e) {
      lv.forEach(function(t) {
        Ko[iv(t, e)] = Ko[e];
      });
    });
    function sc(e, t, a) {
      var i = t == null || typeof t == "boolean" || t === "";
      return i ? "" : !a && typeof t == "number" && t !== 0 && !(Ko.hasOwnProperty(e) && Ko[e]) ? t + "px" : (oa(t, e), ("" + t).trim());
    }
    var uv = /([A-Z])/g, ov = /^ms-/;
    function ao(e) {
      return e.replace(uv, "-$1").toLowerCase().replace(ov, "-ms-");
    }
    var sv = function() {
    };
    {
      var Gm = /^(?:webkit|moz|o)[A-Z]/, qm = /^-ms-/, cv = /-(.)/g, nd = /;\s*$/, gi = {}, ou = {}, fv = !1, Zo = !1, Xm = function(e) {
        return e.replace(cv, function(t, a) {
          return a.toUpperCase();
        });
      }, dv = function(e) {
        gi.hasOwnProperty(e) && gi[e] || (gi[e] = !0, S(
          "Unsupported style property %s. Did you mean %s?",
          e,
          // As Andi Smith suggests
          // (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
          // is converted to lowercase `ms`.
          Xm(e.replace(qm, "ms-"))
        ));
      }, rd = function(e) {
        gi.hasOwnProperty(e) && gi[e] || (gi[e] = !0, S("Unsupported vendor-prefixed style property %s. Did you mean %s?", e, e.charAt(0).toUpperCase() + e.slice(1)));
      }, ad = function(e, t) {
        ou.hasOwnProperty(t) && ou[t] || (ou[t] = !0, S(`Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`, e, t.replace(nd, "")));
      }, pv = function(e, t) {
        fv || (fv = !0, S("`NaN` is an invalid value for the `%s` css style property.", e));
      }, vv = function(e, t) {
        Zo || (Zo = !0, S("`Infinity` is an invalid value for the `%s` css style property.", e));
      };
      sv = function(e, t) {
        e.indexOf("-") > -1 ? dv(e) : Gm.test(e) ? rd(e) : nd.test(t) && ad(e, t), typeof t == "number" && (isNaN(t) ? pv(e, t) : isFinite(t) || vv(e, t));
      };
    }
    var hv = sv;
    function Km(e) {
      {
        var t = "", a = "";
        for (var i in e)
          if (e.hasOwnProperty(i)) {
            var u = e[i];
            if (u != null) {
              var s = i.indexOf("--") === 0;
              t += a + (s ? i : ao(i)) + ":", t += sc(i, u, s), a = ";";
            }
          }
        return t || null;
      }
    }
    function mv(e, t) {
      var a = e.style;
      for (var i in t)
        if (t.hasOwnProperty(i)) {
          var u = i.indexOf("--") === 0;
          u || hv(i, t[i]);
          var s = sc(i, t[i], u);
          i === "float" && (i = "cssFloat"), u ? a.setProperty(i, s) : a[i] = s;
        }
    }
    function Zm(e) {
      return e == null || typeof e == "boolean" || e === "";
    }
    function yv(e) {
      var t = {};
      for (var a in e)
        for (var i = Xo[a] || [a], u = 0; u < i.length; u++)
          t[i[u]] = a;
      return t;
    }
    function Jm(e, t) {
      {
        if (!t)
          return;
        var a = yv(e), i = yv(t), u = {};
        for (var s in a) {
          var f = a[s], p = i[s];
          if (p && f !== p) {
            var v = f + "," + p;
            if (u[v])
              continue;
            u[v] = !0, S("%s a style property during rerender (%s) when a conflicting property is set (%s) can lead to styling bugs. To avoid this, don't mix shorthand and non-shorthand properties for the same value; instead, replace the shorthand with separate values.", Zm(e[f]) ? "Removing" : "Updating", f, p);
          }
        }
      }
    }
    var ei = {
      area: !0,
      base: !0,
      br: !0,
      col: !0,
      embed: !0,
      hr: !0,
      img: !0,
      input: !0,
      keygen: !0,
      link: !0,
      meta: !0,
      param: !0,
      source: !0,
      track: !0,
      wbr: !0
      // NOTE: menuitem's close tag should be omitted, but that causes problems.
    }, Jo = Ke({
      menuitem: !0
    }, ei), gv = "__html";
    function cc(e, t) {
      if (t) {
        if (Jo[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
          throw new Error(e + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
        if (t.dangerouslySetInnerHTML != null) {
          if (t.children != null)
            throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
          if (typeof t.dangerouslySetInnerHTML != "object" || !(gv in t.dangerouslySetInnerHTML))
            throw new Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
        }
        if (!t.suppressContentEditableWarning && t.contentEditable && t.children != null && S("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional."), t.style != null && typeof t.style != "object")
          throw new Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
      }
    }
    function Rl(e, t) {
      if (e.indexOf("-") === -1)
        return typeof t.is == "string";
      switch (e) {
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
          return !1;
        default:
          return !0;
      }
    }
    var es = {
      // HTML
      accept: "accept",
      acceptcharset: "acceptCharset",
      "accept-charset": "acceptCharset",
      accesskey: "accessKey",
      action: "action",
      allowfullscreen: "allowFullScreen",
      alt: "alt",
      as: "as",
      async: "async",
      autocapitalize: "autoCapitalize",
      autocomplete: "autoComplete",
      autocorrect: "autoCorrect",
      autofocus: "autoFocus",
      autoplay: "autoPlay",
      autosave: "autoSave",
      capture: "capture",
      cellpadding: "cellPadding",
      cellspacing: "cellSpacing",
      challenge: "challenge",
      charset: "charSet",
      checked: "checked",
      children: "children",
      cite: "cite",
      class: "className",
      classid: "classID",
      classname: "className",
      cols: "cols",
      colspan: "colSpan",
      content: "content",
      contenteditable: "contentEditable",
      contextmenu: "contextMenu",
      controls: "controls",
      controlslist: "controlsList",
      coords: "coords",
      crossorigin: "crossOrigin",
      dangerouslysetinnerhtml: "dangerouslySetInnerHTML",
      data: "data",
      datetime: "dateTime",
      default: "default",
      defaultchecked: "defaultChecked",
      defaultvalue: "defaultValue",
      defer: "defer",
      dir: "dir",
      disabled: "disabled",
      disablepictureinpicture: "disablePictureInPicture",
      disableremoteplayback: "disableRemotePlayback",
      download: "download",
      draggable: "draggable",
      enctype: "encType",
      enterkeyhint: "enterKeyHint",
      for: "htmlFor",
      form: "form",
      formmethod: "formMethod",
      formaction: "formAction",
      formenctype: "formEncType",
      formnovalidate: "formNoValidate",
      formtarget: "formTarget",
      frameborder: "frameBorder",
      headers: "headers",
      height: "height",
      hidden: "hidden",
      high: "high",
      href: "href",
      hreflang: "hrefLang",
      htmlfor: "htmlFor",
      httpequiv: "httpEquiv",
      "http-equiv": "httpEquiv",
      icon: "icon",
      id: "id",
      imagesizes: "imageSizes",
      imagesrcset: "imageSrcSet",
      innerhtml: "innerHTML",
      inputmode: "inputMode",
      integrity: "integrity",
      is: "is",
      itemid: "itemID",
      itemprop: "itemProp",
      itemref: "itemRef",
      itemscope: "itemScope",
      itemtype: "itemType",
      keyparams: "keyParams",
      keytype: "keyType",
      kind: "kind",
      label: "label",
      lang: "lang",
      list: "list",
      loop: "loop",
      low: "low",
      manifest: "manifest",
      marginwidth: "marginWidth",
      marginheight: "marginHeight",
      max: "max",
      maxlength: "maxLength",
      media: "media",
      mediagroup: "mediaGroup",
      method: "method",
      min: "min",
      minlength: "minLength",
      multiple: "multiple",
      muted: "muted",
      name: "name",
      nomodule: "noModule",
      nonce: "nonce",
      novalidate: "noValidate",
      open: "open",
      optimum: "optimum",
      pattern: "pattern",
      placeholder: "placeholder",
      playsinline: "playsInline",
      poster: "poster",
      preload: "preload",
      profile: "profile",
      radiogroup: "radioGroup",
      readonly: "readOnly",
      referrerpolicy: "referrerPolicy",
      rel: "rel",
      required: "required",
      reversed: "reversed",
      role: "role",
      rows: "rows",
      rowspan: "rowSpan",
      sandbox: "sandbox",
      scope: "scope",
      scoped: "scoped",
      scrolling: "scrolling",
      seamless: "seamless",
      selected: "selected",
      shape: "shape",
      size: "size",
      sizes: "sizes",
      span: "span",
      spellcheck: "spellCheck",
      src: "src",
      srcdoc: "srcDoc",
      srclang: "srcLang",
      srcset: "srcSet",
      start: "start",
      step: "step",
      style: "style",
      summary: "summary",
      tabindex: "tabIndex",
      target: "target",
      title: "title",
      type: "type",
      usemap: "useMap",
      value: "value",
      width: "width",
      wmode: "wmode",
      wrap: "wrap",
      // SVG
      about: "about",
      accentheight: "accentHeight",
      "accent-height": "accentHeight",
      accumulate: "accumulate",
      additive: "additive",
      alignmentbaseline: "alignmentBaseline",
      "alignment-baseline": "alignmentBaseline",
      allowreorder: "allowReorder",
      alphabetic: "alphabetic",
      amplitude: "amplitude",
      arabicform: "arabicForm",
      "arabic-form": "arabicForm",
      ascent: "ascent",
      attributename: "attributeName",
      attributetype: "attributeType",
      autoreverse: "autoReverse",
      azimuth: "azimuth",
      basefrequency: "baseFrequency",
      baselineshift: "baselineShift",
      "baseline-shift": "baselineShift",
      baseprofile: "baseProfile",
      bbox: "bbox",
      begin: "begin",
      bias: "bias",
      by: "by",
      calcmode: "calcMode",
      capheight: "capHeight",
      "cap-height": "capHeight",
      clip: "clip",
      clippath: "clipPath",
      "clip-path": "clipPath",
      clippathunits: "clipPathUnits",
      cliprule: "clipRule",
      "clip-rule": "clipRule",
      color: "color",
      colorinterpolation: "colorInterpolation",
      "color-interpolation": "colorInterpolation",
      colorinterpolationfilters: "colorInterpolationFilters",
      "color-interpolation-filters": "colorInterpolationFilters",
      colorprofile: "colorProfile",
      "color-profile": "colorProfile",
      colorrendering: "colorRendering",
      "color-rendering": "colorRendering",
      contentscripttype: "contentScriptType",
      contentstyletype: "contentStyleType",
      cursor: "cursor",
      cx: "cx",
      cy: "cy",
      d: "d",
      datatype: "datatype",
      decelerate: "decelerate",
      descent: "descent",
      diffuseconstant: "diffuseConstant",
      direction: "direction",
      display: "display",
      divisor: "divisor",
      dominantbaseline: "dominantBaseline",
      "dominant-baseline": "dominantBaseline",
      dur: "dur",
      dx: "dx",
      dy: "dy",
      edgemode: "edgeMode",
      elevation: "elevation",
      enablebackground: "enableBackground",
      "enable-background": "enableBackground",
      end: "end",
      exponent: "exponent",
      externalresourcesrequired: "externalResourcesRequired",
      fill: "fill",
      fillopacity: "fillOpacity",
      "fill-opacity": "fillOpacity",
      fillrule: "fillRule",
      "fill-rule": "fillRule",
      filter: "filter",
      filterres: "filterRes",
      filterunits: "filterUnits",
      floodopacity: "floodOpacity",
      "flood-opacity": "floodOpacity",
      floodcolor: "floodColor",
      "flood-color": "floodColor",
      focusable: "focusable",
      fontfamily: "fontFamily",
      "font-family": "fontFamily",
      fontsize: "fontSize",
      "font-size": "fontSize",
      fontsizeadjust: "fontSizeAdjust",
      "font-size-adjust": "fontSizeAdjust",
      fontstretch: "fontStretch",
      "font-stretch": "fontStretch",
      fontstyle: "fontStyle",
      "font-style": "fontStyle",
      fontvariant: "fontVariant",
      "font-variant": "fontVariant",
      fontweight: "fontWeight",
      "font-weight": "fontWeight",
      format: "format",
      from: "from",
      fx: "fx",
      fy: "fy",
      g1: "g1",
      g2: "g2",
      glyphname: "glyphName",
      "glyph-name": "glyphName",
      glyphorientationhorizontal: "glyphOrientationHorizontal",
      "glyph-orientation-horizontal": "glyphOrientationHorizontal",
      glyphorientationvertical: "glyphOrientationVertical",
      "glyph-orientation-vertical": "glyphOrientationVertical",
      glyphref: "glyphRef",
      gradienttransform: "gradientTransform",
      gradientunits: "gradientUnits",
      hanging: "hanging",
      horizadvx: "horizAdvX",
      "horiz-adv-x": "horizAdvX",
      horizoriginx: "horizOriginX",
      "horiz-origin-x": "horizOriginX",
      ideographic: "ideographic",
      imagerendering: "imageRendering",
      "image-rendering": "imageRendering",
      in2: "in2",
      in: "in",
      inlist: "inlist",
      intercept: "intercept",
      k1: "k1",
      k2: "k2",
      k3: "k3",
      k4: "k4",
      k: "k",
      kernelmatrix: "kernelMatrix",
      kernelunitlength: "kernelUnitLength",
      kerning: "kerning",
      keypoints: "keyPoints",
      keysplines: "keySplines",
      keytimes: "keyTimes",
      lengthadjust: "lengthAdjust",
      letterspacing: "letterSpacing",
      "letter-spacing": "letterSpacing",
      lightingcolor: "lightingColor",
      "lighting-color": "lightingColor",
      limitingconeangle: "limitingConeAngle",
      local: "local",
      markerend: "markerEnd",
      "marker-end": "markerEnd",
      markerheight: "markerHeight",
      markermid: "markerMid",
      "marker-mid": "markerMid",
      markerstart: "markerStart",
      "marker-start": "markerStart",
      markerunits: "markerUnits",
      markerwidth: "markerWidth",
      mask: "mask",
      maskcontentunits: "maskContentUnits",
      maskunits: "maskUnits",
      mathematical: "mathematical",
      mode: "mode",
      numoctaves: "numOctaves",
      offset: "offset",
      opacity: "opacity",
      operator: "operator",
      order: "order",
      orient: "orient",
      orientation: "orientation",
      origin: "origin",
      overflow: "overflow",
      overlineposition: "overlinePosition",
      "overline-position": "overlinePosition",
      overlinethickness: "overlineThickness",
      "overline-thickness": "overlineThickness",
      paintorder: "paintOrder",
      "paint-order": "paintOrder",
      panose1: "panose1",
      "panose-1": "panose1",
      pathlength: "pathLength",
      patterncontentunits: "patternContentUnits",
      patterntransform: "patternTransform",
      patternunits: "patternUnits",
      pointerevents: "pointerEvents",
      "pointer-events": "pointerEvents",
      points: "points",
      pointsatx: "pointsAtX",
      pointsaty: "pointsAtY",
      pointsatz: "pointsAtZ",
      prefix: "prefix",
      preservealpha: "preserveAlpha",
      preserveaspectratio: "preserveAspectRatio",
      primitiveunits: "primitiveUnits",
      property: "property",
      r: "r",
      radius: "radius",
      refx: "refX",
      refy: "refY",
      renderingintent: "renderingIntent",
      "rendering-intent": "renderingIntent",
      repeatcount: "repeatCount",
      repeatdur: "repeatDur",
      requiredextensions: "requiredExtensions",
      requiredfeatures: "requiredFeatures",
      resource: "resource",
      restart: "restart",
      result: "result",
      results: "results",
      rotate: "rotate",
      rx: "rx",
      ry: "ry",
      scale: "scale",
      security: "security",
      seed: "seed",
      shaperendering: "shapeRendering",
      "shape-rendering": "shapeRendering",
      slope: "slope",
      spacing: "spacing",
      specularconstant: "specularConstant",
      specularexponent: "specularExponent",
      speed: "speed",
      spreadmethod: "spreadMethod",
      startoffset: "startOffset",
      stddeviation: "stdDeviation",
      stemh: "stemh",
      stemv: "stemv",
      stitchtiles: "stitchTiles",
      stopcolor: "stopColor",
      "stop-color": "stopColor",
      stopopacity: "stopOpacity",
      "stop-opacity": "stopOpacity",
      strikethroughposition: "strikethroughPosition",
      "strikethrough-position": "strikethroughPosition",
      strikethroughthickness: "strikethroughThickness",
      "strikethrough-thickness": "strikethroughThickness",
      string: "string",
      stroke: "stroke",
      strokedasharray: "strokeDasharray",
      "stroke-dasharray": "strokeDasharray",
      strokedashoffset: "strokeDashoffset",
      "stroke-dashoffset": "strokeDashoffset",
      strokelinecap: "strokeLinecap",
      "stroke-linecap": "strokeLinecap",
      strokelinejoin: "strokeLinejoin",
      "stroke-linejoin": "strokeLinejoin",
      strokemiterlimit: "strokeMiterlimit",
      "stroke-miterlimit": "strokeMiterlimit",
      strokewidth: "strokeWidth",
      "stroke-width": "strokeWidth",
      strokeopacity: "strokeOpacity",
      "stroke-opacity": "strokeOpacity",
      suppresscontenteditablewarning: "suppressContentEditableWarning",
      suppresshydrationwarning: "suppressHydrationWarning",
      surfacescale: "surfaceScale",
      systemlanguage: "systemLanguage",
      tablevalues: "tableValues",
      targetx: "targetX",
      targety: "targetY",
      textanchor: "textAnchor",
      "text-anchor": "textAnchor",
      textdecoration: "textDecoration",
      "text-decoration": "textDecoration",
      textlength: "textLength",
      textrendering: "textRendering",
      "text-rendering": "textRendering",
      to: "to",
      transform: "transform",
      typeof: "typeof",
      u1: "u1",
      u2: "u2",
      underlineposition: "underlinePosition",
      "underline-position": "underlinePosition",
      underlinethickness: "underlineThickness",
      "underline-thickness": "underlineThickness",
      unicode: "unicode",
      unicodebidi: "unicodeBidi",
      "unicode-bidi": "unicodeBidi",
      unicoderange: "unicodeRange",
      "unicode-range": "unicodeRange",
      unitsperem: "unitsPerEm",
      "units-per-em": "unitsPerEm",
      unselectable: "unselectable",
      valphabetic: "vAlphabetic",
      "v-alphabetic": "vAlphabetic",
      values: "values",
      vectoreffect: "vectorEffect",
      "vector-effect": "vectorEffect",
      version: "version",
      vertadvy: "vertAdvY",
      "vert-adv-y": "vertAdvY",
      vertoriginx: "vertOriginX",
      "vert-origin-x": "vertOriginX",
      vertoriginy: "vertOriginY",
      "vert-origin-y": "vertOriginY",
      vhanging: "vHanging",
      "v-hanging": "vHanging",
      videographic: "vIdeographic",
      "v-ideographic": "vIdeographic",
      viewbox: "viewBox",
      viewtarget: "viewTarget",
      visibility: "visibility",
      vmathematical: "vMathematical",
      "v-mathematical": "vMathematical",
      vocab: "vocab",
      widths: "widths",
      wordspacing: "wordSpacing",
      "word-spacing": "wordSpacing",
      writingmode: "writingMode",
      "writing-mode": "writingMode",
      x1: "x1",
      x2: "x2",
      x: "x",
      xchannelselector: "xChannelSelector",
      xheight: "xHeight",
      "x-height": "xHeight",
      xlinkactuate: "xlinkActuate",
      "xlink:actuate": "xlinkActuate",
      xlinkarcrole: "xlinkArcrole",
      "xlink:arcrole": "xlinkArcrole",
      xlinkhref: "xlinkHref",
      "xlink:href": "xlinkHref",
      xlinkrole: "xlinkRole",
      "xlink:role": "xlinkRole",
      xlinkshow: "xlinkShow",
      "xlink:show": "xlinkShow",
      xlinktitle: "xlinkTitle",
      "xlink:title": "xlinkTitle",
      xlinktype: "xlinkType",
      "xlink:type": "xlinkType",
      xmlbase: "xmlBase",
      "xml:base": "xmlBase",
      xmllang: "xmlLang",
      "xml:lang": "xmlLang",
      xmlns: "xmlns",
      "xml:space": "xmlSpace",
      xmlnsxlink: "xmlnsXlink",
      "xmlns:xlink": "xmlnsXlink",
      xmlspace: "xmlSpace",
      y1: "y1",
      y2: "y2",
      y: "y",
      ychannelselector: "yChannelSelector",
      z: "z",
      zoomandpan: "zoomAndPan"
    }, fc = {
      "aria-current": 0,
      // state
      "aria-description": 0,
      "aria-details": 0,
      "aria-disabled": 0,
      // state
      "aria-hidden": 0,
      // state
      "aria-invalid": 0,
      // state
      "aria-keyshortcuts": 0,
      "aria-label": 0,
      "aria-roledescription": 0,
      // Widget Attributes
      "aria-autocomplete": 0,
      "aria-checked": 0,
      "aria-expanded": 0,
      "aria-haspopup": 0,
      "aria-level": 0,
      "aria-modal": 0,
      "aria-multiline": 0,
      "aria-multiselectable": 0,
      "aria-orientation": 0,
      "aria-placeholder": 0,
      "aria-pressed": 0,
      "aria-readonly": 0,
      "aria-required": 0,
      "aria-selected": 0,
      "aria-sort": 0,
      "aria-valuemax": 0,
      "aria-valuemin": 0,
      "aria-valuenow": 0,
      "aria-valuetext": 0,
      // Live Region Attributes
      "aria-atomic": 0,
      "aria-busy": 0,
      "aria-live": 0,
      "aria-relevant": 0,
      // Drag-and-Drop Attributes
      "aria-dropeffect": 0,
      "aria-grabbed": 0,
      // Relationship Attributes
      "aria-activedescendant": 0,
      "aria-colcount": 0,
      "aria-colindex": 0,
      "aria-colspan": 0,
      "aria-controls": 0,
      "aria-describedby": 0,
      "aria-errormessage": 0,
      "aria-flowto": 0,
      "aria-labelledby": 0,
      "aria-owns": 0,
      "aria-posinset": 0,
      "aria-rowcount": 0,
      "aria-rowindex": 0,
      "aria-rowspan": 0,
      "aria-setsize": 0
    }, io = {}, ey = new RegExp("^(aria)-[" + Z + "]*$"), lo = new RegExp("^(aria)[A-Z][" + Z + "]*$");
    function id(e, t) {
      {
        if (wr.call(io, t) && io[t])
          return !0;
        if (lo.test(t)) {
          var a = "aria-" + t.slice(4).toLowerCase(), i = fc.hasOwnProperty(a) ? a : null;
          if (i == null)
            return S("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", t), io[t] = !0, !0;
          if (t !== i)
            return S("Invalid ARIA attribute `%s`. Did you mean `%s`?", t, i), io[t] = !0, !0;
        }
        if (ey.test(t)) {
          var u = t.toLowerCase(), s = fc.hasOwnProperty(u) ? u : null;
          if (s == null)
            return io[t] = !0, !1;
          if (t !== s)
            return S("Unknown ARIA attribute `%s`. Did you mean `%s`?", t, s), io[t] = !0, !0;
        }
      }
      return !0;
    }
    function ts(e, t) {
      {
        var a = [];
        for (var i in t) {
          var u = id(e, i);
          u || a.push(i);
        }
        var s = a.map(function(f) {
          return "`" + f + "`";
        }).join(", ");
        a.length === 1 ? S("Invalid aria prop %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", s, e) : a.length > 1 && S("Invalid aria props %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", s, e);
      }
    }
    function ld(e, t) {
      Rl(e, t) || ts(e, t);
    }
    var ud = !1;
    function dc(e, t) {
      {
        if (e !== "input" && e !== "textarea" && e !== "select")
          return;
        t != null && t.value === null && !ud && (ud = !0, e === "select" && t.multiple ? S("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", e) : S("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", e));
      }
    }
    var su = function() {
    };
    {
      var ir = {}, od = /^on./, pc = /^on[^A-Z]/, Sv = new RegExp("^(aria)-[" + Z + "]*$"), Ev = new RegExp("^(aria)[A-Z][" + Z + "]*$");
      su = function(e, t, a, i) {
        if (wr.call(ir, t) && ir[t])
          return !0;
        var u = t.toLowerCase();
        if (u === "onfocusin" || u === "onfocusout")
          return S("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."), ir[t] = !0, !0;
        if (i != null) {
          var s = i.registrationNameDependencies, f = i.possibleRegistrationNames;
          if (s.hasOwnProperty(t))
            return !0;
          var p = f.hasOwnProperty(u) ? f[u] : null;
          if (p != null)
            return S("Invalid event handler property `%s`. Did you mean `%s`?", t, p), ir[t] = !0, !0;
          if (od.test(t))
            return S("Unknown event handler property `%s`. It will be ignored.", t), ir[t] = !0, !0;
        } else if (od.test(t))
          return pc.test(t) && S("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", t), ir[t] = !0, !0;
        if (Sv.test(t) || Ev.test(t))
          return !0;
        if (u === "innerhtml")
          return S("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."), ir[t] = !0, !0;
        if (u === "aria")
          return S("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."), ir[t] = !0, !0;
        if (u === "is" && a !== null && a !== void 0 && typeof a != "string")
          return S("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof a), ir[t] = !0, !0;
        if (typeof a == "number" && isNaN(a))
          return S("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", t), ir[t] = !0, !0;
        var v = Jt(t), y = v !== null && v.type === Bn;
        if (es.hasOwnProperty(u)) {
          var g = es[u];
          if (g !== t)
            return S("Invalid DOM property `%s`. Did you mean `%s`?", t, g), ir[t] = !0, !0;
        } else if (!y && t !== u)
          return S("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", t, u), ir[t] = !0, !0;
        return typeof a == "boolean" && ln(t, a, v, !1) ? (a ? S('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.', a, t, t, a, t) : S('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.', a, t, t, a, t, t, t), ir[t] = !0, !0) : y ? !0 : ln(t, a, v, !1) ? (ir[t] = !0, !1) : ((a === "false" || a === "true") && v !== null && v.type === On && (S("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", a, t, a === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".', t, a), ir[t] = !0), !0);
      };
    }
    var Cv = function(e, t, a) {
      {
        var i = [];
        for (var u in t) {
          var s = su(e, u, t[u], a);
          s || i.push(u);
        }
        var f = i.map(function(p) {
          return "`" + p + "`";
        }).join(", ");
        i.length === 1 ? S("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", f, e) : i.length > 1 && S("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", f, e);
      }
    };
    function Rv(e, t, a) {
      Rl(e, t) || Cv(e, t, a);
    }
    var sd = 1, vc = 2, _a = 4, cd = sd | vc | _a, cu = null;
    function ty(e) {
      cu !== null && S("Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue."), cu = e;
    }
    function ny() {
      cu === null && S("Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue."), cu = null;
    }
    function ns(e) {
      return e === cu;
    }
    function fd(e) {
      var t = e.target || e.srcElement || window;
      return t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === $i ? t.parentNode : t;
    }
    var hc = null, fu = null, jt = null;
    function mc(e) {
      var t = Do(e);
      if (t) {
        if (typeof hc != "function")
          throw new Error("setRestoreImplementation() needs to be called to handle a target for controlled events. This error is likely caused by a bug in React. Please file an issue.");
        var a = t.stateNode;
        if (a) {
          var i = Lh(a);
          hc(t.stateNode, t.type, i);
        }
      }
    }
    function yc(e) {
      hc = e;
    }
    function uo(e) {
      fu ? jt ? jt.push(e) : jt = [e] : fu = e;
    }
    function Tv() {
      return fu !== null || jt !== null;
    }
    function gc() {
      if (fu) {
        var e = fu, t = jt;
        if (fu = null, jt = null, mc(e), t)
          for (var a = 0; a < t.length; a++)
            mc(t[a]);
      }
    }
    var oo = function(e, t) {
      return e(t);
    }, rs = function() {
    }, Tl = !1;
    function wv() {
      var e = Tv();
      e && (rs(), gc());
    }
    function xv(e, t, a) {
      if (Tl)
        return e(t, a);
      Tl = !0;
      try {
        return oo(e, t, a);
      } finally {
        Tl = !1, wv();
      }
    }
    function ry(e, t, a) {
      oo = e, rs = a;
    }
    function bv(e) {
      return e === "button" || e === "input" || e === "select" || e === "textarea";
    }
    function Sc(e, t, a) {
      switch (e) {
        case "onClick":
        case "onClickCapture":
        case "onDoubleClick":
        case "onDoubleClickCapture":
        case "onMouseDown":
        case "onMouseDownCapture":
        case "onMouseMove":
        case "onMouseMoveCapture":
        case "onMouseUp":
        case "onMouseUpCapture":
        case "onMouseEnter":
          return !!(a.disabled && bv(t));
        default:
          return !1;
      }
    }
    function wl(e, t) {
      var a = e.stateNode;
      if (a === null)
        return null;
      var i = Lh(a);
      if (i === null)
        return null;
      var u = i[t];
      if (Sc(t, e.type, i))
        return null;
      if (u && typeof u != "function")
        throw new Error("Expected `" + t + "` listener to be a function, instead got a value of `" + typeof u + "` type.");
      return u;
    }
    var as = !1;
    if (kn)
      try {
        var du = {};
        Object.defineProperty(du, "passive", {
          get: function() {
            as = !0;
          }
        }), window.addEventListener("test", du, du), window.removeEventListener("test", du, du);
      } catch {
        as = !1;
      }
    function Ec(e, t, a, i, u, s, f, p, v) {
      var y = Array.prototype.slice.call(arguments, 3);
      try {
        t.apply(a, y);
      } catch (g) {
        this.onError(g);
      }
    }
    var Cc = Ec;
    if (typeof window < "u" && typeof window.dispatchEvent == "function" && typeof document < "u" && typeof document.createEvent == "function") {
      var dd = document.createElement("react");
      Cc = function(t, a, i, u, s, f, p, v, y) {
        if (typeof document > "u" || document === null)
          throw new Error("The `document` global was defined when React was initialized, but is not defined anymore. This can happen in a test environment if a component schedules an update from an asynchronous callback, but the test has already finished running. To solve this, you can either unmount the component at the end of your test (and ensure that any asynchronous operations get canceled in `componentWillUnmount`), or you can change the test itself to be asynchronous.");
        var g = document.createEvent("Event"), b = !1, w = !0, M = window.event, A = Object.getOwnPropertyDescriptor(window, "event");
        function j() {
          dd.removeEventListener(H, Le, !1), typeof window.event < "u" && window.hasOwnProperty("event") && (window.event = M);
        }
        var le = Array.prototype.slice.call(arguments, 3);
        function Le() {
          b = !0, j(), a.apply(i, le), w = !1;
        }
        var we, Et = !1, vt = !1;
        function k(O) {
          if (we = O.error, Et = !0, we === null && O.colno === 0 && O.lineno === 0 && (vt = !0), O.defaultPrevented && we != null && typeof we == "object")
            try {
              we._suppressLogging = !0;
            } catch {
            }
        }
        var H = "react-" + (t || "invokeguardedcallback");
        if (window.addEventListener("error", k), dd.addEventListener(H, Le, !1), g.initEvent(H, !1, !1), dd.dispatchEvent(g), A && Object.defineProperty(window, "event", A), b && w && (Et ? vt && (we = new Error("A cross-origin error was thrown. React doesn't have access to the actual error object in development. See https://reactjs.org/link/crossorigin-error for more information.")) : we = new Error(`An error was thrown inside one of your components, but React doesn't know what it was. This is likely due to browser flakiness. React does its best to preserve the "Pause on exceptions" behavior of the DevTools, which requires some DEV-mode only tricks. It's possible that these don't work in your browser. Try triggering the error in production mode, or switching to a modern browser. If you suspect that this is actually an issue with React, please file an issue.`), this.onError(we)), window.removeEventListener("error", k), !b)
          return j(), Ec.apply(this, arguments);
      };
    }
    var _v = Cc, so = !1, Rc = null, co = !1, Si = null, Dv = {
      onError: function(e) {
        so = !0, Rc = e;
      }
    };
    function xl(e, t, a, i, u, s, f, p, v) {
      so = !1, Rc = null, _v.apply(Dv, arguments);
    }
    function Ei(e, t, a, i, u, s, f, p, v) {
      if (xl.apply(this, arguments), so) {
        var y = ls();
        co || (co = !0, Si = y);
      }
    }
    function is() {
      if (co) {
        var e = Si;
        throw co = !1, Si = null, e;
      }
    }
    function Ii() {
      return so;
    }
    function ls() {
      if (so) {
        var e = Rc;
        return so = !1, Rc = null, e;
      } else
        throw new Error("clearCaughtError was called but no error was captured. This error is likely caused by a bug in React. Please file an issue.");
    }
    function fo(e) {
      return e._reactInternals;
    }
    function ay(e) {
      return e._reactInternals !== void 0;
    }
    function pu(e, t) {
      e._reactInternals = t;
    }
    var _e = (
      /*                      */
      0
    ), ti = (
      /*                */
      1
    ), hn = (
      /*                    */
      2
    ), yt = (
      /*                       */
      4
    ), Da = (
      /*                */
      16
    ), ka = (
      /*                 */
      32
    ), nn = (
      /*                     */
      64
    ), xe = (
      /*                   */
      128
    ), Er = (
      /*            */
      256
    ), Sn = (
      /*                          */
      512
    ), Yn = (
      /*                     */
      1024
    ), Qr = (
      /*                      */
      2048
    ), Wr = (
      /*                    */
      4096
    ), Mn = (
      /*                   */
      8192
    ), po = (
      /*             */
      16384
    ), kv = (
      /*               */
      32767
    ), us = (
      /*                   */
      32768
    ), Xn = (
      /*                */
      65536
    ), Tc = (
      /* */
      131072
    ), Ci = (
      /*                       */
      1048576
    ), vo = (
      /*                    */
      2097152
    ), Qi = (
      /*                 */
      4194304
    ), wc = (
      /*                */
      8388608
    ), bl = (
      /*               */
      16777216
    ), Ri = (
      /*              */
      33554432
    ), _l = (
      // TODO: Remove Update flag from before mutation phase by re-landing Visibility
      // flag logic (see #20043)
      yt | Yn | 0
    ), Dl = hn | yt | Da | ka | Sn | Wr | Mn, kl = yt | nn | Sn | Mn, Wi = Qr | Da, Nn = Qi | wc | vo, Oa = z.ReactCurrentOwner;
    function da(e) {
      var t = e, a = e;
      if (e.alternate)
        for (; t.return; )
          t = t.return;
      else {
        var i = t;
        do
          t = i, (t.flags & (hn | Wr)) !== _e && (a = t.return), i = t.return;
        while (i);
      }
      return t.tag === ee ? a : null;
    }
    function Ti(e) {
      if (e.tag === be) {
        var t = e.memoizedState;
        if (t === null) {
          var a = e.alternate;
          a !== null && (t = a.memoizedState);
        }
        if (t !== null)
          return t.dehydrated;
      }
      return null;
    }
    function wi(e) {
      return e.tag === ee ? e.stateNode.containerInfo : null;
    }
    function vu(e) {
      return da(e) === e;
    }
    function Ov(e) {
      {
        var t = Oa.current;
        if (t !== null && t.tag === ve) {
          var a = t, i = a.stateNode;
          i._warnedAboutRefsInRender || S("%s is accessing isMounted inside its render() function. render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", Ve(a) || "A component"), i._warnedAboutRefsInRender = !0;
        }
      }
      var u = fo(e);
      return u ? da(u) === u : !1;
    }
    function xc(e) {
      if (da(e) !== e)
        throw new Error("Unable to find node on an unmounted component.");
    }
    function bc(e) {
      var t = e.alternate;
      if (!t) {
        var a = da(e);
        if (a === null)
          throw new Error("Unable to find node on an unmounted component.");
        return a !== e ? null : e;
      }
      for (var i = e, u = t; ; ) {
        var s = i.return;
        if (s === null)
          break;
        var f = s.alternate;
        if (f === null) {
          var p = s.return;
          if (p !== null) {
            i = u = p;
            continue;
          }
          break;
        }
        if (s.child === f.child) {
          for (var v = s.child; v; ) {
            if (v === i)
              return xc(s), e;
            if (v === u)
              return xc(s), t;
            v = v.sibling;
          }
          throw new Error("Unable to find node on an unmounted component.");
        }
        if (i.return !== u.return)
          i = s, u = f;
        else {
          for (var y = !1, g = s.child; g; ) {
            if (g === i) {
              y = !0, i = s, u = f;
              break;
            }
            if (g === u) {
              y = !0, u = s, i = f;
              break;
            }
            g = g.sibling;
          }
          if (!y) {
            for (g = f.child; g; ) {
              if (g === i) {
                y = !0, i = f, u = s;
                break;
              }
              if (g === u) {
                y = !0, u = f, i = s;
                break;
              }
              g = g.sibling;
            }
            if (!y)
              throw new Error("Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue.");
          }
        }
        if (i.alternate !== u)
          throw new Error("Return fibers should always be each others' alternates. This error is likely caused by a bug in React. Please file an issue.");
      }
      if (i.tag !== ee)
        throw new Error("Unable to find node on an unmounted component.");
      return i.stateNode.current === i ? e : t;
    }
    function Gr(e) {
      var t = bc(e);
      return t !== null ? qr(t) : null;
    }
    function qr(e) {
      if (e.tag === ue || e.tag === Ye)
        return e;
      for (var t = e.child; t !== null; ) {
        var a = qr(t);
        if (a !== null)
          return a;
        t = t.sibling;
      }
      return null;
    }
    function fn(e) {
      var t = bc(e);
      return t !== null ? La(t) : null;
    }
    function La(e) {
      if (e.tag === ue || e.tag === Ye)
        return e;
      for (var t = e.child; t !== null; ) {
        if (t.tag !== Ce) {
          var a = La(t);
          if (a !== null)
            return a;
        }
        t = t.sibling;
      }
      return null;
    }
    var pd = W.unstable_scheduleCallback, Lv = W.unstable_cancelCallback, vd = W.unstable_shouldYield, hd = W.unstable_requestPaint, In = W.unstable_now, _c = W.unstable_getCurrentPriorityLevel, os = W.unstable_ImmediatePriority, Ol = W.unstable_UserBlockingPriority, Gi = W.unstable_NormalPriority, iy = W.unstable_LowPriority, hu = W.unstable_IdlePriority, Dc = W.unstable_yieldValue, Mv = W.unstable_setDisableYieldValue, mu = null, Tn = null, ie = null, pa = !1, Xr = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u";
    function ho(e) {
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u")
        return !1;
      var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (t.isDisabled)
        return !0;
      if (!t.supportsFiber)
        return S("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://reactjs.org/link/react-devtools"), !0;
      try {
        je && (e = Ke({}, e, {
          getLaneLabelMap: yu,
          injectProfilingHooks: Ma
        })), mu = t.inject(e), Tn = t;
      } catch (a) {
        S("React instrumentation encountered an error: %s.", a);
      }
      return !!t.checkDCE;
    }
    function md(e, t) {
      if (Tn && typeof Tn.onScheduleFiberRoot == "function")
        try {
          Tn.onScheduleFiberRoot(mu, e, t);
        } catch (a) {
          pa || (pa = !0, S("React instrumentation encountered an error: %s", a));
        }
    }
    function yd(e, t) {
      if (Tn && typeof Tn.onCommitFiberRoot == "function")
        try {
          var a = (e.current.flags & xe) === xe;
          if (Ue) {
            var i;
            switch (t) {
              case Or:
                i = os;
                break;
              case bi:
                i = Ol;
                break;
              case Na:
                i = Gi;
                break;
              case za:
                i = hu;
                break;
              default:
                i = Gi;
                break;
            }
            Tn.onCommitFiberRoot(mu, e, i, a);
          }
        } catch (u) {
          pa || (pa = !0, S("React instrumentation encountered an error: %s", u));
        }
    }
    function gd(e) {
      if (Tn && typeof Tn.onPostCommitFiberRoot == "function")
        try {
          Tn.onPostCommitFiberRoot(mu, e);
        } catch (t) {
          pa || (pa = !0, S("React instrumentation encountered an error: %s", t));
        }
    }
    function Sd(e) {
      if (Tn && typeof Tn.onCommitFiberUnmount == "function")
        try {
          Tn.onCommitFiberUnmount(mu, e);
        } catch (t) {
          pa || (pa = !0, S("React instrumentation encountered an error: %s", t));
        }
    }
    function mn(e) {
      if (typeof Dc == "function" && (Mv(e), Ct(e)), Tn && typeof Tn.setStrictMode == "function")
        try {
          Tn.setStrictMode(mu, e);
        } catch (t) {
          pa || (pa = !0, S("React instrumentation encountered an error: %s", t));
        }
    }
    function Ma(e) {
      ie = e;
    }
    function yu() {
      {
        for (var e = /* @__PURE__ */ new Map(), t = 1, a = 0; a < Eu; a++) {
          var i = Av(t);
          e.set(t, i), t *= 2;
        }
        return e;
      }
    }
    function Ed(e) {
      ie !== null && typeof ie.markCommitStarted == "function" && ie.markCommitStarted(e);
    }
    function Cd() {
      ie !== null && typeof ie.markCommitStopped == "function" && ie.markCommitStopped();
    }
    function va(e) {
      ie !== null && typeof ie.markComponentRenderStarted == "function" && ie.markComponentRenderStarted(e);
    }
    function ha() {
      ie !== null && typeof ie.markComponentRenderStopped == "function" && ie.markComponentRenderStopped();
    }
    function Rd(e) {
      ie !== null && typeof ie.markComponentPassiveEffectMountStarted == "function" && ie.markComponentPassiveEffectMountStarted(e);
    }
    function Nv() {
      ie !== null && typeof ie.markComponentPassiveEffectMountStopped == "function" && ie.markComponentPassiveEffectMountStopped();
    }
    function qi(e) {
      ie !== null && typeof ie.markComponentPassiveEffectUnmountStarted == "function" && ie.markComponentPassiveEffectUnmountStarted(e);
    }
    function Ll() {
      ie !== null && typeof ie.markComponentPassiveEffectUnmountStopped == "function" && ie.markComponentPassiveEffectUnmountStopped();
    }
    function kc(e) {
      ie !== null && typeof ie.markComponentLayoutEffectMountStarted == "function" && ie.markComponentLayoutEffectMountStarted(e);
    }
    function zv() {
      ie !== null && typeof ie.markComponentLayoutEffectMountStopped == "function" && ie.markComponentLayoutEffectMountStopped();
    }
    function ss(e) {
      ie !== null && typeof ie.markComponentLayoutEffectUnmountStarted == "function" && ie.markComponentLayoutEffectUnmountStarted(e);
    }
    function Td() {
      ie !== null && typeof ie.markComponentLayoutEffectUnmountStopped == "function" && ie.markComponentLayoutEffectUnmountStopped();
    }
    function cs(e, t, a) {
      ie !== null && typeof ie.markComponentErrored == "function" && ie.markComponentErrored(e, t, a);
    }
    function xi(e, t, a) {
      ie !== null && typeof ie.markComponentSuspended == "function" && ie.markComponentSuspended(e, t, a);
    }
    function fs(e) {
      ie !== null && typeof ie.markLayoutEffectsStarted == "function" && ie.markLayoutEffectsStarted(e);
    }
    function ds() {
      ie !== null && typeof ie.markLayoutEffectsStopped == "function" && ie.markLayoutEffectsStopped();
    }
    function gu(e) {
      ie !== null && typeof ie.markPassiveEffectsStarted == "function" && ie.markPassiveEffectsStarted(e);
    }
    function wd() {
      ie !== null && typeof ie.markPassiveEffectsStopped == "function" && ie.markPassiveEffectsStopped();
    }
    function Su(e) {
      ie !== null && typeof ie.markRenderStarted == "function" && ie.markRenderStarted(e);
    }
    function Uv() {
      ie !== null && typeof ie.markRenderYielded == "function" && ie.markRenderYielded();
    }
    function Oc() {
      ie !== null && typeof ie.markRenderStopped == "function" && ie.markRenderStopped();
    }
    function yn(e) {
      ie !== null && typeof ie.markRenderScheduled == "function" && ie.markRenderScheduled(e);
    }
    function Lc(e, t) {
      ie !== null && typeof ie.markForceUpdateScheduled == "function" && ie.markForceUpdateScheduled(e, t);
    }
    function ps(e, t) {
      ie !== null && typeof ie.markStateUpdateScheduled == "function" && ie.markStateUpdateScheduled(e, t);
    }
    var De = (
      /*                         */
      0
    ), it = (
      /*                 */
      1
    ), Ot = (
      /*                    */
      2
    ), Wt = (
      /*               */
      8
    ), Lt = (
      /*              */
      16
    ), zn = Math.clz32 ? Math.clz32 : vs, Kn = Math.log, Mc = Math.LN2;
    function vs(e) {
      var t = e >>> 0;
      return t === 0 ? 32 : 31 - (Kn(t) / Mc | 0) | 0;
    }
    var Eu = 31, $ = (
      /*                        */
      0
    ), _t = (
      /*                          */
      0
    ), Ae = (
      /*                        */
      1
    ), Ml = (
      /*    */
      2
    ), ni = (
      /*             */
      4
    ), Cr = (
      /*            */
      8
    ), wn = (
      /*                     */
      16
    ), Xi = (
      /*                */
      32
    ), Nl = (
      /*                       */
      4194240
    ), Cu = (
      /*                        */
      64
    ), Nc = (
      /*                        */
      128
    ), zc = (
      /*                        */
      256
    ), Uc = (
      /*                        */
      512
    ), Ac = (
      /*                        */
      1024
    ), Fc = (
      /*                        */
      2048
    ), jc = (
      /*                        */
      4096
    ), Hc = (
      /*                        */
      8192
    ), Pc = (
      /*                        */
      16384
    ), Ru = (
      /*                       */
      32768
    ), Vc = (
      /*                       */
      65536
    ), mo = (
      /*                       */
      131072
    ), yo = (
      /*                       */
      262144
    ), Bc = (
      /*                       */
      524288
    ), hs = (
      /*                       */
      1048576
    ), $c = (
      /*                       */
      2097152
    ), ms = (
      /*                            */
      130023424
    ), Tu = (
      /*                             */
      4194304
    ), Yc = (
      /*                             */
      8388608
    ), ys = (
      /*                             */
      16777216
    ), Ic = (
      /*                             */
      33554432
    ), Qc = (
      /*                             */
      67108864
    ), xd = Tu, gs = (
      /*          */
      134217728
    ), bd = (
      /*                          */
      268435455
    ), Ss = (
      /*               */
      268435456
    ), wu = (
      /*                        */
      536870912
    ), Kr = (
      /*                   */
      1073741824
    );
    function Av(e) {
      {
        if (e & Ae)
          return "Sync";
        if (e & Ml)
          return "InputContinuousHydration";
        if (e & ni)
          return "InputContinuous";
        if (e & Cr)
          return "DefaultHydration";
        if (e & wn)
          return "Default";
        if (e & Xi)
          return "TransitionHydration";
        if (e & Nl)
          return "Transition";
        if (e & ms)
          return "Retry";
        if (e & gs)
          return "SelectiveHydration";
        if (e & Ss)
          return "IdleHydration";
        if (e & wu)
          return "Idle";
        if (e & Kr)
          return "Offscreen";
      }
    }
    var Xt = -1, xu = Cu, Wc = Tu;
    function Es(e) {
      switch (zl(e)) {
        case Ae:
          return Ae;
        case Ml:
          return Ml;
        case ni:
          return ni;
        case Cr:
          return Cr;
        case wn:
          return wn;
        case Xi:
          return Xi;
        case Cu:
        case Nc:
        case zc:
        case Uc:
        case Ac:
        case Fc:
        case jc:
        case Hc:
        case Pc:
        case Ru:
        case Vc:
        case mo:
        case yo:
        case Bc:
        case hs:
        case $c:
          return e & Nl;
        case Tu:
        case Yc:
        case ys:
        case Ic:
        case Qc:
          return e & ms;
        case gs:
          return gs;
        case Ss:
          return Ss;
        case wu:
          return wu;
        case Kr:
          return Kr;
        default:
          return S("Should have found matching lanes. This is a bug in React."), e;
      }
    }
    function Gc(e, t) {
      var a = e.pendingLanes;
      if (a === $)
        return $;
      var i = $, u = e.suspendedLanes, s = e.pingedLanes, f = a & bd;
      if (f !== $) {
        var p = f & ~u;
        if (p !== $)
          i = Es(p);
        else {
          var v = f & s;
          v !== $ && (i = Es(v));
        }
      } else {
        var y = a & ~u;
        y !== $ ? i = Es(y) : s !== $ && (i = Es(s));
      }
      if (i === $)
        return $;
      if (t !== $ && t !== i && // If we already suspended with a delay, then interrupting is fine. Don't
      // bother waiting until the root is complete.
      (t & u) === $) {
        var g = zl(i), b = zl(t);
        if (
          // Tests whether the next lane is equal or lower priority than the wip
          // one. This works because the bits decrease in priority as you go left.
          g >= b || // Default priority updates should not interrupt transition updates. The
          // only difference between default updates and transition updates is that
          // default updates do not support refresh transitions.
          g === wn && (b & Nl) !== $
        )
          return t;
      }
      (i & ni) !== $ && (i |= a & wn);
      var w = e.entangledLanes;
      if (w !== $)
        for (var M = e.entanglements, A = i & w; A > 0; ) {
          var j = Un(A), le = 1 << j;
          i |= M[j], A &= ~le;
        }
      return i;
    }
    function ri(e, t) {
      for (var a = e.eventTimes, i = Xt; t > 0; ) {
        var u = Un(t), s = 1 << u, f = a[u];
        f > i && (i = f), t &= ~s;
      }
      return i;
    }
    function _d(e, t) {
      switch (e) {
        case Ae:
        case Ml:
        case ni:
          return t + 250;
        case Cr:
        case wn:
        case Xi:
        case Cu:
        case Nc:
        case zc:
        case Uc:
        case Ac:
        case Fc:
        case jc:
        case Hc:
        case Pc:
        case Ru:
        case Vc:
        case mo:
        case yo:
        case Bc:
        case hs:
        case $c:
          return t + 5e3;
        case Tu:
        case Yc:
        case ys:
        case Ic:
        case Qc:
          return Xt;
        case gs:
        case Ss:
        case wu:
        case Kr:
          return Xt;
        default:
          return S("Should have found matching lanes. This is a bug in React."), Xt;
      }
    }
    function qc(e, t) {
      for (var a = e.pendingLanes, i = e.suspendedLanes, u = e.pingedLanes, s = e.expirationTimes, f = a; f > 0; ) {
        var p = Un(f), v = 1 << p, y = s[p];
        y === Xt ? ((v & i) === $ || (v & u) !== $) && (s[p] = _d(v, t)) : y <= t && (e.expiredLanes |= v), f &= ~v;
      }
    }
    function Fv(e) {
      return Es(e.pendingLanes);
    }
    function Xc(e) {
      var t = e.pendingLanes & ~Kr;
      return t !== $ ? t : t & Kr ? Kr : $;
    }
    function jv(e) {
      return (e & Ae) !== $;
    }
    function Cs(e) {
      return (e & bd) !== $;
    }
    function bu(e) {
      return (e & ms) === e;
    }
    function Dd(e) {
      var t = Ae | ni | wn;
      return (e & t) === $;
    }
    function kd(e) {
      return (e & Nl) === e;
    }
    function Kc(e, t) {
      var a = Ml | ni | Cr | wn;
      return (t & a) !== $;
    }
    function Hv(e, t) {
      return (t & e.expiredLanes) !== $;
    }
    function Od(e) {
      return (e & Nl) !== $;
    }
    function Ld() {
      var e = xu;
      return xu <<= 1, (xu & Nl) === $ && (xu = Cu), e;
    }
    function Pv() {
      var e = Wc;
      return Wc <<= 1, (Wc & ms) === $ && (Wc = Tu), e;
    }
    function zl(e) {
      return e & -e;
    }
    function Rs(e) {
      return zl(e);
    }
    function Un(e) {
      return 31 - zn(e);
    }
    function lr(e) {
      return Un(e);
    }
    function Zr(e, t) {
      return (e & t) !== $;
    }
    function _u(e, t) {
      return (e & t) === t;
    }
    function qe(e, t) {
      return e | t;
    }
    function Ts(e, t) {
      return e & ~t;
    }
    function Md(e, t) {
      return e & t;
    }
    function Vv(e) {
      return e;
    }
    function Bv(e, t) {
      return e !== _t && e < t ? e : t;
    }
    function ws(e) {
      for (var t = [], a = 0; a < Eu; a++)
        t.push(e);
      return t;
    }
    function go(e, t, a) {
      e.pendingLanes |= t, t !== wu && (e.suspendedLanes = $, e.pingedLanes = $);
      var i = e.eventTimes, u = lr(t);
      i[u] = a;
    }
    function $v(e, t) {
      e.suspendedLanes |= t, e.pingedLanes &= ~t;
      for (var a = e.expirationTimes, i = t; i > 0; ) {
        var u = Un(i), s = 1 << u;
        a[u] = Xt, i &= ~s;
      }
    }
    function Zc(e, t, a) {
      e.pingedLanes |= e.suspendedLanes & t;
    }
    function Nd(e, t) {
      var a = e.pendingLanes & ~t;
      e.pendingLanes = t, e.suspendedLanes = $, e.pingedLanes = $, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t;
      for (var i = e.entanglements, u = e.eventTimes, s = e.expirationTimes, f = a; f > 0; ) {
        var p = Un(f), v = 1 << p;
        i[p] = $, u[p] = Xt, s[p] = Xt, f &= ~v;
      }
    }
    function Jc(e, t) {
      for (var a = e.entangledLanes |= t, i = e.entanglements, u = a; u; ) {
        var s = Un(u), f = 1 << s;
        // Is this one of the newly entangled lanes?
        f & t | // Is this lane transitively entangled with the newly entangled lanes?
        i[s] & t && (i[s] |= t), u &= ~f;
      }
    }
    function zd(e, t) {
      var a = zl(t), i;
      switch (a) {
        case ni:
          i = Ml;
          break;
        case wn:
          i = Cr;
          break;
        case Cu:
        case Nc:
        case zc:
        case Uc:
        case Ac:
        case Fc:
        case jc:
        case Hc:
        case Pc:
        case Ru:
        case Vc:
        case mo:
        case yo:
        case Bc:
        case hs:
        case $c:
        case Tu:
        case Yc:
        case ys:
        case Ic:
        case Qc:
          i = Xi;
          break;
        case wu:
          i = Ss;
          break;
        default:
          i = _t;
          break;
      }
      return (i & (e.suspendedLanes | t)) !== _t ? _t : i;
    }
    function xs(e, t, a) {
      if (Xr)
        for (var i = e.pendingUpdatersLaneMap; a > 0; ) {
          var u = lr(a), s = 1 << u, f = i[u];
          f.add(t), a &= ~s;
        }
    }
    function Yv(e, t) {
      if (Xr)
        for (var a = e.pendingUpdatersLaneMap, i = e.memoizedUpdaters; t > 0; ) {
          var u = lr(t), s = 1 << u, f = a[u];
          f.size > 0 && (f.forEach(function(p) {
            var v = p.alternate;
            (v === null || !i.has(v)) && i.add(p);
          }), f.clear()), t &= ~s;
        }
    }
    function Ud(e, t) {
      return null;
    }
    var Or = Ae, bi = ni, Na = wn, za = wu, bs = _t;
    function Ua() {
      return bs;
    }
    function An(e) {
      bs = e;
    }
    function Iv(e, t) {
      var a = bs;
      try {
        return bs = e, t();
      } finally {
        bs = a;
      }
    }
    function Qv(e, t) {
      return e !== 0 && e < t ? e : t;
    }
    function _s(e, t) {
      return e > t ? e : t;
    }
    function Zn(e, t) {
      return e !== 0 && e < t;
    }
    function Wv(e) {
      var t = zl(e);
      return Zn(Or, t) ? Zn(bi, t) ? Cs(t) ? Na : za : bi : Or;
    }
    function ef(e) {
      var t = e.current.memoizedState;
      return t.isDehydrated;
    }
    var Ds;
    function Rr(e) {
      Ds = e;
    }
    function ly(e) {
      Ds(e);
    }
    var pe;
    function So(e) {
      pe = e;
    }
    var tf;
    function Gv(e) {
      tf = e;
    }
    var qv;
    function ks(e) {
      qv = e;
    }
    var Os;
    function Ad(e) {
      Os = e;
    }
    var nf = !1, Ls = [], Ki = null, _i = null, Di = null, xn = /* @__PURE__ */ new Map(), Lr = /* @__PURE__ */ new Map(), Mr = [], Xv = [
      "mousedown",
      "mouseup",
      "touchcancel",
      "touchend",
      "touchstart",
      "auxclick",
      "dblclick",
      "pointercancel",
      "pointerdown",
      "pointerup",
      "dragend",
      "dragstart",
      "drop",
      "compositionend",
      "compositionstart",
      "keydown",
      "keypress",
      "keyup",
      "input",
      "textInput",
      // Intentionally camelCase
      "copy",
      "cut",
      "paste",
      "click",
      "change",
      "contextmenu",
      "reset",
      "submit"
    ];
    function Kv(e) {
      return Xv.indexOf(e) > -1;
    }
    function ai(e, t, a, i, u) {
      return {
        blockedOn: e,
        domEventName: t,
        eventSystemFlags: a,
        nativeEvent: u,
        targetContainers: [i]
      };
    }
    function Fd(e, t) {
      switch (e) {
        case "focusin":
        case "focusout":
          Ki = null;
          break;
        case "dragenter":
        case "dragleave":
          _i = null;
          break;
        case "mouseover":
        case "mouseout":
          Di = null;
          break;
        case "pointerover":
        case "pointerout": {
          var a = t.pointerId;
          xn.delete(a);
          break;
        }
        case "gotpointercapture":
        case "lostpointercapture": {
          var i = t.pointerId;
          Lr.delete(i);
          break;
        }
      }
    }
    function Jr(e, t, a, i, u, s) {
      if (e === null || e.nativeEvent !== s) {
        var f = ai(t, a, i, u, s);
        if (t !== null) {
          var p = Do(t);
          p !== null && pe(p);
        }
        return f;
      }
      e.eventSystemFlags |= i;
      var v = e.targetContainers;
      return u !== null && v.indexOf(u) === -1 && v.push(u), e;
    }
    function uy(e, t, a, i, u) {
      switch (t) {
        case "focusin": {
          var s = u;
          return Ki = Jr(Ki, e, t, a, i, s), !0;
        }
        case "dragenter": {
          var f = u;
          return _i = Jr(_i, e, t, a, i, f), !0;
        }
        case "mouseover": {
          var p = u;
          return Di = Jr(Di, e, t, a, i, p), !0;
        }
        case "pointerover": {
          var v = u, y = v.pointerId;
          return xn.set(y, Jr(xn.get(y) || null, e, t, a, i, v)), !0;
        }
        case "gotpointercapture": {
          var g = u, b = g.pointerId;
          return Lr.set(b, Jr(Lr.get(b) || null, e, t, a, i, g)), !0;
        }
      }
      return !1;
    }
    function jd(e) {
      var t = $s(e.target);
      if (t !== null) {
        var a = da(t);
        if (a !== null) {
          var i = a.tag;
          if (i === be) {
            var u = Ti(a);
            if (u !== null) {
              e.blockedOn = u, Os(e.priority, function() {
                tf(a);
              });
              return;
            }
          } else if (i === ee) {
            var s = a.stateNode;
            if (ef(s)) {
              e.blockedOn = wi(a);
              return;
            }
          }
        }
      }
      e.blockedOn = null;
    }
    function Zv(e) {
      for (var t = qv(), a = {
        blockedOn: null,
        target: e,
        priority: t
      }, i = 0; i < Mr.length && Zn(t, Mr[i].priority); i++)
        ;
      Mr.splice(i, 0, a), i === 0 && jd(a);
    }
    function Ms(e) {
      if (e.blockedOn !== null)
        return !1;
      for (var t = e.targetContainers; t.length > 0; ) {
        var a = t[0], i = Co(e.domEventName, e.eventSystemFlags, a, e.nativeEvent);
        if (i === null) {
          var u = e.nativeEvent, s = new u.constructor(u.type, u);
          ty(s), u.target.dispatchEvent(s), ny();
        } else {
          var f = Do(i);
          return f !== null && pe(f), e.blockedOn = i, !1;
        }
        t.shift();
      }
      return !0;
    }
    function Hd(e, t, a) {
      Ms(e) && a.delete(t);
    }
    function oy() {
      nf = !1, Ki !== null && Ms(Ki) && (Ki = null), _i !== null && Ms(_i) && (_i = null), Di !== null && Ms(Di) && (Di = null), xn.forEach(Hd), Lr.forEach(Hd);
    }
    function Ul(e, t) {
      e.blockedOn === t && (e.blockedOn = null, nf || (nf = !0, W.unstable_scheduleCallback(W.unstable_NormalPriority, oy)));
    }
    function Du(e) {
      if (Ls.length > 0) {
        Ul(Ls[0], e);
        for (var t = 1; t < Ls.length; t++) {
          var a = Ls[t];
          a.blockedOn === e && (a.blockedOn = null);
        }
      }
      Ki !== null && Ul(Ki, e), _i !== null && Ul(_i, e), Di !== null && Ul(Di, e);
      var i = function(p) {
        return Ul(p, e);
      };
      xn.forEach(i), Lr.forEach(i);
      for (var u = 0; u < Mr.length; u++) {
        var s = Mr[u];
        s.blockedOn === e && (s.blockedOn = null);
      }
      for (; Mr.length > 0; ) {
        var f = Mr[0];
        if (f.blockedOn !== null)
          break;
        jd(f), f.blockedOn === null && Mr.shift();
      }
    }
    var ur = z.ReactCurrentBatchConfig, gt = !0;
    function Qn(e) {
      gt = !!e;
    }
    function Fn() {
      return gt;
    }
    function or(e, t, a) {
      var i = rf(t), u;
      switch (i) {
        case Or:
          u = ma;
          break;
        case bi:
          u = Eo;
          break;
        case Na:
        default:
          u = bn;
          break;
      }
      return u.bind(null, t, a, e);
    }
    function ma(e, t, a, i) {
      var u = Ua(), s = ur.transition;
      ur.transition = null;
      try {
        An(Or), bn(e, t, a, i);
      } finally {
        An(u), ur.transition = s;
      }
    }
    function Eo(e, t, a, i) {
      var u = Ua(), s = ur.transition;
      ur.transition = null;
      try {
        An(bi), bn(e, t, a, i);
      } finally {
        An(u), ur.transition = s;
      }
    }
    function bn(e, t, a, i) {
      gt && Ns(e, t, a, i);
    }
    function Ns(e, t, a, i) {
      var u = Co(e, t, a, i);
      if (u === null) {
        xy(e, t, i, ki, a), Fd(e, i);
        return;
      }
      if (uy(u, e, t, a, i)) {
        i.stopPropagation();
        return;
      }
      if (Fd(e, i), t & _a && Kv(e)) {
        for (; u !== null; ) {
          var s = Do(u);
          s !== null && ly(s);
          var f = Co(e, t, a, i);
          if (f === null && xy(e, t, i, ki, a), f === u)
            break;
          u = f;
        }
        u !== null && i.stopPropagation();
        return;
      }
      xy(e, t, i, null, a);
    }
    var ki = null;
    function Co(e, t, a, i) {
      ki = null;
      var u = fd(i), s = $s(u);
      if (s !== null) {
        var f = da(s);
        if (f === null)
          s = null;
        else {
          var p = f.tag;
          if (p === be) {
            var v = Ti(f);
            if (v !== null)
              return v;
            s = null;
          } else if (p === ee) {
            var y = f.stateNode;
            if (ef(y))
              return wi(f);
            s = null;
          } else f !== s && (s = null);
        }
      }
      return ki = s, null;
    }
    function rf(e) {
      switch (e) {
        case "cancel":
        case "click":
        case "close":
        case "contextmenu":
        case "copy":
        case "cut":
        case "auxclick":
        case "dblclick":
        case "dragend":
        case "dragstart":
        case "drop":
        case "focusin":
        case "focusout":
        case "input":
        case "invalid":
        case "keydown":
        case "keypress":
        case "keyup":
        case "mousedown":
        case "mouseup":
        case "paste":
        case "pause":
        case "play":
        case "pointercancel":
        case "pointerdown":
        case "pointerup":
        case "ratechange":
        case "reset":
        case "resize":
        case "seeked":
        case "submit":
        case "touchcancel":
        case "touchend":
        case "touchstart":
        case "volumechange":
        case "change":
        case "selectionchange":
        case "textInput":
        case "compositionstart":
        case "compositionend":
        case "compositionupdate":
        case "beforeblur":
        case "afterblur":
        case "beforeinput":
        case "blur":
        case "fullscreenchange":
        case "focus":
        case "hashchange":
        case "popstate":
        case "select":
        case "selectstart":
          return Or;
        case "drag":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "mousemove":
        case "mouseout":
        case "mouseover":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "scroll":
        case "toggle":
        case "touchmove":
        case "wheel":
        case "mouseenter":
        case "mouseleave":
        case "pointerenter":
        case "pointerleave":
          return bi;
        case "message": {
          var t = _c();
          switch (t) {
            case os:
              return Or;
            case Ol:
              return bi;
            case Gi:
            case iy:
              return Na;
            case hu:
              return za;
            default:
              return Na;
          }
        }
        default:
          return Na;
      }
    }
    function zs(e, t, a) {
      return e.addEventListener(t, a, !1), a;
    }
    function ea(e, t, a) {
      return e.addEventListener(t, a, !0), a;
    }
    function Pd(e, t, a, i) {
      return e.addEventListener(t, a, {
        capture: !0,
        passive: i
      }), a;
    }
    function Ro(e, t, a, i) {
      return e.addEventListener(t, a, {
        passive: i
      }), a;
    }
    var ya = null, To = null, ku = null;
    function Al(e) {
      return ya = e, To = Us(), !0;
    }
    function af() {
      ya = null, To = null, ku = null;
    }
    function Zi() {
      if (ku)
        return ku;
      var e, t = To, a = t.length, i, u = Us(), s = u.length;
      for (e = 0; e < a && t[e] === u[e]; e++)
        ;
      var f = a - e;
      for (i = 1; i <= f && t[a - i] === u[s - i]; i++)
        ;
      var p = i > 1 ? 1 - i : void 0;
      return ku = u.slice(e, p), ku;
    }
    function Us() {
      return "value" in ya ? ya.value : ya.textContent;
    }
    function Fl(e) {
      var t, a = e.keyCode;
      return "charCode" in e ? (t = e.charCode, t === 0 && a === 13 && (t = 13)) : t = a, t === 10 && (t = 13), t >= 32 || t === 13 ? t : 0;
    }
    function wo() {
      return !0;
    }
    function As() {
      return !1;
    }
    function Tr(e) {
      function t(a, i, u, s, f) {
        this._reactName = a, this._targetInst = u, this.type = i, this.nativeEvent = s, this.target = f, this.currentTarget = null;
        for (var p in e)
          if (e.hasOwnProperty(p)) {
            var v = e[p];
            v ? this[p] = v(s) : this[p] = s[p];
          }
        var y = s.defaultPrevented != null ? s.defaultPrevented : s.returnValue === !1;
        return y ? this.isDefaultPrevented = wo : this.isDefaultPrevented = As, this.isPropagationStopped = As, this;
      }
      return Ke(t.prototype, {
        preventDefault: function() {
          this.defaultPrevented = !0;
          var a = this.nativeEvent;
          a && (a.preventDefault ? a.preventDefault() : typeof a.returnValue != "unknown" && (a.returnValue = !1), this.isDefaultPrevented = wo);
        },
        stopPropagation: function() {
          var a = this.nativeEvent;
          a && (a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0), this.isPropagationStopped = wo);
        },
        /**
         * We release all dispatched `SyntheticEvent`s after each event loop, adding
         * them back into the pool. This allows a way to hold onto a reference that
         * won't be added back into the pool.
         */
        persist: function() {
        },
        /**
         * Checks if this event should be released back into the pool.
         *
         * @return {boolean} True if this should not be released, false otherwise.
         */
        isPersistent: wo
      }), t;
    }
    var jn = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function(e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0
    }, Oi = Tr(jn), Nr = Ke({}, jn, {
      view: 0,
      detail: 0
    }), ta = Tr(Nr), lf, Fs, Ou;
    function sy(e) {
      e !== Ou && (Ou && e.type === "mousemove" ? (lf = e.screenX - Ou.screenX, Fs = e.screenY - Ou.screenY) : (lf = 0, Fs = 0), Ou = e);
    }
    var ii = Ke({}, Nr, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: dn,
      button: 0,
      buttons: 0,
      relatedTarget: function(e) {
        return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
      },
      movementX: function(e) {
        return "movementX" in e ? e.movementX : (sy(e), lf);
      },
      movementY: function(e) {
        return "movementY" in e ? e.movementY : Fs;
      }
    }), Vd = Tr(ii), Bd = Ke({}, ii, {
      dataTransfer: 0
    }), Lu = Tr(Bd), $d = Ke({}, Nr, {
      relatedTarget: 0
    }), Ji = Tr($d), Jv = Ke({}, jn, {
      animationName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), eh = Tr(Jv), Yd = Ke({}, jn, {
      clipboardData: function(e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      }
    }), uf = Tr(Yd), cy = Ke({}, jn, {
      data: 0
    }), th = Tr(cy), nh = th, rh = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified"
    }, Mu = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta"
    };
    function fy(e) {
      if (e.key) {
        var t = rh[e.key] || e.key;
        if (t !== "Unidentified")
          return t;
      }
      if (e.type === "keypress") {
        var a = Fl(e);
        return a === 13 ? "Enter" : String.fromCharCode(a);
      }
      return e.type === "keydown" || e.type === "keyup" ? Mu[e.keyCode] || "Unidentified" : "";
    }
    var xo = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey"
    };
    function ah(e) {
      var t = this, a = t.nativeEvent;
      if (a.getModifierState)
        return a.getModifierState(e);
      var i = xo[e];
      return i ? !!a[i] : !1;
    }
    function dn(e) {
      return ah;
    }
    var dy = Ke({}, Nr, {
      key: fy,
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: dn,
      // Legacy Interface
      charCode: function(e) {
        return e.type === "keypress" ? Fl(e) : 0;
      },
      keyCode: function(e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function(e) {
        return e.type === "keypress" ? Fl(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      }
    }), ih = Tr(dy), py = Ke({}, ii, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0
    }), lh = Tr(py), uh = Ke({}, Nr, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: dn
    }), oh = Tr(uh), vy = Ke({}, jn, {
      propertyName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), Aa = Tr(vy), Id = Ke({}, ii, {
      deltaX: function(e) {
        return "deltaX" in e ? e.deltaX : (
          // Fallback to `wheelDeltaX` for Webkit and normalize (right is positive).
          "wheelDeltaX" in e ? -e.wheelDeltaX : 0
        );
      },
      deltaY: function(e) {
        return "deltaY" in e ? e.deltaY : (
          // Fallback to `wheelDeltaY` for Webkit and normalize (down is positive).
          "wheelDeltaY" in e ? -e.wheelDeltaY : (
            // Fallback to `wheelDelta` for IE<9 and normalize (down is positive).
            "wheelDelta" in e ? -e.wheelDelta : 0
          )
        );
      },
      deltaZ: 0,
      // Browsers without "deltaMode" is reporting in raw wheel delta where one
      // notch on the scroll is always +/- 120, roughly equivalent to pixels.
      // A good approximation of DOM_DELTA_LINE (1) is 5% of viewport size or
      // ~40 pixels, for DOM_DELTA_SCREEN (2) it is 87.5% of viewport size.
      deltaMode: 0
    }), hy = Tr(Id), jl = [9, 13, 27, 32], js = 229, el = kn && "CompositionEvent" in window, Hl = null;
    kn && "documentMode" in document && (Hl = document.documentMode);
    var Qd = kn && "TextEvent" in window && !Hl, of = kn && (!el || Hl && Hl > 8 && Hl <= 11), sh = 32, sf = String.fromCharCode(sh);
    function my() {
      rt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), rt("onCompositionEnd", ["compositionend", "focusout", "keydown", "keypress", "keyup", "mousedown"]), rt("onCompositionStart", ["compositionstart", "focusout", "keydown", "keypress", "keyup", "mousedown"]), rt("onCompositionUpdate", ["compositionupdate", "focusout", "keydown", "keypress", "keyup", "mousedown"]);
    }
    var Wd = !1;
    function ch(e) {
      return (e.ctrlKey || e.altKey || e.metaKey) && // ctrlKey && altKey is equivalent to AltGr, and is not a command.
      !(e.ctrlKey && e.altKey);
    }
    function cf(e) {
      switch (e) {
        case "compositionstart":
          return "onCompositionStart";
        case "compositionend":
          return "onCompositionEnd";
        case "compositionupdate":
          return "onCompositionUpdate";
      }
    }
    function ff(e, t) {
      return e === "keydown" && t.keyCode === js;
    }
    function Gd(e, t) {
      switch (e) {
        case "keyup":
          return jl.indexOf(t.keyCode) !== -1;
        case "keydown":
          return t.keyCode !== js;
        case "keypress":
        case "mousedown":
        case "focusout":
          return !0;
        default:
          return !1;
      }
    }
    function df(e) {
      var t = e.detail;
      return typeof t == "object" && "data" in t ? t.data : null;
    }
    function fh(e) {
      return e.locale === "ko";
    }
    var Nu = !1;
    function qd(e, t, a, i, u) {
      var s, f;
      if (el ? s = cf(t) : Nu ? Gd(t, i) && (s = "onCompositionEnd") : ff(t, i) && (s = "onCompositionStart"), !s)
        return null;
      of && !fh(i) && (!Nu && s === "onCompositionStart" ? Nu = Al(u) : s === "onCompositionEnd" && Nu && (f = Zi()));
      var p = gh(a, s);
      if (p.length > 0) {
        var v = new th(s, t, null, i, u);
        if (e.push({
          event: v,
          listeners: p
        }), f)
          v.data = f;
        else {
          var y = df(i);
          y !== null && (v.data = y);
        }
      }
    }
    function pf(e, t) {
      switch (e) {
        case "compositionend":
          return df(t);
        case "keypress":
          var a = t.which;
          return a !== sh ? null : (Wd = !0, sf);
        case "textInput":
          var i = t.data;
          return i === sf && Wd ? null : i;
        default:
          return null;
      }
    }
    function Xd(e, t) {
      if (Nu) {
        if (e === "compositionend" || !el && Gd(e, t)) {
          var a = Zi();
          return af(), Nu = !1, a;
        }
        return null;
      }
      switch (e) {
        case "paste":
          return null;
        case "keypress":
          if (!ch(t)) {
            if (t.char && t.char.length > 1)
              return t.char;
            if (t.which)
              return String.fromCharCode(t.which);
          }
          return null;
        case "compositionend":
          return of && !fh(t) ? null : t.data;
        default:
          return null;
      }
    }
    function vf(e, t, a, i, u) {
      var s;
      if (Qd ? s = pf(t, i) : s = Xd(t, i), !s)
        return null;
      var f = gh(a, "onBeforeInput");
      if (f.length > 0) {
        var p = new nh("onBeforeInput", "beforeinput", null, i, u);
        e.push({
          event: p,
          listeners: f
        }), p.data = s;
      }
    }
    function dh(e, t, a, i, u, s, f) {
      qd(e, t, a, i, u), vf(e, t, a, i, u);
    }
    var yy = {
      color: !0,
      date: !0,
      datetime: !0,
      "datetime-local": !0,
      email: !0,
      month: !0,
      number: !0,
      password: !0,
      range: !0,
      search: !0,
      tel: !0,
      text: !0,
      time: !0,
      url: !0,
      week: !0
    };
    function Hs(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t === "input" ? !!yy[e.type] : t === "textarea";
    }
    /**
     * Checks if an event is supported in the current execution environment.
     *
     * NOTE: This will not work correctly for non-generic events such as `change`,
     * `reset`, `load`, `error`, and `select`.
     *
     * Borrows from Modernizr.
     *
     * @param {string} eventNameSuffix Event name, e.g. "click".
     * @return {boolean} True if the event is supported.
     * @internal
     * @license Modernizr 3.0.0pre (Custom Build) | MIT
     */
    function gy(e) {
      if (!kn)
        return !1;
      var t = "on" + e, a = t in document;
      if (!a) {
        var i = document.createElement("div");
        i.setAttribute(t, "return;"), a = typeof i[t] == "function";
      }
      return a;
    }
    function Ps() {
      rt("onChange", ["change", "click", "focusin", "focusout", "input", "keydown", "keyup", "selectionchange"]);
    }
    function ph(e, t, a, i) {
      uo(i);
      var u = gh(t, "onChange");
      if (u.length > 0) {
        var s = new Oi("onChange", "change", null, a, i);
        e.push({
          event: s,
          listeners: u
        });
      }
    }
    var Pl = null, n = null;
    function r(e) {
      var t = e.nodeName && e.nodeName.toLowerCase();
      return t === "select" || t === "input" && e.type === "file";
    }
    function l(e) {
      var t = [];
      ph(t, n, e, fd(e)), xv(o, t);
    }
    function o(e) {
      bE(e, 0);
    }
    function c(e) {
      var t = Ef(e);
      if (yi(t))
        return e;
    }
    function d(e, t) {
      if (e === "change")
        return t;
    }
    var m = !1;
    kn && (m = gy("input") && (!document.documentMode || document.documentMode > 9));
    function E(e, t) {
      Pl = e, n = t, Pl.attachEvent("onpropertychange", U);
    }
    function T() {
      Pl && (Pl.detachEvent("onpropertychange", U), Pl = null, n = null);
    }
    function U(e) {
      e.propertyName === "value" && c(n) && l(e);
    }
    function I(e, t, a) {
      e === "focusin" ? (T(), E(t, a)) : e === "focusout" && T();
    }
    function G(e, t) {
      if (e === "selectionchange" || e === "keyup" || e === "keydown")
        return c(n);
    }
    function Y(e) {
      var t = e.nodeName;
      return t && t.toLowerCase() === "input" && (e.type === "checkbox" || e.type === "radio");
    }
    function se(e, t) {
      if (e === "click")
        return c(t);
    }
    function me(e, t) {
      if (e === "input" || e === "change")
        return c(t);
    }
    function Se(e) {
      var t = e._wrapperState;
      !t || !t.controlled || e.type !== "number" || Oe(e, "number", e.value);
    }
    function _n(e, t, a, i, u, s, f) {
      var p = a ? Ef(a) : window, v, y;
      if (r(p) ? v = d : Hs(p) ? m ? v = me : (v = G, y = I) : Y(p) && (v = se), v) {
        var g = v(t, a);
        if (g) {
          ph(e, g, i, u);
          return;
        }
      }
      y && y(t, p, a), t === "focusout" && Se(p);
    }
    function D() {
      Pt("onMouseEnter", ["mouseout", "mouseover"]), Pt("onMouseLeave", ["mouseout", "mouseover"]), Pt("onPointerEnter", ["pointerout", "pointerover"]), Pt("onPointerLeave", ["pointerout", "pointerover"]);
    }
    function x(e, t, a, i, u, s, f) {
      var p = t === "mouseover" || t === "pointerover", v = t === "mouseout" || t === "pointerout";
      if (p && !ns(i)) {
        var y = i.relatedTarget || i.fromElement;
        if (y && ($s(y) || cp(y)))
          return;
      }
      if (!(!v && !p)) {
        var g;
        if (u.window === u)
          g = u;
        else {
          var b = u.ownerDocument;
          b ? g = b.defaultView || b.parentWindow : g = window;
        }
        var w, M;
        if (v) {
          var A = i.relatedTarget || i.toElement;
          if (w = a, M = A ? $s(A) : null, M !== null) {
            var j = da(M);
            (M !== j || M.tag !== ue && M.tag !== Ye) && (M = null);
          }
        } else
          w = null, M = a;
        if (w !== M) {
          var le = Vd, Le = "onMouseLeave", we = "onMouseEnter", Et = "mouse";
          (t === "pointerout" || t === "pointerover") && (le = lh, Le = "onPointerLeave", we = "onPointerEnter", Et = "pointer");
          var vt = w == null ? g : Ef(w), k = M == null ? g : Ef(M), H = new le(Le, Et + "leave", w, i, u);
          H.target = vt, H.relatedTarget = k;
          var O = null, q = $s(u);
          if (q === a) {
            var fe = new le(we, Et + "enter", M, i, u);
            fe.target = k, fe.relatedTarget = vt, O = fe;
          }
          xT(e, H, O, w, M);
        }
      }
    }
    function L(e, t) {
      return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
    }
    var Q = typeof Object.is == "function" ? Object.is : L;
    function ye(e, t) {
      if (Q(e, t))
        return !0;
      if (typeof e != "object" || e === null || typeof t != "object" || t === null)
        return !1;
      var a = Object.keys(e), i = Object.keys(t);
      if (a.length !== i.length)
        return !1;
      for (var u = 0; u < a.length; u++) {
        var s = a[u];
        if (!wr.call(t, s) || !Q(e[s], t[s]))
          return !1;
      }
      return !0;
    }
    function Me(e) {
      for (; e && e.firstChild; )
        e = e.firstChild;
      return e;
    }
    function ze(e) {
      for (; e; ) {
        if (e.nextSibling)
          return e.nextSibling;
        e = e.parentNode;
      }
    }
    function Pe(e, t) {
      for (var a = Me(e), i = 0, u = 0; a; ) {
        if (a.nodeType === $i) {
          if (u = i + a.textContent.length, i <= t && u >= t)
            return {
              node: a,
              offset: t - i
            };
          i = u;
        }
        a = Me(ze(a));
      }
    }
    function Jn(e) {
      var t = e.ownerDocument, a = t && t.defaultView || window, i = a.getSelection && a.getSelection();
      if (!i || i.rangeCount === 0)
        return null;
      var u = i.anchorNode, s = i.anchorOffset, f = i.focusNode, p = i.focusOffset;
      try {
        u.nodeType, f.nodeType;
      } catch {
        return null;
      }
      return Mt(e, u, s, f, p);
    }
    function Mt(e, t, a, i, u) {
      var s = 0, f = -1, p = -1, v = 0, y = 0, g = e, b = null;
      e: for (; ; ) {
        for (var w = null; g === t && (a === 0 || g.nodeType === $i) && (f = s + a), g === i && (u === 0 || g.nodeType === $i) && (p = s + u), g.nodeType === $i && (s += g.nodeValue.length), (w = g.firstChild) !== null; )
          b = g, g = w;
        for (; ; ) {
          if (g === e)
            break e;
          if (b === t && ++v === a && (f = s), b === i && ++y === u && (p = s), (w = g.nextSibling) !== null)
            break;
          g = b, b = g.parentNode;
        }
        g = w;
      }
      return f === -1 || p === -1 ? null : {
        start: f,
        end: p
      };
    }
    function Vl(e, t) {
      var a = e.ownerDocument || document, i = a && a.defaultView || window;
      if (i.getSelection) {
        var u = i.getSelection(), s = e.textContent.length, f = Math.min(t.start, s), p = t.end === void 0 ? f : Math.min(t.end, s);
        if (!u.extend && f > p) {
          var v = p;
          p = f, f = v;
        }
        var y = Pe(e, f), g = Pe(e, p);
        if (y && g) {
          if (u.rangeCount === 1 && u.anchorNode === y.node && u.anchorOffset === y.offset && u.focusNode === g.node && u.focusOffset === g.offset)
            return;
          var b = a.createRange();
          b.setStart(y.node, y.offset), u.removeAllRanges(), f > p ? (u.addRange(b), u.extend(g.node, g.offset)) : (b.setEnd(g.node, g.offset), u.addRange(b));
        }
      }
    }
    function vh(e) {
      return e && e.nodeType === $i;
    }
    function hE(e, t) {
      return !e || !t ? !1 : e === t ? !0 : vh(e) ? !1 : vh(t) ? hE(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1;
    }
    function uT(e) {
      return e && e.ownerDocument && hE(e.ownerDocument.documentElement, e);
    }
    function oT(e) {
      try {
        return typeof e.contentWindow.location.href == "string";
      } catch {
        return !1;
      }
    }
    function mE() {
      for (var e = window, t = ba(); t instanceof e.HTMLIFrameElement; ) {
        if (oT(t))
          e = t.contentWindow;
        else
          return t;
        t = ba(e.document);
      }
      return t;
    }
    function Sy(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
    }
    function sT() {
      var e = mE();
      return {
        focusedElem: e,
        selectionRange: Sy(e) ? fT(e) : null
      };
    }
    function cT(e) {
      var t = mE(), a = e.focusedElem, i = e.selectionRange;
      if (t !== a && uT(a)) {
        i !== null && Sy(a) && dT(a, i);
        for (var u = [], s = a; s = s.parentNode; )
          s.nodeType === Ir && u.push({
            element: s,
            left: s.scrollLeft,
            top: s.scrollTop
          });
        typeof a.focus == "function" && a.focus();
        for (var f = 0; f < u.length; f++) {
          var p = u[f];
          p.element.scrollLeft = p.left, p.element.scrollTop = p.top;
        }
      }
    }
    function fT(e) {
      var t;
      return "selectionStart" in e ? t = {
        start: e.selectionStart,
        end: e.selectionEnd
      } : t = Jn(e), t || {
        start: 0,
        end: 0
      };
    }
    function dT(e, t) {
      var a = t.start, i = t.end;
      i === void 0 && (i = a), "selectionStart" in e ? (e.selectionStart = a, e.selectionEnd = Math.min(i, e.value.length)) : Vl(e, t);
    }
    var pT = kn && "documentMode" in document && document.documentMode <= 11;
    function vT() {
      rt("onSelect", ["focusout", "contextmenu", "dragend", "focusin", "keydown", "keyup", "mousedown", "mouseup", "selectionchange"]);
    }
    var hf = null, Ey = null, Kd = null, Cy = !1;
    function hT(e) {
      if ("selectionStart" in e && Sy(e))
        return {
          start: e.selectionStart,
          end: e.selectionEnd
        };
      var t = e.ownerDocument && e.ownerDocument.defaultView || window, a = t.getSelection();
      return {
        anchorNode: a.anchorNode,
        anchorOffset: a.anchorOffset,
        focusNode: a.focusNode,
        focusOffset: a.focusOffset
      };
    }
    function mT(e) {
      return e.window === e ? e.document : e.nodeType === Yi ? e : e.ownerDocument;
    }
    function yE(e, t, a) {
      var i = mT(a);
      if (!(Cy || hf == null || hf !== ba(i))) {
        var u = hT(hf);
        if (!Kd || !ye(Kd, u)) {
          Kd = u;
          var s = gh(Ey, "onSelect");
          if (s.length > 0) {
            var f = new Oi("onSelect", "select", null, t, a);
            e.push({
              event: f,
              listeners: s
            }), f.target = hf;
          }
        }
      }
    }
    function yT(e, t, a, i, u, s, f) {
      var p = a ? Ef(a) : window;
      switch (t) {
        case "focusin":
          (Hs(p) || p.contentEditable === "true") && (hf = p, Ey = a, Kd = null);
          break;
        case "focusout":
          hf = null, Ey = null, Kd = null;
          break;
        case "mousedown":
          Cy = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Cy = !1, yE(e, i, u);
          break;
        case "selectionchange":
          if (pT)
            break;
        case "keydown":
        case "keyup":
          yE(e, i, u);
      }
    }
    function hh(e, t) {
      var a = {};
      return a[e.toLowerCase()] = t.toLowerCase(), a["Webkit" + e] = "webkit" + t, a["Moz" + e] = "moz" + t, a;
    }
    var mf = {
      animationend: hh("Animation", "AnimationEnd"),
      animationiteration: hh("Animation", "AnimationIteration"),
      animationstart: hh("Animation", "AnimationStart"),
      transitionend: hh("Transition", "TransitionEnd")
    }, Ry = {}, gE = {};
    kn && (gE = document.createElement("div").style, "AnimationEvent" in window || (delete mf.animationend.animation, delete mf.animationiteration.animation, delete mf.animationstart.animation), "TransitionEvent" in window || delete mf.transitionend.transition);
    function mh(e) {
      if (Ry[e])
        return Ry[e];
      if (!mf[e])
        return e;
      var t = mf[e];
      for (var a in t)
        if (t.hasOwnProperty(a) && a in gE)
          return Ry[e] = t[a];
      return e;
    }
    var SE = mh("animationend"), EE = mh("animationiteration"), CE = mh("animationstart"), RE = mh("transitionend"), TE = /* @__PURE__ */ new Map(), wE = ["abort", "auxClick", "cancel", "canPlay", "canPlayThrough", "click", "close", "contextMenu", "copy", "cut", "drag", "dragEnd", "dragEnter", "dragExit", "dragLeave", "dragOver", "dragStart", "drop", "durationChange", "emptied", "encrypted", "ended", "error", "gotPointerCapture", "input", "invalid", "keyDown", "keyPress", "keyUp", "load", "loadedData", "loadedMetadata", "loadStart", "lostPointerCapture", "mouseDown", "mouseMove", "mouseOut", "mouseOver", "mouseUp", "paste", "pause", "play", "playing", "pointerCancel", "pointerDown", "pointerMove", "pointerOut", "pointerOver", "pointerUp", "progress", "rateChange", "reset", "resize", "seeked", "seeking", "stalled", "submit", "suspend", "timeUpdate", "touchCancel", "touchEnd", "touchStart", "volumeChange", "scroll", "toggle", "touchMove", "waiting", "wheel"];
    function bo(e, t) {
      TE.set(e, t), rt(t, [e]);
    }
    function gT() {
      for (var e = 0; e < wE.length; e++) {
        var t = wE[e], a = t.toLowerCase(), i = t[0].toUpperCase() + t.slice(1);
        bo(a, "on" + i);
      }
      bo(SE, "onAnimationEnd"), bo(EE, "onAnimationIteration"), bo(CE, "onAnimationStart"), bo("dblclick", "onDoubleClick"), bo("focusin", "onFocus"), bo("focusout", "onBlur"), bo(RE, "onTransitionEnd");
    }
    function ST(e, t, a, i, u, s, f) {
      var p = TE.get(t);
      if (p !== void 0) {
        var v = Oi, y = t;
        switch (t) {
          case "keypress":
            if (Fl(i) === 0)
              return;
          case "keydown":
          case "keyup":
            v = ih;
            break;
          case "focusin":
            y = "focus", v = Ji;
            break;
          case "focusout":
            y = "blur", v = Ji;
            break;
          case "beforeblur":
          case "afterblur":
            v = Ji;
            break;
          case "click":
            if (i.button === 2)
              return;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            v = Vd;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            v = Lu;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            v = oh;
            break;
          case SE:
          case EE:
          case CE:
            v = eh;
            break;
          case RE:
            v = Aa;
            break;
          case "scroll":
            v = ta;
            break;
          case "wheel":
            v = hy;
            break;
          case "copy":
          case "cut":
          case "paste":
            v = uf;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            v = lh;
            break;
        }
        var g = (s & _a) !== 0;
        {
          var b = !g && // TODO: ideally, we'd eventually add all events from
          // nonDelegatedEvents list in DOMPluginEventSystem.
          // Then we can remove this special list.
          // This is a breaking change that can wait until React 18.
          t === "scroll", w = TT(a, p, i.type, g, b);
          if (w.length > 0) {
            var M = new v(p, y, null, i, u);
            e.push({
              event: M,
              listeners: w
            });
          }
        }
      }
    }
    gT(), D(), Ps(), vT(), my();
    function ET(e, t, a, i, u, s, f) {
      ST(e, t, a, i, u, s);
      var p = (s & cd) === 0;
      p && (x(e, t, a, i, u), _n(e, t, a, i, u), yT(e, t, a, i, u), dh(e, t, a, i, u));
    }
    var Zd = ["abort", "canplay", "canplaythrough", "durationchange", "emptied", "encrypted", "ended", "error", "loadeddata", "loadedmetadata", "loadstart", "pause", "play", "playing", "progress", "ratechange", "resize", "seeked", "seeking", "stalled", "suspend", "timeupdate", "volumechange", "waiting"], Ty = new Set(["cancel", "close", "invalid", "load", "scroll", "toggle"].concat(Zd));
    function xE(e, t, a) {
      var i = e.type || "unknown-event";
      e.currentTarget = a, Ei(i, t, void 0, e), e.currentTarget = null;
    }
    function CT(e, t, a) {
      var i;
      if (a)
        for (var u = t.length - 1; u >= 0; u--) {
          var s = t[u], f = s.instance, p = s.currentTarget, v = s.listener;
          if (f !== i && e.isPropagationStopped())
            return;
          xE(e, v, p), i = f;
        }
      else
        for (var y = 0; y < t.length; y++) {
          var g = t[y], b = g.instance, w = g.currentTarget, M = g.listener;
          if (b !== i && e.isPropagationStopped())
            return;
          xE(e, M, w), i = b;
        }
    }
    function bE(e, t) {
      for (var a = (t & _a) !== 0, i = 0; i < e.length; i++) {
        var u = e[i], s = u.event, f = u.listeners;
        CT(s, f, a);
      }
      is();
    }
    function RT(e, t, a, i, u) {
      var s = fd(a), f = [];
      ET(f, e, i, a, s, t), bE(f, t);
    }
    function gn(e, t) {
      Ty.has(e) || S('Did not expect a listenToNonDelegatedEvent() call for "%s". This is a bug in React. Please file an issue.', e);
      var a = !1, i = Z1(t), u = bT(e);
      i.has(u) || (_E(t, e, vc, a), i.add(u));
    }
    function wy(e, t, a) {
      Ty.has(e) && !t && S('Did not expect a listenToNativeEvent() call for "%s" in the bubble phase. This is a bug in React. Please file an issue.', e);
      var i = 0;
      t && (i |= _a), _E(a, e, i, t);
    }
    var yh = "_reactListening" + Math.random().toString(36).slice(2);
    function Jd(e) {
      if (!e[yh]) {
        e[yh] = !0, Ze.forEach(function(a) {
          a !== "selectionchange" && (Ty.has(a) || wy(a, !1, e), wy(a, !0, e));
        });
        var t = e.nodeType === Yi ? e : e.ownerDocument;
        t !== null && (t[yh] || (t[yh] = !0, wy("selectionchange", !1, t)));
      }
    }
    function _E(e, t, a, i, u) {
      var s = or(e, t, a), f = void 0;
      as && (t === "touchstart" || t === "touchmove" || t === "wheel") && (f = !0), e = e, i ? f !== void 0 ? Pd(e, t, s, f) : ea(e, t, s) : f !== void 0 ? Ro(e, t, s, f) : zs(e, t, s);
    }
    function DE(e, t) {
      return e === t || e.nodeType === Ln && e.parentNode === t;
    }
    function xy(e, t, a, i, u) {
      var s = i;
      if (!(t & sd) && !(t & vc)) {
        var f = u;
        if (i !== null) {
          var p = i;
          e: for (; ; ) {
            if (p === null)
              return;
            var v = p.tag;
            if (v === ee || v === Ce) {
              var y = p.stateNode.containerInfo;
              if (DE(y, f))
                break;
              if (v === Ce)
                for (var g = p.return; g !== null; ) {
                  var b = g.tag;
                  if (b === ee || b === Ce) {
                    var w = g.stateNode.containerInfo;
                    if (DE(w, f))
                      return;
                  }
                  g = g.return;
                }
              for (; y !== null; ) {
                var M = $s(y);
                if (M === null)
                  return;
                var A = M.tag;
                if (A === ue || A === Ye) {
                  p = s = M;
                  continue e;
                }
                y = y.parentNode;
              }
            }
            p = p.return;
          }
        }
      }
      xv(function() {
        return RT(e, t, a, s);
      });
    }
    function ep(e, t, a) {
      return {
        instance: e,
        listener: t,
        currentTarget: a
      };
    }
    function TT(e, t, a, i, u, s) {
      for (var f = t !== null ? t + "Capture" : null, p = i ? f : t, v = [], y = e, g = null; y !== null; ) {
        var b = y, w = b.stateNode, M = b.tag;
        if (M === ue && w !== null && (g = w, p !== null)) {
          var A = wl(y, p);
          A != null && v.push(ep(y, A, g));
        }
        if (u)
          break;
        y = y.return;
      }
      return v;
    }
    function gh(e, t) {
      for (var a = t + "Capture", i = [], u = e; u !== null; ) {
        var s = u, f = s.stateNode, p = s.tag;
        if (p === ue && f !== null) {
          var v = f, y = wl(u, a);
          y != null && i.unshift(ep(u, y, v));
          var g = wl(u, t);
          g != null && i.push(ep(u, g, v));
        }
        u = u.return;
      }
      return i;
    }
    function yf(e) {
      if (e === null)
        return null;
      do
        e = e.return;
      while (e && e.tag !== ue);
      return e || null;
    }
    function wT(e, t) {
      for (var a = e, i = t, u = 0, s = a; s; s = yf(s))
        u++;
      for (var f = 0, p = i; p; p = yf(p))
        f++;
      for (; u - f > 0; )
        a = yf(a), u--;
      for (; f - u > 0; )
        i = yf(i), f--;
      for (var v = u; v--; ) {
        if (a === i || i !== null && a === i.alternate)
          return a;
        a = yf(a), i = yf(i);
      }
      return null;
    }
    function kE(e, t, a, i, u) {
      for (var s = t._reactName, f = [], p = a; p !== null && p !== i; ) {
        var v = p, y = v.alternate, g = v.stateNode, b = v.tag;
        if (y !== null && y === i)
          break;
        if (b === ue && g !== null) {
          var w = g;
          if (u) {
            var M = wl(p, s);
            M != null && f.unshift(ep(p, M, w));
          } else if (!u) {
            var A = wl(p, s);
            A != null && f.push(ep(p, A, w));
          }
        }
        p = p.return;
      }
      f.length !== 0 && e.push({
        event: t,
        listeners: f
      });
    }
    function xT(e, t, a, i, u) {
      var s = i && u ? wT(i, u) : null;
      i !== null && kE(e, t, i, s, !1), u !== null && a !== null && kE(e, a, u, s, !0);
    }
    function bT(e, t) {
      return e + "__bubble";
    }
    var Fa = !1, tp = "dangerouslySetInnerHTML", Sh = "suppressContentEditableWarning", _o = "suppressHydrationWarning", OE = "autoFocus", Vs = "children", Bs = "style", Eh = "__html", by, Ch, np, LE, Rh, ME, NE;
    by = {
      // There are working polyfills for <dialog>. Let people use it.
      dialog: !0,
      // Electron ships a custom <webview> tag to display external web content in
      // an isolated frame and process.
      // This tag is not present in non Electron environments such as JSDom which
      // is often used for testing purposes.
      // @see https://electronjs.org/docs/api/webview-tag
      webview: !0
    }, Ch = function(e, t) {
      ld(e, t), dc(e, t), Rv(e, t, {
        registrationNameDependencies: Xe,
        possibleRegistrationNames: Je
      });
    }, ME = kn && !document.documentMode, np = function(e, t, a) {
      if (!Fa) {
        var i = Th(a), u = Th(t);
        u !== i && (Fa = !0, S("Prop `%s` did not match. Server: %s Client: %s", e, JSON.stringify(u), JSON.stringify(i)));
      }
    }, LE = function(e) {
      if (!Fa) {
        Fa = !0;
        var t = [];
        e.forEach(function(a) {
          t.push(a);
        }), S("Extra attributes from the server: %s", t);
      }
    }, Rh = function(e, t) {
      t === !1 ? S("Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.", e, e, e) : S("Expected `%s` listener to be a function, instead got a value of `%s` type.", e, typeof t);
    }, NE = function(e, t) {
      var a = e.namespaceURI === Bi ? e.ownerDocument.createElement(e.tagName) : e.ownerDocument.createElementNS(e.namespaceURI, e.tagName);
      return a.innerHTML = t, a.innerHTML;
    };
    var _T = /\r\n?/g, DT = /\u0000|\uFFFD/g;
    function Th(e) {
      Gn(e);
      var t = typeof e == "string" ? e : "" + e;
      return t.replace(_T, `
`).replace(DT, "");
    }
    function wh(e, t, a, i) {
      var u = Th(t), s = Th(e);
      if (s !== u && (i && (Fa || (Fa = !0, S('Text content did not match. Server: "%s" Client: "%s"', s, u))), a && Ee))
        throw new Error("Text content does not match server-rendered HTML.");
    }
    function zE(e) {
      return e.nodeType === Yi ? e : e.ownerDocument;
    }
    function kT() {
    }
    function xh(e) {
      e.onclick = kT;
    }
    function OT(e, t, a, i, u) {
      for (var s in i)
        if (i.hasOwnProperty(s)) {
          var f = i[s];
          if (s === Bs)
            f && Object.freeze(f), mv(t, f);
          else if (s === tp) {
            var p = f ? f[Eh] : void 0;
            p != null && av(t, p);
          } else if (s === Vs)
            if (typeof f == "string") {
              var v = e !== "textarea" || f !== "";
              v && ro(t, f);
            } else typeof f == "number" && ro(t, "" + f);
          else s === Sh || s === _o || s === OE || (Xe.hasOwnProperty(s) ? f != null && (typeof f != "function" && Rh(s, f), s === "onScroll" && gn("scroll", t)) : f != null && xr(t, s, f, u));
        }
    }
    function LT(e, t, a, i) {
      for (var u = 0; u < t.length; u += 2) {
        var s = t[u], f = t[u + 1];
        s === Bs ? mv(e, f) : s === tp ? av(e, f) : s === Vs ? ro(e, f) : xr(e, s, f, i);
      }
    }
    function MT(e, t, a, i) {
      var u, s = zE(a), f, p = i;
      if (p === Bi && (p = Jf(e)), p === Bi) {
        if (u = Rl(e, t), !u && e !== e.toLowerCase() && S("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.", e), e === "script") {
          var v = s.createElement("div");
          v.innerHTML = "<script><\/script>";
          var y = v.firstChild;
          f = v.removeChild(y);
        } else if (typeof t.is == "string")
          f = s.createElement(e, {
            is: t.is
          });
        else if (f = s.createElement(e), e === "select") {
          var g = f;
          t.multiple ? g.multiple = !0 : t.size && (g.size = t.size);
        }
      } else
        f = s.createElementNS(p, e);
      return p === Bi && !u && Object.prototype.toString.call(f) === "[object HTMLUnknownElement]" && !wr.call(by, e) && (by[e] = !0, S("The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.", e)), f;
    }
    function NT(e, t) {
      return zE(t).createTextNode(e);
    }
    function zT(e, t, a, i) {
      var u = Rl(t, a);
      Ch(t, a);
      var s;
      switch (t) {
        case "dialog":
          gn("cancel", e), gn("close", e), s = a;
          break;
        case "iframe":
        case "object":
        case "embed":
          gn("load", e), s = a;
          break;
        case "video":
        case "audio":
          for (var f = 0; f < Zd.length; f++)
            gn(Zd[f], e);
          s = a;
          break;
        case "source":
          gn("error", e), s = a;
          break;
        case "img":
        case "image":
        case "link":
          gn("error", e), gn("load", e), s = a;
          break;
        case "details":
          gn("toggle", e), s = a;
          break;
        case "input":
          Ja(e, a), s = no(e, a), gn("invalid", e);
          break;
        case "option":
          wt(e, a), s = a;
          break;
        case "select":
          uu(e, a), s = qo(e, a), gn("invalid", e);
          break;
        case "textarea":
          Xf(e, a), s = qf(e, a), gn("invalid", e);
          break;
        default:
          s = a;
      }
      switch (cc(t, s), OT(t, e, i, s, u), t) {
        case "input":
          Za(e), N(e, a, !1);
          break;
        case "textarea":
          Za(e), nv(e);
          break;
        case "option":
          tn(e, a);
          break;
        case "select":
          Wf(e, a);
          break;
        default:
          typeof s.onClick == "function" && xh(e);
          break;
      }
    }
    function UT(e, t, a, i, u) {
      Ch(t, i);
      var s = null, f, p;
      switch (t) {
        case "input":
          f = no(e, a), p = no(e, i), s = [];
          break;
        case "select":
          f = qo(e, a), p = qo(e, i), s = [];
          break;
        case "textarea":
          f = qf(e, a), p = qf(e, i), s = [];
          break;
        default:
          f = a, p = i, typeof f.onClick != "function" && typeof p.onClick == "function" && xh(e);
          break;
      }
      cc(t, p);
      var v, y, g = null;
      for (v in f)
        if (!(p.hasOwnProperty(v) || !f.hasOwnProperty(v) || f[v] == null))
          if (v === Bs) {
            var b = f[v];
            for (y in b)
              b.hasOwnProperty(y) && (g || (g = {}), g[y] = "");
          } else v === tp || v === Vs || v === Sh || v === _o || v === OE || (Xe.hasOwnProperty(v) ? s || (s = []) : (s = s || []).push(v, null));
      for (v in p) {
        var w = p[v], M = f != null ? f[v] : void 0;
        if (!(!p.hasOwnProperty(v) || w === M || w == null && M == null))
          if (v === Bs)
            if (w && Object.freeze(w), M) {
              for (y in M)
                M.hasOwnProperty(y) && (!w || !w.hasOwnProperty(y)) && (g || (g = {}), g[y] = "");
              for (y in w)
                w.hasOwnProperty(y) && M[y] !== w[y] && (g || (g = {}), g[y] = w[y]);
            } else
              g || (s || (s = []), s.push(v, g)), g = w;
          else if (v === tp) {
            var A = w ? w[Eh] : void 0, j = M ? M[Eh] : void 0;
            A != null && j !== A && (s = s || []).push(v, A);
          } else v === Vs ? (typeof w == "string" || typeof w == "number") && (s = s || []).push(v, "" + w) : v === Sh || v === _o || (Xe.hasOwnProperty(v) ? (w != null && (typeof w != "function" && Rh(v, w), v === "onScroll" && gn("scroll", e)), !s && M !== w && (s = [])) : (s = s || []).push(v, w));
      }
      return g && (Jm(g, p[Bs]), (s = s || []).push(Bs, g)), s;
    }
    function AT(e, t, a, i, u) {
      a === "input" && u.type === "radio" && u.name != null && h(e, u);
      var s = Rl(a, i), f = Rl(a, u);
      switch (LT(e, t, s, f), a) {
        case "input":
          C(e, u);
          break;
        case "textarea":
          tv(e, u);
          break;
        case "select":
          uc(e, u);
          break;
      }
    }
    function FT(e) {
      {
        var t = e.toLowerCase();
        return es.hasOwnProperty(t) && es[t] || null;
      }
    }
    function jT(e, t, a, i, u, s, f) {
      var p, v;
      switch (p = Rl(t, a), Ch(t, a), t) {
        case "dialog":
          gn("cancel", e), gn("close", e);
          break;
        case "iframe":
        case "object":
        case "embed":
          gn("load", e);
          break;
        case "video":
        case "audio":
          for (var y = 0; y < Zd.length; y++)
            gn(Zd[y], e);
          break;
        case "source":
          gn("error", e);
          break;
        case "img":
        case "image":
        case "link":
          gn("error", e), gn("load", e);
          break;
        case "details":
          gn("toggle", e);
          break;
        case "input":
          Ja(e, a), gn("invalid", e);
          break;
        case "option":
          wt(e, a);
          break;
        case "select":
          uu(e, a), gn("invalid", e);
          break;
        case "textarea":
          Xf(e, a), gn("invalid", e);
          break;
      }
      cc(t, a);
      {
        v = /* @__PURE__ */ new Set();
        for (var g = e.attributes, b = 0; b < g.length; b++) {
          var w = g[b].name.toLowerCase();
          switch (w) {
            case "value":
              break;
            case "checked":
              break;
            case "selected":
              break;
            default:
              v.add(g[b].name);
          }
        }
      }
      var M = null;
      for (var A in a)
        if (a.hasOwnProperty(A)) {
          var j = a[A];
          if (A === Vs)
            typeof j == "string" ? e.textContent !== j && (a[_o] !== !0 && wh(e.textContent, j, s, f), M = [Vs, j]) : typeof j == "number" && e.textContent !== "" + j && (a[_o] !== !0 && wh(e.textContent, j, s, f), M = [Vs, "" + j]);
          else if (Xe.hasOwnProperty(A))
            j != null && (typeof j != "function" && Rh(A, j), A === "onScroll" && gn("scroll", e));
          else if (f && // Convince Flow we've calculated it (it's DEV-only in this method.)
          typeof p == "boolean") {
            var le = void 0, Le = Jt(A);
            if (a[_o] !== !0) {
              if (!(A === Sh || A === _o || // Controlled attributes are not validated
              // TODO: Only ignore them on controlled tags.
              A === "value" || A === "checked" || A === "selected")) {
                if (A === tp) {
                  var we = e.innerHTML, Et = j ? j[Eh] : void 0;
                  if (Et != null) {
                    var vt = NE(e, Et);
                    vt !== we && np(A, we, vt);
                  }
                } else if (A === Bs) {
                  if (v.delete(A), ME) {
                    var k = Km(j);
                    le = e.getAttribute("style"), k !== le && np(A, le, k);
                  }
                } else if (p && !_)
                  v.delete(A.toLowerCase()), le = eu(e, A, j), j !== le && np(A, le, j);
                else if (!pn(A, Le, p) && !qn(A, j, Le, p)) {
                  var H = !1;
                  if (Le !== null)
                    v.delete(Le.attributeName), le = pl(e, A, j, Le);
                  else {
                    var O = i;
                    if (O === Bi && (O = Jf(t)), O === Bi)
                      v.delete(A.toLowerCase());
                    else {
                      var q = FT(A);
                      q !== null && q !== A && (H = !0, v.delete(q)), v.delete(A);
                    }
                    le = eu(e, A, j);
                  }
                  var fe = _;
                  !fe && j !== le && !H && np(A, le, j);
                }
              }
            }
          }
        }
      switch (f && // $FlowFixMe - Should be inferred as not undefined.
      v.size > 0 && a[_o] !== !0 && LE(v), t) {
        case "input":
          Za(e), N(e, a, !0);
          break;
        case "textarea":
          Za(e), nv(e);
          break;
        case "select":
        case "option":
          break;
        default:
          typeof a.onClick == "function" && xh(e);
          break;
      }
      return M;
    }
    function HT(e, t, a) {
      var i = e.nodeValue !== t;
      return i;
    }
    function _y(e, t) {
      {
        if (Fa)
          return;
        Fa = !0, S("Did not expect server HTML to contain a <%s> in <%s>.", t.nodeName.toLowerCase(), e.nodeName.toLowerCase());
      }
    }
    function Dy(e, t) {
      {
        if (Fa)
          return;
        Fa = !0, S('Did not expect server HTML to contain the text node "%s" in <%s>.', t.nodeValue, e.nodeName.toLowerCase());
      }
    }
    function ky(e, t, a) {
      {
        if (Fa)
          return;
        Fa = !0, S("Expected server HTML to contain a matching <%s> in <%s>.", t, e.nodeName.toLowerCase());
      }
    }
    function Oy(e, t) {
      {
        if (t === "" || Fa)
          return;
        Fa = !0, S('Expected server HTML to contain a matching text node for "%s" in <%s>.', t, e.nodeName.toLowerCase());
      }
    }
    function PT(e, t, a) {
      switch (t) {
        case "input":
          F(e, a);
          return;
        case "textarea":
          Wm(e, a);
          return;
        case "select":
          Gf(e, a);
          return;
      }
    }
    var rp = function() {
    }, ap = function() {
    };
    {
      var VT = ["address", "applet", "area", "article", "aside", "base", "basefont", "bgsound", "blockquote", "body", "br", "button", "caption", "center", "col", "colgroup", "dd", "details", "dir", "div", "dl", "dt", "embed", "fieldset", "figcaption", "figure", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "iframe", "img", "input", "isindex", "li", "link", "listing", "main", "marquee", "menu", "menuitem", "meta", "nav", "noembed", "noframes", "noscript", "object", "ol", "p", "param", "plaintext", "pre", "script", "section", "select", "source", "style", "summary", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "title", "tr", "track", "ul", "wbr", "xmp"], UE = [
        "applet",
        "caption",
        "html",
        "table",
        "td",
        "th",
        "marquee",
        "object",
        "template",
        // https://html.spec.whatwg.org/multipage/syntax.html#html-integration-point
        // TODO: Distinguish by namespace here -- for <title>, including it here
        // errs on the side of fewer warnings
        "foreignObject",
        "desc",
        "title"
      ], BT = UE.concat(["button"]), $T = ["dd", "dt", "li", "option", "optgroup", "p", "rp", "rt"], AE = {
        current: null,
        formTag: null,
        aTagInScope: null,
        buttonTagInScope: null,
        nobrTagInScope: null,
        pTagInButtonScope: null,
        listItemTagAutoclosing: null,
        dlItemTagAutoclosing: null
      };
      ap = function(e, t) {
        var a = Ke({}, e || AE), i = {
          tag: t
        };
        return UE.indexOf(t) !== -1 && (a.aTagInScope = null, a.buttonTagInScope = null, a.nobrTagInScope = null), BT.indexOf(t) !== -1 && (a.pTagInButtonScope = null), VT.indexOf(t) !== -1 && t !== "address" && t !== "div" && t !== "p" && (a.listItemTagAutoclosing = null, a.dlItemTagAutoclosing = null), a.current = i, t === "form" && (a.formTag = i), t === "a" && (a.aTagInScope = i), t === "button" && (a.buttonTagInScope = i), t === "nobr" && (a.nobrTagInScope = i), t === "p" && (a.pTagInButtonScope = i), t === "li" && (a.listItemTagAutoclosing = i), (t === "dd" || t === "dt") && (a.dlItemTagAutoclosing = i), a;
      };
      var YT = function(e, t) {
        switch (t) {
          case "select":
            return e === "option" || e === "optgroup" || e === "#text";
          case "optgroup":
            return e === "option" || e === "#text";
          case "option":
            return e === "#text";
          case "tr":
            return e === "th" || e === "td" || e === "style" || e === "script" || e === "template";
          case "tbody":
          case "thead":
          case "tfoot":
            return e === "tr" || e === "style" || e === "script" || e === "template";
          case "colgroup":
            return e === "col" || e === "template";
          case "table":
            return e === "caption" || e === "colgroup" || e === "tbody" || e === "tfoot" || e === "thead" || e === "style" || e === "script" || e === "template";
          case "head":
            return e === "base" || e === "basefont" || e === "bgsound" || e === "link" || e === "meta" || e === "title" || e === "noscript" || e === "noframes" || e === "style" || e === "script" || e === "template";
          case "html":
            return e === "head" || e === "body" || e === "frameset";
          case "frameset":
            return e === "frame";
          case "#document":
            return e === "html";
        }
        switch (e) {
          case "h1":
          case "h2":
          case "h3":
          case "h4":
          case "h5":
          case "h6":
            return t !== "h1" && t !== "h2" && t !== "h3" && t !== "h4" && t !== "h5" && t !== "h6";
          case "rp":
          case "rt":
            return $T.indexOf(t) === -1;
          case "body":
          case "caption":
          case "col":
          case "colgroup":
          case "frameset":
          case "frame":
          case "head":
          case "html":
          case "tbody":
          case "td":
          case "tfoot":
          case "th":
          case "thead":
          case "tr":
            return t == null;
        }
        return !0;
      }, IT = function(e, t) {
        switch (e) {
          case "address":
          case "article":
          case "aside":
          case "blockquote":
          case "center":
          case "details":
          case "dialog":
          case "dir":
          case "div":
          case "dl":
          case "fieldset":
          case "figcaption":
          case "figure":
          case "footer":
          case "header":
          case "hgroup":
          case "main":
          case "menu":
          case "nav":
          case "ol":
          case "p":
          case "section":
          case "summary":
          case "ul":
          case "pre":
          case "listing":
          case "table":
          case "hr":
          case "xmp":
          case "h1":
          case "h2":
          case "h3":
          case "h4":
          case "h5":
          case "h6":
            return t.pTagInButtonScope;
          case "form":
            return t.formTag || t.pTagInButtonScope;
          case "li":
            return t.listItemTagAutoclosing;
          case "dd":
          case "dt":
            return t.dlItemTagAutoclosing;
          case "button":
            return t.buttonTagInScope;
          case "a":
            return t.aTagInScope;
          case "nobr":
            return t.nobrTagInScope;
        }
        return null;
      }, FE = {};
      rp = function(e, t, a) {
        a = a || AE;
        var i = a.current, u = i && i.tag;
        t != null && (e != null && S("validateDOMNesting: when childText is passed, childTag should be null"), e = "#text");
        var s = YT(e, u) ? null : i, f = s ? null : IT(e, a), p = s || f;
        if (p) {
          var v = p.tag, y = !!s + "|" + e + "|" + v;
          if (!FE[y]) {
            FE[y] = !0;
            var g = e, b = "";
            if (e === "#text" ? /\S/.test(t) ? g = "Text nodes" : (g = "Whitespace text nodes", b = " Make sure you don't have any extra whitespace between tags on each line of your source code.") : g = "<" + e + ">", s) {
              var w = "";
              v === "table" && e === "tr" && (w += " Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser."), S("validateDOMNesting(...): %s cannot appear as a child of <%s>.%s%s", g, v, b, w);
            } else
              S("validateDOMNesting(...): %s cannot appear as a descendant of <%s>.", g, v);
          }
        }
      };
    }
    var bh = "suppressHydrationWarning", _h = "$", Dh = "/$", ip = "$?", lp = "$!", QT = "style", Ly = null, My = null;
    function WT(e) {
      var t, a, i = e.nodeType;
      switch (i) {
        case Yi:
        case td: {
          t = i === Yi ? "#document" : "#fragment";
          var u = e.documentElement;
          a = u ? u.namespaceURI : ed(null, "");
          break;
        }
        default: {
          var s = i === Ln ? e.parentNode : e, f = s.namespaceURI || null;
          t = s.tagName, a = ed(f, t);
          break;
        }
      }
      {
        var p = t.toLowerCase(), v = ap(null, p);
        return {
          namespace: a,
          ancestorInfo: v
        };
      }
    }
    function GT(e, t, a) {
      {
        var i = e, u = ed(i.namespace, t), s = ap(i.ancestorInfo, t);
        return {
          namespace: u,
          ancestorInfo: s
        };
      }
    }
    function aD(e) {
      return e;
    }
    function qT(e) {
      Ly = Fn(), My = sT();
      var t = null;
      return Qn(!1), t;
    }
    function XT(e) {
      cT(My), Qn(Ly), Ly = null, My = null;
    }
    function KT(e, t, a, i, u) {
      var s;
      {
        var f = i;
        if (rp(e, null, f.ancestorInfo), typeof t.children == "string" || typeof t.children == "number") {
          var p = "" + t.children, v = ap(f.ancestorInfo, e);
          rp(null, p, v);
        }
        s = f.namespace;
      }
      var y = MT(e, t, a, s);
      return sp(u, y), Py(y, t), y;
    }
    function ZT(e, t) {
      e.appendChild(t);
    }
    function JT(e, t, a, i, u) {
      switch (zT(e, t, a, i), t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          return !!a.autoFocus;
        case "img":
          return !0;
        default:
          return !1;
      }
    }
    function e1(e, t, a, i, u, s) {
      {
        var f = s;
        if (typeof i.children != typeof a.children && (typeof i.children == "string" || typeof i.children == "number")) {
          var p = "" + i.children, v = ap(f.ancestorInfo, t);
          rp(null, p, v);
        }
      }
      return UT(e, t, a, i);
    }
    function Ny(e, t) {
      return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
    }
    function t1(e, t, a, i) {
      {
        var u = a;
        rp(null, e, u.ancestorInfo);
      }
      var s = NT(e, t);
      return sp(i, s), s;
    }
    function n1() {
      var e = window.event;
      return e === void 0 ? Na : rf(e.type);
    }
    var zy = typeof setTimeout == "function" ? setTimeout : void 0, r1 = typeof clearTimeout == "function" ? clearTimeout : void 0, Uy = -1, jE = typeof Promise == "function" ? Promise : void 0, a1 = typeof queueMicrotask == "function" ? queueMicrotask : typeof jE < "u" ? function(e) {
      return jE.resolve(null).then(e).catch(i1);
    } : zy;
    function i1(e) {
      setTimeout(function() {
        throw e;
      });
    }
    function l1(e, t, a, i) {
      switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          a.autoFocus && e.focus();
          return;
        case "img": {
          a.src && (e.src = a.src);
          return;
        }
      }
    }
    function u1(e, t, a, i, u, s) {
      AT(e, t, a, i, u), Py(e, u);
    }
    function HE(e) {
      ro(e, "");
    }
    function o1(e, t, a) {
      e.nodeValue = a;
    }
    function s1(e, t) {
      e.appendChild(t);
    }
    function c1(e, t) {
      var a;
      e.nodeType === Ln ? (a = e.parentNode, a.insertBefore(t, e)) : (a = e, a.appendChild(t));
      var i = e._reactRootContainer;
      i == null && a.onclick === null && xh(a);
    }
    function f1(e, t, a) {
      e.insertBefore(t, a);
    }
    function d1(e, t, a) {
      e.nodeType === Ln ? e.parentNode.insertBefore(t, a) : e.insertBefore(t, a);
    }
    function p1(e, t) {
      e.removeChild(t);
    }
    function v1(e, t) {
      e.nodeType === Ln ? e.parentNode.removeChild(t) : e.removeChild(t);
    }
    function Ay(e, t) {
      var a = t, i = 0;
      do {
        var u = a.nextSibling;
        if (e.removeChild(a), u && u.nodeType === Ln) {
          var s = u.data;
          if (s === Dh)
            if (i === 0) {
              e.removeChild(u), Du(t);
              return;
            } else
              i--;
          else (s === _h || s === ip || s === lp) && i++;
        }
        a = u;
      } while (a);
      Du(t);
    }
    function h1(e, t) {
      e.nodeType === Ln ? Ay(e.parentNode, t) : e.nodeType === Ir && Ay(e, t), Du(e);
    }
    function m1(e) {
      e = e;
      var t = e.style;
      typeof t.setProperty == "function" ? t.setProperty("display", "none", "important") : t.display = "none";
    }
    function y1(e) {
      e.nodeValue = "";
    }
    function g1(e, t) {
      e = e;
      var a = t[QT], i = a != null && a.hasOwnProperty("display") ? a.display : null;
      e.style.display = sc("display", i);
    }
    function S1(e, t) {
      e.nodeValue = t;
    }
    function E1(e) {
      e.nodeType === Ir ? e.textContent = "" : e.nodeType === Yi && e.documentElement && e.removeChild(e.documentElement);
    }
    function C1(e, t, a) {
      return e.nodeType !== Ir || t.toLowerCase() !== e.nodeName.toLowerCase() ? null : e;
    }
    function R1(e, t) {
      return t === "" || e.nodeType !== $i ? null : e;
    }
    function T1(e) {
      return e.nodeType !== Ln ? null : e;
    }
    function PE(e) {
      return e.data === ip;
    }
    function Fy(e) {
      return e.data === lp;
    }
    function w1(e) {
      var t = e.nextSibling && e.nextSibling.dataset, a, i, u;
      return t && (a = t.dgst, i = t.msg, u = t.stck), {
        message: i,
        digest: a,
        stack: u
      };
    }
    function x1(e, t) {
      e._reactRetry = t;
    }
    function kh(e) {
      for (; e != null; e = e.nextSibling) {
        var t = e.nodeType;
        if (t === Ir || t === $i)
          break;
        if (t === Ln) {
          var a = e.data;
          if (a === _h || a === lp || a === ip)
            break;
          if (a === Dh)
            return null;
        }
      }
      return e;
    }
    function up(e) {
      return kh(e.nextSibling);
    }
    function b1(e) {
      return kh(e.firstChild);
    }
    function _1(e) {
      return kh(e.firstChild);
    }
    function D1(e) {
      return kh(e.nextSibling);
    }
    function k1(e, t, a, i, u, s, f) {
      sp(s, e), Py(e, a);
      var p;
      {
        var v = u;
        p = v.namespace;
      }
      var y = (s.mode & it) !== De;
      return jT(e, t, a, p, i, y, f);
    }
    function O1(e, t, a, i) {
      return sp(a, e), a.mode & it, HT(e, t);
    }
    function L1(e, t) {
      sp(t, e);
    }
    function M1(e) {
      for (var t = e.nextSibling, a = 0; t; ) {
        if (t.nodeType === Ln) {
          var i = t.data;
          if (i === Dh) {
            if (a === 0)
              return up(t);
            a--;
          } else (i === _h || i === lp || i === ip) && a++;
        }
        t = t.nextSibling;
      }
      return null;
    }
    function VE(e) {
      for (var t = e.previousSibling, a = 0; t; ) {
        if (t.nodeType === Ln) {
          var i = t.data;
          if (i === _h || i === lp || i === ip) {
            if (a === 0)
              return t;
            a--;
          } else i === Dh && a++;
        }
        t = t.previousSibling;
      }
      return null;
    }
    function N1(e) {
      Du(e);
    }
    function z1(e) {
      Du(e);
    }
    function U1(e) {
      return e !== "head" && e !== "body";
    }
    function A1(e, t, a, i) {
      var u = !0;
      wh(t.nodeValue, a, i, u);
    }
    function F1(e, t, a, i, u, s) {
      if (t[bh] !== !0) {
        var f = !0;
        wh(i.nodeValue, u, s, f);
      }
    }
    function j1(e, t) {
      t.nodeType === Ir ? _y(e, t) : t.nodeType === Ln || Dy(e, t);
    }
    function H1(e, t) {
      {
        var a = e.parentNode;
        a !== null && (t.nodeType === Ir ? _y(a, t) : t.nodeType === Ln || Dy(a, t));
      }
    }
    function P1(e, t, a, i, u) {
      (u || t[bh] !== !0) && (i.nodeType === Ir ? _y(a, i) : i.nodeType === Ln || Dy(a, i));
    }
    function V1(e, t, a) {
      ky(e, t);
    }
    function B1(e, t) {
      Oy(e, t);
    }
    function $1(e, t, a) {
      {
        var i = e.parentNode;
        i !== null && ky(i, t);
      }
    }
    function Y1(e, t) {
      {
        var a = e.parentNode;
        a !== null && Oy(a, t);
      }
    }
    function I1(e, t, a, i, u, s) {
      (s || t[bh] !== !0) && ky(a, i);
    }
    function Q1(e, t, a, i, u) {
      (u || t[bh] !== !0) && Oy(a, i);
    }
    function W1(e) {
      S("An error occurred during hydration. The server HTML was replaced with client content in <%s>.", e.nodeName.toLowerCase());
    }
    function G1(e) {
      Jd(e);
    }
    var gf = Math.random().toString(36).slice(2), Sf = "__reactFiber$" + gf, jy = "__reactProps$" + gf, op = "__reactContainer$" + gf, Hy = "__reactEvents$" + gf, q1 = "__reactListeners$" + gf, X1 = "__reactHandles$" + gf;
    function K1(e) {
      delete e[Sf], delete e[jy], delete e[Hy], delete e[q1], delete e[X1];
    }
    function sp(e, t) {
      t[Sf] = e;
    }
    function Oh(e, t) {
      t[op] = e;
    }
    function BE(e) {
      e[op] = null;
    }
    function cp(e) {
      return !!e[op];
    }
    function $s(e) {
      var t = e[Sf];
      if (t)
        return t;
      for (var a = e.parentNode; a; ) {
        if (t = a[op] || a[Sf], t) {
          var i = t.alternate;
          if (t.child !== null || i !== null && i.child !== null)
            for (var u = VE(e); u !== null; ) {
              var s = u[Sf];
              if (s)
                return s;
              u = VE(u);
            }
          return t;
        }
        e = a, a = e.parentNode;
      }
      return null;
    }
    function Do(e) {
      var t = e[Sf] || e[op];
      return t && (t.tag === ue || t.tag === Ye || t.tag === be || t.tag === ee) ? t : null;
    }
    function Ef(e) {
      if (e.tag === ue || e.tag === Ye)
        return e.stateNode;
      throw new Error("getNodeFromInstance: Invalid argument.");
    }
    function Lh(e) {
      return e[jy] || null;
    }
    function Py(e, t) {
      e[jy] = t;
    }
    function Z1(e) {
      var t = e[Hy];
      return t === void 0 && (t = e[Hy] = /* @__PURE__ */ new Set()), t;
    }
    var $E = {}, YE = z.ReactDebugCurrentFrame;
    function Mh(e) {
      if (e) {
        var t = e._owner, a = Hi(e.type, e._source, t ? t.type : null);
        YE.setExtraStackFrame(a);
      } else
        YE.setExtraStackFrame(null);
    }
    function tl(e, t, a, i, u) {
      {
        var s = Function.call.bind(wr);
        for (var f in e)
          if (s(e, f)) {
            var p = void 0;
            try {
              if (typeof e[f] != "function") {
                var v = Error((i || "React class") + ": " + a + " type `" + f + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[f] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw v.name = "Invariant Violation", v;
              }
              p = e[f](t, f, i, a, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (y) {
              p = y;
            }
            p && !(p instanceof Error) && (Mh(u), S("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", i || "React class", a, f, typeof p), Mh(null)), p instanceof Error && !(p.message in $E) && ($E[p.message] = !0, Mh(u), S("Failed %s type: %s", a, p.message), Mh(null));
          }
      }
    }
    var Vy = [], Nh;
    Nh = [];
    var zu = -1;
    function ko(e) {
      return {
        current: e
      };
    }
    function na(e, t) {
      if (zu < 0) {
        S("Unexpected pop.");
        return;
      }
      t !== Nh[zu] && S("Unexpected Fiber popped."), e.current = Vy[zu], Vy[zu] = null, Nh[zu] = null, zu--;
    }
    function ra(e, t, a) {
      zu++, Vy[zu] = e.current, Nh[zu] = a, e.current = t;
    }
    var By;
    By = {};
    var li = {};
    Object.freeze(li);
    var Uu = ko(li), Bl = ko(!1), $y = li;
    function Cf(e, t, a) {
      return a && $l(t) ? $y : Uu.current;
    }
    function IE(e, t, a) {
      {
        var i = e.stateNode;
        i.__reactInternalMemoizedUnmaskedChildContext = t, i.__reactInternalMemoizedMaskedChildContext = a;
      }
    }
    function Rf(e, t) {
      {
        var a = e.type, i = a.contextTypes;
        if (!i)
          return li;
        var u = e.stateNode;
        if (u && u.__reactInternalMemoizedUnmaskedChildContext === t)
          return u.__reactInternalMemoizedMaskedChildContext;
        var s = {};
        for (var f in i)
          s[f] = t[f];
        {
          var p = Ve(e) || "Unknown";
          tl(i, s, "context", p);
        }
        return u && IE(e, t, s), s;
      }
    }
    function zh() {
      return Bl.current;
    }
    function $l(e) {
      {
        var t = e.childContextTypes;
        return t != null;
      }
    }
    function Uh(e) {
      na(Bl, e), na(Uu, e);
    }
    function Yy(e) {
      na(Bl, e), na(Uu, e);
    }
    function QE(e, t, a) {
      {
        if (Uu.current !== li)
          throw new Error("Unexpected context found on stack. This error is likely caused by a bug in React. Please file an issue.");
        ra(Uu, t, e), ra(Bl, a, e);
      }
    }
    function WE(e, t, a) {
      {
        var i = e.stateNode, u = t.childContextTypes;
        if (typeof i.getChildContext != "function") {
          {
            var s = Ve(e) || "Unknown";
            By[s] || (By[s] = !0, S("%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.", s, s));
          }
          return a;
        }
        var f = i.getChildContext();
        for (var p in f)
          if (!(p in u))
            throw new Error((Ve(e) || "Unknown") + '.getChildContext(): key "' + p + '" is not defined in childContextTypes.');
        {
          var v = Ve(e) || "Unknown";
          tl(u, f, "child context", v);
        }
        return Ke({}, a, f);
      }
    }
    function Ah(e) {
      {
        var t = e.stateNode, a = t && t.__reactInternalMemoizedMergedChildContext || li;
        return $y = Uu.current, ra(Uu, a, e), ra(Bl, Bl.current, e), !0;
      }
    }
    function GE(e, t, a) {
      {
        var i = e.stateNode;
        if (!i)
          throw new Error("Expected to have an instance by this point. This error is likely caused by a bug in React. Please file an issue.");
        if (a) {
          var u = WE(e, t, $y);
          i.__reactInternalMemoizedMergedChildContext = u, na(Bl, e), na(Uu, e), ra(Uu, u, e), ra(Bl, a, e);
        } else
          na(Bl, e), ra(Bl, a, e);
      }
    }
    function J1(e) {
      {
        if (!vu(e) || e.tag !== ve)
          throw new Error("Expected subtree parent to be a mounted class component. This error is likely caused by a bug in React. Please file an issue.");
        var t = e;
        do {
          switch (t.tag) {
            case ee:
              return t.stateNode.context;
            case ve: {
              var a = t.type;
              if ($l(a))
                return t.stateNode.__reactInternalMemoizedMergedChildContext;
              break;
            }
          }
          t = t.return;
        } while (t !== null);
        throw new Error("Found unexpected detached subtree parent. This error is likely caused by a bug in React. Please file an issue.");
      }
    }
    var Oo = 0, Fh = 1, Au = null, Iy = !1, Qy = !1;
    function qE(e) {
      Au === null ? Au = [e] : Au.push(e);
    }
    function ew(e) {
      Iy = !0, qE(e);
    }
    function XE() {
      Iy && Lo();
    }
    function Lo() {
      if (!Qy && Au !== null) {
        Qy = !0;
        var e = 0, t = Ua();
        try {
          var a = !0, i = Au;
          for (An(Or); e < i.length; e++) {
            var u = i[e];
            do
              u = u(a);
            while (u !== null);
          }
          Au = null, Iy = !1;
        } catch (s) {
          throw Au !== null && (Au = Au.slice(e + 1)), pd(os, Lo), s;
        } finally {
          An(t), Qy = !1;
        }
      }
      return null;
    }
    var Tf = [], wf = 0, jh = null, Hh = 0, Li = [], Mi = 0, Ys = null, Fu = 1, ju = "";
    function tw(e) {
      return Qs(), (e.flags & Ci) !== _e;
    }
    function nw(e) {
      return Qs(), Hh;
    }
    function rw() {
      var e = ju, t = Fu, a = t & ~aw(t);
      return a.toString(32) + e;
    }
    function Is(e, t) {
      Qs(), Tf[wf++] = Hh, Tf[wf++] = jh, jh = e, Hh = t;
    }
    function KE(e, t, a) {
      Qs(), Li[Mi++] = Fu, Li[Mi++] = ju, Li[Mi++] = Ys, Ys = e;
      var i = Fu, u = ju, s = Ph(i) - 1, f = i & ~(1 << s), p = a + 1, v = Ph(t) + s;
      if (v > 30) {
        var y = s - s % 5, g = (1 << y) - 1, b = (f & g).toString(32), w = f >> y, M = s - y, A = Ph(t) + M, j = p << M, le = j | w, Le = b + u;
        Fu = 1 << A | le, ju = Le;
      } else {
        var we = p << s, Et = we | f, vt = u;
        Fu = 1 << v | Et, ju = vt;
      }
    }
    function Wy(e) {
      Qs();
      var t = e.return;
      if (t !== null) {
        var a = 1, i = 0;
        Is(e, a), KE(e, a, i);
      }
    }
    function Ph(e) {
      return 32 - zn(e);
    }
    function aw(e) {
      return 1 << Ph(e) - 1;
    }
    function Gy(e) {
      for (; e === jh; )
        jh = Tf[--wf], Tf[wf] = null, Hh = Tf[--wf], Tf[wf] = null;
      for (; e === Ys; )
        Ys = Li[--Mi], Li[Mi] = null, ju = Li[--Mi], Li[Mi] = null, Fu = Li[--Mi], Li[Mi] = null;
    }
    function iw() {
      return Qs(), Ys !== null ? {
        id: Fu,
        overflow: ju
      } : null;
    }
    function lw(e, t) {
      Qs(), Li[Mi++] = Fu, Li[Mi++] = ju, Li[Mi++] = Ys, Fu = t.id, ju = t.overflow, Ys = e;
    }
    function Qs() {
      Ur() || S("Expected to be hydrating. This is a bug in React. Please file an issue.");
    }
    var zr = null, Ni = null, nl = !1, Ws = !1, Mo = null;
    function uw() {
      nl && S("We should not be hydrating here. This is a bug in React. Please file a bug.");
    }
    function ZE() {
      Ws = !0;
    }
    function ow() {
      return Ws;
    }
    function sw(e) {
      var t = e.stateNode.containerInfo;
      return Ni = _1(t), zr = e, nl = !0, Mo = null, Ws = !1, !0;
    }
    function cw(e, t, a) {
      return Ni = D1(t), zr = e, nl = !0, Mo = null, Ws = !1, a !== null && lw(e, a), !0;
    }
    function JE(e, t) {
      switch (e.tag) {
        case ee: {
          j1(e.stateNode.containerInfo, t);
          break;
        }
        case ue: {
          var a = (e.mode & it) !== De;
          P1(
            e.type,
            e.memoizedProps,
            e.stateNode,
            t,
            // TODO: Delete this argument when we remove the legacy root API.
            a
          );
          break;
        }
        case be: {
          var i = e.memoizedState;
          i.dehydrated !== null && H1(i.dehydrated, t);
          break;
        }
      }
    }
    function eC(e, t) {
      JE(e, t);
      var a = v_();
      a.stateNode = t, a.return = e;
      var i = e.deletions;
      i === null ? (e.deletions = [a], e.flags |= Da) : i.push(a);
    }
    function qy(e, t) {
      {
        if (Ws)
          return;
        switch (e.tag) {
          case ee: {
            var a = e.stateNode.containerInfo;
            switch (t.tag) {
              case ue:
                var i = t.type;
                t.pendingProps, V1(a, i);
                break;
              case Ye:
                var u = t.pendingProps;
                B1(a, u);
                break;
            }
            break;
          }
          case ue: {
            var s = e.type, f = e.memoizedProps, p = e.stateNode;
            switch (t.tag) {
              case ue: {
                var v = t.type, y = t.pendingProps, g = (e.mode & it) !== De;
                I1(
                  s,
                  f,
                  p,
                  v,
                  y,
                  // TODO: Delete this argument when we remove the legacy root API.
                  g
                );
                break;
              }
              case Ye: {
                var b = t.pendingProps, w = (e.mode & it) !== De;
                Q1(
                  s,
                  f,
                  p,
                  b,
                  // TODO: Delete this argument when we remove the legacy root API.
                  w
                );
                break;
              }
            }
            break;
          }
          case be: {
            var M = e.memoizedState, A = M.dehydrated;
            if (A !== null) switch (t.tag) {
              case ue:
                var j = t.type;
                t.pendingProps, $1(A, j);
                break;
              case Ye:
                var le = t.pendingProps;
                Y1(A, le);
                break;
            }
            break;
          }
          default:
            return;
        }
      }
    }
    function tC(e, t) {
      t.flags = t.flags & ~Wr | hn, qy(e, t);
    }
    function nC(e, t) {
      switch (e.tag) {
        case ue: {
          var a = e.type;
          e.pendingProps;
          var i = C1(t, a);
          return i !== null ? (e.stateNode = i, zr = e, Ni = b1(i), !0) : !1;
        }
        case Ye: {
          var u = e.pendingProps, s = R1(t, u);
          return s !== null ? (e.stateNode = s, zr = e, Ni = null, !0) : !1;
        }
        case be: {
          var f = T1(t);
          if (f !== null) {
            var p = {
              dehydrated: f,
              treeContext: iw(),
              retryLane: Kr
            };
            e.memoizedState = p;
            var v = h_(f);
            return v.return = e, e.child = v, zr = e, Ni = null, !0;
          }
          return !1;
        }
        default:
          return !1;
      }
    }
    function Xy(e) {
      return (e.mode & it) !== De && (e.flags & xe) === _e;
    }
    function Ky(e) {
      throw new Error("Hydration failed because the initial UI does not match what was rendered on the server.");
    }
    function Zy(e) {
      if (nl) {
        var t = Ni;
        if (!t) {
          Xy(e) && (qy(zr, e), Ky()), tC(zr, e), nl = !1, zr = e;
          return;
        }
        var a = t;
        if (!nC(e, t)) {
          Xy(e) && (qy(zr, e), Ky()), t = up(a);
          var i = zr;
          if (!t || !nC(e, t)) {
            tC(zr, e), nl = !1, zr = e;
            return;
          }
          eC(i, a);
        }
      }
    }
    function fw(e, t, a) {
      var i = e.stateNode, u = !Ws, s = k1(i, e.type, e.memoizedProps, t, a, e, u);
      return e.updateQueue = s, s !== null;
    }
    function dw(e) {
      var t = e.stateNode, a = e.memoizedProps, i = O1(t, a, e);
      if (i) {
        var u = zr;
        if (u !== null)
          switch (u.tag) {
            case ee: {
              var s = u.stateNode.containerInfo, f = (u.mode & it) !== De;
              A1(
                s,
                t,
                a,
                // TODO: Delete this argument when we remove the legacy root API.
                f
              );
              break;
            }
            case ue: {
              var p = u.type, v = u.memoizedProps, y = u.stateNode, g = (u.mode & it) !== De;
              F1(
                p,
                v,
                y,
                t,
                a,
                // TODO: Delete this argument when we remove the legacy root API.
                g
              );
              break;
            }
          }
      }
      return i;
    }
    function pw(e) {
      var t = e.memoizedState, a = t !== null ? t.dehydrated : null;
      if (!a)
        throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
      L1(a, e);
    }
    function vw(e) {
      var t = e.memoizedState, a = t !== null ? t.dehydrated : null;
      if (!a)
        throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
      return M1(a);
    }
    function rC(e) {
      for (var t = e.return; t !== null && t.tag !== ue && t.tag !== ee && t.tag !== be; )
        t = t.return;
      zr = t;
    }
    function Vh(e) {
      if (e !== zr)
        return !1;
      if (!nl)
        return rC(e), nl = !0, !1;
      if (e.tag !== ee && (e.tag !== ue || U1(e.type) && !Ny(e.type, e.memoizedProps))) {
        var t = Ni;
        if (t)
          if (Xy(e))
            aC(e), Ky();
          else
            for (; t; )
              eC(e, t), t = up(t);
      }
      return rC(e), e.tag === be ? Ni = vw(e) : Ni = zr ? up(e.stateNode) : null, !0;
    }
    function hw() {
      return nl && Ni !== null;
    }
    function aC(e) {
      for (var t = Ni; t; )
        JE(e, t), t = up(t);
    }
    function xf() {
      zr = null, Ni = null, nl = !1, Ws = !1;
    }
    function iC() {
      Mo !== null && (Z0(Mo), Mo = null);
    }
    function Ur() {
      return nl;
    }
    function Jy(e) {
      Mo === null ? Mo = [e] : Mo.push(e);
    }
    var mw = z.ReactCurrentBatchConfig, yw = null;
    function gw() {
      return mw.transition;
    }
    var rl = {
      recordUnsafeLifecycleWarnings: function(e, t) {
      },
      flushPendingUnsafeLifecycleWarnings: function() {
      },
      recordLegacyContextWarning: function(e, t) {
      },
      flushLegacyContextWarning: function() {
      },
      discardPendingWarnings: function() {
      }
    };
    {
      var Sw = function(e) {
        for (var t = null, a = e; a !== null; )
          a.mode & Wt && (t = a), a = a.return;
        return t;
      }, Gs = function(e) {
        var t = [];
        return e.forEach(function(a) {
          t.push(a);
        }), t.sort().join(", ");
      }, fp = [], dp = [], pp = [], vp = [], hp = [], mp = [], qs = /* @__PURE__ */ new Set();
      rl.recordUnsafeLifecycleWarnings = function(e, t) {
        qs.has(e.type) || (typeof t.componentWillMount == "function" && // Don't warn about react-lifecycles-compat polyfilled components.
        t.componentWillMount.__suppressDeprecationWarning !== !0 && fp.push(e), e.mode & Wt && typeof t.UNSAFE_componentWillMount == "function" && dp.push(e), typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps.__suppressDeprecationWarning !== !0 && pp.push(e), e.mode & Wt && typeof t.UNSAFE_componentWillReceiveProps == "function" && vp.push(e), typeof t.componentWillUpdate == "function" && t.componentWillUpdate.__suppressDeprecationWarning !== !0 && hp.push(e), e.mode & Wt && typeof t.UNSAFE_componentWillUpdate == "function" && mp.push(e));
      }, rl.flushPendingUnsafeLifecycleWarnings = function() {
        var e = /* @__PURE__ */ new Set();
        fp.length > 0 && (fp.forEach(function(w) {
          e.add(Ve(w) || "Component"), qs.add(w.type);
        }), fp = []);
        var t = /* @__PURE__ */ new Set();
        dp.length > 0 && (dp.forEach(function(w) {
          t.add(Ve(w) || "Component"), qs.add(w.type);
        }), dp = []);
        var a = /* @__PURE__ */ new Set();
        pp.length > 0 && (pp.forEach(function(w) {
          a.add(Ve(w) || "Component"), qs.add(w.type);
        }), pp = []);
        var i = /* @__PURE__ */ new Set();
        vp.length > 0 && (vp.forEach(function(w) {
          i.add(Ve(w) || "Component"), qs.add(w.type);
        }), vp = []);
        var u = /* @__PURE__ */ new Set();
        hp.length > 0 && (hp.forEach(function(w) {
          u.add(Ve(w) || "Component"), qs.add(w.type);
        }), hp = []);
        var s = /* @__PURE__ */ new Set();
        if (mp.length > 0 && (mp.forEach(function(w) {
          s.add(Ve(w) || "Component"), qs.add(w.type);
        }), mp = []), t.size > 0) {
          var f = Gs(t);
          S(`Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.

Please update the following components: %s`, f);
        }
        if (i.size > 0) {
          var p = Gs(i);
          S(`Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state

Please update the following components: %s`, p);
        }
        if (s.size > 0) {
          var v = Gs(s);
          S(`Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.

Please update the following components: %s`, v);
        }
        if (e.size > 0) {
          var y = Gs(e);
          Rt(`componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.
* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, y);
        }
        if (a.size > 0) {
          var g = Gs(a);
          Rt(`componentWillReceiveProps has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state
* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, g);
        }
        if (u.size > 0) {
          var b = Gs(u);
          Rt(`componentWillUpdate has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, b);
        }
      };
      var Bh = /* @__PURE__ */ new Map(), lC = /* @__PURE__ */ new Set();
      rl.recordLegacyContextWarning = function(e, t) {
        var a = Sw(e);
        if (a === null) {
          S("Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue.");
          return;
        }
        if (!lC.has(e.type)) {
          var i = Bh.get(a);
          (e.type.contextTypes != null || e.type.childContextTypes != null || t !== null && typeof t.getChildContext == "function") && (i === void 0 && (i = [], Bh.set(a, i)), i.push(e));
        }
      }, rl.flushLegacyContextWarning = function() {
        Bh.forEach(function(e, t) {
          if (e.length !== 0) {
            var a = e[0], i = /* @__PURE__ */ new Set();
            e.forEach(function(s) {
              i.add(Ve(s) || "Component"), lC.add(s.type);
            });
            var u = Gs(i);
            try {
              Yt(a), S(`Legacy context API has been detected within a strict-mode tree.

The old API will be supported in all 16.x releases, but applications using it should migrate to the new version.

Please update the following components: %s

Learn more about this warning here: https://reactjs.org/link/legacy-context`, u);
            } finally {
              on();
            }
          }
        });
      }, rl.discardPendingWarnings = function() {
        fp = [], dp = [], pp = [], vp = [], hp = [], mp = [], Bh = /* @__PURE__ */ new Map();
      };
    }
    var eg, tg, ng, rg, ag, uC = function(e, t) {
    };
    eg = !1, tg = !1, ng = {}, rg = {}, ag = {}, uC = function(e, t) {
      if (!(e === null || typeof e != "object") && !(!e._store || e._store.validated || e.key != null)) {
        if (typeof e._store != "object")
          throw new Error("React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.");
        e._store.validated = !0;
        var a = Ve(t) || "Component";
        rg[a] || (rg[a] = !0, S('Each child in a list should have a unique "key" prop. See https://reactjs.org/link/warning-keys for more information.'));
      }
    };
    function Ew(e) {
      return e.prototype && e.prototype.isReactComponent;
    }
    function yp(e, t, a) {
      var i = a.ref;
      if (i !== null && typeof i != "function" && typeof i != "object") {
        if ((e.mode & Wt || P) && // We warn in ReactElement.js if owner and self are equal for string refs
        // because these cannot be automatically converted to an arrow function
        // using a codemod. Therefore, we don't have to warn about string refs again.
        !(a._owner && a._self && a._owner.stateNode !== a._self) && // Will already throw with "Function components cannot have string refs"
        !(a._owner && a._owner.tag !== ve) && // Will already warn with "Function components cannot be given refs"
        !(typeof a.type == "function" && !Ew(a.type)) && // Will already throw with "Element ref was specified as a string (someStringRef) but no owner was set"
        a._owner) {
          var u = Ve(e) || "Component";
          ng[u] || (S('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. We recommend using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', u, i), ng[u] = !0);
        }
        if (a._owner) {
          var s = a._owner, f;
          if (s) {
            var p = s;
            if (p.tag !== ve)
              throw new Error("Function components cannot have string refs. We recommend using useRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref");
            f = p.stateNode;
          }
          if (!f)
            throw new Error("Missing owner for string ref " + i + ". This error is likely caused by a bug in React. Please file an issue.");
          var v = f;
          si(i, "ref");
          var y = "" + i;
          if (t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === y)
            return t.ref;
          var g = function(b) {
            var w = v.refs;
            b === null ? delete w[y] : w[y] = b;
          };
          return g._stringRef = y, g;
        } else {
          if (typeof i != "string")
            throw new Error("Expected ref to be a function, a string, an object returned by React.createRef(), or null.");
          if (!a._owner)
            throw new Error("Element ref was specified as a string (" + i + `) but no owner was set. This could happen for one of the following reasons:
1. You may be adding a ref to a function component
2. You may be adding a ref to a component that was not created inside a component's render method
3. You have multiple copies of React loaded
See https://reactjs.org/link/refs-must-have-owner for more information.`);
        }
      }
      return i;
    }
    function $h(e, t) {
      var a = Object.prototype.toString.call(t);
      throw new Error("Objects are not valid as a React child (found: " + (a === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : a) + "). If you meant to render a collection of children, use an array instead.");
    }
    function Yh(e) {
      {
        var t = Ve(e) || "Component";
        if (ag[t])
          return;
        ag[t] = !0, S("Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.");
      }
    }
    function oC(e) {
      var t = e._payload, a = e._init;
      return a(t);
    }
    function sC(e) {
      function t(k, H) {
        if (e) {
          var O = k.deletions;
          O === null ? (k.deletions = [H], k.flags |= Da) : O.push(H);
        }
      }
      function a(k, H) {
        if (!e)
          return null;
        for (var O = H; O !== null; )
          t(k, O), O = O.sibling;
        return null;
      }
      function i(k, H) {
        for (var O = /* @__PURE__ */ new Map(), q = H; q !== null; )
          q.key !== null ? O.set(q.key, q) : O.set(q.index, q), q = q.sibling;
        return O;
      }
      function u(k, H) {
        var O = ac(k, H);
        return O.index = 0, O.sibling = null, O;
      }
      function s(k, H, O) {
        if (k.index = O, !e)
          return k.flags |= Ci, H;
        var q = k.alternate;
        if (q !== null) {
          var fe = q.index;
          return fe < H ? (k.flags |= hn, H) : fe;
        } else
          return k.flags |= hn, H;
      }
      function f(k) {
        return e && k.alternate === null && (k.flags |= hn), k;
      }
      function p(k, H, O, q) {
        if (H === null || H.tag !== Ye) {
          var fe = JS(O, k.mode, q);
          return fe.return = k, fe;
        } else {
          var oe = u(H, O);
          return oe.return = k, oe;
        }
      }
      function v(k, H, O, q) {
        var fe = O.type;
        if (fe === fi)
          return g(k, H, O.props.children, q, O.key);
        if (H !== null && (H.elementType === fe || // Keep this check inline so it only runs on the false path:
        vR(H, O) || // Lazy types should reconcile their resolved type.
        // We need to do this after the Hot Reloading check above,
        // because hot reloading has different semantics than prod because
        // it doesn't resuspend. So we can't let the call below suspend.
        typeof fe == "object" && fe !== null && fe.$$typeof === Be && oC(fe) === H.type)) {
          var oe = u(H, O.props);
          return oe.ref = yp(k, H, O), oe.return = k, oe._debugSource = O._source, oe._debugOwner = O._owner, oe;
        }
        var He = ZS(O, k.mode, q);
        return He.ref = yp(k, H, O), He.return = k, He;
      }
      function y(k, H, O, q) {
        if (H === null || H.tag !== Ce || H.stateNode.containerInfo !== O.containerInfo || H.stateNode.implementation !== O.implementation) {
          var fe = eE(O, k.mode, q);
          return fe.return = k, fe;
        } else {
          var oe = u(H, O.children || []);
          return oe.return = k, oe;
        }
      }
      function g(k, H, O, q, fe) {
        if (H === null || H.tag !== mt) {
          var oe = $o(O, k.mode, q, fe);
          return oe.return = k, oe;
        } else {
          var He = u(H, O);
          return He.return = k, He;
        }
      }
      function b(k, H, O) {
        if (typeof H == "string" && H !== "" || typeof H == "number") {
          var q = JS("" + H, k.mode, O);
          return q.return = k, q;
        }
        if (typeof H == "object" && H !== null) {
          switch (H.$$typeof) {
            case br: {
              var fe = ZS(H, k.mode, O);
              return fe.ref = yp(k, null, H), fe.return = k, fe;
            }
            case nr: {
              var oe = eE(H, k.mode, O);
              return oe.return = k, oe;
            }
            case Be: {
              var He = H._payload, Qe = H._init;
              return b(k, Qe(He), O);
            }
          }
          if (tt(H) || Ge(H)) {
            var qt = $o(H, k.mode, O, null);
            return qt.return = k, qt;
          }
          $h(k, H);
        }
        return typeof H == "function" && Yh(k), null;
      }
      function w(k, H, O, q) {
        var fe = H !== null ? H.key : null;
        if (typeof O == "string" && O !== "" || typeof O == "number")
          return fe !== null ? null : p(k, H, "" + O, q);
        if (typeof O == "object" && O !== null) {
          switch (O.$$typeof) {
            case br:
              return O.key === fe ? v(k, H, O, q) : null;
            case nr:
              return O.key === fe ? y(k, H, O, q) : null;
            case Be: {
              var oe = O._payload, He = O._init;
              return w(k, H, He(oe), q);
            }
          }
          if (tt(O) || Ge(O))
            return fe !== null ? null : g(k, H, O, q, null);
          $h(k, O);
        }
        return typeof O == "function" && Yh(k), null;
      }
      function M(k, H, O, q, fe) {
        if (typeof q == "string" && q !== "" || typeof q == "number") {
          var oe = k.get(O) || null;
          return p(H, oe, "" + q, fe);
        }
        if (typeof q == "object" && q !== null) {
          switch (q.$$typeof) {
            case br: {
              var He = k.get(q.key === null ? O : q.key) || null;
              return v(H, He, q, fe);
            }
            case nr: {
              var Qe = k.get(q.key === null ? O : q.key) || null;
              return y(H, Qe, q, fe);
            }
            case Be:
              var qt = q._payload, Nt = q._init;
              return M(k, H, O, Nt(qt), fe);
          }
          if (tt(q) || Ge(q)) {
            var Wn = k.get(O) || null;
            return g(H, Wn, q, fe, null);
          }
          $h(H, q);
        }
        return typeof q == "function" && Yh(H), null;
      }
      function A(k, H, O) {
        {
          if (typeof k != "object" || k === null)
            return H;
          switch (k.$$typeof) {
            case br:
            case nr:
              uC(k, O);
              var q = k.key;
              if (typeof q != "string")
                break;
              if (H === null) {
                H = /* @__PURE__ */ new Set(), H.add(q);
                break;
              }
              if (!H.has(q)) {
                H.add(q);
                break;
              }
              S("Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.", q);
              break;
            case Be:
              var fe = k._payload, oe = k._init;
              A(oe(fe), H, O);
              break;
          }
        }
        return H;
      }
      function j(k, H, O, q) {
        for (var fe = null, oe = 0; oe < O.length; oe++) {
          var He = O[oe];
          fe = A(He, fe, k);
        }
        for (var Qe = null, qt = null, Nt = H, Wn = 0, zt = 0, Hn = null; Nt !== null && zt < O.length; zt++) {
          Nt.index > zt ? (Hn = Nt, Nt = null) : Hn = Nt.sibling;
          var ia = w(k, Nt, O[zt], q);
          if (ia === null) {
            Nt === null && (Nt = Hn);
            break;
          }
          e && Nt && ia.alternate === null && t(k, Nt), Wn = s(ia, Wn, zt), qt === null ? Qe = ia : qt.sibling = ia, qt = ia, Nt = Hn;
        }
        if (zt === O.length) {
          if (a(k, Nt), Ur()) {
            var Br = zt;
            Is(k, Br);
          }
          return Qe;
        }
        if (Nt === null) {
          for (; zt < O.length; zt++) {
            var oi = b(k, O[zt], q);
            oi !== null && (Wn = s(oi, Wn, zt), qt === null ? Qe = oi : qt.sibling = oi, qt = oi);
          }
          if (Ur()) {
            var Ca = zt;
            Is(k, Ca);
          }
          return Qe;
        }
        for (var Ra = i(k, Nt); zt < O.length; zt++) {
          var la = M(Ra, k, zt, O[zt], q);
          la !== null && (e && la.alternate !== null && Ra.delete(la.key === null ? zt : la.key), Wn = s(la, Wn, zt), qt === null ? Qe = la : qt.sibling = la, qt = la);
        }
        if (e && Ra.forEach(function(Yf) {
          return t(k, Yf);
        }), Ur()) {
          var Iu = zt;
          Is(k, Iu);
        }
        return Qe;
      }
      function le(k, H, O, q) {
        var fe = Ge(O);
        if (typeof fe != "function")
          throw new Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");
        {
          typeof Symbol == "function" && // $FlowFixMe Flow doesn't know about toStringTag
          O[Symbol.toStringTag] === "Generator" && (tg || S("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers."), tg = !0), O.entries === fe && (eg || S("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), eg = !0);
          var oe = fe.call(O);
          if (oe)
            for (var He = null, Qe = oe.next(); !Qe.done; Qe = oe.next()) {
              var qt = Qe.value;
              He = A(qt, He, k);
            }
        }
        var Nt = fe.call(O);
        if (Nt == null)
          throw new Error("An iterable object provided no iterator.");
        for (var Wn = null, zt = null, Hn = H, ia = 0, Br = 0, oi = null, Ca = Nt.next(); Hn !== null && !Ca.done; Br++, Ca = Nt.next()) {
          Hn.index > Br ? (oi = Hn, Hn = null) : oi = Hn.sibling;
          var Ra = w(k, Hn, Ca.value, q);
          if (Ra === null) {
            Hn === null && (Hn = oi);
            break;
          }
          e && Hn && Ra.alternate === null && t(k, Hn), ia = s(Ra, ia, Br), zt === null ? Wn = Ra : zt.sibling = Ra, zt = Ra, Hn = oi;
        }
        if (Ca.done) {
          if (a(k, Hn), Ur()) {
            var la = Br;
            Is(k, la);
          }
          return Wn;
        }
        if (Hn === null) {
          for (; !Ca.done; Br++, Ca = Nt.next()) {
            var Iu = b(k, Ca.value, q);
            Iu !== null && (ia = s(Iu, ia, Br), zt === null ? Wn = Iu : zt.sibling = Iu, zt = Iu);
          }
          if (Ur()) {
            var Yf = Br;
            Is(k, Yf);
          }
          return Wn;
        }
        for (var qp = i(k, Hn); !Ca.done; Br++, Ca = Nt.next()) {
          var Kl = M(qp, k, Br, Ca.value, q);
          Kl !== null && (e && Kl.alternate !== null && qp.delete(Kl.key === null ? Br : Kl.key), ia = s(Kl, ia, Br), zt === null ? Wn = Kl : zt.sibling = Kl, zt = Kl);
        }
        if (e && qp.forEach(function(Q_) {
          return t(k, Q_);
        }), Ur()) {
          var I_ = Br;
          Is(k, I_);
        }
        return Wn;
      }
      function Le(k, H, O, q) {
        if (H !== null && H.tag === Ye) {
          a(k, H.sibling);
          var fe = u(H, O);
          return fe.return = k, fe;
        }
        a(k, H);
        var oe = JS(O, k.mode, q);
        return oe.return = k, oe;
      }
      function we(k, H, O, q) {
        for (var fe = O.key, oe = H; oe !== null; ) {
          if (oe.key === fe) {
            var He = O.type;
            if (He === fi) {
              if (oe.tag === mt) {
                a(k, oe.sibling);
                var Qe = u(oe, O.props.children);
                return Qe.return = k, Qe._debugSource = O._source, Qe._debugOwner = O._owner, Qe;
              }
            } else if (oe.elementType === He || // Keep this check inline so it only runs on the false path:
            vR(oe, O) || // Lazy types should reconcile their resolved type.
            // We need to do this after the Hot Reloading check above,
            // because hot reloading has different semantics than prod because
            // it doesn't resuspend. So we can't let the call below suspend.
            typeof He == "object" && He !== null && He.$$typeof === Be && oC(He) === oe.type) {
              a(k, oe.sibling);
              var qt = u(oe, O.props);
              return qt.ref = yp(k, oe, O), qt.return = k, qt._debugSource = O._source, qt._debugOwner = O._owner, qt;
            }
            a(k, oe);
            break;
          } else
            t(k, oe);
          oe = oe.sibling;
        }
        if (O.type === fi) {
          var Nt = $o(O.props.children, k.mode, q, O.key);
          return Nt.return = k, Nt;
        } else {
          var Wn = ZS(O, k.mode, q);
          return Wn.ref = yp(k, H, O), Wn.return = k, Wn;
        }
      }
      function Et(k, H, O, q) {
        for (var fe = O.key, oe = H; oe !== null; ) {
          if (oe.key === fe)
            if (oe.tag === Ce && oe.stateNode.containerInfo === O.containerInfo && oe.stateNode.implementation === O.implementation) {
              a(k, oe.sibling);
              var He = u(oe, O.children || []);
              return He.return = k, He;
            } else {
              a(k, oe);
              break;
            }
          else
            t(k, oe);
          oe = oe.sibling;
        }
        var Qe = eE(O, k.mode, q);
        return Qe.return = k, Qe;
      }
      function vt(k, H, O, q) {
        var fe = typeof O == "object" && O !== null && O.type === fi && O.key === null;
        if (fe && (O = O.props.children), typeof O == "object" && O !== null) {
          switch (O.$$typeof) {
            case br:
              return f(we(k, H, O, q));
            case nr:
              return f(Et(k, H, O, q));
            case Be:
              var oe = O._payload, He = O._init;
              return vt(k, H, He(oe), q);
          }
          if (tt(O))
            return j(k, H, O, q);
          if (Ge(O))
            return le(k, H, O, q);
          $h(k, O);
        }
        return typeof O == "string" && O !== "" || typeof O == "number" ? f(Le(k, H, "" + O, q)) : (typeof O == "function" && Yh(k), a(k, H));
      }
      return vt;
    }
    var bf = sC(!0), cC = sC(!1);
    function Cw(e, t) {
      if (e !== null && t.child !== e.child)
        throw new Error("Resuming work not yet implemented.");
      if (t.child !== null) {
        var a = t.child, i = ac(a, a.pendingProps);
        for (t.child = i, i.return = t; a.sibling !== null; )
          a = a.sibling, i = i.sibling = ac(a, a.pendingProps), i.return = t;
        i.sibling = null;
      }
    }
    function Rw(e, t) {
      for (var a = e.child; a !== null; )
        s_(a, t), a = a.sibling;
    }
    var ig = ko(null), lg;
    lg = {};
    var Ih = null, _f = null, ug = null, Qh = !1;
    function Wh() {
      Ih = null, _f = null, ug = null, Qh = !1;
    }
    function fC() {
      Qh = !0;
    }
    function dC() {
      Qh = !1;
    }
    function pC(e, t, a) {
      ra(ig, t._currentValue, e), t._currentValue = a, t._currentRenderer !== void 0 && t._currentRenderer !== null && t._currentRenderer !== lg && S("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), t._currentRenderer = lg;
    }
    function og(e, t) {
      var a = ig.current;
      na(ig, t), e._currentValue = a;
    }
    function sg(e, t, a) {
      for (var i = e; i !== null; ) {
        var u = i.alternate;
        if (_u(i.childLanes, t) ? u !== null && !_u(u.childLanes, t) && (u.childLanes = qe(u.childLanes, t)) : (i.childLanes = qe(i.childLanes, t), u !== null && (u.childLanes = qe(u.childLanes, t))), i === a)
          break;
        i = i.return;
      }
      i !== a && S("Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue.");
    }
    function Tw(e, t, a) {
      ww(e, t, a);
    }
    function ww(e, t, a) {
      var i = e.child;
      for (i !== null && (i.return = e); i !== null; ) {
        var u = void 0, s = i.dependencies;
        if (s !== null) {
          u = i.child;
          for (var f = s.firstContext; f !== null; ) {
            if (f.context === t) {
              if (i.tag === ve) {
                var p = Rs(a), v = Hu(Xt, p);
                v.tag = qh;
                var y = i.updateQueue;
                if (y !== null) {
                  var g = y.shared, b = g.pending;
                  b === null ? v.next = v : (v.next = b.next, b.next = v), g.pending = v;
                }
              }
              i.lanes = qe(i.lanes, a);
              var w = i.alternate;
              w !== null && (w.lanes = qe(w.lanes, a)), sg(i.return, a, e), s.lanes = qe(s.lanes, a);
              break;
            }
            f = f.next;
          }
        } else if (i.tag === ft)
          u = i.type === e.type ? null : i.child;
        else if (i.tag === Kt) {
          var M = i.return;
          if (M === null)
            throw new Error("We just came from a parent so we must have had a parent. This is a bug in React.");
          M.lanes = qe(M.lanes, a);
          var A = M.alternate;
          A !== null && (A.lanes = qe(A.lanes, a)), sg(M, a, e), u = i.sibling;
        } else
          u = i.child;
        if (u !== null)
          u.return = i;
        else
          for (u = i; u !== null; ) {
            if (u === e) {
              u = null;
              break;
            }
            var j = u.sibling;
            if (j !== null) {
              j.return = u.return, u = j;
              break;
            }
            u = u.return;
          }
        i = u;
      }
    }
    function Df(e, t) {
      Ih = e, _f = null, ug = null;
      var a = e.dependencies;
      if (a !== null) {
        var i = a.firstContext;
        i !== null && (Zr(a.lanes, t) && Mp(), a.firstContext = null);
      }
    }
    function er(e) {
      Qh && S("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
      var t = e._currentValue;
      if (ug !== e) {
        var a = {
          context: e,
          memoizedValue: t,
          next: null
        };
        if (_f === null) {
          if (Ih === null)
            throw new Error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
          _f = a, Ih.dependencies = {
            lanes: $,
            firstContext: a
          };
        } else
          _f = _f.next = a;
      }
      return t;
    }
    var Xs = null;
    function cg(e) {
      Xs === null ? Xs = [e] : Xs.push(e);
    }
    function xw() {
      if (Xs !== null) {
        for (var e = 0; e < Xs.length; e++) {
          var t = Xs[e], a = t.interleaved;
          if (a !== null) {
            t.interleaved = null;
            var i = a.next, u = t.pending;
            if (u !== null) {
              var s = u.next;
              u.next = i, a.next = s;
            }
            t.pending = a;
          }
        }
        Xs = null;
      }
    }
    function vC(e, t, a, i) {
      var u = t.interleaved;
      return u === null ? (a.next = a, cg(t)) : (a.next = u.next, u.next = a), t.interleaved = a, Gh(e, i);
    }
    function bw(e, t, a, i) {
      var u = t.interleaved;
      u === null ? (a.next = a, cg(t)) : (a.next = u.next, u.next = a), t.interleaved = a;
    }
    function _w(e, t, a, i) {
      var u = t.interleaved;
      return u === null ? (a.next = a, cg(t)) : (a.next = u.next, u.next = a), t.interleaved = a, Gh(e, i);
    }
    function ja(e, t) {
      return Gh(e, t);
    }
    var Dw = Gh;
    function Gh(e, t) {
      e.lanes = qe(e.lanes, t);
      var a = e.alternate;
      a !== null && (a.lanes = qe(a.lanes, t)), a === null && (e.flags & (hn | Wr)) !== _e && cR(e);
      for (var i = e, u = e.return; u !== null; )
        u.childLanes = qe(u.childLanes, t), a = u.alternate, a !== null ? a.childLanes = qe(a.childLanes, t) : (u.flags & (hn | Wr)) !== _e && cR(e), i = u, u = u.return;
      if (i.tag === ee) {
        var s = i.stateNode;
        return s;
      } else
        return null;
    }
    var hC = 0, mC = 1, qh = 2, fg = 3, Xh = !1, dg, Kh;
    dg = !1, Kh = null;
    function pg(e) {
      var t = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: {
          pending: null,
          interleaved: null,
          lanes: $
        },
        effects: null
      };
      e.updateQueue = t;
    }
    function yC(e, t) {
      var a = t.updateQueue, i = e.updateQueue;
      if (a === i) {
        var u = {
          baseState: i.baseState,
          firstBaseUpdate: i.firstBaseUpdate,
          lastBaseUpdate: i.lastBaseUpdate,
          shared: i.shared,
          effects: i.effects
        };
        t.updateQueue = u;
      }
    }
    function Hu(e, t) {
      var a = {
        eventTime: e,
        lane: t,
        tag: hC,
        payload: null,
        callback: null,
        next: null
      };
      return a;
    }
    function No(e, t, a) {
      var i = e.updateQueue;
      if (i === null)
        return null;
      var u = i.shared;
      if (Kh === u && !dg && (S("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback."), dg = !0), bb()) {
        var s = u.pending;
        return s === null ? t.next = t : (t.next = s.next, s.next = t), u.pending = t, Dw(e, a);
      } else
        return _w(e, u, t, a);
    }
    function Zh(e, t, a) {
      var i = t.updateQueue;
      if (i !== null) {
        var u = i.shared;
        if (Od(a)) {
          var s = u.lanes;
          s = Md(s, e.pendingLanes);
          var f = qe(s, a);
          u.lanes = f, Jc(e, f);
        }
      }
    }
    function vg(e, t) {
      var a = e.updateQueue, i = e.alternate;
      if (i !== null) {
        var u = i.updateQueue;
        if (a === u) {
          var s = null, f = null, p = a.firstBaseUpdate;
          if (p !== null) {
            var v = p;
            do {
              var y = {
                eventTime: v.eventTime,
                lane: v.lane,
                tag: v.tag,
                payload: v.payload,
                callback: v.callback,
                next: null
              };
              f === null ? s = f = y : (f.next = y, f = y), v = v.next;
            } while (v !== null);
            f === null ? s = f = t : (f.next = t, f = t);
          } else
            s = f = t;
          a = {
            baseState: u.baseState,
            firstBaseUpdate: s,
            lastBaseUpdate: f,
            shared: u.shared,
            effects: u.effects
          }, e.updateQueue = a;
          return;
        }
      }
      var g = a.lastBaseUpdate;
      g === null ? a.firstBaseUpdate = t : g.next = t, a.lastBaseUpdate = t;
    }
    function kw(e, t, a, i, u, s) {
      switch (a.tag) {
        case mC: {
          var f = a.payload;
          if (typeof f == "function") {
            fC();
            var p = f.call(s, i, u);
            {
              if (e.mode & Wt) {
                mn(!0);
                try {
                  f.call(s, i, u);
                } finally {
                  mn(!1);
                }
              }
              dC();
            }
            return p;
          }
          return f;
        }
        case fg:
          e.flags = e.flags & ~Xn | xe;
        case hC: {
          var v = a.payload, y;
          if (typeof v == "function") {
            fC(), y = v.call(s, i, u);
            {
              if (e.mode & Wt) {
                mn(!0);
                try {
                  v.call(s, i, u);
                } finally {
                  mn(!1);
                }
              }
              dC();
            }
          } else
            y = v;
          return y == null ? i : Ke({}, i, y);
        }
        case qh:
          return Xh = !0, i;
      }
      return i;
    }
    function Jh(e, t, a, i) {
      var u = e.updateQueue;
      Xh = !1, Kh = u.shared;
      var s = u.firstBaseUpdate, f = u.lastBaseUpdate, p = u.shared.pending;
      if (p !== null) {
        u.shared.pending = null;
        var v = p, y = v.next;
        v.next = null, f === null ? s = y : f.next = y, f = v;
        var g = e.alternate;
        if (g !== null) {
          var b = g.updateQueue, w = b.lastBaseUpdate;
          w !== f && (w === null ? b.firstBaseUpdate = y : w.next = y, b.lastBaseUpdate = v);
        }
      }
      if (s !== null) {
        var M = u.baseState, A = $, j = null, le = null, Le = null, we = s;
        do {
          var Et = we.lane, vt = we.eventTime;
          if (_u(i, Et)) {
            if (Le !== null) {
              var H = {
                eventTime: vt,
                // This update is going to be committed so we never want uncommit
                // it. Using NoLane works because 0 is a subset of all bitmasks, so
                // this will never be skipped by the check above.
                lane: _t,
                tag: we.tag,
                payload: we.payload,
                callback: we.callback,
                next: null
              };
              Le = Le.next = H;
            }
            M = kw(e, u, we, M, t, a);
            var O = we.callback;
            if (O !== null && // If the update was already committed, we should not queue its
            // callback again.
            we.lane !== _t) {
              e.flags |= nn;
              var q = u.effects;
              q === null ? u.effects = [we] : q.push(we);
            }
          } else {
            var k = {
              eventTime: vt,
              lane: Et,
              tag: we.tag,
              payload: we.payload,
              callback: we.callback,
              next: null
            };
            Le === null ? (le = Le = k, j = M) : Le = Le.next = k, A = qe(A, Et);
          }
          if (we = we.next, we === null) {
            if (p = u.shared.pending, p === null)
              break;
            var fe = p, oe = fe.next;
            fe.next = null, we = oe, u.lastBaseUpdate = fe, u.shared.pending = null;
          }
        } while (!0);
        Le === null && (j = M), u.baseState = j, u.firstBaseUpdate = le, u.lastBaseUpdate = Le;
        var He = u.shared.interleaved;
        if (He !== null) {
          var Qe = He;
          do
            A = qe(A, Qe.lane), Qe = Qe.next;
          while (Qe !== He);
        } else s === null && (u.shared.lanes = $);
        Yp(A), e.lanes = A, e.memoizedState = M;
      }
      Kh = null;
    }
    function Ow(e, t) {
      if (typeof e != "function")
        throw new Error("Invalid argument passed as callback. Expected a function. Instead " + ("received: " + e));
      e.call(t);
    }
    function gC() {
      Xh = !1;
    }
    function em() {
      return Xh;
    }
    function SC(e, t, a) {
      var i = t.effects;
      if (t.effects = null, i !== null)
        for (var u = 0; u < i.length; u++) {
          var s = i[u], f = s.callback;
          f !== null && (s.callback = null, Ow(f, a));
        }
    }
    var gp = {}, zo = ko(gp), Sp = ko(gp), tm = ko(gp);
    function nm(e) {
      if (e === gp)
        throw new Error("Expected host context to exist. This error is likely caused by a bug in React. Please file an issue.");
      return e;
    }
    function EC() {
      var e = nm(tm.current);
      return e;
    }
    function hg(e, t) {
      ra(tm, t, e), ra(Sp, e, e), ra(zo, gp, e);
      var a = WT(t);
      na(zo, e), ra(zo, a, e);
    }
    function kf(e) {
      na(zo, e), na(Sp, e), na(tm, e);
    }
    function mg() {
      var e = nm(zo.current);
      return e;
    }
    function CC(e) {
      nm(tm.current);
      var t = nm(zo.current), a = GT(t, e.type);
      t !== a && (ra(Sp, e, e), ra(zo, a, e));
    }
    function yg(e) {
      Sp.current === e && (na(zo, e), na(Sp, e));
    }
    var Lw = 0, RC = 1, TC = 1, Ep = 2, al = ko(Lw);
    function gg(e, t) {
      return (e & t) !== 0;
    }
    function Of(e) {
      return e & RC;
    }
    function Sg(e, t) {
      return e & RC | t;
    }
    function Mw(e, t) {
      return e | t;
    }
    function Uo(e, t) {
      ra(al, t, e);
    }
    function Lf(e) {
      na(al, e);
    }
    function Nw(e, t) {
      var a = e.memoizedState;
      return a !== null ? a.dehydrated !== null : (e.memoizedProps, !0);
    }
    function rm(e) {
      for (var t = e; t !== null; ) {
        if (t.tag === be) {
          var a = t.memoizedState;
          if (a !== null) {
            var i = a.dehydrated;
            if (i === null || PE(i) || Fy(i))
              return t;
          }
        } else if (t.tag === an && // revealOrder undefined can't be trusted because it don't
        // keep track of whether it suspended or not.
        t.memoizedProps.revealOrder !== void 0) {
          var u = (t.flags & xe) !== _e;
          if (u)
            return t;
        } else if (t.child !== null) {
          t.child.return = t, t = t.child;
          continue;
        }
        if (t === e)
          return null;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e)
            return null;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
      return null;
    }
    var Ha = (
      /*   */
      0
    ), sr = (
      /* */
      1
    ), Yl = (
      /*  */
      2
    ), cr = (
      /*    */
      4
    ), Ar = (
      /*   */
      8
    ), Eg = [];
    function Cg() {
      for (var e = 0; e < Eg.length; e++) {
        var t = Eg[e];
        t._workInProgressVersionPrimary = null;
      }
      Eg.length = 0;
    }
    function zw(e, t) {
      var a = t._getVersion, i = a(t._source);
      e.mutableSourceEagerHydrationData == null ? e.mutableSourceEagerHydrationData = [t, i] : e.mutableSourceEagerHydrationData.push(t, i);
    }
    var ce = z.ReactCurrentDispatcher, Cp = z.ReactCurrentBatchConfig, Rg, Mf;
    Rg = /* @__PURE__ */ new Set();
    var Ks = $, Gt = null, fr = null, dr = null, am = !1, Rp = !1, Tp = 0, Uw = 0, Aw = 25, V = null, zi = null, Ao = -1, Tg = !1;
    function Ht() {
      {
        var e = V;
        zi === null ? zi = [e] : zi.push(e);
      }
    }
    function te() {
      {
        var e = V;
        zi !== null && (Ao++, zi[Ao] !== e && Fw(e));
      }
    }
    function Nf(e) {
      e != null && !tt(e) && S("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.", V, typeof e);
    }
    function Fw(e) {
      {
        var t = Ve(Gt);
        if (!Rg.has(t) && (Rg.add(t), zi !== null)) {
          for (var a = "", i = 30, u = 0; u <= Ao; u++) {
            for (var s = zi[u], f = u === Ao ? e : s, p = u + 1 + ". " + s; p.length < i; )
              p += " ";
            p += f + `
`, a += p;
          }
          S(`React has detected a change in the order of Hooks called by %s. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks: https://reactjs.org/link/rules-of-hooks

   Previous render            Next render
   ------------------------------------------------------
%s   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
`, t, a);
        }
      }
    }
    function aa() {
      throw new Error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`);
    }
    function wg(e, t) {
      if (Tg)
        return !1;
      if (t === null)
        return S("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", V), !1;
      e.length !== t.length && S(`The final argument passed to %s changed size between renders. The order and size of this array must remain constant.

Previous: %s
Incoming: %s`, V, "[" + t.join(", ") + "]", "[" + e.join(", ") + "]");
      for (var a = 0; a < t.length && a < e.length; a++)
        if (!Q(e[a], t[a]))
          return !1;
      return !0;
    }
    function zf(e, t, a, i, u, s) {
      Ks = s, Gt = t, zi = e !== null ? e._debugHookTypes : null, Ao = -1, Tg = e !== null && e.type !== t.type, t.memoizedState = null, t.updateQueue = null, t.lanes = $, e !== null && e.memoizedState !== null ? ce.current = IC : zi !== null ? ce.current = YC : ce.current = $C;
      var f = a(i, u);
      if (Rp) {
        var p = 0;
        do {
          if (Rp = !1, Tp = 0, p >= Aw)
            throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
          p += 1, Tg = !1, fr = null, dr = null, t.updateQueue = null, Ao = -1, ce.current = QC, f = a(i, u);
        } while (Rp);
      }
      ce.current = ym, t._debugHookTypes = zi;
      var v = fr !== null && fr.next !== null;
      if (Ks = $, Gt = null, fr = null, dr = null, V = null, zi = null, Ao = -1, e !== null && (e.flags & Nn) !== (t.flags & Nn) && // Disable this warning in legacy mode, because legacy Suspense is weird
      // and creates false positives. To make this work in legacy mode, we'd
      // need to mark fibers that commit in an incomplete state, somehow. For
      // now I'll disable the warning that most of the bugs that would trigger
      // it are either exclusive to concurrent mode or exist in both.
      (e.mode & it) !== De && S("Internal React error: Expected static flag was missing. Please notify the React team."), am = !1, v)
        throw new Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");
      return f;
    }
    function Uf() {
      var e = Tp !== 0;
      return Tp = 0, e;
    }
    function wC(e, t, a) {
      t.updateQueue = e.updateQueue, (t.mode & Lt) !== De ? t.flags &= -50333701 : t.flags &= -2053, e.lanes = Ts(e.lanes, a);
    }
    function xC() {
      if (ce.current = ym, am) {
        for (var e = Gt.memoizedState; e !== null; ) {
          var t = e.queue;
          t !== null && (t.pending = null), e = e.next;
        }
        am = !1;
      }
      Ks = $, Gt = null, fr = null, dr = null, zi = null, Ao = -1, V = null, jC = !1, Rp = !1, Tp = 0;
    }
    function Il() {
      var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
      };
      return dr === null ? Gt.memoizedState = dr = e : dr = dr.next = e, dr;
    }
    function Ui() {
      var e;
      if (fr === null) {
        var t = Gt.alternate;
        t !== null ? e = t.memoizedState : e = null;
      } else
        e = fr.next;
      var a;
      if (dr === null ? a = Gt.memoizedState : a = dr.next, a !== null)
        dr = a, a = dr.next, fr = e;
      else {
        if (e === null)
          throw new Error("Rendered more hooks than during the previous render.");
        fr = e;
        var i = {
          memoizedState: fr.memoizedState,
          baseState: fr.baseState,
          baseQueue: fr.baseQueue,
          queue: fr.queue,
          next: null
        };
        dr === null ? Gt.memoizedState = dr = i : dr = dr.next = i;
      }
      return dr;
    }
    function bC() {
      return {
        lastEffect: null,
        stores: null
      };
    }
    function xg(e, t) {
      return typeof t == "function" ? t(e) : t;
    }
    function bg(e, t, a) {
      var i = Il(), u;
      a !== void 0 ? u = a(t) : u = t, i.memoizedState = i.baseState = u;
      var s = {
        pending: null,
        interleaved: null,
        lanes: $,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: u
      };
      i.queue = s;
      var f = s.dispatch = Vw.bind(null, Gt, s);
      return [i.memoizedState, f];
    }
    function _g(e, t, a) {
      var i = Ui(), u = i.queue;
      if (u === null)
        throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
      u.lastRenderedReducer = e;
      var s = fr, f = s.baseQueue, p = u.pending;
      if (p !== null) {
        if (f !== null) {
          var v = f.next, y = p.next;
          f.next = y, p.next = v;
        }
        s.baseQueue !== f && S("Internal error: Expected work-in-progress queue to be a clone. This is a bug in React."), s.baseQueue = f = p, u.pending = null;
      }
      if (f !== null) {
        var g = f.next, b = s.baseState, w = null, M = null, A = null, j = g;
        do {
          var le = j.lane;
          if (_u(Ks, le)) {
            if (A !== null) {
              var we = {
                // This update is going to be committed so we never want uncommit
                // it. Using NoLane works because 0 is a subset of all bitmasks, so
                // this will never be skipped by the check above.
                lane: _t,
                action: j.action,
                hasEagerState: j.hasEagerState,
                eagerState: j.eagerState,
                next: null
              };
              A = A.next = we;
            }
            if (j.hasEagerState)
              b = j.eagerState;
            else {
              var Et = j.action;
              b = e(b, Et);
            }
          } else {
            var Le = {
              lane: le,
              action: j.action,
              hasEagerState: j.hasEagerState,
              eagerState: j.eagerState,
              next: null
            };
            A === null ? (M = A = Le, w = b) : A = A.next = Le, Gt.lanes = qe(Gt.lanes, le), Yp(le);
          }
          j = j.next;
        } while (j !== null && j !== g);
        A === null ? w = b : A.next = M, Q(b, i.memoizedState) || Mp(), i.memoizedState = b, i.baseState = w, i.baseQueue = A, u.lastRenderedState = b;
      }
      var vt = u.interleaved;
      if (vt !== null) {
        var k = vt;
        do {
          var H = k.lane;
          Gt.lanes = qe(Gt.lanes, H), Yp(H), k = k.next;
        } while (k !== vt);
      } else f === null && (u.lanes = $);
      var O = u.dispatch;
      return [i.memoizedState, O];
    }
    function Dg(e, t, a) {
      var i = Ui(), u = i.queue;
      if (u === null)
        throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
      u.lastRenderedReducer = e;
      var s = u.dispatch, f = u.pending, p = i.memoizedState;
      if (f !== null) {
        u.pending = null;
        var v = f.next, y = v;
        do {
          var g = y.action;
          p = e(p, g), y = y.next;
        } while (y !== v);
        Q(p, i.memoizedState) || Mp(), i.memoizedState = p, i.baseQueue === null && (i.baseState = p), u.lastRenderedState = p;
      }
      return [p, s];
    }
    function iD(e, t, a) {
    }
    function lD(e, t, a) {
    }
    function kg(e, t, a) {
      var i = Gt, u = Il(), s, f = Ur();
      if (f) {
        if (a === void 0)
          throw new Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
        s = a(), Mf || s !== a() && (S("The result of getServerSnapshot should be cached to avoid an infinite loop"), Mf = !0);
      } else {
        if (s = t(), !Mf) {
          var p = t();
          Q(s, p) || (S("The result of getSnapshot should be cached to avoid an infinite loop"), Mf = !0);
        }
        var v = Am();
        if (v === null)
          throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
        Kc(v, Ks) || _C(i, t, s);
      }
      u.memoizedState = s;
      var y = {
        value: s,
        getSnapshot: t
      };
      return u.queue = y, sm(kC.bind(null, i, y, e), [e]), i.flags |= Qr, wp(sr | Ar, DC.bind(null, i, y, s, t), void 0, null), s;
    }
    function im(e, t, a) {
      var i = Gt, u = Ui(), s = t();
      if (!Mf) {
        var f = t();
        Q(s, f) || (S("The result of getSnapshot should be cached to avoid an infinite loop"), Mf = !0);
      }
      var p = u.memoizedState, v = !Q(p, s);
      v && (u.memoizedState = s, Mp());
      var y = u.queue;
      if (bp(kC.bind(null, i, y, e), [e]), y.getSnapshot !== t || v || // Check if the susbcribe function changed. We can save some memory by
      // checking whether we scheduled a subscription effect above.
      dr !== null && dr.memoizedState.tag & sr) {
        i.flags |= Qr, wp(sr | Ar, DC.bind(null, i, y, s, t), void 0, null);
        var g = Am();
        if (g === null)
          throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
        Kc(g, Ks) || _C(i, t, s);
      }
      return s;
    }
    function _C(e, t, a) {
      e.flags |= po;
      var i = {
        getSnapshot: t,
        value: a
      }, u = Gt.updateQueue;
      if (u === null)
        u = bC(), Gt.updateQueue = u, u.stores = [i];
      else {
        var s = u.stores;
        s === null ? u.stores = [i] : s.push(i);
      }
    }
    function DC(e, t, a, i) {
      t.value = a, t.getSnapshot = i, OC(t) && LC(e);
    }
    function kC(e, t, a) {
      var i = function() {
        OC(t) && LC(e);
      };
      return a(i);
    }
    function OC(e) {
      var t = e.getSnapshot, a = e.value;
      try {
        var i = t();
        return !Q(a, i);
      } catch {
        return !0;
      }
    }
    function LC(e) {
      var t = ja(e, Ae);
      t !== null && mr(t, e, Ae, Xt);
    }
    function lm(e) {
      var t = Il();
      typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e;
      var a = {
        pending: null,
        interleaved: null,
        lanes: $,
        dispatch: null,
        lastRenderedReducer: xg,
        lastRenderedState: e
      };
      t.queue = a;
      var i = a.dispatch = Bw.bind(null, Gt, a);
      return [t.memoizedState, i];
    }
    function Og(e) {
      return _g(xg);
    }
    function Lg(e) {
      return Dg(xg);
    }
    function wp(e, t, a, i) {
      var u = {
        tag: e,
        create: t,
        destroy: a,
        deps: i,
        // Circular
        next: null
      }, s = Gt.updateQueue;
      if (s === null)
        s = bC(), Gt.updateQueue = s, s.lastEffect = u.next = u;
      else {
        var f = s.lastEffect;
        if (f === null)
          s.lastEffect = u.next = u;
        else {
          var p = f.next;
          f.next = u, u.next = p, s.lastEffect = u;
        }
      }
      return u;
    }
    function Mg(e) {
      var t = Il();
      {
        var a = {
          current: e
        };
        return t.memoizedState = a, a;
      }
    }
    function um(e) {
      var t = Ui();
      return t.memoizedState;
    }
    function xp(e, t, a, i) {
      var u = Il(), s = i === void 0 ? null : i;
      Gt.flags |= e, u.memoizedState = wp(sr | t, a, void 0, s);
    }
    function om(e, t, a, i) {
      var u = Ui(), s = i === void 0 ? null : i, f = void 0;
      if (fr !== null) {
        var p = fr.memoizedState;
        if (f = p.destroy, s !== null) {
          var v = p.deps;
          if (wg(s, v)) {
            u.memoizedState = wp(t, a, f, s);
            return;
          }
        }
      }
      Gt.flags |= e, u.memoizedState = wp(sr | t, a, f, s);
    }
    function sm(e, t) {
      return (Gt.mode & Lt) !== De ? xp(Ri | Qr | wc, Ar, e, t) : xp(Qr | wc, Ar, e, t);
    }
    function bp(e, t) {
      return om(Qr, Ar, e, t);
    }
    function Ng(e, t) {
      return xp(yt, Yl, e, t);
    }
    function cm(e, t) {
      return om(yt, Yl, e, t);
    }
    function zg(e, t) {
      var a = yt;
      return a |= Qi, (Gt.mode & Lt) !== De && (a |= bl), xp(a, cr, e, t);
    }
    function fm(e, t) {
      return om(yt, cr, e, t);
    }
    function MC(e, t) {
      if (typeof t == "function") {
        var a = t, i = e();
        return a(i), function() {
          a(null);
        };
      } else if (t != null) {
        var u = t;
        u.hasOwnProperty("current") || S("Expected useImperativeHandle() first argument to either be a ref callback or React.createRef() object. Instead received: %s.", "an object with keys {" + Object.keys(u).join(", ") + "}");
        var s = e();
        return u.current = s, function() {
          u.current = null;
        };
      }
    }
    function Ug(e, t, a) {
      typeof t != "function" && S("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
      var i = a != null ? a.concat([e]) : null, u = yt;
      return u |= Qi, (Gt.mode & Lt) !== De && (u |= bl), xp(u, cr, MC.bind(null, t, e), i);
    }
    function dm(e, t, a) {
      typeof t != "function" && S("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
      var i = a != null ? a.concat([e]) : null;
      return om(yt, cr, MC.bind(null, t, e), i);
    }
    function jw(e, t) {
    }
    var pm = jw;
    function Ag(e, t) {
      var a = Il(), i = t === void 0 ? null : t;
      return a.memoizedState = [e, i], e;
    }
    function vm(e, t) {
      var a = Ui(), i = t === void 0 ? null : t, u = a.memoizedState;
      if (u !== null && i !== null) {
        var s = u[1];
        if (wg(i, s))
          return u[0];
      }
      return a.memoizedState = [e, i], e;
    }
    function Fg(e, t) {
      var a = Il(), i = t === void 0 ? null : t, u = e();
      return a.memoizedState = [u, i], u;
    }
    function hm(e, t) {
      var a = Ui(), i = t === void 0 ? null : t, u = a.memoizedState;
      if (u !== null && i !== null) {
        var s = u[1];
        if (wg(i, s))
          return u[0];
      }
      var f = e();
      return a.memoizedState = [f, i], f;
    }
    function jg(e) {
      var t = Il();
      return t.memoizedState = e, e;
    }
    function NC(e) {
      var t = Ui(), a = fr, i = a.memoizedState;
      return UC(t, i, e);
    }
    function zC(e) {
      var t = Ui();
      if (fr === null)
        return t.memoizedState = e, e;
      var a = fr.memoizedState;
      return UC(t, a, e);
    }
    function UC(e, t, a) {
      var i = !Dd(Ks);
      if (i) {
        if (!Q(a, t)) {
          var u = Ld();
          Gt.lanes = qe(Gt.lanes, u), Yp(u), e.baseState = !0;
        }
        return t;
      } else
        return e.baseState && (e.baseState = !1, Mp()), e.memoizedState = a, a;
    }
    function Hw(e, t, a) {
      var i = Ua();
      An(Qv(i, bi)), e(!0);
      var u = Cp.transition;
      Cp.transition = {};
      var s = Cp.transition;
      Cp.transition._updatedFibers = /* @__PURE__ */ new Set();
      try {
        e(!1), t();
      } finally {
        if (An(i), Cp.transition = u, u === null && s._updatedFibers) {
          var f = s._updatedFibers.size;
          f > 10 && Rt("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), s._updatedFibers.clear();
        }
      }
    }
    function Hg() {
      var e = lm(!1), t = e[0], a = e[1], i = Hw.bind(null, a), u = Il();
      return u.memoizedState = i, [t, i];
    }
    function AC() {
      var e = Og(), t = e[0], a = Ui(), i = a.memoizedState;
      return [t, i];
    }
    function FC() {
      var e = Lg(), t = e[0], a = Ui(), i = a.memoizedState;
      return [t, i];
    }
    var jC = !1;
    function Pw() {
      return jC;
    }
    function Pg() {
      var e = Il(), t = Am(), a = t.identifierPrefix, i;
      if (Ur()) {
        var u = rw();
        i = ":" + a + "R" + u;
        var s = Tp++;
        s > 0 && (i += "H" + s.toString(32)), i += ":";
      } else {
        var f = Uw++;
        i = ":" + a + "r" + f.toString(32) + ":";
      }
      return e.memoizedState = i, i;
    }
    function mm() {
      var e = Ui(), t = e.memoizedState;
      return t;
    }
    function Vw(e, t, a) {
      typeof arguments[3] == "function" && S("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
      var i = Vo(e), u = {
        lane: i,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      if (HC(e))
        PC(t, u);
      else {
        var s = vC(e, t, u, i);
        if (s !== null) {
          var f = Ea();
          mr(s, e, i, f), VC(s, t, i);
        }
      }
      BC(e, i);
    }
    function Bw(e, t, a) {
      typeof arguments[3] == "function" && S("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
      var i = Vo(e), u = {
        lane: i,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      if (HC(e))
        PC(t, u);
      else {
        var s = e.alternate;
        if (e.lanes === $ && (s === null || s.lanes === $)) {
          var f = t.lastRenderedReducer;
          if (f !== null) {
            var p;
            p = ce.current, ce.current = il;
            try {
              var v = t.lastRenderedState, y = f(v, a);
              if (u.hasEagerState = !0, u.eagerState = y, Q(y, v)) {
                bw(e, t, u, i);
                return;
              }
            } catch {
            } finally {
              ce.current = p;
            }
          }
        }
        var g = vC(e, t, u, i);
        if (g !== null) {
          var b = Ea();
          mr(g, e, i, b), VC(g, t, i);
        }
      }
      BC(e, i);
    }
    function HC(e) {
      var t = e.alternate;
      return e === Gt || t !== null && t === Gt;
    }
    function PC(e, t) {
      Rp = am = !0;
      var a = e.pending;
      a === null ? t.next = t : (t.next = a.next, a.next = t), e.pending = t;
    }
    function VC(e, t, a) {
      if (Od(a)) {
        var i = t.lanes;
        i = Md(i, e.pendingLanes);
        var u = qe(i, a);
        t.lanes = u, Jc(e, u);
      }
    }
    function BC(e, t, a) {
      ps(e, t);
    }
    var ym = {
      readContext: er,
      useCallback: aa,
      useContext: aa,
      useEffect: aa,
      useImperativeHandle: aa,
      useInsertionEffect: aa,
      useLayoutEffect: aa,
      useMemo: aa,
      useReducer: aa,
      useRef: aa,
      useState: aa,
      useDebugValue: aa,
      useDeferredValue: aa,
      useTransition: aa,
      useMutableSource: aa,
      useSyncExternalStore: aa,
      useId: aa,
      unstable_isNewReconciler: K
    }, $C = null, YC = null, IC = null, QC = null, Ql = null, il = null, gm = null;
    {
      var Vg = function() {
        S("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
      }, $e = function() {
        S("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks");
      };
      $C = {
        readContext: function(e) {
          return er(e);
        },
        useCallback: function(e, t) {
          return V = "useCallback", Ht(), Nf(t), Ag(e, t);
        },
        useContext: function(e) {
          return V = "useContext", Ht(), er(e);
        },
        useEffect: function(e, t) {
          return V = "useEffect", Ht(), Nf(t), sm(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return V = "useImperativeHandle", Ht(), Nf(a), Ug(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return V = "useInsertionEffect", Ht(), Nf(t), Ng(e, t);
        },
        useLayoutEffect: function(e, t) {
          return V = "useLayoutEffect", Ht(), Nf(t), zg(e, t);
        },
        useMemo: function(e, t) {
          V = "useMemo", Ht(), Nf(t);
          var a = ce.current;
          ce.current = Ql;
          try {
            return Fg(e, t);
          } finally {
            ce.current = a;
          }
        },
        useReducer: function(e, t, a) {
          V = "useReducer", Ht();
          var i = ce.current;
          ce.current = Ql;
          try {
            return bg(e, t, a);
          } finally {
            ce.current = i;
          }
        },
        useRef: function(e) {
          return V = "useRef", Ht(), Mg(e);
        },
        useState: function(e) {
          V = "useState", Ht();
          var t = ce.current;
          ce.current = Ql;
          try {
            return lm(e);
          } finally {
            ce.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return V = "useDebugValue", Ht(), void 0;
        },
        useDeferredValue: function(e) {
          return V = "useDeferredValue", Ht(), jg(e);
        },
        useTransition: function() {
          return V = "useTransition", Ht(), Hg();
        },
        useMutableSource: function(e, t, a) {
          return V = "useMutableSource", Ht(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return V = "useSyncExternalStore", Ht(), kg(e, t, a);
        },
        useId: function() {
          return V = "useId", Ht(), Pg();
        },
        unstable_isNewReconciler: K
      }, YC = {
        readContext: function(e) {
          return er(e);
        },
        useCallback: function(e, t) {
          return V = "useCallback", te(), Ag(e, t);
        },
        useContext: function(e) {
          return V = "useContext", te(), er(e);
        },
        useEffect: function(e, t) {
          return V = "useEffect", te(), sm(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return V = "useImperativeHandle", te(), Ug(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return V = "useInsertionEffect", te(), Ng(e, t);
        },
        useLayoutEffect: function(e, t) {
          return V = "useLayoutEffect", te(), zg(e, t);
        },
        useMemo: function(e, t) {
          V = "useMemo", te();
          var a = ce.current;
          ce.current = Ql;
          try {
            return Fg(e, t);
          } finally {
            ce.current = a;
          }
        },
        useReducer: function(e, t, a) {
          V = "useReducer", te();
          var i = ce.current;
          ce.current = Ql;
          try {
            return bg(e, t, a);
          } finally {
            ce.current = i;
          }
        },
        useRef: function(e) {
          return V = "useRef", te(), Mg(e);
        },
        useState: function(e) {
          V = "useState", te();
          var t = ce.current;
          ce.current = Ql;
          try {
            return lm(e);
          } finally {
            ce.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return V = "useDebugValue", te(), void 0;
        },
        useDeferredValue: function(e) {
          return V = "useDeferredValue", te(), jg(e);
        },
        useTransition: function() {
          return V = "useTransition", te(), Hg();
        },
        useMutableSource: function(e, t, a) {
          return V = "useMutableSource", te(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return V = "useSyncExternalStore", te(), kg(e, t, a);
        },
        useId: function() {
          return V = "useId", te(), Pg();
        },
        unstable_isNewReconciler: K
      }, IC = {
        readContext: function(e) {
          return er(e);
        },
        useCallback: function(e, t) {
          return V = "useCallback", te(), vm(e, t);
        },
        useContext: function(e) {
          return V = "useContext", te(), er(e);
        },
        useEffect: function(e, t) {
          return V = "useEffect", te(), bp(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return V = "useImperativeHandle", te(), dm(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return V = "useInsertionEffect", te(), cm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return V = "useLayoutEffect", te(), fm(e, t);
        },
        useMemo: function(e, t) {
          V = "useMemo", te();
          var a = ce.current;
          ce.current = il;
          try {
            return hm(e, t);
          } finally {
            ce.current = a;
          }
        },
        useReducer: function(e, t, a) {
          V = "useReducer", te();
          var i = ce.current;
          ce.current = il;
          try {
            return _g(e, t, a);
          } finally {
            ce.current = i;
          }
        },
        useRef: function(e) {
          return V = "useRef", te(), um();
        },
        useState: function(e) {
          V = "useState", te();
          var t = ce.current;
          ce.current = il;
          try {
            return Og(e);
          } finally {
            ce.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return V = "useDebugValue", te(), pm();
        },
        useDeferredValue: function(e) {
          return V = "useDeferredValue", te(), NC(e);
        },
        useTransition: function() {
          return V = "useTransition", te(), AC();
        },
        useMutableSource: function(e, t, a) {
          return V = "useMutableSource", te(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return V = "useSyncExternalStore", te(), im(e, t);
        },
        useId: function() {
          return V = "useId", te(), mm();
        },
        unstable_isNewReconciler: K
      }, QC = {
        readContext: function(e) {
          return er(e);
        },
        useCallback: function(e, t) {
          return V = "useCallback", te(), vm(e, t);
        },
        useContext: function(e) {
          return V = "useContext", te(), er(e);
        },
        useEffect: function(e, t) {
          return V = "useEffect", te(), bp(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return V = "useImperativeHandle", te(), dm(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return V = "useInsertionEffect", te(), cm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return V = "useLayoutEffect", te(), fm(e, t);
        },
        useMemo: function(e, t) {
          V = "useMemo", te();
          var a = ce.current;
          ce.current = gm;
          try {
            return hm(e, t);
          } finally {
            ce.current = a;
          }
        },
        useReducer: function(e, t, a) {
          V = "useReducer", te();
          var i = ce.current;
          ce.current = gm;
          try {
            return Dg(e, t, a);
          } finally {
            ce.current = i;
          }
        },
        useRef: function(e) {
          return V = "useRef", te(), um();
        },
        useState: function(e) {
          V = "useState", te();
          var t = ce.current;
          ce.current = gm;
          try {
            return Lg(e);
          } finally {
            ce.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return V = "useDebugValue", te(), pm();
        },
        useDeferredValue: function(e) {
          return V = "useDeferredValue", te(), zC(e);
        },
        useTransition: function() {
          return V = "useTransition", te(), FC();
        },
        useMutableSource: function(e, t, a) {
          return V = "useMutableSource", te(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return V = "useSyncExternalStore", te(), im(e, t);
        },
        useId: function() {
          return V = "useId", te(), mm();
        },
        unstable_isNewReconciler: K
      }, Ql = {
        readContext: function(e) {
          return Vg(), er(e);
        },
        useCallback: function(e, t) {
          return V = "useCallback", $e(), Ht(), Ag(e, t);
        },
        useContext: function(e) {
          return V = "useContext", $e(), Ht(), er(e);
        },
        useEffect: function(e, t) {
          return V = "useEffect", $e(), Ht(), sm(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return V = "useImperativeHandle", $e(), Ht(), Ug(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return V = "useInsertionEffect", $e(), Ht(), Ng(e, t);
        },
        useLayoutEffect: function(e, t) {
          return V = "useLayoutEffect", $e(), Ht(), zg(e, t);
        },
        useMemo: function(e, t) {
          V = "useMemo", $e(), Ht();
          var a = ce.current;
          ce.current = Ql;
          try {
            return Fg(e, t);
          } finally {
            ce.current = a;
          }
        },
        useReducer: function(e, t, a) {
          V = "useReducer", $e(), Ht();
          var i = ce.current;
          ce.current = Ql;
          try {
            return bg(e, t, a);
          } finally {
            ce.current = i;
          }
        },
        useRef: function(e) {
          return V = "useRef", $e(), Ht(), Mg(e);
        },
        useState: function(e) {
          V = "useState", $e(), Ht();
          var t = ce.current;
          ce.current = Ql;
          try {
            return lm(e);
          } finally {
            ce.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return V = "useDebugValue", $e(), Ht(), void 0;
        },
        useDeferredValue: function(e) {
          return V = "useDeferredValue", $e(), Ht(), jg(e);
        },
        useTransition: function() {
          return V = "useTransition", $e(), Ht(), Hg();
        },
        useMutableSource: function(e, t, a) {
          return V = "useMutableSource", $e(), Ht(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return V = "useSyncExternalStore", $e(), Ht(), kg(e, t, a);
        },
        useId: function() {
          return V = "useId", $e(), Ht(), Pg();
        },
        unstable_isNewReconciler: K
      }, il = {
        readContext: function(e) {
          return Vg(), er(e);
        },
        useCallback: function(e, t) {
          return V = "useCallback", $e(), te(), vm(e, t);
        },
        useContext: function(e) {
          return V = "useContext", $e(), te(), er(e);
        },
        useEffect: function(e, t) {
          return V = "useEffect", $e(), te(), bp(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return V = "useImperativeHandle", $e(), te(), dm(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return V = "useInsertionEffect", $e(), te(), cm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return V = "useLayoutEffect", $e(), te(), fm(e, t);
        },
        useMemo: function(e, t) {
          V = "useMemo", $e(), te();
          var a = ce.current;
          ce.current = il;
          try {
            return hm(e, t);
          } finally {
            ce.current = a;
          }
        },
        useReducer: function(e, t, a) {
          V = "useReducer", $e(), te();
          var i = ce.current;
          ce.current = il;
          try {
            return _g(e, t, a);
          } finally {
            ce.current = i;
          }
        },
        useRef: function(e) {
          return V = "useRef", $e(), te(), um();
        },
        useState: function(e) {
          V = "useState", $e(), te();
          var t = ce.current;
          ce.current = il;
          try {
            return Og(e);
          } finally {
            ce.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return V = "useDebugValue", $e(), te(), pm();
        },
        useDeferredValue: function(e) {
          return V = "useDeferredValue", $e(), te(), NC(e);
        },
        useTransition: function() {
          return V = "useTransition", $e(), te(), AC();
        },
        useMutableSource: function(e, t, a) {
          return V = "useMutableSource", $e(), te(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return V = "useSyncExternalStore", $e(), te(), im(e, t);
        },
        useId: function() {
          return V = "useId", $e(), te(), mm();
        },
        unstable_isNewReconciler: K
      }, gm = {
        readContext: function(e) {
          return Vg(), er(e);
        },
        useCallback: function(e, t) {
          return V = "useCallback", $e(), te(), vm(e, t);
        },
        useContext: function(e) {
          return V = "useContext", $e(), te(), er(e);
        },
        useEffect: function(e, t) {
          return V = "useEffect", $e(), te(), bp(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return V = "useImperativeHandle", $e(), te(), dm(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return V = "useInsertionEffect", $e(), te(), cm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return V = "useLayoutEffect", $e(), te(), fm(e, t);
        },
        useMemo: function(e, t) {
          V = "useMemo", $e(), te();
          var a = ce.current;
          ce.current = il;
          try {
            return hm(e, t);
          } finally {
            ce.current = a;
          }
        },
        useReducer: function(e, t, a) {
          V = "useReducer", $e(), te();
          var i = ce.current;
          ce.current = il;
          try {
            return Dg(e, t, a);
          } finally {
            ce.current = i;
          }
        },
        useRef: function(e) {
          return V = "useRef", $e(), te(), um();
        },
        useState: function(e) {
          V = "useState", $e(), te();
          var t = ce.current;
          ce.current = il;
          try {
            return Lg(e);
          } finally {
            ce.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return V = "useDebugValue", $e(), te(), pm();
        },
        useDeferredValue: function(e) {
          return V = "useDeferredValue", $e(), te(), zC(e);
        },
        useTransition: function() {
          return V = "useTransition", $e(), te(), FC();
        },
        useMutableSource: function(e, t, a) {
          return V = "useMutableSource", $e(), te(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return V = "useSyncExternalStore", $e(), te(), im(e, t);
        },
        useId: function() {
          return V = "useId", $e(), te(), mm();
        },
        unstable_isNewReconciler: K
      };
    }
    var Fo = W.unstable_now, WC = 0, Sm = -1, _p = -1, Em = -1, Bg = !1, Cm = !1;
    function GC() {
      return Bg;
    }
    function $w() {
      Cm = !0;
    }
    function Yw() {
      Bg = !1, Cm = !1;
    }
    function Iw() {
      Bg = Cm, Cm = !1;
    }
    function qC() {
      return WC;
    }
    function XC() {
      WC = Fo();
    }
    function $g(e) {
      _p = Fo(), e.actualStartTime < 0 && (e.actualStartTime = Fo());
    }
    function KC(e) {
      _p = -1;
    }
    function Rm(e, t) {
      if (_p >= 0) {
        var a = Fo() - _p;
        e.actualDuration += a, t && (e.selfBaseDuration = a), _p = -1;
      }
    }
    function Wl(e) {
      if (Sm >= 0) {
        var t = Fo() - Sm;
        Sm = -1;
        for (var a = e.return; a !== null; ) {
          switch (a.tag) {
            case ee:
              var i = a.stateNode;
              i.effectDuration += t;
              return;
            case pt:
              var u = a.stateNode;
              u.effectDuration += t;
              return;
          }
          a = a.return;
        }
      }
    }
    function Yg(e) {
      if (Em >= 0) {
        var t = Fo() - Em;
        Em = -1;
        for (var a = e.return; a !== null; ) {
          switch (a.tag) {
            case ee:
              var i = a.stateNode;
              i !== null && (i.passiveEffectDuration += t);
              return;
            case pt:
              var u = a.stateNode;
              u !== null && (u.passiveEffectDuration += t);
              return;
          }
          a = a.return;
        }
      }
    }
    function Gl() {
      Sm = Fo();
    }
    function Ig() {
      Em = Fo();
    }
    function Qg(e) {
      for (var t = e.child; t; )
        e.actualDuration += t.actualDuration, t = t.sibling;
    }
    function ll(e, t) {
      if (e && e.defaultProps) {
        var a = Ke({}, t), i = e.defaultProps;
        for (var u in i)
          a[u] === void 0 && (a[u] = i[u]);
        return a;
      }
      return t;
    }
    var Wg = {}, Gg, qg, Xg, Kg, Zg, ZC, Tm, Jg, eS, tS, Dp;
    {
      Gg = /* @__PURE__ */ new Set(), qg = /* @__PURE__ */ new Set(), Xg = /* @__PURE__ */ new Set(), Kg = /* @__PURE__ */ new Set(), Jg = /* @__PURE__ */ new Set(), Zg = /* @__PURE__ */ new Set(), eS = /* @__PURE__ */ new Set(), tS = /* @__PURE__ */ new Set(), Dp = /* @__PURE__ */ new Set();
      var JC = /* @__PURE__ */ new Set();
      Tm = function(e, t) {
        if (!(e === null || typeof e == "function")) {
          var a = t + "_" + e;
          JC.has(a) || (JC.add(a), S("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e));
        }
      }, ZC = function(e, t) {
        if (t === void 0) {
          var a = Tt(e) || "Component";
          Zg.has(a) || (Zg.add(a), S("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", a));
        }
      }, Object.defineProperty(Wg, "_processChildContext", {
        enumerable: !1,
        value: function() {
          throw new Error("_processChildContext is not available in React 16+. This likely means you have multiple copies of React and are attempting to nest a React 15 tree inside a React 16 tree using unstable_renderSubtreeIntoContainer, which isn't supported. Try to make sure you have only one copy of React (and ideally, switch to ReactDOM.createPortal).");
        }
      }), Object.freeze(Wg);
    }
    function nS(e, t, a, i) {
      var u = e.memoizedState, s = a(i, u);
      {
        if (e.mode & Wt) {
          mn(!0);
          try {
            s = a(i, u);
          } finally {
            mn(!1);
          }
        }
        ZC(t, s);
      }
      var f = s == null ? u : Ke({}, u, s);
      if (e.memoizedState = f, e.lanes === $) {
        var p = e.updateQueue;
        p.baseState = f;
      }
    }
    var rS = {
      isMounted: Ov,
      enqueueSetState: function(e, t, a) {
        var i = fo(e), u = Ea(), s = Vo(i), f = Hu(u, s);
        f.payload = t, a != null && (Tm(a, "setState"), f.callback = a);
        var p = No(i, f, s);
        p !== null && (mr(p, i, s, u), Zh(p, i, s)), ps(i, s);
      },
      enqueueReplaceState: function(e, t, a) {
        var i = fo(e), u = Ea(), s = Vo(i), f = Hu(u, s);
        f.tag = mC, f.payload = t, a != null && (Tm(a, "replaceState"), f.callback = a);
        var p = No(i, f, s);
        p !== null && (mr(p, i, s, u), Zh(p, i, s)), ps(i, s);
      },
      enqueueForceUpdate: function(e, t) {
        var a = fo(e), i = Ea(), u = Vo(a), s = Hu(i, u);
        s.tag = qh, t != null && (Tm(t, "forceUpdate"), s.callback = t);
        var f = No(a, s, u);
        f !== null && (mr(f, a, u, i), Zh(f, a, u)), Lc(a, u);
      }
    };
    function e0(e, t, a, i, u, s, f) {
      var p = e.stateNode;
      if (typeof p.shouldComponentUpdate == "function") {
        var v = p.shouldComponentUpdate(i, s, f);
        {
          if (e.mode & Wt) {
            mn(!0);
            try {
              v = p.shouldComponentUpdate(i, s, f);
            } finally {
              mn(!1);
            }
          }
          v === void 0 && S("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.", Tt(t) || "Component");
        }
        return v;
      }
      return t.prototype && t.prototype.isPureReactComponent ? !ye(a, i) || !ye(u, s) : !0;
    }
    function Qw(e, t, a) {
      var i = e.stateNode;
      {
        var u = Tt(t) || "Component", s = i.render;
        s || (t.prototype && typeof t.prototype.render == "function" ? S("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?", u) : S("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.", u)), i.getInitialState && !i.getInitialState.isReactClassApproved && !i.state && S("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", u), i.getDefaultProps && !i.getDefaultProps.isReactClassApproved && S("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", u), i.propTypes && S("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.", u), i.contextType && S("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", u), t.childContextTypes && !Dp.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
        // this one.
        (e.mode & Wt) === De && (Dp.add(t), S(`%s uses the legacy childContextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() instead

.Learn more about this warning here: https://reactjs.org/link/legacy-context`, u)), t.contextTypes && !Dp.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
        // this one.
        (e.mode & Wt) === De && (Dp.add(t), S(`%s uses the legacy contextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() with static contextType instead.

Learn more about this warning here: https://reactjs.org/link/legacy-context`, u)), i.contextTypes && S("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.", u), t.contextType && t.contextTypes && !eS.has(t) && (eS.add(t), S("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.", u)), typeof i.componentShouldUpdate == "function" && S("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", u), t.prototype && t.prototype.isPureReactComponent && typeof i.shouldComponentUpdate < "u" && S("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", Tt(t) || "A pure component"), typeof i.componentDidUnmount == "function" && S("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", u), typeof i.componentDidReceiveProps == "function" && S("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", u), typeof i.componentWillRecieveProps == "function" && S("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", u), typeof i.UNSAFE_componentWillRecieveProps == "function" && S("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", u);
        var f = i.props !== a;
        i.props !== void 0 && f && S("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", u, u), i.defaultProps && S("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", u, u), typeof i.getSnapshotBeforeUpdate == "function" && typeof i.componentDidUpdate != "function" && !Xg.has(t) && (Xg.add(t), S("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", Tt(t))), typeof i.getDerivedStateFromProps == "function" && S("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", u), typeof i.getDerivedStateFromError == "function" && S("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", u), typeof t.getSnapshotBeforeUpdate == "function" && S("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", u);
        var p = i.state;
        p && (typeof p != "object" || tt(p)) && S("%s.state: must be set to an object or null", u), typeof i.getChildContext == "function" && typeof t.childContextTypes != "object" && S("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", u);
      }
    }
    function t0(e, t) {
      t.updater = rS, e.stateNode = t, pu(t, e), t._reactInternalInstance = Wg;
    }
    function n0(e, t, a) {
      var i = !1, u = li, s = li, f = t.contextType;
      if ("contextType" in t) {
        var p = (
          // Allow null for conditional declaration
          f === null || f !== void 0 && f.$$typeof === R && f._context === void 0
        );
        if (!p && !tS.has(t)) {
          tS.add(t);
          var v = "";
          f === void 0 ? v = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof f != "object" ? v = " However, it is set to a " + typeof f + "." : f.$$typeof === pi ? v = " Did you accidentally pass the Context.Provider instead?" : f._context !== void 0 ? v = " Did you accidentally pass the Context.Consumer instead?" : v = " However, it is set to an object with keys {" + Object.keys(f).join(", ") + "}.", S("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", Tt(t) || "Component", v);
        }
      }
      if (typeof f == "object" && f !== null)
        s = er(f);
      else {
        u = Cf(e, t, !0);
        var y = t.contextTypes;
        i = y != null, s = i ? Rf(e, u) : li;
      }
      var g = new t(a, s);
      if (e.mode & Wt) {
        mn(!0);
        try {
          g = new t(a, s);
        } finally {
          mn(!1);
        }
      }
      var b = e.memoizedState = g.state !== null && g.state !== void 0 ? g.state : null;
      t0(e, g);
      {
        if (typeof t.getDerivedStateFromProps == "function" && b === null) {
          var w = Tt(t) || "Component";
          qg.has(w) || (qg.add(w), S("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", w, g.state === null ? "null" : "undefined", w));
        }
        if (typeof t.getDerivedStateFromProps == "function" || typeof g.getSnapshotBeforeUpdate == "function") {
          var M = null, A = null, j = null;
          if (typeof g.componentWillMount == "function" && g.componentWillMount.__suppressDeprecationWarning !== !0 ? M = "componentWillMount" : typeof g.UNSAFE_componentWillMount == "function" && (M = "UNSAFE_componentWillMount"), typeof g.componentWillReceiveProps == "function" && g.componentWillReceiveProps.__suppressDeprecationWarning !== !0 ? A = "componentWillReceiveProps" : typeof g.UNSAFE_componentWillReceiveProps == "function" && (A = "UNSAFE_componentWillReceiveProps"), typeof g.componentWillUpdate == "function" && g.componentWillUpdate.__suppressDeprecationWarning !== !0 ? j = "componentWillUpdate" : typeof g.UNSAFE_componentWillUpdate == "function" && (j = "UNSAFE_componentWillUpdate"), M !== null || A !== null || j !== null) {
            var le = Tt(t) || "Component", Le = typeof t.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
            Kg.has(le) || (Kg.add(le), S(`Unsafe legacy lifecycles will not be called for components using new component APIs.

%s uses %s but also contains the following legacy lifecycles:%s%s%s

The above lifecycles should be removed. Learn more about this warning here:
https://reactjs.org/link/unsafe-component-lifecycles`, le, Le, M !== null ? `
  ` + M : "", A !== null ? `
  ` + A : "", j !== null ? `
  ` + j : ""));
          }
        }
      }
      return i && IE(e, u, s), g;
    }
    function Ww(e, t) {
      var a = t.state;
      typeof t.componentWillMount == "function" && t.componentWillMount(), typeof t.UNSAFE_componentWillMount == "function" && t.UNSAFE_componentWillMount(), a !== t.state && (S("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", Ve(e) || "Component"), rS.enqueueReplaceState(t, t.state, null));
    }
    function r0(e, t, a, i) {
      var u = t.state;
      if (typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(a, i), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(a, i), t.state !== u) {
        {
          var s = Ve(e) || "Component";
          Gg.has(s) || (Gg.add(s), S("%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", s));
        }
        rS.enqueueReplaceState(t, t.state, null);
      }
    }
    function aS(e, t, a, i) {
      Qw(e, t, a);
      var u = e.stateNode;
      u.props = a, u.state = e.memoizedState, u.refs = {}, pg(e);
      var s = t.contextType;
      if (typeof s == "object" && s !== null)
        u.context = er(s);
      else {
        var f = Cf(e, t, !0);
        u.context = Rf(e, f);
      }
      {
        if (u.state === a) {
          var p = Tt(t) || "Component";
          Jg.has(p) || (Jg.add(p), S("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", p));
        }
        e.mode & Wt && rl.recordLegacyContextWarning(e, u), rl.recordUnsafeLifecycleWarnings(e, u);
      }
      u.state = e.memoizedState;
      var v = t.getDerivedStateFromProps;
      if (typeof v == "function" && (nS(e, t, v, a), u.state = e.memoizedState), typeof t.getDerivedStateFromProps != "function" && typeof u.getSnapshotBeforeUpdate != "function" && (typeof u.UNSAFE_componentWillMount == "function" || typeof u.componentWillMount == "function") && (Ww(e, u), Jh(e, a, u, i), u.state = e.memoizedState), typeof u.componentDidMount == "function") {
        var y = yt;
        y |= Qi, (e.mode & Lt) !== De && (y |= bl), e.flags |= y;
      }
    }
    function Gw(e, t, a, i) {
      var u = e.stateNode, s = e.memoizedProps;
      u.props = s;
      var f = u.context, p = t.contextType, v = li;
      if (typeof p == "object" && p !== null)
        v = er(p);
      else {
        var y = Cf(e, t, !0);
        v = Rf(e, y);
      }
      var g = t.getDerivedStateFromProps, b = typeof g == "function" || typeof u.getSnapshotBeforeUpdate == "function";
      !b && (typeof u.UNSAFE_componentWillReceiveProps == "function" || typeof u.componentWillReceiveProps == "function") && (s !== a || f !== v) && r0(e, u, a, v), gC();
      var w = e.memoizedState, M = u.state = w;
      if (Jh(e, a, u, i), M = e.memoizedState, s === a && w === M && !zh() && !em()) {
        if (typeof u.componentDidMount == "function") {
          var A = yt;
          A |= Qi, (e.mode & Lt) !== De && (A |= bl), e.flags |= A;
        }
        return !1;
      }
      typeof g == "function" && (nS(e, t, g, a), M = e.memoizedState);
      var j = em() || e0(e, t, s, a, w, M, v);
      if (j) {
        if (!b && (typeof u.UNSAFE_componentWillMount == "function" || typeof u.componentWillMount == "function") && (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function") {
          var le = yt;
          le |= Qi, (e.mode & Lt) !== De && (le |= bl), e.flags |= le;
        }
      } else {
        if (typeof u.componentDidMount == "function") {
          var Le = yt;
          Le |= Qi, (e.mode & Lt) !== De && (Le |= bl), e.flags |= Le;
        }
        e.memoizedProps = a, e.memoizedState = M;
      }
      return u.props = a, u.state = M, u.context = v, j;
    }
    function qw(e, t, a, i, u) {
      var s = t.stateNode;
      yC(e, t);
      var f = t.memoizedProps, p = t.type === t.elementType ? f : ll(t.type, f);
      s.props = p;
      var v = t.pendingProps, y = s.context, g = a.contextType, b = li;
      if (typeof g == "object" && g !== null)
        b = er(g);
      else {
        var w = Cf(t, a, !0);
        b = Rf(t, w);
      }
      var M = a.getDerivedStateFromProps, A = typeof M == "function" || typeof s.getSnapshotBeforeUpdate == "function";
      !A && (typeof s.UNSAFE_componentWillReceiveProps == "function" || typeof s.componentWillReceiveProps == "function") && (f !== v || y !== b) && r0(t, s, i, b), gC();
      var j = t.memoizedState, le = s.state = j;
      if (Jh(t, i, s, u), le = t.memoizedState, f === v && j === le && !zh() && !em() && !Re)
        return typeof s.componentDidUpdate == "function" && (f !== e.memoizedProps || j !== e.memoizedState) && (t.flags |= yt), typeof s.getSnapshotBeforeUpdate == "function" && (f !== e.memoizedProps || j !== e.memoizedState) && (t.flags |= Yn), !1;
      typeof M == "function" && (nS(t, a, M, i), le = t.memoizedState);
      var Le = em() || e0(t, a, p, i, j, le, b) || // TODO: In some cases, we'll end up checking if context has changed twice,
      // both before and after `shouldComponentUpdate` has been called. Not ideal,
      // but I'm loath to refactor this function. This only happens for memoized
      // components so it's not that common.
      Re;
      return Le ? (!A && (typeof s.UNSAFE_componentWillUpdate == "function" || typeof s.componentWillUpdate == "function") && (typeof s.componentWillUpdate == "function" && s.componentWillUpdate(i, le, b), typeof s.UNSAFE_componentWillUpdate == "function" && s.UNSAFE_componentWillUpdate(i, le, b)), typeof s.componentDidUpdate == "function" && (t.flags |= yt), typeof s.getSnapshotBeforeUpdate == "function" && (t.flags |= Yn)) : (typeof s.componentDidUpdate == "function" && (f !== e.memoizedProps || j !== e.memoizedState) && (t.flags |= yt), typeof s.getSnapshotBeforeUpdate == "function" && (f !== e.memoizedProps || j !== e.memoizedState) && (t.flags |= Yn), t.memoizedProps = i, t.memoizedState = le), s.props = i, s.state = le, s.context = b, Le;
    }
    function Zs(e, t) {
      return {
        value: e,
        source: t,
        stack: Pi(t),
        digest: null
      };
    }
    function iS(e, t, a) {
      return {
        value: e,
        source: null,
        stack: a ?? null,
        digest: t ?? null
      };
    }
    function Xw(e, t) {
      return !0;
    }
    function lS(e, t) {
      try {
        var a = Xw(e, t);
        if (a === !1)
          return;
        var i = t.value, u = t.source, s = t.stack, f = s !== null ? s : "";
        if (i != null && i._suppressLogging) {
          if (e.tag === ve)
            return;
          console.error(i);
        }
        var p = u ? Ve(u) : null, v = p ? "The above error occurred in the <" + p + "> component:" : "The above error occurred in one of your React components:", y;
        if (e.tag === ee)
          y = `Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.`;
        else {
          var g = Ve(e) || "Anonymous";
          y = "React will try to recreate this component tree from scratch " + ("using the error boundary you provided, " + g + ".");
        }
        var b = v + `
` + f + `

` + ("" + y);
        console.error(b);
      } catch (w) {
        setTimeout(function() {
          throw w;
        });
      }
    }
    var Kw = typeof WeakMap == "function" ? WeakMap : Map;
    function a0(e, t, a) {
      var i = Hu(Xt, a);
      i.tag = fg, i.payload = {
        element: null
      };
      var u = t.value;
      return i.callback = function() {
        $b(u), lS(e, t);
      }, i;
    }
    function uS(e, t, a) {
      var i = Hu(Xt, a);
      i.tag = fg;
      var u = e.type.getDerivedStateFromError;
      if (typeof u == "function") {
        var s = t.value;
        i.payload = function() {
          return u(s);
        }, i.callback = function() {
          hR(e), lS(e, t);
        };
      }
      var f = e.stateNode;
      return f !== null && typeof f.componentDidCatch == "function" && (i.callback = function() {
        hR(e), lS(e, t), typeof u != "function" && Vb(this);
        var v = t.value, y = t.stack;
        this.componentDidCatch(v, {
          componentStack: y !== null ? y : ""
        }), typeof u != "function" && (Zr(e.lanes, Ae) || S("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.", Ve(e) || "Unknown"));
      }), i;
    }
    function i0(e, t, a) {
      var i = e.pingCache, u;
      if (i === null ? (i = e.pingCache = new Kw(), u = /* @__PURE__ */ new Set(), i.set(t, u)) : (u = i.get(t), u === void 0 && (u = /* @__PURE__ */ new Set(), i.set(t, u))), !u.has(a)) {
        u.add(a);
        var s = Yb.bind(null, e, t, a);
        Xr && Ip(e, a), t.then(s, s);
      }
    }
    function Zw(e, t, a, i) {
      var u = e.updateQueue;
      if (u === null) {
        var s = /* @__PURE__ */ new Set();
        s.add(a), e.updateQueue = s;
      } else
        u.add(a);
    }
    function Jw(e, t) {
      var a = e.tag;
      if ((e.mode & it) === De && (a === de || a === Ie || a === Fe)) {
        var i = e.alternate;
        i ? (e.updateQueue = i.updateQueue, e.memoizedState = i.memoizedState, e.lanes = i.lanes) : (e.updateQueue = null, e.memoizedState = null);
      }
    }
    function l0(e) {
      var t = e;
      do {
        if (t.tag === be && Nw(t))
          return t;
        t = t.return;
      } while (t !== null);
      return null;
    }
    function u0(e, t, a, i, u) {
      if ((e.mode & it) === De) {
        if (e === t)
          e.flags |= Xn;
        else {
          if (e.flags |= xe, a.flags |= Tc, a.flags &= -52805, a.tag === ve) {
            var s = a.alternate;
            if (s === null)
              a.tag = Ft;
            else {
              var f = Hu(Xt, Ae);
              f.tag = qh, No(a, f, Ae);
            }
          }
          a.lanes = qe(a.lanes, Ae);
        }
        return e;
      }
      return e.flags |= Xn, e.lanes = u, e;
    }
    function ex(e, t, a, i, u) {
      if (a.flags |= us, Xr && Ip(e, u), i !== null && typeof i == "object" && typeof i.then == "function") {
        var s = i;
        Jw(a), Ur() && a.mode & it && ZE();
        var f = l0(t);
        if (f !== null) {
          f.flags &= ~Er, u0(f, t, a, e, u), f.mode & it && i0(e, s, u), Zw(f, e, s);
          return;
        } else {
          if (!jv(u)) {
            i0(e, s, u), PS();
            return;
          }
          var p = new Error("A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.");
          i = p;
        }
      } else if (Ur() && a.mode & it) {
        ZE();
        var v = l0(t);
        if (v !== null) {
          (v.flags & Xn) === _e && (v.flags |= Er), u0(v, t, a, e, u), Jy(Zs(i, a));
          return;
        }
      }
      i = Zs(i, a), Nb(i);
      var y = t;
      do {
        switch (y.tag) {
          case ee: {
            var g = i;
            y.flags |= Xn;
            var b = Rs(u);
            y.lanes = qe(y.lanes, b);
            var w = a0(y, g, b);
            vg(y, w);
            return;
          }
          case ve:
            var M = i, A = y.type, j = y.stateNode;
            if ((y.flags & xe) === _e && (typeof A.getDerivedStateFromError == "function" || j !== null && typeof j.componentDidCatch == "function" && !lR(j))) {
              y.flags |= Xn;
              var le = Rs(u);
              y.lanes = qe(y.lanes, le);
              var Le = uS(y, M, le);
              vg(y, Le);
              return;
            }
            break;
        }
        y = y.return;
      } while (y !== null);
    }
    function tx() {
      return null;
    }
    var kp = z.ReactCurrentOwner, ul = !1, oS, Op, sS, cS, fS, Js, dS, wm, Lp;
    oS = {}, Op = {}, sS = {}, cS = {}, fS = {}, Js = !1, dS = {}, wm = {}, Lp = {};
    function ga(e, t, a, i) {
      e === null ? t.child = cC(t, null, a, i) : t.child = bf(t, e.child, a, i);
    }
    function nx(e, t, a, i) {
      t.child = bf(t, e.child, null, i), t.child = bf(t, null, a, i);
    }
    function o0(e, t, a, i, u) {
      if (t.type !== t.elementType) {
        var s = a.propTypes;
        s && tl(
          s,
          i,
          // Resolved props
          "prop",
          Tt(a)
        );
      }
      var f = a.render, p = t.ref, v, y;
      Df(t, u), va(t);
      {
        if (kp.current = t, $n(!0), v = zf(e, t, f, i, p, u), y = Uf(), t.mode & Wt) {
          mn(!0);
          try {
            v = zf(e, t, f, i, p, u), y = Uf();
          } finally {
            mn(!1);
          }
        }
        $n(!1);
      }
      return ha(), e !== null && !ul ? (wC(e, t, u), Pu(e, t, u)) : (Ur() && y && Wy(t), t.flags |= ti, ga(e, t, v, u), t.child);
    }
    function s0(e, t, a, i, u) {
      if (e === null) {
        var s = a.type;
        if (u_(s) && a.compare === null && // SimpleMemoComponent codepath doesn't resolve outer props either.
        a.defaultProps === void 0) {
          var f = s;
          return f = $f(s), t.tag = Fe, t.type = f, hS(t, s), c0(e, t, f, i, u);
        }
        {
          var p = s.propTypes;
          if (p && tl(
            p,
            i,
            // Resolved props
            "prop",
            Tt(s)
          ), a.defaultProps !== void 0) {
            var v = Tt(s) || "Unknown";
            Lp[v] || (S("%s: Support for defaultProps will be removed from memo components in a future major release. Use JavaScript default parameters instead.", v), Lp[v] = !0);
          }
        }
        var y = KS(a.type, null, i, t, t.mode, u);
        return y.ref = t.ref, y.return = t, t.child = y, y;
      }
      {
        var g = a.type, b = g.propTypes;
        b && tl(
          b,
          i,
          // Resolved props
          "prop",
          Tt(g)
        );
      }
      var w = e.child, M = CS(e, u);
      if (!M) {
        var A = w.memoizedProps, j = a.compare;
        if (j = j !== null ? j : ye, j(A, i) && e.ref === t.ref)
          return Pu(e, t, u);
      }
      t.flags |= ti;
      var le = ac(w, i);
      return le.ref = t.ref, le.return = t, t.child = le, le;
    }
    function c0(e, t, a, i, u) {
      if (t.type !== t.elementType) {
        var s = t.elementType;
        if (s.$$typeof === Be) {
          var f = s, p = f._payload, v = f._init;
          try {
            s = v(p);
          } catch {
            s = null;
          }
          var y = s && s.propTypes;
          y && tl(
            y,
            i,
            // Resolved (SimpleMemoComponent has no defaultProps)
            "prop",
            Tt(s)
          );
        }
      }
      if (e !== null) {
        var g = e.memoizedProps;
        if (ye(g, i) && e.ref === t.ref && // Prevent bailout if the implementation changed due to hot reload.
        t.type === e.type)
          if (ul = !1, t.pendingProps = i = g, CS(e, u))
            (e.flags & Tc) !== _e && (ul = !0);
          else return t.lanes = e.lanes, Pu(e, t, u);
      }
      return pS(e, t, a, i, u);
    }
    function f0(e, t, a) {
      var i = t.pendingProps, u = i.children, s = e !== null ? e.memoizedState : null;
      if (i.mode === "hidden" || ne)
        if ((t.mode & it) === De) {
          var f = {
            baseLanes: $,
            cachePool: null,
            transitions: null
          };
          t.memoizedState = f, Fm(t, a);
        } else if (Zr(a, Kr)) {
          var b = {
            baseLanes: $,
            cachePool: null,
            transitions: null
          };
          t.memoizedState = b;
          var w = s !== null ? s.baseLanes : a;
          Fm(t, w);
        } else {
          var p = null, v;
          if (s !== null) {
            var y = s.baseLanes;
            v = qe(y, a);
          } else
            v = a;
          t.lanes = t.childLanes = Kr;
          var g = {
            baseLanes: v,
            cachePool: p,
            transitions: null
          };
          return t.memoizedState = g, t.updateQueue = null, Fm(t, v), null;
        }
      else {
        var M;
        s !== null ? (M = qe(s.baseLanes, a), t.memoizedState = null) : M = a, Fm(t, M);
      }
      return ga(e, t, u, a), t.child;
    }
    function rx(e, t, a) {
      var i = t.pendingProps;
      return ga(e, t, i, a), t.child;
    }
    function ax(e, t, a) {
      var i = t.pendingProps.children;
      return ga(e, t, i, a), t.child;
    }
    function ix(e, t, a) {
      {
        t.flags |= yt;
        {
          var i = t.stateNode;
          i.effectDuration = 0, i.passiveEffectDuration = 0;
        }
      }
      var u = t.pendingProps, s = u.children;
      return ga(e, t, s, a), t.child;
    }
    function d0(e, t) {
      var a = t.ref;
      (e === null && a !== null || e !== null && e.ref !== a) && (t.flags |= Sn, t.flags |= vo);
    }
    function pS(e, t, a, i, u) {
      if (t.type !== t.elementType) {
        var s = a.propTypes;
        s && tl(
          s,
          i,
          // Resolved props
          "prop",
          Tt(a)
        );
      }
      var f;
      {
        var p = Cf(t, a, !0);
        f = Rf(t, p);
      }
      var v, y;
      Df(t, u), va(t);
      {
        if (kp.current = t, $n(!0), v = zf(e, t, a, i, f, u), y = Uf(), t.mode & Wt) {
          mn(!0);
          try {
            v = zf(e, t, a, i, f, u), y = Uf();
          } finally {
            mn(!1);
          }
        }
        $n(!1);
      }
      return ha(), e !== null && !ul ? (wC(e, t, u), Pu(e, t, u)) : (Ur() && y && Wy(t), t.flags |= ti, ga(e, t, v, u), t.child);
    }
    function p0(e, t, a, i, u) {
      {
        switch (R_(t)) {
          case !1: {
            var s = t.stateNode, f = t.type, p = new f(t.memoizedProps, s.context), v = p.state;
            s.updater.enqueueSetState(s, v, null);
            break;
          }
          case !0: {
            t.flags |= xe, t.flags |= Xn;
            var y = new Error("Simulated error coming from DevTools"), g = Rs(u);
            t.lanes = qe(t.lanes, g);
            var b = uS(t, Zs(y, t), g);
            vg(t, b);
            break;
          }
        }
        if (t.type !== t.elementType) {
          var w = a.propTypes;
          w && tl(
            w,
            i,
            // Resolved props
            "prop",
            Tt(a)
          );
        }
      }
      var M;
      $l(a) ? (M = !0, Ah(t)) : M = !1, Df(t, u);
      var A = t.stateNode, j;
      A === null ? (bm(e, t), n0(t, a, i), aS(t, a, i, u), j = !0) : e === null ? j = Gw(t, a, i, u) : j = qw(e, t, a, i, u);
      var le = vS(e, t, a, j, M, u);
      {
        var Le = t.stateNode;
        j && Le.props !== i && (Js || S("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", Ve(t) || "a component"), Js = !0);
      }
      return le;
    }
    function vS(e, t, a, i, u, s) {
      d0(e, t);
      var f = (t.flags & xe) !== _e;
      if (!i && !f)
        return u && GE(t, a, !1), Pu(e, t, s);
      var p = t.stateNode;
      kp.current = t;
      var v;
      if (f && typeof a.getDerivedStateFromError != "function")
        v = null, KC();
      else {
        va(t);
        {
          if ($n(!0), v = p.render(), t.mode & Wt) {
            mn(!0);
            try {
              p.render();
            } finally {
              mn(!1);
            }
          }
          $n(!1);
        }
        ha();
      }
      return t.flags |= ti, e !== null && f ? nx(e, t, v, s) : ga(e, t, v, s), t.memoizedState = p.state, u && GE(t, a, !0), t.child;
    }
    function v0(e) {
      var t = e.stateNode;
      t.pendingContext ? QE(e, t.pendingContext, t.pendingContext !== t.context) : t.context && QE(e, t.context, !1), hg(e, t.containerInfo);
    }
    function lx(e, t, a) {
      if (v0(t), e === null)
        throw new Error("Should have a current fiber. This is a bug in React.");
      var i = t.pendingProps, u = t.memoizedState, s = u.element;
      yC(e, t), Jh(t, i, null, a);
      var f = t.memoizedState;
      t.stateNode;
      var p = f.element;
      if (u.isDehydrated) {
        var v = {
          element: p,
          isDehydrated: !1,
          cache: f.cache,
          pendingSuspenseBoundaries: f.pendingSuspenseBoundaries,
          transitions: f.transitions
        }, y = t.updateQueue;
        if (y.baseState = v, t.memoizedState = v, t.flags & Er) {
          var g = Zs(new Error("There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering."), t);
          return h0(e, t, p, a, g);
        } else if (p !== s) {
          var b = Zs(new Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."), t);
          return h0(e, t, p, a, b);
        } else {
          sw(t);
          var w = cC(t, null, p, a);
          t.child = w;
          for (var M = w; M; )
            M.flags = M.flags & ~hn | Wr, M = M.sibling;
        }
      } else {
        if (xf(), p === s)
          return Pu(e, t, a);
        ga(e, t, p, a);
      }
      return t.child;
    }
    function h0(e, t, a, i, u) {
      return xf(), Jy(u), t.flags |= Er, ga(e, t, a, i), t.child;
    }
    function ux(e, t, a) {
      CC(t), e === null && Zy(t);
      var i = t.type, u = t.pendingProps, s = e !== null ? e.memoizedProps : null, f = u.children, p = Ny(i, u);
      return p ? f = null : s !== null && Ny(i, s) && (t.flags |= ka), d0(e, t), ga(e, t, f, a), t.child;
    }
    function ox(e, t) {
      return e === null && Zy(t), null;
    }
    function sx(e, t, a, i) {
      bm(e, t);
      var u = t.pendingProps, s = a, f = s._payload, p = s._init, v = p(f);
      t.type = v;
      var y = t.tag = o_(v), g = ll(v, u), b;
      switch (y) {
        case de:
          return hS(t, v), t.type = v = $f(v), b = pS(null, t, v, g, i), b;
        case ve:
          return t.type = v = IS(v), b = p0(null, t, v, g, i), b;
        case Ie:
          return t.type = v = QS(v), b = o0(null, t, v, g, i), b;
        case ut: {
          if (t.type !== t.elementType) {
            var w = v.propTypes;
            w && tl(
              w,
              g,
              // Resolved for outer only
              "prop",
              Tt(v)
            );
          }
          return b = s0(
            null,
            t,
            v,
            ll(v.type, g),
            // The inner type can have defaults too
            i
          ), b;
        }
      }
      var M = "";
      throw v !== null && typeof v == "object" && v.$$typeof === Be && (M = " Did you wrap a component in React.lazy() more than once?"), new Error("Element type is invalid. Received a promise that resolves to: " + v + ". " + ("Lazy element type must resolve to a class or function." + M));
    }
    function cx(e, t, a, i, u) {
      bm(e, t), t.tag = ve;
      var s;
      return $l(a) ? (s = !0, Ah(t)) : s = !1, Df(t, u), n0(t, a, i), aS(t, a, i, u), vS(null, t, a, !0, s, u);
    }
    function fx(e, t, a, i) {
      bm(e, t);
      var u = t.pendingProps, s;
      {
        var f = Cf(t, a, !1);
        s = Rf(t, f);
      }
      Df(t, i);
      var p, v;
      va(t);
      {
        if (a.prototype && typeof a.prototype.render == "function") {
          var y = Tt(a) || "Unknown";
          oS[y] || (S("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", y, y), oS[y] = !0);
        }
        t.mode & Wt && rl.recordLegacyContextWarning(t, null), $n(!0), kp.current = t, p = zf(null, t, a, u, s, i), v = Uf(), $n(!1);
      }
      if (ha(), t.flags |= ti, typeof p == "object" && p !== null && typeof p.render == "function" && p.$$typeof === void 0) {
        var g = Tt(a) || "Unknown";
        Op[g] || (S("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", g, g, g), Op[g] = !0);
      }
      if (
        // Run these checks in production only if the flag is off.
        // Eventually we'll delete this branch altogether.
        typeof p == "object" && p !== null && typeof p.render == "function" && p.$$typeof === void 0
      ) {
        {
          var b = Tt(a) || "Unknown";
          Op[b] || (S("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", b, b, b), Op[b] = !0);
        }
        t.tag = ve, t.memoizedState = null, t.updateQueue = null;
        var w = !1;
        return $l(a) ? (w = !0, Ah(t)) : w = !1, t.memoizedState = p.state !== null && p.state !== void 0 ? p.state : null, pg(t), t0(t, p), aS(t, a, u, i), vS(null, t, a, !0, w, i);
      } else {
        if (t.tag = de, t.mode & Wt) {
          mn(!0);
          try {
            p = zf(null, t, a, u, s, i), v = Uf();
          } finally {
            mn(!1);
          }
        }
        return Ur() && v && Wy(t), ga(null, t, p, i), hS(t, a), t.child;
      }
    }
    function hS(e, t) {
      {
        if (t && t.childContextTypes && S("%s(...): childContextTypes cannot be defined on a function component.", t.displayName || t.name || "Component"), e.ref !== null) {
          var a = "", i = Dr();
          i && (a += `

Check the render method of \`` + i + "`.");
          var u = i || "", s = e._debugSource;
          s && (u = s.fileName + ":" + s.lineNumber), fS[u] || (fS[u] = !0, S("Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?%s", a));
        }
        if (t.defaultProps !== void 0) {
          var f = Tt(t) || "Unknown";
          Lp[f] || (S("%s: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.", f), Lp[f] = !0);
        }
        if (typeof t.getDerivedStateFromProps == "function") {
          var p = Tt(t) || "Unknown";
          cS[p] || (S("%s: Function components do not support getDerivedStateFromProps.", p), cS[p] = !0);
        }
        if (typeof t.contextType == "object" && t.contextType !== null) {
          var v = Tt(t) || "Unknown";
          sS[v] || (S("%s: Function components do not support contextType.", v), sS[v] = !0);
        }
      }
    }
    var mS = {
      dehydrated: null,
      treeContext: null,
      retryLane: _t
    };
    function yS(e) {
      return {
        baseLanes: e,
        cachePool: tx(),
        transitions: null
      };
    }
    function dx(e, t) {
      var a = null;
      return {
        baseLanes: qe(e.baseLanes, t),
        cachePool: a,
        transitions: e.transitions
      };
    }
    function px(e, t, a, i) {
      if (t !== null) {
        var u = t.memoizedState;
        if (u === null)
          return !1;
      }
      return gg(e, Ep);
    }
    function vx(e, t) {
      return Ts(e.childLanes, t);
    }
    function m0(e, t, a) {
      var i = t.pendingProps;
      T_(t) && (t.flags |= xe);
      var u = al.current, s = !1, f = (t.flags & xe) !== _e;
      if (f || px(u, e) ? (s = !0, t.flags &= ~xe) : (e === null || e.memoizedState !== null) && (u = Mw(u, TC)), u = Of(u), Uo(t, u), e === null) {
        Zy(t);
        var p = t.memoizedState;
        if (p !== null) {
          var v = p.dehydrated;
          if (v !== null)
            return Sx(t, v);
        }
        var y = i.children, g = i.fallback;
        if (s) {
          var b = hx(t, y, g, a), w = t.child;
          return w.memoizedState = yS(a), t.memoizedState = mS, b;
        } else
          return gS(t, y);
      } else {
        var M = e.memoizedState;
        if (M !== null) {
          var A = M.dehydrated;
          if (A !== null)
            return Ex(e, t, f, i, A, M, a);
        }
        if (s) {
          var j = i.fallback, le = i.children, Le = yx(e, t, le, j, a), we = t.child, Et = e.child.memoizedState;
          return we.memoizedState = Et === null ? yS(a) : dx(Et, a), we.childLanes = vx(e, a), t.memoizedState = mS, Le;
        } else {
          var vt = i.children, k = mx(e, t, vt, a);
          return t.memoizedState = null, k;
        }
      }
    }
    function gS(e, t, a) {
      var i = e.mode, u = {
        mode: "visible",
        children: t
      }, s = SS(u, i);
      return s.return = e, e.child = s, s;
    }
    function hx(e, t, a, i) {
      var u = e.mode, s = e.child, f = {
        mode: "hidden",
        children: t
      }, p, v;
      return (u & it) === De && s !== null ? (p = s, p.childLanes = $, p.pendingProps = f, e.mode & Ot && (p.actualDuration = 0, p.actualStartTime = -1, p.selfBaseDuration = 0, p.treeBaseDuration = 0), v = $o(a, u, i, null)) : (p = SS(f, u), v = $o(a, u, i, null)), p.return = e, v.return = e, p.sibling = v, e.child = p, v;
    }
    function SS(e, t, a) {
      return yR(e, t, $, null);
    }
    function y0(e, t) {
      return ac(e, t);
    }
    function mx(e, t, a, i) {
      var u = e.child, s = u.sibling, f = y0(u, {
        mode: "visible",
        children: a
      });
      if ((t.mode & it) === De && (f.lanes = i), f.return = t, f.sibling = null, s !== null) {
        var p = t.deletions;
        p === null ? (t.deletions = [s], t.flags |= Da) : p.push(s);
      }
      return t.child = f, f;
    }
    function yx(e, t, a, i, u) {
      var s = t.mode, f = e.child, p = f.sibling, v = {
        mode: "hidden",
        children: a
      }, y;
      if (
        // In legacy mode, we commit the primary tree as if it successfully
        // completed, even though it's in an inconsistent state.
        (s & it) === De && // Make sure we're on the second pass, i.e. the primary child fragment was
        // already cloned. In legacy mode, the only case where this isn't true is
        // when DevTools forces us to display a fallback; we skip the first render
        // pass entirely and go straight to rendering the fallback. (In Concurrent
        // Mode, SuspenseList can also trigger this scenario, but this is a legacy-
        // only codepath.)
        t.child !== f
      ) {
        var g = t.child;
        y = g, y.childLanes = $, y.pendingProps = v, t.mode & Ot && (y.actualDuration = 0, y.actualStartTime = -1, y.selfBaseDuration = f.selfBaseDuration, y.treeBaseDuration = f.treeBaseDuration), t.deletions = null;
      } else
        y = y0(f, v), y.subtreeFlags = f.subtreeFlags & Nn;
      var b;
      return p !== null ? b = ac(p, i) : (b = $o(i, s, u, null), b.flags |= hn), b.return = t, y.return = t, y.sibling = b, t.child = y, b;
    }
    function xm(e, t, a, i) {
      i !== null && Jy(i), bf(t, e.child, null, a);
      var u = t.pendingProps, s = u.children, f = gS(t, s);
      return f.flags |= hn, t.memoizedState = null, f;
    }
    function gx(e, t, a, i, u) {
      var s = t.mode, f = {
        mode: "visible",
        children: a
      }, p = SS(f, s), v = $o(i, s, u, null);
      return v.flags |= hn, p.return = t, v.return = t, p.sibling = v, t.child = p, (t.mode & it) !== De && bf(t, e.child, null, u), v;
    }
    function Sx(e, t, a) {
      return (e.mode & it) === De ? (S("Cannot hydrate Suspense in legacy mode. Switch from ReactDOM.hydrate(element, container) to ReactDOMClient.hydrateRoot(container, <App />).render(element) or remove the Suspense components from the server rendered components."), e.lanes = Ae) : Fy(t) ? e.lanes = Cr : e.lanes = Kr, null;
    }
    function Ex(e, t, a, i, u, s, f) {
      if (a)
        if (t.flags & Er) {
          t.flags &= ~Er;
          var k = iS(new Error("There was an error while hydrating this Suspense boundary. Switched to client rendering."));
          return xm(e, t, f, k);
        } else {
          if (t.memoizedState !== null)
            return t.child = e.child, t.flags |= xe, null;
          var H = i.children, O = i.fallback, q = gx(e, t, H, O, f), fe = t.child;
          return fe.memoizedState = yS(f), t.memoizedState = mS, q;
        }
      else {
        if (uw(), (t.mode & it) === De)
          return xm(
            e,
            t,
            f,
            // TODO: When we delete legacy mode, we should make this error argument
            // required — every concurrent mode path that causes hydration to
            // de-opt to client rendering should have an error message.
            null
          );
        if (Fy(u)) {
          var p, v, y;
          {
            var g = w1(u);
            p = g.digest, v = g.message, y = g.stack;
          }
          var b;
          v ? b = new Error(v) : b = new Error("The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering.");
          var w = iS(b, p, y);
          return xm(e, t, f, w);
        }
        var M = Zr(f, e.childLanes);
        if (ul || M) {
          var A = Am();
          if (A !== null) {
            var j = zd(A, f);
            if (j !== _t && j !== s.retryLane) {
              s.retryLane = j;
              var le = Xt;
              ja(e, j), mr(A, e, j, le);
            }
          }
          PS();
          var Le = iS(new Error("This Suspense boundary received an update before it finished hydrating. This caused the boundary to switch to client rendering. The usual way to fix this is to wrap the original update in startTransition."));
          return xm(e, t, f, Le);
        } else if (PE(u)) {
          t.flags |= xe, t.child = e.child;
          var we = Ib.bind(null, e);
          return x1(u, we), null;
        } else {
          cw(t, u, s.treeContext);
          var Et = i.children, vt = gS(t, Et);
          return vt.flags |= Wr, vt;
        }
      }
    }
    function g0(e, t, a) {
      e.lanes = qe(e.lanes, t);
      var i = e.alternate;
      i !== null && (i.lanes = qe(i.lanes, t)), sg(e.return, t, a);
    }
    function Cx(e, t, a) {
      for (var i = t; i !== null; ) {
        if (i.tag === be) {
          var u = i.memoizedState;
          u !== null && g0(i, a, e);
        } else if (i.tag === an)
          g0(i, a, e);
        else if (i.child !== null) {
          i.child.return = i, i = i.child;
          continue;
        }
        if (i === e)
          return;
        for (; i.sibling === null; ) {
          if (i.return === null || i.return === e)
            return;
          i = i.return;
        }
        i.sibling.return = i.return, i = i.sibling;
      }
    }
    function Rx(e) {
      for (var t = e, a = null; t !== null; ) {
        var i = t.alternate;
        i !== null && rm(i) === null && (a = t), t = t.sibling;
      }
      return a;
    }
    function Tx(e) {
      if (e !== void 0 && e !== "forwards" && e !== "backwards" && e !== "together" && !dS[e])
        if (dS[e] = !0, typeof e == "string")
          switch (e.toLowerCase()) {
            case "together":
            case "forwards":
            case "backwards": {
              S('"%s" is not a valid value for revealOrder on <SuspenseList />. Use lowercase "%s" instead.', e, e.toLowerCase());
              break;
            }
            case "forward":
            case "backward": {
              S('"%s" is not a valid value for revealOrder on <SuspenseList />. React uses the -s suffix in the spelling. Use "%ss" instead.', e, e.toLowerCase());
              break;
            }
            default:
              S('"%s" is not a supported revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?', e);
              break;
          }
        else
          S('%s is not a supported value for revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?', e);
    }
    function wx(e, t) {
      e !== void 0 && !wm[e] && (e !== "collapsed" && e !== "hidden" ? (wm[e] = !0, S('"%s" is not a supported value for tail on <SuspenseList />. Did you mean "collapsed" or "hidden"?', e)) : t !== "forwards" && t !== "backwards" && (wm[e] = !0, S('<SuspenseList tail="%s" /> is only valid if revealOrder is "forwards" or "backwards". Did you mean to specify revealOrder="forwards"?', e)));
    }
    function S0(e, t) {
      {
        var a = tt(e), i = !a && typeof Ge(e) == "function";
        if (a || i) {
          var u = a ? "array" : "iterable";
          return S("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>", u, t, u), !1;
        }
      }
      return !0;
    }
    function xx(e, t) {
      if ((t === "forwards" || t === "backwards") && e !== void 0 && e !== null && e !== !1)
        if (tt(e)) {
          for (var a = 0; a < e.length; a++)
            if (!S0(e[a], a))
              return;
        } else {
          var i = Ge(e);
          if (typeof i == "function") {
            var u = i.call(e);
            if (u)
              for (var s = u.next(), f = 0; !s.done; s = u.next()) {
                if (!S0(s.value, f))
                  return;
                f++;
              }
          } else
            S('A single row was passed to a <SuspenseList revealOrder="%s" />. This is not useful since it needs multiple rows. Did you mean to pass multiple children or an array?', t);
        }
    }
    function ES(e, t, a, i, u) {
      var s = e.memoizedState;
      s === null ? e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: i,
        tail: a,
        tailMode: u
      } : (s.isBackwards = t, s.rendering = null, s.renderingStartTime = 0, s.last = i, s.tail = a, s.tailMode = u);
    }
    function E0(e, t, a) {
      var i = t.pendingProps, u = i.revealOrder, s = i.tail, f = i.children;
      Tx(u), wx(s, u), xx(f, u), ga(e, t, f, a);
      var p = al.current, v = gg(p, Ep);
      if (v)
        p = Sg(p, Ep), t.flags |= xe;
      else {
        var y = e !== null && (e.flags & xe) !== _e;
        y && Cx(t, t.child, a), p = Of(p);
      }
      if (Uo(t, p), (t.mode & it) === De)
        t.memoizedState = null;
      else
        switch (u) {
          case "forwards": {
            var g = Rx(t.child), b;
            g === null ? (b = t.child, t.child = null) : (b = g.sibling, g.sibling = null), ES(
              t,
              !1,
              // isBackwards
              b,
              g,
              s
            );
            break;
          }
          case "backwards": {
            var w = null, M = t.child;
            for (t.child = null; M !== null; ) {
              var A = M.alternate;
              if (A !== null && rm(A) === null) {
                t.child = M;
                break;
              }
              var j = M.sibling;
              M.sibling = w, w = M, M = j;
            }
            ES(
              t,
              !0,
              // isBackwards
              w,
              null,
              // last
              s
            );
            break;
          }
          case "together": {
            ES(
              t,
              !1,
              // isBackwards
              null,
              // tail
              null,
              // last
              void 0
            );
            break;
          }
          default:
            t.memoizedState = null;
        }
      return t.child;
    }
    function bx(e, t, a) {
      hg(t, t.stateNode.containerInfo);
      var i = t.pendingProps;
      return e === null ? t.child = bf(t, null, i, a) : ga(e, t, i, a), t.child;
    }
    var C0 = !1;
    function _x(e, t, a) {
      var i = t.type, u = i._context, s = t.pendingProps, f = t.memoizedProps, p = s.value;
      {
        "value" in s || C0 || (C0 = !0, S("The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?"));
        var v = t.type.propTypes;
        v && tl(v, s, "prop", "Context.Provider");
      }
      if (pC(t, u, p), f !== null) {
        var y = f.value;
        if (Q(y, p)) {
          if (f.children === s.children && !zh())
            return Pu(e, t, a);
        } else
          Tw(t, u, a);
      }
      var g = s.children;
      return ga(e, t, g, a), t.child;
    }
    var R0 = !1;
    function Dx(e, t, a) {
      var i = t.type;
      i._context === void 0 ? i !== i.Consumer && (R0 || (R0 = !0, S("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?"))) : i = i._context;
      var u = t.pendingProps, s = u.children;
      typeof s != "function" && S("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."), Df(t, a);
      var f = er(i);
      va(t);
      var p;
      return kp.current = t, $n(!0), p = s(f), $n(!1), ha(), t.flags |= ti, ga(e, t, p, a), t.child;
    }
    function Mp() {
      ul = !0;
    }
    function bm(e, t) {
      (t.mode & it) === De && e !== null && (e.alternate = null, t.alternate = null, t.flags |= hn);
    }
    function Pu(e, t, a) {
      return e !== null && (t.dependencies = e.dependencies), KC(), Yp(t.lanes), Zr(a, t.childLanes) ? (Cw(e, t), t.child) : null;
    }
    function kx(e, t, a) {
      {
        var i = t.return;
        if (i === null)
          throw new Error("Cannot swap the root fiber.");
        if (e.alternate = null, t.alternate = null, a.index = t.index, a.sibling = t.sibling, a.return = t.return, a.ref = t.ref, t === i.child)
          i.child = a;
        else {
          var u = i.child;
          if (u === null)
            throw new Error("Expected parent to have a child.");
          for (; u.sibling !== t; )
            if (u = u.sibling, u === null)
              throw new Error("Expected to find the previous sibling.");
          u.sibling = a;
        }
        var s = i.deletions;
        return s === null ? (i.deletions = [e], i.flags |= Da) : s.push(e), a.flags |= hn, a;
      }
    }
    function CS(e, t) {
      var a = e.lanes;
      return !!Zr(a, t);
    }
    function Ox(e, t, a) {
      switch (t.tag) {
        case ee:
          v0(t), t.stateNode, xf();
          break;
        case ue:
          CC(t);
          break;
        case ve: {
          var i = t.type;
          $l(i) && Ah(t);
          break;
        }
        case Ce:
          hg(t, t.stateNode.containerInfo);
          break;
        case ft: {
          var u = t.memoizedProps.value, s = t.type._context;
          pC(t, s, u);
          break;
        }
        case pt:
          {
            var f = Zr(a, t.childLanes);
            f && (t.flags |= yt);
            {
              var p = t.stateNode;
              p.effectDuration = 0, p.passiveEffectDuration = 0;
            }
          }
          break;
        case be: {
          var v = t.memoizedState;
          if (v !== null) {
            if (v.dehydrated !== null)
              return Uo(t, Of(al.current)), t.flags |= xe, null;
            var y = t.child, g = y.childLanes;
            if (Zr(a, g))
              return m0(e, t, a);
            Uo(t, Of(al.current));
            var b = Pu(e, t, a);
            return b !== null ? b.sibling : null;
          } else
            Uo(t, Of(al.current));
          break;
        }
        case an: {
          var w = (e.flags & xe) !== _e, M = Zr(a, t.childLanes);
          if (w) {
            if (M)
              return E0(e, t, a);
            t.flags |= xe;
          }
          var A = t.memoizedState;
          if (A !== null && (A.rendering = null, A.tail = null, A.lastEffect = null), Uo(t, al.current), M)
            break;
          return null;
        }
        case ke:
        case Ut:
          return t.lanes = $, f0(e, t, a);
      }
      return Pu(e, t, a);
    }
    function T0(e, t, a) {
      if (t._debugNeedsRemount && e !== null)
        return kx(e, t, KS(t.type, t.key, t.pendingProps, t._debugOwner || null, t.mode, t.lanes));
      if (e !== null) {
        var i = e.memoizedProps, u = t.pendingProps;
        if (i !== u || zh() || // Force a re-render if the implementation changed due to hot reload:
        t.type !== e.type)
          ul = !0;
        else {
          var s = CS(e, a);
          if (!s && // If this is the second pass of an error or suspense boundary, there
          // may not be work scheduled on `current`, so we check for this flag.
          (t.flags & xe) === _e)
            return ul = !1, Ox(e, t, a);
          (e.flags & Tc) !== _e ? ul = !0 : ul = !1;
        }
      } else if (ul = !1, Ur() && tw(t)) {
        var f = t.index, p = nw();
        KE(t, p, f);
      }
      switch (t.lanes = $, t.tag) {
        case lt:
          return fx(e, t, t.type, a);
        case rn: {
          var v = t.elementType;
          return sx(e, t, v, a);
        }
        case de: {
          var y = t.type, g = t.pendingProps, b = t.elementType === y ? g : ll(y, g);
          return pS(e, t, y, b, a);
        }
        case ve: {
          var w = t.type, M = t.pendingProps, A = t.elementType === w ? M : ll(w, M);
          return p0(e, t, w, A, a);
        }
        case ee:
          return lx(e, t, a);
        case ue:
          return ux(e, t, a);
        case Ye:
          return ox(e, t);
        case be:
          return m0(e, t, a);
        case Ce:
          return bx(e, t, a);
        case Ie: {
          var j = t.type, le = t.pendingProps, Le = t.elementType === j ? le : ll(j, le);
          return o0(e, t, j, Le, a);
        }
        case mt:
          return rx(e, t, a);
        case dt:
          return ax(e, t, a);
        case pt:
          return ix(e, t, a);
        case ft:
          return _x(e, t, a);
        case cn:
          return Dx(e, t, a);
        case ut: {
          var we = t.type, Et = t.pendingProps, vt = ll(we, Et);
          if (t.type !== t.elementType) {
            var k = we.propTypes;
            k && tl(
              k,
              vt,
              // Resolved for outer only
              "prop",
              Tt(we)
            );
          }
          return vt = ll(we.type, vt), s0(e, t, we, vt, a);
        }
        case Fe:
          return c0(e, t, t.type, t.pendingProps, a);
        case Ft: {
          var H = t.type, O = t.pendingProps, q = t.elementType === H ? O : ll(H, O);
          return cx(e, t, H, q, a);
        }
        case an:
          return E0(e, t, a);
        case xt:
          break;
        case ke:
          return f0(e, t, a);
      }
      throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
    }
    function Af(e) {
      e.flags |= yt;
    }
    function w0(e) {
      e.flags |= Sn, e.flags |= vo;
    }
    var x0, RS, b0, _0;
    x0 = function(e, t, a, i) {
      for (var u = t.child; u !== null; ) {
        if (u.tag === ue || u.tag === Ye)
          ZT(e, u.stateNode);
        else if (u.tag !== Ce) {
          if (u.child !== null) {
            u.child.return = u, u = u.child;
            continue;
          }
        }
        if (u === t)
          return;
        for (; u.sibling === null; ) {
          if (u.return === null || u.return === t)
            return;
          u = u.return;
        }
        u.sibling.return = u.return, u = u.sibling;
      }
    }, RS = function(e, t) {
    }, b0 = function(e, t, a, i, u) {
      var s = e.memoizedProps;
      if (s !== i) {
        var f = t.stateNode, p = mg(), v = e1(f, a, s, i, u, p);
        t.updateQueue = v, v && Af(t);
      }
    }, _0 = function(e, t, a, i) {
      a !== i && Af(t);
    };
    function Np(e, t) {
      if (!Ur())
        switch (e.tailMode) {
          case "hidden": {
            for (var a = e.tail, i = null; a !== null; )
              a.alternate !== null && (i = a), a = a.sibling;
            i === null ? e.tail = null : i.sibling = null;
            break;
          }
          case "collapsed": {
            for (var u = e.tail, s = null; u !== null; )
              u.alternate !== null && (s = u), u = u.sibling;
            s === null ? !t && e.tail !== null ? e.tail.sibling = null : e.tail = null : s.sibling = null;
            break;
          }
        }
    }
    function Fr(e) {
      var t = e.alternate !== null && e.alternate.child === e.child, a = $, i = _e;
      if (t) {
        if ((e.mode & Ot) !== De) {
          for (var v = e.selfBaseDuration, y = e.child; y !== null; )
            a = qe(a, qe(y.lanes, y.childLanes)), i |= y.subtreeFlags & Nn, i |= y.flags & Nn, v += y.treeBaseDuration, y = y.sibling;
          e.treeBaseDuration = v;
        } else
          for (var g = e.child; g !== null; )
            a = qe(a, qe(g.lanes, g.childLanes)), i |= g.subtreeFlags & Nn, i |= g.flags & Nn, g.return = e, g = g.sibling;
        e.subtreeFlags |= i;
      } else {
        if ((e.mode & Ot) !== De) {
          for (var u = e.actualDuration, s = e.selfBaseDuration, f = e.child; f !== null; )
            a = qe(a, qe(f.lanes, f.childLanes)), i |= f.subtreeFlags, i |= f.flags, u += f.actualDuration, s += f.treeBaseDuration, f = f.sibling;
          e.actualDuration = u, e.treeBaseDuration = s;
        } else
          for (var p = e.child; p !== null; )
            a = qe(a, qe(p.lanes, p.childLanes)), i |= p.subtreeFlags, i |= p.flags, p.return = e, p = p.sibling;
        e.subtreeFlags |= i;
      }
      return e.childLanes = a, t;
    }
    function Lx(e, t, a) {
      if (hw() && (t.mode & it) !== De && (t.flags & xe) === _e)
        return aC(t), xf(), t.flags |= Er | us | Xn, !1;
      var i = Vh(t);
      if (a !== null && a.dehydrated !== null)
        if (e === null) {
          if (!i)
            throw new Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
          if (pw(t), Fr(t), (t.mode & Ot) !== De) {
            var u = a !== null;
            if (u) {
              var s = t.child;
              s !== null && (t.treeBaseDuration -= s.treeBaseDuration);
            }
          }
          return !1;
        } else {
          if (xf(), (t.flags & xe) === _e && (t.memoizedState = null), t.flags |= yt, Fr(t), (t.mode & Ot) !== De) {
            var f = a !== null;
            if (f) {
              var p = t.child;
              p !== null && (t.treeBaseDuration -= p.treeBaseDuration);
            }
          }
          return !1;
        }
      else
        return iC(), !0;
    }
    function D0(e, t, a) {
      var i = t.pendingProps;
      switch (Gy(t), t.tag) {
        case lt:
        case rn:
        case Fe:
        case de:
        case Ie:
        case mt:
        case dt:
        case pt:
        case cn:
        case ut:
          return Fr(t), null;
        case ve: {
          var u = t.type;
          return $l(u) && Uh(t), Fr(t), null;
        }
        case ee: {
          var s = t.stateNode;
          if (kf(t), Yy(t), Cg(), s.pendingContext && (s.context = s.pendingContext, s.pendingContext = null), e === null || e.child === null) {
            var f = Vh(t);
            if (f)
              Af(t);
            else if (e !== null) {
              var p = e.memoizedState;
              // Check if this is a client root
              (!p.isDehydrated || // Check if we reverted to client rendering (e.g. due to an error)
              (t.flags & Er) !== _e) && (t.flags |= Yn, iC());
            }
          }
          return RS(e, t), Fr(t), null;
        }
        case ue: {
          yg(t);
          var v = EC(), y = t.type;
          if (e !== null && t.stateNode != null)
            b0(e, t, y, i, v), e.ref !== t.ref && w0(t);
          else {
            if (!i) {
              if (t.stateNode === null)
                throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
              return Fr(t), null;
            }
            var g = mg(), b = Vh(t);
            if (b)
              fw(t, v, g) && Af(t);
            else {
              var w = KT(y, i, v, g, t);
              x0(w, t, !1, !1), t.stateNode = w, JT(w, y, i, v) && Af(t);
            }
            t.ref !== null && w0(t);
          }
          return Fr(t), null;
        }
        case Ye: {
          var M = i;
          if (e && t.stateNode != null) {
            var A = e.memoizedProps;
            _0(e, t, A, M);
          } else {
            if (typeof M != "string" && t.stateNode === null)
              throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
            var j = EC(), le = mg(), Le = Vh(t);
            Le ? dw(t) && Af(t) : t.stateNode = t1(M, j, le, t);
          }
          return Fr(t), null;
        }
        case be: {
          Lf(t);
          var we = t.memoizedState;
          if (e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
            var Et = Lx(e, t, we);
            if (!Et)
              return t.flags & Xn ? t : null;
          }
          if ((t.flags & xe) !== _e)
            return t.lanes = a, (t.mode & Ot) !== De && Qg(t), t;
          var vt = we !== null, k = e !== null && e.memoizedState !== null;
          if (vt !== k && vt) {
            var H = t.child;
            if (H.flags |= Mn, (t.mode & it) !== De) {
              var O = e === null && (t.memoizedProps.unstable_avoidThisFallback !== !0 || !0);
              O || gg(al.current, TC) ? Mb() : PS();
            }
          }
          var q = t.updateQueue;
          if (q !== null && (t.flags |= yt), Fr(t), (t.mode & Ot) !== De && vt) {
            var fe = t.child;
            fe !== null && (t.treeBaseDuration -= fe.treeBaseDuration);
          }
          return null;
        }
        case Ce:
          return kf(t), RS(e, t), e === null && G1(t.stateNode.containerInfo), Fr(t), null;
        case ft:
          var oe = t.type._context;
          return og(oe, t), Fr(t), null;
        case Ft: {
          var He = t.type;
          return $l(He) && Uh(t), Fr(t), null;
        }
        case an: {
          Lf(t);
          var Qe = t.memoizedState;
          if (Qe === null)
            return Fr(t), null;
          var qt = (t.flags & xe) !== _e, Nt = Qe.rendering;
          if (Nt === null)
            if (qt)
              Np(Qe, !1);
            else {
              var Wn = zb() && (e === null || (e.flags & xe) === _e);
              if (!Wn)
                for (var zt = t.child; zt !== null; ) {
                  var Hn = rm(zt);
                  if (Hn !== null) {
                    qt = !0, t.flags |= xe, Np(Qe, !1);
                    var ia = Hn.updateQueue;
                    return ia !== null && (t.updateQueue = ia, t.flags |= yt), t.subtreeFlags = _e, Rw(t, a), Uo(t, Sg(al.current, Ep)), t.child;
                  }
                  zt = zt.sibling;
                }
              Qe.tail !== null && In() > q0() && (t.flags |= xe, qt = !0, Np(Qe, !1), t.lanes = xd);
            }
          else {
            if (!qt) {
              var Br = rm(Nt);
              if (Br !== null) {
                t.flags |= xe, qt = !0;
                var oi = Br.updateQueue;
                if (oi !== null && (t.updateQueue = oi, t.flags |= yt), Np(Qe, !0), Qe.tail === null && Qe.tailMode === "hidden" && !Nt.alternate && !Ur())
                  return Fr(t), null;
              } else // The time it took to render last row is greater than the remaining
              // time we have to render. So rendering one more row would likely
              // exceed it.
              In() * 2 - Qe.renderingStartTime > q0() && a !== Kr && (t.flags |= xe, qt = !0, Np(Qe, !1), t.lanes = xd);
            }
            if (Qe.isBackwards)
              Nt.sibling = t.child, t.child = Nt;
            else {
              var Ca = Qe.last;
              Ca !== null ? Ca.sibling = Nt : t.child = Nt, Qe.last = Nt;
            }
          }
          if (Qe.tail !== null) {
            var Ra = Qe.tail;
            Qe.rendering = Ra, Qe.tail = Ra.sibling, Qe.renderingStartTime = In(), Ra.sibling = null;
            var la = al.current;
            return qt ? la = Sg(la, Ep) : la = Of(la), Uo(t, la), Ra;
          }
          return Fr(t), null;
        }
        case xt:
          break;
        case ke:
        case Ut: {
          HS(t);
          var Iu = t.memoizedState, Yf = Iu !== null;
          if (e !== null) {
            var qp = e.memoizedState, Kl = qp !== null;
            Kl !== Yf && // LegacyHidden doesn't do any hiding — it only pre-renders.
            !ne && (t.flags |= Mn);
          }
          return !Yf || (t.mode & it) === De ? Fr(t) : Zr(Xl, Kr) && (Fr(t), t.subtreeFlags & (hn | yt) && (t.flags |= Mn)), null;
        }
        case bt:
          return null;
        case Dt:
          return null;
      }
      throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
    }
    function Mx(e, t, a) {
      switch (Gy(t), t.tag) {
        case ve: {
          var i = t.type;
          $l(i) && Uh(t);
          var u = t.flags;
          return u & Xn ? (t.flags = u & ~Xn | xe, (t.mode & Ot) !== De && Qg(t), t) : null;
        }
        case ee: {
          t.stateNode, kf(t), Yy(t), Cg();
          var s = t.flags;
          return (s & Xn) !== _e && (s & xe) === _e ? (t.flags = s & ~Xn | xe, t) : null;
        }
        case ue:
          return yg(t), null;
        case be: {
          Lf(t);
          var f = t.memoizedState;
          if (f !== null && f.dehydrated !== null) {
            if (t.alternate === null)
              throw new Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
            xf();
          }
          var p = t.flags;
          return p & Xn ? (t.flags = p & ~Xn | xe, (t.mode & Ot) !== De && Qg(t), t) : null;
        }
        case an:
          return Lf(t), null;
        case Ce:
          return kf(t), null;
        case ft:
          var v = t.type._context;
          return og(v, t), null;
        case ke:
        case Ut:
          return HS(t), null;
        case bt:
          return null;
        default:
          return null;
      }
    }
    function k0(e, t, a) {
      switch (Gy(t), t.tag) {
        case ve: {
          var i = t.type.childContextTypes;
          i != null && Uh(t);
          break;
        }
        case ee: {
          t.stateNode, kf(t), Yy(t), Cg();
          break;
        }
        case ue: {
          yg(t);
          break;
        }
        case Ce:
          kf(t);
          break;
        case be:
          Lf(t);
          break;
        case an:
          Lf(t);
          break;
        case ft:
          var u = t.type._context;
          og(u, t);
          break;
        case ke:
        case Ut:
          HS(t);
          break;
      }
    }
    var O0 = null;
    O0 = /* @__PURE__ */ new Set();
    var _m = !1, jr = !1, Nx = typeof WeakSet == "function" ? WeakSet : Set, ge = null, Ff = null, jf = null;
    function zx(e) {
      xl(null, function() {
        throw e;
      }), ls();
    }
    var Ux = function(e, t) {
      if (t.props = e.memoizedProps, t.state = e.memoizedState, e.mode & Ot)
        try {
          Gl(), t.componentWillUnmount();
        } finally {
          Wl(e);
        }
      else
        t.componentWillUnmount();
    };
    function L0(e, t) {
      try {
        jo(cr, e);
      } catch (a) {
        sn(e, t, a);
      }
    }
    function TS(e, t, a) {
      try {
        Ux(e, a);
      } catch (i) {
        sn(e, t, i);
      }
    }
    function Ax(e, t, a) {
      try {
        a.componentDidMount();
      } catch (i) {
        sn(e, t, i);
      }
    }
    function M0(e, t) {
      try {
        z0(e);
      } catch (a) {
        sn(e, t, a);
      }
    }
    function Hf(e, t) {
      var a = e.ref;
      if (a !== null)
        if (typeof a == "function") {
          var i;
          try {
            if (Ue && nt && e.mode & Ot)
              try {
                Gl(), i = a(null);
              } finally {
                Wl(e);
              }
            else
              i = a(null);
          } catch (u) {
            sn(e, t, u);
          }
          typeof i == "function" && S("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", Ve(e));
        } else
          a.current = null;
    }
    function Dm(e, t, a) {
      try {
        a();
      } catch (i) {
        sn(e, t, i);
      }
    }
    var N0 = !1;
    function Fx(e, t) {
      qT(e.containerInfo), ge = t, jx();
      var a = N0;
      return N0 = !1, a;
    }
    function jx() {
      for (; ge !== null; ) {
        var e = ge, t = e.child;
        (e.subtreeFlags & _l) !== _e && t !== null ? (t.return = e, ge = t) : Hx();
      }
    }
    function Hx() {
      for (; ge !== null; ) {
        var e = ge;
        Yt(e);
        try {
          Px(e);
        } catch (a) {
          sn(e, e.return, a);
        }
        on();
        var t = e.sibling;
        if (t !== null) {
          t.return = e.return, ge = t;
          return;
        }
        ge = e.return;
      }
    }
    function Px(e) {
      var t = e.alternate, a = e.flags;
      if ((a & Yn) !== _e) {
        switch (Yt(e), e.tag) {
          case de:
          case Ie:
          case Fe:
            break;
          case ve: {
            if (t !== null) {
              var i = t.memoizedProps, u = t.memoizedState, s = e.stateNode;
              e.type === e.elementType && !Js && (s.props !== e.memoizedProps && S("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Ve(e) || "instance"), s.state !== e.memoizedState && S("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Ve(e) || "instance"));
              var f = s.getSnapshotBeforeUpdate(e.elementType === e.type ? i : ll(e.type, i), u);
              {
                var p = O0;
                f === void 0 && !p.has(e.type) && (p.add(e.type), S("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.", Ve(e)));
              }
              s.__reactInternalSnapshotBeforeUpdate = f;
            }
            break;
          }
          case ee: {
            {
              var v = e.stateNode;
              E1(v.containerInfo);
            }
            break;
          }
          case ue:
          case Ye:
          case Ce:
          case Ft:
            break;
          default:
            throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
        }
        on();
      }
    }
    function ol(e, t, a) {
      var i = t.updateQueue, u = i !== null ? i.lastEffect : null;
      if (u !== null) {
        var s = u.next, f = s;
        do {
          if ((f.tag & e) === e) {
            var p = f.destroy;
            f.destroy = void 0, p !== void 0 && ((e & Ar) !== Ha ? qi(t) : (e & cr) !== Ha && ss(t), (e & Yl) !== Ha && Qp(!0), Dm(t, a, p), (e & Yl) !== Ha && Qp(!1), (e & Ar) !== Ha ? Ll() : (e & cr) !== Ha && Td());
          }
          f = f.next;
        } while (f !== s);
      }
    }
    function jo(e, t) {
      var a = t.updateQueue, i = a !== null ? a.lastEffect : null;
      if (i !== null) {
        var u = i.next, s = u;
        do {
          if ((s.tag & e) === e) {
            (e & Ar) !== Ha ? Rd(t) : (e & cr) !== Ha && kc(t);
            var f = s.create;
            (e & Yl) !== Ha && Qp(!0), s.destroy = f(), (e & Yl) !== Ha && Qp(!1), (e & Ar) !== Ha ? Nv() : (e & cr) !== Ha && zv();
            {
              var p = s.destroy;
              if (p !== void 0 && typeof p != "function") {
                var v = void 0;
                (s.tag & cr) !== _e ? v = "useLayoutEffect" : (s.tag & Yl) !== _e ? v = "useInsertionEffect" : v = "useEffect";
                var y = void 0;
                p === null ? y = " You returned null. If your effect does not require clean up, return undefined (or nothing)." : typeof p.then == "function" ? y = `

It looks like you wrote ` + v + `(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:

` + v + `(() => {
  async function fetchData() {
    // You can await here
    const response = await MyAPI.getData(someId);
    // ...
  }
  fetchData();
}, [someId]); // Or [] if effect doesn't need props or state

Learn more about data fetching with Hooks: https://reactjs.org/link/hooks-data-fetching` : y = " You returned: " + p, S("%s must not return anything besides a function, which is used for clean-up.%s", v, y);
              }
            }
          }
          s = s.next;
        } while (s !== u);
      }
    }
    function Vx(e, t) {
      if ((t.flags & yt) !== _e)
        switch (t.tag) {
          case pt: {
            var a = t.stateNode.passiveEffectDuration, i = t.memoizedProps, u = i.id, s = i.onPostCommit, f = qC(), p = t.alternate === null ? "mount" : "update";
            GC() && (p = "nested-update"), typeof s == "function" && s(u, p, a, f);
            var v = t.return;
            e: for (; v !== null; ) {
              switch (v.tag) {
                case ee:
                  var y = v.stateNode;
                  y.passiveEffectDuration += a;
                  break e;
                case pt:
                  var g = v.stateNode;
                  g.passiveEffectDuration += a;
                  break e;
              }
              v = v.return;
            }
            break;
          }
        }
    }
    function Bx(e, t, a, i) {
      if ((a.flags & kl) !== _e)
        switch (a.tag) {
          case de:
          case Ie:
          case Fe: {
            if (!jr)
              if (a.mode & Ot)
                try {
                  Gl(), jo(cr | sr, a);
                } finally {
                  Wl(a);
                }
              else
                jo(cr | sr, a);
            break;
          }
          case ve: {
            var u = a.stateNode;
            if (a.flags & yt && !jr)
              if (t === null)
                if (a.type === a.elementType && !Js && (u.props !== a.memoizedProps && S("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Ve(a) || "instance"), u.state !== a.memoizedState && S("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Ve(a) || "instance")), a.mode & Ot)
                  try {
                    Gl(), u.componentDidMount();
                  } finally {
                    Wl(a);
                  }
                else
                  u.componentDidMount();
              else {
                var s = a.elementType === a.type ? t.memoizedProps : ll(a.type, t.memoizedProps), f = t.memoizedState;
                if (a.type === a.elementType && !Js && (u.props !== a.memoizedProps && S("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Ve(a) || "instance"), u.state !== a.memoizedState && S("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Ve(a) || "instance")), a.mode & Ot)
                  try {
                    Gl(), u.componentDidUpdate(s, f, u.__reactInternalSnapshotBeforeUpdate);
                  } finally {
                    Wl(a);
                  }
                else
                  u.componentDidUpdate(s, f, u.__reactInternalSnapshotBeforeUpdate);
              }
            var p = a.updateQueue;
            p !== null && (a.type === a.elementType && !Js && (u.props !== a.memoizedProps && S("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Ve(a) || "instance"), u.state !== a.memoizedState && S("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Ve(a) || "instance")), SC(a, p, u));
            break;
          }
          case ee: {
            var v = a.updateQueue;
            if (v !== null) {
              var y = null;
              if (a.child !== null)
                switch (a.child.tag) {
                  case ue:
                    y = a.child.stateNode;
                    break;
                  case ve:
                    y = a.child.stateNode;
                    break;
                }
              SC(a, v, y);
            }
            break;
          }
          case ue: {
            var g = a.stateNode;
            if (t === null && a.flags & yt) {
              var b = a.type, w = a.memoizedProps;
              l1(g, b, w);
            }
            break;
          }
          case Ye:
            break;
          case Ce:
            break;
          case pt: {
            {
              var M = a.memoizedProps, A = M.onCommit, j = M.onRender, le = a.stateNode.effectDuration, Le = qC(), we = t === null ? "mount" : "update";
              GC() && (we = "nested-update"), typeof j == "function" && j(a.memoizedProps.id, we, a.actualDuration, a.treeBaseDuration, a.actualStartTime, Le);
              {
                typeof A == "function" && A(a.memoizedProps.id, we, le, Le), Hb(a);
                var Et = a.return;
                e: for (; Et !== null; ) {
                  switch (Et.tag) {
                    case ee:
                      var vt = Et.stateNode;
                      vt.effectDuration += le;
                      break e;
                    case pt:
                      var k = Et.stateNode;
                      k.effectDuration += le;
                      break e;
                  }
                  Et = Et.return;
                }
              }
            }
            break;
          }
          case be: {
            Xx(e, a);
            break;
          }
          case an:
          case Ft:
          case xt:
          case ke:
          case Ut:
          case Dt:
            break;
          default:
            throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
        }
      jr || a.flags & Sn && z0(a);
    }
    function $x(e) {
      switch (e.tag) {
        case de:
        case Ie:
        case Fe: {
          if (e.mode & Ot)
            try {
              Gl(), L0(e, e.return);
            } finally {
              Wl(e);
            }
          else
            L0(e, e.return);
          break;
        }
        case ve: {
          var t = e.stateNode;
          typeof t.componentDidMount == "function" && Ax(e, e.return, t), M0(e, e.return);
          break;
        }
        case ue: {
          M0(e, e.return);
          break;
        }
      }
    }
    function Yx(e, t) {
      for (var a = null, i = e; ; ) {
        if (i.tag === ue) {
          if (a === null) {
            a = i;
            try {
              var u = i.stateNode;
              t ? m1(u) : g1(i.stateNode, i.memoizedProps);
            } catch (f) {
              sn(e, e.return, f);
            }
          }
        } else if (i.tag === Ye) {
          if (a === null)
            try {
              var s = i.stateNode;
              t ? y1(s) : S1(s, i.memoizedProps);
            } catch (f) {
              sn(e, e.return, f);
            }
        } else if (!((i.tag === ke || i.tag === Ut) && i.memoizedState !== null && i !== e)) {
          if (i.child !== null) {
            i.child.return = i, i = i.child;
            continue;
          }
        }
        if (i === e)
          return;
        for (; i.sibling === null; ) {
          if (i.return === null || i.return === e)
            return;
          a === i && (a = null), i = i.return;
        }
        a === i && (a = null), i.sibling.return = i.return, i = i.sibling;
      }
    }
    function z0(e) {
      var t = e.ref;
      if (t !== null) {
        var a = e.stateNode, i;
        switch (e.tag) {
          case ue:
            i = a;
            break;
          default:
            i = a;
        }
        if (typeof t == "function") {
          var u;
          if (e.mode & Ot)
            try {
              Gl(), u = t(i);
            } finally {
              Wl(e);
            }
          else
            u = t(i);
          typeof u == "function" && S("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", Ve(e));
        } else
          t.hasOwnProperty("current") || S("Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().", Ve(e)), t.current = i;
      }
    }
    function Ix(e) {
      var t = e.alternate;
      t !== null && (t.return = null), e.return = null;
    }
    function U0(e) {
      var t = e.alternate;
      t !== null && (e.alternate = null, U0(t));
      {
        if (e.child = null, e.deletions = null, e.sibling = null, e.tag === ue) {
          var a = e.stateNode;
          a !== null && K1(a);
        }
        e.stateNode = null, e._debugOwner = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
      }
    }
    function Qx(e) {
      for (var t = e.return; t !== null; ) {
        if (A0(t))
          return t;
        t = t.return;
      }
      throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
    }
    function A0(e) {
      return e.tag === ue || e.tag === ee || e.tag === Ce;
    }
    function F0(e) {
      var t = e;
      e: for (; ; ) {
        for (; t.sibling === null; ) {
          if (t.return === null || A0(t.return))
            return null;
          t = t.return;
        }
        for (t.sibling.return = t.return, t = t.sibling; t.tag !== ue && t.tag !== Ye && t.tag !== Kt; ) {
          if (t.flags & hn || t.child === null || t.tag === Ce)
            continue e;
          t.child.return = t, t = t.child;
        }
        if (!(t.flags & hn))
          return t.stateNode;
      }
    }
    function Wx(e) {
      var t = Qx(e);
      switch (t.tag) {
        case ue: {
          var a = t.stateNode;
          t.flags & ka && (HE(a), t.flags &= ~ka);
          var i = F0(e);
          xS(e, i, a);
          break;
        }
        case ee:
        case Ce: {
          var u = t.stateNode.containerInfo, s = F0(e);
          wS(e, s, u);
          break;
        }
        default:
          throw new Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.");
      }
    }
    function wS(e, t, a) {
      var i = e.tag, u = i === ue || i === Ye;
      if (u) {
        var s = e.stateNode;
        t ? d1(a, s, t) : c1(a, s);
      } else if (i !== Ce) {
        var f = e.child;
        if (f !== null) {
          wS(f, t, a);
          for (var p = f.sibling; p !== null; )
            wS(p, t, a), p = p.sibling;
        }
      }
    }
    function xS(e, t, a) {
      var i = e.tag, u = i === ue || i === Ye;
      if (u) {
        var s = e.stateNode;
        t ? f1(a, s, t) : s1(a, s);
      } else if (i !== Ce) {
        var f = e.child;
        if (f !== null) {
          xS(f, t, a);
          for (var p = f.sibling; p !== null; )
            xS(p, t, a), p = p.sibling;
        }
      }
    }
    var Hr = null, sl = !1;
    function Gx(e, t, a) {
      {
        var i = t;
        e: for (; i !== null; ) {
          switch (i.tag) {
            case ue: {
              Hr = i.stateNode, sl = !1;
              break e;
            }
            case ee: {
              Hr = i.stateNode.containerInfo, sl = !0;
              break e;
            }
            case Ce: {
              Hr = i.stateNode.containerInfo, sl = !0;
              break e;
            }
          }
          i = i.return;
        }
        if (Hr === null)
          throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
        j0(e, t, a), Hr = null, sl = !1;
      }
      Ix(a);
    }
    function Ho(e, t, a) {
      for (var i = a.child; i !== null; )
        j0(e, t, i), i = i.sibling;
    }
    function j0(e, t, a) {
      switch (Sd(a), a.tag) {
        case ue:
          jr || Hf(a, t);
        case Ye: {
          {
            var i = Hr, u = sl;
            Hr = null, Ho(e, t, a), Hr = i, sl = u, Hr !== null && (sl ? v1(Hr, a.stateNode) : p1(Hr, a.stateNode));
          }
          return;
        }
        case Kt: {
          Hr !== null && (sl ? h1(Hr, a.stateNode) : Ay(Hr, a.stateNode));
          return;
        }
        case Ce: {
          {
            var s = Hr, f = sl;
            Hr = a.stateNode.containerInfo, sl = !0, Ho(e, t, a), Hr = s, sl = f;
          }
          return;
        }
        case de:
        case Ie:
        case ut:
        case Fe: {
          if (!jr) {
            var p = a.updateQueue;
            if (p !== null) {
              var v = p.lastEffect;
              if (v !== null) {
                var y = v.next, g = y;
                do {
                  var b = g, w = b.destroy, M = b.tag;
                  w !== void 0 && ((M & Yl) !== Ha ? Dm(a, t, w) : (M & cr) !== Ha && (ss(a), a.mode & Ot ? (Gl(), Dm(a, t, w), Wl(a)) : Dm(a, t, w), Td())), g = g.next;
                } while (g !== y);
              }
            }
          }
          Ho(e, t, a);
          return;
        }
        case ve: {
          if (!jr) {
            Hf(a, t);
            var A = a.stateNode;
            typeof A.componentWillUnmount == "function" && TS(a, t, A);
          }
          Ho(e, t, a);
          return;
        }
        case xt: {
          Ho(e, t, a);
          return;
        }
        case ke: {
          if (
            // TODO: Remove this dead flag
            a.mode & it
          ) {
            var j = jr;
            jr = j || a.memoizedState !== null, Ho(e, t, a), jr = j;
          } else
            Ho(e, t, a);
          break;
        }
        default: {
          Ho(e, t, a);
          return;
        }
      }
    }
    function qx(e) {
      e.memoizedState;
    }
    function Xx(e, t) {
      var a = t.memoizedState;
      if (a === null) {
        var i = t.alternate;
        if (i !== null) {
          var u = i.memoizedState;
          if (u !== null) {
            var s = u.dehydrated;
            s !== null && z1(s);
          }
        }
      }
    }
    function H0(e) {
      var t = e.updateQueue;
      if (t !== null) {
        e.updateQueue = null;
        var a = e.stateNode;
        a === null && (a = e.stateNode = new Nx()), t.forEach(function(i) {
          var u = Qb.bind(null, e, i);
          if (!a.has(i)) {
            if (a.add(i), Xr)
              if (Ff !== null && jf !== null)
                Ip(jf, Ff);
              else
                throw Error("Expected finished root and lanes to be set. This is a bug in React.");
            i.then(u, u);
          }
        });
      }
    }
    function Kx(e, t, a) {
      Ff = a, jf = e, Yt(t), P0(t, e), Yt(t), Ff = null, jf = null;
    }
    function cl(e, t, a) {
      var i = t.deletions;
      if (i !== null)
        for (var u = 0; u < i.length; u++) {
          var s = i[u];
          try {
            Gx(e, t, s);
          } catch (v) {
            sn(s, t, v);
          }
        }
      var f = gl();
      if (t.subtreeFlags & Dl)
        for (var p = t.child; p !== null; )
          Yt(p), P0(p, e), p = p.sibling;
      Yt(f);
    }
    function P0(e, t, a) {
      var i = e.alternate, u = e.flags;
      switch (e.tag) {
        case de:
        case Ie:
        case ut:
        case Fe: {
          if (cl(t, e), ql(e), u & yt) {
            try {
              ol(Yl | sr, e, e.return), jo(Yl | sr, e);
            } catch (He) {
              sn(e, e.return, He);
            }
            if (e.mode & Ot) {
              try {
                Gl(), ol(cr | sr, e, e.return);
              } catch (He) {
                sn(e, e.return, He);
              }
              Wl(e);
            } else
              try {
                ol(cr | sr, e, e.return);
              } catch (He) {
                sn(e, e.return, He);
              }
          }
          return;
        }
        case ve: {
          cl(t, e), ql(e), u & Sn && i !== null && Hf(i, i.return);
          return;
        }
        case ue: {
          cl(t, e), ql(e), u & Sn && i !== null && Hf(i, i.return);
          {
            if (e.flags & ka) {
              var s = e.stateNode;
              try {
                HE(s);
              } catch (He) {
                sn(e, e.return, He);
              }
            }
            if (u & yt) {
              var f = e.stateNode;
              if (f != null) {
                var p = e.memoizedProps, v = i !== null ? i.memoizedProps : p, y = e.type, g = e.updateQueue;
                if (e.updateQueue = null, g !== null)
                  try {
                    u1(f, g, y, v, p, e);
                  } catch (He) {
                    sn(e, e.return, He);
                  }
              }
            }
          }
          return;
        }
        case Ye: {
          if (cl(t, e), ql(e), u & yt) {
            if (e.stateNode === null)
              throw new Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");
            var b = e.stateNode, w = e.memoizedProps, M = i !== null ? i.memoizedProps : w;
            try {
              o1(b, M, w);
            } catch (He) {
              sn(e, e.return, He);
            }
          }
          return;
        }
        case ee: {
          if (cl(t, e), ql(e), u & yt && i !== null) {
            var A = i.memoizedState;
            if (A.isDehydrated)
              try {
                N1(t.containerInfo);
              } catch (He) {
                sn(e, e.return, He);
              }
          }
          return;
        }
        case Ce: {
          cl(t, e), ql(e);
          return;
        }
        case be: {
          cl(t, e), ql(e);
          var j = e.child;
          if (j.flags & Mn) {
            var le = j.stateNode, Le = j.memoizedState, we = Le !== null;
            if (le.isHidden = we, we) {
              var Et = j.alternate !== null && j.alternate.memoizedState !== null;
              Et || Lb();
            }
          }
          if (u & yt) {
            try {
              qx(e);
            } catch (He) {
              sn(e, e.return, He);
            }
            H0(e);
          }
          return;
        }
        case ke: {
          var vt = i !== null && i.memoizedState !== null;
          if (
            // TODO: Remove this dead flag
            e.mode & it
          ) {
            var k = jr;
            jr = k || vt, cl(t, e), jr = k;
          } else
            cl(t, e);
          if (ql(e), u & Mn) {
            var H = e.stateNode, O = e.memoizedState, q = O !== null, fe = e;
            if (H.isHidden = q, q && !vt && (fe.mode & it) !== De) {
              ge = fe;
              for (var oe = fe.child; oe !== null; )
                ge = oe, Jx(oe), oe = oe.sibling;
            }
            Yx(fe, q);
          }
          return;
        }
        case an: {
          cl(t, e), ql(e), u & yt && H0(e);
          return;
        }
        case xt:
          return;
        default: {
          cl(t, e), ql(e);
          return;
        }
      }
    }
    function ql(e) {
      var t = e.flags;
      if (t & hn) {
        try {
          Wx(e);
        } catch (a) {
          sn(e, e.return, a);
        }
        e.flags &= ~hn;
      }
      t & Wr && (e.flags &= ~Wr);
    }
    function Zx(e, t, a) {
      Ff = a, jf = t, ge = e, V0(e, t, a), Ff = null, jf = null;
    }
    function V0(e, t, a) {
      for (var i = (e.mode & it) !== De; ge !== null; ) {
        var u = ge, s = u.child;
        if (u.tag === ke && i) {
          var f = u.memoizedState !== null, p = f || _m;
          if (p) {
            bS(e, t, a);
            continue;
          } else {
            var v = u.alternate, y = v !== null && v.memoizedState !== null, g = y || jr, b = _m, w = jr;
            _m = p, jr = g, jr && !w && (ge = u, eb(u));
            for (var M = s; M !== null; )
              ge = M, V0(
                M,
                // New root; bubble back up to here and stop.
                t,
                a
              ), M = M.sibling;
            ge = u, _m = b, jr = w, bS(e, t, a);
            continue;
          }
        }
        (u.subtreeFlags & kl) !== _e && s !== null ? (s.return = u, ge = s) : bS(e, t, a);
      }
    }
    function bS(e, t, a) {
      for (; ge !== null; ) {
        var i = ge;
        if ((i.flags & kl) !== _e) {
          var u = i.alternate;
          Yt(i);
          try {
            Bx(t, u, i, a);
          } catch (f) {
            sn(i, i.return, f);
          }
          on();
        }
        if (i === e) {
          ge = null;
          return;
        }
        var s = i.sibling;
        if (s !== null) {
          s.return = i.return, ge = s;
          return;
        }
        ge = i.return;
      }
    }
    function Jx(e) {
      for (; ge !== null; ) {
        var t = ge, a = t.child;
        switch (t.tag) {
          case de:
          case Ie:
          case ut:
          case Fe: {
            if (t.mode & Ot)
              try {
                Gl(), ol(cr, t, t.return);
              } finally {
                Wl(t);
              }
            else
              ol(cr, t, t.return);
            break;
          }
          case ve: {
            Hf(t, t.return);
            var i = t.stateNode;
            typeof i.componentWillUnmount == "function" && TS(t, t.return, i);
            break;
          }
          case ue: {
            Hf(t, t.return);
            break;
          }
          case ke: {
            var u = t.memoizedState !== null;
            if (u) {
              B0(e);
              continue;
            }
            break;
          }
        }
        a !== null ? (a.return = t, ge = a) : B0(e);
      }
    }
    function B0(e) {
      for (; ge !== null; ) {
        var t = ge;
        if (t === e) {
          ge = null;
          return;
        }
        var a = t.sibling;
        if (a !== null) {
          a.return = t.return, ge = a;
          return;
        }
        ge = t.return;
      }
    }
    function eb(e) {
      for (; ge !== null; ) {
        var t = ge, a = t.child;
        if (t.tag === ke) {
          var i = t.memoizedState !== null;
          if (i) {
            $0(e);
            continue;
          }
        }
        a !== null ? (a.return = t, ge = a) : $0(e);
      }
    }
    function $0(e) {
      for (; ge !== null; ) {
        var t = ge;
        Yt(t);
        try {
          $x(t);
        } catch (i) {
          sn(t, t.return, i);
        }
        if (on(), t === e) {
          ge = null;
          return;
        }
        var a = t.sibling;
        if (a !== null) {
          a.return = t.return, ge = a;
          return;
        }
        ge = t.return;
      }
    }
    function tb(e, t, a, i) {
      ge = t, nb(t, e, a, i);
    }
    function nb(e, t, a, i) {
      for (; ge !== null; ) {
        var u = ge, s = u.child;
        (u.subtreeFlags & Wi) !== _e && s !== null ? (s.return = u, ge = s) : rb(e, t, a, i);
      }
    }
    function rb(e, t, a, i) {
      for (; ge !== null; ) {
        var u = ge;
        if ((u.flags & Qr) !== _e) {
          Yt(u);
          try {
            ab(t, u, a, i);
          } catch (f) {
            sn(u, u.return, f);
          }
          on();
        }
        if (u === e) {
          ge = null;
          return;
        }
        var s = u.sibling;
        if (s !== null) {
          s.return = u.return, ge = s;
          return;
        }
        ge = u.return;
      }
    }
    function ab(e, t, a, i) {
      switch (t.tag) {
        case de:
        case Ie:
        case Fe: {
          if (t.mode & Ot) {
            Ig();
            try {
              jo(Ar | sr, t);
            } finally {
              Yg(t);
            }
          } else
            jo(Ar | sr, t);
          break;
        }
      }
    }
    function ib(e) {
      ge = e, lb();
    }
    function lb() {
      for (; ge !== null; ) {
        var e = ge, t = e.child;
        if ((ge.flags & Da) !== _e) {
          var a = e.deletions;
          if (a !== null) {
            for (var i = 0; i < a.length; i++) {
              var u = a[i];
              ge = u, sb(u, e);
            }
            {
              var s = e.alternate;
              if (s !== null) {
                var f = s.child;
                if (f !== null) {
                  s.child = null;
                  do {
                    var p = f.sibling;
                    f.sibling = null, f = p;
                  } while (f !== null);
                }
              }
            }
            ge = e;
          }
        }
        (e.subtreeFlags & Wi) !== _e && t !== null ? (t.return = e, ge = t) : ub();
      }
    }
    function ub() {
      for (; ge !== null; ) {
        var e = ge;
        (e.flags & Qr) !== _e && (Yt(e), ob(e), on());
        var t = e.sibling;
        if (t !== null) {
          t.return = e.return, ge = t;
          return;
        }
        ge = e.return;
      }
    }
    function ob(e) {
      switch (e.tag) {
        case de:
        case Ie:
        case Fe: {
          e.mode & Ot ? (Ig(), ol(Ar | sr, e, e.return), Yg(e)) : ol(Ar | sr, e, e.return);
          break;
        }
      }
    }
    function sb(e, t) {
      for (; ge !== null; ) {
        var a = ge;
        Yt(a), fb(a, t), on();
        var i = a.child;
        i !== null ? (i.return = a, ge = i) : cb(e);
      }
    }
    function cb(e) {
      for (; ge !== null; ) {
        var t = ge, a = t.sibling, i = t.return;
        if (U0(t), t === e) {
          ge = null;
          return;
        }
        if (a !== null) {
          a.return = i, ge = a;
          return;
        }
        ge = i;
      }
    }
    function fb(e, t) {
      switch (e.tag) {
        case de:
        case Ie:
        case Fe: {
          e.mode & Ot ? (Ig(), ol(Ar, e, t), Yg(e)) : ol(Ar, e, t);
          break;
        }
      }
    }
    function db(e) {
      switch (e.tag) {
        case de:
        case Ie:
        case Fe: {
          try {
            jo(cr | sr, e);
          } catch (a) {
            sn(e, e.return, a);
          }
          break;
        }
        case ve: {
          var t = e.stateNode;
          try {
            t.componentDidMount();
          } catch (a) {
            sn(e, e.return, a);
          }
          break;
        }
      }
    }
    function pb(e) {
      switch (e.tag) {
        case de:
        case Ie:
        case Fe: {
          try {
            jo(Ar | sr, e);
          } catch (t) {
            sn(e, e.return, t);
          }
          break;
        }
      }
    }
    function vb(e) {
      switch (e.tag) {
        case de:
        case Ie:
        case Fe: {
          try {
            ol(cr | sr, e, e.return);
          } catch (a) {
            sn(e, e.return, a);
          }
          break;
        }
        case ve: {
          var t = e.stateNode;
          typeof t.componentWillUnmount == "function" && TS(e, e.return, t);
          break;
        }
      }
    }
    function hb(e) {
      switch (e.tag) {
        case de:
        case Ie:
        case Fe:
          try {
            ol(Ar | sr, e, e.return);
          } catch (t) {
            sn(e, e.return, t);
          }
      }
    }
    if (typeof Symbol == "function" && Symbol.for) {
      var zp = Symbol.for;
      zp("selector.component"), zp("selector.has_pseudo_class"), zp("selector.role"), zp("selector.test_id"), zp("selector.text");
    }
    var mb = [];
    function yb() {
      mb.forEach(function(e) {
        return e();
      });
    }
    var gb = z.ReactCurrentActQueue;
    function Sb(e) {
      {
        var t = (
          // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
          typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
        ), a = typeof jest < "u";
        return a && t !== !1;
      }
    }
    function Y0() {
      {
        var e = (
          // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
          typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
        );
        return !e && gb.current !== null && S("The current testing environment is not configured to support act(...)"), e;
      }
    }
    var Eb = Math.ceil, _S = z.ReactCurrentDispatcher, DS = z.ReactCurrentOwner, Pr = z.ReactCurrentBatchConfig, fl = z.ReactCurrentActQueue, pr = (
      /*             */
      0
    ), I0 = (
      /*               */
      1
    ), Vr = (
      /*                */
      2
    ), Ai = (
      /*                */
      4
    ), Vu = 0, Up = 1, ec = 2, km = 3, Ap = 4, Q0 = 5, kS = 6, St = pr, Sa = null, Dn = null, vr = $, Xl = $, OS = ko($), hr = Vu, Fp = null, Om = $, jp = $, Lm = $, Hp = null, Pa = null, LS = 0, W0 = 500, G0 = 1 / 0, Cb = 500, Bu = null;
    function Pp() {
      G0 = In() + Cb;
    }
    function q0() {
      return G0;
    }
    var Mm = !1, MS = null, Pf = null, tc = !1, Po = null, Vp = $, NS = [], zS = null, Rb = 50, Bp = 0, US = null, AS = !1, Nm = !1, Tb = 50, Vf = 0, zm = null, $p = Xt, Um = $, X0 = !1;
    function Am() {
      return Sa;
    }
    function Ea() {
      return (St & (Vr | Ai)) !== pr ? In() : ($p !== Xt || ($p = In()), $p);
    }
    function Vo(e) {
      var t = e.mode;
      if ((t & it) === De)
        return Ae;
      if ((St & Vr) !== pr && vr !== $)
        return Rs(vr);
      var a = gw() !== yw;
      if (a) {
        if (Pr.transition !== null) {
          var i = Pr.transition;
          i._updatedFibers || (i._updatedFibers = /* @__PURE__ */ new Set()), i._updatedFibers.add(e);
        }
        return Um === _t && (Um = Ld()), Um;
      }
      var u = Ua();
      if (u !== _t)
        return u;
      var s = n1();
      return s;
    }
    function wb(e) {
      var t = e.mode;
      return (t & it) === De ? Ae : Pv();
    }
    function mr(e, t, a, i) {
      Gb(), X0 && S("useInsertionEffect must not schedule updates."), AS && (Nm = !0), go(e, a, i), (St & Vr) !== $ && e === Sa ? Kb(t) : (Xr && xs(e, t, a), Zb(t), e === Sa && ((St & Vr) === pr && (jp = qe(jp, a)), hr === Ap && Bo(e, vr)), Va(e, i), a === Ae && St === pr && (t.mode & it) === De && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
      !fl.isBatchingLegacy && (Pp(), XE()));
    }
    function xb(e, t, a) {
      var i = e.current;
      i.lanes = t, go(e, t, a), Va(e, a);
    }
    function bb(e) {
      return (
        // TODO: Remove outdated deferRenderPhaseUpdateToNextBatch experiment. We
        // decided not to enable it.
        (St & Vr) !== pr
      );
    }
    function Va(e, t) {
      var a = e.callbackNode;
      qc(e, t);
      var i = Gc(e, e === Sa ? vr : $);
      if (i === $) {
        a !== null && dR(a), e.callbackNode = null, e.callbackPriority = _t;
        return;
      }
      var u = zl(i), s = e.callbackPriority;
      if (s === u && // Special case related to `act`. If the currently scheduled task is a
      // Scheduler task, rather than an `act` task, cancel it and re-scheduled
      // on the `act` queue.
      !(fl.current !== null && a !== $S)) {
        a == null && s !== Ae && S("Expected scheduled callback to exist. This error is likely caused by a bug in React. Please file an issue.");
        return;
      }
      a != null && dR(a);
      var f;
      if (u === Ae)
        e.tag === Oo ? (fl.isBatchingLegacy !== null && (fl.didScheduleLegacyUpdate = !0), ew(J0.bind(null, e))) : qE(J0.bind(null, e)), fl.current !== null ? fl.current.push(Lo) : a1(function() {
          (St & (Vr | Ai)) === pr && Lo();
        }), f = null;
      else {
        var p;
        switch (Wv(i)) {
          case Or:
            p = os;
            break;
          case bi:
            p = Ol;
            break;
          case Na:
            p = Gi;
            break;
          case za:
            p = hu;
            break;
          default:
            p = Gi;
            break;
        }
        f = YS(p, K0.bind(null, e));
      }
      e.callbackPriority = u, e.callbackNode = f;
    }
    function K0(e, t) {
      if (Yw(), $p = Xt, Um = $, (St & (Vr | Ai)) !== pr)
        throw new Error("Should not already be working.");
      var a = e.callbackNode, i = Yu();
      if (i && e.callbackNode !== a)
        return null;
      var u = Gc(e, e === Sa ? vr : $);
      if (u === $)
        return null;
      var s = !Kc(e, u) && !Hv(e, u) && !t, f = s ? Ab(e, u) : jm(e, u);
      if (f !== Vu) {
        if (f === ec) {
          var p = Xc(e);
          p !== $ && (u = p, f = FS(e, p));
        }
        if (f === Up) {
          var v = Fp;
          throw nc(e, $), Bo(e, u), Va(e, In()), v;
        }
        if (f === kS)
          Bo(e, u);
        else {
          var y = !Kc(e, u), g = e.current.alternate;
          if (y && !Db(g)) {
            if (f = jm(e, u), f === ec) {
              var b = Xc(e);
              b !== $ && (u = b, f = FS(e, b));
            }
            if (f === Up) {
              var w = Fp;
              throw nc(e, $), Bo(e, u), Va(e, In()), w;
            }
          }
          e.finishedWork = g, e.finishedLanes = u, _b(e, f, u);
        }
      }
      return Va(e, In()), e.callbackNode === a ? K0.bind(null, e) : null;
    }
    function FS(e, t) {
      var a = Hp;
      if (ef(e)) {
        var i = nc(e, t);
        i.flags |= Er, W1(e.containerInfo);
      }
      var u = jm(e, t);
      if (u !== ec) {
        var s = Pa;
        Pa = a, s !== null && Z0(s);
      }
      return u;
    }
    function Z0(e) {
      Pa === null ? Pa = e : Pa.push.apply(Pa, e);
    }
    function _b(e, t, a) {
      switch (t) {
        case Vu:
        case Up:
          throw new Error("Root did not complete. This is a bug in React.");
        case ec: {
          rc(e, Pa, Bu);
          break;
        }
        case km: {
          if (Bo(e, a), bu(a) && // do not delay if we're inside an act() scope
          !pR()) {
            var i = LS + W0 - In();
            if (i > 10) {
              var u = Gc(e, $);
              if (u !== $)
                break;
              var s = e.suspendedLanes;
              if (!_u(s, a)) {
                Ea(), Zc(e, s);
                break;
              }
              e.timeoutHandle = zy(rc.bind(null, e, Pa, Bu), i);
              break;
            }
          }
          rc(e, Pa, Bu);
          break;
        }
        case Ap: {
          if (Bo(e, a), kd(a))
            break;
          if (!pR()) {
            var f = ri(e, a), p = f, v = In() - p, y = Wb(v) - v;
            if (y > 10) {
              e.timeoutHandle = zy(rc.bind(null, e, Pa, Bu), y);
              break;
            }
          }
          rc(e, Pa, Bu);
          break;
        }
        case Q0: {
          rc(e, Pa, Bu);
          break;
        }
        default:
          throw new Error("Unknown root exit status.");
      }
    }
    function Db(e) {
      for (var t = e; ; ) {
        if (t.flags & po) {
          var a = t.updateQueue;
          if (a !== null) {
            var i = a.stores;
            if (i !== null)
              for (var u = 0; u < i.length; u++) {
                var s = i[u], f = s.getSnapshot, p = s.value;
                try {
                  if (!Q(f(), p))
                    return !1;
                } catch {
                  return !1;
                }
              }
          }
        }
        var v = t.child;
        if (t.subtreeFlags & po && v !== null) {
          v.return = t, t = v;
          continue;
        }
        if (t === e)
          return !0;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e)
            return !0;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
      return !0;
    }
    function Bo(e, t) {
      t = Ts(t, Lm), t = Ts(t, jp), $v(e, t);
    }
    function J0(e) {
      if (Iw(), (St & (Vr | Ai)) !== pr)
        throw new Error("Should not already be working.");
      Yu();
      var t = Gc(e, $);
      if (!Zr(t, Ae))
        return Va(e, In()), null;
      var a = jm(e, t);
      if (e.tag !== Oo && a === ec) {
        var i = Xc(e);
        i !== $ && (t = i, a = FS(e, i));
      }
      if (a === Up) {
        var u = Fp;
        throw nc(e, $), Bo(e, t), Va(e, In()), u;
      }
      if (a === kS)
        throw new Error("Root did not complete. This is a bug in React.");
      var s = e.current.alternate;
      return e.finishedWork = s, e.finishedLanes = t, rc(e, Pa, Bu), Va(e, In()), null;
    }
    function kb(e, t) {
      t !== $ && (Jc(e, qe(t, Ae)), Va(e, In()), (St & (Vr | Ai)) === pr && (Pp(), Lo()));
    }
    function jS(e, t) {
      var a = St;
      St |= I0;
      try {
        return e(t);
      } finally {
        St = a, St === pr && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
        !fl.isBatchingLegacy && (Pp(), XE());
      }
    }
    function Ob(e, t, a, i, u) {
      var s = Ua(), f = Pr.transition;
      try {
        return Pr.transition = null, An(Or), e(t, a, i, u);
      } finally {
        An(s), Pr.transition = f, St === pr && Pp();
      }
    }
    function $u(e) {
      Po !== null && Po.tag === Oo && (St & (Vr | Ai)) === pr && Yu();
      var t = St;
      St |= I0;
      var a = Pr.transition, i = Ua();
      try {
        return Pr.transition = null, An(Or), e ? e() : void 0;
      } finally {
        An(i), Pr.transition = a, St = t, (St & (Vr | Ai)) === pr && Lo();
      }
    }
    function eR() {
      return (St & (Vr | Ai)) !== pr;
    }
    function Fm(e, t) {
      ra(OS, Xl, e), Xl = qe(Xl, t);
    }
    function HS(e) {
      Xl = OS.current, na(OS, e);
    }
    function nc(e, t) {
      e.finishedWork = null, e.finishedLanes = $;
      var a = e.timeoutHandle;
      if (a !== Uy && (e.timeoutHandle = Uy, r1(a)), Dn !== null)
        for (var i = Dn.return; i !== null; ) {
          var u = i.alternate;
          k0(u, i), i = i.return;
        }
      Sa = e;
      var s = ac(e.current, null);
      return Dn = s, vr = Xl = t, hr = Vu, Fp = null, Om = $, jp = $, Lm = $, Hp = null, Pa = null, xw(), rl.discardPendingWarnings(), s;
    }
    function tR(e, t) {
      do {
        var a = Dn;
        try {
          if (Wh(), xC(), on(), DS.current = null, a === null || a.return === null) {
            hr = Up, Fp = t, Dn = null;
            return;
          }
          if (Ue && a.mode & Ot && Rm(a, !0), je)
            if (ha(), t !== null && typeof t == "object" && typeof t.then == "function") {
              var i = t;
              xi(a, i, vr);
            } else
              cs(a, t, vr);
          ex(e, a.return, a, t, vr), iR(a);
        } catch (u) {
          t = u, Dn === a && a !== null ? (a = a.return, Dn = a) : a = Dn;
          continue;
        }
        return;
      } while (!0);
    }
    function nR() {
      var e = _S.current;
      return _S.current = ym, e === null ? ym : e;
    }
    function rR(e) {
      _S.current = e;
    }
    function Lb() {
      LS = In();
    }
    function Yp(e) {
      Om = qe(e, Om);
    }
    function Mb() {
      hr === Vu && (hr = km);
    }
    function PS() {
      (hr === Vu || hr === km || hr === ec) && (hr = Ap), Sa !== null && (Cs(Om) || Cs(jp)) && Bo(Sa, vr);
    }
    function Nb(e) {
      hr !== Ap && (hr = ec), Hp === null ? Hp = [e] : Hp.push(e);
    }
    function zb() {
      return hr === Vu;
    }
    function jm(e, t) {
      var a = St;
      St |= Vr;
      var i = nR();
      if (Sa !== e || vr !== t) {
        if (Xr) {
          var u = e.memoizedUpdaters;
          u.size > 0 && (Ip(e, vr), u.clear()), Yv(e, t);
        }
        Bu = Ud(), nc(e, t);
      }
      Su(t);
      do
        try {
          Ub();
          break;
        } catch (s) {
          tR(e, s);
        }
      while (!0);
      if (Wh(), St = a, rR(i), Dn !== null)
        throw new Error("Cannot commit an incomplete root. This error is likely caused by a bug in React. Please file an issue.");
      return Oc(), Sa = null, vr = $, hr;
    }
    function Ub() {
      for (; Dn !== null; )
        aR(Dn);
    }
    function Ab(e, t) {
      var a = St;
      St |= Vr;
      var i = nR();
      if (Sa !== e || vr !== t) {
        if (Xr) {
          var u = e.memoizedUpdaters;
          u.size > 0 && (Ip(e, vr), u.clear()), Yv(e, t);
        }
        Bu = Ud(), Pp(), nc(e, t);
      }
      Su(t);
      do
        try {
          Fb();
          break;
        } catch (s) {
          tR(e, s);
        }
      while (!0);
      return Wh(), rR(i), St = a, Dn !== null ? (Uv(), Vu) : (Oc(), Sa = null, vr = $, hr);
    }
    function Fb() {
      for (; Dn !== null && !vd(); )
        aR(Dn);
    }
    function aR(e) {
      var t = e.alternate;
      Yt(e);
      var a;
      (e.mode & Ot) !== De ? ($g(e), a = VS(t, e, Xl), Rm(e, !0)) : a = VS(t, e, Xl), on(), e.memoizedProps = e.pendingProps, a === null ? iR(e) : Dn = a, DS.current = null;
    }
    function iR(e) {
      var t = e;
      do {
        var a = t.alternate, i = t.return;
        if ((t.flags & us) === _e) {
          Yt(t);
          var u = void 0;
          if ((t.mode & Ot) === De ? u = D0(a, t, Xl) : ($g(t), u = D0(a, t, Xl), Rm(t, !1)), on(), u !== null) {
            Dn = u;
            return;
          }
        } else {
          var s = Mx(a, t);
          if (s !== null) {
            s.flags &= kv, Dn = s;
            return;
          }
          if ((t.mode & Ot) !== De) {
            Rm(t, !1);
            for (var f = t.actualDuration, p = t.child; p !== null; )
              f += p.actualDuration, p = p.sibling;
            t.actualDuration = f;
          }
          if (i !== null)
            i.flags |= us, i.subtreeFlags = _e, i.deletions = null;
          else {
            hr = kS, Dn = null;
            return;
          }
        }
        var v = t.sibling;
        if (v !== null) {
          Dn = v;
          return;
        }
        t = i, Dn = t;
      } while (t !== null);
      hr === Vu && (hr = Q0);
    }
    function rc(e, t, a) {
      var i = Ua(), u = Pr.transition;
      try {
        Pr.transition = null, An(Or), jb(e, t, a, i);
      } finally {
        Pr.transition = u, An(i);
      }
      return null;
    }
    function jb(e, t, a, i) {
      do
        Yu();
      while (Po !== null);
      if (qb(), (St & (Vr | Ai)) !== pr)
        throw new Error("Should not already be working.");
      var u = e.finishedWork, s = e.finishedLanes;
      if (Ed(s), u === null)
        return Cd(), null;
      if (s === $ && S("root.finishedLanes should not be empty during a commit. This is a bug in React."), e.finishedWork = null, e.finishedLanes = $, u === e.current)
        throw new Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");
      e.callbackNode = null, e.callbackPriority = _t;
      var f = qe(u.lanes, u.childLanes);
      Nd(e, f), e === Sa && (Sa = null, Dn = null, vr = $), ((u.subtreeFlags & Wi) !== _e || (u.flags & Wi) !== _e) && (tc || (tc = !0, zS = a, YS(Gi, function() {
        return Yu(), null;
      })));
      var p = (u.subtreeFlags & (_l | Dl | kl | Wi)) !== _e, v = (u.flags & (_l | Dl | kl | Wi)) !== _e;
      if (p || v) {
        var y = Pr.transition;
        Pr.transition = null;
        var g = Ua();
        An(Or);
        var b = St;
        St |= Ai, DS.current = null, Fx(e, u), XC(), Kx(e, u, s), XT(e.containerInfo), e.current = u, fs(s), Zx(u, e, s), ds(), hd(), St = b, An(g), Pr.transition = y;
      } else
        e.current = u, XC();
      var w = tc;
      if (tc ? (tc = !1, Po = e, Vp = s) : (Vf = 0, zm = null), f = e.pendingLanes, f === $ && (Pf = null), w || sR(e.current, !1), yd(u.stateNode, i), Xr && e.memoizedUpdaters.clear(), yb(), Va(e, In()), t !== null)
        for (var M = e.onRecoverableError, A = 0; A < t.length; A++) {
          var j = t[A], le = j.stack, Le = j.digest;
          M(j.value, {
            componentStack: le,
            digest: Le
          });
        }
      if (Mm) {
        Mm = !1;
        var we = MS;
        throw MS = null, we;
      }
      return Zr(Vp, Ae) && e.tag !== Oo && Yu(), f = e.pendingLanes, Zr(f, Ae) ? ($w(), e === US ? Bp++ : (Bp = 0, US = e)) : Bp = 0, Lo(), Cd(), null;
    }
    function Yu() {
      if (Po !== null) {
        var e = Wv(Vp), t = _s(Na, e), a = Pr.transition, i = Ua();
        try {
          return Pr.transition = null, An(t), Pb();
        } finally {
          An(i), Pr.transition = a;
        }
      }
      return !1;
    }
    function Hb(e) {
      NS.push(e), tc || (tc = !0, YS(Gi, function() {
        return Yu(), null;
      }));
    }
    function Pb() {
      if (Po === null)
        return !1;
      var e = zS;
      zS = null;
      var t = Po, a = Vp;
      if (Po = null, Vp = $, (St & (Vr | Ai)) !== pr)
        throw new Error("Cannot flush passive effects while already rendering.");
      AS = !0, Nm = !1, gu(a);
      var i = St;
      St |= Ai, ib(t.current), tb(t, t.current, a, e);
      {
        var u = NS;
        NS = [];
        for (var s = 0; s < u.length; s++) {
          var f = u[s];
          Vx(t, f);
        }
      }
      wd(), sR(t.current, !0), St = i, Lo(), Nm ? t === zm ? Vf++ : (Vf = 0, zm = t) : Vf = 0, AS = !1, Nm = !1, gd(t);
      {
        var p = t.current.stateNode;
        p.effectDuration = 0, p.passiveEffectDuration = 0;
      }
      return !0;
    }
    function lR(e) {
      return Pf !== null && Pf.has(e);
    }
    function Vb(e) {
      Pf === null ? Pf = /* @__PURE__ */ new Set([e]) : Pf.add(e);
    }
    function Bb(e) {
      Mm || (Mm = !0, MS = e);
    }
    var $b = Bb;
    function uR(e, t, a) {
      var i = Zs(a, t), u = a0(e, i, Ae), s = No(e, u, Ae), f = Ea();
      s !== null && (go(s, Ae, f), Va(s, f));
    }
    function sn(e, t, a) {
      if (zx(a), Qp(!1), e.tag === ee) {
        uR(e, e, a);
        return;
      }
      var i = null;
      for (i = t; i !== null; ) {
        if (i.tag === ee) {
          uR(i, e, a);
          return;
        } else if (i.tag === ve) {
          var u = i.type, s = i.stateNode;
          if (typeof u.getDerivedStateFromError == "function" || typeof s.componentDidCatch == "function" && !lR(s)) {
            var f = Zs(a, e), p = uS(i, f, Ae), v = No(i, p, Ae), y = Ea();
            v !== null && (go(v, Ae, y), Va(v, y));
            return;
          }
        }
        i = i.return;
      }
      S(`Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Likely causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.

Error message:

%s`, a);
    }
    function Yb(e, t, a) {
      var i = e.pingCache;
      i !== null && i.delete(t);
      var u = Ea();
      Zc(e, a), Jb(e), Sa === e && _u(vr, a) && (hr === Ap || hr === km && bu(vr) && In() - LS < W0 ? nc(e, $) : Lm = qe(Lm, a)), Va(e, u);
    }
    function oR(e, t) {
      t === _t && (t = wb(e));
      var a = Ea(), i = ja(e, t);
      i !== null && (go(i, t, a), Va(i, a));
    }
    function Ib(e) {
      var t = e.memoizedState, a = _t;
      t !== null && (a = t.retryLane), oR(e, a);
    }
    function Qb(e, t) {
      var a = _t, i;
      switch (e.tag) {
        case be:
          i = e.stateNode;
          var u = e.memoizedState;
          u !== null && (a = u.retryLane);
          break;
        case an:
          i = e.stateNode;
          break;
        default:
          throw new Error("Pinged unknown suspense boundary type. This is probably a bug in React.");
      }
      i !== null && i.delete(t), oR(e, a);
    }
    function Wb(e) {
      return e < 120 ? 120 : e < 480 ? 480 : e < 1080 ? 1080 : e < 1920 ? 1920 : e < 3e3 ? 3e3 : e < 4320 ? 4320 : Eb(e / 1960) * 1960;
    }
    function Gb() {
      if (Bp > Rb)
        throw Bp = 0, US = null, new Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");
      Vf > Tb && (Vf = 0, zm = null, S("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render."));
    }
    function qb() {
      rl.flushLegacyContextWarning(), rl.flushPendingUnsafeLifecycleWarnings();
    }
    function sR(e, t) {
      Yt(e), Hm(e, bl, vb), t && Hm(e, Ri, hb), Hm(e, bl, db), t && Hm(e, Ri, pb), on();
    }
    function Hm(e, t, a) {
      for (var i = e, u = null; i !== null; ) {
        var s = i.subtreeFlags & t;
        i !== u && i.child !== null && s !== _e ? i = i.child : ((i.flags & t) !== _e && a(i), i.sibling !== null ? i = i.sibling : i = u = i.return);
      }
    }
    var Pm = null;
    function cR(e) {
      {
        if ((St & Vr) !== pr || !(e.mode & it))
          return;
        var t = e.tag;
        if (t !== lt && t !== ee && t !== ve && t !== de && t !== Ie && t !== ut && t !== Fe)
          return;
        var a = Ve(e) || "ReactComponent";
        if (Pm !== null) {
          if (Pm.has(a))
            return;
          Pm.add(a);
        } else
          Pm = /* @__PURE__ */ new Set([a]);
        var i = ar;
        try {
          Yt(e), S("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead.");
        } finally {
          i ? Yt(e) : on();
        }
      }
    }
    var VS;
    {
      var Xb = null;
      VS = function(e, t, a) {
        var i = gR(Xb, t);
        try {
          return T0(e, t, a);
        } catch (s) {
          if (ow() || s !== null && typeof s == "object" && typeof s.then == "function")
            throw s;
          if (Wh(), xC(), k0(e, t), gR(t, i), t.mode & Ot && $g(t), xl(null, T0, null, e, t, a), Ii()) {
            var u = ls();
            typeof u == "object" && u !== null && u._suppressLogging && typeof s == "object" && s !== null && !s._suppressLogging && (s._suppressLogging = !0);
          }
          throw s;
        }
      };
    }
    var fR = !1, BS;
    BS = /* @__PURE__ */ new Set();
    function Kb(e) {
      if (hi && !Pw())
        switch (e.tag) {
          case de:
          case Ie:
          case Fe: {
            var t = Dn && Ve(Dn) || "Unknown", a = t;
            if (!BS.has(a)) {
              BS.add(a);
              var i = Ve(e) || "Unknown";
              S("Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render", i, t, t);
            }
            break;
          }
          case ve: {
            fR || (S("Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."), fR = !0);
            break;
          }
        }
    }
    function Ip(e, t) {
      if (Xr) {
        var a = e.memoizedUpdaters;
        a.forEach(function(i) {
          xs(e, i, t);
        });
      }
    }
    var $S = {};
    function YS(e, t) {
      {
        var a = fl.current;
        return a !== null ? (a.push(t), $S) : pd(e, t);
      }
    }
    function dR(e) {
      if (e !== $S)
        return Lv(e);
    }
    function pR() {
      return fl.current !== null;
    }
    function Zb(e) {
      {
        if (e.mode & it) {
          if (!Y0())
            return;
        } else if (!Sb() || St !== pr || e.tag !== de && e.tag !== Ie && e.tag !== Fe)
          return;
        if (fl.current === null) {
          var t = ar;
          try {
            Yt(e), S(`An update to %s inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`, Ve(e));
          } finally {
            t ? Yt(e) : on();
          }
        }
      }
    }
    function Jb(e) {
      e.tag !== Oo && Y0() && fl.current === null && S(`A suspended resource finished loading inside a test, but the event was not wrapped in act(...).

When testing, code that resolves suspended data should be wrapped into act(...):

act(() => {
  /* finish loading suspended data */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`);
    }
    function Qp(e) {
      X0 = e;
    }
    var Fi = null, Bf = null, e_ = function(e) {
      Fi = e;
    };
    function $f(e) {
      {
        if (Fi === null)
          return e;
        var t = Fi(e);
        return t === void 0 ? e : t.current;
      }
    }
    function IS(e) {
      return $f(e);
    }
    function QS(e) {
      {
        if (Fi === null)
          return e;
        var t = Fi(e);
        if (t === void 0) {
          if (e != null && typeof e.render == "function") {
            var a = $f(e.render);
            if (e.render !== a) {
              var i = {
                $$typeof: B,
                render: a
              };
              return e.displayName !== void 0 && (i.displayName = e.displayName), i;
            }
          }
          return e;
        }
        return t.current;
      }
    }
    function vR(e, t) {
      {
        if (Fi === null)
          return !1;
        var a = e.elementType, i = t.type, u = !1, s = typeof i == "object" && i !== null ? i.$$typeof : null;
        switch (e.tag) {
          case ve: {
            typeof i == "function" && (u = !0);
            break;
          }
          case de: {
            (typeof i == "function" || s === Be) && (u = !0);
            break;
          }
          case Ie: {
            (s === B || s === Be) && (u = !0);
            break;
          }
          case ut:
          case Fe: {
            (s === We || s === Be) && (u = !0);
            break;
          }
          default:
            return !1;
        }
        if (u) {
          var f = Fi(a);
          if (f !== void 0 && f === Fi(i))
            return !0;
        }
        return !1;
      }
    }
    function hR(e) {
      {
        if (Fi === null || typeof WeakSet != "function")
          return;
        Bf === null && (Bf = /* @__PURE__ */ new WeakSet()), Bf.add(e);
      }
    }
    var t_ = function(e, t) {
      {
        if (Fi === null)
          return;
        var a = t.staleFamilies, i = t.updatedFamilies;
        Yu(), $u(function() {
          WS(e.current, i, a);
        });
      }
    }, n_ = function(e, t) {
      {
        if (e.context !== li)
          return;
        Yu(), $u(function() {
          Wp(t, e, null, null);
        });
      }
    };
    function WS(e, t, a) {
      {
        var i = e.alternate, u = e.child, s = e.sibling, f = e.tag, p = e.type, v = null;
        switch (f) {
          case de:
          case Fe:
          case ve:
            v = p;
            break;
          case Ie:
            v = p.render;
            break;
        }
        if (Fi === null)
          throw new Error("Expected resolveFamily to be set during hot reload.");
        var y = !1, g = !1;
        if (v !== null) {
          var b = Fi(v);
          b !== void 0 && (a.has(b) ? g = !0 : t.has(b) && (f === ve ? g = !0 : y = !0));
        }
        if (Bf !== null && (Bf.has(e) || i !== null && Bf.has(i)) && (g = !0), g && (e._debugNeedsRemount = !0), g || y) {
          var w = ja(e, Ae);
          w !== null && mr(w, e, Ae, Xt);
        }
        u !== null && !g && WS(u, t, a), s !== null && WS(s, t, a);
      }
    }
    var r_ = function(e, t) {
      {
        var a = /* @__PURE__ */ new Set(), i = new Set(t.map(function(u) {
          return u.current;
        }));
        return GS(e.current, i, a), a;
      }
    };
    function GS(e, t, a) {
      {
        var i = e.child, u = e.sibling, s = e.tag, f = e.type, p = null;
        switch (s) {
          case de:
          case Fe:
          case ve:
            p = f;
            break;
          case Ie:
            p = f.render;
            break;
        }
        var v = !1;
        p !== null && t.has(p) && (v = !0), v ? a_(e, a) : i !== null && GS(i, t, a), u !== null && GS(u, t, a);
      }
    }
    function a_(e, t) {
      {
        var a = i_(e, t);
        if (a)
          return;
        for (var i = e; ; ) {
          switch (i.tag) {
            case ue:
              t.add(i.stateNode);
              return;
            case Ce:
              t.add(i.stateNode.containerInfo);
              return;
            case ee:
              t.add(i.stateNode.containerInfo);
              return;
          }
          if (i.return === null)
            throw new Error("Expected to reach root first.");
          i = i.return;
        }
      }
    }
    function i_(e, t) {
      for (var a = e, i = !1; ; ) {
        if (a.tag === ue)
          i = !0, t.add(a.stateNode);
        else if (a.child !== null) {
          a.child.return = a, a = a.child;
          continue;
        }
        if (a === e)
          return i;
        for (; a.sibling === null; ) {
          if (a.return === null || a.return === e)
            return i;
          a = a.return;
        }
        a.sibling.return = a.return, a = a.sibling;
      }
      return !1;
    }
    var qS;
    {
      qS = !1;
      try {
        var mR = Object.preventExtensions({});
      } catch {
        qS = !0;
      }
    }
    function l_(e, t, a, i) {
      this.tag = e, this.key = a, this.elementType = null, this.type = null, this.stateNode = null, this.return = null, this.child = null, this.sibling = null, this.index = 0, this.ref = null, this.pendingProps = t, this.memoizedProps = null, this.updateQueue = null, this.memoizedState = null, this.dependencies = null, this.mode = i, this.flags = _e, this.subtreeFlags = _e, this.deletions = null, this.lanes = $, this.childLanes = $, this.alternate = null, this.actualDuration = Number.NaN, this.actualStartTime = Number.NaN, this.selfBaseDuration = Number.NaN, this.treeBaseDuration = Number.NaN, this.actualDuration = 0, this.actualStartTime = -1, this.selfBaseDuration = 0, this.treeBaseDuration = 0, this._debugSource = null, this._debugOwner = null, this._debugNeedsRemount = !1, this._debugHookTypes = null, !qS && typeof Object.preventExtensions == "function" && Object.preventExtensions(this);
    }
    var ui = function(e, t, a, i) {
      return new l_(e, t, a, i);
    };
    function XS(e) {
      var t = e.prototype;
      return !!(t && t.isReactComponent);
    }
    function u_(e) {
      return typeof e == "function" && !XS(e) && e.defaultProps === void 0;
    }
    function o_(e) {
      if (typeof e == "function")
        return XS(e) ? ve : de;
      if (e != null) {
        var t = e.$$typeof;
        if (t === B)
          return Ie;
        if (t === We)
          return ut;
      }
      return lt;
    }
    function ac(e, t) {
      var a = e.alternate;
      a === null ? (a = ui(e.tag, t, e.key, e.mode), a.elementType = e.elementType, a.type = e.type, a.stateNode = e.stateNode, a._debugSource = e._debugSource, a._debugOwner = e._debugOwner, a._debugHookTypes = e._debugHookTypes, a.alternate = e, e.alternate = a) : (a.pendingProps = t, a.type = e.type, a.flags = _e, a.subtreeFlags = _e, a.deletions = null, a.actualDuration = 0, a.actualStartTime = -1), a.flags = e.flags & Nn, a.childLanes = e.childLanes, a.lanes = e.lanes, a.child = e.child, a.memoizedProps = e.memoizedProps, a.memoizedState = e.memoizedState, a.updateQueue = e.updateQueue;
      var i = e.dependencies;
      switch (a.dependencies = i === null ? null : {
        lanes: i.lanes,
        firstContext: i.firstContext
      }, a.sibling = e.sibling, a.index = e.index, a.ref = e.ref, a.selfBaseDuration = e.selfBaseDuration, a.treeBaseDuration = e.treeBaseDuration, a._debugNeedsRemount = e._debugNeedsRemount, a.tag) {
        case lt:
        case de:
        case Fe:
          a.type = $f(e.type);
          break;
        case ve:
          a.type = IS(e.type);
          break;
        case Ie:
          a.type = QS(e.type);
          break;
      }
      return a;
    }
    function s_(e, t) {
      e.flags &= Nn | hn;
      var a = e.alternate;
      if (a === null)
        e.childLanes = $, e.lanes = t, e.child = null, e.subtreeFlags = _e, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null, e.selfBaseDuration = 0, e.treeBaseDuration = 0;
      else {
        e.childLanes = a.childLanes, e.lanes = a.lanes, e.child = a.child, e.subtreeFlags = _e, e.deletions = null, e.memoizedProps = a.memoizedProps, e.memoizedState = a.memoizedState, e.updateQueue = a.updateQueue, e.type = a.type;
        var i = a.dependencies;
        e.dependencies = i === null ? null : {
          lanes: i.lanes,
          firstContext: i.firstContext
        }, e.selfBaseDuration = a.selfBaseDuration, e.treeBaseDuration = a.treeBaseDuration;
      }
      return e;
    }
    function c_(e, t, a) {
      var i;
      return e === Fh ? (i = it, t === !0 && (i |= Wt, i |= Lt)) : i = De, Xr && (i |= Ot), ui(ee, null, null, i);
    }
    function KS(e, t, a, i, u, s) {
      var f = lt, p = e;
      if (typeof e == "function")
        XS(e) ? (f = ve, p = IS(p)) : p = $f(p);
      else if (typeof e == "string")
        f = ue;
      else
        e: switch (e) {
          case fi:
            return $o(a.children, u, s, t);
          case Qa:
            f = dt, u |= Wt, (u & it) !== De && (u |= Lt);
            break;
          case di:
            return f_(a, u, s, t);
          case ae:
            return d_(a, u, s, t);
          case he:
            return p_(a, u, s, t);
          case Rn:
            return yR(a, u, s, t);
          case en:
          case ot:
          case un:
          case rr:
          case at:
          default: {
            if (typeof e == "object" && e !== null)
              switch (e.$$typeof) {
                case pi:
                  f = ft;
                  break e;
                case R:
                  f = cn;
                  break e;
                case B:
                  f = Ie, p = QS(p);
                  break e;
                case We:
                  f = ut;
                  break e;
                case Be:
                  f = rn, p = null;
                  break e;
              }
            var v = "";
            {
              (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (v += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
              var y = i ? Ve(i) : null;
              y && (v += `

Check the render method of \`` + y + "`.");
            }
            throw new Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) " + ("but got: " + (e == null ? e : typeof e) + "." + v));
          }
        }
      var g = ui(f, a, t, u);
      return g.elementType = e, g.type = p, g.lanes = s, g._debugOwner = i, g;
    }
    function ZS(e, t, a) {
      var i = null;
      i = e._owner;
      var u = e.type, s = e.key, f = e.props, p = KS(u, s, f, i, t, a);
      return p._debugSource = e._source, p._debugOwner = e._owner, p;
    }
    function $o(e, t, a, i) {
      var u = ui(mt, e, i, t);
      return u.lanes = a, u;
    }
    function f_(e, t, a, i) {
      typeof e.id != "string" && S('Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.', typeof e.id);
      var u = ui(pt, e, i, t | Ot);
      return u.elementType = di, u.lanes = a, u.stateNode = {
        effectDuration: 0,
        passiveEffectDuration: 0
      }, u;
    }
    function d_(e, t, a, i) {
      var u = ui(be, e, i, t);
      return u.elementType = ae, u.lanes = a, u;
    }
    function p_(e, t, a, i) {
      var u = ui(an, e, i, t);
      return u.elementType = he, u.lanes = a, u;
    }
    function yR(e, t, a, i) {
      var u = ui(ke, e, i, t);
      u.elementType = Rn, u.lanes = a;
      var s = {
        isHidden: !1
      };
      return u.stateNode = s, u;
    }
    function JS(e, t, a) {
      var i = ui(Ye, e, null, t);
      return i.lanes = a, i;
    }
    function v_() {
      var e = ui(ue, null, null, De);
      return e.elementType = "DELETED", e;
    }
    function h_(e) {
      var t = ui(Kt, null, null, De);
      return t.stateNode = e, t;
    }
    function eE(e, t, a) {
      var i = e.children !== null ? e.children : [], u = ui(Ce, i, e.key, t);
      return u.lanes = a, u.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        // Used by persistent updates
        implementation: e.implementation
      }, u;
    }
    function gR(e, t) {
      return e === null && (e = ui(lt, null, null, De)), e.tag = t.tag, e.key = t.key, e.elementType = t.elementType, e.type = t.type, e.stateNode = t.stateNode, e.return = t.return, e.child = t.child, e.sibling = t.sibling, e.index = t.index, e.ref = t.ref, e.pendingProps = t.pendingProps, e.memoizedProps = t.memoizedProps, e.updateQueue = t.updateQueue, e.memoizedState = t.memoizedState, e.dependencies = t.dependencies, e.mode = t.mode, e.flags = t.flags, e.subtreeFlags = t.subtreeFlags, e.deletions = t.deletions, e.lanes = t.lanes, e.childLanes = t.childLanes, e.alternate = t.alternate, e.actualDuration = t.actualDuration, e.actualStartTime = t.actualStartTime, e.selfBaseDuration = t.selfBaseDuration, e.treeBaseDuration = t.treeBaseDuration, e._debugSource = t._debugSource, e._debugOwner = t._debugOwner, e._debugNeedsRemount = t._debugNeedsRemount, e._debugHookTypes = t._debugHookTypes, e;
    }
    function m_(e, t, a, i, u) {
      this.tag = t, this.containerInfo = e, this.pendingChildren = null, this.current = null, this.pingCache = null, this.finishedWork = null, this.timeoutHandle = Uy, this.context = null, this.pendingContext = null, this.callbackNode = null, this.callbackPriority = _t, this.eventTimes = ws($), this.expirationTimes = ws(Xt), this.pendingLanes = $, this.suspendedLanes = $, this.pingedLanes = $, this.expiredLanes = $, this.mutableReadLanes = $, this.finishedLanes = $, this.entangledLanes = $, this.entanglements = ws($), this.identifierPrefix = i, this.onRecoverableError = u, this.mutableSourceEagerHydrationData = null, this.effectDuration = 0, this.passiveEffectDuration = 0;
      {
        this.memoizedUpdaters = /* @__PURE__ */ new Set();
        for (var s = this.pendingUpdatersLaneMap = [], f = 0; f < Eu; f++)
          s.push(/* @__PURE__ */ new Set());
      }
      switch (t) {
        case Fh:
          this._debugRootType = a ? "hydrateRoot()" : "createRoot()";
          break;
        case Oo:
          this._debugRootType = a ? "hydrate()" : "render()";
          break;
      }
    }
    function SR(e, t, a, i, u, s, f, p, v, y) {
      var g = new m_(e, t, a, p, v), b = c_(t, s);
      g.current = b, b.stateNode = g;
      {
        var w = {
          element: i,
          isDehydrated: a,
          cache: null,
          // not enabled yet
          transitions: null,
          pendingSuspenseBoundaries: null
        };
        b.memoizedState = w;
      }
      return pg(b), g;
    }
    var tE = "18.3.1";
    function y_(e, t, a) {
      var i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
      return $r(i), {
        // This tag allow us to uniquely identify this as a React Portal
        $$typeof: nr,
        key: i == null ? null : "" + i,
        children: e,
        containerInfo: t,
        implementation: a
      };
    }
    var nE, rE;
    nE = !1, rE = {};
    function ER(e) {
      if (!e)
        return li;
      var t = fo(e), a = J1(t);
      if (t.tag === ve) {
        var i = t.type;
        if ($l(i))
          return WE(t, i, a);
      }
      return a;
    }
    function g_(e, t) {
      {
        var a = fo(e);
        if (a === void 0) {
          if (typeof e.render == "function")
            throw new Error("Unable to find node on an unmounted component.");
          var i = Object.keys(e).join(",");
          throw new Error("Argument appears to not be a ReactComponent. Keys: " + i);
        }
        var u = Gr(a);
        if (u === null)
          return null;
        if (u.mode & Wt) {
          var s = Ve(a) || "Component";
          if (!rE[s]) {
            rE[s] = !0;
            var f = ar;
            try {
              Yt(u), a.mode & Wt ? S("%s is deprecated in StrictMode. %s was passed an instance of %s which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, s) : S("%s is deprecated in StrictMode. %s was passed an instance of %s which renders StrictMode children. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, s);
            } finally {
              f ? Yt(f) : on();
            }
          }
        }
        return u.stateNode;
      }
    }
    function CR(e, t, a, i, u, s, f, p) {
      var v = !1, y = null;
      return SR(e, t, v, y, a, i, u, s, f);
    }
    function RR(e, t, a, i, u, s, f, p, v, y) {
      var g = !0, b = SR(a, i, g, e, u, s, f, p, v);
      b.context = ER(null);
      var w = b.current, M = Ea(), A = Vo(w), j = Hu(M, A);
      return j.callback = t ?? null, No(w, j, A), xb(b, A, M), b;
    }
    function Wp(e, t, a, i) {
      md(t, e);
      var u = t.current, s = Ea(), f = Vo(u);
      yn(f);
      var p = ER(a);
      t.context === null ? t.context = p : t.pendingContext = p, hi && ar !== null && !nE && (nE = !0, S(`Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.

Check the render method of %s.`, Ve(ar) || "Unknown"));
      var v = Hu(s, f);
      v.payload = {
        element: e
      }, i = i === void 0 ? null : i, i !== null && (typeof i != "function" && S("render(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", i), v.callback = i);
      var y = No(u, v, f);
      return y !== null && (mr(y, u, f, s), Zh(y, u, f)), f;
    }
    function Vm(e) {
      var t = e.current;
      if (!t.child)
        return null;
      switch (t.child.tag) {
        case ue:
          return t.child.stateNode;
        default:
          return t.child.stateNode;
      }
    }
    function S_(e) {
      switch (e.tag) {
        case ee: {
          var t = e.stateNode;
          if (ef(t)) {
            var a = Fv(t);
            kb(t, a);
          }
          break;
        }
        case be: {
          $u(function() {
            var u = ja(e, Ae);
            if (u !== null) {
              var s = Ea();
              mr(u, e, Ae, s);
            }
          });
          var i = Ae;
          aE(e, i);
          break;
        }
      }
    }
    function TR(e, t) {
      var a = e.memoizedState;
      a !== null && a.dehydrated !== null && (a.retryLane = Bv(a.retryLane, t));
    }
    function aE(e, t) {
      TR(e, t);
      var a = e.alternate;
      a && TR(a, t);
    }
    function E_(e) {
      if (e.tag === be) {
        var t = gs, a = ja(e, t);
        if (a !== null) {
          var i = Ea();
          mr(a, e, t, i);
        }
        aE(e, t);
      }
    }
    function C_(e) {
      if (e.tag === be) {
        var t = Vo(e), a = ja(e, t);
        if (a !== null) {
          var i = Ea();
          mr(a, e, t, i);
        }
        aE(e, t);
      }
    }
    function wR(e) {
      var t = fn(e);
      return t === null ? null : t.stateNode;
    }
    var xR = function(e) {
      return null;
    };
    function R_(e) {
      return xR(e);
    }
    var bR = function(e) {
      return !1;
    };
    function T_(e) {
      return bR(e);
    }
    var _R = null, DR = null, kR = null, OR = null, LR = null, MR = null, NR = null, zR = null, UR = null;
    {
      var AR = function(e, t, a) {
        var i = t[a], u = tt(e) ? e.slice() : Ke({}, e);
        return a + 1 === t.length ? (tt(u) ? u.splice(i, 1) : delete u[i], u) : (u[i] = AR(e[i], t, a + 1), u);
      }, FR = function(e, t) {
        return AR(e, t, 0);
      }, jR = function(e, t, a, i) {
        var u = t[i], s = tt(e) ? e.slice() : Ke({}, e);
        if (i + 1 === t.length) {
          var f = a[i];
          s[f] = s[u], tt(s) ? s.splice(u, 1) : delete s[u];
        } else
          s[u] = jR(
            // $FlowFixMe number or string is fine here
            e[u],
            t,
            a,
            i + 1
          );
        return s;
      }, HR = function(e, t, a) {
        if (t.length !== a.length) {
          Rt("copyWithRename() expects paths of the same length");
          return;
        } else
          for (var i = 0; i < a.length - 1; i++)
            if (t[i] !== a[i]) {
              Rt("copyWithRename() expects paths to be the same except for the deepest key");
              return;
            }
        return jR(e, t, a, 0);
      }, PR = function(e, t, a, i) {
        if (a >= t.length)
          return i;
        var u = t[a], s = tt(e) ? e.slice() : Ke({}, e);
        return s[u] = PR(e[u], t, a + 1, i), s;
      }, VR = function(e, t, a) {
        return PR(e, t, 0, a);
      }, iE = function(e, t) {
        for (var a = e.memoizedState; a !== null && t > 0; )
          a = a.next, t--;
        return a;
      };
      _R = function(e, t, a, i) {
        var u = iE(e, t);
        if (u !== null) {
          var s = VR(u.memoizedState, a, i);
          u.memoizedState = s, u.baseState = s, e.memoizedProps = Ke({}, e.memoizedProps);
          var f = ja(e, Ae);
          f !== null && mr(f, e, Ae, Xt);
        }
      }, DR = function(e, t, a) {
        var i = iE(e, t);
        if (i !== null) {
          var u = FR(i.memoizedState, a);
          i.memoizedState = u, i.baseState = u, e.memoizedProps = Ke({}, e.memoizedProps);
          var s = ja(e, Ae);
          s !== null && mr(s, e, Ae, Xt);
        }
      }, kR = function(e, t, a, i) {
        var u = iE(e, t);
        if (u !== null) {
          var s = HR(u.memoizedState, a, i);
          u.memoizedState = s, u.baseState = s, e.memoizedProps = Ke({}, e.memoizedProps);
          var f = ja(e, Ae);
          f !== null && mr(f, e, Ae, Xt);
        }
      }, OR = function(e, t, a) {
        e.pendingProps = VR(e.memoizedProps, t, a), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var i = ja(e, Ae);
        i !== null && mr(i, e, Ae, Xt);
      }, LR = function(e, t) {
        e.pendingProps = FR(e.memoizedProps, t), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var a = ja(e, Ae);
        a !== null && mr(a, e, Ae, Xt);
      }, MR = function(e, t, a) {
        e.pendingProps = HR(e.memoizedProps, t, a), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var i = ja(e, Ae);
        i !== null && mr(i, e, Ae, Xt);
      }, NR = function(e) {
        var t = ja(e, Ae);
        t !== null && mr(t, e, Ae, Xt);
      }, zR = function(e) {
        xR = e;
      }, UR = function(e) {
        bR = e;
      };
    }
    function w_(e) {
      var t = Gr(e);
      return t === null ? null : t.stateNode;
    }
    function x_(e) {
      return null;
    }
    function b_() {
      return ar;
    }
    function __(e) {
      var t = e.findFiberByHostInstance, a = z.ReactCurrentDispatcher;
      return ho({
        bundleType: e.bundleType,
        version: e.version,
        rendererPackageName: e.rendererPackageName,
        rendererConfig: e.rendererConfig,
        overrideHookState: _R,
        overrideHookStateDeletePath: DR,
        overrideHookStateRenamePath: kR,
        overrideProps: OR,
        overridePropsDeletePath: LR,
        overridePropsRenamePath: MR,
        setErrorHandler: zR,
        setSuspenseHandler: UR,
        scheduleUpdate: NR,
        currentDispatcherRef: a,
        findHostInstanceByFiber: w_,
        findFiberByHostInstance: t || x_,
        // React Refresh
        findHostInstancesForRefresh: r_,
        scheduleRefresh: t_,
        scheduleRoot: n_,
        setRefreshHandler: e_,
        // Enables DevTools to append owner stacks to error messages in DEV mode.
        getCurrentFiber: b_,
        // Enables DevTools to detect reconciler version rather than renderer version
        // which may not match for third party renderers.
        reconcilerVersion: tE
      });
    }
    var BR = typeof reportError == "function" ? (
      // In modern browsers, reportError will dispatch an error event,
      // emulating an uncaught JavaScript error.
      reportError
    ) : function(e) {
      console.error(e);
    };
    function lE(e) {
      this._internalRoot = e;
    }
    Bm.prototype.render = lE.prototype.render = function(e) {
      var t = this._internalRoot;
      if (t === null)
        throw new Error("Cannot update an unmounted root.");
      {
        typeof arguments[1] == "function" ? S("render(...): does not support the second callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().") : $m(arguments[1]) ? S("You passed a container to the second argument of root.render(...). You don't need to pass it again since you already passed it to create the root.") : typeof arguments[1] < "u" && S("You passed a second argument to root.render(...) but it only accepts one argument.");
        var a = t.containerInfo;
        if (a.nodeType !== Ln) {
          var i = wR(t.current);
          i && i.parentNode !== a && S("render(...): It looks like the React-rendered content of the root container was removed without using React. This is not supported and will cause errors. Instead, call root.unmount() to empty a root's container.");
        }
      }
      Wp(e, t, null, null);
    }, Bm.prototype.unmount = lE.prototype.unmount = function() {
      typeof arguments[0] == "function" && S("unmount(...): does not support a callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().");
      var e = this._internalRoot;
      if (e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        eR() && S("Attempted to synchronously unmount a root while React was already rendering. React cannot finish unmounting the root until the current render has completed, which may lead to a race condition."), $u(function() {
          Wp(null, e, null, null);
        }), BE(t);
      }
    };
    function D_(e, t) {
      if (!$m(e))
        throw new Error("createRoot(...): Target container is not a DOM element.");
      $R(e);
      var a = !1, i = !1, u = "", s = BR;
      t != null && (t.hydrate ? Rt("hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead.") : typeof t == "object" && t !== null && t.$$typeof === br && S(`You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:

  let root = createRoot(domContainer);
  root.render(<App />);`), t.unstable_strictMode === !0 && (a = !0), t.identifierPrefix !== void 0 && (u = t.identifierPrefix), t.onRecoverableError !== void 0 && (s = t.onRecoverableError), t.transitionCallbacks !== void 0 && t.transitionCallbacks);
      var f = CR(e, Fh, null, a, i, u, s);
      Oh(f.current, e);
      var p = e.nodeType === Ln ? e.parentNode : e;
      return Jd(p), new lE(f);
    }
    function Bm(e) {
      this._internalRoot = e;
    }
    function k_(e) {
      e && Zv(e);
    }
    Bm.prototype.unstable_scheduleHydration = k_;
    function O_(e, t, a) {
      if (!$m(e))
        throw new Error("hydrateRoot(...): Target container is not a DOM element.");
      $R(e), t === void 0 && S("Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)");
      var i = a ?? null, u = a != null && a.hydratedSources || null, s = !1, f = !1, p = "", v = BR;
      a != null && (a.unstable_strictMode === !0 && (s = !0), a.identifierPrefix !== void 0 && (p = a.identifierPrefix), a.onRecoverableError !== void 0 && (v = a.onRecoverableError));
      var y = RR(t, null, e, Fh, i, s, f, p, v);
      if (Oh(y.current, e), Jd(e), u)
        for (var g = 0; g < u.length; g++) {
          var b = u[g];
          zw(y, b);
        }
      return new Bm(y);
    }
    function $m(e) {
      return !!(e && (e.nodeType === Ir || e.nodeType === Yi || e.nodeType === td));
    }
    function Gp(e) {
      return !!(e && (e.nodeType === Ir || e.nodeType === Yi || e.nodeType === td || e.nodeType === Ln && e.nodeValue === " react-mount-point-unstable "));
    }
    function $R(e) {
      e.nodeType === Ir && e.tagName && e.tagName.toUpperCase() === "BODY" && S("createRoot(): Creating roots directly with document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try using a container element created for your app."), cp(e) && (e._reactRootContainer ? S("You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported.") : S("You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."));
    }
    var L_ = z.ReactCurrentOwner, YR;
    YR = function(e) {
      if (e._reactRootContainer && e.nodeType !== Ln) {
        var t = wR(e._reactRootContainer.current);
        t && t.parentNode !== e && S("render(...): It looks like the React-rendered content of this container was removed without using React. This is not supported and will cause errors. Instead, call ReactDOM.unmountComponentAtNode to empty a container.");
      }
      var a = !!e._reactRootContainer, i = uE(e), u = !!(i && Do(i));
      u && !a && S("render(...): Replacing React-rendered children with a new root component. If you intended to update the children of this node, you should instead have the existing children update their state and render the new components instead of calling ReactDOM.render."), e.nodeType === Ir && e.tagName && e.tagName.toUpperCase() === "BODY" && S("render(): Rendering components directly into document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try rendering into a container element created for your app.");
    };
    function uE(e) {
      return e ? e.nodeType === Yi ? e.documentElement : e.firstChild : null;
    }
    function IR() {
    }
    function M_(e, t, a, i, u) {
      if (u) {
        if (typeof i == "function") {
          var s = i;
          i = function() {
            var w = Vm(f);
            s.call(w);
          };
        }
        var f = RR(
          t,
          i,
          e,
          Oo,
          null,
          // hydrationCallbacks
          !1,
          // isStrictMode
          !1,
          // concurrentUpdatesByDefaultOverride,
          "",
          // identifierPrefix
          IR
        );
        e._reactRootContainer = f, Oh(f.current, e);
        var p = e.nodeType === Ln ? e.parentNode : e;
        return Jd(p), $u(), f;
      } else {
        for (var v; v = e.lastChild; )
          e.removeChild(v);
        if (typeof i == "function") {
          var y = i;
          i = function() {
            var w = Vm(g);
            y.call(w);
          };
        }
        var g = CR(
          e,
          Oo,
          null,
          // hydrationCallbacks
          !1,
          // isStrictMode
          !1,
          // concurrentUpdatesByDefaultOverride,
          "",
          // identifierPrefix
          IR
        );
        e._reactRootContainer = g, Oh(g.current, e);
        var b = e.nodeType === Ln ? e.parentNode : e;
        return Jd(b), $u(function() {
          Wp(t, g, a, i);
        }), g;
      }
    }
    function N_(e, t) {
      e !== null && typeof e != "function" && S("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e);
    }
    function Ym(e, t, a, i, u) {
      YR(a), N_(u === void 0 ? null : u, "render");
      var s = a._reactRootContainer, f;
      if (!s)
        f = M_(a, t, e, u, i);
      else {
        if (f = s, typeof u == "function") {
          var p = u;
          u = function() {
            var v = Vm(f);
            p.call(v);
          };
        }
        Wp(t, f, e, u);
      }
      return Vm(f);
    }
    var QR = !1;
    function z_(e) {
      {
        QR || (QR = !0, S("findDOMNode is deprecated and will be removed in the next major release. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node"));
        var t = L_.current;
        if (t !== null && t.stateNode !== null) {
          var a = t.stateNode._warnedAboutRefsInRender;
          a || S("%s is accessing findDOMNode inside its render(). render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", Tt(t.type) || "A component"), t.stateNode._warnedAboutRefsInRender = !0;
        }
      }
      return e == null ? null : e.nodeType === Ir ? e : g_(e, "findDOMNode");
    }
    function U_(e, t, a) {
      if (S("ReactDOM.hydrate is no longer supported in React 18. Use hydrateRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Gp(t))
        throw new Error("Target container is not a DOM element.");
      {
        var i = cp(t) && t._reactRootContainer === void 0;
        i && S("You are calling ReactDOM.hydrate() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call hydrateRoot(container, element)?");
      }
      return Ym(null, e, t, !0, a);
    }
    function A_(e, t, a) {
      if (S("ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Gp(t))
        throw new Error("Target container is not a DOM element.");
      {
        var i = cp(t) && t._reactRootContainer === void 0;
        i && S("You are calling ReactDOM.render() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.render(element)?");
      }
      return Ym(null, e, t, !1, a);
    }
    function F_(e, t, a, i) {
      if (S("ReactDOM.unstable_renderSubtreeIntoContainer() is no longer supported in React 18. Consider using a portal instead. Until you switch to the createRoot API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Gp(a))
        throw new Error("Target container is not a DOM element.");
      if (e == null || !ay(e))
        throw new Error("parentComponent must be a valid React Component");
      return Ym(e, t, a, !1, i);
    }
    var WR = !1;
    function j_(e) {
      if (WR || (WR = !0, S("unmountComponentAtNode is deprecated and will be removed in the next major release. Switch to the createRoot API. Learn more: https://reactjs.org/link/switch-to-createroot")), !Gp(e))
        throw new Error("unmountComponentAtNode(...): Target container is not a DOM element.");
      {
        var t = cp(e) && e._reactRootContainer === void 0;
        t && S("You are calling ReactDOM.unmountComponentAtNode() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.unmount()?");
      }
      if (e._reactRootContainer) {
        {
          var a = uE(e), i = a && !Do(a);
          i && S("unmountComponentAtNode(): The node you're attempting to unmount was rendered by another copy of React.");
        }
        return $u(function() {
          Ym(null, null, e, !1, function() {
            e._reactRootContainer = null, BE(e);
          });
        }), !0;
      } else {
        {
          var u = uE(e), s = !!(u && Do(u)), f = e.nodeType === Ir && Gp(e.parentNode) && !!e.parentNode._reactRootContainer;
          s && S("unmountComponentAtNode(): The node you're attempting to unmount was rendered by React and is not a top-level container. %s", f ? "You may have accidentally passed in a React root node instead of its container." : "Instead, have the parent component update its state and rerender in order to remove this component.");
        }
        return !1;
      }
    }
    Rr(S_), So(E_), Gv(C_), ks(Ua), Ad(Iv), (typeof Map != "function" || // $FlowIssue Flow incorrectly thinks Map has no prototype
    Map.prototype == null || typeof Map.prototype.forEach != "function" || typeof Set != "function" || // $FlowIssue Flow incorrectly thinks Set has no prototype
    Set.prototype == null || typeof Set.prototype.clear != "function" || typeof Set.prototype.forEach != "function") && S("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"), yc(PT), ry(jS, Ob, $u);
    function H_(e, t) {
      var a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
      if (!$m(t))
        throw new Error("Target container is not a DOM element.");
      return y_(e, t, null, a);
    }
    function P_(e, t, a, i) {
      return F_(e, t, a, i);
    }
    var oE = {
      usingClientEntryPoint: !1,
      // Keep in sync with ReactTestUtils.js.
      // This is an array for better minification.
      Events: [Do, Ef, Lh, uo, gc, jS]
    };
    function V_(e, t) {
      return oE.usingClientEntryPoint || S('You are importing createRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), D_(e, t);
    }
    function B_(e, t, a) {
      return oE.usingClientEntryPoint || S('You are importing hydrateRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), O_(e, t, a);
    }
    function $_(e) {
      return eR() && S("flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task."), $u(e);
    }
    var Y_ = __({
      findFiberByHostInstance: $s,
      bundleType: 1,
      version: tE,
      rendererPackageName: "react-dom"
    });
    if (!Y_ && kn && window.top === window.self && (navigator.userAgent.indexOf("Chrome") > -1 && navigator.userAgent.indexOf("Edge") === -1 || navigator.userAgent.indexOf("Firefox") > -1)) {
      var GR = window.location.protocol;
      /^(https?|file):$/.test(GR) && console.info("%cDownload the React DevTools for a better development experience: https://reactjs.org/link/react-devtools" + (GR === "file:" ? `
You might need to use a local HTTP server (instead of file://): https://reactjs.org/link/react-devtools-faq` : ""), "font-weight:bold");
    }
    $a.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = oE, $a.createPortal = H_, $a.createRoot = V_, $a.findDOMNode = z_, $a.flushSync = $_, $a.hydrate = U_, $a.hydrateRoot = B_, $a.render = A_, $a.unmountComponentAtNode = j_, $a.unstable_batchedUpdates = jS, $a.unstable_renderSubtreeIntoContainer = P_, $a.version = tE, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  }()), $a;
}
function lT() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) {
    if (process.env.NODE_ENV !== "production")
      throw new Error("^_^");
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(lT);
    } catch (J) {
      console.error(J);
    }
  }
}
process.env.NODE_ENV === "production" ? (lT(), pE.exports = J_()) : pE.exports = eD();
var tD = pE.exports, vE, Qm = tD;
if (process.env.NODE_ENV === "production")
  vE = Qm.createRoot, Qm.hydrateRoot;
else {
  var aT = Qm.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  vE = function(J, W) {
    aT.usingClientEntryPoint = !0;
    try {
      return Qm.createRoot(J, W);
    } finally {
      aT.usingClientEntryPoint = !1;
    }
  };
}
function nD({
  state: J,
  definitions: W
}) {
  return /* @__PURE__ */ ua.jsxs(ua.Fragment, { children: [
    /* @__PURE__ */ ua.jsxs("div", { className: "debug-metric", children: [
      /* @__PURE__ */ ua.jsx("strong", { children: "Overall status:" }),
      " ",
      /* @__PURE__ */ ua.jsx("span", { children: J.globalStatus })
    ] }),
    /* @__PURE__ */ ua.jsxs("div", { className: "debug-metric", children: [
      /* @__PURE__ */ ua.jsx("strong", { children: "SR:" }),
      " ",
      /* @__PURE__ */ ua.jsx("span", { children: J.sampleRate })
    ] }),
    W.map((z) => {
      const ct = J.pipelines[z.key] ?? {
        frequencyText: "—",
        statusText: "—"
      };
      return /* @__PURE__ */ ua.jsxs(Jp.Fragment, { children: [
        /* @__PURE__ */ ua.jsxs("div", { className: "debug-metric", children: [
          /* @__PURE__ */ ua.jsxs("strong", { children: [
            z.label,
            " Hz:"
          ] }),
          " ",
          /* @__PURE__ */ ua.jsx("span", { children: ct.frequencyText })
        ] }),
        /* @__PURE__ */ ua.jsxs("div", { className: "debug-metric", children: [
          /* @__PURE__ */ ua.jsxs("strong", { children: [
            z.label,
            " status:"
          ] }),
          " ",
          /* @__PURE__ */ ua.jsx("span", { children: ct.statusText })
        ] })
      ] }, z.key);
    })
  ] });
}
class rD {
  constructor({
    container: W,
    pipelines: z,
    initialStatus: ct = "",
    initialSampleRate: Ct = ""
  }) {
    this.definitions = z, this.root = vE(W), this.state = {
      globalStatus: ct,
      sampleRate: Ct,
      pipelines: Object.fromEntries(
        z.map((Rt) => [
          Rt.key,
          {
            frequencyText: "—",
            statusText: "—"
          }
        ])
      )
    }, this.render();
  }
  setGlobalStatus(W) {
    this.state.globalStatus = W, this.render();
  }
  setSampleRate(W) {
    this.state.sampleRate = W, this.render();
  }
  setPipelineFrequency(W, z) {
    const ct = this.state.pipelines[W];
    ct && (ct.frequencyText = z && z.trim().length > 0 ? z : "—", this.render());
  }
  resetPipelineFrequencies() {
    for (const W of Object.values(this.state.pipelines))
      W.frequencyText = "—";
    this.render();
  }
  setPipelineStatus(W, z) {
    const ct = this.state.pipelines[W];
    ct && (ct.statusText = z && z.trim().length > 0 ? z : "—", this.render());
  }
  resetPipelineStatuses() {
    for (const W of Object.values(this.state.pipelines))
      W.statusText = "—";
    this.render();
  }
  render() {
    this.root.render(
      /* @__PURE__ */ ua.jsx(
        nD,
        {
          state: this.state,
          definitions: this.definitions
        }
      )
    );
  }
}
function uD(J) {
  return new rD(J);
}
export {
  rD as PipelineDebugMetricsController,
  uD as mountPipelineDebugMetrics
};
