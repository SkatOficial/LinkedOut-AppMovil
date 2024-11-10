import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LostPasswordPage } from './lost-password.page';

describe('LostPasswordPage', () => {
  let component: LostPasswordPage;
  let fixture: ComponentFixture<LostPasswordPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LostPasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
