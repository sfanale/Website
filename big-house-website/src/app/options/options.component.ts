import { Component, OnInit } from '@angular/core';
import {OptionPricesService} from "../option-prices.service";
import {Option, Tickers} from "../option";
import { MessageService } from '../messages.service';
import {Stock} from "../stock";
import {Observable} from "rxjs";


@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css'],

})


export class OptionsComponent implements OnInit {

  options: Option[];
  stock: Stock[];
  data: number[];
  tickers: Tickers;

  constructor(
    private optionPriceService: OptionPricesService,
    private messageService: MessageService
  ) { }


  ngOnInit() {
    this.optionPriceService.getAllTickers().subscribe(data=> this.tickers=data);

  }


  getOption(ticker:string, strike:string, expiry: string): void {
    let d = (new Date(expiry).getTime()/1000).toString();
    console.log(d);
    if (d == 'NaN') {
        console.log('Got ya');
        d = '';
    }
    console.log(strike);
    this.optionPriceService.getOption(ticker, strike, d).subscribe(data => {this.options = data} );
    this.optionPriceService.getStock(ticker).subscribe(data=>{this.stock = data});
    // this.messageService.add(this.options[0].symbol);
  }



}
