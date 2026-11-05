import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

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

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/cliente';

  constructor(private http: HttpClient) { }

  login(credentials: { correo: string; contrasena: string; estado?: string }): Observable<Cliente> {

    if (credentials.estado != 'ACTIVO') {
      return this.http.post<Cliente>(`${this.apiUrl}/login`, credentials).pipe(
        tap((cliente) => localStorage.setItem('usuario', JSON.stringify(cliente)))
      );
    } else {
      throw new Error('cliente inactivo. No se puede iniciar sesión.');
    }
  }

  logout(): void {
    localStorage.removeItem('usuario');
  }

  getUsuarioActual():  Cliente | null {
    const stored = localStorage.getItem('usuario');
    return stored ? JSON.parse(stored) : null;
  }

  isLoggedIn(): boolean {
    return this.getUsuarioActual() !== null;
  }
}