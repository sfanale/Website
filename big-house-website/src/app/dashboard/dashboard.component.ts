import { Component, OnInit } from '@angular/core';
import {InsightBlog} from "../insight.blog";
import {InsightsService} from "../insights.service";


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
    this.getBlog();
  }

  getBlog() {
    this.insightsService.getOneBlog('3').subscribe(data=>{this.blog=data;});
  }

}
