import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular';
import { ClienteService } from '../services/cliente.service';
import { AuthService } from '../services/auth.service';

const MAX_TAMANO_MB = 2;

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, IonContent, IonButton],
})
export class Tab3Page {
  idCliente = 0;
  nit = '';
  nombres = '';
  apellidos = '';
  correo = '';
  telefono = '';
  fotografia: string | null = null;

  actual = '';
  nueva = '';
  confirmar = '';

  constructor(
    private clienteService: ClienteService,
    private authService: AuthService,

    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ionViewWillEnter() {
    this.cargar();
  }

  cargar() {
    const u: any = this.authService.getUsuarioActual();
    if (!u?.id_cliente) {
      this.router.navigate(['/login'], { replaceUrl: true });
      return;
    }
    this.idCliente = u.id_cliente;
    this.clienteService.obtener(this.idCliente).subscribe({
      next: c => {
        this.nit = c.nit;
        this.nombres = c.nombres;
        this.apellidos = c.apellidos;
        this.correo = c.correo;
        this.telefono = c.telefono;
        this.fotografia = c.fotografia;
        this.cdr.detectChanges();
      },
      error: e => console.error('Error al cargar perfil:', e)
    });
  }

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

  guardar() {
    if (!this.nit.trim() || !this.nombres.trim() || !this.apellidos.trim() || !this.correo.trim()) {
      alert('NIT, nombres, apellidos y correo son obligatorios.');
      return;
    }
    this.clienteService.actualizar(this.idCliente, {
      nit: this.nit, nombres: this.nombres, apellidos: this.apellidos,
      correo: this.correo, telefono: this.telefono, fotografia: this.fotografia
    }).subscribe({
      next: c => {
        localStorage.setItem('usuario', JSON.stringify(c));   // mantiene la sesión actualizada
        alert('Datos actualizados');
      },
      error: e => alert(e.error || 'No se pudieron guardar los cambios.')
    });
  }

  cambiarContrasena() {
    if (!this.actual || !this.nueva) {
      alert('Escribe la contraseña actual y la nueva.');
      return;

    }
    if (this.nueva !== this.confirmar) {
      alert('Las contraseñas nuevas no coinciden.');
      return;
    }
    this.clienteService.cambiarContrasena(this.idCliente, this.actual, this.nueva).subscribe({
      next: () => {
        alert('Contraseña actualizada');
        this.actual = this.nueva = this.confirmar = '';
        this.cdr.detectChanges();
      },
      error: e => alert(e.error || 'No se pudo cambiar la contraseña.')
    });
  }

  cerrarSesion() {
    this.authService.logout();
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}