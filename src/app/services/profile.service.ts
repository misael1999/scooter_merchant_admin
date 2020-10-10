import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { StationModel } from '../models/station.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  merchant: any;

  constructor(private httpClient: HttpClient) { }

  getMerchant() {
    const merchantId = localStorage.getItem('merchant_id');
    const url = `${environment.HOST_APIV1}/merchants/${merchantId}/`;
    return this.httpClient.get(url);
  }

  updateMerchant(data: any) {
    const merchantId = localStorage.getItem('merchant_id');
    const url = `${environment.HOST_APIV1}/merchants/${merchantId}/update_info/`;
    return this.httpClient.patch(url, data);
  }


}
