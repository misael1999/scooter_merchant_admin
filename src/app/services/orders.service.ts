import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  getOrders(params = {}) {
    const merchantId = localStorage.getItem('merchant_id');
    const url = `${environment.HOST_APIV1}/merchants/${merchantId}/orders/`;
    return this.http.get(url, { params });
  }

  getOrdersId(orderId: number) {
    const merchantId = localStorage.getItem('merchant_id');
    const url = `${environment.HOST_APIV1}/merchants/${merchantId}/orders/${orderId}/`;
    return this.http.get(url);
  }

  acceptOrder(orderId, data) {
    const merchantId = localStorage.getItem('merchant_id');
    const url = `${environment.HOST_APIV1}/merchants/${merchantId}/orders/${orderId}/accept_order/`;
    return this.http.put(url, data);
  }

  rejectOrder(orderId, data) {
    const merchantId = localStorage.getItem('merchant_id');
    const url = `${environment.HOST_APIV1}/merchants/${merchantId}/orders/${orderId}/reject_order/`;
    return this.http.put(url, data);
  }

  orderReady(orderId) {
    const merchantId = localStorage.getItem('merchant_id');
    const url = `${environment.HOST_APIV1}/merchants/${merchantId}/orders/${orderId}/order_ready/`;
    return this.http.put(url, {});
  }

  cancelOrder(orderId, data) {
    const merchantId = localStorage.getItem('merchant_id');
    const url = `${environment.HOST_APIV1}/merchants/${merchantId}/orders/${orderId}/cancel_order/`;
    return this.http.put(url, data);
  }
}
