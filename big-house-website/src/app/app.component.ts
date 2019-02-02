import {Component, OnInit} from '@angular/core';
import * as M from '../../node_modules/materialize-css/dist/js/materialize.min.js';
import '../../node_modules/autotrack/autotrack.js'
import {AuthenticationService} from "./_services/authentication.service";
import {UserService} from "./_services/user.service";
import {User} from "./user";
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Fanale Research';

  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
      console.log(user);
    });
  }

  ngOnInit() {
    var elems = document.querySelectorAll('.sidenav');
    let options = {edge : "right"};
    var instances = M.Sidenav.init(elems, options);
  }

}
