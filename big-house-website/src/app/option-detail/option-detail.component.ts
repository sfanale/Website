import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Chart} from 'chart.js';
import {OptionPricesService} from "../_services/option-prices.service";
import {Option} from "../option";
import {optionstools} from "../options-tools";
import {Stock} from "../stock";

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
    private optionTools: optionstools
  ) { }

  ngOnInit() {
    this.getOptionDetails();
    this.getStockDetails()

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

  getOptionDetails(): void {
    const sym = this.route.snapshot.paramMap.get('sym');
    this.optionPricesService.getContract(sym).subscribe(data=> {
      this.option = data;

      for ( let row of this.option) {
        let d_temp = new Date(row.pricedate*1000);
        this.dates = this.dates.concat((d_temp.getMonth()+1)+'/'+ d_temp.getDate()+'/'+d_temp.getFullYear());
        this.prices.push(row.lastprice);
        this.calc_prices.push((parseFloat(row.bid )+ parseFloat(row.ask)) / 2);
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
    });
  }

  getStockDetails() {
    let sym = this.route.snapshot.paramMap.get('sym');
    sym= sym.split(/([0-9]+)/)[0];
    console.log(sym);
    this.optionPricesService.getStock(sym).subscribe(data => {
      this.stock = data;

      console.log(data);

      for (let i of data) {
        this.stock_prices.push(i.regularmarketprice);
        let d_temp = new Date(parseFloat(i.pricedate) * 1000);
        console.log(d_temp.getMonth());
        this.stock_dates = this.stock_dates.concat((d_temp.getMonth() + 1) + '/' + d_temp.getDate() + '/' + d_temp.getFullYear());
      }
    });
  }

  five_day(){
    this.remove_chart_data(this.chart);

    let new_data=
      {
        data: this.prices.slice(1).slice(-5),
        borderColor: "#3cba9f",
        fill: false,
        borderWidth: 2,
        pointRadius: 0,
        hitRadius: 5
      };
    let new_label = this.dates.slice(1).slice(-5);
    this.add_chart_data(this.chart, new_data, new_label);

  }

  remove_chart_data(chart){
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
      dataset.data.pop();
    });
    chart.update();
  }

  add_chart_data(chart, data, label){
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
      dataset.data.push(data);
    });
    chart.update();
  }


  graphOpenInterest(): void {
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: this.dates,
        datasets: [
          {
            data: this.open_interest,
            borderColor: "#3cba9f",
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

  graphPrice(): void {
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: this.dates,
        datasets: [
          {
            data: this.prices,
            borderColor: "#3cba9f",
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

  graphCalcPrice(): void {
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: this.dates,
        datasets: [
          {
            data: this.calc_prices,
            borderColor: "#3cba9f",
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

}
