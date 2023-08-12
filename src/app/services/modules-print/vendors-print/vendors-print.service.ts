import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';

import { PrintPdfService } from '../../module-utilities/print-pdf/print-pdf.service';
import { FormatIdService } from '../../module-utilities/format-id/format-id.service';
import { VendorsApiService } from '../../modules-api/vendors-api/vendors-api.service';

@Injectable({
  providedIn: 'root'
})
export class VendorsPrintService {

  constructor(
    private printPdf: PrintPdfService,
    private formatId: FormatIdService,
    private vendorsApi: VendorsApiService
  ) { }
  
  async getInvoice(){
    const orderData: any = await this.vendorsApi.getOrder(sessionStorage.getItem('vendors_order_id'));
    const orderItemListData: any = await this.vendorsApi.getOrderItemList();
    
    var orderBody = [
      ['Order ID', ':', this.formatId.formatId(orderData.data().order_code, 5, "#", "RD")],
      ['Order Date', ':', orderData.data().order_date],
      ['Vendor ID', ':', this.formatId.formatId(orderData.data().vendor.data.vendor_code, 4, "#", "VE")],
      ['Vendor Name', ':', orderData.data().vendor.data.vendor_name],
      ['Branch', ':', orderData.data().branch.data.branch_name],
      ['Order Status', ':', orderData.data().order_status],
      ['Delivery Date', ':', orderData.data().delivery_date],
    ]

    var orderItemListBody = [['No.', 'Product Name', 'Unit Price', 'Quantity', 'Total Price', 'VAT (%)', 'VAT (&pound;)']];

    for (let data of orderItemListData.docs){
      var row = [];
      let rowData: any = data.data();
      row.push(rowData.item_number);
      row.push(rowData.product.data.product_name);
      row.push(rowData.product.data.price);
      row.push(rowData.quantity);      
      row.push(rowData.product.data.price * rowData.quantity);
      row.push(rowData.product.data.vat);
      row.push(rowData.product?.data?.price * rowData.quantity) * (rowData.product?.data?.vat / 100);
      orderItemListBody.push(row);
    }

    let content = [
      {
        columns: [
          [
            {
              layout: 'noBorders',
              table: {
                headerRows: 0,
                widths: ['33%', '2%', '65%'],
                body: orderBody
              }
            }
          ],
          [
            { text: 'OrderTotal', alignment: 'center' },
            { text: '$' + orderData.data().total_price, bold: true, alignment: 'center', margin: [0, 20] }
          ]
        ]
      },
      { text: 'Order Products', bold: true, margin: [0, 30, 0, 10] },
      {
        layout: 'lightHorizontalLines',
        table: {
          headerRows: 1,
          widths: ['7%', '25%', '10%', '10%', '10%', '7%', '10%'],
          body: orderItemListBody
        }
      }
    ]

    var header = 'Murger Han Hub - Order';
    this.printPdf.openPdf(header, content);
  }

  dateFormat(date: any){
    return formatDate(new Date(date), 'yyyy-MM-dd', 'en-US');
  }

}