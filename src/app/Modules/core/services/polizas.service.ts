import { Injectable, inject } from '@angular/core';
import { CRUDService } from '../interfaces/CRUD_service.interface';
import { Poliza, PolizaToPost } from '../models/Poliza.model';
import { Observable, map, of, switchMap } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PolizasService implements CRUDService<Poliza> {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl + '/polizas';

  constructor() {}
  getAll(): Observable<Poliza[]> {
    return this.http.get<Poliza[]>(this.apiUrl);
  }
  getOne(id: string | number): Observable<Poliza[]> {
    let params = new HttpParams();
    params = params.append('id', id);

    return this.http.get<Poliza[]>(this.apiUrl, { params }).pipe(
      map((resp: Poliza[]) => {
        if (resp.length === 0) {
          throw new Error('Poliza not found');
        }
        return [resp[0]];
      }),
      switchMap((polizas: Poliza[]) => {
        if (polizas[0].status == 2 || polizas[0].status == 3) {
          const actualDate = new Date();
          const polizaFechaSalida = new Date(
            polizas[0].fecha_salida.split('T')[0]
          );
          const polizaFechaRetorno = new Date(
            polizas[0].fecha_retorno.split('T')[0]
          );
          if (polizas[0].status == 2 && polizaFechaSalida <= actualDate) {
            const data = {
              status: 3,
              destino: polizas[0].destino,
              fecha_salida: polizas[0].fecha_salida,
              fecha_retorno: polizas[0].fecha_retorno,
            };
            polizas[0].status = 3;
            return this.update(polizas[0].poliza_id!, data).pipe(
              map((resp) => polizas) // Return the original array
            );;
          }

          if (polizas[0].status == 3 && polizaFechaRetorno <= actualDate) {
            const data = {
              status: 7,
              destino: polizas[0].destino,
              fecha_salida: polizas[0].fecha_salida,
              fecha_retorno: polizas[0].fecha_retorno,
            };
            polizas[0].status = 7;
            return this.update(polizas[0].poliza_id!, data).pipe(
              map((resp) => polizas) // Return the original array
            );;
          }
        }

        // No need for `of(polizas)` here, just return the array directly
        return of(polizas);
      })
    );
  }
  create(item: PolizaToPost): Observable<Poliza> {
    return this.http.post<Poliza>(this.apiUrl, item);
  }
  update(id: string | number, item: any): Observable<any> {
    return this.http.put(this.apiUrl + `?id=${id}`, item);
  }
  delete(id: string | number): Observable<any> {
    throw new Error('Method not implemented.');
  }
}
