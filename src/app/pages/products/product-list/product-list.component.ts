import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product.model';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { Category } from 'src/app/models/category.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { MatDialog } from '@angular/material/dialog';
import { AddProductComponent } from '../add-product/add-product.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialogAddProduct() {
    const dialogRef = this.dialog.open(AddProductComponent, {
      disableClose: true,
      width: '700px',
      // data: { vehicle: null }
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        // this.getVehicles();
      }
    });
  }

}
