import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaintenanceArchiveTabPage } from './maintenance-archive-tab.page';

const routes: Routes = [
  {
    path: '',
    component: MaintenanceArchiveTabPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaintenanceArchiveTabPageRoutingModule {}
