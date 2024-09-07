import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditProfileCompanyPage } from './edit-profile-company.page';

const routes: Routes = [
  {
    path: '',
    component: EditProfileCompanyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditProfileCompanyPageRoutingModule {}
