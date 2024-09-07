import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-history-worker',
  templateUrl: './history-worker.page.html',
  styleUrls: ['./history-worker.page.scss'],
})
export class HistoryWorkerPage implements OnInit {

  constructor(private alertController: AlertController) { }

  ngOnInit() {
  }
  async canDismiss(data?: any, role?: string) {
    return role !== 'gesture';
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
}
