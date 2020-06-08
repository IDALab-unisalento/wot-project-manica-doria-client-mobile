import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-empty-maintenance',
  templateUrl: './empty-maintenance.component.html',
  styleUrls: ['./empty-maintenance.component.scss'],
})
export class EmptyMaintenanceComponent implements AfterViewInit {
  prefersDark: boolean;

  constructor() { }

  ngAfterViewInit(): void {
    this.prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

}
