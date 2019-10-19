import { Injectable } from '@angular/core';

import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

import {Router} from '@angular/router';

@Injectable()

export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService,

    private myRoute: Router){

  }

  canActivate(

    next: ActivatedRouteSnapshot,

    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        
    if(this.auth.isLoggednIn()){
      console.log("Logged in");
      return true;

    } else {
      sessionStorage.setItem('jumpto', state.url);
      console.log("jumpto: " + state.url);
      
      this.myRoute.navigate(["login"]);

      return false;

    }

  }

}