import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { PropertyService } from "../property.service";
import { TradingService } from "../trading.service";
import { MessageService } from "../messages.service";
import { Property} from "../property";
import { TradeInfo} from "../tradeinfo";




@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.css']
})
export class TradeComponent implements OnInit {

  //myChart : Chart;
  tradeInfo: TradeInfo;
  tradeInfoUpdate: TradeInfo
  @Input() property: Property;

  getProperty(): void {
    //Needs to get this property AND get trading details from trading service
    const id = +this.route.snapshot.paramMap.get('id');
    this.propertyService.getProperty(id).subscribe(property=> this.property = property);
    this.tradingService.getTradeInfo(id).subscribe(tradeInfo=>this.tradeInfo=tradeInfo);
  }

  goBack(): void{
    this.location.back();
  }

  buy(): void {
    //TODO add user
    //use this information to record ownership,cash movement, and user
    //Does user have enough cash? Are there enough shares?
    // if so buy number of shares at rate
    // user cash => dealer cash ; dealer shares => user shares
    var numberOfShares = (document.getElementById('Number-of-shares') as HTMLInputElement).value;
    var bidPrice = (document.getElementById('bid-price') as HTMLInputElement).value;
    //this.tradeInfoUpdate = this.tradeInfo;
    this.tradeInfo.numberShares=this.tradeInfo.numberShares-Number(numberOfShares);
    this.tradeInfo.lastPrice=Number(bidPrice) ;
    this.tradingService.updateTradeInfo(this.tradeInfo).subscribe();
    this.log("Trade Info updated!");

    //this.getProperty();
  }


  constructor(
    private location : Location,
    private propertyService: PropertyService,
    private route: ActivatedRoute,
    private tradingService: TradingService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.getProperty();
    //this.makeGraph();
  }


  private log(message: string) {
    this.messageService.add(`PropertyService: ${message}`);
  }

}
