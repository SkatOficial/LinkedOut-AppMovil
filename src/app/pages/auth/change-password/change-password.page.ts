import { Component, OnInit } from '@angular/core';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { HapticsService } from 'src/app/services/haptics.service';
import { ServiceBDService } from 'src/app/services/service-bd.service';
import { passwordValidation } from 'src/app/utils/validation-functions';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  
  user: any = {
    id_user: null,
    password: ''
  }
  newPassword:string = '';
  confirmPassword: string = '';

  //Validadores
  passwordIsCorrect: boolean = true;
  newPasswordIsCorrect:boolean = true;
  confirmPasswordIsCorrect : boolean = true;
  isErrorToastOpen: boolean = false;
  isSuccessToastOpen:boolean = false;

  //Mensajes de error
  errorMessagesPassword: string[] = [];
  messageErrorToast?:string;

  constructor(private bd:ServiceBDService,private storage: NativeStorage, private haptics:HapticsService) { 
    //Obtiene el id de usuario del storage
    this.storage.getItem("userId").then(data=>{
      this.user.id_user = data;
   });
  }

  ngOnInit() {
  }
  
  //VALIDADORES
  async validatePassword(){
    const pwValidations: any = passwordValidation(this.newPassword);
    this.errorMessagesPassword = pwValidations.errorMessages;
    this.newPasswordIsCorrect = pwValidations.allOk;

    this.passwordIsCorrect = await this.bd.selectPasswordById(this.user.id_user,this.user.password);
    
    this.confirmPasswordIsCorrect = (this.newPassword == this.confirmPassword);

    if(!this.passwordIsCorrect){
      this.setOpenErrorToast(true,"Contraseña incorrecta");
      return;
    }

    if(this.newPasswordIsCorrect && this.confirmPasswordIsCorrect){
      this.bd.updatePassword(this.user.id_user,this.user.password);
      this.setOpenSuccessToast(true);
      this.user.password = "";
      this.newPassword = "";
      this.confirmPassword = "";
      
    }else{
      this.setOpenErrorToast(true,"Campos rellenados incorrectamente");
    }
    
  }

  //OTROS
  async setOpenErrorToast(value:boolean, msg:string = ""){
    if(value){
      this.messageErrorToast= msg
      await this.haptics.impactMedium()
    }
    this.isErrorToastOpen = value;
  }

  setOpenSuccessToast(value:boolean){
    this.isSuccessToastOpen = value;
  }

}
