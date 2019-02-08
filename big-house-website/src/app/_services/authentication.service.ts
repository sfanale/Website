import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User} from "../user";

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  private usersURL = 'https://5jpmbqgr8j.execute-api.us-east-1.amazonaws.com/1/users';

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    console.log(username);
    const url = `${this.usersURL}?operation=auth&info=null`;
    console.log(url);
    let body = {"username": username, "password":password};
    let options = {
      headers: new HttpHeaders({ 'Response-Type': 'application/json','ok':'true'})
    };
    return this.http.post<any>(url, body)
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          console.log(user);
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        console.log('no user');
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
