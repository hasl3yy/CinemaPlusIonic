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
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonList,
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
      next: lista => this.reservas.set(
        [...lista].sort((a, b) => b.fecha_reserva.localeCompare(a.fecha_reserva))
      ),
      error: e => console.error('Error al cargar historial:', e)
    });
  }
}