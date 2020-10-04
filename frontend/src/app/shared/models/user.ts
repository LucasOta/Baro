export class User {
    _id: number;
    name: string;
    email: string;
    level: number;
    password: string;

    created: Date;
    modified: Date;
    deleted: Date;

    token: string;
}