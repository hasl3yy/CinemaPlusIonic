import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
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
export class FuncionesComponent implements OnInit, OnChanges {
  @Input() idPelicula!: number;

  listaFunciones: Funcion[] = [];
  cargando: boolean = true;

  constructor(
    private funcionService: FuncionService,
    private router: Router
  ) {}

  // 1. ngOnInit se ejecuta siempre al inicializar el componente
  ngOnInit() {
    this.verificarYCargar();
  }

  // 2. OnChanges detecta si el @Input() cambia si el componente se reutiliza en pantalla
  ngOnChanges(changes: SimpleChanges) {
    if (changes['idPelicula'] && !changes['idPelicula'].firstChange) {
      this.verificarYCargar();
    }
  }

  // 3. Soporte para cuando Ionic vuelve a enfocar la vista
  ionViewWillEnter() {
    this.verificarYCargar();
  }

  private verificarYCargar() {
    console.log('ID recibido:', this.idPelicula);
    if (this.idPelicula) {
      this.cargarFunciones();
    } else {
      // Si por alguna razón el Input tarda en llegar, apagamos el estado de carga o prevenimos bloqueos
      this.cargando = false;
    }
  }

  cargarFunciones() {
    this.cargando = true;
    this.funcionService.listarPorPelicula(this.idPelicula).subscribe({
      next: (data) => {
        console.log('Datos recibidos del backend:', data);
        this.listaFunciones = data || [];
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar las funciones:', err);
        this.listaFunciones = [];
        this.cargando = false; // ¡Clave para que no se quede el spinner dando vueltas si falla la API!
      }
    });
  }

  seleccionarFuncion(idFuncion: number) {
    console.log('Función seleccionada:', idFuncion);
    this.router.navigate(['/asientos', idFuncion]);
  }
}