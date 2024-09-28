import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OptionJobPageRoutingModule } from './option-job-routing.module';

import { OptionJobPage } from './option-job.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OptionJobPageRoutingModule
  ],
  declarations: [OptionJobPage]
})
export class OptionJobPageModule {}
