import { Message } from './../models/message';
import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WsService {

  webSocketEndPoint = 'http://localhost:8081/ws';
  topic = '/topic/greetings/';

  stompClient: any;
  messageReceived: any;
  observeMessage: any;

  constructor() {
    this.observeMessage = new BehaviorSubject<any>(this.messageReceived);
  }

  connect(id: number) {
    console.log('Initialize WebSocket Connection');
    const ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);

    this.stompClient.connect({}, (frame: any) => {
      this.stompClient.subscribe(this.topic + id, (msgEvent: any) => {
        this.observeMessage.next(JSON.parse(msgEvent.body));
      });
    }, this.errorCallBack);
  }

  disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log('Disconnected');
  }

  // on error, schedule a reconnection attempt
  errorCallBack(error, id: number) {
    console.log('errorCallBack -> ' + error);
    setTimeout(() => {
      this.connect(id);
    }, 5000);
  }

  sendMessage(message: Message, id: number) {
    this.stompClient.send('/app/chat/' + id, {}, JSON.stringify(message));
  }
}
