import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonButton, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent } from '@ionic/angular';

@Component({
  selector: 'app-asientos',
  templateUrl: './asientos.component.html',
  styleUrls: ['./asientos.component.css'],
  standalone: true,
  imports: [CommonModule, IonButton, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent]
})
export class AsientosComponent implements OnInit {
  @Input() idFuncion!: number;

  // Ejemplo de estructura de asientos (puedes adaptarlo según lo que devuelva tu backend de salas/asientos)
  filas: string[] = ['A', 'B', 'C', 'D', 'E'];
  asientosPorFila: number = 10;
  asientosSeleccionados: string[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    console.log('ID de función recibido para reservar asientos:', this.idFuncion);
  }

  // Método para seleccionar o deseleccionar un asiento (ej: "A1", "B3")
  toggleAsiento(fila: string, numero: number) {
    const asientoId = `${fila}${numero}`;
    const index = this.asientosSeleccionados.indexOf(asientoId);

    if (index > -1) {
      // Si ya estaba seleccionado, lo quitamos
      this.asientosSeleccionados.splice(index, 1);
    } else {
      // Si no estaba, lo agregamos
      this.asientosSeleccionados.push(asientoId);
    }
  }

  // Verificar si un asiento está seleccionado para cambiarle el color en el HTML
  isSeleccionado(fila: string, numero: number): boolean {
    return this.asientosSeleccionados.includes(`${fila}${numero}`);
  }

  continuarCompra() {
    console.log('Asientos elegidos:', this.asientosSeleccionados);
    // Aquí puedes mandar los asientos seleccionados y el idFuncion a tu backend para guardar la reserva/compra
  }
}