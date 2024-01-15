import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolTypeComponent } from './rol-type.component';

describe('RolTypeComponent', () => {
  let component: RolTypeComponent;
  let fixture: ComponentFixture<RolTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RolTypeComponent]
    });
    fixture = TestBed.createComponent(RolTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
