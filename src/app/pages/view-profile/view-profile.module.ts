import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { ViewProfileRoutingModule } from './view-profile-routing.module';
import { CardGeneralInfoComponent } from './profile/card-general-info/card-general-info.component';
import { TabGeneralComponent } from './profile/tabs/tab-general/tab-general.component';
import { TabScheduleComponent } from './profile/tabs/tab-schedule/tab-schedule.component';
import { AngularMaterialModule } from 'src/app/shared/angular-material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ScheduleProfileComponent } from './profile/tabs/tab-schedule/schedule/schedule.component';

@NgModule({
  declarations: [
    ProfileComponent,
    CardGeneralInfoComponent,
    TabGeneralComponent,
    TabScheduleComponent,
    ScheduleProfileComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ViewProfileRoutingModule,
    AngularMaterialModule,
  ]
})
export class ViewProfileModule { }
