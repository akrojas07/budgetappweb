/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BudgetService } from './budget.service';

describe('Service: Budget', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BudgetService]
    });
  });

  it('should ...', inject([BudgetService], (service: BudgetService) => {
    expect(service).toBeTruthy();
  }));
});
