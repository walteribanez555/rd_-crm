import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOficcesComponent } from './list-oficces.component';

describe('ListOficcesComponent', () => {
  let component: ListOficcesComponent;
  let fixture: ComponentFixture<ListOficcesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListOficcesComponent]
    });
    fixture = TestBed.createComponent(ListOficcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
