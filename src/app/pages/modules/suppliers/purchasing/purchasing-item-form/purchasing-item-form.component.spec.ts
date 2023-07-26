import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasingItemFormComponent } from './purchasing-item-form.component';

describe('PurchasingItemFormComponent', () => {
  let component: PurchasingItemFormComponent;
  let fixture: ComponentFixture<PurchasingItemFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PurchasingItemFormComponent]
    });
    fixture = TestBed.createComponent(PurchasingItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
