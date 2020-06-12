import { Component, OnInit } from '@angular/core';
import { MaintenanceService } from '../../../../services/maintenance.service';
import { Maintenance } from '../../../../models/maintenance';
import {StorageService} from '../../../../services/storage.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  maintenance: Maintenance[];

  constructor(private maintenanceService: MaintenanceService, private storageService: StorageService) { }

  ngOnInit() {
      this.storageService.getId().then(data => {
          this.getMaintenanceByStatusAndUser(data);
      });
  }

  getMaintenanceByStatusAndUser(id: string) {
    this.maintenanceService.getMaintenanceByStatusAndUser('started', id)
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
