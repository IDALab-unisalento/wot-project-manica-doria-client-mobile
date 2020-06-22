import { DataSharingService } from './../../services/data-sharing.service';

import { Component, OnInit, ViewChild } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { Message } from 'src/app/models/message';
import { Chat } from 'src/app/models/chat';
import { UtilisService } from 'src/app/services/utilis.service';
import { User } from 'src/app/models/user';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { WsService } from 'src/app/services/ws.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  user: User;
  message: Message;
  maintenanceId: number;
  chat: Chat;
  messages: Message[];


  constructor(
    private chatService: ChatService,
    private ws: WsService,
    private dataSharing: DataSharingService
  ) { }

  ngOnInit() {

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
        this.ws.connect(maintenance.id);
      }
    );

    this.ws.observeMessage.subscribe((msg: any) => {
      if (msg !== undefined) {
        this.messages.push(msg);
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


  }

}