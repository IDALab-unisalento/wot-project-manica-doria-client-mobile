import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Machine } from '../models/machine';
import { ApiVariables } from '../common/ApiVariables';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class MachineService {

  private getAllMachineUrl = ApiVariables.apiUrlMachine + '/getAll';
  private getMachineByIdUrl = ApiVariables.apiUrlMachine + '/getById/';
  private saveMachineUrl = ApiVariables.apiUrlMachine + '/save';
  private deleteMachineUrl = ApiVariables.apiUrlMachine + '/delete/';


  constructor(private http: HttpClient) { }

  getAllMachine(): Observable<Machine[]> {
    return this.http.get<Machine[]>(this.getAllMachineUrl);
  }

  getMachineById(id: string): Observable<Machine> {
    return this.http.get<Machine>(this.getMachineByIdUrl + id);
  }

  saveMachine(machine: Machine): Observable<Machine> {
    return this.http.post<Machine>(this.saveMachineUrl, machine, httpOptions);
  }

  deleteMachine(id: string): Observable<Machine> {
    return this.http.delete<Machine>(this.deleteMachineUrl + id);
  }
}
