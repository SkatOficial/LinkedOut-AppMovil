import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditEducationWorkerPage } from './edit-education-worker.page';

const routes: Routes = [
  {
    path: '',
    component: EditEducationWorkerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditEducationWorkerPageRoutingModule {}
