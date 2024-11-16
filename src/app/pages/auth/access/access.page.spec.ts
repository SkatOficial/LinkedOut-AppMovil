import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccessPage } from './access.page';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('AccessPage', () => {
  let component: AccessPage;
  let fixture: ComponentFixture<AccessPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccessPage],
      imports: [RouterTestingModule], // Importa RouterTestingModule para simular el enrutamiento
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({}), // Simula queryParams con un observable vacío u otros valores necesarios
            snapshot: { params: {} } // Simula otros datos de la ruta según sea necesario
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AccessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
