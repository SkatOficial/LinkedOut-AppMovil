import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-date-selector',
  templateUrl: './date-selector.component.html',
  styleUrls: ['./date-selector.component.scss'],
})
export class DateSelectorComponent  implements OnInit {
  @Input() startDateIsCorrect ?: boolean;
  @Input() endDateIsCorrect ?: boolean;
  @Output() startDateChange = new EventEmitter<Date>();
  @Output() endDateChange = new EventEmitter<Date>();
  @Output() isWorkingChange ?:boolean;

 
  //Fecha
  defaultDate= new Date();
  selectedStartDate ?: Date;
  selectedEndDate ?: Date;
  today ?: string;  
  minDate ?: string;
  isWorking ?: boolean;

  constructor() { 
    this.today = new Date().toISOString();

  }

  ngOnInit() {}

  startDateConfirmed(event:any){
    let value:any = event.detail.value;
    
    if (value === undefined) {
      value = this.defaultDate;
    }else{
      value= new Date(event.detail.value);
    }

    if(this.selectedEndDate && value > this.selectedEndDate ){
      this.selectedEndDate = undefined;
      this.endDateChange.emit(this.selectedEndDate);
    }

    this.selectedStartDate = value;
    this.minDate = value.toISOString();
    this.startDateChange.emit(value);

  }

  endDateConfirmed(event:any){
    let value:any = event.detail.value;
    
    if (value === undefined) {
      value = this.defaultDate;
    }else{
      value= new Date(event.detail.value);
    }
    
    this.selectedEndDate = value;
    this.endDateChange.emit(value);

  }

  dateFormat(date:Date | undefined){
    if(!date){
      return "";
    }

    const year = date.getFullYear();
    const month = date.toLocaleString('es-ES', { month: 'long' }); //transforma el mes a la palabra en español

    return year + " " + month;
  }

  isWorkingChanged( event:any){
    this.isWorking = event.detail.checked;
  }

}
