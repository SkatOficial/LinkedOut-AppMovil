import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { passwordValidation } from 'src/app/utils/validation-functions';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  
  user: any = {
    name : '',
    email: '',
    password: ''
  }

  //Validadores
  passwordIsCorrect: boolean = true;
  confirmPasswordIsCorrect : boolean = true;
  confirmPassword: string = '';
  isAllGood ?: boolean;

  //Mensajes de error
  errorMessagesPassword: string[] = [];

  constructor() { }

  ngOnInit() {
  }

  setOpenToast(value:boolean){
    this.isAllGood = value;
  }

  validatePassword(){
    const pwValidations: any = passwordValidation(this.user.password)
    this.errorMessagesPassword = pwValidations.errorMessages;
    this.passwordIsCorrect = pwValidations.allOk;
    

    this.confirmPasswordIsCorrect = (this.user.password == this.confirmPassword)

    if(this.passwordIsCorrect && this.confirmPasswordIsCorrect){
      this.setOpenToast(true);
    }
  }

}
