export class User {
  id:number;
  username:string;
  cash:number;
  holdings: Holding[];

}

export class Holding {
  id:number; //property id of holding
  shares:number;
  pricePaid:number;
  date:number; //should change to a date

}
