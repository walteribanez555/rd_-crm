import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  inject,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Oficina } from 'src/app/Modules/core/models/Oficina';
import { OficinasService } from 'src/app/Modules/core/services/oficinas.service';

@Component({
  selector: 'select-office',
  templateUrl: './select-office.component.html',
  styleUrls: ['./select-office.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectOfficeComponent implements OnInit, OnChanges{
  ngOnChanges(changes: SimpleChanges): void {
    console.log({ofices : this.defaultOficces});
  }


  private oficinaService = inject(OficinasService);
  private cdr = inject(ChangeDetectorRef);

  private Router = inject(ActivatedRoute);

  @Input() defaultOficces?: Oficina[] = [];

  ngOnInit(): void {

    this.cdr.detectChanges();

    if (this.formControl) {
      this.formControl.registerOnChange(() => {
        this.searchInput = this.formControl?.value.office_name;
      });
      this.cdr.detectChanges();
    }

    if (this.defaultOficces && this.defaultOficces.length > 0) {
      this.offices = this.defaultOficces;
      this.filteredOffices = this.defaultOficces;
      this.cdr.detectChanges();
    } else {
      this.oficinaService.getAll().subscribe({
        next: (oficinas) => {
          this.cdr.detectChanges();
          this.offices = oficinas;
          this.filteredOffices = this.offices;
          this.cdr.detectChanges();

        },
        error: (err) => {},
        complete: () => {},
      });
    }
  }

  isToggle: boolean = false;
  searchInput: string = 'oficinas';

  searchText: string = '';

  updateToggle() {
    this.isToggle = !this.isToggle;

    this.cdr.detectChanges();
  }

  filteredOffices: Oficina[] = [];

  updateActualName(selectedOficce: Oficina) {
    this.searchInput = selectedOficce.office_name;
    this.isToggle = false;
    this.formControl?.setValue(selectedOficce);
    this.onselectDestiny.emit(selectedOficce);
    console.log({ selectedOficce });
    this.cdr.detectChanges();
  }

  filterBySearch() {
    this.filteredOffices = this.offices.filter((country) =>
      country.office_name
        .toLowerCase()
        .startsWith(this.searchText.toLowerCase())
    );
    this.cdr.detectChanges();

  }

  @Output() onselectDestiny = new EventEmitter<Oficina>();
  @Input() formControl?: FormControl<any>;
  @Input() onLoadForm?: Observable<any>;

  offices: Oficina[] = [];
}
