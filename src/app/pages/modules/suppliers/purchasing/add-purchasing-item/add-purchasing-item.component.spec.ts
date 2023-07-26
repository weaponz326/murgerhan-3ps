import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPurchasingItemComponent } from './add-purchasing-item.component';

describe('AddPurchasingItemComponent', () => {
  let component: AddPurchasingItemComponent;
  let fixture: ComponentFixture<AddPurchasingItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPurchasingItemComponent]
    });
    fixture = TestBed.createComponent(AddPurchasingItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
