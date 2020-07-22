import { Component, OnInit } from '@angular/core';
import { DataSharingService } from '../../../../../../services/data-sharing.service';
import { StepService } from '../../../../../../services/step.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Step } from '../../../../../../models/step';
import { Maintenance } from '../../../../../../models/maintenance';
import { TimerService } from '../../../../../../services/timer.service';
import { Beacon } from '../../../../../../models/beacon';
import { BleService } from '../../../../../../services/ble.service';
import { UtilisService } from '../../../../../../services/utilis.service';
import { Attachment } from '../../../../../../models/attachment';
import { AttachmentService } from '../../../../../../services/attachment.service';
import { DomSanitizer } from '@angular/platform-browser';
import { UserMaintenance } from '../../../../../../models/user-maintenance';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {

  selectedStep: Step;
  selectedUserMaintenance: UserMaintenance;
  beacon: Beacon;

  attachmentList: Attachment[];
  image: string[];
  sanitizedImageData = [];
  attachment: Attachment;

  result = {
    found: false,
    retry: false,
  };

  check: boolean;

  time = 0;

  constructor(
    private dataSharing: DataSharingService,
    private stepService: StepService,
    private timerService: TimerService,
    private attachmentService: AttachmentService,
    private bleService: BleService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.dataSharing.getCurrentMaintenance()
      .subscribe(
        maintenance => this.selectedUserMaintenance = maintenance
      );

    this.dataSharing.getCurrentStep()
      .subscribe(
        step => {
          this.selectedStep = step;
          this.beacon = this.selectedStep.zone.beacon;
          if (step.status === 'in-progress') {
            this.bleService.findBeacon(step.zone.beacon.name, step.zone.beacon.mac)
              .subscribe(
                result => {
                  this.result.found = result.found;
                  console.log('2. this.result :>> ', this.result, '\n', Date.now());
                });
          }
          this.attachmentService.getAttachment(step.id).subscribe(
            data => {
              this.attachmentList = data;
              console.log('ATTACHMENT:', this.attachmentList);
            });
        });
    this.startTimer();
  }

  //   ngOnInit() {
  //     this.dataSharing.getCurrentStep().subscribe(
  //       data => {
  //         this.selectedStep = data;
  //         this.getAttachment(this.selectedStep.id);
  //         this.getBeacon();
  //       }
  //     );
  //     this.dataSharing.getCurrentMaintenance().subscribe(
  //       data => this.selectedUserMaintenance = data
  //     );
  //     console.log(this.selectedStep);

  //     if (this.selectedStep.status === 'started') {
  //       this.startTimer();
  //     }
  //   }

  //   getAttachment(id: number) {
  //     this.attachmentService.getAttachment(id).subscribe(data => {
  //       this.attachmentList = data;
  //       console.log(this.attachmentList);
  //       /*for (let i = 0; i < this.image.length; i++){
  //         const base64 = 'data:image/jpeg;base64,' + this.image[i];
  //         //const base64 = 'data:video/mp4;base64,' + this.image[i];
  //         this.sanitizedImageData[i] = (this.sanitizer.bypassSecurityTrustUrl(base64));
  //         console.log('AAAAA', this.sanitizedImageData);
  //       }*/
  //     },
  //       error => { console.log('ERROR IN ATTACHMENT :>> ', error); });
  //   }

  //  


  //   getBeacon() {
  //     this.beacon = this.selectedStep.zone.beacon;
  //     if (this.selectedStep.status === 'started') {
  //       this.bleService.findBeaconForever(this.beacon.name, this.beacon.mac).subscribe(data => {
  //         this.result = data;
  //         console.log('RESULT :>> ', this.result.found);
  //       });
  //     }
  //   }

  close() {
    this.bleService.stopScanBeacon();
    this.pauseTimer();
    this.router.navigate(['..'], { relativeTo: this.route });
  }

  completeStep() {
    this.bleService.findBeaconCheck(this.beacon.name, this.beacon.mac).subscribe(
      data => {
        this.check = data;
        if (this.check) {
          this.closeTimer();
          console.log('TIME:', this.time);
          this.stepService.completeStep(this.time, this.selectedStep.id, this.selectedUserMaintenance.maintenance.id, this.selectedUserMaintenance.id)
            .subscribe(() => {
              console.log('step completato');
            });
          this.router.navigate(['..'], { relativeTo: this.route });
        }
      }
    );
  }


  startTimer() {
    this.timerService.startTimer();
  }

  pauseTimer() {
    this.timerService.pauseTimer();
  }

  clearTimer() {
    this.timerService.clearTimer();
  }

  closeTimer() {
    this.timerService.closeTimer().subscribe(time => this.time = time);
  }

  showDescription(step: Step) {
    step.description_visible = !step.description_visible;
  }
}
