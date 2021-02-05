import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.scss']
})
export class PromotionsComponent implements OnInit {
  loadingPromotions: boolean;
  promotions: Array<any> = [1];

  constructor() { }

  ngOnInit(): void {
  }

}
