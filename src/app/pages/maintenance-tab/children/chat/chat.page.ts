import { StorageService } from './../../../../services/storage.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { Message } from 'src/app/models/message';
import { Chat } from 'src/app/models/chat';
import { UtilisService } from 'src/app/services/utilis.service';
import { User } from 'src/app/models/user';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  content: string;
  messages: Message[];
  tempMessage = {} as Message;
  idMaintenance = 1;
  user = {} as User;
  chat = {} as Chat;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private utils: UtilisService,
    private chatService: ChatService,
    private storageService: StorageService) { }

  ngOnInit() {

    this.storageService.getEmail().then(
      data => { this.user.email = data; }
    );
    this.storageService.getId().then(
      data => { this.user.id = data; }
    );

    this.chatService.getMessageByMaintenanceId(this.idMaintenance).subscribe(
      data => {
        this.chat.id = data.id;
        this.messages = data.message.sort((a, b) => {
          if (a.date < b.date) { return -1; }
          else if (a.date > b.date) { return 1; }
          else { return 0; }
        });
      }
    );

    console.log(this.user);
  }

  sendMessage(message: string) {
    this.tempMessage.user = this.user;
    this.tempMessage.chat = this.chat;
    this.tempMessage.content = message;
    this.tempMessage.date = Date.now();

    this.chatService.sendMessage(this.tempMessage).subscribe(
      data => console.log(data)
    );
    window.location.reload();


  }

}
