import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Chart} from 'chart.js';
import {OptionPricesService} from "../_services/option-prices.service";
import {Option} from "../option";
import {optionstools} from "../options-tools";
import {Stock} from "../stock";
import {NewsService} from "../_services/news.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-option-detail',
  templateUrl: './option-detail.component.html',
  styleUrls: ['./option-detail.component.css']
})
export class OptionDetailComponent implements OnInit {


  constructor(
    private location : Location,
    private optionPricesService: OptionPricesService,
    private route: ActivatedRoute,
    private optionTools: optionstools,
    private newsService: NewsService,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.getOptionDetails();
    this.getStockDetails();
    this.getNews();
    this.setTitle();
  }

  option: Option[];
  stock: Stock[];
  stock_prices=[];
  stock_dates=[];
  chart:Chart;
  dates=[];
  prices=[];
  calc_prices=[];
  open_interest=[];
  volume=[];
  returns=[];
  calcrets=[];
  news;
  open_interest_toggle=false;
  price_type = 'real';

  getNews(){
    let sym =this.route.snapshot.paramMap.get('sym');
    sym= sym.split(/([0-9]+)/)[0];
    this.newsService.get_news(sym).subscribe(data=>{
      this.news=data.articles.slice(0,5);
    });
  }

  setTitle( ) {
    let sym =this.route.snapshot.paramMap.get('sym');
    this.titleService.setTitle(sym);
  }

  getOptionDetails(): void {
    const sym = this.route.snapshot.paramMap.get('sym');
    this.optionPricesService.getContract(sym).subscribe(data=> {
      this.option = data;
      console.log(data);
      for ( let row of this.option) {
        let d_temp = new Date(parseFloat(row.pricedate)*1000);
        this.dates = this.dates.concat((d_temp.getMonth()+1)+'/'+ d_temp.getDate()+'/'+d_temp.getFullYear());
        this.prices.push(row.lastprice);
        let calc =(row.bid + row.ask) / 2;
        if (calc == 0){
          calc = row.lastprice;
        }
        this.calc_prices.push(calc);
        this.open_interest.push(row.openinterest);
        this.volume.push(row.volume);
      }

      this.returns = this.optionTools.getRets(data);
      this.calcrets = this.optionTools.getCalRets(data);
      console.log(this.returns);
      console.log(this.calcrets);


      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: this.dates,
          datasets: [
            {
              data: this.prices,
              borderColor: "#3cba9f",
              fill: false,
              borderWidth: 2,
              pointRadius: 0,
              hitRadius: 5,
              lineTension:0
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
    });
  }

  getStockDetails() {
    let sym = this.route.snapshot.paramMap.get('sym');
    sym= sym.split(/([0-9]+)/)[0];
    console.log(sym);
    this.optionPricesService.getStock(sym).subscribe(data => {
      this.stock = data;
      for (let i of data) {
        this.stock_prices.push(i.regularmarketprice);
        let d_temp = new Date(parseFloat(i.pricedate) * 1000);
        console.log(d_temp.getMonth());
        this.stock_dates = this.stock_dates.concat((d_temp.getMonth() + 1) + '/' + d_temp.getDate() + '/' + d_temp.getFullYear());
      }
    });
  }

  five_day(){
    let new_data;
    if (this.price_type == 'calc'){
      new_data = this.calc_prices.slice(this.calc_prices.length - 6, this.calc_prices.length - 1);
    }
    else {
      new_data = this.prices.slice(this.prices.length - 6, this.prices.length - 1);
    }
    let new_label = this.dates.slice(this.dates.length-6,this.dates.length-1);
    this.chart.data.datasets[0].data = new_data;
    this.chart.data.labels = new_label;
    this.chart.options.scales.xAxes[0].time.unit = 'day';
    this.chart.update();
  }


  one_month() {
    let new_data;
    if (this.price_type == 'calc'){
      new_data = this.calc_prices.slice(this.calc_prices.length - 21, this.calc_prices.length - 1);
    }
    else {
      new_data = this.prices.slice(this.prices.length - 21, this.prices.length - 1);
    }
    let new_label = this.dates.slice(this.dates.length-21,this.dates.length-1);
    this.chart.data.datasets[0].data = new_data;
    this.chart.data.labels = new_label;
    this.chart.options.scales.xAxes[0].time.unit = 'day';
    this.chart.update();
  }

  three_month() {
    let new_data;
    if (this.price_type == 'calc'){
      new_data = this.calc_prices.slice(this.calc_prices.length - 61, this.calc_prices.length - 1);
    }
    else {
      new_data = this.prices.slice(this.prices.length - 61, this.prices.length - 1);
    }
    let new_label = this.dates.slice(this.dates.length-61,this.dates.length-1);
    this.chart.data.datasets[0].data = new_data;
    this.chart.data.labels = new_label;
    this.chart.options.scales.xAxes[0].time.unit = 'month';
    this.chart.update();
  }

  one_year() {
    let new_data;
    if (this.price_type == 'calc'){
      new_data = this.calc_prices;
    }
    else {
      new_data = this.prices;
    }
    let new_label = this.dates;
    this.chart.data.datasets[0].data = new_data;
    this.chart.data.labels = new_label;
    this.chart.options.scales.xAxes[0].time.unit = 'month';
    this.chart.update();

  }

  two_year() {
    let new_data;
    if (this.price_type == 'calc'){
      new_data = this.calc_prices;
    }
    else {
      new_data = this.prices;
    }
    let new_label = this.dates;
    this.chart.data.datasets[0].data = new_data;
    this.chart.data.labels = new_label;
    this.chart.options.scales.xAxes[0].time.unit = 'month';
    this.chart.update();
  }

  all_time() {
    let new_data;
    if (this.price_type == 'calc'){
      new_data = this.calc_prices;
    }
    else {
      new_data = this.prices;
    }
    let new_label = this.dates;
    this.chart.data.datasets[0].data = new_data;
    this.chart.data.labels = new_label;
    this.chart.options.scales.xAxes[0].time.unit = 'month';
    this.chart.update();
  }

  graphOpenInterest(): void {
    if (!this.open_interest_toggle) {
      this.chart.data.datasets.push({
        data: this.open_interest,
        borderColor: "#7e57c2",
        label: 'Open Interest',
        yAxisID: 'Open Interest',
        fill: false,
        borderWidth: 2,
        pointRadius: 0,
        hitRadius: 5,
        lineTension:0
      });
      this.chart.options.scales.yAxes.push({id: 'Open Interest',
        type: 'linear',
        position: 'right',
      });
      this.chart.update();
      this.open_interest_toggle = true;
    }
    else {
      this.chart.data.datasets.pop();
      this.chart.options.scales.yAxes.pop();
      this.chart.update();
      this.open_interest_toggle = false;
    }
  }

  graphPrice(): void {
    let new_data= this.prices;
    let new_label = this.dates;
    this.chart.data.datasets[0].data = new_data;
    this.chart.data.labels = new_label;
    this.chart.options.scales.xAxes[0].time.unit = 'month';
    this.chart.update();
    this.price_type = 'real';
  }

  graphCalcPrice(): void {
    let new_data= this.calc_prices;
    let new_label = this.dates;
    this.chart.data.datasets[0].data = new_data;
    this.chart.data.labels = new_label;
    this.chart.options.scales.xAxes[0].time.unit = 'month';
    this.chart.update();
    this.price_type = 'calc';
  }

}
