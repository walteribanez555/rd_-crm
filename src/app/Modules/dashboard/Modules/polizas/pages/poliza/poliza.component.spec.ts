import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolizaComponent } from './poliza.component';

describe('PolizaComponent', () => {
  let component: PolizaComponent;
  let fixture: ComponentFixture<PolizaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PolizaComponent]
    });
    fixture = TestBed.createComponent(PolizaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
