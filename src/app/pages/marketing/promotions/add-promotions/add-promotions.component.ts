import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-promotions',
  templateUrl: './add-promotions.component.html',
  styleUrls: ['./add-promotions.component.scss']
})
export class AddPromotionsComponent implements OnInit {
  // discountRate = { permanent: false, percentage: false, total: null };
  discountRate = false;


  rule1: boolean;
  rule2: boolean;
  minDate: Date;
  maxDate: Date;

  constructor() {
    // const currentYear = new Date().getFullYear();
    // this.minDate = new Date(currentYear - 20, 0, 1);
    // this.maxDate = new Date(currentYear + 1, 11, 31);
  }


  select(value) {
    this.discountRate = value == 'true' ? true : false;
  }

  ngOnInit(): void {
  }

}
