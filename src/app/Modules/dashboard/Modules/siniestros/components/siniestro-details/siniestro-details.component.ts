import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Beneficiario } from 'src/app/Modules/core/models/Beneficiario.model';
import { Siniestro } from 'src/app/Modules/core/models/Siniestro.model';

@Component({
  selector: 'siniestro-details',
  templateUrl : './siniestro-details.component.html',
  styleUrls: ['./siniestro-details.component.css'],
})
export class SiniestroDetailsComponent {

  @Input() siniestro! : Siniestro;
  @Input() beneficiario! : Beneficiario;


 }
