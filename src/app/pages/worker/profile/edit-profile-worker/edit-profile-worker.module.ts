import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditProfileWorkerPageRoutingModule } from './edit-profile-worker-routing.module';

import { EditProfileWorkerPage } from './edit-profile-worker.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditProfileWorkerPageRoutingModule
  ],
  declarations: [EditProfileWorkerPage]
})
export class EditProfileWorkerPageModule {}
