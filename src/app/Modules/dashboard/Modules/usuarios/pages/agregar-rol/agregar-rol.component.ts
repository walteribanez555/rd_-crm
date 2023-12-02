import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { RolService } from 'src/app/Modules/shared/services/requests/rol.service';
import Swal from 'sweetalert2';

@Component({
  templateUrl: './agregar-rol.component.html',
  styleUrls: ['./agregar-rol.component.css']
})
export class AgregarRolComponent implements OnInit {


  // private readonly rolService = inject(RolService);

  isLoading : boolean = false


  ngOnInit(): void {

    this.inputControl= this.rolForm.get('rol_structure') as FormControl<any>;

  }

  public inputControl: FormControl<any> | null = null;



  public rolForm : FormGroup = new FormGroup({
    rol_name  : new FormControl(null, [Validators.required]),
    rol_structure : new FormControl(null, [Validators.required]),
  })


  submitForm(){

    this.isLoading = true;
    const { rol_name, rol_structure} = this.rolForm.value;
    // this.rolService.postRoles(rol_name, rol_structure).subscribe(
    //   {
    //     next :  ( data ) => {  this.isLoading = false,  console.log(data)  , this.showSucces()},
    //     error : ( error) => {  this.isLoading = false,  console.log(error) , this.showError("No se pudo crear correctamente")}
    //   }
    // )



  }


  showSucces(){

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Creado Exitosamente',
      showConfirmButton: false,
      timer: 1500

    });
  }

  showError(error : string){
    Swal.fire({
      position: 'top-end',
      icon : 'error',
      title: 'No se pudo realizar',
      showConfirmButton: false,
      timer: 1500

    });
  }

}
