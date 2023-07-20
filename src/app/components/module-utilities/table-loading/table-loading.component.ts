import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-table-loading',
  templateUrl: './table-loading.component.html',
  styleUrls: ['./table-loading.component.scss']
})
export class TableLoadingComponent {

  constructor() { }

  @Input() loaderSize = "";
  @Input() isLoading = false;
  @Input() isNoData = false;

}
