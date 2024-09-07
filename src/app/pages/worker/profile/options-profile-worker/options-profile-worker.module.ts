import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OptionsProfileWorkerPageRoutingModule } from './options-profile-worker-routing.module';

import { OptionsProfileWorkerPage } from './options-profile-worker.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OptionsProfileWorkerPageRoutingModule
  ],
  declarations: [OptionsProfileWorkerPage]
})
export class OptionsProfileWorkerPageModule {}
