import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-table-paginator',
  templateUrl: './table-paginator.component.html',
  styleUrls: ['./table-paginator.component.scss']
})
export class TablePaginatorComponent {

  @Input() currentPageNumber = 0;
  @Input() currentPageSize = 0;
  
  @Input() currentPage = 0;
  @Input() totalPages = 0;
  @Input() pageSize = 0;
  @Output() currentPageChange = new EventEmitter<number>();
  @Output() pageData = new EventEmitter<any>();
  
  changePage(event: any, page: any){
    event.preventDefault();
    this.currentPage = page;
    this.pageData.emit();
  }

}
