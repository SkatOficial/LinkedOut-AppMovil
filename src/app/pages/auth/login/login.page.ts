import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { HapticsService } from 'src/app/services/haptics.service';
import { ServiceBDService } from 'src/app/services/service-bd.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  //VALIDADORES
  accountNotFound: boolean = false;
  isErrorToastOpen: boolean = false;
  isSuccessToastOpen: boolean = false;

  userInput:any = {
    email: "",
    password: ""
  }

  status:string ="";

  constructor(private db: ServiceBDService ,private router: Router,private haptics:HapticsService,private activedroute:ActivatedRoute) {
    
  }

  ngOnInit(){
    this.activedroute.queryParams.subscribe(param =>{
      //resetea los observables
      this.db.resetObservables();
      //pregunta los datos enviados desde otras pages
      if (this.router.getCurrentNavigation()?.extras.state) {
        if(this.router.getCurrentNavigation()?.extras.state?.['status']){
          this.status = this.router.getCurrentNavigation()?.extras.state?.['status'];
          this.setOpenSuccessToast(true);
        }
      }
    });
  }

  //RUTAS
  toChangePassword(){
    this.router.navigate(['/lost-password']);
  }

  toRegister(){
    this.router.navigate(['/register-selection']);
  }

  toHomeWorker(id_user:number){
    const navigationextras: NavigationExtras = {
      state:{
        id_user:id_user
      }
    }
    this.router.navigate(['/tabs-worker'],navigationextras);
  }

  toHomeCompany(id_user:number){
    const navigationextras: NavigationExtras = {
      state:{
        id_user:id_user
      }
    } 
    this.router.navigate(['/tabs-company'],navigationextras);
  }

  //VALIDADORES
  async validateLogin(){
    
    let user = await this.db.selectLogin(this.userInput.email.toLowerCase(),this.userInput.password);

    if(user){
      if(user.id_rol == 1){
        this.toHomeCompany(user.id_user)
      }else if(user.id_rol == 2){
        this.toHomeWorker(user.id_user);
      }
    }else{
      this.accountNotFound = true;
      this.setOpenErrorToast(true);
    }
    
  }

  async setOpenErrorToast(value:boolean){
    if(value){
      await this.haptics.impactMedium()
    }
    this.isErrorToastOpen = value;
  }

  setOpenSuccessToast(value:boolean){
    this.isSuccessToastOpen = value;
  }
}
