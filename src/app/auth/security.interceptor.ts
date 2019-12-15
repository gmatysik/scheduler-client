import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import {AuthService} from './auth.service';
import { Cookie } from 'ng2-cookies';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

    user : String;
    password : String;
    token : String;

    constructor(
        private router: Router,
        private authService : AuthService
    ) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        /*if (req.url.endsWith('/login') && req.method === 'POST') {
            this.user = req.body.user;
            this.password = req.body.password;
            this.token = btoa(this.user + ':' + this.password);
        }*/

        let tokenSet = Cookie.check('access_token');

        /*if (sessionStorage.getItem('token') != null && sessionStorage.getItem('token') != ''){
            this.token = sessionStorage.getItem('token');
        }*/

        //if (sessionStorage.getItem('token') != null && sessionStorage.getItem('token') != '') { // TODO: get from the authService
        //if (this.user != null && this.password != null){
            if(tokenSet){
                this.token = Cookie.get('access_token');
                console.log("Token: " + this.token);
            return next.handle(req.clone({
                setHeaders: {
                    'Authorization': 'Bearer ' + this.token,
                    'Content-Type':  'application/json'
                }
            })).pipe(
                catchError((error: any, caught: Observable<HttpEvent<any>>) =>{
                    if (error.status === 401) {
                        this.router.navigate(['/login']);

                        //sessionStorage.removeItem('token');
                        this.authService.logout();
                        // if you've caught / handled the error, you don't
                        // want to rethrow it unless you also want
                        // downstream consumers to have to handle it as
                        // well.
                        alert("Authentication failed.");
                        return of(error);
                    }
                    throw error;
                })                   
            );
        }
        else {
            return next.handle(req);
        }
    }
}