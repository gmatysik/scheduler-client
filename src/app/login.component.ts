import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { environment } from '../environments/environment';

@Component({
    selector: 'login',
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
    public isLoggedIn = false;
    model: any = {};

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private http: HttpClient,
        private authService:AuthService
    ) { }

    ngOnInit() {
        this.isLoggedIn = this.authService.checkCredentials();            
        let i = window.location.href.indexOf('code');

        if(!this.isLoggedIn && i != -1){
            this.authService.retrieveToken(window.location.href.substring(i + 5));
        }

    }

    login() {
        window.location.href = environment.authorizationServerUrl + '/oauth/authorize?response_type=code&client_id=' + this.authService.clientId + '&redirect_uri='+ this.authService.redirectUri;
      }
}