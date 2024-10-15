import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ServiceBDService } from 'src/app/services/service-bd.service';
import { dateValidaton, textValidaton } from 'src/app/utils/validation-functions';

@Component({
  selector: 'app-add-experience-worker',
  templateUrl: './add-experience-worker.page.html',
  styleUrls: ['./add-experience-worker.page.scss'],
})
export class AddExperienceWorkerPage implements OnInit {

  id_user = 0; //id_user del local_storage
  
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

  companyArray: any = [{
      id_comp : 0,
      name_comp:"",
  }]

  positionArray: any = [{
      id_position : 0,
      name_position:"",
  }]

  //Valdiadores
  companyNameIsCorrect:boolean = true;
  positionIsCorrect:boolean = true;
  startDateIsCorrect:boolean = true;
  endDateIsCorrect:boolean = true;
  isWorkingNow:boolean = false;
  isOtherCompany?:boolean;
  isOtherPosition?:boolean;
  isErrorToastOpen:boolean = false;

  

  aux:string = "";


  constructor(private bd: ServiceBDService,private storage: NativeStorage,private router: Router) {
    //Obtiene el id de usuario del storage
    this.storage.getItem("userId").then(data=>{
      this.id_user = data;
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
    this.expInfo.id_user = this.id_user;//agrega el id sacado del local storage al objeto
    
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
        this.bd.insertExp(this.expInfo.startDate_exp, this.expInfo.endDate_exp, this.expInfo.otherPosition, this.expInfo.otherCompany, this.expInfo.id_comp, this.expInfo.id_position,this.expInfo.id_user)
        this.toEditProfile();
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
  toEditProfile(){
    const navigationExtras: NavigationExtras = {
      state:{
        from:"AddExperience",
        message:"Registro existoso"
      }
    };
    this.router.navigate(['edit-profile-worker'], navigationExtras);
  }
}