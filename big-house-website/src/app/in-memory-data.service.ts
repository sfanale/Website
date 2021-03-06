import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let properties = [
      { id: 11, name: "Calvin's House", address:"Washington DC", rent: 6000, price: 900000, return: 8 },
      { id: 12, name: "Stephen's House", address:"520 E 14th St, New York, NY 10009", rent: 3100, price: 550000, return: 6.76 },
      { id: 13, name: "Tanglewood", address:"102 Tanglewood Dr, Carrboro, NC 27510", rent: 1200, price: 234000, return: 6.15  },
      { id: 14, name: "Isleworth", address:"131 Isleworth Ct, Advance, NC 27006", rent: 1250, price: 256000, return: 5.86  },
      { id: 15, name: "Davie Circle", address:"7 Davie Circle, Chapel Hill, NC 27514", rent: 1100, price: 240000, return: 5.5  },
      { id: 16, name: "Mountain View", address:"Mountain View, California", rent: 1150, price: 225000, return: 6.13  },
      { id: 17, name: "Seattle", address:"Seattle", rent: 1350, price: 300000, return: 5.4  }
    ];

    let tradeInfo = [
      { id: 11, lastPrice:91, numberShares:3000, histPrices:[89,87,88,93,91] },
      { id: 12, lastPrice:53, numberShares:3000, histPrices:[47,49,52,54,53] },
      { id: 13, lastPrice:25, numberShares:3000, histPrices:[22,23,24,24,25]  },
      { id: 14, lastPrice:25, numberShares:3000, histPrices:[23,24,26,24,25]  },
      { id: 15, lastPrice:22, numberShares:3000, histPrices:[24,25,26,23,21]  },
      { id: 16, lastPrice:23, numberShares:3000, histPrices:[21,20,22,21,23]  },
      { id: 17, lastPrice:29, numberShares:3000, histPrices:[30,31,32,26,29]  }
    ];

    let users = [
      {username:"Stephen",password:'password', id:'Stephen',name:'Stephen', cash:10000, holdings:[{id:11, shares:10, pricePaid:69, date:1, rentIncome:72},
          {id:12, shares:20, pricePaid:20, date:1, rentIncome:70}]}
    ];
    return {properties,tradeInfo,users};
  }
}
