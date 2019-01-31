import {Component, OnInit, Input, OnChanges, Output} from '@angular/core';
import {User } from "../user";
import {UserService} from "../_services/user.service";
import {loggedInUser} from "../_services/user.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit{

  user;
  loggedinuser=loggedInUser;


  constructor(private userService: UserService
  ) { }

  ngOnInit(){

  }

  login(username:string, password:string) {
    let body = {'username': username, 'password':password};
    console.log(body);
    this.userService.login(body).subscribe(data=>{
      this.user=data;
      this.getUserInfo(this.user.id);
    });

  }

  getUserInfo(id:string) {
    this.userService.getUserInfo(id).subscribe( data => {
      this.user = data;
    });
  }



}
