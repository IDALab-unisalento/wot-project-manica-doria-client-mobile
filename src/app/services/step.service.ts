import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Step } from '../models/step';
import { ApiVariables } from '../common/ApiVariables';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class StepService {

  private getAllStepUrl = ApiVariables.apiUrlStep + '/getAll';
  private getStepByIdUrl = ApiVariables.apiUrlStep + '/getById/';
  private saveStepUrl = ApiVariables.apiUrlStep + '/save';
  private deleteStepUrl = ApiVariables.apiUrlStep + '/delete/';

  constructor(private http: HttpClient) { }

  getAllStep(): Observable<Step[]> {
    return this.http.get<Step[]>(this.getAllStepUrl);
  }

  getStepById(id: string): Observable<Step> {
    return this.http.get<Step>(this.getStepByIdUrl + id);
  }

  saveStep(step: Step): Observable<Step> {
    return this.http.post<Step>(this.saveStepUrl, step, httpOptions);
  }

  deleteStep(id: string): Observable<Step> {
    return this.http.delete<Step>(this.deleteStepUrl + id);
  }
}
