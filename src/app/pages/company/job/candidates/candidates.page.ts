import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ServiceBDService } from 'src/app/services/service-bd.service';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.page.html',
  styleUrls: ['./candidates.page.scss'],
})
export class CandidatesPage implements OnInit {

  id_job: number=0;
  id_post:number = 0;
  applicantsArray : any=[{

  }];

  userModel : any = {
    name : '',
    lastname: '',
    email: '',
    password: '',
    about:'',
    description:'',
    addres:'',
    phone:'',
  }

  expArray:any = {
    id_exp :"",
    startDate_exp :"",
    endDate_exp :"", 
    otherPosition :"",
    otherCompany :"", 
    comp :0 ,
    position :0 ,
    id_user :0 ,
  }

  educArray:any ={
    id_educ :"",
    startDate_educ :"",
    endDate_educ :"", 
    otherCarrer :"",
    otherInstitution :"", 
    inst :0 ,
    carrer :0 ,
    id_user :0 ,
  }
  //Validadores
  isModalOpen :boolean = false;
  btnPressed:string = "pendientes"
  
  constructor(private bd:ServiceBDService, private activedroute:ActivatedRoute,private router:Router) { 
    this.activedroute.queryParams.subscribe(param =>{
      //verificar si viene la variable de contexto
      if(this.router.getCurrentNavigation()?.extras.state){
        if(this.router.getCurrentNavigation()?.extras?.state?.["id_job"]){
          this.id_job = this.router.getCurrentNavigation()?.extras?.state?.["id_job"];
        }
      }
    });
  }

  ngOnInit() {
    this.bd.dbReady().subscribe(data=>{
      if(data){

        this.bd.fetchPostulationByIdCompany().subscribe(res=>{
          this.applicantsArray = res;
        })
        this.bd.fetchUserByIdAux().subscribe(res=>{
          this.userModel = res;
        })
        this.bd.fetchExpById().subscribe(res=>{
          this.expArray = res;
        })
        this.bd.fetchEducById().subscribe(res=>{
          this.educArray = res;
        })
      }
    });
  }


  //VALIDADORES
  async setOpenModal(value:boolean,id_user:number,id_post:number){
    if(id_user !== 0){
      await this.bd.selectUserByIdAux(id_user)
      await this.bd.selectExpById(id_user)
      await this.bd.selectEducById(id_user)
    }
    this.id_post = id_post;
    this.isModalOpen = value;
  }
  
  //OTRAS
  decline(){
    this.bd.updatePostulationDecline(this.id_post).then(res =>{
      if(res){
        this.bd.selectPostulationsByIdCompany(this.id_job)
        this.isModalOpen = false;
      }
    })
  }
 
  async accept(){
    await this.bd.updatePostulationAccept(this.id_post).then(res =>{
      if(res){
        this.bd.selectPostulationsByIdCompany(this.id_job)
        this.isModalOpen = false;
      }
    })   
  }

  pressButton(btn: string) {
    this.btnPressed = btn;
    if(btn === "pendientes"){
      this.bd.selectPostulationsByIdCompany(this.id_job);
    }
    if(btn === "aceptados"){
      this.bd.selectAcceptedPostulationsByIdCompany(this.id_job);
    }
  }
}
