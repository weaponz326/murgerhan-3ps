import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AggregateTableService {

  constructor() { }

  filterData(data: any[], filterText: string, columns: string[]): any[] {
    if (!filterText || !columns || columns.length === 0) {
      return data; // Return unfiltered data if no filter text or columns are provided
    }

    filterText = filterText.toLowerCase();
    // console.log(filterText);

    return data.filter(item => {
      for (const column of columns) {
        const columnValue = item.data()[column];
        if (columnValue && columnValue.toString().toLowerCase().includes(filterText)) {
          return true; // Include the item if the filter text is found in any column
        }
      }

      return false; // Exclude the item if the filter text is not found in any column
    });
  }

  sortData(data: any[], sortColumn: string, sortDirection: string): any[] {
    if (!sortColumn || !sortDirection) {
      return data; // Return unsorted data if no sort column or sort direction is provided
    }

    return data.sort((a, b) => {
      const valueA = a.data()[sortColumn];
      const valueB = b.data()[sortColumn];

      if (valueA === valueB) {
        return 0;
      }

      if (sortDirection === 'asc') {
        return valueA < valueB ? -1 : 1;
      } else {
        return valueA > valueB ? -1 : 1;
      }
    });
  }

  paginateData(data: any[], currentPage: number, pageSize: number): any[] {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    return data.slice(startIndex, endIndex);
  }

  getDataRange(data: any[], startDate: Date, endDate: Date): any[] {
    return data.filter(item => {
      const createdAt = new Date(item.data().created_at.toDate());
      return createdAt >= startDate && createdAt <= endDate;
    });
  }

}
