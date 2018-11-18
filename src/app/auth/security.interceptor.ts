import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (sessionStorage.getItem('token') != null && sessionStorage.getItem('token') != '') { // TODO: get from the authService
            return next.handle(req.clone({
                setHeaders: {
                    'Authorization': 'Basic ' + sessionStorage.getItem('token'),
                    'Content-Type':  'application/json'
                }
            }));
        }
        else {
            return next.handle(req);
        }
    }
}