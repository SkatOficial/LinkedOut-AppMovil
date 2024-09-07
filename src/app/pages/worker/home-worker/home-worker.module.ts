import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeWorkerPageRoutingModule } from './home-worker-routing.module';

import { HomeWorkerPage } from './home-worker.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeWorkerPageRoutingModule
  ],
  declarations: [HomeWorkerPage]
})
export class HomeWorkerPageModule {}
