export class Option {
  expiry :string;
  lastprice: string;
  timestamp:string;
  symbol: string;
  strike: string;
  pricedate: number;
  contractsymbol: string;

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
