import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-edit-education-worker',
  templateUrl: './edit-education-worker.page.html',
  styleUrls: ['./edit-education-worker.page.scss'],
})
export class EditEducationWorkerPage implements OnInit {

  educInfo: any= {
    institucion: "",
    carrera: "",
    inicio: new Date().toISOString().substring(0, 7),
    final: new Date().toISOString().substring(0, 7)
  }

  constructor(private alertController: AlertController) { }

  ngOnInit() {
  }

  validaFecha(inicio: string, final: string): boolean {

    const fecha1 = new Date(inicio);
    const fecha2 = new Date(final);

    return fecha1 < fecha2;
  }
  
  validateData(formData: NgForm){
    let fechaInicial = this.educInfo.inicio;
    let fechaFinal = this.educInfo.final;

    if (formData.valid && formData.valid && this.validaFecha(fechaInicial,fechaFinal)){
      console.log("formData Valido")
    }else{
      console.log("formData Invalido")
    }
  }
  
  async confirmDeletion() {
    const alert = await this.alertController.create({
      header: '¿Estás seguro de eliminar la educacion?',
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
