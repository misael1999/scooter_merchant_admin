import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { ProductsService } from 'src/app/services/products.service';
import Swal from 'sweetalert2';
import { ValidationForms } from '../../../../utils/validations-forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../../../models/product.model';

@Component({
  selector: 'app-enabled',
  templateUrl: './enabled.component.html',
  styleUrls: ['./enabled.component.scss']
})
export class EnabledComponent extends ValidationForms implements OnInit, OnDestroy {
  availabilityForm: FormGroup;
  products;
  productUpdate: Product;
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
    // this.buildAvailable(this.productUpdate);
    // this.availabilityForm = this.fb.group({
    //   is_available: ['', Validators.requiredTrue]
    // })
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


  onFormSubmit() {
    if (this.availabilityForm.invalid) {
      this.availabilityForm.markAllAsTouched();
      return;
    }

    // const product = this.availabilityForm.value;

    this.productService.updateProduct(this.availabilityForm.value)
      .subscribe((data) => {
        console.log('actulizado')
      }, error => {
        console.log('error');

      });
    // alert(JSON.stringify(this.availabilityForm.value, null, 2));
  }




  changeAvailable(product) {
    // const product = this.availabilityForm.value;
    this.productService.changeAvailable({is_available: product.is_available, id:product.id})
      .subscribe((data) => {
        console.log('actulizado')
      }, error => {
        console.log('error');

      });
  }

  buildAvailable(product) {
    this.availabilityForm = this.fb.group({
      is_available: [product.is_available]
    })
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
