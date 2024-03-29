import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCategoryPageComponent } from './add-category-page/add-category-page.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { EditCategoryPageComponent } from './edit-category-page/edit-category-page.component';
import { OrderingCategoriesComponent } from './category-list/enabled/ordering-categories/ordering-categories.component';

const routes: Routes = [
  { path: '', component: CategoryListComponent },
  { path: 'category', component: AddCategoryPageComponent },
  { path: 'ordering', component: OrderingCategoriesComponent },
  { path: 'category/:id', component: AddCategoryPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
