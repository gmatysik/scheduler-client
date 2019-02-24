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
        //console.log('window.location.href: ' + 'http://192.168.99.100:8081/oauth/authorize?response_type=code&client_id=' + this.authService.clientId + '&redirect_uri='+ this.authService.redirectUri);        
        //window.location.href = 'http://192.168.99.100:8081/oauth/authorize?response_type=code&client_id=' + this.authService.clientId + '&redirect_uri='+ this.authService.redirectUri;
        window.location.href = environment.authorizationServerUrl + '/oauth/authorize?response_type=code&client_id=' + this.authService.clientId + '&redirect_uri='+ this.authService.redirectUri;
        
        //window.location.href = 'http://localhost:8080/oauth/authorize?response_type=code&client_id=' + this.authService.clientId + '&redirect_uri='+ this.authService.redirectUri;    
/*        
        //http://localhost:8080/oauth/authorize?response_type=code&client_id=' + this._service.clientId + '&redirect_uri='+ this._service.redirectUri
        //let url = 'http://localhost:8080/login';
        let url = 'http://localhost:8080/oauth/authorize?response_type=code&client_id=' + this.authService.clientId + '&redirect_uri='+ this.authService.redirectUri;
        //sessionStorage.setItem('token', btoa(this.model.user + ':' + this.model.password));        
        //this.http.post<Observable<boolean>>(url, {
           // user: this.model.user,
           // password: this.model.password
           this.http.get(url)
        //}).subscribe(isValid => {
        .subscribe(isValid => {
            //if (isValid) {
                //this.authService.logout();
                sessionStorage.setItem('token', btoa(this.model.user + ':' + this.model.password));
                                
                if(sessionStorage.getItem('jumpto') != null){
                    this.router.navigate([sessionStorage.getItem('jumpto')]);
                    sessionStorage.removeItem('jumpto');                    
                } else {
                    this.router.navigate(['']);                    
                }
        },
    err => alert('Invalid Credentials'));
    */}
}