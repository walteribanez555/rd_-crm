import { Injectable } from '@angular/core';
import { signalString } from '../../enums/signalStrings.enum';

@Injectable({
  providedIn: 'root'
})
export class TransformDataService {

  constructor() { }

  transformSignalstoString(input: string): string {
    const transformedString = input
    .replace(/!/g, signalString.signal_exclamation)
    .replace(/¡/g, signalString.signal_exclamation_inverse)
    .replace(/\?/g, signalString.signal_interrogation)
    .replace(/¿/g, signalString.signal_interrogation_inverse);

  return transformedString;


    return transformedString;
  }


  trasnformStringtoSignals(input: string): string {
    const reversedString = input
      .replace(/\(exclamationinverse\)/g, "!")
      .replace(/\(exclamation\)/g, "¡")
      .replace(/\(interrogation\)/g, "?")
      .replace(/\(interrogationinverse\)/g, "¿");

    return reversedString;
  }





}
