import { Component, OnInit } from '@angular/core';
import { ModelService} from "../_services/model.service";
import { MessageService } from "../_services/messages.service";
import { Observable} from "rxjs";
import { ModelResults} from "../model-results";
import { Chart } from "chart.js";
import { FormGroup, FormBuilder, Validators} from "@angular/forms";
import * as M from '../../../node_modules/materialize-css/dist/js/materialize.min.js';


@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.css']
})
export class ModelsComponent implements OnInit {

  results: ModelResults[];
  total_return;
  chart = [];
  dates=[];
  values=[];
  loading = false;
  asset_type: string;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;


  constructor(
    private modelService: ModelService,
  private messageService: MessageService,
  private _formBuilder: FormBuilder
  ) { }


  ngOnInit() {
    var elems = document.querySelectorAll('select');
    let options ={};
    var instances = M.FormSelect.init(elems, options);

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }


  run(assets:string, opt_range:string, expiry_range:string, opt_freq:string, asset_type:string) {
    this.chart = [];
    console.log(asset_type);
    this.loading = true;
    this.modelService.runModel(assets, opt_range.toString(), expiry_range.toString(), opt_freq.toString(), asset_type ).subscribe(data=> {
      this.results = data;
      this.dates=[];
      this.values=[];

      for ( let row of this.results) {
        this.dates = this.dates.concat(row.dates);
        this.values = this.values.concat(row.daily_tot);
      }

      console.log(this.values);
      this.loading = false;
      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: this.dates,
          datasets: [
            {
              data: this.values,
              borderColor: "#3cba9f",
              fill: false
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }],
          }
        }
      });
    });

    // this.modelService.runModel(assets, opt_range.toString(), expiry_range.toString(), opt_freq.toString()).subscribe(data=> this.results+=data);
  }

  show() {
    console.log(this.results);
  }

  private log(message:string) {
    this.messageService.add('Model Comp: '+message);
  }
}
