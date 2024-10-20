import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { HapticsService } from 'src/app/services/haptics.service';
import { ServiceBDService } from 'src/app/services/service-bd.service';
import { dateValidaton, textValidaton } from 'src/app/utils/validation-functions';


@Component({
  selector: 'app-add-education-worker',
  templateUrl: './add-education-worker.page.html',
  styleUrls: ['./add-education-worker.page.scss'],
})
export class AddEducationWorkerPage implements OnInit {

  id_user = 0; //id_user del local_storage
  
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
  isOtherInstitution?:boolean;
  isOtherCareer?:boolean;
  isErrorToastOpen:boolean = false;

  constructor(private bd: ServiceBDService,private storage: NativeStorage,private router: Router, private haptics: HapticsService) { 
    //Obtiene el id de usuario del storage
    this.storage.getItem("userId").then(data=>{
      this.id_user = data;
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
    this.educInfo.id_user = this.id_user;//agrega el id sacado del local storage al objeto
    
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
        this.bd.insertEduc(this.educInfo.startDate_educ, this.educInfo.endDate_educ, this.educInfo.otherCareer, this.educInfo.otherInstitution, this.educInfo.id_inst, this.educInfo.id_career,this.educInfo.id_user)

        this.toEditProfile();
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

  async setOpenErrorToast(value:boolean){
    if(value){
      await this.haptics.impactMedium()
    }
    this.isErrorToastOpen = value;
  }
  
  //RUTAS
  toEditProfile(){
    this.bd.selectEducById(this.id_user);
    const navigationExtras: NavigationExtras = {
      state:{
        from:"AddEducation",
        message:"Registro de educacion existosa"
      }
    };
    this.router.navigate(['tabs-worker/profile'], navigationExtras);
  }
}
