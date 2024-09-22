import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { dateValidaton, textValidaton } from 'src/app/utils/validation-functions';

@Component({
  selector: 'app-edit-experience-worker',
  templateUrl: './edit-experience-worker.page.html',
  styleUrls: ['./edit-experience-worker.page.scss'],
})
export class EditExperienceWorkerPage implements OnInit {

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

  constructor(private alertController:AlertController) { }

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
