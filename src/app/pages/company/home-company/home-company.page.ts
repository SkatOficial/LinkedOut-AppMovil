import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-company',
  templateUrl: './home-company.page.html',
  styleUrls: ['./home-company.page.scss'],
})
export class HomeCompanyPage implements OnInit {
  public alertButtons = ['OK'];
  public alertInputs = [
    {
      label: 'juan.perez&#64;example.com',
      type: 'text'
    },
  ];

  constructor() { }

  ngOnInit() { }

  async canDismiss(data?: any, role?: string) {
    return role !== 'gesture';
  }
}
