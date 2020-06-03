import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaintenanceTabPage } from './maintenance-tab.page';

const routes: Routes = [
  {
    path: '',
    component: MaintenanceTabPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaintenanceTabPageRoutingModule {}
