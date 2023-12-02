import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSiniestrosComponent } from './list-siniestros.component';

describe('ListSiniestrosComponent', () => {
  let component: ListSiniestrosComponent;
  let fixture: ComponentFixture<ListSiniestrosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListSiniestrosComponent]
    });
    fixture = TestBed.createComponent(ListSiniestrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
