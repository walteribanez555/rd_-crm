import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeUserComponent } from './type-user.component';

describe('TypeUserComponent', () => {
  let component: TypeUserComponent;
  let fixture: ComponentFixture<TypeUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypeUserComponent]
    });
    fixture = TestBed.createComponent(TypeUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
