import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { textValidaton, emailValidation, passwordValidation} from 'src/app/utils/validation-functions';

@Component({
  selector: 'app-register-worker',
  templateUrl: './register-worker.page.html',
  styleUrls: ['./register-worker.page.scss'],
})
export class RegisterWorkerPage implements OnInit {

  user: any = {
    name : '',
    lastname: '',
    email: '',
    password: ''
  }
  
  confirmPassword: string = '';

  //Validadores
  nameIsCorrect: boolean = true;
  lastnameIsCorrect: boolean = true;
  emailIsCorrect: boolean = true;
  passwordIsCorrect: boolean = true;
  confirmPasswordIsCorrect : boolean = true;
  errorMessagesPassword: string[] = [];
  
  //activadores
  title: String = "Añade tu nombre";
  labelsNameActived: boolean = true;
  labelsEmailActived: boolean = false;
  labelsPasswordActived: boolean = false;
  //Mensaje de error
  emailErrorMessage = "";
  constructor(private router:Router) { 
  }
  
  ngOnInit() {
  }

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

  validateName(){
    this.nameIsCorrect = textValidaton(this.user.name);
    this.lastnameIsCorrect = textValidaton(this.user.lastname);

    if(this.nameIsCorrect && this.lastnameIsCorrect){
      this.activateLabelsEmail();
    }
  }

  validateEmail(){
    const emailValidations:any = emailValidation(this.user.email);
    this.emailIsCorrect = emailValidations.allOk;

    this.emailErrorMessage = emailValidations.errorMessage;
    
    if(this.emailIsCorrect){
      this.activatelabelsPassword();
    }
  }

  validatePassword(){
    const pwValidations: any = passwordValidation(this.user.password)
    this.errorMessagesPassword = pwValidations.errorMessages;
    this.passwordIsCorrect = pwValidations.allOk;

    this.confirmPasswordIsCorrect = (this.user.password == this.confirmPassword)

    if(this.passwordIsCorrect && this.confirmPasswordIsCorrect){
      this.toHome();
    }
  }

  toHome(){
    const navigationextras: NavigationExtras = {
      state:{
        user:this.user
      }
    }
    this.router.navigate(['tabs-worker'],navigationextras)
  }
}
