import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditPolizaComponent } from './modal-edit-poliza.component';

describe('ModalEditPolizaComponent', () => {
  let component: ModalEditPolizaComponent;
  let fixture: ComponentFixture<ModalEditPolizaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalEditPolizaComponent]
    });
    fixture = TestBed.createComponent(ModalEditPolizaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
