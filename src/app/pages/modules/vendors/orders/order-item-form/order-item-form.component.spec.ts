import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderItemFormComponent } from './order-item-form.component';

describe('OrderItemFormComponent', () => {
  let component: OrderItemFormComponent;
  let fixture: ComponentFixture<OrderItemFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderItemFormComponent]
    });
    fixture = TestBed.createComponent(OrderItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
