import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';

import { PrintPdfService } from '../../module-utilities/print-pdf/print-pdf.service';
import { FormatIdService } from '../../module-utilities/format-id/format-id.service';
import { FactoryApiService } from '../../modules-api/factory-api/factory-api.service';

@Injectable({
  providedIn: 'root'
})
export class VendorsPrintService {

  constructor(
    private printPdf: PrintPdfService,
    private formatId: FormatIdService,
    private factoryApi: FactoryApiService
  ) { }
  
  async getInvoice(){
    const orderData: any = await this.factoryApi.getVendorOrder(sessionStorage.getItem('vendors_order_id'));
    const orderItemListData: any = await this.factoryApi.getVendorOrderItemList();
    
    var orderBody = [
      ['Order ID', ':', this.formatId.formatId(orderData.data().order_code, 5, "#", "RD")],
      ['Order Date', ':', orderData.data().order_date],
      ['Vendor ID', ':', this.formatId.formatId(orderData.data().vendor.data.vendor_code, 4, "#", "VE")],
      ['Vendor Name', ':', orderData.data().vendor.data.vendor_name],
      ['Order Status', ':', orderData.data().order_status],
      ['Delivery Date', ':', orderData.data().delivery_date],
    ]

    var orderItemListBody = [['No.', 'Item Name', 'Unit Price', 'Quantity', 'Total Price', 'VAT (%)', 'VAT (\u00A3)']];

    for (let data of orderItemListData.docs){
      var row = [];
      let rowData: any = data.data();
      row.push(rowData.item_number);
      row.push(rowData.factory_item.data.item_name);
      row.push(rowData.factory_item.data.price);
      row.push(rowData.quantity);      
      row.push(rowData.factory_item.data.price * rowData.quantity);
      row.push(rowData.factory_item.data.vat);
      row.push(rowData.factory_item?.data?.price * rowData.quantity) * (rowData.factory_item?.data?.vat / 100);
      orderItemListBody.push(row);
    }

    orderItemListBody.push(['', '', '', '', this.calculateTotalPrice(orderItemListData.docs), '', this.calculateTotalVat(orderItemListData.docs)])

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
            { text: '$' + orderData.data().order_total, bold: true, alignment: 'center', margin: [0, 20] }
          ]
        ]
      },
      { text: 'Order Items', bold: true, margin: [0, 30, 0, 10] },
      {
        layout: 'lightHorizontalLines',
        table: {
          headerRows: 1,
          widths: ['6%', '25%', '10%', '12%', '10%', '6%', '10%'],
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

  calculateTotalPrice(itemsData: any){
    var totalPrice = 0;
    for (let item of itemsData){
      totalPrice += item.data().factory_item.data.price * item.data().quantity;
    }

    return String(totalPrice);
  }

  calculateTotalVat(itemsData: any){
    var totalVat = 0;
    for (let item of itemsData){
      totalVat += (item.data().factory_item.data.price * item.data().quantity) * (item.data().factory_item.data.vat / 100);
    }

    return String(totalVat);
  }

}
