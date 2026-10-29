import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Genero } from './genero.service';
import { Clasificacion } from './clasificacion.service';

export interface Pelicula {
  id_pelicula: number;
  titulo: string;
  sinopsis: string;
  duracion_minutos: number;
  genero: Genero | null;
  clasificacion: Clasificacion | null;
  imagenPromocional: string | null;
  estado: string;
}

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {
  private apiUrl = 'http://localhost:8080/pelicula';

  constructor(private http: HttpClient) { }

  listar(): Observable<Pelicula[]> {
    return this.http.get<Pelicula[]>(`${this.apiUrl}/buscar`);
  }


}