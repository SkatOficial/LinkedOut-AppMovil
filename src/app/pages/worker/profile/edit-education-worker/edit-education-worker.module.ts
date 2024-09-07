import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditEducationWorkerPageRoutingModule } from './edit-education-worker-routing.module';

import { EditEducationWorkerPage } from './edit-education-worker.page';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditEducationWorkerPageRoutingModule,
    MatButtonModule,
    MatIconModule
  ],
  declarations: [EditEducationWorkerPage]
})
export class EditEducationWorkerPageModule {}
