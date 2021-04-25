import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { PromotionsMerchantsService } from 'src/app/services/promotions-merchants.service';

@Component({
  selector: 'app-main-promotions',
  templateUrl: './main-promotions.component.html',
  styleUrls: ['./main-promotions.component.scss']
})
export class MainPromotionsComponent implements OnInit {
  // MAT PAGINATOR
  length = 100;
  pageSize = 25;
  pageSizeOptions: number[] = [25, 50, 75, 100];
  pageEvent: PageEvent;
  loadingData: boolean;
  promotions;
  params = { limit: 25, offset: 0, search: '', ordering: '' };
  searchText;


  constructor(private promotionsMerchants: PromotionsMerchantsService) { }


  ngOnInit(): void {
    this.getPromotions();
  }


  getPromotions() {
    this.loadingData = true;
    this.promotionsMerchants.getPromotions(this.params)
      .subscribe((resp: any) => {
        this.promotions = resp.results;
        console.log(this.promotions);
        this.loadingData = false;
      }, error => {
        this.loadingData = false;
        console.log('Error al consultar promociones');
      });
  }


  // ======= PAGINADOR ========
  getPages(e: any): PageEvent {
    if (this.promotions.length === 0) {
      this.pageSize = 25;
      this.params.offset = 0;
      return;
    }
    this.params.offset = e.index;
    this.params.offset = this.params.limit * e.pageIndex;
    this.getPromotions();
  }



}