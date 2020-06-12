import { Router, ActivationEnd, ActivatedRoute } from '@angular/router';
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

  constructor(
    private dataSharing: DataSharingService,
    private stepService: StepService,
    private router: Router,
    private route: ActivatedRoute) { }

  descriptionHidden = false;

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

}
