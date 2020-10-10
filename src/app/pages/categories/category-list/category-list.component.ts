import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/category.model';
import { PageEvent } from '@angular/material/paginator';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialogAddCategory() {
    const dialogRef = this.dialog.open(AddCategoryComponent, {
      disableClose: true,
      width: '500px',
      // data: { vehicle: null }
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        // this.getVehicles();
      }
    });
  }
}
