import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConnectionToastComponent } from './connection-toast/connection-toast.component';
import { DeleteModalOneComponent } from './delete-modal-one/delete-modal-one.component';
import { DeleteModalTwoComponent } from './delete-modal-two/delete-modal-two.component';
import { TableSortingComponent } from './table-sorting/table-sorting.component';
import { TableLoadingComponent } from './table-loading/table-loading.component';
import { TablePaginatorComponent } from './table-paginator/table-paginator.component';



@NgModule({
  declarations: [
    ConnectionToastComponent,
    DeleteModalOneComponent,
    DeleteModalTwoComponent,
    TableSortingComponent,
    TableLoadingComponent,
    TablePaginatorComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ConnectionToastComponent,
    DeleteModalOneComponent,
    DeleteModalTwoComponent,
    TableSortingComponent,
    TableLoadingComponent,
    TablePaginatorComponent
  ]
})
export class ModuleUtilitiesModule { }
