import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailFormDataComponent } from './detail-form-data.component';

describe('DetailFormDataComponent', () => {
  let component: DetailFormDataComponent;
  let fixture: ComponentFixture<DetailFormDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailFormDataComponent]
    });
    fixture = TestBed.createComponent(DetailFormDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
