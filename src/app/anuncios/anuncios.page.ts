import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from '@ionic/angular';
import { AnuncioService, Anuncio } from '../services/anuncio.service';

@Component({
  selector: 'app-anuncios',
  templateUrl: 'anuncios.page.html',
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent],
})
export class AnunciosPage implements OnInit {
  anuncios = signal<Anuncio[]>([]);

  constructor(private anuncioService: AnuncioService) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.anuncioService.listarActivos().subscribe({
      next: lista => this.anuncios.set(
        [...lista].sort((a, b) => (b.fechaPublicacion ?? '').localeCompare(a.fechaPublicacion ?? ''))
      ),
      error: e => console.error('Error al cargar anuncios:', e)
    });
  }
}