import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterCompanyPage } from './register-company.page';

describe('RegisterCompanyPage', () => {
  let component: RegisterCompanyPage;
  let fixture: ComponentFixture<RegisterCompanyPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterCompanyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
