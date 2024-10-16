import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ServiceBDService } from 'src/app/services/service-bd.service';

@Component({
  selector: 'app-profile-worker',
  templateUrl: './profile-worker.page.html',
  styleUrls: ['./profile-worker.page.scss'],
})
export class ProfileWorkerPage implements OnInit {
  id_user = 0;

  user: any = {
    name : '',
    lastname: '',
    email: '',
    password: '',
    about:'',
    description:'',
    addres:'',
    phone:'',
  }

  expArray:any ={
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
  
  
  constructor(private router: Router, private bd:ServiceBDService,private storage: NativeStorage) {
    //Obtiene el id de usuario del storage
    this.storage.getItem("userId").then(data=>{
      this.id_user = data;

      //actualizo los observables
      this.bd.selectUserById(this.id_user);
   });
  };

  ngOnInit() {
    this.bd.dbReady().subscribe(data=>{
      if(data){
        //me subcribo al observable del select de los UserById
        this.bd.fetchUserById().subscribe(res=>{
          this.user = res;
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

  toOptionsProfile(){
    this.router.navigate(['options-profile-worker'])
  }

  toEditProfile(){
    const navigationExtras: NavigationExtras = {
      state: {
        user: this.user
      }
    };
    this.router.navigate(['edit-profile-worker'],navigationExtras)
  }
}
