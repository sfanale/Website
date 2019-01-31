import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs";
import {User} from "./user";
import {MessageGroup, Messages} from "./messages";


export var loggedInUser;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl = 'http://0.0.0.0:5000/api';


  constructor(
    private http: HttpClient
  ) { }


  login(body): Observable<User> {
    const url = `${this.usersUrl}/login`;
    console.log((body));
    return this.http.post(url,(body), {headers:{ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*'}});
  }

  create_user(body) {
    const url = `${this.usersUrl}/create`;
    console.log((body));

    return this.http.post(url, (body), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
      .subscribe();
  }

  getUserInfo(id:string): Observable<User> {
    const url =  `${this.usersUrl}/getinfo/${id}`;
    return this.http.get(url);
  }

  get_message_groups(id:string): Observable<MessageGroup[]> {
    const url =  `${this.usersUrl}/messages/get_groups/${id}`;

    return this.http.get(url);
  }


  get_chat(id:string): Observable<Messages[]> {
    const url =  `${this.usersUrl}/messages/get_chat/${id}`;
    return this.http.get(url);
  }

}


