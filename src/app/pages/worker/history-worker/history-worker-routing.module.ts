import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistoryWorkerPage } from './history-worker.page';

const routes: Routes = [
  {
    path: '',
    component: HistoryWorkerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoryWorkerPageRoutingModule {}
