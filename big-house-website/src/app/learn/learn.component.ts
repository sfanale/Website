import { Component, OnInit } from '@angular/core';
import {LearnBlog} from "../insight.blog";
import {InsightsService} from "../insights.service";

@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.css']
})
export class LearnComponent implements OnInit {


  Blogs:LearnBlog[];

  constructor(
    private insightsService: InsightsService
  ) { }

  ngOnInit() {
    this.getAllBlogs();
  }

  getAllBlogs() {
    this.insightsService.getAllLearn().subscribe(data => {
      this.Blogs = data;
    })
  }

}
