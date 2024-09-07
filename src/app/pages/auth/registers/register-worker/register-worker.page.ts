import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';

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

  password: string = '';
  confirmPassword: string = '';

  title: String = "Añade tu nombre";
  labelsNameActived: boolean = true;
  labelsEmailActived: boolean = false;
  labelsPasswordActived: boolean = false;

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

  toHome(navigationextras: NavigationExtras){
    this.router.navigate(['tabs-worker'],navigationextras)
  }

  isEmail(email: string): boolean {
    
    if (!email) {
      console.log("que chucha")
      return false; 
    }
    let emailParts = email.split('@');

    if(emailParts.length != 2){
      return false;
    }
    emailParts = emailParts[1].split('.');
    if(emailParts.length != 2){
      return false;
    }

    return true;
  }

  validateName(formName: NgForm){
    if (formName.valid) {
      this.activateLabelsEmail();
    }
  }

  validateEmail(formEmail: NgForm){
    if (formEmail.valid && this.isEmail(formEmail.value.correo)){
      this.user.email = formEmail.value.correo;
      this.activatelabelsPassword();
    }
  }

  validatePassword(formPassword: NgForm){
 
    if(formPassword.valid && this.password === this.confirmPassword){
      this.user.password = this.password

      let navigationextras: NavigationExtras = {
        state:{
          user:this.user
        }
      }
      console.log(this.user)
      this.toHome(navigationextras);
    }
      
  }
}
