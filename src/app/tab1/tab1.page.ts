import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PeliculasService, Pelicula } from '../../services/peliculas.service';

const MAX_TAMANO_MB = 2;

@Component({
  selector: 'app-peliculas',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
    this.peliculaService.listar().subscribe({
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

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    if (file.size > MAX_TAMANO_MB * 1024 * 1024) {
      alert(`La imagen no puede pesar más de ${MAX_TAMANO_MB}MB.`);
      input.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.imagenBase64 = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  volver(): void {
    this.router.navigate(['/home']);
  }

}