import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionUserComponent } from './option-user.component';

describe('OptionUserComponent', () => {
  let component: OptionUserComponent;
  let fixture: ComponentFixture<OptionUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OptionUserComponent]
    });
    fixture = TestBed.createComponent(OptionUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
