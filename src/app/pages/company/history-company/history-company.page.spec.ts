import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistoryCompanyPage } from './history-company.page';

describe('HistoryCompanyPage', () => {
  let component: HistoryCompanyPage;
  let fixture: ComponentFixture<HistoryCompanyPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryCompanyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
