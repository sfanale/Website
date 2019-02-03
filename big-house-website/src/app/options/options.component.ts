import { Component, OnInit, OnChanges } from '@angular/core';
import {OptionPricesService} from "../_services/option-prices.service";
import {Option, Tickers} from "../option";
import { MessageService } from '../_services/messages.service';
import {Stock} from "../stock";
import {Observable} from "rxjs";
import * as $ from 'jquery';
import {Chart} from 'chart.js';
import * as M from '../../../node_modules/materialize-css/dist/js/materialize.min.js';
import {Router} from "@angular/router";


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
  flag = false;
  formatted_tickers;

  constructor(
    private optionPriceService: OptionPricesService,
    private messageService: MessageService,
    private router: Router,
  ) {

  }



  ngOnInit() {
    var elems = document.querySelectorAll('.datepicker');
    var datepicker = M.Datepicker.init(elems, {autoClose:true});


    let data= {};

    //autocomp.open();

    this.init();
    this.optionPriceService.getAllTickers().subscribe(data=> {
      this.tickers = data;
      console.log(data);
      let formated_data={};
      for (let i of data) {

        formated_data[`${i['underlyingsymbol']}`] = null;
      }
      this.formatted_tickers = formated_data;
      console.log(formated_data);
      var elems = document.querySelectorAll('.autocomplete');
      var autocomp = M.Autocomplete.init(elems, {data:formated_data});
    });
    setTimeout(function() {
        var elems = document.querySelectorAll('.carousel');
        let options = {};
        var instances = M.Carousel.init(elems, options);
      }
    ,1000 );
  }


  init() {


  }




  getOption(ticker:string, strike:string, expiry: string, event=null): void {
    if (event==null || event.keyCode==13) {
      if (ticker in this.formatted_tickers && (expiry=='' || strike=='')) {
        this.router.navigate([`/research/stocks/${ticker}`]);
      }
      this.flag = true;
      let d = (new Date(expiry).getTime() / 1000).toString();
      console.log(d);
      if (d == 'NaN') {
        console.log('Got ya');
        d = '';
      }
      console.log(ticker);
      console.log(strike);
      this.optionPriceService.getOption(ticker, strike, d).subscribe(data => {
        this.options = data;
      });

      this.optionPriceService.getStock(ticker).subscribe(data => {
          this.stock = data;
          this.prices = [];
          this.dates = [];
          for (let i of data) {
            this.prices.push(i.regularmarketprice);
            let d_temp = new Date(parseFloat(i.pricedate) * 1000);
            this.dates = this.dates.concat((d_temp.getMonth() + 1) + '/' + d_temp.getDate() + '/' + d_temp.getFullYear());
          }
          this.chart = new Chart('canvas', {
            type: 'line',
            data: {
              labels: this.dates,
              datasets: [
                {
                  data: this.prices,
                  borderColor: "#66bb6a",
                  fill: false,
                  borderWidth: 2,
                  pointRadius: 0,
                  hitRadius: 5
                }
              ]
            },
            options: {
              legend: {
                display: false
              },
              scales: {
                xAxes: [{
                  type: 'time',
                  time: {
                    unit: 'month'
                  },
                  display: true,
                  color: 'rgba(0, 0, 0, 0)'
                }],
                yAxes: [{
                  display: true,
                  color: 'rgba(0, 0, 0, 0)'
                }],
              }
            }
          });
        }
      );

    }
    else {
      console.log(event.keyCode);
    }

  }




}
