import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history-company',
  templateUrl: './history-company.page.html',
  styleUrls: ['./history-company.page.scss'],
})
export class HistoryCompanyPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  
  isModalOpen = false;
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
}
