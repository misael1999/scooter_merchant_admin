import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { TabGeneralComponent } from './profile/tabs/tab-general/tab-general.component';
import { TabScheduleComponent } from './profile/tabs/tab-schedule/tab-schedule.component';


const routes: Routes = [
  {
    path: '', component: ProfileComponent, children: [
      { path: 'general', component: TabGeneralComponent },
      { path: 'schedule', component: TabScheduleComponent },
      { path: '', redirectTo: 'general' },
    ]
  },
  { path: '', redirectTo: 'general', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewProfileRoutingModule { }
