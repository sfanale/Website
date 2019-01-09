import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MessageService} from "./messages.service";
import {Observable, of} from "rxjs";
import {Option} from "./option";
import {catchError, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  private optionsurl = '0.0.0.0:5000/api/model';  // url to local model endpoint
  private  httpOptions = {
    headers: new HttpHeaders({ 'Response-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }


  runModel(ticker:string[], opt_range:string, expiry_range:string, opt_freq:string) {
    let text = '';
    let s ;
    for(s in ticker) {
      text += (s + '+')
    }
    const url = `${this.optionsurl}/`+text+'&'+opt_range+'&'+expiry_range+'&'+opt_freq;
    return this.http.get(url)
      .pipe(
        tap(_ => this.log('fetched prices')),
        catchError(this.handleError('getOption', []))
      );
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
