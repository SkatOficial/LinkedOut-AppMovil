import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OptionJobPage } from './option-job.page';

describe('OptionJobPage', () => {
  let component: OptionJobPage;
  let fixture: ComponentFixture<OptionJobPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionJobPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
