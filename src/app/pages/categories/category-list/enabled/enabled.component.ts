import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { PageEvent } from '@angular/material/paginator';
import { CategoriesService } from 'src/app/services/categories.service';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ValidationForms } from 'src/app/utils/validations-forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enabled',
  templateUrl: './enabled.component.html',
  styleUrls: ['./enabled.component.scss']
})
export class EnabledComponent extends ValidationForms implements OnInit, OnDestroy {
  categoriesSubscription: Subscription;
  categories: Category[];
  typeMenu;
  orderCategory: boolean;
  searchText;
  @Output() openEditDialog = new EventEmitter<Category>();

  params = {
    limit: 25,
    offset: 0,
    search: '',
    ordering: '',
    status: 1
  };
  loadingCategories: boolean;

  // MatPaginator Inputs
  length = 100;
  pageSize = 25;
  pageSizeOptions: number[] = [25, 50, 75, 100];
  // MatPaginator Output
  pageEvent: PageEvent;

  constructor(private categoriesService: CategoriesService, private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.typeMenu = localStorage.getItem('type_menu');
    this.getCategories(this.params);
  }

  openOrdering() {
    this.router.navigate(['/categories/ordering']);
  }

  editCategory(category) {
    this.openEditDialog.emit(category);
  }

  showList(status) {
    this.params.status = status;
    this.getCategories(this.params);
  }



  blockCategory(id) {
    this.categoriesService.unlockCategory(id)
      .subscribe((data) => {
        console.log(data);
      }, error => {
        console.log(error);
      });
  }

  activeCategory(category) {
    this.categoriesService.unlockCategory(category.id)
      .subscribe((data) => {
        this.showSwalMessage('Categoría activada');
        this.showList(this.params.status = 1);
      }, error => {
        this.showSwalMessage('Error al activar');
      });
  }


  deleteCategory(id, nombre) {
    Swal.fire({
      title: 'Bloquear',
      text: `Esta seguro de bloquear a: ${nombre}`,
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



  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }


  ngOnDestroy(): void {
    this.categoriesSubscription.unsubscribe();
  }

  searchBy(value: string) {
    this.params.search = value;
    this.categoriesService.searchText = value;
    this.getCategories(this.params);
  }

  clearSearch() {
    this.params.search = '';
    this.categoriesService.searchText = '';
    this.searchText = "";
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
    this.loadingCategories = true;
    this.categoriesSubscription = this.categoriesService
      .getCategories(params)
      .subscribe((data: any) => {
        this.categories = data.results;
        this.loadingCategories = false;
        this.length = data.count;
      }, error => {
        this.loadingCategories = false;
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
