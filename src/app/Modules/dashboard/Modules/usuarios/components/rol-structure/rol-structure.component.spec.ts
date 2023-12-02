import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolStructureComponent } from './rol-structure.component';

describe('RolStructureComponent', () => {
  let component: RolStructureComponent;
  let fixture: ComponentFixture<RolStructureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RolStructureComponent]
    });
    fixture = TestBed.createComponent(RolStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
