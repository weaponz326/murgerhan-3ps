import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { SuppliersApiService } from 'src/app/services/modules-api/suppliers-api/suppliers-api.service';
import { AggregateTableService } from 'src/app/services/module-utilities/aggregate-table/aggregate-table.service';
import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';

import { ConnectionToastComponent } from '../../module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-select-stock-item',
  templateUrl: './select-stock-item.component.html',
  styleUrls: ['./select-stock-item.component.scss']
})
export class SelectStockItemComponent {

  constructor(
    private suppliersApi: SuppliersApiService,
    private aggregateTable: AggregateTableService,
    private formatId: FormatIdService
  ) { }

  @Output() rowSelected = new EventEmitter<object>();
  @Input() closeTarget = "";

  @ViewChild('openButtonElementReference', { read: ElementRef, static: false }) openButton!: ElementRef;
  @ViewChild('closeButtonElementReference', { read: ElementRef, static: false }) closeButton!: ElementRef;

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  stockItemListData: any[] = [];

  isFetchingData: boolean =  false;
  isDataAvailable: boolean =  true;

  tableColumns = ['item_code', 'item_name', 'item_category'];
  filterText = "";
  sortDirection = "";
  sortColumn = "";
  currentPage = 0;
  totalPages = 0;
  pageSize = 15;

  openModal(){
    this.stockItemListData = [];
    this.getStockItemList();
    this.openButton.nativeElement.click();
  }

  getStockItemList(){
    this.isFetchingData = true;

    // this.suppliersApi.getStockItemList()
    //   .then(
    //     (res: any) => {
    //       // console.log(res);
    //       this.stockItemListData = res.docs;
    //       this.isFetchingData = false;

    //       this.totalPages = Math.ceil(res.docs.length / this.pageSize);
    //       if(res.docs.length == 0){
    //         this.isDataAvailable = false;
    //       }
    //       else{
    //         this.currentPage = 1;
    //         this.isDataAvailable = true;
    //       }

    //       this.aggregateData();
    //     },
    //     (err: any) => {
    //       // console.log(err);
    //       this.connectionToast.openToast();
    //       this.isFetchingData = false;
    //     }
    //   )
  }

  selectRow(row: any){
    this.rowSelected.emit(row);
    this.closeButton.nativeElement.click();
    // console.log(row);
  }

  aggregateData(){
    // console.log("lets aggregate this table's data...");
    this.stockItemListData = this.aggregateTable.filterData(this.stockItemListData, this.filterText, this.tableColumns);
    this.stockItemListData = this.aggregateTable.sortData(this.stockItemListData, this.sortColumn, this.sortDirection);
    this.stockItemListData = this.aggregateTable.paginateData(this.stockItemListData, this.currentPage, this.pageSize);
  }
  
  getFormatId(id: any){
    return this.formatId.formatId(id, 5, "#", "SI");
  }

}
