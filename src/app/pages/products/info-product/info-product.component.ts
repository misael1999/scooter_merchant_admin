import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-info-product',
  templateUrl: './info-product.component.html',
  styleUrls: ['./info-product.component.scss']
})
export class InfoProductComponent implements OnInit, OnDestroy {
  product: Product;
  productSubscription: Subscription;

  constructor(private route: ActivatedRoute, private productsService: ProductsService) { }
  
  ngOnInit(): void {
    this.productSubscription = this.productsService.getProductById(this.route.snapshot.params.id)
    .subscribe((data: Product) => {
      this.product = data;
    });
  }
  
  ngOnDestroy(): void {
    this.productSubscription.unsubscribe();
  }
}
