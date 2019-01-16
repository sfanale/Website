import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MessageService} from "./messages.service";
import {Observable, of} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import { ModelResults } from "./model-results";

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  private optionsurl = 'http://model.fanaleresearch.com/api/model';  // url to local model endpoint
  private  httpOptions = {
    headers: new HttpHeaders({ 'Response-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }


  runModel(ticker:string, opt_range:string, expiry_range:string, opt_freq:string, asset_type:string): Observable<ModelResults[]> {
    let text = '';
    let s ;
    // for(s in ticker) {
    //  text += (s + '+')
    //}
    const url = `${this.optionsurl}/run/`+ticker+'&'+opt_range+'&'+expiry_range+'&'+opt_freq +'&'+asset_type;
    return this.http.get<ModelResults[]>(url);
  }

  buyHold(ticker:string, start_hold:string, end_hold:string, asset_type:string) {
    const url = `${this.optionsurl}/buy/`+ticker+'&'+start_hold+'&'+end_hold +'&'+asset_type;
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`OptionPriceService: ${message}`);
  }

}
