import { Component, OnInit } from '@angular/core';
import { InsightBlog } from "../insight.blog";
import { InsightsService } from "../_services/insights.service";
import * as M from '../../../node_modules/materialize-css/dist/js/materialize.min.js';
import {AuthenticationService} from "../_services/authentication.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  blog: InsightBlog;

  constructor(
    private insightsService: InsightsService,
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private titleService: Title
  ) { }

  ngOnInit() {
    var elems = document.querySelectorAll('#big-slider');
    let options = { height: 600 };
    let instances = M.Slider.init(elems, options);
    let elems2 = document.querySelectorAll('.small-slider');
    let options2 = { indicators: false, height: 250 };
    var instances2 = M.Slider.init(elems2, options2);
    let elems3 = document.querySelectorAll(".med-slider");
    let options3 = { indicators: false, height: 523 };
    let instances3 = M.Slider.init(elems3, options3);
    this.setTitle();
    this.getBlog();
    if (this.authService.currentUserValue) {
      this.router.navigate(['/explore']);
    }


  }

  setTitle( ) {
    let sym =this.route.snapshot.paramMap.get('sym');
    this.titleService.setTitle(sym);
  }

  getBlog() {
    this.insightsService.getOneBlog('3').subscribe(data => { this.blog = data; });
  }

}
