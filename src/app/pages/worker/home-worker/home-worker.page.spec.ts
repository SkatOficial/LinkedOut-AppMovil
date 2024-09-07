import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeWorkerPage } from './home-worker.page';

describe('HomeWorkerPage', () => {
  let component: HomeWorkerPage;
  let fixture: ComponentFixture<HomeWorkerPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeWorkerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
