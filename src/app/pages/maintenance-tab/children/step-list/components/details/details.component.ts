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
import {Attachment} from '../../../../../../models/attachment';
import {AttachmentService} from '../../../../../../services/attachment.service';
import {DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {

  selectedStep: Step;
  selectedMaintenace: Maintenance;
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

  constructor(private dataSharing: DataSharingService,
              private stepService: StepService,
              private timerService: TimerService,
              private attachmentService: AttachmentService,
              private sanitizer: DomSanitizer,
              private bleService: BleService,
              private utils: UtilisService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.dataSharing.getCurrentStep().subscribe(
      data => {
        this.selectedStep = data;
        this.getAttachment(this.selectedStep.id);
        this.getBeacon();
      }
    );
    this.dataSharing.getCurrentMaintenance().subscribe(
      data => this.selectedMaintenace = data
    );
    console.log(this.selectedStep);

    if (this.selectedStep.status === 'started') {
      this.startTimer();
    }
  }

  getAttachment(id: number) {
    this.attachmentService.getAttachment(id).subscribe(data => {
      this.attachmentList = data;
      console.log(this.attachmentList);
      /*for (let i = 0; i < this.image.length; i++){
        const base64 = 'data:image/jpeg;base64,' + this.image[i];
        //const base64 = 'data:video/mp4;base64,' + this.image[i];
        this.sanitizedImageData[i] = (this.sanitizer.bypassSecurityTrustUrl(base64));
        console.log('AAAAA', this.sanitizedImageData);
      }*/
    });
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

  getTime(): number {
    this.timerService.getCurrentTimer().subscribe(data => {
      return this.time = data;
    });
    return this.time;
  }

  async completeStep() {

    this.bleService.findBeaconCheck(this.beacon.name, this.beacon.mac).subscribe(
      data => {
        this.check = data;
        if (this.check) {
          this.stepService.completeStep(this.getTime(), this.selectedStep.id, this.selectedMaintenace.id).subscribe( () => {
            console.log('step completato');
          });
          this.router.navigate(['..'], { relativeTo: this.route });
        }
      }
    );
  }

  async getBeacon() {
    this.beacon = this.selectedStep.zone.beacon;
    if (this.selectedStep.status === 'started') {
      this.checkBeacon();
    }
  }

  async checkBeacon() {
    console.log('RESULT PRIMA DELLO STEP', this.result.found);
    this.result = await this.bleService.findBeaconForever(this.beacon.name, this.beacon.mac);
  }

  close() {
    this.bleService.stopScanBeacon();
    this.result.found = false;
    this.result.retry = false;
    this.router.navigate(['..'], { relativeTo: this.route });
  }


}
