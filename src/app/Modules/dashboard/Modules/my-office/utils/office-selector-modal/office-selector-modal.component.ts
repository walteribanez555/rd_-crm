import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Oficina } from 'src/app/Modules/core/models/Oficina';

@Component({
  selector: 'office-selector-modal',
  templateUrl : './office-selector-modal.component.html',
  styleUrls: ['./office-selector-modal.component.css'],

})
export class OfficeSelectorModalComponent implements OnInit {
  ngOnInit(): void {
  }

  private cdr = inject(ChangeDetectorRef);


  private elementRef =inject(ElementRef);

  @Input() offices? : Oficina[];


  selectedOfice = new FormControl<Oficina | null>(null, [Validators.required]);


  @Output() closeEvent = new EventEmitter();
  @Output() submitEvent = new EventEmitter<Oficina | null>();


  close() {
    this.elementRef.nativeElement.remove();
    this.closeEvent.emit();
  }

  submit(){
    this.elementRef.nativeElement.remove();
    this.submitEvent.emit(this.selectedOfice.value);
  }

  onSelect( oficina : Oficina){

    this.selectedOfice.setValue(oficina);
  }

}
