import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  
  //Mensajes de error
  emailErrorMessage = "";


  constructor(private router: Router) { }

  ngOnInit() {
  }
  
  toRegister(){
    this.router.navigate(['/register-selection']);
  }
  toLogin(){
    this.router.navigate(['/login']);
  }

  validateEmail(){
    const emailValidations:any = emailValidation(this.email);
    this.emailIsCorrect = emailValidations.allOk;
    
    this.emailErrorMessage = emailValidations.errorMessage;
  }

}
