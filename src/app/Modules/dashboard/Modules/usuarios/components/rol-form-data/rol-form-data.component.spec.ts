import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolFormDataComponent } from './rol-form-data.component';

describe('RolFormDataComponent', () => {
  let component: RolFormDataComponent;
  let fixture: ComponentFixture<RolFormDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RolFormDataComponent]
    });
    fixture = TestBed.createComponent(RolFormDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
