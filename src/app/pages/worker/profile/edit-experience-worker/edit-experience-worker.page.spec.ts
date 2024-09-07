import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditExperienceWorkerPage } from './edit-experience-worker.page';

describe('EditExperienceWorkerPage', () => {
  let component: EditExperienceWorkerPage;
  let fixture: ComponentFixture<EditExperienceWorkerPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditExperienceWorkerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
