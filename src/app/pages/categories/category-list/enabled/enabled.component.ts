import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { PageEvent } from '@angular/material/paginator';
import { CategoriesService } from 'src/app/services/categories.service';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-enabled',
  templateUrl: './enabled.component.html',
  styleUrls: ['./enabled.component.scss']
})
export class EnabledComponent implements OnInit, OnDestroy {
  categoriesSubscription: Subscription;
  categories: Category[];
  typeMenu;
  @Output() openEditDialog = new EventEmitter<Category>();

  params = {
    limit: 15,
    offset: 0,
    search: '',
    ordering: '',
    status: 1
  };

  // MatPaginator Inputs
  length = 100;
  pageSize = 25;
  pageSizeOptions: number[] = [25, 50, 75, 100];
  // MatPaginator Output
  pageEvent: PageEvent;

  constructor(private categoriesService: CategoriesService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.typeMenu = localStorage.getItem('type_menu');
    this.getCategories(this.params);
  }

  editCategory(category) {
    this.openEditDialog.emit(category);
  }


  blockCategory(id) {
    this.categoriesService.unlockCategory(id)
      .subscribe((data) => {
        console.log(data);
      }, error => {
        console.log(error);
      });
  }

  deleteCategory(id, nombre) {
    Swal.fire({
      title: 'Bloquear',
      text: `Esta seguro de bloquear a ${nombre}`,
      type: 'warning',
      showConfirmButton: true,
      confirmButtonText: 'Bloquear',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
    }).then(resp => {
      if (resp.value) {
        // this.categories.splice(1);
        this.categoriesService.deleteCategory(id)
          .subscribe(data => {
            Swal.fire({
              title: 'Bloqueado',
              type: 'success',
              text: 'El repartidor ha sido bloqueado',
              timer: 2000
            });
            this.getCategories(this.params);
          });

      }
    });
  }



  ngOnDestroy(): void {
    this.categoriesSubscription.unsubscribe();
  }

  searchBy(search: string): void {
    this.params.search = search;
    this.getCategories(this.params);
  }

  orderBy(orderValue: string): void {
    this.params.ordering = orderValue;
    this.getCategories(this.params);
  }

  getCategories(params = {}): void {
    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe();
    }
    this.categoriesSubscription = this.categoriesService
      .getCategories(params)
      .subscribe((data: any) => {
        console.log(data);
        this.categories = data.results;
        this.length = data.count;
      });
  }

  getPage(e: any): PageEvent {
    if (this.categories.length === 0) {
      this.pageSize = 15;
      return;
    }
    this.params.limit = e.pageSize;
    this.params.offset = this.params.limit * e.pageIndex;
    this.getCategories(this.params);
  }
}
