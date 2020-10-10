import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit, OnDestroy {
  builder: FormBuilder = new FormBuilder();
  group: FormGroup;
  imageURL: string;
  id: number;
  categories: Category[];
  storeDataSubscription: Subscription;
  categoriesSubscription: Subscription;
  productSubscription: Subscription;

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private categoriesService: CategoriesService,
    private route: ActivatedRoute
  ) {
    this.buildForm();
    this.id = this.route.snapshot.params.id;
  }

  ngOnInit(): void {
    this.categoriesSubscription = this.categoriesService
    .getCategories({status: 1})
    .subscribe((data: any) => {
      this.categories = data.results;
    });
    if (this.id) {
      this.productSubscription = this.productsService.getProductById(this.id)
      .subscribe((data: Product) => {
        this.setFormData(data);
      });
    }
  }

  ngOnDestroy(): void {
    if (this.storeDataSubscription) {
      this.storeDataSubscription.unsubscribe();
    }

    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }

    this.categoriesSubscription.unsubscribe();
  }

  buildForm(): void {
    this.group = this.builder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      description_long: ['', [Validators.required]],
      stock: ['', [Validators.required]],
      price: ['', [Validators.required]],
      category_id: ['', [Validators.required]]
    });
  }

  setFormData({name, description, description_long, category_id, stock, price, picture}: Product): void {
    this.group.get('name').setValue(name);
    this.group.get('description').setValue(description);
    this.group.get('description_long').setValue(description_long);
    this.group.get('category_id').setValue(category_id);
    this.group.get('stock').setValue(stock);
    this.group.get('price').setValue(price);
    this.imageURL = picture;
  }

  handlePickUpImage(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imageURL = String(reader.result);
    }
  }

  sendData(product: Product): void {
    if (!/'https'/.test(this.imageURL)) {
      product.picture = this.imageURL;
    }

    if (this.id) {
      product.id = this.id;
      delete product.picture;
      this.updateProduct(product);
    } else {
      this.saveProduct(product);
    }
  }

  isFieldInvalid(field: string): boolean {
    return (this.group.get(field).invalid && this.group.get(field).touched);
  }

  isFieldValid(field: string): boolean {
    return (this.group.get(field).valid && this.group.get(field).touched);
  }

  hasFieldError(field: string, errorcode: string): boolean {
    return (this.group.get(field).hasError(errorcode));
  }

  saveProduct(product: Product): void {
    this.storeDataSubscription = this.productsService.addProduct(product)
    .subscribe((data: any) => {
      console.log(data);
      this.router.navigate(['/products']);
    });
  }

  updateProduct(product: Product): void {
    this.storeDataSubscription = this.productsService.updateProduct(product)
    .subscribe((data: any) => {
      console.log(data);
      this.router.navigate(['/products']);
    });
  }
}
