import { Component } from '@angular/core';

@Component({
  templateUrl: './oficce.component.html',
  styleUrls: ['./oficce.component.css'],
})
export class OficceComponent {
  data = {
    permissions: [
      {
        area: 'Polizas',
        area_permissions: [
          'Agregar',
          'generar-polizas',
          'generar-cotizacion',
          'polizas/:id',
          'polizas/:id/edit',
        ],
      },
      {
        area: 'Siniestros',
        area_permissions: ['listado-siniestros', 'siniestro/:id'],
      },
      {
        area: 'Reembolsos',
        area_permissions: ['reembolso/:id', 'listado-reembolso'],
      },
      {
        area: 'Cupones',
        area_permissions: [
          'listado-cupones',
          'cupones/:id',
          'cupones/:id/editar',
          'crear-cupones',
        ],
      },
      {
        area: 'Usuarios y Acceso',
        area_permissions: [
          'agregar-rol',
          'listado-usuarios',
          'agregar-usuarios',
        ],
      },
    ],
  };
}
