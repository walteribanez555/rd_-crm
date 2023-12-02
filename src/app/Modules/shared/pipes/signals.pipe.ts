import { Pipe, PipeTransform, inject } from '@angular/core';
import { TransformDataService } from '../services/utils/transform-data.service';

@Pipe({
  name: 'signals_string'
})
export class SignalsPipe implements PipeTransform {

  private  transformDataService  = inject(TransformDataService);

  transform(value: string ): string {

    return this.transformDataService.trasnformStringtoSignals(value);
  }

}
