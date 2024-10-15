import { Component, OnInit } from '@angular/core';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ServiceBDService } from 'src/app/services/service-bd.service';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.page.html',
  styleUrls: ['./candidates.page.scss'],
})
export class CandidatesPage implements OnInit {

  id_user:number|null = null;
  
  constructor(private storage: NativeStorage,private bd:ServiceBDService) { }

  ngOnInit() {
    //Obtiene el id de usuario del storage
    this.storage.getItem("userId").then(data=>{
      this.id_user = data;

      //actualizo los observables
      this.bd.selectUserById(this.id_user);
   });
  }

}
