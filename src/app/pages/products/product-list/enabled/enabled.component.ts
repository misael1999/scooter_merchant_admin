import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { ProductsService } from 'src/app/services/products.service';
import Swal from 'sweetalert2';
import { ValidationForms } from '../../../../utils/validations-forms';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-enabled',
  templateUrl: './enabled.component.html',
  styleUrls: ['./enabled.component.scss']
})
export class EnabledComponent extends ValidationForms implements OnInit, OnDestroy {
  availabilityForm: FormGroup;
  products;
  productsSubscription: Subscription;
  loadingProduct;

  // MatPaginator Inputs
  length = 100;
  pageSize = 25;
  pageSizeOptions: number[] = [25, 50, 75, 100];
  // MatPaginator Output
  pageEvent: PageEvent;

  params = { limit: 25, offset: 0, search: '', ordering: '', status: 1 };
  typeMenu;
  searchText;

  constructor(private productService: ProductsService, private fb: FormBuilder,) {
    super();
    this.typeMenu = localStorage.getItem('type_menu');
  }

  ngOnInit(): void {
    this.getProducts();
  }

  showList(status) {
    this.params.status = status;
    this.getProducts();
  }


  ngOnDestroy(): void {
  }

  deleteCategory(product) {
    Swal.fire({
      title: 'Bloquear',
      text: `Esta seguro de bloquear: ${product.name}`,
      type: 'warning',
      showConfirmButton: true,
      confirmButtonText: 'Bloquear',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
    }).then(resp => {
      if (resp.value) {
        this.productService.deleteProduct(product.id)
          .subscribe(data => {
            this.getProducts();
            Swal.fire({
              title: 'Bloqueado',
              type: 'success',
              text: 'El producto ha sido bloqueado',
              timer: 1500
            });
          });
      }
    });
  }

  unLock(product) {
    this.productService.unlockProduct(product)
      .subscribe((data) => {
        this.showSwalMessage('Producto activado');
        this.showList(this.params.status = 1)
      }, error => {
        this.showSwalMessage('Error al activar')
      });
  }

  getProducts() {
    this.loadingProduct = true;
    this.productService.getProducts(this.params)
      .subscribe((data: any) => {
        this.products = data.results;
        // console.log(this.products);
        this.length = data.count;
        this.loadingProduct = false;
      }, error => {
        this.loadingProduct = false;
      })
  }

  searchBy(value: string) {
    this.params.search = value;
    this.productService.searchText = value;
    this.getProducts()
  }

  clearSearch() {
    this.params.search = '';
    this.productService.searchText = '';
    this.searchText = "";
    this.getProducts();
  }

  orderBy(orderValue: string): void {
    this.params.ordering = orderValue;
    this.getProducts();
  }

  getPage(e: any): PageEvent {
    if (this.products.length === 0) {
      this.pageSize = 25;
      return;
    }
    this.params.limit = e.pageSize;
    this.params.offset = this.params.limit * e.pageIndex;
    this.getProducts();
  }
}
