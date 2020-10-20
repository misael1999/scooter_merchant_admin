import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatementRoutingModule } from './statement-routing.module';
import { AngularMaterialModule } from '../../shared/angular-material.module';
import { SharedModule } from '../../shared/shared.module';
import { InfoComponent } from './info/info.component';



@NgModule({
  declarations: [InfoComponent],
  imports: [
    CommonModule,
    StatementRoutingModule,
    AngularMaterialModule,
    SharedModule
  ]
})
export class StatementModule { }
