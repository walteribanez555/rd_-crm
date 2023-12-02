import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolizaPdfComponent } from './poliza-pdf.component';

describe('PolizaPdfComponent', () => {
  let component: PolizaPdfComponent;
  let fixture: ComponentFixture<PolizaPdfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PolizaPdfComponent]
    });
    fixture = TestBed.createComponent(PolizaPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
