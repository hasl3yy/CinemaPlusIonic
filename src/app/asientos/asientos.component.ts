import { Component, Input, OnInit, signal, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { IonButton, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent } from '@ionic/angular';
import { ReservaService } from '../services/reserva.service';
import { AsientoService, Asiento } from '../services/asiento.service';
import { FuncionService } from '../services/funcion.service';
import { Pelicula } from '../services/peliculas.service';

@Component({
  selector: 'app-asientos',
  templateUrl: './asientos.component.html',
  styleUrls: ['./asientos.component.css'],
  standalone: true,
  imports: [CommonModule, IonButton, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent]
})
export class AsientosComponent implements OnInit {
  @Input() idFuncion!: number;

  peliculas = signal<Pelicula[]>([]);

  // Declaradas como WritableSignal para refrescar la vista en entorno zoneless
  filas = signal<{ nombre: string; asientos: Asiento[] }[]>([]);
  asientosSeleccionados = signal<Asiento[]>([]);
  asientosOcupados = signal<number[]>([]);

  precio = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private reservaService: ReservaService,
    private asientoService: AsientoService,
    private funcionService: FuncionService
  ) { }

  ngOnInit() {
    this.idFuncion = Number(this.route.snapshot.paramMap.get('idFuncion'));

    this.funcionService.obtener(this.idFuncion).subscribe(f => {
      this.precio = f.precio_entrada;
      // Aquí es muy probable que f.sala sea un objeto completo o que f.sala.id_sala venga mal estructurado
      this.asientoService.getAsientosPorSala(f.sala!.id_sala)
        .subscribe(lista => this.armarMapa(lista));
    });
    this.cargarAsientosOcupados();
  }

  private armarMapa(lista: Asiento[]) {
    const mapa = new Map<string, Asiento[]>();

    for (const a of lista) {
      const n = a.fila?.nombre ?? '?';
      if (!mapa.has(n)) mapa.set(n, []);
      mapa.get(n)!.push(a);
    }

    const resultado = [...mapa.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([nombre, asientos]) => ({
        nombre,
        asientos: asientos.sort((x, y) => x.numero - y.numero)
      }));

    this.filas.set(resultado);
  }

  cargarAsientosOcupados() {
    this.reservaService.getAsientosOcupados(this.idFuncion).subscribe({
      next: o => this.asientosOcupados.set(o),
      error: e => console.error(e)
    });
  }

  isOcupado(a: Asiento) {
    return this.asientosOcupados().includes(a.id_asiento);
  }

  isSeleccionado(a: Asiento) {
    return this.asientosSeleccionados().some(s => s.id_asiento === a.id_asiento);
  }

  toggleAsiento(a: Asiento) {
    if (this.isOcupado(a)) return;

    this.asientosSeleccionados.update(seleccionados => {
      const i = seleccionados.findIndex(s => s.id_asiento === a.id_asiento);
      if (i > -1) {
        return seleccionados.filter(s => s.id_asiento !== a.id_asiento);
      } else {
        return [...seleccionados, a];
      }
    });
  }

  get total() {
    return this.asientosSeleccionados().length * this.precio;
  }

  continuarCompra() {
    if (!this.asientosSeleccionados().length) return;

    const cliente = JSON.parse(localStorage.getItem('usuario') || 'null');
    // antes: const idCliente = cliente?.nombre ?? cliente?.id_cliente;
    const idCliente = cliente?.id_cliente;

    this.reservaService.guardarReserva({
      id_cliente: idCliente,
      id_funcion: this.idFuncion,
      id_asiento: this.asientosSeleccionados().map(a => a.id_asiento)
    }).subscribe({
      next: () => {
        alert('Reserva confirmada');
        this.asientosSeleccionados.set([]);
        this.cargarAsientosOcupados();
      },
      error: err => alert(err.error || 'Ocurrió un error al procesar la reserva.')
    });
  }
}