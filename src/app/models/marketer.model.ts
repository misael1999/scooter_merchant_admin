export class Marketer {
    constructor(
        public id: number,
        public full_name: string,
        public created: string,
        public modified: string,
        public phone_number: string,
        public status: number,
        public picture: string,
        public refresh: string,
        public user: User
    ) {}
}

class User {
    constructor(
        public auth_facebook: boolean,
        public is_verified: boolean,
        public username: string
    ){}
}