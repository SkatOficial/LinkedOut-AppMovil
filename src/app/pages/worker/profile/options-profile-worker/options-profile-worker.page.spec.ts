import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OptionsProfileWorkerPage } from './options-profile-worker.page';

describe('OptionsProfileWorkerPage', () => {
  let component: OptionsProfileWorkerPage;
  let fixture: ComponentFixture<OptionsProfileWorkerPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionsProfileWorkerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
