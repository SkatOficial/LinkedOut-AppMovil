import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController } from '@ionic/angular';
import { ServiceBDService } from 'src/app/services/service-bd.service';
import { textValidaton } from 'src/app/utils/validation-functions';

@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.page.html',
  styleUrls: ['./edit-job.page.scss'],
})
export class EditJobPage implements OnInit {
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

  constructor(private alertController: AlertController, private bd:ServiceBDService,private storage: NativeStorage,private activedroute:ActivatedRoute, private router:Router) {
    //subscribirse al observable/promesa
    this.activedroute.queryParams.subscribe(param =>{
      //verificar si viene la variable de contexto
      if(this.router.getCurrentNavigation()?.extras.state){
        this.job = this.router.getCurrentNavigation()?.extras?.state?.["job"];
      }
    });
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
      header: '¿Estás seguro de modificar el puesto de trabajo?',
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
            this.bd.updateJob(this.job.title_job,this.job.description_job,this.job.id_company);
            this.toHistory()
          }
        }
      ]
    });

    await alert.present();
  }

  setOpenErrorToast(value:boolean,msg:string){
    this.messageErrorToast = msg
    this.isErrorToastOpen = value;
  }

  //RUTAS
  toHistory(){
    const navigationExtras: NavigationExtras = {
      state: {
        status: "editJob",
        msg:"Trabajo modificado"
      }
    };
    this.router.navigate(['tabs-company/history'],navigationExtras); 
  }

}
