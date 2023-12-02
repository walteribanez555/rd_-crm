import { Component, ElementRef, EventEmitter, Output, inject } from '@angular/core';

@Component({
  selector: 'modal-edit-ben',
  templateUrl: './modal-edit-ben.component.html',
  styleUrls: ['./modal-edit-ben.component.css']
})
export class ModalEditBenComponent {


  private elementRef = inject(ElementRef);

  @Output() closeModal = new EventEmitter();


  close(): void {
    this.elementRef.nativeElement.remove();
    this.closeModal.emit();
  }




}
