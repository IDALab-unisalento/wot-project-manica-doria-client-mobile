import { Component, OnInit } from '@angular/core';
import {Maintenance} from '../../../../models/maintenance';
import {MaintenanceService} from '../../../../services/maintenance.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  maintenanceList: Maintenance[];

  constructor(private maintenanceService: MaintenanceService) { }

  ngOnInit() {
    this.maintenanceService.getAllMaintenaceByUser().subscribe(data => {
      console.log('Maintenance By User: ', data);
      this.maintenanceList = data;
    });
  }

  showDetails(maintenance: Maintenance) {
    console.log(maintenance);
  }

}
