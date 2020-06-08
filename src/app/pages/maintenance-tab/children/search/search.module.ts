import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchPageRoutingModule } from './search-routing.module';

import { SearchPage } from './search.page';
import { EmptyMaintenanceComponent } from './components/empty-maintenance/empty-maintenance.component';
import { FillMaintenanceComponent } from './components/fill-maintenance/fill-maintenance.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchPageRoutingModule
  ],
  declarations: [SearchPage, EmptyMaintenanceComponent, FillMaintenanceComponent]
})
export class SearchPageModule { }
