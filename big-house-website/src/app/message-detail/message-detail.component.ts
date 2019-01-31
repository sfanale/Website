import { Component, OnInit } from '@angular/core';
import {OptionPricesService} from "../_services/option-prices.service";
import {UserService} from "../_services/user.service";
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {Messages} from "../messages";
import {User} from "../user";
import {timestamp} from "rxjs/operators";
import * as angular from "@angular/core/src/render3/jit/environment";

@Component({
  selector: 'app-message-detail',
  templateUrl: './message-detail.component.html',
  styleUrls: ['./message-detail.component.css']
})
export class MessageDetailComponent implements OnInit {

  chat: Messages[];
  currentUser= new User();

  constructor(
    private optionsPriceService: OptionPricesService,
    private userService: UserService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.get_chat();
    this.get_group();
  }

  get_group() {
    // todo: get one message group info

  }
  get_chat() {
    // todo: switch this to be a child component
    const id = this.route.snapshot.paramMap.get('id');
    this.userService.get_chat(id).subscribe(data=> {this.chat=data;});
  }

  send_message(message: string) {
    let user = this.currentUser;
    user.id = '2';
    user.username= 'stephenfanale';
    let timestamp = Date.now() / 1000 | 0;
    let message_group = this.route.snapshot.paramMap.get('id');
    this.userService.send_message(message, user.id, user.username, timestamp.toString(), message_group);
    this.clear_form();
    this.get_chat();
  }


  clear_form() {
    document.getElementById('message').innerText = "";
  }

}
