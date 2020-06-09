import { Observable } from 'rxjs';
import { Maintenance } from './../models/maintenance';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  private maintenace: Maintenance;

  constructor() { }

  getCurrentMaintenance(): Observable<Maintenance> {
    return new Observable(observer => {
      observer.next(this.maintenace);
    });
  }

  setCurrentMaintenance(maintenace: Maintenance): void {
    this.maintenace = maintenace;
  }

}

