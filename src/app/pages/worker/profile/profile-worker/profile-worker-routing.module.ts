import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileWorkerPage } from './profile-worker.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileWorkerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileWorkerPageRoutingModule {}
