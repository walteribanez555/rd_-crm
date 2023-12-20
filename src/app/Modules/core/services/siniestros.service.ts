import { Injectable } from '@angular/core';
import { CRUDService } from '../interfaces/CRUD_service.interface';
import { Siniestro } from '../models/Siniestro.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SiniestrosService implements CRUDService<Siniestro> {
  constructor() {}
  getAll(): Observable<Siniestro[]> {
    throw new Error('Method not implemented.');
  }
  getOne(id: string | number): Observable<Siniestro[]> {
    throw new Error('Method not implemented.');
  }
  create(item: Siniestro): Observable<Siniestro> {
    throw new Error('Method not implemented.');
  }
  update(id: string | number, item: Siniestro): Observable<Siniestro> {
    throw new Error('Method not implemented.');
  }
  delete(id: string | number): Observable<any> {
    throw new Error('Method not implemented.');
  }
}
