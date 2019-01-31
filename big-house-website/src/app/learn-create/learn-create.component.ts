import { Component, OnInit } from '@angular/core';
import {InsightsService} from "../_services/insights.service";
import {LearnBlog} from "../insight.blog";

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

  save(title:string, description:string, tags:string, content:string, image:string) {
    let body = new LearnBlog();
    let tags_list = tags.split('+');
    let tags_temp =[];
    for (let i of tags_list){
      tags_temp.push(i);
    }
    body.title = title;
    body.description = description;
    body.tags = tags_temp;
    body.content = content;
    body.image = image;
    this.insightsService.postLearn(body);
  }
}
