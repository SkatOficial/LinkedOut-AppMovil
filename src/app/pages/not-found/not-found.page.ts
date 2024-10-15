import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceBDService } from 'src/app/services/service-bd.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.page.html',
  styleUrls: ['./not-found.page.scss'],
})
export class NotFoundPage implements OnInit {

  postArray: any = [
    {
      id_comp : 0,
      name_comp:"",
    }
  ]

  constructor(private bd: ServiceBDService ,private router:Router) {
  }

  ngOnInit() {
    //consulto por el estado de la base de datos
    this.bd.dbReady().subscribe(data=>{
      this.bd.selectPositions();
      //verifico si esta disponible
      if(data){
        //me subcribo al observable del select de todas las noticias
        this.bd.fetchPositions().subscribe(res=>{
          //guardar ese resultado en mi variable propia
          this.postArray = res;
        })
      }
    })
  }
  
  toAccess(){
    this.router.navigate(['/access'])
  }

}
