import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Sala {
    id_sala: number;
    nombre: string;
    estado: string;
}

@Injectable({
    providedIn: 'root'
})

export class SalaService {
    private apiUrl = 'http://localhost:8080/sala';


    constructor(private http: HttpClient) { }

    listar(): Observable<Sala[]> {
        return this.http.get<Sala[]>(`${this.apiUrl}/buscar`);
    }

    guardar(sala: Partial<Sala>): Observable<Sala> {
        return this.http.post<Sala>(`${this.apiUrl}/guardar`, sala);
    }


    eliminar(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/eliminar/${id}`);
    }

    activar(id: number): Observable<void> {
        return this.http.put<void>(`${this.apiUrl}/activar/${id}`, {});
    }

    desactivar(id: number): Observable<void> {
        return this.http.put<void>(`${this.apiUrl}/desactivar/${id}`, {});
    }
}