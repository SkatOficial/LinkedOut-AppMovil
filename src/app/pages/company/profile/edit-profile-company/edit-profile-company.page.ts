import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-edit-profile-company',
  templateUrl: './edit-profile-company.page.html',
  styleUrls: ['./edit-profile-company.page.scss'],
})
export class EditProfileCompanyPage implements OnInit {

  user:any ={
    name: "Empresa Super Profesional",
    address: "Colina, Region Metropolitana, Chile",
    email: "empresa.super.profesional@example.com",
    phone:56912345678,
    about: "somos el epítome de la eficiencia corporativa. Nuestro equipo altamente capacitado se especializa en asistir a reuniones interminables y redactar correos electrónicos extremadamente importantes. Con un enfoque inquebrantable en maximizar las pausas para el café y optimizar la procrastinación, hemos alcanzado un nivel de profesionalismo que es difícil de igualar Nuestros proyectos siempre están en camino de ser iniciados, y nuestros plazos son tan flexibles que incluso se estiran hasta el infinito. Nos enorgullecemos de nuestra capacidad para gestionar tareas cruciales justo cuando ya no son tan cruciales. La calidad es nuestra segunda prioridad... justo después de encontrar el GIF perfecto para los chats de equipo. Si buscas un socio que pueda llevar tu proyecto a la cima de la lista de cosas por hacer (eventualmente), no busques más. ¡Estamos aquí para posponerlo todo con estilo y profesionalismo!"
  }

  constructor() { }

  ngOnInit() {
  }

  isEmail(email: string): boolean {
    
    if (!email) {
      console.log("que chucha")
      return false; 
    }
    let emailParts = email.split('@');

    if(emailParts.length != 2){
      return false;
    }
    emailParts = emailParts[1].split('.');
    if(emailParts.length != 2){
      return false;
    }

    return true;
  }

  validateData(formData: NgForm){
    if (formData.valid && this.isEmail(formData.value.correo)){
      console.log("formName Valido")
    }else{
      console.log("formName Invalido")
    }
  }


  inputModel = this.user.phone;

  @ViewChild('ionInputEl', { static: true }) ionInputEl!: IonInput;

  onInput(ev:any) {
    const value = ev.target!.value;
    // Removes non alphanumeric characters
    const filteredValue = value.replace(/[^0-9]+/g, '');

    /**
     * Update both the state variable and
     * the component to keep them in sync.
     */
    this.ionInputEl.value = this.inputModel = filteredValue;
  }

}
