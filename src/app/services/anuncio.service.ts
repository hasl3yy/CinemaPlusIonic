import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Anuncio {
  id_anuncio: number;
  titulo: string;
  descripcion: string;
  imagen: string | null;
  fechaPublicacion: string | null;
}

@Injectable({ providedIn: 'root' })
export class AnuncioService {
  private apiUrl = 'http://localhost:8080/anuncio';
  constructor(private http: HttpClient) { }

  listarActivos(): Observable<Anuncio[]> {
    return this.http.get<Anuncio[]>(`${this.apiUrl}/activos`);
  }
}