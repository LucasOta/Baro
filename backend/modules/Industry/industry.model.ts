import { model } from "mongoose";
import { baseInterface, baseSchema } from "../../classes/base";
import { Translation, translationSchema } from "../../classes/translation";

const industrySchema = baseSchema({
  name: [translationSchema],
});

export interface IIndustry extends baseInterface {
  name: Translation[];
}

export const Industry = model<IIndustry>("Industry", industrySchema);
