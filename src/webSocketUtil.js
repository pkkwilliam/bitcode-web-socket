import SockJS from "sockjs-client";
import Stomp from "stompjs";

export default class WebSocketUtil {
  static _socket = null;
  static _stompClient = null;
  static _token = null;
  static _subscribes = [];

  constructor(requestUrl, token, subscribes) {
    this._socket = new SockJS(requestUrl);
    this._token = token;
    this._subscribes = subscribes;
    this._stompClient = Stomp.over(this.socket);
    this.connect();
  }

  get socket() {
    return this._socket;
  }

  get stompClient() {
    return this._stompClient;
  }

  get subscribes() {
    return this._subscribes;
  }

  get token() {
    return this._token;
  }

  connect() {
    console.log(this.stompClient);
    this.stompClient.connect({}, this.onConnected, () => {
      console.log("web socket error, please add overrride parent");
    });
  }

  onConnected = () => {
    console.log("web socket connected");
    this.subscribes.forEach((subscribe) =>
      this.stompClient.subscribe(subscribe.channel, (response) =>
        subscribe.onMessageReceived(JSON.parse(response))
      )
    );
  };

  sendMessage(messageUrl, content) {
    this.stompClient.send(messageUrl, {}, JSON.stringify(content));
  }
}
