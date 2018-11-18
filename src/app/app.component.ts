import { Component, OnInit } from '@angular/core';
import {AuthService} from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit  {
  title = 'app';        
  maxDate = new Date(2019, 11, 10);

  constructor(private authService: AuthService) {
   }

  ngOnInit() {
    
  }

  isLoggedIn(){
    return this.authService.isLoggednIn();
  }

}