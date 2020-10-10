import { Component, OnInit } from '@angular/core';
import { StationModel } from 'src/app/models/station.model';
import { Merchant } from 'src/app/models/merchant.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  merchant: Merchant;

  constructor() {
    this.merchant = JSON.parse(localStorage.getItem('merchant'));
  }

  ngOnInit(): void {
  }

}
