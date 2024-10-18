import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ServiceBDService } from 'src/app/services/service-bd.service';
import { dateValidaton, textValidaton } from 'src/app/utils/validation-functions';

@Component({
  selector: 'app-edit-education-worker',
  templateUrl: './edit-education-worker.page.html',
  styleUrls: ['./edit-education-worker.page.scss'],
})
export class EditEducationWorkerPage implements OnInit {

  educInfo: any = {
    id_educ :0,
    startDate_educ :"",
    endDate_educ :"",
    otherCareer :null,
    otherInstitution :null,
    id_inst : null,
    id_career :null,
    id_user :0,
  }

  institutionsArray: any = [{
      id_inst : 0,
      name_inst:"",
  }]

  careersArray: any = [{
      id_career : 0,
      name_career:"",
  }]

  //Valdiadores
  institutionNameIsCorrect:boolean = true;
  careerIsCorrect:boolean = true;
  startDateIsCorrect:boolean = true;
  endDateIsCorrect:boolean = true;
  isWorkingNow:boolean = false;
  isOtherInstitution:boolean = false;
  isOtherCareer:boolean = false;
  isErrorToastOpen:boolean = false;

  constructor(private bd: ServiceBDService,private router: Router,private alertController: AlertController,private activedroute: ActivatedRoute) { 
    //subscribirse al observable/promesa
    this.activedroute.queryParams.subscribe(param =>{
      //verificar si viene la variable de contexto
      if(this.router.getCurrentNavigation()?.extras.state){
        if(this.router.getCurrentNavigation()?.extras?.state?.['educ']){
          this.educInfo = JSON.parse(JSON.stringify(this.router.getCurrentNavigation()?.extras?.state?.['educ']));
        }
      }
    });
  }

  ngOnInit() {
    //consulto por el estado de la base de datos
    this.bd.dbReady().subscribe(data=>{
      this.bd.selectInstitutions();
      this.bd.selectCareers();

      if(data){
        this.bd.fetchInstitutions().subscribe(res=>{
          this.institutionsArray = res;
        })
        
        this.bd.fetchCareers().subscribe(res=>{
          this.careersArray = res;
        })
      }
    })

    //activa checkboxs si es nesesario
    if(this.educInfo.otherCareer){
      this.isOtherCareer=true
    }

    if(this.educInfo.otherInstitution){
      this.isOtherInstitution=true
    }
  }
  
  //VARIABLES DEL COMPONENTE
  startDateChanged(date:string){
    this.educInfo.startDate_educ = date;
  }

  endDateChanged(date:string){
    this.educInfo.endDate_educ = date;
  }

  isWorkingChanged(is:boolean){
    this.isWorkingNow = is;
  }
  
  changeOtherInstitution(is:boolean){
    this.isOtherInstitution = is;
  }

  changeOtherCareer(is:boolean){
    this.isOtherCareer = is;
  }

  //VALIDACIONES
  validateData(){
    this.educInfo.id_user = this.educInfo.id_user;//agrega el id sacado del local storage al objeto
    
    if(this.isOtherInstitution){
      this.educInfo.id_inst = null;
    }else{
      this.educInfo.otherInstitution = null;
    }

    if(this.isOtherCareer){
      this.educInfo.id_career = null;
    }else{
      this.educInfo.otherCareer = null;
    }

    if(this.isWorkingNow){
      this.educInfo.endDate_educ = null;
    }

    this.institutionNameIsCorrect = textValidaton(this.educInfo.otherInstitution) || this.educInfo.id_inst;
    this.careerIsCorrect = textValidaton(this.educInfo.otherCareer) || this.educInfo.id_career;
    this.startDateIsCorrect = dateValidaton(this.educInfo.startDate_educ);
    this.endDateIsCorrect = dateValidaton(this.educInfo.endDate_educ) || this.isWorkingNow;

    if(this.institutionNameIsCorrect && this.careerIsCorrect && this.startDateIsCorrect && this.endDateIsCorrect){
        this.bd.UpdateEduc(this.educInfo.id_educ,this.educInfo.startDate_educ, this.educInfo.endDate_educ, this.educInfo.otherCareer, this.educInfo.otherInstitution, this.educInfo.id_inst, this.educInfo.id_career)

        this.toEditProfile("Registro de educacion existosa");
    }else{
      this.setOpenErrorToast(true);
    }
  }

  //OTROS
  compareWithInstitution(comp1: any, comp2: any): boolean {
    return comp1 && comp2 ? comp1.id_inst === comp2.id_inst : comp1 === comp2;
  }

  compareWithCareer(comp1: any, comp2: any): boolean {
    return comp1 && comp2 ? comp1.id_career === comp2.id_career : comp1 === comp2;
  }

  handleChangeInstitution(ev:any) {
    this.educInfo.id_inst = ev.target.value.id_inst;
  }

  handleChangeCareer(ev:any) {
    this.educInfo.id_career = ev.target.value.id_career;
  }

  setOpenErrorToast(value:boolean){
    this.isErrorToastOpen = value;
  }
  
  //RUTAS
  toEditProfile(msg:string){
    this.bd.selectEducById(this.educInfo.id_user);
    const navigationExtras: NavigationExtras = {
      state:{
        from:"AddEducation",
        message:msg
      }
    };
    this.router.navigate(['edit-profile-worker'], navigationExtras);
  }
  
  
  //OTROS
  deletEduc(){
    this.bd.deleteEduc(this.educInfo.id_educ);
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
           this.deletEduc();
           this.toEditProfile("Se ha elimiado la educacion");
          }
        }
      ]
    });
  
    await alert.present();
  }
}
