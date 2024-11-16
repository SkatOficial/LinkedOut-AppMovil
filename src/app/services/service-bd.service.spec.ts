import { TestBed } from '@angular/core/testing';

import { ServiceBDService } from './service-bd.service';
import { SQLite} from '@awesome-cordova-plugins/sqlite/ngx';
import { HttpClientModule } from '@angular/common/http';



const mockSQLite = {
  create: jasmine.createSpy('create').and.returnValue(Promise.resolve(true))
};

describe('ServiceBDService', () => {
  let service: ServiceBDService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule], 
      providers: [
        ServiceBDService,
        { provide: SQLite, useValue: mockSQLite }
      ]
    });
    service = TestBed.inject(ServiceBDService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
