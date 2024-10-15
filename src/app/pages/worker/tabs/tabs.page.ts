import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ServiceBDService } from 'src/app/services/service-bd.service';

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

  constructor(private router: Router, private bd:ServiceBDService, private nativeStorage:NativeStorage) {
    //Recupero el id_user enviado desde el login
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.id_user = this.router.getCurrentNavigation()?.extras.state?.['id_user'];
    }

    //actaulizo el observador del UserById
    this.bd.selectUserById(this.id_user)

    //Guardo el id_uesr en el local storage
    this.saveUserInfo()
  }

  ngOnInit() {
    this.bd.dbReady().subscribe(data=>{
      if(data){
        //me subcribo al observable del select del userById
        this.bd.fetchUserById().subscribe(res=>{
          this.user = res;
        }) 
      }
    })
  }

  toHome() {
    this.router.navigate(['tabs-worker/home']);
  };

  toHistory(){
    this.bd.selectPostulationsById(this.id_user);
    this.router.navigate(['tabs-worker/history']);
  }
  toProfile() {
    this.bd.selectExpById(this.id_user)

    const navigationExtras: NavigationExtras = {
      state: {
        user: this.user
      }
    };
    this.router.navigate(['tabs-worker/profile'], navigationExtras);
  };

  
  

  //OTROS
  saveUserInfo() {
    this.nativeStorage.setItem('userId', this.id_user);
  }
}
