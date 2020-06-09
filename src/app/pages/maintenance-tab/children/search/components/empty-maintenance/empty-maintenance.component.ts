import { Component, OnInit, AfterViewInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-empty-maintenance',
  templateUrl: './empty-maintenance.component.html',
  styleUrls: ['./empty-maintenance.component.scss'],
})
export class EmptyMaintenanceComponent implements AfterViewInit {
  prefersDark: boolean;

  constructor(private router: Router) { }

  ngAfterViewInit(): void {
    this.prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  goMaintenaceList() {
    this.router.navigate(['/tabs/maintenance-list-tab']);
  }
}
