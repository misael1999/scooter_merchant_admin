import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainReviewsComponent } from './main-reviews/main-reviews.component';

const routes: Routes = [

    { path: '', redirectTo: 'info', pathMatch: 'full'},
    { path: 'info', component: MainReviewsComponent },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewsRoutingModule { }
