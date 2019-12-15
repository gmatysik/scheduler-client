import { Component, OnInit } from '@angular/core';
import {AuthService} from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit  {

  searchVisible = false;
  title = 'app';        
  maxDate = new Date(2019, 11, 10);

  constructor(private authService: AuthService) {
   }

  ngOnInit() {
    
  }

  focusOut() : void {
    setTimeout (() => {
      this.searchVisible = false;
    }, 150)
  }

  switchSearch(): void {
    this.searchVisible = !this.searchVisible;    
  }

  isLoggedIn(){
    return this.authService.isLoggednIn();
  }

}