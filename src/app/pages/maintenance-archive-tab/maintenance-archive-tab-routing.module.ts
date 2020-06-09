import { ListComponent } from './components/list/list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaintenanceArchiveTabPage } from './maintenance-archive-tab.page';
import { DetailsComponent } from './components/details/details.component';

const routes: Routes = [
  {
    path: '',
    component: MaintenanceArchiveTabPage,
    children: [
      { path: 'list', component: ListComponent },
      { path: ':id', component: DetailsComponent },
      { path: '', redirectTo: 'list', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaintenanceArchiveTabPageRoutingModule { }
