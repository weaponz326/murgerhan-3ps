import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatIdService {

  constructor() { }

  formatId(value: number, length: number, prefix: string, suffix: string): string {
    let paddedNumber = value.toString();

    while (paddedNumber.length < length) {
      paddedNumber = '0' + paddedNumber;
    }

    return prefix + paddedNumber + suffix;
  }

}
