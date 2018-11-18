import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Component({
    template: ''
  })
  
  export class LogoutComponent implements OnInit {
  
    constructor(private _authService: AuthService, private router: Router) {}
  
    ngOnInit() {
      this._authService.logout();
      this.router.navigate(['login']);
    }
  
  }