import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaintenanceService } from './services/maintenance.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UserService } from './services/user.service';
import { AttachmentService } from './services/attachment.service';
import { BeaconService } from './services/beacon.service';
import { MachineService } from './services/machine.service';
import { StepService } from './services/step.service';
import { ZoneService } from './services/zone.service';
import { UserMaintenanceService } from './services/user-maintenance.service';
import {LoginService} from './services/login.service';
import {StorageService} from './services/storage.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, FormsModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
    MaintenanceService,
    UserService,
    AttachmentService,
    BeaconService,
    MachineService,
    StepService,
    ZoneService,
    UserMaintenanceService,
    LoginService,
    StorageService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
