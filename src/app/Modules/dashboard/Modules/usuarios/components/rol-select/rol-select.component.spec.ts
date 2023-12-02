import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolSelectComponent } from './rol-select.component';

describe('RolSelectComponent', () => {
  let component: RolSelectComponent;
  let fixture: ComponentFixture<RolSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RolSelectComponent]
    });
    fixture = TestBed.createComponent(RolSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
