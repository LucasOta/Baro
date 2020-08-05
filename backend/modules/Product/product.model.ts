import { Schema, model, Document } from 'mongoose';


const productSchema = new Schema({

    name: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    description: {
        type: String
    },
    categories: {
        type: [Schema.Types.ObjectId],
        ref: 'Category',
        required: [true, 'Debe de existir una referencia a una categoría']
    },
    imgs: {
        type: [String],
        required: [true, 'Se necesita al menos una imagen']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Debe de existir una referencia a un usuario']
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

productSchema.pre<IProduct>('save', function (next) {
    this.created = new Date();
    next();
});


interface IProduct extends Document {
    name: string;
    description: string;
    categories?: string[];
    imgs?: string[];
    user: string;

    created?: Date;
    modified?: Date;
    deleted?: Date;
}



export const Product = model<IProduct>('Product', productSchema);
