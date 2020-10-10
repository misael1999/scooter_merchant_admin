import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { Category } from 'src/app/models/category.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-subcategory-dialog',
  templateUrl: './add-subcategory-dialog.component.html',
  styleUrls: ['./add-subcategory-dialog.component.scss']
})
export class AddSubcategoryDialogComponent implements OnInit {
  builder: FormBuilder = new FormBuilder();
  group: FormGroup;
  subcategory;
  subcategoryIndex: number;
  imageURL: string;
  storeDataSubscription: Subscription;
  categorySubscription: Subscription;
  loadingSave = false;
  typeMenu;

  constructor(private categoriesService: CategoriesService, private route: ActivatedRoute, private router: Router,
    public dialogRef: MatDialogRef<AddSubcategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    
    if (data.subcategory) {
      this.subcategory = data.subcategory;
      if (data.subcategory.picture) {
        this.imageURL= data.subcategory.picture;
      }
      this.subcategoryIndex = data.index;
      this.buildFormWithData(this.subcategory);
    } else {
      this.buildForm();
    }


    // this.id = this.route.snapshot.params.id;
    // console.log(this.id);
  }

  ngOnInit(): void {
    this.typeMenu = localStorage.getItem('type_menu');
    /*     if (this.id) {
          this.categorySubscription = this.categoriesService
            .getCategoryById(Number(this.id))
            .subscribe((data: Category) => {
              this.group.get('name').setValue(data.name);
              this.imageURL = data.picture;
            });
        } */
  }

  ngOnDestroy(): void {
    if (this.storeDataSubscription) {
      this.storeDataSubscription.unsubscribe();
    }

    if (this.categorySubscription) {
      this.categorySubscription.unsubscribe();
    }
  }

  buildForm(): void {
    this.group = this.builder.group({
      name: ['', [Validators.required]]
    });
  }
  buildFormWithData(subcategory): void {
    this.group = this.builder.group({
      name: [subcategory.name, [Validators.required]]
    });
  }

  buildFormEditCtegory(category) {
    this.group = this.builder.group({
      name: [category.name, Validators.required]
    });
  }

  isFieldInvalid(group: FormGroup, field: string): boolean {
    return (
      (group.get(field).invalid && group.get(field).touched)
    );
  }

  isFieldValid(group: FormGroup, field: string): boolean {
    return (
      (group.get(field).valid && group.get(field).touched)
    );
  }

  hasFieldError(group: FormGroup, field: string, error: string): boolean {
    return (group.get(field).hasError(error));
  }

  sendData(category: Category): void {

    if (!/'https'/.test(this.imageURL)) {
      category.picture = this.imageURL;
    }

    this.saveCategory(category);
   /*  if (this.id) {
      category.id = this.id;
      delete category.picture;
      this.updateCategory(category);
    } else {
    } */
  }

  saveCategory(category: Category): void {
    // this.loadingSave = true;
    if (this.subcategory) {
      console.log('entro');
      this.dialogRef.close(category);
    } else {
      this.dialogRef.close(category);
    }

    /* this.storeDataSubscription = this.categoriesService.addCategory(category)
      .subscribe((data: any) => {
        this.loadingSave = false;
        this.dialogRef.close(true);
      }, (error: any) => {
        this.loadingSave = false;
        console.log(error);
        alert(error.errors.message);
        console.error(error);
      }); */
  }

  updateCategory(category: Category): void {
    this.storeDataSubscription = this.categoriesService.updateCategory(category)
      .subscribe((data: any) => { this.router.navigate(['/categories']); },
        (error: any) => { console.error(error); });
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
