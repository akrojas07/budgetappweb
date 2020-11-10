/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BudgetExpenseService } from './budgetExpense.service';

describe('Service: BudgetExpense', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BudgetExpenseService]
    });
  });

  it('should ...', inject([BudgetExpenseService], (service: BudgetExpenseService) => {
    expect(service).toBeTruthy();
  }));
});
