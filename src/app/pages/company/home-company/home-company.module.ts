import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeCompanyPageRoutingModule } from './home-company-routing.module';

import { HomeCompanyPage } from './home-company.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeCompanyPageRoutingModule
  ],
  declarations: [HomeCompanyPage]
})
export class HomeCompanyPageModule {}
