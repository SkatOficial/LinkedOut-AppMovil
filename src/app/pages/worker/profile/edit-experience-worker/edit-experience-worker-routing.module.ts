import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditExperienceWorkerPage } from './edit-experience-worker.page';

const routes: Routes = [
  {
    path: '',
    component: EditExperienceWorkerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditExperienceWorkerPageRoutingModule {}
