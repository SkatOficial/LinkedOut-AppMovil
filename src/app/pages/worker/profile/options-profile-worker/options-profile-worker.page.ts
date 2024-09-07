import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-options-profile-worker',
  templateUrl: './options-profile-worker.page.html',
  styleUrls: ['./options-profile-worker.page.scss'],
})
export class OptionsProfileWorkerPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  toChangePassword(){
    this.router.navigate(['/change-password'])
  }
  toAccess(){
    this.router.navigate([''])
  }
}
