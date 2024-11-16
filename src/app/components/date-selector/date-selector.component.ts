import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-date-selector',
  templateUrl: './date-selector.component.html',
  styleUrls: ['./date-selector.component.scss'],
})
export class DateSelectorComponent  implements OnInit {
  @Input() startDateIsCorrect ?: boolean;
  @Input() endDateIsCorrect ?: boolean;
  @Input() selectedStartDate ?: string;
  @Input() selectedEndDate ?: string;
  @Input() isWorking ?: boolean;
  @Output() startDateChange = new EventEmitter<string>();
  @Output() endDateChange = new EventEmitter<string>();
  @Output() isWorkingChange = new EventEmitter <boolean>();

 
  //Fecha
  defaultDate= new Date();
  today ?: string;  
  minDate ?: string;
  

  auxEndDate?:Date;

  constructor() { 
    this.today = new Date().toISOString();

  }

  ngOnInit() {
    if(this.selectedStartDate){
      this.minDate = this.convertToValidDate(this.selectedStartDate);
    }
    if(this.selectedEndDate){
      this.auxEndDate = new Date(this.convertToValidDate(this.selectedEndDate));
    }
  }

  startDateConfirmed(event:any){
    let value:any = event.detail.value;
    
    if (value === undefined) {
      value = this.defaultDate;
    }else{
      value= new Date(event.detail.value);
    }

    //LIMITA LA FECHA FINAL
    if(this.auxEndDate && this.selectedEndDate && value > this.auxEndDate ){
      this.selectedEndDate = undefined;
      this.endDateChange.emit(undefined);
    }

    this.minDate = value.toISOString();
    value= this.formatDate(value);//transforma la fecha a string "YYYY-MM"

    this.selectedStartDate = value;
    this.startDateChange.emit(value);

  }

  endDateConfirmed(event:any){
    let value:any = event.detail.value;
    
    if (value === undefined) {
      value = this.defaultDate;
    }else{
      value= new Date(event.detail.value);
    }
    
    this.auxEndDate = value;
    
    value= this.formatDate(value);//transforma la fecha a string "YYYY-MM"

    this.selectedEndDate = value;
    this.endDateChange.emit(value);

  }

  isWorkingChanged(event:any){
    this.isWorking = event.detail.checked;
    this.isWorkingChange.emit(event.detail.checked);

  }

  formatDate(date:Date | undefined){
    if(!date){
      return "";
    }

    const year = date.getFullYear();
    const month = date.toLocaleString('es-ES', { month: 'long' }); //transforma el mes a la palabra en español

    return year + " " + month;
  }

  convertToValidDate(dateString: string): string {
    // Diccionario de meses en español a números
    const monthMap: { [key: string]: string } = {
      enero: '01',
      febrero: '02',
      marzo: '03',
      abril: '04',
      mayo: '05',
      junio: '06',
      julio: '07',
      agosto: '08',
      septiembre: '09',
      octubre: '10',
      noviembre: '11',
      diciembre: '12',
    };

    const [year, month] = dateString.split(' '); 

    const monthAux = monthMap[month.toLowerCase()];

    return `${year}-${monthAux}-01`;
  }
}
