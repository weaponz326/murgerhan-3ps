import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { FactoryApiService } from 'src/app/services/modules-api/factory-api/factory-api.service';
import { AggregateTableService } from 'src/app/services/module-utilities/aggregate-table/aggregate-table.service';
import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';

import { AddOrderComponent } from '../add-order/add-order.component';
import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.scss']
})
export class AllOrdersComponent {

  constructor(
    private router: Router,
    private factoryApi: FactoryApiService,
    private aggregateTable: AggregateTableService,
    private formatId: FormatIdService,
  ) { }

  @ViewChild('addOrderComponentReference', { read: AddOrderComponent, static: false }) addOrder!: AddOrderComponent;
  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  orderListData: any[] = [];

  isFetchingData: boolean =  false;
  isDataAvailable: boolean =  true;

  tableColumns = ['order_code', 'order_date', 'vendor_name', 'total_price'];
  filterText = "";
  sortDirection = "";
  sortColumn = "";
  currentPage = 1;
  totalPages = 0;
  pageSize = 25;

  ngOnInit(): void {
    this.getVendorOrderList();
  }

  getVendorOrderList(){
    this.isFetchingData = true;

    this.factoryApi.getVendorOrderList()
      .then(
        (res: any) => {
          // console.log(res);
          this.orderListData = res.docs;
          this.isFetchingData = false;

          this.totalPages = Math.ceil(res.docs.length / this.pageSize);
          if(res.docs.length == 0){
            this.currentPage = 0;
            this.isDataAvailable = false;
          }

          this.aggregateData();
        },
        (err: any) => {
          console.log(err);
          this.connectionToast.openToast();
          this.isFetchingData = false;
        }
      )
  }

  viewOrder(orderId: any){
    // console.log(orderId);

    sessionStorage.setItem("vendors_order_id", orderId);
    this.router.navigateByUrl("/home/vendors/orders/view-order");
  }

  aggregateData(){
    // console.log("lets aggregate this table's data...");
    this.orderListData = this.aggregateTable.filterData(this.orderListData, this.filterText, this.tableColumns);
    this.orderListData = this.aggregateTable.sortData(this.orderListData, this.sortColumn, this.sortDirection);
    this.orderListData = this.aggregateTable.paginateData(this.orderListData, this.currentPage, this.pageSize);
  }

  getFormatId(id: any){
    return this.formatId.formatId(id, 5, "#", "RD");
  }

}
