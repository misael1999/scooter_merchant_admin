import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { Category } from 'src/app/models/category.model';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { ProductsService } from 'src/app/services/products.service';
import { CategoriesService } from 'src/app/services/categories.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-enabled',
  templateUrl: './enabled.component.html',
  styleUrls: ['./enabled.component.scss']
})
export class EnabledComponent implements OnInit, OnDestroy {
  products: Product[];
  productsSubscription: Subscription;

  // MatPaginator Inputs
  length = 100;
  pageSize = 25;
  pageSizeOptions: number[] = [25, 50, 75, 100];
  // MatPaginator Output
  pageEvent: PageEvent;

  params = {
    limit: 15,
    offset: 0,
    search: '',
    ordering: '',
    status: 1
  };
  typeMenu;

  constructor(private productService: ProductsService) { 
    this.typeMenu = localStorage.getItem('type_menu');
  }

  ngOnInit(): void {
    this.getProducts(this.params);
  }

  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe();
  }

  deleteCategory(id, name) {
    Swal.fire({
      title: 'Desactivar',
      text: `Esta seguro de desactivar a: ${name}`,
      type: 'warning',
      showConfirmButton: true,
      confirmButtonText: 'Bloquear',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
    }).then(resp => {
      if (resp.value) {
        this.productService.deleteProduct(id)
          .subscribe(data => {
            this.getProducts(this.params);
            Swal.fire({
              title: 'Bloqueado',
              type: 'success',
              text: 'El producto ha sido desactivado',
              timer: 1500
            });
          });
      }
    });
  }

  disponibilidadProduct(product: Product) {
    if (product.is_available === true) {
      this.productService.updateProduct(product)
        .subscribe((data: any) => {
        });
    } else {

      this.productService.updateProduct(product)
        .subscribe((data: any) => {
        });
    }
  }


  searchBy(search: string): void {
    this.params.search = search;
    this.getProducts(this.params);
  }

  orderBy(orderValue: string): void {
    this.params.ordering = orderValue;
    this.getProducts(this.params);
  }

  getProducts(params = {}): void {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
    this.productsSubscription = this.productService.getProducts(params)
      .subscribe((data: any) => {
        this.products = data.results;
        console.log(this.products);
      });
  }

  getPage(e: any): PageEvent {
    if (this.products.length === 0) {
      this.pageSize = 25;
      return;
    }
    this.params.limit = e.pageSize;
    this.params.offset = this.params.limit * e.pageIndex;
    this.getProducts(this.params);
  }

}
