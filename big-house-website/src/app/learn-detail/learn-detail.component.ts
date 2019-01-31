import { Component, OnInit } from '@angular/core';
import {LearnBlog} from "../insight.blog";
import {InsightsService} from "../_services/insights.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-learn-detail',
  templateUrl: './learn-detail.component.html',
  styleUrls: ['./learn-detail.component.css']
})
export class LearnDetailComponent implements OnInit {

  blogdata:LearnBlog;

  constructor(
    private insightsService: InsightsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getBlog();
  }

  getBlog() {
    const id = this.route.snapshot.paramMap.get('id');
    this.insightsService.getOneLearn(id).subscribe(data =>{
      this.blogdata = data;
      console.log(data);
    });
  }
}
