import {Component, OnInit, Input, OnChanges, Output} from '@angular/core';
import {User } from "../user";
import {MessageService} from "../messages.service";
import {TradingService} from "../trading.service";
import { TradeInfo } from "../tradeinfo";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnChanges{

  @Input() user:User;
  @Input() holdingsTradeInfo:TradeInfo[];



  constructor(private messageService:MessageService,
              private tradingService:TradingService) { }

  ngOnChanges() {
    this.log(this.user.username)
  }


  private log(message: string) {
    this.messageService.add(`Accounts: ${message}`);
  }

}
