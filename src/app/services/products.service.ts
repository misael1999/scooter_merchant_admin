import { Injectable } from '@angular/core';
import { Merchant } from '../models/merchant.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  merchant: Merchant;

  constructor(private http: HttpClient) {
    this.merchant = JSON.parse(localStorage.getItem('merchant'));
  }

  getProducts(params = {}): Observable<any> {
    console.log(params);
    return this.http.get(`${environment.HOST_APIV1}/merchants/${this.merchant.id}/products/`, { params });
  }

  addProduct(product: Product): Observable<any> {
    return this.http.post(`${environment.HOST_APIV1}/merchants/${this.merchant.id}/products/`, {...product});
  }

  getProductById(id: number): Observable<any> {
    return this.http.get(`${environment.HOST_APIV1}/merchants/${this.merchant.id}/products/${id}/`);
  }

  updateProduct(product: Product): Observable<any> {
    return this.http.patch(`${environment.HOST_APIV1}/merchants/${this.merchant.id}/products/${product.id}/`, {...product});
  }

  deleteProduct({id}: Product): Observable<any> {
    return this.http.delete(`${environment.HOST_APIV1}/merchants/${this.merchant.id}/products/${id}/`);
  }

  unlockProduct({id}: Product): Observable<any> {
    return this.http.patch(`${environment.HOST_APIV1}/merchants/${this.merchant.id}/products/${id}/unlock/`, {});
  }
}
