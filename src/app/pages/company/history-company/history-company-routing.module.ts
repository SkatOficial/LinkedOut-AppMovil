import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistoryCompanyPage } from './history-company.page';

const routes: Routes = [
  {
    path: '',
    component: HistoryCompanyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoryCompanyPageRoutingModule {}
