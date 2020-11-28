import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BranchesRoutingModule } from './branches-routing.module';
import { MainBranchesComponent } from './main-branches/main-branches.component';
import { BranchListComponent } from './branch-list/branch-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AngularMaterialModule } from 'src/app/shared/angular-material.module';
import { AddBranchComponent } from './add-branch/add-branch.component';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ReactiveFormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [MainBranchesComponent, BranchListComponent, AddBranchComponent],
  imports: [
    CommonModule,
    BranchesRoutingModule,
    SharedModule,
    AngularMaterialModule,
    NzStepsModule,
    NzFormModule,
    NzIconModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: 'AIzaSyDcAruMxBUQlW9S672oSoe1dyr7l8WIxlU'
    })
    
  ]
})
export class BranchesModule { }
