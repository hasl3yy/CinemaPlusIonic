import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FuncionService, Funcion } from '../services/funcion.service';
import { Router } from '@angular/router';
import { IonCardContent, IonButton, IonSpinner, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonList, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/angular';

@Component({
  selector: 'app-funciones',
  templateUrl: './funciones.component.html',
  styleUrls: ['./funciones.component.css'],
  standalone: true,
  imports: [CommonModule, IonCardContent, IonButton, IonSpinner, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonList, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle]
})
export class FuncionesComponent implements OnInit {
  @Input() idPelicula!: number;

  listaFunciones: Funcion[] = [];
  cargando: boolean = true;

  constructor(
    private funcionService: FuncionService,
    private router: Router
  ) {}

  ngOnInit() {
    // Lo dejamos por compatibilidad
  }

  // IMPORTANTE: ionViewWillEnter se ejecuta cada vez que abres esta pantalla
  ionViewWillEnter() {
    console.log('ID recibido al entrar a funciones:', this.idPelicula);
    if (this.idPelicula) {
      this.cargando = true; // Aseguramos que muestre el spinner al entrar
      this.cargarFunciones();
    }
  }

  cargarFunciones() {
    this.funcionService.listarPorPelicula(this.idPelicula).subscribe({
      next: (data) => {
        console.log('Datos recibidos del backend:', data);
        this.listaFunciones = data;
        this.cargando = false; // Quita el círculo y pinta las tarjetas
      },
      error: (err) => {
        console.error('Error al cargar las funciones:', err);
        this.cargando = false;
      }
    });
  }

  seleccionarFuncion(idFuncion: number) {
    console.log('Función seleccionada:', idFuncion);
    this.router.navigate(['/asientos', idFuncion]);
  }
}