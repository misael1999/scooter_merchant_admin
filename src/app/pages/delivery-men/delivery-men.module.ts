import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListDeliveryComponent } from './list-delivery/list-delivery.component';
import { AddDeliveryComponent } from './add-delivery/add-delivery.component';
import { DeliveryMenRoutingModule } from './delivery-men-routing.module';
import { BlockDeliveryComponent } from './block-delivery/block-delivery.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AngularMaterialModule } from 'src/app/shared/angular-material.module';



@NgModule({
  declarations: [
    ListDeliveryComponent,
    AddDeliveryComponent,
    BlockDeliveryComponent],
  imports: [
    CommonModule,
    DeliveryMenRoutingModule,
    AngularMaterialModule,
    SharedModule
  ]
})
export class DeliveryMenModule { }
