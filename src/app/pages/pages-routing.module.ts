import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../services/guards/auth.guard';
import { RefreshTokenGuard } from '../services/guards/refresh-token.guard';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    canActivate: [AuthGuard, RefreshTokenGuard],
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'orders',
    canActivate: [AuthGuard, RefreshTokenGuard],
    loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule)
  },
  {
    path: 'delivery',
    canActivate: [AuthGuard, RefreshTokenGuard],
    loadChildren: () => import('./delivery-men/delivery-men.module').then(m => m.DeliveryMenModule)
  },
  {
    path: 'zones',
    canActivate: [AuthGuard, RefreshTokenGuard],
    loadChildren: () => import('./zones/zones.module').then(m => m.ZonesModule)
  },
  {
    path: 'profile',
    canActivate: [AuthGuard, RefreshTokenGuard],
    loadChildren: () => import('./view-profile/view-profile.module').then(m => m.ViewProfileModule)
  },
  {
    path: 'payments',
    canActivate: [AuthGuard, RefreshTokenGuard],
    loadChildren: () => import('./payments/payments.module').then(m => m.PaymentsModule)
  },
  {
    path: 'statement',
    canActivate: [AuthGuard, RefreshTokenGuard],
    loadChildren: () => import('./statement/statement.module').then(m => m.StatementModule)
  },
  {
    path: 'reviews',
    canActivate: [AuthGuard, RefreshTokenGuard],
    loadChildren: () => import('./reviews/reviews.module').then(m => m.ReviewsModule)
  },
  {
    path: 'branches',
    canActivate: [AuthGuard, RefreshTokenGuard],
    loadChildren: () => import('./branches/branches.module').then(m => m.BranchesModule)
  },
  {
    path: 'categories',
    canActivate: [AuthGuard, RefreshTokenGuard],
    loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule)
  },
  {
    path: 'products',
    canActivate: [AuthGuard, RefreshTokenGuard],
    loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
