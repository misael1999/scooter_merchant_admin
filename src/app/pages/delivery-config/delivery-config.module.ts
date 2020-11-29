import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeliveryConfigRoutingModule } from './delivery-config-routing.module';
import { MainConfigComponent } from './main-config/main-config.component';


@NgModule({
  declarations: [MainConfigComponent],
  imports: [
    CommonModule,
    DeliveryConfigRoutingModule
  ]
})
export class DeliveryConfigModule { }
