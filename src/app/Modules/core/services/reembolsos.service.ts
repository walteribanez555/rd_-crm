import { Injectable } from '@angular/core';
import { CRUDService } from '../interfaces/CRUD_service.interface';
import { Reembolso } from '../models/Reembolso.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReembolsosService implements CRUDService<Reembolso> {
  constructor() {}
  getAll(): Observable<Reembolso[]> {
    throw new Error('Method not implemented.');
  }
  getOne(id: string | number): Observable<Reembolso[]> {
    throw new Error('Method not implemented.');
  }
  create(item: Reembolso): Observable<Reembolso> {
    throw new Error('Method not implemented.');
  }
  update(id: string | number, item: Reembolso): Observable<Reembolso> {
    throw new Error('Method not implemented.');
  }
  delete(id: string | number): Observable<any> {
    throw new Error('Method not implemented.');
  }
}
