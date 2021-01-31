import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { AddProductComponent } from './add-product/add-product.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AngularMaterialModule } from 'src/app/shared/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EnabledComponent } from './product-list/enabled/enabled.component';
import { MunuCategoryDialogComponent } from './add-product/munu-category-dialog/munu-category-dialog.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { OrderingMenuAdvancedComponent } from './add-product/ordering-menu-advanced/ordering-menu-advanced.component';


@NgModule({
  declarations: [
    ProductListComponent,
    AddProductComponent,
    EnabledComponent,
    MunuCategoryDialogComponent,
    OrderingMenuAdvancedComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule
  ],
  entryComponents: [
    MunuCategoryDialogComponent
  ]
})
export class ProductsModule { }
