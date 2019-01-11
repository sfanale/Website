import { Injectable } from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Option } from './option';
import { MessageService } from './messages.service';



const httpOptions = {
  headers: new HttpHeaders({ 'Response-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class OptionPricesService {

  private optionsurl = 'http://data.fanaleresearch.com/api/options';  // url to local options endpoint



  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }





  getOption (ticker:string) :Observable<Option[]>  {
    const url = `${this.optionsurl}/${ticker}`;
    return this.http.get<Option[]>(url)
      .pipe(
        tap(_ => this.log('fetched prices')),
        catchError(this.handleError('getOption', []))
      );
  }

  getContract (contractsymbol:string) :Observable<Option[]> {
    const url = `${this.optionsurl}/detail/${contractsymbol}`;
    return this.http.get<Option[]>(url)
      .pipe(
        tap(_ => this.log('fetched contract details')),
        catchError(this.handleError('getContract', []))
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

