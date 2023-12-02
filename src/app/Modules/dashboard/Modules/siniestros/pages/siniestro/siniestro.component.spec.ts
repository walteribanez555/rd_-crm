import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiniestroComponent } from './siniestro.component';

describe('SiniestroComponent', () => {
  let component: SiniestroComponent;
  let fixture: ComponentFixture<SiniestroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiniestroComponent]
    });
    fixture = TestBed.createComponent(SiniestroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
