import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history-company',
  templateUrl: './history-company.page.html',
  styleUrls: ['./history-company.page.scss'],
})
export class HistoryCompanyPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  
  toJob() {
    this.router.navigate(['/candidates']);
  }
  toOptions(){
    this.router.navigate(['/option-job'])
  }
}
