import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaintenanceTabPageRoutingModule } from './maintenance-tab-routing.module';

import { MaintenanceTabPage } from './maintenance-tab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaintenanceTabPageRoutingModule
  ],
  declarations: [MaintenanceTabPage]
})
export class MaintenanceTabPageModule {}
