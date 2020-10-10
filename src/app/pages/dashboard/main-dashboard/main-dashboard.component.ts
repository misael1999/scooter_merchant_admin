import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../../services/categories.service';
import { OrdersService } from '../../../services/orders.service';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss']
})
export class MainDashboardComponent implements OnInit {
  params;
  totalCategories;
  totalProducts;
  totalOrders;

  constructor(
    private categorySerivce: CategoriesService,
    private productService: ProductsService,
    private orderService: OrdersService) { }

  ngOnInit(): void {
    this.getCountCategories();
    this.getCountProducts();
    this.getCountOrders();
  }

  getCountCategories() {
    this.categorySerivce.getCategories(this.params)
      .subscribe((data: any) => {
        this.totalCategories = data.count;
      });
  }

  getCountProducts() {
    this.productService.getProducts(this.params)
      .subscribe((data: any) => {
        this.totalProducts = data.count;
      });
  }

  getCountOrders() {
    this.orderService.getOrders(this.params)
      .subscribe((data: any) => {
        this.totalOrders = data.count;
      });
  }



}
