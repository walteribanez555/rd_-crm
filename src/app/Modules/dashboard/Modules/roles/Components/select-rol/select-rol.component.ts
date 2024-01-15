import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output, SimpleChanges, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Oficina } from 'src/app/Modules/core/models/Oficina';
import { Rol } from 'src/app/Modules/core/models/Rol';
import { OficinasService } from 'src/app/Modules/core/services/oficinas.service';
import { RolesService } from 'src/app/Modules/core/services/roles.service';

@Component({
  selector: 'select-rol',
  templateUrl : './select-rol.component.html',
  styleUrls: ['./select-rol.component.css'],
})
export class SelectRolComponent {

  ngOnDestroy(): void {
    console.log("destruido");
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("cargado");
  }


  private rolService = inject(RolesService);
  private cdr = inject(ChangeDetectorRef);

  private Router = inject(ActivatedRoute);



  ngOnInit(): void {


    if(this.formControl){
      this.formControl.registerOnChange( () => {
       this.searchInput = this.formControl?.value.office_name;
      })
    }

    this.rolService.getAll().subscribe({
      next :( roles => {

        this.roles = roles;
        this.filteredRoles = this.roles;

      }),
      error : (err => {

      }),
      complete : ( ) => {

      }
    })
  }




  isToggle: boolean = false;
  searchInput: string = 'roles';

  searchText: string = '';

  updateToggle() {
    this.isToggle = !this.isToggle;
  }

  filteredRoles: Rol[] = [];

  updateActualName(selectedRol: Rol) {
    this.searchInput = selectedRol.rol_name;
    this.isToggle = false;
    this.formControl?.setValue(selectedRol);
    this.onselectDestiny.emit(selectedRol);
    console.log({selectedRol});
    this.cdr.detectChanges();
  }

  filterBySearch() {
    this.filteredRoles = this.roles.filter((rol) =>
      rol.rol_name.toLowerCase().startsWith(this.searchText.toLowerCase())
    );
  }

  @Output() onselectDestiny = new EventEmitter<Rol>();
  @Input() formControl? : FormControl<any>;
  @Input() onLoadForm? : Observable<any>;

  roles : Rol[] = [];



}
