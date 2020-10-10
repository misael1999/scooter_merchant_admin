import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product.model';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { PageEvent } from '@angular/material/paginator';
import { UnlockDialogComponent } from '../unlock-dialog/unlock-dialog.component';
import { CategoriesService } from 'src/app/services/categories.service';

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

   params = {
    limit: 15,
    offset: 0,
    search: '',
    ordering: '',
    status: 2
  }

  constructor(
    private dialog: MatDialog, 
    private productService: ProductsService,
  ) { }

  ngOnInit(): void {
    this.getProducts(this.params);
  }

  openDialog(product: Product): void {
    this.dialog.open(UnlockDialogComponent, { data: product });
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
