import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { Subscription } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-unlock-dialog',
  templateUrl: './unlock-dialog.component.html',
  styleUrls: ['./unlock-dialog.component.scss']
})
export class UnlockDialogComponent implements OnInit, OnDestroy {
  product: Product;
  unlockProductSubscription: Subscription;

  constructor(
    private productService: ProductsService,
    @Inject(MAT_DIALOG_DATA) private data: Product,
    private dialogRef: MatDialogRef<UnlockDialogComponent>
  ) {
    this.product = this.data;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.unlockProductSubscription) {
      this.unlockProductSubscription.unsubscribe();
    }
  }

  unlockProduct() {
    this.unlockProductSubscription = this.productService.unlockProduct(this.product)
    .subscribe((data: any) => {
      console.log(data);
      this.dialogRef.close();
    });
  }
}
