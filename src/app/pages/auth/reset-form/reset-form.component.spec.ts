import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetFormComponent } from './reset-form.component';

describe('ResetFormComponent', () => {
  let component: ResetFormComponent;
  let fixture: ComponentFixture<ResetFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResetFormComponent]
    });
    fixture = TestBed.createComponent(ResetFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
