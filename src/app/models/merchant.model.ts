export class Merchant {
    constructor(
        public id: number,
        public category: string,
        public contact_person: string,
        public information_is_complete: boolean,
        public is_delibery_by_store: boolean,
        public merchant_name: string,
        public phone_number: string,
        public picture: string,
        public reputation: number,
        public subcategory: string,
        public type_menu: number,
        public user: User
    ) {}
}

interface User {
    auth_facebook: boolean;
    is_verified: boolean;
    username: string;
}
