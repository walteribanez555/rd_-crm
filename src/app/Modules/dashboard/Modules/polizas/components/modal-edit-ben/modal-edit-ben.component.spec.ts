import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditBenComponent } from './modal-edit-ben.component';

describe('ModalEditBenComponent', () => {
  let component: ModalEditBenComponent;
  let fixture: ComponentFixture<ModalEditBenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalEditBenComponent]
    });
    fixture = TestBed.createComponent(ModalEditBenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
