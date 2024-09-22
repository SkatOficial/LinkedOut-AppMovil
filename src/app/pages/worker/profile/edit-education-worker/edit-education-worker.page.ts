import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { dateValidaton, textValidaton } from 'src/app/utils/validation-functions';

@Component({
  selector: 'app-edit-education-worker',
  templateUrl: './edit-education-worker.page.html',
  styleUrls: ['./edit-education-worker.page.scss'],
})
export class EditEducationWorkerPage implements OnInit {

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

  constructor(private alertController: AlertController) { }

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
  
  async confirmDeletion() {
    const alert = await this.alertController.create({
      header: '¿Estás seguro de eliminar la educacion?',
      message: 'Esta acción no se podrá deshacer',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            
          }
        },
        {
          text: 'Confirmar',
          cssClass: 'confirm-button',
          handler: () => {
           
          }
        }
      ]
    });
  
    await alert.present();
  }
}
