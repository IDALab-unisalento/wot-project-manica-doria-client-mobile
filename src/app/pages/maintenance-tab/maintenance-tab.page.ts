import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-maintenance-tab',
  templateUrl: './maintenance-tab.page.html',
  styleUrls: ['./maintenance-tab.page.scss'],
})
export class MaintenanceTabPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }
}
