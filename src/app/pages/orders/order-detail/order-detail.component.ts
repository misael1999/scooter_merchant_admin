import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../../services/orders.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from '../../../services/profile.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  idOrder: number;
  params = {};
  orderDetail;
  stationDetail;


  constructor(private ordersService: OrdersService, private profileService: ProfileService,
    private activatedRoute: ActivatedRoute, private route: Router) {
    this.idOrder = activatedRoute.snapshot.params.id;
    console.log('El id obtenido es', this.idOrder);

  }

  ngOnInit(): void {
    this.getOrderId();
    // this.getStation();
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

  // getStation() {
  //   this.profileService.getStation()
  //     .subscribe((data: any) => {
  //       this.stationDetail = data;
  //       console.log('Station', this.stationDetail);
  //     }, error => {
  //       console.log(error);
  //       return;
  //     });
  // }



}
