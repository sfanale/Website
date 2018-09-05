import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Property } from './property';
import { MessagesService } from './messages.service';


@Injectable({
  providedIn: 'root'
})

export class PropertyService {


  private log(message: string) {
    this.messageService.add(`PropertyService: ${message}`);
  }

  private propertiesUrl = 'api/properties';


  getProperties (): Observable<Property[]> {
    return this.http.get<Property[]>(this.propertiesUrl)
      .pipe(
        tap(properties => this.log('fetched properties')),
        catchError(this.handleError('getProperties', []))
      );
  }

  getProperty (id: number): Observable<Property> {
    const url = `${this.propertiesUrl}/${id}`;
    return this.http.get<Property>(url).pipe(
      tap(_=>this.log(`fetched property id = ${id}`)),
      catchError(this.handleError<Property>(`getProperty id = ${id}`))
    );
  }

  addProperty (property:Property): Observable<Property> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<Property>(this.propertiesUrl, property, httpOptions).pipe(
      tap((property: Property) => this.log(`Added new property with id = ${property.id}`)),
      catchError(this.handleError<Property>('addProperty'))
    );
  }

  deleteProperty (property: Property | number): Observable<Property> {
    const id = typeof property === 'number' ? property : property.id;
    const url = `${this.propertiesUrl}/${id}`;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.delete<Property>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted property id=${id}`)),
      catchError(this.handleError<Property>('deleteProperty'))
    );
  }

  /* GET heroes whose name contains search term */
  searchProperties(term: string): Observable<Property[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Property[]>(`${this.propertiesUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found properties matching "${term}"`)),
      catchError(this.handleError<Property[]>('searchProperties', []))
    );
  }


  /** PUT: update the hero on the server */
  updateProperty (property: Property): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put(this.propertiesUrl, property, httpOptions).pipe(
      tap(_ => this.log(`updated property id=${property.id}`)),
      catchError(this.handleError<any>('updateProperty'))
    );
  }


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
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


  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) { }
}
