import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-order-item-form',
  templateUrl: './order-item-form.component.html',
  styleUrls: ['./order-item-form.component.scss']
})
export class OrderItemFormComponent {

  @Output() openProductWindow = new EventEmitter<any>();
  
  isSaved = false;
  
  orderItemForm = new FormGroup({
    itemNumber: new FormControl(),
    productCode: new FormControl({value: '', disabled: true}),
    productName: new FormControl({value: '', disabled: true}, Validators.required),
    price: new FormControl({value: 0.00, disabled: true}),
    vat: new FormControl({value: 0.00, disabled: true}),
    quantity: new FormControl(1),
  })
  
}
