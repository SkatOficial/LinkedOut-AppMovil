import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.page.html',
  styleUrls: ['./not-found.page.scss'],
})
export class NotFoundPage implements OnInit {

  postArray: any = [
    {
      id_comp : 0,
      name_comp:"",
    }
  ]

  constructor(private router:Router) {

  }

  ngOnInit() {
  }
  
  toAccess(){
    this.router.navigate(['/access'])
  }

}
