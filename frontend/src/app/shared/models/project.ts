import { Translation } from "./translation";
import { Client } from "./client";
import { Industry } from "./industry";
import { Discipline } from "./discipline";

export class Project {
    _id?: number;
    title: Translation[];
    description: Translation[];

    coverImg: string;
    thumbnail: string;

    featured: boolean;
    playground: boolean;

    blocks: any[]; //TODO: Define

    clients: Client[];
    industries: Industry[];
    disciplines: Discipline[];

    created?: Date;
    modified?: Date;
    deleted?: Date;
}