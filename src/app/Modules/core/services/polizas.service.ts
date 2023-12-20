import { Injectable } from '@angular/core';
import { CRUDService } from '../interfaces/CRUD_service.interface';
import { Poliza } from '../models/Poliza.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PolizasService implements CRUDService<Poliza> {
  constructor() {}
  getAll(): Observable<Poliza[]> {
    throw new Error('Method not implemented.');
  }
  getOne(id: string | number): Observable<Poliza[]> {
    throw new Error('Method not implemented.');
  }
  create(item: Poliza): Observable<Poliza> {
    throw new Error('Method not implemented.');
  }
  update(id: string | number, item: Poliza): Observable<Poliza> {
    throw new Error('Method not implemented.');
  }
  delete(id: string | number): Observable<any> {
    throw new Error('Method not implemented.');
  }
}
