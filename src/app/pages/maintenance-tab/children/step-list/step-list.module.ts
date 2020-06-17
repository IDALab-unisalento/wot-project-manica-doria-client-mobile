import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StepListPageRoutingModule } from './step-list-routing.module';

import { StepListPage } from './step-list.page';
import { ListComponent } from './components/list/list.component';
import { DetailsComponent } from './components/details/details.component';
import { SharedComponentModule } from 'src/app/pages/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StepListPageRoutingModule,
    SharedComponentModule
  ],
  declarations: [StepListPage, ListComponent, DetailsComponent]
})
export class StepListPageModule { }
