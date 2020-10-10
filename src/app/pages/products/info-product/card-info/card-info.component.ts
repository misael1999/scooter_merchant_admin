import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DeleteProductDialogComponent } from '../delete-product-dialog/delete-product-dialog.component';

@Component({
  selector: 'app-card-info',
  templateUrl: './card-info.component.html',
  styleUrls: ['./card-info.component.scss']
})
export class CardInfoComponent implements OnInit, OnDestroy {
  @Input() product: Product;
  dialogSubscription: Subscription;

  constructor(private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.dialogSubscription) {
      this.dialogSubscription.unsubscribe();
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DeleteProductDialogComponent, {data: this.product});
    this.dialogSubscription = dialogRef.afterClosed()
    .subscribe((data: any) => {
      this.router.navigate(['/products']);
    });
  }
}
