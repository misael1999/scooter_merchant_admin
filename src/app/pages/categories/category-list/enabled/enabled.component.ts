import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { PageEvent } from '@angular/material/paginator';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-enabled',
  templateUrl: './enabled.component.html',
  styleUrls: ['./enabled.component.scss']
})
export class EnabledComponent implements OnInit, OnDestroy {
  categoriesSubscription: Subscription;
  categories: Category[];

  params = {
    limit: 15,
    offset: 0,
    search: '',
    ordering: '',
    status: 1
  }

   // MatPaginator Inputs
   length = 100;
   pageSize = 25;
   pageSizeOptions: number[] = [25, 50, 75, 100];
   // MatPaginator Output
   pageEvent: PageEvent;
   
  constructor(private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.getCategories(this.params);
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
