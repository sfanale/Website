import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { Observable, of } from 'rxjs';
import {catchError, map, subscribeOn, tap} from 'rxjs/operators';

import { User } from './user';
import { MessageService } from './messages.service';


/*const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
*/
export var loggedInUser:User ={
  username:"",password:'', id:'',name:'', cash:0,totalRentIncome:0,
    holdings:[{id:0, shares:0, pricePaid:0, rentIncome:0, date:0,return:0}]
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl = 'api/users';  // URL to web api

  //private blankUser:User ={username:"loggedout",password:'', id:0,name:'null', cash:0,totalRentIncome:0, holdings:[{id:0, shares:0, pricePaid:0, rentIncome:0, date:0,return:0}]};
  //tempUser:User;
  constructor(private http: HttpClient,
              private messageService: MessageService) { }



  getUser(username: string): Observable<User> {
    if (!username.trim()) {
      // if not search term, return empty hero array.
      return of();
    }
    const url = `${this.usersUrl}/${username}`;
    this.log(url);
    return this.http.get<User>(url).pipe(
      tap(_ => this.log(`fetched user id=${username}`)),
      catchError(this.handleError<User>(`getUser id=${username}`))
    );
  }

  changeUser(username: string, password:string):Observable<User> {
    if (!username.trim()) {
      // if not search term, return empty hero array.
      return of();
    }
    const url = `${this.usersUrl}/${username}`;
    //this.http.get<User>(url).subscribe( user =>this.tempUser=user);
    /*
    if(setTimeout(()=> this.tempUser.password!=password,2000)) {
      this.log('incorrect password');
      return of(this.blankUser);
    }
    */
    this.http.get<User>(url).subscribe(user=>loggedInUser=user);
    this.log('changed user');
    return this.http.get<User>(url).pipe(
      tap(_ => this.log(`fetched user id=${username}`)),
      catchError(this.handleError<User>(`getUser id=${username}`))
    );
    //this.loggedInUser = this.tempUser;
    /*

    */
  }
  // TODO add the ability to log in and check password to change user






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
    this.messageService.add(`UserService: ${message}`);
  }
}


