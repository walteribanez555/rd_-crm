import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'zeroFilter'
})
export class ZeroFilterPipe implements PipeTransform {
  transform(value: string): string {
    if (value === '0') {
      return '';
    }
    return value;
  }
}
