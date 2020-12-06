import { Language } from './shared/models/language';

export interface AppState {
  readonly formLanguage: Language;
  readonly generalLanguage: Language;
  readonly formSubmitted: Boolean;
}