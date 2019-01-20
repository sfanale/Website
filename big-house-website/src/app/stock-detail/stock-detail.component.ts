import { Component, OnInit } from '@angular/core';
import { Stock} from "../stock";
import {Location} from "@angular/common";
import {OptionPricesService} from "../option-prices.service";
import {ActivatedRoute} from "@angular/router";
import {optionstools} from "../options-tools";
import {Chart} from 'chart.js'


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
        this.prices.push(i.close);
        let d_temp = new Date(i.pricedate*1000);
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

    });
  }

  bolingerBands() {
    let bands = this.optionTools.bolingerBands(this.prices, this.dates);
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
            fill: false
          },
          {
            data: bands.upper,
            borderColor: "#42a5f5",
            fill: false
          },
          {
            data: bands.lower,
            borderColor: "#ef5350",
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

}
