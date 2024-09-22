import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddExperienceWorkerPageRoutingModule } from './add-experience-worker-routing.module';

import { AddExperienceWorkerPage } from './add-experience-worker.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddExperienceWorkerPageRoutingModule,
    SharedModule
  ],
  declarations: [AddExperienceWorkerPage]
})
export class AddExperienceWorkerPageModule {}
