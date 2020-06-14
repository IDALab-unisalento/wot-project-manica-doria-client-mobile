import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaintenanceTabPageRoutingModule } from './maintenance-tab-routing.module';

import { MaintenanceTabPage } from './maintenance-tab.page';
import {IconProfileComponent} from '../common/icon-profile/icon-profile.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaintenanceTabPageRoutingModule
  ],
  exports: [
    IconProfileComponent
  ],
  declarations: [MaintenanceTabPage, IconProfileComponent]
})
export class MaintenanceTabPageModule {}
