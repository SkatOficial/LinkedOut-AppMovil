import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile-company',
  templateUrl: './profile-company.page.html',
  styleUrls: ['./profile-company.page.scss'],
})
export class ProfileCompanyPage implements OnInit {
  user: any = {
    name : '',
    lastname: '',
    email: '',
    password: '',
    about:'',
  }
  constructor(private router: Router, private activedroute: ActivatedRoute) {
    //subscribirse al observable/promesa
    this.activedroute.queryParams.subscribe(param =>{
      //verificar si viene la variable de contexto
      if(this.router.getCurrentNavigation()?.extras.state){
        //recepcionar y guardar los datos
        this.user.name = this.router.getCurrentNavigation()?.extras?.state?.['user.name'];
        this.user.lastname = this.router.getCurrentNavigation()?.extras?.state?.['user.lastname'];
        this.user.email = this.router.getCurrentNavigation()?.extras?.state?.['user.email'];
        this.user.password = this.router.getCurrentNavigation()?.extras?.state?.['user.password'];
        this.user.about = this.router.getCurrentNavigation()?.extras?.state?.['user.about'];

        console.log(this.user)
      }
    });
   }

  ngOnInit() {
  }

  toOptionsProfile(){
    this.router.navigate(['options-profile-company'])
  }

  toEditProfile(){
    this.router.navigate(['edit-profile-company'])
  }
}
