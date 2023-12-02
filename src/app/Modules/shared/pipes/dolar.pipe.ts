import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dolar'
})
export class DollarPipe implements PipeTransform {
  transform(value: number | string, args?: any): string {
    const numberValue = parseFloat(String(value));
    return isNaN(numberValue) ? '' : `$${numberValue.toFixed(2)}`;
  }
}
