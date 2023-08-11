import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { AdminApiService } from 'src/app/services/modules-api/admin-api/admin-api.service';

import { ConnectionToastComponent } from '../../module-utilities/connection-toast/connection-toast.component';


@Component({
  selector: 'app-select-branch',
  templateUrl: './select-branch.component.html',
  styleUrls: ['./select-branch.component.scss']
})
export class SelectBranchComponent {

  constructor(private adminApi: AdminApiService) { }

  @Output() rowSelected = new EventEmitter<object>();
  @Input() closeTarget = "";

  @ViewChild('openButtonElementReference', { read: ElementRef, static: false }) openButton!: ElementRef;
  @ViewChild('closeButtonElementReference', { read: ElementRef, static: false }) closeButton!: ElementRef;

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;

  branchListData: any[] = [];

  isFetchingData: boolean =  false;
  isDataAvailable: boolean =  true;

  openModal(){
    this.branchListData = [];
    this.getBranchList();
    this.openButton.nativeElement.click();
  }

  getBranchList(){
    this.isFetchingData = true;

    this.adminApi.getBranchList()
      .then(
        (res: any) => {
          // console.log(res);
          this.branchListData = res.docs;
          this.isFetchingData = false;
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
  
}
