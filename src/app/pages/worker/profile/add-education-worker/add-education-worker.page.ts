import { Component, OnInit } from '@angular/core';
import { dateValidaton, textValidaton } from 'src/app/utils/validation-functions';


@Component({
  selector: 'app-add-education-worker',
  templateUrl: './add-education-worker.page.html',
  styleUrls: ['./add-education-worker.page.scss'],
})
export class AddEducationWorkerPage implements OnInit {

  eduInfo: any= {
    institute: "",
    carrer: "",
    startDate: undefined,
    endDate: undefined
  }

  //Valdiadores
  instituteIsCorrect:boolean = true;
  carrerIsCorrect:boolean = true;
  startDateIsCorrect:boolean = true;
  endDateIsCorrect:boolean = true;

  constructor() { }

  ngOnInit() {
  }
  
  startDateChanged(date:Date){
    this.eduInfo.startDate = date;
  }

  endDateChanged(date:Date){
    this.eduInfo.endDate = date;
  }
  validateData(){
    this.instituteIsCorrect = textValidaton(this.eduInfo.companyName);
    this.carrerIsCorrect = textValidaton(this.eduInfo.ocupation);
    this.startDateIsCorrect = dateValidaton(this.eduInfo.startDate);
    this.endDateIsCorrect = dateValidaton(this.eduInfo.endDate);
  }
  
}
