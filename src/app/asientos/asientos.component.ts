import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { IonButton, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent } from '@ionic/angular';
import { ReservaService } from '../services/reserva.service';
import { AsientoService, Asiento } from '../services/asiento.service'; 
import { FuncionService } from '../services/funcion.service';


@Component({
  selector: 'app-asientos',
  templateUrl: './asientos.component.html',
  styleUrls: ['./asientos.component.css'],
  standalone: true,
  imports: [CommonModule, IonButton, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent]
})

export class AsientosComponent implements OnInit {
  @Input() idFuncion!: number;

  

  filas: { nombre: string; asientos: Asiento[] }[] = [];
  asientosSeleccionados: Asiento[] = [];
  asientosOcupados: number[] = [];
  precio = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private reservaService: ReservaService,
    private asientoService: AsientoService,
    private funcionService: FuncionService
  ) {}

  ngOnInit() {
    this.idFuncion = Number(this.route.snapshot.paramMap.get('idFuncion'));

    this.funcionService.obtener(this.idFuncion).subscribe(f => {
      this.precio = f.precio_entrada;
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
    this.filas = [...mapa.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([nombre, asientos]) => ({
        nombre,
        asientos: asientos.sort((x, y) => x.numero - y.numero)
      }));
  }

  cargarAsientosOcupados() {
    this.reservaService.getAsientosOcupados(this.idFuncion).subscribe({
      next: o => (this.asientosOcupados = o),
      error: e => console.error(e)
    });
  }

  isOcupado(a: Asiento) { return this.asientosOcupados.includes(a.id_asiento); }
  isSeleccionado(a: Asiento) { return this.asientosSeleccionados.some(s => s.id_asiento === a.id_asiento); }

  toggleAsiento(a: Asiento) {
    if (this.isOcupado(a)) return;
    const i = this.asientosSeleccionados.findIndex(s => s.id_asiento === a.id_asiento);
    i > -1 ? this.asientosSeleccionados.splice(i, 1) : this.asientosSeleccionados.push(a);
  }

  get total() { return this.asientosSeleccionados.length * this.precio; }

  continuarCompra() {

    if (!this.asientosSeleccionados.length) return;

    const usuario = JSON.parse(localStorage.getItem('usuario') || 'null');
    const idCliente = usuario?.id_cliente ?? 1; // ver nota del login abajo

    this.reservaService.guardarReserva({
      id_cliente: idCliente,
      id_funcion: this.idFuncion,
      id_asientos: this.asientosSeleccionados.map(a => a.id_asiento)   // <-- nombre correcto
    }).subscribe({
      next: () => {
        alert('Reserva confirmada');
        this.asientosSeleccionados = [];
        this.cargarAsientosOcupados();
      },
      error: err => alert(err.error || 'Ocurrió un error al procesar la reserva.')
    });
  }
}