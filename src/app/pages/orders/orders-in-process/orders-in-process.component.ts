import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CancelOrderComponent } from './cancel-order/cancel-order.component';

@Component({
  selector: 'app-orders-in-process',
  templateUrl: './orders-in-process.component.html',
  styleUrls: ['./orders-in-process.component.scss']
})
export class OrdersInProcessComponent implements OnInit {
 // MatPaginator Inputs
 length = 100;
 pageSize = 15;
 pageSizeOptions: number[] = [5, 10, 25, 100];
 // MatPaginator Output
 pageEvent: PageEvent;
 // Loaders
 loadingOrderReady = false;

 // Parametros para el paginado
 params = { limit: 15, offset: 0, search: '', order_status : '15' };
 orders: Array<any> = [];
 loadingOrders: boolean;
 liveData$: Subscription;

 constructor(private ordersService: OrdersService,
             private dialog: MatDialog, private webSocketService: WebSocketService) { }

 ngOnInit(): void {
   this.getOrders();
 }

 getOrders() {
   this.loadingOrders = true;
   this.ordersService.getOrders(this.params)
     .subscribe((data: any) => {
       this.orders = data.results;
       this.loadingOrders = false;
       this.length = data.count;
     }, error => {
       this.loadingOrders = false;
     });
 }

 searchBy(value: string) {
   this.params.search = value;
/*     if (value === '') {
     return;
   } */
   this.getOrders();
 }

 orderReady(order) {
  this.loadingOrderReady = true;

  this.ordersService.orderReady(order.id)
    .subscribe(data => {
      this.getOrders();

    }, error => {

    }, () => {
      this.loadingOrderReady = false;
    });

 }

 openDialogAssignDelivery(orderId) {
   /* const dialogref = this.dialog.open(AssignDeliveryDialogComponent, {
     disableClose: true,
     width: '60%',
     minHeight: '500px',
     minWidth: '350px',
     data: {orderId}
   });

   dialogref.afterClosed().subscribe(data => {
     if (data) {
       this.getOrders();
     }
   }); */
 }

 openDialogCancelOrder(orderId) {
   const dialogref = this.dialog.open(CancelOrderComponent, {
     disableClose: true,
     width: '40%',
     minHeight: '300px',
     minWidth: '300px',
     data: {orderId}
   });

   dialogref.afterClosed().subscribe(data => {
     if (data) {
       this.getOrders();
     }
   });
 }

 // ======= PAGINADOR ========
 getPages(e): PageEvent {
   if (this.orders.length === 0) {
     this.pageSize = 15;
     return;
   }
   this.params.limit = e.pageSize;
   this.params.offset = this.params.limit * e.pageIndex;
   this.getOrders();
 }


}

