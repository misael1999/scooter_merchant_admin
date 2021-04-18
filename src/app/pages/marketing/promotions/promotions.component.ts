import { Component, OnInit } from '@angular/core';
import { PromotionsMerchantsService } from '../../../services/promotions-merchants.service';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.scss']
})
export class PromotionsComponent implements OnInit {
  loadingPromotions: boolean;
  promotions: Array<any> = [];
  // promotions: 0;
  params = { limit: 25, offset: 0, search: '', ordering: '' };


  constructor(private promotionsMerchants: PromotionsMerchantsService) { }

  ngOnInit(): void {
    this.getPromotions();
  }



  getPromotions() {
    this.loadingPromotions = true;
    this.promotionsMerchants.getPromotions(this.params)
      .subscribe((resp: any) => {
        this.promotions = resp.results;
        console.log(this.promotions);
        this.loadingPromotions = false;
      }, error => {
        this.loadingPromotions = false;
        console.log('Error al consultar promociones');
      });
  }

}
