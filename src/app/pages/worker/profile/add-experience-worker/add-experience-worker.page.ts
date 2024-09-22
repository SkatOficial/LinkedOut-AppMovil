import { Component,OnInit } from '@angular/core';
import { dateValidaton, textValidaton } from 'src/app/utils/validation-functions';

@Component({
  selector: 'app-add-experience-worker',
  templateUrl: './add-experience-worker.page.html',
  styleUrls: ['./add-experience-worker.page.scss'],
})
export class AddExperienceWorkerPage implements OnInit {

  expInfo: any= {
    companyName: "",
    ocupation: "",
    startDate: undefined,
    endDate: undefined
  }

  //Valdiadores
  companyNameIsCorrect:boolean = true;
  ocupationIsCorrect:boolean = true;
  startDateIsCorrect:boolean = true;
  endDateIsCorrect:boolean = true;

  constructor() { }

  ngOnInit() {
  }
  
  startDateChanged(date:Date){
    this.expInfo.startDate = date;
  }

  endDateChanged(date:Date){
    this.expInfo.endDate = date;
  }
  validateData(){
    this.companyNameIsCorrect = textValidaton(this.expInfo.companyName);
    this.ocupationIsCorrect = textValidaton(this.expInfo.ocupation);
    this.startDateIsCorrect = dateValidaton(this.expInfo.startDate);
    this.endDateIsCorrect = dateValidaton(this.expInfo.endDate);
  }
}