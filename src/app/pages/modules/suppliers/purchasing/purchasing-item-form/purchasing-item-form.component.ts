import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-purchasing-item-form',
  templateUrl: './purchasing-item-form.component.html',
  styleUrls: ['./purchasing-item-form.component.scss']
})
export class PurchasingItemFormComponent {

  @Output() openItemWindow = new EventEmitter<any>();

  isSaved = false;
  
  purchasingItemForm = new FormGroup({
    itemNumber: new FormControl(),
    itemCode: new FormControl({value: '', disabled: true}),
    itemName: new FormControl({value: '', disabled: true}, Validators.required),
    unitPrice: new FormControl({value: 0.00, disabled: true}),
    quantity: new FormControl(1),
  })
  
}
