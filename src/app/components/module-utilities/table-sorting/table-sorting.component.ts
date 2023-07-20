import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-table-sorting',
  templateUrl: './table-sorting.component.html',
  styleUrls: ['./table-sorting.component.scss']
})
export class TableSortingComponent {
  
  @Input() fieldTitle: string = "";
  @Input() thisColumn: string = "";
  @Input() sortColumn: string = "";
  @Input() sortDirection: string = "";
  @Output() sortColumnChange = new EventEmitter<string>();
  @Output() sortDirectionChange = new EventEmitter<string>();
  @Output() sortData = new EventEmitter<string>();

  doSort(direction: string){
    this.sortColumnChange.emit(this.thisColumn);
    this.sortDirectionChange.emit(direction);
    this.sortData.emit();
  }  
  
}
