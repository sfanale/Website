import { Component, OnInit, AfterViewInit } from '@angular/core';
import {OptionPricesService} from "../option-prices.service";
import {Option, Tickers} from "../option";
import { MessageService } from '../messages.service';
import {Stock} from "../stock";
import {Observable} from "rxjs";
import * as $ from 'jquery';
import {Chart} from 'chart.js';
// This is not really an option page so much as a search page


@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css'],

})


export class OptionsComponent implements OnInit {

  options: Option[];
  stock: Stock[];
  data: number[];
  tickers: Tickers[];
  keys = { 'AAPL': null, 'DB':null, 'GOOGL':null, 'MSFT':null};
  chart=[];
  prices=[];
  dates=[];

  constructor(
    private optionPriceService: OptionPricesService,
    private messageService: MessageService
  ) { }




  ngOnInit() {
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.datepicker');
      var instances_date = M.Datepicker.init(elems, {autoClose:true});
    });
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.autocomplete');
      var instances_auto = M.Autocomplete.init(elems, {data:{ 'AAPL': null, 'DB':null, 'GOOGL':null, 'MSFT':null}});
    });
    this.optionPriceService.getAllTickers().subscribe(data=> {
      this.tickers = data;
      console.log(data);
      let formated_data={};
      for (let i of data) {
        formated_data[i.toString()] = null;
      }
      console.log(formated_data);

    });
  }



  getOption(ticker:string, strike:string, expiry: string): void {
    let d = (new Date(expiry).getTime()/1000).toString();
    console.log(d);
    if (d == 'NaN') {
        console.log('Got ya');
        d = '';
    }
    console.log(ticker);
    console.log(strike);
    this.optionPriceService.getOption(ticker, strike, d).subscribe(data => {this.options = data;} );

    this.optionPriceService.getStock(ticker).subscribe(data=>{
      this.stock = data;
      console.log(data);
      for (let i of data) {
        this.prices.push(i.close);
        let d_temp = new Date(i.pricedate*1000);
        console.log(d_temp.getMonth());
        this.dates = this.dates.concat((d_temp.getMonth()+1)+'/'+ d_temp.getDate()+'/'+d_temp.getFullYear());
      }
      console.log(this.prices);

      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: this.dates,
          datasets: [
            {
              data: this.prices,
              borderColor: "#66bb6a",
              fill: false
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: false
            }],
            yAxes: [{
              display: false
            }],
          }
        }
      });
    });
    // this.messageService.add(this.options[0].symbol);
  }



}
