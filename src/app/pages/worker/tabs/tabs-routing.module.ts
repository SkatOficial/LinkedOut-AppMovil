import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children:[
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: () => import('../../worker/home-worker/home-worker.module').then( m => m.HomeWorkerPageModule)
      },
      {
        path: 'history',
        loadChildren: () => import('../../worker/history-worker/history-worker.module').then( m => m.HistoryWorkerPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile-worker/profile-worker.module').then( m => m.ProfileWorkerPageModule)
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  
})
export class TabsPageRoutingModule {}
