import { Injectable } from '@angular/core';
import { CRUDService } from '../interfaces/CRUD_service.interface';
import { Venta } from '../models/Venta.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VentasService implements CRUDService<Venta> {
  constructor() {}
  getAll(): Observable<Venta[]> {
    throw new Error('Method not implemented.');
  }
  getOne(id: string | number): Observable<Venta[]> {
    throw new Error('Method not implemented.');
  }
  create(item: Venta): Observable<Venta> {
    throw new Error('Method not implemented.');
  }
  update(id: string | number, item: Venta): Observable<Venta> {
    throw new Error('Method not implemented.');
  }
  delete(id: string | number): Observable<any> {
    throw new Error('Method not implemented.');
  }
}
