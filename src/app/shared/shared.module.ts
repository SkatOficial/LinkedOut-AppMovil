import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateSelectorComponent } from '../components/date-selector/date-selector.component';



@NgModule({
  declarations: [DateSelectorComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [DateSelectorComponent]
})
export class SharedModule { }
