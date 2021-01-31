import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss']
})
export class MainDashboardComponent implements OnInit {
  merchant;


  constructor( ) {
    this.merchant = JSON.parse(localStorage.getItem('merchant'));
    // console.log(this.merchant);
  }

  ngOnInit(): void {
  }

}
