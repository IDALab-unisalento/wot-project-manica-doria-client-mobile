import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-maintenance-list-tab',
  templateUrl: './maintenance-list-tab.page.html',
  styleUrls: ['./maintenance-list-tab.page.scss'],
})
export class MaintenanceListTabPage implements OnInit {

  @Input() title = 'Lista Manutenzioni';

  constructor() { }

  ngOnInit() {
  }

}
