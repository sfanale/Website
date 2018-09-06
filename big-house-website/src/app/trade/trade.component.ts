import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { PropertyService } from "../property.service";
import { TradingService} from "../trading.service";
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


  constructor(
    private location : Location,
    private propertyService: PropertyService,
    private route: ActivatedRoute,
    private tradingService: TradingService
  ) { }

  ngOnInit() {
    this.getProperty();
    //this.makeGraph();
  }

}
