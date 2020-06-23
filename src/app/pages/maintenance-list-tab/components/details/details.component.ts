import { Router, ActivatedRoute } from '@angular/router';
import { StepService } from './../../../../services/step.service';
import { Maintenance } from './../../../../models/maintenance';
import { Component, OnInit } from '@angular/core';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { Step } from 'src/app/models/step';
import {MaintenanceService} from '../../../../services/maintenance.service';
import {StorageService} from '../../../../services/storage.service';
import {UtilisService} from '../../../../services/utilis.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {

  selectedMaintenance: Maintenance;
  steplist: Step[];

  constructor(
    private dataSharing: DataSharingService,
    private stepService: StepService,
    private maintenanceService: MaintenanceService,
    private storageService: StorageService,
    private utilsService: UtilisService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.dataSharing.getCurrentMaintenance().subscribe(
      data => this.selectedMaintenance = data
    );

    this.stepService.getStepByMaintenanceId(this.selectedMaintenance.id).subscribe(
      data => this.steplist = data
    );
  }

  showDescription(step: Step) {
    step.description_visible = !step.description_visible;
  }

  close() {
    this.router.navigate(['..'], { relativeTo: this.route });
  }


  goAvvia() {
    this.storageService.getId().then( data => {
      console.log(data);
      console.log(this.selectedMaintenance.id);
      this.maintenanceService.startMaintenance(this.selectedMaintenance.id, data).subscribe(started => {
        console.log(started);
        this.router.navigate(['tabs/maintenance-tab']);
      }, error => {
        console.log(error);
        this.utilsService.showToast({
          header: 'Attenzione',
          message: 'Una manutenzione è stata già avviata',
          position: 'top',
          duration: 3000,
          cssClass: 'toast-danger'
        });
      });
    });
  }
}
