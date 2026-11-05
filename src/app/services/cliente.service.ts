import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pelicula } from './peliculas.service';
import { Sala } from './salas.service';

export interface Cliente {
    id_cliente: number;
    nit: string;
    nombres: string;
    apellidos: string;
    correo: string;
    telefono: string;
    contrasena: string;
    fotografia: string | null;

}

@Injectable({
    providedIn: 'root'
})
export class ClienteService {
    private apiUrl = 'http://localhost:8080/cliente';

    constructor(private http: HttpClient) { }

    getCliente(id: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${id}`);
    }

}