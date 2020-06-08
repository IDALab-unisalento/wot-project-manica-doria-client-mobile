import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-fill-maintenance',
  templateUrl: './fill-maintenance.component.html',
  styleUrls: ['./fill-maintenance.component.scss'],
})
export class FillMaintenanceComponent implements AfterViewInit {
  prefersDark: boolean;

  constructor() { }

  ngAfterViewInit(): void {
    this.prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

}
