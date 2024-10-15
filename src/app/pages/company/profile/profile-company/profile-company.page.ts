import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-profile-company',
  templateUrl: './profile-company.page.html',
  styleUrls: ['./profile-company.page.scss'],
})
export class ProfileCompanyPage implements OnInit {
  id_user?:number;
  user: any = {
    id_user : 0,
    password_user : "",
    name_user : "",
    lastname_user : "",
    photo_user : "",
    email_user : "",
    phone_user : "",
    id_rol : 1 
  }
  constructor(private router: Router, private activedroute: ActivatedRoute) {
    //subscribirse al observable/promesa
    this.activedroute.queryParams.subscribe(param =>{
      //verificar si viene la variable de contexto
      if(this.router.getCurrentNavigation()?.extras.state){
        this.user = this.router.getCurrentNavigation()?.extras?.state?.["user"];
      }
    });
  }

  ngOnInit() {
  }

  toOptionsProfile(){
    this.router.navigate(['options-profile-company'])
  }

  toEditProfile(){
    const navigationExtras: NavigationExtras = {
      state: {
        user: this.user
      }
    };
    this.router.navigate(['edit-profile-company'],navigationExtras)
  }
}
