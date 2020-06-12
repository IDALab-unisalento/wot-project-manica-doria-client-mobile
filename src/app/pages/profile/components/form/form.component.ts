import { Component, OnInit } from '@angular/core';
import {StorageService} from '../../../../services/storage.service';
import {User, UserLogin} from '../../../../models/user';
import {UserService} from '../../../../services/user.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {

  user: User = {} as User;
  userLogin: UserLogin = { } as UserLogin;

  constructor(private storageService: StorageService, private userService: UserService) { }

  ngOnInit() {
    this.storageService.getId().then(data => {
      this.getUserById(data);
    });
  }
  getUserById(id: string) {
    this.userService.getUserById(id).subscribe(data => {
      this.user = data;
      console.log(this.user);
    });
  }

  logout() {
    this.storageService.logout();
  }

  cambiaPassword() {

  }
}
