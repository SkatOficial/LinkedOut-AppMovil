import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileWorkerPageRoutingModule } from './profile-worker-routing.module';

import { ProfileWorkerPage } from './profile-worker.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileWorkerPageRoutingModule
  ],
  declarations: [ProfileWorkerPage]
})
export class ProfileWorkerPageModule {}
