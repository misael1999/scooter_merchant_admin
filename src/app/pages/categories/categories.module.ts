import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryListComponent } from './category-list/category-list.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AngularMaterialModule } from 'src/app/shared/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EnabledComponent } from './category-list/enabled/enabled.component';
import { DisabledComponent } from './category-list/disabled/disabled.component';
import { AddCategoryPageComponent } from './add-category-page/add-category-page.component';
import { AddSubcategoryDialogComponent } from './add-category-page/add-subcategory-dialog/add-subcategory-dialog.component';
import { AddSectionDialogComponent } from './add-category-page/add-section-dialog/add-section-dialog.component';
import { EditCategoryPageComponent } from './edit-category-page/edit-category-page.component';


@NgModule({
  declarations: [
    CategoryListComponent,
    AddCategoryComponent,
    EnabledComponent,
    DisabledComponent,
    AddCategoryPageComponent,
    AddSubcategoryDialogComponent,
    AddSectionDialogComponent,
    EditCategoryPageComponent
  ],

  imports: [
    CommonModule,
    CategoriesRoutingModule,
    SharedModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    AddSubcategoryDialogComponent,
    AddSectionDialogComponent
  ]
})
export class CategoriesModule { }
