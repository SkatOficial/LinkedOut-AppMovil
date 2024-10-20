import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceBDService } from 'src/app/services/service-bd.service';

@Component({
  selector: 'app-access',
  templateUrl: './access.page.html',
  styleUrls: ['./access.page.scss'],
})
export class AccessPage implements OnInit {

  isSuccessToastOpen?:boolean;

  constructor(private router: Router,private activedroute:ActivatedRoute, private bd:ServiceBDService) { 
    //subscribirse al observable/promesa
    this.activedroute.queryParams.subscribe(param =>{
      //verificar si viene la variable de contexto
      if(this.router.getCurrentNavigation()?.extras.state){
        if(this.router.getCurrentNavigation()?.extras?.state?.['status']){
          this.setOpenSuccessToast(true);
        }
      }
    });
  }
  ngOnInit() {
  }
  //Direcciones
  toRegister(){
    this.router.navigate(['/register-selection']);
  }

  toNada(){
    this.router.navigate(['/prueba']);
  }

  toLogin(){
    this.router.navigate(['/login']);
  }

  toNotFound(){
    this.router.navigate(['/notFound']);
  }

  setOpenSuccessToast(value:boolean){
    this.isSuccessToastOpen = value;
  }


}
