import {Injectable} from '@angular/core';
import {InsightBlog} from "./insight.blog";
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Tickers} from "./option";
import { Observable, of } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({ 'Response-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class InsightsService {

  private insightsurl = 'http://insights.fanaleresearch.com/api';  // url to endpoint

  constructor(
    private http: HttpClient
  ) { }

  getAllBlogs(): Observable<InsightBlog[]> {
    const url = `${this.insightsurl}/getall`;
    return this.http.get<InsightBlog[]>(url);
  }

  postBlog(body:InsightBlog) {
    console.log((body));
    const url = `${this.insightsurl}/post/blog`;
    return this.http.post(url,(body), {headers:{ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*'}}).subscribe();
  }

  getOneBlog (id:string): Observable<InsightBlog> {
    const url = `${this.insightsurl}/get/${id}`;
    return this.http.get<InsightBlog>(url);
  }
}
