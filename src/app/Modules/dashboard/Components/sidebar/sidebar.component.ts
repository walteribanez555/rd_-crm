import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { routeSideNav } from '../../interfaces/routes.model';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {


  @Input() actualDir : string = 'Dashboard';
  @Input() display_sidenav = false;
  @Input() lightActive = true;
  @Input() darkActive = false;

  @Output() displayNav = new EventEmitter();



  menuItemsFiltered: routeSideNav[] = [];

  menuItems : routeSideNav[] = [
    {
      label: 'Usuarios y Acceso',
      isDropdownOpen: false,
      dropdownHeight: '0',
      icon : 'fa-solid fa-users',
      submenuItems: [

        {
          label: 'Crear Usuarios',
          icon : 'fa-solid fa-user-plus fa-xs',
          route: 'usuario/create'
        },
        {
          label: 'Usuarios',
          route: 'usuario/list',
          icon: 'fa-solid fa-users',
        },
        {
          label : 'Crear Rol',
          route : 'usuario/create-rol',
          icon : 'fa-solid fa-shield'
        },
        {
          label : 'Oficinas',
          route : 'usuario/oficinas/post',
          icon : 'fa-solid fa-building'
        },
      ]
    },
    {
      label: 'Mi Oficina',
      isDropdownOpen: false,
      dropdownHeight: '0',
      icon : 'fa-solid fa-building-user',
      submenuItems : [

        {
          label : 'reportes-polizas',
          route : 'myoficina/reporte',
          icon : 'fa-solid fa-money-bill'
        }

      ]

    },
    {
      label : 'Descuentos',
      isDropdownOpen : false,
      dropdownHeight : '0',
      icon : 'fa-solid fa-money-bill',
      submenuItems : [
        {
          label : 'Crear Descuento',
          route :'descuentos/create',
          icon : 'fa-solid fa-square-plus',
        },
        {
          label : 'Buscar Descuento',
          route : 'descuentos/list',
          icon : 'fa-solid fa-magnifying-glass-dollar'
        }
      ]
    },
    {

      label: 'Cupones',
      isDropdownOpen: false,
      dropdownHeight: '0',
      icon : 'fa-solid fa-dollar-sign',
      submenuItems: [
        {
          label: 'Buscar cupon',
          route : 'cupones/list',
          icon : 'fa-solid fa-magnifying-glass-dollar'
        },
        {
          label : 'Crear cupon',
          route : 'cupones/create',
          icon : 'fa-solid fa-square-plus',
        }
      ]
    },

    {
      label: 'Polizas',
      isDropdownOpen: false,
      dropdownHeight: '0',
      icon : 'fa-solid fa-file',
      submenuItems: [
        {
          label: 'Pólizas',
          route:'poliza/list',
          icon : 'fa-solid fa-magnifying-glass'
        },
        {
          label: 'Emitir póliza',
          route: 'poliza/create',
          icon : 'fa-solid fa-square-plus',

        },

      ]

    },
    {
      label : 'Siniestros',
      isDropdownOpen: false,
      dropdownHeight : '0',
      icon : 'fa-solid fa-person-falling-burst',
      submenuItems : [
        {
          label: 'Siniestros',
          route:'siniestro/list',
          icon : 'fa-solid fa-magnifying-glass'
        },

      ]
    },
    {
      label : 'Reembolsos',
      isDropdownOpen : false,
      dropdownHeight : '0',
      icon : 'fa-solid fa-money-bill-transfer',
      submenuItems : [
        {
          label : 'reembolso',
          route : 'reembolso/list',
          icon : 'fa-solid fa-magnifying-glass'
        }
      ]
    },
    {
      label: 'Ventas y Reportes',
      isDropdownOpen: false,
      dropdownHeight: '0',
      icon : 'fa-regular fa-file-code',
      submenuItems: [

        {
          label: 'Ventas',
          icon : 'fa-solid fa-money-bill',
          route: 'reporte/ventas'
        },
        {
          label: 'Siniestros',
          route: 'reporte/siniestros',
          icon: 'fa-solid fa-person-falling',
        },

      ]
    },

    {
      label : 'Marketing',
      isDropdownOpen : false,
      dropdownHeight : '0',
      icon : 'fa-solid fa-money-bill-transfer',
      submenuItems : [
        {
          label : 'notificaciones',
          route : 'marketing/notification',
          icon : 'fa-solid fa-magnifying-glass'
        }
      ]
    },
  ];

  constructor(
    private cdr : ChangeDetectorRef,
    private router : Router,

    ){

  }


  ngOnInit(){



    this.menuItemsFiltered = this.menuItems;


  }





  cargarHeader(direccion : string){
  }


  toggleDropdown(menuItem : any) {
    menuItem.isDropdownOpen = !menuItem.isDropdownOpen;
    menuItem.dropdownHeight = menuItem.isDropdownOpen ? menuItem.submenuItems.length * 65 + 'px' : '0';
  }



  closeDropdown(menuItem : any) {
    menuItem.isDropdownOpen = false;
    menuItem.dropdownHeight = '0';
  }

  toggleDarkMode() {
    document.querySelector('body')?.classList.toggle('dark');
    document.querySelector('.darkmode-switch')?.classList.toggle('active');
    this.lightActive = !this.lightActive;
    this.darkActive = !this.darkActive;

  }

  toggleSidenav(){
    this.displayNav.emit();
  }


}
