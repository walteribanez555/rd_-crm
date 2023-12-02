import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPolizaComponent } from './edit-poliza.component';

describe('EditPolizaComponent', () => {
  let component: EditPolizaComponent;
  let fixture: ComponentFixture<EditPolizaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditPolizaComponent]
    });
    fixture = TestBed.createComponent(EditPolizaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
