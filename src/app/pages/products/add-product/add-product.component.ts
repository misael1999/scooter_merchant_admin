import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';
import { MatDialog } from '@angular/material/dialog';
import { MunuCategoryDialogComponent } from './munu-category-dialog/munu-category-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

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
  categorySelected;
  subcategorySelected;
  storeDataSubscription: Subscription;
  categoriesSubscription: Subscription;
  productSubscription: Subscription;
  panelOpenState = false;
  loadingSave = false;
  menus = []
  typeMenu;
  loadingInfoProduct;

  // Cuando se va actualizar un nuevo producto
  product: Product;
  menu_categories_update = []
  menu_categories_delete = []
  menu_categories_add = []
  menu_categories_active = []


  constructor(
    private productsService: ProductsService,
    private router: Router,
    private categoriesService: CategoriesService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snack: MatSnackBar
  ) {
    this.typeMenu = localStorage.getItem('type_menu');
    if (this.typeMenu == 3) {
      this.buildFormMenuThree();
    }
    else if (this.typeMenu == 2) {
      this.buildFormMenuTwo();
    }
    else {
      this.buildForm();
    }
    this.id = this.route.snapshot.params.id;
  }

  ngOnInit(): void {
    this.categoriesSubscription = this.categoriesService
      .getCategories({ status: 1 })
      .subscribe((data: any) => {
        this.categories = data.results;
        if (this.id) {
          this.loadingInfoProduct = true;
          this.productSubscription = this.productsService.getProductById(this.id)
            .subscribe((data: Product) => {
              this.loadingInfoProduct = false;
              this.product = data;
              this.setFormData(data);
            }, error => {
              this.loadingInfoProduct = false;
            });
        }
      });
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
      stock: [100],
      price: ['', [Validators.required]],
      category_id: ['', [Validators.required]]
    });
  }

  buildFormMenuThree() {
    this.group = this.builder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      stock: [100],
      price: ['', [Validators.required]],
      category_id: ['', [Validators.required]],
      subcategory_id: ['', [Validators.required]],
      section_id: ['', [Validators.required]],
    });
  }
  buildFormMenuTwo() {
    this.group = this.builder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      stock: [100],
      price: ['', [Validators.required]],
      category_id: ['', [Validators.required]],
      subcategory_id: ['', [Validators.required]],
    });
  }

  selectCategory(categoryId) {
    this.categorySelected = this.categories.find(category => category.id == categoryId);
  }

  selectSubcategory(subcategoryId) {
    this.subcategorySelected = this.categorySelected.subcategories.find(subcategory => subcategory.id == subcategoryId);
  }

  setFormData({ name, description, category_id, subcategory_id, section_id, stock, price, picture, menu_categories }: Product): void {
    this.categorySelected = this.categories.find(category => category.id == category_id);
    if (this.categorySelected != undefined && this.categorySelected.subcategories) {
      this.subcategorySelected = this.categorySelected.subcategories.find(subcategory => subcategory.id == subcategory_id);
    }
    this.group.get('name').setValue(name);
    this.group.get('description').setValue(description);
    this.group.get('category_id').setValue(category_id);
    this.group.get('price').setValue(price);
    this.imageURL = picture;
    this.menus = menu_categories;
    if (subcategory_id) {
      this.group.get('subcategory_id').setValue(subcategory_id);
    }
    if (section_id) {
      this.group.get('section_id').setValue(section_id);
    }

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
    if (this.group.invalid) {
      this.group.markAllAsTouched();
      return;
    }

    if (this.id) {
      product.id = this.id;
      if (this.imageURL != null) {
        if (this.imageURL.includes('https')) {
          delete product.picture;
        } else {
          product.picture = this.imageURL;
        }
      }
      delete product.menu_categories;
      product.menu_categories_update = this.menu_categories_update;
      product.menu_categories_add = this.menu_categories_add;
      product.menu_categories_delete = this.menu_categories_delete;
      product.menu_categories_active = this.menu_categories_active;
      this.updateProduct(product);
    } else {
      this.saveProduct(product);
    }
  }

  editMenuCategory(menu, idx) {
    const dialogRef = this.dialog.open(MunuCategoryDialogComponent, {
      disableClose: true,
      width: '40%',
      minWidth: '600px',
      panelClass: 'custom-dialog-container',
      data: { menu }
    });

    dialogRef.afterClosed().subscribe(data => {
      if (typeof data == 'object') {
        this.menus[idx] = data;
        if (data.id != null) {
          // Verificar que no exista el menu con ese id
          const indexFound = this.menu_categories_update.findIndex((menu) => menu.id == data.id);
          if (indexFound < 0) {
            this.menu_categories_update.push(data);
            return;
          }
          this.menu_categories_update[indexFound] = data;
          return;
        }
        const indexMenu = this.menu_categories_add.findIndex((menu) => menu.name == data.name);
        this.menu_categories_add[indexMenu] = data;
        // Buscar el menú que es nuevo y para guardar

      }
    });

  }

  disabledMenuCategory(menu, idx) {
    delete menu.status;
    if (menu.id == null) {
      Swal.fire({
        title: 'Eliminar',
        text: `Esta seguro de eliminar a: ${menu.name}`,
        type: 'warning',
        showConfirmButton: true,
        confirmButtonText: 'Eliminar',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
      }).then(resp => {
        this.menus.splice(idx, 1);
      });
      return;
    }
    menu.to_disable = true;
    // Verificar que no este en el listado de menu para activar
    const idxMenu = this.menu_categories_active.findIndex((menu2) => menu2.id == menu.id);
    if (idxMenu >= 0) {
      this.menu_categories_active.splice(idxMenu, 1);
      return;
    }
    this.menu_categories_delete.push(menu);
  }

  enableMenuCategory(menu) {
    delete menu.status;
    menu.to_disable = false;
    const idx = this.menu_categories_delete.findIndex((menu) => menu.id == menu.id);
    if (idx >= 0) {
      this.menu_categories_delete.splice(idx, 1);
      return;
    }
    this.menu_categories_active.push(menu);
  }

  openMenuDialog() {
    const dialogRef = this.dialog.open(MunuCategoryDialogComponent, {
      disableClose: true,
      width: '40%',
      minWidth: '600px',
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(data => {
      if (typeof data == 'object') {
        this.menus.push(data);
        if (this.product) {
          this.menu_categories_add.push(data);
        }
      }
    });
  }

  saveProduct(product: Product): void {
    if (this.menus.length > 0) {
      product.menu_categories = this.menus;
    }
    if (this.imageURL != null) {
      product.picture = this.imageURL;
    }
    this.loadingSave = true;
    this.storeDataSubscription = this.productsService.addProduct(product)
      .subscribe((data: any) => {
        this.loadingSave = false;
        this.showMessageSuccess('Se ha guardado el producto');
        this.router.navigate(['/products']);
      }, error => {
        this.loadingSave = false;
        this.showMessageError(error.error.errors.message);
      });
  }

  showMessageError(message) {
    return this.snack.open(message, '', {
      duration: 5000,
      panelClass: 'error-snackbar'
    });
  }
  showMessageSuccess(message) {
    return this.snack.open(message, '', {
      duration: 3000,
      panelClass: 'main-snackbar'
    });
  }

  updateProduct(product: Product): void {
    this.loadingSave = true;
    this.storeDataSubscription = this.productsService.updateProduct(product)
      .subscribe((data: any) => {
        this.router.navigate(['/products']);
      }, error => {
        this.loadingSave = true;
        alert(error.errors.message);
      });
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
}
