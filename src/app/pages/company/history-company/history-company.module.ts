import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoryCompanyPageRoutingModule } from './history-company-routing.module';

import { HistoryCompanyPage } from './history-company.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoryCompanyPageRoutingModule
  ],
  declarations: [HistoryCompanyPage]
})
export class HistoryCompanyPageModule {}
