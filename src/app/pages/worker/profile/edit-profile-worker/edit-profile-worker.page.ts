import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Camera, CameraResultType } from '@capacitor/camera';
import { IonInput } from '@ionic/angular';
import { ServiceBDService } from 'src/app/services/service-bd.service';
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

   expArray:any ={
    id_exp :"",
    startDate_exp :"",
    endDate_exp :"", 
    otherPosition :"",
    otherCompany :"", 
    comp :0 ,
    position :0 ,
    id_user :0 ,
  }

  educArray:any ={
    id_educ :"",
    startDate_educ :"",
    endDate_educ :"", 
    otherCarrer :"",
    otherInstitution :"", 
    inst :0 ,
    carrer :0 ,
    id_user :0 ,
  }
    

  inputModel = this.user.phone;
  messageErrorToast?:string;


  //Validadores
  nameIsCorrect:boolean = true;
  lastnameIsCorrect:boolean = true;
  emailIsCorrect:boolean = true;
  isErrorToastOpen: boolean = false;
  isSuccessToastOpen:boolean = false;


  //Mensajes de error
  emailErrorMessage = "";
  toastSuccessMessage ="";

  constructor(private router: Router, private activedroute: ActivatedRoute,private bd:ServiceBDService) {
     //subscribirse al observable/promesa
     this.activedroute.queryParams.subscribe(param =>{
      //verificar si viene la variable de contexto
      if(this.router.getCurrentNavigation()?.extras.state){
        if(this.router.getCurrentNavigation()?.extras?.state?.["user"]){
          this.user = JSON.parse(JSON.stringify(this.router.getCurrentNavigation()?.extras?.state?.["user"]));
        }
        if(this.router.getCurrentNavigation()?.extras?.state?.['from']){
          this.toastSuccessMessage = this.router.getCurrentNavigation()?.extras?.state?.['message'];
          this.setOpenSuccessToast(true);
        }
      }
    });

  };

  ngOnInit() {
    this.bd.dbReady().subscribe(data=>{
      if(data){    
        //me subcribo al observable del select de los JobsById
        this.bd.fetchExpById().subscribe(res=>{
          this.expArray = res;
        })
        this.bd.fetchEducById().subscribe(res=>{
          this.educArray = res;
        })
      }
    });
  }

  //RUTAS
  toAddExperience(){
    this.router.navigate(['/add-experience-worker'])
  }
  toEditExperience(exp:any){
    this.router.navigate(['/edit-experience-worker'])
  }

  toAddEducation(){
    this.router.navigate(['/add-education-worker'])
  }
  toEditEducation(educ:any){
    this.router.navigate(['/edit-education-worker'])
  }

  toProfile(){
    this.router.navigate(['tabs-worker/profile']);
  }

  //VALIDACIONES
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
        this.bd.selectUserById(this.user.id_user)
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

  setOpenSuccessToast(value:boolean){
    this.isSuccessToastOpen = value;
  }

  //OTROS
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

  setOpenErrorToast(value:boolean){
    this.isErrorToastOpen = value;
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

