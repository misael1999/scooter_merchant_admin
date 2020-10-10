import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { AddProductComponent } from './add-product/add-product.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AngularMaterialModule } from 'src/app/shared/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { InfoProductComponent } from './info-product/info-product.component';
import { CardInfoComponent } from './info-product/card-info/card-info.component';
import { DeleteProductDialogComponent } from './info-product/delete-product-dialog/delete-product-dialog.component';
import { DisabledComponent } from './product-list/disabled/disabled.component';
import { EnabledComponent } from './product-list/enabled/enabled.component';
import { UnlockDialogComponent } from './product-list/unlock-dialog/unlock-dialog.component';


@NgModule({
  declarations: [ProductListComponent, AddProductComponent, InfoProductComponent, CardInfoComponent, DeleteProductDialogComponent, DisabledComponent, EnabledComponent, UnlockDialogComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule
  ],
  entryComponents: [DeleteProductDialogComponent, UnlockDialogComponent]
})
export class ProductsModule { }
