import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { textValidaton } from 'src/app/utils/validation-functions';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.page.html',
  styleUrls: ['./create-job.page.scss'],
})
export class CreateJobPage implements OnInit {
  job:any = {
    title: "",
    description: ""
  }

  //Validadores
  titleIsCorrect : boolean = true;
  constructor(private alertController: AlertController) { }

  ngOnInit() {
  }

  async confirmApplication(){
    const alert = await this.alertController.create({
      header: '¿Estás seguro de publicar el puesto de trabajo?',
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

  validateData(){
    this.titleIsCorrect = textValidaton(this.job.title);
  }

}
