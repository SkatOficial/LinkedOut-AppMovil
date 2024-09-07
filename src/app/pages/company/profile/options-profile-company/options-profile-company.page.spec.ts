import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OptionsProfileCompanyPage } from './options-profile-company.page';

describe('OptionsProfileCompanyPage', () => {
  let component: OptionsProfileCompanyPage;
  let fixture: ComponentFixture<OptionsProfileCompanyPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionsProfileCompanyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
