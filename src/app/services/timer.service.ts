import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  start: number;
  startPause: number;
  sumPause: number;
  isPaused: boolean;
  duration: number;

  constructor(private localStorage: StorageService) { }

  startTimer() {
    // console.log('this.isPaused', this.isPaused);
    if (!this.isPaused) {

      this.start = Date.now();
      this.sumPause = 0;
      this.startPause = 0;

      this.localStorage.setValue('timer_start', this.start).then(
        data => console.log('salvato timer_start: ', data),
        error => console.log(error));
      this.localStorage.setValue('timer_sumPause', this.sumPause).then(
        data => console.log('salvato timer_sumPause: ', data),
        error => console.log(error));
      this.localStorage.setValue('timer_isPause', this.isPaused).then(
        data => console.log('salvato timer_isPause: ', data),
        error => console.log(error));
    }
    else {
      this.localStorage.getValue('timer_sumPause').then(
        sumPause => {
          this.sumPause = sumPause;
          this.sumPause = this.sumPause + this.getTime() - this.startPause;
          this.localStorage.setValue('timer_sumPause', this.sumPause).then(
            data => console.log('salvato timer_sumPause: ', data),
            error => console.log(error));
        },
        error => console.error('LocalStorage Error:', error));
    }
  }


  pauseTimer() {
    this.isPaused = true;
    this.localStorage.setValue('timer_isPause', this.isPaused).then(
      data => console.log('salvato timer_isPause: ', data),
      error => console.log(error));

    this.startPause = this.getTime();
    this.localStorage.setValue('timer_startPause', this.startPause).then(
      data => console.log('salvato: ', data),
      error => console.log(error));
  }

  closeTimer(): Observable<number> {
    return new Observable((obs) => {
      this.localStorage.getValue('timer_start').then(
        start => this.start = start,
        error => console.error('LocalStorage Error:', error)
      ).then(() => {
        this.localStorage.getValue('timer_sumPause').then(
          sumPause => this.sumPause = sumPause,
          error => console.error('LocalStorage Error:', error)
        );
      }).then(
        () => {
          let _duration = 0;
          _duration = this.getTime() - this.sumPause;
          console.log('duration', _duration);
          obs.next(_duration);
        }
      );
    });
  }

  clearTimer() {
    this.localStorage.setValue('timer_start', 0);
    this.localStorage.setValue('timer_isPause', false);
    this.localStorage.setValue('timer_sumPause', 0);
  }

  getTime() {
    console.log('GetTime :>>', Date.now() - this.start);

    return (Date.now() - this.start);
  }

}





/*
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
  */
