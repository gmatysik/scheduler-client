import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AuthService {
  public clientId = 'first-client';
  public redirectUri = 'http://localhost:4200/login';

  constructor(private myRoute: Router, private _http: HttpClient) { }

  sendToken(token: string) {
    sessionStorage.setItem("LoggedInUser", token)
  }

  retrieveToken(code){
    let params = new URLSearchParams();   
    params.append('grant_type','authorization_code');
    params.append('client_id', this.clientId);
    params.append('redirect_uri', this.redirectUri);
    params.append('code',code);

    let headers = new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8', 'Authorization': 'Basic ' + btoa(this.clientId + ":noonewilleverguess")});
     //this._http.post('http://localhost:8081/spring-security-oauth-server/oauth/token', params.toString(), { headers: headers })
     this._http.post('http://localhost:8080/oauth/token', params.toString(), { headers: headers })
    .subscribe(
      data => this.saveToken(data),
      err => alert('Invalid Credentials')
    ); 
  }

  
  saveToken(token){
    var expireDate = new Date().getTime() + (1000 * token.expires_in);
    Cookie.set("access_token", token.access_token, expireDate);
    console.log('Obtained Access token');
    window.location.href = 'http://localhost:4200';
  }

  
  getResource(resourceUrl) : Observable<any>{
    var headers = new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8', 'Authorization': 'Bearer '+Cookie.get('access_token')});
    console.log("headers: " + headers);
    return this._http.get(resourceUrl, { headers: headers }).pipe(
        catchError((error:any) => Observable.throw(error.json().error || 'Server error'))
    );
  }

  checkCredentials(){
    return Cookie.check('access_token');
  } 

  isLoggednIn() {
    //return sessionStorage.getItem('token');
    return this.checkCredentials();
  }

  logout() {
    Cookie.delete('access_token');    
    sessionStorage.removeItem("token");
    this.myRoute.navigate(["login"]);
  }

}