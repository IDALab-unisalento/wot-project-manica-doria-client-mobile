import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Zone } from '../models/zone';
import { ApiVariables } from '../common/ApiVariables';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};



@Injectable({
  providedIn: 'root'
})
export class ZoneService {

  private getAllZoneUrl = ApiVariables.apiUrlZone + '/getAll';
  private getZoneByIdUrl = ApiVariables.apiUrlZone + '/getById/';
  private saveZoneUrl = ApiVariables.apiUrlZone + '/save';
  private deleteZoneUrl = ApiVariables.apiUrlZone + '/delete/';

  constructor(private http: HttpClient) { }

  getAllZone(): Observable<Zone[]> {
    return this.http.get<Zone[]>(this.getAllZoneUrl);
  }

  getZoneById(id: string): Observable<Zone> {
    return this.http.get<Zone>(this.getZoneByIdUrl + id);
  }

  saveZone(zone: Zone): Observable<Zone> {
    return this.http.post<Zone>(this.saveZoneUrl, zone, httpOptions);
  }

  deleteZone(id: string): Observable<Zone> {
    return this.http.delete<Zone>(this.deleteZoneUrl + id);
  }
}
