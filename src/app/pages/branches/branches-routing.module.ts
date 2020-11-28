import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddBranchComponent } from './add-branch/add-branch.component';
import { MainBranchesComponent } from './main-branches/main-branches.component';


const routes: Routes = [
  {path: '', component: MainBranchesComponent},
  {path: 'add', component: AddBranchComponent},
  {path: 'edit/:id', component: AddBranchComponent},
  // { path: '', redirectTo: 'active', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchesRoutingModule { }
