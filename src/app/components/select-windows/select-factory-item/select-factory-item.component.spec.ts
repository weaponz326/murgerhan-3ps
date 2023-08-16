import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectFactoryItemComponent } from './select-factory-item.component';

describe('SelectFactoryItemComponent', () => {
  let component: SelectFactoryItemComponent;
  let fixture: ComponentFixture<SelectFactoryItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectFactoryItemComponent]
    });
    fixture = TestBed.createComponent(SelectFactoryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
