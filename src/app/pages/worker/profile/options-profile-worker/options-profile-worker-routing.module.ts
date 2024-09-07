import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OptionsProfileWorkerPage } from './options-profile-worker.page';

const routes: Routes = [
  {
    path: '',
    component: OptionsProfileWorkerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OptionsProfileWorkerPageRoutingModule {}
