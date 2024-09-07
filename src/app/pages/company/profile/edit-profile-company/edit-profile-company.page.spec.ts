import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditProfileCompanyPage } from './edit-profile-company.page';

describe('EditProfileCompanyPage', () => {
  let component: EditProfileCompanyPage;
  let fixture: ComponentFixture<EditProfileCompanyPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfileCompanyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
