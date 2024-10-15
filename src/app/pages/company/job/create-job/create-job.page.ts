import { Component, OnInit } from '@angular/core';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController } from '@ionic/angular';
import { ServiceBDService } from 'src/app/services/service-bd.service';
import { textValidaton } from 'src/app/utils/validation-functions';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.page.html',
  styleUrls: ['./create-job.page.scss'],
})
export class CreateJobPage implements OnInit {
  job:any = {
    title_job: "",
    description_job: "",
    id_company : null,
  }

  //Validadores
  titleIsCorrect : boolean = true;
  descriptionIsCorrect : boolean = true;

  constructor(private alertController: AlertController, private bd:ServiceBDService,private storage: NativeStorage) {
    this.storage.getItem("userId").then(data=>{
      this.job.id_company = data;
    })
  }

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

  async validateData(){
    try{
      this.titleIsCorrect = textValidaton(this.job.title_job);
      this.descriptionIsCorrect = textValidaton(this.job.description_job);
      
      if(this.titleIsCorrect && this.descriptionIsCorrect){
        this.bd.insertJob(this.job.title_job,this.job.description_job,this.job.id_company);
      }
    }catch(error){

    }
  }

}
