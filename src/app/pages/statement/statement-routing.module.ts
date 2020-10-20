import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InfoComponent } from './info/info.component';

const routes: Routes = [
    { path: 'info', component: InfoComponent },
    { path: '', redirectTo: 'info', pathMatch: 'full'}
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class StatementRoutingModule { }


