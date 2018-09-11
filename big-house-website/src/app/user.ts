export class User {
  id:string;
  username:string;
  password:string;
  name:string;
  cash:number;
  totalRentIncome:number;
  holdings: Holding[];

}

export class Holding {
  id:number; //property id of holding
  shares:number;
  pricePaid:number;
  return:number;
  rentIncome:number;
  date:number; //should change to a date

}
