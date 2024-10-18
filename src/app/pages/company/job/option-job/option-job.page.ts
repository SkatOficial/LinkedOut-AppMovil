import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-option-job',
  templateUrl: './option-job.page.html',
  styleUrls: ['./option-job.page.scss'],
})
export class OptionJobPage implements OnInit {

  job:any;
  constructor(private activedroute:ActivatedRoute, private router:Router) { 
    //subscribirse al observable/promesa
    this.activedroute.queryParams.subscribe(param =>{
      //verificar si viene la variable de contexto
      if(this.router.getCurrentNavigation()?.extras.state){
        this.job = this.router.getCurrentNavigation()?.extras?.state?.["job"];
      }
    });
  }

  ngOnInit() {
  }

  toEditJob(){
    const navigationExtras: NavigationExtras = {
      state: {
        job: this.job
      }
    };
    this.router.navigate(['edit-job'], navigationExtras);
  }
}
