import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ServiceBDService } from 'src/app/services/service-bd.service';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  id_user : number = 0;
  
  user:any = {
    id_user : 0,
    password_user : "",
    name_user : "",
    lastname_user : "",
    photo_user : "",
    description_user : "",
    direction_user : "",
    about_user : "",
    email_user : "",
    phone_user : "",
    id_rol : 0
  }

  constructor(private bd:ServiceBDService, private router: Router, private nativeStorage:NativeStorage,private activedroute:ActivatedRoute) { 
  }

  ngOnInit() {
    this.activedroute.queryParams.subscribe(param =>{
      this.bd.dbReady().subscribe(data=>{
        if(data){
          //me subcribo al observable del select de los trabajos
          this.bd.fetchUserById().subscribe(res=>{
            this.user = res;
          }) 
        }
      });

      if (this.router.getCurrentNavigation()?.extras.state) {
        if(this.router.getCurrentNavigation()?.extras.state?.['id_user']){
          this.id_user = this.router.getCurrentNavigation()?.extras.state?.['id_user'];
        }
      }
  
      this.bd.selectUserById(this.id_user);
      this.bd.selectJobsById(this.id_user);  
      this.saveUserInfo();
    });
  }

  //RUTAS
  toHistory(){
    this.router.navigate(['tabs-company/history']);
  }
  
  toProfile(){
    const navigationExtras: NavigationExtras = {
      state: {
        user: this.user
      }
    };
    this.router.navigate(['tabs-company/profile'], navigationExtras);
  }
  
  //OTROS
  saveUserInfo() {
    this.nativeStorage.setItem('userId', this.id_user);
  }
}
