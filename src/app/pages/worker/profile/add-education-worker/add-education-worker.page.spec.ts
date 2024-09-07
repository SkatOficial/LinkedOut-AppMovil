import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEducationWorkerPage } from './add-education-worker.page';

describe('AddEducationWorkerPage', () => {
  let component: AddEducationWorkerPage;
  let fixture: ComponentFixture<AddEducationWorkerPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEducationWorkerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
