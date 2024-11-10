import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { HapticsService } from 'src/app/services/haptics.service';
import { ServiceBDService } from 'src/app/services/service-bd.service';
import { emailValidation } from 'src/app/utils/validation-functions';

@Component({
  selector: 'app-lost-password',
  templateUrl: './lost-password.page.html',
  styleUrls: ['./lost-password.page.scss'],
})
export class LostPasswordPage implements OnInit {

  email: string = "";
  
  //validadores
  emailIsCorrect: boolean = true;
  isAllGood ?: boolean;
  isErrorToastOpen : boolean = false;
  
  //Mensajes de error
  emailErrorMessage = "";


  constructor(private db: ServiceBDService ,private router: Router,private haptics:HapticsService) { }

  ngOnInit() {
  }
  
  //RUTAS
  toRegister(){
    this.router.navigate(['/register-selection']);
  }
  toLogin(){
    this.router.navigate(['/login']);
  }
  toSecurityQuestion(id_user:number){
    const navigationextras:NavigationExtras ={
      state:{
        id_user : id_user
      }
    }
    this.router.navigate(['/security-question'],navigationextras);
  }

  //VALIDACIONES
  async validateEmail(){
    const emailExists = await this.db.selectEmailExists(this.email);
    
    if(!emailExists){
      this.emailErrorMessage = "No reconocemos esta cuenta"
      this.emailIsCorrect = false;
      this.setOpenErrorToast(true);
    }else{
      this.emailIsCorrect = true;
      const id_user:number = await this.db.selectIdUserByEmail(this.email);
      this.toSecurityQuestion(id_user);
    }
  }

  //OTROS
  async setOpenErrorToast(value:boolean){
    if(value){
      await this.haptics.impactMedium()
    }
    this.isErrorToastOpen = value;
  }
}
