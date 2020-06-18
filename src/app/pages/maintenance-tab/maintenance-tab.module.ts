import { TabsPageModule } from './../tabs/tabs.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaintenanceTabPageRoutingModule } from './maintenance-tab-routing.module';

import { MaintenanceTabPage } from './maintenance-tab.page';
import { SharedComponentModule } from '../shared/shared.module';
import {SearchCardComponent} from './children/search-card/search-card.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaintenanceTabPageRoutingModule,
    SharedComponentModule,
  ],
  declarations: [MaintenanceTabPage, SearchCardComponent]
})
export class MaintenanceTabPageModule { }
