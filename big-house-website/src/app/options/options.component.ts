import { Component, OnInit } from '@angular/core';
import {Property} from "../property";
import {OptionPricesService} from "../option-prices.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatTableModule} from "@angular/material";
import { Option, OptionINT } from "../option";
import { MessageService } from '../messages.service';
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs/operators";
import {Observable} from "rxjs";
import { NgModule} from "@angular/core";

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})

@NgModule({
  imports: [BrowserAnimationsModule, MatTableModule]

})

export class OptionsComponent implements OnInit {

  options: Option[];
  data: number[];

  constructor(
    private optionPriceService: OptionPricesService,
    private messageService: MessageService
  ) { }


  ngOnInit() {

  }


  getOption(ticker:string): void {
    this.optionPriceService.getOption(ticker).subscribe(data => {this.options = data} );
    // this.messageService.add(this.options[0].symbol);
  }




}
