import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuponComponent } from './cupon.component';

describe('CuponComponent', () => {
  let component: CuponComponent;
  let fixture: ComponentFixture<CuponComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CuponComponent]
    });
    fixture = TestBed.createComponent(CuponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
