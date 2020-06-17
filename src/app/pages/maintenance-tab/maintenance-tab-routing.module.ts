import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaintenanceTabPage } from './maintenance-tab.page';

const routes: Routes = [
  {
    path: '',
    component: MaintenanceTabPage,
    children: [
      {
        path: 'search',
        loadChildren: () => import('./children/search/search.module').then(m => m.SearchPageModule)
      },
      {
        path: 'step-list',
        loadChildren: () => import('./children/step-list/step-list.module').then(m => m.StepListPageModule)
      },
      {
        path: '',
        redirectTo: 'search',
        pathMatch: 'full'
      }]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaintenanceTabPageRoutingModule { }
