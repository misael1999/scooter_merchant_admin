import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GainForUseComponent } from './gain-for-use/gain-for-use.component';
import { HistoryForUseComponent } from './history-for-use/history-for-use.component';

const routes: Routes = [
  { path: 'gain', component: GainForUseComponent },
  { path: 'activity', component: HistoryForUseComponent },
  { path: '', redirectTo: 'active', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentsRoutingModule { }
