import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionRolComponent } from './option-rol.component';

describe('OptionRolComponent', () => {
  let component: OptionRolComponent;
  let fixture: ComponentFixture<OptionRolComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OptionRolComponent]
    });
    fixture = TestBed.createComponent(OptionRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
