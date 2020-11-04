/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BudgetSavingsService } from './budgetSavings.service';

describe('Service: BudgetSavings', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BudgetSavingsService]
    });
  });

  it('should ...', inject([BudgetSavingsService], (service: BudgetSavingsService) => {
    expect(service).toBeTruthy();
  }));
});
