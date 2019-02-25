import { Component, OnInit } from '@angular/core';
import { Title, Meta} from "@angular/platform-browser";


@Component({
  selector: 'app-data-apiinfo',
  templateUrl: './data-apiinfo.component.html',
  styleUrls: ['./data-apiinfo.component.css']
})
export class DataAPIinfoComponent implements OnInit {

  constructor(
    private title: Title,
    private meta: Meta
  ) { }

  ngOnInit() {

    this.title.setTitle("Fanale Research");
    this.meta.updateTag({ name: 'description', content: 'Research stock and options'});
    this.meta.updateTag({ name: 'keywords', content: 'options, stocks, historical prices'});
  }

}
