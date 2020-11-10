/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BudgetIncomeService } from './budgetIncome.service';

describe('Service: BudgetIncome', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BudgetIncomeService]
    });
  });

  it('should ...', inject([BudgetIncomeService], (service: BudgetIncomeService) => {
    expect(service).toBeTruthy();
  }));
});
