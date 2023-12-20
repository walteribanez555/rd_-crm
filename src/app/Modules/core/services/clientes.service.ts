import { Injectable } from '@angular/core';
import { CRUDService } from '../interfaces/CRUD_service.interface';
import { Cliente } from '../models/Cliente.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientesService implements CRUDService<Cliente> {
  constructor() {}
  getAll(): Observable<Cliente[]> {
    throw new Error('Method not implemented.');
  }
  getOne(id: string | number): Observable<Cliente[]> {
    throw new Error('Method not implemented.');
  }
  create(item: Cliente): Observable<Cliente> {
    throw new Error('Method not implemented.');
  }
  update(id: string | number, item: Cliente): Observable<Cliente> {
    throw new Error('Method not implemented.');
  }
  delete(id: string | number): Observable<any> {
    throw new Error('Method not implemented.');
  }
}
