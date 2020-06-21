import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  authState = new BehaviorSubject(false);

  constructor(private storage: Storage, private router: Router, private platform: Platform) {
    this.platform.ready().then(() => {
      this.ifLoggedIn();
    });
  }

  async ifLoggedIn() {
    await this.storage.get('email').then((response) => {
      if (response) {
        this.authState.next(true);
      }
    });
  }

  async login(user: User) {
    await this.setUser(user);
    this.authState.next(true);
    // this.router.navigateByUrl('tabs/maintenance-tab');
    /*this.storage.set('user', user).then((response) => {
      this.setUser(user);
      this.authState.next(true);
      this.router.navigateByUrl('/tabs');
    });*/
  }

  async logout() {
    await this.storage.clear();
    this.authState.next(false);
    window.location.reload();
  }


  async setUser(user: User) {
    await this.storage.set('id', String(user.id));
    await this.storage.set('role', String(user.role));
    await this.storage.set('email', String(user.email));
    await this.storage.set('name', String(user.name));
  }

  async getEmail() {
    return await this.storage.get('email');
  }

  async getRole() {
    return await this.storage.get('role');
  }

  async getId() {
    return await this.storage.get('id');
  }

  async getName() {
    return await this.storage.get('name');
  }

  isAuthenticated() {
    return this.authState.value;
  }

}
