import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Step} from '../models/step';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

const getAllStep = 'http://localhost:8080/api/step/getAll';
const getStepById = 'http://localhost:8080/api/step/getById/';
const saveStep = 'http://localhost:8080/api/step/save';
const deleteStep = 'http://localhost:8080/api/step/delete/';

@Injectable({
  providedIn: 'root'
})
export class StepService {

  constructor(private http: HttpClient) { }

  getAllStep(): Observable<Step[]> {
    return this.http.get<Step[]>(getAllStep);
  }

  getStepById(id: string): Observable<Step> {
    return this.http.get<Step>(getStepById + id);
  }

  saveStep(step: Step): Observable<Step> {
    return this.http.post<Step>(saveStep, step, httpOptions);
  }

  deleteStep(id: string): Observable<Step> {
    return this.http.delete<Step>(deleteStep + id);
  }
}
