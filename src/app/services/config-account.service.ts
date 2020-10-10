import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigAccountService {

  constructor(private http: HttpClient) { }

  getServices() {
    const url = `${environment.HOST_APIV1}/commons/services/`;
    return this.http.get(url);
  }

  getSchedules() {
    const url = `${environment.HOST_APIV1}/commons/schedules/`;
    return this.http.get(url);
  }

  updateInfo(info) {
    const merchantId = localStorage.getItem('merchant_id');
    const url = `${environment.HOST_APIV1}/merchants/${merchantId}/update_info/`;
    return this.http.put(url, info);
  }

}
