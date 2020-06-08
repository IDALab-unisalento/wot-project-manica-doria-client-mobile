import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StepListPageRoutingModule } from './step-list-routing.module';

import { StepListPage } from './step-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StepListPageRoutingModule
  ],
  declarations: [StepListPage]
})
export class StepListPageModule {}
