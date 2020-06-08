import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StepListPage } from './step-list.page';

describe('StepListPage', () => {
  let component: StepListPage;
  let fixture: ComponentFixture<StepListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StepListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
