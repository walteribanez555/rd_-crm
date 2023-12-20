import { Injectable } from '@angular/core';
import { CRUDService } from '../interfaces/CRUD_service.interface';
import { ComunicacionSiniestro } from '../models/ComunicacionSiniestro.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComunicacionSiniestroService
  implements CRUDService<ComunicacionSiniestro>
{
  constructor() {}
  getAll(): Observable<ComunicacionSiniestro[]> {
    throw new Error('Method not implemented.');
  }
  getOne(id: string | number): Observable<ComunicacionSiniestro[]> {
    throw new Error('Method not implemented.');
  }
  create(item: ComunicacionSiniestro): Observable<ComunicacionSiniestro> {
    throw new Error('Method not implemented.');
  }
  update(
    id: string | number,
    item: ComunicacionSiniestro
  ): Observable<ComunicacionSiniestro> {
    throw new Error('Method not implemented.');
  }
  delete(id: string | number): Observable<any> {
    throw new Error('Method not implemented.');
  }
}
