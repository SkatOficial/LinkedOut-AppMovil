import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController } from '@ionic/angular';
import { ServiceBDService } from 'src/app/services/service-bd.service';

@Component({
  selector: 'app-option-job',
  templateUrl: './option-job.page.html',
  styleUrls: ['./option-job.page.scss'],
})
export class OptionJobPage implements OnInit {

  id_user:number = 0;
  job:any;

  constructor(private activedroute:ActivatedRoute, private router:Router,private alertController: AlertController, private bd:ServiceBDService,private storage: NativeStorage) { 
    //subscribirse al observable/promesa
    this.activedroute.queryParams.subscribe(param =>{
      //verificar si viene la variable de contexto
      if(this.router.getCurrentNavigation()?.extras.state){
        this.job = this.router.getCurrentNavigation()?.extras?.state?.["job"];
      }
    });
     //Obtiene el id de usuario del storage
     this.storage.getItem("userId").then(data=>{
      this.id_user = data;

      //actualizo los observables
      this.bd.selectUserById(this.id_user);
   });
  }

  ngOnInit() {
  }

  toEditJob(){
    const navigationExtras: NavigationExtras = {
      state: {
        job: this.job
      }
    };
    this.router.navigate(['edit-job'], navigationExtras);
  }

  toHistory(){
    const navigationExtras: NavigationExtras = {
      state: {
        status: "finishJob",
        msg:"Puesto Finalziado"
      }
    };
    this.router.navigate(['tabs-company/history'],navigationExtras); 
  }
  //ALERTAS
  async confirmApplication(){
    const alert = await this.alertController.create({
      header: '¿Estás seguro de finalizar el puesto de trabajo?',
      subHeader: 'Esta acción no se puede deshacer, las postulaciones no evaluadas se rechazaran automaticamente, el puesto de trabajo ya no sera visible para el resto de personas',
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
            this.bd.updateFinishJob(this.job.id_job).then(res => {
              this.bd.selectJobsById(this.id_user);  
              this.toHistory()
            })
          }
        }
      ]
    });

    await alert.present();
  }
}
