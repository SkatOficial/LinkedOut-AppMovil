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

  it('comprobacion ingreso de fechas (datos correctos)', () => {
    component.expInfo.startDate_exp = "1 febrero";
    component.expInfo.endDate_exp = "1 febrero";

    component.validateData();

    expect(component.startDateIsCorrect).toBeTrue();
    expect(component.endDateIsCorrect).toBeTrue();
  });

  it('comprobacion ingreso de company (datos correctos)', () => {
    component.expInfo.otherCompany = null;
    component.expInfo.id_comp = 1;
    component.isOtherCompany = false;

    component.validateData();

    expect(component.companyNameIsCorrect).toBeTrue();    
  });

  it('comprobacion ingreso de position (datos correctos)', () => {
    component.expInfo.otherPosition = null;
    component.expInfo.id_position = 1;
    component.isOtherPosition = false;


    component.validateData();

    expect(component.positionIsCorrect).toBeTrue();
  });
});
