import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CampaingComponent } from './campaing/campaing.component';
import { PromotionsComponent } from './promotions/promotions.component';
import { TypePromotionsComponent } from './promotions/type-promotions/type-promotions.component';
import { AddPromotionsComponent } from './promotions/add-promotions/add-promotions.component';

const routes: Routes = [
    { path: 'promotions', component: PromotionsComponent },
    { path: 'typesPromotions', component: TypePromotionsComponent },
    { path: 'add', component: AddPromotionsComponent },
    { path: 'campaing', component: CampaingComponent },
    { path: '', redirectTo: 'promotions', pathMatch: 'full' }
];


// const routes: Routes = [
//     {
//       path: 'news', component: NewOrdersComponent,
//     },
//     {
//       path: 'process', component: OrdersInProcessComponent,
//     },
//     {
//       path: 'delivered', component: DeliveredOrdersComponent,
//     },
//     {
//       path: 'cancelled', component: OrdersCancelledComponent,
//     },
//     {
//       path: 'detail/:id', component: OrderDetailComponent,
//     },
//     { path: '', redirectTo: 'news', pathMatch: 'full' }


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MarketingRoutingModule { }
