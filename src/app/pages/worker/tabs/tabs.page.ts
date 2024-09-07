import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

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
      console.log(this.router.getCurrentNavigation()?.extras.state)
      if(this.router.getCurrentNavigation()?.extras.state){
        //recepcionar y guardar los datos
        const user = this.router.getCurrentNavigation()?.extras.state?.['user'];
        if(user){
          this.user.name = user.name;
        this.user.lastname = user.lastname;
        this.user.email = user.email;
        this.user.password = user.password;
        this.user.about = user.about;
        }

      }
    });
   }

  ngOnInit() {
  }

  toProfile() {
    let navigationextras: NavigationExtras = {
      state:{
        user:this.user
      }
    }
    this.router.navigate(['tabs-worker/profile'], navigationextras);
  }
}
