import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

const getAllUser = 'http://localhost:8080/api/user/getAll';
const getUserById = 'http://localhost:8080/api/user/getById/';
const saveUser = 'http://localhost:8080/api/user/save';
const deleteUser = 'http://localhost:8080/api/user/delete/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllUser(): Observable<User[]> {
    return this.http.get<User[]>(getAllUser);
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(getUserById + id);
  }

  saveUser(user: User): Observable<User> {
    return this.http.post<User>(saveUser, user, httpOptions);
  }

  deleteUser(id: string): Observable<User> {
    return this.http.delete<User>(deleteUser + id);
  }
}
