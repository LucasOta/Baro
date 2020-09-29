import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlertService } from "../../shared/services/alert.service";

@Injectable()
export class SuccessInterceptor implements HttpInterceptor {

  constructor(private alertService: AlertService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
              if  ( event.status === 200 && event.body.desc ){
                this.alertService.success( event.body.desc );
              }
              if  ( event.status === 201 ){
                this.alertService.success( event.body.desc || 'Element Created' );
              }
          }
          return event;
      }));
  }
}
