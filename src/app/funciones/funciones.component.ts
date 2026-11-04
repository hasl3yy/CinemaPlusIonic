import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FuncionService, Funcion } from '../services/funcion.service';
import { Router } from '@angular/router';
import { IonCardContent, IonButton, IonSpinner, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonList, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/angular';
import { Observable } from 'rxjs';

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

  ngOnInit() {
    this.verificarYCargar();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['idPelicula'] && !changes['idPelicula'].firstChange) {
      this.verificarYCargar();
    }
  }

  ionViewWillEnter() {
    this.verificarYCargar();
  }

  private verificarYCargar() {
    console.log('ID recibido:', this.idPelicula);
    if (this.idPelicula) {
      this.cargarFunciones();
    } else {
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
        this.cargando = false; 
      }
    });
  }

  seleccionarFuncion(idFuncion: number) {
    console.log('Función seleccionada:', idFuncion);
    this.router.navigate(['/asientos', idFuncion]);
  }



}