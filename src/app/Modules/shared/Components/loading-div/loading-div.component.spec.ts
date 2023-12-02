import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingDivComponent } from './loading-div.component';

describe('LoadingDivComponent', () => {
  let component: LoadingDivComponent;
  let fixture: ComponentFixture<LoadingDivComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoadingDivComponent]
    });
    fixture = TestBed.createComponent(LoadingDivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
