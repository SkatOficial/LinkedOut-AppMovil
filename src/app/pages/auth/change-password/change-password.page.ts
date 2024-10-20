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

  //Validadores
  passwordIsCorrect: boolean = true;
  confirmPasswordIsCorrect : boolean = true;
  confirmPassword: string = '';
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

  async setOpenErrorToast(value:boolean){
    if(value){
      await this.haptics.impactMedium()
    }
    this.isErrorToastOpen = value;
  }

  setOpenSuccessToast(value:boolean){
    this.isSuccessToastOpen = value;
  }

  validatePassword(){
    const pwValidations: any = passwordValidation(this.user.password)
    this.errorMessagesPassword = pwValidations.errorMessages;
    this.passwordIsCorrect = pwValidations.allOk;
    

    this.confirmPasswordIsCorrect = (this.user.password == this.confirmPassword)

    if(this.passwordIsCorrect && this.confirmPasswordIsCorrect){
        this.bd.updatePassword(this.user.password,this.user.id_user);
        this.setOpenSuccessToast(true);
        this.user.password = "";
        this.confirmPassword = "";
    }else{
      this.messageErrorToast= "Campos rellenados incorrectamente" 
      this.setOpenErrorToast(true);
    }
  }

}
