import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddCategoryComponent } from '../add-category/add-category.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  typeMenu;

  constructor(private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.typeMenu = localStorage.getItem('type_menu');
  }


  openDialogAddcategory(category = null) {
    if (this.typeMenu >= 2) {
      if (category != null) {
        this.router.navigate(['/categories/category', category.id]);
      } else {
        this.router.navigate(['/categories/category']);
      }
      return;
    } else {
      const dialogRef = this.dialog.open(AddCategoryComponent, {
        disableClose: true,
        width: '500px',
        data: { category }
      });
      dialogRef.afterClosed().subscribe(data => {
        if (data) {
          location.reload();
        }
      });
    }
  }

}
