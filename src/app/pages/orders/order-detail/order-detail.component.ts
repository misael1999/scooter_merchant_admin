import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { ProfileService } from 'src/app/services/profile.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  idOrder: number;
  params = {};
  orderDetail;


  constructor(
    private ordersService: OrdersService,
    private profileService: ProfileService,
    private activatedRoute: ActivatedRoute,
    private route: Router) {
    this.idOrder = activatedRoute.snapshot.params.id;
    console.log('El id obtenido es', this.idOrder);

  }

  ngOnInit(): void {
    this.getOrderId();
  }


  getOrderId() {
    this.ordersService.getOrdersId(this.idOrder)
      .subscribe((data: any) => {
        this.orderDetail = data;
        console.log('Order', this.orderDetail);
      }, error => {
        console.log(error, 'No paso nada ');
      });
  }
}
