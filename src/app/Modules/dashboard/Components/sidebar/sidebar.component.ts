import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  Input,
  Output,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { routeSideNav } from '../../interfaces/routes.model';
import { SessionService } from 'src/app/Modules/auth/Services/session.service';
import { Observable, Subject } from 'rxjs';
import {
  Size,
  PositionMessage,
} from 'src/app/Modules/shared/Components/notification/enums';
import { NotificationService } from 'src/app/Modules/shared/Components/notification/notification.service';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  @Input() actualDir: string = 'Dashboard';
  @Input() display_sidenav = false;
  @Input() lightActive = true;
  @Input() darkActive = false;

  @Output() displayNav = new EventEmitter();

  menuItemsFiltered: routeSideNav[] = [];

  menuItems: routeSideNav[] = [
    {
      label: 'Administracion Oficinas',
      isDropdownOpen: false,
      dropdownHeight: '0',
      icon: 'fa-solid fa-building',
      submenuItems: [
        {
          label: 'administrar',
          icon: 'fa-solid fa-building',
          route: 'oficinas/post',
        },
      ],
    },
    {
      label: 'Administracion Roles',
      isDropdownOpen: false,
      dropdownHeight: '0',
      icon: 'fa-solid fa-shield',
      submenuItems: [
        {
          label: 'administrar',
          icon: 'fa-solid fa-shield',
          route: 'roles/create',
        },
      ],
    },
    {
      label: 'Modificaciones',
      isDropdownOpen: false,
      dropdownHeight: '0',
      icon: 'fa-solid fa-file-pen',
      submenuItems: [
        {
          label: 'buscar',
          icon: 'fa-solid fa-magnifying-glass',
          route: 'modificaciones/filter',
        },
        {
          label: 'Lista',
          icon: 'fa-solid fa-magnifying-glass',
          route: 'modificaciones/list',
        },
      ],
    },
    {
      label: 'Usuarios',
      isDropdownOpen: false,
      dropdownHeight: '0',
      icon: 'fa-solid fa-users',
      submenuItems: [
        {
          label: 'Administrar',
          icon: 'fa-solid fa-user-plus fa-xs',
          route: 'usuario/post',
        },
      ],
    },
    {
      label: 'Mi Oficina',
      isDropdownOpen: false,
      dropdownHeight: '0',
      icon: 'fa-solid fa-building-user',
      submenuItems: [
        {
          label: 'Administrar',
          route: 'myoficina',
          icon: 'fa-solid fa-money-bill',
        },
        {
          label: 'Cotizar Voucher',
          route: 'poliza/create',
          icon: 'fa-solid fa-square-plus',
        },
      ],
    },
    {
      label: 'Descuentos',
      isDropdownOpen: false,
      dropdownHeight: '0',
      icon: 'fa-solid fa-money-bill',
      submenuItems: [
        {
          label: 'Administrar',
          route: 'descuentos/create',
          icon: 'fa-solid fa-magnifying-glass-dollar',
        },
      ],
    },
    {
      label: 'Cupones',
      isDropdownOpen: false,
      dropdownHeight: '0',
      icon: 'fa-solid fa-dollar-sign',
      submenuItems: [
        {
          label: 'Administrar',
          route: 'cupones/create',
          icon: 'fa-solid fa-magnifying-glass-dollar',
        },
      ],
    },

    {
      label: 'Vouchers',
      isDropdownOpen: false,
      dropdownHeight: '0',
      icon: 'fa-solid fa-file',
      submenuItems: [
        {
          label: 'Vouchers',
          route: 'poliza/list',
          icon: 'fa-solid fa-magnifying-glass',
        },
        {
          label: 'Emitir Voucher',
          route: 'poliza/create',
          icon: 'fa-solid fa-square-plus',
        },
      ],
    },
    {
      label: 'Siniestros',
      isDropdownOpen: false,
      dropdownHeight: '0',
      icon: 'fa-solid fa-person-falling-burst',
      submenuItems: [
        {
          label: 'Vouchers',
          route: 'myoficina',
          icon: 'fa-solid fa-money-bill',
        },
        {
          label: 'Siniestros',
          route: 'siniestro/list',
          icon: 'fa-solid fa-magnifying-glass',
        },
      ],
    },
    {
      label: 'Reembolsos',
      isDropdownOpen: false,
      dropdownHeight: '0',
      icon: 'fa-solid fa-money-bill-transfer',
      submenuItems: [
        {
          label: 'reembolso',
          route: 'reembolso/list',
          icon: 'fa-solid fa-magnifying-glass',
        },
      ],
    },
    {
      label: 'Ventas y Reportes',
      isDropdownOpen: false,
      dropdownHeight: '0',
      icon: 'fa-regular fa-file-code',
      submenuItems: [
        {
          label: 'Ventas',
          icon: 'fa-solid fa-money-bill',
          route: 'reporte/ventas/data',
        },
        {
          label: 'Siniestros',
          route: 'reporte/siniestros',
          icon: 'fa-solid fa-person-falling',
        },
      ],
    },

    {
      label: 'Marketing',
      isDropdownOpen: false,
      dropdownHeight: '0',
      icon: 'fa-solid fa-money-bill-transfer',
      submenuItems: [
        {
          label: 'notificaciones',
          route: 'marketing/notification',
          icon: 'fa-solid fa-magnifying-glass',
        },
      ],
    },
  ];

  private cdr = inject(ChangeDetectorRef);
  private router = Inject(Router);
  private sessionService = inject(SessionService);

  constructor() {}

  ngOnInit() {
    const process = new Subject();
    const observerProcess = process.asObservable();

    this.onLoading(observerProcess);

    this.sessionService.isActionValidForUser('status').subscribe({
      next: (resp) => {
        resp ? console.log('Valid') : console.log('Invalido');
      },
      error: (err) => {},
      complete: () => {},
    });

    this.sessionService.getRolsFromUser().subscribe((routes) => {
      const routesForUser = routes
        .map((resp) => JSON.parse(resp.rol_structure))
        .map((rol_structure) => rol_structure.permissions)
        .flat()
        .map((route) => route.area);

      this.menuItemsFiltered = this.menuItems.filter((menuItem) =>
        routesForUser.includes(menuItem.label)
      );

      process.complete();
    });

    // this.menuItemsFiltered = this.menuItems;
  }

  cargarHeader(direccion: string) {}

  toggleDropdown(menuItem: any) {
    menuItem.isDropdownOpen = !menuItem.isDropdownOpen;
    menuItem.dropdownHeight = menuItem.isDropdownOpen
      ? menuItem.submenuItems.length * 65 + 'px'
      : '0';
  }

  closeDropdown(menuItem: any) {
    menuItem.isDropdownOpen = false;
    menuItem.dropdownHeight = '0';
  }

  toggleDarkMode() {
    document.querySelector('body')?.classList.toggle('dark');
    document.querySelector('.darkmode-switch')?.classList.toggle('active');
    this.lightActive = !this.lightActive;
    this.darkActive = !this.darkActive;
  }

  toggleSidenav() {
    this.displayNav.emit();
  }

  private notificacionModalService = inject(NotificationService);

  onSuccess(message: string) {
    this.notificacionModalService.show(message, {
      size: Size.normal,
      duration: 3000,
      positions: [PositionMessage.center],
      imageUrl: 'assets/icons/check.svg',
      closeOnTouch: true,
    });
  }

  onError(message: string) {
    this.notificacionModalService.show(message, {
      size: Size.normal,
      duration: 3000,
      positions: [PositionMessage.center],
      imageUrl: 'assets/icons/warning.svg',
      closeOnTouch: true,
    });
  }

  onLoading(observerProcess: Observable<any>) {
    this.notificacionModalService.show('Cargando', {
      size: Size.normal,
      positions: [PositionMessage.center],
      imageUrl: 'assets/icons/loading.svg',
      closeOnTouch: false,
      notifier: observerProcess,
    });
  }
}
