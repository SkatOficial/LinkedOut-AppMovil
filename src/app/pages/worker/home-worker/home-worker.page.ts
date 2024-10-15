import { Component,OnInit} from '@angular/core';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ServiceBDService } from 'src/app/services/service-bd.service';

@Component({
  selector: 'app-home-worker',
  templateUrl: './home-worker.page.html',
  styleUrls: ['./home-worker.page.scss'],
})
export class HomeWorkerPage implements OnInit {
  id_user = 0;

  jobArray: any ={
    id_job : 0,
    title_job : "",
    description_job : "",
    status_job : "",
    id_company : null,
    photo_company : null,
    name_company : "",
    address_company : "",
  }

  modalJob={
    id_job : 0,
    title_job : "",
    description_job : "",
    status_job : "",
    id_company : null,
    photo_company : null,
    name_company : "",
    address_company : "",
  }

  //VALIDADORES
  isModalOpen = false;
  isSuccessToastOpen:boolean = false;
  isErrorToastOpen:boolean = false;
  emailErrorMessage = "Ya postulaste a este trabajo";

  constructor( private bd:ServiceBDService,private storage: NativeStorage) { 
    //Obtiene el id de usuario del storage
    this.storage.getItem("userId").then(data=>{
      this.id_user = data;
   });

    this.bd.selectJobs();  
  }

  ngOnInit() {
    this.bd.dbReady().subscribe(data=>{
      if(data){    
        //me subcribo al observable del select de los JobsById
        this.bd.fetchJobs().subscribe(res=>{
          this.jobArray = res;
        })
      }
    });
  }

  setOpenModal(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  updateModale(job:any){
    this.modalJob = job;
    this.setOpenModal(true);
  }

  setOpenSuccessToast(value:boolean){
    this.isSuccessToastOpen = value;
  }
  setOpenErrorToast(value:boolean){
    this.isErrorToastOpen = value;
  }

  async createPostulation(){
    try {
      let res = await this.bd.insertPostulation(this.id_user, this.modalJob.id_job);
      
      if (res){
        this.setOpenSuccessToast(true);
      } else if(res = false) {
        this.setOpenErrorToast(true);
      }else{
        this.emailErrorMessage = "Error inesperado"
        this.setOpenErrorToast(true)
      }
    } catch (error) {

    }
  }
}
