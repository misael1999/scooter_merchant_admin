import { Pipe, PipeTransform } from '@angular/core';
import { Category } from '../models/category.model';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {

  transform(value: number, categories: Category[]): string {
    return categories.filter((category: Category) => category.id === value)[0].name;
  }

}
