import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryListComponent } from './category-list/category-list.component';
import { CardInfoComponent } from './info-category/card-info/card-info.component';
import { ProductListComponent } from './info-category/product-list/product-list.component';
import { InfoCategoryComponent } from './info-category/info-category.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AngularMaterialModule } from 'src/app/shared/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteCategoryDialogComponent } from './delete-category-dialog/delete-category-dialog.component';
import { EnabledComponent } from './category-list/enabled/enabled.component';
import { DisabledComponent } from './category-list/disabled/disabled.component';
import { UnlockDialogComponent } from './category-list/unlock-dialog/unlock-dialog.component';


@NgModule({
  declarations: [CategoryListComponent, CardInfoComponent, ProductListComponent, InfoCategoryComponent, AddCategoryComponent, DeleteCategoryDialogComponent, EnabledComponent, DisabledComponent, UnlockDialogComponent],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    SharedModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [DeleteCategoryDialogComponent]
})
export class CategoriesModule { }
