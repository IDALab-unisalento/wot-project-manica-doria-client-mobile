import { Router, ActivationEnd, ActivatedRoute } from '@angular/router';
import { StepService } from '../../../../services/step.service';
import { Component, OnInit } from '@angular/core';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { Step } from 'src/app/models/step';
import {DomSanitizer} from '@angular/platform-browser';
import {AttachmentService} from '../../../../services/attachment.service';
import {Attachment} from '../../../../models/attachment';
import {rename} from 'fs';
import {UserMaintenance} from '../../../../models/user-maintenance';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {

  selectedUserMaintenance: UserMaintenance;
  stepList: Step[];

  constructor(
    private dataSharing: DataSharingService,
    private stepService: StepService,
    private router: Router,
    private route: ActivatedRoute) { }

  descriptionHidden = false;

  ngOnInit() {
    this.dataSharing.getCurrentMaintenance().subscribe(
      data => this.selectedUserMaintenance = data
    );

    this.stepService.getStepByMaintenanceId(this.selectedUserMaintenance.maintenance.id).subscribe(
      data => {
        console.log(data);
        this.stepList = data;
      }
    );
  }

  showDescription(step: Step) {
    step.description_visible = !step.description_visible;
  }

  close() {
    this.router.navigate(['..'], { relativeTo: this.route });
  }

}
