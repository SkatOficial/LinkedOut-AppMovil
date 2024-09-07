import { Component,OnInit} from '@angular/core';

@Component({
  selector: 'app-home-worker',
  templateUrl: './home-worker.page.html',
  styleUrls: ['./home-worker.page.scss'],
})
export class HomeWorkerPage implements OnInit {

  
  constructor() { }

  ngOnInit() {
  }

  async canDismiss(data?: any, role?: string) {
    return role !== 'gesture';
  }

}
