import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product.model';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-disabled',
  templateUrl: './disabled.component.html',
  styleUrls: ['./disabled.component.scss']
})
export class DisabledComponent implements OnInit {
  products: Product[];
  productsSubscription: Subscription;

  // MatPaginator Inputs
  length = 100;
  pageSize = 25;
  pageSizeOptions: number[] = [25, 50, 75, 100];
  // MatPaginator Output
  pageEvent: PageEvent;
  typeMenu;

  params = {
    limit: 15, offset: 0, search: '', ordering: '', status: 2
  };

  constructor(
    private dialog: MatDialog,
    private productService: ProductsService,
    private snackBar: MatSnackBar
  ) {
    this.typeMenu = localStorage.getItem('type_menu');

  }

  ngOnInit(): void {
    this.getProducts(this.params);
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

  activateProduct(product) {
    this.productService.unlockProduct(product.id)
      .subscribe((data) => {
        console.log(data);
        this.showMessageSuccess('Producto activado');
        this.getProducts(this.params);
      }, error => {
        this.showMessageError(error.errors.message);
      });
  }

  showMessageSuccess(message) {
    this.snackBar.open(message, 'Aceptar', {
      duration: 3000,
      panelClass: ['main-snackbar']
    });
  }
  showMessageError(message) {
    this.snackBar.open(message, 'Aceptar', {
      duration: 3000,
      panelClass: ['error-snackbar']
    });
  }



}
