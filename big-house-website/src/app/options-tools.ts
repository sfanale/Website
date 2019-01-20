import {Option } from "./option";
import {ModelResults} from "./model-results";
import {Stock} from "./stock";
import { Injectable } from '@angular/core';
import {catchError} from "rxjs/operators";
const math = require('mathjs')

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


  getAvailableDates(contract_list:Option[]) {
    let results= new Set;
    for (let contract of contract_list) {
      let d_temp = new Date(parseFloat(contract.expiry)*1000);
      let date_key = d_temp.getMonth()+'/'+ d_temp.getDate()+'/'+d_temp.getFullYear();
      if (date_key !in results) {
        results.add(date_key);
      }
    }
    return results;
  }

  getAvailableStrikes(contract_list:Option[]) {
    let results = new Set;
    for ( let contract of contract_list) {
      let strike = parseFloat(contract.strike)
      if ( strike !in results) {
        results.add(strike);
      }
    }
    return results;
  }

  bollingerBands(prices:number[], dates:string[]) {
    // 2 stds above and below simple moving average
    let upper = [];
    let lower = [];
    let d = [];
    let i = 21;
    let price = [];
    while ( i < (prices.length)) {
      let sig = math.std(prices.slice(i-21,i));
      let sma = math.mean(prices.slice(i-21,i));
      upper.push(sma + (sig*2));
      lower.push(sma - (sig*2));
      d.push(dates[i]);
      price.push(prices[i])
      i++;
    }
    return { upper:upper, lower:lower, dates:d, prices:price } ;
  }




}
