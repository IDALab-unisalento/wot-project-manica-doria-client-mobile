import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { UserLogin } from '../models/user';
import { User } from '../models/user';
import { ApiVariables } from '../common/ApiVariables';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginUrl = ApiVariables.apiUrlUser + '/login/';

  constructor(private http: HttpClient) { }

  login(user: UserLogin): Observable<User> {
    return this.http.get<User>(this.loginUrl + `${user.email}/${user.password}`);
  }

}
