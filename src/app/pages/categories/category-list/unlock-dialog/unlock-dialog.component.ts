import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Category } from 'src/app/models/category.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-unlock-dialog',
  templateUrl: './unlock-dialog.component.html',
  styleUrls: ['./unlock-dialog.component.scss']
})
export class UnlockDialogComponent implements OnInit, OnDestroy {
  category: Category;
  enableSubscription: Subscription;

  constructor(
    private categoryService: CategoriesService,
    @Inject(MAT_DIALOG_DATA) private data: Category,
    private dialogRef: MatDialogRef<UnlockDialogComponent>
  ) {
    this.category = data;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.enableSubscription) {
      this.enableSubscription.unsubscribe();
    }
  }

  unlockCategory(): void {
    this.enableSubscription = this.categoryService.unlockCategory(this.category)
    .subscribe((data: any) => {
      console.log(data);
      this.dialogRef.close();
    });
  }
}
