import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainConfigComponent } from './main-config/main-config.component';

const routes: Routes = [
  { 
    path: '', component: MainConfigComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliveryConfigRoutingModule { }
