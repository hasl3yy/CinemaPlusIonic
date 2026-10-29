import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface Usuario {
  id_usuario: number;
  nombres: string;
  apellidos: string;
  correo: string;
  telefono: string;
  nombre_usuario: string;
  contrasena?: string;
  rol: { id_rol: number; nombre: string } | null;
  fotografia: string | null;
  estado: String;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/usuario';

  constructor(private http: HttpClient) { }

  login(credentials: { correo: string; contrasena: string; estado: string }): Observable<Usuario> {

    if (credentials.estado != 'ACTIVO') {
      return this.http.post<Usuario>(`${this.apiUrl}/login`, credentials).pipe(
        tap((usuario) => localStorage.setItem('usuario', JSON.stringify(usuario)))
      );
    } else {
      throw new Error('Usuario inactivo. No se puede iniciar sesión.');
    }
  }

  logout(): void {
    localStorage.removeItem('usuario');
  }

  getUsuarioActual(): Usuario | null {
    const stored = localStorage.getItem('usuario');
    return stored ? JSON.parse(stored) : null;
  }

  isLoggedIn(): boolean {
    return this.getUsuarioActual() !== null;
  }
}