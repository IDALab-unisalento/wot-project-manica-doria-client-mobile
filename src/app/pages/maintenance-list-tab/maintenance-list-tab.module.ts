import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaintenanceListTabPageRoutingModule } from './maintenance-list-tab-routing.module';

import { MaintenanceListTabPage } from './maintenance-list-tab.page';
import { ListComponent } from './components/list/list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaintenanceListTabPageRoutingModule
  ],
  declarations: [MaintenanceListTabPage, ListComponent]
})
export class MaintenanceListTabPageModule { }
