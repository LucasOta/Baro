import { FormGroup, Validators, FormBuilder } from '@angular/forms';

export class Translation {
    language: string;
    quote: string;

    constructor(language: string, quote: string){
        this.language = language;
        this.quote = quote;
    }
}

export function createTranslationForm(){
    const fb = new FormBuilder();
    return fb.group({
        inputEn: ['', [Validators.required]],
        inputEs: ['', []],
        inputDe: ['', []]
      }, [Validators.required])
}

export function setTranslationFormValue(fg: FormGroup, fgName: string, translations: Translation[]){
    fg.get(fgName)['controls'].inputEn.setValue(translations[0].quote);
    fg.get(fgName)['controls'].inputEs.setValue(translations[1].quote);
    fg.get(fgName)['controls'].inputDe.setValue(translations[2].quote);
}

export function getTranslationFormValue(fg: FormGroup, fgName: string){
    return [
        new Translation('en', fg.get(fgName)['controls'].inputEn.value),
        new Translation('es', fg.get(fgName)['controls'].inputEs.value),
        new Translation('de', fg.get(fgName)['controls'].inputDe.value)
    ];
}
