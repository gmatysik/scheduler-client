import { Component, OnInit } from '@angular/core';
import {AuthService} from './auth/auth.service';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TaskDialogComponent } from './task/task-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit  {

  searchVisible = false;
  title = 'app';        
  maxDate = new Date(2019, 11, 10);

  constructor(private authService: AuthService, public matDialog: MatDialog) {
   }

   openModal() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "350px";
    dialogConfig.width = "600px";
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(TaskDialogComponent, dialogConfig);
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