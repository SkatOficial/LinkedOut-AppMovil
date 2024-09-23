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
      redirectTo: 'history',
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
      path: 'create-job',
      loadChildren: () => import('../job/create-job/create-job.module').then( m => m.CreateJobPageModule)
    },]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
