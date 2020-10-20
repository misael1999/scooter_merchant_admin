import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentsRoutingModule } from './payments-routing.module';
import { HistoryForUseComponent } from './history-for-use/history-for-use.component';
import { GainForUseComponent } from './gain-for-use/gain-for-use.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AngularMaterialModule } from 'src/app/shared/angular-material.module';


@NgModule({
  declarations: [
    GainForUseComponent,
    HistoryForUseComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    SharedModule,
    PaymentsRoutingModule
  ]
})
export class PaymentsModule { }
