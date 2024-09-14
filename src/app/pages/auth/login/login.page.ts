import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  data: any = {
    user: {
      name : '',
      lastname: '',
      email:"prueba@gmail.com",
      password:"12345678",
      about:'',
      description:'',
      addres:'',
      phone:'',
    }
  }
  
  accountNotFound = true;

  userInput:any = {
    email: "",
    password: ""
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

 
  validateLogin(){
    for(let i = 0; i < this.data.length; i++){
      let user = this.data[i];
      console.log(this.data[i]);
      console.log(this.userInput);
      
      if(user.email == this.userInput.email && user.password == this.userInput.password){
        this.toHome();
      }
    }
    this.accountNotFound = false;
  }
}
