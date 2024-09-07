import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddExperienceWorkerPage } from './add-experience-worker.page';

const routes: Routes = [
  {
    path: '',
    component: AddExperienceWorkerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddExperienceWorkerPageRoutingModule {}
