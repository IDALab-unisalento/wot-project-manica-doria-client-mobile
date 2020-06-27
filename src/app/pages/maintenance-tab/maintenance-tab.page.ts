import { TimerService } from './../../services/timer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-maintenance-tab',
  templateUrl: './maintenance-tab.page.html',
  styleUrls: ['./maintenance-tab.page.scss'],
})
export class MaintenanceTabPage implements OnInit {

  constructor(private timer: TimerService) { }

  ngOnInit() {
  }

  startTimer() {
    this.timer.startTimer();
  }

  pauseTimer() {
    this.timer.pauseTimer();
  }

  closeTimer() {
    this.timer.closeTimer();
  }

  clearTimer() {
    this.timer.clearTimer();
  }

}
