import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ServiceBDService } from 'src/app/services/service-bd.service';

@Component({
  selector: 'app-history-company',
  templateUrl: './history-company.page.html',
  styleUrls: ['./history-company.page.scss'],
})
export class HistoryCompanyPage implements OnInit {

  id_user = 0;

  jobArray: any ={
    id_job : 0,
    title_job : "",
    description_job : "",
    status_job : "",
    id_company : 0,
  }

  user: any = {
    id_user : 0,
    password_user : "",
    name_user : "",
    lastname_user : "",
    photo_user : null,
    email_user : "",
    phone_user : "",
    id_rol : 1 
  }

  //VALIDADORES
  isSuccessToastOpen:boolean = false;
  searchValue:string = "";

  //MENSAJES
  successMsg?:string;

  constructor(private router:Router, private bd:ServiceBDService,private storage: NativeStorage, private activedroute:ActivatedRoute) { 
    
  }

  ngOnInit() {
    this.bd.dbReady().subscribe(data=>{
      if(data){
        //me subcribo al observable del select de los UserById
        this.bd.fetchUserById().subscribe(res=>{
          this.user = res;
        })
        
        //me subcribo al observable del select de los JobsById
        this.bd.fetchJobsById().subscribe(res=>{
          this.jobArray = res;
        })
      }
    });

    //Obtiene el id de usuario del storage
    this.storage.getItem("userId").then(data=>{
      this.id_user = data;

      //subscribirse al observable/promesa
      this.activedroute.queryParams.subscribe(param =>{
        //verificar si viene la variable de contexto
        if(this.router.getCurrentNavigation()?.extras.state){
          if(this.router.getCurrentNavigation()?.extras?.state?.["status"]){
            let status = this.router.getCurrentNavigation()?.extras?.state?.["status"];
            let msg = this.router.getCurrentNavigation()?.extras?.state?.["msg"];

            if(status == "editJob"){
              this.setOpenSuccessToast(true,msg)
            }if(status == "finishJob"){
              this.setOpenSuccessToast(true,msg)
            }
          }
        }
      });
   });
  }
  
  //RUTAS
  toJob(id_job:number) {
    this.bd.selectPostulationsByIdCompany(id_job);
    const navigationExtras: NavigationExtras = {
      state: {
        id_job: id_job
      }
    };
    this.router.navigate(['/candidates'],navigationExtras);
  }
  
  toOptions(job:any){
    const navigationExtras: NavigationExtras = {
      state: {
        job: job
      }
    };
    this.router.navigate(['/option-job'],navigationExtras)
  }

  toCreateJob(){
    this.router.navigate(['tabs-company/create-job']);
  }
  //OTROS
  setOpenSuccessToast(value:boolean, msg:string){
    this.successMsg = msg;
    this.isSuccessToastOpen = value;
  }

  searchFilter(event:any){
    try{
      this.searchValue = event.detail.value.toLowerCase();
      this.bd.selectFilterJobsById(this.id_user,event.detail.value.toLowerCase());
    }catch(e){

    }
  }
}
