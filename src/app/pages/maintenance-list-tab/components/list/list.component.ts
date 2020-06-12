import { Component, OnInit } from '@angular/core';
import { MaintenanceService } from '../../../../services/maintenance.service';
import { Maintenance } from '../../../../models/maintenance';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { Router, ActivatedRoute } from '@angular/router';
import {StorageService} from '../../../../services/storage.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  maintenanceList: Maintenance[];

  constructor(
    private maintenanceService: MaintenanceService,
    private datasharing: DataSharingService,
    private router: Router,
    private route: ActivatedRoute,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.storageService.getId().then(data => {
      this.getMaintenanceByStatusAndUser(data);
    });
  }

  getMaintenanceByStatusAndUser(id: string) {
    this.maintenanceService.getMaintenanceByStatusAndUser('in-progress', id).subscribe(data => {
      console.log('Maintenance By User: ', data);
      this.maintenanceList = data;
    });
  };

  showDetails(maintenance: Maintenance) {
    this.datasharing.setCurrentMaintenance(maintenance);
    this.router.navigate([maintenance.id], { relativeTo: this.route.parent });
  }
}
