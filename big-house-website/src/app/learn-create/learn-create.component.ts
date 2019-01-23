import { Component, OnInit } from '@angular/core';
import {InsightsService} from "../insights.service";
import {InsightBlog} from "../insight.blog";

@Component({
  selector: 'app-learn-create',
  templateUrl: './learn-create.component.html',
  styleUrls: ['./learn-create.component.css']
})
export class LearnCreateComponent implements OnInit {


  constructor(
    private insightsService: InsightsService
  ) { }

  ngOnInit() {
  }

  save(author:string, title:string, date:string, description:string, tags:string, content:string, image:string) {
    let body = new InsightBlog;
    console.log(typeof author);
    body.author = author;
    body.title = title;
    body.date = date;
    body.description = description;
    body.tags = tags;
    body.content = content;
    body.image = image;
    this.insightsService.postBlog(body);
  }
}
