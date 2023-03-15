import {Injectable} from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import {delay, finalize, Observable, of, throwError} from 'rxjs';
import {Router} from "@angular/router";
import {catchError} from "rxjs/operators";

@Injectable()
export class GlobalHttpInterceptor implements HttpInterceptor {

  //, public loaderService:LoaderService
  constructor(public router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      finalize(() => {
        }
      ),
      catchError((error) => {
        let handled: boolean = false;
        console.error(error);
        if (error instanceof HttpErrorResponse) {
          if (error.error instanceof ErrorEvent) {
            console.error("Error Event");
          } else {
            console.log(`error status : ${error.status} ${error.statusText}`);
            switch (error.status) {
              case 401:      //login
                this.router.navigateByUrl("/login");
                handled = true;
                break;
              case 403:     //forbidden
                this.router.navigateByUrl("/404");
                handled = true;
                break;
              case 0:
                this.router.navigateByUrl("/backend-not-alive")
                handled = true;
                break
            }
          }
        } else {
          console.error("Other Errors");
        }

        if (handled) {
          console.log('return back ');
          return of(error);
        } else {
          console.log('throw error back to to the subscriber');
          return throwError(error);
        }
      }));
  }
}

export const GlobalHttpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: GlobalHttpInterceptor, multi: true}
];
