/**
 * Webcomponent의 생명주기와 비슷하게 섹션을 컨트롤 할 수 있습니다.
 */
(function () {
  var base = {
    version: '1.0.0',
    component: {},
    ready: false,
    register: register,
    connect: connect,
    change: change,
    disconnect: disconnect,
  }

  try {
    polyfill();
    init();
  } catch (e) {

  }

  function init() {
    try {
      _init();
    } catch (e) {
      console.error(e);
    }
  }

  function _run(name, section, fn, type) {
    var handlers = this.component[name];
    if (handlers) {
      for (var j = 0; j < handlers.length; j++) {
        if (handlers[j][fn]) {
          handlers[j][fn](section, type);
        }
      }
    }
  }

  function connect(name, section, type) {
    return _run.call(this, name, section, 'connect', type)
  }

  function change(name, section, type) {
    return _run.call(this, name, section, 'change', type)
  }

  function disconnect(name, section, type) {
    return _run.call(this, name, section, 'disconnect', type)
  }

  /**
   * 섹션의 라이프사이클 관리 기능을 등록합니다.
   * @param  {string} name 섹션 이름
   * @param  {function | object} init 초기화시 호출 함수 또는 함수목록
   * @returns void
   */
  function register(name, init) {
    var handler = _register.call(this, name, (init.init || init)(), arguments);
    if (EZST.ready) {
      var sections = document.querySelectorAll('[data-ez-module="' + name + '"]');
      for (var i = 0; i < sections.length; i++) {
        if (handler.init) {
          handler.init(sections[i]);
        }
        if (handler.connect) {
          handler.connect(sections[i]);
        }
      }
    }
  }

  function _init() {
    window.addEventListener('DOMContentLoaded', function (ev) {
      EZST.ready = true;
      for (var k in EZST.component) {
        var sections = document.querySelectorAll('[data-ez-module="' + k + '"]');
        for (var i = 0; i < sections.length; i++) {
          var handlers = EZST.component[k];
          for (var j = 0; j < handlers.length; j++) {
            if (handlers[j].init) {
              handlers[j].init(sections[i]);
            }
            if (handlers[j].connect) {
              handlers[j].connect(sections[i]);
            }
          }
        }
      }
    });

    window.EZST = Object.assign(window.EZST || {}, base, {
      status: ('EZST' in window) ? 1 : 0,
    });

    _prepare();
    _setViewType();
    _cleanup()
  }

  function _setViewType() {
    try {
      var mq = window.matchMedia("(max-width: 1024px)");
      mq.addEventListener('change', function (ev) {
        _changeViewType(ev.target);

      }, false);
      _changeViewType(mq);
    } catch (e) {

    }
  }
  function _changeViewType(mq) {
    document.documentElement.classList.toggle('ez-view-type-mobile', mq.matches);
  }

  function _cleanup() {
    window.addEventListener('DOMContentLoaded', function (ev) {
      var props = document.documentElement.querySelectorAll('ez-prop,script[type="text/ez-prop"]');
      for (var i = 0; i < props.length; i++) {
        props[i].parentNode && props[i].parentNode.removeChild(props[i]);
      }
    });
  }

  function _prepare() {
    if (EZST.q && EZST.q.length) {
      for (var i = 0; i < EZST.q.length; i++) {
        _register.apply(EZST, EZST.q[i]);
      }
      delete EZST.q;
    }
  }

  function _register(name, init, raw) {
    var handler = {
      // init: function (section) { },
      // disconnect: function (section) { },
      // changed: function (section) { },
      // connect: function (section) { },
    };
    Object.assign(handler, (init && init.constructor === Object) ? init : (raw[1].constructor === Object) ? raw[1] : {});
    if (!this.component[name]) {
      this.component[name] = [];
    }
    this.component[name].push(handler);
    return handler;
  }

  function polyfill() {
    if (typeof Object.assign != "function") {
      Object.defineProperty(Object, "assign", {
        value: function assign(target, varArgs) {
          "use strict";
          if (target == null) {
            throw new TypeError("Cannot convert undefined or null to object");
          }
          var to = Object(target);
          for (var index = 1; index < arguments.length; index++) {
            var nextSource = arguments[index];
            if (nextSource != null) {
              for (var nextKey in nextSource) {
                if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                  to[nextKey] = nextSource[nextKey];
                }
              }
            }
          }
          return to;
        },
        writable: true,
        configurable: true
      });
    }
  }
})();
