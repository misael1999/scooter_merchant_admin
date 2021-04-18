import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Merchant } from '../models/merchant.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PromotionsMerchantsService {
  merchant: Merchant;

  constructor(private http: HttpClient) {
    this.merchant = JSON.parse(localStorage.getItem('merchant'));
  }

  getPromotions(params = {}): Observable<any> {
    const URL = `${environment.HOST_APIV1}/merchants/${this.merchant.id}/promotions/`;
    return this.http.get(URL, { params })
  }

  createPromotion(promotion): Observable<any> {
    const URL = `${environment.HOST_APIV1}/merchants/${this.merchant.id}/promotions/`;
    return this.http.post(URL, promotion);
  }

  updatePromotions(idPromotion: number, promotions): Observable<any> {
    const URL = `${environment.HOST_APIV1}/merchants/${this.merchant.id}/promotions/${idPromotion}/`;
    return this.http.patch(URL, promotions);
  }

  deletePromotions(idPromotion: number): Observable<any> {
    const URL = `${environment.HOST_APIV1}/merchants/${this.merchant.id}/promotions/${idPromotion}/`;
    return this.http.delete(URL);
  }


  // Other Methods
  getSchedules() {
    const URL = `${environment.HOST_APIV1}/commons/schedules/`;
    return this.http.get(URL);
  }



}
