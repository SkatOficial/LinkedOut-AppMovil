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
      path: 'profile',
      loadChildren: () => import('../profile/profile-company/profile-company.module').then( m => m.ProfileCompanyPageModule)
    },
    {
      path: 'history',
      loadChildren: () => import('../../company/history-company/history-company.module').then( m => m.HistoryCompanyPageModule)
    },
    {
      path: 'home',
      loadChildren: () => import('../../company/home-company/home-company.module').then( m => m.HomeCompanyPageModule)
    },
    {
      path: 'create-job',
      loadChildren: () => import('../../company/create-job/create-job.module').then( m => m.CreateJobPageModule)
    },]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
