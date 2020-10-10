import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';
import { AngularMaterialModule } from 'src/app/shared/angular-material.module';

@NgModule({
  declarations: [
    MainDashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsApiKey
    }),
    AngularMaterialModule
  ]
})
export class DashboardModule { }
