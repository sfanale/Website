import { Component, OnInit } from '@angular/core';
import {InsightBlog} from "../insight.blog";
import {InsightsService} from "../insights.service";
import * as M from '../../../node_modules/materialize-css/dist/js/materialize.min.js';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  blog:InsightBlog;

  constructor(
    private insightsService: InsightsService
  ) { }

  ngOnInit() {
    var elems = document.querySelectorAll('#big-slider');
    let options ={height:600};
    let instances = M.Slider.init(elems, options);
    let elems2 = document.querySelectorAll('.small-slider');
    let options2 ={indicators:false, height:250};
    var instances2 = M.Slider.init(elems2, options2);
    this.getBlog();
  }

  getBlog() {
    this.insightsService.getOneBlog('3').subscribe(data=>{this.blog=data;});
  }

}
