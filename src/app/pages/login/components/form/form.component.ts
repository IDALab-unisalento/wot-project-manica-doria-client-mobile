import { Component, OnInit, ViewChild } from '@angular/core';
import { UserLogin } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UtilisService } from 'src/app/services/utilis.service';
import {StorageService} from '../../../../services/storage.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {

  userLogin: UserLogin;

  constructor(private utilsService: UtilisService, private loginService: LoginService, private router: Router) {
    this.userLogin = {
      email: '',
      password: ''
    };

  }

  ngOnInit() { }

  login(user: UserLogin) {
    console.log(user);
    this.loginService.login(user).subscribe(
      data => {
        console.log(data);
        this.loginService.setUser(data);
        this.router.navigate(['/tabs']);
      },
      error => {
        this.utilsService.showToast({
          header: 'Errore di autenticazione',
          message: 'Controlla email e/o password',
          position: 'top',
          duration: 3000,
          cssClass: 'toast-danger'
        });
      }
    );
  }

}
