import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: any = {
    name : '',
    lastname: '',
    email:"prueba@gmail.com",
    password:"12345678",
    about:'',
    description:'',
    addres:'',
    phone:'',
  }
  constructor(private router: Router) { }

  ngOnInit(){
  }

  toChangePassword(){
    this.router.navigate(['/lost-password']);
  }
  toRegister(){
    this.router.navigate(['/register-selection']);
  }
  toHome(){
    this.router.navigate(['/tabs-worker']);
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

  validateLogin(formLogin: NgForm){
    if (!formLogin.valid && !this.isEmail(formLogin.value.correo)){
      return
    }
    if(formLogin.value.correo === this.user.email 
      &&formLogin.value.contraseña === this.user.password 
    ){
      this.toHome();
    }
  }
}
