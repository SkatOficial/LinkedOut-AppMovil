import { Component, OnInit } from '@angular/core';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController } from '@ionic/angular';
import { ServiceBDService } from 'src/app/services/service-bd.service';

@Component({
  selector: 'app-history-worker',
  templateUrl: './history-worker.page.html',
  styleUrls: ['./history-worker.page.scss'],
})
export class HistoryWorkerPage implements OnInit {
  id_user = 0;

  postArray:any ={
    id_post : 0,
    id_job : 0,
    title_job : "",
    description_job : "",
    status_job : "",
    id_company : 0,
    photo_company : null,
    name_company : "",
    address_company : ""
  }

  modalPost={
    id_post : 0,
    status_post : "",
    id_job : 0,
    title_job : "",
    description_job : "",
    status_job : "",
    id_company : null,
    photo_company : null,
    name_company : "",
    address_company : "",
  }

  //VALIDADORES
  isModalOpen = false;

  constructor(private alertController: AlertController,private bd: ServiceBDService,private storage: NativeStorage) { 
    this.storage.getItem("userId").then(data=>{
      this.id_user = data;

      //actualizo los observables
      bd.selectPostulationsById(this.id_user);
   });
  }

  ngOnInit() {
    this.bd.dbReady().subscribe(data=>{
      if(data){
        //me subcribo al observable del select de los UserById
        this.bd.fetchPostulationById().subscribe(res=>{
          this.postArray = res;
        })
      }
      });
  }

  async confirmDeletion() {
    const alert = await this.alertController.create({
      header: '¿Estás seguro de eliminar la postulación?',
      message: 'Esta acción no se podrá deshacer',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            
          }
        },
        {
          text: 'Confirmar',
          cssClass: 'confirm-button',
          handler: () => {
           
          }
        }
      ]
    });

    await alert.present();
  }

  setOpenModal(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  updateModale(post:any){
    this.modalPost = post;
    this.setOpenModal(true);
  }
}
