import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { IonButton, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent } from '@ionic/angular';
import { ReservaService } from '../services/reserva.service';

@Component({
  selector: 'app-asientos',
  templateUrl: './asientos.component.html',
  styleUrls: ['./asientos.component.css'],
  standalone: true,
  imports: [CommonModule, IonButton, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent]
})
export class AsientosComponent implements OnInit {
  @Input() idFuncion!: number;

  filas: string[] = ['A', 'B', 'C', 'D', 'E'];
  asientosPorFila: number = 10;
  asientosSeleccionados: number[] = [];
  asientosOcupados: number[] = [];

  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private reservaService: ReservaService
  ) { }

ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.idFuncion = Number(idParam);
    }
    console.log('ID de función listo para usar:', this.idFuncion);
    
    this.cargarAsientosOcupados();
  }

  cargarAsientosOcupados() {
    if (!this.idFuncion) return;

    this.reservaService.getAsientosOcupados(this.idFuncion).subscribe({
      next: (ocupados) => {
        this.asientosOcupados = ocupados;
        console.log('Asientos ya ocupados en esta función:', this.asientosOcupados);
      },
      error: (err) => {
        console.error('Error al cargar asientos ocupados:', err);
      }
    });
  }

// Ahora recibe directamente el ID numérico del asiento (ej: 1, 2, 3...)
  toggleAsiento(idAsiento: number) {
    const index = this.asientosSeleccionados.indexOf(idAsiento);

    if (index > -1) {
      this.asientosSeleccionados.splice(index, 1);
    } else {
      this.asientosSeleccionados.push(idAsiento);
    }
  }

  // Y para verificar si está seleccionado:
  isSeleccionado(idAsiento: number): boolean {
    return this.asientosSeleccionados.includes(idAsiento);
  }

  continuarCompra() {
    if (this.asientosSeleccionados.length === 0) {
      console.warn('Debe seleccionar al menos un asiento.');
      return;
    }

    // Supongamos que obtienes el id del cliente logueado (por ejemplo, desde localStorage)
    const idClienteLogueado = Number(localStorage.getItem('id_cliente')) || 1;

    const payload = {
      id_cliente: idClienteLogueado,
      id_funcion: this.idFuncion,
      // Nota: Asegúrate de mandar los IDs numéricos reales de los asientos, 
      // no la cadena combinada como "A1" (por ejemplo: [1, 2, 3])
      id_asientos: this.asientosSeleccionados
    };

    this.reservaService.guardarReserva(payload).subscribe({
      next: (response) => {
        console.log('Reserva creada con éxito:', response);
        // Aquí puedes navegar a una pantalla de éxito o mostrar un mensaje
      },
      error: (err) => {
        console.error('Error al reservar:', err);
        // Si el backend responde 409, aquí atraparás el mensaje de "Asientos ocupados"
        alert(err.error || 'Ocurrió un error al procesar la reserva.');
      }
    });
  }
}