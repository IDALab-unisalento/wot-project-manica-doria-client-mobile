import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Machine} from '../models/machine';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

const getAllMachine = 'http://localhost:8080/api/machine/getAll';
const getMachineById = 'http://localhost:8080/api/machine/getById/';
const saveMachine = 'http://localhost:8080/api/machine/save';
const deleteMachine = 'http://localhost:8080/api/machine/delete/';

@Injectable({
  providedIn: 'root'
})
export class MachineService {

  constructor(private http: HttpClient) { }

  getAllMachine(): Observable<Machine[]> {
    return this.http.get<Machine[]>(getAllMachine);
  }

  getMachineById(id: string): Observable<Machine> {
    return this.http.get<Machine>(getMachineById + id);
  }

  saveMachine(machine: Machine): Observable<Machine> {
    return this.http.post<Machine>(saveMachine, machine, httpOptions);
  }

  deleteMachine(id: string): Observable<Machine> {
    return this.http.delete<Machine>(deleteMachine + id);
  }
}
