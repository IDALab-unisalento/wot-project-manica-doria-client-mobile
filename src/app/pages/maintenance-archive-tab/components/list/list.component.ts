import { Component, OnInit } from '@angular/core';
import { Maintenance } from '../../../../models/maintenance';
import { MaintenanceService } from '../../../../services/maintenance.service';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService } from '../../../../services/storage.service';
import {UserMaintenance} from '../../../../models/user-maintenance';
import {UserMaintenanceService} from '../../../../services/user-maintenance.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  userMaintenanceList: UserMaintenance[];

  constructor(
    private userMaintenanceService: UserMaintenanceService,
    private dataSharing: DataSharingService,
    private router: Router,
    private route: ActivatedRoute,
    private storageService: StorageService) { }

  ngOnInit() {
    this.storageService.getId().then(data => {
      this.getMaintenanceByStatusAndUser(data);
    });
  }

  getMaintenanceByStatusAndUser(id: string) {
    this.userMaintenanceService.getMaintenanceByStatusAndUser('completed', id).subscribe(data => {
      console.log('Maintenance By User: ', data);
      this.userMaintenanceList = data;
    });
  }

  showDetails(maintenance: UserMaintenance) {
    this.dataSharing.setCurrentMaintenance(maintenance);
    this.router.navigate([maintenance.id], { relativeTo: this.route.parent });
  }

}
