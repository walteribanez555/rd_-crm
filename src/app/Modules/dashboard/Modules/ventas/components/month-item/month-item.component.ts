import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'month-item',
  templateUrl: './month-item.component.html',
  styleUrls: ['./month-item.component.css'],
})
export class MonthItemComponent {


  @Input() month! : string;
  @Input() position! : number;



  getParamsRoute(index : number) {
    const {firstDate, lastDate} = this.getFirstAndLastDateOfMonth(new Date().getFullYear(), index);
    const params = `./dashboard/reporte/ventas/data?init=${firstDate}&end=${lastDate}`;
    return params;
  }

  getFirstAndLastDateOfMonth(year: number, month: number): { firstDate: string, lastDate: string } {
    // Create a Date object for the given year and month (months are zero-based in JavaScript/TypeScript)
    const firstDate = new Date(year, month, 1).toISOString().split('T')[0];

    // Calculate the last date of the next month and subtract one day to get the last date of the current month
    const nextMonth = new Date(year, month + 1, 1);
    const lastDate = new Date(nextMonth.getTime() - 1).toISOString().split('T')[0];

    return { firstDate, lastDate };
  }



}
