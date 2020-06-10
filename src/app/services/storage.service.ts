import { Injectable } from '@angular/core';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  logout() {
    localStorage.clear();
  }

  setUser(user: User) {
    localStorage.setItem('ID_KEY', String(user.id));
    localStorage.setItem('EMAIL_KEY', user.email);
    localStorage.setItem('ROLE_KEY', user.role);
  }

  getEmail() {
    return localStorage.getItem('EMAIL_KEY');
  }

  getRole() {
    return localStorage.getItem('ROLE_KEY');
  }

  getId() {
    return localStorage.getItem('ID_KEY');
  }
}
