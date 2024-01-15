import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ComunicacionSiniestro } from '../../../../../core/models/ComunicacionSiniestro.model';

@Component({
  selector: 'message',
  template: `
    <div class="file-message" [ngClass]="getTypeUser(message.es_operador)">
      <div class="message">
        <div *ngIf="message.url_archivo.length > 2">
          <a href="{{ message.url_archivo }}" class="file">
            <i class="fa-solid fa-file"></i>
            <span>Descargar</span>
          </a>
        </div>

        <div class="content-message">
          <p>{{ message.mensaje }}</p>
        </div>

        <div class="footer">
          <div class="date">
            <span>{{ message.fecha_mesaje.split('T')[0] }}</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./message.component.css'],
})
export class MessageComponent {
  @Input() message!: ComunicacionSiniestro;

  @Input() typeUser: number = 0;

  getTypeUser(status: number) {
    return {
      mine: status === this.typeUser,
      sender: !(status === this.typeUser),
    };
  }
}
