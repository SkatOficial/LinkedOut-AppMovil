import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditProfileWorkerPage } from './edit-profile-worker.page';

describe('EditProfileWorkerPage', () => {
  let component: EditProfileWorkerPage;
  let fixture: ComponentFixture<EditProfileWorkerPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfileWorkerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
