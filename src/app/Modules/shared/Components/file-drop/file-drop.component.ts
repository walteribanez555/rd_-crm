import { Component, EventEmitter, Input, Output } from '@angular/core';
import {  FormControl } from '@angular/forms';

@Component({
  selector: 'file-drop',
  templateUrl: './file-drop.component.html',
  styleUrls: ['./file-drop.component.css']
})
export class FileDropComponent {
  @Output() filesDropped = new EventEmitter<FileList>();
  @Input() inputControl!: FormControl | null;

  selectFile(event : any){
    this.filesDropped.emit();

  }



}
