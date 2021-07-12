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

var WebSocketUtil = /*#__PURE__*/function () {
  function WebSocketUtil(requestUrl, token, subscribes) {
    var _this = this;

    _classCallCheck(this, WebSocketUtil);

    _defineProperty(this, "onConnected", function () {
      console.log("web socket connected");

      _this.subscribes.forEach(function (subscribe) {
        return _this.stompClient.subscribe(subscribe.channel, function (response) {
          return subscribe.onMessageReceived(JSON.parse(response));
        });
      });
    });

    this._socket = new _sockjsClient["default"](requestUrl);
    this._token = token;
    this._subscribes = subscribes;
    this._stompClient = _stompjs["default"].over(this.socket);
    this.connect();
  }

  _createClass(WebSocketUtil, [{
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
    key: "subscribes",
    get: function get() {
      return this._subscribes;
    }
  }, {
    key: "token",
    get: function get() {
      return this._token;
    }
  }, {
    key: "connect",
    value: function connect() {
      console.log(this.stompClient);
      this.stompClient.connect({}, this.onConnected, function () {
        console.log("web socket error, please add overrride parent");
      });
    }
  }, {
    key: "sendMessage",
    value: function sendMessage(messageUrl, content) {
      this.stompClient.send(messageUrl, {}, JSON.stringify(content));
    }
  }]);

  return WebSocketUtil;
}();

exports["default"] = WebSocketUtil;

_defineProperty(WebSocketUtil, "_socket", null);

_defineProperty(WebSocketUtil, "_stompClient", null);

_defineProperty(WebSocketUtil, "_token", null);

_defineProperty(WebSocketUtil, "_subscribes", []);