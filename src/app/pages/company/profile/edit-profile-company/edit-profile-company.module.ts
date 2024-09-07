import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditProfileCompanyPageRoutingModule } from './edit-profile-company-routing.module';

import { EditProfileCompanyPage } from './edit-profile-company.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditProfileCompanyPageRoutingModule
  ],
  declarations: [EditProfileCompanyPage]
})
export class EditProfileCompanyPageModule {}
