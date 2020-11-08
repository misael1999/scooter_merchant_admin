import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeliveryMenService {

  constructor(private http: HttpClient) { }

  getDeliveryMen(params = {}) {
    const merchantId = localStorage.getItem('merchant_id');
    const url = `${environment.HOST_APIV1}/merchants/${merchantId}/delivery_men/`;
    return this.http.get(url, { params });
  }

  createDeliveryMan(data) {
    const merchantId = localStorage.getItem('merchant_id');
    const url = `${environment.HOST_APIV1}/merchants/${merchantId}/delivery_men/`;
    return this.http.post(url, data);
  }

  updateDeliveryMan(deliveryManId, data) {
    const merchantId = localStorage.getItem('merchant_id');
    const url = `${environment.HOST_APIV1}/merchants/${merchantId}/delivery_men/${deliveryManId}/`;
    return this.http.patch(url, data);
  }

  inactiveDeliveryMan(deliveryManId) {
    const merchantId = localStorage.getItem('merchant_id');
    const url = `${environment.HOST_APIV1}/merchants/${merchantId}/delivery_men/${deliveryManId}/`;
    return this.http.delete(url);
  }

  unlockDeliveryMan(deliveryManId) {
    const merchantId = localStorage.getItem('merchant_id');
    const url = `${environment.HOST_APIV1}/merchants/${merchantId}/delivery_men/${deliveryManId}/unlock/`;
    return this.http.put(url, {});
  }

}
