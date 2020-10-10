import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListDeliveryComponent } from './list-delivery/list-delivery.component';
import { BlockDeliveryComponent } from './block-delivery/block-delivery.component';

const routes: Routes = [
    { path: 'list', component: ListDeliveryComponent },
    { path: 'block', component: BlockDeliveryComponent },
    { path: '', redirectTo: 'list', pathMatch: 'full' }


];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class DeliveryMenRoutingModule { }
