import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketingRoutingModule } from './marketing-routing.module';
import { MatRadioModule } from '@angular/material/radio';
import { PromotionsComponent } from './promotions/promotions.component';
import { CampaingComponent } from './campaing/campaing.component';
import { AddCampaingComponent } from './campaing/add-campaing/add-campaing.component';
import { AddPromotionsComponent } from './promotions/add-promotions/add-promotions.component';
import { AngularMaterialModule } from '../../shared/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TypePromotionsComponent } from './promotions/type-promotions/type-promotions.component';
import { SharedModule } from '../../shared/shared.module';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { HourIntervalsComponent } from './promotions/add-promotions/hour-intervals/hour-intervals.component';

@NgModule({
  declarations: [
    PromotionsComponent,
    CampaingComponent,
    AddCampaingComponent,
    AddPromotionsComponent,
    TypePromotionsComponent,
    HourIntervalsComponent
  ],
  imports: [
    CommonModule,
    MarketingRoutingModule,
    MatRadioModule,
    AngularMaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatInputModule,
    MatNativeDateModule
  ]
})
export class MarketingModule { }
