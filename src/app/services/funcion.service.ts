import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pelicula } from './peliculas.service';
import { Sala } from './salas.service';

export interface Funcion {
    id_funcion: number;
    pelicula: Pelicula | null;
    sala: Sala | null;
    fecha: string;
    hora: string;
    precio_entrada: number;
    estado: string;
}

@Injectable({
    providedIn: 'root'
})
export class FuncionService {
    private apiUrl = 'http://localhost:8080/funcion';

    constructor(private http: HttpClient) { }

listarPorPelicula(idPelicula: number): Observable<Funcion[]> {
    return this.http.get<Funcion[]>(`${this.apiUrl}/buscar/pelicula/${idPelicula}`);
}

}