/*!
 * luni v0.0.0
 * Copyright (c) 2021-2021 Fabian Bentz
 * License: MIT
 */
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var Luni = function () {
  function Luni() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$parent = _ref.parent,
        parent = _ref$parent === void 0 ? document.querySelector('#luni') : _ref$parent,
        _ref$links = _ref.links,
        links = _ref$links === void 0 ? document.querySelectorAll('[data-luni-link]') : _ref$links,
        _ref$active = _ref.active,
        active = _ref$active === void 0 ? 'is-active' : _ref$active,
        _ref$margin = _ref.margin,
        margin = _ref$margin === void 0 ? 20 : _ref$margin,
        _ref$responsive = _ref.responsive,
        responsive = _ref$responsive === void 0 ? {
      980: {
        columns: 3
      },
      480: {
        columns: 2
      },
      0: {
        columns: 1
      }
    } : _ref$responsive,
        _ref$fadeDuration = _ref.fadeDuration,
        fadeDuration = _ref$fadeDuration === void 0 ? {
      in: 300,
      out: 0
    } : _ref$fadeDuration;
    _classCallCheck(this, Luni);
    this.parent = parent;
    this.links = Array.from(links);
    this.active = active;
    this.margin = margin;
    this.responsive = responsive;
    this.fadeDuration = fadeDuration;
    this.elements = Array.from(this.parent.children);
    this.activeElements = this.elements;
    this.columns = 1;
    this.dataLink = 'all';
    this.winWidth = window.innerWidth;
    this.init();
  }
  _createClass(Luni, [{
    key: "orderElements",
    value: function orderElements() {
      var _this = this;
      var parent = this.parent,
          activeElements = this.activeElements,
          columns = this.columns,
          blocWidth = this.blocWidth,
          margin = this.margin;
      var arrayRectHeight = activeElements.reduce(function (acc, el, id) {
        var columnsHeight = _this.sumArrHeight(acc, columns);
        var positionX = id % columns * (blocWidth + margin);
        var rectHeight = id - columns >= 0 ? columnsHeight[id % columns] + margin * Math.floor(id / columns) : 0;
        el.style.transform = "translate3d(".concat(positionX, "px, ").concat(rectHeight, "px, 0)");
        acc.push(el.offsetHeight);
        return acc;
      }, []);
      var columnsMaxHeight = this.sumArrHeight(arrayRectHeight, columns);
      var parentHeight = Math.max.apply(Math, _toConsumableArray(columnsMaxHeight)) + margin * (Math.floor(activeElements.length / columns) - 1);
      parent.style.height = "".concat(parentHeight, "px");
    }
  }, {
    key: "handleFilterClick",
    value: function handleFilterClick(ev, element) {
      var _this2 = this;
      ev.preventDefault();
      var links = this.links,
          active = this.active;
      if (element.dataset.luniLink === this.dataLink) {
        return;
      }
      this.dataLink = element.dataset.luniLink;
      links.forEach(function (el) {
        if (el.isEqualNode(element)) {
          el.classList.add(active);
        } else {
          el.classList.remove(active);
        }
      });
      this.filterElements(function () {
        _this2.orderElements();
      });
    }
  }, {
    key: "resize",
    value: function resize() {
      var _this3 = this;
      window.addEventListener('resize', function () {
        clearTimeout(window.sortableResize);
        window.sortableResize = setTimeout(function () {
          _this3.winWidth = window.innerWidth;
          _this3.setBlockWidth(function () {
            _this3.orderElements();
          });
        }, 500);
      });
    }
  }, {
    key: "init",
    value: function init() {
      var _this4 = this;
      var parent = this.parent,
          links = this.links,
          active = this.active;
      links.forEach(function (el, id) {
        if (id === 0) {
          el.classList.add(active);
          _this4.dataLink = el.dataset.luniLink;
        }
        el.addEventListener('click', function (ev) {
          _this4.handleFilterClick(ev, el);
        });
      });
      this.setBlockWidth();
      window.addEventListener('load', function () {
        _this4.filterElements(function () {
          _this4.orderElements();
        });
        parent.style.opacity = '1';
      });
      this.resize();
    }
  }, {
    key: "setBlockWidth",
    value: function setBlockWidth(callback) {
      var parent = this.parent,
          elements = this.elements,
          margin = this.margin,
          responsive = this.responsive;
      this.columns = this.columnsCount(responsive).columns;
      var columns = this.columns;
      this.blocWidth = (parent.clientWidth - margin * (columns - 1)) / columns;
      var blocWidth = this.blocWidth;
      elements.forEach(function (el) {
        el.style.width = "".concat(blocWidth, "px");
      });
      if (callback) {
        callback();
      }
    }
  }, {
    key: "filterElements",
    value: function filterElements(callback) {
      var _this5 = this;
      var elements = this.elements,
          dataLink = this.dataLink,
          fadeDuration = this.fadeDuration;
      this.activeElements = elements.filter(function (el) {
        if (dataLink === 'all') {
          _this5.fadeIn(el, fadeDuration.in);
          return true;
        }
        if (!el.dataset.luniEl.split(',').includes(dataLink)) {
          _this5.fadeOut(el, fadeDuration.out);
          return false;
        }
        _this5.fadeIn(el, fadeDuration.in);
        return true;
      });
      if (callback) {
        callback();
      }
    }
  }, {
    key: "sumArrHeight",
    value: function sumArrHeight(arr, col) {
      return arr.reduce(function (acc, val, id) {
        var cle = id % col;
        if (!acc[cle]) {
          acc[cle] = 0;
        }
        acc[cle] += val;
        return acc;
      }, []);
    }
  }, {
    key: "columnsCount",
    value: function columnsCount(obj) {
      var winWidth = this.winWidth;
      return Object.entries(obj).reduce(function (acc, val) {
        return winWidth > val[0] && val[0] >= Math.max(acc.width) ? {
          width: val[0],
          columns: val[1].columns
        } : acc;
      }, {
        width: 0,
        columns: 4
      });
    }
  }, {
    key: "fadeIn",
    value: function fadeIn(el) {
      var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;
      var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var opacity = Number.parseFloat(window.getComputedStyle(el, null).getPropertyValue('opacity'));
      var interval = 16;
      var gap = interval / duration;
      el.style.display = 'block';
      function animation() {
        opacity += gap;
        if (opacity <= 1) {
          el.style.opacity = opacity;
          requestAnimationFrame(animation);
        } else {
          el.style.opacity = '1';
          if (callback) {
            callback();
          }
        }
      }
      requestAnimationFrame(animation);
    }
  }, {
    key: "fadeOut",
    value: function fadeOut(el) {
      var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;
      var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var opacity = Number.parseFloat(window.getComputedStyle(el, null).getPropertyValue('opacity'));
      var interval = 16;
      var gap = duration ? interval / duration : 1;
      function animation() {
        opacity -= gap;
        if (opacity >= 0) {
          el.style.opacity = opacity;
          requestAnimationFrame(animation);
        } else {
          el.style.opacity = '0';
          el.style.display = 'none';
          if (callback) {
            callback();
          }
        }
      }
      requestAnimationFrame(animation);
    }
  }]);
  return Luni;
}();

export { Luni as default };
