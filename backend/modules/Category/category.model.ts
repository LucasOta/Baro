import { Schema, Document, model } from 'mongoose';
import { Translation } from "../../classes/translation";

const categorySchema = new Schema({

    name: [
        {
            _id:false,
            language: String,
            quote: String,
        }
    ],
    img: {
        type: String,
        default: 'category_def.jpg'
    },
    parent: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },

    created: {
        type: Date
    },
    modified: {
        type: Date
    },
    deleted: {
        type: Date
    }

});

categorySchema.pre<ICategory>('save', function (next) {
    this.created = new Date();
    next();
});

export interface ICategory extends Document {
    name: Translation[];
    img?: string;
    parent?: string;

    created?: Date;
    modified?: Date;
    deleted?: Date;
}

export const Category = model<ICategory>('Category', categorySchema);