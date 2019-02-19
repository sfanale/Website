import { Injectable } from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Tickers} from "../option";
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {Stock} from "../stock";
import { Option } from '../option';
import { MessageService } from './messages.service';



const httpOptions = {
  headers: new HttpHeaders({ 'Response-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class OptionPricesService {

  private optionsurl = 'https://5jpmbqgr8j.execute-api.us-east-1.amazonaws.com/1/options';  // url to local options endpoint
  private stocksurl = 'https://5jpmbqgr8j.execute-api.us-east-1.amazonaws.com/1/stocks';  // url to local options endpoint

  httpOptions = {
    headers: new HttpHeaders({ 'Response-Type': 'application/json',
      'Access-Control-Allow-Origin':'*'})
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }


  getStock (ticker:string): Observable<Stock[]> {
    console.log(ticker);
    const url = `${this.stocksurl}?operation=read_list&operand1=${ticker}`;
    return this.http.get<Stock[]>(url).pipe( tap(_=> this.log('fetched stock info')),
      catchError(this.handleError('getStock', []))
    );
  }


  getOption (ticker:string, strike:string, expiry:string):Observable<Option[]>  {
    const url = `${this.optionsurl}?operation=read_list&operand1=${ticker}:${strike}:${expiry}`;
    return this.http.get<Option[]>(url)
      .pipe(
        tap(_ => this.log('fetched prices')),
        catchError(this.handleError('getOption', []))
      );
  }

  getContract (contractsymbol:string):Observable<Option[]> {
    const url = `${this.optionsurl}?operation=read_one_symbol&operand1=${contractsymbol}`;
    return this.http.get<Option[]>(url)
      .pipe(
        tap(_ => this.log('fetched contract details')),
        catchError(this.handleError('getContract', []))
      );
  }

  getAllTickers(): Observable<Tickers[]> {
    const url = `${this.optionsurl}?operation=get_all_tickers&operand1=null`;
    return this.http.get<Tickers[]>(url).pipe(
      tap(_ => this.log('fetched tickers')),
      catchError(this.handleError('getAllTickers', []))
    );
  }

  getMovers(direction:string): Observable<Stock[]> {
    const url = `${this.stocksurl}?operation=movers&operand1=${direction}`;
    return this.http.get<Stock[]>(url).pipe( tap(_=> this.log('fetched stock info')),
      catchError(this.handleError('getStock', []))
    );
  }

  getIndustries() {
    const url = `${this.stocksurl}?operation=industries&operand1=null`;
    return this.http.get<string[]>(url);
  }

  getSectors() {
    const url = `${this.stocksurl}?operation=sectors&operand1=null`;
    return this.http.get<string[]>(url);
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

