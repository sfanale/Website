import {Component, Input, OnInit, OnChanges} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SimpleChanges } from "@angular/core";
import { PropertyService } from "../property.service";
import { TradingService } from "../trading.service";
import { MessageService } from "../messages.service";
import { User,Holding} from "../user";
import { UserService, loggedInUser } from "../user.service";
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {Property} from "../property";
import {TradeInfo} from "../tradeinfo";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  user=loggedInUser;
  username:string;
  holdingsTradeInfo:TradeInfo[];
  userHoldingsTradeInfo:TradeInfo[];

  constructor(private userService:UserService,
  private propertyService: PropertyService,
  private tradingService: TradingService,
  private messageService: MessageService) {
  }

  getUser():void {
    this.username=this.user.username;
    this.log(this.username);
    this.userService.getUser(this.username).subscribe(user=>this.user=user );
    //this.getAccountDetails();

  }

  logIn():void {
    this.username = (document.getElementById('username') as HTMLInputElement).value.toString();
    const password = (document.getElementById('password') as HTMLInputElement).value.toString();
    this.userService.changeUser(this.username,password).subscribe(user=>this.user=user);
    this.log(this.holdingsTradeInfo[0].toString())
  }

  ngOnInit() {
    this.getUser();
    this.tradingService.getTradeInfoAll().subscribe(info=>this.holdingsTradeInfo=info);
  }

  getAccountDetails(): void {
    let x=0;
    let y=0;
    while(y<=this.user.holdings.length && x<=this.holdingsTradeInfo.length) {    // this requires that the users holdings are kept in id order
      if (this.holdingsTradeInfo[x].id==this.user.holdings[y].id) {
        this.log('found one')
        this.userHoldingsTradeInfo.push(this.holdingsTradeInfo[x]);
        y++;
      }
      else {x++;}
    }
  }



  private log(message: string) {
    this.messageService.add(`Accounts: ${message}`);
  }

}
