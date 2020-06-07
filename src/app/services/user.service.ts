import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { ApiVariables } from '../common/ApiVariables';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private getAllUserUrl = ApiVariables.apiUrlUser + '/getAll';
  private getUserByIdUrl = ApiVariables.apiUrlUser + '/getById/';
  private saveUserUrl = ApiVariables.apiUrlUser + '/save';
  private deleteUserUrl = ApiVariables.apiUrlUser + '/delete/';

  constructor(private http: HttpClient) { }

  getAllUser(): Observable<User[]> {
    return this.http.get<User[]>(this.getAllUserUrl);
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(this.getUserByIdUrl + id);
  }

  saveUser(user: User): Observable<User> {
    return this.http.post<User>(this.saveUserUrl, user, httpOptions);
  }

  deleteUser(id: string): Observable<User> {
    return this.http.delete<User>(this.deleteUserUrl + id);
  }
}
