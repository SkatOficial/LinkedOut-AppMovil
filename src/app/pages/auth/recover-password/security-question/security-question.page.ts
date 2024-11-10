import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { HapticsService } from 'src/app/services/haptics.service';
import { ServiceBDService } from 'src/app/services/service-bd.service';
import { numberValidaton, textValidaton } from 'src/app/utils/validation-functions';

@Component({
  selector: 'app-security-question',
  templateUrl: './security-question.page.html',
  styleUrls: ['./security-question.page.scss'],
})
export class SecurityQuestionPage implements OnInit {

  questionsArray: any = {
    id_question : null,
    question_question: '',
  }

  security_answer= {
    id_user : 0,
    id_question: 0,
    answer: "",
  }

  //VALIDADORES
  questionIsCorrect: boolean = true;
  answerIsCorrect: boolean = true;
  answerNotFound : boolean = false;
  isErrorToastOpen: boolean = false;


  //MENSAJES
  errorMessage = ""

  constructor(private bd: ServiceBDService, private router:Router, private haptics:HapticsService) {
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.security_answer.id_user = this.router.getCurrentNavigation()?.extras.state?.['id_user'];
    }
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
  
  //RUTAS
  toResetPassword(){
    const navigationExtras: NavigationExtras ={
      state:{
        id_user : this.security_answer.id_user
      }
    }
    this.router.navigate(['/reset-password'],navigationExtras);
  }
  //VALIDADORES
 async  validateAnswer(){
    this.questionIsCorrect = numberValidaton(this.security_answer.id_question);
    this.answerIsCorrect = textValidaton(this.security_answer.answer);

    if(this.questionIsCorrect && this.answerIsCorrect){
      let res = await this.bd.selectAnswer(this.security_answer.id_user,this.security_answer.id_question,this.security_answer.answer);

      if(res){
        this.answerNotFound = false;
        this.toResetPassword();
      }else{
        this.answerNotFound = true;
        this.setOpenErrorToast(true,"Respuesta o pregunta incorrecta");
      }
    }else{
      this.setOpenErrorToast(true,"Error con los datos ingresados");
    }
  }
  
  //OTROS
  async setOpenErrorToast(value:boolean,msg:string = ""){
    if(value){
      await this.haptics.impactMedium()
    }
    this.errorMessage = msg;
    this.isErrorToastOpen = value;
  }
  
  compareWith(comp1: any, comp2: any): boolean {
    return comp1 && comp2 ? comp1.id_question === comp2.id_question : comp1 === comp2;
  }

  handleChangeQuestion(ev:any) {
    this.security_answer.id_question = ev.target.value.id_question;
  }

}
