export class Option {
  ask: number;
  bid: number;
  change: number;
  contractsize: string;
  contractsymbol: string;
  currency: string;
  expiration: string;
  id:string;
  impliedvolatility:number;
  industry: string;
  inthemoney: boolean;
  lastprice: number;
  lasttradedate: string;
  openinterest: number;
  optiontype: string;
  percentchange: number;
  pricedate: string;
  sector: string;
  strike: number;
  underlyingsymbol: string;
  volume: number;


}

export class Tickers {
  underlyingsymbol: string;
}


export interface OptionINT {
  expiry :string;
  lastprice: string;
  timestamp:string;
  symbol: string;
  strike: string;
  pricedate: string;
}


export interface Deserializable<T> {
  deserialize(input: any): T;
}
