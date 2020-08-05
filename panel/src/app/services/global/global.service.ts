import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  URL_TEST = 'http://localhost:3000';
  URL_PROD = '';

  isProd = false;
  constructor() { }

  public getURL(): string {
    if (this.isProd) {
      return this.URL_PROD;
    } else {
      return this.URL_TEST;
    }
  }

}
