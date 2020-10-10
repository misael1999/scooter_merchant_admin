import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule)
  },
  {
    path: 'categories',
    loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule)
  },
  {
    path: 'products',
    loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)
  },
  {
    path: 'clients',
    loadChildren: () => import('./clients/clients.module').then(m => m.ClientsModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule)
  },
  {
    path: 'delivery',
    loadChildren: () => import('./delivery-men/delivery-men.module').then(m => m.DeliveryMenModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./view-profile/view-profile.module').then(m => m.ViewProfileModule)
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { 
    path: 'categories',
   loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule)
  },
  { path: 'products',
   loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
