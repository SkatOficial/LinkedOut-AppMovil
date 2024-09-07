import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-profile-worker',
  templateUrl: './profile-worker.page.html',
  styleUrls: ['./profile-worker.page.scss'],
})
export class ProfileWorkerPage implements OnInit {

  user: any = {
    name : '',
    lastname: '',
    email: '',
    password: '',
    about:'',
    description:'',
    addres:'',
    phone:'',
  }
  constructor(private router: Router, private activedroute: ActivatedRoute) {
    this.activedroute.queryParams.subscribe(param =>{
      if(this.router.getCurrentNavigation()?.extras.state){
    
        let user = this.router.getCurrentNavigation()?.extras?.state?.['user'];
        if(this.user){
          this.user = user;
        }
      }
    });
  };

  ngOnInit() {
    
  }

  toOptionsProfile(){
    this.router.navigate(['options-profile-worker'])
  }

  toEditProfile(){
    let navigationextras: NavigationExtras = {
      state:{
        user:this.user
      }
    }
    this.router.navigate(['edit-profile-worker'], navigationextras)
  }
}
