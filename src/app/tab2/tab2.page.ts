import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonCard,
         IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
         IonBadge } from '@ionic/angular';
import { ReservaService } from '../services/reserva.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent,
            IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle,
            IonCardContent, IonBadge]
})
export class Tab2Page implements OnInit {
  reservas = signal<any[]>([]);

  constructor(private reservaService: ReservaService) {}

  // ionViewWillEnter se dispara cada vez que entras a la pestaña
  ionViewWillEnter() {
    this.cargarHistorial();
  }

  ngOnInit() {}

cargarHistorial() {
  const cliente = JSON.parse(localStorage.getItem('usuario') || 'null');
  if (!cliente?.id_cliente) return;

  this.reservaService.buscarPorCliente(cliente.id_cliente).subscribe({
    next: lista => {
      const ordenadas = [...lista].sort((a, b) => b.fecha_reserva.localeCompare(a.fecha_reserva));
      this.reservas.set(ordenadas);

      // por cada reserva traemos sus asientos y los pegamos como texto (ej: "A1, A2")
      ordenadas.forEach(r => {
        this.reservaService.getAsientosDeReserva(r.id_reserva).subscribe(detalles => {
          const texto = detalles
            .map(d => `${d.asiento?.fila?.nombre ?? ''}${d.asiento?.numero ?? ''}`)
            .join(', ');
          this.reservas.update(l =>
            l.map(x => x.id_reserva === r.id_reserva ? { ...x, asientosTexto: texto } : x));
        });
      });
    },
    error: e => console.error('Error al cargar historial:', e)
  });
}
}