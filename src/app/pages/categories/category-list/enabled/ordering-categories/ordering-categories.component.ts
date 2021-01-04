import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../../../../services/categories.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ordering-categories',
  templateUrl: './ordering-categories.component.html',
  styleUrls: ['./ordering-categories.component.scss']
})
export class OrderingCategoriesComponent implements OnInit {
  categoriesSubscription: Subscription;
  categories: Array<any>;
  length = 100;

  params = {
    limit: 200,
    offset: 0,
    search: '',
    ordering: '',
    status: 1
  };

  constructor(private categoriesService: CategoriesService, private  router: Router) { }

  ngOnInit(): void {
    this.getCategories(this.params);
  }


  getCategories(params = {}): void {
    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe();
    }
    this.categoriesSubscription = this.categoriesService
      .getCategories(params)
      .subscribe((data: any) => {
        this.categories = data.results;
        this.length = data.count;
      });
  }




  drop(event: CdkDragDrop<string[]>) {


    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      // console.log('La posision que esta', event.);

      console.log('La posision que esta', event.previousIndex);
      console.log('La posision a la que se movio', event.currentIndex);


    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);

    }
    console.log(this.categories);
  }

  saveOrderingCategories() {
    this.categoriesService.updateOrderingCategories(this.categories)
    .subscribe((data: any) =>{
      this.router.navigate(['/categories']);
    })

  }
}
