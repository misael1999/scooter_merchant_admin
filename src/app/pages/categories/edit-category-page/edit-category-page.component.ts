import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { AddSectionDialogComponent } from '../add-category-page/add-section-dialog/add-section-dialog.component';
import { AddSubcategoryDialogComponent } from '../add-category-page/add-subcategory-dialog/add-subcategory-dialog.component';

@Component({
  selector: 'app-edit-category-page',
  templateUrl: './edit-category-page.component.html',
  styleUrls: ['./edit-category-page.component.scss']
})
export class EditCategoryPageComponent implements OnInit {

  group: FormGroup;
  subcatoryList = [];
  subcategorySelectedId;
  sectionsCurrentList;
  loadingSaveData;
  imageURL: string;
  typeMenu;

  // ======= EDITAR CATEGORIAS ======== 
  loadingCategory;
  category: Category;
  id;


  constructor(private fb: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar,
    private categoriesService: CategoriesService) {
    this.typeMenu = localStorage.getItem('type_menu');
    this.id = this.route.snapshot.params.id;

    this.getCategory(this.id);
    
  }

  ngOnInit(): void {
  }

  getCategory(id) {
    this.loadingCategory = true;
    this.categoriesService.getCategoryById(id)
      .subscribe((data) => {
        this.buildFormWithData(data);
        if (data.picture) {
          this.imageURL = data.picture;
        }
        this.subcatoryList = data.subcategories;
        this.loadingCategory = false;
      }, error => {
        this.loadingCategory = false;
      });
  }

  buildFormWithData(category) {
    this.group = this.fb.group({
      name: [category.name, Validators.required]
    });
  }

  openDialogSubcategory(subcategory = null, index = null) {
    const dialogRef = this.dialog.open(AddSubcategoryDialogComponent, {
      disableClose: true,
      minWidth: '400px',
      data: {
        subcategory,
        index
      }
    });

    dialogRef.afterClosed().subscribe((data: any) => {
      if (data) {
        console.log(index);
        if (index != null) {
          const subcategoryTemp = this.subcatoryList[index];
          console.log(subcategoryTemp);
          data.sections = subcategoryTemp.sections;
          this.subcatoryList[index] = data;
        } else {
          data.sections = [];
          this.subcatoryList.push(data);
        }
      }
    });
  }

  openDialogSection(section = null, index = null) {
    const dialogRef = this.dialog.open(AddSectionDialogComponent, {
      disableClose: true,
      minWidth: '400px',
      data: {
        section,
        index
      }
    });

    dialogRef.afterClosed().subscribe((data: any) => {
      if (data) {
        this.subcatoryList[this.subcategorySelectedId].sections.push(data);
      }
    });
  }

  saveData() {
    if (this.group.invalid) {
      this.group.markAllAsTouched();
      return;
    }
    if (!this.validSubcategories()) {
      return;
    }
    const category = this.group.value;
    category.subcategories = this.subcatoryList;
    this.loadingSaveData = true;

    this.categoriesService.addCategory(category)
      .subscribe((data: any) => {
        this.loadingSaveData = false;
        this.snackbar.open('Categoría agregada correctamente', '', {
          duration: 3000
        });
        this.router.navigate(['/categories'])
      }, error => {
        alert(error.errors.message);
        this.loadingSaveData = false;
      });


  }

  validSubcategories(): boolean {
    let isValid = true;
    if (this.subcatoryList.length == 0) {
      this.snackbar.open(`Agrega al menos una subcategoria`, '', {
        duration: 4000
      });
      return false;
    }

    for (const subcategory of this.subcatoryList) {
      if (subcategory.sections.length == 0) {
        isValid = false;
        this.snackbar.open(`La subcategoría ${subcategory.name} debe de tener al menos una sección`, '', {
          duration: 4000
        });
        break;
      }
    }

    return isValid;
  }

  selectSubcategory(value) {
    this.subcategorySelectedId = value.option.value;
  }

  deleteSubcategory(index) {
    this.subcatoryList.splice(index, 1);
  }

  deleteSection(index) {
    this.subcatoryList[this.subcategorySelectedId].sections.splice(index, 1);
  }

  isFieldInvalid(field: string): boolean {
    return (this.group.get(field).invalid && this.group.get(field).touched);
  }

  isFieldValid(field: string): boolean {
    return (this.group.get(field).valid && this.group.get(field).touched);
  }

  hasFieldError(field: string, errorcode: string): boolean {
    return (this.group.get(field).hasError(errorcode));
  }

  handlePickUpImage(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imageURL = String(reader.result);
    }
  }

}
