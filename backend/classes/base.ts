import { Schema } from "mongoose";

export const baseSchema = (schema: any) => {
  const baseSchema = new Schema({
    ...schema,
    created: {
      type: Date,
    },
    modified: {
      type: Date,
    },
    deleted: {
      type: Date,
    },
  });

  baseSchema.pre("save", function (next) {
    this.created = new Date();
    next();
  });

  return baseSchema;
};

export interface baseInterface extends Document {
  created?: Date;
  modified?: Date;
  deleted?: Date;
}
