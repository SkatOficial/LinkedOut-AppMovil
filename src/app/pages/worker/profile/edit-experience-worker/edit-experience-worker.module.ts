import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditExperienceWorkerPageRoutingModule } from './edit-experience-worker-routing.module';

import { EditExperienceWorkerPage } from './edit-experience-worker.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditExperienceWorkerPageRoutingModule,
    SharedModule
  ],
  declarations: [EditExperienceWorkerPage]
})
export class EditExperienceWorkerPageModule {}
