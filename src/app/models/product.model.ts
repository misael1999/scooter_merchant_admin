import { Category } from './category.model';

export class Product {
    constructor(
        public name: string,
        public description: string,
        public description_long: string,
        public stock: number,
        public is_available: boolean,
        public price: number,
        public category_id: number,
        public subcategory_id: number,
        public section_id: number,
        public category: Category,
        public subcategory: any,
        public section: any,
        public picture?: string,
        public id?: number,
        public menu_categories?: Array<any>,
        public menu_categories_add?: Array<any>,
        public menu_categories_update?: Array<any>,
        public menu_categories_delete?: Array<any>,
        public menu_categories_active?: Array<any>,
    ) {}
}
