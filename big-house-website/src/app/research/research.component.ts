import { Component, OnInit, ViewChild, Input } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource, Sort, MatSortModule} from '@angular/material';
import {OptionPricesService} from "../_services/option-prices.service";
import {InsightsService} from "../_services/insights.service";
import {Chart} from 'chart.js';
import * as M from '../../../node_modules/materialize-css/dist/js/materialize.min.js';
import {InsightBlog} from "../insight.blog";
import {NewsService} from "../_services/news.service";


@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.css']
})

export class ResearchComponent implements OnInit {

  market_data={};
  insights:InsightBlog[];
  charts=[];
  news=[];
  relevant_tickers1 = ['AAPL', 'FB', 'GOOGL'];
  relevant_tickers2 =['AMZN', 'NFLX', 'MSFT'];
  relevant_tickers3 = ['TSLA', 'MDB', 'JPM'];
  big_move_up=[];
  big_move_down=[];


  constructor(
    private optionPriceService: OptionPricesService,
    private insightsService: InsightsService,
    private newsService: NewsService
  ) {}

  ngOnInit() {
    this.getMarketInfo();
    this.getNews();
    this.getMovers();
    this.getInsights();

  }

  getMarketInfo(user = null) {
    let relevant_tickers = [];
    if (user == null ) {
      relevant_tickers = ["AAPL", "FB", 'GOOGL', 'AMZN', 'NFLX', 'MSFT', 'TSLA', 'MDB', 'JPM', 'IVV'];
    }
    else {
      relevant_tickers = [];
    }
    for (let ticker of relevant_tickers) {
      this.optionPriceService.getStock(ticker).subscribe(data=>{
        // save data to dictionary of market data
        this.market_data[ticker] = data;
        // build a chart
        let prices=[];
        let dates=[];
        for (let i of data) {
          prices.push(i.regularmarketprice);
          let d_temp = new Date(parseFloat(i.pricedate)*1000);
          console.log(d_temp.getMonth());
          dates = dates.concat((d_temp.getMonth()+1)+'/'+ d_temp.getDate()+'/'+d_temp.getFullYear());
        }

        this.market_data[ticker]['chart'] = new Chart(ticker, {
          type: 'line',
          data: {
            labels: dates.slice(1).slice(-5),
            datasets: [
              {
                data: prices.slice(1).slice(-5),
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
        console.log(this.market_data);

    });
  }
}
  getMovers() {
      this.optionPriceService.getMovers('up').subscribe(data=> {
        this.big_move_up = data;
        console.log(this.big_move_up);
      });
      this.optionPriceService.getMovers('down').subscribe(data => {
        this.big_move_down = data;
      });
  }

  getNews() {
    let subjects = ['AAPL', 'FB', 'GOOGL', 'SP500'];
    console.log(subjects);
    for (let subject of subjects) {
      console.log(subject);
      this.newsService.get_news(subject).subscribe(data => {
        this.news.push(data);
        console.log(data);
      })
    }
  }

  getInsights() {
    // todo: make this top three by views recently
    this.insightsService.getAllBlogs().subscribe(data => {
      this.insights = data.slice(0,3);
    });
  }

}





