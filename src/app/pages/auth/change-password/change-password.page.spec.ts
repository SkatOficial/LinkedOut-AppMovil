import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangePasswordPage } from './change-password.page';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';


describe('ChangePasswordPage', () => {
  let component: ChangePasswordPage;
  let fixture: ComponentFixture<ChangePasswordPage>;

  class MockSQLite {
    create() {
      return Promise.resolve({
        executeSql: (query: string, params?: any[]) => Promise.resolve({ rows: [] }),
      });
    }
  }

  class MockNativeStorage {
    getItem(key: string): Promise<any> {
      console.log(`MockNativeStorage.getItem(${key}) llamado`);
      return Promise.resolve(null); // Simula un valor vacío
    }
  
    setItem(key: string, value: any): Promise<any> {
      console.log(`MockNativeStorage.setItem(${key}, ${JSON.stringify(value)}) llamado`);
      return Promise.resolve();
    }
  
    remove(key: string): Promise<any> {
      console.log(`MockNativeStorage.remove(${key}) llamado`);
      return Promise.resolve();
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
     declarations: [ChangePasswordPage],
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
       { provide: NativeStorage, useClass: MockNativeStorage },
     ],
   }).compileComponents();
 });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
