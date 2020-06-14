import { DetailsComponent } from './components/details/details.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaintenanceListTabPageRoutingModule } from './maintenance-list-tab-routing.module';

import { MaintenanceListTabPage } from './maintenance-list-tab.page';
import { ListComponent } from './components/list/list.component';
import {MaintenanceTabPageModule} from '../maintenance-tab/maintenance-tab.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MaintenanceListTabPageRoutingModule,
        MaintenanceTabPageModule
    ],
  declarations: [MaintenanceListTabPage, ListComponent, DetailsComponent]
})
export class MaintenanceListTabPageModule { }
