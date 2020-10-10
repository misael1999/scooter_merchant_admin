import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private http: HttpClient) { }

  getClients(params = {}) {
    const merchantId = localStorage.getItem('merchant_id');
    const url = `${environment.HOST_APIV1}/merchants/${merchantId}/customers/`;
    return this.http.get(url, { params });
  }

  getClientId(id: number, params = {}) {
    const merchantId = localStorage.getItem('merchant_id');
    const url = `${environment.HOST_APIV1}/merchants/${merchantId}/customers/${id}/`;
    return this.http.get(url, {params});
  }

}
