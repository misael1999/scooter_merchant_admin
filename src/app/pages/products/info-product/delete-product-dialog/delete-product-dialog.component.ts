import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { Subscription } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-product-dialog',
  templateUrl: './delete-product-dialog.component.html',
  styleUrls: ['./delete-product-dialog.component.scss']
})
export class DeleteProductDialogComponent implements OnInit, OnDestroy {
  product: Product;
  deleteSubscription: Subscription;

  constructor(
    private productsService: ProductsService,
    @Inject(MAT_DIALOG_DATA) private data: Product,
    private dialogRef: MatDialogRef<DeleteProductDialogComponent>,
  ) {
    this.product = this.data;
  }
  
  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.deleteSubscription) {
      this.deleteSubscription.unsubscribe();
    }
  }

  deleteProduct(): void {
    this.deleteSubscription = this.productsService.deleteProduct(this.product)
    .subscribe((data: any) => {
      console.log(data);
      this.dialogRef.close();
    });
  }
}
