import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonInput } from '@ionic/angular';
import { emailValidation, textValidaton } from 'src/app/utils/validation-functions';

@Component({
  selector: 'app-edit-profile-worker',
  templateUrl: './edit-profile-worker.page.html',
  styleUrls: ['./edit-profile-worker.page.scss'],
})

export class EditProfileWorkerPage implements OnInit {

  user: any = {
    name : '',
    lastname: '',
    email: '',
    password: '',
    about:'',
    description:'',
    addres:'',
    phone:'',
  }
  newUser: any = {
    name : '',
    lastname: '',
    email: '',
    password: '',
    about:'',
    description:'',
    addres:'',
    phone:'',
  }

  inputModel = this.user.phone;

  //Validadores
  nameIsCorrect:boolean = true;
  lastnameIsCorrect:boolean = true;
  emailIsCorrect:boolean = true;

  //Mensajes de error
  emailErrorMessage = "";

  constructor(private router: Router, private activedroute: ActivatedRoute) {
    this.activedroute.queryParams.subscribe(param =>{
      console.log(this.router.getCurrentNavigation()?.extras.state)
      if(this.router.getCurrentNavigation()?.extras.state){
    
        let user = this.router.getCurrentNavigation()?.extras?.state?.['user'];
        if(this.user){
          this.user = user;
          console.log(this.user)
        }
      }
    });
  };

  ngOnInit() {
  }

  toAddExperience(){
    this.router.navigate(['/add-experience-worker'])
  }
  toEditExperience(){
    this.router.navigate(['/edit-experience-worker'])
  }

  toAddEducation(){
    this.router.navigate(['/add-education-worker'])
  }
  toEditEducation(){
    this.router.navigate(['/edit-education-worker'])
  }

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

  //Validaciones
  validateProfile(){
    const emailValidations:any = emailValidation(this.user.email);
    this.emailIsCorrect = emailValidations.allOk;
    this.nameIsCorrect = textValidaton(this.user.name);
    this.lastnameIsCorrect = textValidaton(this.user.lastname);
    
    this.emailErrorMessage = emailValidations.errorMessage;
  }
}
