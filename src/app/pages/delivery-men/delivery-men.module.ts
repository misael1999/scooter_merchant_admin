import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListDeliveryComponent } from './list-delivery/list-delivery.component';
import { AddDeliveryComponent } from './add-delivery/add-delivery.component';
import { DeliveryMenRoutingModule } from './delivery-men-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AngularMaterialModule } from 'src/app/shared/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NzEmptyModule } from 'ng-zorro-antd/empty';



@NgModule({
  declarations: [
    ListDeliveryComponent,
    AddDeliveryComponent
    ],
  imports: [
    CommonModule,
    DeliveryMenRoutingModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    SharedModule,
    NzEmptyModule
  ]
})
export class DeliveryMenModule { }
