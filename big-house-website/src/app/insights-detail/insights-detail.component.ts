import { Component, OnInit } from '@angular/core';
import {InsightsService} from "../insights.service";
import {InsightBlog} from "../insight.blog";
import {Route} from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-insights-detail',
  templateUrl: './insights-detail.component.html',
  styleUrls: ['./insights-detail.component.css']
})
export class InsightsDetailComponent implements OnInit {

  blogdata:InsightBlog;

  constructor(
    private insightsService: InsightsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getBlog();
  }

  getBlog() {
    const id = this.route.snapshot.paramMap.get('id');
    this.insightsService.getOneBlog(id).subscribe(data =>{
      this.blogdata = data
    });
  }

}
