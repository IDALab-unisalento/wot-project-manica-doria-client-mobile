import { Component, OnInit } from '@angular/core';
import {Maintenance} from '../../../../../../models/maintenance';
import {MaintenanceService} from '../../../../../../services/maintenance.service';
import {DataSharingService} from '../../../../../../services/data-sharing.service';
import {ActivatedRoute, Router} from '@angular/router';
import {StorageService} from '../../../../../../services/storage.service';
import {Step} from '../../../../../../models/step';
import {StepService} from '../../../../../../services/step.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  maintenanceList: Maintenance[];
  maintenance: Maintenance;
  stepList: Step[];

  constructor(
      private maintenanceService: MaintenanceService,
      private stepService: StepService,
      private datasharing: DataSharingService,
      private router: Router,
      private route: ActivatedRoute,
      private storageService: StorageService) { }

  ngOnInit() {
    this.storageService.getId().then(data => {
      this.getMaintenanceByStatusAndUser(data);
    });
  }

  getMaintenanceByStatusAndUser(id: string) {
    this.maintenanceService.getMaintenanceByStatusAndUser('started', id).subscribe(data => {
      this.maintenanceList = data;
      this.maintenance = this.maintenanceList[0];
      this.getStepListByMaintenance(this.maintenance.id);
    });
  }

  getStepListByMaintenance(id: number) {
    this.stepService.getStepByMaintenanceId(id).subscribe(data => {
      this.stepList = data;
      console.log('STEP', this.stepList);
    });
  }

  showDetails(step: Step, maintenance: Maintenance) {
    this.datasharing.setCurrentMaintenance(maintenance);
    this.datasharing.setCurrentStep(step);
    this.router.navigate([step.id], { relativeTo: this.route.parent });
  }

  close() {
    this.router.navigate(['/tabs'], { relativeTo: this.route });
  }
}
