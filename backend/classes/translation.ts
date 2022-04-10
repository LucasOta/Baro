export class Translation {
  language: string = "";
  quote: string = "";
}

export const translationSchema = {
  _id: false,
  language: String,
  quote: {
    type: String,
    required: [
      function () {
        return this.language === "en";
      },
      "English translation is required",
    ],
  },
};
