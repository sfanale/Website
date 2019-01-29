import {Component, OnInit} from '@angular/core';
import * as M from '../../node_modules/materialize-css/dist/js/materialize.min.js';
import '../../node_modules/autotrack/autotrack.js'



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'big-house-website';

  ngOnInit() {
    var elems = document.querySelectorAll('.sidenav');
    let options = {edge : "right"};
    var instances = M.Sidenav.init(elems, options);
  }

}
