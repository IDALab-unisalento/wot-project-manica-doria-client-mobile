import { Component, OnInit } from '@angular/core';
import { MaintenanceService } from '../../../../services/maintenance.service';
import { Maintenance } from '../../../../models/maintenance';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { Router, ActivatedRoute } from '@angular/router';

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
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.maintenanceService.getAllMaintenaceByUser().subscribe(data => {
      console.log('Maintenance By User: ', data);
      this.maintenanceList = data;
    });
  }

  showDetails(maintenance: Maintenance) {
    this.datasharing.setCurrentMaintenance(maintenance);
    this.router.navigate([maintenance.id], { relativeTo: this.route.parent });
  }
}
