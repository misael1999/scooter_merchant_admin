import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryListComponent } from './category-list/category-list.component';
import { InfoCategoryComponent } from './info-category/info-category.component';
import { AddCategoryComponent } from './add-category/add-category.component';

const routes: Routes = [
  { path: '', component: CategoryListComponent },
  { path: 'category/:id', component: InfoCategoryComponent },
  { path: 'add', component: AddCategoryComponent },
  {path: 'modify/:id', component: AddCategoryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
