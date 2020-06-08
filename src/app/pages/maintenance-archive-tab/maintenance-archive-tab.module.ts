import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaintenanceArchiveTabPageRoutingModule } from './maintenance-archive-tab-routing.module';

import { MaintenanceArchiveTabPage } from './maintenance-archive-tab.page';
import {ListComponent} from './components/list/list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaintenanceArchiveTabPageRoutingModule
  ],
  declarations: [MaintenanceArchiveTabPage, ListComponent]
})
export class MaintenanceArchiveTabPageModule {}
