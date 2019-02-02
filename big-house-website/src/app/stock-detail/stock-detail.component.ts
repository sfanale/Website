import { Component, OnInit } from '@angular/core';
import { Stock} from "../stock";
import {Location} from "@angular/common";
import {OptionPricesService} from "../_services/option-prices.service";
import {ActivatedRoute} from "@angular/router";
import {optionstools} from "../options-tools";
import {Chart} from 'chart.js';


@Component({
  selector: 'app-stock-detail',
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.css']
})
export class StockDetailComponent implements OnInit {

  stock:Stock[];
  prices=[];
  chart=[];
  dates=[];


  constructor(
    private location : Location,
    private optionPricesService: OptionPricesService,
    private route: ActivatedRoute,
    private optionTools: optionstools
  ) { }

  ngOnInit() {
    this.getStockDetails();
  }

  getStockDetails() {
    const sym = this.route.snapshot.paramMap.get('sym');
    this.optionPricesService.getStock(sym).subscribe( data => {
      this.stock = data;

      console.log(data);

      for (let i of data) {
        this.prices.push(i.regularmarketprice);
        let d_temp = new Date(parseFloat(i.pricedate)*1000);
        console.log(d_temp.getMonth());
        this.dates = this.dates.concat((d_temp.getMonth()+1)+'/'+ d_temp.getDate()+'/'+d_temp.getFullYear());
      }
      console.log(this.dates);

      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: this.dates,
          datasets: [
            {
              data: this.prices,
              borderColor: "#66bb6a",
              fill: false,
              borderWidth:2,
              pointRadius:0,
              hitRadius:5
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
          },
          hover:{
            intersect: true,
            mode: 'x'
          }
        }
      });

    });
  }

  bollingerBands() {
    let bands = this.optionTools.bollingerBands(this.prices, this.dates);
    console.log(bands);
    this.chart = [];
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: bands.dates,
        datasets: [
          {
            data: bands.prices,
            borderColor: "#66bb6a",
            fill: false,
            borderWidth:2,
            pointRadius:0,
            hitRadius:5
          },
          {
            data: bands.upper,
            borderColor: "#42a5f5",
            fill: false,
            borderWidth:2,
            pointRadius:0,
            hitRadius:5
          },
          {
            data: bands.lower,
            borderColor: "#ef5350",
            fill: false,
            borderWidth:2,
            pointRadius:0,
            hitRadius:5
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

  showPrices() {
    this.chart = [];
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
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });
  }

  macd_line() {
    console.log(this.optionTools.macd(this.prices, this.dates));
  }

  five_day() {

  }

  one_month() {

  }

  three_month() {

  }

  one_year() {

  }

  two_year() {

  }

  all_time() {

  }
}
