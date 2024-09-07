import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.page.html',
  styleUrls: ['./create-job.page.scss'],
})
export class CreateJobPage implements OnInit {
  job:any = {
    title: "",
    about: ""
  }
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

  validateData(formData: NgForm){
    if (formData.valid){
      console.log("form Valido");
      this.confirmApplication();
    }else{
      console.log("formInvalido");
    }
  }

}
