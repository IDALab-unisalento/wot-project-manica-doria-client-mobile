import { Component, OnInit } from '@angular/core';
import { MaintenanceService } from '../../../../services/maintenance.service';
import { Maintenance } from '../../../../models/maintenance';
import { Step } from '../../../../models/step';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  maintenanceList: Maintenance[];
  stepList: Step[];

  constructor(private maintenanceService: MaintenanceService) { }

  ngOnInit() {
    this.maintenanceService.getAllMaintenaceByUser().subscribe(data => {
      console.log('Maintenance By User: ', data);
      this.maintenanceList = data;
    });
  }

}
