import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, of, switchMap } from 'rxjs';
import { Beneficiario } from 'src/app/Modules/core/models/Beneficiario.model';
import { Cliente } from 'src/app/Modules/core/models/Cliente.model';
import { Poliza } from 'src/app/Modules/core/models/Poliza.model';
import { Venta } from 'src/app/Modules/core/models/Venta.model';
import {
  BeneficiariosService,
  ClientesService,
  PolizasService,
  VentasService,
} from 'src/app/Modules/core/services';
import { loadingAnimation } from 'src/app/Modules/shared/animations/loading.animation';

@Component({
  templateUrl: './list-poliza.component.html',
  styleUrls: ['./list-poliza.component.css'],
  animations: [loadingAnimation],
})
export class ListPolizaComponent implements OnInit {
  ngOnInit(): void {
    const { beneficiarios, cl_id } = this.route.snapshot.queryParams;


    const requests: any[] = (beneficiarios as string)
      .split(',')
      .map((beneficiario_id) =>
        this.beneficiarioService.getOne(beneficiario_id)
      );
    forkJoin(requests)
      .pipe(
        switchMap((beneficiarios : any[]) => {
          return this.polizaService.getOne((beneficiarios.flat() as Beneficiario[])[0].poliza_id);
        }),
        switchMap((polizas : Poliza[]) => {
          return this.ventaService.getOne(polizas[0].venta_id);

        }),

      )
      .subscribe((cliente) => {
        console.log({cliente});

      });


  }

  private ventaService = inject(VentasService);
  private clienteService = inject(ClientesService);
  private polizaService = inject(PolizasService);
  private beneficiarioService = inject(BeneficiariosService);
  private route = inject(ActivatedRoute);

  ventasList: Venta[] = [];
  clienteList: Cliente[] = [];
  polizaList: Poliza[] = [];
}
