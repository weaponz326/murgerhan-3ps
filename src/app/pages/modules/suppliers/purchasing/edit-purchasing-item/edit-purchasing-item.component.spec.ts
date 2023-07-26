import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPurchasingItemComponent } from './edit-purchasing-item.component';

describe('EditPurchasingItemComponent', () => {
  let component: EditPurchasingItemComponent;
  let fixture: ComponentFixture<EditPurchasingItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditPurchasingItemComponent]
    });
    fixture = TestBed.createComponent(EditPurchasingItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
