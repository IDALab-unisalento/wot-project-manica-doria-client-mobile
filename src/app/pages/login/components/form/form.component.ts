import { Component, OnInit, ViewChild } from '@angular/core';
import { UserLogin } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {

  userLogin: UserLogin;

  constructor(private loginService: LoginService, private router: Router) {
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
        this.router.navigate(['/tabs']);
      }
    );
  }

  help(form: any) {
    console.log(form);
  }

}
