import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'maintenance-tab',
        loadChildren: () => import('../maintenance-tab/maintenance-tab.module').then(m => m.MaintenanceTabPageModule)
      },
      {
        path: 'maintenance-list-tab',
        loadChildren: () => import('../maintenance-list-tab/maintenance-list-tab.module').then(m => m.MaintenanceListTabPageModule)
      },
      {
        path: 'maintenance-archive-tab',
        loadChildren: () => import('../maintenance-archive-tab/maintenance-archive-tab.module').then(m => m.MaintenanceArchiveTabPageModule)
      },
      {
        path: '',
        redirectTo: '/maintenance-tab',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/maintenance-tab',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
