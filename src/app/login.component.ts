import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {

    model: any = {};

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private http: HttpClient,
        private authService:AuthService
    ) { }

    ngOnInit() {
        sessionStorage.setItem('token', '');
    }

    login() {
        let url = 'http://localhost:8080/login';
        //sessionStorage.setItem('token', btoa(this.model.user + ':' + this.model.password));        
        this.http.post<Observable<boolean>>(url, {
            user: this.model.user,
            password: this.model.password
        }).subscribe(isValid => {
            //if (isValid) {
                //this.authService.logout();
                sessionStorage.setItem('token', btoa(this.model.user + ':' + this.model.password));
                                
                if(sessionStorage.getItem('jumpto') != null){
                    this.router.navigate([sessionStorage.getItem('jumpto')]);
                    sessionStorage.removeItem('jumpto');                    
                } else {
                    this.router.navigate(['']);                    
                }
        });
    }
}