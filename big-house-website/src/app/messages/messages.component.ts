import { Component, OnInit, Input } from '@angular/core';
import { UserService} from "../user.service";
import {MessageService} from "../messages.service";
import {MessageGroup} from "../messages";


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  message_groups: MessageGroup[];

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getMessageGroups('2');
  }

  getMessageGroups(id:string) {
    this.userService.get_message_groups(id).subscribe(data=>{
      this.message_groups = data;
    })
  }

}
