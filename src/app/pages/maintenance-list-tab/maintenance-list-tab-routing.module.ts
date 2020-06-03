import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaintenanceListTabPage } from './maintenance-list-tab.page';

const routes: Routes = [
  {
    path: '',
    component: MaintenanceListTabPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaintenanceListTabPageRoutingModule {}
