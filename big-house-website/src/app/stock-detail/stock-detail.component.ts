import { Component, OnInit } from '@angular/core';
import { Stock} from "../stock";
import {Location} from "@angular/common";
import {OptionPricesService} from "../_services/option-prices.service";
import {ActivatedRoute} from "@angular/router";
import {optionstools} from "../options-tools";
import {Chart} from 'chart.js';
import {NewsService} from "../_services/news.service";


@Component({
  selector: 'app-stock-detail',
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.css']
})
export class StockDetailComponent implements OnInit {

  stock:Stock[];
  prices=[];
  chart: Chart;
  dates=[];
  news;
  b_bands_toggle=false;
  b_band_dates;


  constructor(
    private location : Location,
    private optionPricesService: OptionPricesService,
    private route: ActivatedRoute,
    private optionTools: optionstools,
    private newsService: NewsService
  ) { }

  ngOnInit() {
    this.getStockDetails();
    this.getNews();
  }

  getNews(){
    this.newsService.get_news(this.route.snapshot.paramMap.get('sym')).subscribe(data=>{
      this.news=data.articles.slice(0,5);
    });
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
    let bands;
    let new_data;
    let new_label;
    if (!this.b_bands_toggle) {
    bands = this.optionTools.bollingerBands(this.prices, this.dates);
    this.b_band_dates = bands.dates;
    new_data = [{
        data: bands.prices,
        borderColor: "#66bb6a",
        fill: false,
        borderWidth:2,
        pointRadius:0,
        hitRadius:5
      },{
        data: bands.upper,
        borderColor: "#42a5f5",
        fill: false,
        borderWidth:2,
        pointRadius:0,
        hitRadius:5
      },{
      data: bands.lower,
      borderColor: "#ef5350",
      fill: false,
      borderWidth:2,
      pointRadius:0,
      hitRadius:5
  }];
    this.b_bands_toggle = true;
    new_label = bands.dates;
    }
  else {
    new_data = [
      {
        data: this.prices,
        borderColor: "#66bb6a",
        fill: false,
        borderWidth:2,
        pointRadius:0,
        hitRadius:5
      }
    ];
    new_label = this.dates;
    this.b_bands_toggle = false;
    }
    this.chart.data.datasets = new_data;
    this.chart.data.labels = new_label;
    this.chart.options.scales.xAxes[0].time.unit = 'month';
    this.chart.update();

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

  five_day(){
    let new_data = this.prices.slice(this.prices.length - 6, this.prices.length - 1);
    let new_label ;
    if (!this.b_bands_toggle) {
      new_label = this.dates.slice(this.dates.length - 6, this.dates.length - 1);
    }
    else {
      new_label = this.b_band_dates.slice(this.b_band_dates.length - 6, this.b_band_dates.length - 1);
    }
    this.chart.data.datasets[0].data = new_data;
    this.chart.data.labels = new_label;
    this.chart.options.scales.xAxes[0].time.unit = 'day';
    this.chart.update();
  }


  one_month() {
    let new_data = this.prices.slice(this.prices.length - 21, this.prices.length - 1);
    let new_label ;
    if (!this.b_bands_toggle) {
      new_label = this.dates.slice(this.dates.length - 21, this.dates.length - 1);
    }
    else {
      new_label = this.b_band_dates.slice(this.b_band_dates.length - 21, this.b_band_dates.length - 1);
    }
    this.chart.data.datasets[0].data = new_data;
    this.chart.data.labels = new_label;
    this.chart.options.scales.xAxes[0].time.unit = 'day';
    this.chart.update();
  }

  three_month() {
    let new_data = this.prices.slice(this.prices.length - 61, this.prices.length - 1);
    let new_label ;
    if (!this.b_bands_toggle) {
      new_label = this.dates.slice(this.dates.length - 61, this.dates.length - 1);
    }
    else {
      new_label = this.b_band_dates.slice(this.b_band_dates.length - 61, this.b_band_dates.length - 1);
    }
    this.chart.data.datasets[0].data = new_data;
    this.chart.data.labels = new_label;
    this.chart.options.scales.xAxes[0].time.unit = 'month';
    this.chart.update();
  }

  one_year() {
    let new_data = this.prices;
    let new_label ;
    if (!this.b_bands_toggle) {
      new_label = this.dates;
    }
    else {
      new_label = this.b_band_dates;
    }
    this.chart.data.datasets[0].data = new_data;
    this.chart.data.labels = new_label;
    this.chart.options.scales.xAxes[0].time.unit = 'month';
    this.chart.update();

  }

  two_year() {
    let new_data = this.prices;
    let new_label ;
    if (!this.b_bands_toggle) {
      new_label = this.dates;
    }
    else {
      new_label = this.b_band_dates;
    }
    this.chart.data.datasets[0].data = new_data;
    this.chart.data.labels = new_label;
    this.chart.options.scales.xAxes[0].time.unit = 'month';
    this.chart.update();
  }

  all_time() {
    let new_data = this.prices;
    let new_label ;
    if (!this.b_bands_toggle) {
      new_label = this.dates;
    }
    else {
      new_label = this.b_band_dates;
    }
    this.chart.data.datasets[0].data = new_data;
    this.chart.data.labels = new_label;
    this.chart.options.scales.xAxes[0].time.unit = 'month';
    this.chart.update();
  }
}
