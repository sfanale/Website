import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Routes, RouterModule  } from '@angular/router';

import { PropertyService } from "../property.service";
import { TradingService } from "../trading.service";
import { MessageService } from "../messages.service";
import { User,Holding} from "../user";
import { UserService } from "../user.service";
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {Property} from "../property";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  //holdings: Holding[];


  @Input() user: User;


  constructor(private userService:UserService,
  private location : Location,
  private propertyService: PropertyService,
  private route: ActivatedRoute,
  private tradingService: TradingService,
  private messageService: MessageService) {

  }

  getUser():void {
    // if already logged in show account page
    // else make someone log in
    const userId = +this.route.snapshot.paramMap.get('id');
    this.userService.getUser(userId).subscribe(user=>this.user=user );
    //this.userService.getUser(this.username).subscribe(user=>this.holdings=user.holdings);
  }

  logIn():void {
    const username = (document.getElementById('username') as HTMLInputElement).value.toString();
    // TODO - search for user ID using username
    const userId = 1;
    window.location.href = `account/${userId}`;
  }

  ngOnInit() {
    this.getUser();
  }

}
