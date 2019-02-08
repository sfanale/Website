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

  private usersUrl = 'https://5jpmbqgr8j.execute-api.us-east-1.amazonaws.com/1/users';


  constructor(
    private http: HttpClient
  ) { }

  /*
  login(body) {
    const url = `${this.usersUrl}/users/authenticate`;
    console.log(body);
    return this.http.post(url, body).subscribe();
  }
  */



  getUserInfo(token:string): Observable<User> {
    const url =  `${this.usersUrl}?operation=user_info&info=null`;
    let httpOptions = {
      headers: new HttpHeaders({"Authorization": `${token}`})
    };
    return this.http.get<User>(url, httpOptions);
  }

  getUserInfo_by_username(username:string): Observable<User> {
    const url =  `${this.usersUrl}?operation=user_info_name&info=${username}`;
    return this.http.get<User>(url);
  }

  get_message_groups(token:string): Observable<MessageGroup[]> {
    const url =  `${this.usersUrl}/messages/get_groups`;
    let httpOptions = {
      headers: new HttpHeaders({"Authorization": `Bearer ${token}`})
  };

    return this.http.get<MessageGroup[]>(url, httpOptions);
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
    console.log(user);
    let httpOptions = {
      headers: new HttpHeaders({ 'Response-Type': 'application/json',
        'Access-Control-Allow-Origin':'*'})
    };
    return this.http.post(`${this.usersUrl}?operation=create_user&info=null`, user);
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


