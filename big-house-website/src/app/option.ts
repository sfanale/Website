export class Option {
  expiry :string;
  lastprice: string;
  timestamp:string;
  symbol: string;
  strike: string;
  pricedate: number;
  contractsymbol: string;
  bid: string;
  ask: string;
  openinterest:string;
  volume:string;
  prices_arr: number[];

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
