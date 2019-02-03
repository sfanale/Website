export class News{
  source: source;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt:string;
  content: string;
}

export class source {
  id: string;
  name: string;
}

export class newsResponse {
  status:string;
  totalResults:number;
  articles: News[];
}
