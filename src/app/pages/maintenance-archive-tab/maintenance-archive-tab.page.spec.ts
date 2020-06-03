import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MaintenanceArchiveTabPage } from './maintenance-archive-tab.page';

describe('MaintenanceArchiveTabPage', () => {
  let component: MaintenanceArchiveTabPage;
  let fixture: ComponentFixture<MaintenanceArchiveTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenanceArchiveTabPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MaintenanceArchiveTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
