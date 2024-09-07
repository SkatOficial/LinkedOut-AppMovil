import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OptionsProfileCompanyPage } from './options-profile-company.page';

const routes: Routes = [
  {
    path: '',
    component: OptionsProfileCompanyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OptionsProfileCompanyPageRoutingModule {}
