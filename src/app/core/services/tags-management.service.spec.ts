import { TestBed } from '@angular/core/testing';

import { TagsManagementService } from './tags-management.service';

describe('TagsManagementService', () => {
  let service: TagsManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TagsManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
