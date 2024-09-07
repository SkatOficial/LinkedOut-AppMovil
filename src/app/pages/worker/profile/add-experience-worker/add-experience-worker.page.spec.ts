import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddExperienceWorkerPage } from './add-experience-worker.page';

describe('AddExperienceWorkerPage', () => {
  let component: AddExperienceWorkerPage;
  let fixture: ComponentFixture<AddExperienceWorkerPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExperienceWorkerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
