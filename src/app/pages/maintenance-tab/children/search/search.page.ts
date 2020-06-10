import { Component, OnInit } from '@angular/core';
import { MaintenanceService } from '../../../../services/maintenance.service';
import { Maintenance } from '../../../../models/maintenance';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  maintenance: Maintenance[];

  constructor(private maintenanceService: MaintenanceService) { }

  ngOnInit() {
    this.getMaintenanceByStatusAndUser();
  }

  getMaintenanceByStatusAndUser() {
    this.maintenanceService.getMaintenanceByStatusAndUser('started', '1')
      .subscribe(
        data => {
          console.log('Maintenance By Status And User: ', data);
          this.maintenance = data;
        },

        err => {
          console.log(err);
          console.log(this.maintenance);
        });
  }

}
