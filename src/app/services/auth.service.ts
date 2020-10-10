import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  login(user) {
    const URL = `${environment.HOST_APIV1}/marketing/login/`;
    return this.http.post(URL, user);
  }

  signup(user) {
    const URL = `${environment.HOST_APIV1}/merchants/`;
    return this.http.post(URL, user);
  }

  verifyAccount(token) {
    const URL = `${environment.HOST_APIV1}/users/verify/`;
    return this.http.post(URL, {token});
  }

  forgotPassword(username: string) {
    const URL = `${environment.HOST_APIV1}/users/forgot-password/`;
    return this.http.post(URL, {username});
  }

  recoverPassword(token, password) {
    const URL = `${environment.HOST_APIV1}/users/recover-password/`;
    return this.http.post(URL, {token, password});
  }

  setTokenNotifications(token) {
    const URL = `${environment.HOST_APIV1}/devices/`;
    return this.http.post(URL, {registration_id: token, type: 'web'});
  }

  logout() {
    localStorage.removeItem('marketer');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.router.navigate(['/auth/']);
  }

  refreshToken(refresh) {
    const URL = `${environment.HOST_APIV1}/users/token/refresh/`;
    return this.http.post(URL, {refresh});
  }

}
