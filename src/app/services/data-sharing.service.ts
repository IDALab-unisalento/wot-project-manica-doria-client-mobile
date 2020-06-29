import { User } from './../models/user';
import { Observable } from 'rxjs';
import { Maintenance } from './../models/maintenance';
import { Injectable } from '@angular/core';
import { Step } from '../models/step';
import { UserMaintenance } from '../models/user-maintenance';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  private currentUserMaintenance: UserMaintenance;
  private step: Step;
  user: User;

  constructor() { }

  getCurrentMaintenance(): Observable<UserMaintenance> {
    return new Observable(observer => {
      observer.next(this.currentUserMaintenance);
    });
  }

  setCurrentMaintenance(userMaintenance: UserMaintenance): void {
    console.log('Current Maintenance: ', userMaintenance);
    this.currentUserMaintenance = userMaintenance;
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

