import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/category.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-info-category',
  templateUrl: './info-category.component.html',
  styleUrls: ['./info-category.component.scss']
})
export class InfoCategoryComponent implements OnInit, OnDestroy {
  category: Category
  subscriptionCategory: Subscription;

  constructor(private route: ActivatedRoute, private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.subscriptionCategory = this.categoriesService
    .getCategoryById(Number(this.route.snapshot.params.id))
    .subscribe((data: Category) => {
      this.category = data; 
    });
  }

  ngOnDestroy(): void {
    this.subscriptionCategory.unsubscribe();
  }  
}
