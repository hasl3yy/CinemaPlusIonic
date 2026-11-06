import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Cliente {
  id_cliente: number;
  nit: string;
  nombres: string;
  apellidos: string;
  correo: string;
  telefono: string;
  contrasena?: string;
  fotografia: string | null;
}

@Injectable({ providedIn: 'root' })
export class ClienteService {
  private apiUrl = 'http://localhost:8080/cliente';

  constructor(private http: HttpClient) { }

  registrar(c: Partial<Cliente>): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.apiUrl}/registrar`, c);
  }

  obtener(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/buscar/${id}`);
  }

  actualizar(id: number, c: Partial<Cliente>): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.apiUrl}/actualizar/${id}`, c);
  }

  cambiarContrasena(id: number, actual: string, nueva: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/cambiar-contrasena/${id}`, { actual, nueva });
  }
}