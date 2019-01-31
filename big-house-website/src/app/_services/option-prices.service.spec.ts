import { TestBed, inject } from '@angular/core/testing';

import { OptionPricesService } from './option-prices.service';

describe('OptionPricesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OptionPricesService]
    });
  });

  it('should be created', inject([OptionPricesService], (service: OptionPricesService) => {
    expect(service).toBeTruthy();
  }));
});
