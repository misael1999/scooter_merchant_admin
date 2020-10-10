import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { RejectOrderDialogComponent } from './reject-order-dialog/reject-order-dialog.component';
import { Observable, Subscription } from 'rxjs';
import { retryWhen, delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-orders',
  templateUrl: './new-orders.component.html',
  styleUrls: ['./new-orders.component.scss']
})

export class NewOrdersComponent implements OnInit, OnDestroy {
  merchantId = localStorage.getItem('merchant_id');
  token = localStorage.getItem('access_token');
  WS_SOCKET = `${environment.WS_SOCKET}/ws/orders/${this.merchantId}/?token=${this.token}`;
  // MatPaginator Inputs
  length = 100;
  pageSize = 15;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  // MatPaginator Output
  pageEvent: PageEvent;
  // loaders
  loaderAcceptOrder = false;

  // Parametros para el paginado
  params = { limit: 15, offset: 0, search: '', order_status: '14', ordering: '' };
  orders: Array<any> = [];
  loadingOrders: boolean;
  liveData$: Subscription;

  constructor(private ordersService: OrdersService, private snackBar: MatSnackBar,
              private dialog: MatDialog, private webSocketService: WebSocketService) { }

  ngOnInit(): void {
    this.getOrders();
    // this.connectToWebSocket();
  }

  ngOnDestroy(): void {
    this.webSocketService.closeConnection();
    /*     this.webSocketService.close(); */
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

  acceptOrder(order) {
    this.loaderAcceptOrder = true;
    this.ordersService.acceptOrder(order.id, {})
    .subscribe(data => {
      console.log(data);
      this.getOrders();
    }, error => {

    }, () => {
      this.loaderAcceptOrder = false;
    });
  }

  openDialogRejectOrder(orderId) {
    const dialogref = this.dialog.open(RejectOrderDialogComponent, {
      disableClose: true,
      width: '40%',
      minHeight: '300px',
      minWidth: '300px',
      data: { orderId }
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

  connectToWebSocket() {
    this.webSocketService.connect(this.WS_SOCKET).pipe(
      retryWhen((errors) => errors.pipe(delay(5000)))
    ).subscribe((data: any) => {
      if (data.data.type && data.data.type === 'NEW_ORDER') {
        this.openSnackbarNewOrder('Nuevo pedido');
      }
      if (data.data.type && data.data.type === 'ACCEPT_ORDER') {
        this.openSnackbarNewOrder('Pedido aceptado por el repartidor');
      }
    });
  }

  openSnackbarNewOrder(message) {
    const snackBarRef = this.snackBar.open(message, 'Recargar', {
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });

    snackBarRef.onAction().subscribe(() => {
      this.params = { limit: 15, offset: 0, search: '', order_status: '14', ordering: '' };
      this.getOrders();
    });

    snackBarRef.afterDismissed().subscribe(() => {
      console.log('The snack-bar was dismissed');
    });
  }

}
