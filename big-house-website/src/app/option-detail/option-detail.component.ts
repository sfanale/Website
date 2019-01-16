import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Chart} from 'chart.js';
import {OptionPricesService} from "../option-prices.service";
import {Option} from "../option";
import {optionstools} from "../options-tools";

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
  }

  option: Option[];
  chart=[];
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

      console.log(data);
      for ( let row of this.option) {
        let d_temp = new Date(row.pricedate*1000);
        this.dates = this.dates.concat(d_temp.getMonth()+'/'+ d_temp.getDate()+'/'+d_temp.getFullYear());
        this.prices = this.prices.concat(row.lastprice);
        this.calc_prices = this.calc_prices.concat((parseFloat(row.bid )+ parseFloat(row.ask)) / 2);
        this.open_interest = this.open_interest.concat(row.openinterest);
        this.volume = this.volume.concat(row.volume);
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
