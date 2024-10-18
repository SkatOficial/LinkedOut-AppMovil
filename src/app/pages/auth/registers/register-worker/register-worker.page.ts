import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ServiceBDService } from 'src/app/services/service-bd.service';
import { textValidaton, emailValidation, passwordValidation} from 'src/app/utils/validation-functions';

@Component({
  selector: 'app-register-worker',
  templateUrl: './register-worker.page.html',
  styleUrls: ['./register-worker.page.scss'],
})

export class RegisterWorkerPage implements OnInit {
  user: any = {
    id_user : null,
    password_user: '',
    name_user : '',
    lastname_user: '',
    email_user : '',
    id_rol : 2,
  }
  
  confirmPassword: string = '';

  //Validadores
  nameIsCorrect: boolean = true;
  emailIsCorrect: boolean = true;
  passwordIsCorrect: boolean = true;
  confirmPasswordIsCorrect : boolean = true;
  errorMessagesPassword: string[] = [];
  isErrorToastOpen: boolean = false;
  
  //activadores
  title: String = "Añade tu nombre";
  labelsNameActived: boolean = true;
  labelsEmailActived: boolean = false;
  labelsPasswordActived: boolean = false;
  //Mensaje de error
  emailErrorMessage = "";

  constructor(private bd: ServiceBDService, private router:Router) { 
  }
  
  ngOnInit() {
  }

  //CONTROLA LOS LABELS
  activateLabelsName(){
    this.title = "Añade tu nombre";
    this.labelsNameActived = true;
    this.labelsEmailActived = false;
    this.labelsPasswordActived = false;
  }

  activateLabelsEmail(){
    this.title = "Añade tu dirección de email";
    this.labelsNameActived = false;
    this.labelsEmailActived = true;
    this.labelsPasswordActived = false;
  }

  activatelabelsPassword(){
    this.title = "Establece tu contraseña";
    this.labelsNameActived = false;
    this.labelsEmailActived = false;
    this.labelsPasswordActived = true;
  }

  //VALIDADORES
  validateName(){
    this.nameIsCorrect = textValidaton(this.user.name_user);

    if(this.nameIsCorrect){
      this.activateLabelsEmail();
    }else{
      this.setOpenErrorToast(true);
    }
  }

  async validateEmail(){
    this.user.email_user = this.user.email_user.toLowerCase().trim();
    
    const emailValidations:any = emailValidation(this.user.email_user);
    this.emailIsCorrect = emailValidations.allOk;
    this.emailErrorMessage = emailValidations.errorMessage;
    let emailExists = await this.bd.selectEmailExists(this.user.email_user);


    if(this.emailIsCorrect && !emailExists){
      this.activatelabelsPassword();

    }else{
      if(emailExists){
        this.emailErrorMessage = "El correo ya existe";
        this.emailIsCorrect = false;
      }
      this.setOpenErrorToast(true);
    }
  }

  validatePassword(){
    const pwValidations: any = passwordValidation(this.user.password_user)
    this.errorMessagesPassword = pwValidations.errorMessages;
    this.passwordIsCorrect = pwValidations.allOk;

    this.confirmPasswordIsCorrect = (this.user.password_user == this.confirmPassword)

    if(this.passwordIsCorrect && this.confirmPasswordIsCorrect){
      this.createUser();
    }else{
      this.setOpenErrorToast(true);
    }
  }

  toAcces(){
    const navigationextras: NavigationExtras = {
      state:{
        status:"Registro existoso"
      }
    }
    this.router.navigate(['access'],navigationextras)
  }

  setOpenErrorToast(value:boolean){
    this.isErrorToastOpen = value;
  }

  async createUser(): Promise<void>{
    try{
      this.user.id_user = await this.bd.insertUserWorker(this.user.password_user,this.user.name_user,this.user.lastname_user,this.user.email_user,this.user.id_rol); 
      this.toAcces();
    }catch(e){
      this.bd.presentAlert('Error', 'no se ha podido crear el usuario, intentelo nuevamente mas tarde')
    }
  }
}
