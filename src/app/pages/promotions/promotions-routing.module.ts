import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPromotionsComponent } from './main-promotions/main-promotions.component';
import { AddPromotionComponent } from './add-promotion/add-promotion.component';
import { TypePromotionsComponent } from '../marketing/promotions/type-promotions/type-promotions.component';

const routes: Routes = [
    { path: '', component: MainPromotionsComponent },
    { path: 'add', component: AddPromotionComponent },
    { path: ':id/edit', component: AddPromotionComponent },
    { path: 'type', component: TypePromotionsComponent },
    { path: '', redirectTo: '', pathMatch: 'full' }
];





@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PromotionsRoutingModule { }
