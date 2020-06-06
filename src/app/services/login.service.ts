import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLogin } from '../models/user';
import { User } from '../models/user';

const loginUrl = 'http://localhost:8080/api/user/login/';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(user: UserLogin): Observable<User> {
    return this.http.get<User>(loginUrl + `${user.email}/${user.password}`);
  }

}
