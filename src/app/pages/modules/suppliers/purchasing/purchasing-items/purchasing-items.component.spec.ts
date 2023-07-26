import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasingItemsComponent } from './purchasing-items.component';

describe('PurchasingItemsComponent', () => {
  let component: PurchasingItemsComponent;
  let fixture: ComponentFixture<PurchasingItemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PurchasingItemsComponent]
    });
    fixture = TestBed.createComponent(PurchasingItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
