import SockJS from "sockjs-client";
import Stomp from "stompjs";

export default class BitCodeWebSocket {
  static _connectionUrl = null;
  static _socket = null;
  static _stompClient = null;
  static _token = null;

  constructor(connectionUrl, token) {
    this._connectionUrl = connectionUrl;
    this._token = token;
  }

  get connectionUrl() {
    return this._connectionUrl;
  }

  get socket() {
    return this._socket;
  }

  get stompClient() {
    return this._stompClient;
  }

  get token() {
    return this._token;
  }

  connect({
    success = () => console.log("connect web socket suceed"),
    fail = () => console.log("failed to connect web socket"),
  }) {
    console.log("user attempt to connect web socket");
    this._socket = new SockJS(this.connectionUrl);
    this._stompClient = Stomp.over(this.socket);

    this.stompClient.connect(
      this.generateRequestHeader(this.token),
      success,
      fail
    );
  }

  generateRequestHeader(token) {
    return { Authorization: token };
  }

  sendMessage(messageUrl, content) {
    this.stompClient.send(messageUrl, {}, JSON.stringify(content));
  }

  subscribeChannel(subscribe) {
    const { channel, onMessageReceived } = subscribe;
    this.stompClient.subscribe(channel, (response) =>
      onMessageReceived(JSON.parse(response))
    );
  }
}
