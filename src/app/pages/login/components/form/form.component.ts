import { Component, OnInit, ViewChild } from '@angular/core';
import { UserLogin } from 'src/app/models/user';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {

  userLogin: UserLogin;

  constructor() {
    this.userLogin = {
      email: '',
      password: ''
    };

  }

  ngOnInit() { }

  onSubmit(user: any) {

  }

  help(form: any) {
    console.log(form)
  }

}
