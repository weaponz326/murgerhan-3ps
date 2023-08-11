import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { SuppliersApiService } from 'src/app/services/modules-api/suppliers-api/suppliers-api.service';
import { AggregateTableService } from 'src/app/services/module-utilities/aggregate-table/aggregate-table.service';
import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';

import { ConnectionToastComponent } from '../../module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-select-purchasing',
  templateUrl: './select-purchasing.component.html',
  styleUrls: ['./select-purchasing.component.scss']
})
export class SelectPurchasingComponent {

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

  purchasingListData: any[] = [];

  isFetchingData: boolean =  false;
  isDataAvailable: boolean =  true;

  tableColumns = ['purchasing_code', 'purchasing_date', 'supplier_name', 'total_price'];
  filterText = "";
  sortDirection = "";
  sortColumn = "";
  currentPage = 0;
  totalPages = 0;
  pageSize = 15;

  openModal(){
    this.purchasingListData = [];
    this.getPurchasingList();
    this.openButton.nativeElement.click();
  }

  getPurchasingList(){
    this.isFetchingData = true;

    // this.suppliersApi.getPurchasingList()
    //   .then(
    //     (res: any) => {
    //       // console.log(res);
    //       this.purchasingListData = res.docs;
    //       this.isFetchingData = false;

    //       this.totalPages = Math.ceil(res.docs.length / this.pageSize);
    //       if(res.docs.length == 0)
    //         this.isDataAvailable = false;
    //       else
    //         this.currentPage = 1

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
    this.purchasingListData = this.aggregateTable.filterData(this.purchasingListData, this.filterText, this.tableColumns);
    this.purchasingListData = this.aggregateTable.sortData(this.purchasingListData, this.sortColumn, this.sortDirection);
    this.purchasingListData = this.aggregateTable.paginateData(this.purchasingListData, this.currentPage, this.pageSize);
  }

  getFormatId(id: any){
    return this.formatId.formatId(id, 5, "#", "PC");
  }

}
