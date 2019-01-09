import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import {OptionPricesService} from "../option-prices.service";
import {Option} from "../option";
import {PropertyService} from "../property.service";

@Component({
  selector: 'app-option-detail',
  templateUrl: './option-detail.component.html',
  styleUrls: ['./option-detail.component.css']
})
export class OptionDetailComponent implements OnInit {


  @Input() option: Option[];

  constructor(
    private location : Location,
    private optionPricesService: OptionPricesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getOptionDetails();
  }

  getOptionDetails(): void {
    const sym = this.route.snapshot.paramMap.get('sym');
    this.optionPricesService.getContract(sym).subscribe(data=> this.option = data);
  }

}
