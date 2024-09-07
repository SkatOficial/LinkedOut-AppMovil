import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileCompanyPage } from './profile-company.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileCompanyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileCompanyPageRoutingModule {}
