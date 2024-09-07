import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-options-profile-company',
  templateUrl: './options-profile-company.page.html',
  styleUrls: ['./options-profile-company.page.scss'],
})
export class OptionsProfileCompanyPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  toChangePassword(){
    this.router.navigate(['/change-password'])
  }
  toAccess(){
    this.router.navigate([''])
  }
}
