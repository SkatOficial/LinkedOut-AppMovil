import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddEducationWorkerPageRoutingModule } from './add-education-worker-routing.module';

import { AddEducationWorkerPage } from './add-education-worker.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddEducationWorkerPageRoutingModule
  ],
  declarations: [AddEducationWorkerPage]
})
export class AddEducationWorkerPageModule {}
