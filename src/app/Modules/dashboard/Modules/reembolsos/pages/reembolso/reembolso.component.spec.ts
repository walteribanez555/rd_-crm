import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReembolsoComponent } from './reembolso.component';

describe('ReembolsoComponent', () => {
  let component: ReembolsoComponent;
  let fixture: ComponentFixture<ReembolsoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReembolsoComponent]
    });
    fixture = TestBed.createComponent(ReembolsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
