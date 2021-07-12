"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sockjsClient = _interopRequireDefault(require("sockjs-client"));

var _stompjs = _interopRequireDefault(require("stompjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var BitCodeWebSocket = /*#__PURE__*/function () {
  function BitCodeWebSocket(connectionUrl, token) {
    _classCallCheck(this, BitCodeWebSocket);

    this._connectionUrl = connectionUrl;
    this._token = token;
  }

  _createClass(BitCodeWebSocket, [{
    key: "connectionUrl",
    get: function get() {
      return this._connectionUrl;
    }
  }, {
    key: "socket",
    get: function get() {
      return this._socket;
    }
  }, {
    key: "stompClient",
    get: function get() {
      return this._stompClient;
    }
  }, {
    key: "token",
    get: function get() {
      return this._token;
    }
  }, {
    key: "connect",
    value: function connect(_ref) {
      var _ref$success = _ref.success,
          success = _ref$success === void 0 ? function () {
        return console.log("connect web socket suceed");
      } : _ref$success,
          _ref$fail = _ref.fail,
          fail = _ref$fail === void 0 ? function () {
        return console.log("failed to connect web socket");
      } : _ref$fail;
      console.log("user attempt to connect web socket");
      this._socket = new _sockjsClient["default"](this.connectionUrl);
      this._stompClient = _stompjs["default"].over(this.socket);
      this.stompClient.connect(this.generateRequestHeader(this.token), success, fail);
    }
  }, {
    key: "generateRequestHeader",
    value: function generateRequestHeader(token) {
      return {
        Authorization: token
      };
    }
  }, {
    key: "sendMessage",
    value: function sendMessage(messageUrl, content) {
      this.stompClient.send(messageUrl, {}, JSON.stringify(content));
    }
  }, {
    key: "subscribeChannel",
    value: function subscribeChannel(subscribe) {
      var channel = subscribe.channel,
          onMessageReceived = subscribe.onMessageReceived;
      this.stompClient.subscribe(channel, function (response) {
        return onMessageReceived(JSON.parse(response));
      });
    }
  }]);

  return BitCodeWebSocket;
}();

exports["default"] = BitCodeWebSocket;

_defineProperty(BitCodeWebSocket, "_connectionUrl", null);

_defineProperty(BitCodeWebSocket, "_socket", null);

_defineProperty(BitCodeWebSocket, "_stompClient", null);

_defineProperty(BitCodeWebSocket, "_token", null);