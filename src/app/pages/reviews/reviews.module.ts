import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReviewsRoutingModule } from './reviews-routing.module';
import { MainReviewsComponent } from './main-reviews/main-reviews.component';
import { TableInfoComponent } from './table-info/table-info.component';
import { AngularMaterialModule } from 'src/app/shared/angular-material.module';
import { NzEmptyModule } from 'ng-zorro-antd/empty';


@NgModule({
  declarations: [MainReviewsComponent, TableInfoComponent],
  imports: [
    CommonModule,
    ReviewsRoutingModule,
    AngularMaterialModule,
    NzEmptyModule
  ]
})
export class ReviewsModule { }
