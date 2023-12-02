import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReembolsoComponent } from './list-reembolso.component';

describe('ListReembolsoComponent', () => {
  let component: ListReembolsoComponent;
  let fixture: ComponentFixture<ListReembolsoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListReembolsoComponent]
    });
    fixture = TestBed.createComponent(ListReembolsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
