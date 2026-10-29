import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PeliculasService, Pelicula } from '../services/peliculas.service';
import { IonCardTitle, IonCardHeader, IonCard, IonContent, IonBadge, IonButton } from '@ionic/angular';

const MAX_TAMANO_MB = 2;

@Component({
  selector: 'app-peliculas',
  standalone: true,
  imports: [CommonModule, FormsModule, IonCardTitle, IonCardHeader, IonCard, IonContent, IonBadge, IonButton],
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.css']
})
export class PeliculasComponent implements OnInit {
  peliculas = signal<Pelicula[]>([]);

  titulo = '';
  descripcion = '';
  imagenBase64: string | null = null;
  guardando = false;
  tipo = '';

  constructor(private peliculaService: PeliculasService, private router: Router) { }

  ngOnInit(): void {
    this.cargarPeliculas();
  }

  cargarPeliculas(): void {
    this.peliculaService.getPeliculasActivas().subscribe({
      next: (lista) => {
        this.peliculas.set(
          [...lista].sort((a, b) =>
            (b.titulo ?? '').localeCompare(a.titulo ?? '')
          )
        );
      },
      error: (err) => console.error('Error al cargar peliculas:', err)
    });
  }


  volver(): void {
    this.router.navigate(['/home']);
  }



}