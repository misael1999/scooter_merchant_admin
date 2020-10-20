import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatementRoutingModule } from './statement-routing.module';
import { AngularMaterialModule } from '../../shared/angular-material.module';
import { SharedModule } from '../../shared/shared.module';
import { InfoComponent } from './info/info.component';
import { TableInfoComponent } from './table-info/table-info.component';
import { MainStatementComponent } from './main-statement/main-statement.component';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    InfoComponent,
    TableInfoComponent,
    MainStatementComponent],
  imports: [
    CommonModule,
    FormsModule,
    StatementRoutingModule,
    AngularMaterialModule,
    SharedModule,
    NzDatePickerModule
  ]
})
export class StatementModule { }
