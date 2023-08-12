import { Injectable } from '@angular/core';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
import { PageSize } from 'pdfmake/interfaces';


@Injectable({
  providedIn: 'root'
})
export class PrintPdfService {

  constructor() { }

  openPdf(header: any, content: any) {
    const def = { header: header, content: content };
    pdfMake.createPdf(def).open();
  }

  printPdf(content: any) {
    const def = { content: content };
    pdfMake.createPdf(def).print();
  }

  downloadPdf(content: any) {
    const def = { content: content };
    pdfMake.createPdf(def).download();
  }

  printRoll(content: any) {
    // TODO:
    const pageSize: PageSize = {
      width: 595.28,
		  height: 'auto'
    }

    const def = { content: content, pageSize: pageSize };
    pdfMake.createPdf(def).print();
  }

  getPdfFile(content: any) {
    const def = { content: content };
    pdfMake.createPdf(def).getBlob((blob: Blob) => {
      return blob;
    });
  }
  
}
