import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { ServiceBDService } from 'src/app/services/service-bd.service';
import { dateValidaton, textValidaton } from 'src/app/utils/validation-functions';
import { AlertController } from '@ionic/angular';
import { Company } from 'src/app/models/company';
import { Position } from 'src/app/models/position';


@Component({
  selector: 'app-edit-experience-worker',
  templateUrl: './edit-experience-worker.page.html',
  styleUrls: ['./edit-experience-worker.page.scss'],
})
export class EditExperienceWorkerPage implements OnInit {

  expInfo: any = {
    id_exp :0,
    startDate_exp :"",
    endDate_exp :"",
    otherPosition :null,
    otherCompany :null,
    id_comp : null,
    id_position :null,
    id_user :0,
  }

  companyArray: Company[] = [{
      id_comp : 0,
      name_comp:"",
  }]

  positionArray: Position[] = [{
      id_position : 0,
      name_position:"",
  }]

  //Valdiadores
  companyNameIsCorrect:boolean = true;
  positionIsCorrect:boolean = true;
  startDateIsCorrect:boolean = true;
  endDateIsCorrect:boolean = true;
  isWorkingNow:boolean = false;
  isOtherCompany:boolean = false; 
  isOtherPosition:boolean = false;
  isErrorToastOpen:boolean = false;


  constructor(private alertController:AlertController,private router: Router, private activedroute:
    ActivatedRoute,private bd:ServiceBDService) {
    //subscribirse al observable/promesa
    this.activedroute.queryParams.subscribe(param =>{
      //verificar si viene la variable de contexto
      if(this.router.getCurrentNavigation()?.extras.state){
        if(this.router.getCurrentNavigation()?.extras?.state?.['exp']){
          this.expInfo = JSON.parse(JSON.stringify(this.router.getCurrentNavigation()?.extras?.state?.['exp']));
        }
      }
    });
    
  }

  ngOnInit() {
    //consulto por el estado de la base de datos
    this.bd.dbReady().subscribe(data=>{
      this.bd.selectCompanys();
      this.bd.selectPositions();

      if(data){
        this.bd.fetchCompanys().subscribe(res=>{
          this.companyArray = res;
        })
        
        this.bd.fetchPositions().subscribe(res=>{
          this.positionArray = res;
        })
      }
    })

    //activa checkboxs si es nesesario
    if(this.expInfo.otherPosition){
      this.isOtherPosition=true
    }

    if(this.expInfo.otherCompany){
      this.isOtherCompany=true
    }

  }
  
  //VARIABLES DEL COMPONENTE
  startDateChanged(date:string){
    this.expInfo.startDate_exp = date;
  }

  endDateChanged(date:string){
    this.expInfo.endDate_exp = date;
  }

  isWorkingChanged(is:boolean){
    this.isWorkingNow = is;
  }
  
  changeOtherCompany(is:boolean){
    this.isOtherCompany = is;
  }

  changeOtherOcupation(is:boolean){
    this.isOtherPosition = is;
  }

  //VALIDACIONES
  validateData(){
    if(this.isOtherCompany){
      this.expInfo.id_comp = null;
    }else{
      this.expInfo.otherCompany = null;
    }

    if(this.isOtherPosition){
      this.expInfo.id_position = null;
    }else{
      this.expInfo.otherPosition = null;
    }

    if(this.isWorkingNow){
      this.expInfo.endDate_exp = null;
    }

    this.companyNameIsCorrect = textValidaton(this.expInfo.otherCompany) || this.expInfo.id_comp;
    this.positionIsCorrect = textValidaton(this.expInfo.otherPosition) || this.expInfo.id_position;
    this.startDateIsCorrect = dateValidaton(this.expInfo.startDate_exp);
    this.endDateIsCorrect = dateValidaton(this.expInfo.endDate_exp) || this.isWorkingNow;

    if(this.companyNameIsCorrect && this.positionIsCorrect && this.startDateIsCorrect && this.endDateIsCorrect){
        this.bd.UpdateExp(this.expInfo.id_exp,this.expInfo.startDate_exp, this.expInfo.endDate_exp, this.expInfo.otherPosition, this.expInfo.otherCompany, this.expInfo.id_comp, this.expInfo.id_position)
        this.toEditProfile("Experiencia Actualizada");
    }else{
      this.setOpenErrorToast(true);
    }
  }

  //OTROS
  compareWithCompany(comp1: any, comp2: any): boolean {
    return comp1 && comp2 ? comp1.id_comp === comp2.id_comp : comp1 === comp2;
  }

  compareWithPosition(comp1: any, comp2: any): boolean {
    return comp1 && comp2 ? comp1.id_position === comp2.id_position : comp1 === comp2;
  }

  handleChangeCompany(ev:any) {
    this.expInfo.id_comp = ev.target.value.id_comp;
  }

  handleChangePosition(ev:any) {
    this.expInfo.id_position = ev.target.value.id_position;
  }

  setOpenErrorToast(value:boolean){
    this.isErrorToastOpen = value;
  }

  //RUTAS
  toEditProfile(msg:string){
    this.bd.selectExpById(this.expInfo.id_user);
    const navigationExtras: NavigationExtras = {
      state:{
        from:"EditExperience",
        message:msg
      }
    };
    this.router.navigate(['edit-profile-worker'], navigationExtras);
  }


  //OTROS
  deletExp(){
    this.bd.deleteExp(this.expInfo.id_exp);
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
           this.deletExp();
           this.toEditProfile("Se ha elimiado la experiencia")
          }
        }
      ]
    });

    await alert.present();
  }

}
