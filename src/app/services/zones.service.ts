import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ZonesService {

  constructor(private http: HttpClient) { }

  getAreaByMerchant(params = {}) {
    const merchantId = localStorage.getItem('merchant_id');
    const url = `${environment.HOST_APIV1}/merchants/${merchantId}/area/`;
    return this.http.get(url, { params });
  }

  getZones(params = {}) {
    const merchantId = localStorage.getItem('merchant_id');
    const url = `${environment.HOST_APIV1}/merchants/${merchantId}/zones/`;
    return this.http.get(url, { params });
  }

  addZone(data) {
    const merchantId = localStorage.getItem('merchant_id');
    const url = `${environment.HOST_APIV1}/merchants/${merchantId}/zones/`;
    return this.http.post(url, data);
  }

  updateZone(zoneId, data) {
    const merchantId = localStorage.getItem('merchant_id');
    const url = `${environment.HOST_APIV1}/merchants/${merchantId}/zones/${zoneId}/`;
    return this.http.patch(url, data);
  }

  deleteZone(zoneId) {
    const merchantId = localStorage.getItem('merchant_id');
    const url = `${environment.HOST_APIV1}/merchants/${merchantId}/zones/${zoneId}/`;
    return this.http.delete(url);
  }

  activeZone(zoneId) {
    const merchantId = localStorage.getItem('merchant_id');
    const url = `${environment.HOST_APIV1}/merchants/${merchantId}/zones/${zoneId}/unlock/`;
    return this.http.patch(url, {});
  }
}