import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { emailValidation, passwordValidation, textValidaton } from 'src/app/utils/validation-functions';

@Component({
  selector: 'app-register-company',
  templateUrl: './register-company.page.html',
  styleUrls: ['./register-company.page.scss'],
})
export class RegisterCompanyPage implements OnInit {

  user: any = {
    name : '',
    email: '',
    password: ''
  }

  confirmPassword: string = '';

  //Validadores
  nameIsCorrect: boolean = true;
  emailIsCorrect: boolean = true;
  passwordIsCorrect: boolean = true;
  confirmPasswordIsCorrect : boolean = true;
  errorMessagesPassword: string[] = [];
  
  //activadores
  title: String = "Añade tu nombre";
  labelsNameActived: boolean = true;
  labelsEmailActived: boolean = false;
  labelsPasswordActived: boolean = false;

  //Mensajes de error
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

    if(this.nameIsCorrect){
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
    this.router.navigate(['tabs-company'],navigationextras)
  }

}
