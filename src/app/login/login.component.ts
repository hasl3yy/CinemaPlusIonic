import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  correo: string = '';
  contrasena: string = '';
  estado: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    const credentials = {
      correo: this.correo,
      contrasena: this.contrasena,
      estado:this.estado
    };

    this.authService.login(credentials).subscribe({
      next: () => {
        this.router.navigate(['/tab1']);
      },
      error: (err) => {
        console.error('Error en el login:', err);
        alert('Correo o contraseña incorrectos.');

      }
    });
  }

}
