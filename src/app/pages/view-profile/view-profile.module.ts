import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { ViewProfileRoutingModule } from './view-profile-routing.module';
import { CardGeneralInfoComponent } from './profile/card-general-info/card-general-info.component';
import { TabGeneralComponent } from './profile/tabs/tab-general/tab-general.component';
import { TabAddressComponent } from './profile/tabs/tab-address/tab-address.component';
import { TabScheduleComponent } from './profile/tabs/tab-schedule/tab-schedule.component';
import { TabOtherComponent } from './profile/tabs/tab-other/tab-other.component';
import { AngularMaterialModule } from 'src/app/shared/angular-material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { ScheduleProfileComponent } from './profile/tabs/tab-schedule/schedule/schedule.component';



@NgModule({
  declarations: [
    ProfileComponent,
    CardGeneralInfoComponent,
    TabGeneralComponent,
    TabAddressComponent,
    TabScheduleComponent,
    TabOtherComponent,
    ScheduleProfileComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ViewProfileRoutingModule,
    AmazingTimePickerModule,
    AngularMaterialModule,
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: 'AIzaSyDcAruMxBUQlW9S672oSoe1dyr7l8WIxlU'
    })
  ]
})
export class ViewProfileModule { }
