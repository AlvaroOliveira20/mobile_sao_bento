import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SolicitacoesDeMatriculaPage } from './solicitacoes-de-matricula.page';

describe('SolicitacoesDeMatriculaPage', () => {
  let component: SolicitacoesDeMatriculaPage;
  let fixture: ComponentFixture<SolicitacoesDeMatriculaPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitacoesDeMatriculaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitacoesDeMatriculaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
