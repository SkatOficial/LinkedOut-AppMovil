import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileCompanyPageRoutingModule } from './profile-company-routing.module';

import { ProfileCompanyPage } from './profile-company.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileCompanyPageRoutingModule
  ],
  declarations: [ProfileCompanyPage]
})
export class ProfileCompanyPageModule {}
