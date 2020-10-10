import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { MatDialog } from '@angular/material/dialog';
import { DeleteCategoryDialogComponent } from '../../delete-category-dialog/delete-category-dialog.component';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-info',
  templateUrl: './card-info.component.html',
  styleUrls: ['./card-info.component.scss']
})
export class CardInfoComponent implements OnInit, OnDestroy {
  @Input() category: Category;
  dialogSubscription: Subscription;

  constructor(private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.dialogSubscription) {
      this.dialogSubscription.unsubscribe();
    }
  }

  deleteCategory(): void {
    console.log('Deleting category...');
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DeleteCategoryDialogComponent, { data: this.category });
    this.dialogSubscription = dialogRef.afterClosed().subscribe((result) => {
      this.router.navigate(['/categories']);
    });
  }
}
