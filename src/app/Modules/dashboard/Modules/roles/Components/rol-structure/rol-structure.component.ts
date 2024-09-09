import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OptionsRol, RolForm } from '../../../usuarios/interfaces/RolForm.interface';
import { updateRol } from '../../utils/Rols.utils';

@Component({
  selector: 'rol-structure',
  templateUrl: './rol-structure.component.html',
  styleUrls: ['./rol-structure.component.css']
})
export class RolStructureComponent implements OnInit {




  rolToForm : string = JSON.stringify({
    permissions : [

    ]
  });


  ngOnInit(): void {



  }

  @Input() inputControl!: FormControl | null;




  rols : RolForm[] = [
    {
      area : 'Administracion Oficinas',
      area_permissions : [
        "administrar",
      ],
      action_permissions : []
    },
    {
      area : 'Administracion Roles',
      area_permissions : [
        "administrar",
      ],
      action_permissions : []

    },
    {
      area : 'Usuarios',
      area_permissions : [
        "administrar",
      ],
      action_permissions : []

    },
    {
      area: 'Mi Oficina',
      area_permissions : [
        "administrar"
      ],
      action_permissions : []

    },
    {
      area : 'Modificaciones',
      area_permissions : [
        "Buscar,"
      ],
      action_permissions : []


    },
    {
      area : 'Descuentos',
      area_permissions : [
        "administrar",
      ],
      action_permissions : []

    },
    {
      area : "Cupones",
      area_permissions : [
        "Polizas"
      ],
      action_permissions : []

    },

    {
      area : "Polizas",
      area_permissions : [
        "Agregar",
        "generar-polizas",
       "generar-cotizacion",
       "polizas/:id",
       "polizas/:id/edit",

      ],
      action_permissions : []

    },

    {
      area: "Siniestros",
      area_permissions : [
        "listado-siniestros",
        "siniestro/:id",
      ],
      action_permissions : []

    },
    {
      area : 'Reembolsos',
      area_permissions : [
        "reembolso/:id",
        "listado-reembolso",
      ],
      action_permissions : []

    },
    {
      area : 'Cupones',
      area_permissions : [
        "listado-cupones",
        "cupones/:id",
        "cupones/:id/editar",
        "crear-cupones",
      ],
      action_permissions : []

    },
    {
      area : 'descuentos',
      area_permissions : [
        'list',
        'create'
      ],
      action_permissions : []

    },
    {
      area: 'Ventas y Reportes',
      area_permissions : [
        "Ventas",
        "Siniestros",
      ],
      action_permissions : []

    },
    {
      area: 'Marketing',
      area_permissions : [
        "notificaciones",
      ],
      action_permissions : []

    },
    {
      area: 'Polizas',
      area_permissions : [
        "status",
      ],
      action_permissions : []

    },
    {
      area: 'Polizas',
      area_permissions : [
        "comision",
      ],
      action_permissions : []

    }
  ]





  updateList(data : any){
    this.rolToForm = updateRol(data.action,data.area, data.toAdd , this.rolToForm);

    this.inputControl?.setValue(this.rolToForm);

  }






}
