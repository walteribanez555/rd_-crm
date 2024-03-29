import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CountryRegion, countriesRegion } from '../../utils/data/countries-region.ts/countries-region';

@Component({
  selector: 'select-custom',
  templateUrl: './selectCustom.component.html',
  styleUrls: ['./selectCustom.component.css'],
})
export class SelectCustomComponent implements OnInit {
  ngOnInit(): void {
    this.filteredCountries = this.countries;
  }

  isToggle: boolean = false;
  searchInput: string = 'Select Country';

  searchText: string = '';

  updateToggle() {
    this.isToggle = !this.isToggle;
  }

  filteredCountries: CountryRegion[] = [];

  updateActualName(selectedCountry: CountryRegion) {
    this.searchInput = selectedCountry.country;
    this.isToggle = false;
    this.onselectDestiny.emit(selectedCountry);
  }

  filterBySearch() {
    this.filteredCountries = this.countries.filter((country) =>
      country.country.toLowerCase().startsWith(this.searchText.toLowerCase())
    );
  }

  @Output() onselectDestiny = new EventEmitter<CountryRegion>();


  countries : CountryRegion[] = countriesRegion;

  // countries: string[] = [
  //   'America del sur',
  //   'America del norte',
  //   'Centro America',
  //   'Europa',
  //   'Asia',
  //   'Oceania',
  //   'Afganistán',
  //   'Albania',
  //   'Alemania',
  //   'Andorra',
  //   'Angola',
  //   'Antigua y Barbuda',
  //   'Arabia Saudita',
  //   'Argelia',
  //   'Argentina',
  //   'Armenia',
  //   'Australia',
  //   'Austria',
  //   'Azerbaiyán',
  //   'Bahamas',
  //   'Bangladés',
  //   'Barbados',
  //   'Baréin',
  //   'Bélgica',
  //   'Belice',
  //   'Benín',
  //   'Bielorrusia',
  //   'Birmania',
  //   'Bolivia',
  //   'Bosnia y Herzegovina',
  //   'Botsuana',
  //   'Brasil',
  //   'Brunéi',
  //   'Bulgaria',
  //   'Burkina Faso',
  //   'Burundi',
  //   'Bután',
  //   'Cabo Verde',
  //   'Camboya',
  //   'Camerún',
  //   'Canada',
  //   'Catar',
  //   'Chad',
  //   'Chile',
  //   'China',
  //   'Chipre',
  //   'Ciudad del Vaticano',
  //   'Colombia',
  //   'Comoras',
  //   'Corea del Norte',
  //   'Corea del Sur',
  //   'Costa de Marfil',
  //   'Costa Rica',
  //   'Croacia',
  //   'Cuba',
  //   'Dinamarca',
  //   'Dominica',
  //   'Ecuador',
  //   'Egipto',
  //   'El Salvador',
  //   'Emiratos Árabes Unidos',
  //   'Eritrea',
  //   'Eslovaquia',
  //   'Eslovenia',
  //   'España',
  //   'Estados Unidos',
  //   'Estonia',
  //   'Etiopía',
  //   'Filipinas',
  //   'Finlandia',
  //   'Fiyi',
  //   'Francia',
  //   'Gabón',
  //   'Gambia',
  //   'Georgia',
  //   'Ghana',
  //   'Granada',
  //   'Grecia',
  //   'Guatemala',
  //   'Guyana',
  //   'Guinea',
  //   'Guinea ecuatorial',
  //   'Guinea-Bisáu',
  //   'Haití',
  //   'Honduras',
  //   'Hungría',
  //   'India',
  //   'Indonesia',
  //   'Irak',
  //   'Irán',
  //   'Irlanda',
  //   'Islandia',
  //   'Islas Marshall',
  //   'Islas Salomón',
  //   'Israel',
  //   'Italia',
  //   'Jamaica',
  //   'Japón',
  //   'Jordania',
  //   'Kazajistán',
  //   'Kenia',
  //   'Kirguistán',
  //   'Kiribati',
  //   'Kuwait',
  //   'Laos',
  //   'Lesoto',
  //   'Letonia',
  //   'Líbano',
  //   'Liberia',
  //   'Libia',
  //   'Liechtenstein',
  //   'Lituania',
  //   'Luxemburgo',
  //   'Macedonia del Norte',
  //   'Madagascar',
  //   'Malasia',
  //   'Malaui',
  //   'Maldivas',
  //   'Malí',
  //   'Malta',
  //   'Marruecos',
  //   'Mauricio',
  //   'Mauritania',
  //   'México',
  //   'Micronesia',
  //   'Moldavia',
  //   'Mónaco',
  //   'Mongolia',
  //   'Montenegro',
  //   'Mozambique',
  //   'Namibia',
  //   'Nauru',
  //   'Nepal',
  //   'Nicaragua',
  //   'Níger',
  //   'Nigeria',
  //   'Noruega',
  //   'Nueva Zelanda',
  //   'Omán',
  //   'Países Bajos',
  //   'Pakistán',
  //   'Palaos',
  //   'Panamá',
  //   'Papúa Nueva Guinea',
  //   'Paraguay',
  //   'Perú',
  //   'Polonia',
  //   'Portugal',
  //   'Qatar',
  //   'Reino Unido',
  //   'República Centroafricana',
  //   'República Checa',
  //   'República del Congo',
  //   'República Democrática del Congo',
  //   'República Dominicana',
  //   'Ruanda',
  //   'Rumanía',
  //   'Rusia',
  //   'Samoa',
  //   'San Cristóbal y Nieves',
  //   'San Marino',
  //   'San Vicente y las Granadinas',
  //   'Santa Lucía',
  //   'Santo Tomé y Príncipe',
  //   'Senegal',
  //   'Serbia',
  //   'Seychelles',
  //   'Sierra Leona',
  //   'Singapur',
  //   'Siria',
  //   'Somalia',
  //   'Sri Lanka',
  //   'Suazilandia',
  //   'Sudáfrica',
  //   'Sudán',
  //   'Sudán del Sur',
  //   'Suecia',
  //   'Suiza',
  //   'Surinam',
  //   'Tailandia',
  //   'Tanzania',
  //   'Tayikistán',
  //   'Timor Oriental',
  //   'Togo',
  //   'Tonga',
  //   'Trinidad y Tobago',
  //   'Túnez',
  //   'Turkmenistán',
  //   'Turquía',
  //   'Tuvalu',
  //   'Ucrania',
  //   'Uganda',
  //   'Uruguay',
  //   'Uzbekistán',
  //   'Vanuatu',
  //   'Venezuela',
  //   'Vietnam',
  //   'Yemen',
  //   'Yibuti',
  //   'Zambia',
  //   'Zimbabue',
  // ];

  //   updateName(selectedLi) {
  //     searchInp.value = "";
  //     addCountry(selectedLi.innerText);
  //     wrapper.classList.remove("active");
  //     selectBtn.firstElementChild.innerText = selectedLi.innerText;
  // }
}
