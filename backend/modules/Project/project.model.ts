import { Schema, Document, model } from 'mongoose';
import { Translation } from "../../classes/translation";


const itemSchema = new Schema({
    order: {
        type: Number
    },
    typeOfItem: {
        type: Number
        // 01 - Title
        // 02 - Description
        // 03 - Video
        // 04 - Image
        // 05 - Image Group
        // 06 - Testimonial
        // 07 - Text + Image
    },
    title: [
        {
            _id:false,
            language: String,
            quote: String,
        }
    ],
    description: [
        {
            _id:false,
            language: String,
            quote: String,
        }
    ],
    video: { //Link
        type: String
    },
    img: [{
        type: String,
        default: 'item_def.jpg'
    }],
    fullWidth: {
        type: Boolean,
        default: false
    },
    testimonial:{
        name: {type: String},
        quote: [
            {
                _id:false,
                language: String,
                quote: String,
            }
        ],
        jobTitle: [
            {
                _id:false,
                language: String,
                quote: String,
            }
        ],
    }

});

const blockSchema = new Schema({

    order: {
        type: Number
    },
    bgColor: {
        type: String
    },
    fontColor: {
        type: String
    },
    items: [itemSchema],

});


const projectSchema = new Schema({

    title: [
        {
            _id:false,
            language: String,
            quote: String,
        }
    ],
    description: [
        {
            _id:false,
            language: String,
            quote: String,
        }
    ],
    coverImg: {
        type: String,
        default: 'project_def.jpg'
    },
    thumbnail: {
        type: String,
        default: 'project_def.jpg'
    },
    featured: {
        type: Boolean,
        default: false
    },
    playground: {
        type: Boolean,
        default: false
    },

    blocks: [blockSchema],

    clients: [{
        type: Schema.Types.ObjectId,
        ref: 'Client'
    }],
    industries: [{
        type: Schema.Types.ObjectId,
        ref: 'Industry'
    }],
    disciplines: [{
        type: Schema.Types.ObjectId,
        ref: 'Discipline'
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

projectSchema.pre<IProject>('save', function (next) {
    this.created = new Date();
    next();
});

export interface IProject extends Document {
    title: [string];
    description: [string];
    coverImg: string;
    thumbnail: string;
    featured: boolean;
    playground: boolean;
    
    blocks: [typeof blockSchema],

    clients: [string],
    industries: [string],
    disciplines: [string],

    created?: Date;
    modified?: Date;
    deleted?: Date;
}


export const Project = model<IProject>('Project', projectSchema);