import { Component, OnInit } from '@angular/core';
import {StorageService} from '../../../../services/storage.service';
import {User, UserLogin} from '../../../../models/user';
import {UserService} from '../../../../services/user.service';
import {UtilisService} from '../../../../services/utilis.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {

  user: User = {} as User;
  password: string;
  passwordVerify: string;

  constructor(private storageService: StorageService, private userService: UserService, private utils: UtilisService) { }

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
    if (this.password === this.passwordVerify) {
      this.user.password = this.password;
      this.user.passwordVerify = this.passwordVerify;
      console.log(this.user);
      this.userService.cambiaPassword(this.user).subscribe(data => {
        console.log('New Password Changed: ', data.password);
      });
      this.utils.showToast({
        header: 'Password',
        message: 'La password è stata impostata correttamente',
        duration: 2000,
        position: 'top',
        cssClass: 'toast-danger'
      });
      this.password = '';
      this.passwordVerify = '';
    }
    else {
      this.utils.showToast({
        header: 'Errore Password',
        message: 'Le password non coincidono',
        duration: 2000,
        position: 'top',
        cssClass: 'toast-danger'
      });
      this.password = '';
      this.passwordVerify = '';
    }
  }
}
