import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'zeroToMessage'
})
export class ZeroToMessagePipe implements PipeTransform {

  transform(value: string ): string {
    if (value === '0') {
      return 'No contiene';
    }

    // if(value.length>30) {
    //   return value.slice(0, 30) + '...';
    // }
    return value;
  }
}
