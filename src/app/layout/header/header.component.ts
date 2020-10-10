import { Component, OnInit } from '@angular/core';
import { StationModel } from 'src/app/models/station.model';
import { Merchant } from 'src/app/models/merchant.model';
import { Marketer } from 'src/app/models/marketer.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  marketer: Marketer;

  constructor() {
    this.marketer = JSON.parse(localStorage.getItem('marketer'));
  }

  ngOnInit(): void {
  }

}
