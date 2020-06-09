import { Component, AfterContentChecked } from '@angular/core';

@Component({
  selector: 'app-fill-maintenance',
  templateUrl: './fill-maintenance.component.html',
  styleUrls: ['./fill-maintenance.component.scss'],
})
export class FillMaintenanceComponent implements AfterContentChecked {
  prefersDark: boolean;

  constructor() { }

  ngAfterContentChecked(): void {
    this.prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

}
