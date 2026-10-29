import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Clasificacion {
  id_clasificacion: number;
  nombre: string;

}

@Injectable({
  providedIn: 'root'
})
export class ClasificacionService {
  private apiUrl = 'http://localhost:8080/clasificacion';

  constructor(private http: HttpClient) {}

  listar(): Observable<Clasificacion[]> {
    return this.http.get<Clasificacion[]>(`${this.apiUrl}/buscar`);
  }

  guardar(Clasificacion: Partial<Clasificacion>): Observable<Clasificacion> {
    return this.http.post<Clasificacion>(`${this.apiUrl}/guardar`, Clasificacion);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/eliminar/${id}`);
  }
}