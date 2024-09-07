import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OptionsProfileCompanyPageRoutingModule } from './options-profile-company-routing.module';

import { OptionsProfileCompanyPage } from './options-profile-company.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OptionsProfileCompanyPageRoutingModule
  ],
  declarations: [OptionsProfileCompanyPage]
})
export class OptionsProfileCompanyPageModule {}
