import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileCompanyPage } from './profile-company.page';

describe('ProfileCompanyPage', () => {
  let component: ProfileCompanyPage;
  let fixture: ComponentFixture<ProfileCompanyPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCompanyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
