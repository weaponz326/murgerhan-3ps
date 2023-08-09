import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectStockItemComponent } from './select-stock-item.component';

describe('SelectStockItemComponent', () => {
  let component: SelectStockItemComponent;
  let fixture: ComponentFixture<SelectStockItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectStockItemComponent]
    });
    fixture = TestBed.createComponent(SelectStockItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
