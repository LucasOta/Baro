import { Schema, Document, model } from 'mongoose';

const categorySchema = new Schema({

    name: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    img: {
        type: String,
        default: 'category_def.jpg'
    },
    subCategories: [{
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }],

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
    name: string;
    img?: string;
    subCategories?: string[];

    created?: Date;
    modified?: Date;
    deleted?: Date;
}

export const Category = model<ICategory>('Category', categorySchema);