import { Component, Input, OnInit, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
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
    private router: Router,
    private cdr: ChangeDetectorRef // <-- 1. Inyectamos ChangeDetectorRef
  ) {}

  ngOnInit() {
    if (this.idPelicula) {
      this.cargarFunciones();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['idPelicula']) {
      const valorActual = changes['idPelicula'].currentValue;
      if (valorActual) {
        this.cargarFunciones();
      }
    }
  }

  cargarFunciones() {
    this.cargando = true;
    this.cdr.detectChanges(); // Forzamos actualización al empezar a cargar

    this.funcionService.listarPorPelicula(this.idPelicula).subscribe({
      next: (data) => {
        console.log('Datos recibidos del backend:', data);
        this.listaFunciones = data || [];
        this.cargando = false;
        this.cdr.detectChanges(); // <-- 2. Forzamos a Angular a repintar la vista con los datos
      },
      error: (err) => {
        console.error('Error al cargar las funciones:', err);
        this.listaFunciones = [];
        this.cargando = false; 
        this.cdr.detectChanges(); // <-- 3. Forzamos actualización en caso de error
      }
    });
  }

  seleccionarFuncion(idFuncion: number) {
    console.log('Función seleccionada:', idFuncion);
    this.router.navigate(['/asientos', idFuncion]);
  }
}