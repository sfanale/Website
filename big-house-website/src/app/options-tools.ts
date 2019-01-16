import {Option } from "./option";
import {ModelResults} from "./model-results";
import {Stock} from "./stock";
import { Injectable } from '@angular/core';
import {catchError} from "rxjs/operators";



@Injectable({
  providedIn: 'root'
})

export class optionstools {

  getCalPrice(price_row:Option) {
    return (parseFloat(price_row.bid)+parseFloat(price_row.ask))/2;
  }

  getRets(asset:Option[]) {
    let i = 1;
    let rets=[];
    while (i < asset.length) {
      rets.push(parseFloat(asset[i].lastprice)/parseFloat(asset[i-1].lastprice));
      i+=1;
    }
    return rets;
  }

  getCalRets(asset:Option[]) {
    let i = 1;
    let calcrets = [];
    while (i < asset.length) {
      try {
        calcrets.push(this.getCalPrice(asset[i]) / this.getCalPrice(asset[i - 1]));
      }
      catch(err) {
        // if there is an error than say the returns are 1 for that day
        calcrets.push(1);
      }
      i+=1;
    }
    return calcrets;
  }
}
