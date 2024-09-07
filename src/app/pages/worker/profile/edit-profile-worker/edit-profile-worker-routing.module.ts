import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditProfileWorkerPage } from './edit-profile-worker.page';

const routes: Routes = [
  {
    path: '',
    component: EditProfileWorkerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditProfileWorkerPageRoutingModule {}
