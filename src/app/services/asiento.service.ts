import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Fila {
    id_fila: number;
    nombre: string;
    cantidad_de_asientos: number;
}

export interface Asiento {
    id_asiento: number;
    numero: number;
    fila: Fila | null;
}

@Injectable({
    providedIn: 'root'
})
export class AsientoService {
    // Apuntamos a la base general del controlador
    private apiUrl = 'http://localhost:8080/asiento';
    // O puedes usar la URL de la API de detalles para los ocupados
    private apiDetalleUrl = 'http://localhost:8080/detallereservaasientos';

    constructor(private http: HttpClient) { }

    // Corregido: interpolación con ${idSala} y ruta limpia
    getAsientosPorSala(idSala: number): Observable<Asiento[]> {
        return this.http.get<Asiento[]>(`${this.apiUrl}/buscar/sala/${idSala}`);
    }

    // Aprovechamos de once to add el método para traer los asientos ocupados que creamos en el backend
    getAsientosOcupados(idFuncion: number): Observable<number[]> {
        return this.http.get<number[]>(`${this.apiDetalleUrl}/ocupados/${idFuncion}`);
    }
}