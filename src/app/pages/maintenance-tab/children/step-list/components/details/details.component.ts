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


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {

  selectedStep: Step;
  selectedMaintenace: Maintenance;
  beacon: Beacon;

  result = {
    found: false,
    retry: false,
  };

  check: boolean;

  time = 0;

  constructor(private dataSharing: DataSharingService,
    private stepService: StepService,
    private timerService: TimerService,
    private bleService: BleService,
    private utils: UtilisService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.dataSharing.getCurrentStep().subscribe(
      data => {
        this.selectedStep = data;
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
