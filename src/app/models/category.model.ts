export class Category {
    constructor(
        public name: string,
        public id?: number,
        public subcategories?: Array<any>,
        public picture?: string
    ) {}
}
