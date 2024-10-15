import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ServiceBDService } from 'src/app/services/service-bd.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  //VALIDADORES
  accountNotFound:boolean = false;
  isErrorToastOpen: boolean = false;

  userInput:any = {
    email: "",
    password: ""
  }

  constructor(private db: ServiceBDService ,private router: Router) { }

  ngOnInit(){
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
    }
    
    this.accountNotFound = true;
    this.setOpenErrorToast(true);
  }

  setOpenErrorToast(value:boolean){
    this.isErrorToastOpen = value;
  }
}
