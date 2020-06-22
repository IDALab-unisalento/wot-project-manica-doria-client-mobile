import { User } from './../models/user';
import { Observable } from 'rxjs';
import { Maintenance } from './../models/maintenance';
import { Injectable } from '@angular/core';
import { Step } from '../models/step';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  private currentMaintenace: Maintenance;
  private step: Step;
  user: User;

  constructor() { }

  getCurrentMaintenance(): Observable<Maintenance> {
    return new Observable(observer => {
      observer.next(this.currentMaintenace);
    });
  }

  setCurrentMaintenance(maintenace: Maintenance): void {
    console.log('Current Maintenance: ', maintenace);
    this.currentMaintenace = maintenace;
  }

  getCurrentStep(): Observable<Step> {
    return new Observable(observer => {
      observer.next(this.step);
    });
  }

  setCurrentStep(step: Step): void {
    this.step = step;
  }

  getCurrentUser(): Observable<User> {
    return new Observable(observer => {
      observer.next(this.user);
    });
  }

  setCurrentUser(user: User): void {
    this.user = user;
  }


}

