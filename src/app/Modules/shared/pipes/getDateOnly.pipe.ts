import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({ name: 'dateOnly' })
export class DateOnlyPipe implements PipeTransform {
  transform(value: string, format: string = 'yyyy-MM-dd'): string | null {
    const datePipe = new DatePipe('en-US');
    const date = new Date(value);
    return datePipe.transform(date, format);
  }
}