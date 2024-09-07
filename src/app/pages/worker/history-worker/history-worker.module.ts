import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoryWorkerPageRoutingModule } from './history-worker-routing.module';

import { HistoryWorkerPage } from './history-worker.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoryWorkerPageRoutingModule
  ],
  declarations: [HistoryWorkerPage]
})
export class HistoryWorkerPageModule {}
