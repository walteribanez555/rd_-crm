import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesPolizasComponent } from './reportes-polizas.component';

describe('ReportesPolizasComponent', () => {
  let component: ReportesPolizasComponent;
  let fixture: ComponentFixture<ReportesPolizasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportesPolizasComponent]
    });
    fixture = TestBed.createComponent(ReportesPolizasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
