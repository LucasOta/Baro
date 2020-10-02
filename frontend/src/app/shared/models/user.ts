export class User {
    id: number;
    name: string;
    email: string;
    level: number;
    password: string;

    created: Date;
    modified: Date;
    deleted: Date;

    token: string;
}