import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPromotionsComponent } from './main-promotions/main-promotions.component';
import { ListPromotionsComponent } from './list-promotions/list-promotions.component';
import { AddPromotionComponent } from './add-promotion/add-promotion.component';
import { TypeOfPromotionsComponent } from './type-of-promotions/type-of-promotions.component';
import { PromotionsRoutingModule } from './promotions-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AngularMaterialModule } from '../../shared/angular-material.module';


@NgModule({
  declarations: [
    MainPromotionsComponent,
    ListPromotionsComponent,
    AddPromotionComponent,
    TypeOfPromotionsComponent
  ],
  imports: [
    CommonModule,
    PromotionsRoutingModule,
    SharedModule,
    AngularMaterialModule
  ]
})
export class PromotionsModule { }
