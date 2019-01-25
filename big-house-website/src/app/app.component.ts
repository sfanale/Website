import {Component, OnInit} from '@angular/core';
import * as M from '../../node_modules/materialize-css/dist/js/materialize.min.js';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'big-house-website';

  ngOnInit() {
    var elems = document.querySelectorAll('.sidenav');
    let options = {};
    var instances = M.Sidenav.init(elems, options);
  }

}
