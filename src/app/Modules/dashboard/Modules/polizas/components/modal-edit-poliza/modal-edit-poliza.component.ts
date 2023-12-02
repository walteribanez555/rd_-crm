import { Component, ElementRef, EventEmitter, Output, inject } from '@angular/core';

@Component({
  selector: 'modal-edit-poliza',
  templateUrl: './modal-edit-poliza.component.html',
  styleUrls: ['./modal-edit-poliza.component.css']
})
export class ModalEditPolizaComponent {

  private elementRef = inject(ElementRef);

  @Output() closeModal = new EventEmitter();


  close(): void {
    this.elementRef.nativeElement.remove();
    this.closeModal.emit();
  }

}
