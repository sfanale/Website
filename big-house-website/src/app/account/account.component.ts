import {Component, OnInit, Input, OnChanges, Output} from '@angular/core';
import {User } from "../user";
import {UserService} from "../_services/user.service";
import {loggedInUser} from "../_services/user.service";
import {AuthenticationService} from "../_services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit{

  user;


  constructor(private userService: UserService,
              private authService: AuthenticationService,
              private router: Router,
  ) { }

  ngOnInit(){
    if (this.authService.currentUserValue) {
      console.log(this.authService.currentUserValue);
      let token = this.authService.currentUserValue.token;
      this.getUserInfo(token);
    }

  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }



  getUserInfo(token:string) {
    this.userService.getUserInfo(token).subscribe( data => {
      this.user = data;
    });
  }



}
