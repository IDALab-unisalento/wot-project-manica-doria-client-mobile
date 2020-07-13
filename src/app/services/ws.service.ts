import { ActivatedRoute } from '@angular/router';
import { ApiVariables } from './../common/ApiVariables';
import { Message } from './../models/message';
import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { BehaviorSubject } from 'rxjs';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';

@Injectable({
  providedIn: 'root'
})
export class WsService {

  webSocketEndPoint = 'http://' + ApiVariables.localhost + '/ws';
  topic = '/topic/greetings/';

  stompClient: any;
  messageReceived: any;
  observeMessage: any;

  isConnected = false;

  constructor(private backgroundMode: BackgroundMode, private route: ActivatedRoute, private notification: LocalNotifications) {
    this.observeMessage = new BehaviorSubject<any>(this.messageReceived);
  }

  connect(id: number) {
    console.log('Initialize WebSocket Connection');
    this.backgroundMode.enable();
    const ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect({}, (frame: any) => {
      this.stompClient.subscribe(this.topic + id, (msgEvent: any) => {
        this.onReceived(msgEvent);
      });
    }, this.errorCallBack);
  }

  disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
      this.isConnected = false;
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

  onReceived(msg: any): void {
    this.isConnected = true;
    let received = {
      user: {}
    } as Message;
    received = JSON.parse(msg.body);
    this.notification.schedule(
      {
        title: 'Hai un nuovo messaggio',
        text: received.content
      }
    );
    this.observeMessage.next(received);

  }

  sendMessage(message: Message, id: number) {
    console.log('ID:>>', id);

    this.stompClient.send('/app/chat/' + id, {}, JSON.stringify(message));
  }
}
