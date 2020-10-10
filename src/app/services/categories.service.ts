import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { Merchant } from '../models/merchant.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  merchant: Merchant;

  constructor(private http: HttpClient) {
    this.merchant = JSON.parse(localStorage.getItem('merchant'));
  }

  getCategories(params = {}): Observable<any> {
    return this.http.get(`${environment.HOST_APIV1}/merchants/${this.merchant.id}/categories/`, { params });
  }

  addCategory(category: Category): Observable<any> {
    return this.http.post(`${environment.HOST_APIV1}/merchants/${this.merchant.id}/categories/`, { ...category });
  }

  getCategoryById(categoryId: number): Observable<any> {
    return this.http.get(`${environment.HOST_APIV1}/merchants/${this.merchant.id}/categories/${categoryId}/`);
  }

  deleteCategory(id: Category): Observable<any> {
    return this.http.delete(`${environment.HOST_APIV1}/merchants/${this.merchant.id}/categories/${id}/`);
  }

  updateCategory(category: Category): Observable<any> {
    return this.http.patch(`${environment.HOST_APIV1}/merchants/${this.merchant.id}/categories/${category.id}/`, { ...category });
  }

  unlockCategory(id: Category): Observable<any> {
    return this.http.patch(`${environment.HOST_APIV1}/merchants/${this.merchant.id}/categories/${id}/unlock/`, {status: 1});
  }


}
