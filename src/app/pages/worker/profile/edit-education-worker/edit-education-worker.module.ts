import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditEducationWorkerPageRoutingModule } from './edit-education-worker-routing.module';

import { EditEducationWorkerPage } from './edit-education-worker.page';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditEducationWorkerPageRoutingModule,
    MatButtonModule,
    MatIconModule,
    SharedModule
  ],
  declarations: [EditEducationWorkerPage]
})
export class EditEducationWorkerPageModule {}
