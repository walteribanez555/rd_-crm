import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Descuento } from 'src/app/Modules/core/models/Descuento.model';
import { DescuentosService } from 'src/app/Modules/core/services';

@Component({
  templateUrl : './descuento.component.html',
  styleUrls: ['./descuento.component.css'],
})
export class DescuentoComponent implements OnInit{
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id_descuento = params['id'];

      this.descuentosService.getOne(this.id_descuento!).subscribe(descuento => {
        this.descuentos = descuento;

        console.log(this.descuentos);
      })

    })
  }


  private route = inject(ActivatedRoute);
  private descuentosService = inject(DescuentosService);

  id_descuento : number | null = null;
  descuentos : Descuento[] | null = null;




}
