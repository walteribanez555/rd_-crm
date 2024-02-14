import { ChangeDetectorRef, Component, Input, inject } from '@angular/core';
import { CountriesISO, codigos } from './countries-iso.data';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'input-telf',
  templateUrl: './input-telf.component.html',
  styleUrls: ['./input-telf.component.css'],
})
export class InputTelfComponent {
  ngOnInit(): void {
    this.cdr.detectChanges();
    this.filteredCountries = this.countries;
    // this.filterByCode();
    // this.telfControl?.registerOnChange(() => {
    //   this.filterByCode();
    // });
  }

  // filterByCode() {

  //   console.log(this.telfControl);

  //   if ((this.telfControl?.value as string).startsWith('N')) {
  //     return;
  //   }


  //   if(!this.telfControl){

  //   }


  //   const numberComposed = (this.telfControl!.value as string).split('-');
  //   // this.inputTelf = numberComposed[1];

  //   console.log(numberComposed[1]);

  //   const country = this.countries.filter((country) =>
  //     country.phone_code
  //       .startsWith(numberComposed[0].toLowerCase())
  //   )[0];

  //   this.updateActualName(country);

  // }

  isToggle: boolean = false;
  searchInput: string = 'Select Country';
  selectedCountry: CountriesISO | null = null;

  private cdr = inject(ChangeDetectorRef);
  searchText: string = '';

  inputTelf: string | null = null;

  @Input() telfControl?: FormControl<any>;

  updateToggle() {
    this.isToggle = !this.isToggle;
  }

  updateActualName(selectedCountry: CountriesISO) {
    this.selectedCountry = selectedCountry;
    this.searchInput =
      selectedCountry.name + ' (' + selectedCountry.phone_code + ')';
    this.isToggle = false;

    // console.log(this.telfControl?.value);

    if(!this.telfControl){
      return;
    }

    const inputData = (this.telfControl?.value as string).split('-');

    if(inputData.length>1){
      inputData[0] = selectedCountry.phone_code
    }else{
      inputData.unshift(selectedCountry.phone_code)
    }

    this.telfControl?.setValue(inputData.join('-'));
    // this.cdr.detectChanges();
  }

  filterBySearch() {
    this.filteredCountries = this.countries.filter(
      (country) =>
        country.name.toLowerCase().startsWith(this.searchText.toLowerCase()) ||
        country.phone_code
          .toLowerCase()
          .startsWith(this.searchText.toLowerCase())
    );
  }

  onWriteInput(event: any) {
    // this.inputTelf = event;
    // console.log(this.inputTelf);

    // this.inputTelf = this.selectedCountry?.phone_code + '-' + this.inputTelf
    this.telfControl?.setValue(
      this.inputTelf
    )
    // if (this.inputTelf && this.selectedCountry) {
    //   this.telfControl?.setValue(
    //     this.selectedCountry.phone_code + '-' + this.inputTelf
    //   );
    // }
  }

  countries: CountriesISO[] = codigos;
  filteredCountries: CountriesISO[] = [];
}
