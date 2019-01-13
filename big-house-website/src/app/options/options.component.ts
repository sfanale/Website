import { Component, OnInit } from '@angular/core';
import {OptionPricesService} from "../option-prices.service";
import { Option } from "../option";
import { MessageService } from '../messages.service';
import {Observable} from "rxjs";


@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css'],

})


export class OptionsComponent implements OnInit {

  options: Option[];
  data: number[];

  constructor(
    private optionPriceService: OptionPricesService,
    private messageService: MessageService
  ) { }


  ngOnInit() {

  }


  getOption(ticker:string, strike:string, expiry:string): void {
    this.optionPriceService.getOption(ticker, strike, expiry).subscribe(data => {this.options = data} );
    // this.messageService.add(this.options[0].symbol);
  }






}
