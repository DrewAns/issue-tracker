import { TestBed, inject } from '@angular/core/testing';

import { IssuesService } from './issue-service.service';

describe('IssuesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IssuesService]
    });
  });

  it('should be created', inject([IssuesService], (service: IssuesService) => {
    expect(service).toBeTruthy();
  }));
});
