import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-add-experience-worker',
  templateUrl: './add-experience-worker.page.html',
  styleUrls: ['./add-experience-worker.page.scss'],
})
export class AddExperienceWorkerPage implements OnInit {

  educInfo: any= {
    institucion: "",
    carrera: "",
    inicio: new Date().toISOString().substring(0, 7),
    final: new Date().toISOString().substring(0, 7)
  }

  constructor() { }

  ngOnInit() {
  }

  validaFecha(inicio: string, final: string): boolean {

    const fecha1 = new Date(inicio);
    const fecha2 = new Date(final);

    console.log(fecha1)
    console.log(fecha2)

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
}
