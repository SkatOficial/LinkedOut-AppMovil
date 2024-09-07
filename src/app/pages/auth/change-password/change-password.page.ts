import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  
  password: string = '';
  confirmPassword: string = '';

  constructor(private router:Router) { }

  ngOnInit() {
  }

  validatePassword(formPassword: NgForm){
    if(formPassword.valid && this.password === this.confirmPassword){

    }
  }

}
