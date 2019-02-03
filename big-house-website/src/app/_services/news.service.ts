import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {News, newsResponse} from "../news";

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  news_key = "45bba87b61054d7885d836d377ab1dd5";

  constructor(
    private http: HttpClient
  ) { }

  get_date(){
    let today = new Date();
    let dd = today.getDate().toString();
    let mm = (today.getMonth() + 1).toString();
    let yyyy = today.getFullYear().toString();
    if (parseFloat(dd) < 10) {
      dd = '0' + dd;
    }
    if (parseFloat(mm) < 10) {
      mm = '0' + mm;
    }
    return  yyyy + '-' + mm + '-' + dd;
  }

  get_news(subject:string): Observable<newsResponse> {
    let day = this.get_date();
    let url = 'https://newsapi.org/v2/everything?' +
      `q=${subject}&` +
      `from=${day}&` +
      'sortBy=popularity&' +
      'apiKey=45bba87b61054d7885d836d377ab1dd5';

    return this.http.get<newsResponse>(url);

  }
}
