import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CountriesISO, codigos } from './countries-iso.data';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'input-telf',
  templateUrl: './input-telf.component.html',
  styleUrls: ['./input-telf.component.css'],
})
export class InputTelfComponent {
  ngOnInit(): void {
    this.filteredCountries = this.countries;
  }

  isToggle: boolean = false;
  searchInput: string = 'Select Country';
  selectedCountry: CountriesISO | null = null;

  searchText: string = '';

  inputTelf: string | null = null;

  @Input() telfControl!: FormControl;

  updateToggle() {
    this.isToggle = !this.isToggle;
  }

  updateActualName(selectedCountry: CountriesISO) {
    this.selectedCountry = selectedCountry;
    this.searchInput =
      selectedCountry.name + ' (' + selectedCountry.phone_code + ')';
    this.isToggle = false;
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
    if (this.inputTelf && this.selectedCountry) {
      this.telfControl.setValue(this.selectedCountry.phone_code + '-' + this.inputTelf);
    }
  }

  countries: CountriesISO[] = codigos;
  filteredCountries: CountriesISO[] = [];
}
