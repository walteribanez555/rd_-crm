import { NgModule } from '@angular/core';
import { ExtractDatePipe } from './extract-date.pipe';
import { DollarPipe } from './dolar.pipe';
import { DateOnlyPipe } from './getDateOnly.pipe';
import { ZeroFilterPipe } from './zero-filtered.pipe';
import { ZeroToMessagePipe } from './zero-to-message.pipe';
import { SignalsPipe } from './signals.pipe';
// import { RolPipe } from './rol.pipe';



@NgModule({
  declarations: [
    ExtractDatePipe,
    DollarPipe,
    DateOnlyPipe,
    ZeroFilterPipe,
    ZeroToMessagePipe,
    SignalsPipe,
    // RolPipe
  ],

  exports: [
    ExtractDatePipe,
    DollarPipe,
    DateOnlyPipe,
    ZeroFilterPipe,
    ZeroToMessagePipe,
    SignalsPipe,
    // RolPipe,
  ]
})
export class PipesModule { }
