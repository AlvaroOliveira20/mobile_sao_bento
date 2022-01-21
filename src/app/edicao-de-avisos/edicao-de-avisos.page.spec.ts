import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EdicaoDeAvisosPage } from './edicao-de-avisos.page';

describe('EdicaoDeAvisosPage', () => {
  let component: EdicaoDeAvisosPage;
  let fixture: ComponentFixture<EdicaoDeAvisosPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EdicaoDeAvisosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EdicaoDeAvisosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
