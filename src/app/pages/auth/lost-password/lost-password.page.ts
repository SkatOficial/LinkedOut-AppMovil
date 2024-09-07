import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lost-password',
  templateUrl: './lost-password.page.html',
  styleUrls: ['./lost-password.page.scss'],
})
export class LostPasswordPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  
  toRegister(){
    this.router.navigate(['/register-selection']);
  }
  toLogin(){
    this.router.navigate(['/login']);
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

  validateEmail(formEmail: NgForm){
    if (formEmail.valid && this.isEmail(formEmail.value.correo)){
      this.toLogin()
    }
  }

}
