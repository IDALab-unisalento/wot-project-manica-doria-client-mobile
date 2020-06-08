import { Component, OnInit, ViewChild, AfterContentChecked, AfterViewChecked, AfterViewInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements AfterViewInit {

  prefersDark: boolean;

  constructor() { }

  ngAfterViewInit(): void {
    this.prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  }



}
