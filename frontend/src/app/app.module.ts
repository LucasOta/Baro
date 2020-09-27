import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ToastrModule } from "ngx-toastr";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './shared/components/pages/not-found/not-found.component';
import { AuthInterceptor } from "./core/interceptors/auth.interceptor";
import { LanguageInterceptor } from "./core/interceptors/language.interceptor";

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient],
      }
    }),
    ToastrModule.forRoot({
      timeOut: 1500,
      progressBar: true,
      progressAnimation: 'increasing',
      preventDuplicates: true
    })
  ],
  providers: [{
    provide : HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi   : true,
  },
  {
    provide : HTTP_INTERCEPTORS,
    useClass: LanguageInterceptor,
    multi   : true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
