import { UserService } from './services/user.service';
import { DataSharingService } from './services/data-sharing.service';
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { StorageService } from './services/storage.service';
import { Router } from '@angular/router';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storageService: StorageService,
    private dataSharingService: DataSharingService,
    private userService: UserService,
    private router: Router,

  ) {
    this.initializeApp();
    this.storageService.authState.subscribe(state => {
      console.log('STATO:', state);
      if (state) {
        this.storageService.getId().then(idUser => {
          this.userService.getUserById(idUser).subscribe(
            user => this.dataSharingService.setCurrentUser(user)
          );
        });
        this.router.navigate(['tabs']);
      } /*else {
        this.router.navigate(['login'], { skipLocationChange: true });
      }*/
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });


  }
}
