import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonButton } from '@ionic/angular';
import { ClienteService } from '../services/cliente.service';

const MAX_TAMANO_MB = 2;

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonButton]
})
export class RegistroComponent {
  nit = '';
  nombres = '';
  apellidos = '';
  correo = '';
  telefono = '';
  contrasena = '';
  confirmar = '';
  fotografia: string | null = null;
  guardando = false;

  constructor(private clienteService: ClienteService, private router: Router, private cdr: ChangeDetectorRef) { }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    if (file.size > MAX_TAMANO_MB * 1024 * 1024) {
      alert(`La foto no puede pesar más de ${MAX_TAMANO_MB}MB.`);
      input.value = '';
      return;
    }
    const reader = new FileReader();
    reader.onload = () => { this.fotografia = reader.result as string; this.cdr.detectChanges(); };
    reader.readAsDataURL(file);
  }

  registrar() {
    if (!this.nit.trim() || !this.nombres.trim() || !this.apellidos.trim() || !this.correo.trim() || !this.contrasena) {
      alert('Completa NIT, nombres, apellidos, correo y contraseña.');
      return;
    }
    if (this.contrasena !== this.confirmar) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    this.guardando = true;
    this.clienteService.registrar({
      nit: this.nit.trim(),
      nombres: this.nombres.trim(),
      apellidos: this.apellidos.trim(),
      correo: this.correo.trim(),
      telefono: this.telefono,
      contrasena: this.contrasena,
      fotografia: this.fotografia
    }).subscribe({
      next: () => {
        this.guardando = false;

        alert('Cuenta creada. Ya puedes iniciar sesión.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.guardando = false;
        alert(err.error || 'No se pudo crear la cuenta.');
        this.cdr.detectChanges();
      }
    });
  }
}