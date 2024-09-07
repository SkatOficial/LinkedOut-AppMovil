import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditEducationWorkerPage } from './edit-education-worker.page';

describe('EditEducationWorkerPage', () => {
  let component: EditEducationWorkerPage;
  let fixture: ComponentFixture<EditEducationWorkerPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEducationWorkerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
