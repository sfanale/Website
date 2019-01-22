import { Component, OnInit } from '@angular/core';
import {InsightsService} from "../insights.service";
import {InsightBlog} from "../insight.blog";

@Component({
  selector: 'app-insights',
  templateUrl: './insights.component.html',
  styleUrls: ['./insights.component.css']
})
export class InsightsComponent implements OnInit {

  Blogs:InsightBlog[];

  constructor(
    private insightsService: InsightsService
  ) { }

  ngOnInit() {
    this.getAllBlogs();
  }

  getAllBlogs() {
    this.insightsService.getAllBlogs().subscribe(data => {
      this.Blogs = data;
    })
  }


}
