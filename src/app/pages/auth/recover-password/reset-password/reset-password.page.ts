import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { HapticsService } from 'src/app/services/haptics.service';
import { ServiceBDService } from 'src/app/services/service-bd.service';
import { passwordValidation } from 'src/app/utils/validation-functions';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  user:any ={
    id_user:0,
    password_user: "",
    confirmPassword:""
  }

  //VALIDADORES
  passwordIsCorrect: boolean = true;
  confirmPasswordIsCorrect : boolean = true;
  isErrorToastOpen: boolean = false;


  //Mensaje de error
  errorMessagesPassword: string[] = [];
  errorMessageToast = "";


  constructor(private bd: ServiceBDService, private router:Router, private haptics:HapticsService) { 
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.user.id_user = this.router.getCurrentNavigation()?.extras.state?.['id_user'];
    }
  }

  ngOnInit() {
  }

  //RUTAS
  toLogin(){
    const navigationExtras:NavigationExtras ={
      state:{
        status:"contraseña cambiada"
      }
    }
    this.router.navigate(['/login'],navigationExtras);
  }

  //VALIDARORES
  validatePassword(){
    const pwValidations: any = passwordValidation(this.user.password_user)
    this.errorMessagesPassword = pwValidations.errorMessages;
    this.passwordIsCorrect = pwValidations.allOk;

    this.confirmPasswordIsCorrect = (this.user.password_user == this.user.confirmPassword)

    if(this.passwordIsCorrect && this.confirmPasswordIsCorrect){
      this.bd.updatePassword(this.user.id_user,this.user.password_user)
      this.toLogin();
    }else{
      this.setOpenErrorToast(true,"Error con los datos ingresados");
    }
  }

  //OTROS
  async setOpenErrorToast(value:boolean,msg:string = ""){
    if(value){
      await this.haptics.impactMedium()
    }
    this.errorMessageToast = msg;
    this.isErrorToastOpen = value;
  }
}
