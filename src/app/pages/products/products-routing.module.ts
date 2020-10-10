import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { AddProductComponent } from './add-product/add-product.component';
import { InfoProductComponent } from './info-product/info-product.component';

const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'add', component: AddProductComponent },
  { path: 'modify/:id', component: AddProductComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
