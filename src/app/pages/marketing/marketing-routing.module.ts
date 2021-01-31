import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MarketingComponent } from './marketing.component';
import { CampaingComponent } from './campaing/campaing.component';
import { PromotionsComponent } from './promotions/promotions.component';
import { AddPromotionsComponent } from './promotions/add-promotions/add-promotions.component';
import { AddCampaingComponent } from './campaing/add-campaing/add-campaing.component';

const routes: Routes = [
    {
        path: '', component: MarketingComponent, children: [
            { path: 'promotions', component: PromotionsComponent },
            { path: 'campaing', component: CampaingComponent },
            { path: '', redirectTo: 'promotions' }
        ]
    },
    { path: 'addPromotions', component: AddPromotionsComponent },
    { path: '', redirectTo: 'active', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MarketingRoutingModule { }
