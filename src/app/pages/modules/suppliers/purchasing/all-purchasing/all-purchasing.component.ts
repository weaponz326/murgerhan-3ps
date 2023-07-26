import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

// import { InventoryApiService } from 'src/app/services/modules-api/inventory-api/inventory-api.service';
// import { AggregateTableService } from 'src/app/services/module-utilities/aggregate-table/aggregate-table.service';
// import { FormatIdService } from 'src/app/services/module-utilities/format-id/format-id.service';

import { NewPurchasingComponent } from '../new-purchasing/new-purchasing.component';
import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-all-purchasing',
  templateUrl: './all-purchasing.component.html',
  styleUrls: ['./all-purchasing.component.scss']
})
export class AllPurchasingComponent {

  constructor(
    private router: Router,
    // private inventoryApi: InventoryApiService,
    // private aggregateTable: AggregateTableService,
    // private formatId: FormatIdService
  ) { }

  @ViewChild('newPurchasingComponentReference', { read: NewPurchasingComponent, static: false }) newPurchasing!: NewPurchasingComponent;
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
  pageSize = 25;

  ngOnInit(): void {
    this.getPurchasingList();
  }

  getPurchasingList(){
    this.isFetchingData = true;

    // this.inventoryApi.getPurchasingList()
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

  viewPurchasing(purchasingId: any){
    // console.log(purchasingId);

    sessionStorage.setItem("inventory_purchasing_id", purchasingId);
    this.router.navigateByUrl("/modules/inventory/purchasing/view-purchasing");
  }

  aggregateData(){
    // // console.log("lets aggregate this table's data...");
    // this.purchasingListData = this.aggregateTable.filterData(this.purchasingListData, this.filterText, this.tableColumns);
    // this.purchasingListData = this.aggregateTable.sortData(this.purchasingListData, this.sortColumn, this.sortDirection);
    // this.purchasingListData = this.aggregateTable.paginateData(this.purchasingListData, this.currentPage, this.pageSize);
  }

  getFormatId(id: any){
    // return this.formatId.formatId(id, 5, "#", "PC");
  }

}
