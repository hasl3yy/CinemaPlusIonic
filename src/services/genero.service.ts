import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Genero {
  id_genero: number;
  nombre: string;
}

@Injectable({
  providedIn: 'root'
})
export class GeneroService {
  private apiUrl = 'http://localhost:8080/genero';

  constructor(private http: HttpClient) {}

  listar(): Observable<Genero[]> {
    return this.http.get<Genero[]>(`${this.apiUrl}/buscar`);
  }

  guardar(Genero: Partial<Genero>): Observable<Genero> {
    return this.http.post<Genero>(`${this.apiUrl}/guardar`, Genero);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/eliminar/${id}`);
  }
}