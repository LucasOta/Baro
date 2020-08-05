
import { Schema, Document, model } from 'mongoose';

const postSchema = new Schema({

    mensaje: {
        type: String
    },
    imgs: [{
        type: String
    }],
    coords: {
        type: String   // -13.313123, 12.3123123
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

postSchema.pre<IPost>('save', function (next) {
    this.created = new Date();
    next();
});

interface IPost extends Document {
    mensaje: string;
    img?: string[];
    coords?: string;
    user: string;

    created?: Date;
    modified?: Date;
    deleted?: Date;
}

export const Post = model<IPost>('Post', postSchema);
