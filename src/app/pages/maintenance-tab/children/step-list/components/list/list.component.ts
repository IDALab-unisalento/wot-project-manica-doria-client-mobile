import { Component, OnInit } from '@angular/core';
import {Maintenance} from '../../../../../../models/maintenance';
import {MaintenanceService} from '../../../../../../services/maintenance.service';
import {DataSharingService} from '../../../../../../services/data-sharing.service';
import {ActivatedRoute, Router} from '@angular/router';
import {StorageService} from '../../../../../../services/storage.service';
import {Step} from '../../../../../../models/step';
import {StepService} from '../../../../../../services/step.service';
import {UtilisService} from '../../../../../../services/utilis.service';
import {UserMaintenance} from '../../../../../../models/user-maintenance';
import {UserMaintenanceService} from '../../../../../../services/user-maintenance.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  userMaintenanceList: UserMaintenance[];
  userMaintenance: UserMaintenance;
  stepList: Step[];

  constructor(
      private userMaintenanceService: UserMaintenanceService,
      private stepService: StepService,
      private dataSharing: DataSharingService,
      private utilsService: UtilisService,
      private router: Router,
      private route: ActivatedRoute,
      private storageService: StorageService) {
    route.params.subscribe(val => {
      this.storageService.getId().then(data => {
        this.getMaintenanceByStatusAndUser(data);
      });
    });
  }

  ngOnInit() {
    this.storageService.getId().then(data => {
      this.getMaintenanceByStatusAndUser(data);
    });
  }

  getMaintenanceByStatusAndUser(id: string) {
    this.userMaintenanceService.getMaintenanceByStatusAndUser('started', id).subscribe(data => {
      console.log(data);
      if (data.length === 0) {
        this.utilsService.showToast({
          header: 'Manutenzione Completata',
          message: 'Tutti gli step sono stati completati con successo',
          duration: 3000,
          position: 'top',
          cssClass: 'toast-success'
        });
        this.router.navigate(['/tabs/maintenance-tab']);
      }
      else {
        this.userMaintenanceList = data;
        this.userMaintenance = this.userMaintenanceList[0];
        this.getStepListByMaintenance(this.userMaintenance.maintenance.id);
      }
    });
  }

  getStepListByMaintenance(id: number) {
    this.stepService.getStepByMaintenanceId(id).subscribe(data => {
      this.stepList = data;
      console.log('STEP', this.stepList);
    });
  }

  showDetails(step: Step, maintenance: UserMaintenance) {
    this.dataSharing.setCurrentMaintenance(maintenance);
    this.dataSharing.setCurrentStep(step);
    this.router.navigate([step.id], { relativeTo: this.route.parent });
  }

  close() {
    this.router.navigate(['/tabs'], { relativeTo: this.route });
  }
}
