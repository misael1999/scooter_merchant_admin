import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/category.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-delete-category-dialog',
  templateUrl: './delete-category-dialog.component.html',
  styleUrls: ['./delete-category-dialog.component.scss']
})
export class DeleteCategoryDialogComponent implements OnInit, OnDestroy {
  category: Category;
  deleteSubscription: Subscription;

  constructor(private categoriesService: CategoriesService, 
    @Inject(MAT_DIALOG_DATA) private data: Category,
    private dialogRef: MatDialogRef<DeleteCategoryDialogComponent>) {
    this.category = this.data;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.deleteSubscription) {
      this.deleteSubscription.unsubscribe();
    }
  }

  deleteCategory(): void {
    this.deleteSubscription = this.categoriesService
    .deleteCategory(this.category)
    .subscribe((result) => {
      console.log(result);
      this.dialogRef.close();
    });
  }
}
