import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

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

  password: string = '';
  confirmPassword: string = '';
  
  title: String = "Añade el nombre de la entidad";
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
    this.title = "Añade la dirección de email";
    this.labelsNameActived = false;
    this.labelsEmailActived = true;
    this.labelsPasswordActived = false;
  }
  activatelabelsPassword(){
    this.title = "Establece la contraseña";
    this.labelsNameActived = false;
    this.labelsEmailActived = false;
    this.labelsPasswordActived = true;
  }
  toHome(){
    this.router.navigate(['/tabs-company'])
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
      this.user.name = formName.value.nombre;
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
      this.toHome();
    }
      
  }

}
