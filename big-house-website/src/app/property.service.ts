import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Property } from './property';
import { MessageService } from './messages.service';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class PropertyService {

  private propertiesUrl = 'api/properties';  // URL to web api


  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }


  getProperties (): Observable<Property[]> {

    return this.http.get<Property[]>(this.propertiesUrl)
      .pipe(
        tap(properties => this.log('fetched properties')),
        catchError(this.handleError('getProperties', []))
      );
  }


  getPropertyNo404<Data>(id: number): Observable<Property> {
    const url = `${this.propertiesUrl}/?id=${id}`;
    return this.http.get<Property[]>(url)
      .pipe(
        map(properties => properties[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} property id=${id}`);
        }),
        catchError(this.handleError<Property>(`getProperty id=${id}`))
      );
  }


  getProperty(id: number): Observable<Property> {
    const url = `${this.propertiesUrl}/${id}`;
    return this.http.get<Property>(url).pipe(
      tap(_ => this.log(`fetched property id=${id}`)),
      catchError(this.handleError<Property>(`getProperty id=${id}`))
    );
  }


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

  searchPropertiesResearch(term: string): Observable<Property[]> {
    if (term == "") {
      return this.http.get<Property[]>(this.propertiesUrl)
        .pipe(
          tap(properties => this.log('fetched properties')),
          catchError(this.handleError('getProperties', []))
        );
    }
    return this.http.get<Property[]>(`${this.propertiesUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found properties matching "${term}"`)),
      catchError(this.handleError<Property[]>('searchProperties', []))
    );
  }






  //////// Save methods //////////


  addProperty (property: Property): Observable<Property> {
    return this.http.post<Property>(this.propertiesUrl, property, httpOptions).pipe(
      tap((property: Property) => this.log(`added property w/ id=${property.id}`)),
      catchError(this.handleError<Property>('addProperty'))
    );
  }


  deleteProperty (property: Property | number): Observable<Property> {
    const id = typeof property === 'number' ? property : property.id;
    const url = `${this.propertiesUrl}/${id}`;

    return this.http.delete<Property>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted property id=${id}`)),
      catchError(this.handleError<Property>('deleteProperty'))
    );
  }


  updateProperty(property: Property): Observable<any> {
    return this.http.put(this.propertiesUrl, property, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${property.id}`)),
      catchError(this.handleError<any>('updateHero'))
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

  private log(message: string) {
    this.messageService.add(`PropertyService: ${message}`);
  }
}

