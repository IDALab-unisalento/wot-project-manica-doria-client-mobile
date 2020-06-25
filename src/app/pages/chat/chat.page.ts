import { DataSharingService } from './../../services/data-sharing.service';

import { Component, OnInit, ViewChild, AfterViewInit, AfterContentInit, OnDestroy } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { Message } from 'src/app/models/message';
import { Chat } from 'src/app/models/chat';
import { User } from 'src/app/models/user';

import { WsService } from 'src/app/services/ws.service';
import { IonContent } from '@ionic/angular';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  @ViewChild('textArea') inputText: any;
  @ViewChild('ionContent') ionContent: IonContent;

  user: User;
  message: Message;
  maintenanceId: number;
  chat: Chat;
  messages = [];
  content = '';

  constructor(
    private chatService: ChatService,
    private ws: WsService,
    private dataSharing: DataSharingService
  ) { }

  ngOnInit() {

    setTimeout(() => this.ionContent.scrollToBottom(), 200);

    this.dataSharing.getCurrentUser().subscribe(
      data => {
        this.user = data;
      }
    );

    this.dataSharing.getCurrentMaintenance().subscribe(
      maintenance => {
        this.chatService.getMessageByMaintenanceId(maintenance.id).subscribe(
          data => {
            this.chat = data;
            this.messages = data.message.sort((a, b) => {
              if (a.date < b.date) { return -1; }
              else if (a.date > b.date) { return 1; }
              else { return 0; }
            });
          });
        if (!this.ws.isConnected) {
          this.ws.connect(maintenance.id);
        }
      }
    );

    this.ws.observeMessage.subscribe((msg: any) => {
      if (msg !== undefined) {
        this.messages.push(msg);
        setTimeout(() => this.ionContent.scrollToBottom(), 200);
      }
    });
  }

  sendMessage(message: string) {

    const tempMessage = {
      user: {},
      chat: {}
    } as Message;

    tempMessage.user = this.user;
    tempMessage.chat.id = this.chat.id;
    tempMessage.content = message;
    tempMessage.date = Date.now();

    console.log(tempMessage);
    this.ws.sendMessage(tempMessage, 1);
    this.inputText.value = '';
  }

}