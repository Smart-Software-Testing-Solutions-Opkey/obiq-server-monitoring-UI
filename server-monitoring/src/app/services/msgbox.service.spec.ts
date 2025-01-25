import { TestBed } from '@angular/core/testing';

import { MsgboxService } from './msgbox.service';

describe('MsgboxService', () => {
  let service: MsgboxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MsgboxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
