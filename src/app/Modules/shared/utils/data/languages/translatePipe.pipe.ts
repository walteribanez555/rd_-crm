import { Pipe, type PipeTransform } from '@angular/core';
import { PdfPoliza } from './data/poliza.pdf';

@Pipe({
  name: 'TranslatePipe',
})
export class TranslatePipe implements PipeTransform {

  transform(value: string): string{
    const lang = localStorage.getItem('lang');

    if(lang == 'es' || !lang){
      return value;
    }

    const languageItem = PdfPoliza.find(item => item.word === value);
    if (languageItem) {
      const translation = languageItem.translations[lang!];
      return translation;
    }

    return value;
  }

}
