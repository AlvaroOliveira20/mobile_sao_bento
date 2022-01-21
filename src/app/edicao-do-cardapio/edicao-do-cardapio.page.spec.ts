import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EdicaoDoCardapioPage } from './edicao-do-cardapio.page';

describe('EdicaoDoCardapioPage', () => {
  let component: EdicaoDoCardapioPage;
  let fixture: ComponentFixture<EdicaoDoCardapioPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EdicaoDoCardapioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EdicaoDoCardapioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
