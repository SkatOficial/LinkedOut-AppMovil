import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileWorkerPage } from './profile-worker.page';

describe('ProfileWorkerPage', () => {
  let component: ProfileWorkerPage;
  let fixture: ComponentFixture<ProfileWorkerPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileWorkerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
