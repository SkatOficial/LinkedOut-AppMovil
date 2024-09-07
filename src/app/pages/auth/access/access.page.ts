import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-access',
  templateUrl: './access.page.html',
  styleUrls: ['./access.page.scss'],
})
export class AccessPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  toRegister(){
    this.router.navigate(['/register-selection']);
  }
  toLogin(){
    this.router.navigate(['/login']);
  }
}
