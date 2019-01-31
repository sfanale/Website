import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs";
import {User, Post} from "../user";
import {MessageGroup, Messages} from "../messages";


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
    return this.http.post<User>(url,(body), {headers:{ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*'}});
  }



  getUserInfo(id:string): Observable<User> {
    const url =  `${this.usersUrl}/getinfo/${id}`;
    return this.http.get<User>(url);
  }

  getUserInfo_by_username(username:string): Observable<User> {
    const url =  `${this.usersUrl}/getinfo_by_name/${username}`;
    return this.http.get<User>(url);
  }

  get_message_groups(id:string): Observable<MessageGroup[]> {
    const url =  `${this.usersUrl}/messages/get_groups/${id}`;

    return this.http.get<MessageGroup[]>(url);
  }


  get_chat(id:string): Observable<Messages[]> {
    const url =  `${this.usersUrl}/messages/get_chat/${id}`;
    return this.http.get<Messages[]>(url);
  }

  send_message(message:string, from:string, fromname:string, timestamp:string, message_group:string) {
    const url =  `${this.usersUrl}/messages/send`;
    let body = {'content':message, 'from':from, 'fromname':fromname,'timestamp':timestamp, 'messagegroup': message_group };
    this.http.post(url, body).subscribe();
  }

  get_posts_by_id(id:string): Observable<Post[]> {
    const url =  `${this.usersUrl}/get_posts_by_id/${id}`;
    return this.http.get<Post[]>(url);
  }



  register(user: User) {
    // todo: implement this. Change path on backend
    return this.http.post(`${this.usersUrl}/users/create`, user);
  }

  update(user: User) {
    // todo: create this on back end
    return this.http.put(`${this.usersUrl}/users/${user.id}`, user);
  }

  delete(id: number) {
    // todo: create this on back end
    return this.http.delete(`${this.usersUrl}/users/${id}`);
  }

}


