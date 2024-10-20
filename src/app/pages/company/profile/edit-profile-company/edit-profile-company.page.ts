import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { IonInput } from '@ionic/angular';
import { ServiceBDService } from 'src/app/services/service-bd.service';
import { emailValidation, textValidaton } from 'src/app/utils/validation-functions';
import { Camera, CameraResultType } from '@capacitor/camera';
import { HapticsService } from 'src/app/services/haptics.service';

@Component({
  selector: 'app-edit-profile-company',
  templateUrl: './edit-profile-company.page.html',
  styleUrls: ['./edit-profile-company.page.scss'],
})
export class EditProfileCompanyPage implements OnInit {

  user: any = {
    id_user : 0,
    password_user : "",
    name_user : "",
    lastname_user : "",
    photo_user : null,
    email_user : "",
    phone_user : "",
    id_rol : 1 
  }

  inputModel = this.user.phone;
  messageErrorToast?:string;

  //Validadores
  nameIsCorrect:boolean = true;
  emailIsCorrect:boolean = true;
  isErrorToastOpen: boolean = false;


  //Mensajes de error
  emailErrorMessage = "";

  constructor(private bd:ServiceBDService, private activedroute: ActivatedRoute,private router: Router, private haptics:HapticsService) { 
    //subscribirse al observable/promesa
    this.activedroute.queryParams.subscribe(param =>{
      //verificar si viene la variable de contexto
      if(this.router.getCurrentNavigation()?.extras.state){
        this.user = JSON.parse(JSON.stringify(this.router.getCurrentNavigation()?.extras?.state?.["user"]));//generae una copia
      }
    });
  }

  ngOnInit() {
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
  async validateEmail(){
    this.user.email_user = this.user.email_user.toLowerCase();
    const emailValidations = emailValidation(this.user.email_user);
    this.emailIsCorrect = emailValidations.allOk;
    this.emailErrorMessage = emailValidations.errorMessage;
    let emailExists = await this.bd.selectEmailExistsId(this.user.email_user,this.user.id_user);


    if(this.emailIsCorrect && !emailExists){
      return true;
    }else{
      if(emailExists){
        this.emailErrorMessage = "El correo ya existe";
        this.emailIsCorrect = false;
      }
      return false;
    }
  }

  async validateProfile(){
    this.emailIsCorrect = await this.validateEmail();
    this.nameIsCorrect = textValidaton(this.user.name_user);

    if(this.emailIsCorrect &&  this.nameIsCorrect){
      let status = await this.bd.UpdateUser(this.user.id_user, this.user.password_user, this.user.name_user, this.user.lastname_user, this.user.photo_user, this.user.description_user, this.user.about_user, this.user.address_user, this.user.email_user, this.user.phone_user);

      if(status){
        this.toProfile();
      }else{
        this.messageErrorToast = "No se pudo modificar la cuenta"
        this.setOpenErrorToast(true);
      }
    }else{
      this.messageErrorToast = "Falta completar Datos obligatorios"
      this.setOpenErrorToast(true);
    }
  }

  //OTROS
  async setOpenErrorToast(value:boolean){
    if(value){
      await this.haptics.impactMedium()
    }
    this.isErrorToastOpen = value;
  }

  toProfile(){
    const navigationExtras: NavigationExtras = {
      state: {
        user: this.user
      }
    };
    this.router.navigate(['tabs-company/profile'], navigationExtras);
  }

  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri
    });
  
    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    this.user.photo_user = image.webPath;
  };
}
