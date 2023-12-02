import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPolizaComponent } from './list-poliza.component';

describe('ListPolizaComponent', () => {
  let component: ListPolizaComponent;
  let fixture: ComponentFixture<ListPolizaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListPolizaComponent]
    });
    fixture = TestBed.createComponent(ListPolizaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
