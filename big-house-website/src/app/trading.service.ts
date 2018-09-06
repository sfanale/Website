import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import {TradeInfo} from "./tradeinfo";
import { MessageService } from './messages.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TradingService {

  private tradeInfoUrl = 'api/tradeInfo';  // ?

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  getTradeInfo(id: number): Observable<TradeInfo> {
    const url = `${this.tradeInfoUrl}/${id}`;
    return this.http.get<TradeInfo>(url).pipe(
      tap(_ => this.log(`fetched Trade Info id=${id}`)),
      catchError(this.handleError<TradeInfo>(`getTradeInfo id=${id}`))
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
    this.messageService.add(`PropertyService: ${message}`);
  }
}
