import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  time = 0;
  t1 = 0;
  partialTime = 0;
  interval: any;
  isStarted = false;

  constructor() { }

  startTimer() {
    if (this.isStarted !== true) {
      this.isStarted = true;
      this.interval = setInterval(() => {
        this.time++;
      }, 1000);
    }
  }

  pauseTimer() {
    clearInterval(this.interval);
    this.isStarted = false;
  }

  clearTimer() {
    clearInterval(this.interval);
    this.time = 0;
    this.isStarted = false;
  }

  getCurrentTimer(): Observable<number> {
    return new Observable(observer => {
      observer.next(this.time);
    });
  }




}
