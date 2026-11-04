import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pelicula } from './peliculas.service';
import { Sala } from './salas.service';

export interface Asiento {
    id_asiento: number;
    numero: number;
    pelicula: Pelicula | null;
    sala: Sala | null;

}

@Injectable({
    providedIn: 'root'
})
export class AsientoService {
    private apiUrl = 'http://localhost:8080/asiento';

    constructor(private http: HttpClient) { }

getAsientosPorSala(idSala: number): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/asiento/buscar/sala/${idSala}`);
}

}