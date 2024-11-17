import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccessPage } from './access.page';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

class MockSQLite {
  create() {
    return Promise.resolve({
      executeSql: (query: string, params?: any[]) => Promise.resolve({ rows: [] }),
    });
  }
}

describe('AccessPage', () => {
  let component: AccessPage;
  let fixture: ComponentFixture<AccessPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccessPage],
      imports: [RouterTestingModule,HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({}),
            snapshot: { params: {} },
          },
        },
        { provide: SQLite, useClass: MockSQLite }, // Agrega el mock de SQLite
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AccessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
