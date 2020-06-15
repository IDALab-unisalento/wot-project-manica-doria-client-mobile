import { Component, OnInit } from '@angular/core';
import {DataSharingService} from '../../../../../../services/data-sharing.service';
import {StepService} from '../../../../../../services/step.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Step} from '../../../../../../models/step';
import {Maintenance} from '../../../../../../models/maintenance';
import {TimerService} from '../../../../../../services/timer.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {

  selectedStep: Step;
  selectedMaintenace: Maintenance;

  time = 0;

  constructor(private dataSharing: DataSharingService,
              private stepService: StepService,
              private timerService: TimerService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.dataSharing.getCurrentStep().subscribe(
        data => this.selectedStep = data
    );
    this.dataSharing.getCurrentMaintenance().subscribe(
        data => this.selectedMaintenace = data
    );
    console.log(this.selectedStep);

    if (this.selectedStep.status === 'started'){
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

  completeStep() {
    this.stepService.completeStep(this.getTime(), this.selectedStep.id, this.selectedMaintenace.id).subscribe(data => {
      console.log(this.selectedStep.status);
    });
    this.clearTimer();
    this.router.navigate(['..'], {relativeTo: this.route});
  }

  close() {
    this.router.navigate(['..'], { relativeTo: this.route });
  }


}
