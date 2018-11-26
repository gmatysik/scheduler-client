import { Injectable } from '@angular/core';

import { Router } from '@angular/router';

@Injectable()

export class AuthService {

  constructor(private myRoute: Router) { }

  sendToken(token: string) {
    sessionStorage.setItem("LoggedInUser", token)
  }

/*  getToken() {

    return localStorage.getItem("LoggedInUser")

  }*/

  isLoggednIn() {
    return sessionStorage.getItem('token');

  }

  logout() {
    sessionStorage.removeItem("token");
    this.myRoute.navigate(["login"]);
  }

}