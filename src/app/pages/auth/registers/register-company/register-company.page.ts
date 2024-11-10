import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { HapticsService } from 'src/app/services/haptics.service';
import { ServiceBDService } from 'src/app/services/service-bd.service';
import { emailValidation, numberValidaton, passwordValidation, textValidaton } from 'src/app/utils/validation-functions';

@Component({
  selector: 'app-register-company',
  templateUrl: './register-company.page.html',
  styleUrls: ['./register-company.page.scss'],
})
export class RegisterCompanyPage implements OnInit {

  user: any = {
    id_user : null,
    password_user: '',
    name_user : '',
    email_user : '',
    photo_user: null,
    id_rol : 1,
  }

  questionsArray: any = {
    id_question : null,
    question_question: '',
  }

  security_answer= {
    id_user : 0,
    id_question: 0,
    answer: "",
  }

  confirmPassword: string = '';

  //Validadores
  nameIsCorrect: boolean = true;
  emailIsCorrect: boolean = true;
  passwordIsCorrect: boolean = true;
  confirmPasswordIsCorrect : boolean = true;
  questionIsCorrect: boolean = true;
  answerIsCorrect: boolean = true;
  isErrorToastOpen: boolean = false;
  
  //activadores
  title: String = "Añade tu nombre";
  labelsNameActived: boolean = true;
  labelsEmailActived: boolean = false;
  labelsPasswordActived: boolean = false;
  labelsQuestionActived: boolean = false;

  //Mensajes de error
  emailErrorMessage = "";
  errorMessagesPassword: string[] = [];

  constructor(private bd: ServiceBDService,private router:Router, private haptics:HapticsService) { 
  }
  
  ngOnInit() {
    this.bd.selectQuestions();
    //consulto por el estado de la base de datos
    this.bd.dbReady().subscribe(data=>{
      if(data){
        this.bd.fetchQuestions().subscribe(res=>{
          this.questionsArray = res;
        })
        
      }
    })
  }

  //CONTROLA LOS LABELS
  activateLabelsName(){
    this.title = "Añade el vombre de la compañia";
    this.labelsNameActived = true;
    this.labelsEmailActived = false;
    this.labelsPasswordActived = false;
    this.labelsQuestionActived = false;

  }

  activateLabelsEmail(){
    this.title = "Añade tu dirección de email";
    this.labelsNameActived = false;
    this.labelsEmailActived = true;
    this.labelsPasswordActived = false;
    this.labelsQuestionActived = false;
  }

  activatelabelsPassword(){
    this.title = "Establece tu contraseña";
    this.labelsNameActived = false;
    this.labelsEmailActived = false;
    this.labelsPasswordActived = true;
    this.labelsQuestionActived = false;
  }

  activatelabelsQuestion(){
    this.title = "Asegura tu cuenta";
    this.labelsNameActived = false;
    this.labelsEmailActived = false;
    this.labelsPasswordActived = false;
    this.labelsQuestionActived = true;
  }

  //VALIDADORES
  validateName(){
    this.nameIsCorrect = textValidaton(this.user.name_user);

    if(this.nameIsCorrect){
      this.activateLabelsEmail();
    }else{
      this.setOpenErrorToast(true);
    }
  }

  async validateEmail(){
    this.user.email_user = this.user.email_user.toLowerCase().trim();
    const emailValidations:any = emailValidation(this.user.email_user);
    this.emailIsCorrect = emailValidations.allOk;
    this.emailErrorMessage = emailValidations.errorMessage;
    let emailExists = await this.bd.selectEmailExists(this.user.email_user);


    if(this.emailIsCorrect && !emailExists){
      this.activatelabelsPassword();

    }else{
      if(emailExists){
        this.emailErrorMessage = "El correo ya existe";
        this.emailIsCorrect = false;
      }
      this.setOpenErrorToast(true);
    }
  }

  validatePassword(){
    const pwValidations: any = passwordValidation(this.user.password_user)
    this.errorMessagesPassword = pwValidations.errorMessages;
    this.passwordIsCorrect = pwValidations.allOk;

    this.confirmPasswordIsCorrect = (this.user.password_user == this.confirmPassword)

    if(this.passwordIsCorrect && this.confirmPasswordIsCorrect){
      this.activatelabelsQuestion();
    }else{
      this.setOpenErrorToast(true);
    }
  }

  validateQuestion(){
    this.questionIsCorrect = numberValidaton(this.security_answer.id_question);
    this.answerIsCorrect = textValidaton(this.security_answer.answer);

    if(this.questionIsCorrect && this.answerIsCorrect){
      this.createUser();
    }else{
      this.setOpenErrorToast(true);
    }
  }

  //OTROS
  toAcces(){
    const navigationextras: NavigationExtras = {
      state:{
        status:"Registro existoso"
      }
    }
    this.router.navigate(['access'],navigationextras)
  }

  async setOpenErrorToast(value:boolean){
    if(value){
      await this.haptics.impactMedium();
    }
    this.isErrorToastOpen = value;
  }

  async createUser(): Promise<void>{
    try{
      this.user.id_user = await this.bd.insertUserWorker(this.user.password_user,this.user.name_user,this.user.lastname_user,this.user.email_user,this.user.id_rol); 
      this.security_answer.id_user = this.user.id_user;
      this.bd.insertAnswer(this.security_answer.id_user,this.security_answer.id_question,this.security_answer.answer)
      this.toAcces();
    }catch(e){
      this.bd.presentAlert('Error', 'no se ha podido crear el usuario, intentelo nuevamente mas tarde')
    }
  }

  compareWith(comp1: any, comp2: any): boolean {
    return comp1 && comp2 ? comp1.id_question === comp2.id_question : comp1 === comp2;
  }

  handleChangeQuestion(ev:any) {
    this.security_answer.id_question = ev.target.value.id_question;
  }

}
