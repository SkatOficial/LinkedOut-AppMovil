import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-selection',
  templateUrl: './register-selection.page.html',
  styleUrls: ['./register-selection.page.scss'],
})
export class RegisterSelectionPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  toRegisterWorker(){
    this.router.navigate(['/register-worker'])
  }
  toRegisterCompany(){
    this.router.navigate(['/register-company'])
  }
}
