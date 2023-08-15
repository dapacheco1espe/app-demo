import { TestBed } from '@angular/core/testing';

import { RegistroTagsService } from './registro-tags.service';

describe('RegistroTagsService', () => {
  let service: RegistroTagsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroTagsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
