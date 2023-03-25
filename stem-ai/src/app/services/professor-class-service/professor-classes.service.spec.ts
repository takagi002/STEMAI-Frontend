import { TestBed } from '@angular/core/testing';

import { ProfessorClassesService } from './professor-classes.service';

describe('ProfessorClassesService', () => {
  let service: ProfessorClassesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfessorClassesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
