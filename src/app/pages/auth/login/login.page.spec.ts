import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  class MockSQLite {
    create() {
      return Promise.resolve({
        executeSql: (query: string, params?: any[]) => Promise.resolve({ rows: [] }),
      });
    }
  }

  beforeEach(async () => {
     await TestBed.configureTestingModule({
      declarations: [LoginPage],
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
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
