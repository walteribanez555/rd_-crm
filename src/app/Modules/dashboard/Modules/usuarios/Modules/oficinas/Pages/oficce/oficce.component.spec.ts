import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OficceComponent } from './oficce.component';

describe('OficceComponent', () => {
  let component: OficceComponent;
  let fixture: ComponentFixture<OficceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OficceComponent]
    });
    fixture = TestBed.createComponent(OficceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
