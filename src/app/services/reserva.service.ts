import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  // URL base de tu backend (asegúrate de ajustarla si usas IP de red local o environment)
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  // 1. Obtener los IDs de los asientos ocupados para una función específica
  getAsientosOcupados(id_funcion: number): Observable<number[]> {
    return this.http.get<number[]>(`${this.apiUrl}/detallereservaasientos/ocupados/${id_funcion}`);
  }

  // 2. Guardar la reserva junto con los asientos seleccionados
  guardarReserva(payload: { id_cliente: number, id_funcion: number, id_asiento: number[] }): Observable<any> {
    return this.http.post(`${this.apiUrl}/reserva/reservar`, payload);
  }

  // 3. Buscar el historial de reservas de un cliente (para el perfil o mis tickets)
  buscarPorCliente(id_cliente: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/reserva/buscar/cliente/${id_cliente}`);
  }
}