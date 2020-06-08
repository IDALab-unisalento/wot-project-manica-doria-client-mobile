import { StepService } from './../../../../services/step.service';
import { Maintenance } from './../../../../models/maintenance';
import { Component, OnInit } from '@angular/core';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { Step } from 'src/app/models/step';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {

  selectedMaintenance: Maintenance;
  steplist: Step[];

  constructor(private dataSharing: DataSharingService, private stepService: StepService) { }

  ngOnInit() {
    this.dataSharing.getCurrentMaintenance().subscribe(
      data => this.selectedMaintenance = data
    );

    this.stepService.getStepByMaintenanceId(this.selectedMaintenance.id).subscribe(
      data => { this.steplist = data; console.log(this.steplist) }

    );
  }

}
