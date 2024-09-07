import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistoryWorkerPage } from './history-worker.page';

describe('HistoryWorkerPage', () => {
  let component: HistoryWorkerPage;
  let fixture: ComponentFixture<HistoryWorkerPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryWorkerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
