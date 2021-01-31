import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketingComponent } from './marketing.component';
import { MarketingRoutingModule } from './marketing-routing.module';
import { AddCampaningComponent } from './add-campaning/add-campaning.component';
import {MatRadioModule} from '@angular/material/radio';
import { PromotionsComponent } from './promotions/promotions.component';
import { CampaingComponent } from './campaing/campaing.component';
import { AddCampaingComponent } from './campaing/add-campaing/add-campaing.component';
import { AddPromotionsComponent } from './promotions/add-promotions/add-promotions.component';
import { AngularMaterialModule } from '../../shared/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  declarations: [
    MarketingComponent,
    AddCampaningComponent,
    PromotionsComponent,
    CampaingComponent,
    AddCampaingComponent,
    AddPromotionsComponent
  ],
  imports: [
    CommonModule,
    MarketingRoutingModule,
    MatRadioModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule
  ]
})
export class MarketingModule { }
