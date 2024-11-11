import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController } from '@ionic/angular';
import { HapticsService } from 'src/app/services/haptics.service';
import { ServiceBDService } from 'src/app/services/service-bd.service';
import { textValidaton } from 'src/app/utils/validation-functions';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.page.html',
  styleUrls: ['./create-job.page.scss'],
})
export class CreateJobPage implements OnInit {
  id_user : number = 0;

  job:any = {
    title_job: "",
    description_job: "",
    id_company : null,
  }

  //Validadores
  titleIsCorrect : boolean = true;
  descriptionIsCorrect : boolean = true;
  isErrorToastOpen: boolean = false;
  isSuccessToastOpen:boolean = false;

  //Mensajes de error
  messageErrorToast?:string;

  constructor(private alertController: AlertController, private bd:ServiceBDService,private storage: NativeStorage, private haptics:HapticsService) {
    this.storage.getItem("userId").then(data=>{
      this.job.id_company = data;
    })
  }

  ngOnInit() {

  }


  async validateData(){
    try{
      this.titleIsCorrect = textValidaton(this.job.title_job);
      this.descriptionIsCorrect = textValidaton(this.job.description_job);
      
      if(this.titleIsCorrect && this.descriptionIsCorrect){
        this.confirmApplication();
      }else{
        this.setOpenErrorToast(true,"Error al ingresar los datos");
      }
    }catch(error){
      this.setOpenErrorToast(true,"Error inesperado");
    }
  }

  //ALERTAS
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
          handler: async () => {
            await this.bd.insertJob(this.job.title_job,this.job.description_job,this.job.id_company);
            await this.bd.selectJobsById(this.job.id_company); 
            this.job.title_job = "";
            this.job.description_job = "";
            this.setOpenSuccessToast(true);
          }
        }
      ]
    });

    await alert.present();
  }

  async setOpenErrorToast(value:boolean,msg:string){
    if(value){
      await this.haptics.impactMedium()
    }
    this.messageErrorToast = msg
    this.isErrorToastOpen = value;
  }

  setOpenSuccessToast(value:boolean){
    this.isSuccessToastOpen = value;
  }

}
