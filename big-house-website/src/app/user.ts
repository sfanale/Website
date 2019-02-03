export class User {
  id:string;
  username:string;
  password:string;
  firstname:string;
  lastname:string;
  email:string;
  birthdate: string;
  admin: boolean;
  premium: boolean;
  confirmed: boolean;
  token: string;
  holdings: holding[];

}

export class Post {
  content: string;
  userid: string;
  comments: object[];
  views: string;
  likes: string;

}

export class holding {
  symbol: string;
  pricepaid: string;
  amount: string;
}
