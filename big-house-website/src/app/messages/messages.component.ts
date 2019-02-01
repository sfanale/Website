import { Component, OnInit, Input } from '@angular/core';
import { UserService} from "../_services/user.service";
import {MessageService} from "../_services/messages.service";
import {MessageGroup} from "../messages";
import {AuthenticationService} from "../_services/authentication.service";


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  message_groups: MessageGroup[];



  constructor(
    private userService: UserService,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    if (this.authService.currentUserValue) {
      console.log(this.authService.currentUserValue);
      let token = this.authService.currentUserValue.token;
      this.getMessageGroups(token);
    }


  }

  getMessageGroups(token:string) {
    this.userService.get_message_groups(token).subscribe(data=>{
      this.message_groups = data;
    })
  }

}
