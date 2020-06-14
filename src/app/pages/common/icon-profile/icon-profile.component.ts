import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-icon-profile',
  templateUrl: './icon-profile.component.html',
  styleUrls: ['./icon-profile.component.scss'],
})
export class IconProfileComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  goToProfile() {
    this.router.navigate(['/profile']);
  }

}
