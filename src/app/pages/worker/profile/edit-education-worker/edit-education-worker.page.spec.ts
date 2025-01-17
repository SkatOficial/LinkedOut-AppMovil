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

  it('comprobacion ingreso de fechas (datos correctos)', () => {
    component.educInfo.startDate_educ = "1 febrero";
    component.educInfo.endDate_educ = "1 febrero";

    component.validateData();

    expect(component.startDateIsCorrect).toBeTrue();
    expect(component.endDateIsCorrect).toBeTrue();
  });

  it('comprobacion ingreso de carrera (datos correctos)', () => {
    component.educInfo.otherCareer = null;
    component.educInfo.id_career = 1;
    component.isOtherCareer = false;

    component.validateData();

    expect(component.careerIsCorrect).toBeTrue();    
  });

  it('comprobacion ingreso de institucion (datos correctos)', () => {
    component.educInfo.otherInstitution = null;
    component.educInfo.id_inst = 1;
    component.isOtherInstitution = false;


    component.validateData();

    expect(component.institutionNameIsCorrect).toBeTrue();
  });
});
