"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ens = require("./ens");

var _lodash = _interopRequireDefault(require("lodash"));

var _address = require("./utils/address.js");

var _Loader = _interopRequireDefault(require("./Loader.js"));

var _Blockies = require("./Blockies.js");

var _warning = _interopRequireDefault(require("./assets/warning.svg"));

require("./style.css");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var ENS_NOT_FOUND = 'ENS name not found';

function Address(props) {
  var _useState = (0, _react.useState)(null),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      resolvedAddress = _useState2[0],
      setResolvedAddress = _useState2[1];

  var _useState3 = (0, _react.useState)(''),
      _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
      inputValue = _useState4[0],
      setInputValue = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = (0, _slicedToArray2["default"])(_useState5, 2),
      isResolvingInProgress = _useState6[0],
      setIsResolvingInProgress = _useState6[1];

  var _useState7 = (0, _react.useState)(null),
      _useState8 = (0, _slicedToArray2["default"])(_useState7, 2),
      error = _useState8[0],
      setError = _useState8[1];

  var _useState9 = (0, _react.useState)(null),
      _useState10 = (0, _slicedToArray2["default"])(_useState9, 2),
      ENS = _useState10[0],
      setENS = _useState10[1];

  var currentInput = (0, _react.useRef)();

  var inputDebouncerHandler = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(input) {
      var result, address, type, name;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return resolveName(input);

            case 3:
              result = _context.sent;

              if (input === currentInput.current) {
                setError(null);
                address = result.address, type = result.type, name = result.name;

                if (type === _address.ETH_ADDRESS_TYPE.name) {
                  setResolvedAddress(address);
                } else if (type === _address.ETH_ADDRESS_TYPE.address) {
                  setResolvedAddress(name);
                }

                props.onResolve(result);
                props.onError(null);
              } //if newest continue, otherwise ignore


              _context.next = 13;
              break;

            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](0);
              setError(_context.t0.toString());
              setResolvedAddress(null);
              props.onResolve({
                address: input,
                name: null,
                type: null
              });
              props.onError(_context.t0);

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 7]]);
    }));

    return function inputDebouncerHandler(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var inputDebouncer = _lodash["default"].debounce(inputDebouncerHandler, 500);

  (0, _react.useEffect)(function () {
    function setup() {
      return _setup.apply(this, arguments);
    }

    function _setup() {
      _setup = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var options, _yield$setupENS, ens;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                options = {};

                if (props.ensAddress) {
                  options.ensAddress = props.ensAddress;
                }

                if (props.provider) {
                  options.customProvider = props.provider;
                }

                _context2.next = 5;
                return (0, _ens.setup)(options);

              case 5:
                _yield$setupENS = _context2.sent;
                ens = _yield$setupENS.ens;
                setENS(ens);

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));
      return _setup.apply(this, arguments);
    }

    setup();
  }, [props.provider]);
  var handleInput = (0, _react.useCallback)( /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(address) {
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!address || address.length === 0) {
                setInputValue('');
                setError(null);
                setResolvedAddress(null);

                if (inputDebouncer) {
                  inputDebouncer.cancel();
                }
              }

              setInputValue(address);

              if (inputDebouncer) {
                inputDebouncer(address);
              }

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }(), [inputDebouncer]);
  (0, _react.useEffect)(function () {
    if (props.presetValue.length !== 0) {
      handleInput(props.presetValue);
    }
  }, [props.presetValue, handleInput]);

  if (!ENS) {
    return /*#__PURE__*/_react["default"].createElement(_Loader["default"], {
      className: "loader"
    });
  }

  var handleResolver = /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(fn) {
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              setIsResolvingInProgress(true);
              setResolvedAddress(null);
              _context4.next = 5;
              return fn();

            case 5:
              return _context4.abrupt("return", _context4.sent);

            case 8:
              _context4.prev = 8;
              _context4.t0 = _context4["catch"](0);

              if (!(_context4.t0 && _context4.t0.message && _context4.t0.message === ENS_NOT_FOUND)) {
                _context4.next = 12;
                break;
              }

              return _context4.abrupt("return");

            case 12:
              throw _context4.t0;

            case 13:
              _context4.prev = 13;
              setIsResolvingInProgress(false);
              return _context4.finish(13);

            case 16:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 8, 13, 16]]);
    }));

    return function handleResolver(_x3) {
      return _ref3.apply(this, arguments);
    };
  }();

  var resolveName = /*#__PURE__*/function () {
    var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(inputValue) {
      var addressType;
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              // update latest input resolving
              currentInput.current = inputValue;
              addressType = (0, _address.getEthAddressType)(inputValue);

              if (!(addressType === _address.ETH_ADDRESS_TYPE.name)) {
                _context7.next = 8;
                break;
              }

              _context7.next = 5;
              return handleResolver( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
                return _regenerator["default"].wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        _context5.t0 = inputValue;
                        _context5.next = 3;
                        return ENS.getAddress(inputValue);

                      case 3:
                        _context5.t1 = _context5.sent;
                        _context5.t2 = inputValue;
                        return _context5.abrupt("return", {
                          input: _context5.t0,
                          address: _context5.t1,
                          name: _context5.t2,
                          type: 'name'
                        });

                      case 6:
                      case "end":
                        return _context5.stop();
                    }
                  }
                }, _callee5);
              })));

            case 5:
              return _context7.abrupt("return", _context7.sent);

            case 8:
              if (!(addressType === _address.ETH_ADDRESS_TYPE.address)) {
                _context7.next = 12;
                break;
              }

              _context7.next = 11;
              return handleResolver( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
                return _regenerator["default"].wrap(function _callee6$(_context6) {
                  while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        _context6.t0 = inputValue;
                        _context6.next = 3;
                        return ENS.getName(inputValue);

                      case 3:
                        _context6.t1 = _context6.sent.name;
                        _context6.t2 = inputValue;
                        return _context6.abrupt("return", {
                          input: _context6.t0,
                          name: _context6.t1,
                          address: _context6.t2,
                          type: 'address'
                        });

                      case 6:
                      case "end":
                        return _context6.stop();
                    }
                  }
                }, _callee6);
              })));

            case 11:
              return _context7.abrupt("return", _context7.sent);

            case 12:
              throw 'Incorrect address or name';

            case 13:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }));

    return function resolveName(_x4) {
      return _ref4.apply(this, arguments);
    };
  }();

  var isResolveNameNotFound = function isResolveNameNotFound() {
    return !resolvedAddress && inputValue && !isResolvingInProgress && (0, _address.getEthAddressType)(inputValue) !== _address.ETH_ADDRESS_TYPE.address;
  };

  var showBlockies = function showBlockies() {
    if (props.showBlockies) {
      var address;

      if ((0, _address.isAddress)(inputValue)) {
        address = inputValue;
      } else if ((0, _address.isAddress)(resolvedAddress)) {
        address = resolvedAddress;
      }

      if (address) {
        return /*#__PURE__*/_react["default"].createElement(_Blockies.SingleNameBlockies, {
          address: address.toLowerCase(),
          imageSize: 30,
          className: "blockies"
        });
      }
    }
  };

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "cmp-address-wrapper ".concat(props.className)
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "cmp-address  ".concat(resolvedAddress ? 'resolved' : '', " ").concat(error ? 'error' : '')
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "input-wrapper"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "indicator"
  }, isResolvingInProgress && /*#__PURE__*/_react["default"].createElement(_Loader["default"], {
    className: "loader"
  }), !isResolvingInProgress && showBlockies(), isResolveNameNotFound() && /*#__PURE__*/_react["default"].createElement("img", {
    alt: "warning icon",
    src: _warning["default"],
    className: "icon-wrapper error-icon"
  }), props.DefaultIcon && !inputValue && /*#__PURE__*/_react["default"].createElement(DefaultIcon, null)), /*#__PURE__*/_react["default"].createElement("input", {
    value: inputValue,
    onChange: function onChange(e) {
      return handleInput(e.currentTarget.value);
    },
    placeholder: props.placeholder,
    spellCheck: false,
    name: "ethereum"
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "info-wrapper"
  }, resolvedAddress && /*#__PURE__*/_react["default"].createElement("div", {
    className: "resolved"
  }, resolvedAddress))));
}

Address.propTypes = {
  provider: _propTypes["default"].object.isRequired,
  placeholder: _propTypes["default"].string,
  showBlockies: _propTypes["default"].bool,
  DefaultIcon: function DefaultIcon(props, propName) {
    if (props[propName] && !(0, _react.isValidElementType)(props[propName])) {
      return new Error("Invalid prop 'component' supplied to 'Route': the prop is not a valid React component");
    }
  },
  onError: _propTypes["default"].func,
  onResolve: _propTypes["default"].func,
  className: _propTypes["default"].string
};
Address.defaultProps = {
  presetValue: '',
  placeholder: 'Enter Fantom name or address',
  showBlockies: true,
  DefaultIcon: null,
  className: '',
  onError: function onError() {},
  onResolve: function onResolve() {}
};
var _default = Address;
exports["default"] = _default;