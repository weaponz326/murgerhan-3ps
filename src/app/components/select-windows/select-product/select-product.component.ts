import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { VendorsApiService } from 'src/app/services/modules-api/vendors-api/vendors-api.service';
import { AggregateTableService } from 'src/app/services/module-utilities/aggregate-table/aggregate-table.service';
import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';

import { ConnectionToastComponent } from '../../module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-select-product',
  templateUrl: './select-product.component.html',
  styleUrls: ['./select-product.component.scss']
})
export class SelectProductComponent {

  constructor(
    private vendorsApi: VendorsApiService,
    private aggregateTable: AggregateTableService,
    private formatId: FormatIdService
  ) { }

  @Output() rowSelected = new EventEmitter<object>();
  @Input() closeTarget = "";

  @ViewChild('openButtonElementReference', { read: ElementRef, static: false }) openButton!: ElementRef;
  @ViewChild('closeButtonElementReference', { read: ElementRef, static: false }) closeButton!: ElementRef;

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  productListData: any[] = [];

  isFetchingData: boolean =  false;
  isDataAvailable: boolean =  true;

  tableColumns = ['product_code', 'product_name', 'price'];
  filterText = "";
  sortDirection = "";
  sortColumn = "";
  currentPage = 1;
  totalPages = 0;
  pageSize = 15;

  openModal(){
    this.productListData = [];
    this.getProductList();
    this.openButton.nativeElement.click();
  }

  getProductList(){
    this.isFetchingData = true;

    this.vendorsApi.getProductList()
      .then(
        (res: any) => {
          // console.log(res);
          this.productListData = res.docs;
          this.isFetchingData = false;

          this.totalPages = Math.ceil(res.docs.length / this.pageSize);
          if(res.docs.length == 0){
            this.currentPage = 0;
            this.isDataAvailable = false;
          }

          this.aggregateData();
        },
        (err: any) => {
          // console.log(err);
          this.connectionToast.openToast();
          this.isFetchingData = false;
        }
      )
  }

  selectRow(row: any){
    this.rowSelected.emit(row);
    this.closeButton.nativeElement.click();
    // console.log(row);
  }
  
  aggregateData(){
    // console.log("lets aggregate this table's data...");
    this.productListData = this.aggregateTable.filterData(this.productListData, this.filterText, this.tableColumns);
    this.productListData = this.aggregateTable.sortData(this.productListData, this.sortColumn, this.sortDirection);
    this.productListData = this.aggregateTable.paginateData(this.productListData, this.currentPage, this.pageSize);
  }
  
  getFormatId(id: any){
    return this.formatId.formatId(id, 4, "#", "PR");
  }
  
}
