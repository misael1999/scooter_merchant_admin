import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GainForUseComponent } from './gain-for-use/gain-for-use.component';
import { HistoryForUseComponent } from './history-for-use/history-for-use.component';
import { StatementRoutingModule } from './statement-routing.module';
import { AngularMaterialModule } from '../../shared/angular-material.module';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [
    GainForUseComponent,
    HistoryForUseComponent],
  imports: [
    CommonModule,
    StatementRoutingModule,
    AngularMaterialModule,
    SharedModule
  ]
})
export class StatementModule { }
