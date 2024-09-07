import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditExperienceWorkerPageRoutingModule } from './edit-experience-worker-routing.module';

import { EditExperienceWorkerPage } from './edit-experience-worker.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditExperienceWorkerPageRoutingModule
  ],
  declarations: [EditExperienceWorkerPage]
})
export class EditExperienceWorkerPageModule {}
