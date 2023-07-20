import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOrderItemComponent } from './edit-order-item.component';

describe('EditOrderItemComponent', () => {
  let component: EditOrderItemComponent;
  let fixture: ComponentFixture<EditOrderItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditOrderItemComponent]
    });
    fixture = TestBed.createComponent(EditOrderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
